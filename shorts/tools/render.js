// 쇼츠 HTML → 무음 MP4 (1080×1920, 30fps). 병렬로 나눠 캡처한 뒤 이어 붙인다.
//   node shorts/tools/render.js 빌드.html 출력.mp4 [병렬수=4] [fps=30]
//   node shorts/tools/render.js 빌드.html 캡처폴더 --stills t1,t2,…   (점검용 정지 화면)
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const path = require('path'), fs = require('fs'), os = require('os');
const VP = { width: 1080, height: 1920 };
async function open(file) {
  const br = await chromium.launch(); const p = await br.newPage({ viewport: VP });
  await p.goto('file://' + path.resolve(file) + '?render'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  return [br, p];
}
async function seg(file, a, b, out, fps) {
  const [br, p] = await open(file);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(fps), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = a; f < b; f++) {
    await p.evaluate(t => renderAt(t), f / fps);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await br.close();
}
(async () => {
  const args = process.argv.slice(2);
  const [file, out] = args;
  if (args[2] === '--stills') {
    const [br, p] = await open(file); fs.mkdirSync(out, { recursive: true });
    for (const t of args[3].split(',')) {
      await p.evaluate(t => renderAt(t), +t);
      await p.screenshot({ path: path.join(out, `t${(+t).toFixed(1).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 85 });
    }
    await br.close(); return;
  }
  const P = +(args[2] || 4), fps = +(args[3] || 30);
  const [br, p] = await open(file); const total = await p.evaluate(() => TOTAL); await br.close();
  const N = Math.ceil(total * fps), C = Math.ceil(N / P), tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sh-'));
  const parts = [...Array(P).keys()].map(i => path.join(tmp, `seg${i}.mp4`));
  await Promise.all(parts.map((f, i) => seg(file, i * C, Math.min(N, (i + 1) * C), f, fps)));
  fs.writeFileSync(path.join(tmp, 'list.txt'), parts.map(f => `file '${f}'`).join('\n'));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'), '-c', 'copy', out]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(out, `${N} frames, ${total.toFixed(1)}s`);
})();
