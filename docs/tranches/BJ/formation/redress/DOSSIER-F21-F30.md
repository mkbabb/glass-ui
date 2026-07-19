# BJ redress dossier — F21 through F30 (REFABLE unioned canon)

verified-model: **claude-fable-5** (REFABLE RU-13 true run, 2026-07-18, HEAD ced045d1 at
verification). Union provenance: the original dossier ran on claude-opus-4-8 via a config override;
a first union pass rewrote it (self-stamped fable-5, HEAD 4757315a); this TRUE-RUN pass re-executed
the full protocol against it — fresh ANEW from primary sources with the artifact unread, then
SCRUTINY with every claim guilty until re-proven. All ten rows re-proved in substance (the F28
7px statics re-proven at file grain, `button/styles.css:47-50`); two F25 evidence errors corrected
(fold-commit attribution; live relay census) and three stale cites refreshed. Fresh evidence
authoritative on conflict. Verdict sidecar: `../refable/REFABLE-RU-13-F21-F30.md`.

Per-row inventory / isolation / target / post-mortem / redress / verdict for feedback-ledger rows
**F21-F30**, the user's 2026-07-17 corpus. Screenshots F21/F22/F27/F28 read first-hand from
`docs/tranches/BJ/feedback/` (the /var/folders originals are gone; the tranche copies are the
authoritative paint evidence). Correlations verified against `src/` + `demo/` at HEAD and
reconciled against the formation corpus (`ASSEMBLY-CROSSWALK.md`, `REGISTRY.md`, the band specs,
`GF-DOCK-PASS3.md`, `IOS27-CODEX.md`, `ASK-REDUCTION.md`, `JUDGE.md`). No `src/`/`demo/` byte is
touched by this dossier.

Timeline note: the original dossier's two proposed deltas (Δ-F22-1, Δ-F28-1) were ADOPTED by the
lead as JUDGE.md **J7** and **J6** and are ALREADY APPLIED to the band files at HEAD
(`BAND-FEEDBACK-MOTION.md:79-84` driver re-home; `BAND-MATERIAL.md:258-262` OPEN-2d re-aim) — so
F22/F28 coverage is EXACT-as-amended here, not PARTIAL. Convention: paths repo-root-relative;
`crosswalk` = `../ASSEMBLY-CROSSWALK.md`.

---

## F21 — /feedback/progress scroll-progress rim broken + ill-defined

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:33`): *"`/feedback/progress` scroll-progress rim is
broken and ill-defined."* Screenshot: `../../feedback/F21-scroll-progress-rim.png`.

**ISOLATION (first-hand read, re-proven this seat).** The image is the `SCROLL PROGRESS RIM`
section. The circular dock specimens (`0%/50%/100%`) read acceptably — a circle maps angle to
perimeter cleanly. Every RECTANGULAR host is broken: the `1px/4px/12px` width specimens paint
disjointed gradient chunks (the 12px specimen is a fat teal band down the left, across the top, and
along the right with a rainbow smear mid-right — far more than 50% of the perimeter for a 50%
value); the `Block end`/`Inline end` edge specimens fade unevenly. The segment arm compounds it: the
`4 stages` card (per-item 1.00/0.72/0.35/0.00, aggregate 2.07/4 ≈ 52%) reads as one long near-full
pink band with a small teal run and a stray blue fragment — not four legible stages. On a ~30:1
card the conic's equal angular spans map to grossly unequal perimeter runs (the entire right edge
occupies ~4° of sweep; the bottom edge ~176°), so stage boundaries land mid-edge and the fill
fraction lies.

**TARGET.**
- Src fault (the geometry): `src/components/scroll-progress-rim/styles.css:14-35` — the
  `.scroll-progress-rim__track` paints a `conic-gradient(from 0deg, …, transparent
  var(--scroll-progress-rim-fill), transparent 100%)` onto a border-box via `mask-composite:
  exclude`. A conic gradient distributes by ANGLE from the box centre; a rounded rectangle's
  perimeter length is NOT proportional to sweep angle — the two agree only on a circle. The
  `bottom-edge`/`inline-end-edge` arms swap to linear-gradient + `clip-path` (`:37-64`) — a second
  and third mechanism; three geometries, no coherent one.
- Component: `src/components/scroll-progress-rim/ScrollProgressRim.vue:43-91` (the
  `aggregateStops`/`segmentStops` builders — the aggregate arm compresses all six spectrum stops
  into the fill arc via calc-multiplied positions; the segment arm sets fill=100% and paints
  per-segment percent stops around the full angular ring, inheriting the same angular distortion).
- Demo site: `demo/stories/feedback/progress.vue:197-292` (the width specimens `:242-257`, edge
  specimens `:258-274`, the `4 stages` segment card `:276-291`).

**POST-MORTEM.** Wrong-primitive-for-the-geometry. A conic-gradient-on-a-masked-border was reached
for to paint "a rim that follows any silhouette," but conic is an angular paint and a rounded rect
is a perimeter path — plausible on the circular dock hosts it demos best against, broken on every
rectangular host, with the edge-coverage arms bolted on as second and third mechanisms. No gate
asserted "no progress indicator renders a partial-arc stroke," so the angular-vs-perimeter mismatch
shipped uncontested. It is the lead-named phantom: a rim-only branch banked at
`worktree-agent-ad45af8a27c9ce531` and never converged.

**REDRESS.** Owned EXACTLY by `BJ.W-PROGRESS-RIM-REPLACE` (BAND-FEEDBACK-MOTION W2,
`../../waves/BAND-FEEDBACK-MOTION.md:49-63`) — a REPLACEMENT, not a retune, under iOS-27 codex law
12 (`../ios27/IOS27-CODEX.md:28` — "→ the scroll-progress-rim replacement model"): discrete
progress reads as a filled pill that grows and
swallows the next dot; scroll-progress takes the same fill-pill grammar with a continuous fraction;
the broken-arc rim retires. The fresh geometry evidence RATIFIES replacement over retune: fixing
the arc model on wide rectangles would need arc-length reparameterization — needless machinery for
a model law 12 supersedes. Born-RED gate (a) ("no partial-arc stroke", `:60-61`) is disk-true
against `styles.css:20-24,39-46`. The phantom bank is NAMED and RETIRED as reference-only
(`:56-58`). `OPEN-FM-1` (does indeterminate/loop also take the pill) is a wave-start scope
decision, not F21 residue.

**VERDICT (vs opus row).** RATIFIED — the angular-vs-perimeter mechanism was independently
re-derived this seat before reading the opus text and the two analyses agree; band citations
refreshed to HEAD line numbers (the file grew W5/W6 post-dossier); fresh evidence ADDED: the
segment-arm distortion on the `4 stages` card (the aggregate-52%-reads-near-full defect).
Crosswalk: ORPHAN (`crosswalk:43`) → LANDED at the lead reconciliation. AGREE with LANDED.

---

## F22 — progress animated loop jittery + not eased correctly

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:34`): *"Animated loop is jittery and not eased
correctly."* Screenshot: `../../feedback/F22-progress-loop-jitter.png` (a static frame — the
`ANIMATED (LOOP)` bar ~37% filled in coral; jitter is temporal, so isolation leans on the driver).

