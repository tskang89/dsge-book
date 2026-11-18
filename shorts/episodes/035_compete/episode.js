/* 오늘의 경제 035 — 경쟁이 붙으면 (v3: 부엉이 진행자·한 공간 카메라 이동·미로 화면·보상 방식·미로 타일 기둥·여자끼리 경쟁)
   논문: Gneezy, U., Niederle, M. & Rustichini, A. (2003) "Performance in Competitive Environments: Gender Differences",
         Quarterly Journal of Economics 118(3): 1049–1074. doi:10.1162/00335530360698496
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·니덜 교수 정리 논문/발표 자료 요약으로 확인):
   - 이스라엘 테크니온(공과대학) 학생, 15분 동안 컴퓨터 미로 풀기
   - 푼 만큼(piece rate): 남 11.2개, 여 9.7개 — 통계적으로 의미 있는 차이 아님
   - 혼성 경쟁(남3·여3, 6명 중 1등만, 미로당 6배): 여 약 10.8개(성과급과 차이 없음), 남녀 차이 4.2개(유의) → 남 약 15.0개
   - 같은 성별끼리 경쟁(여 6명): 여자는 혼성 경쟁 때보다 더 많이 풂(수치는 확인 못 해 쓰지 않음)
   - 초록: 비경쟁 환경에서 비슷해도 경쟁 환경에서는 여성이 덜 효과적일 수 있다
   타일 기둥: 1칸 = 미로 1개, 소수점은 칸 일부로. */
