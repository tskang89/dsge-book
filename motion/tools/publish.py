#!/usr/bin/env python3
"""빌드된 HTML을 사이트와 같은 암호 페이지로 감싸 저장소 루트에 둔다.

  DSGE_PW=... python3 motion/tools/publish.py 빌드.html  RBC_ch3_motion.html  "제3장 ... — 모션 그래픽"

- 암호 입력 화면의 틀은 저장소 루트의 index.html 을 그대로 쓴다(디자인·문구 일치).
- 같은 암호로 복호화해 원본과 바이트 단위로 같은지 검증한 뒤 저장한다.
"""
import base64, gzip, hashlib, os, re, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from unlock_book import unlock_page  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    src, name, heading = sys.argv[1:]
    pw = os.environ.get("DSGE_PW") or sys.exit("환경변수 DSGE_PW 가 필요합니다.")
    plain = open(src, "rb").read()
    salt, iv, it = os.urandom(16), os.urandom(12), 250000
    k = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, it, 32)
    ct = AESGCM(k).encrypt(iv, gzip.compress(plain, 9, mtime=0), None)
    b = lambda x: base64.b64encode(x).decode()
    tpl = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    line = 'var PAYLOAD = "%s", SALT = "%s", IV = "%s", ITER = %d;' % (b(ct), b(salt), b(iv), it)
    out, n = re.subn(r'var PAYLOAD = "[^"]*", SALT = "[^"]*", IV = "[^"]*", ITER = \d+;', lambda m: line, tpl)
    assert n == 1, "index.html 의 암호 페이지 형식이 바뀌었습니다."
    out = re.sub(r"<title>[^<]*</title>", "<title>%s</title>" % heading, out, count=1)
    out = re.sub(r"<h1>[^<]*</h1>", "<h1>%s</h1>" % heading, out, count=1)
    dst = os.path.join(ROOT, name)
    open(dst, "w", encoding="utf-8").write(out)
    assert unlock_page(dst, pw).encode("utf-8") == plain, "복호화 검증 실패"
    print(f"{dst}: {len(out):,} bytes (복호화 검증 통과)")


if __name__ == "__main__":
    main()
