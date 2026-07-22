# Consumer wiring (canon home)

Projects import styles via CSS, components and composables via JS.

## The CSS import block

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@source "../node_modules/@mkbabb/glass-ui/dist";   /* template-utility content-scan */
@variant dark (&:where(.dark, .dark *));

/* then override tokens locally */
:root {
    --glass-opacity-resting: 0.82;
    /* the consumer-tunable radius primitive — the composed --glass-blur-resting
       threads --glass-level + saturate, never override it directly. The shipped
       resting/quiet default is 7px (the unified base material); re-pin here to retune. */
    --glass-blur-resting-radius: 7px;
}
```

## Override the PRIMITIVE the composite reads, never the composite

A consumer retunes a glass surface's blur by overriding the `--glass-blur-*-radius`
PRIMITIVE (which the composite `--glass-blur-*` reads through `* --glass-level` + its
`saturate()` companion), never the composed `--glass-blur-*` directly — the substitution-
vs-redeclaration discipline. The composed token is generated, never hand-set.

## `tw-animate-css` is required for the animation grammar

glass-ui's CSS `@apply`s the `animate-in`/`animate-out`/`fade-*`/`zoom-*` data-state
utilities that Dialog, Sheet, Popover, and DropdownMenu emit; Tailwind v4 flags these as
unknown utilities without the plugin. Consumers of those primitives must
`npm install tw-animate-css` and add `@import "tw-animate-css";` (shown above). It ships as
an optional peer so package tooling surfaces the hint without forcing a hard install on
Button-only consumers.

## The critical / deferred load strategy (BC.W-CSS-CRITICAL)

`@import "@mkbabb/glass-ui/styles"` is the byte-complete one-import path. A consumer chasing
first paint splits the load: `./styles/critical` (tokens + the 5-rung glass ladder +
typography + theme — ~47% of the monolith gzip) render-blocking-early, and
`./styles/deferred` (the component recipes + SFC fold + utilities) non-blocking. The LOAD
ORDER is load-bearing — critical BEFORE deferred so the deferred recipes cascade correctly
over the critical ladder. The library ships the two partitioned files; the consumer chooses
the strategy. FOUC-safe (`tests-visual/css-critical.spec.ts`).

## The `@source` must reach the compiled render-functions

glass-ui's compiled templates (`dist/*.js` render functions) reference layout utilities
(`h-full`, `shrink-0`, …) and CVA variant classes as plain class strings. Tailwind v4 only
generates a utility it FINDS during content scanning, and a consumer scanning only its own
`src/` never sees glass-ui's. Add an `@source` directive pointing at the installed dist —
and it must reach the flat compiled `dist/*.js`, NOT the `dist/components/` `.d.ts` mirror
(that recorded rule is BA.W-EMISSION). Without it, glass-ui's components render with their
layout/variant utilities silently absent.

## The self-emission class is CLOSED at the root (BA.W-EMISSION)

glass-ui's OWN structural arbitrary utilities never silently die in a consumer. Two seams:
(1) the primary self-emission path is `vite.style-assets.ts emitComponentUtilities` (P9) —
it scans the compiled dist for class-shaped tokens, safelists them via `@source inline()`,
compiles against glass-ui's own `@theme`, and ships the resulting utility RULES into
`dist/styles/components.css` (a bare consumer with no `@source` gets `rounded-panel` &c. for
free); (2) glass-ui's OWN `@source "../*.js"` backstop in `src/styles/index.css`. Fully-
arbitrary bracket utilities are PRE-COMPILED into shipped CSS instead (the Select collision-
bound, the Slider size axis).

**The `.scroll-gutter-stable` discipline (presets-in-consumers).** An app-shell route
scroller that HOSTS portaled picker/menu overlays (Select / DropdownMenu / any reka overlay
that locks body scroll on open) opts into `.scroll-gutter-stable` — `scrollbar-gutter: stable`
RESERVES the scrollbar gutter whether or not the scrollbar is present, so reka's lock-induced
scrollbar removal removes NO layout space and the centred content does not reflow / the
trigger does not twitch. The library ships the named discipline; the CONSUMER app-shell opts
its OWN scroller in (the demo `.demo-main-scroller` is the reference adoption). glass-ui does
NOT force `scrollbar-gutter` on every consumer's scroller.
