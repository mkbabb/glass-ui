# AY.W-GOD1 — Carve the 4 god-modules <500 with machine-proven return-shape byte-identity

**Band** E (the AX close — structure) · **Repo** glass-ui · **State** OPEN
**Runs AFTER** W-CON1/W-CON2 (constellation) + W-BLOB2/W-BLOB3 (blob) land — they EDIT
`constellationField.ts` and `useMetaballRenderer.ts`/`drawFrame`, so carving first carves a
moving target (the scope-reveal trigger). **Coordinates WITH** W-DOCK2 (also edits
`GlassDock.vue`) — the carve-vs-edit sequencing is fixed in §6.
**Hardening inputs** `audit/hardening/H-godmodule.md` (F1–F5), `H-blob.md` (F5), `H-constellation.md`
(FINDING 6), `H-dock.md` (D8).

---

## Goal criterion

Every `src/` `.ts`/`.vue` file is under the 500-line god-module bound, and that bound is
ENFORCED IN CI (not a `local`-only gate the green master can ignore). The four confirmed
god-modules — `useMetaballRenderer` (694), `SegmentedTabs.vue` (689), `GlassDock.vue` (608),
`constellationField.ts` (510) — are carved into cohesive sibling sub-modules with their PUBLIC
return/export surface byte-identical, MACHINE-proven (not asserted) by a wired return-shape gate.
The carve is PURE STRUCTURE: no consumer of goo-blob, dock, tabs, or constellation observes a
behaviour delta, and the render-truth gates (`proof:blob-render`, `proof:blob-color-equivalence`,
the `proof:dock-*` set, `proof:tabs-unified`, the constellation gates) stay green across the split.

## Completion criterion

The §7 HARD GATE checklist verifies in full: `proof:no-god-module` is `ci`-tagged in
`gates.mjs`, re-emitted into `.github/workflows/ci.yml`, and GREEN over all four files (each
< 500); the return-shape gate (the resurrected `proof:composable-return-types`, re-scoped per §3)
is wired into `package.json` + `gates.mjs` and proves the carved composables' return shapes
byte-identical; the six protected render/behaviour gates stay green; `proof:gen-ci-fresh`
confirms the ci.yml mirror is byte-identical; typecheck + lint clean; the public barrels emit a
byte-identical symbol set (re-export-only diff). No brittleness window.

---

## The verified defect (file:line evidence at HEAD `at-dock-convergence`)

`node scripts/proof-no-god-module.mjs` → **status FAIL, exit 1**, four violations (H-godmodule F1,
re-run at HEAD):

| file | lines | shape (verified) |
|---|---|---|
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | **694** | pure-TS composable; one ~567-line `useMetaballRenderer(options)` body (`:127`→`:693`); returns a **bare inline `{ pause, resume }`** at `:683` — NO named Return interface |
| `src/components/custom/tabs/SegmentedTabs.vue` | **689** | SFC; `<script setup>` 1–308 (**307 lines of logic**), `<template>` 310–420 (110), **`<style scoped>` 422–689 = 267 lines of CSS** — a FALSE logic-god-module |
| `src/components/custom/dock/GlassDock.vue` | **608** | SFC; `<script setup>` 1–500 (499-line script), `<template>` 502–608 (106), no `<style>` — carries a STALE `DO-NOT-SPLIT (AW.W15 assay): … 421-line` banner at `:2-6` |
| `src/components/custom/constellation/constellationField.ts` | **510** | pure engine module; ~13 exported fns/ifaces; the cleanest carve (function-family split) |

> **RE-GROUND (post-Batch-2, from `audit/hardening/b2/`).** Two of these GREW after this table was
> written, because the **F5 ordering was inverted** — W-CON1 and W-BLOB2 (Batch 2, committed
> `tranche/AY @ 1151899`) added to the very god-modules W-GOD1 was meant to carve FIRST:
> `constellationField.ts` is now **653** (W-CON1 added `refitField` + the wander/auto-drift cluster,
> +143; carve target = shed 153+, not 10) and `useMetaballRenderer.ts` is now **707** (W-BLOB2's
> `cCol.*` color-perturbation uploads, +13; the largest violator). `proof:no-god-module` is therefore
> **RED on `tranche/AY` HEAD** (the Batch-2 commit landed over it — a missed verify). The carve plan
> stands, re-scoped to 653/707; the natural cut is `constellationField` → `constellationWarp.ts`
> (the warp/wander cluster the B2 refinement names) re-composed by the field. The DELTA-honesty +
> stunning-bar findings for those same waves live in `audit/hardening/b2/{B2-con1,B2-blob}.md` and
> fold into W-CON1/W-BLOB2's own re-capture clauses, not here.

