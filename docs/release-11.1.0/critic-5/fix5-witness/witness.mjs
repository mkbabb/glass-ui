// Fix 5 witness: the dock run mark on glyph seats, and its first measure.
//   size-*    the mark's painted box (painted magenta, read from the screenshot) after a
//             keyboard Enter, a click or tap with the pointer staying or leaving, and a
//             route change under a resting pointer equals its box at rest (±1 px).
//   hover-*   a hovered glyph seat's fill sits inside the seat's inset plate: a pixel
//             2 px inside the seat's edge is the same hovered and not hovered.
//   natural-* a glyph seat with only `aria-current` paints a selected plate (the
//             library's own colours), which the CHANGELOG now says.
//   mount-*   a dock mounting with a marked run: no read by useDockRunMark.ts in the
//             mount task, and the mark is on its seat when the first frame paints.
// Each cell is a pass or a fail.   node witness.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/fix-5/witness/harness/index.html";
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
const cells = [];

async function open(browser, opts, query) {
    const context = await browser.newContext({ viewport: { width: opts.width, height: 900 }, colorScheme: opts.theme ?? "light", hasTouch: !!opts.touch, isMobile: !!opts.touch && engineName === "chromium", reducedMotion: "no-preference" });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?${query}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    return { context, page };
}
async function shot(page, name) {
    const nav = await page.locator('[data-probe="nav"]').boundingBox();
    const vp = page.viewportSize();
    const clip = { x: Math.max(0, nav.x - 8), y: Math.max(0, nav.y - 8), width: Math.min(nav.width + 16, vp.width - Math.max(0, nav.x - 8)), height: nav.height + 16 };
    return { clip, png: PNG.sync.read(await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip })) };
}
async function magenta(page, name) {
    const { clip, png } = await shot(page, name);
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        if (png.data[i] > 200 && png.data[i + 2] > 200 && png.data[i + 1] < 90) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return x1 < 0 ? null : { w: x1 - x0 + 1, h: y1 - y0 + 1, left: x0 + clip.x, top: y0 + clip.y };
}
const pixel = ({ clip, png }, [x, y]) => { const i = (Math.round(y - clip.y) * png.width + Math.round(x - clip.x)) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
const differ = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i]))) > 3;
const centre = (page, i) => page.evaluate((i) => { const b = document.querySelector(`[data-tab="${i}"]`).getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, i);

// The mount task, read in the page: every rect, rects and style call between the state
// change and the end of Vue's flush, with the src file that made it; then, in an animation
// frame queued after the mount (so after the composable's own), the mark against its seat.
const instrument = async () => {
    const calls = [];
    let on = false;
    const owner = () => {
        const lines = (new Error().stack ?? "").split("\n").map((l) => l.trim()).filter((l) => /\/src\//.test(l));
        const m = lines[0]?.match(/\/src\/([^?:)]+)/);
        return m ? m[1].split("/").slice(-1)[0] : "other";
    };
    const wrap = (obj, name, api) => {
        const orig = obj[name];
        obj[name] = function (...a) { if (on) calls.push({ api, owner: owner() }); return orig.apply(this, a); };
    };
    wrap(Element.prototype, "getBoundingClientRect", "rect");
    wrap(Element.prototype, "getClientRects", "rects");
    wrap(window, "getComputedStyle", "style");
    on = true;
    const t0 = performance.now();
    await window.__mountDock();
    const taskMs = +(performance.now() - t0).toFixed(2);
    on = false;
    const firstFrame = await new Promise((resolve) => requestAnimationFrame(() => {
        const run = document.querySelector(".dock-run");
        const seat = document.querySelector('[data-tab="1"]');
        if (!run || !seat) return resolve({ mark: false });
        const v = (k) => Number.parseFloat(run.style.getPropertyValue(`--dock-run-mark-${k}`));
        const port = run.getBoundingClientRect(), r = seat.getBoundingClientRect(), cs = getComputedStyle(seat);
        const clip = cs.backgroundClip, b = clip === "border-box" ? 0 : 1, p = clip === "content-box" ? 1 : 0;
        const px = (s) => Number.parseFloat(s) || 0;
        const l = b * px(cs.borderLeftWidth) + p * px(cs.paddingLeft), rr = b * px(cs.borderRightWidth) + p * px(cs.paddingRight);
        const t = b * px(cs.borderTopWidth) + p * px(cs.paddingTop), bb = b * px(cs.borderBottomWidth) + p * px(cs.paddingBottom);
        const plate = { x: r.left - port.left - run.clientLeft + run.scrollLeft + l, y: r.top - port.top - run.clientTop + run.scrollTop + t, w: r.width - l - rr, h: r.height - t - bb };
        const mark = { x: v("x"), y: v("y"), w: v("w"), h: v("h") };
        resolve({ mark: run.hasAttribute("data-run-mark"), markBox: mark, plate, onSeat: ["x", "y", "w", "h"].every((k) => Math.abs(mark[k] - plate[k]) <= 1) });
    }));
    const byOwner = {};
    for (const c of calls) byOwner[c.owner] = (byOwner[c.owner] ?? 0) + 1;
    return { taskMs, reads: calls.length, byOwner, firstFrame };
};

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    // size-*: 1440 fine and 390 coarse in both themes, 390 fine and 1440 coarse in light.
    const only = process.env.ONLY ?? "size natural mount";
    const sizes = [];
    for (const [width, touch, themes] of [[1440, false, ["light", "dark"]], [390, true, ["light", "dark"]], [390, false, ["light"]], [1440, true, ["light"]]])
        for (const theme of themes) for (const how of ["keyboard", "click-stay", "click-leave", "hover-then-script"]) sizes.push({ width, touch, theme, how });
    for (const { width, touch, theme, how } of only.includes("size") ? sizes : []) {
        const name = `size-${width}-${touch ? "coarse" : "fine"}-${theme}-${how}`;
        let context;
        try {
            ({ context } = await open(browser, { width, touch, theme }, `scene=nav&theme=${theme}&shape=icon`));
            const page = context.pages()[0];
            const rest = await magenta(page, `${name}-rest`);
            const [x, y] = await centre(page, 0);
            if (how === "keyboard") { await page.evaluate(() => document.querySelector('[data-tab="0"]').focus()); await page.keyboard.press("Enter"); }
            else if (how === "hover-then-script") { if (touch) await page.touchscreen.tap(x, y + 300); else await page.mouse.move(x, y); await page.waitForTimeout(300); await page.evaluate(() => window.__select(0)); }
            else if (touch) await page.touchscreen.tap(x, y);
            else { await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(90); await page.mouse.up(); }
            await page.waitForTimeout(2000);
            if (how === "click-leave" || how === "hover-then-script") { if (touch) await page.touchscreen.tap(x, y + 400); else await page.mouse.move(x, y + 400, { steps: 4 }); await page.waitForTimeout(2000); }
            const current = await page.evaluate(() => document.querySelector('[data-tab="0"]').getAttribute("aria-current"));
            const after = await magenta(page, `${name}-after`);
            const pass = current === "page" && !!rest && !!after && Math.abs(after.w - rest.w) <= 1 && Math.abs(after.h - rest.h) <= 1;
            cells.push({ cell: name, pass, rest, after, current });
        } catch (e) { cells.push({ cell: name, pass: false, error: String(e).slice(0, 300) }); } finally { await context?.close(); }
    }
    // hover-* and natural-*: the library's own colours.
    for (const width of only.includes("natural") ? [390, 1440] : []) for (const theme of ["light", "dark"]) {
        let context;
        try {
            ({ context } = await open(browser, { width, theme }, `scene=nav&theme=${theme}&shape=icon&plain=1`));
            const page = context.pages()[0];
            const rest = await shot(page, `natural-${width}-${theme}`);
            const pts = await page.evaluate(() => [1, 2].map((i) => { const r = document.querySelector(`[data-tab="${i}"]`).getBoundingClientRect(); return { inner: [r.left + 14, r.top + r.height / 2], edge: [r.left + 2, r.top + r.height / 2] }; }));
            // The current seat's inner pixel against a pixel 2 px inside its edge, which lies
            // outside any inset plate and so reads the dock's own plate.
            const cur = pixel(rest, pts[0].inner), dock = pixel(rest, pts[0].edge), other = pixel(rest, pts[1].inner);
            cells.push({ cell: `natural-${width}-${theme}`, pass: differ(cur, dock), current: cur, dock });
            const [x, y] = await centre(page, 2);
            await page.mouse.move(x, y);
            await page.waitForTimeout(600);
            const hov = await shot(page, `hover-${width}-${theme}`);
            const edgeRest = pixel(rest, pts[1].edge), edgeHover = pixel(hov, pts[1].edge), innerHover = pixel(hov, pts[1].inner);
            cells.push({ cell: `hover-${width}-${theme}`, pass: differ(innerHover, other) && !differ(edgeHover, edgeRest), edgeRest, edgeHover, innerRest: other, innerHover });
        } catch (e) { cells.push({ cell: `natural/hover-${width}-${theme}`, pass: false, error: String(e).slice(0, 300) }); } finally { await context?.close(); }
    }
    // mount-*: marked runs carry the verdict; unmarked runs are the reference.
    for (const width of only.includes("mount") ? [390, 1440] : []) for (const shape of ["tab", "icon"]) for (const marked of [1, 1, 0]) {
        const name = `mount-${width}-${shape}-${marked ? "marked" : "unmarked"}`;
        let context;
        try {
            ({ context } = await open(browser, { width }, `scene=mountdock&marked=${marked}&shape=${shape}`));
            const page = context.pages()[0];
            let cdp = null;
            const traced = engineName === "chromium" && marked && !cells.some((c) => c.cell === name);
            if (engineName === "chromium") { cdp = await context.newCDPSession(page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 }); }
            if (traced) await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline.stack", "blink.user_timing"] });
            const r = await page.evaluate(instrument);
            let trace = null;
            if (traced) {
                const events = JSON.parse((await browser.stopTracing()).toString()).traceEvents;
                const mark = (n) => events.find((e) => e.name === n)?.ts;
                const a = mark("f5-mount-start"), b = mark("f5-mount-end");
                const layouts = a && b ? events.filter((e) => e.name === "Layout" && e.ph === "X" && e.ts >= a && e.ts <= b) : [];
                trace = layouts.map((e) => ({ ms: +(e.dur / 1000).toFixed(2), forcedBy: (e.args?.beginData?.stackTrace ?? []).map((f) => `${(f.url ?? "").split("/").pop().split("?")[0]}:${f.functionName}`).slice(0, 3) }));
            }
            const markReads = r.byOwner["useDockRunMark.ts"] ?? 0;
            const cell = { cell: name, taskMs: r.taskMs, reads: r.reads, byOwner: r.byOwner, markReads, firstFrame: r.firstFrame, trace };
            if (marked) cell.pass = markReads === 0 && r.firstFrame.mark && r.firstFrame.onSeat;
            cells.push(cell);
        } catch (e) { cells.push({ cell: name, pass: marked ? false : undefined, error: String(e).slice(0, 300) }); } finally { await context?.close(); }
    }
} finally {
    await browser.close();
}
const judged = cells.filter((c) => c.pass !== undefined);
const passed = judged.filter((c) => c.pass).length;
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, passed, judged: judged.length, cells }, null, 2));
for (const c of cells) {
    const tag = c.pass === undefined ? "  ref" : c.pass ? " PASS" : " FAIL";
    let body = c.error ?? "";
    if (!c.error && c.cell.startsWith("size")) body = `rest ${c.rest ? `${c.rest.w}x${c.rest.h}` : "none"} after ${c.after ? `${c.after.w}x${c.after.h}` : "none"}`;
    else if (!c.error && c.cell.startsWith("natural")) body = `current ${c.current} dock ${c.dock}`;
    else if (!c.error && c.cell.startsWith("hover")) body = `edge rest ${c.edgeRest} hovered ${c.edgeHover}; inner rest ${c.innerRest} hovered ${c.innerHover}`;
    else if (!c.error && c.cell.startsWith("mount")) body = `task ${c.taskMs} ms, reads ${c.reads} ${JSON.stringify(c.byOwner)}, first frame mark=${c.firstFrame.mark} onSeat=${c.firstFrame.onSeat}${c.trace ? ` trace ${JSON.stringify(c.trace)}` : ""}`;
    console.log(tag, c.cell, body);
}
console.log(`${label} ${engineName} ${passed}/${judged.length}`);
process.exitCode = passed === judged.length ? 0 : 1;
