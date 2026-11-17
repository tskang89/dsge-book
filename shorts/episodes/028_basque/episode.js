/* 오늘의 경제 028 — 가상의 바스크 (v3: 부엉이 진행자·한 공간 카메라 이동·지방 섞기·두 선 비교·휴전 주가)
   논문: Abadie, A. & Gardeazabal, J. (2003) "The Economic Costs of Conflict: A Case Study of the Basque Country",
         American Economic Review 93(1): 113–132. doi:10.1257/000282803321455188
   확인(2026-11-17, 원문 PDF 는 이 세션에서 막힘 — 초록으로 확인):
   - 비교 대상: 테러 이전 여러 경제 지표가 바스크와 '닮은' 다른 스페인 지방들의 조합(합성 통제 지역)
   - 1960년대 말 테러 시작 뒤 바스크 1인당 GDP 가 합성 통제 지역보다 약 10%포인트 하락
   - 1998–1999 휴전을 자연 실험으로: 바스크 사업 비중이 큰 기업 주식이 휴전이 믿을 만해지자 상대적으로 좋았고, 휴전이 끝나자 상대적으로 나빴다
   - 섞은 지방 이름·가중치는 확인 못 해 쓰지 않음
   화면 선은 모양만 나타낸 그림(실제 자료 아님), 격차 이름표만 초록 값(약 10%p). */
