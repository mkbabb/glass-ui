# Challenge to RULINGS-6: the owner's eye and restraint

2026-11-16. Challenger seat, claude-fable-5-2. I wrote none of the rulings, the build or the measurements. I ran no browser and no build and changed no source.

**Read.** `docs/precepts/restraint.md`, `RULINGS-6.md` and `MEASURE-6.md` in full; `OWNER-READ.md`; `INPUT-plate-opacity`, `INPUT-daraksha-2x`, `INPUT-hover-shift`, `INPUT-controls-seat`; the Chromium and WebKit files of `strip-plate-6` and `strip-glyph-6`, `strip-hover-6.chromium`, `strip-seatset-6.chromium`, `owner-frame-120.png`. On `bl/dock/wi8`: `tokens/glass.css:128-172`, `tokens/sizing.css:210-282`, `dock/styles/controls/icon-button.css:240-252`, `ControlsDock.vue:1-80`. Not read: the other INPUT notes, `USAGE.md`, `SURFACE.md`, the owner's `f*`/`v*` frames, `strip-fold-6`, `strip-swap-6`, `crop-many-6`, the WebKit hover and seat-set strips.

Each objection was made, then the ruling and the evidence were read again. Three were dropped and are listed at the end.

## What survives

Seven objections: none blocking, five major, two minor. RU-52, RU-53, RU-54, RU-55, RU-59 and RU-62 add nothing a reader of the dock meets and stand under this lens.

### 1. RU-56: the 1.3:1 floor asks WebKit for a heavier mark than ships today, and the 1.1:1 hover floor is the ruling's own "nearly invisible". Major.

- The floor is "derived" from one Chromium reading, 1.37 on the dials page. Finding 3 reads the same shipped plate in WebKit at 1.20 light and 1.24 dark. So the gate is RED on v11.0.2's own paint in WebKit. To pass it in both engines the ink alpha has to rise until WebKit reads 1.3, which puts Chromium well above 1.37. That is more shading than the owner has today, ruled in by a gate, against "NO overuse of shading".
- The second clause accepts a hovered seat at 1.1:1 against the current one. Finding 3 and observation 1 call a 1.09:1 mark "nearly invisible". In `strip-glyph-6` (both engines, 1440 light) the owner sees Reports and People as two selections; a 1.1:1 difference between them would still read as two selections.
- The ruling says so itself: "Whether 1.3:1 is the right floor for a mark... the owner has not seen a strip of it."

Remedy: read the mark per engine against that engine's own v11.0.2 reading (no weaker than shipped), not one number for both. State hover against current as a difference the strip shows (the "seat hovered beside the current one" strip, already in RU-64 step 9), and set the number after the owner has seen it. Keep the three steps and no new name; that part is sound.

### 2. RU-57: the ladder is picked by ink contrast, and the owner's words are about the plate. Major.

- His words: "why is this dock so transparent", "a bit too transparent". G-15 reads words and glyphs against the plate. It does not read the plate against the field.
- Finding 1 already computes level 1 at full ink as about 6:1 and 9:1, so "first GREEN from the glass end" will most likely stop at level 1.
- In `strip-plate-6` the "one tier, level 1" row and "today's plate" row show almost the same plate in both engines; what changes between them is the ink. Finding 5 reads today's plate against its field at 1.04:1. MEASURE-6's own ladder had one tier at the base rung failing more cells than today's plate with the same dim ink (20 against 14, Chromium).
- So the likely result of RU-57 is a plate the owner cannot tell from the one he called too transparent, with darker words on it. The sixth build over-answered (0.67 solid, observation 5); this risks not answering.

Remedy: no new gate. Each rung's plate-against-field reading is printed beside its row in the owner's strip, in both schemes, and the default is the first rung that is GREEN on ink and visibly firmer than v11.0.2's plate by that reading. If level 1 is both, say so with the number. The claim "level 1 is one veil step firmer than v11.0.2" needs its reading for the folded plate as well as the open one (INPUT-daraksha-2x, row 4: the folded plate rides a lighter wash).

### 3. RU-60: the least visible of three answers is made a ship gate, and its release rule works against the press. Major.

- The measured need is "a phone now shows NO page name at all" (INPUT-daraksha-2x). A name behind an undiscoverable 500 ms hold leaves a phone showing no name to anyone who has not been told.
- "The release does not activate the seat": a slow or unsteady press of half a second now does nothing. That makes the dock harder to use on the device the ruling is for. As I recall it, Apple's own press-and-hold name on a tab bar (the large content viewer) selects the item on lift; this is my recall, not a reading, and the build seat should check it before it copies or departs from it.
- It adds a timer and pointer listeners to every seat. The ceiling in `restraint.md` is "listeners per control: 0".
- "11.2.0 does not ship RU-28 at either pointer without its names" ties the dock's release to Tooltip's wave, where OWNER-READ question 2 placed names "with the Tooltip work, not with this dock release".

Remedy: keep press and hold as the default and keep the flash at no. Drop the cancel on release (the seat activates on lift, as a press does), put the one listener on the run and not on each seat, and state what a phone user sees without holding: the page's own heading names the page, and the README says so. Ship gate only if the owner's answer to question 13 makes it one.

### 4. RU-61: the inferred anchor changes mounted docks in a minor release, and nobody has looked at what the open plate covers. Major.

