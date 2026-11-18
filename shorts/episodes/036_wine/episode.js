/* 오늘의 경제 036 — 날씨로 맞히는 와인 (v3: 부엉이 진행자·한 공간 카메라 이동·포도밭·빈티지 병·숙성·날씨 공식 판)
   논문: Ashenfelter, O. (2008) "Predicting the Quality and Prices of Bordeaux Wine", Economic Journal 118(529): F174–F184.
         doi:10.1111/j.1468-0297.2008.02148.x
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록(RePEc/OUP)·동반 논문 요약·2차 정리로 확인):
   - 초록: 보르도 와인은 수백 년 동안 거의 같은 방식으로 만들어졌고, 빈티지별 품질·가격의 변동은 포도를 키운 날씨로 예측된다
   - 동반 논문(Ashenfelter, Ashmore & LaLonde): 최고급 와인은 어릴 때 떫어(astringent) 많은 사람에게 불쾌, 숙성되며 나아짐 → 품질을 숙성 와인 가격으로 잼
   - 변수: 와인의 나이, 4~9월 평균 기온, 8~9월 강수, 전년 10~3월(겨울) 강수
   - 방향(2차 정리의 계수 부호): 기온 +, 8~9월 비 −, 겨울 비 +, 나이 + — 계수 값은 출처마다 달라 쓰지 않음
   - 파커 일화·'전문가보다 정확' 같은 주장은 확인 못 해 쓰지 않음
   병 높이는 예시(해마다 값이 다르다는 것만). */
