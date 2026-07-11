// WebKit serialization diagnostic: how does WebKit compute the .tap-squish transition
// (property list + timing-function list) when the scale leg uses var(--transition-liquid-spatial)?
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const engineName = process.argv[2] || "webkit";
const pw = require("playwright");
const engine = pw[engineName];

const dump = () => {
    const probe = document.createElement("div");
    probe.className = "tap-squish";
    document.body.appendChild(probe);
    const cs = getComputedStyle(probe);
    const out = {
        transitionProperty: cs.transitionProperty,
        transitionTimingFunction: cs.transitionTimingFunction,
        transitionDuration: cs.transitionDuration,
    };
    probe.remove();
    return out;
};

const browser = await engine.launch();
for (const reduce of [false, true]) {
    const ctx = await browser.newContext({ colorScheme: "light", reducedMotion: reduce ? "reduce" : "no-preference", viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto("http://localhost:5200/", { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(400);
    const d = await page.evaluate(dump);
    console.log(`--- ${engineName} reduce=${reduce} ---`);
    console.log("  property:", d.transitionProperty);
    console.log("  duration:", d.transitionDuration);
    console.log("  timing  :", d.transitionTimingFunction);
    await ctx.close();
}
await browser.close();
