/* 오늘의 경제 024 — 돈을 못 꺼내는 통장 (v3: 부엉이 진행자·한 공간 카메라 이동·통장 비교·100칸 격자·동전 기둥·돛대)
   논문: Ashraf, N., Karlan, D. & Yin, W. (2006) "Tying Odysseus to the Mast: Evidence from a Commitment Savings Product in the Philippines",
         Quarterly Journal of Economics 121(2): 635–672. doi:10.1162/qjec.2006.121.2.635
   확인(2026-11-17, 원문 PDF 는 이 세션에서 막힘 — 검색 요약(IPA·J-PAL·AEA 등록부·작업 논문 발췌)으로 확인):
   - 필리핀 부투안시 Green Bank of Caraga 고객 1,777명, 무작위로 약정 통장 권유·저축 권유만·아무것도 안 함 세 집단
   - SEED 통장: 목표 날짜나 목표한 돈을 정하면 그때까지 꺼낼 수 없음, 이자는 보통 통장과 같음(연 4%)
   - 권유받은 고객 중 202명(28.4%)이 가입
   - 1년 뒤 약정 통장을 권유받은 집단의 평균 저축이 비교 집단보다 81~82% 늘어남(배정 기준 = 가입 안 한 사람 포함) → 영상은 “80% 넘게”
   - 확인 못 한 것(쓰지 않음): 저축 권유만 받은 집단의 효과 크기, 설문상 성향과 가입의 관계
   격자 100칸 중 28칸. 동전 기둥 10개 vs 18개(= +80%, 비율만 표시). */
