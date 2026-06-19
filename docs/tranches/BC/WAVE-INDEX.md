# BC — the WAVE-INDEX (the canonical wave registry — the single source of truth for wave names)

> **The allowlist.** Every disposition / cross-reference in the BINDING wave-set docs —
> `DEFERRAL-LEDGER.md`, `PROMPT-LEDGER.md`, the `ORCHESTRATION.md` cross-references (the §1 band
> roster — the authoritative band→wave mapping), and the wave specs (`waves/*.md`) —
> MUST name a wave that appears in this table. A reference to a name NOT in this index is
> **name-drift** — reconcile it to the canonical id (or, if it maps to NO authored wave, it is a
> genuine coverage gap for the CHALLENGE pass, never invented here).
>
> **ORCHESTRATION.md's NARRATIVE history-notes are EXEMPT (same treatment as `PLAN.md`).** The
> binding ORCHESTRATION cross-references are the §1 band roster. The iteration-log / progress table
> and the "Known gap" reconcile-prose are reconcile-NARRATION — they NARRATE the iteration-2 fan-out's
> working-names (e.g. `BC.W-VIZ-LIVE` / `BC.W-WGSL-COMPILE-GATE` / `BC.W-CROSSREPO-ADOPT` /
> `BC.W-CONSTELLATION` / `BC.W-SLIDES`) WHILE recording the reconcile that mapped each to a canonical
> wave — they are NOT binding dispositions. Every name they carry is in the Name-drift map below, so a
> literal allowlist read no longer contradicts ORCHESTRATION's own prose (the residual CHALLENGE-1
> flagged for the ORCHESTRATION owner, closed). The F2 / F2.b scan reads `FOLD-LEDGER.json` rows +
> `DEFERRAL-LEDGER.md` cells, never ORCHESTRATION prose, so no gate trips — pure doc-hygiene.
>
> **The historical planning docs are EXEMPT (frozen pre-reconcile working-names, NOT the binding set).**
> `PLAN.md` (`Status: DEVELOPED` — the iteration-1/2 authoring plan), the `audit/` corpus
> (`USER-DEFECTS.md`, `DEFECT-LEDGER.md`, `FINDINGS-DIGEST.md`, `LIVE-GROUNDING.md`), and the WHOLE
> `research/` corpus (`WAVE-IMPACTS.md`, `route-census.md`, `cross-repo-asks.md`, the `deferral/` +
> `postmortem/` + `viz/` sub-trees — all iteration-1 planning artifacts) are FROZEN: they carry
> pre-reconcile working-names
> (e.g. `BC.W-WGSL-COMPILE-GATE`, `BC.W-GPU-PARITY-REAL`, `BC.W-VIZ-LIVE`, `BC.W-DOCK-EDGE`,
> `BC.W-CHRONIC-FOLD`, `BC.W-CROSSREPO-ADOPT`, `BC.W-CONSTELLATION`, `BC.W-SLIDES`, `BC.W-DECK-BUILD`,
> `BC.W-PROMPT-LEDGER`) as section headers / intent labels. Every one is catalogued in the Name-drift
> map below, so a reader can trace the lineage — but a working-name in a historical doc is NOT a real
> wave and a future reader/gate MUST NOT treat it as one. **The binding wave set is THIS index +
> `waves/*.md`; the F2 / F2.b destination-soundness scan reads the BINDING docs, never the historical
> planning docs.** (This closes the literal-rule contradiction CHALLENGE-2 named — the substance is
> benign, every drifted name is in the drift map.)
>
> **96 wave specs on disk** (`ls docs/tranches/BC/waves/*.md`) — the iteration-2 PLAN fan-out's 66 +
> iteration-4 HARDEN's 4 (`BC.W-VISUAL-RECONCILE` + the Band-11 perf trio `BC.W-CSS-CRITICAL`/
> `BC.W-LIGHTHOUSE`/`BC.W-PERF-PRODUCER` — the CHALLENGE-1 BLOCKER 3/4/5/7 + the un-owned-perf-chronic
> + the buttons-interaction MAJOR closed) + iteration-5 ATLAS-FOLD's 5 (`BC.W-DESHADCN` reka=behavior/
> glass-ui=100%-material + the `proof:no-shadcn-default` gate, `BC.W-SELECTION-CARD` the I5 `<Card
> variant="selection">` (the ONE new Atlas component), `BC.W-GLASS-GLOW-FIX` the A-8 giant-radial-glow root
> defect, `BC.W-EXPANDABLE-PART` the AR-7 `::part()`/named-slot expand-chrome seam, `BC.W-DEMO-COPY-PRUNE`
> the demo-content de-jargon — the de-shadcn/Atlas-fold re-open; `DESHADCN-BRAINSTORM.md`) +
> **iteration-6 FEATURE-BAND's 10** (the new Bands 12/13/14, fanned out from `research/feat/WAVE-IMPACTS-FEAT.md`;
> the iteration-6 fan-out's 9 + the CHALLENGE-pass authored `BC.W-SEARCH-CUSTOM` — the C3 owner the
> Name-drift map below records as the resolved coverage gap):
> **Band 12 customizability+golden-defaults** — `BC.W-CUSTOMIZABILITY-CENSUS` (the binding "fully customizable
> with golden defaults" bar + `proof:customizability-census`), `BC.W-CONTROL-CUSTOM` (the shared control
> size/tier axis onto the input register), `BC.W-OVERLAY-UNIFORM` (the `surface` + φ overlay-pad ladder on
> every floating overlay), `BC.W-SEARCH-CUSTOM` (the SearchBar/FuzzySearch first-principles customization +
> glassify surface — size/surface/variant axes + the `.glass-menu-row` result register + the φ overlay-pad
> modal + the `variant="bare"/"floating"` rung deleting the `!important`-fighting-CVA escape; flips
> `proof:customizability-census` C3 GREEN); **Band 13 dock-search+scroll-system** — `BC.W-SCROLL-TRIGGER` (the one rAF-coalesced
> scroll-event reader), `BC.W-SCROLL-CHROME` (the shrink/opacity/snap scroll-driven chrome behaviors),
> `BC.W-DOCK-SEARCH` (the DOCK as native dynamic-search-bar, subsuming the words SearchBar); **Band 14
> latex-paper abstractions** — `BC.W-VIRTUAL-WINDOW` (the homecoming re-mint of the v1.0-retired
> virtualized-section-windowing), `BC.W-TOC-RECONCILE` (the 3-way ToC-tracking fork reconciled onto
> glass-ui/sidebar + the three missing leaves), `BC.W-FUZZY-HARDEN` (harden the canonical client fuzzy
> surface for the dock-wire + the `useAsyncSearch` no-contrivance DECISION).
> + **iteration-7 CROSS-REPO-ABSORB's 11** (the new Bands 15/16 — the three cross-repo intake packets:
> speedtest-AX Band-15 + keyframes.js-M + fourier-analysis-M Band-16; the absorb agents wrote the disjoint
> new wave files, this index re-indexes them). **Band 15 speedtest-AX absorption (7 waves)** — `BC.W-AX-METAL-GLOW`
> (the gold catch-light → Band 1), `BC.W-AX-LIQUIDHOVER-AUTOARM` (STRUCK-already-ships, the §6 re-verify → Band 1),
> `BC.W-ACCENT-TONE` (the 3-channel tonal-accent register + `<SelectableChip>` → Band 1/12; ALSO a Band-16/fourier
> fold), `BC.W-AX-DOCK-CTA-SEAT` (the CTA landing seat + `/dock` re-export → Band 2), `BC.W-AX-DOCK-COCKPIT`
> (the `cockpit` 2.75rem preset → Band 2), `BC.W-AX-COMPLETION-SEAL` (the earned-GOLD seal → Band 6),
> `BC.W-AX-METRIC-HOVER` (the metric-badge lift → Band 12), `BC.W-AX-BP-LAZY` (the BorderProgress lazy-import
> boundary → Band 11). **Band 16 cross-repo: keyframes.js + fourier-analysis (3 net-new waves + the threaded
> folds)** — `BC.W-SPLIT-CHARS` (the `useCharStagger`/`<SplitChars>` per-glyph split → Band 7), `BC.W-MOTION-PRESETS`
> (the convergence-reveal preset + `[data-scroll-reveal]` `once` latch → Band 7), `BC.W-FOURIER-DECIDES` (the
> three DECIDE-or-BOOK fourier asks → Band 12/14). The keyframes.js-M asks are CONFIRMS/BOOKS threaded onto
> existing waves (`BC.W-MOTION-ONE-CLOCK`/`BC.W-VIZ-CHOREOGRAPHY` Oscillator-republish-gated, `BC.W-PERF-PRODUCER`
> value.js `/color` BOOK) — no net-new kf wave; the green-handshakes are `coordination/{SPEEDTEST-BC,KF-BC,FOURIER-BC}.md`.
> `proof:bc-fold-ledger` clause F2 (decided-destination soundness) REDs the close if any disposition
> names a wave absent from this index; clause F2.b REDs a disposition that names only a bare `Band N`
> label with no `BC.W-*` wave-id (the band-string-rejection anti-evasion floor).
>
> Built by iteration-3 RECONCILE (2026-06-18) by reading each wave header (`# <id> — <title>` + the
> `**Band:**` / `**Sequence:**` line). The band membership is cross-checked against `ORCHESTRATION.md §1`
> (the convergence checklist — the authoritative band→wave mapping).

