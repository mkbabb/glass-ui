// The close's use sweep: what the checker cannot read from a page at rest. Per route
// and cell it takes the first-screen crop, presses every option of every variant
// switch and opens the code disclosure (and, on an editor page, a closed layer),
// sampling the moving box every frame, and keeps every console error or warning
// raised while doing so. On an overlay page it opens the overlay and reports its
// plate's corners and its words' contrast. On the three pages that open a surface on
// arrival (Dialog, Sheet, Menu) it takes the open crop (`-arrival`), closes the
// surface, counts what is still open (`closed`, which must read 0) and takes the
// closed crop (`-closed`) in place of the plain one.
//
// A leg is one monotone run of a sampled value (a fade out, a fade in, a height
// travel). FORM.md line 15: every leg has a start and a stop, and no frame lands more
// than two fifths of the leg's travel.
//
// P17 adds the leave line: at each press, the stage swap's leaving pane's own opacity
// transition is read off the pane as it starts (its keyframes, length and curve), and
// that curve is stepped on a probe element at 60 frames a second, from every phase of
// the first frame (0 to 16 ms in 1 ms): `leave` is the largest share of the fade that
// one 60 Hz frame lands. A route passes when every leave it reads is 0.2 or less. The
// sampled legs above read the same fade at the headless frame rate, where one late
// frame after a press can land a large share of any curve; the leave line reads the
// curve itself. The entering pane's fade is read the same way and reported, not graded.
//
// P17's close adds the enter line: per switch, the sampled fade's rising leg (the new
// pane fading in, read every headless frame) and its largest step as a share of its
// travel; `enterLeg` holds the route's first switch, where the new pane is styled and
// laid out for the first time, and the largest of all. A route passes when every enter
// leg it reads steps 0.2 or less, as a leave does.
//
// Machine law (~/.claude/CLAUDE.md): run only through `~/.claude/guard/guarded`, never
// `--light`. Chromium headless shell; the flags `--use-angle=metal --enable-gpu
// --ignore-gpu-blocklist` are the checker's named exception (canvases must render).
// One browser per run, a new context per route and cell, all closed in `finally`.
// Pixels come from page.screenshot; no getContext is called on a page canvas.
//
// `--engine webkit` runs the same sweep in Playwright WebKit (headless, no flags), under
// `guarded --exclusive webkit`.
//
// usage: node sweep.mjs --base http://127.0.0.1:5451 --routes /a,/b --out <dir>
//        [--cells d1440,l1440,m390] [--crops 1] [--engine chromium|webkit]
import { chromium, webkit } from "playwright";
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
const ENGINE = args.engine ?? "chromium";
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
                    // the fade: the pane's own opacity, or (P17 on) that of a part the
                    // swap fades by its own opacity
                    const f = pane && window.__fade.of(pane);
                    const op = pane ? parseFloat(getComputedStyle(f?.effect?.target ?? pane).opacity) : 0;
                    return [op, box ? box.getBoundingClientRect().height : 0];
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
    // P17: the swap's leave and enter fades, read off the panes as they start: the
    // pane's own opacity transition, or the fades the swap runs on the parts it moves
    // by their own opacity (animations named `stage-swap-fade`).
    const swapFades = (pane) => pane.getAnimations({ subtree: true }).filter((a) =>
        a.id === "stage-swap-fade" || (a.effect?.target === pane && (a.effect.getKeyframes?.() ?? []).some((k) => "opacity" in k)));
    window.__fade = {
        of: (pane) => swapFades(pane).find((a) => a.playState !== "finished" || a.effect?.getTiming?.().fill === "forwards") ?? null,
        arm() {
            const before = new Set(document.querySelectorAll("#demo-main .stage-swap-pane"));
            const seen = new WeakSet(document.getAnimations());
            const got = { leave: [], enter: [] };
            let frames = 0;
            const take = (pane, kind) => {
                // one read per pane and kind: every part of one fade runs the same curve
                const fresh = swapFades(pane).filter((a) => !seen.has(a));
                fresh.forEach((a) => seen.add(a));
                for (const a of fresh.slice(0, 1)) {
                    const kf = a.effect.getKeyframes();
                    const t = a.effect.getTiming();
                    got[kind].push({
                        keyframes: kf.map((k) => ({ offset: k.offset ?? k.computedOffset, easing: k.easing ?? "linear", opacity: k.opacity })),
                        duration: +t.duration || 0,
                        easing: t.easing ?? "linear",
                    });
                }
            };
            const poll = () => {
                for (const p of document.querySelectorAll("#demo-main .stage-swap-pane")) take(p, before.has(p) ? "leave" : "enter");
                if (++frames < 90) requestAnimationFrame(poll);
            };
            requestAnimationFrame(poll);
            window.__fade.read = () => {
                const grid = (f) => {
                    const probe = document.createElement("div");
                    probe.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;pointer-events:none;visibility:hidden";
                    document.body.append(probe);
                    try {
                        const a = probe.animate(f.keyframes.map((k) => ({ offset: k.offset, easing: k.easing, opacity: k.opacity })), { duration: f.duration, easing: f.easing, fill: "both" });
                        a.pause();
                        const at = (ms) => { a.currentTime = Math.min(ms, f.duration); return parseFloat(getComputedStyle(probe).opacity); };
                        const o0 = at(0), o1 = at(f.duration), travel = Math.abs(o1 - o0);
                        if (!travel || !f.duration) return 0;
                        let worst = 0;
                        for (let ph = 0; ph <= 16; ph++) {
                            let prev = o0;
                            for (let ms = ph; ; ms += 1000 / 60) {
                                const o = at(ms);
                                worst = Math.max(worst, Math.abs(o - prev) / travel);
                                prev = o;
                                if (ms >= f.duration) break;
                            }
                        }
                        a.cancel();
                        return +worst.toFixed(3);
                    } finally { probe.remove(); }
                };
                const out = (list) => list.map((f) => ({ ms: f.duration, curve: f.keyframes[0]?.easing !== "linear" ? f.keyframes[0].easing : f.easing, step: grid(f) }));
                return { leave: out(got.leave), enter: out(got.enter) };
            };
        },
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
        if (i < 2) await page.keyboard.press("Escape");
        else await page.locator('[role="dialog"][data-state="open"] [data-slot="dialog-footer"] button').last().click({ timeout: 3000 }).catch(() => {});
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

const browser = ENGINE === "webkit"
    ? await webkit.launch({ headless: true })
    : await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
    for (const cellId of CELL_IDS) {
        const C = CELLS[cellId];
        for (const route of ROUTES) {
            const ctx = await browser.newContext({ viewport: C.viewport, colorScheme: C.scheme, hasTouch: C.touch, isMobile: C.touch, deviceScaleFactor: 1 });
            const errors = [];
            const row = { route, cell: cellId, engine: ENGINE, switches: [], code: null, layer: null, overlays: null };
            try {
                await ctx.addInitScript(`try { localStorage.setItem("vueuse-color-scheme", ${JSON.stringify(C.scheme)}); } catch {}`);
                await ctx.addInitScript(RECORDER);
                const page = await ctx.newPage();
                page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text().slice(0, 160)}`); });
                page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message).slice(0, 160)}`));
                await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
                await page.waitForSelector("#demo-main", { timeout: 15000 });
                await sleep(2500);
                // Dialog, Sheet and Menu open on arrival: their first screen is the
                // `-arrival` crop, and the page as a visitor who closed it sees it is
                // the `-closed` crop below, so they take no plain crop (P15 item 5).
                const arrival = { "/containers/dialog": 1, "/containers/sheet": 1, "/containers/dropdown-menu": 1 };
                if (CROPS && !arrival[route]) await page.screenshot({ path: path.join(OUT, `${slug(route)}-${cellId}.png` ) });

                // overlays: open on load, or opened by the stage's trigger
                if (route.startsWith("/containers/")) {
                    const shot = (await page.screenshot({ type: "png" })).toString("base64");
                    row.overlays = await page.evaluate(OVERLAY, { shotB64: shot });
                    if (CROPS && arrival[route]) fs.writeFileSync(path.join(OUT, `${slug(route)}-${cellId}-arrival.png`), Buffer.from(shot, "base64"));
                    if (route === "/containers/dropdown-menu") { await page.keyboard.press("Escape"); await sleep(600); }
                    await closeOverlays(page);
                    if (arrival[route]) {
                        // the scrim's exit, then the open surfaces: closeOverlays' own
                        // predicate plus any visible menu
                        await sleep(900);
                        row.closed = await page.evaluate(() => {
                            const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 8 && r.height > 8 && !e.closest("[data-story-card]"); };
                            const modal = [...document.querySelectorAll('[role="dialog"], [role="alertdialog"], [data-state="open"][aria-modal="true"]')].filter(vis).length;
                            const menus = [...document.querySelectorAll('[role="menu"]')].filter(vis).filter((e) => !e.closest(".demo-sidebar-rail") && !e.closest(".demo-bottom-dock")).length;
                            return modal + menus + (getComputedStyle(document.body).pointerEvents === "none" ? 1 : 0);
                        });
                        if (CROPS) await page.screenshot({ path: path.join(OUT, `${slug(route)}-${cellId}-closed.png`) });
                    }
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
                        await page.evaluate(() => window.__fade.arm());
                        const s = await record(page, "swap", press, 1400);
                        const fade = await page.evaluate(() => window.__fade.read());
                        if (missed) { row.switches.push({ label, option: i, pass: false, missed }); continue; }
                        const op = grade(legs(s.map((x) => x[0])), 0.05);
                        const ht = grade(legs(s.map((x) => x[1])), 2);
                        const ups = op.legs.filter((l) => l.to > l.from);
                        const enterStep = ups.length ? Math.max(...ups.map((l) => l.step)) : null;
                        row.switches.push({ label, option: i, opacity: op, height: ht, fade, enterStep, pass: op.pass && ht.pass, frames: s.length });
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
                // P17: the largest 60 Hz step of any swap leave on the route (null: none read)
                const leaves = row.switches.flatMap((s) => s.fade?.leave ?? []);
                const enters = row.switches.flatMap((s) => s.fade?.enter ?? []);
                row.leave = leaves.length ? { max: Math.max(...leaves.map((l) => l.step)), n: leaves.length, curves: [...new Set(leaves.map((l) => `${l.ms}ms ${l.curve}`))], pass: leaves.every((l) => l.step <= 0.2) } : null;
                row.enter = enters.length ? { max: Math.max(...enters.map((l) => l.step)), n: enters.length, curves: [...new Set(enters.map((l) => `${l.ms}ms ${l.curve}`))] } : null;
                // the close: the sampled enter leg's largest step, the first switch's and all
                const ent = row.switches.map((s) => s.enterStep).filter((x) => x != null);
                row.enterLeg = ent.length ? { first: ent[0], max: Math.max(...ent), n: ent.length, pass: ent.every((x) => x <= 0.2) } : null;
                row.pass = !row.run && errors.length === 0 && row.switches.every((s) => s.pass) && (row.code?.pass ?? true) && (row.layer?.pass ?? true) && !row.overflowAfterUse && (row.closed == null || row.closed === 0) && (row.leave?.pass ?? true) && (row.enterLeg?.pass ?? true);
                rowsOut.write(JSON.stringify(row) + "\n");
                const sw = row.switches.length ? `${row.switches.filter((s) => s.pass).length}/${row.switches.length} switches` : "no switch";
                const lv = (row.leave ? `; leave ${row.leave.pass ? "ok" : "FAIL"} ${row.leave.max} (${row.leave.n}, ${row.leave.curves.join(" | ")}); enter ${row.enter?.max ?? "-"}` : "")
                    + (row.enterLeg ? `; enter leg ${row.enterLeg.pass ? "ok" : "FAIL"} ${row.enterLeg.max} (first ${row.enterLeg.first}, ${row.enterLeg.n})` : "");
                console.log(`${row.pass ? "pass" : "FAIL"} ${cellId} ${route} ${sw}; code ${row.code ? (row.code.pass ? "ok" : "FAIL") : "-"}; layer ${row.layer ? (row.layer.pass ? "ok" : "FAIL") : "-"}; console ${errors.length}${row.closed != null ? `; closed ${row.closed}` : ""}${lv}${row.run ? "; run " + row.run : ""}${row.overflowAfterUse ? "; overflow" : ""}`);
                await ctx.close().catch(() => {});
            }
        }
    }
} finally {
    await browser.close().catch(() => {});
    rowsOut.end();
}
