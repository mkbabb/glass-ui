# BJ redress dossier — F21 through F30 (Fable seat)

Per-row inventory / isolation / target / post-mortem / redress / status-check for feedback-ledger
rows **F21-F30**, the user's 2026-07-17 corpus. Every screenshot in range was read first-hand
(F21/F22/F27/F28 have PNGs; F23/F24/F25/F26/F29/F30 are URL-anchored, no screenshot). Correlations
are verified against live `src/` + `demo/` at HEAD (`package.json` 7.0.0, `git describe`
v7.0.0-15-gf8a8de7c), and reconciled against the formation corpus (`ASSEMBLY-CROSSWALK.md` incl.
its lead reconciliation, `REGISTRY.md`, the band specs, the perfection docs, `GF-DOCK-PASS3.md`,
`IOS27-CODEX.md`, `CHRONIC-ADJUDICATION.md`, `ADJUDICATION-1.md`, `ASK-REDUCTION.md`). No `src/`/
`demo/` byte is touched by this dossier.

Convention: file paths absolute-from-repo-root; `crosswalk` = `../ASSEMBLY-CROSSWALK.md`. This range
straddles the crosswalk's ORPHAN→LANDED cure: F21/F22/F24 were primary-table ORPHANs the lead
reconciliation (`crosswalk:211-233`) closed by drafting `BAND-FEEDBACK-MOTION`.

---

## F21 — /feedback/progress scroll-progress rim broken + ill-defined

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:33`): *"`/feedback/progress` scroll-progress rim is
broken and ill-defined."* Screenshot: `../../feedback/F21-scroll-progress-rim.png`.

**ISOLATION (first-hand read).** The image is the `SCROLL PROGRESS RIM` section. The three horizontal
specimens labelled `1px` / `4px` / `12px` are the tell: instead of one continuous inset ring following
the rounded rectangle, the rim paints as DISJOINTED gradient chunks — the `12px` specimen shows a thick
cyan slab on the left edge, an unrelated cyan slab at the top-right, and gaps at the corners where the
band should join. The `4px` reads as a partial arc that does not close; the `Block end`/`Inline end`
edge specimens fade unevenly. The circular `0%/50%/100%` rings read acceptably (a circle maps
angle→perimeter cleanly), but the RECTANGULAR hosts are visibly broken. That corner-fragmentation is
exactly "broken and ill-defined."

**TARGET.**
- Src fault (the geometry): `src/components/scroll-progress-rim/styles.css:14-35` — the
  `.scroll-progress-rim__track` paints a `conic-gradient(from 0deg, …, transparent
  var(--scroll-progress-rim-fill), transparent 100%)` onto a `border`-box via `mask-composite:
  exclude` (`:19-35`). A conic gradient distributes by ANGLE from the box centre, but a rounded
  rectangle's perimeter-length is NOT proportional to sweep angle — so a "50%" fill lands at the wrong
  perimeter position and the corners fragment. The `bottom-edge`/`inline-end-edge` arms swap to a
  linear-gradient + `clip-path` (`:37-59`), a different mechanism again — three geometries, no coherent
  one.
- Component: `src/components/scroll-progress-rim/ScrollProgressRim.vue:43-91` (the `aggregateStops`/
  `segmentStops` builders feeding `--scroll-progress-rim-fill`/`-spectrum`).
- Demo site: `demo/stories/feedback/progress.vue:197-292` (the `<ScrollProgressRim>` grid — the exact
  `1px/4px/12px` width specimens at `:242-257`, the edge specimens at `:258-274`, the `4 stages`
  segment bar at `:276-291`), imported at `:7`.

**POST-MORTEM.** Wrong-primitive-for-the-geometry. Someone reached for a conic-gradient-on-a-masked-
border to paint a "rim that follows any silhouette," but a conic gradient is an angular paint and a
rounded rect is a perimeter path — the two only agree on a circle. The rim therefore looked plausible
on the round Dock host it was prototyped against and shipped broken on every rectangular host, with the
edge-coverage arms bolted on as a second and third mechanism. No gate asserted "no progress indicator
renders a partial-arc stroke," so the angular-vs-perimeter mismatch shipped uncontested. It is the
lead-named phantom: a rim-only branch was banked at `worktree-agent-ad45af8a27c9ce531` and never
converged.

**REDRESS.** Owned EXACTLY by `BJ.W-PROGRESS-RIM-REPLACE` (BAND-FEEDBACK-MOTION W2,
`../../waves/BAND-FEEDBACK-MOTION.md:42-56`) — a REPLACEMENT, not a retune, under **iOS-27 codex law
12** ("discrete progress as fill-pill + dots… → the scroll-progress-rim/loop replacement model",
`../ios27/IOS27-CODEX.md:55-57`): the broken-arc rim retires; discrete progress reads as a filled pill
that grows and swallows the next dot, and scroll-progress takes the same fill-pill grammar with a
continuous fraction. Born-RED gate (a) — "no progress indicator renders a partial-arc stroke, RED while
the rim ships" (`../../waves/BAND-FEEDBACK-MOTION.md:53-54`) — is disk-true against the conic/linear
partial-fill at `styles.css:20-24,39-46`. The phantom bank is NAMED and RETIRED as reference-only
(`:49-51`, per `chronic:phantom-bank-landing-vehicle`). Coverage: **EXACT** — the born-RED matches the
disk geometry, the replacement model is codex-anchored, and the abandoned branch is named not silently
re-landed. `OPEN-FM-1` (does indeterminate/loop ALSO take the pill, or keep its sweep) is a scope
decision reserved to wave-start, not F21 residue.

**STATUS CHECK.** Crosswalk flag: **ORPHAN** in the primary table (`crosswalk:43`) → **LANDED** by the
lead reconciliation (`crosswalk:214-216`, `F21 → BJ.W-PROGRESS-RIM-REPLACE`). **AGREE with LANDED** —
the band file exists with a disk-true born-RED and the law-12 cure; the table flag is superseded.

---

## F22 — progress animated loop jittery + not eased correctly

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:34`): *"Animated loop is jittery and not eased
correctly."* Screenshot: `../../feedback/F22-progress-loop-jitter.png` (a static frame — it shows the
`ANIMATED (LOOP)` bar ~37% filled in coral over a dark track; jitter is temporal, not capturable in
one frame, so the ISOLATION leans on the live driver).

