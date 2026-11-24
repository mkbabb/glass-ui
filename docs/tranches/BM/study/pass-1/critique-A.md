# BM pass 1: Critic A (the owner's law and restraint)

Seat: Critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, no page and no source, and staged nothing.

Read in full: `CHARTER.md`, `study/UNION.md`, `study/union-fold.md`, `study/INBOUND.md`, `study/READINGS.md`, `study/DESIGN.md` (pass 1 is its only section), the seven pages `study/pages/R1.html` to `R7.html`, and pass 1's working files (`census/census.mjs` and `census.json`, `ledger/ledger-sites.mjs` and `ledger-sites.json`, `check/page-check.mjs`, `check/curve-numbers.json`, `check/retry.log`). I also read `docs/precepts/restraint.md`, `motion-canon.md` P0 and P0a (:25-110), `docs/precepts/README.md` :1-20 and :70-125, and `docs/tranches/BL/waves/W-R.1.md` :1-90 with `W-B.18.md:117`. I checked these against source at `2dbc19a5c`: `src/styles/tokens/glass.css`, `tabs/styles/segmented.css`, `switch/styles.css`, `springPresets.ts`, `scheme-spring.css:61`, `dialog/DialogContent.vue`, `dialog/ModalOverlay.vue`, `styles/glass/focus-veil.css`, `slider/Slider.vue` and the package exports; also atlas's `YearScrubber.vue`, and Home Assistant's `GlassTabs.ts` and `scale.css`, read from git objects.

**No browser run.** `guarded` refused the one headless Chromium run I tried, at 17:11 (`data.kalloc.1024` at 13.49M; the zone log reads +62/s). I worked from the HTML and computed R4's and R5's overlap windows by hand from the pages' own spring code. The page check stays owed, as pass 1 recorded.

Each objection was made, then re-read against its evidence. The ones that did not survive are listed at the end.

## Objections

### A1 (blocking). The census says nothing mounts the focus veil. Every centred Dialog mounts it.

**Claim.** §3.1 rows the focus veil as consumed by "**none**: It mounts only with `loupe`", and §3.3 deletes it in 12.0.0 with the loupe, crediting 469 B to every site. But `DialogContent.vue:195` renders `<ModalOverlay veil …/>` on every open, and `ModalOverlay.vue:87` paints `<span v-if="props.veil" class="glass-focus-veil" …/>`. That span is the full-viewport frost under every centred dialog (`focus-veil.css:51-74`). Seven of the eight checkouts import `/dialog` (`census.json`, Dialog row: atlas 4, value.js 10, daraksha 3, fourier 8, keyframes 5, gaggle 15 files, HA 3). Home Assistant's `scale.css:10-12` sets `--glass-focus-veil-core-x/-y: 208px` and `--glass-focus-veil-bloom: 112px`. Those are the Dialog's 13rem core and 7rem bloom (`ModalOverlay.vue:20-22`) at 16 px per rem, sized because HA's dialogs show the veil. §3.1 reads it as HA sizing the veil "anyway". BL already names the modal scrim as the veil register's remaining consumer (`W-B.18.md:117`).

**Why it matters under the law.** As written, the deletion removes the frost behind every dialog on seven sites. No row names that, no site is asked, and HA's owner asked that "these modals should be more glassy" (INBOUND, HA bounds). Law 1 may well argue for removing it, since a dialog plate frosts over a frosted veil. Pass 1 makes no such case; it rests the deletion on a census that is wrong.

**Remedy.** Correct the §3.1 row: the veil is consumed through `DialogContent` on seven sites. Split the decision in two: the Slider's veil mount goes with the loupe, and the register's fate under every Dialog is a separate row. That row is argued under law 1 if it is to go, asked of the sites, and put to the owner beside HA's "more glassy" order. Take the 469 B out of the ledger until that row is decided.

### A2 (major). Pass 1 maps 12.0.0 without reading BL's 12.0.0 wave, W-R.1, which already disposes of the same parts.

