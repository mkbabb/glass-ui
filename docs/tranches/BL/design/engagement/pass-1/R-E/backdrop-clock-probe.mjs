#!/usr/bin/env node
// R-E · does each engine run a ::backdrop opacity TRANSITION (with and without @starting-style, with a delay)?
// Reads the computed ::backdrop opacity at 0, 150, 600 and 1500 ms after the engaged attribute lands on an open popover.
import os from "node:os";
const pw = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs")).default;
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const CASES = {
  "transition, no starting-style": "",
  "transition + @starting-style": "@starting-style { #p[data-e]::backdrop { opacity: 0 } }",
};
for (const name of ["chromium", "webkit"]) {
  const b = await pw[name].launch();
  for (const [k, extra] of Object.entries(CASES)) {
    const p = await b.newPage();
    await p.setContent(`<style>#p::backdrop{opacity:0;background:red;transition:opacity 200ms ease} #p[data-e]::backdrop{opacity:1;transition:opacity 300ms ease 100ms} ${extra}</style><div id=p popover=manual>p</div>`);
    const r = await p.evaluate(async () => {
      const p = document.getElementById("p"); p.showPopover(); p.setAttribute("data-e", ""); const out = []; const t0 = performance.now();
      for (const t of [0, 150, 600, 1500]) { while (performance.now() - t0 < t) await new Promise((r) => requestAnimationFrame(r)); out.push(`${t}ms ${(+getComputedStyle(p, "::backdrop").opacity).toFixed(3)}`); }
      return out.join(" · ") + ` · animations ${document.getAnimations().length}`;
    });
    console.log(`${name.padEnd(8)} ${k.padEnd(32)} ${r} · load ${load()}`);
    await p.close();
  }
  await b.close();
}
