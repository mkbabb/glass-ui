# AX inventory — W-blob lane (Blob band status)

**Inventory ID:** W-blob · **Tranche:** AX · **HEAD:** `c72d2ac` (3.8.0 + convergence-1
W44-W52 + convergence-2 W53-W59) · **Lane scope:** W08/W15/W16 (landed) + W46 (blob
live-truth, planned) · the D4/D5/D7 live-broken regressions · is W46 sufficient · the
re-verify-live flag. Read-only step-back inventory — NO code edits.

---

## 1. Status snapshot (DONE / PARTIAL / NOT-STARTED / AT-RISK)

| Wave | PROGRESS row | JSON status | Live truth | Verdict |
|------|--------------|-------------|-----------|---------|
| **W08** blob smin un-flood | `complete` | `dev-complete (headless GREEN; orchestrator owns live close)` | un-flood field is the surface the look re-tunes on | **DONE (field correct)** — but it authored the FLOOR-only gate that lets "louder" pass |
| **W15** contained droplet (lit warm-cream) | `complete` | `REDRESS dev-complete` + **UNMET `liveVerifyNeeded`** | the live π-lane was the close criterion and was **NEVER discharged** | **AT-RISK / DONE-WITH-MISS** — geometry contained-OK; the lighting/interaction MAGNITUDES are the live-broken overshoot |
| **W16** integration (pause/perf/readme) | `complete` | `GREEN` + **UNMET `liveVerifyNeeded`** + `selfGateCaveat` | quiescence/pause seam landed; touched NO magnitude, NO mood priority | **DONE on its own axes** — explicitly does NOT fix D4/D5/D7 (FileBounds cede magnitudes to W15, do not touch mood precedence) |
| **W46** blob live-truth tune (D4+D5+D7) | `planned` | — (no JSON) | all four RED witnesses LIVE at HEAD (re-verified at source below) | **NOT-STARTED** — the convergence DISCHARGE of the W15/W16 deferred live-π |

**The headline cardinal-lesson trigger (A-waves-blob §timeline; A-session-soundness):** W15
and W16 are both stamped headless-`GREEN`/`REDRESS dev-complete` but **both carry an UNMET
`liveVerifyNeeded` clause** ("the orchestrator MUST run the π-lane on the real Metal GPU").
The live π-lane was the close criterion and was not discharged. D4 (too skeuomorphic), D5
(hover broken/dramatic), D7 (moods dead) were observed AGAINST the W15/W16 droplet **already
shipped** (`git merge-base --is-ancestor` confirms 9d0ec2f/d472292/91fc2e0 all IN the defect
base e2c9995). These are the **literal headless-green/visually-broken class** W46 exists to
close — not pre-W15 defects but regressions/insufficiencies of the landed work.

---

## 2. Source re-verification — all four W46 RED witnesses are LIVE at HEAD `c72d2ac`

The W46 plan was authored at HEAD `002bda5`. I re-proved each witness against the CURRENT
source (the convergence-2 W53-W59 cut did NOT touch the blob — DELTA confirms no blob edit):

- **RED witness 1 — the gate is a one-sided FLOOR (the structural root).** `tests-visual/
  blob-render.spec.ts:95` `DOME_LUMA_STD_MIN = 9` checked **floor-only** at `:463`
  (`toBeGreaterThanOrEqual`, NO paired ceiling); `:104` `CENTROID_SHIFT_MIN = 0.012` checked
  floor-only at `:509`. **NO `DOME_LUMA_STD_MAX` / `CENTROID_SHIFT_MAX` exists.** A garish
  dome (std ~18+) and a lunging lean (shift ~0.11) PASS "better." `proof:blob-render` is
  registered (`package.json:657`) and passes over exactly this state. CONFIRMED RED.
- **RED witness 2 — lighting cohort over-bright (D4).** `types.ts` ships `specStrength: 0.9`
  (`:272`), `specShininess: 32` (`:273`), `rimStrength: 0.5` (`:275`), `iridescence: 0.18`
  (`:262`), `sssScale: 0.2` (`:265`), `coreGlow: 0.1` (`:267`), `lit: true` (`:269`).
  Unchanged from the W9.b-era raw weights. `metaball.frag.ts` energy-norm `(32+2)/8 = 4.25`
  → glint peak `0.9 × 4.25 ≈ 3.83` (~3.8× over-unity → clamps to pure white). CONFIRMED RED.
