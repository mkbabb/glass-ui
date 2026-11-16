# Orchestrator note for critics and fix seats: two keyframes findings against this release's items (value-js-63, keyframes prod on 11.0.0)

The evidence is `~/.dev-logs/feedback-canon/kf-apply/probe.mjs`, with results in `prod-r1.json` and `prod-r2.json` (read-only). Each item extends an item this release touches, so critics treat them as defects of those items and fix seats cure them.

1. **K12, Slider (extends O-181 and O-196, lane L2).** With a scrubber Slider in view during playback, glass writes `style` on `.slider-range` and `.slider-thumb` every frame, about 121 writes a second each on the keyframes cube. These are layout-affecting position writes, so they force a layout every frame. The range and thumb must move by `transform` only: `translate` for the thumb, `scaleX` or `translate` for the range, with any taper or radius held by a counter-scale or a fixed geometry. Gate, in both engines: during a 2 s clock-driven playback, the Slider subtree causes 0 layouts (PerformanceObserver layout-shift plus the layout count from a trace, or style-recalc counts), and every per-frame write is to `transform` or a transform-only custom property.
2. **K15, Sheet (extends O-179, lane L3).** On load at 390, the bottom sheet (`.controls-drawer-content`) is the only layout-shift source on keyframes' amiga scene, with CLS 0.018 and 0.004 across two prod runs, as its first detent settles. The detent rise must be transform-only, from first paint. Gate: CLS from the Sheet is 0 at load in both engines, at 390 and 1440.

## Two fourier findings (value-js-63, the fourier restraint pass; fourier PR mkbabb/fourier-analysis#17). Critics raise them as defects, and fix seats cure them.

3. **G13: Configurator `aside-side="left"` swaps placement but not widths.** At 64rem and up, the template stays `minmax(0,1fr) minmax(aside-min, aside-max)`, while `[data-aside-side="left"]` moves the aside to column 1 and the stage to column 2 (`src/components/configurator/styles.css`, the `@container (inline-size >= 64rem)` flip, confirmed on master). The controls take the 1fr column, and the stage is squeezed into the aside band. Under `[data-aside-side="left"]` the template must reverse to `minmax(aside-min, aside-max) minmax(0,1fr)`, with the gallery dock following. DOM and tab order stay as they are (WCAG 1.3.2). Gate, at 1440 in both engines: with left and with right aside, the stage's width is the larger column and the aside's width lies within [aside-min, aside-max]. It must be RED on v11.0.0. fourier holds its controls-on-the-left canon until this ships.
4. **G14: SegmentedTabs pill strips are 26–28 px tall under a coarse pointer.** fourier's 390 workspace tabs (Controls / Canvas) show this; the owner's floor is 44 px (C-42). Under `(pointer: coarse)`, every tab's hit target is at least 44 px tall. Raise the strip's own height, not an invisible padding that overlaps neighbours. Gate: at 390 coarse, in both engines, every tab's box height is at least 44 and no two tabs' hit rects overlap. It must be RED on v11.0.0.

## O-211: a DockLayerGroup with no switcher pays for the switcher (daraksha via value-js-63, measured on 11.0.0). Critics raise it, and fix seats cure it.

Sizes are esbuild minified, gzip -9, with vue, reka, vueuse, lucide and keyframes external:
- GlassDock + DockControl is 16,277 B.
- Adding DockLayerGroup brings it to 22,121 B, so +5.8 KB. DockLayer and DockSeparator add only about 0.3 KB.

DockLayerGroup's setup always calls `useSelectionGroup` (2,072 B), `useDragMorph` (3,325 B), `useDockCtaReceive` (1,387 B) and `useIntersectionPause` (859 B), even with `:show-switcher="false"`. That breaks daraksha's 120 KB per-route eager budget: NamePage is 125.5 KB and ScripturePage 123.0 KB (PR #5).

The cure: a layer group without a switcher statically pulls in only the crossfade and the faces. The switcher (the tablist, its indicator, the drag-morph and the CTA receive) becomes its own colocated component that the group renders only when it is wanted. That way a consumer that never uses it does not import it, and the public API is unchanged. Gate: a fixture importing GlassDock, DockControl, DockLayerGroup and DockLayer with no switcher bundles to at most GlassDock + DockControl + 1 KB gz. The switcher still works when shown (the existing switcher specs stay GREEN in both engines). It must be RED on v11.0.0.

## O-212: SelectContent clips its rows under a trigger wider than 22rem (value.js color via value-js-65, on 11.0.0). Critics raise it as a defect, and fix seats cure it.

The plate clamps at `max-inline-size: min(22rem, 100vw - 2rem)` (`src/styles/glass/overlay-plate.css:333`), while the viewport is forced to `min-w-(--reka-select-trigger-width)` (`SelectContent.vue:152`). With a 386 px trigger, the viewport overflows the 352 px plate by 34 px, every row loses its right edge, and the highlighted pill runs square into the plate. The cure and its gates are in `docs/tranches/BL/driver/glass-11.0.1-scope.md` item 2 on master (read it with `git -C ~/Programming/glass-ui show master:docs/tranches/BL/driver/glass-11.0.1-scope.md`). 11.1.0 must carry the same cure, so that 11.0.1's forward-merge into it is clean.

## O-213: the Configurator shell's floor ignores its own margins (fourier via value-js-65, on 11.0.0). Critics raise it with G13, and fix seats cure it.

`.configurator-shell { min-inline-size: min(20rem, 100%) }` (`src/components/configurator/styles.css:72`): the `100%` is the containing block, so the shell's own inline margins are never subtracted from it. Take a 360 viewport, less the 15 px stable scrollbar gutter, which the owner ruled on 2026-11-10 stays. With `margin-inline: 16px`, the shell was 320 px in a 313 px column, 7 px past the gutter. Make the floor margin-safe at the root: the shell never lays out wider than its column, whatever margin a host gives it. Gate, at 320, 360 and 390 with a classic scrollbar and a shell margin of 0 or 16 px in both engines: the shell's border box stays within its column. It must be RED on v11.0.0.

Also part of O-213: the overlay cap `min(22rem, 100vw - 2rem)` ignores the scrollbar gutter, and it clamps a consumer-measured anchored panel below its anchor. That is cured with O-212 by one bound (master `docs/tranches/BL/driver/glass-11.0.1-scope.md` item 2).

## O-214: after a pointer open, Select paints the focus ring on the selected row and not on the trigger (value.js color via value-js-65, on 11.0.0). Critics raise it, and fix seats cure it.

The repro, root and gates are in master `docs/tranches/BL/driver/glass-11.0.1-scope.md`, item 2b. 11.1.0 carries the same cure, so the 11.0.1 forward-merge is clean.
