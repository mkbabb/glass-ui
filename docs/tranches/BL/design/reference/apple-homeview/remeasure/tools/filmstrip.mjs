// Filmstrip of the dock intro under a slowed clock: page JS time (performance.now, rAF timestamps, Date.now)
// runs at 1/SLOW and CSS animations/transitions at playbackRate 1/SLOW via the CDP Animation domain.
// Each still is cropped to the dock and logged with the page-time it shows and the sampler's channel values,
// so a still can be checked against the real-time curves.
// usage: node filmstrip.mjs <tag> [W H SLOW]
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const [tag = 'f1', Wa, Ha, Sa] = process.argv.slice(2);
const W = +(Wa || 1440), H = +(Ha || 900), SLOW = +(Sa || 20);
const FR = join(HERE, '..', 'frames', `film-${tag}-${W}`); mkdirSync(FR, { recursive: true });
const TIMES = [0, 40, 80, 120, 160, 200, 260, 320, 380, 440, 500, 540, 580, 620, 680, 740, 800, 860, 940, 1020, 1100, 1250, 1450, 1800];
const browser = await chromium.launch({ headless: true });
const log = [];
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('https://www.apple.com/apple-homeview/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  const gTop = await page.evaluate(() => document.querySelector('#highlights-gallery').getBoundingClientRect().top + scrollY);
  await page.evaluate(y => scrollTo(0, y), Math.max(0, gTop - H - 300));
  await page.waitForTimeout(800);
  // install the slowed clock now (after load, before the trigger)
  await page.evaluate(SLOW => {
    const realNow = performance.now.bind(performance), base = realNow();
    const slowNow = () => base + (realNow() - base) / SLOW;
    performance.now = slowNow;
    const dBase = Date.now(); const realDate = Date.now; Date.now = () => dBase + (realDate() - dBase) / SLOW;
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = cb => raf(() => cb(slowNow()));
    const st = window.setTimeout.bind(window); window.setTimeout = (f, ms, ...a) => st(f, (ms || 0) * SLOW, ...a);
    window.__slowNow = slowNow;
  }, SLOW);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Animation.enable');
  await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 / SLOW });
  const inY = gTop - 100;
  const t0 = await page.evaluate(y => { scrollTo(0, y); return window.__slowNow(); }, inY);
  const box = { x: 0, y: 0, w: 0, h: 0 };
  for (const tp of TIMES) {
    // wait until page time reaches t0 + tp
    while ((await page.evaluate(() => window.__slowNow())) - t0 < tp) await page.waitForTimeout(5);
    const s = await page.evaluate(() => {
      const a = document.querySelector('#aap-highlights'); const b = a.getBoundingClientRect();
      const i = a.querySelector('.all-access-pass__intro-element');
      const [bb, bd] = a.querySelectorAll('.all-access-pass__background');
      return { now: window.__slowNow(), cls: a.className, aapSt: a.getAttribute('style'), rect: [b.left, b.top, b.width, b.height], introSt: i.getAttribute('style'), pill: bd.getAttribute('style'), btn: getComputedStyle(bb).transform, blur: getComputedStyle(bd).backdropFilter };
    });
    // fixed crop: the dock's resting box +-90 px vertically (covers the 180 px rise via scroll of the crop window)
    const clip = { x: W / 2 - 230, y: H - 32 - 56 - 200, width: 460, height: 288 };
    const file = `t${String(tp).padStart(4, '0')}.png`;
    await page.screenshot({ path: join(FR, file), clip });
    log.push({ tp, file, pageT: +(s.now - t0).toFixed(1), ...s });
  }
  writeFileSync(join(FR, 'log.json'), JSON.stringify({ W, H, SLOW, TIMES, log }, null, 1));
  console.log('ok', FR);
} finally { await browser.close(); }
