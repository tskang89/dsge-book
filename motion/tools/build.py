#!/usr/bin/env python3
"""공통 엔진(template.html) + 장면 원본(scenes.js) → 자기완결 HTML 한 파일.

  python3 motion/tools/build.py 장면.js 출력.html --title "제3장 ... 모션 그래픽" [--audio 내레이션.m4a]

- KaTeX(npm, motion/node_modules)와 폰트(KaTeX woff2, Noto Sans/Serif CJK KR 부분집합)를 모두 내장한다.
- 한글 폰트는 apt 의 fonts-noto-cjk 에서 가져와 원본에 쓰인 글자만 남긴다.
- --audio 를 주지 않으면 음성 트랙 없이(자막만) 만든다. 기본은 음성 없음.
"""
import argparse, base64, io, os, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
MOTION = os.path.dirname(HERE)
NOTO = "/usr/share/fonts/opentype/noto/"


def subset_font(path, text):
    f = TTFont(path, fontNumber=1)  # TTC 안의 1번 = KR
    o = subset.Options(); o.flavor = "woff2"; o.layout_features = ["*"]; o.name_IDs = ["*"]
    s = subset.Subsetter(o); s.populate(text=text); s.subset(f)
    b = io.BytesIO(); f.flavor = "woff2"; f.save(b)
    return base64.b64encode(b.getvalue()).decode()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("scenes"); ap.add_argument("out")
    ap.add_argument("--title", required=True)
    ap.add_argument("--audio")
    a = ap.parse_args()

    tpl = open(os.path.join(MOTION, "engine", "template.html"), encoding="utf-8").read()
    sc = open(a.scenes, encoding="utf-8").read()
    src = tpl.replace("/*@@SCENES@@*/", sc).replace("@@TITLE@@", a.title)

    text = "".join(sorted(set(src) | {chr(i) for i in range(32, 127)} | set("·—–→⟹…“”‘’①②③④⑤⚡✓✗⚖▶❚")))
    ff = ""
    for fam, w, p in [("KSans", 400, "NotoSansCJK-Regular.ttc"), ("KSans", 700, "NotoSansCJK-Bold.ttc"),
                      ("KSerif", 700, "NotoSerifCJK-Bold.ttc")]:
        ff += '@font-face{font-family:"%s";font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format("woff2")}\n' % (
            fam, w, subset_font(NOTO + p, text))

    kd = os.path.join(MOTION, "node_modules", "katex", "dist")
    if not os.path.isdir(kd):
        sys.exit("motion/ 에서 `npm ci` 로 KaTeX 를 먼저 설치하세요.")
    css = open(os.path.join(kd, "katex.min.css"), encoding="utf-8").read()
    css = re.sub(r'src:url\(fonts/([^)]+\.woff2)\) format\("woff2"\)[^;}]*;?',
                 lambda m: 'src:url(data:font/woff2;base64,%s) format("woff2");' % base64.b64encode(
                     open(os.path.join(kd, "fonts", m.group(1)), "rb").read()).decode(), css)
    css += '\n.katex{font-family:KaTeX_Main,"KSans","Noto Sans CJK KR",serif}'
    js = open(os.path.join(kd, "katex.min.js"), encoding="utf-8").read()

    out = src.replace("/*@@FONTS@@*/", ff).replace("/*@@KATEXCSS@@*/", css).replace("/*@@KATEXJS@@*/", js)
    if a.audio:
        out = out.replace("@@NARR@@", "data:audio/mp4;base64," + base64.b64encode(open(a.audio, "rb").read()).decode())
    else:
        out = out.replace(' src="@@NARR@@"', "")
    open(a.out, "w", encoding="utf-8").write(out)
    print(f"{a.out}: {len(out):,} bytes")


if __name__ == "__main__":
    main()
