// 빌드된 쇼츠 HTML 에서 소리 계획(줄별 낭독문·시각, 효과음, 전체 길이)을 JSON 으로 뽑는다.
//   node shorts/tools/plan.js 빌드.html > plan.json
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 540, height: 960 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file://' + path.resolve(process.argv[2]) + '?render'); await p.waitForTimeout(500);
  if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
  console.log(JSON.stringify(await p.evaluate(() => PLAN())));
  await br.close();
})();
