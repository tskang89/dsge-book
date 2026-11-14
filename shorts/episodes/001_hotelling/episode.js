/* 오늘의 경제 001 — 호텔링의 법칙 (Hotelling 1929, "Stability in Competition")
   수치 검산: 손님 [0,1] 균등, 가장 가까운 가게로.
   ¼·¾ 배치 → 점유율 50:50, 평균 이동 1/8 = 125m, 최대 250m.
   A 0.45, B 0.75 → 경계 0.60 → A 60%.
   둘 다 ½ → 50:50, 평균 이동 1/4 = 250m(2배), 최대 500m. */
Object.assign(EP, {no: 1, title: "호텔링의 법칙", hook: "아이스크림 가게는 왜 붙어 있을까?",
  bgm: {seed: 11, bpm: 96, mood: "bright"},
  paper: {journal: "The Economic Journal", year: 1929, authors: "Harold Hotelling", title: "Stability in Competition",
          ko: "경쟁의 안정성", cite: "39(153): 41–57"},
  yt: {title: "아이스크림 가게는 왜 꼭 붙어 있을까? | 호텔링의 법칙 #경제 #shorts",
       tags: ["경제", "호텔링의법칙", "게임이론", "내시균형", "중위투표자", "shorts"]}});

/* ---- 공통 그림: 해변, 가게, 손님 ---- */
const BX0 = 100, BX1 = 980, BY = 900;           // 해변(0~1km)의 화면 좌표
const bx = u => lerp(BX0, BX1, u);
const COL_A = "#d8b76a", COL_B = "#7fb3e6", COL_N = "#8a93a6";
function beach(g, o) {
  o = o || {};
  S("rect", {x: 30, y: 520, width: 1020, height: 220, rx: 30, fill: "#24557c"}, g);         // 바다
  for (let i = 0; i < 5; i++) S("path", {d: `M70,${565 + i * 38} q40,-16 80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0`,
    stroke: "#3d78a6", "stroke-width": 4, fill: "none", opacity: .7}, g);
  S("rect", {x: 30, y: 740, width: 1020, height: 330, rx: 30, fill: "#3a3426"}, g);         // 모래
  S("rect", {x: 30, y: 740, width: 1020, height: 16, fill: "#4a4230"}, g);
  if (o.axis !== false) {
    S("line", {x1: BX0, y1: 1130, x2: BX1, y2: 1130, stroke: "#5f6a80", "stroke-width": 3}, g);
    [[0, "0"], [.25, "250m"], [.5, "500m"], [.75, "750m"], [1, "1km"]].forEach(([u, s]) => {
      S("line", {x1: bx(u), y1: 1120, x2: bx(u), y2: 1140, stroke: "#5f6a80", "stroke-width": 3}, g);
      ST(g, bx(u), 1185, s, {"font-size": 34, fill: "#9aa3b5"});
    });
  }
}
function shop(g, col, letter) {
  const s = S("g", {}, g);
  S("rect", {x: -6, y: -150, width: 12, height: 150, fill: "#cfc7b4"}, s);                   // 기둥
  S("path", {d: "M-80,-140 A80,60 0 0 1 80,-140 Z", fill: col}, s);                          // 파라솔
  S("path", {d: "M-27,-140 A27,60 0 0 1 27,-140 Z", fill: "#111a2b", opacity: .25}, s);
  S("rect", {x: -58, y: -70, width: 116, height: 72, rx: 10, fill: "#1c2840", stroke: col, "stroke-width": 5}, s);
  ST(s, 0, -18, letter, {"font-size": 46, "font-weight": 700, fill: col});
  return s;
}
function crowd(g, n) {
  const r = rng(7), P = [];
  for (let i = 0; i < n; i++) {
    const u = (i + .5) / n, y = 960 + (r() - .5) * 170;
    const c = S("circle", {cx: bx(u), cy: y, r: 15, fill: COL_N}, g);
    P.push({u, y, c, d: r()});
  }
  return P;
}
function paint(P, a, b, u) {      // 가장 가까운 가게 색으로 (u: 0→회색, 1→가게 색)
  P.forEach(p => {
    const tgt = a == null ? COL_N : (Math.abs(p.u - a) <= Math.abs(p.u - b) ? COL_A : COL_B);
    p.c.setAttribute("fill", mixc(COL_N, tgt, u));
  });
}
const place = (s, u) => s.setAttribute("transform", `translate(${bx(u)},${BY})`);

