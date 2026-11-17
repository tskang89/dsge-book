/* 오늘의 경제 027 — 너무 출렁이는 주가 (v3: 부엉이 진행자·한 공간 카메라 이동·배당 동전·주가 vs 진짜 가치 선·출렁임 블록)
   논문: Shiller, R. J. (1981) "Do Stock Prices Move Too Much to be Justified by Subsequent Changes in Dividends?",
         American Economic Review 71(3): 421–436. (NBER WP 456)
   확인(2026-11-17, 원문 PDF 는 이 세션에서 막힘 — 원문 발췌·그림 설명을 옮긴 검색 요약으로 확인):
   - 그림 1: 실질 S&P 종합지수 p 와 사후 합리적 가격 p*(그 뒤 실제 배당의 현재가치), 1871–1979, 둘 다 장기 추세로 나눔
   - 그림 2: 다우존스 1928–1979
   - 원문: p* 는 실제 주가에 비해 놀랄 만큼 매끄럽고 안정적
   - 원문 발췌: 주가 변동성이 'far too high — five to thirteen times too high'(배당 정보로 설명 가능한 것보다)
   - 반론: 배당이 비정상(추세) 과정이면 분산 한계 검정이 틀릴 수 있다(Kleidon 1986, Marsh & Merton 1986 등) → 설명란
   - 실러 2013년 노벨 경제학상
   화면 선은 모양만 나타낸 그림(실제 자료 아님). 블록: 1칸 vs 5~13칸. */