Five compounding facts make the as-stated "carve 4 god-modules" framing under-specced:

- **D-CI — the gate is `tags:["local"]`, INVISIBLE to CI.** `gates.mjs:384-387` registers
  `proof:no-god-module` with `tags:["local"]`. The emitted `ci.yml` (generated from the `ci`-tagged
  subset) contains **zero** `no-god-module` steps (`grep -c no-god-module .github/workflows/ci.yml`
  → `0`). So **master CI is GREEN while the gate is RED on the same tree** — a 700-line god-module
  lands and CI never bites. The gate's own note (`:388`) says "W6 gates-close folds it into the ci
  aggregate"; that fold never landed across AV/AW/AX (≥3-pass deferral, H-godmodule CHRONIC).

- **D-RETURN — "byte-identical return shape" has NO machine check.** `useMetaballRenderer`
  returns a bare inline `{ pause, resume }` (`:683`) — no named interface to fail against. The
  AW.W15 `proof-composable-return-types.mjs` EXISTS but is an ORPHAN: `grep -c composable-return-types
  package.json` → `0` (no npm script), and it is NOT registered in `gates.mjs` (no `id:` entry). It
  is dead code; "byte-identical" is asserted nowhere (H-godmodule F5).

- **D-CONFLICT (the coordination hazard the seed missed).** The orphan gate's clause 4
  (`proof-composable-return-types.mjs:131-146`) asserts a `DO-NOT-SPLIT` rationale comment IS PRESENT
  on `SegmentedTabs.vue` AND `GlassDock.vue` (and `ContinuousMarkers.vue`). Both targets carry it
  (`SegmentedTabs.vue:2-7`, `GlassDock.vue:2-6`). **Wiring the orphan gate verbatim while carving
  those two files is a direct contradiction** — the gate demands the banner stays; the carve removes
  the file from the god-module list. The spec MUST re-scope the gate before wiring it (§3).

- **D-FALSE-GOD — SegmentedTabs is a CSS-block artifact, not a logic god-module.** Its `<script>`
  is 307 lines (well under bound); the 689 is `<style scoped>` 267 + template + script. The gate
  counts SFC `<style>` CSS as if it were logic bloat (`proof-no-god-module.mjs:55-64` counts whole-file
  lines). The "4 god-modules" framing conflates a real 567-line-function (useMetaballRenderer) with a
  CSS-block artifact (H-godmodule F4). A blind script-split over-engineers a problem that is not there.

- **D-BANNER — `GlassDock.vue:2-6` claims "421-line … DO-NOT-SPLIT"; the file is 608.** The banner
  is stale by ~190 lines (it graded a smaller file). W-GOD1 names GlassDock as a carve target, directly
  contradicting the in-file banner (H-dock D8). Both cannot hold.

---

## §1 — The CSS-vs-logic decision for SegmentedTabs (resolve D-FALSE-GOD)

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

## §2 — The carve plan (the four files → cohesive sibling sub-modules)

The carve is FUNCTION-FAMILY extraction into siblings in the SAME package dir, re-exported through
the existing barrel so the public surface is unchanged. NO logic edits — moved lines are byte-for-byte
the same (only the import wiring is new).

### 2a. `useMetaballRenderer.ts` (694 → < 500) — the four-job split (H-blob F5)

The composable does four distinct jobs (verified line spans): (1) the color-resolve memo
(`:176-184`), (2) the wake/quiescence scheduler (`:189-212` + the park/reschedule at `:595-644`),
(3) the GL setup / program / uniform-cache build (`:247-304`), (4) the ~260-line per-frame
`drawFrame` uniform upload (`:334-593`). Extract the two heaviest, leaf-pure jobs:

- `composables/buildMetaballProgram.ts` — the GL setup leaf (program compile + quad + uniform-cache
  build). A pure `(gl, …) => { program, uniforms, … }` factory; no Vue, no closure-state read.
- `composables/uploadBlobUniforms.ts` — the per-frame uniform-upload leaf. A pure
  `uploadBlobUniforms(gl, U, frameState)` that takes the resolved values and writes the uniforms; the
  composable's `drawFrame` becomes a thin caller. **This is the W-BLOB2/W-BLOB3 interaction surface —
  hence W-GOD1 runs AFTER them** (§6), so the extracted leaf is stable, not re-conflicted.
