# BJ redress dossier — F31 through F40 (Fable seat)

Per-row inventory / isolation / target / post-mortem / redress / status-check for feedback-ledger
rows **F31-F40**, the user's 2026-07-17 corpus. Every screenshot in range was read first-hand
(F31 + F34-F40 have PNGs; F32/F33 are URL-anchored, no screenshot). Correlations are verified
against live `src/` + `demo/` at HEAD (`package.json` 7.0.0), and reconciled against the formation
corpus (`ASSEMBLY-CROSSWALK.md`, `REGISTRY.md`, the band specs, the perfection docs, the four
`greenfields/GF-*-PASS3.md`, `IOS27-CODEX.md`, `CHRONIC-ADJUDICATION.md`, `ADJUDICATION-1.md`). No
`src/`/`demo/` byte is touched by this dossier.

**Range shape.** F31 is a story/configurator row (curve-gallery void + easing modularization). F32
(reveal) + F33 (deck) are reduction/merge ASK rows. **F34-F40 are the seven handmark stills** — the
handmark greenfield (`GF-HANDMARK-PASS3.md`) owns their cures; per the seat brief this dossier
VERIFIES the correlation + coverage, it does not redesign. All seven handmark born-RED anchors were
re-verified on disk (`brush.ts`, `HandMark.vue`, `ink.ts`, `geometry.ts`, `demo/stories/motion/handmark.vue`).

Convention: file paths absolute-from-repo-root; `crosswalk` = `../ASSEMBLY-CROSSWALK.md`;
`GF-HM` = `../greenfields/GF-HANDMARK-PASS3.md`; `FSF` = `../perfection/FABLE-STORY-FRAMEWORK.md`.

---

## F31 — /motion/curve-gallery bottom void + "properly modularize the easing-curve component"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:43`): *"`/motion/curve-gallery` — why all the
bottom padding; redesign the page; **properly modularize the easing-curve component**."* Screenshot:
`../../feedback/F31-curve-gallery-padding.png`.

**ISOLATION (first-hand read).** The image is the curve-gallery "Authoring boundary" section
(partial blurb "…timing side by…" at the top matches `curve-gallery.vue:191`). It shows ONE card
holding a bezier-curve editor: a square grid with the identity diagonal, two draggable control-point
handles (white discs, black rings), dashed handle lines, a violet cubic-bezier path, and a mono `∅`
axis label (Fira-Code slashed-zero, the "0" tick). The curve fills the TOP ~60% of the card; the
bottom ~40% is empty dark space — the "bottom padding" the user marks. On the right edge, cut off,
are fragments of the sibling steps editor. The complaint is a layout void inside the curve STAGE, not
a paint bug — the square editor sits in an over-tall card.

**TARGET.**
- Demo site: `demo/stories/motion/curve-gallery.vue:189-202` — the "Authoring boundary"
  `<StorySection>`; `:194` `<EasingPicker v-model="bezier" mode="bezier" />` (the exact canvas the
  screenshot frames), `:195` `<EasingConfigurator … mode="steps" />` (the right-edge fragment). The
  two sit in `grid gap-6 lg:grid-cols-2` (`:193`).
- Src (the stage geometry): `src/components/easing/EasingPicker.vue:327` (the internal
  `grid … lg:grid-cols-[1fr_18rem]` canvas+controls split), `:336` (the `glass-card … rounded-card
  p-3` canvas card), `:345` (the SVG `style="aspect-ratio: 1; block-size: clamp(200px, 38cqi, 320px);
  margin-inline: auto"`). The card is a stretch-aligned grid cell holding a fixed-max-height square
  SVG that is centered only horizontally — when the controls/sibling column is taller the card grows
  and dead space opens BELOW the square. That is the F31 void.
- Src (the "modularize" half — already satisfied): `src/components/easing/EasingPicker.vue:1-2` ("The
  ONE published curve-authoring component (the C-3 fold landed)"), `EasingConfigurator.vue:1-13` (a
  THIN `ConfiguratorLayer`/`ConfiguratorRow` seating of `EasingPicker`, sharing the one
  `useEasingPicker` composable). The easing-curve component IS a modular `src/components/easing/`
  family on disk.

**POST-MORTEM.** Two different mechanisms under one ledger sentence. (1) The void is an
unenforced-proportion defect: the curve STAGE was given a fixed square-with-height-clamp but seated in
a stretch grid without a min/max reconciliation, so a taller neighbor opens a bottom gap — nobody
pinned "the stage sizes to its content, no dead band." (2) The "properly modularize" half was written
against a PRIOR state; the C-3 fold has since landed and the curve editor is already a real published
component (`EasingPicker` + the `EasingConfigurator` chassis register). So a wave taking the
modularize order literally would find nothing to modularize — a screenshot-vs-disk drift, exactly the
class FSF §8.5 flags ("a wave written to 'modularize' would find nothing to do").

