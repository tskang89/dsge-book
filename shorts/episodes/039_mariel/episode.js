/* 오늘의 경제 039 — 마리엘 보트 이민 (v3: 부엉이 진행자·한 공간 카메라 이동·바다와 배·노동자 격자·다섯 도시·논쟁 말풍선)
   논문: Card, D. (1990) "The Impact of the Mariel Boatlift on the Miami Labor Market",
         Industrial and Labor Relations Review 43(2): 245–257. doi:10.1177/001979399004300205
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·후속 논문·검색 요약으로 확인):
   - 1980년 마리엘 보트 이민, 약 12만 5천 명(보하스 2017 등), 몇 달 사이 도착
   - 초록: 마이애미 노동력 약 7% 증가, 저숙련 노동자의 임금·실업률에 사실상 영향 없음, 앞서 온 쿠바 이민자에게도
   - 카드: 앞선 이민 물결로 이민자 흡수에 익숙했던 점 등을 설명으로 제시(요약)
   - 비교 도시 4곳(이름은 확인 못 해 쓰지 않음)
   - 반론: Borjas(2017, ILR Review) — 고등학교 중퇴 남성 표본에서 큰 임금 하락. 재반박: Peri & Yasenov(2019, 합성 통제법) 효과 없음,
     Clemens & Hunt(2017) 표본 구성 변화로 설명 → 결론을 흔드는 반론이라 영상에 넣음(배율 수치는 확인 못 해 쓰지 않음)
   - 카드: 2021년 노벨 경제학상
   격자: 100명 + 7명 = 약 7% 증가. 도시 막대는 '차이 없음'의 모양만. */
