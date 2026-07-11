# BI.W-PROMOTE-PRIMITIVES — the buried-primitive PROMOTE set (byte-neutral)

> **Wave id:** `BI.W-PROMOTE-PRIMITIVES` · **band:** S3 (RECURSIVE COLOCATION) · **class:** `H` (device-free) ·
> **gate:** `proof:import-boundaries` (G4 buried-primitive arm) · **preconds:** BI.W-FLATTEN-MOVE.

## §0 — Verdict

A shared primitive resident inside ONE component that ≥2 OTHERS reach into is the buried-primitive vice — it
PROMOTES OUT to a shared home (§1.5). The flatten's `proof:import-boundaries` is born-RED with 25 cross-component
GUTS reaches; the buried-primitive subset promotes here. The class is BYTE-NEUTRAL (190→190) — a location move,
not a graph change.

## §1 — The PROMOTE set (§1.5 G4 drivers, real edges verified)

1. **`aurora/constants/budget.ts` → shared** — reached by 12 files across 7 viz families. The most-reached buried
   primitive; the viz-family budget constant belongs in a shared home, not inside aurora.
2. **`procedural-color.wgsl.ts` → `composables/glass/webgl/shaders/`** — reached by 6 sibling shaders (the ONE
   color-math chunk both backends splice). It joins its GLSL twin in the shared shader home.
3. **`curlFBM` → shared field operator** — the real edge is `concentric → liquid-grid/index.ts` (a viz reaching
   into another viz's barrel for the curl operator). Promote the basis-agnostic curl operator to the shared field
   home (the `flow.glsl.ts`/`flow.wgsl.ts` chunk lineage).

*(`useDockHold` is promoted WITH `dockContext` in BI.W-PROMOTE-CONTEXT, not here — it rides the context promote.)*

## §2 — Binding criteria (born-RED → GREEN)

- Born-RED: `proof:import-boundaries` reds each buried-primitive `components → other-component GUTS` reach (part
  of the 25).
- GREEN: each primitive lives at its shared home; the ≥2 reaching families import the shared path; the class is
  chunk-neutral (`profile:budget` 190→190); typecheck 0; build 0.

## §3 — Fences

- Only the buried-PRIMITIVE subset (≥2 OTHERS reach) promotes; a single-owner leaf STAYS (FOLD, not PROMOTE — the
  count decides). The FOLD end is BI.W-FOLD-CENSUS.
- The direct-SFC-guts reaches that are NOT buried primitives (e.g. `ContinuousMarkers → HoverPopover.vue`) are
  NOT resolved here — they are enumerated + decided in BI.W-GUTS-RESIDUAL (barrel re-point vs defer).
- ZERO paint change (location moves; chunk-neutral).

## §4 — Cross-refs

§1.5 (PROMOTE-primitive, §6 G4); Appendix A1′ (the 25 buried primitives); §6 G4 (cross-component-GUTS arm).
