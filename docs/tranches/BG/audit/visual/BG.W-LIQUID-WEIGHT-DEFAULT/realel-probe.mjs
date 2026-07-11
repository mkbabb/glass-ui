// Dual-engine REAL-element probe: does the .tap-squish / .interactive-item / btn-interactive
// scale leg actually resolve to the spring linear() (weight) on a rendered element?
// Reads real DOM elements on /dock/overview + /navigation/tabs against BUILT :5200.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const engineName = process.argv[2] || "chromium";
const pw = require("playwright");
const engine = pw[engineName];

const parseTail = (tf) => {
    const parts = [];
    let depth = 0, cur = "";
    for (const ch of tf) {
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        if (ch === "," && depth === 0) { parts.push(cur.trim()); cur = ""; }
        else cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());
    return parts;
};

const probe = () => {
    const sels = [".tap-squish", ".interactive-item", ".dock-icon-button", ".btn-pill", "button"];
    const found = [];
    for (const sel of sels) {
        const els = [...document.querySelectorAll(sel)].slice(0, 2);
        for (const el of els) {
            const cs = getComputedStyle(el);
            found.push({
                sel,
                cls: el.className?.toString?.().slice(0, 60),
                ttf: cs.transitionTimingFunction,
                tprop: cs.transitionProperty,
            });
        }
    }
    return found;
};

const browser = await engine.launch();
const routes = ["/dock/overview", "/navigation/tabs"];
for (const route of routes) {
    const ctx = await browser.newContext({ colorScheme: "light", viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=light`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 }).catch(() => {});
    await page.waitForTimeout(800);
    const found = await page.evaluate(probe);
    console.log(`\n=== ${engineName} ${route} ===`);
    for (const f of found) {
        const parts = parseTail(f.ttf);
        const propParts = parseTail(f.tprop);
        // find the index of "scale" in transition-property, read the matching timing fn
        const scaleIdx = propParts.findIndex((p) => p === "scale");
        const scaleTf = scaleIdx >= 0 ? (parts[scaleIdx] ?? parts[parts.length - 1]) : "N/A(no scale leg)";
        const isSpring = /linear\(/.test(scaleTf);
        console.log(`  ${f.sel} [${f.cls}] scaleLeg=${isSpring ? "SPRING-linear" : scaleTf.slice(0,40)} (props:${propParts.join("|").slice(0,50)})`);
    }
    await ctx.close();
}
await browser.close();
