# shorts/ — 「오늘의 경제」 세로 쇼츠

경제 이론·현상 하나를 60초 안에: 모션 그래픽 + 한국어 합성 음성 + 자체 합성 배경음악·효과음 → 1080×1920 MP4.

| 경로 | 내용 |
|---|---|
| `topics.md` | 주제 목록(하루 한 편, 위에서부터) |
| `episodes/NNN_slug/episode.js` | 한 편의 원본: 장면 그림 + 자막 + 낭독문 |
| `episodes/NNN_slug/upload.txt` | 업로드용 제목·해시태그(자동 생성) |
| `videos/NNN_slug.mp4` | 완성 영상 |
| `engine/template.html` | 세로 엔진(무대·자막·소리 계획). 색은 루트 `style-guide.md` |
| `tools/make.py` | 전체 파이프라인: 빌드 → TTS(+받아쓰기 재녹음) → 시간 맞춤 → 믹싱 → 렌더 |
| `tools/bgm.py` | 배경음악·효과음 합성(numpy, 저작권 문제 없음) |
| `tools/render.js`, `tools/plan.js` | Playwright 프레임 캡처 / 소리 계획 추출 |
| `tools/setup.sh` | 도구·모델 설치(멱등) |

작업 절차는 `.claude/skills/econ-shorts/SKILL.md`.

음성: Supertonic 2(sherpa-onnx, 한국어 여성 화자) · 받아쓰기 점검: zipformer-korean. 모델은 저장소에 넣지 않는다.
