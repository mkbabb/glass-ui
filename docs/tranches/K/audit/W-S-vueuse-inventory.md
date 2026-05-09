# K.W-S Step 1 — vueuse surface inventory (glass-ui @ pre-v0.9.3)

Walked `src/**` with `rg "from ['\"]@vueuse/" src/` against the K.W-S baseline. Results are anchored to glass-ui HEAD on branch `o-w2_7-instrument-chassis` (pre-v0.9.3 carve).

## Table 1 — Direct vueuse-importing files (14 files)

| File | vueuse symbols | Public surface |
|---|---|---|
| `src/composables/useGlobalDark.ts` | `createGlobalState`, `useDark`, `useToggle` | `useGlobalDark` (root barrel, line 26) |
| `src/composables/useKeyboardShortcuts.ts` | `createGlobalState`, `useEventListener` | `registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`, `isMac`, types (root barrel, line 28) |
| `src/components/ui/input/Input.vue` | `useVModel` | `Input` (root barrel via `./components/ui` → `./input`) |
| `src/components/ui/textarea/Textarea.vue` | `useVModel` | `Textarea` (root barrel via `./components/ui` → `./textarea`) |
| `src/components/ui/carousel/useCarousel.ts` | `createInjectionState` | `useCarousel`, `useProvideCarousel` (root barrel via `./components/ui` → `./carousel`) |
| `src/components/ui/combobox/ComboboxAnchor.vue` | `reactiveOmit` | `ComboboxAnchor` (root barrel via `./combobox`) |
| `src/components/ui/combobox/ComboboxEmpty.vue` | `reactiveOmit` | `ComboboxEmpty` |
| `src/components/ui/combobox/ComboboxGroup.vue` | `reactiveOmit` | `ComboboxGroup` |
| `src/components/ui/combobox/ComboboxInput.vue` | `reactiveOmit` | `ComboboxInput` |
| `src/components/ui/combobox/ComboboxItem.vue` | `reactiveOmit` | `ComboboxItem` |
| `src/components/ui/combobox/ComboboxItemIndicator.vue` | `reactiveOmit` | `ComboboxItemIndicator` |
| `src/components/ui/combobox/ComboboxList.vue` | `reactiveOmit` | `ComboboxList` |
| `src/components/ui/combobox/ComboboxSeparator.vue` | `reactiveOmit` | `ComboboxSeparator` |
| `src/components/ui/combobox/ComboboxViewport.vue` | `reactiveOmit` | `ComboboxViewport` |

Symbols by family:
- `createGlobalState` — useGlobalDark, useKeyboardShortcuts (2)
- `useDark`, `useToggle` — useGlobalDark (1)
- `useEventListener` — useKeyboardShortcuts (1)
- `useVModel` — Input, Textarea (2)
- `createInjectionState` — useCarousel (1)
- `reactiveOmit` — 8 Combobox files (8)

`useCarousel` (`createInjectionState` consumer) IS re-exported through `src/components/ui/carousel/index.ts:13` and so reaches the root barrel via `src/components/ui/index.ts:8`. Carousel is a public component family, not internal-only.

## Table 2 — Root-barrel re-export closure to vueuse-bearing surfaces

`src/index.ts` lines that transitively reach vueuse-importing files:

| Root-barrel line | Resolves to | vueuse-bearing children |
|---|---|---|
| `src/index.ts:3` `export * from "./components/ui"` | `src/components/ui/index.ts` | `./carousel` (useCarousel), `./combobox` (8 Combobox*), `./input` (Input), `./textarea` (Textarea) |
| `src/index.ts:26` `export { useGlobalDark } from "./composables/useGlobalDark"` | direct | `useGlobalDark` |
| `src/index.ts:28` `export * from "./composables/useKeyboardShortcuts"` | direct | `registerShortcut`, `useRegisteredShortcuts`, … |

12 components + 2 composables reach the root barrel today. Speedtest's worker only reaches `useInterval`/`useTimer` (Table 3), but Rollup's SCC analysis treats the entire root-barrel surface as live when it walks the tree, hoisting `@vue/runtime-core` into the consumer's vueuse leaf chunk.

`src/components/ui/carousel/index.ts:13` re-exports `useCarousel` (vueuse via `createInjectionState`); the rest of carousel doesn't depend on vueuse but the barrel is fused.

## Table 3 — vueuse-FREE composables (the speedtest workload)

| File | Mechanism | Root barrel |
|---|---|---|
| `src/composables/useInterval.ts` | raw `setTimeout` / `clearInterval` | `src/index.ts:27` |
| `src/composables/useTimer.ts` | raw `requestAnimationFrame` | `src/index.ts:32` |
| `src/composables/useResizeObserver.ts` | native `ResizeObserver` | `src/index.ts:29` |
| `src/composables/useStagger.ts` | pure timing helpers | `src/index.ts:30` |
| `src/composables/useStoryDemo.ts` | refs + watchers | `src/index.ts:31` |
| `src/composables/useTokenColor.ts` | window-getComputedStyle | `src/index.ts:33` |
| `src/composables/useTouchGate.ts` | pointer events | `src/index.ts:34` |
| `src/composables/glass/*` | shaders + refs | `src/index.ts:35` |
| `src/composables/motion/*` | refs + RAF | `src/index.ts:36` |
| `src/composables/sortable/*` | drag events | `src/index.ts:37` |

Speedtest's worker (`src/utils/speedtest/{download,upload}.ts`) imports `useInterval` + `useTimer` from `@mkbabb/glass-ui`. These are the actual workload at the root barrel; the SCC pull-in from Tables 1+2 is the trap mechanism the wave addresses.

## Phase-1 carve (informs Step 2)

| New subpath | File | Pulls vueuse |
|---|---|---|
| `@mkbabb/glass-ui/forms` | `src/forms.ts` | re-exports Input, Textarea, Combobox* |
| `@mkbabb/glass-ui/composables/dark` | `src/composables/dark.ts` | re-exports useGlobalDark |
| `@mkbabb/glass-ui/composables/keyboard` | `src/composables/keyboard.ts` | re-exports useKeyboardShortcuts surface |

Phase 1 is additive only — root-barrel re-exports stay so existing speedtest imports (`Input`, `Textarea`, `useGlobalDark`, etc.) continue to resolve. Phase 2 (root-barrel removal, breaking change, v1.0) is queued for L tranche.

`useCarousel` is intentionally NOT carved into a subpath in Phase 1: the carousel barrel is an internal coupling and CarouselPager / CarouselDots / GlassCarouselPager etc. ride alongside. The Phase 1 hard gate is "speedtest's `dist/index.html` is modulepreload-free WITH vueuse manualChunk applied"; if speedtest's tree-shaker still drags carousel's `createInjectionState` import into the entry chunk, Phase 2 absorbs the carousel split as well.