**ISOLATION (first-hand read + live code).** The `ANIMATED (LOOP)` bar is driven by the DEMO, not by a
canonical loop animation: `demo/stories/feedback/progress.vue:22-45` runs a `window.setInterval` every
**120ms** that steps `animated.value += 3` (0→100), while the component's fill carries a CSS
`transition: transform var(--duration-normal) var(--ease-standard)`
(`src/components/progress/Progress.vue:158`). `--duration-normal` resolves to **300ms** (confirmed by
R3b's live `getAnimations()` reading "progress-value-fill (300ms)", `../round-3-live/R3B-DIGEST.md:55`).
So a new 3% target arrives every 120ms while the previous 300ms ease-in-out transition is only ~40%
through — each tick interrupts and re-eases a coarse 3% micro-move. The result is a pulsing staircase,
not a constant-velocity glide: precisely "jittery and not eased correctly."

**TARGET.**
- Demo driver (the jitter source): `demo/stories/feedback/progress.vue:22-45` (`setInterval` 120ms /
  +3% stepping) + `:108-114` (the `<Progress :model-value="animated">` render).
- Component transition: `src/components/progress/Progress.vue:158` (`.progress-value-fill` transition =
  `var(--duration-normal)` 300ms `var(--ease-standard)`).
- Canon layer: `src/styles/` motion tokens (`--duration-normal`, `--ease-standard`) — where W3 sets the
  loop period/easing as an assertion.

**POST-MORTEM.** Stepped-JS-timer masquerading as an eased loop. The demo author simulated progress with
a `setInterval` tick and let the component's per-change transition do the smoothing — but a tick
interval SHORTER than the transition duration guarantees perpetual interruption, so the easing curve
never completes and the motion reads mechanical. No canon assertion pins a loop period or a continuous
easing function, so the mismatched-clock loop shipped. R3b compounds the blind spot: its engagement
sample counted the loop as a POSITIVE idle-breath exemplar (`R3B-DIGEST.md:53-57`) — true for PRESENCE
(the bar animates continuously) but silent on QUALITY (the easing is wrong). Presence ≠ correctness.

**REDRESS.** Owned by `BJ.W-FEEDBACK-MOTION-TUNE` (BAND-FEEDBACK-MOTION W3,
`../../waves/BAND-FEEDBACK-MOTION.md:58-70`): "(1) live-π measure the shipped periods/easings; (2) set
the canon values in `src/styles/`, not component-local; (3) retune; (4) re-capture." Born-RED gate (a)
asserts a canon loop period + easing function that does not exist at HEAD (`:69`). The wave correctly
reconciles the R3b tension: "R3b confirms the animations RUN… the complaint is quality, not existence"
(`:61-63`). Residue: the wave frames the retune as a COMPONENT-easing/canon-value job, but the
screenshot's jitter is produced by the DEMO's `setInterval`-stepped driver interrupting the 300ms
transition — a mechanism no wave line names. Retuning the canon easing alone, while the demo keeps
firing a 120ms tick into a 300ms transition, will not remove the staircase. Coverage: **PARTIAL** — the
owner, the canon-layer discipline, and the R3b reconciliation are right; the uncovered residue is the
loop DRIVER (`progress.vue:22-45`), which must move from setInterval-stepping to a continuous eased loop
(CSS keyframe / WAAPI over the full 0→100 cycle) for the retune to bite.

**STATUS CHECK.** Crosswalk flag: **ORPHAN** in the primary table (`crosswalk:44`) → **LANDED** by the
lead reconciliation (`crosswalk:215`, `F22 → BJ.W-FEEDBACK-MOTION-TUNE`). **AGREE with LANDED** on
ownership; the driver-mechanism residue is the appendable delta below, not a status disagreement.

---

## F23 — slider/progress track-family deduplication (DRY)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:35`): *"What of the enlarged slider view, the
gradiated blurring — what of the progressbar/slider/etc **deduplication**: same logic, DRY them out."*
**URL-anchored (slider/progress family), no screenshot.**

**ISOLATION (from ledger + live code).** Three components paint a pill-rounded track + a value-fraction
fill, each re-spelling the same mechanic with divergent token vocabularies: Slider
(`src/components/slider/Slider.vue:286-293` `.slider-track`, `--slider-track-bg`), Progress
(`src/components/progress/Progress.vue:100-101` `.progress-rail`, `--progress-track` /
`--progress-track-on-glass`), and the Scrubber/Continuous rail
(`src/components/timeline/ContinuousRail.vue`). The fill register is ALREADY shared — both Slider
(`Slider.vue:224`) and Progress (`Progress.vue:60-62,169-171`, `.glass-liquid-fill` /
`.progress-liquid-fill`) compose `glass-liquid-fill`. So the residual duplication is the TRACK surface
(pill radius + track-bg tone), not the fill — the "same logic re-spelled" the user names.

**TARGET.**
- Src: `src/components/slider/Slider.vue:286-293,224`; `src/components/progress/Progress.vue:100-101,
  60-62,169-171`; `src/components/timeline/ContinuousRail.vue:31,84`.
- The fold target: a new `src/components/_shared/track.css` recessed-well utility + `--track-*` token
  family (mirroring the existing `glass-liquid-fill` class idiom). NOT named `glass-track`: that
  class is LIVE on `ScrubberTimeline.vue:209` — the wave takes a non-colliding name (per
  SUPERFLUITY F23's "rename off the colliding glass-track").

**POST-MORTEM.** Parallel-authorship drift under a partial abstraction. The fill was already unified onto
`glass-liquid-fill`, but the TRACK half was never lifted — each component minted its own track-bg token
name as it was written, so three vocabularies (`--slider-track-bg` / `--progress-track` / the timeline
warm-glass) describe one pill-track. No wave owned "one track material," so the divergence persisted
even after the fill was shared.

**REDRESS.** Owned EXACTLY by `BJ.W-TRACK-DRY` (BAND-MATERIAL W4,
`../../waves/BAND-MATERIAL.md:376-443`): the verified census (`:389-401`) matches disk (fill already
shared via `glass-liquid-fill`; track-bg tokens divergent), the fold is one `_shared/track.css`
partial the three read (`:403-406`), the born-RED is "three components re-spell the same pill-track +
track-bg mechanic, GREEN when the track surface is ONE partial" (`:417-419`), and the non-goals
correctly EXCLUDE the fraction drivers (reka SliderTrack drag ≠ Progress value ≠ Continuous stitch,
`:438-439`) — legitimately per-component. The π obligation is pixel-identical before/after (a refactor,
not a restyle, `:424-429`). Coverage: **EXACT** — the census is disk-true, the fold extends the proven
`glass-liquid-fill` idiom one step, and the scope correctly stops at the shared track. (The ledger's
"enlarged slider view" + "gradiated blurring" clauses are the A01 slider-engage/graded-backdrop asks,
routed to `BI.W-ENGAGE-AFFORD` + `BJ.W-GRADED-BACKDROP-JUDGE` — noted as adjacent, not F23's DRY core.)

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:45`). **AGREE** — a DRY ask with a verified
census, a KISS fold onto an existing idiom, and a refactor-safety π is exactly a LANDED wave.

---

## F24 — /feedback/skeleton animation too slow

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:36`): *"`/feedback/skeleton` — Animation is too slow."*
**URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** The skeleton shimmer sweep runs at
`animation: skeleton-scan var(--duration-shimmer, 2.4s) ease-in-out infinite`
(`src/components/skeleton/Skeleton.vue:54`), translating a 105° highlight band from `-110%` to `110%`
(`:39-63`). **2.4s** per sweep is a genuinely slow shimmer — a loading placeholder wants a quicker,
livelier pulse to read as "working," and `ease-in-out` on a continuous loop adds a dwell at each end
that reads as further sluggishness. The user's "too slow" is literally true on disk.

**TARGET.**
- Src fault: `src/components/skeleton/Skeleton.vue:54` (`--duration-shimmer` default 2.4s) + `:59-63`
  (the `@keyframes skeleton-scan` block).
- Canon layer: `src/styles/` — where W3 sets the shimmer period as an assertion (not a component-local
  literal).
- Demo site: `demo/stories/feedback/skeleton.vue`.

**POST-MORTEM.** Unmeasured component-local timing literal. `--duration-shimmer: 2.4s` was hand-picked
in the component with no canon assertion behind it, so nothing tied it to a motion-tempo rung or
challenged it against a legibility target — it shipped at whatever value the author first typed. Family
"visual-family-9" recognized the symptom (`REGISTRY.md:148`) but no band owned the retune until the
orphan cure.

**REDRESS.** Owned by `BJ.W-FEEDBACK-MOTION-TUNE` (BAND-FEEDBACK-MOTION W3,
`../../waves/BAND-FEEDBACK-MOTION.md:58-70`), the same wave as F22: measure the shipped shimmer period,
set the canon value in `src/styles/`, retune, re-capture. Born-RED gate (a) names "skeleton shimmer
period" as a canon assertion absent at HEAD (`:69`); gate (b) requires the value live in the token layer
not a per-component literal (`:70`, a grep gate) — which directly targets the `Skeleton.vue:54` inline
`2.4s`. Coverage: **EXACT** — the born-RED (no canon assertion; 2.4s reads dead-slow) matches the disk
literal, and the cure repoints that exact token onto a canon rung with a paired before/after capture.

**STATUS CHECK.** Crosswalk flag: **ORPHAN** in the primary table (`crosswalk:46`) → **LANDED** by the
lead reconciliation (`crosswalk:215`, `F24 → BJ.W-FEEDBACK-MOTION-TUNE`). **AGREE with LANDED** — a
single-token period retune with a canon assertion and a grep gate is precisely owned.

---

## F25 — /feedback/confirm-dialog vs a normal dialog

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:37`): *"`/feedback/confirm-dialog` — How is this any
different from a normal dialog."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** The user's premise is CORRECT and already actioned at the code
level: there is no `src/components/confirm-dialog` (verified absent) — the `./confirm-dialog` subpath was
folded into `./dialog` at 7.0.0. The demo page `demo/stories/feedback/confirm-dialog.vue` is now,
explicitly, a CONSUMER PRESET of Dialog shown inline (its own header comment states "ConfirmDialog
DEMOTED to a Dialog PRESET… presets live in consumers", `:5-9`): three `<Dialog>` + `<DialogContent
surface="glass" :show-close="false">` compositions with a confirm/cancel footer and a loading
dismiss-guard (`:46-48,86-134`). So "how is this different from a normal dialog" answers itself — it IS
a normal dialog with a preset, by construction. What remains open is whether the STORY PAGE should
survive as a distinct route.

**TARGET.**
- Demo site: `demo/stories/feedback/confirm-dialog.vue` (whole page; the inline preset).
- Src: `src/components/dialog/` (the fold target; `./confirm-dialog` subpath removed at 7.0.0 per
  MIGRATION.md).
- External consumers still on the removed subpath (the family-B relay obligation): muster×1, words×5,
  value.js×2 (`ASK-REDUCTION.md:178-181`).

**POST-MORTEM.** Not a defect — an already-executed reduction whose demo residue outlived it. The
component fold (confirm-dialog → dialog preset) landed at 7.0.0; the demo page was rewritten to a preset
illustration but kept as its own route, so the user, browsing routes, still sees a "confirm-dialog" page
and reasonably asks why it exists. The mechanism is a demo-taxonomy lag behind a landed component fold,
not code duplication.

**REDRESS.** Owned by `ASK-REDUCTION §C2` (`../../ASK-REDUCTION.md:171-188`, roll-up `:265`): the
component fold is recorded as already-landed (F25 answered at the code level), and the reserved user
call is (a) whether the demo STORY page survives as a distinct preset illustration or folds into the
dialog page, and (b) the family-B `/confirm-dialog → /dialog` relay for the 8 external consumers (files
regardless). `CHRONIC-ADJUDICATION.md:9-11` (R13-neighbourhood) and `ADJUDICATION-1` keep the fold
terminal. Coverage: **EXACT (as a user-gated decision)** — the plan correctly declines to re-fix an
already-folded component and hands the story-page-survival call to the user with the relay costed; no
code residue.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:47`). **AGREE** — a "how is this different" whose
component answer already shipped is a demo-taxonomy keep-or-fold call, i.e. an ASK row, not a code fix.

---

## F26 — /feedback/completion-seal overfit; "only speedtest"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:38`): *"`/feedback/completion-seal` — Greatly overfit;
likely belongs only in speedtest."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** The component is present and coherent:
`src/components/completion-seal/CompletionSeal.vue` is a hero-scale gold-draw completion mark (disc→ring
→check stagger off one `--seal-draw` mechanism, `:23-59`; README documents the earned-gold register,
`src/components/completion-seal/README.md:1-56`). The user's PROVENANCE premise is FALSE: speedtest
imports it **zero** times. The real consumers are sci-report×2 (`CategoryHomeView.vue:4`,
`GalleryView.vue:19`) + atlas×2 (`completion.ts:5`, `category.ts:2`) — two EXTERNAL repos, clearing the
≥2-consumer bar (`ASK-REDUCTION.md:58-61`). So this is not a defect to fix nor a speedtest-only inline;
it is a removal instinct the corrected census contradicts.

**TARGET.**
- Demo site: `demo/stories/feedback/completion-seal.vue`.
- Src: `src/components/completion-seal/` (whole component; PRESENT — no break on keep).
- Consumer truth: sci-report×2 + atlas×2 (NOT speedtest) — `ASK-REDUCTION.md:58-61`,
  `../../waves/BAND-REDUCTION.md:389-393`.

**POST-MORTEM.** The `recap:recap-carry-unexecuted` disease, provenance-variant. The user has named
completion-seal for removal across F26 + Q051 R14, on a "belongs only in speedtest" premise that the
round-2 adversarial re-verification refuted (speedtest = 0; the real consumers are two other repos,
finding "incomplete-provenance-retarget"). A blind delete on the stated premise would break sci-report +
atlas on the bump for a reason that isn't true. The honest cure is to surface the corrected provenance
and let the user rule, not to auto-execute a false premise.

**REDRESS.** Owned by `BJ.W-REDUCE-CROSSREPO-GATED` (BAND-REDUCTION W4,
`../../waves/BAND-REDUCTION.md:360-418`) as an ASK-gated relay, surfaced as `ASK-REDUCTION §A2`
(`../../ASK-REDUCTION.md:53-70`): keep-public (2 external repos), retire-with-relay to sci-report+atlas,
or inline (only if it drops to ≤1). Recommendation on record: borderline KEEP (clears ≥2). Wave 4 has NO
born-RED — its disposition is the user's call — and the corrected provenance rides the family-B outbound
regardless (`:404-405`, gate `G-RELAY-FILED` `:412`). `CHRONIC-ADJUDICATION.md:14-16` (R14) records the
inline-into-single-consumer branch as DEAD on the 2-repo truth. Coverage: **EXACT (as a decision)** —
the plan refuses the false-premise delete, carries the corrected census, and hands keep/retire/inline to
the user; no code residue.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:48`). **AGREE** — a removal on a provenance the
census contradicts is an ASK with the corrected truth attached, not a LANDED delete.

---

## F27 — why can I vertically scroll in the dock

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:39`): *"Why can I vertically scroll in the dock."*
Screenshot: `../../feedback/F27-dock-vertical-scroll.png`.

