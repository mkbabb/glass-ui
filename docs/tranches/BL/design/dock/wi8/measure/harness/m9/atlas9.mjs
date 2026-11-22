// atlas9.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-9 part H, item H8 (RU-106). atlas8's seat cell
// (?c=dock-wi8&cell=w-atlas-preset: the figure plate at 375 by 812, ControlsDock in PlateDock's 44 px seat, corner
// top-end, within parent, hover to open), both schemes, a fine pointer. Read, folded and open (1.2 s after a hover
// opened it): the root's computed left, right, width and position, its parent's width; the open run's min-content and
// max-content inline sizes (the run's own width set to each keyword in turn, read, and put back); and every author rule
// in the page's style sheets (every sheet the document can read, @layer and @media blocks walked) whose selector matches
// the root, its plate or its run and that sets `left`, `inset`, `inset-inline` or `inset-inline-start`, with its sheet,
// selector and value. One browser, a context per scheme, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const out = { engine, cells: {} };
const READ = () => {
    const d = document.querySelector("[data-testid=w-atlas-preset]");
    const run = d.querySelector(".dock-run");
    const plate = d.querySelector(".dock-plate");
    const cs = getComputedStyle(d);
    const sizes = (el) => { if (!el) return null; const old = el.style.getPropertyValue("width"); const pr = el.style.getPropertyPriority("width"); const at = (v) => { el.style.setProperty("width", v, "important"); const w = el.getBoundingClientRect().width; return +w.toFixed(2); }; const r = { min: at("min-content"), max: at("max-content"), fit: at("fit-content") }; if (old) el.style.setProperty("width", old, pr); else el.style.removeProperty("width"); r.now = +el.getBoundingClientRect().width.toFixed(2); return r; };
    const rules = [];
    const walk = (list, sheet) => { for (const r of list) { if (r.cssRules && !(r instanceof CSSStyleRule)) { walk(r.cssRules, sheet); continue; } if (!(r instanceof CSSStyleRule)) continue; const st = r.style; const props = ["left", "inset", "inset-inline", "inset-inline-start"].filter((p) => st.getPropertyValue(p)); if (!props.length) { if (r.cssRules?.length) walk(r.cssRules, sheet); continue; } let hit = []; for (const [n, el] of [["root", d], ["plate", plate], ["run", run]]) { try { if (el && el.matches(r.selectorText)) hit.push(n); } catch {} } if (hit.length) rules.push({ on: hit, sheet: (sheet.href ?? "inline").split("/").pop().slice(0, 60), selector: r.selectorText.slice(0, 160), set: Object.fromEntries(props.map((p) => [p, st.getPropertyValue(p)])) }); if (r.cssRules?.length) walk(r.cssRules, sheet); } };
    for (const sh of document.styleSheets) { try { walk(sh.cssRules, sh); } catch { rules.push({ unreadable: sh.href }); } }
    return { posture: d.classList.contains("expanded") ? "open" : d.classList.contains("collapsed") ? "folded" : "rest", root: { position: cs.position, left: cs.left, right: cs.right, width: cs.width, inlineStyleLeft: d.style.left || null }, parentWidth: +d.parentElement.getBoundingClientRect().width.toFixed(2), run: sizes(run), runOverflowX: run ? getComputedStyle(run).overflowX : null, seats: [...d.querySelectorAll("[data-glass-dock-seat]")].map((s) => +s.getBoundingClientRect().width.toFixed(1)), rules };
};
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, colorScheme: scheme });
        try {
            const p = await ctx.newPage();
            await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-atlas-preset${scheme === "dark" ? "&scheme=dark" : ""}`);
            await p.waitForSelector("[data-testid=w-atlas-preset]");
            await p.waitForTimeout(900);
            const folded = await p.evaluate(READ);
            const b = await p.locator("[data-testid=w-atlas-preset]").boundingBox();
            await p.mouse.move(b.x - 20, b.y + b.height / 2); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 }); await p.mouse.move(b.x + b.width / 2 + 1, b.y + b.height / 2);
            await p.waitForTimeout(1200);
            const open = await p.evaluate(READ);
            out.cells[scheme] = { folded, open };
            console.log(scheme, JSON.stringify({ folded: { ...folded, rules: folded.rules.length }, open: { ...open, rules: open.rules } }));
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-atlas.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
