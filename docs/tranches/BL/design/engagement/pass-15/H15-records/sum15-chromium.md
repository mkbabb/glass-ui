# E-15 chromium · logs: cand14 cand14-e15-chromium-085316.log, cand13 cand13-e15-chromium.log, cand12 cand12-e15-chromium.log, head head-e15-chromium.log
| cell | cand14 | cand13 | cand12 | head | expectation | self-test |
|---|---|---|---|---|---|---|
| M28 a 2 px a frame margin ramp inside the card (padding-top 1px: the host's level) · C: translate sine 80 px / 600 ms | P | F | P | P | ref cand14,cand12 | OK |
| M28 a 2 px a frame margin ramp inside the card (padding-top 1px: the host's level) · C: translate sine 160 px / 100 ms | P | F | P | P | ref cand14,cand12 | OK |
| M28 a 2 px a frame margin ramp inside the card (padding-top 1px: the host's level) · C: rotate sine 20deg / 600 ms | P | F | P | P | ref cand14,cand12 | OK |
| M28 a 2 px a frame margin ramp inside the card (padding-top 1px: the host's level) · C: scale 1 → 0.85 cosine / 600 ms | P | F | P | P | ref cand14,cand12 | OK |
| M28 a 2 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: translate sine 80 px / 600 ms | F | F | P | P | ref cand12 · plant cand14 | OK |
| M28 a 2 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: translate sine 160 px / 100 ms | F | F | P | P | ref cand12 · plant cand14 | OK |
| M28 a 2 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: rotate sine 20deg / 600 ms | P | F | P | P | ref cand12 | OK |
| M28 a 2 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: scale 1 → 0.85 cosine / 600 ms | P | F | P | P | ref cand12 | OK |
| M28 a 2 px a frame margin ramp above the card (a block before G) · C: translate sine 80 px / 600 ms | F | F | P | P | ref cand12 · plant cand14 | OK |
| M28 a 2 px a frame margin ramp above the card (a block before G) · C: translate sine 160 px / 100 ms | F | F | P | P | ref cand12 · plant cand14 | OK |
| M28 a 2 px a frame margin ramp above the card (a block before G) · C: rotate sine 20deg / 600 ms | P | F | P | P | ref cand12 | OK |
| M28 a 2 px a frame margin ramp above the card (a block before G) · C: scale 1 → 0.85 cosine / 600 ms | P | F | P | P | ref cand12 | OK |
| M28 a 0.2 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: translate sine 80 px / 600 ms | F | F | P | P | ref cand12 | OK |
| M28 a 4 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: translate sine 80 px / 600 ms | F | F | P | P | ref cand12 | OK |
| M28 a 2 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: rotate sine 20deg / 600 ms, origin 0 0 | F | F | P | P | ref cand12 | OK |
| M28 a 2 px a frame margin ramp of the card (an empty spacer's margin collapsing through C's top) · C: rotate sine 20deg / 600 ms, origin top center | P | F | P | P | ref cand12 | OK |
| M28 under G's zoom 1.25 · a 2 px a frame ramp of the card · C translate sine 80 px / 600 ms · STATED LIMIT (S15-b (i)), REPORT | R | R | R | R | read | OK |
| M28 under G's zoom 2 · a 2 px a frame ramp of the card · C translate sine 80 px / 600 ms · STATED LIMIT (S15-b (i)), REPORT | R | R | R | R | read | OK |
| F5 the glide under a changing carrier · C scale 0.5 → 1 over 240 ms from the act · a 40 px insert before C (at the card's level) | P | P | P | P | read | OK |
| F5 the glide under a changing carrier · C scale 0.25 → 1 over 240 ms from the act · a 40 px insert before C (at the card's level) | F | F | F | P | read | OK |
| F5 the glide under a changing carrier · C scale 1 → 1.25 over 240 ms from the act · a 200 px insert before C (at the card's level) | P | F | P | P | read | OK |
| F5 the glide under a changing carrier · C rotate 0 → 90deg over 240 ms from the act · a 40 px insert before C (at the card's level) | F | F | F | P | read | OK |
| F5 the glide under a changing carrier · C rotate 0 → 90deg with scale 0.5 → 1.25 over 240 ms from the act · a 40 px insert before C (at the card's lev | F | F | F | P | read | OK |
| F5 the glide under a changing carrier · C scale 0.5 → 1, the step inside the card (control) over 240 ms from the act · a 40 px insert inside C above t | P | P | P | P | ref cand14,cand13,cand12 | OK |
| F3 a 40 px insert inside C above the root · G rotateY(50deg) preserve-3d · C rotateX(50deg) | P | P | F | U | read | OK |
| F3 a 40 px insert inside C above the root · G rotateY(60deg) preserve-3d · C rotateY(-60deg) | P | P | P | U | read | OK |
| F3 a 40 px insert inside C above the root · G rotateZ(30deg) rotateX(60deg) preserve-3d · C rotateY(40deg) | P | P | F | F | read | OK |
| F3 a 40 px insert inside C above the root · G rotate: x 55deg preserve-3d · C rotate: y 35deg | P | P | F | F | read | OK |
| F3 a 40 px insert inside C above the root · G rotateY(50deg) flat · C rotateX(50deg) (control: no 3D context) | P | P | P | F | ref cand14 | OK |
| F10 a train of 40 px inserts every frame, 4 steps, against one 40 px step (superposition; ceiling 4 px a frame) | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| F10 a train of 16 px inserts every frame, 12 steps, against one 16 px step (superposition; ceiling 4 px a frame) | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| F10 a train of 40 px inserts every second frame, 6 steps, against one 40 px step (superposition; ceiling 4 px a frame) | P | P | P | P | ref cand14,cand13,cand12 | OK |
| F10 a 2 px a frame margin ramp above C for 40 frames (the carried control: under the ceiling) | P | F | P | P | ref cand14,cand12 | OK |
| F10 a Disclosure-profile open above C: a block 0 → 40 px on height 200 ms var(--spring-present) (V2), REPORT the lag | R | R | R | R | read | OK |
| F10 a Disclosure-profile open above C: a block 0 → 300 px on height 200 ms var(--spring-present) (V2), REPORT the lag | R | R | R | R | read | OK |
| M22 the root's own zoom 1 → 1.5 (B3) · graded on the top-left edge the layout keeps | F | F | P | P | ref cand12 · plant cand14 | OK |
| M22 the root's own zoom 1 → 0.75 (B3) · graded on the top-left edge the layout keeps | F | F | P | P | ref cand12 · plant cand14 | OK |
| M22 the root's own zoom 1 → 1.25 (A5's host cell) · graded on the top-left edge the layout keeps | F | F | P | P | ref cand12 · plant cand14 | OK |
| M22 the root's own zoom 1 → 2 · graded on the top-left edge the layout keeps | F | F | F | P | read | OK |
| M22 the root's own height + 10 px (B3's control) · graded on the top-left edge the layout keeps | P | F | P | P | ref cand14,cand12 | OK |
| M22 the root's own zoom 1 → 1.5 under C (its offsetParent) at zoom 1.25 (F-8's cell) · graded on the top-left edge the layout keeps | F | F | P | P |  · plant cand14 | OK |
| M22 the root's own zoom 1 → 1.5 under C (its offsetParent) at zoom 2 (F-8's cell) · graded on the top-left edge the layout keeps | F | F | F | P |  · plant cand14 | OK |
| M22 G's zoom 1 → 1.25, the root 300 px deep in G (A5) | P | P | F | F | ref cand14,cand13 · plant cand12 | OK |
| M22 G's zoom 1 → 0.8, the root 300 px deep in G (A5) | P | P | F | F | ref cand14,cand13 · plant cand12 | OK |
| M22 X8 · G zoom 1, C (the root's offsetParent) zoom 1 · a 40 px insert inside C above the root | P | P | P | F | read | OK |
| M22 X8 · G zoom 1, C (the root's offsetParent) zoom 1.25 · a 40 px insert inside C above the root | P | P | P | F | read | OK |
| M22 X8 · G zoom 1, C (the root's offsetParent) zoom 2 · a 40 px insert inside C above the root | P | P | P | F | read | OK |
| M22 X8 · G zoom 2, C (the root's offsetParent) zoom 0.5 · a 40 px insert inside C above the root | P | P | P | F | read | OK |
| M22 X8 · G zoom 2, C (the root's offsetParent) zoom 0.75 · a 7.3 px insert inside C above the root | P | P | P | F | read | OK |
| M22 X8 · G zoom 2, C (the root's offsetParent) zoom 0.75 · a 40 px insert inside C above the root | P | P | P | F | read | OK |
| M22 X8 · G zoom 2, C (the root's offsetParent) zoom 2 · a 40 px insert inside C above the root | P | P | P | F | read | OK |
| M22 X8 · G zoom 1.25, C (the root's offsetParent) zoom 1.5 · a 200 px insert inside C above the root | P | P | P | F | read | OK |
| M9 a sheet's media flips print → all · 40 px above the root | P | P | F | F | ref cand14 | OK |
| M9 a CSSOM deleteRule · 40 px above the root | P | F | F | F | ref cand14 | OK |
| M9 a :has() restyle by an attribute below the block · 40 px above the root | P | P | F | F | ref cand14 | OK |
| M9 a <link> sheet served 60 ms after its insertion · 40 px above the root | P | F | F | F | ref cand14 | OK |
| M9 an <img> with no size served 60 ms after its src · 40 px above the root | P | F | F | F | ref cand14 | OK |
| M16b released, then a 40 px insert above the root at frame 3 · STATED LIMIT (branch (i)), REPORT | R | R | R | U | read | OK |
| M16b released, then a 200 px insert above the root at frame 10 · STATED LIMIT (branch (i)), REPORT | R | R | R | U | read | OK |
| D8 --space-section 2em on :root, host 14 px (D8 row 1) · against the page consumer | F | F | F | U |  · plant cand13 | OK |
| D8 --space-section 4cqi on :root, host in a 400 px container (D8 row 2) · against the page consumer | P | F | F | U | ref cand14 · plant cand13 | OK |
| D8 --space-section 2rem (the library's default) · against the page consumer | P | P | P | U | ref cand14,cand13,cand12 | OK |
| D8 --space-section 2rem on :root, 2em on main · against the page consumer | F | F | F | U | read | OK |
| A1 a transformed link inside a shadow tree · scale 0.5 (origin 0 0), open root · a 40 px insert above the shadow host | F | P | F | F | ref cand13 · plant cand14 | OK |
| A1 a transformed link inside a shadow tree · scale 0.5 (origin 0 0), closed root · a 40 px insert above the shadow host | F | P | F | F | ref cand13 · plant cand14 | OK |
| A1 a transformed link inside a shadow tree · rotate 20deg, open root · a 40 px insert above the shadow host | F | P | F | F | ref cand13 · plant cand14 | OK |
| A1 a transformed link inside a shadow tree · rotate 20deg, closed root · a 40 px insert above the shadow host | F | P | F | F | ref cand13 · plant cand14 | OK |
| A1 a transformed link inside a shadow tree · scale 1.5 (origin 0 0), open root · a 40 px insert above the shadow host | F | P | F | F | ref cand13 · plant cand14 | OK |
| A1 a transformed link inside a shadow tree · scale 0.5 (origin 0 0), open, two shadow levels · a 40 px insert above the shadow host | F | P | F | F | ref cand13 · plant cand14 | OK |
| A1 a transformed link inside a shadow tree · a closed carrier that starts after the hold: scale 1 → 0.5 (origin 0 0) at frame 3 · a 40 px insert above | F | F | F | F | read | OK |
| A1 a transformed link inside a shadow tree · scale 0.5, open root · the insert inside the card above the root (control: below the transform) | P | P | P | F | ref cand14,cand13 | OK |
| A2 a stylesheet transform: translateY(-50%), origin 0 0 · a 40 px insert inside the card above the root | F | P | F | F | ref cand13 · plant cand14 | OK |
| A2 a stylesheet transform: translate(-50%, -50%), origin top center · a 40 px insert inside the card above the root | F | P | F | F | ref cand13 · plant cand14 | OK |
| A2 a stylesheet transform: translateY(-10%), origin 50% 50% · a 40 px insert inside the card above the root | P | P | F | F | read | OK |
| A2 a stylesheet transform: translate(-100%, -100%) rotate(10deg) scale(0.8), origin 0 0 (nested) · a 40 px insert inside the card above the root | F | P | F | F | read | OK |
| A2 a stylesheet transform: translateY(-50%), the default origin (control) · a 40 px insert inside the card above the root | P | P | F | F | ref cand14,cand13 | OK |
| A2 a stylesheet translate: 0 -50%, origin 0 0 (control) · a 40 px insert inside the card above the root | P | P | F | F | ref cand14,cand13 | OK |
| A2 a stylesheet X4 row 1: transform translate(-50%, -50%) rotate(10deg) → scale(1.2) under a 20 s transition, at about 2 % · a 40 px insert inside the | P | P | P | F | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · block in flow (start) | F | F | P | F | ref cand12 · plant cand14 | OK |
| A3 the root's height 80 → 40 px and a 10 px insert above it in one frame · block in flow (start), a 10 px insert (outside the band: control) | P | F | P | F | ref cand14,cand12 | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · parent align-content: center (block) | P | P | F | F | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · parent align-content: end (block) | P | F | F | P | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · flex column-reverse | F | F | F | F | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · grid align-content: end | P | F | F | P | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · table-cell vertical-align: middle | P | P | F | F | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · abspos inset 0, margin auto | P | P | F | P | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · abspos bottom 10px | P | F | F | P | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · flex column, justify-content: flex-end (unread form) | P | F | F | P | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · table-cell vertical-align: bottom (unread form) | P | F | F | P | read | OK |
| A3 the root's height 80 → 40 px and a 20 px insert above it in one frame · vertical writing mode on C, block in flow (unread form) | F | F | F | U | read | OK |
| A12 C's top 0 → 120 px, 400 ms linear, during the hold | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| A12 C's top 0 → 120 px, 400 ms ease-in-out, during the hold | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| A12 C's top 0 → 200 px, 150 ms ease, during the hold | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| A12 C's left 0 → 120 px, 400 ms ease, during the hold | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| A12 C's inset-block-start 0 → 120 px, 600 ms on the dock row, during the hold | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| A12 C's bottom auto → top: auto; bottom 0 → 60 px, 400 ms linear (X6's form), during the hold | F | P | P | P | ref cand12,cand13 · plant cand14 | OK |
| A12 C absolute, top 0 → 120 px, 400 ms linear · STATED LIMIT (a level change, b.6), REPORT, during the hold | R | R | R | R | read | OK |
| EXIT --spring-dock-settle 0.08s on <html>: the released root's painted width across the stage's hide | F | P | P | U |  · plant cand14 | OK |
| EXIT --spring-dock-settle 0.21s on <html>: the released root's painted width across the stage's hide (the library's settle: control) | P | P | P | U | ref cand14,cand13,cand12 | OK |
| COST held still, 30 frames | R | R | R | R | read | OK |
| COST a carrier-only window: C translate sine 80 px / 600 ms, 30 frames | R | R | R | R | read | OK |
| COST an affine step window: a 40 px insert above the root, 14 frames | R | R | R | R | read | OK |
| COST a projective step window: C perspective(200px) rotateX(25deg), a 40 px insert inside C, 14 frames | R | R | R | R | read | OK |

cand14 52/40/0 R11 · cand13 48/44/0 R11 · cand12 51/41/0 R11 · head 45/38/11 R9
cells with a stated expectation: 59; met 59; not met 0
