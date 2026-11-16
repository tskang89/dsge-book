/* 오늘의 경제 016 — 고무링 하나와 빈부 격차 (v3: 부엉이 진행자·한 공간 카메라 이동·100칸 격자)
   논문: Kremer, M. (1993) "The O-Ring Theory of Economic Development", Quarterly Journal of Economics 108(3): 551–575.
         doi:10.2307/2118400
   확인(2026-11-16): 이론 논문. 1986년 챌린저호 사고(고체 로켓 부스터의 오링 결함)에서 이름을 땀.
   - 생산 = 여러 단계의 질(성공 확률)이 곱해짐 → 한 단계 실수가 전체를 망침
   - 같은 실력끼리 묶임(동류 짝짓기), 작은 실력 차이가 큰 임금·소득 차이로 커짐 — 초록 요지
   - 크레이머는 2019년 노벨 경제학상 공동 수상
   검산: 0.9^5 = 0.590 → 약 59%, 0.8^5 = 0.328 → 약 33%, 59/33 ≈ 1.8 → '거의 두 배'
   격자 100칸: 59칸 vs 33칸. */
Object.assign(EP, {no: 16, style: "v2", title: "고무링 하나와 빈부 격차", hook: "고무링 하나가 빈부 격차를 설명한다?",
  bgm: {seed: 191, bpm: 98, mood: "tense"},
  paper: {journal: "Quarterly Journal of Economics", year: 1993, authors: "Michael Kremer",
          title: "The O-Ring Theory of Economic Development", ko: "경제 발전의 오링 이론", cite: "108(3): 551–575", url: "https://doi.org/10.2307/2118400"},
  yt: {title: "고무링 하나가 빈부 격차를 설명한다? | 오링 이론 #경제 #shorts",
       desc: "1986년 우주왕복선 챌린저호가 폭발했다. 원인은 고무링(오링) 하나의 결함이었다. 다른 부품이 다 멀쩡해도 하나가 실패하면 전부 실패한다. 이런 일에서는 각 단계의 성공 확률이 서로 곱해진다. 다섯 단계가 모두 90%면 전부 성공할 확률은 약 59%, 모두 80%면 33% 정도로 뚝 떨어진다. 단계마다 차이는 조금인데 결과는 거의 두 배 차이다. 그래서 실력이 좋은 사람들끼리 한 팀으로 모이게 되고, 실력 차이가 조금만 나도 회사와 나라 사이의 소득 차이는 크게 벌어진다. 고무링의 이름을 따서 오링 이론(O-Ring Theory)이라고 부른다. 저자 마이클 크레이머는 2019년 노벨 경제학상을 받았다.",
       tags: ["경제", "경제발전", "오링이론", "생산함수", "소득격차", "크레이머", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 발사대 | 1080 다섯 단계 | 2160 100칸 격자 둘 | 3240 두 팀
let WID = 0;

function spaceWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#060818"], [1, "#24305a"]]); lg("ground", [[0, "#3a3a44"], [1, "#1a1a22"]]);
  lg("tower", [[0, "#8a6a4a"], [1, "#5a3a20"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  const r = rng(16); w.stars = [];
  for (let i = 0; i < 160; i++) w.stars.push(S("circle", {cx: r() * WW, cy: r() * 900, r: 1.5 + r() * 2.5, fill: "#fff", opacity: .7}, g));
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("ground")}, g);
  // 0: 발사대와 로켓, 고무링
  S("rect", {x: 700, y: 360, width: 60, height: 640, fill: U("tower")}, g);
  for (let y = 380; y < 1000; y += 60) S("line", {x1: 700, y1: y, x2: 760, y2: y + 50, stroke: "#3a2410", "stroke-width": 6}, g);
  w.rocket = img(w.layer, "rocket", 520, 1000, 420);
  w.ring = S("g", {opacity: 0}, g);
  S("ellipse", {cx: 300, cy: 520, rx: 150, ry: 150, fill: "none", stroke: "#222", "stroke-width": 46}, w.ring);
  S("ellipse", {cx: 300, cy: 520, rx: 150, ry: 150, fill: "none", stroke: "#555", "stroke-width": 8, "stroke-dasharray": "6 18"}, w.ring);
  w.crack = S("path", {d: "M430,470 L460,500 L440,520 L470,560", stroke: RED, "stroke-width": 10, fill: "none", opacity: 0}, g);
  w.boom = img(w.layer, "collision", 520, 700, 380);
  // 1080: 다섯 단계 (톱니)
  w.gears = Array.from({length: 5}, (_, i) => img(w.layer, "gear", 1080 + 140 + i * 200, 700, 150));
  w.marks = Array.from({length: 5}, (_, i) => img(w.layer, i === 3 ? "cross_mark" : "check_mark_button", 1080 + 140 + i * 200, 520, 90));
  w.pct = Array.from({length: 5}, (_, i) => ST(g, 1080 + 140 + i * 200, 820, "", {"font-size": 48, "font-weight": 900, fill: GOLD}));
  w.times = Array.from({length: 4}, (_, i) => ST(g, 1080 + 240 + i * 200, 720, "×", {"font-size": 60, "font-weight": 900, fill: "#fff", opacity: 0}));
  // 2160: 100칸 격자 둘
  w.grids = [["단계마다 90%", 59, TEAL], ["단계마다 80%", 33, CORAL]].map(([t, m, col], j) => {
    const x0 = 2160 + 90 + j * 480, y0 = 440;
    ST(g, x0 + 200, y0 - 40, t, {"font-size": 46, "font-weight": 900, fill: col});
    const cells = Array.from({length: 100}, (_, i) => S("rect", {x: x0 + (i % 10) * 40, y: y0 + Math.floor(i / 10) * 40, width: 34, height: 34, rx: 6, fill: "#2a3050"}, g));
    const lab = ST(g, x0 + 200, y0 + 500, "", {"font-size": 64, "font-weight": 900, fill: col});
    return {cells, m, col, lab}});
  // 3240: 두 팀
  w.teams = [[0, 3240 + 300, "glowing_star", TEAL], [1, 3240 + 780, "gear", CORAL]].map(([j, x, ic, col]) => {
    const ppl = Array.from({length: 3}, (_, i) => img(w.layer, ["man", "woman", "person"][i], x + (i - 1) * 120, 900, 170));
    const st = Array.from({length: 3}, (_, i) => img(w.layer, j ? "page" : "glowing_star", x + (i - 1) * 120, 690, 70));
    return {ppl, st, x, col}});
  w.fac = [3240 + 300, 3240 + 780].map(x => img(w.layer, "factory", x, 560, 200));
  w.money = [img(w.layer, "money_bag", 3240 + 300, 1150, 200), img(w.layer, "coin", 3240 + 780, 1150, 120)];
  // 앞쪽(흐린) 별빛 띠: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  for (let i = 0; i < 40; i++) S("circle", {cx: i * 150 + 40, cy: 60 + (i % 3) * 50, r: 6 + (i % 4) * 3, fill: "#cfe6ff", opacity: .5}, fs);
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.stars.forEach((s, i) => {if (i % 5 === 0) s.setAttribute("opacity", .3 + .6 * Math.abs(Math.sin(lt * 1.3 + i)))});
    w.gears.forEach((e, i) => imgAt(e, 1080 + 140 + i * 200, 700, 1, lt * 60 * (i % 2 ? -1 : 1)))};
  w.launch = (lt, t0, fail) => {const u = clamp((lt - t0) / 1.4);
    imgAt(w.rocket, 520, 1000 - 300 * ease(u), 1, 0); w.rocket.style.opacity = fail && u > .7 ? 1 - clamp((u - .7) / .15) : 1;
    const b = fail ? clamp((u - .7) / .3) : 0; w.boom.style.opacity = b > 0 && b < 1 ? Math.sin(Math.PI * b) : 0;
    imgAt(w.boom, 520, 700, .5 + b, 0)};
  w.ringOn = (u, crack) => {w.ring.setAttribute("opacity", clamp(u)); w.crack.setAttribute("opacity", crack ? 1 : 0)};
  w.steps = (lt, t0, fail) => w.marks.forEach((m, i) => {const u = spr((lt - t0 - i * .3) / .4);
    m.style.opacity = clamp(u * 2) * (fail || i !== 3 ? 1 : 0); imgAt(m, 1080 + 140 + i * 200, 520, clamp(u, 0, 1.2), 0)});
  w.prob = (lt, t0, v) => {w.pct.forEach((p, i) => p.textContent = lt > t0 + i * .2 ? v + "%" : "");
    w.times.forEach((t, i) => t.setAttribute("opacity", lt > t0 + i * .2 + .1 ? 1 : 0))};
  w.fill = (lt, t0, j) => {const gr = w.grids[j];
    gr.cells.forEach((c, i) => c.setAttribute("fill", i < gr.m && lt > t0 + i * .012 ? gr.col : "#2a3050"));
    gr.lab.textContent = lt > t0 + gr.m * .012 ? `약 ${gr.m}%` : ""};
  w.team = (lt, t0) => {w.teams.forEach((t, j) => {t.ppl.forEach((p, i) => {const u = clamp((lt - t0 - j * .4) / .8);
      imgAt(p, lerp(t.x + (i - 1) * 300 * (j ? -1 : 1), t.x + (i - 1) * 120, ease(u)), 900 - 6 * Math.abs(Math.sin(lt * 3 + i)), 1, 0)});
    t.st.forEach((s, i) => {s.style.opacity = P(lt, t0 + 1 + j * .4, .3); imgAt(s, t.x + (i - 1) * 120, 690, 1, 0)})})};
  w.pay = (lt, t0) => w.money.forEach((m, j) => {const u = spr((lt - t0 - j * .3) / .5); m.style.opacity = clamp(u * 2);
    imgAt(m, [3240 + 300, 3240 + 780][j], 1150, clamp(u, 0, 1.2), 0)});
  w.launch(0, 99, false); w.ringOn(0, false); w.steps(-99, 0, true); w.prob(-99, 0, 90);
  w.fill(-99, 0, 0); w.fill(-99, 0, 1); w.team(-99, 0); w.pay(-99, 0);
  w.fac.forEach(f => f.style.opacity = 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 + 챌린저호 */
scene({id: "hook", lines: [
  ["고무링 하나가 **빈부_격차**를 설명한다?", "작은 고무링 하나가, 나라 사이의 빈부 격차를 설명할 수 있을까요?", "pop"],
  ["1993년 **QJE**에 실린 논문", "천구백구십삼 년에 나온 논문입니다."],
  ["저자: 마이클 크레이머 (2019년 노벨 경제학상)", "저자는, 이천십구 년 노벨 경제학상을 받은 마이클 크레이머입니다."]],
  build(el, hud) {
    const c = {w: spaceWorld(el)};
    c.h = kin(hud, 170, "고무링 하나 =<br>**빈부 격차**?", 104);
    c.j = kin(hud, 190, "**1993** · QJE", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.ringOn(P(lt, .6, .5), false);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

scene({id: "challenger", lines: [
  ["1986년 **챌린저호** 폭발: 원인은 고무링 하나", "천구백팔십육 년, 우주왕복선 챌린저호가 폭발했습니다. 원인은 고무링 하나의 결함이었죠.", "whoosh@0.4"],
  ["다른 부품이 다 멀쩡해도 **하나가 실패하면** 전부 실패", "다른 부품이 다 멀쩡해도, 하나가 실패하면 전부 실패합니다."]],
  build(el, hud) {
    const c = {w: spaceWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.08, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.ringOn(1, lt > 2.6); w.launch(lt, 1, true);
    c.o.up(lt, {mood: lt > 2.2 && lt < L[1] ? "surprised" : "skeptical", look: [.7, -.5]});
  }
});

/* 2. 곱셈 */
scene({id: "multiply", lines: [
  ["이런 일은 단계별 성공 확률이 **곱해진다**", "이런 일에서는, 각 단계의 성공 확률이 서로 곱해집니다.", "pop"],
  ["5단계 모두 90% → 전부 성공 **약 59%**", "다섯 단계가 모두 구십 퍼센트면, 전부 성공할 확률은 약 오십구 퍼센트입니다.", "coin"],
  ["모두 80% → **33% 정도**로 뚝", "모두 팔십 퍼센트면, 삼십삼 퍼센트 정도로 뚝 떨어집니다."],
  ["단계마다 차이는 조금인데 결과는 **거의 두 배**", "단계마다 차이는 조금인데, 결과는 거의 두 배 차이죠.", "ding"]],
  build(el, hud) {
    const c = {w: spaceWorld(el)};
    c.f = CX(hud, 170, "0.9 × 0.9 × 0.9 × 0.9 × 0.9", "", {fontSize: "64px", fontWeight: 800, color: "#fff"});
    c.u = CX(hud, 1150, "1칸 = 100번 중 1번 성공", "", {fontSize: "36px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? whip(lt, 0, 0, 1080, .9) : whip(lt, L[1], 1080, 2160, .9));
    w.steps(lt, 1, true); w.prob(lt, 1.8, 90);
    c.f.innerHTML = lt < L[2] ? "0.9 × 0.9 × 0.9 × 0.9 × 0.9 ≈ <b style='color:#6fcfb7'>0.59</b>" : "0.8 × 0.8 × 0.8 × 0.8 × 0.8 ≈ <b style='color:#ff8a65'>0.33</b>";
    c.f.style.opacity = P(lt, L[1] + .2, .3);
    w.fill(lt, L[1] + 1, 0); w.fill(lt, L[2] + .3, 1); ap(c.u, lt, L[1] + 1.2);
    c.o.up(lt, {mood: lt > L[3] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 3. 짝짓기와 격차 */
scene({id: "match", lines: [
  ["그래서 실력 좋은 사람끼리 **한 팀**으로 모인다", "그래서 실력이 좋은 사람들끼리, 한 팀으로 모이게 됩니다.", "whoosh@0.2"],
  ["실력 차이가 조금만 나도 **소득 차이**는 크게 벌어진다", "그 결과, 실력 차이가 조금만 나도, 회사와 나라 사이의 소득 차이는 크게 벌어진다는 겁니다.", "coin"],
  ["고무링 이름을 딴 **오링_이론**(O-Ring Theory)", "고무링의 이름을 따서, 이것을 오링 이론이라고 부릅니다.", "ding"]],
  build(el, hud) {
    const c = {w: spaceWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lerp(1, 1.04, ease((lt - L[1]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.team(lt, .9); w.fac.forEach((f, j) => {f.style.opacity = P(lt, L[1] - .2 + j * .3, .3); imgAt(f, [3240 + 300, 3240 + 780][j], 560, 1, 0)});
    w.pay(lt, L[1] + .6);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 4. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**경제_발전의_오링_이론**〉", "논문 제목은, 경제 발전의, 오링 이론입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: spaceWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 980, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 880, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.ringOn(1, false);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
