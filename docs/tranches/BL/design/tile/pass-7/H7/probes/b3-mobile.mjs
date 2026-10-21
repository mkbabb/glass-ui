#!/usr/bin/env node
// H7 seat probe (pass 7, not a witness): WHY the responsive strip's mobile root in a tile option (`te`) reads taller than
// the reference responsive strip (H7-3 `mobile-in-tile`). Two hypotheses, separated on paint:
//   FACT    the tile fact reaches the mobile root and its trigger (the @scope limit names `.segmented-tabs`, not
//           `.segmented-tabs__mobile`, B-3), and a tile reader changes them
//   LEADING the option's body leading (the tile's `line-height`) is inherited by the mobile root, a block holding an
//           inline-level trigger, so the root's line box (its strut) is taller than the trigger
// It prints, for `te` and the reference: each element's `--selection-tile`, display, font-size, line-height and box,
// and the trigger's children (display, offset and box against the reference trigger's: does the pill one-row law
// reach inside the trigger), then re-measures the `te` root with its line-height set to the reference root's (LEADING predicts the reference
// height), and with `--selection-tile: none` written on its trigger's inline style (FACT, on the trigger only).
//   node b3-mobile.mjs --build <out>/builds/<label>-atk-src [--engine webkit]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";

const READ = () => {
  const one = (which) => {
    const root = document.querySelector(`[data-mx-stm="${which}"]`);
    if (!root) return null;
    const trig = root.querySelector("button, [role=combobox]");
    const opt = root.closest("[data-mx-item]");
    const s = (el) => { if (!el) return null; const c = getComputedStyle(el), b = el.getBoundingClientRect(); return { tile: c.getPropertyValue("--selection-tile").trim(), display: c.display, fs: c.fontSize, lh: c.lineHeight, h: b.height, w: b.width, top: b.top }; };
    // the trigger's inner layout: each child's display and its box relative to the trigger (label, chevron)
    const tb = trig?.getBoundingClientRect();
    const kids = trig ? [...trig.children].map((k) => { const r = k.getBoundingClientRect(); return `${k.tagName.toLowerCase()} ${getComputedStyle(k).display} @${(r.left - tb.left).toFixed(2)},${(r.top - tb.top).toFixed(2)} ${r.width.toFixed(2)}×${r.height.toFixed(2)}`; }) : [];
    return { root: s(root), trig: s(trig), opt: opt ? { id: opt.dataset.mxItem, ...s(opt) } : null, cls: root.className, kids };
  };
  const t = one("t"), ref = one("ref");
  const out = { t, ref, lhFix: null, trigNone: null };
  const root = document.querySelector('[data-mx-stm="t"]');
  if (root && ref) {
    root.style.lineHeight = ref.root.lh; out.lhFix = root.getBoundingClientRect().height; root.style.lineHeight = "";
    const trig = root.querySelector("button, [role=combobox]");
    if (trig) { trig.style.setProperty("--selection-tile", "none", "important"); out.trigNone = { rootH: root.getBoundingClientRect().height, trigH: trig.getBoundingClientRect().height }; trig.style.removeProperty("--selection-tile"); }
  }
  return out;
};

await cli("B3PROBE", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const mode of ["light", "dark"]) {
    const P = await openPage(target, engine, "matrix-migrated", { mode });
    let r;
    try { r = await P.page.evaluate(READ); } finally { await P.close(); }
    const d = (x) => (x ? `fact ${x.tile || "(unset)"} · ${x.display} · font ${x.fs} / line ${x.lh} · ${f2(x.w)}×${f2(x.h)}` : "none");
    if (!r.t || !r.ref) { cells.push({ gating: false, pass: false, line: `${mode} · composition missing (te ${!!r.t}, ref ${!!r.ref})` }); continue; }
    const leading = r.lhFix !== null && Math.abs(r.lhFix - r.ref.root.h) <= 0.5;
    cells.push({ gating: false, pass: true, line: `${mode} · te option ${r.t.opt ? d(r.t.opt) : "none"}` });
    cells.push({ gating: false, pass: true, line: `${mode} · te mobile root («${r.t.cls}») ${d(r.t.root)} · its trigger ${d(r.t.trig)}` });
    cells.push({ gating: false, pass: true, line: `${mode} · reference mobile root ${d(r.ref.root)} · its trigger ${d(r.ref.trig)}` });
    const same = r.t.kids.join(" | ") === r.ref.kids.join(" | ");
    cells.push({ gating: false, pass: same, line: `${mode} · the trigger's children, te: ${r.t.kids.join(" | ") || "none"} · reference: ${r.ref.kids.join(" | ") || "none"} · ${same ? "the same layout" : "the layout DIFFERS"}` });
    cells.push({ gating: false, pass: leading, line: `${mode} · LEADING test: te root with the reference root's line-height (${r.ref.root.lh}) reads ${f2(r.lhFix)} against the reference ${f2(r.ref.root.h)} · ${leading ? "LEADING explains the height" : "LEADING does NOT explain it"}` });
    cells.push({ gating: false, pass: true, line: `${mode} · FACT test (trigger only): --selection-tile: none !important inline on te's trigger: root ${f2(r.trigNone?.rootH)}, trigger height ${f2(r.trigNone?.trigH)}` });
  }
  return { id: "B3PROBE", title: "why the mobile root in a tile option is taller (H7 seat probe, info only)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
