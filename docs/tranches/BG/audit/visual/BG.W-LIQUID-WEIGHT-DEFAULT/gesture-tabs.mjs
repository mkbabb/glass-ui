// tabs-indicator-glide (row 1): sample the .segmented-indicator --stretch + transform +
// bbox during a far-tab switch. Verify stretch peak ~1.15 (anti-taffy capped, not >=1.30
// taffy), glide <=0.45s. Captures a mid-glide screenshot.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const CDP = process.env.CDP_URL || "http://localhost:9477";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-LIQUID-WEIGHT-DEFAULT";
const mode = process.argv[2] || "light";

const b = await chromium.connectOverCDP(CDP);
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: mode });
const p = await ctx.newPage();
await p.goto("http://localhost:5200/?capture=/navigation/tabs&mode=" + mode, { waitUntil: "load" });
await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
await p.waitForTimeout(900);

const target = await p.evaluate(() => {
    const strip = document.querySelector(".segmented-tabs--pill");
    const ind = strip.querySelector(".segmented-indicator");
    const tabs = [...strip.querySelectorAll(".segmented-tab")];
    window.__ind = ind;
    window.__samples = [];
    window.__marks = {};
    const far = tabs[tabs.length - 1]; // "Timeline"
    far.addEventListener("pointerdown", () => (window.__marks.click = performance.now()), true);
    let run = true;
    window.__stop = () => (run = false);
    const tick = () => {
        if (!run) return;
        const cs = getComputedStyle(ind);
        const r = ind.getBoundingClientRect();
        window.__samples.push({
            t: performance.now(),
            stretch: parseFloat(cs.getPropertyValue("--stretch")) || 1,
            transform: cs.transform,
            scale: cs.scale,
            w: +r.width.toFixed(2), h: +r.height.toFixed(2), x: +r.x.toFixed(2),
        });
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const r = far.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});

// warmup a click on a middle tab then back, to warm the path
await p.mouse.move(target.x, target.y);
await p.waitForTimeout(150);
// measured: click the far tab
const startX = target.x;
await p.evaluate(() => performance.mark("glide"));
await p.mouse.click(target.x, target.y);
// capture a mid-glide screenshot ~90ms in
await p.waitForTimeout(90);
await p.screenshot({ path: `${OUT}/lwd-tabs-glide-${mode}.png`, fullPage: false });
await p.waitForTimeout(700);
await p.evaluate(() => window.__stop());

const data = await p.evaluate(() => ({ samples: window.__samples, marks: window.__marks }));
await ctx.close();
await b.close();

const { samples, marks } = data;
const tClick = marks.click;
const after = samples.filter((s) => s.t >= tClick);
const stretchPeak = Math.max(...after.map((s) => s.stretch), 1);
// glide end: first frame after click where the indicator x stops moving (settled)
let settleT = null;
const finalX = after[after.length - 1].x;
for (let i = after.length - 1; i >= 1; i--) {
    if (Math.abs(after[i].x - finalX) > 0.5) { settleT = after[i + 1] ? after[i + 1].t : after[i].t; break; }
}
const glideMs = settleT ? settleT - tClick : null;
const scaleVals = [...new Set(after.map((s) => s.scale).filter((v) => v && v !== "none"))].slice(0, 3);
console.log(JSON.stringify({
    mode,
    stretchPeak: stretchPeak.toFixed(4),
    glideMs: glideMs?.toFixed(1),
    startX: startX.toFixed(0), finalX: finalX.toFixed(0),
    nAfter: after.length,
    sampleScales: scaleVals,
}));
