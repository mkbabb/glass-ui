# useHaptic

## Artefact path

`src/composables/motion/core/useHaptic.ts` — published on `@mkbabb/glass-ui/motion-core` AND the root barrel (it imports `vue` only — engine-FREE + vueuse-FREE, so it is root-barrel safe per the `usePointerVelocityField`/`useLiquidFlex` precedent). Types published on `@mkbabb/glass-ui/api` (`HapticPattern`/`UseHapticOptions`/`UseHapticReturn`).

## Disposition: the safe-everywhere FLOOR with OPT-IN sited couplings (BE.W-HAPTIC-COUPLE)

`useHaptic` is the library's ONE haptic primitive — a thin, feature-detected `navigator.vibrate` wrapper with a bounded named-pattern register. It FEATURE-DETECTS to a clean no-op on iOS Safari + SSR + any non-vibrate engine (so it is never a liability), and is FELT where the platform allows (Android/Chrome). The named patterns are the calm register — every total ≤ 100ms, never a buzz (the §6 calm discipline applied to the haptic axis).

The visual-load-bearing ≥2-consumer bar (L invariant 8 / J-inv-10) is satisfied by the SITED couplings below. Each is OPT-IN per call-site (the consumer flips an `enable*`-default-`false` flag, so a silent consumer is byte-identical — the no-silent-vibrate floor); the haptic rides the EXISTING snap callback, adding NO listener, NO rAF, NO velocity sampler.

## Sited couplings (≥2)

The haptic confirms the platform's confirm-moments — each is a one-line `pulse()` call inside a callback the library already owns:

1. **`useDragMorph.onSnap` → `pulse('snap')`** (`src/composables/motion/useDragMorph.ts`) — the fling-to-nearest commit (the `committed` guard). The drag lands in a slot, the body confirms. This is a SHIPPED gesture with a snap commit — consumer-#1, available the moment a consumer opts in.

2. **The W-DOCK-FISSION detent settle → `pulse('detent')`** (`src/components/custom/dock/composables/useDockFission.ts`) — the fission piece seats into its detent (the `--dock-split-t` spring settles). A tiny double-tick (`[6, 18, 6]`) confirms the seat. Consumer-#2, lands with the fission orchestrator.

3. **The earned moment → `pulse('completion')`** (`useCelebrationBurst` settle / `CompletionSeal.play`) — the download-done / personal-best / queue-complete moment. The earned-gold visual lands with a body-confirm.

## The recorded distinction — NO auto-suppress under PRM

A haptic pulse is motion-adjacent but `prefers-reduced-motion` is a VISUAL-vestibular signal, not a haptic one — a pulse is not a vestibular trigger, so it does NOT auto-suppress under PRM. The suppression axis is the consumer `enabled` opt-out + the browser's own permission model. Conflating haptic with visual-motion would wrongly gag the body-confirm for a user who only asked to reduce VISUAL motion. (Load-bearing — the gate records it.)

## Booked proof

- `rg -n "useHaptic\|pulse\(" src/composables/motion/useDragMorph.ts` (consumer-#1, at the opt-in wire)
- `rg -n "useHaptic\|pulse\(" src/components/custom/dock/composables/useDockFission.ts` (consumer-#2, the detent)
