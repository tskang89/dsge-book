/* 오늘의 경제 048 — 기생충 약과 결석 (v3: 부엉이 진행자·한 공간 카메라 이동·케냐 마을 학교·교실·학교 75곳 지도·결석 달력)
   논문: Miguel, E. & Kremer, M. (2004) "Worms: Identifying Impacts on Education and Health in the Presence of Treatment Externalities",
         Econometrica 72(1): 159–217. doi:10.1111/j.1468-0262.2004.00481.x
   확인(2026-11-24, 원문 PDF 는 이 세션에서 막힘 — 초록(EconPapers·IDEAS), J-PAL 요약, NBER WP 8481, Baird 외 정정 기록 검색 결과로 확인):
   - 케냐 서부 부시아, 학교 75개를 25곳씩 세 그룹으로 무작위로 나눠 구충 치료를 차례로 시작(J-PAL·초록)
   - 개인이 아니라 학교 단위 무작위 → 같은 학교 안 비교는 외부효과 때문에 효과를 작게 잰다(초록의 문제의식)
   - 치료 학교의 결석 1/4 감소(초록), 치료받지 않은 같은 학교·이웃 학교 아이들의 건강·출석도 좋아짐(초록)
   - 시험 점수가 오른 증거는 없음(초록)
   - 학교 출석 1년을 더 늘리는 비용 약 3.5달러(논문 서론, 검색 결과 문장)
   - 외부효과가 커서 치료를 전부 지원할 만하다(초록)
   - 크레머: 2019년 노벨 경제학상
   정정·논쟁(설명란에만): 후속 재분석에서 반올림·코딩 오류가 발견돼 학교 간 외부효과 범위가 6km → 3~4km 로 줄었고,
   재현 연구를 두고 '기생충 전쟁' 논쟁이 있었다. 결석 달력·교실 그림은 개념 그림. */
