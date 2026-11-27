// Round 3 readings: the SegmentedTabs focus ring under the strip's clip, the strip's glide
// to a selected tab, the menu shortcut and an Accordion trigger's count under the line law,
// and a long word kept whole in a Button inside the scroll Dialog.
//
// node round3.mjs <engine> <out.json> <shots-dir> <name:port[:css]>...
// A build entry may carry CSS to inject after load (a variant read on that build).
// One browser per run, one context per cell and build, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";

const TREE = new URL(`../../trees/${process.env.OVF_TREE || "v11.1.1"}/package.json`, import.meta.url).pathname;
const require = createRequire(TREE);
const pw = require("playwright");
const { PNG } = require("pngjs");

const [ENGINE, OUT, SHOTS, ...BUILD_ARGS] = process.argv.slice(2);
const BUILDS = BUILD_ARGS.map((a) => {
    const [name, port, ...css] = a.split(":");
    return { name, port: +port, css: css.join(":") };
});
mkdirSync(SHOTS, { recursive: true });
const CELLS = [
    { name: "390t", viewport: { width: 390, height: 844 }, touch: true },
    { name: "1440", viewport: { width: 1440, height: 900 }, touch: false },
];
const TOKEN = "district_enrollment_by_program_quarterly_2019-2026.csv";
const LIFT = ".segmented-tabs{overflow:visible!important}";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const r1 = (n) => Math.round(n * 10) / 10;
const rec = { engine: ENGINE, builds: BUILDS, rows: [] };

