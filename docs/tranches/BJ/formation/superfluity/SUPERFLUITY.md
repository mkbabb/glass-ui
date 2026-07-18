# BJ — SUPERFLUITY CONFRONTATION — synthesis

The user's F04 order was a grand audit of ALL components with questions in reduction relayed
back. This file is the confrontation half: eleven adjudicators each took one flagged
near-duplicate or overfit pair, read the code and the consumer census on disk at HEAD, and
returned a verdict. This synthesis collates them into one table, states each verdict against its
standing ruling, surfaces every contradiction the lead judge must arbitrate, and hands each row
to the user as a sharpened ASK with a real recommendation attached.

Register note: every claim below is the adjudicator's, cited to their evidence. Where a verdict
disputes a standing ruling or another verdict, it is said plainly in the CONTRADICTIONS section —
nothing is smoothed over.

---

## 1. Verdict table

| Row | Verdict | Target | Confidence | One-line |
|---|---|---|---|---|
| F25-confirm-dialog | MERGE-INTO | dialog (component already merged; delete the duplicate story) | high | Never a distinct component — a Dialog preset, merged at 7.0.0; residue is a duplicate demo page to delete + an owed 8-consumer relay. |
| F33-deck-carousel | KEEP-DISTINCT | — | high | Headless nav engine vs embla visual scroller — zero measured similarity; the only shared thing (dots) already folded onto pager-dots; cut the vestigial DeckPager.vue. |
| F18-chassis-metric | KEEP-DISTINCT | — | high | Structurally-unique app-shell spine (muster ×5 + speedtest ×4) and four distinct-DOM-role readouts with logic already extracted; census-refusal is merit-based, not a compat shield. |
| F23-track-family | COLLAPSE-FAMILY | one _shared/track.css well register (Slider + Progress) | high | Real MATERIAL DRY: two token vocabularies spell one recessed well; fill already shared. Keep components distinct; keep the timeline out of W4 (W5 owns it); rename off the colliding glass-track. |
| F30-tempo | MERGE-INTO | springs.vue (F29) — PAGE half only | high | Two things: the load-bearing --motion-tempo one-clock token (KEEP verbatim) and a thin demo page (fold into the springs configurator as a global time knob). |
| F32-F42-scroll-systems | COLLAPSE-FAMILY | 9-member survivor set on one reader core; one /motion/scroll page | high | Not many systems — one reader spine + two orthogonal keeps + a ToC that consumes the core; keep 9 real-consumer survivors, DEMOTE/DELETE 6 demo-only-or-dead exports, fold reveal into scroll. |
| F16-timeline | COLLAPSE-FAMILY | continuous → the one Timeline; delete scrubber + segmented; flatten dispatcher | high | Scrubber is a Slider in disguise, segmented is a consumerless re-render; only continuous has a real consumer (speedtest, thin slice) — collapse 5→1 and shed retired #detail/popover weight. |
| F26-completion-seal | KEEP-DISTINCT | — | high | Not a duplicate of anything (absent from all 310 graph pairs) and NOT speedtest-overfit — speedtest imports it zero times; real census sci-report ×2 + atlas ×2. F26's premise is a verified factual error. |
| F08-aurora-presets | COLLAPSE-FAMILY | reduced 10-preset register BOUND to W1-W4 real-body authorship | high | Two complaints: the preset-skin cut (correct) and the medium-body collapse — on WGSL oil/vangogh/oil-pastel/kuwahara are one byte-identical body; cut presets without authoring bodies leaves the duplication the user named. |
| GRAPH-pulse-statusdot | KEEP-DISTINCT | — | high | DRY already banked at _shared/FeedbackMark.vue; two ~15-line typed registers with disjoint state enums; merging regresses type safety and breaks 7 sites across 3 repos for zero dedup gain. |
| GRAPH-dialog-drawer | KEEP-DISTINCT | — | high | Two genuinely different interaction models over a shared reka substrate; drawer's 492-line drag/detent engine is load-bearing. The ONE real dup is the ~40-60-line scene-staging substrate — bind it as a MATERIAL W3 deliverable, do not merge the components. |

Tally: 5 KEEP-DISTINCT (F33, F18, F26, pulse/statusdot, dialog/drawer), 4 COLLAPSE-FAMILY (F23, F32-F42, F16, F08), 2 MERGE-INTO (F25, F30). Zero DELETE-outright, zero DEMOTE-TO-CONSUMER at the component grain. All eleven at high confidence.

---

## 2. Per-row verdicts

### F25-confirm-dialog — MERGE-INTO → dialog

**Verdict.** confirm-dialog was never a distinct component — it is a thin composition preset of
the Dialog family, already merged into /dialog at 7.0.0. Surviving API is the Dialog family only
(Dialog, DialogTrigger, DialogClose, DialogContent with surface/showClose + DismissableContentEmits,
DialogHeader, DialogTitle, DialogDescription, DialogFooter). No ConfirmDialog symbol survives;
the confirm flow is Dialog v-model:open + DialogContent :show-close=false with an
escape/interact-outside guard + header/title/description + a DialogFooter action row + a local
`confirming` ref for the loading dismiss-guard.

**Evidence.** src/components/confirm-dialog/ is absent on disk (ls: no such file), zero
confirm-dialog/ConfirmDialog refs in src/. The demoted story's own header says the imperative
promise-opener was thin — a preset over the Dialog root, not a distinct component — and the SFC
composes only first-class Dialog primitives. DialogContent.vue:42,46,68 confirms every prop/emit
the confirm story uses is first-class Dialog API. Critically, demo/stories/containers/dialog.vue:384-444
ALREADY carries a StorySection heading=Confirm preset with the identical destructive + loading
dismiss-guard flow and the prose "A consumer composition over Dialog, not a distinct component" —
so the standalone feedback page is redundant, and manifest.ts:622 already advertises "a confirm-dialog"
on /containers/dialog while manifest.ts:924 is the redundant standalone entry. Consumer truth:
/confirm-dialog is imported by muster ×1 + words ×5 + value.js-demo ×2 = 8 external sites, all
plain confirm flows.

