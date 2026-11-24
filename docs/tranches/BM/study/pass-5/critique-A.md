# BM pass 5: critique A (the owner's law and restraint)

Seat: critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source and staged nothing.

I read `CHARTER.md`, `study/UNION.md` (sections 2 to 4 in full), `union-fold.md`, `INBOUND.md`, `READINGS.md` (nothing published, nothing returned), `DESIGN.md` §1 to §7 with every pass-5 amendment, `pass-4/fold.md`, and every pass-5 working file: `pages/P5-mark.html` whole, `mark/mark.mjs` and `mark.json`, `mark/sketch/mark.next.css`, `mark/sketch/selectionMark.next.ts`, `mark/ledger.*`, `fold/sketch/*.css`, `check/dom-run.txt` and `retry.log`. I re-read the precepts and rulings each objection cites: `restraint.md` :20-30, :120-210; `motion-canon.md` :25-100; `affordance-map.md` :1-100; `docs/precepts/README.md` :70-100; BL `W-B.17.md` R-1 to R-15 and :614; BL `W-R.1.md` :78-84; `src/components/tabs/styles/segmented.css`; `src/styles/accessibility.css:31-50`; `src/styles/utilities/base.css:124-152`; `src/styles/utilities/a11y-overrides.css:113-138`; `tests-visual/SegmentedTabs.glide.spec.ts`; `tests/gates/tabs-seam.test.ts`; wi8's `dock/styles/controls/icon-button.css`; rida's state machine (`read/rida-ui.md` §3.2-3.3).

No page was loaded. A no-op probe through `guarded` was refused at about 21:00 on the kernel zone (`data.kalloc.1024` at 14.26M), as pass 5's own runs were. The release figures below come from P5-mark's own closed form (`P5-mark.html:201-206`), run in Node under `guarded --light` (scratchpad `release.mjs`, not kept).

Each objection was made, then its evidence re-read; those that did not survive are listed at the end.

## Objections

### A5-1 (blocking for P5-mark's publication). A release throws the mark past its rest, and past the strip's end in letter A

**Claim.** The release seeds the settle with the finger's speed (§7.2 Release; `selectionMark.next.ts` `release(i, velocity)`; `P5-mark.html:321-327`), including when the follow has pinned the mark at an end and the finger is still moving. The mark then passes its rest by far more than the 0.30 % §7.2 and its W-R.1 paragraph claim (`DESIGN.md:861`, `:870`); 0.30 % holds only from a standing start.

**Evidence.** P5-mark's own spring, dock row:

| Release | Past the rest |
|---|---|
| pinned at the last option, finger moving outward at 200 / 500 / 1000 px/s | 3.8 / 9.5 / 19.1 px past the end, at 50 ms |
| 30 px short of the target, moving toward it at 1000 px/s | 3.4 px |
| 10 px short, 800 px/s | 8.9 px |
| the mark's centre just inside the target, already 20 px past its rest and moving on at 500 px/s | 25.8 px, most of the way into the next option, then back |

That is overshoot on a control (`motion-canon.md:69`; `restraint.md:127-128`) and breaks W-R.1's release rule, which pass 5 says it meets: "A released body lands without passing its rest" (`W-R.1.md:82`). The source being generalized clamps it: "Settled after a drag: x springs there with `snap` (ζ1, r.3, overshoot clamped)" (`rida-ui.md` §3.3). On the page it corrupts the Q8 reading: strip 2 tells the owner to "drag the chosen one past either end" (`P5-mark.html:134`), and letter A, "Keeps its size, and stops at the ends. Today's" (`:145`), will spring past the end on any release with speed, which is what letter C is meant to show.

**Remedy.** Seed the settle with the mark's own velocity, zero while the follow clamps it. After a drag, settle without passing the rest (rida's clamp, or a ζ 1 row for releases). Restate §7.2's Settle row and the W-R.1 paragraph with the speed case. Fix the page before it is published.

### A5-2 (major). The window carries a fifth of width for stretch letters the pass proposes to refuse

