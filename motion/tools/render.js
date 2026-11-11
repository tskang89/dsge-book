// (선택) 빌드된 HTML을 프레임 단위로 캡처해 MP4로 만든다. 사용자가 MP4를 원할 때만 쓸 것.
//   node motion/tools/render.js 빌드.html 출력.mp4 [병렬수=4] [fps=30]
// 24분 분량 기준 4병렬로 약 25분 걸린다. 음성 트랙은 넣지 않는다(필요하면 ffmpeg 로 따로 mux).
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const path = require('path'), fs = require('fs'), os = require('os');
async function seg(file, a, b, out, fps) {
  const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.resolve(file) + '?render'); await p.waitForTimeout(1200);
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
  const [file, out, par = '4', fpsS = '30'] = process.argv.slice(2); const P = +par, fps = +fpsS;
  const br = await chromium.launch(); const p = await br.newPage();
  await p.goto('file://' + path.resolve(file) + '?render'); await p.waitForTimeout(1200);
  const total = await p.evaluate(() => TOTAL); await br.close();
  const N = Math.ceil(total * fps), C = Math.ceil(N / P), tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mg-'));
  const parts = [...Array(P).keys()].map(i => path.join(tmp, `seg${i}.mp4`));
  await Promise.all(parts.map((f, i) => seg(file, i * C, Math.min(N, (i + 1) * C), f, fps)));
  fs.writeFileSync(path.join(tmp, 'list.txt'), parts.map(f => `file '${f}'`).join('\n'));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'), '-c', 'copy', '-movflags', '+faststart', out]);
  console.log(out, `${N} frames`);
})();
