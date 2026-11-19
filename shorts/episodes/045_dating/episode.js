/* 오늘의 경제 045 — 스피드 데이트의 선택 기준 (v3: 부엉이 진행자·한 공간 카메라 이동·라운지·데이트 탁자·개념 그래프·예 표시)
   논문: Fisman, R., Iyengar, S. S., Kamenica, E. & Simonson, I. (2006)
         "Gender Differences in Mate Selection: Evidence from a Speed Dating Experiment",
         Quarterly Journal of Economics 121(2): 673–697. doi:10.1162/qjec.2006.121.2.673
   확인(2026-11-19, 원문 PDF 는 이 세션에서 막힘 — 초록(EconPapers·Columbia), Stanford GSB 기사로 확인):
   - 참가자: 컬럼비아대 대학원·전문대학원생, 상대마다 4분 대화 뒤 다시 만나고 싶은지 예/아니오(Stanford 기사)
   - 상대를 외모·진실함·지성·재미·야망·공통 관심사 6가지로 평가(Stanford 기사)
   - 상대는 무작위로 짝지어지고, 행사마다 상대 수도 무작위로 달랐다(초록)
   - 여성은 상대의 지성(과 인종)에 더 큰 무게, 남성은 외모에 더 크게 반응(초록)
   - 남성은 여성의 지성·야망이 자기보다 높을 때는 그만큼을 더 쳐주지 않았다(초록)
   - 여성은 부유한 동네 출신 남성 선호(초록, 영상에서는 생략·설명란에)
   - 상대 수가 많을수록 여성의 까다로움은 크게 늘고 남성은 변화 없음(초록)
   그래프·예 표시 개수는 개념 그림(실제 수치 아님). 평가 척도(1~10)는 확인 못 해 쓰지 않음. */
