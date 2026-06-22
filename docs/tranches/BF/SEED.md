# BF — the liquid-glass CONVERGENCE tranche

**Provenance.** BE (5 workflows, 8 commits on `prototype/liquid-dock`) built the iOS-27 dock-hallmark mechanics as real, idiomatic, compositor-only ENGINES. A 21-lens read-only deep audit (`docs/tranches/BF/audit/` digest) found those engines genuine but shipped as a **demo-private, unwired, unpainted, re-forked, undeleted-spike vertical slice** — with the user's explicit feel-asks, the Safari validation, the layering-in-liquid, the de-shadcn, and the whole breadth left unaddressed or regressed.

BF is the convergence: it does NOT mint a second mechanism. It **consolidates** (fold the re-forks onto the library's own liquid spine, delete the spike), **integrates** (wire the engines into shipped SFCs, ship the goo), **paints** (author the absent binding π, flip the gestalt roster on fresh pixels), **builds the user's explicit asks** (scroll/touch grow-shrink, scroll fluidity, icons, layering-in-liquid, MANY examples), **raises the iOS-27 fidelity** (the spanning-filament neck, the live contextual silhouette), **validates on Safari**, and **finishes the breadth** (de-shadcn, the consumer band, aurora/tabs/controls) — each wave born-RED→GREEN with a CAPTURED paint delta + a gestalt verdict, no source-green close.

This is a TRANCHE-DEVELOPMENT artifact. No implementation here — the wave specs (`waves/*.md`) + the DAG (`EXECUTION-DAG.md`) are the plan; execution awaits greenlight.

---

## §1 — The prompt recap (ALL requests, addressed-vs-not)

Every request the user has made across the whole engagement, with its honest status against the BE work + the orchestrator's live spot-check. This is the binding accountability table — every NOT/PARTIAL/REGRESSED row is owned by a named BF wave (§4).

| # | Request (user's words / intent) | Status at BE close | Evidence | Owned by |
|---|---|---|---|---|
| R1 | Core dock MORPHS (pill blooms into a sheet) | ENGINE LANDED · not integrated · unpainted | `useBloomUp` real but demo-only, re-forks `useLiquidReveal`, no binding π | W-FLIP-SPINE · W-DOCK-INTEGRATE · W-PI-AUTHOR |
| R2 | Expand animates IN the dock, NOT fly-in from the left | ADDRESSED (mechanism) | transform-matrix FLIP from the pill rect, drift=0, live-verified | (closed; π locks it: W-PI-AUTHOR) |
| R3 | Goo SPLIT into 2-3 free-floating glass pieces w/ metaball bridge (Apple Music / Dynamic Island) | ENGINE LANDED · FIDELITY GAP · demo-private | neck is a same-size capsule inset ON the piece, does NOT span the gap; only 1 example; `url(#goo)` only in demo CSS | W-FISSION-FILAMENT · W-DOCK-INTEGRATE · W-DEMO-BREADTH |
| R4 | Rail sits WITHIN a dock as a HAIRLINE (not a vertical dock/capsule) | ADDRESSED (structure) · fidelity gap | `DockStack mode=facets` box-inviolate, fork deleted; but reads collapsed-only, φ-tier math DEAD, accent-only delta | W-RAIL-FIDELITY |
| R5 | Vertical AND horizontal docks | PARTIAL | vertical reflows in the lab; V↔H is a crossfade FACSIMILE, not the shipped `useDockOrientationMorph`; layering absent | W-VH-COMPOSE · W-LAYER-IN-LIQUID |
| R6 | "Not fully joined" (the island waist) | ADDRESSED | merged rest = one seamless pill, live-verified | (closed) |
| R7 | "vertical dock is not styled" | ADDRESSED | column reflow, no `display:none` amputation | (closed) |
| R8 | Aliasing around the corners | NOT ADDRESSED / unverified | the `clip-path:inset(0 round)` halo-clip fix does NOT survive HEAD; no AA π | W-CORNER-AA |
| R9 | "union and split demos are useless and don't work" | PARTIAL | split renders the goo neck (live-verified); union finicky; click-trigger unreliable; fidelity gap | W-FISSION-FILAMENT · W-DOCK-INTEGRATE |
| R10 | MANY more examples (said 3×) | PARTIAL | 7 gallery tiles, only 1 exercises fission; NO rail/layer/grow/contextual example | W-DEMO-BREADTH |
| R11 | Scrolling not fluid / not slow enough | REGRESSED | the `useLiquidRail` continuous-position slow-glide scroll (`SCROLL_PX_PER_SLOT`) was DELETED in WF-3, delegated to native `FadingScroll` | W-SCROLL-FLUIDITY |
| R12 | Icons not visible enough | PARTIAL / REGRESSED | `DockStack` glyphs bare `size-4` (16px); facets-mode recession fades to 0 opacity (no legibility floor) | W-ICON-PRESENCE |
| R13 | Contextual switching (silhouette reconfigures per context) | ENGINE DEAD | `useDockContextSilhouette` (551L, the headline LAYER+fusion engine) has ZERO real consumers | W-SILHOUETTE-REALIZE · W-LAYER-IN-LIQUID |
| R14 | Growing/shrinking on events (scroll, touch) | NOT BUILT | dock is event-inert; no scroll-condense, no touch-drag-to-grow; lib's scroll/press primitives unused | W-LIQUID-GROW-ON-EVENT |
| R15 | Dock LAYERING | NOT IN LIQUID | only the disconnected pre-BE `layers.vue`; two unreconciled contextual models | W-LAYER-IN-LIQUID |
| R16 | NO legacy / idiomatic / gestalt / architectural transpositions | VIOLATED | 5-way rAF re-fork of `useLiquidReveal`; spike (`useLiquidMorph.ts`) NOT deleted; demo CSS in `src/styles/` | W-FLIP-SPINE · W-SPIKE-DELETE |
| R17 | Validate that all morphing works on Safari (asked 2×) | NOT DONE | only swiftshader-Chromium headless; webkit `testMatch` still the BC set; `proof:safari-liquid` absent | W-SAFARI-CAPTURE · W-GOO-SPLIT-PERF |
| R18 | Jubilance (ripple, splash, recoil, haptics, breathing) | ENGINES DEAD | `useHaptic` + `useCelebrationBurst` ZERO call sites; consumer-evidence is phantom | W-JUBILANCE-WIRE |
| R19 | De-shadcn FORM (every reka/shadcn default abrogated) | NOT BUILT | Band 9 (CRITICAL in the SEED), absent; no `proof:de-shadcn` | W-DESHADCN-SWEEP · W-DESHADCN-GATE |
| R20 | Bloom-to-fullscreen card | PARTIAL | bloom yes; the fullscreen-card register composes the shipped `ExpandableContainer`? — decide | W-DOCK-INTEGRATE |
| R21 | Performance above all (elegance, simplicity) | PARTIAL | compositor-only held in `src/styles` (gate GREEN) but does NOT scan `demo/`; goo perf un-measured on WebKit | W-PI-AUTHOR (gate widen) · W-GOO-SPLIT-PERF |
| R22 | The demo working (splitting, railing, vertical AND horizontal) | PARTIAL | split + rail + vertical render; but engines demo-private, layering absent, examples thin | the whole Band-2/3 set |

**The pattern.** BE addressed the dock-morph hallmark *mechanism* (R2/R6/R7 closed; R3/R4/R5 structurally present). It left the *integration* (R1/R3 demo-private), the *paint* (no π), the user's *feel*-asks (R8/R11/R12/R14 not-built/regressed), the *layering+contextual* (R13/R15 dead), *Safari* (R17, asked twice), *no-legacy* (R16 violated), *jubilance wiring* (R18 dead), and the *breadth* (R19) all open. BF closes every row.

---

## §2 — The thesis

**The dock is ONE living iOS-27 organism, shipped in the library, painted-true, and reactive to the user's hand.** Three reframes the audit forces:

1. **Consolidation over accretion.** The library already ships the liquid spine — `useLiquidReveal` (bloom FLIP), `useSpecularPointer`/`createSpecularWriter` (lensing), `--glass-depth`/`.glass-deep` (deep glass), `useSpringPress`/`useLiquidPress` (press), `useDragMorph` (grab-pull), `useDockOrientationMorph`/`dockMorphContext` (V↔H morph), `useLiquidFlex` (squish), `SpringProgress`/`DOCK_SPRING` (the clock). Every BE engine that re-forked one of these FOLDS onto it. NO fifth rAF runner. The SOTA direction is wiring the rich substrate, not duplicating it.

2. **Integration is the load-bearing bar.** An engine with zero shipped-SFC consumers is dead substrate (J-inv-10). The goo, the silhouette, the bloom, the jubilance must paint on a real `<GlassDock>`/`<DockNowPlaying>`/`<DockStack>` — the demo demonstrates the vocabulary, the LIBRARY owns it.

3. **Paint is the only truth.** A source-text gate that greens on file-existence is the close-class lie the BC anti-disease law exists to kill. Every BF wave closes against a CAPTURED both-mode paint delta + a `proof:ba-gestalt` BF-roster verdict — re-pointed off BC onto the BF tree — never source-green alone.

---

## §3 — The deferred / chronic census + the fold

Full enumeration: `audit/DEFERRED-CENSUS.md`. Every deferred item is DECIDED here — `BUILD` (a BF wave lands it), `DEFER-with-trigger` (an honest hold + the re-entry condition), or `RETIRE-with-rationale` (subsumed/superseded). **The no-silent-drop machine itself is wave-1** (`BF.W-FOLD-LEDGER` — the disposition register the BE tranche specced but never built, so the deferrals have ridden un-decided). Headline dispositions:

- **CHRONIC — the 5-way rAF re-fork** (`useBloomUp`/`useDockContextSilhouette`/`useCelebrationBurst` each re-implement `useLiquidReveal`'s loop) → **BUILD** `W-FLIP-SPINE` (one runner, fold all).
- **CHRONIC — the undeleted spike** (`useLiquidMorph.ts` 462L/0-consumers + demo CSS in `src/styles`) → **BUILD** `W-SPIKE-DELETE` (the clean cut).
- **CHRONIC — V↔H is a facsimile** (the crossfade, not the shipped morph) → **BUILD** `W-VH-COMPOSE`.
- **CHRONIC — scroll fluidity deleted** (the `useLiquidRail` slow-glide) → **BUILD** `W-SCROLL-FLUIDITY`.
- **CHRONIC — the binding π absent** (~8-10 cited specs don't exist; `proof:ba-gestalt`→BC) → **BUILD** `W-PI-AUTHOR` + `W-GESTALT-WIRE`.
- **CHRONIC — Safari un-validated** (asked 2×, Tier-5 absent) → **BUILD** `W-SAFARI-CAPTURE`; the manual real-Metal goo p50 → `W-GOO-SPLIT-PERF`.
- **CHRONIC — phantom consumer-evidence** (markdown claims consumers that don't exist) → **BUILD** `W-JUBILANCE-WIRE` (fix the gate class: assert real call sites, not markdown keywords).
- **BUILD — the dead foundation tokens** (`--glass-fill-tint`/`surface=clear`/`--glass-bg-sheet` registered, wired nowhere) → `W-CONSUMER-BAND`.
- **DEFER-with-trigger — the album-derived per-piece shade** (GL color-seam fence) → re-enters when `DockNowPlaying` ships its ≥2nd consumer.
- **DEFER-with-trigger — the always-on metaball-teardrop V↔H fidelity** (the perf budget) → re-enters on a real-Metal p50 that clears the budget (`W-GOO-SPLIT-PERF` captures it).
- **RETIRE-with-rationale — one of `useLiquidMorph`/`useDockFission`** (the double-fork n-ary split) → `useDockFission` is wired, `useLiquidMorph` is orphaned; retire the orphan in `W-SPIKE-DELETE`.

---

## §4 — The bands + the wave roster

8 bands, priority-ordered (truth → consolidate → integrate → the user's asks → fidelity → Safari → breadth → close). Each wave: `id — intent (gate · binding π)`. Detailed specs in `waves/<id>.md`.

### Band 0 — TRUTH (the anti-disease foundation; FIRST)
- **W-FOLD-LEDGER** — the no-silent-drop disposition machine: `FOLD-LEDGER.json`/`.md` + `proof:be-fold-ledger` (every deferred item BUILD|DEFER|RETIRE, born-RED on a silent drop).
- **W-GESTALT-WIRE** — re-point `proof:ba-gestalt` REFLECT_DIR/ROSTER/WAVES_DIR from BC onto the BF tree; the BF gestalt roster (every dock-hallmark surface a row, born-FAIL).
- **W-PI-AUTHOR** — author the ~8-10 absent binding π specs (`bloom-up`/`dock-fission`/`metaball-bridge2`/`dock-context`/`dock-rail-realize`/`celebration-burst`/`liquid-morph`); widen `proof:no-layout-animation` to scan `demo/stories/**`; enroll in the visual-π runner.

### Band 1 — CONSOLIDATE (no-legacy / idiom spine)
- **W-FLIP-SPINE** — mint ONE `useElementBloom` FLIP-inversion rAF runner (the kf `ElementMorph` + `springTimingFunction` 1-eased loop, pluggable channels); fold `useBloomUp` onto `useLiquidReveal` (+ the additive 4th ambient-color channel); re-point `useDockContextSilhouette` + `useCelebrationBurst` onto the spine; a gate duplication-bite (a re-spelled loop reds).
- **W-SPIKE-DELETE** — delete `useLiquidMorph.ts` (462L, 0 consumers) + fix the false `manifest.ts:884` claim; relocate `liquid-morph.css` (815L demo-content) out of `src/styles/glass/` into `demo/`; the W-PRUNE-CONSOLIDATE clean cut (`proof:no-dual-path`).
- **W-VH-COMPOSE** — compose the shipped `useDockOrientationMorph` (V↔H) + `useDragMorph` (grab-pull) into the liquid dock; retire the crossfade facsimile.

### Band 2 — INTEGRATE (ship the engines; the load-bearing bar)
- **W-DOCK-INTEGRATE** — wire `useDockFission` + `DockGooFilter` into a real library register (`<DockNowPlaying>` and/or a `GlassDock` fission seam); ship the `url(#dock-fission-goo)` binding onto `fission-bridge.css`'s shipped `[data-fissioning]` selector (off the demo-only CSS); the bloom-to-fullscreen composes `ExpandableContainer`.
- **W-SILHOUETTE-REALIZE** — DECIDE-don't-rebook (BB.W-NDA-DECIDE discipline): wire `useDockContextSilhouette` into the flagship liquid surface with a real bar→bar+pill→split context, the `--silhouette-fuse-t` pill→tabbar meld painting via a CSS consumer; OR retire-with-rationale. Harden `proof:dock-context` to assert a real `setSilhouette` caller.
- **W-JUBILANCE-WIRE** — wire `useHaptic.pulse` (fission settle + drag snap + press) + `useCelebrationBurst.burst` (fission merge + an earned completion) onto ≥2 real surfaces; convert `proof:haptic-couple`/`proof:celebration-burst` ≥2-bar from markdown-keyword grep to real src/ call-site assertion; reconcile `useCelebrationBurst` with the shipped `CompletionSeal`.

### Band 3 — THE USER'S EXPLICIT ASKS (the feel)
- **W-LIQUID-GROW-ON-EVENT** — scroll-condense (bind a `--grow` scalar to a `scroll()`/`view()` timeline, the `scroll-choreography.css` idiom) + touch-drag-to-grow (compose `useDragMorph`/`useLiquidPress`) on the dock/sheet; extend `useDockState` with a scroll-condense state-feed (one registry, not a 2nd machine).
- **W-SCROLL-FLUIDITY** — re-home the deleted `useLiquidRail` continuous-position slow-glide (`SCROLL_PX_PER_SLOT` glide + spring-snap-to-nearest) onto `DockStack` as a compositor-only opt-in BESIDE `FadingScroll`.
- **W-ICON-PRESENCE** — raise `DockStack` glyph off bare `size-4` to a `--dock-stack-glyph` token (≥20px); floor the facets-mode recession opacity (`railProjection` farFloor 0 → ~0.35 legibility floor).
- **W-CORNER-AA** — re-verify + lock corner/edge AA under the new bloom architecture (rest pill, bloom-in-flight backdrop-plate, goo-neck edges) on a fresh both-mode capture; record the explicit AA fence.
- **W-LAYER-IN-LIQUID** — bring `DockLayerGroup` layering INTO the liquid surface (drill-in + collapse-while-switching over the live aurora); FOLD the two contextual models (`useContextualDockLayers` route→layer vs `useDockContextSilhouette` descriptor→silhouette) into ONE.

### Band 4 — iOS-27 FIDELITY (the look)
- **W-FISSION-FILAMENT** — make the neck SPAN the gap: anchor the `::before` filament at the dock BODY centroid + scale along the piece's detach vector (transform-origin at the body); size the `DockGooFilter` blur to the live `--dock-split-t`; give the pinch a legible duration via the existing per-rank `staggerStep` window (NO 2nd spring); fix the demo content/piece desync; exercise n>2 OR retire the dead `search=radial`/`nav=inward-merge` signatures.
- **W-RAIL-FIDELITY** — wire-OR-delete the dead φ-tier projection math; land the EXPANDED-carousel binding π (force-open, both orientations, distinct per-facet hues, deltaW=deltaH=0); raise the facets silhouette genuinely distinct from stack mode.
- **W-DEEP-GLASS-WIRE** — compose the shipped `--glass-depth`/`.glass-deep` onto the hero liquid surfaces (the sheet/player/CTA); the one-deep-register-per-route budget.

### Band 5 — SAFARI (the twice-asked validation)
- **W-SAFARI-CAPTURE** — author the 5 liquid webkit specs (`fission`/`nowplaying-pill`/`bloom-up`/`dock-rail-realize`/`lensing-safari`); widen the webkit Playwright `testMatch` (computed-from-disk) to enroll them; `proof:safari-liquid` + `safari-support-matrix.md` (one row per liquid surface: CSS primitive · Safari-26 status · degrade fall).
- **W-GOO-SPLIT-PERF** — the MANUAL real-Safari-26-on-Metal goo-fission p50 budget DELTA (orchestrator-owns-the-real-device-π); `proof:dock-goo-split`; fire the conditional goo-as-flat-crossfade carve-out if the budget misses.

### Band 6 — THE BREADTH (the whole-suite iOS-27)
- **W-DESHADCN-SWEEP** — the per-component reka/shadcn FORM abrogation (the exact-6 named-chip-radius sweep `selectableChip`/`toggle-chip`/`MetricBadge`, etc.).
- **W-DESHADCN-GATE** — `proof:de-shadcn` (extend `proof:glass-cohesion` in place, the `proof:no-gray` precedent): reds on any off-allowlist reka/shadcn FORM token.
- **W-CONSUMER-BAND** — `DockNowPlaying` + `GlassChip` + `GlassControl` + the IconChip glass register on the dead foundation tokens (`--glass-fill-tint`/`surface=clear`/`--glass-bg-sheet`); Sheet/Drawer re-wire onto `--glass-opacity-sheet`; harden `proof:glass-foundation` from presence-only to consumption-aware.
- **W-AUR-SATIN** · **W-AUR-PRISM** · **W-AUR-REACTIVE** — the album-art aurora band (`uMedium==8/9`, WebGL2+WGSL lockstep behind the GL-fence, default byte-identical; reactive as a consumer-side DockStage seam).
- **W-TAB-IOS-CAPSULE** — the `DockTabBar` + SegmentedTabs iOS recessed-accent capsule fold.
- **W-LENS-PRISM** · **W-SQUIRCLE** — the Clear-lens chromatic rim (`--glass-edge-dispersion`) + the squircle-coverage Band-2 majors.

### Band 7 — CLOSE
- **W-DEMO-BREADTH** — the MANY more examples: a RAIL example, a LAYER/contextual-switch example, a GROW-ON-SCROLL example, ≥2 fission surfaces (transport split, nav inward-merge); each composing the shipped engine.
- **W-REFLECT** — flip every BF gestalt-roster row GREEN on fresh whole-page both-mode `:5199` captures (NEVER reducedMotion); the surface-hash freshness floor.
- **W-CUT** — the honest 4.x publish + slides redeploy (USER-DOMAIN-AUTHORIZED — never autonomous).

---

## §5 — The DAG (topo order)

Full graph: `EXECUTION-DAG.md`. The spine: **Band 0 (truth) gates everything** — the gestalt + π + ledger land FIRST so every later wave closes paint-true. Band 1 (consolidate) precedes Band 2 (integrate) — fold the spine before wiring it. Band 2 precedes Bands 3-4 (the user's asks + fidelity build ON the integrated engines). Band 5 (Safari) follows the surfaces it validates. Band 6 (breadth) is largely parallel-independent (own bands). Band 7 (close) is last; W-CUT is the terminal user-gated cut.

```
W-FOLD-LEDGER ─┬─ W-GESTALT-WIRE ─┬─ W-PI-AUTHOR ─────────────┐
               │                                              │
               └─ W-FLIP-SPINE ─ W-SPIKE-DELETE ─ W-VH-COMPOSE ┤
                                                               ├─ W-DOCK-INTEGRATE ─┬─ W-SILHOUETTE-REALIZE
                                                               │                    ├─ W-JUBILANCE-WIRE
                                                               │                    ├─ W-LIQUID-GROW-ON-EVENT
                                                               │                    ├─ W-SCROLL-FLUIDITY · W-ICON-PRESENCE · W-CORNER-AA
                                                               │                    ├─ W-LAYER-IN-LIQUID
                                                               │                    ├─ W-FISSION-FILAMENT · W-RAIL-FIDELITY · W-DEEP-GLASS-WIRE
                                                               │                    └─ W-SAFARI-CAPTURE ─ W-GOO-SPLIT-PERF
   (parallel breadth) W-DESHADCN-SWEEP ─ W-DESHADCN-GATE · W-CONSUMER-BAND · W-AUR-* · W-TAB-IOS-CAPSULE · W-LENS-PRISM · W-SQUIRCLE
                                                               └─ W-DEMO-BREADTH ─ W-REFLECT ─ W-CUT
```

---

## §6 — The precepts (binding)

1. **No-legacy / clean break.** No alias, no dual path, no back-compat shim. A superseded mechanism is ABSENT once its successor lands (W-PRUNE-CONSOLIDATE). The spike is DELETED, not parked.
2. **Idiomatic / no re-fork.** Compose the shipped library primitive; never re-implement one. One FLIP runner, one spring family, one press, one drag, one V↔H morph.
3. **Compositor-only.** Every morph is transform/opacity/filter/clip-path — never a layout property. `proof:no-layout-animation` scans `src/styles` + `src/components` + `demo/stories/**`.
4. **Paint-first / no source-green close.** Every wave closes against a CAPTURED both-mode paint delta + a `proof:ba-gestalt` BF-roster verdict. A gate is the CI half; the captured π is the binding truth. The ≥2-consumer bar asserts real src/ call-sites, never markdown keywords.
5. **Visual-load-bearing.** An engine ships into a real library SFC (≥2 binary consumers) or is retired-with-rationale. Demo stories demonstrate; they do not satisfy the bar alone.
6. **Safari-first.** Every liquid surface runs on the webkit Playwright project + carries a `safari-support-matrix` row + a recorded degrade fall.
7. **Presets-in-consumers.** A demo hue / album palette / app-specific value lives in the consumer; the library's own default tokens are its identity.
8. **Foreign-tree fence (inv-26).** The slides/speedtest/constellation siblings are read as version authority only; BF edits ZERO sibling tree. W-CUT's publish + redeploy are user-domain-authorized.
