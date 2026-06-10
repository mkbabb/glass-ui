# FD-slides-gestalt — the deck as one designed arc

Lane: FD-slides-gestalt · 2026-06-09 · til-briefing slides 1–9, live at :5273.
Method: full walk light then dark at the canonical `?export` 1280×720 frame (2× DPR),
plus two `?freeze` live-chrome captures. 20 captures + 12 defect zooms in
`captures/FD-slides-gestalt/` (`s{1..9}-{light,dark}.png`, `live-*.png`, `zoom/z-*.png`).
Judged against REFINEMENT-DECISIONS.md (1–18) + DECK-DESIGN-CONTRACT.md.

**VERDICT: DESIGN-DEFECTS.** The identity is real and distinctive—this is not
component-library slop—and the bookends + the two dark-frame spreads are already
poster-capable. But at the canonical export frame, four of nine slides show visible
layout breakage (frame clipping, overlapping text), the closer's narrative payoff is
occluded behind a card, and the export-arm portal poster is mis-cropped. The poster
pass (decision 15) and the breakage fix are the same work: the middle band is dense
because it is carrying document-register content the layout can no longer hold.

---

## 1. The arc, judged

What coheres—and it genuinely coheres:

- **The editorial register is distinctive.** Warm cream, Fraunces display with the
  WONK axis on, Newsreader bodies, Fira mono kickers, the red-rule eyebrow left /
  muted section-label right chrome on every content slide. No slide reads default.
- **The red discipline mostly holds.** One saturated focal mark per surface on 7 of
  9 slides; the receipt total stays neutral; blue stays inside the portal window.
- **The constellation bookend is the right spine.** S1 seeds the anomaly in clear
  space with the dashed `ANOMALY` label (`s1-light.png`)—the thesis in one picture.
- **The window-chrome echo lands.** S2 map inset ↔ S7 portal ↔ S8 WOPR terminal all
  speak the same traffic-light/mono-address frame—"live, real, in the open."
- **Dark is first-class** (decision 17). The dark cover (`s1-dark.png`) is arguably
  the strongest single frame in the deck—cream Fraunces on warm ink, the red fraud
  underline and anomaly ring carrying all the heat. S8 dark with the WOPR still is
  the second. No dark-arm color failures (one minor: S5's ledger-row glyph goes
  near-invisible gray-on-ink, `s5-dark.png`).
- **The delight is present and in character.** The receipt gag is exceptional: the
  de-concretized total renders as redaction tally-blocks—`AMOUNT DUE $▮.▮▮`, serrated
  edges, `· · · THANK YOU · ·` (`zoom/z-s3-receipt-light.png`). Decision 8 landed as
  a better joke than the literal figure. The actual WOPR still (decision 6) landed in
  the dark terminal frame with the `ONLINE` pill—the deck's best art.
- The footer page register is now UNSPACED (`02—09`)—the contract's carried defect
  note is stale; the fix shipped.

What breaks the arc: the deck opens and closes at the poster register and sags into
the document register in the middle. S2–S5 carry 60–120 words per panel in
PROBLEM/APPROACH paragraph pairs; at the 15-minute speaking-driven pace (decisions
14–16) these are read-along slides, and four of them are also physically overflowing
the 720 frame. The arc currently reads: poster → document → document → broken
document → broken document → statement → poster → poster → poster-with-a-buried-payoff.

---

## 2. The defect ledger (capture-evidenced)

