---
name: econ-shorts
description: 「오늘의 경제」 세로 쇼츠(경제 이론·현상 하나를 60초 안에, 모션 그래픽 + 한국어 음성 + 배경음악 MP4)를 만들거나 고칠 때 쓴다. "오늘 쇼츠 만들어", "다음 경제 쇼츠", "쇼츠 NNN 수정" 같은 요청이나 매일 예약 작업이면 이 스킬을 따른다.
---

# 오늘의 경제 쇼츠 제작

결과물: `shorts/videos/NNN_slug.mp4` (1080×1920, 30fps, ≤ 59초, AAC 48k 스테레오, −14 LUFS).
원본: `shorts/episodes/NNN_slug/episode.js` 한 파일(화면 + 자막 + 낭독문). 교재 내용이 아니므로 **암호화하지 않는다**.
기준 예시는 `shorts/episodes/001_hotelling/episode.js` — 새 편은 이것을 복사해 시작한다.

## 0. 준비 (세션마다)
```bash
git fetch origin main && git checkout -B main origin/main      # CLAUDE.md: main 에 직접
export SCRATCH=<스크래치 폴더>
bash shorts/tools/setup.sh $SCRATCH/models                     # ffmpeg·sherpa-onnx·모델(TTS/ASR) 멱등 설치
```

## 1. 주제 고르기
`shorts/topics.md` 에서 맨 위 `대기` 주제를 고른다(사용자가 주제를 주면 그것). 번호 NNN = 지금까지 만든 편 수 + 1.
사실·수치·연도·인물은 **웹 검색으로 확인**한다(원 논문·공식 자료 우선). 확인 못 한 일화는 쓰지 않거나 “~라는 이야기가 있다”로 낮춘다.

## 2. 대본 = episode.js
```js
Object.assign(EP, {no: 2, title: "코브라 효과", hook: "…", bgm: {seed: 23, bpm: 100, mood: "bright"},
  yt: {title: "… #경제 #shorts", tags: ["경제", "…", "shorts"]}});
scene({id: "hook", lines: [[자막, 낭독문, 효과음?], …], build(el){…return c}, update(c, lt, L){…}});
```
- 구성(6~8장면, 줄 14~18개, 낭독 합계 약 300~330자): **훅 질문(첫 2초)** → 설정 → 핵심 메커니즘(그림이 움직이며) → 반전/결과(숫자 하나) → 현실 사례 1~2 → 이름 공개 + “구독하고 매일 하나씩 만나요.”
- 줄 시간은 음성 길이로 자동으로 정해진다. 애니메이션은 `L[i]`(i번째 줄 시작 시각)에 맞춰 건다.
- 자막: 12~22자, 핵심어는 `**굵게**`(금색). 숫자·기호 가능.
- 낭독문: `motion/narration_rules.md` 의 읽기 규칙을 따른다 — **한글·문장부호만**(숫자·영문·기호 금지: 1929년 → “천구백이십구 년”, A → “에이”, 60% → “육십 퍼센트”). 자막과 같은 뜻, 구어체, 짧게.
- 효과음(선택, 줄의 3번째 칸): `pop` 등장, `ding` 결론, `coin` 숫자·돈, `whoosh` 이동(`whoosh@0.6` 처럼 줄 시작 뒤 초). 장면 전환 whoosh 는 자동.
- 배경음악 `bgm`: `mood` = bright(경쾌) / calm(잔잔) / tense(긴장·단조). `seed` 는 편마다 다른 수.
- 화면: `style-guide.md` 색(짙은 남색, 금색·하늘색 강조). 세로 배치 — 본문 그림 y≈330~1220, 자막 y=1300~, **y>1600 과 오른쪽 120px 는 쇼츠 UI 가 덮으므로 비운다.** 글자는 34px 이상.
- 엔진 도구(`shorts/engine/template.html`): `A, CX, svgLayer, S, ST(텍스트), ap(등장), sap(SVG 등장), draw(곡선 그리기), P, ease, eback, lerp, mixc(색 섞기), rng, axes, poly, countTo, K(수식)`.
- 그래프 수치는 직접 계산해 맞춘다(파일 머리 주석에 검산을 적는다).

## 3. 만들기 → 점검
```bash
python3 shorts/tools/make.py shorts/episodes/NNN_slug --tts $SCRATCH/models/sherpa-onnx-supertonic-tts-int8-2026-03-06 \
        --asr $SCRATCH/models/sherpa-onnx-zipformer-korean-2024-06-24 --only audio     # 빠른 점검(대조표까지)
python3 shorts/tools/make.py …같은 인자…                                              # 최종 MP4 (4코어 약 1분)
```
- `[3] 길이` 가 59초를 넘으면 낭독문을 줄인다(`--speed` 기본 1.25, 1.3 까지).
- 받아쓰기(asr) 결과에서 CER 0.3 이상 줄은 낱말을 바꾼다(발음이 뭉개지는 말 피하기). 자동으로 5번까지 다시 만들어 가장 또렷한 것을 쓴다.
- `$SCRATCH/shorts/NNN_slug/chk/contact.jpg` 를 **반드시 Read 로 열어** 겹침·잘림·빈 화면을 고친다. 특정 시각은
  `node shorts/tools/render.js <html> <폴더> --stills 3.2,7.5` 로 본다.

## 4. 저장
- `shorts/topics.md` 상태를 `완료 (NNN, YYYY-MM-DD)` 로 바꾼다.
- 커밋: `episode.js`, `upload.txt`(자동 생성: 제목·태그·설명), `videos/NNN_slug.mp4`, `topics.md` 를 한 커밋으로. `git push origin main`.
- 사용자에게 MP4 를 SendUserFile 로 보낸다(예약 실행이면 status=proactive). 업로드 문구(upload.txt)도 함께 알려 준다.
