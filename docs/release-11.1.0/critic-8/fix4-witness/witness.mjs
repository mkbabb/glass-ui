// Fix 4 witness: a Collapsible content's top padding, wherever the consumer declares it,
// with --collapsible-gap unset and set; the first open and last close frames; paint crops.
//   node witness.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/fix-4/witness/harness/index.html";
const cells = [];
const rec = (cell, pass, detail) => cells.push({ cell, pass, detail });
const near = (a, b, tol = 1) => Math.abs(a - b) <= tol;

function wk2287() {
    const p = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
    return existsSync(p) ? p : undefined;
}
async function open(browser, { width, theme = "light", q = "" }) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?theme=${theme}${q}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    return { context, page };
}
const readContent = () => {
    const c = document.querySelector('[data-probe="content"]');
    const cr = c.getBoundingClientRect(), k = document.querySelector('[data-probe="c1"]').getBoundingClientRect();
    return { paddingTop: parseFloat(getComputedStyle(c).paddingTop), firstY: +(k.top - cr.top).toFixed(1), content: +cr.height.toFixed(1) };
};
const hold = (page, at) => page.evaluate(async (at) => {
    const c = () => document.querySelector('[data-probe="content"]');
    let anims = [];
    for (let i = 0; i < 120 && !anims.length; i++) { await new Promise((r) => requestAnimationFrame(r)); anims = c()?.getAnimations() ?? []; }
    if (!anims.length) return { error: "no animation" };
    const a = anims[0];
    a.pause();
    a.currentTime = at === "start" ? 0 : a.effect.getComputedTiming().endTime - 0.5;
    const out = { root: +document.querySelector('[data-probe="croot"]').getBoundingClientRect().height.toFixed(2), paddingTop: getComputedStyle(c()).paddingTop };
    for (const x of anims) x.finish();
    return out;
}, at);
const rootH = (page) => page.evaluate(() => +document.querySelector('[data-probe="croot"]').getBoundingClientRect().height.toFixed(2));
async function cell(name, fn) {
    try { await fn(); } catch (e) { rec(name, false, { error: String(e).slice(0, 400) }); }
}

// The expected top padding: a set gap is the library's value, which a consumer's padding
// in the same or a later layer (unlayered, components, the p-4 utility) outranks, and a
// padding in an earlier layer (base) does not; an unset gap leaves every padding as declared.
const EXPECT = {
    "none": { 0: 0, 12: 12 },
    "pad-plain": { 0: 16, 12: 16 },
    "pad-base": { 0: 16, 12: 12 },
    "pad-components": { 0: 16, 12: 16 },
    "p-4": { 0: 16, 12: 16 },
};

const browser = await engine.launch(engineName === "webkit" && wk2287() ? { executablePath: wk2287() } : {});
try {
    // A. The padding matrix at 390 light, and the earlier-layer padding at 390 dark and 1440 both.
    const matrix = [];
    for (const cls of Object.keys(EXPECT)) for (const gap of [0, 12]) matrix.push({ cls, gap, width: 390, theme: "light" });
    for (const [width, theme] of [[390, "dark"], [1440, "light"], [1440, "dark"]]) matrix.push({ cls: "pad-base", gap: 0, width, theme });
    for (const { cls, gap, width, theme } of matrix) {
        const name = `padding ${width}-${theme} ${cls} gap${gap}`;
        await cell(name, async () => {
            const { context, page } = await open(browser, { width, theme, q: `&cls=${cls === "none" ? "" : cls}${gap ? `&gap=${gap}` : ""}` });
            try {
                const r = await page.evaluate(readContent);
                const want = EXPECT[cls][gap];
                rec(name, near(r.paddingTop, want, 0.1) && near(r.firstY, want), { want, ...r });
                if (cls === "pad-base" && gap === 0) {
                    const b = await page.locator('[data-probe="croot"]').boundingBox();
                    await page.screenshot({ path: join(pngDir, `${label}-${engineName}-pad-base-gap0-${width}-${theme}.png`), clip: { x: Math.max(0, b.x - 8), y: Math.max(0, b.y - 8), width: Math.min(b.width + 16, width), height: b.height + 16 } });
                }
            } finally { await context.close(); }
        });
    }
    // B. The first open frame and the last close frame sit at the closed height, the
    //    padding riding the height from zero: earlier-layer padding with the gap unset,
    //    and the gap alone.
    for (const [cls, gap] of [["pad-base", 0], ["", 12]]) for (const width of [390, 1440]) {
        const name = `frames ${width} ${cls || "none"} gap${gap}`;
        await cell(name, async () => {
            const { context, page } = await open(browser, { width, q: `&cls=${cls}&closed=1${gap ? `&gap=${gap}` : ""}` });
            try {
                const closed = await rootH(page);
                // One plain open and close first: the region gives its height back whole.
                await page.click('[data-probe="ctrig"]');
                await page.waitForTimeout(800);
                await page.click('[data-probe="ctrig"]');
                await page.waitForTimeout(800);
                const after = await rootH(page);
                // Then the held frames (a seek leaves the region present, so nothing is read after it).
                await page.click('[data-probe="ctrig"]');
                const first = await hold(page, "start");
                await page.waitForTimeout(800);
                const opened = await page.evaluate(readContent);
                await page.click('[data-probe="ctrig"]');
                const last = await hold(page, "end");
                const want = gap || 16;
                rec(name, !first.error && !last.error && near(first.root, closed, 1.5) && near(last.root, closed, 1.5) && near(opened.paddingTop, want, 0.1) && near(after, closed, 0.5), { closed, first, opened, last, after, want });
            } finally { await context.close(); }
        });
    }
} finally {
    await browser.close();
}
const pass = cells.filter((c) => c.pass).length;
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, pass, total: cells.length, cells }, null, 2));
for (const c of cells) console.log(`${c.pass ? "PASS" : "FAIL"} ${c.cell} ${JSON.stringify(c.detail)}`);
console.log(`VERDICT ${label} ${engineName} ${pass}/${cells.length}`);
process.exit(pass === cells.length ? 0 : 1);
