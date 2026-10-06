#!/usr/bin/env node
// D4-D′ prototype probe · §7.3 item 9 (Q-5 (b) and the DEV name) and the E-11 corner guard, on one flavour.
//   --part rows    (default) on each scene, append one line to item 0's line slot the way W-E does and read, 600 ms
//                  later, the item's block against its rung (a pill must stay at the rung, the second row cut at the
//                  plate: "REFUSED in paint"), whether the appended row is cut, and every console error (the DEV
//                  name). The unmigrated K1/K2 arms (`-verbatim`) carry the shipped compositions: K1's `flex-col`
//                  pills and K2's unlayered `height: auto`, the case the spec's `block-size` could not refuse (R-1).
//                  The refusal gates on `dist` (H-9); the name is expected on `src-dev` only. The pill scenes
//                  (`single`, `vertical`, `pill-icon`, `pill-badge`, `c1-migrated`) are the false-positive controls.
//   --part corner  the E-11 guard for the silent binding: a consumer corner on a `cell` item. Each migrated tile
//                  scene is loaded with an unlayered `[data-arm="migrated"] [data-item] { border-radius: 6px }`
//                  present BEFORE mount (an init script), and without it (the control). Expected on `src-dev`: one
//                  "is a tile with a 6px corner" error per item with the rule, 0 without. `dist`: 0 either way.
//   node refusal.mjs --build <out>/builds/<label> [--part rows|corner] [--engines chromium,webkit] [--scenes a,b]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";
const args = parseArgs();
const part = String(args.part ?? "rows");
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock(`dp-proto-refusal-${part}`);
const target = await openTarget(args);
console.log(`refusal probe · part ${part} · ${target.label} (flavor ${target.meta.flavor}, dev ${target.meta.dev}) · load ${load()} at start`);
const errors = (P) => P.logs.filter((l) => l.type === "error" || l.type === "pageerror").map((l) => l.text);
const ROWS = "preset,specimen,preset-verbatim,specimen-verbatim,family-d-undeclared,single,vertical,pill-icon,pill-badge,c1-migrated,preset-migrated,specimen-migrated";
const TILES = "preset-migrated,specimen-migrated,strip-migrated,f1-migrated,v2-migrated,family-d";
const CORNER = `[data-arm="migrated"] [data-item], [data-scene="family-d"] [data-item] { border-radius: 6px; }`;
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  if (part === "rows") for (const scene of String(args.scenes ?? ROWS).split(",")) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    await P.page.waitForTimeout(400);
    const atMount = errors(P).length;
    const r = await P.page.evaluate(async () => {
      const it = document.querySelector("[data-item]"); const slot = it.querySelector("[data-line-slot]") ?? it;
      const rung = parseFloat(getComputedStyle(it).minBlockSize); const h0 = it.getBoundingClientRect().height;
      const extra = document.createElement("div"); extra.textContent = "one more line"; slot.append(extra);
      await new Promise((res) => setTimeout(res, 600));
      const ir = it.getBoundingClientRect(), er = extra.getBoundingClientRect();
      return { rung, h0, h1: ir.height, cut: er.bottom > ir.bottom + 0.5, shape: it.closest("[data-shape]")?.getAttribute("data-shape") ?? "none" };
    });
    const errs = errors(P);
    const verdict = r.shape === "cell" ? "n/a (a declared tile grows)" : Math.abs(r.h0 - r.rung) < 0.5 && Math.abs(r.h1 - r.rung) < 0.5 ? "REFUSED in paint (held at the rung)" : "NOT refused (off its rung)";
    console.log(`  ${engine} ${scene} (shape ${r.shape}) · rung ${r.rung.toFixed(2)} · block ${r.h0.toFixed(2)} → ${r.h1.toFixed(2)} · appended row cut ${r.cut} · ${verdict} · console errors ${errs.length} (${atMount} at mount)${errs.length ? `: ${errs[0].slice(0, 170)}` : ""} · load ${load()}`);
    await P.close();
  }
  if (part === "corner") for (const scene of String(args.scenes ?? TILES).split(",")) for (const planted of [true, false]) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    if (planted) {
      // when the document turns `interactive`, which the HTML spec orders BEFORE deferred and module scripts run
      // (a DOMContentLoaded hook fires after the module has mounted the app: corner-*-dcl.log; a <style> appended
      // under <html> at document start did not reach the cascade: corner-*-docstart.log)
      await P.page.context().addInitScript((css) => { document.addEventListener("readystatechange", () => { if (document.readyState !== "interactive") return; const s = document.createElement("style"); s.textContent = css; document.head.append(s); }); }, CORNER);
      P.logs.length = 0;
      await P.page.reload(); await P.page.waitForFunction(() => window.__tile && window.__tile.ready === true);
    }
    await P.page.waitForTimeout(500);
    const r = await P.page.evaluate(() => { const its = [...document.querySelectorAll("[data-item]")]; return { n: its.length, corner: getComputedStyle(its[0]).borderTopLeftRadius, shape: its[0].closest("[data-shape]")?.getAttribute("data-shape") ?? "none" }; });
    const errs = errors(P).filter((t) => t.includes("[ToggleGroupItem]"));
    const corner = errs.filter((t) => t.includes("is a tile with a"));
    const ok = planted ? (target.meta.dev ? corner.length === r.n : corner.length === 0) : corner.length === 0;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${planted ? "consumer corner 6px" : "control (no consumer corner)"} · shape ${r.shape} · items ${r.n} · corner ${r.corner} · named ${corner.length}/${r.n}${corner.length ? `: ${corner[0].slice(0, 170)}` : ""} · other [ToggleGroupItem] errors ${errs.length - corner.length} · load ${load()}`);
    await P.close();
  }
}
console.log(`load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