**ISOLATION (re-proven this seat).** The loop is driven by the DEMO, not a canonical animation:
`demo/stories/feedback/progress.vue:22-45` runs a `window.setInterval` every **120ms** stepping
`animated.value += 3` (0→100), while the component's fill carries `transition: transform
var(--duration-normal) var(--ease-standard)` (`src/components/progress/Progress.vue:157-158`).
`--duration-normal` = **0.3s** (`src/styles/tokens/scheme-motion.css:101`, corroborated by R3b's
live `getAnimations()` "progress-value-fill (300ms)", `../round-3-live/R3B-DIGEST.md:50-57`). A new
3% target arrives every 120ms while the previous 300ms ease is ~40% through — each tick interrupts
and re-eases a coarse micro-move: a pulsing staircase, "jittery and not eased correctly."
COMPOUNDING (fresh this seat): at the wrap (`animated >= 100 → animated.value = 0`,
`progress.vue:28-32`) the same 300ms transition animates the fill BACKWARDS across the full track —
a visible full-width rewind glide every ~4.1s cycle (34 ticks × 120ms), a second artifact the
retune must not preserve.

**TARGET.**
- Demo driver (the jitter source): `demo/stories/feedback/progress.vue:22-45` + `:108-114` (the
  `<Progress :model-value="animated">` render).
- Component transition: `src/components/progress/Progress.vue:157-158`.
- Canon layer: `src/styles/` motion tokens — where W3 sets the loop period/easing as an assertion.

**POST-MORTEM.** Stepped-JS-timer masquerading as an eased loop. A tick interval SHORTER than the
transition duration guarantees perpetual interruption — the easing never completes and the motion
reads mechanical; the wrap rides the same per-change transition and rewinds visibly. No canon
assertion pins a loop period or continuous easing. R3b compounds the blind spot: its engagement
sample counted the loop as a POSITIVE idle-breath exemplar — true for PRESENCE, silent on QUALITY.

**REDRESS.** Owned by `BJ.W-FEEDBACK-MOTION-TUNE` (BAND-FEEDBACK-MOTION W3,
`../../waves/BAND-FEEDBACK-MOTION.md:65-84`). The original dossier's residue (the driver, not just
the canon easing) was ADOPTED as **J7** and is APPLIED at HEAD: the band's "Driver re-home (J7)"
paragraph (`:79-84`) re-homes the demo off `setInterval` to a continuous eased loop alongside the
canon retune, with a driver-shape born-RED (no `setInterval` progress driver survives). The wrap
rewind is cured by the same re-home (a continuous 0→100 loop owns its own return leg). Coverage:
**EXACT (as amended by J7)**.

**VERDICT (vs opus row).** RATIFIED — mechanism independently re-derived and confirmed (120ms tick
vs 300ms transition; the 300ms figure re-verified against the token sheet, not only R3b). The opus
PARTIAL verdict is superseded: Δ-F22-1 was adopted (J7) and the band at HEAD carries it. Fresh
evidence ADDED: the wrap-around full-width rewind artifact. Crosswalk: ORPHAN → LANDED; AGREE.

---

## F23 — slider/progress track-family deduplication (DRY)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:35`): *"What of the enlarged slider view, the
gradiated blurring — what of the progressbar/slider/etc **deduplication**: same logic, DRY them
out."* URL-anchored (slider/progress family), no screenshot.

**ISOLATION (re-proven this seat).** What is ALREADY shared at HEAD — two registers, not one:
- the fill: `glass-liquid-fill` (`src/styles/glass/liquid-fill.css`), composed by Slider
  (`Slider.vue:224`, `SliderRange class="slider-range glass-liquid-fill"`) AND Progress
  (`Progress.vue:59-62,169-171`);
- the value domain: `src/components/_shared/valueDomain.ts` (`resolveValueFraction`,
  `resolveValueMarks`), imported by both (`Slider.vue:14`, `Progress.vue:4`).

What remains duplicated — the TRACK surface and the mark RENDERING: Slider's `.slider-track`
(`Slider.vue:286-293`, `--slider-track-bg`/`--slider-track-height`) vs Progress's `.progress-rail`
(`Progress.vue:94-102`, `--progress-track`/`--progress-track-on-glass`) vs the timeline family
(`src/components/timeline/ContinuousRail.vue`; `ScrubberTimeline.vue:209` carries a LIVE
`class="glass-track timeline-rail"`). Both Slider and Progress also each render their own mark
spans off the shared math (`.slider-mark` vs `.progress-value-mark`, same `--value-mark-position`
token idiom) — divergent vocabularies over one pill-track mechanic.

**TARGET.**
- Src: `Slider.vue:286-293,224`; `Progress.vue:94-102,59-62,169-171`;
  `timeline/ContinuousRail.vue`; `timeline/ScrubberTimeline.vue:209`.
