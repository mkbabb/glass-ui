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
grab). The user's bar: a bit THINNER, like value.js's `ComponentSliders.vue` — there the thumb
is `w-3` (12px) over an `h-6` (24px) track, a slim vertical bar **half the track height in
width** (the 0.5×-track ratio). The thumb width dropped from `1.1× --slider-thumb-size` (the
prior chunky squircle, ≈17.6px) → `0.6×` (the slightly-too-thin 9.59px ≈ 0.4×-track intermediate
pass) → **`0.75× --slider-thumb-size`**, which over the spectrum track (`--slider-thumb-size ×
1.5`) lands the value.js bar EXACTLY: **12px over a 24px track = 0.5×-track**. It still spans the
full track height and keeps the `@supports (corner-shape: superellipse(2))` squircle PE tier
over the round fallback.

**Measured π readback (all four combos identical):**

| readback | value |
|---|---|
| spectrum thumb width | **`12px`** (= **0.5× the 24px track — value.js's `w-3`/`h-6` exactly**) |
| spectrum thumb height | `24px` (full track height) |
| spectrum thumb opacity | `1` (the visible handle) |
| spectrum track height | `24px` |
| thumb-width ÷ track-height ratio | **`0.5`** (the value.js reference proportion) |

**Captures:** `W-SLD1-R3-spectrum-desktop-light.png`, `W-SLD1-R3-spectrum-desktop-dark.png`, `W-SLD1-R3-spectrum-mobile-light.png`, `W-SLD1-R3-spectrum-mobile-dark.png` — the gradient track + the
thin squircle handle.

---

## Contract verification

| gate | result | what it locks |
|---|---|---|
| `proof:slider-two-only` | **PASS** | clause 3 RESTATED → thumb-invisible (width 0, opacity 0, no 50% radius) + focus-on-track + range blur; keyset/orphan/spectrum-squircle/consumer-boundary intact. Live readback: `std thumb invisible: width 0 (zero true), opacity 0 (zero true)`; `focus rings track: true`; `spectrum squircle: @supports-gated (height 100%)` |
| keepDockOpen drag (`/compositions/dock-with-slider`, live π) | **PASS** | the dock-hold token fires on drag — `data-held` `null` at rest → `"true"` mid-drag → `null` on release; the fill tracks (`.slider-range` width follows the pointer). The native `useDockHold` host listener is unchanged |
| SliderThumb 44×44 coarse hit-halo (live π on :5199, `pointer: coarse`) | **GREEN** | the `.touch-hit-area ::before` geometry survives `width: 0`: `beforeMinWidth/Height: 44px`, `beforeWidth/Height: 44px`, `pointer-events: none` (the halo does not swallow the drag's pointer-capture). The standard thumb reads `width 0px / opacity 0` under coarse pointer too |
| `vue-tsc --noEmit` (src arm) | **0 errors** | the slider source typechecks clean (the lone test-arm error is in `tests/components/custom/underline/GlassUnderline.test.ts`, an unrelated VTU `.exists` typing drift — no slider reference) |

The readback JSON: `W-SLD1-R3-readback.json`.

**Note on `proof:touch-target` (the Playwright gate):** it spawns/reuses its own dev server on
**:5173** (`tests-visual/playwright.config.ts` `DEMO_PORT = 5173`). On this runner that gate's
six form atoms (Switch, Checkbox, RadioGroupItem, **SliderThumb**, TagsInputItemDelete,
MultiSelectRemoveX — across four different routes) ALL measured 0×0 with the spec's own message
"no atoms were measured — the gallery routes did not render the controls" — a global
:5173-server-render failure, NOT a slider regression (a slider-width-only change cannot make a
Checkbox on a different route read 0×0). The binding slider truth was instead taken from a live π
probe on **:5199** (the dispatch forbids touching :5173): the SliderThumb's 44×44 coarse halo is
present and `pointer-events: none` (row above). The change is width-only on the spectrum thumb;
the standard thumb's `.touch-hit-area ::before` halo machinery is byte-unchanged.
