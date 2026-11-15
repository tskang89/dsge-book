/* 오늘의 경제 012 — 조금 줄 거면 주지 마라 (v3: 부엉이 진행자·한 공간 카메라 이동·답안지·동전 기둥)
   논문: Gneezy, U. & Rustichini, A. (2000) "Pay Enough or Don't Pay at All", Quarterly Journal of Economics 115(3): 791–810.
         doi:10.1162/003355300554917
   확인(2026-11-15, 원문 PDF 는 이 세션에서 막힘 — 웹 검색 요약·강의 자료로 확인, 2차 자료 사이 소수점 차이는 정수로 반올림):
   - 지능검사 실험: 하이파 대학생 160명, 50문항. 맞힌 문제당 보상 없음 / 0.1 / 1 / 3 셰켈
     평균 정답 수 28.4 / 23.07(23.1) / 34.7 / 34.07(34.1) → 화면 28 / 23 / 35 / 34
   - 기부금 모금 실험: 고등학생이 집집마다 모금. 보상 없음 / 모금액의 1% / 10%
     모둠 평균 모금액 238.67 / 153.61(153.67) / 219.33 셰켈 → 화면 239 / 154 / 219
   - 해석(초록): 금전 보상이 과제의 의미·계약을 바꿔, 적은 보상은 보상이 없을 때보다 성과를 낮출 수 있다(비단조).
   답안지 한 장 = 정답 1개(28·23·35·34장), 동전 하나 = 10셰켈(24·15·22개, 반올림 — 화면에 표시). */