**REDRESS.** Owned by `BJ.W-CONFIGURATOR-STD` (BAND-STORY W3) gate **G-CFG-5**
(`../../waves/BAND-STORY.md:245,269`: "curve-gallery adopts the standard; easing-curve is a modular
component; 0 dead bottom void"), **reframed by the binding perfection amendment AMEND-D-8**
(`FSF:311-314`, §4 table `FSF:183`, §8.5 `FSF:359-363`): "`EasingConfigurator`/`EasingPicker` are
modular src components … Reframe `G-CFG-5` to the curve-stage layout-void fix (the over-tall stage,
F31 image) + configurator adoption; drop the 'modularize the easing-curve component' framing." The
lead adoption block binds the D-amendments to the band (`../../waves/BAND-STORY.md:545-556`). The
`./easing` PUBLIC-surface question ("does easing tooling belong on the public surface at all") is the
separate user call `ASK-REDUCTION §B4` (`../../ASK-REDUCTION.md:120-131`), whose public-surface DROP,
if ruled, executes in `BAND-REDUCTION` W3 (`../../waves/BAND-REDUCTION.md:306-312`) — the redesign of
the component SHAPE (F31) and the public-surface DROP are cleanly split (`BAND-REDUCTION.md:356`).
Coverage: **EXACT** — the live defect (the void) has a reframed born-RED that matches the screenshot;
the stale half (modularize) is a verified verify-not-fix (already done); the public-surface fate is a
correctly-reserved ASK. No residue.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:53`). **AGREE** — the amendment already
caught the modularize/disk drift and re-pointed the gate at the real defect (the void); the
public-surface half is honestly split to ASK §B4.

---

## F32 — /motion/reveal "what is this vs our other scrolling components"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:44`): *"`/motion/reveal` — What is this vs our other
scrolling components."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** The reveal page is NOT a scrolling component — it is an
ENTRANCE/materialize page — but its name and neighbor (`/motion/scroll`) invite the conflation the
user voices. `demo/stories/motion/reveal.vue` demonstrates two distinct primitives: (1) the
`v-reveal` staggered-entrance directive (`:57-105`, the `[data-reveal]`/`--d` stagger the consumer's
own CSS drives, `:143-171`), and (2) `useLiquidReveal` bloom-from-source overlay (`:107-133`, the
iOS-27 materialize-from-trigger-rect move). The overlap with the scroll family
(`/motion/scroll` + the `fading-scroll`/`useStaggerReveal` keeps) is a taxonomy question — which
scroll/reveal primitives deserve distinct demo surfaces — not a paint defect. The same question is
asked a second time about `/motion/scroll` (F42).

**TARGET.**
- Demo sites: `demo/stories/motion/reveal.vue` (v-reveal `:57-105`; useLiquidReveal `:107-133`),
  `demo/stories/motion/scroll.vue` (the sibling F42 page).
- Src: `src/composables/motion/reveal/{vReveal.ts, useLiquidReveal.ts, useStaggerReveal.ts}`; the
  multi-consumer scroll keep `fading-scroll` (atlas+speedtest+value.js+keyframes.js, round-2). The
  fault is not a component bug — it is a demo-taxonomy overlap.

**POST-MORTEM.** Surface accretion without a taxonomy pass: the scroll-reveal primitives grew page by
page (`reveal`, `scroll`, plus a `scroll/` subdir) with no single ruling on which primitives are
distinct public surfaces and which demo pages should exist, so two adjacent pages read as "the same
thing twice" to a user. This is a family-C reduction/merge call the drafter cannot settle from the
census alone (the consumer truth says `fading-scroll` is a real ≥2 keep, but the demo-page collapse is
a design call), so it is correctly a user-gated ASK, not an auto-fix.

**REDRESS.** Owned by `ASK-REDUCTION §C3` (`../../ASK-REDUCTION.md:190-207`): "Which scrolling
primitives survive as distinct public surfaces … And do the `/motion/reveal` + `/motion/scroll` demo
pages **collapse into one** scroll-family page?" — recommendation: consolidate to the ≥2-consumer
keeps (`fading-scroll` confirmed), likely collapse reveal+scroll into one page. `BAND-REDUCTION`
explicitly routes `reveal/scroll/tempo` to the ASK, not a wave
(`../../waves/BAND-REDUCTION.md:74-76`). Whichever way the user rules, the "what IS this" identity is
discharged: collapse merges the pages, or keep-distinct triggers the `BAND-STORY` W2 copy canon
(a page states "what it IS and when to reach for it", `../../waves/BAND-STORY.md:155`, `FSF:196-201`)
on the surviving page. Coverage: **EXACT (as a user-gated decision)** — the merge call is reserved to
the user with a census-grounded recommendation; the identity-clarity half is structurally covered by
the copy canon regardless of outcome. No residue.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:54`, §C3). **AGREE** — a "which of two
overlapping pages survives" question is a merge call for the user, not a LANDED fix; the census
recommends collapse but cannot mint the taxonomy unilaterally.

---

## F33 — /motion/deck vs carousel collapse + "the dot animations need dramatic refinement"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:45`): *"`/motion/deck` — What is deck vs carousel —
likely collapse. The dot animations need dramatic refinement."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** Two separable asks. (1) **deck vs carousel** — the premise
"likely collapse" is contradicted by the disk: `./deck` is a HEADLESS engine
(`useDeck` + `DeckCore` + `useDeckKeyboard`, `src/components/deck/index.ts`), NOT a Carousel-shaped
component; `demo/stories/motion/deck.vue` consumes `useDeck` (`:31`) + `DeckPager` (`:127`), while
`./carousel` is a separate visual family (`Carousel.vue`, `CarouselContent/Item/Pager`). The real
external consumer of `useDeck` is **atlas ×2** (`useStageDeck.ts`, `useDeckDetent.ts`), so collapsing
deck INTO carousel breaks atlas's headless integration. (2) **dot animations** — the deck's windowed
pager dots (`DeckPager.vue` → `PagerDots.vue`, with the `usePagerWorm` goo-morph + active-dot
elongation morph, `src/components/pager-dots/composables/usePagerWorm.ts`) are the "dot animations";
the user wants them DRAMATICALLY refined (the liquid-weight-universal edict: pager/deck dots
goo-morph between states). This is a motion-quality ask on an EXISTING mechanism.

**TARGET.**
- Demo site: `demo/stories/motion/deck.vue:127` (`<DeckPager v-model:index … :window-fit="6" />` —
  the dot pager), `:19-20,:90` (the SLIDE-stage goo `DeckGooFilter`/`useDeckGoo` barbell — a
  different mechanism from the pager dots).
- Src (deck-vs-carousel): `src/components/deck/DeckPager.vue:1-2` (thin `PagerDots` wrapper),
  `src/components/deck/composables/useDeck.ts`, vs `src/components/carousel/`.
- Src (the dot-refinement target): `src/components/pager-dots/PagerDots.vue` +
  `src/components/pager-dots/composables/usePagerWorm.ts` (the shared worm/elongation morph both
  `DeckPager` and `CarouselPager` ride) — the ONE site a "dramatic dot refinement" edits.

**POST-MORTEM.** (1) The collapse premise is a provenance error — the user reads "deck" and "carousel"
as duplicates because both page N slides with dots, but the census's round-1
"consumer-provenance-misattribution" finding + round-2 affirmation proved `useDeck` is a headless
engine atlas depends on; the confusion is real but the merge would break a real consumer. (2) The
dot-refinement half is a genuine coverage gap: the reduction band correctly declined to own a motion
refinement, the feedback-motion band (`BAND-FEEDBACK-MOTION`) was drafted to cure the FIVE orphan
rows F19/F20/F21/F22/F24 and stops there, and no motion wave picked up F33's pager-dot morph — so it
sits with "no explicit wave," which the crosswalk itself flags (`crosswalk:55,205-207`).

**REDRESS.**
- **deck vs carousel (EXACT-decision).** Owned by `ASK-REDUCTION §C1`
  (`../../ASK-REDUCTION.md:148-169`): keep deck as the headless `useDeck` engine (atlas ×2) +
  carousel as the visual component; collapse only any overlapping visual shell, never the `useDeck`
  engine. `BAND-REDUCTION` routes deck-vs-carousel to the ASK, not a wave
  (`../../waves/BAND-REDUCTION.md:74-76`). This is a STANDING decision on dispositive consumer
  evidence — the seat brief's "CHRONIC deck ruling (DECIDED — do not re-open)" maps to this §C1
  recommendation + the round-1/round-2 consumer-truth finding (there is no separate deck row in
  `CHRONIC-ADJUDICATION.md`; the deck-as-engine keep is settled by the atlas `useDeck` fact). Not
  relitigated here.
- **dot animations (the residue).** No BJ wave owns the pager-dot goo-morph refinement. The crosswalk
  names it explicitly as routing "→ motion (unassigned wave)" (`crosswalk:55`) and lists it among the
  notable ambiguities (`crosswalk:205-207`: "watch that the dot-animation half of F33 … get an owner
  when R3b folds"). The lead ORPHAN-cure reconciliation (`crosswalk:213-216`) closed F19-F24 via
  `BAND-FEEDBACK-MOTION` but did NOT re-home F33's dot half. It is the appendable delta below.

Coverage: **PARTIAL** — the deck-vs-carousel half is EXACT (a user-gated keep on dispositive
evidence); the dot-refinement half is an uncovered residue with no owning wave (**Δ-F33-1**).

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:55`, §C1). **AGREE** on the deck-vs-carousel ASK
— it is honestly a user call the census recommends keeping. The dot-refinement "unassigned wave" is
the crosswalk's own flagged residue, so this is not a status disagreement — it is a real gap the
crosswalk already admits, and Δ-F33-1 supplies the owner it lacks.

---

## F34 — handmark "looks awful" (the boil worm)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:46`): *"`/motion/handmark`: looks awful."* Screenshot:
`../../feedback/F34-handmark-awful-1.png`.

**ISOLATION (first-hand read).** Caption "BOIL BRUSH · THE NATURAL MORPHOLOGY" over "A seeded
hand-drawn underline keeps its character at any scale…"; the headline "The future is here" carries two
underlines (under "future" and "here") that read as FAT white blobby lozenges — thick, sausage-like
worms, not natural hand strokes. This is the boil brush: a filled hull on a curvy value-noise
centerline, far too heavy.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts:140,:144` (boil `weight: 7`, `ribbon: "hull"`),
  `:153-154` (`roughness: 0.9`/`wobble: 1.4`); the value-noise centerline in
  `src/components/handmark/noise.ts` + `constants.ts:57,61` (4-octave, 5% span). Confirmed on disk.
- Demo site: `demo/stories/motion/handmark.vue` (the boil-brush section).

**POST-MORTEM.** Two mis-set axes compounding: an over-heavy fill (`ribbon:'hull'` weight 7) laid on
an over-active value-noise drift (4 octaves at 5% span). "Naturalness" was modeled as procedural
wobble + a filled ribbon; both push AWAY from a calm confident line — a fat wobbly hull is the literal
worm. The design never had a WEIGHT axis or a calm-centerline bound, so nothing caught it.

**REDRESS.** Owned EXACTLY by `GF-HANDMARK` W1 (`GF-HM:246`, CALM-CENTERLINE + WEIGHT) via the calm
drift `wobbleLinePoints@0.22` (`GF-HM:79-85` §3.1, retires the value-noise + the `natural` prop) and
the boil RETIRE (`GF-HM:136` §4: "RETIRE the brush + the value-noise + the `natural` prop entirely").
Born-RED gates `G-CALM` + `G-WEIGHT` (`GF-HM:261-266` §10) name the exact RED-at-HEAD sites; π-CALM is
the paired live capture vs this worm (`GF-HM:291`). Coverage: **EXACT** — the greenfield's born-RED is
disk-true (boil `weight:7`+hull+value-noise) and its cure deletes the mechanism the screenshot proves.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:56`, GF-HANDMARK W1 `G-CALM`/π-CALM).
**AGREE** — the boil worm is the calm+weight cure's central born-RED, deletion-heavy, disk-verified.

---

## F35 — handmark "should be more pen-like, more natural" (the pen default)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:47`): *"As does this — should be more pen-like, more
natural."* Screenshot: `../../feedback/F35-handmark-pen-like.png`.

**ISOLATION (first-hand read).** Caption "The hand voice" over "HandMark lays a hand-drawn mark under
a word… The PEN default is grain:0 — a clean wobbled path, no filter." The headline "Who pays in gets
connected" underlines "pays in" with a thin white line that wobbles unevenly, with faint doubling at
the left curve. This is the PEN default — and even the least-bad brush reads over-wobbled and slightly
too heavy for a display line, not a confident pen stroke.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts:111` (pen `weight: 6`), `:124-125`
  (`roughness: 0.7`, `wobble: 1.2`). Confirmed on disk.
- Demo site: `demo/stories/motion/handmark.vue:26` (the "hand voice" section blurb).

**POST-MORTEM.** Over-wobble + over-weight on a display line (`roughness:0.7`, `wobble:1.2`, `weight:6`
where a believable pen is ~2-2.5px). The pass-1 "double-line" story is NOT the root — the critic
(CRIT2 C2/C3, `GF-HM:32-33`) proved the `vbH` aspect-equalization already handles x/y scale at HEAD,
so the x-stretch/`vbH`-delete pillar was RETRACTED IN FULL; the real cause is a wobbly heavy centerline,
cured by calm+thin, not by deleting the aspect apparatus. The mark was tuned by procedural intuition,
never against a "one confident thin line" bound.

**REDRESS.** Owned EXACTLY by `GF-HANDMARK` W1 (`GF-HM:246`) — pen KEPT as a stroke with
`roughness→0.22` (`GF-HM:79-85` §3.1), `weight→2.5` (`GF-HM:87-93` §3.2), arc-length lift-on taper
(`GF-HM:105-112` §3.4); `G-CALM` + `G-WEIGHT` gate it (`GF-HM:261-266`), π-PEN is the paired capture
vs this still (`GF-HM:292`). The `vbH`/`preserveAspectRatio="none"` apparatus STAYS (`GF-HM:33`, the
retract-of-a-retract). Coverage: **EXACT** — the cure targets the two mis-set scalars on the exact
brush, and the greenfield explicitly retracted the wrong root rather than shipping a risky refactor.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:57`, GF-HANDMARK W1 `G-WEIGHT`/π-PEN).
**AGREE** — pen is the π-PEN anchor; the honest root re-attribution (calm+thin, not fill, not
uniform-space) is the strongest part of the greenfield.

---

## F36 — handmark "doesn't even work" (the highlighter escape)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:48`): *"Doesn't even work."* Screenshot:
`../../feedback/F36-handmark-broken.png`.

**ISOLATION (first-hand read).** Caption "HIGHLIGHTER · MULTIPLY OVER THE PAGE" over "The highlighter
paints like a highlighter: a low-seated hull ribbon… multiplying against the page text behind it…".
The headline "The part that really matters here" shows almost NO visible highlight over the words —
and a torn gold blob ESCAPES below the card's bottom border (a stray highlighter mass painting outside
the specimen). The mark is both invisible where it should be and leaking where it should not — "doesn't
even work."

**TARGET.**
- Src fault: `src/components/handmark/brush.ts:262,:266` (highlighter `weight: 26`, `ribbon: "hull"`);
  `src/components/handmark/HandMark.vue:327` (`overflow: visible`), `:338/:341` (`z-index: -1`),
  `:312` (NO `isolation: isolate`). Confirmed on disk — the band is a weight-26 viewBox hull under
  `overflow:visible` with no clip, so it stretches and spills below the line box.
- Demo site: `demo/stories/motion/handmark.vue:51` (the highlighter section blurb).

**POST-MORTEM.** The highlighter's height was a stretchy `weight:26` viewBox measure (which under
`preserveAspectRatio="none"` scales to arbitrary height) with `overflow:visible` and no containment —
so the band paints below the word's line box and off the card. `overflow:visible` was legitimately
there for the round end-caps' horizontal overshoot, but nothing bounded the VERTICAL escape. A
first-class surface shipped structurally uncontained.

**REDRESS.** Owned EXACTLY by `GF-HANDMARK` W3 (`GF-HM:248`, CONTAIN-HIGHLIGHT). §5 (`GF-HM:147-167`)
draws two independent bounds: (1) a line-box-RELATIVE band height (bounded by construction, cannot
paint below the line box) and (2) an asymmetric clip `inset(0 -8px 0 -8px)` (0 top/bottom clips the
vertical escape; −8px sides keep the cap overshoot) — with the multiply preserved because `clip-path`
establishes no stacking context. `G-CONTAIN` gates it (`GF-HM:270-272`), π-CONTAIN is the paired
capture vs this escape (`GF-HM:293`). Coverage: **EXACT** — the born-RED is the exact
`overflow:visible`+weight-26 site, and the cure makes the escape structurally impossible while keeping
the intentional page-multiply.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:58`, GF-HANDMARK W3 `G-CONTAIN`). **AGREE** —
containment is drawn concretely (geometry bound + clip belt), not asserted.

---

## F37 — handmark "broken and disjointed" (the draw-on fragments)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:49`): *"Broken and disjointed."* Screenshot:
`../../feedback/F37-handmark-disjointed.png`.

**ISOLATION (first-hand read).** Caption "DRAW-ON · IMPERATIVE PLAY()" over "animation='draw-on'
reveals the mark once on appear — a stroke-dashoffset sweep for clean ink…", with a "Replay draw"
button. The headline "A drawn line" underlines "drawn" but the mark is DISJOINTED — a curved segment
under "draw" plus a separate stray dash floating to its right, not one connected line. The draw-on
reveal produces detached fragments.

**TARGET.**
- Src fault: `src/components/handmark/HandMark.vue:290` (`pathLength="1"`), `:351-352`
  (`stroke-dasharray: 1; stroke-dashoffset: 1`) — a normalized dashoffset sweep over a self-crossing
  value-noise Catmull-Rom centerline reveals disconnected pieces. Confirmed on disk.
- Demo site: `demo/stories/motion/handmark.vue:67` (the draw-on section blurb + replay control).

