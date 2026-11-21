// fillprobe8.mjs <port> <tag> [--engine chromium|webkit] [--page canvas-tools] [--scheme light]: S4's reading of a mark
// that ink8 read as "no fill painted" (canvas-tools's Grid, rail's Regions). On dock-comp's page at 1440 by 900, flat
// ground: the dock opened by hover as ink8 opens it, the pointer moved off above it, then every 50 ms for 1.5 s each
// pressed or current seat's computed background colour and image, its classes and data-state, the run mark's box,
// and the seat's running animations. One browser, one context, closed in finally. Output: logs/s8-fillprobe-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const page = val("--page", "canvas-tools");
const scheme = val("--scheme", "light");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
const out = { engine, page, scheme, samples: [] };
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
    try {
        const p = await ctx.newPage();
        await p.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=${page}&ground=flat${scheme === "dark" ? "&scheme=dark" : ""}`);
        await p.waitForSelector("[data-story-stage] .glass-dock", { timeout: 60000 });
        await sleep(2500);
        await p.mouse.move(2, 2);
        await sleep(400);
        const box = await p.evaluate(() => { const r = document.querySelector("[data-story-stage] .glass-dock").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
        await p.mouse.move(box.x - 6, box.y); await p.mouse.move(box.x, box.y, { steps: 3 }); await sleep(900);
        const nb = await p.evaluate(() => { const r = document.querySelector("[data-story-stage] .glass-dock").getBoundingClientRect(); return { x: r.x + r.width / 2, top: r.y, bottom: r.y + r.height, open: document.querySelector("[data-story-stage] .glass-dock").classList.contains("expanded") }; });
        out.open = nb.open;
        await p.mouse.move(nb.x, nb.top > 40 ? nb.top - 24 : nb.bottom + 24, { steps: 2 });
        for (let i = 0; i < 30; i++) {
            out.samples.push(await p.evaluate(() => {
                const d = document.querySelector("[data-story-stage] .glass-dock");
                const seats = [...d.querySelectorAll("[aria-pressed='true'], [aria-current]:not([aria-current='false']), [data-active]")];
                const mk = d.querySelector(".dock-run-mark");
                const mr = mk?.getBoundingClientRect();
                return {
                    t: Math.round(performance.now()),
                    open: d.classList.contains("expanded"),
                    mark: mk ? [Math.round(mr.x), Math.round(mr.width), getComputedStyle(mk).backgroundColor] : null,
                    seats: seats.map((s) => {
                        const cs = getComputedStyle(s);
                        const r = s.getBoundingClientRect();
                        return {
                            name: s.getAttribute("aria-label") || s.textContent.trim().slice(0, 14),
                            cls: s.className.toString().slice(0, 120),
                            state: s.getAttribute("data-state"),
                            box: [Math.round(r.x), Math.round(r.width)],
                            bg: cs.backgroundColor,
                            bgi: cs.backgroundImage.slice(0, 90),
                            capsule: cs.getPropertyValue("--glass-capsule-fill").trim().slice(0, 90),
                            active: cs.getPropertyValue("--dock-control-active-bg").trim().slice(0, 90),
                            anims: s.getAnimations().map((x) => `${x.animationName || x.transitionProperty || x.constructor.name}:${x.playState}`),
                        };
                    }),
                };
            }));
            await sleep(50);
        }
        const db = await p.evaluate(() => { const r = document.querySelector("[data-story-stage] .glass-dock").getBoundingClientRect(); return { x: Math.max(0, r.x - 12), y: Math.max(0, r.y - 12), width: r.width + 24, height: r.height + 24 }; });
        if (val("--shot", null)) await p.screenshot({ path: val("--shot", null), clip: db });
        out.dockBox = db;
    } finally {
        await ctx.close();
    }
} finally {
    await browser?.close();
}
const L = new URL("../../logs/", import.meta.url).pathname;
writeFileSync(`${L}s8-fillprobe-${tag}.${engine}.json`, JSON.stringify(out, null, 1));
const f = out.samples[0], z = out.samples[out.samples.length - 1];
console.log(JSON.stringify({ open: out.open, first: f, last: z }, null, 1).slice(0, 4000));
