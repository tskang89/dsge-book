/* 오늘의 경제 005 — 레몬 시장 (v3: 부엉이 진행자·한 공간 카메라 이동·자동차 더미)
   논문: Akerlof, G. A. (1970) "The Market for 'Lemons': Quality Uncertainty and the Market Mechanism",
         Quarterly Journal of Economics 84(3): 488–500. doi:10.2307/1879431
   이론 논문이라 실측 숫자가 없다 → 영상의 금액(좋은 차 2,000만 원, 나쁜 차 1,000만 원, 반반)은 **예시**로 밝힌다.
   검산: 반반이면 평균 (2,000 + 1,000) / 2 = 1,500만 원. 좋은 차 주인은 2,000만 원 가치라 1,500에 안 판다 → 나쁜 차만 남고 값은 1,000만 원.
   논문 내용 확인: 파는 사람만 품질을 안다(정보 비대칭), 나쁜 차가 좋은 차를 몰아낸다(본문, 그레셤 법칙 비유),
   보증·브랜드·체인·면허 같은 제도가 이 문제를 줄인다(본문 'Counteracting Institutions').
   뒷이야기: AER 등에서 '너무 뻔하다'·'틀렸다'는 이유로 거절된 뒤 QJE 에 실림(애컬로프 2001 에세이, 위키백과 — 횟수는 자료마다 달라 '여러 번'으로만 말함).
   2001년 노벨 경제학상(애컬로프·스펜스·스티글리츠, 비대칭 정보 시장 분석). */
