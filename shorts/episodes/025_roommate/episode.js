/* 오늘의 경제 025 — 룸메이트와 학점 (v3: 부엉이 진행자·한 공간 카메라 이동·기숙사·추첨 배정·학점 막대)
   논문: Sacerdote, B. (2001) "Peer Effects with Random Assignment: Results for Dartmouth Roommates",
         Quarterly Journal of Economics 116(2): 681–704. doi:10.1162/00335530151144131
   확인(2026-11-17, 원문 PDF 는 이 세션에서 막힘 — 초록(IDEAS/SSRN)과 검색 요약으로 확인):
   - 다트머스 대학 신입생 룸메이트·기숙사 동료는 무작위 배정
   - 학점(GPA)과 사교 클럽(fraternity) 가입에 또래 효과, 전공 선택에는 없음
   - GPA 효과는 방(룸메이트) 단위, 사교 클럽 효과는 방과 기숙사 전체 단위
   - 룸메이트 1학년 GPA 1점 ↑ → 내 1학년 GPA 약 0.12점 ↑ (통제 변수에 따라 0.11), 저자도 '크기는 크지 않다(modest)'
   - 후속 요약: 이 효과는 4학년 무렵 사라짐 → 설명란에만
   학점 막대: 4.0 만점 = 480px, 1점 = 120px, 0.12점 = 14.4px. */