/* 1. 질문 */
scene({id: "hook", lines: [
  ["아이스크림 가게는 왜 **꼭 붙어** 있을까?", "아이스크림 가게는 왜 꼭 붙어 있을까요?", "pop"],
  ["답은 **1929년**의 한 논문에", "답은 천구백이십구 년의 한 논문에 있습니다."]],
  build(el) {
    const c = {}, g = svgLayer(el);
    c.g = g; beach(g, {axis: false});
    c.A = shop(g, COL_A, "A"); c.B = shop(g, COL_B, "B");
    c.q = CX(el, 330, "?", "", {fontSize: "150px", fontWeight: 700, color: "var(--gold)"});
    return c;
  },
  update(c, lt, L) {
    sap(c.g, lt, 0);
    place(c.A, .43); place(c.B, .57);
    c.A.setAttribute("opacity", ease(lt / .5)); c.B.setAttribute("opacity", ease((lt - .25) / .5));
    ap(c.q, lt, .5, null, {s: .4, back: true, d: .6});
  }
});

/* 2. 설정 */
scene({id: "setup", lines: [
  ["**1km** 해변에 손님이 고르게", "일 킬로미터 해변에 손님이 고르게 있고,"],
  ["손님은 **가장 가까운** 가게로", "손님은 가장 가까운 가게로 갑니다."]],
  build(el) {
    const c = {}, g = svgLayer(el); beach(g); c.P = crowd(g, 36);
    c.walk = S("path", {d: `M${bx(.6)},1040 L${bx(.75) - 70},1040`, stroke: "#ece6d6", "stroke-width": 4, "stroke-dasharray": "10 10", fill: "none",
      "marker-end": ""}, g);
    c.B = shop(g, COL_B, "B"); place(c.B, .75);
    return c;
  },
  update(c, lt, L) {
    c.P.forEach(p => {const u = eout((lt - .1 - p.d * .8) / .5); p.c.setAttribute("opacity", u); p.c.setAttribute("r", 15 * eback(Math.min(1, (lt - .1 - p.d * .8) / .5)) || 0)});
    sap(c.B, lt, L[1]); c.walk.setAttribute("opacity", P(lt, L[1] + .4));
  }
});

/* 3. 손님에게 가장 좋은 배치 */
scene({id: "best", lines: [
  ["가게가 **¼ · ¾ 지점**에 있으면", "가게가 사분의 일, 사분의 삼 지점에 있으면,", "pop"],
  ["손님은 **반반**, 아무도 250m 넘게 안 걷는다", "손님은 반반, 아무도 이백오십 미터 넘게 안 걷죠."],
  ["손님에겐 **최고의** 배치", "손님에겐 최고의 배치입니다.", "ding"]],
  build(el) {
    const c = {}, g = svgLayer(el); beach(g); c.P = crowd(g, 36);
    c.mid = S("line", {x1: bx(.5), y1: 520, x2: bx(.5), y2: 1070, stroke: "#ece6d6", "stroke-width": 4, "stroke-dasharray": "14 10"}, g);
    c.A = shop(g, COL_A, "A"); c.B = shop(g, COL_B, "B");
    c.sa = A(el, 0, 380, "50%", "big", {width: bx(.5) + "px", textAlign: "center", color: "var(--gold)", fontSize: "84px"});
    c.sb = A(el, bx(.5), 380, "50%", "big", {width: (W - bx(.5)) + "px", textAlign: "center", color: "var(--blue)", fontSize: "84px"});
    c.ok = CX(el, 1215, "평균 이동거리 <b class='gold'>125m</b>", "mid");
    return c;
  },
  update(c, lt, L) {
    place(c.A, .25); place(c.B, .75); sap(c.A, lt, 0); sap(c.B, lt, .15);
    paint(c.P, .25, .75, P(lt, L[1]));
    sap(c.mid, lt, L[1] + .2); ap(c.sa, lt, L[1] + .3, null, {s: .6}); ap(c.sb, lt, L[1] + .45, null, {s: .6});
    ap(c.ok, lt, L[2]);
  }
});

