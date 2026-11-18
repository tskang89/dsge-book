/* 오늘의 경제 042 — 내일 더 저축하기 (v3: 부엉이 진행자·한 공간 카메라 이동·사무실·세 가지 약점·월급 계단·100칸 격자와 저축률 막대)
   논문: Thaler, R. H. & Benartzi, S. (2004) "Save More Tomorrow™: Using Behavioral Economics to Increase Employee Saving",
         Journal of Political Economy 112(S1): S164–S187. doi:10.1086/380085
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·작업 논문 초록·미국 노동부 CLEAR 요약으로 확인):
   - 미래의 월급 인상분 일부를 미리 저축하기로 약속하는 프로그램(SMarT), 인상 때마다 3%p
   - 첫 시행(익명의 제조 회사): 제안받은 사람의 78% 가입, 가입자의 80%가 네 번째 인상까지 유지,
     평균 저축률 3.5% → 13.6%(40개월)
   - 대상: 재무 상담사가 권한 즉시 인상을 받아들이지 않은 직원들에게 제안(작업 논문 설계 설명)
   - 설계 원리(논문): 현재 편향(지금보다 나중이 쉬움), 손실 회피(실수령액이 줄지 않게), 관성(그대로 두면 계속), 언제든 탈퇴 가능
   - 세일러: 2017년 노벨 경제학상
   월급 계단은 예시(인상 4% 가정): 실수령액이 줄지 않는 것만 보이려는 그림. */
