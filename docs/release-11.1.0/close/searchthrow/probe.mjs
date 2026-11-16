// The dock search page at 390 with touch and at 1440 fine: the page logs no error at
// mount, and a press on the dock reaches the dock (no error on the press either).
//   node probe.mjs <chromium|webkit> <base> <out> <label>
// One browser per run, a new context per cell, everything closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
const [engineName, base, outDir, label] = process.argv.slice(2);
mkdirSync(join(outDir, "png"), { recursive: true });
const engine = engineName === "webkit" ? webkit : chromium;
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
const cells = [];
const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const [width, touch] of [[390, true], [1440, false]]) for (const theme of ["light", "dark"]) {
        const cell = `${width}${touch ? "c" : "f"}-${theme}`;
        const context = await browser.newContext({ viewport: { width, height: 844 }, hasTouch: touch, isMobile: touch && engineName !== "webkit" ? true : undefined, colorScheme: theme });
        try {
            const page = await context.newPage();
            const errors = [];
            page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message).slice(0, 200)}`));
            page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text().slice(0, 200)}`); });
            await page.goto(`${base}/dock/dock-search`, { waitUntil: "load" });
            await page.waitForSelector(".dock-search-host", { timeout: 20_000 });
            await page.waitForTimeout(1500);
            const atMount = errors.length;
            const dock = page.locator(".dock-search-host").first();
            const box = await dock.boundingBox();
            if (touch) await page.touchscreen.tap(box.x + 12, box.y + box.height / 2);
            else await page.mouse.click(box.x + 12, box.y + box.height / 2);
            await page.waitForTimeout(800);
            await page.screenshot({ path: join(outDir, "png", `${label}-${engineName}-${cell}.png`), clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: Math.min(box.width + 16, width), height: box.height + 16 } });
            cells.push({ cell, atMount, errors, pass: errors.length === 0 });
        } catch (e) {
            cells.push({ cell, error: String(e).slice(0, 300), pass: false });
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(cells, null, 1));
for (const c of cells) console.log(c.cell, c.pass ? "pass" : "FAIL", JSON.stringify(c.errors ?? c.error));
console.log(`VERDICT ${label} ${engineName} ${cells.filter((c) => c.pass).length}/${cells.length}`);
