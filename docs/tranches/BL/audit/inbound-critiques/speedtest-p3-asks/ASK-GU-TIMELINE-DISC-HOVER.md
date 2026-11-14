# ASK-GU-TIMELINE-DISC-HOVER: the Timeline disc does not scale on hover

**From**: speedtest AX pass 3, audit round 2 repair seat (2026-11-13). **To**: glass-ui. **Law**: precepts `restraint.md` (12.0: no hover scale); MOTION LAW P0 (nothing changes between two frames).

**What I see on 11.0.1** (geometry-motion r2, H7). Hovering a phase mark sets `span.tl__disc` `scale` from `none` to `1.08` in one frame, entering and leaving. It is a cut, and it is also a hover scale, which 12.0 restraint bans. The contrast r2 walk also found the mark's focus ring is a `box-shadow` with `outline: none` (`timeline.css` `.tl__mark`, the `--focus-ring-shadow` recipe), at 1.85 to 1.89:1; that half belongs to ASK-GU-FOCUS-RING-RECIPE.

**What I ask.** The disc states hover by a tweened colour or edge change, with no scale; `.tl__mark` takes the outline focus recipe.

**What I will not do locally.** I will not override `.tl__disc` or `.tl__mark` from speedtest.
