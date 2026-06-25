# BD viz · the DOCK-as-ONE-organism SEQUENCE hallmark — W-DOCK-SEQUENCE + W-DOCK-ALBUM-STAGE + W-DOCK-SEARCH-FIELD

**Lane** BD viz-research / fleet2 · **Status** PLANNING/RESEARCH 2026-06-22 · **Branch** `prototype/liquid-dock` · **Scope** SYNTHESIS ONLY — zero `src/` edits. This doc specs the three PROTAGONIST gaps the dock-hallmark audit ranked #1-#3 (`audit/dock-hallmark-gap.md` GAP 1/2/3): the connective tissue that makes the dock read as ONE living organism flowing between contexts — the SEQUENCE, the live album-art protagonist field, and the search-terminus bloom. The dock IS the hallmark; these are the waves that prove it AS ONE read, not N independently-correct facilities.

> **The thesis (one line).** The seven shipped dock facilities (constellation · sub-dock · silhouette · fission · scroll-minimize · link-API · now-playing pill) each prove their OWN steady state. The videos read as ONE glass mass that RE-FLOWS between contexts over a LIVE album field, and TERMINATES in a blooming search. These three waves own the connective reads — they compose the spine's shipped verbs (`useDockLink`/`useDockContextSilhouette`/`useDockFission`/`useGlassBackdropLuminance`), add ZERO new engine, and close on the binding nav→media→split→subdock→minimize→search frame-series.

**Source-of-truth read for the executable detail:** `dock/spec-consolidate.md` (the per-component anatomy + the 5 morph scalars) · `dock/hallmark-northstar.md` (the flagship-vs-merely-correct bar) · `audit/dock-hallmark-gap.md` (the 7 gaps, 3 protagonist) · the shipped engines `src/components/custom/dock/composables/{useDockSearch,useDockState}.ts` + the BD waves `BF.W-SILHOUETTE-REALIZE` · `BD.W-DOCK-{CONSTELLATION,SUBDOCK,LINK-API,SCROLL-MINIMIZE,NOWPLAYING-PILL}` · `BD.W-AUR-ALBUM` · `BD.W-AMBIENT-TINT`.

---

## 0 · The reference read (the ground truth these three waves close against)

From `vid-dock` (Apple Music iOS-27, 38s, frame-by-frame `/tmp/vid-frames/{dockcrop,tabstrip,tabs,aurora}`) the SEQUENCE the dock performs as ONE continuous organism over the live album feed:

1. **`nav`** — a clean tab/nav bar at the bottom (Home·New·Radio·Library·Search), the resting `bar` silhouette.
2. **`media`** — the now-playing accessory DOCKS above the bar as the stadium pill (the `bar+pill` fuse-meld); the pill drinks the playing album's hue.
3. **`split`** — the media body CARVES transport off the core (the `media`=lateral fission peel), the goo neck spans then snaps.
4. **`subdock`** — the carved media re-seats as a STANDING bottom accessory beside the now-MINIMIZED core (the iOS-26 `.tabViewBottomAccessory` re-configuration; persistent, not transient).
5. **`minimize`** — as the album feed scrolls DOWN the whole constellation condenses to the perfect circle (directional `.onScrollDown`); scroll-UP restores it.
6. **`search`** — tapping the search satellite BLOOMS the circle into a full-width search field/sheet that takes the dock width (the `search` silhouette terminus).

Throughout: the dock floats over a VIVID full-bleed album-art card whose color saturates the region; **the dock's backdrop CHANGES as different album cards scroll under it** (`tabstrip/s048` — the dock drinks whatever album is behind it RIGHT NOW via `useGlassBackdropLuminance` LIVE-tracking). The whole thing is dark-mode, translucent, the album bleeding through.

**The gestalt the frames read as:** ONE glass mass that re-flows shape, drinks the live content's color, and never re-mounts — a living organism, never a switch-statement of N states. The three waves below are the three reads the shipped facilities do NOT yet PROVE as a continuous truth.

