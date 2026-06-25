# BG audit — A: the MOTION / ANIMATION system (KISS/DRY + 12-laws coverage)

Auditor pass over the motion spine at HEAD (4.2.0). Verified against real source
(Read/Grep/Bash). Default-broken skepticism applied. The motion *foundation* is
genuinely good — ONE spring table, ONE generator, the per-spring clock, the
compositor-only discipline are all real and correct. The PROBLEM is the layer ABOVE it:
a sprawl of overlapping morph/reveal/press primitives, three-to-four parallel dock-morph
engines that don't share code, two dead primitives, and a route-transition contrivance
that is the confirmed linchpin freeze.

---

## FINDINGS (what is actually true at HEAD)

### F1 — The route-transition layer is the routing-freeze linchpin (defect #1, confirmed)

`demo/layout/AppShell.vue` L404-476: ONE `<Transition name="fade-slide">` wraps THREE
branches with DIFFERENT root element types — `<component :is="Component">` (the page),
a `<div class="section-landing-skeleton">` (the pending placeholder), a `<Card>` (the
no-match guard). The entering page root is `<article class="scroll-build …">`
(`demo/stories/StoryPage.vue:72`).

Two clocks fire on the same entering element at once:
- the `<Transition>` applies `.fade-slide-enter-active` → `transition: opacity …,
  transform …` (`src/styles/transitions.css:23-27`) on the `<article>`;
- the `<article class="scroll-build">`'s children get `animation: gl-page-build …`
  (`src/styles/scroll-choreography.css:115-127`), a MOUNT keyframe-animation.

Vue's `<Transition>` auto-detects type from the root's computed style. With a
`transition` on the root AND `animation`s underneath (and the three-branch
heterogeneous-root structure), the leave hook can fail to resolve — the orchestrator
reproduced exactly this (URL changes, old page never unmounts, `<main>` childCount 2→3).
Compounded by:
- the **bloom-find-first-non-skeleton-child hack** (`AppShell.vue:274-303`): a
  `watch(route.fullPath)` that on nextTick does
  `[...main.children].find(c => !c.classList.contains('section-landing-skeleton'))` to
  guess the entering content element — a DOM-introspection contrivance that only exists
  because the `<Transition>` machinery is being fought, not used (the comment admits it
  is "avoiding a JS `@enter` Transition hook").
