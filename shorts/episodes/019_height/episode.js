/* 오늘의 경제 019 — 열여섯 살 때 키 (v3: 부엉이 진행자·한 공간 카메라 이동·키 자·임금 막대)
   논문: Persico, N., Postlewaite, A. & Silverman, D. (2004) "The Effect of Adolescent Experience on Labor Market Outcomes:
         The Case of Height", Journal of Political Economy 112(5): 1019–1053. doi:10.1086/422566
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — 초록(RePEc·NBER w10522)과 펜실베이니아대 보도자료로 확인):
   - 백인 남성(비히스패닉) 2,000여 명 자료, 16살 때 키·어른 키·임금
   - 초록: 청소년기 키를 고려하면 어른 키의 효과는 사실상 사라짐(백인 남성)
   - 16살 때 키 1인치당 임금 약 2.4% (NBER 판 본문)
   - 초록: 고교 운동부·동아리 참여(그리고 조금은 학력)가 통로. 일부만 설명
   그림: 같은 어른 키 둘, 16살 때 키만 다름(단순화). */
Object.assign(EP, {no: 19, style: "v2", title: "열여섯 살 때 키", hook: "키가 연봉을 정한다? 그런데 16살 때 키라면?",
  bgm: {seed: 221, bpm: 102, mood: "bright"},
  paper: {journal: "Journal of Political Economy", year: 2004, authors: "Nicola Persico, Andrew Postlewaite & Dan Silverman",
          title: "The Effect of Adolescent Experience on Labor Market Outcomes: The Case of Height", ko: "청소년기 경험과 노동시장: 키의 경우",
          cite: "112(5): 1019–1053", url: "https://doi.org/10.1086/422566"},
  yt: {title: "연봉을 정하는 건 지금 키가 아니라 16살 때 키? #경제 #shorts",
       desc: "연구진은 백인 남성 2,000여 명의 자료로 16살 때 키와 어른 키, 그리고 임금을 비교했다. 어른 키가 같아도 16살 때 키가 컸던 사람이 더 많이 벌었다. 16살 때 키가 1인치(2.54cm) 클수록 임금이 2.4%쯤 높았다. 16살 때 키를 함께 보면 어른 키의 효과는 거의 사라졌다. 연구진이 찾은 통로 하나는 고등학교 운동부와 동아리 활동이다. 키가 큰 10대가 이런 활동에 더 많이 참여하며 사람과 어울리는 능력을 키운다는 것이 연구진의 해석이다. 다만 이것으로 설명되는 건 차이의 일부다.",
       tags: ["경제", "노동경제학", "키", "임금", "청소년기", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 키 재는 벽 | 1080 16살 → 어른 | 2160 임금 막대 | 3240 운동부·동아리
let WID = 0;

function schoolWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#2a4a3a"], [1, "#3c5e4a"]]); lg("floor", [[0, "#b07a4a"], [1, "#6a4426"]]);
  lg("sun", [[0, "#fff2c0", .3], [1, "#fff2c0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  for (let x = 0; x < WW; x += 120) S("rect", {x, y: 0, width: 60, height: 1000, fill: "#fff", opacity: .025}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 90) S("line", {x1: x, y1: 1000, x2: x - 200, y2: H, stroke: "#5a3618", "stroke-width": 3, opacity: .4}, g);
  w.suns = [300, 1400, 2500, 3600].map(x => S("path", {d: `M${x},0 L${x + 220},0 L${x + 600},1000 L${x + 140},1000 Z`, fill: U("sun")}, g));
  // 키 자 (0 과 1080 에)
  [0, 1080].forEach(z => {S("rect", {x: z + 470, y: 300, width: 140, height: 700, fill: "#f4f1e6", opacity: .9}, g);
    for (let k = 0; k <= 14; k++) {const y = 1000 - k * 50; S("line", {x1: z + 470, y1: y, x2: z + (k % 2 ? 530 : 560), y2: y, stroke: "#3a3a3a", "stroke-width": 4}, g)}});
  // 0: 두 사람 (16살 키 다름)
  w.kidA = img(w.layer, "person", 300, 1000, 300); w.kidB = img(w.layer, "person", 780, 1000, 300);
  // 1080: 16살 → 어른
  w.adA = img(w.layer, "man", 1080 + 300, 1000, 300); w.adB = img(w.layer, "man", 1080 + 780, 1000, 300);
  w.ageL = ST(g, 1080 + 540, 260, "", {"font-size": 58, "font-weight": 900, fill: GOLD});
  w.tagA = ST(g, 1080 + 300, 1070, "", {"font-size": 40, "font-weight": 800, fill: "#fff"});
  w.tagB = ST(g, 1080 + 780, 1070, "", {"font-size": 40, "font-weight": 800, fill: "#fff"});
  // 2160: 임금 막대
  w.bars = [["16살 때 작았던 사람", 100, "#c9cfe6", 2160 + 300], ["16살 때 컸던 사람", 110, TEAL, 2160 + 780]].map(([t, v, col, x]) => {
    const r = S("rect", {x: x - 110, y: 1000, width: 220, height: 0, rx: 16, fill: col}, g);
    ST(g, x, 1060, t, {"font-size": 38, "font-weight": 800, fill: "#fff"});
    return {r, v, x}});
  w.barNote = ST(g, 2160 + 540, 340, "", {"font-size": 50, "font-weight": 900, fill: GOLD});
  // 3240: 운동부·동아리
  w.acts = [["basketball", 3240 + 280, 560], ["performing_arts", 3240 + 540, 500], ["trophy", 3240 + 800, 560]].map(([k, x, y]) => img(w.layer, k, x, y, 170));
  w.team = [3240 + 300, 3240 + 460, 3240 + 620, 3240 + 780].map((x, i) => img(w.layer, i % 2 ? "person" : "man", x, 1000, 200));
  // 앞쪽(흐린) 농구 골대 그물: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 140, y: 10, width: 280, height: 20, rx: 6, fill: "#d24a2a"}, fs);
    for (let k = 0; k < 7; k++) S("line", {x1: x - 130 + k * 43, y1: 30, x2: x - 100 + k * 33, y2: 150, stroke: "#eee", "stroke-width": 4, opacity: .7}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => w.suns.forEach((s, i) => s.setAttribute("opacity", .7 + .3 * Math.sin(lt * 1.1 + i)));
  // 16살: A 작음(0.75), B 큼(1.0) / 어른: 둘 다 1.05
  w.kids = (lt) => {imgAt(w.kidA, 300, 1000, .75, 0); imgAt(w.kidB, 780, 1000, 1, 0)};
  w.grow = u => {u = clamp(u); imgAt(w.adA, 1080 + 300, 1000, lerp(.75, 1.05, ease(u)), 0); imgAt(w.adB, 1080 + 780, 1000, lerp(1, 1.05, ease(u)), 0);
    w.ageL.textContent = u < .5 ? "16살" : "어른이 된 뒤"; w.tagA.textContent = u > .9 ? "어른 키 같음" : "16살 때 작음"; w.tagB.textContent = u > .9 ? "어른 키 같음" : "16살 때 큼"};
  w.wage = (lt, t0) => w.bars.forEach((b, i) => {const u = ease((lt - t0 - i * .4) / .8), h = b.v * 5 * u;
    b.r.setAttribute("height", h); b.r.setAttribute("y", 1000 - h)});
  w.actsOn = (lt, t0) => w.acts.forEach((a, i) => {const u = spr((lt - t0 - i * .3) / .5); a.style.opacity = clamp(u * 2);
    imgAt(a, [3240 + 280, 3240 + 540, 3240 + 800][i], [560, 500, 560][i] - 10 * Math.abs(Math.sin(lt * 3 + i)), clamp(u, 0, 1.2), 0)});
  w.teamAnim = lt => w.team.forEach((p, i) => imgAt(p, [3240 + 300, 3240 + 460, 3240 + 620, 3240 + 780][i], 1000 - 10 * Math.abs(Math.sin(lt * 4 + i)), 1, 0));
  w.kids(0); w.grow(0); w.wage(-99, 0); w.actsOn(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["키가 연봉을 정할까? 그런데 **16살 때** 키라면?", "키가 연봉을 정할까요? 그런데 지금 키가 아니라, 열여섯 살 때 키라면요?", "pop"],
  ["2004년 **JPE**에 실린 논문", "이천사 년에 나온 논문입니다."],
  ["저자: 페르시코, 포스틀웨이트, 실버먼", "저자는, 페르시코, 포스틀웨이트, 실버먼, 세 사람입니다."]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.h = kin(hud, 110, "**16살 때** 키?", 96);
    c.j = kin(hud, 110, "**2004** · JPE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1.15, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.kids(lt);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 자료와 결과 */
scene({id: "data", lines: [
  ["백인 남성 **2,000여 명**: 16살 키, 어른 키, 임금", "연구진은 백인 남성 이천여 명의 자료로, 열여섯 살 때 키와 어른 키, 그리고 임금을 비교했습니다.", "pop"],
  ["어른 키가 같아도, **16살_때** 컸던 사람이 더 벌었다", "어른 키가 같아도, 열여섯 살 때 키가 컸던 사람이 더 많이 벌었습니다.", "coin"]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] + 1.4 ? whip(lt, 0, 0, 1080, .9) : whip(lt, L[1] + 1.4, 1080, 2160, .9));
    w.grow((lt - 1.5) / 2); w.wage(lt, L[1] + 2);
    c.o.up(lt, {mood: lt > L[1] + 2.5 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

scene({id: "result", lines: [
  ["16살 때 키 1인치당 임금 **2.4%쯤** 높았다", "열여섯 살 때 키가 일 인치, 이 점 오 센티미터 클수록, 임금이 이 점 사 퍼센트쯤 높았죠.", "coin"],
  ["16살 키를 함께 보면, 어른_키 효과는 **거의 사라졌다**", "열여섯 살 때 키를 함께 보면, 어른 키의 효과는 거의 사라졌습니다.", "ding"]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.n = CX(hud, 150, "1인치(2.54cm) ↑ → 임금 2.4%쯤 ↑", "", {fontSize: "64px", fontWeight: 800, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.35)"});
    c.u = CX(hud, 1150, "막대 높이 차이는 단순화한 그림", "", {fontSize: "34px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1.02, 1.05, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(2160); w.wage(99, 0);
    c.n.style.opacity = P(lt, .5, .3); ap(c.u, lt, 1);
    c.o.up(lt, {mood: lt > L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 3. 통로: 운동부·동아리 */
scene({id: "why", lines: [
  ["연구진이 찾은 통로: 고교 **운동부·동아리** 활동", "연구진이 찾은 통로 하나는, 고등학교 운동부와 동아리 활동입니다.", "whoosh@0.2"],
  ["키 큰 10대가 더 참여하며 **어울리는 능력**을 키운다", "키가 큰 십 대가 이런 활동에 더 많이 참여하며, 사람과 어울리는 능력을 키운다는 해석이죠.", "pop"],
  ["다만 이것으로 설명되는_건 **차이의 일부**", "다만, 이것으로 설명되는 건 차이의 일부입니다."]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 780, s: lerp(1, 1.05, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.actsOn(lt, .9); w.teamAnim(lt);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "happy", look: [.7, -.6]});
  }
});

/* 4. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**청소년기_경험과 노동시장: 키의_경우**〉", "논문 제목은, 청소년기 경험과 노동시장, 키의 경우입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1040, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.kids(lt); w.actsOn(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
