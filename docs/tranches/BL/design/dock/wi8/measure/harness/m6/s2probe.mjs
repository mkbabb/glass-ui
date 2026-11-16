// s2probe.mjs <port> [engine]: RU-39's reading on 10.1.5 s2's page (critic-11, scene=o201&at=end): the dock capped
// at each width from natural down 20 px, every sync's flags over 600 ms (MutationObserver on data-run-fits and
// data-run-whole), and at the end span, the run's client box capped and lifted, the region's width.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const [port, engine = "chromium"] = process.argv.slice(2);
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 844 } });
    try {
        const p = await ctx.newPage();
        await p.goto(`http://localhost:${port}/tests-visual/release-10-1-5/critic-11.html?scene=o201&at=end`);
        await p.waitForFunction(() => window.__ready);
        await p.waitForTimeout(1200);
        const natural = Math.ceil(await p.evaluate(() => document.querySelector(".glass-dock").getBoundingClientRect().width));
        for (let cap = natural; cap >= natural - 14; cap--) {
            const r = await p.evaluate(async (cap) => {
                const d = document.querySelector(".glass-dock"), run = d.querySelector(".dock-layers > .dock-run");
                const log = [];
                const mo = new MutationObserver((ms) => { for (const m of ms) log.push(`${Math.round(performance.now() % 100000)} ${m.target === d ? "fits" : "whole"}=${m.target.hasAttribute(m.attributeName) ? 1 : 0}`); });
                mo.observe(d, { attributes: true, attributeFilter: ["data-run-fits"] });
                mo.observe(run, { attributes: true, attributeFilter: ["data-run-whole"] });
                d.style.maxInlineSize = cap + "px";
                await new Promise((r) => setTimeout(r, 600));
                mo.disconnect();
                const kids = [...run.children].filter((c) => c.offsetParent !== null);
                const span = Math.max(...kids.map((c) => c.offsetLeft + c.offsetWidth)) - Math.min(...kids.map((c) => c.offsetLeft));
                const capped = run.clientWidth, whole = run.hasAttribute("data-run-whole");
                if (whole) run.removeAttribute("data-run-whole");
                const lifted = run.clientWidth, region = run.parentElement.clientWidth, dockW = d.getBoundingClientRect().width;
                if (whole) run.setAttribute("data-run-whole", "");
                return { cap, fits: d.hasAttribute("data-run-fits"), whole, span, capped, lifted, region, dockW: +dockW.toFixed(2), flips: log.length, log: log.slice(0, 8) };
            }, cap);
            console.log(JSON.stringify(r));
        }
    } finally { await ctx.close(); }
} finally { if (browser) await browser.close(); }
