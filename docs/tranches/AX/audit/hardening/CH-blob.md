# CH-blob — adversarial red-team of the blob band (W08 · W15 · W16 · W46)

**Lane:** CH-blob · **HEAD** `89edffc` (3.8.0 published, branch `at-dock-convergence`)
**Verdict:** **DEFERRED-CHRONIC** — W46 is a *sound plan that has not been executed*; W15/W16
carry **PROGRESS↔JSON status inflation** (marked `complete` over explicit unmet
`liveVerifyNeeded` clauses, one of which records a hard LIVE FAILURE); the cardinal-lesson
DELTA discipline the whole tranche hinges on is **un-instituted for blob** (zero captures).

The challenge is NOT "is W46 the right plan" — it largely is. The challenge is: **W46 hides a
deeper chronic, and its own ratify-gaps leave it hand-wavy at the exact points that decide
whether it perfects the blob or just re-passes a re-authored gate.**

---

## CH1 — W46 IS UNEXECUTED. The blob is STILL live-broken at HEAD. (BROKEN, falsifiable)

The single largest finding: **none of W46 exists in the tree.** It is `planned` in PROGRESS
(line 64) and every artefact it names is absent. The blob ships the *exact* over-bright /
over-dramatic / clobbered state the wave was written to fix.

Source-true at HEAD `89edffc`:

| W46 RED witness | Claimed source state | VERIFIED at HEAD | Status |
|---|---|---|---|
| W1 floor→band | `blob-render.spec.ts` floors are one-sided | `:95 DOME_LUMA_STD_MIN=9` + `:104 CENTROID_SHIFT_MIN=0.012`, both bare `toBeGreaterThanOrEqual` (`:463,:509`); **NO ceiling** | RED, unchanged |
| W2 over-bright | `specStrength:0.9 specShininess:32` etc. | `types.ts:272-275` ship `specStrength:0.9 specShininess:32 rimStrength:0.5`; `:262 iridescence:0.18 :265 sssScale:0.2 :267 coreGlow:0.1` | RED, unchanged |
| W3 over-dramatic | `pointerStrength:0.45`, falloff `0.65` | `types.ts:300 pointerStrength:0.45`; `metaball.frag.ts:322 smoothstep(0.65,0.0,…)`; `:206 sa = 1.0 + speed*uStretch` (UNSATURATED) | RED, unchanged |
| W4 mood clobber | `update()` clobbers manual `setMood` every frame | `useBlobMood.ts:154-169` `update` unconditionally `setMood(...)`; `setMood:139` has NO `source` param; `useMetaballRenderer.ts:367-372` calls `update` every unreduced frame | RED, unchanged |

Last blob source commit is `91fc2e0` (W16). `git log --all | grep -iE "W46|blob-live|blob.*truth"`
returns **nothing**. The new files W46 names — `tests-visual/blob-mood-live.spec.ts`,
`scripts/proof-blob-live-truth.mjs`, the `proof:blob-live-truth` package.json entry — are all
**ABSENT** (verified `ls` + `grep package.json`). `proof:blob` entries top out at the W08-era
`proof:blob-render` / `proof:blob-integration`.

**Challenge:** any roll-up that counts W46 as "owned/scoped/in-flight" is inflation. The blob
is a `blocker`-severity live regression (D4/D5/D7) and the fix is 100% unstarted. This is the
*first* thing the hardening pass must surface: the plan is good, **the work is not done.**

---

## CH2 — W15/W16 "complete" is STATUS INFLATION over a documented LIVE FAILURE (DEFERRED-CHRONIC)

This is the chronic the whole AX tranche was formed to kill, recurring *inside its own ledger.*

- **PROGRESS.md:31 marks W15 `complete`.** Its JSON `status` (W15-blob-contained-droplet.json:4)
  reads verbatim: *"REDRESS dev-complete (the orchestrator's live Metal-GPU π-lane **FAILED two
  of three assertions**; re-derived from first principles — headless GREEN…)"*. A wave whose own
  ledger records a **live failure** is marked `complete` in the tracker. That is the exact
  headless-green-over-broken inversion the tranche's status legend (PROGRESS:8-12) forbids.
- **W15's `liveVerifyNeeded` (`:174`) was never discharged.** It demands the π-lane + Playwright
  audit on all THREE blob stories × ≥3 viewports × light/dark, capturing a paired-π BEFORE/AFTER
  DELTA. No such capture exists (CH4).
- **PROGRESS.md:32 marks W16 `complete`; JSON status `:7` = `"GREEN"`** but `:77` carries a full
  unmet `liveVerifyNeeded` (rAF-park observation, idle-throttle trace, README-currency, ≥3
  viewports × light/dark). `:54 selfGateCaveat` openly states the headless gates "DO NOT prove
  the live rAF parks on pause… on a real GPU."

