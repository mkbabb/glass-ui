# Pass-E COMPONENT deep-audit — `dock/cta-receive`

**Page:** `demo/stories/dock/cta-receive.vue` (import path label: `@mkbabb/glass-ui/dock`)
**Real component(s) demoed:**
- `src/composables/motion/useDockCtaReceive.ts` (the morph engine — BB.B2 W-DOCKMORPH-CTA)
- `src/styles/dock/cta-seat.css` (the landing-seat partial — BC.W-AX-DOCK-CTA-SEAT)
- consumes `GlassDock` + `DockIconButton` (`src/components/custom/dock/`) as the destination control
- composes `@mkbabb/keyframes.js` `ElementMorph` + `springTimingFunction`, sampled off `springPresets.ts` `SPRING_PRESETS`

This is a **motion-seam composable**, not a paint component — it animates an external CTA element ONTO a dock control's rect and arms a reserved seat. It owns ZERO of its own glass surface (the CTA and the dock control are the glass; the seam moves the CTA into the dock's glass). That framing governs the verdicts: the glass-six-layer / procedural-viz axes are non-applicable to the seam itself (they bind the `DockIconButton`/`GlassDock` it lands into), and the binding axes are MOTION, PERFORMANCE, SAFARI, IDIOMATIC.

---

## (1) ANIMATION — HIGH affordance? motion-canon adherence?

**Strong, and idiomatic.** This is one of the better-motivated motion seams in the library:

