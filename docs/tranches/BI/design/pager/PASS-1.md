# D-PAGER — PASS-1 SPEC: the liquid dot-morph pager + the carousel rebuild

Problem: `/navigation/carousel` is absolutely broken and needs a ground-up redesign; the
selected deck dot must MORPH from one dot to another (the standing edict: the Google-deck
worm — the selected indicator stretches, travels, and re-forms on the next dot with liquid
weight). Surfaces: `src/components/custom/pager-dots/` + the `src/components/ui/carousel/`
family + `demo/stories/navigation/carousel.vue`.

Five family returns synthesized: PAGER-A (SVG goo worm, repair), PAGER-B (FLIP worm,
filter-free), PAGER-C (painted strip, canvas field), PAGER-D (view-transition morph), and
the codebase-truth ground pass. This spec distills them into one architecture, a verdict
table, the open-gap register that gates convergence, and the pass-2 prototype slate.

---

## §0 The binding diagnosis (codebase-truth — adopted whole)

"Absolutely broken" is TWO defects conflated. Every surviving family builds on this split;
it is not up for re-litigation in pass 2.

**Defect 1 — the pager paints EMPTY/SMEARED: filter-scale annihilation.** `#pager-goo`
(mounted via `src/components/custom/goo-filter/GooFilter.vue` `LIBRARY_IDS`) runs
`feGaussianBlur stdDeviation=8 → feColorMatrix …18 -7` over the WHOLE `.pager-goo-layer`
(bed dots + worm). A 13px pip (r=6.5) blurred at σ=8 peaks at alpha
`1−exp(−r²/2σ²) = 0.281`; the matrix survives only above `7/18 = 0.389`. `0.281 < 0.389`
→ every shape clamps to 0 → the layer paints an empty cream pill (proven three ways: live
`filter:none` toggle on :5200, the peak-alpha math, and codrops-scale prior art — codrops
runs σ=10 on ~40px dots; σ=8 was copied at PLATE scale onto a 13px pip). Where partial
alpha survives, the whole-layer blur sausages the 5 bed dots into one dark tadpole
(blur/dot ratio 0.62). NOTE: the current state is a NO-MASKING-FALLBACK violation in
spirit — the primary paints NOTHING and nothing honest replaces it.

**Defect 2 — the carousel CONTENT barbell is a category error.** `CarouselContent.vue`
mounts a `.carousel-goo-layer` barbell (`useCarouselWorm.ts`) with body diameter
D = 265.75px measured live (step ≈ 430px = a full slide), deliberately un-clipped. Measured
escape: bodyB right edge 1568px vs card right edge 1009px — a 351px translucent oval flying
559px OUTSIDE the 414px card, sweeping the description text every 3.8s autoplay tick. A
metaball merge means something at INDICATOR scale; melting a content card into a blob is
wrong in principle. **Unanimous across families: RETIRE the content barbell wholesale.**

**Defect 3 (owed rider) — the pager is keyboard-broken.** `PagerDots.vue` (source lines
219–237) renders plain `<button role="tab">` with NO roving tabindex and NO root
`@keydown` — 5 independent tab stops, no Arrow/Home/End. A WAI-ARIA tabs-pattern
violation that any winning family must fix (the SegmentedTabs roving contract from
BB.W-DRAG-MORPH is the model).

