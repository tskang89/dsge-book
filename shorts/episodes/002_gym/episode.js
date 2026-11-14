/* 오늘의 경제 002 — 헬스장 회원권의 역설 (v2)
   논문: DellaVigna, S. & Malmendier, U. (2006) "Paying Not to Go to the Gym", American Economic Review 96(3): 694–719.
         doi:10.1257/aer.96.3.694
   영상 속 숫자는 모두 논문 초록에서 확인(2026-11-14, RePEc/NBER 판 초록):
   - 미국 헬스장 3곳, 회원 7,752명, 3년 자료
   - 월 정액 $70 넘는 계약 회원: 월평균 4.3회 출석 → 기대 방문 1회당 $17 넘게 지불, 10회권이면 1회 $10
   - 이들이 회원 기간 동안 놓친 절약액 평균 $600
   - (영상에서 뺌) 월 계약 회원은 1년 계약 회원보다 가입 1년 뒤에도 회원일 확률이 17% 높다 — 설명이 길어 오해 소지가 커서 제외
   - 4.3회 × $17 > $70: 정액은 '$70 넘는' 계약들이라 1회당 값이 $70/4.3 보다 크다 → 화면에 $70÷4.3 계산을 보이지 않는다
   - 주된 설명: 미래의 자기 통제·효율에 대한 과신
   본전 7회 = $70 ÷ $10 (단순 산수, 화면 그래프는 월 $70 정액 vs 1회 $10). */