- **TWO no-op `startViewTransition` watchers** (`AppShell.vue:212-228` category-switch +
  the morph-stage watcher): the category-switch body is *explicitly* a no-op
  (`L223-225`: "The body is intentionally a no-op write — the route reactivity IS the DOM
  delta the VT captures"). A `startViewTransition` whose callback mutates nothing wraps
  the whole route reactivity in a snapshot/replay it never needed — overhead + another
  surface for the freeze.

`useViewTransition.ts` itself is a clean, correct ~20-LOC native wrapper (not the bug —
the no-op USAGE is).

### F2 — FOUR independent dock-morph engines; none share code (the central contrivance)

The V↔H / collapse morph is implemented FOUR times, by four different mechanisms, each
claiming to be "the one engine":

1. **`dockMorphContext.ts`** (collapse/expand) — its own `new SpringProgress(DOCK_SPRING)`
   writing `--dock-morph-t` (`L3,5,125,176`). The real dock collapse engine.
2. **`useDockOrientationMorph.ts`** (V↔H, 0→1 scalar) — ANOTHER
   `new SpringProgress(DOCK_SPRING)` writing the SAME `--dock-morph-t` +
   `useLiquidFlex` (`L33-41`). The real V↔H driver.
3. **`useMorphField.ts`** (468 LOC) + **`useGooMorph.ts`** (460 LOC) — the "ONE
   blend/morph WELD primitive every morph animation in the library consumes"
   (`useMorphField.ts:1-2`). Its `MORPH_SIGNATURES` map *explicitly* names `collapse`
   and `axialNeck` "dock V↔H" signatures (`L135-150`). **Neither dock engine imports
   `useMorphField`** — verified: `grep useMorphField src/components/custom/dock` →
   only `useDockFission.ts`. The dock's real morph (1+2) is a `--dock-live` convex blend
   in `layers.css`, NOT the weld. So `useMorphField` is a parallel morph theory the dock
   never adopted; its only live consumers are `GooFilter.vue` and `useDockFission.ts`.
4. **`useLiquidMorph.ts`** (462 LOC) — the "GENERALIZED liquid framework … the dock V↔H
   is the SPECIAL case; this engine is the GENERAL case" (`L54-62`). **ZERO real
   consumers** — verified: the only reference is prose in `demo/stories/manifest.ts:883`;
   no `.vue` mounts it. A 462-LOC dead primitive describing itself as the generalization
   of a morph it never drives.

### F3 — The FLIP-reveal family is three near-duplicate hand-rolled rAF runners

`useLiquidReveal` (285 LOC), `useBloomUp` (507 LOC), `useDockCtaReceive` (349 LOC) each
import `ElementMorph + springTimingFunction` and each hand-roll the IDENTICAL rAF loop:
`springPreset(name)` → `springTimingFunction(...)` → `morph = new ElementMorph(rectA,
rectB)` → a `step(ts)` rAF that writes `morph.apply(el, t)` + `el.style.opacity` +
`el.style.filter = blur(...)` + the same `clearTransform`/`cancelRaf` teardown
(`useLiquidReveal.ts:155-260` vs `useDockCtaReceive.ts:185-300`). They differ ONLY in:
drive direction (1→0 reveal vs 0→1 receive), which rects are source/dest, and the blur
sign. `useBloomUp` adds a 4th color channel; otherwise byte-shape-identical (its own
header at `L246` says "byte-shape with useLiquidReveal").

The kf `flipShared` published FLIP runner is imported in `suite.ts:42` and **never
used** — the exact primitive that would unify these three. `useCelebrationBurst.ts:138`
is a fourth `springTimingFunction` rAF consumer.

Consumer reality (verified): `useLiquidReveal` has 1 real SFC consumer
(`motion/reveal.vue`); `useDockCtaReceive` has 1 (`dock/cta-receive.vue`); `useBloomUp`
has ~7 dock-example consumers + `useDockContextSilhouette`. So `useBloomUp` is load-
bearing, the other two are nearly demo-only — yet all three carry the full rAF runner.

### F4 — The press/mount family overlaps the reveal family

- `useSpringPress` (106) → `useLiquidPress` (222, wraps press + `useLiquidFlex`) — 1
  consumer (`Card.vue`). `useSpringPress` direct: Button, ScrubberTimeline, Card.
- `useSpringMount` (210) — the Dialog/Sheet `spring` opt-in entrance, its OWN
  spring-driven enter state machine. But the Dialog DEFAULT enter is the `.glass-reveal`
  CSS recipe (`DialogContent.vue:140`), and the `spring` opt-in is `useSpringMount`
  (`L14`) — so a dialog has TWO enter mechanisms (CSS `.glass-reveal` + JS
  `useSpringMount`), and `useSpringMount`'s bloom overlaps `useLiquidReveal`'s bloom.
  Three ways to bloom a top-layer surface in (`.glass-reveal`, `useLiquidReveal`,
  `useSpringMount`), all spring-clocked, all coupled-channel.

### F5 — Spring register sprawl: 9 presets, with 3 hyper-specific timeline rows

`SPRING_PRESETS` (`springPresets.ts:75-130`) has NINE rows: `smooth snappy bouncy gentle
dock press` + `timeline-head timeline-fill timeline-press`. The three `timeline-*` rows
exist for ONE consumer (`ScrubberTimeline.vue`) — a per-component register table folded
into the global source. The canon's own rule (`motion-canon.md` P7) is "the
`SPRING_PRESETS` is the ONLY hand-authored register table" and the four `(response,ζ)`
defaults are documented per-primitive — but three timeline-specific rows in the GLOBAL
table is the "≥2 unsanctioned rows in one file" smell the canon warns against, applied to
a single surface. This bloats the generated CSS (9 `linear()` curves + 9 duration
clocks) and the `MOTION_CURVES` table.

### F6 — Documentation drift in the spring source (minor, but a correctness trap)

`scheme-spring.css:26-31` documents the spring values as `smooth (0.50, 0.86)`, `snappy
(0.42, 0.78)`, `bouncy (0.50, 0.55)`, `dock (0.56, 0.58)`, `press (0.15, 0.86)` — these
are the PRE-BD-tune values. The LIVE `springPresets.ts` values are `smooth (0.58, 0.8)`,
`snappy (0.48, 0.74)`, `bouncy (0.6, 0.6)`, `dock (0.68, 0.64)`, `press (0.2, 0.8)`. The
generated `linear()` curves + durations ARE fresh (the generator reads springPresets.ts
— I verified the durations: smooth 0.45s, snappy 0.4s, dock 0.66s all match the CSS
tokens). So only the human-readable comment block drifted — but it is the comment a
future tuner reads first. `useSpringPress.ts:489` similarly claims "old hand-defaults
(0.25/0.7)" while the press row is now (0.2, 0.8); `useDragMorph.ts:345` claims
`snappy = (0.35, 0.65)` while snappy is now (0.48, 0.74). Stale prose, live values.

### F7 — The V↔H morph SHIPS TWO CONTRADICTORY MODES (defect #13)

`demo/stories/dock/morph-showcase.vue:13-22` declares the crossfade DEAD: "the crossfade
DIES … the continuous metaball teardrop is now the SHIPPED DEFAULT … there is ONE mode,
the weld." But `demo/layout/AppShell.vue:76,104-110` (the in-situ shell morph) STILL
ships "the §7-shipped VIEW-TRANSITION crossfade is the default register. The perf-gated
liquid teardrop … is the optional preview … OFF by default." The two V↔H surfaces
disagree on which mode is default. And the AppShell shell morph is a Dialog-rooted MODAL
demo (`DialogDescription` import L8, a `morph-stage-fade` Transition L497) — exactly
defect #13: "a modal demo, esc doesn't work; should be a BUTTON IN THE DOCK that morphs
in place." It is not in-dock and not in-place.

### F8 — 12-laws-of-animation coverage map (the BD edict)

The BD edict (`GREENFIELD-HARDENING-PLAN.md:32-35`): "anticipation, exaggeration,
follow-through, overlapping action, arcs, squash & stretch with real WEIGHT and INERTIA
… universal." Coverage at HEAD:

| Law | Mechanism | State |
|-----|-----------|-------|
| Squash & stretch | `useLiquidFlex` tanh/linear squish; `--morph-squish` | REAL, ≥2 consumers |
| Anticipation | `--ease-cartoon-punch` (−4% dip before launch, `scheme-motion.css:196`) | REAL but NARROW — one raw token, no primitive plumbs it onto a state-change beat; only the morph-field reads it |
| Follow-through | morph specular-sweep lag (`useMorphField.ts:434`), spring overshoot | REAL via spring overshoot |
| Overlapping action | morph arc LOB (`useMorphField.ts:407`), stagger delays | REAL in morph; PARTIAL elsewhere |
| Arcs | morph cross-axis parabola (`useMorphField.ts:407`) | REAL only inside the weld |
| Slow in/out | the whole spring system | REAL (the strength) |
| Staging | `.scroll-build` / `.scroll-cascade` reading order | REAL |
| Secondary action | `useBloomUp` 4th color channel (field warms to source hue) | REAL but bespoke |
| Timing | per-spring duration clock | REAL (the strength) |
| Weight/inertia | `--motion-weight` governor (1/φ rest) + the lengthened BD springs | REAL, the headline |
| Exaggeration | `--ease-cartoon-punch` punch to 1.22 | REAL but narrow (see anticipation) |
| Appeal | the warm/liquid identity | DESIGN |

The laws are genuinely PRESENT — but concentrated inside `useMorphField` (arcs,
overlapping, follow-through all live in the weld) and the `--ease-cartoon-punch` token
(anticipation/exaggeration). Because the dock morph doesn't consume the weld (F2), the
dock V↔H gets NONE of arcs/overlapping/follow-through from it — it's a flat convex blend.
The "universal" application is the gap: the laws exist in primitives the live surfaces
(dock, route transition, most reveals) don't compose.

---

## ROOT CAUSES (gestalt, first-principles)

### RC1 — Every new morph "need" minted a new top-level primitive instead of a new
SIGNATURE/DIRECTION of one engine. `useMorphField` correctly identified the two atoms
(scalar drive + field weld) and the DATA-not-code-paths signature idea — then the tranche
kept shipping `useGooMorph`, `useLiquidMorph`, `useLiquidReveal`, `useBloomUp`,
`useDockCtaReceive`, `useDockOrientationMorph` ALONGSIDE it instead of THROUGH it. The
weld is the right abstraction; nothing was made to flow through it. Result: ~4000 LOC
across 12 morph/reveal/press files, two of them (useLiquidMorph 462, plus large slices of
the FLIP trio) redundant.

### RC2 — The FLIP-reveal trio is ONE inversion with three sign choices, not three
primitives. `ElementMorph(rectA, rectB)` + a spring sample + a 3-channel rAF step IS the
whole mechanism. reveal = drive 1→0 (settled←trigger), receive = drive 0→1
(own→foreign), bloom-up = 1→0 (dest←source) + a color channel. The published kf
`flipShared` already runs this loop; glass-ui imports it and ignores it, hand-rolling the
rAF three times.

### RC3 — The dock morph never adopted the weld because the weld landed AFTER the dock's
own `SpringProgress`/`--dock-morph-t`/`--dock-live` mechanism, and nobody re-pointed the
dock onto it. So the "ONE engine" claim is aspirational prose; the reality is 4 engines.

### RC4 — The route transition fights Vue's `<Transition>` instead of using it. A
mount-`animation` (`.scroll-build`) on the same element a `transition`-based
`<Transition>` is animating is the classic Vue type-detection trap. The fix is not more
machinery (skeleton-find-child, no-op VT watchers) — it is ONE coherent transition that
owns the in/out and lets the page-build be a property of the ENTERED state, not a
competing mount animation.

### RC5 — Per-component registers (the 3 `timeline-*` springs) leaked into the global
source table. The canon's own discipline (per-primitive documented defaults, NOT global
rows) wasn't applied to ScrubberTimeline.

