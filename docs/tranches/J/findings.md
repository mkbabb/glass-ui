# J — User findings (verbatim, 2026-05-06)

Captured at tranche open. Each row is a research target for the J pre-research wave.

## Dock subsystem

1. Docks that exceed a max width or height — inner container should scroll.
2. Top dock collapsed state — needs proper animated in/out (currently jerks / instantly transitions). **Cornerstone**.
3. Dock blurs (glass blur) — reduce.
4. Drag a slider — the dock holds; this section needs to be refined.
5. Vertical rail (slider page screenshot) overflows — remove the dev text therein.
6. DockPopover should not be a special component — or, if it is, it must DRY-reuse our other components properly, and we should better support nesting many other component types within the dock, animated, idiomatically.

## Aurora + blob

7. Blob section — should become its own proper section with a configurator (mirroring aurora).
8. Aurora configurator — needs refinement; proper scroll-wrapping within docks/tabs headers.
9. Aurora configurator (screenshots) — at the sides, has shadows and clips.
10. Aurora items — should not have a top black padding bar.
11. Speedtest aurora preset — add as a preset; consult `../speedtest/src/composables/useAuroraPolicy.ts` + `../speedtest/src/config/auroraConfig.ts`.

## Form primitives

12. `/primitives/slider` — needs to be refined; padding standardized.
13. Number Field — refined and rounded.
14. `Slider · Glass Track` — greatly enhanced and refined.

## Data + composition

15. Table items (status field badge) — text vertically and horizontally aligned, idiomatically.
16. `DATA · FUZZY SEARCH` — controls and design need to be refined.
17. `clearSearchCache` — rename; the button is not visible (contrast); not using proper button design language.
18. Basic horizontal pager — weak; `<GlassCarousel>` story pager is the better idiom.

## Constraints (binding for J)

- NO quick solutions. NO workarounds.
- Idiomatic, gestalt approaches only.
- Architectural transpositions in service of elegance, simplicity, performance — necessary and desirable.
- NO legacy code.
- This is a development product.

## Source-of-truth screenshots

- `'/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/TemporaryItems/NSIRD_screencaptureui_Mtop56/Screenshot 2026-05-06 at 10.16.15.png'` — vertical rail overflow + dev text
- `'/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/TemporaryItems/NSIRD_screencaptureui_rPXlzu/Screenshot 2026-05-06 at 10.23.32.png'` — aurora configurator side shadow/clip
- `'/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/TemporaryItems/NSIRD_screencaptureui_eI2QRR/Screenshot 2026-05-06 at 10.23.41.png'` — aurora configurator side shadow/clip