**Slip history of this chronic:** W15 first solve (`9d0ec2f`) headless-GREEN → live FAILED 2/3
→ W15 REDRESS (`d472292`) headless-GREEN, **explicitly "could NOT run a real browser… modeled"**
→ marked complete → user's live pass-1 caught D4/D5/D7 → convergence A-waves-blob re-diagnosed →
W46 minted → **W46 still unexecuted.** Four cycles, each one promising the live audit, none
running it. The W46 plan even names this (its Archaeology §, lines 594-619) — and then *itself*
sits unexecuted, becoming cycle five.

**Challenge:** the "complete" marks on W15/W16 are false at the tranche's own bar. They should
read `live-pending` (the legend exists for exactly this). The blob band is the cleanest extant
proof that the status-inflation chronic is *still live* even after W00 stood up the machinery to
prevent it.

---

## CH3 — W46 is HAND-WAVY at its three load-bearing magnitudes (WEAK — every binding number is "tune LIVE")

W46 is architecturally correct (floor→band, calm re-derivation, manual latch) but it **defers
every value that actually determines the outcome to an un-run live audit**, and the plan never
ran. So the wave's substance is a set of `RATIFY-BEFORE-IMPL` IOUs:

1. **The band CEILINGS are unset (Open Q1).** `domeLumaStd ≤ ~14`, `centroidShift ≤ ~0.06` are
   "audit-modeled" with a `~`. The gate's entire restraint axis is a number nobody has measured.
   If the ceiling is set *above* the current loud render, the band re-passes the broken state —
   the exact failure mode W46 exists to kill. The ceiling is meaningless until the live calm-bead
   render is captured, and that capture is the thing that keeps not happening (CH2/CH4).

2. **The lighting triple is unset (Open Q2).** `specStrength ≈ 0.12–0.18`, `specShininess ≈
   18–22`, irid/sss "≈ half" — all `≈`. The plan's *one* hard, checkable target is "worst-case
   highlight sub-unity (never blown-white)." But it never resolves the actual worst-case pixel:
   `energyNorm = (shininess+2)/8` (`metaball.frag.ts:436`), so at the proposed `specShininess≈20`,
   `energyNorm≈2.75`, and to keep `spec = 1·specStrength·2.75 < 1` you need `specStrength < 0.36`.
   `0.12–0.18` clears it — but the plan never does this arithmetic to *bound* the range; it states
   a guess and says "tune live." A perfected wave would derive `specStrength = sub-unity-target /
   energyNorm(shininess)` as a formula, not a guessed interval.

3. **The squash saturation is UNDER-SPECIFIED and possibly double-clamping (the sharpest gap).**
   W46 proposes `sa = 1.0 + tanh(speed·k)·uStretch` (FileBounds `metaball.frag.ts:206`). But:
   - `k` is **never given** — it's the single constant that sets the elongation ceiling, and it's
     absent from the plan entirely.
   - `speed = length(uVelocity)` (`:201`) where `uVelocity` is "smoothed pointer velocity" set
     **CPU-side** (`:137`). The plan asserts the spring velocity is "UNBOUNDED (O(5–8)/s on a
     flick)" but never inspects whether the CPU smoother already attenuates it. If it does,
     `tanh(speed·k)` is a **second** clamp on an already-clamped signal — the taffy-pull may be a
     CPU-velocity-feed problem, not a shader-saturation problem, and the in-shader tanh is the
     wrong layer. W46 routes "no length/POS_SCALE edit" out of bounds but the velocity FEED is
     neither length nor explicitly in-scope — a **scope seam the plan leaves ambiguous.**

**Challenge:** these are not taste knobs to defer — they are the *physics* of the fix, and two of
three are derivable in closed form *before* a browser. The plan substitutes "RATIFY at the live
audit" for the analysis that should pin the range, then never runs the audit. That is the
hand-wavy core under a rigorous-looking shell.

---

## CH4 — The cardinal-lesson DELTA artefact is UN-INSTITUTED for blob (BROKEN — the discipline itself isn't running)

