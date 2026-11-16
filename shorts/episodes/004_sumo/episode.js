/* 오늘의 경제 004 — 스모 승부 조작을 통계로 (v3: 부엉이 진행자·한 공간 카메라 이동·승패 별)
   논문: Duggan, M. & Levitt, S. D. (2002) "Winning Isn't Everything: Corruption in Sumo Wrestling",
         American Economic Review 92(5): 1594–1605. doi:10.1257/000282802762024665 (NBER WP 7798, 2000)
   확인(2026-11-14):
   - 초록(AEA·RePEc·NBER): 승패 갈림길(7승 7패)에 선 선수가 지나치게 많이 이긴다 / 노력 증가로는 설명되지 않는다 /
     갈림길에서 이긴 선수는 다음에 그 상대를 만나면 예상보다 자주 진다 / 언론 감시가 심해진 시기엔 승부 조작이 사라진다
   - 수치: 마지막 날 7승 7패 vs 8승 6패 — 과거 맞대결로 본 예상 승률 48.7%, 실제 약 80%(79.6%),
     다음 맞대결에서 옛 7승 7패 선수의 승률 약 40% — 논문 표를 공저자 레빗이 『괴짜 경제학』(2005)에 옮긴 값, 2차 자료로 일치 확인.
     (이 세션은 논문 PDF 호스트가 막혀 원문 표를 직접 열지 못함 → 설명란에 밝힘)
   - 2011년 일본 스모협회가 승부 조작을 인정하고 3월(봄) 대회를 취소(공개 보도)
   - 스모 정규 대회: 15번 겨룸, 8승 이상(가치코시)이면 대체로 순위 상승, 7승 이하면 하락
   화면: 10번 중 이긴 횟수로 보인다. 48.7% ≈ 10번 중 4.9번(마지막 한 칸은 87% 칠함), 80% = 8번, 40% = 4번. */
