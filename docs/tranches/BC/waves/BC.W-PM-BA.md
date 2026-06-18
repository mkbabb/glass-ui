# BC.W-PM-BA — the BA post-mortem (the tranche that PUBLISHED 4.0.0 and still shipped grey)
- **Band:** F (FORENSICS) · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** Band F, after BC.W-PM-BB (no hard dependency — siblings); feeds BC.W-PM-SYNTHESIS
- **Owns / closes:** ORCHESTRATION §1 Band F box `BC.W-PM-BA — BA post-mortem (dark-material, dock-sections, glass-cal, tabs-std — what landed in paint)`. The binding artefact is `docs/tranches/BC/research/postmortem/ba.md` (192 lines) + the BA rows of `postmortem/SYNTHESIS.md` (lines 46-90).

## Goal (the gestalt)
A future BC executor opens this wave and KNOWS the keystone Band-0 lesson: **BA correctly diagnosed AZ's mechanism-green close-lie, INVENTED `proof:ba-gestalt` to kill it — then made that gate paint-blind, so the SAME class recurred one level up and shipped to npm as 4.0.0.** The headline a reader carries: the gestalt gate BA built reads verdict STRINGS out of a markdown roster + asserts PNG IHDR dimensions — never a pixel — is `["local"]`-tagged so master CI carried zero paint signal, and was verdict-flipped only at ONE terminal W-REFLECT2 wave with reduced-motion dark-biased captures. The close bound a hand-typed "PASS" over a grey-glass LIGHT-mode page. This is WHY BC.W-GESTALT-FIRST must make `proof:ba-gestalt` a computed-style PIXEL reader, ci-blocking, per-wave.

## Starting state (measured, file:line)
From `postmortem/ba.md`, re-grounded:
- `proof:ba-gestalt` is `["local"]`-tagged (`proof-ba-gestalt.mjs:29-32, 461`) — NEVER blocked CI/release mid-tranche.
- Its operative-PASS reads recorded verdict strings out of `audit/reflect/ba-gestalt-roster.md` + asserts each declared PNG resolves with sane IHDR (`proof-ba-gestalt.mjs:86-87, 137-157, 346-381`) — it reads NO luminance/chroma pixel (`isRealPng` + `pngDimensions` only).
- The verdict-flipper is a SINGLE terminal wave, W-REFLECT2 (Batch 7); 28 mid-tranche waves closed `live-verified` with the gestalt verdict "staged" (BA.md inv-4: "binding at W-REFLECT2").
- The grey it shipped: `.glass-floating = oklab(0.798 0.002 0.006 / 0.84)` — L0.80, ZERO chroma (grey), α 0.84 near-opaque (BC LIVE-GROUNDING). Scope-7 fixed the CONTENT tiers to 4% but EXEMPTED the dock + floating + overlay band (`ladder.css:155`, `morph.css:451` as BA shipped — the `BC.W-AUDIT pre-fix e1b4b44c` is what later moved them to the floor). The half-fix.
- `proof:adaptive-glass` is GREEN on the grey-broken state AND would FAIL the fix: it asserts the darken is wired + `-aa ≤ 24%` (20% passes, `proof-adaptive-glass.mjs:78,88`); `proof:adaptive-glass-live` asserts the dock clears `4.5:1 + ΔL ≥ 0.08` over synthetic-WHITE (`adaptive-glass-live.spec.ts:38 AA_BODY=4.5`, `:46 DELTA_L_FLOOR=0.08`, `:247-260`) — BOTH monotonic in the darken direction. A grey slab scores BETTER. The most dangerous class: the gate's success metric is anti-correlated with the user's read.
- The capture method made grey invisible: `reducedMotion:reduce` (`aurora.md:23`, `dark-register.md:23`) parked the field + froze the morph; the dark-register auditor read DARK mode (where the lift is correct) and wrote "dark glass TRANSMITS … VERDICT: PASS" (`dark-register.md:39`) while LIGHT-mode `.glass-floating` was grey.

## Target spec (grounded)
A thin pointer + verdict-naming wrapper (no src/, no new gate). Records the BA verdict matrix from `postmortem/ba.md`:

**BUILT+PAINTED (PRESERVE — do NOT rebuild):** W-FEEDBACK-TONE (`src/styles/feedback-tone.css` real recipe; 3 opaque-slab maps collapsed) · W-PROGRESS-GRADIENT (`ProgressSectioned.vue:179` single-fill replaced the per-cell stack) · W-HANDMARK (the d6 re-land + `/underline` DEC-8 fold struck the phantom slides break) · W-FADING-SCROLL (dual-path native+JS, ≥2 consumers) · W-NO-GRAY (warm-amber LIGHT-register chroma floor — orthogonal to the adaptive-darken grey, a genuine identity win) · W-ICON-CHIP / W-PAGER / W-EMISSION / W-CONFIG-CHASSIS width contract (the 0px-slider class genuinely died at the chassis) · W-MENU-GLASS · **the 4.0.0 publish + d6 fork close** (npm provenance, lineage map honest — BA's genuine win, the single hardest thing the constellation needed).

**BUILT-NOT-PAINTED (source landed, page still wrong — RE-PAINT on the rebuilt floor):**
- W-DARK-MATERIAL scope 7 → grey dock/floating/overlay band (the half-fix). → **BC Band 1** (BC.W-ADAPTIVE-RECONCILE + BC.W-GLASS-LEGIBILITY-MEASURED).
- W-DARK-MATERIAL the dark rim → `srgb(0.11 0.098 0.09 / 0.14)` = the user's "wtf is this black bar" (D2). → **BC Band 1** (rim→catch-light rebuild, BC.W-BLACK-BAR/W-GLASS-LEGIBILITY-MEASURED).
- W-DOCK-SECTIONS + 4th rail + W-DOCK-MORPH-INSITU → stutter/white-morph/not-clickable; the reflect only stressed rail geometry under reduced-motion. → **BC Band 2** (BC.W-DOCK-ENGINE / BC.W-DOCK-STACK-RAIL / BC.W-LIQUID-MORPH).
- W-GLASS-CAL (blur dial-back) → SPEC-DIRECTION-WRONG: dialed blur DOWN exactly as specced; the user wanted MORE glass (BB minted `--glass-depth` to undo it). → **BC Band 1 re-design** (restore the maximal register; PRESERVE the disco-retirement — that was correct).
- W-SURFACE-AXIS → PRUNE-CLAIMED-NOT-EXECUTED: the axis factored (real source, KEEP) but `src/components/custom/glass-panel/` NOT pruned (still on disk) + the Dialog reads opaque downstream of the grey-darken. → **BC Band 1** (BC.W-GLASS-PRUNE → Glass CARDS + Glass MATERIALS; BC.W-DIALOG-GLASS).
- W-TABS-STD → flat/not-liquid pill register. → **BC Band 3 (tabs)**.
- W-GOO-REDRESS → bridge/wake source landed, WebGPU-first arming is a Band-3 concern. → **BC Band 3** (BC.W-VIZ-LIVE).

**CLAIMED-NOT-BUILT:** W-REFLECT2 (the gestalt close itself) — ran once, reduced-motion, dark-biased; the close-class lie one level up. → **BC Band 0** (BC's reflect runs LIVE motion, BOTH modes stressed for the LIGHT-mode grey, reads pixels).

## Mechanism / files
- **Created:** this file. **Reads:** `postmortem/ba.md`, `SYNTHESIS.md:46-90`. NO forensic duplication.
- **ZERO src/ edit, ZERO new gate.** The matrix feeds `FOLD-LEDGER.json tranches.BA[]` (BC.W-FOLD-LEDGER); `proof:bc-fold-ledger` REDs the close on a dropped row.

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT criterion (N/A — forensic).** Documentary completeness: every BA wave in `BA/PROGRESS.md` has a verdict + a BC disposition here.
2. **Machine gate:** `proof:bc-fold-ledger` — REDs if any BA verdict is dropped from the ledger.
3. **π readback:** none. The paint this wave points at is re-verified per-wave in Bands 1-4 under BC.W-GESTALT-FIRST.

## Fences / invariants (must NOT regress)
- **Re-paint, don't re-build.** The ~20/30 BUILT+PAINTED BA waves are TRUSTED. BC must NOT rebuild feedback-tone, progress-gradient, handmark, fading-scroll, no-gray, icon-chip, pager, emission, the config-chassis width contract, or the 4.0.0 publish/fork-close.
- **The seed diagnosis was right (§"What BA got RIGHT" .3).** BA correctly named the P-1 close-class + the dark-register flatness as the cross-cutting root. The thesis is sound; only the enforcing gate was paper. BC keeps the thesis, makes the gate read pixels.
- **The 4.0.0 publish + d6 fork-close is genuine + load-bearing.** The lineage map (BA FINAL §5) is honest. BC.W-FOLD-LEDGER records it discharged; the Atlas `^3.12.0`→`^4.x` adopt (Band 10) is the remaining gap, NOT a re-publish.

## Folds (deferrals discharged)
This wave DECIDES (records the verdict for) the BA deferral cluster (`deferral/ba.md`, 41 items):
- `ba-dock-shell-gestalt-fail-revoked` (THE BC HEADLINE — the 8/8 gestalt PASS was REVOKED at BB.W-CHIP-GRAZE, re-routed to the never-run W-REFLECT3; dock+shell roster rows stand FAIL on disk) → recorded as the UN-ADDRESSED dock/shell FAIL, BC Band 2.
- `ba-final-zero-deferral-discipline-broken` (the META-item — the BA close model itself defeated by the W-REFLECT3 deferral chain) → recorded; BC.W-GESTALT-FIRST is the architectural cure.
- The BUILT+PAINTED MET items (`ba-scroll-fade-retire-overclaim`, `ba-easing-primitive-book`, `ba-glass-menu-row-r5-10`, `ba-atlas-adopt-fork-close`, `ba-css-relative-color-fold`, `ba-chr1-5175-residue`, `ba-hygiene-ax-w33-close`, `ba-aurora-breathing-register-vjs2`) → recorded MET/discharged.
- DECIDED disposition for the wave itself: the verdict matrix feeds BC.W-FOLD-LEDGER; the dock/shell REVOKED-FAIL is owned by Band 2 (re-earned GREEN per-wave, never re-routed to a terminal flipper).