- **Three coupled channels on ONE spring clock** (motion-canon P3 fade-coupled-to-transform): `transform: translate()+scale()` (SPATIAL — the fly+reshape, spring overshoot at arrival per P1), `opacity 1→0` (EFFECTS — the absorb-fade), `filter: blur(0)→blur(--cta-receive-blur)` (the iOS light-bending congest, on the CTA's OWN pixels via `filter` not `backdrop-filter` — correct, never clobbers a resting plate blur). All three read the SAME `eased` sample — exemplary P3.
- **Spring physics, not bezier** (P1): the curve is `springTimingFunction({response, dampingFraction})` sampled from `SPRING_PRESETS` (`snappy`/`bouncy`), the SAME table `--spring-*` CSS tokens regen from. No hand `(response, ζ)`. This is the no-second-authority discipline done right.
- **PRM-seats deterministically** (P6): snaps CTA to `opacity 0` + hands off in one synchronous step, zero transform/blur frames — opacity is not a vestibular trigger, translate/scale/blur are; the gesture still completes. Correct.
- **The seat partial** carries its own FLIP reveal (`transition: opacity` on `--ease-out` no-overshoot — a content swap must not overshoot, P2) and a PRM `transition: none` arm. The reserve is a STATIC `min-*-size` (frame-0, never animated) — no box-jump, no CLS. Clean.

**Finding A1 (MINOR, dead/inconsistent affordance):** the morph drives a custom rAF loop sampling `easing.fn(t)` against `durationMs = response * 4 * 1000`, **byte-for-byte identical to `useLiquidReveal`'s loop** (same `durationMs` formula, same `startTs`/`step`/`Math.min(1,…)` shape, same three-channel write). `ElementMorph` ALSO accepts a `timingFunction` option (`{ transformOrigin, timingFunction }`) and could play the spring natively. Two leaves now hand-roll the identical rAF spring driver beside the substrate that already does it — a latent **dual-path** (the W-PRUNE-CONSOLIDATE `proof:no-dual-path` class). Not a bug; an extract-opportunity (a shared `playElementMorph(el, from, to, {easing, durationMs, onFrame, onSettle})` driver both `useLiquidReveal` and `useDockCtaReceive` call).

**Finding A2 (MINOR, four-state on the destination):** the demo lands the CTA on a `DockIconButton`, which carries the full four-state contract + `v-specular` gleam + `active` register. The seam itself does not light the control's "received" state with any spring — `onReceived` just flips a consumer ref + the seat does a plain opacity FLIP. The land is correct but the *arrival celebration* on the dock control is flat (no specular pulse / scale-pop on receive). The DESIGN.md spring-physics bar would want a small `--spring-press`/bouncy receive-pulse on the seated control as the CTA lands — currently absent.

## (2) PROCEDURAL VIZ
**Non-applicable to the seam.** The page renders over `DockStage`'s ONE shared offscreen-paused `<Aurora>` field (one-GL-per-route honored). The aurora adherence is audited under its own PROCEDURAL-SUITE page-deep; this seam adds no GL context. ✓

## (3) PERFORMANCE
**Compositor-only ✓.** Writes ONLY `transform`/`opacity`/`filter` + a static `min-*-size` reserve — never width/height/top/left/padding/font-size (the A'-3 lesson; `proof:no-layout-animation` holds). Two `getBoundingClientRect()` reads at `receive()` time (CTA + target) — a one-shot measure at gesture start, NOT per-frame, so no layout-thrash. rAF is self-cancelling (`cancelRaf` + `onScopeDispose`). No offscreen-pause needed (one-shot, not a continuous loop). **Finding P1 (NIT):** the loop is unbounded by `IntersectionObserver` — if the CTA scrolls offscreen mid-flight the rAF keeps running, but the flight is sub-second so this is immaterial.

## (4) SAFARI
**Compatible ✓.** `transform`/`opacity`/`filter: blur()` are universally supported; `getBoundingClientRect`, `matchMedia('(prefers-reduced-motion)')`, `requestAnimationFrame` all Safari-safe. `min-inline-size`/`min-block-size` logical props are baseline. No `@property`, no `contrast-color()`, no `backdrop-filter: url()` lensing in this seam — nothing on the Safari risk-list. The seat partial uses plain `transition: opacity` — safe.

## (5) IDIOMATIC / no-legacy
**Largely idiomatic.** No reka-binding no-op risk, no workaround, no demo-local re-fork (the demo composes the shipped leaf). The byte-fence on `dockMorphContext`/`DOCK_SPRING` is respected (this is a CONSUMING seam beside W-DOCK-MORPH-FAMILY). The ONE transpose-for-elegance: **A1's shared-driver extract** — `useLiquidReveal` and `useDockCtaReceive` are the bloom/inverse-bloom pair and should share ONE rAF-spring driver, not two copies. Also the `durationMs = response*4*1000` magic re-derivation appears in BOTH (it mirrors kf's `maxDuration` default) — the shared driver would home it once.

## (6) Glass six-layer composite
**Delegated, correctly.** The seam paints no glass; the destination `DockIconButton` carries the six-layer composite (backdrop blur+saturate, surface tint, edge rim, `::before` catch-light, drop shadow, grain) via the dock material/glass tiers, and the CTA `Button` carries its own. The seam's `filter: blur` congest is the CTA dissolving INTO the dock's glass — semantically the "glass-cannot-sample-glass" rule is untouched (it's the CTA's own pixels blurring, not a glass-over-glass sample). ✓

---

## Mapping to the BD tranche

| Finding | Disposition | Wave |
|---|---|---|
| A1 — `useLiquidReveal`/`useDockCtaReceive` share an identical hand-rolled rAF-spring driver (latent dual-path; `durationMs` magic re-derived twice) | **AUGMENT** — add a shared `playElementMorph` driver both leaves call; book under the component-canon sweep | `BD.W-BC-COMPONENT-CANON` (component-idiom canon; or a new `BD.W-MOTION-DRIVER-EXTRACT` if the canon wave is full) |
| A2 — flat arrival on the seated control (no receive-pulse spring on the dock control as the CTA lands) | **MODIFY** — add a small bouncy/`--spring-press` receive-pulse (scale-pop + specular flash) on `[data-cta-pending]` clear, on the iOS spring | `BD.W-BUTTON-GLASS-IOS-NOTE` (iOS interactive register) or fold into `BD.W-BLOB-MOTION-TUNE`'s motion-tune sweep scope |
| P1 — rAF unbounded by IntersectionObserver mid-flight (immaterial, sub-second) | **PRUNE** (no action) — one-shot flight, not worth the gate | — |
| Roster presence | **KEEP** — `dock-cta-seat` already a `proof:ba-gestalt` roster surface (CHALLENGE-6/7) | `BD.W-GESTALT-ROSTER-GROW` (already enrolled) |
| Demo page (import label / bigger card / per-section glassy cards / aurora bg) | **MODIFY** — page-level, NOT this component; the demo already uses `DockStage` aurora + `@mkbabb/glass-ui/dock`; standardize the inline `../../../src/...` import to the published subpath label in the demo | page-deep demo sweep (`BD.W-PAGE-HEADER-FOLD` / demo-import canon) |

**Net:** the component is healthy — strong motion affordance, clean compositor/PRM/Safari profile, idiomatic substrate reuse. The ONE real architectural item is the A1 shared-driver extract (eliminates the latent dual-path the SOTA fewer-sharper-primitives bar wants); A2 is a polish-up of the arrival celebration. No PRUNE of live code, no Safari risk, no glass-composite gap.
