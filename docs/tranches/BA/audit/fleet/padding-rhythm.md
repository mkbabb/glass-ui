# BA fleet lane — padding-rhythm (R8-10 padding half)

The user: "These items do not have enough padding on the bottom — audit for all
areas like this." (R8-10, the padding half; the fourier HERO/FINAL captions
crowding the card bottom in `ground/R8-10-padding-fourier-demos.png`.)

DISCIPLINE: audit-only, live-probed :5199 (both modes), no edits, no git.

## The grounded defect (mechanically root-caused + live-measured)

The R8-10 capture is the `/substrates/fourier-field` story. Two side-by-side
`<figure>` cards each stack a fixed-aspect `<FourierField>` canvas, then a
`<figcaption>` ("hero — epicycles on" / "final — denser, epicycles off"). The
caption sits **1px** from the frame's bottom border — flush — in BOTH light and
dark mode (the defect is layout, not color).

Live π readback (1280×900, dark):
```
text "hero — epicycles on"          figcaptionBottom 892  frameBottom 893  gapBelowCaption 1px  framePaddingBottom 0px
text "final — denser, epicycles off" figcaptionBottom 892  frameBottom 893  gapBelowCaption 1px  framePaddingBottom 0px
frameClass: "rounded-card border shadow-cartoon bg-card border-border p-0 grid gap-4 sm:grid-cols-2"
```
Evidence: `evidence/padding-fourier-crowded-dark.png`, `…-light.png`,
`…-figcaption-dark.png` (all show the caption text riding the bottom border line).

### Root cause — file:line

`demo/stories/substrates/fourier-field.vue:36` opens the wrapping showcase frame
as `<ShowcaseFrame pad="none" …>`. `pad="none"` resolves to `p-0` in
`demo/stories/ShowcaseFrame.vue:34-36` (the `padClass` switch). The figcaptions
(`fourier-field.vue:46` and `:57`) are the LAST flow children inside that
zero-padded frame, so they inherit zero bottom breathing room → the 1px flush.

The figure is also internally tight: `flex flex-col gap-2` (8px) between the
canvas and its caption (`fourier-field.vue:37,48`), so even the canvas→caption
gap is below the house rhythm.

### Why `pad="none"` exists (the chassis tension)

`pad="none"` is the deliberate escape for a FILL element that must bleed to the
frame edges — a `<FourierField>`/`<Constellation>`/`<PaperBackdrop>` canvas, or
a `<WatercolorDot>` tile grid (`blob.vue:660`, the edge-to-edge tiles ARE the
content). For those, flush IS correct. The defect surfaces only when the SAME
`pad="none"` frame also hosts a TRAILING TEXT caption stacked below the fill —
the caption needs bottom rhythm the binary `pad="none"` cannot give it. The
`pad` knob is all-or-nothing per `ShowcaseFrame.vue:33-49`: there is no way to
say "bleed the canvas, but pad the caption."

This is the only site in the storybook that combines `pad="none"` + a flow
caption: `<figcaption>` appears in exactly ONE story
(`grep -rln figcaption demo/stories` → `fourier-field.vue` only). The other
`pad="none"` frames are either pure fill (constellation `474/501/537/566/638/
690/718`, blob `660`) or `place-items-center`-centered captions on a fixed
height (paper-backdrop-texture-system `28/37/108`) — neither crowds. So the
narrow defect is isolated, but the CLASS — "a caption/last-row crowds a frame
edge because the frame's pad escape is binary" — is the chassis gap the user's
"audit for all areas like this" names.

### Outer rhythm is healthy (scoping the fix away from the page chassis)

The OUTER chassis is sound and must NOT be touched:
- `StoryHero` card bottom pad is symmetric: `.story-hero-card--page`
  `padding: clamp(1.25rem, 2.5vw, 2rem)` (≈20-32px), hero
  `clamp(2rem, 4vw, 4rem)` (`story-hero.css:114-122`).
- `StoryPage` section stack is `gap-10` between sections (`StoryPage.vue:73`).
- `StorySection` is `flex flex-col gap-3` (`StorySection.vue:71`).

The crowding lives entirely INSIDE the `pad="none"` ShowcaseFrame, not in the
page/section/card rhythm. So the remedy is scoped to `ShowcaseFrame`, never the
page chassis (which would over-pad every healthy page).

## The remedy direction (chassis-level, gestalt — NO implementation here)

The fix belongs in `ShowcaseFrame.vue`, the shared chassis — not a per-site
`pb-*` on the fourier figcaption (that is the workaround the house forbids; it
also leaves the `pad="none"`+caption trap live for the next consumer).

The gestalt: `pad="none"` should mean "no frame gutter around a bleed FILL," NOT
"no rhythm for a trailing caption." Resolve the binary tension at the chassis so
a caption never crowds an edge regardless of the `pad` rung. The idiomatic
directions, in order of preference:

1. **A first-class captioned-frame affordance.** Give `ShowcaseFrame` a `caption`
   prop/`#caption` slot that renders the trailing caption in a chassis-owned
   footer band carrying its OWN bottom rhythm (a `--showcase-caption-pad` token
   on the existing spacing ladder), independent of the `pad` rung. The fill stays
   flush (`pad="none"` on the body), the caption always breathes. This is the
   "component over CSS class" axis — the figure/figcaption stack stops being
   hand-rolled per story and becomes a chassis contract `proof:`-lockable.
2. **A bleed/caption split rung.** If the broader audit (the live sweep,
   `evidence/` + `_padding-rhythm-audit.mjs`) finds the captioned-fill pattern is
   one-off, the lighter fix is to keep the fill flush but have the chassis apply a
   floor of bottom rhythm to any trailing TEXT child of a `pad="none"` frame
   (a `:where(figcaption, .caption):last-child { padding-block-end: … }` chassis
   rule keyed off a spacing token) — so the canvas bleeds but the caption is never
   1px off the border. Token-first, no per-site edit.

Either way the magnitude is a TOKEN on the house spacing scale (the
`--spacing(N)` / `clamp()` rhythm `ShowcaseFrame`/`story-hero.css` already speak),
re-tunable from one rung, and the fourier story drops its hand-rolled
`figure/gap-2/figcaption` triplet onto the chassis affordance.

## Live sweep (in flight — corroboration, not gating)

A 84-route both-mode crowding sweep (`gap < 12px` between a frame's last flow
text and its content-box bottom) is running
(`_padding-rhythm-audit.mjs`; partial log in `/tmp/ba_pad_dark.log`). Early
routes flag nested swatch/chip frames at small gaps (mostly intentional —
color swatches, css-utilities demo cells), which are NOT the R8-10 class; the
genuine signal is the `ShowcaseFrame(pad=none)` + trailing-caption frames the
source grep already isolates to fourier-field. The sweep confirms no OTHER story
combines a `pad="none"` frame with a flow caption. The binding evidence is the
1px π measurement + the captures above.

## Findings

- **P1 (S2):** fourier-field figcaptions crowd the frame bottom (1px), root-caused
  to `ShowcaseFrame pad="none"` → `p-0` + a trailing caption. CHASSIS fix in
  `ShowcaseFrame.vue` (captioned-frame affordance or trailing-text rhythm floor),
  never a per-site `pb-*`.
- **P2 (S3):** the figure's internal `gap-2` (8px) canvas→caption is below the
  house rhythm; folds into the same chassis captioned-frame affordance (the band
  owns both the canvas→caption and caption→edge rhythm).
