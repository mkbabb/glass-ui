# AY.W-GOD1 — Carve the 6 god-modules <500, RATCHET-gate growth in CI, machine-prove return-shape byte-identity

**Band** E (the AX close — structure) · **Repo** glass-ui · **State** OPEN (re-graded at
Batch-2-complete HEAD by HC-god1-regrade — the §0 recount is the binding target table)
**Runs AFTER** W-CON1/W-CON2/W-CON3 (constellation — LANDED; their growth is IN the §0 counts) +
W-BLOB2/W-BLOB3 (blob) + W-AUR-PAINTERLY (it edits `mediums.glsl.ts:385-386`, the NEW sixth
violator). **Coordinates WITH** W-DOCK2 (also edits `GlassDock.vue`) — the carve-vs-edit
sequencing is fixed in §6. **The RATCHET (§4.R) lands FIRST, before any carve** — it is the
Batch-4 step 0 that makes growth RED in CI while the carves proceed.
**Hardening inputs** `audit/hardening/H-godmodule.md` (F1–F5), `H-blob.md` (F5), `H-constellation.md`
(FINDING 6), `H-dock.md` (D8), `audit/research-necessity/NECESSITY-MATRIX.md` §2 W-GOD1 + §4
Class D (the ratchet mandate), `audit/hardening/hc2/HC-god1-regrade.md` (the HEAD recount).

---

## Goal criterion

Every `src/` `.ts`/`.vue` file is under the 500-line god-module bound, and that bound is
ENFORCED IN CI (not a `local`-only gate the green master can ignore) — **in two stages**: the
RATCHET (§4.R) CI-promotes `proof:no-god-module` IMMEDIATELY with per-violator baselines frozen
at the §0 HEAD counts (any GROWTH of a violator, or any NEW file past 500, reddens CI even
before the carve), then the carves drain the baseline set to ∅. The SIX confirmed god-modules
at HEAD — `constellationField.ts` (959), `useMetaballRenderer.ts` (692), `SegmentedTabs.vue`
(689), `GlassDock.vue` (624), `Constellation.vue` (597), `mediums.glsl.ts` (528) — are carved
into cohesive sibling sub-modules with their PUBLIC return/export surface byte-identical,
MACHINE-proven (not asserted) by a wired return-shape gate. The carve is PURE STRUCTURE: no
consumer of goo-blob, dock, tabs, constellation, or aurora observes a behaviour delta, and the
render-truth gates (`proof:blob-render`, `proof:blob-color-equivalence`, the `proof:dock-*` set,
`proof:tabs-unified`, `proof:constellation-field` + the constellation `-live` set, the
`proof:aurora-*` shader set) stay green across the split.

## Completion criterion

The §7 HARD GATE checklist verifies in full: `proof:no-god-module` is `ci`-tagged in
`gates.mjs` from the §4.R ratchet landing onward (GREEN-with-grandfathers interim), and at close
is GREEN over all SIX §0 files (each < 500) with `RATCHET_BASELINES` drained to ∅; the
return-shape gate (the resurrected `proof:composable-return-types`, re-scoped per §3)
is wired into `package.json` + `gates.mjs` and proves the carved composables' return shapes
byte-identical; the six protected render/behaviour gates stay green; `proof:gen-ci-fresh`
confirms the ci.yml mirror is byte-identical; typecheck + lint clean; the public barrels emit a
byte-identical symbol set (re-export-only diff). No brittleness window.

---

## §0 — The verified defect, RECOUNTED at Batch-2-complete HEAD (the binding target table)

`node scripts/proof-no-god-module.mjs` → **status FAIL, exit 1, SIX violations** (re-run at the
HC-god1-regrade pass; 531 files scanned). This table SUPERSEDES every earlier count in this spec's
history (510→653→959 for the field; 694→707→692 for the renderer): the W-CON2 gravity-well +
W-CON3 freeze/wander finisher work grew the constellation pair past every prior grading, the
W-BLOB3 DI strip EASED the renderer by 15, and TWO violators the original grading never saw are
now over bound (`Constellation.vue`, `mediums.glsl.ts` — the second a `.ts`-suffixed GLSL module
the four-file framing missed entirely).

