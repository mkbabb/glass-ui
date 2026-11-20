// Fix 2 witness: O-212, O-213's overlay half, O-214, G13, G14, the Collapsible's 11.0.0
// consumer contract and its gap, and the Table on the page and inside a Card.
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label> [only]
// `only` = `glide` runs the Chromium trace of the dock's gliding mark alone.
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label, only] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/fix-2/witness/harness/index.html";
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

    // ── G13: at 1440 the stage is the larger column with the aside on either side, and
    //    the aside lies within its 300..400 px band.
    for (const theme of ["light", "dark"]) for (const side of ["right", "left"]) {
        await cell("G13", `1440-${theme}-${side}`, async () => {
            const { context, page } = await open(browser, { width: 1440, theme, scene: "config", q: `&side=${side}` });
            try {
                const r = await page.evaluate(() => {
                    const s = document.querySelector(".configurator-stage")?.getBoundingClientRect();
                    const a = document.querySelector(".configurator-aside")?.getBoundingClientRect();
                    return { stage: s && [Math.round(s.left), Math.round(s.width)], aside: a && [Math.round(a.left), Math.round(a.width)] };
                });
                const placed = side === "left" ? r.aside[0] < r.stage[0] : r.aside[0] > r.stage[0];
                v("G13", `1440-${theme}-${side}`, r.stage && r.aside && placed && r.stage[1] > r.aside[1] && r.aside[1] >= 299.5 && r.aside[1] <= 400.5, r);
                await shot(page, await page.locator('[data-slot="configurator"]').boundingBox(), `g13-${theme}-${side}`);
            } finally { await context.close(); }
        });
    }

    // ── G14: under a coarse pointer every tab is at least 44 px tall and no two hit
    //    rects overlap; a fine pointer keeps its strip.
    for (const theme of ["light", "dark"]) for (const touch of [true, false]) {
        await cell("G14", `390-${theme}-${touch ? "coarse" : "fine"}`, async () => {
            const { context, page } = await open(browser, { width: 390, theme, scene: "tabs", touch });
            try {
                const r = await page.evaluate(() => {
                    const tabs = [...document.querySelectorAll('[data-probe="tabs"] .segmented-tab')];
                    const rects = tabs.map((t) => t.getBoundingClientRect());
                    let overlap = 0;
                    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
                        const a = rects[i], b = rects[j];
                        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                        if (ox > 0.5 && oy > 0.5) overlap++;
                    }
                    return { coarse: matchMedia("(pointer: coarse)").matches, heights: rects.map((x) => +x.height.toFixed(1)), overlap };
                });
                const pass = touch ? r.coarse && r.heights.length > 1 && r.heights.every((x) => x >= 44) && r.overlap === 0 : !r.coarse && r.heights.length > 1 && r.overlap === 0;
                v("G14", `390-${theme}-${touch ? "coarse" : "fine"}`, pass, r);
                await shot(page, await page.locator('[data-probe="tabs"]').boundingBox(), `g14-${theme}-${touch ? "coarse" : "fine"}`);
            } finally { await context.close(); }
        });
    }

    // ── The Collapsible as 11.0.0 consumer CSS met it: the reka height variable on the
    //    open content, a `>` rule reaching its children; then the reversal, open and
    //    closed four frames in: it turns where it stands, never via full, at opacity 1.
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        await cell("Collapsible contract", `${width}-${theme}`, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "collapsible" });
            try {
                await page.click('[data-probe="ctrig"]');
                await page.waitForTimeout(1200);
                const r = await page.evaluate(() => {
                    const c = document.querySelector('[data-probe="content"]');
                    const p = document.querySelector('[data-probe="para"]');
                    return { rekaHeight: getComputedStyle(c).getPropertyValue("--reka-collapsible-content-height").trim(), boxHeight: +c.getBoundingClientRect().height.toFixed(1), directChildRule: getComputedStyle(p).color, paraParentIsContent: p.parentElement === c, state: c.getAttribute("data-state"), gapAbove: +(p.getBoundingClientRect().top - c.getBoundingClientRect().top - parseFloat(getComputedStyle(p).marginTop)).toFixed(1) };
                });
                const varOk = r.rekaHeight !== "" && Math.abs(parseFloat(r.rekaHeight) - r.boxHeight) <= 1;
                v("Collapsible contract", `${width}-${theme}`, varOk && r.directChildRule === "rgb(200, 0, 0)" && r.paraParentIsContent && r.state === "open", r);
                // The gap on the library's hook sits inside the region, above its first child.
                v("Collapsible gap", `${width}-${theme}`, Math.abs(r.gapAbove - 12) <= 0.5, { gapAbove: r.gapAbove });
                await shot(page, await page.locator('[data-probe="croot"]').boundingBox(), `collapsible-open-${width}-${theme}`);
            } finally { await context.close(); }
        });
    }

    // ── The Table on the page ground and inside a Card, cells unpainted: the
    //    container's own paint in each, and the captures. On the page the container is a
    //    plate with the rim; inside a glass surface it keeps its corners and clip and
    //    paints nothing of its own, so the Card is the one surface.
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        await cell("Table one surface", `${width}-${theme}`, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "table" });
            try {
                const r = await page.evaluate(() => {
                    const read = (probe) => {
                        const c = document.querySelector(`[data-probe="${probe}"] .table-container, [data-probe="${probe}"] [data-slot="table-container"]`);
                        if (!c) return null;
                        const cs = getComputedStyle(c);
                        return { background: cs.backgroundColor, image: cs.backgroundImage, shadow: cs.boxShadow, radius: cs.borderTopLeftRadius, overflow: cs.overflow };
                    };
                    return { page: read("page-table"), card: read("card-table") };
                });
                const clear = (x) => x && (x.background === "rgba(0, 0, 0, 0)" || x.background === "transparent") && x.image === "none" && x.shadow === "none";
                const plate = (x) => x && !clear(x);
                const rounded = (x) => x && parseFloat(x.radius) > 0 && x.overflow !== "visible";
                v("Table one surface", `${width}-${theme}`, plate(r.page) && clear(r.card) && rounded(r.page) && rounded(r.card), r);
                await shot(page, await page.locator('[data-probe="page-table"]').boundingBox(), `table-page-${width}-${theme}`);
                await shot(page, await page.locator('[data-probe="card-host"]').boundingBox(), `table-card-${width}-${theme}`);
            } finally { await context.close(); }
        });
    }
}