Object.assign(EP, {no: 28, style: "v2", title: "가상의 바스크", hook: "테러가 없었다면, 이 지역은 얼마나 더 잘 살았을까?",
  bgm: {seed: 113, bpm: 96, mood: "calm"},
  paper: {journal: "American Economic Review", year: 2003, authors: "Alberto Abadie & Javier Gardeazabal",
          title: "The Economic Costs of Conflict: A Case Study of the Basque Country",
          ko: "갈등의 경제적 비용: 바스크 지방 사례 연구", cite: "93(1): 113–132", url: "https://doi.org/10.1257/000282803321455188"},
  yt: {title: "테러가 없었다면 얼마나 더 잘 살았을까? | 가상의 바스크 #경제 #shorts",
       desc: "스페인 바스크 지방에서는 1960년대 말부터 무장 단체의 테러가 이어졌다. 문제는 테러가 없었던 바스크를 볼 수 없다는 것. 그래서 연구진은 테러 전의 바스크와 경제가 닮은 다른 지방들을 섞어서 '가상의 바스크'를 만들었다. 이렇게 비교 대상을 만들어 내는 방법을 합성 통제법(Synthetic Control Method)이라고 한다. 테러 전에는 진짜 바스크와 가상의 바스크가 거의 똑같이 움직였다. 그런데 테러가 시작된 뒤, 진짜 바스크의 1인당 생산(GDP)은 가상의 바스크보다 약 10%포인트 뒤처졌다. 또 1998년 휴전이 믿을 만해지자 바스크에서 사업을 많이 하는 회사들의 주식 가격이 상대적으로 올랐고, 휴전이 끝나자 다시 떨어졌다. 갈등이 경제에 남기는 비용을 숫자로 잰 연구다. (영상의 선 그림은 모양만 나타낸 것이다.)",
       tags: ["경제", "합성통제법", "바스크", "테러", "인과추론", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", GREEN = "#3f8a55";
const WW = 4320;                       // 세계 너비: 0 바스크 마을 | 1080 지방 섞기 | 2160 두 선 | 3240 휴전과 주가
let WID = 0;

function basqueWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#2a4a7a"], [.7, "#7a9ac0"], [1, "#c8d8e0"]]); lg("hill", [[0, "#4a9a5a"], [1, "#22502e"]]); lg("ground", [[0, "#1c3a26"], [1, "#0c1a10"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  for (let k = 0; k < 3; k++) {let s = `M0,1000`; for (let x = 0; x <= WW; x += 60) s += ` L${x},${760 + k * 70 - 60 * Math.sin(x / (260 + k * 90) + k)}`;
    S("path", {d: s + ` L${WW},1000 Z`, fill: U("hill"), opacity: .5 + k * .25}, g)}
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("ground")}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 160 + (i % 3) * 60, rx: 150, ry: 36, fill: "#fff", opacity: .45}, g));
  // 0: 바스크 마을 (빨간 지붕)
  w.town = [];
  for (let i = 0; i < 7; i++) {const x = 120 + i * 130, h = 120 + (i % 3) * 40;
    S("rect", {x, y: 1000 - h, width: 110, height: h, fill: "#efe6d6", stroke: "#8a7a6a", "stroke-width": 3}, g);
    S("path", {d: `M${x - 10},${1000 - h} L${x + 55},${1000 - h - 50} L${x + 120},${1000 - h} Z`, fill: "#b8442e"}, g);
    w.town.push(S("rect", {x: x + 35, y: 1000 - h + 30, width: 40, height: 40, fill: "#ffe3a0", opacity: .5}, g))}
  w.warn = img(w.layer, "warning", 540, 560, 170);
  w.name0 = ST(g, 540, 300, "스페인 바스크 지방", {"font-size": 56, "font-weight": 900, fill: "#fff", opacity: 0});
  // 1080: 지방 섞기
  const blob = (cx, cy, r, col) => S("path", {d: `M${cx - r},${cy} C${cx - r},${cy - r * 1.1} ${cx + r * .9},${cy - r} ${cx + r},${cy - r * .1} C${cx + r * 1.1},${cy + r} ${cx - r * .6},${cy + r * 1.05} ${cx - r},${cy} Z`, fill: col, stroke: "#10182a", "stroke-width": 5}, g);
  w.miss = blob(1080 + 540, 380, 130, "none"); w.miss.setAttribute("stroke", "#fff"); w.miss.setAttribute("stroke-dasharray", "18 12"); w.miss.setAttribute("opacity", 0);
  w.missQ = ST(g, 1080 + 540, 410, "?", {"font-size": 120, "font-weight": 900, fill: "#fff", opacity: 0});
  w.missLab = ST(g, 1080 + 540, 200, "테러가 없었던 바스크", {"font-size": 46, "font-weight": 900, fill: "#fff", opacity: 0});
  w.parts = [[1080 + 220, BLUE, "지방 A"], [1080 + 540, TEAL, "지방 B"], [1080 + 860, CORAL, "지방 C"]].map(([x, col, t]) => {
    const gg = S("g", {opacity: 0}, g); blob(x, 0, 80, col).remove(); const b = S("path", {d: "", fill: col, stroke: "#10182a", "stroke-width": 5}, gg);
    const lab = ST(gg, x, 0, t, {"font-size": 38, "font-weight": 900, fill: "#10182a"}); return {gg, b, lab, x, col}});
  w.synth = blob(1080 + 540, 820, 140, GOLD); w.synth.setAttribute("opacity", 0);
  w.synthLab = ST(g, 1080 + 540, 830, "가상의 바스크", {"font-size": 46, "font-weight": 900, fill: "#10182a", opacity: 0});
  w.blobD = (cx, cy, r) => `M${cx - r},${cy} C${cx - r},${cy - r * 1.1} ${cx + r * .9},${cy - r} ${cx + r},${cy - r * .1} C${cx + r * 1.1},${cy + r} ${cx - r * .6},${cy + r * 1.05} ${cx - r},${cy} Z`;
  // 2160: 두 선 (1인당 생산)
  const x0 = 2160 + 120, x1 = 2160 + 960, base = 900;
  S("line", {x1: x0, y1: base, x2: x1, y2: base, stroke: "#fff", "stroke-width": 4}, g);
  ST(g, x0 + 20, base + 50, "1955", {"font-size": 36, "font-weight": 800, fill: "#e8eef8"}); ST(g, x1 - 20, base + 50, "1997", {"font-size": 36, "font-weight": 800, fill: "#e8eef8"});
  const xs = u => lerp(x0, x1, u), tT = (1969 - 1955) / (1997 - 1955);
  w.tLine = S("line", {x1: xs(tT), y1: 300, x2: xs(tT), y2: base, stroke: RED, "stroke-width": 5, "stroke-dasharray": "14 10", opacity: 0}, g);
  w.tLab = ST(g, xs(tT), 280, "테러 시작", {"paint-order": "stroke", stroke: "#0b1a10", "stroke-width": 9, "font-size": 40, "font-weight": 900, fill: RED, opacity: 0});
  const NN = 43, sy = [], ry = [];
  for (let i = 0; i < NN; i++) {const u = i / (NN - 1), tr = 820 - 480 * u - 40 * Math.sin(u * 7);
    sy.push([xs(u), tr]); ry.push([xs(u), tr + (u > tT ? 150 * Math.min(1, (u - tT) / .45) : 0) + 6 * Math.sin(i)])}
  w.sL = S("path", {d: poly(sy), stroke: GOLD, "stroke-width": 9, fill: "none", "stroke-dasharray": "20 12"}, g);
  w.rL = S("path", {d: poly(ry), stroke: TEAL, "stroke-width": 9, fill: "none"}, g);
  w.sLab = ST(g, x1 - 120, sy[NN - 1][1] - 30, "가상의 바스크", {"paint-order": "stroke", stroke: "#0b1a10", "stroke-width": 9, "font-size": 40, "font-weight": 900, fill: GOLD, opacity: 0});
  w.rLab = ST(g, x1 - 120, ry[NN - 1][1] + 60, "진짜 바스크", {"paint-order": "stroke", stroke: "#0b1a10", "stroke-width": 9, "font-size": 40, "font-weight": 900, fill: TEAL, opacity: 0});
  w.gap = S("line", {x1: x1 - 40, y1: sy[NN - 1][1], x2: x1 - 40, y2: ry[NN - 1][1], stroke: "#fff", "stroke-width": 6, opacity: 0}, g);
  w.gapLab = ST(g, x1 - 230, (sy[NN - 1][1] + ry[NN - 1][1]) / 2 + 20, "약 10%p", {"paint-order": "stroke", stroke: "#0b1a10", "stroke-width": 9, "font-size": 64, "font-weight": 900, fill: "#fff", opacity: 0});
  w.yLab = ST(g, 2160 + 540, 1000, "1인당 생산 · 모양만 나타낸 그림", {"font-size": 32, "font-weight": 700, fill: "#e8eef8", opacity: 0});
  // 3240: 휴전 기간과 주가
  const qx0 = 3240 + 140, qx1 = 3240 + 940;
  w.truce = S("rect", {x: lerp(qx0, qx1, .3), y: 300, width: (qx1 - qx0) * .4, height: 600, fill: "#ffffff", opacity: 0}, g);
  w.truceLab = ST(g, lerp(qx0, qx1, .5), 280, "휴전 (1998~1999)", {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0});
  S("line", {x1: qx0, y1: 900, x2: qx1, y2: 900, stroke: "#fff", "stroke-width": 4}, g);
  const sp = []; for (let i = 0; i <= 60; i++) {const u = i / 60; let v = 620 + 12 * Math.sin(i * 1.3);
    if (u > .3 && u < .7) v -= 200 * Math.sin(Math.PI * Math.min(1, (u - .3) / .2) / 2); if (u >= .7) v -= 200 - 260 * Math.min(1, (u - .7) / .12); sp.push([lerp(qx0, qx1, u), v])}
  w.stock = S("path", {d: poly(sp), stroke: GOLD, "stroke-width": 9, fill: "none"}, g);
  w.stockLab = ST(g, 3240 + 540, 1000, "바스크 사업 비중이 큰 회사 (다른 회사 대비)", {"font-size": 34, "font-weight": 800, fill: "#e8eef8", opacity: 0});
  w.dove = img(w.layer, "handshake", 3240 + 540, 520, 140);
  // 앞쪽(흐린) 나뭇잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {for (let j = 0; j < 6; j++) S("ellipse", {cx: x - 160 + j * 70, cy: 40 + (j % 2) * 40, rx: 46, ry: 26, fill: "#16301e", opacity: .9}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 12 * (1 + i % 3)) % WW));
    w.town.forEach((e, i) => e.setAttribute("opacity", .35 + .3 * Math.sin(lt * 1.3 + i)))};
  w.intro = (lt, t0, tw) => {w.name0.setAttribute("opacity", P(lt, t0, .3)); const u = spr((lt - tw) / .5);
    imgAt(w.warn, 540, 560, clamp(u, 0, 1.2) * (1 + .04 * Math.sin(lt * 6)), 0); w.warn.style.opacity = clamp(u * 2)};
  w.missing = (lt, t0) => {[w.miss, w.missQ, w.missLab].forEach(e => e.setAttribute("opacity", P(lt, t0, .4)))};
  w.mix = (lt, t0) => {w.parts.forEach((p, i) => {const ua = P(lt, t0 + i * .25, .3), um = ease((lt - t0 - 1.3) / 1);
      const cx = lerp(p.x, 1080 + 540, um), cy = lerp(600, 820, um), r = lerp(80, 40, um);
      p.gg.setAttribute("opacity", ua * (1 - P(lt, t0 + 2.1, .3))); p.b.setAttribute("d", w.blobD(cx, cy, r)); p.lab.setAttribute("x", cx); p.lab.setAttribute("y", cy + 14)});
    const us = spr((lt - t0 - 2.1) / .6); w.synth.setAttribute("opacity", clamp(us * 2)); w.synthLab.setAttribute("opacity", P(lt, t0 + 2.3, .3));
    w.synth.setAttribute("transform", `translate(${1080 + 540},820) scale(${clamp(us, 0, 1.2)}) translate(${-(1080 + 540)},-820)`)};
  w.lines = (lt, t0, tg) => {draw(w.sL, (lt - t0) / 1.6); draw(w.rL, (lt - t0) / 1.6); w.sL.style.strokeDasharray = lt > t0 + 1.6 ? "20 12" : w.sL.style.strokeDasharray;
    [w.tLine, w.tLab, w.yLab].forEach(e => e.setAttribute("opacity", P(lt, t0 + .3, .3))); [w.sLab, w.rLab].forEach(e => e.setAttribute("opacity", P(lt, t0 + 1.4, .3)));
    [w.gap, w.gapLab].forEach(e => e.setAttribute("opacity", P(lt, tg, .3)))};
  w.truceOn = (lt, t0, te) => {w.truce.setAttribute("opacity", .12 * P(lt, t0, .3)); w.truceLab.setAttribute("opacity", P(lt, t0, .3)); w.stockLab.setAttribute("opacity", P(lt, t0, .3));
    draw(w.stock, lt < te ? .55 * clamp((lt - t0) / 1.2) : .55 + .45 * clamp((lt - te) / 1));
    const u = spr((lt - t0 - .3) / .5); imgAt(w.dove, 3240 + 540, 520, clamp(u, 0, 1.2) * (lt > te + .6 ? 1 - P(lt, te + .6, .4) : 1), 0); w.dove.style.opacity = clamp(u * 2)};
  w.intro(-99, 99, 99); w.missing(-99, 99); w.mix(-99, 99); w.lines(-99, 99, 99); w.truceOn(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["테러가 없었다면 **얼마나 더** 잘 살았을까?", "테러가 없었다면, 이 지역은 얼마나 더 잘 살았을까요?", "pop"],
  ["2003년 **AER**에 실린 논문", "이천삼 년에 나온 논문입니다."],
  ["저자: 아바디_교수와 가르데아사발_교수", "저자는, 아바디 교수, 그리고 가르데아사발 교수입니다."]],
  build(el, hud) {
    const c = {w: basqueWorld(el)};
    c.h = kin(hud, 120, "테러가 **없었다면?**", 90);
    c.j = kin(hud, 120, "**2003** · AER", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 배경과 문제 */
scene({id: "setting", lines: [
  ["스페인 **바스크_지방**: 1960년대 말부터 테러", "스페인 바스크 지방에서는, 천구백육십 년대 말부터, 무장 단체의 테러가 이어졌습니다.", "pop"],
  ["문제: 테러가 **없었던 바스크**는 볼 수 없다", "문제는, 테러가 없었던 바스크를, 볼 수 없다는 겁니다.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: basqueWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? 0 : whip(lt, L[1], 0, 1080, .9)); w.intro(lt, .2, 1.4); w.missing(lt, L[1] + .8);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 방법: 가상의 바스크 */
scene({id: "method", lines: [
  ["테러 전 바스크와 **닮은 지방들**을 섞어", "그래서 연구진은, 테러 전의 바스크와 경제가 닮은, 다른 지방들을 섞어서,", "pop"],
  ["**'가상의 바스크'**를 만들었다", "가상의 바스크를 만들었습니다.", "ding"],
  ["이 방법 = **합성_통제법**(Synthetic Control Method)", "이렇게 비교 대상을 만들어 내는 방법을, 합성 통제법이라고 부릅니다."]],
  build(el, hud) {
    const c = {w: basqueWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.missing(99, 0); w.mix(lt, Math.max(.3, L[1] - 2.1));
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["테러 전에는 두 선이 **거의 겹쳤다**", "테러 전에는, 진짜 바스크와 가상의 바스크가, 거의 똑같이 움직였습니다.", "whoosh@0.2"],
  ["테러 뒤: 가상의 바스크보다 **약_10%p** 뒤처졌다", "그런데 테러가 시작된 뒤, 진짜 바스크의 일인당 생산은, 가상의 바스크보다 약 십 퍼센트포인트 뒤처졌습니다.", "coin"]],
  build(el, hud) {
    const c = {w: basqueWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.mix(99, 0); w.lines(lt, .9, L[1] + 2.5);
    c.o.up(lt, {mood: lt > L[1] + 2.5 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 휴전과 주식 */
scene({id: "truce", lines: [
  ["**휴전** 때: 바스크 사업이 많은 회사 주가 ↑", "또, 천구백구십팔 년의 휴전이 믿을 만해지자, 바스크에서 사업을 많이 하는 회사들의 주식 가격이, 다른 회사보다 올랐고,", "whoosh@0.2"],
  ["휴전이 끝나자 **다시 떨어졌다**", "휴전이 끝나자, 다시 떨어졌습니다."],
  ["갈등이 경제에 남기는 비용을 **숫자로** 잰 연구", "갈등이 경제에 남기는 비용을, 숫자로 잰 연구인 셈이죠.", "ding"]],
  build(el, hud) {
    const c = {w: basqueWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.lines(99, 0, 0); w.truceOn(lt, .9, L[1]);
    c.o.up(lt, {mood: lt > L[1] && lt < L[2] ? "skeptical" : lt > L[2] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**갈등의 경제적 비용**: 바스크 지방 사례 연구〉", "논문 제목은, 갈등의 경제적 비용, 바스크 지방 사례 연구입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: basqueWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.intro(99, 0, 0); w.truceOn(99, 0, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