/* 4. A 의 배신 */
scene({id: "move", lines: [
  ["그런데 A가 **가운데로** 오면?", "그런데 에이 가게가 가운데로 오면?", "whoosh@0.6"],
  ["경계가 밀려 A의 손님이 **60%**", "경계가 밀려서, 손님 육십 퍼센트를 가져갑니다.", "coin"],
  ["B도 **질세라** 가운데로", "비 가게도 질세라 가운데로 옵니다.", "whoosh@0.5"]],
  build(el) {
    const c = {}, g = svgLayer(el); beach(g); c.P = crowd(g, 36);
    c.mid = S("line", {x1: 0, y1: 520, x2: 0, y2: 1070, stroke: "#ece6d6", "stroke-width": 4, "stroke-dasharray": "14 10"}, g);
    c.A = shop(g, COL_A, "A"); c.B = shop(g, COL_B, "B");
    c.sa = A(el, 0, 380, "", "big", {textAlign: "center", color: "var(--gold)", fontSize: "84px", width: "500px"});
    c.sb = A(el, 0, 380, "", "big", {textAlign: "center", color: "var(--blue)", fontSize: "84px", width: "500px"});
    return c;
  },
  update(c, lt, L) {
    const a = lerp(.25, .45, P(lt, .5, 1.1)), b = lerp(.75, .55, P(lt, L[2] + .4, 1.1));
    place(c.A, a); place(c.B, b); paint(c.P, a, b, 1);
    const m = (a + b) / 2, sh = Math.round(m * 100);
    c.mid.setAttribute("x1", bx(m)); c.mid.setAttribute("x2", bx(m));
    c.sa.textContent = sh + "%"; c.sb.textContent = (100 - sh) + "%";
    c.sa.style.left = (bx(m / 2) - 250) + "px"; c.sb.style.left = (bx((1 + m) / 2) - 250) + "px";
    const pop = 1 + .18 * Math.sin(Math.PI * clamp((lt - L[1]) / .6));
    c.sa.style.transform = `scale(${pop})`;
  }
});

/* 5. 결국 한가운데 */
scene({id: "nash", lines: [
  ["밀고 당기다 결국 둘 다 **한가운데**", "그렇게 밀고 당기다, 결국 둘 다 한가운데로."],
  ["아무도 옮길 이유가 없다 = **내시 균형**", "누구도 움직일 이유가 없는, 내시 균형입니다.", "ding"]],
  build(el) {
    const c = {}, g = svgLayer(el); beach(g); c.P = crowd(g, 36);
    c.A = shop(g, COL_A, "A"); c.B = shop(g, COL_B, "B");
    c.box = CX(el, 390, "<span class='chip'>내시 균형 Nash Equilibrium</span>", "");
    return c;
  },
  update(c, lt, L) {
    // 번갈아 앞지르기: A .45→.56, B .55→.44 … 점점 가운데로
    const steps = [[.45, .55], [.52, .55], [.52, .49], [.505, .49], [.505, .495]];
    const k = clamp(lt / (L[1] - .2) * (steps.length - 1), 0, steps.length - 1), i = Math.min(steps.length - 2, Math.floor(k)), f = ease(k - i);
    let a = lerp(steps[i][0], steps[i + 1][0], f), b = lerp(steps[i][1], steps[i + 1][1], f);
    const s = P(lt, L[1] - .3, .8); a = lerp(a, .43, s); b = lerp(b, .57, s);   // 마지막엔 나란히
    place(c.A, a); place(c.B, b); paint(c.P, a, b, 1);
    ap(c.box, lt, L[1], null, {s: .7, back: true});
  }
});

/* 6. 결과 비교 */
scene({id: "cost", lines: [
  ["점유율은 그대로 **50 : 50**", "점유율은 여전히 반반인데,"],
  ["손님이 걷는 평균 거리는 **2배**", "손님이 걷는 평균 거리는 두 배가 됐습니다.", "coin"]],
  build(el) {
    const c = {}, g = svgLayer(el); c.g = g;
    c.share = CX(el, 360, "<span class='gold'>A 50%</span> &nbsp;:&nbsp; <span class='blue'>B 50%</span>", "big", {fontSize: "80px"});
    const x0 = 170, y0 = 600, h = 520;
    axes(g, x0, y0, 760, h, {yl: "손님 평균 이동거리"});
    c.b1 = S("rect", {x: 280, width: 220, fill: "#6fcfb7", rx: 8}, g);
    c.b2 = S("rect", {x: 600, width: 220, fill: "#e88a6f", rx: 8}, g);
    ST(g, 390, y0 + h + 58, "¼·¾ 배치", {"font-size": 40, fill: "#9aa3b5"});
    ST(g, 710, y0 + h + 58, "한가운데", {"font-size": 40, fill: "#9aa3b5"});
    c.t1 = ST(g, 390, 0, "125m", {"font-size": 54, "font-weight": 700, fill: "#6fcfb7"});
    c.t2 = ST(g, 710, 0, "250m", {"font-size": 54, "font-weight": 700, fill: "#e88a6f"});
    c.x2 = ST(g, 900, 700, "×2", {"font-size": 90, "font-weight": 700, fill: "#d8b76a"});
    c.y0 = y0; c.h = h;
    return c;
  },
  update(c, lt, L) {
    ap(c.share, lt, 0, null, {s: .7});
    sap(c.g, lt, L[1] - .1);
    const u1 = P(lt, L[1], .7), u2 = P(lt, L[1] + .5, .9), B = c.y0 + c.h, k = 1.7;
    const h1 = 125 * k * u1, h2 = 250 * k * u2;
    c.b1.setAttribute("y", B - h1); c.b1.setAttribute("height", h1);
    c.b2.setAttribute("y", B - h2); c.b2.setAttribute("height", h2);
    c.t1.setAttribute("y", B - h1 - 18); c.t1.setAttribute("opacity", u1);
    c.t2.setAttribute("y", B - h2 - 18); c.t2.setAttribute("opacity", u2);
    c.x2.setAttribute("opacity", P(lt, L[1] + 1.4));
  }
});

