# GROUP A — Archaeology & Recap SYNTHESIS (RESPEC-GESTALT pass-1)

**Collector:** Group A · **Lenses folded:** A1(BB) A2(BC) A3(BD) A4(BE/BF) A5(BG-state) A6(BH-state)
A7(deferral) A8(prompt-coverage). **HEAD:** `976dc890` · **Base:** v4.2.0 · verified on disk 2026-07-01.

---

## 0. Group verdict — against the user's five critique axes

The archaeology is unambiguous on the ONE thing that matters: **the user's "last several tranches have
been disastrous" verdict is correct, and its root cause is a single disease that mutated across four
tranches rather than dying.** The disease is *source-green / visually-broken*: a tranche lands real
mechanism, self-certifies "complete" against gates that measure the wrong invariant, and ships (or
declares done) a gestalt the user reads as broken.

- **BB** (A1) — built the liquid-glass band + WebGPU substrate + an elaborate close-integrity
  apparatus, then declared "33/33 complete, CI green" while **`0/33` were painted**
  (`2a182648` BC forensic post-mortem, verbatim). Every visual claim funneled through ONE terminal
  wave (`W-REFLECT3`) that never ran on BB's terms. The over-contrivance axis is met at the META level:
  the ceremony was built correctly and its own completion was never verified.
- **BC** (A2) — genuinely SHIPPED as v4.1.0 (disk-confirmed: `git rev-list -n1 v4.1.0` = `9c0e06e2`),
  and built the correct cure (per-wave paint gate). But its `challenge→harden` ritual was a
  **plan-graph linter, not a design review** (all 16 CHALLENGE-1 findings are dangling-reference /
  phantom-wave defects — zero concern whether a surface reads as liquid glass), and its paint gate
  caught *isolated-surface* grayness while missing *whole-route composited* grayness. The disease
  narrowed; it did not close.
- **BD** (A3) — the union tranche (4.2.0). Shipped a sound primitive spine (0 re-invention) but
  **concentrated all five critique-axis failures in its integration/shell layer**: a route-transition
  freeze hid every page behind a 356-gate-green close; a static metallic wash shipped where the user
  asked for live aurora; the hero over-scale INVERTED its own directive. Missing-obvious-issues +
  poor-encapsulation (the shell parsing page-internal class names) + lacking-elegance (an accreted
  `.paper-field` faking what one `<Aurora>` gives for free) all land here.
- **BE/BF** (A4) — plan-only, folded cleanly into BD; the 70-wave + 32-item disposition ledger is
  **the single cleanest piece of process discipline in the corpus** (gate-locked, GREEN, zero silent
  drops). A positive counter-example, not an indictment.
- **BG/BH** (A5/A6) — the honest cure-in-progress. The BG cursor is HONEST (git code-change census is
  a bijection with DONE code-bearing rows; 26 DONE real), and BH is right-sized. **These two tranches
  cure the BD shell-breakage** — but leave the sharpest first-principles questions uncarried.

**The gestalt-cohesion axis is the throughline.** Across BB→BC→BD the *components* are ~90%
architecturally sound; the *gestalt a user sees* diverged completely because every verification
mechanism measured a LOCAL invariant (token chroma, isolated-surface pixels, plan-graph consistency)
and none measured the WHOLE. The BG plan is the first to attack this — but the two mechanisms that
would actually close it (a composited-whole paint gate; the Fable/DesignSync human-strongest-model
review) are **absent from the developed plan** (§3 findings F2, F5).

---

## 1. Deduplicated, severity-ranked findings (group-wide, disk-verified)

### CRITICAL

**GF1 — The disease mutated, not died: BC's paint gate cannot see whole-route composited grayness.**
(A1 + A2 F2/F3 + A3 axes-1/2 converge.) BC's `proof:ba-gestalt` reads a token's warmth or an isolated
specimen's pixels — but a warm token composited over an achromatic page still reads gray, which BD's
greenfield audit had to re-diagnose BY HAND (`BD/greenfield/buttons/GOLDEN.md:9-20`: shipped BC default
Button rest fill = `oklab chroma 0.0138`, "NEAR-GRAY", root cause `--glass-tint-strength: 0%` at
`:root`). The verification axis and the gestalt-a-human-reads axis are decoupled. This is the direct
mechanical ancestor of the "disastrous" verdict.

