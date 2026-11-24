/* 오늘의 경제 047 — 일 잘하는 동료 효과 (v3: 부엉이 진행자·한 공간 카메라 이동·슈퍼마켓 계산대·속도 막대·시선 방향)
   논문: Mas, A. & Moretti, E. (2009) "Peers at Work", American Economic Review 99(1): 112–145. doi:10.1257/aer.99.1.112
   확인(2026-11-24, 원문 PDF·저자 사이트는 이 세션에서 막힘 — AER 초록(EconPapers·Princeton), NBER WP 12508·IZA DP 2292 초록으로 확인):
   - 대형 슈퍼마켓 체인 계산원의 생산성, 바코드 스캐너 기록으로 잰 고빈도 자료(초록)
   - 동료들의 평균 (고정) 생산성 10% 증가 → 그 계산원의 노력 1.7% 증가(작업 논문 초록; 출판본 수치는 확인 못 함 → 화면에 '작업 논문' 표시)
   - 효과의 대부분은 생산성이 낮은 계산원이 높은 계산원 곁에 있을 때(작업 논문 초록)
   - 한 계산원의 노력은 '그를 바라보는' 동료의 존재·속도와 관련 있고, '그가 바라보기만 하는'(그를 못 보는) 동료와는 관련 없다(초록)
   - 결론: 사회적 압력이 일터에 내재된 무임승차의 외부효과를 부분적으로 내부화한다(AER 초록)
   속도 막대·손님 줄은 개념 그림(실제 수치 아님). 매장 수·인원·기간은 확인 못 해 쓰지 않음. */