Object.assign(EP, {no: 36, style: "v2", title: "날씨로 맞히는 와인", hook: "와인 맛을 날씨 공식으로 맞힐 수 있을까?",
  bgm: {seed: 174, bpm: 92, mood: "calm"},
  paper: {journal: "Economic Journal", year: 2008, authors: "Orley Ashenfelter",
          title: "Predicting the Quality and Prices of Bordeaux Wine", ko: "보르도 와인의 품질과 가격 예측",
          cite: "118(529): F174–F184", url: "https://doi.org/10.1111/j.1468-0297.2008.02148.x"},
  yt: {title: "와인 맛을 날씨 공식으로 맞힐 수 있을까? | 보르도 와인 방정식 #경제 #shorts",
       desc: "프랑스 보르도 와인은 수백 년 동안 거의 같은 방식으로 만들어 왔다. 그런데 포도를 딴 해(빈티지)마다 맛과 값이 크게 다르다. 문제는 갓 만든 고급 와인은 떫고 거칠어서 맛을 보고 판단하기가 어렵다는 것. 여러 해 숙성돼야 진짜 맛이 드러난다. 만드는 방식이 같다면 해마다 달라지는 건 결국 포도를 키운 날씨다. 그래서 아셴펠터 교수는 4~9월의 기온, 8~9월의 비, 겨울(10~3월)의 비, 그리고 와인의 나이로 공식을 만들었다. 포도가 자라는 여름이 따뜻할수록 좋고, 수확 직전인 8~9월에 비가 많으면 나쁘고, 그 전 겨울에는 비가 넉넉할수록 좋았다. 오래 묵은 와인일수록 값이 높았다. 이 공식이 해마다 다른 와인의 품질과 값을 잘 예측했다. 날씨는 포도를 딸 때 이미 다 알 수 있으니, 와인을 맛보기도 전에 몇 년 뒤의 품질을 미리 알 수 있는 셈이다. 전문가의 감각만이 아니라 자료와 공식도 큰 힘을 발휘할 수 있다는 걸 보여 준 연구다. (병 높이는 해마다 값이 다르다는 것만 나타낸 예시다.)",
       tags: ["경제", "와인", "회귀분석", "예측", "날씨", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", WINE = "#8a1f3a";
const WW = 4320;                       // 세계 너비: 0 포도밭 | 1080 빈티지 병 | 2160 숙성 | 3240 날씨 공식
let WID = 0;

function wineWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#5a7ac0"], [.7, "#e8b07a"], [1, "#f4d4a0"]]); lg("hill", [[0, "#7a9a4a"], [1, "#3e5a22"]]); lg("cellar", [[0, "#2a1a14"], [1, "#140c08"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("path", {d: `M0,780 ${Array.from({length: 25}, (_, i) => `Q${i * 180 + 90},${700 + (i % 3) * 30} ${i * 180 + 180},780`).join(" ")} L${WW},${H} L0,${H} Z`, fill: U("hill")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: "#4a3a22"}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 160 + (i % 3) * 60, rx: 150, ry: 36, fill: "#fff", opacity: .6}, g));
  // 0: 포도밭 줄
  for (let r0 = 0; r0 < 4; r0++) S("line", {x1: 40, y1: 830 + r0 * 50, x2: 1040, y2: 830 + r0 * 50, stroke: "#2e4a1a", "stroke-width": 10, "stroke-dasharray": "40 20"}, g);
  w.grapes = [180, 400, 620, 840].map((x, i) => img(w.layer, "grapes", x, 900 + (i % 2) * 40, 130));
  w.glass = img(w.layer, "wine_glass", 820, 620, 170);
  ST(g, 400, 640, "프랑스 보르도", {"font-size": 64, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2a1a", "stroke-width": 10});
  // 1080: 빈티지 병 (해마다 값이 다름 — 예시 높이)
  w.bottles = [["1986", 330], ["1987", 200], ["1988", 300], ["1989", 420], ["1990", 460]].map(([y, h], i) => {
    const x = 1080 + 160 + i * 190, gg = S("g", {opacity: 0}, g);
    S("rect", {x: x - 40, y: 960 - h, width: 80, height: h, rx: 18, fill: WINE, stroke: "#3a0a14", "stroke-width": 4}, gg);
    S("rect", {x: x - 14, y: 960 - h - 60, width: 28, height: 70, rx: 8, fill: WINE}, gg);
    S("rect", {x: x - 34, y: 960 - h * .55, width: 68, height: 50, rx: 6, fill: "#f4ead0"}, gg);
    ST(gg, x, 960 - h * .55 + 34, y, {"font-size": 24, "font-weight": 900, fill: "#3a0a14"});
    return gg});
  w.bLab = ST(g, 1080 + 540, 350, "같은 방식, 해마다 다른 값", {"font-size": 54, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#3a2a1a", "stroke-width": 10, opacity: 0});
  // 2160: 숙성 (지하 저장고)
  S("rect", {x: 2160, y: 0, width: 1080, height: 1000, fill: U("cellar")}, g);
  for (let k = 0; k < 6; k++) S("ellipse", {cx: 2160 + 160 + k * 150, cy: 880, rx: 70, ry: 90, fill: "#6a4a2a", stroke: "#3a2414", "stroke-width": 8}, g);
  w.young = img(w.layer, "grimace", 2160 + 330, 560, 200);
  w.yLab = ST(g, 2160 + 330, 330, "갓 만든 와인: 떫다", {"font-size": 48, "font-weight": 900, fill: CORAL, opacity: 0});
  w.hour = img(w.layer, "hourglass_done", 2160 + 760, 560, 200);
  w.hLab = ST(g, 2160 + 760, 330, "여러 해 숙성", {"font-size": 48, "font-weight": 900, fill: GOLD, opacity: 0});
  // 3240: 날씨 공식 판
  S("rect", {x: 3240 + 90, y: 200, width: 900, height: 780, rx: 30, fill: "#f4ead0", stroke: "#8a6a3a", "stroke-width": 10}, g);
  ST(g, 3240 + 540, 290, "와인 값 공식", {"font-size": 60, "font-weight": 900, fill: WINE});
  w.terms = [["thermometer", "4~9월 기온", "↑", "#2e8a4a"], ["cloud_with_rain", "8~9월 비", "↓", RED], ["snowflake", "겨울 비", "↑", "#2e8a4a"], ["hourglass_done", "와인의 나이", "↑", "#2e8a4a"]].map(([ic, t, ar, col], i) => {
    const y = 400 + i * 140, gg = S("g", {opacity: 0}, g);
    ST(gg, 3240 + 420, y + 18, t, {"font-size": 50, "font-weight": 900, fill: "#2b2b2b", "text-anchor": "start"});
    ST(gg, 3240 + 860, y + 22, ar, {"font-size": 72, "font-weight": 900, fill: col});
    const im = img(w.layer, ic, 3240 + 300, y + 60, 100); im.style.opacity = 0; return {gg, im}});
  // 앞쪽(흐린) 포도잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {for (let j = 0; j < 6; j++) S("ellipse", {cx: x - 160 + j * 70, cy: 40 + (j % 2) * 40, rx: 50, ry: 30, fill: "#2a4a1a", opacity: .9}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 12 * (1 + i % 3)) % WW));
    w.grapes.forEach((e, i) => imgAt(e, [180, 400, 620, 840][i], 900 + (i % 2) * 40, 1, 4 * Math.sin(lt * 1.5 + i)));
    imgAt(w.glass, 820, 620, 1, 4 * Math.sin(lt * 1.2))};
  w.vint = (lt, t0) => {w.bottles.forEach((b, i) => {const u = spr((lt - t0 - i * .2) / .5); b.setAttribute("opacity", clamp(u * 2))}); w.bLab.setAttribute("opacity", P(lt, t0 + 1, .3))};
  w.age = (lt, ty, th) => {const u = spr((lt - ty) / .5), v = spr((lt - th) / .5);
    imgAt(w.young, 2160 + 330, 560, clamp(u, 0, 1.2), 4 * Math.sin(lt * 5)); w.young.style.opacity = clamp(u * 2); w.yLab.setAttribute("opacity", P(lt, ty, .3));
    imgAt(w.hour, 2160 + 760, 560, clamp(v, 0, 1.2), (lt - th) * 40); w.hour.style.opacity = clamp(v * 2); w.hLab.setAttribute("opacity", P(lt, th, .3))};
  w.form = (lt, ts) => w.terms.forEach((t, i) => {const on = lt > ts[i]; t.gg.setAttribute("opacity", P(lt, ts[i], .3));
    const u = spr((lt - ts[i]) / .5); imgAt(t.im, 3240 + 300, 400 + i * 140 + 60, clamp(u, 0, 1.2), 0); t.im.style.opacity = on ? clamp(u * 2) : 0});
  w.vint(-99, 99); w.age(-99, 99, 99); w.form(-99, [99, 99, 99, 99]);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["와인 맛을 **날씨 공식**으로 맞힐 수 있을까?", "와인의 맛을, 날씨 공식으로 맞힐 수 있을까요?", "pop"],
  ["2008년 **이코노믹 저널**에 실린 논문", "이천팔 년에 나온 논문입니다."],
  ["저자: 아셴펠터_교수", "저자는, 프린스턴 대학의 아셴펠터 교수입니다."]],
  build(el, hud) {
    const c = {w: wineWorld(el)};
    c.h = kin(hud, 120, "와인 맛 = **날씨 공식**?", 88);
    c.j = kin(hud, 120, "**2008** · 이코노믹 저널", 84);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 문제 */
scene({id: "problem", lines: [
  ["보르도 와인: 수백 년 동안 **같은 방식**으로 만든다", "프랑스 보르도 와인은, 수백 년 동안, 거의 같은 방식으로 만들어 왔습니다.", "pop"],
  ["그런데 **해마다**(빈티지) 맛과 값이 크게 다르다", "그런데 포도를 딴 해마다, 맛과 값이 크게 다르죠. 이 해를 빈티지라고 부릅니다.", "whoosh@0.2"],
  ["갓 만든 고급 와인은 **떫어서** 맛으로 판단하기 어렵다", "문제는, 갓 만든 고급 와인은 떫은맛이 강하고 거칠어서, 맛을 보고 판단하기가 어렵다는 겁니다.", "whoosh@0.2"],
  ["여러 해 **숙성**돼야 진짜 맛이 드러난다", "여러 해 숙성돼야, 진짜 맛이 드러나거든요."]],
  build(el, hud) {
    const c = {w: wineWorld(el)};
    c.u = CX(hud, 1150, "병 높이는 예시: 해마다 값이 다르다는 것만", "", {fontSize: "32px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt);
    w.pan(lt < L[1] ? 0 : lt < L[2] ? whip(lt, L[1], 0, 1080, .9) : whip(lt, L[2], 1080, 2160, .9));
    w.vint(lt, L[1] + .6); ap(c.u, lt, L[1] + 1, L[2]); w.age(lt, L[2] + .7, L[3] + .2);
    c.o.up(lt, {mood: lt > L[2] && lt < L[3] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 아이디어와 공식 */
scene({id: "formula", lines: [
  ["방식이 같다면, 해마다 다른 건 **포도를 키운 날씨**", "만드는 방식이 같다면, 해마다 달라지는 건 결국, 포도를 키운 날씨입니다.", "ding"],
  ["공식 재료: **기온**, 수확 직전 **비**, 겨울 **비**, 와인 **나이**", "그래서 이 연구는, 사월부터 구월의 기온, 팔월과 구월의 비, 겨울의 비, 그리고 와인의 나이로, 공식을 만들었습니다.", "pop"],
  ["포도가 크는 여름에는 **따뜻할수록** 좋았고", "포도가 크는 여름에는, 따뜻할수록 좋았고,"],
  ["수확 직전 8~9월에 **비가 많으면** 나쁘고", "수확 직전인 팔월과 구월에, 비가 많으면 나쁘고,"],
  ["그 전 겨울엔 **비가 넉넉할수록** 좋았다", "그 전 겨울에는, 비가 넉넉할수록 좋았습니다."],
  ["**오래 묵은** 와인일수록 값이 높았다", "그리고 오래 묵은 와인일수록, 값이 높았죠."]],
  build(el, hud) {
    const c = {w: wineWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: lt > L[1] ? 600 : 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, 1)); w.age(99, 0, 0);
    w.form(lt, [L[2], L[3], L[4], L[5]]);
    c.o.up(lt, {mood: lt > L[5] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 4. 결과와 뜻 */
scene({id: "result", lines: [
  ["이 공식이 해마다 다른 **품질과 값을 잘 예측**했다", "이 공식이, 해마다 다른 와인의 품질과 값을, 잘 예측했습니다.", "ding"],
  ["날씨는 수확 때 이미 안다 → **맛보기 전에** 품질 예측", "날씨는 포도를 딸 때 이미 다 알 수 있으니, 와인을 맛보기도 전에, 몇 년 뒤의 품질을 미리 알 수 있는 셈이죠.", "coin"],
  ["전문가의 감각만이 아니라 **자료와 공식**도 힘이 있다", "전문가의 감각만이 아니라, 자료와 공식도, 큰 힘을 발휘할 수 있다는 걸 보여 준 연구입니다.", "ding"]],
  build(el, hud) {
    const c = {w: wineWorld(el)};
    c.ok = CX(hud, 1080, "<span class='chip' style='font-size:48px;background:#f2c14e;color:#10182a;border-color:#f2c14e'>예측 ✔</span>", "", {});
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: lerp(1.02, 1.08, ease(lt / 8))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? 3240 : whip(lt, L[1], 3240, 0, 1.2)); w.form(99, [0, 0, 0, 0]);
    ap(c.ok, lt, .4, L[1]);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "normal", look: [.7, -.5]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**보르도 와인의 품질과 가격 예측**〉", "논문 제목은, 보르도 와인의 품질과 가격 예측입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: wineWorld(el)};
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