**Standing-ruling relation: UNDERMINES (partial).** ASK-REDUCTION C2 (:171-188) and
ASSEMBLY-CROSSWALK.md:47,167 mark F25 as ASK with the component fold LANDED at 7.0.0 and two open
calls — (a) the 8-consumer family-B relay, (b) keep-or-fold the demo story. The verdict SUPPORTS
the factual finding and SUPPORTS the relay being owed, but UNDERMINES the deferral on (b): it
does not leave keep-or-fold open, it rules FOLD/DELETE the standalone story, because
dialog.vue:384-444 already carries the identical Confirm-preset section, so a second page is
duplication that perpetuates the exact confusion F25 names.

**Migration sketch.** Component merge already landed (confirm-dialog src dir deleted). Residue:
(1) DELETE demo/stories/feedback/confirm-dialog.vue + its manifest entry; if the two extra
variants (benign/archive, custom-body sign-out) are worth keeping, fold them as examples INTO the
dialog page. (2) Re-home tests/components/dialog.confirm-preset.test.ts by repointing its
ConfirmDialogStory import to the dialog story (already imported there as DialogStory). (3) File
the family-B relay for the 8 external sites — swap the imperative opener for v-model:open +
onConfirm composing Dialog + DialogContent + action-row per MIGRATION 7.0.0; each lands via a
marked addendum in its own repo's tranche.

**Flip condition.** Story-page disposition flips only if the user wants a standalone
/feedback/confirm-dialog demo retained for discoverability — but never re-introduce a distinct src
component. The merge itself would be non-lossless only if an external consumer relied on a bespoke
ConfirmDialog prop not expressible via Dialog composition; none was found.

---

### F33-deck-carousel — KEEP-DISTINCT

**Verdict.** deck is a headless navigation engine (useDeck/useDeckKeyboard/DeckCore, zero DOM,
consumed by atlas at 2 sites) and carousel is an embla-backed visual scroller — orthogonal layers.
No merge. The one genuine collapse the user's instinct points at ALREADY happened: CarouselDots
was retired onto PagerDots and DeckPager is a 49-line PagerDots wrapper. The residual actionable
is a micro-fold, not a family collapse.

**Evidence.** deck/index.ts exports a headless engine only; useDeck.ts is a pure reactive
index+progress+liveMessage core with zero DOM (embla-free, vueuse-free). DeckPager.vue is a thin
wrapper over `<PagerDots pattern="group" :ring="false">` with zero re-implementation. carousel is
an embla visual component with drag physics. carousel/index.ts:3 records CarouselDots RETIRED onto
PagerDots. The similarity matrix shows deck↔carousel EMPTY across api/style/animation/dom_topology
(zero measured similarity), and deck appears in NO ranked duplication pair (nothing clears the
composite ≥0.15 threshold). INFERENCE V10 independently cleared them as "not a template duplicate."
Consumer truth: atlas imports useDeck/DeckCore (useStageDeck.ts:2, useDeckDetent.ts:1); every
glass-ui /deck string in slides is inside a comment; NO DeckPager/useDeckKeyboard external import.
DeckPager's sole consumer is the in-repo demo (deck.vue:127).

**Standing-ruling relation: SUPPORTS + SHARPENS.** ASK-REDUCTION C1 (:148-169) recommends keep
deck as the headless engine + carousel as the visual component; collapse only the overlapping
shell, never the useDeck engine. The verdict SUPPORTS C1 and sharpens it: the overlapping shell
(the position-dot indicator) is already collapsed into pager-dots, so the only remaining shell to
fold is the now-vestigial DeckPager.vue. INFERENCE V10 concurs.

**Migration sketch.** Replace the DeckPager tag in demo/stories/motion/deck.vue:127 with a direct
`PagerDots pattern="group" :ring="false"` usage (PagerDots exposes every prop DeckPager sets),
then drop the DeckPager export — leaving /deck a purely headless package
(useDeck/useDeckKeyboard/DeckCore).

**Flip condition.** Flips toward a real collapse only if atlas (or another external consumer) is
shown to import a Carousel-shaped VISUAL surface from /deck — today it imports only the headless
core. Conversely, if the external useDeck consumer vanished, deck-the-engine becomes a
DEMOTE-TO-CONSUMER(atlas) candidate; the census confirms it does not.

---

### F18-chassis-metric — KEEP-DISTINCT

**Verdict.** Neither party is superfluous or a near-exact duplicate on the merits.
instrument-chassis is the structurally-unique app-shell spine of two external apps; the four
/metric symbols are distinct-DOM-role readouts whose shared logic and CSS are already extracted.
Keep both. The only genuine residue is a ~15-line reading-block template repeated across the three
readout SFCs — a shared-internal-partial cleanup, never a cut, and never a variant-prop
God-component collapse.

**Evidence.** instrument-chassis has NO cross-component similarity above 0.27 (structurally
unique); the high metric↔metric-row 0.85 is API-only (shared MetricTextProps), dom/style only
0.50-0.64; instrument-chassis↔metric/metric-row are 0.25/0.27 "Type-4 role-synonym," none flagged
Type-1 clone. Consumer census on disk: chassis is muster's App.vue shell + 4 more files (×5) and
speedtest App.vue hoisted above RouterView + 3 more (×4), both confirmed on disk. /metric-cell +
/metric-stack subpaths were REMOVED and a single /metric ADDED at 7.0.0 — the subpath reduction
already happened. Shared machinery is already DRY: coalesce-metric.ts + `:where(.metric,.metric-cell,.metric-row)`
CSS. The internal story composes chassis (sleeve) WITH Metric/MetricStack/MetricRow/MetricCell
(readouts inside) — complementary roles, refuting the Type-4 role-synonym false-positive.

**Standing-ruling relation: SUPPORTS + SHARPENS.** CHRONIC-ADJUDICATION UF-K1 (:51-54) routes the
third-asked removal to the BJ ASK with a census that refuses via a costed break; R16/R12 confirm
the metric-badge deletion + compose-/metric successor and the ≥2-evidence keep test. The verdict
SUPPORTS that refusal and SHARPENS it: the "no" is merit-based, not a backwards-compat shield
(which the no-backwards-compat + consumer-updates rulings forbid). Chassis is the
structurally-unique spine of two live apps; the /metric four are distinct-DOM-role readouts whose
shared machinery is already extracted and whose subpaths were just consolidated.

