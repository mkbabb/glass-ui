# BJ redress dossier — F31 through F40 (unioned canon)

**Verified model: claude-fable-5 (REFABLE RU-13).** Union provenance: the prior artifact ran on
claude-opus-4-8 via config override; this file is the REFABLE union — fresh Fable analysis from
primary sources first, the opus content kept only where re-proven, corrected where contradicted
(F33 superseded at HEAD, F36 + F37 root corrections, F39 amended). Verdict sidecar:
`../refable/REFABLE-RU-13-F31-F40.md`.

Per-row inventory / isolation / target / post-mortem / redress / status-check for feedback-ledger
rows **F31-F40**, the user's 2026-07-17 corpus. Every screenshot in range was read first-hand
(F31 + F34-F40 have PNGs; F32/F33 are URL-anchored, no screenshot). Correlations are verified
against live `src/` + `demo/` at HEAD, and reconciled against the formation corpus
(`ASSEMBLY-CROSSWALK.md`, `REGISTRY.md`, the band specs at `../../waves/`, `JUDGE.md`, the four
`greenfields/GF-*-PASS3.md`, `IOS27-CODEX.md`). No `src/`/`demo/` byte is touched by this dossier.

**Range shape.** F31 is a story/configurator row (curve-gallery void + easing modularization). F32
(reveal) + F33 (deck) are reduction/merge ASK rows. **F34-F40 are the seven handmark stills** — the
handmark greenfield (`GF-HANDMARK-PASS3.md`) owns their cures under the user ruling ("handmark is
keep. But greenfield and perfect from first principles. Fable."); this dossier verifies the
correlation + coverage and records where fresh evidence corrects the greenfield's own premises
(two flips, sidecar §FLIPS). All seven handmark born-RED anchors were re-verified on disk
(`brush.ts`, `HandMark.vue`, `ink.ts`, `geometry.ts`, `composables/useHandMark.ts`, `paper.css`,
`demo/stories/motion/handmark.vue`).

**SUPERSEDED-BY-RU-06 (stamped RU-14, 2026-07-18)—the F34-F40 redress layer.** These rows were
written 01:01 against the pre-redo GF-HANDMARK-PASS3; RU-06 rewrote that charter (7746d586,
01:32) and the cross-critique fix pass finalized it (117b7f12, 06:43). At HEAD the gates this
range cites—`G-CONTAIN`, `G-RING-LAYER`, `G-DRAW-CONNECTED`, `G-NO-SLIVER`—are grep-zero; the
wave map is **W0-W5** (W1 THE-VOICE · W2 THE-SURFACE · W3 THE-CHOREOGRAPHY · W4 THE-STORY · W5
CONSUMER+FINAL); the F38 register cut changed from "7→3 (pen·pencil·highlighter) +
`Partial<Brush>`" to **ONE pen voice**—no `brush` prop, no `Partial<Brush>` hatch
(`GF-HM:158-159`; Q-HM-1 resolved at `:248`—the highlighter is a SHAPE, not a medium). OWNERSHIP
SURVIVES (GF-HANDMARK owns every F34-F40 cure); every gate-grain "Coverage: EXACT" citation in
the row bodies below is dead—read them through this table:

| rows | old anchor (row bodies below) | GF-HM at HEAD (117b7f12) |
|------|-------------------------------|---------------------------|
| F34/F35 | W1 calm+weight, `G-CALM`/`G-WEIGHT` | W1 THE-VOICE (`G-CALM`/`G-RESTRAINT`, the P1-P5 generators) + W2 THE-SURFACE (`G-WEIGHT`) |
| F36 | W3 CONTAIN-HIGHLIGHT, `G-CONTAIN` (+ sidecar FLIP-1 scheme-aware ink) | the §4 layering law via W2: wrapper `isolation:isolate`, highlight `z-index:-1` INSIDE the isolated context, **NO blend modes—plain alpha ink** (`GF-HM:126-129`); π-BAND asserts VISIBILITY (the invisibility half is the charter's own sharpening 1) |
| F37 | W5 DRAW-ON, `G-DRAW-CONNECTED` (+ sidecar FLIP-2 re-anchor) | W3 THE-CHOREOGRAPHY, `G-DRAW`: ONE mask-draw, dash cleared at rest; root re-attributed to the dual draw mechanisms (`GF-HM:31`, `HandMark.vue:349-365`); `G-DRAW-CONNECTED` no longer exists |
| F38 | §4 register 7→3 + `Partial<Brush>` | ONE pen voice; `brush`/`overrides` and the 17-field Brush model cut with the taxonomy (`GF-HM:158-165`) |
| F39 | W4 RING-LAYER, `G-RING-LAYER` | the §4 layering law via W2: circle paints over the glyphs in DOM order, no z-index at all |
| F40 | W6 `G-NO-JARGON` + W2/W4 sliver/se-guard | W4 THE-STORY, `G-NO-JARGON` (gesture-named story rewrite); box/bracket GONE entirely (Q-HM-2 resolved, `GF-HM:250`) + `BJ.W-STORY-COPY-CANON` unchanged |

The two sidecar FLIPs are **CONSUMED-BY-RU-06** (closure recorded in the sidecar): F36's
invisibility became the charter's own probe, F37's root its own attribution—and FLIP-1's
multiply/screen cure now CONTRADICTS the charter's NO-blend-modes law and must not execute as
written.

Convention: file paths repo-relative; `crosswalk` = `../ASSEMBLY-CROSSWALK.md`;
`GF-HM` = `../greenfields/GF-HANDMARK-PASS3.md`; `FSF` = `../perfection/FABLE-STORY-FRAMEWORK.md`.

---

## F31 — /motion/curve-gallery bottom void + "properly modularize the easing-curve component"

**Verdict vs opus row: RATIFIED** (all citations re-verified; BAND-MATERIAL W5 review-marking added).

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:43`): *"`/motion/curve-gallery` — why all the
bottom padding; redesign the page; **properly modularize the easing-curve component**."* Screenshot:
`../../feedback/F31-curve-gallery-padding.png`.

**ISOLATION (first-hand read).** The image is the curve-gallery "Authoring boundary" section
(partial blurb "…timing side by side" matches `curve-gallery.vue:191`). It shows ONE card holding a
bezier-curve editor: a square grid with the identity diagonal, two draggable control-point handles,
dashed handle lines, a violet cubic-bezier path. The curve fills the TOP ~60% of the card; the
bottom ~40% is empty dark space — the "bottom padding" the user marks. On the right edge, cut off,
are fragments of the controls/sibling column. The complaint is a layout void inside the curve
STAGE, not a paint bug — the square editor sits in an over-tall card.

**TARGET.**
- Demo site: `demo/stories/motion/curve-gallery.vue:189-202` — the "Authoring boundary"
  `<StorySection>`; `:194` `<EasingPicker v-model="bezier" mode="bezier" />` (the exact canvas the
  screenshot frames), `:195-200` `<EasingConfigurator … mode="steps" />`. The two sit in
  `grid gap-6 lg:grid-cols-2` (`:193`).
- Src (the stage geometry): `src/components/easing/EasingPicker.vue:327` (the internal
  `grid … lg:grid-cols-[1fr_18rem]` canvas+controls split), `:336` (the `glass-card … rounded-card
  p-3` canvas card), `:345` (the SVG `style="aspect-ratio: 1; block-size: clamp(200px, 38cqi,
  320px); margin-inline: auto"`). The card is a stretch-aligned grid cell holding a fixed-max-height
  square SVG centered only horizontally — when the controls/sibling column is taller the card grows
  and dead space opens BELOW the square. That is the F31 void. (Secondary: `38cqi` has no
  `container-type` ancestor here, so it resolves against the viewport, not the card — the stage
  never tracks its own container. Exact resting paint: LIVE-DEFER.)
- Src (the "modularize" half — already satisfied at the family grain): `EasingPicker.vue:1-2` ("The
  ONE published curve-authoring component"), `EasingConfigurator.vue:1-13` (a THIN
  `ConfiguratorLayer`/`ConfiguratorRow` seating of `EasingPicker`, sharing the one
  `useEasingPicker` composable). The easing-curve component IS a modular `src/components/easing/`
  family on disk. (Residual: `EasingPicker.vue` is a 518-line single SFC — canvas + drag + keyboard
  + copy + playback inline; any internal split is available INSIDE the W3 redesign, not a separate
  mandate — AMEND-D-8 governs.)

**POST-MORTEM.** Two different mechanisms under one ledger sentence. (1) The void is an
unenforced-proportion defect: the curve STAGE was given a fixed square-with-height-clamp but seated
in a stretch grid without a min/max reconciliation, so a taller neighbor opens a bottom gap —
nobody pinned "the stage sizes to its content, no dead band." (2) The "properly modularize" half
was written against a PRIOR state; the fold has since landed and the curve editor is already a real
published component. A wave taking the modularize order literally would find nothing to modularize
— a screenshot-vs-disk drift, exactly the class FSF §8.5 flags.

**REDRESS.** Owned by `BJ.W-CONFIGURATOR-STD` (BAND-STORY W3) gate **G-CFG-5**
(`../../waves/BAND-STORY.md:245,269`: "curve-gallery adopts the standard; easing-curve is a modular
component; 0 dead bottom void"), **reframed by the binding perfection amendment AMEND-D-8**
(`FSF:436-439`, table row `FSF:224`): "Reframe `G-CFG-5` to the curve-stage layout-void fix (the
over-tall stage, F31 image) + configurator adoption; drop the 'modularize the easing-curve
component' framing." The lead adoption block binds the D-amendments to the band
(`../../waves/BAND-STORY.md:545-556`). The `./easing` PUBLIC-surface question ("does easing tooling
belong on the public surface at all") is the separate user call `ASK-REDUCTION §B4`
(`../../ASK-REDUCTION.md:120-131`), whose public-surface DROP, if ruled, executes in
`BAND-REDUCTION` W3 (`../../waves/BAND-REDUCTION.md:306-314`) — the redesign of the component SHAPE
and the public-surface DROP are cleanly split (`BAND-REDUCTION.md:359`). The void is additionally
review-marked by `BJ.W-ARISTOTLE-PROPORTION` (BAND-MATERIAL W5, `../../waves/BAND-MATERIAL.md:509`
— the proportion roster names the F31 void), which feeds, not fixes.
Coverage: **EXACT** — the live defect (the void) has a reframed born-RED that matches the
screenshot; the stale half (modularize) is a verified verify-not-fix; the public-surface fate is a
correctly-reserved ASK. No residue.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:53`; owners BAND-STORY W3 + ASK §B4 +
BAND-MATERIAL W5). **AGREE** — the amendment already caught the modularize/disk drift and
re-pointed the gate at the real defect.

---

## F32 — /motion/reveal "what is this vs our other scrolling components"

**Verdict vs opus row: RATIFIED** (post-JUDGE riders C-D + J11 appended).

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:44`): *"`/motion/reveal` — What is this vs our
other scrolling components."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** The reveal page is NOT a scrolling component — it is an
ENTRANCE/materialize page — but its name and neighbor (`/motion/scroll`) invite the conflation the
user voices. `demo/stories/motion/reveal.vue` demonstrates two distinct primitives: (1) the
`v-reveal` staggered-entrance directive (`:57-105`, the `[data-reveal]`/`--d` stagger the
consumer's own CSS drives, `:143-171`), and (2) `useLiquidReveal` bloom-from-source overlay
(`:107-133`, the iOS-27 materialize-from-trigger-rect move). The overlap with the scroll family
(`/motion/scroll` + the `fading-scroll`/`useStaggerReveal` keeps) is a taxonomy question — which
scroll/reveal primitives deserve distinct demo surfaces — not a paint defect. The same question is
asked a second time about `/motion/scroll` (F42).

**TARGET.**
- Demo sites: `demo/stories/motion/reveal.vue` (v-reveal `:57-105`; useLiquidReveal `:107-133`),
  `demo/stories/motion/scroll.vue` (the sibling F42 page).
- Src: `src/composables/motion/reveal/{vReveal.ts, useLiquidReveal.ts, useStaggerReveal.ts}`; the
  multi-consumer scroll keep `fading-scroll` (atlas+speedtest+value.js+keyframes.js, round-2). The
  fault is not a component bug — it is a demo-taxonomy overlap.

**POST-MORTEM.** Surface accretion without a taxonomy pass: the scroll-reveal primitives grew page
by page (`reveal`, `scroll`, plus a `scroll/` subdir) with no single ruling on which primitives are
distinct public surfaces and which demo pages should exist, so two adjacent pages read as "the same
thing twice" to a user. This is a family-C reduction/merge call the drafter cannot settle from the
census alone, so it is correctly a user-gated ASK, not an auto-fix.

**REDRESS.** Owned by `ASK-REDUCTION §C3` (`../../ASK-REDUCTION.md:190-207`): "Which scrolling
primitives survive as distinct public surfaces … And do the `/motion/reveal` + `/motion/scroll`
demo pages **collapse into one** scroll-family page?" — recommendation: consolidate to the
≥2-consumer keeps (`fading-scroll` confirmed), likely collapse reveal+scroll into one page.
`BAND-REDUCTION` explicitly routes `reveal/scroll/tempo` to the ASK, not a wave
(`../../waves/BAND-REDUCTION.md:73-76`). Post-JUDGE riders (anchor refreshed RU-14, 2026-07-18):
ruling **C-D** (`JUDGE.md`) ships the scroll census table as the recommendation with the
abstention resolved—but its "9-keep/6-cut table" anchor is STALE: the RU-09 SUPERFLUITY rewrite
(5c847780) no longer carries that table; its C-F verdict settles the census fresh
(`useStagger`/`useStaggerReveal`/`useBloomUp`/`useTextHighlight` all zero-caller; scrollReader's
one-site fence violated twice in its own house; the `.scroll-pin` CSS register moves to `demo/`
WITH its writers) and ships the full kill/keep table with the flip-on-file:line escape clause.
The §C3 recommendation text re-anchors to the RU-09 verdicts. Ruling **J11** codifies A06's
scroll-animation standard INSIDE the collapse wave (the survivor spine IS the substrate)—
unchanged. Whichever way the user rules, the "what IS this" identity is discharged: collapse
merges the pages, or keep-distinct triggers the `BAND-STORY` W2 copy canon (a page states "what it
IS and when to reach for it", `../../waves/BAND-STORY.md:155`) on the surviving page.
Coverage: **EXACT (as a user-gated decision)** — the merge call is reserved to the user with a
census-grounded recommendation carrying real positions (C-D); the identity-clarity half is
structurally covered by the copy canon regardless of outcome. No residue.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:54`, §C3). **AGREE.**

---

## F33 — /motion/deck vs carousel collapse + "the dot animations need dramatic refinement"

**Verdict vs opus row: SUPERSEDED** — the opus row's "no owning wave / PARTIAL / Δ-F33-1" was true
at its writing and is stale at HEAD: JUDGE **J3** adopted the delta and minted
`BJ.W-PAGER-DOT-MORPH` as BAND-FEEDBACK-MOTION **W6**, which exists in the band file at HEAD.

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:45`): *"`/motion/deck` — What is deck vs carousel
— likely collapse. The dot animations need dramatic refinement."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** Two separable asks. (1) **deck vs carousel** — the premise
"likely collapse" is contradicted by the disk: `./deck` is a HEADLESS engine
(`useDeck` + `DeckCore` + `useDeckKeyboard`, `src/components/deck/`), NOT a Carousel-shaped
component; `demo/stories/motion/deck.vue` consumes `useDeck` (`:31`) + `DeckPager` (`:127`), while
`./carousel` is a separate visual family (`Carousel.vue`, `CarouselContent/Item/Pager`). The real
external consumer of `useDeck` is **atlas ×2**, so collapsing deck INTO carousel breaks atlas's
headless integration. (2) **dot animations** — the deck's windowed pager dots (`DeckPager.vue` →
`PagerDots.vue`, with the `usePagerWorm` goo-morph + active-dot elongation) are the "dot
animations"; the user wants them DRAMATICALLY refined (the liquid-weight edict: pager/deck dots
goo-morph between states). **[CORRECTED RU-14, 2026-07-18]** The prior claim here—that the demo's
slide-stage goo (`DeckGooFilter`/`useDeckGoo`, `deck.vue:19-20,90`) is "a DIFFERENT mechanism"
from the pager dots—is OVERTURNED by the RU-09 SUPERFLUITY rewrite (5c847780): the stage goo is a
byte-identical CLONE of the pager worm machinery (the neck clipPath at `PagerDots.vue:326` ≡
`DeckGooFilter.vue:26`, re-verified on disk this pass), an in-house rebuild of the register
`CarouselContent.vue:4-18` records as RETIRED ("the metaball-merge is the INDICATOR's job… the
ONE metaball morph"). RU-09 rules F33 COLLAPSE-FAMILY and slates the clone for deletion
(`useDeckGoo.ts` + `gooBarbellGeometry.ts` + `DeckGooFilter.vue` + the ~200-line goo CSS block +
`DeckGoo.private.test.ts`); the refinement still targets the dots—but the stage goo is not a
separate mechanism to leave standing.

**TARGET.**
- Demo site: `demo/stories/motion/deck.vue:127` (`<DeckPager v-model:index … :window-fit="6" />`).
- Src (deck-vs-carousel): `src/components/deck/DeckPager.vue` (a 47-line thin `PagerDots`
  pass-through — the SUPERFLUITY-F33 vestige), `src/components/deck/composables/useDeck.ts`, vs
  `src/components/carousel/`.
- Src (the dot-refinement target): `src/components/pager-dots/PagerDots.vue` +
  `src/components/pager-dots/composables/usePagerWorm.ts` (the shared worm/elongation morph both
  `DeckPager` and `CarouselPager` ride) — the ONE site a "dramatic dot refinement" edits.

**POST-MORTEM.** (1) The collapse premise is a provenance error — the user reads "deck" and
"carousel" as duplicates because both page N slides with dots, but the census proved `useDeck` is a
headless engine atlas depends on; the confusion is real but the merge would break a real consumer.
(2) The dot-refinement half was a genuine orphan at crosswalk time: the ORPHAN-cure closed F19-F24
via BAND-FEEDBACK-MOTION and stopped there — the gap the crosswalk itself flagged
(`crosswalk:205-207`), cured by J3 at the judgment pass.

**REDRESS.**
- **deck vs carousel (EXACT-decision).** Owned by `ASK-REDUCTION §C1`
  (`../../ASK-REDUCTION.md:148-168`): keep deck as the headless `useDeck` engine (atlas ×2) +
  carousel as the visual component; collapse only any overlapping visual shell, never the engine.
  A user-ratification row on dispositive consumer evidence; not relitigated here.
- **dot animations (owned at HEAD).** `BJ.W-PAGER-DOT-MORPH` — BAND-FEEDBACK-MOTION **W6**,
  reauthored by the committed union as "F33 dot-refinement + the goo-clone collapse"
  (`../../waves/BAND-FEEDBACK-MOTION.md:241`, re-pinned RU-14 R5 from the dead `:130-148`;
  minted by JUDGE **J3**): the pager-dot goo-morph/worm refinement over `PagerDots`/`usePagerWorm`,
  **sequenced WITH the DeckPager cut AND the stage-goo clone deletion** (`:250-251` — the charter
  cites this docket ask by name, "widened per the JUDGE-2 docket row 9"; the refinement targets
  the surviving pager path only). Gates: the worm behavioral assertion (born-RED — none exists at
  HEAD), the cut grep precondition, paired-π of the dot morph across an index change on
  `/motion/deck` + `/navigation/carousel` (the route moved with the union, `:278`). The crosswalk
  carries the J3 annotation (`JUDGE.md` §D item 5, appended in the crosswalk's
  judgment-corrections section).

Coverage: **EXACT-at-ownership (RU-14 R5, 2026-07-18 — the band layer CLOSED by the committed
union `1340a918`; was PARTIAL).** The docket-row-9 ask this dossier filed is EXECUTED: W6's
charter now names the full clone set and cites the docket itself ("widened per the JUDGE-2
docket row 9", `BAND-FEEDBACK-MOTION.md:250-251`), with cut ownership seated at **BAND-REDUCTION
W8 `BJ.W-REDUCE-GOO-ENGINE`** (`BAND-REDUCTION.md:638-648`; FM `:260-261` "W8 is the SOLE owner
of the cuts"; APOTHEOSIS MECH-04/D-05) — the stage-goo clone deletion is owned, not ownerless.
Both prior halves stand owned too: the deck-vs-carousel keep at ASK §C1 (whose premise text
RU-09 C-C partially overturns, `SUPERFLUITY.md:632`), the dot refinement at W6. Residue
(genuinely open, lead-side): the ASK §C1/§C3 recommendation-text refresh to the RU-09 verdict
(`ASK-REDUCTION.md` untouched since `4ab12128`; ledger E2 PENDING). The ledger already stamps
docket row 9 "DISCHARGED-BY-UNION — ratify-and-close, do not re-apply" (C5) and owns this rot
class at H2 — annotated here, never re-opened. The
formerly-proposed Δ-F33-1 stays DISCHARGED (adopted as W6).

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:55`, §C1) + the J3/W6 annotation in the
judgment-corrections section. **AGREE** at HEAD.

---

## F34 — handmark "looks awful" (the boil worm)

**Verdict vs opus row: RATIFIED** (every file:line re-verified at HEAD).

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:46`): *"`/motion/handmark`: looks awful."*
Screenshot: `../../feedback/F34-handmark-awful-1.png`.

**ISOLATION (first-hand read).** Caption "BOIL BRUSH · THE NATURAL MORPHOLOGY" over "A seeded
hand-drawn underline keeps its character at any scale…"; the headline "The future is here" carries
two underlines (under "future" and "here") that read as FAT white blobby lozenges — thick,
sausage-like worms, not natural hand strokes. This is the boil brush: a filled hull on a curvy
value-noise centerline, far too heavy.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts:140,:144` (boil `weight: 7`, `ribbon: "hull"`),
  `:153-154` (`roughness: 0.9`/`wobble: 1.4`); the value-noise centerline in
  `src/components/handmark/noise.ts` + `constants.ts:57,61` (4-octave, 5% span), auto-engaged for
  boil at `src/components/handmark/composables/useHandMark.ts:113`. Confirmed on disk.
- Demo site: `demo/stories/motion/handmark.vue:36-46` (the boil-brush section).

**POST-MORTEM.** Two mis-set axes compounding: an over-heavy fill (`ribbon:'hull'` weight 7) laid
on an over-active value-noise drift (4 octaves at 5% span). "Naturalness" was modeled as procedural
wobble + a filled ribbon; both push AWAY from a calm confident line — a fat wobbly hull is the
literal worm. The design never had a WEIGHT axis or a calm-centerline bound, so nothing caught it.
The shipping wave's proof regime (born-RED→GREEN + π) verified mechanism presence — seeding,
band-seat fractions, filter wiring — never the gestalt read; headless-green/visually-broken.

**REDRESS.** Owned EXACTLY by `GF-HANDMARK` W1 (`GF-HM:246`, CALM-CENTERLINE + WEIGHT) via the calm
drift `wobbleLinePoints@0.22` (`GF-HM` §3.1, retires the value-noise + the `natural` prop) and the
boil RETIRE (`GF-HM:136` §4). Born-RED gates `G-CALM` + `G-WEIGHT` (`GF-HM` §10) name the exact
RED-at-HEAD sites; π-CALM is the paired live capture vs this worm. Coverage: **EXACT** — the
greenfield's born-RED is disk-true and its cure deletes the mechanism the screenshot proves.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:56`, GF-HANDMARK W1). **AGREE.**

---

## F35 — handmark "should be more pen-like, more natural" (the pen default)

**Verdict vs opus row: RATIFIED.**

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:47`): *"As does this — should be more pen-like,
more natural."* Screenshot: `../../feedback/F35-handmark-pen-like.png`.

**ISOLATION (first-hand read).** Caption "The hand voice" over "…The PEN default is grain:0 — a
clean wobbled path, no filter." The headline "Who pays in gets connected" underlines "pays in" with
a thin white line that wobbles unevenly, with faint doubling at the left curve. This is the PEN
default — and even the least-bad brush reads over-wobbled and slightly too heavy for a display
line, not a confident pen stroke.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts:111` (pen `weight: 6`), `:124-125`
  (`roughness: 0.7`, `wobble: 1.2`). Confirmed on disk.
- Demo site: `demo/stories/motion/handmark.vue:23-33` (the "hand voice" masthead section).

**POST-MORTEM.** Over-wobble + over-weight on a display line (`roughness:0.7`, `wobble:1.2`,
`weight:6` where a believable pen is ~2-2.5px). The pass-1 "double-line" story is NOT the root —
the critic (CRIT2 C2/C3, `GF-HM:32-33`) proved the `vbH` aspect-equalization already handles x/y
scale at HEAD, so the x-stretch/`vbH`-delete pillar was RETRACTED IN FULL; the real cause is a
wobbly heavy centerline, cured by calm+thin. The mark was tuned by procedural intuition, never
against a "one confident thin line" bound.

**REDRESS.** Owned EXACTLY by `GF-HANDMARK` W1 — pen KEPT as a stroke with `roughness→0.22`
(§3.1), `weight→2.5` (§3.2), arc-length lift-on taper (§3.4); `G-CALM` + `G-WEIGHT` gate it,
π-PEN is the paired capture vs this still. The `vbH`/`preserveAspectRatio="none"` apparatus STAYS
(`GF-HM:33`). Coverage: **EXACT.**

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:57`, GF-HANDMARK W1). **AGREE.**

---

## F36 — handmark "doesn't even work" (the highlighter)

**Verdict vs opus row: PARTIAL — containment half RATIFIED; the primary "doesn't work" mechanism
(the invisible band) was unexplained by the opus row and by `GF-HM` §5. Fresh finding below;
**FLIP-1** filed in the sidecar (contradicts the GF-HANDMARK-PASS3 §5/C8-iii premise).**

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:48`): *"Doesn't even work."* Screenshot:
`../../feedback/F36-handmark-broken.png`.

