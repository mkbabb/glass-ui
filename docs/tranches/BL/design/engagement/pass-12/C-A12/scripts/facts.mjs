#!/usr/bin/env node
// C-A12 library-free facts (no glass-ui code): what each engine's own parsers say about the token forms CK-21's class covers, beside what
// the candidate's settle.ts asks of them. Per engine: whether the Typed OM exists (`CSSNumericValue.parse`, which `tokenOf` calls); per
// settle form, CSS's own reading (`transition-duration: calc(var(--t) * 1)` on a probe, as H12's E-11 reads it) against
// `CSSNumericValue.parse(v).to("ms")`; per easing form, `new KeyframeEffect(null, null, { easing })` against
// `CSS.supports("animation-timing-function", v)`; per number form for `--scale-engage`, CSS's `scale: var(--t)` against `.to("number")`.
// One browser, one page, closed in a finally.   node facts.mjs chromium|webkit|firefox
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/node_modules/");
const pw = require("/Users/mkbabb/Programming/glass-ui/node_modules/playwright");
const engine = process.argv[2] ?? "chromium";
const SETTLES = ["210ms", "0.21s", "210MS", "2.1e2ms", "+0.21s", "calc(0.1s + 110ms)", "calc(105ms * 2)", "max(210ms, 0.1s)", "min(210ms, 1s)", "clamp(100ms, 210ms, 1s)", "calc(infinity * 1s)", "/* c */ 210ms", "0.21s 0.1s", "-0s", "1e-3s", "0.21", "210"];
const EASINGS = ["ease, linear", "EASE-IN-OUT", "linear(0, 0.4 30%, 1)", "steps(2, jump-none)", "step-end", "cubic-bezier(1.5, 0, 0, 1)", "steps(0)", "ease /* c */", "linear", "var(--u, ease-out)"];
const NUMBERS = ["1.06", "106%", "calc(1 + 0.06)", "max(1.06, 1)"];
const b = await pw[engine].launch({ headless: true });
try {
  const ctx = await b.newContext(); const page = await ctx.newPage();
  try {
    await page.setContent("<!doctype html><html><body><div id=p></div></body></html>");
    const r = await page.evaluate(([S, E, N]) => {
      const p = document.getElementById("p"); const out = { ua: navigator.userAgent, typedOM: typeof CSSNumericValue !== "undefined" && typeof CSSNumericValue.parse === "function", settles: [], easings: [], numbers: [] };
      const tom = (v, unit) => { try { return String(CSSNumericValue.parse(v).to(unit).value); } catch (e) { return `throws ${e?.name ?? ""}: ${String(e?.message ?? e).slice(0, 70)}`; } };
      for (const v of S) { p.style.cssText = ""; p.style.setProperty("--t", v); p.style.setProperty("transition-duration", "calc(var(--t) * 1)"); const raw = getComputedStyle(p).getPropertyValue("--t").trim(); const css = getComputedStyle(p).transitionDuration; out.settles.push({ v, raw, css, tom: tom(raw, "ms") }); }
      for (const v of E) { p.style.cssText = ""; p.style.setProperty("--t", v); const raw = getComputedStyle(p).getPropertyValue("--t").trim(); let ke; try { ke = new KeyframeEffect(null, null, { easing: raw }).getTiming().easing; } catch (e) { ke = `throws: ${String(e?.message ?? e).slice(0, 60)}`; } out.easings.push({ v, raw, ke, supports: CSS.supports("animation-timing-function", raw) }); }
      for (const v of N) { p.style.cssText = ""; p.style.setProperty("--t", v); p.style.setProperty("scale", "var(--t)"); const raw = getComputedStyle(p).getPropertyValue("--t").trim(); out.numbers.push({ v, raw, cssScale: getComputedStyle(p).scale, tom: tom(raw, "number") }); }
      return out;
    }, [SETTLES, EASINGS, NUMBERS]);
    console.log(`# ${engine} ${b.version()} · ${r.ua}`);
    console.log(`typed OM (CSSNumericValue.parse) present: ${r.typedOM}`);
    for (const x of r.settles) console.log(`settle ${JSON.stringify(x.v)} · computed --t ${JSON.stringify(x.raw)} · CSS transition-duration ${x.css} · tokenOf's read (parse(--t).to("ms")) ${x.tom}`);
    for (const x of r.easings) console.log(`easing ${JSON.stringify(x.v)} · computed ${JSON.stringify(x.raw)} · KeyframeEffect ${x.ke} · CSS.supports(animation-timing-function) ${x.supports}`);
    for (const x of r.numbers) console.log(`number ${JSON.stringify(x.v)} · computed ${JSON.stringify(x.raw)} · CSS scale ${x.cssScale} · parse(--t).to("number") ${x.tom}`);
  } finally { await page.close(); await ctx.close(); }
} finally { await b.close(); }
