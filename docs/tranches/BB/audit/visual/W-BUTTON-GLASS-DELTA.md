# BB.W-BUTTON-GLASS — DELTA (the lit glass button: more glass AND more legible at once, springs alive under the press, the gleam tracks)

**Wave**: BB.W-BUTTON-GLASS (Batch P, LIQUID-GLASS band) · **Branch**: tranche/BB · **Date**: 2026-06-17
**HEAD sha (capture-against ground)**: `58c1d080` (the dead-gleam / non-tinted-lit-fill / flat-press ground)
**Dev-box**: the local real-GPU/CDP host (the π is LOCAL-ONLY — the bright-bucket darken + the `contrast-color()` flip + the refraction need a real Chromium GPU; the AY W-LIVE1 split, backstopped on CI by `proof:live-verified-ledger`). The binding live capture rides **W-REFLECT3** (Batch 7).
**Gate**: `proof:button-glass` born-RED (12 violations @ HEAD) → GREEN. No-regress (device-free, re-run after the glass-up): `proof:glass-cohesion` ✓, `proof:glass-cal` ✓, `proof:glass-level` ✓.

## §0 RE-GROUND — drift at HEAD (recorded, NEVER re-diagnosed)

The wave starts from the A2 buttons-glass audit lane (a register minting every iOS-27 token but composing almost none on the lit surface). Every §0 cite re-grepped at HEAD `58c1d080`. **The mechanisms HELD as recorded; the THREE named dependencies DRIFTED — they did NOT land** (BB inv-3 re-located, never re-invented):

| cite (spec) | HEAD reality | note |
|---|---|---|
| `button/index.ts` glass arms `hover:bg-(--glass-bg-resting) active:bg-(--glass-bg-floating)` | EXACT — `default`/`glass`/`primary-audacious` paint the RAW rung tokens on hover/active | the (a) trap confirmed live |
| `glass.css:139-140` raw srgb rungs; `:147` `--glass-bg-dock` oklab-tinted | the rungs are at `glass.css:137-141`; `--glass-bg-dock` oklab at `:147` | EXACT shape — the raw-rung-vs-element-oklab-wrapper ladder confirmed |
| `ladder.css:69` element-level oklab the REST bg composes | `.glass-resting` composes `color-mix(in oklab, var(--glass-bg-resting), var(--glass-tint-source) var(--glass-tint-strength))`; `.glass-wash` in the `:where()` content-tier floor set (`ladder.css:240`) | EXACT — the rest bg DOES compose the seam; the trap is the hover/active swap |
| `Button.vue` (42 lines) — no pointermove, no press composable | EXACT — bound nothing, composed nothing | the (b)/(c) dead-primitives confirmed |
| `useSpringPress.ts` (response 0.25, ζ 0.7) UNUSED | EXACT — zero in-library binary consumer | the shipped-but-dead primitive confirmed |
| `useLiquidFlex.ts` on `/motion-core` + root | EXACT — exported, ≥2 consumers (tabs + dock morph) | confirmed |
| **`useSpecularPointer.ts` (W-LENSING leaf this wave CONSUMES)** | **ABSENT — the file does NOT exist** | **DRIFT: W-LENSING did NOT land** |
| **`.glass-lens` / `--press-t` axis (W-LENSING)** | **ABSENT — no `.glass-lens` class, no `--press-t` token anywhere** | **DRIFT: the W-LENSING axis names did NOT land** |
| **the W-LIQUIDHOVER tier-root specular AUTO-ARM** (`material.css`) | **ABSENT — `material.css:89-90` still requires the consumer's pointer write (the `var(--mouse-x, 50%)` centred floor)** | **DRIFT: W-LIQUIDHOVER did NOT land** |
| `useSpecularTracking` (the AX.W09 specular leaf) | LIVE — the ONE position-write seam, consumed by `Card.vue:110` + `DockIconButton.vue:53` | **the re-located leaf** (the §0 "if any cite has drifted, re-locate the mechanism") |
| `.glass-refract` (the AW.W23 `#glass-refract` SVG-filter axis, `glass-refract.css`) | LIVE — `@supports (backdrop-filter: url(#…))`-gated, the un-gated `.glass-refract`-over-blur base | **the re-located refraction axis** |
| `surfaces.css:182` `.btn-glass` bare `backdrop-filter: var(--glass-blur-btn)` | EXACT — the flattest wash rung, no rim, no under-shadow | the (d) flat-shadow confirmed |
| `property-regs.css:151-162` the specular cohort (`-rest 0`/`-hover 0.1`/`-active 0.16` + `.dark`) | EXACT | the (d) hover-bump target confirmed |

