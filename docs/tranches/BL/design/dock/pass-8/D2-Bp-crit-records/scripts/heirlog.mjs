// heirlog.mjs (D2 pass 8, B′ critic; diagnosis, enters no row): on bp8 instrumented with two console lines (the heir
// armed in arm(), the gift taken in write()), which B2 sequences run the handoff at all. One browser, a fresh context per
// sequence, all closed in finally.
import { parseArgs, openTarget, launch, openScene, waitRest } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const SEQ = {
  "first-expand": ["morph", [], [["expand"]]], "warm-collapse": ["morph", [["expand"]], [["collapse"]]],
  "warm-expand": ["morph", [["expand"], ["collapse"]], [["expand"]]], "swap-long": ["swap", [], [["setFace", "long"]]],
  "swap-short": ["swap", [["setFace", "long"]], [["setFace", "short"]]], "content-add": ["morph", [["expand"]], [["setExtra", true]]],
};
const target = await openTarget(args); const browser = await launch(args.engine ?? "chromium");
try {
  for (const [seq, [scene, pre, go]] of Object.entries(SEQ)) {
    let s;
    try {
      s = await openScene(browser, target, scene, {});
      for (const [fn, ...a] of pre) { await s.page.evaluate(([f, a]) => window.__scene[f](...a), [fn, a]); await waitRest(s.page); await s.page.waitForTimeout(400); }
      const n = { heir: 0, gift: 0 };
      s.page.on("console", (m) => { const t = m.text(); if (t === "CRIT-HEIR") n.heir++; if (t === "CRIT-GIFT") n.gift++; });
      await s.page.evaluate((go) => { for (const [fn, ...a] of go) window.__scene[fn](...a); }, go);
      await s.page.waitForTimeout(900);
      console.log(`${seq}: heir armed ${n.heir}, gift taken ${n.gift}`);
    } finally { await s?.close().catch(() => {}); }
  }
} finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }
