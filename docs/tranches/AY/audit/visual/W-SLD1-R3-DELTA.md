# W-SLD1-R3 — the slider FINAL form (thumb INVISIBLE) — DELTA

**Wave:** AY.W-SLD1-R3 · **Status:** live-verified · **Verdict:** PASS.

The third+final slider refinement (USER-AUDIT-2026-06-10 §B3 + §B14, BINDING — the user's
judgment overrides gate-green). The standard slider is now ONE continuous glass segment with
**NO VISIBLE THUMB AT ALL** — you pull the TRACK itself; the spectrum thumb is THINNER per the
value.js color-picker reference. Route: `/forms/slider`. Viewports: **390×844 (REAL mobile)** +
1440×900. Schemes: {light, dark}. Device: Chrome-headless (`--disable-gpu`), DPR 2, via
`scripts/wf-sld1-r3-capture.mjs`.

---

## B3 — standard slider: NO VISIBLE THUMB AT ALL (you pull the TRACK itself)

The cylinder correction (AX.W59 → AY) kept a VISIBLE integrated knob (a 50%-circle ball
inscribed in the capsule). The user's binding bar: thumb-INVISIBLE. The standard slider is now
ONE continuous glass cylinder — the filled `.slider-range` glass material is pulled along the
thick capsule track and its rounded **leading edge IS the handle**; the only affordance is the
fill edge + the cursor/touch response. The reka `<SliderThumb>` STAYS MOUNTED (a11y / keyboard /
drag / value-follow all native on it) but paints INVISIBLE — `width: 0; opacity: 0;
background: transparent` — so there is NO distinct disc/cap/ring over the cylinder.

Keyboard focus rings the **TRACK** (the W-PRIM-POLISH `--focus-ring-shadow` register on the
visible surface the user pulls), not the invisible thumb (`:focus-within .slider-track`).
Hover/held lift the track FILL's edge rim; the iOS press spring gives the whole fill a felt
squish (there is no knob to shrink).

**Measured π readback (the binding truth — all four mode/viewport combos identical):**

| readback | value |
|---|---|
| standard `.slider-thumb` width | **`0px`** (no horizontal footprint) |
| standard `.slider-thumb` opacity | **`0`** (renders nothing) |
| standard `.slider-thumb` background | `rgba(0, 0, 0, 0)` (transparent) |
| standard `.slider-thumb` border-radius | `0px` (no round-knob paint) |
| focused `.slider-track` box-shadow (light) | `srgb 0.11 0.098 0.09 / 0.3` 0 0 0 2px, `… / 0.15` 0 0 8px — the `--focus-ring-shadow` on the TRACK |
| focused `.slider-track` box-shadow (dark) | `srgb 0.73 0.718 0.67 / 0.3` … (inverted warm-ink ring) |

The visible-knob regression is impossible to reintroduce silently: `proof:slider-two-only`
clause 3 was RESTATED (the third+final restatement) — it now asserts THUMB-INVISIBLE (base
`width: 0` AND `opacity: 0`, no base `border-radius: 50%`) + FOCUS-ON-TRACK
(`:focus-within .slider-track` resolves `box-shadow: var(--focus-ring-shadow)`) + the range
`backdrop-filter`. A nonzero base width or a base 50% radius REDS.

**Captures:**
- `W-SLD1-R3-standard-rest-desktop-light.png`, `W-SLD1-R3-standard-rest-desktop-dark.png`, `W-SLD1-R3-standard-rest-mobile-light.png`, `W-SLD1-R3-standard-rest-mobile-dark.png` — the continuous fill, no thumb.
- `W-SLD1-R3-standard-drag-desktop-light.png`, `W-SLD1-R3-standard-drag-desktop-dark.png`, `W-SLD1-R3-standard-drag-mobile-light.png`, `W-SLD1-R3-standard-drag-mobile-dark.png` — mid-drag, the fill edge pulled.
- `W-SLD1-R3-standard-focus-desktop-light.png`, `W-SLD1-R3-standard-focus-desktop-dark.png`, `W-SLD1-R3-standard-focus-mobile-light.png`, `W-SLD1-R3-standard-focus-mobile-dark.png` — the focus ring on the TRACK.

---

## B14 — spectrum slider: the thumb THINNER (the value.js color-picker register)

The spectrum (gradient-track color slider) thumb is the VISIBLE color-picker handle (it IS the
grab). The user's bar: a bit THINNER, like value.js's `ComponentSliders.vue` (`w-3` ≈ 0.5× its
`h-6` track). The thumb width dropped from `1.1× --slider-thumb-size` (the prior chunky squircle,
≈17.6px) to **`0.6× --slider-thumb-size`** — a slim vertical bar, even thinner than the value.js
reference. It still spans the full track height and keeps the `@supports (corner-shape:
superellipse(2))` squircle PE tier over the round fallback.

**Measured π readback (all four combos identical):**

| readback | value |
|---|---|
| spectrum thumb width | **`9.59px`** (= 0.4× the 24px track) |
| spectrum thumb height | `24px` (full track height) |
| spectrum thumb opacity | `1` (the visible handle) |
| spectrum track height | `24px` |

**Captures:** `W-SLD1-R3-spectrum-desktop-light.png`, `W-SLD1-R3-spectrum-desktop-dark.png`, `W-SLD1-R3-spectrum-mobile-light.png`, `W-SLD1-R3-spectrum-mobile-dark.png` — the gradient track + the
thin squircle handle.

---

## Contract verification

| gate | result | what it locks |
|---|---|---|
| `proof:slider-two-only` | **PASS** | clause 3 RESTATED → thumb-invisible (width 0, opacity 0, no 50% radius) + focus-on-track + range blur; keyset/orphan/spectrum-squircle/consumer-boundary intact |
| `proof:dock-hold-contract` | **PASS** | the keepDockOpen hold still fires on the resolved host (the dock-with-slider drag still works) |
| `proof:touch-target` (`GLASS_UI_DEMO_PORT=5199`) | **GREEN** | the SliderThumb keeps its 44×44 coarse hit-halo (the `.touch-hit-area ::before` geometry survives `width: 0`) |
| `proof:glass-cohesion` (slider arm) | **PASS 4/4** | the range routes `--glass-blur-quiet`, the thumb composes the shared `glass-specular-track` gleam |
| `vue-tsc --noEmit` (src/demo) | **0 errors** | the slider trio typechecks clean |

The readback JSON: `W-SLD1-R3-readback.json`.