**POST-MORTEM.** A dashoffset reveal normalized to `pathLength="1"` swept over a path that LOOPS BACK
on itself (the value-noise centerline self-crosses) reveals visually disconnected segments mid-draw —
and the normalized-1 length risks a dash-gap even at rest. F37 is primarily a CENTERLINE defect
surfaced by the reveal: the fragmented look is the self-crossing path, not just the animation.

**REDRESS.** Owned EXACTLY by `GF-HANDMARK` W5 (`GF-HM:250`, DRAW-ON). §6 (`GF-HM:171-191`): the
centerline is now monotonic-in-x and calm (§3.1) so a left-to-right sweep reveals ONE connected
growing segment by construction; and it adopts pencil-boil `createStrokeDrawIn` (real
`getTotalLength()`, clears the dash-array on completion for a solid settle) instead of the hand-rolled
`pathLength="1"`. `G-DRAW-CONNECTED` gates it (`GF-HM:275-277`), π-DRAW is the paired capture vs this
still (`GF-HM:298`). Coverage: **EXACT** — the cure addresses both the surfaced cause (monotonic
centerline) and the mechanism (real-length draw-in that settles solid).

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:59`, GF-HANDMARK W5 `G-DRAW-CONNECTED`).
**AGREE** — correctly diagnosed as a centerline defect the reveal exposes, not a bespoke animation curve.

---

## F38 — "each one generally awful — should be greenfielded" (the brush register)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:50`): *"Each one generally awful — **should be
greenfielded**."* Screenshot: `../../feedback/F38-handmark-greenfield.png`.

**ISOLATION (first-hand read).** A wide card lists the brush register vertically: "pen" (thin white
wobble underline), "boil" (fat white wobble), "pencil" (faint grey dry line — the least-bad), "crayon"
(a fat RED blob offset from the word, misregistered over the descender), "marker" (a fat GREEN
lozenge, equally misaligned). The right ~70% of the card is EMPTY. Every brush reads crude, and the
colored hull brushes (crayon/marker) are misplaced blobs — the whole register is the target.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts` — the seven-brush register: pen (`:111`), boil
  (`:140` weight 7 hull), pencil (`:160` weight 3), crayon (`:184` weight 16 hull), ring
  (`:222` grain 0.7), marker (`:235` weight 12 hull), highlighter (`:262` weight 26 hull). Confirmed
  on disk.
- Demo site: `demo/stories/motion/handmark.vue` (the brush-gallery section). The empty right ~70% is
  the horizontal-waste class (owned separately by W6's demo rewrite + `BJ.W-RESPONSIVE-AUDIT`).

**POST-MORTEM.** The register grew seven brushes chasing "expressive variety," but four of them
(`boil/crayon/marker/highlighter`) engage `ribbon:'hull'` at high weight — the exact fill-a-fat-blob
mechanism the stills prove ugliest. The design never demonstrated that seven brushes earn their keep;
the fill-everything ambition imported the hull's failure modes into the whole family. The user's
literal order is to greenfield it — reduce, not patch.

**REDRESS.** Owned EXACTLY by the `GF-HANDMARK` register cut (`GF-HM:39` C9, `:123-145` §4,
`:219-237` §8): 7 brushes → **pen · pencil · highlighter** + a `Partial<Brush>` override, each retiree
carrying a NAMED disposition (boil/crayon/marker retire with cures, `GF-HM:133-136`). Delivery spans
W1 (calm+weight) + W2 (FILL-STRATEGY: stroke default, `GF-HM:247`); `G-WEIGHT`/`G-NO-SLIVER` gate the
survivors, π-GALLERY proves each distinct AND natural vs this still (`GF-HM:299`). `BAND-REDUCTION`
records the target surface and hands delivery to the greenfield (`../../waves/BAND-REDUCTION.md:156-160`).
Coverage: **EXACT** — the user's "greenfield" is discharged brush-by-brush (a 7→3 cut with named
cures), the honest reading of "each one generally awful."

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:60`, GF-HANDMARK §4 register 7→3). **AGREE** —
the register cut is resolved by the stills-read (the four disaster stills ARE the demonstration), the
one decision that sets the final surface.

---

## F39 — handmark "wrong layering, awful smoothing, awful encapsulation" (the ring)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:51`): *"Wrong layering, awful smoothing, awful
encapsulation."* Screenshot: `../../feedback/F39-handmark-layering.png`.

