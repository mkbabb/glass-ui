// Lane L2 witness probe: the Slider stream and hand, the Collapsible height, the menu
// plate, the mount-path reads, the chart entrances, the lateral card swap.
//
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label> <tree:green|red>
//
// One browser per run, a new context per cell, every context and the browser closed in
// `finally`. Headless shell for Chromium (Playwright's default); WebKit is Playwright's
// build 2287, the build the 11.0.0 records and lane L1 use (2311 crashes on the glass
// stack). Each run writes <out-dir>/<label>-<engine>.json and cropped paint to png/.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [engineName, base, outDir, label, tree = "green"] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });

const PATH = "/docs/release-11.1.0/lane-L2/harness/index.html";
const WIDTHS = [390, 1440];
const THEMES = ["light", "dark"];
const results = { engine: engineName, label, tree, base, cells: [] };
const verdicts = [];
const verdict = (item, cell, pass, detail) => verdicts.push({ item, cell, pass, detail });
const median = (xs) => {
    const s = [...xs].sort((a, b) => a - b);
    return s.length ? s[Math.floor(s.length / 2)] : 0;
};

async function open(browser, { width, theme, scene, reduce = false }) {
    const context = await browser.newContext({
        viewport: { width, height: 800 },
        deviceScaleFactor: 1,
        reducedMotion: reduce ? "reduce" : "no-preference",
        colorScheme: theme,
    });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}&tree=${tree}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    return { context, page };
}

const shot = (page, name, box, pad = 8) =>
    page.screenshot({
        path: join(pngDir, `${label}-${engineName}-${name}.png`),
        clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 },
    });

// ── O-181 · one emit per frame, commit = last pointer, keys synchronous ────────────
async function sliderStream(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, theme, scene: "slider" });
    try {
        const track = await page.locator(".slider-track").boundingBox();
        const y = track.y + track.height / 2;
        await page.mouse.move(track.x + track.width * 0.3, y);
        await page.mouse.down();
        // A 240 Hz burst of moves on the captured element for 500 ms, 2+ per frame.
        const burst = await page.evaluate(async ({ x0, w, y }) => {
            const s = window.__slider;
            const target = [...document.querySelectorAll(".glass-slider, .glass-slider *")].find((el) => el.hasPointerCapture?.(1));
            if (!target) return { error: "no captured element" };
            const start = s.log.emits.length;
            let i = 0;
            let lastX = x0;
            await new Promise((resolve) => {
                const id = setInterval(() => {
                    lastX = x0 + w * (0.3 + 0.4 * (i / 120));
                    target.dispatchEvent(new PointerEvent("pointermove", { pointerId: 1, clientX: lastX, clientY: y, bubbles: true, buttons: 1, pointerType: "mouse", isPrimary: true }));
                    if (++i >= 120) {
                        clearInterval(id);
                        resolve();
                    }
                }, 1000 / 240);
            });
            await new Promise((r) => requestAnimationFrame(() => r()));
            const emits = s.log.emits.slice(start);
            const perFrame = {};
            for (const [f] of emits) perFrame[f] = (perFrame[f] ?? 0) + 1;
            return { moves: i, emits: emits.length, maxPerFrame: Math.max(0, ...Object.values(perFrame)), frames: Object.keys(perFrame).length, lastEmit: emits.at(-1)?.[1] ?? null };
        }, { x0: track.x, w: track.width, y });
        await page.mouse.up();
        await page.waitForTimeout(100);
        const after = await page.evaluate(() => {
            const s = window.__slider;
            return { commit: s.log.commits.at(-1)?.[1] ?? null, lastEmit: s.log.emits.at(-1)?.[1] ?? null, model: s.model(), thumb: Number(document.querySelector('[role="slider"]').getAttribute("aria-valuenow")) };
        });
        // Keyboard: a step emits inside its own keydown dispatch.
        const keys = await page.evaluate(() => {
            const s = window.__slider;
            const thumb = document.querySelector('[role="slider"]');
            thumb.focus();
            const before = s.log.emits.length;
            thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
            return { syncEmits: s.log.emits.length - before };
        });
        const pass = !burst.error && burst.maxPerFrame <= 1 && after.commit !== null && Math.abs(after.commit - after.thumb) < 1e-9 && after.lastEmit === after.commit && keys.syncEmits === 1;
        verdict("O-181", cell, pass, { burst, after, keys });
    } finally {
        await context.close();
    }
}

