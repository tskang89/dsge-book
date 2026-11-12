---
name: dsge-motion
description: 『동태 확률 일반균형 모형』 교재의 장(章)별 모션 그래픽(자막이 붙은 애니메이션 해설 영상, 암호화된 HTML)을 만들거나 고칠 때 쓴다. "제N장 모션 그래픽 만들어줘", "모션 그래픽 수정", "영상에 장면 추가" 같은 요청이면 먼저 이 스킬을 따른다.
---

# 교재 장별 모션 그래픽 제작

제2장(기본 RBC 모형)에서 확립한 방식이다. 결과물은 저장소 루트의 암호화된 HTML 한 파일
(예: `RBC_ch2_motion.html`)이며 GitHub Pages(`https://tskang89.github.io/dsge-book/<파일>`)로 공개된다.
교재 원문은 암호로 보호되어 있으므로 **교재 내용이 담긴 평문은 절대 커밋하지 않는다.**

**시각 규칙은 저장소 루트의 `style-guide.md` 를 따른다**(짙은 남색 배경, 금색·하늘색 강조, Pretendard,
0.5초 ease-in-out 전환, 수식은 한 줄씩 왼→오로 써짐, 곡선은 왼→오로 그려짐). 작업 전에 반드시 읽는다.
엔진·빌드 도구를 바꿔 가이드가 바뀌면 `style-guide.md` 도 함께 고치고, 모든 장을 다시 빌드한다(아래 6절).

## 0. 준비 (세션마다)

```bash
apt-get update && apt-get install -y fonts-noto-cjk   # 보충 기호 글꼴(빌드 시 부분집합으로 내장)
cd motion && npm ci && pip install fonttools brotli cryptography   # npm ci 가 KaTeX 와 Pretendard 를 설치
```

- 암호는 **사용자에게 받아** `export DSGE_PW=...` 로만 쓴다. 파일·커밋 메시지·PR에 적지 않는다.
- 작업 파일(원고, 평문 장면, 빌드 결과, 캡처)은 전부 스크래치 폴더에 둔다.

## 1. 원고 읽기

```bash
python3 motion/tools/unlock_book.py DSGE_book_source.html $SCRATCH/book
```
`$SCRATCH/book/main.tex` 의 `\subfile` 순서로 장 번호를 확인한다
(1 overview, 2 rbc_basic, 3 rbc_dynare, 4 rbc_bayesian, 5 nk_price …).
해당 `chapters/*.tex` 를 처음부터 끝까지 읽고, 수식·기호·수치·참고 박스를 원고 그대로 따른다.
`Download_Codes/`(데이터, Dynare 코드)와 `Pictures/` 도 활용할 수 있다.

## 2. 장면 원본 작성

- 엔진: `motion/engine/template.html` (공통). 장면은 장마다 `scenes.js` 하나에 쓴다.
  장면에서 배경·글꼴·전환 시간을 따로 정의하지 않는다(가이드의 토큰과 `ap`/`draw` 기본값을 쓴다).
- 기존 장을 고칠 때: `python3 motion/tools/secret.py dec motion/chapters/chNN/scenes.js.enc $SCRATCH/scenes.js`
- 참고 구현: 제2장 `motion/chapters/ch02/scenes.js.enc` (복호화해서 읽을 것). 모든 장면 패턴이 들어 있다.

### 엔진 API (scenes.js 에서 쓰는 것)
- `scene({id, title, dur, caps:[[초, "자막($수식$ 가능)"],…], build(el){…return c}, update(c, lt){…}})`
  - 1920×1080 무대. 본문은 y≈200~900, 자막 막대가 y≈930 아래를 차지한다.
  - `title` 은 재생기의 장 선택 목록에 나온다(“2.3 대표 기업” 처럼 절 번호 포함).
- 배치: `A(el,x,y,html,cls,css)` 절대위치 div, `CX(el,y,html,cls)` 가운데 정렬, `LY(el)` 전체 크기 레이어.
- 수식: `K(tex, display)` (KaTeX). 텍스트 속 `$…$` 는 자막에서 자동 변환. 글자 크기 클래스 `eq / eqm / eqs / big / mid / sm`.
- 머리말: `c.h=header(el,"2.3 대표 기업","제목","English")` + update 에서 `hdUpdate(c.h,lt)`.
- 애니메이션: `ap(el,lt,등장초,퇴장초,{dx,dy,s})`, `wipe`, `glow(el,0~1)`, SVG `draw(path,0~1)`, `P(lt,a,d)`(0→1 이징).
- SVG: `svgLayer(el)`, `S(tag,attrs,parent)`, `axes(g,x0,y0,w,h,{xl,yl})`, `poly(pts)`, 난수 `rng(seed)`, `gauss(r)`.
- 장면 길이 조정: 장면 파일 맨 위 `const FIT={id:초}` 로 비례 압축/확장. (`SEG` 는 음성 동기화용, 음성 없으면 비워 둔다.)

