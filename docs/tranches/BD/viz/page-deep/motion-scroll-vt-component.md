# Pass-E COMPONENT deep-audit — `motion/scroll-vt`

**Page:** `demo/stories/motion/scroll-vt.vue` (import path label: `@mkbabb/glass-ui/motion-core`)
**Real component(s) demoed:**
- `src/composables/motion/useViewTransition.ts` (`startViewTransition`/`navigate`/`supportsViewTransitions` — AQ.W5 §Design 3, BA.W-ATLAS-RECONCILE A-4b async/PRM-instant)
- `src/composables/motion/supportsCssTimeline.ts` (`supportsScrollTimeline`/`supportsViewTimeline` — AQ.W5 §Design 1b hardened feature-detect)
- `src/styles/scroll-driven.css` (`.scroll-progress` `scroll()` bar + `[data-scroll-reveal]` `view()` reveal + the BC.W-MOTION-PRESETS `[data-scroll-reveal-once]` latch)
- `src/styles/view-transition.css` (`.gl-list-item` group recipe + `--vt-*` tokens)
- composes `Button` (`src/components/ui/button`) + `.glass-card` (the demo plates)

This page is a **CSS-substrate + native-API showcase**, not a paint component. The three "components" are (a) two thin dependency-free predicate helpers and (b) two token-first CSS recipe sheets that the native compositor runs. `startViewTransition` is a ≤20-LOC wrapper over `document.startViewTransition` with an instant fallback; it owns ZERO glass surface and ZERO rAF. That framing governs the verdicts: the procedural-viz and glass-six-layer axes are **non-applicable to the substrate itself** (they bind the `.glass-card`/`Button` it animates and the DockStage aurora the page should ride); the binding axes are MOTION-CANON adherence, PERFORMANCE, SAFARI, IDIOMATIC.

---

## (1) ANIMATION — HIGH affordance? motion-canon adherence?

**Strong substrate, idiomatic, but with two real motion gaps.**

What is correct and exemplary:
- **Compositor-native by construction.** `.scroll-progress` runs a `scaleX(0→1)` keyframe on a `scroll()` timeline; `[data-scroll-reveal] > *` runs a `view()` per-child entry (the implicit stagger — NO setTimeout cascade, motion-canon P5). Zero main-thread rAF/scroll-listener on a supporting engine. This is the SOTA scroll-driven primitive done right.
- **PRM is the OUTER gate** (motion-canon P6): the whole `@supports` block sits under `@media (prefers-reduced-motion: no-preference)`, so under reduce NO scroll animation binds and content paints in its terminal state. The reveal `from`-keyframe never applies. Correct vestibular floor.
- **The VT group rides the spring's OWN settle clock** (motion-canon P4): `::view-transition-group(.gl-list-item)` defaults `animation-duration: var(--vt-duration, var(--spring-bouncy-duration))` + `animation-timing-function: var(--vt-ease, var(--spring-bouncy))` — the per-spring clock, not a generic `--duration-*`. The added/removed `:only-child` members slide (`gl-vt-slide-in/out` couple opacity+`translate`, P3) instead of cross-fading. Idiomatic.
- **The dual-path single-writer is clean** (no double-run): the JS composables gate OFF when `supportsScrollTimeline()` is true (the hardened garbage-probe filters the happy-dom/jsdom always-true shim — a real correctness win), so CSS and JS never both write a target.

**Finding A1 (MAJOR, dead/janky reveal — the wrong register on a calm cascade).** The page's "View-driven reveal" section binds the bare `[data-scroll-reveal]` recipe — a CONTINUOUS `view()` timeline that **re-fires the fade-lift EVERY time a card re-enters the entry range**. In a `h-72 overflow-y-auto` scroll-port (exactly this demo) scrolling up and back replays the entrance on every pass — the "re-plays the fade-lift" defect the BC.W-MOTION-PRESETS `[data-scroll-reveal-once]` latch was built to kill, and that this page does NOT use. Worse: the demo's `--scroll-reveal-rise` is the bare 6px default — a near-flat lift that reads as a nothing-twitch, NOT the iOS-27 squish/fade/settle the DESIGN.md bar (and the new `W-LIQUID-ENTRANCE-GENERAL` wave) mandates. The richer, supersedes-the-bare-reveal register **already ships**: `scroll-choreography.css` `.scroll-cascade` (spring-clocked coupled transform+opacity on a tighter window, the W-SCROLL-MOTION SOTA register that the CLAUDE.md itself marks as *"supersedes the bare `[data-scroll-reveal]` 6px fade — a clean break, no alias"*). The component (substrate) is not broken — the page demos the **retired-by-canon** register and the **wrong latch**.