The tranche's governing precept (MASTER-PLAN:5-6, "every wave closes on a captured LIVE
chrome-devtools-mcp DELTA") is **not in force for the blob.** `find docs/tranches/AX -iname
"*blob*" \( -name "*.png" -o -name "*.jpg" \)` → **zero hits.** `docs/tranches/AX/audit/visual/`
contains **only** `CAPTURE-PROTOCOL.md` — a protocol with no captures. W15's owed BEFORE/AFTER
DELTA (1.46×→0.75× footprint, flat→lit dome), W16's owed pause-freeze + idle-fps trace, and
W46's owed calm-bead DELTA all do not exist.

**Challenge:** W46 names the DELTA as its "binding close criterion" (HardGate §, line 450-453) —
but the tranche has demonstrated four times running that the blob's live capture is the step that
gets deferred. Writing it into W46's HardGate again, with no change to *why* it keeps slipping, is
the definition of a chronic. The hardening action must make the capture a **predecessor** of the
re-tune (capture the broken BEFORE first, as a born-RED artefact), not a successor that competes
with "the gates are green, ship it."

---

## CH5 — The D7 mood-clobber is WORSE than W46 states, and the DEMO is also lying (WEAK — incomplete root-cause)

W46's D7 diagnosis is right but **incomplete in two ways the fix must cover or it half-works:**

1. **The demo never reconciles `activeMood` with the real render.** `blob-mood.vue:29-32`:
   `setMood(m){ activeMood.value = m; blobRef.value?.setMood(m) }` — it sets the *pill highlight*
   optimistically and **never reads back `GooBlob`'s exposed `currentMood`** (which IS exposed,
   `GooBlob.vue:182`). So even after W46 lands the library latch, the demo's pill state is a
   parallel optimistic ref, not bound to truth. If the latch *releases* (a stray hover), the pill
   stays lit while the render walks away — a *new* lie W46's library-only fix does not close. The
   demo should bind the pill to the exposed `currentMood`, not a local optimistic ref. W46 routes
   demo IA to W18/W40 but this is a *correctness* binding, not IA — it falls in a seam.

2. **`setMood`'s own early-return (`:140`) interacts with the clobber.** `setMood` returns early
   when `mood === currentMood.value && !transitioning`. After `update()` clobbers to `idle`,
   `currentMood` IS `idle`; a user re-clicking `idle` no-ops, AND the clobber means the *first*
   manual click to any non-idle mood transitions for ≤16ms then `update` drives it back, leaving
   `currentMood` at `idle` again — so a *second* identical click also fires (good) but the render
   never holds. The latch must arm **before** the early-return path and survive it; W46's
   FileBounds (`:139,154,179`) gestures at this but the early-return guard at `:140` is not called
   out as a touch-point — an easy place for the implementer to leave the guard fighting the latch.

**Challenge:** the mood deltas ARE real (`paramsFor` maps arousal→orbitSpeed 0.4–2.2, wobble
0.5–2.0, pulseFreq 0.15–1.5, iridScale 0.55–1.35 — `useBlobMood.ts:37-63`), so D7 is a *visible*
bug worth fixing, not cosmetic. But W46 as written fixes the library precedence and leaves the
demo's optimistic-pill lie and the `:140` guard interaction unaddressed — the user could click a
pill, see it light, and *still* see no persistent change if either seam is missed.

---

## CH6 — The `autoMood` escape-hatch prop risks an OVERFITTING violation (WEAK — substrate-without-2nd-consumer)

W46 Open Q4 proposes shipping `autoMood?: boolean` (default `true`) as a library prop. The
overfitting precept (MEMORY: every src/ artefact has ≥2 sites or is exported or is a private demo
helper) bites here: the *only* named consumer is "the discrete-control showcase" — i.e. the one
`blob-mood.vue` demo. A library prop with one demo consumer is exactly the speculative-substrate
class the tranche audits for at close. W46 flags it `RATIFY` and "ship the latch as default; add
`autoMood` only IF latch-release proves fiddly" — correct instinct, but the plan should make
explicit that `autoMood` is **born-deferred** unless a 2nd consumer materializes, or it becomes a
W33 overfitting-audit finding.

**Challenge:** the latch (generalizing the existing `excitedHoldMs`) is the non-overfit fix; the
`autoMood` prop is net-new surface for one site. If it ships speculatively it violates the very
audit the tranche runs on itself.

---

## CH7 — The listener-host/canvas coordinate mismatch is a REAL bug parked in a RATIFY (WEAK — deferral risk)

W46 §NOT-in-scope routes the `useBlobPointer(wrapperRef)`-vs-160%-canvas mismatch
(`GooBlob.vue:77`) to "IN scope ONLY if the live audit shows the outer-ring dead-zone" (Open Q5).
But the audit that decides this is the one that keeps not running (CH4). So a genuine geometry bug
— a user hovering the visible outer ring gets a premature `pointerleave` snap-home — is gated
behind a capture that has slipped four times. It will either be silently dropped or absorbed
unratified. The plan's own escape clause ("else routed to a geometry follow, never silently
dropped") is the kind of promise the W15/W16 `liveVerifyNeeded` clauses also made.

---

## Glass-cohesion note (blob vs the MAXIMAL glass-first model)

The blob is a WebGL substrate, not a CSS `.glass-*` surface, so it is correctly out of the W54
glass-first scalar cohort. BUT the blob's in-shader lighting (Blinn-Phong + Fresnel rim + SSS +
core-glow + iridescence = five layers, `metaball.frag.ts:410-465`) is the **N-th divergent glass
model** the keyframes I.W6 finding warns about: the dock/Button specular bloom (19 tracks), the
CSS `--glass-specular-*` cohort (W09), the gold-audacious edge-catch (W52), and the blob's
five-layer membrane are **four independent specular/glass-light implementations** with no shared
restraint principle. W46 correctly adopts W09's *principle* (one load-bearing cue, not five) but
only for the blob, in isolation. The ONE-model gap: there is no shared "specular restraint" token
or doctrine that the CSS cohort, the keyframes bloom, and the WebGL membrane all answer to —
each is re-tuned per-surface, so the blob will drift loud again the next time someone tunes it to
a floor gate, exactly as it did in W15. The cohesion fix is a *cross-substrate* specular-restraint
doctrine (CSS box-shadow + keyframes + WebGL shader), not four independent per-surface tunes.

---

## Chronic ledger (with slip history)

- **PROGRESS↔JSON status inflation** — W15 marked `complete` over a JSON recording a LIVE FAILURE;
  W16 `complete` over an unmet `liveVerifyNeeded`. Recurs across: W09 (PROGRESS:25 "live-pending"
  caught at convergence), W05 (D3 re-open), now W15/W16. **≥3 instances in AX alone.**
- **Deferred live π / un-captured DELTA** — W15 (un-run), W16 (un-run), W46 (plan re-promises,
  un-run). The `visual/` dir has a protocol and zero captures. **The capture has slipped at every
  blob close since 9d0ec2f.**
- **Tuned-to-the-gate, not the eye** — W15 REDRESS drove `pointerStrength` 0.11→0.45 to clear a
  floor by ~9× ("could NOT run a real browser… modeled"). The one-sided floor *rewarded* the
  overshoot. W46 fixes the gate shape but inherits the same "tune live" deferral for the new
  ceiling — so the antidote is itself gated on the step that keeps slipping.

---

## Hardening actions (to PERFECT the blob — planning only)

1. **EXECUTE W46 — it is unstarted.** The plan is sound; dispatch it. This is the gating action;
   everything else amends it.
2. **Re-mark W15/W16 `live-pending` in PROGRESS.md (not `complete`).** Honor the legend the
   tranche defined; the JSONs already record the unmet clause. Stop the inflation at source.
3. **Amend W46 to PIN the derivable magnitudes BEFORE the live audit, not defer all three.**
   Derive `specStrength_max = sub_unity_target / energyNorm(specShininess)` in closed form
   (a formula, not a `~` interval); resolve the worst-case highlight pixel analytically as the
   plan's W2 RED witness *already started to* (it computed 3.83 — finish it for the AFTER state).
   Only the centroid-shift ceiling genuinely needs a live read.
4. **Add a prototype step: inspect the `uVelocity` CPU smoother before committing the tanh.**
   Determine whether the squash velocity is already attenuated CPU-side; if so, fix the feed, not
   the shader (or specify both). Pin `k` in `sa = 1 + tanh(speed·k)·uStretch` to a derived
   elongation ceiling (e.g. solve `k` so `sa ≤ 1.4` at the measured max flick velocity), not a
   magic number. Add the velocity-feed seam to FileBounds explicitly.
5. **Make the DELTA capture a PREDECESSOR, not a successor.** Capture the broken BEFORE (the
   wet-plastic bead, the lurch, the dead pills) as a born-RED artefact in `audit/visual/` at
   wave-open, *before* any re-tune — so the capture can't be the step that's skipped when the gates
   go green. Institute the same for the owed W15/W16 BEFOREs (they're the same render at HEAD).
6. **Extend W46 (or fold into W18/W40 with a correctness carve) to bind the demo pill to the
   exposed `currentMood`,** not a local optimistic ref — close the demo-side lie the library latch
   doesn't reach. Call out the `setMood:140` early-return guard as a latch touch-point.
7. **Born-defer `autoMood` per the overfitting precept** — ship the latch only; gate `autoMood`
   on a real 2nd consumer or route it to the W33 overfitting audit.
8. **Mint a cross-substrate specular-restraint doctrine** (the glass-cohesion fix) so the CSS
   `--glass-specular-*` cohort, the keyframes I.W6 bloom, the gold edge-catch, and the WebGL
   membrane answer to ONE "load-bearing-cue-only" principle — so the blob cannot drift loud again
   on the next per-surface tune. This is the W54/glass-first cohesion hook, not a blob-local fix.
9. **Pull the coordinate mismatch (CH7) OUT of the RATIFY-gated-on-an-un-run-audit limbo** — it's
   a deterministic geometry bug (listener on wrapper, paint over 160% canvas); fix it in W46
   unconditionally or give it an owned geometry-follow wave id now, not a conditional.
