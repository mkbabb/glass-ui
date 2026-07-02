# BG.W-GLASS-DEFAULT-DEFINITION — dual-engine paint DELTA

**Wave:** BG.W-GLASS-DEFAULT-DEFINITION (F2.1 · GA-1 · the defined control tier)
**Row:** cursor F2.1, status PAINT-PENDING (this-commit `cc70a792`)
**Judge:** NON-AUTHORING paint judge (did not build this wave)
**Date:** 2026-07-02
**Verdict: FAIL → leave PAINT-PENDING.** The defined-control mechanism is a DEAD KNOB in paint
(a substitution-vs-inheritance trap); the control cohort does NOT gain the promised edge/floor over
a flat backdrop in light mode — it reads as the pale-lozenge/soft-pill the wave was chartered to fix.

---

## Method (the proven C18 dual-engine `?capture=` harness over BUILT `:5200`)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
- `npm run demo:dist:build` (BUILT bytes) → `npm run demo:dist:serve` (vite preview `:5200`).
- **Chrome leg:** real Chrome.app 149 via CDP `:9456` (playwright `connectOverCDP` → `newContext`
  colorScheme+`deviceScaleFactor:2` → `?capture=<route>&mode=<m>` → poll `data-capture-ready` →
  `GL_RENDERER` probe + computed-DOM probe → `page.screenshot` 1440×900 @2x). GL badge:
  `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`.
- **Safari/WebKit leg:** off-screen WKWebView `/tmp/wkshot-live "http://localhost:5200/?capture=<route>&mode=<m>" out.png <m> 15000`. GPU badge: `Apple GPU`.
- Provenance = the in-pixel magenta engine badge (top-left). Every capture decodes the correct
  ENGINE + MODE + `2880×1800px`.
- Routes: `/display/buttons` (`.btn-glass`), `/forms/inputs` (`.input-pill`), `/forms/select`
  (`.control-surface`), `/substrates/glass-material` (`.glass-card`, the transmissive negative arm).
- **16 PNGs on disk**, all 2880×1800, at
  `docs/tranches/BG/audit/visual/glass-default-definition-paint/gdd-<route>-<engine>-<mode>.png`.

Device-free gate `proof:glass` (defined-control-floor arm DF1–DF6) is GREEN — it verifies the SOURCE
recipe reads the scalar, but it CANNOT see that the scalar never REACHES paint. This DELTA is the
source-green / paint-broken gap the paint judge exists to catch.

---

## The defect — the DEFINED tier is a DEAD KNOB (substitution-vs-inheritance trap)

The wave sets `--glass-definition: 1` on the cohort to engage TWO new legs — a warm-cream floor-fill
(`--glass-floor-fill`) and a stronger warm rim (`--glass-border-defined`). **Both legs paint
transparent** because the two tokens are declared at `:root` where `--glass-definition = 0`, and CSS
`var()` substitution resolves at the DECLARING element (`:root`), not at the element that later
flips the scalar. The cohort rule flips `--glass-definition: 1` but never RE-DECLARES the two color
tokens, so they keep their `:root`-substituted (transparent) values. This is the exact
substitution-vs-inheritance trap CLAUDE.md documents repeatedly (`--dock-scale` re-declare, the
`--glass-bg-dock` pre-substituted seam).

### Computed-DOM evidence (Chrome CDP `getComputedStyle` on the first cohort element, all 4 controls × both modes)

| route (cohort) | `--glass-definition` on el | computed `--glass-floor-fill` | painted floor gradient | computed border |
|---|---|---|---|---|
| `/display/buttons` (`.btn-glass`) light | **1** | `color-mix(in srgb, …#fdf5ec… calc(0 * 15%), transparent)` | `linear-gradient(color(srgb 0 0 0 / 0), …)` **transparent** | `0px color(srgb 0 0 0 / 0)` |
| `/display/buttons` dark | **1** | `…calc(0 * 15%)…` | **transparent** | `0px color(srgb 0 0 0 / 0)` |
| `/forms/inputs` (`.input-pill`) light | **1** | `…calc(0 * 15%)…` | `linear-gradient(color(srgb 0 0 0 / 0), color(srgb 0 0 0 / 0))` **transparent** | `1.5px color(srgb 0 0 0 / 0)` |
| `/forms/inputs` dark | **1** | `…calc(0 * 15%)…` | **transparent** | `1.5px color(srgb 0 0 0 / 0)` |
| `/forms/select` (`.control-surface`) light | **1** | `…calc(0 * 15%)…` | **transparent** | `1px color(srgb 0 0 0 / 0)` |
| `/forms/select` dark | **1** | `…calc(0 * 15%)…` | **transparent** | `1px color(srgb 0 0 0 / 0)` |
| `/substrates/glass-material` (`.glass-card`) light/dark | **0** (correct) | — | `none` (transmissive) | `1px foreground@0.04` (base rung) |

The scalar shows `calc(0 * 15%)` on the cohort — proof the `--glass-definition: 1` flip did NOT reach
the token. The border WIDTH is reserved (1.5px input / 1px select) but the COLOR is transparent, so the
element is one dead-knob-fix away from a visible warm hairline. `--glass-border-defined` at
definition=1 would be `foreground@14%` (a visible rim); at the trapped definition=0 it is transparent.