Object.assign(EP, {no: 2, style: "v2", title: "헬스장 회원권의 역설", hook: "헬스장 월 정액권, 정말 이득일까?",
  bgm: {seed: 23, bpm: 104, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2006, authors: "Stefano DellaVigna & Ulrike Malmendier",
          title: "Paying Not to Go to the Gym", ko: "헬스장에 안 가려고 돈 내기", cite: "96(3): 694–719",
          url: "https://doi.org/10.1257/aer.96.3.694"},
  yt: {title: "헬스장 월 정액권, 정말 이득일까? | 헬스장에 안 가려고 돈 내기 #경제 #shorts",
       desc: "미국 헬스장 3곳 회원 7,752명의 3년 치 출석 기록. 매달 $70 넘게 내는 월 정액권 회원은 한 달 평균 4.3번 가서, 월 회비를 출석 횟수로 나누면 한 번에 $17 넘게 낸 셈이었다. 10회권(한 번에 $10)을 썼다면 가입 기간 동안 평균 $600을 아낄 수 있었다. 저자들은 미래의 자기 통제에 대한 과신을 가장 유력한 설명으로 꼽는다.",
       tags: ["경제", "행동경제학", "헬스장", "과신", "현재편향", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65";
let WID = 0;

/* 헬스장 세계: 어두운 벽, 창으로 드는 빛, 나무 바닥, 덤벨 선반, 떠다니는 먼지 */
function gym(el, o) {
  o = o || {};
  const w = {}, g = svgLayer(el), n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`, d = S("defs", {}, g);
  const lg = (k, stops, x2, y2) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: x2 || 0, y2: y2 == null ? 1 : y2}, d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1b2240"], [1, "#2c2a4a"]]);
  lg("floor", [[0, "#8a5a34"], [1, "#3a2516"]]);
  lg("ray", [[0, "#ffe2a8", .35], [1, "#ffe2a8", 0]]);
  lg("shade", [[0, "#0a0e18", 0], [.3, "#0a0e18", .6], [.6, "#0a0e18", .88], [1, "#0a0e18", .95]]);
  S("rect", {x: 0, y: 0, width: W, height: 900, fill: U("wall")}, g);
  // 창문과 빛줄기
  [[130, 170], [430, 170], [730, 170]].forEach(([x, y]) => {
    S("rect", {x, y, width: 220, height: 300, rx: 14, fill: "#3b4f86", opacity: .55}, g);
    S("line", {x1: x + 110, y1: y, x2: x + 110, y2: y + 300, stroke: "#1b2240", "stroke-width": 8}, g);
    S("line", {x1: x, y1: y + 150, x2: x + 220, y2: y + 150, stroke: "#1b2240", "stroke-width": 8}, g);
  });
  w.rays = S("g", {}, g);
  [[130, 170], [430, 170], [730, 170]].forEach(([x, y]) => S("path", {d: `M${x},${y} L${x + 220},${y} L${x + 420},900 L${x + 120},900 Z`, fill: U("ray")}, w.rays));
  // 바닥(원근 널빤지)
  S("rect", {x: 0, y: 900, width: W, height: H - 900, fill: U("floor")}, g);
  for (let i = -8; i <= 16; i++) S("line", {x1: 540 + i * 70, y1: 900, x2: 540 + i * 260, y2: 1500, stroke: "#2a1a10", "stroke-width": 3, opacity: .5}, g);
  [960, 1040, 1150, 1300].forEach(y => S("line", {x1: 0, y1: y, x2: W, y2: y, stroke: "#2a1a10", "stroke-width": 2, opacity: .35}, g));
  // 덤벨 선반
  if (o.rack !== false) {
    S("rect", {x: 60, y: 760, width: 960, height: 18, rx: 6, fill: "#4a5274"}, g);
    S("rect", {x: 60, y: 860, width: 960, height: 18, rx: 6, fill: "#4a5274"}, g);
    for (let i = 0; i < 8; i++) {const x = 110 + i * 120, cols = ["#e85d5d", "#5ab0ff", "#f2c14e", "#6fcfb7"];
      [[742, 1], [842, 1.2]].forEach(([y, k]) => {const c = cols[(i + (k > 1 ? 2 : 0)) % 4];
        S("rect", {x: x - 34 * k, y: y - 18 * k, width: 20 * k, height: 36 * k, rx: 6, fill: c}, g);
        S("rect", {x: x + 14 * k, y: y - 18 * k, width: 20 * k, height: 36 * k, rx: 6, fill: c}, g);
        S("rect", {x: x - 16 * k, y: y - 4, width: 32 * k, height: 8, fill: "#c9cfdb"}, g)})}
  }
  // 먼지
  const r = rng(n * 13 + 1);
  w.dust = Array.from({length: 26}, () => ({x: r() * W, y: 150 + r() * 750, s: .5 + r(), e: S("circle", {r: 2 + r() * 3, fill: "#fff1cc", opacity: .5}, g)}));
  w.top = svgLayer(el);
  S("rect", {x: 0, y: 1060, width: W, height: H - 1060, fill: U("shade")}, w.top);
  w.anim = lt => {
    w.rays.setAttribute("opacity", .75 + .25 * Math.sin(lt * .9));
    w.dust.forEach((p, i) => {p.e.setAttribute("cx", (p.x + lt * 14 * p.s) % W); p.e.setAttribute("cy", p.y + 20 * Math.sin(lt * .7 * p.s + i))});
  };
  w.lg = lg; w.U = U;
  return w;
}
const pop = (e, lt, a, x, y, rot, out) => {const t = spr((lt - a) / .55); imgAt(e, x, y, clamp(t, 0, 1.2), rot || 0);
  e.style.opacity = clamp(t * 2) * (out != null ? 1 - ease((lt - out) / .35) : 1); return t};
const bigNum = (hud, x, y, txt, col, size) => A(hud, x, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD,
  textShadow: "0 6px 0 rgba(0,0,0,.4)", whiteSpace: "nowrap"});
/* 회원권 카드(SVG): 금색 그라데이션 */
function passCard(parent, w, label, sub, col1, col2) {
  const g = S("g", {}, parent), k = "pc" + (++WID), d = S("defs", {}, g), l = S("linearGradient", {id: k, x1: 0, y1: 0, x2: 1, y2: 1}, d);
  [[0, col1], [1, col2]].forEach(([o, c]) => S("stop", {offset: o, "stop-color": c}, l));
  S("rect", {x: -w / 2 + 8, y: -w * .3 + 14, width: w, height: w * .62, rx: 26, fill: "#000", opacity: .3}, g);
  S("rect", {x: -w / 2, y: -w * .31, width: w, height: w * .62, rx: 26, fill: `url(#${k})`}, g);
  S("rect", {x: -w / 2 + 34, y: -w * .31 + 40, width: 70, height: 52, rx: 10, fill: "#fff", opacity: .55}, g);
  ST(g, -w / 2 + 34, w * .31 - 80, label, {"font-size": 54, "font-weight": 800, fill: "#10182a", "text-anchor": "start"});
  ST(g, -w / 2 + 34, w * .31 - 34, sub, {"font-size": 36, "font-weight": 700, fill: "#10182a", "text-anchor": "start", opacity: .75});
  return g;
}

/* 1. 질문 */
scene({id: "hook", lines: [
  ["헬스장 **월 정액권**, 정말 이득일까?", "헬스장 월 정액권, 정말 이득일까요?", "pop"],
  ["2006년 AER 논문: 회원 **7,752명**의 3년 치 출석", "이천육 년 아메리칸 이코노믹 리뷰 논문이, 헬스장 회원 칠천칠백여 명의 삼 년 치 출석 기록을 분석했습니다."]],
  build(el, hud) {
    const c = {w: gym(el)};
    c.lifter = img(el, "lifter", 540, 1180, 330);
    c.cardG = S("g", {}, svgLayer(hud)); passCard(c.cardG, 380, "MONTHLY", "월 정액권", "#ffd977", "#e0a43a");
    c.h = kin(hud, 150, "헬스장 **월 정액권**,<br>정말 이득일까?", 92);
    c.n = bigNum(hud, 0, 170, "", GOLD, 160); c.n.style.width = W + "px"; c.n.style.textAlign = "center";
    c.sub = CX(hud, 360, "명 · 3년 · 헬스장 3곳", "", {fontSize: "48px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.ppl = Array.from({length: 18}, (_, i) => img(hud, ["person", "woman", "man", "person_light", "person_medium"][i % 5], 0, 0, 92));
    return c;
  },
  cam(lt) {return {x: 540, y: 1000, s: lerp(1.25, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    c.w.anim(lt);
    pop(c.lifter, lt, .2, 540, 1180 + 10 * Math.sin(lt * 4), 0);
    const tc = clamp(spr((lt - .9) / .6), 0, 1.2) * (1 - ease((lt - L[1] + .2) / .3));
    c.cardG.setAttribute("transform", `translate(800,${700 + 10 * Math.sin(lt * 2)}) rotate(${-12 + 8 * (1 - clamp(tc))}) scale(${tc})`);
    kinUp(c.h, lt, .1, L[1] - .2);
    countTo(c.n, lt, L[1] + .1, 0, 7752, v => Math.round(v).toLocaleString("en-US"), 1.2); c.n.style.opacity = P(lt, L[1], .3);
    ap(c.sub, lt, L[1] + .6);
    c.ppl.forEach((e, i) => {const col = i % 6, row = Math.floor(i / 6);
      pop(e, lt, L[1] + .4 + i * .06, 165 + col * 150, 560 + row * 120, 0)});
  }
});

/* 3. 선택지와 본전 */
scene({id: "choice", lines: [
  ["10회권: **$100**에 10번, 한 번에 $10", "회원권은 두 종류. 십 회권은 백 달러에 열 번, 한 번에 십 달러꼴이고,", "pop"],
  ["월 정액권: 매달 **$70 넘게**, 횟수 무제한", "월 정액권은 매달 칠십 달러 넘게 내고, 횟수 제한 없이 다닙니다.", "pop"],
  ["정액권이 10회권보다 싸려면 **한 달 7번 넘게**", "정액권이 십 회권보다 싸려면, 한 달에 일곱 번 넘게 가야 하죠.", "ding"]],
  build(el, hud) {
    const c = {w: gym(el, {rack: false})};
    const sv = svgLayer(hud);
    c.t = S("g", {}, sv); passCard(c.t, 400, "10회권", "$100 = 10번", "#9fe3cf", "#4fb39a");
    c.m = S("g", {}, sv); passCard(c.m, 400, "월 정액권", "매달 $70+ · 무제한", "#ffd977", "#e0a43a");
    c.vs = CX(hud, 300, "VS", "", {fontSize: "70px", fontWeight: 800, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,.4)"});
    // 그래프: x 방문 횟수 0~12, y 한 달 비용 0~130
    c.gr = S("g", {}, sv);
    const x0 = 140, y0 = 560, w = 820, h = 520, X = v => x0 + v / 12 * w, Y = v => y0 + h - v / 130 * h;
    S("rect", {x: x0 - 70, y: y0 - 60, width: w + 120, height: h + 190, rx: 28, fill: "rgba(10,15,28,.72)"}, c.gr);
    axes(c.gr, x0, y0, w, h, {yl: "한 달 비용"});
    ST(c.gr, x0 + w / 2, y0 + h + 100, "한 달 방문 횟수", {"font-size": 34, fill: "#9aa3b5"});
    [0, 4, 7, 10].forEach(v => ST(c.gr, X(v), y0 + h + 44, v, {"font-size": 34, fill: "#cfd6e4"}));
    [[70, "$70"], [120, "$120"]].forEach(([v, t]) => ST(c.gr, x0 - 14, Y(v) + 12, t, {"font-size": 32, fill: "#cfd6e4", "text-anchor": "end"}));
    c.l1 = S("path", {d: `M${X(0)},${Y(0)} L${X(12)},${Y(120)}`, stroke: TEAL, "stroke-width": 9, fill: "none", "stroke-linecap": "round"}, c.gr);
    c.l2 = S("path", {d: `M${X(0)},${Y(70)} L${X(12)},${Y(70)}`, stroke: GOLD, "stroke-width": 9, fill: "none", "stroke-linecap": "round"}, c.gr);
    ST(c.gr, X(12) - 10, Y(120) - 20, "10회권", {"font-size": 38, "font-weight": 800, fill: TEAL, "text-anchor": "end"});
    ST(c.gr, X(.3), Y(70) + 52, "월 정액권(최소 $70)", {"font-size": 36, "font-weight": 800, fill: GOLD, "text-anchor": "start"});
    c.be = S("g", {}, c.gr);
    S("line", {x1: X(7), y1: Y(70), x2: X(7), y2: y0 + h, stroke: "#fff", "stroke-width": 4, "stroke-dasharray": "10 8"}, c.be);
    S("circle", {cx: X(7), cy: Y(70), r: 16, fill: "#fff"}, c.be);
    ST(c.be, X(7), Y(70) - 34, "본전 7번", {"font-size": 44, "font-weight": 800, fill: "#fff"});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 900, s: lerp(1, 1.06, lt / L.end)}},
  update(c, lt, L) {
    c.w.anim(lt);
    const out = 1 - ease((lt - L[2] + .2) / .4);
    const a = clamp(spr((lt - .1) / .6), 0, 1.2) * out, b = clamp(spr((lt - L[1]) / .6), 0, 1.2) * out;
    c.t.setAttribute("transform", `translate(${lerp(300, 290, a)},${640 + 8 * Math.sin(lt * 2)}) rotate(-6) scale(${a})`);
    c.m.setAttribute("transform", `translate(${lerp(780, 790, b)},${640 + 8 * Math.sin(lt * 2 + 1)}) rotate(6) scale(${b})`);
    c.vs.style.opacity = P(lt, L[1]) * out;
    sap(c.gr, lt, L[2] - .1);
    draw(c.l1, P(lt, L[2] + .2, 1)); draw(c.l2, P(lt, L[2] + .4, 1));
    sap(c.be, lt, L[2] + 1.3);
  }
});

/* 4. 실제 출석 */
scene({id: "reality", lines: [
  ["정액권 회원의 실제 출석: 월평균 **4.3번**", "그런데 정액권 회원들은, 실제로 한 달 평균 사 점 삼 번 갔습니다.", "pop"],
  ["월 회비 ÷ 출석 = 한 번에 **$17** 넘게", "월 회비를 출석 횟수로 나누면, 한 번 가는 데 십칠 달러 넘게 낸 셈.", "coin"]],
  build(el, hud) {
    const c = {w: gym(el)};
    const sv = svgLayer(hud);
    c.cal = S("g", {}, sv);
    const x0 = 120, y0 = 520, cw = 120, ch = 100;
    S("rect", {x: x0 - 30, y: y0 - 130, width: 7 * cw + 60, height: 5 * ch + 160, rx: 30, fill: "#f4f1ea"}, c.cal);
    S("rect", {x: x0 - 30, y: y0 - 130, width: 7 * cw + 60, height: 90, rx: 30, fill: "#e85d5d"}, c.cal);
    S("rect", {x: x0 - 30, y: y0 - 70, width: 7 * cw + 60, height: 30, fill: "#e85d5d"}, c.cal);
    ST(c.cal, 540, y0 - 68, "정액권 회원의 한 달 출석(평균)", {"font-size": 44, "font-weight": 800, fill: "#fff"});
    c.cells = [];
    for (let d = 0; d < 30; d++) {const cx = x0 + (d % 7) * cw + cw / 2, cy = y0 + Math.floor(d / 7) * ch + ch / 2;
      ST(c.cal, cx - 30, cy - 12, d + 1, {"font-size": 28, fill: "#8a8f9c"}); c.cells.push([cx, cy])}
    c.days = [3, 11, 17, 26];          // 네 번 + 다섯 번째 날은 30% 만 → 평균 4.3
    c.chk = c.days.map(() => img(hud, "check", 0, 0, 90));
    c.part = img(hud, "check", 0, 0, 90);
    c.num = bigNum(hud, 0, 150, "4.3번", GOLD, 150); c.num.style.width = W + "px"; c.num.style.textAlign = "center";
    c.tag = A(hud, 0, 1080, "", "", {width: W + "px", textAlign: "center"});
    c.tag.innerHTML = `<span style="display:inline-block;background:${CORAL};color:#10182a;font-size:60px;font-weight:800;padding:14px 40px;border-radius:60px;box-shadow:0 10px 30px rgba(0,0,0,.4)">월 회비 ÷ 출석 = 한 번에 $17+</span>`;
    c.bills = [0, 1, 2].map(() => img(hud, "dollar", 0, 0, 150));
    return c;
  },
  update(c, lt, L) {
    c.w.anim(lt);
    const out = 1 - ease((lt - L[1] - .1) / .4);
    sap(c.cal, lt, 0); c.cal.setAttribute("opacity", clamp(P(lt, 0)) * lerp(.35, 1, out));
    c.days.forEach((d, i) => pop(c.chk[i], lt, .6 + i * .35, c.cells[d][0] + 10, c.cells[d][1] + 45, 0));
    const p = pop(c.part, lt, .6 + 4 * .35, c.cells[29][0] + 10, c.cells[29][1] + 45, 0); c.part.style.opacity = .3 * clamp(p * 2);
    ap(c.num, lt, 2.2, null, {s: .5, back: true});
    ap(c.tag, lt, L[1] + .2, null, {s: .6, back: true});
    c.bills.forEach((e, i) => pop(e, lt, L[1] + .5 + i * .15, 300 + i * 240, 1060 + 10 * Math.sin(lt * 3 + i), -15 + i * 15));
  }
});

/* 5. 놓친 돈 */
scene({id: "loss", lines: [
  ["한 번에 $10인 10회권을 썼다면", "한 번에 십 달러인 십 회권을 썼다면,"],
  ["가입해 있던 동안 평균 **$600** 절약", "가입해 있던 기간 동안, 평균 육백 달러를 아낄 수 있었습니다.", "coin"]],
  build(el, hud) {
    const c = {w: gym(el)};
    const sv = svgLayer(hud);
    c.bars = S("g", {}, sv);
    S("rect", {x: 90, y: 300, width: 900, height: 470, rx: 30, fill: "rgba(10,15,28,.75)"}, c.bars);
    ST(c.bars, 140, 370, "한 번 갈 때 낸 돈", {"font-size": 40, "font-weight": 800, fill: "#cfd6e4", "text-anchor": "start"});
    ST(c.bars, 140, 495, "10회권", {"font-size": 42, "font-weight": 800, fill: "#fff", "text-anchor": "start"});
    ST(c.bars, 140, 655, "정액권(실제)", {"font-size": 42, "font-weight": 800, fill: "#fff", "text-anchor": "start"});
    c.b1 = S("rect", {x: 360, y: 450, height: 70, rx: 16, fill: TEAL}, c.bars);
    c.b2 = S("rect", {x: 360, y: 610, height: 70, rx: 16, fill: CORAL}, c.bars);
    c.t1 = ST(c.bars, 0, 500, "$10", {"font-size": 50, "font-weight": 800, fill: TEAL, "text-anchor": "start"});
    c.t2 = ST(c.bars, 0, 660, "$17+", {"font-size": 50, "font-weight": 800, fill: CORAL, "text-anchor": "start"});
    c.big = bigNum(hud, 0, 280, "$0", GOLD, 210); c.big.style.width = W + "px"; c.big.style.textAlign = "center";
    c.cap2 = CX(hud, 530, "10회권을 썼다면 아낄 수 있었던 돈(평균)", "", {fontSize: "44px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.fly = [0, 1, 2, 3, 4].map(() => img(hud, "money_wings", 0, 0, 140));
    return c;
  },
  update(c, lt, L) {
    c.w.anim(lt);
    const out = 1 - ease((lt - L[1] + .1) / .4);
    c.bars.setAttribute("opacity", P(lt, 0) * out);
    const w1 = 280 * ease((lt - .4) / .7), w2 = 280 * 1.7 * ease((lt - .8) / .9);
    c.b1.setAttribute("width", w1); c.b2.setAttribute("width", w2);
    c.t1.setAttribute("x", 380 + w1); c.t2.setAttribute("x", 380 + w2);
    c.t1.setAttribute("opacity", P(lt, 1)); c.t2.setAttribute("opacity", P(lt, 1.6));
    countTo(c.big, lt, L[1] + .2, 0, 600, v => "$" + Math.round(v), 1.3); c.big.style.opacity = P(lt, L[1]);
    c.big.style.transform = `scale(${1 + .12 * Math.sin(Math.PI * clamp((lt - L[1] - 1.5) / .5))})`;
    ap(c.cap2, lt, L[1] + .5);
    c.fly.forEach((e, i) => {const t = lt - L[1] - .4 - i * .25; if (t < 0) {e.style.opacity = 0; return}
      imgAt(e, 200 + i * 170 + 40 * Math.sin(t * 2 + i), 1000 - t * 160, 1, 10 * Math.sin(t * 3 + i)); e.style.opacity = clamp(t * 3) * (1 - clamp((t - 2.2) / .6))});
  }
});

/* 6. 왜? 미래의 나를 과신 */
scene({id: "why", lines: [
  ["가장 유력한 설명: “앞으로는 **자주 가겠지**” 하는 과신", "연구진이 꼽은 가장 유력한 설명은, 앞으로는 자주 가겠지 하는 자기 과신입니다.", "pop"]],
  build(el, hud) {
    const c = {w: gym(el)};
    c.l = CX(hud, 240, "", "", {});
    c.lt = A(hud, 60, 250, "예상한 나", "", {width: "460px", textAlign: "center", fontSize: "54px", fontWeight: 800, color: GOLD, textShadow: "0 4px 0 rgba(0,0,0,.4)"});
    c.rt = A(hud, 560, 250, "실제의 나", "", {width: "460px", textAlign: "center", fontSize: "54px", fontWeight: 800, color: BLUE, textShadow: "0 4px 0 rgba(0,0,0,.4)"});
    c.q = img(hud, "thinking", 540, 820, 300);
    c.bi = img(hud, "biceps", 290, 760, 300); c.cool = img(hud, "muscle_face", 380, 560, 140);
    c.co = img(hud, "couch", 790, 760, 320); c.zz = img(hud, "sleeping", 700, 560, 140);
    c.badge = A(hud, 0, 880, "", "", {width: W + "px", textAlign: "center"});
    c.badge.innerHTML = `<span style="display:inline-block;background:rgba(10,15,28,.82);border:3px solid ${GOLD};border-radius:28px;padding:24px 40px">
      <span style="font-size:44px;font-weight:800;color:#fff">가입 1년 뒤에도 회원으로 남아 있을 확률</span><br>
      <span style="font-size:40px;font-weight:700;color:#cfd6e4">월 정액 회원이 1년 계약 회원보다</span>
      <span style="font-size:90px;font-weight:800;color:${GOLD};margin-left:20px">+17%</span></span>`;
    return c;
  },
  update(c, lt, L) {
    c.w.anim(lt);
    const up = 1;
    ap(c.lt, lt, .6); ap(c.rt, lt, 1.6);
    pop(c.bi, lt, .8, 290, 760 * 1 - (1 - up) * 150, 8 * Math.sin(lt * 4)); pop(c.cool, lt, 1.1, 400, 560 - (1 - up) * 150, 0);
    pop(c.co, lt, 1.8, 790, 760 - (1 - up) * 150, 0); pop(c.zz, lt, 2.1, 720, 560 - (1 - up) * 150 + 8 * Math.sin(lt * 2), 0);
    [c.bi, c.cool, c.co, c.zz].forEach(e => e.style.transform += ` scale(${up})`);
    c.lt.style.top = (250 - (1 - up) * 140) + "px"; c.rt.style.top = (250 - (1 - up) * 140) + "px";
    c.badge.style.display = "none";
    pop(c.q, lt, 0, 540, 820, 6 * Math.sin(lt * 3), .5);
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈헬스장에 **안 가려고** 돈 내기〉", "그래서 논문 제목이, 헬스장에 안 가려고 돈 내기.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: gym(el)};
    c.ic = img(hud, "lifter", 540, 470, 230);
    c.p = paperCard(hud, 560);
    c.f = CX(hud, 1080, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    return c;
  },
  update(c, lt, L) {
    c.w.anim(lt); pop(c.ic, lt, 0, 540, 470 + 8 * Math.sin(lt * 3), 0);
    ap(c.p, lt, .4, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
  }
});
