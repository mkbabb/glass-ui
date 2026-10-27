// trace.mjs (D2 pass 7, B′ prototype; diagnosis only, enters no row): per-rAF DOM trace of the slot exchange on the
// morph scene: each seat's box, its inline clip-path and mask-image, while a hook drives the move.
//   node trace.mjs --build <dir> [--engine chromium|webkit] [--seq first-expand|warm-collapse|swap-long] [--theme dark]
import { parseArgs, openTarget, launch, openScene, waitRest } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine === "all" ? "chromium" : args.engine;
const seq = args.seq ?? "first-expand";
const SEQ = { "first-expand": ["morph", [], [["expand"]]], "warm-collapse": ["morph", [["expand"]], [["collapse"]]], "warm-expand": ["morph", [["expand"], ["collapse"]], [["expand"]]],
  "swap-long": ["swap", [], [["setFace", "long"]]], "swap-short": ["swap", [["setFace", "long"]], [["setFace", "short"]]] };
const [scene, pre, go] = SEQ[seq];
const browser = await launch(engine);
let s;
try {
  s = await openScene(browser, target, scene, { theme: args.theme ?? null });
  for (const [fn, ...a] of pre) { await s.page.evaluate(([f, a]) => window.__scene[f](...a), [fn, a]); await waitRest(s.page); await s.page.waitForTimeout(400); }
  const log = await s.page.evaluate(async (go) => {
    const root = document.querySelector('[data-testid="dock"]');
    const seats = () => [...root.querySelectorAll(".dock-face-content > *, .dock-layer > *, [data-dock-seat], .dock-persistent > *")]
      .filter((e, i, a) => a.indexOf(e) === i);
    const out = []; const t0 = performance.now();
    const snap = () => {
      const pr = root.getBoundingClientRect();
      out.push({ t: +(performance.now() - t0).toFixed(1), s: seats().map((e) => { const r = e.getBoundingClientRect(); return [ (e.textContent || "").trim().slice(0, 8) || e.getAttribute("aria-label"), +(r.left - pr.left).toFixed(1), +r.width.toFixed(1), e.style.clipPath || "", e.style.maskImage || "" ]; }) });
    };
    for (const [fn, ...a] of go) window.__scene[fn](...a);
    await new Promise((res) => { const f = () => { snap(); if (performance.now() - t0 < 420) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
    return out;
  }, go);
  for (const f of log) console.log(f.t, JSON.stringify(f.s.filter((q) => q[3] || q[4] || /^(H|1|2|P|A|B|C|T|Tools|Brushes)$/.test(q[0]))));
} finally { await s?.close().catch(() => {}); await browser.close(); await target.close(); }