**Finding A2 (MINOR, missing arrival grace).** The VT reorder is a pure cross-fade+slide on `--spring-bouncy` — correct, but the `--vt-rise` is 8px and the group has no scale/squish leg. The DESIGN.md liquid bar would want the reordered row to carry a small volume-preserving squish on travel (the `useLiquidFlex` register the tabs-indicator + drag-morph already ride) so the row reshapes as it flies to its new slot, not just translates. Currently the row is rigid in flight. Not a bug; a grace-up.

**Finding A3 (NIT, no four-state on the demo plates).** The reveal cards + VT rows are bare `.glass-card` divs with NO hover/press/focus register — static plates that only animate on scroll/reorder. A "HIGH animation affordance for EVERY component" reading wants the cards to at least carry the tier-root specular gleam (`v-specular`, W-LIQUIDHOVER auto-arm) or a `:pressable` register so they're alive at rest. This is a PAGE concern (the demo plates), not the substrate.

## (2) PROCEDURAL VIZ
**Non-applicable to the substrate.** No GL/compute context. The PAGE should ride DockStage's one shared offscreen-paused `<Aurora>` for the "glass demos over COLORFUL aurora backgrounds" user ask (it currently renders over a flat `--surface-tint` wash + plain `border-border/60` scroll-ports — the BG-2 black-plate class), but that's a demo-chassis finding, not a component one. ✓ (no viz to audit)

## (3) PERFORMANCE
**Compositor-only, exemplary ✓.** Every animated channel is `transform`/`opacity`/`translate` on a native `scroll()`/`view()` timeline or a VT pseudo — never a layout property (`proof:no-layout-animation` holds by construction; the recipes carry zero width/height/top/left/padding). No rAF, no scroll/resize listener on a supporting engine (the compositor owns it). `startViewTransition`'s fallback runs `mutate()` synchronously — no measure, no thrash. **Finding P1 (NIT):** the `[data-scroll-reveal]` continuous recipe is unbounded by IntersectionObserver — a long virtualized list would keep all per-child `view()` timelines live; immaterial at 8 cards, but it's the exact case the `[data-scroll-reveal-once]` `unobserve` latch (A1) also fixes. No offscreen-pause needed (no continuous JS loop exists to park).

