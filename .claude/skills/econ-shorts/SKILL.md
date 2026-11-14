---
name: econ-shorts
description: 「오늘의 경제」 세로 쇼츠(경제 이론·현상 하나를 60초 안에, 모션 그래픽 + 한국어 음성 + 배경음악 MP4)를 만들거나 고칠 때 쓴다. "오늘 쇼츠 만들어", "다음 경제 쇼츠", "쇼츠 NNN 수정" 같은 요청이나 매일 예약 작업이면 이 스킬을 따른다.
---

# 오늘의 경제 쇼츠 제작

결과물: `shorts/videos/NNN_slug.mp4` (1080×1920, 30fps, ≤ 59초, AAC 48k 스테레오, −14 LUFS).
원본: `shorts/episodes/NNN_slug/episode.js` 한 파일(화면 + 자막 + 낭독문). 교재 내용이 아니므로 **암호화하지 않는다**.
기준 예시는 `shorts/episodes/001_hotelling/episode.js`(**v2 스타일**) — 새 편은 이것을 복사해 시작한다.
**모든 편은 v2 스타일(`style: "v2"`)로 만든다**(사용자 지시). 아래 “4절 v2 그래픽 규칙”을 반드시 지킨다.

## 0. 준비 (세션마다)
```bash
git fetch origin main && git checkout -B main origin/main      # CLAUDE.md: main 에 직접
export SCRATCH=<스크래치 폴더>
bash shorts/tools/setup.sh $SCRATCH/models                     # ffmpeg·sherpa-onnx·모델(TTS/ASR) 멱등 설치
```

## 1. 주제 고르기 — 유명 학술지 논문 한 편 (사용자 지시)
매 편은 **경제학 유명 학술지에 실린 논문 한 편**을 다룬다(Top 5: AER·QJE·JPE·Econometrica·REStud 우선, 다음으로 EJ·Economica·AEJ·JF 등).
`shorts/topics.md` 에서 맨 위 `대기` 논문을 고른다(사용자가 주제를 주면 그것). 번호 NNN = 지금까지 만든 편 수 + 1.
- **서지 확인**: 웹 검색으로 저자·연도·제목·학술지·권(호): 쪽을 원문(학술지 페이지, DOI, NBER/SSRN 판)에서 확인해 `EP.paper` 에 넣는다.
- **수치 확인**: 영상에 쓰는 숫자(회신율, 승률, 퍼센트 등)는 초록·본문 표에서 찾은 값만 쓰고, 출처 위치를 episode.js 머리 주석에 적는다.
  확인 못 한 숫자는 쓰지 않는다. 후속 연구로 반박·재현 실패가 알려진 결과면 마지막에 한 줄로 밝힌다.
- 논문을 쉽게 풀되 **과장하지 않는다**(상관을 인과로, 한 실험을 일반 법칙으로 말하지 않기).

## 2. 대본 = episode.js
```js
Object.assign(EP, {no: 2, style: "v2", title: "헬스장 회원권의 역설", hook: "…", bgm: {seed: 23, bpm: 100, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2006, authors: "Stefano DellaVigna & Ulrike Malmendier",
          title: "Paying Not to Go to the Gym", ko: "헬스장에 안 가려고 돈을 낸다", cite: "96(3): 694–719", url: "https://doi.org/…"},
  yt: {title: "… #경제 #shorts", desc: "한두 줄 요약", tags: ["경제", "…", "shorts"]}});
scene({id: "hook", lines: [[자막, 낭독문, 효과음?], …],
  build(el, hud){…return c},      // el: 카메라가 움직이는 그림 층, hud: 카메라 영향 없는 글자 층(큰 제목·카드·숫자 배지)
  cam(lt, L){return {x, y, s}},   // 선택: 초점(화면 좌표)과 배율. 없으면 느리게 1→1.045 밀어 들어감
  update(c, lt, L){…}});
```
- 구성(6~8장면, 줄 14~18개, 낭독 합계 약 300~330자):
  **훅 질문(첫 2초)** → **논문 카드**(“천구백칠십 년, 쿼털리 저널 오브 이코노믹스에 실린 논문”: `paperCard(el, y)` 로 학술지·연도·저자·원제 표시)
  → 실험·자료 설계(그림) → **핵심 결과 숫자 하나**(막대·그래프가 움직이며) → 왜 그럴까(메커니즘) → 일상에 주는 시사점 → “구독하고 매일 하나씩 만나요.”
- 학술지 이름 읽기: AER “아메리칸 이코노믹 리뷰”, QJE “쿼털리 저널 오브 이코노믹스”, JPE “저널 오브 폴리티컬 이코노미”,
  Econometrica “이코노메트리카”, REStud “리뷰 오브 이코노믹 스터디스”, EJ “이코노믹 저널”. 저자 이름은 한글 표기(“레빗”, “세일러”).
- 줄 시간은 음성 길이로 자동으로 정해진다. 애니메이션은 `L[i]`(i번째 줄 시작 시각)에 맞춰 건다.
- 자막: 12~22자, 핵심어는 `**굵게**`(금색). 숫자·기호 가능.
- 낭독문: `motion/narration_rules.md` 의 읽기 규칙을 따른다 — **한글·문장부호만**(숫자·영문·기호 금지: 1929년 → “천구백이십구 년”, A → “에이”, 60% → “육십 퍼센트”). 자막과 같은 뜻, 구어체, 짧게.
- 효과음(선택, 줄의 3번째 칸): `pop` 등장, `ding` 결론, `coin` 숫자·돈, `whoosh` 이동(`whoosh@0.6` 처럼 줄 시작 뒤 초). 장면 전환 whoosh 는 자동.
- 배경음악 `bgm`: `mood` = bright(경쾌) / calm(잔잔) / tense(긴장·단조). `seed` 는 편마다 다른 수.
- 그래프 수치는 직접 계산해 맞춘다(파일 머리 주석에 검산을 적는다).