Object.assign(EP, {no: 47, style: "v2", title: "일 잘하는 동료 효과", hook: "일 잘하는 동료가 옆에 오면 나도 빨라질까?",
  bgm: {seed: 112, bpm: 106, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2009, authors: "Alexandre Mas & Enrico Moretti",
          title: "Peers at Work", ko: "일터의 동료들", cite: "99(1): 112–145", url: "https://doi.org/10.1257/aer.99.1.112"},
  yt: {title: "일 잘하는 동료가 오면 나도 빨라진다? 단, 조건이 있다 #경제 #shorts",
       desc: "연구진은 미국의 한 대형 슈퍼마켓 체인에서 계산원들의 일하는 속도를 살펴봤다. 물건을 찍을 때마다 남는 기록으로 계산원마다 얼마나 빠른지 알 수 있다. 같은 계산원이라도 날마다 함께 일하는 동료가 달라진다. 그래서 빠른 동료와 일한 날과 느린 동료와 일한 날의 속도를 같은 사람끼리 비교했다. 함께 일하는 동료들의 평균 실력이 10% 높으면 내 속도는 약 1.7% 빨라졌다(작업 논문 기준). 이 효과는 주로 원래 느린 계산원들에게서 나타났다. 그런데 계산대의 방향이 중요했다. 빠른 동료가 내 쪽을 바라보는 자리에 있으면 나도 빨라졌지만, 나만 빠른 동료를 바라보고 그 동료는 나를 볼 수 없는 자리면 변화가 없었다. 연구진은 빠른 동료에게서 배워서라기보다 그 동료의 눈을 의식한 사회적 압력 때문이라고 해석했다. 여럿이 함께 하는 일에서는 남에게 기대 덜 애쓰고 싶어진다(무임승차, free-riding). 내가 느리면 손님은 옆 줄로 가고 그 일은 동료 몫이 된다. 연구진은 동료의 눈이 이런 무임승차를 어느 정도 막아 준다고 결론지었다. (속도 막대와 손님 줄은 개념 그림이다.)",
       tags: ["경제", "노동경제학", "동료효과", "직장", "사회적압력", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 계산대 | 1080 계산원 넷 | 2160 시선 방향 | 3240 무임승차
let WID = 0;
const halo = {stroke: "#10182a", "stroke-width": 8, "paint-order": "stroke"};

function martWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1f3a4a"], [1, "#2c5266"]]); lg("floor", [[0, "#3a4250"], [1, "#151a22"]]); lg("cnt", [[0, "#e8eef5"], [1, "#9aa8b8"]]);
  lg("belt", [[0, "#2a2a30"], [1, "#151518"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1060, fill: U("wall")}, g);
  for (let x = 40; x < WW; x += 260) {S("rect", {x, y: 150, width: 200, height: 300, rx: 8, fill: "#0f2230", opacity: .5}, g);
    for (let k = 0; k < 4; k++) S("rect", {x: x + 10, y: 170 + k * 72, width: 180, height: 12, fill: "#5a7a8a", opacity: .6}, g);
    for (let k = 0; k < 12; k++) S("rect", {x: x + 14 + (k % 6) * 30, y: 140 + Math.floor(k / 6) * 72 + 74, width: 22, height: 26, rx: 4, fill: ["#e85d5d", "#f2c14e", "#6fcfb7", "#5ab0ff"][k % 4], opacity: .55}, g)}
  S("rect", {x: 0, y: 1060, width: WW, height: H - 1060, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 120) S("line", {x1: x, y1: 1060, x2: x, y2: H, stroke: "#000", "stroke-width": 2, opacity: .15}, g);
  // 0: 계산대 하나 + 스캔
  S("rect", {x: 120, y: 900, width: 820, height: 170, rx: 14, fill: U("cnt")}, g);
  S("rect", {x: 140, y: 880, width: 520, height: 34, rx: 10, fill: U("belt")}, g);
  w.laser = S("rect", {x: 680, y: 840, width: 10, height: 60, fill: RED, opacity: 0}, g);
  w.cashier = img(w.layer, "woman", 820, 900, 230);
  w.items = ["red_apple", "baguette_bread", "carrot", "cheese_wedge", "chocolate_bar"].map(k => img(w.layer, k, 0, 0, 90));
  w.scanT = ST(g, 540, 600, "", {"font-size": 56, "font-weight": 900, fill: GOLD, ...halo});
  w.scanL = ST(g, 540, 670, "물건을 찍을 때마다 남는 기록", {"font-size": 38, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  // 1080: 계산원 넷 + 속도 막대
  w.reg = [0, 1, 2, 3].map(i => {const x = 1080 + 160 + i * 253;
    S("rect", {x: x - 100, y: 920, width: 200, height: 140, rx: 12, fill: U("cnt")}, g);
    const im = img(w.layer, i === 3 ? "man" : ["woman", "person", "woman"][i], x, 930, 210);
    const bar = S("rect", {x: x - 36, y: 0, width: 72, height: 0, rx: 10, fill: i === 3 ? GOLD : TEAL}, g);
    return {x, im, bar, base: [150, 120, 135, 260][i]}});
  w.bolt = img(w.layer, "high_voltage", 1080 + 160 + 3 * 253, 640, 90); w.bolt.style.opacity = 0;
  w.barT = ST(g, 1080 + 540, 420, "계산 속도 (개념 그림)", {"font-size": 38, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  // 2160: 시선 방향 — 위: 동료가 나를 본다 / 아래: 나만 동료를 본다
  const X = 2160;
  w.cases = [[560, -1, "빠른 동료가 나를 본다"], [960, 1, "나만 빠른 동료를 본다"]].map(([y, dir, t]) => {
    S("rect", {x: X + 90, y: y - 170, width: 900, height: 320, rx: 22, fill: "#0b1420", opacity: .45}, g);
    const me = img(w.layer, "woman", X + 300, y + 100, 170), fast = img(w.layer, "man", X + 760, y + 100, 170);
    img(w.layer, "high_voltage", X + 830, y - 60, 70);
    ST(g, X + 300, y + 135, "나", {"font-size": 36, "font-weight": 900, fill: "#fff", ...halo});
    ST(g, X + 760, y + 135, "빠른 동료", {"font-size": 36, "font-weight": 900, fill: GOLD, ...halo});
    // 시선 부채꼴: dir -1 이면 동료 → 나, +1 이면 나 → 동료(동료는 반대쪽을 봄)
    const cone = dir < 0 ? S("path", {d: `M${X + 720},${y - 10} L${X + 360},${y - 90} L${X + 360},${y + 70} Z`, fill: GOLD, opacity: 0}, g)
                         : S("path", {d: `M${X + 340},${y - 10} L${X + 700},${y - 90} L${X + 700},${y + 70} Z`, fill: BLUE, opacity: 0}, g);
    const away = dir > 0 ? S("path", {d: `M${X + 800},${y - 10} L${X + 980},${y - 70} L${X + 980},${y + 50} Z`, fill: GOLD, opacity: 0}, g) : null;
    const eye = img(w.layer, "eyes", dir < 0 ? X + 700 : X + 330, y - 40, 70); eye.style.opacity = 0;
    const lab = ST(g, X + 540, y - 125, t, {"font-size": 38, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
    const res = ST(g, X + 540, y + 192, dir < 0 ? "→ 나도 빨라짐" : "→ 변화 없음", {"font-size": 40, "font-weight": 900, fill: dir < 0 ? TEAL : CORAL, opacity: 0, ...halo});
    const mb = S("rect", {x: X + 150, y: 0, width: 50, height: 0, rx: 8, fill: TEAL}, g);
    return {y, dir, me, cone, away, eye, lab, res, mb}});
  // 3240: 무임승차 — 느린 계산대 손님이 옆 줄로
  const Y = 3240;
  [Y + 280, Y + 800].forEach(x => S("rect", {x: x - 110, y: 900, width: 220, height: 160, rx: 12, fill: U("cnt")}, g));
  w.slow = img(w.layer, "person", Y + 280, 910, 180); w.snail = img(w.layer, "snail", Y + 280, 690, 90);
  w.co = img(w.layer, "woman", Y + 800, 910, 180);
  w.cust = Array.from({length: 4}, (_, i) => img(w.layer, "shopping_cart", 0, 0, 120));
  w.frT = ST(g, Y + 540, 520, "내 몫의 손님 → 동료에게", {"font-size": 42, "font-weight": 900, fill: CORAL, opacity: 0, ...halo});
  w.eye2 = img(w.layer, "eyes", Y + 680, 760, 110); w.eye2.style.opacity = 0;
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 220, y: 30, width: 440, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 200, y: 66, width: 400, height: 12, rx: 6, fill: "#e8f6ff", opacity: .85}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {imgAt(w.cashier, 820, 900 - 4 * Math.abs(Math.sin(lt * 3)), 1, 0)};
  w.scan = (lt, t0, tl) => {let cnt = 0;
    w.items.forEach((it, i) => {const v = ((lt - t0 - i * .55) % 2.75) / 2.75, on = lt > t0 + i * .55; it.style.opacity = on && v < .95 ? 1 : 0;
      imgAt(it, lerp(180, 760, Math.min(v * 1.3, 1)), 880, 1, 0); if (on) cnt += Math.floor((lt - t0 - i * .55) / 2.75 + (v > .55 ? 1 : 0))});
    const flash = w.items.some((it, i) => {const v = ((lt - t0 - i * .55) % 2.75) / 2.75; return lt > t0 + i * .55 && Math.abs(v * 1.3 - .87) < .05});
    w.laser.setAttribute("opacity", lt > t0 ? (flash ? 1 : .35) : 0);
    w.scanT.textContent = lt > t0 ? `찍은 물건 ${Math.max(0, Math.floor((lt - t0 - 1) / .55))}개` : ""; w.scanL.setAttribute("opacity", P(lt, tl, .3))};
  w.peers = (lt, t0, tf, tu) => {w.barT.setAttribute("opacity", P(lt, t0, .3));
    w.reg.forEach((r, i) => {const on = P(lt, t0 + i * .15, .3), fast = i === 3, inF = fast ? ease((lt - tf) / .8) : 1;
      const up = !fast ? 1 + .25 * ease((lt - tu - i * .2) / 1) * (i === 1 ? 1.4 : 1) : 1, h = r.base * up * on * (fast ? inF : 1);
      r.bar.setAttribute("y", 880 - h - 160); r.bar.setAttribute("height", h);
      imgAt(r.im, fast ? lerp(r.x + 500, r.x, inF) : r.x, 930 - 4 * Math.abs(Math.sin(lt * 3 + i)), 1, 0);
      if (fast) r.im.style.opacity = lt > tf - .2 ? 1 : 0});
    w.bolt.style.opacity = P(lt, tf + .6, .3)};
  w.sight = (lt, t0, t1) => w.cases.forEach((c, i) => {const s = i ? t1 : t0, on = P(lt, s, .3);
    c.lab.setAttribute("opacity", on); c.eye.style.opacity = P(lt, s + .3, .3);
    c.cone.setAttribute("opacity", .35 * P(lt, s + .3, .3)); if (c.away) c.away.setAttribute("opacity", .35 * P(lt, s + .3, .3));
    const h = 90 + (c.dir < 0 ? 90 * ease((lt - s - 1.2) / .8) : 0);
    c.mb.setAttribute("y", c.y + 110 - h * on); c.mb.setAttribute("height", h * on);
    c.res.setAttribute("opacity", P(lt, s + 1.6, .3))});
  w.free = (lt, t0, te) => {const u = ease((lt - t0) / 1.6), back = ease((lt - te - .4) / 1.4), k = u * (1 - back);
    w.cust.forEach((c, i) => {const x0 = 3240 + 280 + (i - 1.5) * 0, xs = lerp(3240 + 280, 3240 + 800, k);
      imgAt(c, (i % 2 ? 3240 + 800 : xs), 1200 + (i < 2 ? 0 : 0) , 1, 0); c.style.opacity = lt > t0 - .3 ? 1 : 0;
      imgAt(c, i < 2 ? lerp(3240 + 300 + i * 120, 3240 + 740 + i * 120, k) : 3240 + 740 + (i - 2) * 120, 1200, 1, 0)});
    w.frT.setAttribute("opacity", lt > te ? 1 - P(lt, te, .3) : P(lt, t0, .3));
    w.eye2.style.opacity = P(lt, te, .3); imgAt(w.eye2, 3240 + 680, 760, 1 + .08 * Math.sin(lt * 5), 0);
    w.snail.style.opacity = 1 - P(lt, te + .4, .3);
    imgAt(w.slow, 3240 + 280, 910 - (lt > te + .4 ? 6 * Math.abs(Math.sin(lt * 9)) : 0), 1, 0)};
  w.scan(-99, 99, 99); w.peers(-99, 99, 99, 99); w.sight(-99, 99, 99); w.free(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["일 잘하는 동료가 오면 **나도 빨라질까?**", "일 잘하는 동료가 옆에 오면, 나도 빨라질까요?", "pop"],
  ["2009년 **AER**에 실린 논문", "이천구 년에 나온 논문입니다."],
  ["저자: 마스_교수와 모레티_교수", "이 논문은, 마스 교수, 그리고 모레티 교수, 두 사람이 썼습니다."]],
  build(el, hud) {
    const c = {w: martWorld(el)};
    c.h = kin(hud, 120, "빠른 동료 = **나도 빨라짐**?", 88);
    c.j = kin(hud, 120, "**2009** · AER", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.peers(lt, .4, 1.4, 2.4);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 자료와 비교 */
scene({id: "setup", lines: [
  ["미국 대형 **슈퍼마켓 체인**의 계산원들", "연구진은, 미국의 한 대형 슈퍼마켓 체인에서, 계산원들의 일하는 속도를 살펴봤습니다.", "whoosh@0.1"],
  ["물건을 찍을 때마다 남는 **기록**으로 속도를 안다", "물건을 찍을 때마다 남는 기록으로, 계산원마다 얼마나 빠른지 알 수 있습니다."],
  ["같은 계산원이라도 날마다 **함께 일하는 동료**가 달라진다", "같은 계산원이라도, 날마다 함께 일하는 동료가 달라집니다."],
  ["같은 사람의 **빠른 동료와 일한 날** vs **느린 동료와 일한 날**", "그래서 빠른 동료와 일한 날과, 느린 동료와 일한 날의 속도를, 같은 사람끼리 비교했습니다."]],
  build(el, hud) {
    const c = {w: martWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.pan(lt < L[2] ? whip(lt, 0, 1080, 0, .9) : whip(lt, L[2], 0, 1080, .9)); w.scan(lt, .9, L[1] + .2);
    w.peers(lt, L[2] + .6, L[3] + .3, 99);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 3. 결과 */
scene({id: "result", lines: [
  ["동료 평균 실력 **10%↑** → 내 속도 **약 1.7%↑** (작업 논문)", "함께 일하는 동료들의 평균 실력이 십 퍼센트 높으면, 내 속도는 약 일 점 칠 퍼센트 빨라졌습니다.", "coin"],
  ["효과는 주로 원래 **느린 계산원**에게서", "이 효과는 주로, 원래 느린 계산원들에게서 나타났습니다."]],
  build(el, hud) {
    const c = {w: martWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: lerp(1.02, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.peers(lt, -9, -9, .3);
    c.o.up(lt, {mood: lt > L[0] + 1 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 반전: 방향 */
scene({id: "sight", lines: [
  ["그런데 계산대의 **방향**이 중요했다", "그런데 놀라운 건, 계산대의 방향이었습니다.", "pop"],
  ["빠른 동료가 **나를 볼 수 있는** 자리 → 나도 빨라짐", "빠른 동료가, 내 쪽을 바라보는 자리에 있으면, 나도 빨라졌습니다."],
  ["나만 빠른 동료를 **보는** 자리 → 변화 없음", "반대로, 나만 빠른 동료를 바라보고, 그 동료는 나를 볼 수 없는 자리면, 변화가 없었습니다."],
  ["해석: 배워서라기보다 **남의 눈**(사회적 압력)", "연구진은, 빠른 동료에게서 배워서라기보다, 그 동료의 눈을 의식한, 사회적 압력 때문이라고 해석했습니다.", "ding"]],
  build(el, hud) {
    const c = {w: martWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.peers(99, 0, 0, 0); w.pan(whip(lt, 0, 1080, 2160, .9)); w.sight(lt, L[1] + .2, L[2] + .2);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : (lt > L[2] ? "skeptical" : "normal"), look: [.7, -.6]});
  }
});

/* 5. 무임승차 */
scene({id: "free", lines: [
  ["**무임승차**(Free-riding): 남에게 기대고 싶어진다", "여럿이 함께 하는 일에서는, 남에게 기대 덜 애쓰고 싶어지죠. 이것을 무임승차라고 합니다.", "whoosh@0.1"],
  ["내가 느리면 손님은 **옆 줄**로, 그 일은 동료 몫", "계산대에서 내가 느리면, 손님은 옆 줄로 가고, 그 일은 동료 몫이 됩니다."],
  ["동료의 눈이 무임승차를 **어느 정도 막아 준다**", "연구진은, 동료의 눈이 이런 무임승차를, 어느 정도 막아 준다고 결론지었습니다.", "ding"]],
  build(el, hud) {
    const c = {w: martWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.sight(99, 0, 0); w.pan(whip(lt, 0, 2160, 3240, .9)); w.free(lt, L[1] + .3, L[2] + .3);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "skeptical", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**일터의 동료들**〉", "논문 제목은, 일터의 동료들입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: martWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.scan(lt, -3, 99);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
