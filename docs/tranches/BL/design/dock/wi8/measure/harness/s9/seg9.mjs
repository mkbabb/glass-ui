// seg9.mjs <port> <tag> [--engine chromium|webkit]: S4's seat cells (RU-95 as amended for R8-1 and C8-13; RU-94 as
// amended for R8-9; RU-96 as amended for R8-8). One browser, a context per cell, closed in finally.
//   - w-segpair (a ControlsDock with a two-segment SegmentedTabs in #persistent and two run seats), light and dark,
//     1440 fine, folded and open: each segment's block size against the seat's (`--dock-control-size` probed in the dock,
//     and the Grid seat's box when open), within 0.5 px; the track's and the indicator's computed background,
//     box-shadow and backdrop-filter (none inside a dock); the selected mark against the plate from a twin shot with the
//     segments' words hidden (the indicator's modal colour against the unselected segment's, the plate under it), at
//     1.2; open, the unselected segment hovered, its modal colour against a 2 px ring 1 px outside it, at 1.1;
//   - an active icon seat's computed box-shadow inside a live dock (dock-comp canvas-tools, its pressed Grid), one
//     layer at most;
//   - the catch-light: on dock-comp nav, open, a hovered seat's and a pressed seat's `::before` (content and
//     background-image), painting nothing;
//   - the theme toggle on dock-comp nav: its computed opacity (1) and size against the seat.
// Log: logs/s9-seg-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, tag, rows: [] };
const MODAL = async ({ shot, boxes }) => {
    const bmp = await createImageBitmap(new Blob([Uint8Array.from(atob(shot), (c) => c.charCodeAt(0))], { type: "image/png" }));
    const c = new OffscreenCanvas(bmp.width, bmp.height).getContext("2d", { willReadFrequently: true }); c.drawImage(bmp, 0, 0);
    const img = c.getImageData(0, 0, bmp.width, bmp.height);
    const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); const L = (q) => 0.2126 * lin(q[0]) + 0.7152 * lin(q[1]) + 0.0722 * lin(q[2]);
    const modal = (r, ring) => { const bins = new Map(); const x0 = Math.floor(r.left) - (ring ? 3 : -3), x1 = Math.ceil(r.right) + (ring ? 3 : -3), y0 = Math.floor(r.top) - (ring ? 3 : -3), y1 = Math.ceil(r.bottom) + (ring ? 3 : -3);
        for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { if (ring) { const inn = x >= Math.floor(r.left) - 1 && x < Math.ceil(r.right) + 1 && y >= Math.floor(r.top) - 1 && y < Math.ceil(r.bottom) + 1; if (inn) continue; } if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue; const i = (y * img.width + x) * 4; const k = (img.data[i] >> 2) + "," + (img.data[i + 1] >> 2) + "," + (img.data[i + 2] >> 2); const b = bins.get(k) ?? { n: 0, s: [0, 0, 0] }; b.n++; b.s[0] += img.data[i]; b.s[1] += img.data[i + 1]; b.s[2] += img.data[i + 2]; bins.set(k, b); }
        let best = null; for (const b of bins.values()) if (!best || b.n > best.n) best = b; return best ? best.s.map((v) => Math.round(v / best.n)) : null; };
    const cr = (p, q) => { const x = L(p), y = L(q); return +((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(3); };
    const res = {}; for (const [k, b] of Object.entries(boxes)) res[k] = b ? modal(b.r, b.ring) : null;
    const pairs = {}; if (res.mark && res.under) pairs.markVsPlate = cr(res.mark, res.under); if (res.hovered && res.hoverRing) pairs.hoverVsDock = cr(res.hovered, res.hoverRing);
    return { colours: res, ...pairs };
};
const SEGREAD = () => {
    const d = document.querySelector("[data-testid=w-segpair]");
    const strip = d.querySelector(".segmented-tabs"); const ind = d.querySelector(".segmented-indicator");
    const tabs = [...d.querySelectorAll(".segmented-tab")];
    const probe = document.createElement("span"); probe.style.cssText = "position:absolute;block-size:var(--dock-control-size);inline-size:1px;visibility:hidden"; strip.parentElement.appendChild(probe); const seatSize = probe.getBoundingClientRect().height; probe.remove();
    const grid = d.querySelector("[data-testid=w-segpair-grid]"); const gr = grid?.getBoundingClientRect();
    const cs = (el) => { const s = getComputedStyle(el); return { bg: s.backgroundColor, bgImage: s.backgroundImage, shadow: s.boxShadow, filter: s.backdropFilter ?? s.webkitBackdropFilter, wfilter: s.webkitBackdropFilter ?? null }; };
    const box = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, w: +r.width.toFixed(2), h: +r.height.toFixed(2) }; };
    const sel = tabs.find((t) => t.hasAttribute("data-active")); const other = tabs.find((t) => !t.hasAttribute("data-active"));
    return {
        posture: d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest",
        seatSize: +seatSize.toFixed(2), gridSeat: gr && gr.height > 0 ? [+gr.width.toFixed(2), +gr.height.toFixed(2)] : null,
        segments: tabs.map((t) => ({ label: t.textContent.trim(), h: +t.getBoundingClientRect().height.toFixed(2), active: t.hasAttribute("data-active") })),
        strip: { ...box(strip), ...cs(strip) }, indicator: { ...box(ind), ...cs(ind) },
        selBox: sel ? box(sel) : null, otherBox: other ? box(other) : null, plate: box(d.querySelector(".dock-plate") ?? d),
    };
};
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-segpair&ground=flat${scheme === "dark" ? "&scheme=dark" : ""}`);
            await page.waitForSelector("[data-testid=w-segpair] .segmented-tab", { timeout: 60000 });
            await page.mouse.move(2, 2); await sleep(1800);
            for (const want of ["folded", "open"]) {
                if (want === "open") {
                    const f = await page.evaluate(() => { const d = document.querySelector("[data-testid=w-segpair]"); const r = (d.querySelector(".dock-layer--summary") ?? d.querySelector(".dock-plate") ?? d).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
                    await page.mouse.move(f[0], f[1]); await sleep(1500);
                    const posture = await page.evaluate(() => document.querySelector("[data-testid=w-segpair]").classList.contains("expanded"));
                    if (!posture) { await page.mouse.click(f[0], f[1]); await sleep(1500); }
                }
                const r = await page.evaluate(SEGREAD);
                await page.addStyleTag({ content: "[data-testid=w-segpair] .segmented-tab { color: transparent !important; } [data-testid=w-segpair] .segmented-tab * { visibility: hidden !important; }" }).then((h) => h.evaluate((n) => n.setAttribute("data-s9", "")));
                await sleep(200);
                const shot = (await page.screenshot({ type: "png" })).toString("base64");
                const ink = await page.evaluate(MODAL, { shot, boxes: { mark: { r: r.indicator, ring: false }, under: r.otherBox ? { r: r.otherBox, ring: false } : null } });
                let hover = null;
                if (want === "open" && r.otherBox) {
                    await page.mouse.move((r.otherBox.left + r.otherBox.right) / 2, (r.otherBox.top + r.otherBox.bottom) / 2); await sleep(600);
                    const ob = await page.evaluate(() => { const t = [...document.querySelectorAll("[data-testid=w-segpair] .segmented-tab")].find((x) => !x.hasAttribute("data-active")); const b = t.getBoundingClientRect(); return { left: b.left, top: b.top, right: b.right, bottom: b.bottom, bg: getComputedStyle(t).backgroundColor }; });
                    const hs = (await page.screenshot({ type: "png" })).toString("base64");
                    hover = { computed: ob.bg, ...(await page.evaluate(MODAL, { shot: hs, boxes: { hovered: { r: ob, ring: false }, hoverRing: { r: ob, ring: true } } })) };
                }
                await page.evaluate(() => document.querySelectorAll("style[data-s9]").forEach((n) => n.remove()));
                const segOk = r.segments.every((s) => Math.abs(s.h - r.seatSize) <= 0.5) && (!r.gridSeat || r.segments.every((s) => Math.abs(s.h - r.gridSeat[1]) <= 0.5));
                const flat = ["strip", "indicator"].every((k) => r[k].shadow === "none" && (r[k].filter === "none" || r[k].filter == null)) && /rgba\(0, 0, 0, 0\)|transparent/.test(r.strip.bg) && r.strip.bgImage === "none";
                const row = { cell: "w-segpair", scheme, want, ...r, ink, hover, segOk, flat, markOk: (ink.markVsPlate ?? 0) >= 1.2, hoverOk: hover ? (hover.hoverVsDock ?? 0) >= 1.1 : null };
                out.rows.push(row);
                console.log("w-segpair", scheme, want, r.posture, "seat", r.seatSize, "grid", JSON.stringify(r.gridSeat), "segs", JSON.stringify(r.segments.map((s) => s.h)), "strip", r.strip.bg, r.strip.shadow.slice(0, 40), r.strip.filter, "ind", r.indicator.shadow.slice(0, 40), r.indicator.filter, "mark", ink.markVsPlate, "hover", hover?.hoverVsDock, "segOk", segOk, "flat", flat);
            }
        } catch (e) { out.rows.push({ cell: "w-segpair", scheme, error: String(e).slice(0, 300) }); console.log("w-segpair", scheme, "ERROR", String(e).slice(0, 200)); } finally { await ctx.close(); }
    }
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=canvas-tools&ground=flat${scheme === "dark" ? "&scheme=dark" : ""}`);
            await page.waitForSelector("[data-story-stage] .glass-dock", { timeout: 60000 });
            await sleep(1200);
            const r = await page.evaluate(() => [...document.querySelectorAll("[data-story-stage] .glass-dock .dock-icon-button:is([aria-pressed='true'], [data-active])")].map((s) => { const cs = getComputedStyle(s); return { label: s.getAttribute("aria-label"), shadow: cs.boxShadow, layers: cs.boxShadow === "none" ? 0 : cs.boxShadow.split(/,(?![^(]*\))/).length, filter: cs.backdropFilter ?? cs.webkitBackdropFilter }; }));
            out.rows.push({ cell: "active-seat-shadow", scheme, seats: r, ok: r.length > 0 && r.every((x) => x.layers <= 1) });
            console.log("active seat", scheme, JSON.stringify(r));
        } catch (e) { out.rows.push({ cell: "active-seat-shadow", scheme, error: String(e).slice(0, 300) }); } finally { await ctx.close(); }
    }
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=nav&ground=flat${scheme === "dark" ? "&scheme=dark" : ""}`);
            await page.waitForSelector("[data-story-stage] .glass-dock", { timeout: 60000 });
            await sleep(1200);
            const seats = await page.evaluate(() => [...document.querySelectorAll("[data-story-stage] .glass-dock :is(.dock-icon-button, .dock-tab-button)")].filter((s) => s.getBoundingClientRect().width > 0 && !s.matches("[aria-current='page'], [aria-pressed='true'], [data-active]")).slice(0, 2).map((s) => { const b = s.getBoundingClientRect(); return { label: s.getAttribute("aria-label") ?? s.textContent.trim(), x: b.left + b.width / 2, y: b.top + b.height / 2 }; }));
            const pseudo = (label) => page.evaluate((label) => { const s = [...document.querySelectorAll("[data-story-stage] .glass-dock :is(.dock-icon-button, .dock-tab-button)")].find((x) => (x.getAttribute("aria-label") ?? x.textContent.trim()) === label); const p = getComputedStyle(s, "::before"); return { content: p.content, bgImage: p.backgroundImage, opacity: p.opacity, display: p.display, hostBg: getComputedStyle(s).backgroundColor }; }, label);
            const res = {};
            if (seats[0]) { await page.mouse.move(seats[0].x, seats[0].y); await sleep(500); res.hovered = { label: seats[0].label, ...(await pseudo(seats[0].label)) }; }
            if (seats[1]) { await page.mouse.move(seats[1].x, seats[1].y); await sleep(300); await page.mouse.down(); await sleep(250); res.pressed = { label: seats[1].label, ...(await pseudo(seats[1].label)) }; await page.mouse.up(); await page.keyboard.press("Escape").catch(() => {}); }
            const paintsNothing = (p) => !p || p.content === "none" || p.content === "normal" || (p.bgImage === "none");
            const toggle = await page.evaluate(() => { const t = document.querySelector("[data-story-stage] .glass-dock .dark-mode-toggle-button"); if (!t) return null; let op = 1; for (let e = t; e && e !== document.body; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity); const b = t.getBoundingClientRect(); return { opacity: getComputedStyle(t).opacity, chain: +op.toFixed(3), box: [+b.width.toFixed(2), +b.height.toFixed(2)] }; });
            out.rows.push({ cell: "catch-light", scheme, ...res, ok: paintsNothing(res.hovered) && paintsNothing(res.pressed) });
            out.rows.push({ cell: "toggle", scheme, toggle, ok: toggle ? +toggle.opacity === 1 : null });
            console.log("catch-light", scheme, JSON.stringify(res), "toggle", JSON.stringify(toggle));
        } catch (e) { out.rows.push({ cell: "catch-light", scheme, error: String(e).slice(0, 300) }); } finally { await ctx.close(); }
    }
} finally {
    await browser?.close();
}
out.summary = { fail: out.rows.filter((r) => r.error || r.ok === false || r.segOk === false || r.flat === false || r.markOk === false || r.hoverOk === false).map((r) => `${r.cell} ${r.scheme} ${r.want ?? ""}`.trim()) };
console.log("summary", JSON.stringify(out.summary));
writeFileSync(new URL(`../../logs/s9-seg-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
