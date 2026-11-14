# ASK-GU-SLIDER-AFFORDANCE: the Slider's thumb, fill and focus read at 3:1 in both schemes

**From**: speedtest AX pass 3, audit round 2 repair seat (2026-11-13). **To**: glass-ui. **Law**: WCAG 2.2 1.4.11 (non-text contrast 3:1); OI-1 C6 (intent first). **Related**: ASK-GU-FOCUS-RING-RECIPE, ASK-GU-NONTEXT-MARK-EDGE.

**What I see on 11.0.1** (owner-eye r2 H-C6d; contrast-a11y r2). On the dark map controls card the Detail slider's thumb is a grey disc on a grey-brown track, and the filled part of the track is barely told apart from the rest. Its focus ring is a `box-shadow` (the `--focus-ring-shadow` recipe in `slider/styles.css`) at 2.07:1.

**What I did locally.** The slider now passes glass's own `marks` ([4, 5, 6, 7]) and a `valueText`, so the track shows its four detents and assistive tech names the step. That is composition, not a fork.

**What I ask.** The thumb and the filled range each reach 3:1 against the unfilled track and the card in both schemes, and the slider's focus ring uses the outline recipe at 3:1.

**What I will not do locally.** I will not recolour the slider's thumb, range or track from speedtest.
