/* 오늘의 경제 015 — 포로수용소의 담배 화폐 (v3: 부엉이 진행자·한 공간 카메라 이동·담배 더미)
   논문: Radford, R. A. (1945) "The Economic Organisation of a P.O.W. Camp", Economica 12(48): 189–201. doi:10.2307/2550133
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — 위키백과(Commodity money, Richard A. Radford)·요약 글로 확인):
   - 저자는 2차대전 때 포로로 수용소(이탈리아·독일)에 있었고, 그 경험을 적은 글
   - 포로는 적십자 소포(음식·담배)를 받음. 담배를 음식과 바꾸다 담배가 '보통의 화폐'가 됨(물물교환도 남음)
   - 소포·담배가 한꺼번에 들어오면 물가 상승(인플레이션), 공급이 끊기면 담배를 피워 없애 물가 하락 경향(디플레이션)
   - 담배가 줄자 파이프 담배로 손으로 만 얇은 담배가 같은 값에 돌고 좋은 담배는 거래에서 빠짐 = 그레셤의 법칙(논문이 직접 언급)
   - 구체 가격·주당 배급 개수는 확인 못 함 → 가격판의 숫자는 '예시'로 표시 */
Object.assign(EP, {no: 15, style: "v2", title: "포로수용소의 담배 화폐", hook: "포로수용소에선 담배가 돈이었다?",
  bgm: {seed: 181, bpm: 94, mood: "calm"},
  paper: {journal: "Economica", year: 1945, authors: "R. A. Radford",
          title: "The Economic Organisation of a P.O.W. Camp", ko: "포로수용소의 경제 조직", cite: "12(48): 189–201", url: "https://doi.org/10.2307/2550133"},
  yt: {title: "포로수용소에선 담배가 돈이었다? | 상품화폐와 그레셤의 법칙 #경제 #shorts",
       desc: "저자 래드퍼드는 2차 세계대전 때 이 수용소에서 직접 포로로 지냈다. 포로들은 적십자에서 음식과 담배가 든 소포를 받았다. 담배를 안 피우는 사람은 담배를 음식과 바꿨고, 곧 모든 물건의 값이 담배 몇 개로 매겨졌다. 물건 자체가 돈 노릇을 하는 것을 상품화폐(Commodity Money)라고 한다. 소포가 한꺼번에 들어오면 담배가 넘쳐서 물가가 올랐다. 소포가 끊기면 돈인 담배를 피워 버리니 물가가 내려갔다. 손으로 얇게 만 담배가 돌기 시작하자 좋은 담배는 시장에서 사라졌다. 나쁜 돈이 좋은 돈을 몰아낸다는 법칙, 그레샴의 법칙(Gresham's Law)이다. 돈과 물가의 원리는 포로수용소에서도 똑같이 작동했다.",
       tags: ["경제", "화폐", "상품화폐", "그레셤의법칙", "인플레이션", "역사", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 수용소 | 1080 적십자 소포 | 2160 가격판 | 3240 좋은 담배·얇은 담배
let WID = 0;

function campWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#1a2030"], [1, "#4a5468"]]); lg("ground", [[0, "#5a5446"], [1, "#2e2a22"]]);
  lg("hut", [[0, "#5a4a36"], [1, "#3a2e20"]]); lg("beam", [[0, "#fff8d0", .3], [1, "#fff8d0", 0]]);
  lg("board", [[0, "#2c3a30"], [1, "#1c2820"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 960, fill: U("sky")}, g);
  w.beams = [500, 2600].map(x => S("path", {d: `M${x},140 L${x - 420},960 L${x - 160},960 Z`, fill: U("beam")}, g));
  // 막사 줄
  for (let x = -100; x < WW; x += 620) {S("rect", {x, y: 700, width: 520, height: 260, fill: U("hut")}, g);
    S("path", {d: `M${x - 30},700 L${x + 260},590 L${x + 550},700 Z`, fill: "#2e241a"}, g);
    for (let k = 0; k < 4; k++) S("rect", {x: x + 40 + k * 120, y: 780, width: 60, height: 50, fill: "#ffd98a", opacity: .35}, g)}
  S("rect", {x: 0, y: 960, width: WW, height: H - 960, fill: U("ground")}, g);
  // 철조망 (앞)
  for (let x = 0; x < WW; x += 360) S("rect", {x, y: 600, width: 16, height: 420, fill: "#2a2a2a"}, g);
  [640, 720, 800, 880, 960].forEach(y => S("path", {d: Array.from({length: 120}, (_, i) => `${i ? "L" : "M"}${i * 36},${y + (i % 2 ? 8 : -8)}`).join(" "), stroke: "#8a8a8a", "stroke-width": 3, fill: "none", opacity: .8}, g));
  // 0: 포로들
  w.ppl = [260, 540, 820].map((x, i) => img(w.layer, ["man", "person", "man"][i], x, 1240, 220));
  // 1080: 소포
  w.box = img(w.layer, "package", 1080 + 540, 1160, 300);
  w.goods = [["chocolate_bar", -300], ["cheese_wedge", -100], ["bread", 100], ["cigarette", 300]].map(([k, dx]) => img(w.layer, k, 1080 + 540 + dx, 760, 150));
  // 2160: 가격판
  S("rect", {x: 2160 + 140, y: 300, width: 800, height: 620, rx: 18, fill: U("board"), stroke: "#7a5a3a", "stroke-width": 16}, g);
  ST(g, 2160 + 540, 380, "오늘의 가격 (예시)", {"font-size": 48, "font-weight": 800, fill: "#f4f1e6"});
  w.rowsP = [["chocolate_bar", "초콜릿", 6], ["cheese_wedge", "치즈", 4], ["bread", "빵", 3]].map(([k, t, p], i) => {
    const y = 500 + i * 140; img(w.layer, k, 2160 + 260, y + 50, 100);
    ST(g, 2160 + 400, y + 30, t, {"font-size": 46, "font-weight": 800, fill: "#f4f1e6", "text-anchor": "start"});
    const v = ST(g, 2160 + 800, y + 30, "", {"font-size": 56, "font-weight": 900, fill: GOLD, "text-anchor": "end"});
    img(w.layer, "cigarette", 2160 + 860, y + 40, 70); return {v, p}});
  w.arrow = ST(g, 2160 + 1000, 640, "", {"font-size": 160, "font-weight": 900, fill: RED});
  // 3240: 좋은 담배 / 얇은 담배
  w.good = S("g", {}, g); w.thin = S("g", {}, g);
  const cig = (gg, x, y, wd, col) => {S("rect", {x: x - 260, y: y - wd / 2, width: 420, height: wd, rx: wd / 2, fill: "#f6f2ea"}, gg);
    S("rect", {x: x + 160, y: y - wd / 2, width: 110, height: wd, rx: wd / 2, fill: col}, gg);
    S("rect", {x: x - 270, y: y - wd / 2, width: 20, height: wd, rx: 6, fill: "#ff7a3a"}, gg)};
  cig(w.good, 3240 + 540, 620, 64, "#d89a4a"); cig(w.thin, 3240 + 540, 900, 26, "#c9b9a0");
  ST(g, 3240 + 540, 520, "공장 담배", {"font-size": 50, "font-weight": 800, fill: "#fff"});
  ST(g, 3240 + 540, 820, "손으로 얇게 만 담배", {"font-size": 50, "font-weight": 800, fill: "#fff"});
  w.lock = img(w.layer, "locked", 3240 + 880, 660, 120);
  w.hands = [img(w.layer, "man", 3240 + 330, 1180, 200), img(w.layer, "person", 3240 + 900, 1180, 200)];
  w.pass = img(w.layer, "cigarette", 0, 0, 90);
  // 앞쪽(흐린) 철조망 기둥: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: H, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => S("rect", {x: x - 20, y: 0, width: 40, height: 1400, fill: "#141414", opacity: .85}, fs));
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.beams.forEach((b, i) => b.setAttribute("transform", `rotate(${18 * Math.sin(lt * .6 + i * 2)} ${[500, 2600][i]} 140)`));
    w.ppl.forEach((p, i) => imgAt(p, [260, 540, 820][i], 1240 - 5 * Math.abs(Math.sin(lt * 2 + i)), 1, 0))};
  w.open = (lt, t0) => w.goods.forEach((e, i) => {const u = spr((lt - t0 - i * .25) / .5); e.style.opacity = clamp(u * 2);
    imgAt(e, 1080 + 540 + [-300, -100, 100, 300][i], lerp(1080, 760, clamp(u, 0, 1)), clamp(u, 0, 1.2), 0)});
  // 가격: f = 배율(1 기준, >1 인플레이션, <1 디플레이션)
  w.prices = (on, f) => w.rowsP.forEach(r => r.v.textContent = on ? `${Math.max(1, Math.round(r.p * f))}개` : "");
  w.trend = s => {w.arrow.textContent = s > 0 ? "↑" : s < 0 ? "↓" : ""; w.arrow.setAttribute("fill", s > 0 ? RED : BLUE)};
  w.gresham = (lt, t0) => {const u = clamp((lt - t0) / 1);
    w.good.setAttribute("transform", `translate(${(3240 + 880 - (3240 + 540)) * ease(u) * .0},0)`);
    w.good.setAttribute("opacity", 1 - .65 * ease(u)); w.lock.style.opacity = ease(u);
    const k = ((lt - t0) * .7) % 1; w.pass.style.opacity = lt > t0 ? 1 : 0;
    imgAt(w.pass, lerp(3240 + 380, 3240 + 840, k < .5 ? ease(k * 2) : ease(2 - k * 2)), 1060 - 80 * Math.sin(Math.PI * ((k * 2) % 1)), 1, 0)};
  w.open(-99, 0); w.prices(false, 1); w.trend(0); w.lock.style.opacity = 0; w.pass.style.opacity = 0;
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["포로수용소에선 **담배가 돈**이었다?", "포로수용소에서는, 담배가 돈이었다고요?", "pop"],
  ["1945년 **이코노미카**에 실린 논문", "천구백사십오 년에 나온 논문입니다."],
  ["저자 **래드퍼드**: 이 수용소에서 직접 포로로 지냈다", "저자 래드퍼드는, 이 수용소에서 직접 포로로 지냈습니다."]],
  build(el, hud) {
    const c = {w: campWorld(el)};
    c.h = kin(hud, 170, "수용소의 돈은<br>**담배**?", 110);
    c.j = kin(hud, 190, "**1945** · Economica", 100);
    c.cg = img(hud, "cigarette", 540, 560, 200);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    const t = spr((lt - .6) / .5); imgAt(c.cg, 540, 560, clamp(t, 0, 1.2) * (1 - P(lt, L[1] - .3, .3)), -20 + 6 * Math.sin(lt * 3)); c.cg.style.opacity = clamp(t * 2) * (1 - P(lt, L[1] - .3, .3));
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "surprised" : "normal", look: [.7, -.4]});
  }
});

