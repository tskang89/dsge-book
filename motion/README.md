# motion/ — 교재 장별 모션 그래픽 도구

| 경로 | 내용 |
|---|---|
| `engine/template.html` | 공통 엔진(무대·자막·재생기·수식/그래프 도우미). 교재 내용 없음 |
| `chapters/chNN/scenes.js.enc` | 장별 장면 원본(**암호화**, 제1~9장) |
| `chapters/chNN/narration.txt.enc` | (선택) 낭독 원고(**암호화**) |
| `tools/unlock_book.py` | `DSGE_book_source.html` 에서 교재 LaTeX 원문 풀기 |
| `tools/secret.py` | 장면·원고 파일 암호화/복호화 |
| `tools/build.py` | 엔진 + 장면 → 자기완결 HTML (KaTeX·폰트 내장) |
| `tools/check.js` | 장면별 캡처·대조표·자동 점검 |
| `tools/publish.py` | 빌드 결과를 루트에 공개(**암호 없음**, 모든 장) · `--unlock` 으로 예전 암호 페이지 평문화 |
| `tools/render.js` | (선택) MP4 렌더링 |

작업 절차와 규칙은 `.claude/skills/dsge-motion/SKILL.md`, 시각 규칙은 루트의 `style-guide.md` 에 있다. 암호는 저장소에 두지 않으며 `DSGE_PW` 환경변수로만 쓴다(장면 원본·교재 원문용). 공개 모션 그래픽에는 암호를 걸지 않는다.

완성된 장: 제1장 DSGE 모형 개관 → `/Overview_ch1_motion.html`, 제2장 기본 RBC 모형 → `/RBC_ch2_motion.html`, 제3장 Dynare를 이용한 모형 풀이 → `/Dynare_ch3_motion.html`, 제4장 베이지안 추정 → `/Bayesian_ch4_motion.html`, 제5장 가격 경직성 → `/PriceRigidity_ch5_motion.html`, 제6장 뉴케인지안 3방정식 모형 → `/ThreeEquation_ch6_motion.html`, 제7장 최적 통화정책 → `/OptimalPolicy_ch7_motion.html`, 제8장 두국가 모형 → `/TwoCountry_ch8_motion.html`, 제9장 소규모 개방경제 모형 → `/SmallOpenEconomy_ch9_motion.html`
