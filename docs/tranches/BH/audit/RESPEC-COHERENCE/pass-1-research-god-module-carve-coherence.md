# BH PASS-1 COHERENCE RESEARCH — LENS: GOD-MODULE CARVE-OWNERSHIP COHERENCE

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `e550f1b0` (BG coherence fully folded)
**Lens:** Carve ownership — does any god-module carve target get double-claimed (both BG and BH carve the SAME file) or orphaned (neither claims a file that is actually >500L today)?
**Method:** real `wc -l` census of `src/` >500L + reconcile against BG's amended plan (`AMENDED-COHERENCE-PLAN.md` + `bg-build-map.md`) AND BH's `PLAN.md` + `P5-god-module-carve-plans.md`, with the LIVE `proof:no-god-module` gate (`scripts/proof-no-god-module.mjs`) as the ground-truth oracle.

---

## 0. HEADLINE FINDINGS (most-severe first)

1. **[HIGH — orphaned, LIVE GATE-RED]** `ladder.css` (527L) and `shell.css` (510L) are HARD VIOLATIONS — they are >500L AND carry NO `RATCHET_BASELINES` row, so `proof:no-god-module` is **RED (exit 1) at HEAD**. BG's §2.M1 names `BG.W-WS12-CENSUS` clause M1-RECARVE as their post-WS9 re-carve owner, but that owner is a **post-WS9, scoped (`ladder/shell/carved-leaves` ≤500) re-CHECK** — it asserts ≤500 but does not itself carry the carve mechanism, and it lands at WS12 (the very end). BH owns NOTHING here. So at any point WS3→WS9 (and right now), the gate is RED and neither BG-active-now nor BH owns the drain. (This is BG's known issue, but it directly governs WHEN any BH `[C]` band can run a green close-battery.)

