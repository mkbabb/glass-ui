# BM pass 9: critique A (the owner's law and restraint)

Seat: critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-23. I changed no design, page or source and staged nothing. I added one count script and its output beside this file (`critique-A-count.mjs`, `critique-A-count.json`).

I read `CHARTER.md`, `UNION.md` whole (pass 9's line in §4; §2's checks; Q2, F1 to F3, F8, S1 to S5), `union-fold.md`, `INBOUND.md`, `READINGS.md` (thirteen pages published, none returned), `choices/RULING-2026-11-23.md`, and in `CHOICES.md` choices 5 to 9, 19 to 25 and the conflicts list. In `DESIGN.md` I read §1, §2.1, §4.6, §9.1 to §9.11, §10.9, and pass 9's opening, §11 and §12 whole. From pass 9's files I read `pages/P9-slider.html` whole, `slider/slider.json`, `slider/probe.json`, `slider/sketch/slider-expand.next.css`, `goo/swap.json`, `goo/iso.json`, `fold/fold.json`, `pass-8/fold.md`, `page-check.out`, `page-check-p9.out`, and the four strips `slider/strip-{rest,held}-{light,dark}.png`. `pass-8/critique-A.md` gave the form.

I re-read the sources the objections rest on:

- **The precepts.** `restraint.md` whole (`:23`, `:54`, `:125-128`, `:143`, `:195-212`); `motion-canon.md:20-100` (P0, P0a).
- **BL.** `design/slider/MEASURE.md` §2.2 and §3, and the ChatGPT crops `measure/crops/ref-chatgpt-{min,high}-2x.png`; `design/slider/OWNER-READ.md`; `audit/INBOUND.md:398` (O-408); `audit/triage-1119/PLACED.md:28` (G1); `design/overflow/STUDY.md:52`, `:157`; BL's built slider sheet, `git show fe30f9882:src/components/slider/styles.css`, `:112-160`, `:260-300`, `:376-470`, `:486-545`.
- **daraksha.** `src/gilt/gilt.css:53-66` on its newest branch, `b11-occasion` (`305913c`, 2026-11-23), and on `name-r3-hover`.
- **pass 8's goo sketch.** `pass-8/fold/sketch/goo.next.css`, which §11.3 cites.

**The one browser run.** `critique-A-count.mjs` loads P9-slider's model in headless Chromium through `guarded` (one browser, one context per cell, closed in `finally`). For the default md slider (no knob at rest), it reads `document.getAnimations()` 40 ms after a mouse rests past the 120 ms dwell, and 40 ms after a press. It counts declared transitions that start. It says nothing about threads, and Chromium is not Safari.

| Cell | Animations | Which |
|---|---|---|
| A, hover | 3 | shell `clip-path`, shell `opacity`, knob `scale` |
| A, press | 5 | the three, and the readout's `opacity` and `scale` |
| B, hover | 7 | shell `clip-path`, shell `opacity`, track `box-shadow`, lane `clip-path`, fill `box-shadow`, knob `box-shadow`, knob `opacity` |
| B, press | 9 | the seven, and the readout's two |

Each objection was made, then its evidence was re-read. The ones that did not survive are listed at the end.

## Objections

### A9-1 (major). B puts the slider's growth on the page's thread on purpose, against law 5, `restraint.md:143` and the study's own P5 draft, and none of it reaches the owner

**Claim.** §12.2 item 3: "B puts all its geometry on the page's thread, on one clock and one curve: under a stall the picture is late, but its rings stay nested" (`DESIGN.md:1878`). The sketch draws the band's growth as `box-shadow` spreads on the track and the fill and a `clip-path` on the lane. The knob, which A grows by `scale`, now grows by a spread (`slider-expand.next.css`).

**Evidence.**
- Law 5 says what a person sees: "Motion keeps gliding while the page is busy" (`DESIGN.md:23`). B is designed so that under a busy page it does not glide.
- `restraint.md:143`: "Transform and opacity only."
- The study's P5 draft, which §11.2 carries to pass 10 unchanged: "`clip-path`, `mask`, `border-radius`, `box-shadow` … run on the page's thread in WebKit. They may carry an effect of 200 ms or less (a hover fill, a tint), never a body's travel" (`DESIGN.md:366`). P5's own scope is "anything that moves, scales or fades a body". The band growing by 4 px a side is a body changing size.
- The count: five of B's seven hover legs are `clip-path` or `box-shadow`. A has one, the shell's clip, which is BL's (`critique-A-count.json`).
- B moves the knob off the compositor. A's knob grows by `scale`, which WebKit composites. B grows it by a spread. The reason is A's stall hazard, "at worst g/2 (4 px) outside the shell". `slider.json` marks that hazard "derived from where WebKit runs each property, not read".
- §1's rule for a part that fails a law: it "goes to the owner with the law and the measurement it fails" (`DESIGN.md:15`). §11.6 lists only "the slider's third grow leg" (`:1817`). Law 5, line 143 and P5 are named nowhere in §12.

**Remedy.**
- Put the breach on §11.6 with its measure: five paint-thread legs on every slider press and hover, against A's one.
- Keep the knob on `scale` in any form.
- Or say why the ruling's "enlarges it" needs the band itself to grow (A9-2), and draft the exception to P5 that pass 10 would have to write.

### A9-2 (major). B is not ChatGPT's construction: it nests four capsules where ChatGPT nests three, so the refinement adds a ring and a leg

**Claim.** §12.2: "ChatGPT's construction is not A's. Measured from OpenAI's animation, its slider nests three capsules on one centre line, **shell ⊃ fill ⊃ knob**". B is offered as that construction: "shell ⊃ band ⊃ knob" (`DESIGN.md:1874`; sketch header).

**Evidence.**
- In ChatGPT the shell is the track. BL's measure gives "outer shell (white capsule, soft shadow) about 68 tall", and detent dots "on the shell's axis, grey outside the fill" (`MEASURE.md` §2.2). The crops show a white capsule, a purple fill and a white knob, with no second ground inside the shell (`ref-chatgpt-min-2x.png`, `ref-chatgpt-high-2x.png`).
- B keeps BL's shell, a capsule of its own with a hairline and a `--card` ground. It then grows the track's grey ground inside the shell as well. Held, `strip-held-light.png` shows four rings: the pale shell, the grey band, the fill and the knob.
- The track's spread is a leg ChatGPT's construction has no use for. It is one of B's seven.
- §12.1 says "A meets the ruling's list as written" (`DESIGN.md:1870`). So the ruling does not require B's added ring. §12.6 uses "the later ruling wins (`restraint.md:23`)" to cover a third grow leg (`:1931`). That covers what the ruling orders, not what the pass adds.
- `restraint.md:210`: "A seat that adds a piece states what it removes, and the removal outweighs the addition." B removes nothing a site carries (A9-6).

**Remedy.**
- Correct §12.2's claim.
- Weigh the form that is ChatGPT's: the held track is the shell, one ground ringing the fill. That has no second capsule, and BL's shell node and its two legs can go, which would be the cut.
- Otherwise ship A, which the pass says meets the order. Offer B as the owner's letter, not the default.

### A9-3 (major). The press count is understated, and the same legs run on a mouse hover, which is not counted against the hover ceiling

**Claim.** §12.6: "B | 6 on a thumbless slider … Under choice 19 B: 3, the shell, the band (three legs that reveal one shape) and the knob", and "B is one leg over the press ceiling's two" (`DESIGN.md:1929-1931`).

**Evidence.**
- The list §12.6 gives has seven items. The shell's clip and opacity are two, then the track's spread, the lane's clip, the fill's spread, and the knob's spread and opacity. The page starts 7 on a press, and 9 with the readout (`critique-A-count.json`). A's row counts the readout ("5 with the readout"). B's row does not.
- Choice 19 B as the owner ratified it: "a window with the row it reveals counts as one shape, a crossfade's two legs as one" (`CHOICES.md:400`). The lane's clip and the fill's spread are a window and what it reveals. The track's spread is a sibling that no window reveals. The knob's spread and opacity are not a crossfade. Under 19 B as written, B counts 4 (the shell, the track, the lane with the fill, the knob), or 5 with the knob's fade. "The band (three legs that reveal one shape)" is a fourth counting rule, and the owner has not seen it.
- The expanded view also grows "under a mouse after a dwell" (§12.5). The page runs the same 7 legs on a hover. `restraint.md:203`: "animations running on a hover | 2: one fade and one movement". P0a's hover row moves a control's edge "4 px or less" (`motion-canon.md:64`). The shell's edge moves g = 8 px. §12.6 has no hover column, and §11.6 does not list the hover.

**Remedy.**
- Correct the press count to 7 (9 with the readout), and to 4 or 5 under 19 B as written. If "the band" is to count as one, give that to the owner as a rule with the other three.
- Add the hover row: 7 against 2, and the shell's 8 px against P0a's 4. Put both on §11.6.

