# ASK-GU-FOCUS-RING-RECIPE: every glass focus ring is the outline recipe at 3:1

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: WCAG 2.4.11/1.4.11; GLASS-RULING item 5 (`--focus-ring-shadow` is removed; the outline recipe is the ring). **Folds in**: p2 ask 7 (dock ring ink).

**What I see on 11.0.1** (contrast-a11y r1):
- Dock seats: a 2px outline at 48 % alpha measures Dashboard 2.41 / 2.75, Settings 2.68 / 2.41, Next 2.34 against the dock.
- `Timeline` marks and the `Slider` thumb use `box-shadow: var(--focus-ring-shadow)` with `outline: none` (the Timeline rule is in `dist/timeline.css`), measuring 1.85 and 2.07.
- `SegmentedTabs` show the browser's default `outline: auto 1px` (2.97-3.64).

**What I ask.** One focus recipe on every focusable glass part: `outline: var(--focus-ring-width) solid var(--focus-ring-color)` with an offset, at 3:1 against the plate it sits on in both schemes; no `--focus-ring-shadow`.

## Round 2 addendum (2026-11-13, audit r2 repair seat)

Contrast-a11y r2 on 089e9301: the dock seats Dashboard, Settings and Next are 2.41 to 2.75:1 (a 2 px outline at 48 % alpha); the Timeline marks 1.85 to 1.89:1 (box-shadow, `outline: none`); the Detail slider 2.07:1 (box-shadow); `SegmentedTabs` falls to the UA `outline: auto 1px` (p50 2.76 to 3.64). Glass 11.0.1 still ships the `--focus-ring-shadow` recipe in `timeline.css` (`.tl__mark`), `slider/styles.css` and `dark-mode-toggle.css`.