Object.assign(EP, {no: 4, style: "v2", title: "스모 승부 조작을 통계로", hook: "스모 승부 조작을 통계로 잡아낼 수 있을까?",
  bgm: {seed: 57, bpm: 92, mood: "tense"},
  paper: {journal: "American Economic Review", year: 2002, authors: "Mark Duggan & Steven D. Levitt",
          title: "Winning Isn't Everything: Corruption in Sumo Wrestling", ko: "이기는 게 전부는 아니다: 스모의 부정",
          cite: "92(5): 1594–1605", url: "https://doi.org/10.1257/000282802762024665"},
  yt: {title: "스모 승부 조작, 통계로 잡아냈다 | 이기는 게 전부는 아니다 #경제 #shorts",
       desc: "스모는 15번 겨뤄 8번 이상 이기면 대체로 순위가 오른다. 마지막 날 7승 7패 선수가 이미 8승을 채운 선수를 만나면, 과거 맞대결로 본 이길 확률은 약 49%인데 실제로는 약 80%를 이겼다. 두 선수가 다음에 다시 만나면 지난번 7승 7패였던 선수의 승률은 약 40%로 떨어졌다. 연구진은 승리를 주고받은 흔적으로 해석했고, 언론 감시가 심했던 시기에는 이런 승률이 사라졌다. 2011년에는 실제 승부 조작이 드러나 대회가 취소됐다. (수치 48.7%·79.6%·약 40%는 논문 표를 옮긴 『괴짜 경제학』 기준)",
       tags: ["경제", "스모", "승부조작", "괴짜경제학", "레빗", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 씨름판 | 1080 순위표 | 2160 승률 판 | 3240 언론
let WID = 0;

/* 진흙 인형 같은 스모 선수(SVG). 기준점은 발밑 가운데, 높이 약 300 */
function wrestler(par, col, flip) {
  const g = S("g", {}, par), b = S("g", {transform: flip ? "scale(-1,1)" : ""}, g);
  S("ellipse", {cx: 0, cy: 4, rx: 120, ry: 18, fill: "#000", opacity: .25}, b);
  [-50, 50].forEach(x => S("rect", {x: x - 30, y: -90, width: 60, height: 90, rx: 26, fill: "#f0c9a0"}, b));
  S("ellipse", {cx: 0, cy: -150, rx: 110, ry: 105, fill: "#f3cfa8"}, b);
  S("ellipse", {cx: 18, cy: -138, rx: 70, ry: 70, fill: "#f7dcbf", opacity: .7}, b);
  S("path", {d: "M-108,-128 Q0,-90 108,-128 L104,-86 Q0,-60 -104,-86 Z", fill: col}, b);
  S("rect", {x: -18, y: -100, width: 36, height: 70, rx: 8, fill: col}, b);
  S("ellipse", {cx: -110, cy: -190, rx: 30, ry: 52, fill: "#f0c9a0", transform: "rotate(25 -110 -190)"}, b);
  S("ellipse", {cx: 104, cy: -196, rx: 30, ry: 52, fill: "#f0c9a0", transform: "rotate(-25 104 -196)"}, b);
  S("circle", {cx: 0, cy: -282, r: 54, fill: "#f3cfa8"}, b);
  S("path", {d: "M-54,-292 Q-50,-346 0,-344 Q50,-346 54,-292 Q30,-318 0,-316 Q-30,-318 -54,-292 Z", fill: "#1d1b26"}, b);
  S("ellipse", {cx: 0, cy: -350, rx: 26, ry: 14, fill: "#1d1b26"}, b);
  S("circle", {cx: 22, cy: -284, r: 6, fill: "#1d1b26"}, b); S("circle", {cx: -8, cy: -284, r: 6, fill: "#1d1b26"}, b);
  S("path", {d: "M-4,-262 Q10,-254 24,-262", stroke: "#8a4b3a", "stroke-width": 5, fill: "none", "stroke-linecap": "round"}, b);
  return g;
}

/* ---- 넓은 스모 경기장 세계 ---- */
function arena(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1a1424"], [1, "#3a2433"]]); lg("floor", [[0, "#4a2c22"], [1, "#1c120e"]]);
  lg("clay", [[0, "#e2b98a"], [1, "#a8784c"]]); lg("clayS", [[0, "#8a5f3a"], [1, "#5a3a22"]]);
  lg("roof", [[0, "#5b3a2a"], [1, "#2e1d16"]]); lg("spot", [[0, "#ffe9b8", .45], [1, "#ffe9b8", 0]]);
  lg("wood", [[0, "#e9d3a8"], [1, "#c8ab78"]]); lg("paper", [[0, "#fbf8f1"], [1, "#e6dfcf"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("wall")}, g);
  // 관중석 불빛
  const r0 = rng(n * 5 + 2);
  for (let i = 0; i < 260; i++) S("circle", {cx: r0() * WW, cy: 560 + r0() * 330, r: 3 + r0() * 6, fill: ["#ffcf8a", "#ff8a65", "#fff1cc"][i % 3], opacity: .18 + r0() * .25}, g);
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("floor")}, g);
  // 씨름판(0 구역): 지붕, 술, 흙 단, 둥근 경계
  S("path", {d: "M90,220 L540,110 L990,220 L930,250 L150,250 Z", fill: U("roof")}, g);
  S("rect", {x: 150, y: 250, width: 780, height: 26, fill: "#7a2a2a"}, g);
  [[170, "#3d6fd8"], [910, "#e8e8e8"]].forEach(([x, c]) => {S("rect", {x: x - 10, y: 276, width: 20, height: 180, fill: c}, g); S("circle", {cx: x, cy: 470, r: 26, fill: c}, g)});
  w.spot = S("path", {d: "M300,276 L780,276 L1040,1150 L40,1150 Z", fill: U("spot")}, g);
  S("path", {d: "M40,1000 L1040,1000 L1000,1200 L80,1200 Z", fill: U("clayS")}, g);
  S("path", {d: "M120,900 L960,900 L1040,1000 L40,1000 Z", fill: U("clay")}, g);
  S("ellipse", {cx: 540, cy: 950, rx: 380, ry: 42, fill: "none", stroke: "#f6e7c8", "stroke-width": 12}, g);
  S("line", {x1: 480, y1: 945, x2: 480, y2: 958, stroke: "#fff", "stroke-width": 6}, g); S("line", {x1: 600, y1: 945, x2: 600, y2: 958, stroke: "#fff", "stroke-width": 6}, g);
  w.wA = wrestler(g, BLUE, false); w.wB = wrestler(g, CORAL, true);
  // 순위표(1080 구역): 나무판 계단
  const bx = 1080 + 140;
  S("rect", {x: bx, y: 380, width: 800, height: 660, rx: 18, fill: U("wood"), stroke: "#7a5a32", "stroke-width": 10}, g);
  ST(g, 1080 + 540, 450, "순위표", {"font-size": 56, "font-weight": 800, fill: "#3a2416"});
  w.rows = [];
  for (let k = 0; k < 4; k++) {const y = 500 + k * 112;
    S("rect", {x: bx + 40, y, width: 720, height: 92, rx: 10, fill: k % 2 ? "#f3e4c4" : "#ead7af"}, g);
    ST(g, bx + 120, y + 62, ["1", "2", "3", "4", "5"][k], {"font-size": 40, "font-weight": 800, fill: "#7a5a32"});
    w.rows.push(y + 46)}
  w.tok = S("g", {}, g);
  S("circle", {cx: 0, cy: 0, r: 40, fill: BLUE, stroke: "#fff", "stroke-width": 6}, w.tok);
  ST(w.tok, 0, 14, "나", {"font-size": 36, "font-weight": 800, fill: "#fff"});
  w.arrow = ST(g, 0, 0, "", {"font-size": 72, "font-weight": 800});
  // 15번 승패 별(○ 이김, ● 짐) — 순위표 아래
  w.stars = [];
  for (let i = 0; i < 15; i++) {const x = 1080 + 220 + i * 46, y = 975;
    const s = S("g", {opacity: 0}, g); const c = S("circle", {cx: x, cy: y, r: 20, "stroke-width": 5}, s); w.stars.push({s, c})}
  // 승률 판(2160 구역): 위 · 아래 두 줄, 10칸씩
  const px = 2160 + 120;
  S("rect", {x: px - 30, y: 420, width: 900, height: 700, rx: 30, fill: "#000", opacity: .3, transform: "translate(10,14)"}, g);
  S("rect", {x: px - 30, y: 420, width: 900, height: 700, rx: 30, fill: "#241a2c", stroke: "#5a4060", "stroke-width": 6}, g);
  w.slots = [0, 1].map(row => {const y = 600 + row * 300, cp = [];
    for (let i = 0; i < 10; i++) {const x = px + 40 + i * 82;
      const bg = S("circle", {cx: x, cy: y, r: 32, fill: "#3a2c44"}, g);
      const clip = S("clipPath", {id: id(`c${row}_${i}`)}, d); const cr = S("rect", {x: x - 32, y: y - 32, width: 0, height: 64}, clip);
      const f = S("circle", {cx: x, cy: y, r: 32, fill: row ? GOLD : TEAL, "clip-path": U(`c${row}_${i}`)}, g);
      cp.push({cr, x, f})}
    return cp});
  w.lab = [0, 1].map(row => ST(g, px + 410, 530 + row * 300, "", {"font-size": 46, "font-weight": 800, fill: row ? GOLD : TEAL}));
  // 언론(3240 구역)
  w.press = [3240 + 260, 3240 + 820].map(x => img(w.layer, "camera_with_flash", x, 760, 200));
  w.flash = S("rect", {x: 3240, y: 0, width: 1080, height: H, fill: "#fff", opacity: 0}, g);
  w.news = S("g", {opacity: 0}, g);
  S("rect", {x: 3240 + 150, y: 820, width: 780, height: 300, rx: 10, fill: U("paper"), stroke: "#b8ad96", "stroke-width": 4}, w.news);
  ST(w.news, 3240 + 540, 900, "2011 · 스모 대회 취소", {"font-size": 58, "font-weight": 800, fill: "#2b2b2b"});
  S("line", {x1: 3240 + 190, y1: 930, x2: 3240 + 890, y2: 930, stroke: "#2b2b2b", "stroke-width": 4}, w.news);
  ST(w.news, 3240 + 540, 1010, "승부 조작 드러나", {"font-size": 54, "font-weight": 800, fill: RED});
  for (let k = 0; k < 2; k++) S("rect", {x: 3240 + 220 + k * 330, y: 1040, width: 300, height: 14, rx: 7, fill: "#c9c2b0"}, w.news);
  // 앞쪽(흐린) 등불: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 320, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("line", {x1: x, y1: 0, x2: x, y2: 90, stroke: "#120c12", "stroke-width": 8}, fs);
    S("ellipse", {cx: x, cy: 160, rx: 64, ry: 84, fill: "#d9472f", opacity: .9}, fs);
    S("ellipse", {cx: x, cy: 160, rx: 40, ry: 64, fill: "#ffb36b", opacity: .6}, fs)});
  const r = rng(n * 13 + 1);
  w.dust = Array.from({length: 50}, () => ({x: r() * WW, y: 150 + r() * 750, s: .5 + r(), e: S("circle", {r: 2 + r() * 3, fill: "#ffe6cc", opacity: .45}, g)}));
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {
    w.spot.setAttribute("opacity", .8 + .2 * Math.sin(lt * 1.3));
    w.dust.forEach((p, i) => {p.e.setAttribute("cx", (p.x + lt * 14 * p.s) % WW); p.e.setAttribute("cy", p.y + 20 * Math.sin(lt * .7 * p.s + i))});
  };
  // 두 선수: push 0~1 은 맞붙기, sh 는 들썩임
  w.fight = (lt, push, win) => {
    const sh = 6 * Math.sin(lt * 9), gap = lerp(170, 95, push), lean = lerp(0, 10, push);
    const wx = win == null ? 0 : win * 120;
    w.wA.setAttribute("transform", `translate(${540 - gap + wx},${950 + sh * .3}) rotate(${lean})`);
    w.wB.setAttribute("transform", `translate(${540 + gap + wx},${950 - sh * .3}) rotate(${-lean})`);
  };
  // 순위표: 나 토큰 위치(0~4, 소수)와 화살표
  w.rank = (pos, arrow, col) => {
    const y = lerp(w.rows[0], w.rows[3], pos / 3); w.tok.setAttribute("transform", `translate(${1080 + 600},${y})`);
    w.arrow.textContent = arrow || ""; w.arrow.setAttribute("x", 1080 + 720); w.arrow.setAttribute("y", y + 24); w.arrow.setAttribute("fill", col || GOLD);
  };
  // 승패 별: rec 문자열('o' 이김, 'x' 짐, '?' 남음), 보이는 개수
  w.rec = (rec, nShow) => w.stars.forEach((st, i) => {
    st.s.setAttribute("opacity", i < nShow ? 1 : 0);
    const ch = rec[i] || "?";
    st.c.setAttribute("fill", ch === "o" ? "#fbf8f1" : ch === "x" ? "#1d1b26" : "none");
    st.c.setAttribute("stroke", ch === "?" ? GOLD : "#7a5a32"); st.c.setAttribute("stroke-dasharray", ch === "?" ? "8 6" : "")});
  // 승률 칸: row 줄을 v(0~10)만큼 칠함, t0 에 시작
  w.fill = (lt, row, v, t0, dd) => w.slots[row].forEach((s, i) => {
    const u = clamp((lt - t0 - i * (dd || .12)) / .3), f = clamp(v - i) * u;
    s.cr.setAttribute("width", 64 * f)});
  w.fight(0, 0); w.rank(2); w.rec("", 0);
  [0, 1].forEach(r => w.fill(-99, r, 0, 0));
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
const REC7 = "ooxoxxoxoxoxox", REC8 = "oxooxoxooxoxxo"; // 7승 7패 / 8승 6패 (14번)

/* 1. 질문 (씨름판) */
scene({id: "hook", lines: [
  ["스모 승부 조작을 **숫자만**_보고 잡아낼까?", "스모 승부 조작을, 숫자만 보고 잡아낼 수 있을까요?", "pop"],
  ["2002년 **AER**, 더건_교수와 레빗_교수: 스모 기록 분석", "이천이 년, 더건 교수와 레빗 교수가, 일본 스모 경기 기록을 분석했습니다."]],
  build(el, hud) {
    const c = {w: arena(el)};
    c.h = kin(hud, 150, "스모 승부 조작,<br>**통계로** 잡는다?", 96);
    c.j = kin(hud, 170, "**2002** · AER", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.2, 1, ease(lt / 2.6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    w.fight(lt, ease((lt - .6) / .5) * (.8 + .2 * Math.sin(lt * 3)));
    kinUp(c.h, lt, .1, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "surprised" : "normal", look: [.7, -.3]});
  }
});

/* 2. 규칙: 15번 중 8승 (순위표) */
scene({id: "rule", lines: [
  ["15번 싸워 **8번 이상** 이기면 순위가 오른다", "스모는 열다섯 번 싸워서, 여덟 번 이상 이기면 대체로 순위가 오릅니다.", "pop"],
  ["**7번 이하**면 순위가 떨어진다", "일곱 번 이하면 떨어지죠.", "pop"]],
  build(el, hud) {
    const c = {w: arena(el)};
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .75});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    const n = Math.min(15, Math.floor(clamp((lt - .9) / 2) * 15));
    if (lt < L[1]) {w.rec("ooxoxoxoxoxooxx", n); w.rank(2 - 1.2 * ease((lt - 3) / .6), lt > 3 ? "▲ 8승" : "", TEAL)}
    else {const m = Math.min(15, Math.floor(clamp((lt - L[1] - .1) / 1.2) * 15)); w.rec("oxxoxoxxoxooxox", m); w.rank(2 + 1 * ease((lt - L[1] - 1.3) / .6), lt > L[1] + 1.3 ? "▼ 7승" : "", RED)}
    c.o.up(lt, {mood: lt > L[1] + 1.3 ? "skeptical" : "normal", point: ease((lt - .6) / .5), look: [.8, -.3]});
  }
});

/* 3. 마지막 날: 7승 7패 vs 8승 6패 (씨름판으로 돌아옴) */
scene({id: "final", lines: [
  ["마지막 날 **7승_7패** vs 이미 **8승_6패**", "마지막 날, 칠 승 칠 패 선수가 이미 여덟 번을 이긴 선수와 만나면 어떨까요?", "whoosh@0.2"],
  ["한쪽은 **절박**, 다른 쪽은 **여유**", "한쪽은 절박하고, 다른 쪽은 여유가 있죠."]],
  build(el, hud) {
    const c = {w: arena(el)};
    const tag = (x, html, col) => A(hud, x, 560, `<span style="display:inline-block;background:${col};color:#10182a;font-size:60px;font-weight:800;padding:8px 30px;border-radius:50px;box-shadow:0 10px 26px rgba(0,0,0,.4)">${html}</span>`, "", {width: "420px", textAlign: "center"});
    c.a = tag(110, "7승 7패", BLUE); c.b = tag(550, "8승 6패", CORAL);
    c.sa = CX(hud, 220, "", "", {fontSize: "76px", fontWeight: 800, color: "#fff", textShadow: "0 5px 0 rgba(0,0,0,.4)"});
    c.o = host(hud, "owl", {x: 160, y: 1270, s: .62});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 900, s: lerp(1, 1.1, ease((lt - L[1]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 0, .8));
    w.fight(lt, .3 + .2 * Math.sin(lt * 2));
    ap(c.a, lt, .9, null, {s: .6, back: true}); ap(c.b, lt, 1.4, null, {s: .6, back: true});
    c.sa.innerHTML = lt < L[1] ? "" : `<span style="color:${BLUE}">절박</span>  vs  <span style="color:${CORAL}">여유</span>`;
    ap(c.sa, lt, L[1] + .2, null, {s: .6, back: true});
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.8, -.5]});
  }
});