**ISOLATION (first-hand read).** The image is the horizontal feedback rail (`< Alert Toast Progress
Skeleton Confirm Dialog Completion Seal > | « » [layers]`), and a PINK drag/scroll artifact protrudes
above the pill's top edge at centre — a block-axis overscroll leak that should not exist on a
single-line horizontal strip. A horizontal dock has no block content to scroll; the fact that a vertical
drag registers (and paints a pink artifact out the top) is the exact "why can I vertically scroll"
defect.

**TARGET.**
- Src fault (the born-RED measure): `src/components/dock/composables/useDockOverflowFit.ts:38-40` — a
  `vertical`-guarded ternary (`vertical ? scrollHeight - clientHeight > 1 : scrollWidth - clientWidth > 1`,
  verified on disk); its block-overflow measure is the VERTICAL branch only. F27's host is a HORIZONTAL
  feedback rail, where this line measures INLINE overflow — so the block-axis leak on this rail is the
  co-cited `overflow.css` `overflow-y: visible` (below) + the recentre `block:'nearest'`, not this measure.
- Src fault (the CSS): `src/components/dock/styles/overflow.css:56-59,73` — both the FITS and OVERFLOW
  branches set `overflow-y: visible` (not `clip`); the block axis is left open so content/focus/drag can
  leak vertically. The vertical port is deferred to `shell.css`'s cap-derived rule (`overflow.css:112-
  116`), leaving the horizontal dock's block axis un-pinned.
- Co-cause (recentre): the selection recentre passes `block:'nearest'` (`useSelectionGroup.ts`, cited
  `GF-DOCK-PASS3.md:141`), which can nudge the block axis on select.
- Demo/route: `/dock/rail` and the feedback rail generally (the F27 host).

**POST-MORTEM.** An honest-`visible` cross-axis that forgot a horizontal strip has nothing to scroll
there. The SPINE refactor deliberately made the L1 controls run `overflow: visible` both axes to let
hover plates escape, and the scroll port was scoped to the INLINE axis — but nothing pinned the
horizontal dock's BLOCK axis to `clip`, so a stray focus ring, rim, or drag gesture (plus the recentre's
`block:'nearest'`) can register vertical movement and leak the pink artifact. The inline-scroll design
was thorough; the block-axis "there is nothing here to scroll, assert it" was the gap.

**REDRESS.** Owned EXACTLY by `GF-DOCK-PASS3 §4.1` W2 (`../greenfields/GF-DOCK-PASS3.md:139-144,272`),
gate **`G-NO-BLOCK-SCROLL`** (`:284-286`): "the horizontal dock has `scrollHeight === clientHeight` at
320px and desktop, every content/viewport combination — RED today: `useDockOverflowFit.ts:38-40`
measures a block overflow; F27 shows the pink drag leaking out the top." The cure: `overflow-y: clip`
on the port, kill the block axis, and drop `block:'nearest'` from the recentre (inline-only programmatic
`scrollTo`, `:140-141,272`). The born-RED cites the F27 screenshot first-hand and the exact measuring
line. Coverage: **EXACT** — the born-RED matches disk (on the horizontal rail the block-axis leak is the CSS
`overflow-y: visible` + the recentre `block:'nearest'`; the RO's block-overflow measure is its vertical
branch), the artifact is named, and the fix is a precise `clip` + recentre-arg cut.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:49`, `GF-DOCK §4.1 W2 G-NO-BLOCK-SCROLL`).
**AGREE** — a provably-dead block axis with a disk-true RED and a named screenshot is a clean LANDED
gate inside the dock greenfield.

