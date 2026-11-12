// PASS-2 CHALLENGE-3 probe. Real clock, real pointer. One browser per run, a new context per cell, closed in finally.
// parts: overlay (a portalled menu / tooltip opened from the dock, the pointer resting on it), touch (taps), forced (forced-colors edge)
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import os from "node:os";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const playwright = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");
const args = Object.fromEntries(process.argv.slice(2).reduce((a, k, i, arr) => (k.startsWith("--") ? [...a, [k.slice(2), arr[i + 1]]] : a), []));
const engine = args.engine ?? "chromium";
const site = path.resolve(args.site);
const out = path.resolve(args.out);
const tag = args.tag ?? "c3";
const parts = (args.parts ?? "overlay,touch,forced").split(",");
const WS = (args.ws ?? "1440,390").split(",").map(Number);
fs.mkdirSync(path.join(out, "png"), { recursive: true });
fs.mkdirSync(path.join(out, "data"), { recursive: true });
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    let p = path.join(site, decodeURIComponent(u.pathname));
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html");
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
    fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const rec = { engine, tag, started: new Date().toISOString(), load: os.loadavg()[0], cells: {} };
const log = (...a) => console.log(`[${engine}/${tag}]`, ...a);
const Lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

async function open(browser, o = {}) {
    const ctxOpts = { viewport: { width: o.w ?? 1440, height: o.h ?? 560 }, deviceScaleFactor: o.dsf ?? 2, colorScheme: o.theme ?? "light" };
    if (o.touch) { ctxOpts.hasTouch = true; if (engine === "chromium") ctxOpts.isMobile = true; }
    if (o.forced) ctxOpts.forcedColors = "active";
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
    const q = new URLSearchParams({ mode: o.mode ?? "design", fused: "1", shape: "onedock", bind: "1", ...(o.q ?? {}), ...(o.theme === "dark" ? { dark: "1" } : {}) });
    await page.goto(`${base}/?${q}`);
    await page.waitForFunction(() => window.__ab?.ready, null, { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    return { ctx, page, errs };
}
const COMPS = [["after", {}], ["after-sitedock", { sitedock: "1" }], ["before", { nocluster: "1" }]];
const center = (page, sel) => page.evaluate((sel) => { const e = typeof sel === "string" ? document.querySelector(sel) : null; if (!e) return null; const r = e.getBoundingClientRect(); return r.width ? [r.left + r.width / 2, r.top + r.height / 2] : null; }, sel);
const btnCenter = (page, label) => page.evaluate((label) => { const b = [...document.querySelectorAll("[data-testid=cluster] button")].find((x) => x.getAttribute("aria-label") === label); if (!b) return null; const r = b.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, label);
const dockCenter = (page) => page.evaluate(() => { const r = document.querySelector("[data-testid=cluster] > .glass-dock").getBoundingClientRect(); return [(r.left + r.right) / 2, (r.top + r.bottom) / 2]; });

// O · a dock-owned portalled overlay (glass's own DropdownMenu through DockTrigger, or daraksha's seat Tooltip), the pointer resting on it
async function partOverlay(browser) {
    const res = {};
    for (const w of WS) for (const [lab, extra] of COMPS) for (const kind of (args.kinds ?? "menu,tip").split(",")) {
        const { ctx, page, errs } = await open(browser, { w, q: { ...extra, [kind]: "1" } });
        try {
            const sel = kind === "menu" ? "[data-testid=menu]" : "[data-testid=tip]";
            const st = (pt) => page.evaluate(([sel, pt]) => {
                const o = document.querySelector(sel);
                const r = o?.getBoundingClientRect();
                const hit = pt ? document.elementFromPoint(pt[0], pt[1]) : null;
                return { expanded: window.__ab.expanded(), fused: window.__ab.fused(), overlay: !!(r && r.width && getComputedStyle(o).visibility !== "hidden"), state: o?.getAttribute("data-state") ?? null, hit: !hit ? null : hit.closest("[role=menuitem]") ? `item:${hit.closest("[role=menuitem]").textContent.trim()}` : hit.closest(sel) ? "overlay" : (hit.closest(".glass-dock")?.getAttribute("aria-label") ?? hit.tagName) };
            }, [sel, pt]);
            const d0 = await dockCenter(page);
            await page.mouse.move(d0[0], d0[1], { steps: 6 });
            await page.waitForTimeout(1300);
            const reach = await st();
            const label = kind === "menu" ? "More" : "Colour";
            const b = await btnCenter(page, label);
            await page.mouse.move(b[0], b[1], { steps: 8 });
            await page.waitForTimeout(400);
            if (kind === "menu") await page.mouse.click(b[0], b[1]);
            await page.waitForTimeout(kind === "menu" ? 500 : 900);
            let opened = await st();
            // WebKit: a synthesized click does not open reka's menu trigger; the reader's other path is the key
            if (kind === "menu" && !opened.overlay) { await page.evaluate(() => [...document.querySelectorAll("[data-testid=cluster] button")].find((x) => x.getAttribute("aria-label") === "More")?.focus()); await page.keyboard.press("Enter"); await page.waitForTimeout(500); opened = { ...(await st()), openedBy: "Enter" }; }
            // onto the overlay: the first menu item, or the tooltip's own box
            const target = kind === "menu" ? await page.evaluate(() => { const i = document.querySelector("[data-testid=menu] [role=menuitem]"); if (!i) return null; const r = i.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }) : await center(page, sel);
            if (!target) { res[`${lab}-${kind}-${w}`] = { reach, opened, error: "no overlay", errs: errs.slice(0, 4) }; log("overlay", lab, kind, w, "NO OVERLAY", JSON.stringify(opened)); continue; }
            await page.mouse.move(target[0], target[1], { steps: 10 });
            const samples = [];
            for (let i = 0; i < 16; i++) { await page.waitForTimeout(500); const s = await st(target); samples.push([500 * (i + 1), s.expanded, s.overlay, s.hit]); }
            const collapsedAt = samples.find((s) => !s[1])?.[0] ?? null;
            const closedAt = samples.find((s) => !s[2])?.[0] ?? null;
            const key = `${lab}-${kind}-${w}`;
            res[key] = { reach, opened, target, samples, collapsedAtMs: collapsedAt, overlayClosedAtMs: closedAt, errs: errs.slice(0, 4) };
            log("overlay", key, "reach expanded", reach.expanded, "| opened", opened.overlay, opened.state, "| dock collapsed at", collapsedAt, "| overlay closed at", closedAt, "|", JSON.stringify(samples.filter((_, i) => i % 2 === 1)));
            if (collapsedAt) { const pngp = path.join(out, "png", `${engine}-${tag}-overlay-${key}-t${collapsedAt + 500}.png`); await page.waitForTimeout(500); await page.screenshot({ path: pngp }); }
        } finally { await ctx.close(); }
    }
    rec.cells.overlay = res;
}

// K · the keyboard reader: the dock opened, focus on "More", Enter opens the menu (focus moves into it), the pointer parked off the cluster
async function partKbMenu(browser) {
    const res = {};
    for (const w of WS) for (const [lab, extra] of COMPS) {
        const { ctx, page, errs } = await open(browser, { w, q: { ...extra, menu: "1" } });
        try {
            await page.mouse.move(Math.round(w / 2), 30);
            const st = () => page.evaluate(() => { const a = document.activeElement; const o = document.querySelector("[data-testid=menu]"); return { expanded: window.__ab.expanded(), fused: window.__ab.fused(), menu: !!o, active: a && a !== document.body ? (a.getAttribute("aria-label") ?? a.textContent?.trim().slice(0, 12) ?? a.tagName) : "body", inMenu: !!a?.closest?.("[data-testid=menu]") }; });
            await page.focus("#sentinel-before");
            await page.keyboard.press("Tab");
            await page.waitForTimeout(900);
            const tabbed = await st();
            const ok = await page.evaluate(() => { const b = [...document.querySelectorAll("[data-testid=cluster] button")].find((x) => x.getAttribute("aria-label") === "More"); b?.focus(); return document.activeElement === b; });
            await page.waitForTimeout(300);
            await page.keyboard.press("Enter");
            await page.waitForTimeout(500);
            const opened = await st();
            const samples = [];
            for (let i = 0; i < 16; i++) { await page.waitForTimeout(500); const s = await st(); samples.push([500 * (i + 1), s.expanded, s.menu, s.active]); if (i === 3) await page.keyboard.press("ArrowDown"); }
            const collapsedAt = samples.find((s) => !s[1])?.[0] ?? null;
            const closedAt = samples.find((s) => !s[2])?.[0] ?? null;
            const key = `${lab}-kbmenu-${w}`;
            res[key] = { tabbed, focusedMore: ok, opened, samples, collapsedAtMs: collapsedAt, menuClosedAtMs: closedAt, errs: errs.slice(0, 4) };
            log("kbmenu", key, "tab", JSON.stringify(tabbed), "| More focused", ok, "| opened", JSON.stringify(opened), "| collapsed at", collapsedAt, "| menu closed at", closedAt, "|", JSON.stringify(samples.filter((_, i) => i % 2 === 1)));
        } finally { await ctx.close(); }
    }
    rec.cells.kbmenu = res;
}

// T · touch: tap the collapsed dock, then tap the bare page; and tap the dock, tap the theme, tap the bare page
async function partTouch(browser) {
    const res = {};
    for (const w of WS) for (const [lab, extra] of COMPS) for (const seq of ["dock-away", "dock-theme-away"]) {
        const { ctx, page, errs } = await open(browser, { w, touch: true, q: extra });
        try {
            const st = () => page.evaluate(() => { const a = document.activeElement; return { expanded: window.__ab.expanded(), fused: window.__ab.fused(), active: a && a !== document.body ? (a.getAttribute("aria-label") ?? a.tagName) : "body", dark: document.documentElement.classList.contains("dark") }; });
            const d0 = await dockCenter(page);
            await page.touchscreen.tap(d0[0], d0[1]);
            await page.waitForTimeout(1200);
            const afterDock = await st();
            let afterTheme = null, themeAt = null;
            if (seq === "dock-theme-away") {
                const lab2 = await page.evaluate(() => [...document.querySelectorAll("[data-testid=cluster] button")].map((b) => b.getAttribute("aria-label")).find((l) => /theme/i.test(l ?? "")));
                themeAt = await btnCenter(page, lab2);
                if (themeAt) { await page.touchscreen.tap(themeAt[0], themeAt[1]); await page.waitForTimeout(600); afterTheme = await st(); }
            }
            await page.touchscreen.tap(Math.round(w / 2), 30);
            const samples = [];
            for (let i = 0; i < 14; i++) { await page.waitForTimeout(500); const s = await st(); samples.push([500 * (i + 1), s.expanded, s.active]); }
            const collapsedAt = samples.find((s) => !s[1])?.[0] ?? null;
            const key = `${lab}-${seq}-${w}`;
            res[key] = { afterDock, afterTheme, samples, collapsedAtMs: collapsedAt, errs: errs.slice(0, 4) };
            log("touch", key, "after dock tap", JSON.stringify(afterDock), "| after theme tap", JSON.stringify(afterTheme), "| collapsed at", collapsedAt, "ms after the tap away |", JSON.stringify(samples.filter((_, i) => i % 2 === 1)));
        } finally { await ctx.close(); }
    }
    rec.cells.touch = res;
}

// F · forced colors (Chromium): is there any edge at the dock's top and the theme's side, collapsed and expanded
async function partForced(browser) {
    const res = {};
    if (engine !== "chromium") { rec.cells.forced = "skipped: forced-colors emulation is Chromium's"; return; }
    for (const w of WS) for (const [lab, extra] of COMPS) for (const theme of ["light", "dark"]) for (const state of ["collapsed", "expanded"]) {
        const { ctx, page, errs } = await open(browser, { w, forced: true, theme, mode: "flat", q: extra });
        try {
            if (state === "expanded") { await page.evaluate(() => window.__ab.expand()); await page.waitForTimeout(900); }
            const g = await page.evaluate(() => { const ds = [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")]; return ds.map((d) => { const r = d.getBoundingClientRect(); const p = d.querySelector(":scope > .dock-plate"); const cs = p ? getComputedStyle(p) : null; return { l: r.left, r: r.right, t: r.top, b: r.bottom, label: d.getAttribute("aria-label"), plateBorder: cs ? `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}` : null, ring: p ? getComputedStyle(p, "::before").backgroundColor : null, vis: cs?.visibility }; }); });
            const buf = await page.screenshot();
            const png = PNG.sync.read(buf);
            const dsf = png.width / w;
            // a vertical scan through each member's centre, from 20 px above it to 12 px inside it: the largest step against the field
            const cols = g.map((m) => {
                const x = Math.round(((m.l + m.r) / 2) * dsf);
                const field = Lum(png.data, (Math.round((m.t - 20) * dsf) * png.width + x) * 4);
                let maxDev = 0, at = null;
                for (let y = Math.round((m.t - 6) * dsf); y <= Math.round((m.t + 6) * dsf); y++) { const v = Math.abs(Lum(png.data, (y * png.width + x) * 4) - field); if (v > maxDev) { maxDev = v; at = y / dsf - m.t; } }
                return { label: m.label, field: +field.toFixed(1), edgeMaxDev: +maxDev.toFixed(1), atPx: at === null ? null : +at.toFixed(2) };
            });
            const key = `${lab}-${theme}-${state}-${w}`;
            res[key] = { members: g, cols, errs: errs.slice(0, 3) };
            log("forced", key, JSON.stringify(cols), "| plate", JSON.stringify(g.map((m) => [m.label, m.plateBorder, m.ring, m.vis])));
            if (w === 1440) {
                const all = g; const x0 = Math.max(0, Math.floor(Math.min(...all.map((p) => p.l)) - 24)), x1 = Math.min(w, Math.ceil(Math.max(...all.map((p) => p.r)) + 24));
                const y0 = Math.max(0, Math.floor(Math.min(...all.map((p) => p.t)) - 24)), y1 = Math.ceil(Math.max(...all.map((p) => p.b)) + 24);
                await page.screenshot({ path: path.join(out, "png", `${engine}-${tag}-forced-${key}.png`), clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
            }
        } finally { await ctx.close(); }
    }
    rec.cells.forced = res;
}

const browser = await (engine === "webkit" ? playwright.webkit : playwright.chromium).launch({ headless: true });
try {
    rec.version = browser.version();
    for (const p of parts) {
        try {
            if (p === "overlay") await partOverlay(browser);
            if (p === "touch") await partTouch(browser);
            if (p === "forced") await partForced(browser);
            if (p === "kbmenu") await partKbMenu(browser);
        } catch (e) { rec.cells[`${p}-error`] = String(e?.stack ?? e).slice(0, 800); log("PART ERROR", p, String(e).slice(0, 300)); }
    }
} finally {
    await browser.close();
    server.close();
    rec.ended = new Date().toISOString();
    fs.writeFileSync(path.join(out, "data", `${engine}-${tag}.json`), JSON.stringify(rec, null, 1));
    log("wrote", path.join(out, "data", `${engine}-${tag}.json`));
}
