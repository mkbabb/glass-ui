// P11 probe: crops of every motion page, and the checks the checker does not read:
// using each variant with the console watched; the variant swap, the deck's turn, the
// springs' travel, the counters and the code disclosure sampled per frame.
//
// Machine law: run only through `guarded` as a browser run. Headless shell, the GPU
// flags the checker uses, one browser, a context per cell, all closed in `finally`.
//
// usage: node probe.mjs --base http://127.0.0.1:5471 --out <dir> [--only a,b] [--cells d1440]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
        return acc;
    }, []),
);
const BASE = args.base;
const OUT = args.out;
const only = args.only ? new Set(args.only.split(",")) : null;
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ALL_CELLS = {
    d1440: { viewport: { width: 1440, height: 900 }, scheme: "dark", touch: false },
    l1440: { viewport: { width: 1440, height: 900 }, scheme: "light", touch: false },
    m390: { viewport: { width: 390, height: 844 }, scheme: "dark", touch: true },
};
const CELLS = Object.fromEntries(
    Object.entries(ALL_CELLS).filter(([k]) => !args.cells || args.cells.split(",").includes(k)),
);
const PAGES = ["springs", "scroll", "deck", "handmark", "text-motion"];

// Samples a value every animation frame for `ms`, after `act` runs. `prop` is a CSS
// property, "height", "scrollTop", "translateX", "text" (a number read from text).
async function frames(page, sel, prop, act, ms = 700) {
    await page.evaluate(
        ({ sel, prop, ms }) => {
            window.__samples = [];
            const t0 = performance.now();
            const read = (el) => {
                if (!el) return null;
                if (prop === "height") return el.getBoundingClientRect().height;
                if (prop === "scrollTop") return el.scrollTop;
                if (prop === "translateX") return new DOMMatrix(getComputedStyle(el).transform).m41 + (parseFloat(getComputedStyle(el).translate) || 0);
                if (prop === "text") return parseFloat(el.textContent.replace(/[^0-9.]/g, ""));
                if (prop === "rectX") return el.getBoundingClientRect().x;
                return parseFloat(getComputedStyle(el)[prop]);
            };
            const tick = () => {
                const v = read(document.querySelector(sel));
                window.__samples.push(v == null || Number.isNaN(v) ? null : +v.toFixed(3));
                if (performance.now() - t0 < ms) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        },
        { sel, prop, ms },
    );
    await act();
    await sleep(ms + 100);
    return page.evaluate(() => window.__samples);
}

// Monotone legs, split at reversals; each with its largest one-frame step as a share
// of the leg's travel (P0a allows up to 0.40).
function legs(samples) {
    const s = samples.filter((v) => v != null);
    const out = [];
    let start = 0;
    let dir = 0;
    const close = (end) => {
        const seg = s.slice(start, end + 1);
        const travel = Math.abs(seg[seg.length - 1] - seg[0]);
        if (travel > 0.01) {
            let max = 0;
            for (let k = 1; k < seg.length; k++) max = Math.max(max, Math.abs(seg[k] - seg[k - 1]));
            out.push({ from: seg[0], to: seg[seg.length - 1], frames: seg.length, maxStep: +(max / travel).toFixed(2) });
        }
    };
    for (let i = 1; i < s.length; i++) {
        const d = Math.sign(s[i] - s[i - 1]);
        if (d === 0) continue;
        if (dir !== 0 && d !== dir) {
            close(i - 1);
            start = i - 1;
        }
        dir = d;
    }
    close(s.length - 1);
    return out;
}

const rectOf = (page, sel) =>
    page.evaluate((sel) => {
        const r = document.querySelector(sel)?.getBoundingClientRect();
        return r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } : null;
    }, sel);

