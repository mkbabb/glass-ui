# BG audit — BD greenfield coverage: what LANDED vs spec-only vs REGRESSED

> **Scope.** The forensic cross-check of the BD greenfield plan (39 items, §6 ledger) +
> the P1–P10 build-DAG (IMPLEMENTATION-PROGRESS.md) against the REAL HEAD source
> (`master` @ `998136bb`, v4.2.0 shipped). Verdict per item:
> **shipped-good** · **shipped-broken** (code landed, gestalt dead — the headless-green/
> visually-broken gap) · **spec-only** (claimed but never wired) · **regressed**.
> The user: *"what of all our greenfields?"*
>
> **The headline.** The BD build was NOT abandoned — every phase P1–P10 committed and
> the 4.2.0 tag shipped with provenance. The structural primitives (`.glass-capsule`,
> `useMorphField`, the ONE `GooFilter`, the `--dock-live` convex-blend, the substrate
> size-unify, ScrollCard) are REAL on disk. **The failure is the integration layer**:
> the route-transition machinery freezes every navigation, so most of the shipped work
> never even renders for the user. *The greenfields largely LANDED; the shell that
> hosts them is broken, and a handful of user directives were declared-done in prose but
> are spec-only or were over-built into new defects.*

---

## FINDINGS — the build-DAG is real (P1–P10 all committed)

Every phase committed (verified `git log`): P1+P2 (`w8dsnro3g`), P3 `43b68c33`,
P4 `cf149cff`, P5 `a5f184cd`, P6 `b30e7989`, P7 `b494e526`, P8 `369be40f`, P9
`03d8857d`, P10b `b8aa7033`/`bd6aae64`, P10c `deffc346`, ship `1cb84049`/`998136bb`.
IMPLEMENTATION-PROGRESS.md L3 claims "all 10 phases built + live-π verified + 356-gate
`--run full` green." The gates went green; **CONTEXT.md confirms 13 live defects.** This
is the cardinal `feedback_live_pi_oklab_paint_arm` / headless-green gap at tranche scale.

### Foundation primitives — SHIPPED-GOOD (the spine is fit)

| BD item | claim | HEAD evidence | verdict |
|---|---|---|---|
| glass-capsule (P3) | extracted register | `src/styles/glass/glass-capsule.css` (143L), 11 consumers (drawer/icon-chip/segmented-tabs/glass/select/configurator/icon-button/glass-atom/glass-chip/btn) | **shipped-good** |
| useMorphField WELD (P7) | ONE goo atom | `src/composables/motion/useMorphField.ts` (21KB) | **shipped-good** |
| ONE GooFilter (P7) | delete Glass/DockGooFilter | `goo-filter/GooFilter.vue` exists; `GlassGooFilter`/`DockGooFilter` = 0 src refs (only `fission-bridge.css` residue) | **shipped-good** |
| dock width-seizure (P6) | `--dock-live` convex blend | `dock/layers.css:72` `--dock-live = collapsed + (expanded−collapsed)·clamp(0,t,1)`; the `--dock-root-ratio/-scale` machinery DELETED (`shape.css:140` "is gone") | **shipped-good** |
| substrate size-unify (P5) | never-300×150 | `webgl/createCanvasLifecycle.ts:59-114` BD.W-SUBSTRATE-SIZE-UNIFY G1 (gBCR + 3-deep parent-walk + `Math.max(1,…)` floor) | **shipped-good** |
| ScrollCard family | scroll-shrink card | `card/{ScrollCard,ScrollCardHeader}.vue` present | **shipped-good (component)** |
| cartoon-cast (P1c) | inert-child cel-ink | `Card.vue:409` `<span class="cartoon-cast" aria-hidden>`; `cards.css:359` box-shadow over `--shadow-color: --foreground` | **shipped-good (mechanism)** |

These verify the §6 ledger REFINE-dominant verdicts. The greenfield's structural thesis
held: it was a UNION (extract+re-point), not a fork.

### The integration layer — SHIPPED-BROKEN (the 13 live defects)