| file | lines @ HEAD | shed to <500 | shape (verified at HEAD) |
|---|---|---|---|
| `src/components/custom/constellation/constellationField.ts` | **959** | **≥ 459 — the biggest carve in the wave** | pure engine module, ~21 exported fns/consts/ifaces (barrel `constellation/index.ts:3-26`); types/docs `:1-292`, token-reads `:304-368`, seed/refit/step `:379-525` (`stepField:446` calls `stepWell:501` + `warpStep:507` + the wander cadence `:515-525`), **gravity-well cluster `:526-633`** (~108), **warp cluster `:634-815`** (~182, incl. `WARP_*` consts + `DEFAULT_WELL_CONFIG:672` + `nearestNode:689`/`warpStep:730`/`setWarpTarget:762`/`warpTo:783`), **auto-drift cluster `:816-846`** (~31, `warpSettled:818`/`pickWanderTarget:832`), **draw cluster `:847-959`** (~113) |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | **692** | ≥ 192 | pure-TS composable; one `useMetaballRenderer(options)` body `:120-691`; scheduler `:186-212` + park/reschedule `~:600-640`; GL setup `~:233-318` (~85); **`drawFrame` `:319-643`** (~325, the shed); returns a **bare inline `{ pause, resume }`** at `:681-690` — still NO named Return interface |
| `src/components/custom/tabs/SegmentedTabs.vue` | **689** | ≥ 189 (all CSS) | UNCHANGED from the original grading (re-verified): `<script setup>` 1–308 (**307 lines of logic**), `<template>` 310–420 (110), **`<style scoped>` 422–689 = 267 lines of CSS** — a FALSE logic-god-module; §1 stands verbatim |
| `src/components/custom/dock/GlassDock.vue` | **624** | ≥ 124 | SFC; `<script setup>` 1–516 (**515-line script**, grew from the graded 499), `<template>` 518–624 (106), no `<style>`; still carries the STALE `DO-NOT-SPLIT (AW.W15 assay): … 421-line` banner at `:2-6` (now ~203 lines stale) |
| `src/components/custom/constellation/Constellation.vue` | **597** | ≥ 97 | **NEW violator (never graded).** A REAL logic god-module: `<script setup>` 1–569 (**568 lines**), `<template>` 571–575 (5), `<style scoped>` 577–597 (20). The script = props/docs `:1-165`, state/freeze/wander/well wiring `:166-275`, the `useCanvas2D` mount + draw loop `:276-404`, **the pointer/warp/well listener wiring `:405-517`** (~113, the natural shed), `defineExpose` `:518-568` |
| `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` | **528** | ≥ 28 | **NEW violator (never graded).** A `.ts`-suffixed GLSL chunk module: `AURORA_MEDIUMS_PRE_BRUSH_GLSL` `:14-130` (~117) + `AURORA_MEDIUMS_POST_BRUSH_GLSL` `:131-528` (~397: medium-ids `:131`, crayon `:139-195`, StrokeProfile `:196-262`, Van-Gogh `:263-310`, oil-pastel `:311-352`, **oil sub-mode dispatch `:353-528`** ~176). W-AUR-PAINTERLY is actively editing `:385-386` — carve runs AFTER it closes (§6); the ratchet covers it meanwhile |

**Near-bound watch (ratchet-relevant, NOT violations):** `metaball.frag.ts` is **498** — TWO lines
under the bound; any W-BLOB residue edit trips it. `ContinuousMarkers.vue` is **440** (warn band;
the §3b clause-4 datum). 21 files sit in the 301–500 warn band. Under the §4.R ratchet a file
crossing 500 with NO baseline row is RED in CI immediately — the editing wave either carves in the
same diff or books a baseline row (the booking-updates-spec-counts rule).

Six compounding facts make the as-stated "carve N god-modules" framing under-specced:

- **D-CI — the gate is `tags:["local"]`, INVISIBLE to CI.** `gates.mjs:367-371` registers
  `proof:no-god-module` with `tags:["local"]` (the tags line is `:369` at HEAD — earlier `:384-387`
  cites in this spec and in W-CSS1's edit table are STALE). The emitted `ci.yml` (generated from the
  `ci`-tagged subset) contains **zero** `no-god-module` steps (`grep -c no-god-module
  .github/workflows/ci.yml` → `0`, re-verified at HEAD). So **master CI is GREEN while the gate is
  RED on the same tree** — exactly how the §0 growth happened: W-CON2/W-CON3 grew
  `constellationField.ts` 653→959 with every CI run green. The gate's own note (`:370`) still says
  "W6 gates-close folds it into the ci aggregate"; that fold never landed across AV/AW/AX (≥3-pass
  deferral, H-godmodule CHRONIC — the §4.R ratchet is the stopping mechanism).

- **D-RETURN — "byte-identical return shape" has NO machine check.** `useMetaballRenderer`
  returns a bare inline `{ pause, resume }` (`:681-690` at HEAD) — no named interface to fail
  against. The AW.W15 `proof-composable-return-types.mjs` EXISTS but is an ORPHAN: `grep -c
  composable-return-types package.json` → `0` (no npm script, re-verified at HEAD), and it is NOT
  registered in `gates.mjs` (no `id:` entry). It is dead code; "byte-identical" is asserted nowhere
  (H-godmodule F5).

- **D-CONFLICT (the coordination hazard the seed missed).** The orphan gate's clause 4
  (`proof-composable-return-types.mjs:131-146`) asserts a `DO-NOT-SPLIT` rationale comment IS PRESENT
  on `SegmentedTabs.vue` AND `GlassDock.vue` (and `ContinuousMarkers.vue`). Both targets carry it
  (`SegmentedTabs.vue:2-7`, `GlassDock.vue:2-6`). **Wiring the orphan gate verbatim while carving
  those two files is a direct contradiction** — the gate demands the banner stays; the carve removes
  the file from the god-module list. The spec MUST re-scope the gate before wiring it (§3).