Object.assign(EP, {no: 24, style: "v2", title: "돈을 못 꺼내는 통장", hook: "이자는 같은데 돈을 못 꺼내는 통장, 누가 가입할까?",
  bgm: {seed: 635, bpm: 98, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2006, authors: "Nava Ashraf, Dean Karlan & Wesley Yin",
          title: "Tying Odysseus to the Mast: Evidence from a Commitment Savings Product in the Philippines",
          ko: "오디세우스를 배 기둥(돛대)에 묶기: 필리핀 약정 저축 상품의 증거", cite: "121(2): 635–672", url: "https://doi.org/10.1162/qjec.2006.121.2.635"},
  yt: {title: "이자는 같은데 돈을 못 꺼내는 통장, 누가 가입할까? | 오디세우스의 돛대 #경제 #shorts",
       desc: "연구진은 필리핀의 한 은행과 함께 고객 1,777명(영상에선 1,700명 넘게)을 대상으로 실험했다. 새 통장은 목표 날짜나 목표한 돈을 정하면 그때까지 돈을 꺼낼 수 없다. 그런데 이자는 보통 통장과 똑같았다(연 4%). 자유만 줄어드는 셈이니 아무도 고르지 않을 것 같지만, 이 통장을 권유받은 고객 중 28%가 가입했다. 1년 뒤, 이 통장을 권유받은 사람들은 아무 제안도 받지 않은 사람들보다 저축이 80% 넘게 늘었다(논문 81~82%). 가입하지 않은 사람까지 모두 넣은 평균이다. 그리스 신화의 오디세우스는 바다 요정의 노래에 홀리지 않으려고 자기 몸을 배 기둥(돛대)에 묶게 했다. 이렇게 미래의 나를 미리 묶어 두는 방법을 약속 장치(Commitment Device)라고 부른다. 연구진은 돈이 생기면 써 버릴 걸 아는 사람들이 스스로 손을 묶은 것으로 봤다.",
       tags: ["경제", "행동경제학", "약속장치", "저축", "자기통제", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 은행 | 1080 통장 둘 | 2160 격자·동전 | 3240 바다·돛대
let WID = 0;

function seedWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#2a3a7a"], [.55, "#e07a5f"], [1, "#f6c27a"]]); lg("sea", [[0, "#2c6e8f"], [1, "#0d2a3d"]]);
  lg("street", [[0, "#3b3045"], [1, "#1c1726"]]); lg("book", [[0, "#2f5d9a"], [1, "#1d3c6a"]]); lg("book2", [[0, "#9a4a2f"], [1, "#6a2c1d"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  w.sun = S("circle", {cx: 3240 + 820, cy: 760, r: 110, fill: "#ffe3a0", opacity: .9}, g);
  S("rect", {x: 0, y: 1000, width: 3240, height: H - 1000, fill: U("street")}, g);
  S("rect", {x: 3240, y: 860, width: 1080, height: H - 860, fill: U("sea")}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 180 + (i % 3) * 60, rx: 150, ry: 38, fill: "#fff", opacity: .35}, g));
  // 0: 은행 거리
  w.bank = img(w.layer, "bank", 540, 1000, 520);
  [120, 960].forEach(x => {S("rect", {x: x - 70, y: 760, width: 140, height: 240, fill: "#5a4a68"}, g);
    for (let k = 0; k < 3; k++) S("rect", {x: x - 45, y: 790 + k * 70, width: 90, height: 40, rx: 6, fill: "#ffd98a", opacity: .7}, g)});
  // 1080: 통장 둘
  const pb = (x, fill, title) => {S("rect", {x: x - 200, y: 360, width: 400, height: 520, rx: 26, fill, stroke: "#10182a", "stroke-width": 6}, g);
    S("rect", {x: x - 200, y: 360, width: 400, height: 110, rx: 26, fill: "#000", opacity: .18}, g);
    ST(g, x, 435, title, {"font-size": 50, "font-weight": 900, fill: "#fff"});
    ST(g, x, 570, "이자 연 4%", {"font-size": 52, "font-weight": 900, fill: GOLD})};
  pb(1080 + 290, U("book"), "보통 통장"); pb(1080 + 790, U("book2"), "약정 통장");
  w.free = ST(g, 1080 + 290, 720, "언제든 꺼냄", {"font-size": 46, "font-weight": 800, fill: "#e8f0ff"});
  w.rule = [ST(g, 1080 + 790, 650, "목표한 날짜·돈까지", {"font-size": 40, "font-weight": 800, fill: "#ffe8dc", opacity: 0}),
            ST(g, 1080 + 790, 715, "못 꺼냄", {"font-size": 56, "font-weight": 900, fill: "#fff", opacity: 0})];
  w.lock = img(w.layer, "locked", 1080 + 790, 870, 120);
  w.cal = img(w.layer, "spiral_calendar", 1080 + 990, 400, 120);
  w.eq = ST(g, 1080 + 540, 590, "=", {"font-size": 90, "font-weight": 900, fill: GOLD, opacity: 0});
  // 2160: 100칸 격자 (가입 28칸)
  const gx = 2160 + 190, gy = 330, cs = 70;
  w.cells = Array.from({length: 100}, (_, i) => S("rect", {x: gx + (i % 10) * cs, y: gy + Math.floor(i / 10) * cs, width: cs - 10, height: cs - 10, rx: 10, fill: "#4a4a5a"}, g));
  w.gLab = ST(g, 2160 + 540, 280, "", {"font-size": 50, "font-weight": 900, fill: GOLD});
  w.gridG = [w.gLab, ...w.cells];
  // 2160: 동전 기둥 (같은 자리, 격자 다음)
  w.coins = [["아무 제안\n없던 쪽", 10, "#c9cfe6", 2160 + 330], ["통장을\n권유받은 쪽", 18, GOLD, 2160 + 750]].map(([t, m, col, x]) => {
    const cs2 = Array.from({length: m}, (_, i) => S("ellipse", {cx: x, cy: 940 - i * 32, rx: 110, ry: 26, fill: col, stroke: "#6a5520", "stroke-width": 4, opacity: 0}, g));
    const lab = t.split("\n").map((s, k) => ST(g, x, 1050 + k * 46, s, {"font-size": 40, "font-weight": 800, fill: "#e8e0ff", opacity: 0}));
    return {cs2, lab}});
  w.badge = ST(g, 2160 + 750, 300, "+80% 넘게", {"font-size": 84, "font-weight": 900, fill: GOLD, opacity: 0});
  w.cUnit = ST(g, 2160 + 540, 1160, "1년 뒤 저축 (아무 제안 없던 쪽 = 동전 10개)", {"font-size": 34, "font-weight": 700, fill: "#c9cfe6", opacity: 0});
  // 3240: 바다·돛대·노래
  w.ship = img(w.layer, "sailboat", 3240 + 420, 960, 420);
  w.ody = img(w.layer, "man", 3240 + 372, 880, 150);
  w.rock = img(w.layer, "rock", 3240 + 880, 960, 200);
  w.notes = [0, 1, 2].map(k => img(w.layer, "musical_notes", 3240 + 860, 760, 90));
  const g2 = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  w.rope = S("path", {d: "", stroke: "#8a5a2a", "stroke-width": 12, fill: "none", "stroke-linecap": "round", opacity: 0}, g2);
  w.waves = Array.from({length: 4}, (_, i) => S("path", {d: "", stroke: "#cfefff", "stroke-width": 4, fill: "none", opacity: .35}, g));
  // 앞쪽(흐린) 갈매기·전선: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => S("path", {d: `M${x - 60},90 Q${x - 30},50 ${x},90 Q${x + 30},50 ${x + 60},90`, stroke: "#1a1420", "stroke-width": 9, fill: "none", opacity: .7}, fs));
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 14 * (1 + i % 3)) % WW));
    w.waves.forEach((p, i) => {const y = 900 + i * 60; let s = `M${3240},${y}`;
      for (let x = 0; x <= 1080; x += 40) s += ` L${3240 + x},${y + 10 * Math.sin(x / 70 + lt * 2 + i)}`; p.setAttribute("d", s)});
    const by = 8 * Math.sin(lt * 1.6); imgAt(w.ship, 3240 + 420, 960 + by, 1, 3 * Math.sin(lt * 1.2)); imgAt(w.ody, 3240 + 372, 880 + by, 1, 0); w.rope.setAttribute("transform", `translate(0,${by})`);
    w.notes.forEach((e, k) => {const u = ((lt * .5 + k / 3) % 1); imgAt(e, 3240 + 860 - 260 * u, 800 - 200 * u, .7 + .4 * u, 15 * Math.sin(lt * 3 + k)); e.style.opacity = Math.sin(Math.PI * u) * .9})};
  w.passRule = (lt, t0) => {w.rule.forEach((t, i) => t.setAttribute("opacity", P(lt, t0 + i * .3, .3)));
    const u = spr((lt - t0 - .5) / .5); imgAt(w.lock, 1080 + 790, 870, clamp(u, 0, 1.2), 0); w.lock.style.opacity = clamp(u * 2);
    imgAt(w.cal, 1080 + 990, 400, clamp(spr((lt - t0) / .5), 0, 1.2), 10); w.cal.style.opacity = clamp(spr((lt - t0) / .5) * 2)};
  w.grid = (lt, t0) => {w.cells.forEach((c, i) => c.setAttribute("fill", lt > t0 + i * .012 ? (i < 28 && lt > t0 + 1.4 ? GOLD : "#8a8aa0") : "#4a4a5a"));
    w.gLab.textContent = lt > t0 + 1.6 ? "100명 중 28명 가입" : ""};
  w.gridOp = v => w.gridG.forEach(e => e.setAttribute("opacity", v));
  w.stack = (lt, t0) => {w.coins.forEach((s, j) => {const tt = t0 + j * .9; s.cs2.forEach((e, i) => e.setAttribute("opacity", lt > tt + i * .05 ? 1 : 0));
      s.lab.forEach(l => l.setAttribute("opacity", P(lt, tt, .3)))});
    w.cUnit.setAttribute("opacity", P(lt, t0 + .3, .3)); const u = spr((lt - t0 - 2.1) / .5); w.badge.setAttribute("opacity", clamp(u * 2))};
  w.tie = u => {w.rope.setAttribute("opacity", u > 0 ? 1 : 0); const x = 3240 + 367;
    w.rope.setAttribute("d", `M${x - 50},${790} L${x + 60},${805} M${x - 50},${830} L${x + 60},${845}`); w.rope.style.strokeDasharray = "120"; w.rope.style.strokeDashoffset = 120 * (1 - u)};
  w.passRule(-99, 99); w.grid(-99, 99); w.stack(-99, 99); w.tie(0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["돈을 **못 꺼내는** 통장, 누가 가입할까?", "이자는 똑같은데, 돈을 마음대로 꺼낼 수 없는 통장. 누가 가입할까요?", "pop"],
  ["2006년 **QJE**에 실린 논문", "이천육 년에 나온 논문입니다."],
  ["저자: 아슈라프_교수, 칼런_교수, 인_교수", "저자는, 아슈라프 교수, 칼런 교수, 그리고 인 교수입니다."]],
  build(el, hud) {
    const c = {w: seedWorld(el)};
    c.h = kin(hud, 120, "돈을 **못 꺼내는** 통장?", 84);
    c.j = kin(hud, 120, "**2006** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    imgAt(w.bank, 540, 1000, 1 + .01 * Math.sin(lt * 2), 0);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 실험: 통장 둘 */
scene({id: "setup", lines: [
  ["필리핀 은행 한 곳의 고객 **1,700명_넘게**", "연구진은, 필리핀 은행 한 곳에서, 고객 천칠백 명이 넘는 사람들을 대상으로 실험했습니다.", "pop"],
  ["새 통장: 목표한 **날짜나_돈**까지 꺼낼 수 없다", "새 통장은, 목표 날짜나 목표한 돈을 정하면, 그때까지 돈을 꺼낼 수 없습니다.", "whoosh@0.2"],
  ["그런데 이자는 보통 통장과 **똑같다**", "그런데 이자는, 보통 통장과 똑같았습니다.", "coin"],
  ["자유만 줄어드니 **아무도 고르지 않을 것** 같다", "자유만 줄어드니, 아무도 고르지 않을 것 같죠."]],
  build(el, hud) {
    const c = {w: seedWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 700, s: lt > L[2] ? lerp(1.02, 1.1, ease((lt - L[2]) / 2)) : 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? 0 : whip(lt, L[1], 0, 1080, .9));
    w.passRule(lt, L[1] + .8); w.eq.setAttribute("opacity", P(lt, L[2] + .3, .3));
    c.o.up(lt, {mood: lt > L[3] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 결과 */
scene({id: "result", lines: [
  ["그런데 권유받은 고객 중 **28%**가 가입했다", "그런데 이 통장을 권유받은 고객 중, 이십팔 퍼센트가 가입했습니다.", "ding"],
  ["1년 뒤 저축: 아무 제안 없던 쪽보다 **80%_넘게** 더 늘었다", "그리고 일 년 뒤, 이 통장을 권유받은 사람들은, 아무 제안도 받지 않은 사람들보다, 저축이 팔십 퍼센트 넘게 더 늘었습니다.", "coin"],
  ["가입하지 않은 사람까지 **모두 넣은** 평균", "가입하지 않은 사람까지, 모두 넣은 평균입니다."]],
  build(el, hud) {
    const c = {w: seedWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.grid(lt, .9); w.gridOp(1 - P(lt, L[1] + .1, .4)); w.stack(lt, L[1] + .5);
    c.o.up(lt, {mood: lt > 2.4 && lt < L[1] ? "surprised" : lt > L[1] + 2.5 ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 4. 왜: 오디세우스의 돛대 */
scene({id: "why", lines: [
  ["오디세우스: **자기 몸을 배 기둥에** 묶으라고 했다", "그리스 신화의 오디세우스는, 바다 요정의 노래에 홀리지 않으려고, 선원들에게 자기 몸을 배 기둥에 묶으라고 했습니다.", "whoosh@0.2"],
  ["이것이 **약속_장치**(Commitment Device)", "이렇게 미래의 나를 미리 묶어 두는 방법을, 약속 장치라고 부릅니다."],
  ["돈이 생기면 써 버릴 걸 아는 사람이 **스스로 손을 묶었다**", "연구진은, 돈이 생기면 써 버릴 걸 아는 사람들이, 스스로 손을 묶은 것으로 봤습니다.", "ding"]],
  build(el, hud) {
    const c = {w: seedWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1, 1.08, ease(lt / 8))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, 1)); w.stack(99, 0);
    w.tie(clamp((lt - 2.2) / .8));
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**오디세우스를_배_기둥에_묶기**〉", "논문 제목도, 오디세우스를 배 기둥에 묶기라는 뜻입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: seedWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.tie(1);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
