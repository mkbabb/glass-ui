# D5 (CONFIRMED) — the full-width horizontal line on every page = the broken scroll-progress rail

**User screenshot 2026-06-25 (`/compositions/hero`, `scratchpad/evidence/horizontal-line.png`):
"This preposterous horizontal line needs to be absolutely addressed, too. It's on every page."**
Folds into **WS1 · BG.W-SCROLL-PROGRESS-RAIL** (D5 — already mapped; this sharpens the root cause +
the exact fix). The same `scroll(<dashed-ident>)→auto` class the D-scroll-topbar audit named.

## Root cause (definitive, source-confirmed)

The reading-progress hairline is `.demo-scroll-progress` (`demo/layout/dock-nav.css:230`) — a sticky,
full-width, 2px warm-ink gradient bar pinned to the top of `<main>`, meant to fill left→right as the
route scrolls (`scaleX(0)→scaleX(1)`). It composes `.scroll-progress` (`src/styles/scroll-driven.css:42`):

```css
.scroll-progress {
    transform-origin: 0 50%;
    animation: gl-scroll-grow auto linear;          /* @keyframes: scaleX(0) → scaleX(1) */
    animation-timeline: scroll(var(--scroll-progress-scroller, root) block);   /* ← THE BUG */
}
```

`.demo-scroll-progress` overrides `--scroll-progress-scroller: --demo-main-progress` (the named
scroll-timeline declared on `.demo-main-scroller`, dock-nav.css:201 `scroll-timeline-name:
--demo-main-progress`). But the recipe wraps it in `scroll(…)`, and **`scroll()` accepts only
`root | nearest | self` — a NAMED `<dashed-ident>` is invalid inside `scroll()`**. So
`scroll(--demo-main-progress block)` is invalid → `animation-timeline` computes to **`auto`** (the
default document timeline) → with `auto` duration on a non-scroll timeline the `gl-scroll-grow`
animation completes **instantly** → the bar is stuck at **`scaleX(1)` = full width on every page**,
detached from scroll. (Runtime-confirmable: `getComputedStyle(bar).animationTimeline === "auto"`.)

## The gestalt fix (BG.W-SCROLL-PROGRESS-RAIL)

A named scroll-timeline is attached by the BARE ident, never via `scroll()`. Let the consumer var BE
the full timeline value:

```css
.scroll-progress {
    transform-origin: 0 50%;
    animation: gl-scroll-grow auto linear;
    animation-timeline: var(--scroll-progress-scroller, scroll(root block));   /* FIX */
}
```

- default (unset) → `animation-timeline: scroll(root block)` (valid, the root scroller);
- demo → `--scroll-progress-scroller: --demo-main-progress` resolves to `animation-timeline:
  --demo-main-progress` (valid, the named timeline). The bar then sits at `scaleX(0)` (invisible) at
  scroll-top and fills on scroll — the intended subtle reading rail, NOT a full-width slab.

**Fallback/PRM hardening (same wave):** outside the `@supports (animation-timeline)` + PRM gate,
`.scroll-progress` has no transform, so the static `.demo-scroll-progress` paints full-width. Give the
base a `transform: scaleX(0)` (or `display: none` under `@supports not (animation-timeline: scroll())`)
so the rail never shows a stuck full bar on a non-supporting engine or under reduced motion. **If the
user finds the rail unwanted even when correct, the wave retires it outright** (a one-line removal of
`.demo-scroll-progress` from AppShell) — the fix is "make it behave or remove it," not "ship a full
slab."

## Class lesson (for WS7's gate)

A `scroll()`/named-timeline mismatch fails SILENTLY (computes `auto`, no console error, the bar still
"animates") — identical class to D14's `calc(%+ms)`. WS7's paint-gate must read the COMPUTED
`animation-timeline`/`animation-range`, not the declared CSS, and assert the top rail is `scaleX(0)`
at scroll-top on every route (the convergence criterion already names this).
