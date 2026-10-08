#!/usr/bin/env node
// R-E · platform probe for D5-E (the engaged stage). Plain pages, no library: what the top layer gives a held control.
//   A  ::backdrop takes backdrop-filter + a mask built from a custom property it inherits from its popover (Q-3)
//   B  promote IN PLACE: a pointer-captured, focused element gets popover=manual + showPopover() mid-drag
//   C  MOVED NODE: the same element appended into a separate popover mid-drag (the "moved node" projection, Q-1)
//   D  anchor positioning: a top-layer element pinned to a placeholder with anchor()/anchor-size()
//   E  support: overlay, allow-discrete, anchor-size(), position-area
// node platform-probe.mjs [--engine chromium|webkit]   (both by default) — prints one line per read with the load.
import os from "node:os";
const pw = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs")).default;
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const engines = process.argv.includes("--engine") ? [process.argv[process.argv.indexOf("--engine") + 1]] : ["chromium", "webkit"];

const PAGE = `<!doctype html><html><head><style>
 body { margin:0; height:100vh; background: repeating-linear-gradient(90deg,#000 0 4px,#fff 4px 8px); }
 #wrap { position:absolute; left:100px; top:100px; width:300px; transform: translateZ(0); backdrop-filter: blur(1px); }
 #ctl { width:300px; height:40px; background:#e33; touch-action:none; }
 #ctl[popover] { inset:auto; margin:0; border:0; padding:0; overflow:visible; background:#e33;
   position-anchor: --ph; left: anchor(left); top: anchor(top); width: anchor-size(width); height: anchor-size(height); }
 #ph { anchor-name: --ph; width:300px; height:40px; }
 #ctl::backdrop { backdrop-filter: blur(6px);
   mask-image: linear-gradient(to right, transparent calc(var(--veil-x) - 80px), black var(--veil-x), transparent calc(var(--veil-x) + 80px)); }
 #other { inset:auto; left:0; top:300px; margin:0; padding:0; border:0; }
</style></head><body>
<div id="wrap"><div id="ph" hidden></div><div id="ctl" tabindex="0"><button id="inner">in</button></div></div>
<div id="other" popover="manual"></div>
<script>
 window.log = [];
 const ctl = document.getElementById('ctl');
 ctl.addEventListener('pointerdown', (e) => { ctl.setPointerCapture(e.pointerId); window.log.push('down'); window.pid = e.pointerId; });
 ctl.addEventListener('pointermove', () => window.log.push('move'));
 ctl.addEventListener('lostpointercapture', () => window.log.push('lost'));
</script></body></html>`;

const lum = (buf, w, x, y, PNG) => 0;
for (const name of engines) {
  const b = await pw[name].launch();
  const out = (k, v) => console.log(`${name.padEnd(8)} ${k.padEnd(34)} ${v} · load ${load()}`);
  try {
    // E support
    {
      const p = await b.newPage(); await p.setContent("<!doctype html><p>x</p>");
      const s = await p.evaluate(() => ({
        overlay: CSS.supports("overlay", "auto"), allowDiscrete: CSS.supports("transition-behavior", "allow-discrete"),
        anchorSize: CSS.supports("width", "anchor-size(width)"), anchorFn: CSS.supports("left", "anchor(left)"),
        positionArea: CSS.supports("position-area", "center"), anchorCenter: CSS.supports("justify-self", "anchor-center"),
        startingStyle: typeof CSSStartingStyleRule !== "undefined", popover: HTMLElement.prototype.hasOwnProperty("popover"),
        typedArith: CSS.supports("scale", "calc(10px / 5px)"),
      }));
      out("E support", JSON.stringify(s)); await p.close();
    }
    for (const mode of ["inplace", "moved"]) {
      const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1 });
      const p = await ctx.newPage(); await p.setContent(PAGE);
      const before = await p.evaluate(() => { const r = document.getElementById("ctl").getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
      await p.focus("#inner");
      await p.mouse.move(150, 120); await p.mouse.down(); await p.mouse.move(160, 120);
      const r = await p.evaluate((mode) => {
        const ctl = document.getElementById("ctl"); const ph = document.getElementById("ph");
        if (mode === "inplace") { ph.hidden = false; ctl.style.setProperty("--veil-x", "40%"); ctl.popover = "manual"; ctl.showPopover(); }
        else { const o = document.getElementById("other"); o.showPopover(); o.appendChild(ctl); }
        const rr = ctl.getBoundingClientRect();
        return { cap: ctl.hasPointerCapture(window.pid), active: document.activeElement?.id ?? document.activeElement?.tagName, open: ctl.matches(":popover-open") || document.getElementById("other").matches(":popover-open"), rect: [rr.left, rr.top, rr.width, rr.height] };
      }, mode);
      await p.mouse.move(200, 120); await p.mouse.move(240, 125);
      const after = await p.evaluate(() => ({ log: window.log.join(","), cap: document.getElementById("ctl").hasPointerCapture(window.pid), active: document.activeElement?.id ?? document.activeElement?.tagName }));
      await p.mouse.up();
      out(`${mode === "inplace" ? "B in-place" : "C moved"} promotion`, `rect before ${before.map((x) => x.toFixed(1))} → promoted ${r.rect.map((x) => x.toFixed(1))} · capture right after ${r.cap} · focus right after ${r.active} · capture after 2 moves ${after.cap} · focus ${after.active} · events ${after.log}`);
      if (mode === "inplace") {
        // A: the backdrop paints the blur where the mask is opaque (40% of 700 = 280 px) and nothing where it is clear
        const bs = await p.evaluate(() => { const cs = getComputedStyle(document.getElementById("ctl"), "::backdrop"); return { bf: cs.backdropFilter || cs.webkitBackdropFilter, mask: (cs.maskImage || cs.webkitMaskImage || "").slice(0, 90) }; });
        const shot = await p.screenshot();
        const { PNG } = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js")).default ?? (await import("/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js"));
        const png = PNG.sync.read(shot);
        const contrast = (x0) => { let mn = 255, mx = 0; for (let x = x0; x < x0 + 16; x++) { const i = (450 * png.width + x) * 4; mn = Math.min(mn, png.data[i]); mx = Math.max(mx, png.data[i]); } return mx - mn; };
        out("A ::backdrop veil", `computed backdrop-filter ${bs.bf} · mask ${bs.mask}… · stripe contrast at x=280 (mask core) ${contrast(272)} · at x=600 (mask clear) ${contrast(592)} (255 = untouched stripes)`);
      }
      await ctx.close();
    }
  } catch (e) { out("ERROR", String(e.message).split("\n")[0]); }
  await b.close();
}
