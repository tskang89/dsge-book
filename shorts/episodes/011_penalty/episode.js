/* 오늘의 경제 011 — 페널티킥과 혼합전략 (v3: 부엉이 진행자·한 공간 카메라 이동·공 기둥)
   논문: Chiappori, P.-A., Levitt, S. & Groseclose, T. (2002) "Testing Mixed-Strategy Equilibria When Players Are Heterogeneous:
         The Case of Penalty Kicks in Soccer", American Economic Review 92(4): 1138–1151. doi:10.1257/00028280260344678
   확인(2026-11-15, 원문 PDF 는 이 세션에서 막힘 — 웹 검색 요약·재분석 논문 인용으로 확인):
   - 자료: 프랑스·이탈리아 1부 리그 3시즌 페널티킥 459개(AEA 초록·Coloma 2007 재분석)
   - 모형: 키커와 골키퍼가 왼쪽·가운데·오른쪽을 동시에 고르는 게임. 혼합전략 균형이면 쓰는 방향마다 골 확률이 같아야 한다.
   - 결과: 방향별 골 확률이 같다는 가설을 기각하지 못함 = 선수들의 선택이 혼합전략 균형의 예측과 대체로 맞음
   - 방향별 비율(키커 가운데 약 17%, 골키퍼 가운데 2~6%)·방향별 성공률(가운데 약 81%)은 2차 자료끼리 어긋나 쓰지 않음
   공 기둥 높이는 '비슷하다'를 보이는 단순화 그림(수치 아님 — 화면에 표시). */
