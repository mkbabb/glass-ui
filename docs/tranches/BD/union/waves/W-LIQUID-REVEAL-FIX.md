# W-LIQUID-REVEAL-FIX — useLiquidReveal is broken (root-cause + repair the bloom-from-source)

**Surfaced by:** the user 2026-06-23 — "useLiquidReveal doesn't seem to work at all."

## The defect
`useLiquidReveal(surfaceRef, { trigger, preset, blur })` (`src/composables/motion/useLiquidReveal.ts`, the iOS-27 source-rect bloom — the dialog-from-button / dock-from-pill morph; composes the kf `ElementMorph` FLIP-inversion 1→0 + `springTimingFunction`) is the FLAGSHIP of the liquid-entrance law, and the user reports it does not fire. This is the [[glass-ui binding verification]] class (a stale binding / a mis-wired ref / a never-armed trigger silently no-ops; vue-tsc + units miss it, only live e2e catches it — the SAME class as the cta-receive P0 I fixed this session, where `useTemplateRef<HTMLElement>` resolved a component INSTANCE not an element).

## The likely root cause (to confirm live — the fix-loop)
The cta-receive precedent strongly suggests the same element-vs-component ref class: `useLiquidReveal`'s `surfaceRef`/`trigger` are likely bound via `useTemplateRef<HTMLElement>` to a COMPONENT (a reka portal content, a `<Dialog>`), so `.value` is the component public instance (no `getBoundingClientRect`) — `ElementMorph(settledRect, triggerRect)` throws or no-ops. OR: the reka portaled overlay mounts AFTER the reveal arms (a timing race — the surface ref is null when `useLiquidReveal` runs). OR: the demo never WIRES the trigger (the bloom needs a source rect; an unset trigger → no morph). OR: a PRM/`@supports` gate is mis-evaluating.

## The fix (idiomatic, the cta-receive pattern)
1. Root-cause LIVE (chrome-devtools): find the consumer (the demos using useLiquidReveal — /containers/dialog, the dock-from-pill), instrument the arm, confirm whether the ref resolves to an element, whether the trigger rect is read, whether the morph applies.
2. Apply the ELEMENT-RESOLUTION fix (the cta-receive `asElement(v)` resolver — accept `HTMLElement | ComponentPublicInstance`, resolve `.$el`) IF it is the ref class; OR fix the timing (arm after the portal mounts, a nextTick/onMounted guard) IF it is the race; OR wire the trigger IF the demo never set it.
3. ADD the test gap closure: a `tests-visual/liquid-reveal.spec.ts` that DRIVES the real open→bloom (the binding-verification e2e the unit tests miss — the SAME gap that let cta-receive ship dead).
4. Verify LIVE: the surface blooms from its trigger (scale+fade+blur-settle on the spring), both modes, PRM-snap.

## Sequencing
HIGH priority — useLiquidReveal is the bloom the dock-hub (W-DOCK-HUB-API), the overlays (W-LIQUID-REVEAL the `.glass-reveal` floor), and the liquid-entrance law (W-LIQUID-ENTRANCE-GENERAL) all depend on. A focused fix-loop (a refine-triumvirate or a dedicated fix-agent w/ chrome). Gate: `proof:liquid-reveal` (the existing) + the new live π that DRIVES the bloom (born-RED on the current broken state).