---

## F28 — these blurs are inconsistent; ensure this is intentional

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:40`): *"These blurs are inconsistent — ensure this is
intentional."* Screenshot: `../../feedback/F28-blur-inconsistency.png`.

**ISOLATION (first-hand read).** The image is the springs page's control row: a `Register` label over a
`smooth` Select (chevron), then a `▷ Play` button and a `Reset` button. The Select reads as a fairly
flat translucent fill; the Play/Reset buttons carry a soft outer GLOW/halo bloom around their pills. The
perceived "inconsistency" is that the two buttons look materially different from the sibling Select — a
haloed pair beside a flat select. Whether that is a backdrop-BLUR divergence or a shadow/glow-bloom
divergence is the question the ledger itself flags ("ensure this is intentional").

**TARGET.**
- Demo site (the exact F28 host): `demo/stories/motion/springs.vue:231-249` — the `<Label>Register`
  (`:231`), the `<Select v-model="preset">` trigger (`:232-245`), the `<StoryPlayButton @play>`
  (`:248`), and the `<Button @click="reset">Reset` (`:249`).
- Material facts (disk, per `../../waves/BAND-MATERIAL.md:225-233`): the form family (Select/Input)
  shares `--control-surface-blur: var(--glass-blur-quiet)` = 7px (`tokens/glass.css:407`); an ordinary
  Button reads `--glass-blur-resting` = 7px (`button/styles.css:50`); a **primary** Button reads
  `--glass-blur-deep` = 16px (`button/styles.css:43`).
- Emphasis fact (verified this seat): `StoryPlayButton` defaults to `emphasis: "secondary"`
  (`demo/chassis/play/StoryPlayButton.vue:34`) and the Reset is a **default** `<Button>` — so NEITHER
  F28 button is primary. Per the disk material table, secondary/default buttons resolve to the 7px
  resting/quiet rung, the SAME as the Select.
- Blur ladder canon: `src/styles/tokens/glass.css:138-153` (the 6-names→4-values collision),
  `tokens/light-dark.css:36` (the 2dppx overlay arm).

**POST-MORTEM.** A named-but-colliding ladder plus an unresolved glow-vs-blur ambiguity. The
`--glass-blur-*` ladder has 6 rung names resolving to 4 distinct radii (1/7/11/16) with a device-
dependent 2dppx overlay jump — "named blur choices that don't visibly differ, plus a device-dependent
overlay" (`../../waves/BAND-MATERIAL.md:202-205`), which is the general F28/F48 "blurs are inconsistent"
mechanism. But for THIS screenshot the buttons are secondary/default (7px), the Select is quiet (7px) —
so a pure backdrop-blur-radius divergence is UNLIKELY to be what the user sees; the visible signal is
more plausibly the button's `glass-atom` glow/shadow bloom vs the Select's flat surface. The wave's
working hypothesis ("F28's divergence is plausibly the deep-tier primary vs the quiet select… Play?",
`:230`) assumes a primary button that the springs Play/Reset are not.

**REDRESS.** Owned by `BJ.W-BLUR-LADDER` (BAND-MATERIAL W2, `../../waves/BAND-MATERIAL.md:173-284`): the
ladder-collision ruling + the DPI-arm kill + arm **(D) "one material per role (the F28 select-vs-buttons
arm)"** (`:225-233`), gated by **`OPEN-2d`** — "the wave MUST run a live π on `/foundations` (or the F28
story) to confirm the select-vs-button divergence is deep-primary (intentional) or ordinary (bug) before
touching it" (`:254-255,284`). The verify-before-fix discipline is correct. Residue: the wave's live-π
is written toward `/foundations` and a primary-button hypothesis, but the F28 screenshot is `/motion/
springs` with a SECONDARY Play + DEFAULT Reset (both 7px) — so a blur-radius re-check will likely find
button==select and MISS the actual glow/shadow-bloom signal the image shows. Coverage: **PARTIAL** — the
owner and the live-π gate are right; the uncovered residue is (a) pinning `OPEN-2d`'s live-π to the
ACTUAL F28 route `/motion/springs` with the StoryPlayButton(secondary)+Button(default)+Select triad
(not `/foundations`, not a primary hypothesis), and (b) widening the re-check to the button GLOW/shadow-
bloom, since disk shows the radii already match at 7px.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:50`, `BJ.W-BLUR-LADDER … OPEN-2d live-π`).
**AGREE with LANDED** on ownership; the disagreement is only with the wave's WORKING HYPOTHESIS
(primary-deep on `/foundations`), which mis-fits the secondary/default springs triad — the appendable
delta below re-aims the live-π, it does not move the owner.