### 구성 원칙 (사용자 피드백으로 확정된 것)
1. **도입과 연결**: 타이틀 → “제(N-1)장 돌아보기”(앞 장 핵심을 한 장면으로 되짚고 “이 장부터 …”로 넘기기) → “이 장에서 다루는 것” 로드맵(번호 카드) 순으로 시작하고, 맺음말·다음 장 예고로 끝낸다.
   마지막 장면(outro)은 시작 화면처럼 보이지 않게 “— 제N장 끝 —” 표시 + 장 제목 + “다음: 제(N+1)장 …” 과
   마무리 자막(“이것으로 제N장을 마칩니다. 다음 장에서는 …”)을 넣고, 끝에서 화면을 서서히 어둡게 한다(자막은 빈 칸으로 끝냄).
   앞 장 영상의 마지막 예고 문장과 이 장의 첫 연결 문장이 서로 맞물리게 쓴다. 다른 장의 초안이 다른 브랜치에 있을 수 있으니
   `git ls-remote --heads origin` 과 `git ls-tree -r --name-only origin/<브랜치> | grep motion` 으로 먼저 찾아 내용을 확인한다
   (복호화: `motion/tools/unlock_book.py` 의 `unlock_page`).
2. **흐름**: 원고의 논리 순서를 따르되 “왜 이 모형/개념이 필요한가”를 먼저 보인다(예: 정형화된 사실 → RBC 등장).
3. **기호는 처음 나올 때 정의**한다(화면 또는 자막). 예: w_t=노동 1단위당 실질임금, δ=감가상각률, 𝔼_t=조건부 기대, λ=HP 평활 모수. 개념어(1차 동차, 변동성=순환 성분의 표준편차, 상태/통제변수)도 정의부터.
4. **도출은 생략 없이** 한 줄씩(`⟹`). 지수 정리 같은 중간 단계도 보인다(예: n^{-α}=n^{1-α}/n).
5. **대입하면 무엇을 대체했는지 `\underbrace{…}_{=w_t}`** 로 표시. 비교는 좌우 표 + ⇔ (예: 계획자 vs 경쟁균형 1계 조건).
6. **그래프는 정확하게**: 실제 자료(예: statsmodels macrodata 미국 GDP + HP 필터)를 쓰고, x·y축과 눈금을 그린다.
   곡선을 경계값으로 잘라(clamp) 생기는 가짜 수평선 금지 → SVG clipPath 로 자른다. 모의 경로는 표본 평균이 0 근처인 시드를 고른다.
7. **한 화면에 하나의 핵심**: 내용이 많으면 장면을 나눈다. 요소끼리·자막과 겹치지 않게 한다.
8. **음성 내레이션은 넣지 않는다**(사용자가 요청할 때만, 아래 부록).
9. 수치는 원고 모수로 직접 계산해 검산한다(정상상태 값 등).

## 3. 빌드 → 점검 (반드시 눈으로 확인)

```bash
python3 motion/tools/build.py $SCRATCH/scenes.js $SCRATCH/out.html --title "제N장 … 모션 그래픽"
node motion/tools/check.js $SCRATCH/out.html $SCRATCH/chk      # 장면별 캡처 + contact_*.jpg + 자동 점검
```
- `contact_*.jpg` 를 **모두 Read 로 열어** 겹침·잘림·빈 화면을 확인하고 고친다. 장면 중간 시점도 필요하면 따로 캡처한다.
- 자동 점검이 “페이지 오류·수식 이상 없음” 이어야 한다.

### 자주 겪은 함정
- **JS 문자열 속 TeX 이스케이프**: `"\\;"` 가 `\;` 로 줄면 화면에 `;;` 가 보인다. TeX 를 파이썬으로 넣을 땐 raw 문자열을 `json.dumps` 로 JS 리터럴화한다.
- `draw()` 는 stroke-dasharray 를 덮어쓴다 → 점선은 `draw` 대신 opacity 로 나타낸다.
- SVG `<text>` 색은 `fill` 속성으로(전역 CSS 가 fill 없는 text 만 기본색 처리).
- `A()` 의 부모 레이어는 `LY(el)` 처럼 전체 크기여야 한다(폭 0 부모면 글자가 세로로 줄바꿈된다).
- 인라인 `\frac` 는 작다 → 화면 수식은 `\dfrac`.

