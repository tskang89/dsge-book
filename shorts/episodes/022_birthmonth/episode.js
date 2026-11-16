/* 오늘의 경제 022 — 태어난 달과 학력 (v3: 부엉이 진행자·한 공간 카메라 이동·학년 줄·학교 다닌 기간 막대)
   논문: Angrist, J. D. & Krueger, A. B. (1991) "Does Compulsory School Attendance Affect Schooling and Earnings?",
         Quarterly Journal of Economics 106(4): 979–1014. doi:10.2307/2937954 (NBER WP 3572)
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — NBER·RePEc 초록으로 확인):
   - 초록: 태어난 계절이 학력과 관련됨 — 입학 나이 규정 + 의무교육(일정 나이까지) 법이 함께 작용
   - 초록: 의무교육법 때문에 중퇴할 수 있었던 학생의 약 25%가 학교에 남음
   - 초록: 태어난 분기를 도구로 쓴 교육 수익률 추정치가 최소제곱(단순 비교) 추정치와 비슷 → 일반 추정의 편의가 작음
   - 앵그리스트: 2021년 노벨 경제학상(카드·임벤스와 공동)
   - 도구변수 추정치 약 7.5%/년, 최소제곱(단순 비교)과 거의 차이 없음 — 2차 요약(The Incidental Economist)
   - 1~3월생은 평균 학력·임금이 조금 낮음(논문의 기본 그림). 분기별 실제 수치는 확인 못 해 막대는 단순화 표시
   - 입학 규칙(그해 만 6살 → 9월 1학년)·'열여섯 살'은 주마다 다른 규칙의 예시 */
