// The O-212 and O-214 witness, ported from 11.1.0's fix-2 probe (its O-212, O-213
// overlay and O-214 cells, unchanged): rows inside the Select plate, the anchored panel,
// and the ring after a pointer or a keyboard open.
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label, only] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.0.2/o212/harness/index.html";
const cells = [];
const v = (item, cell, pass, detail) => cells.push({ item, cell, pass: !!pass, detail });

function wk2287() {
    const p = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
    return existsSync(p) ? p : undefined;
}

async function open(browser, { width, height = 900, theme = "light", scene, q = "", touch = false }) {
    const context = await browser.newContext({ viewport: { width, height }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium" });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}${q}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    return { context, page };
}

async function shot(page, box, name) {
    if (!box) return;
    await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: box.width + 16, height: box.height + 16 } });
}

async function cell(item, name, fn) {
    try {
        await fn();
    } catch (e) {
        v(item, name, false, { error: String(e).slice(0, 400) });
    }
}

const ringOf = (el) => {
    const cs = getComputedStyle(el);
    const on = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
    return { on, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, shadow: cs.boxShadow, focusVisible: el.matches(":focus-visible") };
};

const browser = await engine.launch(engineName === "webkit" && wk2287() ? { executablePath: wk2287() } : {});
async function main() {
    // ── O-212: one inline bound. Rows inside the plate, the pill's inset concentric, the
    //    row hit at its right edge, the plate inside the layout viewport less 1rem.
    for (const width of [360, 390, 1440]) for (const theme of ["light", "dark"]) for (const tw of [200, 352, 386, 600]) {
        if (width < 1440 && tw === 600) continue;
        await cell("O-212", `${width}-${theme}-tw${tw}`, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "select", q: `&tw=${tw}&tall=1` });
            try {
                await page.click('[data-probe="trigger"]');
                await page.waitForTimeout(900);
                const r = await page.evaluate(() => {
                    const plate = document.querySelector('[data-slot="select-content"]');
                    if (!plate) return { plate: null };
                    const pr = plate.getBoundingClientRect();
                    const rows = [...plate.querySelectorAll('[data-probe="row"]')];
                    let outside = 0, misses = 0, worst = 0;
                    for (const row of rows) {
                        const rr = row.getBoundingClientRect();
                        const over = Math.max(rr.right - pr.right, pr.left - rr.left);
                        if (over > 0.5) { outside++; worst = Math.max(worst, over); }
                        const hit = document.elementFromPoint(rr.right - 12, rr.top + rr.height / 2);
                        if (!hit || !row.contains(hit)) misses++;
                    }
                    const hl = plate.querySelector('[data-probe="row"][data-highlighted], [data-probe="row"][data-state="checked"]');
                    const hr = hl?.getBoundingClientRect();
                    const inset = hr ? { left: +(hr.left - pr.left).toFixed(1), right: +(pr.right - hr.right).toFixed(1) } : null;
                    const cw = document.documentElement.clientWidth;
                    return { form: plate.getAttribute("data-form"), plate: [+pr.left.toFixed(1), +pr.width.toFixed(1)], clientWidth: cw, innerWidth, rows: rows.length, outside, misses, worst: +worst.toFixed(1), inset, viewport: document.querySelector('[data-slot="select-viewport"]')?.getBoundingClientRect().width, trigger: document.querySelector('[data-probe="trigger"]').getBoundingClientRect().width };
                });
                const sheet = r.form === "sheet";
                const concentric = sheet || (r.inset && r.inset.left > 0 && r.inset.right > 0 && Math.abs(r.inset.left - r.inset.right) <= 1);
                const inView = sheet || (r.plate && r.plate[0] >= 15.5 && r.plate[0] + r.plate[1] <= r.clientWidth - 15.5);
                v("O-212", `${width}-${theme}-tw${tw}`, r.plate && r.outside === 0 && r.misses === 0 && concentric && inView, r);
                if (tw >= 386) await shot(page, await page.locator('[data-slot="select-content"]').boundingBox(), `o212-${width}-${theme}-tw${tw}`);
            } finally { await context.close(); }
        });
    }

    // ── O-213 (the overlay half, one bound with O-212): an anchored panel the consumer
    //    sizes to a 358 px anchor at 360 and 390 is never clamped below it, and stays
    //    inside the layout viewport less 1rem.
    for (const width of [360, 390]) for (const theme of ["light", "dark"]) {
        await cell("O-213 anchored", `${width}-${theme}-tw358`, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "popover", q: "&tw=358&tall=1" });
            try {
                await page.click('[data-probe="anchor"]');
                await page.waitForTimeout(900);
                const r = await page.evaluate(() => {
                    const a = document.querySelector('[data-probe="anchor"]').getBoundingClientRect();
                    const p = document.querySelector('[data-slot="popover-content"]')?.getBoundingClientRect();
                    return { anchor: +a.width.toFixed(1), panel: p && [+p.left.toFixed(1), +p.width.toFixed(1)], clientWidth: document.documentElement.clientWidth };
                });
                // At 390 the 358 px anchor fits the room, so the panel is never clamped below
                // it. At 360 the anchor itself runs past the room (16 + 358 > 360 − 16), and
                // the viewport bound holds: the panel stays 1rem inside on either side.
                const inView = r.panel && r.panel[0] >= 15.5 && r.panel[0] + r.panel[1] <= r.clientWidth - 15.5;
                const fits = 16 + r.anchor <= r.clientWidth - 16;
                v("O-213 anchored", `${width}-${theme}-tw358`, inView && (!fits || r.panel[1] >= r.anchor - 0.5), { ...r, anchorFitsRoom: fits });
            } finally { await context.close(); }
        });
    }

    // ── O-214: a pointer open paints no ring on any row; a keyboard open rings the
    //    focused row; a key pressed after a pointer open hands the ring back.
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        await cell("O-214 pointer", `${width}-${theme}`, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "select", q: "&tw=240" });
            try {
                const b = await page.locator('[data-probe="trigger"]').boundingBox();
                await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
                await page.waitForTimeout(900);
                const r = await page.evaluate((src) => {
                    const ringOf = new Function(`return (${src})`)();
                    const rows = [...document.querySelectorAll('[data-slot="select-content"] [data-probe="row"]')];
                    return { active: document.activeElement?.textContent?.slice(0, 30), ringed: rows.map((row) => ({ t: row.textContent, ...ringOf(row) })).filter((x) => x.on) };
                }, ringOf.toString());
                await shot(page, await page.locator('[data-slot="select-content"]').boundingBox(), `o214-pointer-${width}-${theme}`);
                await page.keyboard.press("ArrowDown");
                await page.waitForTimeout(300);
                const after = await page.evaluate((src) => {
                    const ringOf = new Function(`return (${src})`)();
                    const el = document.activeElement;
                    return { active: el?.textContent?.slice(0, 30), ...ringOf(el) };
                }, ringOf.toString());
                v("O-214 pointer", `${width}-${theme}`, r.ringed.length === 0 && after.on, { ...r, afterKey: after });
            } finally { await context.close(); }
        });
        for (const key of ["Enter", "Space", "ArrowDown"]) {
            await cell("O-214 keyboard", `${width}-${theme}-${key}`, async () => {
                const { context, page } = await open(browser, { width, theme, scene: "select", q: "&tw=240" });
                try {
                    // Focus the trigger as a keyboard user reaches it. WebKit, like Safari,
                    // does not move Tab onto a button, so the cell focuses it directly.
                    await page.focus('[data-probe="trigger"]');
                    const trig = await page.evaluate(() => document.activeElement?.getAttribute("data-probe"));
                    await page.keyboard.press(key);
                    await page.waitForTimeout(900);
                    const r = await page.evaluate((src) => {
                        const ringOf = new Function(`return (${src})`)();
                        const el = document.activeElement;
                        return { active: el?.textContent?.slice(0, 30), row: el?.getAttribute("data-probe"), ...ringOf(el) };
                    }, ringOf.toString());
                    v("O-214 keyboard", `${width}-${theme}-${key}`, trig === "trigger" && r.row === "row" && r.on, r);
                    if (key === "Enter") await shot(page, await page.locator('[data-slot="select-content"]').boundingBox(), `o214-keyboard-${width}-${theme}`);
                } finally { await context.close(); }
            });
        }
    }

}

try {
    await main();
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
const by = {};
for (const c of cells) { by[c.item] ??= [0, 0]; by[c.item][1]++; if (c.pass) by[c.item][0]++; }
console.log(label, engineName, JSON.stringify(by));
process.exit(cells.some((c) => !c.pass) ? 1 : 0);
