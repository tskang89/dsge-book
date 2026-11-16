/* 오늘의 경제 021 — 최저임금과 일자리 (v3: 부엉이 진행자·한 공간 카메라 이동·두 주 지도·가게 점)
   논문: Card, D. & Krueger, A. B. (1994) "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey
         and Pennsylvania", American Economic Review 84(4): 772–793. (NBER WP 4509)
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — RePEc·NBER 초록으로 확인):
   - 1992년 4월 1일 뉴저지 최저임금 $4.25 → $5.05, 펜실베이니아는 그대로
   - 뉴저지·동부 펜실베이니아 패스트푸드점 410곳을 인상 전후 조사
   - 초록: 인상이 고용을 줄였다는 징후 없음. 임금을 올려야 했던 뉴저지 가게가 오히려 고용을 늘림
   - 반론: Neumark & Wascher 는 급여 기록으로 뉴저지 고용이 상대적으로 줄었다고 봄 → 영상 한 줄, 자세한 건 업로드 설명
   - 카드: 2021년 노벨 경제학상(자연 실험 연구)
   - 가게당 고용 수치(FTE)는 원문 표에서 확인 못 해 쓰지 않음 */
Object.assign(EP, {no: 21, style: "v2", title: "최저임금과 일자리", hook: "최저임금이 오르면 일자리가 줄까?",
  bgm: {seed: 241, bpm: 100, mood: "bright"},
  paper: {journal: "American Economic Review", year: 1994, authors: "David Card & Alan B. Krueger",
          title: "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania",
          ko: "최저임금과 고용: 뉴저지·펜실베이니아 패스트푸드 업계 사례", cite: "84(4): 772–793", url: "https://www.nber.org/papers/w4509"},
  yt: {title: "최저임금이 오르면 일자리가 줄까? | 뉴저지 패스트푸드 실험 #경제 #shorts",
       desc: "교과서대로라면 인건비가 오르면 고용은 줄어야 한다. 1992년 미국 뉴저지주가 최저임금을 4.25달러에서 5.05달러로 올렸고, 바로 옆 펜실베이니아주는 그대로였다. 제도가 바뀐 곳과 안 바뀐 비슷한 곳을 비교하는 것을 자연 실험(Natural Experiment)이라고 한다. 연구진은 두 주의 패스트푸드점 410곳을 인상 전과 후에 조사했다. 그 결과 최저임금 인상으로 뉴저지의 고용이 줄었다는 증거는 찾지 못했다. 오히려 임금을 올려야 했던 가게들이 고용을 늘리기도 했다. ※ 다른 자료(급여 기록)로 뉴저지 고용이 상대적으로 줄었다는 반대 결과를 낸 연구(Neumark & Wascher)도 있어, 논쟁은 지금도 이어지고 있다. 카드 교수는 2021년 노벨 경제학상을 받았다.",
       tags: ["경제", "최저임금", "노동경제학", "자연실험", "노벨경제학상", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 패스트푸드점 | 1080 두 주 지도 | 2160 가게 410곳 | 3240 결과
let WID = 0;

function burgerWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#5a2a1e"], [1, "#7a3a26"]]); lg("floor", [[0, "#d8c8a8"], [1, "#9a8a6a"]]);
  lg("nj", [[0, "#2f6a8a"], [1, "#1f4a66"]]); lg("pa", [[0, "#3a6a3a"], [1, "#264a26"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  for (let x = 0; x < WW; x += 80) S("rect", {x, y: 860, width: 40, height: 40, fill: x % 160 ? "#fff" : "#c23a2a", opacity: .5}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 120) for (let y = 1000; y < H; y += 120) if (((x + y) / 120) % 2) S("rect", {x, y, width: 120, height: 120, fill: "#000", opacity: .06}, g);
  // 0: 계산대
  S("rect", {x: 120, y: 700, width: 840, height: 300, rx: 16, fill: "#c23a2a"}, g);
  S("rect", {x: 100, y: 680, width: 880, height: 40, rx: 10, fill: "#e8e0d0"}, g);
  w.cook = img(w.layer, "cook", 540, 700, 300);
  w.food = [["hamburger", 260], ["french_fries", 820]].map(([k, x]) => img(w.layer, k, x, 690, 150));
  w.wageTag = ST(g, 540, 300, "", {"font-size": 90, "font-weight": 900, fill: GOLD});
  // 1080: 두 주 지도 (단순화)
  const mx = 1080;
  S("path", {d: `M${mx + 60},360 L${mx + 480},340 L${mx + 470},1000 L${mx + 80},990 Z`, fill: U("pa"), stroke: "#9ac89a", "stroke-width": 6}, g);
  S("path", {d: `M${mx + 600},330 L${mx + 860},380 L${mx + 1000},620 L${mx + 880},1000 L${mx + 620},960 Z`, fill: U("nj"), stroke: "#9ac8e8", "stroke-width": 6}, g);
  w.river = S("path", {d: `M${mx + 540},300 Q${mx + 500},520 ${mx + 560},700 T${mx + 540},1020`, stroke: "#5ab0ff", "stroke-width": 26, fill: "none", opacity: .8}, g);
  ST(g, mx + 270, 420, "펜실베이니아", {"font-size": 46, "font-weight": 900, fill: "#e8ffe8"});
  ST(g, mx + 800, 440, "뉴저지", {"font-size": 50, "font-weight": 900, fill: "#e8f4ff"});
  w.paW = ST(g, mx + 270, 650, "$4.25", {"font-size": 72, "font-weight": 900, fill: "#fff"});
  w.njW = ST(g, mx + 800, 650, "$4.25", {"font-size": 72, "font-weight": 900, fill: "#fff"});
  w.paS = ST(g, mx + 270, 740, "", {"font-size": 40, "font-weight": 800, fill: "#cfe"});
  w.njS = ST(g, mx + 800, 740, "", {"font-size": 40, "font-weight": 800, fill: GOLD});
  // 2160: 가게 410곳 (점)
  w.stores = Array.from({length: 410}, (_, i) => {const k = i < 205 ? 0 : 1, j = i % 205;
    return S("rect", {x: 2160 + (k ? 580 : 90) + (j % 15) * 27, y: 420 + Math.floor(j / 15) * 32, width: 20, height: 22, rx: 4, fill: k ? "#5ab0ff" : "#6fcf6f", opacity: 0}, g)});
  ST(g, 2160 + 290, 380, "펜실베이니아", {"font-size": 42, "font-weight": 900, fill: "#9ade9a"});
  ST(g, 2160 + 780, 380, "뉴저지", {"font-size": 42, "font-weight": 900, fill: "#9ac8ff"});
  w.storeLab = ST(g, 2160 + 540, 960, "", {"font-size": 52, "font-weight": 900, fill: "#fff"});
  // 3240: 결과 (직원 수 아이콘, 전·후)
  w.res = [0, 1].map(k => Array.from({length: 2}, (_, t) => {const x = 3240 + 270 + k * 540, y = 520 + t * 300;
    const ppl = Array.from({length: 5}, (_, i) => img(w.layer, "cook", x - 180 + i * 90, y + 90, 100));
    const lab = ST(g, x, y - 20, (k ? "뉴저지" : "펜실베이니아") + (t ? " · 인상 후" : " · 인상 전"), {"font-size": 36, "font-weight": 800, fill: "#fff", opacity: 0});
    return {ppl, lab}}));
  w.resNote = ST(g, 3240 + 540, 1120, "", {"font-size": 50, "font-weight": 900, fill: "#1f5a3a"});
  // 앞쪽(흐린) 메뉴판: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 240, y: 10, width: 480, height: 130, rx: 14, fill: "#1a1010"}, fs);
    for (let k = 0; k < 3; k++) S("rect", {x: x - 210, y: 36 + k * 34, width: 300 - k * 40, height: 14, rx: 7, fill: "#ffd98a", opacity: .6}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {imgAt(w.cook, 540, 700 - 6 * Math.abs(Math.sin(lt * 3)), 1, 0);
    w.river.setAttribute("stroke-dashoffset", -lt * 40); w.river.setAttribute("stroke-dasharray", "60 20")};
  w.raise = u => {u = clamp(u); w.njW.textContent = u > .5 ? "$5.05" : "$4.25"; w.njW.setAttribute("fill", u > .5 ? GOLD : "#fff");
    w.njS.textContent = u > .5 ? "1992년 4월 인상" : ""};
  w.paSame = on => w.paS.textContent = on ? "그대로" : "";
  w.storesOn = (lt, t0) => {w.stores.forEach((s, i) => s.setAttribute("opacity", lt > t0 + (i % 205) * .006 ? 1 : 0));
    w.storeLab.textContent = lt > t0 + 1.3 ? "패스트푸드점 410곳 · 인상 전후 조사" : ""};
  w.result = (lt, t0) => {w.res.forEach((col, k) => col.forEach((r, t) => {const tt = t0 + t * .8 + k * .3;
      r.lab.setAttribute("opacity", P(lt, tt, .3)); r.ppl.forEach((p, i) => {const u = spr((lt - tt - i * .06) / .4); p.style.opacity = clamp(u * 2);
        imgAt(p, 3240 + 270 + k * 540 - 180 + i * 90, 520 + t * 300 + 90, clamp(u, 0, 1.2), 0)})}));
    w.resNote.textContent = lt > t0 + 2 ? "뉴저지 고용이 줄었다는 증거 없음" : ""};
  w.raise(0); w.paSame(false); w.storesOn(-99, 0); w.result(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["최저임금이 오르면 **일자리가_줄까?**", "최저임금이 오르면, 일자리가 줄어들까요?", "pop"],
  ["1994년 **AER**에 실린 논문", "천구백구십사 년에 나온 논문입니다."],
  ["저자: 카드_교수와 크루거_교수 (카드는 2021년 노벨상)", "저자는, 카드 교수와 크루거 교수입니다. 카드는 이천이십일 년 노벨 경제학상을 받았죠."]],
  build(el, hud) {
    const c = {w: burgerWorld(el)};
    c.h = kin(hud, 120, "최저임금 ↑ = **일자리 ↓**?", 88);
    c.j = kin(hud, 120, "**1994** · AER", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: lerp(1.15, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    w.food.forEach((f, i) => imgAt(f, [260, 820][i], 690 - 8 * Math.abs(Math.sin(lt * 2 + i)), 1, 0));
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 교과서 예측과 자연 실험 */
scene({id: "setup", lines: [
  ["교과서 예측: 인건비가 오르면 **고용이 준다**", "교과서대로라면, 인건비가 오르면 고용은 줄어야 합니다.", "pop"],
  ["1992년 뉴저지: 최저임금 **$4.25 → $5.05**", "천구백구십이 년, 미국 뉴저지주가 최저임금을 사 달러 이십오 센트에서, 오 달러 오 센트로 올렸습니다.", "coin"],
  ["바로 옆 펜실베이니아는 **그대로**", "바로 옆 펜실베이니아주는 그대로였죠."],
  ["바뀐 곳 vs 안 바뀐 곳 비교 = **자연_실험**", "제도가 바뀐 곳과 안 바뀐 비슷한 곳을 비교하는 것을, 자연 실험이라고 합니다.", "ding"]],
  build(el, hud) {
    const c = {w: burgerWorld(el)};
    c.h = kin(hud, 110, "**자연 실험** (Natural Experiment)", 64);
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, L[1] - .2, 0, 1080, .9)); kinUp(c.h, lt, L[3] + .1);
    w.wageTag.textContent = lt < L[1] ? "인건비 ↑ → 고용 ↓?" : ""; w.wageTag.setAttribute("font-size", 64);
    w.raise((lt - L[1] - 2) / .4); w.paSame(lt > L[2] + .3);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 3. 조사와 결과 */
scene({id: "result", lines: [
  ["두 주의 패스트푸드점 **410곳**, 인상 전후 조사", "연구진은 두 주의 패스트푸드점 사백십 곳을, 인상 전과 후에 조사했습니다.", "pop"],
  ["결과: 뉴저지 고용이 줄었다는 **증거는 없었다**", "그 결과, 최저임금 인상으로 뉴저지의 고용이 줄었다는 증거는 찾지 못했습니다.", "ding"],
  ["임금을 올려야 했던 가게도 **고용을_늘렸다**", "오히려 임금을 올려야 했던 가게들이, 고용을 늘리기도 했죠."]],
  build(el, hud) {
    const c = {w: burgerWorld(el)};
    c.u = CX(hud, 1180, "직원 그림은 단순화 — 정확한 인원 아님", "", {fontSize: "32px", fontWeight: 700, color: "#2b2b2b", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? whip(lt, 0, 1080, 2160, .9) : whip(lt, L[1], 2160, 3240, .9));
    w.storesOn(lt, .9); w.result(lt, L[1] + .6); ap(c.u, lt, L[1] + 1);
    c.o.up(lt, {mood: lt > L[1] + 1 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 논쟁 + 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["다른 자료로 **반대 결과**를 낸 연구도 있어, 논쟁은 지금도", "다만 다른 자료로 반대 결과를 낸 연구도 있어, 논쟁은 지금도 이어지고 있습니다.", "pop"],
  ["논문 제목: 〈**최저임금과 고용**〉", "논문 제목은, 최저임금과 고용입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: burgerWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.sc = img(hud, "scale", 540, 620, 300);
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1040, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.wageTag.textContent = "";
    const ts = spr((lt - .4) / .5) * (1 - P(lt, L[1] - .3, .3)); imgAt(c.sc, 540, 620, clamp(ts, 0, 1.2), 10 * Math.sin(lt * 2)); c.sc.style.opacity = clamp(ts * 2);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, L[1], null, {s: .92}); ap(c.f, lt, L[2], null, {s: .7, back: true});
    c.o.up(lt, {mood: lt < L[1] ? "skeptical" : "happy", point: lt > L[2] ? .5 + .5 * Math.sin((lt - L[2]) * 6) : 0, look: [.5, -.6]});
  }
});
