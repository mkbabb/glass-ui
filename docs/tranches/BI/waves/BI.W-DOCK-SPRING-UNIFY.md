# BI.W-DOCK-SPRING-UNIFY — the ~10-site SpringProgress reconcile + the G8 iOS retune + M1 application

Band B3 (dock greenfield). Design: D-DOCK PASS-1 §2.2 (one engine, one scalar; the spring retune G8),
DOCK-LADDER §2/§7-C7/§8 (the measured iOS morph spring), SUFFUSION-MAP D1/D2 + R1, FAM-18 (M1 parity).
Lands ON the W-DOCK-SPINE `useDockSpring` + `--dock-t`.

## §Mandate

Discharges: the ~10-site `new SpringProgress` reconcile onto the ONE `useDockSpring` engine (README mandates
one; disk has 5 dock `new SpringProgress`); the **G8 `DOCK_SPRING` retune** 0.68/ζ0.64 → the measured-iOS
band ~0.28±0.04 / ζ0.82±0.06 (SUFFUSION-MAP D1; DOCK-LADDER §7-C7 — the shipped tune is ~2.3× slower with
~6× the overshoot of the reference it cited); the scalar zoo → one plate scalar (SUFFUSION-MAP D2). Registry:
FAM-18 (M1 the CSS-vs-JS ~5× time-base parity break) — the M1 SOURCE fix is a motion-band wave; this wave
APPLIES it wherever the dock reads a CSS `--spring-*` token.

## §Design

**One engine (PASS-1 §2.2 — `proof:no-dual-path` single-engine floor).** `useDockSpring` (the sole
`new SpringProgress` site, `useDockSpring.ts:95`) owns EVERY dock scalar. The extra `new SpringProgress`
sites DELETE: `useLayerTransition.ts:287` (dies with the crossfade fold, W-DOCK-CROSSFADE),
`useDockOrientationMorph.ts:279` (dies with the V↔H goo retire, W-DOCK-RETIRES), `useDockItemDrag.ts:106`
(dies with the drag retire, W-DOCK-FOLD), plus the fission spring path (dies with fission, W-DOCK-RETIRES).
This wave is the RECONCILE contract — it asserts the single engine after the sibling retires land.

**The scalar zoo dies (SUFFUSION-MAP D2).** `--dock-expand-t`, `--dock-size-scale`, the dock `--stretch`,
`--dock-punch-stretch` (`shape.css:53`), and the per-child inverse counter-scale rules (`shape.css:168-249`,
the 7-factor `scale:` product) → the ONE plate-scoped `--dock-t` (W-DOCK-SPINE). Zero second timelines; CDP
Layout-flat by construction (the morph is a compositor clip-path, not a per-frame `inline-size` lerp).

**The G8 retune (DOCK-LADDER §2/§8 — the measured number, USER-GATED A/B).** Measured iOS-27 dock morph:
response 0.25–0.32s, ζ 0.80–0.90, overshoot 1.1–1.4%, 90%-travel 117–133ms, full settle ≤~420ms — three
independent measurements (LSQ fit + overshoot→ζ cross-check + the WWDC control band + the eyeglass corpus)
converge on ONE band. The shipped `DOCK_SPRING` (via `springPreset("dock")`, response 0.68/ζ0.64, +7.3%)
is 2.3× slower with ~6× the overshoot of the reference it cited (C7). **This REVERSES a BG-decided register,
so the paired A/B capture is the user-confirmation instrument** — the reference side is now a NUMBER, not a
vibe. NOTE the box-morph overshoot ceiling: BOTH iOS legs carry ~1.1–1.4% overshoot — the collapse leg is
bidirectional-symmetric and is NOT a zero-overshoot exit (motion-canon P2's "exit never overshoots" binds
*disappearing* surfaces, not this box morph). **Weight lives in deformation, not the clock** (DOCK-LADDER
§8): the liquid-weight edict is served by the goo/deformation channel + the 150–200ms overshoot-recovery
tail over a brisk ~0.3s spring — slowing the spring to fake weight contradicts the reference. The
arrival-settle cut in `dockMorphContext.ts` (which exists to hide the ζ0.64 ~1s ring) retires WITH the
retune (fix ζ OR keep the cut, never both). Interruptible velocity-carry (the `SpringProgress` re-seat) is
non-negotiable.

