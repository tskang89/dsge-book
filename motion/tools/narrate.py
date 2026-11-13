#!/usr/bin/env python3
"""낭독 원고 → 음성(TTS) → 받아쓰기 검증(ASR) → 장면 시간 맞춤(SEG) + 음성 트랙.

  # 1) 줄별 음성 만들기 (sherpa-onnx + Supertonic 2, 한국어)
  python3 motion/tools/narrate.py tts  원고.txt  $SCRATCH/wav  --model <supertonic 폴더> [--sid 0] [--speed 1.15]
  # 2) 받아쓰기로 발음 점검: 글자 오류율(CER)이 큰 줄을 보여 준다
  python3 motion/tools/narrate.py asr  원고.txt  $SCRATCH/wav  --model <zipformer-korean 폴더> [--top 30]
  #    CER 이 큰 줄은 여러 번 다시 만들어 가장 잘 들리는 것을 남긴다
  python3 motion/tools/narrate.py retake 원고.txt $SCRATCH/wav --tts-model <supertonic> --asr-model <zipformer> [--cer 0.25 --tries 4]
  # 3) 장면 시간을 음성 길이에 맞추고(SEG 를 넣은 장면 파일), 음성 트랙(m4a)을 만든다
  python3 motion/tools/narrate.py sync 장면.js 원고.txt $SCRATCH/wav  $SCRATCH/장면_seg.js  $SCRATCH/narr.m4a
  # 4) 빌드: 음성은 별도 파일로 두고 같은 폴더에서 불러온다
  python3 motion/tools/build.py $SCRATCH/장면_seg.js out.html --title "…" --audio-url <이름>_motion.m4a

원고 형식: `장면id 자막번호|낭독문` (motion/narration_rules.md). 모델은 저장소에 넣지 않는다.
  TTS: https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/sherpa-onnx-supertonic-tts-int8-2026-03-06.tar.bz2
  ASR: https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-zipformer-korean-2024-06-24.tar.bz2
"""
import argparse, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 44100
LEAD, GAP, TAIL, MINSEG = 0.25, 0.45, 0.9, 1.2   # 초: 문장 앞 여유, 문장 사이, 장면 끝, 최소 구간


def read_narr(p):
    out = []
    for line in open(p, encoding="utf-8"):
        if "|" in line:
            k, t = line.rstrip("\n").split("|", 1)
            out.append((k.strip(), t.strip()))
    return out


def wav_name(d, key):
    return os.path.join(d, key.replace(" ", "__") + ".wav")


def cmd_tts(a):
    import sherpa_onnx as so, soundfile as sf
    M = a.model
    mc = so.OfflineTtsSupertonicModelConfig(f"{M}/duration_predictor.int8.onnx", f"{M}/text_encoder.int8.onnx",
            f"{M}/vector_estimator.int8.onnx", f"{M}/vocoder.int8.onnx", f"{M}/tts.json", f"{M}/unicode_indexer.bin", f"{M}/voice.bin")
    tts = so.OfflineTts(so.OfflineTtsConfig(model=so.OfflineTtsModelConfig(supertonic=mc, num_threads=a.threads), max_num_sentences=1))
    os.makedirs(a.out, exist_ok=True)
    only = set(x.strip() for x in (a.only or "").split(",") if x.strip())
    n = 0
    for k, t in read_narr(a.narr):
        if only and k not in only:
            continue
        fn = wav_name(a.out, k)
        if os.path.exists(fn) and not (only or a.force):
            continue
        g = so.GenerationConfig(); g.sid = a.sid; g.speed = a.speed; g.extra = {"lang": "ko"}
        au = tts.generate(t, g)
        sf.write(fn, au.samples, au.sample_rate); n += 1
    print(f"tts: {n}줄 생성 → {a.out}")


DIG = "영일이삼사오육칠팔구"


def ko_int(n):
    if n == 0:
        return "영"
    out, units = "", [(10000, "만"), (1000, "천"), (100, "백"), (10, "십")]
    for u, w in units:
        q, n = divmod(n, u)
        if q:
            out += ("" if q == 1 and u != 10000 else ko_int(q)) + w
    return out + (DIG[n] if n else "")


def ko_num(m):  # 받아쓰기 결과의 아라비아 숫자를 원고 읽기(“영 점 칠오”, “이십오”)로 바꿔 비교한다
    s = m.group(0)
    if "." in s:
        i, f = s.split(".", 1)
        return (ko_int(int(i)) if i else "") + "점" + "".join(DIG[int(c)] for c in f if c.isdigit())
    return ko_int(int(s)) if len(s) < 9 else "".join(DIG[int(c)] for c in s)


