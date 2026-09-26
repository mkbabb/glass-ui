# D4-G · the owner's glance on Q-11: does a selection body travel in a grid?

This is REGISTRY §6.2 question 1, prepared for the owner. The seat cannot answer it; it films the choice.

## The question

`ToggleGroup.vue:30-35` declines a travelling indicator: "a glide mark across a field that wraps to three rows is not a segmented control, it is a mark taking a shortcut through empty space". Q-11 asks whether to keep that ruling. Its pass-2 default is (a), hold the header, until you rule.

| option | what you see |
|---|---|
| (a) hold the header | no body. Each tile carries its own selected edge, and the commit is a fade (the **edge** panel) |
| (b) glide | one body travels from the old tile to the new one across the gap, on the overshooting panel spring (the **glide** panel) |
| (c) lift-and-land | the body lifts off the old tile and lands on the new one with a pop, and nothing crosses the gap (the **land** panel) |

If you choose (a), D4-G is RETIRED for grids and survives only as SegmentedTabs' existing indicator.

## What to open

Each video shows the three options side by side: **glide | land | edge**, left to right. Each panel has its name in its bottom-right corner. Every panel makes the same four pointer commits in real time, trimmed so the three run in step.

| site | light | dark |
|---|---|---|
| K1, keyframes.js Spring presets (2×2) | `preset-light-chromium.mp4`, `preset-light-webkit.mp4` | `preset-dark-chromium.mp4`, `preset-dark-webkit.mp4` |
| K2, keyframes.js easing specimens (auto-fill grid in FadingScroll) | `specimen-light-chromium.mp4`, `specimen-light-webkit.mp4` | `specimen-dark-chromium.mp4`, `specimen-dark-webkit.mp4` |

- K1's walk starts on Snappy (top right), then goes Bouncy (the diagonal), Gentle, Smooth, Snappy.
- K2's walk starts on ease-in-quad (row 1, right), then goes ease-in-cubic (two rows down, left), ease-out-cubic, linear, ease-in-quad.

The frame strips hold one commit still: K1 Snappy → Bouncy, and K2 ease-in-quad → ease-in-cubic. Rows are **glide, land, edge**, top to bottom. Columns are 0, 40, 80, 120, 160, 220, 300, 420 and 700 ms after the commit. The frames are exact: every animation on the page is paused and stepped to each time (`film.json` → `times`).

| site | strips |
|---|---|
| K1 | `preset-{light,dark}-{chromium,webkit}-strip.jpg` |
| K2 | `specimen-{light,dark}-{chromium,webkit}-strip-60pct.jpg`, scaled to 60 %. The full-size strips are over 400 KB and stay in scratch: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p2/bt-G/film-scratch/specimen-{light,dark}-{chromium,webkit}-strip.jpg` |

`chromium` is headless Chromium 149. `webkit` is **Playwright WebKit 26.5, which is not Safari**. Real Safari is **UNMEASURED (owner's safaridriver checkbox)**.

## What to compare

1. **The gap.** In glide, K1's diagonal crosses the gutter and slides under Gentle for about 80-160 ms (strip columns 3-5). K2's move crosses a whole row. This is exactly what the header objects to. Does it read as one object moving, or as a mark cutting through empty space?
2. **Land.** The body fades up off Snappy in the first 110 ms. From about 120 ms it grows onto Bouncy (0.92 → 1.035 at about 300 ms), dips to 0.992, and settles by 520 ms. Does the pop carry the commit without travel, or does it read as a blink?
3. **Edge.** The old edge fades out over 180 ms and the new one fades in over 60 ms, with no motion. This is what the floor ships with no body. Is it enough for a card-like tile (D-2: engagement; the pass-1 critics called it "not iOS-27 grade")?
4. **Dark mode.** The body is a raised, lighter plate with a light edge. Does it read as a lifted card rather than an outline or a focus ring?
5. **K2, the scrolling grid.** Does a body that moves in a scroll port read differently from one that moves in a fixed 2×2?

## What all three share, so you judge only the carrier

- The tile corner is the floor's card rung (`--radius-field`, 16 px; TF-1, Q-1 (a)).
- The tiles are flush (Q-2 (b), the pass-2 default): no plate at rest, and the seam only.
- The body and the edge use the floor's edge ink (`--selection-edge`, TF-2). The body adds a raised light fill and a soft shadow (Q-3 (c)).
- The motion values are prototype choices, not tuned:
  - glide rides `--spring-panel` (0.45 s × `--motion-tempo`, peak 1.042 of the travel);
  - land is a 110 ms lift, then a 520 ms landing pop;
  - edge is the floor's `--engage-control-engage-attack` (60 ms) and `-release` (180 ms).

The prototype is `../D4-G-block/g-body.patch` (a `travel="glide" | "land"` prop on ToggleGroup) on HEAD plus `../floor.patch`. The arms are `../D4-G-block/route-{glide,land,edge}/`, and the tool is `../../harness/film.mjs`. `film.json` records every file, its size, the builds and the load. The machine was shared: load 27-34 during the filming (`../D4-G-block/logs/film.log`). The videos are real-time screencasts under that load, so judge the motion from the strips if a video stutters.

## Your answer

Q-11 (a), (b) or (c). If you choose (b) or (c), read `../D4-G-block.md` §3 first: the block test found one registration cell in which the body leaves its tile.