- **RED witness 3 — interaction too dramatic (D5).** `types.ts:300` `pointerStrength: 0.45`
  (W15-REDRESS bumped `0.11 → 0.45` to clear the `0.012` floor by ≈9×), `:299`
  `pointerAttraction: 0.35`, `:301` `stretch: 0.5`, `:302` `clickImpulse: 0.5`. Shader
  falloff `metaball.frag.ts:322` `smoothstep(0.65, 0.0, pointerDist)` (widened from `0.4`).
  Squash `:206` `sa = 1.0 + speed * uStretch` — **UNBOUNDED, no tanh saturation** (taffy-pull
  to ~2.25× on a flick). CONFIRMED RED.
- **RED witness 4 — blob-mood clobber (D7).** `useBlobMood.ts:139` `function setMood(mood:
  BlobMood)` — **NO `source` param, NO `manualOverride` latch.** `update()` (`:154`) is "the
  single internal caller of setMood" (`:152` docstring) and runs unconditionally every frame,
  falling through to `setMood("idle")` (`:167`) one frame (~16ms) after a manual pill press.
  `excitedHoldMs` (`:131`) is the only latch and it is excited-only. CONFIRMED RED.

**W46 deliverables status:** `tests-visual/blob-mood-live.spec.ts` = MISSING; `scripts/
proof-blob-live-truth.mjs` = MISSING; `proof:blob-live-truth` in package.json = NOT
registered; `docs/tranches/AX/audit/W46-blob-live-truth-tune.json` = MISSING. **W46 is fully
NOT-STARTED.**

---

## 3. Is W46 SUFFICIENT? — YES (the plan is converged, complete, and correctly scoped)

W46 (`waves/AX.W46-blob-live-truth-tune.md`, 659 lines) is a **deep, converged, correctly
disjoint** wave plan. It is sufficient on all axes the blob lane needs:

**a) The gestalt root is identified, not patched.** D4 + D5 share ONE root pathology
(A-waves-blob §"Cross-cutting gestalt"): both lighting AND interaction were tuned to clear
ONE-SIDED FLOOR gates with no upper bound, so "louder" kept passing and the live π (the only
ceiling) never ran. The fix is the **floor→BAND conversion** (the structural antidote both D4
and D5 need) — NOT a magnitude nudge. D7 is a separate clean **library precedence fix** (one
rule: manual > auto until interrupted). Folding all three into ONE wave is correct: they share
the re-authored band gates + the same discharged live π.

**b) The four-step scope is the right shape, no-workaround:**
1. FLOORS → BANDS in `blob-render.spec.ts` (`9 ≤ std ≤ ~14`, `0.012 ≤ shift ≤ ~0.06`) + a
   worst-case-highlight-sub-unity assertion. The structural fix.
2. Lighting DOWN, re-derived against `energyNorm` (not raw weight): `specStrength ≈ 0.12-0.18`,
   `specShininess ≈ 18-22`, iridescence/SSS ≈ half; drop to TWO load-bearing cues (Fresnel rim
   + a whisper); `lit: true` STAYS (identity right, amount wrong); optional pre-OETF clamp.
3. Interaction DOWN: `pointerStrength ≈ 0.15-0.22`, falloff back to `smoothstep(0.45-0.5)`,
   `tanh` squash saturation (bounded), mood-compound decouple so hover doesn't auto-jump
   excited. NO new interaction code — magnitude reconciliation only.
4. `excitedHoldMs` → a first-class `manualOverride` latch (the generalization of the existing
   one-shot, NOT a new mechanism); `setMood(mood, {source})`; `update` early-returns while the
   latch holds; latch folds into `isSettled()`; released on a fresh interaction signal.

**c) Precept-clean.** one-path (no parallel mood path, no flag soup); token-first (rim already
`var(--foreground)`, no new uniform, no hardcoded color); no-overfitting (the latch generalizes
an EXISTING mechanism + makes the SHIPPED `setMood` expose actually work — strikes a
documented-lie, not adds surface; the `autoMood` prop is RATIFY-flagged demo-honest escape, not
speculative); no-backwards-compat (clean break); binding-verification (the clobbered `setMood`
is exactly the "stale binding silently no-ops" class the MEMORY feedback names — the live
mood-DELTA π readback is the sweep it demands).

