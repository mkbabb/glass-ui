// One-off look: the fused page as loaded (no seat call), plus where the seam probe reads.
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const WT = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/cluster/proposal-B";
const { createServer } = await import(WT + "/node_modules/vite/dist/node/index.js");
process.chdir(WT);
const server = await createServer({ root: WT, configFile: WT + "/vite.config.ts", server: { port: 5473, strictPort: true, host: "localhost" }, logLevel: "warn" });
await server.listen();
const engine = process.argv[2] === "webkit" ? webkit : chromium;
const browser = await engine.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 400 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:5473/demo/fixtures/dock-cluster.html?n=3&fused=1`);
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
    const info = await page.evaluate(() => ({
        docks: [...document.querySelectorAll(".dock-cluster > .glass-dock")].map((e) => { const r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }),
        plates: [...document.querySelectorAll(".dock-cluster-plate")].map((e) => getComputedStyle(e).clipPath.slice(0, 90)),
    }));
    console.log(JSON.stringify(info));
    const c = await page.getByTestId("cluster").boundingBox();
    await page.screenshot({ path: process.argv[3], clip: { x: c.x - 20, y: c.y - 20, width: c.width + 40, height: c.height + 40 } });
    await ctx.close();
} finally { await browser.close(); await server.close(); }
