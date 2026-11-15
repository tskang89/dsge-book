/* 오늘의 경제 007 — 외교관 주차위반과 부패 (v3: 부엉이 진행자·한 공간 카메라 이동·딱지 더미)
   논문: Fisman, R. & Miguel, E. (2007) "Corruption, Norms, and Legal Enforcement: Evidence from Diplomatic Parking Tickets",
         Journal of Political Economy 115(6): 1020–1048. doi:10.1086/527495 (NBER WP 12312 "Cultures of Corruption", 2006)
   확인(2026-11-14, 원문 PDF 는 이 세션 네트워크에서 막혀 초록·요약·보도로 확인):
   - 뉴욕 유엔 외교관, 면책권(면책특권)으로 2002년 11월 전에는 주차 단속 집행이 사실상 없었다(초록·요약)
   - 부패가 심한 나라 외교관일수록 안 낸 주차위반이 유의하게 많았다(초록: "strong effect of corruption norms")
   - 2002년 뉴욕시가 안 낸 딱지가 쌓인 외교 차량의 번호판을 압수할 권한을 얻자 안 낸 위반이 크게 줄었다(초록·요약) — 감소율 숫자는 확인 못 해 쓰지 않음
   - 1997~2002년 안 낸 딱지 약 15만 장, 벌금 약 1,800만 달러(연구를 인용한 Washington Diplomat 보도 — 2차 자료)
   - 쿠웨이트 외교관 1명당 안 낸 딱지 246장, 가장 많음(여러 2차 자료 일치)
   - 다른 나라별 숫자는 확인 못 해 쓰지 않음. 산점도는 경향만 보이는 개념도로 표시.
   딱지 더미: 쪽지 1장 = 딱지 10장(246 ≈ 24.6장). */