/* 4. 결과: 예상 약 49% vs 실제 약 80% (승률 판) */
scene({id: "result", lines: [
  ["예전 맞대결로 보면 7승_7패 쪽이 이길 확률 **약 49%**", "두 선수의 예전 맞대결 기록으로 보면, 칠 승 칠 패 선수가 이길 확률은 약 사십구 퍼센트입니다.", "pop"],
  ["실제로는 **약 80%**를 이겼다", "그런데 실제로는, 약 팔십 퍼센트를 이겼습니다.", "ding"]],
  build(el, hud) {
    const c = {w: arena(el)};
    c.big = bigNum(hud, 170, "", GOLD, 140);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {const z = ease((lt - L[1]) / .8); return {x: 540, y: 800, s: lerp(1, 1.07, z)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 2160, .9));
    w.lab[0].textContent = "예상: 10번 중 약 5번"; w.lab[0].setAttribute("opacity", P(lt, 1, .3));
    w.fill(lt, 0, 4.87, 1.2);
    w.lab[1].textContent = "실제: 10번 중 8번"; w.lab[1].setAttribute("opacity", P(lt, L[1] + .1, .3));
    w.fill(lt, 1, 8, L[1] + .3, .1);
    c.big.innerHTML = lt < L[1] ? "약 49%" : "약 80%"; c.big.style.color = lt < L[1] ? TEAL : GOLD;
    ap(c.big, lt, 2.2, null, {s: .5, back: true});
    c.big.style.transform += ` scale(${1 + .15 * Math.max(0, 1 - Math.abs(lt - L[1] - 1.5) / .3)})`;
    c.o.up(lt, {mood: lt > L[1] + 1 ? "surprised" : "normal", look: [.8, -.6]});
  }
});

