/* 오늘의 경제 038 — 벌금은 가격이다 (v3: 부엉이 진행자·한 공간 카메라 이동·어린이집·10곳·지각 선·미안함과 가격표)
   논문: Gneezy, U. & Rustichini, A. (2000) "A Fine is a Price", Journal of Legal Studies 29(1): 1–17. doi:10.1086/468061
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·검색 요약으로 확인):
   - 이스라엘 하이파 사립 어린이집 10곳, 20주. 5주째(period five)부터 6곳에 늦게 데리러 오는 부모에게 벌금, 나머지 4곳은 비교 집단
   - 벌금: 10분 넘게 늦으면, 약 10셰켈(당시 약 3달러) — 요약마다 조금 다름(작업 논문판은 11곳·20셰켈)
   - 결과: 늦게 오는 부모 수가 유의하게 늘었고, 벌금을 없앤 뒤에도 줄지 않음. 비교 집단엔 비슷한 증가 없음
   - '두 배' 같은 정확한 배수·주차는 확인 못 해 쓰지 않음(선 그림은 모양만)
   - 후속 설문 재현 연구는 원래 결과를 재현하지 못했다는 보고 → 설명란
   해석(저자): 계약이 불완전할 때 벌금이 상황의 의미를 바꿈 — 미안한 일 → 값을 치르고 사는 것. */
