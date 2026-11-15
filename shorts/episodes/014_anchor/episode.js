/* 오늘의 경제 014 — 번호 끝자리가 정한 값 (v3: 부엉이 진행자·한 공간 카메라 이동·동전 기둥)
   논문: Ariely, D., Loewenstein, G. & Prelec, D. (2003) "'Coherent Arbitrariness': Stable Demand Curves Without Stable Preferences",
         Quarterly Journal of Economics 118(1): 73–105. doi:10.1162/00335530360535153
   확인(2026-11-15, 원문 PDF 는 이 세션에서 막힘 — 초록(Duke·RePEc)과 저자 애리얼리 본인 글, 요약 자료로 확인):
   - 초록: 익숙한 물건의 첫 가치 평가가 임의의 '닻'(때로 사회보장번호에서 나온 수)에 강하게 끌려감
   - MIT 경영대학원(MBA) 학생 55명, 물건 6개. 사회보장번호 끝 두 자리를 달러 값으로 보고 '이 값에 살지' 답한 뒤 최고 지불 가격을 적음
   - 끝자리 상위 20% 는 하위 20% 보다 216~346% 높게 부름. 무선 키보드 평균 $56 vs $16 (애리얼리 블로그)
   - 제목의 coherent arbitrariness: 첫 값은 임의적이지만 이후 판단은 그 값을 기준으로 일관됨(초록)
   동전 하나 = $2 (56 → 28개, 16 → 8개). */
Object.assign(EP, {no: 14, style: "v2", title: "번호 끝자리가 정한 값", hook: "주민번호 끝자리가 물건 값을 정한다?",
  bgm: {seed: 171, bpm: 102, mood: "bright"},
  paper: {journal: "Quarterly Journal of Economics", year: 2003, authors: "Dan Ariely, George Loewenstein & Drazen Prelec",
          title: "“Coherent Arbitrariness”: Stable Demand Curves Without Stable Preferences", ko: "일관된 임의성: 선호는 흔들려도 수요곡선은 안정적",
          cite: "118(1): 73–105", url: "https://doi.org/10.1162/00335530360535153"},
  yt: {title: "주민번호 끝자리가 물건 값을 정한다? | 앵커링 효과 #경제 #shorts",
       desc: "미국 MIT 경영대학원생 55명이 실험에 참여했다. 먼저 주민번호 같은 사회보장번호의 끝 두 자리를 적었다. 그 숫자를 달러 값으로 보고 이 값에 물건을 살지 답한 뒤, 낼 수 있는 최고 가격을 적었다. 끝자리가 큰 상위 20%는 무선 키보드에 평균 56달러를, 끝자리가 작은 하위 20%는 평균 16달러를 불렀다. 물건에 따라 상위가 하위보다 216~346% 더 높게 불렀다. 처음 본 숫자에 판단이 끌려가는 것을 앵커링 효과(Anchoring Effect)라고 한다. 자기 번호가 물건 값과 아무 상관이 없다는 걸 알면서도 그랬다. 논문 제목은 '일관된 임의성'. 첫 값은 제멋대로 정해지지만, 그 뒤 판단은 그 값을 기준으로 일관되게 움직인다는 뜻이다.",
       tags: ["경제", "행동경제학", "앵커링", "닻내림효과", "가격", "애리얼리", "shorts"]}});

const GOLD = "#f2c14e", BLUE = "#5ab0ff", TEAL = "#6fcfb7", CORAL = "#ff8a65", RED = "#e85d5d";
const WW = 4320;                       // 세계 너비: 0 번호 카드 | 1080 물건 탁자 | 2160 동전 기둥 | 3240 닻
let WID = 0;

