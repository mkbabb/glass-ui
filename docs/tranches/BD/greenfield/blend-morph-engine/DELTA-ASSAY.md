# BLEND-MORPH ENGINE — the DELTA-ASSAY (golden-vs-current + the UNION path)

> The survival-of-the-fittest delta between `GOLDEN.md` (hardened against the three
> `challenge/{1,2,3}.md`) and the CURRENT `src/` implementation, plus the DEFT UNION path:
> precisely how to evolve the current toward the golden REUSING extant primitives + extant
> waves, KISS, no legacy, no dual-path. Live-inspected Chrome :5173 (`/dock/morph-showcase`,
> `/dock/liquid-playground`) + filesystem-verified every fork this session.
> Companion: `WAVE-AMENDMENT.md` (the concrete tranche amendment). Reference impl: `GOLDEN.md`.

---

## 0 · THE METHOD + THE LIVE/SOURCE GROUND TRUTH (this session)

Filesystem-exact (`wc -l`, this session) + live readback (Chrome :5173). The GOLDEN's thesis
SURVIVES; its EVIDENCE layer and its census/keystone over-claim, exactly as the three challenges
found — and two further deltas the challenges and the GOLDEN BOTH miss, found by reconciling
against the extant 116-wave union set.

### 0.1 The census is ≥12 forks, NOT 9 (challenge #1 R1 — filesystem-CONFIRMED)

| fork (verified path) | LOC | role | GOLDEN census? |
|---|---|---|---|
| `src/composables/motion/useGooMorph.ts` | 353 | carousel/deck/pager goo NECK (`--goo-t`) | ✓ |
| `src/composables/motion/useLiquidMorph.ts` | 462 | BE spike — generalized morph (0 src consumers) | ✓ |
| `src/composables/motion/useLiquidFlex.ts` | 206 | the volume-preserving squish leaf | ✓ |
| `src/composables/motion/useDragMorph.ts` | 420 | drag-driven element morph | ✓ |
| `src/components/custom/dock/composables/useDockOrientationMorph.ts` | 286 | dock V↔H (writes `--dock-morph-t`) | ✓ |
| `src/components/custom/dock/composables/useDockMorphWindow.ts` | 118 | asymmetric enter/leave timing window | ✓ |
| `src/components/custom/dock/composables/dockMorphMeasure.ts` | 354 | per-swap FLIP measure pipeline | ✓ |
| `src/components/custom/dock/composables/useDockFission.ts` | 599 | n-ary split (`--neck-t`/`--island-t`) | ✓ |
| `src/components/custom/tabs/composables/useTabDragMorph.ts` | 131 | tab-drag morph | ✓ |
| **`src/components/custom/dock/composables/useLayerTransition.ts`** | **385** | **dock collapse/expand DRIVE — ONE spring → `--dock-morph-t`** | **✗ (0 mentions)** |
| **`src/components/custom/dock/composables/dockMorphContext.ts`** | **498** | **the dock morph ORCHESTRATOR (multi-target, ONE spring, ONE `--dock-morph-t`)** | **✗ (0 mentions)** |
| **`src/composables/motion/useViewTransition.ts`** | **223** | **the View-Transitions primitive (real src consumers)** | **✗ (0 mentions)** |

The GOLDEN's M1 gate `morphForksAccountedFor(census) === 9` is a **magic literal that GREEN-passes
while 3 live forks go unaccounted** — the exact overfit-to-the-count the overfitting-audit lesson
warns against. **REFINE → `>= 12` over a COMPUTED enumerated call-expression scan**, dispositions
listed below, so a future 13th fork REDs instead of silently passing.

### 0.2 Live readback (Chrome :5173, this session — born-RED grounded)

- `/dock/morph-showcase`: 4 morph scalars co-resident on one dock node — `--dock-morph-t · --goo-t
  · --neck-t · --island-t` ALL `= 0` simultaneously (scalar sprawl REAL — M1 born-RED holds).
- **V↔H standard morph is a crossfade dodge:** clicked "Morph to vertical", sampled
  `--dock-morph-t` every 40ms for 400ms — it reads `0.000` at EVERY sample, `data-morphing` never
  arms, and `view-transition-name` is present. The standard morph drives NO field (M3 RED grounded).
