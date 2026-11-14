/* 오늘의 경제 001 — 호텔링의 법칙 (v2 스타일: 3D 아이콘·단어 강조 자막·카메라)
   논문: Hotelling, H. (1929) "Stability in Competition", Economic Journal 39(153): 41–57.
   수치 검산: 손님 [0,1] 균등, 가장 가까운 가게로.
   ¼·¾ 배치 → 50:50, 평균 이동 1/8 = 125m, 최대 250m.  A 0.45, B 0.75 → 경계 0.60 → A 60%.
   둘 다 ½ → 50:50, 평균 이동 1/4 = 250m(2배), 최대 500m. */
Object.assign(EP, {no: 1, style: "v2", title: "호텔링의 법칙", hook: "아이스크림 가게는 왜 붙어 있을까?",
  bgm: {seed: 11, bpm: 96, mood: "bright"},
  paper: {journal: "The Economic Journal", year: 1929, authors: "Harold Hotelling", title: "Stability in Competition",
          ko: "경쟁의 안정성", cite: "39(153): 41–57"},
  yt: {title: "아이스크림 가게는 왜 꼭 붙어 있을까? | 호텔링의 법칙 #경제 #shorts",
       desc: "경쟁하는 가게는 가운데로 모이고, 손님은 더 멀리 걷게 된다. 1929년 해럴드 호텔링의 논문이 보여 준 공간 경쟁의 원리.",
       tags: ["경제", "호텔링의법칙", "게임이론", "내시균형", "중위투표자", "shorts"]}});

const BX0 = 90, BX1 = 990, bx = u => lerp(BX0, BX1, u);
const GOLD = "#f2c14e", BLUE = "#5ab0ff";
const PEOPLE = ["person", "woman", "man", "person_light", "person_medium"];

