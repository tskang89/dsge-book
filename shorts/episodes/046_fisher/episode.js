/* 오늘의 경제 046 — 휴대폰과 어부 (v3: 부엉이 진행자·한 공간 카메라 이동·바다와 바닷가 시장·기지국·가격 기둥)
   논문: Jensen, R. (2007) "The Digital Provide: Information (Technology), Market Performance, and Welfare in the
         South Indian Fisheries Sector", Quarterly Journal of Economics 122(3): 879–924. doi:10.1162/qjec.122.3.879
   확인(2026-11-19, 원문 PDF 는 이 세션에서 막힘 — 초록(EconPapers·IDEAS), The Economist 요약(NextBillion 전재),
        Foreign Policy 기사 검색 결과로 확인):
   - 인도 케랄라 주, 1997~2001년 휴대폰 서비스가 지역마다 다른 때 들어온 것을 자연 실험으로 이용(초록)
   - 어부·도매상의 휴대폰 사용과 함께: 가격 차이 급감, 버려지는 생선 완전히 사라짐, 일물일가 법칙에 거의 들어맞음,
     소비자·생산자 후생 모두 증가(초록)
   - 정어리(2차 자료), 버려지던 생선: 처음 잡은 양의 5~8% → 0(The Economist 요약)
   - 자기 마을 밖 시장에 판 어부 비율: 0 → 약 35%(The Economist 요약)
   - 어부 이윤 평균 약 8% 증가, 생선 가격 약 4% 하락(The Economist·Foreign Policy 요약)
   반론(설명란에만): 소형 배 어부가 다수이고 당시 휴대폰은 큰 동력선 위주였다는 비판(ICTworks 등).
   가격 기둥 높이는 개념 그림(실제 가격 아님). */