### The drift ruling (recorded, the documented branch taken)

The spec was written assuming W-LENSING (`useSpecularPointer` + `.glass-lens`/`--press-t`) and W-LIQUIDHOVER (the tier-root auto-arm) had landed FIRST in the band. At HEAD **none had landed**. The spec's §0 + §Dependencies + §Triumvirate explicitly cover this: *"If W-LENSING has not landed, the `.2` consume blocks... the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the seam"* and *"the §Dependencies coordination point decides whether `Button.vue` calls `useSpecularPointer` explicitly OR inherits the tier-root auto-arm"*. The documented branch was taken:

- **(c) the gleam** consumes `useSpecularTracking` — the ONE position-write leaf that ACTUALLY exists at HEAD (the AX.W09 DRY seam Card + DockIconButton already consume). Calling it explicitly is the documented "auto-arm-not-landed" branch — ONE source, never a button-local fork. When W-LIQUIDHOVER lands its tier-root auto-arm later, the explicit consume reconciles onto it (W-LIQUIDHOVER's job), it does not double-write at HEAD.
- **(e) the refraction** consumes `.glass-refract` — the ONE refraction axis that ACTUALLY exists at HEAD (the AW.W23 `#glass-refract` SVG filter). The `:liquid` prop adds the class; the `:active` lens read is the CHEAP coupled press squish + the gleam lift on the `--glass-btn-press-t` drive (NOT a per-frame `feDisplacementMap` re-rasterize — the one-refractive-element budget). NEVER a button-local lens fork.

The calm-CTA fence is BINDING + HELD (read-only confirm): zero `✦`/`btn-audacious`/sparkle-sweep/ripple/disco-grain at HEAD, zero after the glass-up. The GL-shader fence HELD (the refraction is the SVG filter — zero `aurora.frag`/`metaball.frag` edit). The warm-cream identity HELD.

## The five mechanism fixes (token-first, COMPOSE-don't-author)

### (a) BTN-TINT-TRAP — the hover/active fills reach the element-level oklab tint (B1)

The glass-variant arms (`default`/`glass`/`primary-audacious`) re-point off the RAW `bg-(--glass-bg-resting)`/`-floating` rung tokens onto a NEW element-level oklab-tinted pair minted in `surfaces.css`:

```css
.btn-glass {
    --glass-bg-resting-tinted:  color-mix(in oklab, var(--glass-bg-resting),  var(--glass-tint-source) var(--glass-tint-strength));
    --glass-bg-floating-tinted: color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength));
}
```

This is the EXACT seam `ladder.css:69` composes for the rest bg + `--glass-bg-dock:147` for the dock — ZERO new compositing axis, the literal darken-over-light recipe reached at the lit fill. ZERO-delta at the `--glass-tint-strength: 0%`/floor default; under the declared/sampled bright bucket the lit fill darkens to AA in lockstep with the rest bg. The `:root` raw `--glass-bg-*` tokens are UNTOUCHED (other surfaces compose them at the element correctly — DO-NOT-TOUCH honored). The π half (clause a) is the binding floor — the lit button stays AA over the synthetic-white plate with the declared bucket.

### (b) BTN-PRESS-DEAD — the squishy interruptible press (B2)

`Button.vue` composes `useSpringPress` (response 0.25, ζ 0.7, ~5% overshoot — the iOS tap-press canonical, PRM-safe) driving a `useLiquidFlex` volume-preserving X/Y reciprocal squish (`squishLaw: "linear"`, `maxStretch: 1.04` — the LOW cap, never a taffy-pull). This is **`useSpringPress`'s FIRST binary consumer** — the visual-load-bearing activation the audit names (the primitive is no longer dead). The squish is fed via a `watch(press.value, t => squish.squish(t))` (the side-effect site — NOT inside a computed getter, which would mutate `useLiquidFlex`'s travel ref during render). The reciprocal X/Y deform: `scale: (shrink·stretch) (shrink/stretch)` where `shrink = 1 − t·0.03` (agreeing with the CSS `--scale-press-btn` 0.97 floor's magnitude). The inline `scale` is emitted ONLY while pressed (`t > 0.001`) so the CVA `hover:scale-*` utilities win unimpeded at rest — the single-source press (the §Triumvirate single-source, no desync, no double-apply). **The CSS `.tap-squish active:scale-(--scale-press-btn)` floor is RETAINED** as the no-JS / SSR / pre-hydration press. PRM-safe: `useSpringPress`'s spring snaps to the endpoint under reduce (the press functions, the squish physics off).

**The clock**: the press rides `useSpringPress`'s JS spring physics (response 0.25 — the iOS tap-press register, FASTER than the `--spring-snappy-duration` 0.34s CSS clock so the press feedback stays under the 100ms perception threshold, the spec's own §B2 rationale). The CSS `.tap-squish` floor is the snappy-clock path; the JS enhancement is the purpose-built press spring. The press DRIVE is the typed `--glass-btn-press-t` `@property` (0..1, registered in `property-regs.css`) — the ONE drive the squish + the coupled specular + the lens read all consume.

### (c) BTN-GLEAM-DEAD — the gleam consumes the ONE shared leaf (B3)

`Button.vue` consumes `useSpecularTracking()` (the re-located leaf) + binds `@pointermove="onPointerMove"`. The leaf writes `--mouse-x`/`--mouse-y` on the host; the `.glass-wash::before` recipe (`material.css:66`) maps it to the typed `--specular-*` channel and slides the gleam toward the pointer — the dead-centre `50%` static fallback fixed. NO button-local `--mouse-x/--mouse-y` write (the DRY single-source). PRM-aware (the leaf does not write under reduce). The π half (clause c) reads `--mouse-x` off the centred 50% on a pointermove.

### (d) BTN-SHADOW-FLAT — the button depth + the hover-specular bump (B1/B4)

`.btn-glass` gains a `--glass-btn-*` depth stack (the `--glass-edge-light` rim + the `quiet`/`resting`-tier `--glass-under-shadow-*` drop, deepening one rung on hover) so the glass button reads as a lifted lozenge, off the flattest wash rung. ALL already-minted tokens — a consumer retints the button depth from ONE override, no new compositing axis. The button-scoped `--glass-specular-intensity-hover` re-points to `--glass-specular-btn-hover` (0.10 → 0.14 light / 0.11 dark) — ONLY the button lifts; the global cohort is UNTOUCHED.

### (e) BTN-REFRACT-OPTIN — the refraction-edge opt-in CONSUMING `.glass-refract` (B4)

A `<Button :liquid>` adds the EXISTING `.glass-refract` class. On a supporting engine (`@supports (backdrop-filter: url(#…))`, `glass-refract.css`) the button reads the iOS-26 edge-bend over its blur base; off-Chromium it degrades cleanly to the un-gated `.btn-glass` blur+tint base (the no-workaround floor). The `:active` LENS-SWELL is the CHEAP coupled read (the press squish + the gleam lift on the `--glass-btn-press-t` drive), NOT a per-frame displacement-map re-rasterize (the §Triumvirate mechanical-fall pre-empt — the one-refractive-element-per-route budget). NEVER a button-local lens fork (no `feDisplacementMap` in the button bounds). The wave enrolls a STORY witness button at `/display/buttons` (not a blanket enrollment).

