# D-DOCK · PASS-1 — what a dock IS on the web, done right, in 2026

**Problem.** The entire dock suite is re-invented from iOS-27 first principles, made idiomatic for the web. Greenfield. Known defects: hover plates clip at dock edges and scroll-port ends; the rail/facet fan-out is broken (chips overlap the dock body); dock morphing does not work at all; `/dock/liquid-playground` and `/dock/dock-gallery` are broken in Safari; `/dock/overview` animations are sluggish; clicking an item in a scrolled dock must scroll neighbors into view.

**Inputs.** Six independent pass-1 family returns: DOCK-A "one pill", DOCK-B "island graph", DOCK-C "platform dock", DOCK-D "control continuum", the prior-art sweep, and the codebase-truth inventory.

**Status.** Pass-1 synthesis. Verdicts in §1, the composed architecture in §2, the keep/retire map in §3, the open-gap register in §4 (these gate pass-2 convergence), the prototype slate in §5.

---

## §0 The unanimous diagnosis

All six families, working independently, converged on ONE root cause. `.glass-dock` is simultaneously three things:

1. the **glass surface** (`backdrop-filter`, its own containing block),
2. the **morph clip aperture** (`overflow: clip` on the morph axis + `contain: layout style paint`, `src/styles/dock/shell.css:231-252`),
3. the **interactive item container**.

Every named defect is a downstream compensation for that triple identity:

| defect | proximate compensation on disk |
|---|---|
| hover plates clip at edges / port ends | `--dock-control-safe-inset` (paint only 80% of the cell) + `overflow-clip-margin` band-aids (`overflow.css:48-60`) |
| rail chips overlap the dock body | the `.glass-dock-frame` `display:contents` non-clipping sibling escape (`GlassDock.vue:340-360`) + `railProjection.ts` φ² crossing math re-invented 3× (BC→BE→BG) |
| morph "does not work at all" | the `--dock-expand-t` vs `--dock-morph-t` directional confusion; a SEVEN-factor `scale:` product (`shape.css:166-181`) forcing per-child inverse counter-scales (`shape.css:231-258`); measured endpoints via a ResizeObserver dance (`dockMorphMeasure.ts`) |
| `/dock/overview` sluggish | per-frame custom-prop writes recomputing the whole `:where()` subtree under `contain` (the documented A′-4 ~13fps restyle trace); `DOCK_SPRING` ζ 0.64 ringing ~1s (hence the arrival-cut hack in `dockMorphContext.ts`); two live aurora GL contexts on the route; 12 docks × the machinery |
| Safari breakage on liquid-playground / dock-gallery | the prime suspect is goo `filter: url(#…)` co-located with `backdrop-filter` on the same subtree (`fission-bridge.css`, `morph-bridge.css`) — the ONLY WebKit-specific mechanism the module ships. Asserted-safe in code comments, user-reported broken: **must be confirmed in real WebKit** (gap G2) |
| scrolled dock doesn't recenter on click | no `scrollIntoView` call exists anywhere in the module; the overflow port fights the clip matrix (`shell.css:232-251`) |

**Scale of the disease** (codebase-truth census): ~39,452 lines — 7,209 component/composable TS+Vue across 36 files, 4,999 CSS across 17 partials, 21,750 gate lines across 45 files, 5,494 demo lines. Five `new SpringProgress` sites where the README mandates one. Two coexisting size architectures (convex-blend AND per-swap FLIP measure). Landing target after the greenfield: **~2,500–3,500 core lines + ~8 gates.**

**The pass-1 answer to "what IS a dock":** a dock is four decoupled things, never one box —

1. a floating glass **PLATE** — one lens, pure decoration, morphs its own pixels only;
2. an **unclipped run of CONTROLS** that are ordinary members of the library's selection-control family (the dock is SegmentedTabs/ToggleGroup wearing chrome);
3. **TRANSIENT SURFACES** (fans, satellites, menus, search) that escape to the top layer, where ancestor clipping is impossible by spec;
4. chrome **STATE** (hover-intent, keep-open, collapse) wrapped AROUND those three, never inside them.

Clipping defects become unrepresentable, not patched.

---

## §1 Verdict table

