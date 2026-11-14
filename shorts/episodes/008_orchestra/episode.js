/* 오늘의 경제 008 — 커튼 뒤 오디션 (v3: 부엉이 진행자·한 공간 카메라 이동·단원 좌석)
   논문: Goldin, C. & Rouse, C. (2000) "Orchestrating Impartiality: The Impact of 'Blind' Auditions on Female Musicians",
         American Economic Review 90(4): 715–741. doi:10.1257/aer.90.4.715 (NBER WP 5903, 1997)
   확인(2026-11-14, 원문 PDF 는 이 세션에서 막혀 초록으로 확인):
   - AER 초록: 실제 오디션 자료·개인 고정효과로 분석, 가림막(screen)이 여성이 다음 단계로 올라가고 뽑힐 확률을 높였다,
     "the weight of the evidence suggests that the blind audition procedure fostered impartiality in hiring and increased the proportion women"
   - NBER 판 초록: 미국 5대 오케스트라 여성 단원 1970년 5% 미만 → 현재(1997) 25%;
     가림막이 새로 뽑힌 단원 중 여성 비율 증가의 30~55% 를 설명 → 영상은 두 판 모두와 맞는 '약 30% 이상'만 쓴다.
     (예선 통과 확률 +50% 는 NBER 판에만 있어 쓰지 않음)
   - 후속 비판: 추정치 상당수가 통계적으로 불확실하다는 지적(예: Pallesen 2019) → 영상은 '연구진 추정'으로 쓰고 설명란에 밝힌다.
   - 클로디아 골딘 2023년 노벨 경제학상.
   좌석 24석: 1명 = 약 4%(5% 미만), 6명 = 25%. 새 여성 단원 증가분 10칸 중 3칸 = 30%. */
