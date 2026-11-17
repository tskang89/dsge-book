/* 오늘의 경제 023 — 응원 팀의 예상 밖 패배 (v3: 부엉이 진행자·한 공간 카메라 이동·전광판·신고서 더미·경기 시간 띠)
   논문: Card, D. & Dahl, G. B. (2011) "Family Violence and Football: The Effect of Unexpected Emotional Cues on Violent Behavior",
         Quarterly Journal of Economics 126(1): 103–143. doi:10.1093/qje/qjr001
   확인(2026-11-17, 원문 PDF 는 이 세션에서 막힘 — 초록(RePEc/IDEAS·저자 페이지 검색 요약)과 보도 요약으로 확인):
   - 예상 밖 패배 = 지역 팀이 4점 이상 차로 이길 거라 예측된(베팅 점수 차) 경기에서 진 것
   - 예상 밖 패배 → 남성이 아내·여자 친구에게 가한 집 안 폭력(경찰 신고) 약 10% 증가 (경기 전 점수 차·시청 규모 통제)
   - 예상 밖 승리는 거의 영향 없음, 증가는 경기 끝 무렵 짧은 시간대에 몰림, 중요한 경기일수록 효과가 큼
   - 자료: 미국 프로 미식축구(NFL) 6개 팀, 경찰 신고 자료(보도 요약: 1995–2006 — 연도는 화면에 쓰지 않음)
   - 해석: 기대(기준점)에 견준 손실이 감정을 건드림(기준점 의존 선호), 순간의 감정 → 폭력
   - 초기 작업 논문판은 '3점 넘게·8%' — 영상은 학술지판(4점·10%)을 쓴다
   신고서 더미: 이긴 날 10장 vs 예상 밖 패배 날 11장(= +10%, 비율만 표시). */
