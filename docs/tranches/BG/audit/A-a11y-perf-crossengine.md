# BG audit A — a11y · performance · Chrome/Safari cross-engine

Forensic sweep of the live-broken 4.2.0 surface for accessibility, performance, and
cross-engine (Chrome AND Safari) regressions. Verified against real HEAD source
(`master` @ `998136bb`, glass-ui 4.2.0). FINDINGS → ROOT CAUSES → PROPOSED WAVES →
the CONSTRAINT-SET every other BG wave must honor → the aurora-per-page vs GL-budget
reconciliation.

---

## FINDINGS (true at HEAD, with file:line evidence)

### F1 — The route-transition layer is a perf+a11y double-fault: `animation` ⊥ `transition` collision (linchpin)

The orchestrator-confirmed routing freeze (CONTEXT defect #1) is at root an
**animation-vs-transition timing collision** with an a11y-visible consequence.

- `demo/layout/AppShell.vue:404-410` wraps `<RouterView>` in `<Transition name="fade-slide">`
  keyed `:key="route.fullPath"`, DEFAULT mode (no `out-in`).
- The entering page root is `demo/stories/StoryPage.vue:71-72`
  `<article class="scroll-build story-page-article …">`.
- `.scroll-build`'s children fire `animation: gl-page-build … both` on mount
  (`src/styles/scroll-choreography.css:115-127`); the `both` fill + `from { opacity: 0 }`
  (L103-107) means the page parts hold **opacity 0** during the `animation-delay` window
  (staggered `--scroll-build-step * --i`).
- `.fade-slide-enter-active` adds a `transition` whose transform leg runs the LONG
  `--spring-smooth-duration` (`transitions.css:23-26`); the leave leg runs `--duration-fast`
  (≈0.16s, L28-31).

Vue's `<Transition>` reads transition-end timing off `getTransitionInfo` (the longer of
`transitionDuration`/`animationDuration`). The entering `.scroll-build` element exposes
both an animation AND a transition; auto-type detection mis-fires, the leave `transitionend`
on the OUTGOING node is not awaited correctly, and with `:key` + default mode the new node
mounts while the old is still present → `<main>` childCount 2→3, stale heading. The page
parts of the NEW node are simultaneously stuck at `gl-page-build`'s `from { opacity: 0 }`
fill → invisible new page UNDER a stale old page. **This is the perf-visible (extra paints,
two coexisting page trees) AND a11y-visible (the SPA never announces the new route; focus
stays on the dead page; screen-reader users get nothing) linchpin.**

### F2 — `useBloomUp` "find first non-skeleton child" hack + two no-op `startViewTransition` watchers (contrivance, perf cost)

- `AppShell.vue:279-303` — a `watch(() => route.fullPath)` that, on a skeleton→content
  swap, does `[...main.children].find(c => !c.classList.contains('section-landing-skeleton'))`
  and calls `bloomRouteContent()`. This DOM-spelunking hack races the very `<Transition>` in
  F1 (during the transition BOTH children coexist, so "first non-skeleton" is ambiguous) and
  is the kind of contrivance the cardinal laws forbid.
- `AppShell.vue:212-228` — the category-switch `startViewTransition(() => { …dataset write… })`
  whose body is "intentionally a no-op write." A View-Transition whose update callback does
  no DOM mutation is a wasted snapshot/composite on every category change (Chrome captures
  the whole viewport twice for nothing) and **no-ops entirely on Safari** (no VT API) — a
  pure-Chrome perf cost with zero Safari payoff.
- `AppShell.vue:127-136` — `toggleShellMorph` wraps the orientation swap in a SECOND
  `startViewTransition`. Same Chrome-only snapshot cost.

### F3 — The in-situ morph stage is a modal WITHOUT a focus trap (a11y) AND a broken Esc (a11y) — defect #13

`AppShell.vue:497-719` renders `role="dialog" aria-modal="true"` (L502-503) but:
- There is **no `<FocusScope>`** (the shipped `@mkbabb/glass-ui/focus-scope` host) and no
  `inert` on the background. Focus is free to tab out of the "modal" into the live shell
  behind it — a WCAG 2.4.3 / aria-modal contract violation (an `aria-modal="true"` dialog
  MUST trap focus).
