/* 오늘의 경제 026 — 잃는 아픔 (v3: 부엉이 진행자·한 공간 카메라 이동·선택 문제 둘·100칸 격자·S자 가치 곡선)
   논문: Kahneman, D. & Tversky, A. (1979) "Prospect Theory: An Analysis of Decision under Risk",
         Econometrica 47(2): 263–291. doi:10.2307/1914185
   확인(2026-11-17, 원문 PDF 는 이 세션에서 막힘 — 원문 표를 옮긴 검색 요약으로 확인):
   - 가상의 선택 문제(단위 이스라엘 파운드, 당시 가구 월 소득 중앙값 약 3,000파운드)
   - 문제 3: (4,000, .80) vs 확실한 3,000 → N=95, [20] [80]* — 80%가 확실한 쪽
   - 문제 3′: (−4,000, .80) vs 확실한 −3,000 → [92]* [8] — 92%가 도박 쪽
   - 원문: 음의 전망 사이의 선호는 양의 전망 사이 선호의 거울상(반사 효과, reflection effect)
   - 가치 함수: 이득에선 오목, 손실에선 볼록, 손실 쪽이 더 가파름(손실 회피)
   - '손실이 이득의 약 2배'는 1992년 후속 논문 값 → 쓰지 않음
   검산: 0.8 × 4,000 = 3,200 > 3,000. 격자: 80/20, 8/92. */