**ISOLATION (first-hand read).** Caption "HIGHLIGHTER · MULTIPLY OVER THE PAGE" over "The
highlighter paints like a highlighter: a low-seated hull ribbon… multiplying against the page text
behind it…". The headline "The part that really matters here" shows NO visible highlight over the
words — and a torn gold blob ESCAPES below the card's bottom border. The mark is both invisible
where it should be and leaking where it should not — "doesn't even work."

**TARGET — two independent faults.**
1. **The escape (containment):** `src/components/handmark/brush.ts:262,:266` (highlighter
   `weight: 26`, `ribbon: "hull"`); `HandMark.vue:327` (`overflow: visible`), no clip — the band is
   a weight-26 viewBox hull that stretches under `preserveAspectRatio="none"` and spills below the
   line box. Confirmed on disk.
2. **The invisibility (the fresh finding):** `HandMark.vue:340-343` (`data-behind` →
   `z-index: -1; mix-blend-mode: multiply`) + `brush.ts:267` (`opacity: 0.38`) under the demo card
   `demo/stories/motion/handmark.vue:53` (`paper-grain-overlay rounded-card border bg-card`), where
   `paper-grain-overlay` sets `isolation: isolate` (`src/styles/paper.css:124-126`). The card is
   therefore the compositing group: the negative-z band paints above `bg-card` and below the text
   (correct order), but MULTIPLY against a dark `bg-card` computes ≈ the card color — yellow
   `#ffd84a` × dark umber ≈ dark umber. In dark mode the band is chromatically invisible by
   arithmetic. The only visible paint is the overflow OUTSIDE the card's pixels, where the blend
   backdrop is transparent and the band reads full gold — exactly the F36 still. The component's
   own C-1(e) premise ("the multiply must compose against the PAGE", `HandMark.vue:312-316`) is
   defeated by the demo's own isolated card wrapper. Multiply is a light-mode idiom; it never had a
   dark arm. (Exact ΔE of the multiplied band: LIVE-DEFER — the arithmetic and the still agree.)