---

## F29 — /motion/springs redesign with better configurator support

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:41`): *"`/motion/springs` — Redesign with better
configurator support."* **URL-anchored, no screenshot** (the F28 PNG is captured on this route but marks
the blur ask, not F29).

**ISOLATION (from ledger + live code).** `demo/stories/motion/springs.vue` HAND-ROLLS its configurator:
a bespoke `<Select>` register picker (`:231-245`), two bespoke `<LabeledSlider>` authoring controls
(`:345-362`), a hand-built preview stage (`:257-290`), and a seed-from-register button grid + copy-stops
panel (`:415-489`) — `grep -c "Configurator" springs.vue` → **0** (the born-RED). It does NOT consume
the shipped `<Configurator>`/`studio` standard, so it re-implements configurator anatomy ad hoc rather
than adopting it — the "needs better configurator support" the user names.

**TARGET.**
- Demo site: `demo/stories/motion/springs.vue:224-337` (the hand-rolled Named-registers configurator) +
  `:339-492` (the hand-rolled Custom-authoring configurator).
- The standard to adopt: `src/components/configurator/` (`Configurator.vue:211` card radius;
  `styles.css:109` concentric relay; the `studio` variant consumed via `VizStudio.vue:80`, per
  `../perfection/FABLE-STORY-FRAMEWORK.md:189`).

**POST-MORTEM.** Pre-standard bespoke authorship. The springs page was written before (or beside) the
shared `<Configurator>` standard existed and never migrated onto it, so it carries a full parallel
configurator implementation. No gate asserted "configurator pages consume the standard," so the bespoke
version shipped and diverged from the one anatomy the tranche now wants everywhere.

**REDRESS.** Owned EXACTLY by `BJ.W-CONFIGURATOR-STD` gate **G-CFG-1** (BAND-STORY W3,
`../../waves/BAND-STORY.md:244,265`): "`grep -c 'Configurator|VizStudio' springs.vue` → 0 (born-RED);
GREEN when springs renders the configurator standard (studio variant) with a paired-π DELTA." The
perfection fold reframes and confirms it: **AMEND-D-2** (`../perfection/FABLE-STORY-FRAMEWORK.md:274-
280`) rules the standard is ADOPT-not-BUILD (the src `<Configurator>` already ships card radius +
grouped-list grammar), and the F29 row "stands — springs adopts the `studio` variant" (`:182`). The
tempo page folds INTO this redesign per `ASK-REDUCTION §C4` (`crosswalk:51`, `../../ASK-REDUCTION.md:
209-221`). Coverage: **EXACT** — G-CFG-1's born-RED is disk-true (0 Configurator), the cure is "adopt the
studio variant" (bound by AMEND-D-2 and required to carry a DELTA), and the KISS constraint forbids
forking a second configurator (`../../waves/BAND-STORY.md:280-281`). (The broader "redesign" — preview
stage, copy-stops affordance, proportion — is A10/story-framework standing scope, referenced not
re-owned.)

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:51`, `BJ.W-CONFIGURATOR-STD G-CFG-1` + ASK §C4
tempo fold). **AGREE** — a "better configurator support" ask with a disk-true grep born-RED, a named
adopt-target, and a DELTA obligation is precisely a LANDED story-standard gate.

