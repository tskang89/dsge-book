/* 오늘의 경제 029 — 노예무역과 불신 (v3: 부엉이 진행자·한 공간 카메라 이동·해안 마을·설문·신뢰 막대·세대 사슬)
   논문: Nunn, N. & Wantchekon, L. (2011) "The Slave Trade and the Origins of Mistrust in Africa",
         American Economic Review 101(7): 3221–3252. doi:10.1257/aer.101.7.3221
   확인(2026-11-17, 원문 PDF 는 이 세션에서 막힘 — 초록·NBER 판 요약·검색 요약으로 확인):
   - 개인 설문(2005년 아프로바로미터)과 부족(민족 집단)별 노예 반출 기록을 결합
   - 조상이 노예무역 때 많이 약탈당한 사람일수록 오늘날 덜 믿음: 이웃·친척·지방 정부(NBER 판)
   - 도구변수: 조상 거주지의 바닷가 거리(현재 거리는 통제)
   - 경로: 대부분 개인 내부 요인(문화적 규범·믿음·가치)
   - 후속 재현(Zanella 2025): 같은 자료로 같은 결과, 2008년 자료로도 확인 → 설명란
   - 나라 수·응답자 수는 출처마다 달라 쓰지 않음. 신뢰 막대는 방향만 나타냄(숫자 없음). */