**Evidence.** `W-R.1.md` is "restraint, as glass-ui 12.0.0", the release where BM's removals land (charter). It already does the following:
- **Deletes the specular gleam** (§2.1: `glass-specular-track.css`, `.glass-specular-track`, every `--glass-specular-*` token). BM's ledger credits those 980 B to BM.
- **Owns the grasp and veil registers** (`W-B.18.md:117`: "W-R.1 owns the grasp and veil registers themselves … W-R.1 rules on that"). BM credits those 383 B and 469 B to BM.
- **Keeps the loupe:** "**The loupe** stays, hung from its track by CSS anchor positioning" (W-R.1 §2.3). Pass 1 §3.3 deletes it.
- **Makes a reduced-motion commit a cut:** "Reduced motion. Every spatial leg retires and the tone stays. A commit is an instant state change". Pass 1's law 7 forbids a cut.
- **Sets its own release rule for "the tabs drag"** (W-R.1 §2.3). That overlaps law 3 and I9.

DESIGN.md never names W-R.1.

**Why it matters.** A seat that adds a piece states what it removes (`restraint.md:210`). Removals another tranche has already booked do not pay for BM's additions. On the loupe, pass 1 overturns another wave's line without saying so, and the plan gives no pass that power.

**Remedy.** Read W-R.1 and W-B.18 into §2 and §3:
- Credit the ledger only with removals that W-R.1 does not already make. The specular comes out at once; the grasp and veil come out until W-R.1 rules.
- Mark the loupe a conflict with W-R.1 §2.3, for the orchestrator and the owner to rule, rather than a pass 1 decision.
- List W-R.1's reduced-motion commit and release rule as collisions that pass 5 and pass 10 must settle with BL.

### A3 (major). Law 4 is stated and never counted. The reach table misses breaches the source shows.

**Claim.** Law 4 says "Animations started per press ≤ 2; properties per node per change ≤ 2 … counted per part" (§1). Plan line 1 asks that the checks be mapped onto every part, and the brief asks for the per-control ceiling counted per press. §2.1 has no count, and its "Laws it breaks today" column never lists 4.

**Evidence.**
- SegmentedTabs' indicator moves `translate`, `width` and `height` in one change of selection (`segmented.css:164-168`): three properties on one node, against a ceiling of 2 (`restraint.md:202`). The row reads "1, 5, 7".
- The run mark writes `inset`, `width`, `height` and `border-radius` each frame (UNION T4; `useDockRunMark.ts:171-179`). The row reads "5".
- wi8's fold writes `inset`, `border-radius` and `clip-path` per frame. The row reads "5".
- The Slider press mounts the grasp carriers, the loupe and the veil, and moves the thumb. No count is given.

**Remedy.** Add a "per press" column to §2.1: the animations one press starts, and the most properties any one node changes. Count them from the source for every part that takes the mark or buds, and add 4 to the breach column wherever the count is over 2.

### A4 (major). "A part that cannot pass is cut, not excepted" contradicts §2.1. By law 5's own measure it would cut every spring.

**Evidence.**
- §1: "Every part BM touches passes all nine. A part that cannot pass is cut, not excepted."
- §2.1 keeps ScrollProgressRim "by the owner's order" while listing it as breaking 5. The owner ordered it: "Scroll progress is the dock's own border hairline, edge to edge and following the radius" (`docs/precepts/README.md:105-108`).
- Law 5's measure requires "an easing Safari 27.2 hands to its compositor (`linear()` only from 27.3, I22)". Every glass-ui spring is a 48-stop `linear()` (`scheme-spring.css:61`). The switch thumb rides `--spring-dock` (`switch/styles.css:49`), yet §2.1 marks it as breaking "—". Under the clause as written, every spring-driven part would be cut until R2 returns.
- The UNION never says "cut". When a check cannot be met, it sends the question to the owner (Q2: "the answer to the owner is that the bridge needs a workaround in Safari").

**Remedy.** Replace the clause: a part that cannot pass a law goes to the owner, with the law and the measurement it fails, and an owner-ordered part is never cut by a study law. Mark law 5's easing clause provisional until R2, and apply it the same way to every spring part, the switch included.

### A5 (major). "Takes the mark" on the slider and the switch contradicts the Q4 decision. It brings in a lift and a drag that no site asked for.

