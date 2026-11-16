// The close's use sweep: what the checker cannot read from a page at rest. Per route
// and cell it takes the first-screen crop, presses every option of every variant
// switch and opens the code disclosure (and, on an editor page, a closed layer),
// sampling the moving box every frame, and keeps every console error or warning
// raised while doing so. On an overlay page it opens the overlay and reports its
// plate's corners and its words' contrast.
//
// A leg is one monotone run of a sampled value (a fade out, a fade in, a height
// travel). FORM.md line 15: every leg has a start and a stop, and no frame lands more
// than two fifths of the leg's travel.
//
// Machine law (~/.claude/CLAUDE.md): run only through `~/.claude/guard/guarded`, never
// `--light`. Chromium headless shell; the flags `--use-angle=metal --enable-gpu
// --ignore-gpu-blocklist` are the checker's named exception (canvases must render).
// One browser per run, a new context per route and cell, all closed in `finally`.
// Pixels come from page.screenshot; no getContext is called on a page canvas.
//
// usage: node sweep.mjs --base http://127.0.0.1:5451 --routes /a,/b --out <dir>
//        [--cells d1440,l1440,m390] [--crops 1]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
        return acc;
    }, []),
);
const BASE = args.base ?? "http://127.0.0.1:5451";
const ROUTES = (args.routes ?? "/").split(",");
const CELL_IDS = (args.cells ?? "d1440,l1440,m390").split(",");
const OUT = args.out;
const CROPS = args.crops !== "0";
fs.mkdirSync(OUT, { recursive: true });
const rowsOut = fs.createWriteStream(path.join(OUT, "sweep.jsonl"), { flags: "a" });

