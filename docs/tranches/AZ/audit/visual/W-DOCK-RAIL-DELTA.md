# AZ.W-DOCK-RAIL — the in-dock switcher rail rebuilt to the hairline register · DELTA

<!-- surface-paths: src/styles/dock/layer-group.css, src/styles/tokens/offsets-sizing.css, src/components/custom/dock/DockLayerGroup.vue, src/components/ui/tabs/TabsIndicator.vue -->
<!-- surface-hash: ac363b1c6070776f3e5af298d76b4128af64cc94407c20b97f50e34f797e438b -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the four surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface re-capture against the current AZ-tree bytes — the live
     `/dock/layers` rail was shot on :5199 with the wave's source edits in place. -->

The in-dock layer switcher rail (`/dock/layers`, the `data-testid="dock-layer-rail-group"`
`<DockLayerGroup>`) is rebuilt from a heavy fused-plate gutter with 4px sliver
glyphs to the iOS-grade HAIRLINE register the R3-1 mandate named: a thin dividing
line, legibly-sized well-contrasted nav glyphs, and a travelling indicator that
paints the intended glass-register token — NOT the baked near-white plate.

## The three stacked root causes — defeated

1. **The indicator utility-bake beat the token rule.** The reka `<TabsIndicator>`
   wrapper baked `bg-(--glass-bg-quiet) [backdrop-filter:var(--glass-blur-quiet)]`
   as unlayered Tailwind utilities on the element; those won over the
   `@layer components` `.dock-layer-tab-indicator { background: var(--dock-layer-rail-active) }`
   rule (an `@layer` always loses to an unlayered utility), so the rail indicator
   painted the near-white glass-quiet plate regardless of the token register.
   **Fix (approach A — the prop-gated base):** `TabsIndicator.vue` gains a
   `surface?: boolean` (default `true`, byte-identical to the prior unconditional
   render for the base `<Tabs>` underline). The dock rail renders
   `<TabsIndicator :surface="false" class="dock-layer-tab-indicator"/>` so the
   element carries NO baked plate — leaving the `.dock-layer-tab-indicator` token
   rule (`--dock-layer-rail-active`) as the sole paint. The base SegmentedTabs
   underline register is untouched.

2. **The rail was a fused tinted gutter, not a hairline.** `.dock-layer-rail`
   painted `background: var(--dock-layer-rail-bg, var(--surface-tint-8))` (an 8%
   warm-ink plate) + `border-radius: var(--radius-md)` + a hard `border-right`,
   fusing a ~96px tinted column to the pill (the "heavy dark blob column"). **Fix:**
   `--dock-layer-rail-bg` re-points off `--surface-tint-8` to `transparent`; the
   `--radius-md` plate background drops; the single `border-right` becomes the only
   visible rail edge, re-keyed to the tunable `--dock-layer-rail-divider` hairline
   token (`color-mix(in srgb, var(--border) 40%, transparent)`). The rail reads as
   a thin rule between the switcher column and the dock body.

3. **The tab glyphs computed 4px wide (squished slivers).** `.dock-layer-tab`'s
   `size-4` (16px) icon had NO `svg { width / flex-shrink }` floor anywhere in
   layer-group.css, so the un-floored SVG collapsed to a 4px×16px sliver inside the
   column inline-flex. **Fix:** the missing
   `.dock-layer-rail .dock-layer-tab svg { width: 1rem; height: 1rem; flex-shrink: 0 }`
   rule floors both axes at 16px and pins the shrink guard, killing the sliver. The
   tab rest color lifts off the low-contrast `--muted-foreground` to the nav-glyph
   register (`--dock-fg-on-aurora`/`--foreground` warm-ink at 78%), AA over the
   now-hairline backdrop; the selected glyph reads the full register via
   `--dock-rail-active-accent` (defaults to the dock foreground, NOT a saturated
   brand `--primary` — deferring the exact accent to W-REGISTER-IOS's root register).

## The rail-active register (W-REGISTER-IOS coordination)

`--dock-layer-rail-active` re-points off the saturated `color-mix(in srgb, --primary 15%, transparent)`
warm-red mix to `var(--glass-bg-floating)` — the SAME glass tier the dock
nav-pattern canon (`--dock-control-active-bg`) uses for every selected control
("selected reads as glass"). The rail's travelling indicator now reads identically
to the rest of the dock's selected affordances. The rail keeps a glass tint here
and never bakes a brand-red the de-red wave (W-REGISTER-IOS) would have to undo.

## π live readback — `/dock/layers` at :5199, desktop 1440×900, light + dark

Captured by `scripts/wf-az-capture-dock-rail.mjs` → `W-DOCK-RAIL-pi-readback.json`.

| witness | light | dark | verdict |
|---|---|---|---|
| **W1** indicator effective painted luminance < 0.85 near-white floor (the C1 plate measured L≈0.88) | 0.805 | 0.016 | ✅ below floor both themes |
| **W1** indicator `backdrop-filter` cleared (the C1 blur plate defeated) | `none` | `none` | ✅ |
| **W1** indicator references `--dock-layer-rail-active` (the glass-floating register, POSITIVE token test) | yes | yes | ✅ token-driven, not `--glass-bg-quiet` |
| **W2** rail box paints no surface fill (the hairline divider is the only visible rail edge) | `rgba(0,0,0,0)` | `rgba(0,0,0,0)` | ✅ no plate |
| **W2** divider is a single `1px` hairline | `1px @ 40%` | `1px @ 40%` | ✅ hairline |
| **W3** rail glyph CSS width ≥14px (no 4px sliver) | 16px | 16px | ✅ floored |
| **W3** glyph contrast vs dock backdrop ≥4.5:1 AA | 6.51:1 | 5.25:1 | ✅ AA both themes |

**Note on the W1 luminance test:** the indicator is the translucent glass-floating
register (80% card / 88% ink). The BINDING painted luminance is the EFFECTIVE
composited value over the dock substrate (0.805 light / 0.016 dark), both below the
0.85 near-white floor — the raw pre-composite token color (L 0.958 light) is not
what paints. The selected plate reads as a glass LIFT in light / glass SINK in
dark (indicator-vs-dock-backdrop surface delta ≈2.2–2.5:1), never the C1 baked
near-white blob. The glyph carries the text legibility (6.51 / 5.25 AA).

## Frames

- `W-DOCK-RAIL-after-light.png` / `W-DOCK-RAIL-after-dark.png` — the full
  `/dock/layers` route at desktop 1440×900 (deviceScaleFactor 2).
- `W-DOCK-RAIL-rail-zoom-light.png` / `W-DOCK-RAIL-rail-zoom-dark.png` (488×194) —
  the switcher-rail crop: three legibly-sized icons in a hairline-divided column,
  the active (top) tab on a glass-floating lift, no tinted plate gutter.

Before/after baseline: `docs/tranches/AZ/audit/ground/C1-switcher-rail-zoom.png`
(the heavy tinted-plate column with the 4px sliver glyphs).

## Source half — `proof:dock-rail-hairline`

Born-RED at HEAD (7 violations across W1/W2/W3 — the unconditional baked plate, the
`--surface-tint-8` fill + `--radius-md` plate + no divider token, and the absent svg
rule). GREEN at close: W1 token-not-plate · W2 hairline-not-gutter · W3
floored-not-sliver. Artefact `.cache/gates/AZ-dock-rail-hairline.json`.