- **D-FALSE-GOD — SegmentedTabs is a CSS-block artifact, not a logic god-module.** Its `<script>`
  is 307 lines (well under bound); the 689 is `<style scoped>` 267 + template + script. The gate
  counts SFC `<style>` CSS as if it were logic bloat (`proof-no-god-module.mjs:55-64` counts whole-file
  lines). The old framing conflated a real ~570-line-function (useMetaballRenderer) with a
  CSS-block artifact (H-godmodule F4). A blind script-split over-engineers a problem that is not there.
  (Counter-case at HEAD: `Constellation.vue` is the OPPOSITE shape — 568 of its 597 lines ARE script;
  it is a true logic god-module and gets a composable extraction, §2d.)

- **D-BANNER — `GlassDock.vue:2-6` claims "421-line … DO-NOT-SPLIT"; the file is 624.** The banner
  is stale by ~203 lines (it graded a smaller file, and the file kept growing under it — the banner
  actively LICENSED the growth). W-GOD1 names GlassDock as a carve target, directly contradicting
  the in-file banner (H-dock D8). Both cannot hold.

- **D-GROWTH (the §4 Class-D trend, NEW at this re-grade) — "carve AFTER content settles" is a
  free growth pass.** Every grading of this spec was stale within one batch: 510→653→959
  (constellationField), 499→515 script (GlassDock), plus two violators never graded at all
  (`Constellation.vue`, `mediums.glsl.ts`). The structural cause: the gate is local-only, the carve
  is always sequenced downstream, and NOTHING reddens when an upstream wave grows a violator. The
  fix is NOT a faster carve — it is the §4.R RATCHET: per-violator baselines frozen at §0,
  CI-promoted NOW, RED on growth, drained to ∅ by the carves.

---

## §1 — The CSS-vs-logic decision for SegmentedTabs (resolve D-FALSE-GOD)

> **Re-grade stamp (HC-god1-regrade):** the block boundaries re-verified EXACT at HEAD — script
> 1–308, template 310–420, `<style scoped>` 422–689. §1 stands verbatim; no re-scope needed.

**DECISION: Option A — extract the `<style scoped>` block to a co-located `.css`, count SFC `<style>`
toward the bound (status quo gate semantics preserved).** Rationale: it is the idiomatic, KISS,
cohesion-preserving move; it matches the `dock.css` `@import`-partial precedent CLAUSE the H-godmodule
F3 caveat names; and it keeps `proof:no-god-module`'s whole-file line read honest (no gate-logic
special-casing of `<style>`, which would weaken the bound for every other SFC). The library has the
exact precedent — `drawer.css` (cascade rung 17) holds the `<Drawer>` LOOK out of the SFC; SFC scoped
CSS is folded into the `/styles` bundle by the build (`AN.W1` — the single `@import "@mkbabb/glass-ui/styles"`
now carries compiled SFC `<style scoped>` CSS).

- Extract `SegmentedTabs.vue` `<style scoped>` (`:422-689`, 267 lines) to a co-located partial
  `src/components/custom/tabs/segmented-tabs.css`, `@import`-ed into `src/styles/index.css` in cascade
  order (it is component-grammar — rung alongside the other custom-component CSS). The block becomes a
  plain (un-`scoped`) `.segmented-tabs*` rule set; the SFC's class hooks already carry the
  `.segmented-tabs`-family selectors (verify the selectors are class-based, not `:deep`/attribute-scoped
  artifacts — if any rule relied on Vue's `data-v-*` scope hash, re-anchor it on a class the template
  already emits, NO new markup).
- After extraction `SegmentedTabs.vue` is **script 307 + template 110 + a thin `<style>` import note
  ≈ ≤ 420 lines** — UNDER bound. It drops off the god-module list as a LOGIC artifact, exactly as the
  defect read demands.
