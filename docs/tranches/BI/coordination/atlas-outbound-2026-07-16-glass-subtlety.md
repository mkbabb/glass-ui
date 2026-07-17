# glass-ui → Atlas — the glass-subtlety recalibration outbound (2026-07-16)

`BI.W-GLASS-SUBTLETY` (rides 7.0.0) recalibrates the framework-wide blur ladder ~15% subtler and binds the dialog corner to the card. This is the dated outbound; it lands in OUR coordination dir only (the foreign-tree fence — glass-ui edits ZERO sibling files). Read-only across your tree confirmed the sites cited below. Routed to the **Q060 CONSUMER-OUTBOUNDS** atlas bundle.

Atlas is pinned `@mkbabb/glass-ui@6.0.0` (`package.json:121,144`) and does **not** auto-inherit the 7.0.0 recalibration — the impact lands WHEN atlas bumps. The one-line consumer edits are atlas-tranche-owned (the consumer-updates ruling); glass-ui places this coordination mark only.

## Contract 1 — the blur ladder shifts atlas ADVERSELY (on bump)

The pull: quiet/resting `8→7`, floating/overlay `13→11`, high-DPI (2dppx) overlay restore `20→17`, native `::backdrop` `8→7`, immersive stage `16→14`, side-sheet graded field `40→34`. No API/token-name change — primitive values only; the deep ceiling (16px) and the wash floor (1px) hold. A subtler blur is **more transmissive**, so two atlas surfaces need a re-verify:

- **`src/platform/chrome/dock/Dock.css:86`** pins `--glass-opacity-dock: 0.9` (your O-DIR-4 raised it 0.74→0.9 to fight content bleeding through the dock). A subtler resting blur is more transmissive → more bleed-through → the 0.9 pin may no longer suffice. Re-verify dock legibility over your busiest content on adopting 7.0; if it bleeds, the lever is your own opacity pin, not the library blur.
- **`src/charts/legend/VizOptions.vue:64`** remaps `--glass-blur-floating: var(--glass-blur-overlay)` (the options panel wears the heavier overlay tier); `:329` carries a stale `blur(24px)` comment; `:352-353` reads `--glass-blur-wash`. The overlay rung moved 13→11, so this panel's frost lightens — re-verify its read.

## Contract 2 — the dialog-corner bind (+ the deferred shape fork)

`--radius-dialog` now binds `var(--radius-card)` (was `var(--radius-2xl)`) — value-invariant in every shipped config, repaints nothing. No atlas action for the bind.

The corner-SHAPE fork (round the dialog vs squircle the card family) and the inner-control affordance are **eye-decided at the glass-ui pre-tag paint lane (Q002/Q003) and are NOT yet chosen**. If that lane picks the card-family squircle option, your chart cards would read a Chrome superellipse — a new, unrequested identity on your highest-traffic surface. That option is NOT the primary (its blast radius exceeds the dialog-consistency ask); should it nonetheless ship, this channel will carry the atlas-chart-card superellipse census before the 7.0 tag.

## Booked follow (glass-ui side, not this wave)

A `ladder-derive` structural cleanup is booked: the four hand-tracked blur literals (the retina overlay override, the native `::backdrop` reader, the immersive-scrim literal, the side-sheet field) + the retina media override should derive from the ladder primitives so a future recalibration travels with the ladder. Recorded so the next pull does not re-suffer the missed-literal class; no atlas impact.