def norm(s):
    s = re.sub(r"\d+(?:\.\d+)?|\.\d+", ko_num, s)
    return re.sub(r"[^가-힣]", "", s)


def cer(ref, hyp):
    r, h = norm(ref), norm(hyp)
    if not r:
        return 0.0
    prev = list(range(len(h) + 1))
    for i, rc in enumerate(r, 1):
        cur = [i] + [0] * len(h)
        for j, hc in enumerate(h, 1):
            cur[j] = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (rc != hc))
        prev = cur
    return prev[-1] / len(r)


def cmd_asr(a):
    import sherpa_onnx as so, soundfile as sf, numpy as np
    M = a.model
    rec = so.OfflineRecognizer.from_transducer(encoder=f"{M}/encoder-epoch-99-avg-1.int8.onnx", decoder=f"{M}/decoder-epoch-99-avg-1.onnx",
                                               joiner=f"{M}/joiner-epoch-99-avg-1.int8.onnx", tokens=f"{M}/tokens.txt", num_threads=a.threads)
    rows = []
    for k, t in read_narr(a.narr):
        fn = wav_name(a.wav, k)
        if not os.path.exists(fn):
            rows.append((1.0, k, t, "(음성 없음)")); continue
        x, sr = sf.read(fn, dtype="float32")
        if sr != 16000:
            idx = np.arange(0, len(x), sr / 16000.0); x = np.interp(idx, np.arange(len(x)), x).astype("float32"); sr = 16000
        s = rec.create_stream(); s.accept_waveform(sr, x); rec.decode_stream(s)
        h = s.result.text
        rows.append((cer(t, h), k, t, h))
    rows.sort(key=lambda r: -r[0])
    avg = sum(r[0] for r in rows) / max(1, len(rows))
    print(f"asr: {len(rows)}줄, 평균 CER {avg:.3f}, CER>0.15: {sum(r[0] > 0.15 for r in rows)}줄")
    for c, k, t, h in rows[:a.top]:
        print(f"{c:.2f} {k}\n   원고: {t}\n   인식: {h}")
    if a.json:
        json.dump([{"cer": c, "key": k, "text": t, "asr": h} for c, k, t, h in rows], open(a.json, "w", encoding="utf-8"), ensure_ascii=False, indent=0)


def cmd_retake(a):
    """받아쓰기 CER 이 큰 줄을 여러 번 다시 만들어 가장 잘 알아들리는 것을 남긴다(TTS 는 매번 조금씩 다르다)."""
    import sherpa_onnx as so, soundfile as sf, numpy as np
    T = a.tts_model
    mc = so.OfflineTtsSupertonicModelConfig(f"{T}/duration_predictor.int8.onnx", f"{T}/text_encoder.int8.onnx",
            f"{T}/vector_estimator.int8.onnx", f"{T}/vocoder.int8.onnx", f"{T}/tts.json", f"{T}/unicode_indexer.bin", f"{T}/voice.bin")
    tts = so.OfflineTts(so.OfflineTtsConfig(model=so.OfflineTtsModelConfig(supertonic=mc, num_threads=a.threads), max_num_sentences=1))
    M = a.asr_model
    rec = so.OfflineRecognizer.from_transducer(encoder=f"{M}/encoder-epoch-99-avg-1.int8.onnx", decoder=f"{M}/decoder-epoch-99-avg-1.onnx",
                                               joiner=f"{M}/joiner-epoch-99-avg-1.int8.onnx", tokens=f"{M}/tokens.txt", num_threads=a.threads)
    def score(x, sr, text):
        if sr != 16000:
            idx = np.arange(0, len(x), sr / 16000.0); x = np.interp(idx, np.arange(len(x)), x).astype("float32")
        st = rec.create_stream(); st.accept_waveform(16000, x); rec.decode_stream(st)
        return cer(text, st.result.text)
    fixed = 0; rows = []
    for k, t in read_narr(a.narr):
        fn = wav_name(a.wav, k)
        x, sr = sf.read(fn, dtype="float32")
        best = score(x, sr, t); c0 = best
        if best <= a.cer:
            continue
        for _ in range(a.tries):
            g = so.GenerationConfig(); g.sid = a.sid; g.speed = a.speed; g.extra = {"lang": "ko"}
            au = tts.generate(t, g); y = np.asarray(au.samples, dtype="float32")
            c = score(y, au.sample_rate, t)
            if c < best:
                best = c; sf.write(fn, y, au.sample_rate)
            if best <= a.cer / 2:
                break
        fixed += best < c0; rows.append((c0, best, k))
    print(f"retake: 대상 {len(rows)}줄, 개선 {fixed}줄")
    for c0, c1, k in sorted(rows, key=lambda r: -r[1])[:a.top]:
        print(f"  {k}: {c0:.2f} → {c1:.2f}")