**POST-MORTEM.** The highlighter's height was a stretchy `weight:26` viewBox measure with
`overflow:visible` and no containment — the escape. Independently, the blend model was designed for
light paper and shipped under a dark-mode demo where multiply degenerates to ≈backdrop; no gate
measured "the band is VISIBLE over the word." Both faults are structural: a first-class surface
shipped uncontained AND scheme-blind.

**REDRESS.**
- **Containment:** `GF-HANDMARK` W3 (CONTAIN-HIGHLIGHT, `GF-HM` §5) — the line-box-relative band
  height + the asymmetric clip `inset(0 -8px 0 -8px)`; `G-CONTAIN` gates it; π-CONTAIN pairs vs
  this still. RATIFIED as the escape cure.
- **Visibility (FLIP-1, lead re-judges):** `GF-HM` §5's claim "F36 becomes impossible whether the
  geometry is right or not" holds only for the ESCAPE. A contained band that still multiplies
  against a dark card stays ≈invisible — the "doesn't even work" read survives W3 as specified. The
  redress needs a scheme-aware ink arm in W3 (or W2): multiply in light, `screen`/plain-alpha ink
  in dark (the `Brush.blend` vocabulary already carries `screen`), or an explicit dark-highlight
  color; and π-CONTAIN must run BOTH schemes with a visibility assertion (the band reads over the
  word), not only the no-escape assertion.

