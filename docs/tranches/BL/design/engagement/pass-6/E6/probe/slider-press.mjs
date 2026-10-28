#!/usr/bin/env node
// P-E6 probe (not a witness; P-E5's slider-press, re-read in both engines per REGISTRY §P5-8.1; the fill's block scale now reads the transform and the individual `scale` channel, since F5‴ moved the release carry onto `scale`): CK-17 / CK-06's latency on the slider's own press, now keyed on the door's hand mark
// (`[data-held]`, useHold's native pointerdown/touchstart) instead of `:active`. A held touch on the `slider` scene's
// thumb (lib.mjs openTouchPage: Chromium CDP touch, WebKit the raw touch driver), read at +25..+200 ms and +1200 ms:
// the root's `data-held`, and the fill's (`.slider-range`) computed block scale. PASS when `data-held` is set by +25 ms
// and the fill's block scale has left 1 (< 0.995) by +100 ms and holds the squish (≤ 0.97) at +1200 ms. Light theme.
// Run through the harness's own witness wrapper (one browser, a context per cell, closed in finally; the WebKit
// relaunch every NAV_CAP navigations).  node slider-press.mjs --build <out>/builds/<arm> --engine chromium|webkit
import { witness, openTouchPage, center, f } from "../../../harness/lib.mjs";
const AT = [25, 50, 75, 100, 150, 200, 1200];
await witness("P-E6 slider-press", "the slider's press on the door's hand mark (CK-17, CK-06 latency)", async ({ E, T, cell, guard }) => {
  for (const theme of ["light", "dark"]) {
    const name = `slider touch press ${theme}`;
    const r = await guard(name, async () => {
      const Q = await openTouchPage(E, T, "slider", { theme });
      try {
        const c = await center(Q.page, '[data-e~="thumb"]');
        const read = () => Q.page.evaluate(() => {
          const root = document.querySelector('[data-e~="root"]'); const rg = root?.querySelector(".slider-range");
          const cs = rg ? getComputedStyle(rg) : null; const m = cs ? new DOMMatrix(cs.transform === "none" ? undefined : cs.transform) : null; const sc = cs && cs.scale !== "none" ? cs.scale.split(" ").map(Number) : [1, 1]; const sy2 = sc.length > 1 ? sc[1] : sc[0];
          return { held: !!root?.hasAttribute("data-held"), sy: m ? Math.hypot(m.c, m.d) * sy2 : NaN };
        });
        return { mode: Q.modeLine, xs: await Q.holdAt(c.x, c.y, AT, async (ms) => ({ ...(await read()), ms })) };
      } finally { await Q.close(); }
    });
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const xs = r.xs; const at = (t) => xs[AT.indexOf(t)];
    const ok = at(25).held && xs.filter((x) => x.ms <= 110).some((x) => x.sy < 0.995) && at(1200).sy <= 0.97;
    cell(name, ok ? "PASS" : "FAIL", `${r.mode} · ${xs.map((x) => `+${x.ms} held ${x.held} sy ${f(x.sy)}`).join(" · ")} (want held by +25, sy < 0.995 by +100, ≤ 0.97 at +1200)`);
  }
});