**d) Disjointness is airtight.** vs W15 (re-opens ONLY W15's lighting/interaction FileBounds,
NOT the geometry/POS_SCALE distance regime — W15's atomic domain); vs W16 (line-disjoint —
W16's `isSettled`/`paused`/`quality` seams vs W46's `source`-latch + magnitude; W46 COMPOSES
the latch INTO W16's `isSettled`, never re-touches the scheduler); vs W08 (band conversion is
ADDITIVE to W08's un-flood floors — coverage/gradient/four-side stay floors); vs W09 (disjoint
subsystem — CSS box-shadow vs WebGL shader; adopts W09's PRINCIPLE not its code). Sequential by
dependsOn (W00→W08→W15→W16→W46), no concurrent collision.

**e) The HardGate IS the cardinal-lesson antidote.** `proof:blob-live-truth` with three arms:
A (floor→band source-parse), B (manual-latch source-parse), C (the fail-CLOSED π readback over
the real device — band render + mood-DELTA persistence). The binding close is the executed live
audit (paired-π BEFORE/AFTER + DELTA), NEVER the headless gate alone. This is the explicit
discharge of the W15/W16 `liveVerifyNeeded` clause.

**Sufficiency verdict: W46 needs NO augmentation as a PLAN.** The one open class is its
ratify-before-impl set (below), which is correctly deferred to the live audit by design.

---

## 4. DEFERRED items that must FOLD INTO this tranche

These are W46's `RATIFY-BEFORE-IMPL` set — they are NOT gaps, they are correctly-deferred
live-audit decisions (the band ceilings are a visual taste knob that MUST be set against the
calm-bead render, not pre-committed). The orchestrator must ratify each at the live audit; none
may be silently dropped:

1. **Band CEILINGS (`domeLumaStd ≤ ~14`, `centroidShift ≤ ~0.06`)** — set LIVE just above the
   calm-bead measured value. The gate is born-RED on the floor→band STRUCTURE; the ceiling
   VALUE is set at the live audit.
2. **Lighting magnitude triple (`specStrength ≈ 0.12-0.18`, `specShininess ≈ 18-22`,
   iridescence/SSS ≈ half)** — tuned LIVE against the warm-cream-bead reference; binding target
   is worst-case highlight sub-unity (never blown-white) + dome-luma-std INSIDE the band.
3. **Manual-latch RELEASE semantics** — which signal releases (click only, pointer-over only,
   or either). Recommendation: either a fresh `clicked` OR `pointerActive` over the live canvas.
   RATIFY whether a bare pointer-over should release (it might steal a deliberately-pinned mood).
4. **`autoMood?: boolean` prop** — ship the escape hatch (the demo-honest seam for a pure
   discrete-control showcase) vs latch-only. Recommendation: latch is the default; add `autoMood`
   only IF the latch-release proves fiddly in the live audit. Complementary, not a substitute.
5. **The listener-host/canvas coordinate co-tune (D5 mechanism B-2)** — `useBlobPointer(wrapperRef)`
   attaches `pointermove` to the wrapper while the field paints over the 160% canvas → a real
   user hovering the visible outer ring gets a premature `pointerleave` snap-home. IN W46's scope
   ONLY IF the live audit shows the outer-ring dead-zone (it is W15's coordinate domain — folds
   most cleanly here); otherwise routed to a geometry follow, NEVER silently dropped.

---

## 5. GAPS / plan divergences

**There are no plan-level gaps in the W46 spec itself** — it is converged. The gaps are at the
EXECUTION + boundary level:

- **GAP-1 (the live-π discharge is the unmet load-bearing obligation).** W15 + W16 both
  recorded a detailed `liveVerifyNeeded` clause (W15: contained-on-all-four-sides + lit dome +
  living membrane + centroid lean + grid legibility + 4-corner matrix, ×3 viewports × light/dark;
  W16: rAF-park-on-pause + idle-throttle + bounded-context + README-currency, ×3 viewports ×
  light/dark). **NEITHER was discharged.** W46's HardGate folds the W15 visual-truth set; but
  W16's pause/quiescence live-truth (the rAF-park observation, the idle-throttle trace) is NOT
  in W46's scope — W46 composes W16's `isSettled` but does not re-run W16's pause/perf π audit.
  **The W16 `liveVerifyNeeded` (pause-freezes, idle-throttles, bounded-context) has NO owner.**
  It must be discharged at the W46 live audit (the blob is on screen) OR explicitly routed —
  currently it is an orphan live-obligation the convergence ledgers do not re-assign.
- **GAP-2 (D6 blob-page consolidation is unresolved cross-wave).** D6 (3-4 blob pages → ONE)
  CONFLICTS with W18's ratified "blob trio STAYS" line. The convergence-1 plan REVERSES W18
  (consolidate to one `substrates/blob` with internal sections); A-waves-blob flags it
  `needs-user-decision`. W46 correctly routes D6 OUT (it touches no IA). But the IA decision is
  STILL unratified at HEAD — a one-line orchestrator decision blocking W18 (not W46).