Coverage: **EXACT for the escape; GAP for dark-scheme visibility until FLIP-1 is judged.**

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:58`, GF-HANDMARK W3). **AGREE on
ownership; the wave's charter needs the FLIP-1 amendment to fully discharge the row.**

---

## F37 — handmark "broken and disjointed" (the draw-on fragments)

**Verdict vs opus row: PARTIAL — ownership + cure RATIFIED; the root attribution corrected.
**FLIP-2** filed in the sidecar (corrects the GF-HANDMARK-PASS3 §6 move-1 / `G-DRAW-CONNECTED`
RED-cause premise).**

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:49`): *"Broken and disjointed."* Screenshot:
`../../feedback/F37-handmark-disjointed.png`.

**ISOLATION (first-hand read).** Caption "DRAW-ON · IMPERATIVE PLAY()" with a "Replay draw" button.
The headline "A drawn line" underlines "drawn" but the mark is DISJOINTED — a wavy segment under
"draw" plus a separate stray dash floating to its right, not one connected line. The still shows
the fragments at REST (the drawn state).

**TARGET.**
- Src mechanism: `HandMark.vue:290` (`pathLength="1"`), `:350-353` (`stroke-dasharray: 1;
  stroke-dashoffset: 1` → `.drawn` offset 0), under `preserveAspectRatio="none"` (`:272`) +
  `vector-effect="non-scaling-stroke"` (`:291`).