**ISOLATION (first-hand read).** The headline "A ringed word" is circled — a torn rust-red hand-drawn
ellipse — but the ring is mis-layered: it crosses THROUGH the glyphs of "ringed" (the right arc cuts
across the letters) and its stroke is frayed/torn rather than a clean loop. Wrong z (half behind/half
over the text), grainy smoothing, poor encapsulation of the word.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts:222` (ring `grain: 0.7` — the feDisplacement fray =
  the "torn"/"awful smoothing"); `src/components/handmark/HandMark.vue:338,:341` (`z-index: -1` — the
  ring sits behind the glyphs, "wrong layering"). Confirmed on disk. The overshoot/self-cross is
  substrate-correct (`ellipsePoints` sweeps `2π+…`, `GF-HM:36` C6).
- Demo site: `demo/stories/motion/handmark.vue` (the ring/circle section).

**POST-MORTEM.** A margin-annotation ring should sit ON the page in FRONT of the text at low alpha; it
was rendered at `z-index:-1` (behind, so fat letters occlude it — the half-behind tearing) and carried
`grain:0.7` (feDisplacement fray on a thin ring = "torn"/"awful smoothing"). The novelty was
over-claimed in pass-1 (the overshoot is substrate, not new work); the REAL fix is three verified
toggles, which the greenfield names.

**REDRESS.** Owned EXACTLY by `GF-HANDMARK` W4 (`GF-HM:249`, RING-LAYER). §7.1 (`GF-HM:196-208`) = the
three toggles: `grain 0.7→0` (clean ring), `z −1→front` (on the page, low alpha), keep the substrate
overshoot + `non-scaling-stroke` (aspect-stable). `G-RING-LAYER` gates it (`GF-HM:273-274`), π-RING is
the paired capture vs this still (`GF-HM:297`). Coverage: **EXACT** — each of the user's three terms
(wrong layering = z, awful smoothing = grain, awful encapsulation = the mis-z tearing) maps to one
verified disk toggle.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:61`, GF-HANDMARK W4 `G-RING-LAYER`). **AGREE**
— the ring cure is the tightest in the greenfield: three disk-verified toggles, no new machinery.

---

## F40 — "remove ALL reference to meta text (what is 'SE') — awful, grand redesign"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:52`): *"Remove ALL reference to meta text (what is
'SE') — awful, grand redesign."* Screenshot: `../../feedback/F40-handmark-meta-text-SE.png`.

**ISOLATION (first-hand read).** Two sections. Top caption "BOX-MODE HULL · THE SE-GUARD (NEVER A
VANISH)" over "A hull brush (marker/crayon) over a tiny datum… The se-guard falls back to a stroked
body…" — the headline "box a datum  bracket it tight" shows a thin GREEN vertical sliver over the
1-char "a" and a RED sliver over "it": box/bracket shapes collapse to slivers over tiny datums. Bottom
caption "AMPLITUDE · THE EXCURSION KNOB" over "…the default reads byte-identical, an explicit amplitude
lifts the wobble÷stroke ratio…" — "default"/"bolder" underlines. The user's mark is the internal
jargon in the captions ("SE-guard", "hull", "excursion", "byte-identical", "wobble÷stroke") AND the
sliver marks — both awful; grand redesign.

**TARGET.**
- Demo copy (the "what is SE" jargon): `demo/stories/motion/handmark.vue:119-120` ("box-mode hull ·
  the se-guard (never a vanish)" + the se-guard blurb), `:150-151` ("amplitude · the excursion knob"
  + "byte-identical … wobble÷stroke"), and the sibling jargon captions `:26,:51,:67`. Confirmed on disk.
- Src fault (the slivers + the masked fallback): `src/components/handmark/geometry.ts:106+`
  (box-mode geometry collapsing over ~1ch), `src/components/handmark/ink.ts:200-206` (the se-GUARD —
  a degenerate outline falls back to a stroked sliver, the one masked fallback). Confirmed on disk.

**POST-MORTEM.** Two faults under one ask. (1) The demo copy narrated INTERNAL mechanics to the
user — "SE-guard", "hull", "excursion", "byte-identical", "wobble÷stroke" are implementation terms
that mean nothing to a library user (law-10 mono-caps jargon). (2) The se-guard itself is a
no-masking-fallback violation: a box/bracket over a 1-char datum is a sliver by geometry, and the
se-guard masks the degenerate case by falling ink back to a stroked band rather than degrading the
SHAPE. Both shipped because no copy canon banned the jargon and no gate forbade the sliver/masked
fallback.

