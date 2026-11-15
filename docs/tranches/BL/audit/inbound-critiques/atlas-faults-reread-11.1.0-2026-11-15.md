# The glass-attributed faults, re-read against 11.1.0

To the glass-ui maintainers, 15 November 2026.

Two audits of the Connectivity Atlas listed faults we attributed to glass:
`~/.dev-logs/owner-1112/LAST-TEN/atlas/GLASS-FAULTS.md` (rows GF-1 to GF-9 below, by section number) with
its wider list `FINDINGS.md` (L-rows and the folded PA rows), and
`sci-report/atlas/docs/tranches/U/design/PHONE-AUDIT-GLASS-2026-11-15.md` (rows 1 to 8, which are G-1 to G-8
in its wider list `PHONE-AUDIT-2026-11-15.md`). Both audits ran on the Atlas's own glass line
(`u/sp-integ-glass`, reported as 10.1.2), not on a release. For every row that touches a glass component
(dock, rail, tooltip, select, sheet, carousel, command, disclosure, ExpandableContainer, theme), I read the
component on `release/11.1.0` at `06da3bb9c` with `git show release/11.1.0:<path>` and judged whether the
cause the audit names is still in the source. This is a source reading, not a run: "present" means the
named cause is in the 11.1.0 code; "gone" means it is not; "cannot tell" means the source does not settle
it. Atlas-owned rows that only sit on a glass component are listed so the set is complete.

All paths are on `release/11.1.0` under `src/` unless stated. Where a row matches your animation audit
(`docs/tranches/BL/audit/animation/AUDIT.md`, on `master` and `release/11.0.2`, not on `release/11.1.0`), I
name the row.

## One line per row

