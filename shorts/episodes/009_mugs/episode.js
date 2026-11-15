/* 오늘의 경제 009 — 머그컵과 소유 효과 (v3: 부엉이 진행자·한 공간 카메라 이동·동전 기둥)
   논문: Kahneman, D., Knetsch, J. L. & Thaler, R. H. (1990) "Experimental Tests of the Endowment Effect and the Coase Theorem",
         Journal of Political Economy 98(6): 1325–1348. doi:10.1086/261737
   확인(2026-11-14, 원문 PDF 는 이 세션에서 막힘):
   - 설계: 머그컵을 피험자 절반에게 무작위로 나눠 주고, 컵 시장을 열었다(초록·여러 요약). 코넬대 학생.
   - 결과: 파는 값 중간값 $7.12, 사는 값 중간값 $2.87(여러 2차 자료 일치) — 영상은 '약 7달러', '약 3달러', '두 배 넘게'.
     저자들의 1991년 JEP 글(Fermat's Library 원문): "median selling prices are about twice median buying prices and volume is less than half of that expected"
   - 코즈 정리 예측: 컵의 약 절반이 거래돼야 하지만 실제 거래량은 늘 그보다 훨씬 적었다(초록 요약)
   - 해석: 손실 회피(가진 것을 내놓는 아픔이 크다) — 저자들의 해석
   동전 1개 = 1달러: 7.12개 vs 2.87개. 거래 그림(10쌍 중 예상 5, 실제 2)은 개념도로 표시. */
