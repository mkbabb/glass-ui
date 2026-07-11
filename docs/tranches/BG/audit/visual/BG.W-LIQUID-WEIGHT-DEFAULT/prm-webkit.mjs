// WebKit PRM computed check against BUILT :5200 — the (A) cascade defect re-verify on Safari's engine.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { webkit } = require("playwright");

const scaleLeg = (klass, calm) => {
    const host = document.createElement("div");
    if (calm) host.className = "motion-calm";
    const probe = document.createElement("div");
    probe.className = klass;
    host.appendChild(probe);
    document.body.appendChild(host);
    const tf = getComputedStyle(probe).transitionTimingFunction || "";
    const rootTok = getComputedStyle(document.documentElement)
        .getPropertyValue("--transition-liquid-spatial")
        .trim();
    host.remove();
    // split top-level commas
    const parts = [];
    let depth = 0, cur = "";
    for (const ch of tf) {
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        if (ch === "," && depth === 0) { parts.push(cur.trim()); cur = ""; }
        else cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());
    return { tail: parts[parts.length - 1] ?? tf, rootTok };
};

const browser = await webkit.launch();
const out = [];
for (const scheme of ["light", "dark"]) {
    for (const reduce of [false, true]) {
        const ctx = await browser.newContext({
            colorScheme: scheme,
            reducedMotion: reduce ? "reduce" : "no-preference",
            viewport: { width: 1280, height: 800 },
        });
        const page = await ctx.newPage();
        await page.goto("http://localhost:5200/", { waitUntil: "load", timeout: 30000 });
        await page.waitForTimeout(400);
        const def = await page.evaluate(scaleLeg, ["tap-squish", false]);
        const calm = await page.evaluate(scaleLeg, ["tap-squish", true]);
        const mm = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
        out.push({ scheme, reduce, matchMedia: mm,
            default_tail: def.tail, default_root: def.rootTok,
            calm_tail: calm.tail });
        console.log(JSON.stringify({ scheme, reduce, mm, def_tail: def.tail, def_root: def.rootTok, calm_tail: calm.tail }));
        await ctx.close();
    }
}
await browser.close();

// Verdict
let pass = true;
for (const r of out) {
    if (!r.reduce) {
        // default must be spring linear(), calm must be bezier
        if (!/linear\(/.test(r.default_tail) || /cubic-bezier/.test(r.default_tail)) { pass = false; console.log("FAIL default-weight", r.scheme); }
        if (!/cubic-bezier/.test(r.calm_tail)) { pass = false; console.log("FAIL calm-optout", r.scheme); }
    } else {
        // under reduce, default must snap to bezier (no linear)
        if (!/cubic-bezier/.test(r.default_tail) || /linear\(/.test(r.default_tail)) { pass = false; console.log("FAIL PRM-snap", r.scheme, r.default_tail); }
    }
}
console.log("WEBKIT_PRM_VERDICT=" + (pass ? "PASS" : "FAIL"));