- **The goo-filter mount census is STALE as written** (challenge #3 R4 confirmed): morph-showcase
  mounts ONE filter (`#dock-fission-goo`), NOT the "≥2 per route" the GOLDEN cites. BUT
  `/dock/liquid-playground` mounts `dock-fission-goo` **TWICE** (a literal duplicate-id mount). The
  DRY win is real (source-level two-SFC byte-identical graphs + a live duplicate-id); the born-RED
  phrasing must be RE-SCOPED from "≥2 per route" to "ONE shell-root `<GooFilter>`, zero duplicate
  `<filter id>` graphs across the route SET" (and the duplicate-id case is its own RED).
- **The warm floor is LIVE, not gray:** `.dock-morph-pane` paints `color(srgb 0.944 0.903 0.865 /
  0.52)` — the §5 warm-cream floor SHIPS (not the bug). The showcase's broken plates (the GOLDEN §5
  `rgba(0,0,0,0)` zero-alpha plates) are a SEPARATE demo-side defect, not a library material gap.
- **Tokens:** `--motion-weight` / `--ease-cartoon-punch` ABSENT in `src/styles/`; `--shadow-cartoon-md`
  PRESENT (`-4px 3px 1px color-mix(in srgb …)`). The punch gate is correctly SKIPPED-as-unproven.

### 0.3 The TWO deltas the GOLDEN over-claimed novelty on (the no-duplicative-work reconcile)

The single most important assay finding — the GOLDEN frames its three boldest moves as new, but the
extant union set ALREADY books them under different names. **This is what shrinks the amendment from
a new mega-wave to one consolidation wave + a thin recipe pass:**

1. **The V↔H crossfade-kill ALREADY HAS A WAVE — `BD.W-VH-COMPOSE`.** It retires the showcase's
   `startViewTransition` default, composes the SHIPPED continuous `useDockOrientationMorph` scalar as
   the DEFAULT (the `liquidPreview` gate evaporates), wires `useDragMorph` grab-pull, on the T1 chain
   `FLIP-SPINE → SPIKE-DELETE → VH-COMPOSE`. **The GOLDEN's §4b/M3 "crossfade DIES" is THIS wave's
   job, not a new one.** And the crossfade lives in the demo (`morph-showcase.vue` + `AppShell.vue`),
   NOT in `useDockOrientationMorph` — which is a REAL `SpringProgress` writing `--dock-morph-t` with a
   crossfade-under-goo-bridge. So the GOLDEN's "RE-INVENT the composable" disposition is WRONG: the
   composable is REFINE (continuous teardrop weld), the DEMO default is the thing that dies.