function hallWorld(el) {
  const w = {}, n = ++WID, id = k => k + n, U = k => `url(#${id(k)})`;
  w.layer = E("div", "a", null, {left: 0, top: 0, width: WW + "px", height: H + "px"}, el);
  const g = S("svg", {width: WW, height: H, viewBox: `0 0 ${WW} ${H}`, style: "position:absolute;left:0;top:0;overflow:visible"}, w.layer);
  const d = S("defs", {}, g);
  const lg = (k, stops, o) => {const l = S("linearGradient", Object.assign({id: id(k), x1: 0, y1: 0, x2: 0, y2: 1}, o || {}), d);
    stops.forEach(([of, c, op]) => S("stop", {offset: of, "stop-color": c, "stop-opacity": op == null ? 1 : op}, l))};
  lg("wall", [[0, "#3a1420"], [1, "#5a2430"]]); lg("floor", [[0, "#7a5230"], [1, "#3a2414"]]);
  lg("spot", [[0, "#ffe7b0", .35], [1, "#ffe7b0", 0]]); lg("card", [[0, "#e8f1ff"], [1, "#b9cce6"]]);
  lg("table", [[0, "#6a3a1e"], [1, "#3a1e0e"]]);
  S("rect", {x: 0, y: 0, width: WW, height: 1000, fill: U("wall")}, g);
  for (let x = 0; x < WW; x += 160) S("rect", {x, y: 0, width: 6, height: 1000, fill: "#000", opacity: .18}, g);
  S("rect", {x: 0, y: 1000, width: WW, height: H - 1000, fill: U("floor")}, g);
  for (let x = 0; x < WW; x += 140) S("line", {x1: x, y1: 1000, x2: x - 260, y2: H, stroke: "#2a160a", "stroke-width": 3, opacity: .4}, g);
  w.spots = [540, 1620, 2700, 3780].map(x => S("path", {d: `M${x - 70},0 L${x + 70},0 L${x + 440},1000 L${x - 440},1000 Z`, fill: U("spot")}, g));
  // 0: 번호 카드 (끝 두 자리)
  S("rect", {x: 150, y: 470, width: 780, height: 440, rx: 30, fill: "#000", opacity: .3, transform: "translate(10,14)"}, g);
  S("rect", {x: 150, y: 470, width: 780, height: 440, rx: 30, fill: U("card")}, g);
  S("rect", {x: 150, y: 470, width: 780, height: 90, rx: 30, fill: "#2a4a7a"}, g);
  ST(g, 540, 532, "사회보장번호 카드", {"font-size": 44, "font-weight": 800, fill: "#fff"});
  ST(g, 400, 740, "123-45-67", {"font-size": 96, "font-weight": 800, fill: "#566", "letter-spacing": 4});
  w.d2 = ST(g, 760, 740, "87", {"font-size": 120, "font-weight": 900, fill: RED});
  w.box = S("rect", {x: 668, y: 630, width: 184, height: 140, rx: 18, fill: "none", stroke: GOLD, "stroke-width": 8, opacity: 0}, g);
  w.dol = ST(g, 540, 870, "", {"font-size": 56, "font-weight": 900, fill: "#2b2b2b"});
  // 1080: 물건 탁자
  S("rect", {x: 1080 + 90, y: 860, width: 900, height: 60, rx: 14, fill: U("table")}, g);
  S("rect", {x: 1080 + 130, y: 920, width: 40, height: 140, fill: "#3a1e0e"}, g); S("rect", {x: 1080 + 910, y: 920, width: 40, height: 140, fill: "#3a1e0e"}, g);
  w.items = [["keyboard", 1080 + 260, 230], ["bottle_with_popping_cork", 1080 + 540, 240], ["chocolate_bar", 1080 + 820, 200]].map(([k, x, s]) => img(w.layer, k, x, 860, s));
  w.tags = [1080 + 260, 1080 + 540, 1080 + 820].map(x => {const gg = S("g", {opacity: 0}, g);
    S("path", {d: `M${x - 80},520 L${x + 60},520 L${x + 90},560 L${x + 60},600 L${x - 80},600 Z`, fill: GOLD}, gg);
    S("circle", {cx: x + 56, cy: 560, r: 9, fill: "#5a2430"}, gg);
    ST(gg, x - 10, 578, "$87?", {"font-size": 52, "font-weight": 900, fill: "#2b1a10"});
    return gg});
  // 2160: 동전 기둥 (동전 하나 = $2)
  w.stk = [["끝자리 상위 20%", 28, GOLD, 2160 + 330], ["끝자리 하위 20%", 8, "#c9cfe6", 2160 + 750]].map(([t, m, col, x]) => {
    ST(g, x, 1070, t, {"font-size": 46, "font-weight": 800, fill: "#fff"});
    const cs = Array.from({length: m}, (_, k) => {const gg = S("g", {opacity: 0}, g);
      S("ellipse", {cx: x, cy: 990 - k * 20, rx: 110, ry: 26, fill: "#b8860b"}, gg);
      S("ellipse", {cx: x, cy: 984 - k * 20, rx: 110, ry: 26, fill: col, stroke: "#b8860b", "stroke-width": 3}, gg);
      return gg});
    const lab = ST(g, x, 990 - m * 20 - 60, "", {"font-size": 84, "font-weight": 900, fill: col});
    return {cs, lab, m}});
  w.kb = img(w.layer, "keyboard", 2160 + 540, 360, 170);
  // 3240: 닻
  w.chain = S("line", {x1: 3240 + 540, y1: 0, x2: 3240 + 540, y2: 0, stroke: "#9aa4b8", "stroke-width": 12, "stroke-dasharray": "26 10"}, g);
  w.anc = img(w.layer, "anchor", 3240 + 540, 0, 260);
  w.n87 = ST(g, 3240 + 540, 980, "87", {"font-size": 160, "font-weight": 900, fill: RED, opacity: 0});
  // 앞쪽(흐린) 커튼 자락: 시차
  w.fg = E("div", "a", null, {left: 0, top: 0, width: WW * 1.3 + "px", height: H + "px", filter: "blur(8px)"}, el);
  const fs = S("svg", {width: WW * 1.3, height: 300, style: "position:absolute;left:0;top:0;overflow:visible"}, w.fg);
  [250, 1350, 2450, 3550, 4650].forEach(x => S("path", {d: `M${x - 260},0 Q${x},180 ${x + 260},0 Z`, fill: "#7a1e2e", opacity: .9}, fs));
  /* 상태 */
  w.pan = x => {w.layer.style.transform = `translateX(${-x}px)`; w.fg.style.transform = `translateX(${-x * 1.3 + 100}px)`};
  w.anim = lt => w.spots.forEach((s, i) => s.setAttribute("opacity", .7 + .3 * Math.sin(lt * 1.2 + i)));
  w.roll = (lt, t0, t1) => {w.d2.textContent = lt > t0 && lt < t1 ? String(10 + Math.floor(lt * 23) % 90) : "87";
    w.box.setAttribute("opacity", clamp((lt - t1) / .3))};
  w.price = on => w.dol.textContent = on ? "→ $87" : "";
  w.tagOn = (lt, t0) => w.tags.forEach((t, i) => t.setAttribute("opacity", clamp((lt - t0 - i * .25) / .3)));
  w.itemsAnim = lt => w.items.forEach((e, i) => imgAt(e, [1080 + 260, 1080 + 540, 1080 + 820][i], 860, 1, 4 * Math.sin(lt * 2 + i)));
  w.stack = (lt, t0, j) => {const s = w.stk[j]; s.cs.forEach((c, k) => c.setAttribute("opacity", lt > t0 + k * .05 ? 1 : 0));
    s.lab.textContent = lt > t0 + s.m * .05 ? "$" + (s.m * 2) : ""};
  w.drop = u => {u = clamp(u); const y = lerp(-300, 760, 1 - Math.pow(1 - u, 3)) + (u > .9 ? 8 * Math.sin(u * 60) * (1 - u) * 10 : 0);
    imgAt(w.anc, 3240 + 540, y, 1, 0); w.chain.setAttribute("y2", y - 220); w.n87.setAttribute("opacity", clamp((u - .85) / .15))};
  w.roll(0, 0, 0); w.tagOn(-99, 0); w.stack(-99, 99, 0); w.stack(-99, 99, 1); w.drop(0);
  return w;
}
const whip = (lt, t0, a, b, dd) => lerp(a, b, ease((lt - t0) / (dd || .7)));

