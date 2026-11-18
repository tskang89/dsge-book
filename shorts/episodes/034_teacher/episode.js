/* 오늘의 경제 034 — 썩은 사과 (v3: 부엉이 진행자·한 공간 카메라 이동·교실·점수 선·답안 격자·100개 반)
   논문: Jacob, B. A. & Levitt, S. D. (2003) "Rotten Apples: An Investigation of the Prevalence and Predictors of Teacher Cheating",
         Quarterly Journal of Economics 118(3): 843–877. doi:10.1162/00335530360698441 (NBER WP 9413)
   확인(2026-11-18, 원문 PDF 는 이 세션에서 막힘 — 초록·후속 논문 초록·보도 요약으로 확인):
   - 시카고 공립학교 자료, 탐지 방법 = 예상 밖의 점수 등락 + 한 반 안의 의심스러운 답안 줄(같은 답 덩어리)
   - 교사·학교 관리자의 부정이 해마다 초등학교 반의 최소 4~5%에서 일어남(하한 추정)
   - 부정 비율은 비교적 작은 유인 변화에도 크게 반응
   - 후속 연구(Jacob & Levitt 2003, "Catching Cheating Teachers", NBER WP 9414): 의심 반을 교육청 감독 아래 다시 시험 → 점수가 크게 떨어짐
   - 당시 시카고: 점수가 낮은 학교는 관리 대상(probation), 낮은 점수의 학생은 유급 가능(고부담 시험)
   - '쉬운 문제는 틀리고 어려운 문제만 맞힌' 답안 = 학생 한 명 안의 이상한 답 패턴(탐지 지표 중 하나)
   점수 선은 모양만. 100개 반 중 5칸 = '최소 4~5%' 위쪽 값으로 표시(화면 '최소'). */
