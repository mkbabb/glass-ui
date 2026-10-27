#!/usr/bin/env node
// F-13's second probe (D5 pass 6, F5‴): what moves the slider's leading edge in the frames around the release.
// carry-probe.mjs found the low reads' mechanism in the frame trace: a one-frame step of about 4 px BACKWARD at the
// release, and E-4's reference frame (the first frame at or after the harness's release timestamp) lands on either side
// of it. This probe takes E-4's fling drive (press on the thumb, 120 ms, three 40 px moves 16 ms apart, release at
// once) and, every frame from 60 ms before the pointerup to 160 ms after it, prints the parts of the leading edge:
//   edge     the range's right edge in the page frame, relative to the frame before the pointerup
//   layoutW  the range's layout width (offsetWidth: the value the finger chose), and its left offset
//   tf       the range's computed transform (the held squish and smear, the release curve, the carry added)
//   anims    the animations running on the range (CSS transitions by property, WAAPI)
//   state    root [data-held], :active on the root, the inline --atom-drag-v
// One fresh page per read, one browser per run.
//   node drop-probe.mjs --build <dir> --engine chromium|webkit --reads 6 --out <dir>
import { witness, openPage, center, f } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";

async function one(E, T, still, arm) {
  const P = await openPage(E, T, "slider", { vp: { width: 700, height: 500 } });
  try {
    await P.page.evaluate((arm) => {
      // controls on the door's carry (Element.prototype.animate on the range, composite "add"):
      //   raf    the carry started one frame later (the held transform's release transition starts first)
      //   none   the carry cancelled at once (the release with no carry)
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (kf, o) {
        if (arm !== "default" && o && o.composite === "add") {
          if (arm === "raf") { let a; requestAnimationFrame(() => { a = animate.call(this, kf, o); }); return { cancel() { a?.cancel(); } }; }
          const a = animate.call(this, kf, o); if (arm === "none") a.cancel(); return a;
        }
        return animate.call(this, kf, o);
      };
      window.__up = null;
      window.addEventListener("pointerup", (e) => { window.__up = { now: performance.now(), ts: e.timeStamp }; }, true);
      window.__fr = [];
      const tick = () => {
        const r = document.querySelector(".slider-range"), root = document.querySelector(".glass-slider");
        if (r && root) {
          const b = r.getBoundingClientRect(), cs = getComputedStyle(r);
          window.__fr.push({ T: performance.now(), x: b.right, lw: r.offsetWidth, ll: r.offsetLeft, tf: cs.transform, held: root.hasAttribute("data-held"), act: root.matches(":active"), dv: root.style.getPropertyValue("--atom-drag-v"), an: r.getAnimations().map((a) => (a.transitionProperty ? `T:${a.transitionProperty}@${(a.effect.getComputedTiming().progress ?? 0).toFixed(2)}` : `W:${a.effect?.getKeyframes?.()[0]?.composite ?? ""}@${(a.effect.getComputedTiming().progress ?? 0).toFixed(2)}`)).join(",") });
        }
        if (window.__fr.length < 600) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, arm);
    const c = await center(P.page, '[role="slider"]');
    await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
    for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
    if (still) await P.page.waitForTimeout(1000);
    const tRel = await P.page.evaluate(() => performance.now());
    await P.page.mouse.up();
    await P.page.waitForTimeout(400);
    const { fr, up } = await P.page.evaluate(() => ({ fr: window.__fr, up: window.__up }));
    const win = fr.filter((x) => x.T >= up.now - 60 && x.T <= up.now + 160);
    const before = [...fr].reverse().find((x) => x.T < up.now);
    const firstAfterRel = fr.find((x) => x.T >= tRel);
    return { lag: up.now - tRel, x0side: firstAfterRel && firstAfterRel.T < up.now ? "BEFORE the pointerup (held frame)" : "after the pointerup", rows: win.map((x) => `${f(x.T - up.now, 0).padStart(4)} ms edge ${f(x.x - before.x, 2).padStart(6)} lw ${x.lw} ll ${x.ll} tf ${x.tf.replace(/matrix\(([^,]+),[^,]+,[^,]+,([^,]+),.*\)/, "sx $1 sy $2")} held ${x.held ? 1 : 0} act ${x.act ? 1 : 0} dv ${x.dv || "-"} [${x.an}]`) };
  } finally { await P.close(); }
}

await witness("F-13d", "the slider's leading edge around the release, frame by frame (probe)", async ({ a, E, T, cell, guard }) => {
  const n = Number(a.reads ?? 6); const still = !!a.still; const arms = String(a.arms ?? "default").split(",");
  for (const arm of arms) for (let k = 0; k < n; k++) {
    const r = await guard(`read ${k + 1}`, () => one(E, T, still, arm), 60000);
    if (r.crashed) { cell(`F-13d ${arm}${still ? " still" : ""} read ${k + 1}`, "FAIL", r.line); continue; }
    cell(`F-13d ${arm}${still ? " still" : " fling"} read ${k + 1}`, "REPORT", `pointerup ${f(r.lag, 1)} ms after the harness's release stamp; E-4's reference frame falls ${r.x0side}${r.note ? ` · ${r.note}` : ""}\n      ${r.rows.join("\n      ")}`);
  }
}, 1200);