2. **[MED — BH's 3 owned carves ALREADY LANDED; PLAN.md text is stale-by-success]** BH's PLAN.md §4 / §6 / P5 claim "BH owns 3 carves" (CarouselContent.vue, PagerDots.vue, useBloomUp.ts). **All three already drained on disk** — the `proof:no-god-module` RATCHET comment block records `BH.B2.4a DRAINED CarouselContent.vue (577→375)`, `PagerDots.vue (509→433)`, `useBloomUp.ts (507→449)`, and all three rows are DELETED from `RATCHET_BASELINES`. Live `wc -l`: CarouselContent 375, PagerDots 433, useBloomUp 449 — none is a god-module. The PLAN.md/§6/P5 prose describing them as pending work is now describing COMPLETED work. **NOT a double-claim or orphan — but a stale plan-vs-disk drift that must be reconciled (mark B2.4a LANDED), else execution re-runs a no-op carve.**

3. **[MED — orphaned, the post-BD census drift]** Two CSS files are >500L, grandfathered as "GENUINELY IRREDUCIBLE cascade-partials" by the gate, but carry NO carve owner in EITHER plan: **`property-regs.css` (548L)** and **`fission-bridge.css` (552L)**. The gate's own comment (lines 124-129) classifies them as `(a) GENUINELY IRREDUCIBLE — ordered @property/@layer cascade partials — a split reorders the cascade`. BH's P5 census does NOT list either (it predates `fission-bridge.css` re-growing and treats `property-regs.css` only as the api/glass mint target, not a carve target). BG's plan owns neither as a carve. **Disposition: correctly EXEMPT, but NEITHER plan records the exemption — they are silently >500 with no documented owner/exemption verdict.**

4. **[MED — plan-vs-disk count drift]** PLAN.md §1 fact #2 says "**16 god-modules >500L; 3 shaders exempt; BG owns 8 of 12; BH owns 3**." Today's `src/` census is **18 files >500L** (16 ratchet rows + the 2 un-ratcheted hard-violations `ladder.css`/`shell.css`). Of the 16 ratchet rows, 3 are shaders. The "12 carve targets / BG owns 8 / BH owns 3" arithmetic is a **4.2.0 snapshot** that no longer reconciles: BH's 3 already landed, `property-regs.css`/`fission-bridge.css` are now exempt-not-carved, `scheme-motion.css` already drained (BD.W-CUT), and `ladder.css`/`shell.css` re-grew into the count. The split needs a re-baseline.

5. **[LOW — the "shader exemption" is unbuilt]** P5 §1 proposes patching `proof:no-god-module` with an `EXEMPT_SUFFIX_RE = /\.(wgsl|glsl|frag|vert)\.ts$/` skip. The gate at HEAD does NOT exempt shaders by suffix — `metaball.wgsl.ts`/`metaball.frag.ts`/`flow-field.glsl.ts` are RATCHET-grandfathered (rows present), not glob-exempted. So the "3 exempt shaders" framing is a PLANNED mechanism, not the disk reality. (Functionally equivalent — both keep the gate green-once-drained — but a coherence reconcile must not assume the suffix-exemption exists.)

**No file is double-claimed (both BG and BH carve the same file).** BH dodges BG's write-set by construction; the 7 BG-owned src carves are BH `consume-and-verify` (zero BH carve). The risk is entirely on the ORPHAN axis, not the double-claim axis.

---

## 1. THE GROUND-TRUTH CENSUS (`wc -l src/`, HEAD `e550f1b0`)

18 non-trivial `src/` files exceed 500 lines. (Note: `wc -l` and the gate's line-split differ by ±1 on a trailing newline; the gate's count is authoritative for the bound.)

| L (wc) | File | Kind | In RATCHET? | Gate status |
|---|---|---|---|---|
| 850 | `styles/glass/liquid-morph.css` | CSS | yes (850) | grand |
| 711 | `components/custom/dock/GlassDock.vue` | SFC | yes (711) | grand |
| 695 | `composables/glass/webgl/createCanvasLifecycle.ts` | TS | yes (695) | grand |
| 606 | `composables/glass/webgpu/useWebGPUCanvas.ts` | TS | yes (606) | grand |
| 604 | `components/custom/dock/composables/useDockFission.ts` | TS | yes (604) | grand |
| 552 | `styles/dock/fission-bridge.css` | CSS | yes (552) | grand |
| 551 | `components/custom/dock/composables/useDockContextSilhouette.ts` | TS | yes (551) | grand |
| 548 | `styles/tokens/property-regs.css` | CSS | yes (566) | grand |
| 534 | `composables/glass/useGlassBackdropLuminance.ts` | TS | yes (542) | grand |
| 533 | `components/custom/goo-blob/composables/useBlobSatellites.ts` | TS | yes (533) | grand |
| 529 | `components/custom/goo-blob/shaders/metaball.wgsl.ts` | SHADER | yes (529) | grand |
| **527** | **`styles/glass/ladder.css`** | CSS | **NO** | **✗ VIOLATION** |
| 517 | `components/custom/dot-flow-field/shaders/flow-field.glsl.ts` | SHADER | yes (517) | grand |
| 512 | `components/custom/tabs/SegmentedTabs.vue` | SFC | yes (512) | grand |
| **510** | **`styles/dock/shell.css`** | CSS | **NO** | **✗ VIOLATION** |
| 510 | `components/custom/goo-blob/shaders/metaball.frag.ts` | SHADER | yes (510) | grand |
| 508 | `components/custom/goo-dot-matrix/composables/useGooDotMatrix.ts` | TS | yes (508) | grand |
| 505 | `api/index.ts` | TS | yes (505) | grand |

**`proof:no-god-module` is RED at HEAD** (`exit 1`): `ladder.css 527 > 500` and `shell.css 510 > 500` are un-ratcheted hard violations. The 16 ratchet rows are grandfathered (not violations); the 2 above are the live red.

---

## 2. RECONCILED CARVE-OWNERSHIP TABLE (the deliverable)

Owner = the wave/tranche that DOES the structural carve. "verify" = BH consume-and-verify (zero BH carve). Owners cross-checked against `bg-build-map.md` line refs + `AMENDED-COHERENCE-PLAN.md` + the live gate comment.

| File | L | CARVE OWNER (reconciled) | BH role | Plan-claim status |
|---|---|---|---|---|
| `liquid-morph.css` | 850 | **BG.W-SPIKE-DELETE** (whole-file rehome/move, §2.P1 12.1) + `BG.W-DEMO-STYLE-REHOME` (3.11 in-place token close, precond <12.1) | none | OK — BG-owned, double-owner conflict already RESOLVED by §2.P1 fold |
| `GlassDock.vue` | 711 | **BG.W-DOCK-DECOMPOSE** (`bg-build-map.md:276`, →fission-wiring+touch-gate) | verify (B2.5) | OK |
| `createCanvasLifecycle.ts` | 695 | **BG.W-CANVAS-LIFECYCLE-LEAVES** (`:469`, post-WS5 re-measure) | verify (B2.4b WS4) | OK |
| `useWebGPUCanvas.ts` | 606 | **BG.W-CANVAS-LIFECYCLE-LEAVES** (`:469`) | verify (B2.4b WS4) | OK |
| `useDockFission.ts` | 604 | **BG-WS2** (SPEC-pass1/2/3 decompose into `fission/` sub-dir to drain RATCHET row; the build-map's `:276` BG.W-DOCK-DECOMPOSE focuses on GlassDock — the useDockFission decompose is carried in the WS2 SPEC, NOT a named build-map line) | verify (B2.5 WS2) | **WEAK — owner is SPEC-only, no dedicated build-map carve LINE; verify B2.5 must confirm WS2 actually drains it** |
| `fission-bridge.css` | 552 | **NONE** (gate-exempt: "ordered @layer cascade partial") | none | **ORPHAN — neither plan records the exemption; P5 census predates its re-growth** |
| `useDockContextSilhouette.ts` | 551 | **BG.W-DOCK-CUT** (`bg-build-map.md:274`, DELETE 551L 0-consumers) + `BG.W-DEAD-COMPOSABLE-CUT` (`:442`) | verify-DELETED (B2.5) | OK — delete, not carve |
| `property-regs.css` | 548 | **NONE** (gate-exempt: "ordered @property cascade partial"); BG WS8/WS9 only MINT into it (`--glass-chromatic-strength`, AMENDED §3 MR-4) | none | **ORPHAN — exempt but un-recorded in either plan; note BG MINTS may re-grow it** |
| `useGlassBackdropLuminance.ts` | 534 | **BG.W-AMBIENT-HISTOGRAM-LEAF** (`:471`, →ambientHueHistogram+wcagLuminance) | verify (B2.4b WS4) | OK |
| `useBlobSatellites.ts` | 533 | **BG.W-BLOB-KINEMATICS-LEAF** (`:378`, WS5) | verify (B2.4c WS5) | OK |
| `metaball.wgsl.ts` | 529 | **EXEMPT** (one cohesive WGSL program; ratchet-grandfathered, NOT suffix-globbed) | none | OK — exempt; P5's suffix-exemption mechanism unbuilt |
| **`ladder.css`** | **527** | **BG.W-WS12-CENSUS clause M1-RECARVE** (post-WS9 re-CHECK ≤500; §2.M1) — **but this is a CHECK, not the carve mechanism; the actual grain-carve is G4/WS9 *Files* re-point** | none | **ORPHAN-IN-MOTION — currently RED, owner lands at WS12 (last); no active drain owner between now and WS12** |
| `flow-field.glsl.ts` | 517 | **EXEMPT** (shared GLSL chunk; ratchet-grandfathered) | none | OK |
| `SegmentedTabs.vue` | 512 | **BG.W-TABS-KEYBOARD-LEAF** (`:474`, →useTabRovingFocus+useTabResponsive) | verify (B2.4b WS4) | OK |
| **`shell.css`** | **510** | **BG.W-WS12-CENSUS clause M1-RECARVE** (same as ladder.css) | none | **ORPHAN-IN-MOTION — currently RED, owner lands WS12-last** |
| `metaball.frag.ts` | 510 | **EXEMPT** (one cohesive GL fragment program) | none | OK |
| `useGooDotMatrix.ts` | 508 | **BG.W-GOODOT-SETUP-SPLIT** (`:378`-region, carve `setup` into M1-adopted shape, WS5) | verify (B2.4c WS5) | OK |
| `api/index.ts` | 505 | **BH.B2.2** (api-fold DELETE, not carve) | delete (B2.2 WS12) | OK |

### The 3 already-landed BH carves (NOT in the >500L set anymore)

| File | was→now | Owner | Status |
|---|---|---|---|
| `CarouselContent.vue` | 577→375 | **BH.B2.4a (LANDED)** → `useCarouselWorm.ts` | DONE on disk; PLAN.md prose stale |
| `PagerDots.vue` | 509→433 | **BH.B2.4a (LANDED)** → `usePagerWorm.ts` | DONE on disk; PLAN.md prose stale |
| `useBloomUp.ts` | 507→449 | **BH.B2.4a (LANDED)** → `bloomUpField.ts` | DONE on disk; PLAN.md prose stale |

---

## 3. THE DOUBLE-CLAIM AXIS — CLEAR

No file is carved by BOTH a BG wave and a BH wave. The interleave protocol (PLAN.md §3) holds: BG owns the entire `src/` dock/viz/glass-substrate write-set; BH's B2.4b/B2.4c/B2.5 are `consume-and-verify` (zero carve). The 3 genuine BH carves (B2.4a) are on files BG never touches (carousel/pager/bloom-up), already landed. **Liquid-morph.css's prior double-OWNERSHIP (§2.P1, 3.11 vs 12.1) was already adjudicated by BG's coherence audit** (12.1 `BG.W-SPIKE-DELETE` owns the move, 3.11 keeps the in-place token close, precond 3.11<12.1) — so the one historical double-claim is resolved. No new double-claim found.

---

## 4. THE ORPHAN AXIS — THREE DISTINCT ORPHANS

### 4a. `ladder.css` (527L) + `shell.css` (510L) — ORPHAN-IN-MOTION, LIVE RED
Un-ratcheted, >500, gate-RED NOW. BG §2.M1 assigns `BG.W-WS12-CENSUS` clause M1-RECARVE as the post-WS9 re-carve OWNER — but (a) M1-RECARVE is a `≤500 re-CHECK` assert, the actual carve is the G4 grain-carve to `grain-overlay.css`/`shell-regions.css` whose firing is conditional (MR-5: only IF WS9 GRAIN-REAL touches the glass `::after` grain), and (b) WS12 is build-LAST. **Coherence consequence for BH:** any BH `[C]` band that runs a full close-battery (`--run full`) before WS12 hits a RED `proof:no-god-module`. The gate is `[local,ci,release]`-relevant via the RATCHET ∅-drain close precondition. BH's B0 scratch-sweep gate (`git status` clean) is unaffected, but any BH wave whose gate set includes the ratchet inherits the red. **BH owns no fix; this is a BG-side gap that BH's §3 sequencing must respect** (the close-battery cannot pass until ladder/shell drain, which is WS9+WS12).

### 4b. `fission-bridge.css` (552L) — ORPHAN-EXEMPT, UN-RECORDED
NEW since the P5 census (a product of BG WS2 dock-fission work). Gate classifies it IRREDUCIBLE (line 128). Neither plan records an exemption verdict. **Disposition: keep exempt, but BG-WS2 or BH-B2.5 (the dock-leaf-verify wave) should record the exemption** so the file is not a silent >500 with no owner/verdict. (The `@property`-scatter finding in BG `pass-1-crit-PT-5.md:16` notes `fission-bridge.css` carries `@property` blocks — splitting it reorders the cascade, confirming the IRREDUCIBLE verdict.)

### 4c. `property-regs.css` (548L) — ORPHAN-EXEMPT, RE-GROWTH RISK
Gate-exempt (IRREDUCIBLE @property cascade partial), but **BG WS8/WS9 actively MINT into it** (`--glass-chromatic-strength`, `--glass-key-*`, AMENDED §3 MR-4 names `property-regs.css` as the WS8 §2 *Files* add). Its baseline in the ratchet is 566 but disk is 548 — it SHRANK (a prior carve), and the BG mints will re-grow it. **Coherence consequence:** the ratchet baseline (566) is now STALE-HIGH (file is 548); when BG mints push it back up, whether it crosses 566 again determines if the row stays valid or needs a BOOK marker. Neither plan owns this. **BH's B5a (deps-currency, splits `vite.style-assets.ts`) and B2.6 (styles-colocation) both touch the styles tree but explicitly KEEP `tokens/...` global — so property-regs.css stays un-carved by BH by design; the re-growth is BG's to BOOK.**

---

## 5. THE "16 / 8 / 3" SPLIT — RE-BASELINE NEEDED

PLAN.md §1 fact #2: "16 god-modules >500L; 3 shaders exempt; BG owns 8 of 12; BH owns 3."

**Reconciled at HEAD:**
- **>500L files: 18** (not 16) — 16 ratchet rows + 2 un-ratcheted hard violations (ladder/shell).
- **Shader-exempt: 3** ✓ (metaball.wgsl/metaball.frag/flow-field.glsl) — but RATCHET-grandfathered, NOT suffix-globbed (P5's exemption mechanism is unbuilt).
- **Non-shader carve/delete targets: 15** (18 − 3), distributed: BG owns **9 carves** (GlassDock, createCanvasLifecycle, useWebGPUCanvas, useDockFission-via-WS2-SPEC, useGlassBackdropLuminance, useBlobSatellites, SegmentedTabs, useGooDotMatrix, + the WS12-CENSUS ladder/shell re-carve), 1 BG DELETE (useDockContextSilhouette), 1 BG whole-file MOVE (liquid-morph.css via SPIKE-DELETE).
- **BH owns: 1 DELETE (api/index.ts via B2.2) + the 3 already-LANDED carves (CarouselContent/PagerDots/useBloomUp).**
- **Exempt-no-owner: 2 CSS** (fission-bridge.css, property-regs.css).

So "BG owns 8 of 12 / BH owns 3" should re-baseline to roughly "**BG owns ~9 carves + 1 delete + 1 move; BH owns 1 delete + 3 LANDED carves; 5 exempt (3 shader + 2 CSS); 2 ORPHAN-IN-MOTION (ladder/shell, BG-WS12)**." The "BG owns 8 of 12" arithmetic was a 4.2.0 snapshot superseded by BD.W-CUT (scheme-motion drained), BH.B2.4a (3 landed), and the ladder/shell re-growth.

---

## 6. RECOMMENDED PLAN AMENDMENTS (record-only; BH owns the recording)

1. **Mark B2.4a LANDED in PLAN.md §4** — the 3 carves (CarouselContent/PagerDots/useBloomUp) are DONE on disk; the §4/§6/P5 prose describing them as pending is stale-by-success. Reconcile to "B2.4a LANDED at `e550f1b0` (or earlier); verify the 3 drains held."
2. **Re-baseline the §1-#2 god-module fact** to the 18-file census above; replace "16 / BG owns 8 of 12 / BH owns 3" with the reconciled split.
3. **Record the 2 exempt-no-owner CSS files** (fission-bridge.css, property-regs.css) — assign their exemption verdict to BG-WS2 (fission-bridge, the owner of the dock-fission re-growth) and to BG-WS8/WS9 (property-regs, the owner of the mint re-growth), each as an `IRREDUCIBLE + BOOK-marker` disposition, so they are not silent >500.
4. **Flag the WS12-CENSUS M1-RECARVE timing** in BH's §3 interleave map: `proof:no-god-module` is RED until ladder/shell drain (WS9 G4 grain-carve + WS12 re-check). Any BH wave whose gate set includes the ratchet must sequence after that drain, OR its gate must be scoped to exclude the ratchet. (BH's B0/B1/B2.0/B2.4a gates do NOT include the ratchet — they are safe to run `[C]` now.)
5. **Note that P5's shader suffix-exemption is unbuilt** — the gate ratchets the 3 shaders, it does not glob-exempt them. If BH wants the cleaner suffix-exemption, it is a NEW gate edit (concurrent-safe, the ratchet is BG-untouched per P5) — but it must not be assumed-existing.

---

## 7. EVIDENCE TRAIL

- `scripts/proof-no-god-module.mjs` — RATCHET_BASELINES (16 rows) + the comment block (lines 48-172) classifying each file's disposition (IRREDUCIBLE / IN-FLIGHT-sibling-lane / drained). Gate RAN: **exit 1** (ladder.css 527 + shell.css 510 hard violations).
- `wc -l` census (§1) — 18 files >500L; cross-checked against the gate's `largest files` readout.
- `docs/tranches/BG/execution/bg-build-map.md` — carve-owner lines `:274` (DOCK-CUT), `:276` (DOCK-DECOMPOSE), `:378` (BLOB-KINEMATICS/GOODOT-SETUP-SPLIT), `:469` (CANVAS-LIFECYCLE-LEAVES), `:471` (AMBIENT-HISTOGRAM-LEAF), `:474` (TABS-KEYBOARD-LEAF), `:442` (DEAD-COMPOSABLE-CUT), `:1045-1057` (WS12-CENSUS M1-RECARVE).
- `docs/tranches/BG/audit/RESPEC-COHERENCE/AMENDED-COHERENCE-PLAN.md` — §2.M1 (ladder/shell re-carve owner), §2.P1 (liquid-morph double-owner resolution), MR-4/MR-5 (property-regs mint, ladder/shell conditional grain re-point).
- `docs/tranches/BH/research/proto/P5-god-module-carve-plans.md` — the 4.2.0-era carve census (13 non-shader / BG owns 8 / BH owns 3) the PLAN.md §1 fact derives from.
- `docs/tranches/BG/converge/BG-WS2-dock-convergence/SPEC-pass1.md:66`, `SPEC-pass2.md:360` — the useDockFission decompose owner (SPEC-only, no dedicated build-map carve line).
- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (siblings intact, fence honored).
