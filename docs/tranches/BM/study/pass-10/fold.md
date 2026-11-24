# BM pass 10: the fold of its two critiques (the final fold)

Seat: final fold, claude-opus-5-5 (asserted from its own system identity), 2026-11-24. No iPhone reading has returned, and under O-426 none is awaited: every decision below rests on the ruling's defaults, and a reading that arrives later amends it.

Each objection was re-read against the evidence it cites. 29 objections: 28 accepted, 1 accepted in part, none rejected. I changed no library source and ran no browser. I amended the pass's own drafts and re-ran three of its arithmetic scripts under `guarded --light` (node, no browser):

- `toggle/sketch/` (A10-1, A10-2, A10-9, B10-1, B10-4) and `toggle/toggle.json`, re-priced: +226 B where pass 10 had +174.
- `slider/sketch/slider-expand-c.css` (A10-5, A10-6, B10-4, B10-6) and `slider/slider.json`, re-priced: +43 B over BL's sheet where pass 10 had +52.
- `access/frames.mjs` and `frames.json` (A10-3, A10-6, B10-4).
- `ledger/ledger.mjs` and `ledger.json` (A10-10, B10-11). The figures from before this fold are kept only in this seat's scratchpad.

The sketch amendments are unrun in any browser. Each wave's proof reads them (DESIGN §15.3).

**The evidence re-read for this fold.**

- **Both critics' runs.** `critique-A-check.json`, and `critique-B-check-chromium.json` and `-webkit.json`: the toggle's crescent with and without the black fill, the ring's first frame, the slider's hit points, and the window's six points.
- **Pass 10's own files.** `access/p10-probe.json` (the cells `toggle B click`, `toggle B click, Reduce Motion` and `real sheet C *`), `access/frames.json`, `ledger/ledger.mjs`, the three sketches, `pages/P10-plate.html:109`.
- **BL.**
  - `waves/W-B.17.md:44-60` (R-1 to R-6).
  - `git show bl/intent/proto:src/styles/glass/plate.css`, whole. Its on-list takes `[aria-pressed="true"]`.
  - `bl/intent/proto:src/styles/tokens/color-radius.css:156-157` (`--fill-hover: 0.05`, `--fill-selected: 0.12`) and the six other readers of those two tokens.
  - `design/dock/wi8/MEASURE-9.md:205-232` and `:580-600`: the step choice; "Hover against current is under 1.2 in every open nav cell, 1.0 on the light grid".
- **glass-ui master.**
  - `DarkModeToggle.vue`, which binds `aria-pressed` to the theme.
  - `useSelectionGroup.ts:2`, which imports `useSelectionIndicator`. SegmentedTabs and ToggleGroup both call `useSelectionGroup`.
