/* 오늘의 경제 002 — 헬스장 회원권의 역설 (v3: 부엉이 진행자·한 공간 카메라 이동·동전 기둥)
   논문: DellaVigna, S. & Malmendier, U. (2006) "Paying Not to Go to the Gym", American Economic Review 96(3): 694–719.
         doi:10.1257/aer.96.3.694
   영상 속 숫자는 모두 논문 초록에서 확인(2026-11-14, RePEc/NBER 판 초록):
   - 미국 헬스장 3곳, 회원 7,752명, 3년 자료
   - 월 정액 $70 넘는 계약 회원: 월평균 4.3회 출석 → 기대 방문 1회당 $17 넘게 지불, 10회권이면 1회 $10
   - 이들이 회원 기간 동안 놓친 절약액 평균 $600
   - (영상에서 뺌) 월 계약 회원은 1년 계약 회원보다 가입 1년 뒤에도 회원일 확률이 17% 높다 — 설명이 길어 오해 소지가 커서 제외
   - 4.3회 × $17 > $70: 정액은 '$70 넘는' 계약들이라 1회당 값이 $70/4.3 보다 크다 → 화면에 $70÷4.3 계산을 보이지 않는다
   - 주된 설명: 미래의 자기 통제·효율에 대한 과신
   본전 7회 = $70 ÷ $10 (단순 산수, 화면 그래프는 월 $70 정액 vs 1회 $10).
   4.3번 × $10 ≈ $43, $70 ÷ 4.3 ≈ $16.3 (단순 산수). 영상은 '1회 $10'과 '한 달 $70'으로 단순화(사용자 지시) —
   논문의 '1회당 $17 넘게'는 회비가 $70 넘는 계약들의 값이라 $70 기준 화면과 맞지 않으므로 영상에선 $70÷4.3≈$16 을 쓰고, 설명란에 원래 수치를 밝힌다. */