Object.assign(EP, {no: 8, style: "v2", title: "커튼 뒤 오디션", hook: "오디션에 커튼을 쳤더니 생긴 일",
  bgm: {seed: 95, bpm: 96, mood: "calm"},
  paper: {journal: "American Economic Review", year: 2000, authors: "Claudia Goldin & Cecilia Rouse",
          title: "Orchestrating Impartiality: The Impact of “Blind” Auditions on Female Musicians", ko: "공정함을 연주하다: 블라인드 오디션이 여성 연주자에게 미친 영향",
          cite: "90(4): 715–741", url: "https://doi.org/10.1257/aer.90.4.715"},
  yt: {title: "오디션에 커튼을 쳤더니 생긴 일 | 블라인드 오디션 #경제 #shorts",
       desc: "1970년 미국 5대 오케스트라 단원 중 여성은 5%도 안 됐지만 1990년대 중반 약 25%가 됐다. 그 사이 많은 오케스트라가 심사위원과 연주자 사이에 가림막을 쳤다. 실제 오디션 기록을 분석하니 가림막이 있을 때 여성이 다음 단계로 올라가고 뽑힐 가능성이 높아졌고, 연구진은 새로 뽑힌 단원 중 여성이 늘어난 것의 약 30% 이상을 가림막으로 설명했다(5%·25%·30~55% 는 NBER 판 초록). 다만 추정치 상당수가 통계적으로 불확실하다는 후속 비판도 있다. 저자 클로디아 골딘은 2023년 노벨 경제학상을 받았다.",
       tags: ["경제", "블라인드오디션", "블라인드채용", "골딘", "노동경제학", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 무대 | 1080 오디션실 | 2160 단계 계단 | 3240 새 단원
let WID = 0;
const SEATS = Array.from({length: 24}, (_, i) => ({x: 190 + (i % 6) * 140 + (Math.floor(i / 6) % 2) * 35, y: 700 + Math.floor(i / 6) * 125}));
const W70 = [14], W95 = [2, 7, 10, 14, 17, 22];      // 여성 자리: 1970년 1명(약 4%), 1990년대 6명(25%)

function hallWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#160f1f"], [1, "#3a2230"]]); lg("stage", [[0, "#a8743e"], [1, "#4a2c14"]]);
  lg("cur", [[0, "#9a1f2e"], [1, "#5a0f1a"]], {x2: 1, y2: 0}); lg("spot", [[0, "#fff1c8", .4], [1, "#fff1c8", 0]]);
  lg("scr", [[0, "#d9cfc0"], [1, "#b8ab96"]]); lg("carpet", [[0, "#b8323f"], [1, "#7a1a26"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 940, fill: U("wall")}, g);
  // 양옆 붉은 휘장(매 구역)
  for (let z = 0; z < 4; z++) [z * 1080, z * 1080 + 1000].forEach((x, k) => {
    S("path", {d: `M${x},0 L${x + 80},0 Q${x + (k ? 20 : 60)},${470} ${x + 80},940 L${x},940 Z`, fill: U("cur")}, g)});
  S("path", {d: `M0,0 L${WW},0 L${WW},90 Q${WW / 2},140 0,90 Z`, fill: U("cur")}, g);
  w.spots = [270, 540, 810, 1080 + 540, 2160 + 540, 3240 + 540].map(x => S("path", {d: `M${x - 60},0 L${x + 60},0 L${x + 260},940 L${x - 260},940 Z`, fill: U("spot")}, g));
  S("rect", {x: 0, y: 940, width: WW, height: H - 940, fill: U("stage")}, g);
  for (let i = 0; i < 10; i++) S("line", {x1: 0, y1: 960 + i * 34 + i * i * 5, x2: WW, y2: 960 + i * 34 + i * i * 5, stroke: "#2e1a0a", "stroke-width": 3, opacity: .4}, g);
  // 무대 좌석 24석(0 구역)
  w.ppl = SEATS.map((s, i) => ({s, ring: S("ellipse", {cx: s.x, cy: s.y + 4, rx: 58, ry: 16, fill: "#000", opacity: .35}, g),
    m: img(w.layer, "man", s.x, s.y, 150), f: img(w.layer, "woman", s.x, s.y, 150)}));
  // 오디션실(1080): 가림막·카펫·심사위원
  S("rect", {x: 1080 + 120, y: 1000, width: 840, height: 120, fill: U("carpet")}, g);
  w.screen = S("g", {}, g);
  S("rect", {x: 1080 + 300, y: 360, width: 480, height: 640, rx: 10, fill: U("scr"), stroke: "#7a6a52", "stroke-width": 10}, w.screen);
  for (let k = 1; k < 4; k++) S("line", {x1: 1080 + 300 + k * 120, y1: 360, x2: 1080 + 300 + k * 120, y2: 1000, stroke: "#9a8a72", "stroke-width": 5}, w.screen);
  w.shadow = S("g", {opacity: .55}, g);   // 가림막 위 연주자 그림자
  S("ellipse", {cx: 1080 + 540, cy: 560, rx: 46, ry: 54, fill: "#3a2a1a"}, w.shadow);
  S("path", {d: `M${1080 + 470},${960} Q${1080 + 470},${640} ${1080 + 540},${620} Q${1080 + 610},${640} ${1080 + 610},${960} Z`, fill: "#3a2a1a"}, w.shadow);
  S("line", {x1: 1080 + 590, y1: 640, x2: 1080 + 690, y2: 560, stroke: "#3a2a1a", "stroke-width": 10}, w.shadow);
  w.notes = img(w.layer, "musical_notes", 1080 + 800, 520, 150);
  w.steps = img(w.layer, "footprints", 1080 + 300, 1110, 120);
  w.judges = [1080 + 330, 1080 + 540, 1080 + 750].map(x => {const j = S("g", {}, g);
    S("circle", {cx: x, cy: 1150, r: 50, fill: "#1a1424"}, j); S("path", {d: `M${x - 90},1300 Q${x},1170 ${x + 90},1300 Z`, fill: "#1a1424"}, j); return j});
  // 단계 계단(2160)
  const stepsX = [2160 + 200, 2160 + 450, 2160 + 700], stepsY = [1060, 860, 660];
  ["예선", "준결선", "결선"].forEach((t, k) => {
    S("rect", {x: stepsX[k] - 120, y: stepsY[k], width: 240, height: 1100 - stepsY[k], rx: 10, fill: ["#4a3a5c", "#5a4670", "#6a5284"][k], stroke: "#8a76a8", "stroke-width": 4}, g);
    ST(g, stepsX[k], stepsY[k] + 70, t, {"font-size": 44, "font-weight": 800, fill: "#fff"})});
  w.climb = img(w.layer, "woman", stepsX[0], stepsY[0], 220);
  w.stepsX = stepsX; w.stepsY = stepsY;
  w.vio = img(w.layer, "violin", 2160 + 860, 560, 150);
  // 새 단원 증가분(3240): 10칸
  w.blocks = Array.from({length: 10}, (_, i) => {const b = S("g", {opacity: 0}, g);
    S("rect", {x: 3240 + 140 + i * 82, y: 760, width: 70, height: 200, rx: 12, fill: i < 3 ? GOLD : "#5a4670", stroke: "#fff", "stroke-width": 3}, b); return b});
  w.bLab = ST(g, 3240 + 540, 1050, "새로 뽑힌 단원 중 여성 증가분", {"font-size": 42, "font-weight": 800, fill: "#fff", opacity: 0});
  w.brace = S("g", {opacity: 0}, g);
  S("path", {d: `M${3240 + 140},745 L${3240 + 140},705 L${3240 + 374},705 L${3240 + 374},745`, stroke: GOLD, "stroke-width": 6, fill: "none"}, w.brace);
  ST(w.brace, 3240 + 380, 660, "가림막으로 설명 (약 30% 이상)", {"font-size": 46, "font-weight": 800, fill: GOLD});
  w.trumpet = img(w.layer, "trumpet", 3240 + 860, 560, 140);
  // 앞쪽(흐린) 객석 머리: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("path", {d: `M${x - 160},0 Q${x},120 ${x + 160},0 Z`, fill: "#0e0912"}, fs);
    S("circle", {cx: x, cy: 40, r: 18, fill: "#ffe7b0", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => w.spots.forEach((s, i) => s.setAttribute("opacity", .7 + .3 * Math.sin(lt * 1.1 + i)));
  // 좌석: women = 여성 자리 목록, t0 등장, sw 바뀌는 시각(이전 목록 → 새 목록)
  w.seats = (lt, women, t0, prev, sw) => w.ppl.forEach((o, i) => {
    const u = spr((lt - t0 - i * .03) / .5), now = sw != null && lt > sw + i * .04 ? women : (prev || women), isW = now.includes(i);
    const pop = sw != null && women.includes(i) && !(prev || []).includes(i) ? spr((lt - sw - i * .04) / .45) : 1;
    o.ring.setAttribute("fill", isW ? CORAL : "#000"); o.ring.setAttribute("opacity", isW ? .9 * clamp(u * 2) : .35);
    imgAt(o.m, o.s.x, o.s.y - 3 * Math.abs(Math.sin(lt * 2 + i)), clamp(u, 0, 1.2), 0); o.m.style.opacity = isW ? 0 : clamp(u * 2) * .75;
    imgAt(o.f, o.s.x, o.s.y - 3 * Math.abs(Math.sin(lt * 2 + i)), clamp(u, 0, 1.2) * clamp(pop, 0, 1.25), 0); o.f.style.opacity = isW ? clamp(u * 2) : 0;
  });
  w.blk = (lt, t0, br) => {w.blocks.forEach((b, i) => {const u = clamp((lt - t0 - i * .08) / .3); b.setAttribute("opacity", u); b.setAttribute("transform", `translate(0,${(1 - eback(u)) * 60})`)});
    w.bLab.setAttribute("opacity", P(lt, t0 + .4, .3)); w.brace.setAttribute("opacity", br == null ? 0 : P(lt, br, .3))};
  w.seats(-99, W70, 0); w.blk(-99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
const pill = (hud, y, html, bg, fs) => CX(hud, y, `<span style="display:inline-block;background:${bg};color:#10182a;padding:8px 34px;border-radius:50px;box-shadow:0 10px 26px rgba(0,0,0,.4)">${html}</span>`, "", {fontSize: (fs || 60) + "px", fontWeight: 800});

/* 1. 질문 + 1970년 vs 1990년대 (무대) */
scene({id: "hook", lines: [
  ["오디션에 **커튼**을 쳤더니?", "오케스트라 오디션에 커튼을 쳤더니, 무슨 일이 생겼을까요?", "pop"],
  ["2000년 **AER**, 골딘과 라우스의 논문", "이천 년, 경제학자 골딘과 라우스의 논문입니다."],
  ["1970년 미국 대표 오케스트라 5곳 여성 단원: **5% 미만**", "천구백칠십 년, 미국의 대표 오케스트라 다섯 곳에서, 여성 단원은 오 퍼센트도 안 됐습니다.", "pop"],
  ["1990년대 중반: **약 25%**", "그런데 구십 년대 중반에는 약 이십오 퍼센트가 됩니다.", "ding"]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.h = kin(hud, 200, "오디션에<br>**커튼**을 쳤더니?", 100);
    c.j = kin(hud, 230, "**2000** · AER", 110);
    c.n = bigNum(hud, 180, "", GOLD, 120);
    c.sub = CX(hud, 340, "여성 단원(주황 받침) 비율 · 24석으로 나타냄", "", {fontSize: "40px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.o = host(hud, "owl", {x: 110, y: 1285, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 880, s: lerp(1.15, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    w.seats(lt, W95, .4, W70, L[3] + .2);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1, L[2] - .2);
    c.n.innerHTML = lt < L[3] ? "1970 · <span style='color:#fff'>1명/24</span>" : "1990년대 · <span style='color:#fff'>6명/24</span>";
    c.n.style.opacity = P(lt, L[2] + .1, .3); ap(c.sub, lt, L[2] + .5);
    c.o.up(lt, {x: lerp(-200, 110, ease((lt - .3) / .7)), mood: lt > L[3] ? "surprised" : "normal", look: [.7, -.5]});
  }
});

/* 2. 가림막 (오디션실) */
scene({id: "screen", lines: [
  ["그 사이 오케스트라들이 **가림막**을 쳤다", "그 사이 많은 오케스트라가, 심사위원 앞에 가림막을 쳤습니다.", "whoosh@0.2"],
  ["심사위원은 **소리만** 듣는다", "심사위원은 소리만 듣고, 누가 연주하는지 모르게 된 거죠."],
  ["발소리를 감추려 **카펫**까지", "구두 소리로 들킬까 봐, 바닥에 카펫을 깔기도 했어요.", "pop"]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.h = kin(hud, 190, "**블라인드** 오디션", 96);
    c.en = CX(hud, 310, "Blind Audition", "", {fontSize: "48px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.o = host(hud, "owl", {x: 120, y: 1285, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lerp(1, 1.06, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    const up = ease((lt - .9) / .8);
    w.screen.setAttribute("transform", `translate(0,${(1 - up) * -700})`);
    w.shadow.setAttribute("opacity", .55 * up * (.85 + .15 * Math.sin(lt * 3)));
    kinUp(c.h, lt, .9, null); ap(c.en, lt, 1.4);
    const tn = spr((lt - L[1] - .2) / .5); imgAt(w.notes, 1080 + 800 + 10 * Math.sin(lt * 2), 520 - 10 * Math.sin(lt * 3), clamp(tn, 0, 1.2), 10 * Math.sin(lt * 2)); w.notes.style.opacity = clamp(tn * 2);
    const tf = spr((lt - L[2] - .3) / .5); imgAt(w.steps, 1080 + 300 + 4 * Math.sin(lt * 5), 1110, clamp(tf, 0, 1.2), 0); w.steps.style.opacity = clamp(tf * 2);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "normal", look: [.8, -.4]});
  }
});

/* 3. 결과 (단계 계단 → 새 단원) */
scene({id: "result", lines: [
  ["실제 오디션 기록: 가림막이 있으면 여성이 **더 많이 올라갔다**", "실제 오디션 기록을 분석하니, 가림막이 있을 때 여성이 다음 단계로 올라가고 뽑힐 가능성이 높아졌습니다.", "pop"],
  ["새로 뽑힌 여성 증가분의 **약 30% 이상** = 가림막", "연구진 추정으로는, 새로 뽑힌 단원 중 여성이 늘어난 것의 약 삼십 퍼센트 이상을, 가림막으로 설명할 수 있었어요.", "ding"]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1285, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.pan(lt < L[1] ? whip(lt, 0, 1080, 2160, .9) : whip(lt, L[1], 2160, 3240, .8));
    // 계단 오르기
    const k = clamp((lt - 1.4) / 3.2) * 2, a = Math.floor(Math.min(k, 1.999)), f = ease(k - a);
    const x = lerp(w.stepsX[a], w.stepsX[Math.min(a + 1, 2)], f), y = lerp(w.stepsY[a], w.stepsY[Math.min(a + 1, 2)], f) - Math.sin(Math.PI * f) * 120;
    imgAt(w.climb, x, y, 1, 0);
    const tv = spr((lt - 4.8) / .5); imgAt(w.vio, 2160 + 860, 560, clamp(tv, 0, 1.2), 10 * Math.sin(lt * 3)); w.vio.style.opacity = clamp(tv * 2);
    w.blk(lt, L[1] + .6, L[1] + 1.8);
    const tt = spr((lt - L[1] - 2.2) / .5); imgAt(w.trumpet, 3240 + 860, 560, clamp(tt, 0, 1.2), -10); w.trumpet.style.opacity = clamp(tt * 2);
    c.o.up(lt, {mood: lt > L[1] + 1.8 ? "surprised" : "happy", look: [.8, -.5]});
  }
});

/* 4. 의미 (무대로 돌아옴) */
scene({id: "meaning", lines: [
  ["저자 골딘: 2023년 **노벨 경제학상**", "그리고 저자 골딘은, 이천이십삼 년 노벨 경제학상을 받았습니다.", "ding"]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.nb = pill(hud, 230, "2023 노벨 경제학상 · 클로디아 골딘", GOLD, 50);
    c.m = img(hud, "medal", 540, 640, 260);
    c.o = host(hud, "owl", {x: 110, y: 1285, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 880, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, .9));
    w.seats(lt, W95, -9);
    const tm = spr((lt - .3) / .6); imgAt(c.m, 540, 640, clamp(tm, 0, 1.2), 6 * Math.sin(lt * 3)); c.m.style.opacity = clamp(tm * 2);
    ap(c.nb, lt, .5, null, {s: .6, back: true});
    c.o.up(lt, {mood: "happy", look: [.6, -.6]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**공정함**을 연주하다〉", "논문 제목은, 공정함을 연주하다입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 980, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.seats(lt, W95, -9);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
