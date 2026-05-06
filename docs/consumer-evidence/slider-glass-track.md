# Consumer Evidence — `Slider variant="glass-track"`

**Source**: `src/components/ui/slider/Slider.vue:19` (variant prop union); `src/components/ui/slider/Slider.vue:170-207` (scoped-CSS recipe)
**Demo consumer**: `demo/stories/primitives/slider-glass-track.vue:142`
**Glass-ui wire-or-retire pass**: I.W1.E (per I invariant 11; per H FINAL deferred)
**Verdict**: WIRE (sub-bar; demo is canonical Storybook-as-oracle consumer)

## Verification command (run at HEAD)

```bash
rg -n 'variant=.glass-track.|variant: .glass-track.' src/ demo/
```

Expected hits at HEAD: `demo/stories/primitives/slider-glass-track.vue:142,162,183,247,271,295` (one demo file; six template-attribute mounts across three shape exemplars and three dock-keep-open round-trip compositions).

## Source-of-truth file:line for variant definition

H W3 verified Slider's `glass-track` variant is **not a CVA factory branch**; the variant is encoded as a string-literal union on the component's prop signature plus a scoped-CSS recipe inside `Slider.vue`:

- **Prop union**: `Slider.vue:19` — `variant?: 'standard' | 'spectrum' | 'timeline' | 'glass-track'`
- **Variant class flag**: applied via `glass-slider--glass-track` class binding in the template
- **Scoped-CSS recipe**: `Slider.vue:170-207` — five descendant selectors (`.slider-track`, `:hover .slider-track`, `.slider-range`, `.slider-thumb`, `.slider-thumb:active`) compose the glass-bg-subtle-at-rest + glass-bg-medium-on-hover + cartoon-shadow-accent-on-press grammar.

## Use case

The `glass-track` variant is the canon scrub for the glass-ui slider — subtle glass tier at rest, medium tier on hover, cartoon-accent thumb when actively dragged. The W3 story (added in H tranche per R3 residual) exercises the variant across three shape exemplars (default, accent-tinted range, spectrum-tinted thumb) and three dock-keep-open round-trip compositions that pair the variant with `:keep-dock-open` to verify the `DOCK_KEEP_OPEN_SINK_KEY` round-trip stays clean.

## Notes

H FINAL (β audit row 246) named this variant "may emit evidence doc in a future tranche" — I.W1.E lands the doc per I invariant 11 (sub-bar CVA variants emit evidence docs OR retire; no more "may emit"). Note that "CVA" is used loosely here: the glass-track variant is a prop-union + scoped-CSS pair rather than a `cva()` factory branch, but it falls under the same wire-or-retire bar because it is a public variant value with a single named consumer. Demo file is the canonical consumer per the Storybook-as-oracle convention. If the proof grep fails at any future audit, the verdict reverts to `library-orphan`.
