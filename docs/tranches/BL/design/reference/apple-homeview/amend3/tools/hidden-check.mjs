// AMEND-3 instrument check: which headless-Chromium mechanism makes a page's document.visibilityState 'hidden'
// (and stops its rAF), so the hidden-tab cells (CR-06 clause H) are real hidden tabs, not a faked event.
// usage: node hidden-check.mjs   -> prints one JSON line. One browser, closed in finally.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
const out = {};
try {
  browser = await chromium.launch({ headless: true, ...(process.env.CHANNEL ? { channel: process.env.CHANNEL } : {}) });
  out.channel = process.env.CHANNEL || 'headless-shell';
  out.browser = browser.version();
  const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } });
  const page = await ctx.newPage();
  await page.setContent('<html><body>x</body></html>');
  await page.evaluate(() => { window.__ev = []; document.addEventListener('visibilitychange', () => window.__ev.push([document.visibilityState, performance.now()])); window.__raf = 0; const f = () => { window.__raf++; requestAnimationFrame(f); }; requestAnimationFrame(f); });
  const probe = async (label) => { const a = await page.evaluate(() => window.__raf); await sleep(500); const s = await page.evaluate(() => ({ vis: document.visibilityState, hidden: document.hidden, raf: window.__raf, ev: window.__ev.slice() })); out[label] = { ...s, rafIn500ms: s.raf - a }; };
  await probe('start');
  // (a) another page in the same context brought to front
  const other = await ctx.newPage(); await other.setContent('<p>other</p>'); await other.bringToFront(); await sleep(300);
  await probe('a_other_page_front');
  await page.bringToFront(); await sleep(300); await probe('a_back');
  // (b) minimise the page's window over CDP
  const cdp = await ctx.newCDPSession(page);
  try {
    const { windowId } = await cdp.send('Browser.getWindowForTarget');
    await cdp.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'minimized' } }); await sleep(300);
    await probe('b_minimized');
    await cdp.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'normal' } }); await sleep(300);
    await probe('b_restored');
  } catch (e) { out.b_error = String(e).slice(0, 200); }
  // (d) a background tab created over CDP (Target.createTarget background) next to the page, then activated
  try {
    const bcdp = await browser.newBrowserCDPSession();
    const { targetId } = await bcdp.send('Target.createTarget', { url: 'about:blank', background: false });
    await sleep(300); await probe('d_new_foreground_target');
    await bcdp.send('Target.closeTarget', { targetId });
  } catch (e) { out.d_error = String(e).slice(0, 200); }
  // (c) the CDP emulation of a hidden page (Emulation.setFocusEmulationEnabled does not hide; try Page.setWebLifecycleState)
  try {
    await cdp.send('Page.setWebLifecycleState', { state: 'frozen' }); await sleep(300);
    out.c_frozen_note = 'frozen pages run no script; read after resume';
    await cdp.send('Page.setWebLifecycleState', { state: 'active' }); await sleep(300);
    await probe('c_after_freeze');
  } catch (e) { out.c_error = String(e).slice(0, 200); }
  await other.close(); await page.close(); await ctx.close();
} finally { if (browser) await browser.close().catch(() => {}); }
console.log(JSON.stringify(out));
