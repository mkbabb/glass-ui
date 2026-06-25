# BG SYNTHESIS — PASS 1: the convergence-workstream partition

**Author:** the global synthesis lead (core model).
**Inputs:** the 27-agent forensic audit (`docs/tranches/BG/audit/{D,A,P,S}-*.md`) + `PLAN.md`
(the confirmed D1-D13 ledger) + `CONTEXT.md` (mission + cardinal laws) + the two explicit
NEW user directives (dock-refinement, glass-standardization) + the Siri triumvirate.
**Output:** ~7 convergence WORKSTREAMS, each seeding the 5-step loop
(`docs/tranches/BG/converge/bg-converge.wf.js`); the master defect→workstream map; the
deferred-fold ledger; the historical-coverage close; the top cross-cutting risks.

---

## 0 — THE GESTALT (one paragraph)

The 27-agent audit converges on ONE diagnosis: **glass-ui 4.2.0 is engine-rich and
assembly-poor.** Almost every primitive the user asked for over ten tranches EXISTS on disk
(the `.glass-capsule` warm register, `useMorphField`/`useDockFission`, the WebGPU substrate,
the scroll-shrink card, the spectrum walk, even the `waveformValue` math) — but the
INTEGRATION layer is broken (the route transition freezes every navigation, so most shipped
work never renders), THREE identity tokens are mis-tuned past their own ceilings (the
`--cartoon-ink` chroma-floor → maroon, the `.paper-field` conic+radial+grain → metallic, the
`text-display-hero` vw coefficient → viewport-dominating headlines), the close ORACLE is blind
(`proof:ba-gestalt` reads a frozen BC roster; the live-pixel layer is `local`-only and severed
from the release tag), and a cluster of "the ONE engine" composables shipped DEAD (zero
consumers) while their `release`-tagged gates green over nothing. Per the BG cardinal laws BG
is therefore an **INTEGRATION + STANDARDIZATION + VERIFICATION** tranche — re-do the host (not
the houses), unify the glass material into ONE calm register applied uniformly, delete the
dead/forked/legacy, close the headless-green gap with live-paint gates, and add the two genuine
NEW capabilities (the Siri waveform + glass island). The principles are ~90% right; the
implementation drifted off them, and the verification axis never caught the drift.

---

## 1 — THE WORKSTREAM PARTITION (7 workstreams)

The partition follows the user's suggested shape, adjusted by the findings. Each workstream is
a coherent gestalt goal, NOT a file list — it is the unit of the 5-step convergence loop. The
clusters C1-C14 from `CONVERGENCE-PROTOCOL.md` map into the workstreams as noted.

| WS | Title | Clusters | Covers defects | Headline |
|----|-------|----------|----------------|----------|
| **BG-WS1** | Shell · Routing · Field | C1·C2·C6 (partial) | D1,D2,D5,D9,D10 | The linchpin: ONE route transition; the metallic field → ONE shared aurora; the aberrant top bar; the hero over-scale |
| **BG-WS2** | Dock convergence | C5 (partial)·D-dock | D8,D12,D13 + dock refinement | The 33-file KISS/DRY re-modularization; 5 springs→1, 2 morph engines→1; V↔H as an in-place dock BUTTON; dock scroll; remove ℱ; less blur + smoother |
| **BG-WS3** | Glass standardization | C4·C3 | D3 | The user's explicit ask: ONE coherent glass/blur register on dock·buttons·cards·items·menus; LESS blur; collapse the 5-axis tint sprawl; kill the maroon cast; ONE clip discipline |
| **BG-WS4** | Components · Demo · Encapsulation | C7(partial)·C8·C9·C10 | D4,D6,D7,D11 | Scroll-shrink revive; configurator drawer; live category previews; the >500-line splits + colocation gate; demo chassis consolidate; motion-primitive consolidation; dead-code cut |
| **BG-WS5** | Viz refinement | C7(partial) | D6 (viz half) | The substrate sizer-adopt + intrinsic-size + reveal-bloom entrance; demigrate fourier/constellation; viz preview dispatch; substrate-plumbing factor |
| **BG-WS6** | Siri capabilities | C11·C12 | — (NEW) | The warm prismatic waveform + the descending glass island, deftly dock-integrated |
| **BG-WS7** | Quality · Coverage · Close | C13·C14 | — (cross-cutting) | The headless-green close (live-paint gates, derived roster, ship precondition); the no-silent-drop fold ledger; the historical-coverage close; a11y/perf/Safari; first-principles new-capability frontier |

**Why 7, not the bands in PLAN.md §Bands:** the provisional bands (F/D/C/M/V/S/Q) are a
SEQUENCING device; the workstreams are the CONVERGENCE-LOOP unit. WS1=Band F, WS2=Band D,
WS3=Band M(glass arm), WS4=Band C+M(motion arm), WS5=Band V, WS6=Band S, WS7=Band Q+the
first-principles additions. The split of glass (WS3) from motion/components (WS4) honors the
user's TWO explicit directives as first-class workstreams (dock-refinement=WS2,
glass-standardization=WS3).

---

## 2 — THE WORKSTREAM DEFINITIONS

### BG-WS1 — Shell · Routing · Field (the foundational repair)

**Gestalt brief.** The linchpin: clicking a nav link must unmount the old page and mount the
new (today it freezes — `<main>` childCount 2→3, stale heading). ONE coherent idiomatic route
transition replaces the four-mechanism contrivance pile (`<Transition>` default-mode race +
`.scroll-build` mount-animation collision + the bloom-find-child hack + two no-op
`startViewTransition` watchers). The metallic `.paper-field` (conic cel-sheen + 4 high-chroma
radials + 0.22 feTurbulence speckle) is retired for ONE shared offscreen-paused `<Aurora>` as
the universal page field (the budget honored by ownership+suppression, not N contexts). The
aberrant top bar (an invalid `scroll(<dashed-ident>)` → `auto` → full-width scaleX(1)) and the
viewport-dominating hero headers (the √φ display clamp's runaway vw coefficient + poster-rung
mis-selection) are fixed at the source.

**Seed audit files.** `D-routing.md`, `D-field-aurora.md`, `D-scroll-topbar.md` (top-bar arm),
`D-hero-type.md`, `A-motion-arch.md` (F1/RC4 route layer), `A-a11y-perf-crossengine.md` (F1
route, F5 field, §AURORA-VS-BUDGET reconcile), `A-glass-token-arch.md` (F3 field),
`P-design-adherence.md` (F2/F3/F4/F6), `P-bd-coverage.md` (shell-broken integration),
`P-historical-coverage.md` (L1/L2/L5/L9/L10).

**Convergence criteria (the bar = real-paint/behavioral).**
- Live nav across ≥6 cross-category hops: at every settle `main.querySelectorAll('article').length === 1`
  AND the heading === the destination's title; a 5-nav-in-<300ms stress survives one survivor
  (the last destination); no reload required; PRM keeps fade drops transform; Chrome AND Safari.
- Every non-substrate route paints a calm warm AURORA drift behind the glass — NO conic sheen,
  NO brown slab, NO visible woven speckle, per-route hue shift, glass clears AA both modes,
  EXACTLY ONE GL context on a non-substrate route (the shell aurora persists across navs,
  substrate routes suppress it). The aberrant top bar reads `scaleX(0)` (invisible) at
  scroll-top on EVERY route, fills to ~50% at half-scroll.
