#!/usr/bin/env python3
"""오늘의 경제 쇼츠: episode.js 한 파일 → 음성·배경음악이 들어간 세로 MP4.

  python3 shorts/tools/make.py shorts/episodes/001_hotelling --tts <supertonic 폴더> [--asr <zipformer 폴더>] [--work DIR]
      [--only build|audio|video] [--speed 1.2]

단계
  1) 빌드(시간 미정) → 낭독문 목록 뽑기
  2) 줄별 TTS(문장 해시로 캐시) → (선택) 받아쓰기 점검
  3) 줄 길이 = 앞 여유 + 음성 + 뒤 여유 → TIMING 을 넣어 다시 빌드
  4) 소리: 낭독 + 배경음악(bgm.py 합성, 말할 때 자동으로 낮춤) + 효과음 → −14 LUFS
  5) 영상: Playwright 프레임 캡처 → MP4, 소리 합치기 → shorts/videos/<에피소드>.mp4
  6) 점검용 대조표(contact.jpg)와 업로드 문구(upload.txt)
"""
import argparse, base64, hashlib, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(ROOT, "motion", "tools"))
LEAD, GAP = 0.12, 0.28
SR = 44100


def sh(*a, **k):
    return subprocess.run(a, check=True, **k)


def build(ep_js, out, timing=None, audio_url=None):
    from build import subset_font, PRET, NOTO
    from fontTools.ttLib import TTFont
    tpl = open(os.path.join(ROOT, "shorts", "engine", "template.html"), encoding="utf-8").read()
    src_ep = open(ep_js, encoding="utf-8").read()
    if timing:
        src_ep = "const TIMING=" + json.dumps(timing, ensure_ascii=False) + ";\n" + src_ep
    title = re.search(r'title:\s*"([^"]+)"', src_ep).group(1)
    src = tpl.replace("/*@@EPISODE@@*/", src_ep).replace("@@TITLE@@", "오늘의 경제 · " + title)
    text = "".join(sorted(set(src) | {chr(i) for i in range(32, 127)} | set("·—–→…“”‘’〈〉×▶①②③④⑤")))
    face = '@font-face{font-family:"%s";font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format("woff2")}\n'
    ff = "".join(face % ("Pretendard", w, subset_font(os.path.join(PRET, p), text))
                 for w, p in [(400, "Pretendard-Regular.otf"), (700, "Pretendard-Bold.otf")])
    cmap = TTFont(os.path.join(PRET, "Pretendard-Regular.otf")).getBestCmap()
    rest = "".join(ch for ch in text if ord(ch) not in cmap and ord(ch) > 32)
    if rest:
        ff += "".join(face % ("KFall", w, subset_font(NOTO + p, rest))
                      for w, p in [(400, "NotoSansCJK-Regular.ttc"), (700, "NotoSansCJK-Bold.ttc")])
    kd = os.path.join(ROOT, "motion", "node_modules", "katex", "dist")
    if "$" in src_ep and "K(" in src_ep or re.search(r'\$[^"$]+\$', src_ep):   # 수식이 있을 때만 KaTeX 를 넣는다
        css = open(os.path.join(kd, "katex.min.css"), encoding="utf-8").read()
        css = re.sub(r'src:url\(fonts/([^)]+\.woff2)\) format\("woff2"\)[^;}]*;?',
                     lambda m: 'src:url(data:font/woff2;base64,%s) format("woff2");' % base64.b64encode(
                         open(os.path.join(kd, "fonts", m.group(1)), "rb").read()).decode(), css)
        js = open(os.path.join(kd, "katex.min.js"), encoding="utf-8").read()
    else:
        css = js = ""
    out_s = src.replace("/*@@FONTS@@*/", ff).replace("/*@@KATEXCSS@@*/", css).replace("/*@@KATEXJS@@*/", js)
    out_s = out_s.replace("@@AUDIO@@", audio_url) if audio_url else out_s.replace(' src="@@AUDIO@@"', "")
    open(out, "w", encoding="utf-8").write(out_s)


def plan(html):
    return json.loads(subprocess.check_output(["node", os.path.join(HERE, "plan.js"), html]))