/* 2. 소포와 교환 */
scene({id: "parcel", lines: [
  ["포로마다 적십자 소포: **음식과 담배**", "포로들은 적십자에서, 음식과 담배가 든 소포를 받았습니다.", "pop"],
  ["담배를 안 피우는 사람은 담배를 **음식과 바꿨다**", "담배를 안 피우는 사람은, 담배를 음식과 바꿨죠.", "coin"],
  ["곧 모든 물건의 값이 **담배 몇 개**로 매겨졌다", "그러다 곧, 모든 물건의 값이 담배 몇 개로 매겨졌습니다.", "ding"],
  ["물건이 돈 노릇을 한다 = **상품화폐**", "물건 자체가 돈 노릇을 하는 것을, 상품화폐라고 합니다."]],
  build(el, hud) {
    const c = {w: campWorld(el)};
    c.h = kin(hud, 1000, "**상품화폐** (Commodity Money)", 62);
    c.o = host(hud, "owl", {x: 150, y: 1275, s: .62});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lt < L[2] ? 1.04 : 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[2] ? whip(lt, 0, 0, 1080, .9) : whip(lt, L[2], 1080, 2160, .9));
    imgAt(w.box, 1080 + 540, 1160, clamp(spr((lt - .9) / .5), 0, 1.2), 4 * Math.sin(lt * 3)); w.open(lt, 1.4);
    // 담배 ↔ 치즈 교환 (둘째 줄)
    if (lt > L[1] && lt < L[2]) {const k = clamp((lt - L[1] - .3) / 1.2);
      imgAt(w.goods[3], lerp(1080 + 840, 1080 + 440, ease(k)), 760 - 120 * Math.sin(Math.PI * k), 1, 0);
      imgAt(w.goods[1], lerp(1080 + 440, 1080 + 840, ease(k)), 760 + 120 * Math.sin(Math.PI * k), 1, 0)}
    w.prices(lt > L[2] + .9, 1); kinUp(c.h, lt, L[3] + .1);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", point: ease((lt - L[2] - .9) / .5), look: [.8, -.5]});
  }
});

