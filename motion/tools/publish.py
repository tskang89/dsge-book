#!/usr/bin/env python3
"""빌드된 모션 그래픽 HTML을 저장소 루트에 공개한다(암호 없음).

  python3 motion/tools/publish.py 빌드.html  RBC_ch2_motion.html  [--audio 음성.m4a]

- --audio: 빌드 때 --audio-url <이름>.m4a 로 만든 페이지의 음성 파일을 루트에 같은 이름(<이름>.m4a)으로 둔다.

- 저장소 소유자 지시로 모션 그래픽 공개 파일(`*_motion.html`)에는 암호를 걸지 않는다(모든 장).
  빌드 결과(자기완결 HTML)를 그대로 루트에 복사한다.
- 장면 원본(`motion/chapters/chNN/scenes.js.enc`)과 교재 원문은 계속 암호화해 둔다.
- 예전 형식(암호 페이지)의 공개 파일을 평문으로 바꾸려면 `--unlock` 을 쓴다(DSGE_PW 필요):
    DSGE_PW=... python3 motion/tools/publish.py --unlock RBC_ch2_motion.html
"""
import os, shutil, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def unlock(name):
    from unlock_book import unlock_page  # noqa: E402
    pw = os.environ.get("DSGE_PW") or sys.exit("환경변수 DSGE_PW 가 필요합니다.")
    dst = os.path.join(ROOT, name)
    html = unlock_page(dst, pw)
    open(dst, "w", encoding="utf-8").write(html)
    print(f"{dst}: 암호 해제 → {len(html.encode('utf-8')):,} bytes")


def main():
    args = sys.argv[1:]
    audio = None
    if "--audio" in args:
        i = args.index("--audio"); audio = args[i + 1]; del args[i:i + 2]
    if len(args) == 2 and args[0] == "--unlock":
        return unlock(args[1])
    if len(args) not in (2, 3):  # 세 번째 인자(예전 암호 화면 제목)는 무시한다
        sys.exit(__doc__)
    src, name = args[:2]
    head = open(src, encoding="utf-8").read(4096)
    assert "<html" in head.lower() and "PAYLOAD" not in head, "빌드된 평문 HTML이 아닙니다."
    dst = os.path.join(ROOT, name)
    shutil.copyfile(src, dst)
    print(f"{dst}: {os.path.getsize(dst):,} bytes (암호 없음)")
    if audio:
        adst = os.path.join(ROOT, os.path.splitext(name)[0] + ".m4a")
        assert os.path.basename(adst) in open(dst, encoding="utf-8").read(), "페이지가 이 음성 파일을 부르지 않습니다(--audio-url 확인)."
        shutil.copyfile(audio, adst)
        print(f"{adst}: {os.path.getsize(adst)/1e6:.1f} MB")


if __name__ == "__main__":
    main()
