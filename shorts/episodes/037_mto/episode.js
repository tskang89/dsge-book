/* 오늘의 경제 037 — 이사가 바꾼 아이들의 미래 (v3: 부엉이 진행자·한 공간 카메라 이동·두 동네·추첨·동전 기둥·나이 띠)
   논문: Chetty, R., Hendren, N. & Katz, L. F. (2016) "The Effects of Exposure to Better Neighborhoods on Children:
         New Evidence from the Moving to Opportunity Experiment", American Economic Review 106(4): 855–902. doi:10.1257/aer.20150572
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·요약본·검색 요약으로 확인):
   - MTO: 다섯 대도시 고빈곤 공공임대주택의 4,600가구를 추첨으로 나눔, 실험 바우처는 빈곤율 10% 미만 동네로 이사해야 사용
   - 초록: 앞선 연구는 어른·큰 아이의 소득·고용에 의미 있는 효과를 찾지 못함
   - 13살 전에 이사(실험 바우처 사용): 20대 중반 연 소득 $3,477(31%) 높음, 비교 집단 평균 $11,270
   - 13살 전 이사: 대학 진학 ↑, 한부모 비율 ↓ / 청소년기 이사: 약간 부정적(이사의 혼란 탓일 수 있음)
   - 세금 자료로 추적
   동전 기둥: 1개 = $1,000 (11.27 vs 14.75). */
