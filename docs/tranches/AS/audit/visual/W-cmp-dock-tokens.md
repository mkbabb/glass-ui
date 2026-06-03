# AS visual audit — DOCK + DESIGN-TOKENS + MOTION feature-correctness

Slice: dock rendering / standalone 44px floor / as-asChild · radius-token canon ·
G1 density container-queries · P8 view-transitions. Evidence = the AS capture set
under `as-verify/` (1440x900, light+dark) cross-read against source.

## Verdict — PASS (one CONCERN: stale radii-story label, doc-only, non-blocking)

Design tokens and rounded corners are correct and consistent across the component
set. Every surface reads ROUNDED at the canonical rung; the dock renders + floors
correctly over light/dark and over aurora; the G1 container-queries reach visual
parity with the `[data-density]` attribute path; the P8 view-transition substrate is
PRM-gated and leak-hardened. The single defect is a stale printed hint on the radii
demo page (the rendered corner is correct).

---

## (1) DOCK — renders correctly; standalone 44px floor; as/asChild — PASS

- `dock-light.png` / `dock-dark.png` (`/navigation/dock`): 6 `.glass-dock` instances
  (home-icon collapsible, media-transport, select+dropdown triggers) all render as
  rounded glass PILLS. `.glass-dock` sets `border-radius: var(--radius-dock)` =
  `--radius-pill` (9999px) — `dock.css:67`. Dark renders the omnidirectional glow
  halo (`--shadow-dock`) cleanly; floor + triggers intact in both themes.
- **Standalone 44px coarse floor (S-2)** — `dock.css:1099-1102`:
  `.dock-icon-button:not(.dock-icon-button--compact)` sets
  `min-block-size`/`min-inline-size: var(--dock-touch-target, 2.75rem)` under
  `@media (pointer: coarse)`. This is BUTTON-level (ancestry-independent), so a routed
  settings-gear with no `.glass-dock` wrapper still clears the WCAG 2.5.5 44px target.
  Compact buttons correctly opt out (auto-sized affordances).
- **In-dock floor (R0G-6)** — `dock.css:1085`: selector is `.glass-dock[data-density]`
  (0,2,0), deliberately beating the always-present density setter that shadowed a bare
  `.glass-dock` (0,1,0). Lifts both `--dock-control-size` AND `--size-icon-btn` to
  2.75rem so the slot reserves 44px (no overflow). Fine-pointer byte-identical. Sound.
- **as/asChild** — `DockIconButton.vue` renders through reka-ui `Primitive :as :as-child`.
  `type` emitted ONLY on a `<button>` host (`buttonType` computed gates on
  `!asChild && as === "button"`) — an anchor/RouterLink host carries no stray `type`.
  Correct idiom; no wrapper element.

## Over-aurora legibility — `--dock-fg-on-aurora` — PASS

- `tokens.css:631`: `--dock-fg-on-aurora: var(--foreground)` (byte-identical default).
- Consumed at TWO sites — `dock.css:677` (`.dock-icon-button`) and `dock.css:976`
  (select/dropdown trigger) — both `color-mix(... var(--dock-fg-on-aurora,
  var(--foreground)) calc(var(--opacity-icon-muted)*100%) ...)`. Consistent recipe.
- Auto-darks: `--foreground` resolves via `light-dark(hsl(24 10% 10%),
  hsl(48 10% 90%))` (`tokens.css:1287`), so the dock fg flips with the theme without a
  separate `.dark` mirror of the aurora token. A consumer over a dark aurora overrides
  the one token per-backdrop without touching library source. `--glass-opacity-dock`
  (0.42) + `--glass-blur-dock` (11px) hold the crisp-pill register confirmed in capture.
- `aurora-configurator-dark.png`: aurora stage renders NON-EMPTY (blue painterly
  gradient + visible nuclei circles); configurator chrome reads rounded over it.

## (2) DESIGN TOKENS — radius canon resolves correctly + consistent — PASS (1 CONCERN)

- `foundations-radii-{light,dark}.png` (`/foundations/radii`): the canon reads as a
  correct monotone corner progression — xs → sm → md → lg → xl → 2xl → pill — and the
  semantic-alias row (card/panel/dialog/input/button/badge/dock) renders each at its
  mapped rung. `badge` + `dock` are full circles (pill); the rest are roundrects. No
  squared surface.