- Optionally `composables/useBlobWakeScheduler.ts` — the wake/quiescence scheduler — IF (1)+(2)
  extraction alone does not clear 500. The orchestrator keeps the watch/mount/unmount + the
  `start(canvas)` arming. Target: the composable body < 500 after the extractions.

### 2b. `constellationField.ts` (510 → < 500) — the warp-cluster split (H-constellation F6)

Split the focal-warp cluster (`nearestNode`/`warpStep`/`setWarpTarget`/`warpTo` + the `WARP_*`
consts, `:274-395`, ~120 lines) into `constellationWarp.ts`, leaving the neutral passes + seed/step
in `constellationField.ts`. CRITICAL: do NOT fork the `stepField → warpStep` call coupling
(`:271`) — `stepField` imports `warpStep` from the new sibling; the call stays a direct function
call. The `index.ts` barrel (`:3-26`) re-exports `nearestNode`/`warpStep`/`warpTo`/`setWarpTarget`
from the new file path — the PUBLIC symbol set is byte-identical (verified by the §3b barrel-parity
assertion). This runs AFTER W-CON1 lands `refitField` and W-CON2 lands the gravity-well egg force, so
the line count is final.

### 2c. `GlassDock.vue` (608 → < 500) — coordinate with W-DOCK2 (H-dock D8)

`GlassDock.vue` is script-only (no `<style>`); the 499-line `<script setup>` is the bloat. The script
already delegates the FLIP/morph/hold logic to composables (`useDockState`, `dockMorphContext`,
`useTouchGate`). The remaining bloat is prop-surface + the discriminated-union variant handling + the
template-ref/lifecycle wiring. Extract the variant-resolution + the prop-derivation helpers into a
`composables/useDockShellProps.ts` (or fold the per-variant computed cluster into `useDockState`'s
return if that is the cohesive home). Target: `<script setup>` < ~395 so the SFC (script + template
106) clears 500.

**This file is ALSO edited by W-DOCK2.** Sequencing (§6): **W-DOCK2 lands FIRST** (its rail/lockstep
edits), **then W-GOD1 carves** the post-W-DOCK2 file. Carving first would re-conflict with W-DOCK2's
diff. The §7 gate measures the carved file < 500 AFTER both land.

### §2 invariant — the carve is re-export-only at every barrel

Each new sibling is re-exported through the package's existing `index.ts` (goo-blob composables
barrel, constellation `index.ts`, dock composables barrel). The PUBLIC `@mkbabb/glass-ui/goo-blob`,
`/constellation`, `/dock` surface emits a byte-identical symbol set. Verified by §3b.

## §3 — Return-shape byte-identity, MACHINE-proven (resolve D-RETURN + D-CONFLICT)

### 3a. Name the Return interface on the carved composable

`useMetaballRenderer` currently returns a bare inline `{ pause, resume }` (`:683`). Author:

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
   array** (`:133-137`) — these are now CARVED, not whole-by-design. `ContinuousMarkers.vue` (`P.MARKERS`,
   if still > 300 and cohesive) MAY stay as the lone DO-NOT-SPLIT case, OR the clause is removed entirely
   if no file legitimately carries the banner post-carve. (Verify `ContinuousMarkers.vue` line count; if
   it is no longer a borderline file, drop clause 4 wholesale — the carve doctrine replaces the
   keep-whole-with-rationale doctrine for these.)
2. **Add `useMetaballRenderer` to the `returnChecks` array** (`:68-74`):
   `["useMetaballRenderer", P.RENDERER_BLOB, "UseMetaballRendererReturn", null]` (new `P.RENDERER_BLOB`
   path resolving `src/components/custom/goo-blob/composables/useMetaballRenderer.ts`). The clause
   asserts `export interface UseMetaballRendererReturn` is present (machine-proven the named shape exists).
3. **Add a BARREL-PARITY snapshot assertion** — the byte-identity-of-public-surface check the seed
   demands. The gate reads the goo-blob composables barrel + the constellation `index.ts` + the dock
   composables barrel and asserts each re-exports the EXACT expected symbol set (a hard-coded expected
   array, the snapshot). A carve that drops/renames a re-export reddens. This is the machine proof that
   the carve is re-export-only — the only thing that makes "byte-identical return shape" verifiable for
   a free-function family (constellation/GL leaves have no `Use*Return` to lock; the barrel symbol set
   IS their public shape).