---

## W-DOCK-SEQUENCE (GAP 1, PROTAGONIST) — the dock-as-ONE-organism transition sequence

### Why this wave exists

The spec has a wave for each NODE — `W-SILHOUETTE-REALIZE` (the descriptor FLIP + `setSilhouette`), `W-DOCK-CONSTELLATION` (the resting `bar+pill` paint), `W-DOCK-SUBDOCK` (the `split`→persistent terminus), `W-SCROLL-MINIMIZE` (the collapse), `W-DOCK-SEARCH-FIELD` (below, the search terminus) — but **NO wave owns the SEQUENCE as a single binding read**. Each π captures its own state-PAIR; none captures `nav → media → split → subdock → minimize → search` as one continuous organism the user watches. The "ONE living organism on ONE orchestrator" charter (SEED §2/§12) is asserted as a FENCE in every wave, never as a captured TRUTH. This is the single most-important hallmark gap.

### The mechanism — a HERO COMPOSITION, ZERO new src

W-DOCK-SEQUENCE is a **driver + capture wave, not a new engine**. It is thin by construction (the no-second-engine fence): it composes the shipped verbs on a single live `<DockNowPlaying>` surface and drives the full context cycle, asserting the glass mass is CONTINUOUS across every transition.

- **The orchestrator is `useDockLink`** (`BD.W-DOCK-LINK-API`, shipped) — the ONE verb facade. The sequence is a SCRIPTED play through its verbs: `silhouette('bar')` → `silhouette('bar+pill')` → `split('media')` (the persistent terminus fires `onPersist` → the sub-dock re-seats) → `collapse()` (the scroll-minimize verb, or the directional scroll feed) → `silhouette('search')` (the bloom terminus, `W-DOCK-SEARCH-FIELD`). NO new verb is minted; the sequence is a COMPOSITION of the four shipped verbs (`toSurface`/`receive`/`split`/`silhouette`) + the shipped `collapse()`/`expand()` on `useDockState`.
- **ONE descriptor machine, ONE FLIP runner.** Every transition rides `useDockContextSilhouette` (the SOLE `setSilhouette` writer) → the ONE `useElementBloom` FLIP spine → `DOCK_SPRING`. The five disjoint compositor scalars (`--dock-morph-t` · `--dock-split-t` · `--dock-silhouette-fuse-t` · `--dock-grow` · `--neck-t`) COMPOSE without fighting — each is the authority of exactly ONE engine, none animated as a layout property (the `spec-consolidate.md §2` morph cohort). The sequence wave is the FIRST place all five are driven in one continuous read; its binding job is to prove they don't collide.
- **The CONTINUITY contract (the load-bearing assert).** The SAME glass mass re-flows — no flash, no re-mount, no `v-if` pane swap. Between every adjacent state the surviving islands (home·pill·search) FLIP to new slots (survivors morph), from-only controls DETACH (`useDockFission.registerPiece`), to-only controls BLOOM (the inverse FLIP). The fuse-meld (`--dock-silhouette-fuse-t`) and the goo bridge (`--dock-goo-spacing`) are the SAME liquid vocabulary across split AND meld. A `transition: all`/a CSS-class toggle per state is the disease (the SEED §2 N-feature-flag anti-pattern) — structurally barred because there is only ONE descriptor machine.

### The drive surface — `demo/stories/dock/dock-sequence-hero.vue` (demo-private, NO new src component)

A single `<DockNowPlaying>` over the live album-art stage (`W-DOCK-ALBUM-STAGE`, below) with a SCRIPTED orchestrator that walks the cycle on a timer (auto-play, the showcase loop) AND on explicit user verbs (the interactive proof). The story is the CAPTURE surface — it composes the shipped leaf, ZERO demo-local re-fork (the `proof:demo-design` D4 anti-fork bite). The auto-play loop is PRM-gated (under reduce it seats each state synchronously, no motion — the cycle still READS as a state walk, the chrome still gives content room).

### The fences (what this wave must NOT become)