| # | Slide | Severity | Defect | Capture |
|---|---|---|---|---|
| D1 | S2 | HIGH | Bottom tile row hard-clipped mid-sentence at the 720 frame; the TIL footer crest paints OVER the first tile's title and the `02—09` register collides with the third tile. Known binding round-2 item (the S2 recomposition), not yet landed. | `s2-light.png`, `zoom/z-s2-cliprow-light.png` |
| D2 | S4 | HIGH | The italic aside ("One source can't see the other…") is absolutely positioned and lays OVER three lines of body copy—text-on-text in both modes. The aside also overflows the card's left edge. | `zoom/z-s4-overlap-light.png` |
| D3 | S5 | HIGH | Worst slide: the aside, the APPROACH chip rows, the body copy, and the TIL footer all collide at the card feet; both cards clip at the frame bottom. Unreadable region in both modes. | `zoom/z-s5-overlap-light.png` |
| D4 | S9 | HIGH | The RESOLVED constellation node—the arc's payoff—sits BEHIND the "Start small." card, bleeding through the glass as a red smear behind the word "program," its label half-occluded at the card edge. The bookend resolution is invisible at a glance in light and effectively gone in dark. | `zoom/z-s9-startsmall-node-{light,dark}.png` |
| D5 | S9 | MED | The lattice is unmasked under the left text column—edges cross body copy; one edge strikes through "us" in "Working with us is simple" and reads as a strikethrough. (S1 keeps edges sub-perceptual under its standfirst; S9 does not.) | `zoom/z-s9-stray-underline-light.png` |
| D6 | S7 export arm | MED | The committed portal poster (2560×1440) is `object-fit: cover; object-position: top center` into the tall window column—the center-crop decapitates the hero's left edge: "trition facts / r the models / u rely on." The LIVE iframe composes correctly (`live-s7-dark-chrome.png`); the leave-behind PPTX/PDF path is the broken one. Fix: re-shoot the poster at the column aspect or `object-position: top left`. | `s7-light.png` vs `live-s7-dark-chrome.png` |
| D7 | S4 | MED | The civic-records card's red reconciliation seam (the `tie--flag` line + halo in `SlideExamples2.vue`) does not paint—the card renders two dot columns with a dead-empty center and NO focal red, losing both its meaning and its one red mark. Labels also collide: a dot paints over "VOTER FILE," "COUNTY ROLLS" clips at the card edge. | `zoom/z-s4-county-rolls-light.png` |
| D8 | S3 | LOW | Card B's `+ 2 MORE` chip and join-glyph foot clip at the frame edge; the `03—09` register lands inside card B's surface. Same overflow family as D1–D3, mildest case. | `s3-light.png` |
| D9 | S5 dark | LOW | The refund ledger-row glyph drops to near-invisible gray-on-ink in dark. | `s5-dark.png` |

Red-discipline edge cases (judgment calls, not clear violations): S4's left card
carries both a red head pick-out ("the poor.") and the red anomaly dot—two focal reds
on one panel by the contract's letter. S6 stacks a red two-line head pick-out over
three red pillar icons; each card is its own panel so it scans, but the slide reads
red-warmer than the rest of the deck.

---

## 3. Poster-grade scorecard

| Slide | Register today | Poster-grade? |
|---|---|---|
| S1 cover | Poster. Big Fraunces, the fraud underline, the anomaly, generous negative space. The 5-line standfirst is the one dense element—defensible as the thesis carrier (decision 1). | **YES** (already) |
| S2 track record | Document. The $350M head is a sentence, not a figure; six co-equal tiles fight it (decision 12 not landed); the frame overflows. | NO |
| S3 examples A/B | Document. Two cards × two paragraphs each; the receipt and the Σ-join glyph are the posters trapped inside them. | NO |
| S4 examples C/D | Document + broken. | NO |
| S5 examples E/F | Document + most broken. "Who audits the auditor?" is a poster headline buried in a half-card. | NO |
| S6 sovereignty | Half-poster. Big statement head + three chips is right; the 4-line italic standfirst and the SECOND big statement block compete for the one big-type moment. | NEAR |
| S7 xray | Poster (decision 7 landed—label left, portal right). Export-arm crop (D6) is the blocker. | NEAR |
| S8 pipeline | Near-poster. "AI handles the tedious." + the WOPR is the deck's best spread; the 3-beat rail and the 3-column band each carry body copy that belongs in the spoken track. | NEAR |
| S9 closer | Poster bones, buried payoff (D4/D5) + a 70-word left column. | NEAR |

---

## 4. The poster-pass work order (slide by slide)

The register decides the count (decision 18). Recommended split: **9 → 13 slides**
(~69s/slide at 15 minutes—the poster register reads at a glance, so the pace holds).

1. **S1 — keep.** Optionally tighten the standfirst from 5 lines toward 3; nothing
   else. The cover is the deck's proof that the poster register works.