| Row | Component | Verdict on 11.1.0 | Evidence |
|---|---|---|---|
| GF-1 / L-02 | reduced-motion rule | **present** | `styles/utilities/a11y-overrides.css:45–54`: `transition-duration: 0s !important` and `animation-duration: 0.01ms !important` on `*` inside `@layer components`, so a consumer's unlayered `!important` fade still loses. Your audit row 13 (W-B.17, 11.2.0). |
| GF-2 / L-04 | Sheet, open on a busy phone | **present** | `components/sheet/SheetContent.vue:130` `useSpringMount({ open: slideOpen, preset: "panel" })` and `:153–170` (the travel is a main-thread position written each frame), so a long task at open still erases the path. |
| L-24 | Sheet timing against other overlays | **present** | Same spring and preset (`SheetContent.vue:130`), `components/sheet/motion.ts:15` ("`p` is left unclamped so the spring's overshoot IS the settle"). Your audit row 36 and INBOUND O-264, booked for 11.1.1. |
| GF-3 / L-12 | theme change, `useGlobalDark` | **present** | `composables/dark/useGlobalDark.ts:88–111`: the toggle flips the class (with `.no-transition` when asked) and starts no view transition. Your audit row 10. |
| G-5 (phone row 5) | DarkModeToggle, theme flip | **present** | Same as L-12; `components/dark-mode-toggle/DarkModeToggle.vue:24, :47` calls `toggleDark` directly. |
| GF-4 / L-14 | ExpandableContainer close | **present, and starker** | `components/expandable-container/ExpandableContainer.vue:2` `<Teleport to="body" :disabled="!open">` sends the subtree home the moment `open` turns false; `components/expandable-container/styles.css:42–45` animates the enter only. The audited build carried our origin travel (`bd82a5425`); 11.1.0 has no close travel at all. Your audit row 27. |
| GF-5 / L-26 | GlassDock fold after leave | **present** | `components/dock/constants.ts:68` `DOCK_COLLAPSE_DELAY_MS = 3600` and `components/dock/composables/useDockState.ts:113`: one fixed idle window, no dwell term. (The audited build had our dwell linger, `dockLinger`.) Booked as W-I.8 in 11.2.0 (INBOUND O-275). |
| GF-6 / L-28 | Carousel, mouse drag | **present** | `components/carousel/useCarousel.ts:35–47` wires `useDeck` and `useDeckSnap` only; no file under `components/carousel/` handles a pointer event. `components/deck/composables/useDeckSwipe.ts:39–74` has a mouse path, but the carousel does not use it. |
| GF-7 / L-18 | CommandDialog close | **present** (glass half) | `components/command/CommandDialog.vue:67–110` holds nothing open through the dialog's exit; your audit row 12 books the cure for 11.1.1. The atlas half (`DockSearchPalette.vue:29` clearing the query on close) is ours. |
| GF-8 / L-31 | CommandInput text size on touch | **gone** | `styles/tokens/light-dark.css:17–35`: under `@media (pointer: coarse)` the root sets `--control-text: max(var(--type-small), 1rem)`; `styles/tokens/sizing.css:76` `--dropdown-text: var(--control-text)`; `components/command/styles.css:60` gives the input `font-size: var(--dropdown-text)`, so it is 16 px on touch. This came in `338a1257d`, which our line lacks. To confirm on a real phone. |
| GF-9 / L-32 | Tooltip opening without intent | **present** | `components/tooltip/Tooltip.vue:29–37` passes no `ignoreNonKeyboardFocus` to reka's `TooltipRoot`; reka-ui 2.10.1 `dist/Tooltip/TooltipTrigger.js:70–74` opens on any focus that did not follow a pointer press (focus return after Escape included), and `:59–65` opens on the first `pointermove`, which a resting pointer gets when the page lays out under it. `ignoreNonKeyboardFocus` alone would not cover the Escape case, since that focus is keyboard-modal. |
| L-34 | Collapsible keyframes | **present** | `components/_shared/disclosure/disclosure.css:7–25` and `:134–139` animate `block-size` (layout) on open and close. 11.1.0 removed the fade, so the reveal is layout-only. |
| L-21 | rail to bar across 768 px | atlas | `sp-integ-atlas/src/platform/chrome/dock/Dock.vue:441, :519` unmounts one GlassDock and mounts the other; nothing in glass to re-read. |
| L-23 | filter drawer height while open | atlas | Late sections mount inside an auto-height `SheetContent` (`FilterPanel.vue`); the sheet sizing is as designed. |
| G-1 (phone row 1) | Select sheet seating | **gone** | `components/select/SelectContent.vue:62–65`: the sheet's reference is the bare viewport foot. The cause, `sheetFootRect` scanning every `.glass-dock`, exists only on our line (`64f5f2483`). Note that on 11.1.0 the sheet therefore sits on the viewport foot and covers a fixed foot bar, which is what that commit set out to fix. |
| G-2 (phone row 2) | Select sheet, swipe on a short list | **present** | `components/select/SelectContent.vue:67–75` (`bodyLock: false`); `styles/glass/overlay-plate.css:369–372` puts `overscroll-behavior: contain` on the viewport, which does nothing when the list does not overflow. |
| G-3 (phone row 3) | Tooltip on touch, long press | **present** | No touch path in `components/tooltip/*`; reka-ui `dist/Tooltip/TooltipTrigger.js:60` returns on a touch `pointermove`. No long-press handling in GlassDock's control path for a label. Your INBOUND O-251 (3) and O-276 book "every dock control shows its label through Tooltip" for 11.2.0, which does not say touch. |
| G-4 (phone row 4) | Select sheet heading | **present** | `components/select/SelectContent.vue:55–82`: the sheet form anchors to the viewport foot and renders no heading from the trigger's name. |
| G-6 (phone row 6) | detentless bottom Sheet drag | **present** | `components/sheet/SheetContent.vue:88–94` (`detented` only with a ladder) and `:143–151` (a sheet with no ladder hands the engine `[1]` and "the engine simply never runs"). |
| G-7 (phone row 7) | tall Sheet's spring overshoot | **present** | `components/sheet/motion.ts:11–27` (`sheetSlideTransform`, `p` unclamped) with the panel preset at `SheetContent.vue:130`. Your O-264 ruling for 11.1.1 (critically damped, never past rest) would cure it. |
| G-8 (phone row 8) | dock control focus ring | **cannot tell** | The ring is an outline (`components/dock/styles/index.css:305–306`) on a control with a stadium radius (`components/dock/styles/controls/icon-button.css:52–55`), and current engines draw outlines along `border-radius`, so 11.1.0's own rule should be round. A square ring points at a different focused element (a wrapper or an atlas control). The phone note's path, `components/dock/styles/controls.css`, does not exist. Needs a browser check on 11.1.0. |
| A-4 | entity sheet body | atlas | The audit itself says glass's sheet is fine (`EntityDetail.vue` composition). |
| A-7 | entity sheet scroll leak | atlas | The inner `.entity-detail__body` lacks `overscroll-behavior` (`EntityDetail.vue`). Same leak family as G-2, but not glass code. |
| A-8 | Back while a sheet is open | atlas | No history entry (`EntityDetail.vue`, `FilterPanel.vue`). |
| A-14 | drawer cannot be swiped away at 360 px | atlas, plus G-6 | Atlas half: no fading scroll, no detents (`FilterPanel.vue`). The glass half is G-6, **present**. |
| A-15 | entity sheet ignores the first Escape | atlas | Focus is not moved into the non-modal sheet (`EntityDetail.vue`). |
| A-16 | plate tools cover the legend | atlas | Plate head layout (`VizPlate.vue`); the dock grows as designed. |
| A-17 | bar section name truncated | atlas | `components/select/SelectTrigger.vue:63` clamps to one line by design (`[&>span]:line-clamp-1`); the label text is atlas's. |

## Rows that survive on 11.1.0

37 rows touch a glass component. On 11.1.0, **25 rows survive with a glass cause, covering 14 distinct
faults**; 3 rows are gone (GF-8/L-31 and G-1); 1 cannot be told from source (G-8); 8 are atlas's own.

1. Reduced motion is a cut that a consumer cannot relax (GF-1, L-02).
2. The Sheet's travel runs on the main thread and is lost to a long task (GF-2, L-04).
3. The Sheet's panel spring is slow and overshoots, off the top of a tall sheet (L-24, G-7); booked 11.1.1.
4. The theme flips in one frame (GF-3, L-12, G-5).
5. ExpandableContainer's close has no frames (GF-4, L-14).
6. The dock folds after a fixed window, not a dwell linger (GF-5, L-26); booked 11.2.0.
7. Carousel has no mouse-drag path (GF-6, L-28).
8. CommandDialog drops its list in the first frame of the close (GF-7, L-18); booked 11.1.1.
9. Tooltip opens on programmatic focus and on a resting pointer (GF-9, L-32).
10. Collapsible animates layout (L-34).
11. A swipe on a short Select sheet scrolls the page (G-2).
12. Tooltip has no touch path; a long press fires the control (G-3).
13. The Select sheet does not name its field (G-4).
14. A bottom Sheet without detents cannot be dragged closed (G-6, A-14's glass half).