/* 해변 세계: 하늘·해·바다(물결이 흐름)·모래·영역·손님·가게. set(a,b,…)로 상태를 그린다 */
let WID = 0;
function world(el, o) {
  o = o || {};
  const w = {}, g = svgLayer(el), id = k => k + (WID + 1), U = k => `url(#${id(k)})`; WID++;
  const defs = S("defs", {}, g);
  const lg = (k, stops, x2, y2) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: x2 || 0, y2: y2 == null ? 1 : y2}, defs);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#0c1630"], [.55, "#3b3f72"], [.85, "#d9805a"], [1, "#f4b46a"]]);
  lg("sea", [[0, "#2a7fa8"], [1, "#145a80"]]);
  lg("sand", [[0, "#f1d29e"], [.5, "#ddb27a"], [1, "#b8864f"]]);
  lg("shade", [[0, "#0a0e18", 0], [.3, "#0a0e18", .6], [.6, "#0a0e18", .88], [1, "#0a0e18", .95]]);
  S("rect", {x: 0, y: 0, width: W, height: 640, fill: U("sky")}, g);
  w.sunWrap = E("div", "a", null, {left: 0, top: 0, width: W + "px", height: H + "px"}, el);
  w.sun = img(w.sunWrap, "sun", 150, 660, 190);
  const g2 = svgLayer(el);
  S("rect", {x: 0, y: 600, width: W, height: 200, fill: U("sea")}, g2);
  w.waves = [0, 1, 2].map(i => S("path", {stroke: "#bfe6ff", "stroke-width": 4, fill: "none", opacity: .35 - i * .08}, g2));
  S("rect", {x: 0, y: 780, width: W, height: H - 780, fill: U("sand")}, g2);
  w.foam = S("path", {fill: "#f7fbff", opacity: .85}, g2);
  const r = rng(5);
  for (let i = 0; i < 260; i++) S("circle", {cx: r() * W, cy: 800 + r() * 500, r: 1.5 + r() * 2.5, fill: r() < .5 ? "#a77a46" : "#fff3d6", opacity: .35}, g2);
  // 영역(점유율)
  w.tA = S("rect", {y: 790, height: 380, fill: GOLD, opacity: 0}, g2);
  w.tB = S("rect", {y: 790, height: 380, fill: BLUE, opacity: 0}, g2);
  w.rings = [];
  S("rect", {x: 0, y: 1060, width: W, height: H - 1060, fill: U("shade")}, g2);
  // 자(거리)
  w.ruler = S("g", {opacity: 0}, g2);
  S("line", {x1: BX0, y1: 1150, x2: BX1, y2: 1150, stroke: "#fff", "stroke-width": 4, opacity: .8}, w.ruler);
  [[0, "0"], [.5, "500m"], [1, "1km"]].forEach(([u, t]) => {
    S("line", {x1: bx(u), y1: 1136, x2: bx(u), y2: 1164, stroke: "#fff", "stroke-width": 4}, w.ruler);
    ST(w.ruler, bx(u), 1212, t, {"font-size": 38, "font-weight": 700, fill: "#fff"});
  });
  // 손님
  const n = o.n || 22, layer = E("div", "a", null, {left: 0, top: 0, width: W + "px", height: H + "px"}, el);
  w.P = [];
  for (let i = 0; i < n; i++) {
    const u = (i + .5) / n, y = 930 + ((i * 37) % 11) / 10 * 160 + (r() - .5) * 20;
    const rg = S("ellipse", {cx: bx(u), cy: y - 4, rx: 34, ry: 11, fill: "#000", opacity: .25}, g2);
    w.P.push({u, y, d: r(), rg, e: img(layer, PEOPLE[i % PEOPLE.length], bx(u), y, 96)});
  }
  w.P.sort((p, q) => p.y - q.y).forEach(p => layer.appendChild(p.e));
  // 경계선
  const g3 = svgLayer(el);
  w.line = S("line", {y1: 640, y2: 1170, stroke: "#fff", "stroke-width": 5, "stroke-dasharray": "16 12", opacity: 0}, g3);
  w.fx = g3;
  // 가게: 아이스크림 수레(SVG) + 3D 아이스크림 + 글자 배지
  const shop = (L, col) => {
    const s = {}, k = id("cart" + L);
    lg("cart" + L, [[0, "#2b3a5c"], [1, "#16203a"]]);
    s.g = S("g", {}, w.shopSvg);
    S("ellipse", {cx: 0, cy: 6, rx: 120, ry: 18, fill: "#000", opacity: .28}, s.g);
    S("rect", {x: -6, y: -250, width: 12, height: 130, fill: "#d9d2c0"}, s.g);
    const aw = S("g", {}, s.g);   // 줄무늬 차양
    for (let j = 0; j < 6; j++) S("path", {d: `M${-130 + j * 43.3},-250 h43.3 v34 a21.65,21.65 0 0 1 -43.3,0 z`, fill: j % 2 ? "#fff" : col}, aw);
    S("rect", {x: -130, y: -262, width: 260, height: 16, rx: 8, fill: col}, aw);
    S("rect", {x: -105, y: -120, width: 210, height: 100, rx: 18, fill: `url(#${k})`, stroke: col, "stroke-width": 5}, s.g);
    S("rect", {x: -105, y: -86, width: 210, height: 10, fill: col, opacity: .8}, s.g);
    [-62, 62].forEach(x => {S("circle", {cx: x, cy: -14, r: 20, fill: "#222b3f", stroke: "#cfd6e4", "stroke-width": 5}, s.g)});
    const lab = S("text", {x: 0, y: -38, "text-anchor": "middle", "font-size": 46, "font-weight": 800, fill: col}, s.g); lab.textContent = L;
    s.ic = img(w.shopImg, "ice_cream", 0, 0, 120);
    s.set = (x, sc, rot, op) => {
      const y = 1000;
      s.g.setAttribute("transform", `translate(${x},${y}) rotate(${rot || 0}) scale(${sc})`); s.g.setAttribute("opacity", op == null ? 1 : op);
      imgAt(s.ic, x + 40 * sc, y - 112 * sc, sc, rot); s.ic.style.opacity = op == null ? 1 : op};
    return s;
  };
  w.shopSvg = svgLayer(el); w.shopImg = E("div", "a", null, {left: 0, top: 0, width: W + "px", height: H + "px"}, el);
  w.A = shop("A", GOLD); w.B = shop("B", BLUE);
  /* 두 수레를 함께 놓는다. 화면에서 겹치지 않게 최소 간격을 둔다(논리 위치·영역 계산은 a, b 그대로) */
  w.pair = (a, b, sc, ra, rb) => {let xa = bx(a), xb = bx(b); const mn = 205 * sc;
    if (xb - xa < mn) {const m = (xa + xb) / 2; xa = m - mn / 2; xb = m + mn / 2}
    w.A.set(xa, sc, ra || 0); w.B.set(xb, sc, rb || 0); return [xa, xb]};
  w.pA = A(el, 0, 330, "", "", {width: "440px", textAlign: "center", fontSize: "150px", fontWeight: 800, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.35)"});
  w.pB = A(el, 0, 330, "", "", {width: "440px", textAlign: "center", fontSize: "150px", fontWeight: 800, color: BLUE, textShadow: "0 6px 0 rgba(0,0,0,.35)"});
  w.anim = lt => {   // 늘 움직이는 것: 물결, 거품, 해
    w.waves.forEach((p, i) => {const ph = lt * (40 + i * 15) + i * 90, y = 640 + i * 45, pts = [];
      for (let x = -20; x <= W + 20; x += 20) pts.push([x, y + 8 * Math.sin((x + ph) / 70)]); p.setAttribute("d", poly(pts))});
    const pts = []; for (let x = -20; x <= W + 20; x += 20) pts.push([x, 784 + 7 * Math.sin((x - lt * 50) / 55) + 4 * Math.sin(lt * 2)]);
    w.foam.setAttribute("d", poly(pts) + ` L${W + 20},800 L-20,800 Z`);
    imgAt(w.sun, 150, 660 + 5 * Math.sin(lt * .8), 1);
  };
  /* a,b: 가게 위치(0~1, null 이면 숨김). paint: 영역 색 0~1. pct: 퍼센트 표시 0~1 */
  w.set = (a, b, st) => {
    st = st || {};
    const pop = st.pop == null ? 1 : st.pop;
    const m = a != null && b != null ? (a + b) / 2 : null, paint = st.paint || 0;
    w.P.forEach((p, i) => {
      const s = clamp(spr(pop * 1.6 - p.d * .6));
      p.e.style.opacity = clamp(s * 3); p.e.style.transform = `scale(${s}) translateY(${-6 * Math.abs(Math.sin((st.lt || 0) * 3 + i))}px)`;
    });
    w.P.forEach(p => {const rg = p.rg; const col = m == null ? null : (Math.abs(bx(p.u) - bx(a)) <= Math.abs(bx(p.u) - bx(b)) ? GOLD : BLUE);
      rg.setAttribute("fill", col && paint > 0 ? col : "#000"); rg.setAttribute("opacity", col && paint > 0 ? .9 * paint : .25 * pop)});
    if (m != null) {
      w.tA.setAttribute("x", 0); w.tA.setAttribute("width", bx(m)); w.tA.setAttribute("opacity", .28 * paint);
      w.tB.setAttribute("x", bx(m)); w.tB.setAttribute("width", W - bx(m)); w.tB.setAttribute("opacity", .28 * paint);
      w.line.setAttribute("x1", bx(m)); w.line.setAttribute("x2", bx(m)); w.line.setAttribute("opacity", st.line || 0);
      const sh = Math.round(m * 100), pc = st.pct || 0;
      w.pA.textContent = sh + "%"; w.pB.textContent = (100 - sh) + "%";
      w.pA.style.left = (bx(m / 2) - 220) + "px"; w.pB.style.left = (bx((1 + m) / 2) - 220) + "px";
      [w.pA, w.pB].forEach((e, k) => {const u = clamp(spr(pc * 1.4 - k * .25), 0, 1.15); e.style.opacity = clamp(u * 2);
        e.style.transform = `scale(${lerp(.4, 1, u) * (k === 0 ? st.bumpA || 1 : 1)})`});
    } else {[w.tA, w.tB, w.line].forEach(e => e.setAttribute("opacity", 0)); w.pA.style.opacity = w.pB.style.opacity = 0}
    w.ruler.setAttribute("opacity", st.ruler || 0);
  };
  return w;
}

