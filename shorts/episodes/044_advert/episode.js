/* 오늘의 경제 044 — 광고 사진 한 장의 값 (v3: 부엉이 진행자·한 공간 카메라 이동·우편실·편지·저울·뇌)
   논문: Bertrand, M., Karlan, D., Mullainathan, S., Shafir, E. & Zinman, J. (2010)
         "What's Advertising Content Worth? Evidence from a Consumer Credit Marketing Field Experiment",
         Quarterly Journal of Economics 125(1): 263–306. doi:10.1162/qjec.2010.125.1.263
   확인(2026-11-19, 원문 PDF 는 이 세션에서 막힘 — QJE·Yale ISPS·IPA·J-PAL 요약 검색 결과로 확인):
   - 남아공 소비자 대출 회사의 우편(편지) 현장 실험: 광고 내용·금리·신청 기한을 동시에 무작위로(초록)
   - 대상: 예전 고객 53,194명(J-PAL/IPA 요약), 단기 대출, 월 이자율 3.25%~11.75% 무작위(요약)
   - 결과: 대출 예시를 적게(4개 대신 1개) 보여 주기, 특정 용도를 권하지 않기, 매력적인 여성 사진 넣기가
     각각 이자율 25% 인하만큼 대출 수요를 늘렸다(초록)
   - 여성 사진 효과는 남성 고객에게서, 여성 고객에게선 뚜렷한 패턴 없음(논문 인용 요약)
   - 해석: 광고 내용은 이성보다 직관에 '주변적'으로 호소해 설득한다(초록)
   예시: "25% 인하 = 월 8% → 6%"는 상대 비율 설명용 예시(8 × 0.75 = 6). 신청 서류 아이콘 수는 그림 예시. */