const report = [];
const browser = await chromium.launch({
    headless: true,
    args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
});
try {
    for (const [cellId, C] of Object.entries(CELLS)) {
        for (const id of ["section", ...PAGES]) {
            if (only && !only.has(id)) continue;
            const route = id === "section" ? "/motion" : `/motion/${id}`;
            const ctx = await browser.newContext({
                viewport: C.viewport, colorScheme: C.scheme, hasTouch: C.touch, isMobile: C.touch, deviceScaleFactor: 1,
            });
            const errors = [];
            const row = { route, cell: cellId };
            try {
                await ctx.addInitScript(`try{localStorage.setItem("vueuse-color-scheme",${JSON.stringify(C.scheme)})}catch{}`);
                const page = await ctx.newPage();
                page.on("console", (m) => {
                    if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text().slice(0, 160)}`);
                });
                page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message).slice(0, 160)}`));
                await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
                await page.waitForSelector("#demo-main");
                await sleep(2500);
                const name = id === "section" ? "motion" : `motion_${id}`;
                await page.screenshot({ path: path.join(OUT, `${name}-${cellId}.png`) });
                if (id !== "section") row.stage = await rectOf(page, "[data-story-stage]");

                if (id === "springs") {
                    const chip = (label) => page.locator("[data-story-stage] button").filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) }).first();
                    row.disc0 = await rectOf(page, ".springs-disc");
                    row.bloomTravel = legs(await frames(page, ".springs-disc", "rectX", () => chip("Bloom").click(), 1400));
                    row.easeTravel = legs(await frames(page, ".springs-disc", "rectX", () => chip("Ease out").click(), 1200));
                    row.easeLayerOpen = await page.evaluate(() => [...document.querySelectorAll("[data-story-stage] [data-state=open]")].map((e) => e.textContent.trim().slice(0, 20)));
                    await page.screenshot({ path: path.join(OUT, `${name}-${cellId}-ease.png`) });
                    // a slider edit replays the curve
                    const thumb = page.locator("[data-story-stage] [role=slider]:visible").first();
                    if (await thumb.count()) {
                        await thumb.focus();
                        row.sliderReplay = legs(await frames(page, ".springs-disc", "rectX", async () => {
                            for (let k = 0; k < 10; k++) await page.keyboard.press("ArrowRight");
                        }, 1400));
                    }
                    row.chips = await page.evaluate(() => {
                        const r = document.querySelector("[data-story-stage] [data-slot=configurator-gallery], [data-story-stage] [data-slot*=preset]")?.getBoundingClientRect();
                        return r ? Math.round(r.height) : null;
                    });
                    row.pageScroll = await page.evaluate(() => {
                        const m = document.querySelector("#demo-main");
                        return m.scrollHeight > m.clientHeight + 1;
                    });
                }

                if (id === "scroll") {
                    const port = "[data-story-stage] .scroll-stage-port";
                    const box = await page.locator(port).boundingBox();
                    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                    await page.mouse.wheel(0, 700);
                    await sleep(900);
                    row.rimValue = await page.evaluate(() => document.querySelector("[data-story-stage] [role=progressbar]")?.getAttribute("aria-valuenow"));
                    await page.screenshot({ path: path.join(OUT, `${name}-${cellId}-rim.png`) });
                    for (const mode of ["Bar", "Reveal"]) {
                        const sw = page.locator("[data-story-variants] button, [data-story-variants] [role=tab]").filter({ hasText: new RegExp(`^\\s*${mode}\\s*$`) }).first();
                        row[`swap${mode}`] = legs(await frames(page, "[data-story-stage] .stage-swap-pane", "opacity", () => sw.click(), 700));
                        await sleep(300);
                        const b = await page.locator(port).boundingBox();
                        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
                        if (mode === "Reveal") {
                            row.revealLift = legs(await frames(page, "[data-story-stage] .scroll-stage-chapter:nth-child(4)", "opacity", () => page.mouse.wheel(0, 500), 900));
                        } else {
                            await page.mouse.wheel(0, 700);
                            await sleep(700);
                            row.barScale = await page.evaluate(() => getComputedStyle(document.querySelector("[data-story-stage] .scroll-stage-bar")).transform);
                        }
                        await page.screenshot({ path: path.join(OUT, `${name}-${cellId}-${mode.toLowerCase()}.png`) });
                    }
                    row.pageScrollTop = await page.evaluate(() => document.querySelector("#demo-main").scrollTop);
                }

                if (id === "deck") {
                    const next = page.locator("[data-story-stage] button[aria-label='Next slide']");
                    row.turnIn = legs(await frames(page, "[data-story-stage] .deck-strip > :nth-child(2)", "opacity", () => next.click(), 1200));
                    row.turnOut = legs(await frames(page, "[data-story-stage] .deck-strip > :nth-child(2)", "opacity", () => next.click(), 1200));
                    await page.locator("[data-story-stage] button[aria-label='Previous slide']").click();
                    await sleep(900);
                    await sleep(400);
                    row.afterNext = await page.evaluate(() => document.querySelector("[data-story-stage] .deck-slide[data-state=active]")?.textContent.trim());
                    // keys while the deck has focus
                    await page.locator("[data-story-stage] .deck-demo").focus();
                    await page.keyboard.press("ArrowRight");
                    await sleep(900);
                    row.afterKey = await page.evaluate(() => document.querySelector("[data-story-stage] .deck-slide[data-state=active]")?.textContent.trim());
                    await page.locator("[data-story-stage] [data-slot=pager-dots] button").last().click();
                    await sleep(900);
                    row.afterDot = await page.evaluate(() => document.querySelector("[data-story-stage] .deck-slide[data-state=active]")?.textContent.trim());
                    await page.screenshot({ path: path.join(OUT, `${name}-${cellId}-turned.png`) });
                    row.controls = await rectOf(page, "[data-story-stage] .deck-demo-controls");
                    row.controlsScroll = await page.evaluate(() => {
                        const c = document.querySelector("[data-story-stage] .deck-demo-controls");
                        return c ? [c.scrollWidth, c.clientWidth] : null;
                    });
                }

                if (id === "text-motion") {
                    const replay = page.locator("[data-story-stage] button").filter({ hasText: /Replay/ }).first();
                    row.count = legs(await frames(page, "[data-story-stage] .text-motion-value", "text", () => replay.click(), 2600));
                    await page.screenshot({ path: path.join(OUT, `${name}-${cellId}-replayed.png`) });
                }

                const codeBtn = page.locator("[data-story-code] button").first();
                if (await codeBtn.count()) {
                    row.codeOpen = legs(await frames(page, "[data-story-code] [data-slot=collapsible-content], [data-story-code] [data-state]:not(button)", "height", () => codeBtn.click(), 700));
                    await page.screenshot({ path: path.join(OUT, `${name}-${cellId}-code.png`) });
                }

                row.overflowX = await page.evaluate(() => {
                    const m = document.querySelector("#demo-main");
                    return m.scrollWidth > m.clientWidth;
                });
            } catch (e) {
                row.error = String(e?.message ?? e).slice(0, 200);
            } finally {
                row.console = errors;
                report.push(row);
                await ctx.close().catch(() => {});
            }
        }
    }
} finally {
    await browser.close().catch(() => {});
}
fs.appendFileSync(path.join(OUT, "probe.jsonl"), report.map((r) => JSON.stringify(r)).join("\n") + "\n");
for (const r of report) console.log(JSON.stringify(r));