Object.assign(EP, {no: 11, style: "v2", title: "페널티킥과 혼합전략", hook: "페널티킥, 어느 쪽으로 찰까?",
  bgm: {seed: 131, bpm: 104, mood: "tense"},
  paper: {journal: "American Economic Review", year: 2002, authors: "Pierre-André Chiappori, Steven Levitt & Timothy Groseclose",
          title: "Testing Mixed-Strategy Equilibria When Players Are Heterogeneous: The Case of Penalty Kicks in Soccer",
          ko: "선수마다 다를 때 혼합전략 균형 검증하기: 축구 페널티킥", cite: "92(4): 1138–1151", url: "https://doi.org/10.1257/00028280260344678"},
  yt: {title: "페널티킥, 어느 쪽으로 찰까? | 혼합전략 #경제 #shorts",
       desc: "공이 워낙 빨라서, 골키퍼는 공을 차기 전에 미리 한쪽으로 몸을 던진다. 키커와 골키퍼가 동시에 방향을 고르는 게임이다. 늘 한쪽으로만 슛을 날리면 상대가 금방 읽어 내므로, 방향을 예측할 수 없게 섞는 것이 혼합전략(Mixed Strategy)이다. 이 이론의 예측은 어느 쪽으로 차든 골이 들어갈 확률이 같아야 한다는 것. 연구진이 프랑스와 이탈리아 리그의 페널티킥 459개를 분석한 결과, 방향에 따른 골 확률에는 뚜렷한 차이가 없었다. 선수들은 이론의 예측과 맞게 방향을 섞고 있었다.",
       tags: ["경제", "게임이론", "혼합전략", "축구", "페널티킥", "레빗", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 골문 | 1080 방향 섞기 | 2160 저울 | 3240 공 기둥
let WID = 0;

function pitchWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#060a18"], [1, "#1a2a4a"]]); lg("grass", [[0, "#2f7a3e"], [1, "#174a24"]]);
  lg("beam", [[0, "#ffffff", .22], [1, "#ffffff", 0]]); lg("tube", [[0, "#cfe6ff", .18], [1, "#8fb8e6", .3]]);
  S("rect", {x: 0, y: 0, width: WW, height: 780, fill: U("sky")}, g);
  // 관중석(점)
  const r = rng(11); w.crowd = [];
  for (let i = 0; i < 520; i++) w.crowd.push(S("circle", {cx: r() * WW, cy: 560 + r() * 200, r: 9 + r() * 5,
    fill: ["#3a4a6a", "#5a3a4a", "#4a5a3a", "#6a5a3a"][i % 4], opacity: .8}, g));
  S("rect", {x: 0, y: 770, width: WW, height: 18, fill: "#0b1020"}, g);
  S("rect", {x: 0, y: 788, width: WW, height: H - 788, fill: U("grass")}, g);
  for (let x = 0; x < WW; x += 240) S("rect", {x, y: 788, width: 120, height: H - 788, fill: "#fff", opacity: .04}, g);
  w.beams = [300, 1400, 2500, 3600].map(x => S("path", {d: `M${x - 40},0 L${x + 40},0 L${x + 380},1200 L${x - 300},1200 Z`, fill: U("beam")}, g));
  // 0: 골문
  const goal = (x0, x1, top, bot, gg) => {
    for (let x = x0; x <= x1; x += 40) S("line", {x1: x, y1: top, x2: x + (x - (x0 + x1) / 2) * .08, y2: bot - 60, stroke: "#fff", "stroke-width": 2, opacity: .25}, gg);
    for (let y = top; y <= bot - 60; y += 40) S("line", {x1: x0, y1: y, x2: x1, y2: y, stroke: "#fff", "stroke-width": 2, opacity: .25}, gg);
    S("path", {d: `M${x0},${bot} L${x0},${top} L${x1},${top} L${x1},${bot}`, stroke: "#fff", "stroke-width": 22, fill: "none", "stroke-linejoin": "round"}, gg)};
  goal(120, 960, 420, 960, g);
  S("path", {d: "M-200,960 L1280,960", stroke: "#fff", "stroke-width": 8, opacity: .7}, g);
  S("ellipse", {cx: 600, cy: 1200, rx: 18, ry: 8, fill: "#fff", opacity: .8}, g);   // 페널티 점
  w.gk = img(w.layer, "man", 540, 960, 280);
  w.ball = img(w.layer, "soccer_ball", 600, 1210, 120);
  // 1080: 방향 화살표 셋
  const ax = 1080 + 540;
  w.arrows = [[-1, "왼쪽"], [0, "가운데"], [1, "오른쪽"]].map(([k, t], i) => {
    const gg = S("g", {}, g), x = ax + k * 300;
    S("rect", {x: x - 130, y: 420, width: 260, height: 300, rx: 40, fill: "#24324c", stroke: "#5a6a8a", "stroke-width": 6}, gg);
    S("path", {d: k === 0 ? `M${x},470 L${x + 60},560 L${x + 25},560 L${x + 25},650 L${x - 25},650 L${x - 25},560 L${x - 60},560 Z`
      : `M${x + k * 90},570 L${x + k * 0},500 L${x},540 L${x - k * 80},540 L${x - k * 80},600 L${x},600 L${x},640 Z`, fill: "#c9cfe6"}, gg);
    ST(gg, x, 790, t, {"font-size": 48, "font-weight": 800, fill: "#c9cfe6"});
    return gg});
  w.q = ST(g, ax, 360, "?", {"font-size": 110, "font-weight": 900, fill: GOLD});
  w.rps = ["rock", "scissors", "raised_hand"].map((k, i) => img(w.layer, k, ax + (i - 1) * 300, 1150, 200));
  // 2160: 저울
  const sx = 2160 + 540;
  S("path", {d: `M${sx - 60},1000 L${sx + 60},1000 L${sx + 20},560 L${sx - 20},560 Z`, fill: "#8a96b8"}, g);
  S("rect", {x: sx - 160, y: 990, width: 320, height: 30, rx: 12, fill: "#6a7698"}, g);
  w.beamG = S("g", {}, g);
  S("rect", {x: sx - 380, y: 545, width: 760, height: 26, rx: 13, fill: "#c9cfe6"}, w.beamG);
  S("circle", {cx: sx, cy: 558, r: 26, fill: GOLD}, w.beamG);
  w.pans = [-1, 1].map(k => {const p = S("g", {}, g);
    S("line", {x1: 0, y1: 0, x2: -110, y2: 200, stroke: "#c9cfe6", "stroke-width": 5}, p);
    S("line", {x1: 0, y1: 0, x2: 110, y2: 200, stroke: "#c9cfe6", "stroke-width": 5}, p);
    S("path", {d: "M-150,200 L150,200 Q120,270 0,270 Q-120,270 -150,200 Z", fill: "#8a96b8"}, p);
    ST(p, 0, 340, k < 0 ? "왼쪽 골 확률" : "오른쪽 골 확률", {"font-size": 40, "font-weight": 800, fill: "#e8f1ff"});
    return p});
  w.panBalls = [[], []].map((_, j) => Array.from({length: 3}, () => img(w.layer, "soccer_ball", 0, 0, 80)));
  // 3240: 공 기둥 셋
  w.tubes = [-1, 0, 1].map((k, i) => {const x = 3240 + 540 + k * 300;
    S("rect", {x: x - 100, y: 380, width: 200, height: 640, rx: 30, fill: U("tube"), stroke: "#cfe6ff", "stroke-width": 5}, g);
    ST(g, x, 1090, ["왼쪽", "가운데", "오른쪽"][i], {"font-size": 46, "font-weight": 800, fill: "#e8f1ff"});
    return S("rect", {x: x - 88, y: 1008, width: 176, height: 0, rx: 22, fill: GOLD, opacity: .85}, g)});
  w.rain = Array.from({length: 14}, () => img(w.layer, "soccer_ball", 0, 0, 70));
  // 앞쪽(흐린) 조명탑: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 160, y: 30, width: 320, height: 70, rx: 10, fill: "#0b1020"}, fs);
    for (let k = 0; k < 5; k++) S("circle", {cx: x - 120 + k * 60, cy: 65, r: 18, fill: "#fff8e0", opacity: .85}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.beams.forEach((b, i) => b.setAttribute("opacity", .6 + .4 * Math.sin(lt * 1.3 + i)));
    w.crowd.forEach((c, i) => {if (i % 3 === 0) c.setAttribute("transform", `translate(0,${-6 * Math.max(0, Math.sin(lt * 7 + i))})`)})};
  // 골키퍼: dv = -1(왼쪽 다이빙)~1(오른쪽), u 진행
  w.keeper = (dv, u) => {u = clamp(u); const x = 540 + dv * 150 * ease(u), y = 960 - 150 * Math.sin(Math.PI * clamp(u * 1.2)) * Math.abs(dv),
      rot = dv * 70 * ease(u);
    imgAt(w.gk, x, y, 1, rot);
  };
  // 공: 페널티 점 → 골문 안 (tx, ty)
  w.shot = (u, tx, ty) => {u = clamp(u); const e = 1 - Math.pow(1 - u, 2);
    imgAt(w.ball, lerp(600, tx, e), lerp(1210, ty, e) - 120 * Math.sin(Math.PI * u), lerp(1, .62, e), u * 720)};
  w.hi = k => w.arrows.forEach((a, i) => {a.style.opacity = k < 0 || i === k ? 1 : .35;
    a.setAttribute("transform", i === k ? `translate(${(1080 + 540 + (i - 1) * 300) * -0.1},${570 * -0.1}) scale(1.1)` : "")});
  w.tilt = deg => {const sx = 2160 + 540, a = deg * Math.PI / 180;
    w.beamG.setAttribute("transform", `rotate(${deg} ${sx} 558)`);
    w.pans.forEach((p, j) => {const k = j ? 1 : -1, px = sx + k * 340 * Math.cos(a), py = 558 + k * 340 * Math.sin(a);
      p.setAttribute("transform", `translate(${px},${py})`);
      w.panBalls[j].forEach((b, i) => imgAt(b, px + (i - 1) * 70, py + 215 - (i === 1 ? 30 : 0), 1, 0))})};
  w.balls = (j, nB) => w.panBalls[j].forEach((b, i) => b.style.opacity = i < nB ? 1 : 0);
  w.fillT = (lt, t0) => [.74, .79, .76].forEach((h, i) => {const v = clamp((lt - t0 - i * .15) / 2.2) * h * 600;
    w.tubes[i].setAttribute("height", v); w.tubes[i].setAttribute("y", 1008 - v)});
  w.rainB = (lt, t0, t1) => w.rain.forEach((e, i) => {const k = i % 3, u = ((lt - t0) * 1.4 + i / 14) % 1;
    if (lt < t0 || lt > t1) {e.style.opacity = 0; return}
    imgAt(e, 3240 + 540 + (k - 1) * 300 + (i % 2 ? 30 : -30), lerp(200, 900, u), 1, u * 300); e.style.opacity = Math.sin(Math.PI * u)});
  w.keeper(0, 0); w.shot(0, 600, 1210); w.hi(-1); w.tilt(0); w.balls(0, 0); w.balls(1, 0); w.fillT(-99, 0); w.rainB(-99, 0, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 (골문) */
scene({id: "hook", lines: [
  ["**페널티킥**, 어느_쪽으로 찰까?", "페널티킥, 어느 쪽으로 찰까요?", "pop"],
  ["2002년 **AER**, 경제학자 세 사람이 발표한 논문", "이천이 년, 경제학자 세 사람이 발표한 논문입니다."]],
  build(el, hud) {
    const c = {w: pitchWorld(el)};
    c.h = kin(hud, 150, "**어느 쪽**으로<br>찰까?", 110);
    c.j = kin(hud, 170, "**2002** · AER", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.2, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    const t = lt - 1.0; w.keeper(1, t / .6); w.shot((t - .1) / .55, 300, 560);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 동시에 고르는 게임 */
scene({id: "setup", lines: [
  ["공이 빨라 골키퍼는 **차기 전에** 몸을 던진다", "공이 워낙 빨라서, 골키퍼는 공을 차기 전에 미리 한쪽으로 몸을 던집니다.", "whoosh@0.8"],
  ["키커와 골키퍼가 **동시에** 방향을 고르는 게임", "그러니 키커와 골키퍼가, 동시에 방향을 고르는 게임이죠.", "pop"]],
  build(el, hud) {
    const c = {w: pitchWorld(el)};
    c.st = img(hud, "stopwatch", 880, 360, 150);
    c.v = CX(hud, 1110, "키커 &nbsp;vs&nbsp; 골키퍼", "", {fontSize: "54px", fontWeight: 800, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,.5)"});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 780, s: lerp(1.05, 1.12, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    // 골키퍼가 먼저 왼쪽으로, 공은 오른쪽으로
    const t = lt - .8; w.keeper(-1, t / .6); w.shot((t - .45) / .5, 820, 600);
    const ts = spr((lt - .3) / .5); imgAt(c.st, 880, 360, clamp(ts, 0, 1.2), 8 * Math.sin(lt * 9)); c.st.style.opacity = clamp(ts * 2) * (1 - P(lt, L[1] - .2, .3));
    ap(c.v, lt, L[1] + .1, null, {s: .8, back: true});
    c.o.up(lt, {mood: lt > L[1] ? "normal" : "surprised", look: [.7, -.5]});
  }
});

/* 3. 혼합전략 (방향 섞기) */
scene({id: "mixed", lines: [
  ["늘 한쪽으로만 슛을 날리면? 상대가 **읽어 낸다**", "늘 한쪽으로만 슛을 날리면, 상대가 금방 읽어 냅니다.", "whoosh@0.2"],
  ["예측할 수 없게 섞기 = **혼합전략**(Mixed Strategy)", "그래서 방향을 예측할 수 없게 섞는 것을, 혼합전략이라고 합니다.", "pop"],
  ["가위바위보에서 늘 **주먹만** 내는 사람은 진다", "가위바위보에서, 늘 주먹만 내는 사람은 지는 것처럼요."]],
  build(el, hud) {
    const c = {w: pitchWorld(el)};
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .8});
    c.r = rng(5); c.seq = Array.from({length: 60}, () => Math.floor(c.r() * 3));
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.06, ease((lt - L[1]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9));
    // 첫 줄: 늘 왼쪽 / 둘째 줄부터: 무작위로 바뀜
    if (lt < L[1]) w.hi(lt > 1 ? 0 : -1); else w.hi(c.seq[Math.floor((lt - L[1]) * 2.5) % 60]);
    w.q.setAttribute("opacity", lt > L[1] ? .6 + .4 * Math.sin(lt * 8) : 0);
    w.rps.forEach((e, i) => {const u = spr((lt - L[2] - .1 - i * .2) / .5); e.style.opacity = clamp(u * 2);
      imgAt(e, 1080 + 540 + (i - 1) * 300, 1150 - 30 * Math.abs(Math.sin(lt * 4 + i)), clamp(u, 0, 1.2), 0)});
    c.o.up(lt, {mood: lt < L[1] ? "skeptical" : "normal", point: ease((lt - L[1]) / .5) * (1 - ease((lt - L[2]) / .5)), look: [.8, -.5]});
  }
});

/* 4. 예측: 골 확률이 같아야 (저울) */
scene({id: "predict", lines: [
  ["이론에 따르면: 어느 쪽으로 차든 **골이 들어갈_확률이 같다**", "이 이론에 따르면, 어느 쪽으로 차든 골이 들어갈 확률이 같아야 합니다.", "pop"],
  ["한쪽이 더 잘 들어가면? **모두 그쪽으로만** 찬다", "한쪽이 더 잘 들어간다면, 모두 그쪽으로만 찰 테니까요."],
  ["골키퍼도 그쪽을 지키고 → 결국 **확률이 같아진다**", "그러면 골키퍼도 그쪽을 지키게 되고, 결국 확률이 같아지는 거죠.", "ding"]],
  build(el, hud) {
    const c = {w: pitchWorld(el)};
    c.gk = img(hud, "gloves", 0, 0, 130);
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1.04, 1, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    const t1 = ease((lt - L[1] - .2) / .6), t2 = ease((lt - L[2] - .4) / .8);
    w.tilt(-14 * t1 * (1 - t2) + 3 * Math.sin(lt * 2) * (1 - t1) * .3);
    w.balls(0, lt > L[1] + .2 && lt < L[2] + .4 ? 3 : 2); w.balls(1, 2);
    // 장갑이 왼쪽 접시로 날아와 공 하나를 막음
    const tg = clamp((lt - L[2]) / .6); c.gk.style.opacity = lt > L[2] ? 1 : 0;
    imgAt(c.gk, lerp(980, 210, ease(tg)), lerp(300, 820 - 14 * (1 - t2), ease(tg)), 1, -20 + 20 * tg);
    c.o.up(lt, {mood: lt > L[2] + .6 ? "happy" : lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 5. 자료와 결과 (공 기둥) */
scene({id: "result", lines: [
  ["프랑스·이탈리아 리그 페널티킥 **459개**", "연구진은 프랑스와 이탈리아 리그의 페널티킥 사백오십구 개를 분석했습니다.", "coin"],
  ["방향별 골 확률: **뚜렷한 차이 없음**", "그 결과, 방향에 따른 골 확률은 뚜렷한 차이가 없었습니다.", "ding"],
  ["선수들은 **이론의 예측과 맞게** 섞고 있었다", "선수들은 이론의 예측과 맞게, 방향을 섞고 있었던 거죠."]],
  build(el, hud) {
    const c = {w: pitchWorld(el)};
    c.n = CX(hud, 150, "0", "", {fontSize: "150px", fontWeight: 800, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.nl = CX(hud, 330, "개의 페널티킥", "", {fontSize: "52px", fontWeight: 800, color: "#fff"});
    c.h = kin(hud, 170, "골 확률 **비슷**", 110);
    c.u = CX(hud, 1150, "단순화한 그림: 높이는 ‘비슷하다’는 뜻", "", {fontSize: "36px", fontWeight: 700, color: "#fff", opacity: .8});
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.rainB(lt, .9, L[1]);
    countTo(c.n, lt, 1, 0, 459, v => Math.round(v), Math.max(.8, L[1] - 1.4));
    const off = 1 - P(lt, L[1] - .2, .3); c.n.style.opacity = P(lt, .9, .3) * off; c.nl.style.opacity = P(lt, 1.1, .3) * off;
    w.fillT(lt, L[1] - .1); kinUp(c.h, lt, L[1] + 1.4); ap(c.u, lt, L[1] + .4);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : lt > L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 6. 시사점 + 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["상대가 있는 게임: **예측할 수 없는 것**이 최선일 수 있다", "상대가 있는 게임에서는, 예측할 수 없는 것이 최선의 전략일 수 있습니다.", "pop"],
  ["매일 하나씩, **오늘의 경제**", "구독하고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: pitchWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1040, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.08, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1));
    const t = lt - 1.2; w.keeper(-1, t / .6); w.shot((t - .1) / .55, 560, 600);
    c.dim.style.opacity = P(lt, L[1] - .3, .5); ap(c.p, lt, L[1], null, {s: .92}); ap(c.f, lt, L[1] + .6, null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
