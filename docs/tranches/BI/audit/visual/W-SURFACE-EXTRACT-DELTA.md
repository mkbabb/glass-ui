# W-SURFACE-EXTRACT — DELTA (refactor-not-repaint + the value.js P3 decision ledger)

Band B2 (glass taxonomy). BI.W-SURFACE-EXTRACT — the `<Surface>` primitive extraction +
the `decorationClass` fan-out. This wave is a REFACTOR, not a repaint: the shipped surface
grammar (`Surface = glass|veil|opaque|clear` + `surfaceClass()` + `[data-surface]`) gains
its missing COMPONENT half (`<Surface>`, the bare tier × decoration plate `<Card>` composes)
and its DRY `.replace()` wart dies at every live site — with ZERO pixel change at the
default expressions.

## The binding claim — 0-delta byte-diff (Open-Gap-3)

At the DEFAULT expressions, every extracted surface renders pixel-identical to the
pre-extract ground:

- `<Card>` (every tier × decoration, `deep`/`shadow`/`grain`) — the plate is composed on
  ONE root `<Surface>` node with `inheritAttrs:false` + `v-bind="$attrs"` LAST, so Card's
  fallthrough class/attrs/directive land on the SAME single DOM node the prior single
  `<Primitive>` root carried. `surfaceForPlate` routes `cartoon` over the plain glass base
  with the REAL `surface` on `:data-surface` (byte-identical to the prior gate).
- The six reka-portaled overlays — `Dialog`, `Sheet`, `Popover`, `Command`, `Drawer`,
  `ExpandableContainer` — each resolve their decoration through `decorationClass(surface)`
  instead of the `surfaceClass(x).replace(/^glass-.../, "")` regex. `decorationClass`
  returns byte-equal strings to the wart over the whole (member × tier) input space
  (`glass`→`""`, `veil`→`veil-surface`, `opaque`→`glass-opaque`, `clear`→`glass-clear`).
- The demo taxonomy route `foundations/surface-taxonomy` — the full tier × decoration
  matrix on the ONE `<Surface>` primitive (discharges UF-J3: every card variant + the veil
  card render correctly on the matrix).

Both modes, Chrome + Safari; pixel-identical to the pre-extract ground (0 delta expected).

## The value.js P3 decision ledger (the extracted grammar DECIDES each — non-silent)

The value.js P3 ask (`VALUEJS-T-COMMUNIQUE-2026-07-11.md §2.1`, `INBOUND-MARKS.md` P3) lists
the ladder rungs/knobs as INPUTS to the extracted surface grammar. The grammar DECIDES each
(admit as a rung / DECLINE-recorded → value.js's pre-recorded fallback: the demo interim
becomes permanent). No omission is silent:

| P3 input | Decision | Where |
|---|---|---|
| **WELL rung** — `--glass-bg-well` + `.glass-well`; tone-step ∈ [6%,10%] `--foreground` into `--card`, oklab, default 8% | **ADMIT** — `--glass-bg-well` + `--glass-well-tone` (8%, bounded) in `tokens/glass.css`; the `.glass-well` recessed-field register (oklab tone-step + inset groove) in `glass/surface-axis.css`. A FIELD register (like `.input-bar`), NOT a `[data-surface]` plate — a well is a hole IN the surface. | `tokens/glass.css` · `glass/surface-axis.css` |
| **seated field-chrome `.input-bar` rung + cap seam + `--input-bar-font`** | **ADMIT** (rung + font) / **DECLINE-recorded** (cap seam) — the `.input-bar` seat rung already ships (reading the `--control-pill-*` cohort + the floating glass rung); `--input-bar-font` is MINTED as a token-first indirection on `.input-bar-field` (byte-identical default `var(--font-mono, monospace)`). The discrete leading/trailing CAP is a consumer composition over the flex row (the `border-radius` cap ships; the demo search-seat interim W3-3 stands as the permanent cap idiom). | `utilities/components.css` |
| **scroll-header rest-floor + bottom-feather knobs** (Q9 EFFECT bracket 27–39%) | **DECLINE-recorded** — out of the surface-PLATE grammar's scope: the scroll-header choreography is the `<ScrollCard>`/`<ScrollCardHeader>` family's (BB.W-SCROLL-CARD, the `--card-scroll` timeline + `::before` backplate), not a `[data-surface]` plate decoration. value.js's pre-recorded fallback fires: the demo interim W3-4 (feather/rest-floor) becomes permanent. | (boundary recorded) |
| **tiers PUBLISH effective lightness** | **DECLINE-recorded** — substrate-without-consumer (J-inv-10): no library binary reads a per-tier effective-L token at HEAD; the composited L is derivable from the shipped `--glass-opacity-{tier}` × `--card`/`--neutral-0` ladder. Re-triggers when ≥2 library consumers land. Interim (value.js's own contrast oracle math) becomes permanent. | (boundary recorded) |
| **P-3 chroma-guard note** | **ADMIT-as-construction-note** — the guard holds BY CONSTRUCTION: `.glass-well`/`--glass-bg-well` mix `--foreground` (warm-amber ink, OKLab hue ~62–75°) INTO `--card` (warm cream) in oklab, so the recessed tone-step preserves warmth — no gray cast (the AW.W26 / BA.W-NO-GRAY warm-chroma floor). | `glass/surface-axis.css` · `tokens/glass.css` |
| **atlas GU-1/O-E2 — `--glass-key-direction`** (the under-shadow key-light lean; atlas the named consumer, verified ABSENT 2026-07-12) | **ADMIT** — `--glass-key-direction` minted (unitless cast RATIO, library default `0` = straight-down, byte-identical) + threaded into the three `--glass-under-shadow-{quiet,default,vivid}` tiers + the dock-wrap vivid consumer. ONE write leans the whole under-shadow register library-wide; atlas sets `-0.375` (presets-in-consumers). Landed in `tokens/glass-fx.css` (the actual under-shadow register home, NOT `ladder-undershadow.css` which holds the opaque escape + content-aware modifier). | `tokens/glass-fx.css` |

## Obligations (ride the B-close gestalt ceremony — W-REFLECT / W-GESTALT-LEDGER-FILE)

- Stable-Safari.app / WKWebView device run for the byte-diff (Playwright-WebKit per SAF-1
  for the paint question; the visible-Metal confirm owed at reflect).
- The 0-delta π captures at the default expressions (Card / Dialog / Sheet / Popover /
  Command / ExpandableContainer + the taxonomy-matrix route), BOTH modes, Chrome + Safari.
- The `proof:ba-gestalt` glass-band verdict re-earned on a fresh capture.