Object.assign(EP, {no: 48, style: "v2", title: "기생충 약과 결석", hook: "기생충 약 하나가 아이들의 결석을 줄였다?",
  bgm: {seed: 159, bpm: 100, mood: "bright"},
  paper: {journal: "Econometrica", year: 2004, authors: "Edward Miguel & Michael Kremer",
          title: "Worms: Identifying Impacts on Education and Health in the Presence of Treatment Externalities", ko: "기생충: 외부효과가 있을 때 교육·건강 효과 찾기",
          cite: "72(1): 159–217", url: "https://doi.org/10.1111/j.1468-0262.2004.00481.x"},
  yt: {title: "기생충 약 하나가 결석을 4분의 1 줄였다 #경제 #shorts",
       desc: "케냐 서쪽의 초등학교에서는 많은 아이가 장 속 기생충에 감염돼 있었다. 기생충에 걸리면 배가 아프고 기운이 없어 학교를 빠지기 쉽다. 약은 값싸지만 효과를 제대로 알아내기는 의외로 어렵다. 기생충은 흙과 물을 통해 옮기 때문에, 약을 먹은 아이는 주변 아이의 감염도 줄여 준다. 그래서 같은 반 안에서 먹은 아이와 안 먹은 아이를 비교하면, 안 먹은 아이도 덕을 봐서 효과가 작게 나온다. 연구진은 학생이 아니라 학교 단위로 나눴다. 학교 75개를 세 그룹으로 무작위로 나눠 차례로 약을 줬고, 먼저 약을 받은 학교와 아직 받지 않은 학교를 비교했다. 약을 받은 학교의 결석이 4분의 1 줄었다. 약을 먹지 않은 같은 학교 아이들, 가까운 이웃 학교 아이들도 더 건강해지고 덜 빠졌다. 다만 시험 점수가 올랐다는 증거는 찾지 못했다. 학교에 1년 더 다니게 하는 데 드는 비용은 약 3.5달러였다. 이렇게 남에게까지 번지는 효과를 외부효과(externality)라고 한다. 연구진은 외부효과가 커서 약값을 전부 지원할 만하다고 결론지었다. 크레머 교수는 2019년 노벨 경제학상을 받았다. (정정·논쟁: 후속 재분석에서 반올림·코딩 오류가 발견돼 학교 사이 외부효과가 미치는 거리가 6km에서 3~4km로 줄었고, 재현 연구를 두고 이른바 '기생충 전쟁' 논쟁이 있었다. 교실·결석 달력은 개념 그림이다.)",
       tags: ["경제", "개발경제학", "무작위실험", "외부효과", "크레머", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 마을 학교 | 1080 교실 | 2160 학교 75곳 | 3240 결과
let WID = 0;
const halo = {stroke: "#1a1208", "stroke-width": 8, "paint-order": "stroke"};
const KIDS = ["child", "girl", "boy"];

function villageWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`, R = rng(48);
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#f6a24a"], [1, "#fde2a8"]]); lg("gr", [[0, "#b8873e"], [.2, "#7a5428"], [.35, "#3a2814"], [1, "#1a120a"]]);
  lg("board", [[0, "#2e4a3a"], [1, "#1e3428"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  w.sun = S("circle", {cx: 700, cy: 300, r: 110, fill: "#fff3c8", opacity: .85}, g);
  for (let x = 0; x < WW; x += 380) {const tx = x + R() * 200, h = 140 + R() * 80;   // 아카시아 실루엣
    S("rect", {x: tx - 8, y: 1000 - h, width: 16, height: h, fill: "#3a2814"}, g);
    S("ellipse", {cx: tx, cy: 1000 - h, rx: 110 + R() * 40, ry: 26, fill: "#3a2814"}, g)}
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("gr")}, g);
  for (let i = 0; i < 260; i++) S("line", {x1: R() * WW, y1: 1000 + R() * 120, x2: 0, y2: 0, stroke: "none"}, g);
  // 0: 마을 학교 + 아픈 아이
  w.sch0 = img(w.layer, "school", 300, 1010, 300);
  w.kids0 = [0, 1, 2].map(i => img(w.layer, KIDS[i], 620 + i * 130, 1010, 110));
  w.worm0 = img(w.layer, "worm", 750, 860, 120); w.worm0.style.opacity = 0;
  w.sick = img(w.layer, "face_with_thermometer", 880, 880, 120); w.sick.style.opacity = 0;
  w.cal0 = S("g", {opacity: 0}, g);
  S("rect", {x: 150, y: 420, width: 780, height: 230, rx: 18, fill: "#fffdf6"}, w.cal0);
  ["월", "화", "수", "목", "금"].forEach((t, i) => {S("text", {x: 230 + i * 155, y: 475, "text-anchor": "middle", "font-size": 34, "font-weight": 900, fill: "#2a2a3a"}, w.cal0).textContent = t});
  w.calX = [0, 1, 2, 3, 4].map(i => {const t = S("text", {x: 230 + i * 155, y: 590, "text-anchor": "middle", "font-size": 80, "font-weight": 900, fill: i === 1 || i === 3 ? RED : "#2a8a4a"}, w.cal0); t.textContent = i === 1 || i === 3 ? "✕" : "○"; return t});
  // 1080: 교실 — 같은 반 비교
  S("rect", {x: 1080 + 120, y: 380, width: 840, height: 640, rx: 24, fill: "#f3e2c0", opacity: .9}, g);
  S("rect", {x: 1080 + 200, y: 420, width: 680, height: 150, rx: 10, fill: U("board")}, g);
  w.bT = ST(g, 1080 + 540, 515, "같은 반 안에서 비교", {"font-size": 46, "font-weight": 900, fill: "#fff"});
  w.desk = Array.from({length: 8}, (_, i) => {const x = 1080 + 230 + (i % 4) * 207, y = 760 + Math.floor(i / 4) * 200;
    const k = img(w.layer, KIDS[i % 3], x, y, 110), pill = img(w.layer, "pill", x + 52, y - 70, 54); pill.style.opacity = 0;
    const wm = img(w.layer, "worm", x - 46, y - 10, 60); wm.style.opacity = 0;
    return {x, y, k, pill, wm, treated: i % 2 === 0}});
  w.spill = S("g", {opacity: 0}, g);
  w.desk.forEach(dd => {if (dd.treated) S("circle", {cx: dd.x, cy: dd.y - 55, r: 120, fill: TEAL, opacity: .18}, w.spill)});
  w.small = ST(g, 1080 + 540, 1090, "안 먹은 아이도 덕을 봐 → 차이가 작게 나온다", {"font-size": 36, "font-weight": 900, fill: CORAL, opacity: 0, ...halo});
  // 2160: 학교 75곳, 세 그룹
  w.map = Array.from({length: 75}, (_, i) => {const x = 2160 + 150 + (i % 10) * 86 + (Math.floor(i / 10) % 2) * 30 + R() * 20, y = 420 + Math.floor(i / 10) * 82 + R() * 16;
    const grp = [0, 1, 2][Math.floor(R() * 3)]; return {c: S("circle", {cx: x, cy: y, r: 24, fill: "#6a5a4a", stroke: "#fff", "stroke-width": 3, opacity: 0}, g), grp}});
  // 정확히 25곳씩: 순서를 섞어 그룹 배정
  const order = Array.from({length: 75}, (_, i) => i).sort((a, b) => ((a * 37) % 75) - ((b * 37) % 75));
  order.forEach((k, j) => w.map[k].grp = Math.floor(j / 25));
  w.legend = [["1그룹: 먼저", GOLD], ["2그룹: 다음", TEAL], ["3그룹: 나중", BLUE]].map(([t, col], i) =>
    ST(g, 2160 + 220 + i * 320, 1100, t, {"font-size": 36, "font-weight": 900, fill: col, opacity: 0, ...halo}));
  w.mapT = ST(g, 2160 + 540, 360, "학교 75개를 무작위로 세 그룹", {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  // 3240: 결과 — 결석 달력(4칸 → 3칸) + 이웃 학교
  w.calR = [[440, "약 받기 전", 4], [640, "약 받은 뒤", 3]].map(([y, t, k]) => {const gg = S("g", {opacity: 0}, g);
    S("rect", {x: 3240 + 120, y: y - 70, width: 840, height: 150, rx: 16, fill: "#fffdf6"}, gg);
    S("text", {x: 3240 + 160, y: y + 14, "font-size": 36, "font-weight": 900, fill: "#2a2a3a"}, gg).textContent = t;
    const xs = [0, 1, 2, 3].map(i => {const t2 = S("text", {x: 3240 + 520 + i * 110, y: y + 28, "text-anchor": "middle", "font-size": 80, "font-weight": 900, fill: i < k ? RED : "#c8c0b0"}, gg); t2.textContent = i < k ? "✕" : "○"; return t2});
    return {gg, xs}});
  w.calL = ST(g, 3240 + 540, 330, "결석한 날 (개념 그림)", {"font-size": 38, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  w.schA = img(w.layer, "school", 3240 + 300, 1010, 200); w.schB = img(w.layer, "school", 3240 + 780, 1010, 180);
  w.ring = S("circle", {cx: 3240 + 300, cy: 930, r: 120, fill: "none", stroke: TEAL, "stroke-width": 10, opacity: 0}, g);
  w.arrow = S("line", {x1: 3240 + 430, y1: 900, x2: 3240 + 430, y2: 900, stroke: TEAL, "stroke-width": 12, "stroke-dasharray": "22 14", "stroke-linecap": "round", opacity: 0}, g);
  w.nbT = ST(g, 3240 + 780, 780, "이웃 학교도 좋아짐", {"font-size": 38, "font-weight": 900, fill: TEAL, opacity: 0, ...halo});
  w.cost = ST(g, 3240 + 540, 1120, "", {"font-size": 46, "font-weight": 900, fill: GOLD, ...halo});
  // 앞쪽(흐린) 풀잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [200, 1300, 2400, 3500, 4600].forEach(x => {for (let k = 0; k < 4; k++) S("path", {d: `M${x + k * 40},-20 Q${x + 80 + k * 40},${80 + k * 20} ${x + 200 + k * 50},${110 + k * 30}`, fill: "none", stroke: "#3a5a1e", "stroke-width": 22, "stroke-linecap": "round", opacity: .9}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.kids0.forEach((k, i) => imgAt(k, 620 + i * 130, 1010 - 5 * Math.abs(Math.sin(lt * 3 + i)), 1, 0));
    w.desk.forEach((dd, i) => imgAt(dd.k, dd.x, dd.y - 3 * Math.abs(Math.sin(lt * 2.5 + i)), 1, 0))};
  w.ill = (lt, t0, t1) => {w.worm0.style.opacity = P(lt, t0, .3); imgAt(w.worm0, 750 + 10 * Math.sin(lt * 4), 860, 1, 8 * Math.sin(lt * 5));
    w.sick.style.opacity = P(lt, t1, .3); imgAt(w.sick, 880, 880, spr((lt - t1) / .4), 0);
    w.cal0.setAttribute("opacity", P(lt, t1 + .4, .3))};
  w.cls = (lt, tp, ts, tm) => {w.desk.forEach((dd, i) => {dd.pill.style.opacity = dd.treated ? P(lt, tp + i * .1, .3) : 0;
      dd.wm.style.opacity = !dd.treated ? (lt < ts ? .9 : .9 - .6 * P(lt, ts + .4, .6)) : (lt < tp ? .9 : 0);
      imgAt(dd.wm, dd.x - 46 + 4 * Math.sin(lt * 4 + i), dd.y - 10, 1, 0)});
    w.spill.setAttribute("opacity", P(lt, ts, .4)); w.small.setAttribute("opacity", P(lt, tm, .3))};
  w.school = (lt, t0, tg) => {w.mapT.setAttribute("opacity", P(lt, t0, .3));
    w.map.forEach((m, i) => {m.c.setAttribute("opacity", P(lt, t0 + i * .012, .2));
      const on = lt > tg + m.grp * 1.1; m.c.setAttribute("fill", on ? [GOLD, TEAL, BLUE][m.grp] : "#6a5a4a"); m.c.setAttribute("r", on ? 26 + 3 * Math.sin(lt * 5 + i) : 24)});
    w.legend.forEach((l, i) => l.setAttribute("opacity", P(lt, tg + i * 1.1, .3)))};
  w.res = (lt, tc, tn, tcost) => {w.calL.setAttribute("opacity", P(lt, tc, .3));
    w.calR.forEach((c, j) => c.gg.setAttribute("opacity", P(lt, tc + j * .8, .3)));
    w.calR[1].xs[3].setAttribute("fill", lt > tc + 1.4 ? "#2a8a4a" : RED); w.calR[1].xs[3].textContent = lt > tc + 1.4 ? "○" : "✕";
    w.ring.setAttribute("opacity", P(lt, tn, .3)); w.ring.setAttribute("r", 130 + 8 * Math.sin(lt * 4)); w.arrow.setAttribute("opacity", P(lt, tn + .5, .3)); w.arrow.setAttribute("x2", lerp(3240 + 430, 3240 + 660, ease((lt - tn - .5) / .8)));
    w.nbT.setAttribute("opacity", P(lt, tn + 1.2, .3));
    w.cost.textContent = lt > tcost ? "출석 1년 더: 약 $3.5" : ""};
  w.ill(-99, 99, 99); w.cls(-99, 99, 99, 99); w.school(-99, 99, 99); w.res(-99, 99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["기생충 약 하나가 **결석**을 줄였다?", "기생충 약 하나가, 아이들의 결석을 줄였다면요?", "pop"],
  ["2004년 **이코노메트리카**에 실린 논문", "이천사 년에 발표된 논문입니다."],
  ["저자: 미겔_교수와 크레머_교수(2019 노벨상)", "이 논문은, 미겔 교수와, 이천십구 년 노벨 경제학상을 받은, 크레머 교수가 썼습니다."]],
  build(el, hud) {
    const c = {w: villageWorld(el)};
    c.h = kin(hud, 120, "기생충 약 → **결석↓**?", 92);
    c.j = kin(hud, 120, "**2004** · Econometrica", 84);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.ill(lt, .5, 1.2);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 문제 */
scene({id: "problem", lines: [
  ["아프리카 케냐 서쪽: **장 속 기생충**에 걸린 아이가 많았다", "아프리카 케냐의 서쪽 지역, 초등학생 중에는, 장 속 기생충에 걸린 아이가 많았습니다.", "whoosh@0.1"],
  ["기생충 → 배가 아프고 기운이 없다 → **결석**", "기생충에 걸리면, 배가 아프고 기운이 없어서, 학교를 빠지기 쉽죠."],
  ["약은 싸다. 그런데 효과를 알아내기는 **의외로 어렵다**", "약은 값싸지만, 효과를 제대로 알아내기는, 의외로 어렵습니다."]],
  build(el, hud) {
    const c = {w: villageWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.03}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.ill(lt, -9, L[1] + .3);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 왜 어렵나 → 학교 단위 */
scene({id: "design", lines: [
  ["기생충은 **옮는다**: 약 먹은 아이가 주변도 지킨다", "기생충은 흙과 물을 통해 옮기 때문에, 약을 먹은 아이는, 주변 아이의 감염도 줄여 줍니다.", "pop"],
  ["같은 반 비교: 안 먹은 아이도 덕을 봐 **효과가 작게**", "그래서 같은 반 안에서, 먹은 아이와 안 먹은 아이를 비교하면, 안 먹은 아이도 덕을 봐서, 효과가 작게 나옵니다."],
  ["그래서 **학교 단위**로: 학교 75개를 무작위로 세 그룹", "그래서 연구진은, 학생이 아니라 학교 단위로 나눴습니다. 학교 칠십오 개를, 세 그룹으로 무작위로 나눠, 차례로 약을 줬죠."],
  ["먼저 약을 받은 학교 vs **아직인 학교** 비교", "그리고 먼저 약을 받은 학교와, 아직 받지 않은 학교를 비교했습니다."]],
  build(el, hud) {
    const c = {w: villageWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.ill(99, 0, 0);
    w.pan(lt < L[2] ? whip(lt, 0, 0, 1080, .9) : whip(lt, L[2], 1080, 2160, .9));
    w.cls(lt, .9, L[0] + 2.4, L[1] + 1.5); w.school(lt, L[2] + .6, L[3] + .2);
    c.o.up(lt, {mood: lt > L[1] && lt < L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["약을 받은 학교: 아직인 학교보다 결석 **4분의 1 감소**", "그 결과, 약을 받은 학교에서는, 아직인 학교에 비해, 결석이 사분의 일 줄었습니다.", "ding"],
  ["약을 안 먹은 아이, **이웃 학교** 아이도 더 건강하고 덜 빠졌다", "약을 먹지 않은 같은 학교 아이들, 그리고 가까운 이웃 학교 아이들도, 더 건강해지고 덜 빠졌습니다."],
  ["다만 시험 점수가 오른 증거는 **없었다**", "다만, 시험 점수가 올랐다는 증거는, 찾지 못했습니다."],
  ["학교에 1년 더 다니게 하는 비용: **약 3.5달러**", "학교에 일 년 더 다니게 하는 데 든 비용은, 약 삼 점 오 달러였습니다.", "coin"]],
  build(el, hud) {
    const c = {w: villageWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.school(99, 0, 0); w.pan(whip(lt, 0, 2160, 3240, .9)); w.res(lt, .8, L[1] + .3, L[3] + .3);
    c.o.up(lt, {mood: lt > L[2] && lt < L[3] ? "skeptical" : (lt > L[3] ? "surprised" : "happy"), look: [.7, -.6]});
  }
});

/* 5. 뜻 */
scene({id: "meaning", lines: [
  ["남에게까지 번지는 효과: **외부효과**(Externality)", "이렇게 남에게까지 번지는 효과를, 외부효과라고 합니다.", "ding"],
  ["외부효과가 커서 → 약값을 **전부 지원**할 만하다", "연구진은, 이 외부효과가 커서, 약값을 전부 지원할 만하다고 결론지었습니다."]],
  build(el, hud) {
    const c = {w: villageWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1, 1.05, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.res(99, -9, -9, -9); w.pan(whip(lt, 0, 3240, 1080, 1.2)); w.cls(lt, -9, -9, 99);
    c.o.up(lt, {mood: "happy", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**기생충**(Worms)〉", "논문 제목은, 기생충입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: villageWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
