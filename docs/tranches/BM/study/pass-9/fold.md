# BM pass 9: the fold of its two critiques

Folded by pass 10 (claude-opus-5-5, 2026-11-24), before its own work. Each objection was re-read against the evidence it cites. 22 objections: 20 accepted, 2 accepted in part, none rejected.

The largest change is to the Slider. Pass 9's B grew the band, the knob and a separate shell on five paint-thread legs. It also raised a knob on the default thumbless slider, and painted daraksha's gold groove grey. It is withdrawn. Pass 10's C is ChatGPT's construction: the track's own ground is the shell, it grows by one clip, and the fill keeps its size (DESIGN §8.3). Every slider objection below lands in C.

Working files:

- `pass-10/slider/`: C's sketch, its bytes against BL's build, and the count and geometry probe on the new page.
- `pass-10/goo/goo.next.css`: the goo's switching times, written into a sketch.
- `pass-10/DESIGN.before-pass10.md`: the design as pass 9 left it, with these amendments marked "amended in pass 10, fold …" where they land.

The evidence re-read for this fold:

- **Slider census.** The sites' newest branches were grepped for `--slider-thumb-bg` and `--glass-slider-track-background`:
  - value.js `c45` and `c48`, `demo/styles/foundation.css:499`;
  - fourier `f45`, `f47` and `no-sample`, `FourierTimeline.vue:293` and `SliderControl.vue:272`;
  - keyframes `kf45`, `demo/styles/style.css:255`;
  - daraksha `b11-occasion`, `src/gilt/gilt.css:56-66`.
- **BL's slider sheet** at `fe30f9882`: lines 100-140, 296-330 and 376-620.
- **Pass 9's slider files**: the sketch, `slider-bytes.mjs` and `probe.mjs`.
- **The local reading site**: `local/build.mjs`, and `www/` as built.
- **The goo**: `pass-9/goo/swap.json`, pass 8's `goo.next.css`, and §3.9's two conditions.
- **The precepts**: `restraint.md` (`:125-128`, `:143` and the ceiling, `:195-212`) and `motion-canon.md` P0a (`:55-100`).

