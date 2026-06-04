# AS.W7 · W3 — Cluster H1 harden: dock scroll-on-overflow + demo shell scroll (D2, D12, D3)

ADVERSARIAL verification of the Wave-2 fixes (96858c8) for the H1 cluster, plus
conservative hardening scoped to the cluster's files. Measured live against the
running demo (`:5173`, HMR) via Playwright at the viewports each defect
manifests, light + dark, plus keyboard / RTL / reduced-motion edge cases.

Files in scope: `src/styles/dock.css`,
`src/components/custom/dock/GlassDock.vue`,
`demo/layout/{AppShell,CategoryRail,StoryPager}.vue`.

---

## Headline regression found and fixed — the demo never engaged the library fix

The Wave-2 LIBRARY work is correct and well-tested: `GlassDock` gained a typed
`overflow?: "grow" | "scroll"` prop, the `scrollClass` computed derives
`dock-scroll-x` / `dock-scroll-y` from `orientation`, and `dock.css` ships the
matching scroll-port rules. The unit test
(`GlassDock.scroll-overflow.test.ts`, 5 cases) passes.

But **the two demo consumers were wired with the WRONG prop name**, so D2 and
D12 were NOT actually fixed in the running demo despite the green tests:

- `demo/layout/CategoryRail.vue:31` passed `scroll-on-overflow` (a boolean).
- `demo/layout/StoryPager.vue:43` passed `scroll-on-overflow` (a boolean).

`GlassDock` has no `scrollOnOverflow` prop — the W1 fix spec
(`W1-A2-dock-sidebar.md:79`) floated TWO candidate names
(`scrollOnOverflow?: boolean` / `overflow?: "grow" | "scroll"`); the library
shipped the `overflow="scroll"` form, the demo got wired with the OTHER one.
`scroll-on-overflow` is a valid kebab HTML attribute, so Vue passed it through
to the root `<div>` as a dead attribute — `scrollClass` stayed `null`, the
`.dock-scroll-{x,y}` classes were never applied, and the docks kept overflowing.
`AuroraConfigDock.vue:60` was the only consumer that used the correct
`overflow="scroll"`.

**This is the canonical silent-no-op class** (stale prop binding that
vue-tsc + units do not catch — unknown attrs fall through on a component root;
only live-DOM / e2e catches it). Confirmed live at 1024×768 BEFORE the fix:

| element | hasScroll class | overflow | scrollW/H | clientW/H | dead attr on DOM |
|---|---|---|---|---|---|
| `.story-pager-dock` (D2) | `dock-scroll-x` = **false** | visible | 1472 | 893 | `scroll-on-overflow` present |
| `.dock-layer--full` (D2) | — | **visible** | 1464 | 1464 | min-width:auto |
| `.glass-dock.variant-rail` (D12) | `dock-scroll-y` = **false** | **visible** | 714 | 611 | `scroll-on-overflow` present |

Fix: renamed both bindings to `overflow="scroll"`
(`CategoryRail.vue:31`, `StoryPager.vue:43`). AFTER the fix, live at 1024×768:

| element | hasScroll class | overflow | scrollW/H | clientW/H | scrolls |
|---|---|---|---|---|---|
| `.story-pager-dock` (D2) | `dock-scroll-x` = **true** | — | — | — | yes |
| `.dock-layer--full` (D2) | — | **auto** (min-width:0) | 1460 | 877 | scrollLeft → 583.5 |
| `.dock-layers` (D2) | — | **hidden** (pill masks edge) | — | — | — |
| `.glass-dock.variant-rail` (D12) | `dock-scroll-y` = **true** | **auto** | 722 | 611 | scrollTop → 110.5 |

No `scroll-on-overflow` typo remains anywhere in `demo/` or `src/`
(grep clean). `AuroraConfigDock.vue` already correct, re-verified live (vertical
`dock-scroll-y` engages + scrolls).

---

## Per-defect verdicts (live-measured)

