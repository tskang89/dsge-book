/* 오늘의 경제 032 — 타이거 우즈도 손실을 싫어할까 (014 폐기본을 설명을 보강해 다시 만듦: 골프 기초·이득/손해 구분·총 타수 논리)
   논문: Pope, D. G. & Schweitzer, M. E. (2011) "Is Tiger Woods Loss Averse? Persistent Bias in the Face of Experience,
         Competition, and High Stakes", American Economic Review 101(1): 129–157. doi:10.1257/aer.101.1.129
   확인(2026-11-15·18, 원문 PDF 는 이 세션에서 막힘 — 웹 검색 요약·Wharton 기사·작업 논문 초록으로 확인):
   - 자료: PGA 투어 2004~2009년 239개 대회, 선수 421명, 퍼트 250만 개, 레이저(ShotLink)로 잰 위치
   - 결과: 같은 거리에서 버디 퍼트 성공률이 파 퍼트보다 약 2%p 낮음(요약에 따라 2~3%p), 버디 퍼트는 짧게 치는 경우가 더 많음
   - 최정상 선수(타이거 우즈 포함)에게서도 나타남, 저자 해석 = 손실 회피(파를 기준점으로)
   - 작업 논문: 이 편향이 최정상 선수들에게 해마다 상금 120만 달러 넘게의 손해(1인당인지 상위 20명 합인지 요약마다 달라 설명란에만)
   - 거리별 실제 성공률은 확인 못 함 → 격자의 50·48 은 '100번 중 약 2번 차이'만 보이는 예시(화면 표시)
   - 대회 = 보통 4라운드 × 18홀 = 72홀, 순위는 총 타수 */