Object.assign(EP, {no: 42, style: "v2", title: "내일 더 저축하기", hook: "저축 싫다던 사람들이 저축률을 4배 가까이 올렸다?",
  bgm: {seed: 164, bpm: 102, mood: "bright"},
  paper: {journal: "Journal of Political Economy", year: 2004, authors: "Richard H. Thaler & Shlomo Benartzi",
          title: "Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving", ko: "내일 더 저축하기: 행동경제학으로 직원의 저축 늘리기",
          cite: "112(S1): S164–S187", url: "https://doi.org/10.1086/380085"},
  yt: {title: "저축 싫다던 사람들이 저축률을 4배로? | 내일 더 저축하기 #경제 #shorts",
       desc: "미국의 많은 직장인은 노후를 위한 저축이 부족하다. 알면서도 못 늘리는 이유는 셋. 지금 쓸 돈이 줄어드는 게 싫고, 통장에 들어오는 월급이 줄면 손해를 보는 것 같고, 한번 정한 건 그냥 그대로 두는 습관 때문이다. 그래서 두 교수는 '내일 더 저축하기(Save More Tomorrow)'를 설계했다. 지금 당장이 아니라 다음 월급이 오를 때부터 저축률을 올리기로 미리 약속하는 것. 월급이 오를 때마다 저축률이 3%포인트씩 자동으로 올라간다. 오른 월급에서 떼니 통장에 찍히는 돈은 줄지 않고, 언제든 그만둘 수도 있었다. 한 회사에서 당장 저축을 늘리라는 상담을 거절한 직원들에게 이 방법을 제안했더니, 78%가 가입했고 그중 80%가 네 번째 월급 인상 때까지 그대로 남았다. 평균 저축률은 40개월 만에 3.5%에서 13.6%로 올랐다. 사람의 약점을 거스르지 않고 오히려 이용한 설계다. 세일러 교수는 2017년 노벨 경제학상을 받았다. (월급 계단은 인상 4%를 가정한 예시다.)",
       tags: ["경제", "행동경제학", "저축", "넛지", "세일러", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 사무실 | 1080 세 가지 약점 | 2160 월급 계단 | 3240 결과
let WID = 0;

function officeWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1e3a5a"], [1, "#2a4a6a"]]); lg("floor", [[0, "#3a3a4a"], [1, "#1a1a24"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 120; x < WW; x += 540) {S("rect", {x, y: 150, width: 300, height: 260, rx: 10, fill: "#8ac8f0", opacity: .25}, g); S("line", {x1: x + 150, y1: 150, x2: x + 150, y2: 410, stroke: "#1e3a5a", "stroke-width": 8, opacity: .5}, g)}
  // 0: 사무실
  S("rect", {x: 160, y: 820, width: 760, height: 40, rx: 8, fill: "#8a6a4a"}, g);
  w.workers = [["man_office_worker", 300], ["woman_office_worker", 540], ["office_worker", 780]].map(([k, x]) => img(w.layer, k, x, 830, 200));
  w.bag = img(w.layer, "money_bag", 540, 620, 150);
  w.bagLab = ST(g, 540, 470, "노후 저축", {"font-size": 50, "font-weight": 900, fill: "#fff", opacity: 0});
  // 1080: 세 가지 약점
  w.why = [["alarm_clock", "지금 쓸 돈 ↓ 싫다", 1080 + 190], ["chart_decreasing", "월급이 줄면 손해 같다", 1080 + 540], ["sleeping", "그대로 두는 습관", 1080 + 890]].map(([ic, t, x]) => {
    const im = img(w.layer, ic, x, 700, 200); im.style.opacity = 0;
    const lab = ST(g, x, 790, t, {"font-size": 36, "font-weight": 900, fill: "#fff", opacity: 0}); return {im, lab, x}});
  // 2160: 월급 계단 (예시, 인상 4%)
  const base = 920, k = 4.2, xs = [0, 1, 2, 3, 4].map(i => 2160 + 160 + i * 190);
  w.steps = xs.map((x, i) => {const pay = 100 * Math.pow(1.04, i), sv = Math.min(3.5 + 3 * i, 13.6);
    const hp = pay * k, hs = pay * sv / 100 * k;   // 실제 비율 그대로(회색 = 실수령액이 계단마다 늘어남)
    const take = S("rect", {x: x - 70, y: base - hp, width: 140, height: hp - hs, rx: 8, fill: "#c9cfe6", opacity: 0}, g);
    const save = S("rect", {x: x - 70, y: base - hs, width: 140, height: hs, rx: 8, fill: GOLD, opacity: 0}, g);
    const lab = ST(g, x, base + 50, i ? `인상 ${i}` : "지금", {"font-size": 32, "font-weight": 900, fill: "#fff", opacity: 0});
    const sl = ST(g, x, base - hp - 18, `저축 ${sv.toFixed(1)}%`, {"font-size": 30, "font-weight": 900, fill: GOLD, opacity: 0});
    return {take, save, lab, sl}});
  w.stT = ST(g, 2160 + 540, 300, "월급이 오를 때마다 저축 +3%p", {"font-size": 46, "font-weight": 900, fill: GOLD, opacity: 0});
  w.stN = ST(g, 2160 + 540, 1010, "예시: 인상 4% 가정 · 노란 칸 = 저축 · 회색 = 통장에 찍히는 돈", {"font-size": 26, "font-weight": 700, fill: "#c9cfe6", opacity: 0});
  // 3240: 결과 (100칸 + 저축률 막대)
  w.cells = Array.from({length: 100}, (_, i) => S("rect", {x: 3240 + 120 + (i % 10) * 44, y: 380 + Math.floor(i / 10) * 44, width: 36, height: 36, rx: 6, fill: "#4a5a6a", opacity: 0}, g));
  w.cLab = ST(g, 3240 + 340, 340, "", {"font-size": 40, "font-weight": 900, fill: GOLD});
  w.rb = [[3.5, "#c9cfe6", 3240 + 720, "처음"], [13.6, GOLD, 3240 + 900, "40개월 뒤"]].map(([v, col, x, t]) => {
    const r = S("rect", {x: x - 60, y: 900, width: 120, height: 0, rx: 10, fill: col}, g);
    ST(g, x, 950, t, {"font-size": 32, "font-weight": 900, fill: "#fff"});
    const vl = ST(g, x, 0, "", {"font-size": 42, "font-weight": 900, fill: "#fff"}); return {r, v, vl}});
  w.rT = ST(g, 3240 + 810, 340, "평균 저축률", {"font-size": 40, "font-weight": 900, fill: "#fff", opacity: 0});
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#e8f1ff", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.workers.forEach((e, i) => imgAt(e, [300, 540, 780][i], 830 - 4 * Math.abs(Math.sin(lt * 2 + i)), 1, 0))};
  w.lack = (lt, t0) => {w.bagLab.setAttribute("opacity", P(lt, t0, .3)); imgAt(w.bag, 540, 620, lt > t0 ? .6 + .1 * Math.sin(lt * 3) : 1, 0)};
  w.weak = (lt, ts) => w.why.forEach((wy, i) => {const u = spr((lt - ts[i]) / .5); imgAt(wy.im, wy.x, 700, clamp(u, 0, 1.2), 0); wy.im.style.opacity = clamp(u * 2); wy.lab.setAttribute("opacity", P(lt, ts[i], .3))});
  w.stairs = (lt, t0) => {w.stT.setAttribute("opacity", P(lt, t0, .3)); w.stN.setAttribute("opacity", P(lt, t0, .3));
    w.steps.forEach((s, i) => {const on = P(lt, t0 + .3 + i * .5, .3); [s.take, s.save, s.lab, s.sl].forEach(e => e.setAttribute("opacity", on))})};
  w.result = (lt, t0, tr) => {w.cells.forEach((c, i) => {c.setAttribute("opacity", lt > t0 + i * .008 ? 1 : 0); c.setAttribute("fill", lt > t0 + 1 && i < 78 ? (i < 62 ? GOLD : "#b8963a") : "#4a5a6a")});
    w.cLab.textContent = lt > t0 + 1.2 ? "100명 중 78명 가입" : "";
    w.rT.setAttribute("opacity", P(lt, tr, .3));
    w.rb.forEach((b, j) => {const u = ease((lt - tr - j * .6) / .8), h = b.v * 36 * u; b.r.setAttribute("y", 900 - h); b.r.setAttribute("height", h);
      b.vl.setAttribute("y", 900 - h - 20); b.vl.textContent = u > .95 ? `${b.v}%` : ""})};
  w.lack(-99, 99); w.weak(-99, [99, 99, 99]); w.stairs(-99, 99); w.result(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["저축 싫다던 사람들이 저축률을 **4배 가까이**?", "저축을 늘리기 싫다던 사람들이, 저축률을 네 배 가까이 올렸다면요?", "pop"],
  ["2004년 **JPE**에 실린 논문", "이천사 년에 나온 논문입니다."],
  ["저자: 세일러_교수(2017 노벨상)와 베나치_교수", "저자는, 이천십칠 년 노벨 경제학상을 받은 세일러 교수, 그리고 베나치 교수입니다."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.h = kin(hud, 120, "저축률 **4배 가까이**?", 92);
    c.j = kin(hud, 120, "**2004** · JPE", 96);
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

/* 2. 문제: 세 가지 약점 */
scene({id: "problem", lines: [
  ["많은 직장인이 **노후 저축이 부족**하다", "미국의 많은 직장인은, 노후를 위한 저축이 부족합니다.", "pop"],
  ["이유 ①: **지금** 쓸 돈이 줄어드는 게 싫다", "알면서도 못 늘리는 첫째 이유는, 지금 쓸 돈이 줄어드는 게 싫어서죠."],
  ["이유 ②: 통장에 찍히는 월급이 **줄면 손해** 같다", "둘째, 통장에 들어오는 월급이 줄어들면, 손해를 보는 것 같아서입니다."],
  ["이유 ③: 한번 정한 건 **그대로 두는** 습관", "셋째, 한번 정한 건, 그냥 그대로 두는 습관 때문이고요."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.lack(lt, .5); w.pan(lt < L[1] ? 0 : whip(lt, L[1], 0, 1080, .9)); w.weak(lt, [L[1] + .6, L[2] + .2, L[3] + .2]);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 처방 */
scene({id: "design", lines: [
  ["처방: **내일 더 저축하기**(Save More Tomorrow)", "그래서 두 교수는, 내일 더 저축하기라는 방법을 설계했습니다.", "ding"],
  ["지금이 아니라 **다음 월급 인상 때부터** 올리기로 미리 약속", "지금 당장이 아니라, 다음 월급이 오를 때부터 저축률을 올리기로, 미리 약속하는 겁니다."],
  ["월급이 오를 때마다 저축률 **3%p씩** 자동으로", "그리고 월급이 오를 때마다, 저축률이 삼 퍼센트포인트씩, 자동으로 올라갑니다.", "coin"],
  ["오른 월급에서 떼니 **통장 돈은 줄지 않는다**", "오른 월급에서 떼니까, 통장에 찍히는 돈은 줄지 않죠. 언제든 그만둘 수도 있었습니다."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.weak(99, [0, 0, 0]); w.pan(lt < L[1] ? 1080 : whip(lt, L[1], 1080, 2160, .9)); w.stairs(lt, L[1] + .8);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 4. 실험과 결과 */
scene({id: "result", lines: [
  ["당장 늘리라는 **상담을 거절한** 직원들에게 제안", "한 회사에서, 당장 저축을 늘리라는 상담을 거절한 직원들에게, 이 방법을 제안했습니다.", "whoosh@0.2"],
  ["**78%** 가입, 그중 **80%**가 네 번째 인상까지 유지", "그 결과, 칠십팔 퍼센트가 가입했고, 그중 팔십 퍼센트가, 네 번째 월급 인상 때까지 그대로 남았습니다.", "coin"],
  ["평균 저축률: **3.5% → 13.6%** (40개월)", "평균 저축률은, 사십 개월 만에, 삼 점 오 퍼센트에서, 십삼 점 육 퍼센트로 올랐습니다.", "ding"]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.stairs(99, 0); w.pan(whip(lt, 0, 2160, 3240, .9)); w.result(lt, L[1] + .2, L[2] + .3);
    c.o.up(lt, {mood: lt > L[2] + 1 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 뜻 */
scene({id: "meaning", lines: [
  ["사람의 약점을 거스르지 않고 **오히려 이용한** 설계", "사람의 약점을 거스르지 않고, 오히려 이용한 설계였던 셈이죠.", "ding"]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1.2)); w.result(99, 0, 0);
    c.o.up(lt, {mood: "happy", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**내일 더 저축하기**〉", "논문 제목은, 내일 더 저축하기 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
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