- **The attribution correction:** the demo's draw-on specimen is the DEFAULT PEN
  (`demo/stories/motion/handmark.vue:72-74` — no `brush` prop), and `natural` auto-engages only for
  `brush === "boil"` (`src/components/handmark/composables/useHandMark.ts:113`) — so the pen's
  centerline is `wobbleLinePoints`, NOT
  the value-noise. The opus row's root ("a self-crossing value-noise Catmull-Rom centerline") —
  inherited from `GF-HM` §6 move 1 — cannot be F37's root: the value-noise is never in this
  specimen's path. The plausible static root is the dash mechanism itself: `pathLength`-normalized
  dashes under a non-uniform viewBox stretch with `non-scaling-stroke` are a known browser
  soft-spot — dash coverage under-runs the real path and leaves gaps/fragments at rest, the exact
  "dash-gap at rest" defect `GF-HM` §6 itself warns the mechanism risks. Exact fragment
  reproduction: LIVE-DEFER (screenshot + computed-style only; no context-steal).

**POST-MORTEM.** A hand-rolled normalized-length reveal (`pathLength="1"` + `dasharray:1`) was
composited with the family's two stretch mechanisms (none-stretch viewBox, screen-px stroking) —
three coordinate systems in one dash computation. Nothing asserted "the settled mark is one solid
connected segment," so the fragmenting shipped. The wrong root in the greenfield spec matters for
gate honesty: if the pen path does not self-cross, the calm-centerline move CANNOT alone cure F37 —
the mechanism swap is the load-bearing cure.