### A9-4 (major). On the default slider, B raises a contrasting knob while the finger pulls, against O-408, and the pass settles the conflict itself

**Claim.** §12.2 item 2: "Under B the knob rises in the page's colour out of the fill's cap, inset g/4, which is ChatGPT's ringed disc" (`DESIGN.md:1877`). §12.4 gives the mechanism: "thumbless at rest is the knob at opacity 0, not the knob painted in the fill's colour. That is a requirement on BL's O-408 build."

**Evidence.**
- O-408, the owner on 2026-11-19: "the thumbs should not be so fully rounded--though they should be capped and invisible, like your's just pulling the track", read in BL as "No visible thumb: the fill's capped end is the grip" (BL `audit/INBOUND.md:398`). "Pulling the track" is the held state. B shows a page-coloured disc in exactly that state (the white disc in `strip-held-light.png`, B, default).
- value.js's bounds, binding here: "he asked for no visible thumb at all, FORTY-SECOND C", and "No visible thumb on sliders" (`INBOUND.md:57`, `:69`).
- The owner's words of 2026-11-23 name the ChatGPT app and "enlarges it". They do not name a knob. "With the knob growing inside it" is the ruling's gloss, and A already does that, inside the shell.
- A site that sets `--slider-thumb-bg` to its fill keeps the knob hidden under B. Three of six do (`DESIGN.md:47`). The default does not.
- §11.6 does not list the conflict, and §11.8 does not ask value.js about it.

**Remedy.** Put the held knob on a thumbless slider to the owner beside O-408, and ask value.js. Until he rules, draw the held knob on a thumbless slider in the fill's colour, so the grow alone shows. That is the cut, and it keeps O-408.

### A9-5 (major). B's grown ring ignores the track's public ground, so daraksha's gold groove gets a grey ring by default

**Claim.** §11.8 asks every slider site: "Does any of your scrubbers paint its track with an image through `--glass-slider-track-background`? B draws its grown ring in the default ground" (`DESIGN.md:1837`). It asks daraksha only about its knob: "Your transport's knob is in its own tone (`gilt.css:54-66`)" (`:1839`).

**Evidence.**
- The sketch's ring is `color-mix(in oklab, currentColor var(--slider-track-ink), …)`, whatever the site's track is (`slider-expand.next.css`, `.slider-track`).
- BL documents `--glass-slider-track-background` as public theming: it "takes a full CSS `background` grammar … so a wrapper can paint a whole slider population" (BL `styles.css:112-116`).
- daraksha sets it, in the range pass 9 cites: `--glass-slider-track-background: color-mix(in oklch, var(--gilt-body) 23.6%, transparent)` (`gilt.css:60`, `b11-occasion` and `name-r3-hover`). Held under B, daraksha's transport is a gold groove with a grey ring of 4 px a side, in a minor release, by default. The question asked names "an image" and would not catch a colour.
- The ring cannot draw the site's ground, so it paints the library's in its place, with nothing loud. That is the masking the brief and §1 refuse.

**Remedy.** Draw the ring from the track's own ground, or leave the band ungrown where a site sets the token, and document which. Ask daraksha about its groove, and widen §11.8's question to any value of the token.

### A9-6 (major). B adds 199 B with nothing removed, and is not set against the bounds this same pass applies in §10.9

**Claim.** §12.6: "B costs **+199 B** of stylesheet and no script" (`DESIGN.md:1931`).

**Evidence.**
- Law 9: "No site's first load gets heavier … the removal outweighs the addition" (`DESIGN.md:27`; `restraint.md:210`). What B replaces, A's disc rules, is BL's and unshipped. No site loses a byte.
- In the same pass, §10.9's amendment sets the presence's +458 B against "Home Assistant's 0.2 kB" and "daraksha's reader route has about 45 B to spare" (`DESIGN.md:1567`). §12.6 runs no such check, though it reaches more sites than any other row: six, the slider's whole census (§12.7).
- Home Assistant: "a lens must come from the library's existing parts or replace something" ([IN HA 5]).

**Remedy.** Set +199 B against each slider site's entry bound in §12.6, as §10.9 does. Name what pays for it, or put it on §11.6 as an unpaid addition.

### A9-7 (minor). The goo's two breaches are carried, but pass 10's drafts have no clause for them

**Claim.** §11.3 item 3: "Law 5 is broken for those frames, by the owner's order (§1)." Item 4: "The ceiling for a motion is 0, and the owner's order outranks it here" (`DESIGN.md:1754`, `:1756`).