**The wrong clock.** `--pager-worm-duration: 1.8s` (`src/styles/tokens/scheme-spring.css`)
reads broken-slow against the 3.8s autoplay — the worm is still settling half the cycle.
Perceptual arrival belongs at ~250ms (A: retime to ~0.42s with the `linear()` dwell kept —
QUICK-IS-ARRIVAL, never truncate the curve; B: the spring's own settle IS the dwell).

---

## §1 Verdict table

| Family | Verdict | Why (one line) |
|---|---|---|
| **PAGER-A** SVG goo worm | **ADVANCE** | Root cause proven (0.281 < 0.389 annihilation); the shipped barbell engine is sound — repair = worm-scoped filter + correct σ + retimed clock + drag-scrub. Only mechanism class that draws a true smooth concave waist. Confidence 85. |
| **PAGER-B** FLIP worm | **ADVANCE** | Filter-free, compositor-only, paints byte-identically on every engine; the spring lead/trail driver is interruptible + velocity-continuous (strictly better than the `--goo-t` transition restart) — competitive as paint AND donor of the driver either way. Confidence 78. |
| **PAGER-C** painted strip | **BANK** | Developed + honest: Safari has no `ctx.filter` → uniform CPU field forced → fidelity-EQUAL, cost-WORSE at pager scale (DOM+SVG is GPU-compositor on every engine). **Re-trigger, named:** a continuous full-width mercury rail with ≥12 simultaneously-fused nodes enters scope (the measured break-even), or an un-windowed 30+ dot rail. |
| **PAGER-D** view-transition morph | **RETIRE** | Empirically disproven in-browser: same-name VT of a same-size dot = pure translate + invisible crossfade (`width/height 13px→13px`), a convex group box CANNOT express a concave waist; single-VT-per-document monopoly on Safari 26 (no element-scoped VT) kills it under navigate()/rapid clicks; the house already retired VT layout-morph (`src/styles/view-transition.css:50-61`). No prototype owed — the probe is conclusive. |
| **codebase-truth** | **ADVANCE (folded)** | Not a competitor — the binding diagnosis + scope. Its problem split (§0), retire list (§6), a11y owings, and deck non-regression fence bind BOTH advancing families. |

**The leading composition (hybrid — both parents independently developed):**
**PAGER-B's driver ⊕ PAGER-A's scoped paint.** One two-edge driver (spring/damped lead +
critically-damped trailing follower, interruptible, one rAF, zero per-frame
`getComputedStyle`) feeding ONE worm chassis whose PAINT ARM is pluggable and is decided by
the pass-2 waist bake-off on real Metal WebKit. The KISS fall order for the paint arm,
decided by measurement not taste:

1. **Filtered worm-only goo** (A): 3-mass barbell under a correctly-scaled
   `#pager-worm-goo` (σ≈4, matrix 18/−6 → single-body peak 0.72 > 0.33) — the true smooth
   throat.
2. **Clip-path-only barbell** (codebase-truth): the `#pager-neck-throat`
   objectBoundingBox clip carries a structural waist with NO filter — maximally
   Safari-safe. If the filter adds nothing perceptible over this at 13px, drop it.
3. **Dumbbell-shoulder** (B): bridge `scaleY(0.7)` between full-D caps — a faceted
   filter-free concavity.
4. **Degenerate single-mass elongating capsule** (A's honest floor / B's stadium): if NO
   waist reads at 13px, the dot register ships the same engine's single-mass mode and the
   true barbell is reserved for hero/plate scale where the waist reads.

All four are renderings of ONE geometry source (`gooBarbellGeometry.ts` /
the two-edge lead-trail model — see gap G1/G2); the chassis (bed, buttons, keyboard,
windowing, PRM, drag-scrub) is IDENTICAL across arms.

---

## §2 The fixed spine (shared by every surviving arm — settled, pass 2 builds on it)

1. **Three-layer split** (`src/components/custom/pager-dots/PagerDots.vue`):
   - **(a) BED** — N crisp plain CSS circles (`border-radius:50%`,
     `--pager-dot-size` ≈ 13px, `--pager-dot-inactive`), **NO filter, ever**. The active
     bed pip dims (~0.35) under the worm. The bed can never smear by construction.
   - **(b) WORM** — a separate presentational group holding ONLY the indicator masses
     (`aria-hidden`, `pointer-events:none`), translucency applied ONCE at the layer
     (opacity 0.65 wrapper over opaque-ink shapes — the dark-lens-at-seams preventive).
     The filter, if the filtered arm wins, scopes to THIS group only (~40×20px region,
     snug pad — not the 170×34 whole layer at 4× region).
   - **(c) INTERACTION** — the transparent 24px `<button>` grid, byte-kept
     (role=tab/tablist + `aria-selected` for `pattern="tabs"`; role=group + `aria-current`
     for `pattern="group"`/DeckPager; per-dot `aria-label`; `.focus-ring`;
     focus-recovery on window recompute) **PLUS the owed roving tabindex**: exactly one
     tab stop, axis-derived Arrow keys (horizontal ⇄ vertical), Home/End, wrap,
     disabled-skip — the SegmentedTabs contract mirrored.
2. **Filter decoupled from the bed** — the structural insight all of A/B/C/codebase-truth
   converge on. σ is then tuned purely for the always-close worm masses and can never
   merge the bed. Matches the Google-worm reference: the worm is a self-contained liquid
   entity riding ON a static rail.
3. **Drag-scrub** — embla `scrollProgress() × lastIndex` drives the worm continuously
   during pointer drag (finger-follow liquid, the edict's core); click/keyboard drives the
   discrete travel. The seam exists (`usePagerWorm` `drive(fractionalIndex)` /
   `spring.target = interpolatedCenter(...)`) — wiring it is the carousel win.
4. **Retire the 1.8s clock.** Either ~0.42s on the kept `linear()` dwell (A) or the
   spring's own settle (B). Release-at-arrival becomes EMERGENT under the two-edge driver
   (the trail catching the lead) — no timer.
5. **PRM (motion-canon P6):** worm coalesces to ONE body, snaps to the target with zero
   in-between frames (`--stretch` stays 1, filter dropped/`display:none` on the filtered
   arm), only the fade survives. Bed static. Autoplay already PRM-gated + pauses on
   pointerenter/focusin (kept — WCAG 2.2.2).
6. **Volume squish via `useLiquidFlex`** (ONE squish law library-wide), capped LOW —
   re-register from the current 1.45 taffy value to the tab-indicator ~1.08–1.2 band.
7. **Carousel content = crisp weighty embla scroll.** `CarouselContent.vue` becomes a
   clean viewport + track; a heavier embla `duration` gives programmatic/dot scrolls
   inertia (drag already has momentum); OPTIONAL compositor-only arrival
   (`scale(0.965→1)` + opacity off `scrollProgress`, clipped inside the viewport, no
   filter). Peek/multi-item scrollers compose `<FadingScroll>`. Zero filter dependency on
   content — the 559px escape class is structurally unreproducible.
8. **Carousel page rebuild** (`demo/stories/navigation/carousel.vue`): §1 hero single-card
   glass scroller over a real substrate (`<ShowcaseFrame tier="field">` — the glass
   `.glass-pager-ring` must read over content, not a flat page) with the worm focal;
   §2 multi-item peek scroller + FadingScroll edges; a HERO-SCALE worm exhibit (larger
   dots/wider pitch where the metaball waist unambiguously reads); a VERTICAL-orientation
   exhibit (the axis exists); a WINDOWED exhibit (12+ slides, `windowFit=7`) proving
   pagerWindow + the worm re-seating across a clipped edge (nextTick after window
   repaint); ONE pager per exhibit — the absolute `-bottom-6` overlapping second pager and
   the competing side-by-side pager/counter are gone; the one-way `:active` binding moves
   to `v-model:active` (embla `selectedScrollSnap()` stays the authority via the existing
   `previousScrollSnap` delta guard).
9. **Honest degrade, no masking:** the `@supports not (filter: url(#x))` floor (filtered
   arm only) renders the un-merged barbell with the clip-path structural waist — a
   visible, honest partial, never an empty pill. The filter-free arms need NO gate at all.
   No-JS/SSR floor: a CSS-only `[data-active]` solid pip at its slot; the worm seats on
   mount.

---

## §3 Family mechanisms (as advanced)

### PAGER-A — the repaired goo worm (paint arm 1)

- Mount `#pager-worm-goo` `{ blur: 4, slope: 18, offset: -6 }` via `GooFilter.vue`
  `LIBRARY_IDS` (or the `extra` prop); region tightened from `-50%/200%` to a snug pad.
  Keep the graph static per WebKit bug 283156 (no var()-driven per-frame re-blur);
  `color-interpolation-filters="sRGB"` (bug 136418) — GooFilter already encodes both.
  Regular `filter: url()` on HTML is WebKit-supported; only `backdrop-filter: url()` is
  rejected (bug 245510) and is never used.
- `.pager-dots { --pager-goo-filter: url(#pager-worm-goo) }` scoped to the worm group.
  `#pager-goo` (plate scale) survives only if a plate consumer keeps it (see §6).
- The barbell projection (`projectBarbell`: `sep(p)=1−bell(p,1)(1−neckGap)`,
  `neckGirth=bell(p,1.5)`, volume-preserving squish, overlapping-action arc) is SOUND —
  kept byte-for-byte, re-pointed onto the worm-only group. `morphSignatures.ts`
  `lateralNeck` row kept (kPeak IS the neck gap).

### PAGER-B — the filter-free FLIP worm (paint arms 3/4 + THE DRIVER)

- **Element model:** capLead + capTrail (fixed-D circles, translate-only — round at every
  worm length) + bridge (D×D rect, translate + scaleX — straight sides at every factor),
  same solid ink, caps painted over the bridge with ≥1px overlap, translucency once at the
  wrapper. Reuses `composeBodyTransform`/`composeNeckTransform` (girth=1) from
  `gooBarbellGeometry.ts` verbatim.
- **Driver:** ONE spring as the LEAD edge targeting `centerOf(active)` px; the TRAIL edge
  a critically-damped exponential follower computed inside the same subscription
  (`trail += (lead−trail)·(1−exp(−dt/τ))`) — ONE rAF, no second loop
  (proof:offscreen-pause discipline). Stretch = elongation fed to `useLiquidFlex`
  reciprocal `scaleY(1/stretch)` on the group. Direction-agnostic via
  `lo=min(lead,trail)/hi=max(...)`. **Interruption is free:** retarget re-seats
  `spring.target`; velocity carries; the worm redirects mid-flight (the iOS interruptible
  contract the CSS `--goo-t` transition restart cannot give).
- **Spring register:** reuse `dock` (0.68/0.64) or `snappy` — a new `--spring-worm` row
  only if the ≥2-consumer audit demands a distinct feel (prefer reuse; the no-new-spring
  fence).

### The hybrid (leading)

B's two-edge driver becomes the ONE driver for every paint arm: the filtered barbell's `p`
scalar derives from the normalized lead/trail state (or the two edges place the filtered
masses directly), so interruption, drag-scrub, and emergent release-at-arrival are
uniform across arms, and the per-frame `getComputedStyle('--goo-t')` style-flush + the
transition-restart interruption model are retired together — SUBJECT TO gap G2 (the
/pager keyframes/SCC question).

---

## §4 Open-gap register (convergence blockers — pass 2 must close each)

- **G1 — WAIST PERCEPTIBILITY at 13px (the family-deciding gap).** Does ANY arm produce a
  readable concave waist at dot scale on real WebKit? Binding probe: frame-series at
  p=0.5 for a 1-hop AND a 3–4-hop, flood-fill the silhouette → require ONE connected
  component with a real local-minimum waist (mid width < body width; codebase-truth bar:
  waist/body ≤ 0.45) while the 5 bed dots stay individually crisp. Decides the §1 fall
  order: filtered → clip-path-only → dumbbell → degenerate capsule. If the capsule wins at
  13px, the true barbell re-homes to the hero/plate-scale exhibit.
- **G2 — THE DRIVER's dependency legality.** Verify whether `/pager`
  (`src/components/custom/pager-dots/`) may bear `@mkbabb/keyframes.js` (is it
  root-barrel-reachable? the `--goo-t` design existed to stay engine-free). If kf is
  barred: the hand-rolled critically-damped integrator is the sanctioned escape (the
  `usePointerVelocityField` precedent — vue-only lerp, no spring engine). If kf is legal
  on the subpath: `useSpring` directly. Either way the two-edge model stands; only the
  integrator source changes. This gap gates the hybrid.
- **G3 — THE FILTER NUMBERS + the Metal raster budget (filtered arm only).** A says σ=4 /
  18/−6 on a new worm-only id; codebase-truth says σ≈2.5 recalibrated with the clip-path
  carrying the waist. Lock the pair by measurement, AND capture the real-Metal-Safari
  filter-raster ms/frame over a 5-step autoplay loop (headless SwiftShader lies —
  W-REFLECT3; budget ≤4ms/frame, else tighten pad or drop σ).
- **G4 — DRAG-SCRUB continuity across gap boundaries.** A's `p`-normalization is per
  from→to span; B targets px space. A slow multi-dot finger drag must read 1:1 with no
  stutter at integer-slot crossings, AND the windowed rail must re-seat correctly when the
  window recomputes mid-drag (nextTick re-target on the repainted active center).
- **G5 — Overlap-seam translucency (filter-free arms).** At layer-opacity 0.65, verify no
  darker lens at the cap↔bridge join and at rest where the caps coincide
  (opaque-inside/translucent-wrapper), at several worm lengths; verify no sub-pixel
  bridge/cap gap at max windowed hop (scaleX ~8–12×) and that cap ovality under
  `scaleY(1/stretch)` reads as speed-squish, not broken ovals (cap ≤ ~1.2).
- **G6 — Interruption thrash.** Spam-click 0→4→1→4: with the two-edge model, when lead and
  trail cross near zero elongation does the worm flicker (collapse-then-regrow) or flip
  jarringly? Mitigations staged: low-pass elongation off distance-to-target, or clamp a
  minimum bridge length while |velocity| > threshold. (Filtered-transition arm has the
  dual failure: restart-on-interrupt — G2's driver replaces it.)
- **G7 — Embla round-trip single-source.** `v-model:active` (or emit-only), rapid-click +
  Next-hammering must always land the worm on `selectedScrollSnap()` with no double-write
  or dropped morph; pick the weighty embla `duration` number for the content register.
- **G8 — Deck/plate non-regression.** `motion/deck.vue` consumes `#glass-goo` (deck-goo)
  and the carousel-plate/deck-plate morphs share `useGooMorph`. The pager's worm-only
  scoping + any `#pager-goo` retire/retune must not regress them; the deck's own
  full-plate barbell is the SAME category error as Defect 2 but is the motion family's
  call — out of this charter, fence recorded. `DeckPager.vue` inherits the pager fix with
  zero edit (the ≥2-consumer bar by construction); slides' local DeckPager imports nothing
  from glass-ui's pager — no sibling edit owed.
- **G9 — Multi-pager style-recalc cost (only if the `--goo-t` read-back survives G2).**
  6 driven pagers on one route: Performance trace of the per-frame
  `getComputedStyle` forced style-reads; if hot, the spring driver resolves it by
  construction.
- **G10 — Hit-target + exemption record.** 24px meets WCAG 2.5.8 AA; below the house 44px
  floor but dot pagers are the recognized spacing-exempt case. Decide: pad buttons to
  ≥28px without moving the painted pip; document the deliberate exemption; confirm
  effective spacing keeps targets ≥24px.
- **G11 — Content-morph expectation check.** The "morph blob and meatball" feedback was
  mis-read as a full-card melt (Defect 2). Present the crisp-content + indicator-goo
  build; if the user genuinely wants card-melt, it becomes a SCOPED, viewport-CLIPPED,
  opt-in successor — never the page-bleeding default.

---

## §5 Pass-2 prototype slate

- **P1 — THE WORM CHASSIS BAKE-OFF** (proves PAGER-A vs PAGER-B core risk = G1, G3, G5,
  G6). One demo-private route mounting ONE shared chassis (unfiltered bed + 24px button
  layer + roving keyboard + the two-edge driver + a fake-embla drag slider) with FOUR
  pluggable paint arms: (a) filtered 3-mass barbell under `#pager-worm-goo` σ=4/18/−6,
  (b) clip-path-only barbell, (c) dumbbell-shoulder girth<1, (d) clean stadium/capsule.
  CAPTURES, both modes, Chrome AND real Metal WebKit: 40-frame travel series (1-hop +
  4-hop) with flood-fill connected-component + waist measurement; bed-crispness check;
  Safari filter-raster ms/frame trace (arm a); overlap-seam zoom at 3 lengths (arms c/d);
  max-stretch/max-hop silhouette; PRM snap (zero elongated frames); spam-click
  interruption trace. Deliverable: the measured go/no-go picking the paint arm + the tuned
  register (σ/matrix or girth, spring row, stretch cap, trail τ).
- **P2 — THE DRIVER A/B** (proves G2, G9). The `--goo-t` CSS-transition read-back drive vs
  the spring/hand-rolled-integrator drive on the SAME paint arm: jank comparison
  (6-pager trace), mid-flight re-click feel (velocity continuity vs restart), and the
  /pager dependency-legality verdict (kf vs hand-rolled integrator).
- **P3 — THE CAROUSEL REBUILD** (proves G4, G7, G11 + Defect 2 kill). Strip
  `useCarouselWorm` from `CarouselContent.vue`; weighty embla `duration` + optional
  compositor arrival scale; the rebuilt `/navigation/carousel` page (hero + peek +
  hero-scale worm + vertical + windowed-12 exhibits, single pager per exhibit,
  `v-model:active`). CAPTURES: full-page screenshot proving ZERO paint outside the card
  (the 559px-escape regression test), the drag-scrub multi-gap frame series, the
  rapid-click authority test, PRM run.
- **P-C (BANKED, not built):** the canvas field-cost sweep (rail width × node count vs
  16.7ms) runs ONLY if a continuous-mercury rail surface enters scope.
- **P-D: none.** The VT rejection is already empirically conclusive; no pass-2 spend.

---

## §6 Retire list (clean break, no alias)

- `src/components/ui/carousel/composables/useCarouselWorm.ts` — DELETED.
- In `CarouselContent.vue`: `.carousel-goo-layer` + `.carousel-goo-body/-neck` +
  `#carousel-neck-throat` clip + the `.carousel-content-root::before` cartoon-cast +
  the carousel's `#glass-goo` reference — DELETED.
- `--carousel-goo-flow/-duration/-max-stretch` (`src/styles/tokens/scheme-spring.css`) —
  DELETED.
- The whole-layer pager filter (`.pager-goo-layer { filter: … }` over the bed) — the bed
  is never filtered again.
- `--pager-worm-duration: 1.8s` as a value — retimed or replaced by the spring settle
  (which one is G2's outcome; if the spring wins, the `--pager-worm-flow` linear() +
  duration tokens retire too).
- IF the filter-free or clip-path-only arm wins G1: the pager's `#pager-goo`/
  `#pager-worm-goo` reference retires; the id itself survives only for live plate
  consumers (G8 fence).
- IF PAGER-B's driver wins outright at the paint level too: the pager's use of
  `useGooMorph` retires FOR THE PAGER ONLY (`useGooMorph` + `gooBarbellGeometry` stay —
  carousel-plate/deck-plate consumers, G8).
- Doc drift: `src/components/custom/pager-dots/README.md` is STALE (describes 6px/24px
  dots on `--spring-dock`; HEAD is the 13px barbell on `--pager-worm-flow`) — reconciled
  with whichever arm ships.

**KEEP regardless (named, sound):** `gooBarbellGeometry.ts` (ONE geometry source),
`useLiquidFlex.ts` (ONE squish law), `pagerWindow.ts` + `windowFit` (untouched oracle),
`constants.ts`, the `--pager-*` token block + `.glass-pager-ring`
(`src/styles/glass/surfaces.css` ~447), the button interaction layer + focus-recovery,
`DeckPager.vue` (zero-edit beneficiary), embla via `useCarousel.ts` +
`Carousel/CarouselItem/CarouselPager.vue`, `GooFilter.vue` as the ONE `<defs>` mount.

---

## §7 Design-quality bar (binding on every pass-2 artefact)

- **Warm identity:** worm ink = `--pager-dot-active` (= `--foreground`), bed =
  `--pager-dot-inactive` (52% mix) — no new hues, both modes AA by construction
  (W-DARK-MATERIAL / W-NO-GRAY registers ride through the tokens).
- **Compositor-only (P5):** transform/scale/opacity/clip-path/filter only; never an
  animated layout property; `proof:no-layout-animation` holds; the worm layer keeps
  `contain: layout paint; isolation: isolate`.
- **PRM (P6):** one body, deterministic snap, fade survives, bed static, autoplay off.
- **Safari-honest:** the binding numbers come from real Metal WebKit (W-REFLECT3 —
  headless SwiftShader lies). Regular `filter:url()` is the supported primary;
  `backdrop-filter:url()` never; no `ctx.filter` fork (PAGER-C's law); static filter
  graphs (bug 283156); `color-interpolation-filters="sRGB"` (bug 136418).
- **No masking fallbacks:** the primary paints or fails loud. The current empty pill IS
  the forbidden class; the `@supports` floor renders a VISIBLE honest partial (un-merged
  clip-path barbell), and the filter-free arms need no gate at all.
- **Clean breaks:** §6 executes wholesale — no alias, no dormant stub, no half-delete
  (the symmetric-closure discipline; a broken-reference half-delete REDs the same as a
  stub).
- **KISS/DRY:** ONE geometry source, ONE squish law, ONE driver, ONE `<defs>` mount, one
  pager per exhibit; if a mechanism adds nothing measurable at 13px (the filter over the
  clip-path, the barbell over the capsule), it is dropped at that scale — measured, not
  assumed.
- **Gestalt:** the goo-morph energy concentrates on the INDICATOR (the correct read of the
  edict); content stays crisp with weight in the scroll; the hero-scale exhibit is where
  the full metaball vocabulary performs.