- **NOT a new orchestrator.** It drives `useDockLink`'s shipped verbs; a NEW `useDockSequence` engine that re-forks the FLIP or the spring is FORBIDDEN (the no-second-engine bite — C1). The sequence is a SCRIPT, not a state machine.
- **NOT a re-call of `setSilhouette` outside the SOLE writer.** The sequence calls `link.silhouette(id)` which delegates to `useDockContextSilhouette` (the single-writer fence, `W-DOCK-CONSTELLATION` C4 — binding). It MUST NOT reach `setSilhouette` directly.
- **NOT a re-mount per state.** The CONTINUITY assert (the per-frame glass-mass identity) is the heart — a `<component :is>` swap or a `v-if` ladder per silhouette is the re-mount disease the wave exists to bar.
- **ZERO new scalar.** The sequence reads the five shipped `--dock-*` scalars; a sixth minted scalar REDs `proof:dock-link` C5 (the living census). The sequence is a COMPOSITION of the shipped five.

### Machine-lock — `proof:dock-sequence`

- **C1** — the sequence-hero composes `useDockLink`'s shipped verbs ONLY (no `useDockSequence` engine, no inline `runBloom`/`ElementMorph`/`SpringProgress` re-fork; reads the four facade verbs + `collapse`/`expand`) + the self-test bite (a planted inline FLIP runner REDs).
- **C2** — the CONTINUITY assert: across every adjacent state-pair the dock root is the SAME DOM node (no re-mount — a stable `data-dock-instance` key survives the whole cycle; a `v-if`/`:is` swap REDs) + no state binds a layout `transition`/`<Transition>` off the named allowlist (`proof:no-layout-animation` follows into the sequence recipe).
- **C3** — the five-scalar non-collision: each of `--dock-morph-t`/`--dock-split-t`/`--dock-silhouette-fuse-t`/`--dock-grow`/`--neck-t` is driven by its ONE authority during the cycle (the census table read off disk — a scalar written by two engines REDs).
- **C4** — the script-not-machine bite: the sequence is a recorded ordered verb list (`docs/tranches/BD/audit/W-DOCK-SEQUENCE-script.md`), not a per-state boolean enum on the SFC.
- **C5** — PRM-seats: under reduce every state seats synchronously (the silhouette FLIPs snap, the split re-seats in one frame, the minimize collapses instantly, the search blooms to settled) — the gesture confirms, the motion off.