Object.assign(EP, {no: 38, style: "v2", title: "벌금은 가격이다", hook: "지각에 벌금을 매겼더니 지각이 늘었다?",
  bgm: {seed: 1, bpm: 102, mood: "bright"},
  paper: {journal: "Journal of Legal Studies", year: 2000, authors: "Uri Gneezy & Aldo Rustichini",
          title: "A Fine is a Price", ko: "벌금은 가격이다", cite: "29(1): 1–17", url: "https://doi.org/10.1086/468061"},
  yt: {title: "지각에 벌금을 매겼더니 지각이 늘었다? | 벌금은 가격이다 #경제 #shorts",
       desc: "연구진은 이스라엘 하이파의 어린이집 10곳을 20주 동안 지켜봤다. 골칫거리는 문 닫는 시간이 지나서야 아이를 데리러 오는 부모였다. 선생님은 그 아이와 함께 남아 기다려야 한다. 5주째부터 6곳에만 벌금을 도입했다. 10분 넘게 늦으면 약 3달러(10셰켈)를 내는 것이다. 나머지 4곳은 비교하려고 그대로 뒀다. 그런데 벌금을 매긴 곳에서는 늦게 오는 부모가 오히려 크게 늘었다. 벌금이 없는 4곳에서는 그런 변화가 없었다. 더 놀라운 건 몇 달 뒤 벌금을 없앴는데도 늦는 부모가 줄지 않았다는 것. 벌금이 없을 때는 늦는 게 선생님께 미안한 일이었다. 그런데 벌금이 생기자 늦는 건 돈을 내고 사는 서비스가 됐다. 약 3달러만 내면 마음 편히 늦을 수 있게 된 것이다. 논문 제목 그대로 벌금이 가격이 됐다. 그리고 한번 사라진 미안한 마음은 벌금을 없애도 돌아오지 않았다. 돈으로 행동을 바꾸려다가 사람들 마음속의 규칙을 깰 수도 있다는 교훈이다. (선 그림은 모양만 나타낸 것이다. 후속 설문 재현 연구에서는 원래 결과가 재현되지 않았다는 보고도 있다.)",
       tags: ["경제", "행동경제학", "유인", "벌금", "사회규범", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 어린이집 | 1080 10곳 | 2160 지각 선 | 3240 미안함 → 가격표
let WID = 0;

function careWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#3a4a8a"], [.6, "#d0806a"], [1, "#f0c08a"]]); lg("lawn", [[0, "#6aa65a"], [1, "#2f5a2a"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("lawn")}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 160 + (i % 3) * 60, rx: 150, ry: 36, fill: "#fff", opacity: .4}, g));
  // 0: 어린이집 (해 질 녘)
  S("rect", {x: 150, y: 520, width: 520, height: 480, rx: 20, fill: "#f4d48a", stroke: "#8a6a3a", "stroke-width": 8}, g);
  S("path", {d: "M120,530 L410,360 L700,530 Z", fill: "#e05a4a"}, g);
  ST(g, 410, 600, "어린이집", {"font-size": 50, "font-weight": 900, fill: "#5a3a1a"});
  S("rect", {x: 360, y: 820, width: 100, height: 180, fill: "#8a5a3a"}, g);
  w.clock = img(w.layer, "alarm_clock", 410, 790, 150);
  w.teach = img(w.layer, "teacher", 250, 1000, 170);
  w.child = img(w.layer, "child", 560, 1000, 130);
  w.parent = img(w.layer, "person_running", 980, 1000, 170);
  // 1080: 10곳
  w.cent = Array.from({length: 10}, (_, i) => {const x = 1080 + 150 + (i % 5) * 195, y = 520 + Math.floor(i / 5) * 280;
    const h = img(w.layer, "house", x, y, 150); const tag = ST(g, x, y + 50, i < 6 ? "벌금" : "그대로", {"font-size": 38, "font-weight": 900, fill: i < 6 ? RED : "#fff", "paint-order": "stroke", stroke: "#1a1a2a", "stroke-width": 8, opacity: 0}); return {h, tag}});
  // 2160: 지각 선 (모양만)
  const x0 = 2160 + 140, x1 = 2160 + 940, base = 880, wx = k => lerp(x0, x1, (k - 1) / 19);
  S("line", {x1: x0, y1: base, x2: x1, y2: base, stroke: "#fff", "stroke-width": 4}, g);
  [[1, "1주"], [5, "5주"], [20, "20주"]].forEach(([k, t]) => ST(g, wx(k), base + 50, t, {"font-size": 36, "font-weight": 800, fill: "#fff"}));
  w.fineBand = S("rect", {x: wx(5), y: 280, width: wx(16.5) - wx(5), height: base - 280, fill: RED, opacity: 0}, g);
  w.fineLab = ST(g, (wx(5) + wx(16.5)) / 2, 260, "벌금 기간", {"font-size": 42, "font-weight": 900, fill: RED, opacity: 0});
  const tp = [], cp = [];
  for (let k = 1; k <= 20; k++) {const up = k < 5 ? 0 : Math.min(1, (k - 5) / 6); tp.push([wx(k), 720 - 330 * up + 10 * Math.sin(k * 1.7)]); cp.push([wx(k), 730 + 12 * Math.sin(k * 1.3)])}
  w.tl = S("path", {d: poly(tp), stroke: CORAL, "stroke-width": 9, fill: "none"}, g);
  w.cl = S("path", {d: poly(cp), stroke: "#c9cfe6", "stroke-width": 7, fill: "none", "stroke-dasharray": "16 10"}, g);
  w.tlLab = ST(g, x1 - 20, 360, "벌금 6곳", {"font-size": 40, "font-weight": 900, fill: CORAL, "text-anchor": "end", opacity: 0});
  w.clLab = ST(g, x1 - 20, 800, "그대로 4곳", {"font-size": 40, "font-weight": 900, fill: "#e8e0ff", "text-anchor": "end", opacity: 0});
  w.yLab = ST(g, 2160 + 540, 1000, "늦게 오는 부모 수 · 모양만 나타낸 그림", {"font-size": 32, "font-weight": 700, fill: "#fff", opacity: 0});
  // 3240: 미안함 → 가격표
  w.heart = img(w.layer, "red_heart", 3240 + 300, 700, 220);
  w.hLab = ST(g, 3240 + 300, 420, "미안한 일", {"font-size": 56, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a1a2a", "stroke-width": 8, opacity: 0});
  w.tag = img(w.layer, "label", 3240 + 780, 700, 220);
  w.tLab = ST(g, 3240 + 780, 420, "돈 내고 사는 것", {"font-size": 56, "font-weight": 900, fill: GOLD, "paint-order": "stroke", stroke: "#3a2a1a", "stroke-width": 8, opacity: 0});
  w.arrow = ST(g, 3240 + 540, 640, "→", {"font-size": 110, "font-weight": 900, fill: "#fff", opacity: 0});
  // 앞쪽(흐린) 나뭇잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {for (let j = 0; j < 6; j++) S("ellipse", {cx: x - 160 + j * 70, cy: 40 + (j % 2) * 40, rx: 50, ry: 30, fill: "#2a3a1a", opacity: .9}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 12 * (1 + i % 3)) % WW));
    imgAt(w.clock, 410, 790, 1 + .05 * Math.sin(lt * 8), 6 * Math.sin(lt * 8)); imgAt(w.child, 560, 1000 - 4 * Math.abs(Math.sin(lt * 2)), 1, 0)};
  w.run = (lt, t0) => {const u = clamp((lt - t0) / 2.5); imgAt(w.parent, lerp(1100, 720, u), 1000 - 14 * Math.abs(Math.sin(lt * 10)) * (u > 0 && u < 1 ? 1 : 0), 1, 0)};
  w.tags = (lt, ta, tb) => w.cent.forEach((c, i) => c.tag.setAttribute("opacity", P(lt, i < 6 ? ta + i * .12 : tb + (i - 6) * .12, .25)));
  w.lines = (lt, t0, tc, tr) => {w.fineBand.setAttribute("opacity", .14 * P(lt, t0, .3)); w.fineLab.setAttribute("opacity", P(lt, t0, .3)); w.yLab.setAttribute("opacity", P(lt, t0, .3));
    const u = clamp((lt - t0 - .2) / 2.2), v = lt > tr ? 1 : Math.min(u, (16.5 - 1) / 19);
    draw(w.tl, v); w.tlLab.setAttribute("opacity", P(lt, t0 + 1.6, .3));
    draw(w.cl, lt > tc ? clamp((lt - tc) / 1.2) : 0); w.clLab.setAttribute("opacity", P(lt, tc + .8, .3))};
  w.flip = (lt, th, tt) => {const uh = spr((lt - th) / .5), ut = spr((lt - tt) / .5);
    imgAt(w.heart, 3240 + 300, 700, clamp(uh, 0, 1.2) * (lt > tt ? .7 : 1), 0); w.heart.style.opacity = clamp(uh * 2) * (lt > tt ? .45 : 1); w.hLab.setAttribute("opacity", P(lt, th, .3));
    imgAt(w.tag, 3240 + 780, 700, clamp(ut, 0, 1.2), -8); w.tag.style.opacity = clamp(ut * 2); w.tLab.setAttribute("opacity", P(lt, tt, .3)); w.arrow.setAttribute("opacity", P(lt, tt - .2, .3))};
  w.run(-99, 0); w.tags(-99, 99, 99); w.lines(-99, 99, 99, 99); w.flip(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["지각에 **벌금**을 매겼더니, 지각이 **늘었다?**", "지각하면 벌금을 내게 했더니, 오히려 지각이 늘었다면, 믿어지시나요?", "pop"],
  ["2000년 **법경제학 학술지**에 실린 논문", "이천 년에 나온 논문입니다."],
  ["저자: 그니지_교수와 러스티치니_교수", "저자는, 그니지 교수, 그리고 러스티치니 교수입니다."]],
  build(el, hud) {
    const c = {w: careWorld(el)};
    c.h = kin(hud, 120, "벌금을 매겼더니 **지각 ↑**?", 84);
    c.j = kin(hud, 120, "**2000** · J. Legal Studies", 76);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.run(lt, .6);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 실험 */
scene({id: "setup", lines: [
  ["이스라엘 하이파의 **어린이집 10곳**, 20주 동안", "연구진은 이스라엘 하이파의 어린이집 열 곳을, 이십 주 동안 지켜봤습니다.", "pop"],
  ["골칫거리: 문 닫는 시간에 **늦게 데리러 오는** 부모", "골칫거리는, 문 닫는 시간이 지나서야 아이를 데리러 오는 부모였죠. 선생님은 그 아이와 함께 남아서 기다려야 합니다."],
  ["다섯째 주부터 6곳에만 **벌금**: 10분 넘게 늦으면 약 3달러", "다섯째 주부터, 여섯 곳에만 벌금을 도입했습니다. 십 분 넘게 늦으면, 약 삼 달러를 내는 겁니다.", "coin"],
  ["나머지 4곳은 **그대로** (비교용)", "나머지 네 곳은, 비교하려고 그대로 뒀습니다."]],
  build(el, hud) {
    const c = {w: careWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.run(lt < L[2] ? lt - L[1] : 99, 0);
    w.pan(lt < L[2] ? 0 : whip(lt, L[2], 0, 1080, .9)); w.tags(lt, L[2] + 1, L[3] + .2);
    c.o.up(lt, {mood: lt > L[1] && lt < L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 결과 */
scene({id: "result", lines: [
  ["벌금이 생긴 곳: 늦는 부모가 **줄기는커녕 많아졌다**", "그런데 벌금이 생긴 곳에서는, 늦게 오는 부모가, 줄기는커녕 오히려 많아졌습니다.", "ding"],
  ["벌금이 없는 4곳은 **변화 없음**", "벌금이 없는 네 곳에서는, 그런 변화가 없었죠."],
  ["몇 달 뒤 벌금을 **없앴는데도** 늦는 부모는 **줄지 않았다**", "더 놀라운 건, 몇 달 뒤 벌금을 없앴는데도, 늦는 부모가 줄지 않았다는 겁니다.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: careWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.tags(99, 0, 0); w.lines(lt, .9, L[1] + .2, L[2] + .4);
    c.o.up(lt, {mood: lt > 2.4 && lt < L[1] ? "surprised" : lt > L[2] + .5 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 왜 */
scene({id: "why", lines: [
  ["전에는: 늦으면 선생님께 **미안한 일**", "벌금이 없을 때는, 늦는 게 선생님께 미안한 일이었습니다.", "pop"],
  ["벌금이 생기자: 늦는 건 **돈 내고 사는 서비스**", "그런데 벌금이 생기자, 늦는 건 돈을 내고 사는 서비스가 됐죠. 약 삼 달러만 내면, 마음 편히 늦을 수 있게 된 겁니다.", "coin"],
  ["논문 제목 그대로: **벌금이 가격**이 됐다", "논문 제목 그대로, 벌금이 가격이 된 겁니다.", "ding"],
  ["벌금을 없애도 미안한 마음은 **돌아오지 않았다**", "그리고 한번 사라진 미안한 마음은, 벌금을 없애도 돌아오지 않았습니다."]],
  build(el, hud) {
    const c = {w: careWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.lines(99, 0, 0, 0); w.flip(lt, .8, L[1] + .4);
    c.o.up(lt, {mood: lt > L[3] ? "skeptical" : lt > L[2] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 5. 교훈 */
scene({id: "meaning", lines: [
  ["돈으로 행동을 바꾸려다 **마음속 규칙**을 깰 수 있다", "돈으로 행동을 바꾸려다가, 사람들 마음속의 규칙을, 깰 수도 있다는 교훈입니다.", "ding"]],
  build(el, hud) {
    const c = {w: careWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1.2)); w.flip(99, 0, 0); w.run(99, 0);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**벌금은 가격이다**〉", "논문 제목은, 벌금은 가격이다 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: careWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.run(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