**REDRESS.** Owned by `GF-HANDMARK` W5 (DRAW-ON, `GF-HM` §6): adopt pencil-boil
`createStrokeDrawIn` — real `getTotalLength()`, dashoffset `length→0`, dasharray CLEARED on
completion so the settled stroke is solid regardless of length approximation; PRM-aware. This (§6
move 2) cures F37 under either candidate root; §3.1's calm centerline improves the mark
independently. `G-DRAW-CONNECTED` gates it — with FLIP-2 its RED-cause text re-anchors from
"self-crossing value-noise path" to "normalized-dash under-run at rest on the shipped pen
specimen"; π-DRAW pairs vs this still. Coverage: **EXACT via the mechanism swap; the gate's
RED-cause premise needs the FLIP-2 correction.**

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:59`, GF-HANDMARK W5). **AGREE on
ownership; the RED-cause attribution corrects per FLIP-2.**

---

## F38 — "each one generally awful — should be greenfielded" (the brush register)

**Verdict vs opus row: RATIFIED.**

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:50`): *"Each one generally awful — **should be
greenfielded**."* Screenshot: `../../feedback/F38-handmark-greenfield.png`.

**ISOLATION (first-hand read).** A wide card lists the brush register vertically: "pen" (thin white
wobble underline), "boil" (fat white wobble), "pencil" (faint grey dry line — the least-bad),
"crayon" (a fat RED torn blob offset from the word, overlapping the "y" descender), "marker" (a fat
GREEN lozenge). The right ~70% of the card is EMPTY. Every brush reads crude; the colored hull
brushes are misplaced blobs — the whole register is the target.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts` — the seven-brush register: pen (`:111`), boil
  (`:140` weight 7 hull), pencil (`:160` weight 3), crayon (`:184` weight 16 hull, `:198`
  wobble 3.0), ring (`:213-227`), marker (`:235` weight 12 hull), highlighter (`:262` weight 26
  hull). Confirmed on disk.
- Demo site: `demo/stories/motion/handmark.vue:84-95` (the brush-continuum section). The empty
  right ~70% is the horizontal-waste class (owned separately by GF-HM W6's demo rewrite +
  `BJ.W-RESPONSIVE-AUDIT`, BAND-STORY W6).

**POST-MORTEM.** The register grew seven brushes chasing "expressive variety," but four
(`boil/crayon/marker/highlighter`) engage `ribbon:'hull'` at high weight — the exact
fill-a-fat-blob mechanism the stills prove ugliest. The design never demonstrated that seven
brushes earn their keep; the fill ambition imported the hull's failure modes into the family. The
user's literal order is to greenfield it — reduce, not patch.

**REDRESS.** Owned EXACTLY by the `GF-HANDMARK` register cut (`GF-HM:39` C9, §4, §8): 7 brushes →
**pen · pencil · highlighter** + a `Partial<Brush>` override, each retiree carrying a NAMED
disposition. Delivery spans W1 (calm+weight) + W2 (FILL-STRATEGY: stroke default);
`G-WEIGHT`/`G-NO-SLIVER` gate the survivors, π-GALLERY proves each distinct AND natural vs this
still. The USER RULING (`GF-HM:377-386`) grants the greenfield full first-principles surface
authority; Q-HM-1/2 resolve inside the design loop. `BAND-REDUCTION` records the target surface
and hands delivery to the greenfield (`../../waves/BAND-REDUCTION.md:66-70,161`).
Coverage: **EXACT.**

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:60`, GF-HANDMARK §4 register 7→3).
**AGREE.**