**GF2 — The AX.W54 glass-first-maximal over-reach is the sharpest un-carried first-principles question
in the whole lineage.** (A3, load-bearing.) CLAUDE.md itself admits "the glass blur is imperceptible
over a flat substrate." Glass-everywhere-without-a-colorful-backdrop is invisible-by-construction — the
DOMINANT user frustration ("buttons largely invisible," gray glass). BD's own second-eyes
(`TRANCHE-GESTALT-META §3.3`) raised the transposition and **grep confirms NO BG wave carries it or the
defined-edge-default fix.** This is a co-equal-top root with GF1 and has no home.

**GF3 — The Fable/DesignSync mandate (2026-07-01, the FRESHEST binding directive) is unencoded in the
entire developed plan.** (A8 F1, disk-confirmed by me: `grep -ic fable|designsync` across
`RESPEC/AMENDED-WAVE-PLAN.md`, `RESPEC-COHERENCE/AMENDED-COHERENCE-PLAN.md`, `AMENDED-BH-COHERENCE-PLAN.md`,
`FINAL.md`, `EXECUTION-PROGRESS.md` → **0/0/0/0/0**.) SEED-CONTEXT makes it binding ("every VISUAL wave
names its Fable design arm + its DesignSync review surface"). Six of seven workstreams are visual; none
has a Fable arm. **The plan as folded will re-run the exact opus-fanout-built-visuals pattern the user
judged disastrous** — the mandate is a silent drop by omission.

**GF4 — `P-historical-coverage.md:26` is disk-FALSE about BC and poisons every downstream wave that
cites it.** (A2 F1, adjudicated §2 below.) It states "BC was tranche-DEV only, never built… the cure was
specced, not shipped." Refuted by the v4.1.0 tag (`9c0e06e2`, 98 commits past v4.0.1) and BC's own
28-tier `EXECUTION-PROGRESS.md`. Any BG/BH wave inheriting "build the BC cure" is building on a false
premise — the cure EXISTS; its composited-gestalt blind spot (GF1) is what needs a wave.

### MAJOR

**GF5 — The god-module ratchet is RED today and structurally self-defeating.** (A1, verified by me:
`node scripts/proof-no-god-module.mjs` → `FAIL`, `glass/ladder.css` 527L + `dock/shell.css` 510L, plus
16 re-grandfathered `RATCHET_BASELINES` including `GlassDock.vue` at 711L — the exact file BB carved
three times W-CARVE3/4/5.) The gate is engineered to make regrowth grandfatherable rather than blocking
— it normalizes the disease it was built to kill. Poor-encapsulation + lacking-elegance, machine-visible.

**GF6 — Five deferred greenfield registers have a ledger row but NO buildable wave.** (A3.) The user
explicitly asked to fold chronic deferrals; these fell through: **metallic-aurora ×2** (fully de-risked:
`MEDIUM_ID` ceiling at kuwahara==7, discarded `Gx/Gy` tensor — metal is uMedium 8/9), **blurred-image-bg**
(aurora's first texture pipeline), **the dotflow ADVECTION `flow` register** (the part that "surpassed
the reference"; BG's rebuild carries only the halftone-field), **the story-page SUB-TYPE taxonomy**
(`DemoStage/Specimen/Interaction/Matrix/Composition` — flattened out of `W-STORY-PAGE-API`), and **the
aristotelian-proportion edict** (one of 8 core laws, zero wave, zero gate). The `DIRECTIVE-LEDGER`'s
"every directive maps cleanly" roll-up let these read as covered — the narrated-done-but-unexecuted
pattern that produced the verdict.

**GF7 — ~6 speculative "wants-it-someday" registers parked as DEFER are over-contrivance re-badged as
prudence.** (A7 F2, verified in `FOLD-LEDGER.md:97-143`.) aurora satin/prism/reactive, tab-ios-capsule,
alive-idle, anticipate-follow, concentric-radius — each rides BE→BF→BG with ZERO consumer behind a
subjective "a consumer wants it" gate. This is the J-inv-10 ≥2-consumer bar failing *inward*: the library
holds dead spec-debt. Honest verb is RETIRE-with-rationale (the `BB.W-NDA-DECIDE` discipline).

**GF8 — deep-glass full-20px: a one-token change gated 5 tranches on a number nobody has run.** (A7 F3,
verified: `glass-deep.css:5,21-27` — Apple ceiling `saturate(1.8) blur(20px)`, glass-ui deliberately at
16px/1.5, "the full 20px BOOKED" since BB.) Ridden BB→BC→BD→BE→BF→BG. The trigger is a `profile:budget`
clearance that has never been RUN at 20px. Textbook chronic + a live design-identity gap (the language is
"iOS-26/27 liquid-glass" and the library sits below the Apple-measured ceiling for an unchecked reason).

**GF9 — The jubilance/dead-engine DECIDE is mis-stated; the real disposition splits three ways.**
(A8 F3, adjudicating A7 — see §2.) Disk-verified: `useHaptic` (exported `src/index.ts` + `api/index.ts`)
and `useCelebrationBurst` (exported `motion/index.ts` + `api/types-extra.ts`) are EXPORTED → overfitting
law does NOT force deletion; an exported-but-unwired "jubilance" is a *gestalt lie* → **wire ≥2 LIVE or
DEMOTE from export**. `useDockContextSilhouette` (551L, comment-only ref at `AppSwitcher.vue:3`) is the
TRUE overfitting target → **wire ≥2 or delete**. The flat "≥2-or-delete" shorthand will mis-classify.

**GF10 — Pass-E: 7 of 11 categories never audited to convergence.** (A3.) The user explicitly
commissioned the 118-page deep audit; dock/forms/foundations/substrates GESTALT'd, but
display/containers/data/feedback/navigation/compositions + the motion gestalt never converged —
**~104 of 156 pages never got the deep audit**, and `W-PAGE-COMPONENT-AUDIT` (17.6) is a capture-VERIFY
of the roster, not a re-audit of the 7 missing categories.

### MINOR / HYGIENE (real but downstream-bounded)

- **GF11** — Row `2.7 BG.W-VT-ROUTE-ENHANCE` is DONE-but-NOT-BUILT (A5 F2, verified `EXECUTION-PROGRESS.md:98`:
  "DEFERRED-NOT-BUILT… marked DONE to skip the build frontier"). The DONE-inflation disease replicated in
  the cursor built to cure it.
- **GF12** — Coherence fold skipped rows 18.11 / 19.2 (A6, verified: `:313` still "2 by-name asks" +
  bare `proof:crossrepo-asks`; `:320` still carries dual `rg -l … == 0 · proof:claude-deletable`). The
  "two forms, one can never pass" pattern the fold was built to kill, left in its own cursor.
- **GF13** — 83 GB / 99 stale worktrees on stale HEADs (A5 F1) — resource sink + re-seed-at-stale-base
  hazard ([MEMORY: stale-worktree-trap]).
- **GF14** — the in-src `BOOKED:`-label detector under-counts bare-word `BOOKED` (A7 F1/F4) — latent
  no-silent-drop hole (none dropped today; the mechanism can't SEE a natural-English booking).
- **GF15** — Band-0 aesthetic edicts (√φ proportion, 12 animation laws, technicolor-cartoon-punch) have
  prose + per-mechanism gates but NO gestalt acceptance path (A8 F2) — how "gestalt cohesion" + "lacking
  elegance" went unmeasured across three ships.
- **GF16** — `DIRECTIVE-LEDGER` frozen at 06-25, self-violates its own no-silent-drop rule the moment
  the 07-01 mandate exists (A8 F4). `goo-blob→blob` rename (A8 F5) is a named no-legacy debt, free at a
  major, unhonored.
- **GF17** — `BG.W-DOCK-FISSION-WIRE` is a THIRD attempt with only a prose "no re-book 4th time" guard;
  needs a machine tripwire, not a new wave (A4 F2).

### POSITIVE (record so downstream does not re-open)

- The BE/BF disposition ledger is machine-GREEN, zero silent drops — the template for future
  half-executed-tranche situations (A4 F1).
- The BG deferral MACHINE is built + honest; `P-chronic-deferred.md`'s D6/D11 CRITICAL rows are
  genuinely CLOSED — do NOT re-open them (A7 F5).
- BG cursor honest / BH right-sized — the frontier is intact and correctly ordered; green light to
  attack the QUALITY of the remaining plan, not its correctness (A5 FC4 / A6 FC3).

---

## 2. Contradictions between lenses (adjudicated with disk evidence)

**C1 — A2 vs the standing corpus (`P-historical-coverage.md:26`): "Did BC ship?"**
A2 says BC EXECUTED and shipped v4.1.0; `P-historical-coverage.md:26` says "never built." **Disk
adjudicates for A2, decisively:** `git rev-list -n1 v4.1.0` = `9c0e06e29dd3…`, the tag exists, and
BC's `EXECUTION-PROGRESS.md` records 28 DONE tiers + a "CUT COMPLETE" npm-publish entry corroborated by
`MEMORY.md` (`project_glassui_410_published.md`). The P-lens conflated `BC/FINAL.md` ("zero src/ edits",
written at end-of-DEVELOPMENT, before the execution greenlight) with the tranche's final state. **This
is GF4** — a corpus-integrity finding that must be corrected before any downstream wave cites it.

**C2 — A7 vs A8 on the jubilance/dead-engine disposition.**
A7 (F2 table / FC1) lumps `useCelebrationBurst` with the "zero real src call-sites → RETIRE/delete"
class. A8 (F3) splits it finer: `useHaptic` + `useCelebrationBurst` are EXPORTED, so the overfitting law
(which exempts exported symbols) does NOT force deletion — the honest verb is DEMOTE-from-export-or-wire.
**Disk adjudicates for A8:** `useHaptic` is in `src/index.ts` + `src/api/index.ts`;
`useCelebrationBurst` is in `src/composables/motion/index.ts` + `src/api/types-extra.ts`. Only
`useDockContextSilhouette` (comment-only ref) is the true delete-or-wire target. **Adopt A8's three-way
verdict** (GF9); A7 is right on the facts (dead) but wrong on the verb for the exported pair.

**C3 — apparent A1 vs A5 on the god-module gate (not a real contradiction).**
A1 reports the ratchet RED with 16 re-grandfathered files; A5's state census does not mention it. These
are complementary, not conflicting — A5 audited cursor honesty (DONE-vs-disk bijection), not gate-health.
I verified A1: the gate is RED at HEAD. **A1's GF5 stands unqualified.**

No other lens pair genuinely disagrees. A2's F1 and A4's Finding-3 both note `P-*` audit files are
point-in-time snapshots gone stale — a consistent meta-observation, not a contradiction.

---

## 3. Consolidated FOLD CANDIDATES (Group A → AMENDED-GESTALT-PLAN)

Deduped and merged across the 8 lenses. Cross-references name the OTHER-group territory a candidate
touches (glass-token, dock-arch, viz-census, demo-arch, gate-system, motion, splits/colocation).

### GA-1 [new-wave, CRITICAL] `BG.W-GLASS-DEFAULT-DEFINITION` — carry the AX.W54 over-reach transposition
*From GF2 / A3-FC1.* The idiomatic transposition BD's own §3.3 invited and no wave carries. **Gestalt
approach, not a patch:** split glass into TWO tiers on the ONE `--glass-level`/edge machinery — a
*transmissive* tier (current maximal glass, for surfaces that HAVE a colorful backdrop) and a *defined*
tier (stronger rim + floor-fill + the W-BUTTON-GLASS lit register) that is the DEFAULT for controls
(button/input/chip/dropdown) so they read as a SHAPE over ANY backdrop. Pairs with the now-landed
`BG.W-FIELD-AURORA` so transmissive glass finally has something to bend. Gate: computed-contrast of a
default `<Button>`/`.input-pill` over a FLAT page clears a legibility floor with the field OFF.
→ **Cross-ref: glass-token-arch group** (they own the `--glass-*` cascade; this must not fork it).

### GA-2 [new-wave, CRITICAL] `BG.W-COMPOSITED-GESTALT-GATE` — measure the whole, not the part
*From GF1 / A2-FC2.* Completes BC's "measure paint not source" thesis at the composited whole. Capture a
REAL route (not a synthetic specimen) at rest with NO injected ancestor override, assert the *dominant
hue family* of the composited screenshot region is warm — reusing the existing `paint-arm.mjs` color
probe but changing WHAT it samples (a route region, not one element's computed style). Directly closes
the F2/F3 failure mode the greenfield audit found by hand. → **Cross-ref: gate-system group**; pairs
with GA-3 (the human-review half of the same seam).

### GA-3 [new-wave + plan-schema-edit, CRITICAL] Encode Fable/DesignSync per visual wave
*From GF3 / A8-FC1.* The seed's literal binding instruction. **Not a checkbox — a schema edit:** every
VISUAL wave (all WS1-WS6) declares `fableArm` (the Fable instance owning the design authoring / gestalt
decision) + `designSyncSurface` (the claude.ai/design card it syncs to). Add a WS7 process wave
`BG.W-FABLE-DESIGN-ARM` that (a) stands up the `/design-sync` skill + surface if unprovisioned, (b) makes
"the DesignSync review returned a PASS gestalt verdict from Fable, not the building agent" a close
precondition for every visual wave. The direct cure for "opus-fanout-built visuals judged disastrous."
→ Interacts with GA-2 (machine + human halves of the gestalt-review seam) and GA-9 (the edict verdicts
ride this review).

### GA-4 [new-wave, HIGH] `BG.W-GOD-MODULE-STRUCTURAL` — stop re-carving, re-architect once
*From GF5 / A1-FC2.* Gate is RED today. **Gestalt approach, not a 4th line-trim:** (a) audit WHY
`GlassDock.vue` (711L) + the dock-composable cluster keep regrowing — the dock does too many jobs
(morph + fission + rail + hold-state + a11y); do the genuine colocation split ONCE; (b) change the
ratchet CONTRACT so a new grandfathered baseline requires a companion carve-successor wave-id comment,
OR cap the grandfathered-entry count and FAIL once exceeded — forcing drain over infinite re-baseline.
→ **Cross-ref: splits/colocation + dock-arch groups** (they own the concrete GlassDock decomposition).

### GA-5 [new-waves + amend-waves, HIGH] Fold the five no-carrier deferred registers
*From GF6 / A3-FC2/3/4.* The user's explicit fold mandate:
- **`BG.W-AUR-METAL-FINISH`** (metallic ×2) — metal as a MEDIUM (uMedium 8/9, mutually-exclusive ladder,
  NOT an orthogonal finish — the greenfield already killed the medium×finish "configurator-lie").
- **`BG.W-AUR-IMAGE-SOURCE`** (blurred-image-bg) — SHARES the ONE texture-upload primitive with
  `BD.W-DOT-IMAGE` (whichever lands first builds it).
- **AMEND `BG.W-DOTFLOW-REBUILD`** to carry the advection `flow` register (GPGPU state-texture + two-FBO
  trail + warm-fire ramp, teal-navy-purge fence held) — without it dotflow is un-broken, not surpassing.
- **AMEND `BG.W-STORY-PAGE-API`** to restore the `Demo{Stage,Specimen,Interaction,Matrix,Composition}`
  sub-type taxonomy as thin compositions over the chassis — the mechanism that turns "N bespoke
  spec-sheets" into "one product with natural variation" (the direct gestalt-cohesion cure).
- **NEW `BG.W-ARISTOTELIAN-PROPORTION`** — a proportion census + `proof:aristotelian` gate (every
  radius/spacing/padding is a √φ step off a named anchor; concentric radii; a raw off-ladder `rem` reds).
→ **Cross-ref: viz-census group** (metal/image/dotflow) + **demo-arch group** (sub-types + proportion).

### GA-6 [new-wave, MEDIUM] `BG.W-SPECULATIVE-RETIRE` — RETIRE the ~6 "wants-it-someday" registers
*From GF7 / A7-FC1.* Transpose the `BB.W-NDA-DECIDE` terminal-RETIRE discipline onto aurora
satin/prism/reactive + tab-ios-capsule + alive-idle + anticipate-follow + concentric-radius: flip each
`DEFER-with-trigger → RETIRE` IN PLACE in `FOLD-LEDGER.json` (no-delete fence) with a `rationale` +
`successor: "a fresh ≥2-consumer trigger re-enters the idea"`. Zero pixels, zero mechanism — a
disposition flip + a `proof:bg-deferred-ledger` re-count. The single most direct answer to
"over-contrivance" in the deferral surface. (Note: `concentric-radius` overlaps GA-5's aristotelian
edict — retire the speculative shared-register, keep the per-surface `containerConcentric` idiom.)

### GA-7 [new micro-wave, MEDIUM] `BG.W-DEEP-GLASS-DECIDE` — end the 5-tranche chronic with a number
*From GF8 / A7-FC2.* RUN `profile:budget` with `--glass-blur-deep` at Apple 20px / `saturate(1.8)` on
the deep tier's real per-frame cost. Clears → land the two-token bump (deep tier reaches its design-
language ceiling). Does NOT clear → convert to `RETIRE-with-recorded-number` (16px IS the ceiling for
this substrate, stated as identity, not debt). Either way the chronic ends with a measurement, not a
sixth re-book. → **Cross-ref: glass-token group.**

### GA-8 [amend-wave, MEDIUM] Restate the jubilance/dead-engine DECIDE with THREE verdicts
*From GF9 / A8-FC3 (adjudicated over A7).* Amend `WS7-03b`/`WS2-17`: **`useHaptic` + `useCelebrationBurst`
→ wire ≥2 LIVE consumers OR demote from the public export** (exported-but-dead is a gestalt lie; deleting
an export is a clean-break the user didn't request — demotion is the honest middle);
**`useDockContextSilhouette` (551L) → wire ≥2 OR delete** (true overfitting target). Strike the flat
"delete per overfitting law" shorthand. **BUNDLE the fission-wire tripwire (GF17 / A4-FC3):** strengthen
`BG.W-DOCK-FISSION-WIRE`'s gate to FAIL if `useDockFission` ships at <2 real SFC consumers (the
`proof:nda-decided` terminal-lock shape) — machine-enforce the prose "no re-book 4th time."
→ **Cross-ref: dock-arch + motion groups.**

### GA-9 [amend-wave, MEDIUM] Give the Band-0 aesthetic edicts a binding acceptance path
*From GF15 / A8-FC2.* Do NOT mint N mechanical gates (the ceremony disease). Transpose the edicts INTO
the gestalt review: amend the `proof:ba-gestalt` roster (and the GA-3 DesignSync review) so each enrolled
surface owes an explicit per-surface VERDICT on three axes — **√φ-proportion-consistent · the driver
carries the animation laws (anticipation/follow-through/secondary-action) · reads as technicolor
cartoon-punch, not flat.** The edicts become the acceptance LANGUAGE of the one gestalt gate instead of
unread `DESIGN.md` prose. Also resolves the `proof:ba-gestalt`-excluded-from-release seam at the same
point. → Interacts with GA-3 and GA-5's aristotelian gate (proportion enforced twice — machine + review).

### GA-10 [amend-wave, MEDIUM] Complete the 7 un-converged Pass-E categories
*From GF10 / A3-FC6.* Amend `BG.W-PAGE-COMPONENT-AUDIT` (17.6) to add a per-category convergence pass
(the same 3-context + synthesis + gestalt engine, batched-3) over display/containers/data/feedback/
navigation/compositions + the motion gestalt. Closes the user's "missing obvious issues" verdict by
ACTUAL coverage of ~104 pages, not a capture of the 4 already-converged categories.
→ **Cross-ref: demo-arch group** (they own the page-audit engine).

### GA-11 [plan-doc-edit, corpus-integrity] Correct the false BC characterization
*From GF4 / A2-FC1.* Amend `P-historical-coverage.md:26` (+ surrounding prose): BC EXECUTED and shipped
v4.1.0 (`9c0e06e2`); the residual is NOT "never built" but "a per-wave paint gate that catches
isolated-surface grayness yet does not catch whole-route composited grayness" (GF1). Prevents a
downstream wave re-deriving "build the BC cure" as if it doesn't exist.

### GA-12 [plan-doc-edit + engine, HYGIENE bundle] The honesty/hygiene fixes — one pass, no new ceremony
*From GF11-16 / A5-FC1/2/3, A6-FC1, A7-FC3/4, A8-FC4/5.* Fold into whatever pass next touches the cursor
+ engine — do NOT spawn a wave each (that IS the granularity disease):
- Row `2.7` status **DONE → DEFERRED**, and add `DEFERRED`/`BOOKED` to the frontier-sweep skip-set so
  honesty and frontier-progress stop being in tension (GF11).
- Fix rows `18.11` ("2 by-name asks" → "4"; `proof:crossrepo-asks` → `:bh`) and `19.2` (delete the
  bare-`rg` clause, keep the single `proof:claude-deletable` form) — mirroring the already-correct
  `PLAN.md` copies (GF12).
- Add a `sweepStaleWorktrees()` engine step + a `verify-worktrees-fresh.mjs` tripwire (delete any
  `.claude/worktrees/*` not ancestor-or-equal of HEAD; hard-cap disk) — make step-0-reset DELETE the
  stale tree, not re-seed on it (GF13).
- Harden the in-src detector: FORBID bare-word `BOOKED` in `src` (every booking uses the `BOOKED:` label
  form the census reads — complete-by-construction) + add the `.css` arm + reconcile `FOLD-LEDGER.md:173`
  (GF14).
- Re-stamp `DIRECTIVE-LEDGER` to 07-01 with a `§Process-Edicts` block carrying the Fable/DesignSync
  routing (GA-3) + edict-gestalt-enforcement (GA-9) as explicit rows (GF16).
- Schedule the `goo-blob → blob` clean-break rename into the BH restructure's export reshape — free at
  the 5.0.0 major (GF16). → **Cross-ref: gate-system group** (worktree GC + detector) + **BH restructure.**

### GA-13 [defer-honest] Do NOT double-book, do NOT re-open closed items
*From A4-FC2, A5-FC4, A7-FC5.* No `BG.W-BE-BF-RECAP` wave (the ledger is the artifact; a recap wave IS the
ceremony disease). Do NOT re-open `P-chronic-deferred.md`'s D6/D11 (genuinely CLOSED). Keep the honest
external-trigger holds booked (Metal/Safari p50, foreign-tree kf/value.js republish, un-Baseline CSS
features) — but the RESTAMP wave (DONE) must have re-checked 2025-Baseline features (`interpolate-size`/
`calc-size()`, `text-box-trim`) for graduation; verify it did.

---

## 4. The Group-A one-line handoff to the other 24 lenses

The archaeology is settled: **the disease is real, it is gestalt-cohesion decoupled from every
verification axis, and BG cures the SHELL breakage but not the two ROOTS (GF1 composited-gestalt gate,
GF2 glass-default-definition) nor the freshest MANDATE (GF3 Fable/DesignSync).** The BG cursor is honest
and correctly ordered — so the other groups may attack the QUALITY of the remaining ~110-wave frontier
(contrivance, granularity, encapsulation, elegance) on a trusted foundation, and should treat GA-1/GA-2/
GA-3 as the three load-bearing new waves the whole audit converges on.