**Evidence.**
- §2.1: "Slider thumb | Takes the mark (continuous)". §3.4: "It never lives on a track a finger already drags (every slider)".
- value.js: "a lens over a slider reads as a second thumb", and the owner asked for "no visible thumb at all" (FORTY-SECOND C). HA: the lens is "in the way on the light sliders" ([IN value.js 1], [IN HA 1]).
- §2.1 also gives the switch the mark, and law 2 defines the mark as "one shape that travels between options and rests on the one let go over". That is S2, dragging a switch across its slots, which §3.5 sends to the owner's list with a default of no.
- Both rows add "a lift follows Q3". Neither names a removal: the switch row "loses" nothing. By the UNION's own rule, an addition that removes nothing and has fewer than two sites goes to Q20 (UNION §1 preamble).

**Remedy.** Say per host which of the mark's states each one takes (rest, settle, follow, lift). Settle the conflict: the slider thumb keeps today's glide and takes no lift and no lens. Give the switch the settle only, with the drag left to S2. A lift on either goes to Q20 unless a site asks for it.

### A6 (major). Sliding across a short menu's rows had two site askers. Pass 1 moved it onto the owner's no-customer list with a default of no.

**Evidence.**
- The fold ruled on R-O9: "atlas and HA asked for sliding across short menus' rows, so that stays under Q4" (`union-fold.md`). UNION D2 keeps only "the 160 ms hold and its arming" for Q20.
- Pass 1 §3.4: "sliding across a short menu's rows (atlas's phone section menu, Home Assistant's floor menu) is D2, which is the owner's call (Q20)". §3.5 proposes "No" for D2 as a whole.
- Q20 is defined as "additions with no customer … fewer than two sites" (UNION Q20).

**Remedy.** Restore the split the fold made. The hold and the auto-scroll stay on Q20 with a default of no. Sliding across a short menu's rows stays in Q4's first decision, as a yes for short menus that atlas and HA named, with law 3's commit, pending HA's answer to §3.7.

### A7 (major). Law 2's "moved by `translate`", with SegmentedTabs losing its `width` and `height` legs, decides Q15 ahead of the sites and the owner.

**Evidence.**
- Law 2 is measured as "One inert, `aria-hidden` node per group, moved by `translate`". §2.1 books what SegmentedTabs loses as "the indicator's `width` and `height` legs".
- atlas's strips have content-sized labels (`YearScrubber.vue:211`, One year / All years / Compare; `PlateDial.vue`; `VizOptionsBand.vue`). Moving between labels of different widths by `translate` alone means one of three things: the width cuts, which breaks P0; slots become equal, which moves boxes that atlas's suites fail ([IN atlas 5]); or a non-uniform scale bends the corner (Q1).
- The UNION leaves this open: "a width correction on an out-of-flow mark stays a candidate", and Q15 is settled by "pass 5; the sites; the owner".

**Remedy.** Restate law 2's measure as "moved by `translate`, with a width correction only as Q15 allows". Mark the SegmentedTabs `width` and `height` row "pending Q15", not "loses".

### A8 (major). R3's lanes B, C and D replace the owner's warm ink with Apple's neutral greys: the branch the fold struck.

**Evidence.**
- R3's light veils are `rgb(253 253 253 / 0.535)` (B), `rgb(252 252 252 / 0.526)` (C) and `rgb(0 0 0 / 0.03)` (D). The dark veils are `rgb(49 …)`, `rgb(78 …)` and black.
- Lane A, glass-ui today, is `oklch(0.28 0.035 70 / 0.14)`: a warm ink that darkens in light mode, where B and C lighten with a white wash.
- UNION G1: "The calibration moves amounts only (blur σ, saturation, veil strength), never the ink's hue (`restraint.md:28-30`, `:148`)". Fold R-O8: "the 'lose the ink' branch is struck".
- R3's ask, "the letter that looks most like Safari's bar", makes the owner's pick a choice of ink. A 53 % white wash is not an amount of a dark warm ink, so a pick of B or C cannot be carried back as an amount.

**Remedy.** Re-express B, C and D on the warm ink, varying blur σ, saturation and veil strength only. If a lightening veil is wanted as a candidate, label that lane as a change of ink that needs the owner to amend `restraint.md:28-30` and `:148`, as R7 labels its own question.

### A9 (major). Candidates that break a precept, or pass 1's own law 1, are put to the owner without saying so. R7 is the only page that says so.