4. **WIRE it** — add `"proof:composable-return-types": "node scripts/proof-composable-return-types.mjs"`
   to `package.json` scripts, and register it in `gates.mjs` with `tags:["local","ci"]` (it is now a
   binding structural gate, not dead code). Update its header note from "AW.W15" framing to the AY.W-GOD1
   re-scope (the carve doctrine + the new barrel-parity clause), greenfield-no-meta: state WHAT it locks,
   not the wave archaeology.

> The other existing clauses (the `twin-line-divider` DRY, `useTokenColor` resolver seam, the dom barrel
> Controls note, density colocation, the surviving `Use*Return` interfaces on countup/animated/numeric/
> dark/glassRenderer) STAY — they are still true and load-bearing; W-GOD1 only re-scopes the
> DO-NOT-SPLIT clause and ADDS the metaball return + barrel-parity clauses.

## §4 — CI-promote `proof:no-god-module` (resolve D-CI)

The promotion mechanism (verified in `gates.mjs:834-904`): edit the tag → re-emit ci.yml →
`proof:gen-ci-fresh` byte-matches.

> **The shared-line/shared-promotion deconfliction (the gates.mjs↔ci.yml overlap the seed
> flagged across W-GOD1 / W-CSS1 / W-LEG1).** `proof:no-god-module`'s tag flip (`gates.mjs:387`,
> `["local"]` → `["local","ci"]`) happens EXACTLY ONCE, and **W-CSS1 OWNS that single line edit**
> — because the gate cannot go GREEN under `ci` until BOTH the `.vue`/`.ts` carve (W-GOD1) AND the
> `.css` carve + `.css`-aware collector (W-CSS1) land; flipping the tag before the `.css` files are
> under bound would redden CI. So W-GOD1 lands its FOUR `.ts`/`.vue` carves and confirms
> `npm run proof:no-god-module` exits 0 over the `.ts`/`.vue` corpus (the precondition), but does
> NOT itself touch the `no-god-module` tag line. W-GOD1's OWN gates.mjs edit is the NEW registration
> of `proof:composable-return-types` (§3b.4) — a disjoint append, not the same line. The single
> ci.yml re-emit (`npm run gates:emit-ci`) is run by whichever of W-GOD1/W-CSS1/W-LEG1 lands LAST in
> Band E (the band-close orchestrator serializes it); `proof:gen-ci-fresh` byte-matches the final
> mirror. NO two waves hand-edit the same gates.mjs line; NO two waves race the ci.yml regeneration.

