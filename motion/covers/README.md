# 장 표지 영상 (Manim)

각 장 첫 장면(`id:"title"`)은 Manim 으로 만든 표지 영상 `cN.mp4` 를 장면 시간에 맞춰 재생한다.
왼쪽: 장 번호·제목·질문 두 줄, 오른쪽: 그 장의 특징적 그래프(3Blue1Brown 형식, Pretendard 글꼴, LaTeX 미사용).

| 장 | 소스 |
|---|---|
| 1–5, 7 | `covers2.py` 의 `C1`…`C7` |
| 6 | `covers3.py` 의 `E6` (φπ 에 따른 고유값 크기) |
| 8, 9 | `covers5.py` 의 `G8`, `G9` (세계 지도 기반) |

```bash
cd motion/covers   # bash motion/tools/setup_env.sh 로 준비. manim = /opt/mvenv/bin/manim
manim -qh --disable_caching -o g8 covers5.py G8
ffmpeg -i <렌더.mp4> -an -r 30 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart c8.mp4
# 장면 원본(복호화한 scenes.js)의 title 장면을 영상으로 바꾼다
python3 apply_cover.py 원본.js c8.mp4 새.js
```
영상 길이는 title 장면 dur 보다 짧아야 한다(끝나면 마지막 프레임 유지).