const CELLS = {
    d1440: { viewport: { width: 1440, height: 900 }, scheme: "dark", touch: false },
    l1440: { viewport: { width: 1440, height: 900 }, scheme: "light", touch: false },
    m390: { viewport: { width: 390, height: 844 }, scheme: "dark", touch: true },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (route) => (route === "/" ? "home" : route.slice(1).replace(/\//g, "_"));

// In-page frame recorder: samples `read()` every animation frame until stopped.
const RECORDER = () => {
    window.__rec = {
        start(kind) {
            const samples = [];
            const read = () => {
                if (kind === "swap") {
                    const pane = document.querySelector("#demo-main [data-story-stage] .stage-swap-pane, #demo-main .stage-swap-pane");
                    const box = pane?.parentElement;
                    return [pane ? parseFloat(getComputedStyle(pane).opacity) : 0, box ? box.getBoundingClientRect().height : 0];
                }
                const el = document.querySelector(window.__rec.target);
                return [el ? el.getBoundingClientRect().height : 0];
            };
            let on = true;
            const tick = () => {
                if (!on) return;
                samples.push(read());
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            window.__rec.stop = () => { on = false; return samples; };
        },
        target: null,
    };
};

// Split a series into monotone legs and grade each.
function legs(series) {
    const out = [];
    let i = 0;
    while (i < series.length - 1) {
        while (i < series.length - 1 && Math.abs(series[i + 1] - series[i]) < 1e-4) i++;
        if (i >= series.length - 1) break;
        const dir = Math.sign(series[i + 1] - series[i]);
        let j = i + 1;
        while (j < series.length - 1) {
            const d = series[j + 1] - series[j];
            if (Math.abs(d) < 1e-4) {
                // a flat frame inside a leg ends it only if the run then reverses
                let k = j + 1;
                while (k < series.length - 1 && Math.abs(series[k + 1] - series[k]) < 1e-4) k++;
                if (k < series.length - 1 && Math.sign(series[k + 1] - series[k]) === dir) { j = k; continue; }
                break;
            }
            if (Math.sign(d) !== dir) break;
            j++;
        }
        const travel = Math.abs(series[j] - series[i]);
        let maxStep = 0;
        for (let k = i; k < j; k++) maxStep = Math.max(maxStep, Math.abs(series[k + 1] - series[k]));
        out.push({ from: +series[i].toFixed(3), to: +series[j].toFixed(3), frames: j - i, travel: +travel.toFixed(3), step: travel ? +(maxStep / travel).toFixed(3) : 0 });
        i = j;
    }
    return out;
}
// A leg is graded when it travels far enough to see (an opacity of 0.05, a height of 2 px).
const grade = (ls, min) => {
    const g = ls.filter((l) => l.travel >= min);
    return { legs: g, pass: g.every((l) => l.frames >= 2 && l.step <= 0.4) };
};

// Close whatever a press opened (a dialog, a sheet, a full-screen container) before the
// next press, so a modal never sits over the row being pressed.
async function closeOverlays(page) {
    for (let i = 0; i < 3; i++) {
        const open = await page.evaluate(() =>
            [...document.querySelectorAll('[role="dialog"], [role="alertdialog"], [data-state="open"][aria-modal="true"]')].some((e) => {
                const r = e.getBoundingClientRect();
                return r.width > 8 && r.height > 8 && !e.closest("[data-story-card]");
            }) || getComputedStyle(document.body).pointerEvents === "none",
        );
        if (!open) return;
        await page.keyboard.press("Escape");
        await sleep(600);
    }
}

async function record(page, kind, act, ms = 900) {
    await page.evaluate((k) => window.__rec.start(k), kind);
    await act();
    await sleep(ms);
    const s = await page.evaluate(() => window.__rec.stop());
    return s;
}

// The overlay's plate: corners and words' contrast against the pixels behind them.
const OVERLAY = async ({ shotB64 }) => {
    const sel = '[role="dialog"], [role="menu"], [role="tooltip"], [role="listbox"], [data-slot="popover-content"], [data-reka-popper-content-wrapper] > *';
    const els = [...document.querySelectorAll(sel)].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 8 && r.height > 8 && !e.closest("[data-story-card]") && !e.closest(".demo-sidebar-rail") && !e.closest(".demo-bottom-dock");
    });
    if (!els.length) return [];
    const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0));
    const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
    const cv = new OffscreenCanvas(bmp.width, bmp.height);
    const cx = cv.getContext("2d", { willReadFrequently: true });
    cx.drawImage(bmp, 0, 0);
    const img = cx.getImageData(0, 0, bmp.width, bmp.height);
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    const CR = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const bg = (r) => {
        const bins = new Map();
        for (let y = Math.max(0, r.top | 0); y < Math.min(img.height, Math.ceil(r.bottom)); y++)
            for (let x = Math.max(0, (r.left | 0) - 2); x < Math.min(img.width, Math.ceil(r.right) + 2); x++) {
                const i = (y * img.width + x) * 4, k = (img.data[i] >> 4) * 256 + (img.data[i + 1] >> 4) * 16 + (img.data[i + 2] >> 4);
                const b = bins.get(k) || [0, 0, 0, 0]; b[0] += img.data[i]; b[1] += img.data[i + 1]; b[2] += img.data[i + 2]; b[3]++; bins.set(k, b);
            }
        let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
        return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : null;
    };
    return els.map((e) => {
        const cs = getComputedStyle(e), r = e.getBoundingClientRect();
        const runs = [];
        const tw = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
        for (let n = tw.nextNode(); n; n = tw.nextNode()) {
            if (!/[\p{L}\p{N}]/u.test(n.data)) continue;
            const el = n.parentElement;
            if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            const rg = document.createRange(); rg.selectNodeContents(n);
            const q = rg.getBoundingClientRect(); if (q.width < 2 || q.height < 2) continue;
            // ink from the pixels: the glyph pixel that stands furthest from the run's
            // own background (glass composites its ink, so a computed colour lies)
            const b = bg(q); if (!b) continue;
            let best = 1;
            for (let y = Math.max(0, q.top | 0); y < Math.min(img.height, Math.ceil(q.bottom)); y++)
                for (let x = Math.max(0, q.left | 0); x < Math.min(img.width, Math.ceil(q.right)); x++) {
                    const i = (y * img.width + x) * 4;
                    best = Math.max(best, CR([img.data[i], img.data[i + 1], img.data[i + 2]], b));
                }
            runs.push({ text: n.data.trim().slice(0, 24), cr: +best.toFixed(2) });
        }
        const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(parseFloat);
        return { role: e.getAttribute("role") ?? e.dataset.slot ?? e.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), radii, minCr: runs.length ? Math.min(...runs.map((x) => x.cr)) : null, low: runs.filter((x) => x.cr < 4.5) };
    });
};

