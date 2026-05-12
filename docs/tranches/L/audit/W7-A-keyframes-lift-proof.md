# L.W7 Lane A — Pulse + Typewriter keyframes lift (proof)

**Wave**: L.W7 Lane A.
**Date**: 2026-05-11.
**Scope**: lift inline `@keyframes` blocks from `Pulse.vue` + `TypewriterText.vue` to
the canonical home `src/styles/animations.css`. Components retain their scoped
`<style>` blocks but reference the keyframes by name only — the global
animations.css (imported via the `@mkbabb/glass-ui/styles` subpath, which routes
to `src/styles/index.css` which `@import`s `./animations.css`) provides the
keyframe bodies.

Rationale: Rε §A.7 names animations.css as the canonical home for shared
keyframes. The cohesion gain is that consumers wanting custom keyframe
overrides can target the global names without component-internal scoping
collisions.

---

## § Inline-keyframe inventory (pre-lift)

`rg "@keyframes" src/components/custom/` returned three component-local hits
in Lane A scope plus one out-of-scope hit:

| File | Line | Keyframe | Body |
|------|------|----------|------|
| `src/components/custom/pulse/Pulse.vue` | 67 | `pulse-dot-bounce` | `0%, 80%, 100% { opacity: 0.35; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1.2); }` |
| `src/components/custom/pulse/Pulse.vue` | 82 | `pulse-ring-spin` | `to { transform: rotate(360deg); }` |
| `src/components/custom/typewriter/TypewriterText.vue` | 250 | `tw-cursor-blink` | `0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; }` |

Out of Lane A scope (documented exceptions, not lifted in this wave):
- `src/components/custom/scrolling-text/ScrollingText.vue` — `@keyframes scrolling-text-pan`. Not in W7 Lane A bounds.

Note: the `@media (prefers-reduced-motion: reduce)` guard inside `Pulse.vue`
targets `.pulse-dot` / `.pulse-ring` selectors (not the keyframes themselves)
and remains co-located with those selectors. The reduced-motion override
inside `animations.css` for `sparkle-sweep` follows the precedent of guarding
at the keyframe site when a re-declaration is required — the Pulse selectors
use `animation: none` which works regardless of where the keyframe lives.

---

## § Lifted-to-animations.css content (verbatim)

Appended to `src/styles/animations.css` after the existing
`sparkle-sweep` reduced-motion override:

```css
/* ── Pulse dot bounce: dots variant of <Pulse> ──
 *
 * Three-dot loading indicator. Opacity 0.35 ↔ 1, scale 0.8 ↔ 1.2. Consumer
 * (.pulse-dot in Pulse.vue) sets duration via --pulse-duration and staggers
 * via animation-delay using --pulse-index.
 */
@keyframes pulse-dot-bounce {
    0%, 80%, 100% { opacity: 0.35; transform: scale(0.8); }
    40%           { opacity: 1;    transform: scale(1.2); }
}

/* ── Pulse ring spin: ring variant of <Pulse> ──
 *
 * Continuous-rotation spinner. Consumer (.pulse-ring in Pulse.vue) sets
 * duration via --pulse-duration.
 */
@keyframes pulse-ring-spin {
    to { transform: rotate(360deg); }
}

/* ── Typewriter cursor blink: cursor for <TypewriterText> ──
 *
 * Hard-edged step blink (50/50 duty). Consumer (.tw-cursor--blink in
 * TypewriterText.vue) sets the 1.06s step-end timing.
 */
@keyframes typewriter-blink {
    0%, 50%   { opacity: 1; }
    51%, 100% { opacity: 0; }
}
```

Naming choices (per W7 wave doc Step 2):
- `pulse-dot-bounce` — retained verbatim (already kebab-case canonical).
- `pulse-ring-spin` — retained verbatim (already kebab-case canonical, Rε A.7 lists this as a lift target alongside the two named in the wave doc).
- `typewriter-blink` — renamed from `tw-cursor-blink` to the canonical
  kebab-case form named in W7 wave doc Step 1. Per project MEMORY (no
  backwards compat), the old name is dropped cleanly; the only consumer
  (`TypewriterText.vue`) is updated in the same commit.

---

## § Component-consumer edits

### `src/components/custom/pulse/Pulse.vue`

Removed the two inline `@keyframes` blocks; preserved the `.pulse-dot`,
`.pulse-ring`, and `@media (prefers-reduced-motion: reduce)` selectors with
their existing `animation:` references unchanged.