---

## PROPOSED WAVES

### BG.W-ROUTE-TRANSITION-ONE — ONE idiomatic route transition; kill the freeze
- **Intent:** a single coherent, idiomatic Vue route transition; remove the freeze, the
  bloom-find-child hack, and the no-op VT watchers.
- **Approach:** keep ONE `<Transition>` over the `<RouterView>` with a SINGLE root element
  per branch (wrap the skeleton/Card guards so the transition root is always one stable
  node, or move them out of the transition). Make `.scroll-build` fire on the ENTERED
  state (`transition`-driven, or a `v-if`-gated entrance class set AFTER enter resolves)
  so it never competes with the leave/enter clocks — the page-build is the entered page's
  own choreography, not a mount animation racing the route swap. Delete the
  `[...main.children].find(...)` hack and both no-op `startViewTransition` watchers; if a
  category crossfade is wanted, drive it through the ONE route `<Transition>` (or
  `navigate(fn,{types})`'s real DOM mutation), never an empty-callback VT.
- **Files:** `demo/layout/AppShell.vue`, `demo/stories/StoryPage.vue`,
  `src/styles/scroll-choreography.css` (`.scroll-build` entrance contract),
  `src/styles/transitions.css` (the `fade-slide` recipe).
- **π bar:** live nav `/foundations/intro → /substrates` UNMOUNTS the old page
  (`<main>` childCount stays constant; heading updates same-frame); no `<Transition>`
  leave-hook stall; the page-build still plays on the entered page.
- **Folds:** confirmed defect #1 (linchpin) + #9 (page transitions broken).

### BG.W-MORPH-ENGINE-ONE — collapse the morph theory onto the ONE weld
- **Intent:** the library has ONE morph engine; everything morph-shaped flows through it.
- **Approach:** make `useMorphField` (the weld) the single morph spine. Re-point the dock
  V↔H + collapse onto it via the `collapse`/`axialNeck` signatures it ALREADY declares
  (the dock keeps `--dock-morph-t` as the drive `driveVar`, the weld owns the
  body/neck/arc projection) — so the dock V↔H finally gets arcs/overlapping/follow-through
  (F8). DELETE `useLiquidMorph.ts` wholesale (462 LOC, 0 consumers — the "generalization"
  the weld already is). Keep `useGooMorph` ONLY if it cannot be expressed as the weld's
  `lateralNeck` recipe; if it can, fold its 3 consumers (carousel/pager/deck) onto
  `useMorphField` + `lateralNeck` and delete it too.
- **Files:** `src/composables/motion/useMorphField.ts` (the spine),
  `useLiquidMorph.ts` (DELETE), `useGooMorph.ts` (fold-or-delete),
  `dock/composables/{dockMorphContext,useDockOrientationMorph}.ts` (re-point the drive
  onto the weld), `useDockFission.ts`, `CarouselContent.vue`, `PagerDots.vue`,
  `demo/stories/motion/deck.vue`.
- **π bar:** the dock V↔H reads as a LOBBING metaball teardrop with a real waist (the weld
  projection), not a flat blend; carousel/pager/deck goo unchanged visually; ZERO
  remaining `new SpringProgress` morph writers outside the weld's documented drive set;
  `useLiquidMorph` DEFINITION-ABSENT.
- **Folds:** RC1, RC3; the dock-morph KISS/DRY target.

### BG.W-FLIP-ONE — one FLIP-reveal runner over kf `flipShared`
- **Intent:** ONE shared-element FLIP runner; reveal/receive/bloom-up are directions of it.
- **Approach:** mint ONE `useFlip(source, dest, { direction, channels })` that composes
  the published kf `flipShared` (`suite.ts:42`, currently imported-and-unused) — it owns
  the rAF loop, the spring sample, the 3 coupled channels (scale/opacity/blur) + the
  optional 4th color channel. `useLiquidReveal` = `direction:"reveal"` (1→0,
  trigger→settled); `useDockCtaReceive` = `direction:"receive"` (0→1, own→foreign);
  `useBloomUp` = `direction:"bloom"` (1→0, source→dest) + `channels.color`. Replace the
  three hand-rolled rAF runners with thin direction-presets over `useFlip`; route
  `useCelebrationBurst`'s springTimingFunction rAF onto the same loop where it fits.
- **Files:** new `src/composables/motion/useFlip.ts`; collapse
  `useLiquidReveal/useBloomUp/useDockCtaReceive` to thin wrappers (or DELETE the two
  near-demo-only ones and expose `useFlip` directions directly);
  `useCelebrationBurst.ts`; `suite.ts`.
- **π bar:** all reveal/receive/bloom consumers paint identically to HEAD; ONE rAF FLIP
  loop in `src/`; `flipShared` is CONSUMED (no longer imported-and-dead);
  ~700 LOC removed.
- **Folds:** RC2, F3.

### BG.W-PRESS-MOUNT-RECONCILE — one enter, one press
- **Intent:** ONE top-layer enter path and ONE press path.
- **Approach:** the top-layer enter is `.glass-reveal` (CSS floor) refined by `useFlip`
  reveal (JS) — RETIRE `useSpringMount`'s separate bloom enter onto `useFlip` (keep its
  drag-dismiss state machine, which is distinct; route only the ENTER through the shared
  runner so a dialog has ONE bloom mechanism, not three). The press is `useLiquidPress`
  (wraps `useSpringPress` + `useLiquidFlex`); keep Button on `useSpringPress` direct (the
  B2 assert), Card on `useLiquidPress`, and land the dock control as the booked 3rd
  consumer so `useLiquidPress` isn't a 1-consumer wrapper.
