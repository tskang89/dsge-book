/* 오늘의 경제 022 — 자주 사고팔면 손해 (v3: 부엉이 진행자·한 공간 카메라 이동·거래 화살표·깎인 수익률 막대)
   논문: Barber, B. M. & Odean, T. (2001) "Boys Will Be Boys: Gender, Overconfidence, and Common Stock Investment",
         Quarterly Journal of Economics 116(1): 261–292. doi:10.1162/003355301556400
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — 초록(저자 페이지·RePEc)으로 확인):
   - 대형 할인 증권사 고객 35,000여 가구의 계좌 자료
   - 남성이 여성보다 45% 더 거래, 거래 때문에 순수익률이 남성 연 2.65%p, 여성 연 1.72%p 줄어듦
   - 미혼 남성은 미혼 여성보다 67% 더 거래
   - 해석: 과신 — 심리학 연구에서 남성이 금융 분야에서 더 과신한다는 결과를 근거로 성별을 과신의 대리 변수로 씀
   화살표: 여성 20개 vs 남성 29개(×1.45). 막대: 2.65 vs 1.72. */
Object.assign(EP, {no: 22, style: "v2", title: "자주 사고팔면 손해", hook: "주식, 자주 사고팔면 더 벌까?",
  bgm: {seed: 261, bpm: 104, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2001, authors: "Brad M. Barber & Terrance Odean",
          title: "Boys Will Be Boys: Gender, Overconfidence, and Common Stock Investment", ko: "역시 남자들이란: 성별, 과신, 그리고 주식 투자",
          cite: "116(1): 261–292", url: "https://doi.org/10.1162/003355301556400"},
  yt: {title: "주식, 자주 사고팔면 더 벌까? | 과신의 비용 #경제 #shorts",
       desc: "연구진은 미국 한 증권사 고객 3만 5천여 가구의 실제 거래 기록을 분석했다. 주식은 사고팔 때마다 수수료 같은 비용이 든다. 남성은 여성보다 45% 더 자주 사고팔았다. 그 결과 그냥 들고만 있었을 때와 비교해, 거래 때문에 줄어든 수익률이 남성은 한 해 2.65%p, 여성은 1.72%p였다(영상에서는 약 2.7%p·1.7%p로 반올림). 미혼 남녀만 비교하면 남성이 67% 더 자주 거래했다. 연구진은 그 이유를 과신(Overconfidence), 즉 자기 판단을 실제보다 더 믿는 것으로 봤다. 심리학 연구에서는 특히 남성이 이런 경향이 강하다고 알려져 있다. 자주 사고판다고 더 버는 게 아니라 비용만 쌓일 수 있다.",
       tags: ["경제", "행동재무학", "과신", "주식", "투자", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 휴대폰 시세판 | 1080 계좌들 | 2160 거래 횟수 | 3240 깎인 수익률
let WID = 0;

function tradeWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("bg", [[0, "#07131f"], [1, "#12283a"]]); lg("floor", [[0, "#1a2a38"], [1, "#0c1620"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("bg")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  // 배경 시세 띠 (흐르는 선)
  w.tick = S("path", {d: "", stroke: TEAL, "stroke-width": 4, fill: "none", opacity: .25}, g);
  for (let y = 200; y < 1000; y += 100) S("line", {x1: 0, y1: y, x2: WW, y2: y, stroke: "#fff", opacity: .04}, g);
  // 0: 휴대폰 + 오르내리는 선
  w.phone = img(w.layer, "mobile_phone", 540, 1000, 560);
  w.spark = S("path", {d: "", stroke: GOLD, "stroke-width": 8, fill: "none"}, g);
  // 1080: 계좌들(가구)
  w.acc = Array.from({length: 40}, (_, i) => img(w.layer, i % 2 ? "woman" : "man", 1080 + 150 + (i % 8) * 110, 520 + Math.floor(i / 8) * 110, 80));
  w.accLab = ST(g, 1080 + 540, 360, "증권사 고객 35,000여 가구", {"font-size": 50, "font-weight": 900, fill: "#fff", opacity: 0});
  // 2160: 거래 횟수 (화살표)
  w.rows = [["여성", 20, TEAL, 560], ["남성", 29, CORAL, 820]].map(([t, m, col, y]) => {
    img(w.layer, t === "여성" ? "woman" : "man", 2160 + 90, y + 50, 110);
    const arr = Array.from({length: m}, (_, i) => ST(g, 2160 + 180 + (i % 15) * 54, y - 20 + Math.floor(i / 15) * 70, i % 2 ? "↘" : "↗", {"font-size": 48, "font-weight": 900, fill: col, opacity: 0}));
    return {arr, m}});
  w.trLab = ST(g, 2160 + 540, 400, "", {"font-size": 52, "font-weight": 900, fill: GOLD});
  // 3240: 깎인 수익률 막대 (아래로)
  w.cut = [["여성", 1.72, TEAL, 3240 + 340], ["남성", 2.65, CORAL, 3240 + 740]].map(([t, v, col, x]) => {
    ST(g, x, 440, t, {"font-size": 50, "font-weight": 900, fill: col});
    const r = S("rect", {x: x - 110, y: 480, width: 220, height: 0, rx: 14, fill: col, opacity: .9}, g);
    const lab = ST(g, x, 0, "", {"font-size": 56, "font-weight": 900, fill: "#fff"});
    return {r, v, lab, x}});
  S("line", {x1: 3240 + 160, y1: 480, x2: 3240 + 920, y2: 480, stroke: "#fff", "stroke-width": 4}, g);
  w.base = ST(g, 3240 + 540, 1060, "그냥 들고만 있었을 때와 비교", {"font-size": 38, "font-weight": 800, fill: "#c9cfe6", opacity: 0});
  w.wings = img(w.layer, "money_wings", 3240 + 540, 380, 130);
  // 앞쪽(흐린) 전광판: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 230, y: 20, width: 460, height: 70, rx: 10, fill: "#02060c"}, fs);
    for (let k = 0; k < 6; k++) S("rect", {x: x - 210 + k * 72, y: 40, width: 50, height: 30, rx: 4, fill: k % 2 ? TEAL : CORAL, opacity: .6}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  const line = (x0, x1, y0, amp, t, nn) => Array.from({length: nn}, (_, i) => {const x = lerp(x0, x1, i / (nn - 1));
    return `${i ? "L" : "M"}${x},${y0 - amp * (Math.sin(i * .9 + t) * .6 + Math.sin(i * .37 + t * .7) * .4)}`}).join(" ");
  w.anim = lt => {w.tick.setAttribute("d", line(0, WW, 300, 60, lt * 2, 120)); w.spark.setAttribute("d", line(390, 690, 560, 60, lt * 3, 20))};
  w.accOn = (lt, t0) => {w.acc.forEach((a, i) => {const u = spr((lt - t0 - i * .03) / .4); a.style.opacity = clamp(u * 2);
    imgAt(a, 1080 + 150 + (i % 8) * 110, 520 + Math.floor(i / 8) * 110, clamp(u, 0, 1.2), 0)}); w.accLab.setAttribute("opacity", P(lt, t0 + .8, .3))};
  w.trades = (lt, t0, which) => w.rows.forEach((r, j) => {if (which.indexOf(j) < 0) return; const tt = t0 + which.indexOf(j) * .3;
    r.arr.forEach((a, i) => a.setAttribute("opacity", lt > tt + i * .04 ? 1 : 0))});
  w.cuts = (lt, t0) => w.cut.forEach((c, j) => {const u = ease((lt - t0 - j * .5) / .8), h = c.v * 160 * u;
    c.r.setAttribute("height", h); c.lab.setAttribute("y", 480 + h + 60); c.lab.textContent = u > .95 ? (c.v > 2 ? "약 −2.7%p" : "약 −1.7%p") : ""});
  w.accOn(-99, 0); w.trades(-99, 0, [0, 1]); w.cuts(-99, 0); w.wings.style.opacity = 0;
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["주식, 자주 사고팔면 **더 벌까?**", "주식을 자주 사고팔면, 더 벌 수 있을까요?", "pop"],
  ["2001년 **QJE**에 실린 논문", "이천일 년에 나온 논문입니다."],
  ["저자: 브래드 바버 교수와 테런스 오딘 교수", "저자는, 브래드 바버 교수와 테런스 오딘 교수입니다."]],
  build(el, hud) {
    const c = {w: tradeWorld(el)};
    c.h = kin(hud, 120, "자주 사고팔면 **더 벌까?**", 84);
    c.j = kin(hud, 120, "**2001** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    imgAt(w.phone, 540, 1000, 1, 3 * Math.sin(lt * 2));
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 자료와 비용 */
scene({id: "data", lines: [
  ["증권사 고객 **3만_5천여_가구**의 실제 거래 기록", "연구진은 미국 한 증권사 고객, 삼만 오천여 가구의 실제 거래 기록을 분석했습니다.", "pop"],
  ["사고팔 때마다 **수수료** 같은 비용이 든다", "주식은 사고팔 때마다, 수수료 같은 비용이 듭니다.", "coin"]],
  build(el, hud) {
    const c = {w: tradeWorld(el)};
    c.rc = img(hud, "receipt", 540, 700, 260);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9)); w.accOn(lt, .9);
    const tr = spr((lt - L[1] - .3) / .5); imgAt(c.rc, 540, 700, clamp(tr, 0, 1.2), -8 + 4 * Math.sin(lt * 3)); c.rc.style.opacity = clamp(tr * 2);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 결과 */
scene({id: "result", lines: [
  ["남성은 여성보다 **45% 더 자주** 사고팔았다", "그런데 남성은 여성보다, 사십오 퍼센트 더 자주 사고팔았습니다.", "whoosh@0.2"],
  ["그냥 들고 있을 때보다 줄어든 수익률: 남성 **연 약 2.7%p**, 여성 **약 1.7%p**", "그 결과, 그냥 들고만 있었을 때와 비교해, 거래 때문에 줄어든 수익률이 남성은 한 해 약 이 점 칠 퍼센트포인트, 여성은 약 일 점 칠 퍼센트포인트였죠.", "coin"],
  ["미혼끼리 비교하면 남성이 **67% 더** 자주 거래", "미혼 남녀만 비교하면, 남성이 육십칠 퍼센트 더 자주 거래했습니다."]],
  build(el, hud) {
    const c = {w: tradeWorld(el)};
    c.u = CX(hud, 1150, "화살표 1개 = 거래 (여성 20 : 남성 29 = 1 : 1.45)", "", {fontSize: "32px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? whip(lt, 0, 1080, 2160, .9) : whip(lt, L[1], 2160, 3240, .9));
    w.trades(lt, .9, [0, 1]); w.trLab.textContent = lt > 2.6 ? "남성 거래 = 여성의 1.45배" : ""; ap(c.u, lt, 1.2);
    w.cuts(lt, L[1] + 1); w.base.setAttribute("opacity", P(lt, L[1] + .6, .3));
    const tw = clamp((lt - L[1] - .5) / 2); w.wings.style.opacity = lt > L[1] + .5 ? 1 - tw : 0; imgAt(w.wings, 3240 + 540, 380 - 200 * tw, 1, 10 * Math.sin(lt * 6));
    c.o.up(lt, {mood: lt > L[1] + 1.5 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 해석: 과신 */
scene({id: "why", lines: [
  ["연구진의 해석: **과신**(Overconfidence)", "연구진은 그 이유를, 과신으로 봤습니다.", "pop"],
  ["과신 = 자기 판단을 실제보다 **더 믿는 것**", "과신이란, 자기 판단을 실제보다 더 믿는 것입니다."],
  ["심리학 연구: 특히 **남성**이 이런 경향이 강하다", "심리학 연구에서는, 특히 남성이 이런 경향이 강하다고 알려져 있죠."],
  ["자주 사고팔면 더 버는 게 아니라 **비용만_쌓일** 수 있다", "자주 사고판다고 더 버는 게 아니라, 비용만 쌓일 수 있다는 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: tradeWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.6)"});
    c.bulb = img(hud, "light_bulb", 540, 700, 280);
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.cuts(99, 0);
    c.dim.style.opacity = P(lt, 0, .4);
    const tb = spr((lt - .4) / .5); imgAt(c.bulb, 540, 700, clamp(tb, 0, 1.2) * (1 + .05 * Math.sin(lt * 4)), 0); c.bulb.style.opacity = clamp(tb * 2);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**역시 남자들이란: 성별, 과신, 그리고 주식 투자**〉", "논문 제목은, 역시 남자들이란, 성별과 과신, 그리고 주식 투자입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: tradeWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1));
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