## (4) SAFARI
**Compatible, with ONE real caveat the page does not surface.**
- `scroll()` timeline / `view()` timeline / `animation-range` — **Safari 26+ only** (scroll-driven animations are NOT in Safari ≤18). On every Safari before 26 the `@supports` block is skipped and the JS composable (`useScrollProgress`/`useStaggerReveal`) is the sole writer — the dual-path is the Safari floor and it works. ✓ correctly handled.
- Same-document View Transitions — Safari 18+ (Baseline Newly Available). On older Safari `supportsViewTransitions()` is false → the instant-swap fallback runs (functional, unanimated). ✓
- `view-transition-class` (the `.gl-list-item` group) — newer than the base API (Chrome 125+/Safari 18.2+). On a Safari that has `startViewTransition` but NOT `view-transition-class`, the transition still runs but the group recipe's per-class curve is ignored — degrades to the default symmetric cross-fade. Acceptable, but **undocumented in the helper**.
- `viewTransitionClass` as a **camelCase inline-style binding** (`:style="{ viewTransitionName: …, viewTransitionClass: 'gl-list-item' }"` in the demo) — `viewTransitionName` is reflected as a CSS property, but `viewTransitionClass` is NOT a settable CSS style property on every engine (it's an at-element CSS descriptor, set via the `view-transition-class` CSS property). **Finding S1 (MINOR):** setting `viewTransitionClass` via `el.style` is engine-flaky — Safari/Firefox may drop it silently (the glass-ui-binding-no-op class). The robust path is a real CSS rule (`li { view-transition-class: gl-list-item }`) or the `view-transition-class` property name, not the JS-camelCase style key. This is a DEMO bug, but it points at a missing helper affordance (the substrate gives no ergonomic class-assignment seam — the consumer hand-binds a brittle inline style).

## (5) IDIOMATIC / no-legacy
**Substrate is highly idiomatic.** `useViewTransition.ts` is a model leaf: dependency-free (no vue/keyframes/vueuse → rides `/motion-core` + root-barrel-safe, SCC-trap closure held), the async-IIFE normalizes sync-throw + async-reject into one settled promise, `navigate` is a THIN convenience over the ONE substrate (the DEC-8 anti-pattern — a parallel `useRouteTransition` — explicitly NOT re-introduced), and the dock-collapse VT recipe was correctly RETIRED (VT rasterizes snapshots — wrong primitive for a layout morph; the dock morphs off `--dock-morph-t` instead). `supportsCssTimeline.ts`'s garbage-probe harden is genuinely clever (filters the lying shim). No dead code, no dual-path in the substrate.

**The one architectural item is on the PAGE, not the substrate (A1):** the demo binds a CANON-RETIRED register (`[data-scroll-reveal]` is superseded by `.scroll-cascade`) and the WRONG latch (continuous, not `-once`). Re-pointing the demo's reveal section onto `.scroll-cascade` (or `[data-scroll-reveal-once]` for the scroll-port case) is the no-legacy fix — the page should demo the SHIPPED SOTA register, not the superseded one.

## (6) Glass six-layer composite
**Delegated.** The substrate paints no glass. The demo `.glass-card` plates carry the six-layer composite via the glass-resting tier (backdrop blur+saturate, surface tint, edge rim, `::before` catch-light, drop shadow, grain). The VT cross-fade snapshots those plates — semantically "glass-cannot-sample-glass" is untouched (VT snapshots are rasterized images, not live backdrop samples). ✓ — but per A1/A3 the plates float over a flat wash, not the live aurora the demo ask wants.

---

## Mapping to the BD tranche

| Finding | Disposition | Wave |
|---|---|---|
| A1 — demo binds the CANON-RETIRED `[data-scroll-reveal]` 6px fade (superseded by `.scroll-cascade`) + the WRONG continuous latch (re-fires on re-entry; should be `[data-scroll-reveal-once]` for the scroll-port) | **MODIFY** — re-point the reveal section onto `.scroll-cascade` (the shipped SOTA register) or `[data-scroll-reveal-once]`; page-level, the substrate is correct | `BD.W-LIQUID-ENTRANCE-GENERAL` (the iOS-27 squish/fade/settle generalization — this page is a prime consumer) + the page-deep demo sweep |
| A2 — VT reorder rows are rigid in flight (translate only, no volume-preserving squish on travel) | **AUGMENT** — add an optional `useLiquidFlex` squish leg to the `.gl-list-item` group (or a `--vt-squish` token) so a reordered row reshapes as it flies | `BD.W-LIQUID-ENTRANCE-GENERAL` (motion grace) |
| A3 — demo `.glass-card` plates are static (no `v-specular` gleam / `:pressable` at-rest affordance) + over a flat wash not aurora | **MODIFY** — page composes DockStage aurora + arms the plate gleam; "HIGH animation affordance every component" | `BD.W-STORY-PAGE-STANDARD` (the glassy-sub-card + live-field chassis) + page-deep demo sweep |
| S1 — `viewTransitionClass` set via JS-camelCase inline `:style` is engine-flaky (Safari/FF may drop it) | **MODIFY (demo)** + **AUGMENT (helper)** — fix the demo to a real CSS `view-transition-class` rule; book a helper affordance (an ergonomic class-assignment seam so consumers don't hand-bind a brittle style key) | `BD.W-BC-COMPONENT-CANON` (note the binding caveat) or a small `BD.W-VT-CLASS-SEAM` if warranted |
| Safari ≤18 `view-transition-class` partial-support undocumented in the helper | **MODIFY (doc)** — add the `view-transition-class` Baseline caveat to `useViewTransition.ts` header (the dual-path Safari floor already works) | `BD.W-DISPOSITION-RESTAMP` (already re-checks `cross-document-vt`/`directional-view-transition` Baseline books) |
| P1 — continuous reveal unbounded by IO (immaterial at 8 cards) | **PRUNE** (no action) — the A1 `-once` latch fix subsumes it | — |
| Substrate health (compositor-only, PRM-outer-gate, dual-path single-writer, hardened feature-detect, no-legacy) | **KEEP** — exemplary; no PRUNE, no Safari risk in the substrate | — |
| Import-path label | **KEEP** — already `@mkbabb/glass-ui/motion-core` (correct; the demo's inline `../../../src/...` import standardizes to the published label per the demo-import canon) | page-deep demo sweep |

**Net:** the SUBSTRATE is one of the cleanest leaves in the library — dependency-free, compositor-native, PRM-outer-gated, dual-path single-writer, Safari-floored, no dead code. The real findings are PAGE-level and motion-grace: the demo binds a canon-RETIRED reveal register (A1, the no-legacy item — re-point onto `.scroll-cascade`/`-once`), the VT rows lack flight-squish (A2), the plates are static over a flat wash not aurora (A3), and the `viewTransitionClass` inline-style binding is engine-flaky (S1, a demo bug pointing at a missing helper seam). No PRUNE of live substrate code; no glass-composite gap in the substrate; the iOS-27 grace gap is generalization, not repair.