- The fold target: the shared track partial named **`glass-track-well`** (C-C ruling) + a
  `--track-*` token family, mirroring the `glass-liquid-fill` class idiom. NOT `glass-track` — that
  class is LIVE on `ScrubberTimeline.vue:209` (the non-colliding-name requirement).

**POST-MORTEM.** Parallel-authorship drift under a PARTIAL abstraction. The fill and the value
domain were lifted; the track half never was — each component minted its own track-bg vocabulary as
it was written. No wave owned "one track material," so the divergence persisted even after two
shared registers proved the idiom.

**REDRESS.** Owned EXACTLY by `BJ.W-TRACK-DRY` (BAND-MATERIAL W4,
`../../waves/BAND-MATERIAL.md:389-443`): the census matches disk; the fold is one shared track
partial the components read; the non-goals correctly EXCLUDE the fraction drivers (reka SliderTrack
drag ≠ Progress value ≠ Continuous stitch — legitimately per-component); π obligation is
pixel-identical before/after. Sequencing per the **C-C ruling** (`JUDGE.md`): W4's naming is
INDEPENDENT of the timeline redesign; the surviving continuous Timeline ADOPTS `glass-track-well`
at its own redesign, widening the family to ≥3 real consumers — F23's flip condition satisfied in
the right direction. The ledger's OTHER two clauses route elsewhere, CORRECTED per J1: "enlarged
slider view" is the A01 slider-engage ask, owned at HEAD by `BJ.W-IDLE-BREATH`
(BAND-FEEDBACK-MOTION W5 — J1 reversed the crosswalk's over-credit of `BI.W-ENGAGE-AFFORD`);
"gradiated blurring" is the F50 experiment, owned by `BJ.W-GRADED-BACKDROP-JUDGE` (BAND-MATERIAL
W3). Adjacent, not F23's DRY core.

**COVERAGE (RU-14 R5, 2026-07-18): CONSUMED-BY-UNION — EXACT pending J12 ratification.** The
RU-14 downgrade (EXACT → PARTIAL, on the RU-09 C-G value-marks fold `BJ.W-TRACK-DRY` never
scoped + the track-well path split) was EXECUTED by the committed nine-band union (`1340a918`):
W4 now charters "BOTH registers: the track well AND the value-marks paint"
(`BAND-MATERIAL.md:55`; value-mark text now 9 hits file-wide — the twin ~65-line marks census at
`:488-490`, the history line `:474`), mints `src/styles/glass/track-well.css` +
`src/styles/glass/value-marks.css` at the SUPERFLUITY path and names "the prior
`_shared/track.css`" charter SUPERSEDED (`:503-510`) — the path split RECONCILED to
`SUPERFLUITY.md:227`; `OPEN-4a` is RULED toward the CSS register pair (`:793`). Both terminal
conditions of the downgrade are met on disk; the old `:433`/`:476` pins are dead. What remains
is the formal J12 ratify-and-close (docket row 8, stamped CONSUMED-BY-UNION; the ledger C5
vehicle — ratify, never re-apply). This dossier's own ISOLATION had recorded the marks
duplication yet kept EXACT and filed no FLIP; that contradiction stays owned here as history.

**VERDICT (vs opus row).** RATIFIED with two corrections — (1) the opus row understated the shared
surface (it credited only the fill; `_shared/valueDomain.ts` is a second already-shared register,
and the mark RENDERING is a further residual duplication for W4's census); (2) the adjacent-clause
routing to `BI.W-ENGAGE-AFFORD` is STALE — J1 re-homed the engage half to `BJ.W-IDLE-BREATH` (W5).
Crosswalk: LANDED; AGREE.

---

## F24 — /feedback/skeleton animation too slow

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:36`): *"`/feedback/skeleton` — Animation is too
slow."* URL-anchored, no screenshot.

**ISOLATION (CORRECTED this seat — the original dossier's value and mechanism were wrong).** The
skeleton sweep is `animation: skeleton-scan var(--duration-shimmer, 2.4s) ease-in-out infinite`
(`src/components/skeleton/Skeleton.vue:51-57`). The prior dossier read the **2.4s fallback** as the
shipped value and called it an "unmeasured component-local timing literal." Both claims are false
on disk: `--duration-shimmer` IS a defined root token = **5s**
(`src/styles/tokens/scheme-motion.css:107`), so the shipped sweep is **5s per cycle** — more than
double the dossier's figure — and the value already lives in the token layer. Worse, the token
sheet DOCUMENTS the intent the component violates: `src/styles/theme/literals.css:24-34` states the
shimmer ladder splits into `--duration-shimmer-fast` (3s, "fast loop tempo for the band-pass
shimmer pattern (**skeleton**, marketing)") vs the unsuffixed `--duration-shimmer` (5s, "slower
one-pass sweep for brand-polish moments" — the metal/gold register). The skeleton's own keyframe
binds the WRONG RUNG: a loading placeholder riding the slow brand-metal sweep clock. `ease-in-out`
adds an end-dwell that reads as further sluggishness. "Too slow" is literally true — at 5s, not
2.4s, and by canon drift, not by a stray literal.

**TARGET.**
- Src fault: `src/components/skeleton/Skeleton.vue:51-57` (the wrong-rung `var(--duration-shimmer,
  2.4s)` bind + `@keyframes skeleton-scan` `:59-63`).
- Canon layer: `src/styles/tokens/scheme-motion.css:106-107` + the documented ladder at
  `src/styles/theme/literals.css:24-34` — where the skeleton period becomes an assertion.
- Demo site: `demo/stories/feedback/skeleton.vue`.

**POST-MORTEM.** Token-borrow across registers, not a local literal. The skeleton borrowed the
nearest shimmer clock; the ladder later split fast-loop vs slow-sweep and documented skeleton as
fast-rung — but nothing re-bound the component, and no assertion pinned the period, so the skeleton
kept the 5s brand-polish clock. The dead 2.4s fallback then misled a static read (the prior
dossier) into reporting a value the browser never uses — the exact class of error a
resolved-value check catches.

**REDRESS.** Owned by `BJ.W-FEEDBACK-MOTION-TUNE` (BAND-FEEDBACK-MOTION W3,
`../../waves/BAND-FEEDBACK-MOTION.md:65-77`), same wave as F22 — with one SHARPENING the lead
should re-judge (sidecar FLIP-1): gate (b) as written ("the values live in the token/canon layer,
not per-component literals") is ALREADY satisfied by skeleton at HEAD in the letter — it reads a
token — while the defect persists. For F24 the born-RED must assert (i) the skeleton period VALUE
against a canon rung (the retuned figure the wave measures and sets — the documented fast rung or a
new skeleton-owned token; ≤3s per the ladder's own intent, exact value π-decided) and (ii) the
RUNG BINDING (skeleton-scan does not read the brand-metal sweep clock). The dead 2.4s fallback
retires with the re-bind. Coverage: **EXACT on ownership; the gate shape needs the value+rung
assertion, not token-residence**.

**VERDICT (vs opus row).** OPUS-WRONG — the central value claim (2.4s) and the post-mortem
("component-local literal", "no canon behind it") are both refuted on disk: the resolved value is
5s via a defined token, and the canon layer explicitly documents the fast-rung intent the component
misses. Owner unchanged; the corrected mechanism is appendable delta Δ-F24-1 below. Crosswalk:
ORPHAN → LANDED; AGREE with LANDED on ownership.

---

## F25 — /feedback/confirm-dialog vs a normal dialog

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:37`): *"`/feedback/confirm-dialog` — How is this
any different from a normal dialog."* URL-anchored, no screenshot.

**ISOLATION (re-proven this seat).** The user's premise is CORRECT and already actioned at the code
level: there is no `src/components/confirm-dialog` (verified absent at HEAD; the demotion landed at
**c368ccbc** — BI B28 `BI.W-DIALOG-PLACEMENT`, "ConfirmDialog DEMOTED to a consumer Dialog preset,
dirs/barrels/subpaths DELETED" — PREDATING the Glass 7 cut 490cc46e the prior dossier credited;
`git log --diff-filter=D -- 'src/components/confirm-dialog*'` names exactly c368ccbc) — the
`./confirm-dialog` subpath folded into `./dialog` at 7.0.0.
The demo page `demo/stories/feedback/confirm-dialog.vue` is now, explicitly, a CONSUMER PRESET of
Dialog shown inline (its header comment: "ConfirmDialog DEMOTED to a Dialog PRESET… presets live in
consumers", `:5-9`): three `<Dialog>` + `<DialogContent surface="glass" :show-close="false">`
compositions with confirm/cancel footers and the loading dismiss-guard (`:44-48,86-134`). "How is
this different from a normal dialog" answers itself — it IS a normal dialog with a preset, by
construction. What remains open is only whether the STORY PAGE survives as a distinct route.

**TARGET.**
- Demo site: `demo/stories/feedback/confirm-dialog.vue` (whole page; the inline preset).
- Src: `src/components/dialog/` (the fold target; subpath removed at 7.0.0).
- External consumers still on the removed subpath (the family-B relay): the ASK's figure is
  "muster×1, words×5, value.js×2 = 8" (`ASK-REDUCTION.md:175-181`); the fresh sibling census
  (this seat, `grep -rln "glass-ui/confirm-dialog"`) finds **6 LIVE import sites** — words×5
  (`frontend/src/components/custom/{sidebar×2,wordlist/views×2,search×1}`) + muster×1
  (`frontend/src/App.vue`, a `defineAsyncComponent` dynamic import that pure import-statement
  greps miss — SUPERFLUITY C-I's precision, `SUPERFLUITY.md:682-686`) — while value.js is **×0
  live: already migrated** (its `AdminUsersPanel.vue` is the migration exemplar, per C-I; the
  old pair are DOC references only, `docs/tranches/V/CONSUMER-CUT.md` + `…/waves/W44.md`). One
  config reference rides the roster besides the imports (added RU-14 R3):
  `words/frontend/vite.config.ts:218` carries the subpath literal in `optimizeDeps.include`
  and dies with the same relay. The family-B relay carries the corrected 6-live + 1-config +
  2-doc figure.

**POST-MORTEM.** Not a defect — an already-executed reduction whose demo residue outlived it. The
component fold landed; the demo page was rewritten to a preset illustration but kept its own route,
so the user, browsing routes, still sees a "confirm-dialog" page and reasonably asks why it exists.
Demo-taxonomy lag behind a landed component fold, not code duplication.

**REDRESS.** Owned by `ASK-REDUCTION §C2` (`../../ASK-REDUCTION.md:171-188`, roll-up `:266`): the
fold is recorded as landed; the reserved user call is story-page survival + the family-B
`/confirm-dialog → /dialog` relay for the external consumers (the ASK row says 8; the corrected
census is 6 live + 1 config + 2 doc, per TARGET — the relay files regardless). Per the **C-A
ruling** (`JUDGE.md`): the fold-into-dialog.vue recommendation ships as the ASK row's DEFAULT, with
the one-line discoverability counterpoint; the user ratifies. Coverage: **EXACT (as a user-gated
decision)**.

**VERDICT (vs opus row).** RATIFIED — every claim re-verified (component absence, preset page,
consumer counts, ASK row); C-A ruling note ADDED (the default recommendation is now on record).
Crosswalk: ASK; AGREE.

---

## F26 — /feedback/completion-seal overfit; "only speedtest"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:38`): *"`/feedback/completion-seal` — Greatly
overfit; likely belongs only in speedtest."* URL-anchored, no screenshot.

**ISOLATION (re-proven this seat, first-hand sibling grep).** The component is present and coherent
(`src/components/completion-seal/` — the hero-scale gold-draw completion mark). The user's
PROVENANCE premise is FALSE, re-verified independently this seat against the sibling repos
(read-only): speedtest imports it **zero** times (`grep completion-seal speedtest/src` = 0); the
real consumers are **sci-report** (`dashboards/home/gallery/CategoryHomeView.vue`,
`GalleryView.vue`) + **atlas** (`src/design/recipes/completion.ts`, `src/skin/category.ts`, plus
compositor/preset references) — two external repos, clearing the ≥2-consumer bar. Not a defect to
fix nor a speedtest-only inline; a removal instinct the corrected census contradicts.

**TARGET.**
- Demo site: `demo/stories/feedback/completion-seal.vue`.
- Src: `src/components/completion-seal/` (whole component; PRESENT — no break on keep).
- Consumer truth: sci-report + atlas, NOT speedtest (`ASK-REDUCTION.md §A2`,
  `../../waves/BAND-REDUCTION.md:392-396`).

**POST-MORTEM.** The `recap:recap-carry-unexecuted` disease, provenance-variant. The user has named
completion-seal for removal repeatedly (F26 + Q051 R14) on a premise round-2 adversarial
re-verification refuted. A blind delete on the stated premise would break sci-report + atlas on the
bump for a reason that isn't true. The honest cure surfaces the corrected provenance and lets the
user rule.

**REDRESS.** Owned by `BJ.W-REDUCE-CROSSREPO-GATED` (BAND-REDUCTION W4,
`../../waves/BAND-REDUCTION.md:363-418`) as an ASK-gated relay, surfaced as `ASK-REDUCTION §A2`:
keep-public (2 external repos) / retire-with-relay / inline (only if it drops to ≤1);
recommendation on record: borderline KEEP. W4 has NO born-RED — the disposition is the user's call
— and the corrected provenance rides the family-B outbound regardless (gate `G-RELAY-FILED`).
Crosswalk correction **D-3** (`JUDGE.md`) already pins the ASK row's premise to the verified census
with the KEEP-DISTINCT recommendation attached. Coverage: **EXACT (as a decision)**.

**VERDICT (vs opus row).** RATIFIED — the census claim survived an independent first-hand sibling
grep this seat (the third verification of this row's truth); D-3 note ADDED. Crosswalk: ASK; AGREE.

---

## F27 — why can I vertically scroll in the dock

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:39`): *"Why can I vertically scroll in the dock."*
Screenshot: `../../feedback/F27-dock-vertical-scroll.png`.

**ISOLATION (first-hand read + mechanism CORRECTED this seat).** The image is the horizontal
feedback rail (`< Alert Toast Progress Skeleton Confirm Dialog Completion Seal > | « » [layers]`)
with a PINK artifact protruding above the pill's top edge at centre — block-axis movement that
should not exist on a single-line horizontal strip. The prior dossier attributed the leak to "both
the FITS and OVERFLOW branches set `overflow-y: visible`… the block axis is left open." That is not
how the axis becomes scrollable: on the FITS branch BOTH axes are `visible`
(`overflow.css:50-59`) — not a scroll container; `visible` alone cannot scroll, only paint outside.
The scroll axis exists ONLY on the OVERFLOW branch (`[data-dock-overflow]`,
`overflow.css:62-105` — the F27 rail, which carries the chevron/overflow chrome): `overflow-x:
auto` forces the paired `overflow-y: visible` to a COMPUTED **`auto`** (CSS Overflow 3 — visible
computes to auto when the other axis is neither visible nor clip), so the port IS a live block-axis
scroll container, and any ≥1px block-axis scrollable overflow (overhanging hover plates/focus
rings against the `--dock-scroll-safe-inset` padded box) yields real vertical scrolling —
`overscroll-behavior` is only contained on x (`:83`). Two aggravators stand from the prior
analysis, RATIFIED: the recentre passes `block:'nearest'`
(`src/composables/motion/morph/useSelectionGroup.ts:183-186` per
GF-DOCK-PASS3), and `useDockOverflowFit.ts:38-41` measures block overflow only on its vertical
branch (on the horizontal rail it measures inline — correctly cited as NOT the leak source). ALSO
fresh this seat: the source comment at `overflow.css:65-66` claims "`overflow-x: auto` spec-forces
the computed cross axis to a clip" — the spec forces **auto**, not clip; the T-52(b) ring-room
idiom was built on this misreading, which is WHY the leak shipped. The exact content supplying the
scrollable delta on the live rail is **LIVE-DEFER** (needs a live scrollHeight/clientHeight probe);
the computed-auto mechanism is spec-certain.

**TARGET.**
- Src fault (the CSS): `src/components/dock/styles/overflow.css:62-105` (the overflow branch whose
  computed cross axis is auto) + the false spec comment at `:65-66`.
- Co-cause (recentre): `src/composables/motion/morph/useSelectionGroup.ts:183-186`
  `block:'nearest'` (the composable lives under `motion/morph/`, NOT under `dock/`).
- Measure (vertical-only, for the gate): `src/components/dock/composables/useDockOverflowFit.ts:38-41`.
- The intentional contrast: vertical rails scroll their block axis BY DESIGN
  (`dock/styles/shell.css` cap-derived `.vertical` rule) — F27 is the HORIZONTAL dock only.
- Demo/route: the feedback category rail (the F27 host) + `/dock/rail`.

**POST-MORTEM.** A spec misreading frozen into a comment. The SPINE refactor deliberately made the
L1 controls run `overflow: visible` and scoped the scroll port to the inline axis, reserving
cross-axis ring-room via padding/negative-margin ON THE BELIEF the cross axis would compute to
clip. It computes to auto; the ring-room padding plus overhanging content became scrollable block
overflow; nothing asserted "the horizontal dock has no block axis to scroll."

**REDRESS.** Owned EXACTLY by the dock greenfield: `GF-DOCK-PASS3 §4.1` W2
(`../greenfields/GF-DOCK-PASS3.md:104-111`, roster row `:319`), gate **`G-NO-BLOCK-SCROLL`**
(`:357`):
`scrollHeight === clientHeight` on the horizontal dock at every content/viewport combination; the
cure is explicit `overflow-y: clip` on the port (killing the computed-auto coercion at the root,
not a band-aid) + dropping `block:'nearest'` from the recentre. The corrected mechanism STRENGTHENS
the gate (the RED is spec-derivable, not incidental) and adds one cure obligation: fix the false
spec comment at `overflow.css:65-66` when W2 lands (sidecar FLIP-2, a premise precision the lead
should fold into the gate text). Coverage: **EXACT**.

**VERDICT (vs opus row).** RATIFIED on owner/gate/aggravators; OPUS-WRONG on the causal mechanism —
"overflow-y: visible leaves the block axis open" is not a scroll mechanism, and the FITS branch
cannot scroll at all; the visible→auto computed coercion on the overflow branch is the defect, and
the source comment's opposite claim ("clip") is the root post-mortem. Appendable as Δ-F27-1 below.
Crosswalk: LANDED; AGREE.

---

## F28 — these blurs are inconsistent; ensure this is intentional

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:40`): *"These blurs are inconsistent — ensure this
is intentional."* Screenshot: `../../feedback/F28-blur-inconsistency.png`.

**ISOLATION (re-proven this seat).** The image is the springs page's control row: a `Register`
label over a `smooth` Select, then `▷ Play` and `Reset` buttons. The Select reads flat-translucent;
the buttons carry a soft outer glow/halo bloom. Statics, all re-verified: `StoryPlayButton`
defaults `emphasis: "secondary"` (`demo/chassis/play/StoryPlayButton.vue:34`); Reset is a default
`<Button>` whose default emphasis is ALSO `secondary` (`Button.vue:35`); secondary buttons read
`--glass-blur-resting` = 7px (`button/styles.css:47-50`); the form family reads
`--control-surface-blur: var(--glass-blur-quiet)` = 7px. So ALL THREE controls in the F28 frame sit
at the SAME 7px backdrop blur — the deep 16px rung (`button/styles.css:40-43`) is unreachable here
because NO primary button is in frame. The perceived inconsistency is therefore NOT blur radius; it
is the button glass-atom's capsule-fill + specular/glow bloom vs the Select's flat control surface.
This statically RESOLVES the fork OPEN-2d poses ("primary intentional-deep vs ordinary bug"): both
buttons are ordinary — the remaining live-π question is only whether the ordinary-button bloom vs
flat-select divergence is intentional emphasis grammar or a bug. That perceptual judgment is
**LIVE-DEFER** (the π the wave already owes).

**TARGET.**
- Demo site (the exact F28 host): `demo/stories/motion/springs.vue:229-254` (`Label` `:231`,
  `Select` `:232-245`, `StoryPlayButton` `:248`, `Button` Reset `:249`).
- Material facts: `tokens/glass.css:138-153` (6 rung names → 4 distinct radii),
  `tokens/light-dark.css:36` (the 2dppx overlay arm), `button/styles.css:40-50`,
  `--control-surface-blur` (`tokens/glass.css:407`).

**POST-MORTEM.** A named-but-colliding ladder plus a glow-vs-blur ambiguity. The `--glass-blur-*`
ladder's 6-names/4-values collision + the device-dependent 2dppx overlay arm is the GENERAL
F28/F48 "blurs are inconsistent" mechanism; for THIS frame the specific divergence is the atom
bloom, not the radius. The band's earlier working hypothesis ("plausibly the deep-tier primary vs
the quiet select — Play?") assumed a primary button the springs triad does not contain.

**REDRESS.** Owned by `BJ.W-BLUR-LADDER` (BAND-MATERIAL W2, `../../waves/BAND-MATERIAL.md:170-300`)
— the ladder ruling + DPI-arm kill + arm (D) "one material per role". The original dossier's
residue was ADOPTED as **J6** and is APPLIED at HEAD: `OPEN-2d` is re-aimed (`:258-262,291`) to
route `/motion/springs` (not `/foundations`) with the axis = the button glass-atom glow/shadow-
bloom vs the flat Select, "the two blur radii are equal at 7px — a blur-only probe measures
nothing." The residual inconsistency is DISCHARGED-BY-UNION (RU-14 R5, `1340a918`): the union
struck the superseded sentence itself — `BAND-MATERIAL.md:270` "the earlier 'plausibly the
deep-tier primary vs the quiet select' hypothesis is STRUCK (it assumed a primary button the
frame does not contain)", the fork-closed note re-stated at `:788` — so the residue fell at the
union, not at W2 execution. Coverage: **EXACT (as amended by J6)**.

**VERDICT (vs opus row).** RATIFIED — the emphasis/radius statics were independently re-verified
(including the Reset default-emphasis leg the opus row asserted without a cite; `Button.vue:35`
confirms secondary). The opus PARTIAL verdict is superseded: Δ-F28-1 was adopted (J6) and the band
carries the re-aim. Fresh evidence ADDED: OPEN-2d's primary-vs-ordinary fork is statically decided
(both ordinary); flagged the surviving stale hypothesis sentence in the band prose. Crosswalk:
LANDED; AGREE.

---

## F29 — /motion/springs redesign with better configurator support

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:41`): *"`/motion/springs` — Redesign with better
configurator support."* URL-anchored, no screenshot (the F28 PNG is captured on this route but
marks the blur ask).

**ISOLATION (re-proven this seat).** `demo/stories/motion/springs.vue` HAND-ROLLS its configurator:
a bespoke `<Select>` register picker (`:232-245`), two `<LabeledSlider>` authoring controls
(`:345-362`), a hand-built preview stage (`:257-290`), a seed-from-register chip grid + copy-stops
panel (`:415-489`). `grep -c "Configurator" springs.vue` → **0** (the born-RED holds at HEAD). It
does not consume the shipped `<Configurator>`/`studio` standard — the "needs better configurator
support" the user names.

**TARGET.**
- Demo site: `demo/stories/motion/springs.vue:224-337` (Named registers) + `:339-492` (Custom
  authoring).
- The standard to adopt: `src/components/configurator/` via the `studio` variant
  (`BJ.W-STORY-TAXONOMY` Wave 1 registers it). Cross-band note: BAND-REDUCTION's scope demotes
  `Configurator` →demo — consistent with adoption (the standard lives where the demote lands it;
  adopt-not-build stands either way).

**POST-MORTEM.** Pre-standard bespoke authorship. The springs page was written before/beside the
shared configurator standard and never migrated, carrying a full parallel implementation. No gate
asserted "configurator pages consume the standard."

**REDRESS.** Owned EXACTLY by `BJ.W-CONFIGURATOR-STD` gate **G-CFG-1** (BAND-STORY W3,
`../../waves/BAND-STORY.md:244,265`): born-RED grep-0 at HEAD; GREEN when springs renders the
configurator standard (studio variant) with a paired-π DELTA. AMEND-D-2
(`../perfection/FABLE-STORY-FRAMEWORK.md:274-280`) rules ADOPT-not-BUILD, and per **J10** the adopt
wave also carries the roominess/scale gate (container min-width + breathing room), which serves
F29's "redesign" half. The tempo page folds INTO this redesign per `ASK-REDUCTION §C4`. The broader
redesign scope (preview stage, proportion) is A10/story-framework standing scope — referenced, not
re-owned. Coverage: **EXACT**.

**VERDICT (vs opus row).** RATIFIED — born-RED re-verified; J10 roominess note ADDED; the
REDUCTION-demote cross-band consistency note ADDED. Crosswalk: LANDED; AGREE.

---

## F30 — /motion/tempo "what even is" this page

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:42`): *"`/motion/tempo` — 'What even is' this
page."* URL-anchored, no screenshot.

**ISOLATION (re-proven this seat).** `demo/stories/motion/tempo.vue` is a single-axis token demo:
a `--motion-tempo` slider (`:71-77`) co-scaling the CSS spring clocks + JS dock morph, with
dropdown/popover/dialog/dock arranged to show the shared scaling (`:86-148`). It demonstrates ONE
landed token (Q051 R4, default 1.0). Legitimate token, thin page — its purpose does not announce
itself. A taxonomy question, not a defect. (Mechanical note: the page writes `--motion-tempo` onto
`document.documentElement` while mounted and restores on unmount, `:47-53` — correct hygiene, but a
global side effect a fold into the springs configurator would scope naturally.)

**TARGET.**
- Demo site: `demo/stories/motion/tempo.vue` (whole page).
- Fold target: the springs configurator page (F29's `BJ.W-CONFIGURATOR-STD` redesign).
- Token (survives regardless): `--motion-tempo`.

**POST-MORTEM.** A real token given a page heavier than it warrants — the story taxonomy
over-provisioned a token demo with a standalone route. A taxonomy weighting call, not a code fault.

**REDRESS.** Owned by `ASK-REDUCTION §C4` (`../../ASK-REDUCTION.md:209-221`, roll-up `:267`):
keep / fold-into-springs / delete; recommendation on record: **fold into springs (F29)**. Per the
**C-E ruling** (`JUDGE.md`): the ASK asks only about the PAGE — the `--motion-tempo` token is
explicitly out of scope, so the user is not asked to rule on a load-bearing token. Coverage:
**EXACT (as a decision)**.

**VERDICT (vs opus row).** RATIFIED — C-E scope ruling ADDED; the mount-scoped root-write
observation ADDED as fold rationale. Crosswalk: ASK; AGREE.

---

## Coverage summary (REFABLE-corrected)

| Row | ask (compressed) | terminal owner | coverage | verdict vs opus |
|-----|------------------|----------------|----------|-----------------|
| F21 | scroll-progress rim broken | `BJ.W-PROGRESS-RIM-REPLACE` (FEEDBACK-MOTION W2, codex law 12) | **EXACT** | RATIFIED + segment-arm evidence |
| F22 | animated loop jittery/mis-eased | `BJ.W-FEEDBACK-MOTION-TUNE` (FEEDBACK-MOTION W3, J7 applied) | **EXACT (as amended)** | RATIFIED + wrap-rewind evidence |
| F23 | slider/progress track DRY | `BJ.W-TRACK-DRY` (MATERIAL W4, C-C) | **EXACT-pending-ratification (RU-14 R5—both registers chartered by the union `1340a918`; J12 ratify-and-close owed, ledger C5)** | RATIFIED; 2 corrections (valueDomain credit, J1 re-route) |
| F24 | skeleton animation too slow | `BJ.W-FEEDBACK-MOTION-TUNE` (FEEDBACK-MOTION W3) | **EXACT on owner; gate shape corrected** | **OPUS-WRONG** (5s via token, wrong-rung bind — not a 2.4s local literal) |
| F25 | confirm-dialog vs normal dialog | `ASK §C2` (fold landed; C-A default: fold the story) | **EXACT (decision)** | RATIFIED + C-A; 2 evidence corrections (fold-commit = c368ccbc; live relay census = 6, value.js docs-only) |
| F26 | completion-seal overfit/"speedtest" | `BJ.W-REDUCE-CROSSREPO-GATED` + `ASK §A2` (D-3) | **EXACT (decision)** | RATIFIED (census re-proven first-hand) |
| F27 | why vertical scroll in dock | `GF-DOCK §4.1 W2 G-NO-BLOCK-SCROLL` | **EXACT** | RATIFIED owner/gate; **mechanism corrected** (visible→auto coercion; false spec comment) |
| F28 | blurs inconsistent | `BJ.W-BLUR-LADDER` (MATERIAL W2, OPEN-2d re-aimed per J6) | **EXACT (as amended)** | RATIFIED + fork statically decided |
| F29 | springs configurator support | `BJ.W-CONFIGURATOR-STD` G-CFG-1 (+ AMEND-D-2, J10) | **EXACT** | RATIFIED + J10 |
| F30 | tempo "what even is" | `ASK §C4` (fold into springs; C-E scope) | **EXACT (decision)** | RATIFIED + C-E |

**Totals vs the ORIGINAL opus dossier: RATIFIED 8 / OPUS-WRONG 2 (F24 wholesale; F27 mechanism) /
owner moved 0.** First-union fresh findings: 6 (F21 segment arm · F22 wrap-rewind · F23
valueDomain+marks census · F24 5s/wrong-rung · F27 computed-auto + false comment · F28 static fork
resolution). LIVE-DEFER: 2 (F27 scrollable-delta source; F28 bloom-intentionality π).

**TRUE-RUN second pass (this seat, HEAD ced045d1): 9 rows RATIFIED clean / 1 row corrected at
evidence grain (F25 — fold-commit c368ccbc not 490cc46e; live relay census 6 not 8, value.js pair
docs-only) / 0 owners moved / 3 stale cites refreshed (codex law 12 → `:28`; GF-DOCK §4.1/W2/gate →
`:104-111`/`:319`/`:357` — the W2/gate pins re-refreshed RU-14 R3 against the 117b7f12 rewrite).** The F28 all-7px statics — the one claim this seat's own ANEW
initially contradicted (an 11px capsule-cascade theory) — re-proved TRUE at
`button/styles.css:47-50` (`[data-emphasis="secondary"]` (0,2,0) pins `--glass-blur-resting` over
the capsule rung); J6 stands doubly verified.

## Appendable deltas

**Δ-F22-1 — ADOPTED as J7, applied at HEAD** (`BAND-FEEDBACK-MOTION.md:79-84`). Closed.

**Δ-F28-1 — ADOPTED as J6, applied at HEAD** (re-anchored: the re-aimed OPEN-2d now at
`BAND-MATERIAL.md:301`/`:336`). Closed; the former W2-execution residue (strike the superseded
"plausibly deep-tier primary" sentence) is DISCHARGED-BY-UNION (RU-14 R5, `1340a918`) — the
union struck it at `:270`, re-stated fork-closed at `:788`.

**Δ-F24-1 (NEW — the skeleton period is 5s via a wrong-rung token bind, not a 2.4s local
literal). [RU-14 R5: APPLIED-BY-UNION at `1340a918` — W3 carries "Δ-F24-1 — the corrected read,
replacing the prior gate" (`BAND-FEEDBACK-MOTION.md:134`) + the period-VALUE/RUNG-BINDING/
driver-shape gates (`:158-162`), near-verbatim to this delta; J12 ratifies-and-closes per ledger
C5, never re-applies.]** In `BJ.W-FEEDBACK-MOTION-TUNE` (W3): `Skeleton.vue:51-57` resolves
`var(--duration-shimmer, 2.4s)` to **5s** (`scheme-motion.css:107`); the ladder doc
(`literals.css:24-34`) already assigns skeleton the FAST 3s rung. Gate (b) ("values live in the
token layer") is letter-satisfied at HEAD while the defect persists — replace it for F24 with (i) a
period-VALUE assertion against the retuned canon rung and (ii) a rung-BINDING assertion
(skeleton-scan reads a skeleton/fast clock, not the brand-metal sweep clock). Retire the dead 2.4s
fallback with the re-bind.

**Δ-F27-1 (NEW — name the real scroll mechanism + fix the false spec comment).** In GF-DOCK W2
(`G-NO-BLOCK-SCROLL`): the horizontal rail's block scroll axis is created by the CSS-computed
visible→**auto** coercion on the overflow branch (`overflow.css:62-105`) — the FITS branch cannot
scroll; and the comment at `overflow.css:65-66` asserting the cross axis computes "to a clip" is
factually wrong (it computes to auto) and is the misreading that shipped the defect. W2's
`overflow-y: clip` cure stands and gains its rationale; the comment is corrected in the same cut.
The live scrollable-delta census (which content overflows, by how much) runs as part of the wave's
π (LIVE-DEFER here).

## JUDGE-2 docket (appended RU-14, 2026-07-18)

Both of this range's charter flips aged un-judged through the RU-05/RU-07/RU-09 unions; the
COMMITTED RU-03/04 nine-band union (`1340a918`) has since consumed one of them plus the F23
re-open (stamped RU-14 R5). Docketed for the consolidated JUDGE-2 pass (full ten-item docket:
`DOSSIER-F11-F20.md` §JUDGE-2 docket; rows 8-10 seated RU-14 R3):

- **D2-5 (Δ-F24-1 / sidecar FLIP-1) — CONSUMED-BY-UNION (RU-14 R5, `1340a918`).** W3 now carries
  "Δ-F24-1 — the corrected read, replacing the prior gate" (`BAND-FEEDBACK-MOTION.md:134`) + the
  period-VALUE/RUNG-BINDING/driver-shape gates (`:158-162`). Ledger C5 stamps the row
  DISCHARGED-BY-UNION — J12 ratifies-and-closes, never re-applies.
- **D2-6 (Δ-F27-1 / sidecar FLIP-2) — LIVE.** GF-DOCK-PASS3 §4.1's RED rationale still cites the
  block-overflow measure, not the visible→auto coercion, and the false `overflow.css:65-66` "clip"
  comment still stands in source—both re-verified at HEAD (117b7f12) and unchanged since.
- **D2-F23 (consolidated as row 8 of the ten, RU-14 R3) — CONSUMED-BY-UNION (RU-14 R5,
  `1340a918`).** The union charters both registers into W4 and reconciles the path split (see the
  F23 COVERAGE paragraph); the disposition folds into the consolidated row-8 stamp — J12
  ratify-and-close only.

## RU-14 R5 re-anchor sweep (2026-07-18, vs the committed union `1340a918`)

The nine-band rewrite moved this dossier's `waves/BAND-*` line pins; substance survives at the
new anchors (each re-verified on disk this round). Band cites are hereafter read by wave/gate
name + section anchor (the G-COPY-2 rule); current re-anchors, kept where load-bearing:

- F21: `BAND-FEEDBACK-MOTION:49-63/:60-61/:56-58` → W2 `:91+`/the partial-arc gate `:119`/the
  phantom-bank note `:102`.
- F22: `BAND-FEEDBACK-MOTION:65-84` → W3 `:126+`; the J7 driver re-home `:79-84` → `:141`.
- F23: `BAND-MATERIAL:389-443` → W4 `:460+` (see the R5 COVERAGE paragraph).
- F26: `BAND-REDUCTION:392-396/:363-418` → `:452-456`/`:416+` (census upgraded by the union:
  + the atlas `seal-compositor` vite plugin).
- F28: `BAND-MATERIAL:170-300` → W2 `:212+`; OPEN-2d `:258-262,:291` → `:301`/`:336`.
- F29: `BAND-STORY:244,265` → the G-CFG-1 gate row `:321`.
