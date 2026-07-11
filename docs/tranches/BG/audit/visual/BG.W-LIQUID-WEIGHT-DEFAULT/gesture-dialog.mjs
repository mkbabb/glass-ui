// dialog-glass-reveal (row 3) — open the glass dialog, capture mid-reveal + settled,
// verify the reveal paints (glass-reveal recipe) + §5 fence (no overshoot beyond the enter spring).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const CDP = process.env.CDP_URL || "http://localhost:9477";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-LIQUID-WEIGHT-DEFAULT";
const mode = process.argv[2] || "light";

const b = await chromium.connectOverCDP(CDP);
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: mode });
const p = await ctx.newPage();
await p.goto("http://localhost:5200/?capture=/containers/dialog&mode=" + mode, { waitUntil: "load" });
await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
await p.waitForTimeout(800);

// Click "Open glass dialog"
const btn = await p.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((e) => /open glass dialog/i.test(e.textContent || ""));
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
if (!btn) { console.log(JSON.stringify({ error: "no dialog button" })); await b.close(); process.exit(1); }
await p.mouse.click(btn.x, btn.y);
// mid-reveal ~70ms
await p.waitForTimeout(70);
await p.screenshot({ path: `${OUT}/lwd-dialog-reveal-${mode}.png`, fullPage: false });
await p.waitForTimeout(500);
// settled open — read the dialog panel's transition/animation to confirm the glass-reveal recipe
const info = await p.evaluate(() => {
    const panel = document.querySelector("[role=dialog], .glass-reveal, [data-slot=dialog-content]");
    if (!panel) return { found: false };
    const cs = getComputedStyle(panel);
    return {
        found: true,
        cls: panel.className?.toString?.().slice(0, 80),
        animationName: cs.animationName,
        transitionTimingFunction: cs.transitionTimingFunction?.slice(0, 120),
        transform: cs.transform?.slice(0, 40),
        opacity: cs.opacity,
    };
});
await p.screenshot({ path: `${OUT}/lwd-dialog-open-${mode}.png`, fullPage: false });
await ctx.close();
await b.close();
console.log(JSON.stringify({ mode, ...info }));
