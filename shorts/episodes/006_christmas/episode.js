/* 오늘의 경제 006 — 크리스마스 선물의 사중손실 (v3: 부엉이 진행자·한 공간 카메라 이동·동전 기둥)
   논문: Waldfogel, J. (1993) "The Deadweight Loss of Christmas", American Economic Review 83(5): 1328–1336.
   숫자 확인(2026-11-14): List & Shogren (1998) "The Deadweight Loss of Christmas: Comment", AER 88(5): 1350–1355 의 Table 2 가
     Waldfogel (1993) 값을 옮겨 실음 — 대상 58명, 선물 278개, 받은 사람이 매긴 값/선물값 평균 87.1%(학생별 평균), 83.9%(선물별).
     본문: "his average recipient valued her gifts at 87 percent of the cost".
   - 반론: List & Shogren(1998)은 적어 낸 값에 선물을 실제로 사 가는 경매(random nth price)로 다시 재어 선물값의 121~135% 를 얻음(가상 질문에선 약 99~101%).
     → 반론은 설명에 두 문장 이상 들어 영상에선 빼고(사용자 지시) 설명란에 적는다. 영상은 '설문에서'로 측정 방식을 밝힌다.
   - 금액(10만 원 선물 → 약 8만 7천 원, 사라진 약 1만 3천 원)은 87% 를 원화로 옮긴 **예시**. 논문은 달러·미국 대학생.
   - 동전 1개 = 1만 원. 10개 vs 8.7개, 반론은 12.1~13.5개. */
