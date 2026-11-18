/* 오늘의 경제 031 — 폭스 뉴스 효과 (v3: 부엉이 진행자·한 공간 카메라 이동·뉴스 TV·100동네 격자·1,000표 점·접전 저울)
   논문: DellaVigna, S. & Kaplan, E. (2007) "The Fox News Effect: Media Bias and Voting",
         Quarterly Journal of Economics 122(3): 1187–1234. doi:10.1162/qjec.122.3.1187 (NBER WP 12169)
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 학술지 초록·저자 판 초록 인용으로 확인):
   - 1996년 10월~2000년 11월, 보수 성향 폭스 뉴스가 미국 동네(town)의 20%에서 케이블 편성에 들어감(자료 9,256개 동네)
   - 폭스 뉴스를 볼 수 있던 동네에서 공화당이 0.4~0.7%포인트 더 얻음(1996→2000 대선 득표 변화 비교)
   - 투표율·상원 공화당 득표에도 영향
   - 시청자 측정 방식에 따라 시청자(비공화 성향)의 3~28%를 설득한 셈 → 설명란
   - 편성 여부는 몇 가지 통제 아래 지역 정치 성향과 거의 무관(저자 확인) — 영상은 '거의 상관없었다'로
   점: 1,000표 중 4~7표(=0.4~0.7%p). 격자: 100칸 중 20칸. */
