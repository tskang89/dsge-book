/* 오늘의 경제 033 — 태어난 시기와 학력 (022 폐기본을 설명을 보강해 다시 만듦: 무엇을 재나·왜 우연인가·법의 작동·나눗셈 예시·결론의 뜻)
   논문: Angrist, J. D. & Krueger, A. B. (1991) "Does Compulsory School Attendance Affect Schooling and Earnings?",
         Quarterly Journal of Economics 106(4): 979–1014. doi:10.2307/2937954 (NBER WP 3572)
   확인(2026-11-16·18, 원문 PDF 는 이 세션에서 막힘 — NBER·RePEc 초록, 재현 논문 요약으로 확인):
   - 초록: 태어난 계절이 학력과 관련됨 — 입학 나이 규정 + 의무교육(일정 나이까지) 법이 함께 작용
   - 1980년 인구조사, 1930–1939년생 남성 329,509명(재현 논문 기술)
   - 태어난 분기를 도구로 쓴 교육 수익률 추정치가 최소제곱(단순 비교) 추정치와 비슷 → 능력 편의가 작음(초록)
   - 도구변수 추정치 약 7%대(2차 요약 7.5%, 재현 논문들 0.06~0.08 범위) → 영상은 '약 7%'
   - 0.1년·0.7% 는 나눗셈을 보여 주는 예시 숫자(화면에 '예시' 표시) — 실제 분기별 차이도 이런 작은 크기
   - 1~3월생은 평균 학력·임금이 조금 낮음(논문의 기본 그림). 분기 막대는 차이를 키워 그린 그림(화면 표시)
   - 입학 규칙·16살은 주마다 다른 규칙의 대표 예
   - 앵그리스트: 2021년 노벨 경제학상(카드·임벤스와 공동) */