// ── O-196 · the hand wins against a 60 Hz clock; release resumes without a jump ─────
async function sliderHand(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, theme, scene: "slider" });
    try {
        await page.evaluate(() => window.__slider.clock(true));
        await page.waitForTimeout(200);
        const track = await page.locator(".slider-track").boundingBox();
        const y = track.y + track.height / 2;
        await page.mouse.move(track.x + track.width * 0.25, y);
        await page.evaluate(() => {
            // Per-frame sampling: the thumb's painted value in px against the pointer's px.
            const s = window.__slider;
            const track = document.querySelector(".slider-track").getBoundingClientRect();
            const thumb = document.querySelector('[role="slider"]');
            window.__hand = { samples: [], px: null, on: true };
            // The pointer's px from its moves only: reka seats the press itself centred on
            // the thumb and the drag at the grab offset, so the first move fixes the offset.
            addEventListener("pointermove", (e) => (window.__hand.px = e.clientX - track.left), true);
            addEventListener("pointerdown", (e) => {
                window.__hand.px = null;
                window.__hand.pressPx = e.clientX - track.left;
            }, true);
            const loop = () => {
                if (!window.__hand.on) return;
                const v = Number(thumb.getAttribute("aria-valuenow"));
                window.__hand.samples.push({ t: performance.now(), held: s.log.grabs > s.log.releases.length || window.__hand.down === true, valuePx: (v / 100) * track.width, px: window.__hand.px, v });
                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        });
        await page.evaluate(() => (window.__hand.down = true));
        await page.mouse.down();
        // A 1 s drag: 60 moves across the middle of the track.
        for (let i = 0; i < 60; i++) {
            await page.mouse.move(track.x + track.width * (0.25 + 0.5 * (i / 59)), y);
            await page.waitForTimeout(16);
        }
        const tRelease = await page.evaluate(() => performance.now());
        await page.evaluate(() => (window.__hand.down = false));
        await page.mouse.up();
        await page.waitForTimeout(400);
        const read = await page.evaluate((tRelease) => {
            window.__hand.on = false;
            window.__slider.clock(false);
            const s = window.__slider;
            const all = window.__hand.samples;
            // Held frames once the pointer has left the press point by 2 px: there reka
            // has moved from seating the press (centred) to dragging at the grab offset.
            const during = all.filter((x) => x.held && x.px !== null && Math.abs(x.px - window.__hand.pressPx) > 2);
            // From the first drag move after the press (reka seats the press itself centred
            // on the thumb, then drags at the grab offset); its first frame may still show
            // the press seat, so it is skipped.
            const offsets = during.slice(1).map((x) => x.valuePx - x.px);
            const after = all.filter((x) => x.t > tRelease);
            return { offsets, after: after.slice(0, 6).map((x) => x.v), commit: s.log.commits.at(-1)?.[1] ?? null, release: s.log.releases.at(-1)?.[1] ?? null, grabs: s.log.grabs };
        }, tRelease);
        const mid = median(read.offsets);
        const spread = read.offsets.length ? Math.max(...read.offsets.map((o) => Math.abs(o - mid))) : Infinity;
        // After release: the first painted value is the committed one (the clock resumes
        // from it), within one clock step (0.4).
        const committed = read.release ?? read.commit;
        const firstAfter = read.after[0];
        const resumeJump = committed !== null && firstAfter !== undefined ? Math.abs(firstAfter - committed) : Infinity;
        const pass = read.offsets.length >= 30 && spread <= 1 && resumeJump <= 0.81;
        verdict("O-196", cell, pass, { offFrames: read.offsets.map((o, i) => [i, +o.toFixed(2)]).filter(([, o]) => Math.abs(o - mid) > 1), frames: read.offsets.length, medianOffsetPx: +mid.toFixed(2), maxDeviationPx: +spread.toFixed(2), committed, firstAfterRelease: firstAfter, resumeJump: +resumeJump.toFixed?.(3), grabs: read.grabs });
    } finally {
        await context.close();
    }
}