### D2 — horizontal nav/story-pager dock scrolls at narrow widths · HOLDS (after binding fix)
At 1024w, route `/foundations/paper-glass`: the StoryPager carries 13 tabs
(`scrollWidth 1460`) inside an `877px` port. `.dock-layer--full` becomes the
scroll port (`min-width:0; overflow-x:auto; scrollbar-width:none`),
`.dock-layers` clips (`overflow-x:hidden`) so the rounded pill masks the edge,
and the pill right edge sits at 1002 (in-bounds at vw 1024 — no viewport burst).
Programmatic `scrollLeft = 9999` lands at 583.5 → genuinely scrollable by
wheel / trackpad / drag (native `overflow:auto`).

### D12 — vertical rail scrolls all items at short viewports · HOLDS (after binding fix)
The rail carries 15 buttons (wordmark + 13 categories + Blob flat-story; D11
added Blob). At a `460px` block cap (simulating a 600px-tall viewport): content
`722px` clips to a `457px` port, `overflow-y:auto` engages, `scrollTop = 9999`
lands at 110.5, and the LAST button ("Blob") becomes fully in-view after scroll
(`lastBtnVisibleAfterScroll: true`). Cap preserved (`max-block-size` honored);
rail box never exceeds `min(80vh, 48rem)`.

### D3 — `<main>` owns route scroll + resets to top on navigation · HOLDS
`<main>` (`AppShell.vue:83-86`) is the route scroller
(`overflow-y:auto; flex-1; min-h-0`), `scrollHeight 1615 > clientHeight 701`.
The shell is the fixed viewport frame (`h-screen overflow-hidden`). Reset-on-nav:
scrolled `main.scrollTop = 350`, performed a client-side SPA route change
(`/foundations/paper-glass` → next story), and the `watch(() => route.fullPath)`
in `AppShell.vue:35-40` reset `main.scrollTop` to **0**. Confirmed
`mainScrollTopAfterNav: 0`.

### Edge: keyboard focus scrolls a clipped tab/button into view · HOLDS (native, no shim)
Focusing the last (clipped) rail button auto-scrolled it into the rail viewport
(`railScrollTopAfterFocus: 110.5`, `railFocusedBtnInView: true`); focusing the
last (clipped) pager tab auto-scrolled it inline
(`pagerScrollLeftAfterFocus: 583.5`, `pagerFocusedTabInView: true`). The
browser's native "scroll focused descendant into view" handles BOTH axes for
free because the scroll port is a real `overflow:auto` element. No JS
focus-into-view composable is needed — the elegant outcome.

### Regression: default `overflow="grow"` path unchanged for non-overflowing docks · HOLDS
On `/compositions/dock-with-slider`, the three composition `<GlassDock>`s (the
dock-with-slider story docks) all stay grow-mode: `dock-scroll-x/y` absent, root
`overflow:hidden` (the non-container-host default clip),
`.dock-layer--full { overflow-x: visible }`. The scroll class attaches ONLY
where `overflow="scroll"` is explicitly set — the chrome (CategoryRail +
StoryPager) and AuroraConfigDock. No grow-mode consumer changed. The
instrument-strip / rail variants force vertical and only acquire `dock-scroll-y`
when the prop opts in.

### Scrollbar-hidden leaves a usable affordance · HOLDS
`scrollbar-width:none` + `::-webkit-scrollbar{display:none}` hide the bar (house
style), but wheel / trackpad / drag / keyboard all scroll the native
`overflow:auto` port (all four verified). The pill's `border-radius` +
`.dock-layers{overflow:hidden}` mask the scroll edge cleanly (light + dark
captured).

### RTL · HOLDS (no fix needed)
The scroll mode uses physical-axis `overflow-x:auto` / `overflow-y:auto`, which
are direction-aware: under `dir="rtl"` the pager scroll origin flips to negative
(`scrollLeft = -9999` → -583, Chromium RTL semantics) and the port still scrolls
(`movedInRTL: true`). The pill clip is symmetric, so it masks both edges
identically regardless of writing direction. No RTL-specific CSS required.

### Reduced-motion · N/A by construction
The scroll path is motion-neutral: `scroll-behavior: auto` (no `smooth` to
suppress under PRM), and the ports are pure `overflow:auto` with no
motion-gated CSS. Focus-into-view uses the browser's instant scroll. The
existing PRM width-FLIP suppression (utilities.css) is untouched by this work.

---

## Hardening applied (conservative, file-disjoint, CSS-only)

**Scroll-momentum containment** on both scroll ports —
`src/styles/dock.css`:

