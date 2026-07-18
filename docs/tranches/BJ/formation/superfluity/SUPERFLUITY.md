# BJ — SUPERFLUITY CONFRONTATION — synthesis (REFABLE redo, RU-09)

The user's F04 order was a grand audit of ALL components with questions in reduction relayed
back. This file is the confrontation half: eleven adjudicators each took one flagged
near-duplicate or overfit pair, read the code and the consumer census on disk at HEAD, and
returned a verdict. This synthesis collates them into one table, states each verdict against its
standing ruling, surfaces every contradiction the lead judge must arbitrate, and hands each row
to the user as a sharpened ASK with a real recommendation attached.

**REFABLE provenance (RU-09).** The prior synthesis was opus-begat (the settings-level
`CLAUDE_CODE_SUBAGENT_MODEL=opus` override; see `../refable/CENSUS-CLASSIFICATION.md`). Per the
REFABLE protocol the eleven rows were re-adjudicated by fresh Fable seats, each reading code and
census anew with the opus row presumed incorrect. The fresh verdicts are canonical and this file
carries them; NO opus row survived verbatim — 3 OPUS-WRONG (verdict overturned: F33, F18,
pulse/status-dot), 8 SHARPENED (direction carried, material new findings). Sidecar with the
per-row fresh-vs-opus table: `../refable/REFABLE-RU-09.md`.

**Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
claude-fable-5"). Prior run: opus via the config override.

Register note: every claim below is the adjudicator's, cited to their evidence. Where a verdict
disputes a standing ruling or another verdict, it is said plainly in the CONTRADICTIONS section —
nothing is smoothed over.

---

## 1. Verdict table

| Row | Fresh verdict | vs opus | Target | One-line |
|---|---|---|---|---|
| F25-confirm-dialog | MERGE-INTO | SHARPENED | dialog (merge LANDED at BI B28; delete the duplicate story) | Never behaviorally distinct — pure composition over Dialog primitives; residue is the duplicate demo page + a relay owed to TWO repos (words ×5, muster ×1 dynamic) — value.js already migrated. |
| F33-deck-carousel | COLLAPSE-FAMILY | OPUS-WRONG | PagerDots + useLeadTrail/usePagerWorm (the ONE metaball morph) | Primitives distinct, but the FAMILY duplicates: the deck story ships a SECOND barbell goo engine (byte-identical neck clipPath) violating the repo's own ONE-metaball doctrine; DeckPager is a zero-logic alias. |
| F18-chassis-metric | DELETE | OPUS-WRONG | src/components/instrument-chassis + metric leave glass-ui | The external "consumers" are version phantoms (3.x/4.x pins on symbols that no longer exist at 7.0.0); three incompatible contracts in three majors = an app-shell re-carved per app, not a primitive; chassis duplicates Surface's material layer. |
| F23-track-family | COLLAPSE-FAMILY | SHARPENED | src/styles/glass registers: track-well.css + value-marks.css | Two true folds, not one: the recessed pill well AND the value-mark checkpoint paint (~65 lines, missed before). Components stay distinct — a Slider/Progress merge is an ARIA category error. |
| F30-tempo | MERGE-INTO | SHARPENED | springs.vue (F29) — PAGE half only | Facility (--motion-tempo + motionTempo()) is the one-clock CSS==JS TIME authority, KEEP verbatim; springs.vue already half-teaches tempo with no knob — the fold completes the configurator. |
| F32-F42-scroll-systems | COLLAPSE-FAMILY | SHARPENED | one reader core + the morph spine; reveal family collapsed | Scroll spine not duplicated; the reveal wing is — FOUR stagger mechanisms, TWO near-identical morph adapters; plus the family's no-fourth-listener fence violated twice in its own house (useScrollProgress, useFadingScroll). |
| F16-timeline | COLLAPSE-FAMILY | SHARPENED | continuous → the one Timeline; segmented deleted; scrubber's register folds into Slider | 5→1 stands; scrubber is NOT plain-deleted — its liquid-motion register (springs, tanh squish, accent-flood) survives as Slider's transport variant; de-overfit the baked speedtest popover envelope. |
| F26-completion-seal | KEEP-DISTINCT | SHARPENED | — | F26's premise factually inverted: speedtest ×0; sci-report + atlas consume it including atlas's build-plugin (seal-compositor) — infrastructure-grade dependence. The one survivor of the KEEP roster. |
| F08-aurora-presets | COLLAPSE-FAMILY | SHARPENED | ~11-preset register BOUND to W1-W4 body authorship | Four proven duplicate clusters (candidate A/B/C trio, palette-swap trio, strokeMode pair, yellow-watercolor pair); on WGSL six painterly presets render ONE mediumKuwahara body — the preset cut alone leaves that alive. |
| PULSE-DOT | MERGE-INTO | OPUS-WRONG | StatusDot absorbs Pulse | Both are ~50-line wrappers over ONE _shared/FeedbackMark that owns 100% of the material; the delta is one motion boolean + a size — an AXIS, not a component identity; the "7-site break" is phantom (all sites already API-broken vs 7.0.0). |
| DIALOG-DRAWER | COLLAPSE-FAMILY | SHARPENED | one overlay family on the shared reka substrate; Drawer narrowed to the detented gesture sheet | Cores stay distinct (useDrawerSnap load-bearing externally), but the family duplicates wider than admitted: twin stage anchors/scrim watchers/PRM computeds, byte-identical Title/Description, and gestureless drawer arms that are Dialog placement in disguise. |

Tally: 6 COLLAPSE-FAMILY (F33, F23, F32-F42, F16, F08, dialog/drawer), 3 MERGE-INTO (F25, F30,
pulse→status-dot), 1 DELETE (F18), 1 KEEP-DISTINCT (F26). The opus round's tally —
5 KEEP-DISTINCT, zero DELETE — does not survive: three of its five keeps are overturned, a fourth
(dialog/drawer) hardens to a family collapse, and only completion-seal stands as a clean keep.

---

## 2. Per-row verdicts

### F25-confirm-dialog — MERGE-INTO → dialog (SHARPENED)

**Verdict.** ConfirmDialog was never behaviorally distinct from Dialog. The deleted source
(git c368ccbc^:src/components/custom/confirm-dialog/ConfirmDialog.vue) is pure composition over
Dialog primitives: canned title/description/footer layout, a destructive→Button-tone boolean,
emit('confirm')+close, and a 3-line loading dismiss-guard (preventDefault on
@escape-key-down/@interact-outside). No distinct material — it explicitly rebased onto
`<DialogContent surface="glass">` in BC W-DIALOG-GLASS; no distinct behavioral contract — reka
owns focus trap/ARIA/dismiss in both; every prop/emit it used is first-class DialogContent API
(src/components/dialog/DialogContent.vue:38-68). The component merge already LANDED at BI B28
(commit c368ccbc): dirs/barrels/subpath deleted at 7.0.0.

