/* 오늘의 경제 003 — 이름만 바꾼 이력서 (v3: 부엉이 진행자·한 공간 카메라 이동·이력서 더미)
   논문: Bertrand, M. & Mullainathan, S. (2004) "Are Emily and Greg More Employable than Lakisha and Jamal?
         A Field Experiment on Labor Market Discrimination", American Economic Review 94(4): 991–1013.
         doi:10.1257/0002828042002561
   영상 속 숫자 확인(2026-11-14):
   - 보스턴·시카고 신문 구인 광고에 가짜 이력서, 이름은 무작위 배정(AER 초록)
   - 구인 광고 1,300곳 넘게, 이력서 약 5,000장(J-PAL 요약, 논문 본문 'nearly 5,000 resumes', 'over 1,300 ads')
   - 회신(면접 연락)률: 백인으로 들리는 이름 9.65%, 흑인으로 들리는 이름 6.45% — 차이 3.20%p, 비율 1.50(Table 1, AER 판)
     → 초록 "White names receive 50 percent more callbacks for interviews"
     → 본문: 백인 이름은 약 10장에 1번, 흑인 이름은 약 15장에 1번 회신
   - 백인 이름의 효과 ≈ 이력서 경력 8년 추가와 같은 회신 증가(본문)
   - 이름 예: Emily Walsh, Greg Baker / Lakisha Washington, Jamal Jones(본문)
   - (영상에서 뺌) 좋은 이력서의 효과가 백인 이름 +30%, 흑인 이름은 훨씬 작음; 직종·업종·회사 크기와 무관하게 격차 비슷 — 규칙 12
   검산: 9.65% ≈ 1/10.4, 6.45% ≈ 1/15.5 → '10장에 1번', '15장에 1번'(약). 30장씩: 3번 vs 2번 = 1.5배 = 50% 더(9.65/6.45 = 1.496). */
