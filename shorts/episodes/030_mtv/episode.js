/* 오늘의 경제 030 — 리얼리티 쇼와 10대 출산 (v3: 부엉이 진행자·한 공간 카메라 이동·거실 TV·추세선·지역 비교·검색 말풍선·출산 막대)
   논문: Kearney, M. S. & Levine, P. B. (2015) "Media Influences on Social Outcomes: The Impact of MTV's 16 and Pregnant on Teen Childbearing",
         American Economic Review 105(12): 3597–3632. doi:10.1257/aer.20140012 (NBER WP 19795)
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 학술지 초록·NBER 판 초록·검색 요약으로 확인):
   - 2009년 6월 MTV 〈16 and Pregnant〉 첫 방송
   - 도구변수: 방송 전 지역별 MTV 시청률로 이 프로그램의 지역별 시청률을 예측
   - 구글 트렌드·트위터: 피임·낙태에 대한 관심(검색·트윗) 증가
   - 학술지판: 방송 뒤 18개월 동안 10대 출산 4.3% 감소(작업 논문판: 이 기간 전체 감소의 24%) — 초기 보도의 5.7%는 첫 판 값이라 쓰지 않음
   - 반론: Jaeger, Joyce & Kaestner(IZA DP 10317, JBES) — MTV 많이 보던 지역과 적게 보던 지역의 출산 추세가 원래 달라 결과가 근거가 못 된다
   - 저자 재반박(Kearney & Levine 2018 응답) → 핵심 결론을 흔드는 반론이라 영상에 넣음
   막대: 100 → 95.7. 추세선은 모양만. */
