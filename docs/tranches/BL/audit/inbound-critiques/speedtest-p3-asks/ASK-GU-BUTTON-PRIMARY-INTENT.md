# ASK-GU-BUTTON-PRIMARY-INTENT: the primary reads as the one action at rest, and grows its intent on hover

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: GLASS-RULING item 3; precepts `affordance-map.md` "Intent first" (a plate, a fill or a shape that grows from the control, entering and leaving by a tween); OI-1 C1, C5, C6; ruling R-B. **Restates with r1 measurements**: p2 ask 11 (ASK-GU-BUTTON-PROTAGONIST).

**What I see on 11.0.1** (owner-eye r1 H-C1c, H-C5a, H-C6a):
- At rest, `<Button emphasis="primary" size="lg">` is a dark translucent pill in dark (`oklab(0.286 0.013 0.042 / 0.34)`, 111x44) and a muddy mauve-brown pill in light (`oklab(0.588 0.019 0.066 / 0.31)`), alone in about 600 px of card. It does not read as the pane's one action.
- On hover the plate does not change: same background, no transform; the largest pixel delta in the button is 45/765, a faint specular.

**What I did locally, inside the rules.** The verb's glyph is speedtest's own content, so it now states intent on hover and focus, tweened in and out: Start's play mark fills and leans forward 0.125 em, Stop's square fills, Run again's arrow turns back (witness `data/r1-repair-seat-intent.json`: 9 distinct glyph positions in and 9 out; reduced motion keeps only the fill). The plate itself is glass's.

**What I ask.** The primary's fill is opaque enough to separate from any glass plate it sits on (both schemes), with ink at 4.5:1 on it; on hover and focus its plate deepens and grows from the control on the press spring, and returns the same way. No scale.

## Round 2 addendum (2026-11-13, audit r2 repair seat)

Owner-eye r2 (H-C1a / H-C6a) re-measured Start, `Button emphasis="primary" size="lg"`, on 089e9301. In dark it is a dark translucent pill, `oklab(0.286 …/0.34)`, 111 x 44 px; in light a muddy mauve pill, `oklab(0.588 …/0.31)`. Its fill separates from the plate at 1.09:1 dark and 1.41:1 light (contrast-a11y r2). On hover only the glyph fills, which is speedtest's own seat content; the plate's background, transform and shadow do not change. R-B keeps the primary neutral and forbids a local paint, so the plate's rest separation and its hover state are glass's.
