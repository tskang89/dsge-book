/* 오늘의 경제 018 — 외모와 임금 (v3: 부엉이 진행자·한 공간 카메라 이동·임금 막대)
   논문: Hamermesh, D. S. & Biddle, J. E. (1994) "Beauty and the Labor Market", American Economic Review 84(5): 1174–1194.
         (NBER WP 4518)
   확인(2026-11-16, 원문 PDF 는 이 세션에서 막힘 — 초록(NBER·SSRN)과 세인트루이스 연준 요약으로 확인):
   - 자료: 1977 Quality of Employment, 1971 Quality of American Life(미국), 1981 Canadian Quality of Life — 면접원이 외모 평가
   - 초록: 외모가 평균보다 못한 사람의 임금 손해(plainness penalty) 5~10%, 외모 이익(beauty premium)보다 조금 큼
   - 세인트루이스 연준 요약: 학력·경력 등을 통제한 뒤 이익 약 5%, 손해 약 9%
   - 초록: 외모가 생산적인 직업으로 잘생긴 사람이 모이지만, 외모가 임금에 주는 영향은 대부분 직업과 무관
   막대: 보통 = 100, 못함 = 90~95(범위), 나음 = 약 105. */
Object.assign(EP, {no: 18, style: "v2", title: "외모와 임금", hook: "외모가 연봉을 바꾼다?",
  bgm: {seed: 211, bpm: 100, mood: "bright"},
  paper: {journal: "American Economic Review", year: 1994, authors: "Daniel S. Hamermesh & Jeff E. Biddle",
          title: "Beauty and the Labor Market", ko: "아름다움과 노동시장", cite: "84(5): 1174–1194", url: "https://www.nber.org/papers/w4518"},
  yt: {title: "외모가 연봉을 바꾼다? | 외모 프리미엄과 페널티 #경제 #shorts",
       desc: "미국과 캐나다의 생활 설문조사에서 조사원이 응답자의 외모를 점수로 매겼다. 연구진은 학력과 경력 같은 조건을 맞춘 다음 외모 점수와 임금을 비교했다. 외모가 보통보다 못하다고 평가받은 사람은 임금이 5~10% 낮았다. 보통보다 낫다고 평가받은 사람은 임금이 조금(약 5%) 높았는데, 손해 폭이 이익보다 컸다. 이 차이는 대부분 같은 직업 안에서도 나타났다. 외모가 중요한 직업이라서만은 아니라는 것. 다만 외모가 중요한 직업에 잘생긴 사람이 더 많이 모이기도 했다. 외모에 따른 이 차이를 외모 프리미엄(Beauty Premium)과 외모 페널티(Plainness Penalty)라고 부른다.",
       tags: ["경제", "노동경제학", "외모", "임금", "차별", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 거울 | 1080 설문 평가 | 2160 임금 막대 | 3240 직업
let WID = 0;

function officeWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1d3344"], [1, "#2c4a5e"]]); lg("floor", [[0, "#4a5a66"], [1, "#24303a"]]);
  lg("win", [[0, "#9fd0ff", .5], [1, "#5ab0ff", .15]]); lg("bar", [[0, "#ffe08a"], [1, "#d9a42e"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  w.wins = [];
  for (let x = 80; x < WW; x += 540) {w.wins.push(S("rect", {x, y: 140, width: 360, height: 300, rx: 10, fill: U("win")}, g));
    S("line", {x1: x + 180, y1: 140, x2: x + 180, y2: 440, stroke: "#1d3344", "stroke-width": 8}, g)}
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 160) S("line", {x1: x, y1: 1000, x2: x - 240, y2: H, stroke: "#1a242c", "stroke-width": 3, opacity: .5}, g);
  // 0: 거울
  w.mirror = img(w.layer, "mirror", 540, 1000, 520);
  // 1080: 면접원과 별점
  w.clip = img(w.layer, "clipboard", 1080 + 300, 980, 260);
  w.interviewer = img(w.layer, "woman_office_worker", 1080 + 760, 1000, 300);
  w.stars = Array.from({length: 5}, (_, i) => img(w.layer, "star", 1080 + 300 + (i - 2) * 100, 560, 90));
  // 2160: 임금 막대
  w.bars = [["보통보다 못함", 92.5, CORAL], ["보통", 100, "#c9cfe6"], ["보통보다 나음", 105, TEAL]].map(([t, v, col], i) => {
    const x = 2160 + 200 + i * 340, gg = S("g", {}, g);
    const r = S("rect", {x: x - 100, y: 1000, width: 200, height: 0, rx: 14, fill: col}, gg);
    const band = S("rect", {x: x - 100, y: 1000 - 95 * 6, width: 200, height: 5 * 6, fill: "#fff", opacity: 0}, gg);
    ST(g, x, 1060, t, {"font-size": 40, "font-weight": 800, fill: "#fff"});
    const lab = ST(g, x, 0, "", {"font-size": 56, "font-weight": 900, fill: col});
    return {r, band, lab, v, x}});
  // 3240: 같은 직업 안
  w.jobs = [["man_office_worker", 3240 + 300], ["woman_office_worker", 3240 + 540], ["man_office_worker", 3240 + 780]].map(([k, x]) => img(w.layer, k, x, 1000, 240));
  w.jobLab = ST(g, 3240 + 540, 520, "같은 직업", {"font-size": 60, "font-weight": 900, fill: "#fff", opacity: 0});
  w.jobGap = [3240 + 300, 3240 + 540, 3240 + 780].map((x, i) => ST(g, x, 700, ["−", "", "+"][i], {"font-size": 90, "font-weight": 900, fill: [CORAL, "#fff", TEAL][i], opacity: 0}));
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#e8f1ff", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.wins.forEach((e, i) => e.setAttribute("opacity", .75 + .25 * Math.sin(lt * .9 + i)));
    imgAt(w.interviewer, 1080 + 760, 1000 - 5 * Math.abs(Math.sin(lt * 2)), 1, 0)};
  w.rate = (lt, t0) => w.stars.forEach((s, i) => {const k = Math.floor(Math.max(0, lt - t0) * 3) % 6;
    s.style.opacity = lt < t0 ? 0 : i < Math.max(1, k) ? 1 : .2; imgAt(s, 1080 + 300 + (i - 2) * 100, 560, 1, 0)});
  w.grow = (lt, t0, which) => w.bars.forEach((b, i) => {if (which.indexOf(i) < 0) return;
    const u = ease((lt - t0 - which.indexOf(i) * .4) / .8), h = b.v * 6 * u;
    b.r.setAttribute("height", h); b.r.setAttribute("y", 1000 - h);
    b.lab.setAttribute("y", 1000 - h - 30); b.lab.textContent = u > .95 ? (i === 0 ? "−5~10%" : i === 1 ? "기준" : "약 +5%") : "";
    if (i === 0) b.band.setAttribute("opacity", u > .95 ? .35 : 0)});
  w.reset = () => w.bars.forEach(b => {b.r.setAttribute("height", 0); b.lab.textContent = ""; b.band.setAttribute("opacity", 0)});
  w.reset(); w.rate(-99, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["외모가 **연봉**을 바꿀까?", "외모가, 연봉을 바꿀 수 있을까요?", "pop"],
  ["1994년 **AER**에 실린 논문", "천구백구십사 년에 나온 논문입니다."],
  ["저자: 해머메시_교수와 비들_교수", "저자는, 해머 메시 교수와 비들 교수입니다."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.h = kin(hud, 120, "외모가 **연봉**을?", 96);
    c.j = kin(hud, 120, "**1994** · AER", 96);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1.15, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    imgAt(w.mirror, 540, 1000, 1, 2 * Math.sin(lt * 1.5));
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 자료 */
scene({id: "data", lines: [
  ["미국·캐나다 설문조사: **조사원**이 외모를 점수로", "미국과 캐나다의 생활 설문조사에서, 조사원이 응답자의 외모를 점수로 매겼습니다.", "pop"],
  ["학력·경력 같은 조건을 맞추고 **임금**과 비교", "그리고 학력과 경력 같은 조건을 맞춘 다음, 외모 점수와 임금을 비교했죠.", "coin"]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 800, s: lerp(1, 1.06, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9));
    w.rate(lt, 1.2);
    c.o.up(lt, {mood: "normal", point: ease((lt - 1.2) / .5), look: [.8, -.5]});
  }
});

/* 3. 결과 */
scene({id: "result", lines: [
  ["보통보다 못하다는 평가: 임금 **5~10% 낮음**", "외모가 보통보다 못하다고 평가받은 사람은, 임금이 오에서 십 퍼센트 낮았습니다.", "ding"],
  ["보통보다 낫다는 평가: **조금_높음**, 손해가 이익보다 컸다", "보통보다 낫다고 평가받은 사람은 임금이 조금 높았는데, 손해 폭이 이익보다 컸습니다.", "coin"]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.u = CX(hud, 1150, "보통 = 100으로 본 임금 (학력·경력 등을 맞춘 뒤)", "", {fontSize: "34px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.grow(lt, 1, [1, 0]); w.grow(lt, L[1] + .2, [2]); ap(c.u, lt, 1.4);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : lt > 2 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 직업과 상관없이 */
scene({id: "jobs", lines: [
  ["이 차이는 대부분 **같은_직업** 안에서도 나타났다", "이 차이는 대부분, 같은 직업 안에서도 나타났습니다.", "pop"],
  ["외모가 중요한 직업이라서만은 **아니다**", "외모가 중요한 직업이라서만은, 아니라는 거죠."],
  ["다만 외모가 중요한 직업에 잘생긴 사람이 **더 모이기도**", "다만 외모가 중요한 직업에, 잘생긴 사람이 더 많이 모이기도 했습니다."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lerp(1, 1.05, ease(lt / 6))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.jobs.forEach((j, i) => imgAt(j, [3240 + 300, 3240 + 540, 3240 + 780][i], 1000 - 5 * Math.abs(Math.sin(lt * 2 + i)), 1, 0));
    w.jobLab.setAttribute("opacity", P(lt, 1, .3)); w.jobGap.forEach((t, i) => t.setAttribute("opacity", P(lt, 1.6 + i * .2, .3)));
    c.o.up(lt, {mood: lt > L[2] ? "normal" : lt > L[1] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 5. 용어 + 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["**외모_프리미엄**과 **외모_페널티**", "외모에 따른 이 차이를, 외모 프리미엄과 외모 페널티라고 부릅니다.", "pop"],
  ["논문 제목: 〈**아름다움과 노동시장**〉", "논문 제목은, 아름다움과 노동시장입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.h = kin(hud, 110, "**외모 프리미엄** (Beauty Premium)<br>**외모 페널티** (Plainness Penalty)", 52);
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 980, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 860, s: lerp(1.06, .98, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 2160, 1)); w.grow(99, 0, [0, 1, 2]);
    c.dim.style.opacity = P(lt, L[1] - .3, .5); ap(c.p, lt, L[1], null, {s: .92}); ap(c.f, lt, L[2], null, {s: .7, back: true});
    kinUp(c.h, lt, .3, L[1] - .2);
    c.o.up(lt, {mood: "happy", point: lt > L[2] ? .5 + .5 * Math.sin((lt - L[2]) * 6) : 0, look: [.5, -.6]});
  }
});