class Voice:
    """Supertonic TTS + (선택) 받아쓰기 점수. 받아쓰기가 잘 안 되는 줄은 여러 번 다시 만들어 가장 또렷한 것을 남긴다."""
    def __init__(self, tts_model, asr_model, speed, sid):
        import sherpa_onnx as so
        M = tts_model
        mc = so.OfflineTtsSupertonicModelConfig(f"{M}/duration_predictor.int8.onnx", f"{M}/text_encoder.int8.onnx",
            f"{M}/vector_estimator.int8.onnx", f"{M}/vocoder.int8.onnx", f"{M}/tts.json", f"{M}/unicode_indexer.bin", f"{M}/voice.bin")
        self.tts = so.OfflineTts(so.OfflineTtsConfig(model=so.OfflineTtsModelConfig(supertonic=mc, num_threads=4), max_num_sentences=1))
        self.rec = None
        if asr_model:
            A = asr_model
            self.rec = so.OfflineRecognizer.from_transducer(encoder=f"{A}/encoder-epoch-99-avg-1.int8.onnx",
                decoder=f"{A}/decoder-epoch-99-avg-1.onnx", joiner=f"{A}/joiner-epoch-99-avg-1.int8.onnx", tokens=f"{A}/tokens.txt", num_threads=4)
        self.speed, self.sid, self.so = speed, sid, so

    def gen(self, text):
        import numpy as np
        g = self.so.GenerationConfig(); g.sid = self.sid; g.speed = self.speed; g.extra = {"lang": "ko"}
        au = self.tts.generate(text, g)
        return np.asarray(au.samples, dtype="float32"), au.sample_rate

    def score(self, x, sr, text):
        import numpy as np
        from narrate import cer
        if sr != 16000:
            x = np.interp(np.arange(0, len(x), sr / 16000.0), np.arange(len(x)), x).astype("float32")
        st = self.rec.create_stream(); st.accept_waveform(16000, x); self.rec.decode_stream(st)
        return cer(text, st.result.text), st.result.text


def tts_lines(lines, wavdir, a):
    """줄별 음성(문장 해시로 캐시). --asr 가 있으면 CER 이 큰 줄은 최대 --tries 번 다시 만든다."""
    import soundfile as sf
    os.makedirs(wavdir, exist_ok=True)
    v = None; out = {}; report = []
    for ln in lines:
        h = hashlib.sha1(f"{ln['say']}|{a.speed}|{a.sid}".encode()).hexdigest()[:12]
        fn = os.path.join(wavdir, h + ".wav"); out[ln["key"]] = fn
        if os.path.exists(fn):
            continue
        v = v or Voice(a.tts, a.asr, a.speed, a.sid)
        x, sr = v.gen(ln["say"])
        if v.rec:
            best, hyp = v.score(x, sr, ln["say"]); c0 = best
            for _ in range(a.tries if best > .2 else 0):
                y, sr2 = v.gen(ln["say"]); c, hy = v.score(y, sr2, ln["say"])
                if c < best:
                    best, hyp, x, sr = c, hy, y, sr2
                if best <= .1:
                    break
            report.append((best, c0, ln["key"], ln["say"], hyp))
        sf.write(fn, x, sr)
    if report:
        report.sort(key=lambda r: -r[0])
        print(f"asr: 평균 CER {sum(r[0] for r in report)/len(report):.3f} (새로 만든 {len(report)}줄)")
        for c, c0, k, t, hy in report[:6]:
            print(f"  {c:.2f} (처음 {c0:.2f}) {k}\n     원고: {t}\n     인식: {hy}")
    return out


def mix(pl, wavs, bgm_cfg, out_m4a):
    import numpy as np, soundfile as sf
    from bgm import make_bgm, sfx
    T = pl["total"]; n = int((T + .05) * SR)
    voice = np.zeros(n, np.float32)
    for ln in pl["lines"]:
        x, sr = sf.read(wavs[ln["key"]], dtype="float32")
        if x.ndim > 1: x = x.mean(1)
        if sr != SR:
            x = np.interp(np.arange(0, len(x), sr / SR), np.arange(len(x)), x).astype(np.float32)
        i = int((ln["t"] + LEAD) * SR); m = min(len(x), n - i)
        voice[i:i + m] += x[:m]
    voice *= .9 / (np.abs(voice).max() + 1e-9)
    # 말소리 구간 → 배경음악 낮춤(부드럽게)
    act = (np.abs(voice) > .02).astype(np.float32)
    w = int(.25 * SR); act = np.convolve(act, np.ones(w) / w, "same"); act = np.clip(act * 4, 0, 1)
    k = int(.15 * SR); act = np.convolve(act, np.ones(k) / k, "same")
    g_bgm = (10 ** (-17 / 20)) * (1 - act) + (10 ** (-27 / 20)) * act
    music = make_bgm(T + .05, sr=SR, **bgm_cfg)[:n]
    music = np.pad(music, ((0, n - len(music)), (0, 0)))
    fx = np.zeros(n, np.float32)
    for e in pl["sfx"]:
        x = sfx(e["type"], SR); i = max(0, int(e["t"] * SR)); m = min(len(x), n - i)
        if m > 0: fx[i:i + m] += x[:m] * (10 ** (-12 / 20))
    y = music * g_bgm[:, None] + (voice + fx)[:, None]
    tmp = out_m4a + ".wav"; sf.write(tmp, y, SR)
    sh("ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000",
       "-c:a", "aac", "-b:a", "192k", out_m4a)
    os.remove(tmp)