Object.assign(EP, {no: 45, style: "v2", title: "스피드 데이트의 선택 기준", hook: "4분 데이트에서 남녀는 무엇을 보고 골랐을까?",
  bgm: {seed: 673, bpm: 100, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2006, authors: "R. Fisman, S. S. Iyengar, E. Kamenica & I. Simonson",
          title: "Gender Differences in Mate Selection: Evidence from a Speed Dating Experiment", ko: "짝 고르기의 남녀 차이: 스피드 데이트 실험의 증거",
          cite: "121(2): 673–697", url: "https://doi.org/10.1162/qjec.2006.121.2.673"},
  yt: {title: "4분 데이트에서 드러난 남녀의 선택 기준 #경제 #shorts",
       desc: "보통의 자료는 누가 누구와 짝이 됐는지 결과만 보여 준다. 그 결과에는 내가 고른 것과 상대가 나를 받아 준 것이 섞여 있다. 그래서 연구진은 미국 컬럼비아 대학교 대학원생들로 스피드 데이트 행사를 열었다. 상대마다 4분씩 대화하고, 끝나면 다시 만나고 싶은지 예나 아니오로 적었다. 상대를 외모, 진실함, 지성, 재미, 야망, 공통 관심사 여섯 가지로 평가도 했다. 누구와 만날지는 무작위로 정해졌기 때문에 각자의 예와 아니오를 그대로 볼 수 있다. 남성은 상대의 외모에 더 크게 반응했고, 여성은 상대의 지성에 더 큰 무게를 뒀다. 남성은 자기보다 높은 여성의 지성이나 야망은 그만큼 더 높이 쳐주지 않았다. 만나는 상대가 많은 행사일수록 여성은 더 까다로워졌지만 남성은 변화가 없었다. 설문으로 묻는 대신 실제 선택에서 선호를 읽어 낸 것이 이 연구의 핵심이다(현시 선호, revealed preference). 다만 한 대학의 대학원생들이 대상이어서 모든 사람에게 그대로 적용하기는 어렵다. (논문은 여성이 같은 인종의 상대를 더 선호하고, 부유한 동네에서 자란 남성을 선호했다는 결과도 보고한다. 영상의 그래프와 표시 개수는 개념 그림이다.)",
       tags: ["경제", "행동경제학", "스피드데이트", "현장실험", "선호", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", PINK = "#ff8fb1";
const WW = 4320;                       // 세계 너비: 0 결과만 보는 자료 | 1080 데이트 탁자 | 2160 결과 | 3240 뜻
let WID = 0;
const halo = {stroke: "#1a1020", "stroke-width": 8, "paint-order": "stroke"};

function loungeWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`, R = rng(45);
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#3a1e3e"], [1, "#5a2e4a"]]); lg("floor", [[0, "#4a2a2a"], [1, "#24141a"]]); lg("tab", [[0, "#a87a52"], [1, "#6a4a2e"]]);
  lg("card", [[0, "#fffdf6"], [1, "#efe6d6"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1060, fill: U("wall")}, g);
  w.bok = Array.from({length: 40}, () => S("circle", {cx: R() * WW, cy: 120 + R() * 380, r: 14 + R() * 30, fill: ["#ffd98a", "#ff8fb1", "#ffb38a"][Math.floor(R() * 3)], opacity: .12}, g));
  S("rect", {x: 0, y: 1060, width: WW, height: H - 1060, fill: U("floor")}, g);
  const table = (x, y, wd) => {S("ellipse", {cx: x, cy: y + 10, rx: wd / 2 + 10, ry: 22, fill: "#000", opacity: .25}, g);
    S("rect", {x: x - wd / 2, y: y - 20, width: wd, height: 26, rx: 12, fill: U("tab")}, g); S("rect", {x: x - 10, y, width: 20, height: 1060 - y + 40, fill: "#4a3020"}, g)};
  // 0: 결과만 보는 자료
  table(540, 940, 380);
  w.cm = img(w.layer, "man", 380, 930, 290); w.cw = img(w.layer, "woman", 700, 930, 290);
  w.heart = img(w.layer, "red_heart", 540, 720, 150);
  w.q1 = ST(g, 380, 640, "내가 골랐나?", {"font-size": 40, "font-weight": 900, fill: BLUE, opacity: 0, ...halo});
  w.q2 = ST(g, 700, 640, "상대가 받아 줌?", {"font-size": 40, "font-weight": 900, fill: PINK, opacity: 0, ...halo});
  w.resL = ST(g, 540, 560, "보통 자료 = 결과(짝)만", {"font-size": 46, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  // 1080: 데이트 탁자
  table(1080 + 300, 980, 300);
  w.dm = img(w.layer, "man", 1080 + 170, 970, 260); w.dw = img(w.layer, "woman", 1080 + 430, 970, 260);
  w.watch = img(w.layer, "stopwatch", 1080 + 300, 680, 130);
  w.wT = ST(g, 1080 + 300, 520, "", {"font-size": 64, "font-weight": 900, fill: GOLD, ...halo});
  const cx0 = 1080 + 600;
  w.cardG = S("g", {opacity: 0}, g);
  S("rect", {x: cx0, y: 470, width: 400, height: 560, rx: 18, fill: U("card")}, w.cardG);
  S("text", {x: cx0 + 200, y: 525, "text-anchor": "middle", "font-size": 34, "font-weight": 900, fill: "#2a2a3a"}, w.cardG).textContent = "다시 만날래요?";
  w.yes = S("text", {x: cx0 + 110, y: 590, "text-anchor": "middle", "font-size": 36, "font-weight": 900, fill: "#2a8a4a"}, w.cardG); w.yes.textContent = "□ 예";
  S("text", {x: cx0 + 290, y: 590, "text-anchor": "middle", "font-size": 36, "font-weight": 900, fill: "#a03030"}, w.cardG).textContent = "□ 아니오";
  w.rows = ["외모", "진실함", "지성", "재미", "야망", "공통 관심사"].map((t, i) => {
    S("text", {x: cx0 + 30, y: 660 + i * 60, "font-size": 30, "font-weight": 900, fill: "#2a2a3a"}, w.cardG).textContent = t;
    S("rect", {x: cx0 + 200, y: 638 + i * 60, width: 170, height: 26, rx: 13, fill: "#e0d8c6"}, w.cardG);
    return S("rect", {x: cx0 + 200, y: 638 + i * 60, width: 0, height: 26, rx: 13, fill: [PINK, TEAL, BLUE, GOLD, CORAL, "#b48aff"][i]}, w.cardG)});
  w.dice = img(w.layer, "game_die", 1080 + 130, 470, 110); w.dice.style.opacity = 0;
  w.rndT = ST(g, 1080 + 300, 340, "짝은 무작위", {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  // 2160: 결과 — 무게(①) / 개념 그래프(②) / 예 표시(③)
  const X = 2160;
  w.wM = img(w.layer, "man", X + 270, 760, 260); w.wW = img(w.layer, "woman", X + 810, 760, 260);
  w.bM = img(w.layer, "sparkles", X + 270, 960, 210); w.bW = img(w.layer, "graduation_cap", X + 810, 960, 210);
  w.bMT = ST(g, X + 270, 1030, "외모에 더 크게 반응", {"font-size": 40, "font-weight": 900, fill: PINK, ...halo});
  w.bWT = ST(g, X + 810, 1030, "지성에 더 큰 무게", {"font-size": 40, "font-weight": 900, fill: BLUE, ...halo});
  w.part1 = [w.wM, w.wW, w.bM, w.bW, w.bMT, w.bWT];
  // ② 개념 그래프: x = 여성의 지성, y = 남성이 쳐주는 정도
  const gx = X + 170, gy = 1000, gw = 740, gh = 420;
  w.gr = S("g", {opacity: 0}, g);
  S("rect", {x: gx - 40, y: gy - gh - 80, width: gw + 100, height: gh + 170, rx: 20, fill: "#1a1020", opacity: .55}, w.gr);
  S("line", {x1: gx, y1: gy, x2: gx + gw, y2: gy, stroke: "#fff", "stroke-width": 5}, w.gr);
  S("line", {x1: gx, y1: gy, x2: gx, y2: gy - gh, stroke: "#fff", "stroke-width": 5}, w.gr);
  S("text", {x: gx + gw / 2, y: gy + 55, "text-anchor": "middle", "font-size": 34, "font-weight": 900, fill: "#fff"}, w.gr).textContent = "여성의 지성·야망 →";
  S("text", {x: gx + 20, y: gy - gh - 25, "font-size": 34, "font-weight": 900, fill: "#fff"}, w.gr).textContent = "남성이 쳐주는 정도 ↑";
  const kx = gx + gw * .55;
  S("line", {x1: kx, y1: gy, x2: kx, y2: gy - gh + 20, stroke: GOLD, "stroke-width": 4, "stroke-dasharray": "12 10"}, w.gr);
  S("text", {x: kx + 14, y: gy - 30, "font-size": 30, "font-weight": 900, fill: GOLD}, w.gr).textContent = "남성 자신의 수준";
  w.curve = S("path", {d: `M${gx},${gy - 40} L${kx},${gy - gh + 80} L${gx + gw},${gy - gh + 80}`, fill: "none", stroke: PINK, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, w.gr);
  w.curveLen = 0;
  S("text", {x: gx + gw - 10, y: gy - gh + 60, "text-anchor": "end", "font-size": 30, "font-weight": 900, fill: PINK}, w.gr).textContent = "더 쳐주지 않음";
  S("text", {x: gx + gw, y: gy + 100, "text-anchor": "end", "font-size": 26, "font-weight": 700, fill: "#c9cfe6"}, w.gr).textContent = "개념 그림";
  // ③ 예 표시: 작은 행사 vs 큰 행사 (개념)
  w.yesG = S("g", {opacity: 0}, g);
  S("rect", {x: X + 90, y: 430, width: 900, height: 640, rx: 20, fill: "#1a1020", opacity: .55}, w.yesG);
  S("text", {x: X + 380, y: 500, "text-anchor": "middle", "font-size": 38, "font-weight": 900, fill: "#fff"}, w.yesG).textContent = "상대가 적은 행사";
  S("text", {x: X + 790, y: 500, "text-anchor": "middle", "font-size": 38, "font-weight": 900, fill: GOLD}, w.yesG).textContent = "상대가 많은 행사";
  w.yesMarks = [];
  [["남성", BLUE, 640, [5, 5]], ["여성", PINK, 860, [5, 3]]].forEach(([t, col, y, ks]) => {
    S("text", {x: X + 150, y: y + 12, "text-anchor": "middle", "font-size": 36, "font-weight": 900, fill: col}, w.yesG).textContent = t;
    ks.forEach((k, j) => {for (let i = 0; i < 10; i++) {const cx = X + 250 + j * 410 + (i % 5) * 54, cy = y - 40 + Math.floor(i / 5) * 70;
      const c = S("circle", {cx, cy, r: 22, fill: i < k ? col : "#4a3a4a"}, w.yesG); w.yesMarks.push({c, on: i < k, col, j})}});
    S("text", {x: X + 540, y: y + 90, "text-anchor": "middle", "font-size": 1, fill: "none"}, w.yesG)});
  S("text", {x: X + 540, y: 1030, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#c9cfe6"}, w.yesG).textContent = "색칠 = 예 · 개념 그림(실제 비율 아님)";
  // 3240: 뜻 — 말 vs 선택
  const Y = 3240;
  w.say = img(w.layer, "speech_balloon", Y + 280, 860, 230); w.choose = img(w.layer, "check_mark_button", Y + 800, 860, 230);
  w.sayT = ST(g, Y + 280, 950, "설문 속 말", {"font-size": 42, "font-weight": 900, fill: "#c9cfe6", ...halo});
  w.choT = ST(g, Y + 800, 950, "실제 선택", {"font-size": 42, "font-weight": 900, fill: GOLD, ...halo});
  w.rp = ST(g, Y + 540, 560, "현시 선호(Revealed Preference)", {"font-size": 50, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  w.sch = img(w.layer, "school", Y + 540, 1200, 150); w.sch.style.opacity = 0;
  // 앞쪽(흐린) 펜던트 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("line", {x1: x, y1: -20, x2: x, y2: 90, stroke: "#0b0610", "stroke-width": 6}, fs);
    S("path", {d: `M${x - 90},150 Q${x},40 ${x + 90},150 Z`, fill: "#1a0e14"}, fs); S("ellipse", {cx: x, cy: 150, rx: 80, ry: 14, fill: "#ffe6a8", opacity: .85}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.bok.forEach((b, i) => b.setAttribute("opacity", .08 + .07 * Math.sin(lt * 1.5 + i)));
    imgAt(w.dm, 1080 + 170, 970 - 4 * Math.abs(Math.sin(lt * 3)), 1, 0); imgAt(w.dw, 1080 + 430, 970 - 4 * Math.abs(Math.sin(lt * 3 + 1)), 1, 0)};
  w.data = (lt, t0, t1) => {w.resL.setAttribute("opacity", P(lt, t0, .3)); imgAt(w.heart, 540, 720, 1 + .08 * Math.sin(lt * 6), 0);
    const sp = ease((lt - t1) / .6); imgAt(w.cm, 380 - 40 * sp, 930, 1, 0); imgAt(w.cw, 700 + 40 * sp, 930, 1, 0);
    w.heart.style.opacity = 1 - .7 * sp; w.q1.setAttribute("opacity", P(lt, t1 + .3, .3)); w.q2.setAttribute("opacity", P(lt, t1 + .6, .3))};
  w.date = (lt, tw, tc, tr, tz) => {const s = lt < tw ? 240 : Math.max(0, 240 - (lt - tw) * 60);
    w.wT.textContent = lt < tw ? "" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    imgAt(w.watch, 1080 + 300, 680, 1, lt > tw && s > 0 ? 6 * Math.sin(lt * 12) : 0);
    w.cardG.setAttribute("opacity", P(lt, tc, .3)); w.yes.textContent = lt > tc + .8 ? "☑ 예" : "□ 예";
    const fills = [.8, .6, .7, .5, .4, .65];
    w.rows.forEach((r, i) => r.setAttribute("width", 170 * fills[i] * ease((lt - tr - i * .15) / .5)));
    w.dice.style.opacity = P(lt, tz, .3); imgAt(w.dice, 1080 + 130, 470, 1, lt > tz ? (lt * 300) % 360 : 0); w.rndT.setAttribute("opacity", P(lt, tz, .3))};
  w.res = (lt, tM, tW, tG, tY) => {
    const p1 = lt < tG - .2 ? 1 : 1 - P(lt, tG - .2, .3);
    [w.wM, w.bM, w.bMT].forEach(e => {const o = P(lt, tM, .3) * p1; e.style ? (e.style.opacity = o) : e.setAttribute("opacity", o)});
    [w.wW, w.bW, w.bWT].forEach(e => {const o = P(lt, tW, .3) * p1; e.style ? (e.style.opacity = o) : e.setAttribute("opacity", o)});
    imgAt(w.bM, 2160 + 270, 960, lt > tM ? 1 + .1 * Math.sin(lt * 5) : 1, 0); imgAt(w.bW, 2160 + 810, 960, lt > tW ? 1 + .1 * Math.sin(lt * 5) : 1, 0);
    const g2 = lt < tY - .2 ? P(lt, tG, .3) : 1 - P(lt, tY - .2, .3); w.gr.setAttribute("opacity", g2);
    if (!w.curveLen) w.curveLen = 1400; w.curve.setAttribute("stroke-dasharray", w.curveLen); w.curve.setAttribute("stroke-dashoffset", w.curveLen * (1 - ease((lt - tG - .3) / 1.8)));
    w.yesG.setAttribute("opacity", P(lt, tY, .3));
    w.yesMarks.forEach((m, i) => m.c.setAttribute("fill", m.on && lt > tY + .4 + m.j * 1.2 ? m.col : "#4a3a4a"))};
  w.mean = (lt, t0, t1) => {w.rp.setAttribute("opacity", P(lt, t0, .3)); w.say.style.opacity = lt > t0 + .5 ? .45 : 1;
    imgAt(w.choose, 3240 + 800, 860, lt > t0 + .5 ? 1.15 + .05 * Math.sin(lt * 5) : 1, 0);
    w.sch.style.opacity = P(lt, t1, .3)};
  w.data(-99, 99, 99); w.date(-99, 99, 99, 99, 99); w.res(-99, 99, 99, 99, 99); w.mean(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["4분 데이트, 남녀는 **무엇을 보고** 골랐을까?", "사 분짜리 데이트에서, 남자와 여자는 무엇을 보고 상대를 골랐을까요?", "pop"],
  ["2006년 **QJE**에 실린 논문", "이천육 년에 나온 논문입니다."],
  ["저자 네 명: 피스먼, 아이엔가, 카메니카, 사이먼슨", "저자는 네 명입니다. 피스먼, 아이엔가, 카메니카, 사이먼슨."]],
  build(el, hud) {
    const c = {w: loungeWorld(el)};
    c.h = kin(hud, 120, "4분 데이트의 **선택 기준**", 92);
    c.j = kin(hud, 120, "**2006** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.date(lt, .4, 99, 99, 99);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "happy" : "normal", look: [.7, -.4]});
  }
});

/* 2. 왜 실험이 필요한가 */
scene({id: "problem", lines: [
  ["보통 자료: 누가 누구와 **짝이 됐나**, 결과만", "보통의 자료는, 누가 누구와 짝이 됐는지, 결과만 보여 줍니다.", "whoosh@0.1"],
  ["결과엔 **내가 고른 것**과 **상대가 받아 준 것**이 섞여 있다", "그 결과에는, 내가 고른 것과, 상대가 나를 받아 준 것이, 섞여 있죠."]],
  build(el, hud) {
    const c = {w: loungeWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.03}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.date(99, -99, 99, 99, 99); w.pan(whip(lt, 0, 1080, 0, .9)); w.data(lt, .9, L[1] + .3);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 실험 */
scene({id: "design", lines: [
  ["그래서 **스피드 데이트** 실험: 미국 컬럼비아대 대학원생", "그래서 연구진은, 미국 컬럼비아 대학교 대학원생들로, 스피드 데이트 행사를 열었습니다.", "pop"],
  ["상대마다 **4분** 대화 → 다시 만날래요? **예/아니오**", "상대마다 사 분씩 대화하고, 끝나면 다시 만나고 싶은지, 예, 아니오 중 하나로 적었습니다."],
  ["평가 6가지: 외모, 진실함, 지성, 재미, 야망, 공통 관심사", "상대를, 외모, 진실함, 지성, 재미, 야망, 공통 관심사, 여섯 가지로 평가도 했죠."],
  ["만날 상대는 **무작위** → 각자의 선택을 그대로 본다", "누구와 만날지는 무작위로 정해졌습니다. 그래서 각자의 선택을, 그대로 볼 수 있습니다."]],
  build(el, hud) {
    const c = {w: loungeWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.data(99, 0, 0); w.pan(lt < L[0] + 1.2 ? 0 : whip(lt, L[0] + 1.2, 0, 1080, .9));
    w.date(lt, L[1] + .2, L[1] + 2, L[2] + .3, L[3] + .3);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["결과 ①: 남성은 상대의 **외모**에 더 크게 반응", "결과를 보면, 남성은 상대의 외모에, 더 크게 반응했습니다.", "pop"],
  ["여성은 상대의 **지성**에 더 큰 무게", "여성은 상대의 지성에, 더 큰 무게를 뒀고요.", "pop"],
  ["② 남성: 여성 지성·야망이 **자기보다 높으면** 더 안 쳐줌", "또, 남성은 자기보다 높은 여성의 지성이나 야망은, 그만큼 더 높이 쳐주지 않았습니다."],
  ["③ 상대가 많은 행사일수록 **여성만** 더 까다로워졌다", "그리고 만나는 상대가 많은 행사일수록, 여성은 더 까다로워졌지만, 남성은 변화가 없었습니다.", "ding"]],
  build(el, hud) {
    const c = {w: loungeWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.date(99, -99, 0, 0, 0); w.pan(whip(lt, 0, 1080, 2160, .9)); w.res(lt, .9, L[1] + .2, L[2] + .3, L[3] + .3);
    c.o.up(lt, {mood: lt > L[2] && lt < L[3] ? "skeptical" : (lt > L[3] ? "surprised" : "normal"), look: [.7, -.6]});
  }
});

/* 5. 뜻 */
scene({id: "meaning", lines: [
  ["말 대신 **실제 선택**에서 읽어 낸 선호", "설문으로 묻는 대신, 실제 선택에서 선호를 읽어 낸 것이, 이 연구의 핵심입니다.", "ding"],
  ["경제학 용어로 **현시 선호**(Revealed Preference)", "경제학에서는 이것을, 현시 선호라고 부릅니다."],
  ["단, 한 대학의 대학원생 대상: **모두에게 적용은 어렵다**", "다만, 한 대학의 대학원생들이 대상이어서, 모든 사람에게 그대로 적용하기는 어렵습니다."]],
  build(el, hud) {
    const c = {w: loungeWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.res(99, 0, 0, 0, 0); w.pan(whip(lt, 0, 2160, 3240, .9)); w.mean(lt, L[1] + .1, L[2] + .3);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : "happy", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**짝 고르기의 남녀 차이**〉", "논문 제목은, 짝 고르기의 남녀 차이, 스피드 데이트 실험의 증거입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: loungeWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.data(lt, 99, 99);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
