/* 시제품 v2 — 001 호텔링의 법칙 앞 네 장면 (그래픽 개선 비교용) */
Object.assign(EP, {no: 1, style: "v2", title: "호텔링의 법칙", bgm: {seed: 11, bpm: 96, mood: "bright"},
  paper: {journal: "The Economic Journal", year: 1929, authors: "Harold Hotelling", title: "Stability in Competition", ko: "경쟁의 안정성"}});

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
    w.A.set(bx(a), 1, 9 * va); w.B.set(bx(b), 1, -9 * vb);
    const bump = 1 + .25 * Math.sin(Math.PI * clamp((lt - L[1]) / .5));
    w.set(a, b, {lt, paint: 1, line: 1, pct: 1, ruler: 1, bumpA: bump});
    const m = (a + b) / 2, tp = spr((lt - L[1] - .2) / .5);
    c.plus.style.left = (bx(m / 2) - 110) + "px"; c.plus.style.opacity = clamp(tp * 2) * (1 - ease((lt - L[2]) / .3));
    c.plus.style.transform = `scale(${clamp(tp, 0, 1.2)})`;
    const tb = spr((lt - L[1] - .4) / .5); imgAt(c.bag, bx(m / 2) + 190, 640, clamp(tb, 0, 1.2), 10 * Math.sin(lt * 4));
    c.bag.style.opacity = clamp(tb * 2) * (1 - ease((lt - L[2]) / .3));
  }
});
