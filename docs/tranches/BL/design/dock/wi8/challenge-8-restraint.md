# Challenge to RULINGS-8: the owner's eye and restraint

2026-11-22. Challenger seat, claude-opus-5-5 (asserted from my own system identity), in the seat written for Fable; the owner's order of 2026-11-19 ("No fable usage for now") puts every seat on Opus. I wrote none of the rulings, the build, the measures or the verification. I ran no browser and no build, changed no source and staged nothing. I enlarged crops of two strips with ImageMagick in the session scratchpad and sampled one pixel row; nothing else ran.

**Read.** In full: `docs/precepts/restraint.md`, `RULINGS-8.md`, `ORCH-LINES-7.md`, `verify-8.md`, `fold-7.md`, `challenge-7-restraint.md`; `MEASURE-8.md` part M4 and M5 and the H5 lines; `RULINGS-7.md:106-116` and its questions 10, 18 and 21; `OWNER-READ.md:1-30`, `:104`, `:156-197`; `~/.dev-logs/owner-1112/IDIOM-TOPBAR.md`; `ORDER.md`'s THIRTY-FOURTH to FORTY-THIRD orders; `audit/triage-1119/PLACED.md`; the canon (`~/.dev-logs/feedback-canon/CANON.md`) searched for the ledger's quotes, C-4 and C-89. Strips opened: `strip-q10-{field,grid,daraksha}-8m.chromium`, `strip-q14-8m.chromium`, `strip-q18-8m.chromium`, `strip-q19-8m.chromium`, `strip-q20-8m.chromium`, `strip-q21-8m.chromium`, `strip-q12-names-8m`, `strip-fission-8.chromium`, `strip-wash-8.chromium`, `strip-seatset-8.chromium`; the owner's `f1`, `f5` and `owner-frame-120.png`. On `bl/dock/wi8` at `fa89416d6` (src at `575084358`), read only: `dock.css:85-100`, `:112-170`, `:200-290`; `shape.css`; `shell.css:50-60`, `:85-95`, `:140-176`, `:212-226`; `density.css:108-118`, `:174-182`, `:276-300`; `triggers.css:60-72`; `icon-button.css:110-232`; `controls.css:56-70`; `adaptive-legibility.css:100-120`; `glass-capsule.css:20-110`; `glass/material.css:136-175`; `tokens/glass.css:55-92`, `:135`, `:227-232`; `tokens/property-regs-specular.css:24-39`; `dark-mode-toggle.css` and `DarkModeToggle.vue` in full; `SegmentedTabs.vue:186-260`; `DockControl.vue:80-95`; the dock `README.md:76-92`. On the main checkout with `git`: v11.1.0's `adaptive-legibility.css:76-96`, `shell.css`'s level lines and the `--glass-level` registration. Consumers, read only with `git grep`: daraksha, fourier-analysis, gaggle, keyframes.js, value.js, slides, sci-report, speedtest, gregg, hassio-config and atlas (`u/o18-atlas`), for `shape="card"`/`"rounded"` and for the plate's two tier tokens.

**What is a reading.** *Record* quotes a log, a strip label or a document. *Source* quotes code. *Pixels* is my look at a strip, or one sampled row. *Arithmetic* is mine, on recorded or source numbers, and is a hypothesis until read. *Hypothesis* has no reading behind it.

## What survives