- `/compositions/hero` + every `hero:true` page: the hero `<h1>` rendered block ≤ ~0.62×svh at
  375/768/1440/1920, both modes; ≥1 preview card above the fold at 1440×820; sentence-headline
  heroes resolve ≤display-3, single-word/number poster moments keep mega/hero/audacious.
- The scroll-shrink title register paints once routing mounts (verified downstream — the actual
  unify is WS4, but WS1 proves the page mounts so the timeline can arm).

**Candidate waves.** `BG.W-ROUTE-TRANSITION` (one `out-in` transition + delete the contrivances)
· `BG.W-VT-ROUTE-ENHANCE` (deferred/optional native-VT enhancement tier) · `BG.W-FIELD-AURORA`
(retire `.paper-field`, mount ONE shared shell aurora) · `BG.W-FIELD-ACCENT-RECONCILE` (collapse
the per-page-bg category map; substrate routes opt OUT) · `BG.W-PAPER-GRAIN-OPTIN` (demote global
grain to per-surface) · `BG.W-SCROLL-PROGRESS-RAIL` (the named-timeline progress rail; kill the
full-width bar) · `BG.W-HERO-FIT` (height-aware fit-cap, one chassis-owned title path).

---

### BG-WS2 — Dock convergence (the user's dock-refinement directive)

**Gestalt brief.** The dock needs a great deal of refinement: LESS blur, smoother/weightier
animations, and the 33-file KISS/DRY re-modularization. The dock dir carries FIVE separate
`SpringProgress` engines (violating its own "ONE spring, ONE clock" canon), TWO near-duplicate
morph engines (the AY.W-GOD1 fold never landed), ~1500 LOC of dead/≤1-consumer composables
(`useDockContextSilhouette` 551 DEAD, `useDockFission` 604 + 552 CSS for one demo,
`useDockItemDrag` 302 for one demo), and a 711-line god-SFC. The V↔H morph is a modal of two
synthetic docks with a broken esc and a dead VT-crossfade default — it must become a BUTTON IN
THE DOCK that flips the real dock's own orientation in place (teardrop-only). The persistent ℱ
brand section is removed (and its Fourier easter egg). Dock scrolling works (a capped axis is
ALWAYS a scroll axis). The dock blur becomes the SAME calm blur as cards/buttons (the
cross-cutting handoff to WS3 — WS2 owns the dock structure, WS3 owns the unified blur scale).

**Seed audit files.** `A-dock-arch.md` (the 6-wave dock plan), `D-dock-morph-persistent.md`
(ℱ-cut + V↔H-in-place), `D-previews-dockscroll.md` (dock-scroll Part B), `D-configurator.md`
(F2/F5/F6 the dock IA spill + the gear reach), `A-motion-arch.md` (F2/F7 the four morph engines
+ the V↔H contradiction), `A-a11y-perf-crossengine.md` (F3 modal focus-trap), `A-demo-arch.md`
(F7/F8 shell-dock DRY + monolith stories), `P-be-bf-fold.md` (Group A landed-engine fold),
`P-historical-coverage.md` (Theme 1, A1-A13, R3/R11/R12/R13/R14/R15).

**Convergence criteria.** One `new SpringProgress` site in the dock dir (grep-asserted); the
dock dir drops ~33→~24 files with no broken import; layer-swap + collapse morph paint-verified
identical both modes, PRM seats synchronously (no 10×74 sliver). Clicking the in-dock morph
button flips the real shell nav dock V↔H IN PLACE (no modal opens, no `role="dialog"` overlay
exists, esc is moot) with a continuous liquid teardrop (`--dock-morph-t` 0→1, goo bridge
occludes the reflow midpoint), bidirectional + interruptible + PRM-snap; NO `startViewTransition`
crossfade arm survives. The SidebarDock's trailing utility controls (dark-toggle, morph, gear)
are reachable via scroll at 1280×600 (`scrollHeight>clientHeight` AND `overflow-y:auto` AND
every control hit-tests to itself AND the cross-axis inset plate is NOT clipped). No ℱ brand
control renders atop either dock; Foundations rejoins the category nav; the rail seats. The dock
animations read smoother/weightier (the 12 laws reach the dock V↔H via the unified engine —
arcs/overlapping/follow-through, not a flat blend).

**Candidate waves.** `BG.W-DOCK-MORPH-UNIFY` (5 springs→1 `useDockSpring`, delete
`useLayerTransition`, one morph engine) · `BG.W-DOCK-DECOMPOSE` (split GlassDock.vue into
colocated sub-tree) · `BG.W-DOCK-CUT` (delete dead+speculative composables) ·
`BG.W-DOCK-INPLACE-MORPH` / `BG.W-DOCK-MORPH-IN-PLACE` (V↔H dock button, no modal, no crossfade)
· `BG.W-DOCK-REMOVE-BRAND` / `BG.W-DOCK-PERSISTENT-CUT` (remove ℱ + the egg) ·
`BG.W-DOCK-BUSY-SINGLE` (one "is the dock mid-morph?" signal; resolve `containerName` trap) ·
`BG.W-DOCK-CAP-SCROLLS` (capped axis is a scroll axis) · `BG.W-DOCK-OVERFLOW-FADE` (feather the
scroll edge) · `BG.W-DOCK-UTILITY-REACH` (the utility footer always reachable) ·
`BG.W-DOCK-FISSION-WIRE` (wire-or-retire the fission/silhouette engines; decide ≥2 consumers) ·
`BG.W-SHELL-DOCK-DRY` (one `useDockShellRail` composable, purge debris-comments) ·
`BG.W-DOCK-STORY-MODULARIZE` (split liquid-playground 930 / overview 680 onto examples/).

---

### BG-WS3 — Glass standardization (the user's glass-coherence directive)

**Gestalt brief.** The user's explicit ask: many components need ONE coherent glass register —
the dock must read with the SAME blur/tint/specular as the buttons/cards/items/menus, and LESS
blur overall. Today the dock uses `--glass-blur-dock` 9px while cards use resting 10px/floating
13px (they diverge), and the glass system carries FIVE disjoint chromatic tint axes (three doing
the identical `color-mix(in oklab, plate, hue strength)` op; one — ambient — read everywhere,
WRITTEN nowhere, permanently inert). The maroon dock cast is the `--cartoon-ink` chroma-floor
math (`max(c, 0.11)` at L0.16 → pure oxblood); the card corners don't clip because the five
ladder rungs the real `<Card>` composes carry NO `overflow`/`isolation` (while `.glass-card`/
`.glass-btn` DO — two clip dialects). This workstream collapses the glass material to ONE calm
register: a single blur scale (dock a peer of components, calmer than today), ONE
`(hue,strength)×{plate,rim}` tint axis (retire fill/ambient), the cast as in-gamut warm ink (or
a soft dock under-shadow), ONE paint-box clip discipline on the material, and the re-pasted
per-register idioms (tint-floor/press-squash/loud/warm-zero) factored into shared primitives.

**Seed audit files.** `A-glass-token-arch.md` (the 5-wave glass plan: cast/field/tint-unify/
idiom-factor/liquid-morph-rehome), `D-aliasing-clip.md` (the cast/clip/corner trio),
`A-a11y-perf-crossengine.md` (F4 cast, F10 dock-reads-heavier, the cross-engine constraints),
`P-design-adherence.md` (F1 cast, F10 dock-legibility-recal, the §Shadows amendment),
`P-historical-coverage.md` (Theme 2/3/4 no-gray/dynamic-darkening/metallic, L3, R10-5),
`P-firstprinciples-gaps.md` (F3 glass fidelity: moving shadow / live refraction / hue-bleed),
`A-deadcode-legacy.md` (F4/F5/F7/F8 dead glass tokens + liquid-morph.css placement),
`P-be-bf-fold.md` (Group B/D glass-material foundation tokens + breadth).