/* 5. 다음 맞대결 40% → 해석 (승률 판) */
scene({id: "payback", lines: [
  ["다음 맞대결: 지난번 7승_7패 선수 승률 **40% 정도**", "그리고 두 선수가 다음에 다시 만나면, 지난번 칠 승 칠 패였던 선수의 승률은, 사십 퍼센트 정도로 떨어졌어요.", "pop"],
  ["연구진의 해석: **승리를 주고받은** 흔적", "연구진은 이것을, 승리를 주고받은 흔적으로 봤습니다.", "coin"]],
  build(el, hud) {
    const c = {w: arena(el)};
    c.big = bigNum(hud, 170, "약 40%", CORAL, 140);
    c.h = kin(hud, 170, "승리를<br>**주고받았다**", 100);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(2160);
    w.lab[0].textContent = "실제(마지막 날): 10번 중 8번"; w.lab[0].setAttribute("opacity", 1); w.lab[0].setAttribute("fill", GOLD);
    w.fill(lt, 0, 8, -9); w.slots[0].forEach(s => s.f.setAttribute("fill", GOLD));
    w.lab[1].textContent = "다음 맞대결: 10번 중 4번"; w.lab[1].setAttribute("opacity", 1); w.lab[1].setAttribute("fill", CORAL);
    w.fill(lt, 1, 4, .8, .1); w.slots[1].forEach(s => s.f.setAttribute("fill", CORAL));
    ap(c.big, lt, 1.6, L[1] - .1, {s: .5, back: true});
    kinUp(c.h, lt, L[1] + .1);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", point: ease((lt - .6) / .5) * (1 - ease((lt - L[1]) / .5)), look: [.8, -.4]});
  }
});

