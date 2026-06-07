# AW.W2 - Dock motion unification (one clock, one velocity)

## State

**Name**: W2 - Dock motion unification
**Opens after**: AW.W1 (the collapse morph must paint before lockstep can be measured on it)
**Agents**: 1 serial
**Hard gate**: `proof:dock-animation-live` asserts opacity re-seats from its live value (not 0%) through a mid-flight retarget on a CRITICALLY-DAMPED opacity companion (monotone, no overshoot), the width/opacity arrival delta holds `<= 16.7ms` (one frame) on the interrupted swap, and `proof:spring-tokens-synced` proves `DOCK_SPRING` and the `--spring-dock` token moved together to the retuned control curve.
**Status**: planned

## Goal criterion

This wave succeeds if the dock's size, opacity, and rail indicator settle as ONE
interruptible motion — when a swap is retargeted mid-flight the opacity carries
its current value forward with its companion solver's velocity instead of
restarting its CSS `linear()` ramp from 0%, and the retuned `--spring-dock`
response + damping sit in the iOS control band (response 0.30–0.35, ζ 0.7–0.8) so
a hover-triggered dock reads instant and settled rather than lush or playful. The
structural fix is to drive pane opacity from a `SpringProgress` clock SLAVED to
the size morph's progress but CRITICALLY DAMPED (no overshoot on the fade — the
size may overshoot the box, the opacity must not), retiring the parallel CSS
opacity `transition` for the JS-driven path.

## Scope