Object.assign(EP, {no: 9, style: "v2", title: "머그컵과 소유 효과", hook: "내 손에 들어온 머그컵은 왜 비싸 보일까?",
  bgm: {seed: 104, bpm: 102, mood: "bright"},
  paper: {journal: "Journal of Political Economy", year: 1990, authors: "Daniel Kahneman, Jack L. Knetsch & Richard H. Thaler",
          title: "Experimental Tests of the Endowment Effect and the Coase Theorem", ko: "소유 효과와 코즈 정리의 실험적 검증",
          cite: "98(6): 1325–1348", url: "https://doi.org/10.1086/261737"},
  yt: {title: "내 손에 들어온 머그컵은 왜 비싸 보일까? | 소유 효과 #경제 #shorts",
       desc: "대학생 절반에게 머그컵을 무작위로 나눠 주고 컵을 사고파는 시장을 열었다. 컵을 가진 사람이 부른 값은 중간값 약 7달러($7.12), 못 가진 사람이 내려던 값은 약 3달러($2.87) — 같은 컵인데 두 배 넘게 차이 났다. 코즈 정리(처음 누가 가졌든 물건은 더 원하는 사람에게 간다)대로라면 — 무작위로 나눴으니 컵을 더 원하는 사람의 절반쯤은 빈손이므로 — 컵의 절반쯤이 거래돼야 하지만, 실제 거래는 훨씬 적었다. 연구진은 가진 것을 내놓는 아픔이 더 크게 느껴지는 손실 회피로 설명했다. (거래 그림은 개념도)",
       tags: ["경제", "행동경제학", "소유효과", "손실회피", "카너먼", "세일러", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 강의실 | 1080 시장 칠판 | 2160 동전 | 3240 거래
let WID = 0;
const DESK = Array.from({length: 8}, (_, i) => ({x: 200 + (i % 4) * 230, y: 860 + Math.floor(i / 4) * 200, mug: i % 2 === (Math.floor(i / 4) ? 1 : 0)}));
const CX2 = [2160 + 330, 2160 + 760];

function roomWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1e2c3a"], [1, "#34485a"]]); lg("floor", [[0, "#6a5236"], [1, "#2a1e12"]]);
  lg("board", [[0, "#24443a"], [1, "#183028"]]); lg("desk", [[0, "#c79a63"], [1, "#8a643a"]]);
  lg("win", [[0, "#ffd9a0"], [1, "#ff9e6b"]]); lg("ray", [[0, "#ffe2b0", .3], [1, "#ffe2b0", 0]]);
  lg("coinT", [[0, "#fff1a8"], [.5, "#f2c14e"], [1, "#d9a32e"]], {x2: 1, y2: 0}); lg("coinS", [[0, "#c48a1c"], [1, "#8f6210"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("wall")}, g);
  // 창(오후 햇살)
  w.rays = S("g", {}, g);
  [[60, 300]].forEach(([a, b]) => {S("rect", {x: a, y: 180, width: b - a, height: 300, rx: 14, fill: U("win")}, g);
    S("line", {x1: (a + b) / 2, y1: 180, x2: (a + b) / 2, y2: 480, stroke: "#1e2c3a", "stroke-width": 10}, g);
    S("path", {d: `M${a},480 L${b},480 L${b + 260},900 L${a + 160},900 Z`, fill: U("ray")}, w.rays)});
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("floor")}, g);
  for (let i = 0; i < 9; i++) S("line", {x1: 0, y1: 930 + i * 40 + i * i * 5, x2: WW, y2: 930 + i * 40 + i * i * 5, stroke: "#1e140a", "stroke-width": 3, opacity: .4}, g);
  // 강의실 칠판(0 구역 위)
  S("rect", {x: 380, y: 200, width: 640, height: 320, rx: 16, fill: U("board"), stroke: "#a87a4a", "stroke-width": 14}, g);
  ST(g, 700, 300, "경제학 실험", {"font-size": 54, "font-weight": 800, fill: "#e9f2ea"});
  ST(g, 700, 380, "오늘: 머그컵 시장", {"font-size": 44, "font-weight": 800, fill: GOLD});
  // 책상 8개 + 학생 + 컵
  w.desk = DESK.map(o => {S("rect", {x: o.x - 90, y: o.y - 20, width: 180, height: 26, rx: 8, fill: U("desk")}, g);
    S("rect", {x: o.x - 80, y: o.y + 6, width: 12, height: 70, fill: "#6a4a2a"}, g); S("rect", {x: o.x + 68, y: o.y + 6, width: 12, height: 70, fill: "#6a4a2a"}, g);
    return {o, p: img(w.layer, ["person", "woman", "man", "person_light"][o.x % 4], o.x - 40, o.y - 10, 180), m: img(w.layer, "hot_beverage", o.x + 40, o.y - 14, 90)}});
  // 시장 칠판(1080)
  S("rect", {x: 1080 + 90, y: 300, width: 900, height: 560, rx: 20, fill: U("board"), stroke: "#a87a4a", "stroke-width": 14}, g);
  ST(g, 1080 + 540, 380, "머그컵 시장", {"font-size": 60, "font-weight": 800, fill: "#e9f2ea"});
  w.colA = ST(g, 1080 + 320, 480, "컵 가진 사람", {"font-size": 46, "font-weight": 800, fill: TEAL, opacity: 0});
  w.colB = ST(g, 1080 + 760, 480, "못 가진 사람", {"font-size": 46, "font-weight": 800, fill: CORAL, opacity: 0});
  w.qA = ST(g, 1080 + 320, 580, "얼마면 팔까?", {"font-size": 50, "font-weight": 800, fill: "#fff", opacity: 0});
  w.qB = ST(g, 1080 + 760, 580, "얼마면 살까?", {"font-size": 50, "font-weight": 800, fill: "#fff", opacity: 0});
  S("line", {x1: 1080 + 540, y1: 440, x2: 1080 + 540, y2: 820, stroke: "#e9f2ea", "stroke-width": 4, opacity: .5}, g);
  w.bigMug = img(w.layer, "hot_beverage", 1080 + 320, 820, 190);
  w.cash = img(w.layer, "dollar_banknote", 1080 + 760, 820, 190);
  // 동전 기둥(2160)
  w.colL = []; w.colR = [];
  const mkCoin = (par, x) => {const c = S("g", {opacity: 0}, par);
    S("ellipse", {cx: x, cy: 14, rx: 92, ry: 30, fill: U("coinS")}, c); S("rect", {x: x - 92, y: 0, width: 184, height: 14, fill: U("coinS")}, c);
    S("ellipse", {cx: x, cy: 0, rx: 92, ry: 30, fill: U("coinT"), stroke: "#c48a1c", "stroke-width": 3}, c);
    ST(c, x, 11, "$1", {"font-size": 30, "font-weight": 800, fill: "#a8741a"}); return c};
  const gl = S("g", {}, g), gr = S("g", {}, g);
  for (let i = 0; i < 8; i++) {w.colL.push(mkCoin(gl, CX2[0])); w.colR.push(mkCoin(gr, CX2[1]))}
  const mkPart = (k, x) => {const cp = S("clipPath", {id: id("p" + k)}, d), r = S("rect", {x: x - 92, y: -40, width: 0, height: 80}, cp);
    const p = S("g", {"clip-path": U("p" + k)}, k ? gr : gl); mkCoin(p, x).setAttribute("opacity", 1); return {r, p}};
  w.partL = mkPart(0, CX2[0]); w.partR = mkPart(1, CX2[1]);
  w.labL = ST(g, CX2[0], 1150, "파는 값", {"font-size": 50, "font-weight": 800, fill: TEAL, opacity: 0});
  w.labR = ST(g, CX2[1], 1150, "사는 값", {"font-size": 50, "font-weight": 800, fill: CORAL, opacity: 0});
  w.mugL = img(w.layer, "hot_beverage", CX2[0], 700, 130); w.mugR = img(w.layer, "hot_beverage", CX2[1], 700, 130);
  // 거래(3240): 10쌍, 악수
  w.pairs = Array.from({length: 10}, (_, i) => {const x = 3240 + 160 + (i % 5) * 190, y = 700 + Math.floor(i / 5) * 240;
    const b = S("g", {opacity: 0}, g); S("rect", {x: x - 80, y: y - 90, width: 160, height: 180, rx: 22, fill: "#2a3a4c", stroke: "#4a5a70", "stroke-width": 4}, b);
    return {b, x, y, h: img(w.layer, "handshake", x, y + 50, 120), m: img(w.layer, "hot_beverage", x, y + 40, 100)}});
  // 앞쪽(흐린) 형광등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [200, 1300, 2400, 3500, 4600].forEach(x => {S("rect", {x: x - 200, y: 40, width: 400, height: 46, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 80, width: 360, height: 14, rx: 7, fill: "#e8f1ff", opacity: .85}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => w.rays.setAttribute("opacity", .75 + .25 * Math.sin(lt * .9));
  w.desks = (lt, t0, mt) => w.desk.forEach((o, i) => {const u = spr((lt - t0 - i * .05) / .5);
    imgAt(o.p, o.o.x - 40, o.o.y - 10 - 4 * Math.abs(Math.sin(lt * 2 + i)), clamp(u, 0, 1.2), 0); o.p.style.opacity = clamp(u * 2);
    const v = o.o.mug && mt != null ? spr((lt - mt - i * .08) / .5) : 0;
    imgAt(o.m, o.o.x + 40, o.o.y - 14 - (1 - clamp(v)) * 160, clamp(v, 0, 1.2), 0); o.m.style.opacity = clamp(v * 2)});
  w.coins = (lt, nL, tL, nR, tR) => {const base = 1060, gap = .1;
    const drop = (c, i, t) => {const u = clamp((lt - t) / .4); c.setAttribute("transform", `translate(0,${base - i * 34 - (1 - eback(u)) * 380})`); c.setAttribute("opacity", u > 0 ? 1 : 0)};
    [[w.colL, nL, tL, w.partL], [w.colR, nR, tR, w.partR]].forEach(([col, nn, t0, pt]) => {
      col.forEach((c, i) => i < Math.floor(nn) ? drop(c, i, t0 + i * gap) : c.setAttribute("opacity", 0));
      const fr = nn - Math.floor(nn), i = Math.floor(nn);
      if (fr > 0) {const u = clamp((lt - t0 - i * gap) / .4); pt.r.setAttribute("width", 184 * fr); pt.p.setAttribute("transform", `translate(0,${base - i * 34 - (1 - eback(u)) * 380})`); pt.p.setAttribute("opacity", u > 0 ? 1 : 0)}
      else pt.p.setAttribute("opacity", 0)})};
  w.trades = (lt, t0, nDone, td) => w.pairs.forEach((o, i) => {const u = clamp((lt - t0 - i * .06) / .3);
    o.b.setAttribute("opacity", u); const done = td != null && i < nDone ? spr((lt - td - i * .2) / .5) : 0;
    imgAt(o.h, o.x, o.y + 50, clamp(done, 0, 1.2), 0); o.h.style.opacity = clamp(done * 2);
    imgAt(o.m, o.x, o.y + 40, clamp(u, 0, 1) * (1 - clamp(done)), 0); o.m.style.opacity = u * (1 - clamp(done))});
  w.desks(-99, 0); w.coins(-99, 0, 0, 0, 0); w.trades(-99, 99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
const pill = (hud, y, html, bg, fs) => CX(hud, y, `<span style="display:inline-block;background:${bg};color:#10182a;padding:8px 34px;border-radius:50px;box-shadow:0 10px 26px rgba(0,0,0,.4)">${html}</span>`, "", {fontSize: (fs || 60) + "px", fontWeight: 800});

/* 1. 질문 + 실험 (강의실) */
scene({id: "hook", lines: [
  ["내 손에 들어온 머그컵은 왜 **비싸 보일까**?", "내 손에 들어온 머그컵은, 왜 갑자기 비싸 보일까요?", "pop"],
  ["1990년 **JPE**, 카너먼·네치·세일러", "천구백구십 년, 카너먼 등이 쓴 논문입니다."],
  ["대학생 **절반**에게 머그컵을 무작위로", "연구진은 대학생 절반에게, 머그컵을 무작위로 나눠 줬습니다.", "pop"]],
  build(el, hud) {
    const c = {w: roomWorld(el)};
    c.h = kin(hud, 560, "왜 **내 컵**은<br>비싸 보일까?", 96);
    c.j = kin(hud, 600, "**1990** · JPE", 110);
    c.o = host(hud, "owl", {x: 110, y: 1285, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 880, s: lerp(1.15, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    w.desks(lt, .3, L[2] + .3);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1, L[2] - .2);
    c.o.up(lt, {x: lerp(-200, 110, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 2. 시장 (칠판) */
scene({id: "market", lines: [
  ["컵을 **사고파는 시장**을 열었다", "그리고 컵을 사고팔 수 있는 시장을 열었습니다.", "whoosh@0.2"],
  ["가진 사람은 **팔 값**, 못 가진 사람은 **살 값**", "컵을 가진 사람은 팔 값을, 못 가진 사람은 살 값을 적었죠."]],
  build(el, hud) {
    const c = {w: roomWorld(el)};
    c.o = host(hud, "owl", {x: 150, y: 1275, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    w.colA.setAttribute("opacity", P(lt, .9, .3)); w.colB.setAttribute("opacity", P(lt, 1.2, .3));
    w.qA.setAttribute("opacity", P(lt, L[1] + .2, .3)); w.qB.setAttribute("opacity", P(lt, L[1] + 1.4, .3));
    const ta = spr((lt - 1) / .5); imgAt(w.bigMug, 1080 + 320, 820, clamp(ta, 0, 1.2), 6 * Math.sin(lt * 2)); w.bigMug.style.opacity = clamp(ta * 2);
    const tb = spr((lt - 1.3) / .5); imgAt(w.cash, 1080 + 760, 820, clamp(tb, 0, 1.2), -6 * Math.sin(lt * 2)); w.cash.style.opacity = clamp(tb * 2);
    c.o.up(lt, {mood: "normal", point: ease((lt - .8) / .5), look: [.8, -.5]});
  }
});

/* 3. 결과: 약 7달러 vs 약 3달러 (동전) */
scene({id: "result", lines: [
  ["가진 사람이 부른 값: 중간값 **약 7달러**", "컵을 가진 사람이 부른 값은, 중간값이 약 칠 달러였습니다.", "coin"],
  ["못 가진 사람이 내려던 값: **약 3달러**", "그런데 못 가진 사람은, 약 삼 달러만 내겠다고 했어요.", "coin"],
  ["같은 컵인데 **두 배 넘게** 차이", "똑같은 컵인데, 몇 분 전에 받았다는 이유만으로 두 배 넘게 차이 난 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: roomWorld(el)};
    c.a = A(hud, 130, 300, "", "", {width: "400px", textAlign: "center", fontSize: "80px", fontWeight: 800, color: TEAL, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.b = A(hud, 560, 300, "", "", {width: "400px", textAlign: "center", fontSize: "80px", fontWeight: 800, color: CORAL, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.x2 = pill(hud, 160, "같은 컵, <b>2배 넘게</b>", GOLD, 64);
    c.u = A(hud, 290, 410, "동전 1개 = 1달러 · 중간값", "", {width: "500px", textAlign: "center", fontSize: "34px", fontWeight: 800, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 110, y: 1285, s: .5});
    return c;
  },
  cam(lt, L) {const z = ease((lt - L[2]) / 1); return {x: 540, y: 820, s: lerp(1, 1.05, z)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.labL.setAttribute("opacity", P(lt, .9, .3)); w.labR.setAttribute("opacity", P(lt, L[1] + .1, .3));
    w.coins(lt, 7.12, 1.1, lt < L[1] ? 0 : 2.87, L[1] + .3);
    [[w.mugL, CX2[0], 1.1 + 7 * .1 + .4, 1060 - 7.12 * 34 - 40], [w.mugR, CX2[1], L[1] + .3 + 3 * .1 + .4, 1060 - 2.87 * 34 - 40]].forEach(([e, x, t, y]) => {
      const u = spr((lt - t) / .5); imgAt(e, x, y, clamp(u, 0, 1.2), 0); e.style.opacity = clamp(u * 2)});
    c.a.textContent = "$7.12"; c.a.style.opacity = P(lt, 1.6, .3);
    c.b.textContent = "$2.87"; c.b.style.opacity = P(lt, L[1] + .8, .3);
    ap(c.x2, lt, L[2] + .3, null, {s: .5, back: true}); ap(c.u, lt, 1.2);
    c.o.up(lt, {mood: lt > L[2] ? "surprised" : "normal", look: [.6, -.7]});
  }
});

/* 4. 거래가 적었다 + 소유 효과 (거래) */
scene({id: "trade", lines: [
  ["**코즈 정리**: 물건은 결국 **더 원하는 사람**에게 간다", "물건은 처음 주인이 누구든, 결국 더 원하는 사람에게 간다는 이론이 코즈 정리입니다.", "pop"],
  ["컵을 더 원하는 사람의 **절반은 빈손** → **절반쯤** 거래돼야", "무작위로 나눠 줬으니, 컵을 더 원하는 사람의 절반쯤은 빈손이었을 겁니다. 그러니 컵의 절반쯤은 그들에게 팔려야 하죠."],
  ["하지만 실제 거래는 **훨씬 적었다**", "하지만 실제 거래는 훨씬 적었습니다.", "pop"],
  ["**소유 효과**(Endowment Effect)", "이것을 소유 효과라고 부릅니다.", "ding"],
  ["연구진의 설명: 가진 것을 **잃는 아픔**이 더 크다", "연구진은, 가진 것을 내놓는 아픔이 더 크기 때문으로 봤습니다."]],
  build(el, hud) {
    const c = {w: roomWorld(el)};
    c.ex = A(hud, 120, 420, "", "", {width: "840px", textAlign: "center", fontSize: "48px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.c = A(hud, 760, 540, "개념도", "", {width: "200px", textAlign: "center", fontSize: "32px", fontWeight: 800, color: "#fff", opacity: .8});
    c.k = kin(hud, 170, "**코즈 정리**", 110);
    c.ken = CX(hud, 310, "Coase Theorem", "", {fontSize: "48px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.h = kin(hud, 170, "**소유 효과**", 120);
    c.en = CX(hud, 320, "Endowment Effect", "", {fontSize: "52px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 860, s: lerp(1, 1.05, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    kinUp(c.k, lt, .9, L[1] - .2); c.ken.style.opacity = P(lt, 1.4, .3) * (1 - P(lt, L[1] - .2, .3));
    const exp = lt < L[2];
    w.trades(lt, .8, exp ? 5 : 2, exp ? L[1] + .5 : L[2] + .2);
    c.ex.innerHTML = exp ? "예상: 10쌍 중 <b style='color:#f2c14e'>5쌍</b> 거래" : "실제: <b style='color:#ff8a65'>훨씬 적게</b>";
    c.ex.style.opacity = P(lt, L[1] + .1, .3) * (1 - P(lt, L[3] - .1, .3)); c.c.style.opacity = c.ex.style.opacity * .8;
    kinUp(c.h, lt, L[3] + .1); ap(c.en, lt, L[3] + .6);
    c.o.up(lt, {mood: lt > L[4] ? "skeptical" : lt > L[3] ? "happy" : lt > L[2] ? "surprised" : "normal", point: ease((lt - .8) / .5) * (1 - ease((lt - L[1]) / .5)), look: [.8, -.4]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**소유 효과**와 코즈 정리의 실험적 검증〉", "논문 제목은, 소유 효과와 코즈 정리의 실험적 검증입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: roomWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 980, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.desks(lt, -9, -9);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