- **GAP-3 (D8 glass-material is NOT a blob defect but is mis-grouped in the ledger).** D8
  (`/substrates/glass-material` totally broken) is an aurora/glass surface (the Aurora backdrop
  rendering black), routed to W48 (glass-material demo reauthor) + W20/aurora. The defect ledger
  mis-groups it under "blob pages" (D6). Flagged so the blob lane does NOT absorb it — but
  confirm W48 owns it (it does — convergence-1 W48 row).
- **NON-GAP: pass-2 defects + convergence-2.** The pass-2 ledger (`USER-DEFECTS-2026-06-08-pass2.md`)
  and convergence-2 plan add NO new blob asks. Convergence-2's cardinal-lesson re-verify list
  EXPLICITLY names "W15/W16 (blob — D4/D5/D7 → W46)" as suspect-complete-to-re-audit-live — which
  is exactly W46. No blob scope drift in the squircle/glass-first-class/tabs pass.

---

## 6. The re-verify-live FLAG (the binding close criterion)

**FLAG RAISED.** W15 and W16 are marked `complete` in PROGRESS.md but their JSONs both carry an
UNMET `liveVerifyNeeded` clause — the systemic soundness defect A-session-soundness names as
BLOCKER ("'complete' was inflated"). Per the convergence discipline, a wave whose JSON status is
not unconditionally `complete` MUST carry its qualifier. The blob band's live truth is:

- **W15/W16 `complete` is HEADLESS-complete, not LIVE-complete.** The live device never ran.
- **D4/D5/D7 are the live contradictions** their own close protocols mandated checking.
- **W46 IS the discharge.** It re-opens the exact W15 blocks (lighting/interaction magnitudes)
  under band gates + the manual-mood latch, and its close criterion is the executed live π audit
  (the W15 visual-truth set folded in) — NEVER a headless gate.

The blob band does NOT close until W46 lands GREEN on the LIVE real-device render (the calm
warm-cream bead + the gentle hover lean + the persisting mood pills, light/dark, ≥2 viewports)
with the paired-π BEFORE/AFTER + DELTA captured.

---

## 7. Gestalt PATH FORWARD (planning, not code)

The blob band is **one wave (W46) from closure**, plus one orphan-obligation re-assignment and
one cross-wave IA ratify. The path:

1. **Execute W46 as authored — it is converged, no augmentation.** Live re-diagnosis ritual
   first (re-prove the four RED witnesses on the live demo — already source-confirmed in §2,
   re-confirm on the device); author the band gate + mood-delta spec + driver born-RED; re-tune
   lighting DOWN; re-tune interaction DOWN; generalize the manual-mood latch; correct the README;
   close on the LIVE π audit with the paired-π DELTA. dependsOn W00 (π lane) + W08/W15/W16 (the
   settled field) — all landed, so W46 is unblocked.

2. **Ratify the 5 RATIFY-BEFORE-IMPL decisions at the live audit (§4)** — the band ceilings, the
   lighting triple, the latch release semantics, the `autoMood` escape hatch, and the
   coordinate co-tune. These are visual-taste knobs set against the calm-bead render by design,
   not pre-commitments. The orchestrator owns the live MCP pass (chrome-devtools-mcp per the
   standing directive) + the magnitude tuning.

3. **Re-assign or fold the orphan W16 `liveVerifyNeeded` (GAP-1).** The pause/quiescence/idle-
   throttle/bounded-context live-truth has no current owner. Cleanest: discharge it AT the W46
   live audit (the blob is on screen, the pause toggle is reachable) as a folded check, recorded
   in the W46 audit JSON — OR explicitly route to W16-redress. Do NOT let it stay an orphan.

4. **Ratify D6 (blob-page IA) at the orchestrator level (GAP-2)** — a one-line decision blocking
   W18, NOT W46. Either W18's three-row keep stands or W18 amends to one `substrates/blob` with
   internal look/interaction/mood sections. W46 proceeds regardless (it writes no IA).

5. **Confirm D8 is W48's (GAP-3)** — out of the blob lane; ensure the blob lane does not absorb
   the glass-material/aurora-backdrop break.

**Net:** the blob band is in good planning shape. W46 is the single load-bearing wave and it is
correctly specified, disjoint, precept-clean, and gated on live truth. The risk is NOT the plan
— it is execution discipline: W46 MUST close on the executed live π audit (the discharge the
W15/W16 close skipped), or the band re-inflates the exact "complete-on-headless-green" soundness
defect that created D4/D5/D7 in the first place.