**Migration sketch.** None at the component grain. Optional internal cleanup: extract the ~15-line
reading-block template shared across the three readout SFCs into a shared internal partial.

**Flip condition.** Chassis flips to DEMOTE-TO-CONSUMER(speedtest) only if muster stops consuming
it (today ×5). The /metric family flips to partial DELETE only if a full-repo census shows one
readout variant has zero real consumers. Neither holds.

---

### F23-track-family — COLLAPSE-FAMILY → one _shared/track.css well register

**Verdict.** A real MATERIAL DRY, not a component merge. Slider + Progress re-spell one recessed
pill-track well in two token vocabularies while already sharing the FILL via glass-liquid-fill —
so collapse the track half onto one _shared/track.css register (a --track-bg/--track-height class,
sibling to the existing glass-liquid-fill register). Components stay distinct. Confirmed parties:
Slider .slider-track + Progress .progress-rail. Timeline .timeline-rail is a separate register
owned by the W5 ground-up redesign; scroll-progress-rim + switch KEEP-DISTINCT.

**Evidence.** Slider.vue:286-293 (.slider-track --slider-track-bg) + Progress.vue:94-102
(.progress-rail --progress-track), both already composing glass-liquid-fill for the fill.
liquid-fill.css is a shared FILL register already. duplication-candidates.md:185 scores
progress↔slider 0.18 "weak/coincidental" — the graph confirms a MATERIAL fold, not a component
merge. Do NOT mint a global @utility glass-track: glass-track is a LIVE class on
ScrubberTimeline.vue:209 and glass-fill is both a live class and an existing @utility
(surfaces.css:32) — a global would leak the well recipe onto the scrubber; use a distinct name
(glass-track-well).

**Standing-ruling relation: SUPPORTS the direction, UNDERMINES the "EXACT" claim.**
DOSSIER-F21-F30.md:127-160 rules W4 coverage EXACT / AGREE-LANDED; ASSEMBLY-CROSSWALK.md:45 marks
F23 LANDED to BJ.W-TRACK-DRY. The verdict SUPPORTS the DRY direction but UNDERMINES the EXACT claim
and the proposed API shape: W4 mislabels ContinuousRail as the scrubber, misses the timeline's own
shared .timeline-rail register + the real ScrubberTimeline, its global @utility glass-track
collides with ScrubberTimeline's live .glass-track class, and it couples a timeline SFC into the
fold while W5 is concurrently ground-up-redesigning (and maybe relocating) the whole timeline.

**Migration sketch.** Slider + Progress repoint .slider-track/.progress-rail onto the well
register; --slider-track-bg/--progress-track/--progress-track-on-glass collapse to --track-bg
(clean break, no aliases). No external consumer break — those are internal defaults; consumer FILL
knobs (--slider-range-*/--progress-fill) are untouched. Timeline SFCs untouched — W5's redesign
owns whether they adopt the register or relocate to speedtest.

**Flip condition.** If W5 rules timeline STAYS in-library AND adopts the shared register,
ContinuousRail + ScrubberTimeline rejoin as ≥2 more consumers (widen the family + reconcile the
glass-track/glass-fill names). Conversely, if only one of Slider/Progress keeps a track, the
register drops below the ≥2 overfitting bar and the verdict softens to KEEP-DISTINCT (inline the
material).

---

### F30-tempo — MERGE-INTO → springs.vue (PAGE half only)

**Verdict.** tempo is TWO things. The library half — @property --motion-tempo + the motionTempo()
reader — is the load-bearing one-clock TIME authority under 7 CSS spring readers + 4 JS engines,
NOT superfluous, KEEP verbatim. The demo half — a thin single-axis page — is what "what even is
this page" actually targets; fold it into the F29 springs configurator as a global time knob and
remove the standalone /motion/tempo route.

**Evidence.** demo/stories/motion/tempo.vue is a thin single-axis demo page with zero consumers.
The token co-scales all 7 CSS spring -duration readers (scheme-spring.css:146-152) plus draw-in.css
+ btn.css, AND 4 JS engines (useSpring:119, useElementMorph:355, useDrawerSnap:224,
useDockSpring:100) via response *= tempo. It is the public :root{--motion-tempo:x} "options for
longer" knob with 11+ live library consumers.

**Standing-ruling relation: SUPPORTS + SHARPENS.** ASK-REDUCTION C4 (:209-221) and DOSSIER-F21-F30
(:445-489) both recommend "fold into springs (F29)"; BAND-STORY:459 + CONFIGURATOR-STD own the
fold home. The verdict SUPPORTS this for the page half and SHARPENS it: the facility half was
never reducible (verified load-bearing one-clock authority), so the unified ASK should present ONLY
the page as in play, fold recommended over delete, NOT the token. The prior "routed to ASK" fence
over-generalized by leaving the facility ambiguously in scope.

**Migration sketch.** Trivial — tempo.vue has zero src/external consumers. Fold its slider +
co-scale demo into the F29 springs configurator as a global time knob, drop the /motion/tempo route
from the story roster. The token stays; no consumer migration for the facility at all.

**Flip condition.** Page flips MERGE→DELETE if the F29 configurator offers no natural surface for a
global time knob or the co-scale reads redundant beside the spring presets (token stays either
way). Facility flips off KEEP-DISTINCT only if the entire one-clock CSS==JS co-scale architecture
is abandoned — nothing suggests it.

---

### F32-F42-scroll-systems — COLLAPSE-FAMILY → 9-member survivor set on one reader core

**Verdict.** There are not many scroll systems — there is ONE reader spine (createScrollReader →
useScrollTrigger → chrome/scene/pin) plus two orthogonal keeps (fading-scroll edge-feather,
infinite-scroll sentinel) and the ToC tracker that already consumes the core; the apparent sprawl
is surface plurality, not duplicate mechanisms. Keep the 9 real-consumer survivors, DEMOTE/DELETE
the 6 demo-only-or-dead exports (useScrollPin, useScrollScene, useStagger, useStaggerReveal,
useBloomUp, useLiquidReveal), and fold /motion/reveal into a single /motion/scroll page.