/* 7. 현실에서 */
scene({id: "real", lines: [
  ["카페·주유소가 **한곳에** 몰리는 이유", "카페와 주유소가 한곳에 몰리는 이유,", "pop"],
  ["선거 공약이 **중도로** 닮아 가는 이유", "선거 공약이 중도로 닮아 가는 이유도 같아요.", "pop"]],
  build(el) {
    const c = {}, g = svgLayer(el);
    // 위: 거리의 가게들
    c.top = S("g", {}, g);
    S("rect", {x: 90, y: 560, width: 900, height: 22, rx: 11, fill: "#2f3a52"}, c.top);
    ST(c.top, 540, 625, "같은 거리, 같은 블록", {"font-size": 38, fill: "#9aa3b5"});
    c.shops = [];
    const xs = [370, 455, 540, 625, 710], cols = ["#d8b76a", "#7fb3e6", "#6fcfb7", "#e88a6f", "#d8b76a"];
    xs.forEach((x, i) => {const s = S("rect", {x: x - 36, y: 0, width: 72, height: 72, rx: 12, fill: cols[i]}, c.top); c.shops.push(s)});
    // 아래: 유권자 분포와 정당
    c.bot = S("g", {}, g);
    const x0 = 100, x1 = 980, y0 = 1110;
    const pts = []; for (let i = 0; i <= 120; i++) {const u = i / 120, z = (u - .5) / .17; pts.push([lerp(x0, x1, u), y0 - 360 * Math.exp(-z * z / 2)])}
    S("path", {d: poly(pts) + ` L${x1},${y0} L${x0},${y0} Z`, fill: "rgba(127,179,230,.14)", stroke: "#7fb3e6", "stroke-width": 4}, c.bot);
    S("line", {x1: x0, y1: y0, x2: x1, y2: y0, stroke: "#5f6a80", "stroke-width": 3}, c.bot);
    ST(c.bot, x0 + 20, y0 + 54, "진보", {"font-size": 38, fill: "#9aa3b5", "text-anchor": "start"});
    ST(c.bot, x1 - 20, y0 + 54, "보수", {"font-size": 38, fill: "#9aa3b5", "text-anchor": "end"});
    ST(c.bot, 540, y0 + 54, "중위 투표자", {"font-size": 38, fill: "#d8b76a"});
    c.p1 = S("circle", {r: 30, cy: y0 - 30, fill: "#e88a6f"}, c.bot);
    c.p2 = S("circle", {r: 30, cy: y0 - 30, fill: "#7fb3e6", stroke: "#111a2b", "stroke-width": 4}, c.bot);
    c.x0 = x0; c.x1 = x1;
    return c;
  },
  update(c, lt, L) {
    sap(c.top, lt, 0);
    c.shops.forEach((s, i) => {const u = eback(clamp((lt - .2 - i * .12) / .45)); s.setAttribute("y", 480 + 60 * (1 - u)); s.setAttribute("opacity", clamp(u * 2))});
    sap(c.bot, lt, L[1]);
    const u = P(lt, L[1] + .4, 1.6);
    c.p1.setAttribute("cx", lerp(lerp(c.x0, c.x1, .2), 540 - 22, u));
    c.p2.setAttribute("cx", lerp(lerp(c.x0, c.x1, .8), 540 + 22, u));
  }
});

/* 8. 마무리 */
scene({id: "outro", tail: 1.2, lines: [
  ["**호텔링의 법칙**", "이것이 호텔링의 법칙입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el) {
    const c = {};
    c.t = CX(el, 380, "호텔링의 법칙", "", {fontSize: "110px", fontWeight: 700, color: "var(--gold)"});
    c.p = paperCard(el, 560);
    c.f = CX(el, 1080, "<span class='chip'>구독하고 매일 하나씩 ▶</span>", "");
    return c;
  },
  update(c, lt, L) {
    ap(c.t, lt, 0, null, {s: .7, back: true}); ap(c.p, lt, .5);
    ap(c.f, lt, L[1], null, {s: .8, back: true});
  }
});