1. Drive pane opacity from the size morph's clock, but NOT off the overshoot
   size-spring's pixel curve. The naive fold — `p = (w - fromSize) / (toSize -
   fromSize)` off the `(0.5, 0.5)` overshoot spring — hard-couples the fade to the
   size OVERSHOOT, so the opacity clamps-then-pops (a flicker) exactly when the box
   springs past its target: the anti-pattern the digest's own Lane 8 G1 / Lane 6
   §B name (opacity must be critically damped; the M3 spatial-vs-effects split puts
   size on a spatial/overshoot spring and effects/opacity on a damped curve).
   Instead, allocate a SECOND `SpringProgress` for opacity — a CRITICALLY-DAMPED
   companion (ζ ≈ 1.0, target `0→1`) co-`play()`d from the same gesture origin so
   it shares the morph's start/interrupt timing but settles MONOTONE without
   overshoot. One gesture, two solvers (an overshoot size spring + a damped opacity
   spring), retiring the independent CSS `opacity var(--dock-motion-resize)`
   transition on `.dock-layer-item-host` for the JS path. Lockstep by shared
   gesture origin + the same `--spring-dock` response, NOT by sharing the overshoot
   curve (Lane 1 α, Lane 2 β, Lane 3 α; Lane 8 G1 no-flicker rule).
2. Velocity-carry the opacity through a retarget. The size morph already re-seats
   from `(value, velocity)` on an interrupted swap (`useLayerTransition.ts:243`,
   the `live` detection; the re-seat lands at `:316-317` `activeSpring.target =
   toSize`); allocate the opacity companion the SAME retarget treatment — on an
   interrupt, re-seat the damped opacity solver from its current `(value,
   velocity)` rather than snap the fade back to 0% (the residual lag tell — Lane 1
   finding 1, Lane 2 (a)).
3. Keep the CSS `opacity var(--dock-motion-resize)` rule on `.dock-layer{,-item-host}`
   ONLY as the reduced-motion / no-JS / View-Transitions fallback. One opacity
   owner per path: the spring on the FLIP path, the VT group on the native path,
   the CSS transition under PRM — never two authorities on one path (the AV.W9.1
   one-owner-per-concern invariant).
4. Retune `DOCK_SPRING` from `{response: 0.5, dampingFraction: 0.5}` (~+18.5%
   overshoot — the "playful, slightly much for a system dock" register the digest
   Lane 3 F3 names) toward the digest's iOS-control guidance: `response` in
   `0.30–0.35`, `dampingFraction` in `0.7–0.8` (the digest's `bounce 0.12-0.18,
   ζ≈0.7-0.8` damping advice — ≈5–8% overshoot, settled not bouncy). The prior W2
   draft picked the digest's RESPONSE advice but the OPPOSITE damping (ζ 0.5–0.55,
   MORE overshoot) — corrected here to the digest's damping guidance so the dock
   reads more iOS-control, not more playful. DRY check: a `0.30–0.35 / 0.7–0.8`
   dock lands NEAR the existing `snappy` preset (`response 0.35, ζ 0.65`,
   `regen-spring-tokens.mjs:38-40`) but is not identical (snappy is less damped);
   if the landed pair rounds onto `snappy`'s curve, ALIAS the `dock` token to
   `--spring-snappy` (drop the duplicate PRESETS row) rather than ship a twin
   register — and `DOCK_SPRING` consumes the same `(response, ζ)` (DRY). Per the
   regen contract this MUST co-edit BOTH `DOCK_SPRING` (`useLayerTransition.ts:19`)
   AND the `dock` PRESETS row (`scripts/regen-spring-tokens.mjs`) and re-run `node
   scripts/regen-spring-tokens.mjs` so `--spring-dock` in `tokens.css` re-emits —
   or the JS driver and the CSS token drift (Lane 1 γ, Lane 3 β).
5. Unify the travelling rail `TabsIndicator` onto the SAME retuned `--spring-dock`
   curve the layer morph uses, so selecting a rail tab moves the indicator and
   crossfades the pane on one motion vocabulary (the indicator already rides
   `--dock-motion-resize` at `dock.css:835` — verify it inherits the retuned
   token and does not carry a stale hardcoded easing; Lane 1 δ, Lane 3 η).

## Triumvirate Dispatch

A triumvirate is mandatory when:

- the file bounds expand beyond the listed five paths — in particular if driving
  opacity from the spring forces a change to the visibility/hit-test 3-state fork
  (`dock.css:486`, the load-bearing a11y-006 bite-anchor), which is a separate
  owner and must be re-planned, not folded in;
- `proof:dock-animation-live` shows the opacity re-seat introduces an
  inter-frame opacity discontinuity on a clean (non-interrupted) expand (a
  regression of the AU.W2 lockstep the retune must preserve);
- the third iteration of choosing the retuned `(response, ζ)` pair cannot land the
  digest's settled band (ζ 0.7–0.8, ≈5–8% overshoot) while keeping arrival under
  one frame — escalate rather than fall back to the high-overshoot ζ 0.5 "playful"
  register the digest rejects for a system dock.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify |
| `src/styles/dock.css` | modify |
| `scripts/regen-spring-tokens.mjs` | modify |
| `src/styles/tokens.css` | modify (generated `--spring-*` block only — via the regen) |
| `scripts/proof-dock-animation-live.mjs` | modify |
| `scripts/proof-spring-tokens-synced.mjs` | modify (extend the drift-only check with the response/overshoot BAND assert — see Hard Gate 2; this file is NOT in the prior draft's bounds but the band-assert lands here) |

Do NOT touch: `GlassDock.vue` (W1's surface — the size-morph regression is closed
there before W2 opens), `DockLayerGroup.vue`, the dock visibility 3-state fork
markers in `dock.css` (`AU.W8b-visibility-fork`), `view-transition.css` (the VT
group recipe stays the native-path opacity owner — W3 touches the typed-VT half).

## Disjointness

Single agent unit. W2 SEQUENCES after W1 (both touch `useLayerTransition.ts`); they
never run in parallel. `tokens.css` is written only through the regenerator
(`proof:spring-tokens-synced` enforces the committed block equals the generator
output), never hand-edited.

## Agent Units

### AW.W2.a One-clock opacity + velocity-carry + control retune

- Goal: opacity rides a critically-damped companion slaved to the size morph's
  gesture, the retuned response + damping sit in the iOS control band, and the
  rail indicator shares the curve.
- Mechanism: allocate a second `SpringProgress` for opacity (ζ ≈ 1.0, target
  `0→1`, the critically-damped companion) co-`play()`d from the SAME gesture
  origin as the size spring; write `host.style.opacity` for the active/leaving
  panes from its monotone progress (NOT off the overshoot size curve, which would
  pop the fade). On a retarget re-seat BOTH solvers from their current `(value,
  velocity)` so the derived opacity continues from its live value. Demote the CSS
  `opacity var(--dock-motion-resize)` rule to a `@supports`/PRM fallback owner.
  Retune `DOCK_SPRING` + the `dock` PRESETS row to `response 0.30–0.35 / ζ
  0.7–0.8` (ALIAS to `--spring-snappy` if the pair rounds onto it — DRY) and
  re-run the generator. Confirm the `TabsIndicator` rule (`dock.css:835`) names the
  retuned `--dock-motion-resize` (= `--spring-dock`) and carries no stale literal
  easing.
- Files: `useLayerTransition.ts`, `dock.css`, `regen-spring-tokens.mjs`,
  `tokens.css` (via regen), `proof-dock-animation-live.mjs`,
  `proof-spring-tokens-synced.mjs`
- Sub-gate: `npm run proof:dock-animation-live` reports the opacity timeline
  re-seats from a non-zero value on the retarget probe (no snap-to-0%) AND is
  MONOTONE (no overshoot frame above 1.0 or dip-then-rise), the interrupted-swap
  width/opacity arrival delta `<= 16.7ms`, and `proof:spring-tokens-synced` is
  GREEN with the retuned curve inside the asserted band.

## Hard Gate

1. `npm run proof:dock-animation-live` — extend the retarget probe to also sample
   active-layer OPACITY across the interruption and assert: (a) on the re-toggle
   the first post-interrupt opacity frame is within the companion's natural
   per-frame stride of the pre-interrupt value (NOT a jump to ~0); (b) the opacity
   series is MONOTONE — no frame exceeds 1.0 and no overshoot-then-correct dip
   (the critically-damped companion must not pop); (c) width/opacity arrival
   co-occur within one frame (16.7ms) on the interrupted swap. The 3.3.0 build
   (CSS `linear()` opacity) would show an opacity snap-to-0% on the retarget —
   capture that as the born-RED witness, GREEN after. (Harness-gated SKIP like W1;
   the born-RED + GREEN opacity series are captured in the Playwright env.)
2. `npm run proof:spring-tokens-synced` — the committed `--spring-*` block equals
   the generator output (the drift check it already enforces); EXTENDED here with a
   BAND assert: `DOCK_SPRING` and the `dock` PRESETS row carry the SAME retuned
   `(response, ζ)`, `response` is in `[0.30, 0.35]`, `dampingFraction` is in
   `[0.70, 0.80]`, and the derived overshoot (the closed-form `exp(-ζπ/√(1-ζ²))`)
   is in `[0.05, 0.10]` (the settled iOS-control band, NOT the prior draft's
   `[0.15, 0.20]` playful band). The band-assert lands in
   `scripts/proof-spring-tokens-synced.mjs` (now in File Bounds), which today only
   checks committed-equals-generator drift. If the dock pair aliases onto
   `--spring-snappy`, the assert verifies the alias (no separate `dock` row) rather
   than a band on a duplicated row.
3. `npm run proof:dock-opacity-lockstep` GREEN — the CSS fallback rules still name
   `--dock-motion-resize` (the PRM/VT path's one-token lockstep is intact).
4. `npm run proof:dock-motion-parity` GREEN — VT and FLIP still share one timing
   source.
5. `npm run typecheck` clean; `npm run build` green (the regen leaves `tokens.css`
   committed-equal to the generator).

## Format And Lint Cadence

`node scripts/regen-spring-tokens.mjs` is run (not skipped) after the PRESETS
edit, and `proof:spring-tokens-synced` confirms no drift before close.
`npm run typecheck` after the composable edit. Prettier over the `.mjs` files.
`git diff --check` for whitespace. The five proof gates run before close.

## Verification Artefacts

- `docs/tranches/AW/audit/W2-motion-unify.json` — the gate artefact (captured in
  the Playwright env): the born-RED 3.3.0 opacity-snap-on-retarget timeline + the
  GREEN monotone-re-seat timeline; the retuned `(response, ζ)` + derived overshoot
  inside the `[0.05, 0.10]` band (or the `--spring-snappy` alias decision).
- The `git diff` of the `--spring-*` block in `tokens.css` (the retuned dock row).
- The retarget opacity series (pre/post interrupt) proving velocity-carry.

## Commit Plan

- `feat(dock): drive pane opacity from a critically-damped companion spring` — the
  `useLayerTransition.ts` + `dock.css` fold (body: the two-clock desync, the
  CSS-`linear()`-restarts-from-0%-on-retarget root cause, WHY opacity rides a
  damped companion not the overshoot size curve — the Lane 8 G1 no-flicker rule —
  the one-owner-per-path preservation).
- `feat(dock): retune --spring-dock to the iOS control band (response 0.3–0.35, ζ 0.7–0.8)` —
  the `regen-spring-tokens.mjs` PRESETS edit + the regenerated `tokens.css` block
  (body: the digest damping guidance, the dual-write contract, the settled
  `[0.05, 0.10]` overshoot band, the `--spring-snappy` alias decision if it rounds on).
- `test(dock): retarget opacity velocity-carry + overshoot-band assertions` — the
  gate extension.
- `docs(AW): W2 close — motion-unify artefact + status`.

## Dependencies

- **Depends on**: AW.W1 (the collapse morph must paint — opacity-on-the-driver is
  meaningless on a frozen box).
- **Blocks**: AW.W3 (the typed-VT directional intent + hover-scale unification
  layer onto the unified one-clock motion this wave establishes); slides H.W1.

## Archaeology

- AU.W2 moved the layer fade off `--dock-motion-fast` (0.2s) onto
  `--dock-motion-resize` so fade + morph share a duration token — narrowing the
  reported 100ms desync (`proof:dock-opacity-lockstep` records the original bug).
  But a shared TOKEN is not a shared CLOCK: the size rides a live JS ODE, the
  opacity rides a baked 48-stop `linear()` over a fixed duration, so on an
  interruption the size re-seats with velocity while the opacity ramp restarts
  from 0% (Lane 1 finding 1, Lane 2 (a)).
- AV.W9.2 added velocity-continuity to the SIZE spring's retarget; the opacity was
  left on its independent CSS clock. W2 extends the AV.W9.2 contract to the second
  tweened axis.
- New guardrail: `proof:dock-animation-live` samples opacity ACROSS the retarget
  (not only width) AND asserts it MONOTONE (the critically-damped companion must
  not pop) — the prior probe asserted size velocity-continuity but never witnessed
  the opacity snap, so the residual lag shipped green.
- Corrected from the prior W2 draft: that draft drove opacity off the overshoot
  size curve (`p = (w-fromSize)/(toSize-fromSize)`) and retuned the dock to ζ
  0.5–0.55 (~15–20% overshoot). Both are the digest's own named anti-patterns —
  opacity-on-overshoot flickers (Lane 8 G1 / Lane 6 §B), and ζ 0.5 is the
  "playful, too much for a system dock" register (Lane 3 F3). This wave drives
  opacity off a critically-damped companion and retunes to the digest's settled ζ
  0.7–0.8, aliasing onto `--spring-snappy` if the pair rounds on (DRY).
