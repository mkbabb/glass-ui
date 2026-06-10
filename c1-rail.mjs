import { chromium } from 'playwright';
const GROUND = '/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:5199/dock/rail', { waitUntil: 'networkidle' });
await page.evaluate(() => { Object.defineProperty(document,'hidden',{value:true,configurable:true}); document.dispatchEvent(new Event('visibilitychange')); });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${GROUND}/C1-dock-rail-full.png`, fullPage: true });
// also capture the drill-in group active register (icon-button active state) at the layers route
await page.goto('http://localhost:5199/dock/layers', { waitUntil: 'networkidle' });
await page.evaluate(() => { Object.defineProperty(document,'hidden',{value:true,configurable:true}); document.dispatchEvent(new Event('visibilitychange')); });
await page.waitForTimeout(800);
// click into a drill-in pane to show the active control register
const open = page.locator('[data-testid="dock-layer-open-layers"]').first();
if (await open.count()) { await open.click(); await page.waitForTimeout(700); }
const drill = page.locator('[data-testid="dock-layer-drill-group"]').first();
if (await drill.count()) {
  const b = await drill.boundingBox();
  if (b) await page.screenshot({ path: `${GROUND}/C1-drill-active-register.png`, clip: { x: Math.max(0,b.x-40), y: Math.max(0,b.y-40), width: Math.min(900,b.width+200), height: Math.min(200,b.height+100) } });
}
await browser.close();
console.log('done');
