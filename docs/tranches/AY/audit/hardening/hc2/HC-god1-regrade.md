# HC-god1-regrade — AY.W-GOD1 re-graded against Batch-2-complete HEAD (CloseOut)

**Date** 2026-06-09 · **Lane** HC-god1-regrade · **Verdict** SPEC-HARDENED
**Edited** `docs/tranches/AY/waves/AY.W-GOD1.md` (title, goal, §0 recount table, §1 stamp,
§2 six-target carve re-grade, §3 cite/scope fixes, §4 + §4.R ratchet, §5, §6, §7).
All counts below are LIVE re-runs at HEAD, not corpus quotes.

## 1. The recount (the binding §0 table) — SIX violators, not four/five

`node scripts/proof-no-god-module.mjs` → **FAIL, exit 1, 6 violations** over 531 scanned files:

| file | spec graded | matrix found | **HEAD** | delta source |
|---|---|---|---|---|
| `constellationField.ts` | 510 → 653 (re-ground) | 959 | **959** | W-CON2 well cluster (`:526-633`) + warp/auto-drift growth (`:634-846`) — confirmed |
| `useMetaballRenderer.ts` | 694 → 707 | 692 | **692** | W-BLOB3 DI strip eased it 15 — confirmed |
| `SegmentedTabs.vue` | 689 | 689 | **689** | unchanged; script 307 / template 110 / style 267 EXACT — §1 stands verbatim |
| `GlassDock.vue` | 608 (script 499) | 624 | **624** | script grew to **515** (1–516); template 518–624; banner `:2-6` still claims 421 |
| `Constellation.vue` | — (never graded) | 597 | **597** | NEW: a TRUE logic god-module — script 1–569 (568), template 5, style 20 |
| `mediums.glsl.ts` | — (never graded) | — (matrix ALSO missed it) | **528** | NEW: `.ts`-suffixed GLSL chunk module; the gate's own output names it; W-AUR-PAINTERLY edits `:385-386` |

**The matrix itself was one short:** NECESSITY-MATRIX §2 W-GOD1 lists five targets;
`mediums.glsl.ts` (528) is the sixth, visible in the gate's own violation print. The spec's "four
god-modules" framing was two stale generations behind.

Near-bound watch: `metaball.frag.ts` **498** (2 lines under — any W-BLOB residue edit trips it);
`ContinuousMarkers.vue` **440** (the §3b clause-4 keep datum); 21 files in the 301–500 warn band.

## 2. Carve-shape re-grades folded into §2

- **2b is now the wave's biggest carve (shed ≥ 459, was specced as ~120).** The
  wander/well/freeze finisher clusters ARE the mass: well `:526-633` (~108), warp `:634-815`
  (~182, incl. `DEFAULT_WELL_CONFIG:672` which lives in the warp span but is read by
  `readInteractionConfig:349`), auto-drift `:816-846` (~31), draw `:847-959` (~113). New shape:
  THREE siblings — `constellationInteraction.ts` (~390, well+warp+wander+`readInteractionConfig`),
  `constellationDraw.ts` (~155, draw four + `readPalette`), core keeps types+seed/refit/step
  (~430). Call coupling verified at HEAD: `stepField` calls `stepWell:501`, `warpStep:507`, and
  the cadence trio `:515-525` — direct imports from the sibling, `import type` back-edge only.