Object.assign(EP, {no: 31, style: "v2", title: "폭스 뉴스 효과", hook: "뉴스 채널 하나가 선거를 바꿀 수 있을까?",
  bgm: {seed: 1187, bpm: 102, mood: "tense"},
  paper: {journal: "Quarterly Journal of Economics", year: 2007, authors: "Stefano DellaVigna & Ethan Kaplan",
          title: "The Fox News Effect: Media Bias and Voting", ko: "폭스 뉴스 효과: 언론 편향과 투표",
          cite: "122(3): 1187–1234", url: "https://doi.org/10.1162/qjec.122.3.1187"},
  yt: {title: "뉴스 채널 하나가 선거를 바꿀 수 있을까? | 폭스 뉴스 효과 #경제 #shorts",
       desc: "1996년 미국에서 보수 성향의 뉴스 채널 폭스 뉴스가 시작됐다. 그런데 케이블 방송 회사마다 이 채널을 넣은 시기가 달라, 2000년까지 미국 동네 중 20%에서만 폭스 뉴스를 볼 수 있었다. 연구진은 어느 동네에 먼저 들어갔는지가 (몇 가지 조건을 맞추면) 그 동네의 정치 성향과 거의 상관이 없었다는 점을 확인하고, 폭스 뉴스를 볼 수 있던 동네와 없던 동네에서 1996년과 2000년 대통령 선거 사이 투표가 어떻게 바뀌었는지 비교했다(9,256개 동네). 그 결과 폭스 뉴스를 볼 수 있던 동네에서 보수 정당인 공화당의 득표율이 0.4~0.7%포인트 더 올랐다. 1,000표 중 4~7표꼴이다. 작아 보여도 아주 접전인 선거라면 승패를 가를 수도 있는 크기다. 투표율과 상원 선거 결과에도 영향이 있었다. 시청자 수를 어떻게 세느냐에 따라, 폭스 뉴스가 시청자의 3~28%를 공화당 쪽으로 설득한 셈이라고 연구진은 계산했다. 연구진은 언론의 치우친 보도(Media Bias)가 실제로 표를 움직였다고 봤다.",
       tags: ["경제", "정치경제학", "언론", "선거", "폭스뉴스", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 뉴스 TV | 1080 100동네 | 2160 1,000표 | 3240 접전 저울
let WID = 0;

function foxWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("bg", [[0, "#0a1230"], [1, "#1a2450"]]); lg("floor", [[0, "#141a30"], [1, "#080b16"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("bg")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  w.stars = Array.from({length: 40}, (_, i) => S("rect", {x: (i * 113) % WW, y: 140 + (i * 37) % 300, width: 8, height: 8, fill: i % 2 ? RED : BLUE, opacity: .25}, g));
  // 0: 뉴스 TV
  S("rect", {x: 200, y: 330, width: 680, height: 440, rx: 26, fill: "#0b0f1c", stroke: "#4a4a6a", "stroke-width": 12}, g);
  w.scr = S("rect", {x: 220, y: 350, width: 640, height: 400, rx: 14, fill: "#1a3a7a"}, g);
  ST(g, 540, 520, "폭스 뉴스", {"font-size": 92, "font-weight": 900, fill: "#fff"});
  ST(g, 540, 600, "1996년 시작", {"font-size": 46, "font-weight": 800, fill: GOLD});
  w.ticker = S("rect", {x: 220, y: 680, width: 640, height: 60, fill: RED}, g);
  w.tickT = ST(g, 540, 722, "보수 성향 뉴스 채널", {"font-size": 38, "font-weight": 900, fill: "#fff"});
  // 1080: 100동네 격자 (20칸 = 폭스 뉴스)
  const r = rng(31), pick = new Set(); while (pick.size < 20) pick.add(Math.floor(r() * 100));
  w.towns = Array.from({length: 100}, (_, i) => ({e: S("rect", {x: 1080 + 190 + (i % 10) * 72, y: 260 + Math.floor(i / 10) * 66, width: 60, height: 54, rx: 10, fill: "#3a4060"}, g), on: pick.has(i)}));
  w.tLab = ST(g, 1080 + 540, 970, "", {"font-size": 46, "font-weight": 900, fill: GOLD});
  // 2160: 1,000표 점 (40×25)
  w.dots = Array.from({length: 1000}, (_, i) => S("circle", {cx: 2160 + 150 + (i % 40) * 20, cy: 330 + Math.floor(i / 40) * 22, r: 7, fill: "#5a6080", opacity: 0}, g));
  w.vLab = ST(g, 2160 + 540, 270, "투표 1,000표", {"font-size": 46, "font-weight": 900, fill: "#fff", opacity: 0});
  w.vRes = ST(g, 2160 + 540, 960, "", {"font-size": 52, "font-weight": 900, fill: RED});
  // 3240: 접전 저울
  w.scale = img(w.layer, "scale", 3240 + 540, 900, 420);
  w.close = ST(g, 3240 + 540, 360, "접전 선거", {"font-size": 72, "font-weight": 900, fill: "#fff", opacity: 0});
  // 앞쪽(흐린) 스튜디오 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {S("rect", {x: x - 150, y: 40, width: 300, height: 40, rx: 10, fill: "#02040a"}, fs);
    for (let k = 0; k < 4; k++) S("circle", {cx: x - 100 + k * 66, cy: 100, r: 22, fill: k % 2 ? "#ff9a9a" : "#9ad0ff", opacity: .5}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.stars.forEach((s, i) => s.setAttribute("opacity", .15 + .2 * Math.abs(Math.sin(lt + i))));
    w.scr.setAttribute("fill", mixc("#1a3a7a", "#2a2a6a", .5 + .5 * Math.sin(lt * 1.4))); w.tickT.setAttribute("x", 540 + 20 * Math.sin(lt))};
  w.townOn = (lt, t0, t1) => {w.towns.forEach((t, i) => t.e.setAttribute("fill", lt > t0 + i * .01 ? (t.on && lt > t1 ? CORAL : "#5a6080") : "#3a4060"));
    w.tLab.textContent = lt > t1 + .5 ? "100동네 중 20동네만 볼 수 있었다" : (lt > t0 ? "케이블에 넣은 시기가 제각각" : "")};
  w.vote = (lt, t0, t1) => {w.vLab.setAttribute("opacity", P(lt, t0, .3));
    const ex = [215, 412, 588, 790, 333, 671, 901];
    w.dots.forEach((dd, i) => {dd.setAttribute("opacity", lt > t0 + (i % 40) * .01 ? 1 : 0);
      const k = ex.indexOf(i); dd.setAttribute("fill", k >= 0 && lt > t1 + k * .15 ? (k < 4 ? RED : "#ff9a9a") : "#5a6080"); dd.setAttribute("r", k >= 0 && lt > t1 ? 11 : 7)});
    w.vRes.textContent = lt > t1 + 1.2 ? "1,000표 중 4~7표 = 0.4~0.7%p" : ""};
  w.tilt = (lt, t0) => {w.close.setAttribute("opacity", P(lt, t0, .3)); imgAt(w.scale, 3240 + 540, 900, 1, lt > t0 ? 6 * Math.sin((lt - t0) * 2) * Math.exp(-(lt - t0) * .3) + 4 : 0)};
  w.townOn(-99, 99, 99); w.vote(-99, 99, 99); w.tilt(-99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["뉴스 채널 하나가 **선거**를 바꿀 수 있을까?", "뉴스 채널 하나가, 선거 결과를 바꿀 수 있을까요?", "pop"],
  ["2007년 **QJE**에 실린 논문", "이천칠 년에 나온 논문입니다."],
  ["저자: 델라비냐_교수와 캐플런_교수", "이 논문은, 델라비냐 교수, 그리고 캐플런 교수, 두 사람이 썼습니다."]],
  build(el, hud) {
    const c = {w: foxWorld(el)};
    c.h = kin(hud, 120, "뉴스 채널이 **선거**를?", 88);
    c.j = kin(hud, 120, "**2007** · QJE", 96);
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

/* 2. 배경: 들어간 시기가 제각각 */
scene({id: "setting", lines: [
  ["1996년 시작한 **보수 성향** 뉴스 채널, 폭스 뉴스", "천구백구십육 년, 미국에서 보수 성향의 뉴스 채널, 폭스 뉴스가 시작됐습니다.", "pop"],
  ["케이블 회사마다 이 채널을 **넣은 시기가 달랐다**", "그런데 케이블 방송 회사마다, 이 채널을 넣은 시기가 달랐습니다.", "whoosh@0.2"],
  ["2000년까지 미국 동네 **20%**에서만 볼 수 있었다", "그래서 이천 년까지, 미국 동네 중 이십 퍼센트에서만, 폭스 뉴스를 볼 수 있었죠."]],
  build(el, hud) {
    const c = {w: foxWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? 0 : whip(lt, L[1], 0, 1080, .9)); w.townOn(lt, L[1] + .8, L[2] + .2);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 3. 방법 */
scene({id: "method", lines: [
  ["먼저 들어간 동네는 **정치 성향과 거의 무관**", "연구진은, 어느 동네에 먼저 들어갔는지가, 그 동네의 정치 성향과는 거의 상관없었다는 점을 확인했습니다."],
  ["두 동네의 **4년 사이 투표 변화**를 비교", "그래서 폭스 뉴스를 볼 수 있던 동네와, 볼 수 없던 동네에서, 천구백구십육 년과 이천 년 대통령 선거 사이에, 투표가 어떻게 바뀌었는지 비교했습니다.", "pop"]],
  build(el, hud) {
    const c = {w: foxWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 700, s: lerp(1.02, 1.08, ease(lt / 8))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(1080); w.townOn(99, 0, 0);
    c.o.up(lt, {mood: lt > L[1] ? "normal" : "skeptical", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["볼 수 있던 동네: 공화당 득표 **0.4~0.7%p 더**", "그 결과, 폭스 뉴스를 볼 수 있던 동네에서, 보수 정당인 공화당의 득표율이, 영 점 사에서 영 점 칠 퍼센트포인트 더 올랐습니다.", "coin"],
  ["작아 보여도 **접전 선거**라면 승패를 가를 수 있는 크기", "작아 보여도, 아주 접전인 선거라면, 승패를 가를 수도 있는 크기죠.", "whoosh@0.2"],
  ["**투표율**과 **상원 선거**에도 영향", "투표율과 상원 선거 결과에도, 영향이 있었습니다."]],
  build(el, hud) {
    const c = {w: foxWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(lt < L[1] ? whip(lt, 0, 1080, 2160, .9) : whip(lt, L[1], 2160, 3240, .9));
    w.vote(lt, .9, 2.4); w.tilt(lt, L[1] + .6);
    c.o.up(lt, {mood: lt > L[0] + 3 && lt < L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 뜻 */
scene({id: "meaning", lines: [
  ["**치우친_보도**(Media Bias)가 표를 움직였다", "연구진은, 언론의 치우친 보도가, 실제로 표를 움직였다고 봤습니다.", "ding"]],
  build(el, hud) {
    const c = {w: foxWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1.2)); w.tilt(99, 0);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**폭스 뉴스 효과**: 언론 편향과 투표〉", "논문 제목은, 폭스 뉴스 효과, 언론 편향과 투표입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: foxWorld(el)};
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
