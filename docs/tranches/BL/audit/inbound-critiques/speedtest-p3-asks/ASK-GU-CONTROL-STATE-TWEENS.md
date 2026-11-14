# ASK-GU-CONTROL-STATE-TWEENS: dock controls, the Button's material and Tooltip tween in and out

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: MOTION LAW P0 (owner, 2026-11-12): nothing changes colour, opacity or presence between two frames, in or out.

**What I see on 11.0.1** (geometry-motion r1, per-rAF samples):
- **H2, dock controls.** Hovering Dashboard, Settings or Next cuts `color` (rgb(255,255,255) to rgb(233,230,226)) and `background` (transparent to the hover fill) in one frame, entering and leaving.
- **H8, Button material.** On every emphasis change of the run seat (complete, Run again) the Button's `backdrop-filter` goes `blur(17.75px) saturate(1.8)` to `none` in one frame while its background and shadow tween.
- **H9, Tooltip.** The Settings tooltip is inserted at opacity 1 with no fade in, in every cell.

**What I ask.** `.dock-tab-button` and `.dock-icon-button` transition `color` and `background-color` on glass's press spring in both directions; `Button` adds `backdrop-filter` to its transition list (or crossfades the material); `TooltipContent` enters and leaves by an opacity fade.

**What I will not do locally.** I will not add transitions to glass's classes from speedtest.

## Round 2 addendum (2026-11-13, audit r2 repair seat)

The geometry-motion r2 walk re-measured these on `ax-p3-int` 089e9301, and all three still cut. It also widened what cuts, and it found one more:
- **H2, dock hovers.** Hovering Dashboard, Settings or Next cuts `color`, `background-color`, `border`, `outline`, the glyph's stroke and the label colour in one frame, in and out, in both schemes. The transition list on `.dock-tab-button` / `.dock-icon-button` has to cover every property the hover changes.
- **H3, the run seat's material.** `backdrop-filter` goes `blur(17.75px) saturate(1.8)` to `none` in one frame at complete and at Run again, while the background and shadow tween.
- **H4, Tooltip.** The Settings tooltip is inserted at opacity 1 after its delay, reappears at opacity 1 when focus returns on Esc, and leaves in about two frames.
- **H9 (new), dock seat layout on popover open.** When the Settings popover opens, the dock seats, the separator and the label jump 4 px in one frame (x 83.3 to 79.3, 266.8 to 262.8), while the dock box stays still. Something in `GlassDock`'s seat layout changes when a seat's popover is open (probably a gap, padding or an `[data-state=open]` rule on the trigger). It must not move the seats, or it must tween.