| # | Ruling | Reason | Lands |
|---|---|---|---|
| A9-1 | Accept | B moved the band's growth and the knob onto five paint-thread legs. Law 5 and the P5 draft allow such a leg only as an effect of 200 ms or less, never a body's travel. C has one paint-thread leg on a slider with no knob: BL's own shell clip, a 200 ms reveal. On a knobbed slider the knob grows by `scale` as built, on the compositor. | §8.3 (DESIGN, rewritten); P10-slider |
| A9-2 | Accept | ChatGPT nests three capsules, shell ⊃ fill ⊃ knob, and its shell is the track (MEASURE §2.2; the crops show no second ground). B added a fourth ring. In C the track's ground grows to become the shell. BL's separate card ground, its hairline and its opacity leg go, and that is the cut. | §8.3; the apotheosis table (§13) |
| A9-3 | Accept | B's list had seven legs, nine with the readout, and four or five under choice 19 B. The same legs ran on a hover, against the hover ceiling of 2 and P0a's 4 px edge. C counts as follows. A hover moves the ground's edge by g/2 (4 px at most) on one leg. A press or Tab completes it to g on the same leg, and a knobbed slider adds its knob's `scale`. The readout adds its opacity and scale where a site gives `valueText`. | §8.3's count table; §10 |
| A9-4 | Accept | O-408, "capped and invisible, like you're just pulling the track", and value.js's "no visible thumb" bind the default. In C a thumbless slider never draws a knob, at rest or held. The fill's capped end is the grip. | §8.3 |
| A9-5 | Accept | BL documents `--glass-slider-track-background` as public, and daraksha sets it to a gold mix (`gilt.css:60`). In C the grown ring is that same ground, drawn on the shell, so a gold groove grows gold. An image ground stays on the track's own box (`background-origin: content-box`, `no-repeat`), so a ramp stays aligned with its values. Its ring is then clear, which is stated. | §8.3; the daraksha message |
| A9-6 | Accept | B added 199 B and removed nothing a site carries. C removes the shell's card ground, its hairline, its opacity leg and the hover's knob growth. It costs +52 B over BL's sheet, about a quarter of B's (`pass-10/slider/slider.json`). It ships in the release with BL's own slider removals, 776 B of sheet and 1,525 B of script (W-B.18), so no slider site's sheet grows. The ledger sets it against each site's bound. | §8.3; §11 |
| A9-7 | Accept | The P5 draft and the ceiling's "0 wrappers for a motion" would bar the goo pass 9 decided. P5 and the ceiling each gain a clause for the dock's fusion layer, on `restraint.md:125-128` ("goo belong[s] to the spatial morphs he ruled: dock fission and fusion"). | `pass-10/precepts.md`; DESIGN §12 |
| A9-8 | Accept | A development warning that production strips leaves a silent substitute. The no-filter branch and the warning go. The goo is an option of the 12.0.0 register alone, on a dock that by W-R.1's construction samples nothing (B9-4), so no second path exists. | DESIGN §7.4; `pass-10/goo/goo.next.css` |
| A9-9 | Accept | P9-slider drew A's knob in the fill's colour and B's at opacity 0, so the letters differed in two ways. P10-slider draws A, B and C under one rule: the default slider shows no knob, held or not. Only the knobbed slider shows each letter's knob. | P10-slider |
| A9-10 | Accept | The readout entered from 0.6 and shrank back, against P0a ("from 0.8 to 0.96", rule 3: "fades and does not slide back"). It now enters from 0.9 and leaves by fading alone. B's 0.75 knob is gone with B. | §8.3 |
| A9-11 | Accept | Choice 8 A's dip is 100 ms out and 100 ms in. The Carousel's reduced press goes to BL at those figures, not daraksha's 144 and 144. | §5.3; the BL row in §14 |
| A9-12 | Accept | Pass 8's sketch hid the folded seat only while the filter was off, so its folded rest was unfiltered. `pass-10/goo/goo.next.css` writes pass 9's times: on at the first moving frame of a close, held through the folded rest, off on an open at the first frame whose gap is 6 px. Pass 8's sketch is marked superseded on this point. | §7.4; the goo sketch |
| B9-1 | Accept | `local/build.mjs` had no P9-slider, and `www/` still served pass 8's P8-present, with its zero-height rung. The build now takes pages that have no published link, the board links P9-slider and the pass 10 pages, and `www/` is rebuilt. READINGS.md lists the local addresses. | `local/build.mjs`; `choices/glass-choices.html`; READINGS.md |
| B9-2 | Accept | Item 6 calls WebKit's handling of a translated child under a filtered layer unread, so "needs no second path" went past the evidence. Q2 is closed on the owner's ruling. Item 6 is a check for the 12.0.0 split wave in Safari's Web Inspector (Layers), with B's Playwright WebKit cell, where the neck formed under a running Web Animation, as the indication. | §7.4; §15 |
| B9-3 | Accept | "Bounded" gave an area, not a time. The cost now reads "unmeasured", and it counts two CPU blurs per repaint: the σ 4 threshold and the drop-shadow. The fact check is restored: P7-fuse's C with Busy page on, a page scroll with the dock folded, Low Power Mode, and Home Assistant's app. | §7.4; §15 |
| B9-4 | Accept | §3.9's two conditions had dropped out. The goo, and the 12.0.0 window on the dock, hold only if W-R.1 moves `--dock-surface-blur` to the zero rung and writes the dock's `backdrop-filter: none`. That is now a gate on the tranche's goo wave, not a runtime fallback. | §7.4; tranche gate G-6 |
| B9-5 | Accept in part | C removes the premise. A slider with no knob has one leg, which cannot come apart. On a knobbed slider under a stall the knob's `scale` can run ahead of the clip, and the knob then stands g/2 past an ungrown band for those frames. That is a whole slider, not a broken one, and it is stated. A Busy page check of C is listed as optional, and Home Assistant is asked the cost question. The request to redescribe B's stall falls with B. | §8.3; §15; the Home Assistant message |
| B9-6 | Accept in part | The page fault stands and is cured by A9-9, with the ask split: press and drag on the phone, Tab and the mouse dwell on a Mac. The census correction is rejected. At each site's newest branch, value.js, fourier and keyframes set `--slider-thumb-bg` to their fill's colour, and daraksha sets it to its own tones (the refs listed above). The critic grepped older checked-out branches. "Three of six hide the thumb by token" stands. | P10-slider; §8.3 |
| B9-7 | Accept | Q7 had dropped out, and fact readings were filed with the optional letters. §15 now separates the two. The letters on choices amend if they return. The fact readings (Q7 by R2 and R6; P4-bud's F with Frost on; the goo's cost and its Layers check) are listed, and every claim that rests on them is marked an inference. None blocks. The 11.x window still ships only where its frost reading holds: that is a conditional ship, not a hold. | §15; §3 |
| B9-8 | Accept | On the dock row's close the gap goes 8 → 5.02 → −1.73 px at 60 Hz and 8 → −1.73 at 30 Hz (`pass-9/goo/swap.json`). No drawn frame falls between 0 and 5 px, so a fold shows no bridge. An open draws one in 3 frames at 60 Hz and 1 at 30. Stated, and put on the owner's list beside the thin waist. | §7.4; §14 |
| B9-9 | Accept | As A9-3. | §8.3 |
| B9-10 | Accept | O-428 is designed in this pass. A warm sun's rays draw in under its disc, and a cool night disc slides across to carve the crescent. The press is counted, and the design goes to BL's 11.2.0 row. | §9 (DESIGN); P10-toggle; `pass-10/toggle/` |