**Claim.** The proposed mark's element is "a window wider than the pill you see, by a fifth of the widest seat" (§7.10; `selectionMark.next.ts:43-46`, `widest * (1 + o.stretch.cap)`; `P5-mark.html:229`). The fifth exists only for Q8's B and C, and §7.5 proposes Q8 A, no stretch. With equal slots (every pill strip, every dock run of one-wide seats, §7.1) and no stretch, the window equals the pill and the window apparatus is a constant offset.

**Evidence.** What the fifth costs:
- It changes `.segmented-indicator`'s box. glass-ui's own O-4 spec reads that box (`SegmentedTabs.glide.spec.ts`, `ind.getBoundingClientRect()`), and §7.11 says the spec and arm (e) must be rewritten. UNION says they "change only on the owner's word on Q3" (T1), and under the proposed Q3 A O-4 holds, so they should stand unchanged. It also creates the atlas and Home Assistant questions in §7.10 about the mark's box.
- A translated box contributes to its scroll container's scrollable overflow; `overflow: clip` clips only its content. On a dock run, where the mark lives "in the run's scrolled box" (§7.2), the window past the last seat lengthens the run's scroll range whenever the mark sits at the end, and the range changes as the mark moves. A strip flush to a scroller's edge can scroll sideways. wi8's mark is sized to the seat and has neither problem.
- §7.6 and §5.4 move the more-contrast ring off the mark and onto the options because "a border on the fill would be cut" by the window (A5-10).

**Remedy.** Cap 0 unless the owner takes Q8 B or C. On equal slots the mark's box is the pill, and the glide spec and arm (e) stand. Restate §7.10's questions accordingly. For content-sized hosts, state and test the scroll-extent effect of a window wider than the last option.

### A5-3 (major). The follow starts with a jump of 6 px or more, and carries no weight

**Claim.** The mark holds still for the first 6 px, then writes at the finger (`selectionMark.next.ts:13`, "at the finger, after 6 px of travel; no spring"; `P5-mark.html:293-305`). On the first move past the threshold the mark steps from its rest to the finger, 6 px or more in one event.

**Evidence.** P0: "Nothing teleports" (`motion-canon.md:31`); owner precept 6, "no snaps" (`README.md:83`). The step shows on every drag of every letter on P5-mark, so the owner will read it as part of the mark. rida's press becomes a drag at 0.5 pt, and its lens "follows the finger, clamped to the row (`follow` ζ.75, r.3)" (`rida-ui.md:77`, §3.3), which carries the weight the owner's standing law asks of all motion.

**Remedy.** Measure the grab offset at the point where the threshold is crossed, so the mark starts from where it is drawn, or take the slack up over the next moves. Put a light follow spring (ζ ≥ 0.71) to the owner as a letter, beside the 1:1 follow, rather than settling it by pass 2's rule 3 alone.

### A5-4 (major). The press answer in a selection group is decided, not put to the owner, and collides with BL unlisted

**Claim.** UNION L20 and Q3 make "the one answer to a press" the owner's ("pass 5, on its page; the owner"), with two answers: the mark with the plate standing down, or the plate with the mark not lifting (`UNION.md:66`, `:253`). §7.4 states a third, the word's ink, as decided: "In a selection group the plate does not answer a press." It is not among §7.5's proposals, and no letter on P5-mark shows a plate press, since every letter uses the word's ink (`P5-mark.html:81`, `:285`).

**Evidence.** BL rules the press is the plate's: "Hover, focus and press are every plate's" (`W-B.17.md:110`, R-14); "The press mark, as tone … deepens the hover wash … That is the whole press" (`W-R.1.md:79`); the affordance map's plate table, "the full strength for a press … received" (`affordance-map.md:69`). §3.9 lists W-B.17 R-14 only for the held fill on a trigger, not this.

**Remedy.** Move it into §7.5 as a proposal on the owner's word, add a letter to P5-mark strip 1 (the plate's press tone with the mark gliding), and add the collision with W-B.17 R-14 and W-R.1 §2.3 to §3.9.