/* 6. 언론 감시 + 2011 (언론 구역) */
scene({id: "press", lines: [
  ["언론 감시가 심한 시기엔 이 승률이 **사라졌다**", "언론의 감시가 심해진 시기에는, 이런 이상한 승률이 사라졌습니다.", "whoosh@0.2"],
  ["2011년, 실제 **승부_조작**이 드러나 대회 취소", "그리고 이천십일 년, 실제로 승부 조작이 드러나 대회가 취소됐습니다.", "ding"]],
  build(el, hud) {
    const c = {w: arena(el)};
    c.h = kin(hud, 160, "감시하자<br>**사라졌다**", 100);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 850, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.press.forEach((e, i) => {const t = spr((lt - .7 - i * .2) / .5); imgAt(e, [3240 + 260, 3240 + 820][i], lt < L[1] ? 760 : 560, clamp(t, 0, 1.2), (i ? -8 : 8) + 3 * Math.sin(lt * 3)); e.style.opacity = clamp(t * 2)});
    const fl = [1.3, 1.9, 2.6, 3.4].reduce((m, t) => Math.max(m, 1 - clamp((lt - t) / .25) - (lt < t ? 1 : 0)), 0);
    w.flash.setAttribute("opacity", .35 * clamp(fl));
    kinUp(c.h, lt, .4, L[1] - .2);
    const tn = spr((lt - L[1] - .2) / .6); w.news.setAttribute("opacity", clamp(tn * 2));
    w.news.setAttribute("transform", `translate(${3240 + 540},970) scale(${clamp(tn, 0, 1.2)}) rotate(${-4 * (1 - clamp(tn))}) translate(${-(3240 + 540)},-970)`);
    c.o.up(lt, {mood: lt > L[1] ? "surprised" : "normal", look: [.8, -.4]});
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈이기는_게 **전부는 아니다**〉", "논문 제목은, 이기는 게 전부는 아니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: arena(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 420);
    c.f = CX(hud, 960, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.fight(lt, .6 + .2 * Math.sin(lt * 3));
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