**Evidence.** scrollReader.ts:80 is the one rAF-coalesced listener core, composed by
useScrollTrigger/useScrollChrome/useScrollScene/useScrollTracker. Real consumers: CardHeader.vue:32
(useScrollTrigger), useDockSearch.ts:276 (useScrollChrome), useAurora.ts:169 (useScrollProgress),
fading-scroll confirmed multi-external (keyframes.js + atlas/speedtest/value.js),
useScrollTracker.ts (ToC composes createScrollReader). Dead/demo-only: useScrollPin +
useScrollScene are on NO public barrel (demo-only substrate); motion/core/index.ts:16-18 ASSERTS
useStagger has external consumers but REGISTRY.md:79 flags that claim unverified and grep shows
zero live callers; useBloomUp exported but zero live callers; useLiquidReveal is a FLIP morph (not
scroll), only live caller is demo reveal.vue:41. duplication-candidates.md:26,283-316 — scroll/reveal
pairs are all Type-2 isomorph or "weak/coincidental," no true code-duplication merge: the
superfluity is SURFACE PLURALITY, not copy-paste twins.

**Standing-ruling relation: SUPPORTS the thrust, UNDERMINES the deferral.** ASK-REDUCTION §C3
(:190-207) rules consolidate to the ≥2-consumer keeps, "likely collapse reveal+scroll into one
page," exact merge shape reserved to the user as a design-call ASK. The verdict SUPPORTS the
consolidation direction and the two-page collapse, but UNDERMINES the deferral: the corrected Q060
census + grep resolve the full kill/keep table the ruling deemed unsettleable, so §C3's "design
call" abstention should be replaced by this ratifiable position.

**Migration sketch.** useScrollPin + useScrollScene are on no barrel — relocate into demo/ or
delete the spring-pin showcase (zero-consumer move). useStagger/useBloomUp have zero in-repo
callers and unverified external claims — delete outright. useStaggerReveal's only demonstration
already uses the CSS [data-scroll-reveal] recipe, so removing the composable is a no-op there;
delete unless a sibling file:line surfaces at adopt (then relay via a marked addendum).
useLiquidReveal moves to the morph family/demo. The reader-spine, fading-scroll, infinite-scroll
and sidebar-ToC consumers are untouched. Demo: delete /motion/reveal.vue, absorb its v-reveal
stagger as one StorySection in /motion/scroll.vue, relocate the useLiquidReveal bloom into the
morph demo — net one /motion/scroll page, discharging both F32 and F42.

**Flip condition.** A concrete sibling-repo file:line for useStaggerReveal, useStagger,
useTextHighlight, or useLiquidReveal (asserted in ASK-REDUCTION:197 but with no corroborating
file:line in the corrected Q060 census) moves that specific symbol from DELETE/DEMOTE to
KEEP-as-consumer-relay. Nothing flips the grep-proven reader-spine / fading-scroll / infinite-scroll
/ ToC keeps, nor the pin/scene demotion.

---

### F16-timeline — COLLAPSE-FAMILY → continuous is the one Timeline

**Verdict.** Collapse the five-variant timeline family to ONE continuous phased-progress rail. The
scrubber is a Slider in disguise (role=slider, 0..1 modelValue, demo-only consumer) and the
segmented is a consumerless second-render of the identical segment data — both overfit; only
continuous has a real consumer. Even that consumer (speedtest) drives a thin slice, so the redesign
also sheds the retired #detail/popover machinery and flattens the GlassTimeline dispatcher into a
single default export. Surviving API: one Timeline with segments / current-segment-key /
aria-label props + click event + the five cascade knobs speedtest drives; no variant prop.

**Evidence.** ScrubberTimeline.vue:46-232 is a role=slider 0..1 modelValue scrubber (a Slider; the
library already ships Slider.vue at 651 LOC); its only consumers are fourier-field.vue:363 +
timeline.vue:91 (demo scrub-transport, zero external). SegmentedTimeline.vue:61-104 renders N flex
gradient bands over the same TimelineSegment[]; only consumer is the demo. speedtest
PhaseTimeline.vue:36-42 uses ONLY `<GlassTimeline variant=continuous>`, retired #detail, sets
--timeline-continuous-height:0, paints its own ::after bar. ContinuousTimeline.vue:122-152's
hoveredKey/effectiveSegment/detailSource feed only the #detail slot the sole consumer retired =
dead weight. ContinuousMarkers.vue re-declares a .segmented-dot recipe its own comment calls the
same base as SegmentedTimeline — a drifted near-duplicate. component-graph treats timeline as a
single isolated node (no cross-family pair ≥0.15): the superfluity is intra-family (5 variants
under one dispatcher), not cross-component.

**Standing-ruling relation: SUPPORTS + fills the deferred blank.** BAND-REDUCTION Wave 5
(BJ.W-REDUCE-TIMELINE) rules F16 a ground-up redesign not a prop-diet, records the single-external-consumer
fact, binds DAG amendment A2 (~1500 LOC scope), but explicitly DEFERS the shape and leaves
keep-and-redesign vs relocate-to-speedtest OPEN. The verdict SUPPORTS every one of those facts and
supplies the shape the stub deferred: the consolidation is 5-to-1 onto continuous. It does not
re-open anything; it converges on the deferred blank.

