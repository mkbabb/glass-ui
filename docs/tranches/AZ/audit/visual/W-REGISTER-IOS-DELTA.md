<!-- surface-paths: src/styles/dock-controls.css, src/styles/tokens/offsets-sizing.css, demo/layout/dock-nav.css -->
<!-- surface-hash: 427564f94e647ded60d13a04df0df64455201c5962f053e6a96377c9eb865c7c -->

# AZ.W-REGISTER-IOS — DELTA: de-red the interactive dock register to the iOS luminance-lift

**Wave:** W-REGISTER-IOS — H1 **arm (a)** (USER-DECIDED, R3-6 verbatim): the brand-red
(`--viz-fourier`) retires from ALL state registers (hover/active/selected/pressed
become the iOS luminance-lift glass register at the LIBRARY ROOT); red survives ONLY
as static brand ink — the ℱ wordmark, the data-viz strokes, the gold/red CTA family.

**Gates (GREEN):**
- `npm run proof:register-ios` (born-RED source arm, NEW) — `.cache/gates/AZ-register-ios.json` (status: pass, 12/12).
- `tests-visual/register-ios.spec.ts` (π light+dark readback, NEW) — 20/20 passed on `:5199`.
- `vue-tsc --noEmit` (both arms) + `npm run build` green; `proof:glass-cohesion` + `proof:dock-unify` stay green (no regression — the selected register stays a glass tier off the allowlist).

## The change (file:line-grounded)

| surface | before (HEAD `72749103`) | after |
|---|---|---|
| ROOT — `--dock-selected-accent` (offsets-sizing.css) | did not exist | minted: `color-mix(in oklab, var(--foreground) 14%, transparent)` — the SINGLE selected-affordance retint knob, auto-flips with `--foreground` |
| ROOT — `--dock-control-press-bg` (offsets-sizing.css) | did not exist | minted: `color-mix(in oklab, var(--glass-bg-resting), var(--foreground) 7%)` — the iOS press-darken |
| ROOT — rail active GLYPH `color` (dock-controls.css) | `var(--dock-rail-active-accent, var(--primary))` (brand fallback) | `var(--foreground)` (warm-ink; arm-a) |
| ROOT — rail active `::before` BAR `background` (dock-controls.css) | `var(--dock-rail-active-accent, var(--primary))` (solid brand stripe) | `var(--dock-selected-accent)` (translucent luminance-lift) |
| ROOT — dock control `:active` (icon/tab/select/dropdown, dock-controls.css) | scale-only (`--scale-press-dock`) — C4-INV-4 | + `background: var(--dock-control-press-bg)` (darken + shrink) |
| DEMO — `--demo-nav-accent: var(--viz-fourier)` (dock-nav.css:21) | the NCSU-red mint | DELETED (the demo inherits the neutral root register) |
| DEMO — sidebar `.is-active` `--dock-rail-active-accent: var(--demo-nav-accent)` (dock-nav.css:58) | red rail re-point | DELETED |
| DEMO — bottom-dock `.is-active`/`[aria-current]` `--dock-active-color` + `color: var(--demo-nav-accent)` (dock-nav.css:103-104) | red glyph | DELETED (a non-color `font-weight: 600` selected cue stays) |

**UNCHANGED (C4-INV-1 / C4-INV-2 — verified at HEAD, NOT touched):** `--dock-control-active-bg: var(--glass-bg-floating)` (the iOS material-lift plate is already correct); the hover register (`--dock-control-hover-bg`, scale `--scale-hover-dock`, warm-ink). The de-red touches only the brand-hue glyph + the solid accent bar riding ON TOP of the already-correct plate.

## π readback — a SELECTED rail item + a selected dock icon-button (live `:5199`, getComputedStyle)

The binding NEGATIVE: the selected glyph/bar/plate is NOT `--viz-fourier`
(`oklch(0.579 0.201 30.4)` light / `oklch(0.693 0.151 28.1)` dark; ΔE > 24 from each).

**Rail selected item (`/dock/rail`, the active first entry), 1280×800:**

| arm | glyph `color` | active plate `background` | `::before` bar `background` |
|---|---|---|---|
| light | `rgb(28, 25, 23)` — warm-ink `--foreground` (ΔE ≫ 24 from red) | `color(srgb 0.982 0.981 0.978 / 0.8)` — the `--glass-bg-floating` 80% glass tier (translucent) | `oklab(0.216 0.0035 0.0052 / 0.14)` — a translucent dark-ink luminance-lift @ 14% α, NOT a brand stripe |
| dark | `rgb(232, 231, 227)` — light warm-ink (ΔE ≫ 24 from the red dark twin) | `oklab(0.217 0.0028 0.0041 / 0.88)` — the floating glass tier | `oklab(0.928 -0.0005 0.0056 / 0.14)` — a LIGHT luminance-lift @ 14% α (auto-flipped with `--foreground` — the iOS "brighter material over the dark plate") |

**Selected dock icon-button (`/dock/overview`, aria-pressed forced):** glyph
`rgb(0, 0, 0)` (light) / `rgb(231, 231, 231)` (dark) — warm-ink, zero red on the
interactive register. The active plate routes `--dock-active-bg` →
`--dock-control-active-bg` → `--glass-bg-floating` (the translucent glass tier).

**The headline auto-flip:** the `--dock-selected-accent` bar is a 14%-α DARK-ink lift
in light → a 14%-α LIGHT lift in dark (`oklab L≈0.22` → `L≈0.93`) — exactly the arm-a
"luminance-lift that flips with `--foreground`" register, no brand hue at either pole.

## Screenshots (the wave's OWN surface — rail dock crop, 86×640)

- `W-REGISTER-IOS-rail-desktop-light.png` — the rail with its selected item: glass material-lift plate + the translucent luminance bar, no red.
- `W-REGISTER-IOS-rail-desktop-dark.png` — the same, dark arm (the light luminance lift over the dark plate).

## Born-RED provenance

On the pre-edit tree (HEAD `72749103`) the source gate FAILS:
- clause (d) detects all three red mints/re-points (`dock-nav.css:21,58,103-104`);
- clause (e)'s negative predicate catches **2 interactive-red violations**
  (`.demo-sidebar-item.is-active` + `.demo-bottom-dock__tab.is-active,[aria-current="page"]`).

Post-edit both go to 0; the gate is genuinely born-RED → GREEN.