- **This is NOT a CSS-gate hand-off.** W-GOD1 does not author the general `.css`-aware god-module
  gate (that is W-CSS1's deliverable). But `segmented-tabs.css` at ~267 lines is comfortably under any
  500 CSS bound, so it parks clean and does not pre-empt W-CSS1.

## §2 — The carve plan (the six files → cohesive sibling sub-modules), RE-GRADED at HEAD

The carve is FUNCTION-FAMILY extraction into siblings in the SAME package dir, re-exported through
the existing barrel so the public surface is unchanged. NO logic edits — moved lines are byte-for-byte
the same (only the import wiring is new).

### 2a. `useMetaballRenderer.ts` (692 → < 500; shed ≥ 192) — the four-job split (H-blob F5)

The composable does four distinct jobs (line spans RE-VERIFIED at HEAD — the W-BLOB3 DI strip
shifted everything): (1) the wake/quiescence scheduler (`scheduleWake:186-212` + the
park/reschedule at `~:600-640`), (2) the GL setup / program / uniform-cache build (`~:233-318`,
~85 lines — shader compile/link `:233-249`, VAO/quad `:250-262`, the `UNIFORM_NAMES` U-map +
sat/trail/palette location arrays `:263-318`), (3) the **~325-line per-frame `drawFrame` uniform
upload (`:319-643`)** — the dominant shed, (4) the lifecycle/return tail (`:644-691`). Extract the
two heaviest, leaf-pure jobs:

- `composables/buildMetaballProgram.ts` — the GL setup leaf (program compile + quad + uniform-cache
  build, `~:233-318`). A pure `(gl, …) => { program, uniforms, … }` factory; no Vue, no
  closure-state read.
- `composables/uploadBlobUniforms.ts` — the per-frame uniform-upload leaf (the `:319-643` body). A
  pure `uploadBlobUniforms(gl, U, frameState)` that takes the resolved values and writes the
  uniforms; the composable's `drawFrame` becomes a thin caller. **This is the W-BLOB2/W-BLOB3
  interaction surface — hence W-GOD1 runs AFTER them** (§6), so the extracted leaf is stable, not
  re-conflicted.
- The drawFrame extraction ALONE sheds ~325 → ~367 remainder; `buildMetaballProgram` is the
  second cut if the thin-caller plumbing eats the margin. `useBlobWakeScheduler.ts` stays the
  optional third (only if both cuts somehow miss 500).
- **Arithmetic check:** 692 − 325 (drawFrame) − 85 (GL setup) + ~40 (import wiring + thin-caller
  glue + the two new files' headers) ≈ **322** — comfortable. Each new sibling is well under bound
  (~360 and ~110 with headers).

### 2b. `constellationField.ts` (959 → < 500; shed ≥ 459) — the THREE-SIBLING split (the wave's biggest carve)

**Re-graded:** the original "split ~120 lines of warp" plan is an order of magnitude short — the
W-CON1 wander + W-CON2 gravity-well + W-CON3 freeze finishers made the interaction machinery
(well + warp + wander) the file's dominant mass. The carve is now THREE cohesive function-families
out of the engine (spans from the §0 table):

1. **`constellationInteraction.ts` (~390 lines)** — the well + warp + wander clusters, moved
   together (they are ONE pointer-interaction concern and share consts):
   - the gravity-well cluster `:526-633` (~108: `WELL_EPS`/`WELL_COOL_*`/`WELL_RELEASE_RAMP` +
     `stepWell:570`),
   - the warp cluster `:634-815` (~182: `WARP_RESPONSE:660`/`WARP_ZETA:661`/`WARP_DT_CLAMP:663` +
     `DEFAULT_WELL_CONFIG:672` (it sits IN this span and is read by `readInteractionConfig` —
     travels with it) + `nearestNode:689`/`warpStep:730`/`setWarpTarget:762`/`warpTo:783`),
   - the auto-drift cluster `:816-846` (~31: `warpSettled:818`/`pickWanderTarget:832`),
   - plus `readInteractionConfig` `:334-368` (~35 — it reads ONLY the warp/well/wander tokens;
     its cohesive home is this sibling).
2. **`constellationDraw.ts` (~155 lines)** — the draw cluster `:847-959` (~113:
   `drawEdges`/`drawNodes`/`drawPointerWeb`/`drawRipples`) + `readPalette` `:304-341` (~38 — the
   palette read feeds ONLY the draw pass).
3. **`constellationField.ts` keeps** the type/interface/const surface `:1-303` + `seedField:379` +
   `refitField:413` + `stepField:446-525` ≈ **~430 lines** — under bound with margin.

**CRITICAL — the call coupling stays DIRECT (re-verified at HEAD):** `stepField` calls
`stepWell` (`:501`), `warpStep` (`:507`), and the wander cadence trio
`warpSettled`/`setWarpTarget`/`pickWanderTarget` (`:515-525`) — `constellationField.ts` IMPORTS
these from `constellationInteraction.ts`; the calls stay direct function calls (no indirection,
no registry). Import direction is one-way (core → interaction; interaction imports only the types
module path, no cycle: the shared interfaces stay in `constellationField.ts` and the sibling
imports them — `import type` only, so no runtime cycle). The `index.ts` barrel (`:3-26`, the
21-symbol value set + 11-type set captured in §3b) re-points the moved symbols to the new file
paths — the PUBLIC symbol set is byte-identical (verified by the §3b barrel-parity assertion).

### 2c. `GlassDock.vue` (624 → < 500; shed ≥ 124 from the 515-line script) — coordinate with W-DOCK2 (H-dock D8)

`GlassDock.vue` is script-only (no `<style>`); the `<script setup>` grew 499 → **515** since the
original grading. The script already delegates the FLIP/morph/hold logic to composables
(`useDockState`, `dockMorphContext`, `useTouchGate`). Two extraction clusters (re-mapped at HEAD):

- **`composables/useDockShellProps.ts`** — the variant-resolution + prop-derivation cluster
  (`:200-265`, ~65: `containerStyle`, `dockBranch`, `collapseDelay`/`startCollapsed`/`layoutValue`,
  the `variant`/`shape`/`orientation`/`density`/`scrollClass`/`alwaysExpanded`/`fitContent`
  computeds).
- **`composables/useDockMorphWindow.ts`** — the transition-window timing family (`:375-455`, ~80:
  `parseTimeMs`/`longestTransitionMs`/`morphWindowMs`/`clearTransitionTimer`/`RESIZE_MORPH_PROPS`/
  `markTransitioning`/`onDockTransitionDone`) — a pure DOM-timing concern with no template
  dependency.

Both cuts ≈ 145 shed → script ≈ 370 + template 106 ≈ **~480**. If W-DOCK2's booked edits (the
two-FLIP fold, the `DOCK_SPRING` mirror fold, rail persistence, §F2 first-mount) grow the script
further, the carve absorbs it (the gate measures FINAL state).

**This file is ALSO edited by W-DOCK2.** Sequencing (§6): **W-DOCK2 lands FIRST** (its rail/lockstep
edits), **then W-GOD1 carves** the post-W-DOCK2 file. Carving first would re-conflict with W-DOCK2's
diff. The §7 gate measures the carved file < 500 AFTER both land.

### 2d. `Constellation.vue` (597 → < 500; shed ≥ 97) — NEW target: the pointer-wiring extraction

A true logic god-module (script 568 of 597). The natural shed is the pointer/interaction listener
wiring inside `onMounted` (`:405-517`, ~113 lines): the deck-scale `toLocal` mapper (`:409-418`),
the hover web listeners (`onMove`/`onLeave`/`onDown`, wired `:448-453`), the click-warp listener
(`onWarp`, `:461-470`), and the gravity-well hold machinery (`onDown`/`onMove`/`release` +
hold-timer, `:480-515`). Extract into **`composables/useConstellationPointer.ts`** — a
`useConstellationPointer(host, canvas, field, pointer, ripples, opts)` wiring function returning
its teardown; the SFC keeps the `useCanvas2D` mount, the freeze/wander/well state derivation, and
`defineExpose` (`:518-568` — the `field`/`isFrozen`/`warpTo` public seam is UNTOUCHED; it is the
component's contract surface and the π live specs read it). 597 − 113 + ~10 glue ≈ **~494** —
tight; if the margin reads thin at carve time, the `toLocal`-dependent expose sugar stays put and
the second cut is the wander/well state-derivation block (`:232-260`, ~29). **Coordinates with
W-COHERE** (DAG E16 edits the carved constellation SFC AFTER W-GOD1 — honour the edge).

### 2e. `mediums.glsl.ts` (528 → < 500; shed ≥ 28) — NEW target: the chunk recompose, STRING byte-identity

A GLSL-in-TS module; the bound is legitimate (it is `src/` `.ts` and the gate counts it — a
shader module growing without bound is the same review hazard). The carve is a RECOMPOSE, not a
logic split: extract the largest cohesive chunk — the **oil sub-mode dispatch block (`:353-528`,
~176 lines)** — into a sibling `oil-modes.glsl.ts` exporting one template literal, and rebuild
`AURORA_MEDIUMS_POST_BRUSH_GLSL` as a template join (`` `${…}${AURORA_OIL_MODES_GLSL}` ``) so the
**EXPORTED STRING is byte-identical** pre/post carve. Machine proof: the §3b gate snapshots a
content hash of the composed `AURORA_MEDIUMS_POST_BRUSH_GLSL` + `AURORA_MEDIUMS_PRE_BRUSH_GLSL`
strings at carve time and asserts the join introduces no drift (hash recorded in the carve commit;
the `proof:aurora-*` shader gates are the behaviour witnesses). Result: mediums ≈ 355, sibling ≈
180 — both clear. **Runs AFTER W-AUR-PAINTERLY closes** (it is editing `:385-386`, inside the
extracted block — §6); note the painterly edit CHANGES the hash, which is fine: the snapshot is
taken at carve time, not at this spec's writing.

### §2 invariant — the carve is re-export-only at every barrel

Each new sibling is re-exported through the package's existing barrel. **Corrected at re-grade:
goo-blob has NO `composables/index.ts`** — its renderer exports flow through the PACKAGE barrel
`goo-blob/index.ts:25-28` (`useMetaballRenderer` + `UseMetaballRendererOptions`); the new GL/upload
leaves are INTERNAL (not barrel-exported — they have zero external consumers and stay private to
the package, the substrate-without-consumer bar). The constellation barrel is
`constellation/index.ts` (`:3-26`); the dock composables barrel is `dock/composables/index.ts`;
the new aurora GLSL sibling is imported ONLY by `mediums.glsl.ts` (no barrel change). The PUBLIC
`@mkbabb/glass-ui/goo-blob`, `/constellation`, `/dock`, `/aurora` surface emits a byte-identical
symbol set. Verified by §3b.

## §3 — Return-shape byte-identity, MACHINE-proven (resolve D-RETURN + D-CONFLICT)

### 3a. Name the Return interface on the carved composable

`useMetaballRenderer` currently returns a bare inline `{ pause, resume }` (`:681-690` at HEAD).
Author:

```ts
export interface UseMetaballRendererReturn {
    pause: () => void;
    resume: () => void;
}
```

and type the return: `export function useMetaballRenderer(options): UseMetaballRendererReturn`.
This is the carve invariant — a sub-module that drops/renames a returned key now fails `vue-tsc`
AND the gate. (`buildMetaballProgram`/`uploadBlobUniforms` are pure internal leaves, not composables —
they do not need a `Use*Return` interface; only the composable's public return is locked.)

### 3b. Re-scope + WIRE the orphan `proof:composable-return-types` (resolve D-CONFLICT)

The orphan gate cannot be wired verbatim — its clause 4 (`proof-composable-return-types.mjs:131-146`)
asserts `DO-NOT-SPLIT` IS PRESENT on `SegmentedTabs.vue` + `GlassDock.vue`, which W-GOD1 carves. **EDIT
the gate, then wire it:**

1. **Remove `SegmentedTabs.vue` (`P.BOUNCY`) and `GlassDock.vue` (`P.DOCK`) from the `doNotSplitTargets`
   array** (`:133-137`) — these are now CARVED, not whole-by-design. `ContinuousMarkers.vue` (`P.MARKERS`)
   is **440 lines at HEAD** (re-counted — warn band, cohesive) and STAYS as the lone DO-NOT-SPLIT case;
   clause 4 narrows to it alone. (If a later wave carves it too, drop clause 4 wholesale — the carve
   doctrine replaces the keep-whole-with-rationale doctrine.)
2. **Add `useMetaballRenderer` to the `returnChecks` array** (`:68-74`):
   `["useMetaballRenderer", P.RENDERER_BLOB, "UseMetaballRendererReturn", null]` (new `P.RENDERER_BLOB`
   path resolving `src/components/custom/goo-blob/composables/useMetaballRenderer.ts`). The clause
   asserts `export interface UseMetaballRendererReturn` is present (machine-proven the named shape exists).
3. **Add a BARREL-PARITY snapshot assertion** — the byte-identity-of-public-surface check the seed
   demands. The gate reads the **goo-blob PACKAGE barrel (`goo-blob/index.ts` — there is no
   `composables/index.ts`; corrected at re-grade)** + the constellation `index.ts` (the 21-value +
   11-type symbol set at `:3-26`) + the dock composables barrel (`dock/composables/index.ts`) and
   asserts each re-exports the EXACT expected symbol set (a hard-coded expected array, the snapshot).
   A carve that drops/renames a re-export reddens. This is the machine proof that the carve is
   re-export-only — the only thing that makes "byte-identical return shape" verifiable for a
   free-function family (constellation/GL leaves have no `Use*Return` to lock; the barrel symbol set
   IS their public shape). **For the 2e GLSL recompose the parity object is the STRING, not a
   barrel:** the gate hashes the composed `AURORA_MEDIUMS_{PRE,POST}_BRUSH_GLSL` exports and asserts
   the carve-commit hash (the template join introduces zero byte drift).
4. **WIRE it** — add `"proof:composable-return-types": "node scripts/proof-composable-return-types.mjs"`
   to `package.json` scripts, and register it in `gates.mjs` with `tags:["local","ci"]` (it is now a
   binding structural gate, not dead code). Update its header note from "AW.W15" framing to the AY.W-GOD1
   re-scope (the carve doctrine + the new barrel-parity clause), greenfield-no-meta: state WHAT it locks,
   not the wave archaeology.

> The other existing clauses (the `twin-line-divider` DRY, `useTokenColor` resolver seam, the dom barrel
> Controls note, density colocation, the surviving `Use*Return` interfaces on countup/animated/numeric/
> dark/glassRenderer) STAY — they are still true and load-bearing; W-GOD1 only re-scopes the
> DO-NOT-SPLIT clause and ADDS the metaball return + barrel-parity clauses.

## §4 — CI-promote `proof:no-god-module` via the RATCHET (resolve D-CI + D-GROWTH)

The promotion mechanism (re-verified at HEAD): edit the tag → `npm run gates:emit-ci`
(`renderCiYaml`, `gates.mjs:877+`; refuses on a missing backing script `:888`) → `proof:gen-ci-fresh`
byte-matches (`gates.mjs:784-787`; allowlisted as a CI meta-step at `:843`).

### §4.R — The RATCHET (NEW at re-grade; the §4-Class-D stopping mechanism; lands FIRST, Batch-4 step 0)

The old promotion plan deferred the CI tag flip until ALL carves land — which is exactly the
"carve-after-settle = free growth pass" failure D-GROWTH documents (the gate stayed local-only
while constellationField grew 510→959 across three batches with green CI). The RATCHET inverts
it: **promote NOW, grandfather the §0 violators at their exact HEAD counts, redden GROWTH.**

1. **Per-violator baselines in the gate.** `scripts/proof-no-god-module.mjs` gains a
   `RATCHET_BASELINES` map — the §0 table, frozen verbatim:
   ```js
   const RATCHET_BASELINES = {
       "components/custom/constellation/constellationField.ts": 959,
       "components/custom/goo-blob/composables/useMetaballRenderer.ts": 692,
       "components/custom/tabs/SegmentedTabs.vue": 689,
       "components/custom/dock/GlassDock.vue": 624,
       "components/custom/constellation/Constellation.vue": 597,
       "components/custom/aurora/constants/shaders/mediums.glsl.ts": 528,
   };
   ```
   Semantics: `lines ≤ 500` → PASS; `lines > 500 && baseline exists && lines ≤ baseline` →
   **GRANDFATHERED** (reported in `facts.grandfathered`, NOT a violation); `lines > 500 && (no
   baseline || lines > baseline)` → **RED**. A violator that SHRINKS under 500 has its row
   DELETED in the same diff (the ratchet is monotonic — baselines only drain, never refill
   silently). The §7 close condition is `violations == []` **AND `RATCHET_BASELINES == {}`** —
   grandfathering is an interim state, not a close state.
2. **The tag flips WITH the ratchet, not after the carves.** Because the gate is GREEN-at-HEAD
   under ratchet semantics (6 grandfathered, 0 violations), `gates.mjs:369`
   (`tags:["local"]` → `tags:["local","ci"]` — the `:387` cites in this spec's earlier draft AND
   in W-CSS1's edit table `gates.mjs:384-389` are STALE at HEAD) flips in the SAME diff as the
   baseline landing, plus the note update at `:370` (strip the stale "W6 gates-close folds it
   into the ci aggregate" promise; state the ratchet semantics plainly). One `gates:emit-ci`
   re-emit rides the same diff; `proof:gen-ci-fresh` byte-matches.
3. **The booking-updates-spec-counts rule (binding on EVERY wave from ratchet-landing forward).**
   A wave whose booked edit grows a grandfathered file past its baseline, or pushes ANY file past
   500 (the near-bound watch: `metaball.frag.ts` is 498 — TWO lines under), must IN THE SAME DIFF
   either (a) carve, or (b) bump/add the baseline row with an inline `// BOOK(<wave-id>):` marker
   AND update this spec's §0 recount table. A baseline bump with no BOOK marker is itself RED
   (the gate asserts every row > the §0 frozen value carries a marker). This makes "the spec
   graded 510, the file is 959" structurally impossible to repeat — the count and the spec move
   in one commit or CI refuses.
4. **W-CSS1 deconfliction, RESTATED (supersedes the prior note).** The old note made W-CSS1 own
   the tag flip on the premise the gate could not go CI-green before both waves' carves — the
   ratchet DISSOLVES that premise. New ownership: **W-GOD1 (Batch-4 step 0) owns the ratchet diff**
   (baselines + tag flip at `gates.mjs:369` + note + emit). **W-CSS1 keeps its `.css`-collector
   extension** (`proof-no-god-module.mjs:47`) and, in ITS diff, adds baseline rows for any
   `src/styles/**` `.css` then over 500 (same BOOK discipline) — atomic per wave, no contended
   line: the tag line is touched ONCE (W-GOD1), the collector filter line ONCE (W-CSS1), the
   baseline map appended by each. W-CSS1's spec carries the stale premise + the stale
   `gates.mjs:384-389` cite — flag for its own one-line amendment (recorded in
   `audit/hardening/hc2/HC-god1-regrade.md`; this spec does not edit W-CSS1).
5. **`proof:composable-return-types` stays W-GOD1's OWN ci-tagged registration** — a disjoint
   `gates.mjs` append (new GATES row, §3b.4), picked up by whichever emit runs last in Band E;
   `proof:gen-ci-fresh` byte-matches the final mirror. NO two waves hand-edit the same gates.mjs
   line; NO two waves race the ci.yml regeneration.

## §5 — Reconcile the stale banner (resolve D-BANNER)

`GlassDock.vue:2-6` — DELETE the stale `DO-NOT-SPLIT (AW.W15 assay): … 421-line … cohesive-at-boundary`
banner. The file is carved (§2c); the banner is false (file is 624 at HEAD, claim says 421) AND obsolete (the
carve doctrine supersedes the keep-whole rationale). Replace with a one-line note pointing at the
extracted sibling (`useDockShellProps`) IF a wayfinding comment helps — greenfield-no-meta: NO "split
at AY.W-GOD1" archaeology, just a plain "shell-prop derivation lives in ./composables/useDockShellProps".
Same for `SegmentedTabs.vue:2-7` — its DO-NOT-SPLIT banner goes when the `<style>` extracts (§1); the
script stays whole because it IS under bound, not because a banner says so.

## §6 — Sequencing (resolve the scope-reveal risk)

Per AY.md Band E (close, runs LAST) and the per-file edit overlaps:

| dependency | reason |
|---|---|
| **§4.R RATCHET lands FIRST — before every carve** | it is the growth-stop; every later wave edits under it (the booking rule). Zero carve dependency: GREEN-at-HEAD with 6 grandfathered rows. |
| **W-CON1, W-CON2, W-CON3 — LANDED (re-grade)** | their growth is IN the §0 counts (959/597); 2b + 2d carve the post-finisher files. |
| **W-BLOB2 LANDED; W-BLOB3 residue lands BEFORE 2a** | the DI strip is in (692); the remaining W-BLOB3 arms (interaction DELTA + frame budget) touch `drawFrame` — extract `uploadBlobUniforms` after they settle (H-blob F5). |
| **W-DOCK2 lands BEFORE 2c** | both edit `GlassDock.vue`; W-DOCK2's rail/lockstep diff (+ its booked two-FLIP/`DOCK_SPRING`/rail-persistence/§F2 items) lands first, then W-GOD1 carves the post-W-DOCK2 file (H-dock D8). |
| **W-AUR-PAINTERLY closes BEFORE 2e** | it is editing `mediums.glsl.ts:385-386` (inside the oil-modes block 2e extracts); the string-hash snapshot is taken at carve time, post-tune. |
| **W-COHERE runs AFTER 2b/2d** | DAG E16: the set-cohesion pass edits the CARVED constellation/blob SFCs; carve first or it re-conflicts. |
| §1 (SegmentedTabs `<style>` extract) has NO upstream — it may land any time in Band E. |

If any upstream wave's edit pushes a file's projected post-carve count back over 500, the carve
absorbs it (the gate measures the FINAL state); under the ratchet that edit must ALSO book its
baseline bump (§4.R.3) — the growth is visible in CI either way; no re-plan needed.

---

## §7 — HARD GATE

A wave-closing condition, each line backed by an artefact (no grep-only / "API exists" check):

1. **`proof:no-god-module` is CI-tagged (the §4.R ratchet) + GREEN over all six at close.**
   Artefact, two stages: (interim, ratchet-landed) `gates.mjs:369` reads `tags:["local","ci"]`;
   `.github/workflows/ci.yml` contains a `proof:no-god-module` step (the ci.yml build-diff); the
   emitted artefact (`.cache/gates/AV-no-god-module.json`) shows `violations:[]` with
   `facts.grandfathered` listing exactly the §0 six at their frozen counts; a bite-check proves the
   ratchet (append 1 line to any grandfathered file → RED). (close) `npm run proof:no-god-module`
   exits 0 with the six named files each < 500 AND `facts.grandfathered:[]` AND
   `RATCHET_BASELINES == {}` in source. **Born-RED at HEAD** (exit 1, SIX violations — §0
   recount), GREEN-with-grandfathers at ratchet-landing, plainly GREEN at close.

2. **Return shapes MACHINE-proven byte-identical.** Artefact: `proof:composable-return-types` is
   registered in `gates.mjs` with `tags:["local","ci"]` AND has a `package.json` script (the orphan is
   wired — `grep -c composable-return-types package.json` ≥ 1, born `0` re-verified at HEAD); `npm run
   proof:composable-return-types` exits 0; its emitted facts show `UseMetaballRendererReturn` present
   AND the barrel-parity snapshot matches for `goo-blob/index.ts` / `constellation/index.ts` /
   `dock/composables/index.ts` (a dropped re-export reddens it — verified by a bite: temporarily
   delete one re-export → RED) AND the 2e GLSL string-hash matches its carve-commit snapshot.

3. **The protected render/behaviour gates stay GREEN across the carve.** Artefact: `npm run
   proof:blob-render`, `proof:blob-color-equivalence`, `proof:tabs-unified`, `proof:dock-animation-live`,
   `proof:dock-hold-contract`, `proof:constellation-field` (+ the wired `proof:constellation-{warp,egg,freeze,refit}-live`
   set for the 2b/2d interaction carve) and, for 2e, the `proof:aurora-*` shader set
   (`tensor-field`, `stroke-composite`, `vangogh-preset`, `oilpastel-medium`, `painterly-statistics`)
   ALL exit 0 at close — the render IS the truth, not the line count (H-blob F5).

4. **The ci.yml mirror is byte-identical.** Artefact: `npm run proof:gen-ci-fresh` exits 0 (the emitted
   ci.yml byte-matches `gates.mjs --emit-ci`) — proves the CI promotion (§4) is reflected, not drifted.

5. **No public-surface delta.** Artefact: `npm run typecheck` (vue-tsc) clean; `npm run build` green;
   a `git diff` of the three package barrels (`goo-blob/index.ts`,
   `constellation/index.ts`, the `dock/composables` barrel) shows ONLY path re-wiring, the exported symbol
   set unchanged (the re-export-only diff); the new 2a/2c/2d siblings are package-internal (zero new
   public symbols). Lint clean.

6. **The stale banners are reconciled.** Artefact: `grep -n 'DO-NOT-SPLIT' src/components/custom/dock/GlassDock.vue
   src/components/custom/tabs/SegmentedTabs.vue` → 0 hits (both carved; banners removed, §5); the orphan
   gate's `doNotSplitTargets` no longer names those two files (§3b.1).

**The single binding condition:** `proof:no-god-module` (ratchet-promoted at step 0, baselines
drained to ∅ by close) and `proof:composable-return-types` are both CI-tagged and GREEN, the SIX
§0 files are each < 500 with their public return/export surface barrel-parity-proven (and the
GLSL recompose string-hash-proven) byte-identical, and the protected render gates +
`proof:gen-ci-fresh` + typecheck + build + lint stay green — born-RED at HEAD (6 violations + 2
orphaned/untagged gates), GREEN-with-grandfathers the day the ratchet lands, plainly GREEN at
close.
