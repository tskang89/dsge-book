// 빌드된 HTML을 장면별로 캡처해 겹침·오류를 점검한다.
//   node motion/tools/check.js 빌드.html 출력폴더 [장면id ...]
// - 각 장면의 마지막 순간(dur-1초)을 1920×1080 으로 캡처 → 출력폴더/<시작초>_<id>.jpg
// - 4장씩 묶은 대조표(contact_N.jpg)를 ffmpeg 로 만든다 → Read 로 열어 눈으로 확인할 것
// - 페이지 오류, KaTeX 렌더 실패, '\;' 이스케이프 누락으로 생기는 ';;' 같은 흔적을 자동 보고
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
(async () => {
  const [file, outDir, ...only] = process.argv.slice(2);
  if (!file || !outDir) { console.log('usage: node check.js build.html outDir [sceneId ...]'); process.exit(1); }
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(file) + '?render'); await p.waitForTimeout(1500);
  const sc = await p.evaluate(() => SC.map(s => [s.id, s.start, s.dur, s.title]));
  const bad = await p.evaluate(() => { const o = []; SC.forEach(s => {
    s.el.querySelectorAll('.katex-error').forEach(k => o.push(s.id + ' KaTeX 오류: ' + k.title));
    s.el.querySelectorAll('.katex-html').forEach(k => { if (/;;|:;|\\\\/.test(k.textContent)) o.push(s.id + ' 의심 수식: ' + k.textContent.slice(0, 50)) });
    s.capH.forEach(h => { if (/katex-error/.test(h)) o.push(s.id + ' 자막 KaTeX 오류') }); }); return o });
  const shots = [];
  for (const [id, st, dur] of sc) {
    if (only.length && !only.includes(id)) continue;
    await p.evaluate(t => renderAt(t), st + dur - 1);
    const f = path.join(outDir, String(Math.round(st)).padStart(5, '0') + '_' + id + '.jpg');
    await p.screenshot({ path: f, type: 'jpeg', quality: 70 }); shots.push(f);
  }
  const total = await p.evaluate(() => TOTAL); await b.close();
  for (let i = 0; i < shots.length; i += 4) {
    const g = shots.slice(i, i + 4); while (g.length < 4) g.push(g[g.length - 1]);
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...g.flatMap(x => ['-i', x]), '-filter_complex',
      '[0][1][2][3]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0,scale=1920:1080', path.join(outDir, 'contact_' + (i / 4) + '.jpg')]);
  }
  console.log(`장면 ${sc.length}개, 전체 ${Math.floor(total / 60)}분 ${Math.round(total % 60)}초`);
  sc.forEach(([id, st, dur, t]) => console.log(`  ${String(Math.round(st)).padStart(5)}s  ${id.padEnd(9)} ${t}`));
  console.log(errs.length || bad.length ? '문제:\n  ' + [...errs, ...bad].join('\n  ') : '페이지 오류·수식 이상 없음');
})();
