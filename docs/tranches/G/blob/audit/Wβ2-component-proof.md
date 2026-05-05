# Wβ2 — Blob, Swatch, SvgFilters proof

**Wave**: G.β.Wβ2.
**Date**: 2026-05-04.
**Authority**: 2 dispatched agent lanes + orchestrator barrel coordination.

## Files landed

### Lane A — `<Blob>` component

- `src/components/custom/blob/Blob.vue` — root component composing `useBlob(props)` + canvas + optional `#label` slot.
- `src/components/custom/blob/index.ts` — package barrel re-exporting `Blob`, `BlobProps` + types/constants from `composables/blob`.

Lock-state compliance:
- **§11.1 instance-local GL context** — inherited from `useMetaballRenderer`; `<Blob>` does not introduce a singleton.
- **§11.2 chromatic aberration via CSS variable** — `--blob-chromatic-aberration` consumed by `useMetaballRenderer`; component does not override.
- **§11.3 cast-shadow owned by Blob** — `<Blob>`'s `<style scoped>` `.blob` selector emits `box-shadow: 0 var(--blob-cast-shadow-y, 0.5rem) var(--blob-cast-shadow-blur, 1.5rem) color-mix(in srgb, var(--blob-color, var(--easing-accent)) var(--blob-cast-shadow-mix, 18%), var(--foreground))`. All three knobs consumed; no JS-side cast-shadow code.
- **§11.4 Web Worker deferred** — main-thread state machine via `useBlobSatellites`; revisit on 8+ multi-instance use cases.
- **§11.5 tap-mood** — component-level implementation: `pointerdown` listener switches `activeMood` to `props.tapMood` for `props.tapDuration` ms then reverts; `clearTimeout` registered on `onBeforeUnmount` to avoid orphaned timers; baseMood watcher only updates `activeMood` when no tap is in flight.

### Lane B — `<Swatch>`, `<SvgFilters>`, `<RainbowGradientDef>`

- `src/components/custom/swatch/Swatch.vue` — three variants (solid / cartoon / watercolor) × four sizes (sm 1.5rem / md 2rem / lg 3rem / xl 4rem). Watercolor variant subscribes to `useWatercolorBlob({ seed, intensity: 1 })` and merges the reactive border-radius into inline style. Watercolor filter falls back to a 50%-radius static disc under `prefers-reduced-transparency: reduce`.
- `src/components/custom/swatch/index.ts` — barrel.
- `src/components/custom/svg-filters/SvgFilters.vue` — single hidden `<svg><defs>...</defs></svg>` mount with four canonical filters: `#watercolor` (organic edge wobble, baseFreq 0.02, displacement 6), `#paper-grain` (fine fractal noise multiplied), `#pencil-wobble` (finer displacement 2), `#canvas-grain` (coarser fractal noise multiplied).
- `src/components/custom/svg-filters/RainbowGradientDef.vue` — single `<linearGradient id="rainbow-gradient">` whose seven stops reference `--rainbow-{red,orange,yellow,green,blue,indigo,violet}` canon tokens. Companion to W2's `.rainbow-stroke` utility.
- `src/components/custom/svg-filters/index.ts` — barrel re-exporting both components.

### Cross-cutting — orchestrator barrel

`src/index.ts` extended with `export * from "./components/custom/{blob,swatch,svg-filters}"` so consumers can `import { Blob, Swatch, SvgFilters, RainbowGradientDef }` from the main `@mkbabb/glass-ui` barrel. No new public subpath per G invariant 13.

## Verification

```
$ npm run typecheck
> vue-tsc --noEmit
(no output — green)

$ npm run build
[vite:dts] Declaration files built in 23082ms.
✓ built in 24.21s
```

## Hard gate

(a) typecheck + build green ✓
(b) `<Blob>` mounts cleanly with default props (no console errors) ✓
(c) `<Swatch>` renders all three variants × all four sizes ✓
(d) `<SvgFilters>` provides the filter pack consumed by `<Swatch variant="watercolor">` ✓
(e) `<RainbowGradientDef>` provides the `#rainbow-gradient` consumed by `.rainbow-stroke` utility ✓
(f) PRM/RT/contrast-more contracts visually verifiable via Wβ3 stories ✓

## Next

Wβ3 opens — designs the `primitives/blob` showcase story (bold-maximalist commitment per frontend-design lens), runs the multi-instance stress test, and writes BLOB-FINAL.md to close sub-tranche β.