// ── the ring, read from pixels ─────────────────────────────────────────────
// The ring is what changes between the tab at rest and the tab focused. Its box is read
// against the tab's border box and the strip's padding box (where a scroller clips), and
// against the same ring with the strip's clip lifted: the pixels the lift adds are the
// pixels the clip cut.
function mask(a, b, T = 60) {
    const m = new Uint8Array(a.width * a.height);
    for (let i = 0; i < m.length; i++) {
        const d = Math.abs(a.data[4 * i] - b.data[4 * i]) + Math.abs(a.data[4 * i + 1] - b.data[4 * i + 1]) + Math.abs(a.data[4 * i + 2] - b.data[4 * i + 2]);
        m[i] = d > T ? 1 : 0;
    }
    return m;
}
function bbox(m, w, h) {
    let x0 = w, y0 = h, x1 = -1, y1 = -1, n = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (m[y * w + x]) { n++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return n ? { x0, y0, x1: x1 + 1, y1: y1 + 1, n } : null;
}

async function shot(page, clip) {
    const buf = await page.screenshot({ clip, animations: "disabled" });
    return PNG.sync.read(buf);
}

// Focus a tab from the keyboard's modality and report whether it reads `:focus-visible`.
async function focusTab(page, sel, ti) {
    await page.keyboard.press("Shift");
    let f = await page.evaluate(([sel, ti]) => {
        const t = document.querySelectorAll(sel)[0]?.querySelectorAll(".segmented-tab")[ti];
        if (!t) return { error: "no tab" };
        t.focus();
        return { fv: t.matches(":focus-visible"), how: "script after a key" };
    }, [sel, ti]);
    if (f.error || f.fv) return f;
    // Fallback: Tab from a button placed before the strip lands on its roving tab.
    f = await page.evaluate(([sel]) => {
        const s = document.querySelectorAll(sel)[0];
        const b = document.createElement("button");
        b.setAttribute("data-r3-tmp", "");
        b.textContent = "x";
        b.style.cssText = "position:fixed;left:-50px;top:0;width:10px;height:10px";
        s.parentElement.insertBefore(b, s);
        b.focus();
        return {};
    }, [sel]);
    await page.keyboard.press("Tab");
    return page.evaluate(([sel]) => {
        document.querySelector("[data-r3-tmp]")?.remove();
        const t = document.activeElement;
        const tabs = [...document.querySelectorAll(sel)[0].querySelectorAll(".segmented-tab")];
        return { fv: t.matches(":focus-visible"), how: "Tab key", tab: tabs.indexOf(t) };
    }, [sel]);
}

async function ringReading(page, sel, ti, { lift = true, file } = {}) {
    const geo = () => page.evaluate(([sel, ti]) => {
        const s = document.querySelectorAll(sel)[0];
        const t = s.querySelectorAll(".segmented-tab")[ti];
        const sr = s.getBoundingClientRect();
        const cs = getComputedStyle(s);
        const tr = t.getBoundingClientRect();
        const tcs = getComputedStyle(t);
        const pad = { l: sr.left + s.clientLeft, t: sr.top + s.clientTop };
        pad.r = pad.l + s.clientWidth;
        pad.b = pad.t + s.clientHeight;
        return {
            strip: { cls: s.className.replace(/\s+/g, " "), ox: cs.overflowX, oy: cs.overflowY, padding: cs.padding, sw: s.scrollWidth, cw: s.clientWidth, sl: s.scrollLeft },
            tab: { l: tr.left, t: tr.top, r: tr.right, b: tr.bottom, text: t.textContent.trim() },
            pad,
            outline: `${tcs.outlineStyle} ${tcs.outlineWidth} offset ${tcs.outlineOffset}`,
        };
    }, [sel, ti]);
    await page.evaluate(() => document.activeElement?.blur());
    await sleep(250);
    const g0 = await geo();
    const vw = page.viewportSize();
    const x = Math.max(0, Math.floor(g0.tab.l - 10)), y = Math.max(0, Math.floor(g0.tab.t - 10));
    const clip = { x, y, width: Math.min(vw.width - x, Math.ceil(g0.tab.r + 10) - x), height: Math.min(vw.height - y, Math.ceil(g0.tab.b + 10) - y) };
    const rest = await shot(page, clip);
    const f = await focusTab(page, sel, ti);
    await sleep(350);
    const g = await geo();
    const foc = await shot(page, clip);
    let lifted = null;
    if (lift) {
        await page.evaluate((css) => { const st = document.createElement("style"); st.id = "r3-lift"; st.textContent = css; document.head.append(st); }, LIFT);
        await sleep(150);
        lifted = await shot(page, clip);
        await page.evaluate(() => document.getElementById("r3-lift")?.remove());
    }
    if (file) await page.screenshot({ path: `${SHOTS}/${file}`, clip: { ...clip, x: Math.max(0, clip.x - 6), y: Math.max(0, clip.y - 6), width: clip.width + 12, height: clip.height + 12 }, animations: "disabled" }).catch(() => {});
    const dpr = rest.width / clip.width;
    const mf = mask(rest, foc);
    const bf = bbox(mf, rest.width, rest.height);
    const out = { focus: f, outline: g.outline, strip: g.strip, dpr: r1(dpr) };
    if (!bf) return { ...out, ring: null };
    const css = (b) => ({ l: clip.x + b.x0 / dpr, t: clip.y + b.y0 / dpr, r: clip.x + b.x1 / dpr, b: clip.y + b.y1 / dpr });
    const R = css(bf);
    out.ring = {
        // past the tab's border box (negative: inside it)
        past: { t: r1(g.tab.t - R.t), b: r1(R.b - g.tab.b), l: r1(g.tab.l - R.l), r: r1(R.r - g.tab.r) },
        // room between the ring and the strip's padding box (where the strip clips)
        room: { t: r1(R.t - g.pad.t), b: r1(g.pad.b - R.b), l: r1(R.l - g.pad.l), r: r1(g.pad.r - R.r) },
        px: bf.n,
    };
    if (lifted) {
        const ml = mask(rest, lifted);
        let cut = 0, all = 0;
        for (let i = 0; i < ml.length; i++) { if (ml[i]) all++; if (ml[i] && !mf[i]) cut++; }
        const bl = bbox(ml, rest.width, rest.height);
        const L = bl ? css(bl) : null;
        out.ring.lifted = L ? { past: { t: r1(g.tab.t - L.t), b: r1(L.b - g.tab.b), l: r1(g.tab.l - L.l), r: r1(L.r - g.tab.r) }, px: all } : null;
        // device pixels of the ring that only show with the clip lifted
        out.ring.cut = cut;
    }
    return out;
}

async function inject(page, css) {
    if (!css) return;
    await page.evaluate((css) => { const st = document.createElement("style"); st.id = "r3-variant"; st.textContent = css; document.head.append(st); }, css);
    await sleep(150);
}

const browser = await pw[ENGINE].launch({ headless: true });
rec.version = browser.version();
try {
    for (const cell of CELLS) {
        for (const build of BUILDS) {
            const context = await browser.newContext({ viewport: cell.viewport, hasTouch: cell.touch, isMobile: cell.touch && ENGINE === "chromium", deviceScaleFactor: 2, reducedMotion: "no-preference" });
            const tag = `${build.name}-${cell.name}`;
            try {
                const page = await context.newPage();
                const cdp = ENGINE === "chromium" ? await context.newCDPSession(page) : null;
                const base = `http://127.0.0.1:${build.port}`;

                // A. /navigation/tabs: the stage strip, the variant row's strip, the underline
                // strip, and a vertical underline strip (the underline strip cloned with the
                // vertical class).
                await page.goto(`${base}/navigation/tabs`, { waitUntil: "load" });
                await sleep(2000);
                await inject(page, build.css);
                await page.evaluate(() => {
                    const strips = [...document.querySelectorAll(".segmented-tabs")].filter((s) => s.getBoundingClientRect().width > 0);
                    strips.forEach((s, i) => s.setAttribute("data-r3", `s${i}`));
                    const u = strips.find((s) => s.classList.contains("segmented-tabs--underline"));
                    if (u) {
                        const c = u.cloneNode(true);
                        c.classList.add("segmented-tabs--vertical");
                        c.setAttribute("data-r3", "uv");
                        c.querySelector(".segmented-indicator").style.opacity = "0";
                        u.parentElement.append(c);
                    }
                });
                await sleep(300);
                const strips = await page.evaluate(() => [...document.querySelectorAll("[data-r3]")].map((s) => ({ id: s.getAttribute("data-r3"), cls: s.className.replace(/\s+/g, " "), n: s.querySelectorAll(".segmented-tab").length })));
                for (const s of strips) {
                    const sel = `[data-r3="${s.id}"]`;
                    for (const ti of [0, s.n - 1]) {
                        await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), sel);
                        await sleep(200);
                        const r = await ringReading(page, sel, ti, { file: ti === 0 ? `r3-${tag}-${s.id}.png` : undefined });
                        rec.rows.push({ case: "tabs-ring", build: build.name, cell: cell.name, stripId: s.id, cls: s.cls, tabIndex: ti, ...r });
                    }
                }

                // B. the fold page's eight tabs in a 267 px box: the first tab's ring at rest, the
                // last tab's ring once selected, and the strip's scroll on that selection.
                await page.goto(`${base}/ovf.html?fold`, { waitUntil: "load" });
                await sleep(2000);
                await inject(page, build.css);
                const sel8 = "[data-testid=fold-tabs8] .segmented-tabs";
                await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), sel8);
                await sleep(300);
                const r0 = await ringReading(page, sel8, 0, { file: `r3-${tag}-fold8-tab0.png` });
                rec.rows.push({ case: "fold8-ring", build: build.name, cell: cell.name, tabIndex: 0, ...r0 });
                // select the last tab by a click on it, and sample the scrolls as they go
                const glide = await page.evaluate(async (sel) => {
                    const s = document.querySelector(sel);
                    const box = s.closest("[data-testid=fold-tabs8]");
                    s.scrollLeft = 0; box.scrollLeft = 0;
                    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    const tabs = s.querySelectorAll(".segmented-tab");
                    const t0 = performance.now();
                    const samples = [];
                    tabs[tabs.length - 1].click();
                    for (const at of [0, 16, 50, 100, 150, 200, 300, 450, 700, 1000]) {
                        while (performance.now() - t0 < at) await new Promise((r) => requestAnimationFrame(r));
                        samples.push({ at, strip: Math.round(s.scrollLeft), box: Math.round(box.scrollLeft) });
                    }
                    return { behavior: getComputedStyle(s).scrollBehavior, samples };
                }, sel8);
                rec.rows.push({ case: "fold8-glide", build: build.name, cell: cell.name, ...glide });
                await sleep(300);
                const r7 = await ringReading(page, sel8, 7, { lift: false, file: `r3-${tag}-fold8-tab7.png` });
                rec.rows.push({ case: "fold8-ring", build: build.name, cell: cell.name, tabIndex: 7, ...r7 });

                // C. a Button holding the long token in the scroll Dialog (the critic's cell).
                await page.evaluate(() => { scrollTo(0, 0); document.activeElement?.blur(); });
                const opener = page.locator("[data-testid=fold-open-dialog-scroll]");
                await opener.scrollIntoViewIfNeeded();
                if (cell.touch && ENGINE === "chromium") await opener.tap(); else await opener.click();
                await sleep(1500);
                const d1 = await page.evaluate((TOKEN) => {
                    const dlg = document.querySelector("[data-testid=v4-dialog]");
                    if (!dlg) return { error: "no dialog" };
                    const b = document.querySelector("[data-testid=fold-open-dialog-scroll]").cloneNode(true);
                    b.removeAttribute("data-testid");
                    b.setAttribute("data-r3", "token-button");
                    b.textContent = TOKEN;
                    dlg.insertBefore(b, dlg.children[2] || null);
                    return null;
                }, TOKEN);
                await sleep(500);
                const d2 = d1 ?? (await page.evaluate(() => {
                    const dlg = document.querySelector("[data-testid=v4-dialog]");
                    const b = document.querySelector("[data-r3=token-button]");
                    const cs = getComputedStyle(dlg);
                    const dr = dlg.getBoundingClientRect();
                    const g = document.createRange();
                    g.selectNodeContents(b);
                    const tr = [...g.getClientRects()].reduce((m, q) => Math.max(m, q.right), 0);
                    const padRight = dr.left + dlg.clientLeft + dlg.clientWidth;
                    return { ox: cs.overflowX, oy: cs.overflowY, sw: dlg.scrollWidth, cw: dlg.clientWidth, labelPastBy: Math.round((tr - padRight) * 10) / 10 };
                }));
                let reach = null;
                if (!d2.error && cdp && cell.touch) {
                    // the swipe starts on the token Button, inside the plate
                    const p = await page.evaluate(() => { const r = document.querySelector("[data-r3=token-button]").getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
                    const t = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
                    await t("touchStart", p.x + 100, p.y);
                    for (let i = 1; i <= 12; i++) { await t("touchMove", p.x + 100 - (200 * i) / 12, p.y); await sleep(16); }
                    await t("touchEnd");
                    await sleep(600);
                    reach = { gesture: "200 px swipe", scrollLeft: await page.evaluate(() => document.querySelector("[data-testid=v4-dialog]").scrollLeft) };
                } else if (!d2.error && !cell.touch) {
                    const r = await page.evaluate(() => { const q = document.querySelector("[data-r3=token-button]").getBoundingClientRect(); return { x: q.left + 20, y: q.top + q.height / 2 }; });
                    await page.mouse.move(r.x, r.y);
                    await page.mouse.wheel(150, 0);
                    await sleep(600);
                    reach = { gesture: "150 px wheel", scrollLeft: await page.evaluate(() => document.querySelector("[data-testid=v4-dialog]").scrollLeft) };
                }
                rec.rows.push({ case: "dialog-token-button", build: build.name, cell: cell.name, ...d2, reach });
                await page.keyboard.press("Escape");
                await sleep(600);

                // D. the stress page: the menu row's shortcut, and an Accordion trigger with a
                // count and a Badge beside its label (in the 200 px column).
                await page.goto(`${base}/ovf.html`, { waitUntil: "load" });
                await sleep(1500);
                await inject(page, build.css);
                const acc = await page.evaluate(() => {
                    const trig = document.querySelector("[data-slot=accordion-trigger]");
                    if (!trig) return { error: "no trigger" };
                    const icon = trig.querySelector(".disclosure-icon");
                    const count = document.createElement("span");
                    count.textContent = "1,204";
                    count.setAttribute("data-r3", "count");
                    const badge = document.createElement("span");
                    badge.className = "badge-atom inline-flex items-center justify-center gap-1.5 rounded-badge font-semibold whitespace-nowrap";
                    badge.textContent = "12 new";
                    badge.setAttribute("data-r3", "badge");
                    trig.insertBefore(count, icon);
                    trig.insertBefore(badge, icon);
                    return null;
                });
                await sleep(300);
                const lines = (sel) => page.evaluate((sel) => {
                    const s = document.querySelector(sel);
                    if (!s) return null;
                    const r = s.getBoundingClientRect();
                    const g = document.createRange();
                    g.selectNodeContents(s);
                    const n = new Set([...g.getClientRects()].filter((q) => q.width > 0).map((q) => Math.round(q.top))).size;
                    return { text: s.textContent.trim(), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, lines: n, wrap: getComputedStyle(s).overflowWrap, ws: getComputedStyle(s).whiteSpace };
                }, sel);
                rec.rows.push({ case: "accordion-count", build: build.name, cell: cell.name, error: acc?.error, count: await lines("[data-r3=count]"), badge: await lines("[data-r3=badge]"), trigger: await page.evaluate(() => { const t = document.querySelector("[data-slot=accordion-trigger]"); return { w: Math.round(t.getBoundingClientRect().width), sw: t.scrollWidth, cw: t.clientWidth }; }) });
                const m = page.locator("[data-testid=ovf-open-menu]");
                await m.scrollIntoViewIfNeeded();
                if (cell.touch && ENGINE === "chromium") await m.tap(); else await m.click();
                await sleep(1200);
                const sc = await lines(".menu__shortcut");
                const row = await page.evaluate(() => { const s = document.querySelector(".menu__shortcut"); const row = s?.closest(".glass-menu-row"); const p = row?.closest(".glass-overlay-plate"); return row ? { rowW: Math.round(row.getBoundingClientRect().width), rowH: Math.round(row.getBoundingClientRect().height), plateW: p ? Math.round(p.getBoundingClientRect().width) : null, rowSw: row.scrollWidth, rowCw: row.clientWidth } : null; });
                const rr = await page.evaluate(() => { const r = document.querySelector(".menu__shortcut")?.closest(".glass-menu-row")?.getBoundingClientRect(); return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null; });
                if (rr) await page.screenshot({ path: `${SHOTS}/r3-${tag}-menu-row.png`, clip: { x: Math.max(0, rr.x - 6), y: Math.max(0, rr.y - 6), width: rr.width + 12, height: rr.height + 12 } }).catch(() => {});
                rec.rows.push({ case: "menu-shortcut", build: build.name, cell: cell.name, shortcut: sc, row });
                await page.keyboard.press("Escape");
                await cdp?.detach().catch(() => {});
                await page.close();
            } catch (e) {
                rec.rows.push({ error: String(e).slice(0, 300), build: build.name, cell: cell.name });
            } finally {
                await context.close().catch(() => {});
            }
        }
    }
} finally {
    await browser.close();
}
writeFileSync(OUT, JSON.stringify(rec, null, 1));
for (const r of rec.rows) console.log(JSON.stringify(r));
