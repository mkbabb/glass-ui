# BLEND-MORPH ENGINE — the WAVE-AMENDMENT (reconciled vs the extant 116-wave union set)

> The CONCRETE tranche amendment for the unifying blend/morph WELD primitive. Each touched wave is
> cited by filename under `docs/tranches/BD/union/waves/`. Reference impl: `GOLDEN.md`. Delta:
> `DELTA-ASSAY.md`. **No duplicative work** — the V↔H crossfade-kill, the `useLiquidMorph` delete,
> and the FLIP/DRIVE runner are ALREADY booked by extant waves; this amendment AUGMENTS them + adds
> the ONE genuinely-new WELD primitive + the ONE missing token wave, and re-points the forks.

---

## SUMMARY — the COLLAPSE

The GOLDEN §12 proposed ONE mega-wave `BD.W-MORPH-FIELD-WELD`. Reconciled against the extant set it
**COLLAPSES to: 1 NEW WELD wave + 1 NEW token wave + 5 AUGMENTs + 2 RECONCILE/CROSS-LINK + 0 PRUNE +
the GOLDEN-side EXCISIONS.** Three of the GOLDEN's boldest moves are already-booked waves
(`BD.W-VH-COMPOSE`, `BD.W-SPIKE-DELETE`, `BD.W-FLIP-SPINE`); duplicating them would violate the
no-duplicative-work law.

---

## NEW WAVE #1 — `BD.W-MORPH-FIELD-WELD` (the ONE weld primitive + the GooFilter merge)

**Band: motion/foundations (the WELD spine the morph band rides). Depends:** `BD.W-FLIP-SPINE`
(the `useElementBloom`/`ElementMorph` DRIVE the capture-morph composes) · `BD.W-SPIKE-DELETE`
(`useLiquidMorph` gone, so the weld has no dual path) · `BD.W-DOCK-CORE` (the `--dock-morph-t` drive
+ the measure-leg disposition this weld reads, NOT re-mints) · `BD.W-SAFARI-FILTER-FLOOR` (the
sRGB-on-every-filter census the ONE `<GooFilter>` must satisfy) · `BD.W-MORPH-PUNCH-TOKENS` (NEW #2,
SKIP-gated).