Object.assign(EP, {no: 30, style: "v2", title: "리얼리티 쇼와 10대 출산", hook: "리얼리티 쇼 하나가 10대 출산을 줄였을까?",
  bgm: {seed: 3597, bpm: 100, mood: "bright"},
  paper: {journal: "American Economic Review", year: 2015, authors: "Melissa S. Kearney & Phillip B. Levine",
          title: "Media Influences on Social Outcomes: The Impact of MTV's 16 and Pregnant on Teen Childbearing",
          ko: "미디어가 사회에 미치는 영향: MTV 〈16살, 임신〉과 10대 출산", cite: "105(12): 3597–3632", url: "https://doi.org/10.1257/aer.20140012"},
  yt: {title: "리얼리티 쇼 하나가 10대 출산을 줄였을까? | 미디어의 힘 #경제 #shorts",
       desc: "2009년 미국 음악 채널 MTV에서 〈16 and Pregnant(16살, 임신)〉이 시작됐다. 10대에 아이를 가진 엄마들의 임신과 출산, 힘든 육아를 그대로 보여 준 프로그램이다. 그런데 그 무렵 미국의 10대 출산은 다른 이유로도 줄고 있었다. 그래서 방송 전후를 비교하는 것만으로는 프로그램 효과를 알 수 없다. 연구진은 방송 전부터 MTV를 많이 보던 지역이 이 프로그램도 많이 봤다는 점을 이용해, 많이 본 지역과 적게 본 지역에서 10대 출산이 얼마나 줄었는지 비교했다(도구변수, Instrumental Variable). 방송이 나간 직후에는 피임과 낙태에 대한 인터넷 검색과 트윗이 크게 늘었다. 연구진의 추정으로는 이 프로그램 때문에 방송 뒤 1년 반 동안 10대 출산이 4.3% 줄었다(작업 논문판 기준 이 기간 전체 감소의 약 4분의 1). 다만 MTV를 많이 보던 지역은 원래 출산 추세가 달랐다며 이 결과를 반박한 연구(Jaeger, Joyce & Kaestner)가 있고, 저자들은 이에 다시 반박했다. (영상의 추세선은 모양만 나타낸 그림이다.)",
       tags: ["경제", "미디어", "10대출산", "도구변수", "리얼리티쇼", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", PINK = "#ff7ab8";
const WW = 4320;                       // 세계 너비: 0 거실 TV | 1080 추세선 | 2160 지역 비교 | 3240 검색·출산 막대
let WID = 0;

function tvWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#2a1e3e"], [1, "#3e2a52"]]); lg("floor", [[0, "#3a2a22"], [1, "#1a120e"]]); lg("glow", [[0, "#8ad0ff", .35], [1, "#8ad0ff", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  for (let x = 0; x < WW; x += 120) S("rect", {x, y: 0, width: 60, height: 1000, fill: "#fff", opacity: .025}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  // 0: 거실 TV
  S("rect", {x: 230, y: 340, width: 620, height: 400, rx: 26, fill: "#0b0f1c", stroke: "#4a4a6a", "stroke-width": 12}, g);
  w.scr = S("rect", {x: 250, y: 360, width: 580, height: 360, rx: 14, fill: "#3a6a9a"}, g);
  w.show = ST(g, 540, 560, "16살, 임신", {"font-size": 80, "font-weight": 900, fill: "#fff"});
  ST(g, 540, 450, "MTV", {"font-size": 56, "font-weight": 900, fill: GOLD});
  S("path", {d: "M230,740 L850,740 L1060,1000 L20,1000 Z", fill: U("glow")}, g);
  w.couch = img(w.layer, "couch", 540, 1060, 360);
  w.girl = img(w.layer, "girl", 540, 940, 150);
  w.baby = img(w.layer, "baby", 760, 690, 130);
  // 1080: 추세선 (모양만)
  const ax0 = 1080 + 130, ax1 = 1080 + 950, base = 900;
  S("line", {x1: ax0, y1: base, x2: ax1, y2: base, stroke: "#fff", "stroke-width": 4}, g);
  ST(g, ax0 + 30, base + 50, "2000", {"font-size": 36, "font-weight": 800, fill: "#e8e0ff"}); ST(g, ax1 - 30, base + 50, "2012", {"font-size": 36, "font-weight": 800, fill: "#e8e0ff"});
  const tp = []; for (let i = 0; i <= 48; i++) {const u = i / 48; tp.push([lerp(ax0, ax1, u), 360 + 360 * u + 14 * Math.sin(i * .9)])}
  w.trend = S("path", {d: poly(tp), stroke: PINK, "stroke-width": 9, fill: "none"}, g);
  const x09 = lerp(ax0, ax1, 9 / 12);
  w.mark = S("line", {x1: x09, y1: 300, x2: x09, y2: base, stroke: GOLD, "stroke-width": 5, "stroke-dasharray": "14 10", opacity: 0}, g);
  w.markLab = ST(g, x09, 280, "방송 시작", {"font-size": 42, "font-weight": 900, fill: GOLD, opacity: 0});
  w.tLab = ST(g, 1080 + 400, 330, "10대 출산율", {"font-size": 44, "font-weight": 900, fill: PINK, opacity: 0});
  w.tNote = ST(g, 1080 + 540, 1010, "모양만 나타낸 그림", {"font-size": 32, "font-weight": 700, fill: "#e8e0ff", opacity: 0});
  // 2160: 지역 비교 (방송 전 MTV 시청)
  w.tiles = Array.from({length: 24}, (_, i) => {const x = 2160 + 150 + (i % 6) * 130, y = 330 + Math.floor(i / 6) * 120, hi = (i % 6) >= 3;
    return {r: S("rect", {x, y, width: 110, height: 100, rx: 12, fill: "#4a4a62", opacity: 0}, g), hi}});
  w.gA = ST(g, 2160 + 345, 860, "MTV 적게 보던 지역", {"font-size": 40, "font-weight": 900, fill: TEAL, opacity: 0});
  w.gB = ST(g, 2160 + 735, 860, "MTV 많이 보던 지역", {"font-size": 40, "font-weight": 900, fill: CORAL, opacity: 0});
  w.tv2 = img(w.layer, "television", 2160 + 735, 290, 110);
  // 3240: 검색·트윗 말풍선 + 출산 막대
  w.phone = img(w.layer, "mobile_phone", 3240 + 230, 760, 300);
  w.bub = ["피임", "낙태", "피임", "낙태"].map((t, i) => {const gg = S("g", {opacity: 0}, g);
    S("rect", {x: -80, y: -40, width: 160, height: 70, rx: 30, fill: "#fff"}, gg); ST(gg, 0, 10, t, {"font-size": 40, "font-weight": 900, fill: "#10182a"}); return gg});
  w.bars = [["방송이 없었다면", 100, "#c9cfe6", 3240 + 640], ["실제", 95.7, PINK, 3240 + 880]].map(([t, v, col, x]) => {
    const r = S("rect", {x: x - 90, y: 900, width: 180, height: 0, rx: 12, fill: col, opacity: 0}, g);
    const lab = ST(g, x, 950, t, {"font-size": 34, "font-weight": 900, fill: "#fff", opacity: 0}); return {r, v, lab}});
  w.cut = ST(g, 3240 + 880, 340, "−4.3%", {"font-size": 88, "font-weight": 900, fill: GOLD, opacity: 0});
  w.bNote = ST(g, 3240 + 760, 1010, "10대 출산 (방송 뒤 1년 반)", {"font-size": 32, "font-weight": 700, fill: "#e8e0ff", opacity: 0});
  // 앞쪽(흐린) 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("line", {x1: x, y1: 0, x2: x, y2: 110, stroke: "#05030a", "stroke-width": 10}, fs);
    S("ellipse", {cx: x, cy: 130, rx: 90, ry: 40, fill: "#05030a"}, fs); S("ellipse", {cx: x, cy: 160, rx: 60, ry: 14, fill: "#ffe7b0", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.scr.setAttribute("fill", mixc("#3a6a9a", "#7a4a9a", .5 + .5 * Math.sin(lt * 1.3)));
    imgAt(w.girl, 540, 940 - 4 * Math.abs(Math.sin(lt * 2)), 1, 0); imgAt(w.baby, 760, 690 + 6 * Math.sin(lt * 2.5), 1, 8 * Math.sin(lt * 2))};
  w.trendOn = (lt, t0, tm) => {draw(w.trend, (lt - t0) / 1.4); [w.tLab, w.tNote].forEach(e => e.setAttribute("opacity", P(lt, t0, .3)));
    [w.mark, w.markLab].forEach(e => e.setAttribute("opacity", P(lt, tm, .3)))};
  w.regions = (lt, t0, tc) => {w.tiles.forEach((t, i) => {t.r.setAttribute("opacity", lt > t0 + i * .03 ? 1 : 0);
      t.r.setAttribute("fill", lt > tc ? (t.hi ? CORAL : TEAL) : "#4a4a62")});
    w.gA.setAttribute("opacity", P(lt, tc, .3)); w.gB.setAttribute("opacity", P(lt, tc + .2, .3));
    const u = spr((lt - tc) / .5); imgAt(w.tv2, 2160 + 735, 290, clamp(u, 0, 1.2), 0); w.tv2.style.opacity = clamp(u * 2)};
  w.search = (lt, t0) => w.bub.forEach((b, i) => {const u = ((lt - t0 - i * .5) % 2) / 2, on = lt > t0 + i * .5;
    b.setAttribute("opacity", on ? Math.sin(Math.PI * u) : 0); b.setAttribute("transform", `translate(${3240 + 230 + (i % 2 ? 90 : -90)},${560 - 280 * u})`)});
  w.birth = (lt, t0) => {w.bars.forEach((b, j) => {const u = ease((lt - t0 - j * .5) / .8), h = b.v * 4.6 * u;
      b.r.setAttribute("y", 900 - h); b.r.setAttribute("height", h); b.r.setAttribute("opacity", lt > t0 + j * .5 ? 1 : 0); b.lab.setAttribute("opacity", P(lt, t0 + j * .5, .3))});
    w.bNote.setAttribute("opacity", P(lt, t0, .3)); w.cut.setAttribute("opacity", P(lt, t0 + 1.4, .3))};
  w.trendOn(-99, 99, 99); w.regions(-99, 99, 99); w.search(-99, 99); w.birth(-99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["리얼리티 쇼 하나가 **10대 출산**을 줄였을까?", "텔레비전 리얼리티 쇼 하나가, 십 대 출산을 줄였을까요?", "pop"],
  ["2015년 **AER**에 실린 논문", "이천십오 년에 나온 논문입니다."],
  ["저자: 커니_교수와 러빈_교수", "저자는, 커니 교수, 그리고 러빈 교수입니다."]],
  build(el, hud) {
    const c = {w: tvWorld(el)};
    c.h = kin(hud, 120, "TV 쇼가 **10대 출산**을?", 84);
    c.j = kin(hud, 120, "**2015** · AER", 96);
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

/* 2. 프로그램 */
scene({id: "show", lines: [
  ["2009년 미국 MTV: **〈16살, 임신〉**", "이천구 년, 미국 음악 채널 엠티비에서, 십육 살, 임신이라는 프로그램이 시작됐습니다.", "pop"],
  ["10대 엄마의 **임신·출산·육아**를 그대로 보여 줬다", "십 대에 아이를 가진 엄마들의 임신과 출산, 그리고 힘든 육아를, 그대로 보여 줬죠."]],
  build(el, hud) {
    const c = {w: tvWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 640, s: lerp(1.02, 1.12, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 3. 어려움 */
scene({id: "problem", lines: [
  ["그런데 그 무렵 10대 출산은 **원래 줄고 있었다**", "그런데 그 무렵, 미국의 십 대 출산은, 다른 이유로도 줄고 있었습니다.", "whoosh@0.2"],
  ["방송 **전후만 비교**해선 효과를 알 수 없다", "그래서 방송 전과 후를 비교하는 것만으로는, 프로그램의 효과를 알 수 없습니다."]],
  build(el, hud) {
    const c = {w: tvWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9)); w.trendOn(lt, .9, L[1] + .2);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.6]});
  }
});

/* 4. 방법 */
scene({id: "method", lines: [
  ["원래 **MTV를 많이 보던 지역**이 이 쇼도 많이 봤다", "연구진은, 프로그램이 나오기 전부터 엠티비를 많이 보던 지역이, 이 프로그램도 많이 봤다는 점을 이용했습니다.", "pop"],
  ["두 지역의 **10대 출산 감소**를 비교", "그리고 많이 본 지역과 적게 본 지역에서, 십 대 출산이 얼마나 줄었는지를 비교했습니다."]],
  build(el, hud) {
    const c = {w: tvWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.trendOn(99, 0, 0); w.regions(lt, .9, 2.4);
    c.o.up(lt, {mood: "normal", look: [.7, -.6]});
  }
});

/* 5. 단서와 결과 */
scene({id: "result", lines: [
  ["방송 직후: 피임 방법·낙태 **검색과 트윗이 급증**", "방송이 나간 직후에는, 피임 방법과 낙태에 대한 인터넷 검색과 트윗이, 크게 늘었습니다.", "pop"],
  ["연구진 추정: 방송 뒤 1년 반 동안 10대 출산 **4.3% 감소**", "연구진의 추정으로는, 이 프로그램 때문에, 방송 뒤 일 년 반 동안 십 대 출산이 사 점 삼 퍼센트 줄었습니다.", "coin"]],
  build(el, hud) {
    const c = {w: tvWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.regions(99, 0, 0); w.search(lt, .9); w.birth(lt, L[1] + .4);
    c.o.up(lt, {mood: lt > L[1] + 1.8 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 6. 반론과 뜻 */
scene({id: "debate", lines: [
  ["반론: MTV 많이 보던 지역은 **원래 추세가 달랐다**", "다만, 엠티비를 많이 보던 지역은 원래 출산 추세가 달랐다며, 이 결과를 반박한 연구도 있습니다.", "pop"],
  ["저자들은 **다시 반박**했다", "그러자 저자들은, 그 반론을 다시 반박했습니다."],
  ["오락 프로그램도 **행동을 바꿀** 수 있는지 보여 주려 한 연구", "오락 프로그램도 사람들의 행동을 바꿀 수 있는지, 보여 주려 한 연구입니다.", "ding"]],
  build(el, hud) {
    const c = {w: tvWorld(el)};
    c.b1 = img(hud, "speech_balloon", 300, 680, 320); c.t1 = CX(hud, 500, "<span style='font-size:60px;font-weight:900;color:#e85d5d'>반론</span>", "", {width: "600px", left: "0px"});
    c.b2 = img(hud, "speech_balloon", 780, 680, 320); c.t2 = CX(hud, 500, "<span style='font-size:60px;font-weight:900;color:#1e8a6a'>재반박</span>", "", {width: "600px", left: "480px"});
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "rgba(8,12,22,.6)"});
    c.dim.parentNode.insertBefore(c.dim, c.dim.parentNode.firstChild);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.birth(99, 0); c.dim.style.opacity = P(lt, 0, .4);
    const u1 = spr((lt - .5) / .5), u2 = spr((lt - L[1] - .1) / .5);
    imgAt(c.b1, 300, 680, clamp(u1, 0, 1.2), -6); c.b1.style.opacity = clamp(u1 * 2); c.t1.style.opacity = clamp(u1 * 2);
    imgAt(c.b2, 780, 680, clamp(u2, 0, 1.2), 6); c.b2.style.opacity = clamp(u2 * 2); c.t2.style.opacity = clamp(u2 * 2);
    c.o.up(lt, {mood: lt < L[2] ? "skeptical" : "happy", look: [.7, -.5]});
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**미디어가_사회에_미치는_영향**〉", "논문 제목은, 미디어가 사회에 미치는 영향입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: tvWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.birth(99, 0);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
