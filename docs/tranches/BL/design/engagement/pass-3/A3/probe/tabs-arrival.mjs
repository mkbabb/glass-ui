// P-A3 probe: what moves on the tabs' in-task arrival (CK-03). One browser, a context per cell, closed in finally.
//   node tabs-arrival.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
try {
  for (const mode of ["own", "ownflush"]) {
    const P = await openPage(E, T, "tabs", { theme: "light", q: { defer: "1" } });
    try {
      const r = await P.page.evaluate(async (mode) => {
        const raf = () => new Promise((ok) => requestAnimationFrame(ok));
        await window.__e.mount();
        const strip = document.querySelector(".segmented-tabs"); const ind = document.querySelector(".segmented-indicator");
        const at0 = { arming: strip?.hasAttribute("data-engage-arming"), tp: ind && getComputedStyle(ind).transitionProperty };
        if (mode === "ownflush") for (const e of document.querySelectorAll("main *")) { getComputedStyle(e).opacity; }
        window.__e.commit();
        const fr = [];
        for (let k = 0; k < 30; k++) { await raf(); const cs = getComputedStyle(ind); fr.push({ k, arming: strip.hasAttribute("data-engage-arming"), tr: cs.translate, w: cs.width, st: cs.getPropertyValue("--stretch").trim(), sc: cs.scale, tf: cs.transform, anims: ind.getAnimations().map((x) => `${x.constructor.name}:${x.transitionProperty ?? x.animationName ?? x.id}`).join(";"), r: Math.round(ind.getBoundingClientRect().left * 10) / 10 }); }
        return { at0, fr };
      }, mode);
      console.log(`# ${mode} engine ${E.name} load ${load()} at0 ${JSON.stringify(r.at0)}`);
      for (const f of r.fr.slice(0, 14)) console.log(JSON.stringify(f));
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
