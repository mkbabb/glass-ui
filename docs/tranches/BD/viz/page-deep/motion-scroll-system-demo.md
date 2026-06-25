# Pass-E deep audit — `motion/scroll-system`

- **Page**: Scroll System
- **SFC**: `demo/stories/motion/scroll-system.vue`
- **Live**: http://localhost:5173/motion/scroll-system
- **Import label (chip)**: `@mkbabb/glass-ui/motion-core`
- **Composables demoed**: `useScrollTrigger` (`src/composables/motion/useScrollTrigger.ts`), `useScrollChrome` (`src/composables/motion/useScrollChrome.ts`)
- **Background**: a faint near-white `constellation` canvas (the manifest comment claims `grid`; the live page shows a constellation-canvas field — `manifest.ts:1071`). Either way it is a low-chroma whisper, NOT a colorful aurora.

---

## VERDICT SUMMARY

A thin, documentation-flavored exerciser of a NON-VISUAL composable family, rendered FLAT (no colorful field, no glass suffusion, no real glass-ui component series). The headline `progress` readout is **structurally dead** on every native-scroll-timeline engine (Chrome/Safari/FF current), and under all programmatic drive the entire live readout + onCross log stays at zero. Three sections share ONE outer card (not one-card-per-section); the main area is reasonably wide but the demos themselves are gray slabs.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the FULL API?

**Partial / weak.** `useScrollTrigger` exposes `progress`, `direction`, `velocity`, `recalculate`, plus `onCross`/`onEnter`/`onLeave` and a 3-shape `TriggerPoint.at` (px · `{fraction}` · `{element}`). The demo declares all three `at` shapes (`scroll-system.vue:33-37`) — good — and surfaces `progress`/`direction`/`velocity` + the log + `recalculate`. BUT:

- **`onEnter`/`onLeave` are never demonstrated** — only `onCross` is wired (`:47`). Two-thirds of the discrete-event API is invisible.
- **The `progress` readout is a permanent `0%`** (see §7 BUG-1) — the single most prominent number on the page is dead by construction on the engines the demo runs on.
- `useScrollChrome` is the stronger half: it exercises `collapseT`, `collapsed`, `direction`, `velocityGate`, `collapseRangePx`, `chromeRef`, `collapseOnScroll:true` (`:68-73`). This is the closest the page gets to a real, best-foot-forward demo — a floating header that shrinks on scroll is exactly the iOS-27 large-title collapse the dock band lives on. But it too is undriveable programmatically (§7 BUG-2) and reads as gray-on-gray.
- **No contextual-switching / dock-morph API is shown** despite the prompt's north star. `useScrollChrome` is literally the machine the dock + page-header collapse consume (`useScrollChrome.ts:1-9`), yet the demo shows a generic `<header>` div, NOT a `<GlassDock>` collapsing — the natural, highest-value demo is missing.

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**No — thin/flat.** The page composes ZERO first-class glass-ui components. The entire surface is raw utility divs:
- `glass-card` / `glass-quiet` raw classes (`:112, :122, :136, :228`) — CSS recipes, not components.
- Readouts are hand-rolled `<span class="text-admin-label rounded-pill border ...">` pills (`:94-102, :191-199`), not `<MetricBadge>`/`<MetricPill>`/`<StatusDot>`.
- The log is a bare `<ul><li>` (`:155-164`).
- Buttons are bare `<button class="...">` (`:141, :165`), NOT `<Button>`.

No `<GlassDock>`, no `<SegmentedTabs>`, no procedural-anim, no `<Card>`/`<ShowcaseFrame>`. For a page that should "deftly use a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" this is the flattest possible composition.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**Fail.** The glass is demoed over a near-white constellation whisper, so the six-layer optical composite cannot read — `glass-card`/`glass-quiet` collapse to flat gray slabs (visible in every screenshot: the content rows are mid-gray rectangles with no transmission, no rim catch-light, no tint shift). Glass-cannot-sample-glass is moot because there is nothing colorful behind to sample. PAPER morphism: the `constellation`/`paper-underpaint` substrate is present but inert as a design event — no `.paper-ink-mark`, no paper-grain specimen, no editorial paper register. The page demonstrates a SCROLL composable but squanders the chance to show glass morphism the prompt mandates.

## (4) STRUCTURE — one glassy card per sub-section? main area BIG enough?

**Fail on the per-section bar.** All three `<StorySection>`s flow inside ONE outer `StoryHero` glass card, separated by `--configurator-divider` hairlines (`StoryPage.vue:166-177`, `story-sections--delimited`). The user's explicit bar is "each sub-section in its OWN glassy card" — this page is the hairline-delimiter mode, NOT the per-card mode. The inner `glass-card`/`glass-quiet` ports are demo CONTENT, not section containers.