- **Files:** `useSpringMount.ts`, `useLiquidPress.ts`, `useSpringPress.ts`,
  `dialog/DialogContent.vue`, `sheet/SheetContent.vue`, a dock control.
- **π bar:** dialog/sheet enter visually identical; ONE bloom code path for top-layer
  enter; `useLiquidPress` has ≥2 real consumers.
- **Folds:** F4.

### BG.W-VH-MORPH-IN-DOCK — the V↔H is a dock button, in-place, ONE mode (defect #13)
- **Intent:** remove the modal/crossfade variant; the V↔H is a button IN the dock that
  morphs the vertical dock into the horizontal in place.
- **Approach:** delete the AppShell Dialog-rooted modal morph-stage + the
  `morph-stage-fade` Transition + the VT-crossfade-default. Mount the morph control as a
  `<DockIconButton>` inside the real dock; drive `useDockOrientationMorph` (now re-pointed
  onto the weld per BG.W-MORPH-ENGINE-ONE) on the live dock in place. ONE mode: the liquid
  teardrop weld (the crossfade DIES everywhere, reconciling the F7 contradiction so
  morph-showcase and the shell AGREE). Esc/focus handled by the dock, not a Dialog.
- **Files:** `demo/layout/AppShell.vue` (delete modal stage), `demo/layout/{SidebarDock,
  BottomDock}.vue` (host the button), `demo/stories/dock/morph-showcase.vue` (already
  weld-only — reconcile), `useDockOrientationMorph.ts`.
