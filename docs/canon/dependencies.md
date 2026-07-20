# Dependencies (canon home)

Every runtime dependency is a **peer** — glass-ui declares them in `peerDependencies`
and ships none in its own `dependencies` bundle. A consumer already carries the Vue /
Tailwind / reka-ui spine, so glass-ui composes on top of it rather than re-vendoring a
second copy (the duplicate-Vue-instance class the peer regime forecloses).

## The peer set

| Package | Role |
|---------|------|
| `vue` ^3.5 | Framework |
| `reka-ui` ^2.0 | Headless UI primitives |
| `@vueuse/core` ^14.0 | Dark mode and event utilities (optional) |
| `tailwindcss` ^4.0 | Utility CSS |
| `embla-carousel` ^8.0 | Carousel engine (optional) |
| `embla-carousel-vue` ^8.0 | Carousel substrate (optional) |
| `@lucide/vue` ^1.16.0 | Icon set |
| `tw-animate-css` ^1.2.5 | Overlay data-state utilities (optional) |
| `@mkbabb/keyframes.js` ^6.0.0 | Spring/keyframe runtime (optional) |
| `@mkbabb/value.js` ^4.0.0 | Color and easing capabilities (optional) |
| `@mkbabb/pencil-boil` ^0.9.2 | Hand-mark geometry (optional) |

## Notes

- **All deps are peer.** There is no bundled runtime dependency; the consumer owns the
  install and the single-instance resolution.
- **`tw-animate-css` is an OPTIONAL peer** (`peerDependenciesMeta[...].optional = true`).
  It is required only for the animated overlay surfaces (Dialog / Popover /
  DropdownMenu emit `animate-in`/`animate-out` data-state utilities); a Button-only
  consumer never needs it. See `consumer-wiring.md`.
- **The keyframes/value.js spine.** Glass 7 consumes Keyframes 6 and the exact
  `@mkbabb/value.js/color` and `/easing` capabilities from Value 4. The removed Value
  root is neither imported nor externalized.
- **HandMark geometry.** `@mkbabb/pencil-boil` remains optional. The
  perfect-freehand stroke core is vendored in HandMark and is not a package peer.
- **Cross-repository boundaries.** Consume immutable package artifacts and record the
  exact public capability required. Do not edit sibling source as a substitute for an
  honest producer release or force an incompatible peer graph.
