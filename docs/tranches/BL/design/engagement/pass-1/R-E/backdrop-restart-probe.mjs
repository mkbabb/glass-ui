#!/usr/bin/env node
// R-E · does a later style change on the popover host RESTART its ::backdrop's @starting-style transition? Three
// triggers 500 ms after the engage: a transition on the host ending (scale 1 → 1.06, 300 ms), an inline custom property
// write on the host, a child mounting. Samples the backdrop opacity every frame for 1.2 s; prints its minimum after 450 ms.
import os from "node:os";
const pw = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs")).default;
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const CSS = `#p{inset:auto;left:10px;top:10px;margin:0;scale:1;transition:scale 300ms} #p[data-e]{scale:1.06}
 #p::backdrop{opacity:0;background:red;transition:opacity 200ms} #p[data-e]::backdrop{opacity:1;transition:opacity 300ms ease 100ms}
 @starting-style{ #p[data-e]::backdrop{opacity:0} }`;
for (const name of ["chromium", "webkit"]) {
  const b = await pw[name].launch();
  for (const trig of ["none", "host transition only", "inline var write at 500ms", "child mount at 500ms"]) {
    const p = await b.newPage(); await p.setContent(`<style>${CSS}</style><div id=p popover=manual>p</div>`);
    const r = await p.evaluate(async (trig) => {
      const p = document.getElementById("p"); p.showPopover(); p.setAttribute("data-e", "");
      if (trig === "none") p.style.transition = "none";
      const s = []; const t0 = performance.now(); let did = false;
      while (performance.now() - t0 < 1200) {
        const t = performance.now() - t0;
        if (!did && t > 500) { did = true; if (trig.startsWith("inline")) p.style.setProperty("--x", "1"); if (trig.startsWith("child")) p.append(document.createElement("span")); }
        s.push([t, +getComputedStyle(p, "::backdrop").opacity]); await new Promise((r) => requestAnimationFrame(r));
      }
      const late = s.filter(([t]) => t > 450).map(([, o]) => o);
      return `min after 450 ms ${Math.min(...late).toFixed(2)} · at end ${late.at(-1).toFixed(2)} · ${s.length} frames`;
    }, trig);
    console.log(`${name.padEnd(8)} ${trig.padEnd(28)} ${r} · load ${load()}`);
    await p.close();
  }
  await b.close();
}
