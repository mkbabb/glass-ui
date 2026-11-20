// Targeted checks + evidence crops (read-only) against https://glass.babb.dev.
// Machine law: run through `~/.claude/guard/guarded` (browser run, never --light).
// Chromium headless shell; `--use-angle=metal --enable-gpu --ignore-gpu-blocklist` is
// the brief's one named exception (GPU canvases). One browser per run, a new context
// per check, everything closed in `finally`. No getContext on page canvases.
//
// usage: node targeted.mjs <out.json> <shotsDir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [outFile, shots] = process.argv.slice(2);
const BASE = "https://glass.babb.dev";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = {};
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
async function withPage(opts, fn) {
    const { scheme = "dark", width = 1440, height = 900, touch = false } = opts;
    const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: scheme, deviceScaleFactor: 1, hasTouch: touch, isMobile: touch });
    try {
        await ctx.addInitScript(`try{localStorage.setItem("vueuse-color-scheme",${JSON.stringify(scheme)})}catch{}`);
        const page = await ctx.newPage();
        return await fn(page);
    } catch (e) {
        return { fail: String(e && e.message || e).slice(0, 300) };
    } finally {
        await ctx.close().catch(() => {});
    }
}
const crop = async (page, name, clip) => {
    const vp = page.viewportSize();
    const c = { x: Math.max(0, Math.round(clip.x)), y: Math.max(0, Math.round(clip.y)) };
    c.width = Math.min(vp.width - c.x, Math.round(clip.width)); c.height = Math.min(vp.height - c.y, Math.round(clip.height));
    if (c.width < 4 || c.height < 4) return null;
    const p = path.join(shots, name + ".png");
    await page.screenshot({ path: p, clip: c });
    return path.basename(p);
};
const go = async (page, route) => { await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 }); await page.waitForSelector("#demo-main", { timeout: 15000 }).catch(() => {}); await sleep(2500); };
const shellDocks = (page) => page.evaluate(() => [...document.querySelectorAll(".demo-sidebar-dock, .demo-bottom-dock__shell")].map((d) => {
    const r = d.getBoundingClientRect(); const cs = getComputedStyle(d);
    return { testid: d.dataset.testid, cls: d.className, rect: [r.left, r.top, r.width, r.height].map(Math.round), transform: cs.transform, display: cs.display, visible: d.checkVisibility(), morphing: d.hasAttribute("data-morphing") };
}));
try {
    // (6) the shell docks: rest, hover, press, idle, route change, 390
    R.shellDocks = await withPage({}, async (page) => {
        const o = {};
        await go(page, "/display/buttons");
        o.rest = await shellDocks(page);
        o.restShot = await crop(page, "f1-shell-docks-rest-1440-dark", { x: 0, y: 0, width: 140, height: 900 });
        const side = o.rest.find((d) => d.testid === "sidebar-dock-collapsible");
        if (side) { await page.mouse.move(side.rect[0] + side.rect[2] / 2, side.rect[1] + 60, { steps: 5 }); await sleep(900); o.hover = await shellDocks(page); }
        await page.mouse.move(700, 450); await sleep(6000); o.idle6s = await shellDocks(page);
        // a samples-per-frame trace of the shell docks across a route change
        const trace = [];
        const sampler = setInterval(async () => { try { trace.push({ t: Date.now(), d: await shellDocks(page) }); } catch {} }, 60);
        const bottom = o.rest.find((d) => d.testid === "bottom-dock-collapsible");
        await page.evaluate(() => { const a = [...document.querySelectorAll(".demo-bottom-dock a, .demo-bottom-dock [role=tab], .demo-bottom-dock button")].find((x) => /next/i.test(x.getAttribute("aria-label") || "")); if (a) a.click(); });
        await sleep(1500); clearInterval(sampler);
        o.routeChange = { url: page.url(), distinctRects: [...new Set(trace.map((x) => JSON.stringify(x.d.map((d) => d.rect))))].length, distinctCls: [...new Set(trace.map((x) => JSON.stringify(x.d.map((d) => d.cls))))], samples: trace.length };
        o.bottomShot = bottom ? await crop(page, "f1-bottom-dock-1440-dark", { x: bottom.rect[0] - 10, y: bottom.rect[1] - 10, width: bottom.rect[2] + 20, height: bottom.rect[3] + 20 }) : null;
        return o;
    });
    R.shellDocks390 = await withPage({ width: 390, height: 844, touch: true }, async (page) => { await go(page, "/display/buttons"); const d = await shellDocks(page); const b = d.find((x) => x.testid === "bottom-dock-collapsible"); return { docks: d, shot: b ? await crop(page, "f1-bottom-dock-390-dark", { x: 0, y: b.rect[1] - 10, width: 390, height: b.rect[3] + 20 }) : null }; });

    // (7 f4) the sticky header under a real wheel scroll
    for (const [route, scheme] of [["/navigation/tabs", "dark"], ["/navigation/tabs", "light"], ["/display/buttons", "dark"], ["/data/table", "dark"]]) {
        R[`header:${route}:${scheme}`] = await withPage({ scheme }, async (page) => {
            await go(page, route);
            await page.mouse.move(800, 500);
            const seq = [];
            for (let i = 0; i < 10; i++) { await page.mouse.wheel(0, 90); await sleep(70); }
            await sleep(900);
            const st = await page.evaluate(() => {
                const h = document.querySelector(".story-page-chrome"); if (!h) return null;
                const cs = getComputedStyle(h), b = getComputedStyle(h, "::before"); const r = h.getBoundingClientRect();
                const main = document.querySelector("#demo-main");
                return { scrollTop: main.scrollTop, t: cs.getPropertyValue("--chrome-collapse-t"), rect: [r.left, r.top, r.width, r.height], radius: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius], shadow: cs.boxShadow, bg: cs.backgroundColor, backdrop: cs.backdropFilter, plate: { image: b.backgroundImage, opacity: b.opacity, radius: [b.borderTopLeftRadius, b.borderTopRightRadius, b.borderBottomRightRadius, b.borderBottomLeftRadius], top: b.top, left: b.left, right: b.right, bottom: b.bottom } };
            });
            if (!st) return null;
            st.shot = await crop(page, `f4-header-${route.replace(/\//g, "_")}-${scheme}`, { x: st.rect[0] - 24, y: 0, width: Math.min(1100, st.rect[2] + 48), height: st.rect[3] + 40 });
            return st;
        });
    }

    // evidence crops for cited faults (one small crop each)
    R.crops = {};
    R.crops.paperGlass = await withPage({}, async (page) => { await go(page, "/foundations/paper-glass"); return [await crop(page, "p1-paper-glass-1440-dark-fold", { x: 100, y: 0, width: 1340, height: 900 })]; });
    R.crops.paperGlassL = await withPage({ scheme: "light" }, async (page) => { await go(page, "/foundations/paper-glass"); return [await crop(page, "p1-paper-glass-1440-light-fold", { x: 100, y: 0, width: 1340, height: 900 })]; });
    R.crops.buttons = await withPage({}, async (page) => { await go(page, "/display/buttons"); return [await crop(page, "p6-buttons-1440-dark-fold", { x: 100, y: 0, width: 1340, height: 900 })]; });
    R.crops.buttonsL = await withPage({ scheme: "light" }, async (page) => { await go(page, "/display/buttons"); return [await crop(page, "p6-buttons-1440-light-fold", { x: 100, y: 0, width: 1340, height: 900 })]; });
    R.crops.aurora = await withPage({}, async (page) => { await go(page, "/substrates/aurora"); const b = await page.evaluate(() => { const c = document.querySelector("[data-slot=configurator]"); if (!c) return null; c.scrollIntoView({ block: "start" }); const r = c.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }); await sleep(600); return [await crop(page, "p3-aurora-studio-1440-dark", { x: 0, y: 0, width: 1440, height: 900 })]; });
    R.crops.aurora390 = await withPage({ width: 390, height: 844, touch: true }, async (page) => { await go(page, "/substrates/aurora"); await page.evaluate(() => { const c = document.querySelector("[data-slot=configurator]"); if (c) c.scrollIntoView({ block: "start" }); }); await sleep(600); return [await crop(page, "p3-aurora-studio-390-dark", { x: 0, y: 0, width: 390, height: 844 })]; });
    R.crops.blob = await withPage({}, async (page) => { await go(page, "/substrates/blob"); const r = await page.evaluate(() => [...document.querySelectorAll(".goo-blob-wrapper")].map((w) => { const r = w.getBoundingClientRect(); return [r.left, r.top + document.querySelector("#demo-main").scrollTop, r.width, r.height]; })); const out = []; for (const [i, b] of r.entries()) { await page.evaluate((y) => document.querySelector("#demo-main").scrollTo({ top: y - 200, behavior: "instant" }), b[1]); await sleep(500); const nb = await page.evaluate((i) => { const r = document.querySelectorAll(".goo-blob-wrapper")[i].getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, i); out.push(await crop(page, `p4-blob-stage-${i + 1}`, { x: nb[0] - 40, y: nb[1] - 60, width: nb[2] + 80, height: nb[3] + 100 })); } return { rects: r, out }; });
    R.crops.constellation = await withPage({}, async (page) => { await go(page, "/substrates/constellation"); return [await crop(page, "p5-constellation-1440-dark-fold", { x: 100, y: 0, width: 1340, height: 900 })]; });
    R.crops.cardDock = await withPage({}, async (page) => {
        await go(page, "/dock/overview");
        const info = await page.evaluate(() => { const d = document.querySelector(".glass-dock.shape-card"); if (!d) return null; d.scrollIntoView({ block: "center" }); return true; });
        await sleep(700);
        const m = await page.evaluate(() => { const d = document.querySelector(".glass-dock.shape-card"); if (!d) return null; const p = d.querySelector(":scope > .dock-plate"); const r = p.getBoundingClientRect(); const cs = getComputedStyle(p); const run = d.querySelector(".dock-run"); return { rect: [r.left, r.top, r.width, r.height], radius: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius], anim: cs.animationName, runFits: d.querySelector("[data-run-fits]")?.dataset.runFits ?? null, runScrollW: run && run.scrollWidth, runClientW: run && run.clientWidth, cls: d.className }; });
        if (!m) return info;
        m.shot = await crop(page, "p8-dock-overview-card-dock", { x: m.rect[0] - 30, y: m.rect[1] - 30, width: m.rect[2] + 60, height: m.rect[3] + 60 });
        return m;
    });
    R.crops.dockIndex = await withPage({}, async (page) => {
        await go(page, "/dock");
        await page.evaluate(() => document.querySelector("#demo-main").scrollTo({ top: 99999, behavior: "instant" }));
        await sleep(700);
        const g = await page.evaluate(() => {
            const main = document.querySelector("#demo-main"); const mr = main.getBoundingClientRect();
            const bd = document.querySelector(".demo-bottom-dock"); const br = bd.getBoundingClientRect();
            const plate = document.querySelector(".demo-bottom-dock__shell > .dock-plate"); const pcs = getComputedStyle(plate);
            const cards = [...main.querySelectorAll(".section-preview-card")].map((c) => { const r = c.getBoundingClientRect(); return { t: c.querySelector("[data-route-label]")?.textContent.trim(), top: Math.round(r.top), bottom: Math.round(r.bottom), hasTile: !!c.querySelector(".section-preview-card-preview"), liveDock: !!c.querySelector(".glass-dock") }; });
            const ms = getComputedStyle(main);
            return { main: { bottom: Math.round(mr.bottom), top: Math.round(mr.top), overflowY: ms.overflowY, paddingBlockEnd: ms.paddingBottom, scrollTop: main.scrollTop, scrollH: main.scrollHeight, clientH: main.clientHeight }, bottomDock: { top: Math.round(br.top), bottom: Math.round(br.bottom), height: Math.round(br.height) }, plate: { bg: pcs.backgroundColor, backdrop: pcs.backdropFilter, opacity: pcs.opacity }, cards, shell: { gridRows: getComputedStyle(document.querySelector(".demo-app-shell")).gridTemplateRows, overflow: getComputedStyle(document.querySelector(".demo-app-shell")).overflow } };
        });
        g.shot = await crop(page, "p13-dock-index-bottom-1440-dark", { x: 100, y: 500, width: 1340, height: 400 });
        await page.evaluate(() => document.querySelector("#demo-main").scrollTo({ top: 0, behavior: "instant" })); await sleep(500);
        g.shotTop = await crop(page, "p12-dock-index-cards-1440-dark", { x: 100, y: 0, width: 1340, height: 900 });
        return g;
    });
    R.crops.dockIndexL = await withPage({ scheme: "light" }, async (page) => { await go(page, "/dock"); await page.evaluate(() => document.querySelector("#demo-main").scrollTo({ top: 99999, behavior: "instant" })); await sleep(700); const plate = await page.evaluate(() => { const p = document.querySelector(".demo-bottom-dock__shell > .dock-plate"); const c = getComputedStyle(p); return { bg: c.backgroundColor, backdrop: c.backdropFilter }; }); return { plate, shot: await crop(page, "p13-dock-index-bottom-1440-light", { x: 100, y: 500, width: 1340, height: 400 }) }; });
    R.crops.introCards = await withPage({}, async (page) => {
        await go(page, "/foundations/intro");
        const cards = await page.evaluate(() => { const f = document.querySelector(".story-field"); if (f) f.scrollIntoView({ block: "start" }); return [...document.querySelectorAll("#demo-main .section-preview-card")].map((c) => { const pv = c.querySelector(".section-preview-card-preview"); const img = c.querySelector("img.section-preview-card-viz-still"); const cs = getComputedStyle(c); return { t: c.querySelector("[data-route-label]")?.textContent.trim(), preview: pv ? (img ? `still ${img.naturalWidth}x${img.naturalHeight} shown ${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}` : "authored-live") : "none", radius: cs.borderTopLeftRadius, previewRadius: pv ? getComputedStyle(pv).borderTopLeftRadius : null, liveComps: c.querySelectorAll("button,input,.glass-dock,canvas").length }; }); });
        await sleep(600);
        return { cards, shot: await crop(page, "p10-intro-cards-1440-dark", { x: 100, y: 0, width: 1340, height: 900 }) };
    });
} finally {
    await browser.close().catch(() => {});
    fs.writeFileSync(outFile, JSON.stringify(R, null, 1));
}