## 4. 저장 · 공개

```bash
python3 motion/tools/secret.py enc $SCRATCH/scenes.js motion/chapters/chNN/scenes.js.enc   # 장면 원본(암호화)
python3 motion/tools/publish.py $SCRATCH/out.html <이름>_motion.html "제N장 … — 모션 그래픽"  # 루트에 암호 페이지
```
- `publish.py` 는 루트 `index.html` 의 암호 화면을 틀로 쓰고 복호화 검증까지 한다.
- 사용자에게 미리보기를 줄 때는 Artifact 로 게시(같은 file_path 로 재게시하면 링크 유지).
- `index.html` 은 사이트 갱신 스크립트가 다시 만드므로 수정하지 않는다(목차 링크는 사용자가 스크립트에서 추가).

## 5. Git (사용자 지시: 브랜치·PR 없이 main 에 직접)

- 이 저장소에서는 **브랜치나 PR 을 만들지 않고 `main` 에 직접 커밋·푸시**한다.
  세션이 다른 작업 브랜치를 지정해 주더라도 이 저장소에서는 사용자의 이 지시가 우선한다.
- 시작 전 `git fetch origin main && git checkout -B main origin/main` 으로 최신 상태에서 시작한다.
- 푸시: `git push origin main`. 거절되면 `git pull --rebase origin main` 후 다시 푸시(강제 푸시 금지).
- 커밋은 의미 단위로 나누고, 공개 파일(`*_motion.html`)과 암호화 원본(`scenes.js.enc`)을 같은 커밋에 넣는다.

## 6. 전체 재빌드 (엔진·가이드가 바뀌었을 때)

모든 장의 원본은 `motion/chapters/chNN/scenes.js.enc` 에 있다. 각 장에 대해:
```bash
python3 motion/tools/secret.py dec motion/chapters/chNN/scenes.js.enc $SCRATCH/chNN.js
python3 motion/tools/build.py $SCRATCH/chNN.js $SCRATCH/chNN.html --title "<기존 <title>>"
node motion/tools/check.js $SCRATCH/chNN.html $SCRATCH/chkNN
python3 motion/tools/publish.py $SCRATCH/chNN.html <이름>_motion.html "<기존 암호 화면 제목>"
```
| 장 | 공개 파일 | `--title` | 암호 화면 제목 |
|---|---|---|---|
| 1 | `Overview_ch1_motion.html` | 제1장 DSGE 개관 모션 그래픽 | 제1장 DSGE 모형 개관 — 모션 그래픽 |
| 2 | `RBC_ch2_motion.html` | 제2장 RBC 모션 그래픽 | 제2장 기본 RBC 모형 — 모션 그래픽 |
| 3 | `Dynare_ch3_motion.html` | 제3장 Dynare를 이용한 모형 풀이 — 모션 그래픽 | 제3장 Dynare를 이용한 모형 풀이 — 모션 그래픽 |
| 4 | `Bayesian_ch4_motion.html` | 제4장 베이지안 추정 모션 그래픽 | 제4장 베이지안 추정 — 모션 그래픽 |
| 5 | `PriceRigidity_ch5_motion.html` | 제5장 가격 경직성 모션 그래픽 | 제5장 가격 경직성 — 모션 그래픽 |
| 6 | `ThreeEquation_ch6_motion.html` | 제6장 뉴케인지안 3방정식 모형 모션 그래픽 | 제6장 뉴케인지안 3방정식 모형 — 모션 그래픽 |

## 부록: 음성(요청 시에만)
제2장에서 오프라인 한국어 TTS 를 검증했다: sherpa-onnx(`pip install sherpa-onnx`) +
GitHub 릴리스 `k2-fsa/sherpa-onnx` 의 `tts-models/sherpa-onnx-supertonic-tts-int8-2026-03-06.tar.bz2`
(Supertonic 2, 한국어, 화자 0~4 여성·5~9 남성, `GenerationConfig.extra={"lang":"ko"}`, speed 1.15).
낭독 원고는 수식·기호를 한글로 풀어 쓰고(시그마, 베타…), 소수는 “영 점 구구”처럼 띄어 쓴다.
발음 검증은 `asr-models/sherpa-onnx-zipformer-korean-2024-06-24` 로 받아쓰기 비교.
자막 구간 길이를 음성 길이에 맞춰 늘리는 것이 `SEG` 이며, 빌드 시 `--audio narr.m4a`.
제2장 낭독 원고: `motion/chapters/ch02/narration.txt.enc`.