/* 1. 질문 */
scene({id: "hook", lines: [
  ["주민번호 끝자리가 **물건 값**을 정한다?", "주민번호 끝자리가, 물건 값을 정할 수 있을까요?", "pop"],
  ["2003년 **QJE**에 실린 논문", "이천삼 년에 나온 논문입니다."],
  ["저자: 애리얼리, 로웬스타인, 프렐렉", "저자는, 애리얼리, 로웬스타인, 프렐렉, 세 사람입니다."]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.h = kin(hud, 170, "번호 끝자리가<br>**값**을 정한다?", 104);
    c.j = kin(hud, 190, "**2003** · QJE", 110);
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 760, s: lerp(1.18, 1, ease(lt / 2.4))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(0); w.roll(lt, .4, 2.2);
    kinUp(c.h, lt, .2, L[1] - .2); kinUp(c.j, lt, L[1] + .1);
    c.o.up(lt, {x: lerp(-200, 190, ease((lt - .3) / .7)), mood: lt < L[1] ? "skeptical" : "normal", look: [.7, -.4]});
  }
});

/* 2. 실험 */
scene({id: "setup", lines: [
  ["미국 MIT 경영대학원생 **55명**", "미국 엠아이티 경영대학원생 쉰다섯 명이, 실험에 참여했습니다.", "pop"],
  ["먼저 주민번호 같은 번호의 **끝_두_자리**를 적었다", "먼저, 주민번호 같은 사회보장번호의 끝 두 자리를 적었습니다."],
  ["그 숫자를 달러 값으로: 이 값에 **살 건가?**", "그리고 그 숫자를 달러 값으로 보고, 이 값에 물건을 살지 대답했죠.", "coin"],
  ["그다음 낼 수 있는 **최고 가격**을 적었다", "그다음, 낼 수 있는 최고 가격을 적었습니다."]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.o = host(hud, "owl", {x: 160, y: 1270, s: .65});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lt < L[2] ? lerp(1, 1.08, ease((lt - L[1]) / 2)) : 1.02}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, L[2] + .3, 0, 1080, .9)); w.itemsAnim(lt);
    w.roll(lt, -9, -8); w.box.setAttribute("opacity", lt > L[1] + .4 ? 1 : 0); w.price(lt > L[2]);
    w.tagOn(lt, L[2] + 1.2);
    w.tags.forEach(t => {const tx = t.querySelector("text"); tx.textContent = lt > L[3] + .3 ? "$?" : "$87?"});
    c.o.up(lt, {mood: "normal", point: ease((lt - L[1]) / .5), look: [.8, -.5]});
  }
});