**Evidence.**
- **R3, lane D:** `blur(24px)` with a 3 % veil. The owner's standing rule is "a bit flatter, more refined, deft, and slightly less blur" and "Too glassy is this card--too transparent." (`restraint.md:63-65`), against today's 16 px resting rung. The 24 px is pass 1's own choice: the archive line it cites gives no radius ("near-zero veil + heavy blur + strong saturate", `IOS27-ARCHIVE.md:20`). The page still presents D as "from our own iPhone recordings".
- **R3, lane B:** light 12 px, dark 8.4 px. That is two blur values, which law 1's measure ("One blur radius in the token set") forbids. The UNION leaves "whether light and dark may differ" to the owner (discrepancy 6, Q10).
- **R5, lanes C and D:** `panel` (ζ 0.71) and Apple's ζ 0.758 overshoot. The pages' own spring code peaks at 1.042 and 1.026. `restraint.md:125-128` keeps overshoot for "the spatial morphs he ruled", and P2 opens menus without it (UNION Q9). Whether a bud is a fusion is still Q9.
- **R7** says what it is asking: "for the owner's ruling on `restraint.md:143`" (§3.6).

**Remedy.** Give each lane that a precept forbids a line on its page and in §3.6 naming the line it would amend: R3 D (`restraint.md:63-65`), R3 B (law 1 and Q10), R5 C and D (`restraint.md:125-128`, P2). Label D's 24 px as chosen, not measured. A pick of one of those lanes is then read as a request to amend, not as a preference.

### A10 (major). R5's bud breaks pass 1's own laws 1, 4 and 5, and is born as a second glass plate on its seat.

**Evidence.**
- **Two blur values.** The seats frost at `blur(16px)` and the menu at `blur(20px)` (R5 CSS). Law 1 allows one blur value.
- **Glass over glass.** The menu is born at the seat's own box (`x0`, `y0`, 44 × 44, radius 22) at `z-index: 3`, over the seat at `z-index: 2`. The seat stays visible under it. From the page's springs, the menu plate covers the seat for 117 ms (A), 200 ms (B), 155 ms (C) and 139 ms (D), that is, until its top passes `y0 + 44`. That is one translucent plate frosting another: F5, law 1's "glass never frosts glass", and the "doubled ink" and "darker square ghost" that Q9 names. F9 asks for "one plate".
- **Main-thread size writes.** Each frame writes `left`, `top`, `width`, `height` and `border-radius` on one node (`openFrom` in R5): five properties against law 4's 2, none of them accelerated (law 5).
- **The question at stake.** The owner is asked which spring "feels most like Safari's". He will read it through a doubled plate and a delivery the design refuses.

**Remedy.** Give the menu the seats' blur. Make the seat the plate that grows (it hands over to the menu plate at frame 0, with no second plate over it), or start the bud beside the seat's edge so the two never overlap. Q9's answer already names that second path. Say on the page and in §3.6 that the per-frame layout writes are a stand-in until Q1, so the spring reading is taken on shape and timing, not smoothness.

### A11 (minor). The ledger is per site, not per entry or per release. One replacement is left unpriced.

**Evidence.**
- Q17 asks for gzipped bytes "for each entry a site loads" (UNION), and pass 1 is its first pass. §3.2 admits "The figures are per site, not yet per route or entry".
- daraksha's bound is per route (125 KB; the reader at 126), and HA's is its entry (71.6 of 71.8 kB) ([IN value.js 5], [IN HA 5]).
- The ledger nets additions against removals as if both land together. The charter puts new parts in 11.3.0 and removals in 12.0.0, and the two exports the mark replaces are public, so they leave only in 12.0.0: `useSelectionIndicator` on `./motion-core` (`src/composables/motion/core/index.ts:115`) and `useDragVelocity` on `./dom` (`src/composables/dom/index.ts:42`).
- `useDragVelocity`'s 809 B is counted as removed "replaced by kf's estimator (I9)", but kf's estimator is not priced.
- Re-reading this objection: with A1 and A2's credits taken out, the per-site net is still negative. For a dock and slider site it is about −2.0 KB, for gaggle about −1.2 KB, so the direction holds and the figure does not. That is why this is minor.

**Remedy.** Split the ledger into 11.3.0 and 12.0.0 columns. Price kf's estimator wherever a slider site does not already load it. Name the entry each figure lands in: daraksha's shell and reader routes, and HA's entry.

