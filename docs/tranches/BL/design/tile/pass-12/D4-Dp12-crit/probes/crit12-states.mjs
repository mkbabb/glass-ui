#!/usr/bin/env node
// D4 pass 12 · CRITIC · the ONE NAMED ATTACK (REGISTRY §P11-5 (2)): the `states` forced-colours arm, read in both engines
// through matchMedia, not the engine name. A copy of the carried probe's a11y part (pass-3/D4-Dp-spec/probes/states.mjs,
// whose line 79 drops forced colours from Playwright WebKit by engine name: L-9), with two changes and one new part.
// It reads this seat's own cells. It does not edit H9 and does not replace the H9 or the carried reading.
//   --part a11y     as the carried part, but the media list is the same for every engine: contrast more AND forced
//                   colours. After emulateMedia the cell asks matchMedia; a condition the engine did not apply reads
//                   UNMEASURED, never PASS and never silently dropped. Gating: the selected tile's box and content do
//                   not move (< 0.5 px), as in the carried part.
//   --part forced   NEW, the forced pair. In a context opened with forcedColors "active" (openPage mode "forced",
//                   verify.forced = matchMedia), per site and engine, three cells:
//                     pair    the selected item's computed background-color and color equal the engine's resolved
//                             `Highlight` and `HighlightText` (resolved on a probe element in the same page), and an
//                             unselected sibling's background-color does not equal Highlight;
//                     fill    the selected plate's interior paint (ink hidden, scale pinned, T-3's crops) against the
//                             unselected sibling's at >= 3:1 (measure.mjs selectedSeparation's fill);
//                     carrier T-3's own verdict under forced colours (judgeT3: fill >= 3 or the >= 3:1 carrier area
//                             over the bar), reported beside the two.
//                   Gating: pair and fill. The plant that removes the selected rule's forced pair (background:
//                   Highlight; color: HighlightText) must FAIL pair and fill in both engines.
//   node crit12-states.mjs --build <out>/builds/<label> --part a11y|forced [--engines chromium,webkit] [--sites a,b]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";
import { selectedSeparation, judgeT3, tagItems } from "../../../harness/measure.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const part = String(args.part ?? "forced");
const SITES = String(args.sites ?? "preset-migrated,specimen-migrated,strip-migrated,c1-migrated").split(",");
const lock = await acquireLock(`crit12-states-${part}`);
const target = await openTarget(args);
console.log(`D4 pass-12 critic · crit12-states · part ${part} · ${target.label} · load ${load()} at start`);
let pass = 0, n = 0, unmeasured = 0;
const wait = (P, ms) => P.page.waitForTimeout(ms);
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const scene of SITES) {
    if (part === "a11y") {
      for (const media of [{ contrast: "more" }, { forcedColors: "active" }]) {
        const P = await openPage(target, engine, scene, { mode: "light" });
        try {
          await tagItems(P);
          const read = () => P.page.evaluate(() => { const th = window.__th, its = th.items(); const s = its.findIndex((e) => th.on(e)); const el = its[s], r = el.getBoundingClientRect(), cs = getComputedStyle(el), b = getComputedStyle(el, "::before"); const kid = el.firstElementChild.getBoundingClientRect(); return { w: r.width, h: r.height, kidX: kid.x - r.x, kidY: kid.y - r.y, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, perim: `${b.borderTopWidth} ${b.borderTopColor} opacity ${b.opacity}` }; });
          const a = await read();
          await P.page.emulateMedia(media); await wait(P, 400);
          const q = media.contrast ? "(prefers-contrast: more)" : "(forced-colors: active)";
          const applied = await P.page.evaluate((q) => matchMedia(q).matches, q);
          const b = await read();
          const moved = Math.max(Math.abs(a.kidX - b.kidX), Math.abs(a.kidY - b.kidY), Math.abs(a.w - b.w), Math.abs(a.h - b.h));
          if (!applied) { unmeasured++; console.log(`  UNMEASURED ${engine} ${scene} ${JSON.stringify(media)} · matchMedia ${q} false after emulateMedia · load ${load()}`); continue; }
          const ok = moved < 0.5; n++; if (ok) pass++;
          console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${JSON.stringify(media)} · matchMedia ${q} true · content moved ${moved.toFixed(2)} px (box ${a.w.toFixed(2)}×${a.h.toFixed(2)} → ${b.w.toFixed(2)}×${b.h.toFixed(2)}) · border ${b.border} · perimeter ${b.perim} · load ${load()}`);
        } finally { await P.close(); }
      }
    } else if (part === "forced") {
      const P = await openPage(target, engine, scene, { mode: "forced" });
      try {
        if (!P.modeOk) { unmeasured += 2; console.log(`  UNMEASURED ${engine} ${scene} forced · matchMedia (forced-colors: active) false · load ${load()}`); continue; }
        await tagItems(P);
        const r = await P.page.evaluate(() => {
          const th = window.__th, its = th.items(); const s = its.findIndex((e) => th.on(e)); const u = s === 0 ? 1 : 0;
          const probe = document.createElement("div"); probe.style.cssText = "position:absolute;left:-9999px;background-color:Highlight;color:HighlightText;border:1px solid Canvas";
          document.body.append(probe); const pc = getComputedStyle(probe);
          const sys = { hl: pc.backgroundColor, hlt: pc.color, canvas: pc.borderTopColor }; probe.remove();
          const rd = (i) => { const cs = getComputedStyle(its[i]); const lbl = its[i].querySelector("[data-line-slot]") ?? its[i]; return { bg: cs.backgroundColor, ink: getComputedStyle(lbl).color, border: cs.borderTopColor, state: its[i].getAttribute("data-state") }; };
          return { s, u, sys, sel: rd(s), uns: rd(u) };
        });
        const pairOk = r.s >= 0 && r.sel.bg === r.sys.hl && r.sel.ink === r.sys.hlt && r.uns.bg !== r.sys.hl;
        n++; if (pairOk) pass++;
        console.log(`  ${pairOk ? "PASS" : "FAIL"} ${engine} ${scene} forced pair · selected #${r.s} (${r.sel.state}) bg ${r.sel.bg} ink ${r.sel.ink} border ${r.sel.border} · unselected #${r.u} bg ${r.uns.bg} ink ${r.uns.ink} · system Highlight ${r.sys.hl} HighlightText ${r.sys.hlt} Canvas ${r.sys.canvas} · load ${load()}`);
        const j = judgeT3(await selectedSeparation(P));
        const fillOk = !!j.fillPass; n++; if (fillOk) pass++;
        console.log(`  ${fillOk ? "PASS" : "FAIL"} ${engine} ${scene} forced fill · ${j.fillLine} · load ${load()}`);
        console.log(`  info ${j.pass ? "PASS" : "FAIL"} ${engine} ${scene} forced T-3 verdict · ${j.line}`);
      } finally { await P.close(); }
    }
  }
}
console.log(`${pass}/${n} cells pass${unmeasured ? ` · ${unmeasured} UNMEASURED` : ""} · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
