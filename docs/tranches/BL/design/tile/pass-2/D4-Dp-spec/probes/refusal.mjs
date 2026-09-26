#!/usr/bin/env node
// D4-D′ spec probe · §7.3 item 9 (Q-5 (b) + the DEV name) on a flavour: on each UNDECLARED group (the library arms
// of K1, K2, V1, which under D′ are pills), append one line to item 0's line slot the way W-E does and read, 600 ms
// later, the item's block size against its rung (the structural refusal: it must stay at the rung, the second row
// cut at the plate), whether the appended row is clipped (its bottom past the item's), and every console error
// (the DEV name). The refusal gates on `dist` (H-9); the name is expected on `src-dev` only.
//   node refusal.mjs --build <out>/builds/<label> [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";
const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock("dp-spec-refusal");
const target = await openTarget(args);
console.log(`refusal probe · ${target.label} (flavor ${target.meta.flavor}, dev ${target.meta.dev}) · load ${load()}`);
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const scene of String(args.scenes ?? "preset,specimen,family-d-undeclared,preset-migrated").split(",")) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    const errs = [];
    P.page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    P.page.on("pageerror", (e) => errs.push("pageerror " + e.message));
    // reload with the listeners attached, so an error at mount is counted too
    await P.page.reload(); await P.page.waitForFunction(() => window.__tile && window.__tile.ready);
    const atMount = errs.length;
    const r = await P.page.evaluate(async () => {
      const it = document.querySelector("[data-item]"); const slot = it.querySelector("[data-line-slot]");
      const rung = parseFloat(getComputedStyle(it).minBlockSize); const h0 = it.getBoundingClientRect().height;
      const extra = document.createElement("div"); extra.textContent = "one more line"; extra.setAttribute("data-th-extra", ""); slot.append(extra);
      await new Promise((res) => setTimeout(res, 600));
      const ir = it.getBoundingClientRect(), er = extra.getBoundingClientRect();
      return { rung, h0, h1: ir.height, cut: er.bottom > ir.bottom + 0.5, shape: it.closest("[data-shape]")?.getAttribute("data-shape") ?? "none" };
    });
    const refused = r.shape === "cell" ? "n/a (a declared tile grows)" : Math.abs(r.h1 - r.rung) < 0.5 ? "REFUSED in paint (held at the rung)" : "NOT refused (grew past the rung)";
    console.log(`  ${engine} ${scene} (shape ${r.shape}) · rung ${r.rung.toFixed(2)} · block ${r.h0.toFixed(2)} → ${r.h1.toFixed(2)} · appended row cut ${r.cut} · ${refused} · console errors ${errs.length} (${atMount} at mount)${errs.length ? `: ${errs[0].slice(0, 160)}` : ""}`);
    await P.close();
  }
}
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