def cmd_sync(a):
    import soundfile as sf, numpy as np
    scenes = json.loads(subprocess.check_output(["node", os.path.join(HERE, "caps_dump.js"), a.scenes]))
    narr = dict(read_narr(a.narr))
    seg, clips, t = {}, [], 0.0
    missing = []
    for sc in scenes:
        caps, L = sc["caps"], []
        for i, (st, txt) in enumerate(caps):
            orig = (caps[i + 1][0] if i + 1 < len(caps) else sc["dur"]) - st
            key = f'{sc["id"]} {i}'
            if not str(txt).strip():
                L.append(round(max(orig, 0.5), 3)); continue
            fn = wav_name(a.wav, key)
            if key not in narr or not os.path.exists(fn):
                missing.append(key); L.append(round(orig, 3)); continue
            d = sf.info(fn).duration
            x = LEAD + d + (TAIL if i == len(caps) - 1 else GAP)
            if sc["id"] == "title":          # 표지 영상은 원래 길이보다 짧게 하지 않는다
                x = max(x, orig)
            L.append(round(max(x, MINSEG), 3))
            clips.append((t + sum(L[:-1]) + LEAD, fn))
        seg[sc["id"]] = L
        t += sum(L)
    if missing:
        sys.exit("음성이 없는 자막: " + ", ".join(missing[:20]))
    src = open(a.scenes, encoding="utf-8").read()
    line = "const SEG=" + json.dumps(seg, separators=(",", ":")) + ";"
    src2, n = re.subn(r"const SEG=\{[^\n]*\};?", lambda m: line, src, count=1)
    if n == 0:
        src2 = line + "\n" + src
    open(a.out_scenes, "w", encoding="utf-8").write(src2)
    buf = np.zeros(int((t + 1) * SR), dtype="float32")
    for st, fn in clips:
        x, sr = sf.read(fn, dtype="float32")
        if x.ndim > 1:
            x = x.mean(axis=1)
        if sr != SR:
            idx = np.arange(0, len(x), sr / SR); x = np.interp(idx, np.arange(len(x)), x).astype("float32")
        i0 = int(st * SR); buf[i0:i0 + len(x)] += x[:len(buf) - i0]
    peak = float(np.abs(buf).max()) or 1.0
    buf *= min(1.0, 0.89 / peak)
    tmp = a.out_audio + ".wav"
    sf.write(tmp, buf, SR)
    subprocess.check_call(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-ac", "1", "-c:a", "aac", "-b:a", a.bitrate,
                           "-movflags", "+faststart", a.out_audio])
    os.remove(tmp)
    print(f"sync: 장면 {len(scenes)}개, 길이 {t/60:.1f}분 → {a.out_scenes}, {a.out_audio} ({os.path.getsize(a.out_audio)/1e6:.1f} MB)")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest="cmd", required=True)
    p = sp.add_parser("tts"); p.add_argument("narr"); p.add_argument("out"); p.add_argument("--model", required=True)
    p.add_argument("--sid", type=int, default=0); p.add_argument("--speed", type=float, default=1.15)
    p.add_argument("--threads", type=int, default=4); p.add_argument("--only"); p.add_argument("--force", action="store_true")
    p = sp.add_parser("asr"); p.add_argument("narr"); p.add_argument("wav"); p.add_argument("--model", required=True)
    p.add_argument("--threads", type=int, default=4); p.add_argument("--top", type=int, default=30); p.add_argument("--json")
    p = sp.add_parser("retake"); p.add_argument("narr"); p.add_argument("wav")
    p.add_argument("--tts-model", required=True); p.add_argument("--asr-model", required=True)
    p.add_argument("--cer", type=float, default=0.25); p.add_argument("--tries", type=int, default=4)
    p.add_argument("--sid", type=int, default=0); p.add_argument("--speed", type=float, default=1.15)
    p.add_argument("--threads", type=int, default=4); p.add_argument("--top", type=int, default=10)
    p = sp.add_parser("sync"); p.add_argument("scenes"); p.add_argument("narr"); p.add_argument("wav")
    p.add_argument("out_scenes"); p.add_argument("out_audio"); p.add_argument("--bitrate", default="48k")
    a = ap.parse_args()
    {"tts": cmd_tts, "asr": cmd_asr, "retake": cmd_retake, "sync": cmd_sync}[a.cmd](a)


if __name__ == "__main__":
    main()