// ── O-189 · the Collapsible's height ───────────────────────────────────────────────
// Per frame: the root's height, the content box's height, the trigger's height and the
// content's opacity. `extra` is the space the root holds beyond trigger and content: the
// consumer's 12 px gap. Owned by the content it is 0 at every frame (it opens with the
// height); held by the root it appears in one frame when the content mounts.
async function collapsible(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, theme, scene: "collapsible" });
    try {
        const sample = `async (action) => {
            const root = document.querySelector('[data-probe="collapse-root"]');
            const trig = document.querySelector('[data-probe="collapse-trigger"]');
            const content = () => document.querySelector('[data-probe="collapse-content"]');
            const read = () => {
                const c = content();
                const shown = c && getComputedStyle(c).display !== "none";
                const r = root.getBoundingClientRect().height;
                const t = trig.getBoundingClientRect().height;
                const ch = shown ? c.getBoundingClientRect().height : 0;
                return { h: r, extra: r - t - ch, op: shown ? Number(getComputedStyle(c).opacity) : null };
            };
            const xs = [];
            await new Promise((r) => requestAnimationFrame(r));
            xs.push(read());
            action();
            await new Promise((resolve) => {
                const t0 = performance.now();
                const loop = () => {
                    xs.push(read());
                    if (performance.now() - t0 < 700) requestAnimationFrame(loop); else resolve();
                };
                requestAnimationFrame(loop);
            });
            return xs;
        }`;
        const openRun = await page.evaluate(`(${sample})(() => window.__collapsible.set(true))`);
        const box = await page.locator('[data-probe="collapse-host"]').boundingBox();
        await shot(page, `o189-open-${cell}`, box);
        const closeRun = await page.evaluate(`(${sample})(() => window.__collapsible.set(false))`);
        // Reversal: open, and close again four frames into the motion.
        const reverse = await page.evaluate(async () => {
            const root = document.querySelector('[data-probe="collapse-root"]');
            const hs = [];
            await new Promise((r) => requestAnimationFrame(r));
            hs.push(root.getBoundingClientRect().height);
            window.__collapsible.set(true);
            for (let i = 0; i < 4; i++) {
                await new Promise((r) => requestAnimationFrame(r));
                hs.push(root.getBoundingClientRect().height);
            }
            const at = hs.length - 1;
            window.__collapsible.set(false);
            for (let i = 0; i < 30; i++) {
                await new Promise((r) => requestAnimationFrame(r));
                hs.push(root.getBoundingClientRect().height);
            }
            return { hs, at };
        });
        const moving = (xs) => xs.slice(1).filter((x, i) => Math.abs(x.h - xs[i].h) > 0.01).length;
        const maxExtra = (xs) => Math.max(...xs.map((x) => Math.abs(x.extra)));
        const ops = openRun.map((x) => x.op).filter((o) => o !== null);
        const minOpacity = ops.length ? Math.min(...ops) : null;
        const rs = reverse.hs;
        const closed = rs[0];
        const before = rs[reverse.at];
        const after = rs[reverse.at + 1];
        // A reversal turns where it stands: the next frame lies between where it was and
        // closed, never back up toward open.
        const turnsInPlace = before > closed + 1 && after <= before + 0.5 && after >= closed - 0.5;
        const pass = moving(openRun) >= 6 && moving(closeRun) >= 6 && maxExtra(openRun) <= 0.5 && maxExtra(closeRun) <= 0.5 && minOpacity !== null && minOpacity >= 0.999 && turnsInPlace;
        verdict("O-189", cell, pass, {
            openFrames: moving(openRun),
            closeFrames: moving(closeRun),
            maxExtraOpenPx: +maxExtra(openRun).toFixed(2),
            maxExtraClosePx: +maxExtra(closeRun).toFixed(2),
            minOpacity,
            reversal: { closed: +closed.toFixed(1), before: +before.toFixed(1), after: +after.toFixed(1) },
            heightsOpen: openRun.map((x) => +x.h.toFixed(1)).slice(0, 30),
            extraOpen: openRun.map((x) => +x.extra.toFixed(1)).slice(0, 30),
        });
    } finally {
        await context.close();
    }
}