/* 1. 질문 */
scene({id: "hook", lines: [
  ["아이스크림 가게는 왜 **꼭 붙어** 있을까?", "아이스크림 가게는 왜 꼭 붙어 있을까요?", "pop"],
  ["답은 **1929년**의 한 논문에", "답은 천구백이십구 년의 한 논문에 있습니다."]],
  build(el, hud) {
    const c = {w: world(el, {n: 22})};
    c.h = kin(hud, 170, "아이스크림 가게는<br>왜 꼭 **붙어** 있을까?", 92);
    c.think = img(hud, "thinking", 300, 600, 170);
    c.paper = img(hud, "page", 540, 600, 200);
    c.yr = CX(hud, 170, "1929", "", {fontSize: "170px", fontWeight: 800, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.35)"});
    return c;
  },
  cam(lt) {return {x: 540, y: 1000, s: lerp(1.3, 1.02, ease(lt / 2.2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.set(.37, .63, {pop: 1, lt});
    w.A.set(bx(.37), spr(lt / .6), 0); w.B.set(bx(.63), spr((lt - .15) / .6), 0);
    kinUp(c.h, lt, .1, L[1] - .2);
    const t1 = spr((lt - .9) / .5); imgAt(c.think, 820, 640, clamp(t1, 0, 1.2), 8 * Math.sin(lt * 3)); c.think.style.opacity = clamp(t1 * 2) * (1 - ease((lt - L[1] + .2) / .3));
    const t2 = spr((lt - L[1]) / .6); imgAt(c.paper, 540, 640, clamp(t2, 0, 1.2), -6 + 6 * clamp(t2)); c.paper.style.opacity = clamp(t2 * 2);
    ap(c.yr, lt, L[1] + .3, null, {s: .5, back: true});
  }
});

/* 2. 설정 */
scene({id: "setup", lines: [
  ["**1km** 해변에 손님이 고르게", "일 킬로미터 해변에 손님이 고르게 있고,"],
  ["손님은 **가장 가까운** 가게로", "손님은 가장 가까운 가게로 갑니다."]],
  build(el) {
    const c = {w: world(el)};
    c.arrow = S("path", {d: `M${bx(.6)},1050 Q${bx(.66)},930 ${bx(.75) - 110},960`, stroke: "#fff", "stroke-width": 7, fill: "none", "stroke-linecap": "round"}, c.w.fx);
    c.head = S("path", {d: `M${bx(.75) - 110},960 l-32,-6 l12,28 z`, fill: "#fff"}, c.w.fx);
    return c;
  },
  cam(lt, L) {const u = ease((lt - L[1]) / 1); return {x: lerp(540, bx(.7), u), y: 1000, s: lerp(1, 1.22, u)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.set(null, null, {pop: clamp(lt / 1.4), lt, ruler: P(lt, .8)});
    w.A.set(0, 0, 0, 0); w.B.set(bx(.75), spr((lt - L[1]) / .6), 0);
    draw(c.arrow, P(lt, L[1] + .5, .8)); c.head.setAttribute("opacity", P(lt, L[1] + 1.2, .2));
  }
});

/* 3. 손님에게 가장 좋은 배치 */
scene({id: "best", lines: [
  ["가게가 **¼ · ¾ 지점**에 있으면", "가게가 사분의 일, 사분의 삼 지점에 있으면,", "pop"],
  ["손님은 **반반**, 아무도 250m 넘게 안 걷는다", "손님은 반반, 아무도 이백오십 미터 넘게 안 걷죠."],
  ["손님에겐 **최고의** 배치", "손님에겐 최고의 배치입니다.", "ding"]],
  build(el, hud) {
    const c = {w: world(el)};
    c.br = S("g", {opacity: 0}, c.w.fx);
    S("path", {d: `M${bx(.25)},1080 L${bx(.25)},1100 L${bx(.5)},1100 L${bx(.5)},1080`, stroke: GOLD, "stroke-width": 6, fill: "none"}, c.br);
    ST(c.br, bx(.375), 1076, "최대 250m", {"font-size": 40, "font-weight": 800, fill: "#fff"});
    c.crown = img(hud, "crown", 540, 330, 190);
    return c;
  },
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    const d = u => clamp(spr(u), 0, 1.2);
    w.A.set(bx(.25), d(lt / .6), 0); w.B.set(bx(.75), d((lt - .2) / .6), 0);
    w.set(.25, .75, {lt, paint: P(lt, L[1], .6), line: P(lt, L[1] + .2), pct: clamp((lt - L[1] - .2) / 1.2), ruler: 1});
    c.br.setAttribute("opacity", P(lt, L[1] + 1.6) * (1 - P(lt, L[2], .4)));
    const t = spr((lt - L[2] - .1) / .6); imgAt(c.crown, 540, 330, clamp(t, 0, 1.2), 0); c.crown.style.opacity = clamp(t * 2);
    w.pA.style.visibility = w.pB.style.visibility = lt > L[2] ? "hidden" : "visible";
  }
});

/* 4. A 의 배신 */
scene({id: "move", lines: [
  ["그런데 A가 **가운데로** 오면?", "그런데 에이 가게가 가운데로 오면?", "whoosh@0.6"],
  ["경계가 밀려 A의 손님이 **60%**", "경계가 밀려서, 손님 육십 퍼센트를 가져갑니다.", "coin"],
  ["B도 **질세라** 가운데로", "비 가게도 질세라 가운데로 옵니다.", "whoosh@0.5"]],
  build(el) {
    const c = {w: world(el)};
    c.plus = A(el, 0, 505, "+10%p", "", {fontSize: "64px", fontWeight: 800, color: "#10182a", background: GOLD, padding: "6px 24px", borderRadius: "40px"});
    c.bag = img(el, "money_bag", 0, 0, 130);
    return c;
  },
  cam(lt, L) {const z = ease((lt - .4) / 1.2) * (1 - ease((lt - L[2]) / 1)); return {x: bx(.55), y: 900, s: lerp(1, 1.12, z)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    const ua = ease((lt - .5) / 1.1), ub = ease((lt - L[2] - .4) / 1.1);
    const a = lerp(.25, .45, ua), b = lerp(.75, .55, ub);
    const va = Math.sin(Math.PI * clamp((lt - .5) / 1.1)), vb = Math.sin(Math.PI * clamp((lt - L[2] - .4) / 1.1));
    w.pair(a, b, 1, 9 * va, -9 * vb);
    const bump = 1 + .25 * Math.sin(Math.PI * clamp((lt - L[1]) / .5));
    w.set(a, b, {lt, paint: 1, line: 1, pct: 1, ruler: 1, bumpA: bump});
    const m = (a + b) / 2, tp = spr((lt - L[1] - .2) / .5);
    c.plus.style.left = (bx(m / 2) - 110) + "px"; c.plus.style.opacity = clamp(tp * 2) * (1 - ease((lt - L[2]) / .3));
    c.plus.style.transform = `scale(${clamp(tp, 0, 1.2)})`;
    const tb = spr((lt - L[1] - .4) / .5); imgAt(c.bag, bx(m / 2) + 190, 640, clamp(tb, 0, 1.2), 10 * Math.sin(lt * 4));
    c.bag.style.opacity = clamp(tb * 2) * (1 - ease((lt - L[2]) / .3));
  }
});

/* 어두운 무대(해변이 아닌 장면): 남색 그라데이션 + 위쪽 빛 */
function stageBg(el) {
  const g = svgLayer(el), id = "bg" + (++WID), d = S("defs", {}, g);
  const r = S("radialGradient", {id, cx: .5, cy: .28, r: .8}, d);
  [[0, "#2c3a6b"], [.55, "#141d36"], [1, "#0a0f1c"]].forEach(([o, c]) => S("stop", {offset: o, "stop-color": c}, r));
  S("rect", {x: 0, y: 0, width: W, height: H, fill: `url(#${id})`}, g);
  return g;
}

/* 5. 결국 한가운데 */
scene({id: "nash", lines: [
  ["밀고 당기다 결국 둘 다 **한가운데**", "그렇게 밀고 당기다, 결국 둘 다 한가운데로."],
  ["아무도 옮길 이유가 없다 = **내시 균형**", "누구도 움직일 이유가 없는, 내시 균형입니다.", "ding"]],
  build(el, hud) {
    const c = {w: world(el)};
    c.h = kin(hud, 170, "**내시 균형**", 120);
    c.sub = CX(hud, 330, "누구도 혼자 옮겨서 더 얻을 게 없는 상태", "", {fontSize: "40px", fontWeight: 700, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.hs = img(hud, "handshake", 540, 640, 200);
    return c;
  },
  cam(lt, L) {return {x: 540, y: 950, s: lerp(1, 1.15, ease(lt / (L[1] + .5)))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    // 번갈아 한 발씩: A .45→.47, B .55→.53, A→.48, B→.52 (가운데로 수렴)
    const st = [[.45, .55], [.47, .55], [.47, .53], [.485, .53], [.485, .515]];
    const k = clamp(lt / (L[1] - .2) * (st.length - 1), 0, st.length - 1), i = Math.min(st.length - 2, Math.floor(k)), f = ease(k - i);
    const a = lerp(st[i][0], st[i + 1][0], f), b = lerp(st[i][1], st[i + 1][1], f), sc = lerp(1, .78, ease(lt / 1.5));
    const wig = Math.sin(Math.PI * (k - i)) * (k < st.length - 1 ? 7 : 0);
    w.pair(a, b, sc, i % 2 ? 0 : wig, i % 2 ? -wig : 0);
    w.set(a, b, {lt, paint: 1, line: 1, pct: 1 - ease((lt - L[1] + .3) / .4), ruler: 1});
    kinUp(c.h, lt, L[1], null, .1); ap(c.sub, lt, L[1] + .5);
    const t = spr((lt - L[1] - .3) / .6); imgAt(c.hs, 540, 640, clamp(t, 0, 1.2), 0); c.hs.style.opacity = clamp(t * 2);
  }
});

/* 6. 결과: 점유율은 같고, 걷는 거리는 두 배 */
scene({id: "cost", lines: [
  ["점유율은 그대로 **50 : 50**", "점유율은 여전히 반반인데,"],
  ["손님이 걷는 평균 거리는 **2배**", "손님이 걷는 평균 거리는 두 배가 됐습니다.", "coin"]],
  build(el, hud) {
    const c = {w: world(el)};
    c.paths = c.w.P.map(p => S("line", {x1: bx(p.u), y1: p.y - 8, x2: 540 + (p.u < .5 ? -80 : 80), y2: 990, stroke: "#fff",
      "stroke-width": 4, "stroke-dasharray": "4 10", "stroke-linecap": "round", opacity: 0}, c.w.fx));
    c.card = A(hud, 70, 140, "", "", {width: "940px", padding: "30px 40px", borderRadius: "28px", background: "rgba(10,15,28,.78)",
      border: "2px solid rgba(255,255,255,.12)", boxShadow: "0 20px 50px rgba(0,0,0,.4)"});
    c.card.innerHTML = `<div style="font-size:38px;font-weight:700;color:#cfd6e4;margin-bottom:22px">손님 평균 이동거리</div>
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:18px"><div style="width:190px;font-size:36px;font-weight:700">¼·¾ 배치</div>
        <div class="b1" style="height:58px;border-radius:14px;background:#6fcfb7;width:0"></div><div class="t1" style="font-size:46px;font-weight:800;color:#6fcfb7">125m</div></div>
      <div style="display:flex;align-items:center;gap:20px"><div style="width:190px;font-size:36px;font-weight:700">한가운데</div>
        <div class="b2" style="height:58px;border-radius:14px;background:#ff8a65;width:0"></div><div class="t2" style="font-size:46px;font-weight:800;color:#ff8a65">250m</div></div>`;
    c.x2 = A(hud, 820, 120, "×2", "", {fontSize: "110px", fontWeight: 800, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    return c;
  },
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.pair(.485, .515, .78);
    w.set(.485, .515, {lt, paint: 1, line: 1, pct: 1 - P(lt, L[1] - .3, .4), ruler: 1});
    c.paths.forEach((p, i) => p.setAttribute("opacity", .75 * P(lt, L[1] + i * .03, .4)));
    ap(c.card, lt, L[1] + .2, null, {s: .9});
    c.card.querySelector(".b1").style.width = 200 * ease((lt - L[1] - .5) / .6) + "px";
    c.card.querySelector(".b2").style.width = 400 * ease((lt - L[1] - .9) / .8) + "px";
    c.card.querySelector(".t1").style.opacity = P(lt, L[1] + 1, .3); c.card.querySelector(".t2").style.opacity = P(lt, L[1] + 1.6, .3);
    ap(c.x2, lt, L[1] + 1.9, null, {s: .3, back: true, d: .5});
  }
});

/* 7. 현실에서: 상권과 선거 */
scene({id: "real", lines: [
  ["카페·주유소가 **한곳에** 몰리는 이유", "카페와 주유소가 한곳에 몰리는 이유,", "pop"],
  ["선거 공약이 **중도로** 닮아 가는 이유", "선거 공약이 중도로 닮아 가는 이유도 같아요.", "pop"]],
  build(el, hud) {
    const c = {}; stageBg(el);
    const g = svgLayer(el);
    // 위: 거리
    c.top = S("g", {}, g);
    S("rect", {x: 60, y: 640, width: 960, height: 26, rx: 13, fill: "#3a4769"}, c.top);
    ST(c.top, 540, 360, "같은 거리, 같은 블록", {"font-size": 44, "font-weight": 800, fill: "#cfd6e4"});
    for (let x = 90; x < 1000; x += 70) S("rect", {x, y: 649, width: 36, height: 8, rx: 4, fill: "#d9d2c0", opacity: .7}, c.top);
    c.stores = ["coffee", "fuel", "coffee", "fuel", "coffee"].map((n, i) => ({n, x0: [130, 330, 540, 750, 950][i], x1: [290, 415, 540, 665, 790][i],
      e: img(el, n, 0, 0, 150)}));
    // 아래: 유권자 분포
    c.bot = S("g", {}, g);
    const x0 = 90, x1 = 990, y0 = 1180, pts = [];
    for (let i = 0; i <= 120; i++) {const u = i / 120, z = (u - .5) / .17; pts.push([lerp(x0, x1, u), y0 - 330 * Math.exp(-z * z / 2)])}
    const dg = S("defs", {}, g), lgid = "vt" + (++WID), l = S("linearGradient", {id: lgid, x1: 0, y1: 0, x2: 0, y2: 1}, dg);
    [[0, BLUE, .55], [1, BLUE, .05]].forEach(([o, col, op]) => S("stop", {offset: o, "stop-color": col, "stop-opacity": op}, l));
    S("path", {d: poly(pts) + ` L${x1},${y0} L${x0},${y0} Z`, fill: `url(#${lgid})`}, c.bot);
    S("path", {d: poly(pts), stroke: "#9fd0ff", "stroke-width": 6, fill: "none"}, c.bot);
    S("line", {x1: x0, y1: y0, x2: x1, y2: y0, stroke: "#fff", "stroke-width": 4, opacity: .7}, c.bot);
    ST(c.bot, x0, y0 + 60, "진보", {"font-size": 42, "font-weight": 700, fill: "#fff", "text-anchor": "start"});
    ST(c.bot, x1, y0 + 60, "보수", {"font-size": 42, "font-weight": 700, fill: "#fff", "text-anchor": "end"});
    ST(c.bot, 540, 830, "중위 투표자", {"font-size": 42, "font-weight": 800, fill: GOLD});
    c.p1 = A(el, 0, y0 - 150, "갑", "", {width: "110px", height: "110px", borderRadius: "50%", background: "#ff8a65", color: "#10182a",
      fontSize: "54px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(0,0,0,.4)"});
    c.p2 = A(el, 0, y0 - 150, "을", "", {width: "110px", height: "110px", borderRadius: "50%", background: BLUE, color: "#10182a",
      fontSize: "54px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(0,0,0,.4)"});
    c.x0 = x0; c.x1 = x1;
    return c;
  },
  update(c, lt, L) {
    sap(c.top, lt, 0);
    const u = ease((lt - .6) / 1.4);
    c.stores.forEach((s, i) => {const t = spr((lt - .1 - i * .1) / .5); imgAt(s.e, lerp(s.x0, s.x1, u), 640, clamp(t, 0, 1.2), 6 * Math.sin(lt * 3 + i));
      s.e.style.opacity = clamp(t * 2)});
    sap(c.bot, lt, L[1] - .1);
    const v = ease((lt - L[1] - .4) / 1.6), tp = clamp(spr((lt - L[1]) / .5), 0, 1.2);
    c.p1.style.left = (lerp(lerp(c.x0, c.x1, .18), 540 - 60, v) - 55) + "px"; c.p2.style.left = (lerp(lerp(c.x0, c.x1, .82), 540 + 60, v) - 55) + "px";
    [c.p1, c.p2].forEach(e => {e.style.opacity = clamp(tp * 2); e.style.transform = `scale(${tp})`});
  }
});

/* 8. 마무리: 논문 카드 */
scene({id: "outro", tail: 1.2, lines: [
  ["**호텔링의 법칙**", "이것이 호텔링의 법칙입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {}; stageBg(el);
    c.ic = img(el, "ice_cream", 540, 470, 230);
    c.h = kin(hud, 520, "호텔링의 법칙", 112);
    c.p = paperCard(hud, 720);
    c.f = CX(hud, 1130, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: lerp(1.06, 1, ease(lt / 3))}},
  update(c, lt, L) {
    const t = spr(lt / .6); imgAt(c.ic, 540, 470, clamp(t, 0, 1.2), 6 * Math.sin(lt * 2)); c.ic.style.opacity = clamp(t * 2);
    kinUp(c.h, lt, .2); ap(c.p, lt, .7, null, {s: .92});
    ap(c.f, lt, L[1], null, {s: .7, back: true});
  }
});