| family | verdict | rationale |
|---|---|---|
| **DOCK-A "one pill"** | **ADVANCE — the SPINE** | The two-layer plate/items decouple + `clip-path: inset(… round)` plate morph on ONE `--dock-t` spring scalar is the strongest core mechanism; independently re-derived by prior-art AND codebase-truth (three-way convergence = the signal). Zero measurement, zero counter-scale, Layout-track-flat by construction. Its "compress, never scroll" fisheye absolutism is DEMOTED to a pointer-only enhancement (the defect list presumes scrolled docks exist; touch has no hover, so compression below 44px is a floor breach) — P4 decides its fate. |
| **DOCK-B "island graph"** | **BANK** — re-trigger: a proven ≥2-consumer demand for continuous multi-island choreography (fission / Dynamic-Island class) surviving the P0 retirement census | The graph-solver is elegant but is a heavier bespoke JS engine whose distinctive payload (goo seams, island fission, solver-panned scroll) serves exactly the facilities being retired as zero-consumer spectacle. Its scroll answer (transform-panned islands, no native scroll) fights the platform. HARVEST NOW into the spine: the focus-transfer-on-dissolve rule (a dissolving focused element must hand focus to its successor, else the body) and the static-wrapper goo-seam pattern (filter never on a transformed element — the WebKit #246106 dodge) if goo ever returns. |
| **DOCK-C "platform dock"** | **ADVANCE — the ESCAPE arm** | Popover API + CSS anchor positioning for everything that leaves the box (top layer escapes ancestor overflow/clip/contain/transform/filter BY SPEC — the idiomatic replacement for `.glass-dock-frame`), native scroll + one-line `scrollIntoView` for the recenter defect, native light-dismiss/focus/Escape for free. Its **VT-as-the-collapse-morph bet is CUT**: a UA-driven View Transition is non-interruptible (hard cut on re-toggle) — a direct violation of the liquid-weight edict (all motion carries inertia/weight/bounce) — and VT fidelity on a live `backdrop-filter` plate is unproven. VT survives only as a topology-swap CANDIDATE (V↔H, face switch) vs the two-child crossfade; P5 decides. |
| **DOCK-D "control continuum"** | **ADVANCE — the CONTROL layer** | Orthogonal to the box architecture and independently developed: ONE headless `useSelectionGroup` (roving focus + selection model + the one indicator writer + overflow port + `scrollIntoView`-on-select) under tabs, toggle-group, dock rail, and dock stack alike. The safe-inset folds into the shared `.glass-capsule` face so the clip fix and the 44px floor are the SAME token. Retires reka `ui/tabs` (dock-rail is the sole consumer; `TabsContent` has zero). Composes with the spine; does not compete with it. |
| **prior-art sweep** | **RETIRE (converged)** | Not a distinct architecture: it independently derived the same plate/item decouple as A + the same top-layer fan as C — which is confirmation, not competition. Its distinct FACTS are absorbed as binding constraints: the iOS control-band spring numbers (response 0.15–0.35, bounce ~0.15; shipped `DOCK_SPRING` 0.68/ζ0.64 violates it), the buildui magnify law (linear falloff, ~110px radius, ~40px nudge, origin-bottom anti-clip), and the feDisplacementMap-as-backdrop-filter Chromium-ONLY fact (never load-bearing). |
| **codebase-truth** | **ADVANCE — merged into the SPINE** | The binding keep/harvest/retire map + the L0/L1/L2 confirmation + the gate-cull plan + the scalar-scoping insight (`--dock-t` registered on the PLATE, not inherited across the control subtree — kills the A′-4 restyle storm) + the stationary-hit-region insight (deletes ~120L of hover hysteresis). It and DOCK-A are one family; §3 is its reconciled map. |

**The leading composition (the hybrid, named exactly):**

> **SPINE** = DOCK-A × codebase-truth (three z-layers; clip-path plate morph on one plate-scoped `--dock-t` spring scalar; stationary state-sized hit region)
> **+ ESCAPES** = DOCK-C (popover + anchor positioning top layer for fans/satellites/menus; native scroll + `scrollIntoView`)
> **+ CONTROLS** = DOCK-D (`useSelectionGroup` + the shared `.glass-capsule` face with the folded safe-inset)
> **+ MOTION** = one `useDockSpring` engine; VT only as the P5 topology-swap candidate.

Two genuinely competitive poles remain live into pass-2 — the JS-spring spine (A) vs the platform-native swap mechanisms (C's VT/popover reach) — resolved by prototype, not assertion.

---

## §2 The composed architecture (mechanism level)

### 2.1 Three z-layers, zero content clip

- **L0 — THE PLATE ("the lens").** One element (`position: absolute; inset: 0`, or a `::before`) owning `backdrop-filter` + the `--glass-tint-*` legibility seam + rim + specular — the existing glass ladder verbatim (`src/styles/dock/adaptive-legibility.css`, `--glass-bg-dock`, the bright-bucket darken). Its visible extent morphs via `clip-path: inset(var(--t-top) var(--t-end) var(--t-bot) var(--t-start) round var(--r))` — paint-only, compositor-composited, true rounded corners at every frame (the reason `scaleX` failed), clips ONLY its own pixels, needs ZERO endpoint measurement (self-describing over the reserved box). The `dockMorphMeasure.useDockExpandedSize` convex-blend `inline-size` model is retained as the FALLBACK candidate iff G1 (clip-path × backdrop-filter on WebKit) fails — one-element layout per frame, still subtree-cheap, but no longer Layout-flat; the choice is P1's.
- **L1 — THE CONTROLS.** A normal-flow flex run OVER the plate, `overflow: visible` on BOTH axes ALWAYS. Hover/press plates are compositor transforms that overflow the plate edge freely — no ancestor clips them, so defect #1 is structurally unrepresentable. Each cell reserves the full ≥44px hit box; the painted plate insets or overhangs independently (hit box ≠ paint box).
- **L2 — TRANSIENT SURFACES.** Fans, satellites, menus, search sheet: `popover` elements in the top layer (§2.3). The `.glass-dock-frame` escape hatch, `overflow-clip-margin`, and the per-orientation overflow clip matrix all retire — there is nothing left to escape FROM.
- **The reserved-footprint contract (honest, stated).** A collapse-morphing dock reserves its expanded footprint (one layout solve) and is therefore OUT OF FLOW (`position: fixed|absolute` floating pill); the transparent reserved margins are `pointer-events: none` (click/wheel pass through to page content) with `pointer-events: auto` on plate + items. An IN-FLOW dock (SidebarDock) is `alwaysExpanded` by contract — already de-facto true at HEAD. Verified by P1 (G3).
- **The reveal spill check (G12).** If mid-morph content visibly spills past the narrowing plate, the clip lands on a CONTENT WRAPPER only (`clip-path: inset()` on a non-interactive text/glyph wrapper) — never on L1's interactive run, so hover plates still overflow.

### 2.2 One engine, one scalar

- **`useDockSpring`** (`src/components/custom/dock/composables/useDockSpring.ts`, 132L — the sole `new SpringProgress` site) owns EVERY dock scalar. It writes ONE registered `@property --dock-t <number>` (initial 0) **scoped to the plate element, not inherited across the control subtree** — a per-frame write recomputes the plate clip + the content crossfade only, not the 10-selector `:where()` subtree (the codebase-truth cure for the A′-4 restyle storm). Clip insets, item translate/fade, and the summary crossfade are all `calc()` off `--dock-t`.
- **The scalar zoo dies**: `--dock-expand-t`, `--dock-size-scale`, the dock `--stretch`, `--dock-punch-stretch`, and the per-child inverse counter-scale rules (`shape.css:231-258`). `useLayerTransition.ts`'s second `new SpringProgress` (line 287) and its per-swap FLIP measure die with it (the W-GOD1 fold booked at `useLayerTransition.ts:37`, finally landed by deletion).
- **The spring retune (G8, decided by feel not assertion).** Shipped `DOCK_SPRING` = response 0.68 / ζ 0.64 (`constants.ts:85`) rings ~1s — the arrival-settle cut in `dockMorphContext.ts` exists to hide it, and two families independently name it the sluggishness co-cause. The iOS control band is response ~0.25–0.35 / ζ ~0.75–0.85 (WWDC23 s.10158; bounce ~0.15 brisk). This REVERSES a BG-decided register, so P1 A/Bs the bands and the paired capture decides. Interruptible velocity-carry (SpringProgress re-seat) is non-negotiable either way.
- **Hover on a stationary, state-sized hit frame (G7).** Enter/leave listeners live on a frame that never moves under the cursor: sized to the collapsed pill at rest, to the expanded footprint while open. The boundary never sweeps → the ~120L hysteresis apparatus in `useDockState.ts` (`isMorphingEdgeSweep`, `EDGE_BAND_PX`, the leave-recheck) is DELETED. A minimal intent dwell (~60ms) on enter is KEPT — a sweep-past should not expand the dock; that is UX intent, not moving-edge compensation. The empty-gutter trap (hover over reserved-but-transparent margin must NOT expand) is exactly why the hit frame is state-sized, not footprint-sized.
- **PRM**: `SpringProgress.respectReducedMotion` seats synchronously — the state is always correct, zero motion frames, no collapsed-sliver paint; fades survive (motion-canon P6).

### 2.3 Escapes = the top layer (DOCK-C's arm)

- Satellite fans, the facet strip, dock-anchored menus, and the search surface render as **`popover`** elements anchored to their trigger via **CSS anchor positioning** (`anchor-name`/`position-anchor`), with `position-try-fallbacks: flip-block, flip-inline` for viewport edges and `position-visibility: anchors-visible` for scrolled-away anchors. The top layer is exempt from ancestor `overflow`/`clip`/`contain`/`transform`/`filter` **by spec** — "chips overlap the dock body" and "fan clips at the port end" become impossible, and the `popovertarget` wiring gives light-dismiss, focus management, Escape, and `aria-expanded` natively (retiring bespoke guard code).
- **Honest degrade (not masking):** gated on `CSS.supports('anchor-name: --x')`. Safari < 26 / FF < 132: the popover still opens fully functional (top layer, a11y intact) and a ONE-SHOT `getBoundingClientRect` on open/resize places it — no per-frame loop, visibly correct, never a hidden-broken state. DOCK-D's warning stands: this dual placement path is the one place the design tolerates two paths, because the JS arm is a one-shot positioning of an already-working surface, not a cover over a dead primary.
- **Hover-intent for hover-opened fans** is honest JS (~15 lines of dwell; `interestfor` is Chromium-142-only). The light-dismiss × hover-close interop matrix (sweep-past no-open / leave-closes / focus-stays / Esc) is P2's; if `popover=auto` fights the hover model, fall to `popover=manual` + explicit close.
- **`railProjection.ts` fate is P2's**: if the fan is an anchored flex strip, the φ-tier ring math retires with `DockStack`'s dual modes; if the facet carousel's tiered read survives the taste test, `projectFacets` survives as PURE internal layout math inside the popover (it is already stateless).

### 2.4 Controls = the selection family (DOCK-D's arm)

- Mint **`useSelectionGroup`** (headless, reka-free, `/motion-core`-eligible), assembled from parts that already exist:
  - selection model: `defineModel` single `string` | multiple `string[]`, `mode: 'single'|'multiple'`;
  - roving machine: `src/components/custom/tabs/composables/useTabRovingFocus.ts` VERBATIM (125L — exactly-one-tabstop, axis-derived arrows, Home/End, wrap, disabled-skip);
  - the ONE traveling-indicator writer: `useTabIndicator.ts` promoted to `composables/motion/useSelectionIndicator.ts` (ResizeObserver + center-anchored transform + the `--stretch` squish via `useLiquidFlex`); reka's `--reka-tabs-indicator-position` path and the CSS-anchor indicator branch both retire — ONE writer, Safari-identical by construction;
  - overflow: the `<FadingScroll>` port + **`el.scrollIntoView({ inline: 'nearest', block: 'nearest' })` fired on EVERY select** — this line IS the scrolled-dock recenter defect, owned once, and tabs get it for free.
- **ONE control face**: `.glass-capsule-track` / `.glass-capsule-hover` / `.glass-capsule` (`src/styles/glass/glass-capsule.css`) + `vSpecular` + `useLiquidPress`. **`--dock-control-safe-inset` folds INTO the face** (`background-clip: content-box`, paint insets, hit cell stays full) — the clip fix and the WCAG 2.5.5 floor become the same token. Role-per-mode rides the engine (radiogroup/radio + `aria-checked` single; tablist/tab + `aria-selected` panel-nav; group + `aria-pressed` multi).
- **Component fold**: `DockIconButton.vue` + `DockTabButton.vue` → ONE `<DockControl>` (a shape axis); the three overlay triggers (`DockSelectTrigger` / `DockDropdownTrigger` / `DockPopoverTrigger`, already one `.dock-trigger` recipe) → ONE `<DockTrigger>`; the `DockLayerGroup` switcher rail → a `useSelectionGroup` instance — retiring the 5-SFC reka `ui/tabs` substrate (sole internal consumer; `TabsContent` zero consumers; off-repo blast radius is G10's census).

### 2.5 Overflow

- **The facility is native scroll**: a DISTINCT inner scroll track (`overflow-x: auto`), edge legibility via `<FadingScroll>`'s dual-path mask (never a clip that eats hover — hover lift is scale/Z toward the viewer), cross axis honestly `visible`, `scrollIntoView` on select. Cheap, universal, matches the stated requirement.
- **Fisheye magnification is the POINTER enhancement** (DOCK-A's law, demoted from sole law): one rAF-coalesced pointermove writes `--dock-px`; each item scales by a pure-CSS Gaussian `calc(1 + var(--amp) * exp(-pow(var(--d),2) / (2*pow(var(--sigma),2))))` (`exp()`/`pow()` Baseline Widely-Available 2026-06, Safari 15.4+), with `transition: --dock-px 80ms linear` easing the hump. Hit boxes stay at base geometry (scale is visual-only); `hover: none` → flat; PRM → off. Honest cost note: N style-recalcs/frame on the main thread, transform-only — P4 measures it on WebKit and decides ship/park.
- **The 44px tension named**: compress-to-fit respects the floor; when N × 44px exceeds the budget on touch, the dock yields to the scroll track (the one place "never scroll" bends, and it bends honestly).

### 2.6 Layers / faces

- `DockLayerGroup`'s registration machinery (524L) + `DockLayer` + `useLayerTransition` (408L) fold to **ONE crossfade slot**: the content layer hosts one active face; a switch is a two-child opacity overlap on `--dock-t`, the reserved box sized to the PEAK face (the self-reserve survives as a measure-once, not a per-swap FLIP). The switcher is a `useSelectionGroup` button run. The DOCK-B harvest applies: a focus-holding face that dissolves transfers focus to its successor, else the body.
- **Crossfade vs `startViewTransition` is P5's call** (G6): VT is UA-eased and non-interruptible (a hard cut on rapid re-toggle — the liquid-weight edict says motion carries inertia), and VT snapshot fidelity on a live `backdrop-filter` plate over aurora is unproven (blur ghost / edge pop). The two-child crossfade needs no VT and stays spring-driven; VT ships only if P5 proves it reads BETTER and the interrupt cut is acceptable for the topology-swap class.

### 2.7 Orientation

- One axis token (the existing `dim` idiom) + logical properties (`inline-size`/`padding-inline`), so ONE ruleset serves horizontal and vertical. V↔H is **two states of one dock** — a flex column→row topology change the platform cannot continuously interpolate (the module README's own admission). The transition between them is the face-swap mechanism (§2.6). `useDockOrientationMorph.ts` (419L) + `morph-bridge.css` (215L) + the two-real-DOM-docks metaball bridge retire wholesale — this is also the suspected co-killer of the Safari-broken showcases.

### 2.8 Retirements (clean break, no alias — the superfluous-code excision)

Pending the G10 census (all verified zero-binary-consumer by in-repo grep; the constellation + registry probe is P0's):

- **Fission** ~1,392L: `useDockFission.ts` (496) + `useDockFissionWiring.ts` (214) + `dockFissionSignatures.ts` (115) + `fission-bridge.css` (457) + `fission-island.css` (110) — demo-only spectacle AND the prime Safari suspect (goo `filter: url()` stacked with `backdrop-filter`).
- **Siri island** ~565L: `useSiriDock.ts` (190) + `SiriDockCapability.vue` (116) + `siri.css` (259) — demoted OUT of the dock module (a standalone `/siri-island` iff a real consumer materializes; else deleted).
- **V↔H goo morph** ~634L (§2.7).
- The scalar zoo, the counter-scale rules, the measured-endpoint FLIP arm, the `.glass-dock-frame` escape, `overflow-clip-margin`, the hover hysteresis (~120L of `useDockState`).
- **~37 of 45 dock gates** (they lock accreted mechanisms that evaporate with the defect class); `proof-dock.mjs` (2,356L) shrinks to the a11y contract + clip-by-construction + single-engine asserts.
- Demo: `liquid-playground` / `dock-gallery` / `morph-showcase` / `siri-island` stories retire or rebuild on the new spine; `/dock/overview` drops to ONE live aurora context.
- The registered-property census: 6 scalars survive (`--dock-t`, `--dock-scale`, `--dock-local-scale` family), 7 die with fission/siri/orientation.

---

## §3 Keep / harvest / retire map (reconciled across families)

**KEEP (compose, do not re-fork):**

| artefact | role | notes |
|---|---|---|
| `composables/useDockSpring.ts` | THE one spring engine | extends to own every scalar; retune per G8 |
| `composables/useDockState.ts` | 3-state (rest/hover/pinned) + keepOpen/release ref-count + teleported-target awareness | MINUS ~120L hysteresis; minimal intent dwell kept |
| `composables/dockMorphMeasure.ts` | `getSize`/`dimOf` axis helpers; convex-blend as G1 fallback | primary size model is clip-path (measurement-free) |
| `composables/useDockClickIntegrity.ts` | mid-morph tap-coordinate guard | KEPT-SHRUNK — the spine keeps a spring morph, so the coordinate-shift class persists (DOCK-C's "retire" applied only to its cut VT bet) |
| `composables/useDockHold.ts`, `dockContext.ts`, `dockLayerContext.ts`, `isTeleportedTarget.ts`, `useDockShellProps.ts` | typed DI + prop shape | unchanged |
| `composables/useDockSearch.ts` | search content over the `/search` pipeline | re-hosted on a popover surface (L2) |
| `DockSeparator.vue`, `DockBackgroundToggle.vue` | section seams; WCAG 2.2.2 pause | unchanged |
| `src/styles/dock/density.css` | the `--dock-scale` geometry cascade + coarse-pointer floor | `--dock-control-safe-inset` folds into the shared face (§2.4) |
| `src/styles/dock/adaptive-legibility.css` + the glass ladder | the warm-cream identity | untouched — the plate is the shipped material |
| `src/styles/dock/cta-seat.css` + the CTA-receive seam | **KEEP pending census** | prior-art's "retire" claim CONFLICTS with the recorded speedtest consume contract (BC.W-AX-DOCK-CTA-SEAT); G10 verifies before any cut |
| `<FadingScroll>` / `useFadingScroll` | the one overflow-fade port | dual-path single-writer, Safari-safe |
| `tabs/composables/useTabRovingFocus.ts` (verbatim), `useTabIndicator.ts` (promoted) | the roving machine; the one indicator writer | DOCK-D §2.4 |
| `glass/glass-capsule.css`, `vSpecular`, `useLiquidPress`, `useLiquidFlex`, `usePointerVelocityField` | the control face + press/gleam/squish legs | unchanged |
| `constants.ts` | `DOCK_TAP_FLOOR_PX=44`, type homes | `DOCK_SPRING` value pending G8 |
| `scripts/proof-dock-a11y.mjs` | the a11y contract gate | survives the gate cull |
| `useGlassBackdropLuminance` | adaptive-dark observer | external, ≤4Hz-gated, unchanged |

**HARVEST (from banked/retired families):** `railProjection.ts` pure math (P2 decides live-vs-dead); DOCK-B's focus-transfer-on-dissolve rule; DOCK-B's static-wrapper filter pattern (recorded for any future goo); prior-art's magnify numbers + spring band + feDisplacementMap-Chromium-only fact.

**RETIRE:** §2.8 list + `useLayerTransition.ts`, `DockLayerGroup.vue`/`DockLayer.vue` registration machinery (folded to the crossfade slot), `DockStack.vue` dual modes (→ popover fan), `DockTabButton.vue` + two of three triggers (folded), reka `ui/tabs` (5 SFCs, G10-gated), the CSS-anchor indicator branch in `SegmentedTabs.vue`, `DockSection.vue` descriptor chassis (→ separator + slots), the shell/morph/shape/layers/overflow/stack-rail/section clip-era partials (→ ~3 partials: `dock.css` two-layer box + morph, `fisheye.css` if P4 ships it, plus kept density/adaptive-legibility/cta-seat).

---

## §4 Open-gap register (the pass-2 convergence blockers)

Each gap names its deciding probe and owning prototype. A pass-2 spec that has not closed G1–G3, G5–G8 has not converged.

| # | gap | deciding probe | owner |
|---|---|---|---|
| **G1** | **Plate-morph mechanism.** Does WebKit clip a plate's `backdrop-filter` SAMPLE correctly to an animating `clip-path: inset(… round)` region (no leak, no double-blur), while an unclipped L1 item overhangs the plate edge and composites its own hover glass against the page? This is the spine's crux. | Build plate (animating clip-path + backdrop-filter) + overhanging hover item; capture Chrome + real WebKit. FAIL → fall to the convex-blend `inline-size` plate (one-element layout/frame) and record the allowlist entry. | P1 |
| **G2** | **The ACTUAL Safari root cause** of liquid-playground/dock-gallery (asserted-safe in code, user-reported broken): goo `filter:url()` + `backdrop-filter` stack? the two-DOM-dock bridge? `@container style()` or `@property` gaps? The degrade story is not final until this is diagnosed in real WebKit. | Open all three routes in Playwright WebKit/Safari 26; read console + visual; isolate. | P0 |
| **G3** | **Reserved-footprint contract.** Pointer/wheel pass-through in the transparent margins; hover-expand still reachable on the pill; no dead-slab scroll interception; the out-of-flow requirement acceptable as public contract (in-flow ⇒ `alwaysExpanded`). | Collapsed dock over live scrolling content; verify click/wheel pass-through + pill hover, Chrome + WebKit. | P1 |
| **G4** | **The overflow law.** Fisheye vs native scroll per pointer class; does the CSS Gaussian hold 60fps on WebKit at ~15 items (N main-thread recalcs/frame); the 44px-floor breach → touch scroll escape without a jarring mode flip. | Side-by-side fisheye vs scroll-track; WebKit recalc/frame trace; drive N up to the breach. | P4 |
| **G5** | **Anchor-positioning reality on Safari 26** inside a `position: fixed` dock: does `@position-try` actually flip at viewport edges, does `position-visibility` engage, and does the one-shot JS degrade read identically? | 6-chip anchored fan on a fixed-bottom dock; shrink viewport; Safari 26 + Chrome + the degrade arm. | P2 |
| **G6** | **Face-swap mechanism.** Two-child opacity crossfade vs `startViewTransition` on a LIVE backdrop-filter plate: blur ghost/edge pop in the VT snapshot? Is the VT interrupt hard-cut acceptable against the liquid-weight edict, or does the crossfade win outright? | Mid-transition frame capture, both engines; rapid-interrupt feel judgment. | P5 |
| **G7** | **Stationary state-sized hit region.** Does it fully kill enter/leave flicker with ZERO hysteresis — including the collapsed state where the region must be the pill rect (not the expanded footprint, else empty-gutter hover expands)? | Rapid hover hammering at the collapse edge with all hysteresis deleted. | P1 |
| **G8** | **`DOCK_SPRING` settle.** The number (candidate response ~0.3 / ζ ~0.8 vs shipped 0.68/0.64 — reverses a BG-decided register, so the paired capture decides); keep the arrival-cut or fix ζ, never both; interruptible velocity-carry preserved. | A/B the bands on the P1 morph; settle-time + interrupted-retarget trace + feel capture. | P1 |
| **G9** | **Indicator ↔ scroll coupling.** One traveling indicator tracking a SCROLLED member's center inside the port, no clip at port ends, no second measure loop fighting the RO. | Scrollable dock row + shared indicator: scroll, then select; assert center-landing + ≥1px slack at edge and port end, Chrome + Safari. | P3 |
| **G10** | **Retirement census** (inv-11 corollary): fission / siri / orientation-morph / DockStack-facets / reka `ui/tabs` / `TabsContent` binary consumers across the constellation (slides, speedtest, sci-report) + the registry probe; the cta-seat speedtest contract verified before any cut. | Constellation grep + `npm view` lineage probe; a published-but-consumed export forces a named migration row. | P0 |
| **G11** | **Layer-slot sufficiency.** Does the one crossfade slot cover the real `/dock/layers` + `/dock/sections` cases the registration machinery served: peak-reserve across differing-height faces, keyboard face-switch, switcher persistence while collapsed? | Rebuild `/dock/layers` on the slot + a plain switcher run; a11y diff. | P5 |
| **G12** | **Reveal spill.** With no content clip, does the full row visibly spill past the plate mid-morph, or does the summary crossfade suffice? If spill: clip the CONTENT WRAPPER only, never L1. | The P1 morph frame-series. | P1 |

---

## §5 Pass-2 prototype slate

Every prototype delivers paired Chrome + WebKit captures (both modes where paint-relevant), a CDP trace where perf-relevant, and a one-page verdict. The pass-2 synthesizer folds verdicts into PASS-2.md.

| id | family / risk proven | build | acceptance |
|---|---|---|---|
| **P0 — diagnosis + census** (no build) | codebase-truth G2 + G10 | Real-WebKit run of `/dock/liquid-playground`, `/dock/dock-gallery`, `/dock/morph-showcase`; constellation grep + registry probe for every §2.8 retirement + cta-seat. | Root cause named with a console/visual artifact; per-retirement consumer verdict table. |
| **P1 — the SPINE** (DOCK-A × codebase-truth: the core bet) | G1, G3, G7, G8, G12 | `demo/stories/dock/greenfield.vue` (or scratchpad HTML for fastest WebKit): reserved-footprint two-layer dock over live aurora; L0 plate `clip-path: inset(… round)` morph on one plate-scoped `--dock-t` from `useDockSpring`; L1 items translate/fade; stationary state-sized hit frame, hysteresis deleted; spring band A/B (0.68/0.64 vs ~0.3/0.8); PRM seat. | CDP Layout track FLAT through the morph; WebKit screenshot of a hover plate overhanging the plate edge UN-CLIPPED (the defect killed by construction); backdrop sample clips to the plate region (no leak/double-blur); zero enter/leave oscillation under edge hammering; click/wheel pass-through in reserved margins; PRM single-paint. |
| **P2 — the ESCAPE** (DOCK-C: top-layer fan) | G5; decides `railProjection` | Anchored `popover=auto` 6-chip fan on a fixed-bottom dock trigger; `position-try-fallbacks` + `position-visibility`; the `CSS.supports`-gated one-shot JS placement arm; hover-dwell × light-dismiss matrix (sweep/leave/focus/Esc). | Chips paint OVER the dock body and past every former clip line, Safari 26 + Chrome; flip fires at small viewport; focus returns on Escape; the degrade arm visually matches; verdict on flex-strip vs φ-tier fan layout. |
| **P3 — the CONTROLS** (DOCK-D: one engine, three mounts) | G9 + the reka-divorce check | `useSelectionGroup` mounted three ways: `<SegmentedTabs variant="pill">`, `<ToggleGroup type="single">`, and a SCROLLABLE dock control row inside a live glass dock; one indicator writer; `scrollIntoView`-on-select; safe-inset folded face. | ONE engine drives all three; select on a half-off item recenters it; indicator + hover plate keep ≥1px slack at the dock edge AND port end; Chrome≡Safari pixel-parity both modes; axe audit of the three role modes vs reka's current DOM output. |
| **P4 — the OVERFLOW feel** (DOCK-A's fisheye, ship/park) | G4 | 15-item pure-CSS Gaussian fisheye (`--dock-px` + `exp()`/`pow()`, 80ms ease) vs the native scroll track + FadingScroll, side by side; drive N to the 44px breach. | WebKit recalc-per-frame trace ≤ budget + hump reads buttery (not stair-step); hit boxes hold 44px; `hover:none` → flat; the touch breach yields to scroll without a jarring flip. Verdict: pointer-enhancement SHIPS or PARKS. |
| **P5 — the FACE SWAP** (crossfade vs VT) | G6, G11 | The one crossfade slot rebuilt over `/dock/layers` content (differing-height faces, keyboard switch, collapsed persistence) vs a `startViewTransition` arm of the same swap, on a live glass plate. | Mid-transition frame clean (no blur ghost/edge pop) in both engines for whichever arm ships; rapid-interrupt judged against the liquid-weight edict; peak-reserve + focus-transfer + a11y parity with the old machinery. |

Sequencing: P0 unblocks everything (the census gates the retirement list; the diagnosis gates the degrade story). P1 is the load-bearing bet — if G1 fails BOTH arms (clip-path AND convex-blend), the spine re-opens and DOCK-B un-banks. P2–P5 are parallelizable after P0.

---

## §6 Design-quality bar (binding on every prototype and the pass-2 spec)

- **Warm identity.** The plate is the shipped glass ladder (`--glass-bg-dock`, `--glass-blur-*`, the adaptive-legibility bright-bucket + `--glass-tint-*` seam). Zero new color tokens; demo hues stay presets-in-consumers.
- **Compositor-only.** No layout property animates (the `proof:no-layout-animation` floor). The only candidate layout-touch in the whole design is the G1 FALLBACK's one-element `inline-size` blend — allowlisted with rationale iff clip-path fails, never silently.
- **PRM absolute.** Spring seats synchronously (zero motion frames, no sliver states); fisheye off; stagger snaps; fades survive (motion-canon P6). `prefers-reduced-transparency` / `prefers-contrast: more` ride `--glass-level` unchanged.
- **Safari-honest.** Every load-bearing primitive is Baseline on the target set: `clip-path: inset(round)` (ancient), `@property` (16.4+), Popover API (17+), `exp()`/`pow()` (15.4+), `backdrop-filter` (18+ with `-webkit-` companion). Chromium-only primitives (feDisplacementMap-as-backdrop, `corner-shape`, interest invokers, CSS carousel pseudos) are `@supports` enhancements or unused. NOTHING ships that works-in-Chrome-breaks-in-Safari; the goo class is deleted, not fallback-masked — Safari parity by subtraction.
- **No masking fallbacks** (the 07-03 edict, `proof:no-masking-fallback`). Every degrade is a visible, functional, honest state: a flat dock without magnification; a default-placed-then-JS-positioned popover; a snap instead of a tween. Never a plausible-state cover over a dead primary.
- **KISS/DRY.** One spring engine, one scalar, one selection engine, one indicator writer, one overflow port, one control face, one fan surface. The superseded mechanism is ABSENT the moment its successor lands (`proof:no-dual-path`); the scalar zoo, the second SpringProgress, and the three-times-reinvented fan CSS do not survive in parallel with their replacements.
- **Clean breaks.** Retirements delete definitions — no aliases, no shims; MIGRATION rows for every public-surface change; the fission/siri/orientation rows land in the disposition register as decided-terminal, never re-booked.
- **A11y floor.** Presentational root (no role, no `aria-expanded` — it belongs on the trigger); every interactive a real `<button>`; roving tabindex, axis-derived arrows, Home/End; 44px hit cells decoupled from painted plates; `inert` keyed to the SAME signal paint reads; keepOpen + teleported-target awareness so dock-anchored overlays never collapse the dock.
- **Gestalt close.** The bar is the whole-page verdict over the real backdrop, both modes, Chrome AND Safari captures — never the per-mechanism π alone (the `proof:ba-gestalt` discipline; the Safari-broken stories are the regression witnesses to re-shoot).

---

## §7 Banked / non-goals

- **DOCK-B island solver** — banked; re-trigger: a proven ≥2-consumer demand for continuous multi-island choreography surviving the P0 census, OR a P1 spine failure on both G1 arms.
- **Continuous V↔H silhouette morph** — non-goal (platform topology limit; the swap is the honest idiom).
- **Fission and the Siri island as dock facilities** — non-goals; the island is a candidate standalone component iff a consumer materializes.
- **Houdini Paint API goo** — ruled out (Safari polyfill-only in 2026).
- **CSS carousel pseudos (`::scroll-marker` / `::scroll-button`)** — booked `@supports` enhancement, never primary.
- **feDisplacementMap refraction lens** — at most a Chromium-only `@supports` layer over the complete blur floor; never load-bearing.
