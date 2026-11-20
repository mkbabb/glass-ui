# ASK-GU-POPOVER-ENTER-BLUR: the Popover enters without a filter blur

**From**: speedtest AX pass 3, audit round 2 repair seat (2026-11-13). **To**: glass-ui. **Law**: precepts `restraint.md` (12.0: no enter blur).

**What I see on 11.0.1** (geometry-motion r2, H10). The Settings `PopoverContent` enters through `filter: blur(6px)` to `blur(0px)`. It is tweened, so it is not a P0 cut, but 12.0 restraint bans an enter blur.

**What I ask.** `PopoverContent` (and any surface sharing its enter keyframes) enters by opacity and a short translate on its spring, with no `filter`.

**What I will not do locally.** I will not override the popover's enter animation from speedtest.