// ── O-171 R-1 · the menu plate grows from its trigger ──────────────────────────────
function diffRows(a, b, x0, x1) {
    // Rows (y) where b differs from a anywhere in [x0, x1).
    const rows = [];
    for (let y = 0; y < a.height; y++) {
        let diff = false;
        for (let x = x0; x < x1 && !diff; x++) {
            const i = (y * a.width + x) * 4;
            const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
            if (d > 24) diff = true;
        }
        if (diff) rows.push(y);
    }
    return rows;
}

async function menu(browser, width, theme, reduce = false) {
    const cell = `${width}-${theme}${reduce ? "-reduced" : ""}`;
    const { context, page } = await open(browser, { width, theme, scene: "menu", reduce });
    try {
        const trigger = await page.locator('[data-probe="menu-trigger"]').boundingBox();
        const region = { x: 0, y: 0, width: Math.min(width, 700), height: 800 };
        const before = PNG.sync.read(await page.screenshot({ clip: region }));
        // Sample opacity every frame from the click; freeze the first frame's paint.
        await page.evaluate(() => {
            window.__menu = { ops: [], t0: 0 };
            const loop = () => {
                const c = document.querySelector('[data-slot="select-content"]');
                if (c) window.__menu.ops.push(Number(getComputedStyle(c).opacity));
                if (window.__menu.ops.length < 40) requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        });
        await page.locator('[data-probe="menu-trigger"]').click();
        await page.waitForSelector('[data-slot="select-content"][data-state="open"]');
        const frozen = await page.evaluate(() => {
            const c = document.querySelector('[data-slot="select-content"]');
            const anims = document.getAnimations().filter((a) => a.timeline === document.timeline);
            for (const a of anims) {
                a.pause();
                a.currentTime = 0;
            }
            const r = c.getBoundingClientRect();
            return {
                plate: { top: r.top, bottom: r.bottom, left: r.left, right: r.right, height: r.height },
                side: c.dataset.side ?? null,
                anchorHeight: parseFloat(getComputedStyle(c).getPropertyValue("--reka-popper-anchor-height")) || 0,
                anims: anims.map((a) => ({ name: a.animationName ?? a.transitionProperty ?? a.constructor.name, end: a.effect?.getComputedTiming().endTime ?? null })),
                opacity: Number(getComputedStyle(c).opacity),
                bloomMs: parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--spring-bloom-settle")) * 1000,
            };
        });
        await page.waitForTimeout(50);
        const first = PNG.sync.read(await page.screenshot({ clip: region }));
        await page.screenshot({ path: join(pngDir, `${label}-${engineName}-o171-first-${cell}.png`), clip: { x: Math.max(0, trigger.x - 12), y: Math.max(0, trigger.y - 12), width: Math.max(trigger.width, frozen.plate.right - frozen.plate.left) + 24, height: frozen.plate.bottom - trigger.y + 24 } });
        await page.evaluate(() => document.getAnimations().filter((a) => a.timeline === document.timeline).forEach((a) => a.finish()));
        await page.waitForTimeout(120);
        const rest = PNG.sync.read(await page.screenshot({ clip: region }));
        await page.screenshot({ path: join(pngDir, `${label}-${engineName}-o171-rest-${cell}.png`), clip: { x: Math.max(0, trigger.x - 12), y: Math.max(0, trigger.y - 12), width: Math.max(trigger.width, frozen.plate.right - frozen.plate.left) + 24, height: frozen.plate.bottom - trigger.y + 24 } });
        await page.waitForTimeout(400);
        const ops = await page.evaluate(() => window.__menu.ops);
        // Painted rows of the plate below the trigger (the plate's own columns).
        const x0 = Math.round(frozen.plate.left + 4);
        const x1 = Math.round(Math.min(region.width, frozen.plate.right - 4));
        const below = (rows) => rows.filter((y) => y >= Math.round(frozen.plate.top) - 1);
        const firstRows = below(diffRows(before, first, x0, x1));
        const restRows = below(diffRows(before, rest, x0, x1));
        const span = (rows) => (rows.length ? { top: rows[0], bottom: rows.at(-1), height: rows.at(-1) - rows[0] + 1 } : null);
        const f = span(firstRows);
        const r = span(restRows);
        const growEnd = Math.max(0, ...frozen.anims.filter((a) => /menu-grow/.test(a.name)).map((a) => a.end ?? 0));
        const minOp = Math.min(1, ...ops);
        let pass;
        let detail;
        if (!reduce) {
            // Frame one: painted from the plate's edge facing the trigger, a strip the
            // trigger's height; opacity 1 on every sampled frame; the growth settles
            // within the bloom clock.
            // The strip is the anchor's height: the trigger's, or 0 for the phone sheet,
            // whose anchor is the viewport's foot. It sits on the plate's edge facing the
            // anchor (the top for a plate below, the bottom for a plate above).
            const up = frozen.side === "top";
            const edge = up ? frozen.plate.bottom : frozen.plate.top;
            const startOk = frozen.anchorHeight < 1 ? f === null || f.height <= 2 : f !== null && Math.abs((up ? f.bottom + 1 : f.top) - edge) <= 1.5;
            const stripOk = frozen.anchorHeight < 1 ? true : f !== null && Math.abs(f.height - frozen.anchorHeight) <= 2;
            const restOk = r !== null && r.height >= Math.min(frozen.plate.height, 800 - frozen.plate.top) - 3;
            pass = startOk && stripOk && restOk && minOp >= 0.999 && frozen.opacity >= 0.999 && growEnd > 0 && growEnd <= frozen.bloomMs + 1;
            detail = { plate: frozen.plate, side: frozen.side, anchorHeight: frozen.anchorHeight, triggerHeight: trigger.height, firstPaint: f, restPaint: r, minOpacity: minOp, firstOpacity: frozen.opacity, growMs: growEnd, bloomMs: frozen.bloomMs, anims: frozen.anims };
        } else {
            // Reduced motion: no geometry, a short fade.
            pass = growEnd === 0;
            detail = { anims: frozen.anims, firstOpacity: frozen.opacity, firstPaint: f };
        }
        verdict("O-171", cell, pass, detail);
    } finally {
        await context.close();
    }
}

// ── O-180 · reads on the mount path and per press frame ────────────────────────────
async function mountReads(browser, width) {
    const cell = `${width}`;
    const { context, page } = await open(browser, { width, theme: "light", scene: "mount" });
    try {
        await page.waitForTimeout(300);
        const read = await page.evaluate(async () => {
            const counts = { gcs: 0, rect: 0, efp: 0, gcsRoot: 0 };
            let on = false;
            const gcs = window.getComputedStyle;
            window.getComputedStyle = function (el, p) {
                if (on) {
                    counts.gcs++;
                    if (el === document.documentElement) counts.gcsRoot++;
                }
                return gcs.call(window, el, p);
            };
            const rect = Element.prototype.getBoundingClientRect;
            Element.prototype.getBoundingClientRect = function () {
                if (on) counts.rect++;
                return rect.call(this);
            };
            const efp = document.elementsFromPoint;
            document.elementsFromPoint = function (x, y) {
                if (on) counts.efp++;
                return efp.call(document, x, y);
            };
            // The scene swap: 40 pressable controls and 4 sampled glass surfaces mount.
            // The window is the mounting task: from the state change to the end of Vue's
            // flush (its `nextTick`), before any frame.
            on = true;
            window.__mount.next();
            await window.__mount.tick();
            on = false;
            const mount = { ...counts };
            // The first sample still lands, on a following frame.
            for (let i = 0; i < 3; i++) await new Promise((r) => requestAnimationFrame(r));
            const sampled = [...document.querySelectorAll('[data-probe="sampled"]')].filter((el) => el.hasAttribute("data-backdrop-sample-state")).length;
            window.__counts = counts;
            window.__on = (v) => {
                on = v;
            };
            return { mount, sampled };
        });
        // A press: count style reads across the frames after the press began.
        const btn = await page.locator('[data-probe="press"]').boundingBox();
        await page.mouse.move(btn.x + btn.width / 2, btn.y + btn.height / 2);
        await page.mouse.down();
        const press = await page.evaluate(async () => {
            const c = window.__counts;
            await new Promise((r) => requestAnimationFrame(r));
            const start = c.gcs;
            window.__on(true);
            for (let i = 0; i < 12; i++) await new Promise((r) => requestAnimationFrame(r));
            window.__on(false);
            return { gcsDuringPressFrames: c.gcs - start };
        });
        await page.mouse.up();
        const pass = read.mount.gcs === 0 && read.mount.rect === 0 && read.mount.efp === 0 && read.sampled === 4 && press.gcsDuringPressFrames === 0;
        verdict("O-180", cell, pass, { mountTask: read.mount, sampledAfter3Frames: read.sampled, press });
    } finally {
        await context.close();
    }
}

// ── O-168 · the chart entrance register ────────────────────────────────────────────
async function viz(browser, width, theme, reduce = false) {
    const cell = `${width}-${theme}${reduce ? "-reduced" : ""}`;
    const { context, page } = await open(browser, { width, theme, scene: "viz", reduce });
    try {
        await page.evaluate(() => window.__viz.replay());
        await page.waitForTimeout(30);
        const read = await page.evaluate(() => {
            const by = (sel) => [...document.querySelectorAll(sel)].flatMap((el) => el.getAnimations());
            const info = (anims) => anims.map((a) => ({ name: a.animationName, delay: a.effect.getTiming().delay, duration: a.effect.getTiming().duration }));
            const root = getComputedStyle(document.documentElement);
            return {
                bars: info(by('[data-probe="bar"]')),
                marks: info(by('[data-probe="mark"]')),
                ripple: info(by('[data-probe="ripple"]')),
                panelMs: parseFloat(root.getPropertyValue("--spring-panel-settle")) * 1000,
            };
        });
        const box = await page.locator('[data-probe="chart"]').boundingBox();
        await page.evaluate(() => document.getAnimations().filter((a) => a.timeline === document.timeline).forEach((a) => { a.pause(); a.currentTime = 160; }));
        await shot(page, `o168-mid-${cell}`, box);
        await page.evaluate(() => document.getAnimations().filter((a) => a.timeline === document.timeline).forEach((a) => a.finish()));
        await page.waitForTimeout(50);
        await shot(page, `o168-rest-${cell}`, box);
        const lastStart = (xs) => Math.max(0, ...xs.map((a) => a.delay));
        let pass;
        if (!reduce) {
            pass =
                read.bars.length === 12 && read.bars.every((a) => a.name === "gl-viz-grow-up") &&
                read.marks.length === 12 && read.marks.every((a) => a.name === "gl-viz-land") &&
                read.ripple.length === 1 && read.ripple[0].name === "gl-viz-ripple" &&
                lastStart(read.bars) <= read.panelMs && lastStart(read.marks) <= read.panelMs &&
                Math.abs(read.bars[1].delay - read.bars[0].delay - Math.min(80, read.panelMs / 12)) < 0.6;
        } else {
            pass = read.bars.length === 0 && read.marks.length === 0 && read.ripple.length === 0;
        }
        verdict("O-168", cell, pass, { bars: read.bars.length, marks: read.marks.length, ripple: read.ripple.length, names: [...new Set([...read.bars, ...read.marks, ...read.ripple].map((a) => a.name))], staggerMs: read.bars.length > 1 ? read.bars[1].delay - read.bars[0].delay : null, lastBarStartMs: lastStart(read.bars), panelMs: read.panelMs });
    } finally {
        await context.close();
    }
}

// ── O-173 G1 · the lateral card swap ───────────────────────────────────────────────
async function vt(browser, width, theme, reduce = false) {
    const cell = `${width}-${theme}${reduce ? "-reduced" : ""}`;
    const { context, page } = await open(browser, { width, theme, scene: "vt", reduce });
    try {
        const supported = await page.evaluate(() => typeof document.startViewTransition === "function");
        if (!supported) {
            verdict("O-173", cell, false, { error: "no startViewTransition" });
            return;
        }
        const swap = async (direction) => {
            await page.evaluate((d) => window.__vt.swap(d), direction);
            return page.evaluate(() => {
                const anims = document.getAnimations().filter((a) => a.effect?.pseudoElement?.startsWith("::view-transition"));
                for (const a of anims) {
                    a.pause();
                    a.currentTime = 0;
                }
                return anims.map((a) => {
                    const kfs = a.effect.getKeyframes();
                    return {
                        pseudo: a.effect.pseudoElement,
                        name: a.animationName ?? "",
                        opacityKeyframes: kfs.filter((k) => "opacity" in k).length,
                        translate0: kfs[0]?.translate ?? null,
                        props: [...new Set(kfs.flatMap((k) => Object.keys(k).filter((p) => !["offset", "computedOffset", "easing", "composite"].includes(p))))],
                    };
                });
            });
        };
        const fwd = await swap(1);
        const box = await page.locator('[data-probe="card"]').boundingBox();
        if (!reduce) {
            await page.evaluate(() => document.getAnimations().forEach((a) => { if (a.effect?.pseudoElement && a.timeline === document.timeline) a.currentTime = 90; }));
            await shot(page, `o173-mid-${cell}`, { x: 0, y: box.y - 40, width: Math.min(width, 700), height: box.height + 80 }, 0);
        }
        await page.evaluate(() => document.getAnimations().filter((a) => a.timeline === document.timeline).forEach((a) => a.finish()));
        await page.waitForTimeout(150);
        const back = await swap(-1);
        await page.evaluate(() => document.getAnimations().filter((a) => a.timeline === document.timeline).forEach((a) => a.finish()));
        await page.waitForTimeout(150);
        const sel = (list, pseudo) => list.filter((a) => a.pseudo === pseudo);
        const opacityOn = (list, pseudo) => sel(list, pseudo).reduce((n, a) => n + a.opacityKeyframes, 0);
        const sign = (list) => {
            const t = sel(list, "::view-transition-new(gl-route-window)").find((a) => a.translate0)?.translate0 ?? "";
            const x = parseFloat(String(t).split(" ")[0]);
            return Number.isFinite(x) ? Math.sign(x) : 0;
        };
        let pass;
        let detail;
        if (!reduce) {
            const rootOp = opacityOn(fwd, "::view-transition-old(root)") + opacityOn(fwd, "::view-transition-new(root)");
            const winOp = opacityOn(fwd, "::view-transition-old(gl-route-window)") + opacityOn(fwd, "::view-transition-new(gl-route-window)");
            const group = sel(fwd, "::view-transition-group(gl-route-window)").length;
            pass = rootOp === 0 && winOp === 0 && sign(fwd) === 1 && sign(back) === -1 && group >= 1;
            detail = { rootOpacityKeyframes: rootOp, windowOpacityKeyframes: winOp, newTranslateSign: { forward: sign(fwd), back: sign(back) }, groupAnimations: group, forward: fwd };
        } else {
            pass = fwd.length === 0;
            detail = { animations: fwd.length, forward: fwd };
        }
        verdict("O-173", cell, pass, detail);
    } finally {
        await context.close();
    }
}

// WebKit runs on Playwright's build 2287 (see the header).
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;
const browser = await engine.launch(engineName === "webkit" ? { headless: true, executablePath: WEBKIT_2287 } : { headless: true });
let failed = 0;
try {
    for (const width of WIDTHS) {
        for (const theme of THEMES) {
            for (const [name, fn] of [["slider-stream", sliderStream], ["slider-hand", sliderHand], ["collapsible", collapsible], ["menu", menu], ["viz", viz], ["vt", vt]]) {
                try {
                    await fn(browser, width, theme);
                } catch (error) {
                    verdict(name, `${width}-${theme}`, false, { error: String(error).slice(0, 400) });
                }
            }
        }
        try {
            await mountReads(browser, width);
        } catch (error) {
            verdict("O-180", `${width}`, false, { error: String(error).slice(0, 400) });
        }
    }
    for (const [name, fn] of [["menu", menu], ["viz", viz], ["vt", vt]]) {
        try {
            await fn(browser, 390, "light", true);
        } catch (error) {
            verdict(name, "390-light-reduced", false, { error: String(error).slice(0, 400) });
        }
    }
} finally {
    await browser.close();
}
results.verdicts = verdicts;
const summary = {};
for (const v of verdicts) {
    summary[v.item] ??= { pass: 0, total: 0 };
    summary[v.item].total++;
    if (v.pass) summary[v.item].pass++;
    else failed++;
}
results.summary = summary;
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(results, null, 2));
console.log(JSON.stringify(summary));
process.exit(failed ? 1 : 0);