- RU-63 parks the defaults of `collapse` and `fitContent` to 12.0.0 because "each changes what a mounted dock does... which a minor release does not do". RU-61's "where the consumer set none, a dock with a `#persistent` seat anchors at the start" does exactly that to every folding dock with a persistent seat, in 11.2.0, by reading which slots are filled. It is a mode a reader cannot see in the markup.
- Overlay means the open plate lies over the neighbour. In atlas the neighbour is the figure's legend (INPUT-hover-shift), and the dock holds open for its linger after the pointer leaves (3 to 6 s, OWNER-READ). The plate is translucent by design. So a brush of the pointer prints the dock's seats over legend words for seconds. The gate reads the neighbour's box (0.25 px) and nothing about what is covered or whether it can still be pressed.
- The ruling is honest that it is a hypothesis throughout. The objection is to the default and the gate, not the mechanism.

Remedy: in 11.2.0 `anchor` does its job only where the site set it; the inference from slots waits for 12.0.0 with the other default changes, or for the owner's yes to question 15. The prototype's three cells add one strip: the open plate over atlas's legend at the plate level RU-57 picks. If words show through words, the in-flow dock needs the firmer plate or the reserve, and that is the owner's to see before it joins the pass.

### 5. RU-63: the budget is paid in names nobody reads, against the wrong base. Major.

- The owner: "Dock seems like a mess with all of this complexity." `restraint.md`: "A seat that adds a piece states what it removes, and the removal outweighs the addition."
- The 21 removed names are used by none of the eleven apps. Removing them is right, but it takes nothing away from what a site author meets. The 14 added names are all ones a site is meant to use. Net for a reader of the dock: 14 more.
- The line budget is read against v11.1.0 (11,081). The ruling's own count gives v11.0.2 as 10,489. Its arithmetic for the candidate is 11,225 less about 490 plus up to 100, about 10,835. The bound of 10,880 lets 11.2.0 ship about 390 lines above v11.0.2, which was tagged the same day the owner made that remark.
- `ControlsDock` is justified in the ADDS table as a component, by three sites. Its six names are not justified one by one. `collapse`, `pinned` and `update:pinned` are pass-throughs on a preset whose point is that it folds by its own rule (`ControlsDock.vue:60-63` computes `collapse` itself). `within` and the exposed `controlCount` name no site in RULINGS-6.
- `data-dock-glyph` is one public name for one site. The rule beside it already sizes a direct `svg`, `img` or `picture` (`icon-button.css:249`), and daraksha's glyphs are pictures.

Remedy: keep the removals. Count the budget two ways and report both: all public names, and names a site is expected to use. Read lines against v11.0.2 as well as v11.1.0. Each of the 14 new names carries the site and case that needs it, or goes: start with `pinned`/`update:pinned`/`collapse` on `ControlsDock`, `within`, `controlCount` and `data-dock-glyph`.

### 6. RU-58: the census line fixes nine tenths in mixed docks before the owner has answered question 17. Minor.

- `strip-glyph-6`, both engines, 0.9 row: the theme glyph is the heaviest thing in the nav dock, about twice the cap height of "Home" and "Settings" beside it. RU-58 extends that to Search and to every unsized glyph in the ten compositions. The owner's "2x bigger with not so much padding" was said of an icon-only dock (`owner-frame-120.png`: small pictures in wide seats).
- RU-55 already holds the answering piece: in a seat with a word, the glyph is sized from the word, 1.5 em. The same proportion is not applied to an icon seat sitting in a run of worded seats.
- Question 17 asks him, with the default at nine tenths. The new G-13 line ("every icon seat's glyph box is the share times the layer height") then makes any other answer a gate change.

Remedy: write the census line against the share token, not 0.9, and shoot the question-17 strip with a third row: icon seats in a worded run at the word-derived size. No new rule until he picks.

### 7. The pass adds gates and warnings faster than it removes them. Minor.

- New in RULINGS-6: G-16, three clauses on G-15, two census lines on G-13, the in-flow gate, the `touchname` gate, and a development warning for a dock whose persistent seats crowd the run (RU-63, WAITS, "not built" yet it adds a warning). `ControlsDock.vue:56` already warns in development for a seventh seat.
- G-16 is sound (a size nobody has read). The warning is code for a case one site raised and the ruling declined.

Remedy: drop the new warning. For each added clause, name the existing clause it replaces, or say none.

## Dropped on the second reading

- *RU-56's "press" as a third step is a new mark.* `--dock-control-press-bg` exists (`sizing.css:275-279`), and `strip-hover-6` shows hover and press as one fill deepening. No addition.
- *RU-61's overlapped neighbour would paint over the dock.* The dock root is already a stacking context (`dock.css:59`), and I have no cell that shows a fault.
- *RU-53's `dock:rect` mark adds to the library.* G-12 reads the `dock:` marks absent from the built library (MEASURE-6).

## What the owner would see in the sixth strips

- Plate: the bottom row (this build) is a dark slab in dark and a cream slab in light, with no field showing through. It reads as less glass. RU-57 is right to withdraw it. The middle row is today's plate with stronger words.
- Selected segment: in the bottom row "5Y" and "Lin" are barely marked in either engine. RU-56 is right that this must change.
- Glyph: at 0.9 one oversized sun beside small words and a small Search; in light, two tabs filled. Chromium's two right-hand columns are mislabelled, with a black band (RU-59 covers it).
- Hover and seat-set: one disc under one glyph, no box moves, nothing ornamental. Nothing to object to.
