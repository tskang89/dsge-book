/* 진행자 마스코트(SVG, 클레이 스타일). 엔진과 시안 시트가 함께 쓴다.
   const m = mascot(svg부모, "owl"|"pig"|"coin");
   m.set({x, y, s, mood:"normal"|"surprised"|"happy"|"skeptical", talk:0~1, look:[-1~1,-1~1], blink:0~1, point:0~1, bob:0~1, op})
   기준점은 발밑 가운데, 키는 약 300(s=1). */
const MSC_NS = "http://www.w3.org/2000/svg";
let MSC_ID = 0;
function mS(tag, a, p) {const e = document.createElementNS(MSC_NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e}
function mGrad(defs, id, stops, radial, o) {
  const g = mS(radial ? "radialGradient" : "linearGradient", Object.assign({id}, o || (radial ? {cx: .35, cy: .3, r: .8} : {x1: 0, y1: 0, x2: 0, y2: 1})), defs);
  stops.forEach(([of, c]) => mS("stop", {offset: of, "stop-color": c}, g)); return `url(#${id})`;
}
function mascot(parent, kind) {
  kind = kind || "owl";
  const n = ++MSC_ID, root = mS("g", {}, parent), defs = mS("defs", {}, root), m = {kind, root};
  const body = mS("g", {}, root);                 // 숨쉬기·들썩임을 받는 층
  mS("ellipse", {cx: 0, cy: 4, rx: 95, ry: 15, fill: "#000", opacity: .28}, root).parentNode.insertBefore(root.lastChild, body);
  const P = {};
  if (kind === "owl") {
    const gb = mGrad(defs, "ob" + n, [[0, "#c08657"], [.6, "#8a5634"], [1, "#5e3820"]], true);
    const gw = mGrad(defs, "ow" + n, [[0, "#9a6440"], [1, "#5a341c"]], true);
    [[-34], [34]].forEach(([x]) => mS("ellipse", {cx: x, cy: -6, rx: 24, ry: 10, fill: "#f0a23a"}, body));
    P.wl = mS("g", {}, body); mS("ellipse", {cx: -96, cy: -130, rx: 34, ry: 80, fill: gw, transform: "rotate(14 -96 -130)"}, P.wl);
    mS("path", {d: "M-72,-236 L-92,-292 L-40,-252 Z", fill: "#6b4226"}, body);
    mS("path", {d: "M72,-236 L92,-292 L40,-252 Z", fill: "#6b4226"}, body);
    mS("ellipse", {cx: 0, cy: -132, rx: 108, ry: 128, fill: gb}, body);
    mS("ellipse", {cx: -30, cy: -200, rx: 40, ry: 22, fill: "#fff", opacity: .12}, body);   // 하이라이트
    mS("ellipse", {cx: 0, cy: -88, rx: 70, ry: 78, fill: "#f2dcb4"}, body);
    for (let r = 0; r < 3; r++) for (let i = -2; i <= 2; i++) if (!(r === 2 && Math.abs(i) === 2))
      mS("path", {d: `M${i * 24 - 9},${-118 + r * 26} q9,10 18,0`, stroke: "#d6b68a", "stroke-width": 4, fill: "none", "stroke-linecap": "round"}, body);
    P.wr = mS("g", {}, body); mS("ellipse", {cx: 96, cy: -130, rx: 34, ry: 80, fill: gw, transform: "rotate(-14 96 -130)"}, P.wr);
    [-44, 44].forEach(x => mS("circle", {cx: x, cy: -178, r: 50, fill: "#ecd2a6"}, body));
    // 나비넥타이
    mS("path", {d: "M0,-112 L-30,-126 L-30,-98 Z M0,-112 L30,-126 L30,-98 Z", fill: "#f2c14e", stroke: "#c9962a", "stroke-width": 3}, body);
    mS("circle", {cx: 0, cy: -112, r: 7, fill: "#c9962a"}, body);
    P.eyes = [-44, 44].map(x => {
      const g = mS("g", {}, body);
      mS("circle", {cx: x, cy: -178, r: 33, fill: "#fff"}, g);
      const p = mS("g", {}, g); mS("circle", {cx: x, cy: -178, r: 16, fill: "#1d1a26"}, p); mS("circle", {cx: x - 5, cy: -184, r: 5, fill: "#fff"}, p);
      const happy = mS("path", {d: `M${x - 20},-172 q20,-22 40,0`, stroke: "#1d1a26", "stroke-width": 7, fill: "none", "stroke-linecap": "round", opacity: 0}, body);
      return {g, p, x, y: -178, happy};
    });
    [-44, 44].forEach(x => mS("circle", {cx: x, cy: -178, r: 41, fill: "none", stroke: "#f2c14e", "stroke-width": 7}, body));
    mS("path", {d: "M-6,-184 q6,-6 12,0", stroke: "#f2c14e", "stroke-width": 6, fill: "none"}, body);
    P.brows = [-44, 44].map(x => mS("path", {d: `M${x - 26},-232 q26,-12 52,0`, stroke: "#4a2a16", "stroke-width": 8, fill: "none", "stroke-linecap": "round"}, body));
    P.mouth = mS("ellipse", {cx: 0, cy: -140, rx: 13, ry: 0, fill: "#3a1d10"}, body);
    P.beakLo = mS("path", {d: "M-11,-146 L11,-146 L0,-126 Z", fill: "#d9822b"}, body);
    mS("path", {d: "M-16,-160 L16,-160 L0,-136 Z", fill: "#f0a23a"}, body);
    m.eyeY = -178; m.mouthY = -140; m.pointPivot = [96, -190];
  } else if (kind === "pig") {
    const gb = mGrad(defs, "pb" + n, [[0, "#ffc4d4"], [.6, "#f598b2"], [1, "#d96a8c"]], true);
    [[-50], [50]].forEach(([x]) => mS("rect", {x: x - 18, y: -40, width: 36, height: 42, rx: 12, fill: "#d96a8c"}, body));
    mS("path", {d: "M-70,-230 L-96,-286 L-40,-246 Z", fill: "#e98aa6"}, body);
    mS("path", {d: "M70,-230 L96,-286 L40,-246 Z", fill: "#e98aa6"}, body);
    mS("ellipse", {cx: 0, cy: -140, rx: 120, ry: 118, fill: gb}, body);
    mS("rect", {x: -36, y: -258, width: 72, height: 12, rx: 6, fill: "#7a3248"}, body);  // 동전 구멍
    mS("ellipse", {cx: -40, cy: -205, rx: 40, ry: 20, fill: "#fff", opacity: .2}, body);
    P.wl = mS("g", {}, body); P.wr = mS("g", {}, body);
    mS("ellipse", {cx: -108, cy: -120, rx: 24, ry: 44, fill: "#e98aa6"}, P.wl); mS("ellipse", {cx: 108, cy: -120, rx: 24, ry: 44, fill: "#e98aa6"}, P.wr);
    P.eyes = [-42, 42].map(x => {const g = mS("g", {}, body); mS("circle", {cx: x, cy: -180, r: 22, fill: "#fff"}, g);
      const p = mS("g", {}, g); mS("circle", {cx: x, cy: -180, r: 11, fill: "#2a1620"}, p); mS("circle", {cx: x - 4, cy: -184, r: 4, fill: "#fff"}, p);
      const happy = mS("path", {d: `M${x - 14},-176 q14,-16 28,0`, stroke: "#2a1620", "stroke-width": 6, fill: "none", "stroke-linecap": "round", opacity: 0}, body);
      return {g, p, x, y: -180, happy}});
    P.brows = [-42, 42].map(x => mS("path", {d: `M${x - 18},-214 q18,-8 36,0`, stroke: "#9c3f5e", "stroke-width": 6, fill: "none", "stroke-linecap": "round"}, body));
    mS("ellipse", {cx: 0, cy: -132, rx: 44, ry: 30, fill: "#f7a9be", stroke: "#d96a8c", "stroke-width": 4}, body);
    [-14, 14].forEach(x => mS("ellipse", {cx: x, cy: -132, rx: 7, ry: 10, fill: "#9c3f5e"}, body));
    P.mouth = mS("ellipse", {cx: 0, cy: -88, rx: 16, ry: 0, fill: "#7a3248"}, body);
    [-80, 80].forEach(x => mS("ellipse", {cx: x, cy: -132, rx: 18, ry: 11, fill: "#ff7d9e", opacity: .5}, body));
    m.eyeY = -180; m.mouthY = -88; m.pointPivot = [108, -150];
  } else {   // coin
    const gb = mGrad(defs, "cb" + n, [[0, "#fff1a8"], [.55, "#f2c14e"], [1, "#c48a1c"]], true);
    [[-34], [34]].forEach(([x]) => mS("rect", {x: x - 6, y: -60, width: 12, height: 60, rx: 6, fill: "#3a2a12"}, body));
    [[-34], [34]].forEach(([x]) => mS("ellipse", {cx: x, cy: -4, rx: 22, ry: 10, fill: "#3a2a12"}, body));
    mS("circle", {cx: 0, cy: -175, r: 125, fill: "#b37b17"}, body);
    mS("circle", {cx: 0, cy: -180, r: 118, fill: gb}, body);
    mS("circle", {cx: 0, cy: -180, r: 96, fill: "none", stroke: "#d9a32e", "stroke-width": 6}, body);
    mS("ellipse", {cx: -50, cy: -250, rx: 40, ry: 18, fill: "#fff", opacity: .35}, body);
    P.wl = mS("g", {}, body); P.wr = mS("g", {}, body);
    mS("path", {d: "M-118,-150 q-40,10 -50,50", stroke: "#3a2a12", "stroke-width": 12, fill: "none", "stroke-linecap": "round"}, P.wl);
    mS("path", {d: "M118,-150 q40,10 50,50", stroke: "#3a2a12", "stroke-width": 12, fill: "none", "stroke-linecap": "round"}, P.wr);
    P.eyes = [-38, 38].map(x => {const g = mS("g", {}, body); mS("ellipse", {cx: x, cy: -200, rx: 20, ry: 26, fill: "#fff"}, g);
      const p = mS("g", {}, g); mS("circle", {cx: x, cy: -198, r: 11, fill: "#2a1e0a"}, p); mS("circle", {cx: x - 4, cy: -203, r: 4, fill: "#fff"}, p);
      const happy = mS("path", {d: `M${x - 14},-196 q14,-16 28,0`, stroke: "#2a1e0a", "stroke-width": 6, fill: "none", "stroke-linecap": "round", opacity: 0}, body);
      return {g, p, x, y: -200, happy}});
    P.brows = [-38, 38].map(x => mS("path", {d: `M${x - 18},-238 q18,-8 36,0`, stroke: "#7a5210", "stroke-width": 6, fill: "none", "stroke-linecap": "round"}, body));
    P.mouth = mS("ellipse", {cx: 0, cy: -140, rx: 18, ry: 2, fill: "#5a3a0a"}, body);
    mS("text", {x: 0, y: -100, "text-anchor": "middle", "font-size": 40, "font-weight": 800, fill: "#a8741a", "font-family": "Pretendard,sans-serif"}, body).textContent = "$";
    m.eyeY = -200; m.mouthY = -140; m.pointPivot = [118, -150];
  }
  m.P = P;
  m.set = o => {
    o = o || {};
    const s = o.s == null ? 1 : o.s, mood = o.mood || "normal", talk = Math.max(0, Math.min(1, o.talk || 0));
    const lx = (o.look || [0, 0])[0], ly = (o.look || [0, 0])[1], blink = o.blink || 0, bob = o.bob || 0;
    root.setAttribute("transform", `translate(${o.x || 0},${o.y || 0}) scale(${s})`);
    root.setAttribute("opacity", o.op == null ? 1 : o.op);
    const br = 1 + .015 * Math.sin(bob * 2 * Math.PI);
    body.setAttribute("transform", `translate(0,${-6 * Math.abs(Math.sin(bob * Math.PI)) - talk * 4}) scale(${1 / br},${br})`);
    const big = mood === "surprised" ? 1.15 : 1, lid = mood === "skeptical" ? .55 : 1;
    P.eyes.forEach((e, i) => {
      const closed = mood === "happy";
      const sy = closed ? .05 : Math.max(.06, (1 - blink) * lid);
      e.g.setAttribute("transform", `translate(${e.x},${e.y}) scale(${big},${sy * big}) translate(${-e.x},${-e.y})`);
      e.p.setAttribute("transform", `translate(${lx * 9},${ly * 7})`);
      e.happy.setAttribute("opacity", closed ? 1 : 0);
    });
    P.brows.forEach((b, i) => {
      let dy = 0, rot = 0;
      if (mood === "surprised") dy = -14;
      if (mood === "skeptical") {rot = i === 0 ? 12 : -6; dy = i === 0 ? 6 : -10}
      if (mood === "happy") dy = -6;
      const bb = P.eyes[i];
      b.setAttribute("transform", `translate(0,${dy}) rotate(${rot} ${bb.x} ${bb.y - 54})`);
    });
    const open = mood === "surprised" ? Math.max(talk, .6) : talk;
    P.mouth.setAttribute("ry", (kind === "coin" ? 2 : 0) + open * 14);
    if (P.beakLo) P.beakLo.setAttribute("transform", `translate(0,${open * 13})`);
    const pt = o.point || 0, [px, py] = m.pointPivot;
    P.wr.setAttribute("transform", `rotate(${-115 * pt} ${px} ${py})`);
    P.wl.setAttribute("transform", `rotate(${8 * Math.sin(bob * 2 * Math.PI)} ${-px} ${py})`);
  };
  m.set({});
  return m;
}