// ── The gliding mark's cost (Chromium trace at 4x CPU): over one glide, the Layout
//    events and the elements each UpdateLayoutTree restyles; then the same for one text
//    change in a seat of the run.
async function glide() {
    for (const width of [1440]) {
        const { context, page } = await open(browser, { width, theme: "light", scene: "nav" });
        try {
            const cdp = await context.newCDPSession(page);
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
            await page.waitForTimeout(600);
            const traced = async (act, ms) => {
                const events = [];
                cdp.on("Tracing.dataCollected", (e) => events.push(...e.value));
                const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
                await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline", transferMode: "ReportEvents" });
                await page.evaluate(act);
                await page.waitForTimeout(ms);
                await cdp.send("Tracing.end");
                await done;
                cdp.removeAllListeners("Tracing.dataCollected");
                const style = events.filter((e) => e.name === "UpdateLayoutTree" && e.ph !== "E");
                const counts = style.map((e) => e.args?.elementCount ?? e.args?.beginData?.elementCount ?? 0);
                const frames = events.filter((e) => e.name === "FireAnimationFrame" && e.ph !== "E").length;
                const layouts = events.filter((e) => e.name === "Layout" && e.ph !== "E").length;
                return { frames, layouts, styleRecalcs: style.length, elementsRestyled: counts.reduce((a, b) => a + b, 0), maxPerRecalc: Math.max(0, ...counts), layoutsPerFrame: frames ? +(layouts / frames).toFixed(2) : null, restyledPerFrame: frames ? +(counts.reduce((a, b) => a + b, 0) / frames).toFixed(1) : null };
            };
            const seats = await page.evaluate(() => document.querySelectorAll('[data-probe="nav"] .dock-run *').length);
            const glideRun = await traced(() => window.__select(3), 1200);
            await page.waitForTimeout(600);
            const tick = await traced(() => window.__tick(), 300);
            v("Glide cost (record)", `${width}`, true, { runDescendants: seats, glide: glideRun, textTick: tick });
        } finally { await context.close(); }
    }
}
try {
    if (only === "glide") await glide();
    else await main();
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
const by = {};
for (const c of cells) { by[c.item] ??= [0, 0]; by[c.item][1]++; if (c.pass) by[c.item][0]++; }
console.log(label, engineName, JSON.stringify(by));
process.exit(cells.some((c) => !c.pass) ? 1 : 0);