Object.assign(EP, {no: 29, style: "v2", title: "노예무역과 불신", hook: "수백 년 전 노예무역이, 오늘의 신뢰를 낮췄을까?",
  bgm: {seed: 3221, bpm: 90, mood: "calm"},
  paper: {journal: "American Economic Review", year: 2011, authors: "Nathan Nunn & Leonard Wantchekon",
          title: "The Slave Trade and the Origins of Mistrust in Africa", ko: "노예무역과 아프리카 불신의 기원",
          cite: "101(7): 3221–3252", url: "https://doi.org/10.1257/aer.101.7.3221"},
  yt: {title: "수백 년 전 노예무역이 오늘의 신뢰를 낮췄을까? | 불신의 기원 #경제 #shorts",
       desc: "15세기부터 19세기까지 아프리카에서는 수많은 사람이 노예로 끌려갔다. 이웃이나 심지어 친척에게 붙잡혀 팔려 가는 일도 있었다. 연구진은 2005년 아프리카 여러 나라의 설문(아프로바로미터)과 부족별로 끌려간 노예 수 기록을 맞대어 봤다. 그 결과 조상이 노예로 많이 끌려간 부족의 사람일수록 오늘날 남을 덜 믿었다. 친척도, 이웃도, 지방 정부도. 혹시 원래 남을 덜 믿던 부족이 더 많이 끌려간 건 아닐까? 연구진은 조상이 바닷가에서 얼마나 가까이 살았는지를 이용해 따져 봤는데, 그래도 같은 결론이 나왔다. 연구진은 이 불신이 주로 사람들의 믿음과 문화로 대대로 이어져 왔다고 봤다. (후속 재현 연구도 같은 결과를 확인했다. 영상의 신뢰 막대는 방향만 나타낸 그림이다.)",
       tags: ["경제", "경제사", "신뢰", "노예무역", "아프리카", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 해안과 배 | 1080 마을들(해안 거리) | 2160 설문·신뢰 막대 | 3240 세대 사슬
let WID = 0;

function coastWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#3a2a4a"], [.6, "#a0604a"], [1, "#d8a06a"]]); lg("sea", [[0, "#2a5a7a"], [1, "#0e2a3e"]]);
  lg("land", [[0, "#b0884a"], [1, "#5a3e20"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("rect", {x: 0, y: 860, width: 520, height: 140, fill: U("sea")}, g);
  S("path", {d: `M520,1000 Q480,920 540,860 L${WW},860 L${WW},1000 Z`, fill: U("land")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: "#3a2814"}, g);
  w.waves = Array.from({length: 2}, () => S("path", {d: "", stroke: "#cfefff", "stroke-width": 4, fill: "none", opacity: .35}, g));
  // 0: 배와 바닷가
  w.ship = img(w.layer, "sailboat", 260, 930, 300);
  w.era = ST(g, 540, 300, "15~19세기", {"font-size": 72, "font-weight": 900, fill: "#fff", opacity: 0});
  w.walk = Array.from({length: 6}, (_, i) => img(w.layer, "person", 900 - i * 70, 990, 120));
  // 1080: 바닷가에서 먼 마을들
  w.huts = [[1080 + 180, "가까운 마을"], [1080 + 540, ""], [1080 + 900, "먼 마을"]].map(([x, t]) => {
    const h = img(w.layer, "hut", x, 980, 200); if (t) ST(g, x, 1060, t, {"font-size": 40, "font-weight": 900, fill: "#fff"}); return h});
  w.arrow = S("path", {d: `M${1080 + 900},700 L${1080 + 140},700`, stroke: "#fff", "stroke-width": 6, "stroke-dasharray": "16 12", fill: "none", opacity: 0}, g);
  w.arrowLab = ST(g, 1080 + 540, 660, "바닷가에서의 거리", {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0});
  // 2160: 설문 + 신뢰 막대(방향만)
  w.clip = img(w.layer, "clipboard", 2160 + 540, 470, 200);
  w.bars = [["적게 끌려간\n부족", TEAL, 2160 + 330, 420], ["많이 끌려간\n부족", CORAL, 2160 + 750, 250]].map(([t, col, x, h]) => {
    const r = S("rect", {x: x - 110, y: 960, width: 220, height: 0, rx: 14, fill: col, opacity: .9}, g);
    const lab = t.split("\n").map((s, k) => ST(g, x, 1030 + k * 44, s, {"font-size": 40, "font-weight": 900, fill: "#fff", opacity: 0}));
    return {r, lab, h}});
  w.bTitle = ST(g, 2160 + 540, 480, "오늘날 남을 믿는 정도", {"font-size": 48, "font-weight": 900, fill: GOLD, opacity: 0});
  w.bNote = ST(g, 2160 + 540, 1140, "방향만 나타낸 그림", {"font-size": 32, "font-weight": 700, fill: "#e8e0d0", opacity: 0});
  w.trust = ["친척", "이웃", "지방 정부"].map((t, i) => ST(g, 2160 + 750, 300 + i * 0, t, {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0}));
  // 3240: 세대 사슬
  w.gen = [["older_person", 3240 + 200], ["person_face", 3240 + 540], ["boy", 3240 + 880]].map(([k, x]) => img(w.layer, k, x, 980, k === "boy" ? 190 : 210));
  w.links = [0, 1].map(i => S("path", {d: `M${3240 + 280 + i * 340},820 Q${3240 + 370 + i * 340},740 ${3240 + 460 + i * 340},820`, stroke: GOLD, "stroke-width": 8, fill: "none", "marker-end": "", opacity: 0}, g));
  w.cloud = S("ellipse", {cx: 3240 + 200, cy: 560, rx: 120, ry: 60, fill: "#5a5a6a", opacity: 0}, g);
  w.cloudT = ST(g, 3240 + 200, 575, "불신", {"font-size": 48, "font-weight": 900, fill: "#fff", opacity: 0});
  // 앞쪽(흐린) 야자잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {for (let j = 0; j < 5; j++) S("path", {d: `M${x},0 Q${x - 120 + j * 60},90 ${x - 200 + j * 100},140`, stroke: "#1a2a14", "stroke-width": 22, fill: "none", "stroke-linecap": "round"}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.waves.forEach((p, i) => {const y = 905 + i * 50; let s = `M0,${y}`; for (let x = 0; x <= 490; x += 25) s += ` L${x},${y + 8 * Math.sin(x / 50 + lt * 2 + i)}`; p.setAttribute("d", s)});
    imgAt(w.ship, 260, 930 + 6 * Math.sin(lt * 1.5), 1, 2 * Math.sin(lt))};
  w.march = (lt, t0) => {w.era.setAttribute("opacity", P(lt, t0, .3));
    w.walk.forEach((e, i) => {const u = clamp((lt - t0 - i * .3) / 4); imgAt(e, lerp(900 - i * 70, 560, u), 990, 1, 0); e.style.opacity = (lt > t0 + i * .3 ? 1 : 0) * (1 - P(lt, t0 + 3.6 + i * .3, .4)) * .85})};
  w.dist = (lt, t0) => {w.arrow.setAttribute("opacity", P(lt, t0, .3)); w.arrowLab.setAttribute("opacity", P(lt, t0 + .2, .3));
    if (lt > t0) w.arrow.style.strokeDashoffset = -lt * 40};
  w.survey = (lt, t0) => {const u = spr((lt - t0) / .5); imgAt(w.clip, 2160 + 540, 470, clamp(u, 0, 1.2) * (1 - P(lt, t0 + 2.2, .3)), -6); w.clip.style.opacity = clamp(u * 2)};
  w.grow = (lt, t0) => {w.bTitle.setAttribute("opacity", P(lt, t0, .3)); w.bNote.setAttribute("opacity", P(lt, t0, .3));
    w.bars.forEach((b, j) => {const u = ease((lt - t0 - j * .6) / .8), h = b.h * u; b.r.setAttribute("y", 960 - h); b.r.setAttribute("height", h);
      b.lab.forEach(l => l.setAttribute("opacity", P(lt, t0 + j * .6, .3)))})};
  w.who = (lt, t0) => w.trust.forEach((t, i) => {t.setAttribute("opacity", P(lt, t0 + i * .5, .25) * (1 - P(lt, t0 + i * .5 + .5, .2)) ); t.setAttribute("y", 640)});
  w.chain = (lt, t0) => {w.links.forEach((l, i) => l.setAttribute("opacity", P(lt, t0 + .6 + i * .6, .3)));
    const u = clamp((lt - t0) / 2.4); const cx = lerp(3240 + 200, 3240 + 880, ease(u));
    w.cloud.setAttribute("cx", cx); w.cloudT.setAttribute("x", cx); [w.cloud, w.cloudT].forEach(e => e.setAttribute("opacity", P(lt, t0, .3) * (e === w.cloud ? .9 : 1)))};
  w.march(-99, 99); w.dist(-99, 99); w.survey(-99, 99); w.grow(-99, 99); w.who(-99, 99); w.chain(-99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["수백 년 전 **노예무역**이 오늘의 신뢰를 낮췄을까?", "수백 년 전 노예무역이, 오늘날 사람들의 신뢰를 낮췄을까요?", "pop"],
  ["2011년 **AER**에 실린 논문", "이천십일 년에 나온 논문입니다."],
  ["저자: 넌_교수와 완체콘_교수", "저자는, 넌 교수, 그리고 완체콘 교수입니다."]],
  build(el, hud) {
    const c = {w: coastWorld(el)};
    c.h = kin(hud, 120, "노예무역과 **오늘의 신뢰**?", 80);
    c.j = kin(hud, 120, "**2011** · AER", 96);
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

/* 2. 역사 */
scene({id: "history", lines: [
  ["15~19세기 아프리카: **수많은 사람**이 노예로 끌려갔다", "십오 세기부터 십구 세기까지, 아프리카에서는, 수많은 사람이 노예로 끌려갔습니다.", "pop"],
  ["이웃이나 친척에게 **붙잡혀 팔려 가는** 일도 있었다", "이웃이나 심지어 친척에게, 붙잡혀 팔려 가는 일도 있었죠."]],
  build(el, hud) {
    const c = {w: coastWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1.02, 1.08, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.march(lt, .4);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 3. 자료와 결과 */
scene({id: "result", lines: [
  ["2005년 아프리카 **여러 나라 설문** + 부족별 노예 수 기록", "연구진은, 이천오 년 아프리카 여러 나라의 설문과, 부족별로 끌려간 노예 수 기록을, 맞대어 봤습니다.", "whoosh@0.2"],
  ["조상이 많이 끌려간 부족일수록 **오늘날 덜 믿었다**", "그 결과, 조상이 노예로 많이 끌려간 부족의 사람일수록, 오늘날 남을 덜 믿었습니다.", "ding"],
  ["**친척도, 이웃도, 지방 정부도**", "친척도, 이웃도, 지방 정부도요."]],
  build(el, hud) {
    const c = {w: coastWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 720, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 2160, 1.1)); w.survey(lt, 1.2); w.grow(lt, L[1] + .3); w.who(lt, L[2]);
    c.o.up(lt, {mood: lt > L[1] + 1 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 반론 점검 */
scene({id: "check", lines: [
  ["혹시 **원래 덜 믿던** 부족이 더 끌려간 건 아닐까?", "혹시 원래 남을 덜 믿던 부족이, 더 많이 끌려간 건 아닐까요?", "pop"],
  ["**바닷가와의 거리**로 따져 봐도 같은 결론", "연구진은 조상이 바닷가에서 얼마나 가까이 살았는지를 이용해 따져 봤는데, 그래도 같은 결론이 나왔습니다."]],
  build(el, hud) {
    const c = {w: coastWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 1080, .9)); w.grow(99, 0); w.dist(lt, L[1] + .3);
    c.o.up(lt, {mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 5. 경로 */
scene({id: "culture", lines: [
  ["불신이 **믿음과 문화**로 대대로 이어졌다", "연구진은, 이 불신이 주로 사람들의 믿음과 문화로, 대대로 이어져 왔다고 봤습니다.", "ding"]],
  build(el, hud) {
    const c = {w: coastWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 3240, 1.2)); w.dist(99, 0); w.chain(lt, 1.3);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**노예무역과 아프리카 불신의 기원**〉", "논문 제목은, 노예무역과 아프리카 불신의 기원입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: coastWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.chain(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
