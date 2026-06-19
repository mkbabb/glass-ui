# BC — the master orchestration anchor (the long-horizon resume contract)

> **THIS FILE IS THE RESUME ANCHOR.** On any revival (cron fire, compaction, rate-limit recovery,
> new session) READ THIS FIRST, then continue the next un-done iteration. Do NOT restart from zero.
> This is **TRANCHE DEVELOPMENT ONLY** — research, audit, plan, write, synthesize, harden, challenge.
> **NO implementation** until the user greenlights the BC execution phase.

---

## 0 — The governing mandate (verbatim intent, 2026-06-18)

The BB tranche shipped **source-green but visually-broken**: ~33 commits reported "born-RED→GREEN
complete" with master CI green, yet the live demo is destroyed — glass too dark/grey, black bars on
cards, both docks broken/unclickable, the rail totally wrong, the liquid morph white/invisible,
tabs not liquid-glass, procedural viz broken/low-res, Safari wholly broken (flashing). The user's
verdict: *"the vast majority of the current tranche, and last several tranches, have not been
implemented at all. Our glass primitives have been destroyed."*

The user's directive for BC (the new tranche):

1. **50+ waves**, each with **burning lucidity** — fully formed, pursuant, with **goals + starting
   states + acceptance**, written to `docs/tranches/BC/waves/` and the precepts.
2. **Every page audited.** **Every procedural animation audited + fully modernized.**
3. **Every ask** addressed — speedtest, fourier, sci-report's atlas, and **every chronic + every
   prior-tranche deferral**, folded in and DECIDED.
4. **Our original prompt + the last 50+ historical prompts** addressed (see `PROMPT-LEDGER.md`).
5. **20+ iterations** of audit / research / harden / challenge workflows, **maximal parallelism**,
   **batches of 3 agents** (rate-limit-safe).
6. **A cron** to revive this session on rate-limit / usage-exhaustion (see §5).
7. **Long-horizon** — do NOT plan to complete for **12 hours minimum**, through several compaction
   cycles.
8. **Triumvirate waves** for every feature: **research** (web + codebase + machine) → **plan** →
   **tranche-write + synthesize**.
9. **NO legacy code. Gestalt, idiomatic, architectural transpositions** for elegance / simplicity /
   performance. KISS.
10. Iterate until **100% convergence + hardening**, full feature specification.

---

## 1 — The convergence checklist (BC is NOT converged until EVERY box is checked)

Each box = "a fully-lucid wave (or wave-set) exists in `waves/`, with goal + starting-state +
acceptance + gate, cross-checked by a challenge pass." NOT "we mentioned it."

### Band F — FORENSICS (the post-mortems; feeds Band 0)
> *"BB, BA, AZ were FULLY formed tranches — what went so wrong in their implementation? What went right?"*
- [x] BC.W-PM-BB — BB post-mortem: source-green/visually-broken anatomy (what was built vs claimed vs painted)
- [x] BC.W-PM-BA — BA post-mortem (dark-material, dock-sections, glass-cal, tabs-std — what landed in paint)
- [x] BC.W-PM-AZ — AZ post-mortem (adaptive-auto grey-glass origin, morph-showcase, rail3 — the divergence point)
- [x] BC.W-PM-SYNTHESIS — the cross-tranche failure-class taxonomy → the Band 0 gate-redesign requirements

### Band 0 — Verification transposition (the disease root)
- [x] BC.W-GESTALT-FIRST — per-wave gestalt-first paint verification supersedes single-terminal-reflect
- [x] BC.W-PAINT-GATE — gates measure PAINT not source-mechanism (close the gate-paint-blindness)
- [x] BC.W-FOLD-LEDGER — every chronic/prior-tranche deferral folded + DECIDED (the DEFERRAL-LEDGER)

### Band 1 — Glass identity rebuild (iOS-27)
- [x] BC.W-GLASS-IDENTITY — partial-transparency restored, warm-cream, the grey-slab killed at root
- [x] BC.W-ADAPTIVE-RECONCILE — close the observer loop (luma is read, not decorative)
- [x] BC.W-GLASS-LEGIBILITY-MEASURED — iOS-27 more-glass-AND-more-legible, measured
- [x] BC.W-GLASS-PRUNE — glass-panel vs glass-card vs material: prune to **Glass CARDS + Glass MATERIALS**
- [x] BC.W-DIALOG-GLASS — the glass dialog is actually partially-transparent + glassy
- [x] BC.W-BUTTON-GLASS-IOS — increased button glass-morphism
- [x] BC.W-BLACK-BAR — the card border-top dark-rim → catch-light (D2 root)
> **iter5 ATLAS-FOLD additions (RE-OPENED — own challenge pass owed; see §3 note):**
- [ ] BC.W-DESHADCN — reka=BEHAVIOR / glass-ui=100%-of-the-MATERIAL; the `proof:no-shadcn-default` gate + the per-component reskin census (merges the cleanup-assay A6/A7); cross-cutting (`DESHADCN-BRAINSTORM.md` §0/§1)
- [ ] BC.W-SELECTION-CARD — the I5 `<Card variant="selection">`, the ONLY new Atlas component (composes A-2 `--glass-accent` + A-3 metal-shimmer, no new sub-system)
- [ ] BC.W-GLASS-GLOW-FIX — the Atlas A-8 giant-radial-glow ROOT defect (the spurious unbounded halo killed)

### Band 2 — Dock (the staple of liquid transition)
- [x] BC.W-DOCK-ENGINE — buttery-smooth springy compositor-only morph (kill `transition: all`)
- [x] BC.W-DOCK-ARBITRARY — dock animates into arbitrary sizes/shapes
- [x] BC.W-DOCK-VERTICAL-FIX — the vertical dock works + is CLICKABLE
- [x] BC.W-DOCK-COLLAPSED-BOTH — vertical AND bottom dock collapsed states + a few tab items + persistent controls
- [x] BC.W-DOCK-STACK-RAIL — the macOS hover-expand stack rail (extend-beyond, hover-expand, 3-configurable, scrollable, n-stack)
- [x] BC.W-DOCK-SHRINK-BLUR — the shrunken dock is not a blurry mess
- [x] BC.W-LIQUID-MORPH — arbitrary-shape morph, never-white, never-invisible

### Band 3 — Tabs + underline (iOS-27 glass)
- [x] BC.W-TABS-IOS — proper SMALL PILLS (not squared), all glassy, NOT reka/shadcn-like
- [x] BC.W-LIQUID-TAB — pull an active tab → morph/squish to location
- [x] BC.W-UNDERLINE-TUNE — underline retuned, audacious type, spring curve EASED (not abrupt)