- **π bar:** the dock morphs V↔H IN PLACE from a dock button, both directions, one liquid
  teardrop mode; no modal, no esc-dead overlay; morph-showcase and shell render the SAME
  mode.
- **Folds:** confirmed defect #13; RC3 (in-place reuse of the unified engine).

### BG.W-SPRING-REGISTER-TIDY — drain the timeline springs; fix the doc drift
- **Intent:** the 9-row spring table returns to the canonical 6; per-component registers
  live per-component; the source prose matches the values.
- **Approach:** move the 3 `timeline-*` `(response,ζ)` rows OUT of the global
  `SPRING_PRESETS` into `ScrubberTimeline`'s own documented per-primitive defaults (the
  canon's `SPRING_DEFAULTS_ALLOWLIST` mechanism, `motion-canon.md` P7) IF they cannot map
  onto an existing register; if `timeline-head≈snappy`, `timeline-fill≈smooth`,
  `timeline-press≈press` within tolerance, just re-point and delete the rows. Regen the
  tokens (3 fewer `linear()` + 3 fewer duration clocks). Update the STALE prose:
  `scheme-spring.css:26-31`, `useSpringPress.ts:489`, `useDragMorph.ts:345` to the live
  BD-tuned values.
- **Files:** `springPresets.ts`, `scheme-spring.css` (regen + comment), `ScrubberTimeline.
  vue`, `useSpringPress.ts`, `useDragMorph.ts`, `scripts/regen-spring-tokens.mjs` markers.