- **2a spans re-cited** (the spec's `:176-184`/`:247-304`/`:334-593`/`:683` were all stale):
  scheduler `:186-212`+`~:600-640`, GL setup `~:233-318`, `drawFrame` `:319-643` (~325, dominant
  shed), bare-inline return `:681-690` (D-RETURN still true — no named interface at HEAD).
- **2c re-based on the 515-line script** (was 499): `useDockShellProps` (`:200-265`, ~65) +
  `useDockMorphWindow` (`:375-455`, ~80 — the parseTimeMs/longestTransitionMs/morphWindowMs/
  markTransitioning family) ≈ 145 shed → ~480 file.
- **2d NEW (`Constellation.vue`)**: extract the pointer/warp/well listener wiring `:405-517`
  (~113) → `useConstellationPointer.ts`; `defineExpose:518-568` untouched (the π live specs read
  `field`/`isFrozen`/`warpTo`). Coordinates with W-COHERE (DAG E16 edits the carved SFC AFTER).
- **2e NEW (`mediums.glsl.ts`)**: recompose, not logic-split — extract the oil sub-mode block
  `:353-528` (~176) → `oil-modes.glsl.ts`, template-join so `AURORA_MEDIUMS_POST_BRUSH_GLSL` is
  STRING byte-identical (hash snapshot in the §3b gate). Sequenced AFTER W-AUR-PAINTERLY closes.

## 3. The RATCHET fold (matrix §4 Class D / trends R4) — now §4.R of the spec

- Per-violator `RATCHET_BASELINES` frozen at the §0 six counts; semantics: ≤500 PASS · >500
  within baseline GRANDFATHERED · growth-past-baseline or new-file-past-500 RED. Close condition:
  `violations:[]` AND baselines drained to ∅.
- **The tag flips WITH the ratchet (Batch-4 step 0), not after the carves** — the gate is
  GREEN-at-HEAD under ratchet semantics, so the old "cannot promote before both carves" premise
  dissolves. This RE-ASSIGNS the contested edit: **W-GOD1 now owns the `gates.mjs:369` tag flip**
  (was W-CSS1's per the superseded deconfliction); W-CSS1 keeps the `.css`-collector extension
  (`proof-no-god-module.mjs:47`) and adds its own `.css` baseline rows in its own diff.
- **Booking-updates-spec-counts rule**: any wave growing a baselined file (or pushing any file
  past 500 — see `metaball.frag.ts` at 498) must, in the same diff, carve OR bump the baseline
  with a `// BOOK(<wave-id>):` marker AND update the §0 table; an unmarked bump is itself RED.

## 4. Defects found outside the edited spec (NOT fixed here — flagged for their owners)

- **F1 — `AY.W-CSS1.md:150` stale premise + stale cite.** It claims ownership of the
  `proof:no-god-module` tag flip at `gates.mjs:384-389`; the registration is `gates.mjs:367-371`
  at HEAD (tags `:369`, note `:370`) and the §4.R ratchet re-assigns the flip to W-GOD1 step 0.
  W-CSS1 needs a one-line amendment (its gate-1 HARD-GATE prose `:159` also assumes a
  carve-complete GREEN rather than the grandfathered interim).
- **F2 — NECESSITY-MATRIX §2 W-GOD1 (`NECESSITY-MATRIX.md:106`) is one violator short** (no
  `mediums.glsl.ts`); its useMetaballRenderer note "eased from 707" is correct (692 confirmed).
- **F3 — `gates.mjs:370` note still carries the dead "W6 gates-close folds it into the ci
  aggregate" promise** (the ≥3-tranche Class-G relapse witness); the note rewrite rides the
  ratchet diff (spec §4.R.2).
- **F4 — `GlassDock.vue:2-6` DO-NOT-SPLIT banner now ~203 lines stale** (claims 421, file 624) —
  the banner actively licensed growth; §5 deletes it at carve.
- **F5 — matrix item "wire `proof:constellation-egg-live`/`freeze-live` into package.json"
  (`NECESSITY-MATRIX.md:59`) appears ALREADY LANDED** at `package.json:652-653` — the W-CON
  verification row can downgrade that sub-item to a confirm-only check.

## 5. What the carve does NOT need (re-confirmed)

No research. Every number above came from `wc -l`, the gate's own run, and grep at HEAD. The
carve is Batch-4 implementation; this re-grade leaves the spec executable as written against the
real tree: counts current, spans current, owners deconflicted, ratchet specced born-GREEN-with-
grandfathers and drained-at-close.