- Token source is internally consistent across BOTH stylesheets:
  `tokens.css:290-309` and `theme.css:212-229` agree byte-for-byte —
  `--radius-xs:4px · sm:4px · md:6px · lg:var(--radius)=0.625rem · xl:12px ·
  2xl:1rem · pill:9999px`; aliases `card→2xl · panel→xl · dialog→2xl · input→radius ·
  button→radius · badge→pill · dock→pill · tooltip→lg`. Runtime corners are correct.
- Cross-component rounded-corner consistency confirmed in capture:
  - cards = rounded-2xl (search readout/ledger cards, color swatches, glass-tier cards)
  - panels/configurator substrate = rounded-xl floating glass
  - pills/badges = full pill (metric badges "49 rows / 0 results", dock, buttons)
  - inputs = `--radius` rounded (search input, configurator sliders)
  - dialogs = rounded-2xl (not captured directly but alias verified in source)
  No squared / sharp-corner surface appears on any captured route, light or dark.

- **CONCERN (doc-only, non-blocking) — stale radii-story label.**
  `demo/stories/foundations/radii.vue:6` hardcodes the `xs` hint string as `"2px"`,
  but the actual `--radius-xs` token is `4px` (tokens.css:291, theme.css:213). The
  RENDERED corner is correct (4px from the token); only the printed caption is wrong.
  Because the radii page is the canonical token-documentation surface, a reader sees
  "xs = 2px" and gets a value that no longer matches the token. Fix = change the
  literal hint to `"4px"`. Note xs and sm are both 4px in source (the xs rung is
  effectively a duplicate of sm — the xs/sm swatches read near-identical in capture,
  which matches 4px == 4px); not a bug, just worth knowing the two rungs collapsed.

- Color tokens render at expected values: `foundations-colors-{light,dark}.png` shows
  `--foreground` near-black, `--destructive` red, warm-cream `--background/--card`,
  the 13-stop section palette, and viz-basis cards (Fourier red / Chebyshev blue /
  Legendre purple) — all matching `tokens.css:325-465`. No color drift.

## (3) G1 DENSITY CONTAINER-QUERIES over [data-density] — visual parity — PASS

- `ConfiguratorRow.vue:159-184` and `utilities.css:495-508` (MetricPill) add an
  `@supports (container-type: inline-size) { @container style(--density: X) {...} }`
  companion to the existing `[data-density="X"]` attribute rules.
- **Visual parity holds**: the container-query arm writes the IDENTICAL token values
  as the attribute arm — ConfiguratorRow reads the same
  `--configurator-row-{gap,py}-{mobile,compact,comfortable,spacious}` vars on both
  paths; MetricPill writes the same literals (`spacious` → block 0.5rem / inline
  0.75rem; `comfortable` → 0.25rem / 0.5rem) on both. Specificity is engineered so a
  row/pill carrying BOTH the attribute and a `--density` ancestor lands on the
  attribute rule (same paint), and an ancestor-only element still resolves the right
  register. `[data-density]` is the SOLE `@supports` fallback (no dead mirror).
- `aurora-configurator-{light,dark}.png` + `configurator-{light,dark}.png` show the
  rows/pills laid out at their density register with rounded corners; no layout
  regression from the container-query layer.

## (4) P8 VIEW-TRANSITIONS — no console-error class — PASS

- `view-transition.css`: `::view-transition-group(.gl-list-item)` /
  `.gl-dock-layer` recipes read `--vt-duration` / `--vt-ease` axes (default
  `--duration-normal` / `--ease-apple-spring`); PRM bracket zeroes the pseudo-tree
  animation; `::view-transition { pointer-events: none }`. Well-formed, gated.
- `useViewTransition.ts`: `startViewTransition` calls `mutate()` synchronously in BOTH
  the native and instant-fallback paths (post-mutation DOM identical regardless of
  support), `supportsViewTransitions()` feature-detects, and crucially
  `vt.ready?.catch(() => {})` (line 95) SWALLOWS the "Transition was skipped" rejection
  that otherwise leaks an unhandled pageerror on rapid re-trigger; `finished` never
  rejects. No P8 console-error class.
- Capture inventories (`W-route-inventory.md`, `W-png-inventory.md`,
  `W-capture-manifest.md`): no route 404'd, no capture failed, no error/warn logged.

## Token-drift / squared-corner scan — clean (one stale label)

- Only drift found: the radii-story `xs="2px"` caption vs the `4px` token (CONCERN
  above). Runtime token graph (tokens.css ↔ theme.css) is internally consistent.
- No squared/sharp-corner surface on any captured route. Every dock, card, panel,
  pill, badge, input, dialog-alias, glass-tier, slider track, and button reads at its
  canonical rounded rung in both light and dark.
</content>
</invoke>