---

## F39 — handmark "wrong layering, awful smoothing, awful encapsulation" (the ring)

**Verdict vs opus row: RATIFIED + AMENDED — the opus mapping of "awful encapsulation" to the mis-z
tearing is thin; the API half is fresh: the demo must hand-tune a raw viewBox rect to circle a word
the component already wraps.**

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:51`): *"Wrong layering, awful smoothing, awful
encapsulation."* Screenshot: `../../feedback/F39-handmark-layering.png`.

**ISOLATION (first-hand read).** The headline "A ringed word" is circled — a torn rust-red
hand-drawn ellipse — but the ring passes BEHIND the glyphs (the letters paint over the arc) and its
stroke is frayed/torn rather than a clean loop. Wrong z, grainy smoothing, and an API that does not
encapsulate the word it marks.

**TARGET.**
- Src fault: `src/components/handmark/brush.ts:222` (ring `grain: 0.7` — the feDisplacement fray =
  the "torn"/"awful smoothing"); `HandMark.vue:331-339` (`z-index: -1` on the circle/box/bracket
  overlay — the ring sits behind the glyphs, "wrong layering"). Confirmed on disk. The
  overshoot/self-cross is substrate-correct (`ellipsePoints` sweeps `2π+…`, `GF-HM:36` C6).
- **The encapsulation half (fresh):** `demo/stories/motion/handmark.vue:105-110` — the consumer
  passes `:box="{ x: 18, y: 8, w: 64, h: 24 }"`, a hand-tuned magic rect in raw viewBox units, to
  circle a word the component ALREADY wraps and measures. A text-mode circle should derive its
  datum from the measured word box; requiring consumer-tuned coordinates for the slotted word is
  the "awful encapsulation."

**POST-MORTEM.** A margin-annotation ring should sit ON the page in FRONT of the text at low alpha;
it was rendered at `z-index:-1` (behind, so fat letters occlude it) and carried `grain:0.7`
(feDisplacement fray on a thin ring). The `box` prop leaked the marking coordinate system to the
consumer even in text mode — the measurement machinery existed (`baselineFrac`/`boxAspect`) but the
circle path never consumed it.

**REDRESS.** Owned by `GF-HANDMARK` W4 (RING-LAYER, `GF-HM` §7.1) — the three verified toggles:
`grain 0.7→0` (clean ring), `z −1→front` (on the page, low alpha kept at `opacity:0.55`), keep the
substrate overshoot + `non-scaling-stroke`. `G-RING-LAYER` gates it; π-RING pairs vs this still.
The encapsulation half routes to W4/W6 under the full-surface-authority ruling: the text-mode
circle self-measures its datum (no consumer `box` for a slotted word; a positioned datum remains
the explicit-rect case). Coverage: **EXACT for layering/smoothing; the self-measuring-datum note
rides W4/W6's surface derivation.**

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:61`, GF-HANDMARK W4). **AGREE.**

---

## F40 — "remove ALL reference to meta text (what is 'SE') — awful, grand redesign"

**Verdict vs opus row: RATIFIED** (minor cite fix: the box-mode collapse geometry is
`geometry.ts:143-167`, not `:106+`).

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:52`): *"Remove ALL reference to meta text (what is
'SE') — awful, grand redesign."* Screenshot: `../../feedback/F40-handmark-meta-text-SE.png`.

**ISOLATION (first-hand read).** Two sections. Top caption "BOX-MODE HULL · THE SE-GUARD (NEVER A
VANISH)" over "…The se-guard falls back to a stroked body…" — the headline "box a datum  bracket it
tight" shows a thin GREEN vertical sliver over the 1-char "a" and a RED sliver over "it":
box/bracket shapes collapse to slivers over tiny datums. Bottom caption "AMPLITUDE · THE EXCURSION
KNOB" over "…the default reads byte-identical, an explicit amplitude lifts the wobble÷stroke
ratio…". The user's mark is the internal jargon in the captions ("SE-guard", "hull", "excursion",
"byte-identical", "wobble÷stroke") AND the sliver marks — both awful; grand redesign.

**TARGET.**
- Demo copy (the "what is SE" jargon): `demo/stories/motion/handmark.vue:119-120` ("box-mode hull ·
  the se-guard (never a vanish)" + the se-guard blurb), `:150-151` ("amplitude · the excursion
  knob" + "byte-identical … wobble÷stroke"), and the sibling jargon captions `:26,:51,:67`.
  Confirmed on disk. The demeta scrub (2d1584a5) cleaned src comments by wave/tranche token — the
  demo-facing labels/blurbs carried no such token and survived.
- Src fault (the slivers + the masked fallback): `src/components/handmark/geometry.ts:143-167`
  (box/bracket wobble sides collapsing over ~1ch), `src/components/handmark/ink.ts:195-215` (the
  se-GUARD — a degenerate hull falls back to a stroked sliver, the one masked fallback, against the
  no-masking-fallback edict). Confirmed on disk.

**POST-MORTEM.** Two faults under one ask. (1) The demo copy narrated INTERNAL mechanics to the
user — spec-internal guard names and tuning jargon in user-facing captions; the copy was written to
the tranche's internal audience and no copy canon banned it. (2) The se-guard is a
no-masking-fallback violation: a box/bracket over a 1-char datum is a sliver by geometry, and the
guard masks the degenerate case by falling ink back to a stroked band rather than degrading the
SHAPE. Both shipped because no gate forbade the jargon or the sliver.

**REDRESS.** Double-owned, both EXACT:
- **Jargon copy:** `GF-HANDMARK` W6 `G-NO-JARGON` (`GF-HM:282-284` — bans se-guard/hull/excursion/
  byte-identical/wobble÷stroke, names `handmark.vue:37,50,66,119,150`) AND `BJ.W-STORY-COPY-CANON`
  (BAND-STORY W2) `G-COPY-4` (`../../waves/BAND-STORY.md:197`) + `G-COPY-2` (`:195`, with the J8
  Mechanics-narration PATTERN ban).
- **The slivers + masked fallback:** `GF-HANDMARK` W2/W4 — box/bracket RETIRE (`GF-HM:137-138`
  §4), the se-guard DIES (`GF-HM:140-143`, "RETIRED, not patched" — a sub-min-span datum degrades
  its SHAPE, §7.2), gated by `G-NO-SLIVER`; π-DATUM captures a legible degraded shape vs these
  slivers.
Coverage: **EXACT** — "remove ALL reference to meta text" is a grep ban-list on the exact caption
lines (two owners), and the "awful/grand redesign" half retires the sliver shapes + the masked
fallback the screenshot proves.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:62`, GF-HANDMARK W6 + BAND-STORY W2).
**AGREE.**