**1. ROUTING FREEZE — the linchpin (shipped-broken).** `demo/layout/AppShell.vue`
over-contrives the route transition into THREE coexisting mechanisms:
- L405 `<Transition name="fade-slide">` wrapping `<RouterView>`.
- L279-303 the `useBloomUp` **"find first non-skeleton child"** hack
  (`[...main.children].find(c => !c.classList.contains("section-landing-skeleton"))`).
- L131 + L220 **two no-op `startViewTransition` watchers** (morph + category-switch).

The page roots carry `.scroll-build` (`StoryPage.vue:72`, `SectionLanding.vue:85`),
which is a `@keyframes gl-page-build` **mount `animation`** (`scroll-choreography.css:88`
"plain `@keyframes … animation`, NOT a `view()`/`scroll()` timeline"). Vue's
`<Transition>` auto-detects type from `transition` vs `animation`; an element carrying
BOTH (`.scroll-build` animation + `fade-slide` transition) mis-fires the type pick → the
LEAVE hook never resolves → old + new page coexist (CONTEXT.md reproduced: `<main>`
childCount 2→3). **Root cause: `.scroll-build` page-build animation × `<Transition>`
type-detection collision.** This is the highest-severity finding — it blocks rendering of
EVERY shipped page (configurator, substrates, scroll-shrink, previews all hidden behind a
frozen route). The BD `shell-layout` item (§6 row C, ~70%) shipped this contrivance.