Object.assign(EP, {no: 5, style: "v2", title: "레몬 시장", hook: "중고차 시장에서 좋은 차가 사라지는 이유",
  bgm: {seed: 63, bpm: 100, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 1970, authors: "George A. Akerlof",
          title: "The Market for 'Lemons': Quality Uncertainty and the Market Mechanism", ko: "레몬 시장: 품질의 불확실성과 시장 메커니즘",
          cite: "84(3): 488–500", url: "https://doi.org/10.2307/1879431"},
  yt: {title: "중고차 시장에서 좋은 차가 사라지는 이유 | 레몬 시장 #경제 #shorts",
       desc: "차가 좋은지 나쁜지 파는 사람만 안다. 예를 들어 좋은 차 2,000만 원, 나쁜 차(레몬) 1,000만 원이 반반이면 사는 사람은 평균 1,500만 원까지만 낸다. 그러면 좋은 차 주인은 팔지 않고, 시장엔 나쁜 차만 남는다. 논문은 보증·브랜드 같은 제도가 이 문제를 줄인다고 봤다. 처음엔 여러 학술지에서 거절됐지만 2001년 노벨 경제학상으로 이어졌다. (금액은 이해를 돕는 예시이며, 논문은 이론 모형이다)",
       tags: ["경제", "레몬시장", "정보비대칭", "애컬로프", "중고차", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", LEM = "#f7e04a";
const WW = 4320;                       // 세계 너비: 0 입구 | 1080 두 차 | 2160 시장 | 3240 보증·노벨
let WID = 0;
const LOT = Array.from({length: 8}, (_, i) => ({x: 2160 + 200 + (i % 4) * 230, y: 800 + Math.floor(i / 4) * 250, good: [0, 2, 5, 7].includes(i)}));

/* ---- 중고차 매장 세계 ---- */
function lotWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#2b3a7a"], [.55, "#a95f8e"], [1, "#ffb071"]]); lg("ground", [[0, "#4a4f63"], [1, "#1c1f2b"]]);
  lg("pod", [[0, "#6a7390"], [1, "#363c52"]]); lg("tagG", [[0, "#8fe0c8"], [1, TEAL]]); lg("tagR", [[0, "#ffb39a"], [1, CORAL]]);
  lg("glow", [[0, "#fff2c0", .5], [1, "#fff2c0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("sky")}, g);
  w.sun = S("circle", {cx: 2600, cy: 760, r: 130, fill: "#ffd08a", opacity: .85}, g);
  // 먼 언덕·건물
  const r0 = rng(n * 3 + 7);
  let px = -40; while (px < WW) {const h = 80 + r0() * 180, wd = 90 + r0() * 140;
    S("rect", {x: px, y: 900 - h, width: wd, height: h, fill: "#2a2850", opacity: .75}, g); px += wd + 10}
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("ground")}, g);
  for (let i = -6; i <= 64; i++) S("line", {x1: i * 160, y1: 900, x2: i * 160 + (i * 160 % 1080 - 540) * 1.6, y2: 1500, stroke: "#e9edf5", "stroke-width": 4, opacity: .18}, g);
  // 깃발 줄
  w.flags = [];
  for (let s = 0; s < 4; s++) {const x0 = s * 1080 + 40, x1 = x0 + 1000;
    S("path", {d: `M${x0},170 Q${(x0 + x1) / 2},260 ${x1},170`, stroke: "#e9edf5", "stroke-width": 3, fill: "none", opacity: .7}, g);
    for (let k = 0; k < 12; k++) {const t = (k + .5) / 12, x = lerp(x0, x1, t), y = 170 + 90 * 4 * t * (1 - t) * .5 * 2 / 2;
      const f = S("path", {d: `M${x - 22},${y} L${x + 22},${y} L${x},${y + 46} Z`, fill: [RED, GOLD, BLUE, TEAL][k % 4]}, g); w.flags.push({f, x, y, k})}}
  // 입구 간판
  S("rect", {x: 820, y: 330, width: 18, height: 600, fill: "#30354a"}, g);
  S("rect", {x: 640, y: 300, width: 380, height: 130, rx: 20, fill: RED, stroke: "#fff", "stroke-width": 6}, g);
  ST(g, 830, 388, "중고차", {"font-size": 62, "font-weight": 800, fill: "#fff"});
  ST(g, 830, 412, "USED CARS", {"font-size": 22, "font-weight": 800, fill: "#ffe0d8"});
  w.cars0 = [[260, 1080, 300], [620, 1120, 260]].map(([x, y, s]) => ({e: img(w.layer, "automobile", x, y, s), x, y}));
  // 두 차 구역: 받침대
  w.big = [0, 1].map(k => {const x = 1080 + [290, 790][k];
    S("ellipse", {cx: x, cy: 1010, rx: 210, ry: 40, fill: U("pod")}, g);
    S("ellipse", {cx: x, cy: 1000, rx: 210, ry: 40, fill: "#7c86a6"}, g);
    S("path", {d: `M${x - 160},380 L${x + 160},380 L${x + 230},1000 L${x - 230},1000 Z`, fill: U("glow"), opacity: .6}, g);
    return {x, car: img(w.layer, "automobile", x, 1010, 360), q: ST(g, x, 560, "?", {"font-size": 150, "font-weight": 800, fill: GOLD, opacity: 0})}});
  const tag = (x, y, t1, t2, grad) => {const t = S("g", {opacity: 0}, g);
    S("line", {x1: x, y1: y - 90, x2: x, y2: y - 40, stroke: "#e9edf5", "stroke-width": 4}, t);
    S("rect", {x: x - 170, y: y - 40, width: 340, height: 130, rx: 20, fill: U(grad), stroke: "#fff", "stroke-width": 5}, t);
    ST(t, x, y + 6, t1, {"font-size": 38, "font-weight": 800, fill: "#10182a"});
    ST(t, x, y + 64, t2, {"font-size": 54, "font-weight": 800, fill: "#10182a"}); return t};
  w.tagG = tag(1080 + 290, 520, "좋은 차", "2,000만 원", "tagG");
  w.tagR = tag(1080 + 790, 520, "나쁜 차", "1,000만 원", "tagR");
  w.lemon = img(w.layer, "lemon", 1080 + 790, 840, 170);
  // 시장 구역: 차 8대
  w.lot = LOT.map(c => ({c, e: img(w.layer, "automobile", c.x, c.y, 200), q: ST(g, c.x, c.y - 200, "?", {"font-size": 70, "font-weight": 800, fill: GOLD}),
    l: img(w.layer, "lemon", c.x + 40, c.y - 120, 90), sp: img(w.layer, "sparkles", c.x + 60, c.y - 130, 80)}));
  // 보증·노벨 구역
  w.shield = img(w.layer, "shield", 3240 + 330, 900, 300);
  w.medal = img(w.layer, "medal", 3240 + 760, 920, 300);
  w.page = img(w.layer, "page", 3240 + 540, 1000, 380);
  w.stamp = A(w.layer, 3240 + 370, 740, "거절", "", {width: "340px", textAlign: "center", border: "12px solid " + RED, borderRadius: "18px", color: RED,
    fontSize: "100px", fontWeight: 800, lineHeight: "130px", background: "rgba(255,255,255,.6)", opacity: 0});
  // 앞쪽(흐린) 가로등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 340, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("path", {d: `M${x},0 L${x},40 Q${x},70 ${x + 60},70`, stroke: "#141626", "stroke-width": 14, fill: "none"}, fs);
    S("ellipse", {cx: x + 80, cy: 86, rx: 60, ry: 22, fill: "#fff3c4", opacity: .85}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {
    w.flags.forEach(f => f.f.setAttribute("transform", `rotate(${8 * Math.sin(lt * 3 + f.k)} ${f.x} ${f.y})`));
    w.sun.setAttribute("r", 130 + 6 * Math.sin(lt * 1.2));
  };
  // 시장: goneT[i] 가 있으면 그 시각부터 왼쪽으로 떠남. reveal 은 레몬 표시 시각
  w.market = (lt, show, goneT, reveal) => w.lot.forEach((o, i) => {
    const u = spr((lt - show - i * .08) / .5), go = o.c.good && goneT != null ? ease((lt - goneT - [0, 0, .25, 0, 0, .5, 0, .75][i]) / .9) : 0;
    imgAt(o.e, o.c.x - go * 1400, o.c.y + (go > 0 && go < 1 ? 4 * Math.sin(lt * 30) : 0), clamp(u, 0, 1.2), go > 0 && go < 1 ? 3 : 0);
    o.e.style.opacity = clamp(u * 2) * (1 - clamp((go - .7) / .3));
    o.q.setAttribute("opacity", clamp(u * 2) * (1 - clamp(go * 3)) * (reveal != null && !o.c.good ? 1 - clamp((lt - reveal) / .3) : 1));
    o.q.setAttribute("x", o.c.x - go * 1400);
    const lv = reveal != null && !o.c.good ? spr((lt - reveal - i * .06) / .5) : 0;
    imgAt(o.l, o.c.x + 40, o.c.y - 120, clamp(lv, 0, 1.2), -10 + 6 * Math.sin(lt * 3 + i)); o.l.style.opacity = clamp(lv * 2);
    const sv = o.c.good && goneT != null ? clamp(go * 4) * (1 - clamp((go - .5) / .3)) : 0;
    imgAt(o.sp, o.c.x + 60 - go * 1400, o.c.y - 130, sv, 0); o.sp.style.opacity = sv;
  });
  w.market(-99, 0, null, null);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
const pill = (hud, y, html, bg, fs) => CX(hud, y, `<span style="display:inline-block;background:${bg};color:#10182a;padding:8px 34px;border-radius:50px;box-shadow:0 10px 26px rgba(0,0,0,.4)">${html}</span>`, "", {fontSize: (fs || 60) + "px", fontWeight: 800});

/* 1. 질문 (입구) */
scene({id: "hook", lines: [
  ["중고차 시장에서 **좋은_차**가 사라지는 이유", "중고차 시장에서, 좋은 차가 사라지는 이유가 있습니다.", "pop"],
  ["1970년 **QJE**, 애컬로프의 논문", "천구백칠십 년, 경제학자 애컬로프가 쓴 논문입니다."]],
  build(el, hud) {
    const c = {w: lotWorld(el)};
    c.h = kin(hud, 470, "좋은 차는<br>**왜 사라질까?**", 100);
    c.j = kin(hud, 520, "**1970** · QJE", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    w.cars0.forEach((o, i) => {const t = spr((lt - .2 - i * .2) / .6); imgAt(o.e, o.x + (1 - clamp(t)) * 300, o.y, clamp(t, 0, 1.2), 0); o.e.style.opacity = clamp(t * 2)});
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 정보 비대칭과 예시 값 (두 차) */
scene({id: "setup", lines: [
  ["파는 사람은 알고, 사는 사람은 **모른다**", "차가 좋은지 나쁜지, 파는 사람은 알고 사는 사람은 모릅니다.", "pop"],
  ["예: 좋은 차 **2,000만 원**, 나쁜 차 **1,000만 원**", "예를 들어, 좋은 차의 가치는 이천만 원, 나쁜 차는 천만 원이라고 해 보죠.", "coin"],
  ["미국에선 나쁜 중고차를 **레몬**이라 부른다", "미국에서는 이런 나쁜 중고차를 레몬이라고 부릅니다.", "pop"]],
  build(el, hud) {
    const c = {w: lotWorld(el)};
    c.ex = CX(hud, 280, "예시", "", {fontSize: "44px", fontWeight: 800, color: "#fff", opacity: 0});
    c.ex.innerHTML = `<span style="border:3px solid #fff;border-radius:30px;padding:4px 24px">예시</span>`;
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lerp(1, 1.05, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    w.big.forEach((b, k) => {const t = spr((lt - .5 - k * .2) / .6); imgAt(b.car, b.x, 1010, clamp(t, 0, 1.2), 0); b.car.style.opacity = clamp(t * 2);
      b.q.setAttribute("opacity", P(lt, 1.4 + k * .2, .3) * (1 - P(lt, L[1], .3)));
      b.q.setAttribute("transform", `translate(0,${-8 * Math.abs(Math.sin(lt * 3 + k))})`)});
    w.tagG.setAttribute("opacity", P(lt, L[1] + .3, .3)); w.tagR.setAttribute("opacity", P(lt, L[1] + 1.4, .3));
    ap(c.ex, lt, L[1] + .1, null, {s: .7});
    const tl = spr((lt - L[2] - .2) / .6); imgAt(w.lemon, 1080 + 790, 840, clamp(tl, 0, 1.2), -12 + 8 * Math.sin(lt * 3)); w.lemon.style.opacity = clamp(tl * 2);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "normal", point: lt > L[1] ? ease((lt - L[1]) / .4) : 0, look: [.8, -.4]});
  }
});

/* 3. 시장: 평균값 → 좋은 차가 떠난다 → 레몬만 (시장) */
scene({id: "market", lines: [
  ["반반 섞여 있으면 사는 사람은 **평균 1,500만 원**까지만", "둘이 반반 섞여 있으면, 사는 사람은 평균인 천오백만 원까지만 내려고 합니다.", "coin"],
  ["좋은 차 주인: 1,500만 원엔 **안 판다**", "그러면 좋은 차 주인은, 천오백만 원에는 팔지 않겠죠.", "whoosh@0.5"],
  ["시장엔 **나쁜 차만** 남고, 값은 1,000만 원", "결국 시장에는 나쁜 차만 남고, 값은 천만 원으로 떨어집니다.", "pop"],
  ["나쁜 차가 좋은 차를 **몰아낸다**", "나쁜 차가 좋은 차를 몰아내는 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: lotWorld(el)};
    c.offer = pill(hud, 270, "사는 사람: 최대 <b>1,500만 원</b>", GOLD, 56);
    c.no = pill(hud, 390, "좋은 차 주인: 안 팔아요", TEAL, 50);
    c.low = pill(hud, 270, "남은 차: <b>1,000만 원</b>", CORAL, 56);
    c.h = kin(hud, 260, "나쁜 차가<br>좋은 차를 **몰아낸다**", 92);
    c.o = host(hud, "owl", {x: 150, y: 1275, s: .6});
    return c;
  },
  cam(lt, L) {const z = ease((lt - L[3]) / 1); return {x: 540, y: 820, s: lerp(1, 1.05, z)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.market(lt, .6, L[1] + .4, L[2] + .3);
    ap(c.offer, lt, 1.6, L[2] - .1, {s: .6, back: true});
    ap(c.no, lt, L[1] + .2, L[2] - .1, {s: .6, back: true});
    ap(c.low, lt, L[2] + .9, L[3] - .1, {s: .6, back: true});
    kinUp(c.h, lt, L[3] + .1);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : lt > L[1] ? "surprised" : "normal", look: [.8, -.5]});
  }
});

/* 4. 해결책과 뒷이야기 (보증·노벨) */
scene({id: "after", lines: [
  ["논문: **보증·브랜드**가 이 문제를 줄인다", "논문은 보증이나 브랜드가 이 문제를 줄이는 장치라고 봤습니다.", "pop"],
  ["처음엔 **거절** → 2001년 **노벨 경제학상**", "이 논문은 처음에 여러 학술지에서 거절당했지만, 이천일 년 노벨 경제학상으로 이어졌어요.", "ding"]],
  build(el, hud) {
    const c = {w: lotWorld(el)};
    c.h = kin(hud, 280, "**보증**·브랜드", 110);
    c.nb = pill(hud, 290, "2001 노벨 경제학상", GOLD, 64);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 850, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    const ts = spr((lt - .7) / .6); imgAt(w.shield, 3240 + 330, 900 - (lt > L[1] ? ease((lt - L[1]) / .5) * 0 : 0), clamp(ts, 0, 1.2) * (1 - P(lt, L[1], .4)), 0); w.shield.style.opacity = clamp(ts * 2) * (1 - P(lt, L[1], .4));
    kinUp(c.h, lt, .3, L[1] - .2);
    const tp = spr((lt - L[1] - .1) / .5); imgAt(w.page, 3240 + 540, 1000, clamp(tp, 0, 1.2) * (1 - P(lt, L[1] + 2.4, .3)), -4); w.page.style.opacity = clamp(tp * 2) * (1 - P(lt, L[1] + 2.4, .3));
    const st = clamp((lt - L[1] - .7) / .2); w.stamp.style.opacity = st * (1 - P(lt, L[1] + 2.4, .3));
    w.stamp.style.transform = `rotate(-12deg) scale(${lerp(1.6, 1, st)})`;
    const tm = spr((lt - L[1] - 2.6) / .6); imgAt(w.medal, 3240 + 540, 1000, clamp(tm, 0, 1.2) * 1.2, 6 * Math.sin(lt * 3)); w.medal.style.opacity = clamp(tm * 2);
    ap(c.nb, lt, L[1] + 2.7, null, {s: .6, back: true});
    c.o.up(lt, {mood: lt > L[1] + 2.6 ? "happy" : lt > L[1] + .7 ? "surprised" : "normal", point: ease((lt - .7) / .5) * (1 - ease((lt - L[1]) / .4)), look: [.8, -.4]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**레몬** 시장〉", "논문 제목은, 레몬 시장입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: lotWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 420);
    c.f = CX(hud, 960, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080);
    w.big.forEach(b => {imgAt(b.car, b.x, 1010, 1, 0); b.car.style.opacity = 1});
    imgAt(w.lemon, 1080 + 790, 840, 1, -12 + 8 * Math.sin(lt * 3)); w.lemon.style.opacity = 1;
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