Object.assign(EP, {no: 3, style: "v2", title: "이름만 바꾼 이력서", hook: "이력서 이름만 바꾸면 연락이 달라질까?",
  bgm: {seed: 41, bpm: 96, mood: "calm"},
  paper: {journal: "American Economic Review", year: 2004, authors: "Marianne Bertrand & Sendhil Mullainathan",
          title: "Are Emily and Greg More Employable than Lakisha and Jamal?", ko: "에밀리와 그레그는 라키샤와 자말보다 취업이 잘 될까?",
          cite: "94(4): 991–1013", url: "https://doi.org/10.1257/0002828042002561"},
  yt: {title: "이력서 이름만 바꿨더니 면접 연락이 달라졌다 | 2004 AER 현장 실험 #경제 #shorts",
       desc: "연구진이 보스턴·시카고의 구인 광고 1,300곳 넘게 가짜 이력서 약 5,000장을 보냈다. 이름은 이력서 내용과 상관없이 무작위로 붙였다. 백인으로 들리는 이름(에밀리, 그레그)은 면접 연락률 9.65%, 흑인으로 들리는 이름(라키샤, 자말)은 6.45% — 약 10장에 1번 vs 15장에 1번으로, 백인으로 들리는 이름이 연락을 50% 더 받았다. 연구진 계산으로 이 차이는 이력서에 경력 8년을 더한 효과와 비슷하다.",
       tags: ["경제", "노동경제학", "채용", "차별", "현장실험", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65";
const WW = 4320;                       // 세계 너비: 0 우편실 | 1080 이력서 책상 | 2160 회신 게시판 | 3240 저울
let WID = 0;
const GX = [400, 800];                 // 회신 게시판 두 묶음의 가운데(구역 안 x)
const CALL = [[9, 19, 29], [14, 29]];  // 연락받은 이력서 번호: 10장에 1번 / 15장에 1번

/* ---- 넓은 사무실 세계 ---- */
function officeWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#172238"], [1, "#2a3552"]]); lg("floor", [[0, "#3c4a6b"], [1, "#151c2e"]]);
  lg("sky", [[0, "#ff9e6b"], [.55, "#c46b8f"], [1, "#4b4a86"]]); lg("ray", [[0, "#ffd9b0", .26], [1, "#ffd9b0", 0]]);
  lg("desk", [[0, "#8a5a36"], [1, "#4a2e1a"]]); lg("deskT", [[0, "#c08a5a"], [1, "#8a5a36"]]);
  lg("news", [[0, "#f4efe2"], [1, "#ddd5c2"]]); lg("board", [[0, "#c79a63"], [1, "#a27646"]]);
  lg("beam", [[0, "#e7c86a"], [1, "#a8801c"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 900, fill: U("wall")}, g);
  // 창: 노을 도시
  w.rays = S("g", {}, g);
  const r0 = rng(n * 7 + 3);
  [[3300, 4180]].forEach(([a, b]) => {
    S("rect", {x: a, y: 150, width: b - a, height: 300, rx: 16, fill: U("sky")}, g);
    for (let x = a + 10; x < b - 20; x += 40 + r0() * 50) {const h = 60 + r0() * 160;
      S("rect", {x, y: 450 - h, width: 30 + r0() * 40, height: h, fill: "#2b2550", opacity: .85}, g)}
    for (let x = a + 120; x < b; x += 160) S("line", {x1: x, y1: 150, x2: x, y2: 450, stroke: "#172238", "stroke-width": 10}, g);
    S("rect", {x: a, y: 150, width: b - a, height: 300, rx: 16, fill: "none", stroke: "#0f1729", "stroke-width": 12}, g);
    S("path", {d: `M${a},450 L${b},450 L${b + 300},900 L${a + 200},900 Z`, fill: U("ray")}, w.rays);
  });
  S("rect", {x: 0, y: 900, width: WW, height: H - 900, fill: U("floor")}, g);
  for (let i = -6; i <= 64; i++) S("line", {x1: i * 70, y1: 900, x2: i * 70 + (i * 70 % 1080 - 540) * 2.6, y2: 1500, stroke: "#0e1424", "stroke-width": 3, opacity: .4}, g);
  // 우편실: 게시판에 신문 구인 광고 두 장
  S("rect", {x: 470, y: 470, width: 540, height: 600, rx: 22, fill: "#000", opacity: .3, transform: "translate(12,16)"}, g);
  S("rect", {x: 470, y: 470, width: 540, height: 600, rx: 22, fill: U("board"), stroke: "#6b4a26", "stroke-width": 10}, g);
  const news = (x, y, city, rot) => {const p = S("g", {transform: `rotate(${rot} ${x + 230} ${y + 130})`}, g);
    S("rect", {x, y, width: 460, height: 260, rx: 6, fill: U("news"), stroke: "#b8ad96", "stroke-width": 3}, p);
    ST(p, x + 230, y + 62, city, {"font-size": 52, "font-weight": 800, fill: "#2b2b2b", "font-family": "serif"});
    S("line", {x1: x + 24, y1: y + 84, x2: x + 436, y2: y + 84, stroke: "#2b2b2b", "stroke-width": 4}, p);
    ST(p, x + 230, y + 138, "구인 광고", {"font-size": 46, "font-weight": 800, fill: "#b23a3a"});
    for (let k = 0; k < 3; k++) S("rect", {x: x + 30 + k * 140, y: y + 170, width: 120, height: 66, rx: 4, fill: "none", stroke: "#8a826f", "stroke-width": 3}, p);
    S("circle", {cx: x + 230, cy: y + 10, r: 12, fill: "#e85d5d"}, p)};
  news(510, 500, "BOSTON", -3); news(510, 790, "CHICAGO", 2);
  S("rect", {x: 60, y: 1100, width: 520, height: 30, rx: 12, fill: U("deskT")}, g);
  S("rect", {x: 80, y: 1130, width: 480, height: 120, rx: 10, fill: U("desk")}, g);
  w.box = img(w.layer, "mailbox", 410, 1110, 220);
  w.env = Array.from({length: 16}, () => img(w.layer, "envelope", 0, 0, 96));
  // 이력서 책상
  S("rect", {x: 1080 + 40, y: 1040, width: 1000, height: 34, rx: 14, fill: U("deskT")}, g);
  S("rect", {x: 1080 + 70, y: 1074, width: 940, height: 180, rx: 12, fill: U("desk")}, g);
  const resume = (par, cx, top, wd, ht, col) => {const r = S("g", {}, par);
    S("rect", {x: cx - wd / 2 + 10, y: top + 14, width: wd, height: ht, rx: 12, fill: "#000", opacity: .3}, r);
    S("rect", {x: cx - wd / 2, y: top, width: wd, height: ht, rx: 12, fill: "#fbf8f1"}, r);
    S("rect", {x: cx - wd / 2, y: top, width: wd, height: ht * .2, rx: 12, fill: col}, r);
    S("rect", {x: cx - wd / 2, y: top + ht * .2 - 12, width: wd, height: 12, fill: col}, r);
    return r};
  w.big = [0, 1].map(k => {const cx = 1080 + [290, 790][k], col = [TEAL, CORAL][k], r = resume(g, cx, 470, 400, 540, col);
    const nm = ST(r, cx, 470 + 76, "", {"font-size": 56, "font-weight": 800, fill: "#10182a"});
    [["경력", 4], ["학력", 3], ["기술", 3]].forEach(([lab, m], j) => {const y = 470 + 170 + j * 120;
      S("text", {x: cx - 170, y: y, "font-size": 34, "font-weight": 800, fill: "#55607a"}, r).textContent = lab;
      for (let q = 0; q < m - 1; q++) S("rect", {x: cx - 170, y: y + 16 + q * 26, width: [300, 250, 280][q] || 220, height: 12, rx: 6, fill: "#c9cdd8"}, r)});
    return {r, nm}});
  w.tagW = ST(g, 1080 + 290, 445, "백인으로 들리는 이름", {"font-size": 38, "font-weight": 800, fill: TEAL});
  w.tagB = ST(g, 1080 + 790, 445, "흑인으로 들리는 이름", {"font-size": 38, "font-weight": 800, fill: CORAL});
  w.die = img(w.layer, "game_die", 1080 + 540, 420, 130);
  // 회신 게시판: 작은 이력서 30장씩
  w.small = [[], []]; w.ph = [[], []];
  [0, 1].forEach(k => {const cx = 2160 + GX[k], col = [TEAL, CORAL][k];
    ST(g, cx, 455, ["백인으로 들리는 이름", "흑인으로 들리는 이름"][k], {"font-size": 36, "font-weight": 800, fill: col});
    for (let i = 0; i < 30; i++) {const x = cx - 144 + (i % 5) * 72, y = 490 + Math.floor(i / 5) * 90;
      const p = S("g", {opacity: 0}, g);
      S("rect", {x: x - 28, y, width: 56, height: 74, rx: 6, fill: "#fbf8f1"}, p);
      S("rect", {x: x - 28, y, width: 56, height: 16, rx: 6, fill: col}, p);
      [30, 44, 58].forEach(yy => S("rect", {x: x - 18, y: y + yy, width: 36, height: 6, rx: 3, fill: "#c9cdd8"}, p));
      const glow = S("rect", {x: x - 34, y: y - 6, width: 68, height: 86, rx: 10, fill: "none", stroke: GOLD, "stroke-width": 6, opacity: 0}, p);
      w.small[k].push({p, x, y, glow})}
    CALL[k].forEach(i => w.ph[k].push(img(w.layer, "telephone_receiver", 0, 0, 70)))});
  // 저울 구역
  const sx = 3240 + 540;
  S("rect", {x: sx - 160, y: 1110, width: 320, height: 40, rx: 16, fill: U("beam")}, g);
  S("rect", {x: sx - 16, y: 640, width: 32, height: 480, rx: 10, fill: U("beam")}, g);
  w.beam = S("g", {}, g);
  S("rect", {x: sx - 330, y: 626, width: 660, height: 28, rx: 14, fill: U("beam")}, w.beam);
  S("circle", {cx: sx, cy: 640, r: 30, fill: "#f2c14e", stroke: "#a8801c", "stroke-width": 6}, g);
  w.pans = [0, 1].map(k => {const p = S("g", {}, g);
    S("line", {x1: 0, y1: 0, x2: -120, y2: 200, stroke: "#c9a64a", "stroke-width": 5}, p);
    S("line", {x1: 0, y1: 0, x2: 120, y2: 200, stroke: "#c9a64a", "stroke-width": 5}, p);
    S("path", {d: "M-150,200 L150,200 Q130,250 0,252 Q-130,250 -150,200 Z", fill: U("beam")}, p); return p});
  w.card = S("g", {opacity: 0}, g);
  S("rect", {x: -110, y: 120, width: 220, height: 80, rx: 14, fill: TEAL}, w.card);
  ST(w.card, 0, 175, "Emily", {"font-size": 48, "font-weight": 800, fill: "#10182a"});
  w.cal = Array.from({length: 8}, () => img(w.layer, "calendar", 0, 0, 76));
  // 앞쪽(흐린) 천장 조명: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(6px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [200, 1300, 2400, 3500, 4600].forEach(x => {S("rect", {x: x - 200, y: 40, width: 400, height: 46, rx: 10, fill: "#0b1020"}, fs);
    S("rect", {x: x - 180, y: 80, width: 360, height: 14, rx: 7, fill: "#e8f1ff", opacity: .85}, fs)});
  const r = rng(n * 13 + 1);
  w.dust = Array.from({length: 50}, () => ({x: r() * WW, y: 150 + r() * 750, s: .5 + r(), e: S("circle", {r: 2 + r() * 3, fill: "#ffe6cc", opacity: .45}, g)}));
  /* 상태 그리기 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => {
    w.rays.setAttribute("opacity", .75 + .25 * Math.sin(lt * .9));
    w.dust.forEach((p, i) => {p.e.setAttribute("cx", (p.x + lt * 14 * p.s) % WW); p.e.setAttribute("cy", p.y + 20 * Math.sin(lt * .7 * p.s + i))});
  };
  // 봉투 날리기: t0 부터 하나씩 우편함 → 게시판
  w.fly = (lt, t0) => w.env.forEach((e, i) => {const u = clamp((lt - t0 - i * .16) / .8);
    if (u <= 0) {e.style.opacity = 0; return}
    const tx = 620 + (i % 4) * 110, ty = 620 + Math.floor(i / 4) * 140 + (i % 2) * 30;
    const x = lerp(410, tx, ease(u)), y = lerp(1000, ty, ease(u)) - 260 * Math.sin(Math.PI * u);
    imgAt(e, x, y, lerp(.6, .8, u), lerp(-30, (i % 3 - 1) * 12, u)); e.style.opacity = u < 1 ? 1 : .9});
  // 이름표: k=0 왼쪽, 1 오른쪽
  w.names = (a, b) => {w.big[0].nm.textContent = a; w.big[1].nm.textContent = b};
  // 작은 이력서 nk[k] 장 보이기, 연락 표시는 calls[k] 개
  w.grid = (lt, k, nShow, t0, nCall, tc) => {
    w.small[k].forEach((s, i) => {const u = clamp((lt - t0 - i * .03) / .3);
      s.p.setAttribute("opacity", i < nShow ? u : 0);
      s.p.setAttribute("transform", i < nShow ? `translate(0,${(1 - eback(u)) * -40})` : "");
      const ci = CALL[k].indexOf(i), on = ci >= 0 && ci < nCall ? spr((lt - tc - ci * .25) / .5) : 0;
      s.glow.setAttribute("opacity", clamp(on));
      if (ci >= 0) {const e = w.ph[k][ci]; imgAt(e, s.x, s.y + 64 + 6 * Math.sin(lt * 18) * (on > 0 && on < 1.05 ? 1 : 0), clamp(on, 0, 1.2), -15 + 8 * Math.sin(lt * 14));
        e.style.opacity = clamp(on * 2)}});
  };
  // 저울: nCal 개 달력, 기울기
  w.scale = (cardOn, nCal, lt) => {
    const ang = -10 * (cardOn ? 1 : 0) * (1 - Math.min(nCal, 8) / 8) + 1.2 * Math.sin(lt * 2) * (nCal > 0 && nCal < 8 ? 1 : .3);
    w.beam.setAttribute("transform", `rotate(${ang} ${sx} 640)`);
    const ends = [-310, 310].map(dx => [sx + dx * Math.cos(ang * Math.PI / 180), 640 + dx * Math.sin(ang * Math.PI / 180)]);
    w.pans.forEach((p, k) => p.setAttribute("transform", `translate(${ends[k][0]},${ends[k][1]})`));
    w.card.setAttribute("transform", `translate(${ends[0][0]},${ends[0][1]})`); w.card.setAttribute("opacity", cardOn);
    w.cal.forEach((e, i) => {const x = ends[1][0] - 102 + (i % 4) * 68, y = ends[1][1] + 200 - Math.floor(i / 4) * 66;
      const u = clamp(nCal - i); imgAt(e, x, y - (1 - u) * 200, 1, 0); e.style.opacity = u > 0 ? 1 : 0});
  };
  w.fly(-99, 0); w.names("", ""); w.scale(0, 0, 0);
  [0, 1].forEach(k => w.grid(-99, k, 0, 0, 0, 0));
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));
const bigNum = (hud, y, txt, col, size) => CX(hud, y, txt, "", {fontSize: (size || 150) + "px", fontWeight: 800, color: col || GOLD, textShadow: "0 6px 0 rgba(0,0,0,.4)"});
const NAMES = [["Emily", "Lakisha"], ["Greg", "Jamal"]];

/* 1. 질문 + 실험 규모 (우편실) */
scene({id: "hook", lines: [
  ["이력서 **이름만** 바꾸면?", "이력서에서 이름만 바꾸면, 면접 연락이 달라질까요?", "pop"],
  ["2004년, 베르트랑_교수와 멀레이너선_교수: 가짜 이력서 **약 5,000장**", "이천사 년, 베르트랑 교수와 멀레이너선 교수가, 미국 신문의 구인 광고에 가짜 이력서 약 오천 장을 보냈습니다.", "whoosh@0.3"]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.h = kin(hud, 150, "이력서 **이름만**<br>바꾸면?", 104);
    c.n = bigNum(hud, 130, "", GOLD, 150);
    c.sub = CX(hud, 320, "2004 · 보스턴·시카고 구인 광고", "", {fontSize: "48px", fontWeight: 800, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.6)"});
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 900, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0);
    const tb = spr((lt - .2) / .6); imgAt(w.box, 410, 1110, clamp(tb, 0, 1.2), 0); w.box.style.opacity = clamp(tb * 2);
    kinUp(c.h, lt, .1, L[1] - .2);
    w.fly(lt, L[1] + .2);
    countTo(c.n, lt, L[1] + .2, 0, 5000, v => "약 " + Math.round(v).toLocaleString("en-US") + "장", 2); c.n.style.opacity = P(lt, L[1], .3);
    ap(c.sub, lt, L[1] + .8);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "surprised" : "normal", point: ease((lt - L[1]) / .5), look: [.7, -.4]});
  }
});

/* 2. 이름만 무작위로 (이력서 책상) */
scene({id: "design", lines: [
  ["이름은 이력서 내용과 상관없이 **무작위로**", "이름은 이력서 내용과 상관없이, 무작위로 붙였어요.", "pop"],
  ["**에밀리·그레그** vs **라키샤·자말**", "절반은 에밀리나 그레그처럼 백인으로 들리는 이름, 절반은 라키샤나 자말처럼 흑인으로 들리는 이름입니다."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.06, ease((lt - L[1]) / 1.5))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 0, 1080, .8));
    // 주사위가 구르며 이름이 섞인다 → 두 번째 줄에서 자리 잡음
    const pool = ["Emily", "Lakisha", "Greg", "Jamal"];
    if (lt < .9) w.names("", "");
    else if (lt < L[1]) {const k = Math.floor(lt * 7); w.names(pool[k % 4], pool[(k + 1) % 4])}
    else {const s = lt > (L[1] + L.end) / 2 ? 1 : 0; w.names(NAMES[s][0], NAMES[s][1])}
    w.big.forEach((b, k) => b.r.setAttribute("transform", `translate(0,${lt < L[1] && lt > .9 ? -8 * Math.abs(Math.sin(lt * 7 * Math.PI)) : 0})`));
    const td = spr((lt - .7) / .5); imgAt(w.die, 1080 + 540, 420 - 30 * Math.abs(Math.sin(lt * 7)) * (lt < L[1] ? 1 : 0), clamp(td, 0, 1.2) * (lt < L[1] + .5 ? 1 : 1 - ease((lt - L[1] - .5) / .4)), lt * 400 * (lt < L[1] ? 1 : 0));
    w.die.style.opacity = clamp(td * 2);
    w.tagW.setAttribute("opacity", P(lt, L[1] + .3, .4)); w.tagB.setAttribute("opacity", P(lt, L[1] + 1.4, .4));
    c.o.up(lt, {mood: "normal", point: lt > L[1] ? ease((lt - L[1]) / .4) : 0, look: [.7, -.5]});
  }
});

