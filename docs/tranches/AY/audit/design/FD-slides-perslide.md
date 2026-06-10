# FD-slides-perslide — per-slide design critique, til-briefing (live @ :5273)

Audited 2026-06-09 against the live deck at `http://127.0.0.1:5273/til-briefing`.
Judged as a designer against the design lens + the L storyboard drafts
(`slides/docs/tranches/L/audit/restructure/s*.md` + `STORYBOARD.md` +
`DECK-DESIGN-CONTRACT.md`) + the four rounds of binding refinement decisions
(`REFINEMENT-DECISIONS.md`). Implementation read-only; all evidence is captured.

**Method.** Playwright-driven: 9× desktop `?export` frames (1280×720, the
PPTX/leave-behind frame — decision #4 makes this artifact load-bearing), live
1280×800 frames (reveal stagger, the armed xray iframe, the settled closer),
6× dark frames (`?export&dark` — decision #17 makes dark first-class), 9× mobile
390×844 `?freeze` frames (coarse-pointer), plus DOM geometry probes for root
causes. Captures: `captures-perslide/` beside this file.

---

## The verdict in one line

The deck has a real, committed identity — warm-cream editorial, Fraunces +
Newsreader + Fira on the φ ladder, one Wolfpack-red focal, the constellation
bookend, the window-chrome rhyme — and four of nine slides execute it at a
STRONG-to-EXCEPTIONAL level (1, 7, 8, 9). But **five of nine slides (2–6)
overflow the fixed 720 canvas and hard-clip** (`overflow:hidden`, measured:
s2 +277px, s3 +94px, s4 +808px, s5 +77px, s6 +99px), which buries load-bearing
content — including every desktop `A PERSON DECIDES` chip — and ships the clip
straight into the export leave-behind. The poster-register prune (decisions
#14/#15/#18) simply has not landed on the middle band. **DESIGN-DEFECTS**: a
distinctive deck wearing an unfinished midsection.

This is the exact gate-green/visually-broken class: every slide renders, no
console errors, the reveal choreography fires — and slide 4 is carrying 2.1
canvases of content into a 1-canvas frame.

---

## Systemic findings (cross-slide)

### SYS-1 — the canvas-overflow class (slides 2–6) — BROKEN-tier
Measured at the 1280×720 export frame (`slide.scrollHeight − clientHeight`):

| slide | overflow | what gets clipped |
|---|---|---|
| 2 Success | **+277px** | the entire bottom tile row (bodies, the speed-test gauge), `SlideFooter` |
| 3 Examples1 | +94px | the receipt foot, the `+2 MORE` fan-in chip, the HUMAN footer lines |
| 4 Examples2 | **+808px** | both cards' chips — `APPROACH` + the load-bearing red `A PERSON DECIDES` sit at y≈1444–1491, two canvases down |
| 5 Examples3 | +77px | both `A PERSON DECIDES` chips, the register |
| 6 Sovereignty | +99px | the capacity band's foot, `SlideFooter` |

The `A PERSON DECIDES` chip is the deck's human-in-the-loop signature (the
red-discipline contract names it load-bearing) — **it is invisible on every
desktop and export frame of slides 4 and 5** and only exists on the mobile
scroll arm (`s4-mobile-390.png` proves the chips are real and well-made).
Capture: `s2-export-1280.png`, `s4-export-1280.png`, probe numbers above.

### SYS-2 — the footer/keyline collision class (slides 2–5)
Because the grid overflows, `SlideFooter` and the optional footer keylines
z-collide into the cards instead of sitting below them:
- s2: the `02—09` register prints INSIDE the K-12 tile; the TIL mark overlaps
  the speed-test tile, which additionally self-overlaps (gauge + "LAB" + title
  interleaved) — `s2-live-settled.png`.
- s4: the footer keyline ("One source can't see the other…") prints literally
  OVER card C's body copy — two paragraphs of text on top of each other,
  both illegible — `s4-export-1280.png`.
- s5: same class, measured — the keyline box [598,630] overlaps the card-F body
  box [508,623] by 25px ("…every remittance, every payout" under "…then a
  person decides") — `s5-export-1280.png`.
The em dash in the register is correctly UNSPACED (`07—09`) where it renders
clean — that fix landed.

### SYS-3 — the strong arm is genuinely strong
Slides 1, 7, 8, 9 all fit the canvas (overflow 0) and carry the identity with
precision. The dark arm (decision #17) is not a derivative — **the dark cover is
arguably the best single frame in the deck** (`s1-export-dark.png`: cream
Fraunces over warm-black, the constellation in warm white, the red anomaly
glowing). No AI-slop tells anywhere: no cookie-cutter card grids of equal
weight on the strong slides, no timid palette, no default type.

### SYS-4 — motion is one language and it works
The `v-reveal` rise-stagger reads cleanly (`s2-live-midreveal.png` catches the
$350M tile mid-rise at partial opacity — the cadence is right), the draw-on
underlines fire post-activate on 1 and 9, the constellation drifts and the
anomaly pings. Nothing bounces, nothing glows off-register. The motion contract
(`--ease-out-expo` rises, no exit overshoot) is honored as far as a frame
capture can attest.

---

## Per-slide critique

### S1 — Intro (the cover) — STRONG, dark arm EXCEPTIONAL
`s1-export-1280.png` · `s1-export-dark.png` · `s1-live-settled.png` · `s1-mobile-390.png`

The cover is a real editorial object: left-weighted three-line Fraunces hero,
"fraud" in red with the hand-drawn underline (decision R2 landed exactly), the
italic "In the data the state already keeps." as the WHAT, and the thesis
standfirst carrying the auditor's-auditor spine (decision #1 honored verbatim —
"unbiased, can't-be-lobbied… periodic, repeatable, indifferent to who is
asking"). The constellation seeds the ANOMALY node in the right dead space with
its dashed label — the metaphor reads at a glance. Brandlock + crest + presenter
card give it the cover chrome without clutter.

- **KEEP**: everything structural. The dark arm especially — project the dark
  cover. The red-underline-on-"fraud" is the single focal and it owns the frame.
- **CUT**: nothing. The 4-line standfirst is the densest element on a poster
  cover, but it is the binding thesis (decision #1) and it sits quiet at
  caption weight — defensible.
- **MOVE**: nothing.
- Nits: the constellation lattice grazes the standfirst block in the live frame
  (legible, just unguarded — see S9 for where this same mask geometry actually
  bites); the mobile presenter card orphans "LAB" on its tag line.

### S2 — Success (the track record) — DESIGN-DEFECTS; the binding recompose has NOT landed
`s2-export-1280.png` · `s2-live-settled.png` · `s2-export-dark.png` · `s2-mobile-390.png`

**The explicit S2 clip + recompose verdict: NOT EXECUTED.** Round-2/3 made two
binding calls — decision #12 (ONE BIG FIGURE: the $350M display lockup with the
other projects supporting, "the finding-style read, not the co-equal
portfolio") and the round-3 carry-in ("the S2 bottom-row clip — the grid
recomposes under the poster register"). The live slide is still the co-equal
3×2 portfolio, still +277px over the canvas, and the entire bottom row is still
beheaded mid-title in the export — the precise artifact (decision #4: the pptx
IS the leave-behind) ships the clip. The footer register prints inside the K-12
tile; the speed-test tile is a triple overlap of gauge, title, and a stray
"LAB" fragment.

What IS right: the anchored headline (decision #3 honored — red "$350 million"
as the one focal, "a direct result of this team's work"), the USF $7B/yr
standfirst, and the faux-window screenshot inset on the Wi-Fi tile, which does
read as "a real screenshot of a real tool" — the cross-slide window rhyme
works. But the $350M then repeats as a co-equal tile (`$350M+`), so the one
number the room must remember appears twice at two weights — the anchor
dilutes itself.

- **KEEP**: the headline + standfirst; the window-chrome inset register; the
  `.glass-resting` restraint (correctly NOT cartoon-loud).
- **CUT**: the co-equal six-pack. Under the poster register this is ONE display
  figure + 3–4 compact supports, not six bodies of prose.
- **MOVE**: the `$350M+` tile content merges INTO the big-figure lockup; the
  fiber/Wi-Fi "every" claims compress to single lines (their completeness is
  the figure — the draft itself says so).

### S3 — Examples1 — COMPETENT, clipped at the foot
`s3-export-1280.png` · `s3-mobile-390.png` · `s3-receipt-zoom.png`

The shared three-beat chassis (mono PROBLEM → serif APPROACH → hairline HUMAN)
reads as one set, exactly as designed. The receipt gag survived
de-concretization (decision #8) with real wit: the copy says "a few dollars"
and the receipt's totals render as **redaction bars** (`$▮.▮▮` beside a real
`$0.00`) — the de-minimis charge literally redacted, neutral ink, red
discipline intact. The fan-in schematic (five source chips → Σ → one red
FLAGGED RECORD) is the right one-red-focal diagram.

- **KEEP**: the chassis, the redacted receipt, the fan-in with its lone red.
- **CUT**: +94px of overflow — the HUMAN footer lines and the receipt foot are
  clipped on desktop; the TIL mark overlaps card A; the `03—09` register
  collides into card B's red FLAGGED RECORD label (a red-on-red pileup at the
  one place the slide's focal lives).
- **MOVE**: nothing structurally — this slide is one ~100px prune from green.
- Risk note: the redaction bars COULD read as broken glyphs (tofu) from the
  back of a room; they survive close inspection as deliberate. A caption-weight
  "redacted" tick or the strikethrough idiom would de-risk it. Designer's call.

### S4 — Examples2 — BROKEN on desktop (the worst frame in the deck)
`s4-export-1280.png` · `s4-mobile-390.png`

+808px of overflow — the slide carries 2.1 canvases of content. On the export
frame: both chip rows invisible (the `A PERSON DECIDES` payoff never renders),
card D is cut mid-figure, and the footer keyline prints directly OVER card C's
body — two interleaved paragraphs, neither readable. This is also where red
discipline leaks: the storyboard headline carries NO red ("The outlier hides
between the records." — red ems live on the card titles), but the live slide
sets the ENTIRE second line in red, on top of card C's red em ("the poor."),
card C's red anomaly dot, and card D's red em ("one person.") — four red zones
where the contract allows one per panel.

What IS right: card C's two-track scatter (CLAIMS over EVERYTHING ELSE, one
red dot off-baseline with the dashed drop) is the deck's cleanest data-glyph,
and the mobile arm proves the full card anatomy (title → glyph → body → chips)
is well-made when it has room.

- **KEEP**: card C whole (glyph, title, chips — as seen on mobile).
- **CUT**: the red headline line (restore the no-red storyboard head); the
  footer keyline (it collides here AND restates s5's keyline — one of them
  goes).
- **MOVE**: this is the canonical SPLIT candidate under decision #15/#18 ("each
  problem may become its own slide; the count is a floor"). Card C and card D
  each have a full slide of material. Card D's motif also needs finishing —
  the county-rolls/voter-file columns are rows of dashes with no visible red
  tie-line; the reconciliation story doesn't draw yet.

### S5 — Examples3 — STRONG ideas, same collision class
`s5-export-1280.png` · `s5-export-dark.png` · `s5-mobile-390.png`

"Who audits the auditor?" over the bell-curve scatter with ONE red dot OUTSIDE
the expected spread (+ dashed drop + mono `OUTSIDE` tag) is **the sharpest
single panel in the deck** — the whole pitch in one glyph, and the thesis beat
(decision #1 callback) carried visually. Card E honors the good-news
discipline exactly: zero focal red in the owed-back glyph (rows → matched chip
→ $ endpoint), red reserved for its (clipped) human chip. Headline red em
("pays you back.") is the storyboard's lone pick-out, correct.

- **KEEP**: card F wholesale; card E's glyph; the headline.
- **CUT**: the measured 25px keyline-over-body collision ("…every remittance,
  every payout" under the italic keyline) + the +77px clip that hides both
  `A PERSON DECIDES` chips and cuts the `05—09` register into card F.
- **MOVE**: the keyline ("Three tools, one shape… who runs all of it,
  continuously") is the bridge INTO slide 8 — it deserves to be the slide's
  one visible foot, not a casualty under the cards. If s4 splits, this keyline
  is the natural closer of the whole examples run.

### S6 — Sovereignty — COMPETENT-NOT-DISTINCTIVE
`s6-export-1280.png` · `s6-mobile-390.png` · `s6-glyph-zoom.png`

The copy is the best-disciplined in the deck (decision #5 honored — the
faculty/"panoply of expertise" register, no student-fleet thread), and the
safety-beat statement ("Someone needs to be watching… answer to the state, not
to a vendor.") with its quiet second clause is the slide's real typographic
event. But the composition is the deck's least intentional: five full-width
horizontal bands stacked edge to edge — header, standfirst, pillar row,
statement, capacity band — a uniform list where every other slide has a focal
geometry. +99px overflow clips the capacity band's foot and the footer.

Red discipline runs hot: red headline em ("never leaves your hands.") + three
red-wash glyph plates with saturated red strokes + red arrows in the pillar-2
glyph = a red field, not a focal. The pillar-2 local-vs-cloud glyph DOES carry
the spec'd three-color story (ink server / red parcel / blue cloud — the one
sanctioned blue outside xray, confirmed at zoom) but at rendered size the
story doesn't read at a glance; it's a red smudge from two meters.

- **KEEP**: the headline, the statement beat, the capacity-band copy.
- **CUT**: the pillar body paragraphs (poster register — glyph + name + one
  bolded clause carry it); two of the three red glyph plates could drop to
  neutral ink plates so the headline keeps the focal.
- **MOVE**: enlarge the pillar-2 glyph to the slide's figure (it IS the
  "models move to the data" argument) — give it the room the bell curve gets
  on s5, and let pillars 1/3 shrink to captions beside it.

### S7 — Xray (the transparency portal) — STRONG, one self-inflicted crop
`s7-export-1280.png` · `s7-live-iframe.png` · `s7-export-dark.png` · `s7-mobile-390.png`

Decision #7 executed exactly: the AI-FACTS nutrition label LEFT (heavy rules,
SERVING SIZE "one system per label", MODEL CONFIDENCE, HUMAN CHECKPOINTS "a
person decides what counts", METHODOLOGY), the portal window RIGHT. The label
is the deck's most distinctive artifact — nobody else's deck has this. The
live branch arms correctly (green LIVE pill, the real site renders, the
address bar is a real `<a href="https://xray.friday.institute/">`), and the
deck-red rail beside the blue-knockout dark portal lands the "our voice /
their live system" read the draft called for.

**The defect is the poster crop.** The export/coarse-pointer arm (what the
leave-behind and every phone shows) renders the 16:9 poster `object-fit:cover`
at `object-position:50% 0%` into a ~1.23:1 window — measured: a 942px-wide
cover image in a 650px box, ~146px guillotined per side. The site's signature
headline renders as "…trition facts / r the models / u rely on." — beheaded
mid-glyph, which reads as a broken screenshot, the one register this window
must never read as. The fix is a re-shoot at the window's real aspect or
`object-position` left — but that's the implementer's; the finding is the crop.

Mobile adds two collisions: the eyebrow strikes through the section-label
("SEE IT RUNNING" over "THE TRANSPARENCY PORTAL"), and the TIL footer prints
over the window body. Dark arm: the window loses its edge against the dark
ground (dark-on-dark, only the title bar separates) — wants a hairline.

- **KEEP**: everything structural — label, window engine, LIVE affordance,
  the blue-stays-inside discipline.
- **CUT**: nothing.
- **MOVE**: nothing. Fix the poster framing and the two mobile collisions.

### S8 — Pipeline + WOPR — STRONG on desktop; mobile BROKEN
`s8-export-1280.png` · `s8-live-settled.png` · `s8-wopr-zoom.png` · `s8-wopr-big.png` · `s8-export-dark.png` · `s8-mobile-390.png`

**The explicit WOPR/console balance verdict: RIGHT — on desktop.** The slide
is the deck's best three-zone composition. "AI handles the tedious." renders
BIG and ONE color exactly per the binding instruction (foreground ink, no em,
no red), with the standfirst set asymmetrically to its right rather than under
it — a genuinely editorial pairing. The vertical 3-stage pipeline (01/02 quiet,
03 FLAG red-washed with the lone red dot) flows the eye down the left; the
ACTUAL WOPR still (decision #6 — the licensed frame, the technician beside the
console, amber dot-matrix readouts legible at zoom) sits right in the
`WOPR · TERMINAL 01` / green `ONLINE` window chrome — the s7 rhyme lands, and
the ONLINE pill against s7's LIVE pill is a quiet joke that pays. The red
`THE HUMAN STAYS IN THE LOOP` lead + the dry console line carry the human
juncture; the UNBIASED/PERIODIC/ON DEMAND strip stays correctly hairline-quiet
(the draft's "prefer the quieter row" was the right call). Two red anchors
(flag stage, human lead) are the same thematic signal, sanctioned by the
storyboard — they read as one thread, not two focals. Slide fits the canvas;
footer clean.

**Mobile portrait is broken**: the capability strip prints over pipeline stage
3, `UNBIASED`'s body interleaves with the FLAG copy, and the WOPR frame
overlaps the TIL footer and the dock — three layers of text soup
(`s8-mobile-390.png`). The portrait stack never got its amplitude floors.

- **KEEP**: the whole desktop composition, frame-for-frame.
- **CUT**: nothing.
- **MOVE**: nothing — fix the portrait stack.

### S9 — Closer — STRONG bones; the bookend payoff is buried
`s9-export-1280.png` · `s9-live-settled.png` · `s9-callout-zoom.png` · `s9-export-dark.png` · `s9-mobile-390.png`

The copy and chassis honor every binding decision: soft close (decision #4),
unspecified venue (#9 — "Start small. Pick one program you already worry
about."), the thesis callback ("The engine itself is the auditor's
auditor—unbiased, repeatable, indifferent to who is asking"), T&M/no-RFP, the
cta-draw underline ringing "proven team" (R3 root-fix consumer), presenter
close card, clean `09—09` foot.

**The defect: the deck's signature payoff doesn't read.** The RESOLVED
constellation node — the entire bookend contract — renders at px (768, 259),
INSIDE the "Start small." callout box (657→1208 × 181→364). The red ring and
its dashed `RESOLVED` label print BEHIND the ask's body text ("Pick one
**prog**ram…" has the ring under it; `s9-callout-zoom.png`), so the one moment
the metaphor resolves is (a) illegible itself and (b) noise under the deck's
most important sentence. On mobile the same anchor lands on the T&M line. The
anchor `0.60,0.36` was placed for s1's dead space; s9 put its callout exactly
there and nobody moved the node. Compounding it: the canvas mask
(`105deg, #000 0→58%, transparent 86%`) keeps the lattice FULLY OPAQUE under
the left text column — fine under s1's display-size hero, but under s9's
13px serif body the lattice reads as noise (live frame), and the node at x=60%
sits in the fade band besides. The mask protects the empty right; the text is
on the left.

- **KEEP**: copy, underline, callout structure, presenter close, the soft ask.
- **CUT**: nothing.
- **MOVE**: the resolved node — to true dead space (lower-center-right is
  empty on this layout), with the callout carrying its spec'd red left-spine
  (currently absent — the card reads unanchored glass) so the eye path is
  headline → ask → resolved node → sign-off. The bookend is the deck's best
  idea; right now it's the only idea the deck hides.

---

## Lens summary

- **DISTINCTIVENESS**: real point of view (editorial audit-ledger, redacted
  receipt, nutrition label, WOPR terminal) — the opposite of slop — but
  executed at full precision on only 4 of 9 slides.
- **TYPOGRAPHY**: the Fraunces/Newsreader/Fira ladder is characterful and
  consistently stepped; the BIG one-color s8 headline and the s6 statement are
  the registers working as designed.
- **COLOR**: the one-red discipline is honored beautifully on 1/3/5/7/8 and
  leaks on 4 (red headline line) and 6 (three red plates).
- **MOTION**: one language, calm, correct; the draw-on underlines and the
  constellation are the high-impact moments and they fire.
- **SPATIAL**: 1/7/8/9 are intentionally asymmetric; 2–6 are grids/stacks that
  additionally overflow — the middle band reads as a different, lesser deck.
- **DEPTH**: the dark-window-on-cream rhyme (2/7/8) and the glass cards give
  real layering; the dark arm is first-class as decided.
- **AFFORDANCE**: the xray address bar is a real link with a LIVE pill — the
  one interactive element announces itself; the dock pager/gear are quiet and
  findable.
- **DELIGHT**: redacted receipt, `ONLINE` pill on the WOPR terminal, "Who
  audits the auditor?" under a bell curve — discoverable, dry, on-voice.

## Priority order (designer's cut)

1. **S4** — split it (decision #18 sanctions it) or halve it; un-red the
   headline; finish card D's tie-line; surface the chips.
2. **S2** — execute the binding ONE-BIG-FIGURE recompose; kill the clip.
3. **S9** — move the resolved node out from under the callout; spine the
   callout. (Smallest fix, biggest narrative payoff.)
4. **S7 poster crop** + **S8 portrait stack** + the s3/s5/s6 ~100px prunes.
5. **S6** — recompose around the pillar-2 glyph as the figure.

Overall: **DESIGN-DEFECTS** — STRONG identity, four near-exceptional slides,
and a middle band that ships clipped into the very artifact (the export
leave-behind) the deck exists to hand Darryl.
