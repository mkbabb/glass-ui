# INBOUND O-156 into 10.1.5 (orchestrator note, 2026-11-05)

From parkway via `sci-report-36`. The owner's frame is `~/Programming/slides/docs/tranches/NPIG/feedback/2026-11-05/ss-09.11.42.png` (read-only).

**On hover, a large dark ellipse bleeds past both ends of the dock.** parkway's PageDock at 10.1.4, dark mode: GlassDock + DockControl + DockSeparator, two SegmentedTabs groups and a Popover trigger. The ellipse is about 1.1× the dock's width and a third of its height, centred, and paints past the rounded plate's caps on both sides: a hover shadow or sheen layer sized to the wrong box.

It is the same family as O-155's crescent (a layer behind the plate whose outline is not the plate's), here on HOVER. Every later critic and fix seat of 10.1.5 treats it as IN SCOPE.

Gate, both engines, light and dark, 390 and 1440: on a wide dock carrying segmented groups (parkway's composition, or a demo equivalent with two SegmentedTabs and separators), hovered and at rest, no layer of the dock paints outside the plate's outline plus its declared shadow. Name the layer at 10.1.4 (selector and property). RED on 10.1.4.

## Addendum O-165: daraksha witness (value.js, 2026-11-05)

On 10.1.4, hovering daraksha's theme control draws one large ellipse across the whole controls dock instead of the control's own pill. The control is a DockControl, aria-label "Dark mode", in a GlassDock with `:collapse="false" fit-content` and two or more seats. It happens in both themes, at 1800 and 430, on two independent passes, with no consumer override.

The frames are in `~/.claude/review-frames/daraksha-v3/`:
- `03a-dock-ellipse-on-theme-hover-1800-light.png`
- `03b-dock-ellipse-and-tooltip-430-dark.png`
- `p2/dock-hover-*.png`

The source is `~/Programming/daraksha/src/shell/SiteDock.vue` and `src/shell/ThemeControl.vue` (read-only).

Gate: hovering a DockControl in a fit-content dock with two or more seats paints only that control's own pill, and no layer reaches past the plate's outline. This holds in both themes, at 1800 and 430, in Chromium and WebKit, and it fails on v10.1.4.