Object.assign(EP, {no: 23, style: "v2", title: "응원 팀의 예상 밖 패배", hook: "응원 팀이 예상 밖으로 지면?",
  bgm: {seed: 103, bpm: 92, mood: "calm"},
  paper: {journal: "Quarterly Journal of Economics", year: 2011, authors: "David Card & Gordon B. Dahl",
          title: "Family Violence and Football: The Effect of Unexpected Emotional Cues on Violent Behavior",
          ko: "가정 폭력과 미식축구: 예상치 못한 감정 자극이 폭력 행동에 미치는 영향",
          cite: "126(1): 103–143", url: "https://doi.org/10.1093/qje/qjr001"},
  yt: {title: "응원 팀이 예상 밖으로 지면? | 기대가 깨질 때 #경제 #shorts",
       desc: "연구진은 미국 프로 미식축구 6개 팀의 경기와, 경기 날 그 지역 경찰에 들어온 가정 폭력 신고를 분석했다. 경기 전에는 베팅 시장이 어느 팀이 몇 점 차로 이길지 예측한다. 예상 밖 패배란 4점 이상 차로 이길 거라던 지역 팀이 진 경기다. 예상 밖으로 진 날은, 예상대로 이긴 날보다 남성이 아내나 여자 친구에게 휘두른 폭력 신고가 약 10% 많았다. 반대로 예상 밖으로 이긴 날은 거의 변화가 없었다. 늘어난 신고는 경기가 끝날 무렵에 몰려 있었고, 중요한 경기일수록 늘어난 폭이 더 컸다. 연구진은 진 것 자체보다 기대가 깨진 충격이 감정을 건드렸다고 봤다. 순간의 감정이 폭력으로 번질 수 있다는 증거라는 것이다. 결과를 기대와 견주어 느끼는 것을 기준점 의존(Reference Dependence)이라고 한다. (초기 작업 논문판은 '3점 넘게 이길 경기·8%'로 보고했고, 영상은 학술지판 수치를 썼다.) 가정 폭력 상담: 여성긴급전화 1366.",
       tags: ["경제", "행동경제학", "기준점의존", "미식축구", "데이비드카드", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", GRASS = "#2f7a46";
const WW = 4320;                       // 세계 너비: 0 경기장 | 1080 전광판 | 2160 동네·신고서 | 3240 경기 시간 띠
let WID = 0;

function fbWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#0a1024"], [.7, "#1c2450"], [1, "#2c2a55"]]); lg("grass", [[0, "#3c9a58"], [1, "#1d5232"]]);
  lg("ground", [[0, "#151a2a"], [1, "#0a0d16"]]); lg("beam", [[0, "#fff6d0", .35], [1, "#fff6d0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("ground")}, g);
  const r = rng(23);
  w.stars = Array.from({length: 70}, () => S("circle", {cx: r() * WW, cy: r() * 520, r: 1.5 + r() * 2, fill: "#fff", opacity: .5}, g));
  // 0: 경기장 (조명탑 + 잔디 + 관중)
  [140, 940].forEach(x => {S("rect", {x: x - 8, y: 220, width: 16, height: 560, fill: "#3a4058"}, g);
    S("rect", {x: x - 60, y: 190, width: 120, height: 50, rx: 8, fill: "#fff6d0"}, g);
    S("path", {d: `M${x - 60},240 L${x + 60},240 L${x + (x < 540 ? 420 : -300)},1000 L${x + (x < 540 ? -100 : -620)},1000 Z`, fill: U("beam")}, g)});
  S("path", {d: "M60,1000 L1020,1000 L860,640 L220,640 Z", fill: U("grass")}, g);
  for (let i = 0; i <= 8; i++) {const u = i / 8; S("line", {x1: lerp(220, 860, u), y1: 640, x2: lerp(60, 1020, u), y2: 1000, stroke: "#e8ffe8", "stroke-width": 3, opacity: .35}, g)}
  w.crowd = Array.from({length: 60}, (_, i) => S("circle", {cx: 80 + (i % 30) * 31, cy: 560 + Math.floor(i / 30) * 34, r: 12, fill: [CORAL, BLUE, GOLD, "#c9cfe6"][i % 4], opacity: .75}, g));
  w.ball = img(w.layer, "american_football", 540, 820, 170);
  // 1080: 전광판
  const bx = 1080;
  S("rect", {x: bx + 110, y: 260, width: 860, height: 600, rx: 30, fill: "#0b0f1c", stroke: "#4a5a8a", "stroke-width": 8}, g);
  S("rect", {x: bx + 380, y: 860, width: 40, height: 140, fill: "#3a4058"}, g); S("rect", {x: bx + 660, y: 860, width: 40, height: 140, fill: "#3a4058"}, g);
  w.sbTitleA = ST(g, bx + 540, 350, "경기 전 예상", {"font-size": 46, "font-weight": 900, fill: "#c9cfe6", opacity: 0});
  w.sbPred = ST(g, bx + 540, 470, "우리 팀 4점 이상 차 승리", {"font-size": 58, "font-weight": 900, fill: GOLD, opacity: 0});
  S("line", {x1: bx + 170, y1: 540, x2: bx + 910, y2: 540, stroke: "#2a3350", "stroke-width": 4}, g);
  w.sbTitleB = ST(g, bx + 540, 620, "실제 결과", {"font-size": 46, "font-weight": 900, fill: "#c9cfe6", opacity: 0});
  w.sbRes = ST(g, bx + 540, 760, "패배", {"font-size": 110, "font-weight": 900, fill: RED, opacity: 0});
  // 2160: 밤 동네 + 신고서 더미
  const hx = 2160;
  w.houses = [220, 540, 860].map(x => img(w.layer, "house", hx + x, 1000, 230));
  w.siren = img(w.layer, "police_car_light", hx + 540, 330, 130);
  w.stacks = [["예상대로\n이긴 날", 10, TEAL, hx + 330], ["예상 밖\n패배 날", 11, CORAL, hx + 750]].map(([t, m, col, x]) => {
    const sheets = Array.from({length: m}, (_, i) => S("rect", {x: x - 110, y: 900 - (i + 1) * 34, width: 220, height: 26, rx: 5, fill: col, stroke: "#10182a", "stroke-width": 3, opacity: 0}, g));
    const lab = t.split("\n").map((s, k) => ST(g, x, 945 + k * 44, s, {"font-size": 38, "font-weight": 800, fill: "#e8e0ff", opacity: 0}));
    return {sheets, lab, m}});
  w.badge = ST(g, hx + 750, 470, "+10%", {"font-size": 96, "font-weight": 900, fill: GOLD, opacity: 0});
  w.unit = ST(g, hx + 540, 1080, "서류 1장 = 예상대로 이긴 날 신고의 10분의 1", {"font-size": 32, "font-weight": 700, fill: "#c9cfe6"});
  // 3240: 경기 시간 띠
  const tx0 = 3240 + 140, tx1 = 3240 + 940;
  w.win = S("rect", {x: lerp(tx0, tx1, .72), y: 600, width: (tx1 - tx0) * .2, height: 120, rx: 18, fill: CORAL, opacity: 0}, g);
  S("rect", {x: tx0, y: 640, width: tx1 - tx0, height: 40, rx: 20, fill: "#2a3350"}, g);
  w.prog = S("rect", {x: tx0, y: 640, width: 0, height: 40, rx: 20, fill: TEAL}, g);
  [[0, "경기 시작"], [.8, "경기 끝"]].forEach(([u, t]) => {const x = lerp(tx0, tx1, u);
    S("line", {x1: x, y1: 620, x2: x, y2: 700, stroke: "#fff", "stroke-width": 5}, g); ST(g, x, 790, t, {"font-size": 44, "font-weight": 900, fill: "#fff"})});
  w.winLab = ST(g, lerp(tx0, tx1, .82), 560, "신고가 몰린 때", {"font-size": 44, "font-weight": 900, fill: CORAL, opacity: 0});
  w.tv = img(w.layer, "television", 3240 + 540, 1000, 260);
  w.face = img(w.layer, "disappointed_face", 3240 + 540, 400, 170);
  w.anger = img(w.layer, "anger_symbol", 3240 + 700, 300, 110);
  // 앞쪽(흐린) 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("rect", {x: x - 140, y: 30, width: 280, height: 60, rx: 12, fill: "#02060c"}, fs);
    for (let k = 0; k < 4; k++) S("circle", {cx: x - 90 + k * 60, cy: 60, r: 18, fill: "#fff6d0", opacity: .55}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.stars.forEach((s, i) => s.setAttribute("opacity", .3 + .3 * Math.sin(lt * 2 + i)));
    w.crowd.forEach((c, i) => c.setAttribute("cy", 560 + Math.floor(i / 30) * 34 - 6 * Math.abs(Math.sin(lt * 4 + i * .7))));
    imgAt(w.ball, 540, 820 - 30 * Math.abs(Math.sin(lt * 2.4)), 1, 25 * Math.sin(lt * 1.2));
    imgAt(w.siren, 2160 + 540, 330, 1 + .06 * Math.sin(lt * 10), 0); w.siren.style.opacity = .55 + .45 * Math.abs(Math.sin(lt * 5))};
  w.board = (lt, tp, tr) => {[w.sbTitleA, w.sbPred].forEach(e => e.setAttribute("opacity", P(lt, tp, .3)));
    w.sbTitleB.setAttribute("opacity", P(lt, tr, .3)); const u = spr((lt - tr - .2) / .5);
    w.sbRes.setAttribute("opacity", clamp(u * 2)); w.sbRes.setAttribute("transform", `translate(${1080 + 540},740) scale(${clamp(u, 0, 1.3)}) translate(${-(1080 + 540)},-740)`)};
  w.pile = (lt, t0, which) => w.stacks.forEach((s, j) => {if (which.indexOf(j) < 0) return; const tt = t0 + which.indexOf(j) * .8;
    s.sheets.forEach((e, i) => e.setAttribute("opacity", lt > tt + i * .06 ? 1 : 0)); s.lab.forEach(l => l.setAttribute("opacity", P(lt, tt, .3)))});
  w.houseOp = v => w.houses.forEach(h => h.style.opacity = v);
  w.timeBar = (lt, t0) => {const u = ease((lt - t0) / 1.6); w.prog.setAttribute("width", 800 * .8 * u);
    w.win.setAttribute("opacity", lt > t0 + 1.2 ? .55 + .25 * Math.sin(lt * 5) : 0); w.winLab.setAttribute("opacity", P(lt, t0 + 1.3, .3))};
  w.board(-99, 99, 99); w.pile(-99, 0, [0, 1]); w.unit.setAttribute("opacity", 0); w.timeBar(-99, 99); w.face.style.opacity = 0; w.anger.style.opacity = 0;
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["응원 팀이 **예상_밖으로** 지면?", "응원하는 팀이 예상 밖으로 지면, 어떤 일이 생길까요?", "pop"],
  ["2011년 **QJE**에 실린 논문", "이천십일 년에 나온 논문입니다."],
  ["저자: 데이비드_카드_교수와 고든_달_교수", "저자는, 데이비드 카드 교수와, 고든 달 교수입니다."]],
  build(el, hud) {
    const c = {w: fbWorld(el)};
    c.h = kin(hud, 120, "응원 팀이 **예상 밖으로** 지면?", 80);
    c.j = kin(hud, 120, "**2011** · QJE", 96);
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

/* 2. 자료 */
scene({id: "data", lines: [
  ["미국 **프로 미식축구** 6개 팀의 경기", "연구진은, 미국의 프로 미식축구 여섯 팀의 경기를 살펴봤습니다.", "pop"],
  ["경기 전, **베팅 시장**이 몇_점_차로 이길지 예측한다", "경기 전에는, 베팅 시장이 어느 팀이 몇 점 차로 이길지 예측합니다.", "whoosh@0.2"],
  ["그리고 경기 날 경찰에 들어온 **가정 폭력 신고**", "그리고 경기 날, 그 지역 경찰에 들어온 가정 폭력 신고를 분석했습니다.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: fbWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.pan(lt < L[1] ? 0 : lt < L[2] ? whip(lt, L[1], 0, 1080, .9) : whip(lt, L[2], 1080, 2160, .9));
    w.board(lt, L[1] + .6, 99);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 예상 밖 패배의 뜻 */
scene({id: "define", lines: [
  ["**4점 이상** 차로 이길 거라던 지역 팀이 졌다", "여기서 예상 밖으로 졌다는 건, 사 점 이상 차로 이길 거라던 그 지역 팀이, 진 경우입니다.", "pop"]],
  build(el, hud) {
    const c = {w: fbWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 600, s: lerp(1, 1.08, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 1080, .8));
    w.board(lt, -9, 1.6);
    c.o.up(lt, {mood: lt > 2 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["폭력 신고: 예상대로 이긴 날보다 **약_10%** 많았다", "예상 밖으로 경기에 진 날은, 남성이 아내나 여자 친구에게 휘두른 폭력의 신고가, 예상대로 이긴 날보다 약 십 퍼센트 많았습니다.", "coin"],
  ["반대로 **예상 밖으로 이긴** 날은? 거의 변화 없음", "반대로, 예상 밖으로 이긴 날은, 거의 변화가 없었습니다."],
  ["늘어난 신고는 **경기가_끝날_무렵**에 몰렸다", "늘어난 신고는, 경기가 끝날 무렵에 몰려 있었고,", "whoosh@0.2"],
  ["**중요한 경기**일수록 늘어난 폭이 더 컸다", "중요한 경기일수록, 늘어난 폭이 더 컸습니다."]],
  build(el, hud) {
    const c = {w: fbWorld(el)};
    c.tr = CX(hud, 360, "<span style='font-size:64px;font-weight:900;color:#6fcfb7'>예상 밖으로 이긴 날 → 거의 변화 없음</span>", "", {});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[2] ? whip(lt, 0, 1080, 2160, .9) : whip(lt, L[2], 2160, 3240, .9));
    w.pile(lt, .9, [0, 1]); w.houseOp(1 - P(lt, .3, .4)); w.unit.setAttribute("opacity", P(lt, 1.4, .3));
    const tb = spr((lt - 3.2) / .5); w.badge.setAttribute("opacity", clamp(tb * 2));
    ap(c.tr, lt, L[1] + .2, L[2]);
    w.timeBar(lt, L[2] + .8);
    c.o.up(lt, {mood: lt > 3.2 && lt < L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 해석 */
scene({id: "why", lines: [
  ["연구진의 해석: 진 것 자체보다 **기대가 깨진 충격**", "연구진은, 진 것 자체보다, 기대가 깨진 충격이 감정을 건드렸다고 봤습니다.", "pop"],
  ["이것이 **기준점_의존**(Reference Dependence)", "결과를 기대와 견주어 느끼는 것, 이것을 기준점 의존이라고 부릅니다."],
  ["순간의 감정이 **폭력으로 번질 수 있다**는 증거", "순간의 감정이, 폭력으로 번질 수 있다는 증거라는 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: fbWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "linear-gradient(rgba(8,12,22,.75),rgba(8,12,22,.35) 70%,rgba(8,12,22,0))"});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.1, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 3240, .1)); w.timeBar(99, 0);
    c.dim.style.opacity = P(lt, 0, .4) * .9;
    const tf = spr((lt - .4) / .5); imgAt(w.face, 3240 + 540, 400 + 6 * Math.sin(lt * 2), clamp(tf, 0, 1.2), 0); w.face.style.opacity = clamp(tf * 2);
    const ta = spr((lt - L[2]) / .4); imgAt(w.anger, 3240 + 700, 300, clamp(ta, 0, 1.2) * (1 + .08 * Math.sin(lt * 9)), 0); w.anger.style.opacity = clamp(ta * 2);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**가정_폭력과_미식축구**〉", "논문 제목은, 가정 폭력과 미식축구입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: fbWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1));
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
