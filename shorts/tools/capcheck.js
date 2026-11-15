// 자막 점검: 줄마다 자막 영역만 잘라 세로로 붙인 한 장을 만든다(줄 나눔·균형·잘림 확인용).
//   node shorts/tools/capcheck.js 빌드.html 출력.jpg
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path'), fs = require('fs'), os = require('os');
(async () => {
  const [file, out] = process.argv.slice(2);
  const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(file) + '?render'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const ts = await p.evaluate(() => PLAN().lines.map(l => l.t));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cap-')), shots = [];
  for (let i = 0; i < ts.length; i++) {
    await p.evaluate(t => renderAt(t), ts[i] + 0.7);
    const f = path.join(tmp, `c${String(i).padStart(2, '0')}.png`);
    await p.screenshot({ path: f, clip: { x: 0, y: 1270, width: 1080, height: 300 } }); shots.push(f);
  }
  await br.close();
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...shots.flatMap(f => ['-i', f]), '-filter_complex', `vstack=inputs=${shots.length},scale=540:-1`, out]);
  fs.rmSync(tmp, { recursive: true, force: true }); console.log(out, ts.length, 'lines');
})();