Object.assign(EP, {no: 37, style: "v2", title: "이사가 바꾼 미래", hook: "어릴 때 사는 동네가 어른이 된 뒤 소득을 바꿀까?",
  bgm: {seed: 855, bpm: 98, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2016, authors: "Raj Chetty, Nathaniel Hendren & Lawrence F. Katz",
          title: "The Effects of Exposure to Better Neighborhoods on Children: New Evidence from the Moving to Opportunity Experiment",
          ko: "더 좋은 동네가 아이들에게 미치는 영향: 기회로의 이사 실험의 새 증거", cite: "106(4): 855–902", url: "https://doi.org/10.1257/aer.20150572"},
  yt: {title: "어릴 때 사는 동네가 소득을 바꿀까? | 기회로의 이사 실험 #경제 #shorts",
       desc: "좋은 동네에 사는 아이가 더 잘 되는 건 정말 동네 덕일까? 원래 형편이나 사정이 나은 집이 좋은 동네를 고른 것일 수도 있다. 그래서 1990년대 미국에서는 다섯 도시의 가난한 공공임대주택에 사는 4,600가구를 대상으로 실험을 했다(Moving to Opportunity). 추첨으로 나눠서 한쪽에만 집세를 보태 주는 주거 지원금을 줬고, 조건은 가난한 집이 10% 안 되는 동네로 이사하는 것이었다. 추첨으로 나눴으니 두 집단은 처음엔 비슷하고, 나중에 생긴 차이는 동네 덕으로 볼 수 있다. 그런데 앞선 연구에서는 어른과 큰 아이들의 소득이 거의 달라지지 않았다. 그래서 연구진은 13살 전에 이사한 어린아이들을 세금 기록으로 어른이 될 때까지 추적했다. 그 결과 20대 중반의 소득이 한 해 $3,477, 약 31% 더 높았다(추첨에서 떨어진 쪽 평균 $11,270). 대학에 더 많이 갔고, 혼자 아이를 키우는 경우도 줄었다. 반면 13살이 넘어 이사한 아이들은 효과가 없거나 오히려 약간 나빴다(이사로 생활이 흔들린 탓일 수 있다). 좋은 동네에서 얼마나 오래 자라느냐가 중요하다는 뜻이다.",
       tags: ["경제", "불평등", "기회", "이사", "체티", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 두 동네 | 1080 추첨 | 2160 동전 기둥 | 3240 나이 띠
let WID = 0;

function townWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#4a7ac8"], [1, "#bcd8f0"]]); lg("gray", [[0, "#5a5a68"], [1, "#3a3a46"]]); lg("lawn", [[0, "#5aa65a"], [1, "#2f6a3a"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("lawn")}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 160 + (i % 3) * 60, rx: 150, ry: 36, fill: "#fff", opacity: .6}, g));
  // 0: 두 동네
  S("rect", {x: 0, y: 380, width: 520, height: 620, fill: "#3a3a46", opacity: .25}, g);
  for (let i = 0; i < 3; i++) {const x = 40 + i * 160, h = 420 + (i % 2) * 120;
    S("rect", {x, y: 1000 - h, width: 140, height: h, fill: U("gray")}, g);
    for (let r0 = 0; r0 < 7; r0++) for (let c0 = 0; c0 < 3; c0++) S("rect", {x: x + 14 + c0 * 42, y: 1000 - h + 20 + r0 * 56, width: 28, height: 34, fill: "#8a8a6a", opacity: .5}, g)}
  w.l0 = ST(g, 260, 330, "가난한 동네", {"font-size": 46, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#2a2a34", "stroke-width": 8});
  w.house = img(w.layer, "houses", 800, 1000, 300);
  w.tree = img(w.layer, "house_with_garden", 920, 1010, 160);
  w.l1 = ST(g, 800, 600, "덜 가난한 동네", {"font-size": 46, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#2a4a2a", "stroke-width": 8});
  w.kid = img(w.layer, "boy", 300, 1080, 140);
  // 1080: 추첨
  w.die = img(w.layer, "game_die", 1080 + 540, 420, 170);
  w.grp = [["추첨 당첨", TEAL, 1080 + 300], ["추첨 탈락", "#c9cfe6", 1080 + 780]].map(([t, col, x]) => {
    const fam = [0, 1, 2].map(k => img(w.layer, "house", x - 90 + k * 90, 900, 110));
    const lab = ST(g, x, 980, t, {"font-size": 44, "font-weight": 900, fill: col, "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 8, opacity: 0});
    return {fam, lab, x}});
  w.tick = img(w.layer, "ticket", 1080 + 300, 700, 130);
  w.tLab = ST(g, 1080 + 300, 600, "주거 지원금", {"font-size": 40, "font-weight": 900, fill: GOLD, "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 8, opacity: 0});
  w.cond = ST(g, 1080 + 540, 260, "조건: 가난한 집 10% 미만 동네로", {"font-size": 44, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a3a", "stroke-width": 8, opacity: 0});
  // 2160: 동전 기둥 (1개 = $1,000)
  w.cols = [["추첨 탈락", 11.27, "#c9cfe6", 2160 + 330, "$11,270"], ["13살 전 이사", 14.75, GOLD, 2160 + 750, "$14,747"]].map(([t, v, col, x, lab]) => {
    const coins = Array.from({length: 15}, (_, i) => S("ellipse", {cx: x, cy: 920 - i * 40, rx: 100, ry: 24, fill: col, stroke: "#6a5520", "stroke-width": 4, opacity: 0}, g));
    ST(g, x, 990, t, {"font-size": 40, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 8});
    const val = ST(g, x, 0, "", {"font-size": 46, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 8});
    return {coins, v, val, lab, x}});
  w.plus = ST(g, 2160 + 540, 720, "+31%", {"font-size": 84, "font-weight": 900, fill: GOLD, "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 10, opacity: 0});
  w.cNote = ST(g, 2160 + 540, 1060, "20대 중반 한 해 소득 · 동전 1개 = 1,000달러", {"font-size": 32, "font-weight": 700, fill: "#fff", opacity: 0});
  // 3240: 나이 띠
  const ax0 = 3240 + 120, ax1 = 3240 + 960, cut = lerp(ax0, ax1, 13 / 18);
  w.band = [S("rect", {x: ax0, y: 560, width: cut - ax0, height: 120, rx: 18, fill: TEAL, opacity: 0}, g),
            S("rect", {x: cut, y: 560, width: ax1 - cut, height: 120, rx: 18, fill: CORAL, opacity: 0}, g)];
  w.bandL = [ST(g, (ax0 + cut) / 2, 635, "효과 큼 (+31%)", {"font-size": 44, "font-weight": 900, fill: "#10182a", opacity: 0}),
             ST(g, (cut + ax1) / 2, 635, "없거나 −", {"font-size": 40, "font-weight": 900, fill: "#10182a", opacity: 0})];
  [[0, "0살"], [13, "13살"], [18, "18살"]].forEach(([a, t]) => {const x = lerp(ax0, ax1, a / 18);
    S("line", {x1: x, y1: 700, x2: x, y2: 740, stroke: "#fff", "stroke-width": 5}, g); ST(g, x, 790, t, {"font-size": 42, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 8})});
  w.aLab = ST(g, 3240 + 540, 470, "이사한 나이", {"font-size": 52, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a1a", "stroke-width": 8, opacity: 0});
  // 앞쪽(흐린) 나뭇잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {for (let j = 0; j < 6; j++) S("ellipse", {cx: x - 160 + j * 70, cy: 40 + (j % 2) * 40, rx: 50, ry: 30, fill: "#2a4a1a", opacity: .9}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 12 * (1 + i % 3)) % WW))};
  w.move = (lt, t0) => {const u = ease((lt - t0) / 1.6); imgAt(w.kid, lerp(300, 760, u), 1080 - 30 * Math.abs(Math.sin(lt * 6)) * (u > 0 && u < 1 ? 1 : 0), 1, 0)};
  w.lottery = (lt, t0, tc) => {const ud = spr((lt - t0) / .5); imgAt(w.die, 1080 + 540, 420, clamp(ud, 0, 1.2), lt > t0 && lt < t0 + 2 ? lt * 300 : 0); w.die.style.opacity = clamp(ud * 2) * (1 - P(lt, tc + 2, .3));
    w.grp.forEach((gp, j) => {gp.lab.setAttribute("opacity", P(lt, t0 + 1, .3)); gp.fam.forEach((f, k) => {const u = spr((lt - t0 - .6 - k * .15 - j * .3) / .5);
      imgAt(f, gp.x - 90 + k * 90, 900, clamp(u, 0, 1.2), 0); f.style.opacity = clamp(u * 2)})});
    const ut = spr((lt - tc) / .5); imgAt(w.tick, 1080 + 300, 700, clamp(ut, 0, 1.2), -8); w.tick.style.opacity = clamp(ut * 2); w.tLab.setAttribute("opacity", P(lt, tc, .3));
    w.cond.setAttribute("opacity", P(lt, tc + 2, .3))};
  w.coinsOn = (lt, t0, tp) => {w.cols.forEach((c, j) => {const tt = t0 + j * 1.2, k = Math.round(c.v);
      c.coins.forEach((e, i) => e.setAttribute("opacity", i < k && lt > tt + i * .06 ? 1 : 0));
      c.val.setAttribute("y", 920 - k * 40 - 20); c.val.textContent = lt > tt + k * .06 ? c.lab : ""});
    w.plus.setAttribute("opacity", P(lt, tp, .3)); w.cNote.setAttribute("opacity", P(lt, t0, .3))};
  w.ages = (lt, t0, t1) => {w.aLab.setAttribute("opacity", P(lt, t0, .3)); w.band[0].setAttribute("opacity", P(lt, t0 + .3, .3)); w.bandL[0].setAttribute("opacity", P(lt, t0 + .5, .3));
    w.band[1].setAttribute("opacity", P(lt, t1, .3)); w.bandL[1].setAttribute("opacity", P(lt, t1 + .2, .3))};
  w.lottery(-99, 99, 99); w.coinsOn(-99, 99, 99); w.ages(-99, 99, 99); w.move(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["어릴 때 사는 **동네**가 소득을 바꿀까?", "어릴 때 사는 동네가, 어른이 된 뒤의 소득을 바꿀까요?", "pop"],
  ["2016년 **AER**에 실린 논문", "이천십육 년에 나온 논문입니다."],
  ["저자: 체티_교수, 헨드렌_교수, 카츠_교수", "저자는, 체티 교수, 헨드렌 교수, 그리고 카츠 교수입니다."]],
  build(el, hud) {
    const c = {w: townWorld(el)};
    c.h = kin(hud, 120, "사는 동네가 **소득**을?", 88);
    c.j = kin(hud, 120, "**2016** · AER", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.move(lt, L[1]);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 어려움 */
scene({id: "problem", lines: [
  ["좋은 동네 아이가 잘 되는 건 정말 **동네 덕**일까?", "좋은 동네에 사는 아이가 더 잘 되는 건, 정말 동네 덕일까요?", "pop"],
  ["원래 사정이 나은 집이 **좋은 동네를 고른** 것일 수도", "원래 형편이나 사정이 나은 집이, 좋은 동네를 고른 것일 수도 있죠."]],
  build(el, hud) {
    const c = {w: townWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.move(99, 0);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 실험 */
scene({id: "experiment", lines: [
  ["1990년대 미국: 대도시 다섯 곳 임대 아파트 **4,600가구**", "그래서 천구백구십 년대 미국에서는, 대도시 다섯 곳의 가난한 동네 임대 아파트에 사는, 사천육백 가구를 대상으로 실험을 했습니다.", "pop"],
  ["**추첨**으로 나눠 한쪽에만 주거 지원금", "추첨으로 나눠서, 한쪽에만, 집세를 보태 주는 주거 지원금을 줬습니다.", "whoosh@0.2"],
  ["조건: 가난한 집이 **10% 안 되는** 동네로 이사", "조건은, 가난한 집이 열 집 중 한 집도 안 되는 동네로, 이사하는 것이었죠."],
  ["추첨이니 두 집단은 원래 비슷 → 차이는 **옮겨 간 동네 때문**", "추첨으로 나눴으니, 두 집단은 처음엔 비슷합니다. 나중에 생긴 차이는, 새로 옮겨 간 동네 때문이라고 볼 수 있죠.", "ding"]],
  build(el, hud) {
    const c = {w: townWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9)); w.move(99, 0); w.lottery(lt, L[1] + .2, L[1] + 1.8);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 4. 앞선 연구와 새 추적 */
scene({id: "track", lines: [
  ["앞선 연구: 어른과 큰 아이의 **소득은 거의 그대로**", "그런데 앞선 연구에서는, 어른과 큰 아이들의 소득이, 거의 달라지지 않았습니다.", "pop"],
  ["**13살 전** 이사한 아이를 어른이 될 때까지 추적", "그래서 연구진은, 열세 살 전에 이사한 어린아이들을, 세금 기록으로 어른이 될 때까지 추적했습니다.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: townWorld(el)};
    c.kid = img(hud, "boy", 300, 760, 180); c.man = img(hud, "man", 780, 800, 260);
    c.arr = CX(hud, 600, "→  약 20년  →", "", {fontSize: "56px", fontWeight: 900, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,.45)"});
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "rgba(8,12,22,.45)"});
    c.dim.parentNode.insertBefore(c.dim, c.dim.parentNode.firstChild);
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.lottery(99, 0, 0); c.dim.style.opacity = P(lt, L[1], .3);
    const uk = spr((lt - L[1] - .3) / .5), um = spr((lt - L[1] - 1.4) / .5);
    imgAt(c.kid, 300, 760, clamp(uk, 0, 1.2), 0); c.kid.style.opacity = clamp(uk * 2); ap(c.arr, lt, L[1] + .8);
    imgAt(c.man, 780, 800, clamp(um, 0, 1.2), 0); c.man.style.opacity = clamp(um * 2);
    c.o.up(lt, {mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 5. 결과 */
scene({id: "result", lines: [
  ["20대 중반 소득: 한 해 **$3,477 더** (약 **31%**)", "그 결과, 이십 대 중반의 한 해 소득이, 삼천사백칠십칠 달러가, 더 많았습니다. 약 삼십일 퍼센트 높은 겁니다.", "coin"],
  ["비교: 추첨에서 떨어진 쪽 평균 **$11,270**", "추첨에서 떨어진 쪽의 평균이, 만 천이백칠십 달러였으니까요."],
  ["대학 진학 ↑, 혼자 아이를 키우는 경우 ↓", "대학에 더 많이 갔고, 혼자 아이를 키우는 경우도 줄었습니다."]],
  build(el, hud) {
    const c = {w: townWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.coinsOn(lt, .9, 3.4);
    c.o.up(lt, {mood: lt > 3.4 && lt < L[1] ? "surprised" : lt > L[2] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 6. 나이가 중요하다 */
scene({id: "age", lines: [
  ["13살 넘어 이사한 아이: 효과 **없거나 약간 나쁨**", "반면 열세 살이 넘어서 이사를 간 아이들은, 효과가 없거나 오히려 약간 나빴습니다.", "pop"],
  ["좋은 동네에서 **얼마나 오래** 자라느냐가 중요하다", "좋은 동네에서 얼마나 오래 자라느냐가, 중요하다는 뜻입니다.", "ding"]],
  build(el, hud) {
    const c = {w: townWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.coinsOn(99, 0, 0); w.ages(lt, .9, 2);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "skeptical", look: [.7, -.6]});
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**더 좋은 동네가 아이들에게 미치는 영향**〉", "논문 제목은, 더 좋은 동네에서 크는 것이, 아이들에게 미치는 영향입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: townWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.ages(99, 0, 0); w.move(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