Object.assign(EP, {no: 34, style: "v2", title: "썩은 사과", hook: "시험 부정, 학생이 아니라 선생님이 했다면?",
  bgm: {seed: 843, bpm: 100, mood: "tense"},
  paper: {journal: "Quarterly Journal of Economics", year: 2003, authors: "Brian A. Jacob & Steven D. Levitt",
          title: "Rotten Apples: An Investigation of the Prevalence and Predictors of Teacher Cheating",
          ko: "썩은 사과: 교사 부정의 규모와 원인 연구", cite: "118(3): 843–877", url: "https://doi.org/10.1162/00335530360698441"},
  yt: {title: "시험 부정, 학생이 아니라 선생님이 했다면? | 썩은 사과 #경제 #shorts",
       desc: "미국 시카고에서는 학생들의 시험 점수로 학교와 교사를 평가했다. 점수가 낮은 학교는 관리 대상이 되고 학생은 유급될 수도 있었다. 그러니 선생님에게는 점수를 올려야 한다는 압박이 생기고, 시험이 끝난 뒤 학생 답안지를 몰래 고치는 부정도 가능하다. 연구진은 두 가지 신호로 부정이 의심되는 반을 찾았다. 첫째, 올해만 점수가 확 뛰었다가 다음 해에 뚝 떨어진 반. 진짜로 잘 배웠다면 다음 해에도 실력이 남아 있어야 하기 때문이다. 둘째, 한 반의 여러 학생이 같은 구간에서 똑같은 답을 줄줄이 적은 경우, 그리고 쉬운 문제는 틀렸는데 어려운 문제만 맞힌 이상한 답안. 그 결과 해마다 초등학교 반의 최소 4~5%에서 선생님이나 학교의 부정이 있었다고 추정했다. 부정은 작은 보상과 처벌의 변화에도 크게 움직였다. 후속 연구에서 의심 반들에 감독을 붙여 다시 시험을 치르자 점수가 크게 떨어졌다. 숫자로 사람을 평가하면 그 숫자를 조작하려는 유인(Incentive)도 생긴다는 걸 보여 준 연구다. (점수 선은 모양만 나타낸 그림이다.)",
       tags: ["경제", "유인", "시험", "부정행위", "괴짜경제학", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 교실 | 1080 점수 선 | 2160 답안 격자 | 3240 100개 반
let WID = 0;

function schoolWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#2c4a3e"], [1, "#3e5e50"]]); lg("floor", [[0, "#8a6a4a"], [1, "#4a3420"]]); lg("board", [[0, "#1e3a2e"], [1, "#14281f"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  // 칠판(세계 전체 위쪽 띠)
  for (let x = 60; x < WW; x += 1080) S("rect", {x, y: 150, width: 960, height: 760, rx: 18, fill: U("board"), stroke: "#8a6a3a", "stroke-width": 14}, g);
  w.chalk = [];
  // 0: 교실
  ST(g, 540, 450, "시험 중", {"font-size": 64, "font-weight": 900, fill: "#f4f1e6"});
  w.teacher = img(w.layer, "teacher", 540, 760, 260);
  w.desks = [180, 420, 660, 900].map(x => {S("rect", {x: x - 90, y: 900, width: 180, height: 30, rx: 6, fill: "#c89a5a"}, g); return img(w.layer, "person", x, 1000, 150)});
  w.apple = img(w.layer, "red_apple", 820, 640, 110);
  w.pencil = img(w.layer, "pencil", 420, 520, 120);
  // 1080: 점수 선 (모양만)
  const x0 = 1080 + 160, x1 = 1080 + 920, base = 800;
  S("line", {x1: x0, y1: base, x2: x1, y2: base, stroke: "#f4f1e6", "stroke-width": 4}, g);
  ["작년", "올해", "다음 해"].forEach((t, i) => ST(g, lerp(x0, x1, i / 2), base + 56, t, {"font-size": 42, "font-weight": 800, fill: "#f4f1e6"}));
  w.norm = S("path", {d: poly([[x0, 600], [lerp(x0, x1, .5), 560], [x1, 520]]), stroke: TEAL, "stroke-width": 9, fill: "none"}, g);
  w.spike = S("path", {d: poly([[x0, 640], [lerp(x0, x1, .5), 330], [x1, 650]]), stroke: RED, "stroke-width": 9, fill: "none"}, g);
  w.nLab = ST(g, x1 - 40, 500, "보통 반", {"font-size": 40, "font-weight": 900, fill: TEAL, "text-anchor": "end", opacity: 0});
  w.sLab = ST(g, lerp(x0, x1, .5), 300, "의심 반", {"font-size": 44, "font-weight": 900, fill: RED, opacity: 0});
  w.sNote = ST(g, 1080 + 540, 965, "모양만 나타낸 그림", {"font-size": 32, "font-weight": 700, fill: "#c9cfe6", opacity: 0});
  // 2160: 답안 격자 (학생 6명 × 문항 12개)
  const ans = "ABCD", r = rng(34);
  w.rows = Array.from({length: 6}, (_, s) => Array.from({length: 12}, (_, q) => {const blk = q >= 7 && q <= 10 && s >= 1 && s <= 4;
    const ch = blk ? "DCAB"[q - 7] : ans[Math.floor(r() * 4)];
    const cx = 2160 + 170 + q * 66, cy = 300 + s * 90;
    const box = S("rect", {x: cx - 28, y: cy - 34, width: 56, height: 60, rx: 8, fill: "#f4f1e6", opacity: 0}, g);
    const t = ST(g, cx, cy + 12, ch, {"font-size": 38, "font-weight": 900, fill: "#2b2b2b", opacity: 0}); return {box, t, blk}}));
  ST(g, 2160 + 540, 965, "학생 6명 × 문항 12개 (예시)", {"font-size": 34, "font-weight": 700, fill: "#c9cfe6"});
  w.easy = ST(g, 2160 + 540, 240, "", {"font-size": 40, "font-weight": 900, fill: GOLD});
  // 3240: 100개 반
  w.rooms = Array.from({length: 100}, (_, i) => S("rect", {x: 3240 + 190 + (i % 10) * 72, y: 260 + Math.floor(i / 10) * 60, width: 60, height: 48, rx: 8, fill: "#4a5a50"}, g));
  w.rLab = ST(g, 3240 + 540, 900, "", {"font-size": 46, "font-weight": 900, fill: RED});
  w.down = ST(g, 3240 + 540, 210, "재시험 → 점수 ↓", {"font-size": 56, "font-weight": 900, fill: GOLD, opacity: 0});
  // 앞쪽(흐린) 형광등: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#e8f1ff", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.desks.forEach((e, i) => imgAt(e, [180, 420, 660, 900][i], 1000 - 4 * Math.abs(Math.sin(lt * 2 + i)), 1, 0));
    imgAt(w.teacher, 540, 760, 1, 2 * Math.sin(lt * 1.3)); imgAt(w.apple, 820, 640 + 4 * Math.sin(lt * 2), 1, 0)};
  w.erase = (lt, t0) => {const u = spr((lt - t0) / .5); imgAt(w.pencil, 420 + 30 * Math.sin(lt * 9) * (lt > t0 ? 1 : 0), 520, clamp(u, 0, 1.2), -30); w.pencil.style.opacity = clamp(u * 2)};
  w.lines = (lt, tn, ts) => {draw(w.norm, (lt - tn) / 1); draw(w.spike, (lt - ts) / 1.4);
    w.nLab.setAttribute("opacity", P(lt, tn + .6, .3)); w.sLab.setAttribute("opacity", P(lt, ts + .6, .3)); w.sNote.setAttribute("opacity", P(lt, tn, .3))};
  w.grid = (lt, t0, tb, te) => {w.rows.forEach((row, s) => row.forEach((c, q) => {const on = lt > t0 + (s * 12 + q) * .012;
      c.box.setAttribute("opacity", on ? 1 : 0); c.t.setAttribute("opacity", on ? 1 : 0); c.box.setAttribute("fill", c.blk && lt > tb ? "#ff9a8a" : "#f4f1e6")}));
    w.easy.textContent = lt > te ? "쉬운 문제 ✕, 어려운 문제 ○ ?" : (lt > tb ? "같은 구간, 똑같은 답" : "")};
  w.class = (lt, t0, tr) => {w.rooms.forEach((e, i) => e.setAttribute("fill", lt > t0 + i * .01 ? ([7, 23, 48, 66, 91].indexOf(i) >= 0 && lt > t0 + 1.2 ? RED : "#7a8a80") : "#4a5a50"));
    w.rLab.textContent = lt > t0 + 1.4 ? "100개 반 중 최소 4~5개" : ""; w.down.setAttribute("opacity", P(lt, tr, .3))};
  w.erase(-99, 99); w.lines(-99, 99, 99); w.grid(-99, 99, 99, 99); w.class(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["시험 부정, **학생 말고 선생님**이 했다면?", "시험 부정을, 학생이 아니라 선생님이 저질렀다면 어떨까요?", "pop"],
  ["2003년 **QJE**에 실린 논문", "이천삼 년에 나온 논문입니다."],
  ["저자: 제이컵_교수와 레빗_교수", "저자는, 제이컵 교수, 그리고 레빗 교수입니다."]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.h = kin(hud, 120, "시험 부정, **선생님이?**", 88);
    c.j = kin(hud, 120, "**2003** · QJE", 96);
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

/* 2. 배경: 점수로 평가하면 */
scene({id: "stakes", lines: [
  ["미국 시카고 공립학교: 시험 점수로 **학교와 교사를 평가**", "미국의 한 대도시 공립학교에서는, 학생들의 시험 점수로, 학교와 교사를 평가했습니다.", "pop"],
  ["점수가 낮으면 학교는 **관리 대상**, 학생은 **유급**될 수도", "점수가 낮은 학교는 관리 대상이 되고, 학생은 유급될 수도 있었죠."],
  ["선생님에게 **점수를 올려야 할 압박**이 생긴다", "그러니 선생님에게는, 점수를 올려야 한다는 압박이 생깁니다."],
  ["시험이 끝난 뒤 **답안지를 몰래 고치는** 부정도 가능", "시험이 끝난 뒤, 학생 답안지를 몰래 고치는 부정도 가능하죠.", "whoosh@0.2"]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lt > L[3] ? lerp(1.02, 1.12, ease((lt - L[3]) / 2)) : 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.erase(lt, L[3] + .3);
    c.o.up(lt, {mood: lt > L[3] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 신호 ①: 점수 등락 */
scene({id: "signal1", lines: [
  ["연구진은 **두 가지 신호**로 의심 반을 찾았다", "연구진은, 두 가지 신호로, 부정이 의심되는 반을 찾았습니다.", "pop"],
  ["① 올해만 점수가 **확 뛰었다가** 다음 해 **뚝** 떨어진 반", "첫째, 올해만 점수가 확 뛰었다가, 다음 해에 뚝 떨어진 반입니다.", "whoosh@0.2"],
  ["진짜 잘 배웠다면 **다음 해에도** 실력이 남아야 한다", "진짜로 잘 배웠다면, 다음 해에도 실력이 남아 있어야 하니까요."]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .9)); w.lines(lt, L[1] - .2, L[1] + .4);
    c.o.up(lt, {mood: lt > L[1] + 1.4 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 신호 ②: 답안 */
scene({id: "signal2", lines: [
  ["② 여러 학생이 **같은 구간에서 똑같은 답**을 줄줄이", "둘째, 한 반의 여러 학생이, 같은 구간에서 똑같은 답을 줄줄이 적은 경우입니다.", "pop"],
  ["쉬운 문제는 틀리고 **어려운 문제만 맞힌** 이상한 답안도", "쉬운 문제는 틀렸는데, 어려운 문제만 맞힌 이상한 답안도, 의심할 만한 흔적이었죠."]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 660, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9)); w.lines(99, 0, 0); w.grid(lt, .8, 2.8, L[1] + .2);
    c.o.up(lt, {mood: lt > 2.8 ? "skeptical" : "normal", look: [.7, -.6]});
  }
});

/* 5. 결과 */
scene({id: "result", lines: [
  ["해마다 초등학교 반의 **최소 4~5%**에서 교사 부정", "그 결과, 해마다 초등학교 반의 최소 사에서 오 퍼센트에서, 선생님이나 학교의 부정이 있었다고 추정했습니다.", "coin"],
  ["부정은 **작은 보상·처벌 변화**에도 크게 움직였다", "그리고 부정은, 작은 보상과 처벌의 변화에도, 크게 움직였습니다."],
  ["후속 연구: 감독 아래 **재시험** → 의심 반 점수 **크게 하락**", "후속 연구에서, 의심 반들에 감독을 붙여 다시 시험을 치르자, 점수가 크게 떨어졌습니다.", "ding"]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 620, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9)); w.grid(99, 0, 0, 0); w.class(lt, .9, L[2] + .3);
    c.o.up(lt, {mood: lt > 2.4 && lt < L[1] ? "surprised" : lt > L[2] ? "skeptical" : "normal", look: [.7, -.6]});
  }
});

/* 6. 뜻 */
scene({id: "meaning", lines: [
  ["숫자로 평가하면 **조작할_유인**(Incentive)도 생긴다", "숫자로 사람을 평가하면, 그 숫자를 조작하려는 유인도 생긴다는 걸, 보여 준 연구입니다.", "ding"]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1.2)); w.class(99, 0, 0);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 7. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**썩은 사과**: 교사 부정의 규모와 원인〉", "논문 제목은, 썩은 사과, 교사 부정의 규모와 원인 연구입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: schoolWorld(el)};
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