---

## F30 — /motion/tempo "what even is" this page

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:42`): *"`/motion/tempo` — 'What even is' this page."*
**URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** `demo/stories/motion/tempo.vue` is a single-axis token demo: a
`--motion-tempo` slider (`:71-77`) that co-scales the CSS spring clocks + JS dock morph, with a dropdown/
popover/dialog/dock arranged to show the shared scaling (`:86-148`). It demonstrates ONE landed token
(Q051 R4, default 1.0) — legitimate, but a whole route for a single scalar axis is thin, and its purpose
does not announce itself, hence "what even is this page." It is a keep/fold/delete taxonomy question, not
a defect.

**TARGET.**
- Demo site: `demo/stories/motion/tempo.vue` (whole page; the `--motion-tempo` single-axis demo).
- Fold target: the springs/motion configurator page (F29's `BJ.W-CONFIGURATOR-STD` redesign).
- Token (survives regardless): `--motion-tempo` (`tempo.vue:47-53` writes it to `:root`).

**POST-MORTEM.** A real token given a page heavier than it warrants. `--motion-tempo` is a genuine landed
axis, but it was granted a standalone route where a single scalar reads thin next to component-rich
pages — the taxonomy over-provisioned a token demo. The mechanism is a story-taxonomy weighting call, not
a code fault (the page works; it is just questionably a page).

**REDRESS.** Owned by `ASK-REDUCTION §C4` (`../../ASK-REDUCTION.md:209-221`, roll-up `:267`): keep as its
own page, fold into the springs/motion configurator page (F29), or delete (the token stays; the page
goes). Recommendation on record: **fold into springs** ("a standalone page for a single axis is thin",
`:217-218`) — which composes cleanly with F29's configurator redesign. `../../waves/BAND-STORY.md:459`
routes per-page redesigns a responsive fix reveals as deeper (F30 tempo among them) to the same taxonomy
call. Coverage: **EXACT (as a decision)** — a "what even is this page" is precisely a keep/fold/delete
ASK with a recommendation that dovetails with the adjacent F29 landing; no code residue.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:52`, `ASK §C4`). **AGREE** — a thin single-axis
token page is a taxonomy fold-or-delete call for the user, not a LANDED fix.

