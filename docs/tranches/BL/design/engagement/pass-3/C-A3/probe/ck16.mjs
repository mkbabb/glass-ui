// C-A3 CK-16 (FL-6 rest-running): Skeleton (passive scene) and StatusDot (gallery scene) at rest under `static`.
// Reads: running animations on each element's subtree (name, animated properties); Chromium: CDP LayoutCount over 2 s
// at rest (W-F.6 bound: 0 layouts/s); then the element pushed off-screen (a 3000 px spacer above it, scrolled so it is
// out of view) and the running-animation count read again (the row: it stops off-screen).
//   node ck16.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
console.log(`# ck16 engine ${E.name} load ${load()} at start`);
let pass = 0, fail = 0, um = 0;
const cell = (v, n, l) => { console.log(`  ${v.padEnd(10)} ${n} · ${l} · load ${load()}`); if (v === "PASS") pass++; else if (v === "FAIL") fail++; else um++; };
try {
  for (const [scene, sel, name] of [["passive", '[data-t="skel"]', "Skeleton"], ["gallery", ".status-dot, [data-slot='status-dot']", "StatusDot"]]) {
    const P = await openPage(E, T, scene, { theme: "light" });
    try {
      await sleep(400);
      const anim = () => P.page.evaluate((sel) => { const el = document.querySelector(sel); if (!el) return null; el.scrollIntoView?.({ block: "center" });
        const an = [el, ...el.querySelectorAll("*")].flatMap((e) => e.getAnimations()).concat(el.getAnimations({ subtree: true }));
        const run = [...new Set(an)].filter((x) => x.playState === "running");
        return { cls: el.className?.baseVal ?? el.className, rc: getComputedStyle(el).getPropertyValue("--rung-class").trim(), run: run.map((x) => `${x.animationName ?? x.constructor.name}[${(x.effect?.getKeyframes?.() ?? []).flatMap((k) => Object.keys(k).filter((p) => !["offset", "easing", "composite", "computedOffset"].includes(p))).filter((v, i, s) => s.indexOf(v) === i).join(",")}]`) }; }, sel);
      const r0 = await anim();
      if (!r0) { cell("UNMEASURED", `CK-16 ${name}`, `no ${sel} rendered`); continue; }
      let layouts = "UNMEASURED (no CDP in this engine)";
      if (E.name === "chromium") { const s = await P.ctx.newCDPSession(P.page); await s.send("Performance.enable"); const g = async () => (await s.send("Performance.getMetrics")).metrics.find((m) => m.name === "LayoutCount").value; const l0 = await g(); await sleep(2000); const l1 = await g(); layouts = `${((l1 - l0) / 2).toFixed(1)} layouts/s`; }
      cell(E.name === "chromium" ? (/^0\.0 /.test(layouts) ? "PASS" : "FAIL") : "UNMEASURED", `CK-16 ${name} at rest`, `--rung-class ${r0.rc}; running ${r0.run.length}: ${r0.run.join(" ") || "none"}; ${layouts}`);
      const off = await P.page.evaluate(async (sel) => { const el = document.querySelector(sel); const sp = document.createElement("div"); sp.style.height = "4000px"; document.body.prepend(sp); window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 600)); const b = el.getBoundingClientRect(); const run = el.getAnimations({ subtree: true }).filter((x) => x.playState === "running").length; return { top: Math.round(b.top), vh: innerHeight, run }; }, sel);
      cell(off.run === 0 ? "PASS" : "FAIL", `CK-16 ${name} off-screen`, `element top ${off.top} px against a ${off.vh} px viewport; running animations ${off.run} (bound 0 off-screen)`);
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
console.log(`ck16 ${E.name} · ${pass} pass, ${fail} fail, ${um} unmeasured · load ${load()} at end`);