### A12 (minor). The design law leaves out two of the owner's standing laws that bind the mark and the bud: one focal ink per view, and intent first.

**Evidence.**
- §1 restates the UNION's nine checks. Neither "one focal ink per view" (`docs/precepts/README.md:78`; UNION T9, G10) nor "communicate intent first with hover states" (`restraint.md:166-167`; `affordance-map.md`, Intent first) appears among them.
- The mark, the press plate (L20) and the selected label all carry the selection's ink. A bud's trigger answers hover before its press.
- Passes 5 and 8 will check against §1, and as written nothing in it can fail them on either point.

**Remedy.** Add both as laws with a measurement. For focal ink: one ink-carrying sign per selection state in a view. For intent: a hover answer on every pressable host of the mark or the bud, within P0a's hover row.

### A13 (minor). The confirm case leaves the mark resting on a pick the model has not taken.

**Evidence.**
- §3.4: "Where the pick opens a confirmation (Home Assistant's day modes), the commit opens it and the mark settles without firing anything else."
- Law 3's measure is that "The model changes on the tap or on `pointerup`". With a confirmation, the model must not change until it is confirmed.
- Until then the mark rests on the new item while `aria-selected` stays on the old one: two signs for one state (`restraint.md:206`). Nothing says where the mark goes on cancel.

**Remedy.** State the case. The mark settles on the pick, and the model and `aria-selected` change on confirm. On cancel the mark returns to the selection along L16's path.

### A14 (minor). The reading pages' own controls cut, and their labels are bold.

**Evidence.**
- Toggle buttons swap fill on `aria-pressed` with no transition (R2, R4, R5, R6, R7).
- R3's System / Light / Dark switch flips the whole page's colours in one frame.
- The label swaps cut: Fold/Open (R1), Split/Join (R4), Show/Hide (R7). R2's Go drops to `opacity: .5` while disabled, in one frame.
- Buttons are set at weight 600, captions in `<b>`, and R3's column heads at 700 (`restraint.md`, Text and markup: titles are not bold; "at most two emphasised runs per 100 words").
- P0 binds every change the reader sees, and these pages are what the owner sees of BM. Re-reading this objection: none of it touches a candidate's motion, which is why it is minor.

**Remedy.** Put one `transition` on the pages' shared button rule (background and colour on the hover clock) and on R3's ground. Set captions and buttons at the body weight.

### A15 (minor). R3 does not show what plan line R3 asks for.

**Evidence.**
- The UNION's R3 row asks for "today's ladder and the four fits (G1)". The page shows one rung of the ladder (16 px resting) and three of the four fits. Fit (c), rida's thick panel (sharp σ 6.7, wide σ 21.7), is missing.
- C's dark lane is `rgb(78 78 78 / 0.41)`: a gain of 0.59 and a lift of 32, where the fit it cites measured a gain of 0.99 with a curve of 0.395. The page does not say the dark lane is an approximation.

**Remedy.** Either add the ladder's five rungs as one strip and fit (c) at its nearest single blur, or say in §3.6 why each was left out. Mark C's dark lane as an approximation.

## Dropped on the second reading

- **atlas's YearScrubber as a mark host** (§2.2). Its SegmentedTabs is the head's scope control, One year / All years / Compare (`YearScrubber.vue:211`), which atlas named as a yes. The cell holds.
- **HA's worded tabs as a SegmentedTabs strip** (§3.7, Q15). `GlassTabs.ts` is a GlassDock run, so the mark reaches it through the dock, and the UNION's Q15 already names HA's worded tabs. No objection.
- **The bud moving atlas's boxes.** atlas asked for "tips and menus that bloom from their anchor" ([IN atlas 2]). Its box check is about the trigger, the row and the plot, which F9 keeps still.
- **R7's exits scaling back to 0.96.** Both lanes leave the same way, so the comparison is fair, and 4 % is not the slide P0a rule 3 forbids.
- **The release split breaking HA's 0.2 kB in 11.3.0.** `useDockRunMark` is internal, so the mark can replace it in 11.3.0 and HA's 11.3.0 net stays negative. What survives is in A11.
- **Pass 1 stopping its retries after two refusals.** `~/.claude/CLAUDE.md` says to stop heavy work at the 13M refusal, and it outranks the workflow's retry rule. The check is recorded as owed.