2. **S2 — split into two.**
   - **S2a "the $350M slide":** ONE display-set mono figure (`$350M`) at the
     `text-display-2` rung, one line under it ("a direct result of this team's
     work"), the "hundreds of millions" aggregate as the quiet second beat
     (decision 12's one-big-figure read, decision 3's anchored numbers). No tiles.
   - **S2b "already delivered":** 3–4 tiles MAX at the `.glass-resting` register,
     one faux-window map inset as the art, every tile one title + one line.
   - The D1 clip dies in the recomposition, not as a patch.
3. **S3 — split into two.** One example per slide. The invoice slide makes the
   receipt the BIG art (double its size—it has earned it); the anomaly slide makes
   the Σ-join glyph the art with the red FLAGGED RECORD as the one focal mark.
   Compress each PROBLEM/APPROACH pair to a one-line standfirst; the rest is Ray and
   Mike's spoken track. Reconcile the missing A PERSON DECIDES chip (§5).
4. **S4 — split into two + fix.** Kill the absolutely-positioned aside (D2)—fold its
   one sentence into the standfirst or cut it. Make the red reconciliation seam
   actually paint (D7); it is the civic-records poster's entire subject. Fix the
   dot-over-label collisions. One red per panel: on the health-claims poster let the
   anomaly dot carry the red and return the head pick-out to ink.
5. **S5 — split into two + fix.** "Who audits the auditor?" becomes its own poster:
   the bell curve big, the OUTSIDE dot as the one red, one line of copy—it is the
   thesis callback and deserves the room. The refund example gets the pay-back glyph
   big (and a dark-arm contrast pass, D9). The D3 collision pile dies with the split.
6. **S6 — prune to the statement.** Pick ONE big-type moment (the head; demote
   "Someone needs to be watching…" to standfirst weight), cut the italic standfirst
   to one line, pillar bodies to one line each. Reconcile the pillar-2 glyph against
   the contract's blue (§5).
7. **S7 — fix the export poster (D6), ship as-is otherwise.** Optionally trim the
   nutrition label to four rows so the label reads in one sweep.
8. **S8 — compress the rails.** Beats 01–03 keep their mono kickers + one line each;
   the UNBIASED/PERIODIC/ON DEMAND band drops to kicker + one short line or moves to
   the spoken track. The head + WOPR composition does not move.
9. **S9 — surface the payoff.** Re-anchor the resolved node (or re-stack the card)
   so the RESOLVED mark sits in clear cream like S1's anomaly—the arc's resolution
   must be the first thing the eye finds. Mask the lattice off the copy (D5). Thin
   the left column to ~25 words (nonprofit/same-boat + T&M/no-RFP); "Start small."
   and the contact card already do the soft close (decisions 4, 9).

---

## 5. Contract reconciliations (spec edits, not slide edits)

- **DECK-DESIGN-CONTRACT §4 footer note:** the spaced em-dash defect is FIXED in
  `SlideFooter.vue` (`{{ pad(index) }}—{{ pad(total) }}`)—retire the carry-forward note.
- **§9 examples row ("one focal red + A PERSON DECIDES chip per card"):** S3's two
  cards carry NO chip (S4/S5 do). Either the chip rides only where adjudication is
  the card's point—then amend the contract line—or S3 gains the chip in the split.
- **§9 sovereignty ("the local-vs-cloud glyph, the ONE blue site outside xray"):**
  the shipped pillar-2 glyph is red/ink only (`zoom/z-s6-pillar2-glyph-light.png`)—
  no blue anywhere on S6. Either restore the blue cloud or strike the clause; today
  the contract and the render disagree.
- **§5 constellation mask:** the contract promises "the lattice never sits under the
  words"; S9 (and faintly S1) render edges under the body columns. Either the mask
  geometry gets fixed per-slide or the contract softens to "sub-perceptual under
  type"—S1's current render is the acceptable calibration, S9's is not.
- **REFINEMENT-DECISIONS round-2 carry ("S2 bottom-row clip … recomposes under the
  poster register"):** still open at HEAD; this lane's D1 is the same item with
  capture evidence.

---

## 6. Capture index

All under `docs/tranches/AY/audit/design/captures/FD-slides-gestalt/`:
`s{1..9}-light.png` + `s{1..9}-dark.png` (the 18 canonical export-frame walks),
`live-s1-light-chrome.png` + `live-s7-dark-chrome.png` (live stage with deck chrome—
the dock pill + red progress hairline are quiet and right), and `zoom/z-*.png` (the
12 defect crops cited above).