1. `scripts/gates.mjs:387` — the `tags:["local"]` → `tags:["local","ci"]` flip for `proof:no-god-module`
   is **W-CSS1's owned edit** (see deconfliction note above); W-GOD1 confirms the `.ts`/`.vue` corpus is
   GREEN as its precondition. The note update (strip the stale "W6 gates-close folds it into the ci
   aggregate" promise — the fold IS this band; state the CI binding plainly) rides W-CSS1's tag edit.
2. `npm run gates:emit-ci` — regenerates `.github/workflows/ci.yml` from the `ci`-tagged set. The
   no-god-module step now appears. The emit refuses if the backing script is absent
   (`renderCiYaml:838-849`); `scripts/proof-no-god-module.mjs` is present (verified), so the emit succeeds.
   Run ONCE at band-close by the last-landing wave (deconfliction note above) — NOT separately per wave.
3. **`proof:composable-return-types` is W-GOD1's OWN ci-tagged registration** — once it carries `ci`
   (§3b.4) and its npm script exists, the same band-close emit picks it up too. This registration is a
   disjoint gates.mjs append (new GATES row), not a contended line.
4. The ci.yml diff is the build-diff artefact for the gate (§7). `proof:gen-ci-fresh` (the byte-match
   meta-step, `gates.mjs:889-892`) confirms the mirror is fresh.

## §5 — Reconcile the stale banner (resolve D-BANNER)

`GlassDock.vue:2-6` — DELETE the stale `DO-NOT-SPLIT (AW.W15 assay): … 421-line … cohesive-at-boundary`
banner. The file is carved (§2c); the banner is false (file is 608, claim says 421) AND obsolete (the
carve doctrine supersedes the keep-whole rationale). Replace with a one-line note pointing at the
extracted sibling (`useDockShellProps`) IF a wayfinding comment helps — greenfield-no-meta: NO "split
at AY.W-GOD1" archaeology, just a plain "shell-prop derivation lives in ./composables/useDockShellProps".
Same for `SegmentedTabs.vue:2-7` — its DO-NOT-SPLIT banner goes when the `<style>` extracts (§1); the
script stays whole because it IS under bound, not because a banner says so.

## §6 — Sequencing (resolve the scope-reveal risk)

Per AY.md Band E (close, runs LAST) and the per-file edit overlaps:

| dependency | reason |
|---|---|
| **W-CON1, W-CON2 land BEFORE 2b** | they add `refitField` + the gravity-well egg force to the constellation engine — the line count is not final until they land (H-constellation F6). |
| **W-BLOB2, W-BLOB3 land BEFORE 2a** | they edit `drawFrame`/the config surface — extracting `uploadBlobUniforms` before they land re-conflicts on the same hot path (H-blob F5). |
| **W-DOCK2 lands BEFORE 2c** | both edit `GlassDock.vue`; W-DOCK2's rail/lockstep diff lands first, then W-GOD1 carves the post-W-DOCK2 file (H-dock D8). |
| §1 (SegmentedTabs `<style>` extract) has NO upstream — it may land any time in Band E. |

If any upstream wave's edit pushes a file's projected post-carve count back over 500, the carve
absorbs it (the gate measures the FINAL state); no re-plan needed.

---

## §7 — HARD GATE

A wave-closing condition, each line backed by an artefact (no grep-only / "API exists" check):

1. **`proof:no-god-module` is CI-tagged + GREEN over all four.** Artefact: `gates.mjs:387` reads
   `tags:["local","ci"]`; `.github/workflows/ci.yml` contains a `proof:no-god-module` step (the
   ci.yml build-diff); `npm run proof:no-god-module` exits 0 with the four named files each < 500 in
   its emitted artefact (`.cache/gates/AV-no-god-module.json` `violations:[]`). **Born-RED at HEAD**
   (exit 1, four violations — captured above), GREEN at close.

2. **Return shapes MACHINE-proven byte-identical.** Artefact: `proof:composable-return-types` is
   registered in `gates.mjs` with `tags:["local","ci"]` AND has a `package.json` script (the orphan is
   wired — `grep -c composable-return-types package.json` ≥ 1, born `0`); `npm run
   proof:composable-return-types` exits 0; its emitted facts show `UseMetaballRendererReturn` present
   AND the barrel-parity snapshot matches for goo-blob/constellation/dock (a dropped re-export reddens
   it — verified by a bite: temporarily delete one re-export → RED).

3. **The six protected render/behaviour gates stay GREEN across the carve.** Artefact: `npm run
   proof:blob-render`, `proof:blob-color-equivalence`, `proof:tabs-unified`, `proof:dock-animation-live`,
   `proof:dock-hold-contract`, `proof:constellation-field` ALL exit 0 at close — the render IS the
   truth, not the line count (H-blob F5). (These are the byte-identical-render witnesses for the
   metaball/constellation/tabs/dock carves.)

4. **The ci.yml mirror is byte-identical.** Artefact: `npm run proof:gen-ci-fresh` exits 0 (the emitted
   ci.yml byte-matches `gates.mjs --emit-ci`) — proves the CI promotion (§4) is reflected, not drifted.

5. **No public-surface delta.** Artefact: `npm run typecheck` (vue-tsc) clean; `npm run build` green;
   a `git diff` of the three package barrels (`goo-blob/composables/index.ts`,
   `constellation/index.ts`, `dock/composables` barrel) shows ONLY path re-wiring, the exported symbol
   set unchanged (the re-export-only diff). Lint clean.

6. **The stale banners are reconciled.** Artefact: `grep -n 'DO-NOT-SPLIT' src/components/custom/dock/GlassDock.vue
   src/components/custom/tabs/SegmentedTabs.vue` → 0 hits (both carved; banners removed, §5); the orphan
   gate's `doNotSplitTargets` no longer names those two files (§3b.1).

**The single binding condition:** `proof:no-god-module` and `proof:composable-return-types` are both
CI-tagged and GREEN, the four files are each < 500 with their public return/export surface
barrel-parity-proven byte-identical, and the six protected render gates + `proof:gen-ci-fresh` +
typecheck + build + lint stay green — born-RED at HEAD (4 violations + 2 orphaned/untagged gates),
GREEN at close.
