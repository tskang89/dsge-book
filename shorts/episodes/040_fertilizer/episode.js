/* 오늘의 경제 040 — 비료와 넛지 (v3: 부엉이 진행자·한 공간 카메라 이동·옥수수밭·달력과 사라지는 동전·쿠폰과 배달·세 막대)
   논문: Duflo, E., Kremer, M. & Robinson, J. (2011) "Nudging Farmers to Use Fertilizer: Theory and Experimental Evidence from Kenya",
         American Economic Review 101(6): 2350–2390. doi:10.1257/aer.101.6.2350
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·J-PAL/IPA 요약으로 확인):
   - 이론: 비료를 사는 데 작은 고정비용 + 일부 농부는 (자신의 편향을 다 알지 못하는) 현재 편향 → 미루다 못 삼
   - 이론 함의: 수확 직후(돈이 있을 때) 작은 기한부 혜택이 큰 효과, 큰 보조금은 편향 없는 농부의 과다 사용을 부를 수 있음
   - 실험(추첨): 수확 직후 제안(쿠폰 미리 사기 + 무료 배달) → 비료 사용 약 10~14%p 증가(요약마다 9~10, 14)
   - 할인 없는 같은 제안을 나중(씨 뿌릴 때쯤)에 하면 효과 유의하지 않음
   - 수확 직후 제안의 효과 ≈ 나중의 50% 보조금(+14%p)
   - 기준 사용률·비료 수익률 수치는 확인 못 해 쓰지 않음
   - 뒤플로·크레머: 2019년 노벨 경제학상(바네르지와 공동) → 설명란
   막대: 수확 직후 12(≈10~14 가운데) · 나중 무료 배달 ≈0 · 나중 반값 14. */
