/* 오늘의 경제 017 — 판사의 '이번엔 반대겠지' (v3: 부엉이 진행자·한 공간 카메라 이동·1,000명 점)
   논문: Chen, D. L., Moskowitz, T. J. & Shue, K. (2016) "Decision Making Under the Gambler's Fallacy: Evidence from Asylum Judges,
         Loan Officers, and Baseball Umpires", Quarterly Journal of Economics 131(3): 1181–1242. doi:10.1093/qje/qjw017
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — 초록(NBER·RePEc)과 Chicago Booth Review 요약으로 확인):
   - 미국 난민 망명 재판 150,357건(1985~2013)
   - 직전 사건을 허가했으면 거부했을 때보다 다음 사건 허가 확률이 최대 3.3%p 낮음(Chicago Booth 요약)
   - 음(-)의 자기상관은 경험이 적은 판사, 사건이 비슷하거나 시간상 가까울 때 더 강함(초록)
   - 대출 심사원·야구 심판에게서도 같은 패턴(초록)
   - 해석: 도박사의 오류가 가장 잘 맞음. 다른 설명(연속 대비 효과)을 완전히 배제하진 못함 → 업로드 설명에 적음
   검산: 3.3%p = 1,000명 중 33명. */
Object.assign(EP, {no: 17, style: "v2", title: "판사의 '이번엔 반대겠지'", hook: "판사도 '이번엔 반대겠지' 하고 판결한다?",
  bgm: {seed: 201, bpm: 96, mood: "tense"},
  paper: {journal: "Quarterly Journal of Economics", year: 2016, authors: "Daniel L. Chen, Tobias J. Moskowitz & Kelly Shue",
          title: "Decision Making Under the Gambler's Fallacy: Evidence from Asylum Judges, Loan Officers, and Baseball Umpires",
          ko: "도박사의 오류 아래의 의사결정: 망명 판사·대출 심사원·야구 심판", cite: "131(3): 1181–1242", url: "https://doi.org/10.1093/qje/qjw017"},
  yt: {title: "판사도 '이번엔 반대겠지' 하고 판결한다? | 도박사의 오류 #경제 #shorts",
       desc: "동전 앞면이 몇 번 연달아 나오면 이번엔 뒷면이 나올 것 같다. 하지만 동전은 매번 반반이고 직전 결과와 상관이 없다. 이 착각을 도박사의 오류(Gambler's Fallacy)라고 한다. 연구진은 미국 난민 망명 재판 15만 건(1985~2013)을 분석했다. 사건이 들어오는 순서는 우연이니 앞 사건과 다음 사건은 서로 상관이 없어야 한다. 그런데 직전 사건에서 망명을 허가했으면, 거부했을 때보다 다음 사건을 허가할 확률이 최대 3.3%p 낮았다(1,000명 중 33명꼴). 이런 경향은 경험이 적은 판사, 그리고 사건이 짧은 간격으로 이어질 때 더 강했다. 대출 심사원과 야구 심판의 판정에서도 같은 패턴이 나타났다. 연구진이 꼽은 가장 잘 맞는 설명은 도박사의 오류다. ※ 연구진은 다른 설명(앞 사건과의 대비 효과)을 완전히 배제할 수는 없다고 밝혔다.",
       tags: ["경제", "행동경제학", "도박사의오류", "판사", "의사결정", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 동전 던지기 | 1080 법정 | 2160 사건 줄 | 3240 1,000명 점
let WID = 0;

function courtWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#2a2238"], [1, "#3e3450"]]); lg("floor", [[0, "#6a4a30"], [1, "#3a2818"]]);
  lg("bench", [[0, "#7a4e2a"], [1, "#4a2e16"]]); lg("lamp", [[0, "#ffe7b0", .3], [1, "#ffe7b0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  for (let x = 40; x < WW; x += 220) {S("rect", {x, y: 120, width: 150, height: 700, rx: 8, fill: "#000", opacity: .14}, g);
    S("rect", {x, y: 120, width: 150, height: 700, rx: 8, fill: "none", stroke: "#5a4a70", "stroke-width": 4, opacity: .5}, g)}
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  w.lamps = [540, 1620, 2700, 3780].map(x => S("path", {d: `M${x - 60},0 L${x + 60},0 L${x + 420},1000 L${x - 420},1000 Z`, fill: U("lamp")}, g));
  // 0: 동전 던지기 (앞 앞 앞 ?)
  w.coins = [0, 1, 2, 3].map(i => {const gg = S("g", {opacity: 0}, g), x = 180 + i * 240, y = 640;
    S("circle", {cx: x, cy: y, r: 95, fill: i < 3 ? GOLD : "#8a96b8", stroke: "#b8860b", "stroke-width": 8}, gg);
    const t = ST(gg, x, y + 24, i < 3 ? "앞" : "?", {"font-size": 72, "font-weight": 900, fill: "#3a2a10"}); return {gg, t}});
  w.half = ST(g, 540, 900, "", {"font-size": 64, "font-weight": 900, fill: TEAL});
  // 1080: 법정 (판사석)
  S("rect", {x: 1080 + 180, y: 640, width: 720, height: 360, rx: 16, fill: U("bench")}, g);
  S("rect", {x: 1080 + 160, y: 620, width: 760, height: 40, rx: 10, fill: "#8a5a32"}, g);
  w.judge = img(w.layer, "man_judge", 1080 + 540, 660, 300);
  w.files = Array.from({length: 6}, (_, i) => img(w.layer, "file_folder", 1080 + 860, 980 - i * 40, 130));
  // 2160: 사건 줄 (허가/거부 도장)
  w.cases = Array.from({length: 5}, (_, i) => {const gg = S("g", {opacity: 0}, g), x = 2160 + 120 + i * 210, y = 520;
    S("rect", {x: x - 80, y, width: 160, height: 210, rx: 12, fill: "#fbf8f1"}, gg);
    for (let k = 0; k < 4; k++) S("rect", {x: x - 60, y: y + 30 + k * 30, width: 120 - (k % 2) * 30, height: 10, rx: 5, fill: "#c9c2b0"}, gg);
    const st = ST(gg, x, y + 190, "", {"font-size": 44, "font-weight": 900, fill: TEAL}); return {gg, st}});
  w.arr = ST(g, 2160 + 540, 900, "", {"font-size": 56, "font-weight": 900, fill: "#fff"});
  // 3240: 1,000명 점 (40×25)
  w.dots = Array.from({length: 1000}, (_, i) => S("circle", {cx: 3240 + 150 + (i % 40) * 20, cy: 420 + Math.floor(i / 40) * 20, r: 7, fill: "#5a5470"}, g));
  w.dlab = ST(g, 3240 + 540, 980, "", {"font-size": 56, "font-weight": 900, fill: CORAL});
  w.ump = [["passport_control", 3240 + 260], ["bank", 3240 + 540], ["baseball", 3240 + 820]].map(([k, x]) => img(w.layer, k, x, 360, 140));
  // 앞쪽(흐린) 난간: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 220, y: 20, width: 440, height: 46, rx: 14, fill: "#1a1424"}, fs);
    S("rect", {x: x - 200, y: 62, width: 400, height: 12, rx: 6, fill: "#ffe7b0", opacity: .7}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.lamps.forEach((l, i) => l.setAttribute("opacity", .7 + .3 * Math.sin(lt * 1.2 + i)));
    imgAt(w.judge, 1080 + 540, 660 - 4 * Math.abs(Math.sin(lt * 2)), 1, 0)};
  w.flip = (lt, t0) => w.coins.forEach((c, i) => {const u = clamp((lt - t0 - i * .45) / .4);
    c.gg.setAttribute("opacity", u > 0 ? 1 : 0); const sx = Math.abs(Math.cos(u * Math.PI * 3));
    c.gg.setAttribute("transform", `translate(${180 + i * 240},640) scale(${u < 1 ? sx : 1},1) translate(${-(180 + i * 240)},-640)`)});
  w.halfOn = on => w.half.textContent = on ? "앞 50% · 뒤 50%" : "";
  w.seq = (lt, t0, marks) => w.cases.forEach((c, i) => {c.gg.setAttribute("opacity", lt > t0 + i * .35 ? 1 : 0);
    const m = marks[i]; c.st.textContent = lt > t0 + i * .35 + .2 && m ? m : ""; c.st.setAttribute("fill", m === "허가" ? TEAL : CORAL)});
  w.dotsOn = (lt, t0) => {w.dots.forEach((d, i) => d.setAttribute("fill", lt > t0 && i < 33 ? CORAL : "#5a5470"));
    w.dlab.textContent = lt > t0 + .3 ? "1,000명 중 33명 = 3.3%p" : ""};
  w.umpOn = (lt, t0) => w.ump.forEach((e, i) => {const u = spr((lt - t0 - i * .3) / .5); e.style.opacity = clamp(u * 2);
    imgAt(e, [3240 + 260, 3240 + 540, 3240 + 820][i], 360, clamp(u, 0, 1.2), 0)});
  w.flip(-99, 0); w.seq(-99, 0, []); w.dotsOn(-99, 0); w.umpOn(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["판사도 **'이번엔 반대겠지'** 하고 판결할까?", "판사도, 이번엔 반대겠지 하고 판결할까요?", "pop"],
  ["2016년 **QJE**에 실린 논문", "이천십육 년에 나온 논문입니다."],
  ["저자: 대니얼 첸, 토비아스 모스코위츠, 켈리 슈", "저자는, 대니얼 첸, 토비아스 모스코위츠, 켈리 슈입니다."]],
  build(el, hud) {
    const c = {w: courtWorld(el)};
    c.h = kin(hud, 110, "판사도 **'이번엔 반대'**?", 84);
    c.j = kin(hud, 110, "**2016** · QJE", 96);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 도박사의 오류 (동전) */
scene({id: "coin", lines: [
  ["동전 앞면이 연달아 나오면? 이번엔 **뒷면** 같다", "동전 앞면이 몇 번 연달아 나오면, 이번엔 뒷면이 나올 것 같죠.", "pop"],
  ["하지만 동전은 **매번 반반**, 직전 결과와 상관없다", "하지만 동전은 매번 반반입니다. 직전 결과와는 상관이 없죠."],
  ["이 착각 = **도박사의_오류**(Gambler's Fallacy)", "이 착각을, 도박사의 오류라고 합니다.", "ding"]],
  build(el, hud) {
    const c = {w: courtWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 0, .9));
    w.flip(lt, .8); w.halfOn(lt > L[1] + .4);
    c.o.up(lt, {mood: lt < L[1] ? "skeptical" : lt > L[2] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 3. 자료 */
scene({id: "data", lines: [
  ["미국 난민 망명 재판 **15만 건** (1985~2013)", "연구진은, 미국 난민 망명 재판 십오만 건을 분석했습니다.", "coin"],
  ["앞 사건과 다음 사건은 **서로_상관없어야** 한다", "사건이 들어오는 순서는 우연이니, 앞 사건과 다음 사건은 서로 상관이 없어야 합니다."]],
  build(el, hud) {
    const c = {w: courtWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 780, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? whip(lt, 0, 0, 1080, .9) : whip(lt, L[1], 1080, 2160, .9));
    w.files.forEach((f, i) => {const u = spr((lt - .9 - i * .12) / .4); f.style.opacity = clamp(u * 2); imgAt(f, 1080 + 860, 980 - i * 40, clamp(u, 0, 1.2), 0)});
    w.seq(lt, L[1] + .8, ["", "", "", "", ""]);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["직전 허가 vs 거부: 다음 허가 확률 **최대_3.3%p** 낮음", "그런데 직전 사건을 허가했으면, 거부했을 때보다, 다음 사건을 허가할 확률이 최대 삼 점 삼 퍼센트포인트 낮았습니다.", "ding"],
  ["경험이 적은 판사, **짧은_간격**으로 이어질 때 더 강했다", "이런 경향은 경험이 적은 판사, 그리고 사건이 짧은 간격으로 이어질 때 더 강했죠."],
  ["대출 심사원, 야구_심판에게서도 **같은 패턴**", "대출 심사원과 야구 심판의 판정에서도, 같은 패턴이 나타났습니다.", "pop"]],
  build(el, hud) {
    const c = {w: courtWorld(el)};
    c.u = CX(hud, 1150, "점 하나 = 신청자 1명", "", {fontSize: "36px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < 2.4 ? 2160 : whip(lt, 2.4, 2160, 3240, .9));
    w.seq(lt, -9, ["허가", "허가", "거부", "허가", "거부"]); w.arr.textContent = lt > .6 && lt < 2.4 ? "허가 뒤엔 거부가 조금 더 잦았다" : "";
    w.dotsOn(lt, 3.4); ap(c.u, lt, 3.6); w.umpOn(lt, L[2] + .1);
    c.o.up(lt, {mood: lt > L[2] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 해석 + 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["가장 잘 맞는 설명: 이번엔 **거부할 차례**라는 착각", "연구진이 꼽은 설명은, 허가가 이어지면 이번엔 거부할 차례라고 느끼는 착각, 바로 도박사의 오류입니다.", "pop"],
  ["논문 제목: 〈**도박사의_오류** 아래의 의사결정〉", "논문 제목은, 도박사의 오류 아래의 의사 결정입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: courtWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1040, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 1080, 1));
    c.dim.style.opacity = P(lt, L[1] - .3, .5); ap(c.p, lt, L[1], null, {s: .92}); ap(c.f, lt, L[2], null, {s: .7, back: true});
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "skeptical", point: lt > L[2] ? .5 + .5 * Math.sin((lt - L[2]) * 6) : 0, look: [.5, -.6]});
  }
});
