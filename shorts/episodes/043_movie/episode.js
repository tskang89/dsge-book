/* 오늘의 경제 043 — 폭력 영화와 폭력 범죄 (v3: 부엉이 진행자·한 공간 카메라 이동·밤 거리·실험실·두 주말·시계·영화관과 술집)
   논문: Dahl, G. & DellaVigna, S. (2009) "Does Movie Violence Increase Violent Crime?",
         Quarterly Journal of Economics 124(2): 677–734. doi:10.1162/qjec.2009.124.2.677 (NBER WP 13718)
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — QJE·NBER 초록과 작업 논문 초록 검색 결과로 확인):
   - 심리학 실험실 연구: 폭력 영상은 단기적으로 공격성을 높인다(초록 첫 문장)
   - 자료: 1995~2004년 흥행작의 폭력성 차이, 같은 날 폭행 사건(초록)
   - 결과: 폭력 영화 관객이 많은 날 폭력 범죄가 줄었다(초록)
   - 저녁 6시~자정: 폭력 영화 관객 100만 명 증가 → 폭력 범죄 1.1~1.3% 감소(작업 논문 초록), '자발적 격리(voluntary incapacitation)'
   - 자정~새벽 6시(영화를 본 뒤): 더 큰 비율로 감소(초록, 정확한 수치는 쓰지 않음)
   - 설명: 폭력적 성향인 사람이 영화 관람에 자기 선택 → 더 위험한 활동인 음주에서 대체(초록)
   - 단기적으로 평균 주말마다 폭행 약 1,000건 억제(QJE 초록 "almost 1,000")
   - 장기 효과는 설계상 추정 못 함, 3주 뒤까지 중기 효과 증거 없음(초록)
   비교의 전제(흥행작 시기는 그 주말 범죄와 무관한 우연에 가깝다)는 연구진의 판단으로 말한다.
   시계 그림은 시간대만 보이는 그림(크기 비율 아님). 경광등 10개 = 그림 표시(하나 = 약 100건). */