---

## The 96 canonical waves

| id | band | title (one-line owns) | sequence-after |
|---|---|---|---|
| **BC.W-PM-BB** | F | the BB post-mortem (source-green / paint-broken / never-closed) — the per-wave BUILT/CLAIMED/PAINTED verdict matrix | FIRST of Band F (no predecessor) |
| **BC.W-PM-BA** | F | the BA post-mortem (PUBLISHED 4.0.0 and still shipped grey) — the paint-blind gestalt-gate forensic | after BC.W-PM-BB (siblings) |
| **BC.W-PM-AZ** | F | the AZ post-mortem (the divergence point — the grey-glass ORIGIN, adaptive-auto/morph-showcase/rail3) | sibling of BC.W-PM-BB/BA |
| **BC.W-PM-SYNTHESIS** | F | the cross-tranche failure-class taxonomy (29 classes → 10 root mechanisms) → Band-0 gate-redesign requirements | after BC.W-PM-BB+BA+AZ; gates Band 0 |
| **BC.W-GESTALT-FIRST** | 0 | per-wave gestalt-first paint verification (the single-terminal-reflect deferral ABOLISHED) | after BC.W-PM-SYNTHESIS |
| **BC.W-PAINT-GATE** | 0 | gates MEASURE PAINT, not source-mechanism (the gate-paint-blindness closed) | after BC.W-PM-SYNTHESIS; with BC.W-GESTALT-FIRST |
| **BC.W-FOLD-LEDGER** | 0 | every chronic / prior-tranche deferral folded + DECIDED (the no-silent-drop floor; mints FOLD-LEDGER.json) | after the PM wrappers + the deferral sweep |
| **BC.W-GLASS-IDENTITY** | 1 | the warm-cream partial-transparency base, restored at root (the grey-slab killed) | FIRST of Band 1 (after BC.W-BLACK-BAR rim) |
| **BC.W-ADAPTIVE-RECONCILE** | 1 | close the observer loop (the luma is READ, not decorative) | after BC.W-GLASS-IDENTITY + BC.W-BLACK-BAR |
| **BC.W-GLASS-LEGIBILITY-MEASURED** | 1 | more glass AND more legible at once (the iOS-27 dynamic-range shift, MEASURED) | after BC.W-ADAPTIVE-RECONCILE |
| **BC.W-GLASS-PRUNE** | 1 | prune the glass sprawl to TWO registers: Glass CARDS + Glass MATERIALS | after BC.W-GLASS-IDENTITY |
| **BC.W-DIALOG-GLASS** | 1 | the glass dialog reads as ACTUAL liquid glass (partially transparent, iOS-27) | after BC.W-GLASS-IDENTITY |
| **BC.W-BUTTON-GLASS-IOS** | 1 | increased button glass-morphism, the iOS-27 `.glass`/`.glassProminent` register | after BC.W-BLACK-BAR |
| **BC.W-BLACK-BAR** | 1 | the card/dock top-edge dark rim → a bright catch-light (the D2 root) | FIRST of Band 1 |
| **BC.W-DESHADCN** | 1 (cross-cutting) | reka = BEHAVIOR / glass-ui = 100% of the MATERIAL (the shadcn-neutral skin abrogated at root + the `proof:no-shadcn-default` gate) | after BC.W-GLASS-IDENTITY + BC.W-BLACK-BAR; beside the per-band reskin owners |
| **BC.W-SELECTION-CARD** | 1 | the I5 `<Card variant="selection">` (the only NEW Atlas component; composes A-2 `--glass-accent` + A-3 metal-shimmer, no new sub-system) | after BC.W-GLASS-IDENTITY + BC.W-BLACK-BAR; re-verified by BC.W-VISUAL-RECONCILE |
| **BC.W-GLASS-GLOW-FIX** | 1 | the Atlas A-8 giant-radial-glow ROOT defect (the spurious unbounded halo killed) | after BC.W-GLASS-IDENTITY; beside BC.W-GLASS-PRUNE + the Band-4 viz waves |
| **BC.W-DOCK-ENGINE** | 2 | the buttery-smooth springy COMPOSITOR-ONLY dock morph (the ONE engine; kill `transition:all`) | FIRST of Band 2 |
| **BC.W-DOCK-ARBITRARY** | 2 | the dock animates into arbitrary sizes + shapes (compositor clip-path/scale morph register) | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-VERTICAL-FIX** | 2 | the vertical dock works + is CLICKABLE | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-COLLAPSED-BOTH** | 2 | vertical AND bottom dock collapsed states + a few tab items + persistent core controls | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-STACK-RAIL** | 2 | the macOS hover-expand stack rail (the chronic AZ→BA→BB rail, finally to spec) | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-SHRINK-BLUR** | 2 | the shrunken dock is CRISP, not a blurry mess (gate the resting self-blur to the morph only) | after BC.W-DOCK-ENGINE |
| **BC.W-LIQUID-MORPH** | 2 | the arbitrary-shape dock morph that is NEVER white, NEVER invisible (the D5 root; AY box-morph re-opened) | after BC.W-DOCK-ENGINE |
| **BC.W-TABS-IOS** | 3 | proper small glass PILLS, the iOS-27 segmented-control material | after Band 1 glass |
| **BC.W-LIQUID-TAB** | 3 | the LIQUID TAB: pull the active pill → it morphs, squishes, flings to location | after BC.W-TABS-IOS |
| **BC.W-UNDERLINE-TUNE** | 3 | the underline material retuned + audacious type + the abrupt indicator spring EASED | after BC.W-TABS-IOS |
| **BC.W-WEBGPU-EVERYWHERE** | 4 (cross-cutting) | WebGPU-first substrate everywhere, the picker that never crashes to black; the WGSL-compile + real-GPU-parity floor | FIRST of Band 4 |
| **BC.W-VIZ-INTERACTION** | 4 (cross-cutting) | every procedural background reacts to cursor + touch with velocity AND acceleration | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-CHOREOGRAPHY** | 4 (cross-cutting) | start · transition · end · restart on ONE keyframes.js clock | after BC.W-MOTION-ONE-CLOCK |
| **BC.W-VIZ-CONFIGURATOR-SUITE** | 4 (cross-cutting) | the shared full-configurator + comprehensive-demo-suite discipline per viz | with the per-viz waves |
| **BC.W-TEAL-NAVY-PURGE** | 4 (cross-cutting) | remove the teal-on-navy reference entirely; warm-cream is the identity | cross-cutting |
| **BC.W-VIZ-AURORA** | 4 | aurora WGSL-primary painterly field, perf-restored, configurator-on-RIGHT, pointer-warps (incl. the kuwahara/medium WGSL bodies) | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-GOOBLOB-PLAIN** | 4 | goo-blob STAGE 1: just a clean blob, from first principles, Safari-OK | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-GOOBLOB-MEATBALL** | 4 | goo-blob STAGE 2: + shadowing + meatball merge + lit-glass, hover-interactive, Safari-OK | after BC.W-GOOBLOB-PLAIN |
| **BC.W-VIZ-DOTFLOW** | 4 | the dot-flow field RETOPOLOGIZED: an anchored dot-matrix that LARGE sweeping waves move through | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-CONCENTRIC** | 4 | concentric ELLIPSOID LINES that beat into distinct waves (isoline strokes, not a smooth-field blur) | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-FOURIER** | 4 | collapse the duplicate fourier views to ONE; the reconstructing-epicycle curve on WGSL, scrub-to-rewind | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-CONSTELLATION** | 4 | the constellation lattice re-homed onto WebGPU: crisp SDF circles + instanced lines, in a card, pointer-attraction | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-WATERCOLOR** | 4 | the watercolor-dot mark: the ghost → a DASHED blob-silhouette outline, the SVG filter Safari-safe + per-instance unique | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-PAPERGRID** | 4 | the liquid paper-grid: evenly-spaced LARGER lines on a slowly breathing curl-flow sheet, suffusable site-wide | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-GRID-SIMPLE** | 4 | abrogate the blurry in-card grid → ONE crisp, evenly-spaced, LARGER, full-bleed page grid (pure CSS, no GL) | after BC.W-PAGE-CHASSIS + beside BC.W-VIZ-PAPERGRID |
| **BC.W-VIZ-DOTMATRIX** | 4 | the dot-matrix SPHERE: a fine-dot phyllotaxis globe, depth-shaded, slowly rotating, pointer-aware (NEW) | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-HYBRID** | 4 | the goo+dot-matrix HYBRID: a metaball SDF field sampled as a dot-matrix, dense+bright inside the merged blob (NEW) | after BC.W-GOOBLOB-MEATBALL + BC.W-VIZ-DOTMATRIX |
| **BC.W-VISUAL-RECONCILE** | 4 (cross-cutting) | the BB liquid-glass-band LIVE re-walk over the rebuilt floor (liquid-reveal/lensing/liquidhover/press-unify/card-composite/metal-shimmer re-verify) + the /display/buttons interaction diagnosis | after the Band-1 glass waves + BC.W-GESTALT-FIRST |
| **BC.W-PAGE-CHASSIS** | 5 | the ONE standardized page idiom: audacious hero + subpath + scroll-shrink + ONE glass card + procedural bg | after Band 1 glass |
| **BC.W-PAGE-HIERARCHY** | 5 | section delimiting (hr / sub-card) + design-hierarchy suffused, EVERY PAGE STANDARDIZED | after BC.W-PAGE-CHASSIS |
| **BC.W-CODE-BLOCKS** | 5 | component names + technical values → ONE Fira Code code-block register | after BC.W-PAGE-CHASSIS + BC.W-PAGE-HIERARCHY |
| **BC.W-PAGE-PRUNE** | 5 | prune superfluity, kill "view source"/platitudes/out-of-date copy + the orphan routes | before BC.W-PAGE-CHASSIS + BC.W-PAGE-HIERARCHY (FIRST of Band-5 re-author) |
| **BC.W-DEMO-COPY-PRUNE** | 5 | de-jargon the user-facing demo copy (9 leaky blurbs + the changelog section) + kill the view-source SUBSYSTEM (useSourceLoader + Story.sourceFiles) + the orphan scaffolds (useStoryDemo + ToneSwatch); EXTENDS BC.W-PAGE-PRUNE (shared PRUNE-LEDGER) | beside/after BC.W-PAGE-PRUNE; before BC.W-PAGE-CHASSIS/BC.W-PAGE-HIERARCHY/BC.W-CODE-BLOCKS |
| **BC.W-HERO-AUDACIOUS** | 5 | the herostudios audacious-type heroes, per-category icons, each DISTINCT | after BC.W-PAGE-CHASSIS |
| **BC.W-COMPOSITIONS-HERO** | 5 | /compositions/hero made distinct from the homepage; /foundations/intro three-heroes → ONE | after BC.W-HERO-AUDACIOUS |
| **BC.W-PADDING-CANON** | 5 | the golden padding ladder MADE TO PAINT; /display/card every-card-right; dialog padding | after BC.W-PAGE-CHASSIS |
| **BC.W-GHOST-DASHED** | 5 | the ONE ghost/empty-slot dashed register + rounded-everywhere-it-should-be | after BC.W-PAGE-HIERARCHY |
| **BC.W-EXPANDABLE-PART** | 5 | the ExpandableContainer `::part()`/named-slot expand-fullscreen chrome hook (the Atlas AR-7 seam; no consumer fork; Card-is-the-only-new-component fence) | after BC.W-GLASS-IDENTITY + BC.W-GLASS-PRUNE + BC.W-PADDING-CANON; before BC.W-ATLAS-ASK |
| **BC.W-SEPARATOR-FIX** | 5 | the Separator label-centering rebuilt + the /display/separator page re-authored | after BC.W-PAGE-HIERARCHY |
| **BC.W-RADIO-FIX** | 6 | radios toggle on every input path + read a clear glass selected-state | after Band 1 glass |
| **BC.W-DROPDOWN-FIX** | 6 | the picker opens without shifting the trigger, aligns to it, and the selected dot reads | after Band 1 glass |
| **BC.W-CONTROL-SMOOTH** | 6 | kill the control lag (quick coupled response) + square borders → rounded | after BC.W-SPRING-EASE + BC.W-AFFORDANCE-MAP |
| **BC.W-CONFIG-RIGHT** | 6 | every configurator: stage left, controls RIGHT on desktop (standardized two-column) | after BC.W-RADIO-FIX + BC.W-DROPDOWN-FIX + BC.W-CONTROL-SMOOTH (the Band-4 viz studios are the consumers verified after this lands) |
| **BC.W-MOTION-ONE-CLOCK** | 7 | keyframes.js is the ONE source + clock for every sophisticated animation | FIRST of Band 7 |
| **BC.W-SPRING-EASE** | 7 | every spring squishy/quick/coupled-fade; the abrupt curves eased | after BC.W-MOTION-ONE-CLOCK |
| **BC.W-AFFORDANCE-MAP** | 7 | interaction affordances baked into EVERY interactive element | after BC.W-SPRING-EASE + BC.W-MOTION-ONE-CLOCK |
| **BC.W-TUNABLE-ANIM** | 7 | the tunable-animation brainstorm + the live registry | after BC.W-MOTION-ONE-CLOCK |
| **BC.W-SAFARI-WEBGL** | 8 | the cross-engine WebGL/WebGPU context lifecycle: the Safari flash KILLED, the liquid morph stable on WebKit | after BC.W-WEBGPU-EVERYWHERE + Band 2 |
| **BC.W-STORYBOOK-META** | 9 | the frontend-design meta-pass over the storybook ITSELF (padding/usability/spacing/occlusion/fontsize/idiom + the DOGFOOD-completeness axis: raw-triplet/raw-button/SHELL sweep + the StorySectionHeader mint) | after Bands 1-7 |
| **BC.W-SPEEDTEST-ADOPT** | 10 | the speedtest fleet adopt: ^4.x bump + the 5-interim consume-and-delete sweep + the AW v3 relay reconcile | EXECUTION-phase, after BC.W-CUT |
| **BC.W-FOURIER-ASK** | 10 | the fourier cross-repo reconcile: NO outbound ask + the fourier-analysis ^4.0.0 consumer bump + FourierField warm-lean pointer | EXECUTION-phase, after BC.W-CUT |
| **BC.W-ATLAS-ASK** | 10 | the sci-report Atlas adopt: the d6-lineage stranded consumer ^3.12.0(deprecated)→^4.x + the seven-needs consume-and-delete | EXECUTION-phase, after BC.W-CUT; ‖ BC.W-SPEEDTEST-ADOPT + BC.W-FOURIER-ASK |
| **BC.W-DECK** | 10 | BUILD the `@mkbabb/glass-ui/deck` sibling subpath: lift slides/src/deck/ (~1108 LoC headless core) into the full-viewport keyboard-paged aria-live PRESENTATION register (the single largest UNBUILT cross-repo ask) | BUILD-phase; after Band 0 + Band-2 dock + Band-3 PagerDots; BEFORE BC.W-CUT + BC.W-SPEEDTEST-ADOPT |
| **BC.W-DIST-COMMENT-FIX** | 10 | CONFIRM the 4.0.1 dist-CSS comment fix landed + harden the source-side comment-balance guard | EARLY (Band 5/10 convergence) |
| **BC.W-CUT** | 10 | the honest 4.x cut: `--run full` siblings-absent → gated-provenance tag → consumer adopt sweep + slides redeploy | EXECUTION-phase only, user-gated; LAST |
| **BC.W-CSS-CRITICAL** | 11 (PERFORMANCE) | the published `/styles` critical/deferred split (render-blocking-early subset) RE-MEASURED over the settled cascade + the FOUC-safe π RUN LIVE; discharges the `styles-critical-split` chronic | FIRST of Band 11; after the visual bands settle the cascade |
| **BC.W-LIGHTHOUSE** | 11 (PERFORMANCE) | the committed re-runnable production-preview Lighthouse score-floor (perf/a11y/CLS/TBT, :5388) RUN LIVE + re-pinned via `--rebaseline` + the bare-consumer first-paint harness | after BC.W-CSS-CRITICAL + BC.W-PERF-PRODUCER + the visual bands |
| **BC.W-PERF-PRODUCER** | 11 (PERFORMANCE) | lock the four producer fixes (dock contain/deferReposition, GooBlob one-canvas+dispose, aurora sub-2×-DPR cap, density glyph) + RUN the headed-GPU runtime π | after Band 2 dock + Band 4 aurora/blob rebuilds |
| **BC.W-CUSTOMIZABILITY-CENSUS** | 12 (customizability + golden-defaults) | the binding "fully customizable with golden defaults" bar + the structural gate `proof:customizability-census` (C1-C4) + the per-component EXACTLY-ONE-LIST census + design-idioms §13 | FIRST of Band 12; after Band 1 glass floor (BC.W-GLASS-IDENTITY); beside BC.W-DESHADCN |
| **BC.W-CONTROL-CUSTOM** | 12 (customizability + golden-defaults) | the shared control `size?: "sm"\|"default"\|"lg"` axis reading the `--control-h-*`/`--control-text` cohort onto the input register (Input/Switch/Textarea/NumberField); flips `proof:customizability-census` C1 GREEN | after BC.W-CUSTOMIZABILITY-CENSUS + BC.W-GLASS-IDENTITY; beside BC.W-DESHADCN + BC.W-CONTROL-SMOOTH |
| **BC.W-OVERLAY-UNIFORM** | 12 (customizability + golden-defaults) | thread the shared `surface` axis + the φ `--overlay-pad-*` ladder onto the un-threaded floating overlays (Dropdown/Select/Tooltip/ContextMenu/Command/HoverCard); flips `proof:customizability-census` C2 GREEN | after BC.W-CUSTOMIZABILITY-CENSUS + BC.W-GLASS-IDENTITY; beside BC.W-DROPDOWN-FIX + BC.W-DESHADCN |
| **BC.W-SEARCH-CUSTOM** | 12 (customizability + golden-defaults) | the SearchBar/FuzzySearch first-principles CUSTOMIZATION + glassify surface (de-shadcn'd onto the house registers): size/surface/variant axes + token-backed icon/button/result magnitudes + the `.glass-menu-row` result register + the glass expand modal + the φ overlay-pad ladder + the `variant="bare"/"floating"` rung DELETING the `!important`-fighting-CVA escape; flips `proof:customizability-census` C3 GREEN + `proof:search-custom` | after BC.W-CUSTOMIZABILITY-CENSUS + BC.W-GLASS-IDENTITY; beside BC.W-DESHADCN; boundary-peer BC.W-DOCK-SEARCH + BC.W-FUZZY-HARDEN (the matcher byte-fenced) |
| **BC.W-SCROLL-TRIGGER** | 13 (dock-search + scroll-system) | the robust scroll-EVENT / trigger-point system — ONE rAF-coalesced reader, discrete onCross + continuous progress, dual-path single-writer (`useScrollTrigger` on /motion-core) | FIRST of Band 13; no deps (threads the existing scroll leaves) |
| **BC.W-SCROLL-CHROME** | 13 (dock-search + scroll-system) | the scroll-driven chrome behaviors (shrink-on-down, expand-on-up, opacity/blur-on-scroll, snap-to-state, persistent-by-default — `useScrollChrome`) | after BC.W-SCROLL-TRIGGER; before BC.W-DOCK-SEARCH |
| **BC.W-DOCK-SEARCH** | 13 (dock-search + scroll-system) | the DOCK as native dynamic-search-bar (the iOS-27 chrome-becomes-search-field morph; subsuming the words SearchBar) — composes the dock morph + FuzzySearch + virtual-window + ToC, box-inviolate | LARGEST of Band 13; after BC.W-SCROLL-CHROME/TRIGGER + BC.W-FUZZY-HARDEN + BC.W-VIRTUAL-WINDOW + BC.W-TOC-RECONCILE + BC.W-DOCK-ENGINE |
| **BC.W-VIRTUAL-WINDOW** | 14 (latex-paper abstractions) | the homecoming — re-mint the virtualized-section-windowing primitive RETIRED at v1.0 (the words verbatim copy returns) onto /virtual (off the root barrel); ≥2 consumers (words + dock-search) | FIRST of Band 14; after Band 0; before BC.W-DOCK-SEARCH + BC.W-CUT |
| **BC.W-TOC-RECONCILE** | 14 (latex-paper abstractions) | reconcile the 3-way ToC-tracking fork onto the ONE glass-ui/sidebar + ADD the three missing leaves (useScrollTo/useClickDelegate/useLazyLoader); NO re-mint, no second engine | after BC.W-VIRTUAL-WINDOW + Band 0; before BC.W-DOCK-SEARCH + BC.W-CUT |
| **BC.W-FUZZY-HARDEN** | 14 (latex-paper abstractions) | glass-ui/search is ALREADY the canonical client fuzzy pipeline — harden the dock-composable-ready surface + DECIDE the `useAsyncSearch` race-guard (one-directional, no scorer edit) | after Band 0; before BC.W-DOCK-SEARCH + BC.W-CUT; ‖ BC.W-VIRTUAL-WINDOW/TOC-RECONCILE |
| **BC.W-AX-METAL-GLOW** | 15 (speedtest-AX absorption) → builds in Band 1 (glass + brand-metal) | the gold catch-light: `--metal-glow-blur`/`--metal-glow-opacity` on the BB.W-METAL-SHIMMER family (the gold reads as lit metal; an additive catch-light, no new utility) | EXTENDS BB.W-METAL-SHIMMER; after BC.W-GLASS-IDENTITY; before BC.W-AX-COMPLETION-SEAL + BC.W-VISUAL-RECONCILE + BC.W-SPEEDTEST-ADOPT |
| **BC.W-AX-LIQUIDHOVER-AUTOARM** | 15 (speedtest-AX absorption) → Band 1 (glass) | the tier-root specular auto-arm — STRUCK-ALREADY-SHIPS (a RECORD + routing note, no build); the live re-verify rides BC.W-VISUAL-RECONCILE unit 2 | N/A (no build); the §6 out-of-scope re-verify rides BC.W-VISUAL-RECONCILE |
| **BC.W-ACCENT-TONE** | 15 (speedtest-AX absorption) + 16 (fourier) → Band 1/12 (glass+color × customizability) | the contrast-floored 3-channel tonal-accent register (one `--tone` → idle/active/edge/ink via value.js `safeAccentColor`) + `<SelectableChip>`; folds the fourier #3 SelectableChip + #13 `--viz-amber` rebaseline | after BC.W-GLASS-IDENTITY + the no-gray OKLab floor; beside BC.W-CONTROL-CUSTOM (the `_shared/` form home) + the prior-tranche W-SUFFUSE IconChip vehicle (DISTINCT) |
| **BC.W-AX-DOCK-CTA-SEAT** | 15 (speedtest-AX absorption) → builds in Band 2 (dock) | the CTA-receive landing SEAT: `[data-cta-pending]` partial + un-gated resting geometry + the FLIP reveal + `setPending()`/`clearPending()` on `useDockCtaReceive` + the `/dock` re-export (folds AX intake BC-W3) | after BC.W-DOCK-ENGINE + BC.W-BLACK-BAR/BC.W-ADAPTIVE-RECONCILE; a CONSUMING seam BESIDE BC.W-DOCK-ENGINE (no orchestrator edit); before BC.W-SPEEDTEST-ADOPT |
| **BC.W-AX-DOCK-COCKPIT** | 15 (speedtest-AX absorption) → builds in Band 2 (dock) | the `cockpit` dock preset: a fixed 2.75rem control floor + `--dock-label-ratio` (closes the dock-oversize chronic with the speedtest A-9 ask; threads Gate-1 Q6) | after BC.W-DOCK-ENGINE + BC.W-DOCK-ARBITRARY/BC.W-DOCK-COLLAPSED-BOTH; beside dock/density.css; before BC.W-SPEEDTEST-ADOPT |
| **BC.W-AX-COMPLETION-SEAL** | 15 (speedtest-AX absorption) → builds in Band 6 (feedback) | the hero-scale earned-GOLD completion seal: a one-shot gold-draw mark + 4 `@property` motion tokens reading W-PHASE-PALETTE `--phase-complete-color`/`--color-gold` (threads Gate-1 Q2; `/completion-seal` subpath) | after BC.W-AX-METAL-GLOW (the gold glint) + BC.W-GLASS-IDENTITY; before BC.W-SPEEDTEST-ADOPT |
| **BC.W-AX-METRIC-HOVER** | 15 (speedtest-AX absorption) → builds in Band 12 (customizability) | the metric-badge value-lift: `--metric-badge-hover-translate` (-2px) + scale 1.04 + `--shadow-cartoon-sm` (a small lift on the EXISTING `.metric-badge:hover`, no new authoring) | beside the Band-12 customizability waves; after BC.W-GLASS-IDENTITY; before BC.W-SPEEDTEST-ADOPT |
| **BC.W-AX-BP-LAZY** | 15 (speedtest-AX absorption) → builds in Band 11 (perf) | BorderProgress eager-graph-safe: the value.js spectrum walk behind a dynamic `import()` boundary; `spectrumStops` stays sync; the `var()` fast path value.js-free (folds AX intake BC-W1) | after the BorderProgress visual repair; beside BC.W-PERF-PRODUCER/BC.W-CSS-CRITICAL; before BC.W-SPEEDTEST-ADOPT |
| **BC.W-SPLIT-CHARS** | 16 (cross-repo: fourier) → builds in Band 7 (motion) | the per-glyph split JS partner: `useCharStagger` + `<SplitChars>` with `--char-index`/`--char-total` + the MANDATORY accessible full-text label (the JS partner to the shipped `.char-stagger` CSS; the fourier #6 fold) | beside BC.W-MOTION-ONE-CLOCK (the per-spring clock) + BC.W-MOTION-PRESETS; engine-free → /motion-core |
| **BC.W-MOTION-PRESETS** | 16 (cross-repo: fourier) → builds in Band 7 (motion) | the convergence-reveal motion preset (the brand "partial-sum settle"; prefer the `gentle` reuse) + the `[data-scroll-reveal]` `once` latch (folds fourier #5 + #8) | after BC.W-MOTION-ONE-CLOCK + BC.W-SPRING-EASE; beside BC.W-SCROLL-TRIGGER (the `once` latch CSS-recipe edit, file-disjoint at the seam) |
| **BC.W-FOURIER-DECIDES** | 16 (cross-repo: fourier) → Band 12/14 (customizability + process) | the three DECIDE-or-BOOK fourier asks: AtomDiff BOOK (#4) · canvas-anchored-overlay BOOK (#7) · tier-class-staleness BUILD-as-gate (#12, extends `proof:consumer-staleness`) | independent of the Band-1/2/4 surfaces; pairs with BC.W-FOURIER-ASK (DISJOINT — that wave owns the in-repo demo defect + the `^4.0.0` bump) |

---

## Name-drift map (the drifted names the iteration-2 fan-out referenced → the canonical on-disk wave)

The Band-0 / deferral-fold / PM-wrapper / PROMPT-LEDGER authoring referenced disposition names that
do NOT exist on disk. iteration-3 RECONCILE replaced each with the canonical wave(s) above. Recorded
here so a future reader knows the lineage (the drift was a naming slip, not a dropped wave — except
`BC.W-VISUAL-RECONCILE`, the one genuine gap).

| drifted name | reconciled → | rationale |
|---|---|---|
| `BC.W-VIZ-LIVE` (per-viz live-paint half) | the per-viz wave (`BC.W-VIZ-AURORA` / `BC.W-GOOBLOB-PLAIN`+`BC.W-GOOBLOB-MEATBALL` / `BC.W-VIZ-FOURIER` / `BC.W-VIZ-WATERCOLOR` / …) | "verify viz LIVE" was authored as one umbrella; the PLAN split the per-viz LIVE-PAINT verify into the 11 per-viz Band-4 waves (each captures its OWN paint per `BC.W-GESTALT-FIRST`) |
| `BC.W-VIZ-LIVE` (Safari context-lifecycle half) | `BC.W-SAFARI-WEBGL` | the iteration-2 viz bodies (GOOBLOB-PLAIN/MEATBALL line 3, VIZ-AURORA, VIZ-HYBRID) named `BC.W-VIZ-LIVE` specifically as the home of the Safari `webglcontextlost` lifecycle / the §H flash circuit-breaker (D7/§H) — that lifecycle is owned by Band-8 `BC.W-SAFARI-WEBGL`, NOT the per-viz waves and NOT `BC.W-WEBGPU-EVERYWHERE`. The HARDEN pass (iteration 4) renamed every `BC.W-VIZ-LIVE` Safari-lifecycle body reference to `BC.W-SAFARI-WEBGL` and made the Band-4-viz→Band-8-SAFARI cross-band Safari-π dependency explicit (the no-flash arm GATES on the breaker landing). |
| `BC.W-WGSL-FALLBACK` | `BC.W-WEBGPU-EVERYWHERE` | the async-adapter-real picker + try-then-rebuild WebGPU→WebGL2 graceful-degrade (the D8 "no GPU adapter" crash close) folded into the substrate-everywhere wave. The iteration-2 fan-out named the phantom `BC.W-WGSL-FALLBACK` as the Sequence-predecessor / fold / byte-fence home in 11 Band-4 viz bodies; the HARDEN pass (iteration 4) renamed every body reference to `BC.W-WEBGPU-EVERYWHERE` (collapsing the dual `WGSL-FALLBACK`+`WEBGPU-EVERYWHERE` Sequence mentions into ONE — the picker + the WGSL-primary mandate both live in WEBGPU-EVERYWHERE). |
| `BC.W-CROSSREPO-ADOPT` | `BC.W-SPEEDTEST-ADOPT` + `BC.W-FOURIER-ASK` + `BC.W-ATLAS-ASK` (+ `BC.W-CUT` for the slides leg) | the Band-10 cross-repo adopt is the THREE per-sibling waves + the cut, not one wave |
| `BC.W-CHRONIC-FOLD` | `BC.W-FOLD-LEDGER` | the chronic-fold machine arm IS the FOLD-LEDGER wave (mints FOLD-LEDGER.json) |
| `BC.W-DECK-BUILD` | `BC.W-DECK` | the /deck subpath build wave landed as `BC.W-DECK` |
| `BC.W-WGSL-COMPILE-GATE` | `BC.W-WEBGPU-EVERYWHERE` (+ `BC.W-SAFARI-WEBGL` for the cross-engine arm) | the headless WGSL-compile floor folded into the WebGPU-everywhere substrate wave |
| `BC.W-GPU-PARITY-REAL` | `BC.W-WEBGPU-EVERYWHERE` | the real-swap-chain readback (retire the ΔE-0.0 tautology) folded into the WebGPU-everywhere wave |
| `BC.W-CONSTELLATION` | `BC.W-VIZ-CONSTELLATION` | the constellation viz wave |
| `BC.W-FOURIER-ONE` | `BC.W-VIZ-FOURIER` | the "ONE fourier view" demo redesign IS the fourier viz wave (the `research/` corpus — `WAVE-IMPACTS.md` / `route-census.md` / `cross-repo-asks.md` — still names it; the doc is a FROZEN historical artifact per the exempt clause above, the binding `FOURIER-ASK.md` + `DEFERRAL-LEDGER` use the canonical id throughout) |
| `BC.W-CONCENTRIC-LINES` | `BC.W-VIZ-CONCENTRIC` | the concentric-ellipsoid-lines viz redesign IS the concentric viz wave (named in `research/WAVE-IMPACTS.md` + `research/route-census.md` — FROZEN historical artifacts, the binding docs use `BC.W-VIZ-CONCENTRIC`) |
| `BC.W-DOTFLOW-WAVES` | `BC.W-VIZ-DOTFLOW` | the dot-flow-waves retopologize IS the dot-flow viz wave (named in `research/WAVE-IMPACTS.md` + `research/route-census.md` — FROZEN historical artifacts, the binding docs use `BC.W-VIZ-DOTFLOW`) |
| `BC.W-GOOBLOB-FIRSTPRINCIPLES` | `BC.W-GOOBLOB-PLAIN` + `BC.W-GOOBLOB-MEATBALL` | the goo-blob from-first-principles rebuild is the two-stage pair |
| `BC.W-SLIDES` | `BC.W-CUT` | the slides redeploy is an EXECUTION-phase clause of the cut wave |
| `BC.W-DECK-BUILD` (deck page-turn) | `BC.W-DECK` | the deck PAGE-TURN primitive lands inside the /deck build |
| `BC.W-LEAF-MODERNIZE` / `BC.W-CONSUMER-MODERNIZE` | `BC.W-SPEEDTEST-ADOPT` / `BC.W-FOURIER-ASK` / `BC.W-ATLAS-ASK` | the leaf/consumer modernization is driven by the three per-sibling adopt waves |
| `BC.W-DEPLOY` | `BC.W-CUT` | the deploy is an EXECUTION-phase clause of the cut wave |
| `BC.W-DEMO-DESIGN` | `BC.W-STORYBOOK-META` | the demo-design / storybook-meta pane work |
| `BC.W-CARD-PAD` (as a BC disposition) | `BC.W-PADDING-CANON` | `W-CARD-PAD` is the BB wave name; the BC padding-ladder wave is `BC.W-PADDING-CANON` |
| `BC.W-AUDIT` (PM-BA prose) | n/a (the iteration-0 audit commit `e1b4b44c`) | NOT a wave — a pre-fix commit label from the iteration-0 `bc-audit.mjs` run; reworded to name the commit, not a phantom wave |
| `BC.W-VISUAL-RECONCILE` | **`BC.W-VISUAL-RECONCILE` (AUTHORED — Band 4, iteration-4 HARDEN)** | the PLAN-§64 gap is CLOSED: iteration-4 authored the dedicated Band-4 wave (the BB liquid-glass-band live re-walk: liquid-reveal/lensing/liquidhover/press-unify/card-composite/metal-shimmer/on-glass-fg/invalid-ring/eyebrow-union re-verify over the rebuilt floor) + it is the CONDITIONAL re-open home for the USER-DEFECTS §C buttons defect (`BC.W-BUTTON-GLASS-IOS` (Band 1, runs FIRST) OWNS the live INTERACTION diagnosis + the fix-if-dead + the BG-IOS-5 gate; it does NOT punt — this wave re-opens the §C residual ONLY IF that Band-1 fix did not hold over the rebuilt floor) + the BC.W-DIALOG-GLASS lines 60-61 overlay re-walk residual. The dispositions that map to a SPECIFIC band wave STAY re-pointed (menu-glass→Band 1 glass, easing→`BC.W-VIZ-FOURIER`/motion, demo-config→`BC.W-STORYBOOK-META`); the residual "BB visual-band reconcile" home is now this real wave (no longer a CHALLENGE gap — F2 resolves on it). |
| `BC.W-CSS-CRITICAL` / `BUILD (Band 8/perf)` / `Band 4 controls/reconcile` (the perf-chronic band-only dispositions) | **the Band-11 perf trio `BC.W-CSS-CRITICAL` + `BC.W-LIGHTHOUSE` + `BC.W-PERF-PRODUCER` (AUTHORED — iteration-4 HARDEN)** | the 3-4-tranche perf chronic (`w-lighthouse-perf` / `styles-critical-split` / the BB Batch-3 perf band) was disposed BUILD against the SAFARI band (Band 8) or a band-only "Band 8/perf" / "Band 4 controls/reconcile" with NO building wave (CHALLENGE-1 BLOCKER 4/5/7). iteration-4 authored Band 11 — PERFORMANCE: `BC.W-CSS-CRITICAL` (the `/styles` split, the `styles-critical-split` discharge — FOLD-LEDGER F7's destination is now real), `BC.W-LIGHTHOUSE` (the live score-floor + `--rebaseline`), `BC.W-PERF-PRODUCER` (the four producer fixes + the runtime π). Re-point every perf-chronic ledger BUILD row + the FOLD-LEDGER F7 `styles-critical-split` destination onto these three. (kf-G3 LabeledField action-slot + machined-groove stay their controls/storybook homes — see the FOLD-LEDGER reconcile, not a perf row.) |
| `BC.W-DOCK-EDGE` (PLAN §54 "rim/border as catch-light, not the black hairline") | `BC.W-BLACK-BAR` | the card/dock top-edge dark-rim → bright-catch-light D2-root fix landed as `BC.W-BLACK-BAR` (the PLAN working-name; the authored wave folds the glass-rim fix) |
| `BC.W-PROMPT-LEDGER` (PLAN §69/§95 "every user prompt mapped to delivered/undelivered") | the `PROMPT-LEDGER.md` doc + the Band-F PM wrappers (`BC.W-PM-BB`/`BA`/`AZ`/`SYNTHESIS`) | NOT a separate on-disk wave — the prompt-recap deliverable IS the `PROMPT-LEDGER.md` document, authored by the Band-F post-mortem work; the dropped-asks ownership routes through the PM wrappers + the per-defect band waves |
| `BC.W-SEARCH-CUSTOM` | **`BC.W-SEARCH-CUSTOM` (AUTHORED — Band 12, the CHALLENGE pass).** The coverage gap is CLOSED: the CHALLENGE pass authored the dedicated Band-12 wave file (`waves/BC.W-SEARCH-CUSTOM.md`) — the SearchBar/FuzzySearch first-principles customization + glassify surface (size/surface/variant axes reading the `--control-*` cohort + the `Surface` axis + token-backed `--search-icon-size`/`--search-button-size`/`--search-result-text` magnitudes + the `.glass-menu-row` result register + the glass expand modal off `surface="opaque"` + the φ overlay-pad ladder + the `variant="bare"/"floating"` CVA rung DELETING the `!important`-fighting-CVA escape — the `CLEANUP-PLAN.md:105-106` A6/HOLD-4 fold discharged). It is the resolution of the THREE on-disk specs that name it as a Sequence-after / owner / boundary peer — `BC.W-CUSTOMIZABILITY-CENSUS` (C3 born-RED owner, flipped GREEN at this wave), `BC.W-DOCK-SEARCH` (the glassy search surface it composes), `BC.W-FUZZY-HARDEN` (the "FuzzySearch SURFACE glassify is NOT this wave's — it is BC.W-SEARCH-CUSTOM's" boundary; the matcher is byte-fenced). Mints `proof:search-custom` (SC1-SC5 born-RED→GREEN); F2 resolves on it (no longer a dangling reference). |

> Note on prior-tranche wave names: references like `W-DARK-MATERIAL`, `W-REFLECT3`, `W-CLOSE-BATTERY`,
> `W-VISUAL-RUNNER`, `W-CARD-PAD`, `W-AURORA-SWRASTER`, `W-MENU-GLASS`, `W-ON-GLASS-FG`, `W-CSS-CRITICAL`
> (NO `BC.` prefix, or with the `BC.` prefix only where they name a BC fold-SOURCE) are AX/AY/AZ/BA/BB
> tranche waves — they are the forensic SUBJECTS, not BC waves, and are correct as-is.
>
> Note on the dot-matrix REFERENCE-screenshot filename (CHALLENGE-7 C3, doc-hygiene): the §E dot-matrix
> reference is ONE on-disk capture — `docs/tranches/BC/audit/screenshots/Screenshot_2026-06-17_at_14.45.25.png`
> (re-saved `user-…14.45.25.png`), the verifiable form both `BC.W-VIZ-DOTFLOW`/`BC.W-VIZ-DOTMATRIX` cite.
> The `14.45.16` literal appears ONLY as the VERBATIM USER-DEFECTS quote (`audit/USER-DEFECTS.md:56` —
> `Downloads/Screenshot 2026-06-17 at 14.45.16.png`), preserved verbatim where the specs quote the defect;
> it is the SAME Downloads capture re-saved as `…14.45.25` (the reconciliation is recorded in
> `research/viz/dot-flow-field.md:34-36` + `research/viz/dot-matrix.md:6-9`). NOT a drift — one verifiable
> on-disk form, one verbatim quote; no wave/gate change.