**REDRESS.** Double-owned, both EXACT:
- **Jargon copy:** `GF-HANDMARK` W6 `G-NO-JARGON` (`GF-HM:251,280-282` — bans se-guard/hull/excursion/
  byte-identical/wobble÷stroke, names `handmark.vue:37,50,66,119,150`) AND `BJ.W-STORY-COPY-CANON`
  (BAND-STORY W2) `G-COPY-4` (`../../waves/BAND-STORY.md:197`: "`grep se-guard|box-mode hull` →
  :117/119/120 (F40 'what is SE')") + `G-COPY-2` (`:195`), with FSF §5 pinning the exact sites
  (`FSF:207-209`).
- **The slivers + masked fallback:** `GF-HANDMARK` W2/W4 — box/bracket RETIRE (`GF-HM:137-138` §4),
  the se-guard DIES (`GF-HM:140-143`, "RETIRED, not patched" — a sub-min-span datum degrades its
  SHAPE, §7.2 `GF-HM:210-215`), gated by `G-NO-SLIVER` (`GF-HM:267-269`); π-DATUM captures a legible
  degraded shape vs these slivers (`GF-HM:295`).
Coverage: **EXACT** — "remove ALL reference to meta text" is a grep ban-list on the exact caption
lines (two owners), and the "awful/grand redesign" half retires the sliver shapes + the masked
fallback the screenshot proves.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:62`, GF-HANDMARK W6 `G-NO-JARGON` +
`BJ.W-STORY-COPY-CANON`). **AGREE** — the jargon has two independent grep-owners and the slivers/se-guard
retire on the no-masking-fallback edict; no residue.

---

## Coverage summary

| Row | ask (compressed) | terminal owner | coverage | delta count |
|-----|------------------|----------------|----------|-------------|
| F31 | curve-gallery void + modularize easing | `BJ.W-CONFIGURATOR-STD` G-CFG-5 (AMEND-D-8) + ASK §B4 | **EXACT** | 0 |
| F32 | reveal vs other scrolling | `ASK-REDUCTION §C3` (consolidation) | **EXACT (decision)** | 0 |
| F33 | deck vs carousel + dot refinement | `ASK-REDUCTION §C1` (deck) + **no wave (dots)** | **PARTIAL** | 1 |
| F34 | handmark boil worm "awful" | `GF-HANDMARK` W1 (G-CALM/G-WEIGHT, boil retire) | **EXACT** | 0 |
| F35 | pen "more pen-like/natural" | `GF-HANDMARK` W1 (calm+thin, vbH-retract) | **EXACT** | 0 |
| F36 | highlighter "doesn't work" (escape) | `GF-HANDMARK` W3 (G-CONTAIN) | **EXACT** | 0 |
| F37 | draw-on "broken/disjointed" | `GF-HANDMARK` W5 (G-DRAW-CONNECTED) | **EXACT** | 0 |
| F38 | brushes awful — greenfield | `GF-HANDMARK` §4 register 7→3 | **EXACT** | 0 |
| F39 | ring wrong layering/smoothing | `GF-HANDMARK` W4 (G-RING-LAYER) | **EXACT** | 0 |
| F40 | remove meta text "SE"; redesign | `GF-HANDMARK` W6 `G-NO-JARGON` + `BJ.W-STORY-COPY-CANON` | **EXACT** | 0 |

**Totals: EXACT 9 / PARTIAL 1 / MISSING 0** (F31 + F32 counted EXACT with the decision/verify flavor
noted). Delta count: **1**.

## Proposed deltas (appendable form)

**Δ-F33-1 (residue — F33 pager-dot refinement has no owning wave).** The crosswalk itself routes the
"dot animations need dramatic refinement" half of F33 to "→ motion (unassigned wave)"
(`crosswalk:55`) and flags it as an open ambiguity (`crosswalk:205-207`); the lead ORPHAN-cure
(`crosswalk:213-216`) closed F19-F24 via `BAND-FEEDBACK-MOTION` but did NOT re-home F33's dot half, so
it currently has NO owner. The target is concrete and singular: the shared pager-worm morph at
`src/components/pager-dots/PagerDots.vue` + `src/components/pager-dots/composables/usePagerWorm.ts`
(the active-dot elongation/goo-morph both `DeckPager` and `CarouselPager` ride) — the liquid-weight-
universal edict wants a goo-morph "worm" between dot states. **Append an owner:** add a
fifth wave to `BAND-FEEDBACK-MOTION` — `BJ.W-PAGER-DOT-MORPH` — that refines `usePagerWorm` against the
motion canon (the same born-RED-then-π discipline as W3's loop/skeleton retune). Name `PagerDots`/
`usePagerWorm` as the born-RED target and capture a paired-π of the dot morph across an index change on
`/motion/deck` + `/motion/carousel`. Without this, F33's dot-refinement silently drops at execution —
the exact gap the crosswalk warned about. (This is the crosswalk's own admitted residue, not a new
disagreement.)

---

*End — Fable redress seat, F31-F40. One file under `formation/redress/`; no `src/`/`demo/` edits, no
commit. All eight in-range stills read first-hand; every handmark born-RED anchor re-verified on disk.*
