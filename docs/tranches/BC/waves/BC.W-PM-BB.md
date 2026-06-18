# BC.W-PM-BB — the BB post-mortem (source-green / paint-broken / never-closed)
- **Band:** F (FORENSICS) · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** FIRST of Band F (no predecessor); feeds BC.W-PM-SYNTHESIS → Band 0 (BC.W-GESTALT-FIRST / BC.W-PAINT-GATE / BC.W-FOLD-LEDGER)
- **Owns / closes:** ORCHESTRATION §1 Band F box `BC.W-PM-BB — BB post-mortem: source-green/visually-broken anatomy (what was built vs claimed vs painted)`. Records the per-wave verdict matrix BC Bands 1-6 consume. The binding artefact is `docs/tranches/BC/research/postmortem/bb.md` (143 lines, forensic, file:line-grounded) + the BB rows of `docs/tranches/BC/research/postmortem/SYNTHESIS.md` (lines 6-44).

## Goal (the gestalt)
A future BC executor opens this wave and KNOWS, without re-deriving, exactly which BB waves landed real source (re-paint, don't re-build), which never painted (re-verify on the rebuilt floor), and which never ran at all (build). It is the verdict ledger that converts the 143-line `postmortem/bb.md` forensic into a per-wave BUILT/CLAIMED/PAINTED matrix with a one-word BC disposition each — so no Band 1-6 wave re-litigates "was this real?" The headline a reader carries away: **BB was 100% source-green, gate-green, master-CI-green, and shipped a destroyed demo — because every binding paint-verifier was funneled into ONE terminal wave (W-REFLECT3) that the execution stop cut.**

## Starting state (measured, file:line)
The smoking gun, established by artifact in `postmortem/bb.md §0` and re-measured 2026-06-18:
- `docs/tranches/BB/FINAL.md` is **ABSENT** (every closed tranche AY/AZ/BA has one).
- `W-REFLECT3` never ran: `scripts/wf-bb-reflect.js` absent; `docs/tranches/BB/audit/reflect/` does not exist; `BB.W-REFLECT3.md:7` = `**Status**: SPEC`. The PROGRESS row = SPEC.
- `W-CLOSE` never ran: `package.json` version = `4.0.1` (a BC dist-comment hotfix `2935609d`), NOT the planned BB `4.1.0`; Batches 5/6/7 are `[pending]` (task-ledger #266-268).
- The deferral magnitude (`deferral-sweep.md §0`): **48** wave specs reference W-REFLECT3 · **77** "rides W-REFLECT3" phrases · **65** `*DELTA*.md` on disk yet ZERO gestalt-verdict-flipped · **119** `tests-visual/*.spec.ts` exist but `--run pi` never ran on a real device.
- The gestalt gate that should have caught it (`proof:ba-gestalt`, `scripts/proof-ba-gestalt.mjs`) is `tags:["release"]` (never in `--run ci`, line 60-ish header note), reads author-written PASS/FAIL prose over BA-era captures frozen before the entire BB build batch, and is write-locked so ONLY the un-run W-REFLECT3 may flip a verdict (lines 25-35 header).
- The masked-accretion backlog: `docs/tranches/BB/audit/ci-red-census.md` — **18 ci-tagged gates carried reds** at BB's start, and `ci ⊂ local` (156 ⊂ 195), so the BA close's `FINAL.md §3` "`--run local` green" claim was substantially false.

## Target spec (grounded)
This wave is a **thin pointer + verdict-naming wrapper** (no src/ edits, no new gate — the gate is BC.W-FOLD-LEDGER's `proof:bc-fold-ledger`). It records the per-wave verdict matrix verbatim from `postmortem/bb.md §2` + the SYNTHESIS BB table, so the disposition for each BB wave is canonical:

**BUILT-NOT-PAINTED (source landed, paint broke — RE-PAINT on the rebuilt floor):**
- W-DARK-MATERIAL / glass identity (the flagship) → `.glass-floating = oklab(0.798 0.002 0.006 / 0.84)` grey, L0.80, ~zero chroma, near-opaque (BC LIVE-GROUNDING); the decorative observer (`useGlassBackdropLuminance.ts:311` writes `--glass-backdrop-luma`, `glass-fx.css:123` declares it, ZERO CSS rule reads it). → **BC Band 1** (BC.W-ADAPTIVE-RECONCILE closes the loop; BC.W-GLASS-IDENTITY restores the warm base).
- W-DOCK-MORPH-FAMILY + the rail → white/invisible morph; the `to:0` measure race (`dock/layers.css:59-92` `inline-size: var(--dock-morph-to)` resolving to 0). → **BC Band 2** (BC.W-DOCK-ENGINE / BC.W-LIQUID-MORPH).
- The liquid-glass band — W-LIQUID-REVEAL / W-LENSING / W-LIQUIDHOVER / W-BUTTON-GLASS (all BUILT, all riding ON the grey base; §0-DRIFT confesses the `.glass-refract`→`.glass-lens` out-of-order landing). → **BC Band 1+4** (re-paint over the fixed identity; reconcile the rename).
- W-TABS / W-DRAG-MORPH → squared flat fill, not the iOS liquid-glass pill; drag-to-location built, never user-confirmed. → **BC Band 3 (tabs band) + Band 4 re-verify**.
- W-PRESS-UNIFY → interruptible spring-press built, the mid-flight ABSORB frame-series never ran; user reports "controls super laggy." → **BC Band 4 re-verify**.
- W-CARD-COMPOSITE / W-SCROLL-CARD → the CLS-1.03→0 compositor rewrite is genuinely good (the LEAST-broken of the band, has a real local CLS≈0 capture); the page-build hero-shrink gestalt never re-walked. → **BC Band 4/5 re-verify; PRESERVE the rewrite**.
- W-CONTROL-TOKENS / W-INVALID-RING / W-PHASE-PALETTE / W-EYEBROW-UNION / W-ON-GLASS-FG → token-register unifications, real source, real gates; the live control interaction (the reka stale-binding silent-no-op class) never e2e-checked. → **BC Band 4 + the controls band, e2e-verify**.

**BUILT, PAINT-FRAGILE / UNVERIFIED-ON-HOST (the viz suite — RE-VERIFY on a real host, do NOT re-build):**
- W-AURORA-WGPU / W-GOOBLOB-WGPU / W-FLOWFIELD / W-CONCENTRIC → substantial WGSL source; D8' the `no GPU adapter` throw is noisy; the structural-proxy ΔE-0.0 "parity" is tautological (CPU evaluator vs itself, never proves the GPU emits pixels); D9' the user saw aurora as a BLACK VOID on real Chrome. → **BC Band 4** (BC.W-WEBGPU-EVERYWHERE for the WGSL-compile floor + the real-swap-chain parity readback; then BC.W-VIZ-AURORA / BC.W-GOOBLOB-MEATBALL / BC.W-VIZ-DOTFLOW / BC.W-VIZ-CONCENTRIC re-verify each LIVE on a real host). `proof:flow-field` asserting the fallback FILE exists (`proof-flow-field.mjs:134`) never asserts meanLum>0 — the purest gate-paint-blindness.

**BUILT+PAINTED (PRESERVE — do NOT re-litigate):**
- Batch-0 integrity (W-CI-GREEN / W-CLOSE-BATTERY / W-LEDGER-REPAIR / W-GESTALT-GATE2 / W-VISUAL-RUNNER) — load-bearing; BC.W-PAINT-GATE inherits + hardens them. Apply W-CLOSE-BATTERY's full-union rule PER-ROUND (not only at the terminal cut).
- W-CARVE3/4/5 / W-CANVAS-UNIFY / W-DRAWER-ABROGATE / W-NDA-DECIDE / W-CARD-PAD — clean structural work; the clean-break discipline (no aliases) gives BC a clean surface.
- W-AURORA-SWRASTER — the ONE viz-band gate that genuinely measures painted pixels on-host (`proof:aurora-swraster` Δmean 0.0010 vs the flat gradient's 0.1328, no `--use-gl=angle` dep). **The model BC.W-PAINT-GATE generalizes to the whole viz suite.**

**CLAIMED-NOT-BUILT (the root failure):**
- W-REFLECT3 (Batch 7) — the binding-close gestalt reflection + the single authorized verdict-flipper for ~48 waves; never ran. THE disease.
- W-CLOSE + all of Batch 5 (W-ADOPT-RECONCILE / W-SLIDES-DRIVE / W-LEAF-MODERNIZE / W-CONSUMER-MODERNIZE / W-DECK) + W-LIGHTHOUSE + W-CSS-CRITICAL + W-DAG-RECONCILE — SPEC. → **BC Band 0/5/6** (BC.W-FOLD-LEDGER inherits the `BB.W-CLOSE.md:24` 14-row table; cross-repo + cut execute it).

## Mechanism / files
- **Created:** this file (`docs/tranches/BC/waves/BC.W-PM-BB.md`) — the pointer + verdict matrix.
- **Reads (binding):** `docs/tranches/BC/research/postmortem/bb.md` (the forensic), `postmortem/SYNTHESIS.md` lines 6-44 (the BB rows). NO duplication of the forensic body — this wave NAMES the verdicts + the BC dispositions, the forensic carries the evidence.
- **ZERO src/ edit. ZERO new gate.** The verdict matrix is consumed by `proof:bc-fold-ledger` (BC.W-FOLD-LEDGER) as the per-wave plan-vs-delivery delta — a BB wave verdict silently dropped REDs the close.
- **The ONE source-of-truth seam:** the BB verdict matrix lives in the `FOLD-LEDGER.json` `tranches.BB[]` block (authored by BC.W-FOLD-LEDGER); this wave is the human-readable index into it.

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT criterion (N/A — forensic wave, zero pixels).** This wave changes no paint; its "acceptance" is documentary completeness. A reader cross-checks: every BB wave named in `BB/PROGRESS.md` has a verdict {BUILT+PAINTED, BUILT-NOT-PAINTED, BUILT-PAINT-FRAGILE, CLAIMED-NOT-BUILT} + a BC band/wave disposition here.
2. **Machine gate:** `proof:bc-fold-ledger` (BC.W-FOLD-LEDGER) — REDs the close if any BB wave in the matrix is dropped from `FOLD-LEDGER.json` or carries no DECIDED disposition. This wave's acceptance is "every BB row this matrix names appears in the ledger with a terminal disposition."
3. **π readback:** none (forensic). The PAINT verification this wave POINTS AT happens per-wave in Bands 1-6 under BC.W-GESTALT-FIRST.

## Fences / invariants (must NOT regress)
- **Re-paint, don't re-build (PLAN §1.3).** The BUILT+PAINTED list is TRUSTED as-is; BC must not rebuild the carves, the canvas-unify, the spine, the dead-sweep, or the integrity-floor gates. Only the verdict-SOURCE was wrong, not the plumbing.
- **No re-litigation.** The "what went RIGHT" set (`postmortem/bb.md §5`) is preserved verbatim; a BC wave that re-builds a BUILT+PAINTED primitive violates the gestalt-over-patches precept inverted (rebuilding what works is its own waste).
- **The doctrine was correct (§5.2).** "per-mechanism greens do NOT close a visual wave" (BB inv-4) is KEPT — BC fixes the SEQUENCING (the terminal-wave deferral), not the principle.

## Folds (deferrals discharged)
This wave DECIDES (records the verdict for) the BB deferral cluster:
- `deferral/bb.md` BATCH7-CLOSE, VISUAL-WAVES-REFLECT3, DOCK-CONTRADICTED, SUCCESSORS-BLOB-TOKENS, PARITY-CLOSE-RESIDUALS — each mapped to its BUILT/PAINTED verdict + BC band above.
- `deferral-sweep.md §1` (the BB never-run set) + `§9.1` (the terminal-reflect deferral, THE root) — recorded as the CLAIMED-NOT-BUILT / RE-VERIFY split.
- The 33-wave plan-vs-delivery delta (PLAN §0: ~31% genuinely-done, ~46% paper-done, ~14% never-run, 0/33 visual paint-verified) is the verdict matrix this wave indexes.
- DECIDED disposition for the wave itself: **RETIRE the single-terminal-reflect mechanism** (Band 0 supersedes it); **BUILD BC.W-CUT** (the never-run cut); the matrix feeds BC.W-FOLD-LEDGER.