Object.assign(EP, {no: 2, style: "v2", title: "헬스장 회원권의 역설", hook: "헬스장 월 정액권, 정말 이득일까?",
  bgm: {seed: 23, bpm: 104, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2006, authors: "Stefano DellaVigna & Ulrike Malmendier",
          title: "Paying Not to Go to the Gym", ko: "헬스장에 가지 않기 위해 돈 내기", cite: "96(3): 694–719",
          url: "https://doi.org/10.1257/aer.96.3.694"},
  yt: {title: "헬스장 월 정액권, 정말 이득일까? | 헬스장에 가지 않기 위해 돈 내기 #경제 #shorts",
       desc: "미국 헬스장 3곳 회원 7,752명의 3년 치 출석 기록. 한 달 정액(약 $70)은 한 달 7번 넘게 가야 1회 $10보다 싸다. 그런데 정액 회원은 한 달 평균 4.3번 갔다. 1회씩 냈다면 가입_기간_동안 평균 $600을 아낄 수 있었다. 저자들은 미래의 자기 통제에 대한 과신을 가장 유력한 설명으로 꼽는다. (영상은 단순화를 위해 월 $70로 계산. 논문의 정액은 월 $70 넘는 계약들이라 1회당 실제 비용은 $17 이상, 1회 $10은 10회권 기준 단가)",
       tags: ["경제", "행동경제학", "헬스장", "과신", "현재편향", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65";
const WW = 4320;                       // 세계 너비: 0 입구 | 1080 카운터 | 2160 달력 벽 | 3240 휴게실
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
  w.labA = ST(g, 1080 + 470, 1180, "1회권 $10", {"font-size": 48, "font-weight": 800, fill: TEAL});
  w.labB = ST(g, 1080 + 830, 1180, "정액권 $70", {"font-size": 48, "font-weight": 800, fill: GOLD});
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
  // 휴게실 구역: 창, 소파, 생각 풍선
  [3340, 3900].forEach(x => {S("rect", {x, y: 170, width: 220, height: 300, rx: 14, fill: "#3b4f86", opacity: .55}, g);
    S("line", {x1: x + 110, y1: 170, x2: x + 110, y2: 470, stroke: "#1b2240", "stroke-width": 8}, g);
    S("line", {x1: x, y1: 320, x2: x + 220, y2: 320, stroke: "#1b2240", "stroke-width": 8}, g)});
  S("rect", {x: 3240 + 120, y: 1060, width: 840, height: 30, rx: 15, fill: "#000", opacity: .25}, g);
  w.bubble = S("g", {opacity: 0}, g);
  [[3240 + 380, 780, 16], [3240 + 430, 720, 24], [3240 + 500, 650, 34]].forEach(([x, y, r]) => S("circle", {cx: x, cy: y, r, fill: "#fbf8f1"}, w.bubble));
  S("ellipse", {cx: 3240 + 640, cy: 470, rx: 360, ry: 170, fill: "#fbf8f1"}, w.bubble);
  ST(w.bubble, 3240 + 720, 455, "앞으로는", {"font-size": 50, "font-weight": 800, fill: "#2c3a62"});
  ST(w.bubble, 3240 + 720, 520, "자주 가겠지!", {"font-size": 50, "font-weight": 800, fill: "#2c3a62"});
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
  w.couch = img(w.layer, "couch", 3240 + 560, 1120, 460);
  w.zz = img(w.layer, "sleeping", 3240 + 470, 900, 150);
  w.flex = img(w.layer, "biceps", 3240 + 470, 520, 150);
  // 입구 구역 인물
  w.lifter = img(w.layer, "lifter", 760, 1200, 300);
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(5px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 400, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("line", {x1: x, y1: 0, x2: x, y2: 120, stroke: "#0c1020", "stroke-width": 10}, fs);
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
  ["델라비냐·말멘디어 교수: 회원 **7,752명** 3년 치 출석", "이천육 년, 델라비냐 교수와 말멘디어 교수가, 헬스장 회원 칠천칠백 명이 넘는 사람들의 삼 년 치 출석을 분석했습니다."]],
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
  ["**정액권**: 가는 횟수와 상관없이 한 달 **$70**", "정액권은, 가는 횟수와 상관없이 한 달에 칠십 달러.", "pop"],
  ["**1회권**: 갈 때마다 **$10**", "그리고 한 번 이용권은, 갈 때마다 십 달러를 냅니다.", "pop"],
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

/* 4. 1회당 값과 놓친 돈 (카운터) */
scene({id: "loss", lines: [
  ["$70 ÷ 4.3번 = 한 번에 **약 $16**", "칠십 달러를 사 점 삼 번으로 나누면, 한 번에 약 십육 달러입니다.", "coin"],
  ["1회씩 냈다면, 가입_기간_동안 평균 **$600** 절약", "한 번씩 냈다면, 가입해 있던 동안 평균 육백 달러를 아낄 수 있었어요.", "coin"]],
  build(el, hud) {
    const c = {w: gymWorld(el)};
    const tag = (x, y, html, bg) => A(hud, x, y, `<span style="display:inline-block;background:${bg};color:#10182a;font-size:56px;font-weight:800;padding:10px 30px;border-radius:50px;box-shadow:0 10px 26px rgba(0,0,0,.4)">${html}</span>`, "", {width: "420px", textAlign: "center"});
    c.ta = tag(260, 700, "1회 $10", TEAL); c.tb = tag(620, 620, "1회 약 $16", CORAL);
    c.tb.style.left = "620px"; c.ta.style.left = "260px";
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "linear-gradient(rgba(8,12,22,.85),rgba(8,12,22,.6) 70%,rgba(8,12,22,0))", opacity: 0});
    c.big = bigNum(hud, 230, "", GOLD, 220);
    c.sub = CX(hud, 500, "가입_기간_동안 아낄 수 있었던 돈(평균)", "", {fontSize: "44px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    // 동전 비
    const sv = svgLayer(hud), r = rng(77); c.rain = [];
    for (let i = 0; i < 26; i++) {const g = S("g", {opacity: 0}, sv);
      S("ellipse", {cx: 0, cy: 6, rx: 46, ry: 46, fill: "#b37b17"}, g); S("ellipse", {cx: 0, cy: 0, rx: 46, ry: 46, fill: "#f2c14e", stroke: "#c48a1c", "stroke-width": 4}, g);
      ST(g, 0, 12, "$", {"font-size": 40, "font-weight": 800, fill: "#a8741a"});
      c.rain.push({g, x: 60 + r() * 960, d: r() * 1.4, sp: .8 + r() * .6, rot: r() * 6})}
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080);
    w.coins(lt, 4.3, -9, 7, -9); w.labA.setAttribute("opacity", 1); w.labB.setAttribute("opacity", 1);
    const out = L[1] - .1;
    ap(c.ta, lt, .3, out, {s: .6, back: true}); ap(c.tb, lt, .9, out, {s: .6, back: true});
    c.tb.style.transform += ` scale(${1 + .1 * Math.sin(Math.PI * clamp((lt - 1.3) / .4))})`;
    c.dim.style.opacity = P(lt, L[1], .4);
    countTo(c.big, lt, L[1] + .2, 0, 600, v => "$" + Math.round(v), 1.2); c.big.style.opacity = P(lt, L[1], .3);
    ap(c.sub, lt, L[1] + .5);
    c.rain.forEach(p => {const t = lt - L[1] - .2 - p.d; if (t < 0) {p.g.setAttribute("opacity", 0); return}
      const y = Math.min(1180, -60 + 900 * p.sp * t * t + 200 * t);
      p.g.setAttribute("transform", `translate(${p.x},${y}) scale(${Math.cos(t * 6 + p.rot) * .9 + .1},1)`); p.g.setAttribute("opacity", 1 - clamp((t - 2.4) / .5))});
    c.o.up(lt, {mood: lt < L[1] ? "skeptical" : "surprised", look: lt < L[1] ? [.8, -.4] : [.4, -.8]});
  }
});

/* 5. 왜? 과신 (휴게실로 이동) */
scene({id: "why", lines: [
  ["가장 유력한 설명: **과신** — “앞으로는 자주 가겠지”", "연구진이 꼽은 가장 유력한 설명은 과신입니다. 앞으로는 자주 갈 거라고 믿은 거죠.", "pop"]],
  build(el, hud) {
    const c = {w: gymWorld(el)};
    c.h = kin(hud, 150, "**과신**", 130);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 640, y: 800, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 3240, .9));
    const tc = spr((lt - .7) / .6); imgAt(w.couch, 3240 + 560, 1120, clamp(tc, 0, 1.2), 0); w.couch.style.opacity = clamp(tc * 2);
    const tz = spr((lt - 1) / .6); imgAt(w.zz, 3240 + 470, 900 + 6 * Math.sin(lt * 2), clamp(tz, 0, 1.2), 0); w.zz.style.opacity = clamp(tz * 2);
    w.bubble.setAttribute("opacity", P(lt, 1.6, .5));
    const tf = spr((lt - 2) / .6); imgAt(w.flex, 3240 + 440, 520, clamp(tf, 0, 1.2), 8 * Math.sin(lt * 4)); w.flex.style.opacity = clamp(tf * 2);
    kinUp(c.h, lt, .3);
    c.o.up(lt, {mood: lt > 2 ? "skeptical" : "normal", point: ease((lt - 1.4) / .5) * (1 - ease((lt - 3.5) / .5)), look: [.9, -.3]});
  }
});

/* 6. 마무리: 논문 카드 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈헬스장에 **가지 않기 위해** 돈 내기〉", "논문 제목은, 헬스장에 가지 않기 위해 돈 내기.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: gymWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 470);
    c.f = CX(hud, 900, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240);
    imgAt(w.couch, 3240 + 560, 1120, 1, 0); w.couch.style.opacity = 1; imgAt(w.zz, 3240 + 470, 900, 1, 0); w.zz.style.opacity = 1;
    w.bubble.setAttribute("opacity", 1); imgAt(w.flex, 3240 + 440, 520, 1, 0); w.flex.style.opacity = 1;
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