Object.assign(EP, {no: 22, style: "v2", title: "태어난 달과 학력", hook: "태어난 달이 소득을 바꾼다?",
  bgm: {seed: 251, bpm: 98, mood: "calm"},
  paper: {journal: "Quarterly Journal of Economics", year: 1991, authors: "Joshua D. Angrist & Alan B. Krueger",
          title: "Does Compulsory School Attendance Affect Schooling and Earnings?", ko: "의무교육은 학력과 소득에 영향을 줄까?",
          cite: "106(4): 979–1014", url: "https://www.nber.org/papers/w3572"},
  yt: {title: "태어난 달이 학력을 바꾼다? | 도구변수 #경제 #shorts",
       desc: "알고 싶은 건 학교를 1년 더 다니면 임금이 얼마나 오르는가, 즉 교육 수익률(Return to Education)이다. 가장 쉬운 방법은 오래 다닌 사람과 짧게 다닌 사람의 임금을 그냥 비교하는 것. 하지만 오래 다닌 사람은 원래 능력이 좋았을 수도 있어서, 학교의 효과에 능력의 효과가 섞인다. 그래서 필요한 건 능력과 상관없는 이유로 학교를 더 다니게 된 사람들이다. 미국에선 보통 그해에 만 6살이 되는 아이들이 9월에 함께 1학년이 된다. 그래서 입학할 때 1월생은 만 6살 8개월, 12월생은 만 5살 9개월이다. 그런데 의무교육은 몇 학년까지가 아니라 16번째 생일까지였다(주마다 다름). 1월생은 10학년 중간에, 12월생은 11학년이 돼서야 16살이 된다. 그래서 그만두려는 학생이라면 1월생이 거의 1년 덜 다니고 나갈 수 있었다. 실제로 인구조사 자료에서 1~3월생은 평균 학력이 조금 낮았고 임금도 조금 낮았다. 연구진은 학교를 그만둔 학생 넷 중 한 명(약 25%)은 이 법이 없었다면 더 일찍 그만뒀을 거라고 추정했다. 태어난 시기는 능력과 상관이 없으니, 이 임금 차이는 학교를 덜 다닌 탓으로 볼 수 있다. 그래서 임금 차이를 학력 차이로 나누면 학교 1년의 효과가 나온다. 이런 방법을 도구변수(Instrumental Variable)라고 한다. 결과는 학교 1년에 임금 약 7.5%로 단순 비교와 거의 같았다. 능력이 섞여 결과가 부풀려졌을 거라는 걱정은 크지 않았고, 학교를 더 다녀 더 버는 건 대부분 학교 덕이었다. 앵그리스트 교수는 2021년 노벨 경제학상을 받았다.",
       tags: ["경제", "계량경제학", "도구변수", "교육", "노벨경제학상", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 달력 | 1080 같은 학년 | 2160 다닌 기간 | 3240 분기별 학력
let WID = 0;

function classWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#30304e"], [1, "#44466a"]]); lg("floor", [[0, "#8a6a4a"], [1, "#4a3420"]]);
  lg("sun", [[0, "#fff2c0", .25], [1, "#fff2c0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 150) S("line", {x1: x, y1: 1000, x2: x - 260, y2: H, stroke: "#3a2614", "stroke-width": 3, opacity: .4}, g);
  w.suns = [300, 1400, 2500, 3600].map(x => S("path", {d: `M${x},0 L${x + 200},0 L${x + 560},1000 L${x + 120},1000 Z`, fill: U("sun")}, g));
  // 0: 달력 12달
  w.months = Array.from({length: 12}, (_, i) => {const gg = S("g", {}, g), x = 150 + (i % 4) * 260, y = 380 + Math.floor(i / 4) * 200;
    S("rect", {x: x - 110, y: y - 80, width: 220, height: 160, rx: 14, fill: "#f4f1e6"}, gg);
    S("rect", {x: x - 110, y: y - 80, width: 220, height: 44, rx: 14, fill: i < 3 ? CORAL : "#5a6a9a"}, gg);
    ST(gg, x, y + 40, (i + 1) + "월", {"font-size": 50, "font-weight": 900, fill: "#2b2b2b"}); return gg});
  // 1080: 같은 학년 줄 (연초생이 나이 많음)
  w.row = [["1월생", 1080 + 220, 1.08, CORAL], ["6월생", 1080 + 540, 1.0, "#c9cfe6"], ["12월생", 1080 + 860, .92, TEAL]].map(([t, x, s, col]) => {
    const p = img(w.layer, "person", x, 1000, 260 * s);
    ST(g, x, 1060, t, {"font-size": 44, "font-weight": 900, fill: col}); return {p, x, s}});
  w.ageL = ST(g, 1080 + 540, 420, "같은 학년", {"font-size": 60, "font-weight": 900, fill: "#fff", opacity: 0});
  w.older = ST(g, 1080 + 220, 560, "", {"font-size": 42, "font-weight": 800, fill: CORAL});
  w.ages = [[1080 + 220, "만 6살 8개월", CORAL], [1080 + 860, "만 5살 9개월", TEAL]].map(([x, t, col]) => ST(g, x, 640, t, {"font-size": 40, "font-weight": 900, fill: col, opacity: 0}));
  w.sep = ST(g, 1080 + 540, 340, "그해 만 6살 → 9월 1학년 (예시 규칙)", {"font-size": 40, "font-weight": 800, fill: GOLD, opacity: 0});
  // 2160: 다닌 기간 막대 (단순화)
  const tx = 2160 + 120;
  w.tl = [["1월생", CORAL, 540], ["12월생", TEAL, 820]].map(([t, col, y]) => {
    ST(g, tx, y - 60, t, {"font-size": 44, "font-weight": 900, fill: col, "text-anchor": "start"});
    const bar = S("rect", {x: tx, y: y - 30, width: 0, height: 60, rx: 12, fill: col}, g);
    const cake = img(w.layer, "birthday_cake", 0, 0, 90);
    return {bar, cake, y}});
  for (let k = 1; k <= 12; k++) {S("line", {x1: tx + (k - 1) * 70, y1: 880, x2: tx + (k - 1) * 70, y2: 905, stroke: "#c9cfe6", "stroke-width": 3}, g);
    ST(g, tx + (k - 1) * 70 + 35, 940, k, {"font-size": 30, "font-weight": 800, fill: "#c9cfe6"})}
  ST(g, tx + 420, 380, "다닌 학년 (1칸 = 1년)", {"font-size": 40, "font-weight": 800, fill: "#fff"});
  w.cut = ST(g, tx + 420, 990, "", {"font-size": 40, "font-weight": 800, fill: "#fff"});
  w.endLab = [["→ 10학년 중간에 16살", CORAL, 495], ["→ 11학년에 16살", TEAL, 775]].map(([t, col, y]) => ST(g, tx + 150, y, t, {"font-size": 38, "font-weight": 900, fill: col, "text-anchor": "start", opacity: 0}));
  // 3240: 분기별 학력 (단순화)
  w.q = [["1~3월", .9, CORAL], ["4~6월", .96, "#c9cfe6"], ["7~9월", .98, "#c9cfe6"], ["10~12월", 1, TEAL]].map(([t, v, col], i) => {
    const x = 3240 + 180 + i * 240, r = S("rect", {x: x - 80, y: 1000, width: 160, height: 0, rx: 12, fill: col}, g);
    ST(g, x, 1060, t, {"font-size": 38, "font-weight": 800, fill: "#fff"}); return {r, v}});
  w.qNote = ST(g, 3240 + 540, 340, "", {"font-size": 46, "font-weight": 900, fill: GOLD});
  // 앞쪽(흐린) 형광등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#e8f1ff", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.suns.forEach((s, i) => s.setAttribute("opacity", .7 + .3 * Math.sin(lt * 1.1 + i)));
    w.row.forEach((r, i) => imgAt(r.p, r.x, 1000 - 5 * Math.abs(Math.sin(lt * 2 + i)), 1, 0))};
  w.cal = (lt, t0) => w.months.forEach((m, i) => {const u = clamp((lt - t0 - i * .08) / .3); m.setAttribute("opacity", u);
    m.setAttribute("transform", `translate(0,${(1 - u) * 30})`)});
  // 다닌 기간: u 진행, 1월생은 0.82 지점에서 '그만둘 수 있음'
  w.years = u => w.tl.forEach((t, j) => {const L1 = (j === 0 ? 9.33 : 10.25) * 70, len = L1 * clamp(u);
    t.bar.setAttribute("width", len); imgAt(t.cake, tx + L1, t.y - 40, u > .9 ? 1 : 0, 0); t.cake.style.opacity = u > .9 ? 1 : 0;
    w.endLab[j].setAttribute("opacity", u > .95 ? 1 : 0)});
  w.qGrow = (lt, t0) => {w.q.forEach((q, i) => {const u = ease((lt - t0 - i * .2) / .7), h = 520 * q.v * u;
    q.r.setAttribute("height", h); q.r.setAttribute("y", 1000 - h)}); w.qNote.textContent = lt > t0 + 1.4 ? "태어난 분기별 평균 학력 (단순화)" : ""; w.qNote.setAttribute("y", 300)};
  w.cal(-99, 0); w.years(0); w.qGrow(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["태어난 시기에 따라 **소득**이 달라진다?", "태어난 시기에 따라, 소득이 달라질 수 있을까요?", "pop"],
  ["논문은 1991년 **QJE**에", "논문은 천구백구십일 년에 나왔습니다."],
  ["저자: 앵그리스트_교수와 크루거_교수", "저자는, 앵그리스트 교수와 크루거 교수입니다."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.h = kin(hud, 110, "태어난 달 → **소득**?", 90);
    c.j = kin(hud, 110, "**1991** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.cal(lt, .4);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 무엇을 재려는가 + 단순 비교의 문제 */
scene({id: "problem", lines: [
  ["알고 싶은 것: 학교를 **1년 더** 다니면 임금이 얼마나 오를까", "알고 싶은 건, 학교를 일 년 더 다니면 임금이 얼마나 오르는가 입니다.", "pop"],
  ["이것을 **교육_수익률**이라고 한다", "이것을, 교육 수익률이라고 합니다."],
  ["쉬운 방법: 오래 다닌 사람과 짧게 다닌 사람의 **임금 비교**", "가장 쉬운 방법은, 오래 다닌 사람과 짧게 다닌 사람의 임금을 그냥 비교하는 겁니다.", "coin"],
  ["문제: 오래 다닌 사람은 원래 **능력이_좋았을** 수도", "하지만 오래 다닌 사람은, 원래 능력이 좋았을 수도 있죠."],
  ["그러면 학교 효과에 **능력 효과**가 섞인다", "그러면 학교의 효과에, 능력의 효과가 섞여 버립니다.", "whoosh@0.2"],
  ["필요한 것: 능력과 무관하게 **학교를_더_다닌** 사람들", "그래서 필요한 건, 능력과 상관없는 이유로 학교를 더 다니게 된 사람들입니다."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.86)"});
    c.t = CX(hud, 150, "학교 1년 → 임금 몇 % ↑?", "", {fontSize: "66px", fontWeight: 900, color: GOLD});
    c.pA = img(hud, "person", 300, 960, 240); c.pB = img(hud, "person", 780, 960, 240);
    c.lA = CX(hud, 990, "", "", {fontSize: "1px"});
    c.yA = A(hud, 160, 990, "12년 다님", "", {width: "280px", textAlign: "center", fontSize: "44px", fontWeight: 800, color: "#fff"});
    c.yB = A(hud, 640, 990, "16년 다님", "", {width: "280px", textAlign: "center", fontSize: "44px", fontWeight: 800, color: "#fff"});
    c.cA = Array.from({length: 3}, (_, i) => img(hud, "coin", 300, 640 - i * 34, 90));
    c.cB = Array.from({length: 5}, (_, i) => img(hud, "coin", 780, 640 - i * 34, 90));
    c.br = img(hud, "brain", 900, 470, 160);
    c.mix = CX(hud, 360, "학교 효과 + 능력 효과?", "", {fontSize: "50px", fontWeight: 900, color: CORAL});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.cal(99, 0);
    c.dim.style.opacity = P(lt, 0, .4); ap(c.t, lt, .4); c.t.innerHTML = lt > L[1] - .1 && lt < L[2] ? "교육 수익률 (Return to Education)" : "학교 1년 → 임금 몇 % ↑?";
    const pe = spr((lt - L[2] - .2) / .5);
    [c.pA, c.pB].forEach((p, i) => {imgAt(p, [300, 780][i], 960, clamp(pe, 0, 1.2), 0); p.style.opacity = clamp(pe * 2)});
    [c.yA, c.yB].forEach(y => y.style.opacity = P(lt, L[2] + .5, .3));
    [...c.cA, ...c.cB].forEach((e, i) => {const u = spr((lt - L[2] - 1 - i * .12) / .4); e.style.opacity = clamp(u * 2);
      imgAt(e, i < 3 ? 300 : 780, 640 - (i < 3 ? i : i - 3) * 34, clamp(u, 0, 1.2), 0)});
    const tb = spr((lt - L[3] - .2) / .5); imgAt(c.br, 900, 470, clamp(tb, 0, 1.2), 0); c.br.style.opacity = clamp(tb * 2) * (1 - P(lt, L[5], .3));
    ap(c.mix, lt, L[4] + .2);
    c.o.up(lt, {mood: lt > L[3] && lt < L[5] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 장치: 입학 나이 + 의무교육 */
scene({id: "mech", lines: [
  ["그해 **만 6살**이 되는 아이들이 9월에 함께 1학년", "미국에선 보통, 그해에 만 여섯 살이 되는 아이들이, 구월에 함께 일 학년이 됩니다.", "pop"],
  ["입학 때 1월생 **만 6살 8개월**, 12월생 **만 5살 9개월**", "그래서 입학할 때, 일월생은 만 여섯 살 팔 개월, 십이월생은 만 다섯 살 구 개월이죠."],
  ["의무교육은 학년이 아니라 **16번째 생일**까지", "그런데 의무교육은, 몇 학년까지가 아니라 열여섯 번째 생일까지였습니다.", "whoosh@0.2"],
  ["1월생은 **10학년 중간**, 12월생은 **11학년**에 16살", "일월생은 십 학년 중간에, 십이월생은 십일 학년이 돼서야 열여섯 살이 됩니다."],
  ["그만두려면 1월생이 **거의 1년 덜** 다니고 나갈 수 있다", "그래서 그만두려는 학생이라면, 일월생이 거의 일 년 덜 다니고 나갈 수 있었죠.", "ding"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.u = CX(hud, 1150, "입학 규칙·16살은 예시 (주마다 다름)", "", {fontSize: "34px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[2] ? whip(lt, 0, 0, 1080, .9) : whip(lt, L[2], 1080, 2160, .9));
    w.ageL.setAttribute("opacity", P(lt, 1, .3)); w.sep.setAttribute("opacity", P(lt, 1.4, .3));
    w.ages.forEach((a, i) => a.setAttribute("opacity", P(lt, L[1] + .5 + i * .6, .3)));
    w.years((lt - L[3]) / 2); w.cut.textContent = lt > L[3] + 2 ? "케이크 = 16번째 생일" : ""; ap(c.u, lt, 1.6);
    c.o.up(lt, {mood: lt > L[4] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 결과와 도구변수 */
scene({id: "result", lines: [
  ["1~3월생은 **학력도_임금도** 조금 낮았다", "실제로 인구조사 자료에서, 일월에서 삼월생은 평균 학력이 조금 낮았고, 임금도 조금 낮았습니다.", "coin"],
  ["중퇴한 학생 넷 중 하나는, 법 때문에 **더 오래** 다녔다", "연구진은, 학교를 그만둔 학생 넷 중 한 명은, 이 법이 없었다면 더 일찍 그만뒀을 거라고 추정했죠."],
  ["태어난 시기는 능력과 무관 → 임금 차이는 **학교 차이 때문**", "태어난 시기는 능력과 상관이 없으니, 이 임금 차이는 학교를 덜 다닌 탓으로 볼 수 있습니다.", "pop"],
  ["임금 차이 ÷ 학력 차이 = **학교 1년의 효과**", "그래서 임금 차이를 학력 차이로 나누면, 학교 일 년의 효과가 나옵니다."],
  ["이런 방법 = **도구변수**(Instrumental Variable)", "이런 방법을, 도구변수라고 합니다.", "ding"],
  ["결과: 학교 1년에 **약_7.5%**, 단순 비교와 거의 같음", "결과는 학교 일 년에 임금 약 칠 점 오 퍼센트로, 단순 비교와 거의 같았습니다.", "coin"],
  ["능력이 섞여 생긴 **부풀림은 작았다**", "능력이 섞여 결과가 부풀려졌을 거라는 걱정은, 크지 않았던 거죠."],
  ["학교를 더 다녀 더 버는_건 **대부분 학교 덕**", "학교를 더 다녀 더 버는 건, 대부분 학교 덕이었습니다.", "ding"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.f = CX(hud, 150, "", "", {fontSize: "58px", fontWeight: 900, color: GOLD, textShadow: "0 5px 0 rgba(0,0,0,.35)"});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.years(1);
    w.qGrow(lt, 1);
    c.f.innerHTML = lt < L[3] ? "" : lt < L[5] ? "임금 차이 ÷ 학력 차이" : "도구변수 ≈ 7.5% · 단순 비교 ≈ 비슷";
    c.f.style.opacity = P(lt, L[3] + .2, .3);
    c.o.up(lt, {mood: lt > L[6] ? "happy" : lt > L[5] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**의무교육은 학력과 소득에 영향을 줄까?**〉", "논문 제목은, 의무교육은 학력과 소득에 영향을 줄까 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.cal(99, 0); w.qGrow(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