**M1 application (FAM-18 — round-3 CONFIRMED + root-caused glass-ui-local).** The JS `--dock-t` clip-path
morph is M1-IMMUNE (SpringProgress writes a raw number). But the dock's CSS legs (content fade, hover, press)
read CSS `--spring-*` tokens carrying the ~5× `linear()`-vs-JS parity break. The M1 SOURCE fix
(`regen-spring-tokens.mjs` — pass `maxDuration = settle` into `springLinearStops`, LANDED-and-green in the
motion-band worktree, 428.59ms → 0.36ms) is a motion-band wave; this wave's obligation is to VERIFY the
dock's CSS legs paint on the corrected clock after that fix lands (the A/B feel comparison must run on ONE
clock, not two).

## §Work

- `composables/useDockSpring.ts` — the sole `new SpringProgress` (KEEP); extend to own every dock scalar
  (the crossfade `--dock-t`, the fission/orientation scalars retire with their features).
- Delete the extra `new SpringProgress`: `useLayerTransition.ts:287` (W-DOCK-CROSSFADE), `useDockOrientation
  Morph.ts:279` (W-DOCK-RETIRES), `useDockItemDrag.ts:106` (W-DOCK-FOLD), the fission spring (W-DOCK-RETIRES).
  This wave asserts the single-engine floor after they land.
- `src/styles/dock/shape.css` (21K) — DELETE `@property --dock-punch-stretch` (:53), the 7-factor `scale:`
  product (:168-176), the per-child inverse counter-scale (:235-249). `--dock-expand-t`/`--dock-size-scale`/
  dock `--stretch` DEFINITION-ABSENT (the chrome reads `--dock-t`).
- `src/composables/motion/springPresets.ts:98` — set the `dock` row to THE §0.2a-RESOLVED value (the
  recommended iOS band ~0.28/ζ0.82 IF the user confirms; the shipped 0.68/ζ0.64 with the honest-tail
  treatment IF the user vetoes — `DOCK_SPRING`/`constants.ts:85-87` re-resolves through it either way).
  Delete the `dockMorphContext.ts` arrival-settle cut UNCONDITIONALLY (the mechanism decision; whatever
  the value, the settle is honest physics).
- `dockMorphContext.ts` — the `--dock-t` clip morph on the retuned `useDockSpring`; interruptible re-seat
  preserved.
- Verify the dock CSS legs (content fade/hover/press `--spring-*` reads) paint on the M1-corrected clock.

## §Acceptance

Gate: **`proof:dock-single-engine`** (NEW, born-RED at HEAD — 5 dock `new SpringProgress` sites live;
`--dock-punch-stretch` + the 7-factor scale product live; `DOCK_SPRING` = 0.68/0.64) + `proof:no-dual-path`
extended.
- SU1 **one-spring-engine** (BORN-RED): exactly ONE `new SpringProgress` in the dock module (`useDockSpring`);
  the 4 extra sites DEFINITION-ABSENT → GREEN after the sibling retires.
- SU2 **scalar-zoo-absent** (BORN-RED): `--dock-punch-stretch`, `--dock-expand-t`, `--dock-size-scale`, dock
  `--stretch`, the 7-factor `scale:` product, the per-child counter-scale all DEFINITION-ABSENT; the ONE
  `--dock-t` plate scalar is the sole morph driver.
- SU3 **MECHANISM-ONLY** (BORN-RED on the arrival-cut, which is live at HEAD): the `dockMorphContext`
  arrival-cut is ABSENT and the `dock` preset row AGREES with the emitted CSS tokens (the M1 parity
  invariant). NO value-range predicate — the (response, ζ) numbers are user-settable per PLAN §0.2a.