const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
    for (const cellId of CELL_IDS) {
        const C = CELLS[cellId];
        for (const route of ROUTES) {
            const ctx = await browser.newContext({ viewport: C.viewport, colorScheme: C.scheme, hasTouch: C.touch, isMobile: C.touch, deviceScaleFactor: 1 });
            const errors = [];
            const row = { route, cell: cellId, switches: [], code: null, layer: null, overlays: null };
            try {
                await ctx.addInitScript(`try { localStorage.setItem("vueuse-color-scheme", ${JSON.stringify(C.scheme)}); } catch {}`);
                await ctx.addInitScript(RECORDER);
                const page = await ctx.newPage();
                page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text().slice(0, 160)}`); });
                page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message).slice(0, 160)}`));
                await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
                await page.waitForSelector("#demo-main", { timeout: 15000 });
                await sleep(2500);
                if (CROPS) await page.screenshot({ path: path.join(OUT, `${slug(route)}-${cellId}.png` ) });

                // overlays: open on load, or opened by the stage's trigger
                if (route.startsWith("/containers/")) {
                    const press = { "/containers/dialog": 1, "/containers/sheet": 1, "/containers/dropdown-menu": 1 };
                    if (press[route]) {
                        const t = page.locator("#demo-main [data-story-stage] button").first();
                        if (await t.count()) { await t.click(); await sleep(900); }
                    }
                    const shot = (await page.screenshot({ type: "png" })).toString("base64");
                    row.overlays = await page.evaluate(OVERLAY, { shotB64: shot });
                    if (CROPS && press[route]) await page.screenshot({ path: path.join(OUT, `${slug(route)}-${cellId}-open.png`) });
                    await closeOverlays(page);
                }

                // every variant switch, every option, then back to the first
                const rows = page.locator("#demo-main [data-story-variants] .story-variant-row");
                for (let r = 0; r < (await rows.count()); r++) {
                    // a switch row holds one SegmentedTabs; a row of instances holds its items
                    if (await rows.nth(r).locator(".story-variant-items").count()) continue;
                    const tabs = rows.nth(r).locator('[role="tablist"] button, [role="group"] button');
                    const n = await tabs.count();
                    if (n < 2) continue;
                    const label = (await rows.nth(r).locator(".story-variant-label").textContent())?.trim();
                    // the selected option takes no press; start from it, visit the rest, return
                    let sel = 0;
                    for (let k = 0; k < n; k++) {
                        const t = tabs.nth(k);
                        if ((await t.getAttribute("aria-selected")) === "true" || (await t.getAttribute("aria-pressed")) === "true" || (await t.getAttribute("data-state")) === "active") sel = k;
                    }
                    const order = [...Array(n).keys()].filter((k) => k !== sel).concat([sel]);
                    for (const i of order) {
                        await closeOverlays(page);
                        let missed = null;
                        const press = async () => {
                            try { await tabs.nth(i).click({ timeout: 4000 }); }
                            catch {
                                await page.keyboard.press("Escape");
                                // a full-screen container closes by its own collapse control
                                const collapse = page.locator('[data-mode="collapse"]').first();
                                if (await collapse.count()) await collapse.click({ timeout: 2000 }).catch(() => {});
                                await sleep(900);
                                const t = tabs.nth(i);
                                const reached = (await t.getAttribute("aria-selected")) === "true" || (await t.getAttribute("aria-pressed")) === "true";
                                if (!reached) await t.click({ timeout: 4000 }).catch((e) => { missed = String(e.message).split("\n")[0]; });
                            }
                        };
                        const s = await record(page, "swap", press, 1400);
                        if (missed) { row.switches.push({ label, option: i, pass: false, missed }); continue; }
                        const op = grade(legs(s.map((x) => x[0])), 0.05);
                        const ht = grade(legs(s.map((x) => x[1])), 2);
                        row.switches.push({ label, option: i, opacity: op, height: ht, pass: op.pass && ht.pass, frames: s.length });
                    }
                }

                await closeOverlays(page);
                // the code disclosure
                const trig = page.locator("#demo-main [data-story-code] button").first();
                if (await trig.count()) {
                    await page.evaluate(() => {
                        const c = document.querySelector("#demo-main [data-story-code]");
                        const content = [...c.children].find((e) => !e.matches("button"));
                        if (content) content.setAttribute("data-sweep-target", "");
                        window.__rec.target = "#demo-main [data-sweep-target]";
                    });
                    const open = await record(page, "height", () => trig.click(), 900);
                    const shut = await record(page, "height", () => trig.click(), 900);
                    const g = grade(legs(open.concat(shut).map((x) => x[0])), 2);
                    row.code = { ...g, frames: open.length + shut.length };
                }

                // an editor's closed layer
                const layer = page.locator('#demo-main .configurator-aside button[data-slot="configurator-layer-trigger"][aria-expanded="false"]').first();
                if (await layer.count()) {
                    const id = await layer.getAttribute("aria-controls");
                    if (id) {
                        await page.evaluate((i) => { window.__rec.target = `[id="${i}"]`; }, id);
                        const s = await record(page, "height", () => layer.click(), 900);
                        row.layer = { ...grade(legs(s.map((x) => x[0])), 2), frames: s.length };
                    }
                }
                await sleep(300);
                row.overflowAfterUse = await page.evaluate(() => { const m = document.querySelector("#demo-main"); return m ? m.scrollWidth > m.clientWidth : null; });
            } catch (e) {
                row.run = String(e?.message ?? e).slice(0, 200);
            } finally {
                row.errors = errors;
                row.pass = !row.run && errors.length === 0 && row.switches.every((s) => s.pass) && (row.code?.pass ?? true) && (row.layer?.pass ?? true) && !row.overflowAfterUse;
                rowsOut.write(JSON.stringify(row) + "\n");
                const sw = row.switches.length ? `${row.switches.filter((s) => s.pass).length}/${row.switches.length} switches` : "no switch";
                console.log(`${row.pass ? "pass" : "FAIL"} ${cellId} ${route} ${sw}; code ${row.code ? (row.code.pass ? "ok" : "FAIL") : "-"}; layer ${row.layer ? (row.layer.pass ? "ok" : "FAIL") : "-"}; console ${errors.length}${row.run ? "; run " + row.run : ""}${row.overflowAfterUse ? "; overflow" : ""}`);
                await ctx.close().catch(() => {});
            }
        }
    }
} finally {
    await browser.close().catch(() => {});
    rowsOut.end();
}