/* 3. 결과: 10장에 1번 vs 15장에 1번 → 30장씩 3번 vs 2번 (회신 게시판) */
scene({id: "result", lines: [
  ["백인으로 들리는 이름: **10장**에 1번 연락", "백인으로 들리는 이름은, 이력서 열 장에 한 번 정도 면접 연락을 받았습니다.", "pop"],
  ["흑인으로 들리는 이름: **15장**에 1번", "흑인으로 들리는 이름은, 열다섯 장에 한 번 정도였어요.", "pop"],
  ["30장씩 보내면 연락 **3번 vs 2번**", "서른 장씩 보내면, 세 번과 두 번입니다.", "coin"],
  ["백인 이름이 흑인_이름보다 연락 **50%** 더", "백인으로 들리는 이름이, 흑인으로 들리는 이름보다 연락을 오십 퍼센트 더 받은 거죠.", "ding"]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    const cnt = (x, col) => A(hud, x - 200, 210, "", "", {width: "400px", textAlign: "center", fontSize: "60px", fontWeight: 800, color: col, textShadow: "0 5px 0 rgba(0,0,0,.4)"});
    c.cl = cnt(GX[0], TEAL); c.cr = cnt(GX[1], CORAL);
    c.badge = CX(hud, 320, `<span style="background:${GOLD};color:#10182a;padding:6px 30px;border-radius:50px">연락 50% 더</span>`, "", {fontSize: "60px", fontWeight: 800});
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {const z = ease((lt - L[3]) / 1); return {x: 540, y: 760, s: lerp(1, 1.05, z)}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .8));
    const n0 = lt < L[2] ? 10 : 30, n1 = lt < L[1] ? 0 : lt < L[2] ? 15 : 30;
    w.grid(lt, 0, n0, lt < L[2] ? .8 : L[2] + .1, lt < L[2] ? 1 : 3, lt < L[2] ? 1.8 : L[2] + .9);
    w.grid(lt, 1, n1, lt < L[2] ? L[1] + .2 : L[2] + .1, lt < L[2] ? 1 : 2, lt < L[2] ? L[1] + 1.2 : L[2] + .9);
    // 30장으로 늘 때 이미 보인 것은 그대로 두기 위해 시작 시각을 앞당김
    if (lt >= L[2]) {w.small[0].slice(0, 10).forEach(s => s.p.setAttribute("opacity", 1)); w.small[1].slice(0, 15).forEach(s => s.p.setAttribute("opacity", 1))}
    c.cl.innerHTML = lt < L[2] ? "10장에 <b>1번</b>" : "30장에 <b>3번</b>"; c.cl.style.opacity = P(lt, 1.6, .3);
    c.cr.innerHTML = lt < L[2] ? "15장에 <b>1번</b>" : "30장에 <b>2번</b>"; c.cr.style.opacity = P(lt, L[1] + 1, .3);
    [c.cl, c.cr].forEach(e => e.style.transform = `scale(${1 + .12 * Math.max(0, 1 - Math.abs(lt - L[2] - 1.2) / .25)})`);
    ap(c.badge, lt, L[3] + .2, null, {s: .5, back: true});
    c.o.up(lt, {mood: lt > L[3] ? "surprised" : lt > L[1] + 1 ? "skeptical" : "normal", look: [.8, -.6]});
  }
});

