// trig9.mjs <port> <tag> [--engine chromium|webkit]: S5's G-13 lines (RU-98, RU-99, RU-100), at 1440 fine and 390
// coarse, light. One browser, a context per cell, closed in finally. Log: logs/s9-trig-<tag>.<engine>.json.
//   - trigger (RU-99): on w-trigr (s9/addcell9.py), every trigger in the run and both persistent regions of a horizontal
//     and a vertical dock: its box against `--dock-control-size` probed in its dock, both axes at least that within 0.5 px;
//   - tab seat (RU-98): on w-glyphs-tab and w-tallrow's sibling cells, every tab seat's block size equal to
//     `--dock-control-size` within 0.5 px (w-glyphs at its own share; census8 carries the full census);
//   - controls glyph (RU-100): on w-ctl, opened, every run seat's direct glyph box against 0.5 of `--dock-layer-height`
//     within 0.5 px, and the folded face's glyph.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, tag, rows: [] };
const probe = `(d, v) => { const p = document.createElement("div"); p.style.cssText = "position:absolute;visibility:hidden;inline-size:0;block-size:" + v; d.appendChild(p); const h = p.getBoundingClientRect().height; p.remove(); return h; }`;
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) {
        const W = coarse ? 390 : 1440;
        const mk = () => browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
        // triggers
        let ctx = await mk();
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-trigr`);
            await page.waitForSelector("[data-testid=w-trigr-v-run2]", { timeout: 60000 });
            await sleep(1200);
            const r = await page.evaluate((probeSrc) => {
                const pr = eval(probeSrc);
                return [...document.querySelectorAll("[data-testid^=w-trigr-][data-testid*='-'] .dock-trigger, .dock-trigger[data-testid^=w-trigr-]")].map((t) => {
                    const d = t.closest(".glass-dock"); const size = pr(d, "var(--dock-control-size)"); const b = t.getBoundingClientRect();
                    const region = t.closest(".dock-persistent-end") ? "persistent-end" : t.closest(".dock-persistent") ? "persistent" : t.closest(".dock-run") ? "run" : "other";
                    return { id: t.getAttribute("data-testid"), axis: d.classList.contains("vertical") ? "vertical" : "horizontal", region, w: +b.width.toFixed(2), h: +b.height.toFixed(2), size: +size.toFixed(2), ok: b.width >= size - 0.5 && b.height >= size - 0.5 };
                });
            }, probe);
            for (const x of r) out.rows.push({ line: "trigger", width: W, ...x });
            console.log("trigger", W, JSON.stringify(r.map((x) => [x.id, x.region, x.w, x.h, x.size, x.ok])));
        } catch (e) { out.rows.push({ line: "trigger", width: W, error: String(e).slice(0, 300), ok: false }); console.log("trigger", W, "ERROR", String(e).slice(0, 200)); } finally { await ctx.close(); }
        // tab seats
        ctx = await mk();
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-glyphs`);
            await page.waitForSelector("[data-testid=w-glyphs-tab]", { timeout: 60000 });
            await sleep(900);
            const r = await page.evaluate((probeSrc) => {
                const pr = eval(probeSrc);
                const d = document.querySelector("[data-testid=w-glyphs-tab]"); const size = pr(d, "var(--dock-control-size)");
                return [...d.querySelectorAll(".dock-tab-button")].filter((t) => t.getBoundingClientRect().height > 0).map((t) => { const b = t.getBoundingClientRect(); return { label: t.textContent.trim().slice(0, 16), h: +b.height.toFixed(2), size: +size.toFixed(2), ok: Math.abs(b.height - size) <= 0.5 }; });
            }, probe);
            for (const x of r) out.rows.push({ line: "tab seat", width: W, ...x });
            console.log("tab seat", W, JSON.stringify(r.map((x) => [x.label, x.h, x.size, x.ok])));
        } catch (e) { out.rows.push({ line: "tab seat", width: W, error: String(e).slice(0, 300), ok: false }); } finally { await ctx.close(); }
        // the controls preset's glyph
        ctx = await mk();
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-ctl`);
            await page.waitForSelector("[data-testid=w-ctl]", { timeout: 60000 });
            await page.mouse.move(2, 2).catch(() => {}); await sleep(1500);
            const folded = await page.evaluate((probeSrc) => { const pr = eval(probeSrc); const d = document.querySelector("[data-testid=w-ctl]"); const lh = pr(d, "var(--dock-layer-height)"); const g = d.querySelector(".dock-layer--summary > :is(svg, img, picture)"); const b = g?.getBoundingClientRect(); return { posture: d.classList.contains("collapsed") ? "folded" : "open", lh: +lh.toFixed(2), glyph: b ? [+b.width.toFixed(2), +b.height.toFixed(2)] : null }; }, probe);
            const f = await page.evaluate(() => { const d = document.querySelector("[data-testid=w-ctl]"); const r = (d.querySelector(".dock-layer--summary") ?? d).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
            if (coarse) await page.touchscreen.tap(f[0], f[1]); else { await page.mouse.move(f[0], f[1]); await sleep(300); await page.mouse.click(f[0], f[1]); }
            await sleep(1500);
            const open = await page.evaluate((probeSrc) => { const pr = eval(probeSrc); const d = document.querySelector("[data-testid=w-ctl]"); const lh = pr(d, "var(--dock-layer-height)"); return { posture: d.classList.contains("expanded") ? "open" : "folded", lh: +lh.toFixed(2), seats: [...d.querySelectorAll(".dock-run .dock-icon-button > svg")].map((g) => { const b = g.getBoundingClientRect(); return [g.closest("[aria-label]")?.getAttribute("aria-label"), +b.width.toFixed(2), +b.height.toFixed(2)]; }) }; }, probe);
            const want = (lh) => lh * 0.5;
            const okF = folded.glyph ? Math.abs(folded.glyph[0] - want(folded.lh)) <= 0.5 : null;
            const okO = open.posture === "open" && open.seats.length > 0 && open.seats.every((s) => Math.abs(s[1] - want(open.lh)) <= 0.5 && Math.abs(s[2] - want(open.lh)) <= 0.5);
            out.rows.push({ line: "controls glyph", width: W, folded, open, want: want(open.lh), okFolded: okF, ok: okO });
            console.log("controls glyph", W, JSON.stringify(folded), JSON.stringify(open), "want", want(open.lh), okF, okO);
        } catch (e) { out.rows.push({ line: "controls glyph", width: W, error: String(e).slice(0, 300), ok: false }); } finally { await ctx.close(); }
    }
} finally {
    await browser?.close();
}
out.summary = Object.fromEntries(["trigger", "tab seat", "controls glyph"].map((l) => { const rs = out.rows.filter((r) => r.line === l); return [l, { reads: rs.length, fail: rs.filter((r) => r.ok === false).map((r) => `${r.id ?? r.label ?? ""} ${r.width} ${r.region ?? ""} ${r.w ?? ""}x${r.h ?? ""}/${r.size ?? r.want ?? ""}`.trim()) }]; }));
console.log("summary", JSON.stringify(out.summary));
writeFileSync(new URL(`../../logs/s9-trig-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