Object.assign(EP, {no: 40, style: "v2", title: "비료와 넛지", hook: "남는 장사인 비료, 농부는 왜 안 살까?",
  bgm: {seed: 2350, bpm: 100, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2011, authors: "Esther Duflo, Michael Kremer & Jonathan Robinson",
          title: "Nudging Farmers to Use Fertilizer: Theory and Experimental Evidence from Kenya",
          ko: "농부가 비료를 쓰도록 넛지하기: 케냐의 이론과 실험 증거", cite: "101(6): 2350–2390", url: "https://doi.org/10.1257/aer.101.6.2350"},
  yt: {title: "남는 장사인 비료, 농부는 왜 안 살까? | 넛지 #경제 #shorts",
       desc: "아프리카 케냐 서부의 농부들은 비료를 적절히 쓰면 수확이 늘어 이득인데도, 많은 농부가 비료를 사지 않았다. 다음 철에는 쓰겠다고 마음은 먹지만, 막상 때가 되면 사지 않는 것이다. 수확 직후에는 손에 돈이 있지만, 비료가 필요한 씨 뿌릴 때쯤엔 그 돈을 이미 써 버린다. 이렇게 지금 당장 편한 쪽으로 미루는 마음을 현재 편향(Present Bias)이라고 한다. 그래서 연구진은 수확 직후에 찾아가 비료 쿠폰을 사 두게 하고, 필요할 때 무료로 배달해 줬다. 누구에게 이 제안을 할지는 추첨으로 정했다. 그 결과 비료를 쓴 농부의 비율이 약 10~14%포인트 늘었다. 그런데 똑같은 배달 제안을 씨 뿌릴 때쯤 하면 효과가 거의 없었다. 수확 직후의 작은 제안이 나중에 주는 반값 할인과 비슷한 효과를 낸 것이다. 큰 보조금보다 알맞은 때 슬쩍 밀어 주는 작은 장치, 즉 넛지(Nudge)가 더 싸고 효과적일 수 있다. 큰 보조금은 원래 잘 쓰던 농부까지 지나치게 쓰게 만들 수 있다는 점도 지적했다. 뒤플로·크레머 교수는 2019년 노벨 경제학상을 받았다.",
       tags: ["경제", "개발경제학", "넛지", "현재편향", "농업", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 옥수수밭 | 1080 달력과 돈 | 2160 쿠폰과 배달 | 3240 세 막대
let WID = 0;

function farmWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#3a8ad8"], [1, "#f0d89a"]]); lg("soil", [[0, "#8a5a32"], [1, "#3a2414"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("soil")}, g);
  w.sun = S("circle", {cx: 960, cy: 420, r: 70, fill: "#ffe39a"}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 170 + (i % 3) * 60, rx: 150, ry: 36, fill: "#fff", opacity: .6}, g));
  S("path", {d: `M0,860 ${Array.from({length: 25}, (_, i) => `Q${i * 180 + 90},${800 + (i % 3) * 20} ${i * 180 + 180},860`).join(" ")} L${WW},1000 L0,1000 Z`, fill: "#6a9a3a"}, g);
  // 0: 옥수수밭 + 농부 + 비료 자루
  w.corn = [100, 230, 360, 930, 1040].map((x, i) => img(w.layer, "ear_of_corn", x, 1000, 150));
  w.farmer = img(w.layer, "farmer", 560, 1000, 220);
  const sack = S("g", {}, g);
  S("path", {d: "M700,1000 L700,840 Q700,800 740,800 L820,800 Q860,800 860,840 L860,1000 Z", fill: "#e8e0c8", stroke: "#8a7a5a", "stroke-width": 5}, sack);
  ST(sack, 780, 920, "비료", {"font-size": 40, "font-weight": 900, fill: "#2e6a3a"});
  w.sack = sack; w.q = ST(g, 780, 760, "?", {"font-size": 110, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 10, opacity: 0});
  // 1080: 달력과 돈
  const tx0 = 1080 + 140, tx1 = 1080 + 940;
  S("line", {x1: tx0, y1: 760, x2: tx1, y2: 760, stroke: "#fff", "stroke-width": 8}, g);
  w.hv = ST(g, tx0 + 60, 830, "수확", {"font-size": 46, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 8});
  w.pl = ST(g, tx1 - 60, 830, "씨 뿌리기", {"font-size": 46, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 8});
  w.seed = img(w.layer, "seedling", tx1 - 60, 740, 110);
  w.cash = Array.from({length: 6}, (_, i) => img(w.layer, "coin", tx0 + 30 + (i % 3) * 60, 700 - Math.floor(i / 3) * 60, 80));
  w.spend = ST(g, 1080 + 540, 560, "", {"font-size": 46, "font-weight": 900, fill: CORAL, "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 8});
  // 2160: 쿠폰과 배달
  w.tick = img(w.layer, "ticket", 2160 + 300, 640, 220);
  w.tLab = ST(g, 2160 + 300, 420, "수확 직후 쿠폰", {"font-size": 46, "font-weight": 900, fill: GOLD, "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 8, opacity: 0});
  w.truck = img(w.layer, "delivery_truck", 2160 + 760, 960, 260);
  w.dLab = ST(g, 2160 + 760, 620, "필요할 때 무료 배달", {"font-size": 44, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 8, opacity: 0});
  w.die = img(w.layer, "game_die", 2160 + 540, 330, 130);
  // 3240: 세 막대 (비료 쓴 농부 증가, %p)
  w.bars = [["수확 직후 제안", 12, GOLD, 3240 + 220, "약 10~14%p"], ["같은 제안, 나중에", .6, "#c9cfe6", 3240 + 540, "거의 0"], ["나중에 반값 할인", 14, TEAL, 3240 + 860, "약 14%p"]].map(([t, v, col, x, lab]) => {
    const r = S("rect", {x: x - 100, y: 900, width: 200, height: 0, rx: 14, fill: col}, g);
    const tt = t.split(", ");
    const nm = tt.map((s, k) => ST(g, x, 950 + k * 42, s, {"font-size": 34, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 7}));
    const vl = ST(g, x, 0, "", {"font-size": 44, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 8});
    return {r, v, vl, lab}});
  w.bTitle = ST(g, 3240 + 540, 300, "비료를 쓴 농부 비율의 증가", {"font-size": 44, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2414", "stroke-width": 8, opacity: 0});
  // 앞쪽(흐린) 옥수수잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {for (let j = 0; j < 5; j++) S("path", {d: `M${x},0 Q${x - 120 + j * 60},90 ${x - 200 + j * 100},140`, stroke: "#2a5a1a", "stroke-width": 22, fill: "none", "stroke-linecap": "round"}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 12 * (1 + i % 3)) % WW));
    w.corn.forEach((e, i) => imgAt(e, [100, 230, 360, 930, 1040][i], 1000, 1, 4 * Math.sin(lt * 1.6 + i)));
    imgAt(w.farmer, 560, 1000 - 4 * Math.abs(Math.sin(lt * 2)), 1, 0); imgAt(w.seed, 1080 + 880, 740, 1 + .05 * Math.sin(lt * 3), 0)};
  w.ask = (lt, t0) => w.q.setAttribute("opacity", P(lt, t0, .3));
  w.money = (lt, t0) => {w.cash.forEach((c, i) => {const gone = lt > t0 + .6 + i * .45; imgAt(c, 1080 + 170 + (i % 3) * 60 + (gone ? 30 : 0), 700 - Math.floor(i / 3) * 60 + (gone ? -40 : 0), 1, 0); c.style.opacity = gone ? 0 : 1});
    w.spend.textContent = lt > t0 + 3.4 ? "씨 뿌릴 땐 돈이 없다" : (lt > t0 ? "수확 직후엔 돈이 있다" : "")};
  w.offer = (lt, t0, td, tr) => {const u = spr((lt - t0) / .5); imgAt(w.tick, 2160 + 300, 640, clamp(u, 0, 1.2), -8); w.tick.style.opacity = clamp(u * 2); w.tLab.setAttribute("opacity", P(lt, t0, .3));
    const v = ease((lt - td) / 1.4); imgAt(w.truck, 2160 + lerp(1100, 760, v) - 2160 + 2160, 960 - 4 * Math.abs(Math.sin(lt * 10)) * (v > 0 && v < 1 ? 1 : 0), 1, 0); w.truck.style.opacity = lt > td ? 1 : 0; w.dLab.setAttribute("opacity", P(lt, td + .8, .3));
    const ud = spr((lt - tr) / .5); imgAt(w.die, 2160 + 540, 330, clamp(ud, 0, 1.2), lt > tr && lt < tr + 1.5 ? lt * 300 : 0); w.die.style.opacity = clamp(ud * 2)};
  w.grow = (lt, ts) => {w.bTitle.setAttribute("opacity", P(lt, ts[0], .3));
    w.bars.forEach((b, j) => {const u = ease((lt - ts[j]) / .8), h = b.v * 36 * u; b.r.setAttribute("y", 900 - h); b.r.setAttribute("height", h);
      b.vl.setAttribute("y", 900 - h - 24); b.vl.textContent = u > .95 ? b.lab : ""})};
  w.ask(-99, 99); w.money(-99, 99); w.offer(-99, 99, 99, 99); w.grow(-99, [99, 99, 99]);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["남는 장사인 비료, 농부는 **왜 안 살까?**", "쓰면 남는 장사인 비료를, 농부들은 왜 사지 않을까요?", "pop"],
  ["2011년 **AER**에 실린 논문", "이천십일 년에 나온 논문입니다."],
  ["저자: 뒤플로_교수, 크레머_교수, 로빈슨_교수", "저자는, 뒤플로 교수, 크레머 교수, 그리고 로빈슨 교수입니다."]],
  build(el, hud) {
    const c = {w: farmWorld(el)};
    c.h = kin(hud, 120, "비료, **왜 안 살까?**", 92);
    c.j = kin(hud, 120, "**2011** · AER", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.ask(lt, .8);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 수수께끼 */
scene({id: "puzzle", lines: [
  ["케냐 서부 농부들: 비료를 **적절히 쓰면 수확이 늘어** 이득", "아프리카 케냐 서부의 농부들은, 비료를 적절히 쓰면 수확이 늘어 이득인데도,", "pop"],
  ["그런데 많은 농부가 **비료를 사지 않았다**", "많은 농부가 비료를 사지 않았습니다."],
  ["다음 철엔 쓰겠다고 **마음은 먹지만**, 막상 안 산다", "다음 철에는 쓰겠다고 마음은 먹지만, 막상 때가 되면 사지 않는 거죠."]],
  build(el, hud) {
    const c = {w: farmWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.02, 1.08, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.ask(99, 0);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 왜: 현재 편향 */
scene({id: "bias", lines: [
  ["수확 직후엔 돈이 있지만, 씨 뿌릴 때쯤엔 **이미 써 버린다**", "수확 직후에는 손에 돈이 있지만, 비료가 필요한 씨 뿌릴 때쯤엔, 그 돈을 이미 써 버리는 겁니다.", "whoosh@0.2"],
  ["지금 편한 쪽으로 미루는 마음 = **현재_편향**(Present Bias)", "이렇게 지금 당장 편한 쪽으로 미루는 마음을, 현재 편향이라고 부릅니다.", "ding"]],
  build(el, hud) {
    const c = {w: farmWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9)); w.money(lt, .9);
    c.o.up(lt, {mood: lt > 3.5 && lt < L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 실험 */
scene({id: "experiment", lines: [
  ["**수확 직후** 쿠폰을 사 두면, 필요할 때 **무료 배달**", "그래서 연구진은, 수확 직후에 찾아가서, 비료 쿠폰을 사 두게 하고, 필요할 때 무료로 배달해 줬습니다.", "pop"],
  ["누구에게 제안할지는 **추첨**으로 정했다", "누구에게 이 제안을 할지는, 추첨으로 정했죠."]],
  build(el, hud) {
    const c = {w: farmWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.money(99, 0); w.offer(lt, 1, 2.6, L[1] + .2);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 5. 결과 */
scene({id: "result", lines: [
  ["결과: 비료를 쓴 농부가 **약 10~14%p 늘었다**", "그 결과, 비료를 쓴 농부의 비율이, 약 십에서 십사 퍼센트포인트 늘었습니다.", "coin"],
  ["같은 배달 제안을 **씨 뿌릴 때쯤** 하면? 효과 **거의 없음**", "그런데 똑같은 배달 제안을, 씨 뿌릴 때쯤 하면, 효과가 거의 없었습니다."],
  ["수확 직후의 작은 제안 ≈ 나중의 **반값 할인**", "수확 직후의 작은 제안이, 나중에 주는 반값 할인과, 비슷한 효과를 낸 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: farmWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.offer(99, 0, 0, 0); w.grow(lt, [.9, L[1] + .3, L[2] + .3]);
    c.o.up(lt, {mood: lt > L[1] && lt < L[2] ? "surprised" : lt > L[2] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 6. 뜻 */
scene({id: "meaning", lines: [
  ["큰 보조금보다 알맞은 때의 작은 장치 = **넛지**(Nudge)", "큰 보조금보다, 알맞은 때 슬쩍 밀어 주는 작은 장치, 즉 넛지가, 더 싸고 효과적일 수 있다는 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: farmWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1.2)); w.grow(99, [0, 0, 0]);
    c.o.up(lt, {mood: "happy", look: [.7, -.5]});
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**농부가 비료를 쓰도록 넛지하기**〉", "논문 제목은, 농부가 비료를 쓰도록, 슬쩍 밀어 주기입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: farmWorld(el)};
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