---

## Coverage summary

| Row | ask (compressed) | terminal owner | coverage | verdict vs opus |
|-----|------------------|----------------|----------|-----------------|
| F31 | curve-gallery void + modularize easing | `BJ.W-CONFIGURATOR-STD` G-CFG-5 (AMEND-D-8) + ASK §B4 + MATERIAL W5 review | **EXACT** | RATIFIED |
| F32 | reveal vs other scrolling | `ASK-REDUCTION §C3` (+ C-D re-anchored to the RU-09 census, J11 standard) | **EXACT (decision)** | RATIFIED |
| F33 | deck vs carousel + dot refinement | `ASK-REDUCTION §C1` + `BJ.W-PAGER-DOT-MORPH` (FM W6, J3) + `BJ.W-REDUCE-GOO-ENGINE` (REDUCTION W8, the cuts) | **EXACT-at-ownership (RU-14 R5—band layer closed by the union; residue = the E2 ASK-text refresh, lead-side)** | SUPERSEDED |
| F34 | handmark boil worm "awful" | `GF-HANDMARK` W1 THE-VOICE (`G-CALM`/`G-RESTRAINT`; boil dies with the register) — RU-14 re-point | **EXACT** | RATIFIED |
| F35 | pen "more pen-like/natural" | `GF-HANDMARK` W1 THE-VOICE + W2 `G-WEIGHT` — RU-14 re-point | **EXACT** | RATIFIED |
| F36 | highlighter "doesn't work" | `GF-HANDMARK` §4 layering law via W2 (NO blend modes, plain alpha ink; π-BAND asserts visibility) — RU-14 re-point | **EXACT (the dark-visibility gap CONSUMED-BY-RU-06)** | PARTIAL |
| F37 | draw-on "broken/disjointed" | `GF-HANDMARK` W3 THE-CHOREOGRAPHY `G-DRAW` (dual-mechanism root; dash cleared at rest) — RU-14 re-point | **EXACT (mechanism swap)** | PARTIAL |
| F38 | brushes awful — greenfield | `GF-HANDMARK` register → ONE pen voice, no brush prop (Q-HM-1, `GF-HM:248`) — RU-14 re-point | **EXACT** | RATIFIED |
| F39 | ring layering/smoothing/encapsulation | `GF-HANDMARK` §4 layering law via W2 (circle over-glyph in DOM order, no z-index) — RU-14 re-point | **EXACT + amendment** | RATIFIED+AMENDED |
| F40 | remove meta text "SE"; redesign | `GF-HANDMARK` W4 THE-STORY `G-NO-JARGON` (box/bracket GONE, Q-HM-2 `:250`) + `BJ.W-STORY-COPY-CANON` — RU-14 re-point | **EXACT** | RATIFIED |

**Totals (as re-stated RU-14; re-tallied R3; F33 restored R5): EXACT 10 at ownership grain
(F33's residue is the lead-side E2 ASK-text refresh, not a band gap) / PARTIAL 0 /
gate-grain citations F34-F40 read through the SUPERSEDED-BY-RU-06 table at the range header
(ownership EXACT throughout).** Open flips: 0—both sidecar FLIPs closed CONSUMED-BY-RU-06
(F36's invisibility is the charter's own sharpening; F37's root its own attribution; the FLIP-1
multiply/screen cure is BANNED by the charter's NO-blend-modes law). Δ-F33-1 (the opus
artifact's one proposed delta): **DISCHARGED** — adopted by JUDGE J3 and minted as
BAND-FEEDBACK-MOTION W6 at HEAD.

## LIVE-DEFER register (claims only live paint can settle; no browser this seat)

- F31: the exact resting void proportion + whether `38cqi` mis-sizes the stage at any breakpoint.
- F36: the ΔE of the multiplied band on the dark card (the arithmetic and the still agree; the
  paired capture is owed to π-CONTAIN's both-schemes run).
- F37: reproduction of the exact at-rest fragment pattern (dash under-run vs mid-draw capture);
  observe via screenshot/computed-style only — never getContext on a live canvas.

---

*End — REFABLE RU-13 union, F31-F40. One file under `formation/redress/`; sidecar under
`formation/refable/`; no `src/`/`demo/` edits, no commit. All eight in-range stills read
first-hand; every handmark born-RED anchor re-verified on disk before the opus artifact was
opened.*
