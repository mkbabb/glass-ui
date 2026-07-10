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
| `@vueuse/core` ^14.0 | useDark, createGlobalState, useEventListener |
| `tailwindcss` ^4.0 | Utility CSS |
| `class-variance-authority` ^0.7 | Component variant definitions |
| `clsx` ^2.0 | Conditional class joining (replaces tailwind-merge as of v0.9.2; `cn()` ships its own deduplicator) |
| `embla-carousel-vue` ^8.0 | Carousel substrate |
| `@lucide/vue` ^1.16.0 | Icon set (the renamed v1 package; was `lucide-vue-next` ^0.x pre-v1.0) |
| `tw-animate-css` ^1.2.5 | `animate-in`/`animate-out` data-state utilities (optionalPeer) |
| `@mkbabb/keyframes.js` ^5.0.0 | Spring/keyframe runtime (the keyframes 5.x major adopt — a clean break to `^5`, no `\|\|^4` straddle) |
| `@mkbabb/value.js` ^1.0.0 | Color/value normalization (keyframes peer transitive — keyframes 5.x deps value `^1.2.0`) |

## Notes

- **All deps are peer.** There is no bundled runtime dependency; the consumer owns the
  install and the single-instance resolution.
- **`tw-animate-css` is an OPTIONAL peer** (`peerDependenciesMeta[...].optional = true`).
  It is required only for the animated overlay surfaces (Dialog / Sheet / Popover /
  DropdownMenu emit `animate-in`/`animate-out` data-state utilities); a Button-only
  consumer never needs it. See `consumer-wiring.md`.
- **The keyframes/value.js spine.** keyframes 5.x is the clean-break major (no `||^4`
  straddle); value.js's 1.0.0 stabilization cut has landed (the pre-1.0 lockstep regime
  is dissolved — the `^0.13.0` leg retired, no legacy straddle). The broken-singleton is
  an enforced IDENTITY against keyframes' value dep (`proof:peer-conformance` clause 1).
- **The cross-repo by-name ask/consume relay.** The formalized relay is
  `docs/tranches/BB/coordination/asks-and-consumes.md` (BB.W-CROSSREPO-ASKS) — every ASK
  glass-ui received and every CONSUME owed, each with its disposition, the in-repo wave
  that landed it, and the consume-and-delete cadence. The communication is content-only
  (the inv-26 foreign-tree fence): glass-ui reads the siblings as version + response
  AUTHORITY but edits ZERO sibling tree; the by-name ask is the only channel. Machine-
  locked by `proof:crossrepo-asks`.