Object.assign(EP, {no: 25, style: "v2", title: "룸메이트와 학점", hook: "룸메이트가 내 학점을 바꿀까?",
  bgm: {seed: 681, bpm: 100, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2001, authors: "Bruce Sacerdote",
          title: "Peer Effects with Random Assignment: Results for Dartmouth Roommates",
          ko: "무작위 배정으로 본 또래 효과: 다트머스 룸메이트의 결과", cite: "116(2): 681–704", url: "https://doi.org/10.1162/00335530151144131"},
  yt: {title: "룸메이트가 내 학점을 바꿀까? | 또래 효과 #경제 #shorts",
       desc: "친한 친구끼리 성적이 비슷한 건 서로 영향을 줘서일까, 원래 비슷한 사람끼리 친해진 걸까? 보통은 이 둘을 구분하기 어렵다. 그런데 미국 다트머스 대학은 신입생 룸메이트를 무작위로 정해 줬다. 내가 고른 게 아니니, 두 사람의 성적이 같이 움직인다면 같이 지낸 영향이라고 볼 수 있다. 학점은 4점 만점 평균 점수(GPA)다. 룸메이트의 신입생 학점이 1점 높으면 내 학점은 평균 약 0.12점 높았다. 효과가 크지는 않지만 분명히 있었다. 남학생 사교 클럽(Fraternity) 같은 모임에 들어갈지도 룸메이트의 영향을 받았지만, 전공 선택에는 영향이 없었다. 이렇게 주변 사람이 내 행동을 바꾸는 것을 또래 효과(Peer Effect)라고 한다. (후속 연구 요약에 따르면 학점 효과는 4학년 무렵엔 사라진다.)",
       tags: ["경제", "또래효과", "무작위배정", "대학", "룸메이트", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", GREEN = "#2e6b4a";
const WW = 4320;                       // 세계 너비: 0 기숙사 | 1080 친구 둘(영향? 끼리끼리?) | 2160 추첨 배정 | 3240 학점 막대
let WID = 0;

function campusWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#1d2b5a"], [.6, "#5a4a8a"], [1, "#c98a7a"]]); lg("lawn", [[0, "#3f8a55"], [1, "#1c4a30"]]);
  lg("brick", [[0, "#a0563e"], [1, "#6e3626"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("lawn")}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 170 + (i % 3) * 60, rx: 150, ry: 36, fill: "#fff", opacity: .25}, g));
  // 0: 기숙사 건물 (창문 불빛)
  S("rect", {x: 170, y: 380, width: 740, height: 620, fill: U("brick"), stroke: "#3a1a12", "stroke-width": 6}, g);
  S("path", {d: "M150,390 L540,250 L930,390 Z", fill: "#3a2a3a"}, g);
  w.wins = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) w.wins.push(S("rect", {x: 220 + c * 140, y: 430 + r * 130, width: 90, height: 90, rx: 8, fill: "#ffe3a0", opacity: .3}, g));
  S("rect", {x: 490, y: 900, width: 100, height: 100, fill: "#2a1a12"}, g);
  ST(g, 540, 360, "기숙사", {"font-size": 46, "font-weight": 900, fill: "#fff"});
  // 1080: 친구 둘 + 물음
  w.fa = img(w.layer, "woman", 1080 + 360, 900, 220); w.fb = img(w.layer, "woman", 1080 + 720, 900, 220);
  w.qa = ST(g, 1080 + 540, 560, "서로 영향?", {"font-size": 60, "font-weight": 900, fill: GOLD, opacity: 0});
  w.qb = ST(g, 1080 + 540, 460, "원래 비슷?", {"font-size": 60, "font-weight": 900, fill: TEAL, opacity: 0});
  w.arr = S("path", {d: `M${1080 + 450},700 L${1080 + 630},700`, stroke: GOLD, "stroke-width": 10, "marker-end": "", opacity: 0}, g);
  w.think = img(w.layer, "thinking", 1080 + 540, 360, 130);
  // 2160: 추첨 배정 (방 6개)
  w.rooms = Array.from({length: 6}, (_, i) => {const x = 2160 + 170 + (i % 3) * 270, y = 560 + Math.floor(i / 3) * 280;
    S("rect", {x, y, width: 230, height: 230, rx: 18, fill: "#2a2440", stroke: "#8a7ab0", "stroke-width": 5}, g);
    ST(g, x + 115, y + 40, `${101 + i}호`, {"font-size": 34, "font-weight": 800, fill: "#c9cfe6"}); return {x, y}});
  const kinds = ["man", "woman", "person", "man", "woman", "person", "woman", "man", "person", "man", "woman", "person"];
  w.stu = kinds.map((k, i) => img(w.layer, k, 2160 + 540, 420, 90));
  const r = rng(25); w.dest = w.stu.map((_, i) => {const room = w.rooms[Math.floor(i / 2)]; return [room.x + 70 + (i % 2) * 90, room.y + 210]});
  w.order = w.stu.map((_, i) => i).sort(() => r() - .5);
  w.die = img(w.layer, "game_die", 2160 + 540, 420, 150);
  // 3240: 학점 막대 (4.0 만점)
  const bx = 3240, base = 900, k = 120;
  [[0, "0"], [1, "1"], [2, "2"], [3, "3"], [4, "4.0"]].forEach(([v, t]) => {S("line", {x1: bx + 150, y1: base - v * k, x2: bx + 930, y2: base - v * k, stroke: "#fff", opacity: .12, "stroke-width": 3}, g);
    ST(g, bx + 110, base - v * k + 14, t, {"font-size": 38, "font-weight": 800, fill: "#c9cfe6"})});
  w.bars = [["룸메이트", CORAL, bx + 360, 2.6, 1], ["나", TEAL, bx + 720, 2.6, .12]].map(([t, col, x, v0, dv]) => {
    const rr = S("rect", {x: x - 110, y: base - v0 * k, width: 220, height: v0 * k, rx: 12, fill: col, opacity: .85}, g);
    const up = S("rect", {x: x - 110, y: base - v0 * k, width: 220, height: 0, fill: GOLD}, g);
    ST(g, x, base - 30, t, {"font-size": 48, "font-weight": 900, fill: "#10182a"});
    const lab = ST(g, x, 0, "", {"font-size": 56, "font-weight": 900, fill: GOLD});
    return {rr, up, lab, x, v0, dv}});
  // 앞쪽(흐린) 나뭇가지: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 320, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("path", {d: `M${x - 200},0 Q${x},90 ${x + 220},40`, stroke: "#10140c", "stroke-width": 16, fill: "none"}, fs);
    for (let j = 0; j < 6; j++) S("ellipse", {cx: x - 160 + j * 70, cy: 50 + (j % 2) * 40, rx: 46, ry: 26, fill: "#16301e", opacity: .9}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 12 * (1 + i % 3)) % WW));
    w.wins.forEach((e, i) => e.setAttribute("opacity", .3 + .5 * (Math.sin(lt * .8 + i * 1.7) > .3 ? 1 : 0)));
    imgAt(w.fa, 1080 + 360, 900 - 6 * Math.abs(Math.sin(lt * 2.2)), 1, 0); imgAt(w.fb, 1080 + 720, 900 - 6 * Math.abs(Math.sin(lt * 2.2 + 1)), 1, 0)};
  w.ask = (lt, ta, tb) => {w.qa.setAttribute("opacity", P(lt, ta, .3)); w.qb.setAttribute("opacity", P(lt, tb, .3));
    const u = spr((lt - ta) / .5); imgAt(w.think, 1080 + 540, 330, clamp(u, 0, 1.2), 0); w.think.style.opacity = clamp(u * 2)};
  w.assign = (lt, t0) => {const ud = spr((lt - t0) / .5); imgAt(w.die, 2160 + 540, 420, clamp(ud, 0, 1.2), lt * 200 * (lt < t0 + 2 ? 1 : 0)); w.die.style.opacity = clamp(ud * 2) * (1 - P(lt, t0 + 3, .3));
    w.order.forEach((idx, j) => {const e = w.stu[idx], u = ease((lt - t0 - .4 - j * .18) / .5), [dx, dy] = w.dest[idx];
      imgAt(e, lerp(2160 + 540, dx, u), lerp(470, dy, u) - 60 * Math.sin(Math.PI * u), 1, 0); e.style.opacity = lt > t0 + .4 + j * .18 ? 1 : 0})};
  w.gpa = (lt, t0) => w.bars.forEach((b, j) => {const u = ease((lt - t0 - j * 1.2) / .8), h = b.dv * 120 * u;
    b.up.setAttribute("y", 900 - b.v0 * 120 - h); b.up.setAttribute("height", h);
    b.lab.setAttribute("y", 900 - b.v0 * 120 - h - 30); b.lab.textContent = u > .95 ? (j ? "+약 0.12" : "+1점") : ""});
  w.ask(-99, 99, 99); w.assign(-99, 99); w.gpa(-99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["룸메이트가 **내 학점**을 바꿀까?", "같은 방을 쓰는 룸메이트가, 내 학점을 바꿀 수 있을까요?", "pop"],
  ["2001년 **QJE**에 실린 논문", "이천일 년에 나온 논문입니다."],
  ["저자: 새서도트_교수", "저자는, 새서도트 교수입니다."]],
  build(el, hud) {
    const c = {w: campusWorld(el)};
    c.h = kin(hud, 120, "룸메이트가 **내 학점**을?", 84);
    c.j = kin(hud, 120, "**2001** · QJE", 96);
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

/* 2. 어려움: 영향인가, 끼리끼리인가 */
scene({id: "problem", lines: [
  ["친구끼리 성적이 비슷한 건 **서로 영향**을 줘서일까?", "친한 친구끼리 성적이 비슷한 건, 서로 영향을 줘서일까요?", "pop"],
  ["아니면 **원래 비슷한** 사람끼리 친해진 걸까?", "아니면, 원래 비슷한 사람끼리 친해진 걸까요?"],
  ["보통은 이 둘을 **구분하기 어렵다**", "보통은 이 둘을 구분하기 어렵습니다."]],
  build(el, hud) {
    const c = {w: campusWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9)); w.ask(lt, .9, L[1] + .2);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 무작위 배정 */
scene({id: "design", lines: [
  ["다트머스 대학: 신입생 룸메이트를 **무작위로** 배정", "그런데 미국 다트머스 대학은, 신입생 룸메이트를 무작위로 정했습니다.", "whoosh@0.2"],
  ["내가 고르지 않았으니, 성적이 같이 움직이면 **같이 지낸 영향**", "내가 고른 게 아니니, 두 사람의 성적이 같이 움직인다면, 같이 지낸 영향이라고 볼 수 있죠."]],
  build(el, hud) {
    const c = {w: campusWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.assign(lt, 1);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["학점 = **4점 만점** 평균 점수(GPA)", "여기서 학점은, 사 점 만점의 평균 점수입니다.", "whoosh@0.2"],
  ["룸메이트 학점이 **1점** 높으면, 내 학점은 **약_0.12점** 높았다", "결과, 룸메이트의 신입생 학점이 일 점 높으면, 내 학점은 평균 약 영 점 일이 점 높았습니다.", "coin"],
  ["효과는 **크지 않지만**, 분명히 있었다", "효과가 크지는 않지만, 분명히 있었습니다."],
  ["**사교 클럽**(Fraternity) 가입도 룸메이트의 영향을 받았다", "또, 남학생 사교 클럽 같은 모임에 들어갈지도, 룸메이트의 영향을 받았습니다."],
  ["하지만 **전공 선택**에는 영향이 없었다", "하지만 전공 선택에는, 영향이 없었습니다."]],
  build(el, hud) {
    const c = {w: campusWorld(el)};
    c.chips = CX(hud, 190, "<span class='chip' style='font-size:44px'>사교 클럽 가입 ✔ 영향</span>　<span class='chip' style='font-size:44px'>전공 선택 ✕ 없음</span>", "", {});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lt > L[1] && lt < L[3] ? lerp(1.02, 1.1, ease((lt - L[1]) / 2)) : 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.assign(99, 0); w.gpa(lt, L[1] + .6);
    const sp = c.chips.querySelectorAll(".chip"); sp[0].style.opacity = P(lt, L[3] + .3, .3); sp[1].style.opacity = P(lt, L[4] + .2, .3);
    c.o.up(lt, {mood: lt > L[2] && lt < L[3] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 의미 */
scene({id: "meaning", lines: [
  ["이것이 **또래_효과**(Peer Effect)", "이렇게 주변 사람이 내 행동을 바꾸는 것을, 또래 효과라고 부릅니다.", "ding"],
  ["**무작위 배정** 덕분에 둘을 나눠 볼 수 있었다", "무작위 배정 덕분에, 영향인지, 원래 비슷해서인지를 나눠 볼 수 있었던 거죠."]],
  build(el, hud) {
    const c = {w: campusWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 2160, 1)); w.assign(99, 0); w.gpa(99, 0);
    c.o.up(lt, {mood: "happy", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**무작위 배정으로 본 또래 효과**〉", "논문 제목은, 무작위 배정으로 본 또래 효과입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: campusWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 0, 1)); w.assign(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