/* 3. 인플레이션·디플레이션 */
scene({id: "prices", lines: [
  ["소포가 몰려오면 담배가 넘쳐 **물가 상승**", "소포가 한꺼번에 들어오면 담배가 넘쳐서, 물가가 올랐습니다.", "coin"],
  ["소포가 끊기면 돈인 담배를 피워 없애 **물가 하락**", "소포가 끊기면 돈인 담배를 피워 버리니, 물가가 내려갔죠.", "pop"]],
  build(el, hud) {
    const c = {w: campWorld(el)};
    c.rain = Array.from({length: 12}, () => img(hud, "cigarette", 0, 0, 80));
    c.smoke = Array.from({length: 6}, () => A(hud, 0, 0, "", "", {width: "90px", height: "90px", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,220,230,.7), rgba(220,220,230,0) 70%)"}));
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(2160);
    const up = lt < L[1], f = up ? lerp(1, 2, ease((lt - 1.2) / 1.5)) : lerp(2, .5, ease((lt - L[1] - .6) / 1.5));
    w.prices(true, f); w.trend(lt < 1.2 ? 0 : up ? 1 : -1);
    c.rain.forEach((e, i) => {const u = ((lt - .6) * .8 + i / 12) % 1; e.style.opacity = up && lt > .6 ? Math.sin(Math.PI * u) : 0;
      imgAt(e, 80 + (i * 83) % 920, lerp(80, 300, u), 1, i * 40 + lt * 90)});
    c.smoke.forEach((s, i) => {const u = ((lt - L[1]) * .5 + i / 6) % 1; s.style.opacity = !up ? .8 * Math.sin(Math.PI * u) : 0;
      s.style.left = (200 + i * 130 + 30 * Math.sin(lt + i)) + "px"; s.style.top = lerp(300, 60, u) + "px"; s.style.transform = `scale(${1 + u})`});
    c.o.up(lt, {mood: up ? "surprised" : "skeptical", look: [.7, -.6]});
  }
});

/* 4. 그레셤의 법칙 */
scene({id: "gresham", lines: [
  ["얇게 만 담배가 돌자 **좋은_담배**는 시장에서 사라졌다", "손으로 얇게 만 담배가 돌기 시작하자, 좋은 담배는 시장에서 사라졌습니다.", "whoosh@0.3"],
  ["나쁜 돈이 좋은 돈을 몰아내는 것 = **그레샴의_법칙**", "나쁜 돈이 좋은 돈을 몰아내는 것, 이것을 그레샴의 법칙이라고 합니다.", "ding"]],
  build(el, hud) {
    const c = {w: campWorld(el)};
    c.h = kin(hud, 160, "**그레샴의 법칙**<br>(Gresham's Law)", 84);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.05, ease((lt - L[1]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.gresham(lt, 1.6); kinUp(c.h, lt, L[1] + .1);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "skeptical", look: [.7, -.6]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["돈과 물가의 원리는 **포로수용소에서도** 똑같이", "돈과 물가의 원리는, 포로수용소에서도 똑같이 작동했습니다.", "pop"],
  ["논문 제목: 〈**포로수용소의 경제 조직**〉", "논문 제목은, 포로수용소의 경제 조직입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: campWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 880, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1));
    c.dim.style.opacity = P(lt, L[1] - .3, .5); ap(c.p, lt, L[1], null, {s: .92}); ap(c.f, lt, L[2], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[2] ? .5 + .5 * Math.sin((lt - L[2]) * 6) : 0, look: [.5, -.6]});
  }
});
