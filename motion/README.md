# motion/ — 교재 장별 모션 그래픽 도구

| 경로 | 내용 |
|---|---|
| `engine/template.html` | 공통 엔진(무대·자막·재생기·수식/그래프 도우미). 교재 내용 없음 |
| `chapters/chNN/scenes.js.enc` | 장별 장면 원본(**암호화**) |
| `chapters/chNN/narration.txt.enc` | (선택) 낭독 원고(**암호화**) |
| `tools/unlock_book.py` | `DSGE_book_source.html` 에서 교재 LaTeX 원문 풀기 |
| `tools/secret.py` | 장면·원고 파일 암호화/복호화 |
| `tools/build.py` | 엔진 + 장면 → 자기완결 HTML (KaTeX·폰트 내장) |
| `tools/check.js` | 장면별 캡처·대조표·자동 점검 |
| `tools/publish.py` | 사이트와 같은 암호 페이지로 감싸 루트에 저장 |
| `tools/render.js` | (선택) MP4 렌더링 |

작업 절차와 규칙은 `.claude/skills/dsge-motion/SKILL.md` 에 있다. 암호는 저장소에 두지 않으며 `DSGE_PW` 환경변수로만 쓴다.

완성된 장: 제2장 기본 RBC 모형 → `/RBC_ch2_motion.html`, 제3장 Dynare를 이용한 모형 풀이 → `/Dynare_ch3_motion.html`, 제4장 베이지안 추정 → `/Bayesian_ch4_motion.html`
