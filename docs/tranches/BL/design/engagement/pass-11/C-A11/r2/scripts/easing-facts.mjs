// C-A11: an engine fact, library-free. For each easing string: CSS.supports("animation-timing-function", s) and whether
// el.animate(…, { easing: s }) throws. One browser per engine run; one context; closed in finally.
const pw = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs")).default;
const os = await import("node:os");
const engine = process.argv[2] ?? "chromium";
const V = ["nonsense", "initial", "ease, linear", "linear, ease-in", "linear(0, 1), ease", "steps(0)", "cubic-bezier(2, 0, 1, 1)", "ease", "linear(0, 0.5 50%, 1)", "steps(2, jump-none)", "steps(1, jump-none)", "inherit"];
const b = await pw[engine].launch();
try {
  const c = await b.newContext(); const p = await c.newPage();
  await p.setContent("<div id=x></div>");
  const r = await p.evaluate((V) => V.map((s) => { let thr = null; try { document.getElementById("x").animate({ opacity: [0, 1] }, { duration: 10, easing: s }); } catch (e) { thr = String(e.message || e).slice(0, 90); } return { s, supports: CSS.supports("animation-timing-function", s), supportsTransition: CSS.supports("transition-timing-function", s), throws: thr }; }), V);
  console.log(`# easing-facts ${engine} ${b.version()} · load ${os.loadavg().map((x) => x.toFixed(1)).join("/")}`);
  for (const x of r) console.log(`${JSON.stringify(x.s).padEnd(28)} supports(animation)=${x.supports} supports(transition)=${x.supportsTransition} animate ${x.throws ? "THROWS: " + x.throws : "ok"}`);
  await c.close();
} finally { await b.close(); }
