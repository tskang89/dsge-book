/* 오늘의 경제 013 — 택시 기사의 하루 목표 (v3: 부엉이 진행자·한 공간 카메라 이동·시간 칸과 동전)
   논문: Camerer, C., Babcock, L., Loewenstein, G. & Thaler, R. (1997) "Labor Supply of New York City Cabdrivers: One Day at a Time",
         Quarterly Journal of Economics 112(2): 407–441. doi:10.2307/2951241
   확인(2026-11-15, 원문 PDF 는 이 세션에서 막힘 — 초록 요약(Semantic Scholar·OUP)과 후속 논문 인용으로 확인):
   - 뉴욕 택시 기사의 운행 기록지(trip sheets)로 하루 노동시간과 그날 시간당 수입의 관계를 추정
   - 임금탄력성이 세 표본 중 두 곳에서 유의하게 음(-), 경력이 짧은 기사는 세 표본 모두 음이고 평균 약 -1
     → 탄력성 -1 = 시간당 수입이 10% 많은 날 일하는 시간이 약 10% 짧음
   - 해석(초록): 하루 단위로 결정하고, 느슨한 하루 목표 수입을 채우면 그만둔다
   - 반론: Farber(2005, 2015) 는 자료·방법을 바꾸면 음의 탄력성이 약하거나 사라진다고 봄 → 업로드 설명에 적음
   두 날 그림(바쁜 날 시간당 동전 3개·한가한 날 2개, 8시간×3 = 12시간×2 = 24)은 '목표 수입'을 보이는 단순화 그림(화면에 표시). */