**Migration sketch.** The sole consumer is speedtest PhaseTimeline.vue, which uses
variant=continuous only. Swap GlassTimeline variant=continuous to Timeline and drop the variant
prop; every consumed prop, knob and event carries byte-identically with zero behavioral change
(the consumer already retired #detail/popover/hover at AJ-W1-a-9). One import plus one tag edit,
landed as a marked addendum in speedtest's own tranche.

**Flip condition.** Flips to DEMOTE-TO-CONSUMER if the design-loop golden proves no second
consumer emerges AND the user rules single-consumer-relocation over redesign-in-lib (F16 "redesign
from the ground up" currently reads as keep-in-lib intent). Flips toward KEEP-DISTINCT for a
variant only if a real ≥2-consumer need for the scrubber or segmented facility surfaces — none
exists on disk (both are demo-only today).

---

### F26-completion-seal — KEEP-DISTINCT

**Verdict.** completion-seal is neither a duplicate nor speedtest-overfit. It appears in zero of
the 310 graph duplication pairs (blank similarity row on every axis; HandMark is in a different
cluster with no cross-pair), and F26's "belongs only in speedtest" premise is a verified factual
error — speedtest imports it ZERO times while sci-report ×2 + atlas ×2 (two external repos, 4
sites) clear the ≥2-consumer bar. Keep it public on ./completion-seal.

**Evidence.** completion-seal absent from ALL 310 ranked S≥0.15 pairs; its similarity row is blank
across api/style/anim/dom. component-graph.json nodes[15]: in_repo_consumers 0,
external_sibling_consumers 2; subpath ./completion-seal, demo_only true; 5 props, 126 LOC.
glass-outbound Q060: sci-report CategoryHomeView.vue:4 + GalleryView.vue:19, atlas completion.ts:5
+ category.ts:2; speedtest lists it nowhere. The component is small, token-first
(--seal-ink=var(--phase-complete-color)), compositor-only draw, PRM-safe one-shot — not bloated.
It is NOT in the root barrel; exported subpath-only, the correct posture for a focal opt-in
primitive.

**Standing-ruling relation: SUPPORTS + UNDERMINES the F26 verbatim.** CHRONIC-ADJUDICATION R14
(:14-16) rules F26's inline premise FALSE (speedtest imports zero times; real census sci-report ×2
+ atlas ×2), so the inline-into-single-consumer branch is dead and the fate rides ASK-REDUCTION A2
(:53-70), which recommends a borderline KEEP. The verdict SUPPORTS R14/A2's borderline-keep and
UNDERMINES the F26 verbatim "greatly overfit; likely belongs only in speedtest," whose premise is a
verified factual error. It converts A2's "borderline" into a firm KEEP-DISTINCT for the user's ASK.

**Migration sketch.** None. If the user overrules on taste, the only lawful removal path is
retire-with-relay to sci-report + atlas (4 sites) — inline is impossible (speedtest doesn't consume
it) and demote-to-consumer would break one repo or duplicate the code into both, manufacturing the
very duplication being purged.

**Flip condition.** Flips to DELETE-with-relay only if the 4 external sites are re-verified as
dead/phantom (as the hover-card "atlas ×1" row was found to be) or both consumer repos drop the
import, taking external consumption to ≤1 — at which point A2's inline branch reopens.

---

### F08-aurora-presets — COLLAPSE-FAMILY → reduced 10-preset register BOUND to W1-W4 body authorship

**Verdict.** F08 is TWO complaints, and the 17-to-10 preset cut answers only one. The palette-skin
duplication (VIVID_SETTING_SUN, DAY9, OIL_GESTURAL, OILPASTEL_RAINBOW/OCEAN) is correctly cut; but
"crayon, oil, etc. all almost identical" is a MEDIUM-body fact — on WGSL oil/vangogh/oil-pastel/kuwahara
are byte-identical mediumKuwahara and on WebGL2 oil-pastel is a profileFor skin — so cutting
presets while the bodies collapse leaves the exact duplication the user named. Adopt the reduced
register BOUND to W1-W4 real-body authorship (one dedicated WGSL body per medium, G-MODE-DISTINCT
green), remove the applyMedium 3/5/6/7→kuwahara alias, and harden DUSK, which is still a
palette-note of SETTING_SUN.

**Evidence.** aurora-mediums.wgsl.ts:399-400 — applyMedium routes medium==3||5||6||7
(oil,vangogh,oil-pastel,kuwahara) ALL to mediumKuwahara: byte-identical renders on the WGSL primary
(crayon(4) alone has its own body). mediums.glsl.ts:493-494 — mediumOilPastel = profileFor(MEDIUM_OILPASTEL,0),
a constants-skin of mediumOil on WebGL2. presets.ts (demo):685-703 is the 17-preset register;
SETTING_SUN vs DUSK differ only by one low-chroma lilac apex stop over identical smooth medium +
near-identical nuclei/beta/warp — DUSK fails the greenfield's own G-PRESET-HONEST and the critic
already called it "a palette note." Library exports only shape + DEFAULT_AURORA_CONFIG +
PAPER_WASH_GROUND — the 17 themed presets are consumer/demo-side (presets-in-consumers), so the cut
has no external-repo consumer break.

**Standing-ruling relation: SUPPORTS + SHARPENS (no terminal ruling exists yet).** No terminal
DECIDED ruling on F08 exists in CHRONIC-ADJUDICATION / ADJUDICATION-1 / ASK-REDUCTION (the latter
carries no aurora row). The standing position is CHRONIC-ADJUDICATION:55-56 routing aurora into
GF-AURORA + REGISTRY:242-249 recording the "17 to 9-10, kill the palette skins, port real bodies to
WGSL" proposal; GF-AURORA is at pass-3/58%, not converged. The verdict SUPPORTS that direction and
SHARPENS it twice: (1) the preset cut alone does NOT answer F08 — it must be bound to W1-W4 body
authorship or the survivors still collapse; (2) DUSK is not yet tellably distinct from SETTING_SUN.

**Migration sketch.** Presets are demo-side, so the cut needs no external migration (demo updated
in-tranche). SPEEDTEST relocates to the speedtest repo as a marked addendum. Removing the WGSL
4-way kuwahara alias is internal: consumers selecting vangogh/oil-pastel/oil silently get Kuwahara
on WebGPU today; post-build they get the real body — a visual upgrade, not a breaking API change.

**Flip condition.** Flips toward DELETE (cut deeper) if a live W5 paint shows the kept medium
exemplars still fail G-MODE-DISTINCT after W1-W4 — i.e., if oil/oil-pastel/crayon/vangogh cannot be
authored tellably-distinct within the perf/module budget, delete those mediums down to {smooth,
pastel, watercolor, kuwahara, metal}+palettes rather than keep them as promises. Flips toward
KEEP-DISTINCT only if disk evidence were wrong — but the byte-identical Kuwahara alias and
profileFor skins are verified, so that arm is closed.

---

### GRAPH-pulse-statusdot — KEEP-DISTINCT

**Verdict.** The DRY collapse already happened at _shared/FeedbackMark.vue — Pulse and StatusDot
are two ~15-line typed registers over that one primitive, re-implementing zero CSS, so the graph's
0.765 composite / dom-1.00 is the wrapper shell, not duplicated visuals. Their state enums are
disjoint (liveness vs presence), and consumers confirm the split. Merging into one variant-axis
component would regress type safety and break 7 sites across 3 repos for zero dedup gain.

**Evidence.** FeedbackMark.vue owns every silhouette + color-token binding + forced-colors +
reduced-motion; neither wrapper re-implements one line. Pulse passes `motion`, default size
0.875rem (liveness); StatusDot has no motion, size 0.5rem with sm/md axis (presence). feedback.ts:
DISJOINT enums PulseState={active,idle,success,warning} vs StatusDotState={online,warning,error,unknown}
— only `warning` overlaps, so a merged union carries ~half nonsensical states per use. Consumer
truth: Pulse imported speedtest ×4, StatusDot imported slides ×1 + atlas ×2; NO consumer imports
both, each resolves from a distinct subpath. duplication-candidates.md:7 — composite 0.765 with
superset flag b⊇a, BELOW the ≥0.85 formal merge floor; INFERENCE §1a + V1 read the code and cleared
it as a Type-4 register split, ruling b⊇a an api-NAME artifact.

**Standing-ruling relation: SUPPORTS + closes an open census.** INFERENCE §1a rules pulse↔status-dot
CLEAR (register split; substructure already factored), and V1 sharpens CHRONIC-ADJUDICATION R12
(relocate-vs-keep turns on consumer count, not redundancy). The verdict SUPPORTS both and
additionally SETTLES the R12 census for pulse: 4 external speedtest sites (well past ≥2) →
first-class KEEP, not relocate.

**Migration sketch.** None.

**Flip condition.** Flips to MERGE only if the disjoint semantic domains stop being load-bearing —
a census showing pulse states used on status-dot or vice versa, or all consumers collapsing to one
repo importing one register — OR if the user explicitly rules that closed per-register type safety
is not worth two entry points and accepts the 7-site break for a single variant-axis component.

---

### GRAPH-dialog-drawer — KEEP-DISTINCT (with a bound substructure deliverable)

**Verdict.** dialog and drawer are two genuinely different interaction models over a shared reka
DialogRoot substrate (a dependency, not glass-ui duplication) — the honest api score is 0.36, the
1.0 dom/style are a forwarder-shell + shared-skin artifact, drawer's 492-line drag/detent/live-behind
engine is load-bearing external surface (speedtest + keyframes.js), and the codebase already folded
Sheet→Dialog and deliberately stopped at the documented N3 boundary. Do not merge the components.
The ONE real duplication is the ~40-60-line scene-staging substrate — bind a shared
useSceneStage/stageContext primitive as a MATERIAL W3 adopt-branch deliverable.

**Evidence.** duplication-candidates.md:8 — composite 0.63 (api 0.36, dom 1.00, style 1.00, role
0.50), disposition none, "Type-4 role-synonym (needs judge)." DialogContent.vue owns the
non-draggable side-slide (the folded Sheet) as a PAINT axis with an explicit N3 boundary comment
("the drag-dismiss gesture + detents stay Drawer's mechanism … never smuggled onto this paint
axis"). useDrawerSnap.ts:821-1226 is the 492-line pointer-drag/fling/detent interruptible-spring
engine dialog structurally lacks. The ONE real dup: dialogStageContext.ts:5-8 {wrapperEl,scrimEl}
~ drawerSnapContext.ts:712-715; Dialog.vue closest('[data-stage-wrapper]') watch ~ Drawer.vue;
DialogContent syncStage one-shot 0→1 ~ useDrawerSnap per-frame — ~40-60 duplicated lines across 2
families. Consumer truth: speedtest DashboardMapControls.vue:175 imports /drawer; keyframes.js
ControlsPaneWrapper.vue:166 + its usage census specifically want Drawer mode="live-behind" —
both components have ≥2 external consumers; the detent engine is load-bearing.

**Standing-ruling relation: SUPPORTS at component grain, UNDERMINES V8's adequacy.** INFERENCE V2
rules dialog↔drawer CLEAR/KEEP ("drawer = dialog-substrate + a snap engine"), the dom-1.0 a
reka-forwarder artifact; V8 routes the one real duplication (the scene-staging substrate) to a
BAND-MATERIAL W3 "truth-up note … a shared stageContext is the principled home IF W3 adopts." The
verdict SUPPORTS V2's KEEP-DISTINCT and SUPPORTS V8's factoring premise, but UNDERMINES V8's
adequacy-as-routed: the staging factoring is operationalized in ZERO waves (grep of
--stage-t/stageContext/scene-stag across docs/tranches/BJ/waves + formation returns empty;
BAND-MATERIAL W3 scopes ONLY the --glass-halo-* adopt/decline, never the shared-staging
extraction). That floating note is exactly the "hiding behind a fence" the user re-raised, so it is
upgraded to a bound deliverable.

**Migration sketch.** Bind a shared useSceneStage/stageContext primitive as a MATERIAL W3
adopt-branch deliverable (adopt → mint it, both consume; decline → the halo strip + stage-axis
collapse shrinks the surface and the dup evaporates). No component merge.

**Flip condition.** Flip to MERGE-INTO (drawer→dialog, as Sheet already folded) only if drawer's
distinguishing engine is retired or proven unconsumed. Currently FALSE (speedtest + keyframes.js
consume /drawer, keyframes.js specifically wants the live-behind detent sheet). If a future
greenfield deleted useDrawerSnap's engine so Drawer became a paint-only edge slide identical to
DialogContent's placement path, it would then MERGE-INTO Dialog.

---

## 3. CONTRADICTIONS — for the lead judge

These are the points where a verdict disputes a standing ruling, or where two verdicts must be
reconciled. Each needs the lead judge's arbitration before the ASK ships.

**C-A. F25 overrules the ASK-REDUCTION C2 deferral on the demo story.** C2 left "keep-or-fold the
standalone /feedback/confirm-dialog demo" open. F25 rules FOLD/DELETE it, on the ground that
dialog.vue:384-444 already carries the identical Confirm-preset section — a second page perpetuates
the exact confusion F25 names. The lead judge must decide whether the user still gets a keep/fold
choice (discoverability argument) or whether the delete recommendation ships as the default.

**C-B. F23 disputes the "EXACT / AGREE-LANDED" coverage claim in DOSSIER-F21-F30 for W4.** F23
finds W4 mislabels ContinuousRail as the scrubber, misses the timeline's own .timeline-rail
register + the real ScrubberTimeline, and — most concretely — its planned global @utility
glass-track COLLIDES with ScrubberTimeline.vue:209's LIVE .glass-track class. This is a build-time
naming defect, not a taste call: the register must be renamed (glass-track-well). The "LANDED"
status on BJ.W-TRACK-DRY is therefore premature.

**C-C. F23 and F16 both touch the timeline register — coordinate W4 and W5.** F23 explicitly
excludes the timeline from the track-DRY fold and hands it to W5 (BJ.W-REDUCE-TIMELINE). F16 IS the
W5 redesign and collapses 5 variants to 1, deleting ScrubberTimeline (the very SFC whose live
.glass-track class F23 collides with). These are consistent but sequenced: if F16 deletes
ScrubberTimeline, the glass-track collision F23 flags may evaporate — but W4 cannot assume that
ordering. The lead judge must sequence W4's register naming AFTER, or independent of, W5's
scrubber deletion, and decide whether the surviving continuous Timeline adopts the shared
track-well register (which would widen F23's family back to ≥3 consumers, per F23's own flip
condition).

**C-D. F32-F42 overrules the §C3 "design call" abstention.** §C3 reserved the exact scroll-family
merge shape to the user as an unsettleable design call. F32-F42 argues the corrected Q060 census +
grep fully resolve the kill/keep table (reader spine, fading-scroll, infinite-scroll, ToC all have
concrete consumers = KEEP; pin/scene/stagger/stagger-reveal/bloom/liquid-reveal are demo-only-or-dead
= DEMOTE/DELETE) and that the abstention should be replaced by this ratifiable position. The lead
judge must decide whether to ship the full 9-keep/6-cut table as a recommendation or keep §C3's
softer "here are the ≥2-keeps, you decide the merge" framing.

**C-E. F30 narrows the ASK scope the prior fence left open.** The prior "routed to ASK" on tempo
left both the token facility and the demo page ambiguously in scope. F30 rules the facility was
never reducible (verified one-clock authority) and only the page is in play. This is a scope
correction the lead judge should accept before the ASK is written, so the user is not asked whether
to delete a load-bearing token.

**C-F. GRAPH-dialog-drawer upgrades V8's floating note to a bound deliverable.** V8 routed the
scene-staging duplication to "MATERIAL W3 IF W3 adopts," but the verdict verifies (grep) that NO
wave operationalizes it — W3 scopes only --glass-halo-*. The lead judge must either bind the shared
useSceneStage/stageContext extraction into a real wave deliverable or accept that the ~40-60-line
duplication ships unaddressed. This is the one confirmed cross-family code duplication among the
KEEP-DISTINCT rows, so leaving it as a floating note is the "hiding behind a fence" the user
re-raised.

**C-G. F08 has no terminal ruling and its two complaints are entangled.** Unlike the other rows,
F08 rides an unconverged greenfield (GF-AURORA, 58%). The verdict warns the preset cut alone
(17→10) does NOT discharge F08 — it must be BOUND to W1-W4 real-body authorship, or the surviving
medium exemplars still render as one byte-identical Kuwahara body on WGSL. The lead judge must not
let the "preset register reduced" checkbox close F08 while the shader bodies remain aliased.

No two verdicts reach opposite dispositions on the same target — the only cross-verdict interaction
is the F23/F16 timeline sequencing (C-C). All other contradictions are verdict-vs-standing-ruling.

---

## 4. ASK-DELTA — sharpened ASK-row texts (appendable verbatim)

Each row below carries a real recommendation, so every flagged pair reaches the user as a decision,
not an open question. Append verbatim to the BJ ASK checklist.

**F25 — confirm-dialog.** The component is already merged (src/components/confirm-dialog deleted at
7.0.0; every prop/emit is first-class Dialog API). Recommendation: DELETE the redundant standalone
demo/stories/feedback/confirm-dialog.vue + its manifest entry (the /containers/dialog page already
carries the identical Confirm-preset section at lines 384-444), re-home the confirm-preset test to
the dialog story, and file the owed family-B relay for 8 external sites (muster ×1, words ×5,
value.js-demo ×2). One residual choice for you: keep a standalone /feedback/confirm-dialog demo for
discoverability, or fold its two extra variants into the dialog page? Recommendation: fold.

**F33 — deck vs carousel.** They are orthogonal (headless nav engine vs embla visual scroller;
zero measured similarity; atlas consumes the headless useDeck at 2 sites). The dot overlap you
sensed is ALREADY collapsed onto the shared pager-dots primitive. Recommendation: KEEP both
distinct; the only cut is the vestigial DeckPager.vue (zero external consumers) — replace its one
demo usage with a direct PagerDots call and drop the export, leaving /deck purely headless.

**F18 — instrument-chassis + metric.** Third-asked for removal, but the census refuses on the
merits (not on backwards-compat): chassis is the structurally-unique app-shell spine of muster ×5 +
speedtest ×4, and the four /metric symbols are distinct-DOM-role readouts whose shared logic + CSS
are already extracted (coalesce-metric.ts), with the subpaths already consolidated to one /metric
at 7.0.0. Recommendation: KEEP both. Optional internal cleanup: dedup the ~15-line reading-block
template across the three readout SFCs. Overrule only if you want to accept the costed break
(chassis removal devolves speedtest + muster to hand-rolled shells).

**F23 — slider/progress track dedup.** Real DRY confirmed: Slider + Progress spell one recessed
well in two token vocabularies while already sharing the fill via glass-liquid-fill.
Recommendation: collapse the track half onto one _shared/track.css register (components stay
distinct; clean-break the --slider-track-bg/--progress-track tokens to --track-bg). Note: the
planned global @utility glass-track collides with a LIVE .glass-track class on ScrubberTimeline —
rename to glass-track-well. Keep the timeline OUT of this fold; W5 owns it.

**F30 — tempo page.** The --motion-tempo token is the load-bearing one-clock TIME authority under 7
CSS spring readers + 4 JS engines — NOT superfluous, KEEP verbatim. Only the thin demo page is what
"what even is this page" targets. Recommendation: fold the tempo demo into the F29 springs
configurator as a global time knob and remove the standalone /motion/tempo route. No token change,
no consumer migration.

**F32/F42 — scroll vs reveal.** Not many systems — one reader spine (createScrollReader →
useScrollTrigger → chrome) + two orthogonal keeps (fading-scroll, infinite-scroll) + a ToC that
consumes the core. Recommendation: keep the 9 real-consumer survivors; DEMOTE/DELETE the 6
demo-only-or-dead exports (useScrollPin, useScrollScene, useStagger, useStaggerReveal, useBloomUp,
useLiquidReveal); fold /motion/reveal into one /motion/scroll page. One check for you: if you know a
sibling-repo consumer of useStaggerReveal/useStagger/useLiquidReveal, name it and that symbol
becomes a keep-with-relay instead of a delete.

**F16 — timeline.** Five variants under one dispatcher; only continuous has a real consumer
(speedtest, and it drives a thin slice). Recommendation: collapse 5→1 — continuous becomes the one
Timeline (no variant prop), delete ScrubberTimeline (a Slider in disguise, demo-only) and
SegmentedTimeline (consumerless), flatten the GlassTimeline dispatcher, and shed the retired
#detail/popover machinery. One choice: redesign-in-library (keeps it available for a future second
consumer) vs relocate to speedtest (single-consumer today). Recommendation: redesign-in-library,
matching your "redesign from the ground up" phrasing.

**F26 — completion-seal.** Your note ("greatly overfit; likely belongs only in speedtest") rests on
a factual error: speedtest imports it ZERO times. Real census is sci-report ×2 + atlas ×2 (two
external repos, 4 sites), and it is a duplicate of nothing (absent from all 310 graph pairs).
Recommendation: KEEP public on ./completion-seal. If you overrule on taste, the only lawful path is
retire-with-relay to sci-report + atlas — inline is impossible and demote-to-consumer would break
one repo or duplicate the code into both.

**F08 — aurora presets + mediums.** Two complaints. The palette-skin presets (VIVID_SETTING_SUN,
DAY9, OIL_GESTURAL, OILPASTEL_RAINBOW/OCEAN) are correctly cut (17→10). BUT "crayon, oil, etc. all
almost identical" is a shader-BODY fact — on WGSL oil/vangogh/oil-pastel/kuwahara all route to one
byte-identical mediumKuwahara. Recommendation: adopt the reduced register BOUND to W1-W4 real-body
authorship (one dedicated WGSL body per medium, G-MODE-DISTINCT green) and remove the 4-way alias;
also harden DUSK, still a palette-note of SETTING_SUN. Do NOT let "presets reduced" close F08 while
the bodies remain aliased. This rides GF-AURORA (58%, unconverged) — the paint verification is
owed.

**GRAPH — pulse vs status-dot.** The DRY already happened at _shared/FeedbackMark.vue; these are two
~15-line typed registers over it with disjoint state enums (liveness vs presence). Recommendation:
KEEP both distinct — merging into one variant-axis component regresses per-register type safety and
breaks 7 sites across 3 repos for zero dedup gain (the 0.765 similarity is the wrapper shell, not
duplicated visuals).

**GRAPH — dialog vs drawer.** Two different interaction models over a shared reka substrate (a
dependency, not our duplication); honest api score 0.36; drawer's 492-line drag/detent/live-behind
engine is load-bearing (speedtest + keyframes.js). Recommendation: KEEP both distinct. The ONE real
duplication is the ~40-60-line scene-staging substrate both hand-rolled — bind a shared
useSceneStage/stageContext primitive as a MATERIAL W3 adopt-branch deliverable (it is currently a
floating note no wave executes). Merging the components is wrong; extracting the substrate is right.

---

## 5. What of your noted near-exact duplication

The confrontation found that most of what looked like near-exact duplication is NOT
component-clone-level duplication — it is either already-collapsed, distinct-over-a-shared-substrate,
or living one grain below the component name. Three of your flagged pairs were already dedup'd where
it counts: confirm-dialog was merged into Dialog at 7.0.0 (the src dir is gone; it was only ever a
composition preset), pulse and status-dot are both thin typed wrappers over the single
_shared/FeedbackMark primitive with re-implemented CSS nowhere, and deck's dots were already folded
onto the shared pager-dots — so the "0.76 / 1.0 similarity" numbers are wrapper shells, not
duplicated visuals. Two more are genuinely distinct despite surface resemblance: dialog vs drawer
are two different interaction models over a shared reka dependency (drawer's 492-line drag/detent
engine is real, load-bearing surface), and instrument-chassis vs metric are a unique app-shell
spine plus four distinct-DOM-role readouts whose shared logic was already extracted. Where the real
near-exact duplication does live is exactly where your eye caught it but below the component name:
(1) MATERIAL registers re-spelled in two token vocabularies — the recessed track well across Slider
and Progress (F23), and the ~40-60-line scene-staging substrate hand-rolled in both dialog and
drawer; (2) shader BODIES that are literally aliased — aurora's oil, vangogh, oil-pastel and
kuwahara all dispatch to one byte-identical mediumKuwahara on WebGPU (F08); and (3) intra-family
variant sprawl — the timeline's five variants under one dispatcher where only one has a consumer
(F16), and the scroll/reveal surfaces where one reader spine wears many demo-only faces (F32/F42).
So the honest answer is: the duplication is real, but it is overwhelmingly material-, shader-, and
variant-level, not component-clone-level — collapse the registers, author the shader bodies, and
diet the variant families, and keep the distinct components distinct. The one place a
KEEP-DISTINCT verdict still leaves a confirmed duplicate on the floor is the dialog/drawer staging
substrate, which prior rounds routed to a wave that never picked it up — this synthesis flags it for
binding so it stops hiding behind a fence.