**Builds:**
- `src/composables/motion/useMorphField.ts` — the WELD atom. `MorphFieldOptions{bodies, signature,
  driveVar?='--goo-t', weight?, tier?='auto'}`; reads the consumer's EXISTING drive scalar (NO
  rename); the gap-fraction `k(t)=lerp(kRest,kPeak,bell(t))·gap(t)` driving the Tier-S FILTER params
  (the broken-tier fix, challenge #3 R5) + Tier-G; calls `useElementBloom.flipFrom` for arbitrary-
  rect travel (HARD-gated ONLY for `silhouette:'capture'`).
- `src/components/custom/goo-filter/GooFilter.vue` — ONE `<filter :id :blur :slope :offset>`, mounted
  once at shell root, exposing every id (`glass-goo`/`dock-fission-goo`/`pager-goo`/`dock-morph-goo`).
  Graph byte-identical to today's `GlassGooFilter`. `GlassGooFilter.vue` + `DockGooFilter.vue` DELETE
  (re-export ids, no alias).
- `src/styles/motion/morph-field.css` — the body/neck/waist recipe + a DEDICATED `@property` squish
  channel (NEVER `--stretch`); `MORPH_SIGNATURES` is DATA, motion-named.
- The re-points (thin recipes, all keeping their public names + drive scalars): `useGooMorph`
  (`lateralNeck`,`--goo-t`), `useDragMorph`/`useTabDragMorph` (`directed`), `useDockFission`
  (`lateralPeel`/`radialBurst`, `--neck-t`/`--island-t`, box-INVIOLATE).

**The KEYSTONE reconcile (challenge #1 R2 — the deft-integration fix):** the dock signatures
(`collapse`/`axialNeck`) COMPOSE the **shipped** `--dock-morph-t` drive (`useLayerTransition` /
`dockMorphContext`), NOT a phantom `useElementMorph`. The `useElementBloom` dep is scoped to ONLY the
arbitrary-rect `silhouette:'capture'` case. So the engine is buildable for ~95% of morphs with zero
unbuilt-sibling BLOCK.

**Gate `proof:morph-field-weld` (born-RED on HEAD, paired-engine Chromium + Safari-26-Metal):**
- **M1 (unification, COMPUTED census):** ONE `<GooFilter>` shell-root mount, zero duplicate
  `<filter id>` graphs across the route SET (born-RED: `dock-fission-goo` mounts TWICE live on
  `/dock/liquid-playground`); `morphForksAccountedFor(census) >= 12` over an ENUMERATED call-
  expression scan that REDs on any unlisted spring-`Morph`/`Transition`/FLIP composable (NOT the
  GOLDEN's frozen `=== 9`); `useLiquidMorph` absent (asserted by `BD.W-SPIKE-DELETE`).
- **M2 (the waist, WHOLE-MORPH, polygon-free — challenge #2/#3 TOP):** `max_t S.ratio ≤ 0.45` AND
  `hasLocalMinimum` across the ENTIRE `[data-morphing]` window, read from RENDERED Tier-S pixels of
  two PLAIN circles (delete `paintHourglass`), never the swept-min frame, never a hand-drawn polygon.
  Born-RED against the current spike (Tier-S balloons to 0.558 at mid-merge → RED).
- **M3 (crossfade dies):** asserted by `BD.W-VH-COMPOSE` (this wave SUPPLIES the field-weld
  projection it uses); born-RED on HEAD (`--dock-morph-t≡0` live through the standard sweep).
- **M4 (tier ladder, MEASURED both sides):** `max_t |S−G| ≤ 0.10` across every connected frame (NOT
  `|S−G|` at the cherry-picked min — born-RED at 0.347); both tiers from the SAME two-circle field;
  `noPerFrameToDataURL(trace) && noFullPanelJSRaster(trace)`.
- **M5 (punch — SKIPPED until tokens land):** `if tokenExists('--motion-weight') &&
  tokenExists('--ease-cartoon-punch')` → squish X·Y≈1, anticipation dip, √φ overshoot, the ink cast
  on the `--shadow-cartoon-*` rung pooling at the waist, warm-cream C≥0.010 H∈[45,85]. Else
  SKIP-as-unproven (NOT faked-green). Born-RED-SKIP on HEAD (tokens absent).
- **M6 (perf + the OWED Safari capture):** ~2–4 transforms/frame, filter gated to `[data-morphing]`,
  Tier-G one-GL offscreen-paused + live-canvas mask; **the OWED real Safari-26-on-Metal frame-series
  for Tier-S + the V↔H sweep is a RED gate that BLOCKS GREEN** (challenge #2 R2), not a prose carve —
  or the V↔H weld defaults to Tier-C teardrop on WebKit.
- **Cross-wave HARD gate (scoped):** `assert(exists('useElementBloom') || !usesCapture)` — only the
  `silhouette:'capture'` path blocks on the FLIP runner.

---

## NEW WAVE #2 — `BD.W-MORPH-PUNCH-TOKENS` (the missing Band-0 token wave)

**Band 0 (foundations). Depends: `BD.W-DESIGN-LANGUAGE-CONGRUENCE` (the precept source).**

**The finding:** the GOLDEN + the tabs/buttons/chip ledger rows ALL assert `--motion-weight` /
`--ease-cartoon-punch` are "booked by Band-0 `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH`" — but those
waves do NOT exist in the union set (grep: 0 files), and the tokens are absent from `src/styles/`.
The cartoon-punch is a phantom dependency across SIX consumers (tabs, buttons, chips, dock, fission,
this weld). **Either author the token wave or the punch stays permanently SKIPPED across the
tranche.** This wave AUTHORS them ONCE.

**Builds:** `src/styles/tokens/property-regs.css` — register `@property --motion-weight` (number,
inherits) + `--ease-cartoon-punch` (the `linear()` ~4% sub-origin dip + ~22% overshoot, design.md
§Easing) + the dedicated punch-squish `@property` (NOT `--stretch`). Rides the SHIPPED
`--shadow-cartoon-*` cast rung.

**Gate `proof:morph-punch-tokens` (born-RED):** both tokens present + registered + PRM→0; the six
consumer waves' SKIPPED-punch arms FLIP to RED-then-GREEN once it lands. Born-RED on HEAD (absent).

---

## AUGMENTS (cited by filename — no duplication)

- **`BD.W-VH-COMPOSE.md`** — AUGMENT: the continuous V↔H this wave already makes the default becomes
  a `useMorphField` `axialNeck` field weld (column-mass + row-mass, topology-free) reading the SAME
  `--dock-morph-t`, replacing the crossfade-under-bridge with a real lobbing teardrop. Add the M2
  whole-morph waist arm + the Tier-C-teardrop Metal floor. The crossfade-kill + grab-pull stay this
  wave's; the WELD projection is supplied by `BD.W-MORPH-FIELD-WELD`. **No new V↔H wave authored.**
- **`W-GOO-MORPH-REFINE.md`** + **`W-GOO-CAROUSEL-DECK.md`** — AUGMENT: `useGooMorph` becomes the
  `lateralNeck` recipe over `useMorphField`; the `<GooFilter>` merge LANDS the one-mount these waves
  flagged; `--goo-t` NOT renamed; the magnitude retunes ride the shared weld's gap-fraction `k`.
- **`BD.W-FISSION-FILAMENT.md`** + **`BD.W-DOCK-GOO-SPACING.md`** — AUGMENT: the body-anchored
  spanning neck + the `--dock-goo-spacing` gap-blur become the `lateralPeel`/`radialBurst` signatures
  in `MORPH_SIGNATURES`; `#dock-fission-goo` folds into the ONE `<GooFilter>` mount; `--neck-t`/
  `--island-t` NOT renamed. `useDockFission` public API box-INVIOLATE.
- **`BD.W-GOO-SPLIT-PERF.md`** — AUGMENT: the OWED real-Safari-26-on-Metal p50 capture is REUSED as
  this weld's M6 paired-engine RED gate (Tier-S default + the V↔H sweep), not a parallel harness.
- **`BD.W-SAFARI-FILTER-FLOOR.md`** — AUGMENT: the sRGB-on-every-SVG-filter census now asserts over
  the ONE `<GooFilter>` mount (one place to regress, one place to fix).

## RECONCILE / CROSS-LINK (no edit, named for the seam)

- **`BD.W-FLIP-SPINE.md`** — CROSS-LINK: its `useElementBloom`/`flipFrom`/`ElementMorph` IS the DRIVE
  the capture-morph composes (the GOLDEN's `useElementMorph`, already named). No second FLIP runner.
- **`BD.W-SPIKE-DELETE.md`** — CROSS-LINK: it already DELETES `useLiquidMorph` (462-line, 0 src
  consumers). The blend-morph amendment does NOT re-delete it.
- **`BD.W-DOCK-CORE.md`** — RECONCILE: `dockMorphMeasure.ts` is the dock-DRIVE measure helper
  (BB.W-CARVE4 colocation), NOT the weld's to delete; its WIDTH-measure-leg RE-INVENT is dock-core's.
  The `collapse` signature (tier C, 1-body) IS dock-core's ratio-free `--dock-live` blend.
- **`useViewTransition.ts`** (no wave) — KEEP-with-reason: real `useLiquidReveal`/`useDockCtaReceive`
  consumers, a cross-route reveal primitive (a different job than the in-dock weld). NOT deleted
  (challenge #1 R3 resolved — only the showcase VT *default* dies, via `BD.W-VH-COMPOSE`).

## PRUNE / EXCISE

- **PRUNE: none** (every fork REFINES or is deleted by an already-booked wave).
- **EXCISE from `GOLDEN.md` (over-claims the source/wave reality corrects):** the `=== 9` census gate
  (→ `>= 12` computed scan); the "≥2 goo mounts per route" born-RED (→ one-shell-root + duplicate-id);
  the "RE-INVENT `useDockOrientationMorph`" framing (it is REFINE — the VT crossfade lives in the
  DEMO); the whole-engine BLOCK on a phantom `useElementMorph` (→ `useElementBloom` + the shipped
  `--dock-morph-t` drive, capture-only scope); the "Band-0 BD.W-MOTION-WEIGHT/BD.W-CARTOON-PUNCH"
  claim (those waves don't exist → `BD.W-MORPH-PUNCH-TOKENS` authors them); the §11 cherry-picked
  spike numbers + the `paintHourglass` polygon (→ whole-morph polygon-free gate).

---

## THE BORN-RED ONE-LINER (live-grounded this session)

HEAD ships V↔H as a `view-transition-name` crossfade (`--dock-morph-t≡0` through the sweep — M3 RED),
4 morph scalars co-resident on one node (M1 RED), `dock-fission-goo` mounted TWICE on liquid-
playground (M1 RED), the punch tokens + their waves absent (M5/M2-token SKIPPED-RED), the census
missing 3 forks (M1 RED), and the de-risk spike's Tier-S waist balloons to 0.558 at mid-merge
(M2 RED). The ONE `<GooFilter>` + `useMorphField` weld + the gap-fraction Tier-S threshold + the
composed `--dock-morph-t`/`useElementBloom` drive + the whole-morph waist gate drive every arm GREEN.
