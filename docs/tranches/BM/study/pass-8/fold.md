# BM pass 8: the fold of its two critiques

Folded by pass 9 (claude-opus-5-5, 2026-11-23), before its own work. Each objection was re-read against the evidence it cites. 25 objections: 21 accepted, 4 accepted in part, none rejected.

The owner's ruling of 2026-11-23 (O-426, `choices/RULING-2026-11-23.md`) came between the critiques and this fold. Under it every choice takes its default, and a reading that arrives later amends a decision but never holds one back. Where a critique asked that a question go to the owner with no default, and the ruling has since given it one, the objection is accepted in part. The default holds, and the objection's evidence is recorded beside it as a cost.

Working files are under `pass-9/fold/`:

- `sketch/`: the corrected sketches. Pass 8's are kept unchanged under `pass-8/bud/sketch/` so they can be diffed.
- `fold.mjs` and `fold.json`: the figures.
- `sheet-check.mjs`, `sheet-check-chromium.json` and `sheet-check-webkit.json`: the corrected sheet and presence, read in both engines.
- `P8-present.pass8.src.html`: the page as pass 8 left it.
- `DESIGN.before-pass9.md`: the design as pass 8 left it.

Each amendment is marked "amended in pass 9, fold …" where it lands in DESIGN.md.

| # | Ruling | Reason | Lands |
|---|---|---|---|
| A8-1 | Accept | reka passes `reference` to floating-ui as the anchor itself (`PopperContent.js:207-208`). With `align: "start"` (`DropdownMenuContent.vue:33`), a seat at the dock's far end would open its menu at the dock's other end, against O-171's "grows from its trigger". The seat stays the anchor, and the dock passes a side offset of its own inset plus 4 px. P8-present now starts each menu at its seat's start edge, as reka places it. | §10.2, §10.9, P8-present §1 |
| A8-2 | Accept | An infinite animation's `finished` never settles. The sketch awaited the subtree, so a busy ring in a Dialog kept `hideOthers` in force, which is LF-38's class. The presence now waits only on the content node's own finite legs, and for no longer than their end plus two frames. Read in both engines with a spinner inside: it unmounts in 126 to 129 ms (`sheet-check-*.json`, `presentWithSpinner`). | §10.4 item 1 |
| A8-3 | Accept | The native scroller took no mouse drag, and it lay over the page above a peek. Its scroller and spacer now take no pointer, and the panel does. So beside a non-modal sheet a tap reaches the page, as BL's phone-scroll rule has it, and beside a modal sheet the tap lands on the scrim, which answers it. A device with no coarse pointer draws no grip, by restraint and the Carousel study's settled refusal of a hand-carried mouse glide. The scrim keeps BL's rung law through a scroll timeline. | §10.5, §10.11, §10.12 |
| A8-4 | Accept in part | D, a veil that only dims under a plate that keeps its one blur, is the cheapest one-blur form: 800,280 device px, 27 % of B's (`fold.json`, `q22`). It is now counted and drawn on P8-present §4. B stays 11.3.0's default by choice 12 under O-426. D is recorded as the cheaper form a later reading may take. | §10.6, P8-present §4 |
| A8-5 | Accept | O-179 records that the owner likes the shear, and §1 bars a study law from cutting an owner's part. The refusal is withdrawn. `--sheet-enter-skew` stays a token at its shipped default of 0, which is choice 13 B's "no shear" by default. A site that sets the token keeps its shear. No token is removed. | §2.1, §10.5, §10.11 |
| A8-6 | Accept | `--reveal-clock` is declared only on the portalled content, so the trigger's delay resolved to 0 s and E's press ran three legs. The rule is now scoped to `[aria-haspopup][aria-expanded="true"]`, reads the register's root clock (`--enter-menu-clock`, `--enter-overlay-clock`, `motion-registers.css:70-85`), and delays only the opacity leg into the held strength. §10.8 is recounted from the sketch. | §10.2, §10.8 |
| A8-7 | Accept | 11.3.0 as booked added about 1 kB while `useSpringMount` waited for 12.0.0. Dialog and SheetContent now stop calling `useSpringMount` in 11.3.0, and its export is deleted in 12.0.0. The slide loads on a menu's first touch. Per entry: one that mounts a Dialog or side Sheet nets −221 B, and one with menus only nets +458 B (`fold.json`, `net_11_3_0`). Home Assistant is asked which overlays its entry mounts. | §10.9, §10.12 |
| A8-8 | Accept in part | Choice 11 put the close's reading of O-171 to the owner in its own words, and he ratified the default (B, a 120 ms fade). P3's exit clause still conflicts with P0a rule 3 and is added to the amendments pass 10 drafts, with rule 3 as the later ruling. | §10.3, §4.6 |
| A8-9 | Accept | reka's DialogTrigger sets `aria-expanded` and `aria-haspopup="dialog"` (`DialogTrigger.js:33-34`), so a dialog leaves on three legs, the same as it enters. The veil's clocks are now proposed: in with the dialog on its entering clock with no lag, and out with it on the one exit clock. P8-present draws them. | §10.6, §10.8 |
| A8-10 | Accept in part | The struck dialog bud is not a choice on the board, so it gets one line on pass 10's list for the owner, with its travel (about 350 px, past P0a's 320 px point) and its count. P4-bud gets no letter, since readings are no longer awaited. | §10.6, §11.6 |
| A8-11 | Accept | Under choice 10's default, today's grow, a context menu's zero-height anchor starts the grow from the bleed band alone, against P0a's "never from nothing". ContextMenu's content now seeds the strip with a row's height. Every other menu is unchanged. | §10.4 |
| A8-12 | Accept | A smooth scroll is a full-height travel under Reduce Motion. A close or a rung change made by a control now takes the dip: out, land while hidden, then in (choice 8 A). Read in both engines: the panel reaches opacity 0 before the jump, and the sheet closes (`closeReduced`). | §10.5 |
| B8-1 | Accept | WebKit drops a zero-height snap area. The rungs are now 1 px tall. A report of "closed" is ignored until the sheet has first been seen open, and the commit waits two frames past `scrollend`, by which time the observer has seen where an instant scroll landed. Read in Playwright WebKit: the sheet opens at 0.40, and P8-present's sheet B reads 40 % after load and after Show (`sheet-check-webkit.json`). | §10.5, §10.10, P8-present §3 |
| B8-2 | Accept | This is the same fault as A8-2, read in both engines, and it has the same cure. | §10.4 item 1 |
| B8-3 | Accept | The observer now only learns the rung. The commit comes at rest: on `scrollend`, or before Safari 26.2 after 150 ms with no scroll and no finger down, the stand-in the Carousel's 11.1.2 cure uses. Read: a finger held past the basin's edge commits nothing until it lifts, and a smooth scroll commits at `scrollend` (`heldPastEdge_quiet`, `smoothToNextRung`). The question to gaggle is corrected. | §10.5, §10.12 |
| B8-4 | Accept | This is the same fault as A8-1. | §10.2 |
| B8-5 | Accept | P8-present §2 now commits as reka does, through the row's own `pointerup` when the press did not start on that row. Its second line names the element the lift reached, so a screenshot of it reads the mechanism glass-ui ships. | §10.4 item 2, P8-present §2 |
| B8-6 | Accept in part | At 30 fps a 120 ms exit's steepest frame carries 0.315, over 11.1.1's fifth, and keeping a fifth needs about 190 ms (`fold.json`, `exitAt30`). That is over HA's 150 ms and P0a's 120 ms, so the three bounds cannot all hold at 30 fps. It is stated now. Choice 11's default holds by O-426, and a Low Power Mode reading amends it. "0.315 each" is corrected to the steepest frame. | §10.3 |
| B8-7 | Accept | The sketch's selectors matched nothing in glass-ui. The rule is now keyed on `.glass-floating[data-slot="dialog-content"]`, since DialogContent is the one part that passes `veil` (`DialogContent.vue:192-195`). Re-measured at 112 B marginal. P8-present §4 draws the veil as a graded pool in a phone's proportions, with the scrim as a separate full dim. | §10.6, §10.9, P8-present §4 |
| B8-8 | Accept in part | The pointer fit is now designed (A8-3) and read in both engines: above the panel the page takes the hit and the click, and a wheel on the panel moves the scroller that takes no pointer (`pointerThroughAndWheel`). The detented sheet inside reka's Dialog, with its focus scope and dismissable layer, is owed as a `bm/study` prototype for the tranche's first sheet wave. | §10.5, §10.13 |
| B8-9 | Accept | Each section of P8-present now has one ask, labelled with the release it decides and the default that ships without an answer. §2 is a test whose two lines the owner screenshots. | §10.10, P8-present |
| B8-10 | Accept | On present's single curve, which is what ships, a panel is at 90 % at 142 ms, at 98 % at 184 ms and done at 200 ms (`fold.json`, `presentSingleCurve`). "Read as done" is left to R5. | §10.1 |
| B8-11 | Accept | Of gaggle's 13 detented sheets, five are shipped (`dashboard/src/`) and eight are prototypes (`dashboard/proto/`). | §10.5, §10.12 |
| B8-12 | Accept | No source in the study says iOS's sheets are scroll views, so the clause is dropped. The change of who times the motion stays with the owner, as the next sentence already said. | §10.5 |
| B8-13 | Accept | Pass 8's first line is restored to "none published, none returned", as READINGS.md stood then. Pass 9's own first line reads READINGS.md as it stands now. | Pass 8's opening |

