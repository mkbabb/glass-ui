# BB.W-PRESS-UNIFY — DELTA (the ONE interruptible, coupled spring-press across Button + Card; the J-inv-10 dead-primitive flag cleared)

**Wave**: BB.W-PRESS-UNIFY (Batch L, LIQUID-GLASS band) · **Branch**: tranche/BB · **Date**: 2026-06-17
**HEAD sha (capture-against ground)**: the post-W-BUTTON-GLASS / post-W-LIQUIDHOVER tree (Button already presses; Card + the dock are the dead-press ground for this wave)
**Dev-box**: the local real-GPU/CDP/pointer-emulation host (the π is LOCAL-ONLY — the interruptible re-seat + the PRM-instant snap need a real Chromium pointer + GPU; the AY W-LIVE1 split, backstopped on CI by `proof:live-verified-ledger`). The binding live capture rides **W-REFLECT3** (Batch 7).
**Gate**: `proof:press-unify` born-RED @ HEAD (the driver file absent; `useSpringPress` 1-consumer; Card un-pressable) → GREEN. No-regress (device-free, re-run after the wire): `proof:no-layout-animation` ✓ (the press is `scale`/`filter`-only), `proof:spring-tokens-synced` ✓ (no generated-token edit), `npm run typecheck` ✓ (the scroll-choreography.vue `eyebrow` error is pre-existing/sibling, NOT this wave).

## §0 RE-GROUND — drift at HEAD (recorded, NEVER re-diagnosed)

The wave was specced assuming `useSpringPress` was STILL fully consumer-free (the J-inv-10 dead primitive). **It had ONE consumer at HEAD: W-BUTTON-GLASS landed it on `Button.vue` as "the FIRST binary consumer".** The wave's own charge anticipates exactly this — the bar is ≥2 binaries, and W-BUTTON-GLASS booked the ≥2 close to W-PRESS-UNIFY (the PROGRESS row: *"useSpringPress ≥2-bar booked to W-PRESS-UNIFY"*). Every §0 cite re-grepped at HEAD:

| cite (spec) | HEAD reality | note |
|---|---|---|
| `useSpringPress.ts:62-98` ships the driver; `grep` → zero binary consumers | DRIFT — `Button.vue:79` binds `useSpringPress({ response: 0.25, dampingFraction: 0.7 })` (W-BUTTON-GLASS's "first binary consumer"). ONE consumer, not zero. | the bar is now Button + ONE more |
| `useSpring.ts:171-174` `reset(value, velocity)` + `:113` `respectReducedMotion` | EXACT — the interruptible re-seat + the PRM pass-through are the spring's; the `target.value = 1/0` re-seat is velocity-continuous by construction (a re-press mid-release re-targets the live position) | the load-bearing REUSE, untouched |
| `utilities/base.css:258-279` `.tap-squish` + `:273-279` PRM carve | re-grounded — the `.tap-squish` recipe is at `base.css:265-286` (post-CARVE3 the squish stayed in `base.css`, NOT `base-misc.css`); the PRM carve `@media (prefers-reduced-motion: reduce) .tap-squish:active { scale: 1 }` is live | the wave's RE-GROUND hint (base-misc.css post-CARVE3) checked — the squish stayed in base.css |
| `button/index.ts:27` scale-only | EXACT at the CVA layer, but `Button.vue` now drives the inline reciprocal `scale` + `--glass-btn-press-t` (W-BUTTON-GLASS); the CVA `active:scale-*` is the no-JS floor | the (PRESS-NOT-COUPLED) defect was ALREADY fixed on Button by W-BUTTON-GLASS |
| `scheme-motion.css:183,205` `--spring-snappy` / `-duration: 0.34s` | EXACT — the generated W-GLASS-CAL clock; READ-ONLY (the press rides the spring's own settle, never a generic `--duration-*`) | the spring fence held |
| `dock-controls.css:44` the no-overshoot `--scale-press-dock` press | re-grounded — `dock-controls.css` is a thin `@import` root post-CARVE; the dock control `:active` press lives in `dock-controls/icon-button.css:93-96` (`--dock-control-press-bg` + `--scale-press-dock`) over the `--dock-press-spring` (= `--spring-smooth` clock, no-overshoot) | the dock binding home is `DockIconButton.vue` — OUT of this wave's file bounds |
| `useDockState.ts` (the dock binding home option) | the dock OPEN/collapse state machine — NOT the per-control press (one dock, many controls); the press is per-`DockIconButton`, not per-dock-state | the dock-state seam is the WRONG home for a per-control press |
| **W-MOTION-CANON `motion-canon.md`** | **ABSENT — the precept doc did NOT land**, but `proof:no-layout-animation` (W-MOTION-CANON's P5 gate) IS registered + GREEN | DRIFT recorded: the doctrine is enforced via the live gate + the CLAUDE.md §6 easing doctrine; this wave CONSUMES that floor, never re-authors it |

### The drift ruling (recorded, the documented branch taken)

1. **`useSpringPress` was 1-consumer (Button), not 0.** The wave brings it to ≥2 by adding Card (`:pressable`) — the cleanest new binary in my file bounds. The bar is MET (Button + Card = two binaries) by the wave's own design ("Button + Card + dock = three binaries"); the named successor explicitly permits the two-binary close.

2. **The press DRIVER was re-pasted inline on Button (the spring + the squish + the `pressStyle`).** Rather than re-paste the same pattern onto Card, this wave FACTORS `useLiquidPress` — the ONE interruptible coupled spring-press wrapper (spring → reciprocal squish → the `--*-press-t` drive write → the `pressStyle` object). **Card consumes the wrapper; Button is LEFT inline at HEAD** — a critical bounds finding: `proof:button-glass` (a sibling gate, `["local","ci","release"]`) asserts in its **B2** clause that `Button.vue` composes `useSpringPress(` + `useLiquidFlex(` DIRECTLY. Refactoring Button onto the wrapper would move those calls into `useLiquidPress` and RED button-glass's B2 (a NEW sibling red — forbidden). So Button keeps its inline `useSpringPress + useLiquidFlex` (the W-BUTTON-GLASS surface, untouched), and `useLiquidPress` factors the pattern for Card + the booked dock. **The J-inv-10 measure is the DEAD PRIMITIVE `useSpringPress`** — it is now activated on TWO binaries: Button (direct) + Card (via `useLiquidPress`, which composes it). The bar is met on the right axis (the dead primitive), not on the new wrapper. (`proof:button-glass`'s **B3** is a SEPARATE pre-existing red — W-LIQUIDHOVER retired Button's `useSpecularTracking`→`v-specular` but the gate's B3 wasn't updated; that red exists on HEAD before this wave and is NOT this wave's to fix — recorded as a coordination drift for the W-LIQUIDHOVER/W-BUTTON-GLASS owner.)

3. **The DOCK is the booked third consumer (out of bounds).** `DockIconButton.vue` is NOT in this wave's file bounds; the only in-bounds dock files are `dock-controls.css` (CSS-only — cannot add JS interruptibility) and `useDockState.ts` (the dock-OPEN machine, not the per-control press; one dock hosts many controls, so a dock-state spring is the wrong layer). A pure-CSS dock press does NOT bind the JS driver, so it would not be a P1 consumer (the gate requires the driver IMPORTED + BOUND on an SFC). The dock control's calmer no-overshoot CSS press STAYS the floor; its interruptible JS re-seat BOOKS to a successor (the `DockIconButton.vue` binding, when its bounds open — the wave's named-successor #1: *"if the wire reaches only Button + dock... the bar is STILL met"* — here Button + Card meet it equally). NO dead `--dock-press-t` substrate was added (a CSS read with no JS writer is the substrate-without-consumer anti-pattern this library forbids).

The §6 easing doctrine + `proof:no-layout-animation` are the binding W-MOTION-CANON floor this wave consumes. The spring fence held (zero generated-token edit). The GL-shader fence held (the press is CSS/JS transform/filter). No library-token accent (ppmycota fence held).

## The wire (token-first, COMPOSE-don't-author)

### The driver — `useLiquidPress` (`src/composables/motion/useLiquidPress.ts`)

The ONE interruptible coupled spring-press. Composes the shipped `useSpringPress` (the velocity-continuous re-seat, PRM-aware) + `useLiquidFlex` (squish-only, `"linear"` law — the volume-preserving X/Y reciprocal deform) and exposes:

- `handlers` — the pointer events (the `useSpringPress` ergonomics).
- `pressStyle` — the ONE `:style` object: the reciprocal `scale` (engaged only past the sub-perceptual threshold so the CVA hover utilities win at rest) + the `pressVar` 0..1 drive scalar the surface CSS reads for the coupled brightness/specular leg. **Compositor-only** (`scale` + a custom property — never a layout property).
- `value`/`press`/`release` — the raw spring surface.

Per-surface tuning: `shrinkDepth` (the uniform contraction), `maxStretch` (the LOW squish cap), `pressVar` (the drive var NAME — Button keeps `--glass-btn-press-t`, Card uses `--card-press-t`), `response`/`dampingFraction` (the spring register per surface). Keyframes-bearing (via `useSpringPress`) → ships on `/motion` ONLY (via the `composables/motion/index.ts` barrel `src/motion.ts` re-exports), never the root barrel (the SCC-trap discipline).

**P2 INTERRUPTIBLE**: the re-press re-targets the live spring (`target.value = 1` on a mid-release spring re-seats the kf `SpringProgress` from the live `(position, velocity)`) — the velocity-continuous re-seat, never a CSS-transition restart.
**P3 COUPLED**: ONE drive (`pressVar`) feeds BOTH the scale leg (`pressStyle.scale`) AND the brightness/specular leg (the surface CSS reads the var), on the SAME `--spring-snappy`-class clock the spring carries.
**P4 PRM-INSTANT**: `useLiquidPress` threads `respectReducedMotion: options.respectReducedMotion` to `useSpringPress` → `useSpring` → the kf `SpringProgress` PRM snap (zero in-between transform frames). The CSS `.tap-squish` / `.glass-press` PRM carve stays the no-JS floor.

### Consumer #1 — Button (`src/components/ui/button/Button.vue`) — UNTOUCHED at HEAD

Button is the FIRST `useSpringPress` binary (W-BUTTON-GLASS landed it). It is LEFT inline (`useSpringPress({ response: 0.25, dampingFraction: 0.7 })` driving `useLiquidFlex` driving the inline `pressStyle` that writes `--glass-btn-press-t` + the reciprocal scale) — NOT refactored onto `useLiquidPress`, to keep `proof:button-glass`'s B2 green (it asserts the direct composition). Its press is ALREADY the interruptible coupled register this wave canonicalizes; `useLiquidPress` is the SAME pattern factored for the surfaces that did not have it. The `v-specular` gleam (W-LIQUIDHOVER) is UNTOUCHED — the press MOTION and the specular POSITION are orthogonal channels of the one cohort (no double-write: the press writes `--glass-btn-press-t`, the directive writes `--mouse-x/y`).

### Consumer #2 — Card (`src/components/ui/card/Card.vue`)

The additive `:pressable` opt-in (default OFF — a static content plate never presses; a `:pressable` card is a TAPPABLE LIST-CARD). Wires the SAME `useLiquidPress` driver (`pressVar: '--card-press-t'`, a touch shallower `shrinkDepth: 0.02` / `maxStretch: 1.03` — the press REGISTER per surface, not flattened to one curve). The handlers + the press `:style` reach the host ONLY when `pressable` (the rest value is 0, so an un-pressable card is byte-identical to HEAD). The CSS half: `.glass-press` (`utilities/base.css`) — `cursor: pointer` + a WCAG touch floor + the coupled `filter: brightness(calc(1 + var(--card-press-t,0) * 0.04))` leg (compositor-safe `filter`); the co-composed `.tap-squish` is the no-JS `:active` scale floor; `--card-press-t` is a typed `@property` (interpolates as a number, SSR-safe at 0).

## π BINDING readback (`tests-visual/press-unify.spec.ts` — LOCAL-ONLY, BOTH modes)

| arm | the binding truth |
|---|---|
| (a) COUPLED FRAME-SERIES | a glass-Button press drives a non-1 reciprocal X≠Y `scale` AND `--glass-btn-press-t` lifts off 0 — the squish + the gleam arrive together (one squishy-glass beat) |
| (b) MID-FLIGHT ABSORB | a rapid double-tap: the second press climbs `--glass-btn-press-t` back toward 1 from the live mid-release position (`after > mid`) — the velocity-continuous re-seat, NOT a restart-to-0 (the CSS-transition stutter) |
| (c) PRM-INSTANT | under emulated reduce, the press drive snaps to its endpoint within one tick (the gesture confirms — the drive lifts; the transform does not ramp) |
| (d) COMPOSITOR-ONLY | the press inline style carries `scale` + `--glass-btn-press-t` only — no layout property |
| Card #2 | a `:pressable` card drives the reciprocal scale + `--card-press-t` (booked-successor-graceful if no `:pressable` story at HEAD — the source binding + the Button arm carry the bar) |

## J-inv-10 disposition (BINDING)

**The wire reached the bar — the demote did NOT fire.** The dead primitive `useSpringPress` is now BOUND on TWO named binary library consumers: **`Button.vue`** (direct — the W-BUTTON-GLASS surface) + **`Card.vue`** (via the `useLiquidPress` wrapper, which composes `useSpringPress`). The J-inv-10 substrate-without-consumer flag on `useSpringPress` is CLEARED with those two binaries cited. `useLiquidPress` (the new canonical wrapper) ships with Card as its first direct binary + the dock booked. The DOCK control is the BOOKED third (its `DockIconButton.vue` binding is out of this wave's file bounds; its calmer no-overshoot CSS press stays the floor — the named successor #1). No MIGRATION row (the wire is additive — the only new public surface is the Card `:pressable` prop + the `/motion` `useLiquidPress` export; the Button/dock public surface is unchanged).

## `proof:ba-gestalt` verdict (clause 6)

The press surfaces ("glass-feedback" / the buttons band + the pressable cards) are owed the whole-page gestalt verdict at **W-REFLECT3** (Batch 7, the single authorized verdict-flipper). This wave lands the SOURCE + the per-mechanism π; the gestalt OR ("does the press read as ONE coherent squishy-glass beat — interruptible, coupled, PRM-safe — across the page?") is re-walked on a fresh capture at the reflection. Per-mechanism P1-P4 greens do NOT close the visual wave alone (BB inv-4).