`chrome-results-gdd.json` carries the full per-element probe.

### Visual read (both engines, both modes)

- **`/display/buttons` — light (Chrome + WebKit):** the "Glass register" buttons (glass · glass-wash ·
  Toggle) over the flat cream page read as **pale lozenges** — the exact anti-pattern the page's own
  copy disavows ("lit glass over the busy backdrop, NOT a pale lozenge on a flat plate"). No crisp warm
  rim; only the pre-existing translucent plate (alpha 0.328). The wave's fix did not land.
- **`/forms/inputs` + `/forms/select` — light (Chrome + WebKit):** the `.input-pill`/`.control-surface`
  read as SOFT warm-cream pills with **no crisp edge** (border computed-transparent). Low
  plate-vs-page contrast on the warm-cream light page; the intended defined rim is absent.
- **Dark (Chrome + WebKit):** the controls read as defined — but via the strong warm-dark-plate vs
  near-black-page CONTRAST, NOT the wave's mechanism (the rim/floor are still computed-transparent).
  Dark MASKS the dead knob; it does not exercise it.
- **`/substrates/glass-material` — both modes (the negative arm): PASS.** The content glass tiers
  (`glass-wash…glass-overlay`) stay transmissive over the warm field (`--glass-definition: 0`); the
  flip does not bleed into content surfaces.

The pass condition requires the cohort to read as DEFINED (edge/floor) over a flat backdrop in BOTH
modes. Light mode — the target case (the near-gray-shape-over-flat-light-page BD §3.3 named) — FAILS:
the edge is provably transparent and the buttons read as pale lozenges. FAIL.

---

## defectLocalization

- **Root cause:** `src/styles/tokens/glass.css:368` (`--glass-floor-fill`) + `:372`
  (`--glass-border-defined`) are declared at `:root`, where `--glass-definition = 0`
  (`@property … initial 0`). `var()` inside a custom-property value substitutes at the DECLARING
  element, so both tokens compute to transparent at `:root` and inherit down already-resolved.
- **Missed re-declare:** `src/styles/glass/defined.css:46` sets `--glass-definition: 1` on the cohort
  (`.glass-defined, .btn-glass, .input-pill, .control-surface`) and lines `:53–54` read
  `var(--glass-floor-fill)` / `var(--glass-border-defined)` — but the cohort never RE-DECLARES the two
  tokens, so the scalar flip is inert. Dead knob.
- **Gate blind spot:** `proof:glass` DF2 labels the floor leg "dead-knob-proof" — but that is a SOURCE
  check (the token's declaration references the scalar). It does not assert the scalar reaches PAINT,
  so it passed over a live substitution trap.

## mustFix (for the build-fix-agent)

1. **Re-declare the two color tokens ON the cohort rule** so they re-resolve with `definition=1`.
   Either (a) move/duplicate the `color-mix(…)` formulas onto the
   `.glass-defined, .btn-glass, .input-pill, .control-surface` rule in `glass/defined.css` (beside
   `--glass-definition: 1`), or (b) inline the color-mix directly in the recipe reading
   `var(--glass-definition)` at the element, e.g.
   `linear-gradient(color-mix(in srgb, var(--card) calc(var(--glass-definition)*var(--glass-floor-fill-max)), transparent), …)`
   for the floor and `border-color: color-mix(in srgb, var(--foreground) calc(var(--glass-definition)*14%), transparent)`.
   (The standard substitution-trap fix — re-declare-on-scope, the `--dock-scale` re-declare precedent.)
2. **Re-verify the paint:** the cohort's computed `--glass-floor-fill` resolves `card@15%` (non-transparent),
   `--glass-border-defined` resolves `foreground@14%` (a visible warm rim), the painted floor gradient is
   non-transparent, and the light-mode buttons/inputs/select gain a visible warm edge/floor and stop
   reading as pale lozenges. The transmissive negative arm (`glass-material`, `definition=0`) must stay
   byte-transmissive.
3. **Harden the gate (recommended):** extend `proof:glass` DF2/DF3 (or the paint π) to assert the scalar
   REACHES paint on the cohort (computed floor/border non-transparent at `definition=1`), so the
   substitution trap cannot green again.

After the fix lands, a fresh non-authoring dual-engine capture over all 4 routes (both modes) re-runs
this DELTA; on PASS the cursor flips F2.1 PAINT-PENDING → DONE.

---

## Captures (16 PNGs, 2880×1800, on disk)

`docs/tranches/BG/audit/visual/glass-default-definition-paint/`
- `gdd-buttons-{chrome,safari}-{light,dark}.png`
- `gdd-inputs-{chrome,safari}-{light,dark}.png`
- `gdd-select-{chrome,safari}-{light,dark}.png`
- `gdd-glass-material-{chrome,safari}-{light,dark}.png`
- `chrome-results-gdd.json` (per-element computed-DOM probe) · `chrome-capture-gdd.mjs` (the Chrome leg)

Provenance decoded per capture: Chrome badge `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`;
WebKit badge `Apple GPU`; both `1440×900 @2x (2880×1800px)`, MODE stamped LIGHT/DARK.