Before (lines 55–90):
```css
<style scoped>
.pulse-dot { /* ... */ animation: pulse-dot-bounce calc(var(--pulse-duration) * 2) ease-in-out infinite; /* ... */ }

@keyframes pulse-dot-bounce {
    0%, 80%, 100% { opacity: 0.35; transform: scale(0.8); }
    40%           { opacity: 1;    transform: scale(1.2); }
}

.pulse-ring { /* ... */ animation: pulse-ring-spin var(--pulse-duration) linear infinite; }

@keyframes pulse-ring-spin {
    to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
    .pulse-dot,
    .pulse-ring { animation: none; opacity: 0.6; }
}
</style>
```

After:
```css
<style scoped>
/* Keyframes pulse-dot-bounce + pulse-ring-spin live in src/styles/animations.css */
.pulse-dot { /* ... */ animation: pulse-dot-bounce calc(var(--pulse-duration) * 2) ease-in-out infinite; /* ... */ }

.pulse-ring { /* ... */ animation: pulse-ring-spin var(--pulse-duration) linear infinite; }

@media (prefers-reduced-motion: reduce) {
    .pulse-dot,
    .pulse-ring { animation: none; opacity: 0.6; }
}
</style>
```

### `src/components/custom/typewriter/TypewriterText.vue`

Removed the inline `@keyframes tw-cursor-blink` block; renamed the consumer
`animation:` reference from `tw-cursor-blink` to `typewriter-blink`.

Before (lines 246–259):
```css
.tw-cursor--blink {
    animation: tw-cursor-blink 1.06s step-end infinite;
}

@keyframes tw-cursor-blink {
    0%,
    50% {
        opacity: 1;
    }
    51%,
    100% {
        opacity: 0;
    }
}
```

After:
```css
/* Keyframe typewriter-blink lives in src/styles/animations.css */
.tw-cursor--blink {
    animation: typewriter-blink 1.06s step-end infinite;
}
```

---

## § Visual-fidelity verification

Three checks confirm the lift is value-preserving:

1. **Keyframe-body identity**: the bodies appended to animations.css are
   byte-identical to the inline bodies that were removed (verified above —
   percentage stops, opacity, transform, and scale values all match).

2. **Selector identity**: the `.pulse-dot`, `.pulse-ring`, and
   `.tw-cursor--blink` selectors retain their `animation:` shorthand
   verbatim (with the rename `tw-cursor-blink` → `typewriter-blink` on the
   typewriter site as the only consumer change). Duration, easing, and
   iteration count are unchanged.

3. **Bundle inspection**: `dist/glass-ui.css` post-build shows
   `animation:pulse-dot-bounce calc(var(--pulse-duration) * 2) ease-in-out infinite`
   on `.pulse-dot[data-v-297dc381]` and
   `animation:typewriter-blink 1.06s step-end infinite`
   on `.tw-cursor--blink[data-v-f7b6d096]`. Both reference the keyframes by
   their global (unscoped) names, which Vue's scoped-CSS compiler leaves
   unmangled — confirming the runtime will look them up against the global
   animations.css cascade.

   Counter-example for confidence: `ScrollingText.vue` (still inline) shows
   `scrolling-text-pan-ed6cda0e` (scope-mangled), confirming that lifted
   names lose their hash suffix while inline names retain it.

---

## § Verification

- `rg "@keyframes" src/components/custom/` → one remaining hit:
  `scrolling-text/ScrollingText.vue:@keyframes scrolling-text-pan` (out of
  Lane A scope; documented exception).
- `rg "@keyframes (pulse-dot-bounce|pulse-ring-spin|typewriter-blink)" src/styles/animations.css` → 3 hits, all present.
- `npm run typecheck` → green (vue-tsc --noEmit, no output).
- `NODE_OPTIONS=--max-old-space-size=8192 npm run build` → green, `✓ built in 29.75s`. `dist/glass-ui.css` contains the unscoped `animation:pulse-dot-bounce`, `animation:pulse-ring-spin`, and `animation:typewriter-blink` references on the consumer selectors.
- `npm test` → green, 27 test files / 330 tests passed.

---

## § Worktree status

End-of-lane `git status --short`:

```
 M src/components/custom/configurator/index.ts        # Lane B (parallel)
 M src/components/custom/configurator/useConfiguratorState.ts  # Lane B (parallel)
 M src/components/custom/pulse/Pulse.vue              # Lane A
 M src/components/custom/typewriter/TypewriterText.vue # Lane A
 M src/styles/animations.css                          # Lane A
```

Lane A's three edits are disjoint from Lane B's two edits — clean parallelism, no overlap.