---

## Coverage summary

| Row | ask (compressed) | terminal owner | coverage | delta count |
|-----|------------------|----------------|----------|-------------|
| F21 | scroll-progress rim broken | `BJ.W-PROGRESS-RIM-REPLACE` (FEEDBACK-MOTION W2, codex law 12) | **EXACT** | 0 |
| F22 | animated loop jittery/mis-eased | `BJ.W-FEEDBACK-MOTION-TUNE` (FEEDBACK-MOTION W3) | **PARTIAL** | 1 |
| F23 | slider/progress track DRY | `BJ.W-TRACK-DRY` (MATERIAL W4) | **EXACT** | 0 |
| F24 | skeleton animation too slow | `BJ.W-FEEDBACK-MOTION-TUNE` (FEEDBACK-MOTION W3) | **EXACT** | 0 |
| F25 | confirm-dialog vs normal dialog | `ASK §C2` (fold landed 7.0.0; story keep-or-fold) | **EXACT (decision)** | 0 |
| F26 | completion-seal overfit/"speedtest" | `BJ.W-REDUCE-CROSSREPO-GATED` + `ASK §A2` | **EXACT (decision)** | 0 |
| F27 | why vertical scroll in dock | `GF-DOCK §4.1 W2 G-NO-BLOCK-SCROLL` | **EXACT** | 0 |
| F28 | blurs inconsistent | `BJ.W-BLUR-LADDER` (MATERIAL W2, OPEN-2d) | **PARTIAL** | 1 |
| F29 | springs configurator support | `BJ.W-CONFIGURATOR-STD` G-CFG-1 (+ AMEND-D-2) | **EXACT** | 0 |
| F30 | tempo "what even is" | `ASK §C4` (fold into springs) | **EXACT (decision)** | 0 |

