# ASK-GU-ONE-BLUR-LEVEL: a glass control inside a glass plate does not blur again

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: precepts `restraint.md` ("one blur level everywhere, and never a blur inside a blur").

**What I see.** The stage's run seat (`Button`, `glass-capsule glass-deep`) carries `backdrop-filter: blur(17.75px) saturate(1.6-1.8)` inside the card's `blur(16px) saturate(1.5)`, in 8 of 8 idle and running cells (glass-canon r1 item 5). The page shows three blur values (card, Button, dock).

**What I ask.** A glass control seated inside a glass plate drops its own backdrop sampling (the plate already filtered the field), keeping its fill and rim; one blur value for plates.