### A5-5 (major). The press answer breaks P0a's amount, clock and order while citing P0a

**Claim.** A press moves the unchosen word 45 % of the way to full ink (`--hover-ink-mix`, `color-radius.css:163`; `P5-mark.html:81`) over 150 ms, starting at `pointerdown`, before the mark moves.

**Evidence.** P0a: "a press | 2 % of colour, or a scale no deeper than 0.96" (`motion-canon.md:68`); "a press | about 100 ms" (`:78`); "Colour waits for shape" (`:97`). The sketch names both rules as its basis while breaking them: "the mark's coupled colour leg (P0a, "colour waits for shape")" and "the press's answer, P0a's "2 % of colour" and more" (`mark.next.css:38-39`). Here colour leads shape by the whole press. No amendment is asked for.

**Remedy.** Either keep the press within P0a (2 % of colour, about 100 ms) and let the trade start at the commit, after the mark has left, or put the amendment to the owner with the count rule (§7.3), naming both P0a lines.

### A5-6 (major). The chosen option answers neither hover nor press

**Claim.** The chosen option has no hover answer ("The chosen option shows none", `mark.next.css:46`; `P5-mark.html:85`) and no press answer. A press on it shows nothing until 6 px of travel (§7.2), and a press and release without travel shows nothing at all. On a host that opts into the drag, that press is the grab.

**Evidence.** Law 11: "A hover answer on every pressable host of the mark" (`DESIGN.md:29`). "Every interactive element says what it will do BEFORE it is pressed" (`affordance-map.md:42`). The breath-of-life edict asks every component to show engagement. UNION Q3's starting point gave the press an answer on the mark: "its fill strengthens within P0a's press amount" (`UNION.md:253`). Pass 5 dropped it without showing it.

**Remedy.** On a draggable host, a press on the chosen option deepens the mark's fill within P0a's press amount (one property, one animation), and the chosen option keeps a hover answer. Removing the `:not([data-active])` guard on the hover fill does both on a fine pointer and also cures A5-7(a).

### A5-7 (major). The per-press count is incomplete

**Claim.** §7.3 gives the proposed default A two animations per press "by the rule". That holds only on touch and only on a strip.

**Evidence.**
- (a) **A click from a fine pointer starts three:** the mark's `translate`, the labels' trade, and the clicked option's hover fill fading under the arriving mark. The fill fades because the hover rule excludes `[data-active]` (`mark.next.css:47-48`). §7.3's footnote admits "one more" (`DESIGN.md:893`), but the table still reads "no". The proposed count rule covers one coupled fade, not two (`restraint.md:124`; ceiling "animations running on a press | 2", `:204`).
- (b) **The dock run is not counted.** §2.1 deferred it: "the seats' own legs are counted in pass 5" (`DESIGN.md:77`). The plan asks for the count "on a segmented row and a dock run" (`UNION.md:315`). §7.2 says only "the same table holds with seats for options". wi8's seat press shrinks (`icon-button.css:150-151`, `--scale-press-dock`), darkens through the per-frame `--dock-press-t` drive (`:100-101`), and changes its active paint on commit (`:181-186`). With the mark's `translate` that is four or more per press, and §7 says nothing about which of them stand down.