**The binding π** — `tests-visual/dock-sequence.spec.ts` (LOCAL-only, real-GPU, rides W-REFLECT's dock close): a FRESH `:5199` capture of the full `nav→media→split→subdock→minimize→search` cycle as ONE continuous frame-series in BOTH modes ({light,dark}×{desktop,mobile}), LIVE MOTION (NEVER reduced), on the webkit AND chromium Playwright projects. The verdict is the **side-by-side overlay against the reference cycle** (`dockcrop/d001→d018→d036→d054` + the V1 split band + `tabs/f060`): a viewer reads it as ONE glass mass FLOWING between contexts, no flash, no re-mount, every transition the SAME spring family. The `proof:ba-gestalt` dock-hallmark verdict (`W-GESTALT-WIRE` roster, the `dock-sequence` row) is the close oracle — `complete` IFF the sequence reads as ONE living organism, `complete_with_misses` if any transition flashes/re-mounts/desyncs.

### The DAG position

W-DOCK-SEQUENCE is **terminal among the dock-build waves** — it COMPOSES every dock facility, so it sequences AFTER the integrated engines land: `W-SILHOUETTE-REALIZE`(T2) · `W-DOCK-CONSTELLATION`(T2) · `W-DOCK-SUBDOCK`(T2) · `W-DOCK-LINK-API`(T2) · `W-SCROLL-MINIMIZE`(T3) · `W-DOCK-SEARCH-FIELD`(T3, below) · `W-DOCK-ALBUM-STAGE`(T3, below) · `W-FISSION-FILAMENT`(T4) all upstream. It lands **T9 (the demo-breadth / hero-capture tier)** as a thin composition wave (or a hero arm folded into `W-DEMO-BREADTH`), NOT a build wave — it ships zero new src, only the demo-private hero story + the gate + the π. It does NOT block any build wave; it is the union confirmation that the spine composes. No back-edge: every wave it reads is upstream.

---

## W-DOCK-ALBUM-STAGE (GAP 2, PROTAGONIST) — the dock floats ON the live album-art field

### Why this wave exists

In every reference frame the dock floats over a VIVID full-bleed album-art card whose color saturates the whole region. The spec ships every PRIMITIVE — `surface="clear"` (the album bleeds through), `--glass-fill-tint` off `--glass-ambient-hue` (the pill drinks the hue, `W-DOCK-NOWPLAYING-PILL`), `deriveAuroraPalette` (the album-protagonist aurora, `W-AUR-ALBUM`), `useGlassBackdropLuminance` (the dynamic backdrop sampler, dock-default-on) — but **no wave COMPOSES them into the live album-tracking flagship surface**. Two seams are under-built:

- **(a)** The CONSTELLATION/SUBDOCK/SCROLL-MINIMIZE π surfaces capture over `<DockStage>` — ONE shared GENERIC warm aurora behind a COLUMN of dock demos (per CLAUDE.md), NOT the album-art-protagonist field per-dock. The album-reactive aurora is wired ONLY on `dock-nowplaying.vue`'s pill, so the constellation/sub-dock gestalt rows capture over a generic aurora, not the album protagonist field the videos show.
- **(b)** No wave wires the now-playing dock to RE-DERIVE its tint as the album-art GRID scrolls beneath it — the "dock drinks whatever album is behind it RIGHT NOW" live read (`tabstrip/s048`). The `useGlassBackdropLuminance` dynamic sampler EXISTS and is dock-default-on, but nothing wires it to a SCROLLING album grid so the pill + aurora tint LIVE-track the dominant card behind the dock.

### The mechanism — a COMPOSITION wave, presets-in-consumers

W-DOCK-ALBUM-STAGE builds the flagship demo surface — the reference itself — by COMPOSING the shipped primitives. The library mints ZERO new aurora/shader/sampler (the GL-shader fence holds; the dock is the only binary consumer of the live sampler at HEAD per `use-glass-backdrop-luminance.md`).

- **The flagship surface (`demo/stories/dock/dock-album-stage.vue`, demo-private).** A vertically-SCROLLING grid of full-bleed album-art cards (the New Music warm-orange · Get Up! red · Chill teal · Your Essentials violet · Daphnis/Ravel purple set — presets-in-consumers, the demo owns the album images). The now-playing constellation (`<DockNowPlaying>`) is PINNED over the grid in the `.glass-dock-frame` escape (box-INVIOLATE — the dock feeds no size into the scroller).
- **The live backdrop re-derive (the (b) wire).** The pinned dock's `useGlassBackdropLuminance(targetEl)` (shipped, dock-default-on) samples the painted album card BEHIND the dock as the grid scrolls — the `elementsFromPoint` stack-walk OR the downsampled `drawImage`+`getImageData` over the known album `<canvas>`/`<img>` (the legitimate proxy, no API reads behind a `backdrop-filter`). It writes `--glass-backdrop-luma` + the `--glass-backdrop` bucket AND (the NET wire) the 12-bucket OKLCh `--glass-ambient-hue` off the HOISTED `hueHistogram.ts` leaf (`W-HUE-HISTOGRAM-HOIST`) so the pill's `--glass-fill-tint` re-derives LIVE. As card N scrolls under, the pill plate hue tracks card N's dominant hue (Ravel-purple under → purple-cast plate). rAF-throttled ≤4Hz + IntersectionObserver-gated + `document.hidden`-parked + PRM-collapses-to-one-sample (the shipped sampler discipline — no overfitting).
- **The protagonist aurora (the (a) wire).** The stage's ambient aurora reads the SAME `--glass-ambient-hue`/`hueHistogram.ts` source the pill reads (`W-AUR-ALBUM` `deriveAuroraPalette` single-hue lightness-walk), so the FIELD is the album AND the PLATE is the album — ONE source, the field re-derives + cross-fades on protagonist change (`W-AUR-ALBUM` owns the cross-fade). The CONSTELLATION/SUBDOCK/SCROLL-MINIMIZE/SEQUENCE gestalt captures MOVE onto THIS stage (not the generic `<DockStage>`), so the dock is captured over the actual album protagonist field — the V1/V2 read.

### The fences

- **ZERO library aurora/shader/sampler edit.** The album images, the album grid, the per-album palette are presets-in-consumers (the demo owns them); the library ships the sampler + the histogram leaf + the `deriveAuroraPalette` extractor, all shipped. A new library aurora register or a hardcoded album palette REDs (the presets-in-consumers fence + the GL-shader fence).
- **The dock is box-INVIOLATE.** Pinned in the `.glass-dock-frame` escape, the dock feeds NO size into the album scroller (`deltaW=deltaH=0`); the album grid scrolls UNDER it. A dock that re-layouts the scroller REDs.
- **The live re-derive is the SHIPPED sampler, throttled + gated.** No new rAF, no second observer — `useGlassBackdropLuminance` (dock-default-on) is the ONE sampler. A second backdrop reader REDs `proof:adaptive-observer`'s single-observer arm.
- **Cross-origin guard.** An album image that taints the canvas throws on `getImageData` → null hue → the warm-cream default (the tainted-canvas fall, shipped in the pill). The stage demo uses same-origin album assets.

### Machine-lock — `proof:dock-album-stage`

- **A1** — the album-stage surface PINS `<DockNowPlaying>` in the `.glass-dock-frame` escape over a scrolling album grid (box-INVIOLATE: the dock's intrinsic box reads `deltaW=deltaH=0` across a grid scroll) + the self-test bite (a dock that grows the scroller REDs).
- **A2** — the live re-derive wire: the pinned dock's `useGlassBackdropLuminance` is wired to the album grid, writing `--glass-ambient-hue` off the HOISTED `hueHistogram.ts` (ONE leaf, no second binning copy) — the pill `--glass-fill-tint` re-resolves as a card scrolls under.
- **A3** — the ONE-source assert: the stage aurora AND the pill plate read the SAME `--glass-ambient-hue`/`hueHistogram.ts` source (the field IS the album, the plate IS the album); a parallel album-hue extractor REDs.
- **A4** — the throttle/gate/PRM discipline preserved (≤4Hz rAF · IO-gated · `document.hidden`-parked · PRM one-sample) — the shipped sampler is not re-forked; presets-in-consumers (the album images/palette live in the demo, not a library token).
- **A5** — the capture-surface migration: the CONSTELLATION/SUBDOCK/SCROLL-MINIMIZE/SEQUENCE gestalt rows capture over THIS stage, not the generic `<DockStage>` aurora.

**The binding π** — `tests-visual/dock-album-stage.spec.ts` (LOCAL-only, real-GPU, rides W-REFLECT): a FRESH `:5199` capture of the dock pinned over the scrolling album grid, the album card BEHIND the dock CHANGING across a scroll (frame N over the red card → frame N+k over the purple card), the pill plate hue + the ambient aurora VISIBLY tracking the dominant card behind RIGHT NOW (an oklab `getComputedStyle` readback on the pill plate hue, matched to the card's dominant hue within the bounded whisper), BOTH modes. The `proof:ba-gestalt` dock-album verdict (`W-GESTALT-WIRE` roster, the `dock-album` row): `complete` IFF the dock reads as FLOATING ON the live album field, drinking whatever album is behind it.

### The DAG position

W-DOCK-ALBUM-STAGE reads the integrated engines + the album-reactive seams: `W-HUE-HISTOGRAM-HOIST`(T1) · `W-AMBIENT-TINT`(T6) · `W-AUR-ALBUM`(T6) · `W-DOCK-NOWPLAYING-PILL`(T7) · `W-DOCK-CONSTELLATION`(T2) all upstream. It lands **T9 (demo-breadth / hero-capture)** as the flagship CAPTURE surface (or a hero arm on `W-DEMO-BREADTH`), and it is the capture surface W-DOCK-SEQUENCE drives on — so W-DOCK-SEQUENCE sequences AFTER it within T9. No new src, no build dep blocked. (The forward-data-dep on `W-AUR-ALBUM`/`W-AMBIENT-TINT`(T6) is satisfied by sequencing those producers first — they land T6, this lands T9.)

---

## W-DOCK-SEARCH-FIELD (GAP 3, PROTAGONIST) — the search satellite blooms into a field

### Why this wave exists

The silhouette state machine speaks `bar | bar+pill | split | search` (`BF.W-SILHOUETTE-REALIZE`), and CONSTELLATION's fence mentions "a transition to `search` re-flows the SAME three islands." But the `search` silhouette — the search satellite blooming into a full search field/sheet (the iOS-27 move: tap the search circle, it expands into a search bar taking the dock width) — has **no dedicated BUILD wave**. `W-SILHOUETTE-REALIZE`'s mechanism wires `nav`/`media`/`split` explicitly; `search` appears in the union type but its descriptor + the bloom-to-field paint is never built. The search island is one of the THREE the videos show as LIVE (`dockcrop/d001` — a full live affordance, distinct from the recessed home). A flagship dock's search circle must DO something — bloom into a field. **Without this wave the search island is a dead circle.**

### The mechanism — wire the `search` descriptor, COMPOSE `useDockSearch` + `useDockLink.toSurface`

The FILTER half is ALREADY shipped: `useDockSearch` (`BC.W-DOCK-SEARCH`) composes the `/search` VSCode fuzzy scorer + `useDockState` + the virtual window + the ToC scroll-to — it owns the query/results/keyboard-nav/result-select. **What is missing is the SILHOUETTE TERMINUS** — the search satellite circle morphing INTO the search field as the `search` silhouette descriptor. W-DOCK-SEARCH-FIELD wires it, adding ZERO new search engine.

- **The `search` descriptor (the SILHOUETTE-REALIZE completion).** `useDockContextSilhouette`'s `search` descriptor re-flows the three islands: the search satellite GROWS into a full-width search-field island (the pill SHRINKS/melds aside, the home satellite tucks). The bloom rides the ONE `useElementBloom` FLIP spine + `DOCK_SPRING` — the search circle's rect is the bloom SOURCE, the settled field rect is the target (a source-rect bloom 0→1, the `useDockLink.toSurface` verb shape: bloom a surface FROM a control's rect). NO new scalar — the search field island is a FLIP slot in the descriptor like every other island.
- **The bloom IS `useDockLink.toSurface` from the search satellite rect.** The verb `toSurface(searchControlRef, searchFieldRef)` (`BD.W-DOCK-LINK-API`, shipped) blooms the search field FROM the satellite's rect (small-at-circle → settled field), composing `useLiquidReveal` (the source-rect bloom). The search field then HOSTS the shipped `useDockSearch` surface (the fuzzy dropdown + keyboard-nav + result-select) — the FILTER plugs into the BLOOMED field. The CSS floor is `.glass-reveal` (the Safari-safe default); the JS source-rect bloom is the refinement.
- **The terminus re-flows the constellation.** Tapping search → `link.silhouette('search')` → the descriptor machine FLIPs the satellite to the field slot + tucks the pill/home; tapping away → `link.silhouette('bar+pill')` → the field melds back to the satellite circle, the constellation re-flows. ONE descriptor machine, the SAME FLIP — the search bloom is the SAME liquid vocabulary as the meld/split.

### Two build choices (the wave-spec author picks, recorded)

The audit names two equivalent realizations — pick (a) for cohesion, (b) for thinness:

- **(a) FOLD into `W-SILHOUETTE-REALIZE`'s wiring** — build the `search` descriptor explicitly alongside `nav`/`media`/`split` (the search satellite → search-field bloom via `toSurface`, the field re-flowing the constellation). This keeps all four silhouettes in ONE wave (the descriptor-machine home). **Preferred** — the `search` descriptor is genuinely part of the silhouette state-machine W-SILHOUETTE-REALIZE owns; building three of four and deferring one is the half-build the audit flags.
- **(b) a thin standalone `W-DOCK-SEARCH-FIELD`** composing `useDockLink.toSurface` from the search satellite, consuming the wired `search` descriptor. Cleaner separation but risks the `search` descriptor un-built in SILHOUETTE-REALIZE (the gap re-opens).

**Recommendation: (a)** — extend `W-SILHOUETTE-REALIZE` to wire ALL FOUR descriptors (the single-writer fence stays — it is the SOLE `setSilhouette` caller), and record the search-field BLOOM (the `toSurface` compose + the `useDockSearch` host) as the `search` terminus arm. If the wave-spec author prefers thin waves, (b) is the fallback with an explicit `W-SILHOUETTE-REALIZE` clause that the `search` descriptor MUST be built (not just typed).

### The fences

- **NO second search engine.** The filter is the shipped `useDockSearch` (the `/search` VSCode scorer, never re-forked); the bloom is the shipped `useDockLink.toSurface`/`useLiquidReveal`. A new fuzzy matcher or a new bloom rAF REDs (the one-of-each + the no-second-engine bite).
- **The bloom is a FLIP slot, not a new scalar.** The search field is an island in the `search` descriptor — it FLIPs via the ONE `useElementBloom` spine. A `--dock-search-bloom-t` sixth scalar REDs `proof:dock-link` C5.
- **Source-rect bloom, NEVER a center zoom.** The field blooms FROM the search satellite's rect (`transform-origin` at the satellite), not the generic anchor/center zoom (the `useLiquidReveal`/`toSurface` contract).
- **The CSS `.glass-reveal` floor.** Off-Chromium / no-JS, the field paints the Safari-safe `.glass-reveal` data-state recipe; the source-rect JS bloom is the refinement (the dual-path single-paint, the W55/lensing precedent).
- **Single-writer.** `link.silhouette('search')` delegates to the SOLE `setSilhouette` writer — the search bloom MUST NOT re-call `setSilhouette` (the `W-DOCK-CONSTELLATION` C4 fence).

### Machine-lock — `proof:dock-search-field` (or the `W-SILHOUETTE-REALIZE` `search`-arm clause)

- **S1** — the `search` descriptor is BUILT (not just typed): `useDockContextSilhouette` wires the `search` silhouette re-flowing the three islands (the satellite → field slot, the pill/home tuck) — a typed-but-unwired `search` member REDs the self-test.
- **S2** — the field blooms FROM the satellite rect: the bloom composes `useDockLink.toSurface`/`useLiquidReveal` with `transform-origin` at the search satellite (a center/anchor zoom REDs) + the `.glass-reveal` CSS floor present.
- **S3** — the filter is the shipped `useDockSearch` plugged into the bloomed field (NO second fuzzy matcher, NO second bloom rAF) + the self-test bite (a planted second matcher REDs).
- **S4** — the terminus re-flows: `silhouette('search')` → field, `silhouette('bar+pill')` → satellite circle, ONE descriptor machine (no `v-if` field swap; the field is a FLIP slot).
- **S5** — PRM-seats: under reduce the field appears at its settled rect in one frame (the search is armed, the bloom off) — the gesture confirms.

**The binding π** — `tests-visual/dock-search-field.spec.ts` (LOCAL-only, real-GPU, rides W-REFLECT): a FRESH `:5199` capture of the search satellite BLOOMING into the field (the frame-series: circle → growing-from-circle → settled field, `transform-origin` at the satellite), the field hosting the live fuzzy dropdown, the meld-BACK to the satellite on dismiss, BOTH modes, webkit + chromium. The `proof:ba-gestalt` navigation/dock verdict (the `dock-search` row): `complete` IFF the third island ACTS — the search circle blooms into a working field, re-flows the constellation, melds back.

### The DAG position

W-DOCK-SEARCH-FIELD reads `W-SILHOUETTE-REALIZE`(T2, the descriptor machine — choice (a) IS this wave) · `W-DOCK-LINK-API`(T2, `toSurface`) · the shipped `useDockSearch`(HEAD) · `W-DOCK-CONSTELLATION`(T2, the resting satellites it re-flows). Under choice (a) it is FOLDED into `W-SILHOUETTE-REALIZE`(T2) — the `search` arm of the descriptor wiring, born-RED-until-the-bloom-lands (the `W-DOCK-LINK-API` `toSurface` it composes is also T2, sequenced first within the tier). Under choice (b) it is a thin **T3** wave after SILHOUETTE-REALIZE + LINK-API land. Either way it is upstream of W-DOCK-SEQUENCE (the sequence drives the `search` terminus) — SEQUENCE(T9) reads it. No back-edge.

---

## The three waves as ONE close (the hallmark confirmation)

These three close the dock-as-hallmark connective tissue:

| Wave | Gap | Owns | Ships | Composes (no new engine) |
|---|---|---|---|---|
| **W-DOCK-SEQUENCE** | GAP 1 | the nav→media→split→subdock→minimize→search continuous read | demo hero story + `proof:dock-sequence` + π | `useDockLink` verbs · the 5 shipped scalars · the ONE FLIP spine |
| **W-DOCK-ALBUM-STAGE** | GAP 2 | the dock floats ON the live album field, live-tracking | demo album-grid stage + `proof:dock-album-stage` + π | `useGlassBackdropLuminance` · `hueHistogram.ts` · `W-AUR-ALBUM` · the pill `--glass-fill-tint` |
| **W-DOCK-SEARCH-FIELD** | GAP 3 | the search satellite → search-field bloom (the `search` terminus) | the `search` descriptor wire (fold into SILHOUETTE-REALIZE) + `proof:dock-search-field` + π | `useDockSearch` · `useDockLink.toSurface` · `useLiquidReveal` · the descriptor machine |

**Sequencing:** ALBUM-STAGE + SEARCH-FIELD build the surface + the terminus; SEQUENCE drives them as ONE read. All three are LATE-tier (T3 for SEARCH-FIELD if standalone, T9 for ALBUM-STAGE + SEQUENCE) — they COMPOSE the spine, add ZERO new engine, and are the union CONFIRMATION that the dock reads as ONE living organism. Each closes against its OWN fresh both-mode `:5199` pixels + webkit-π + the `proof:ba-gestalt` per-wave verdict (the anti-disease close-invariant — no deferral to W-REFLECT). The binding hallmark test stays the side-by-side overlay against the reference frames: **a viewer cannot tell which is iOS-27 and which is glass-ui — and where they differ, glass-ui is RICHER** (the album-hue plate-tint, the deep-glass protagonist pill, the persistent re-seat, the 5-beat tab overshoot are the betters the reference does not carry).

**The cross-cutting hallmark bar (binds all three, `hallmark-northstar.md §8):** liquid CONTINUITY (one mass re-flows) · MATERIAL HIERARCHY (deep pill / floating satellites / recessed-home depth) · ALBUM REACTIVITY (the glass drinks the content's color) · ONE ORGANISM ONE ORCHESTRATOR (one descriptor machine, one FLIP, one spring) · SAFARI-FIRST ABSOLUTE (goo = `filter: url()` sRGB; morphs = compositor `transform`/`opacity`/`filter`/`clip-path`, never `backdrop-filter: url()`) · COMPOSITOR-ONLY on a RESERVED footprint (CLS=0) · PRM-SAFE by construction · the PAINT is the truth, frame-matched.