def contact(html, outdir, total):
    import shutil
    shutil.rmtree(outdir, ignore_errors=True)
    ts = [round(total * (i + .5) / 12, 1) for i in range(12)]
    sh("node", os.path.join(HERE, "render.js"), html, outdir, "--stills", ",".join(map(str, ts)))
    files = sorted(f for f in os.listdir(outdir) if f.endswith(".jpg") and f.startswith("t"))
    ins = sum([["-i", os.path.join(outdir, f)] for f in files], [])
    sh("ffmpeg", "-loglevel", "error", "-y", *ins, "-filter_complex",
       "".join(f"[{i}:v]scale=270:480[v{i}];" for i in range(len(files))) + "".join(f"[v{i}]" for i in range(len(files))) +
       f"xstack=inputs={len(files)}:layout=" + "|".join(f"{(i%6)*270}_{(i//6)*480}" for i in range(len(files))),
       os.path.join(outdir, "contact.jpg"))
    return os.path.join(outdir, "contact.jpg")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("ep"); ap.add_argument("--tts", required=True); ap.add_argument("--asr")
    ap.add_argument("--work"); ap.add_argument("--speed", type=float, default=1.25); ap.add_argument("--tries", type=int, default=5); ap.add_argument("--sid", type=int, default=0)
    ap.add_argument("--par", type=int, default=4); ap.add_argument("--only", choices=["build", "audio", "video"])
    a = ap.parse_args()
    ep = os.path.abspath(a.ep); name = os.path.basename(ep.rstrip("/"))
    work = a.work or os.path.join(os.environ.get("SCRATCH", "/tmp"), "shorts", name); os.makedirs(work, exist_ok=True)
    js = os.path.join(ep, "episode.js")
    h0 = os.path.join(work, "draft.html"); build(js, h0)
    p0 = plan(h0)
    print(f"[1] 줄 {len(p0['lines'])}개, 어림 길이 {p0['total']:.1f}s")
    wavs = tts_lines(p0["lines"], os.path.join(work, "wav"), a)
    import soundfile as sf
    timing = {ln["key"]: round(LEAD + sf.info(wavs[ln["key"]]).duration + GAP, 3) for ln in p0["lines"]}
    print(f"[2] TTS 완료")
    html = os.path.join(work, name + ".html"); build(js, html, timing, audio_url=name + ".m4a")
    pl = plan(html)
    print(f"[3] 길이 {pl['total']:.1f}s" + ("  ⚠ 60초 초과" if pl["total"] > 60 else ""))
    json.dump(pl, open(os.path.join(work, "plan.json"), "w"), ensure_ascii=False, indent=1)
    if a.only == "build":
        return
    m4a = os.path.join(work, name + ".m4a"); mix(pl, wavs, p0["ep"].get("bgm", {}), m4a)
    print(f"[4] 소리 → {m4a}")
    c = contact(html, os.path.join(work, "chk"), pl["total"]); print(f"[5] 대조표 → {c}")
    if a.only == "audio":
        return
    silent = os.path.join(work, "silent.mp4")
    sh("node", os.path.join(HERE, "render.js"), html, silent, str(a.par))
    vids = os.path.join(ROOT, "shorts", "videos"); os.makedirs(vids, exist_ok=True)
    out = os.path.join(vids, name + ".mp4")
    sh("ffmpeg", "-loglevel", "error", "-y", "-i", silent, "-i", m4a, "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "slow",
       "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "copy", "-shortest", "-movflags", "+faststart", out)
    yt = p0["ep"].get("yt", {})
    desc = "\n".join([yt.get("title", p0["ep"].get("title", "")), "",
                      " ".join("#" + t for t in yt.get("tags", [])), "",
                      "음악·효과음: 자체 합성 / 음성: 합성 음성(Supertonic)"])
    open(os.path.join(ep, "upload.txt"), "w", encoding="utf-8").write(desc + "\n")
    print(f"[6] 완성 → {out} ({os.path.getsize(out)/1e6:.1f} MB)")


if __name__ == "__main__":
    main()