Object.assign(EP, {no: 43, style: "v2", title: "폭력 영화와 폭력 범죄", hook: "폭력 영화에 관객이 몰린 날, 폭력 범죄는 늘었을까?",
  bgm: {seed: 677, bpm: 96, mood: "tense"},
  paper: {journal: "Quarterly Journal of Economics", year: 2009, authors: "Gordon Dahl & Stefano DellaVigna",
          title: "Does Movie Violence Increase Violent Crime?", ko: "폭력 영화는 폭력 범죄를 늘리는가?",
          cite: "124(2): 677–734", url: "https://doi.org/10.1162/qjec.2009.124.2.677"},
  yt: {title: "폭력 영화가 흥행한 날, 폭력 범죄가 줄었다? #경제 #shorts",
       desc: "심리학 실험실에서는 폭력 영상을 본 사람이 더 공격적으로 행동한다는 결과가 많다. 그렇다면 현실에서도 폭력 영화가 폭력 범죄를 늘릴까? 달 교수와 델라비냐 교수는 1995년부터 2004년까지 미국의 흥행 영화와 같은 날 일어난 폭행 사건을 모았다. 어떤 주말에는 폭력 영화를 보러 간 관객이 많고, 어떤 주말에는 적다. 계절과 요일 같은 조건을 맞춘 뒤 두 주말의 폭행 사건 수를 비교했다. 결과는 반대였다. 폭력 영화 관객이 100만 명 늘면 저녁 6시부터 자정까지 폭력 범죄가 1.1~1.3% 줄었고, 영화가 끝난 뒤인 자정부터 새벽 6시까지는 더 크게 줄었다. 연구진이 꼽은 이유는 둘. 첫째는 자발적 격리(voluntary incapacitation): 영화관에 앉아 있는 동안은 범죄를 저지를 수 없다. 둘째는 자기 선택(self-selection): 폭력 영화를 고르는 관객 중에는 폭력적인 성향의 사람이 상대적으로 많고, 영화를 보지 않았다면 그 시간에 술을 마셨을 수도 있다. 영화관에서는 술을 거의 마시지 않으니 영화가 끝난 뒤에도 덜 위험했다는 설명이다. 연구진의 추산으로 폭력 영화는 평균적인 주말마다 폭행 사건을 1,000건 가까이 줄였다. 실험실과 결과가 다른 건 비교 대상이 달라서다. 다만 오랜 기간에 걸친 영향은 이 연구로는 알 수 없고, 3주 뒤까지 범죄가 늘어난 증거는 없었다.",
       tags: ["경제", "범죄경제학", "영화", "폭력", "델라비냐", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 실험실 | 1080 두 주말 | 2160 시계 | 3240 영화관과 술집
let WID = 0;

function cityWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`, R = rng(43);
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#070b1e"], [1, "#1f2b55"]]); lg("road", [[0, "#2a2a36"], [1, "#121218"]]); lg("bld", [[0, "#1a2240"], [1, "#0e1428"]]);
  lg("lab", [[0, "#dfe8f2", .22], [1, "#9fb2c8", .12]]); lg("cin", [[0, "#5a1f2e"], [1, "#2e0f18"]]); lg("bar", [[0, "#3a2a14"], [1, "#1e150a"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1060, fill: U("sky")}, g);
  w.stars = Array.from({length: 120}, () => S("circle", {cx: R() * WW, cy: R() * 480, r: 1.5 + R() * 2.5, fill: "#fff", opacity: .6}, g));
  for (let x = 0; x < WW; x += 150 + R() * 90) {const h = 260 + R() * 260, bw = 110 + R() * 80;
    S("rect", {x, y: 1060 - h, width: bw, height: h, fill: U("bld")}, g);
    for (let yy = 1060 - h + 30; yy < 1030; yy += 50) for (let xx = x + 18; xx < x + bw - 24; xx += 36) if (R() < .35) S("rect", {x: xx, y: yy, width: 16, height: 22, fill: "#ffd98a", opacity: .35}, g)}
  S("rect", {x: 0, y: 1060, width: WW, height: H - 1060, fill: U("road")}, g);
  for (let x = 40; x < WW; x += 220) S("rect", {x, y: 1200, width: 120, height: 10, rx: 5, fill: "#e8e0b0", opacity: .35}, g);
  // 0: 실험실
  S("rect", {x: 130, y: 520, width: 820, height: 520, rx: 26, fill: U("lab"), stroke: "#cfe0f5", "stroke-width": 4, "stroke-opacity": .5}, g);
  ST(g, 540, 600, "심리학 실험실", {"font-size": 46, "font-weight": 900, fill: "#fff", stroke: "#0b1020", "stroke-width": 8, "paint-order": "stroke"});
  w.tv = img(w.layer, "television", 360, 980, 300);
  w.clash = img(w.layer, "collision", 352, 880, 110); w.clash.style.opacity = 0;
  w.subj = img(w.layer, "person", 740, 1010, 230);
  w.angry = img(w.layer, "angry_face", 740, 760, 120); w.angry.style.opacity = 0;
  w.labLab = ST(g, 540, 1100, "폭력 영상 → 더 공격적", {"font-size": 42, "font-weight": 900, fill: GOLD, opacity: 0, stroke: "#0b1020", "stroke-width": 8, "paint-order": "stroke"});
  // 1080: 두 주말
  w.cine = [[1080 + 280, "주말 A", 8, "관객 많음"], [1080 + 800, "주말 B", 2, "관객 적음"]].map(([x, t, k, sub]) => {
    S("rect", {x: x - 200, y: 640, width: 400, height: 380, rx: 14, fill: U("cin")}, g);
    S("rect", {x: x - 220, y: 610, width: 440, height: 60, rx: 12, fill: "#ffcf5a"}, g);
    ST(g, x, 653, "폭력 영화 상영", {"font-size": 34, "font-weight": 900, fill: "#3a1010"});
    for (let i = 0; i < 9; i++) S("circle", {cx: x - 200 + i * 50, cy: 610, r: 7, fill: "#fff6c0"}, g);
    S("rect", {x: x - 70, y: 860, width: 140, height: 160, rx: 8, fill: "#120608"}, g);
    img(w.layer, "clapper_board", x, 820, 120);
    const ppl = Array.from({length: k}, (_, i) => img(w.layer, ["man", "woman", "person", "boy"][i % 4], x - 110 + (i % 4) * 85, 1120 + Math.floor(i / 4) * 70, 90));
    ppl.forEach(p => p.style.opacity = 0);
    const lab = ST(g, x, 520, t, {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0});
    const sl = ST(g, x, 580, sub, {"font-size": 38, "font-weight": 900, fill: GOLD, opacity: 0, stroke: "#0b1020", "stroke-width": 8, "paint-order": "stroke"});
    return {x, ppl, lab, sl}});
  // 2160: 24시간 시계
  const cx = 2160 + 560, cy = 760, r = 270, ang = h => (h / 24) * 2 * Math.PI - Math.PI / 2, pt = (h, rr) => [cx + rr * Math.cos(ang(h)), cy + rr * Math.sin(ang(h))];
  const arc = (a, b, col) => {const [x1, y1] = pt(a, r), [x2, y2] = pt(b, r);
    return S("path", {d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`, fill: col, opacity: 0}, g)};
  S("circle", {cx, cy, r: r + 22, fill: "#e8edf6"}, g); S("circle", {cx, cy, r, fill: "#1a2240"}, g);
  w.arcE = arc(18, 24, GOLD); w.arcN = arc(0, 6, CORAL);
  for (let h = 0; h < 24; h++) {const [x1, y1] = pt(h, r - 6), [x2, y2] = pt(h, r - (h % 6 ? 22 : 40)); S("line", {x1, y1, x2, y2, stroke: "#fff", "stroke-width": h % 6 ? 3 : 7}, g)}
  [[0, "자정"], [6, "6시"], [12, "정오"], [18, "18시"]].forEach(([h, t]) => {const [x, y] = pt(h, r - 82); ST(g, x, y + 14, t, {"font-size": 38, "font-weight": 900, fill: "#fff"})});
  S("circle", {cx, cy, r: 12, fill: "#fff"}, g);
  w.eLab = ST(g, cx - 330, 470, "18시~자정  −1.1~1.3%", {"font-size": 40, "font-weight": 900, fill: GOLD, opacity: 0, stroke: "#0b1020", "stroke-width": 8, "paint-order": "stroke"});
  w.nLab = ST(g, cx + 140, 1110, "자정~6시  더 크게 ↓", {"font-size": 40, "font-weight": 900, fill: CORAL, opacity: 0, stroke: "#0b1020", "stroke-width": 8, "paint-order": "stroke"});
  w.eIc = img(w.layer, "cinema", cx - 150, cy - 30, 110); w.eIc.style.opacity = 0;
  w.nIc = img(w.layer, "crescent_moon", cx + 130, cy + 170, 100); w.nIc.style.opacity = 0;
  w.cNote = ST(g, cx, 1170, "폭력 영화 관객 100만 명 늘 때 · 폭력 범죄 변화", {"font-size": 30, "font-weight": 700, fill: "#c9cfe6", opacity: 0});
  // 3240: 영화관과 술집
  const cX = 3240 + 280, bX = 3240 + 800;
  S("rect", {x: cX - 200, y: 640, width: 400, height: 420, rx: 14, fill: U("cin")}, g);
  S("rect", {x: cX - 220, y: 610, width: 440, height: 60, rx: 12, fill: "#ffcf5a"}, g);
  ST(g, cX, 653, "영화관", {"font-size": 36, "font-weight": 900, fill: "#3a1010"});
  img(w.layer, "popcorn", cX, 880, 150);
  S("rect", {x: bX - 190, y: 680, width: 380, height: 380, rx: 14, fill: U("bar")}, g);
  S("rect", {x: bX - 205, y: 650, width: 410, height: 56, rx: 12, fill: "#8a5a2a"}, g);
  ST(g, bX, 691, "술집", {"font-size": 36, "font-weight": 900, fill: "#fff3d6"});
  w.mugs = img(w.layer, "clinking_beer_mugs", bX, 900, 150);
  w.inLab = ST(g, cX, 990, "앉아 있는 동안은 범죄 불가", {"font-size": 34, "font-weight": 900, fill: GOLD, opacity: 0, stroke: "#0b1020", "stroke-width": 8, "paint-order": "stroke"});
  w.walker = img(w.layer, "person_walk", bX, 1140, 120); w.walker.style.opacity = 0;
  w.cross = img(w.layer, "cross_mark", bX + 120, 820, 90); w.cross.style.opacity = 0;
  w.sir = Array.from({length: 10}, (_, i) => img(w.layer, "police_car_light", 3240 + 150 + i * 86, 540, 90));
  w.sirLab = ST(g, 3240 + 540, 400, "경광등 하나 = 폭행 약 100건", {"font-size": 32, "font-weight": 900, fill: "#fff", opacity: 0, stroke: "#0b1020", "stroke-width": 8, "paint-order": "stroke"});
  // 앞쪽(흐린) 가로등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 12, y: -40, width: 24, height: 140, fill: "#0b1020"}, fs);
    S("rect", {x: x - 110, y: 90, width: 220, height: 34, rx: 14, fill: "#0b1020"}, fs);
    S("ellipse", {cx: x, cy: 132, rx: 90, ry: 16, fill: "#ffe6a8", opacity: .85}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.stars.forEach((s, i) => s.setAttribute("opacity", .35 + .3 * Math.sin(lt * 2 + i)))};
  w.lab = (lt, t0, t1) => {const on = lt > t0; w.clash.style.opacity = on ? 1 : 0; imgAt(w.clash, 352, 880, on ? 1 + .12 * Math.sin(lt * 9) : 1, 0);
    const u = spr((lt - t1) / .5); w.angry.style.opacity = clamp(u * 2); imgAt(w.angry, 740, 760, clamp(u, 0, 1.2), 0);
    imgAt(w.subj, 740 + (lt > t1 ? 3 * Math.sin(lt * 20) : 0), 1010, 1, 0); w.labLab.setAttribute("opacity", P(lt, t1, .3))};
  w.weekend = (lt, t0, t1) => w.cine.forEach((c, j) => {const s = t0 + j * (t1 - t0); c.lab.setAttribute("opacity", P(lt, s, .3)); c.sl.setAttribute("opacity", P(lt, s + .4 + c.ppl.length * .12, .3));
    c.ppl.forEach((p, i) => {const u = spr((lt - s - .2 - i * .12) / .4); p.style.opacity = clamp(u * 2); imgAt(p, c.x - 110 + (i % 4) * 85, 1120 + Math.floor(i / 4) * 70 - 4 * Math.abs(Math.sin(lt * 3 + i)), clamp(u, 0, 1.15), 0)})});
  w.clock = (lt, t0, t1) => {const e = P(lt, t0, .4), nn = P(lt, t1, .4); w.cNote.setAttribute("opacity", e);
    w.arcE.setAttribute("opacity", e * (.75 + .2 * Math.sin(lt * 4))); w.eLab.setAttribute("opacity", P(lt, t0 + .4, .3)); w.eIc.style.opacity = e;
    w.arcN.setAttribute("opacity", nn * (.75 + .2 * Math.sin(lt * 4))); w.nLab.setAttribute("opacity", P(lt, t1 + .4, .3)); w.nIc.style.opacity = nn};
  w.street = (lt, tIn, tWalk, tOff) => {w.inLab.setAttribute("opacity", P(lt, tIn, .3));
    const u = ease((lt - tWalk) / 1.6); w.walker.style.opacity = lt > tWalk - .5 ? P(lt, tWalk - .5, .3) : 0;
    imgAt(w.walker, lerp(3240 + 800, 3240 + 340, u), 1140 - 6 * Math.abs(Math.sin(lt * 8)) * (u > 0 && u < 1 ? 1 : 0), 1, 0);
    w.cross.style.opacity = P(lt, tWalk + 1.2, .3); imgAt(w.mugs, 3240 + 800, 900, 1, lt > tWalk + 1.2 ? 0 : 6 * Math.sin(lt * 5));
    w.sirLab.setAttribute("opacity", P(lt, tOff, .3));
    w.sir.forEach((s, i) => {const off = lt > tOff + .3 + i * .12; s.style.opacity = lt > tOff - .1 ? (off ? .25 : 1) : 0; s.style.filter = off ? "grayscale(1)" : "none";
      imgAt(s, 3240 + 150 + i * 86, 540, off ? .9 : 1 + .06 * Math.sin(lt * 10 + i), 0)})};
  w.lab(-99, 99, 99); w.weekend(-99, 99, 99); w.clock(-99, 99, 99); w.street(-99, 99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const BOX = (hud, y, html, col) => CX(hud, y, `<div style="display:inline-block;padding:18px 30px;border-radius:22px;background:rgba(10,14,30,.85);border:3px solid ${col};font-size:52px;font-weight:900;color:#fff;line-height:1.35">${html}</div>`, "");

/* 1. 질문 */
scene({id: "hook", lines: [
  ["폭력 영화가 흥행한 날 **폭력 범죄**는?", "폭력적인 영화가 흥행한 날, 폭력 범죄는 늘었을까요?", "pop"],
  ["2009년 **QJE**에 실린 논문", "이천구 년에 나온 논문입니다."],
  ["저자: 달_교수와 델라비냐_교수", "이 논문은, 달 교수, 그리고 델라비냐 교수, 두 사람이 썼습니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.h = kin(hud, 120, "폭력 영화 흥행 → **폭력 범죄**?", 88);
    c.j = kin(hud, 120, "**2009** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.weekend(lt, .4, .9);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 실험실 */
scene({id: "lab", lines: [
  ["심리학 실험실: 폭력 영상을 본 사람이 **더 공격적**", "심리학 실험실에서는, 폭력 영상을 본 사람이, 더 공격적으로 행동한다는 결과가 많습니다.", "whoosh@0.1"],
  ["그렇다면 현실에서도 **폭력 범죄가 늘까?**", "그렇다면 현실에서도, 폭력적인 영화가 폭력 범죄를 늘릴까요?"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.04}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.weekend(99, 0, 0); w.pan(whip(lt, 0, 1080, 0, .9)); w.lab(lt, 1, L[0] + 2.2);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 자료와 비교 */
scene({id: "design", lines: [
  ["1995년부터 10년: **흥행 영화**와 같은 날 폭행 사건", "연구진은, 천구백구십오 년부터 십 년 동안, 미국의 흥행 영화와, 같은 날 일어난 폭행 사건을 모았습니다.", "pop"],
  ["어떤 주말엔 폭력 영화 관객이 **많고**, 어떤 주말엔 **적다**", "어떤 주말에는, 폭력 영화를 보러 간 관객이 많고, 어떤 주말에는 적습니다."],
  ["계절·요일을 맞추고 **두 주말**의 폭행 비교", "계절과 요일 같은 조건을 맞춘 다음, 두 주말의 폭행 사건 수를 비교했습니다."],
  ["흥행작이 언제 나오느냐는 **범죄와 무관한 우연**에 가깝다", "연구진은, 흥행작이 언제 나오느냐는, 그 주말의 범죄와는 상관없는 우연에 가깝다고 봤습니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lerp(1, 1.04, ease((lt - L[2]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.lab(99, 0, 0); w.pan(lt < L[1] ? 0 : whip(lt, L[1], 0, 1080, .9)); w.weekend(lt, L[1] + .8, L[1] + 2.6);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["결과는 반대: 관객이 많은 날 폭력 범죄가 **줄었다**", "결과는 반대였습니다. 폭력적인 영화에 관객이 많은 날, 폭력 범죄가 오히려 줄었습니다.", "ding"],
  ["관객 **100만 명**↑: 18시~자정 폭력_범죄 **1.1~1.3%↓**", "폭력적인 영화의 관객이 백만 명 늘면, 저녁 여섯 시부터 자정까지, 폭력 범죄가 일 점 일에서 일 점 삼 퍼센트 줄었습니다.", "coin"],
  ["영화가 끝난 뒤 **자정~새벽 6시**엔 더 크게 감소", "영화가 끝난 뒤인, 자정부터 새벽 여섯 시까지는, 더 크게 줄었습니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.weekend(99, 0, 0); w.pan(whip(lt, 0, 1080, 2160, .9)); w.clock(lt, L[1] + .3, L[2] + .3);
    c.o.up(lt, {mood: lt < L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 왜? */
scene({id: "why", lines: [
  ["① **자발적 격리**: 영화관에 앉아 있는 동안은 범죄 불가", "연구진이 꼽은 첫째 이유는, 자발적 격리입니다. 영화관에 앉아 있는 동안은, 범죄를 저지를 수 없죠.", "whoosh@0.1"],
  ["② **자기 선택**: 폭력적 성향인 관객이 상대적으로 많다", "둘째는 자기 선택입니다. 폭력 영화를 고르는 관객 중에는, 폭력적인 성향의 사람이 상대적으로 많습니다."],
  ["영화를 보지 않았다면, 그 시간에 **술**을 마셨을 수도", "이들은 영화를 보지 않았다면, 그 시간에 술을 마셨을 수도 있습니다."],
  ["영화관에선 술을 거의 안 마시니 **끝난 뒤에도 덜 위험**", "영화관에서는 술을 거의 마시지 않으니, 영화가 끝난 뒤에도 덜 위험했다는 설명입니다."],
  ["평균 주말마다 폭행 **1,000건 가까이** 줄인 셈", "연구진의 추산으로, 폭력적인 영화들은 평균적인 주말마다, 폭행 사건을 천 건 가까이 줄였습니다.", "coin"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.t1 = kin(hud, 150, "① **자발적 격리**(Incapacitation)", 64);
    c.t2 = kin(hud, 150, "② **자기 선택**(Self-selection)", 64);
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.clock(99, 0, 0); w.pan(whip(lt, 0, 2160, 3240, .9)); w.street(lt, L[0] + 1.2, L[2] + .3, L[4] + .2); kinUp(c.t1, lt, L[0] + .3, L[1] - .1); kinUp(c.t2, lt, L[1] + .1, L[4] - .1);
    c.o.up(lt, {mood: lt > L[4] + 1 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 6. 뜻 */
scene({id: "meaning", lines: [
  ["실험실과 다른 이유: **무엇과 비교하나**", "실험실과 결과가 다른 건, 비교 대상이 달라서입니다.", "ding"],
  ["비교 상대: 실험실은 **순한 영상**, 현실은 **술자리**", "실험실은 폭력 영상과 순한 영상을 비교하지만, 현실에서는 영화관과 술자리를 비교하게 되는 거죠."],
  ["단, 오랜 기간의 영향은 **알 수 없다**(3주 뒤까지 증가 없음)", "다만, 오랜 기간에 걸친 영향은, 이 연구로는 알 수 없습니다. 삼 주 뒤까지 범죄가 늘어난 증거는 없었고요."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.h = kin(hud, 120, "**무엇과** 비교하나?", 96);
    c.b1 = BOX(hud, 250, "실험실: 폭력 영상 vs <span style='color:#5ab0ff'>순한 영상</span>", BLUE);
    c.b2 = BOX(hud, 365, "현실: 영화관 vs <span style='color:#f2c14e'>술자리</span>", GOLD);
    c.cal = img(hud, "spiral_calendar", 540, 1180, 150); c.cal.style.opacity = 0;
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.street(99, 0, 0, 0); w.lab(99, 0, 0);
    w.pan(lt < L[1] ? 3240 : whip(lt, L[1], 3240, 0, 1.1));
    kinUp(c.h, lt, .2); ap(c.b1, lt, L[1] + .3, null, {s: .8}); ap(c.b2, lt, L[1] + 1.6, null, {s: .8});
    const u = spr((lt - L[2] - .3) / .5); c.cal.style.opacity = clamp(u * 2); imgAt(c.cal, 540, 1180, clamp(u, 0, 1.2), 0);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "happy", look: [.7, -.5]});
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**폭력 영화는 폭력 범죄를 늘리는가?**〉", "논문 제목은, 폭력 영화는 폭력 범죄를 늘리는가, 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.weekend(99, 0, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