Object.assign(EP, {no: 32, style: "v2", title: "타이거 우즈도 손실을 싫어할까", hook: "같은 거리 퍼트, 성공률이 달라질까?",
  bgm: {seed: 161, bpm: 100, mood: "calm"},
  paper: {journal: "American Economic Review", year: 2011, authors: "Devin G. Pope & Maurice E. Schweitzer",
          title: "Is Tiger Woods Loss Averse? Persistent Bias in the Face of Experience, Competition, and High Stakes",
          ko: "타이거 우즈도 손실을 싫어할까? 경험·경쟁·큰 판돈에도 남는 편향", cite: "101(1): 129–157", url: "https://doi.org/10.1257/aer.101.1.129"},
  yt: {title: "같은 거리 퍼트, 성공률이 달라진다? | 타이거 우즈와 손실 회피 #경제 #shorts",
       desc: "골프는 공을 되도록 적은 횟수로 쳐서 홀에 넣는 경기다. 친 횟수를 타수라고 하고 적을수록 좋다. 마지막에 잔디 위에서 공을 굴려 홀에 넣는 샷이 퍼트다. 홀마다 기준 타수, 파(Par)가 있다. 기준보다 한 타 적으면 버디(이득), 한 타 더 치면 보기(Bogey, 손해)다. 그래서 버디 퍼트는 넣으면 버디, 놓쳐도 대개 파(본전)로 끝나고, 파 퍼트는 넣어야 본전인 파, 놓치면 손해인 보기가 된다. 버디 퍼트는 얻을 기회, 파 퍼트는 잃지 않을 기회인 셈이다. 그런데 프로 대회 순위는 모든 홀(보통 72홀)의 타수를 더한 총 타수로 정해지므로 한 타의 값은 어디서나 같다. 같은 거리라면 두 퍼트를 똑같이 잘 쳐야 정상이다. 연구진은 미국 프로 선수들이 2004~2009년 대회에서 친 퍼트 250만 개를 레이저로 잰 거리로, 같은 거리끼리 비교했다. 같은 거리에서 100번 치면 버디 퍼트가 2번쯤 덜 들어갔다(약 2%p). 버디 퍼트는 홀에 못 미치게 짧게 친 경우가 더 많았다. 타이거 우즈 같은 최정상 선수도 마찬가지였다. 연구진은 이것을 손실 회피(Loss Aversion)로 해석했다. 같은 크기라도 얻는 기쁨보다 잃는 아픔을 더 크게 느끼는 것이다. 파를 기준으로 보면 파 퍼트를 놓치는 건 손해라서 더 집중하고, 버디 퍼트는 안 들어가도 본전이라 조심스럽게 짧게 친다는 것. 작업 논문은 이 편향이 최정상 선수들에게 해마다 상금 120만 달러 넘는 손해라고 계산했다. ※ 이 차이를 모두 손실 회피로 설명할 수는 없다는 반론도 있다. (격자의 성공 수 50·48은 예시, 차이 약 2번만 실제 결과)",
       tags: ["경제", "행동경제학", "손실회피", "골프", "타이거우즈", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 그린 | 1080 점수 카드 | 2160 레이저 측정 | 3240 100번 격자
let WID = 0;

function golfWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#3d7bd1"], [1, "#a9d4f5"]]); lg("hill", [[0, "#5aa65a"], [1, "#2f7a3e"]]);
  lg("green", [[0, "#7cc96f"], [1, "#4fa34f"]]); lg("card", [[0, "#fbf8f1"], [1, "#e6dfcf"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("sky")}, g);
  w.clouds = [300, 1250, 2300, 3300, 4100].map((x, i) => {const c = S("g", {opacity: .85}, g);
    [[0, 0, 70], [60, -20, 80], [130, 0, 66]].forEach(([dx, dy, r]) => S("circle", {cx: x + dx, cy: 200 + (i % 2) * 70 + dy, r, fill: "#fff"}, c)); return c});
  S("path", {d: `M0,820 ${Array.from({length: 25}, (_, i) => `Q${i * 180 + 90},${700 + (i % 3) * 40} ${i * 180 + 180},820`).join(" ")} L${WW},${H} L0,${H} Z`, fill: U("hill")}, g);
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("green")}, g);
  for (let x = 0; x < WW; x += 200) S("path", {d: `M${x},900 L${x + 100},900 L${x - 200},${H} L${x - 300},${H} Z`, fill: "#fff", opacity: .05}, g);
  // 0: 홀과 깃대
  w.flag = img(w.layer, "flag_in_hole", 790, 1000, 260);
  w.ball = S("circle", {cx: 480, cy: 1160, r: 18, fill: "#fff", stroke: "#bbb", "stroke-width": 3}, g);
  w.golfer = img(w.layer, "person_golfing", 400, 1180, 230);
  // 1080: 점수 카드 (파 4 홀)
  const cx = 1080 + 540;
  S("rect", {x: cx - 360, y: 330, width: 720, height: 640, rx: 26, fill: U("card"), stroke: "#c9b98a", "stroke-width": 6}, g);
  ST(g, cx, 420, "이 홀의 기준 타수: 4타", {"font-size": 48, "font-weight": 800, fill: "#2b2b2b"});
  w.sc = [["버디", 3, TEAL, "1타 적게 · 이득"], ["파", 4, "#2b2b2b", "기준 · 본전"], ["보기", 5, CORAL, "1타 더 · 손해"]].map(([t, k, col, sub], i) => {
    const gg = S("g", {opacity: .25}, g), y = 540 + i * 140;
    ST(gg, cx - 220, y + 14, t, {"font-size": 52, "font-weight": 900, fill: col});
    for (let j = 0; j < k; j++) S("circle", {cx: cx - 110 + j * 44, cy: y, r: 17, fill: col}, gg);
    ST(gg, cx + 210, y + 14, sub, {"font-size": 36, "font-weight": 900, fill: col === "#2b2b2b" ? "#555" : col});
    return gg});
  // 2160: 레이저 측정
  w.flag2 = img(w.layer, "flag_in_hole", 2160 + 790, 910, 220);
  w.laser = S("line", {x1: 2160 + 280, y1: 1000, x2: 2160 + 760, y2: 851, stroke: RED, "stroke-width": 6, "stroke-dasharray": "18 10", opacity: 0}, g);
  w.ball2 = S("circle", {cx: 2160 + 280, cy: 1000, r: 16, fill: "#fff", stroke: "#bbb", "stroke-width": 3}, g);
  w.dist = ST(g, 2160 + 520, 920, "", {"font-size": 44, "font-weight": 800, fill: "#fff"});
  // 3240: 100번 격자 둘 (파 퍼트 / 버디 퍼트)
  w.grids = [["파 퍼트", 50, "#fff"], ["버디 퍼트", 48, TEAL]].map(([t, m, col], j) => {
    const x0 = 3240 + 90 + j * 480, y0 = 420;
    ST(g, x0 + 200, y0 - 40, t, {"font-size": 50, "font-weight": 900, fill: j ? TEAL : "#fff"});
    const cells = Array.from({length: 100}, (_, i) => S("circle", {cx: x0 + 20 + (i % 10) * 40, cy: y0 + 20 + Math.floor(i / 10) * 40, r: 15, fill: "#1e4d2b", stroke: "#123", "stroke-width": 2}, g));
    const lab = ST(g, x0 + 200, y0 + 460, "", {"font-size": 46, "font-weight": 900, fill: GOLD});
    return {cells, m, col, lab}});
  // 앞쪽(흐린) 나뭇가지: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(8px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("path", {d: `M${x - 300},0 Q${x},120 ${x + 260},40`, stroke: "#2d4a22", "stroke-width": 30, fill: "none"}, fs);
    for (let k = 0; k < 6; k++) S("ellipse", {cx: x - 240 + k * 90, cy: 60 + (k % 2) * 40, rx: 60, ry: 30, fill: "#3f6e2e"}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("transform", `translate(${(lt * 14 + i * 50) % 200 - 100},0)`));
    imgAt(w.flag, 790 + 4 * Math.sin(lt * 2), 1000, 1, 3 * Math.sin(lt * 2.4))};
  // 퍼트: u 진행, stop 0~1 (1 = 홀까지), 들어가면 사라짐
  w.putt = (u, stop) => {u = clamp(u); const e = 1 - Math.pow(1 - u, 3), k = e * stop;
    w.ball.setAttribute("cx", lerp(480, 752, k)); w.ball.setAttribute("cy", lerp(1160, 930, k));
    w.ball.setAttribute("opacity", stop >= 1 && u > .95 ? 0 : 1)};
  w.score = k => w.sc.forEach((s, i) => s.setAttribute("opacity", k === -1 || i === k || (Array.isArray(k) && k.indexOf(i) >= 0) ? 1 : .25));
  w.measure = u => {u = clamp(u); w.laser.setAttribute("opacity", u > 0 ? 1 : 0);
    w.laser.setAttribute("x2", lerp(2160 + 280, 2160 + 760, ease(u))); w.laser.setAttribute("y2", lerp(1000, 851, ease(u)));
    w.dist.textContent = u > .9 ? "거리 정확히 측정" : ""};
  w.fill = (lt, t0, which) => w.grids.forEach((gr, j) => {if (which.indexOf(j) < 0) return;
    const tt = t0 + j * .3; gr.cells.forEach((c, i) => c.setAttribute("fill", i < gr.m && lt > tt + i * .02 ? gr.col : "#1e4d2b"));
    gr.lab.textContent = lt > tt + gr.m * .02 ? `${gr.m}번 성공` : ""});
  w.putt(0, 1); w.score(-2); w.measure(0); w.fill(-99, 0, [0, 1]);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 (그린) */
scene({id: "hook", lines: [
  ["같은 거리 퍼트, **성공률**이 달라질까?", "골프에서 같은 거리의 퍼트인데, 성공률이 달라질까요?", "pop"],
  ["2011년 **AER**에 실린 논문", "이천십일 년에 나온 논문입니다."],
  ["저자: 포프_교수와 슈바이처_교수", "저자는, 포프 교수, 그리고 슈바이처 교수, 두 사람입니다."]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.h = kin(hud, 170, "같은 거리<br>**다른 성공률**?", 106);
    c.j = kin(hud, 190, "**2011** · AER", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.putt((lt - .8) / 1.6, 1);
    imgAt(w.golfer, 400, 1180, 1, -6 * Math.sin(clamp((lt - .5) / .3) * Math.PI));
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 골프 기초 (그린) */
scene({id: "basics", lines: [
  ["골프: 공을 **적은 횟수로** 홀에 넣는 경기", "골프는, 공을 되도록 적은 횟수로 쳐서, 홀에 넣는 경기입니다.", "pop"],
  ["친 횟수 = **타수**, 적을수록 좋다", "공을 친 횟수를 타수라고 하고, 적을수록 좋습니다."],
  ["마지막에 잔디 위에서 공을 굴려 넣는 샷 = **퍼트**", "마지막에 잔디 위에서, 공을 살살 굴려 홀에 넣는 샷을, 퍼트라고 하죠.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.cnt = CX(hud, 200, "", "", {fontSize: "96px", fontWeight: 900, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.35)"});
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 900, s: lt > L[2] ? lerp(1, 1.15, ease((lt - L[2]) / 2)) : 1}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    const k = lt < L[1] ? 0 : Math.min(4, 1 + Math.floor((lt - L[1]) / .6));
    c.cnt.textContent = lt > L[1] && lt < L[2] ? `${k}타` : "";
    w.putt(lt > L[2] ? (lt - L[2] - .6) / 1.6 : 0, 1);
    imgAt(w.golfer, 400, 1180, 1, lt > L[2] ? -6 * Math.sin(clamp((lt - L[2] - .3) / .3) * Math.PI) : 0);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 3. 파·버디·보기 (점수 카드) */
scene({id: "rules", lines: [
  ["홀마다 정해진 **기준 타수** = 파(Par), 예: 4타", "홀마다 정해진 기준 타수가 있는데, 이것을 파라고 합니다. 예를 들어 이 홀은 네 타입니다.", "pop"],
  ["기준보다 1타 적게 넣으면 **버디**: 이득", "기준보다 한 타 적게 넣으면 버디, 이득이고,", "coin"],
  ["기준보다 1타 더 치면 **보기**(Bogey): 손해", "한 타 더 치면 보기, 손해입니다."]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: lerp(1, 1.05, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9));
    w.score(lt < L[1] ? (lt > 1 ? 1 : -2) : lt < L[2] ? 0 : 2);
    c.o.up(lt, {mood: "normal", point: ease((lt - 1) / .5), look: [.8, -.5]});
  }
});

/* 4. 두 퍼트 (점수 카드) */
scene({id: "putts", lines: [
  ["**버디 퍼트**: 넣으면 버디, 놓쳐도 대개 파를 지킴(본전)", "그래서 버디 퍼트는, 넣으면 버디가 되고, 놓쳐도 대개는, 기준 타수인 파를 지킵니다.", "pop"],
  ["**파 퍼트**: 넣어야 파(본전), 놓치면 보기(손해)", "반면에 파 퍼트의 경우는, 넣어야 겨우 본전인 파가 되고, 놓치면 손해인 보기가 됩니다.", "pop"],
  ["버디 퍼트 = **이득 볼 찬스**, 파 퍼트 = **손해 막을 찬스**", "정리하면, 버디 퍼트는 이득을 볼 찬스, 파 퍼트는 손해를 막을 찬스입니다.", "ding"]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.04}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080);
    w.score(lt < L[1] ? [0, 1] : lt < L[2] ? [1, 2] : -1);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "normal", point: .6, look: [.8, -.5]});
  }
});

/* 5. 왜 이상한가: 한 타의 값은 같다 */
scene({id: "logic", lines: [
  ["순위 = **모든 홀 타수의 합** → 한 타의 무게는 같다", "그런데 프로 대회 순위는, 모든 홀에서 친 횟수를 다 더해서 정합니다. 그러니 어느 홀에서든, 한 번 친 무게는 똑같죠.", "whoosh@0.2"],
  ["같은 거리라면 두 퍼트를 **똑같이 잘** 쳐야 정상", "그렇다면 같은 거리에선, 두 퍼트를 똑같이 잘 쳐야 정상입니다."]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.sum = CX(hud, 200, "<span class='chip' style='font-size:46px'>대회 = 보통 72홀, 타수를 모두 더한다</span>", "", {});
    c.eq = CX(hud, 330, "버디 퍼트 <b style='color:#f2c14e'>=</b> 파 퍼트", "", {fontSize: "84px", fontWeight: 900, color: "#fff", textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "rgba(8,12,22,.5)"});
    c.dim.parentNode.insertBefore(c.dim, c.dim.parentNode.firstChild);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.score(-1); c.dim.style.opacity = P(lt, 0, .4);
    ap(c.sum, lt, .4); ap(c.eq, lt, L[1] + .2, null, {s: .8, back: true});
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 6. 자료 (레이저) */
scene({id: "data", lines: [
  ["미국 프로 선수들의 대회 퍼트 **250만 개** (2004~2009년)", "연구진은 미국 프로 선수들의 대회 퍼트, 이백오십만 개를,", "coin"],
  ["레이저로 잰 **같은 거리**끼리 비교", "레이저로 잰 거리로, 같은 거리끼리 비교했습니다.", "pop"]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.n = CX(hud, 170, "0", "", {fontSize: "140px", fontWeight: 800, color: GOLD, textShadow: "0 6px 0 rgba(0,0,0,.35)"});
    c.nl = CX(hud, 340, "개의 퍼트", "", {fontSize: "52px", fontWeight: 800, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,.4)"});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 860, s: lerp(1, 1.08, ease((lt - L[1]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    countTo(c.n, lt, .8, 0, 2500000, v => Math.round(v).toLocaleString("en-US"), 1.6);
    c.n.style.opacity = P(lt, .7, .3); c.nl.style.opacity = P(lt, .9, .3);
    w.measure((lt - L[1] - .2) / .8);
    c.o.up(lt, {mood: lt > 1.5 && lt < L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 7. 결과 (100번 격자) */
scene({id: "result", lines: [
  ["같은 거리 100번: 버디_퍼트가 **약_2번** 덜 들어갔다", "그런데 같은 거리에서 백 번 치면, 버디 퍼트가 두 번쯤 덜 들어갔습니다.", "ding"],
  ["버디 퍼트는 홀에 못 미치게 **짧게** 친 경우가 더 많았다", "버디 퍼트는, 홀에 못 미치게 짧게 친 경우가 더 많았죠."],
  ["**타이거_우즈** 같은 최정상 선수도 마찬가지", "타이거 우즈 같은 최정상 선수도, 마찬가지였습니다.", "pop"]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.u = CX(hud, 1150, "성공 수 50·48 은 예시 — 차이(약 2번)만 실제 결과", "", {fontSize: "34px", fontWeight: 700, color: "#fff", opacity: .9, textShadow: "0 3px 0 rgba(0,0,0,.4)"});
    c.d = CX(hud, 170, "−2", "", {fontSize: "150px", fontWeight: 900, color: CORAL, textShadow: "0 6px 0 rgba(0,0,0,.35)"});
    c.s = img(hud, "person_golfing", 870, 300, 200);
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.fill(lt, 1, [0, 1]); ap(c.u, lt, 2);
    c.d.style.opacity = P(lt, 3.6, .3) * (1 - P(lt, L[2] - .2, .3));
    const ts = spr((lt - L[2] - .1) / .5); imgAt(c.s, 870, 300, clamp(ts, 0, 1.2), 0); c.s.style.opacity = clamp(ts * 2);
    c.o.up(lt, {mood: lt > L[2] ? "surprised" : lt > L[1] ? "skeptical" : "normal", look: [.7, -.6]});
  }
});

/* 8. 해석: 손실 회피 */
scene({id: "why", lines: [
  ["연구진의 해석: **손실_회피**(Loss Aversion)", "연구진은 이것을, 손실 회피로 해석했습니다.", "pop"],
  ["같은 크기라도 **잃는 아픔**을 더 크게 느낀다", "같은 크기라도, 얻는 기쁨보다 잃는 아픔을, 더 크게 느끼는 것이죠."],
  ["파 퍼트를 놓치면 **손해** → 더 집중해서 친다", "파를 기준으로 보면, 파 퍼트를 놓치는 건 손해라서, 더 집중해서 칩니다."],
  ["버디 퍼트는 안 들어가도 본전 → **조심스럽게, 짧게**", "반면 버디 퍼트는 안 들어가도 본전이라, 조심스럽게, 짧게 치는 거죠.", "ding"]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.72)"});
    c.sc = svgLayer(hud);
    const g = c.sc;
    S("line", {x1: 540, y1: 380, x2: 540, y2: 960, stroke: "#fff", "stroke-width": 8}, g);
    S("path", {d: "M450,990 L630,990 L540,935 Z", fill: GOLD}, g);
    c.beam = S("g", {}, g);
    S("rect", {x: 170, y: 372, width: 740, height: 18, rx: 9, fill: "#fff"}, c.beam);
    S("circle", {cx: 540, cy: 381, r: 22, fill: GOLD, stroke: "#fff", "stroke-width": 6}, g);
    c.pl = S("g", {}, g); c.pr = S("g", {}, g);
    [[c.pl, "얻는 기쁨", TEAL], [c.pr, "잃는 아픔", CORAL]].forEach(([p, t, col]) => {
      S("path", {d: "M-130,0 L130,0 Q100,70 0,70 Q-100,70 -130,0 Z", fill: col}, p);
      ST(p, 0, 130, t, {"font-size": 56, "font-weight": 800, fill: "#fff"})});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.layer.style.opacity = 1 - .8 * P(lt, 0, .5);
    c.dim.style.opacity = P(lt, 0, .5); c.sc.style.opacity = P(lt, L[1] - .2, .4);
    const a = 14 * ease((lt - L[1] - .3) / .8) * Math.PI / 180;
    c.beam.setAttribute("transform", `rotate(${a * 180 / Math.PI} 540 381)`);
    c.pl.setAttribute("transform", `translate(${540 - 340 * Math.cos(a)},${560 - 340 * Math.sin(a)})`);
    c.pr.setAttribute("transform", `translate(${540 + 340 * Math.cos(a)},${560 + 340 * Math.sin(a)})`);
    c.o.up(lt, {mood: lt > L[3] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 9. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**타이거_우즈도 손실을 싫어할까?**〉", "논문 제목은, 타이거 우즈도 손실을 싫어할까 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: golfWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1040, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.putt((lt - 1) / 1.6, .82);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