**Convergence criteria.** A single calm blur scale: the dock and cards/buttons resolve the SAME
blur register (a peer, not a special heavier dock), the whole ladder calmer than 4.2.0 (structure
reads through the plate); a live capture shows the dock + a content Card reading as ONE glass
material over the warm field. ≤2 chromatic tint token-pairs exist (plate, rim); zero inert
chromatic axes (every read axis is also written). The composited cast color over the warm field
+ over white resolves a warm BROWN (channel order R>G>B, B>0, NOT `rgb(N,0,0)`) at both stamp
lightnesses, both modes — no maroon halo on any dock/card. Every `[data-slot="card"]` resolves
the paint-box clip (`overflow:clip`+`isolation:isolate` OR the material-group clip); a top-corner
pixel sample of a glass card over a busy backdrop reads a clean rounded edge (no rectangular
fringe); the dock bottom-left shows no red wedge and no hard rectangular fringe. The re-pasted
idioms are declared ONCE (the 12%/15% floor, the `scale:1.04 0.94` press, the `--motion-weight:1`
loud class, the warm-zero stop); zero dead tokens / dead `@property`s in the glass cascade.

**Candidate waves.** `BG.W-CARTOON-INK-GAMUT` / `BG.W-CAST-INK-DEMAROON` / `BG.W-CARTOON-INK-WARM`
(the in-gamut warm-brown ink; the no-floor → `--foreground` re-point) · `BG.W-DOCK-CAST-RETIRE`
(delete the self-defeating dock cast child) · `BG.W-GLASS-CLIP-DISCIPLINE` (ONE paint-box clip on
the material) · `BG.W-GLASS-TINT-UNIFY` (5 axes → 1 plate+1 rim) · `BG.W-GLASS-IDIOM-FACTOR`
(factor the re-pasted idioms; delete dead tokens) · `BG.W-GLASS-BLUR-PEER` (the unified calm blur
scale — dock == card == button; the user's core directive, NEW seam over the W-GLASS-CAL ladder)
· `BG.W-LIQUID-MORPH-REHOME` / `BG.W-DEMO-STYLE-REHOME` (the 850-line demo-only liquid-morph.css
out of `src/styles`) · `BG.W-DOCK-LEGIBILITY-RECAL` (re-tune the adaptive AA knee for the warm
field) · `BG.W-GLASS-CONSUMER-BAND` (the landed-dead foundation-token consumers + breadth —
sequenced after the live-defect waves) · `BG.W-GLASS-DYNAMICS` (the iOS-26 dynamic terms: moving
shadow + live refraction + hue-bleed observer; the chroma-sample term — folds the firstprinciples
F3 frontier; sequenced late).

---

### BG-WS4 — Components · Demo · Encapsulation (the architecture discipline)

**Gestalt brief.** Restore the dead-at-the-gestalt registers (scroll-shrink titles, the
configurator drawer, live category previews) and bring the whole non-dock surface to KISS/DRY/
colocation. The colocation gate is BLIND to 6 complex dirs (README-as-marker, not structure); 3
live violations ship (configurator/sortable-list/watercolor-dot composables at dir root). The
>500-line splits (timeline 9-flat-files, Slider 294-inline-CSS, the goo-barbell carousel≡pager
CSS dup, the canvas-lifecycle/observer/blob/goodot/tabs internal seams) need carving. The motion
layer carries ~4000 LOC of overlapping morph/reveal/press primitives — `useLiquidMorph` (462)
DEAD, `useVizChoreography` (424) DEAD, the FLIP trio (`useLiquidReveal`/`useBloomUp`/
`useDockCtaReceive`) three near-duplicate rAF runners over an imported-and-ignored kf
`flipShared`, the `useMorphField()` FUNCTION never called (only its data table consumed). The
demo carries dead chassis (DemoFrame 0-importers, StorySectionHeader orphan), a half-migrated
framing register (ShowcaseFrame vs raw triplet ×44), and >700-line studio monoliths.

**Seed audit files.** `D-scroll-topbar.md` (scroll-shrink unify), `D-configurator.md` (F1/F3
the wiring is sound, the Sheet positioning + dock IA are the bugs), `D-category-previews.md`
(per-story specimen registry), `A-component-families.md` (colocation gate + timeline +
SFC-CSS-sweep), `A-component-splits.md` (the >500 splits), `A-composables-colocation.md` (DI +
dead-composable cut + morph zoo + uniformBridge + scroll-reader), `A-motion-arch.md` (the morph
+ FLIP + press + spring-register + 12-laws waves), `A-deadcode-legacy.md` (dead-code/legacy/
alias/demo-style-rehome), `A-demo-arch.md` (chassis consolidate + viz-studio-adopt + manifest),
`P-historical-coverage.md` (L4/L7/L11, batch1 #3/#4/#5, B1/B2/B4, R8-12, R19 de-shadcn).

**Convergence criteria.** Live: on a content page the title scale goes 1→~0.82 across the first
~160px of `<main>` scroll (the page-title collapse register is ONE keyframe family the card +
page + hero share); the configurator gear opens a working configurator panel ON-screen (gear
hit-tests to itself, Sheet `top` resolves to 0, dark toggle flips the global mode); the `/forms`
landing shows a real Select on the select card + a real Slider on the slider card (per-story
distinct specimens, ≥45% occupancy, zero `<canvas>` in the bento subtree). Source/structure:
`proof:colocation` binds by STRUCTURE (the 3 root-composable violations fixed); every >500-line
split lands its leaves with the gates following the composition; ONE FLIP runner in `src/`
(`flipShared` consumed, ~700 LOC removed); `useLiquidMorph`/`useVizChoreography`/
`useDockContextSilhouette` DEFINITION-ABSENT; the demo carries ONE framing chassis (DemoFrame +
StorySectionHeader deleted); the spring table ≤6 rows (timeline rows re-pointed); no
`selectableChipVariants` alias; the de-shadcn form sweep gate-locked.

**Candidate waves.** `BG.W-SCROLL-SHRINK-UNIFY` (one page-title collapse register; retire the 3
forks) · `BG.W-SHEET-INSET-ROOT` (Sheet/Dialog positioning structural, not content-scan
utility) · `BG.W-CONFIG-OPEN-VERIFY` · `BG.W-SPECIMEN-PER-STORY` + `BG.W-BENTO-FRONTDOOR-UNFORK`
+ `BG.W-SPECIMEN-VIZ-FLAVORED` + `BG.W-SPECIMEN-REAL-CONTENT` (live per-story previews) ·
`BG.W-COLOCATION-GATE-STRUCTURAL` + `BG.W-TIMELINE-ENCAPSULATE` + `BG.W-SFC-CSS-PARTIAL-SWEEP` +
`BG.W-GOO-BARBELL-CSS` + `BG.W-GEOMETRY-LEAF-CANON` + `BG.W-SHARED-STALE-PROP-DECIDE` (the
encapsulation set) · `BG.W-CANVAS-LIFECYCLE-LEAVES` + `BG.W-AMBIENT-HISTOGRAM-LEAF` +
`BG.W-BLOB-KINEMATICS-LEAF` + `BG.W-GOODOT-SETUP-SPLIT` + `BG.W-TABS-KEYBOARD-LEAF` +
`BG.W-BLOOMUP-HEADER-TRIM` (the >500 carves) · `BG.W-MORPH-ENGINE-ONE` + `BG.W-FLIP-ONE` +
`BG.W-PRESS-MOUNT-RECONCILE` + `BG.W-SPRING-REGISTER-TIDY` + `BG.W-12-LAWS-UNIVERSAL` (motion
consolidation) · `BG.W-DEAD-COMPOSABLE-CUT` + `BG.W-DEADCODE-CUT` + `BG.W-CHIP-ALIAS-KILL` +
`BG.W-DEAD-TOKEN-SWEEP` + `BG.W-OVERFIT-RATIFY` (the cut set) · `BG.W-UNIFORM-LAYOUT-BUILDER` +
`BG.W-SCROLL-READER-UNIFY` + `BG.W-OBSERVER-VELOCITY-TIDY` (composable DRY) ·
`BG.W-DEMO-CHASSIS-CONSOLIDATE` + `BG.W-VIZ-STUDIO-ADOPT` + `BG.W-MANIFEST-COLOCATE` (demo arch)
· `BG.W-DESHADCN-SWEEP` (the BF R19 de-shadcn FORM gate).

---

### BG-WS5 — Viz refinement (the substrate band)

**Gestalt brief.** The procedural viz RUNTIMES are sound and warm — the "previews broken" gestalt
is (a) the `/substrates` landing showing 11 identical frozen aurora stills (category-keyed, not
story-keyed), (b) every non-aurora wrapper carrying the `contain-intrinsic-size: auto none`
zero-collapse trap, (c) the BD-built canonical leaf sizer (`sizeBacking`) adopted by ZERO
consumers (the cut-over's optional arg let it never happen — 8 naive `clientWidth||320` closures
with no recovery, plus per-frame aspect reads), and (d) the BD-specced reveal-bloom ENTRANCE that
shipped as a documented no-op (its Band-0 cartoon tokens never minted). Plus the KISS regression:
fourier-field + constellation were migrated to the full WebGPU dual-stack against their OWN
recorded "DO NOT MIGRATE" verdict (a few-dozen phasors do not need a compute pass), and the 9×
`uniformBridgeWGPU.ts` packers + 9× setup files are per-viz-duplicated where the
`procedural-color`/`waveField` shared-chunk discipline proves the factoring is possible.

**Seed audit files.** `A-viz-census.md` (the 4-wave viz plan: sizer-adopt-hard / reveal-bloom /
demigrate / substrate-factor), `D-previews-dockscroll.md` (Part A the bento dispatch +
intrinsic-size + sizer-adopt), `D-field-aurora.md` (F5 substrate routes self-stage),
`A-composables-colocation.md` (F5 the 9× uniformBridge DRY), `A-component-splits.md` (the viz
>500 carves), `P-historical-coverage.md` (Theme 9, batch2 C1-C6, the dot-flow rebuild),
`P-bd-coverage.md` (Band A substrate-good per-viz-unverified), `P-chronic-deferred.md` (the
half-shipped SUBSTRATE-SIZE-UNIFY + the unshipped REVEAL-BLOOM).

**Convergence criteria.** On `/substrates` the 11 cards show 11 visually-DISTINCT previews
(per-card pixel-hash differs), ≤1 live GL/WGPU context on the landing, the hovered card animates,
both modes. `grep "clientWidth ||" src/components/custom` → ZERO; `grep dprPolicy` → ≥9; per-viz
backing == round(gBCR×dpr) at the SPA-nav arm window (not just hard-load) on Chrome AND Safari;
the offscreen-park fires for the previously-park-less viz; mount each viz below the fold + scroll
into view → backing ≠ 300×150 ≠ 1px + non-zero painted pixels (the `auto none` trap closed). A
paired chromium+webkit frame-series shows the entrance field luminance overshoot ≥12% then settle
(the reveal-bloom shipped), canvas rect stays scale(1), scroll-off-and-back fires zero second
bloom, PRM → instant. fourier-field + constellation render on `useCanvas2D` (no
`createGpuSubstrate`, no `.wgsl`), ≥2000 LOC + ≥9 files deleted, the README and code agree. ≤1
shared WGPU-fragment-setup leaf (no 9 hand-rolled copies), parity captures still pass.

**Candidate waves.** `BG.W-VIZ-PREVIEW-LIVE` (per-story budget-bounded previews) ·
`BG.W-VIZ-INTRINSIC-SIZE` (kill the `auto none` trap, one `--viz-intrinsic-block` token) ·
`BG.W-VIZ-SIZER-ADOPT` / `BG.W-VIZ-SIZER-ADOPT-HARD` (force the leaf sizer, required arg, delete
the closures + per-frame aspect reads + aurora's own copy) · `BG.W-VIZ-REVEAL-BLOOM` (the
liquid-weight field entrance; mint the Band-0 tokens) · `BG.W-VIZ-DEMIGRATE` (fourier +
constellation back to Canvas2D) · `BG.W-VIZ-SUBSTRATE-FACTOR` (one fragment-WGPU-setup leaf;
collapse the 9× uniformBridge) · `BG.W-DOTFLOW-REBUILD` (the density-vignette halftone surpass —
folds the historical C2).

---

### BG-WS6 — Siri capabilities (the new-capability triumvirate)

**Gestalt brief.** The two genuine NEW capabilities, deftly dock-integrated. The Siri glass ISLAND
is ONE morphing glass surface with four seated forms (pill → droplet → stadium → panel) on a
single continuous radius+size scalar, anchored to the Dynamic-Island origin, descending/morphing/
answering/dismissing over content, with a warm under-glow + an adaptive backdrop dim. The Siri
WAVEFORM is a warm prismatic lens-flare light-bar (cyan/white hot core fanning amber→orange→pink,
warm half dominant) that pulses INSIDE the island, voice-amplitude-reactive, blooming into the
under-glow. The capability is genuinely new but the MECHANISM is entirely a COMPOSITION of shipped
substrates — the `useDockFission` one-spring/one-scalar/one-rAF morph loop shape, `.glass-capsule`
+ the deep/rim/material ladder, the `useGpuSubstrate` WebGPU substrate, the `spectrum-walk`
OKLCH/shorter-hue ramp, the `usePointerVelocityField` push-API amplitude-feed model, the
modal-scrim backdrop seam. Any wave that forks a second spring/canvas/color-math/glass recipe
violates the cardinal laws. The third wave wires both into the GlassDock voice/search entry (the
"Search or Ask" pill is the island's rest form; the dock's `useDockSearch` surfaces in the panel).

**Seed audit files.** `S-siri-frames.md` (the frame-by-frame log + the design-language synthesis +
the substrate-composition map), `P-firstprinciples-gaps.md` (F1 the absent capability family + the
HEADLINE), `P-historical-coverage.md` (Theme 6, L14).

**Convergence criteria.** A frame-series: the island descends (source-rect FLIP from the
top-anchor), the app reads through a deepening backdrop blur as it pulls down, the four forms morph
on ONE `--siri-island-t` scalar on the `--spring-dock` register (no new spring, the forms are DATA
not code paths), the answer is `aria-live`-announced, PRM → calm static + instant descend, BOTH
engines (Chromium + WebKit, the §L7 paired bar). The waveform reads as the reference warm prismatic
lens-flare (a gestalt judgement on a fresh capture): the prismatic streak + warm bloom + the
amplitude pulse, the rim-mode degrade in the rich-content form, ONE shader (streak/rim mode axis),
the color ramp CONSUMES `spectrum-walk` (no re-rolled color math, no AudioContext dep), PRM-freeze,
both modes. The dock-search wire is the ONE pipeline (not a second search engine); the island
shares the dock's `--spring-dock` clock + `.glass-capsule` material, box-inviolate beside the dock
engine. The waveform's WGSL↔GLSL parity is within the calibrated OKLab ΔE bar.

**Candidate waves.** `BG.W-SIRI-ISLAND` (the morphing glass surface + the four forms + the
"Search or Ask" pill rest form) · `BG.W-SIRI-WAVEFORM` (the WebGPU prismatic light-bar viz) ·
`BG.W-SIRI-DOCK-INTEGRATION` (the dock voice/search-entry seam — the triumvirate's third) ·
`BG.W-GLASS-BLUR-ENGAGE` (the backdrop-blur-engage transition scalar the descend needs — folds the
firstprinciples T9 gap; coordinate with WS3's blur work).

---

### BG-WS7 — Quality · Coverage · Close (the headless-green cure + the no-silent-drop fold)

**Gestalt brief.** The structural through-line: the close ORACLE must read live paint, the release
TAG must require it, and NO deferred item may silently drop. `proof:ba-gestalt` reads a frozen BC
roster (the BD.W-GESTALT-ROSTER-GROW never ran); its freshness/probe/scope are author-self-certified
and narrow (paper.css/AppShell/SectionLanding/the substrate routes are watched by NOTHING); the
only live-pixel layer (`--run pi`, ~79 specs) is `local`-only and severed from the release tag, and
32 of those specs use `reducedMotion` (freezing the field, dodging the metallic). The probe is a
warm-cream-vs-grey test with no hue band, no upper-chroma bound, no edge/clip/top-bar/routing check.
The BD close flipped the keystone green by re-shooting the frozen captures (~77 "stale" re-points)
rather than executing the roster-grow. Separately, the BF 32-row DEFERRED-CENSUS + the AX
28-row register (re-stamped BC) + the in-src booked-successors + the BE/BF 69-wave-spec disposition
are all UN-DECIDED with no mechanical floor (`proof:be-fold-ledger` was itself the deferred item).
A cluster of `release`-tagged gates greens over DEAD/demo-private mechanisms. This workstream builds
the no-silent-drop machine FIRST, then the live-paint gates, then closes the a11y/perf/Safari floors
and the first-principles new-capability census, and owns the honest re-cut.

**Seed audit files.** `A-gate-system.md` (the 6-wave gate plan + the headless-green diagnosis),
`P-chronic-deferred.md` (the deferred-item ledger + the fold list), `P-be-bf-fold.md` (the per-wave
disposition ledger), `P-historical-coverage.md` (PART 0 the disease + BG.W-PAINT-IS-THE-GATE),
`P-bd-coverage.md` (the inflation root cause), `A-a11y-perf-crossengine.md` (the CONSTRAINTS +
Safari + lighthouse re-pin), `P-firstprinciples-gaps.md` (the DS-completeness census + Safari-parity
gate + the new families), `P-design-adherence.md` (the DESIGN.md amendments).

**Convergence criteria.** `proof:ba-gestalt` is born-RED on the shipped 4.2.0 tree (it MUST fail the
current broken UX) and GREEN only when the routing/field/previews/cast/hero paint correctly; its
roster is BG-dated, its `surface-paths` are DERIVED (a route file outside surface-paths REDs — ending
author-self-certification), its probe vocabulary carries hue-band + chroma-ceiling + edge-cast +
top-bar-strip + corner-clip predicates with self-test bites (a synthetic red-cast/metallic/top-bar
capture REDs). A `release`-eligible LIVE close arm runs the `--run pi` enrolled set against a served
demo BEFORE the irreversible tag; a re-stamp-only close (no paint-source diff) REDs (the anti-evasion
bite). A gate proves routing navigates (old-page-gone + single-child `<main>` + new-heading over ≥6
hops, CI-headless DOM). `BG/FOLD-LEDGER.{json,md}` carries a DECIDED disposition for every BF census
D#, every AX register row, every in-src book, every BE/BF wave id (BUILD→a real BG wave /
DEFER-with-trigger / RETIRE-with-rationale; a phantom dest or a `book` disposition REDs); no `release`
gate locks a 0-consumer mechanism; the AX register is re-stamped BG with every trigger re-evaluated.
The lighthouse floor is re-pinned at the achieved post-fix number (never lowered); the constraint
manifest is machine-locked; the new-capability census (chart/calendar/DS-completeness) carries a
build-or-defer verdict per family.

**Candidate waves.** `BG.W-PAINT-IS-THE-GATE` (the disease cure — HIGHEST leverage) ·
`BG.W-GATE-ROUTING-LIVE` (routing-navigates gate) · `BG.W-GATE-FIELD-AURORA` +
`BG.W-GATE-PREVIEWS-RENDER` (the live-render defect gates) · `BG.W-GATE-UNIFORM-BLUR` /
structural-pixel-predicates (widen the probe vocabulary) · `BG.W-GESTALT-ROSTER-RE-POINT` /
`BG.W-GESTALT-REPOINT` (derived-surface roster, BC→BG) · `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION`
(pixels-painted as a tag precondition) · `BG.W-DEFERRED-LEDGER` + `BG.W-BE-BF-LEDGER` (the
no-silent-drop machine + the per-wave parity clause) · `BG.W-JUBILANCE-DECIDE` +
`BG.W-DEAD-GATE-SWEEP` + `BG.W-SPIKE-DELETE` (decide-or-retire the dead engines + downgrade their
gates) · `BG.W-DISPOSITION-RESTAMP` (re-stamp the AX register BG) · `BG.W-SAFARI-PARITY-GATE` +
`BG.W-SAFARI-VALIDATE` (the cross-engine cadence) · `BG.W-CONSTRAINT-MANIFEST` (the a11y/perf/Safari
constraints doc + gate; lighthouse re-pin) · `BG.W-CHART-FAMILY` + `BG.W-DATE-CALENDAR` +
`BG.W-DS-COMPLETE` (the first-principles new families — decide-don't-overfit, sequenced LAST) ·
`BG.W-CUT` (the honest re-cut).

---

## 3 — THE MASTER DEFECT → WORKSTREAM MAP (D1-D13, no orphan)

| # | Defect | Owner WS | Owning audit | Notes |
|---|--------|----------|--------------|-------|
| **D1** | Routing freeze | **BG-WS1** | D-routing | The linchpin; `out-in` + delete the 4-mechanism pile |
| **D2** | Metallic background everywhere → aurora per page | **BG-WS1** | D-field-aurora | Retire `.paper-field`; ONE shared shell aurora |
| **D3** | Red/maroon cast + card corners don't clip + dock bottom-left aliasing | **BG-WS3** | D-aliasing-clip | The in-gamut warm ink + ONE clip discipline (dock cast retire) |
| **D4** | Titles no longer scroll-and-shrink | **BG-WS4** | D-scroll-topbar | Downstream of D1; the scroll-shrink-unify (one register, 3 forks retired) |
| **D5** | Aberrative bar at top of every page | **BG-WS1** | D-scroll-topbar | The invalid `scroll(<dashed-ident>)`→auto; the named-timeline rail fix |
| **D6** | /substrates previews broken | **BG-WS5** (viz) + **BG-WS4** (bento dispatch) + **BG-WS1** (routing) | D-previews-dockscroll, A-viz-census | Three-cause: the frozen-still dispatch (WS4/WS5), the sizer/intrinsic trap (WS5), the routing freeze (WS1) |
| **D7** | Configurator drawer broken | **BG-WS4** | D-configurator | The wiring is sound; the Sheet positioning (structural) + dock IA reach (WS2 co-dep) are the bugs |
| **D8** | Persistent ℱ brand section → REMOVE | **BG-WS2** | D-dock-morph-persistent | Demo-IA cut + the Fourier egg retirement |
| **D9** | Page transitions broken (= D1) | **BG-WS1** | D-routing | Same root as D1 |
| **D10** | /compositions/hero broken, headers WAY too large | **BG-WS1** | D-hero-type | Height-aware fit-cap; one chassis title path; rung-by-content discipline |
| **D11** | Category cards waste space → live REAL previews | **BG-WS4** | D-category-previews | The per-story specimen registry; front-door unfork |
| **D12** | Dock scrolling broken | **BG-WS2** | D-previews-dockscroll (Part B) | A capped dock axis is ALWAYS a scroll axis |
| **D13** | V↔H morph is modal, esc broken; only teardrop works → dock button, in-place | **BG-WS2** | D-dock-morph-persistent | Delete the modal + the VT crossfade; in-place orientation flip |

**Every D1-D13 maps to exactly one PRIMARY workstream** (D6 has explicit cross-WS contributions
because its gestalt is the union of three root causes; the bento dispatch is WS4/WS5, the sizing
is WS5, the routing precondition is WS1 — recorded so no arm is dropped).

---

## 4 — THE DEFERRED-FOLD LEDGER (every chronic/deferred item → a workstream, no silent drop)

This is the seed for `BG.W-DEFERRED-LEDGER` (owned by WS7). Source: `P-chronic-deferred.md`
(Class 1 the BF 32-row census, Class 2 the AX 28-row register, Class 3 the in-src books, Class 4
the BD P10-HARDEN tail, Class 5 the booked-pending tokens) + `P-be-bf-fold.md` (the per-wave
disposition). Every row carries `{disposition · owner WS}`.

### Class 1 — the BF 32-row DEFERRED-CENSUS

| ID | Item | Disposition | Owner WS |
|----|------|-------------|----------|
| D1 | 5-way rAF re-fork of useLiquidReveal | BUILD (one FLIP runner) | WS4 (W-FLIP-ONE) |
| D2 | Undeleted spike useLiquidMorph + liquid-morph.css | RETIRE/REHOME | WS4 (W-DEAD-COMPOSABLE-CUT) + WS3 (W-DEMO-STYLE-REHOME) |
| D3 | V↔H crossfade facsimile not the real morph | BUILD (in-place button) | WS2 (W-DOCK-INPLACE-MORPH) |
| D4 | Scroll fluidity regressed | BUILD (cap-scrolls) | WS2 (W-DOCK-CAP-SCROLLS) |
| D5 | Binding-π layer absent | BUILD | WS7 (W-PAINT-IS-THE-GATE) |
| D6 | proof:ba-gestalt points at BC | BUILD (re-point + derived surface) | WS7 (W-GESTALT-ROSTER-RE-POINT) |
| D7 | Safari zero verification | BUILD (Safari cadence) | WS7 (W-SAFARI-PARITY-GATE) |
| D8 | Manual Safari-Metal goo p50 budget | DEFER-with-trigger (real Metal box) | WS7 (ledger by-name) |
| D9 | Phantom consumer-evidence (grep not call-sites) | BUILD (harden the gate class) | WS7 (W-DEAD-GATE-SWEEP) |
| D10 | Dead foundation tokens (--glass-fill-tint/-bg-sheet) | RE-AUDIT (partial; tint now wired) | WS3 (W-GLASS-TINT-UNIFY) |
| D11 | The disposition machine never built | BUILD FIRST | WS7 (W-DEFERRED-LEDGER) |
| D12 | useDockContextSilhouette ZERO consumers | DECIDE (wire ≥2 or retire) | WS2 (W-DOCK-CUT) / WS7 (W-JUBILANCE-DECIDE) |
| D13 | useHaptic+useCelebrationBurst ZERO call sites | DECIDE (wire ≥2 or retire) | WS7 (W-JUBILANCE-DECIDE) |
| D14 | Neck does not span the gap (fission filament) | BUILD (if fission kept) | WS2 (W-DOCK-FISSION-WIRE) |
| D15 | Dead φ-tier projection math (projectFacets) | WIRE-or-DELETE | WS2 (W-DOCK-FISSION-WIRE / W-DOCK-CUT) |
| D16 | n-ary unproven; dead radial/inward signatures | RETIRE the dead signatures | WS4 (W-DEAD-COMPOSABLE-CUT) |
| D17 | Corner aliasing (clip-path fix not survive) | BUILD | WS3 (W-GLASS-CLIP-DISCIPLINE) |
| D18 | Icon visibility (facets fade to 0) | BUILD (if facets kept) | WS2 (W-DOCK-FISSION-WIRE) |
| D19 | De-shadcn sweep + gate unbuilt | BUILD | WS4 (W-DESHADCN-SWEEP) |
| D20 | Grow/shrink on events (dock event-inert) | BUILD | WS2 (W-DOCK-CAP-SCROLLS / refinement) |
| D21 | Two unreconciled contextual models | FOLD to one | WS2 (W-DOCK-CUT) |
| D22 | Goo metaball demo-private | WIRE (if fission kept) | WS2 (W-DOCK-FISSION-WIRE) |
| D23 | Breadth bands (aurora satin/prism, GlassChip, lens-prism, squircle) | BUILD (late, born-RED each) | WS3 (W-GLASS-CONSUMER-BAND) |
| D24 | BE.W-VIZ-PARITY-METAL real-Metal capture | DEFER-with-trigger | WS7 (ledger by-name) |
| D25 | Always-on teardrop V↔H fidelity (perf) | DEFER-with-trigger | WS7 (ledger by-name) |
| D26 | Album-derived per-piece shade (GL color-seam) | DEFER-with-trigger | WS7 (ledger by-name) |
| D27 | kf snap-option by-name ask | DEFER (published surface wired) | WS7 (ledger by-name) |
| D28 | AY.W-GOD1 FLIP fold (useLayerTransition≈dockMorphContext) | BUILD | WS2 (W-DOCK-MORPH-UNIFY) |
| D29 | Persistent switcher rail surviving collapse | BUILD (chrome slot) | WS2 (W-DOCK-FISSION-WIRE) |
| D30 | useLiquidMorph vs useDockFission double-fork | RETIRE the orphan | WS4 (W-DEAD-COMPOSABLE-CUT) |
| D31 | useCelebrationBurst vs CompletionSeal double-primitive | RECONCILE | WS7 (W-JUBILANCE-DECIDE) |
| D32 | 6 BE gates carry release without binding π | DOWNGRADE/gate-behind-π | WS7 (W-DEAD-GATE-SWEEP) |

### Class 2 — the AX DISPOSITION-REGISTER (26 honest-holds, re-stamped BC)

ALL 26 `min-consumers n:2` honest-holds (panel-host-primitive · interruptible-reorder ·
button-icon-sm · dock-select-clamp-label · tooltip-mono-variant · select-size · spring-crisp-token
· metric-badge-icon · completion-seal-family · labeled-field-for-id · speedtest-a11y-bundle ·
raf-loop-demand-park · cross-document-vt · css-scope-state · interestfor-previews · css-text-box-trim
· css-interpolate-size · css-relative-color · glass-dialog-native-pilot · glass-native-select-pilot ·
inline-edit-primitive · labeled-slider-readout · directional-view-transition · drawer-content-spring ·
cartoon-quiet-preset · keyframes-prune-migration-dag) → **RE-STAMP BG, re-evaluate each trigger** —
**WS7 (W-DISPOSITION-RESTAMP)**. Two pending-flips to verify: `css-relative-color`→BB.W-DARK-INK-WARM
(landed 4.2.0?), `styles-critical-split`→BC.W-CSS-CRITICAL. Genuine resolutions kept: deck-subpath,
speedtest-native-first-receive, native-drawer-as-asChild (RETIRED), css-at-function (RETIRED).

### Class 3 — the in-src booked-successors

| Marker | Disposition | Owner WS |
|--------|-------------|----------|
| Deep-glass full 20px ceiling | DEFER-with-trigger (perf) / BUILD-late | WS3 (W-GLASS-CONSUMER-BAND ledger) |
| Chromatic-aberration RGB-split rim | DEFER-with-trigger / BUILD if displacement-mount lands | WS3 (W-GLASS-DYNAMICS sub-arm) |
| kf snap/bounds/rubberBand (useDragMorph) | DEFER (published surface wired) | WS7 (ledger by-name) |
| kf Oscillator/waveformValue loop-clock | DEFER (republish-gated) | WS7 (ledger by-name) |
| value.js /color subpath | DEFER (forward-compatible peer) | WS7 (ledger by-name) |
| --ease-cartoon-punch / --motion-weight reads | RESOLVED (verify on paint) | WS5 (W-VIZ-REVEAL-BLOOM mints the rest) |
| useCartoonCast drag-track DOM bridge | DEFER-with-trigger (opt-in) | WS3 (ledger by-name) |
| aurora cel-outline (cel:true) | DEFER-with-trigger | WS5 (ledger by-name) |

### Class 4 — the BD P10-HARDEN tail

3 stale proof scripts (proof-viz-dotflow over-broad grep · proof-concentric rename ·
proof-handmark CLAUDE.md-dependency) → **WS7 (W-DEAD-GATE-SWEEP)**. dot-flow rest-contrast → **WS5**.
Safari capture owed → **WS7**. category-landing GL-budget frozen-still → **WS4/WS5**.

### Class 5 — booked-pending tokens (mostly LANDED 4.2.0)

`--motion-weight`/`--ease-cartoon-punch` BUILT (P1) → **verify-on-paint** (WS5/WS3); not fresh
deferrals.

### The BE/BF per-wave disposition (P-be-bf-fold, Groups A-F)

Seeded into `BG.W-BE-BF-LEDGER` (WS7): Group A (6 LANDED dock engines → WS2 wire+paint), Group B
(9 glass/material → WS3 consumer-band + Safari floors), Group C (5 jubilance → WS7 decide +
gate-sweep), Group D (5 aurora/tabs breadth → WS3/WS5 breadth band), Group E (Safari/de-shadcn/
feel-asks → WS7 Safari + WS4 de-shadcn + WS2/WS3 feel-asks), Group F (process → WS7;
BE/BF.W-CUT SUPERSEDED → WS7 W-CUT). **No BE/BF wave is silently dropped; a LANDED engine cannot be
re-minted (the per-wave parity clause); a NEVER-BUILT breadth wave cannot be dropped.**

---

## 5 — THE HISTORICAL-COVERAGE CLOSE (every past request → a workstream)

Source: `P-historical-coverage.md` (the HEAD-verified matrix: ~70 de-duplicated requests, DONE 8 ·
PARTIAL 30 · REGRESSED 18 · DEFERRED 11 · DROPPED 2 · NEW 1). Every PARTIAL/REGRESSED/DEFERRED/
DROPPED/NEW row maps to a workstream (the DONE rows need no carry).

| Theme | First | HEAD status | Owner WS |
|-------|-------|-------------|----------|
| T1 Dock re-architecture (the dominant) | AX | PARTIAL/REGRESSED | **WS2** |
| T2 iOS-27 glassy / no-gray register | BA R10-5 | PARTIAL (over-corrected to metallic) | **WS3** + WS1 (field) |
| T3 Dynamic darkening / adaptive legibility | AX/AY G2 | ADDRESSED-but-regressed (hue-sample missing) | **WS3** (W-GLASS-DYNAMICS hue-bleed) |
| T4 Metallic/gray cure (warm-chroma floor) | BA R10-5 | SPLIT (gray-cure DONE; desired metallic aurora DEFERRED) | **WS3** (cure) + WS5 (desired metallic aurora viz) |
| T5 Liquid weight everywhere | MEMORY | PARTIAL (entrance not generalized; route-freeze) | **WS1** (route) + WS4 (W-12-LAWS + entrance-general) |
| T6 Siri additions | BG | NEW | **WS6** |
| T7 KISS/DRY/encapsulation/colocation | every tranche | VIOLATED at scale | **WS2** (dock) + WS4 (rest) |
| T8 No legacy / clean breaks | MEMORY | VIOLATED (undeleted spike, 5-way re-fork) | **WS4** (W-DEADCODE-CUT/W-FLIP-ONE) |
| T9 Procedural-viz refinement | AV | PARTIAL/live-defect | **WS5** |

**The CONTEXT.md live defects (§2.1 L1-L14):** L1/L2/L5/L9/L10 → WS1; L3 → WS3; L4 → WS4; L6 → WS5
(+WS4 dispatch +WS1 routing); L7 → WS4; L8/L12/L13 → WS2; L11 → WS4; L14 → WS6.

**The DROPPED rows (the only no-carrier items):**
- **D2 "Research MACRO FLOWER images + provide an ARRAY"** (the only HISTORICAL-RECAP GAP, no
  carrier): FOLD into **WS1 (W-FIELD-AURORA asset arm)** as an OPTIONAL consumer-asset arm OR
  formally DROP (presets-in-consumers — a blurred-image-source field is a consumer asset, not a
  library identity; the library ships the warm aurora). Decision recorded in the WS1 spec; the
  fold-ledger carries it as `DEFER-with-trigger (consumer-asset) | owner WS1` so it is not silently
  dropped.
- **macro-flower / blurred-image bg** (batch2 D3): same disposition — WS1 ledger by-name.

**No historical request is silently dropped:** every PARTIAL/REGRESSED/DEFERRED/NEW row above maps
to a workstream, and the two DROPPED rows are dispositioned (fold-as-optional-asset or
formal-drop-with-rationale) in the WS7 fold-ledger.

---

## 6 — THE FIRST-PRINCIPLES NEW-CAPABILITY FRONTIER (P-firstprinciples-gaps)

Beyond the defects + the historical carry, the audit names genuinely-MISSING capabilities. These
are gestalt ADDITIONS, decided-don't-overfit (the ≥2-consumer bar binds):
- **Siri island + waveform** (F1, the HEADLINE) → **WS6** (already first-class).
- **iOS-26 DYNAMIC glass terms** (F3: moving shadow, live refraction, hue-bleed observer, chromatic
  aberration) → **WS3** (W-GLASS-DYNAMICS, sequenced late, born-RED each).
- **Backdrop-blur ENGAGE transition** (F4 T9) → **WS6** (W-GLASS-BLUR-ENGAGE, the island descend
  needs it) + WS3 (the drawer detent coupling).
- **Generalized liquid entrance** (F4 T10) → **WS4** (W-LIQUID-ENTRANCE-GENERAL / W-12-LAWS).
- **Chart family** (F2, the only thing a real data app cannot do) → **WS7** (W-CHART-FAMILY,
  decide-with-booked-2nd-consumer).
- **Calendar/DatePicker** (F2, form-completeness + iOS signature) → **WS7** (W-DATE-CALENDAR, MEDIUM).
- **DS-completeness tail** (Kbd/Breadcrumb/Stepper/TreeView/AspectRatio/Resizable/ScrollArea/
  FileUpload/Rating/Toggle-tip/Menubar) → **WS7** (W-DS-COMPLETE, LOW, census-with-verdict).
- **Safari-parity gate** (F7) → **WS7** (W-SAFARI-PARITY-GATE, the hardening floor under all the new
  surfaces).

These are sequenced AFTER the live-defect + standardization waves (the breadth must not crowd the
linchpin) — the priority order is WS1→WS2→WS3 (the user's defects + directives), then WS4→WS5 (the
encapsulation + viz), then WS6 (Siri), with WS7's verification cure built FIRST (it must be born-RED
on 4.2.0) and its coverage/new-family tail built LAST.

---

## 7 — THE TOP CROSS-CUTTING RISKS

1. **The headless-green / visually-broken trap will recur unless WS7's paint-gate is built FIRST and
   blocks the tag.** This has shipped THREE consecutive times (BB green-lie, BC never-built-cure, BD
   "77 gates re-pointed + live-π doesn't block the tag"). The single highest-cost recurring failure.
   MITIGATION: `BG.W-PAINT-IS-THE-GATE` born-RED on the 4.2.0 tree is the FIRST wave; every workstream's
   convergence criterion is real-paint/behavioral, verified by a reproduction the building agent did
   not author; the close runs `--run full` siblings-and-submodule-absent with the live arm as a tag
   precondition. The convergence-loop's Stage-4 critique rubric (Correctness 30, caps at "no validating
   prototype") enforces this per-pass.

2. **WS1 (routing) is the precondition for EVERY downstream paint-verification.** While nav freezes,
   a SPA-navigated viz/preview/scroll-shrink never mounts, so WS4/WS5/WS6's gestalt cannot be judged.
   MITIGATION: sequence WS1's route-transition wave first; every other workstream's π either hard-loads
   the route (the audit's reproduction method) or DEFERS its acceptance to after WS1 lands (the
   D-scroll-topbar / D-previews dependency is explicit). The convergence loop must NOT mark WS4/WS5/WS6
   100% on a hard-load-only π if the SPA-nav path is still the real consumer.

3. **The dock (WS2) and glass (WS3) standardization are coupled at the blur seam.** The user's directive
   "the dock should have the SAME blur as buttons/cards" is a WS3 deliverable (the unified blur scale)
   that WS2 (the dock re-modularization) must CONSUME without re-forking a dock-special blur. MITIGATION:
   WS3 owns the blur register (one calm scale, dock a peer); WS2 reads it (the dock cast retire +
   legibility recal are the WS2/WS3 handoff). The cross-WS edge is recorded; the two must converge
   together (a WS2-only "less dock blur" that diverges from WS3's scale fails the standardization bar).

4. **Over-correction without a gestalt feedback loop (the recurring disease).** The gray cure
   over-shot into metallic; the dynamic-darkening cure was itself the grey origin; each fix optimized
   a mechanism number while the gestalt regressed. MITIGATION: every workstream's convergence criterion
   is the GESTALT a user reads (a fresh capture, hue-band + chroma-ceiling, not a single mechanism
   delta); the WS7 probe-vocabulary widen (hue band, upper-chroma bound, edge-cast, corner-clip) gives
   the gate the predicates to catch the over-correction class; the Stage-4 critique uses a diverse-lens
   fleet (correctness · architecture · design-fidelity · cross-engine).

5. **The dead-engine cut (WS4/WS7) must not delete a LANDED-but-not-yet-wired engine that WS2/WS6 needs.**
   `useDockFission`/`useBloomUp`/the goo are LANDED engines a future paint wave may consume (WS2
   fission-wire, WS6 Siri-island composes the fission loop shape). MITIGATION: the fold-ledger's
   per-wave parity clause distinguishes `LANDED` (keep, wire, paint) from `LANDED-dead` (decide ≥2 or
   retire) from `NEVER-BUILT` (re-home or retire); a `DECIDE` (W-JUBILANCE-DECIDE / W-DOCK-CUT) wires-or-
   retires, never a blind delete; WS6 composes the fission LOOP SHAPE (not edits the engine, box-inviolate).

6. **Safari/WebKit parity is a STANDING risk on every new surface (asked 2×, never verified).** The
   Siri waveform + island + the dynamic glass + the chart are the highest Safari risk (canvas/SVG/goo/
   backdrop-filter), and the route transition + the goo bridge must be engine-agnostic (no VT-on-Chrome /
   nothing-on-Safari fork). MITIGATION: WS7's `W-SAFARI-PARITY-GATE` enrolls every new BG surface at
   birth; the cross-engine constraints (`A-a11y-perf-crossengine.md §CONSTRAINTS`: no `backdrop-filter:url`,
   `@supports`-gated goo, explicit `oklch(L C H / 0)` stops, no inset-shadow in `light-dark()`, the
   route transition is ONE engine-agnostic CSS path) are machine-locked by `W-CONSTRAINT-MANIFEST`.

7. **The deferred-fold could compound a FOURTH time if `W-DEFERRED-LEDGER` is itself deferred.** The
   disposition machine (`proof:be-fold-ledger`) was the deferred item THREE tranches running (BE/BF/BD).
   MITIGATION: `BG.W-DEFERRED-LEDGER` is Band-0 wave-1 (built FIRST, zero-pixel, gate-self-test), so every
   later BG wave's closure is checkable against it; a phantom dest or a re-stamped `book` disposition REDs;
   the per-wave parity clause + the AX register re-stamp ride it. This synthesis (§4/§5) IS the seed table.

---

## 8 — NO-ORPHAN ATTESTATION

- **Every D1-D13 defect** maps to exactly one PRIMARY workstream (§3); D6's three-cause cross-WS arms
  are explicitly recorded.
- **Every chronic/deferred item** (P-chronic-deferred: 32 BF census + 26 AX register + 8 in-src books
  + the BD P10 tail + the Class-5 tokens) maps to a workstream with a disposition (§4); the BE/BF 69
  wave specs (P-be-bf-fold Groups A-F) are dispositioned per-wave.
- **Every historical request** (P-historical-coverage: ~70 de-duplicated, the 9 themes, the L1-L14 live
  defects) maps to a workstream (§5); the two DROPPED rows (macro-flower) are dispositioned
  (fold-as-optional-asset / formal-drop) not silently dropped.
- **Every first-principles new-capability** (P-firstprinciples-gaps F1-F7) maps to a workstream (§6).
- **Every A-* architecture wave** (dock/glass/motion/component-families/component-splits/composables/
  deadcode/demo/viz/gate/a11y) is folded into WS2-WS7 (§2 candidate-waves).

The deferred-fold ledger (§4) + the historical-coverage close (§5) are the binding seed for
`BG.W-DEFERRED-LEDGER` (WS7) — the no-silent-drop machine, built FIRST this time.