**Remedy.** Recount A for a fine pointer and fix (a) as in A5-6. Add the dock-run rows: say which seat legs stand down under the mark (the press shrink is already a retired squish, `affordance-map.md`'s restraint ruling) and count what remains.

### A5-8 (major). Q3's letter C is not the grammar it stands for, and Q3's "by how much" is not shown

**Claim.** C, "Lifts on every press, taps included" (`P5-mark.html:127`), swells the mark where it rests, on the old option, at `pointerdown`. It moves the mark only at release (`:283-285`). A tap on another option therefore lifts the wrong object.

**Evidence.** In the source the brief asks to generalize: "Press on tab i: lift rises …; lens x springs to tab i … if it isn't there" (`rida-ui.md` §3.3). The owner would refuse C by sight for a fault of the page. Q3 also asks "by how much" (`UNION.md:253`), with Apple's 1.14 to 1.16 and the eyeglass's 1.114 on record (§7.1). The page shows one amount, 1.08.

**Remedy.** In C, send the mark to the pressed option at `pointerdown` and lift it there, still committing at the tap, and say on the page that it travels before the commit. Show a second lift amount, or state on the page why only 1.08 is offered.

### A5-9 (major). Q16: the proposal strikes a precept that does not conflict with P0, where letter C keeps both

**Claim.** §7.5 proposes B, a 120 ms glide on arrow keys, and §7.11 drafts `restraint.md:129-131` "struck for P0", reading P0 as superseding "no motion on keyboard-triggered actions".

**Evidence.** The line itself was restated under P0: "'Still' never means a cut: a frequent change is short and small, and it still starts and stops. Check: … no motion on keyboard-triggered actions" (`restraint.md:129-131`). It reconciles the two rules: on a key there is no motion, and no cut either. P0 asks for a tween, not a movement. Letter C, the fade across (200 ms, opacity only), already built on P5-mark, satisfies both. BL's W-B.17 R-6 rests on the same line: "A glyph does not move on keyboard focus" (`W-B.17.md:68`), and §3.9 does not list the collision.

**Remedy.** Propose C, which strikes nothing. Offer B as the owner's alternative, which needs his amendment of line 131 and reaches W-B.17 R-6. List the collision in §3.9.

### A5-10 (major). The outline ring takes the focus ring's channel, reaches every pressed or checked control, and cuts under more contrast

**Claim.** §7.6 moves the forced-colours selection sign to an `outline` at −2 px. It does so in the global rule and again in the mark's sheet (`mark.next.css:57-63`). It adds a 1 px outline ring on the chosen option under more contrast.

**Evidence.**
- `outline` is the house focus ring because it is "a channel nothing else in the cascade competes for" (`base.css:130-131`). Under forced colours, focus is `outline: 2px solid Highlight` (`a11y-overrides.css:113-138`).
- On a focused chosen option, which under automatic activation is every keyboard-selected tab, one of the two outlines is lost. Today's global rule is `!important` (`accessibility.css:31-43`), so the focus ring would lose.
- The global rule covers `[aria-current]`, `[aria-selected]`, `[aria-pressed]`, `[aria-checked]`, `[data-state="checked"]` and `[data-state="on"]`, which is every toggle, checkbox, switch and current link in every consumer. §7.6 calls it "one rule … and a fix, so 11.3.0" with no census.
- Under more contrast the ring is a static outline on `[data-active]` with no transition, so it jumps from option to option on each commit while the mark glides: a cut (P0). It is also a second mark for one state beside the fill (`restraint.md:206`). Pass 3's form put the border on the mark, where it would travel. It was moved only because of the window (A5-2).

**Remedy.** With the window equal to the pill (A5-2), draw the forced-colours and more-contrast ring on the mark itself. It travels with it, takes no focus channel and moves no box. Leave the global rule alone, or change it only for the hosts whose boxes it moves, after a census.

### A5-11 (major). "A holds every word" counts only the chosen word

**Claim.** §7.7 says letter A "holds every word on every fill over every flat ground" (`DESIGN.md:927`). The table and the D3 question in §7.10 are solved for the chosen word only. The design keeps the other options at the muted ink (§7.2, Rest; `mark.next.css:40`).

**Evidence.** `mark.json`, `fills.table`, `muted_word_on_it` for the unchosen words on the strip's well:
- A, light, over the worst ground: 4.02, under 4.5 and D3's 4.8. On a grey ground it is 4.52.
- B, light, worst: 1.58. C, light, worst: 1.12.
- The 0.654 / 0.840 α that §7.10 asks D3 for cures only the chosen word.

The unchosen words are what a reader reads to choose ("Every control reads without a guess", `README.md:81`).

**Remedy.** Add the unchosen word to §7.7's table. Restate the claim, and the BL question as the bound for the muted word on the well, or state that the strip's well must be solved apart.

### A5-12 (minor). Lift B is measured against the hover row and differs from BL's held grow

**Claim.** §7.5 says B's 1.08 keeps "every edge within P0a's 4 px", which is the hover row. A lift is a scale up while pressed, and P0a's press row allows only "a scale no deeper than 0.96" (`motion-canon.md:68`).

**Evidence.** BL already rules a held control: "grows to ×1.06 on `springPreset("dock")` … on the block axis only" (`W-R.1.md:80`). B offers ×1.08 on both axes, a second held law, and §3.9 does not list it.

**Remedy.** Show B at W-R.1's held grow, or name the difference to the owner. Say that B and C need P0a's press row amended. Add the collision to §3.9.

### A5-13 (minor). The label exchange fails the study's own 30 fps reading, and §7 does not say so

**Claim.** The labels trade ink over 150 ms. A colour never reaches WebKit's compositor (§4.1).

**Evidence.** `mark.json`, `clocks.label_exchange_fast`: 4.5 frames at 30 fps, `under_five_at30: true`. The drafted law 7 says "a leg under 167 ms is a compositor leg … or it shows fewer than five frames in Low Power Mode" (`DESIGN.md:364`). The press leg (A5-5) is the same.

**Remedy.** Run the trade at 170 to 200 ms, still inside P0a's tint clock, or state the exception to the owner.

### A5-14 (minor). The mark's bytes ship in 11.3.0 on a payer BL has not agreed to

**Claim.** §7.8 lands the additions in 11.3.0: the stylesheet ≤ 539 B, the writer ≤ 434 B, and pass 2's player 655 B. The removals that pay for them, `useDockRunMark` ≤ 1,349 B and the run-mark rules ≤ 494 B, depend on §7.10's open question to BL ("would wi8 take a mark that moves by `translate` alone in 11.3.0").

**Evidence.** After the player, daraksha's reader route keeps about 45 B (§4.7), and Home Assistant's entry has 0.2 kB. If BL declines, both are over. §7.8 names neither site. Law 9: "No site's first load gets heavier" (`DESIGN.md:27`).

**Remedy.** State that the mark ships in the release that deletes `useDockRunMark`, or loads on intent where a site is at its cap (value.js's own ask), and name daraksha and Home Assistant in §7.8.

## Dropped on the second reading

- **Law 10 against the full-ink word beside the mark.** Owner precept 3 is "one focal ink … accent used sparingly" (`README.md:78`). The chosen word is the foreground, not an accent, and §7.3 shows the fill cannot carry the choice alone. The word co-carrying is within the precept.
- **The count rule as a self-serving relaxation.** `restraint.md:124` already says "one primary motion per interaction, plus its coupled fade", and §7.3 puts the rule to the owner as an amendment. It is asked for, not assumed.
- **scroll-chrome not collapsing under reduced motion** (fold A4-10). Today's collapse is the same 0.88 scale (`scroll-chrome.css`, `--chrome-shrink-depth: 0.12`), so no text shrinks further. "Nothing changes" under reduced motion is not a cut.
- **The Q15 finding.** `.segmented-tabs` is `inline-grid` with `grid-auto-columns: 1fr` (`segmented.css`), so pill slots are equal today. Proposing A moves no box.
- **P5-mark's saturated letter buttons beside a 0.12 mark.** They follow the pages' convention (§3.6, fold A14) and are instrument chrome, not the subject.
- **P4-bud's seat hand-off with `transition: none`.** The seat goes in the frame the lane covers it, so no reader sees a cut, and it returns by a tween.

## What holds

The mark as one inert node moved by `translate`, its fill the plate's held fill with no rim, gleam, shadow or blur; the commit before the settle; cancel returning the mark; the reduced-motion dip that cuts nothing; Q3 A and Q8 A as proposals under O-4, with the alternatives on the page; the finding that pill slots are already equal; the forced-colours box move found by reading the source. The objections above are what stands between that design and the owner's law.
