# KS-DOCK — the dock: the crown jewel

**Keystone spec (KS-B · motion + craft). Author: Fable. Date: 2026-07-01. HEAD `29f280c8` (tranche/BG).**
**Binding for the frozen plan waves (`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:72-80,98`):**
4.1 `W-DOCK-ENGINE-UNIFY` · 4.3 `W-DOCK-CUT` · 4.4 `W-DOCK-DECOMPOSE` · 4.5 `W-DOCK-FISSION-WIRE` ·
4.6 `W-DOCK-PERSISTENT-CUT` · 4.7 `W-DOCK-CAP-SCROLL-FADE` · 4.9 `W-SHELL-DOCK-DRY` ·
**4.10 `W-DOCK-INPLACE-MORPH` (VERBATIM-protected — this spec ELABORATES execution detail only)** ·
8.x `W-SIRI-DOCK-CAPABILITY` · 4.11 `W-DOCK-STORY-MODULARIZE` (F7).
**Research inputs (read in full, cited throughout):** `research/DOCK-sota.md` + `research/DOCK-corpus.md`.
**Converged substrate (binding, built on — never re-derived):** `BG-WS2-dock-convergence/SPEC-pass1-converged.md`
+ `SPEC-pass2-converged.md` · `BG-WS6-siri-capabilities/SPEC-pass1-converged.md` ·
`BD/greenfield/dock-core/GOLDEN.md` · `BD/greenfield/dock-fission/GOLDEN.md`.
**The wave SET is frozen. The protected set (`SYNTHESIS-PASS1.md §4`) is inviolable: WS2's dock band
near-verbatim, 4.10 verbatim, DOCK_SPRING frozen (R6 — NO retune, ever, without an explicit orchestrator
fence-lift), `proof:dock-engine` E4 (the LX.3 collapse-balloon lock) preserved.**

---

## §0 — The frozen-constant precision (disk truth, stated once)

