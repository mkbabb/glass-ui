#!/usr/bin/env node
// floor-v3/probes/tile-geometry.mjs · FV3-4: the tile's geometry reads the one fact, at every size, and refuses a
// consumer corner. Scene `pill-icon` (a md group of three items, the library arm); the probe writes the fact the way a
// consumer or a route would (an unlayered `.toggle-group[data-group] { --selection-tile: <arm> }`) and sets the group's
// `data-size` to sm, md and lg. Per cell, item 0: the fact it reads, the computed and used corner (CSS Backgrounds 3
// §5.5: min(r, h/2, w/2)), the four pads, flex-direction, line-height, align-self, text-align, the perimeter switch.
// Want: corner 16px, pads var(--space-atom) / var(--space-body) (sm var(--space-residue) / var(--space-atom)), column,
// body leading (1.5 × the font size), stretch, start, perimeter 1.
//   --naive   also inject the M-11 cure in its naive form (pass-3 `D′c` §4): the tile geometry as a BARE
//             `.toggle-group__item` rule inside `@container not style(--selection-tile: none)`, pads spelled on the
//             item. On floor v2 this measures the lg trap: the (0,3,0) size rule's `padding-inline` outranks it.
//   --corner  per size, the consumer corner forms against the tile: a `rounded-full` utility in @layer utilities, an
//             unlayered rule of higher specificity, an unlayered `!important`, an inline style, and (INFO) an inline
//             `!important`. Want 16px on every form but the last.
//   node tile-geometry.mjs --build <out>/builds/<label> --engine chromium|webkit [--arm flush|plated] [--naive] [--corner]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";

const args = parseArgs();
const engine = args.engine === "webkit" ? "webkit" : "chromium";
const arm = args.arm === "plated" ? "plated" : "flush";
const lock = await acquireLock("fv3-tile-geometry");
const target = await openTarget(args);
console.log(`FV3-4 tile-geometry probe · ${target.label} (flavor ${target.meta.flavor}) · ${await engineVersion(engine)} · fact ${arm}${args.naive ? " · NAIVE geometry injected" : ""}${args.corner ? " · consumer corner forms" : ""} · load ${load()} at start`);
const NAIVE = `@layer components { @container not style(--selection-tile: none) { .toggle-group__item {
  border-radius: var(--radius-field) !important; flex-direction: column; align-items: stretch; justify-content: flex-start;
  gap: var(--space-residue); padding: var(--space-atom) var(--space-body); text-align: start; line-height: var(--type-leading-body); } } }`;
const FORMS = [
  ["none", null, true],
  ["utility", { css: "@layer utilities { .fv3-rounded-full { border-radius: 9999px; } }", cls: "fv3-rounded-full" }, true],
  ["scoped", { css: "main [data-scene] [data-group] .toggle-group__item.fv3-scoped { border-radius: 9999px; }", cls: "fv3-scoped" }, true],
  ["important", { css: ".toggle-group__item.fv3-imp { border-radius: 9999px !important; }", cls: "fv3-imp" }, true],
  ["inline", { style: "border-radius: 9999px" }, true],
  ["inline-important", { style: "border-radius: 9999px !important" }, false],
];
let pass = 0, n = 0;
for (const mode of ["light", "dark"]) for (const size of ["sm", "md", "lg"]) for (const [form, f, gates] of args.corner ? FORMS : [FORMS[0]]) {
  const P = await openPage(target, engine, "pill-icon", { mode });
  const r = await P.page.evaluate(async ({ arm, size, naive, NAIVE, f }) => {
    const add = (css) => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); };
    add(`.toggle-group[data-group] { --selection-tile: ${arm}; }`);
    if (naive) add(NAIVE);
    const g = document.querySelector("[data-group]"); g.setAttribute("data-size", size);
    const el = g.querySelector("[data-item]");
    if (f?.css) add(f.css);
    if (f?.cls) el.classList.add(f.cls);
    if (f?.style) el.setAttribute("style", f.style);
    await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
    const cs = getComputedStyle(el), b = el.getBoundingClientRect();
    const rad = parseFloat(cs.borderTopLeftRadius);
    const probe = document.createElement("div"); probe.style.cssText = "position:absolute;visibility:hidden;padding:var(--space-atom) var(--space-body) var(--space-residue) 0"; document.body.append(probe);
    const pc = getComputedStyle(probe); const tok = { atom: pc.paddingTop, body: pc.paddingRight, residue: pc.paddingBottom }; probe.remove();
    return { fact: cs.getPropertyValue("--selection-tile").trim(), radius: cs.borderTopLeftRadius, used: Math.min(rad, b.height / 2, b.width / 2),
      w: b.width, h: b.height, pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft], dir: cs.flexDirection,
      lh: cs.lineHeight, fs: cs.fontSize, self: cs.alignSelf, ta: cs.textAlign, per: cs.getPropertyValue("--selection-perimeter").trim(), tok };
  }, { arm, size, naive: !!args.naive, NAIVE, f });
  await P.close();
  const wantPad = size === "sm" ? [r.tok.residue, r.tok.atom] : [r.tok.atom, r.tok.body];
  const padOk = r.pad[0] === wantPad[0] && r.pad[2] === wantPad[0] && r.pad[1] === wantPad[1] && r.pad[3] === wantPad[1];
  const lhOk = Math.abs(parseFloat(r.lh) - 1.5 * parseFloat(r.fs)) < 0.05;
  const geomOk = r.fact === arm && r.radius === "16px" && Math.abs(r.used - 16) < 0.01 && padOk && r.dir === "column" && lhOk && r.self === "stretch" && r.ta === "start" && r.per === "1";
  const ok = form === "none" ? geomOk : r.radius === "16px" && Math.abs(r.used - 16) < 0.01;
  if (gates) { n++; if (ok) pass++; }
  console.log(`  ${gates ? (ok ? "PASS" : "FAIL") : "INFO"} ${engine} ${mode} ${size}${form !== "none" ? ` · consumer corner by ${form}` : ""} · fact ${r.fact} · ${r.w.toFixed(2)}×${r.h.toFixed(2)} · corner ${r.radius} → used ${r.used.toFixed(2)} · pad ${r.pad.join(" ")} (want ${wantPad[0]} ${wantPad[1]}) · ${r.dir} · line-height ${r.lh} at ${r.fs} · align-self ${r.self} · text-align ${r.ta} · perimeter ${r.per} · load ${load()}`);
}
console.log(`${pass}/${n} gating cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(pass === n ? 0 : 1);