Object.assign(EP, {no: 33, style: "v2", title: "태어난 시기와 학력", hook: "태어난 시기에 따라 소득이 달라진다?",
  bgm: {seed: 251, bpm: 98, mood: "calm"},
  paper: {journal: "Quarterly Journal of Economics", year: 1991, authors: "Joshua D. Angrist & Alan B. Krueger",
          title: "Does Compulsory School Attendance Affect Schooling and Earnings?", ko: "의무교육은 학력과 소득에 영향을 줄까?",
          cite: "106(4): 979–1014", url: "https://www.nber.org/papers/w3572"},
  yt: {title: "태어난 시기가 학력을 바꾼다? | 도구변수 #경제 #shorts",
       desc: "알고 싶은 건 학교를 1년 더 다니면 임금이 얼마나 오르는가, 즉 교육 수익률(Return to Education)이다. 가장 쉬운 방법은 오래 다닌 사람과 짧게 다닌 사람의 임금을 그냥 비교하는 것. 하지만 오래 다닌 사람은 원래 공부를 잘하거나 성실했을 수도 있어서, 임금 차이에 학교의 효과와 원래 능력의 효과가 섞인다. 그래서 필요한 건 능력과 상관없는 우연한 이유로 학교를 더 다니게 된 사람들이다. 연구진은 그 우연을 태어난 시기에서 찾았다. 미국에서는 보통 그해에 6살이 되는 아이들이 9월에 함께 1학년이 된다. 그래서 같은 반에서 1월생이 가장 나이가 많고 12월생이 가장 어리다(거의 한 살 차이). 그런데 당시 의무교육은 몇 학년까지가 아니라 나이 기준이라, 보통 16살 생일이 지나면 학교를 그만둘 수 있었다(주마다 다름). 나이가 많은 1월생은 10학년 중간에, 어린 12월생은 11학년이 돼서야 16살이 된다. 그래서 16살이 되자마자 그만두는 학생이라면 1월생이 거의 1년 덜 다니고 나간다. 대부분은 끝까지 다니니 평균 차이는 아주 작다. 연구진은 1980년 인구조사에서 1930년대에 태어난 남성 약 33만 명을 살펴봤고, 1~3월생이 평균 학력이 조금 짧고 임금도 조금 낮았다. 태어난 달은 능력과 상관이 없으니, 이 임금 차이는 학교를 덜 다녀서라고 볼 수 있다. 그래서 임금 차이를 학력 차이로 나누면 학교 1년의 효과가 나온다(예: 학력이 0.1년 짧을 때 임금이 0.7% 낮다면 1년이면 7%). 이렇게 우연한 차이를 이용하는 방법이 도구변수(Instrumental Variable)다. 결과는 학교 1년에 임금 약 7%로, 쉬운 방법(단순 비교)의 값과 거의 같았다. 단순 비교에 능력이 섞여 결과가 부풀려졌을 거라는 걱정은 생각보다 작았고, 학교를 더 다녀서 더 버는 건 대부분 정말 학교 덕이었다. 앵그리스트 교수는 2021년 노벨 경제학상을 받았다.",
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
  w.older = ST(g, 1080 + 540, 560, "", {"font-size": 46, "font-weight": 900, fill: CORAL});
  w.ages = [[1080 + 230, "가장 나이 많음", CORAL], [1080 + 850, "가장 어림", TEAL]].map(([x, t, col]) => ST(g, x, 640, t, {"font-size": 40, "font-weight": 900, fill: col, opacity: 0}));
  w.sep = ST(g, 1080 + 540, 340, "그해 6살이 되는 아이들 → 9월에 함께 1학년", {"font-size": 40, "font-weight": 800, fill: GOLD, opacity: 0});
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
    q.r.setAttribute("height", h); q.r.setAttribute("y", 1000 - h)}); w.qNote.textContent = lt > t0 + 1.4 ? "태어난 시기별 평균 학력 (차이를 키워 그림)" : ""; w.qNote.setAttribute("y", 300)};
  w.cal(-99, 0); w.years(0); w.qGrow(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["태어난 시기에 따라 **소득**이 달라진다?", "태어난 시기에 따라, 소득이 달라질 수 있을까요?", "pop"],
  ["1991년 **QJE**에 실린 논문", "천구백구십일 년에 나온 논문입니다."],
  ["저자: 앵그리스트_교수와 크루거_교수", "저자는, 앵그리스트 교수와 크루거 교수입니다."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.h = kin(hud, 110, "태어난 시기 → **소득**?", 88);
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
  ["알고 싶은 것: 학교를 **1년 더** 다니면 임금이 얼마나 오를까", "알고 싶은 건, 학교를 일 년 더 다니면, 임금이 얼마나 오르는가 입니다.", "pop"],
  ["이것을 **교육_수익률**(Return to Education)이라고 한다", "이것을, 교육 수익률이라고 합니다."],
  ["쉬운 방법: 오래 다닌 사람 vs 짧게 다닌 사람 **임금 비교**", "가장 쉬운 방법은, 오래 다닌 사람과 짧게 다닌 사람의 임금을, 그냥 비교하는 겁니다.", "coin"],
  ["문제: 오래 다닌 사람은 원래 **공부를 잘했을** 수도", "하지만 오래 다닌 사람은, 원래 공부를 잘하거나 성실했을 수도 있죠."],
  ["임금 차이에 **학교 효과 + 원래 능력**이 섞인다", "그러면 임금 차이에, 학교의 효과와 원래 능력의 효과가 섞여서, 따로 떼어 낼 수 없습니다.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.86)"});
    c.t = CX(hud, 150, "학교 1년 → 임금 몇 % ↑?", "", {fontSize: "66px", fontWeight: 900, color: GOLD});
    c.pA = img(hud, "person", 300, 960, 240); c.pB = img(hud, "person", 780, 960, 240);
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
    c.dim.style.opacity = P(lt, 0, .4); ap(c.t, lt, .4); c.t.innerHTML = lt > L[1] - .1 && lt < L[2] ? "교육 수익률" : "학교 1년 → 임금 몇 % ↑?";
    const pe = spr((lt - L[2] - .2) / .5);
    [c.pA, c.pB].forEach((p, i) => {imgAt(p, [300, 780][i], 960, clamp(pe, 0, 1.2), 0); p.style.opacity = clamp(pe * 2)});
    [c.yA, c.yB].forEach(y => y.style.opacity = P(lt, L[2] + .5, .3));
    [...c.cA, ...c.cB].forEach((e, i) => {const u = spr((lt - L[2] - 1 - i * .12) / .4); e.style.opacity = clamp(u * 2);
      imgAt(e, i < 3 ? 300 : 780, 640 - (i < 3 ? i : i - 3) * 34, clamp(u, 0, 1.2), 0)});
    const tb = spr((lt - L[3] - .2) / .5); imgAt(c.br, 900, 470, clamp(tb, 0, 1.2), 0); c.br.style.opacity = clamp(tb * 2);
    ap(c.mix, lt, L[4] + .2);
    c.o.up(lt, {mood: lt > L[3] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 아이디어: 우연을 찾다 */
scene({id: "idea", lines: [
  ["필요한 것: 능력과 상관없이 **우연히** 학교를 더 다닌 사람들", "그래서 필요한 건, 능력과는 상관없이, 우연한 이유로 학교를 더 다니게 된 사람들입니다.", "pop"],
  ["연구진은 그 우연을 **태어난 시기**에서 찾았다", "연구진은 그 우연을, 태어난 시기에서 찾았습니다.", "ding"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.die = img(hud, "game_die", 540, 300, 170);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 700, s: lt > L[1] ? lerp(1, 1.08, ease((lt - L[1]) / 2)) : 1}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.cal(lt, L[1]);
    const u = spr((lt - .4) / .5); imgAt(c.die, 540, 300, clamp(u, 0, 1.2) * (1 - P(lt, L[1], .3)), lt * 120); c.die.style.opacity = clamp(u * 2) * (1 - P(lt, L[1], .3));
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 4. 같은 반, 다른 나이 */
scene({id: "grade", lines: [
  ["미국: 그해에 **6살이 되는** 아이들이 9월에 함께 1학년", "미국에서는 보통, 그해에 여섯 살이 되는 아이들이, 구월에 함께 일 학년이 됩니다.", "pop"],
  ["그래서 같은 반에서 **1월생이 가장 나이가 많고**", "그래서 같은 반에서, 일월생이 가장 나이가 많고,"],
  ["**12월생이 가장 어리다** — 거의 한 살 차이", "십이월생이 가장 어립니다. 거의 한 살 차이가 나죠."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.u = CX(hud, 1150, "입학 규칙은 주마다 조금씩 다름 (대표적인 예)", "", {fontSize: "34px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9));
    w.ageL.setAttribute("opacity", P(lt, 1, .3)); w.sep.setAttribute("opacity", P(lt, 1.4, .3));
    w.ages.forEach((a, i) => a.setAttribute("opacity", P(lt, L[1 + i] + .5, .3)));
    w.older.textContent = lt > L[2] + 1.5 ? "거의 한 살 차이" : ""; ap(c.u, lt, 1.6);
    c.o.up(lt, {mood: lt > L[2] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 의무교육은 나이 기준 */
scene({id: "law", lines: [
  ["의무교육은 **나이** 기준: 16살 생일이 지나면 그만둘 수 있다", "그런데 당시 의무교육은, 몇 학년까지가 아니라 나이 기준이었습니다. 보통 열여섯 살 생일이 지나면, 학교를 그만둘 수 있었죠.", "whoosh@0.2"],
  ["나이 많은 1월생은 **10학년 중간**에 16살", "나이가 많은 일월생은, 십 학년 중간에 열여섯 살이 되고,"],
  ["어린 12월생은 **11학년**이 돼서야 16살", "어린 십이월생은, 십일 학년이 돼서야 열여섯 살이 됩니다."],
  ["16살 되자마자 그만두면, 1월생이 **거의 1년 덜** 다니고 나간다", "그래서 열여섯 살이 되자마자 그만두는 학생이라면, 일월생이 거의 일 년 덜 다니고 나가게 됩니다.", "ding"],
  ["**일찍 그만두는 학생에게만** 생기는 차이 → 평균 차이는 작다", "물론 대부분은 끝까지 다니니 상관없고, 일찍 그만두는 학생에게만 생기는 차이라, 평균 차이는 아주 작습니다."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.years((lt - L[1] + .3) / 2.2); w.cut.textContent = lt > L[1] + 1.6 ? "케이크 = 16번째 생일" : "";
    c.o.up(lt, {mood: lt > L[3] && lt < L[4] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 6. 자료와 결과 */
scene({id: "data", lines: [
  ["1980년 인구조사: 1930년대생 남성 **약 33만 명**", "연구진은 천구백팔십 년 인구조사에서, 천구백삼십 년대에 태어난 남성, 약 삼십삼만 명을 살펴봤습니다.", "pop"],
  ["1~3월생: 평균 학력이 **조금 짧고**, 임금도 **조금 낮았다**", "그랬더니 일월에서 삼월생이, 평균 학력이 조금 짧고, 임금도 조금 낮았습니다.", "coin"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.years(1); w.qGrow(lt, L[1]);
    c.o.up(lt, {mood: lt > L[1] + 1 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 7. 계산: 도구변수 */
scene({id: "logic", lines: [
  ["태어난 달은 능력과 무관 → 임금이 낮은 건 **학교를 덜 다녀서**", "태어난 달은 능력과 상관이 없으니, 이 사람들의 임금이 낮은 건, 학교를 덜 다녀서라고 볼 수 있습니다.", "pop"],
  ["임금 차이 ÷ 학력 차이 = **학교 1년의 효과**", "그래서 임금 차이를 학력 차이로 나누면, 학교 일 년의 효과가 나옵니다."],
  ["예: 학력 0.1년 차이에 임금 0.7% 차이 → 1년이면 **7%**", "예를 들어, 학력이 영 점 일 년 짧을 때, 임금이 영 점 칠 퍼센트 낮다면, 일 년이면 칠 퍼센트인 셈이죠.", "coin"],
  ["우연한 차이를 이용하는 방법 = **도구변수**(Instrumental Variable)", "이렇게 우연한 차이를 이용하는 방법을, 도구변수라고 합니다.", "ding"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "rgba(8,12,22,.82)"});
    c.f1 = CX(hud, 300, "<span style='color:#ff8a65'>임금 차이</span> ÷ <span style='color:#6fcfb7'>학력 차이</span>", "", {fontSize: "72px", fontWeight: 900, color: "#fff"});
    c.f2 = CX(hud, 430, "= 학교 1년의 효과", "", {fontSize: "64px", fontWeight: 900, color: GOLD});
    c.f3 = CX(hud, 620, "<span style='color:#ff8a65'>0.7%</span> ÷ <span style='color:#6fcfb7'>0.1년</span> = <b style='color:#f2c14e'>7%</b>", "", {fontSize: "80px", fontWeight: 900, color: "#fff"});
    c.f4 = CX(hud, 740, "예시 숫자", "", {fontSize: "36px", fontWeight: 700, color: "#c9cfe6"});
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.qGrow(99, 0); c.dim.style.opacity = P(lt, 0, .4);
    ap(c.f1, lt, L[1] + .2); ap(c.f2, lt, L[1] + .8); ap(c.f3, lt, L[2] + .4, null, {s: .8, back: true}); ap(c.f4, lt, L[2] + .6);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 8. 결론과 뜻 */
scene({id: "result", lines: [
  ["결과: 학교 1년에 임금 **약 7%**", "결과는, 학교 일 년에 임금 약 칠 퍼센트였습니다.", "coin"],
  ["처음의 쉬운 방법(단순 비교)과 **거의 같았다**", "그런데 이건, 처음의 쉬운 방법으로 구한 값과, 거의 같았습니다."],
  ["뜻: 단순 비교에 능력이 섞여 **부풀려진 정도는 작았다**", "즉 단순 비교에 능력이 섞여서 결과가 부풀려졌을 거라는 걱정은, 생각보다 작았던 거죠."],
  ["학교를 더 다녀 더 버는 건 **대부분 학교 덕**", "학교를 더 다녀서 더 버는 건, 대부분 정말 학교 덕이었습니다.", "ding"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "rgba(8,12,22,.82)"});
    c.a = A(hud, 90, 330, "<div style='font-size:44px;color:#c9cfe6'>단순 비교</div><div style='font-size:96px;color:#fff;font-weight:900'>≈ 7%</div>", "", {width: "420px", textAlign: "center"});
    c.b = A(hud, 570, 330, "<div style='font-size:44px;color:#c9cfe6'>도구변수</div><div style='font-size:96px;color:#f2c14e;font-weight:900'>≈ 7%</div>", "", {width: "420px", textAlign: "center"});
    c.eq = CX(hud, 380, "=", "", {fontSize: "110px", fontWeight: 900, color: "#6fcfb7"});
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.qGrow(99, 0); c.dim.style.opacity = 1;
    ap(c.b, lt, .3); ap(c.a, lt, L[1] + .2); ap(c.eq, lt, L[1] + .8, null, {s: .6, back: true});
    c.o.up(lt, {mood: lt > L[3] ? "happy" : lt > L[1] ? "surprised" : "normal", look: [.7, -.5]});
  }
});

/* 9. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["앵그리스트 교수: **2021년 노벨 경제학상**", "앵그리스트 교수는, 이런 방법을 발전시킨 공로로, 이천이십일 년 노벨 경제학상을 받았습니다.", "ding"],
  ["논문 제목: 〈**의무교육은 학력과 소득에 영향을 줄까?**〉", "논문 제목은, 의무교육은 학력과 소득에 영향을 줄까 입니다."],
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
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.cal(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[2], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[2] ? .5 + .5 * Math.sin((lt - L[2]) * 6) : 0, look: [.5, -.6]});
  }
});
