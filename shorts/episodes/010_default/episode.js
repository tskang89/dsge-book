/* 오늘의 경제 010 — 기본값의 힘 (v3: 부엉이 진행자·한 공간 카메라 이동·100칸 격자)
   논문: Madrian, B. C. & Shea, D. F. (2001) "The Power of Suggestion: Inertia in 401(k) Participation and Savings Behavior",
         Quarterly Journal of Economics 116(4): 1149–1187. doi:10.1162/003355301753265543 (NBER WP 7682, 2000)
   확인(2026-11-15, 원문 PDF 는 이 세션에서 막힘):
   - 미국 대기업 한 곳이 1998년 4월 1일부터 401(k)를 자동 가입(빠지려면 직접 신청)으로 바꿈(NBER 판 요약)
   - 신입 직원 가입률 37% → 86%(보스턴칼리지 은퇴연구센터 글), 신입 직원 가입률 +48%p(Choi·Laibson·Madrian·Metrick 요약) — 서로 맞음
   - 초록: 많은 직원이 회사가 정한 기본 납입률·기본 펀드를 그대로 둠 / 원인은 관성과 '기본값을 회사의 투자 조언으로 받아들임'
   - 기본 납입률 3%·머니마켓 펀드는 확인 못 해 숫자는 쓰지 않음
   격자 100칸: 37칸 → 86칸. */