Object.assign(EP, {no: 6, style: "v2", title: "크리스마스 선물의 사중손실", hook: "크리스마스 선물은 가치를 없앤다?",
  bgm: {seed: 77, bpm: 108, mood: "bright"},
  paper: {journal: "American Economic Review", year: 1993, authors: "Joel Waldfogel",
          title: "The Deadweight Loss of Christmas", ko: "크리스마스의 사중손실", cite: "83(5): 1328–1336",
          url: "https://ideas.repec.org/a/aea/aecrev/v83y1993i5p1328-36.html"},
  yt: {title: "크리스마스 선물은 가치를 없앤다? | 크리스마스의 사중손실 #경제 #shorts",
       desc: "예일대 학생 58명이 크리스마스에 받은 선물 278개. 준 사람이 낸 값(짐작)과, 선물에 담긴 마음은 빼고 현금 얼마면 똑같이 좋을지를 물었다. 받은 사람이 매긴 값은 평균 선물값의 약 87%였다 — 10만 원을 들인 선물이 받는 사람에겐 약 8만 7천 원어치(원화 금액은 예시). 사라진 차이를 경제학에서는 사중손실(deadweight loss)이라 부른다. (설문 기준) 다만 후속 연구(List & Shogren 1998, AER)가 학생들이 적어 낸 값에 선물을 실제로 사 가는 경매로 다시 재자 선물값의 121~135%로 나와, 말로만 묻느냐 실제로 파느냐에 따라 답이 달라졌다.",
       tags: ["경제", "사중손실", "deadweightloss", "크리스마스", "선물", "미시경제학", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 거실 | 1080 설문 | 2160 동전 비교 | 3240 현금
let WID = 0;
const CX2 = [2160 + 330, 2160 + 760];  // 동전 기둥 두 개(구역 안 x: 330, 760)

function homeWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#3a1b24"], [1, "#5a2a2e"]]); lg("floor", [[0, "#7a4a2a"], [1, "#2e1a10"]]);
  lg("night", [[0, "#0d1a3a"], [1, "#2a3d6e"]]); lg("brick", [[0, "#9a4a36"], [1, "#6a2e22"]]);
  lg("glow", [[0, "#ffcf7a", .5], [1, "#ffcf7a", 0]]); lg("paper", [[0, "#fbf8f1"], [1, "#e6dfcf"]]);
  lg("coinT", [[0, "#fff1a8"], [.5, "#f2c14e"], [1, "#d9a32e"]], {x2: 1, y2: 0}); lg("coinS", [[0, "#c48a1c"], [1, "#8f6210"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("wall")}, g);
  for (let x = 0; x < WW; x += 90) S("line", {x1: x, y1: 0, x2: x, y2: 900, stroke: "#2a1018", "stroke-width": 3, opacity: .35}, g);
  // 창(눈 내리는 밤)
  w.snow = [];
  const r0 = rng(n * 9 + 4);
  [].forEach(([a, b]) => {
    S("rect", {x: a, y: 170, width: b - a, height: 360, rx: 16, fill: U("night")}, g);
    for (let k = 0; k < 26; k++) w.snow.push({x0: a + 10 + r0() * (b - a - 20), y0: 170 + r0() * 360, a, s: .5 + r0(), e: S("circle", {r: 3 + r0() * 4, fill: "#fff", opacity: .85}, g)});
    S("rect", {x: a, y: 170, width: b - a, height: 360, rx: 16, fill: "none", stroke: "#e9d3a8", "stroke-width": 14}, g);
    S("line", {x1: (a + b) / 2, y1: 170, x2: (a + b) / 2, y2: 530, stroke: "#e9d3a8", "stroke-width": 10}, g)});
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("floor")}, g);
  for (let i = 0; i < 9; i++) S("line", {x1: 0, y1: 920 + i * 40 + i * i * 6, x2: WW, y2: 920 + i * 40 + i * i * 6, stroke: "#2a1608", "stroke-width": 3, opacity: .4}, g);
  // 가랜드 전구
  w.bulbs = [];
  for (let s = 0; s < 4; s++) {const x0 = s * 1080 + 30, x1 = x0 + 1020;
    S("path", {d: `M${x0},120 Q${(x0 + x1) / 2},200 ${x1},120`, stroke: "#2f5a36", "stroke-width": 10, fill: "none"}, g);
    for (let k = 0; k < 14; k++) {const t = (k + .5) / 14, x = lerp(x0, x1, t), y = 120 + 80 * 4 * t * (1 - t) * .5 * 2 / 2 + 14;
      w.bulbs.push({e: S("circle", {cx: x, cy: y, r: 13, fill: [RED, GOLD, BLUE, TEAL][k % 4]}, g), k})}}
  // 거실: 벽난로·트리·선물
  S("rect", {x: 560, y: 560, width: 460, height: 400, rx: 10, fill: U("brick")}, g);
  for (let yy = 590; yy < 960; yy += 40) S("line", {x1: 560, y1: yy, x2: 1020, y2: yy, stroke: "#4a1e16", "stroke-width": 3, opacity: .6}, g);
  S("rect", {x: 530, y: 530, width: 520, height: 46, rx: 8, fill: "#e9d3a8"}, g);
  S("rect", {x: 660, y: 700, width: 260, height: 260, rx: 120, fill: "#1a0c08"}, g);
  w.fglow = S("ellipse", {cx: 790, cy: 920, rx: 260, ry: 120, fill: U("glow")}, g);
  w.fire = img(w.layer, "fire", 790, 950, 200);
  w.tree = img(w.layer, "christmas_tree", 300, 1130, 520);
  w.gifts = [[200, 1170, 150], [380, 1190, 170], [560, 1160, 130]].map(([x, y, s]) => ({e: img(w.layer, "wrapped_gift", x, y, s), x, y}));
  // 설문 구역: 칠판 + 학생들
  S("rect", {x: 1080 + 110, y: 330, width: 860, height: 560, rx: 24, fill: "#1f3a2c", stroke: "#a87a4a", "stroke-width": 16}, g);
  ST(g, 1080 + 540, 420, "설문", {"font-size": 60, "font-weight": 800, fill: "#fbf8f1"});
  w.q1 = ST(g, 1080 + 540, 530, "① 준 사람이 낸 값은? (짐작)", {"font-size": 54, "font-weight": 800, fill: "#fbf8f1", opacity: 0});
  w.q2 = ST(g, 1080 + 540, 660, "② 현금 얼마면 똑같이 좋을까?", {"font-size": 54, "font-weight": 800, fill: GOLD, opacity: 0});
  w.q3 = ST(g, 1080 + 540, 800, "※ 선물에 담긴 마음은 빼고", {"font-size": 48, "font-weight": 800, fill: CORAL, opacity: 0});
  w.studs = ["person", "woman", "man", "person_light", "person_medium", "woman"].map((k, i) => ({e: img(w.layer, k, 1080 + 260 + i * 105, 1140, 200), x: 1080 + 260 + i * 105}));
  w.sg = img(w.layer, "wrapped_gift", 1080 + 880, 1150, 170);
  // 동전 구역
  w.colL = []; w.colR = [];
  const mkCoin = (par, x, a) => {const c = S("g", {opacity: 0}, par);
    S("ellipse", {cx: x, cy: 14, rx: 92, ry: 30, fill: U("coinS")}, c);
    S("rect", {x: x - 92, y: 0, width: 184, height: 14, fill: U("coinS")}, c);
    S("ellipse", {cx: x, cy: 0, rx: 92, ry: 30, fill: U("coinT"), stroke: "#c48a1c", "stroke-width": 3}, c);
    ST(c, x, 11, "1만", {"font-size": 30, "font-weight": 800, fill: "#a8741a"}); return c};
  const gl = S("g", {}, g), gr = S("g", {}, g);
  for (let i = 0; i < 14; i++) {w.colL.push(mkCoin(gl, CX2[0])); w.colR.push(mkCoin(gr, CX2[1]))}
  const cp = S("clipPath", {id: id("part")}, d); w.partR = S("rect", {x: CX2[1] - 92, y: -40, width: 0, height: 80}, cp);
  w.part = S("g", {"clip-path": U("part")}, gr); mkCoin(w.part, CX2[1]).setAttribute("opacity", 1);
  w.ghost = S("g", {opacity: 0}, g);   // 사라진 몫: 점선 틀
  w.labL = ST(g, CX2[0], 1150, "준 사람이 쓴 돈", {"font-size": 42, "font-weight": 800, fill: TEAL, opacity: 0});
  w.labR = ST(g, CX2[1], 1150, "받은 사람이 매긴 값", {"font-size": 42, "font-weight": 800, fill: GOLD, opacity: 0});
  // 현금·반론 구역
  w.cash = [0, 1, 2].map(i => img(w.layer, "dollar_banknote", 3240 + 380 + i * 160, 900 - i * 30, 220));
  // 앞쪽(흐린) 겨우살이 장식: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("line", {x1: x, y1: 0, x2: x, y2: 80, stroke: "#1a0c10", "stroke-width": 6}, fs);
    S("circle", {cx: x, cy: 120, r: 46, fill: "#2f6a3a"}, fs); S("circle", {cx: x - 18, cy: 140, r: 14, fill: RED}, fs); S("circle", {cx: x + 16, cy: 146, r: 14, fill: RED}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {
    w.snow.forEach((p, i) => {const y = 170 + ((p.y0 - 170 + lt * 60 * p.s) % 360); p.e.setAttribute("cx", p.x0 + 8 * Math.sin(lt + i)); p.e.setAttribute("cy", y)});
    w.bulbs.forEach(b => b.e.setAttribute("opacity", .55 + .45 * Math.abs(Math.sin(lt * 2 + b.k * 1.3))));
    w.fglow.setAttribute("opacity", .8 + .2 * Math.sin(lt * 7)); imgAt(w.fire, 790, 950, 1 + .04 * Math.sin(lt * 9), 0);
  };
  // 동전 기둥: 왼쪽 nL, 오른쪽 nR(소수는 조각), 투명도 aR(반론 범위 표시용)
  w.coins = (lt, nL, tL, nR, tR, gap) => {
    gap = gap || .1; const base = 1060;
    const drop = (c, i, t) => {const u = clamp((lt - t) / .4), y = base - i * 34 - (1 - eback(u)) * 380;
      c.setAttribute("transform", `translate(0,${y})`); c.setAttribute("opacity", u > 0 ? 1 : 0)};
    w.colL.forEach((c, i) => i < nL ? drop(c, i, tL + i * gap) : c.setAttribute("opacity", 0));
    w.colR.forEach((c, i) => i < Math.floor(nR) ? drop(c, i, tR + i * gap) : c.setAttribute("opacity", 0));
    const fr = nR - Math.floor(nR), i = Math.floor(nR);
    if (fr > 0) {const u = clamp((lt - tR - i * gap) / .4); w.partR.setAttribute("width", 184 * fr);
      w.part.setAttribute("transform", `translate(0,${base - i * 34 - (1 - eback(u)) * 380})`); w.part.setAttribute("opacity", u > 0 ? 1 : 0)}
    else w.part.setAttribute("opacity", 0);
  };
  w.coins(-99, 0, 0, 0, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
const pill = (hud, y, html, bg, fs) => CX(hud, y, `<span style="display:inline-block;background:${bg};color:#10182a;padding:8px 34px;border-radius:50px;box-shadow:0 10px 26px rgba(0,0,0,.4)">${html}</span>`, "", {fontSize: (fs || 60) + "px", fontWeight: 800});

/* 1. 질문 (거실) */
scene({id: "hook", lines: [
  ["크리스마스 선물은 **가치를 없앤다**?", "크리스마스 선물이, 오히려 가치를 없앤다는 논문이 있습니다.", "pop"],
  ["1993년 **AER**, 왈드포겔의 논문", "천구백구십삼 년, 경제학자 왈드포겔의 논문입니다."]],
  build(el, hud) {
    const c = {w: homeWorld(el)};
    c.h = kin(hud, 250, "선물이<br>**가치를 없앤다**?", 100);
    c.j = kin(hud, 280, "**1993** · AER", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    w.gifts.forEach((o, i) => {const t = spr((lt - .3 - i * .15) / .5); imgAt(o.e, o.x, o.y, clamp(t, 0, 1.2), 6 * Math.sin(lt * 2 + i)); o.e.style.opacity = clamp(t * 2)});
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 설문 (칠판) */
scene({id: "survey", lines: [
  ["예일대생 **58명**, 받은 선물 **278개**", "미국 예일대 학생 오십팔 명에게, 크리스마스에 받은 선물 이백칠십팔 개에 대해 물었어요.", "pop"],
  ["① 준 사람이 **얼마를 냈을지** 짐작", "첫째, 준 사람이 얼마를 냈을지 짐작해서 적게 했어요."],
  ["② 현금 **얼마면** 이 선물과 똑같이 좋을지", "둘째, 선물 대신 현금 얼마면 똑같이 좋을지 적게 했습니다."],
  ["단, 선물에 담긴 **마음은 빼고**", "이때 선물에 담긴 마음은 빼고 생각하게 했죠."]],
  build(el, hud) {
    const c = {w: homeWorld(el)};
    c.n = bigNum(hud, 150, "", GOLD, 120);
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 800, s: lerp(1, 1.05, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    w.studs.forEach((o, i) => {const t = spr((lt - .7 - i * .1) / .5); imgAt(o.e, o.x, 1140 - 8 * Math.abs(Math.sin(lt * 3 + i)), clamp(t, 0, 1.2), 0); o.e.style.opacity = clamp(t * 2)});
    const tg = spr((lt - 1.4) / .5); imgAt(w.sg, 1080 + 880, 1150, clamp(tg, 0, 1.2), 8 * Math.sin(lt * 3)); w.sg.style.opacity = clamp(tg * 2);
    c.n.innerHTML = `${Math.round(lerp(0, 58, ease((lt - .6) / 1)))}명 · 선물 ${Math.round(lerp(0, 278, ease((lt - 1) / 1.2)))}개`; c.n.style.opacity = P(lt, .6, .3);
    w.q1.setAttribute("opacity", P(lt, L[1] + .2, .3)); w.q2.setAttribute("opacity", P(lt, L[2] + .2, .3)); w.q3.setAttribute("opacity", P(lt, L[3] + .2, .3));
    c.o.up(lt, {mood: lt > L[3] ? "skeptical" : "normal", point: lt > L[1] ? ease((lt - L[1]) / .4) : 0, look: [.8, -.4]});
  }
});

/* 3. 결과: 87% → 10만 원이면 약 8만 7천 원 → 사중손실 (동전) */
scene({id: "result", lines: [
  ["설문 결과: 받은 사람이 매긴 값은 선물값의 평균 **약 87%**", "두 답을 비교하니, 받은 사람이 매긴 값은 평균적으로 선물값의 약 팔십칠 퍼센트였습니다.", "ding"],
  ["예: 10만 원 선물 → 받는 사람에겐 **약 8만 7천 원**", "예를 들어 십만 원을 들인 선물이, 받는 사람에겐 약 팔만 칠천 원의 가치였던 거죠.", "coin"],
  ["사라진 **약 1만 3천 원** = 사중손실(Deadweight Loss)", "사라진 만 삼천 원 정도를, 경제학에서는 사중손실이라고 부릅니다.", "pop"]],
  build(el, hud) {
    const c = {w: homeWorld(el)};
    c.big = bigNum(hud, 150, "약 87%", GOLD, 150);
    c.ex = CX(hud, 330, `<span style="border:3px solid #fff;border-radius:30px;padding:4px 24px">예시 · 동전 1개 = 1만 원</span>`, "", {fontSize: "40px", fontWeight: 800, color: "#fff"});
    c.loss = A(hud, 560, 470, "사라진 약 1만 3천 원", "", {width: "400px", textAlign: "center", fontSize: "44px", fontWeight: 800, color: RED, textShadow: "0 4px 0 rgba(0,0,0,.4)"});
    c.dl = pill(hud, 180, "사중손실<br><span style='font-size:44px'>Deadweight Loss</span>", RED, 80);
    c.smoke = img(hud, "fire", 760, 640, 130);
    c.o = host(hud, "owl", {x: 545, y: 1275, s: .5});
    return c;
  },
  cam(lt, L) {const z = ease((lt - L[2]) / 1); return {x: 540, y: 820, s: lerp(1, 1.05, z)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    ap(c.big, lt, .9, L[1] - .1, {s: .5, back: true});
    w.labL.setAttribute("opacity", P(lt, L[1] + .2, .3)); w.labR.setAttribute("opacity", P(lt, L[1] + 1.4, .3));
    ap(c.ex, lt, L[1] + .1, L[2] - .1, {s: .7});
    w.coins(lt, lt < L[1] ? 0 : 10, L[1] + .3, lt < L[1] ? 0 : 8.7, L[1] + 1.5, .09);
    // 사라진 1.3개: 오른쪽 기둥 위 빈자리에 불꽃
    const tl = spr((lt - L[2] - .2) / .5);
    imgAt(c.smoke, 760, 690 - 20 * Math.sin(lt * 4), clamp(tl, 0, 1.2), 0); c.smoke.style.opacity = clamp(tl * 2) * .9;
    ap(c.loss, lt, L[2] + .4, null, {s: .6, back: true});
    ap(c.dl, lt, L[2] + 1.6, null, {s: .5, back: true});
    c.o.up(lt, {mood: lt > L[2] ? "surprised" : "normal", look: [.8, -.5]});
  }
});

/* 4. 왜? 취향, 그리고 현금 (현금 구역) */
scene({id: "why", lines: [
  ["준 사람은 받는 사람의 **취향**을 다 모른다", "준 사람이 받는 사람의 취향을 다 알 수는 없기 때문이죠.", "pop"],
  ["**현금**이면 이런 손실이 없다", "현금이면 받는 사람이 알아서 고르니, 이런 손실이 없습니다.", "coin"]],
  build(el, hud) {
    const c = {w: homeWorld(el)};
    c.h = kin(hud, 280, "**취향**은<br>본인이 제일 잘 안다", 92);
    c.h2 = kin(hud, 300, "**현금**은 손실 0", 110);
    c.th = img(hud, "thinking", 760, 820, 220);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 850, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    const tt = spr((lt - .8) / .5); imgAt(c.th, 760, 820, clamp(tt, 0, 1.2) * (1 - P(lt, L[1], .3)), 6 * Math.sin(lt * 2)); c.th.style.opacity = clamp(tt * 2) * (1 - P(lt, L[1], .3));
    kinUp(c.h, lt, .4, L[1] - .2); kinUp(c.h2, lt, L[1] + .1);
    w.cash.forEach((e, i) => {const t = spr((lt - L[1] - .3 - i * .2) / .5); imgAt(e, 3240 + 380 + i * 160, 900 - i * 30 - 10 * Math.sin(lt * 3 + i), clamp(t, 0, 1.2), -10 + i * 10); e.style.opacity = clamp(t * 2)});
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", point: lt > L[1] ? ease((lt - L[1]) / .4) : 0, look: [.8, -.4]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈크리스마스의 **사중손실**〉", "논문 제목은, 크리스마스의 사중손실입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: homeWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 420);
    c.f = CX(hud, 960, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
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