**2. Metallic field — SHIPPED-BROKEN against the user gestalt (the most subtle miss).**
P2 claims "the §3 gray FIXED, warm `.paper-field`." The narrow metric is TRUE: `paper.css:130`
clamps `--field-h` to `[25,95]` (warm), measured C 0.0753 @ H78.6°, tealFrac 0. **But the
USER DIRECTIVE (CONTEXT.md #2) is "every page should have an AURORA, not the paper wash."**
What shipped is a STATIC CSS `conic-gradient` cel-sheen (`paper.css:151` `from -45deg at
78% 22%`) + 4 high-chroma radials + the `--paper-grain-tooth` feTurbulence speckle
(`paper.css:44`, opacity 0.22) + a 42s `field-cel-drift` ::before — i.e. the EXACT
iridescent-conic + woven-grain composite CONTEXT.md #2 names "disgusting brown woven
metallic." **The greenfield cured the gray-CHROMA but shipped the metallic-GESTALT** — it
built a warm static wash where the user wants the live aurora. spec-vs-gestalt divergence.

**3. The hero over-scale (shipped-broken, NEW defect introduced).** `StoryHero.vue:92`
`heroClass = text-display-${heroScale}` with `heroScale ≥ 4` forced on EVERY route
(L91 "every route resolves a rung ≥ 4", L73 "text-display-3 is RETIRED"). The display
ladder peaks `text-display-mega` 177px / `-hero` 255px / `-audacious` 352px. A route
resolving `audacious` paints a 352px `<h1>` → CONTEXT.md #10 "headers WAY too large."
The `clamp()` lives in the token's SIZE clamp, but the RUNG-FLOOR (≥4) over-selects.
The BD `page-chrome` item asked for "chrome page-title ~2× SMALLER + dividing rule"
(GREENFIELD-PLAN §1) — the build did the OPPOSITE, forcing audacious-tier ON every hero.
**The amendment INVERTED its own directive.**

**4. The morph is a MODAL demo, not an in-dock button (shipped-broken vs directive).**
CONTEXT.md #13: "make the morph a BUTTON IN THE DOCK that morphs V↔H IN PLACE — not a
demo, not a modal; remove the crossfade variant." HEAD: the dock `ArrowLeftRight` button
(`BottomDock.vue:439`, `SidebarDock.vue:457`) dispatches `glass-ui-demo:toggle-dock-morph`
→ `AppShell.vue:497` opens a `<Transition name="morph-stage-fade">` **modal overlay**
(`role="dialog" aria-modal="true"`, L501) with a SYNTHETIC two-dock stage. The §7 VT
crossfade is STILL the shipped default (`AppShell.vue:573` comment). **The directive
(in-place dock morph, teardrop-only) was NOT honored** — the BD `dock-core`/`blend-morph`
items kept the modal-stage + VT-crossfade architecture the user explicitly rejected.

**5. The persistent ℱ brand section — NOT removed (spec-only directive).** CONTEXT.md #8:
"the persistent ℱ brand section atop BOTH docks is useless → REMOVE." HEAD: the ℱ wordmark
still lives in the `#persistent` slot of BOTH docks (`SidebarDock.vue:269` `<template
#persistent>` + the AppShell `f-redraw` Fourier easter-egg `AppShell.vue:347`). The
directive was never executed.

**6. cartoon-cast red halo + corner-clip (shipped-broken).** The `.cartoon-cast` ink-plate
(`cards.css:365`) composes `--shadow-cartoon-md` over `--shadow-color: --foreground`
(warm-ink at HEAD). CONTEXT.md #3 reports a RED/maroon halo around docks + un-clipped card
top corners. The cast mechanism is sound on `surface="cartoon"` Cards, but the red bleed
+ the dock aliasing are a `--glass-key` warm-cast mis-tune + a missing `overflow`/`isolation`
clip on the Card root (`Card.vue:321` carries `rounded-card scrollbar-hidden` but no
corner-clip `overflow-hidden`/`isolation`). Owned by sibling `D-aliasing-clip.md`.

### Category previews + scroll-shrink — SHIPPED but gestalt-unverified

- **category-landing previews — SHIPPED (seam real).** `SectionPreviewCard.vue:91`
  `<slot name="preview">` exists; `SectionLanding.vue:131-170` dispatches a `#preview`
  `<component v-if="specimen.kind">` over `field`/`control`/`surface`/`metric` (the
  `field` kind is a device-free `auroraFallbackGround` data-URI raster per the P10c
  GL-budget). So the BD `category-landing` item (§6 row C) IS wired — NOT spec-only as a
  first read suggests. Whether it renders well live is the gestalt call (blocked by the
  routing freeze; owned by `D-category-previews.md`).
- **ScrollCard scroll-shrink — component SHIPPED, register reported DEAD (CONTEXT.md #4).**
  `ScrollCard.vue` carries the `.card-scroll-host` + `--card-scroll` named-timeline
  internally, but #4 says "titles no longer scroll-and-shrink." Likely the demo pages
  stopped composing `<ScrollCard>`/`<CardHeader shrink>` (a wiring regression at the page
  layer, not the primitive). Owned by `D-scroll-topbar.md`/`D-previews-dockscroll.md`.

### The §6 ledger 39 items — coverage roll-up

The ledger triaged 39 items REFINE-dominant (no full re-invents); P1–P10 built them.
Cross-checked verdicts:

- **Band 0 (5 items) — SHIPPED-GOOD spine, one gestalt miss.** design-edicts (APPLIED to
  design.md), motion-spring (FROZEN substrate), glass-material (warm plate landed),
  cartoon-shadow (cast mechanism landed). `paper-morphism` shipped-broken-vs-gestalt (the
  metallic field, finding #2).
- **Band A (11 viz) — substrate SHIPPED-GOOD; per-viz gestalt unverified.** The size-unify
  cures the stuck-canvas across all 11. dot-flow flagged "faint at rest" (P5 deferred to
  P10 polish — never done). goo-morph "transient worm" flagged (P5→P7 re-verify). The
  live-broken `/substrates` (CONTEXT.md #6) is the routing freeze + the SectionLanding
  frozen-still, not the substrate. Owned by `A-viz-census.md` + `D-field-aurora.md`.
- **Band B (10 component rows) — SHIPPED-GOOD material, hover/punch partial.** tabs/buttons
  capsule landed; select/chip/overlays "starved + uncoupled, not broken" (§6 rows). The
  `--glass-tint-strength: 0%` calm-bucket means the warm floor is sub-perceptual until the
  field transmits — and the field is the static metallic wash (finding #2). dock-core
  shipped-good. Owned by `A-component-families.md`/`A-glass-token-arch.md`.
- **Band C (5 chassis) — the BROKEN tier.** story-page-standard/page-chrome/shell-layout/
  category-landing/configurator-presentation — the shell-layout routing freeze (finding
  #1), the hero over-scale (#3), the modal morph (#4), the un-removed ℱ (#5) all live HERE.
  Band C is where the greenfield's integration debt concentrated.
- **Band D (2 motion) — SHIPPED, blocked.** P9 entrance-reveal/scroll-choreography committed
  (`03d8857d`); `/motion/scroll-choreography` reported broken (CONTEXT.md, the routing layer).
- **Band E (2 meta) — audit MECHANISM only.** wave-spec-audit/historical-recap are
  `audit.mjs`/`recap.mjs` meta-passes (the §6 rows confirm the fake-gate-fraud self-finding:
  PASS-2/PASS-3 were string-presence `re.test`, never summed into exit code). The
  consistency gate the user reaffirmed was itself a sham gate — which is WHY the 356-gate
  green ≠ working UX.

---

## ROOT CAUSES (gestalt, first-principles)

1. **The route-transition layer is the single point of failure — over-contrived into 3
   coexisting mechanisms.** A `<Transition>` + a `.scroll-build` mount-`animation` +
   a bloom-find-child DOM hack + two no-op VT watchers. Vue gives ONE idiomatic route
   transition; the greenfield bolted three. The `.scroll-build` animation × `<Transition>`
   type-detection collision freezes leave. **Everything downstream is invisible because of
   this one bug** — the shipped configurator, substrates, previews, scroll-shrink all
   render correctly but are hidden behind the stale page.

2. **The greenfield optimized the GATE METRIC, not the user GESTALT.** P2 "cured gray"
   (chroma ≥ 0.045) while shipping a metallic static wash; the hero "clamp" passed while
   forcing audacious-tier on every page; the consistency gate (Band E) was itself a
   string-presence sham. The cardinal lesson recurs: a per-mechanism π verifies the LOCAL
   number, never the GESTALT the user reads — and the holistic gate was fraudulent.

3. **A handful of explicit USER DIRECTIVES were declared-done in prose, not executed:**
   remove-ℱ (#8 → still present), in-dock-morph (#13 → still a modal), aurora-not-wash
   (#2 → still the paper wash). The IMPLEMENTATION-PROGRESS LOG narrates "live-verified by
   orch" for work the source contradicts. The verdict-flip discipline failed.

4. **Band C (chassis) carried the integration debt the spec deferred.** The §6 Band-C rows
   averaged ~70% (the lowest band) and the remaining 30% was "build-time" — exactly the
   shell/route/hero/morph work that shipped broken. The convergence % was honest about the
   gap; the build closed it on paper and shipped anyway.

---

## PROPOSED WAVES (BG)

These FOLD the BD greenfields forward — RE-DO the broken integration gestalt, RETIRE the
declared-done directives that were never executed, COMPLETE the deferred polish. Each
defers the deep per-defect spec to its sibling D-* audit and owns the COVERAGE/disposition.

### BG.W-ROUTE-TRANSITION-UNIFY (the linchpin — RE-DO)
- **Intent:** ONE coherent idiomatic route transition; delete the contrivance trio.
- **Approach:** decouple `.scroll-build` from the `<RouterView>` `<Transition>` boundary —
  the page-build entrance moves OFF the transitioning element (or becomes a `view()`/JS
  staggered reveal that does not collide with Vue type-detection); DELETE the bloom-find-
  child hack (`AppShell.vue:279-303`) + the two no-op `startViewTransition` watchers
  (L131/L220). ONE `<Transition mode="out-in">` with a single clean recipe.
- **Files:** `AppShell.vue`, `StoryPage.vue`/`SectionLanding.vue` (`.scroll-build`),
  `scroll-choreography.css`/`liquid-enter.css`. **π:** nav changes the rendered page in one
  paint; `<main>` childCount stays 1; no stale coexist. Folds `D-routing.md`.

### BG.W-FIELD-AURORA (RE-DO the gestalt — aurora not wash)
- **Intent:** every page gets a LIVE aurora behind the glass, per CONTEXT.md #2; retire
  the static metallic `.paper-field`.
- **Approach:** mount ONE offscreen-paused `<Aurora>` per route (the `DockStage`/
  `useIntersectionPause` budget), warm-hue-clamped; the conic cel-sheen + grain-tooth
  speckle retire (clean break). Reconcile with the one-GL-per-route budget.
- **Files:** `paper.css` (`.paper-field` retire), `PaperBackdrop.vue`, `AppShell.vue:360`,
  `warm-field.ts`. **π:** live aurora paints behind glass on the enrolled routes, warm/no-
  teal, offscreen-paused. Folds `D-field-aurora.md`.

### BG.W-DOCK-MORPH-INPLACE (RE-DO vs directive — kill the modal)
- **Intent:** the V↔H morph is an IN-PLACE dock-button morph, teardrop-only; remove the
  modal stage + the VT-crossfade default.
- **Approach:** the dock button drives `--dock-morph-t` on the LIVE dock (the
  `useMorphField` weld is shipped — compose it), no overlay; DELETE `morphStageOpen` + the
  `morph-stage-fade` `<Transition>` + the synthetic two-dock stage; the liquid teardrop is
  the only register. **Files:** `AppShell.vue:497-720`, `BottomDock.vue`/`SidebarDock.vue`
  morph control, `dock/shape.css`. **π:** the real dock morphs in place; esc/no-modal.
  Folds `D-dock-morph-persistent.md`.

### BG.W-SHELL-DECONTRIVE (RETIRE the un-executed directives)
- **Intent:** REMOVE the persistent ℱ brand section from both docks (#8); strip the dead
  easter-egg paths it carries (`f-redraw` Fourier overlay).
- **Approach:** delete the `#persistent` ℱ control from `SidebarDock.vue`/`BottomDock.vue`
  + the `FRedrawOverlay`/`onFRedraw` machinery in `AppShell.vue`. Clean break.
- **Files:** the three layout SFCs. **π:** no ℱ section atop either dock. Folds the
  shell-layout coverage gap.

### BG.W-HERO-SCALE-RESPONSIVE (COMPLETE — invert the over-scale)
- **Intent:** the hero `<h1>` fits the viewport; the chrome page-title is ~2× SMALLER with
  a dividing rule (the page-chrome directive the build inverted).
- **Approach:** retire the `heroScale ≥ 4` floor (`StoryHero.vue:92`); resolve a responsive
  rung that `clamp()`s to fit width (min · √φ · max-that-fits), no off-page overflow, no
  forced audacious tier on body pages. **Files:** `StoryHero.vue`, `SectionLanding.vue`,
  the display-ladder clamp. **π:** `/compositions/hero` + long titles fit at 500px.
  Folds `D-hero-type.md`.

### BG.W-CHASSIS-GESTALT-VERIFY (COMPLETE — the deferred polish + gestalt re-earn)
- **Intent:** the shipped-but-gestalt-unverified Band-C/A work (category previews live,
  ScrollCard scroll-shrink re-wired, dot-flow contrast, goo-morph worm) re-earns its
  gestalt verdict on a FRESH capture once the routing freeze lifts.
- **Approach:** re-compose `<ScrollCard>` on the demo pages that lost it; verify the
  `previewKind` specimens render live; resolve dot-flow rest-contrast + goo-morph
  barbell. NOT a re-invent — a wiring/polish completion of shipped primitives.
- **Files:** demo pages, `SectionLanding.vue`, dot-flow/goo-morph viz. **π:** the previews
  show live components; titles shrink; the worm necks. Folds `D-previews-dockscroll.md`,
  `D-category-previews.md`, `D-scroll-topbar.md`, `A-viz-census.md`.

> **The aliasing/clip (#3) + configurator (#7) defects are owned in full by sibling
> `D-aliasing-clip.md` + `D-configurator.md`** — this coverage audit flags them as
> shipped-broken (the cartoon-cast red bleed + the un-clipped corners; the configurator
> wiring is real but blocked by the routing freeze) and defers the gestalt spec to them.

**Disposition of the 39 BD items:** 0 RETIRE-the-primitive (the spine is fit, no
re-invent). The RE-DO is the INTEGRATION layer (Band C shell/route/field/morph), not the
material layer (Band 0/A/B primitives). The user's "what of all our greenfields?" answer:
*the greenfields LANDED — the shell that hosts them broke, and a few directives were
narrated-done but never executed. BG re-does the host, not the houses.*
