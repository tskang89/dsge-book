/* 시제품 v3 — 002 앞부분: 한 공간 + 카메라 이동, 진행자 부엉이, 동전 기둥, 모션 블러(렌더 옵션) */
Object.assign(EP, {no: 2, style: "v2", title: "헬스장 회원권의 역설", bgm: {seed: 23, bpm: 104, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2006, authors: "Stefano DellaVigna & Ulrike Malmendier",
          title: "Paying Not to Go to the Gym", ko: "헬스장에 가지 않기 위해 돈 내기"}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65";
const WW = 3240;                       // 세계 너비: 0 입구 | 1080 카운터 | 2160 달력 벽
let WID = 0;

/* ---- 넓은 헬스장 세계 ---- */
function gymWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1b2240"], [1, "#2e2b4d"]]); lg("floor", [[0, "#8f5d36"], [1, "#3a2516"]]);
  lg("ray", [[0, "#ffe2a8", .32], [1, "#ffe2a8", 0]]); lg("desk", [[0, "#6a4a8c"], [1, "#3b2a55"]]); lg("top", [[0, "#e9e2f5"], [1, "#b9add0"]]);
  lg("board", [[0, "#2c3a62"], [1, "#1c2744"]]); lg("cal", [[0, "#fbf8f1"], [1, "#e8e2d4"]]);
  lg("coinT", [[0, "#fff1a8"], [.5, "#f2c14e"], [1, "#d9a32e"]], {x2: 1, y2: 0}); lg("coinS", [[0, "#c48a1c"], [1, "#8f6210"]]);
  w.lg = lg; w.U = U;
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("wall")}, g);
  // 창과 빛줄기(입구·카운터 구역)
  w.rays = S("g", {}, g);
  [130, 430, 730, 1250, 1830].forEach(x => {
    S("rect", {x, y: 170, width: 220, height: 300, rx: 14, fill: "#3b4f86", opacity: .55}, g);
    S("line", {x1: x + 110, y1: 170, x2: x + 110, y2: 470, stroke: "#1b2240", "stroke-width": 8}, g);
    S("line", {x1: x, y1: 320, x2: x + 220, y2: 320, stroke: "#1b2240", "stroke-width": 8}, g);
    S("path", {d: `M${x},170 L${x + 220},170 L${x + 420},900 L${x + 120},900 Z`, fill: U("ray")}, w.rays);
  });
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("floor")}, g);
  for (let i = -6; i <= 52; i++) S("line", {x1: i * 70, y1: 900, x2: i * 70 + (i * 70 % 1080 - 540) * 2.6, y2: 1500, stroke: "#2a1a10", "stroke-width": 3, opacity: .45}, g);
  [960, 1040, 1150, 1300].forEach(y => S("line", {x1: 0, y1: y, x2: WW, y2: y, stroke: "#2a1a10", "stroke-width": 2, opacity: .35}, g));
  // 입구 구역: 덤벨 선반
  S("rect", {x: 60, y: 760, width: 960, height: 18, rx: 6, fill: "#4a5274"}, g); S("rect", {x: 60, y: 860, width: 960, height: 18, rx: 6, fill: "#4a5274"}, g);
  for (let i = 0; i < 8; i++) {const x = 110 + i * 120, cols = ["#e85d5d", "#5ab0ff", "#f2c14e", "#6fcfb7"];
    [[742, 1], [842, 1.2]].forEach(([y, k]) => {const c = cols[(i + (k > 1 ? 2 : 0)) % 4];
      S("rect", {x: x - 34 * k, y: y - 18 * k, width: 20 * k, height: 36 * k, rx: 6, fill: c}, g);
      S("rect", {x: x + 14 * k, y: y - 18 * k, width: 20 * k, height: 36 * k, rx: 6, fill: c}, g);
      S("rect", {x: x - 16 * k, y: y - 4, width: 32 * k, height: 8, fill: "#c9cfdb"}, g)})}
  // 카운터 구역: 요금판 + 데스크
  S("rect", {x: 1080 + 170, y: 360, width: 740, height: 120, rx: 22, fill: U("board"), stroke: "#4a5a8a", "stroke-width": 4}, g);
  ST(g, 1080 + 540, 440, "요금 안내  ·  PRICE", {"font-size": 52, "font-weight": 800, fill: "#e9e2f5"});
  S("rect", {x: 1080 + 250, y: 1060, width: 800, height: 34, rx: 12, fill: U("top")}, g);
  S("rect", {x: 1080 + 270, y: 1094, width: 760, height: 150, rx: 16, fill: U("desk")}, g);
  w.labA = ST(g, 1080 + 470, 1180, "1회 $10씩", {"font-size": 48, "font-weight": 800, fill: TEAL});
  w.labB = ST(g, 1080 + 830, 1180, "한 달 $70", {"font-size": 48, "font-weight": 800, fill: GOLD});
  // 달력 벽 구역
  const cx0 = 2160 + 120, cy0 = 370, cw = 120, ch = 104;
  S("rect", {x: cx0 - 30, y: cy0 - 6, width: 7 * cw + 60, height: 5 * ch + 150, rx: 30, fill: "#000", opacity: .3, transform: "translate(10,14)"}, g);
  S("rect", {x: cx0 - 30, y: cy0 - 6, width: 7 * cw + 60, height: 5 * ch + 150, rx: 30, fill: U("cal")}, g);
  S("path", {d: `M${cx0 - 30},${cy0 + 24} a30,30 0 0 1 30,-30 h${7 * cw} a30,30 0 0 1 30,30 v66 h-${7 * cw + 60} z`, fill: "#e85d5d"}, g);
  ST(g, 2160 + 540, cy0 + 62, "한 달 출석(정액 회원 평균)", {"font-size": 44, "font-weight": 800, fill: "#fff"});
  w.cells = [];
  for (let k = 0; k < 30; k++) {const x = cx0 + (k % 7) * cw + cw / 2, y = cy0 + 130 + Math.floor(k / 7) * ch + ch / 2;
    ST(g, x - 30, y - 14, k + 1, {"font-size": 28, fill: "#8a8f9c"}); w.cells.push([x, y])}
  S("rect", {x: 2160 + 200, y: 1050, width: 680, height: 22, rx: 11, fill: "#4a5274"}, g);
  // 동전 기둥 층(카운터 위)
  w.coinL = S("g", {}, g); w.coinR = S("g", {}, g);
  w.cl = []; w.cr = [];
  const mkCoin = (par, x) => {const c = S("g", {opacity: 0}, par);
    S("ellipse", {cx: x, cy: 14, rx: 92, ry: 30, fill: U("coinS")}, c);
    S("rect", {x: x - 92, y: 0, width: 184, height: 14, fill: U("coinS")}, c);
    S("ellipse", {cx: x, cy: 0, rx: 92, ry: 30, fill: U("coinT"), stroke: "#c48a1c", "stroke-width": 3}, c);
    S("ellipse", {cx: x, cy: 0, rx: 64, ry: 19, fill: "none", stroke: "#d9a32e", "stroke-width": 3}, c);
    ST(c, x, 11, "$10", {"font-size": 30, "font-weight": 800, fill: "#a8741a"}); return c};
  for (let i = 0; i < 10; i++) {w.cl.push(mkCoin(w.coinL, 1080 + 470)); w.cr.push(mkCoin(w.coinR, 1080 + 830))}
  // 4.3번째: 30% 조각 동전
  const cp = S("clipPath", {id: id("part")}, d); S("rect", {x: 1080 + 470 - 92, y: -40, width: 184 * .3, height: 80}, cp);
  w.part = S("g", {"clip-path": U("part")}, w.coinL); w.part.appendChild(mkCoin(w.part, 1080 + 470).firstChild.parentNode);
  w.part.firstChild.setAttribute("opacity", 1);
  // 체크 표시(달력)
  w.chk = [3, 11, 17, 26, 29].map(k => img(w.layer, "check", w.cells[k][0] + 10, w.cells[k][1] + 46, 92));
  // 입구 구역 인물
  w.lifter = img(w.layer, "lifter", 760, 1200, 300);
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(5px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 400, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600].forEach(x => {S("line", {x1: x, y1: 0, x2: x, y2: 120, stroke: "#0c1020", "stroke-width": 10}, fs);
    S("path", {d: `M${x - 110},190 Q${x},60 ${x + 110},190 Z`, fill: "#0c1020"}, fs);
    S("ellipse", {cx: x, cy: 192, rx: 70, ry: 16, fill: "#ffe7b0", opacity: .8}, fs)});
  // 먼지
  const r = rng(n * 13 + 1);
  w.dust = Array.from({length: 60}, () => ({x: r() * WW, y: 150 + r() * 750, s: .5 + r(), e: S("circle", {r: 2 + r() * 3, fill: "#fff1cc", opacity: .5}, g)}));
  /* 상태 그리기 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {
    w.rays.setAttribute("opacity", .75 + .25 * Math.sin(lt * .9));
    w.dust.forEach((p, i) => {p.e.setAttribute("cx", (p.x + lt * 14 * p.s) % WW); p.e.setAttribute("cy", p.y + 20 * Math.sin(lt * .7 * p.s + i))});
  };
  /* 동전 기둥: 왼쪽 nL 개(소수점은 조각), 오른쪽 nR 개. t0 기준 떨어지는 시각을 각자 계산 */
  w.coins = (lt, nL, tL, nR, tR, gap) => {
    gap = gap || .14; const base = 1040;
    const drop = (c, i, t) => {const u = clamp((lt - t) / .45), y = base - i * 34 - (1 - eback(u)) * 420;
      c.setAttribute("transform", `translate(0,${y})`); c.setAttribute("opacity", u > 0 ? 1 : 0)};
    w.cl.forEach((c, i) => {if (i < Math.floor(nL)) drop(c, i, tL + i * gap); else c.setAttribute("opacity", 0)});
    w.cr.forEach((c, i) => {if (i < nR) drop(c, i, tR + i * gap); else c.setAttribute("opacity", 0)});
    const fr = nL - Math.floor(nL);
    if (fr > 0) {const i = Math.floor(nL), u = clamp((lt - tL - i * gap) / .45);
      w.part.setAttribute("transform", `translate(0,${base - i * 34 - (1 - eback(u)) * 420})`); w.part.setAttribute("opacity", u > 0 ? 1 : 0)}
    else w.part.setAttribute("opacity", 0);
  };
  w.checks = (lt, t0) => w.chk.forEach((e, i) => {const t = spr((lt - t0 - i * .35) / .5);
    imgAt(e, w.cells[[3, 11, 17, 26, 29][i]][0] + 10, w.cells[[3, 11, 17, 26, 29][i]][1] + 46, clamp(t, 0, 1.2), 0);
    e.style.opacity = clamp(t * 2) * (i === 4 ? .3 : 1)});
  w.coins(-99, 0, 0, 0, 0); w.checks(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, d) => lerp(a, b, ease((lt - t0) / (d || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});

/* 1. 질문 (입구) */
scene({id: "hook", lines: [
  ["헬스장 **월 정액권**, 정말 이득일까?", "헬스장 월 정액권, 정말 이득일까요?", "pop"],
  ["2006년 AER 논문: 회원 **7,752명**의 3년 치 출석", "이천육 년 경제학 논문이, 헬스장 회원 칠천칠백 명이 넘는 사람들의 삼 년 치 출석을 분석했습니다."]],
  build(el, hud) {
    const c = {w: gymWorld(el)};
    c.h = kin(hud, 150, "헬스장 **월 정액권**,<br>정말 이득일까?", 92);
    c.n = bigNum(hud, 160, "", GOLD, 160);
    c.sub = CX(hud, 350, "명 · 3년 · 헬스장 3곳", "", {fontSize: "48px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.ppl = Array.from({length: 12}, (_, i) => img(hud, ["person", "woman", "man", "person_light", "person_medium"][i % 5], 0, 0, 92));
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 1000, s: lerp(1.2, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    const t = spr((lt - .2) / .6); imgAt(w.lifter, 760, 1200 + 10 * Math.sin(lt * 4), clamp(t, 0, 1.2), 0); w.lifter.style.opacity = clamp(t * 2);
    kinUp(c.h, lt, .1, L[1] - .2);
    countTo(c.n, lt, L[1] + .1, 0, 7752, v => Math.round(v).toLocaleString("en-US"), 1.2); c.n.style.opacity = P(lt, L[1], .3);
    ap(c.sub, lt, L[1] + .6);
    c.ppl.forEach((e, i) => {const t2 = spr((lt - L[1] - .4 - i * .06) / .5); imgAt(e, 330 + (i % 6) * 120, 560 + Math.floor(i / 6) * 120, clamp(t2, 0, 1.2), 0); e.style.opacity = clamp(t2 * 2)});
    const ent = ease((lt - .3) / .7);
    c.o.up(lt, {x: lerp(-200, 190, ent), mood: lt < L[1] ? "surprised" : "normal", look: [.6, -.4]});
  }
});

/* 2. 요금 비교 (카운터로 이동, 동전 기둥) */
scene({id: "choice", lines: [
  ["**한 달 $70**: 몇 번을 가든 같은 돈", "하나는 한 달 칠십 달러. 몇 번을 가든 같은 돈입니다.", "pop"],
  ["**1회 $10**: 간 만큼만 낸다", "다른 하나는 한 번에 십 달러. 간 만큼만 냅니다.", "pop"],
  ["한 달 **7번** 넘게 가야 정액이 이득", "그러니 한 달에 일곱 번 넘게 가야 정액이 이득입니다.", "ding"]],
  build(el, hud) {
    const c = {w: gymWorld(el)};
    c.cnt = CX(hud, 170, "", "", {fontSize: "96px", fontWeight: 800, color: "#fff", textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.be = CX(hud, 540, "<span style='background:#fff;color:#10182a;padding:8px 30px;border-radius:40px'>본전!</span>", "", {fontSize: "64px", fontWeight: 800});
    c.win = CX(hud, 540, "<span style='background:" + GOLD + ";color:#10182a;padding:8px 30px;border-radius:40px'>이제 정액이 더 싸다</span>", "", {fontSize: "56px", fontWeight: 800});
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {const z = ease((lt - L[2]) / 1); return {x: 540, y: 1000, s: lerp(1, 1.08, z)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    // 방문 횟수: 두 번째 줄 1번, 세 번째 줄 1→10
    const v = lt < L[1] ? 0 : lt < L[2] ? 1 : Math.min(10, 1 + Math.floor((lt - L[2] - .2) / .32));
    w.coins(lt, v, L[1] + .3, 7, .9, .14);
    // 세 번째 줄에서는 각 방문 시각에 맞춰 떨어지게(겉보기 시각 보정)
    if (lt >= L[2]) w.cl.forEach((cn, i) => {if (i >= 1 && i < v) {const tt = L[2] + .2 + (i - 1) * .32, u = clamp((lt - tt) / .4);
      cn.setAttribute("transform", `translate(0,${1040 - i * 34 - (1 - eback(u)) * 420})`); cn.setAttribute("opacity", u > 0 ? 1 : 0)}});
    w.labA.setAttribute("opacity", P(lt, L[1], .4)); w.labB.setAttribute("opacity", P(lt, .9, .4));
    c.cnt.innerHTML = v ? `방문 <span style="color:${TEAL}">${v}</span>번` : ""; c.cnt.style.opacity = P(lt, L[1], .3);
    c.cnt.style.transform = `scale(${1 + .12 * Math.max(0, 1 - ((lt - L[2] - .2) % .32) / .2) * (lt > L[2] && v < 10 ? 1 : 0)})`;
    const at7 = L[2] + .2 + 6 * .32;
    ap(c.be, lt, at7, at7 + .9, {s: .5, back: true}); ap(c.win, lt, at7 + 1.1, null, {s: .6, back: true});
    c.o.up(lt, {point: lt < L[2] ? ease((lt - .9) / .5) : 1 - ease((lt - L[2]) / .4), mood: lt > at7 ? "happy" : "normal", look: [.8, -.2]});
  }
});

/* 3. 실제 출석 (달력 벽으로 이동했다가 카운터로 돌아옴) */
scene({id: "reality", lines: [
  ["정액 회원의 실제 출석: 한 달 평균 **4.3번**", "그런데 정액을 고른 회원들은, 한 달에 평균 사 점 삼 번 갔습니다.", "pop"],
  ["1회씩 냈다면 약 **$43**, 그런데 **$70**을 냈다", "한 번씩 냈다면 사십삼 달러 정도인데, 칠십 달러를 낸 거죠.", "coin"]],
  build(el, hud) {
    const c = {w: gymWorld(el)};
    c.num = bigNum(hud, 120, "4.3번", GOLD, 150);
    c.a = A(hud, 320, 740, "약 $43", "", {width: "300px", textAlign: "center", fontSize: "84px", fontWeight: 800, color: TEAL, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.b = A(hud, 680, 660, "$70", "", {width: "300px", textAlign: "center", fontSize: "84px", fontWeight: 800, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.pan(lt < L[1] ? whip(lt, 0, 1080, 2160, .8) : whip(lt, L[1], 2160, 1080, .8));
    w.checks(lt, .9);
    ap(c.num, lt, 2.6, L[1] - .1, {s: .5, back: true});
    // 돌아오면 왼쪽 기둥은 4.3개, 오른쪽은 7개 그대로
    if (lt >= L[1]) w.coins(lt, 4.3, L[1] + .7, 7, -9, .16); else w.coins(lt, 10, -9, 7, -9);
    w.labA.setAttribute("opacity", 1); w.labB.setAttribute("opacity", 1);
    ap(c.a, lt, L[1] + 1.6, null, {s: .6, back: true}); ap(c.b, lt, L[1] + 2, null, {s: .6, back: true});
    c.o.up(lt, {mood: lt < L[1] ? (lt > 2.6 ? "skeptical" : "normal") : (lt > L[1] + 2 ? "surprised" : "normal"), look: lt < L[1] ? [.7, -.5] : [.8, -.3]});
  }
});