- The Esc handler is `@keydown.esc="closeMorphStage"` on the **non-focusable container `<div>`**
  (L499-505). A `<div>` with no `tabindex` never receives keydown unless a descendant control
  is focused AND the event bubbles — but the morph stage opens with nothing auto-focused, so
  the first Esc reaches `document`, not this div. This is the literal "esc doesn't work" of
  defect #13.
- The `useDockOrientationMorph` driver, the VT-default vs liquid-teardrop fork, the two
  synthetic dock topologies, and the goo `<filter>` mount (L616-639) are ~220 lines of
  modal-demo machinery the user explicitly wants DELETED — replaced by an in-place dock
  morph button (defect #13 directive).

### F4 — The red/maroon dock cast is `--cartoon-ink`'s chroma floor × deep-L collapsing to red (defect #3)

- `src/styles/tokens/shadow.css:107`:
  `--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h)`.
  `--foreground` is the warm-amber ink (OKLab hue ≈ 62-75°). Forcing L→[0.14,0.18] AND
  chroma→`max(c, 0.11)` produces `oklch(0.16 0.11 ~70°)` — at that low lightness the warm
  hue reads as a **deep red-brown/maroon**, exactly the "intense red drop-shadow" halo.
- It is stamped on EVERY card via `.cartoon-cast` (`cards.css:359-381`,
  `box-shadow: var(--shadow-cartoon-md)` = three `-Npx Npx 0 var(--cartoon-ink-*)` offset
  rungs, `shadow.css:124-127`) AND on the dock plate via
  `dock/shape.css:217-240` (`.glass-dock > .cartoon-cast { box-shadow: var(--shadow-cartoon-md) }`,
  deepening to `--shadow-cartoon-lg` `[data-punching]`). GlassDock emits the cast child at
  `GlassDock.vue:606` `<span class="cartoon-cast" aria-hidden="true">`. The cast travels
  DOWN-LEFT (negative-X/positive-Y translate, `cards.css:370-373` and `dock/shape.css:231`)
  → the red halo on the LEFT/BOTTOM of docks the user reports.
- The "aliasing in the bottom-left corner of docks" and "card corners do not clip" are the
  same family: the cast is a `z-index:-1` child with `border-radius: inherit` (`cards.css:363`),
  but the dock plate's own `contain: paint` + `backdrop-filter` + `overflow` clip
  (`GlassDock.vue:540`) interacts with the offset hard-edge (`0px` blur) stamp at the corner
  → a visible rectangular/red seam where the stamp's hard edge meets the clipped plate.

### F5 — The metallic field is a high-chroma CSS gradient stack with a per-frame compositor drift (defect #2, #5) — but it is the GL-BUDGET-CORRECT "aurora everywhere"

- `src/styles/paper.css:138-183` — `.paper-field` is a 6-layer stack: a `conic-gradient`
  cel-sheen (L151-157) + 4 high-chroma radial-gradients (amber/terracotta/sand, chroma up to
  0.155, L161-181) + the `--neutral-0` floor. Over it rides `.paper-underpaint`
  (`feTurbulence` speckle @ `--paper-grain-opacity` 0.22, L48-59) with `mix-blend-mode: multiply`.
  The conic cel-sheen + the speckle multiply = the "brown woven metallic wash" the user calls
  disgusting. The "aberrative bar at the top of every page" (defect #5) is the conic-gradient's
  hard `from -45deg at 78% 22%` sweep edge (L151-152) clipping the viewport top band.
- `paper.css:226-238` — `.paper-field::before` animates `translate/scale/rotate` over a 42s
  `field-cel-drift` loop with `will-change: transform`. This is a **persistent full-viewport
  compositor layer animating forever** — a real battery/GPU-memory cost on every route (it is
  PRM-gated at L258-263, good, but it is the default-on motion). `content-visibility: auto`
  (L237) helps when scrolled away, but the field is `position: fixed inset: 0` so it is never
  offscreen.
- **The CRITICAL architecture fact:** the field is the DELIBERATE GL-budget-safe "aurora
  everywhere." `SectionLanding.vue:52-71,125-129,227-231` paints `auroraFallbackGround` (a
  10×10 `data:`-URI raster, "ZERO GL-capable elements," "NO canvas") — the storybook ALREADY
  decided that aurora-on-every-page must be a CSS/raster fake, not a live WebGL context,
  precisely to honor the one-GL-context-per-route budget. The user now hates the FAKE's
  metallic execution and wants a real aurora look. This is the central reconciliation (see
  §AURORA-VS-BUDGET).

### F6 — The scroll-shrink card register is dead because its host (ScrollCard) is not the route page (defect #4)

- `ScrollCard.vue` owns the `.card-scroll-host` scroll-port + the `--card-scroll` named
  timeline; `CardHeader shrink` / `ScrollCardHeader` carry the `card-*-shrink` compositor
  lanes (verified present). The register is INTACT in `src/`. But the storybook's PAGE titles
  (StoryHero/StoryPage hero) shrink via the page scroll, not a `ScrollCard` — the route
  scroller is `<main class="demo-main-scroller">` (`AppShell.vue:381-383`), and StoryPage's
  hero (`story-hero-shrink`, `StoryPage.vue:126`) reads a DIFFERENT timeline than the
  card register. When the route-transition freeze (F1) leaves the page mid-mount, the
  scroll-timeline never arms (the page never reaches a scrollable settled state) → the
  title-shrink reads dead. The register's deadness is DOWNSTREAM of F1, not an independent
  CSS bug — but it must be re-validated once F1 is fixed.

### F7 — The `prefers-reduced-transparency` / PRM coverage of the new BD surfaces is partial

- GOOD: `paper.css:265-276` zeroes `--field-intensity` + grain opacity under
  `prefers-reduced-transparency: reduce`; `paper.css:258-263` freezes the drift under PRM;
  `a11y-overrides.css:6-31` carries the library-wide PRM transform-snap + the `[data-allow-motion]`
  override (accessibility-absolute). `cards.css:387-393` and `dock/shape.css:241-249` zero
  the cartoon-cast travel under PRM.
- GAP: the morph-stage overlay enter/exit (`AppShell.vue:851-859`) is "PRM-gated by the global
  motion gate" per the comment, but it is a plain `transition: opacity` — under PRM the
  `a11y-overrides.css:13-16` block KEEPS opacity transitions (shortened to 0.1s), so it is
  fine; no action.
- GAP: the dock's `useGlassBackdropLuminance` is well-budgeted (≤4Hz / 250ms,
  IntersectionObserver-gated, PRM→single-mount-sample —
  `useGlassBackdropLuminance.ts:37-41,85,103`). When a real live aurora replaces the CSS field
  behind the dock (the user's directive), this observer's `drawImage + getImageData`
  downsample of the KNOWN background `<canvas>` becomes the live-aurora path it was BUILT for
  — no new cost, but it must be wired to the new shell-aurora canvas, not the dead raster.

### F8 — Cross-engine fences are mostly intact; two live-risk surfaces

- INTACT: every `backdrop-filter: url(#…)` / `filter: url(#…)` goo path is `@supports`-gated
  (`glass-refract.css:106` `@supports (backdrop-filter: url("#glass-refract"))`;
  `CarouselContent.vue:559`, `PagerDots.vue:468` `@supports not (filter: url(#…))` fallbacks;
  `GooFilter.vue:17` uses REGULAR `filter: url()` not `backdrop-filter:url` per WebKit bug
  245510). `contrast-color()` is `@supports (color: contrast-color(white))`-gated
  (`ladder.css:313`). `light-dark()` carries the plain `.dark` per-mode fallback floor
  (`dark-arm.css:9-10`) and the inset-shadow trap is documented + avoided
  (`glass-capsule.css:25-26`). The warm field is pure compositor CSS with explicit
  `oklch(L C H / 0)` 0-alpha stops (NOT bare `transparent`) to dodge the WebKit
  premultiply-toward-black desaturation hole (`paper.css:118-121`) — correct.
- RISK 1 (Safari): the morph stage's liquid-teardrop preview uses an inline SVG
  `filter: url(#shell-dock-morph-goo)` (`AppShell.vue:616-637`, applied via
  `--dock-bridge-goo-filter` regular `filter`, not `backdrop-filter` — Safari-safe) but it is
  demo-modal machinery slated for deletion (F3); moot.
- RISK 2 (Safari): the `view-transition-name: shell-dock-morph-stage` on
  `AppShell.vue:843` + the two no-op VT watchers (F2) are pure-Chrome; on Safari they are
  dead declarations (harmless) but the category-switch crossfade the user SEES on Chrome will
  be ABSENT on Safari → an inconsistent cross-engine route experience. The fix is to make the
  route transition ONE engine-agnostic CSS path (F1's gestalt fix), not a VT-on-Chrome /
  nothing-on-Safari fork.

### F9 — Performance gates are present but the live perf is unmeasured against the broken surface

- `proof:lighthouse` (`scripts/proof-lighthouse.mjs`) reads `floor.baseline.json`
  (`provisional: false`, baselined 2026-06-20 at the BC achieved numbers: desktop perf ≥96,
  mobile ≥69-73, CLS ≤~0.088 desktop / ≤~0.19 mobile). These floors were pinned BEFORE the BD
  4.2.0 redesign — the persistent metallic field's forever-drift layer + the per-card cartoon
  cast + the route-freeze double-paint were NOT in the surface when the floor was set.
  **The floor is stale against the 4.2.0 surface and likely RED on mobile perf/CLS now.**
- `profile:budget` (`scripts/profile-bundle.mjs`) carries the critical-path-weight arm (the
  root barrel eager graph reaches ZERO of {WebGL substrate / GL shader strings / value.js
  leaf}, L20-23) + per-WebGL-chunk gzip ceilings. INTACT structurally.
- `proof:offscreen-pause` (the rAF-park seam) is INTACT for the GL substrates. But the CSS
  `.paper-field::before` drift is NOT a substrate — it has no rAF park, only `content-visibility`
  + PRM. On a `position: fixed` field that is never offscreen, it runs forever (F5).

---

## ROOT CAUSES (gestalt, first-principles)

1. **The route-transition layer over-contrives FOUR mechanisms where ONE belongs**
   (`<Transition fade-slide>` + `.scroll-build` mount-animation + `useBloomUp` find-child +
   two no-op VT watchers). They COLLIDE (F1) because two of them (a CSS `transition` and a CSS
   `animation`) target the same entering element, defeating Vue's transition-end detection. The
   first-principles fix is ONE coherent route transition that does not mix `animation` and
   `transition` on the same node and does not DOM-spelunk.

2. **The cartoon-cast ink register is mathematically mis-tuned for the warm identity** (F4):
   `clamp(0.14, l, 0.18)` × `max(c, 0.11)` on a warm hue is a red-maroon by OKLCh geometry,
   not a neutral cel ink. The fix is a hue-and-chroma-aware ink that stays a warm DARK
   (low-chroma at low-L, or a neutralized warm-brown), and a soft (non-0px-blur) edge so the
   hard stamp does not alias at the clipped dock corner.

3. **The "aurora everywhere" was implemented as a metallic CSS gradient fake to dodge the
   GL budget** (F5) — the right INSTINCT (one-GL-per-route), the wrong EXECUTION (a conic
   cel-sheen + multiply speckle reads metallic, and a forever-drift compositor layer is a perf
   cost). The fix reconciles the budget with the directive: ONE persistent, shared,
   offscreen-park-disciplined live aurora SUBSTRATE owned by the shell (not per-route), with
   the per-route hue threaded into it — not 50 live contexts, not a metallic gradient.

4. **The PRM/PRT/forced-colors carves are 90% present but the new modal-demo machinery skipped
   the focus-trap contract** (F3) — a `role="dialog" aria-modal` with no `<FocusScope>` and a
   keydown on a non-focusable div. The fix deletes the modal entirely (the user wants an
   in-place dock button), which removes the a11y debt at the root rather than patching it.

---

## PROPOSED WAVES

### BG.W-ROUTE-TRANSITION — ONE coherent, idiomatic route transition (folds defects #1, #9, #4-downstream)
- **Intent:** Replace the four-mechanism route layer with ONE engine-agnostic transition that
  unfreezes routing and works identically in Chrome and Safari.
- **Approach:** Remove the `animation`-on-mount `.scroll-build` from the route PAGE ROOT (keep
  `.scroll-cascade`'s scroll-driven `view()` register for IN-PAGE content reveal — it does not
  collide with `<Transition>`). Drive the page enter/leave with a SINGLE `<Transition>` whose
  recipe uses ONLY `transition` (never an `animation`) so Vue's transition-end detection is
  unambiguous; use `mode="out-in"` OR an explicit `:css="false"` JS hook that resolves on
  `transitionend` so the leaving page is guaranteed unmounted before the new one paints. Delete
  the `useBloomUp` find-first-non-skeleton-child hack (`AppShell.vue:279-303`) and BOTH no-op
  `startViewTransition` watchers (L212-228 morph + the category dataset write). The route page
  build (chrome→hero→body assembly) becomes the SAME `<Transition>`-staggered enter, not a
  parallel mount-animation. Re-validate the scroll-shrink title register (F6) once routing is
  unfrozen.
- **Files:** `demo/layout/AppShell.vue`, `demo/stories/StoryPage.vue`,
  `src/styles/scroll-choreography.css` (the `.scroll-build` mount-animation), `src/styles/transitions.css`.
- **π bar:** click nav link → URL changes AND `<main>` childCount stays at the post-transition
  count (old page unmounted) AND the new heading renders AND focus moves to the new page; both
  Chrome and Safari; PRM keeps the fade, drops the transform.
- **Folds:** the routing-freeze linchpin; the cross-engine route inconsistency (F8 RISK 2).

### BG.W-SHELL-AURORA — ONE shared live aurora substrate, GL-budget-honest (folds defects #2, #5)
- **Intent:** Deliver the user's "every page has an aurora" as ONE persistent, shared, live
  WebGL aurora owned by the shell — replacing the metallic `.paper-field` — without violating
  the one-GL-context-per-route budget.
- **Approach:** Mount ONE `<Aurora>` at the shell root (`AppShell.vue`, where `<PaperBackdrop field>`
  is today) behind all routes. It is the SINGLE live GL context the budget allots, owned by the
  shell, not re-created per route — so navigation does not churn GL contexts. Thread the
  per-route `fieldHue` (`AppShell.vue:236-238`, the `warmFieldHue(category)` source) into the
  aurora's palette so each category re-tints the ONE field (a uniform/palette swap, not a new
  context). The aurora composes the SHIPPED offscreen-park + PRM-freeze + `dispose()` discipline
  (`useAurora` already does `useIntersectionPause` + `WEBGL_lose_context` — verified). DELETE the
  `.paper-field` metallic gradient stack (`paper.css:94-218`) and the forever-drift
  `.paper-field::before` (L226-253). Routes that mount their OWN live GL (the /substrates studios)
  must SUPPRESS the shell aurora while active (a `data-route-owns-gl` flag the shell reads →
  pause/hide the shell context) so the budget stays ONE-live-context-per-route. The aberrative top
  bar (defect #5) dies with the conic cel-sheen.
- **Files:** `demo/layout/AppShell.vue`, `src/styles/paper.css` (delete the field; KEEP the grain
  underpaint + the `prefers-reduced-transparency` floor), `demo/stories/warm-field.ts`,
  `demo/stories/SectionLanding.vue` (its `auroraFallbackGround` raster can become the shared
  shell aurora's frozen-thumbnail, not a per-card fake), the substrates routes (the GL-ownership flag).
- **π bar:** every route paints the warm live aurora behind the glass; exactly ONE WebGL context
  per route (the shell's, OR a substrate route's own with the shell's paused — never two);
  offscreen tab parks the rAF; PRM paints one static frame then freezes; reduced-transparency
  drops to the calm opaque floor. Lighthouse mobile perf within the re-pinned floor.
- **Folds:** the metallic field, the aberrative bar, the GL-budget reconciliation, F7's
  luminance-observer rewire to the live canvas.

### BG.W-CARTOON-INK-WARM — the cast is a warm dark ink, not a red halo (folds defect #3)
- **Intent:** Re-tune `--cartoon-ink` so the offset cast reads as a warm DARK cel ink (or a soft
  ambient contact shadow on the dock), never a red/maroon halo, and clip cleanly at the corner.
- **Approach:** Replace `oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h)` with a
  hue-stable warm dark that does NOT floor chroma at low-L into red — either drop the chroma floor
  to a value that stays brown-ink at L≈0.16 (e.g. `min(c, 0.04)` so the ink desaturates as it
  darkens, like a real ink film) OR re-anchor on `--shadow-color`/`--foreground` with a small soft
  blur (a non-0px contact blur kills the hard-edge corner alias). For the DOCK specifically, the
  cast is the wrong register — a dock is a floating glass chrome, not a Memphis sticker; replace
  `.glass-dock > .cartoon-cast`'s hard offset stamp with a SOFT ambient drop (the
  `--blob-shadow-ambient` register's language, `shadow.css:157-160`), which clips and reads as
  depth, not a red seam. Card corner clip: ensure the `.cartoon-cast` child + the host
  `border-radius: inherit` + a soft blur compose so no hard rectangular edge shows at the
  clipped corner.
- **Files:** `src/styles/tokens/shadow.css` (the ink + the cartoon-shadow rungs),
  `src/styles/dock/shape.css` (the dock cast register), `src/styles/cards.css` (the card cast soft edge).
- **π bar:** no red/maroon channel on any card or dock cast in either mode (OKLab hue stays in the
  warm-amber band, chroma low at the dark L); the dock bottom-left corner shows no rectangular
  alias; card corners clip; PRM keeps the static stamp, drops travel.
- **Folds:** the red halo, the dock bottom-left aliasing, the card-corner-no-clip (all defect #3).

### BG.W-DOCK-MORPH-INPLACE — the V↔H morph is a dock BUTTON, not a modal (folds defect #13)
- **Intent:** Delete the in-situ modal morph stage; make orientation morph an in-place dock control
  that flips the real shell dock vertical↔horizontal, liquid-teardrop only.
- **Approach:** DELETE `AppShell.vue:490-720` (the entire `demo-dock-morph-overlay` modal, its
  `role=dialog`, the no-focus-trap, the broken Esc, the VT-vs-liquid fork, the inline goo
  `<filter>`) AND the two synthetic-dock topologies AND the `vtOrientation`/`liquidPreview` state.
  Mount ONE morph button IN the shell dock (Sidebar/Bottom) that drives `useDockOrientationMorph`
  on the REAL dock, the liquid-teardrop register ONLY (the user says the crossfade/VT variant does
  not work — remove it). The morph happens IN PLACE on the live dock (the dock already collapses on
  both orientations per CLAUDE.md). No modal → the focus-trap a11y debt (F3) evaporates at the root.
- **Files:** `demo/layout/AppShell.vue`, `demo/layout/{SidebarDock,BottomDock}.vue`,
  `src/components/custom/dock/composables/useDockOrientationMorph.ts` (wire to the real dock),
  `src/styles/dock/morph-bridge.css` (the teardrop).
- **π bar:** the morph button flips the real dock V↔H in place with the liquid teardrop; no modal,
  no Esc-needed; keyboard reaches the button via roving-tabindex; PRM snaps to the target.
- **Folds:** defect #13 + the F3 a11y debt (focus-trap, broken Esc) by deletion.

### BG.W-CONSTRAINT-MANIFEST — the cross-cutting constraint set every BG wave honors (a doc + a gate)
- **Intent:** Record + machine-lock the binding a11y/perf/cross-engine constraints so no BG wave
  regresses them.
- **Approach:** A `docs/tranches/BG/CONSTRAINTS.md` enumerating the §CONSTRAINTS below, plus extend
  the existing gates (`proof:offscreen-pause`, `proof:no-layout-animation`, `proof:lighthouse`
  re-pinned at the post-fix surface) to assert them. Re-pin `floor.baseline.json` via `--rebaseline`
  ONLY after the BG fixes land (the achieved number, never a lowered bar).
- **Files:** `docs/tranches/BG/CONSTRAINTS.md`, `scripts/proof-lighthouse.mjs` (re-pin),
  `scripts/proof-offscreen-pause.mjs` (extend to the shell aurora).
- **π bar:** every BG wave's π cites the relevant constraint; the re-pinned Lighthouse floor is the
  achieved 4.2.0+BG number.

---

## THE CONSTRAINTS EVERY OTHER BG WAVE MUST HONOR

1. **PRM (prefers-reduced-motion: reduce) — fade keeps, transform drops.** Every motion (route
   transition, page build, cartoon cast, field drift, dock morph, aurora) MUST snap its spatial
   leg and KEEP a terminal fade under PRM. The library-wide carve is `a11y-overrides.css:6-31`
   (`[data-allow-motion]` overrides only under full motion; PRM is absolute). No wave may add a
   spatial `transition`/`animation` off the `proof:no-layout-animation` allowlist.
2. **GL BUDGET — ONE live GL context per route.** The shell owns the ONE persistent aurora; a route
   that mounts its OWN live GL (the /substrates studios) MUST suppress the shell context while active
   (never two live contexts on screen). Every live GL surface MUST compose the offscreen-park +
   PRM-freeze + `dispose()` substrate (`proof:offscreen-pause`). No CSS "aurora fake" that animates a
   forever compositor layer (`will-change: transform` on a `position: fixed` plane is forbidden).
3. **Safari (no VT API, WebKit bug 245510).** `backdrop-filter: url()` is forbidden (use regular
   `filter: url()` like `GooFilter`); every `filter: url()`/`backdrop-filter: url()` goo path stays
   `@supports`-gated with a non-goo fallback floor. `view-transition-name` and `startViewTransition`
   are NOT the route-transition mechanism (they no-op on Safari → inconsistent cross-engine UX) — the
   route transition is ONE engine-agnostic CSS path. Every 0-alpha gradient stop is an explicit
   `oklch(L C H / 0)` warm color, never bare `transparent` (the WebKit premultiply hole).
   `light-dark()` never carries an inset-shadow fragment (the trap); plain per-mode `.dark` arms only.
   `contrast-color()` stays `@supports`-gated progressive enhancement over a load-bearing
   declarative floor.
4. **CLS ≈ 0.** No layout-property animation in `@keyframes`/`transition` (`proof:no-layout-animation`);
   the static `min-block-size` desktop-reserve discipline holds. The route transition must NOT leave
   two page trees coexisting (F1's double-paint is a CLS+perf fault).
5. **FOCUS + KEYBOARD.** Any modal/dialog traps focus via the shipped `<FocusScope>` + background
   `inert` and handles Esc on a focusable host (the F3 lesson) — OR is replaced by a non-modal
   in-place control (BG.W-DOCK-MORPH-INPLACE's choice). The dock root stays presentational (no
   `aria-expanded`); roving-tabindex stays on the strips; the WCAG-2.5.5 coarse touch floor
   (`a11y-overrides.css:115-184`) holds.
6. **CONTRAST + WARM IDENTITY.** The warm-chroma floor / warm-ink registers hold; no neutral gray
   leaks; the cartoon ink stays warm (not red); `--muted-foreground` legibility over glass holds
   (the on-glass-fg register); forced-colors restores the focus outline + silhouette border
   (`a11y-overrides.css:78-104`).

---

## AURORA-PER-PAGE vs ONE-GL-CONTEXT-PER-ROUTE — the reconciliation

The directive ("every page should have an AURORA, not the paper wash") and the budget
("one GL context per route") are NOT in conflict once you see the current code's
fork-in-the-road. The 4.2.0 surface already tried to satisfy BOTH by faking aurora with a CSS
gradient stack (`.paper-field`) + raster stills (`auroraFallbackGround`). The fake is what the
user hates (metallic, aberrative bar, forever-drift cost). The gestalt resolution:

- **ONE live aurora, owned by the SHELL, persistent across routes.** A single `<Aurora>` mounted
  once at the shell root is ONE GL context for the WHOLE SPA — it is NOT per-route, so navigation
  does not churn contexts. The per-route hue is a palette/uniform swap into the SAME context
  (`fieldHue` already exists, `AppShell.vue:236-238`), not a new mount. This is strictly WITHIN
  the budget (≤1 live context at all times on non-substrate routes).
- **Routes that own their own GL (the /substrates studios) suppress the shell aurora.** A
  `data-route-owns-gl` contract: when a route mounts its own live GL field, the shell pauses/hides
  its aurora so the count stays exactly ONE live context per route. The shell aurora resumes on
  navigation away. The offscreen-park substrate (`useIntersectionPause` + `WEBGL_lose_context`,
  verified in `useAurora`) makes the pause cheap and correct.
- **The CSS field dies; the grain underpaint + the PRT floor stay.** `.paper-field`'s metallic
  gradient stack and forever-drift `::before` are DELETED (BG.W-SHELL-AURORA). The calm grain
  underpaint (`paper.css:48-66`) + the `prefers-reduced-transparency` opaque floor
  (`paper.css:265-276`) survive as the legibility floor when the aurora is paused/unsupported.
- **The dock luminance observer rewires to the live canvas.** `useGlassBackdropLuminance`'s live-canvas
  `drawImage + getImageData` path (≤4Hz, IO-gated) was BUILT for exactly "a dock over a live aurora"
  — it now samples the real shell aurora canvas instead of the dead raster, at zero new cost.

This is the union, not a bolt-on: one shared substrate, the budget honored by ownership +
suppression, the directive satisfied by a real (not faked) aurora everywhere.
