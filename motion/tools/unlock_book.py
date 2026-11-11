#!/usr/bin/env python3
"""저장소의 DSGE_book_source.html(암호화)에서 교재 LaTeX 원문·코드·그림을 풀어낸다.

  DSGE_PW=... python3 motion/tools/unlock_book.py DSGE_book_source.html  출력폴더

출력폴더/main.tex, 출력폴더/chapters/*.tex (장별 원고), Download_Codes/, Pictures/ 가 생긴다.
장 번호와 파일의 대응은 main.tex 의 \\subfile 순서를 본다
(예: 제1장 overview, 제2장 rbc_basic, 제3장 rbc_dynare, 제4장 rbc_bayesian ...).
출력폴더는 반드시 저장소 밖(스크래치 폴더)에 둘 것. 교재 원문을 커밋하지 않는다.
"""
import base64, gzip, hashlib, json, os, re, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM


def unlock_page(path: str, pw: str) -> str:
    """사이트의 암호 페이지(index.html, DSGE_book_source.html, *_motion.html)를 복호화."""
    s = open(path, encoding="utf-8").read()
    g = lambda n: re.search(r"\b" + n + r'\s*=\s*"?([^";\n]+)"?', s).group(1)
    payload, salt, iv, it = (base64.b64decode(g("PAYLOAD")), base64.b64decode(g("SALT")),
                             base64.b64decode(g("IV")), int(g("ITER")))
    k = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, it, 32)
    return gzip.decompress(AESGCM(k).decrypt(iv, payload, None)).decode("utf-8-sig")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    pw = os.environ.get("DSGE_PW") or sys.exit("환경변수 DSGE_PW 가 필요합니다.")
    html = unlock_page(sys.argv[1], pw)
    data = json.loads(re.search(r"const DATA = (\[.*?\]);\n", html, re.S).group(1))
    out = sys.argv[2]
    for f in data:
        p = os.path.join(out, f["path"]) + (".webp" if f.get("webp") else "")
        os.makedirs(os.path.dirname(p), exist_ok=True)
        b = base64.b64decode(f["b64"])
        if not (f.get("webp") or f.get("raw")):
            b = gzip.decompress(b)
        open(p, "wb").write(b)
    print(f"{len(data)}개 파일을 {out} 에 풀었습니다.")
