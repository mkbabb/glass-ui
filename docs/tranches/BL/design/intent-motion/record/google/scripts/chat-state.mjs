// Read (and with --restore, undo) the Board panel's expanded state at load,
// so the study leaves the owner's Chat exactly as found. Interface only.
import { chromium } from 'playwright';

const TARGET = 'https://chat.google.com/u/0/app/chat/1GLrwaAAAAE';
const restore = process.argv.includes('--restore');
const browser = await chromium.connectOverCDP('http://localhost:9223');
const page = await browser.contexts()[0].newPage();
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(9000);
  const read = () => page.evaluate(() => [...document.querySelectorAll('button[data-panel-type]')].map(b => { const r = b.getBoundingClientRect(); return { lab: b.getAttribute('aria-label'), type: b.dataset.buttonType, exp: b.getAttribute('aria-expanded'), vis: r.width > 0, box: [r.x, r.y, r.width, r.height].map(Math.round) }; }));
  const s = await read();
  console.log(JSON.stringify(s));
  if (restore) {
    const open = s.find(b => b.exp === 'true' && b.vis);
    if (open) { await page.locator(`button[data-panel-type][aria-label="${open.lab}"][data-button-type="${open.type}"]`).click(); await page.waitForTimeout(1500); console.log('after', JSON.stringify(await read())); }
  }
} catch (e) { console.log('ERR', e.message); } finally {
  await page.close().catch(() => {});
  process.exit(0);
}