2. **The DRIVE/FLIP runner ALREADY HAS A WAVE — `BD.W-FLIP-SPINE` mints `useElementBloom`.** It is
   the ONE FLIP-inversion rAF runner exposing `flipFrom(settledRect, sourceRect, origin)` → an
   `ElementMorph` (`morph.apply(el, inv)`), folding the 4-way bloom re-fork. **That IS the GOLDEN's
   `useElementMorph` DRIVE atom — different name, already booked.** The GOLDEN BLOCKs the whole engine
   on a NON-EXISTENT `useElementMorph`; the fit, shipped/booked drive is `useElementBloom` (the
   element-rect FLIP) + `useLayerTransition`/`dockMorphContext` (the dock `--dock-morph-t` FLIP). The
   keystone is backwards (challenge #1 R2). **And `useLiquidMorph` is ALREADY DELETED by
   `BD.W-SPIKE-DELETE`** (462-line, 0 src consumers) — the GOLDEN's "DELETE useLiquidMorph" is that
   wave's job. `useViewTransition` has REAL src consumers (`useLiquidReveal`, `useDockCtaReceive`) →
   KEEP-with-reason (cross-route reveal primitive), NOT delete (challenge #1 R3 resolved).

---

## 1 · THE DELTA — KEEP / REFINE / RE-INVENT, survival of the fittest

### 1.1 KEEP (FIT — survives verbatim; do NOT re-invent)

- **The static SVG goo graph + every §L7 Safari fact** (`GlassGooFilter.vue` / `DockGooFilter.vue`):
  literal `stdDeviation`, `color-interpolation-filters="sRGB"`, region `−50%/200%`, regular
  `filter:url()` NOT `backdrop-filter:url`, the 1×1 non-zero host. Byte-for-byte correct.
- **`SpringProgress` + `DOCK_SPRING {response 0.32, ζ 0.7}`** — the ONE spring register, shared by
  `useLayerTransition` / `dockMorphContext` / `useDockOrientationMorph` / `useDockFission`. Already
  the single clock; no second spring is needed or wanted.
- **`useLiquidFlex`** (tanh squish, X·Y≈1, cap) — the cartoon-weight leaf every fork already
  consumes. NO change.
- **`useDockMorphWindow`** — the asymmetric enter/leave SCHEDULING. Orthogonal to the weld. KEEP.
- **The dock `--dock-morph-t` single-scalar DRIVE** (`useLayerTransition` + `dockMorphContext`): the
  FLIP measure-once, the velocity-continuity re-base, the PRM seatSync, the per-target generations.
  This is the FIT, shipped DRIVE the GOLDEN ignored. KEEP + COMPOSE (do not re-mint, do not BLOCK on
  a phantom).
- **`useDockOrientationMorph`'s** real `SpringProgress` + `pin(value)` deterministic capture seam +
  the two-flex span model. KEEP the spring/scalar/pin; REFINE only the crossfade-under-bridge → a
  continuous metaball teardrop weld (and that refine is `BD.W-VH-COMPOSE`'s default-flip + the weld).
- **`useViewTransition`** — KEEP (real `useLiquidReveal`/`useDockCtaReceive` consumers; a cross-route
  reveal primitive, a DIFFERENT job than the in-dock weld). Only the showcase VT *default* dies.
- **The goo-blob `smin` chunk** (`sminCircular`/`sminG`/`sdgCircle`, GLSL+WGSL) + `feDisplacementMap`
  (`useGlassRenderer`). KEEP; PROMOTE to the opt-in Tier-G renderer (named, not re-built).

### 1.2 REFINE (WEAK — fit spine, evolve toward the golden)

| current | weak because | refine to |
|---|---|---|
| `useGooMorph` | owns its own two-edge geometry; no shared WELD vocabulary; the threshold is a fixed `slope/bias` with NO gap-relativity (over-eats large arms — challenge #3 R5) | a thin recipe `signature:lateralNeck, driveVar:'--goo-t'`; the gap-fraction `k` drives the **Tier-S filter params** (the broken tier), not just Tier-G |
| `useDockOrientationMorph` | the V↔H still CROSSFADES the two plates UNDER a goo bridge at the occluded midpoint (a topology dodge, gentler than the showcase VT but still a fade) | a continuous topology-free field weld: column-mass + row-mass are two distributions in ONE field, the threshold finds fewer→more components as `--dock-morph-t` sweeps. Keep the spring/scalar/pin |
| `useDockFission` | already FIT (the n-ary detach + recoil + PRM); the neck shape is the one weak leg (`BD.W-FISSION-FILAMENT` body-anchor + `BD.W-DOCK-GOO-SPACING` gap-blur already address it) | a recipe over the SAME weld: signatures → `MORPH_SIGNATURES` (`lateralPeel`/`radialBurst`); offsets off `--neck-t`/`--island-t` (NO rename). Public API box-INVIOLATE |
| `useDragMorph` / `useTabDragMorph` | each owns drag→morph glue | thin recipes `signature:directed`; drive = the drag pointer; weld = the shared engine; keep names |
| `GlassGooFilter.vue` + `DockGooFilter.vue` (+ inline `#dock-morph-goo` + `#pager-goo`) | TWO byte-near-identical SVG graphs at two scales; live duplicate-id mounts | ONE `<GooFilter :id :blur :slope :offset>` SFC mounted ONCE at shell root, exposing N ids; old SFCs re-export ids, no alias |

### 1.3 RE-INVENT (BROKEN — only the genuinely broken)

- **The showcase V↔H `startViewTransition` crossfade DEFAULT** (`morph-showcase.vue` +
  `AppShell.vue`) — drives `morph.t≡0`, a topology dodge. **DELETE the default** (clean break). This
  is `BD.W-VH-COMPOSE`'s job; the blend-morph amendment AUGMENTS that wave with the field-weld
  projection, it does not author a parallel V↔H wave.
- **The Tier-S scale-blindness** — the only genuinely broken mechanism the de-risk spike reproduced:
  a fixed `slope/bias` threshold tuned for small plates over-eats a 296px arm to a dot. RE-INVENT the
  threshold as gap-relative (the §1.4 gap-fraction `k` driving the FILTER params, not just Tier-G).
- **`dockMorphMeasure.ts`** — the GOLDEN calls it "the ratio-FLIP seizure" to DELETE. **DELTA
  CORRECTION:** at HEAD it is NOT a racing co-driver — it is the CARVED pure measure/seat helper
  module that `dockMorphContext` IMPORTS (`armRootMorphSpan`, `measureAndArmMorph`, `seatTargetSync`,
  the BB.W-CARVE4 colocation). It is the dock-core measure leg; `BD.W-DOCK-CORE` already triages the
  WIDTH-measure leg as RE-INVENT. So: do NOT blanket-DELETE; RECONCILE with `BD.W-DOCK-CORE`'s
  measure-leg disposition (it is the dock drive's measure helper, not the weld's, and not the weld's
  to delete).

### 1.4 The TIER LADDER + the SDF verdict (KEEP the golden's read — it is sound)

The GOLDEN's three-tier caps ladder survives all three challenges as ARCHITECTURE and is the right
target: **Tier C** (compositor CSS — 1-body collapse + small 2-body, the clip-path hourglass waist,
the universal floor) → **Tier S** (static SVG goo, the 2..N-body metaball default, the compositor-
filter pass, ~95% of morphs) → **Tier G** (opt-in GPU `sminCircular`/`sminG` SDF, viz-luxury + the
one true `silhouette:'capture'` arbitrary-outline morph, reaching CSS via live-canvas /
`transferToImageBitmap`, NEVER per-frame `toDataURL` — the measured 50.9ms pothole). SDF
COMPLEMENTS, never replaces, the SVG-goo. Houdini `paint()` measured-and-rejected (p95 43.6ms;
Safari-absent + polyfill = the fatal raster seam). **No delta here — adopt the ladder as written, but
honestly carry the OWED items (below) as RED gates, not prose carves.**

---

## 2 · THE UNION PATH — deft integration, KISS, no legacy, no dual-path

The GOLDEN is not a tenth engine; it NAMES two atoms the forks already share. The union path, after
reconciling against the extant waves, is THINNER than the GOLDEN's §12 single mega-wave:

1. **Name the WELD atom once — `useMorphField` (`src/composables/motion/useMorphField.ts`).** The
   WELD layer only: N warm bodies → a `smin`/blur-threshold fusion with a real gap-relative waist,
   reading whatever drive scalar the consumer ALREADY owns (`--goo-t` / `--dock-morph-t` /
   `--neck-t`, NO rename). Signatures are DATA in ONE `MORPH_SIGNATURES` map (motion-named:
   `lateralNeck`/`lateralPeel`/`radialBurst`/`inwardMerge`/`axialNeck`/`directed`).

2. **COMPOSE the extant DRIVE — do NOT mint or BLOCK on `useElementMorph`.** The dock signatures
   (`collapse`/`axialNeck`) COMPOSE the shipped `--dock-morph-t` drive (`useLayerTransition` /
   `dockMorphContext`). The arbitrary-rect element→element travel (`silhouette:'capture'`/
   `inwardMerge`) COMPOSES `useElementBloom`'s `flipFrom`/`ElementMorph` (`BD.W-FLIP-SPINE`). The
   HARD-dep is scoped to ONLY the `silhouette:'capture'` case (the one no shipped drive covers), so
   `useMorphField` is buildable for ~95% of morphs even if a sibling slips. **No phantom file, no
   whole-engine BLOCK.**

3. **Merge the goo mounts — ONE `<GooFilter :id>`.** `GlassGooFilter`/`DockGooFilter` (+ inline +
   pager) → ONE parameterized SFC, mounted once, exposing every id. The §L7 facts in ONE place.

4. **Project through the tier ladder; the gap-fraction `k` drives the Tier-S FILTER** (the broken
   tier), fixing the 296px→dot defect. Tier C the floor, Tier S the default, Tier G opt-in.

5. **The cartoon punch is welded in but NO-OPS until the tokens land.** `--motion-weight` /
   `--ease-cartoon-punch` do NOT exist in `src/styles/` AND are NOT booked by any wave in the union
   set (the GOLDEN's "Band-0 BD.W-MOTION-WEIGHT/BD.W-CARTOON-PUNCH" are NOT on disk — verified). So
   the amendment must AUTHOR the token wave (or the punch stays permanently SKIPPED). The cast rides
   the SHIPPED `--shadow-cartoon-*` rung, never a hex.

6. **The crossfade-kill + grab-pull + `useLiquidMorph` DELETE are ALREADY booked** (`BD.W-VH-COMPOSE`
   / `BD.W-SPIKE-DELETE`). The blend-morph amendment AUGMENTS them with the field-weld projection +
   the shared-weld recipe; it does NOT duplicate them.

**Net:** ≥12 forks → ONE `useMorphField` WELD + the SURVIVING leaves (`useLiquidFlex`,
`useDockMorphWindow`, the `--dock-morph-t` DRIVE, `useElementBloom`, `useViewTransition`) + ONE
`<GooFilter>` + the PROMOTED GPU/displacement Tier-G + every fork re-pointed to thin recipes. The
ONLY pure DELETE the blend-morph amendment owns is the GOLDEN-side over-claim correction;
`useLiquidMorph` + the VT default are deleted by their OWN extant waves. NO LEGACY, NO ALIASES, NO
DUAL-PATH.

---

## 3 · THE HONESTY CARVES (the OWED items — RED gates, not prose)

The three challenges' surviving wounds, carried into the amendment as born-RED gates (never
faked-green):

- **The tier-agreement spike is a cherry-pick** (challenge #2/#3 TOP): `field-weld-measured.html`
  PASSES `|S−G|=0.017` only at the swept-min frame `t=0.20`; across the morph `|S−G|` reaches 0.347
  and the Tier-S waist balloons to 0.558 at the merge midpoint. **The M2/M4 gates must assert
  ACROSS THE WHOLE `[data-morphing]` window** (`max_t S.ratio ≤ 0.45` and `max_t |S−G| ≤ 0.10`), AND
  render BOTH tiers from the SAME two-circle field (delete `paintHourglass` — the hand-drawn polygon
  doing the metaball's job). Born-RED against the current spike (0.347 → RED).
- **Zero Safari-26-on-Metal capture** (challenge #2 R2): every measured number is Chromium. The
  paired-engine π (Tier-S default + the V↔H sweep) is asserted-from-mechanism, OWED at execution as a
  RED gate that BLOCKS GREEN — or the V↔H weld defaults to the Tier-C teardrop on WebKit.
- **`silhouette:'capture'` is unspiked + a cross-engine taint risk** (challenge #2/#3 R3): the one
  genuinely-new capability. DEMOTE from "the directive's ask, answered" to "a Tier-G affordance owed
  a cross-engine capture spike at execution."
- **The transmissive-field + cartoon-cel gestalts have zero realization** (challenge #3 R2/R3): the
  spike paints opaque cream over a `rgba(0,0,0,0)` field + reports a written literal as "never gray";
  the cartoon cel has only an arc. OWED a transmissive-composite re-spike + a cartoon-cel spike
  (mocked tokens declared as mocks) at execution.

---

## 4 · CONVERGENCE

**Verdict: REFINE-dominant (the spine, the drive, the material, the tier ladder all FIT) + one
RE-INVENT (the showcase V↔H crossfade default + the Tier-S scale-blindness) — ~76%.** The thesis is
sound and mostly verified-true; the deft-integration is now honest (compose the shipped
`--dock-morph-t` drive + `useElementBloom`, not a phantom; reconcile against `BD.W-VH-COMPOSE` /
`BD.W-SPIKE-DELETE` / `BD.W-FLIP-SPINE` rather than re-authoring their work; author the missing
punch-token wave; re-scope the census + mount-count gates off magic literals). Remaining ~24% =
build-time: the polygon-free whole-morph waist gate, the Tier-S gap-relative threshold, the paired-
engine Safari-Metal capture, the `silhouette:'capture'` spike, the transmissive + cartoon-cel
re-spikes, and the `useMorphField` + `<GooFilter>` build itself (all user-gated). DELTA-ASSAY.md +
WAVE-AMENDMENT.md written; `delta-live-playground.png` captured.