/* 3. 결과 */
scene({id: "result", lines: [
  ["끝자리 상위 20%: 무선_키보드 **평균 $56**", "끝자리가 큰 상위 이십 퍼센트는, 무선 키보드에 평균 오십육 달러를 불렀습니다.", "coin"],
  ["끝자리 하위 20%: **평균 $16**", "끝자리가 작은 하위 이십 퍼센트는, 평균 십육 달러였죠.", "pop"],
  ["물건에 따라 상위가 **216~346%** 더 높게", "물건에 따라, 상위가 하위보다 이백십육에서 삼백사십육 퍼센트 더 높게 불렀습니다.", "ding"]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.u = CX(hud, 1160, "동전 1개 = 2달러", "", {fontSize: "36px", fontWeight: 700, color: "#fff", opacity: .85});
    c.o = host(hud, "owl", {x: 120, y: 1290, s: .55});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1.02, 1.05, ease((lt - L[2]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 1080, 2160, .9));
    w.stack(lt, 1.2, 0); w.stack(lt, L[1] + .2, 1); ap(c.u, lt, 1.6);
    imgAt(w.kb, 2160 + 540, 360 - 10 * Math.abs(Math.sin(lt * 2)), clamp(spr((lt - .9) / .5), 0, 1.2), 0);
    c.o.up(lt, {mood: lt > L[2] ? "surprised" : "normal", look: [.7, -.6]});
  }
});

/* 4. 앵커링 */
scene({id: "why", lines: [
  ["처음 본 숫자에 끌려가는 판단 = **앵커링_효과**", "처음 본 숫자에 판단이 끌려가는 것을, 앵커링 효과라고 합니다.", "whoosh@0.3"],
  ["번호와 물건 값은 **아무 상관 없는데도**", "자기 번호가 물건 값과 아무 상관이 없다는 걸 알면서도요."]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.h = kin(hud, 160, "**앵커링 효과**<br>(Anchoring Effect)", 84);
    c.o = host(hud, "owl", {x: 170, y: 1260, s: .7});
    return c;
  },
  cam(lt, L) {return {x: 540, y: 760, s: lerp(1, 1.06, ease((lt - L[1]) / 2))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(whip(lt, 0, 2160, 3240, .9));
    w.drop((lt - .9) / 1.4); kinUp(c.h, lt, 2.4);
    c.o.up(lt, {mood: lt > L[1] ? "skeptical" : "normal", point: ease((lt - 1.5) / .5), look: [.8, -.5]});
  }
});

/* 5. 제목 뜻 + 마무리 */
scene({id: "outro", tail: .7, lines: [
  ["논문 제목: 〈**일관된_임의성**〉", "논문 제목은, 일관된 임의성입니다.", "ding"],
  ["첫 값은 제멋대로, 그 뒤는 **그 값 기준**으로 일관되게", "첫 값은 제멋대로 정해지지만, 그 뒤 판단은 그 값을 기준으로 일관되게 움직인다는 뜻이죠."],
  ["매일 하나씩, **오늘의 경제**", "구독하시고, 매일 하나씩 만나요."]],
  build(el, hud) {
    const c = {w: hallWorld(el)};
    c.dim = A(hud, 0, 0, "", "", {width: W + "px", height: H + "px", background: "rgba(8,12,22,.55)"});
    c.p = paperCard(hud, 400);
    c.f = CX(hud, 1040, "<span class='chip' style='background:#f2c14e;color:#10182a;border-color:#f2c14e'>구독하고 매일 하나씩 ▶</span>", "");
    c.o = host(hud, "owl", {x: 190, y: 1250, s: .85});
    return c;
  },
  cam(lt) {return {x: 540, y: 900, s: lerp(1.06, .96, ease(lt / 3))}},
  update(c, lt, L) {
    const w = c.w; w.anim(lt); w.pan(3240); w.drop(1);
    c.dim.style.opacity = P(lt, 0, .5); ap(c.p, lt, .3, null, {s: .92}); ap(c.f, lt, L[2], null, {s: .7, back: true});
    c.o.up(lt, {mood: "happy", point: lt > L[2] ? .5 + .5 * Math.sin((lt - L[2]) * 6) : 0, look: [.5, -.6]});
  }
});