### v2 그래픽 규칙 (“아마추어 같다”는 피드백으로 정함)
- **슬라이드처럼 만들지 않는다**: 머리말·제목 띠 없음(엔진이 왼쪽 위에 `오늘의 경제 #NNN` 만 작게 단다). 그림이 **화면 전체를 채운다**(full-bleed).
  그 편의 **장소·세계**를 하나 정해 배경으로 그린다(001: 노을 해변 — 하늘 그라데이션, 흐르는 물결, 질감 있는 모래). 해변이 아닌 장면은 `stageBg(el)`류 남색 빛 배경.
- **3D 아이콘**: `img(parent, "이름", 가운데x, 바닥y, 크기)` / `imgAt(e, x, y, 배율, 회전)`. 파일은 `shorts/assets/fluent/<이름>.png`
  (Microsoft Fluent Emoji 3D, MIT). 없는 것은 받아 쓴다:
  `curl -sf -o shorts/assets/fluent/<이름>.png "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/<이름 공백은 %20>/3D/<소문자_이름>_3d.png"`
  (사람·손 모양은 `…/Default/3D/…_3d_default.png`). 사람은 점·도형 대신 아이콘(80~110px)과 발밑 그림자/색 고리로.
  아이콘으로 안 되는 사물(수레, 가게, 건물)은 SVG 로 그라데이션·그림자·줄무늬를 넣어 그린다. 기본 도형 그대로(회색 원, 단색 사각형) 두지 않는다.
- **멈춘 화면 금지**: 배경이 늘 조금씩 움직인다(물결·구름·빛, 사람 들썩임). 등장은 `spr`(스프링)·`kinUp`(단어별 튀어 오름), 이동하는 물체는 속도만큼 기울인다.
  장면마다 `cam` 으로 당기기/밀기/초점 이동을 하나 이상 넣는다(1.0~1.3배).
- **숫자가 주인공**: 핵심 수치는 120~150px 굵은 숫자(`hud`), 변화량은 배지(`+10%p`). 영역·몫은 색 면으로 칠한다(점 색깔만으로 표현하지 않기).
- **큰 제목**: 장면 핵심어는 `kin(hud, y, "…**강조**…", 90~120)` + `kinUp`. 자막은 엔진이 단어별 강조로 자동 처리(상자 없음, 76px).
- **겹침**: 두 물체가 가까워지면 최소 간격을 둔다(예: 001 의 `w.pair`). 글자는 34px 이상, 눈금 38px 이상.
- **배치**: 그림 y≈120~1250(하늘·제목 120~560, 주무대 560~1250), 자막 y=1290~1450, **y>1500 과 오른쪽 120px 는 쇼츠 UI 자리라 비운다**(엔진이 아래를 어둡게 깐다).
- 색: 강조 금색 `#f2c14e`, 하늘색 `#5ab0ff`, 보조 `#6fcfb7`·`#ff8a65`. 한 화면 강조색은 둘~셋.
- 필름 질감·비네팅은 엔진이 자동으로 깐다(고정 질감 — 프레임마다 바꾸면 용량이 커진다).
- 엔진 도구: `img, imgAt, kin, kinUp, spr, paperCard, A, CX, svgLayer, S, ST, ap, sap, draw, P, ease, eback, lerp, mixc, rng, axes, poly, countTo, K`.
  SVG 그라데이션 id 는 장면마다 달라야 한다(같은 id 를 두 장면에서 쓰면 숨은 장면 것을 참조해 안 보인다).

## 3. 만들기 → 점검
```bash
python3 shorts/tools/make.py shorts/episodes/NNN_slug --tts $SCRATCH/models/sherpa-onnx-supertonic-tts-int8-2026-03-06 \
        --asr $SCRATCH/models/sherpa-onnx-zipformer-korean-2024-06-24 --only audio     # 빠른 점검(대조표까지)
python3 shorts/tools/make.py …같은 인자…                                              # 최종 MP4 (4코어 약 1분)
```
- `[3] 길이` 가 59초를 넘으면 낭독문을 줄인다(`--speed` 기본 1.25, 1.3 까지).
- 받아쓰기(asr) 결과에서 CER 0.3 이상 줄은 낱말을 바꾼다(발음이 뭉개지는 말 피하기). 자동으로 5번까지 다시 만들어 가장 또렷한 것을 쓴다.
- `$SCRATCH/shorts/NNN_slug/chk/contact.jpg` 를 **반드시 Read 로 열어** 겹침·잘림·빈 화면·밋밋한 화면을 고친다. 한두 장은 원래 크기로도 본다. 특정 시각은
  `node shorts/tools/render.js <html> <폴더> --stills 3.2,7.5` 로 본다.

## 4. 저장
- `shorts/topics.md` 상태를 `완료 (NNN, YYYY-MM-DD)` 로 바꾼다.
- 커밋: `episode.js`, `upload.txt`(자동 생성: 제목·설명·논문 출처·태그), `videos/NNN_slug.mp4`, `topics.md` 를 한 커밋으로. `git push origin main`.
- 사용자에게 MP4 를 SendUserFile 로 보낸다(예약 실행이면 status=proactive). 업로드 문구(upload.txt)도 함께 알려 준다.
