// blur9.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-9 part H, item H6 (RU-93 as amended for R8-6). The dark
// dock's computed backdrop-filter beside a dark card's, on the dials composition over the warm field (its Card and its
// dock on one page), dark scheme: as the build stands, and with RU-93's dark level 0.7 injected on the dock
// (`.dark .glass-dock, .glass-dock.dark { --glass-level: 0.7 }`), each read at the dock's plate (folded and open) and at
// the card (`.dials-card`), with `-webkit-backdrop-filter` and the level as computed. One browser, a context per state.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const out = { engine, tag, states: {} };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const [state, css] of [["build", ""], ["dark 0.7", ".dark .glass-dock, .glass-dock.dark { --glass-level: 0.7; }"]]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
        try {
            if (css) await ctx.addInitScript((css) => addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s); }), css);
            const p = await ctx.newPage();
            await p.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=dials&ground=field&scheme=dark`);
            await p.waitForSelector("[data-story-stage] .glass-dock", { timeout: 60000 });
            await p.waitForTimeout(2000);
            const read = () => p.evaluate(() => {
                const d = document.querySelector("[data-story-stage] .glass-dock");
                const pl = d.querySelector(".dock-plate") ?? d;
                const card = document.querySelector(".dials-card") ?? document.querySelector("[data-slot=card]");
                const f = (el) => { if (!el) return null; const cs = getComputedStyle(el); return { backdropFilter: cs.backdropFilter, webkitBackdropFilter: cs.webkitBackdropFilter ?? cs.getPropertyValue("-webkit-backdrop-filter"), level: cs.getPropertyValue("--glass-level").trim(), background: cs.backgroundColor }; };
                return { posture: d.classList.contains("expanded") ? "open" : d.classList.contains("collapsed") ? "folded" : "rest", dockPlate: f(pl), card: f(card), dark: document.documentElement.classList.contains("dark") };
            });
            const first = await read();
            const b = await p.locator("[data-story-stage] .glass-dock").first().boundingBox();
            await p.mouse.move(b.x - 6, b.y + b.height / 2); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 }); await p.waitForTimeout(900);
            const second = await read();
            out.states[state] = [first, second];
            console.log(state, JSON.stringify([first, second]));
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-blur.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