- **The precepts.** `motion-canon.md:31-34` (P0), `:55-100` (P0a), `:105-120` (P1), `:146-154` (P3), `:200-225` (P6); `restraint.md:120-206` (motion, the owner law, the ceiling).
- **The board.** `choices/CHOICES.md` choices 5, 9, 10, 11, 13, 14, 18, 19, 23, 24 and 27. The record (`DESIGN.before-pass10.md`) at :20-30 (law 7), :335-345 (R2 in Low Power Mode), :1345-1360 (the fold's counts) and :1755-1770 (the goo).

**Two findings of the re-read, folded with the objections they explain.**

1. **The cause of the toggle's two extra legs.** W-B.17's on-list (`plate.css`, "On, held") takes `[aria-pressed="true"]`, and DarkModeToggle sets `aria-pressed` to the theme. As a `.plate`, the toggle would rest in dark mode at the "on" strength, a second current sign in every dock that mounts it, and a flip runs the plate's `opacity` and `scale`. That is the probe's `tg opacity` and `tg scale` (A10-2).
2. **The fold and the split were over the press ceiling before pass 10.** Under choice 19 B, as ratified, "the proposed fold counts 3 and an open with the theme seat's split 5" (`CHOICES.md` §19), and a dialog's open and its leave each run 3, as today (record :1544-1549). Tranche gate G-3 as drafted would fail BM-6, BM-11 and BM-12. G-3 now names its counted exceptions (A10-7).

## Critique A (the owner's law and restraint)

| # | Ruling | Reason | Lands |
|---|---|---|---|
| A10-1 | Accept | The night inherits `fill: currentColor`, and a luminance mask cuts only under black. Both critics' runs read the bite at 63 % of the disc in Chromium, and B's at 86 % in Playwright WebKit. With the night filled black the bite is the ground exactly in both engines (`critique-B-check-*.json`). The sketch's night now carries `fill="#000"`, and its mask keeps its own colours under forced colours (`forced-color-adjust: none`). P10-toggle carries the same fault and is listed for repair below. | the toggle sketch; DESIGN §9, §10.3; BM-1's proof |
| A10-2 | Accept | The probe lists five legs, and the cause is finding 1. The toggle's plate now answers hover and focus as a fill alone (`--plate-from: 1`). Its glyph is its one on-mark and its press's answer, so it takes no on fill from `aria-pressed`, no press tone and no shrink. That needs one attribute the plate reads, a row for BL's W-B.17. The colour now tweens on the glyph's clock, where the sketch had it swap in one frame (P0). A tap runs three legs on one 200 ms clock: the rays, the night and the colour. That is O-428's grammar ("more like daraksha's … but coloured too"), named in §1 as a yield, and G-3 names it. Under Reduce Motion a tap runs two, the crossfade and the colour. The ceiling draft's glyph clause is struck: with the press tone gone, nothing waits for the glyph. | DESIGN §1, §4.4, §5.1, §9, §14.2; the sketch; `precepts.md`; BM-1 |
| A10-3 | Accept | A linear fade leaves its rest at full speed, against P0 ("it eases off its rest") and P1 (effects ride an `--ease-*`). The change came after the ratification, and no page shows it. Its 30 Hz criterion is not law 7, and pass 10's own legs fail it. `--exit-curve` stays `--ease-out`, which lands 0.388 of the fade in one 60 Hz frame, within law 7's two fifths. The P0a draft line is struck. The eased in-out the critic names (0.236 at 60 Hz, 0.435 at 30) is recorded and not proposed. | DESIGN §5.2, §10.6, §14.1; `precepts.md`; BM-6 |
| A10-4 | Accept | Joined with B10-13; the recommendation for choice 5 is restated. C has two rungs, as W-B.17's plate has: hover at 6.5 % in light and 5 % in dark, and on (current, open, pressed) at 10 %. The 12 % third rung needed a new rule, so it goes. A press on a control already on is answered by choice 9's shrink, or in a dock by the dock's own 2 % layer. The glyph stays still on hover. A tinted seat's plate takes its tone, and its glyph does not, so a hover runs two legs (R-3), and a hovered glyph never outshines the current seat. The plate is on `::before`, as W-B.17 builds it. The seat's glass in 12.0.0 is its plate inside the fusion layer (§7.3), so BL's fill does not move. The page models a colour leg BL ruled out and is listed for repair. | DESIGN §6.2, §7.3, §14.1; BM-2; `precepts.md` |
| A10-5 | Accept, with another cure for the ring | Both faults stand as read. The ring's cure adds no leg: its offset is g at every state. It shows only on Tab, when the ground is at g, so it never moves; as Tab leaves it fades where it stands while the ground shrinks inside it. Under Reduce Motion it sits 2 px out. The readout fault is the page's alone, since the sketch already holds the readout at `scale: 1` on the way out; P10-slider is listed for repair. | the slider sketch; DESIGN §8.3 |
| A10-6 | Accept | The ground returns on its 200 ms clock. A hover then leaves the way it came (P0a rule 1), and the page-thread clip shows six frames at 30 Hz. §10.6, I10 and I20 no longer say every leg holds: law 7's 30 fps line binds page-thread legs, all of which now run 200 ms or more, and the compositor's rate in Low Power Mode is unread (B10-5). | the slider sketch; `frames.json`; DESIGN §8.3, §10.6, §13 |
| A10-7 | Accept in part | Accepted: G-3's text and the drafts must agree. The glyph clause is struck (A10-2). The `:130` draft is scoped to a keyed choice, by P0, the later ruling (`restraint.md:23`), and choice 18 C, so a keyed menu, dialog, toggle or slider moves as it does for the pointer, and the slider's Tab growth needs no exception. Not taken: holding the knob-and-readout slider at two. O-426's own text names all three things: "the rounded shell that grows out of the track, with the knob growing inside it … the value said while held". So the three legs are a yield to that order, named in §1 and in G-3, and the owner may cut one. G-3 also names the counts finding 2 found. | DESIGN §1, §4.4, §8.3, §14.1; `precepts.md`; `tranche-draft.md` G-3 |
| A10-8 | Accept | Joined with B10-2; §13 is rebuilt. G1, F2, S9 and the ChatGPT slider's hover row are each split into the part matched and the part refused, with its law. | DESIGN §13 |
| A10-9 | Accept | The colour puts an ink beside the current seat (law 10), and the glyph runs two motions (P0a's glyph row). O-428 licenses both, and §1 now names the yield. `--toggle-tone`, set on an ancestor, replaces both colours, so a site with one ink sets it to that ink. atlas, whose bound is one focal ink per page, is asked. | DESIGN §1, §9; the sketch; the atlas message |
| A10-10 | Accept | The goo's rules and markup ride the seat's own component, which mounts only on a dock with a seat beside it. They are eager at value.js, daraksha and Home Assistant and absent elsewhere. The ledger's CSS sums already counted them that way. Its on-intent flag, which only affects script rows, is cleared, and the tranche's "on intent" now reads "with the seat". The touch slide's chunk, at most 377 B (choice 14), is a new on-intent row. | `ledger.mjs`; DESIGN §7.4, §11; BM-6, BM-12 |
| A10-11 | Accept | The real-sheet fixture inlines an `index.css` of relative `@import`s, so `--motion-tempo` is undefined and no spring duration resolves; the `started` lists are empty. The end states stand. §8.3's counts are marked as the page's model, and BM-5's proof re-runs the real sheet with the token partials loaded. | DESIGN §8.3, §15.3; BM-5 |
| A10-12 | Accept | Joined with B10-14. §10 keeps to what ran. Each part and mode pass 10 did not run is listed as an engine check owed to its wave's proof (§15.3): the mark, a menu, a dialog, the fold and the goo, in both engines under the keyboard, forced colours, more contrast and Reduce Motion. | DESIGN §10, §15.3 |

## Critique B (production iOS Safari and the evidence)

| # | Ruling | Reason | Lands |
|---|---|---|---|
| B10-1 | Accept | As A10-1 and A10-2. The page's plate also needs its reduced branch, listed for repair below. | as A10-1, A10-2 |
| B10-2 | Accept | Each row was re-read against its union row. L7, M3, M9 and D3 are refusals, each now naming its law. M3 names rida's own facility, a close slower than its open. F2 and F9 are split. L1 is matched in motion, since glass's follow runs at the platform's 60 Hz where rida reports 118 fps on its author's phone, and surpassed in access and cost. The ChatGPT slider's nesting and proportion rows are split, the proportion with its figures: ChatGPT's 1.62 against 1.57 (lg), 1.8 (md) and 2.33 (sm). D16, the sheet that grows more opaque as it is dragged up, is added and refused (G9). | DESIGN §13 |
| B10-3 | Accept | UNION §4 defines a reading as the owner's report or recording. §13's column is now "Evidence", with a "Kind" column: source, Chromium, Playwright WebKit, arithmetic, an unread page, or law. Its head says no answer rests on an iPhone reading. | DESIGN §13 |
| B10-4 | Accept | Joined with A10-6. The toggle's reduced crossfade, the other page-thread leg under 167 ms, also rides its 200 ms clock. | DESIGN §5.3, §9, §10.6; the toggle sketch; `precepts.md` P6 |
| B10-5 | Accept | Joined with A10-3. §10.2's VoiceOver sentence becomes an inference: the run read Chromium's accessibility tree, and VoiceOver reads WebKit's. | DESIGN §5.2, §10.2 |
| B10-6 | Accept | Both engines read the held and keyed shell taking a tap 6 px outside the root, over a neighbour. The shell now takes no pointer in any state, so the root's box is the hit region, as §10.7 and A8 say. The root owns hover through `pointerenter`, and a drag holds by pointer capture. | the slider sketch; DESIGN §8.3, §10.7 |
| B10-7 | Accept | The point (250, 102), inside the `::before` and outside the window's rounded end, hits the dock in both engines. The rounded clip does not bound the hit; the rectangular clip does. The corner is accepted and stated: about 290 px² at the 52 px disc. A static `clip-path` on the window would bound it, but in 11.x it would make the window a backdrop root and stop the blur. The two added points join `window-hit.mjs` and the proofs of BM-8 and BM-11. | DESIGN §3, §10.7; BM-8, BM-11 |
| B10-8 | Accept | The record's sentence is restored: on the three docks with a seat, the fold is painted on the page's thread while the filter is on, and a busy page can stall it. That is law 5 broken, by the owner's order. The ruling makes the cost one "to meet", so BM-12 gains gate G-7, which can be run. With Busy page on in Playwright WebKit, a close with the filter shows no frame gap over 16.7 ms that the same close without the filter does not. Safari's Web Inspector on an iPhone is the reading, and it amends. A failing G-7 stops BM-12 and brings σ and the layer's region to the owner. Home Assistant is asked how it counts a filter held at the folded rest against its one fuse. | DESIGN §1, §7.1, §7.4, §10.6, §13; G-7; the Home Assistant message |
| B10-9 | Accept | Choice 10's default is today's grow (the board: "today's grow ships until you pick"), by O-171. It is a clip on the page's thread over bloom's 370 ms. It is named in §1, in P5's draft and in G-2 as the owner's exception, with its length. | DESIGN §1, §6.3; `precepts.md` P5; G-2 |
| B10-10 | Accept | The messages now say what is known. The curves are ones WebKit's source and release notes say its compositor takes; which parts stay on the page's thread is named; the frame rate has not been read on an iPhone; the goo's cost per frame is unmeasured; every byte figure is an estimate that the site's own build closes. "Safari gets the same thing Chromium does" now reads as the same parts in both. | `messages/` (all nine) |
| B10-11 | Accept | All in the re-run ledger. Every verdict reads "within (indicative)". Gaggle joins the overlay and sheet rows. The touch slide's chunk is priced. Home Assistant's every-script bound (0.8 kB) is checked beside its entry. `useSelectionIndicator`'s −534 B is held out of the sums until BM-4 shows it leaving each entry's import graph. The goo is one thing (A10-10). Q17 stays open until G-4. | `ledger.mjs`, `ledger.json`; DESIGN §11, §16; G-4 |
| B10-12 | Accept | The 27.3 beta note (189473962) is carried into §6.4. In every iOS 26 and 27.2 Safari, and in Home Assistant's WKWebView until iOS ships 27.3's engine, a sheet flicked past its last detent can be slow to settle, and `v-model:detent` waits for it. BM-10 ships in 12.0.0 with the fault stated, on choice 13's default. An iPhone reading amends it, including whether a sheet whose top detent is the scroller's end meets the fault at all. The sheet sites are told. | DESIGN §6.4, §15; BM-10; the atlas, gaggle, keyframes and Home Assistant messages |
| B10-13 | Accept | Joined with A10-4. C's reasons are rewritten on the measure as it reads. B's hover equals its current (12 and 12), the fault choice 42 cured in the dock. A's 5 % in light reads 1.098 against the dock on one cell, under the 1.1 floor, while 6.5 % clears every cell in light and 5 % every cell in dark (MEASURE-9, S4's step choice). Hover against current is 1.0 to 1.2, so C makes a hover lighter than the current seat; it does not make it look different. §6.2's table now gives each letter its own values. | DESIGN §6.2; BM-2 |
| B10-14 | Accept | Joined with A10-12. The window's WebKit cell is no longer owed: B ran it (B10-7). | DESIGN §10, §15.3 |
| B10-15 | Accept | WebKit's compositor takes `backdrop-filter` (§4.1). M1 and §6.6 now refuse on `restraint.md:143` and choice 27 A alone. | DESIGN §6.6, §13 |
| B10-16 | Accept | Q2 and Q12, and Q17 with them, read "Decided on the default; fact owed". | DESIGN §16 |
| B10-17 | Accept | The pages are listed for repair below. Each is the orchestrator's, with the page check, before the owner reads it. | below; DESIGN §15.1 |

## The pages, for the orchestrator

I ran no browser, so these repairs wait for a seat that can run `check-all/page-check-all.mjs` and rebuild `local/`. Under O-426 every letter is optional, so none holds a release. A page the owner may still open should not show a fault the design has cured.

- **P10-toggle.** Fill the night circle black in each mask, and set `forced-color-adjust: none` on the mask's content (A10-1). Give the plate its reduced branch (B10-1). Tween the colour on the glyph's 200 ms clock and the reduced crossfade on the same clock (A10-2, B10-4). Read the crescent by pixels in both themes, not by computed `translate`.
- **P10-slider.** Drop B from the letters he can send, or show it struck (B10-17). Hold the readout at `scale: 1` on the way out (A10-5). Return the ground on 200 ms and fix the ring's offset at g (A10-5, A10-6).
- **P10-plate.** Draw each strength as `opacity` over one fill, with no colour leg (A10-4). Keep the glyph still on hover. State A as hover 5 % and on 12 %, B as 12 % and 12 %, and C as 6.5 % (5 % in dark) and 10 %. Add a still of each letter hovered beside the current seat, so a phone can answer (B10-17).
- **P8-present §1.** Its "fade" exit draws `cubic-bezier(0.3, 0.2, 0.7, 0.8)`, which is neither today's curve nor the one pass 10 proposed. It should draw `--exit-curve` as it stays, `--ease-out` (A10-3).

## What changed in the design, in one list

- **§1.** The yields are named: the goo, the menu's grow (O-171), the toggle (O-428), the knob-and-readout slider (O-426), and overshoot on the ruled spatial morphs. The slider's Tab growth is no longer one.
- **§5.2.** The exit stays on `--ease-out`.
- **§6.2.** Choice 5's recommendation is C as restated: two rungs, the tone on the plate, the glyph still.
- **§6.4.** The slow snap settle before 27.3 is stated.
- **§7.1, §7.4.** The goo docks' fold runs on the page's thread while the filter is on, under gate G-7.
- **§8.3.** The ground returns on 200 ms, the ring stands at g, and the shell takes no pointer.
- **§9.** The toggle: the black night, the plate as a hover-and-focus fill, the colour tweened, three legs by O-428, `--toggle-tone`.
- **§10, §11.** Kept to what ran. The ledger is re-run, with every verdict indicative.
- **§13.** Rebuilt with a kind for each answer, the split rows and D16.
- **§14 to §16.** The owner's list, BL's rows, the readings and the questions, all updated. `OPEN.md` lists what is still open.
