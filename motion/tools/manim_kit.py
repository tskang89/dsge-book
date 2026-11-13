"""Manim 클립 공통 스타일(표지·그래프 클립). LaTeX 가 없으므로 MathTex·DecimalNumber·축 숫자 자동표시를 쓰지 않는다.
   import sys; sys.path.insert(0, "<저장소>/motion/tools"); from manim_kit import *
"""
import os, manimpango
from manim import *
_F = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "node_modules", "pretendard", "dist", "public", "static")
for _w in ["Regular", "SemiBold", "Bold", "Light", "ExtraBold"]:
    manimpango.register_font(os.path.join(_F, f"Pretendard-{_w}.otf"))
# 색: 3Blue1Brown 계열 + 엔진 배경
BG = "#111a2b"; YEL = "#F4D345"; BLU = "#58C4DD"; GRN = "#83C167"; RED = "#FC6255"; TEAL = "#6fcfb7"
INK = "#ECE6D6"; MUT = "#8b95a8"; GR = "#2e3a52"; AXC = "#5f6a80"
config.background_color = BG

def T(s, size, col=INK, w=NORMAL):
    """한글 글자(Pretendard). 아래첨자는 MarkupText('φ<sub>b</sub>') 를 쓴다."""
    return Text(s, font="Pretendard", font_size=size, color=col, weight=w)

def curve(ax, f, a, b, n=400, **kw):
    """곡선은 반드시 촘촘히 표본화한다(기본 step=축 눈금이면 정점이 틀어진다)."""
    return ax.plot(f, x_range=[a, b, (b - a) / n], **kw)

def ticks(ax, xs=(), ys=(), size=16, fmt=str):
    """축 눈금 숫자를 Text 로 단다(numbers_to_include 대신)."""
    g = VGroup()
    for x in xs: g.add(T(fmt(x), size, MUT).next_to(ax.c2p(x, ax.y_range[0]), DOWN, buff=.12))
    for y in ys: g.add(T(fmt(y), size, MUT).next_to(ax.c2p(ax.x_range[0], y), LEFT, buff=.12))
    return g

def to_web(src, dst):
    """HTML 에 넣을 mp4 로 압축(30fps, 무음)."""
    import subprocess
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-an", "-r", "30", "-c:v", "libx264", "-preset", "slow",
                    "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart", dst], check=True)