Object.assign(EP, {no: 39, style: "v2", title: "마리엘 보트 이민", hook: "이민자가 몰려오면 임금이 떨어질까?",
  bgm: {seed: 245, bpm: 98, mood: "calm"},
  paper: {journal: "Industrial and Labor Relations Review", year: 1990, authors: "David Card",
          title: "The Impact of the Mariel Boatlift on the Miami Labor Market", ko: "마리엘 보트 이민이 마이애미 노동시장에 미친 영향",
          cite: "43(2): 245–257", url: "https://doi.org/10.1177/001979399004300205"},
  yt: {title: "이민자가 몰려오면 임금이 떨어질까? | 마리엘 보트 이민 #경제 #shorts",
       desc: "1980년 쿠바 정부가 갑자기 쿠바의 항구 도시 마리엘에서 원하는 사람은 떠나도 된다고 했다. 몇 달 만에 약 12만 5천 명이 배를 타고 미국으로 건너왔고, 상당수가 마이애미에 자리를 잡아 이 도시에서 일하는 사람이 약 7% 늘었다. 이들은 마이애미에 일자리가 많아서 온 게 아니라 쿠바의 갑작스러운 결정 때문에 왔다. 그래서 자연이 만들어 준 실험, 즉 자연 실험(Natural Experiment)이라고 부른다. 카드 교수는 마이애미와 비슷한 다른 미국 도시 네 곳의 임금과 실업률을 비교했다. 그 결과 학력이 낮은 노동자의 임금과 실업률이 다른 도시와 거의 차이가 없었고, 먼저 와 있던 쿠바 이민자들조차 영향을 거의 받지 않았다. 카드 교수는 마이애미가 앞선 이민 물결로 이민자를 받아들이는 데 익숙한 도시였다는 점 등을 들었다. 그런데 2017년 보하스 교수는 고등학교를 마치지 못한 남성만 따로 보면 임금이 크게 떨어졌다고 반박했다. 반면 다른 연구들은 가상의 비교 도시를 만들어 봐도(합성 통제법, 28편) 효과가 거의 없었다고 다시 반박했다. 이 사건은 40년 가까이 이어지는 이민 경제학의 대표적인 논쟁거리다. 카드 교수는 2021년 노벨 경제학상을 받았다. (도시 막대는 모양만 나타낸 그림이다.)",
       tags: ["경제", "이민", "노동시장", "자연실험", "데이비드카드", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 바다와 배 | 1080 노동자 격자 | 2160 다섯 도시 | 3240 논쟁
let WID = 0;

function seaWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#2a8ad0"], [1, "#a8e0f0"]]); lg("sea", [[0, "#1a7ab0"], [1, "#0a3a5a"]]); lg("city", [[0, "#3a4a6a"], [1, "#1a2440"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: "#2a2418"}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: 24, fill: "#c8b47a"}, g);
  w.clouds = Array.from({length: 8}, (_, i) => S("ellipse", {cx: 200 + i * 540, cy: 160 + (i % 3) * 60, rx: 150, ry: 36, fill: "#fff", opacity: .7}, g));
  // 0: 바다 + 배 + 마이애미 스카이라인
  S("rect", {x: 0, y: 760, width: 1080, height: 240, fill: U("sea")}, g);
  w.waves = Array.from({length: 3}, () => S("path", {d: "", stroke: "#cfefff", "stroke-width": 4, fill: "none", opacity: .4}, g));
  for (let i = 0; i < 5; i++) {const h = 200 + (i % 3) * 90; S("rect", {x: 820 + i * 50, y: 760 - h, width: 44, height: h, fill: U("city")}, g)}
  ST(g, 930, 300, "마이애미", {"font-size": 48, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a4a", "stroke-width": 8});
  ST(g, 170, 300, "쿠바 마리엘 항구", {"font-size": 44, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a4a", "stroke-width": 8});
  w.boats = Array.from({length: 5}, (_, i) => img(w.layer, "sailboat", 0, 0, 110 + (i % 2) * 30));
  w.yr = ST(g, 540, 200, "1980년", {"font-size": 70, "font-weight": 900, fill: "#fff", "paint-order": "stroke", stroke: "#1a2a4a", "stroke-width": 10, opacity: 0});
  // 1080: 노동자 격자 100 + 7
  w.wk = Array.from({length: 107}, (_, i) => {const k = i < 100 ? i : i, x = 1080 + 150 + (k % 10) * 82, y = 300 + Math.floor(k / 10) * 64;
    return S("circle", {cx: x, cy: y, r: 22, fill: i < 100 ? "#c9cfe6" : CORAL, opacity: 0}, g)});
  w.wLab = ST(g, 1080 + 540, 230, "", {"font-size": 48, "font-weight": 900, fill: "#10182a"});
  // 2160: 다섯 도시 막대(모양만)
  w.cities = ["마이애미", "도시 A", "도시 B", "도시 C", "도시 D"].map((t, i) => {const x = 2160 + 150 + i * 195;
    const tw = S("rect", {x: x - 60, y: 400, width: 120, height: 500, rx: 10, fill: i ? "#6a7a9a" : CORAL, opacity: 0}, g);
    const lab = ST(g, x, 950, t, {"font-size": 36, "font-weight": 900, fill: "#10182a", opacity: 0}); return {tw, lab}});
  w.flat = S("path", {d: "", stroke: GOLD, "stroke-width": 10, fill: "none", opacity: 0}, g);
  w.cLab = ST(g, 2160 + 540, 330, "저학력 노동자 임금·실업률", {"font-size": 44, "font-weight": 900, fill: "#10182a", opacity: 0});
  w.same = ST(g, 2160 + 540, 260, "거의 차이 없음", {"font-size": 60, "font-weight": 900, fill: "#2e7a4a", opacity: 0});
  // 3240: 논쟁 말풍선은 hud 에서
  w.scale = img(w.layer, "scale", 3240 + 540, 980, 360);
  // 앞쪽(흐린) 야자잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [300, 1400, 2500, 3600, 4700].forEach(x => {for (let j = 0; j < 5; j++) S("path", {d: `M${x},0 Q${x - 120 + j * 60},90 ${x - 200 + j * 100},140`, stroke: "#1a3a14", "stroke-width": 22, fill: "none", "stroke-linecap": "round"}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.setAttribute("cx", (200 + i * 540 + lt * 12 * (1 + i % 3)) % WW));
    w.waves.forEach((p, i) => {const y = 800 + i * 60; let s = `M0,${y}`; for (let x = 0; x <= 1080; x += 30) s += ` L${x},${y + 8 * Math.sin(x / 60 + lt * 2 + i)}`; p.setAttribute("d", s)});
    imgAt(w.scale, 3240 + 540, 980, 1, 4 * Math.sin(lt * 1.6))};
  w.sail = (lt, t0, ny) => {w.yr.setAttribute("opacity", ny ? 0 : P(lt, t0, .3));
    w.boats.forEach((b, i) => {const u = ((lt - t0 - i * .5) / 3.5); const on = u > 0; const uu = clamp(u % 1.15);
      imgAt(b, lerp(80, 760, uu), 850 + (i % 3) * 40 + 6 * Math.sin(lt * 2 + i), 1, 4 * Math.sin(lt * 2 + i)); b.style.opacity = on && uu < 1 ? 1 : 0})};
  w.grid = (lt, t0, t1) => {w.wk.forEach((c, i) => c.setAttribute("opacity", i < 100 ? (lt > t0 + i * .008 ? 1 : 0) : (lt > t1 + (i - 100) * .12 ? 1 : 0)));
    w.wLab.textContent = lt > t1 + 1 ? "일하는 사람 100명 → 107명 (약 +7%)" : (lt > t0 ? "마이애미에서 일하는 사람 100명이라면" : "")};
  w.comp = (lt, t0, tr) => {w.cities.forEach((c, i) => {const on = P(lt, t0 + i * .15, .3); c.tw.setAttribute("opacity", on); c.lab.setAttribute("opacity", on)});
    w.cLab.setAttribute("opacity", P(lt, t0, .3)); w.flat.setAttribute("opacity", P(lt, tr, .3)); w.same.setAttribute("opacity", P(lt, tr + .3, .3));
    let s = ""; for (let i = 0; i < 5; i++) {const x = 2160 + 150 + i * 195; s += (i ? " L" : "M") + x + "," + (560 + 6 * Math.sin(i * 1.7))} w.flat.setAttribute("d", s)};
  w.sail(-99, 99); w.grid(-99, 99, 99); w.comp(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["이민자가 몰려오면 **임금이 떨어질까?**", "이민자가 한꺼번에 몰려오면, 임금이 떨어질까요?", "pop"],
  ["1990년 **노동경제학 학술지**(ILR Review)에 실린 논문", "천구백구십 년에 나온 논문입니다."],
  ["저자: 데이비드_카드_교수 (2021 노벨상)", "저자는, 데이비드 카드 교수입니다. 이천이십일 년에, 노벨 경제학상을 받았죠."]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.h = kin(hud, 120, "이민자 → **임금 ↓**?", 92);
    c.j = kin(hud, 120, "**1990** · ILR Review", 86);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.sail(lt, .4, true);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 사건 */
scene({id: "event", lines: [
  ["1980년: 쿠바의 항구 도시 **마리엘**에서 떠나도 된다", "천구백팔십 년, 쿠바 정부가 갑자기, 쿠바의 항구 도시 마리엘에서, 원하는 사람은 떠나도 된다고 했습니다.", "pop"],
  ["몇 달 만에 약 **12만 5천 명**이 배를 타고 미국으로", "몇 달 만에, 약 십이만 오천 명이, 배를 타고 미국으로 건너왔죠.", "whoosh@0.2"],
  ["상당수가 마이애미에 정착: 일하는 사람이 **약 7% 늘었다**", "상당수가 마이애미에 자리를 잡아서, 이 도시에서 일하는 사람이, 약 칠 퍼센트 늘었습니다.", "coin"]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.sail(lt, 0); w.pan(lt < L[2] ? 0 : whip(lt, L[2], 0, 1080, .9)); w.grid(lt, L[2] + .6, L[2] + 2);
    c.o.up(lt, {mood: lt > L[1] && lt < L[2] ? "surprised" : "normal", look: [.7, -.5]});
  }
});

/* 3. 자연 실험과 비교 */
scene({id: "natural", lines: [
  ["이것이 **자연_실험**(Natural Experiment)", "이들은 마이애미에 일자리가 많아서 온 게 아니라, 쿠바의 갑작스러운 결정 때문에 왔습니다. 그래서 자연이 만들어 준 실험, 즉 자연 실험이라고 부르죠.", "ding"],
  ["비교: 마이애미 vs **비슷한 다른 도시 네 곳**", "카드 교수는, 마이애미와, 비슷한 다른 미국 도시 네 곳의, 임금과 실업률을 비교했습니다.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.grid(99, 0, 0); w.pan(lt < L[1] ? 1080 : whip(lt, L[1], 1080, 2160, .9)); w.comp(lt, L[1] + .8, 99);
    c.o.up(lt, {mood: lt < L[1] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["저학력 노동자의 임금·실업률: **거의 차이 없음**", "그 결과, 학력이 낮은 노동자의 임금과 실업률이, 다른 도시와 거의 차이가 없었습니다.", "ding"],
  ["먼저 와 있던 쿠바 이민자도 **영향이 거의 없었다**", "먼저 와 있던 쿠바 이민자들조차, 영향을 거의 받지 않았죠."],
  ["설명: 마이애미는 **이민자를 받아들이는 데 익숙한** 도시", "카드 교수는, 마이애미가 앞선 이민 물결로, 이민자를 받아들이는 데 익숙한 도시였다는 점을 들었습니다."]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.u = CX(hud, 1150, "막대는 모양만 나타낸 그림", "", {fontSize: "32px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(2160); w.comp(lt, -9, .5); ap(c.u, lt, .6);
    c.o.up(lt, {mood: lt > .8 && lt < L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 논쟁 */
scene({id: "debate", lines: [
  ["보하스 교수(2017): 중퇴 남성만 보면 **임금 ↓**", "그런데 이천십칠 년, 보하스 교수는, 고등학교를 마치지 못한 남성만 따로 보면, 임금이 크게 떨어졌다고 반박했습니다.", "whoosh@0.2"],
  ["다른 연구들: 다시 **효과가 거의 없다**", "반면 다른 연구들은, 가상의 비교 도시를 만들어 봐도, 효과가 거의 없었다고 다시 반박했죠."],
  ["40년 가까이 이어지는 **이민 경제학의 대표 논쟁**", "그래서 이 사건은, 사십 년 가까이 이어지는, 이민 경제학의 대표적인 논쟁거리가 됐습니다.", "ding"]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: "1250px", background: "rgba(8,12,22,.35)"});
    c.b1 = img(hud, "speech_balloon", 290, 700, 440); c.t1 = CX(hud, 395, "<span style='font-size:58px;font-weight:900;color:#e85d5d'>임금 ↓<br><span style='font-size:36px'>보하스</span></span>", "", {width: "600px", left: "0px"});
    c.b2 = img(hud, "speech_balloon", 790, 700, 440); c.t2 = CX(hud, 395, "<span style='font-size:52px;font-weight:900;color:#1e8a6a'>효과 없음<br><span style='font-size:36px'>카드 등</span></span>", "", {width: "600px", left: "480px"});
    c.dim.parentNode.insertBefore(c.dim, c.dim.parentNode.firstChild);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.comp(99, 0, 0); c.dim.style.opacity = P(lt, .5, .4);
    const u1 = spr((lt - .9) / .5), u2 = spr((lt - L[1] - .1) / .5);
    imgAt(c.b1, 290, 700, clamp(u1, 0, 1.2), -6); c.b1.style.opacity = clamp(u1 * 2); c.t1.style.opacity = clamp(u1 * 2);
    imgAt(c.b2, 790, 700, clamp(u2, 0, 1.2), 6); c.b2.style.opacity = clamp(u2 * 2); c.t2.style.opacity = clamp(u2 * 2);
    c.o.up(lt, {mood: lt < L[2] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**마리엘 보트 이민과 마이애미 노동시장**〉", "논문 제목은, 마리엘 보트 이민이, 마이애미 노동시장에 미친 영향입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.sail(lt, 1, true);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