Object.assign(EP, {no: 13, style: "v2", title: "택시 기사의 하루 목표", hook: "손님이 많은 날, 택시 기사는 일찍 퇴근한다?",
  bgm: {seed: 151, bpm: 96, mood: "calm"},
  paper: {journal: "Quarterly Journal of Economics", year: 1997, authors: "Colin Camerer, Linda Babcock, George Loewenstein & Richard Thaler",
          title: "Labor Supply of New York City Cabdrivers: One Day at a Time", ko: "뉴욕 택시 기사의 노동 공급: 하루씩, 그날그날", cite: "112(2): 407–441", url: "https://doi.org/10.2307/2951241"},
  yt: {title: "손님이 많은 날, 택시 기사는 일찍 퇴근한다? | 하루 목표 수입 #경제 #shorts",
       desc: "뉴욕 택시 기사는 하루에 몇 시간 일할지 스스로 정한다. 손님이 많은 날은 한 시간에 버는 돈이 많은 날이다. 교과서대로라면 잘 벌리는 날 더 오래 일하고, 안 벌리는 날 쉬어야 한다. 그래야 같은 시간을 일하고도 더 많이 벌 수 있다. 연구진이 택시 기사들의 운행 기록지를 분석하자, 잘 벌리는 날 오히려 더 일찍 퇴근했다. 특히 경력이 짧은 기사는 시간당 수입이 10% 많은 날 일하는 시간이 약 10% 짧았다(임금탄력성 약 -1). 연구진이 꼽은 설명은 하루 목표 수입이다. 하루를 따로 계산해서, 목표한 돈을 채우면 그날은 일을 끝낸다는 것이다. ※ 이후 Farber(2005, 2015) 등은 다른 자료와 방법으로 이 결과가 약하거나 나타나지 않는다고 반론했다.",
       tags: ["경제", "행동경제학", "노동공급", "택시", "목표소득", "세일러", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d", YEL = "#ffd23f";
const WW = 4320;                       // 세계 너비: 0 밤거리 | 1080 한 시간 수입 | 2160 두 날 비교 | 3240 목표 통
let WID = 0;

function cityWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#070b1c"], [1, "#27325a"]]); lg("road", [[0, "#2a2d36"], [1, "#16181e"]]);
  lg("bld", [[0, "#1b2340"], [1, "#0f1428"]]); lg("jar", [[0, "#cfe6ff", .18], [1, "#8fb8e6", .3]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("sky")}, g);
  const r = rng(13); w.stars = [];
  for (let i = 0; i < 90; i++) w.stars.push(S("circle", {cx: r() * WW, cy: r() * 380, r: 1.5 + r() * 2.5, fill: "#fff", opacity: .6}, g));
  // 빌딩 실루엣 + 창문
  w.win = [];
  for (let x = 0; x < WW; ) {const bw = 120 + r() * 160, bh = 260 + r() * 420;
    S("rect", {x, y: 1000 - bh, width: bw, height: bh, fill: U("bld")}, g);
    for (let yy = 1000 - bh + 30; yy < 980; yy += 46) for (let xx = x + 18; xx < x + bw - 30; xx += 38)
      if (r() < .45) w.win.push(S("rect", {x: xx, y: yy, width: 20, height: 26, fill: "#ffd98a", opacity: .25 + r() * .5}, g));
    x += bw + 10 + r() * 30}
  S("rect", {x: 0, y: 1000, width: WW, height: 60, fill: "#3a3f4c"}, g);              // 인도
  S("rect", {x: 0, y: 1060, width: WW, height: H - 1060, fill: U("road")}, g);
  w.lane = S("path", {d: Array.from({length: 60}, (_, i) => `M${i * 90},1180 L${i * 90 + 50},1180`).join(" "), stroke: "#e8e8e8", "stroke-width": 8, opacity: .5}, g);
  // 0: 거리 — 택시와 손님
  w.pax = [180, 420, 880].map(x => img(w.layer, "person_raising_hand", x, 1010, 150));
  w.cab = img(w.layer, "taxi", 540, 1160, 300);
  // 1080: 한 시간 수입 (한가한 날 / 바쁜 날)
  w.clk = [-1, 1].map(k => img(w.layer, "alarm_clock", 1080 + 540 + k * 250, 560, 190));
  [-1, 1].forEach(k => ST(g, 1080 + 540 + k * 250, 330, k < 0 ? "한가한 날" : "바쁜 날", {"font-size": 52, "font-weight": 800, fill: k < 0 ? "#c9cfe6" : YEL}));
  w.hc = [[-1, 2], [1, 4]].map(([k, m]) => Array.from({length: m}, (_, i) => img(w.layer, "coin", 1080 + 540 + k * 250 + (i - (m - 1) / 2) * 80, 820, 90)));
  [-1, 1].forEach(k => ST(g, 1080 + 540 + k * 250, 900, "한 시간에", {"font-size": 40, "font-weight": 700, fill: "#e8f1ff"}));
  // 2160: 두 날 — 시간 칸(한 칸 = 1시간) 위에 동전(시간당)
  w.rows = [["바쁜 날", 3, YEL, 560], ["한가한 날", 2, "#c9cfe6", 880]].map(([t, per, col, y]) => {
    ST(g, 2160 + 70, y + 10, t, {"font-size": 44, "font-weight": 800, fill: col, "text-anchor": "start"});
    const blocks = Array.from({length: 12}, (_, i) => {const gg = S("g", {opacity: 0}, g), x = 2160 + 300 + i * 62;
      S("rect", {x, y, width: 54, height: 60, rx: 10, fill: col, opacity: .85}, gg);
      for (let k = 0; k < per; k++) S("circle", {cx: x + 27, cy: y - 18 - k * 26, r: 16, fill: GOLD, stroke: "#b8860b", "stroke-width": 3}, gg);
      return gg});
    const lab = ST(g, 2160 + 300, y + 110, "", {"font-size": 40, "font-weight": 800, fill: "#fff", "text-anchor": "start"});
    return {blocks, lab, per}});
  // 3240: 목표 통
  const jx = 3240 + 540;
  S("rect", {x: jx - 170, y: 380, width: 340, height: 600, rx: 40, fill: U("jar"), stroke: "#cfe6ff", "stroke-width": 6}, g);
  w.jfill = S("rect", {x: jx - 158, y: 968, width: 316, height: 0, rx: 28, fill: GOLD, opacity: .85}, g);
  S("line", {x1: jx - 220, y1: 520, x2: jx + 220, y2: 520, stroke: RED, "stroke-width": 8, "stroke-dasharray": "22 14"}, g);
  ST(g, jx - 235, 535, "하루 목표", {"font-size": 46, "font-weight": 800, fill: RED, "text-anchor": "end"});
  w.target = img(w.layer, "bullseye", jx + 330, 560, 140);
  w.home = img(w.layer, "house", jx + 330, 980, 200);
  // 앞쪽(흐린) 신호등 기둥: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(7px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: H, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => {S("rect", {x: x - 14, y: 0, width: 28, height: 1300, fill: "#0b0e18", opacity: .9}, fs);
    S("rect", {x: x - 50, y: 160, width: 100, height: 230, rx: 18, fill: "#0b0e18"}, fs);
    [[200, RED], [270, YEL], [340, "#4ad66d"]].forEach(([y, c]) => S("circle", {cx: x, cy: y, r: 24, fill: c, opacity: .7}, fs))});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.stars.forEach((s, i) => {if (i % 4 === 0) s.setAttribute("opacity", .3 + .5 * Math.abs(Math.sin(lt * 1.5 + i)))});
    w.win.forEach((e, i) => {if (i % 23 === 0) e.setAttribute("opacity", .2 + .6 * Math.abs(Math.sin(lt * .7 + i)))});
    w.lane.setAttribute("transform", `translate(${-(lt * 260) % 90},0)`);
    imgAt(w.cab, 540 + 14 * Math.sin(lt * 1.3), 1160 - 4 * Math.abs(Math.sin(lt * 9)), 1, 0)};
  w.paxOn = (lt, t0) => w.pax.forEach((p, i) => {const u = spr((lt - t0 - i * .3) / .5); p.style.opacity = clamp(u * 2);
    imgAt(p, [180, 420, 880][i], 1010 - 8 * Math.abs(Math.sin(lt * 4 + i)), clamp(u, 0, 1.2), 0)});
  w.hour = (lt, t0) => {w.clk.forEach((c, i) => imgAt(c, 1080 + 540 + (i ? 250 : -250), 560, 1, 6 * Math.sin(lt * 8 + i)));
    w.hc.forEach((cs, j) => cs.forEach((c, i) => {const u = spr((lt - t0 - j * .5 - i * .15) / .4); c.style.opacity = clamp(u * 2);
      imgAt(c, 1080 + 540 + (j ? 250 : -250) + (i - (cs.length - 1) / 2) * 80, 820, clamp(u, 0, 1.2), 0)}))};
  // 두 날: hrs = [바쁜 날 시간, 한가한 날 시간]
  w.days = (lt, t0, hrs) => w.rows.forEach((rw, j) => {
    rw.blocks.forEach((b, i) => b.setAttribute("opacity", i < hrs[j] && lt > t0 + j * .6 + i * .07 ? 1 : 0));
    const done = lt > t0 + j * .6 + hrs[j] * .07;
    rw.lab.textContent = done ? `${hrs[j]}시간 · 동전 ${hrs[j] * rw.per}개` : "";
  });
  w.jar = u => {const v = clamp(u) * 448; w.jfill.setAttribute("height", v); w.jfill.setAttribute("y", 968 - v)};
  w.paxOn(-99, 0); w.hour(-99, 0); w.days(-99, 0, [0, 0]); w.jar(0); w.home.style.opacity = 0;
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 (밤거리) */
scene({id: "hook", lines: [
  ["손님 많은 날, 택시_기사는 **일찍_퇴근**할까?", "손님이 많은 날, 택시 기사는 오히려 일찍 퇴근할까요?", "pop"],
  ["1997년 **QJE**에 실린 논문", "천구백구십칠 년에 나온 논문입니다."],
  ["저자: 캐머러, 밥콕, 로웬스타인, 세일러", "저자는, 캐머러, 밥콕, 로웬스타인, 세일러입니다."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.h = kin(hud, 170, "손님 많은 날<br>**일찍 퇴근**?", 106);
    c.j = kin(hud, 190, "**1997** · QJE", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.paxOn(lt, .6);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 설정: 스스로 정하는 근무 시간, 바쁜 날 = 시간당 수입 높은 날 */
scene({id: "setup", lines: [
  ["뉴욕 택시 기사는 하루에 **몇_시간** 일할지 스스로 정한다", "뉴욕 택시 기사는, 하루에 몇 시간 일할지 스스로 정합니다.", "pop"],
  ["손님이 많은 날 = 한 시간에 **버는 돈**이 많은 날", "손님이 많은 날은, 한 시간에 버는 돈이 많은 날이죠.", "coin"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 800, s: lt < L[1] ? lerp(1, 1.08, ease(lt / 3)) : 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, L[1], 0, 1080, .9)); w.paxOn(lt, -9);
    w.hour(lt, L[1] + .7);
    c.o.up(lt, {mood: "normal", point: ease((lt - L[1] - .7) / .5), look: [.8, -.5]});
  }
});

/* 3. 교과서의 예측 */
scene({id: "theory", lines: [
  ["교과서대로라면: 잘 벌리는 날 **더 오래**, 안 벌리는 날 쉬기", "교과서대로라면, 잘 벌리는 날 더 오래 일하고, 안 벌리는 날은 쉬어야 합니다.", "whoosh@0.2"],
  ["그래야 같은 시간을 일하고도 **더 많이** 번다", "그래야 같은 시간을 일하고도, 더 많이 벌 수 있으니까요.", "coin"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.b = CX(hud, 1120, "<span class='chip'>교과서의 예측</span> &nbsp;한 칸 = 1시간 · 동전 = 수입", "", {fontSize: "36px", fontWeight: 700, color: "#fff"});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.days(lt, .9, [12, 8]); ap(c.b, lt, 1.2);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", look: [.7, -.6]});
  }
});

/* 4. 실제 결과 */
scene({id: "result", lines: [
  ["연구진은 기사들의 **운행 기록지**를 분석", "연구진은 택시 기사들의 운행 기록지를 분석했습니다.", "pop"],
  ["결과: 잘 벌리는 날 **더 일찍** 퇴근했다", "그런데 잘 벌리는 날, 오히려 더 일찍 퇴근했습니다.", "ding"],
  ["특히 **경력이_짧은_기사**는 약_10% 덜 일했다", "특히 경력이 짧은 기사는, 시간당 수입이 십 퍼센트 많은 날, 일하는 시간이 약 십 퍼센트 짧았죠."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.clip = img(hud, "clipboard", 540, 640, 260);
    c.b = CX(hud, 1120, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>실제 기록</span> &nbsp;단순화한 그림", "", {fontSize: "36px", fontWeight: 700, color: "#fff"});
    c.n = CX(hud, 170, "", "", {fontSize: "84px", fontWeight: 800, color: "#fff", textShadow: "0 6px 0 rgba(0,0,0,.4)"});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1.02, 1.05, ease((lt - L[2]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(2160);
    const tc = spr((lt - .2) / .5); imgAt(c.clip, 540, 640, clamp(tc, 0, 1.2) * (1 - P(lt, L[1] - .3, .3)), -4);
    c.clip.style.opacity = clamp(tc * 2) * (1 - P(lt, L[1] - .3, .3));
    w.days(lt < L[1] ? -99 : lt, L[1] + .1, [8, 12]); ap(c.b, lt, L[1] + .3);
    c.n.innerHTML = `시간당 수입 <span style="color:${YEL}">+10%</span><br>→ 일하는 시간 <span style="color:${CORAL}">약 −10%</span>`;
    c.n.style.opacity = P(lt, L[2] + .2, .3);
    c.o.up(lt, {mood: lt > L[1] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 5. 해석: 하루 목표 수입 */
scene({id: "why", lines: [
  ["연구진이 꼽은 설명: **하루 목표 수입**", "연구진이 꼽은 설명은, 하루 목표 수입입니다.", "pop"],
  ["하루를 따로 계산해서, 목표한 돈을 채우면 **그날은 끝**", "하루를 따로 계산해서, 목표한 돈을 채우면 그날은 일을 끝낸다는 거죠.", "ding"]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.t = CX(hud, 1120, "", "", {fontSize: "44px", fontWeight: 800, color: "#fff"});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.06, ease((lt - L[1]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    const busy = Math.floor(lt / 3.2) % 2 === 0, cyc = (lt - 1) % 3.2, u = clamp(cyc / 2.4);
    w.jar(lt < 1 ? 0 : u);
    c.t.innerHTML = lt < 1 ? "" : `${busy ? "<span style='color:#ffd23f'>바쁜 날</span>" : "한가한 날"} · ${Math.round(u * (busy ? 8 : 12))}시간째`;
    c.t.style.opacity = P(lt, 1, .3);
    const th = spr((cyc - 2.4) / .4); w.home.style.opacity = lt > 1 && cyc > 2.4 ? clamp(th * 2) : 0;
    imgAt(w.home, 3240 + 540 + 330, 980, clamp(th, 0, 1.2), 0);
    imgAt(w.target, 3240 + 540 + 330, 560 - 10 * Math.abs(Math.sin(lt * 3)), 1, 0);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "normal", point: ease((lt - .6) / .5), look: [.8, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**하루씩, 그날그날**〉", "논문 제목은, 하루씩, 그날그날 입니다.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: cityWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1000, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 3240, 0, 1)); w.paxOn(lt, -9);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