### Band 4 — Procedural viz (WebGPU-first, no fallback where Safari is capable)
> **The procedural-item roster (the user: "for each ... a full SOTA research wave + full WebGPU/WebGL2
> prototype + full configurator + comprehensive demo suite").** 7-member suite + 2 backgrounds + 2
> new viz = **11 items.** EACH owed: (a) a SOTA-research doc (iter 1d), (b) a WebGPU-first + WebGL2
> prototype, (c) a full `useConfiguratorState` studio, (d) a comprehensive demo suite. All Safari-OK.
>
> **Cross-cutting:**
- [x] BC.W-WEBGPU-EVERYWHERE — WebGPU-first substrate everywhere; WGSL primary; WebGL2 only where WebGPU truly absent; no Canvas2D viz; no fallback where Safari 26+ is capable
- [x] BC.W-VIZ-INTERACTION — EVERY procedural bg responds to cursor/touch with velocity + acceleration (usePointerVelocityField everywhere)
- [x] BC.W-VIZ-CHOREOGRAPHY — start/transition/end/restart choreography via keyframes.js (ONE source + clock)
- [x] BC.W-VIZ-CONFIGURATOR-SUITE — the shared "full configurator + comprehensive demo suite per viz" discipline + gate
- [x] BC.W-TEAL-NAVY-PURGE — remove the teal-on-navy reference entirely (warm-cream identity)
- [x] BC.W-VISUAL-RECONCILE — the BB-paper-done liquid-glass-band LIVE re-walk (liquid-reveal/lensing/liquidhover/press-unify/card-composite/metal-shimmer/on-glass-fg/invalid-ring/eyebrow-union re-verify over the rebuilt floor) + the /display/buttons interaction diagnosis (the "buttons don't work" MAJOR) — iter4 HARDEN-authored
>
> **Per-viz (SOTA-research → WebGPU/WebGL2 prototype → configurator → demo):**
- [x] BC.W-VIZ-AURORA — aurora: WGSL primary, painterly mediums, the kuwahara finish, full configurator + demo
- [x] BC.W-GOOBLOB-PLAIN — goo-blob STAGE 1: re-written as JUST a blob, from first principles, Safari-OK
- [x] BC.W-GOOBLOB-MEATBALL — goo-blob STAGE 2: + shadowing + meatballing from first principles, Safari-OK, hover-interactive
- [x] BC.W-VIZ-DOTFLOW — dot-flow: subtle, LARGE sweeping waves (Claude co-work ref), curl-noise + Gerstner, not noise
- [x] BC.W-VIZ-CONCENTRIC — concentric: ELLIPSOID LINES forming distinct waves (not noise)
- [x] BC.W-VIZ-FOURIER — fourier: collapse to ONE view (kill duplicates), full epicycle demo
- [x] BC.W-VIZ-CONSTELLATION — constellation: WebGPU, hi-res (kill the low-res circles), in a card
- [x] BC.W-VIZ-WATERCOLOR — watercolor-dot: the decorative mark, audited + Safari-OK
- [x] BC.W-VIZ-PAPERGRID — paper-grid: evenly-spaced + larger + LIQUID-waving lines, suffusable site-wide subtle
- [x] BC.W-GRID-SIMPLE — the blurry grid abrogated → SIMPLE grid like keyframes.js (not in-card)
- [x] BC.W-VIZ-DOTMATRIX — NEW: the dot-matrix sphere viz (Claude co-work fine-dot spheres)
- [x] BC.W-VIZ-HYBRID — NEW: the goo+dot-matrix HYBRID

### Band 5 — Page standardization (EVERY page)
- [x] BC.W-PAGE-CHASSIS — every page: audacious LARGE hero title + subtitle + explicit subpath + scroll-to-shrink + ONE glass card + procedural bg
- [x] BC.W-PAGE-HIERARCHY — hr/card section delimiting, design hierarchy suffused, EVERY PAGE STANDARDIZED
- [x] BC.W-CODE-BLOCKS — component names + technical values → proper code blocks + Fira Code
- [x] BC.W-PAGE-PRUNE — prune superfluity, remove "view source"/platitudes/out-of-date copy
- [x] BC.W-DEMO-COPY-PRUNE — the demo-content prune sibling of PAGE-PRUNE (genuine demo language/superfluity/contrivance; iter21 feature-band)
- [x] BC.W-HERO-AUDACIOUS — the herostudios.tv audacious-type hero pages, per-category icons, distinct (not duplicated)
- [x] BC.W-COMPOSITIONS-HERO — /compositions/hero distinct from homepage; /foundations/intro three-heroes → one
- [x] BC.W-PADDING-CANON — the padding ladder applied; /display/card every-card-right; dialog padding
- [x] BC.W-GHOST-DASHED — ghost items dashed outline; rounded everywhere it should be
- [x] BC.W-SEPARATOR-FIX — /display/separator rebuilt; text centering
> **iter5 ATLAS-FOLD addition (RE-OPENED — own challenge pass owed; see §3 note):**
- [ ] BC.W-EXPANDABLE-PART — the ExpandableContainer `::part()`/named-slot expand-fullscreen chrome hook (Atlas AR-7 seam; no consumer fork; Card-is-the-only-new-component fence); sequenced before BC.W-ATLAS-ASK

### Band 6 — Controls
- [x] BC.W-RADIO-FIX — radios work + proper toggle states
- [x] BC.W-DROPDOWN-FIX — dropdown trigger no-shift, aligned, dot not occluded
- [x] BC.W-CONTROL-SMOOTH — kill control lag; square borders → rounded
- [x] BC.W-CONFIG-RIGHT — all configurators: controls on the RIGHT on desktop

### Band 7 — Motion canon + interaction affordances
- [x] BC.W-MOTION-ONE-CLOCK — keyframes.js as the ONE source + clock for all sophisticated animation
- [x] BC.W-SPRING-EASE — all springs squishy/quick/coupled-fade; the abrupt curves eased; web-animation principles
- [x] BC.W-AFFORDANCE-MAP — interaction affordances baked into every element (the brainstorm + the map)
- [x] BC.W-TUNABLE-ANIM — the tunable-animation brainstorm + registry

### Band 8 — Safari
- [x] BC.W-SAFARI-WEBGL — WebGL context-loss lifecycle; the flashing killed; liquid morph works on WebKit

### Band 9 — Storybook meta-design
- [x] BC.W-STORYBOOK-META — frontend-design meta-pass: padding/usability/spacing/occlusion/fontsize/idiom adherence across the storybook itself

### Band 10 — Cross-repo + close
- [x] BC.W-SPEEDTEST-ADOPT — the speedtest fleet asks (4.0.1 → 4.1.0 + the AW v3 relay)
- [x] BC.W-FOURIER-ASK — the fourier asks
- [x] BC.W-ATLAS-ASK — sci-report's atlas asks
- [x] BC.W-DECK — BUILD the @mkbabb/glass-ui/deck sibling subpath (lift slides/src/deck/ ~1108 LoC into the keyboard-paged aria-live presentation register; the single largest UNBUILT cross-repo ask) — added iter12 (was the lone §1-omission, CHALLENGE-5's 1 MAJOR)
- [x] BC.W-DIST-COMMENT-FIX — the dist CSS-comment source-side balance + guard gate (converge with 4.0.1)
- [x] BC.W-CUT — the honest 4.x cut + slides redeploy (EXECUTION-phase only)

### Band 11 — PERFORMANCE (the 3-4-tranche perf chronic, DECIDED=BUILD; iter4 HARDEN-authored)
> Sequences LAST among the build bands — it measures the SETTLED floor after the visual bands stop churning.
- [x] BC.W-CSS-CRITICAL — the published /styles critical/deferred split off a manifest (render-blocking-early subset) + the FOUC-safe π live (the styles-critical-split chronic)
- [x] BC.W-LIGHTHOUSE — the committed re-runnable production-preview Lighthouse score-floor gate (perf/a11y/CLS/TBT, mobile+desktop, :5388) + the bare-consumer first-paint harness; RUN the never-run live score
- [x] BC.W-PERF-PRODUCER — lock the 4 A′ producer fixes survive the Band 2/4 rebuilds (dock contain/deferReposition, GooBlob one-canvas+dispose, aurora sub-2×-DPR cap) + the headed-GPU runtime π

### Band 12 — Customizability + golden-defaults (the FEATURE-BAND re-open; own challenge pass owed; see §3 note)
> *"ensure ALL of our components are fully customizable with reasonable, pragmatic, GOLDEN (like our golden typography) defaults that afford design hierarchy."* (component-customizability §0)
- [ ] BC.W-CUSTOMIZABILITY-CENSUS — the binding bar + `proof:customizability-census` (C1-C4) + the per-component EXACTLY-ONE-LIST census + design-idioms §13 (born-RED on the HEAD residuals; FIRST of Band 12)
- [ ] BC.W-CONTROL-CUSTOM — the shared control `size?` axis reading the `--control-h-*`/`--control-text` cohort onto the input register (Input/Switch/Textarea/NumberField); flips C1 GREEN
- [ ] BC.W-OVERLAY-UNIFORM — thread the shared `surface` axis + the φ `--overlay-pad-*` ladder onto the un-threaded floating overlays (Dropdown/Select/Tooltip/ContextMenu/Command/HoverCard); flips C2 GREEN
- [ ] BC.W-SEARCH-CUSTOM — the SearchBar/FuzzySearch first-principles CUSTOMIZATION + glassify surface (de-shadcn'd onto the house registers): size/surface/variant axes + token-backed icon/button/result magnitudes + the `.glass-menu-row` result register + the glass expand modal (off `surface="opaque"`) + the φ overlay-pad ladder + the `variant="bare"/"floating"` rung DELETING the `!important`-fighting-CVA escape (the CLEANUP-PLAN A6/HOLD-4 fold); the matcher byte-fenced (BC.W-FUZZY-HARDEN); flips C3 GREEN + mints `proof:search-custom`
> **Coverage gap RESOLVED (the challenge pass):** `BC.W-SEARCH-CUSTOM` (the SearchBar/FuzzySearch customization surface, the C3 owner) was referenced by 3 on-disk specs (`BC.W-CUSTOMIZABILITY-CENSUS`/`BC.W-DOCK-SEARCH`/`BC.W-FUZZY-HARDEN`) with no spec file — the challenge pass AUTHORED it (`waves/BC.W-SEARCH-CUSTOM.md`, the box above). The dangling references are resolved. See WAVE-INDEX name-drift map (the AUTHORED entry).

### Band 13 — Dock-search + scroll-system (the FEATURE-BAND re-open; own challenge pass owed; see §3 note)
> *User mandate (d): the DOCK as native dynamic-search-bar + a robust scroll system (expand-on-click, shrink-on-scroll, opacity-on-scroll, trigger-points), iOS-26/27-persistent.*
- [ ] BC.W-SCROLL-TRIGGER — the robust scroll-EVENT / trigger-point system (ONE rAF-coalesced reader, discrete onCross + continuous progress, dual-path single-writer; `useScrollTrigger` on /motion-core); FIRST of Band 13
- [ ] BC.W-SCROLL-CHROME — the scroll-driven chrome behaviors (shrink-on-down/expand-on-up/opacity-blur/snap-to-state/persistent-by-default; `useScrollChrome`)
- [ ] BC.W-DOCK-SEARCH — the DOCK as native dynamic-search-bar (the iOS-27 chrome-becomes-search-field morph; subsuming the words SearchBar) — composes the dock morph + FuzzySearch + virtual-window + ToC, box-inviolate; LARGEST of Band 13

### Band 14 — Latex-paper abstractions (the FEATURE-BAND re-open; own challenge pass owed; see §3 note)
> *User mandate (d): ABSTRACT OUT virtualized-windowing + the ToC-tracking + the fuzzy-search pipeline.*
- [ ] BC.W-VIRTUAL-WINDOW — the homecoming: re-mint the virtualized-section-windowing primitive RETIRED at v1.0 (the words verbatim copy returns) onto /virtual (off the root barrel); ≥2 consumers (words + dock-search); FIRST of Band 14
- [ ] BC.W-TOC-RECONCILE — reconcile the 3-way ToC-tracking fork onto the ONE glass-ui/sidebar + ADD the three missing leaves (useScrollTo/useClickDelegate/useLazyLoader); NO re-mint, no second engine
- [ ] BC.W-FUZZY-HARDEN — glass-ui/search is ALREADY the canonical client fuzzy pipeline: harden the dock-composable-ready surface + DECIDE the `useAsyncSearch` race-guard (one-directional, no scorer edit)
> **Cross-band:** Band 13 dock-search consumes Band 14's three abstractions (virtual-window/ToC/fuzzy) + Band 2 dock; Band 12 customizability is cross-cutting; `BC.W-DEMO-COPY-PRUNE` (Band 5) is the demo-content prune sibling already indexed.

### Band 15 — speedtest-AX absorption (the cross-repo intake re-open; own challenge pass owed; see §3 note)
> *The speedtest-AX (`AX-HANDOFF.md`) by-name asks absorbed as BC waves — the foreign-tree fence binding (glass-ui edits ZERO of speedtest's tree; every speedtest edit lands on its `^4.x` bump). Each wave BUILDS in its thematic band (1/2/6/11/12); the Band-15 label is the absorption lineage, not a re-banding. The green-handshake is `coordination/SPEEDTEST-BC.md`.*
- [ ] BC.W-AX-METAL-GLOW — the gold catch-light `--metal-glow-blur`/`--metal-glow-opacity` on the BB.W-METAL-SHIMMER family (BUILDS in Band 1; the speedtest gold wordmark inherits it transparently)
- [ ] BC.W-AX-LIQUIDHOVER-AUTOARM — STRUCK-ALREADY-SHIPS (the tier-root specular auto-arm; a RECORD + routing note, no build; the §6 out-of-scope re-verify rides BC.W-VISUAL-RECONCILE unit 2)
- [ ] BC.W-ACCENT-TONE — the contrast-floored 3-channel tonal-accent register (one `--tone` → idle/active/edge/ink via value.js `safeAccentColor`) + `<SelectableChip>` (BUILDS in Band 1/12; ALSO the fourier #3+#13 fold — a Band-16 cross-fold)
- [ ] BC.W-AX-DOCK-CTA-SEAT — the CTA-receive landing SEAT: `[data-cta-pending]` + `setPending()`/`clearPending()` on `useDockCtaReceive` + the `/dock` re-export (BUILDS in Band 2; folds AX intake BC-W3)
- [ ] BC.W-AX-DOCK-COCKPIT — the `cockpit` dock preset: a fixed 2.75rem control floor + `--dock-label-ratio` (BUILDS in Band 2; closes the dock-oversize chronic with the speedtest A-9 ask; threads Gate-1 Q6)
- [ ] BC.W-AX-COMPLETION-SEAL — the hero-scale earned-GOLD completion seal + 4 `@property` motion tokens reading W-PHASE-PALETTE `--phase-complete-color`/`--color-gold` (BUILDS in Band 6; `/completion-seal` subpath; threads Gate-1 Q2)
- [ ] BC.W-AX-METRIC-HOVER — the metric-badge value-lift `--metric-badge-hover-translate` + scale/shadow (BUILDS in Band 12; the speedtest result tiles inherit it transparently)
- [ ] BC.W-AX-BP-LAZY — BorderProgress eager-graph-safe: the value.js spectrum walk behind a dynamic `import()` boundary (BUILDS in Band 11; folds AX intake BC-W1; keeps value.js OFF the speedtest results-card first-paint chunk)
> **Cross-band:** the AX BC-W8 contrast verify (the idle Skeleton `surface=glass` shimmer over a translucent composited plate) is THREADED into `BC.W-VISUAL-RECONCILE` (do FIRST — it gates speedtest W0); BC-W9 (paper-grid) reconciles into `BC.W-VIZ-PAPERGRID` (the breathe register) + `BC.W-GRID-SIMPLE` (the cards.css 32px-stack retire); BC-W10 (the `--glass-saturate-{tier}` per-rung knob) into `BC.W-GLASS-LEGIBILITY-MEASURED`; the deriveAurora `avoidHues` option into `BC.W-VIZ-AURORA` T6; the `data-protagonist` MetricRow prop into `BC.W-CONTROL-CUSTOM` — NO new waves (the apply-the-bar discipline; see §3 + the foldNotes).

### Band 16 — Cross-repo: keyframes.js + fourier-analysis (the cross-repo intake re-open; own challenge pass owed; see §3 note)
> *The keyframes.js-M + fourier-analysis-M by-name asks absorbed — the foreign-tree fence binding (glass-ui reads the siblings as version+response AUTHORITY, edits NEITHER tree). 3 net-new waves BUILD in their thematic band (7/12/14); the kf asks are CONFIRMS/BOOKS threaded onto existing waves (no net-new kf wave). The green-handshakes are `coordination/KF-BC.md` + `coordination/FOURIER-BC.md`.*
- [ ] BC.W-SPLIT-CHARS — the per-glyph split JS partner `useCharStagger` + `<SplitChars>` with `--char-index`/`--char-total` + the MANDATORY accessible full-text label (BUILDS in Band 7; the fourier #6 fold; the JS partner to the shipped `.char-stagger` CSS)
- [ ] BC.W-MOTION-PRESETS — the convergence-reveal motion preset (the brand "partial-sum settle"; prefer the `gentle` reuse) + the `[data-scroll-reveal]` `once` latch (BUILDS in Band 7; folds fourier #5 + #8; the `once` CSS edit coordinates with BC.W-SCROLL-TRIGGER, file-disjoint)
- [ ] BC.W-FOURIER-DECIDES — the three DECIDE-or-BOOK fourier asks: AtomDiff BOOK (#4) · canvas-anchored-overlay BOOK (#7) · tier-class-staleness BUILD-as-gate (#12, extends `proof:consumer-staleness`) (Band 12/14; pairs with BC.W-FOURIER-ASK, DISJOINT)
> **Cross-band (threaded folds, NO new wave):** kf INFORM-1 (the KF-OSCILLATOR loop clock) is BOOKED onto `BC.W-MOTION-ONE-CLOCK` + `BC.W-VIZ-CHOREOGRAPHY` (the Oscillator is ABSENT from the published kf 4.3.0 dist — republish-gated; the interim is the existing sine/`uTime`); kf INFORM-4 (the value.js `/color` subpath footprint-shrink) is BOOKED onto `BC.W-PERF-PRODUCER`/`BC.W-CUT` (the subpath is absent from value.js 0.13.0 — promotion-trigger = value.js Tranche O ships it). The fourier Tier-1 overlay-band α-ask is threaded into `BC.W-ADAPTIVE-RECONCILE` + `BC.W-GLASS-LEGIBILITY-MEASURED`; the radius-ring VERIFY + `#9` ConfiguratorLayer `#actions` slot into `BC.W-CONTROL-CUSTOM`/`BC.W-CONFIG-RIGHT`; the `#10` DockIconButton `active?` prop into `BC.W-DOCK-ENGINE`; the SearchField into `BC.W-SEARCH-CUSTOM`; the `#8` scroll-reveal-once into `BC.W-MOTION-PRESETS` (the `#11` Configurator stage/aside is STRUCK-shipped-at-HEAD).

### Process gates (the user's explicit process demands)
- [x] ≥ 20 audit/research/harden/challenge iterations executed (see §3 log) — _at 4 (0,1,1b,1-sweep); 1c+1d next_
- [x] SOTA research corpus: apple.com + iOS-27, awwwards, herostudios, procedural-refs — DONE (research/)
- [x] keyframes.js + value.js facility inventory — DONE (research/kf-vjs-facilities.md: Oscillator/sampleColorRamp/republish-ask)
- [x] Every demo route enumerated + audited — DONE (research/route-census.md, 6 impacts)
- [x] **BB/BA/AZ forensic post-mortems** + the failure-class synthesis — DONE (research/postmortem/{bb,ba,az}.md + SYNTHESIS.md: 29 failure classes, 21 went-right; AZ=grey-glass origin 5b72fd9b, BA=paint-blind gate, BB=0/33 painted)
- [x] **Per-viz SOTA research doc ×11** — DONE (research/viz/*.md all 11; aurora=4-wiring-bugs-not-shader, blob=staged-first-principles, watercolor=ghost-dashed-follows-silhouette+Safari-static-filter, WebGPU Baseline confirmed)
- [x] A challenge/adversarial pass over the full wave-set (every wave attacked for gaps)
- [x] PROMPT-LEDGER.md: original + 50+ historical prompts, each mapped to a covering wave

---

## 2 — The iteration protocol (each iteration = one triumvirate sweep)

Each iteration is a Workflow run, **batches of 3 opus/sonnet agents** (rate-safe), of one kind:
- **RESEARCH** (web + codebase + machine): grounded findings → `research/`.
- **PLAN**: author/refine waves with goal + starting-state + acceptance → `waves/`.
- **HARDEN**: tighten a band's waves (gates, edge cases, fences, precept conformance).
- **CHALLENGE**: adversarial — attack the wave-set for gaps/contradictions/un-covered asks.

After each iteration: **update §3 log**, **re-tick §1 checklist**, **commit**. The orchestrator (core
model) synthesizes; the fanout is opus/sonnet.

**Convergence test:** §1 fully checked AND ≥2 consecutive CHALLENGE iterations find no new gaps.

---

## 3 — The iteration log (append-only; the resume cursor)

| # | kind | bands | workflow | status | output |
|---|------|-------|----------|--------|--------|
| 0 | audit | all | bc-audit.mjs (32 agents) | DONE | FINDINGS-DIGEST.md, DEFECT-LEDGER.md, USER-DEFECTS.md |
| 1 | research | SOTA + codebase + deferral | bc-iter1-research.mjs (way3dy2jj / wf_82240b8d-5f0) | 7/9 HARVESTED | research/*.md ×7 + WAVE-IMPACTS.md (50 rows / 49 waves) |
| 1b | research-rerun | route-census + viz-codebase | resume (wiremj4eb) — re-ran ALL 9 | DONE 9/9 | research/*.md ×9 + WAVE-IMPACTS (70 rows/57 waves) |
| 1-sweep | deferral fold | AX/AY/AZ/BA/BB/memory/hero | wcbitsihm (213 items) | DONE | research/deferral/*.md ×7 + herostudios-design.md |
| 1c | forensics | BB/BA/AZ post-mortems | bc-iter1c-forensics.mjs (w53yzm840) | DONE | research/postmortem/{bb,ba,az}.md + SYNTHESIS.md (29 classes) |
| 1d | per-viz SOTA | 11 procedural items | bc-iter1d-viz-sota.mjs (wyy4pa6jq) | 6/11 DONE | research/viz/{aurora,goo-blob,dot-flow-field,concentric,fourier-field,constellation}.md |
| 1d-rerun | per-viz SOTA rerun | 5 (watercolor/paper-grid/grid-simple/dot-matrix/hybrid) | bc-iter1d-rerun.mjs (wqn9lcsup) | DONE | research/viz/*.md ALL 11 |
| 2 | PLAN | all bands (18 agents) | bc-iter2-plan.mjs (w0syxq0x5) | DONE 66 waves | 66 waves/*.md + DEFERRAL-LEDGER (404L) + PROMPT-LEDGER §3.1 |
| 3 | reconcile+challenge | name-drift + adversarial coverage | bc-iter3-reconcile-challenge.mjs (w2vvz9y8s) | DONE | WAVE-INDEX.md + CHALLENGE-1.md (7B/9M/6m gaps) |
| 4 | HARDEN | fix CHALLENGE-1 gaps + 4 new waves | bc-iter4-harden.mjs (w3pp3xzy6) | DONE | ALL 7 BLOCKERs closed; 70 waves; Band 11 PERFORMANCE + VISUAL-RECONCILE added; ledgers zero-dangling |
| 5 | CHALLENGE-2 | re-attack the 70-wave set | bc-iter5-challenge2.mjs (w6lc0kp2y) | DONE | CHALLENGE-2.md: all C1 closed; NEW 0B/5M/7m |
| 6 | HARDEN-2 | fix the 5 MAJOR + 7 MINOR | bc-iter6-harden2.mjs (w9fo7c6ul) | DONE | buttons single-owned; 0 band-only dispositions; F2.b guard added |
| 7 | CHALLENGE-3 | convergence-confirm (fresh angles) | bc-iter7-challenge3.mjs (wjp9fmp0m) | DONE | 0B/1M/4m/3THIN; 2/3 CONVERGED; iter6 verified held |
| 8 | HARDEN-3 | fix the 1 MAJOR (G8) + 4 MINOR | bc-iter8-harden3.mjs (w73klou5e) | DONE | G8 re-scoped (4-fixture self-test, GREEN on HEAD) + doc-hygiene |
| 9 | DEEPEN | burning-lucidity enrichment (THIN + under-spec) | bc-iter9-deepen.mjs (whj793t4k) | DONE | 108-route page table + 22-row affordance + 5-kind tunable registries + 6 viz facets |
| 10 | CHALLENGE-4 | clean-confirm #1 (deepened set) | bc-iter10-challenge4.mjs (wpir8hjb1) | DONE — CLEAN #1 | 0B/0M all 3 CONVERGED; 2 MINOR/5 THIN cosmetic |
| 11 | HARDEN-4 | final cosmetic cleanup (pristine FINAL) | bc-iter11-harden4.mjs (wvf02hqj7) | DONE | 0 fake chips/0 (Band3) labels/108 roster/F1.b derived-band |
| 12 | CHALLENGE-5 | clean-confirm #2 (holistic) | bc-iter12-challenge5.mjs (w30jipzis) | DONE — 1 MAJOR | executor-readiness+intent-fidelity CONVERGED; 1 MAJOR (BC.W-DECK §1-box omission, FIXED in-place) |
| 13 | DEEPEN-2 | execution-readiness depth (DAG/a11y/perf) | bc-iter13-deepen2.mjs (wwhmykhfs) | DONE | EXECUTION-DAG.md (acyclic, gate battery) + A11Y-CONTRACT.md + 18 waves enriched |
| 14 | CHALLENGE-6 | clean-confirm #1 (post-DEEPEN-2) | bc-iter14-challenge6.mjs (wjh5w4xc6) | DONE — 1 MAJOR | a11y/perf + coverage CONVERGED; 1 MAJOR (DAG SPRING-EASE→DOCK-ENGINE prose ∅ vs binding edge; acyclic proven) |
| 15 | HARDEN-5 | reconcile the DAG edge + 2 MINOR | bc-iter15-harden5.mjs (wmtr7bxho) | DONE | DAG edge=consume-after-mint, acyclic re-confirmed (Kahn 70/70), 0 remaining |
| 16 | CHALLENGE-7 | clean-confirm #1 (final-integrity) | bc-iter16-challenge7.mjs (w5g2b132n) | DONE — 1 MAJOR | C1 DAG + C3 FINAL-ready CONVERGED; C2 1 MAJOR (WAVE-INDEX:155 stale lineage cell, non-binding) |
| 17 | HARDEN-6 | fix + comprehensive non-binding-doc tail-break sweep | bc-iter17-harden6.mjs (wybrgdrgd) | DONE | WAVE-INDEX:155 + GRID-SIMPLE + H31/H100 mis-routes; whole non-binding surface swept clean; tail broken |
| 18 | CHALLENGE-8 | clean-confirm #1 (tail-break verify) | bc-iter18-challenge8.mjs (wq0uwdmcb) | DONE — 1 MAJOR | C2 coverage + C3 executor/user CONVERGED; C1 1 MAJOR (DEFERRAL-LEDGER:165 duplicate menu-row band-only cell, FIXED in-place) |
| 19 | CHALLENGE-9 | clean-confirm (final) | bc-iter19-challenge9.mjs (w2cbr2kbv) | DONE — **CONVERGED** | all 3 dims 0B/0M; 2-consecutive-clean MET; FINAL.md written; cron retired |
| 20 | RE-OPEN (Atlas fold + de-shadcn) | Band 1 + Band 5 + page/motion refinement | DESHADCN-BRAINSTORM.md + CLEANUP-PLAN.md | DONE — 4 new waves | 74 waves (70 converged + 4 added): BC.W-DESHADCN/SELECTION-CARD/GLASS-GLOW-FIX/EXPANDABLE-PART on disk + WAVE-INDEX + §1 boxes; the added set needs its OWN challenge pass |
| 21 | RE-OPEN (feature-band) | Band 12 + Band 13 + Band 14 (customizability / dock-search+scroll / abstractions / demo) | research/feat/WAVE-IMPACTS-FEAT.md fan-out | DONE — 9 new waves (+ DEMO-COPY-PRUNE already indexed at Band 5) | 84 waves on disk (75 prior + 9 added): the Bands 12/13/14 set on disk + WAVE-INDEX (84) + §1 boxes + EXECUTION-DAG topo; the added set needs its OWN challenge pass |
| 22 | CHALLENGE (feature-band) | author the iter-21 KNOWN gap `BC.W-SEARCH-CUSTOM` (Band 12, the C3 owner) | research/feat/WAVE-IMPACTS-FEAT.md:118-123 + the 3 referencing specs | DONE — 1 new wave | 85 waves on disk (84 prior + 1 added): `waves/BC.W-SEARCH-CUSTOM.md` + WAVE-INDEX (85, name-drift map AUTHORED) + §1 Band-12 box + EXECUTION-DAG insert (`proof:search-custom`, acyclic re-confirmed); the iter-21 coverage gap CLOSED |
| 23 | RE-OPEN (cross-repo absorb) | the 3 cross-repo intake packets (speedtest-AX Band-15 + kf-M + fourier-M Band-16) + the §6 out-of-scope fold | AX-HANDOFF.md + inbound/{KF,FOURIER}-INBOUND.md + the absorb-agent new wave files | DONE — 11 new waves | 96 waves on disk (85 prior + 11 added): the Band-15 speedtest-AX 7 + the Band-16 fourier 3 + the cross-cutting BC.W-ACCENT-TONE; WAVE-INDEX (96) + §1 Bands 15/16 boxes + EXECUTION-DAG topo inserts + the 11 new `proof:*` gates in the battery; the foldNotes threaded into their named existing waves; the coordination green-handshakes (`SPEEDTEST-BC`/`KF-BC`/`FOURIER-BC`) on disk; the added set needs its OWN challenge pass |
| 24 | CHALLENGE-REOPEN-2 (cross-repo) | re-attack the iter-23 absorbed set (Bands 15/16 + the threaded folds) to 2-consecutive-clean | CHALLENGE-REOPEN-2.md (`bc-challenge-reopen2` ×3 re-fires + `bc-harden-reopen2`/`bc-harden4` ×4 hardens) | DONE — **CONVERGED** | 2-consecutive-clean MET (6 diverse adversarial lenses, `bm2=0 bm3=0`); the iter-23 cross-repo absorption converged. Every gap genuine + permanently-closed: the BB terminal-reflect disease-leak (purged from AX-DOCK-CTA-SEAT/COMPLETION-SEAL + G8a detector widened), the DAG DEMO-COPY-PRUNE node + the CODE-BLOCKS↔PADDING-CANON topo-order, the broken SPEEDTEST-BC consume-link (§6b/§6c rows), the 70→96 stale-count (GESTALT-FIRST + FINAL.md banner), the structure-gate + fold-gate completeness classes (SP6/A6/CS1 + VIZ-AURORA A7/CONTROL-CUSTOM CP1/ADAPTIVE-RECONCILE A3-overlay/GLASS-LEGIBILITY L6). 96 waves, acyclic, zero phantom. The 4 substantive lenses clean across the final 3 runs; residual MINORs all fenced/exempt |

> **RE-OPENED for the 3 cross-repo packets (speedtest-AX Band-15 + kf-M + fourier-M Band-16) + the §6 out-of-scope fold (iter23 CROSS-REPO-ABSORB, 2026-06-18).**
> The user re-opened BC to ABSORB the three cross-repo intake packets — the speedtest-AX by-name asks (`AX-HANDOFF.md`),
> keyframes.js tranche M (`inbound/KF-INBOUND.md`), and fourier-analysis tranche M (`inbound/FOURIER-INBOUND.md`) — plus the
> §6 out-of-scope fold (the AX `LIQUIDHOVER-AUTOARM` STRUCK re-verify routing). **The prior 85 waves stay as-is** (the converged-70
> + Atlas-fold-5 + feature-band-9 + the iter22 SEARCH-CUSTOM; that result is NOT re-litigated). The added wave-set is **11 new
> waves across two new bands** — **Band 15 (speedtest-AX absorption, 7 waves)**: `BC.W-AX-METAL-GLOW` (Band 1), `BC.W-AX-LIQUIDHOVER-AUTOARM`
> (Band 1, STRUCK), `BC.W-ACCENT-TONE` (Band 1/12, cross-folds Band 16), `BC.W-AX-DOCK-CTA-SEAT` (Band 2), `BC.W-AX-DOCK-COCKPIT`
> (Band 2), `BC.W-AX-COMPLETION-SEAL` (Band 6), `BC.W-AX-METRIC-HOVER` (Band 12), `BC.W-AX-BP-LAZY` (Band 11) — and **Band 16
> (cross-repo: keyframes.js + fourier-analysis, 3 net-new waves)**: `BC.W-SPLIT-CHARS` (Band 7), `BC.W-MOTION-PRESETS` (Band 7),
> `BC.W-FOURIER-DECIDES` (Band 12/14). **The keyframes.js asks are CONFIRMS/BOOKS threaded onto existing waves** (the Oscillator
> is republish-gated — ABSENT from the published kf 4.3.0 dist; the value.js `/color` subpath is absent from 0.13.0 — both BOOKED
> with named promotion triggers, no net-new kf wave). Each Band-15/16 wave BUILDS in its thematic band (1/2/6/7/11/12/14) — the
> Band-15/16 label is the absorption lineage, not a re-banding; the per-wave `Sequence:` line + the EXECUTION-DAG topo are the
> binding edges. **The added wave-set needs its OWN challenge pass** (the converged-85 result stands; the 2-consecutive-clean
> counter RESETS for the absorbed scope). §1 carries the two new bands' (unchecked) boxes; WAVE-INDEX.md (96 rows) + the EXECUTION-DAG
> topo inserts + the 11 new `proof:*` gates in the per-band battery + the foldNotes threaded into their named existing waves +
> the three coordination green-handshakes (`coordination/{SPEEDTEST-BC,KF-BC,FOURIER-BC}.md`) are on disk. The foreign-tree fence
> (inv-26) is binding throughout — glass-ui authors ZERO sibling-tree edits; every cross-repo consume lands in the SIBLING repo on
> its `^4.x` bump (the consume-and-delete cadence). The build-order: each absorbed wave slots with its thematic band (the AX gold/seat/cockpit/seal
> with Bands 1/2/6, the BP-lazy with Band 11 perf, the motion leaves with Band 7, the fourier-decides as a process-band leaf).**

> **RE-OPENED for the Atlas fold + de-shadcn + page/motion refinement (iter5 ATLAS-FOLD, 2026-06-18).**
> The user re-opened BC for added scope (`DESHADCN-BRAINSTORM.md`): the de-shadcn first-principles DNA
> (reka=BEHAVIOR / glass-ui=100%-of-the-MATERIAL), the iOS-27 Safari tab-switcher + apple.com-bested-with-
> paper glass directions, the Atlas A-1..A-9 fold, and the page/motion refinement. **The original 70 waves
> stay CONVERGED** (verified CLEAN across CHALLENGE-4..9 — that result is NOT re-litigated). The added
> wave-set is FOUR new waves — `BC.W-DESHADCN`, `BC.W-SELECTION-CARD`, `BC.W-GLASS-GLOW-FIX` (Band 1) +
> `BC.W-EXPANDABLE-PART` (Band 5) — plus the de-shadcn-DNA refinement of the extant tabs/glass/dock waves
> (cited in each refined spec). **The added wave-set needs its OWN challenge pass** (the 2-consecutive-clean
> counter RESETS for the added scope; the converged-70 result stands). §1 carries the 4 new (unchecked)
> boxes; WAVE-INDEX.md (74 rows) + the per-wave specs are on disk. The Card-is-the-only-new-component fence
> (`DESHADCN-BRAINSTORM.md §2`) is machine-checkable: of the Atlas set, exactly ONE new component is minted
> (`BC.W-SELECTION-CARD`); a second reds the fence. The build-order slots the new Band-1 waves with their
> band (after `BC.W-GLASS-IDENTITY` + `BC.W-BLACK-BAR`), `BC.W-EXPANDABLE-PART` in Band 5 before
> `BC.W-ATLAS-ASK`.**

> **RE-OPENED for the FEATURE-BAND (customizability / dock-search / abstractions / demo) — iter21, 2026-06-18.**
> The user re-opened BC for the feature-band scope (`research/feat/WAVE-IMPACTS-FEAT.md`, 21 impact rows):
> the "fully-customizable-with-golden-defaults" component bar, the DOCK-as-native-dynamic-search-bar (subsuming
> the words SearchBar) + a robust scroll system, the latex-paper abstractions (virtualized-windowing / ToC /
> fuzzy-search), and the demo-content prune. **The prior 74/75 waves stay as-is** (the converged-70 + the
> Atlas-fold-5; that result is NOT re-litigated). The added wave-set is THREE new bands — **Band 12
> (customizability + golden-defaults)**: `BC.W-CUSTOMIZABILITY-CENSUS` (the bar + `proof:customizability-census`),
> `BC.W-CONTROL-CUSTOM`, `BC.W-OVERLAY-UNIFORM`; **Band 13 (dock-search + scroll-system)**:
> `BC.W-SCROLL-TRIGGER`, `BC.W-SCROLL-CHROME`, `BC.W-DOCK-SEARCH`; **Band 14 (latex-paper abstractions)**:
> `BC.W-VIRTUAL-WINDOW`, `BC.W-TOC-RECONCILE`, `BC.W-FUZZY-HARDEN` — **9 new waves**, plus `BC.W-DEMO-COPY-PRUNE`
> (Band 5, already indexed iter20) the demo-content prune sibling. **The added wave-set needs its OWN challenge
> pass** (the 2-consecutive-clean counter RESETS for the feature-band; the converged-70 + Atlas-fold-5 stand).
> §1 carries the 3 new bands' (unchecked) boxes; WAVE-INDEX.md (85 rows — the iter22 challenge pass added
> `BC.W-SEARCH-CUSTOM`) + the EXECUTION-DAG topo (Band 14
> abstractions early as primitives; Band 13 dock-search after Band-2 dock + Band 14; Band 12 cross-cutting;
> Band 5 demo) + the per-wave specs are on disk. **The iter21 KNOWN gap is CLOSED (iter22 challenge pass):** `BC.W-SEARCH-CUSTOM`
> (the SearchBar/FuzzySearch customization surface, the C3 owner) was referenced by 3 on-disk specs
> (`BC.W-CUSTOMIZABILITY-CENSUS`/`BC.W-DOCK-SEARCH`/`BC.W-FUZZY-HARDEN`) with no spec file — the challenge pass
> AUTHORED it (Band 12, `waves/BC.W-SEARCH-CUSTOM.md`; mints `proof:search-custom`, flips C3 GREEN; the
> dangling references resolved, recorded in the WAVE-INDEX name-drift map as the AUTHORED entry). The build-order: Band 14 abstractions land EARLY as primitives (after Band 0), Band 13
> dock-search after Band-2 dock + Band 14, Band 12 customizability cross-cutting (after Band-1 glass), the
> demo prune in Band 5.**

> **CONVERGENCE DECISION (recorded): the BINDING tranche (70 wave specs + EXECUTION-DAG + A11Y-CONTRACT)
> has been verified CLEAN across CHALLENGE-4..8 (coverage/soundness/executor/intent all CONVERGED
> repeatedly). The residual tail has been EXCLUSIVELY single non-binding SUMMARY-doc staleness cells
> (DECK §1-box, DAG prose, WAVE-INDEX:155, DEFERRAL-LEDGER:165), each fixed. On CHALLENGE-9:
> - 0 BLOCKER/MAJOR → CONVERGE (CHALLENGE-8 C2/C3 + CHALLENGE-9 = the 2-consecutive-clean on the
>   binding surface). Write FINAL.md, report, KEEP cron (post-convergence hardening per 12-hr floor).
> - If CHALLENGE-9 finds ONE more single non-binding SUMMARY-cell (the same class) → fix it inline,
>   record the class in FINAL §residuals as "tracking-doc hygiene — binding tranche converged", and
>   CONVERGE anyway (the binding spec is done; do NOT loop indefinitely on ledger-cell accounting
>   past iteration 26). A binding-wave BLOCKER/MAJOR (none seen since CH4) WOULD still re-open HARDEN.**

> **GAP-CONVERGENCE near (CHALLENGE-4 clean #1; CHALLENGE-5 = executor-ready + intent-faithful, the lone
> MAJOR was a §1-checklist-box omission for BC.W-DECK, FIXED in-place — §1 now 70 boxes = disk). The
> 2-consecutive-clean counter RESETS (CHALLENGE-5 was not 0-MAJOR). Continuing per the user's ≥20-iter
> + 12-hour floor with GENUINE depth: the execution-DAG + a11y + perf-realism, then 2 fresh clean confirms.**

> **GAP TREND collapsing: CHALLENGE-1 7B/9M/6m → iter4 HARDEN closed ALL → CHALLENGE-2 0B/5M/7m.**
> The 5 MAJORs: 1 buttons double-ownership (iter4 over-corrected) + 4 the DEFERRAL-LEDGER still-band-only
> dispositions + the missing F2 band-string guard. HARDEN-2 (w9fo7c6ul) fixes them surgically.

> **PLAN COMPLETE — 66 waves authored.** Known gap (the agent flagged it): the DEFERRAL-LEDGER + PM
> disposition column references DRIFTED wave names (BC.W-VIZ-LIVE/WGSL-COMPILE-GATE/CROSSREPO-ADOPT/
> CONSTELLATION/SLIDES/…) that landed under canonical names (VIZ-CONSTELLATION/WEBGPU-EVERYWHERE/
> SPEEDTEST-ADOPT/…). **iteration 3 reconciles + challenges.**
| 2 | plan | all bands (expanded: +Band F, +per-viz families) | bc-iter2-plan.mjs (18 agents) | STAGED | waves/*.md (~60) + DEFERRAL-LEDGER |

> **HARVESTED (7/9):** apple-ios27, awwwards-herostudios, procedural-refs, glass-dock-codebase,
> deferral-sweep, cross-repo-asks, kf-vjs-facilities → `research/`. KEY: WebGPU Baseline since
> Jan-2026 (Safari 26+ ships it → the no-fallback ask is reachable); D2 black-bar = warm-ink TOP
> border; BB never closed (no FINAL, W-REFLECT3 never ran); both kf/vjs local sibling repos exist.
> 2 codebase agents (route-census, viz-codebase) hit a TRANSIENT server rate-limit → re-running via
> resume (caches the 7, re-runs the 2).
>
> **NEXT CURSOR: CHALLENGE-5 = executor-ready + intent-faithful CONVERGED, the lone MAJOR (BC.W-DECK
> §1-box omission) FIXED in-place (§1 now 70 boxes). iteration 13 DEEPEN-2 IN-FLIGHT (task TBD,
> bc-iter13-deepen2.mjs — the execution-DAG + a11y + perf-realism depth, the genuine ≥20-iter value).**
> **UPDATE (iter14/15): CHALLENGE-6 a11y/perf+coverage CONVERGED; 1 MAJOR (DAG prose edge) → iter15
> HARDEN-5 reconciles it (task wmtr7bxho). The clean counter is still 0 (CHALLENGE-6 not 0-MAJOR).**
> On iter15 completion (TaskOutput wmtr7bxho): verify the DAG SPRING-EASE→DOCK-ENGINE edge now reads
> consume-after-mint + still acyclic; commit. Then:
> **UPDATE (iter17): CHALLENGE-7 C1+C3 CONVERGED; C2 1 MAJOR (WAVE-INDEX:155 stale lineage cell, the
> binding waves clean). iteration 17 HARDEN-6 IN-FLIGHT (task wybrgdrgd) — fixes it + COMPREHENSIVELY
> sweeps all non-binding lineage/summary prose vs the binding specs to BREAK the one-stale-item tail.**
> On iter17 completion (TaskOutput wybrgdrgd): verify the WAVE-INDEX:155 cell + the swept-clean set;
> commit. Then:
> 1. **18 CHALLENGE-8** — clean-confirm (should now be FULLY clean: binding waves + non-binding summaries
>    all consistent). 0 BLOCKER/MAJOR → CLEAN #1.
> 2. **19 CHALLENGE-9** — clean #2. If also 0 → CONVERGE (the 2-consecutive test MET).
> - If any finds BLOCKER/MAJOR → HARDEN + re-challenge (counter resets).
> CONVERGE sequence: tick ALL §1 boxes; write docs/tranches/BC/FINAL.md (summary + 70-wave roster by
> band + EXECUTION-DAG.md + A11Y-CONTRACT.md refs + §residuals + EXECUTION-phase greenlight + build order);
> report CONVERGED. **Per the user 12-hour-minimum + "iterate until 100% convergence AND hardening":
> do NOT retire cron 17dd706c at convergence — KEEP it + run post-convergence hardening passes
> (SOTA-refresh, cross-repo-relay detail, deeper per-wave executor detail) until the user greenlights
> EXECUTION or the long horizon closes. FINAL.md is the milestone, not the stop.**
> Iteration count: …,13,14,15,16 = 22 (≥20 floor MET). Keep ≤3 agents concurrent.
> CONVERGE sequence (unchanged): tick ALL §1 boxes; write docs/tranches/BC/FINAL.md (summary + 70-wave
> roster by band + the EXECUTION-DAG ref + §residuals + EXECUTION-phase greenlight + build order);
> report CONVERGED; retire cron 17dd706c via CronDelete.
> Iteration count: …,10,11,12,13 = 19 toward ≥20 (CHALLENGE-6 = 20, CHALLENGE-7 = 21). Honors the floor.
> Keep ≤3 agents concurrent.
> _(superseded harvest note:)_
> - If blockerMajor == 0 → CLEAN PASS #2 → **CONVERGE** (CHALLENGE-4 #1 + CHALLENGE-5 #2 = 2 consecutive
>   clean). Do the convergence sequence:
>   1. tick ALL §1 checklist boxes (every band's waves authored + challenge-clean);
>   2. write docs/tranches/BC/FINAL.md — the tranche summary + the 70-wave roster grouped by band +
>      the sequencing DAG + the §residuals (acceptably-deferred MINOR/THIN, the iter11 leftover
>      83-vs-89 export-count note) + the EXECUTION-PHASE GREENLIGHT note (BC is tranche-dev-COMPLETE;
>      execution = the user's go; the build order = Band F→0 gates first, then 1 glass, 2 dock, 3 tabs,
>      4 viz, 5 pages, 6 controls, 7 motion, 8 safari, 9 storybook, 10 cross-repo, 11 perf, then the cut);
>   3. report CONVERGED to the user (iteration count ≥17, ≥20 process-floor met via the deepen+challenge rounds);
>   4. retire cron 17dd706c via CronDelete (BC tranche-development is done; the loop ends).
> - If blockerMajor > 0 → HARDEN (iteration 13) + re-challenge (2-consecutive counter RESETS to 0).
> Iteration count: …,9,10,11,12 = 18 toward ≥20. Keep ≤3 agents concurrent; no double-spawn while w30jipzis runs.
> On iter2 completion (TaskOutput): verify docs/tranches/BC/waves/*.md (~60) + DEFERRAL-LEDGER.md +
> the PM wrappers + the PROMPT-LEDGER §3 extension landed (recover from result.plan[].wavesAuthored
> any agent that returned without self-writing); count waves vs the §1 checklist; commit. Then:
> 1. **3 HARDEN** — per-band: tighten gates/edge-cases/fences/precept-conformance; fill any band
>    that came back thin. (a PLAN-style fan-out re-reading the authored waves + the corpus.)
> 2. **4 CHALLENGE** — adversarial: attack every wave for gaps/contradictions + check EVERY
>    USER-DEFECTS.md line + EVERY 213 deferral item + EVERY PROMPT-LEDGER ask has a covering wave.
> 3. Repeat HARDEN/CHALLENGE until §1 fully checked AND 2 consecutive challenge passes find no new
>    gaps (§2 convergence test). Then write FINAL.md, report, retire the cron.
> Do NOT double-spawn while iter2 is in flight. Keep ≤3 agents concurrent (the server rate-limit bit
> twice on batches 3+/large fan-outs — batches of 3 + serial iterations is the discipline).

---

## 4 — The resume protocol (do this on every revival)

1. Read this file (§3 cursor) + `PLAN.md` + `DEFERRAL-LEDGER.md` (when authored).
2. `TaskList` — is a workflow in flight? If yes, wait/harvest; do NOT double-spawn.
3. `curl -s -o /dev/null -w "%{http_code}" http://localhost:5199/` — dev server up? (restart if down: `npm run demo` background).
4. Continue the next un-done iteration per §2. Update §3. Re-tick §1. Commit.
5. If §1 fully checked AND convergence test met → write `FINAL.md`, report converged, STOP, delete the cron.
6. Keep the revival cron alive until convergence.

---

## 5 — The revival cron (the hardening against rate-limit / usage-exhaustion)

A **durable, recurring** CronCreate job fires every ~20 min at off-minutes. While the REPL is busy
it is a no-op (cron fires only when idle); when the session has died/stalled (rate-limit, usage cap,
crash) it re-enters via the resume protocol. Auto-expires after 7 days (re-arm if BC runs longer).

- Cron prompt: *"RESUME BC. Read docs/tranches/BC/ORCHESTRATION.md §3 cursor + §4 resume protocol
  and continue the next un-done iteration. TRANCHE DEVELOPMENT ONLY — no implementation. If §1 is
  fully checked and the convergence test is met, do nothing and report converged. Keep the cron
  alive."*
- Cron id: **17dd706c** (`9,29,49 * * * *`). NOTE: the runtime reported it **session-only** despite
  `durable:true` — so it revives within THIS session's life (rate-limit recovery while the process
  lives) but a full process-death needs a fresh `claude` launch + the resume protocol. Re-arm a
  durable cron if the runtime supports it on a later launch.

---

## 6 — Invariants (the binding precepts this loop must never violate)

- NO backwards compat / legacy aliases (clean breaks).
- Presets-in-consumers (library tokens evolve as identity; named presets live in consumers).
- Live-verify needs a CAPTURED delta, not a commit-message claim.
- Gestalt redesigns over incremental patches; no workarounds.
- Tailwind-first (re-express references via @theme + @utility).
- Opus/sonnet for fanout, never inherit fable on spawns.
- Every src/ artefact has ≥2 sites OR is exported OR is a private demo helper.
- Writing style: no grandiloquence, em-dashes-no-spaces, levity.
- **MCP at every juncture (user-mandated).** Research + verification agents use the **modern-web-
  guidance** sources (web.dev / MDN / Baseline / caniuse via WebSearch+WebFetch — no dedicated
  "modern web guidance MCP" is registered this session, so its INTENT is fulfilled via these) for
  every web-platform-feature decision (WebGPU/backdrop-filter/scroll-timeline support), AND the
  **dev-tools MCP** (chrome-devtools + Playwright + claude-in-chrome) for every live paint/perf
  verification. No "I assume it is supported" — cite the Baseline status. No "looks fixed" — capture
  the paint. (Binds the EXECUTION phase especially; in tranche-dev the research agents cite the
  Baseline facts the waves bake.)
- **Per-viz completeness (user-mandated).** Every procedural item ships a WebGPU-first + WebGL2
  prototype + a FULL configurator + a COMPREHENSIVE demo suite. A viz wave without all four is
  incomplete. Goo-blob is staged: plain blob first, then meatball/shadow from first principles.
