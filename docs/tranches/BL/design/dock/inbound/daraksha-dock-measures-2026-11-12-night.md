# daraksha's dock measurements, 2026-11-12 night (via value.js)

Production master 793bed5, glass 11.0.1, the dock on its defaults (collapse default, opens on hover, fit-content). Data: `~/.dev-logs/owner-1112/ship/dock-5th/`; filmstrips: `~/.dev-logs/owner-1112/frames-6th/dock/`.

| Reading | Value |
| --- | --- |
| Pointer leaves to first fold frame, 1440 | 3.63 s; nothing on the site cut it short |
| The owner's direction ("should be increased") | so he wants more than 3.6 s; daraksha now holds the dock and folds at 6.0 s (measured 6.03 s) |
| Hover to open | 78 ms, left alone |
| Touch at 390 | the dock never folds by itself |
| A Popover with keep-dock-open, content teleported to body | the dock folded at 3.6 s and left the popover floating |
| The fold's first frame | jumps 13 to 17 % of its travel |
| A hover returning mid-fold | finishes the fold and reopens; does not reverse |
| The layer swap | the dock's width changes in one frame; the controls pass through fully transparent |
| The end of an unfold | edge content pops in late |
| Content against the closing plate | the Portraits "terms" content sat 11 px outside at 0.84 opacity at 1800 px |
| The options panel | 13 px padding all round, so the owner's "contained properly" may be the ToggleGroup chips' heights (frame `~/.dev-logs/owner-1112/shots/35.png`) |

Asked of glass: the dock's open and close progress published as a custom property so siblings can follow it; the three timings as tokens (60 ms, 3.6 s, 840 ms); a fission seat; a hover-label seat variant; popovers closing with the fold.