Object.assign(EP, {no: 27, style: "v2", title: "너무 출렁이는 주가", hook: "주가는 왜 이렇게 출렁일까?",
  bgm: {seed: 421, bpm: 104, mood: "tense"},
  paper: {journal: "American Economic Review", year: 1981, authors: "Robert J. Shiller",
          title: "Do Stock Prices Move Too Much to be Justified by Subsequent Changes in Dividends?",
          ko: "주가는 이후의 배당 변화로 설명하기엔 너무 많이 움직이는가?", cite: "71(3): 421–436", url: "https://www.nber.org/papers/w0456"},
  yt: {title: "주가는 왜 이렇게 출렁일까? | 과잉 변동성 #경제 #shorts",
       desc: "회사는 번 돈의 일부를 주주에게 배당으로 나눠 준다. 주가는 앞으로 받을 배당을 미리 어림한 값이라는 이론이 효율적 시장 가설(Efficient Market Hypothesis)이다. 그런데 어림한 값은 실제 결과보다 덜 출렁여야 한다. 모르는 부분은 평균 쪽으로 어림하기 때문이다. 실러 교수는 미국 주가 지수 약 100년 치(1871~1979년)를 살펴보고, 그 뒤 실제로 받은 배당으로 그때 주식의 '진짜 가치'(사후 합리적 가격)를 거꾸로 계산했다. 진짜 가치는 잔잔한 선이었는데, 실제 주가는 훨씬 크게 출렁였다. 실러 교수는 주가의 출렁임이 배당으로 설명할 수 있는 것보다 5배에서 13배나 크다고 봤다. 이것을 과잉 변동성(Excess Volatility)이라고 부른다. 이 결과는 주가가 배당 소식만으로 움직인다는 이론과 맞지 않았고, 실러 교수는 이후 사람들의 심리가 주가를 흔든다는 연구로 이어 갔다. (반론: 배당이 긴 추세를 따라 크게 변할 수 있다면 이 검정 방식이 틀릴 수 있다는 지적이 있다. 영상의 선 그림은 모양만 나타낸 것이다.) 실러 교수는 2013년 노벨 경제학상을 받았다.",
       tags: ["경제", "주식", "과잉변동성", "효율적시장", "실러", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 시세판 도시 | 1080 배당 동전 | 2160 주가 vs 진짜 가치 | 3240 출렁임 블록
let WID = 0;

function stockWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("bg", [[0, "#06101c"], [1, "#132638"]]); lg("floor", [[0, "#16222e"], [1, "#0a1018"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("bg")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let y = 200; y < 1000; y += 100) S("line", {x1: 0, y1: y, x2: WW, y2: y, stroke: "#fff", opacity: .04}, g);
  // 0: 도시 + 시세판
  const r = rng(27);
  for (let i = 0; i < 9; i++) {const x = 40 + i * 115, h = 260 + r() * 360;
    S("rect", {x, y: 1000 - h, width: 100, height: h, fill: "#0e1a2a", stroke: "#1e3048", "stroke-width": 3}, g)}
  S("rect", {x: 140, y: 230, width: 800, height: 300, rx: 20, fill: "#02060c", stroke: "#2a4060", "stroke-width": 6}, g);
  w.tick0 = S("path", {d: "", stroke: TEAL, "stroke-width": 8, fill: "none"}, g);
  // 1080: 회사 → 주주 배당 동전
  w.fac = img(w.layer, "factory", 1080 + 280, 960, 330);
  w.holder = img(w.layer, "man", 1080 + 820, 960, 230);
  w.coins = Array.from({length: 6}, () => img(w.layer, "coin", 1080 + 400, 700, 80));
  w.divLab = ST(g, 1080 + 540, 420, "배당", {"font-size": 72, "font-weight": 900, fill: GOLD, opacity: 0});
  // 2160: 주가 p vs 진짜 가치 p*
  const cx0 = 2160 + 110, cx1 = 2160 + 970, cy = 640;
  S("line", {x1: cx0, y1: 960, x2: cx1, y2: 960, stroke: "#fff", "stroke-width": 4}, g);
  ST(g, cx0 + 30, 1010, "1871", {"font-size": 38, "font-weight": 800, fill: "#c9cfe6"}); ST(g, cx1 - 30, 1010, "1979", {"font-size": 38, "font-weight": 800, fill: "#c9cfe6"});
  const N = 109, rr = rng(1871);
  let a = 0; const pv = [], ps = [];
  for (let i = 0; i < N; i++) {a = .82 * a + (rr() - .5) * 1.1; pv.push(a + .35 * Math.sin(i / 7)); ps.push(.25 * Math.sin(i / 30) + .1 * Math.sin(i / 13))}
  const X = i => lerp(cx0, cx1, i / (N - 1));
  w.pLine = S("path", {d: poly(pv.map((v, i) => [X(i), cy - v * 210])), stroke: CORAL, "stroke-width": 7, fill: "none", "stroke-linejoin": "round"}, g);
  w.sLine = S("path", {d: poly(ps.map((v, i) => [X(i), cy - v * 210])), stroke: TEAL, "stroke-width": 10, fill: "none", "stroke-dasharray": "2 0"}, g);
  w.pLab = ST(g, 2160 + 300, 270, "실제 주가", {"font-size": 46, "font-weight": 900, fill: CORAL, opacity: 0});
  w.sLab = ST(g, 2160 + 760, 270, "진짜 가치", {"font-size": 46, "font-weight": 900, fill: TEAL, opacity: 0});
  w.note = ST(g, 2160 + 540, 1070, "모양만 나타낸 그림 (추세를 뺀 값)", {"font-size": 32, "font-weight": 700, fill: "#c9cfe6", opacity: 0});
  // 3240: 출렁임 블록 1칸 vs 5~13칸
  w.blocks = [];
  ST(g, 3240 + 300, 1050, "배당으로", {"font-size": 40, "font-weight": 800, fill: TEAL}); ST(g, 3240 + 300, 1096, "설명되는 출렁임", {"font-size": 40, "font-weight": 800, fill: TEAL});
  ST(g, 3240 + 760, 1050, "실제 주가의", {"font-size": 40, "font-weight": 800, fill: CORAL}); ST(g, 3240 + 760, 1096, "출렁임", {"font-size": 40, "font-weight": 800, fill: CORAL});
  w.b1 = S("rect", {x: 3240 + 220, y: 940, width: 160, height: 52, rx: 8, fill: TEAL, opacity: 0}, g);
  for (let i = 0; i < 13; i++) w.blocks.push(S("rect", {x: 3240 + 680, y: 940 - i * 58, width: 160, height: 52, rx: 8, fill: i < 5 ? CORAL : "#ffb39a", opacity: 0, stroke: "#10182a", "stroke-width": 3}, g));
  w.range = ST(g, 3240 + 330, 330, "5~13배", {"font-size": 96, "font-weight": 900, fill: GOLD, opacity: 0});
  w.brain = img(w.layer, "brain", 3240 + 330, 640, 220);
  // 앞쪽(흐린) 전광판: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 230, y: 20, width: 460, height: 70, rx: 10, fill: "#02060c"}, fs);
    for (let k = 0; k < 6; k++) S("rect", {x: x - 210 + k * 72, y: 40, width: 50, height: 30, rx: 4, fill: k % 2 ? TEAL : CORAL, opacity: .6}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {let s = ""; for (let i = 0; i <= 40; i++) {const x = 170 + i * 18.5, y = 380 - 90 * (Math.sin(i * .7 + lt * 3) * .6 + Math.sin(i * .23 + lt * 1.7) * .4);
      s += (i ? " L" : "M") + x + "," + y} w.tick0.setAttribute("d", s);
    imgAt(w.fac, 1080 + 280, 960, 1, 0); imgAt(w.holder, 1080 + 820, 960 - 6 * Math.abs(Math.sin(lt * 2.4)), 1, 0)};
  w.pay = (lt, t0) => {w.divLab.setAttribute("opacity", P(lt, t0, .3));
    w.coins.forEach((c, i) => {const u = ((lt - t0 - i * .35) % 2.1) / 1.4; const on = lt > t0 + i * .35 && u < 1;
      imgAt(c, lerp(1080 + 400, 1080 + 780, u), 820 - 220 * Math.sin(Math.PI * u), 1, u * 360); c.style.opacity = on ? 1 : 0})};
  w.lines = (lt, tp, ts) => {draw(w.pLine, (lt - tp) / 1.6); draw(w.sLine, (lt - ts) / 1.4);
    w.pLab.setAttribute("opacity", P(lt, tp + .2, .3)); w.sLab.setAttribute("opacity", P(lt, ts + .2, .3)); w.note.setAttribute("opacity", P(lt, Math.min(tp, ts), .3))};
  w.stack = (lt, t0) => {w.b1.setAttribute("opacity", P(lt, t0, .3)); w.blocks.forEach((b, i) => b.setAttribute("opacity", lt > t0 + .5 + i * .12 ? (i < 5 ? 1 : .75) : 0));
    w.range.setAttribute("opacity", P(lt, t0 + 2.2, .3))};
  w.brainOn = (lt, t0) => {const u = spr((lt - t0) / .5); imgAt(w.brain, 3240 + 330, 640 + 8 * Math.sin(lt * 2), clamp(u, 0, 1.2), 0); w.brain.style.opacity = clamp(u * 2)};
  w.pay(-99, 99); w.lines(-99, 99, 99); w.stack(-99, 99); w.brainOn(-99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["주가는 왜 이렇게 **출렁일까?**", "주식 가격은, 왜 이렇게 크게 출렁일까요?", "pop"],
  ["1981년 **AER**에 실린 논문", "천구백팔십일 년에 나온 논문입니다."],
  ["저자: 로버트_실러_교수 (2013년 노벨 경제학상)", "저자는, 이천십삼 년 노벨 경제학상을 받은, 로버트 실러 교수입니다."]],
  build(el, hud) {
    const c = {w: stockWorld(el)};
    c.h = kin(hud, 120, "주가는 왜 **출렁일까?**", 84);
    c.j = kin(hud, 120, "**1981** · AER", 96);
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

/* 2. 이론 */
scene({id: "theory", lines: [
  ["회사는 번 돈 일부를 주주에게 **배당**으로 나눠 준다", "회사는 번 돈의 일부를, 주주에게 배당으로 나눠 줍니다.", "coin"],
  ["주가 = 배당의 어림값: **효율적_시장_가설**", "주식 가격은 앞으로 받을 배당을 미리 어림한 값이라는 이론이, 효율적 시장 가설입니다."],
  ["그런데 어림값은 실제 결과보다 **덜 출렁여야** 한다", "그런데 어림한 값은, 실제 결과보다 덜 출렁여야 합니다."],
  ["모르는 부분은 보통 **평균값으로** 어림하니까", "모르는 부분은, 보통 평균값으로 어림하니까요."]],
  build(el, hud) {
    const c = {w: stockWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9)); w.pay(lt, .8);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 검증 */
scene({id: "test", lines: [
  ["미국 주가 지수 **약_100년** 치(1871~1979)", "실러 교수는, 미국 주가 지수 약 백 년 치를 살펴봤습니다.", "whoosh@0.2"],
  ["그 뒤 실제로 받은 배당으로 **'진짜 가치'**를 거꾸로 계산", "그리고 그 뒤 실제로 받은 배당으로, 그때 주식의 진짜 가치를 거꾸로 계산했습니다."],
  ["진짜 가치는 **잔잔했는데**, 실제 주가는 크게 출렁였다", "진짜 가치는 잔잔한 선이었는데, 실제 주식 가격은 훨씬 크게 출렁였습니다.", "ding"]],
  build(el, hud) {
    const c = {w: stockWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.lines(lt, 1, L[1] + .4);
    c.o.up(lt, {mood: lt > L[2] + .5 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 결과와 뜻 */
scene({id: "result", lines: [
  ["배당으로 설명되는 것보다 **5_~_13배** 큰 출렁임", "실러 교수의 계산으로는, 주식 가격의 출렁임이, 배당으로 설명할 수 있는 것보다 오 배에서 십삼 배나 컸습니다.", "coin"],
  ["이것이 **과잉_변동성**(Excess Volatility)", "이것을 과잉 변동성이라고 부릅니다."],
  ["배당 소식만으로 움직인다는 이론과 **맞지 않았다**", "이 결과는, 주가가 배당 소식만으로 움직인다는 이론과 맞지 않았습니다."],
  ["이후 실러: **사람들의_심리**가 주가를 흔든다는 연구로", "이후에 실러 교수는, 사람들의 심리가 주식 가격을 흔든다는 연구로 이어 갔습니다.", "ding"]],
  build(el, hud) {
    const c = {w: stockWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.lines(99, 0, 0); w.stack(lt, .8); w.brainOn(lt, L[3] + .2);
    c.o.up(lt, {mood: lt > 3 && lt < L[2] ? "surprised" : lt > L[3] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**주가는 너무 많이 움직이는가?**〉", "논문 제목은, 주식 가격은 배당 변화로 설명하기엔, 너무 많이 움직이는가, 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: stockWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 2160, 1)); w.lines(99, 0, 0); w.stack(99, 0); w.brainOn(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