Object.assign(EP, {no: 26, style: "v2", title: "잃는 아픔", hook: "만 원 잃는 아픔, 만 원 얻는 기쁨보다 클까?",
  bgm: {seed: 263, bpm: 102, mood: "bright"},
  paper: {journal: "Econometrica", year: 1979, authors: "Daniel Kahneman & Amos Tversky",
          title: "Prospect Theory: An Analysis of Decision under Risk", ko: "전망 이론: 위험이 따르는 결정의 분석",
          cite: "47(2): 263–291", url: "https://doi.org/10.2307/1914185"},
  yt: {title: "만 원 잃는 아픔, 만 원 얻는 기쁨보다 클까? | 전망 이론 #경제 #shorts",
       desc: "연구진은 사람들에게 가상의 돈을 걸고 고르는 문제를 냈다(단위는 이스라엘 파운드, 당시 가구 월 소득 중앙값이 약 3,000파운드). 첫 번째 문제: 3,000을 확실히 받을까, 80% 확률로 4,000을 받을까? 평균으로 따지면 도박 쪽이 3,200으로 더 많은데도, 80%가 확실한 3,000을 골라 위험을 피했다. 두 번째 문제는 반대로 잃는 쪽: 3,000을 확실히 잃을까, 80% 확률로 4,000을 잃을까? 평균으로는 도박이 3,200을 잃어 더 손해인데도, 이번엔 92%가 도박을 골랐다(응답자 95명). 얻을 때는 위험을 피하고 잃을 때는 위험을 택하는 것을 반사 효과(Reflection Effect)라고 한다. 또 같은 크기라면 잃는 아픔이 얻는 기쁨보다 더 크다고 봤는데, 이것이 손실 회피(Loss Aversion)다. 이 둘을 담은 이론이 전망 이론(Prospect Theory)으로, 행동경제학의 출발점으로 꼽힌다. 카너먼은 2002년 노벨 경제학상을 받았다(트버스키는 1996년 세상을 떠났다).",
       tags: ["경제", "행동경제학", "전망이론", "손실회피", "카너먼", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 퀴즈 무대 | 1080 얻는 문제 | 2160 잃는 문제 | 3240 가치 곡선
let WID = 0;

function quizWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("bg", [[0, "#170e2a"], [1, "#2a1840"]]); lg("floor", [[0, "#3a2050"], [1, "#120a1c"]]);
  lg("curt", [[0, "#8a1f3a"], [1, "#4a0f22"]], {x2: 1, y2: 0}); lg("spot", [[0, "#fff4d0", .3], [1, "#fff4d0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("bg")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  // 커튼 주름(세계 전체 위쪽)
  for (let x = 0; x < WW; x += 90) S("rect", {x, y: 0, width: 90, height: 110, fill: U("curt"), opacity: .9}, g);
  w.spots = [540, 1620, 2700, 3780].map(x => S("path", {d: `M${x - 60},110 L${x + 60},110 L${x + 330},1000 L${x - 330},1000 Z`, fill: U("spot")}, g));
  // 0: 퀴즈 무대
  S("rect", {x: 240, y: 700, width: 600, height: 300, rx: 20, fill: "#2a1f45", stroke: GOLD, "stroke-width": 6}, g);
  w.qmark = ST(g, 540, 640, "?", {"font-size": 300, "font-weight": 900, fill: GOLD});
  w.bag = img(w.layer, "money_bag", 540, 960, 200);
  // 선택 문제 둘 (1080 얻기, 2160 잃기)
  const pie = (cx, cy, r, f) => {const a = 2 * Math.PI * f - Math.PI / 2, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${f > .5 ? 1 : 0} 1 ${x},${y} Z`};
  w.probs = [[1080, 1, TEAL], [2160, -1, CORAL]].map(([x0, sg, col]) => {
    const p = {};
    p.sure = ST(g, x0 + 290, 300, sg > 0 ? "확실히 받기" : "확실히 잃기", {"font-size": 44, "font-weight": 900, fill: "#fff"});
    p.sureV = ST(g, x0 + 290, 420, (sg > 0 ? "+" : "−") + "3,000", {"font-size": 92, "font-weight": 900, fill: sg > 0 ? GOLD : RED});
    p.gam = ST(g, x0 + 790, 300, sg > 0 ? "80% 확률로 받기" : "80% 확률로 잃기", {"font-size": 44, "font-weight": 900, fill: "#fff"});
    p.gamV = ST(g, x0 + 790, 420, (sg > 0 ? "+" : "−") + "4,000", {"font-size": 92, "font-weight": 900, fill: sg > 0 ? GOLD : RED});
    S("circle", {cx: x0 + 790, cy: 560, r: 90, fill: "#3a3050"}, g);
    S("path", {d: pie(x0 + 790, 560, 90, .8), fill: sg > 0 ? GOLD : RED}, g);
    ST(g, x0 + 790, 700, "20%는 0", {"font-size": 36, "font-weight": 800, fill: "#c9cfe6"});
    S("line", {x1: x0 + 540, y1: 260, x2: x0 + 540, y2: 720, stroke: "#fff", opacity: .25, "stroke-width": 4, "stroke-dasharray": "14 10"}, g);
    ST(g, x0 + 540, 520, "vs", {"font-size": 56, "font-weight": 900, fill: "#fff", opacity: .7});
    p.ev = ST(g, x0 + 790, 770, (sg > 0 ? "평균 +" : "평균 −") + "3,200", {"font-size": 44, "font-weight": 900, fill: col, opacity: 0});
    // 100칸 격자: 왼쪽(확실) / 오른쪽(도박)
    p.cells = Array.from({length: 100}, (_, i) => S("rect", {x: x0 + 190 + (i % 20) * 36, y: 820 + Math.floor(i / 20) * 34, width: 30, height: 28, rx: 6, fill: "#4a4a5a"}, g));
    p.sureN = sg > 0 ? 80 : 8; p.col = col; p.sg = sg;
    p.pct = ST(g, x0 + 540, 1060, "", {"font-size": 46, "font-weight": 900, fill: "#fff"});
    return p});
  // 3240: 가치 곡선
  const ox = 3240 + 540, oy = 620;
  S("line", {x1: 3240 + 120, y1: oy, x2: 3240 + 960, y2: oy, stroke: "#fff", "stroke-width": 4}, g);
  S("line", {x1: ox, y1: 230, x2: ox, y2: 1010, stroke: "#fff", "stroke-width": 4}, g);
  ST(g, 3240 + 900, oy + 50, "얻음", {"font-size": 40, "font-weight": 900, fill: GOLD});
  ST(g, 3240 + 180, oy + 50, "잃음", {"font-size": 40, "font-weight": 900, fill: RED});
  ST(g, ox + 90, 260, "기쁨", {"font-size": 40, "font-weight": 900, fill: GOLD});
  ST(g, ox + 90, 1000, "아픔", {"font-size": 40, "font-weight": 900, fill: RED});
  const vf = x => x >= 0 ? 260 * Math.pow(x, .6) : -260 * 2 * Math.pow(-x, .6);   // 모양만(손실 쪽이 더 가파름) — 숫자 아님
  const pts = []; for (let i = -100; i <= 100; i++) {const x = i / 100 * 1.45; pts.push([ox + i * 4, oy - vf(x) * .62])}
  w.curve = S("path", {d: poly(pts), stroke: TEAL, "stroke-width": 10, fill: "none", "stroke-linecap": "round"}, g);
  const gx = 1, gy = vf(1) * .62, lx = 1, ly = vf(-1) * .62;
  w.gain = [S("line", {x1: ox + 276, y1: oy, x2: ox + 276, y2: oy - gy, stroke: GOLD, "stroke-width": 14, opacity: 0}, g),
            ST(g, ox + 276 + 70, oy - gy / 2, "기쁨", {"font-size": 38, "font-weight": 900, fill: GOLD, opacity: 0})];
  w.loss = [S("line", {x1: ox - 276, y1: oy, x2: ox - 276, y2: oy - ly, stroke: RED, "stroke-width": 14, opacity: 0}, g),
            ST(g, ox - 276 - 80, oy - ly / 2, "아픔", {"font-size": 38, "font-weight": 900, fill: RED, opacity: 0})];
  w.vlab = ST(g, 3240 + 540, 200, "모양만 나타낸 그림", {"font-size": 32, "font-weight": 700, fill: "#c9cfe6"});
  // 앞쪽(흐린) 무대 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("rect", {x: x - 160, y: 120, width: 320, height: 40, rx: 10, fill: "#05030a"}, fs);
    for (let k = 0; k < 4; k++) S("circle", {cx: x - 105 + k * 70, cy: 175, r: 20, fill: "#ffe3a0", opacity: .5}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.spots.forEach((s, i) => s.setAttribute("opacity", .7 + .3 * Math.sin(lt * 1.5 + i)));
    w.qmark.setAttribute("transform", `rotate(${6 * Math.sin(lt * 2)},540,560)`); imgAt(w.bag, 540, 960 - 10 * Math.abs(Math.sin(lt * 2.5)), 1, 0)};
  w.vote = (j, lt, t0) => {const p = w.probs[j];
    p.cells.forEach((c, i) => {
      const k = (i % 20) * 5 + Math.floor(i / 20);             // 왼쪽 열부터 채움
      c.setAttribute("fill", lt > t0 + k * .008 ? (k < p.sureN ? GOLD : p.col) : "#4a4a5a")});
    p.pct.textContent = lt > t0 + 1 ? (p.sg > 0 ? "80%: 확실히 받기  |  20%: 도박" : "8%: 확실히 잃기  |  92%: 도박") : ""};
  w.evOn = (j, lt, t0) => w.probs[j].ev.setAttribute("opacity", P(lt, t0, .3));
  w.curveOn = (lt, t0) => {draw(w.curve, (lt - t0) / 1.2)};
  w.gl = (lt, tg, tl) => {w.gain.forEach(e => e.setAttribute("opacity", P(lt, tg, .3))); w.loss.forEach(e => e.setAttribute("opacity", P(lt, tl, .3)))};
  [0, 1].forEach(j => {w.vote(j, -99, 99); w.evOn(j, -99, 99)}); w.curveOn(-99, 0); w.gl(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["만 원 잃는 아픔, 만 원 얻는 기쁨보다 **클까?**", "만 원을 잃는 아픔은, 만 원을 얻는 기쁨보다 클까요?", "pop"],
  ["1979년 **이코노메트리카**에 실린 논문", "천구백칠십구 년에 나온 논문입니다."],
  ["저자: 카너먼_교수와 트버스키_교수", "저자는, 노벨 경제학상을 받은 카너먼 교수, 그리고 트버스키 교수입니다."]],
  build(el, hud) {
    const c = {w: quizWorld(el)};
    c.h = kin(hud, 150, "잃는 아픔 **>** 얻는 기쁨?", 84);
    c.j = kin(hud, 150, "**1979** · Econometrica", 80);
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

/* 2. 얻는 문제 */
scene({id: "gain", lines: [
  ["사람들에게 **가상의 돈**을 걸고 고르는 문제를 냈다", "연구진은 사람들에게, 가상의 돈을 걸고 고르는 문제를 냈습니다.", "pop"],
  ["① 확실히 **3,000** 받기 vs 80% 확률로 **4,000** 받기", "첫 번째 문제. 삼천을 확실히 받을래요, 아니면 팔십 퍼센트 확률로 사천을 받을래요?", "whoosh@0.2"],
  ["**80%**가 확실한 3,000을 골랐다", "팔십 퍼센트가, 확실한 삼천을 골랐습니다.", "ding"],
  ["평균은 도박이 **3,200**으로 더 많은데도 위험을 피했다", "평균으로 따지면 도박 쪽이 삼천이백으로 더 많은데도, 위험을 피한 거죠."]],
  build(el, hud) {
    const c = {w: quizWorld(el)};
    c.u = CX(hud, 1160, "칸 1개 = 응답자 1% (응답자 95명)", "", {fontSize: "32px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? 0 : whip(lt, L[1], 0, 1080, .9));
    w.vote(0, lt, L[2] + .2); ap(c.u, lt, L[2] + .4); w.evOn(0, lt, L[3] + .2);
    c.o.up(lt, {mood: lt > L[3] ? "surprised" : "normal", look: [.7, -.5]});
  }
});

/* 3. 잃는 문제 */
scene({id: "loss", lines: [
  ["② 이번엔 **잃는 쪽**: 숫자는 똑같다", "두 번째 문제는 반대로, 잃는 쪽입니다. 확실하게 삼천을 잃는 쪽, 아니면, 팔십 퍼센트 확률로 사천을 잃는 쪽.", "whoosh@0.2"],
  ["이번엔 **92%**가 도박을 골랐다", "이번엔 구십이 퍼센트가, 도박을 골랐습니다.", "coin"],
  ["평균은 도박이 **3,200**을 잃어 더 손해인데도 위험을 택했다", "평균으로는 도박이 삼천이백을 잃어 더 손해인데도, 위험을 택한 겁니다."]],
  build(el, hud) {
    const c = {w: quizWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.vote(0, 99, 0); w.evOn(0, 99, 0);
    w.vote(1, lt, L[1] + .2); w.evOn(1, lt, L[2] + .2);
    c.o.up(lt, {mood: lt > L[1] + 1 ? "surprised" : "normal", look: [.7, -.5]});
  }
});

/* 4. 이론 */
scene({id: "theory", lines: [
  ["얻을 땐 피하고, 손해_볼_땐 택한다 = **반사_효과**", "얻을 때는 위험을 피하고, 손해 볼 때는 위험을 택한다. 이것을 반사 효과라고 불렀습니다.", "pop"],
  ["같은 크기라면 **잃는 아픔**이 얻는 기쁨보다 크다", "또, 같은 크기라면, 잃는 아픔이 얻는 기쁨보다 더 크다고 봤습니다."],
  ["이것이 **손실_회피**(Loss Aversion)", "이것이 손실 회피입니다.", "ding"],
  ["**전망_이론**(Prospect Theory)", "그리고 이 둘을 담은 이론이, 바로 전망 이론입니다."]],
  build(el, hud) {
    const c = {w: quizWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, 1)); [0, 1].forEach(j => {w.vote(j, 99, 0); w.evOn(j, 99, 0)});
    w.curveOn(lt, 1); w.gl(lt, L[1] + .3, L[1] + 1.2);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**전망 이론**: 위험이 따르는 결정의 분석〉", "논문 제목은, 전망 이론, 위험이 따르는 결정의 분석입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: quizWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.curveOn(99, 0); w.gl(99, 0, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