**Main area**: bounded to `--story-page-max-inline` (the standardized story width). It is wide but the demo ports are fixed `h-[24rem]`/`h-[26rem]` (`:112, :205`) — adequate, not generous. The prompt asks for "BIGGER, more screen space"; the outer card has generous left/right whitespace that could be reclaimed.

## (5) PATH-LABEL standardization

**Pass (chip), minor inconsistency (import style).** The on-page chip reads `@mkbabb/glass-ui/motion-core` (manifest `:312`) and matches this page's subpath — correct. The SFC imports the relative `../../../src/composables/motion/core` barrel (`:24-25`), which maps to that published subpath. Note: sibling motion-core pages import individual LEAF files (`scroll-vt` → `../useViewTransition`/`../supportsCssTimeline`; `reveal` → `../vReveal`/`../useLiquidReveal`) rather than the `core` barrel — a cosmetic import-STYLE divergence, not a published-label one. The published chip is consistent; no action required for the label itself.

## (6) LANGUAGE — superfluous prose to tighten?

**Yes, heavy.** The demo prose over-explains in the house run-on style:
- `:80-90` — the intro `<p>` packs "the dual-path single-writer", "rAF-coalesced read", "`flipDeltaPx = 8` anti-thrash" — internal-architecture jargon a demo viewer does not need.
- `:177-187` — the `useScrollChrome` blurb is 6 lines restating the docstring ("never frozen half-collapsed", "the box never reflows", "PERSISTENT by default — `collapseOnScroll: true` is the explicit opt-in").
- The inner row copy repeats the instruction verbatim 14× / 20× (`:126-127, :231-234`).
- The SFC header comment (`:1-17, :59-65`) is fine as code doc but the on-screen text mirrors it. Tighten to one plain sentence per section ("Scroll the port — the readout and log update live.").

## (7) BUGS

- **BUG-1 (HIGH, structural): `progress` readout is permanently `0%`.** `useScrollTrigger` gates the JS `progress` writer behind `if (trackProgress && !NATIVE_SCROLL_TIMELINE)` (`useScrollTrigger.ts:207, :286`). On any engine with `animation-timeline: scroll()` (confirmed `CSS.supports(...) === true` on this Chrome), the JS writer attaches NOTHING and `progress.value` stays `0`. The demo binds `progressPct = Math.round(progress.value*100)%` (`:52`) and renders it as the FIRST readout pill (`:94-96`). So the headline number reads a permanent `progress 0%` for every modern visitor — the dual-path single-writer's native ramp drives the CSS `--scroll-t`, but the demo never reads THAT; it reads the dead JS ref. **Fix**: either read the native `--scroll-t` custom for the readout, or set `trackProgress` to read a JS value unconditionally for the demo, or label the pill as "native-ramp (CSS-driven)" and remove the misleading number.
- **BUG-2 (HIGH, observed): the live readout + onCross log do not update under programmatic drive.** Real scroll events dispatched on the port (3+ caught by an independent listener), plus `scrollTop` writes and `WheelEvent` sequences, produced ZERO change: `progress 0%`, `direction —`, `velocity 0 px/s`, `onCross log` empty. The reader is attached (events reach the port) but the readout never reflects them. Needs a manual wheel/trackpad confirm — but combined with BUG-1 this means at least the `progress` pill is dead, and direction/velocity/log are at minimum un-verifiable and likely require real user input (a demo that only "works" under a human finger is a weak demo). At least one of {direction, velocity, onCross} should visibly tick on the first scroll.
- **BUG-3 (MEDIUM): the `glass-quiet` content rows are flat gray** over the near-white field — not a bug in code, but the gestalt failure of §3 (no live field to transmit). On the dark register these read as a charcoal band (the W-DARK-MATERIAL whisper-collapse class).

---

## RECOMMENDED REDESIGN (architectural, not patch)

1. **Live colorful field** — put the demo ports over a real `<Aurora>` (DockStage pattern) so `glass-card`/`glass-floating` read as liquid glass with rim + catch-light + tint.
2. **One card per section** — split the three `<StorySection>`s into three discrete `<ShowcaseFrame>`/glass cards (the user bar).
3. **Make the chrome-collapse demo a REAL `<GlassDock>`** collapsing via `useScrollChrome` (the actual consumer) — this is the dock-API leverage the prompt wants and the composable's literal purpose.
4. **Fix the `progress` readout** to read the native `--scroll-t` ramp (BUG-1) so the headline number is alive on the engines people use.
5. **Demonstrate `onEnter`/`onLeave`** (e.g. a section that highlights when its region is entered) so the full discrete-event API shows.
6. **Compose real components** for the readouts (`<MetricBadge>`/`<StatusDot>`) and controls (`<Button>`), not raw pills/buttons.
7. **Tighten prose** to one plain sentence per section.