/* 4. 경력 8년만큼 + 해석 (저울) */
scene({id: "weight", lines: [
  ["이 차이 = 이력서에 **경력 8년**을 더한 효과", "연구진 계산으로는, 이 차이가 이력서에 경력 팔 년을 더한 효과와 비슷했습니다.", "pop"],
  ["연구진의 해석: 채용에 **인종 차별**이 여전하다", "연구진은 이 결과를, 채용 과정에 인종 차별이 여전하다는 증거로 봤습니다."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.h = kin(hud, 150, "경력 **8년**만큼", 110);
    c.h2 = kin(hud, 150, "채용 속<br>**인종 차별**", 100);
    c.cnt = A(hud, 560, 470, "", "", {width: "400px", textAlign: "center", fontSize: "54px", fontWeight: 800, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,.4)"});
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 820, s: lerp(1, 1.06, ease(lt / 4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    const nCal = clamp((lt - 1.6) / 2.4) * 8;
    w.scale(P(lt, .9, .4), Math.floor(nCal) + spr(nCal % 1 * 2) * 0, lt);
    c.cnt.innerHTML = nCal > 0 ? `경력 +${Math.floor(nCal)}년` : ""; c.cnt.style.opacity = P(lt, 1.6, .3) * (1 - P(lt, L[1], .3));
    kinUp(c.h, lt, .4, L[1] - .2); kinUp(c.h2, lt, L[1] + .1);
    c.o.up(lt, {mood: lt < L[1] ? (lt > 4 ? "surprised" : "normal") : "skeptical", point: ease((lt - .9) / .5) * (1 - ease((lt - 3.6) / .5)), look: [.8, -.4]});
  }
});

/* 5. 마무리: 논문 카드 */
scene({id: "outro", tail: .7, lines: [
  ["〈에밀리와 그레그는 라키샤와 자말보다 **취업이 잘 될까**?〉", "논문 제목은, 에밀리와 그레그는 라키샤와 자말보다 취업이 잘 될까.", "ding"],
  ["매일 하나씩, **오늘의 경제**", "구독하고 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: officeWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 960, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.scale(1, 8, lt);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[1], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[1] ? .5 + .5 * Math.sin((lt - L[1]) * 6) : 0, look: [.5, -.6]});
  }
});