**Evidence.**
- Choice 24 showed the owner both prices ("C adds two wrappers for a motion, paints the fold on the page's thread while it fuses"), and the ruling took C. Carrying them is in order.
- The P5 draft that §11.2 sends to pass 10 bars paint-thread work on "a body's travel" (`DESIGN.md:366`), and it has no clause for a filter that paints the window's travel for a whole close.
- The ceiling's "nodes or wrappers added for a motion | 0" (`restraint.md:201`) has no clause either. The goo's own licence is `restraint.md:125-128` ("goo belong[s] to the spatial morphs he ruled: dock fission and fusion"), which §11.3 does not cite.
- §4.6, which pass 9 amended for P3, gains neither clause. If pass 10 writes P5 as drafted, the precept it writes bars the design it ships.

**Remedy.** Add to §4.6 the exception P5 and the ceiling need for the goo's filtered close and its two nodes, and cite `restraint.md:125-128` as its basis.

### A9-8 (minor). Cost 1's "Met" rests on a production substitute that only a development warning reports

**Claim.** §11.3 item 1: "A dock that keeps the old blur register and asks for the goo gets a development warning and splits without the filter, so it never loses its frost silently" (`DESIGN.md:1742`).

**Evidence.**
- In production, that dock asks for the goo and draws a split without it, and nothing says so. The frost is kept, and the goo is lost silently.
- The owner's rule: the primary works in paint or fails loud. A warning that production strips is not loud where the owner looks.

**Remedy.** Make the combination impossible to ask for: the goo is an option of the 12.0.0 register alone, refused at the prop or type level. Then no fallback path exists.

### A9-9 (minor). P9-slider's A and B differ in two things, and the ask treats them as one

**Claim.** P9-slider asks "Send A or B … B ships in 11.3.0 unless you send A."

**Evidence.**
- A's default slider paints its knob in the fill's colour (`.sl[data-thumbless][data-letter="a"] .thumb::before { background: var(--fg) }`), so held it grows into an ink bulge past the band.
- B's default slider uses a new thumbless construction, the knob at opacity 0 in the page's colour.
- A could take that construction too. The owner then reads "ink bulge against crisp disc" as A against B, when half of it is a change that is not about the expanded view at all. With B as the default, the page steers the answer.

**Remedy.** Draw A with the same thumbless construction, or say in the letter that B also changes how the thumbless knob is drawn.

### A9-10 (minor). The readout is carried "unchanged" against P0a and against the exit rule this pass drafted, and the knob's 0.75 is argued past

**Claim.** §12.5: "**Readout** (R-12, unchanged)" (`DESIGN.md:1920`). §12.3: "The knob's share at rest is under P0a's 0.8 at sm and below. There the knob does not appear from nothing" (`:1895`).

**Evidence.**
- BL's readout enters from `scale: 0.6` and leaves by shrinking back to 0.6 on `--spring-present` (BL `styles.css:520-536`). P9-slider draws the same.
- P0a: "a thing that appears | from 0.8 to 0.96 of its size … Never from nothing" (`motion-canon.md:66`). Rule 3: "The out carries less motion: it fades and does not slide back" (`:88`).
- Pass 9 drafted, in this same pass: "An exit fades where it is: it does not slide or shrink back" (§4.6, fold A8-8).
- On a thumbless slider at sm and below, B's knob fades in from opacity 0 at 0.75 of its held size. That is under the 0.8 floor, and §12.3's reading of it is the pass's, not P0a's.

**Remedy.** Enter the readout from 0.8 or more, and let it leave by fading alone. List the knob's 0.75 on §11.6, or start it at 0.8.

### A9-11 (minor). The Carousel's reduced press is given a 288 ms dip, where the study's dip is 200 ms

**Claim.** §11.4: "Under choice 8 A, 11.3.0's reduced press is the dip, as daraksha's turn is (144 ms out, 144 ms in). This goes to BL as an 11.3.0 row" (`DESIGN.md:1780`).

**Evidence.**
- Choice 8 A: "the mark fades out where it was and in where it goes (100 ms each way); the Switch's thumb dips out, lands hidden, and returns (200 ms)".
- §4.3 rule 1's reduced column: the dip runs "out where it is, landed while hidden, in, 200 ms".
- Law 7's reduced branch is "a fade of 200 ms or less", and Home Assistant asks for 120 to 150 ms (`DESIGN.md:25`).
- 144 and 144 ms is 288 ms with the slide hidden between.

**Remedy.** Send BL the study's dip of 100 and 100 ms. If 144 ms is kept, name it as over the study's figure.

