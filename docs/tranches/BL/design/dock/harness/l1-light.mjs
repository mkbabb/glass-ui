// L1 · the lighting census (H4-11, pass-4/H4.md; owner ruling O-87: iOS 27 everywhere, flatter, more
// refined, deft, slightly less blur; no added lighting layer).
//
//   node l1-light.mjs --build <dir> [--adapter <a>] --ref-build <dir> [--ref-adapter <a>] [--engine …] [--out <dir>]
//   node l1-light.mjs --fixture pass|<fault> [--engine …] [--out <dir>]     (the reference is the fixture `pass`)
//
// Per theme (light, dark) and state (collapsed, expanded at rest; in flight 100 ms into a warm expand) on
// scene morph, a census of every element under the dock root and its ::before / ::after:
//   shadow    box-shadow layers (outer and inset), text-shadow layers, drop-shadow() in filter
//   gradient  gradient layers in background-image (a sheen, a gleam, a bevel drawn as a gradient)
//   pseudo    pseudo-elements that paint (content set, and a background, a gradient, a shadow or a border)
//   blur      the largest blur() in backdrop-filter and filter (RECORD: O-87's "slightly less blur" is the
//             token wave's)
//   idle      infinite animations running on dock elements at rest
// Checks:
//   added  the dock's totals of shadow, gradient and pseudo layers are ≤ the reference build's in the same
//          theme and state (the floor; floor v3 once it lands). Totals, not per element, so a route that
//          renames or regroups elements is judged on what it paints, and one that adds an element carrying a
//          shadow or a gleam fails. Without a reference the cell is RECORD
//   idle   no infinite animation runs under the dock at rest (an idle shimmer, pulse or breathe carries no state)
// Frames: a PNG of the dock in each theme and state, for the eyes-on read against O-87 (RECORD).
import fs from "node:fs";
import path from "node:path";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, waitRest, extentNow, r2 } from "./lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const refTarget = args.fixture ? (args.fixture === "pass" ? null : await openTarget({ fixture: "pass" })) : args["ref-build"] ? await openTarget({ build: args["ref-build"], adapter: args["ref-adapter"] }) : null;
const out = outDir(args, "L1");
const rep = makeReport("L1", target);
const KINDS = ["shadow", "gradient", "pseudo"];

const CENSUS = `() => {
  const root = window.__dockProbe.root(); const hp = window.__hp;
  const layers = (v) => { if (!v || v === "none") return 0; let d = 0, n = 1; for (const c of v) { if (c === "(") d++; else if (c === ")") d--; else if (c === "," && d === 0) n++; } return n; };
  const grads = (v) => (v && v !== "none" ? (v.match(/gradient\\(/g) ?? []).length : 0);
  const blurOf = (v) => { let m = 0; for (const x of (v ?? "").matchAll(/blur\\(([\\d.]+)px\\)/g)) m = Math.max(m, parseFloat(x[1])); return m; };
  const t = { shadow: 0, gradient: 0, pseudo: 0, blur: 0, idle: [], by: [] };
  for (const el of [root, ...root.querySelectorAll("*")]) {
    if (el instanceof SVGElement && el.tagName.toLowerCase() !== "svg") continue;
    for (const ps of ["", "::before", "::after"]) {
      const cs = getComputedStyle(el, ps || null);
      if (ps && (cs.content === "none" || cs.content === "normal" || cs.display === "none")) continue;
      if (!ps && (cs.display === "none" || cs.visibility === "hidden")) continue;
      const sh = layers(cs.boxShadow) + layers(cs.textShadow) + (cs.filter.match(/drop-shadow\\(/g) ?? []).length;
      const gr = grads(cs.backgroundImage);
      const bg = cs.backgroundColor; const bgPaint = !/rgba\\([^)]*,\\s*0\\)|transparent/.test(bg);
      const border = parseFloat(cs.borderTopWidth) > 0 && !/rgba\\([^)]*,\\s*0\\)|transparent/.test(cs.borderTopColor);
      const pp = ps && (bgPaint || gr > 0 || sh > 0 || border) ? 1 : 0;
      const bl = Math.max(blurOf(cs.backdropFilter || cs.webkitBackdropFilter), blurOf(cs.filter));
      t.shadow += sh; t.gradient += gr; t.pseudo += pp; t.blur = Math.max(t.blur, bl);
      if (sh || gr || pp || bl) t.by.push(hp.label(el) + ps + " sh " + sh + " gr " + gr + (pp ? " pseudo" : "") + (bl ? " blur " + bl : ""));
    }
    for (const a of el.getAnimations()) { const tm = a.effect?.getTiming?.(); if (a.playState === "running" && tm && tm.iterations === Infinity) t.idle.push(hp.label(el) + " " + (a.animationName || a.transitionProperty || "waapi")); }
  }
  return t;
}`;

async function census(browser, tgt, theme, state, frameTo = null) {
    const s = await openScene(browser, tgt, "morph", { theme });
    try {
        await s.page.mouse.move(2, 2);
        if (state !== "collapsed") { await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 500, cap: 7000 }); }
        if (state === "inflight") { await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 500, cap: 7000 }); await s.page.evaluate(() => window.__scene.expand()); await s.page.waitForTimeout(100); }
        else await s.page.waitForTimeout(600);
        const c = await s.page.evaluate(`(${CENSUS})()`);
        if (frameTo) { const e = await extentNow(s.page); await s.page.screenshot({ path: frameTo, clip: { x: Math.max(0, e.l - 24), y: Math.max(0, e.t - 24), width: e.w + 48, height: e.h + 48 } }); }
        return c;
    } finally { await s.close(); }
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        for (const theme of ["light", "dark"]) for (const state of ["collapsed", "expanded", "inflight"]) {
            const cell = `l1·${theme}·${state}`;
            await rep.guard(engine, [cell + tag], async () => {
                const frame = path.join(out, `frame-${engine}-${theme}-${state}.png`);
                const c = await census(browser, target, theme, state, frame);
                const ref = refTarget ? await census(browser, refTarget, theme, state) : args.fixture === "pass" ? c : null;
                const checks = { idle: state === "inflight" || c.idle.length === 0 };
                if (ref) checks.added = KINDS.every((k) => c[k] <= ref[k]);
                const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
                const deltas = ref ? KINDS.map((k) => `${k} ${c[k]} (ref ${ref[k]})`).join(", ") : KINDS.map((k) => `${k} ${c[k]}`).join(", ");
                rep.add({ engine, cell: cell + tag, pass: !failed.length, failed, census: c, ref: ref ? { shadow: ref.shadow, gradient: ref.gradient, pseudo: ref.pseudo, blur: ref.blur } : null, frame,
                    summary: `${deltas}; blur ${c.blur} px${ref ? ` (ref ${ref.blur})` : ""} (RECORD); idle infinite animations ${state === "inflight" ? "not judged in flight" : c.idle.length}${c.idle.length ? " (" + c.idle.slice(0, 2).join("; ") + ")" : ""}${ref ? "" : "; no reference: `added` not judged"}; frame ${path.basename(frame)}${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
            });
        }
    } finally {
        await browser.close();
    }
}
await target.close();
if (refTarget) await refTarget.close();
rep.finish(out);