Object.assign(EP, {no: 7, style: "v2", title: "외교관 주차위반과 부패", hook: "외교관 주차위반으로 나라별 부패를 잰다?",
  bgm: {seed: 88, bpm: 98, mood: "tense"},
  paper: {journal: "Journal of Political Economy", year: 2007, authors: "Raymond Fisman & Edward Miguel",
          title: "Corruption, Norms, and Legal Enforcement: Evidence from Diplomatic Parking Tickets", ko: "부패, 규범, 그리고 법 집행: 외교관 주차위반 딱지의 증거",
          cite: "115(6): 1020–1048", url: "https://doi.org/10.1086/527495"},
  yt: {title: "외교관 주차위반 딱지로 나라별 부패를 쟀다 | 부패, 규범, 그리고 법 집행 #경제 #shorts",
       desc: "뉴욕의 유엔 외교관은 면책특권 때문에 주차위반 벌금을 안 내도 처벌받지 않았다. 1997~2002년 안 낸 딱지는 약 15만 장(보도 기준). 부패가 심한 나라에서 온 외교관일수록 안 낸 딱지가 많았고, 가장 많은 쿠웨이트는 외교관 1명당 246장이었다. 2002년 뉴욕시가 번호판을 압수하기 시작하자 안 낸 딱지가 크게 줄었다. 연구진은 부패에 문화(규범)와 처벌이 모두 중요하다고 해석한다. (산점도는 경향을 보이는 개념도)",
       tags: ["경제", "부패", "외교관", "면책특권", "제도", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 유엔 앞 | 1080 외교 차량 | 2160 전광판 | 3240 번호판 압수
let WID = 0;

function cityWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#0f1a3c"], [.6, "#3a3f7a"], [1, "#e0877a"]]); lg("road", [[0, "#3a3e4c"], [1, "#16181f"]]);
  lg("side", [[0, "#8a8fa0"], [1, "#5a5f70"]]); lg("un", [[0, "#7fb3d9"], [1, "#2f5a86"]], {x2: 1, y2: 0});
  lg("board", [[0, "#1c2442"], [1, "#121a33"]]); lg("slip", [[0, "#fff6c8"], [1, "#f2d77a"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("sky")}, g);
  // 스카이라인 + 불 켜진 창
  const r0 = rng(n * 11 + 5); w.win = [];
  let px = -30; while (px < WW) {const h = 160 + r0() * 360, wd = 110 + r0() * 130;
    S("rect", {x: px, y: 820 - h, width: wd, height: h + 80, fill: "#1a1f3d"}, g);
    for (let yy = 840 - h; yy < 860; yy += 46) for (let xx = px + 14; xx < px + wd - 20; xx += 34) if (r0() < .35)
      w.win.push({e: S("rect", {x: xx, y: yy, width: 16, height: 22, fill: "#ffd98a", opacity: .7}, g), k: r0() * 9});
    px += wd + 14}
  // 유엔 본부(0 구역)
  S("rect", {x: 600, y: 230, width: 260, height: 650, fill: U("un")}, g);
  for (let yy = 250; yy < 870; yy += 22) S("line", {x1: 600, y1: yy, x2: 860, y2: yy, stroke: "#1f3f66", "stroke-width": 3, opacity: .7}, g);
  ST(g, 730, 210, "UN", {"font-size": 56, "font-weight": 800, fill: "#cfe6ff"});
  w.liberty = img(w.layer, "statue_of_liberty", 960, 880, 220);
  // 보도·도로
  S("rect", {x: 0, y: 880, width: WW, height: 90, fill: U("side")}, g);
  S("rect", {x: 0, y: 965, width: WW, height: 14, fill: "#c9ccd6"}, g);
  S("rect", {x: 0, y: 979, width: WW, height: H - 979, fill: U("road")}, g);
  for (let x = 0; x < WW; x += 260) S("rect", {x, y: 1205, width: 150, height: 12, fill: GOLD, opacity: .7}, g);
  // 주차 금지 표지판
  [380, 1080 + 980, 3240 + 980].forEach(x => {S("rect", {x: x - 6, y: 640, width: 12, height: 250, fill: "#55596a"}, g);
    S("rect", {x: x - 70, y: 560, width: 140, height: 110, rx: 10, fill: "#fff", stroke: RED, "stroke-width": 8}, g);
    ST(g, x, 605, "NO", {"font-size": 36, "font-weight": 800, fill: RED}); ST(g, x, 650, "PARKING", {"font-size": 26, "font-weight": 800, fill: RED})});
  // 차들 + 번호판
  const car = (x, y, s) => img(w.layer, "automobile", x, y, s);
  w.car0 = car(330, 1080, 300);
  w.car1 = car(1080 + 540, 1120, 460);
  w.car3 = car(3240 + 420, 1120, 440);
  const gt = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer); // 차 아이콘 위 층
  const plate = (x, y, sc) => {const p = S("g", {transform: `translate(${x},${y}) scale(${sc})`}, gt);
    S("rect", {x: -70, y: -30, width: 140, height: 60, rx: 8, fill: "#fff", stroke: "#2f5a86", "stroke-width": 5}, p);
    ST(p, 0, 16, "DPL 07", {"font-size": 40, "font-weight": 800, fill: "#2f5a86"}); return p};
  w.plate1 = plate(1080 + 560, 1050, 1);
  w.shield = img(w.layer, "shield", 1080 + 830, 760, 200);
  // 딱지(쪽지) 날아와 붙기
  w.flyT = Array.from({length: 14}, () => {const e = S("g", {opacity: 0}, gt);
    S("rect", {x: -40, y: -26, width: 80, height: 52, rx: 4, fill: U("slip"), stroke: "#c9a64a", "stroke-width": 2}, e);
    S("rect", {x: -30, y: -14, width: 60, height: 6, fill: "#c9a64a"}, e); S("rect", {x: -30, y: 2, width: 40, height: 6, fill: "#c9a64a"}, e); return e});
  // 전광판(2160): 개념 산점도
  const bx = 2160 + 120, by = 300, bw = 840, bh = 560;
  S("rect", {x: bx, y: by, width: bw, height: bh, rx: 22, fill: U("board"), stroke: "#4a5a8a", "stroke-width": 6}, g);
  S("line", {x1: bx + 110, y1: by + bh - 90, x2: bx + bw - 50, y2: by + bh - 90, stroke: "#c9cfe6", "stroke-width": 5}, g);
  S("line", {x1: bx + 110, y1: by + bh - 90, x2: bx + 110, y2: by + 50, stroke: "#c9cfe6", "stroke-width": 5}, g);
  ST(g, bx + bw / 2 + 30, by + bh - 34, "고국의 부패 정도 →", {"font-size": 40, "font-weight": 800, fill: "#c9cfe6"});
  const yl = ST(g, 0, 0, "안 낸 딱지 →", {"font-size": 40, "font-weight": 800, fill: "#c9cfe6"}); yl.setAttribute("transform", `translate(${bx + 70},${by + 260}) rotate(-90)`);
  w.dots = Array.from({length: 26}, (_, i) => {const u = r0(), x = bx + 150 + u * (bw - 230), y = by + bh - 120 - (u * u * 330 + r0() * 70);
    return {e: S("circle", {cx: x, cy: y, r: 13, fill: u > .6 ? CORAL : TEAL, opacity: 0}, g), i}});
  w.concept = ST(g, bx + bw - 120, by + 50, "개념도", {"font-size": 34, "font-weight": 800, fill: "#fff", opacity: .8});
  // 딱지 더미(2160 아래): 쪽지 1장 = 10장
  w.worker = img(w.layer, "office_worker", 2160 + 360, 1240, 240);
  w.stack = Array.from({length: 25}, (_, i) => {const e = S("g", {opacity: 0}, g);
    S("rect", {x: 2160 + 560, y: 0, width: 220, height: 12, rx: 3, fill: U("slip"), stroke: "#c9a64a", "stroke-width": 2}, e); return e});
  // 압수 구역(3240)
  w.plate3 = plate(3240 + 440, 1050, 1);
  w.wrench = img(w.layer, "wrench", 3240 + 420, 1150, 150);
  w.siren = img(w.layer, "police_car_light", 3240 + 420, 860, 130);
  w.pile = Array.from({length: 20}, () => {const e = S("g", {opacity: 0}, g);
    S("rect", {x: 3240 + 700, y: 0, width: 200, height: 14, rx: 3, fill: U("slip"), stroke: "#c9a64a", "stroke-width": 2}, e); return e});
  // 앞쪽(흐린) 가로등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 340, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("path", {d: `M${x},0 L${x},40 Q${x},70 ${x + 60},70`, stroke: "#0b0e1a", "stroke-width": 14, fill: "none"}, fs);
    S("ellipse", {cx: x + 80, cy: 86, rx: 60, ry: 22, fill: "#fff3c4", opacity: .85}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => w.win.forEach(o => o.e.setAttribute("opacity", .45 + .35 * Math.abs(Math.sin(lt * .6 + o.k))));
  // 딱지가 차 유리에 붙음: cx 차 x, t0 시작, n 개
  w.fly = (lt, cx, t0, nShow) => w.flyT.forEach((e, i) => {const u = clamp((lt - t0 - i * .18) / .5);
    if (i >= nShow || u <= 0) {e.setAttribute("opacity", 0); return}
    const tx = cx - 150 + (i % 7) * 50, ty = 960 + Math.floor(i / 7) * 46 + (i % 2) * 10;
    const x = lerp(cx + 500, tx, ease(u)), y = lerp(500, ty, ease(u)) - 160 * Math.sin(Math.PI * u);
    e.setAttribute("opacity", 1); e.setAttribute("transform", `translate(${x},${y}) rotate(${lerp(40, (i % 3 - 1) * 8, u)})`)});
  w.scatter = (lt, t0) => w.dots.forEach(o => o.e.setAttribute("opacity", clamp((lt - t0 - o.i * .06) / .25)));
  w.stackN = (lt, n, t0) => w.stack.forEach((e, i) => {const u = clamp((lt - t0 - i * .07) / .3);
    e.setAttribute("opacity", i < n ? u : 0); e.setAttribute("transform", `translate(0,${1228 - i * 13 - (1 - eback(u)) * 200})`)});
  w.pileN = (lt, n) => w.pile.forEach((e, i) => {e.setAttribute("opacity", i < n ? 1 : 0); e.setAttribute("transform", `translate(0,${1228 - i * 15})`)});
  w.fly(-99, 0, 0, 0); w.scatter(-99, 0); w.stackN(-99, 0, 0); w.pileN(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
const pill = (hud, y, html, bg, fs) => CX(hud, y, `<span style="display:inline-block;background:${bg};color:#10182a;padding:8px 34px;border-radius:50px;box-shadow:0 10px 26px rgba(0,0,0,.4)">${html}</span>`, "", {fontSize: (fs || 60) + "px", fontWeight: 800});

/* 1. 질문 (유엔 앞) */
scene({id: "hook", lines: [
  ["외교관 **주차위반** 딱지로 부패를 잰다?", "외교관들의 주차위반 딱지로, 나라마다 부패가 얼마나 심한지 알 수 있을까요?", "pop"],
  ["2007년 **JPE**, 피스먼과 미겔의 논문", "이천칠 년, 경제학자 피스먼과 미겔의 논문입니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.h = kin(hud, 140, "주차 딱지로<br>**부패**를 잰다?", 96);
    c.j = kin(hud, 170, "**2007** · JPE", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 850, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    const tc = spr((lt - .2) / .6); imgAt(w.car0, 330 + (1 - clamp(tc)) * 400, 1080, clamp(tc, 0, 1.2), 0); w.car0.style.opacity = clamp(tc * 2);
    w.fly(lt, 330, .9, 3);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 면책특권과 딱지 더미 (외교 차량) */
scene({id: "immunity", lines: [
  ["외교관 **면책권**(Diplomatic Immunity)", "뉴욕 유엔 본부의 외교관들은, 외교관 면책권이 있어서 주차 벌금을 안 내도 처벌받지 않았습니다.", "pop"],
  ["벌을 안 받는다면, 누가 **규칙을 지킬까**?", "벌을 받지 않는다면, 누가 규칙을 지킬까요?"],
  ["1997~2002년 안_낸_딱지 **약_15만_장**", "천구백구십칠 년부터 이천이 년까지, 안 낸 딱지가 약 십오만 장이었습니다.", "coin"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.n = bigNum(hud, 170, "", GOLD, 140);
    c.sub = CX(hud, 340, "안 낸 주차위반 딱지 (보도 기준)", "", {fontSize: "44px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 900, s: lerp(1, 1.06, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    const ts = spr((lt - 1) / .5); imgAt(w.shield, 1080 + 830, 760, clamp(ts, 0, 1.2), 6 * Math.sin(lt * 2)); w.shield.style.opacity = clamp(ts * 2);
    w.fly(lt, 1080 + 540, 1.6, lt < L[2] ? 6 : 14);
    c.n.textContent = "약 " + (Math.round(lerp(0, 15, ease((lt - L[2] - .2) / 1.6)))) + "만 장"; c.n.style.opacity = P(lt, L[2], .3);
    ap(c.sub, lt, L[2] + .6);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", point: ease((lt - .9) / .5) * (1 - ease((lt - L[1]) / .5)), look: [.8, -.4]});
  }
});

/* 3. 결과: 부패와 딱지, 쿠웨이트 246장 (전광판) */
scene({id: "result", lines: [
  ["부패가 심한 나라일수록 **안 낸 딱지**가 많았다", "결과는, 부패가 심한 나라에서 온 외교관일수록 안 낸 딱지가 많았습니다.", "ding"],
  ["가장 많은 쿠웨이트: 외교관 1명당 **246장**", "가장 많은 쿠웨이트는, 외교관 한 명당 이백사십육 장이었어요.", "coin"],
  ["연구진의 해석: 고국의 **부패 규범**(Corruption Norms)", "연구진은 외교관들이 고국의 부패 규범을 그대로 가져온 것으로 봤습니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.k = pill(hud, 190, "쿠웨이트 · 1명당 <b>246장</b>", GOLD, 58);
    c.unit = A(hud, 470, 1236, "쪽지 1장 = 딱지 10장", "", {width: "420px", textAlign: "center", fontSize: "34px", fontWeight: 800, color: "#fff", textShadow: "0 3px 8px rgba(0,0,0,.7)"});
    c.h = kin(hud, 170, "고국의<br>**부패 규범**", 100);
    c.o = host(hud, "owl", {x: 160, y: 1270, s: .6});
    return c;
  },
  cam(lt, L) {return lt < L[1] ? {x: 540, y: 700, s: 1.03} : {x: 540, y: lerp(700, 860, ease((lt - L[1]) / .6)), s: lerp(1.03, 1, ease((lt - L[1]) / .6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.scatter(lt, 1);
    const tw = spr((lt - L[1] - .1) / .5); imgAt(w.worker, 2160 + 360, 1240, clamp(tw, 0, 1.2), 0); w.worker.style.opacity = clamp(tw * 2);
    w.stackN(lt, lt < L[1] ? 0 : 25, L[1] + .4);
    ap(c.k, lt, L[1] + .3, L[2] - .1, {s: .6, back: true}); ap(c.unit, lt, L[1] + 1.2);
    kinUp(c.h, lt, L[2] + .1);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : lt > L[1] + 1 ? "surprised" : "normal", look: [.8, -.5]});
  }
});

/* 4. 2002년 번호판 압수 → 크게 줄었다 (압수 구역) */
scene({id: "enforce", lines: [
  ["2002년: 벌금 안 낸 차의 **번호판을 떼어 가기** 시작", "그런데 이천이 년, 뉴욕시가 벌금을 안 낸 외교 차량의 번호판을 떼어 가기 시작하자,", "whoosh@0.2"],
  ["내지 않은 딱지가 **크게 줄었다**", "내지 않은 딱지가 크게 줄었습니다.", "ding"],
  ["**규범**도, **처벌**도 중요하다", "부패를 줄이는 데는, 문화와 처벌이 모두 중요하다는 거죠.", "pop"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.h = kin(hud, 200, "문화 **+** 처벌", 110);
    c.c = A(hud, 640, 1050, "개념도", "", {width: "300px", textAlign: "center", fontSize: "34px", fontWeight: 800, color: "#fff", opacity: .8});
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 880, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    const tr = spr((lt - 1) / .5); imgAt(w.wrench, 3240 + 440, 1120, clamp(tr, 0, 1.2) * (1 - P(lt, L[1] + .4, .3)), 30 * Math.sin(lt * 10)); w.wrench.style.opacity = clamp(tr * 2) * (1 - P(lt, L[1] + .4, .3));
    const off = ease((lt - 2.2) / .6);
    w.plate3.setAttribute("transform", `translate(${3240 + 440 + off * 260},${1050 - off * 380}) scale(1) rotate(${off * 20})`);
    w.plate3.setAttribute("opacity", 1 - clamp((lt - 3.2) / .4));
    const ts = spr((lt - .6) / .5); imgAt(w.siren, 3240 + 420, 860, clamp(ts, 0, 1.2), 0); w.siren.style.opacity = clamp(ts * 2) * (.6 + .4 * Math.abs(Math.sin(lt * 8)));
    const nP = lt < L[1] ? 20 : Math.round(lerp(20, 3, ease((lt - L[1] - .2) / 1)));
    w.pileN(lt, nP); c.c.style.opacity = P(lt, L[1], .3) * .8;
    kinUp(c.h, lt, L[2] + .1);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : lt > L[1] ? "surprised" : "normal", look: [.8, -.3]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈부패, 규범, 그리고 **법 집행**〉", "논문 제목은, 부패, 규범, 그리고 법 집행입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 980, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
