// idle9.mjs <port> <tag> [--engine chromium]: S6's reading of the :702 writer H9 named (RU-90, O-268). release-11-0-2's
// fold-harness page on the item's dev server (a hold build, so the carrier's `dock:*` marks are present), the spec's
// window (5.4 s after mount, 2.5 s scrolling 3 px a frame): per frame, whether `--dock-morph-t` moved, the plate's inline
// style changed, and the carrier's marks in it (every `dock:read` with its reason, every `dock:ro-miss` with the entries
// that failed the size guard, every `dock:write`); the layouts counted over CDP. Log: logs/s9-idle-<tag>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const [port, tag] = process.argv.slice(2);
let browser;
const out = { tag };
try {
    browser = await pw.chromium.launch({ headless: true });
    for (const coarse of [false]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Performance.enable");
            const layouts = async () => (await cdp.send("Performance.getMetrics")).metrics.find((m) => m.name === "LayoutCount").value;
            await page.goto(`http://127.0.0.1:${port}/tests-visual/release-11-0-2/fold-harness.html`);
            await page.locator("body[data-ready='1'] .fold-dock").waitFor();
            await page.waitForTimeout(5400);
            const before = await layouts();
            const r = await page.evaluate(async () => {
                const root = document.querySelector(".glass-dock");
                const plate = root.querySelector(".dock-plate");
                performance.clearMarks();
                const rows = [];
                let lastT = root.style.getPropertyValue("--dock-morph-t"), lastP = plate.getAttribute("style"), lastL = root.querySelector(".dock-layers")?.getAttribute("style");
                let seen = 0;
                const end = performance.now() + 2500;
                await new Promise((done) => {
                    const tick = (now) => {
                        scrollBy(0, 3);
                        const t = root.style.getPropertyValue("--dock-morph-t"), p = plate.getAttribute("style"), l = root.querySelector(".dock-layers")?.getAttribute("style");
                        const marks = performance.getEntriesByType("mark").slice(seen);
                        seen += marks.length;
                        rows.push({ t: Math.round(now), morph: t !== lastT, plate: p !== lastP, layers: l !== lastL, cls: root.className.replace(/\s+/g, " "), marks: marks.map((m) => m.name + (m.detail ? " " + JSON.stringify(m.detail) : "")) });
                        if (p !== lastP) { rows[rows.length - 1].plateWas = lastP?.slice(0, 300); rows[rows.length - 1].plateNow = p?.slice(0, 300); }
                        lastT = t; lastP = p; lastL = l;
                        if (performance.now() < end) requestAnimationFrame(tick); else done();
                    };
                    requestAnimationFrame(tick);
                });
                return rows;
            });
            const count = (await layouts()) - before;
            const reasons = {}; const misses = [];
            for (const row of r) for (const m of row.marks) { if (m.startsWith("dock:read")) { const k = m.slice(10); reasons[k] = (reasons[k] ?? 0) + 1; } if (m.startsWith("dock:ro-miss") && misses.length < 12) misses.push(m.slice(13, 400)); }
            out.fine = { frames: r.length, morphFrames: r.filter((x) => x.morph).length, plateFrames: r.filter((x) => x.plate).length, layerFrames: r.filter((x) => x.layers).length, writeMarks: r.reduce((s, x) => s + x.marks.filter((m) => m === "dock:write").length, 0), layouts: count, reasons, misses, sample: r.filter((x) => x.plate).slice(0, 6).map((x) => ({ t: x.t, morph: x.morph, cls: x.cls, marks: x.marks.slice(0, 4), was: x.plateWas?.slice(0, 300), now: x.plateNow?.slice(0, 300) })), late: r.filter((x) => x.plate && !x.morph).slice(-4).map((x) => ({ t: x.t, cls: x.cls, marks: x.marks.slice(0, 4), was: x.plateWas?.slice(0, 300), now: x.plateNow?.slice(0, 300) })) };
            // The frames whose plate moved without the morph scalar (the travel's settle): each one's inset.
            out.fine.tail = r.filter((x) => x.plate && !x.morph).map((x) => ({ t: x.t, now: (x.plateNow ?? "").replace(/border-radius:[^;]*;?/, "").trim() }));
            console.log("tail", out.fine.tail.length, JSON.stringify(out.fine.tail.map((x) => x.now.replace(/inset: /, ""))).slice(0, 1500));
            console.log(JSON.stringify({ frames: out.fine.frames, morphFrames: out.fine.morphFrames, plateFrames: out.fine.plateFrames, layerFrames: out.fine.layerFrames, writeMarks: out.fine.writeMarks, layouts: count, reasons }));
            console.log("misses", JSON.stringify(misses.slice(0, 6)));
            console.log("late", JSON.stringify(out.fine.late).slice(0, 2500));
        } finally { await ctx.close(); }
    }
} finally { await browser?.close(); }
writeFileSync(new URL(`../../logs/s9-idle-${tag}.json`, import.meta.url), JSON.stringify(out, null, 1));