Object.assign(EP, {no: 10, style: "v2", title: "기본값의 힘", hook: "체크 표시 하나가 노후 저축을 바꾼다?",
  bgm: {seed: 111, bpm: 100, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2001, authors: "Brigitte C. Madrian & Dennis F. Shea",
          title: "The Power of Suggestion: Inertia in 401(k) Participation and Savings Behavior", ko: "제안의 힘: 401(k) 가입과 저축 행동의 관성",
          cite: "116(4): 1149–1187", url: "https://doi.org/10.1162/003355301753265543"},
  yt: {title: "체크 표시 하나가 노후 저축을 바꿨다 | 기본값의 힘 #경제 #shorts",
       desc: "미국 직장인은 회사 퇴직연금 계좌(401(k))에 월급 일부를 저축할 수 있다. 한 대기업이 1998년, 직접 신청해야 가입되던 방식을 '신청하지 않으면 자동 가입, 원하지 않으면 언제든 탈퇴'로 바꿨다. 바뀐 건 아무것도 하지 않으면 적용되는 선택, 즉 기본값뿐이었다. 그러자 신입 직원 가입률이 37%에서 86%로 뛰었다. 많은 직원이 회사가 정해 둔 저축 비율과 펀드도 그대로 뒀다. 연구진은 바꾸기 귀찮은 관성과, 기본값을 회사의 추천으로 받아들인 결과로 해석했다.",
       tags: ["경제", "행동경제학", "넛지", "기본값", "퇴직연금", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 책상 | 1080 저축 | 2160 기본값 스위치 | 3240 100칸
let WID = 0;

function deskWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#1d2a44"], [1, "#2e3f5e"]]); lg("desk", [[0, "#b58a5a"], [1, "#6a4a2a"]]);
  lg("paper", [[0, "#fbf8f1"], [1, "#e6dfcf"]]); lg("jar", [[0, "#cfe6ff", .35], [1, "#8fb8e6", .5]]);
  lg("sw", [[0, "#3a4a6a"], [1, "#24324c"]]); lg("lamp", [[0, "#ffe7b0", .35], [1, "#ffe7b0", 0]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("wall")}, g);
  for (let x = 0; x < WW; x += 120) S("rect", {x, y: 0, width: 60, height: 900, fill: "#fff", opacity: .025}, g);
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("desk")}, g);
  for (let i = 0; i < 8; i++) S("line", {x1: 0, y1: 930 + i * 46 + i * i * 4, x2: WW, y2: 930 + i * 46 + i * i * 4, stroke: "#4a2e14", "stroke-width": 3, opacity: .35}, g);
  w.lamps = [540, 1620, 2700, 3780].map(x => S("path", {d: `M${x - 80},0 L${x + 80},0 L${x + 420},900 L${x - 420},900 Z`, fill: U("lamp")}, g));
  // 0: 서류(체크박스)
  S("rect", {x: 300, y: 380, width: 480, height: 600, rx: 10, fill: "#000", opacity: .3, transform: "translate(12,16) rotate(-3 540 680)"}, g);
  const doc = S("g", {transform: "rotate(-3 540 680)"}, g);
  S("rect", {x: 300, y: 380, width: 480, height: 600, rx: 10, fill: U("paper")}, doc);
  ST(doc, 540, 460, "퇴직연금 가입", {"font-size": 46, "font-weight": 800, fill: "#2b2b2b"});
  for (let k = 0; k < 4; k++) S("rect", {x: 350, y: 510 + k * 46, width: [380, 320, 360, 260][k], height: 14, rx: 7, fill: "#c9c2b0"}, doc);
  S("rect", {x: 360, y: 760, width: 90, height: 90, rx: 12, fill: "#fff", stroke: "#2b2b2b", "stroke-width": 6}, doc);
  ST(doc, 600, 822, "가입합니다", {"font-size": 44, "font-weight": 800, fill: "#2b2b2b"});
  w.tick = S("path", {d: "M372,806 L398,834 L440,772", stroke: TEAL, "stroke-width": 14, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": 120, "stroke-dashoffset": 120}, doc);
  // 1080: 월급 → 저축 통
  S("rect", {x: 1080 + 620, y: 520, width: 300, height: 400, rx: 40, fill: U("jar"), stroke: "#cfe6ff", "stroke-width": 6}, g);
  ST(g, 1080 + 770, 500, "퇴직연금 계좌", {"font-size": 44, "font-weight": 800, fill: "#cfe6ff"});
  ST(g, 1080 + 770, 960, "401(k)", {"font-size": 40, "font-weight": 800, fill: "#cfe6ff"});
  w.fill = S("rect", {x: 1080 + 630, y: 910, width: 280, height: 0, rx: 30, fill: GOLD, opacity: .85}, g);
  w.wallet = img(w.layer, "money_bag", 1080 + 280, 900, 260);
  w.coinsF = Array.from({length: 8}, () => img(w.layer, "dollar", 0, 0, 80));
  w.form = img(w.layer, "memo", 1080 + 280, 600, 200);
  // 2160: 기본값 스위치
  const sx = 2160 + 540;
  S("rect", {x: sx - 330, y: 430, width: 660, height: 300, rx: 150, fill: U("sw"), stroke: "#5a6a8a", "stroke-width": 8}, g);
  w.knob = S("circle", {cx: sx - 180, cy: 580, r: 120, fill: "#c9cfe6"}, g);
  w.lblOff = ST(g, sx - 180, 800, "가입 안 함", {"font-size": 48, "font-weight": 800, fill: "#c9cfe6"});
  w.lblOn = ST(g, sx + 180, 800, "자동 가입", {"font-size": 48, "font-weight": 800, fill: TEAL});
  w.def = ST(g, sx - 180, 380, "기본값", {"font-size": 46, "font-weight": 800, fill: GOLD});
  w.door = img(w.layer, "door", 2160 + 860, 1150, 200);
  // 3240: 100칸 격자
  w.grid = Array.from({length: 100}, (_, i) => S("rect", {x: 3240 + 215 + (i % 10) * 66, y: 420 + Math.floor(i / 10) * 66, width: 54, height: 54, rx: 10, fill: "#3a4a6a"}, g));
  // 앞쪽(흐린) 화분 잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 200, y: 30, width: 400, height: 40, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 66, width: 360, height: 12, rx: 6, fill: "#e8f1ff", opacity: .8}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => w.lamps.forEach((l, i) => l.setAttribute("opacity", .75 + .25 * Math.sin(lt * 1.1 + i)));
  w.check = u => w.tick.setAttribute("stroke-dashoffset", 120 * (1 - clamp(u)));
  w.flow = (lt, t0, on) => {w.coinsF.forEach((e, i) => {const u = ((lt - t0) * .9 + i / 8) % 1;
      if (!on || lt < t0) {e.style.opacity = 0; return}
      imgAt(e, lerp(1080 + 300, 1080 + 770, u), lerp(760, 600, u) - Math.sin(Math.PI * u) * 160, 1, u * 200); e.style.opacity = Math.sin(Math.PI * u)});
    w.fill.setAttribute("height", on ? clamp((lt - t0) / 4) * 300 : 0); w.fill.setAttribute("y", 910 - (on ? clamp((lt - t0) / 4) * 300 : 0))};
  w.toggle = u => {u = clamp(u); w.knob.setAttribute("cx", lerp(2160 + 540 - 180, 2160 + 540 + 180, ease(u))); w.knob.setAttribute("fill", mixc("#c9cfe6", TEAL, u));
    w.def.setAttribute("x", lerp(2160 + 540 - 180, 2160 + 540 + 180, ease(u)))};
  w.cells = (lt, nOn, t0, col) => w.grid.forEach((r, i) => {const u = clamp((lt - t0 - i * .012) / .2);
    r.setAttribute("fill", i < nOn && u > 0 ? (col || GOLD) : "#3a4a6a")});
  w.check(0); w.flow(-99, 0, false); w.toggle(0); w.cells(-99, 0, 0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});

/* 1. 질문 (서류) */
scene({id: "hook", lines: [
  ["체크 표시 하나가 **노후 저축**을 바꾼다?", "서류의 체크 표시 하나가, 노후 저축을 바꿀 수 있을까요?", "pop"],
  ["2001년 **QJE**, 매드리안과 셰이", "이천일 년, 매드리안과 셰이가 쓴 논문입니다."]],
  build(el, hud) {
    const c = {w: deskWorld(el)};
    c.h = kin(hud, 150, "체크 하나가<br>**노후**를 바꾼다?", 96);
    c.j = kin(hud, 170, "**2001** · QJE", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    w.check(ease((lt - 1.2) / .5) * (1 - ease((lt - 2.6) / .4)) + ease((lt - 3.2) / .5) * 0);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 퇴직연금과 원래 방식 (저축) */
scene({id: "setup", lines: [
  ["**401(k)**: 미국 직장인의 퇴직연금 계좌", "미국 직장인은, 회사 퇴직연금 계좌에 월급 일부를 저축할 수 있습니다.", "coin"],
  ["원래는 **직접 신청**해야 가입", "원래 이 회사에선, 직원이 직접 신청해야 가입됐습니다.", "pop"]],
  build(el, hud) {
    const c = {w: deskWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 800, s: lerp(1, 1.05, ease(lt / 5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    const tw = spr((lt - .8) / .5); imgAt(w.wallet, 1080 + 280, 900, clamp(tw, 0, 1.2), 0); w.wallet.style.opacity = clamp(tw * 2);
    w.flow(lt, 1.2, lt < L[1]);
    const tf = spr((lt - L[1] - .2) / .5); imgAt(w.form, 1080 + 280, 600, clamp(tf, 0, 1.2), -6 + 4 * Math.sin(lt * 2)); w.form.style.opacity = clamp(tf * 2);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", point: ease((lt - .8) / .5), look: [.8, -.4]});
  }
});

/* 3. 자동 가입 = 기본값만 바꿈 (스위치) */
scene({id: "switch", lines: [
  ["1998년부터 **자동 가입**(Automatic Enrollment)", "그런데 천구백구십팔 년부터, 신청하지 않아도 자동으로 가입되게 바꿨어요.", "whoosh@0.3"],
  ["원하지 않으면 언제든 **빠질 수 있다**", "원하지 않으면, 언제든 빠질 수 있었습니다.", "pop"],
  ["바뀐 건 **기본값**(Default)뿐: 아무것도 하지 않으면 적용되는 선택", "아무것도 하지 않으면 적용되는 선택, 기본값만 바뀐 겁니다."]],
  build(el, hud) {
    const c = {w: deskWorld(el)};
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.06, ease((lt - L[2]) / 1.5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.toggle((lt - 1.4) / .6);
    const td = spr((lt - L[1] - .2) / .5); imgAt(w.door, 2160 + 860, 1150, clamp(td, 0, 1.2), 0); w.door.style.opacity = clamp(td * 2);
    c.o.up(lt, {mood: lt > L[2] ? "happy" : "normal", point: ease((lt - 1.2) / .5), look: [.8, -.5]});
  }
});

/* 4. 결과 (100칸) */
scene({id: "result", lines: [
  ["신입 직원 100명 중 가입: **37명 → 86명**", "그러자 신입 직원 백 명 중 가입한 사람이, 서른일곱 명에서 여든여섯 명으로 늘었습니다.", "ding"],
  ["회사가 정해 둔 **저축 비율·펀드**도 그대로", "게다가 많은 사람이, 회사가 정해 둔 저축 비율과 펀드를 그대로 뒀습니다.", "pop"],
  ["연구진의 해석: **관성**(Inertia) + 기본값을 회사의 **추천**으로 받아들임", "연구진은 이것을, 바꾸기 귀찮은 관성과, 기본값을 회사의 추천으로 받아들인 결과로 봤습니다."]],
  build(el, hud) {
    const c = {w: deskWorld(el)};
    c.n = bigNum(hud, 150, "", GOLD, 140);
    c.u = CX(hud, 1130, "1칸 = 신입 직원 1명 (100명 중)", "", {fontSize: "38px", fontWeight: 800, color: "#fff", opacity: .85});
    c.h = kin(hud, 150, "**관성** + 추천", 110);
    c.o = host(hud, "owl", {x: 120, y: 1285, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 800, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    const before = lt < 2.4;
    w.cells(lt, before ? 37 : 86, before ? .9 : 2.4, before ? CORAL : GOLD);
    if (!before) w.grid.slice(0, 37).forEach(r => r.setAttribute("fill", CORAL));
    c.n.innerHTML = before ? `<span style="color:${CORAL}">37명</span>` : `<span style="color:${CORAL}">37명</span> → 86명`;
    c.n.style.opacity = P(lt, 1, .3) * (1 - P(lt, L[2] - .1, .3)); ap(c.u, lt, 1.2);
    kinUp(c.h, lt, L[2] + .1);
    c.o.up(lt, {mood: lt > L[2] ? "skeptical" : lt > 2.4 ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**제안의 힘**〉", "논문 제목은, 제안의 힘입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: deskWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 980, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.check(1);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