Twelve objections: none blocking, six major, six minor. Under this lens these stand: RU-89 (11.1.0's published idiom, the press gate is RU-43's law), RU-90, RU-91 (it removes 45 lines and a serialization, and gives the tall dock 11.1.0's corners), RU-92 (a press under a finger looks as one under a mouse, one property), RU-97, RU-98 (one line goes), RU-99 (fourier's red TRIGGER-CELL-WIDTH test is the measured need), RU-101 (read6's 106 px jump is what "nothing changes instantly" forbids), RU-103, RU-105, RU-106 (a fault cure of one rule), RU-107 (removals and true labels), RU-108's bound and RU-110.

### 1. RU-95: the channel's lens and the thumb's capsule stay in the dock. Major.

- RU-95: "Inside `.glass-dock` the capsule track paints no fill, rim or shadow." *Source*: the track is a fill, `backdrop-filter: var(--glass-blur-quiet)` and three shadow legs (`glass-capsule.css:79-85`); `--glass-blur-quiet` is `blur(14px × level) saturate(var(--glass-saturate))` (`tokens/glass.css:70`, `:89`). The ruling's list leaves the lens. With the fill and the shadows gone, a 14 px blur and a saturate still run over the plate under 1Y, 5Y and All.
- The selected segment is SegmentedTabs's one indicator, composed as `.glass-capsule` (`SegmentedTabs.vue:229`): its own `backdrop-filter: var(--glass-blur-floating)` (`glass-capsule.css:57`) and a rim pair plus a lift shadow, three layers (`:66-69`). RU-95 re-points only its fill.
- Whether either lens shows depends on the backdrop root above it; a `clip-path` on an ancestor forms one and flattens a capsule lens (`shell.css:219`), and the lanes paint through clip insets (RU-25). Shown, it is a blur inside the plate's blur. Flattened, it is a lens nobody sees. Restraint cuts both: "never a blur inside a blur"; the ceiling's "blurs: 0 inside a blurred surface" and "shadow layers: 1"; "A motion nobody can see is a cost with no intent: cut it too." C-1: "The double blur is a bit gratuituous."
- *Pixels* (`strip-q21-8m.chromium`, dials in dark on this build, enlarged): the channel under 1Y 5Y All reads a deeper, more saturated orange than the plate on either side, and the selected 5Y and Lin each carry a light ring. How much of that the lens makes is unread.
- An existing rule already removes these lenses, for static docks only: `adaptive-legibility.css:109-112` sets `backdrop-filter: none` on `:is(.glass-capsule, .glass-capsule-track)` inside `[data-backdrop-mode="static"]`.
- The same capsule composes every active icon seat (`DockControl.vue:92`; `icon-button.css:215-217`: "The capsule's rim/lift `box-shadow` + `backdrop-filter` already apply"). Question 21's "the selected range is drawn like any selected dock button" is true only by carrying that lens and those three layers into the segments.

*Remedy.* RU-95's rule removes. `adaptive-legibility.css:109` loses its `[data-backdrop-mode="static"]` qualifier, so no capsule or track inside any dock carries a second lens (one selector shortened, no line added), and inside `.glass-dock` the track and the indicator take `box-shadow: none`. The ninth build reads an active icon seat's computed `box-shadow` inside a live dock; layers past one go by the same rule, since the ruled current step is flat ink over the plate (RU-56). G-15's dials marks are read after, as RU-95 already asks.

### 2. RU-94: the hover again sets the current step, which fold 7 ruled out. Major.

- Fold 7 accepted R7-3 (`RULINGS-7.md:108-112`): "The current step is set by the words and the mark floors alone ... The current step is never raised for the hover."
- RU-94's current step is "the weakest of 10, 12 and 14 % whose current and pressed seats' words read 4.5, whose marks read 1.2, and whose hover reads 1.1 apart". The third clause lets the hover raise the current step. RU-94 does not say it reverses fold 7.
- *Record* (`strip-q18-8m.chromium`, dark, current at 10 %): at a 5 % hover, 1.13 from current and 1.08 from the dock; at 6.5 %, 1.08 and 1.14. No hover in P0a's range meets both 1.1 clauses at 10 %. As written, the rule has two ways out in dark: a dark hover arm at 6.5 %, which question 18 does not mention, or a heavier current step. These are level-1 readings; at 0.7 they are unread.
- The owner's ceiling: "NO overuse of shading". The separation is his to judge on question 18's strip, which already shows it.

*Remedy.* Restore fold 7's order. The current step comes from the words and the marks alone. The hover is the weakest of 5 and 6.5 % that reads 1.1 against the dock. Hover against current is printed on question 18's strip and never raises the current step. G-15's hover-against-current clause reads "1.1, or the separation at the floor-set pair until the owner picks".

### 3. Question 10 (RU-93): the light half is no longer told. Major.

- Fold 7 accepted R7-1's "the light plate's cost on a plain page, stated in question 10"; RULINGS-7's question 10 said: "Default for light: one step more ink than today, which also makes the light dock a shade greyer on a plain white page."
- RULINGS-8's question 10 says: "Light keeps the first step." The owner will read that as no change.
- *Record* (labels of the three `strip-q10-*-8m.chromium`, light, the page dock open, today's against firmness 1): 1.20 against 1.30 on the warm page; 1.53 against 1.64 on the grid page (show-through 0.15 against 0.12); 1.21 against 1.31 on daraksha's ground. On every ground the light dock stands further off the page than 11.1.0's. *Pixels*: on the grid and daraksha grounds firmness 1 is a grey capsule beside today's paler one.
- The drafts to fourier, Home Assistant, value.js, slides and keyframes say "light takes one more step of ink". The sites are told more than the owner.
- Restraint, Shading: "No grey or muted surfaces" (C-5).

*Remedy.* Question 10 gets back fold 7's light sentence, with the three readings.

### 4. RU-109 and question 22: the ledger cites the seats' own page as the owner's word. Major.

- RU-109 restates line 2, clause 2: "Every block over 11.1.0 stands in a ledger with the owner's word or the published cure it serves; a block that cites none goes." Three of its eight entries quote `OWNER-READ.md:15`, `:16` and `:18`, the page the seats wrote for him: "Come back while it is folding and it turns round from wherever it is", "A page scrolling under a still pointer opens nothing", "Whatever the dock opened keeps the dock". None of the three is in the canon.
- The sources exist, and they are different. The scroll rule is atlas's ask (`LEDGER.md:55`, L-21). The overlay hold answers his C-89 ("sometimes when the dock collapses the expanded UI dropdowns do not collapse too--these should be synced with the glass-ui API") and fourier's 17 `keepOpen`/`release` lines. Turning mid-fold follows from the 2026-11-12 tween law.
- If the seats' own prose counts as a source, clause 2 can never remove a block. Applied with real sources, it bites at least once. M4's first row, the pose and trace marks (27 code lines, "test-only; the published bundle already drops it"), cites no owner word and no cure, and RU-109 keeps it.
- Question 22 tells him: "Each block buys something you asked for", and lists the scroll rule and the overlay hold.

*Remedy.* Each ledger row cites one of three sources: a canon id with its quote, a published cure's commit, or a consumer's file and line. `OWNER-READ.md` is never a source. The pose and trace block moves out of `src/components/dock` behind the one hook G-11's trace needs, with its net lines reported, or RU-109 says why it stays. Question 22 says which behaviours he asked for and which a site asked for.

### 5. Question 22 (RU-108): "a page loads no more of the dock than with 11.1.0" has no reading behind it. Major.

- RU-108 records v11.1.0's fixture as "unread (H8)", and "What I did not decide" lists "v11.1.0's fixture figure, and whether the ninth build is under it".
- *Arithmetic* on RU-108's own records: the redesign's own cost is 1,013 B; v11.1.0 sits about 1.6 KB over v11.0.2's 102,631 B, near 104,200 B; the tip is 105,249 B. On these numbers the tip is about 1 KB over 11.1.0, and this round's cuts are about 67 code lines.
- Question 22: "...and a page loads no more of the dock than with 11.1.0." He answers that question on its premises. RU-107's own reason applies: "a strip the owner misreads is worse than none".

*Remedy.* Question 22 states the bound, not a result: the build must load no more than 11.1.0, and the figure comes with the build.

### 6. RU-93: the dark arm also cuts the dark dock's blur by 30 %, and nobody says so. Major.

- *Source*: the dock re-declares its blur as `blur(calc(var(--glass-blur-resting-radius) * var(--glass-level)))`, in light (`shell.css:54-57`) and in the dark arm on the same selector RU-93 uses (`:170-175`). The plate reads it (`--dock-surface-blur`, `:58`), and the radius is 16 px (`tokens/glass.css:71`). The token file says why: "Every radius is multiplied by the ONE `--glass-level` clarity scalar" (`:60`).
- *Arithmetic*: at 0.7 the dark plate blurs 11.2 px. The light dock, every card and dialog, and v11.1.0's live dock in both schemes blur 16 px (`--glass-level` registered with initial value 1, and no live-dock arm sets it on v11.1.0). The computed value is unread.
- RU-93, question 10 and the drafts describe only the cover ("about 43 % ... against 18 %"). The owner's first question 10 told him "The blur and the shadow do not change" (`OWNER-READ.md:104`).
- Canon C-4: "Glass blur is light and the same across dock, buttons, cards and dialogs." Restraint: "One blur level everywhere." A blur that drops is in the direction of his "slightly less blur". A blur split by scheme is not.

*Remedy.* The ninth measure reads the dark dock's computed `backdrop-filter` beside a dark card's. Question 10 and the drafts say the dark dock blurs about 11 px against 16, so his answer covers both changes.

### 7. RU-111 (with RU-93): the matching-plate recipe copies the number 0.7 into each site. Minor.

- The recipe's veil line names a token, `--glass-veil-tier: var(--glass-veil-dock)`. Its new dark line is a literal, `--glass-level: 0.7` under `.dark`. The daraksha draft asks for it on the neck, `Star.vue` and `Clasp.vue`.
- Question 10 is open. If he picks another rung, each site's literal and the README's line go stale, and a site's plate stops matching its dock with no error. Today's README avoids this for the level by saying the level is 1 in both schemes (`README.md:82-85`).
- An existing piece already answers it: the veil reaches matching plates through `--glass-veil-dock` (`tokens/glass.css:135`).

*Remedy.* The dark level is written once, as a token beside `--glass-veil-dock` (1 at `:root`, 0.7 under `.dark`). The dock reads it on `.glass-dock`, in place of RU-93's arm, and the recipe reads the same token. That is the same lines in glass, and no `.dark` block in any site.

### 8. RU-96: the toggle's dock size is already there, and the 0.8 is cured where it is written. Minor.

- RU-96: "Its `data-size` arms (`:43-58`) never read the dock's seat size." The next rule does. `dark-mode-toggle.css:59-72` sizes the toggle by `--dock-control-size`, and its padding by the dock's glyph size, inside any `.glass-dock` unless the site asks for `sm`, `lg` or `control`. The 36 px RU-83 saw was in a row sized from the words, not on a dock at its own seat size.
- The fault H5 recorded is the opacity, `opacity: 0.8` (`:16`), which turns to 1 on hover and focus (`:27`, `:34`) behind its own transition leg (`:19`). The owner asked for more toggle, not less ("the darkmode toggle is too small as well", C-89), and restraint asks for "No muted colors" (C-5). IDIOM-TOPBAR rule 2 puts the theme in the main dock, so almost every toggle sits in a dock.

*Remedy.* At the root, delete the 0.8 and its three opacity lines. Point the toggle's hover (`:26`) at `--dock-control-hover-bg`, which is the dock's step inside a dock and the `:root` step outside. That removes about four lines where RU-96 adds five. G-13 reads the size the existing arm already gives.

### 9. RU-94 and RU-92: the hover and the press still light a cursor gleam. Minor.

- *Source*: every dock icon, tab and trigger carries a `::before` catch-light that follows the pointer (`--specular-x: var(--mouse-x)`, `glass/material.css:139-160`). It wakes on hover at 0.1 in light and 0.08 in dark (`tokens/property-regs-specular.css:25`, `:39`; `controls.css:60-69`: "the gleam wakes on hover/active"). On release it "SETTLES with the spring's alive overshoot". `icon-button.css:125` says: "A hover answers with the fill and the gleam."
- RU-94 rules the hover as one fill, and RU-92 rules the press as one fill step. Neither names the gleam.
- Restraint: "No specular highlight, radial glow, sheen, cursor light"; C-2, "Remove, do not tune"; the ceiling, "gradients, gleams, glows: 0" and "marks for one state: 1"; "no overshoot on a control".
- *Pixels*: `strip-q18-8m.chromium`'s hovered Home at 5 % is flat (row y 190 reads (214,169,158) from x 50 to 100). Either the strip does not show the gleam, or it is not visible. A gleam that cannot be seen is "a cost with no intent".

*Remedy.* RU-94's ink commit takes the four dock selectors out of the catch-light rules (`material.css:140-143`, `:280-281`, `:298-299`, `glass-specular-track.css:37-38`, `:60-61`) and the `glass-specular-track` and `glass-capsule-hover` classes off `DockControl` (`DockControl.vue:89`, `:91`), with the sizing block at `controls.css:56-70`. The hover is then one fill, and the press is its fill step and its scale. G-15's hover readings are taken after.

### 10. RU-100: the glyph is halved and the 44 px seat around it is not. Minor.

- The preset's seat is `--dock-control-size: 2.75rem` at every pointer, with a 4 px pad (`density.css:285`, `:287`). At 0.5 the glyph is 22 px, with 11 px of seat on each side, where the build's open preset shows its glyphs filling most of the seat (`strip-q20-8m`).
- The preamble to the owner questions says the controls dock's icons are half their seat, "as your top-bar rules say", which is rule 4. Rule 8 of the same file says "Compact. Less padding (FORTY-SECOND D): the plate hugs its seats; touch targets stay 44 px by slop". His FORTY-SECOND order says "Our controls should be re-designed to not have so much padding". On the main dock he said "our icons sohuld be 2x bigger with not so much padding around the icon like that". THIRTY-SEVENTH B pulls the other way ("a proper dock in size ... not a small plate").
- The ruling chooses between his words without naming the tension.

*Remedy.* No new gate and no line. The question says that the controls bar's icons become 22 px in 44 px seats, and that this trades rule 8's "less padding" for rule 4's normal glyph. The ninth Q20 strip shows the open preset at 0.5. RU-100's default stands unless he answers.

### 11. RU-102: a ruled look for two shapes no site uses. Minor.

- *Count* (`git grep` at each tree's checked-out ref, and atlas at `u/o18-atlas`): no `shape="card"` or `shape="rounded"` dock in daraksha, fourier-analysis, gaggle, keyframes.js, value.js, slides, sci-report, speedtest, gregg, hassio-config or atlas. Atlas tests that it has none (`tests/unit/u-b7-glass-shape-tokens.spec.ts:27-30`). RU-102 says the same of atlas.
- The two shapes carry their own rules (`shell.css:322-390`, `run.css:646-655`, the per-shape `--dock-cap-rest`), and ORCH line 4 spent a reading on them. RU-102 adds a look for them.
- Restraint: "One variant per job" (C-18, "We don't need a million fucking variants that are essentially the same thing"); "Hide a selector with one option" (C-44). Question 12 deletes 17 names no site uses, but not these values.

*Remedy.* Question 12 also lists `shape`'s `rounded` and `card`, and with them the `shape` prop, which would then have one value. The default is to delete them in 11.2.0 with the rest. RU-102 applies only if he keeps them.

### 12. RU-104: G-9 gains a clause to give its plant something to bite, while g2-lane retires for the same failure. Minor.

- RU-104 rules on g2-lane: "If rounding every lane corner changes no painted pixel in any scenario, the clause guards nothing the owner can see: it retires." For g9-scope, which bites no clause, it adds one: "The plate's ink and edge lerp on it (`dock.css:120-166`), so a step is a colour jump the owner sees."
- *Source*: by default the ink lerps between two equal tokens. `--dock-plate-collapsed-tier` and `--dock-plate-expanded-tier` are both `var(--glass-veil-dock)` (`shell.css:91-92`). Only slides sets two tiers (0.86 and 0.9, `decks/parkway-lab/theme.css:42-43`). The edge lerps between `--glass-border-dock` and `--glass-border-floating` (`tokens/glass.css:227`, `:232`), a 1 px line.
- g13-box gets a third treatment: "if no form bites, the clause is unwitnessed", left in the ready list.
- The owner's ruling on gates: "Most of these 'gates' are contrived and overfit nonsense" (2026-07-13).

*Remedy.* One rule for all three. g9-scope's step is read where it paints, on slides's tiers and on the edge, once and as a crop. G-9's clause is added only if a painted difference shows; otherwise the plant retires. The same rule applies to g13-box, which retires if no form bites.

## Dropped on the second reading

- *RU-93's 0.7 is more than "a bit" firmer (1.01 to 1.44 on the warm page).* Dropped. ORCH line 3 binds the rule that returns it. Question 10's strip shows all five rungs. At 0.7 the page still shows through (0.090 against light's 0.106).
- *RU-92 adds paint to a touch press.* Dropped. Under a mouse a pressed seat is hovered too, so the result is the same 7 % in both, on one property.
- *RU-95 sizes the segments to the full seat where rule 7 says "one small segmented pair".* Dropped. Nothing in the record says "small" refers to height, and rule 5 asks for "dock size".
- *RU-104's WebKit touch project is process in an engine the rulings discount.* Dropped. Safari on an iPhone is a WebKit touch context. The group reads behaviour, not paint, and `(hover: none)` can be read there with `hasTouch`, unlike the safe area.
- *RU-103 moves the ink's change to the landing, where the eye is.* Dropped. Before the cure the sampler could change the ink mid-travel too, and I have no reading that the change cuts.
- *RU-106 grows a corner preset over its parent's neighbours.* Dropped. It cures a broken 28 px dock in one rule, and where to place it is still atlas's question.
- *RU-107 removes `crop-gridseat-8.webkit`, which RU-97 cites.* Dropped under this lens. The removal names strips, and whether that crop counts as one is a question for the records.

## Found while reading, not this round's

- The plate's `box-shadow` is three layers, a top catch-light rim, a bottom under-shadow and the elevation (`dock.css:96-98`; `shell.css:146`: "bright catch-light on the TOP edge"). The ceiling allows one.
- The dock's press is a scale on top of the 2 % fill (`--scale-press-dock`, cited in fold 7's R7-6), and restraint says "no press indent" (C-39).

## What the owner would see

- *Question 10, dark.* On the warm page the default (firmness 3) is a clearly darker brown capsule, 1.44 off the page, the page's colour still in it. On the grid page every rung is a lighter capsule over black, and at firmness 3 the grid lines are faint through it. On daraksha's ground firmness 3 barely stands off (1.08). Nothing in the strips shows that the dark dock also blurs a third less (objection 6).
- *Question 10, light.* Firmness 1, labelled "the new default", is a greyer capsule than today's on all three grounds. The question tells him light is unchanged (objection 3).
- *Question 18.* At 5 % Home is a faint flat pill beside a firmer Reports, in both schemes. In dark it sits close to the plate (1.08). No ornament shows. The cursor gleam the source lights on hover is not visible on the strip (objection 9).
- *Question 21, dials.* Today's dark thumb on a lighter channel reads at once. This build's lighter thumb, ringed, on a deeper orange channel does not. RU-95 removes the channel's fill. Unless its lens goes too, a second blur stays under the segments (objection 1).
- *Question 20.* The open controls dock shows four glyphs that fill most of their 44 px seats; folded, a 16 px sliders glyph sits in a 52 px disc. RU-100 brings the open glyphs to 22 px in the same seats (objection 10).
- *Question 14.* The in-flow dock still pushes atlas's legend 36 px when it opens, under his "hovering over cards/dashboard items should not shift the main cards or vizzes around". That is question 14's open default, unchanged by this round.
- *Question 19.* The first frame shows a dimmed page with no legible dialog, and the third catches the dock mid-fold. RU-107 reshoots both.
