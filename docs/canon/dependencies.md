# Dependencies (canon home)

Every runtime dependency is a **peer** — glass-ui declares them in `peerDependencies`
and ships none in its own `dependencies` bundle. A consumer already carries the Vue /
Tailwind / reka-ui spine, so glass-ui composes on top of it rather than re-vendoring a
second copy (the duplicate-Vue-instance class the peer regime forecloses).

## The peer set

The table mirrors `package.json` `peerDependencies`, and `(optional)` means
`peerDependenciesMeta[…].optional = true` — nothing else. The manifest is the authority; a
row here that the manifest does not carry is a bug in this file.

| Package | Role |
|---------|------|
| `vue` ^3.5 | Framework |
| `reka-ui` ^2.0 | Headless UI primitives |
| `@vueuse/core` ^14.0 | Dark mode and event utilities (optional) |
| `tailwindcss` ^4.0 | Utility CSS |
| `@lucide/vue` ^1.16.0 | Icon set |
| `tw-animate-css` ^1.2.5 | Overlay data-state utilities (optional) |
| `@mkbabb/keyframes.js` ^6.0.0 | Spring/keyframe runtime |
| `@mkbabb/value.js` ^4.0.0 | Color, CSS and easing capabilities (optional) |
| `vue-component-type-helpers` ^3.0.3 | Type closure for reka-ui's emitted declarations — reka-ui imports it and declares it nowhere |

## Notes

- **All deps are peer.** There is no bundled runtime dependency; the consumer owns the
  install and the single-instance resolution.
- **`tw-animate-css` is an OPTIONAL peer** (`peerDependenciesMeta[...].optional = true`).
  It is required only for the animated overlay surfaces (Dialog / Popover /
  DropdownMenu emit `animate-in`/`animate-out` data-state utilities); a Button-only
  consumer never needs it. See `consumer-wiring.md`.
- **The keyframes/value.js spine.** Glass consumes Keyframes 6 and the
  `@mkbabb/value.js/color`, `/css` and `/easing` capabilities from Value 4. The removed
  Value root is neither imported nor externalized.
- **HandMark geometry has no peer.** The hand-mark stroke laws are in-house and
  closed-form (`src/components/handmark/stroke.ts`); no freehand or brush-geometry
  package is imported, externalized or declared.
- **Cross-repository boundaries.** Consume immutable package artifacts and record the
  exact public capability required. Do not edit sibling source as a substitute for an
  honest producer release or force an incompatible peer graph.