**Evidence.** Live residue confirmed on disk: demo/stories/containers/dialog.vue carries an
identical "Confirm preset" StorySection (destructive + loading dismiss-guard, prose "a consumer
composition over Dialog, not a distinct component"), making demo/stories/feedback/confirm-dialog.vue
+ manifest.ts:924 duplication; tests/components/dialog.confirm-preset.test.ts:5 imports the doomed
story. Live consumer census (sibling repos, read-only): words ×5 static imports + muster ×1
dynamic import (defineAsyncComponent, frontend/src/App.vue:68-69) of
@mkbabb/glass-ui/confirm-dialog, pinned pre-7.0.0; value.js ×0 — already migrated (its comments
mark the Glass 7 fold landed). The opus row's "8 external sites incl. value.js-demo ×2" was a
census error.

**Migration.** Survivor: the dialog family + the /containers/dialog story page. (1) DELETE
demo/stories/feedback/confirm-dialog.vue and its manifest.ts entry (~line 924); if the
benign-archive and custom-body variants earn keep, fold them as examples into dialog.vue's
existing "Confirm preset" section. (2) Repoint tests/components/dialog.confirm-preset.test.ts to
the dialog story. (3) Relay addenda per the consumer-updates ruling, owed to TWO repos only:
words ×5 (SidebarWordListItem, SidebarWordListView, WordlistDashboard, WordListView, SearchBar) +
muster ×1 (App.vue defineAsyncComponent — dynamic import, static greps miss it). Each swaps
ConfirmDialog for v-model:open + `<DialogContent surface="glass" :show-close="false">` +
escape/interact-outside loading guard + DialogFooter action row, copying value.js's
already-landed migration (value.js/demo/palettes/browser/admin/AdminUsersPanel.vue) as the
exemplar — including its caveat that ConfirmDialog's implicit auto-close on confirm must be made
explicit at the call site.

**Flip.** Flips only if an external consumer relied on a ConfirmDialog capability inexpressible
as Dialog composition — none exists; its whole API re-expresses in ~15 lines of first-class
primitives, and value.js proved the migration in production. The story-page deletion (not the
merge) flips to KEEP only if the user wants a standalone /feedback/confirm-dialog page for
discoverability; even then no src component returns.

---

### F33-deck-carousel — COLLAPSE-FAMILY (OPUS-WRONG)

**Verdict.** The /deck and /carousel PRIMITIVES are not duplicates — distinct material (deck:
175-line dependency-free headless core, zero embla/vueuse/DOM, src/components/deck/; carousel:
embla-carousel-vue physics top-to-bottom, useCarousel.ts:19), distinct behavioral contracts
(global focus-guarded keyboard paging + aria-live announcer + group/aria-current vs
widget-focused drag/snap/momentum + region/tablist/aria-selected), distinct real consumers
(atlas/src/stage/useDeckDetent.ts:1 + useStageDeck.ts:2 import useDeck/DeckCore; slides holds a
pre-lift local copy annotated for /deck adoption; carousel serves in-page multi-item scrollers).
But the FAMILY threaded through the pair — the liquid metaball-morph/dot-pager register — IS
duplicated, and that is where the user's near-exact-duplication instinct is correct. The opus
KEEP-DISTINCT stopped at the primitives and missed the family.

**Evidence.** (1) DeckPager.vue is a 47-line zero-logic alias over PagerDots pattern="group" —
the exact species (CarouselDots) already executed by clean break at carousel/index.ts:3.
(2) The deck demo ships a SECOND barbell goo engine (demo/stories/motion/deck/useDeckGoo.ts +
gooBarbellGeometry.ts + DeckGooFilter.vue + ~200 lines of goo CSS in deck.vue +
DeckGoo.private.test.ts) cloning the PagerDots worm machinery — the neck clipPath is
byte-identical (PagerDots.vue:326 ≡ DeckGooFilter.vue:26), the filter topology identical
(feGaussianBlur→feColorMatrix→feComposite atop), a parallel spring-driven bodyA/neck/bodyB
projection beside usePagerWorm/useLeadTrail. (3) It violates the repo's own doctrine —
CarouselContent.vue:4-18 records the content-scale goo cast RETIRED as a category error ("the
metaball-merge is the INDICATOR's job — the pager worm, PagerDots... the ONE metaball morph"),
which the deck story then rebuilt at slide scale. The F33 note ("the dot animations need dramatic
refinement") is operative: refinement can only land ONCE if there is ONE morph engine.

**Migration.** Survivor: PagerDots + its useLeadTrail/usePagerWorm driver (the ONE dot register,
the ONE metaball morph). (1) Retire DeckPager.vue onto direct
`<PagerDots pattern="group" :ring="false" v-model:active :count :window-fit>` — clean break, no
alias (the CarouselDots precedent); update demo/stories/motion/deck.vue:127 + deck/README.md
recipe, drop the export from deck/index.ts. /deck becomes purely headless
(useDeck/useDeckKeyboard/CONTROL_SELECTOR); atlas imports only the headless core — unaffected.
(2) Delete demo/stories/motion/deck/{useDeckGoo.ts, gooBarbellGeometry.ts, DeckGooFilter.vue},
the goo-layer markup + ~200-line goo CSS block + data-traveling wiring in deck.vue, and
tests/components/custom/deck/DeckGoo.private.test.ts; the story keeps its crisp --spring-smooth
slide transition (deck.vue:353) per the ONE-metaball doctrine. (3) Land the dramatic
dot-animation refinement once in usePagerWorm/PagerDots (--pager-dot-elongated, lead/trail
response, neck-girth curve, worm-layer opacity) — carousel, deck, and slides inherit together.
(4) Any future viewport-scale goo bridge derives from useLeadTrail as a library composable,
never a story-local spring engine. /carousel and /deck subpath exports both remain.

**Flip.** Flips back to KEEP-DISTINCT (the opus row) if the deck story's content-scale goo cast
is shown to be a user-chartered exhibit (a BD/BJ keystone spec mandating a viewport-scale
metaball distinct from the pager worm) AND its engine is re-derived from useLeadTrail — one
driver, two projections, no duplicate machinery left. Flips toward DEMOTE/DELETE of /deck itself
only if atlas drops its useDeck imports and slides' planned adoption is cancelled. Flips toward
MERGE-INTO(carousel) only if a consumer demonstrably needs embla's physical scroll as the
authority for full-viewport keyboard-paged presentation — no such consumer exists (slides pages
via per-slide state transitions, not a scroll track).

---

### F18-chassis-metric — DELETE (OPUS-WRONG)

**Verdict.** Anew census, 7.0.0 on disk: instrument-chassis + metric are consumed ONLY by their
own demo stories (demo/stories/data/instrument-chassis.vue, metric.vue) plus registry rows
(manifest.ts, dock-layer-contexts.ts, search.vue); demo/stories/compositions/chassis.vue is the
demo's StoryPage framework, not InstrumentChassis. The external "consumers" the opus keep leaned
on are version phantoms: muster pins glass-ui ^3.1.0 and imports InstrumentChassisPhase,
variant="spine"/:phase, ChassisDivider, /metric-stack, MetricBadge; speedtest pins ^4.0.1 and
imports InstrumentChassisPhase, /metric-stack, /metric-cell, /metric-badge. NONE of those
symbols or subpaths exist in 7.0.0 (index.ts exports only InstrumentChassis +
State/Proportion/Boundary/Reserve; /metric is the sole subpath; MetricBadge deleted) — both apps
face a full rewrite-on-upgrade whether or not the component stays, so consumer dependence cannot
ratify the keep (the consumer-updates ruling says precisely this).

**Evidence.** Three incompatible chassis contracts across 3.x/4.x/7.0.0 prove it is an app-shell
re-carved per app per tranche, not a stable primitive. Chassis hand-rolls its glass plate
(border/bg/shadow/backdrop-filter over --glass-bg-chassis, glass.css:268) parallel to Surface,
violating card/styles.css's own charter "Surface owns every plate material." Provenance is
speedtest-vertical (ai-w5 commit "chassis chronics retire — jitter phase + upload canon
fallback"; states = run lifecycle), and src/index.ts itself brands metric "vertical/themed
substrate." Metric/MetricCell/MetricRow are one component thrice — identical prop contract,
identical coalesceMetric leaf, verbatim value/unit/context template, differing only in wrapper;
MetricStack is a 14-line div. A deliberately "static numeric-readout family" (its README) also
sits against the breath-of-life/liquid-weight edicts while AnimatedDigit is the library's living
readout and explicitly disclaims coalesceMetric. The repo's own scrolling-text precedent
(src/index.ts) governs: ≥2-binary-consumer bar unmet on the current contract → the primitive +
subpath leave glass-ui, the consumer brings its own; clean break, no alias.

**Migration.** glass-ui: delete src/components/instrument-chassis/ and src/components/metric/
wholesale; remove ./instrument-chassis and ./metric from package.json exports + typesVersions;
delete the two demo stories and their manifest.ts/dock-layer-contexts.ts/search.vue registry
rows; prune the now-dead --glass-bg-chassis + --glass-opacity-chassis tokens
(src/styles/tokens/glass.css:268) and the "instrument-cluster chassis" comment block in
src/index.ts; reword AnimatedDigit's doc comment that references coalesceMetric. Consumers (in
THEIR tranches, at next glass-ui upgrade, per the consumer-updates ruling — their pinned 3.x/4.x
npm artifacts keep working today): speedtest + muster each inline an app-local InstrumentChassis
composed on glass-ui Surface (golden 61.8/38.2 stage/inspector grid + state tint + boundary
insets ≈ 100 lines of the current styles.css) and app-local readouts — port the 26-line
coalesceMetric and collapse Metric/MetricCell/MetricRow into one local component with a layout
variant; MetricBadge and ChassisDivider are already dead upstream, so that migration burden
exists independent of this deletion.

**Flip.** Flips to KEEP-DISTINCT only if a second binary consumer is found live on the CURRENT
7.0.0 contract (state/tone/proportion/boundaries/reserve; /metric subpath) — an npm-frozen
3.x/4.x pin does not count — AND chassis is rebased onto Surface so it stops duplicating the
material layer. In-library adoption (the demo shell or another src/ component composing
chassis/metric outside their own stories) would count as one such consumer. Metric alone flips
to COLLAPSE-FAMILY (one Metric, layout variants) rather than DELETE if a cross-vertical consumer
of the static readout emerges before the pruning lands.

---

### F23-track-family — COLLAPSE-FAMILY → shared glass registers (SHARPENED)

**Verdict.** Material collapse onto shared registers; the components themselves stay distinct —
a component merge is an ARIA category error. The prior row found one fold (the track well); the
fresh adjudication finds TWO — the well AND the value-mark checkpoint paint, which is precisely
the "same logic painted twice" the user perceived and the prior adjudication missed.

**Evidence.** (1) The "same logic" is already 2/3 DRY'd: value math shared via
_shared/valueDomain.ts (Slider.vue:14 imports resolveValueMarks; Progress.vue:4 adds
resolveValueFraction) and the fill material shared via the .glass-liquid-fill register
(src/styles/glass/liquid-fill.css, composed at Slider.vue:224 and Progress.vue:60, imported once
at glass.css:90). The "track" family member (.glass-specular-track) is already a zero-paint
alias onto the unified .glass-material mixin (glass-specular-track.css header). (2) Components
cannot merge: Slider is a form INPUT (reka SliderRoot/Track/Range/Thumb, role="slider",
multi-thumb range, touch-gate arbitration, native dock-hold, drag-velocity weight train,
spectrum+size axes, FormFieldProps) with 6+ live consumers (EasingPicker.vue:31 dogfooded,
LabeledSlider.vue, demo PresetEditor/OklchStopRow/tempo/typewriter); Progress is a passive
OUTPUT (reka ProgressRoot/Indicator, role="progressbar", indeterminate sweep, gradient lifecycle
grammar, status=error) — a merged element either announces a meter as adjustable or strips input
semantics. ScrollProgressRim shares only clamp math (conic edge rim, no capsule) — out of
family. (3) Residual TRUE duplication, foldable: the recessed pill track shell (.slider-track
Slider.vue:286-297 vs .progress-rail Progress.vue:94-102 — one well in two token vocabularies)
AND the value-mark checkpoint paint (Progress.vue:114-147 vs Slider.vue:299-330 + vertical/RTL
legs — identical --value-mark-position/-size/-color tokens, identical 0.375rem/foreground-34%
defaults, both fed by the same shared resolveValueMarks). The marks are the bigger fold
(~65 lines).

**Migration.** Survivor = the src/styles/glass register layer (the proven liquid-fill.css
pattern). (1) Mint src/styles/glass/track-well.css: .glass-track-well (knobs
--track-bg/--track-height; pill radius + overflow hidden + recessed bg) — NOT named glass-track,
which is a live scoped class on ScrubberTimeline.vue:209; Slider and Progress compose it via
template class and their --slider-track-bg/--progress-track(-on-glass) internals collapse to
--track-bg, clean break, no aliases; consumer FILL knobs (--slider-range-*, --progress-fill)
untouched. (2) Mint src/styles/glass/value-marks.css: .value-marks/.value-mark carrying the
horizontal/vertical/RTL dot legs ONCE, reading the existing --value-mark-* tokens; both
components delete their scoped copies (~65 lines) and compose the classes. (3) Timeline stays
out until the W5 ground-up redesign rules; if it stays in-library and adopts,
ContinuousRail/ScrubberTimeline widen the register family to ≥4. (4) Route F23's unadjudicated
second half — the enlarged-on-touch slider view + graduated blurring — as a Slider-owner feature
wave (the data-touch-active/data-held hooks already exist at Slider.vue:207-209); it is additive
design work, not superfluity.

**Flip.** Softens to KEEP-DISTINCT (inline the material, drop the registers) if either fold
loses the ≥2-consumer bar — e.g. BJ removes marks or the recessed track from one of
Slider/Progress. Hardens to a true single ValueTrack base + two thin wrappers only if the shared
registers come to cover >80% of both components' paint AND a real consumer needs role-switching
on one element (an interactive scrubber degrading to a progressbar); no such consumer exists
today.

---

### F30-tempo — MERGE-INTO → springs.vue (PAGE half only) (SHARPENED)

**Verdict.** motion/tempo is two artefacts. FACILITY (keep verbatim): @property --motion-tempo
(property-regs.css:378) + the unexported 41-line motionTempo() reader is the one TIME multiplier
holding CSS==JS clock parity — 7 CSS spring-duration readers (scheme-spring.css:146-152) +
sheet-animate (btn.css:85-86) + draw-in (draw-in.css:34) + 4 JS engines (useSpring.ts:119,
useElementMorph.ts:355, useDrawerSnap.ts:224, useDockSpring.ts:100), each applying tempo exactly
once at construction (verified: no compounding; useSpringPress inherits useSpring's one site).
PAGE (merge): demo/stories/motion/tempo.vue is a thin zero-consumer single-axis story, and
springs.vue ALREADY reads motionTempo() at both play sites (:102, :170) and displays the
settle×tempo=duration arithmetic (:320-323, :409-410) — it half-teaches tempo with no knob. The
fold completes the configurator rather than merely thinning the roster.

**Evidence.** Every duplication candidate dissolves: --motion-weight is MAGNITUDE (0.618
initial, PRM-zeroed, per-frame velocity-folded) — folding couples "slower" to "squishier";
aurora masterTempo()/blob config.tempo (types.ts:283) share only the word — per-frame simulation
freeze seams deliberately carved OUT of global co-scale (scheme-motion.css:97-99); --duration-*
are bases, not a rival multiplier. The reader is already off both public barrels — minimum
surface, nothing to demote.

**Migration.** Survivor: demo/stories/motion/springs.vue (F29 configurator). (1) Add a "global
time knob" section: the 0.7-1.3 slider writing --motion-tempo on document.documentElement,
carrying tempo.vue:47-53's identity-restore-on-unmount contract verbatim (never leave the app
scaled). (2) Carry the cross-register co-scale proof as one StorySection — dialog
(portaled-scrim inheritance proof) + GlassDock with :key re-mount on tempo (construction-time JS
read); dropdown/popover may thin out. (3) Delete tempo.vue, drop the /motion/tempo route from
the story roster. (4) Zero src changes, zero consumer migration: the token + reader keep
verbatim; motionTempo stays unexported.

**Flip.** Page half flips back to KEEP-DISTINCT if the fold buries the axis's actual contract —
the CROSS-REGISTER co-scale (overlays + portal inheritance + JS dock), not a preview-duration
slider; if the merged section reduces to "slider retimes two travel previews", the standalone
page was the honest surface. Facility flips off KEEP only if the one-clock CSS==JS parity
architecture is itself abandoned, collapsing the calc() readers to plain settle clocks and
deleting motionTempo.ts; or if a second global time multiplier ever appears, forcing a true
merge.

---

### F32-F42-scroll-systems — COLLAPSE-FAMILY → the reveal wing onto the scroll/morph spine (SHARPENED)

**Verdict.** The scroll side is NOT duplicated: one core (scrollReader.ts:80 createScrollReader)
is composed by useScrollTrigger (live: CardHeader.vue:32), useScrollChrome (live:
useDockSearch.ts:276), useScrollScene→useScrollPin, and sidebar/useScrollTracker.ts:237 — a
layered spine, distinct contracts (events vs collapse machine vs physics writer vs section
tracker). The other scrolling components are distinct materials: FadingScroll = edge-fade
legibility mask writing --fade-start/--fade-end (live: GlassDock, Configurator, demo shell);
InfiniteScroll = IO sentinel data contract (no scroll listener at all); ScrollProgressRim reads
NO scroll (value prop, presentational ring — 'scroll' only in name); useScrollTo is a scroll
WRITER. The real superfluity is in motion/reveal + two fence violations.

**Evidence.** (1) FOUR stagger-entrance mechanisms — vReveal (demo-used), useStagger (ZERO call
sites; its own header calls itself useStaggerReveal's 'unconditional cousin'), useStaggerReveal
(ZERO call sites; scroll-driven.css:11-14 declares [data-scroll-reveal] its replacement), and
the native CSS recipe; (2) TWO near-identical ≤20-line adapters over useElementMorph with
identical channels {opacity, blur:4} + snappy/bouncy — useLiquidReveal (demo reveal.vue only;
useDockCtaReceive mention is comment-only) vs useBloomUp (ZERO call sites; adds only the
bloomUpField tint channel + prime) — the near-exact duplication the user suspected;
(3) useTextHighlight is not a reveal, root-barrel exported, zero callers; (4) useScrollProgress
(live: useAurora.ts:169) and useFadingScroll both hand-roll their own scroll listeners despite
scrollReader.ts's header claiming the plumbing was 'factored to ONE site' — the family's
no-fourth-listener fence is violated twice inside its own house.

**Migration.** (1) DELETE useStagger + useStaggerReveal — zero callers anywhere (src, demo,
siblings: hassio-lab hits are research prose, not imports); [data-scroll-reveal] CSS recipe +
vReveal cover the entrance-stagger surface; drop their core/index.ts:15,18 barrel lines.
(2) MERGE useBloomUp INTO useLiquidReveal — survivor useLiquidReveal, relocated to morph/ (it is
a FLIP morph, not scroll); absorb field/fieldHue/fieldStrength/prime/onBloomed as options with
bloomUpField.ts as its private leaf, or drop the field channel with it if BJ's dock/dialog bloom
doesn't adopt it; delete useBloomUp; update motion/index.ts:44,62. (3) useScrollPin +
useScrollScene + the .scroll-pin/.scroll-pin-phase-* register in scroll-choreography.css move AS
A PAIR to demo/ (their only consumer is ScrollChoreographyBody.vue) — never ship the CSS
register writer-less, or it re-creates the exact parked-at-from-keyframe deadness useScrollPin's
header documents (the 7.0.0 RED-BY-ROT class). (4) useTextHighlight: relocate out of reveal/
(dom/) or DELETE on zero-consumer merit. (5) Re-seat useScrollProgress's and useFadingScroll's
fallback listeners onto createScrollReader — one reader core, fence honored; useScrollProgress
keeps its element-viewport mapping contract for the aurora JS consumer. (6) Demo: fold
/motion/reveal.vue into /motion/scroll.vue (v-reveal section) + the morph story (bloom section)
— one scroll page, discharging F32+F42. Survivors: scrollReader, useScrollTrigger,
useScrollChrome, supportsCssTimeline, useScrollProgress (re-seated), vReveal, useLiquidReveal
(in morph/), FadingScroll, InfiniteScroll, ScrollProgressRim, useScrollTracker, useScrollTo, and
the three CSS recipes.

**Flip.** A concrete sibling-repo import file:line of useStagger, useStaggerReveal, useBloomUp,
or useTextHighlight flips that symbol from DELETE/MERGE to KEEP-as-relay (consumer updates via a
marked addendum in ITS tranche, per the consumer-updates ruling). A src/ (non-demo) adopter of
the .scroll-pin register flips the pin pair from demote-to-demo back to shipped-with-writer.
Proof that aurora's scroll coupling can ride the native .scroll-progress CSS axis with no JS
read flips useScrollProgress from re-seat to DELETE. Nothing flips the grep-proven spine or the
distinct-contract keeps (FadingScroll/InfiniteScroll/ScrollProgressRim/tracker/scrollTo).

---

### F16-timeline — COLLAPSE-FAMILY → continuous is the one Timeline (SHARPENED)

**Verdict.** The family is 1 public export over 6 SFCs + a dispatcher, and the internals confirm
the user's duplication instinct. Collapse 5→1: continuous is the one Timeline; segmented
deleted; dispatcher deleted; scrubber exits the family — but NOT by plain deletion: its
liquid-motion register survives as Slider's transport variant (the sharpening over the prior
row's delete).

**Evidence.** (1) GlassTimeline.vue:32-126 is a pure v-if switch over a leaky union of three
disjoint contracts: scrubber props (modelValue/label) silently no-op under segmented/continuous
and vice versa; ariaLabel forwards only to continuous while SegmentedTimeline hardcodes
"Timeline progress" and Scrubber hardcodes "Timeline" — the poorly-defined core. (2) Segmented
is a consumerless subset of continuous: types.ts:8-9 admits "only the rendering geometry
differs"; identical TimelineSegment[] + hover/hoverEnd/click contract; zero consumers outside
demo, and the segmented demo body is a near-copy of the continuous one. (3) Acknowledged drifted
fork: ContinuousMarkers.vue:209-233 re-declares .segmented-dot ("duplicates the segmented-dot
base recipe") in gray --surface-tint-15 material while SegmentedTimeline.vue:190 went warm-glass
— two dot materials in one family despite rail comments claiming the gray recipe RETIRED;
scale-paper.css §16 still mints ~15 timeline knobs including the gray dot fill. (4) Scrubber
shares nothing with its siblings but the .timeline-rail class (imports no types.ts/geometry.ts);
it is a role=slider 0..1 transport control — wrong family. (5) README.md:12-17 documents five
exports index.ts:1-6 never ships. (6) The one external consumer (speedtest PhaseTimeline.vue)
uses only variant="continuous", collapses the rail height and paints its own bar;
geometry.ts:237-252's {label,value,description,state} popover envelope is speedtest's
PhaseDetail baked into the lib ("145.3 Mbps" in the JSDoc) — overfit confirmed.

**Migration.** (1) Promote ContinuousTimeline → Timeline.vue, the sole export of ./timeline
(segments, current-segment-key, aria-label, click + the cascade knobs speedtest drives);
Rail/Markers stay private children; fold GlassTimeline's non-scoped .timeline-rail/.timeline-cel
register into the survivor (it already owns the portal-CSS contract) and kill the drifted gray
.segmented-dot base block in Markers — one dot recipe, warm-glass. (2) DELETE SegmentedTimeline
+ its demo body; if the gap-lane aesthetic is wanted it is a `gap` presentation knob on the
survivor (--timeline-segment-gap already exists), not a component. (3) Scrubber: do NOT
plain-delete — fold its liquid-motion register (HEAD/FILL/PRESS springs, useLiquidFlex tanh
squish, accent-flood, always-visible bead, 44px halo) into Slider as the transport variant (or a
standalone Scrubber atom if Slider's reka forwarding fights the spring head); re-express demo
timeline.vue:91 + fourier-field.vue:363 on it. (4) De-overfit the popover default: slot-first,
drop the PhaseDetail envelope defaulting from geometry.ts or genericize it. (5) Prune §16 tokens
to surviving knobs; fix README to the real surface; retarget the three continuous tests at
Timeline, delete segmented rows. (6) speedtest updates `<GlassTimeline variant="continuous">` →
`<Timeline>` as a marked addendum in ITS tranche (consumer-updates ruling) — one import + one
tag edit, props/events carry as-is.

**Flip.** Segmented flips to KEEP only if a real ≥2-site consumer of the flex-gap lane emerges
that weighted regions + a gap knob cannot express (none on disk). The collapse target flips to
DEMOTE (relocate the one Timeline into speedtest) if the BJ greenfield golden proves no second
consumer AND the user rules single-consumer relocation over keep-in-lib redesign. The
scrubber-into-Slider fold flips to a standalone Scrubber component if the spring-head transport
register cannot ride reka's SliderRoot without fighting its pointer model (the known
dropped-$attrs forwarding class).

---

### F26-completion-seal — KEEP-DISTINCT (SHARPENED)

**Verdict.** The F26 charge fails on both prongs. (1) Not speedtest-overfit — the premise is
factually inverted: speedtest has ZERO references (grepped all of /Users/mkbabb/Programming/speedtest),
while TWO other external repos consume the published ./completion-seal subpath: sci-report
(CategoryHomeView.vue:4, GalleryView.vue:19, 3 render sites + :deep seal CSS at
GalleryView.vue:378) and atlas (design/recipes/completion.ts re-export + resolveCompletionSeal,
skin/category.ts type import, DashboardHero.vue render). Atlas goes further:
src/vite/seal-compositor.ts is a dedicated build plugin rewriting completion-seal.css's
@keyframes for compositor compliance, shipped in atlasCorePreset and consumed by sci-report's
vite.config.ts — build-infrastructure-grade dependence. That clears the ≥2-sites-or-exported bar
twice over. (2) Not a duplicate — distinct behavioral contract and material vs every in-library
neighbor: HandMark is seeded freehand annotation (wobble geometry, brush media, texture grain,
boil) over real text/datums; draw-in.css is the hairline/divider arrival register and itself
records CompletionSeal and HandMark as MEMBERS keeping their own recipes (draw-in.css:27-30);
timeline's dashoffset is a continuous marker line. CompletionSeal alone owns the one-shot
completion contract: data-play seam + rAF restart lifecycle (useCompletionSeal.ts), PRM
snap-to-drawn, role=status/aria-live announcement, earned-gold register
(--seal-ink=var(--phase-complete-color)), disc→ring→check composition. 126 LOC, subpath-only
(not in the root barrel) — the correct opt-in posture.

**Migration.** None — it stays. If overruled on taste, the only lawful path is
retire-with-relay: vendor CompletionSeal.vue + useCompletionSeal.ts + constants.ts + styles.css
into atlas (its design/recipes/completion.ts wrapper is the natural relay home; sci-report
already consumes atlas's vite preset), then in glass-ui drop the ./completion-seal subpath
export (package.json:334), the §18 --seal-* registrations in tokens/property-regs-specular.css,
the index.css:237 import, and the demo story — clean break, no alias. Separately (regardless of
verdict): fold atlas's seal-compositor rewrite upstream — ship the direct stroke-dashoffset
keyframe in completion-seal.css so consumers stop patching the emitted bundle.

**Flip.** External census drops below 2: if BOTH sci-report and atlas retire their seal usage
(imports → 0), the component becomes demo-only, falls under the ≥2-site bar, and flips to DEMOTE
into the last consumer standing (or DELETE if none). Also revisit as COLLAPSE-FAMILY only if a
BJ greenfield actually unifies the draw registers into one engine that absorbs both the seal's
--seal-draw wipe and HandMark's draw-on — today no such engine exists and draw-in.css explicitly
fences the members apart.

---

### F08-aurora-presets — COLLAPSE-FAMILY → ~11-preset register BOUND to W1-W4 body authorship (SHARPENED)

**Verdict.** The 17-key demo register (demo/stories/substrates/aurora/presets.ts:685-703)
carries four near-exact-duplicate clusters, proven by source identity, not vibes. The cut is
BOUND to real per-medium WGSL body authorship (kill the ==3||5||6||7 alias) or the painterly
wing collapses further to one Kuwahara exemplar.

**Evidence.** (1) SETTING_SUN/DUSK/VIVID_SETTING_SUN are literally commented "candidate A/B/C"
of one unresolved design iteration: VIVID vs SETTING_SUN share a byte-identical sun-band nucleus
(0.50/0.82, r0.52, elongation 2.0) and the IDENTICAL driftPhase ladder 0.2/1.6/3.0/4.3/5.5 — it
is SETTING_SUN with the saturation knob turned (+0.02-0.05 C, sat 1.02→1.08);
tests-visual/aurora-vibrancy.spec.ts:33 still ships the A/B/C adjudication as a CANDIDATES
array. (2) OILPASTEL_SUNSET/RAINBOW/OCEAN are one recipe, three palettes: identical
medium/layers/orient/impasto/canvasGrain, dial deltas ≤0.07, same phase ladder — a pure
palette-swap family the configurator's palette editor already covers. (3) OIL_IMPASTO vs
OIL_GESTURAL differ by the strokeMode dial (knife vs chunky) exposed one click away in
options.ts strokeModeOptions. (4) OPENAI_MEADOW vs DAY9_YELLOW are stop-for-stop the same
structure (vivid yellow/pale yellow/cream/2 cool intrusions; hue deltas 5/5/0/20/25), both
"yellow-dominant watercolor with blue/teal diagonal intrusion" per their own comments. Deeper:
on the WGSL PRIMARY, applyMedium routes oil(3)/vangogh(5)/oil-pastel(6)/kuwahara(7) ALL to one
mediumKuwahara body (aurora-mediums.wgsl.ts:399-400), and GL2 mediumOilPastel is a profileFor
constants-skin of the oil stroke engine (mediums.glsl.ts:493-494) — so SIX painterly presets
render one body wearing palettes on WebGPU, the literal "crayon, oil, etc. near-identical" the
user named; a preset cut alone leaves that alive. Corroborating rot:
substrate-paints-color.spec.ts:148 pins the roster at 13 while 17 exist — uncurated growth
already broke the staleness witness. Library side is clean (presets-in-consumers holds: src
exports only shape + DEFAULT_AURORA_CONFIG + PAPER_WASH_GROUND). Survivors (~11): SUNSET
(ex-SETTING_SUN, the story default), DUSK (kept per the user's named set, HARDENED — today a
lilac-note of SUNSET), SKY, DAWN (provisional), MEADOW (absorbs DAY9), PASTEL
(ex-DELIBERATIVE), OIL (absorbs GESTURAL), VANGOGH, OIL_PASTEL (absorbs RAINBOW+OCEAN), CRAYON,
METAL; SPEEDTEST relocates to the speedtest repo per presets-in-consumers.

**Migration.** (1) demo/stories/substrates/aurora/presets.ts — delete VIVID_SETTING_SUN,
DAY9_YELLOW, OIL_GESTURAL, OILPASTEL_RAINBOW, OILPASTEL_OCEAN (+ their PRESETS/PRESET_META
rows); rename keys clean-break, no aliases: SETTING_SUN→SUNSET, OPENAI_SKY→SKY,
OPENAI_DAWN→DAWN, OPENAI_MEADOW→MEADOW, OIL_IMPASTO→OIL, OILPASTEL_SUNSET→OIL_PASTEL,
DELIBERATIVE→PASTEL. (2) demo/stories/substrates/aurora.vue:55 — default fallback
"SETTING_SUN"→"SUNSET". (3) tests/demo/aurora-stage-affordance.test.ts — repoint
OIL_IMPASTO→OIL, SETTING_SUN→SUNSET; replace PRESETS.OIL_GESTURAL with inline
{...PRESETS.OIL, strokeMode:"chunky"} (the test wants a second oil config, not a roster slot).
(4) tests-visual/aurora-vibrancy.spec.ts — CANDIDATES trio → ["SUNSET","DUSK"]; retire the
candidate-adjudication framing (the candidates are adjudicated).
(5) tests-visual/substrate-paints-color.spec.ts:148 — move the count pin (already stale: 13 vs
actual 17) to the post-cut count; re-count the pi-manifest.ts:109/116 comments. (6) SPEEDTEST —
relocate config to the speedtest repo as a marked addendum in ITS tranche (consumer-updates
ruling); demo drops the mirror. (7) Harden DUSK: deepen the twilight leg (lower-L base stops,
lilac from whisper C:0.075 to a real note) + a distinct phase ladder, or it dies in round two
alongside DAWN if side-by-side capture reads as SUNSET. (8) BOUND body work (BJ GF-AURORA
W1-W4): author dedicated WGSL bodies for oil/vangogh/oil-pastel, delete the medium==3||5||6||7
alias arm in aurora-mediums.wgsl.ts, gate on tellable per-medium distinctness in live paint;
picker/thumbnails (PresetPickerRow.vue, usePresetThumbnails.ts) derive from PRESET_KEYS — no
change.

**Flip.** Toward KEEP-DISTINCT: only if paired live captures showed the intra-family pairs as
materially different fields — foreclosed for VIVID_SETTING_SUN and the oil-pastel trio by source
identity; or if a user ruling designates the aurora picker a palette-theme CATALOG where palette
variety is the product — no such ruling exists on disk. Toward deeper DELETE: if GF-AURORA W1-W4
cannot author tellably-distinct oil/vangogh/oil-pastel WGSL bodies within the perf/module
budget, the painterly wing collapses to ONE Kuwahara exemplar (roster ~8); DAWN and an
un-hardened DUSK die in a second round if side-by-side capture vs SUNSET reads as the same warm
field.

---

### PULSE-DOT — MERGE-INTO → StatusDot (OPUS-WRONG)

**Verdict.** Survivor: StatusDot. Pulse.vue and StatusDot.vue are the same ~50-line wrapper over
the ONE shared _shared/FeedbackMark.vue, which owns 100% of the material (all 7 silhouettes,
tone tokens, pulse keyframes, PRM, forced-colors). The wrappers' template a11y contract is
verbatim-identical (data-identity/role=img/aria-label/aria-hidden); the deltas are one `motion`
boolean, a `size` prop, three CSS numbers, and a default state. The state vocabularies are soft
registers, not behaviors: both live in _shared/feedback.ts, already union into
FeedbackMarkState, overlap at `warning` (pixel-identical render from either component), and pair
off by tone (success≈online, idle≈unknown). axes.ts declares motion an AXIS ("opt-DOWN, not
opt-in — liquid-weight universal"), never a component identity, and the root-barrel fold ledger
(HoverPopover→Popover trigger, Sheet→Dialog placement, MultiSelect→Combobox multiple) rules that
same-mechanism/different-paint pairs fold onto one sealed union — Pulse is precisely StatusDot's
motion arm.

**Evidence against the opus keep.** The opus KEEP-DISTINCT rests on a phantom cost: its "breaks
7 sites across 3 repos" all consume pre-7.0.0 APIs that no longer exist (speedtest
`<Pulse variant=aura :count intensity once>`, atlas `<StatusDot variant=custom>`), so those
sites owe a migration regardless, and the consumer-updates ruling forbids consumer surface from
preserving an obsolete split. The gain opus called "zero" is the superfluity grain BJ audits: −1
public package, −1 subpath/dist/typesVersions entry, −1 README, −1 exported union, −1 demo story
that is a structural clone of the other (~150 lines, byte-identical CSS modulo class prefix).
Per-register type narrowing survives as documented Extract<> sub-unions per the sub-range law;
it never required a second component.

**Migration.** (1) StatusDot.vue absorbs the Pulse contract: state widens to the full 7-state
union (renamed StatusDotState ≡ old FeedbackMarkState), size widens to
Extract<Size,"sm"|"md"|"lg"> (lg = 0.875rem, Pulse's box; sm 0.5 / md 0.625 unchanged), add
motion?: Extract<Motion,"full"|"off"> default "full" (opt-down; FeedbackMark's existing guard
animates only state==="active", PRM still wins). (2) feedback.ts: collapse PULSE_STATES +
STATUS_DOT_STATES into ONE STATUS_DOT_STATES tuple [active, idle, online, success, warning,
error, unknown]; delete PulseState — clean break, no alias. A follow-on design call may prune
the tone-duplicate pairs (success/check vs online/ring; idle vs unknown), but the minimum merge
keeps all seven silhouettes. (3) Delete src/components/pulse/ entirely; remove the ./pulse
subpath, dist entry, and typesVersions row from package.json; fold the liveness/live-region
guidance from pulse/README.md into status-dot/README.md. (4) Optionally inline FeedbackMark.vue
into StatusDot.vue (one wrapper left — the fuller de-indirection). (5) Demo: fold pulse.vue
story's unique sections (animated liveness row, PRM probe, announcer) into status-dot.vue;
delete the clone story; re-point buttons.vue (`<Pulse state="active"/>` →
`<StatusDot state="active" size="lg"/>`) and atoms.vue's label; update verify:package lists.
(6) External consumers (speedtest ×4, keyframes.js demo ×2, atlas ×2) migrate via marked addenda
in THEIR tranches — they are already API-broken against 7.0.0, so the rename rides the migration
they owe.

**Flip.** Flips back to KEEP-DISTINCT only if liveness becomes a genuine behavioral contract
rather than a motion axis — i.e. a ratified design gives Pulse capabilities StatusDot must never
have (own live-region ownership, indeterminate-progress semantics coupled to Progress, or a
returning multi-dot/aura variant family) so the delta stops being one boolean over the same
mark; or if the user ratifies the mechanical ≥0.85 composite floor as binding on adjudication
(this pair sits at 0.765), in which case the merge lacks a mandate.

---

### DIALOG-DRAWER — COLLAPSE-FAMILY (SHARPENED)

**Verdict.** The two content cores are distinct mechanisms and must not merge: useDrawerSnap.ts
is a 492-line interruptible pointer-drag/fling/detent engine (velocity decision, keyboard slider
a11y, per-frame --glass-drawer-t + --stage-t dual writer) that DialogContent's paint springs
structurally lack, and it is load-bearing externally (speedtest DashboardMapControls.vue:28 and
keyframes.js ControlsPaneWrapper.vue both use mode="live-behind" detented sheets). But the
FAMILY around those cores is substantially duplicated, wider than the prior row admitted:
(1) the scene-staging JS plumbing exists twice — identical stage-anchor blocks
(Dialog.vue:21-35 ≡ Drawer.vue:161-175), twin scrim-registration watchers (ModalOverlay.vue ≡
DrawerOverlay.vue), twin PRM-degrade computeds (Drawer.vue:114-122 ≡ DialogContent.vue:124-132),
the stage enum typed twice — while the CSS substrate is already ONE file
(drawer/styles.css:34-80 hosts Dialog's --stage-t flip transition inside Drawer's stylesheet);
(2) DrawerTitle≡DialogTitle and DrawerDescription≡DialogDescription are byte-identical modulo
name, and Drawer has no Trigger/Close — its own story imports DialogTrigger/DialogClose
(drawer.vue:13), while speedtest imports a DrawerTrigger the current drawer/index.ts doesn't
export; (3) the gestureless arms of Drawer duplicate Dialog placement outright: drag binds ONLY
to the handle (useDrawerSnap onPointerDown bails without handleEl) and the handle renders only
for >1 detents (DrawerContent.vue v-if hasSnapPoints), so a side-lens drawer (direction
left/right, [] ladder) and a no-ladder modal drawer ([1] ladder) have zero gesture affordance —
pure paint slides, the same artifact as `<DialogContent placement>` which carries the same stage
enum (DialogContent.vue:48). In-repo Drawer has exactly one consumer (its own story). Verdict:
collapse the two parallel families into ONE overlay family on the shared reka DialogRoot
substrate — Dialog periphery survives whole; Drawer survives narrowed to its honest,
externally-demanded identity: the detented gesture sheet (bottom/top, real ladder, modal +
live-behind); every gestureless sheet is Dialog placement.

**Migration.** (1) Shared staging seam in _shared: one Stage enum + one resolveStage(prm) helper
+ one provideStageRoots context ({wrapperEl, scrimEl}) + one useStageAnchor composable (hidden
span → closest('[data-stage-wrapper]')); Dialog.vue and Drawer.vue both consume it;
dialogStageContext.ts dies; drawerSnapContext.ts keeps only snap-specific fields and composes
the shared seam; move the --stage-t @property + wrapper/scrim coupling rules out of
drawer/styles.css into a shared overlay-stage css. (2) One scrim-registration composable shared
by ModalOverlay + DrawerOverlay (two thin skins may remain for the distinct scrim recipes).
(3) DELETE DrawerTitle + DrawerDescription; drawer consumers import DialogTitle/DialogDescription
(the story already crosses families for Trigger/Close); keep DrawerHeader/DrawerFooter
(genuinely distinct self-minted padding ladder on the non-Card .glass-drawer surface). (4) Cut
Drawer's gestureless arms: DrawerDirection narrows to bottom|top; delete
resolveDefaultSnapPoints' side branch, isSideAxis/[0,1] ladder, the translateX snapStyle arms,
horizontal aria-orientation; the drawer story's fixed-edge panels re-express as
`<DialogContent placement="left|right">`, and a no-ladder modal sheet as
`<DialogContent placement="bottom" stage="scale">`; Drawer thereafter requires/derives a real
detent ladder. (5) Externals are unaffected (both use live-behind detented bottom sheets); any
residual side-lens/no-ladder use migrates via marked addenda in the consumers' own tranches per
the consumer-updates ruling; speedtest's stale DrawerTrigger import gets caught in its addendum.

**Flip.** Flips back to KEEP-DISTINCT if external consumers are shown to depend on the
gestureless drawer arms for material semantics Dialog placement cannot express (deliberate
.glass-drawer-recipe selection on side panels), or if a chartered gesture lands on the
side-lens/no-ladder arms (drag-dismiss on edge panels via a handle or edge-grab), making them
real gesture surfaces rather than paint duplicates. Flips further to MERGE-INTO dialog if a
spike proves useDrawerSnap can bind to data-placement geometry as a placement-orthogonal
composable with no mode-keyed prop disjunction in one content component — then DrawerContent
itself dies into DialogContent.

---

## 3. CONTRADICTIONS — for the lead judge

These are the points where a fresh verdict disputes a standing ruling or band, or where two
verdicts must be reconciled. Each needs the lead judge's arbitration before the ASK ships.

**C-A. F18 overturns the CHRONIC-ADJUDICATION UF-K1 costed-break refusal.** UF-K1 (+R16/R12)
routed the third-asked chassis/metric removal to an ASK whose census refused via a costed break;
the opus row ratified that refusal as merit-based. The fresh census proves the refusal's premise
false: muster pins ^3.1.0 and speedtest ^4.0.1, and every symbol/subpath they import
(InstrumentChassisPhase, variant="spine", ChassisDivider, /metric-stack, /metric-cell,
/metric-badge, MetricBadge) is absent from 7.0.0 — both apps owe a full rewrite-on-upgrade
regardless, so consumer dependence cannot ratify the keep (the consumer-updates ruling says
precisely this). The lead judge must either ratify the DELETE or name a live 7.0.0-contract
consumer; the standing keep cannot survive on the phantom census.

**C-B. PULSE-DOT overturns INFERENCE §1a/V1 and sits below the graph's ≥0.85 merge floor.**
INFERENCE cleared pulse↔status-dot as a Type-4 register split; the pair's composite is 0.765,
under the ≥0.85 formal merge floor. The fresh verdict merges anyway, on grounds the graph could
not see: the wrappers are the same component modulo one boolean, the "disjoint enums" already
union in _shared/feedback.ts, and the 7-site break is phantom (all sites pre-7.0.0-broken). The
lead judge must rule whether the mechanical floor is a screening heuristic (merge stands) or
binding on adjudication (merge lacks a mandate — the verdict's own flip condition).

**C-C. F33 partially overturns ASK-REDUCTION C1 + INFERENCE V10's adequacy.** C1's
keep-the-primitives holding stands (headless deck vs embla carousel — ratified), but its "the
only remaining shell is DeckPager" scoping was wrong: the deck story ships a full second goo
engine (byte-identical neck clipPath, PagerDots.vue:326 ≡ DeckGooFilter.vue:26) that V10's
primitive-level clearance never measured, and that violates the ONE-metaball doctrine
CarouselContent.vue:4-18 records as already-adjudicated. The lead judge must bind the goo-engine
deletion (and the land-refinement-once rule in usePagerWorm/PagerDots) into the band, not leave
it at C1's micro-fold framing.

**C-D. DIALOG-DRAWER overturns the adequacy of V2/V8's scoping and touches external surface.**
V2's core CLEAR holds (useDrawerSnap is a distinct load-bearing mechanism), but the duplication
is far wider than V8's ~40-60-line floating note: twin stage anchors, twin scrim watchers, twin
PRM computeds, byte-identical Title/Description, and Drawer's gestureless arms (side-lens,
no-ladder) which are Dialog placement in disguise. The fresh verdict binds a shared staging seam
in _shared AND narrows DrawerDirection to bottom|top — the latter is a public-API narrowing the
lead judge must ratify (externals verified unaffected: both live consumers use detented bottom
sheets; speedtest's DrawerTrigger import is already stale against the current barrel).

**C-E. F16's scrubber disposition changes: fold, not delete.** The prior synthesis ruled
ScrubberTimeline plain-deleted; the fresh verdict rules its liquid-motion register
(HEAD/FILL/PRESS springs, tanh squish, accent-flood) folds into Slider as the transport variant.
This also mostly dissolves the old W4/W5 sequencing knot: F23 renames its register to
glass-track-well regardless of ScrubberTimeline's live .glass-track class, so W4's naming no
longer waits on W5's deletion order. The lead judge sequences only the Slider-fold vs
track-well adoption (the survivor Timeline adopting track-well would widen F23's family to ≥3,
per F23's own flip condition).

**C-F. F32-F42 overrules the §C3 abstention and indicts the family's own fence.** §C3 reserved
the scroll-family merge shape to the user as unsettleable; the fresh grep census settles it
(useStagger/useStaggerReveal/useBloomUp/useTextHighlight all zero-caller; the sibling hits are
prose, not imports). New and un-routed anywhere: scrollReader's "factored to ONE site" fence is
violated twice in its own house (useScrollProgress, useFadingScroll hand-roll listeners) — the
re-seat is a bound deliverable; and the .scroll-pin CSS register must move to demo/ WITH its
writers or it re-creates the 7.0.0 RED-BY-ROT class. The lead judge ships the full kill/keep
table as the recommendation, with the flip-on-file:line escape clause carried.

**C-G. F23 disputes the DOSSIER-F21-F30 "EXACT / AGREE-LANDED" coverage of W4 — twice now.**
Carried from the prior round (the glass-track naming collision; renamed glass-track-well) and
extended: the value-mark checkpoint paint (~65 lines across Slider + Progress, identical tokens
and defaults) is a second true fold W4 never scoped. The LANDED status on BJ.W-TRACK-DRY is
premature; the wave re-opens with both registers (track-well.css + value-marks.css).

**C-H. F08 remains unclosed by the preset cut — the binding carries, the roster shifts.** No
terminal ruling exists; GF-AURORA is unconverged. The fresh roster is ~11 survivors (not 10):
DUSK is kept per the user's named set but HARDENED-or-dies, DAWN provisional, SPEEDTEST
relocates per presets-in-consumers. The binding stands: the cut closes F08 only WITH W1-W4
per-medium WGSL body authorship (kill the ==3||5||6||7 alias); the stale count pin
(spec pins 13, disk has 17) shows the staleness witness already broke and must be re-pinned
post-cut.

**C-I. F25's relay census corrects the opus count.** The opus row owed the relay to 8 sites
across 3 repos including value.js-demo ×2; the fresh census finds value.js ×0 — it already
migrated (its AdminUsersPanel.vue is now the migration exemplar). The relay is owed to TWO repos
only: words ×5 + muster ×1, and muster's is a dynamic import (defineAsyncComponent) that static
greps miss — the addendum template must say so.

No two fresh verdicts reach opposite dispositions on the same target. The cross-verdict
interactions are C-E (F16/F23 sequencing, now mostly dissolved) and the shared consumer-addenda
pattern (F18, F16, F25, PULSE-DOT, F08 all owe marked addenda to sibling tranches — one relay
batch, not five ad-hoc mails).

---

## 4. ASK-DELTA — sharpened ASK-row texts (appendable verbatim)

Each row below carries a real recommendation, so every flagged pair reaches the user as a
decision, not an open question. Append verbatim to the BJ ASK checklist. Rows marked
(CHANGED vs prior ASK) reverse or materially alter what the earlier synthesis would have asked.

**F25 — confirm-dialog.** The component was never behaviorally distinct and is already merged
(BI B28; every prop/emit is first-class DialogContent API). Recommendation: DELETE the redundant
standalone demo/stories/feedback/confirm-dialog.vue + its manifest entry (the /containers/dialog
page already carries the identical Confirm-preset section), repoint the confirm-preset test to
the dialog story, and relay addenda to TWO repos only — words ×5 + muster ×1 (dynamic import;
static greps miss it) — copying value.js's already-landed migration as the exemplar, including
its auto-close-made-explicit caveat. One residual choice: keep a standalone
/feedback/confirm-dialog page for discoverability? Recommendation: fold.

**F33 — deck vs carousel. (CHANGED vs prior ASK)** The primitives stay distinct (headless nav
engine vs embla scroller; atlas consumes the headless core), but your near-exact-duplication
instinct was right about the FAMILY: the deck story ships a second barbell goo engine cloning
the PagerDots worm (the neck clipPath is byte-identical), violating the repo's own ONE-metaball
doctrine, and DeckPager is a 47-line zero-logic alias. Recommendation: COLLAPSE the family onto
PagerDots + useLeadTrail/usePagerWorm — retire DeckPager (clean break, the CarouselDots
precedent), delete the story-local goo engine + its ~200-line CSS + private test, and land your
"dramatic dot refinement" ONCE in the survivor so carousel, deck, and slides inherit together.
/deck and /carousel subpaths both remain.

**F18 — instrument-chassis + metric. (CHANGED vs prior ASK — your third ask is granted)** The
prior refusal leaned on a phantom census: muster pins ^3.1.0, speedtest ^4.0.1, and every symbol
they import is gone from 7.0.0 — both owe a full rewrite-on-upgrade regardless, so consumer
dependence cannot ratify the keep. Three incompatible chassis contracts in three majors prove an
app-shell re-carved per app; chassis hand-rolls a glass plate parallel to Surface; the metric
trio is one component thrice. Recommendation: DELETE both families + subpaths + the two demo
stories + the dead chassis tokens; speedtest and muster each inline an app-local chassis on
Surface + one local Metric (≈100 lines + the 26-line coalesceMetric), via marked addenda in
their tranches. Overrule only by naming a live 7.0.0-contract consumer.

**F23 — slider/progress dedup.** Real DRY confirmed, and it is TWO folds, not one: the recessed
pill well AND the value-mark checkpoint paint (~65 lines, identical tokens/defaults — the "same
logic painted twice" you saw). Recommendation: mint two src/styles/glass registers —
track-well.css (named glass-track-well; glass-track is a live class on ScrubberTimeline) +
value-marks.css — both components compose them; components stay distinct (a merge is an ARIA
category error: input vs output). Keep the timeline out until W5 rules. Your enlarged-on-touch +
graduated-blur ask routes as a Slider feature wave — additive design, not superfluity.

**F30 — tempo page.** The --motion-tempo token + motionTempo() reader are the one-clock CSS==JS
TIME authority (7 CSS readers + 4 JS engines, tempo applied exactly once each — verified, no
compounding) — KEEP verbatim, not in play. Only the page folds: springs.vue already reads
motionTempo() at both play sites and displays the settle×tempo arithmetic with no knob.
Recommendation: fold tempo.vue into the springs configurator as a global time knob (carrying the
identity-restore-on-unmount contract) + one cross-register co-scale proof section; delete the
route. Zero src changes.

**F32/F42 — scroll vs reveal.** The scroll spine is clean (one reader core, layered contracts);
the REVEAL wing is where the duplication lives: four stagger mechanisms (two with zero callers
anywhere), two near-identical morph adapters (useBloomUp ≡ useLiquidReveal modulo a tint
channel), and the family's own no-fourth-listener fence violated twice in-house.
Recommendation: DELETE useStagger + useStaggerReveal; MERGE useBloomUp into useLiquidReveal
(relocated to morph/ — it is a FLIP morph, not scroll); move the scroll-pin pair to demo/ WITH
its CSS register (never ship the register writer-less — the RED-BY-ROT class);
relocate-or-delete useTextHighlight; re-seat useScrollProgress + useFadingScroll onto
createScrollReader; fold /motion/reveal into /motion/scroll. Escape clause: name a sibling-repo
import file:line for any deleted symbol and it flips to keep-with-relay.

**F16 — timeline. (scrubber disposition CHANGED vs prior ASK)** Five variants under a leaky
dispatcher; only continuous has a consumer (speedtest, thin slice, popover envelope overfit to
its PhaseDetail). Recommendation: collapse 5→1 — continuous becomes the one Timeline (no
variant prop), delete SegmentedTimeline (a gap knob, not a component), delete the dispatcher,
de-overfit the popover default, prune the §16 tokens, fix the README. The scrubber is NOT
plain-deleted: fold its liquid-motion register (springs, tanh squish, accent-flood, 44px halo)
into Slider as the transport variant — the register is the valuable part, the component was the
wrong home. speedtest's migration is one import + one tag edit via addendum. Choice retained:
redesign-in-library (recommended, matches your phrasing) vs relocate-to-speedtest.

**F26 — completion-seal.** Your note ("greatly overfit; likely belongs only in speedtest") rests
on an inverted premise: speedtest imports it ZERO times; sci-report + atlas consume it at 4+
sites, and atlas ships a dedicated vite build plugin (seal-compositor) for its keyframes —
build-infrastructure-grade dependence. It duplicates nothing (draw-in.css itself fences the
members apart). Recommendation: KEEP public on ./completion-seal — the one clean keep of the
eleven. Regardless of verdict: fold atlas's compositor rewrite upstream (ship the direct
stroke-dashoffset keyframe) so consumers stop patching the emitted bundle.

**F08 — aurora presets + mediums.** Four duplicate clusters proven by source identity: the
candidate-A/B/C sunset trio (an unresolved design iteration still shipping, CANDIDATES array in
the visual spec), the oil-pastel palette-swap trio, the strokeMode pair, the yellow-watercolor
pair. Deeper: on WGSL, SIX painterly presets render ONE mediumKuwahara body (the ==3||5||6||7
alias) — the literal "crayon, oil, etc. near-identical" you named. Recommendation: cut 17→~11
(SUNSET, DUSK-hardened, SKY, DAWN-provisional, MEADOW, PASTEL, OIL, VANGOGH, OIL_PASTEL, CRAYON,
METAL; SPEEDTEST relocates to its repo), clean-break renames, BOUND to GF-AURORA W1-W4 authoring
real per-medium WGSL bodies and deleting the alias arm. Do NOT let "presets reduced" close F08
while the bodies remain aliased; DAWN and an un-hardened DUSK die in round two if capture reads
them as SUNSET.

**PULSE vs STATUS-DOT. (CHANGED vs prior ASK)** The DRY at _shared/FeedbackMark.vue is exactly
why these should merge, not stay split: the mark owns 100% of the material; the wrappers are the
same component modulo one motion boolean + a size, their enums already union in _shared, and
motion is a declared AXIS, never a component identity (the HoverPopover/Sheet/MultiSelect fold
ledger governs). The "7-site break" is phantom — every site is already API-broken against
7.0.0 and owes a migration regardless. Recommendation: MERGE-INTO StatusDot (7-state union,
size sm|md|lg, motion opt-down; delete /pulse wholesale, clean break); consumers ride the
migration they owe via addenda. One check for you: the pair sits at 0.765, under the mechanical
≥0.85 floor — if you ratify that floor as binding, this merge lacks a mandate; say so and it
reverts.

**DIALOG vs DRAWER. (CHANGED vs prior ASK)** The cores stay distinct (useDrawerSnap's 492-line
detent engine is load-bearing in speedtest + keyframes.js) — but the family around them
duplicates wider than previously admitted: twin stage anchors, twin scrim watchers, twin PRM
computeds, byte-identical Title/Description (Drawer's own story imports DialogTrigger/Close),
and Drawer's gestureless arms (side-lens, no-ladder) are Dialog placement in disguise — zero
gesture affordance, pure paint slides. Recommendation: COLLAPSE to one overlay family — shared
staging seam in _shared (Stage enum + useStageAnchor + scrim registration), delete
DrawerTitle/Description, narrow Drawer to its honest identity (detented gesture sheet,
bottom|top, real ladder; every gestureless sheet is `<DialogContent placement>`). Externals
verified unaffected. This replaces the prior "floating W3 note" with bound deliverables.

---

## 5. What of your noted near-exact duplication

The redo moves the needle against the first synthesis: your instinct was right more often than
it credited. Three pairs it kept distinct do not survive a source-identity read: pulse and
status-dot are one component wearing a motion boolean (the shared mark owns all the material —
which is the argument FOR the merge, not against it); the deck story rebuilt the pager worm as a
second goo engine with a byte-identical neck clipPath, against the repo's own ONE-metaball
doctrine; and chassis/metric's defense rested on consumers that turn out to be version phantoms
— pinned symbols that no longer exist, three incompatible contracts in three majors. Where the
duplication lives below the component name, it is wider than first found: Slider/Progress
duplicate BOTH the track well and the value-mark paint; dialog/drawer duplicate the whole
staging periphery (anchors, scrims, PRM computeds, Title/Description) plus gestureless drawer
arms that are Dialog placement in disguise; the reveal wing carries four stagger mechanisms and
two near-identical morph adapters with the family's own listener fence violated twice in its own
house; and on the WGSL primary, six painterly aurora presets render one Kuwahara body wearing
palettes. What genuinely stays distinct is short: the deck/carousel primitives, the
Slider/Progress components (as ARIA roles, over shared registers), the dialog/drawer CORES, the
tempo facility — and exactly one whole component, completion-seal, whose "overfit to speedtest"
premise was factually inverted (speedtest ×0; sci-report + atlas consume it down to build
infrastructure). So the honest answer, sharpened: the duplication is real, it is
register-, shader-, wrapper-, and family-level, and this round it also claims three components
the first pass spared — delete the phantom-defended chassis/metric, fold pulse into status-dot,
collapse the goo and staging families onto their one engine each, author the shader bodies, and
keep distinct only what a source read proves distinct.

---

*End — SUPERFLUITY synthesis, REFABLE RU-09, `claude-fable-5`.*