## The π readback (clause 6 — the BINDING visual truth, both modes)

| clause | the proof | the binding read |
|---|---|---|
| (a) AA-OVER-BRIGHT | the hovered/active glass button over a synthetic-white plate + the declared `--glass-backdrop: light` bucket | the composited ink/fill contrast clears the AA floor — the "both at once" (glass up, legibility up) |
| (b) PRESS SQUISH | a pointerdown frame-series (down → squish-peak → settle) | the `scale` is a reciprocal X≠Y deform + `--glass-btn-press-t` lifts off 0 (the coupled beat) within the press envelope |
| (c) GLEAM TRACKS | a pointermove off-centre | `--mouse-x` moves off the centred 50% (the gleam slides toward the pointer) |
| (d) REFRACT DEGRADE | a `:liquid` button on a non-supporting engine emulation | the button paints the clean `--glass-blur-btn` blur base (≥7px), no broken `url()` ref |
| (e) CALM-CTA | `/display/buttons` | 0 `✦` sparkle glyphs, 0 `btn-audacious` elements (the fence held through the glass-up) |

`tests-visual/button-glass.spec.ts` is the enrolled π (the `pi-runner-manifest.mjs` non-private glob picks it up automatically — no hand-list). LOCAL-ONLY (`:5199` demo, real-GPU/CDP); grace-SKIPs on a clean CI runner.

## The `proof:ba-gestalt` glass/CTA verdict (clause 7 — the GESTALT BAR)

The button band (the glass CTA register + its hover/press/over-bright behaviour) is one of the named acceptance surfaces. The whole-page gestalt question — *"does the glass button read as iOS-27 liquid glass — more glassy AND more legible at once, springs alive under the press, the gleam tracks — as a page?"* — is judged at **W-REFLECT3** (Batch 7, the single authorized verdict-flipper) on a fresh capture, BOTH modes, over the real backdrop. Per-mechanism B1-B5 greens do NOT close this visual wave alone; this DELTA records the source + π floor, and the gestalt verdict re-earns its PASS at the reflection wave.

## Visual-load-bearing close

- **`useSpringPress`** — was exported-but-DEAD (no binary consumer). This wave makes `Button.vue` its **consumer #1** (the primitive is no longer dead). The ≥2-consumer bar is BOOKED to **W-PRESS-UNIFY** (Batch P1 — the family-wide wire across cards+dock+list-rows). The honest interim: 1 binary consumer; do NOT demote the primitive.
- **`useLiquidFlex`** — already ≥2 (tabs indicator + dock orientation morph); this REINFORCES (consumer #3).
- **`useSpecularTracking`** — already ≥2 (Card + DockIconButton); this REINFORCES (consumer #3).
- **`.glass-refract`** — was a `.glass-material.glass-refract` garnish; the button is now a named opt-in consumer.

## Named successors (booked)

- **W-BUTTON-LUMINANCE** (A2 finding 6) — if the declarative bright-bucket cannot self-darken the STANDALONE glass button (the consumer must declare the ancestor bucket), promote `useGlassBackdropLuminance` to its 2nd binary consumer (the glass button family) so a glass CTA self-darkens-to-AA over a MEASURED-bright backdrop (automatic, not consumer-wired). This wave ships the declarative-bucket floor.
- **W-BUTTON-TONE** (A2 finding 7) — re-point destructive/accent onto W-FEEDBACK-TONE's colored-glass recipe (a destructive button reads as red GLASS, not a red slab), `solid` the named opaque escape. This wave fixed the GLASS register only.
- **The W-LENSING reconcile** — when W-LENSING lands its `useSpecularPointer` + `.glass-lens`/`--press-t` axis, the button's `useSpecularTracking` consume + `.glass-refract` opt-in reconcile onto W-LENSING's names (W-LENSING's job — the band sequences the leaf-mint before its consumers; at HEAD the leaf was absent, so the button consumed the existing AX.W09/AW.W23 axes, the documented branch).