Object.assign(EP, {no: 12, style: "v2", title: "조금 줄 거면 주지 마라", hook: "보상을 조금 주면 오히려 덜 열심히 할까?",
  bgm: {seed: 141, bpm: 98, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2000, authors: "Uri Gneezy & Aldo Rustichini",
          title: "Pay Enough or Don't Pay at All", ko: "충분히 주든가, 아예 주지 마라", cite: "115(3): 791–810", url: "https://doi.org/10.1162/003355300554917"},
  yt: {title: "보상을 조금 주면 오히려 덜 열심히 한다? | 조금 줄 거면 주지 마라 #경제 #shorts",
       desc: "대학생 160명이 지능검사 문제 50개를 풀었다. 맞힌 문제마다 주는 돈을 네 가지로 나눴다: 한 푼도 없음, 아주 조금(문제당 0.1셰켈), 그 10배, 그 30배. 평균적으로 돈이 없을 때 28문제, 아주 조금 줄 때 23문제를 맞혔다. 10배나 30배를 주자 35문제와 34문제로 올랐다. 조금 주는 것은 안 주는 것보다 못했다. 고등학생들의 기부금 모금 실험에서도 모은 돈의 1%를 준 모둠이 가장 적게 모았다(모둠 평균 보상 없음 239, 1% 154, 10% 219셰켈). 연구진은 돈을 주는 순간 일의 의미가 바뀐다고 봤다. 보람으로 하던 일이 돈 받는 일이 되고, 그 돈이 적으면 의욕이 줄어든다는 것이다.",
       tags: ["경제", "행동경제학", "인센티브", "보상", "동기", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 시험 책상 | 1080 네 모둠 | 2160 답안지 더미 | 3240 동전 기둥
const GRP = [["없음", "0", "#8a96b8"], ["아주 조금", "0.1", CORAL], ["그 10배", "1", TEAL], ["그 30배", "3", BLUE]];
const SCORE = [28, 23, 35, 34], DON = [24, 15, 22];   // 동전 = 10셰켈 (239·154·219 반올림)
let WID = 0;

function classWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1f3a3a"], [1, "#2f4f4a"]]); lg("floor", [[0, "#8a6a4a"], [1, "#4a3420"]]);
  lg("board", [[0, "#24443a"], [1, "#1a3329"]]); lg("paper", [[0, "#fbf8f1"], [1, "#e6dfcf"]]);
  lg("win", [[0, "#ffe7b0", .3], [1, "#ffe7b0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 180) S("line", {x1: x, y1: 1000, x2: x - 300, y2: H, stroke: "#3a2614", "stroke-width": 3, opacity: .4}, g);
  // 칠판 띠
  S("rect", {x: 60, y: 140, width: WW - 120, height: 330, rx: 16, fill: U("board"), stroke: "#8a6a4a", "stroke-width": 16}, g);
  w.chalk = [];
  [[540, ""], [1620, "?"], [2700, "정답 수"], [3780, "기부금"]].forEach(([x, t]) =>
    w.chalk.push(ST(g, x + 300, 300, t, {"font-size": 60, "font-weight": 700, fill: "#e8f1e0", opacity: .35})));
  w.sun = [400, 1500, 2600, 3700].map(x => S("path", {d: `M${x},470 L${x + 200},470 L${x + 560},1000 L${x + 120},1000 Z`, fill: U("win")}, g));
  // 0: 시험지
  S("rect", {x: 230, y: 520, width: 620, height: 470, rx: 12, fill: "#6a4a2a"}, g);
  S("rect", {x: 330, y: 560, width: 420, height: 400, rx: 8, fill: U("paper"), transform: "rotate(-4 540 760)"}, g);
  ST(g, 540, 620, "지능검사 50문항", {"font-size": 40, "font-weight": 800, fill: "#2b2b2b", transform: "rotate(-4 540 760)"});
  for (let k = 0; k < 6; k++) S("rect", {x: 370, y: 660 + k * 44, width: [330, 280, 310, 250, 300, 220][k], height: 12, rx: 6, fill: "#c9c2b0", transform: "rotate(-4 540 760)"}, g);
  w.pencil = img(w.layer, "pencil", 700, 900, 170);
  w.hour = img(w.layer, "hourglass_done", 880, 980, 140);
  // 1080: 네 모둠 (사람 + 보상 이름표)
  w.grpP = GRP.map((gp, i) => img(w.layer, ["person", "woman", "man", "person_medium"][i], 1080 + 180 + i * 240, 960, 240));
  w.grpT = GRP.map((gp, i) => {const x = 1080 + 180 + i * 240, gg = S("g", {opacity: 0}, g);
    S("rect", {x: x - 110, y: 560, width: 220, height: 200, rx: 22, fill: "#10182a", stroke: gp[2], "stroke-width": 6}, gg);
    ST(gg, x, 640, gp[1], {"font-size": 64, "font-weight": 900, fill: gp[2]});
    ST(gg, x, 720, "셰켈", {"font-size": 34, "font-weight": 700, fill: "#e8f1ff"});
    return gg});
  w.coinsG = GRP.map((gp, i) => Array.from({length: [0, 1, 3, 5][i]}, (_, k) => img(w.layer, "coin", 1080 + 180 + i * 240 + (k - ([0, 1, 3, 5][i] - 1) / 2) * 34, 540 - k * 6, 60)));
  // 2160: 답안지 더미 (한 장 = 정답 1개)
  w.sheets = SCORE.map((s, i) => Array.from({length: s}, (_, k) =>
    S("rect", {x: 2160 + 125 + i * 240, y: 990 - (k + 1) * 13, width: 180, height: 11, rx: 3, fill: k % 2 ? "#fbf8f1" : "#e6dfcf", stroke: "#b9b19c", "stroke-width": 1.5, opacity: 0}, g)));
  w.sheetN = SCORE.map((s, i) => ST(g, 2160 + 215 + i * 240, 990 - s * 13 - 30, s + "", {"font-size": 60, "font-weight": 900, fill: GRP[i][2], opacity: 0}));
  GRP.forEach((gp, i) => ST(g, 2160 + 215 + i * 240, 1060, gp[0], {"font-size": 40, "font-weight": 800, fill: "#fff"}));
  // 3240: 동전 기둥 (동전 하나 = 10셰켈)
  const DL = [["없음", "#8a96b8"], ["1%", CORAL], ["10%", TEAL]];
  w.coins = DON.map((c, i) => Array.from({length: c}, (_, k) => {const gg = S("g", {opacity: 0}, g), x = 3240 + 290 + i * 250;
    S("ellipse", {cx: x, cy: 980 - k * 18, rx: 85, ry: 22, fill: "#b8860b"}, gg);
    S("ellipse", {cx: x, cy: 974 - k * 18, rx: 85, ry: 22, fill: GOLD, stroke: "#b8860b", "stroke-width": 3}, gg);
    return gg}));
  w.coinN = [239, 154, 219].map((v, i) => ST(g, 3240 + 290 + i * 250, 980 - DON[i] * 18 - 50, v, {"font-size": 60, "font-weight": 900, fill: DL[i][1], opacity: 0}));
  DL.forEach((dl, i) => ST(g, 3240 + 290 + i * 250, 1070, dl[0], {"font-size": 46, "font-weight": 800, fill: "#fff"}));
  w.box = img(w.layer, "red_heart", 3240 + 920, 700, 120);
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#e8f1ff", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.sun.forEach((s, i) => s.setAttribute("opacity", .7 + .3 * Math.sin(lt * 1.1 + i)));
    imgAt(w.pencil, 700 + 30 * Math.sin(lt * 5), 900 - 10 * Math.abs(Math.sin(lt * 10)), 1, -30 + 6 * Math.sin(lt * 10));
    w.grpP.forEach((p, i) => imgAt(p, 1080 + 180 + i * 240, 960 - 6 * Math.abs(Math.sin(lt * 3 + i)), 1, 0))};
  w.tags = (lt, t0) => {w.grpT.forEach((t, i) => t.setAttribute("opacity", clamp((lt - t0 - i * .35) / .3)));
    w.coinsG.forEach((cs, i) => cs.forEach((c, k) => {const u = spr((lt - t0 - i * .35 - .2 - k * .06) / .4);
      c.style.opacity = clamp(u * 2); imgAt(c, 1080 + 180 + i * 240 + (k - (cs.length - 1) / 2) * 34, 540 - k * 6, clamp(u, 0, 1.2), 0)}))};
  w.stack = (lt, t0, which) => w.sheets.forEach((ss, i) => {const tt = t0 + (which && which.indexOf(i) < 0 ? 99 : 0) + (which ? which.indexOf(i) * .3 : i * .3);
    ss.forEach((r, k) => r.setAttribute("opacity", lt > tt + k * .035 ? 1 : 0));
    w.sheetN[i].setAttribute("opacity", clamp((lt - tt - ss.length * .035) / .3))});
  w.coinUp = (lt, t0) => w.coins.forEach((cs, i) => {const tt = t0 + i * .5;
    cs.forEach((c, k) => c.setAttribute("opacity", lt > tt + k * .04 ? 1 : 0));
    w.coinN[i].setAttribute("opacity", clamp((lt - tt - cs.length * .04) / .3))});
  w.tags(-99, 0); w.stack(-99, 0); w.coinUp(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["**보상**을 조금 주면 오히려 덜 열심히 할까?", "보상을 조금 주면, 오히려 덜 열심히 할까요?", "pop"],
  ["2000년 **QJE**, 경제학자 두 사람이 발표한 논문", "이천 년, 경제학자 두 사람이 발표한 논문입니다."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.h = kin(hud, 170, "**조금** 주면<br>덜 할까?", 110);
    c.j = kin(hud, 190, "**2000** · QJE", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 실험 설계 */
scene({id: "setup", lines: [
  ["대학생 **160명**, 지능검사 문제 50개", "대학생 백육십 명이, 지능검사 문제 오십 개를 풀었습니다.", "pop"],
  ["맞힌 문제마다 주는 돈을 **네 가지**로 나눴다", "맞힌 문제마다 주는 돈을, 네 가지로 나눴죠.", "whoosh@0.2"],
  ["한_푼도_없음, **아주_조금**, 그_10배, 그_30배", "한 푼도 없음, 아주 조금, 그 열 배, 그 서른 배.", "coin"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.u = CX(hud, 1150, "맞힌 문제 하나당 (이스라엘 돈 셰켈)", "", {fontSize: "38px", fontWeight: 800, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 780, s: lt < L[1] ? lerp(1.1, 1.15, ease(lt / 3)) : 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, L[1], 0, 1080, .9));
    w.tags(lt, L[2]); ap(c.u, lt, L[2] + .2);
    c.o.up(lt, {mood: lt > L[2] ? "normal" : "normal", point: ease((lt - L[2]) / .5), look: [.8, -.5]});
  }
});

/* 3. 결과: 답안지 더미 */
scene({id: "result", lines: [
  ["평균 정답: 없음_**28문제**, 아주_조금_**23문제**", "평균적으로, 돈이 없을 때 스물여덟 문제, 아주 조금 줄 때는 스물세 문제를 맞혔습니다.", "pop"],
  ["10배·30배를 주자 **35문제·34문제**", "열 배나 서른 배를 주자, 서른다섯 문제와 서른네 문제로 올랐습니다.", "coin"],
  ["조금 주는 것은 **안 주는 것보다 못했다**", "조금 주는 것은, 안 주는 것보다 못했던 거죠.", "ding"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.u = CX(hud, 1150, "답안지 한 장 = 정답 1문제 (평균)", "", {fontSize: "36px", fontWeight: 700, color: "#fff", opacity: .8});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.04, ease((lt - L[2]) / 1.5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.stack(lt, .9, [0, 1]);
    if (lt > L[1]) w.sheets.forEach((ss, i) => {if (i > 1) {const tt = L[1] + .2 + (i - 2) * .4; ss.forEach((r, k) => r.setAttribute("opacity", lt > tt + k * .035 ? 1 : 0));
      w.sheetN[i].setAttribute("opacity", clamp((lt - tt - ss.length * .035) / .3))}});
    else w.sheets.forEach((ss, i) => {if (i > 1) {ss.forEach(r => r.setAttribute("opacity", 0)); w.sheetN[i].setAttribute("opacity", 0)}});
    ap(c.u, lt, 1.2);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : lt > 2.5 && lt < L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 기부금 모금 */
scene({id: "donate", lines: [
  ["고등학생 **기부금 모금** 실험에서도 마찬가지", "고등학생들의 기부금 모금 실험에서도 마찬가지였습니다.", "whoosh@0.2"],
  ["모은 돈의 **1%**를 준 모둠이 **가장 적게** 모았다", "모은 돈의 일 퍼센트를 준 모둠이, 가장 적게 모았죠.", "coin"]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.u = CX(hud, 1150, "모둠 평균 모금액 (셰켈) · 동전 1개 ≈ 10셰켈", "", {fontSize: "36px", fontWeight: 700, color: "#fff", opacity: .8});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1.02, 1.06, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.coinUp(lt, 1); ap(c.u, lt, 1.6);
    imgAt(w.box, 3240 + 920, 700 - 14 * Math.abs(Math.sin(lt * 3)), clamp(spr((lt - .9) / .5), 0, 1.2), 0);
    c.o.up(lt, {mood: lt > L[1] + .5 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 해석 */
scene({id: "why", lines: [
  ["연구진의 해석: 돈을 주는 순간 **일의 의미**가 바뀐다", "연구진은, 돈을 주는 순간 일의 의미가 바뀐다고 봤습니다.", "pop"],
  ["**돈_받는_일**이 되고, 돈이 적으면 의욕이 준다", "보람으로 하던 일이 돈 받는 일이 되고, 그 돈이 적으면 의욕이 줄어든다는 거죠."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.5)"});
    c.a = img(hud, "red_heart", 300, 760, 220); c.b = img(hud, "coin", 780, 760, 220); c.s = img(hud, "disappointed_face", 780, 1060, 170);
    c.ar = CX(hud, 560, "→", "", {fontSize: "150px", fontWeight: 900, color: GOLD});
    c.l1 = A(hud, 160, 800, "보람", "", {width: "280px", textAlign: "center", fontSize: "52px", fontWeight: 800, color: "#fff"});
    c.l2 = A(hud, 640, 800, "돈 받는 일", "", {width: "280px", textAlign: "center", fontSize: "52px", fontWeight: 800, color: GOLD});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.box.style.opacity = 0;
    c.dim.style.opacity = P(lt, 0, .5);
    const ta = spr((lt - .4) / .5), tb = spr((lt - L[1] + .1) / .5), ts = spr((lt - L[1] - 2) / .5);
    imgAt(c.a, 300, 760, clamp(ta, 0, 1.2), 0); c.a.style.opacity = clamp(ta * 2) * (1 - .5 * P(lt, L[1], .5));
    ap(c.l1, lt, .6); ap(c.ar, lt, L[1] - .2); ap(c.l2, lt, L[1] + .2);
    imgAt(c.b, 780, 760, clamp(tb, 0, 1.2), 8 * Math.sin(lt * 3)); c.b.style.opacity = clamp(tb * 2);
    imgAt(c.s, 780, 1060, clamp(ts, 0, 1.2), 0); c.s.style.opacity = clamp(ts * 2);
    c.o.up(lt, {mood: lt > L[1] + 2 ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**충분히_주든가, 아예_주지_마라**〉", "논문 제목은, 충분히 주든가 아예 주지 마라 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: classWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 980, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 2160, 1)); w.stack(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
