/* 오늘의 경제 020 — 마약 조직의 장부 (v3: 부엉이 진행자·한 공간 카메라 이동·피라미드·시급 막대·100명 격자)
   논문: Levitt, S. D. & Venkatesh, S. A. (2000) "An Economic Analysis of a Drug-Selling Gang's Finances",
         Quarterly Journal of Economics 115(3): 755–789. doi:10.1162/003355300554908 (NBER WP 6592)
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — NBER·RePEc 초록으로 확인):
   - 마약을 파는 길거리 조직의 재무 기록(여러 해)
   - 조직 평균 시급 약 $6 → $11, 분배는 극단적으로 치우침
   - 두목은 합법적 일보다 훨씬 많이 벌고, 길거리 판매원은 대부분 기간 최저임금보다 적게 벎
   - 주된 동기는 지금 임금이 아니라 장래의 큰돈에 대한 기대
   - 연간 폭력 사망률 약 7%, 위험이 작은 임금 웃돈을 크게 넘어섬
   - '엄마 집에 산다'는 이 연구를 소개한 책(괴짜경제학)의 질문 — 업로드 설명에 밝힘
   - 인터넷에 도는 두목 시급 $66·판매원 $3.30 은 원문 표에서 확인 못 해 쓰지 않음
   격자 100칸 중 7칸. 시급 막대의 두목·판매원 높이는 단순화(숫자 없음). */