The R6 fence is **NO RETUNE, EVER** — and the bytes it freezes are the **disk bytes at HEAD**:
`springPreset("dock") = { response: 0.68, dampingFraction: 0.64 }` (`src/composables/motion/springPresets.ts:101-104`,
the landed `BD.W-ANIM-IOS27-TUNE` weighty register), read through the single-source indirection
`DOCK_SPRING = { response: springPreset("dock").response, … }` (`dock/constants.ts:85-88`). The live gate
already locks exactly this: `proof-dock-engine.mjs:253` pins `DOCK_RESPONSE = 0.68` and E4
(`proof-dock-engine.mjs:440-513`) REDs on a forked literal OR a re-tuned preset row. The `{0.32, 0.7}`
literal that survives in plan prose (EXECUTION-PROGRESS row 4.1, the seed, both research files) is the
**F13-documented stale citation** the WS2 pass-2 spec HEAD-confirmed (`SPEC-pass2-converged.md:333-336`) —
`CLAUDE.md:679`, `docs/precepts/motion-canon.md:195`, `docs/precepts/tunable-anim.md:63` all still read
the pre-BD pair. Wave 4.1's IN-REPO reconcile is `CLAUDE.md:679` ONLY: `docs/precepts/` is a read-only
git SUBMODULE (`.gitmodules: submodule."docs/precepts".url = …precepts.git` — a separate repo a glass-ui
commit cannot touch), so the two precepts lines ride as a SUBMODULE-SIDE coordination ask (a precepts-repo
commit + a glass-ui pointer bump, the orchestrator's channel), never an in-wave edit. AND the reconcile is
**HELD until the orchestrator rules open question #1**: the `{0.32,0.7}→{0.68,0.64}` prose change edits
the protected set's own stated wording (SYNTHESIS §4 + the seed), and a unilateral correction of a
protected value without a fence-lift is exactly what the protected set forbids — disk-correct or not.
4.1's engine-unify builds regardless (the doc fix is a severable clause; it never blocks the wave).

---

## §1 — The hallmark delineated

> **The dock is glass-ui's protagonist: ONE glass mass that re-flows shape between contexts and never
> re-mounts.** A control cluster that collapses to a warm-cream circle and blooms open center-out; that
> flips vertical↔horizontal IN PLACE with the reflow hidden inside a goo neck; that splits transport off
> its core through a pinching metaball throat and re-merges on scroll-up; that fans facet chips in its
> gutter without moving its box; that grows its own search pill into a Siri island and retracts it — all
> on ONE orchestrator, ONE FLIP spine, ONE spring register, every frame compositor-only over a reserved
> footprint (CLS=0). The bar a stranger recognizes the library by is **liquid CONTINUITY**: not N
> independently-correct facilities but one living organism (the Apple-Music iOS-27 read,
> `BD/viz/fleet2/dock-sequence-hallmark.md`). The steady state is proven per node; the BG disease is the
> over-articulated SKELETON — 5 spring engines, a 711-line god-SFC, a dead 551-line silhouette, four
> busy-signals. KS-DOCK's verb is **COLLAPSE** (engine, module, signal) plus the ONE endorsed ADD (Siri) —
> which lands BEFORE the cuts (8.x→4.3), so the tree transiently GROWS ~600L before it shrinks
> (acknowledged; SYNTHESIS §1 sanctions it, and it repays itself: Siri composing `useDockSearch` is what
> lets 4.3 delete the silhouette clean) — with the identity — DOCK_SPRING, the ratio-free blend, the
> punch channel, 4.10 — untouched.

### The facility map (every facility delineated — the load-bearing/accumulated verdict)

**HALLMARK-LOAD-BEARING** (the crown-jewel set; each has an owning BG wave or is protected-landed):

| facility | the read | the ONE home | owning wave |
|---|---|---|---|
| collapse/expand morph | ratio-free `--dock-live` convex blend over a reserved footprint; `clamp(0,t,1)` size + overshoot routed to the orthogonal volume-preserving `--dock-punch-stretch` on `--ease-cartoon-punch` (~4% pre-dip / ~22% overshoot, RETURN-to-1) | `layers.css:72-79` · `dockMorphContext.ts:186-213` (BD.W-DOCK-CORE, landed) | PROTECTED (E4 locks it); 4.1 consolidates the driver |
| V↔H in-place morph | the REAL shell dock flips orientation in place; discrete topology flip occluded at the goo midpoint; leave-flow→bottom-bar landing | 4.10 spec (verbatim); `useDockOrientationMorph.ts` | **4.10 (tentpole)** |
| layers / contextual switching | `DockLayerGroup`/`DockLayer` multi-pane + switcher rail; axis-aware pane FLIP | `DockLayerGroup.vue:417` · `useLayerTransition.ts:385` (folded into `dockLayerFlip.ts` at 4.1) | 4.1 (M2 fold) |
| fission (split↔merge) | n-ary goo bud-off: island buds, neck wells→pinches→SNAPS, plate recoils; signatures as DATA (search=radial / media=lateral / nav=inward-merge) | `useDockFission.ts:604` · `fission-bridge.css:552` · `DOCK_SPLIT_SIGNATURES` (`useDockFission.ts:63-120`) | **4.5** |
| stack/rail-in-gutter | `<DockStack mode="stack"|"facets">` fans in the `.glass-dock-frame` gutter, box-INVIOLATE (`deltaW=deltaH=0`), per-facet `--glass-accent` rim | `DockStack.vue:238` · `railProjection.ts:133` (pure φ-math) | landed (BE); 4.4 census |
| Siri island | the dock's OWN search pill grows into the live-activity island; descend/morph/retract on `useDockSpring`; warm-dominant WebGL2 waveform | NEW — dock-colocated capability (§3.2) | **8.x** |
| selected-as-glass register | `--dock-control-active-bg` = `--glass-bg-floating` tier; `--dock-selected-accent` luminance-lift bar; NO brand-red on any interactive state | `dock-controls.css` (W-REGISTER-IOS) | PROTECTED |
| coarse-pointer scale + cockpit | ONE `--dock-scale` multiplier over the whole geometry cascade; `--dock-mobile-scale`/`--dock-coarse-scale` 0.78; `[data-preset="cockpit"]` 2.75rem + `--dock-label-ratio` | `dock/density.css` · `dock/overflow.css` (AZ.R5-TOKENS · BC.W-AX-DOCK-COCKPIT) | PROTECTED |
| a11y contract | presentational root (NO role, NO `aria-expanded` on root); `aria-expanded` on the TRIGGER; roving tabindex + axis-derived arrows on the rail; `max(…, --dock-control-floor)` 44px; 3-state `.is-active`/`.is-leaving` hit contract | CLAUDE.md dock-aria contract · `useDockState.ts` | 4.1 preserves; 8.x extends (`role="status"` island) |
| cap⇒scroll + soft edge | a capped axis IS a scroll axis (no opt-in); `useFadingScroll` soft edge; the lozenge guard is GEOMETRIC (`--dock-control-safe-inset` × 1.1 hover < cell) | `shell.css:291` · `overflow.css:62` (broken at HEAD) | **4.7** |
| shell nav-dock | ONE `useShellNavDock` under two thin SFCs; responsive swap stays a media query (⟂ the morph axis) | `demo/layout/SidebarDock.vue`/`demo/layout/BottomDock.vue` (duplicated at HEAD) | **4.9** |
| collapse hysteresis + click integrity | 60ms intent-dwell + edge-sweep recheck; mid-morph tap guard | `useDockState.ts:454` · `useDockClickIntegrity.ts:202` | PROTECTED; 4.1 re-points the busy read |

**ACCUMULATED** (recorded as fold-candidates for the successor-prune ledger — NEVER self-pruned; §3.4).

---

## §2 — SOTA grounding (the adopt/reject ledger — full citations in `research/DOCK-sota.md`)

1. **Interruptible transform-FLIP beats View Transitions for the dock morph** — Motion documents VTs as
   non-interruptible, interaction-blocking, poor at scale ([Motion · Layout Animations](https://motion.dev/docs/react-layout-animations),
   [animate-view](https://motion.dev/docs/animate-view)); GSAP Flip + Material ContainerTransform confirm
   the measure→invert→play discipline industry-wide. ADOPTED: this is direct evidence for 4.10's real
   morph replacing the VT-crossfade AND for 4.1's velocity-continuous re-seat. The unbounded per-swap
   ratio stays REJECTED — the ratio-free convex blend (`dock-core/GOLDEN.md:81-146`, live-spiked) is the
   bounded FLIP; E4 guards it.
2. **The topology limit is honest** — no platform interpolates a flex column→row silhouette (AX.W42);
   Apple hides exactly this reflow inside the `GlassEffectContainer` merge. ADOPTED: occlude ONLY the
   genuine mismatch at the goo midpoint; REJECT clip-path morphs fighting the limit.
3. **SVG metaball goo, Safari-first** — static `feGaussianBlur`→`feColorMatrix` graph, sRGB, regular
   `filter: url()` NEVER `backdrop-filter: url()` (WebKit bug 245510) ([CSS-Tricks · Gooey](https://css-tricks.com/gooey-effect/),
   [Animation Patterns · Metaball](https://animationpatterns.art/animations/gooey-blob-metaball-filter/)).
   ADOPTED — shipped correctly; 4.5 re-points wiring, the graph is byte-untouched. The concavity fact
   (a constant-cross-section `inset()` pinch can NEVER yield a waist — `dock-fission/GOLDEN.md §0`) is
   the 4.5 shape delta.
4. **iOS 26→27 scroll-directional chrome** — tab bars shrink on scroll-down, expand on scroll-up; iOS 27
   re-integrated Search INTO the tab row ([Apple Newsroom 2025-06-09](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/),
   [Macworld · iOS 27](https://www.macworld.com/article/3145504/ios-26-gave-us-liquid-glass-now-ios-27-will-make-it-fluid.html)).
   ADOPTED: scroll-fission (4.5) + the search-pill-stays-in-the-cluster reading (8.x). The Siri island as
   the live audio-reactive glass ornament ([Bee Bulletin · iOS 27](https://beebulletin.com/ios-27-wwdc-2026-new-features-siri-gemini-liquid-glass/))
   is the 8.x north-star; Apple's proprietary timing REJECTED — we drive on `useDockSpring`, our clock.
5. **WAI-ARIA toolbar roving tabindex + WCAG 2.5.5/2.5.8 floors** ([W3C APG Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/),
   [Adobe Spectrum](https://opensource.adobe.com/spectrum-web-components/tools/roving-tab-index/)).
   ADOPTED — mostly shipped; the KS hardening: the announce seam survives 4.1, the island is
   `role="status"`, the fission-carved transport keeps ONE rover (§4.5). `aria-expanded` on the
   presentational root stays REJECTED (axe `aria-allowed-attr`).
6. **Spring chrome in moderation** ([Heckel](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/),
   [Comeau](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)) — the
   driver-vs-observer carve made mechanical: DRIVER motions (collapse/expand, V↔H, fission, Siri
   descend) carry the cartoon punch on `--ease-cartoon-punch`; OBSERVER snaps stay calm on DOCK_SPRING,
   never bounce. A new dock spring is REJECTED (R6). Pointer-magnetism on dock controls REJECTED as a
   default (fights the roving hit model + the 44px floor).

---

## §3 — First-principles design (the greenfield loop on the contested questions)

### §3.1 — The `useDockSpring` engine-unify API (4.1): 5 `SpringProgress` → 1 driver on the frozen constant

Five raw constructions at HEAD: `dockMorphContext.ts:176` · `useDockItemDrag.ts:104-106` ·
`useLayerTransition.ts:259` · `useDockOrientationMorph.ts:204` · `useDockFission.ts:484`.

**Directions (≥3):**
- **(a) One shared singleton spring instance via DI** — all five callers share one live `SpringProgress`.
  REJECTED: the callers have two genuinely different lifecycles (fresh-per-episode morph vs the drag's
  lazy-persistent reused spring + rAF-keepalive, HEAD-confirmed `SPEC-pass2-converged.md:284-299`); one
  instance bleeds velocity across concerns (the `springEl` one-spring-per-container bleed).
- **(b) A `DockSpring` class re-implementing the integrator** — REJECTED: forks the kf engine; the
  no-second-engine law (`proof:motion-one-clock` PRONG A) and the boundary law (playback = keyframes.js)
  both forbid it.
- **(c) A TWO-SURFACE FACTORY** — `useDockSpring()` (NEW `dock/composables/useDockSpring.ts`, INTERNAL,
  off the `/dock` barrel) owning the ONE `new SpringProgress` construction SITE. **GOLDEN** — the
  build-proven F-ARM-5 shape (`SPEC-pass2-converged.md:282-311`: vue-tsc 0, build 0, exactly one
  construction at `useDockSpring.ts:111` in the proto):
  - **`playTo(from, to, { onFrame, onSettle })`** — the fresh-episode surface (the four morph callers +
    each drag fling): interruptible velocity-continuous re-base (a re-press mid-collapse reverses on the
    LIVE `(pos, vel)` — the iOS contract, Motion-confirmed §2.1), self-dispose-on-settle
    (`if (spring === s) dispose()` — the always-recreate semantics of `dockMorphContext`/`useDockFission`
    PRESERVED verbatim), `respectReducedMotion` synchronous seat (no 10×74 sliver).
  - **the lazy-construct guard** — the drag's lazy-persistent reused-spring + keepalive shape survives
    via the guard (a never-dragged surface constructs ZERO spring); NOT forced through `playTo`.
  - **parameterized `(response, dampingFraction)`** — the factory ACCEPTS the pair and READS
    `springPreset("dock")`/`DOCK_SPRING` at the call sites; it never re-types a literal (E4's
    single-source fence).
  - **`onFrame(value, velocity)`** — the analytic-velocity seam rides through (the F-ARM-1
    frame-rate-independent squish: peak stretch Δ=6.4e-5 between 60/120Hz, build-proven).
  - **NO `firstSeat` field-tick** — each site owns its pre-play seat as a direct style write (the
    contrivance that spuriously ticks the fission seam-tension field at `useDockFission.ts:519` is
    forbidden).

**Self-challenge:** does per-episode instantiation re-introduce five engines? No — the invariant is ONE
construction SITE, grep-locked (`proof:dock` orchestrator-single arm); instances are episodes, the
engine is single-sourced. Does the factory paper over the M2 orchestrator duplication? No —
`useLayerTransition.ts` is FOLD-AND-DELETED (its FLIP-measure deltas extract to a colocated
`dockLayerFlip.ts`; the drift-guard retires honestly because the second file is GONE). What breaks it:
gate drift — three gates grep the old construction sites (`proof:dock-morph-family` F3
`proof-dock-morph-family.mjs:237`, `proof:dock-fission` F1 `proof-dock-fission.mjs:76`,
`proof:dock-orchestrator-single`); all three re-point to FOLLOW the composition into the leaf,
born-RED→GREEN **in the same diff** (the BB.W-CARVE4 precedent) — a silent red is forbidden.

### §3.2 — The Siri island choreography as a DOCK CAPABILITY (8.x): the Dynamic-Island-docked-at-top reading

**Directions (≥3):**
- **(a) A published `<SiriIsland>` component + `/siri-island` subpath** (the WS6 pass-1 FILES-TOUCHED
  shape, `BG-WS6 SPEC-pass1-converged.md:346-386`). REJECTED — superseded by SYNTHESIS ruling #4: "augment
  the dock, NOT a new component"; no new subpath, no `api/` entry. The pass-1 subpath/api deliverable
  rows are STRUCK (open question #3 confirms the strike).
- **(b) The island as a fission PIECE** — reuse `useDockFission`'s island body (the `search` radial
  signature grows into the Siri surface). Seductively DRY, REJECTED as the primary mechanism: fission's
  island is a detached TRAVELING body on `--dock-split-t` with placement vectors + neck/recoil channels;
  the Siri island is a DOCKED standing surface with four FORMS and a content morph — forcing a √φ form
  ladder through `DOCK_SPLIT_SIGNATURES` contorts the data model. (The fission engine may still paint
  the BIRTH instant — see the golden's bud note.)
- **(c) The island IS the dock's own search pill, grown** — **GOLDEN.** The Dynamic-Island-docked-at-top
  reading: the top-anchored dock IS the island's home; Siri is not a component that lands ON the dock,
  it is the dock's "Search or Ask" pill (composing the EXISTING `useDockSearch`, `useDockSearch.ts:138`
  — ONE search pipeline, no second matcher) changing FORM. It mounts through the `.glass-dock-frame`/`#rail`
  non-clipping escape (`position: absolute` sibling — the DockStack precedent), **box-INVIOLATE**
  (`deltaW = deltaH = 0` across every form).

**The choreography (descend · morph · retract), concrete:**
1. **REST** — the pill sits in the dock as the search affordance. Its SEAT is reserved
   (`min-inline-size` off `--dock-control-size` — the `[data-cta-pending]` seat precedent) so no phase
   of the choreography ever moves the dock box. On a collapsed dock the pill collapses WITH the summary;
   a descend from collapsed anchors on the summary circle.
2. **DESCEND** — activation detaches the island from the pill rect via `useLiquidReveal`'s
   `ElementMorph` source-rect GEOMETRY driven by the `useDockSpring` curve (WS6 R1 — NOT a
   `preset:'dock'` arg, a type error; NOT Apple's undocumented timing). ONE scalar `--siri-island-t`
   (registered `@property <number>`, property-regs.css §18 — the `--island-t` name is a LIVE collision
   with fission, R8), three coupled channels (transform / opacity / `filter: blur→0`), warm specular rim
   lit during travel (composes `glass/rim.css`, keyed off `--siri-island-t > 0`). The blur-engage arm
   couples: `filter: blur()` on a wrapper of the REAL content's OWN pixels, OVERSIZED `inset:-24px`,
   two dim modes (GLOBAL `::backdrop` / LOCAL panel scrim) — NEVER an animated `backdrop-filter`
   (Safari snaps, R5), never `--siri-island-t` in a transition list.
3. **FORM MORPH** — four forms (`pill | droplet | stadium | panel`) as DATA (`SIRI_FORMS` in the dock
   `constants.ts`). The √φ claim is grounded to ONE dimension: the **BLOCK-SIZE alone** steps ×1.272 per
   form from the pill base (pill → droplet → stadium → panel = `h·√φ⁰..³`) — the growth cadence a viewer
   reads as proportion. Aspect and corner are per-form DESIGNED fields, NOT derivable from a scalar (a
   droplet ≠ a stadium by uniform scale): each row carries a designed `inline-size` (aspect = designed
   inline ÷ laddered block) and a corner law — `min(var(--radius-pill), block-size/2)` for pill/stadium
   (the capsule law) and a designed radius for droplet/panel. Proportion where a scalar can express it;
   designed form where it cannot. The box reserves the active form's `to` footprint (one layout solve);
   `transform: scale()` drives the visible size; `border-radius` interpolates on the CONTENT-CLIP layer
   (the visible-corner owner); content cross-fades under an `overflow: clip` aperture with OVERLAPPING
   windows (max-opacity ≥ 0.9 at every seat, NO `abs()`, NO blank frame — R4).
4. **RETRACT** — the exact reverse `ElementMorph` re-seating INTO the still-reserved pill seat; the
   dock never jumped, so the landing is a seat-reveal, not a reflow. Interruptible at every phase
   (velocity-carried re-base — a dismiss mid-descend reverses continuously).
5. **The waveform** — `SiriWaveform` DEMO-PRIVATE (the `useGlassBackdropLuminance` precedent; off every
   barrel until a real 2nd binary consumer): ONE WebGL2 GLSL pass on `useWebGLCanvas` (NO `.wgsl` — R3),
   warm-DOMINANT prismatic lens-flare splicing `procedural-color.glsl.ts` OKLab-RECTANGULAR (R7,
   huePath-0), push-API `level(0..1)` fed `tick(deltaMs)` from inside the substrate's frame loop (no own
   rAF), warm-white core default — cyan is a consumer preset (R7b, the teal-navy-purge arm). The island
   takes ZERO GL; the waveform is the route's one context.

**Self-challenge:** does the frame escape hold under `overflow`/`contain` churn? Yes by construction —
the `.glass-dock-frame` carries NO contain/backdrop-filter/overflow (the BC.W-DOCK-STACK-RAIL invariant);
the `proof:siri` dock-integration arm asserts the frame stays clip-free. Does a GLOBAL dim fight the
route's own top-layer surfaces? The GLOBAL mode rides the existing `dialog.glass-top-layer::backdrop`
modal-scrim seam (one scrim owner). A11y: the answer panel is `role="status"` + `aria-live="polite"`;
the mic affordance is the focusable control; the island is a SIBLING surface owning its own role — the
dock root stays presentational. PRM: `seatSync()` synchronous seat, calm static island, instant
descend/retract, waveform `tick(0)` freeze. What breaks it: 4.1 not landing first — the born-RED bite
(ZERO `new SpringProgress` in `useSiriIsland.ts` AND imports `useDockSpring`) stays RED until 4.1 lands;
the precond chain (8.x AFTER 4.1, BEFORE 4.3) is hard.

**Homes (the no-subpath shape):** `dock/composables/useSiriIsland.ts` (≤500L, internal) +
`SIRI_FORMS`/types in `dock/constants.ts` + `src/styles/dock/siri.css` (the form/dim/under-glow recipe)
+ `@property --siri-island-t` (property-regs.css §18) + `demo/` hosts `SiriWaveform.vue` +
`useSiriWaveform.ts` + `siri-waveform.glsl.ts` (demo-private) + the story `demo/stories/dock/siri.vue`
over `<DockStage>`, retiring the cloned `examples/DynamicIslandCall.vue`.

### §3.3 — The fission ≥2-consumer honest wiring (4.5): the 3rd-attempt tripwire is binding

**Directions (≥3):**
- **(a) Count HEAD's story bindings and declare the bar met** — `liquid-playground.vue`,
  `dock-gallery.vue`, `DockExampleTile.vue`, `examples/DynamicIslandCall.vue` all touch `:splittable`.
  REJECTED: binding without a live gesture/trigger path is shelf-ware (the audit's own "1 demo consumer"
  staleness cuts both ways); `DynamicIslandCall` retires at 8.x; a count of imports is exactly the
  vacuous-probe class the RESPEC audit condemned.
- **(b) RETIRE fission** (the dock-arch audit's cut). REJECTED — formally OVERRULED at M6
  (`SPEC-pass1-converged.md:210-217`): the claim was stale, the user explicitly names goo-fission core
  hallmark expressiveness, and a loud-requested landed engine is never blind-deleted (standing-risk #5).
  The RETIRE branch survives ONLY as the formal NDA-DECIDE fallback if the wire cannot reach paint.
- **(c) WIRE TWO REAL, TRIGGER-BEARING SFC CONSUMERS** — **GOLDEN**:
  1. **The LIVE shell nav-dock, scroll-driven** — compose the shipped `useScrollChrome`
     (`src/composables/motion/useScrollChrome.ts:110`, already live in `scroll-system.vue` +
     `dock-search.vue`) → `useDockFission` on the 4.9 `useShellNavDock` seam (opt-in `:fissionOnScroll`,
     the **media** lateral signature): scroll-down buds the transport triad
     `[Library●][◀player▶][●Search]` (the v3-dock-b 76-frame reference, `ANALYSIS.md:57-60` — "the
     single largest gap"); scroll-up re-merges. Direction-dwell hysteresis (the `useDockState` 60ms
     intent-dwell shape) so a scroll jitter never thrashes the split; PRM = discrete swap, zero neck frames.
  2. **`liquid-playground.vue` drag-to-split** — the existing `useDockItemDrag` drag-past-threshold
     COMMITS a split (the gesture IS the trigger; already wired `GlassDock.vue:373-430`).

**The machine tripwire (binding — this is the THIRD wiring attempt):** the `proof:dock` fission arm
counts SFC files that (i) bind `:splittable`/compose `useDockFission` in the TEMPLATE/script, AND
(ii) carry a LIVE trigger wire (a `useScrollChrome`→fission composition or a drag/press gesture path) —
**`< 2` REDs the wave, machine-fail, no prose waiver.** Born-RED at HEAD (the shell consumer does not
exist yet). The RETIRE branch, if taken, is the formal inv-11 registry-probed prune with
rationale+successor and the exports pruned in-diff — never a silent keep.

**The shape deltas the wire carries (the BD goldens folded, `dock-fission/GOLDEN.md §0-1`):**
(1) the HOURGLASS neck — replace both `clip-path: inset()` constant-cross-section pinches
(`fission-bridge.css:462` + `.dock-fission-piece::before`) with the static hourglass
`clip-path: polygon(…)` (throat `--neck-waist` 0.34) + the `--neck-girth` bell
(`GIRTH_FLOOR + sin(π·p)^1.5·SWELL`, orchestrator write) — it WELLS then PINCHES then SNAPS, never a
monotone fade (a constant cross-section mathematically cannot yield a concavity); (2) the dead V↔H
goo wire is 4.10's (F6 — do not double-own); (3) the filter DEFAULTS retune to the goo sweet spot
(`~10/~15/~−7`) as LITERAL defaults — the graph structure byte-untouched; (4) `railProjection.fadeMinAlpha`
floors off 0 so facet chips never fade to invisible. Drains ratchet rows `useDockFission.ts:604`
(→ a colocated `fission/` sub-dir carve) + `fission-bridge.css:552` (irreducible-cascade partial per its
`:127` note — carve what carves cleanly).

**Self-challenge:** does scroll-fission on the SHELL steal attention on every route? The gestalt fence:
the split is the content-focus move (the dock RECEDES into the triad — iOS-27's own scroll grammar);
one fission per scroll direction change, hysteresis-guarded, and the `proof:ba-gestalt`-class verdict
(alive-but-never-attention-stealing, §6) is the close bar. Does consumer #1 depend on 4.9? Yes — and a
prose "build-gated on 4.9" is NOT a precond the orchestrator's topological sort will honor: the cursor
lists 4.5's precond as "4.1" only, with NO 4.5←4.9 edge (EXECUTION-PROGRESS rows 75/78), so a sort
placing 4.5 before 4.9 leaves ONE consumer → tripwire `<2` → the born-RED-FOREVER failure this spec
condemns. **PRECOND-AMENDMENT FLAG (open question #4 — recorded for the orchestrator, never
self-applied; the wave set + preconds are frozen):** EITHER amend 4.5's precond row to `4.1 + 4.9
(shell arm)`, OR split 4.5 — the drag consumer + the shape deltas + the hourglass close first, the
shell scroll-fission arm lands as a 4.9-follower clause carrying the tripwire's second count. Until the
orchestrator picks, the ≥2 tripwire blocks 4.5's CLOSE (not its start).

### §3.4 — The facility map verdicts (the fold-candidate ledger — recorded, never self-pruned)

The hallmark set is §1's table. The ACCUMULATED set — each recorded for the ORCHESTRATOR's
successor-prune/fold ledger (the wave SET is frozen; none of these self-inserts a row):

1. **The BD dock-hub GOLDEN is UNBUILT and out-of-lane** — `useDockHub`/`DockExpand`/`--dock-portal-t`/
   the `envelop` goo-tear (`dock-hub/GOLDEN.md`): zero `src/` hits; overlaps F5 `W-MOTION-SPINE`'s ONE
   `ElementMorph` runner. Successor seed, not a BG row.
2. **The `DockSplitContext` enum de-overfit** — surface-TYPE branches in the PUBLIC shell
   (`GlassDock.vue:425,430` `if(ctx==="nav")`/`if(ctx==="media") dy*=0.25`; the dead `"search"` arm in
   the silhouette) — the behavior belongs in `DOCK_SPLIT_SIGNATURES` DATA. Candidate fold into 4.5's
   descriptor pass or the BH grammar band.
3. **`W-DOCK-TAB-INDICATOR`** — the v3-dock-b gap #2 (nav-dock liquid glide+squish indicator +
   per-glyph scale-pop + one-shot commit accent-flood, `ANALYSIS.md:52-55`). No BG home; candidate fold
   into a demo composition or a successor dock wave.
4. **`useDockItemDrag` second-consumer DECIDE** — one demo consumer at HEAD; the drag becomes
   load-bearing as 4.5's split gesture, but if the FISSION wire retires, the drag rides the same DECIDE
   (never a silent keep of an overfit primitive).
5. **`DockSection` consumer census** — the `display:contents` tripartite chassis (115L): 4.4 records its
   real SFC consumer count at the carve; `<2` books a successor DECIDE.
6. **`railProjection.ts` fold into `DockStack.vue`** — pure φ-math, single consumer; a file-count fold
   (KEEP the math; the fission cut/wire must not collateral it).

---

## §4 — Wave binding (the perfected per-wave specs; frozen ids, preconds untouched)

Family gate: **`proof:dock`** (the F8.1 family-table shape — the arms below are CASE ROWS in one gate,
not new scripts). Every [P] wave closes ONLY on real paint (both modes, Chromium AND WebKit — the
C-SAFARI cardinal bar, F-ARM-4) + a filed Fable gestalt PASS (F8.3).

### 4.1 `W-DOCK-ENGINE-UNIFY` [H] — 5 `SpringProgress` → 1 `useDockSpring`; 4 busy-signals → 1 `[data-morphing]`

- **Deliverables:** NEW `dock/composables/useDockSpring.ts` (§3.1's two-surface factory, internal);
  the five call-site re-points (`dockMorphContext.ts:176` · `useDockOrientationMorph.ts:204` ·
  `useDockFission.ts:484` · `useLayerTransition.ts:259` [deleted] · `useDockItemDrag.ts:104` via the
  lazy guard); FOLD-AND-DELETE `useLayerTransition.ts` → colocated `dockLayerFlip.ts` (the FLIP-measure/
  seatSync/deferReposition deltas; `DockLayerGroup` mints its own orchestrator over the leaf; assert the
  one-spring-per-container invariant the dropped `springEl` guard enforced); busy-signal collapse to the
  ONE orchestrator-owned `morphing` ref (M3 — kill the dead `@transitionend` wiring `GlassDock.vue:581-582`
  + `RESIZE_MORPH_PROPS` `constants.ts:95`; RETIRE `useDockMorphWindow.ts:118`); the F-ARM-1
  `(value, velocity)` plumbing (`--dock-morph-v = clamp(0,|v|/V_NORM,1)`, V_NORM the build-time analytic
  peak; `useLiquidFlex` additive `drive(t, velocity?)` overload, the no-velocity path BYTE-IDENTICAL);
  the F13 stale-doc fix (§0 — `CLAUDE.md:679` in-repo ONLY, HELD on open question #1; the two
  `docs/precepts/` lines are a submodule-side ask, never an in-wave edit).
- **Gate arms:** `proof:dock` orchestrator-single (ONE construction site, grep) + busy-single +
  **`proof:dock-engine [local,ci,release]` E4 PRESERVED byte-for-byte** (the LX.3 reds-on-revert lock) +
  the three gate-lockstep re-points (F3/F1/orchestrator-single) born-RED→GREEN in the SAME diff + the
  full `proof:*` suite run (never vue-tsc alone).
- **Fable/DS:** — (H wave). **Paint close:** the real-GPU paint-identity bar rides the wave's own
  non-authoring close — collapse + layer-swap byte-identical both modes; PRM synchronous seat (no 10×74
  sliver); a rapid mid-morph re-press frame-series with NO 1-frame scalar gap on the dispose+recreate
  lifecycle. **Preconds:** — (first in band).

### 8.x `W-SIRI-DOCK-CAPABILITY` [P] — the ONE endorsed ADD (after 4.1, BEFORE 4.3)

- **Deliverables (§3.2's golden — the no-subpath shape):** `useSiriIsland.ts` (composes `useDockSpring`
  + `ElementMorph` geometry; ZERO `new SpringProgress` — the born-RED bite) + `SIRI_FORMS` in
  `dock/constants.ts` (block-size √φ ladder + designed aspect/corner fields, §3.2) +
  `src/styles/dock/siri.css` + `@property --siri-island-t` (§18) + the blur-engage
  scrim (own-pixels `filter: blur`, OVERSIZED, two dim modes; ≥2-consumer bar met by the drawer
  detent-glass) + demo-private `SiriWaveform` (WebGL2-only, warm-dominant, push-API level) + the dock
  wire (the pill IS the rest form, composes `useDockSearch`; retires `DynamicIslandCall.vue`) + the
  reserved pill SEAT (box-inviolate at every phase).
- **Gate arms:** ONE **`proof:siri`**, FOUR arms — blur-engage (own-pixels, no animated
  backdrop-filter, transition-list clean) · island (√φ ladder, clip-aperture crossfade ≥0.9, reserved
  footprint, `useDockSpring`-composed born-RED bite) · waveform+teal-navy-PURGE (warm-white core
  default; `siri-waveform` constants enrolled in the purge scan) · dock-integration (frame-escape
  clip-free, `deltaW=deltaH=0`, ONE search pipeline, `role="status"`).
- **Fable/DS:** Fable: dynamic-island glass gestalt (the island bloom frame-series — descend, four-form
  morph, retract, the warm prismatic waveform) · DS: `/dock` siri capability over `<DockStage>`.
- **Paint close:** both engines both modes; the reference crops re-archived (R10) as the judge's ground;
  PRM = static island + instant seat; the island row joins the gestalt roster.
- **Preconds:** 4.1 (`useDockSpring` — HARD); runs BEFORE 4.3 (no silhouette reader survives).

### 4.3 `W-DOCK-CUT` [H] — the dead 551-line silhouette engine out

- **Deliverables:** DELETE `useDockContextSilhouette.ts:551` + its test + RETIRE
  `scripts/proof-dock-context.mjs` (341L) + its `gates.mjs` row; drop the dead companions
  (`DockSilhouetteDescriptor`, `DOCK_CONTEXT_LABEL` if reader-free); dock-side reader clearance verify
  (post-8.x: grep ZERO silhouette readers — the Siri capability composes `useDockSearch`, never the
  silhouette). Drains ratchet baseline #8.
- **Gate arms:** `proof:dock` context-absent (DEFINITION-ABSENT + zero-reader grep) + the a11y census
  rider (no rover orphaned by the cut — §2.5).
- **Fable/DS:** —. **Paint close:** n/a (source-absent wave; the demo builds green).
- **Preconds:** AFTER 8.x (frozen). **OWNERSHIP FLAG (open question #2):** the live cursor names 4.3
  SOLE owner ("10.5 must NOT double-own", EXECUTION-PROGRESS:73) while 10.5's own scope text still lists
  `useDockContextSilhouette`(+`AppSwitcher.vue`) (EXECUTION-PROGRESS:83). This spec binds the 4.3-owns
  reading (the dock-dir delete + companions HERE; `AppSwitcher.vue` rework stays 10.5's, its file);
  the orchestrator must strike the residue from one row before either builds — the target shape: 10.5's
  silhouette clause becomes a verify-ABSENT rider (greps ZERO, green), never a dead DELETE assert that
  REDs on nothing-to-delete.

### 4.4 `W-DOCK-DECOMPOSE` [H] — the 711-line god-SFC carved to leaves

- **Deliverables:** carve `GlassDock.vue:711` under the 500 bound along ENGINE seams with ONE WRITER
  each (the F6.5 contract — measure/spring/hit/reserve; never arbitrary line splits): the
  fission-registration + pointer-drag-split cluster (`GlassDock.vue:341-506` ≈165L) → colocated
  `composables/useDockFissionWiring.ts` (or absorbed into `useDockFission.registerPiece` — coordinate
  with 4.5); the touch-gate handlers (`GlassDock.vue:278-321`) → `composables/useDockTouchGate.ts`;
  absorb the 5.1 leaf-verify as a post-carve clause; design OUT the `containerName`
  `container-type: inline-size` morph-freeze footgun at `useDockShellProps.ts:241-265` (resolve the
  container-query subject without clamping — not a 6th re-documentation); the `dockContext`+`dockLayerContext`
  65L+53L merge into `dockContexts.ts`; record the `DockSection`/`railProjection` consumer censuses (§3.4).
- **Gate arms:** `proof:dock` ratchet-drain (baseline #2 → gone; the close state is
  `RATCHET_BASELINES == {}` for the dock rows with 4.5's) + colocation + the single-writer assert (each
  carved leaf owns its scalar; a second writer of `--dock-morph-t`/`--dock-morph-v` REDs).
- **Fable/DS:** —. **Paint close:** byte-identical paint before/after (a mechanical carve changes zero
  pixels — the BB.W-CARVE4 dist-byte discipline where the CSS moves). **Preconds:** 4.1.

### 4.5 `W-DOCK-FISSION-WIRE` [P] — the honest ≥2 wire + the hourglass shape (§3.3's golden)

- **Deliverables:** the two trigger-bearing consumers (shell scroll-fission via
  `useScrollChrome`→`useDockFission` on the 4.9 seam, `:fissionOnScroll` opt-in, media signature;
  `liquid-playground.vue` drag-to-split); the hourglass neck (`polygon()` throat `--neck-waist` 0.34 +
  `--neck-girth` bell) replacing both `inset()` pinches; the filter-default retune to `~10/~15/~−7`
  (LITERALS only — the graph byte-untouched, Safari-safe `filter:url()` preserved); `fadeMinAlpha`
  floor; the `useDockFission.ts:604` → `fission/` colocated carve + the `fission-bridge.css:552`
  partial carve (both ratchet rows drained; SOLE owner — R4); the fission a11y rider (the carved
  transport keeps ONE tab-stop group, not two rovers).
- **Gate arms:** `proof:dock` fission arm — **the ≥2-trigger-bearing-consumer TRIPWIRE (machine-fail
  `<2`, born-RED at HEAD; §3.3)** + hourglass-present (a re-introduced `inset()` neck REDs) +
  graph-byte-fence + ratchet-drain + one-rover.
- **Fable/DS:** Fable: dock fission bloom (bud → well → pinch → SNAP → recoil frame-series; the
  anticipation bud + the √φ overshoot land) · DS: `/navigation` dock fission (the live shell triad).
- **Paint close:** the scroll gesture on the REAL shell, both engines both modes; waist/body ratio reads
  a true concavity (the BD spike's 0.31 reference); PRM = discrete swap, zero neck frames; re-merge on
  scroll-up. **Preconds:** 4.1 (frozen); the shell arm build-gates on 4.9's seam — **PRECOND-AMENDMENT
  FLAG (open question #4, §3.3):** the cursor carries no 4.5←4.9 edge; the orchestrator must add 4.9 to
  4.5's precond row OR split the shell arm into a 4.9-follower clause before the sort runs.

### 4.6 `W-DOCK-PERSISTENT-CUT` [H] — ℱ brand + Fourier egg out (a COORDINATED edit)

- **Deliverables:** remove the `demo/layout/SidebarDock.vue:269-296` ℱ `#persistent` slot + the egg
  cluster (`useLongPress` `:38`, `fireRedraw`/`wordmarkPress`/`@dblclick` `:177-283`) + the vestigial
  anchored `DockSeparator`; **drop the `:84` foundations filter so Foundations rejoins nav** as a normal
  `Compass` entry; remove the `demo/layout/AppShell.vue` `FRedrawOverlay` wiring (`:45,:347,:351,:488`);
  DELETE `demo/eggs/FRedrawOverlay.vue` (+`useLongPress.ts` IFF no second consumer — verify
  `StoryHero.vue`); KEEP `demo/eggs/fGlyphPoints.ts` (shared with `substrates/fourier-paths.ts`); KEEP
  `demo/layout/BottomDock.vue:210` `#persistent` (the mobile Sheet trigger — load-bearing nav, not brand).
- **Gate arms:** `proof:dock` source-absent (grep ZERO ℱ/egg symbols) + the `proof:dock-region-model`
  empty-`#persistent` clean-collapse assert.
- **Fable/DS:** —. **Paint close:** the dock reads calm at rest (no continuous redraw — Apple's named
  steady-state anti-pattern gone). **Preconds:** 4.1; lands before 4.9 (simplifies the shared chrome).

### 4.7 `W-DOCK-CAP-SCROLL-FADE` [P] — a capped axis IS a scroll axis + the soft edge (merged 4.7+4.8)

- **Deliverables:** retire the `overflow="scroll"` union member + `scrollClass`
  (`useDockShellProps.ts:107,:285`) + the `.dock-scroll-y` opt-in — capping (`--dock-max-block-size`,
  `shell.css:291`) unconditionally scrolls its capped axis (`SidebarDock` needs ZERO prop change);
  KEEP the horizontal `.dock-scroll-x` port for `BottomDock` (content-driven width — stated in writing);
  the lozenge guard is GEOMETRIC ONLY (the cross-axis pin is impossible per CSS Overflow §3 —
  `shell.css:222-236` documents it; `--dock-control-safe-inset` 80%-plate × 1.1 hover < cell is the
  SOLE guarantee); wire `useFadingScroll`/`--fade-scroll-width` where the capped port meets the chrome
  (iOS-26 `scrollEdgeEffectStyle(.soft)`; a legibility cue — survives PRM, stops interpolating only);
  rewrite `GlassDock.scroll-overflow.test.ts`; MIGRATION row for the dropped member; the folded
  `-UTILITY-REACH` 1280×600 trailing-reachability acceptance arm.
- **Gate arms:** `proof:dock` plate-clearance geometric guard (inline-axis painted-plate slack ≥1px at
  hover across ALL SidebarDock control types — icon, dark-toggle, morph, gear, facet chips) + cap⇒scroll
  (no opt-in survives) + the re-pointed `proof:dock-plate-clearance` source checks + soft-edge-present.
- **Fable/DS:** Fable: overflow soft-edge fade (the feathered port against the glass chrome, both
  states) · DS: `/dock` overflow. **Paint close:** @1280×600 every trailing utility reachable; the fade
  feathers ONLY past scroll>0 (at-rest sharp); WebKit arm explicitly (mask+backdrop-filter fragility —
  F-ARM-4 #2). **Preconds:** 4.1.

### 4.9 `W-SHELL-DOCK-DRY` [P] — two shell docks → one `useShellNavDock`

- **Deliverables:** NEW `demo/layout/useShellNavDock.ts` — the shared category-nav loop + trailing
  utility group + morph-button wiring folded ONCE under two thin SFCs (`SidebarDock`/`BottomDock`); the
  responsive 768px swap STAYS a pure media query (`dock-nav.css:179`) — **the responsive axis and the
  user V↔H morph axis are ORTHOGONAL, never one ref** (F11: a user-morphed-horizontal desktop dock ≠
  the responsive BottomDock; one ref fights the media query at the boundary); the mobile Sheet trigger
  preserved; P1 landing-semantics build-proof (the 4.10 prerequisite): the in-flow finding
  (`dock-nav.css:40` flex-shrink:0 column) + the leave-flow→bottom-bar landing + the one-time
  CLS-bounded `<main>` settle read coherent on real paint — **ESCALATE before 4.10 builds if not**
  (never ship an incoherent flip to satisfy a grep bar).
- **Gate arms:** `proof:dock` landing-semantics build-proof (P1) + shell-DRY (the nav loop declared
  once; a re-duplicated loop REDs) + morph-vs-breakpoint no-collision at 768px.
- **Fable/DS:** Fable: shell-dock (the DRY'd shells read identical pre/post, both breakpoints) · DS:
  `/dock` shell. **Paint close:** both shells both modes byte-near-identical to HEAD at rest; the
  landing-semantics frame capture filed. **Preconds:** 4.1; **#9 in the 4.10 chain — PROTECT.**

### 4.10 `W-DOCK-INPLACE-MORPH` [P] — **VERBATIM-protected; ELABORATION ONLY**

**Scope/mechanism/preconds UNTOUCHED** (the frozen row: delete synthetic-dual-DOM + VT-crossfade +
goo-filter-toggle for a real V↔H morph of the REAL shell dock; `proof:dock` morph-insitu M2/M4;
preconds 4.1 + 4.9). What follows is execution detail under that scope, consolidated from the
pass-1/pass-2 converged specs — the builder's checklist, adding nothing new:

- **The single-real-dock-flip is the DEFAULT** (F-ARM-3): the ONE SidebarDock flips its own
  `orientation` at the goo-occluded `t≈0.5` (a LOCAL `t≥0.5` computed — NOT a published-API addition);
  the two-form crossfade is the fallback only if P1 paint shows the flip snapping through the goo.
  The morphed-horizontal dock LEAVES FLOW → pins to the bottom edge; the freed 72px gutter reclaims via
  ONE CLS-bounded `<main>` settle (the deliberate press authorizes it); H→V reverses.
- **DELETE wholesale:** the `demo/layout/AppShell.vue:497-720` modal stage, `morphEntries` synthetic docks, the
  VT arm (`liquidPreview`/`vtOrientation` `:112-133`), the six modal fns, `.demo-dock-morph-*` CSS
  (`:758-857`), the window-event triple-hop, `window.__shellDockMorph`. **KEEP `startViewTransition`
  ONLY at `:220`** (the route-category crossfade — the "zero VT in the V↔H path" grep must not
  collateral it). KEEP the published two-DOM-dock `useDockOrientationMorph` for `/dock/morph-showcase`
  (the fence — re-pointed to real nav content).
- **The teardrop budget, surgical** (F-ARM-2): `--dock-bridge-goo-filter: url(#dock-morph-goo)` bound
  STATIC (the 118-184ms hitch was the `none↔url()` graph rebuild — never toggle); presence gated on
  `--dock-bridge-opacity` at the smootherstep `t∈0.18..0.82` midpoint; **the F6 goo-id re-point born-RED
  gate** (the in-place computed must reference the canonical `GooFilter` `#dock-morph-goo`
  (`GooFilter.vue:56`, blur 16/slope 14/offset −7) — `#shell-dock-morph-goo` (`demo/layout/AppShell.vue:123,:619`)
  greps to ZERO after the modal delete); the painted-goo-coherence-at-blur-16 P2 capture (re-tune
  `--morph-neck-frac` IFF over-fused — a coherence tune, never a graph edit); the M5-Max timing labeled
  NON-INFORMATIVE for the slow-GPU class (no "VALIDATED" verb on the unmeasured box); endpoint occlusion
  frame-captured both directions; the bridge container sized to the V(296)/H(332) union ALONG the
  left-column→bottom-bar travel.
- **The weight** (F-ARM-1): the squish reads the analytic `--dock-morph-v` (`clamp(0,|v|/V_NORM,1)`),
  never `|Δt|`; `--dock-live` BYTE-UNTOUCHED; `--motion-weight` re-sourced in lockstep; the iOS
  signature π = stretch-at-launch, thin-at-arrival, micro-swell at the +7.3% overshoot, identical at
  60/120Hz.
- **Serialization + a11y:** V↔H and collapse are MUTUALLY EXCLUSIVE episodes through the ONE `morphing`
  ref (a toggle while collapsed first seats the collapse; a second start is rejected — debounced press,
  not a second spring); nav controls `inert` during the ~0.7s flight, the morph button retains focus,
  `aria-pressed`+`aria-label` on the BUTTON (never the root). PRM: synchronous seat, zero neck frames
  (`--dock-bridge-opacity: 0` under reduce, the parent multiply-down asserted).
- **Gate lockstep:** `proof:dock-morph-insitu` M2/M4 flip born-RED→teardrop-only IN LOCKSTEP with the
  VT delete (`proof-dock-morph-insitu.mjs:142` currently MANDATES the VT the delete removes — a silent
  red is forbidden).
- **Fable/DS (frozen row):** Fable: the V↔H real morph — **the model-band paint TENTPOLE** (the full
  frame-series: press → weight-launch → goo-occluded flip → bottom-bar land → settle; and the reverse) ·
  DS: `/dock` morph-showcase + the in-situ shell. **Paint close:** Chrome AND Safari (F-ARM-4 #1 —
  the backdrop-filter-under-repaint flicker class: `will-change: backdrop-filter` +
  `transform: translateZ(0)` hints; verify it DRIVES, reads liquid glass, no screen flash), both modes,
  PRM single-paint, the gestalt-roster dock row re-earned on a fresh capture.

### 4.11 `W-DOCK-STORY-MODULARIZE` [H · F7] — the dock story stages ONE organism

- **Deliverables:** split the oversized stories onto the shared `DockStage`/`DockExampleTile` chassis
  (`liquid-playground.vue` 46KB, `overview.vue` 34KB — no demo-local re-fork); **the
  `liquid-playground.vue` protection assert PASSES** (it owns the one-dock+tabs-facility assert —
  8 `<GlassDock>` + `<DockStack mode="facets">`, `docs/tranches/BG/execution/bg-build-map.md:517-519` — the split must keep the
  protected composition intact); `dock-gallery.vue` content-label cleanup ONLY; `morph-showcase.vue`
  KEPT as the canonical published two-DOM-dock demonstration (the 4.10 fence). Award-craft (§2.4): the
  dock story reads as ONE staged organism — a narrative arc (rest → collapse → morph → fission → island),
  not a parts bin.
- **Gate arms:** `proof:demo` dock-story-modularize SPLIT + the protection assert + no broken imports.
- **Fable/DS:** —. **Paint close:** the split stories render byte-near-identical. **Preconds:**
  deferrable (lands last).

---

## §5 — Precepts conformance (explicit checks)

- **motion-canon P1-P7:** spring-iff-spatial (every dock size/position channel rides DOCK_SPRING or a
  scalar it drives); bezier-iff-effect (opacity/tint legs); the punch rides `--ease-cartoon-punch` — a
  bezier-tier `linear()` token, NOT a SPRING_PRESETS row (the ≤10% spring invariant; a monotone damped
  spring cannot anticipate — the one sanctioned step off the spring, on a volume-preserving channel that
  cannot change the footprint). Per-spring settle clock never truncated. P5 compositor-only: `scale`/
  `translate`/`opacity`/`filter:url()`; the reserved footprint is ONE layout solve
  (`proof:no-layout-animation` green by construction); the 4.10 `<main>` settle is a ONE-SHOT deliberate
  commit, never per-frame. P6/PRM: `--motion-weight → 0` zeroes squish/overshoot/anticipation/stagger/
  cast-travel in ONE assignment; every morph still CONFIRMS (synchronous seat).
- **tunable-anim:** every feel knob is a token (`--dock-morph-max-stretch`, `--neck-waist`,
  `--neck-girth`, `--dock-bridge-opacity` window, `--siri-island-t`); no wall-clock literals in JS.
- **design-idioms:** token-first (the whole geometry cascade on `--dock-scale`); substitution-vs-
  inheritance respected (the coarse-block re-declares); clean breaks with MIGRATION rows
  (`overflow="scroll"`, the silhouette, the egg); no legacy aliases.
- **Cross-cutting folded rules:** overhead floor (sub-threshold items ride as CLAUSES — the F13 doc fix,
  the a11y census, the `fadeMinAlpha` floor); gates as FAMILY arms (`proof:dock` case rows + ONE
  `proof:siri`; net-negative script count — `proof-dock-context.mjs` retired, three gates re-pointed
  not forked); Fable arm + DesignSync surface on every [P] wave (§4); ≥2-consumer honest (the fission
  tripwire §3.3; the blur-engage drawer twin; SiriWaveform demo-private until a real 2nd);
  presets-in-consumers (facet hues, cyan waveform core, split contexts as consumer data); warm identity
  (§6). Foreign-tree fence: speedtest/sibling consumers are named asks, never edits.
- **Protected set:** DOCK_SPRING disk bytes (§0) · 4.10 verbatim (§4 elaborates only) ·
  `proof:dock-engine` E4 · the ratio-free blend + punch channel (BD.W-DOCK-CORE, landed) · the
  `.glass-dock-frame` box-inviolate escape · `useSurfaceAxis`/the grammar model untouched.

---

## §6 — The dock gestalt bar (the acceptance language every paint verdict is judged by)

**Alive but never attention-stealing — the iOS-27 read.** The judge watches the screen recording,
defaults to broken; a green mechanism with a broken gestalt is an automatic FAIL.

- **√φ proportion** — the collapsed circle is a TRUE 1:1 (never oval); expand grows center-out from the
  summary; `--dock-pad-block` on the φ rung; the fission island is the golden-minor (`thickness/φ`)
  traveling the golden-major reach; the Siri forms' BLOCK-SIZE steps the √φ ladder (aspect/corner are
  designed per-form fields — §3.2).
- **Animation laws (Disney, operationalized)** — DRIVER motions (collapse/expand, V↔H, fission, Siri
  descend) carry anticipation (the sub-origin dip on `--ease-cartoon-punch`), overshoot-land (the √φ
  share), follow-through (specular sweep + the cartoon cast sliding OPPOSITE the morph — paper-morphism
  made kinetic), arc, and volume-preserving squash-and-stretch (capped ≤1.08, swells never taffy-pulls).
  OBSERVER snaps (layer swaps, carousel, facet select) stay CALM on DOCK_SPRING — never bounce. Weight
  reads identical at 60/120Hz (the analytic-velocity fact).
- **Technicolor cartoon-punch, warm** — the warm-cream plate both modes (light `srgb .944/.903/.865`,
  dark `.350/.295/.249`, R>G>B, NEVER gray) over a live colorful field; the selected control reads as
  GLASS (a tier forward, never a saturated fill); one color event per surface; the Siri waveform is
  warm-DOMINANT prismatic (cyan is a consumer preset).
- **Continuity (the dock's own bar)** — ONE glass mass end-to-end: every transition is a survivor-FLIP +
  detach + bloom on the ONE orchestrator/spring/scalar family; never a `v-if` re-mount, never
  `<component :is>` swap-flash, never `transition: all`; the box is INVIOLATE wherever the contract says
  so (`deltaW=deltaH=0` for the gutter stack and the island seat; CLS=0 everywhere except 4.10's one
  authorized deliberate settle).
- **Safari-first absolute** — goo is `filter: url()` sRGB on a STATIC graph; morphs are compositor
  `transform`/`opacity`/`filter`/`clip-path`; ZERO `backdrop-filter: url()`; every binding π captures
  WebKit/Metal beside Chromium, both modes, born-RED each.
- **PRM** — `--motion-weight: 0` + synchronous seats: the gestures still CONFIRM (collapse seats, the
  flip lands, the split swaps, the island appears) with zero motion frames; the fade legs survive.

---

## REVISION — 2026-07-01 (post-critique, `critique/DOCK-crit.md` applied)

Critic verdict 88% → must-fixes applied, greenfield-loop record preserved untouched:

- **B1 (major):** 4.1's doc reconcile split — `CLAUDE.md:679` is the ONLY in-repo edit; the
  `docs/precepts/motion-canon.md:195` + `tunable-anim.md:63` lines re-scoped as a SUBMODULE-SIDE
  coordination ask (`docs/precepts/` is a read-only git submodule — §0, §4.1).
- **B2 (major):** the 4.5←4.9 missing precond edge elevated from a self-challenge aside to
  **open question #4** — a recorded PRECOND-AMENDMENT FLAG (amend 4.5's precond to include 4.9's shell
  arm, OR split the shell wire into a 4.9-follower clause); the ≥2 tripwire blocks 4.5's CLOSE until
  the orchestrator picks (§3.3, §4.5). Never self-applied — the frozen preconds stay the cursor's.
- **C1 (moderate):** the `SIRI_FORMS` √φ ladder GROUNDED — the BLOCK-SIZE alone steps ×1.272; aspect
  and corner are designed per-form fields with the capsule corner law named (§3.2, §6, 8.x).
- **D1:** the `{0.32,0.7}→{0.68,0.64}` prose correction explicitly HELD on open question #1 — no
  unilateral edit of the protected set's stated wording without a fence-lift (§0).
- **D2:** the 10.5 residue strike given a target shape — verify-ABSENT rider, never a dead assert (§4.3).
- **D3/D5 (citation hygiene):** `useScrollChrome.ts:264→:110` · `useDockSearch.ts:285→:138` (definition
  lines, not EOF); `demo/layout/` prefixes on SidebarDock/BottomDock/AppShell cites (§1, §4.6, §4.10);
  `docs/tranches/BG/execution/` prefix on the bg-build-map cite (§4.11).
- **D4:** the 8.x-before-4.3 transient ~600L growth acknowledged in the hallmark blurb (§1).

Open questions for the orchestrator now number FOUR: #1 the frozen-constant prose reconcile (HELD),
#2 the 4.3/10.5 silhouette double-own strike, #3 the WS6 pass-1 subpath/api row strike (confirmed),
#4 the 4.5←4.9 precond edge.

---

> **ORCHESTRATOR NOTE (R6′/R1, 2026-07-01):** DOCK_SPRING's fence is the DERIVATION + shipped value — `springPreset("dock")` `{0.68, 0.64}` (the landed BD tune; any `{0.32, 0.7}` literal anywhere is stale doc-rot, reconciled at BH.B4c). The silhouette DELETE is 10.5's; 4.3 verifies (RULINGS-PASS2.md §CORRECTIONS).