Object.assign(EP, {no: 44, style: "v2", title: "광고 사진 한 장의 값", hook: "대출 광고지에 넣은 사진 한 장이 금리 인하만큼 효과?",
  bgm: {seed: 263, bpm: 104, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2010, authors: "M. Bertrand, D. Karlan, S. Mullainathan, E. Shafir & J. Zinman",
          title: "What's Advertising Content Worth? Evidence from a Consumer Credit Marketing Field Experiment", ko: "광고 내용은 얼마의 가치가 있나?",
          cite: "125(1): 263–306", url: "https://doi.org/10.1162/qjec.2010.125.1.263"},
  yt: {title: "광고 사진 한 장이 금리 25% 인하만큼 효과? #경제 #shorts",
       desc: "남아프리카 공화국의 한 대출 회사가 예전 고객 5만 3천 명 넘게에게 대출 안내 편지를 보냈다. 편지마다 금리(월 이자율 3.25%~11.75%)를 제비뽑기로 정했고, 광고 내용도 제비뽑기로 바꿨다. 사진을 넣을지, 대출 예시를 몇 개 보여 줄지, 돈을 어디에 쓰라고 권할지 같은 것들이다. 무작위로 정했으니 대출 신청이 달라졌다면 그 차이는 금리나 광고 내용 때문이라고 볼 수 있다. 연구진은 먼저 금리를 낮추면 대출 신청이 얼마나 느는지 재고, 이를 잣대로 광고 내용의 효과를 금리로 바꿔 보았다. 편지에 여성 사진을 넣었을 때, 대출 예시를 네 개 대신 하나만 보여 줬을 때, 돈을 어디에 쓰라고 권하지 않았을 때 각각 금리를 25% 깎아 준 것과 비슷하게 대출 신청을 늘렸다(25%를 깎는다는 건 예를 들어 월 8%를 6%로 낮춘 정도). 여성 사진의 효과는 주로 남성 고객에게서 나타났다. 연구진은 광고가 따져 보는 이성보다 순간의 직관에 호소한다고 해석했다. 대출 광고를 볼 때는 사진보다 금리를 먼저 보자.",
       tags: ["경제", "행동경제학", "광고", "대출", "현장실험", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", PINK = "#ff8fb1";
const WW = 4320;                       // 세계 너비: 0 우편실 | 1080 편지 | 2160 저울 | 3240 뇌
let WID = 0;
const halo = {stroke: "#10182a", "stroke-width": 8, "paint-order": "stroke"};

function adWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`, R = rng(44);
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#2d4a6e"], [1, "#3c5d84"]]); lg("floor", [[0, "#6a4e36"], [1, "#3a2a1c"]]); lg("paper", [[0, "#fffdf6"], [1, "#f0e9d6"]]);
  lg("pan", [[0, "#ffe08a"], [1, "#c9962e"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1060, fill: U("wall")}, g);
  for (let x = 0; x < WW; x += 60) S("rect", {x, y: 0, width: 30, height: 1060, fill: "#fff", opacity: .025}, g);
  S("rect", {x: 0, y: 1060, width: WW, height: H - 1060, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 180) S("line", {x1: x, y1: 1060, x2: x - 120, y2: H, stroke: "#000", "stroke-width": 3, opacity: .15}, g);
  // 0: 우편실
  S("rect", {x: 120, y: 900, width: 520, height: 40, rx: 8, fill: "#8a6a4a"}, g);
  w.stack = Array.from({length: 8}, (_, i) => img(w.layer, "envelope", 250 + (i % 4) * 90, 900 - Math.floor(i / 4) * 60, 110));
  w.box = img(w.layer, "open_mailbox_with_raised_flag", 820, 1060, 230);
  w.fly = Array.from({length: 6}, () => img(w.layer, "incoming_envelope", 0, 0, 90));
  w.cnt = ST(g, 540, 430, "", {"font-size": 96, "font-weight": 900, fill: GOLD, ...halo});
  w.cntL = ST(g, 540, 500, "예전 고객에게 보낸 대출 안내 편지", {"font-size": 40, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  // 1080: 편지 한 장
  const L0 = 1080 + 190;
  S("rect", {x: L0 + 14, y: 434, width: 700, height: 600, rx: 18, fill: "#000", opacity: .25}, g);
  S("rect", {x: L0, y: 420, width: 700, height: 600, rx: 18, fill: U("paper")}, g);
  ST(g, L0 + 350, 490, "대출 안내", {"font-size": 46, "font-weight": 900, fill: "#2a2a3a"});
  w.rateT = ST(g, L0 + 350, 575, "", {"font-size": 50, "font-weight": 900, fill: "#c0392b"});
  w.die = img(w.layer, "game_die", L0 + 640, 470, 90);
  w.slotPh = S("rect", {x: L0 + 40, y: 620, width: 200, height: 240, rx: 12, fill: "#d8d2c0", stroke: "#a89f86", "stroke-width": 3, "stroke-dasharray": "10 8"}, g);
  ST(g, L0 + 140, 900, "사진?", {"font-size": 32, "font-weight": 900, fill: "#5a5444"});
  w.ph = img(w.layer, "woman", L0 + 140, 850, 190); w.ph.style.opacity = 0;
  w.exT = ST(g, L0 + 470, 660, "대출 예시: ? 개", {"font-size": 34, "font-weight": 900, fill: "#2a2a3a"});
  w.exR = [0, 1, 2, 3].map(i => S("rect", {x: L0 + 290, y: 690 + i * 48, width: 360, height: 34, rx: 6, fill: "#c9d6ea", opacity: 0}, g));
  w.useT = ST(g, L0 + 470, 960, "용도 권유: ?", {"font-size": 34, "font-weight": 900, fill: "#2a2a3a"});
  w.lotL = ST(g, 1080 + 540, 1110, "금리도 광고 내용도 제비뽑기", {"font-size": 40, "font-weight": 900, fill: GOLD, opacity: 0, ...halo});
  // 2160: 잣대 + 저울
  const sx = 2160 + 540, sy = 560;
  S("rect", {x: sx - 14, y: sy, width: 28, height: 470, fill: "#8a6a3a"}, g);
  S("path", {d: `M${sx - 150},1060 L${sx + 150},1060 L${sx},990 Z`, fill: "#6a4e2a"}, g);
  w.beam = S("g", {}, g);
  S("rect", {x: -330, y: -12, width: 660, height: 24, rx: 12, fill: "#c9962e"}, w.beam);
  [-300, 300].forEach(x => {S("line", {x1: x, y1: 0, x2: x - 110, y2: 200, stroke: "#c9962e", "stroke-width": 5}, w.beam);
    S("line", {x1: x, y1: 0, x2: x + 110, y2: 200, stroke: "#c9962e", "stroke-width": 5}, w.beam);
    S("path", {d: `M${x - 150},200 Q${x},270 ${x + 150},200 Z`, fill: U("pan")}, w.beam)});
  S("circle", {cx: sx, cy: sy, r: 22, fill: "#ffe08a"}, g);
  w.lp = img(w.layer, "coin", 0, 0, 130); w.rp = ["woman", "page", "cross_mark"].map(k => img(w.layer, k, 0, 0, 180));
  w.lpT = ST(g, sx - 300, 470, "금리 25% 인하", {"font-size": 40, "font-weight": 900, fill: GOLD, opacity: 0, ...halo});
  w.rpT = ST(g, sx + 300, 470, "", {"font-size": 40, "font-weight": 900, fill: PINK, ...halo});
  w.ex = ST(g, sx, 1130, "예: 월 이자율 8% → 6%", {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  w.ruler = img(w.layer, "straight_ruler", sx, 420, 180); w.ruler.style.opacity = 0;
  w.apps = Array.from({length: 7}, (_, i) => img(w.layer, "page", sx - 270 + i * 90, 1200, 80));
  w.appT = ST(g, sx, 330, "", {"font-size": 44, "font-weight": 900, fill: "#fff", ...halo});
  // 3240: 뇌 — 이성 vs 직관
  const bx = 3240 + 540;
  w.brain = img(w.layer, "brain", bx, 900, 330);
  w.reason = img(w.layer, "abacus", bx - 300, 780, 170); w.intu = img(w.layer, "smiling_face_with_heart-eyes", bx + 300, 780, 170);
  w.rT = ST(g, bx - 300, 840, "따져 보는 이성", {"font-size": 38, "font-weight": 900, fill: "#c9cfe6", opacity: 0, ...halo});
  w.iT = ST(g, bx + 300, 840, "순간의 직관", {"font-size": 38, "font-weight": 900, fill: PINK, opacity: 0, ...halo});
  w.mag = img(w.layer, "mag", bx + 140, 1180, 170); w.mag.style.opacity = 0;
  w.magT = ST(g, bx - 60, 1130, "금리 먼저!", {"font-size": 52, "font-weight": 900, fill: GOLD, opacity: 0, ...halo});
  // 앞쪽(흐린) 천장 등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#fff3d6", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {imgAt(w.box, 820, 1060, 1, 2 * Math.sin(lt * 2))};
  w.mail = (lt, t0, tc) => {w.fly.forEach((f, i) => {const u = ((lt - t0 - i * .35) % 2.1) / 2.1; const on = lt > t0 + i * .35;
      f.style.opacity = on && u < .9 ? 1 : 0; imgAt(f, lerp(330, 820, u), 860 - 170 * Math.sin(Math.PI * u), .8 + .2 * Math.sin(Math.PI * u), lerp(-20, 20, u))});
    if (lt > tc) countTo(w.cnt, lt, tc, 0, 53194, v => Math.round(v).toLocaleString("en-US") + "명"); else w.cnt.textContent = "";
    w.cntL.setAttribute("opacity", P(lt, tc + .4, .3))};
  w.letter = (lt, tr, tc) => {const rolling = lt > tr && lt < tr + 1.6, rates = [3.25, 5.5, 7.75, 9.25, 11.75, 4.5, 8, 6.25];
    w.rateT.textContent = lt < tr ? "월 이자율 ?%" : `월 이자율 ${rates[Math.floor(lt * 6) % rates.length]}%`;
    imgAt(w.die, 1080 + 190 + 640, 470, 1, rolling || lt > tr + 1.6 ? (lt * 400) % 360 : 0);
    w.lotL.setAttribute("opacity", P(lt, tr + .5, .3));
    const k = lt < tc ? -1 : Math.floor((lt - tc) * 1.5) % 4;
    w.ph.style.opacity = k >= 0 && k % 2 === 0 ? 1 : 0;
    w.exR.forEach((r, i) => r.setAttribute("opacity", k < 0 ? 0 : (i < (k % 2 ? 1 : 4) ? 1 : 0)));
    w.exT.textContent = k < 0 ? "대출 예시: ? 개" : `대출 예시: ${k % 2 ? 1 : 4}개`;
    w.useT.textContent = k < 0 ? "용도 권유: ?" : (k < 2 ? "용도 권유: 없음" : "용도 권유: 학비에 쓰세요")};
  w.scale = (lt, tA, tB, tf, tEx, tRule) => {   // tA: 신청 서류 / tf: 저울 항목 시작 시각들 / tEx: 8→6 예시
    w.ruler.style.opacity = P(lt, tRule, .3); imgAt(w.ruler, 2160 + 540, 420, 1, 6 * Math.sin(lt * 3));
    const ap_ = lt > tA, nn = lt < tA ? 0 : (lt < tB ? 4 : 7);
    w.apps.forEach((a, i) => {a.style.opacity = i < nn ? 1 : 0; imgAt(a, 2160 + 540 - 270 + i * 90, 1200, i < nn ? 1 : .5, 0)});
    w.appT.textContent = !ap_ ? "" : (lt < tB ? "금리 그대로: 신청 서류" : "금리 ↓ → 신청 서류 ↑ (그림 예시)");
    w.appT.setAttribute("opacity", lt > tf[0] - .2 ? 0 : 1);
    const on = lt > tf[0] - .2;
    w.apps.forEach(a => {if (on) a.style.opacity = 0});
    const k = tf.filter(t => lt > t).length - 1, tilt = on ? 8 * Math.exp(-2.5 * Math.max(0, lt - tf[Math.max(0, k)])) * Math.cos(9 * (lt - tf[Math.max(0, k)])) : 0;
    w.beam.setAttribute("transform", `translate(${2160 + 540},560) rotate(${on ? tilt : 0})`);
    const pan = s => {const a = tilt * Math.PI / 180; return [2160 + 540 + s * 300 * Math.cos(a), 560 + s * 300 * Math.sin(a) + 220]};
    const [lx, ly] = pan(-1), [rx, ry] = pan(1);
    w.lp.style.opacity = on ? 1 : 0; imgAt(w.lp, lx, ly, 1, 0); w.lpT.setAttribute("opacity", on ? 1 : 0);
    w.rp.forEach((e, i) => {e.style.opacity = on && k === i ? 1 : 0; imgAt(e, rx, ry, spr((lt - tf[i]) / .4), 0)});
    w.rpT.textContent = !on || k < 0 ? "" : ["여성 사진", "예시 1개만", "용도 권유 없음"][Math.min(k, 2)];
    w.ex.setAttribute("opacity", P(lt, tEx, .3))};
  w.mind = (lt, t0, t1, tm) => {w.rT.setAttribute("opacity", P(lt, t0, .3)); w.iT.setAttribute("opacity", P(lt, t0 + .4, .3));
    imgAt(w.reason, 3240 + 240, 780, lt > t1 ? .75 : 1, 0); imgAt(w.intu, 3240 + 840, 780 - 8 * Math.abs(Math.sin(lt * 4)), lt > t1 ? 1.25 : 1, 0);
    w.reason.style.opacity = lt > t1 ? .5 : 1;
    w.mag.style.opacity = P(lt, tm, .3); imgAt(w.mag, 3240 + 680 + 20 * Math.sin(lt * 2), 1180, 1, -10); w.magT.setAttribute("opacity", P(lt, tm + .2, .3))};
  w.mail(-99, 99, 99); w.letter(-99, 99, 99); w.scale(-99, 99, 99, [99, 99, 99], 99, 99); w.mind(-99, 99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["대출 광고에 사진 한 장, **금리 인하**만큼 효과?", "대출 광고지에 넣은 사진 한 장이, 금리를 깎아 준 것만큼 효과가 있었다면요?", "pop"],
  ["2010년 **QJE**에 실린 논문", "이천십 년에 나온 논문입니다."],
  ["저자 다섯 명: 베르트랑, 칼란, 멀라이너선, 샤피르, 진먼", "저자는 다섯 명입니다. 베르트랑, 칼란, 멀라이너선, 샤피르, 진먼."]],
  build(el, hud) {
    const c = {w: adWorld(el)};
    c.h = kin(hud, 120, "사진 한 장 = **금리 인하**?", 92);
    c.j = kin(hud, 120, "**2010** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.letter(lt, 99, .5);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 실험 */
scene({id: "setup", lines: [
  ["남아공의 대출 회사가 예전 고객에게 **대출 안내 편지**", "남아프리카 공화국의 한 대출 회사가, 예전 고객들에게, 대출 안내 편지를 보냈습니다.", "whoosh@0.1"],
  ["받은 사람: **5만 3천 명** 넘게", "편지를 받은 사람은, 오만 삼천 명이 넘습니다.", "coin"],
  ["편지마다 **금리**를 제비뽑기로: 월 이자율 3.25%~11.75%", "편지마다 금리는 제비뽑기로 정했습니다. 한 달 이자율이, 약 삼 퍼센트에서 십이 퍼센트까지 달랐죠."],
  ["**광고 내용**도 제비뽑기: 사진, 대출 예시 개수, 용도 권유", "광고 내용도 제비뽑기로 바꿨습니다. 사진을 넣을지, 대출 예시를 몇 개 보여 줄지, 돈을 어디에 쓰라고 권할지 같은 것들이죠."],
  ["무작위라서: 신청 차이는 **금리나 광고 내용 때문**", "무작위로 정했으니, 대출 신청이 달라졌다면, 그 차이는 금리나 광고 내용 때문이라고 볼 수 있습니다."]],
  build(el, hud) {
    const c = {w: adWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[2] ? whip(lt, 0, 1080, 0, .9) : whip(lt, L[2], 0, 1080, .9));
    w.mail(lt, .8, L[1] + .2); w.letter(lt, L[2] + .6, L[3] + .4);
    c.o.up(lt, {mood: lt > L[4] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 3. 잣대 */
scene({id: "ruler", lines: [
  ["먼저: 금리를 낮추면 **신청이 얼마나 느나**", "먼저, 금리를 낮추면, 대출 신청이 얼마나 느는지부터 확인합니다.", "pop"],
  ["이것을 **잣대**로 광고 효과를 **금리로 환산**", "이걸 잣대로 삼아서, 광고 내용의 효과를, 금리를 몇 퍼센트 깎아 준 것과 같은지로 바꿔 봅니다."]],
  build(el, hud) {
    const c = {w: adWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.letter(99, 0, 0); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.scale(lt, .9, L[0] + 2.2, [99, 99, 99], 99, L[1] + .2);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["① 편지에 **여성 사진**을 넣었을 때", "첫째, 편지에 여성 사진을 넣었을 때,", "pop"],
  ["② 대출 예시를 4개 대신 **하나만** 보여 줬을 때", "둘째, 대출 예시를 네 개 대신, 하나만 보여 줬을 때,", "pop"],
  ["③ 돈을 어디에 쓰라고 **권하지 않았을** 때", "셋째, 돈을 어디에 쓰라고 권하지 않았을 때,", "pop"],
  ["각각 금리를 **25% 깎아 준 것**과 비슷하게 신청을 늘렸다", "각각이, 금리를 이십오 퍼센트 깎아 준 것과 비슷하게, 대출 신청을 늘렸습니다.", "ding"],
  ["25% 깎는다는 건? 예: 월 이자율 **8% → 6%**", "이십오 퍼센트를 깎는다는 건, 예를 들어 한 달 이자율 팔 퍼센트를, 육 퍼센트로 낮춰 준 정도입니다.", "coin"],
  ["여성 사진의 효과는 주로 **남성 고객**에게서", "여성 사진의 효과는, 주로 남성 고객에게서 나타났습니다."]],
  build(el, hud) {
    const c = {w: adWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 780, s: lerp(1.02, 1.08, ease((lt - L[3]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(2160);
    w.scale(lt, -1, -1, [L[0] + .2, L[1] + .2, L[2] + .2], L[4] + .2, 0);
    c.o.up(lt, {mood: lt > L[3] && lt < L[4] ? "surprised" : (lt > L[5] ? "skeptical" : "normal"), look: [.7, -.6]});
  }
});

/* 5. 왜? */
scene({id: "why", lines: [
  ["연구진의 해석: 광고는 **이성보다 직관**에 호소", "연구진은, 광고가 따져 보는 이성보다, 순간의 직관에 호소한다고 해석했습니다.", "whoosh@0.1"],
  ["금리는 실제 돈 문제인데, **사진 한 장**이 그만큼 움직였다", "금리는 실제 돈이 걸린 문제인데도, 사진 한 장이 그만큼 마음을 움직인 거죠."],
  ["대출 광고를 볼 땐 **사진보다 금리**를 먼저", "그러니 대출 광고를 볼 때는, 사진보다 금리를 먼저 보세요.", "ding"]],
  build(el, hud) {
    const c = {w: adWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.scale(99, 0, 0, [0, 0, 0], 99, 99); w.pan(whip(lt, 0, 2160, 3240, .9)); w.mind(lt, .9, L[1] + .3, L[2] + .3);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : (lt > L[1] ? "skeptical" : "normal"), look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**광고 내용은 얼마의 가치가 있나?**〉", "논문 제목은, 광고 내용은 얼마의 가치가 있나, 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: adWorld(el)};
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