Object.assign(EP, {no: 20, style: "v2", title: "마약 조직의 장부", hook: "마약 판매상은 왜 엄마랑 같이 살까?",
  bgm: {seed: 231, bpm: 92, mood: "tense"},
  paper: {journal: "Quarterly Journal of Economics", year: 2000, authors: "Steven D. Levitt & Sudhir Alladi Venkatesh",
          title: "An Economic Analysis of a Drug-Selling Gang's Finances", ko: "마약 판매 조직의 재무에 대한 경제 분석",
          cite: "115(3): 755–789", url: "https://doi.org/10.1162/003355300554908"},
  yt: {title: "마약 판매상은 왜 엄마랑 같이 살까? | 마약 조직의 장부 #경제 #shorts",
       desc: "연구진은 미국의 한 마약 판매 조직이 남긴 여러 해 치 장부를 분석했다. 조직 전체의 평균 시급은 처음에 약 6달러, 나중엔 11달러로 올랐다. 하지만 돈은 극단적으로 위쪽에 쏠려 있었다. 두목은 합법적인 일을 할 때보다 훨씬 많이 벌었지만, 길거리 판매원은 대부분 기간 최저임금보다도 적게 벌었다. 그러니 엄마 집에 사는 게 이상하지 않다(이 질문은 이 연구를 소개한 책 『괴짜경제학』에서 유명해졌다). 그런데도 왜 일할까? 연구진은 지금 받는 돈이 아니라 언젠가 위로 올라갈 거라는 기대가 주된 이유라고 봤다. 하지만 대가는 컸다. 해마다 조직원의 약 7%가 폭력으로 목숨을 잃었다. 돈은 이 위험을 보상하기엔 턱없이 모자랐다.",
       tags: ["경제", "괴짜경제학", "레빗", "노동시장", "토너먼트", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 엄마 집 | 1080 피라미드 | 2160 시급 막대 | 3240 100명 격자
let WID = 0;

function streetWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#0a0c1a"], [1, "#2a2440"]]); lg("road", [[0, "#2a2a32"], [1, "#141418"]]);
  lg("lamp", [[0, "#ffd98a", .35], [1, "#ffd98a", 0]]); lg("bld", [[0, "#1e1a30"], [1, "#12101e"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  const r = rng(20);
  for (let x = 0; x < WW; ) {const bw = 140 + r() * 160, bh = 300 + r() * 360;
    S("rect", {x, y: 1000 - bh, width: bw, height: bh, fill: U("bld")}, g);
    for (let yy = 1000 - bh + 30; yy < 980; yy += 50) for (let xx = x + 20; xx < x + bw - 30; xx += 40)
      if (r() < .3) S("rect", {x: xx, y: yy, width: 18, height: 24, fill: "#ffd98a", opacity: .2 + r() * .35}, g);
    x += bw + 14}
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("road")}, g);
  w.lamps = [200, 1300, 2400, 3500].map(x => {S("rect", {x: x - 6, y: 420, width: 12, height: 580, fill: "#3a3a44"}, g);
    return S("path", {d: `M${x - 30},430 L${x + 30},430 L${x + 260},1000 L${x - 260},1000 Z`, fill: U("lamp")}, g)});
  // 0: 엄마 집
  w.house = img(w.layer, "house_with_garden", 600, 1000, 460);
  w.mom = img(w.layer, "old_woman", 860, 1000, 200);
  w.kid = img(w.layer, "man", 380, 1000, 210);
  // 1080: 피라미드
  const px = 1080 + 540;
  S("path", {d: `M${px},300 L${px + 420},1000 L${px - 420},1000 Z`, fill: "#3a3050", stroke: "#6a5a8a", "stroke-width": 6}, g);
  w.crown = img(w.layer, "crown", px, 440, 120);
  w.boss = img(w.layer, "man", px, 560, 130);
  w.offi = [-1, 1].map(k => img(w.layer, "man", px + k * 110, 760, 120));
  w.soldiers = Array.from({length: 7}, (_, i) => img(w.layer, "person", px - 300 + i * 100, 990, 110));
  w.pLab = [["두목", 300], ["간부", 700], ["길거리 판매원", 1060]].map(([t, y]) => ST(g, px + (t === "길거리 판매원" ? 0 : 330), y + (t === "길거리 판매원" ? 0 : 0), t, {"font-size": 40, "font-weight": 800, fill: "#e8e0ff", opacity: 0}));
  // 2160: 시급 막대 (단순화)
  const bx = 2160;
  w.minLine = S("line", {x1: bx + 120, y1: 760, x2: bx + 960, y2: 760, stroke: RED, "stroke-width": 6, "stroke-dasharray": "20 12", opacity: 0}, g);
  w.minLab = ST(g, bx + 940, 740, "최저임금", {"font-size": 40, "font-weight": 800, fill: RED, "text-anchor": "end", opacity: 0});
  w.bars = [["두목", 680, GOLD, bx + 280], ["조직 평균", 260, "#c9cfe6", bx + 540], ["길거리 판매원", 180, CORAL, bx + 800]].map(([t, h, col, x]) => {
    const rr = S("rect", {x: x - 100, y: 1000, width: 200, height: 0, rx: 14, fill: col}, g);
    ST(g, x, 1060, t, {"font-size": 40, "font-weight": 800, fill: "#fff"});
    return {rr, h, x}});
  w.avgLab = ST(g, bx + 540, 700, "", {"font-size": 48, "font-weight": 900, fill: "#fff"});
  // 3240: 100명 격자
  w.cells = Array.from({length: 100}, (_, i) => S("rect", {x: 3240 + 215 + (i % 10) * 66, y: 380 + Math.floor(i / 10) * 66, width: 54, height: 54, rx: 27, fill: "#4a4a5a"}, g));
  w.cLab = ST(g, 3240 + 540, 1100, "", {"font-size": 56, "font-weight": 900, fill: RED});
  // 앞쪽(흐린) 철망 울타리: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  for (let i = 0; i < 60; i++) S("line", {x1: i * 100, y1: 0, x2: i * 100 + 100, y2: 160, stroke: "#5a5a66", "stroke-width": 5, opacity: .6}, fs);
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.lamps.forEach((l, i) => l.setAttribute("opacity", .6 + .4 * Math.abs(Math.sin(lt * 1.7 + i * 1.3))));
    imgAt(w.mom, 860, 1000 - 4 * Math.abs(Math.sin(lt * 2)), 1, 0)};
  w.pyr = (lt, t0) => {[w.crown, w.boss, ...w.offi, ...w.soldiers].forEach((e, i) => {const u = spr((lt - t0 - (i < 2 ? 0 : i < 4 ? .4 : .8 + (i - 4) * .08)) / .5);
      e.style.opacity = clamp(u * 2)});
    w.pLab.forEach((t, i) => t.setAttribute("opacity", P(lt, t0 + .3 + i * .4, .3)))};
  w.grow = (lt, t0, which) => w.bars.forEach((b, i) => {if (which.indexOf(i) < 0) return;
    const u = ease((lt - t0 - which.indexOf(i) * .5) / .8), h = b.h * u; b.rr.setAttribute("height", h); b.rr.setAttribute("y", 1000 - h)});
  w.mw = on => {w.minLine.setAttribute("opacity", on ? 1 : 0); w.minLab.setAttribute("opacity", on ? 1 : 0)};
  w.dead = (lt, t0) => {w.cells.forEach((c, i) => c.setAttribute("fill", lt > t0 + i * .01 ? ([12, 27, 38, 51, 64, 79, 93].indexOf(i) >= 0 && lt > t0 + 1.2 ? RED : "#8a8aa0") : "#4a4a5a"));
    w.cLab.textContent = lt > t0 + 1.4 ? "100명 중 7명 (1년)" : ""};
  w.pyr(-99, 0); w.grow(-99, 0, [0, 1, 2]); w.mw(false); w.dead(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["마약 판매상은 왜 **엄마랑** 같이 살까?", "마약 판매상은, 왜 엄마랑 같이 살까요?", "pop"],
  ["책 『괴짜경제학』이 던진 질문, 답은 2000년 **QJE** 논문에", "책 괴짜경제학이 던진 이 질문의 답은, 이천 년에 나온 논문에 있습니다."],
  ["저자: 레빗_교수와 벤카테시_교수", "저자는, 레빗 교수와 벤카테시 교수입니다."]],
  build(el, hud) {
    const c = {w: streetWorld(el)};
    c.h = kin(hud, 120, "왜 **엄마랑** 살까?", 96);
    c.j = kin(hud, 120, "**2000** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: lerp(1.15, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 장부와 피라미드 */
scene({id: "books", lines: [
  ["한 마약 판매 조직의 **여러 해 치 장부**를 분석", "연구진은, 미국의 한 마약 판매 조직이 남긴 여러 해 치 장부를 분석했습니다.", "pop"],
  ["조직 전체 평균 시급: 처음 **약 $6**, 나중엔 **$11**", "조직 전체의 평균 시급은 처음에 약 육 달러, 나중엔 십일 달러로 올랐습니다.", "coin"],
  ["하지만 돈은 **극단적으로_위쪽에** 쏠렸다", "하지만 돈은, 극단적으로 위쪽에 쏠려 있었죠."]],
  build(el, hud) {
    const c = {w: streetWorld(el)};
    c.led = img(hud, "ledger", 540, 560, 260);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[2] ? whip(lt, 0, 0, 2160, 1.1) : whip(lt, L[2], 2160, 1080, .9));
    const tl = spr((lt - .4) / .5) * (1 - P(lt, L[1] - .3, .3)); imgAt(c.led, 540, 560, clamp(tl, 0, 1.2), -6); c.led.style.opacity = clamp(tl * 2);
    w.grow(lt, L[1] + .3, [1]); w.avgLab.textContent = lt > L[1] + 1 ? "약 $6 → $11" : "";
    w.pyr(lt, L[2] + 1);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "normal", look: [.7, -.6]});
  }
});

/* 3. 두목 vs 판매원 */
scene({id: "wages", lines: [
  ["두목: 합법적인 일보다 **훨씬 많이**", "두목은 합법적인 일을 할 때보다 훨씬 많이 벌었지만,", "coin"],
  ["길거리 판매원: 대부분_기간 **최저임금보다 적게**", "길거리 판매원은, 대부분 기간 최저임금보다도 적게 벌었습니다.", "pop"],
  ["그러니 **엄마 집**에 사는 게 이상하지 않다", "그러니 엄마 집에 사는 게, 이상하지 않죠."]],
  build(el, hud) {
    const c = {w: streetWorld(el)};
    c.u = CX(hud, 1150, "막대 높이는 단순화한 그림", "", {fontSize: "34px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[2] ? whip(lt, 0, 1080, 2160, .9) : whip(lt, L[2], 2160, 0, 1));
    w.grow(99, 0, [1]); w.avgLab.textContent = "";
    w.grow(lt, 1, [0]); w.mw(lt > L[1]); w.grow(lt, L[1] + .5, [2]); ap(c.u, lt, 1.3);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : lt > L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 왜 일하나 + 위험 */
scene({id: "why", lines: [
  ["왜 일할까? 지금 돈보다 **위로_올라갈 기대**", "그런데도 왜 일할까요? 연구진은, 지금 받는 돈보다 언젠가 위로 올라갈 거라는 기대가 주된 이유라고 봤습니다.", "whoosh@0.3"],
  ["대가: 해마다 조직원의 **약 7%** 폭력으로 사망", "하지만 대가는 컸습니다. 해마다 조직원의 약 칠 퍼센트가, 폭력으로 목숨을 잃었죠.", "pop"],
  ["돈은 이 위험을 보상하기엔 **턱없이_모자랐다**", "돈은 이 위험을 보상하기엔, 턱없이 모자랐습니다."]],
  build(el, hud) {
    const c = {w: streetWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? whip(lt, 0, 0, 1080, 1) : whip(lt, L[1], 1080, 3240, 1.1));
    w.pyr(99, 0); imgAt(w.crown, 1080 + 540, 440 - 20 * Math.abs(Math.sin(lt * 3)), 1, 0);
    w.dead(lt, L[1] + 1.2);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.6]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**마약 판매 조직의 재무에 대한 경제 분석**〉", "논문 제목은, 마약 판매 조직의 재무에 대한 경제 분석입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: streetWorld(el)};
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
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