### A9-12 (minor). The goo's new switching times exist in prose only

**Claim.** §11.3 item 2: the filter "turns on at the first moving frame of a close. It turns off on an open at the first frame whose gap is 6 px … It stays on while the dock rests folded" (`DESIGN.md:1744`). The decision cites `pass-8/fold/sketch/goo.next.css`.

**Evidence.** The cited sketch sets `data-fusing` "at the change's start and cleared at its rest". It hides the folded seat only while the filter is off (`[data-folded] .dock-plates:not([data-fusing]) > .dock-seat-plate { opacity: 0 }`). Its folded rest is therefore unfiltered, the opposite of item 2.

**Remedy.** Write the new switching times into a pass-9 sketch, or mark the cited sketch as superseded on this point.

## Dropped on the second reading

- **"The filter turns on at the first moving frame of a close, so law 5 breaks for more frames than it needs."** The first moving frame already brings the gap to 5.02 px on the dock row (`swap.json`). After contact, the seat overlaps the plate until the folded rest, and the union needs the filter for all of it. No later switch-on exists.
- **"The swap's 0.25 to 0.5 px step fails P0's frame gate."** The step now lands in a frame that moves the seat 3.9 to 75.9 px (`swap.json`). Pass 8's form put it on still frames, and pass 9's timing is the cure.
- **"Ratifying C inverts the ruling, which says the costs are to be met."** "Costs to meet" reads as costs to be paid, not as a refusal. The owner saw both prices on choice 24. What survives is A9-7, the drafts' missing clause.
- **"Choice 20 kept at A is a decision the owner had to make."** A is today's look and adds nothing, and it is on §11.6.
- **"Choice 9's scope (the shrink on buttons and icons, one answer on a host of the mark) is the pass's own hybrid."** On a host of the mark, law 4 and UNION L20 force it: the mark, the colour and a shrink would make three. It is on §11.6.
- **"Default-on in 11.3.0 contradicts BL's owner read ('12.0.0: the expanded view on by default')."** O-426 orders it on by default, and BL's release rule puts a changed default look in a minor (`PLACED.md:28`, G1(b)). The sheet ships with the prop either way.
- **"The selected Chip's 1.074 scale is a second sign for one state, folded as 'outside the one mark'."** It is shipped glass-ui (`glass-chip.css:27-28`), kept by the overflow study's ratified default, whose choice 5 offered the alternatives (`overflow/STUDY.md:157`). Pass 9 only classifies it.
- **"Holding the 11.x window on a reading goes against O-426's 'a reading never holds one back'."** Shipping a clip over frost unread could hide a stopped blur. Holding it is the no-masking law, and O-426 does not lift that law.
- **"The shell's hairline in dark breaks choice 7 B."** Choice 7 is a glass surface's rim. The shell is a ground of `--card` with 6 % ink (BL `styles.css:391`, `:407`), not glass.
- **"C claims to need no second path, yet draws A2 for a second dock."** In context the sentence concerns engines: no Chromium-only route. The blur-register case survives as A9-8.

## Summary

Pass 9 meets its line in UNION §4. Its first line says no reading has returned and names the ruling it confirms against. §11.2 walks every provisional decision of passes 2 to 8 to its ratified choice. Q2 is closed on C with seven numbered costs. B and D stay refused, and no third leaf is built. The neck's σ is held at 4 with numbers, and the swap moves off still frames. The 11.x window waits on a reading rather than risk a masked blur. Its fold of pass 8 lands where `pass-8/fold.md` says.

Its new §12 does not stand as written:

- B's growth runs on the page's thread by design, and the knob leaves the compositor. Law 5, line 143 and the study's P5 draft are not put to the owner (A9-1).
- B is four capsules, not ChatGPT's three. The added ring and leg are the pass's own addition, and §12.1 says A meets the order (A9-2).
- The count is 7 on a press (9 with the readout), not 6. It is 4 or 5 under choice 19 B as written, not 3. A mouse hover runs the same 7 against a ceiling of 2 (A9-3).
- The default raises a visible knob while the finger pulls, against O-408 and value.js's bound (A9-4).
- The ring paints daraksha's gold groove grey (A9-5).
- 199 B are added with no removal and no site bound checked (A9-6).

Six minor points: the goo's breaches lack clauses in pass 10's drafts; the blur-register dock substitutes silently; P9-slider's A and B differ in two ways; the readout enters from 0.6 and shrinks back; the Carousel's dip runs 288 ms; and the goo's switching times are not in its sketch.