- `.glass-dock.dock-scroll-x .dock-layer--full` → `overscroll-behavior-x: contain`
- `.glass-dock.vertical.dock-scroll-y` → `overscroll-behavior-y: contain`

Rationale: BEFORE, all scroll ports were `overscroll-behavior: auto`, so a
wheel/trackpad gesture that bottoms out the dock scroll port **chained** into
scrolling the page (`<main>` / the document) behind it — an accidental
page-jump when a user scrolls past the rail or pager end. `contain` traps the
momentum at the dock's own boundary. Zero visual-regression risk (no paint
change, no layout change); scoped strictly to the two scroll-mode classes so
grow-mode docks are byte-identical. Verified live: rail `overscroll-behavior-y:
contain`, pager `overscroll-behavior-x: contain`, both still scroll.

### Affordance NOT added (deliberately) — scroll-shadow / edge mask
The challenge floated an overflow scroll-shadow. I evaluated a scroll-driven
`mask-image` edge fade (the repo's `.scroll-fade-*` idiom +
`@supports (animation-timeline: scroll())` house pattern) and REJECTED it as
too risky for a harden pass:

- A **static both-edge** mask permanently feathers the first/last item even
  un-scrolled — the same chrome-eating failure the D6 spec called out
  ("the scroll-fade no longer eats the first card's chrome"). Unacceptable.
- A **scroll-position-aware** mask is the correct non-chrome-eating form, but
  for the VERTICAL rail it must mask the `.glass-dock.vertical` ROOT — which
  also carries the `::after` grain overlay, the `::before` bezel
  (instrument-strip), the glass background, and the border. A root `mask-image`
  would clip those surfaces, a real regression. Masking only `.dock-layer--full`
  (X axis) is safe but masking the root (Y axis) is not, so an asymmetric
  affordance would be inconsistent.

The functional scroll (wheel/trackpad/drag/keyboard) + the pill-masked clean
edge is a usable affordance per house style (hidden scrollbars are used
throughout the dock family). A proper scroll-driven per-edge affordance that
does not touch the root surface is a deliberate, well-scoped follow-up — logged
to the punch-list, not force-fit into a harden pass.

---

## Gates

- `npm run typecheck` — clean (before and after).
- `npx vitest run src/components/custom/dock/` — 3 files, 11 tests pass.
- `npm run build` — NOT run (per task constraint).

Note: typecheck does NOT catch the `scroll-on-overflow` binding typo (unknown
kebab attrs fall through on a component root). This is the silent-no-op class —
only live-DOM / e2e catches it. Consider an e2e/structural guard that asserts
the chrome docks actually carry `dock-scroll-{x,y}` (see punch-list).

---

## Punch-list (for the orchestrator)

1. **(fixed here)** Demo prop-binding typo `scroll-on-overflow` → `overflow="scroll"`
   in `CategoryRail.vue` + `StoryPager.vue`. Without this, D2 + D12 were NOT
   fixed in the running demo despite green unit tests.
2. **(guard gap)** No test asserts the chrome docks engage the scroll mode —
   the unit test only checks the SFC emits the class for a given prop, not that
   the consumers pass the prop. A 2-line structural/e2e assertion
   (`.story-pager-dock` and `.variant-rail` carry `dock-scroll-{x,y}` when
   overflowing) would have caught the typo. Recommend adding it.
3. **(deferred affordance)** A scroll-position-aware edge-fade affordance that
   masks ONLY the scrollable content (not the rail root surface / pseudos) —
   e.g. a scroll-driven mask on a dedicated inner wrapper, or a `::after`
   gradient overlay gated to overflow. Out of harden scope (regression risk on
   the multi-purpose root); land as its own small change.
4. **(pre-existing, out of cluster)** `<GlassDock variant="rail" aria-label=...>`
   in `CategoryRail.vue:32` puts `aria-label` on the presentational dock root
   (no ARIA role) — a dead attribute (same fall-through mechanism). Per the
   GlassDock aria contract (CLAUDE.md), the rail is a `<div>` with no role, so
   the `aria-label` does not announce. The `<aside>` wrapper should carry the
   nav landmark name instead. Flag to the a11y owner; not touched (out of H1
   scope — H1 is scroll, not a11y).