## What changed on the page and in the sketches

- **P8-present** is rebuilt from `pass-8/bud/P8-present.src.html` by `pass-8/bud/build-page.mjs`:
  - §1: each menu starts at its seat's start edge.
  - §2: the commit goes through the row's own `pointerup`, with a second readout line.
  - §3 B: 1 px rungs; the scroller takes no pointer and the panel does; it commits at rest.
  - §4: a full scrim plus a graded pool on the veil's clocks, and a fourth letter, D.
  - Every ask is labelled with its release.
  - The page check (`check-all/page-check-all.mjs`) now also asserts that sheet B reads its first rung after load, and it opens D.
- **The sketches** under `pass-9/fold/sketch/`:
  - `usePresent.next.ts`: own finite legs, bounded.
  - `bud.next.css`: scoped held fill, root clocks, the context seed.
  - `dialog-veil.next.css`: keyed on the Dialog's slot, with the veil's clocks.
  - `sheet-scroll.next.css` and `useSheetScroll.next.ts`: 1 px rungs, the pointer, no grip on a fine-only device, commit at rest, the scrim's law on a scroll timeline, and the dip under Reduce Motion.
  - `useMenuTouchSlide.next.ts` is unchanged. It now loads on a menu's first touch `pointerdown`.

## Re-read, and what held

The critiques' "what holds" lists stand. Several of pass 8's citations were re-read and are exact:

- reka's `MenuItem.js:57-61`, `MenuItemImpl.js:39` and `DialogTrigger.js:33-34`;
- the veil's mount at `DialogContent.vue:192-195`;
- `focus-veil.css`'s clocks: in 300 ms after a 100 ms lag, out 200 ms;
- `motion-registers.css:70-85`: `--enter-overlay-clock` is `--spring-panel-duration`, `--enter-menu-clock` is `--spring-present-duration`, and `--enter-tooltip-clock` is `--duration-fast`, on master.