**Totals: EXACT 8 / PARTIAL 2 / MISSING 0** (F25/F26/F30 counted as EXACT-decision). Delta count: **2**.

## Proposed deltas (appendable form)

**Δ-F22-1 (residue — the loop DRIVER, not just the canon easing).** In `BJ.W-FEEDBACK-MOTION-TUNE`
(BAND-FEEDBACK-MOTION W3), the retune is framed as a component-easing/canon-value job
(`../../waves/BAND-FEEDBACK-MOTION.md:58-70`), but the F22 jitter is produced by the DEMO driver:
`demo/stories/feedback/progress.vue:22-45` fires a `window.setInterval` every 120ms stepping
`animated.value += 3` INTO the component's 300ms `.progress-value-fill` transition
(`Progress.vue:158`, `--duration-normal` = 300ms per R3b's live reading) — every tick interrupts the
previous ease mid-flight, producing the staircase. Retuning the canon easing alone will not remove it
while a 120ms tick keeps interrupting a 300ms transition. Append to W3's step-1/step-3: re-home the
`ANIMATED (LOOP)` demo from setInterval-stepping to a CONTINUOUS eased loop (a CSS keyframe / WAAPI
animation over the full 0→100 cycle), OR add a canonical looping-progress animation to the component so
the demo drives it declaratively; the canon period/easing assertion (gate a) then measures the real
loop, not a per-tick transition. Capture the CURRENT stepped loop as the born-RED baseline.

**Δ-F28-1 (residue — the live-π is aimed at the wrong route + the wrong axis).** In `BJ.W-BLUR-LADDER`
(BAND-MATERIAL W2) arm (D)/`OPEN-2d`, the live-π is written toward `/foundations` and a "deep-tier
primary vs quiet select (Play?)" hypothesis (`../../waves/BAND-MATERIAL.md:225-233,254-255`). But the
F28 screenshot is `/motion/springs`, and its buttons are `StoryPlayButton` (defaults `emphasis:
"secondary"`, `demo/chassis/play/StoryPlayButton.vue:34`) + a DEFAULT `<Button>` Reset — NEITHER is
primary, so both resolve to the 7px resting/quiet rung, the SAME as the Select. A pure blur-radius
re-check will therefore find button==select and MISS the actual signal. Append two pins to `OPEN-2d`:
(1) run the live-π on the ACTUAL F28 route `/motion/springs:231-249` with the Select +
StoryPlayButton(secondary) + Button(default) as the sibling triad, not `/foundations`; (2) widen the
re-check beyond backdrop-blur RADIUS to the button GLOW/shadow-bloom (the `glass-atom` outer glow vs the
flat Select surface), since disk shows the radii already match at 7px — so if F28 reads as inconsistent
it is a glow/shadow divergence, and the ruling (intentional emphasis vs bug) must be made against THAT
axis. Owner unchanged; the delta re-aims the probe.
