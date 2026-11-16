// s2chain.mjs <port>: RU-50's reading of where the yield enters: on s2's page capped at 266 and 267, each box from
// the run up to the dock root (client width, display, flex) with the fit flag as the dock left it, and forced on/off.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const [port] = process.argv.slice(2);
const browser = await pw.chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 844 } });
    try {
        const p = await ctx.newPage();
        await p.goto(`http://localhost:${port}/tests-visual/release-10-1-5/critic-11.html?scene=o201&at=end`);
        await p.waitForFunction(() => window.__ready);
        await p.waitForTimeout(1200);
        for (const cap of [267, 266]) {
            const r = await p.evaluate(async (cap) => {
                const d = document.querySelector(".glass-dock"), run = d.querySelector(".dock-layers > .dock-run");
                d.style.maxInlineSize = cap + "px";
                await new Promise((r) => setTimeout(r, 700));
                const chain = (tag) => { const out = []; for (let e = run; e; e = e.parentElement) { const cs = getComputedStyle(e); out.push(`${(e.className || e.tagName).toString().split(" ")[0]} cw=${e.clientWidth} ${cs.display} w=${cs.width} pad=${cs.paddingLeft}/${cs.paddingRight} kids=${e.children.length}`); if (e === d) break; } return tag + ": " + out.join(" | "); };
                const asIs = chain(`as left (fits=${d.hasAttribute("data-run-fits")})`);
                d.setAttribute("data-run-fits", ""); const on = chain("forced on");
                d.removeAttribute("data-run-fits"); const off = chain("forced off");
                return { cap, asIs, on, off, rootKids: [...d.children].map((c) => `${c.className.toString().split(" ")[0]}:${c.getBoundingClientRect().width.toFixed(1)}`) };
            }, cap);
            console.log(JSON.stringify(r, null, 1));
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