- SU4 **M1-clock**: the dock's CSS `--spring-*` legs read the M1-corrected emission (the tempo-parity clause
  the motion-band M1 wave adds is GREEN); no dock leg carries the pre-fix ~5× compressed curve.
- Self-test bites: a synthetic second `new SpringProgress` REDs SU1; a synthetic re-added scalar REDs SU2; a synthetic re-added
- self-test bites: a planted second `new SpringProgress` in the dock band REDs SU3; a planted
  arrival-cut timer REDs SU3; a planted preset↔CSS-token (response, ζ) disagreement REDs SU3.
  (NO value-row bite — any (response, ζ) the user selects is legal.)

## §π/DELTA

- **The G8 A/B (the user-confirmation instrument — reverses a BG register).** Paired capture: the shipped
  0.68/ζ0.64 vs the measured 0.28/ζ0.82 on the W-DOCK-SPINE morph — settle-time trace + interrupted-retarget
  trace + a feel capture, both modes, Chrome + Safari. The decision is USER-GATED.
- **CDP Layout-flat** through the morph (zero second timeline; the compositor clip-path, no per-frame
  `inline-size`).
- DELTA: `docs/tranches/BI/audit/visual/W-DOCK-SPRING-UNIFY-DELTA.md`. Rides W-DOCK-DEVICE (visible-Metal
  interrupt) + the `proof:ba-gestalt` dock verdict.

## §Obligations

- **USER JUDGMENT — the G8 A/B decides the retune** (reverses a BG-decided register; the reference side is
  the measured DOCK-LADDER §2 number, not a vibe). The recommended value is 0.28/ζ0.82; the paired capture is
  the instrument.
- **Upstream dependency: the motion-band M1 fix** (`regen-spring-tokens.mjs` parity, `proof:spring-tokens-
  synced` tempo-parity clause). This wave's SU4 is GREEN only after that lands — sequence AFTER the motion M1
  wave.
- Visible-Safari.app Metal interrupted-retarget trace → W-DOCK-DEVICE.

## §Dispositions

- **T1 dock morph** (BD IOS27-REFERENCE "DOCK_SPRING matches the feel") → TERMINALIZED: BI-OWNED calibration —
- self-test bites: a planted second `new SpringProgress` in the dock band REDs SU3; a planted
  arrival-cut timer REDs SU3; a planted preset↔CSS-token (response, ζ) disagreement REDs SU3.
  (NO value-row bite — any (response, ζ) the user selects is legal.)
  band (0.28±0.04, 0.82±0.06) is the G8 target. Decided-terminal (the A/B is the user-confirmation, not a
  re-open).


## Closure-read correction (the SU3 veto-foreclosure fix — the BLUR-MUTE pattern)
SU3 is RE-SCOPED to gate the MECHANISM, never the value: (i) ONE spring engine (the ~10-site
SpringProgress reconcile — a second `new SpringProgress` in the dock band reds); (ii) the
arrival-cut hack ABSENT (the settle is honest physics, whatever the preset); (iii) the scalar zoo
ABSENT. The dock (response, ζ) VALUE is USER-SETTABLE per PLAN §0.2a — SU3 asserts only that the
preset row and the CSS tokens agree (the M1 parity invariant), not the numbers. THE VETO COST,
recorded honestly: keeping the weighty 0.68/ζ0.64 arm requires a CLEAN long-settle treatment
(the ~1s tail accepted as-is, or the two-edge lead/trail release absorbing it) because the
arrival-cut hack that previously hid the ζ0.64 ring is deleted by (ii) unconditionally — the A/B
capture pair presents BOTH arms post-M1 with this cost named. §Dispositions T1 is re-labeled: the
MECHANISM decision is terminal; the VALUE rides §0.2a.
