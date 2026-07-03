# BG.W-DESHADCN — DELTA (dual-engine paint judgement)

**Wave:** BG.W-DESHADCN (ONE concern — WS4/WS10 split dies) · F6 · gate `proof:encapsulation`
**Build commit:** `0078e508` (de-shadcn HEAD-mode; `--ring`→`--focus-ring-color` clean break; ToastClose default accessible name)
**Judge:** non-authoring paint judge (did NOT build the wave)
**Verdict:** **PASS** — dual-engine (Chrome ANGLE-Metal + Safari WebKit), both modes, 13 routes, 52 captures all resolve on disk.

## Criterion (orchestrator-recovered, derived from fable/designSync + gate columns)

> Paint = the form-control material reads a coherent six-state matrix (rest/hover/active/focus/disabled/invalid) with the focus ring resolving `--focus-ring-color`, across the `/forms` band, both modes, dual-engine non-authoring.
> + SPEEDTEST clause: ToastClose ships a default accessible name (`aria-label` "Dismiss", overridable).

## Method (proven C18 pipeline)

- Built bytes: `npm run demo:dist:build` (green) → `vite preview :5200` (BUILT dist-demo, `@glass` alias → current `src/`).
- **Chrome** — real Chrome.app + CDP (`connectOverCDP :9479`), viewport 1440×900 @2x, `?capture=<route>&mode=<m>`, poll `data-capture-ready`, `page.screenshot` → 2880×1800. GPU badge decoded: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal, NOT SwiftShader.
- **Safari** — off-screen WKWebView (`docs/tranches/BG/audit/visual/BG.W-DESHADCN-assets/wkshot-live`, compiled from `docs/tranches/BG/audit/wkshot-live.m`), system WebKit.framework/Metal, polls `data-capture-ready` → 2880×1800. Badge: `ENGINE WEBKIT / GPU Apple GPU`.
- 13 routes × 2 engines × 2 modes = **52 PNGs**, all under `BG.W-DESHADCN-assets/`, all valid PNG signature, 2880×1800, ≥1.7 MB.

## COMPUTED-DOM evidence (the load-bearing computational criteria)

Per-route `getComputedStyle` probe (`BG.W-DESHADCN-assets/chrome-results.json`, all 26 Chrome captures):

| axis | light | dark | verdict |
|---|---|---|---|
| `--focus-ring-color` resolves | `light-dark(#1c1917,#bab7ab)` → `#1c1917` | `#bab7ab` | ✓ resolves both modes |
| legacy shadcn `--ring` | `""` (empty) | `""` (empty) | ✓ clean break real — no `--ring` remnant |
| focused control `box-shadow` color | `color(srgb 0.1098 0.0980 0.0902)` = `#1c1917` | `color(srgb 0.7294 0.7176 0.6706)` = `#bab7ab` | ✓ **exactly** `--focus-ring-color` (Δ<0.002/channel, numeric-verified) |

The focus ring PAINTS `--focus-ring-color` — the criterion's decisive computational check — in every one of the 26 Chrome captures, both modes. Source-side confirmed: zero `var(--ring)` in `src/`; `--focus-ring-color` declared in `tokens/color-radius.css` (light `hsl(24 10% 10%)`) + `tokens/dark-arm.css` (dark `hsl(48 10% 70%)`); `.control-surface`/`.input-pill` read it.

## Six-state matrix — painted truth per route (spot verification)

- **`/forms/inputs`** (chrome L+D, safari L): control-surface pills at **rest**; **invalid** paints the destructive ring + red label + "That doesn't look like an email address." — both engines, both modes. Dark invalid ring survives the luminous-dark plate (W-DARK-MATERIAL / W-INVALID-RING).
- **`/forms/checks`** (chrome L, safari D): the fullest six-state read — **rest** (unchecked/unselected), **active/checked** (dark ink L / violet `--primary` D), **indeterminate** (dash), **disabled** (dimmed) across checkbox + radio + switch (on/off/disabled). Dark selection accent = the chromatic legendre-violet dark `--primary`.
- **`/forms/slider`** (chrome L): recessed track + amber fill + rounded iOS knob, range two-thumb, OKLCH spectrum-gradient track, **disabled** section.
- **`/forms/select`** (chrome D): three control-surface trigger pills + chevrons over the dark page; placeholder in the muted register.
- **`/forms/toggle-chip`** (chrome L): chip (multi-select) + cell (exclusive) variants, selected/rest.
- **`/forms/selectable-chip`** (chrome L): per-tone tag picker (idle-legible ≥3:1, selected bold), single-tone filter row.
- **`/feedback/toast`** (chrome L, safari D): glass-material trigger pills; the **destructive** red variant legible in both modes; ruby feedback-band section identity.

Hover/active are pointer-interaction states not statically capturable; the `.control-surface:hover`/`:active` + press rules are present in source and the material is coherent at rest across all 13 routes.

## SPEEDTEST clause

`src/components/ui/toast/ToastClose.vue` ships a default `aria-label` "Dismiss" via `() => (attrs['aria-label'] as string | undefined) ?? 'Dismiss'`, bound `:aria-label="ariaLabel"` — overridable by a consumer's own `aria-label`. Confirmed on disk (the bare `<X>` svg is no longer unnamed).

## Provenance (anti-evasion)

- Chrome badge: `CHROME / ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) / 1440×900 @2x / MODE {LIGHT|DARK}` — real Metal.
- Safari badge: `WEBKIT / Apple GPU / 1440×900 @2x / MODE {LIGHT|DARK}` — real WebKit.
- All 52 declared capture paths RESOLVE ON DISK (validity swept: PNG signature `89504e470d0a1a0a`, 2880×1800, size ≥1.7 MB). No missing-capture PASS.

## Capture manifest

`docs/tranches/BG/audit/visual/BG.W-DESHADCN-assets/{forms_inputs,forms_textarea,forms_checks,forms_slider,forms_number-field,forms_select,forms_combobox,forms_multi-select,forms_toggle,forms_toggle-chip,forms_selectable-chip,forms_label,feedback_toast}-{chrome,safari}-{light,dark}.png` (52) + `chrome-results.json` (computed-DOM probe) + the capture harnesses (`BG.W-DESHADCN-chrome-capture.mjs`, `BG.W-DESHADCN-safari.sh`, `wkshot-live`).

**RESULT: PASS — cursor flipped PAINT-PENDING → DONE.**