- **π bar:** `SPRING_PRESETS` ≤6 rows (or each extra row passes the per-component
  allowlist); generated tokens re-derive clean; no spring prose contradicts the live
  `(response,ζ)`.
- **Folds:** F5, F6, RC5.

### BG.W-12-LAWS-UNIVERSAL — make anticipation/arcs/follow-through reach live surfaces
- **Intent:** the 12 laws are not concentrated in one unused weld — they apply where the
  user sees motion (route build, dock, reveals).
- **Approach:** plumb `--ease-cartoon-punch` (anticipation+exaggeration) onto the
  STATE-CHANGE beats that earn it (the proportion fence: a topology flip, a celebration,
  a dock open — NOT every hover) via the unified engines (the weld's drive can read it;
  the FLIP runner can offer a `punch` direction). Ensure the route page-build
  (BG.W-ROUTE-TRANSITION-ONE) carries the coupled fade+rise+stagger (staging +
  overlapping). Because the dock V↔H now flows through the weld (BG.W-MORPH-ENGINE-ONE),
  it inherits arcs/overlapping/follow-through for free.
- **Files:** `useMorphField.ts`, `useFlip.ts`, `scroll-choreography.css`,
  `scheme-motion.css` (`--ease-cartoon-punch` consumers).
- **π bar:** the dock open + V↔H + a celebration each read with anticipation dip +
  follow-through; no everywhere-jitter (the NN/g overuse fence held); the laws are reached
  through the shared engines, not re-derived per surface.
- **Folds:** F8, the BD 12-laws-universal edict.

---

## SEVERITY ORDERING

1. **BG.W-ROUTE-TRANSITION-ONE** — the confirmed freeze; nothing else is reachable while
   nav is dead. HIGHEST.
2. **BG.W-MORPH-ENGINE-ONE** + **BG.W-FLIP-ONE** — the ~1100+ LOC of redundant/dead morph
   sprawl (useLiquidMorph dead, the FLIP trio duplicated); the KISS/DRY headline.
3. **BG.W-VH-MORPH-IN-DOCK** — confirmed defect #13, depends on the unified engine.
4. **BG.W-PRESS-MOUNT-RECONCILE**, **BG.W-SPRING-REGISTER-TIDY**, **BG.W-12-LAWS-UNIVERSAL**
   — coherence + coverage, lower risk.
