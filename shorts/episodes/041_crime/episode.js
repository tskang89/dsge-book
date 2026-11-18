/* 오늘의 경제 041 — 범죄는 전염될까 (v3: 부엉이 진행자·한 공간 카메라 이동·밤 도시·동전 격자(각자/따라 하기)·범죄 종류 막대)
   논문: Glaeser, E. L., Sacerdote, B. & Scheinkman, J. A. (1996) "Crime and Social Interactions",
         Quarterly Journal of Economics 111(2): 507–548. doi:10.2307/2946686 (NBER WP 5026)
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·NBER 판 초록으로 확인):
   - 시간·공간에 걸친 범죄율의 큰 분산은 오래된 수수께끼, 비용·편익(조건) 차이로는 너무 작아 설명 못 함
   - 사회적 상호작용이 개인 간 공분산을 만들어 도시 간 큰 분산을 설명하는 모형
   - 상호작용 지수: 가벼운 범죄(절도·자동차 절도)에서 가장 큼, 심각한 범죄(폭행·주거 침입·강도) 중간, 살인·강간 거의 없음
   동전 격자는 원리를 보이는 모의 그림(실제 자료 아님, 100개로 줄여 그림). 범죄 종류 막대는 크기 순서만. */
Object.assign(EP, {no: 41, style: "v2", title: "범죄는 전염될까", hook: "범죄도 감기처럼 전염될까?",
  bgm: {seed: 507, bpm: 100, mood: "tense"},
  paper: {journal: "Quarterly Journal of Economics", year: 1996, authors: "Edward L. Glaeser, Bruce Sacerdote & José A. Scheinkman",
          title: "Crime and Social Interactions", ko: "범죄와 사회적 상호작용", cite: "111(2): 507–548", url: "https://doi.org/10.2307/2946686"},
  yt: {title: "범죄도 감기처럼 전염될까? | 범죄와 사회적 상호작용 #경제 #shorts",
       desc: "오래된 수수께끼가 있다. 도시마다 범죄율이 너무 크게 다르다는 것. 경찰이나 소득 같은 조건의 차이만으로는 그 큰 차이를 다 설명할 수 없었다. 동전으로 생각해 보자. 도시마다 동전 1,000개를 각자 던지면 어느 도시든 앞면은 거의 절반으로 비슷하게 나온다. 그런데 동전이 옆 동전을 따라 한다면 도시마다 결과가 크게 갈린다. 그래서 연구진은 도시 간 범죄율 차이가 클수록 사람들이 서로 영향을 주고받는 정도가 크다고 보고 그 크기를 쟀다. 이렇게 서로 주고받는 영향을 사회적 상호작용(Social Interactions)이라고 한다. 결과, 좀도둑질이나 자동차 도둑 같은 가벼운 범죄에서 서로 주고받는 영향이 가장 컸고, 폭행·강도·주거 침입은 중간, 살인과 성폭행에서는 거의 없었다. 주변 영향이 큰 범죄는 작은 변화도 크게 번질 수 있다. (동전 그림은 원리를 보인 모의 그림이다.)",
       tags: ["경제", "범죄", "사회적상호작용", "도시", "또래효과", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 밤 도시 | 1080 각자 던진 동전 | 2160 따라 하는 동전 | 3240 범죄 종류 막대
let WID = 0;

function cityWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("bg", [[0, "#070b1c"], [1, "#1a1a3a"]]); lg("floor", [[0, "#1a1a28"], [1, "#0a0a12"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("bg")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  const r = rng(41);
  w.stars = Array.from({length: 60}, () => S("circle", {cx: r() * WW, cy: r() * 400, r: 1.5 + r() * 2, fill: "#fff", opacity: .5}, g));
  // 0: 밤 도시
  w.wins = [];
  for (let i = 0; i < 8; i++) {const x = 30 + i * 130, h = 260 + r() * 420;
    S("rect", {x, y: 1000 - h, width: 110, height: h, fill: "#141a30", stroke: "#2a3050", "stroke-width": 3}, g);
    for (let k = 0; k < 10; k++) w.wins.push(S("rect", {x: x + 14 + (k % 3) * 32, y: 1000 - h + 20 + Math.floor(k / 3) * 46, width: 20, height: 26, fill: "#ffe39a", opacity: .4}, g))}
  w.siren = img(w.layer, "police_car_light", 540, 420, 140);
  w.q = ST(g, 540, 250, "도시마다 범죄율이 제각각", {"font-size": 50, "font-weight": 900, fill: "#fff", opacity: 0});
  // 동전 격자 세 도시 × 2 구역
  const mk = (x0, mode) => {const rr = rng(mode === "ind" ? 8 : 11);
    return ["도시 A", "도시 B", "도시 C"].map((t, j) => {const cx = x0 + 70 + j * 320, cells = [];
      let p = mode === "ind" ? .5 : [.82, .2, .55][j]; const grid = [];
      for (let k = 0; k < 100; k++) {let v;
        if (mode === "ind") v = rr() < .5; else {const left = k % 10 ? grid[k - 1] : null, up = k >= 10 ? grid[k - 10] : null;
          const nb = [left, up].filter(z => z !== null); v = nb.length && rr() < .7 ? nb[Math.floor(rr() * nb.length)] : rr() < p}
        grid.push(v); cells.push(S("circle", {cx: cx + (k % 10) * 26, cy: 420 + Math.floor(k / 10) * 26, r: 11, fill: "#4a4a62", opacity: 0}, g))}
      const heads = grid.filter(Boolean).length;
      ST(g, cx + 117, 390, t, {"font-size": 34, "font-weight": 900, fill: "#fff"});
      const lab = ST(g, cx + 117, 720, "", {"font-size": 40, "font-weight": 900, fill: GOLD});
      return {cells, grid, heads, lab}})};
  w.ind = mk(1080, "ind"); w.imi = mk(2160, "imi");
  w.indT = ST(g, 1080 + 540, 300, "각자 던지면", {"font-size": 56, "font-weight": 900, fill: "#fff", opacity: 0});
  w.imiT = ST(g, 2160 + 540, 300, "옆을 따라 하면", {"font-size": 56, "font-weight": 900, fill: CORAL, opacity: 0});
  [1080, 2160].forEach(x => ST(g, x + 540, 800, "동전 100개로 줄인 모의 그림 · 노란 칸 = 앞면", {"font-size": 30, "font-weight": 700, fill: "#c9cfe6"}));
  // 3240: 범죄 종류 막대(크기 순서만)
  w.bars = [["좀도둑·자동차 도둑", 520, CORAL, 3240 + 220], ["폭행·강도·주거 침입", 280, GOLD, 3240 + 540], ["살인·성폭행", 26, TEAL, 3240 + 860]].map(([t, h, col, x]) => {
    const rct = S("rect", {x: x - 100, y: 900, width: 200, height: 0, rx: 14, fill: col}, g);
    const tt = t.split("·").length > 2 ? [t.split("·").slice(0, 2).join("·"), t.split("·")[2]] : [t];
    tt.forEach((s, k) => ST(g, x, 950 + k * 40, s, {"font-size": 32, "font-weight": 900, fill: "#fff"}));
    return {rct, h}});
  w.bT = ST(g, 3240 + 540, 300, "서로 주고받는 영향의 크기", {"font-size": 46, "font-weight": 900, fill: "#fff", opacity: 0});
  w.bN = ST(g, 3240 + 540, 1060, "크기 순서만 나타낸 그림", {"font-size": 30, "font-weight": 700, fill: "#c9cfe6", opacity: 0});
  // 앞쪽(흐린) 가로등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("line", {x1: x, y1: 0, x2: x, y2: 110, stroke: "#05030a", "stroke-width": 10}, fs);
    S("ellipse", {cx: x, cy: 130, rx: 90, ry: 40, fill: "#05030a"}, fs); S("ellipse", {cx: x, cy: 160, rx: 60, ry: 14, fill: "#ffe7b0", opacity: .7}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.stars.forEach((s, i) => s.setAttribute("opacity", .3 + .3 * Math.sin(lt * 2 + i)));
    w.wins.forEach((e, i) => e.setAttribute("opacity", .25 + .45 * (Math.sin(lt * .7 + i * 2.1) > .2 ? 1 : 0)));
    imgAt(w.siren, 540, 420, 1 + .05 * Math.sin(lt * 10), 0); w.siren.style.opacity = .5 + .5 * Math.abs(Math.sin(lt * 5))};
  w.flip = (set, title, lt, t0) => {title.setAttribute("opacity", P(lt, t0 - .3, .3));
    set.forEach((c, j) => {c.cells.forEach((e, k) => {const on = lt > t0 + j * .3 + k * .01; e.setAttribute("opacity", on ? 1 : 0); e.setAttribute("fill", on ? (c.grid[k] ? GOLD : "#4a4a62") : "#4a4a62")});
      c.lab.textContent = lt > t0 + j * .3 + 1.1 ? `앞면 ${c.heads}%` : ""})};
  w.grow = (lt, ts) => {w.bT.setAttribute("opacity", P(lt, ts[0], .3)); w.bN.setAttribute("opacity", P(lt, ts[0], .3));
    w.bars.forEach((b, j) => {const u = ease((lt - ts[j]) / .8), h = b.h * u; b.rct.setAttribute("y", 900 - h); b.rct.setAttribute("height", h)})};
  w.flip(w.ind, w.indT, -99, 99); w.flip(w.imi, w.imiT, -99, 99); w.grow(-99, [99, 99, 99]);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["감기가 옮듯이 범죄도 **옮을까?**", "감기가 옮듯이, 범죄도 옮을 수 있을까요?", "pop"],
  ["1996년 **QJE**에 실린 논문", "천구백구십육 년에 나온 논문입니다."],
  ["저자: 글레이저·새서도트·샤인크먼", "저자는, 글레이저 교수, 새서도트 교수, 그리고 샤인크먼 교수입니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.h = kin(hud, 120, "범죄도 **전염**될까?", 92);
    c.j = kin(hud, 120, "**1996** · QJE", 96);
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

/* 2. 수수께끼 */
scene({id: "puzzle", lines: [
  ["오래된 수수께끼: 도시마다 범죄율이 **너무 크게 다르다**", "오래된 수수께끼가 있습니다. 도시마다 범죄율이, 너무 크게 다르다는 겁니다.", "pop"],
  ["경찰·소득 같은 **조건 차이**로는 다 설명이 안 된다", "경찰이나 소득 같은 조건의 차이만으로는, 그 큰 차이를 다 설명할 수 없었죠."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: lerp(1.02, 1.08, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.q.setAttribute("opacity", P(lt, .4, .3));
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 동전으로 생각하기 */
scene({id: "coins", lines: [
  ["동전으로 생각하기: 도시마다 동전 **1,000개**를 던지면?", "동전으로 생각해 볼까요? 도시마다 동전 천 개를, 던진다고 해 봅시다.", "whoosh@0.2"],
  ["**각자** 던지면 어느 도시든 앞면은 **거의 절반**", "각자 던지면, 어느 도시든 앞면은 거의 절반으로, 비슷하게 나옵니다.", "coin"],
  ["그런데 **옆 동전을 따라** 하면? 도시마다 **크게 갈린다**", "그런데 동전이 옆 동전을 따라 한다면, 도시마다 결과가 크게 갈리게 되죠.", "ding"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 640, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[2] ? whip(lt, 0, 0, 1080, .9) : whip(lt, L[2], 1080, 2160, .9));
    w.flip(w.ind, w.indT, lt, L[1] + .2); w.flip(w.imi, w.imiT, lt, L[2] + 1);
    c.o.up(lt, {mood: lt > L[2] + 2 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 무엇을 쟀나 */
scene({id: "measure", lines: [
  ["도시 간 차이가 클수록 **서로 주는 영향**이 크다", "그래서 연구진은, 도시 사이 범죄율 차이가 클수록, 사람들이 서로 영향을 주고받는 정도가 크다고 보고, 그 크기를 쟀습니다.", "pop"],
  ["이런 영향 = **사회적_상호작용**(Social Interactions)", "이렇게 서로 주고받는 영향을, 사회적 상호작용이라고 부릅니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 640, s: lerp(1.02, 1.06, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(2160); w.flip(w.imi, w.imiT, 99, 0);
    c.o.up(lt, {mood: "normal", look: [.7, -.6]});
  }
});

/* 5. 결과 */
scene({id: "result", lines: [
  ["좀도둑·자동차 도둑 같은 **가벼운 범죄**: 영향 가장 큼", "결과, 좀도둑질이나 자동차 도둑 같은 가벼운 범죄에서, 서로 주고받는 영향이 가장 컸고,", "coin"],
  ["폭행·강도·주거 침입: **중간**", "폭행이나 강도, 남의 집에 들어가는 범죄는 중간,"],
  ["살인·성폭행: **거의 없음**", "살인과 성폭행에서는, 거의 없었습니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.flip(w.imi, w.imiT, 99, 0); w.grow(lt, [.9, L[1] + .2, L[2] + .2]);
    c.o.up(lt, {mood: lt > L[2] ? "normal" : "surprised", look: [.7, -.6]});
  }
});

/* 6. 뜻 */
scene({id: "meaning", lines: [
  ["주변 영향이 큰 범죄는 **작은 변화도 크게 번질** 수 있다", "그래서 주변 영향이 큰 범죄는, 작은 변화도, 크게 번질 수 있다는 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1.2)); w.grow(99, [0, 0, 0]);
    c.o.up(lt, {mood: "skeptical", look: [.7, -.5]});
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**범죄와 사회적 상호작용**〉", "논문 제목은, 범죄와 사회적 상호작용입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
