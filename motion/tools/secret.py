#!/usr/bin/env python3
"""교재 내용이 담긴 파일(장면 원본, 내레이션 원고)을 암호화·복호화한다.

사이트 파일과 같은 방식: gzip → AES-256-GCM, 키는 PBKDF2-SHA256(250,000회).
암호는 환경변수 DSGE_PW 로만 받는다. 암호를 저장소나 명령행 기록에 남기지 말 것.

  DSGE_PW=... python3 motion/tools/secret.py enc  평문파일  암호파일.enc
  DSGE_PW=... python3 motion/tools/secret.py dec  암호파일.enc  평문파일
"""
import base64, gzip, hashlib, json, os, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

ITER = 250000


def _key(pw: str, salt: bytes) -> bytes:
    return hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, ITER, 32)


def encrypt(data: bytes, pw: str) -> bytes:
    salt, iv = os.urandom(16), os.urandom(12)
    ct = AESGCM(_key(pw, salt)).encrypt(iv, gzip.compress(data, 9, mtime=0), None)
    b = lambda x: base64.b64encode(x).decode()
    return json.dumps({"v": 1, "iter": ITER, "salt": b(salt), "iv": b(iv), "ct": b(ct)}).encode()


def decrypt(blob: bytes, pw: str) -> bytes:
    d = json.loads(blob)
    k = hashlib.pbkdf2_hmac("sha256", pw.encode(), base64.b64decode(d["salt"]), d["iter"], 32)
    return gzip.decompress(AESGCM(k).decrypt(base64.b64decode(d["iv"]), base64.b64decode(d["ct"]), None))


def password() -> str:
    pw = os.environ.get("DSGE_PW")
    if not pw:
        sys.exit("환경변수 DSGE_PW 에 암호를 넣어 주세요 (사용자에게 받을 것).")
    return pw


if __name__ == "__main__":
    if len(sys.argv) != 4 or sys.argv[1] not in ("enc", "dec"):
        sys.exit(__doc__)
    mode, src, dst = sys.argv[1:]
    data = open(src, "rb").read()
    out = encrypt(data, password()) if mode == "enc" else decrypt(data, password())
    open(dst, "wb").write(out)
    print(f"{mode}: {src} -> {dst} ({len(out)} bytes)")