Object.assign(EP, {no: 35, style: "v2", title: "경쟁이 붙으면", hook: "경쟁이 붙으면 성적이 달라질까?",
  bgm: {seed: 1049, bpm: 104, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2003, authors: "Uri Gneezy, Muriel Niederle & Aldo Rustichini",
          title: "Performance in Competitive Environments: Gender Differences", ko: "경쟁 환경에서의 성과: 남녀 차이",
          cite: "118(3): 1049–1074", url: "https://doi.org/10.1162/00335530360698496"},
  yt: {title: "경쟁이 붙으면 성적이 달라질까? | 경쟁과 남녀 차이 #경제 #shorts",
       desc: "연구진은 이스라엘의 한 공과대학 학생들에게 15분 동안 컴퓨터 미로를 풀게 했다. 첫 번째 방식은 미로를 하나 풀 때마다 돈을 주는 것, 두 번째 방식은 6명이 겨뤄 가장 많이 푼 한 명만 6배의 돈을 받는 경쟁이다. 경쟁하는 6명은 남자 셋과 여자 셋으로 짰다. 푼 만큼 돈을 받을 때는 남자가 평균 11.2개, 여자가 9.7개로 의미 있는 차이가 아니었다(우연으로도 생길 만한 차이). 그런데 경쟁이 붙자 남자는 약 15개로 크게 늘었고, 여자는 약 10.8개로 거의 그대로였다. 남녀 차이가 약 4.2개로 벌어진 것이다. 그렇다면 여자끼리만 경쟁하게 하면? 이때는 여자들도 남녀가 섞여 겨룰 때보다 더 많이 풀었다. 같은 실력이라도 어떤 경쟁 환경이냐에 따라 성과가 달라질 수 있다는 것. 다만 한 대학 학생들을 대상으로 한 실험실 실험이라 그대로 일반화하는 건 조심해야 한다.",
       tags: ["경제", "실험경제학", "경쟁", "성별", "행동경제학", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", PINK = "#ff8ac0";
const WW = 4320;                       // 세계 너비: 0 컴퓨터 실험실 | 1080 보상 방식 | 2160 타일 기둥 | 3240 여자끼리 경쟁
let WID = 0;

function labWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("bg", [[0, "#10203a"], [1, "#1e3456"]]); lg("floor", [[0, "#22324a"], [1, "#0e1626"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("bg")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 90) S("line", {x1: x, y1: 0, x2: x, y2: 1000, stroke: "#fff", opacity: .03}, g);
  // 0: 미로 화면 + 학생들
  S("rect", {x: 220, y: 230, width: 640, height: 480, rx: 22, fill: "#0b1020", stroke: "#4a5a7a", "stroke-width": 10}, g);
  // 미로: 6×4 칸, 깊이 우선 탐색으로 만든 '완전 미로' — 공은 실제로 뚫린 길만 따라 움직인다
  const MC = 6, MR = 4, mx = 260, my = 270, cw = 560 / MC, chh = 400 / MR, mr = rng(35);
  const R_ = Array.from({length: MR}, () => Array(MC).fill(true)), D_ = Array.from({length: MR}, () => Array(MC).fill(true));
  const seen = Array.from({length: MR}, () => Array(MC).fill(false)), st = [[0, 0]]; seen[0][0] = true;
  while (st.length) {const [r0, c0] = st[st.length - 1];
    const nb = [[r0 - 1, c0], [r0 + 1, c0], [r0, c0 - 1], [r0, c0 + 1]].filter(([r1, c1]) => r1 >= 0 && r1 < MR && c1 >= 0 && c1 < MC && !seen[r1][c1]);
    if (!nb.length) {st.pop(); continue}
    const [r1, c1] = nb[Math.floor(mr() * nb.length)];
    if (r1 === r0) R_[r0][Math.min(c0, c1)] = false; else D_[Math.min(r0, r1)][c0] = false;
    seen[r1][c1] = true; st.push([r1, c1])}
  let mz = `M${mx},${my} h560 v400 h-560 Z`;
  for (let r0 = 0; r0 < MR; r0++) for (let c0 = 0; c0 < MC; c0++) {
    if (c0 < MC - 1 && R_[r0][c0]) mz += ` M${mx + (c0 + 1) * cw},${my + r0 * chh} v${chh}`;
    if (r0 < MR - 1 && D_[r0][c0]) mz += ` M${mx + c0 * cw},${my + (r0 + 1) * chh} h${cw}`}
  S("path", {d: mz, stroke: TEAL, "stroke-width": 12, fill: "none", "stroke-linecap": "round"}, g);
  // 출발(왼쪽 위) → 도착(오른쪽 아래) 길 찾기
  const prev = {}, q = [[0, 0]], key = (r1, c1) => r1 + "," + c1; prev[key(0, 0)] = null;
  while (q.length) {const [r0, c0] = q.shift(); if (r0 === MR - 1 && c0 === MC - 1) break;
    const mv = [];
    if (c0 < MC - 1 && !R_[r0][c0]) mv.push([r0, c0 + 1]); if (c0 > 0 && !R_[r0][c0 - 1]) mv.push([r0, c0 - 1]);
    if (r0 < MR - 1 && !D_[r0][c0]) mv.push([r0 + 1, c0]); if (r0 > 0 && !D_[r0 - 1][c0]) mv.push([r0 - 1, c0]);
    mv.forEach(([r1, c1]) => {if (!(key(r1, c1) in prev)) {prev[key(r1, c1)] = [r0, c0]; q.push([r1, c1])}})}
  w.mpath = []; for (let cur = [MR - 1, MC - 1]; cur; cur = prev[key(cur[0], cur[1])]) w.mpath.unshift([mx + (cur[1] + .5) * cw, my + (cur[0] + .5) * chh]);
  S("rect", {x: mx + (MC - 1) * cw + 14, y: my + (MR - 1) * chh + 14, width: cw - 28, height: chh - 28, rx: 10, fill: GOLD, opacity: .25}, g);
  w.dot = S("circle", {cx: w.mpath[0][0], cy: w.mpath[0][1], r: 16, fill: GOLD}, g);
  w.timer = ST(g, 540, 790, "15분", {"font-size": 60, "font-weight": 900, fill: GOLD});
  w.kids = [["man", 200], ["woman", 400], ["man", 680], ["woman", 880]].map(([k, x]) => img(w.layer, k, x, 1000, 150));
  // 1080: 보상 방식
  w.optA = [ST(g, 1080 + 290, 330, "① 푼 만큼", {"font-size": 56, "font-weight": 900, fill: "#fff", opacity: 0}),
            ST(g, 1080 + 290, 720, "미로 1개 = 동전 1개", {"font-size": 38, "font-weight": 800, fill: "#c9cfe6", opacity: 0})];
  w.coinsA = Array.from({length: 4}, (_, i) => img(w.layer, "coin", 1080 + 200 + (i % 2) * 180, 520 + Math.floor(i / 2) * 120, 100));
  w.optB = [ST(g, 1080 + 790, 330, "② 1등만", {"font-size": 56, "font-weight": 900, fill: GOLD, opacity: 0}),
            ST(g, 1080 + 790, 720, "대신 미로 1개 = 동전 6개", {"font-size": 38, "font-weight": 800, fill: "#c9cfe6", opacity: 0})];
  w.trophy = img(w.layer, "trophy", 1080 + 790, 620, 220);
  w.six = [["man", 1080 + 600], ["man", 1080 + 680], ["man", 1080 + 760], ["woman", 1080 + 840], ["woman", 1080 + 920], ["woman", 1080 + 1000]].map(([k, x]) => img(w.layer, k, x - 30, 960, 90));
  w.sixLab = ST(g, 1080 + 800, 1050, "남자 셋 + 여자 셋", {"font-size": 38, "font-weight": 900, fill: "#fff", opacity: 0});
  // 2160: 미로 타일 기둥 (1칸 = 미로 1개)
  const base = 960, th = 36;
  w.cols = [["남", 11.2, 15.0, BLUE, 2160 + 330], ["여", 9.7, 10.8, PINK, 2160 + 750]].map(([t, a, b, col, x]) => {
    const tiles = Array.from({length: 16}, (_, i) => S("rect", {x: x - 90, y: base - (i + 1) * th, width: 180, height: th - 4, rx: 6, fill: col, opacity: 0}, g));
    const lab = ST(g, x, base + 56, t, {"font-size": 52, "font-weight": 900, fill: col});
    const val = ST(g, x, 0, "", {"font-size": 52, "font-weight": 900, fill: "#fff"});
    return {tiles, a, b, x, val}});
  w.mode = ST(g, 2160 + 540, 240, "", {"font-size": 50, "font-weight": 900, fill: GOLD});
  w.gap = ST(g, 2160 + 540, 330, "", {"font-size": 48, "font-weight": 900, fill: CORAL});
  // 3240: 여자끼리 경쟁
  w.wom = Array.from({length: 6}, (_, i) => img(w.layer, "woman", 3240 + 190 + i * 140, 980, 140));
  w.wLab = ST(g, 3240 + 540, 330, "여자끼리 경쟁", {"font-size": 64, "font-weight": 900, fill: PINK, opacity: 0});
  w.up = ST(g, 3240 + 540, 560, "혼성 경쟁 때보다 ↑", {"font-size": 60, "font-weight": 900, fill: GOLD, opacity: 0});
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#e8f1ff", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  const path = w.mpath;
  w.anim = lt => {const u = Math.min(1, ((lt * .2) % 1.25)), k = u * (path.length - 1), i = Math.floor(k), f = k - i, p = path[i], q = path[Math.min(i + 1, path.length - 1)];
    w.dot.setAttribute("cx", lerp(p[0], q[0], f)); w.dot.setAttribute("cy", lerp(p[1], q[1], f));
    w.kids.forEach((e, i) => imgAt(e, [200, 400, 680, 880][i], 1000 - 4 * Math.abs(Math.sin(lt * 2 + i)), 1, 0));
    w.wom.forEach((e, i) => imgAt(e, 3240 + 190 + i * 140, 980 - 5 * Math.abs(Math.sin(lt * 2.4 + i)), 1, 0))};
  w.pay = (lt, ta, tb, ts) => {w.optA.forEach(e => e.setAttribute("opacity", P(lt, ta, .3)));
    w.coinsA.forEach((c, i) => {const u = spr((lt - ta - .3 - i * .2) / .4); imgAt(c, 1080 + 200 + (i % 2) * 180, 520 + Math.floor(i / 2) * 120, clamp(u, 0, 1.2), 0); c.style.opacity = clamp(u * 2)});
    w.optB.forEach(e => e.setAttribute("opacity", P(lt, tb, .3)));
    const ut = spr((lt - tb - .3) / .5); imgAt(w.trophy, 1080 + 790, 620, clamp(ut, 0, 1.2), 0); w.trophy.style.opacity = clamp(ut * 2) * (1 - P(lt, ts, .3));
    w.six.forEach((e, i) => {const u = spr((lt - ts - i * .1) / .4); imgAt(e, [600, 680, 760, 840, 920, 1000][i] + 1080 - 30, 960, clamp(u, 0, 1.2), 0); e.style.opacity = clamp(u * 2)});
    w.sixLab.setAttribute("opacity", P(lt, ts + .6, .3))};
  w.stack = (lt, ta, tb) => {w.cols.forEach((c, j) => {const v = lt < tb ? c.a * ease((lt - ta - j * .4) / 1) : lerp(c.a, c.b, ease((lt - tb - j * .4) / 1));
      c.tiles.forEach((t, i) => {const f = clamp(v - i); t.setAttribute("opacity", f > 0 ? 1 : 0); t.setAttribute("height", Math.max(0, (th - 4) * f)); t.setAttribute("y", base - i * th - (th - 4) * f - 4)});
      c.val.setAttribute("y", base - v * th - 30); c.val.textContent = lt > ta + .4 ? `${v.toFixed(1)}개` : ""});
    w.mode.textContent = lt > tb ? "② 혼성 경쟁 (1등만)" : lt > ta ? "① 푼 만큼" : "";
    w.gap.textContent = lt > tb + 2.4 ? "차이 약 4.2개" : ""};
  w.only = (lt, t0, tu) => {w.wLab.setAttribute("opacity", P(lt, t0, .3)); w.up.setAttribute("opacity", P(lt, tu, .3))};
  w.pay(-99, 99, 99, 99); w.stack(-99, 99, 99); w.only(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["경쟁이 붙으면 **성적이 달라질까?**", "경쟁이 붙으면, 성적이 달라질까요?", "pop"],
  ["2003년 **QJE**에 실린 논문", "이천삼 년에 나온 논문입니다."],
  ["저자: 그니지·니덜레·러스티치니 교수", "저자는, 그니지 교수, 니덜레 교수, 그리고 러스티치니 교수입니다."]],
  build(el, hud) {
    const c = {w: labWorld(el)};
    c.h = kin(hud, 120, "경쟁이 붙으면 **성적이?**", 86);
    c.j = kin(hud, 120, "**2003** · QJE", 96);
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

/* 2. 실험 설계 */
scene({id: "setup", lines: [
  ["이스라엘 공과대학 학생들: 15분 동안 **컴퓨터 미로 풀기**", "연구진은 이스라엘의 한 공과대학 학생들에게, 십오 분 동안, 컴퓨터 미로를 풀게 했습니다.", "pop"],
  ["방식 ①: 미로 **하나 풀 때마다** 돈을 준다", "첫 번째 방식은, 미로를 하나 풀 때마다, 돈을 주는 겁니다.", "coin"],
  ["방식 ②: 여섯 명 중 **1등만** 받는다 (대신 6배)", "두 번째 방식은, 여섯 명이 함께 풀어서, 가장 많이 푼 한 명만, 여섯 배의 돈을 받는 경쟁입니다.", "pop"],
  ["경쟁하는 여섯 명은 **남자 셋 + 여자 셋**", "경쟁하는 여섯 명은, 남자 셋과 여자 셋으로 짰습니다."]],
  build(el, hud) {
    const c = {w: labWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? 0 : whip(lt, L[1], 0, 1080, .9)); w.pay(lt, L[1] + .6, L[2] + .2, L[3] + .2);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 3. 결과: 혼성 경쟁 */
scene({id: "result", lines: [
  ["푼 만큼: 남 **11.2개**, 여 **9.7개** — 의미 있는 차이 아님", "푼 만큼 돈을 받을 때는, 남자가 평균 십일 점 이 개를 풀었고, 여자가 구 점 칠 개로, 의미 있는 차이가 아니었습니다.", "coin"],
  ["(우연으로도 생길 만한 **작은 차이**)", "우연으로도 생길 만한, 작은 차이였다는 뜻이죠."],
  ["경쟁: 남 **약 15개**로 ↑, 여 **약 10.8개** 그대로", "그런데 경쟁이 붙자, 남자는 약 십오 개로 크게 늘었고, 여자는 약 십 점 팔 개로, 거의 그대로였습니다.", "ding"],
  ["남녀 차이가 **약 4.2개**로 벌어졌다", "그래서 남녀 차이가, 약 사 점 이 개로 크게 벌어졌죠."]],
  build(el, hud) {
    const c = {w: labWorld(el)};
    c.u = CX(hud, 1150, "타일 1칸 = 미로 1개 (평균)", "", {fontSize: "32px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.pay(99, 0, 0, 0); w.stack(lt, .9, L[2] + .3); ap(c.u, lt, 1.2);
    c.o.up(lt, {mood: lt > L[2] + 1.6 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 여자끼리 경쟁 */
scene({id: "single", lines: [
  ["그렇다면 **여자끼리만** 경쟁하게 하면?", "그렇다면, 여자끼리만 경쟁하게 하면 어떨까요?", "whoosh@0.2"],
  ["여자들도 혼성 경쟁 때보다 **더 많이** 풀었다", "이때는 여자들도, 남녀가 섞여 경쟁할 때보다, 더 많이 풀었습니다.", "ding"]],
  build(el, hud) {
    const c = {w: labWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.stack(99, 0, 0); w.only(lt, .8, L[1] + .3);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "skeptical", look: [.7, -.5]});
  }
});

/* 5. 뜻과 한계 */
scene({id: "meaning", lines: [
  ["**누구와_어떻게_경쟁하느냐**에 따라 성과가 달라진다", "같은 실력이라도, 누구와 어떻게 경쟁하느냐에 따라, 성과가 달라질 수 있다는 겁니다.", "ding"],
  ["다만 **한 대학의 실험실 실험**: 일반화는 조심", "다만 한 대학 학생들을 대상으로 한 실험실 실험이라, 그대로 일반화하는 건 조심해야 합니다."]],
  build(el, hud) {
    const c = {w: labWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1.2)); w.only(99, 0, 0);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**경쟁하는 환경에서의 성과**, 남녀 차이〉", "논문 제목은, 경쟁하는 환경에서의 성과, 그리고 남녀 차이입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: labWorld(el)};
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
