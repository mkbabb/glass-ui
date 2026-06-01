// @mkbabb/glass-ui/motion-core — keyframes.js-FREE + vueuse-FREE motion leaves.
//
// AP.W3 R0G-7 — the engine-free core of the motion family, carved off `/motion`
// so a cheap leaf import (`useIntersectionPause`, `useScrollProgress`, …) never
// statically reaches `@mkbabb/keyframes.js`. The `/motion` barrel walked all
// twelve leaves as one SCC, so a cheap consumer dragged the ~125 KB keyframes
// engine onto its eager graph through a path that touches ZERO keyframes. This
// sibling subpath breaks that barrel: `dist/motion-core.js` carries neither
// `@mkbabb/keyframes.js` nor `@vueuse/core`; `dist/motion.js` keeps the engine.
//
// Mirrors the L.W1 Lane C flat-sibling-per-heavy-peer-boundary shape one level
// down: keyframes-BEARING leaves stay on `/motion`, keyframes-FREE leaves carve
// out here. Pairs with `/motion` like `/dock` ↔ `/dock-group` (CLAUDE.md
// §Subpath naming pairs). NO back-compat alias on `/motion` for the relocated
// symbols (inv 47); consumers rename per call site (see MIGRATION.md / CHANGELOG.md).
export * from "./composables/motion/core";