Object.assign(EP, {no: 46, style: "v2", title: "휴대폰과 어부", hook: "휴대폰이 들어오자 버려지던 생선이 사라졌다?",
  bgm: {seed: 879, bpm: 98, mood: "calm"},
  paper: {journal: "Quarterly Journal of Economics", year: 2007, authors: "Robert Jensen",
          title: "The Digital Provide: Information (Technology), Market Performance, and Welfare in the South Indian Fisheries Sector", ko: "디지털이 준 선물: 남인도 어업의 정보 기술, 시장 성과, 후생",
          cite: "122(3): 879–924", url: "https://doi.org/10.1162/qjec.122.3.879"},
  yt: {title: "휴대폰이 들어오자 버려지던 생선이 사라졌다 #경제 #shorts",
       desc: "인도 남부 케랄라 주의 어부들은 정어리를 잡아 바닷가 시장에 판다. 그런데 어느 시장에 손님이 많은지 바다 위에서는 알 수 없었다. 그래서 어떤 날은 한 시장엔 생선이 남아돌고 바로 옆 시장엔 모자랐다. 팔리지 않은 생선은 바다에 버려졌는데, 잡은 양의 5~8%나 됐다. 시장마다 생선 가격도 들쭉날쭉했다. 1997년부터 2001년 사이 휴대폰 서비스가 지역마다 다른 때에 들어왔고, 젠슨 교수는 먼저 들어온 지역과 아직 안 들어온 지역을 비교했다. 어부들은 바다 위에서 전화로 시장 가격을 묻고 갈 시장을 골랐다. 자기 마을 밖 시장에 판 어부는 0%에서 약 35%로 늘었고, 버려지는 생선은 아예 없어졌다. 시장마다 들쭉날쭉하던 가격도 거의 같아져, 같은 물건은 어디서나 같은 값이라는 일물일가의 법칙(Law of One Price)에 가까워졌다. 어부의 이윤은 평균 약 8% 늘고 생선 가격은 약 4% 내렸다. 정보가 전해지자 어부도 손님도 둘 다 이득을 봤다. (반론: 케랄라 어부의 다수는 작은 배를 타며, 당시 휴대폰은 큰 동력선 위주로 쓰였다는 비판도 있다. 가격 기둥은 개념 그림이다.)",
       tags: ["경제", "개발경제학", "정보", "휴대폰", "일물일가", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 바닷가 시장 | 1080 기지국 | 2160 결과 | 3240 이득
let WID = 0;
const halo = {stroke: "#10202a", "stroke-width": 8, "paint-order": "stroke"};
const MK = [200, 540, 880];            // 시장 세 곳의 x(각 구역 안)

function seaWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`, R = rng(46);
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops) => {const l = S("linearGradient", {id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("sky", [[0, "#3a7bd5"], [1, "#9fd3f0"]]); lg("sea", [[0, "#1e6fa8"], [1, "#0e3f66"]]); lg("sand", [[0, "#e0c890"], [.22, "#9a7848"], [.36, "#3a2a1a"], [1, "#1a140c"]]);
  lg("aw", [[0, "#e85d5d"], [1, "#b83a3a"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 640, fill: U("sky")}, g);
  w.clouds = Array.from({length: 14}, () => {const c = S("g", {opacity: .8}, g), x = R() * WW, y = 120 + R() * 250;
    [[0, 0, 60], [55, 10, 45], [-50, 12, 40]].forEach(([dx, dy, r]) => S("circle", {cx: x + dx, cy: y + dy, r, fill: "#fff"}, c)); return {c, x}});
  S("rect", {x: 0, y: 640, width: WW, height: 300, fill: U("sea")}, g);
  w.waves = Array.from({length: 4}, (_, i) => S("path", {d: "", fill: "none", stroke: "#cfeaff", "stroke-width": 4, opacity: .35}, g));
  S("rect", {x: 0, y: 930, width: WW, height: H - 930, fill: U("sand")}, g);
  for (let i = 0; i < 300; i++) S("circle", {cx: R() * WW, cy: 940 + R() * 900, r: 2 + R() * 3, fill: "#8a6a3a", opacity: .25}, g);
  const stall = (x, lab) => {S("rect", {x: x - 120, y: 990, width: 240, height: 120, rx: 8, fill: "#8a6a4a"}, g);
    S("path", {d: `M${x - 140},990 L${x + 140},990 L${x + 120},940 L${x - 120},940 Z`, fill: U("aw")}, g);
    for (let k = -2; k <= 2; k++) S("rect", {x: x + k * 56 - 14, y: 942, width: 28, height: 46, fill: "#fff", opacity: .55}, g);
    ST(g, x, 1070, lab, {"font-size": 34, "font-weight": 900, fill: "#fff", ...halo})};
  // 0: 바닷가 시장 셋 + 들어오는 배
  MK.forEach((x, i) => stall(x, ["시장 A", "시장 B", "시장 C"][i]));
  w.boat0 = img(w.layer, "motor_boat", 540, 840, 210);
  w.fishA = Array.from({length: 9}, (_, i) => img(w.layer, "fish", MK[0] - 80 + (i % 3) * 80, 990 - Math.floor(i / 3) * 40, 80));
  w.fishC = [img(w.layer, "fish", MK[2], 990, 80)];
  w.buyers = [0, 1, 2].map(i => img(w.layer, ["man", "woman", "person"][i], MK[2] - 90 + i * 90, 1260, 110));
  w.dump = Array.from({length: 4}, () => img(w.layer, "fish", 0, 0, 70));
  w.wasteT = ST(g, MK[0], 790, "버려지는 생선", {"font-size": 40, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  w.q = ST(g, 540, 560, "어느 시장으로?", {"font-size": 52, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  w.p0 = MK.map((x, i) => {const hh = [60, 170, 300][i];
    return {r: S("rect", {x: x - 40, y: 520 - hh, width: 80, height: hh, rx: 10, fill: GOLD, opacity: 0}, g), hh}});
  w.p0T = ST(g, 540, 580, "시장마다 가격 들쭉날쭉 (개념 그림)", {"font-size": 34, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  // 1080: 기지국 셋
  w.tw = [1080 + 200, 1080 + 540, 1080 + 880].map((x, i) => {const t = S("g", {opacity: .25}, g);
    S("path", {d: `M${x - 50},930 L${x},560 L${x + 50},930 Z`, fill: "none", stroke: "#4a5a6a", "stroke-width": 10}, t);
    for (let k = 0; k < 5; k++) S("line", {x1: x - 50 + k * 8, y1: 930 - k * 74, x2: x + 50 - k * 8, y2: 930 - k * 74, stroke: "#4a5a6a", "stroke-width": 6}, t);
    const sig = [1, 2, 3].map(k => S("path", {d: `M${x - 30 * k},${560 - 20 * k} Q${x},${520 - 40 * k} ${x + 30 * k},${560 - 20 * k}`, fill: "none", stroke: TEAL, "stroke-width": 7, opacity: 0}, g));
    const lab = ST(g, x, 1010, ["먼저", "다음", "나중"][i], {"font-size": 40, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
    return {t, sig, lab}});
  w.twT = ST(g, 1080 + 540, 420, "1997~2001년, 지역마다 다른 때", {"font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  w.boat1 = img(w.layer, "motor_boat", 1080 + 380, 860, 200); w.phone = img(w.layer, "mobile_phone", 1080 + 420, 720, 100); w.phone.style.opacity = 0;
  w.callT = ST(g, 1080 + 700, 700, "시장 B 가격은?", {"font-size": 40, "font-weight": 900, fill: GOLD, opacity: 0, ...halo});
  // 2160: 결과 — 시장 셋, 가격 기둥 같아짐
  MK.forEach((x, i) => stall(2160 + x, ["시장 A", "시장 B", "시장 C"][i]));
  w.boats2 = [0, 1, 2].map(i => img(w.layer, "motor_boat", 0, 0, 160));
  w.fish2 = MK.map(x => [0, 1, 2].map(k => img(w.layer, "fish", 2160 + x - 70 + k * 70, 990, 75)));
  w.p2 = MK.map((x, i) => {const hh = [60, 170, 300][i];
    return {r: S("rect", {x: 2160 + x - 40, y: 0, width: 80, height: 0, rx: 10, fill: GOLD, opacity: 0}, g), hh}});
  w.p2T = ST(g, 2160 + 540, 600, "", {"font-size": 34, "font-weight": 900, fill: "#fff", ...halo});
  w.cnt = ST(g, 2160 + 540, 300, "", {"font-size": 92, "font-weight": 900, fill: GOLD, ...halo});
  w.cntL = ST(g, 2160 + 540, 370, "다른 마을 시장에서 판 어부", {"font-size": 38, "font-weight": 900, fill: "#fff", opacity: 0, ...halo});
  w.bin = img(w.layer, "wastebasket", 2160 + 900, 860, 140); w.bin.style.opacity = 0;
  w.binX = img(w.layer, "cross_mark", 2160 + 900, 820, 110); w.binX.style.opacity = 0;
  // 3240: 둘 다 이득
  w.fisher = img(w.layer, "man", 3240 + 280, 1060, 230); w.buyer = img(w.layer, "woman", 3240 + 800, 1060, 230);
  w.coins = Array.from({length: 6}, (_, i) => img(w.layer, "coin", 3240 + 280, 0, 80));
  w.tag = img(w.layer, "label", 3240 + 800, 760, 150);
  w.fT = ST(g, 3240 + 280, 560, "어부 이윤 약 +8%", {"font-size": 44, "font-weight": 900, fill: GOLD, opacity: 0, ...halo});
  w.bT = ST(g, 3240 + 800, 560, "생선 가격 약 −4%", {"font-size": 44, "font-weight": 900, fill: TEAL, opacity: 0, ...halo});
  // 앞쪽(흐린) 갈매기·야자잎: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 360, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [200, 1300, 2400, 3500, 4600].forEach(x => {for (let k = 0; k < 5; k++) S("path", {d: `M${x},-20 Q${x + 60 + k * 30},${60 + k * 30} ${x + 180 + k * 40},${100 + k * 50}`, fill: "none", stroke: "#1e5a2a", "stroke-width": 26, "stroke-linecap": "round", opacity: .9}, fs)});
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {w.clouds.forEach((c, i) => c.c.setAttribute("transform", `translate(${(lt * (6 + i)) % 200},0)`));
    w.waves.forEach((p, i) => {let s = ""; for (let x = 0; x <= WW; x += 60) s += `${x ? "L" : "M"}${x},${690 + i * 60 + 8 * Math.sin(x / 70 + lt * 2 + i)}`; p.setAttribute("d", s)});
    imgAt(w.boat1, 1080 + 380, 860 + 6 * Math.sin(lt * 2), 1, 3 * Math.sin(lt * 1.6))};
  w.market = (lt, tb, tq, tw, tp) => {const u = ease((lt - tb) / 1.4); imgAt(w.boat0, lerp(1250, 540, u), 840 + 6 * Math.sin(lt * 2), 1, 3 * Math.sin(lt * 1.6));
    w.q.setAttribute("opacity", lt > tq && lt < tw ? P(lt, tq, .3) : 0);
    w.wasteT.setAttribute("opacity", P(lt, tw, .3));
    w.dump.forEach((f, i) => {const v = ((lt - tw - i * .5) % 2) / 2, on = lt > tw + i * .5; f.style.opacity = on ? 1 - v : 0;
      imgAt(f, MK[0] - 60 + i * 40 - 120 * v, 990 - 200 * Math.sin(Math.PI * Math.min(v * 1.2, 1)) + 60 * v, 1, -200 * v)});
    w.buyers.forEach((b, i) => imgAt(b, MK[2] - 90 + i * 90, 1260 - 5 * Math.abs(Math.sin(lt * 3 + i)), 1, 0));
    w.p0.forEach((p, i) => p.r.setAttribute("opacity", P(lt, tp + i * .2, .3))); w.p0T.setAttribute("opacity", P(lt, tp, .3))};
  w.tower = (lt, ts, tc) => {w.twT.setAttribute("opacity", P(lt, ts[0], .3));
    w.tw.forEach((t, i) => {const on = lt > ts[i]; t.t.setAttribute("opacity", on ? 1 : .25); t.lab.setAttribute("opacity", P(lt, ts[i], .3));
      t.sig.forEach((s, k) => s.setAttribute("opacity", on ? .5 + .5 * Math.sin(lt * 4 - k) : 0))});
    w.phone.style.opacity = P(lt, tc, .3); imgAt(w.phone, 1080 + 420, 720 + 6 * Math.sin(lt * 2), lt > tc ? 1 + .06 * Math.sin(lt * 10) : 1, 0);
    w.callT.setAttribute("opacity", P(lt, tc + .4, .3))};
  w.result = (lt, tr, tw, tp, tl) => {
    w.boats2.forEach((b, i) => {const u = ease((lt - tr - i * .3) / 1.5); b.style.opacity = lt > tr - .5 ? 1 : 0;
      imgAt(b, lerp(2160 + 540, 2160 + MK[i], u), lerp(700, 860, u) + 5 * Math.sin(lt * 2 + i), 1, 0)});
    if (lt > tr) countTo(w.cnt, lt, tr + .3, 0, 35, v => `0% → 약 ${Math.round(v)}%`); else w.cnt.textContent = "";
    w.cntL.setAttribute("opacity", P(lt, tr + .3, .3));
    w.bin.style.opacity = P(lt, tw, .3); w.binX.style.opacity = P(lt, tw + .4, .3); imgAt(w.binX, 2160 + 900, 820, spr((lt - tw - .4) / .4), 0);
    const e = ease((lt - tp) / 1.4);
    w.p2.forEach(p => {const hh = lt < tp - .3 ? 0 : lerp(p.hh, 170, e); p.r.setAttribute("y", 560 - hh); p.r.setAttribute("height", hh); p.r.setAttribute("opacity", lt > tp - .3 ? 1 : 0)});
    w.p2T.textContent = lt < tp - .3 ? "" : (e < .5 ? "시장마다 가격 들쭉날쭉" : (lt > tl && tl > 0 ? "같은 물건은 어디서나 같은 값" : "가격이 거의 비슷해짐 (개념 그림)"));
    };
  w.gain = (lt, tf, tb) => {w.fT.setAttribute("opacity", P(lt, tf, .3)); w.bT.setAttribute("opacity", P(lt, tb, .3));
    w.coins.forEach((c, i) => {const u = spr((lt - tf - i * .12) / .4); c.style.opacity = clamp(u * 2); imgAt(c, 3240 + 280, 780 - i * 26, clamp(u, 0, 1.1), 0)});
    imgAt(w.tag, 3240 + 800, 760, lt > tb ? .85 + .05 * Math.sin(lt * 5) : 1, lt > tb ? -12 : 0);
    imgAt(w.fisher, 3240 + 280, 1060 - (lt > tf ? 8 * Math.abs(Math.sin(lt * 4)) : 0), 1, 0); imgAt(w.buyer, 3240 + 800, 1060 - (lt > tb ? 8 * Math.abs(Math.sin(lt * 4 + 1)) : 0), 1, 0)};
  w.market(-99, 99, 99, 99, 99); w.tower(-99, [99, 99, 99], 99); w.result(-99, 99, 99, 99, 0); w.gain(-99, 99, 99);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["휴대폰이 오자 **버려지던 생선**이 사라졌다?", "휴대폰이 들어오자, 바다에 버려지던 생선이 사라졌다면요?", "pop"],
  ["2007년 **QJE**에 실린 논문", "이천칠 년에 발표된 논문입니다."],
  ["저자: 젠슨_교수", "저자는, 젠슨 교수입니다."]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.h = kin(hud, 120, "휴대폰 → **버려진 생선 0**?", 84);
    c.j = kin(hud, 120, "**2007** · QJE", 96);
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt) {return {x: 540, y: 820, s: lerp(1.12, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.market(lt, -9, 99, .6, 99);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 140, ease((lt - .3) / .7)), mood: lt < L[1] ? "surprised" : "normal", look: [.7, -.4]});
  }
});

/* 2. 문제 */
scene({id: "problem", lines: [
  ["인도 남쪽 **케랄라**의 어부들: 정어리를 잡아 바닷가 시장에", "인도 남쪽, 케랄라 주의 어부들은, 정어리를 잡아서, 바닷가 시장에서 팔았습니다.", "whoosh@0.1"],
  ["어느 시장에 손님이 많은지 **바다 위에선 모른다**", "그런데 어느 시장에 손님이 많은지, 바다 위에서는 알 수 없었습니다."],
  ["한 시장엔 생선이 **남고**, 옆 시장엔 **모자란다**", "그래서 어떤 날은, 한 시장엔 생선이 남아돌고, 바로 옆 시장엔 모자랐죠."],
  ["팔리지 않은 생선은 **버려졌다**(잡은 양의 5~8%)", "팔리지 않은 생선은 바다에 버려졌습니다. 잡은 양의, 오에서 팔 퍼센트나 됐습니다."],
  ["시장마다 생선 가격도 **들쭉날쭉**", "시장마다 생선 가격도, 들쭉날쭉했고요."]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.market(lt, .2, L[1] + .2, L[3] + .2, L[4] + .2);
    c.o.up(lt, {mood: lt > L[3] ? "skeptical" : "normal", look: [.7, -.5]});
  }
});

/* 3. 자연 실험 */
scene({id: "design", lines: [
  ["1997~2001년: 휴대폰이 **지역마다 다른 때** 들어왔다", "천구백구십칠 년부터 이천일 년 사이, 휴대폰 서비스가, 지역마다 다른 때에 들어왔습니다.", "pop"],
  ["먼저 들어온 지역 vs 아직인 지역을 **비교**", "그래서 이 논문은, 휴대폰이 먼저 들어온 지역과, 아직 안 들어온 지역을 비교했습니다."],
  ["전화로 **시장 가격**을 물어보고 갈 시장을 골랐다", "어부들은 바다 위에서 전화로 시장 가격을 물어보고, 갈 시장을 골랐습니다."]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 800, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.market(99, 0, 0, 0, 0); w.pan(whip(lt, 0, 0, 1080, .9));
    w.tower(lt, [1, 2, 3.2].map(t => L[0] + t), L[2] + .3);
    c.o.up(lt, {mood: "normal", look: [.7, -.5]});
  }
});

/* 4. 결과 */
scene({id: "result", lines: [
  ["다른 마을 시장에서 판 어부: **0% → 약 35%**", "자기 마을이 아닌, 다른 시장에서 판 어부는, 영 퍼센트에서, 약 삼십오 퍼센트로 늘었습니다.", "coin"],
  ["버려지는 생선: 5~8% → **0**", "그리고 버려지는 생선은, 아예 없어졌습니다.", "ding"],
  ["시장마다 들쭉날쭉하던 가격이 **거의 비슷해졌다**", "시장마다 들쭉날쭉하던 가격도, 거의 비슷해졌습니다."],
  ["→ **일물일가의 법칙**(Law of One Price)", "같은 물건은 어디서나 같은 값이라는, 일물, 일가의 법칙에 가까워진 거죠."]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt) {return {x: 540, y: 780, s: 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.tower(99, [0, 0, 0], 0); w.pan(whip(lt, 0, 1080, 2160, .9)); w.result(lt, .8, L[1] + .2, L[2] + .3, L[3] + .2);
    c.o.up(lt, {mood: lt > L[1] ? "happy" : "surprised", look: [.7, -.6]});
  }
});

/* 5. 이득 */
scene({id: "gain", lines: [
  ["어부가 버는 돈(이윤)은 평균 **약 8%↑**", "어부가 버는 돈은, 평균 약 팔 퍼센트 늘었고,", "coin"],
  ["생선 가격은 **약 4%↓**", "생선 가격은, 약 사 퍼센트 내렸습니다.", "coin"],
  ["**정보**가 전해지자 어부도 손님도 **둘 다 이득**", "정보가 전해지자, 어부도, 손님도, 둘 다 이득을 본 겁니다.", "ding"]],
  build(el, hud) {
    const c = {w: seaWorld(el)};
    c.o = host(hud, "owl", {x: 140, y: 1280, s: .6});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 800, s: lerp(1, 1.05, ease((lt - L[2]) / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.result(99, 0, 0, 0, 0); w.pan(whip(lt, 0, 2160, 3240, .9)); w.gain(lt, L[0] + .3, L[1] + .2);
    c.o.up(lt, {mood: "happy", look: [.7, -.5]});
  }
});

/* 6. 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**디지털이 준 선물**〉", "논문 제목은, 디지털이 준 선물입니다.", "ding"],
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
    const w = c.w; w.anim(lt); w.pan(3240); w.gain(lt, -9, -9);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
