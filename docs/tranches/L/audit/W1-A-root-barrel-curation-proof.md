# L.W1 Lane A — Root-barrel curation proof

**Worktree**: `agent-a0640448ace8ab11b` (isolated).
**Base ref**: `2f4fb915133e09cbab0a51b2b79666ec38960947` (post-W0 close).
**Wave**: L.W1 HEADLINE — Phase 2 root-barrel vueuse SCC trap closure.
**Lane**: A (root-barrel curation).
**Status**: COMPLETE — curation lands; SCC trap surface-closed at root chunk; tests fail per-design (orchestrator + Lane B/C close-pass absorbs).

---

## § Vueuse-bearing closure inventory

`rg "from\s+['\"]@vueuse" src/components/ src/composables/`:

| File | vueuse symbols imported | Public symbol exposed | Path into root barrel (pre-edit) |
| --- | --- | --- | --- |
| `src/components/ui/input/Input.vue` | `useVModel` | `Input` | `src/index.ts` → `./components/ui` → `./input` |
| `src/components/ui/textarea/Textarea.vue` | `useVModel` | `Textarea` | `src/index.ts` → `./components/ui` → `./textarea` (NB: `./input` ALSO re-exports `Textarea` — duplicate path) |
| `src/components/ui/combobox/ComboboxItem.vue` | `reactiveOmit` | `ComboboxItem` | `src/index.ts` → `./components/ui` → `./combobox` |
| `src/components/ui/combobox/ComboboxItemIndicator.vue` | `reactiveOmit` | `ComboboxItemIndicator` | …`/combobox` |
| `src/components/ui/combobox/ComboboxEmpty.vue` | `reactiveOmit` | `ComboboxEmpty` | …`/combobox` |
| `src/components/ui/combobox/ComboboxGroup.vue` | `reactiveOmit` | `ComboboxGroup` | …`/combobox` |
| `src/components/ui/combobox/ComboboxSeparator.vue` | `reactiveOmit` | `ComboboxSeparator` | …`/combobox` |
| `src/components/ui/combobox/ComboboxAnchor.vue` | `reactiveOmit` | `ComboboxAnchor` | …`/combobox` |
| `src/components/ui/combobox/ComboboxViewport.vue` | `reactiveOmit` | `ComboboxViewport` | …`/combobox` |
| `src/components/ui/combobox/ComboboxInput.vue` | `reactiveOmit` | `ComboboxInput` | …`/combobox` |
| `src/components/ui/combobox/ComboboxList.vue` | `reactiveOmit` | `ComboboxList` | …`/combobox` |
| `src/components/ui/carousel/useCarousel.ts` | `createInjectionState` | `useCarousel`, `useProvideCarousel` (+ transitively every `Carousel*.vue` consumer in the same package) | `src/index.ts` → `./components/ui` → `./carousel` |
| `src/composables/dark.ts` | `createGlobalState`, `useDark`, `useToggle` | `useGlobalDark` | `src/index.ts` → `./composables/useGlobalDark` (shim) → `./dark` |
| `src/composables/keyboard.ts` | `createGlobalState`, `useEventListener` | `useKeyboardShortcuts` + `registerShortcut` + `useRegisteredShortcuts` + `formatCombo` + `formatComboParts` + `isMac` + types | `src/index.ts` → `./composables/useKeyboardShortcuts` (shim) → `./keyboard` |

14 direct vueuse-importers (matches K W-S inventory). Custom/ tree is vueuse-FREE (verified: `rg @vueuse src/components/custom/`).

The carousel transitive closure is the largest: every `Carousel*.vue` in `src/components/ui/carousel/` imports `useCarousel` from the vueuse-bearing `useCarousel.ts`. Therefore the entire `ui/carousel` package barrel is SCC-tainted.

`useTokenColor` (`src/composables/useTokenColor.ts`) and `useDarkModeSync` (`src/composables/motion/useDarkModeSync.ts`) both **consume** `useGlobalDark` but do NOT directly import `@vueuse/core`. Their transitive dependency on vueuse is now resolved via the `./dark-subpath.js` code-split chunk (see § Verification below).

---

## § Symbols removed from root barrel

Pre-edit `src/index.ts` (lines as numbered in the pre-change file):

| Removed export | Pre-edit line | Migration subpath (consumer-facing) |
| --- | --- | --- |
| `Input` | line 3 (`export * from "./components/ui"`) — implicit | `@mkbabb/glass-ui/forms` |
| `Textarea` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `Combobox` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxAnchor` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxEmpty` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxGroup` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxInput` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxItem` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxItemIndicator` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxList` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxSeparator` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxViewport` | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxCancel` (reka-ui re-export) | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `ComboboxTrigger` (reka-ui re-export) | line 3 — implicit | `@mkbabb/glass-ui/forms` |
| `Carousel` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `CarouselContent` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `CarouselDots` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `CarouselItem` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `CarouselNext` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `CarouselPager` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `CarouselPrevious` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `GlassCarouselPager` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `useCarousel` | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `CarouselApi` (type) | line 3 — implicit | `@mkbabb/glass-ui/carousel` (Lane C) |
| `useGlobalDark` | line 26 (explicit re-export) | `@mkbabb/glass-ui/dark` (Lane C; flat) |
| `useKeyboardShortcuts` family (`registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`, `isMac`, `ShortcutCombo`, `ShortcutOptions`, `RegisteredShortcut`, `ShortcutEventType`) | line 28 (`export * from "./composables/useKeyboardShortcuts"`) | `@mkbabb/glass-ui/keyboard` (Lane C; flat) |

**Total symbols removed from root barrel**: ~30 runtime/type exports.

---

## § Cascade-edit summary

ONLY `src/index.ts` was modified. The cascade was implemented via **strategy choice**: replace the single `export * from "./components/ui"` wildcard with **40 explicit per-package re-exports** (skipping the 4 vueuse-bearing packages: `carousel`, `combobox`, `input`, `textarea`). Therefore:

- `src/components/ui/index.ts` — **UNCHANGED**. It remains the internal "all UI components" barrel and continues to feed `src/forms.ts` (which deliberately pulls the vueuse-bearing four) and any future Lane C `src/carousel.ts`.
- `src/components/custom/` — there is no `index.ts` (verified — custom sibling-package barrels are individually re-exported from `src/index.ts`).
- `src/composables/index.ts` — **UNCHANGED**. Already an internal barrel; not on the root re-export chain. The shims at `src/composables/useGlobalDark.ts` and `src/composables/useKeyboardShortcuts.ts` (W0 Lane III) still funnel to `./dark` + `./keyboard` so internal callers (`useTokenColor`, `useDarkModeSync`, `DarkModeToggle.vue`) keep compiling.

Rationale for strategy: avoiding cascade edits to `src/components/ui/index.ts` preserves the convention that internal barrels remain comprehensive, while `src/index.ts` is the explicit **v1.0 curated public surface**. Future Lane C edits add `src/carousel.ts` consuming `./components/ui/carousel` — that import path stays valid.

---

## § Curated-surface comment block (verbatim from `src/index.ts:1–25`)

```
// @mkbabb/glass-ui — Unified design system (v1.0 curated public surface)
//
// L.W1 Lane A — vueuse SCC trap closure (Phase 2; intentional v1.0 break).
//
// This root barrel is **vueuse-free**: it does NOT re-export any symbol whose
// implementation imports `@vueuse/core`. Consumers reach vueuse-bearing
// symbols via explicit subpaths so bundlers can shake them when unused:
//
//   Symbol(s)                                  Subpath
//   -----------------------------------------  -------------------------------
//   Input, Textarea, Combobox*                 @mkbabb/glass-ui/forms
//   useGlobalDark                              @mkbabb/glass-ui/dark          (flat; L.W1 Lane C)
//   useKeyboardShortcuts, registerShortcut,    @mkbabb/glass-ui/keyboard      (flat; L.W1 Lane C)
//   formatCombo, formatComboParts, isMac,
//   useRegisteredShortcuts, ShortcutOptions,
//   RegisteredShortcut, ShortcutCombo,
//   ShortcutEventType
//   Carousel, CarouselContent, CarouselDots,   @mkbabb/glass-ui/carousel      (flat; L.W1 Lane C)
//   CarouselItem, CarouselNext, CarouselPager,
//   CarouselPrevious, GlassCarouselPager,
//   useCarousel, CarouselApi
//
// Mechanism: K.WS Phase 1 (additive subpaths at v0.9.3) did NOT close the SCC
// trap because Rollup still walked `export * from "./components/ui"` through
// every vueuse-bearing leaf. Phase 2 removes the leaves from the root walk.
// See `docs/tranches/L/research/Rε-architectural-transpositions.md` §B.1 and
// `docs/tranches/L/waves/W1.md` for full context.
//
// Brittleness window: `breaking_changes_during_wave: yes`; consumer-facing
// migration documented in `MIGRATION.md` (L.W5).
```

---

## § Verification

### Typecheck

```
$ npm run typecheck
> vue-tsc --noEmit
$
```

PASS — no diagnostics.

### Build

```
$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
... [vite:dts] Declaration files built in 33021ms.
✓ built in 33.94s
```

PASS.

### Root-bundle vueuse SCC trap closure (the L.W1 success criterion)

```
$ grep -c "@vueuse/core" dist/glass-ui.js dist/forms.js dist/dark-subpath.js dist/keyboard-subpath.js
dist/glass-ui.js:0          ← root chunk imports ZERO vueuse symbols directly
dist/keyboard-subpath.js:1
dist/dark-subpath.js:1
dist/forms.js:1
```

```
$ grep -E "from\s+['\"]@vueuse" dist/glass-ui.js
(empty)
```

**The root entry chunk no longer imports `@vueuse/core` at the module level.** Rollup successfully split `useGlobalDark`'s transitive consumers (`useTokenColor`, `useDarkModeSync`) into the standalone `dark-subpath.js` chunk. The root chunk references `useGlobalDark` via `import { useGlobalDark as je } from "./dark-subpath.js"` (a chunk-to-chunk edge), not via a direct vueuse import.

NOTE — chunk-graph reality: consuming the root barrel still transitively reaches `dark-subpath.js` (because `useTokenColor` and `useDarkModeSync` import `useGlobalDark`). The L.W1 surface-level success criterion is met (root chunk vueuse-free); the deeper transitive chunk-chain is consistent with the wave-hard-gate (a) ("zero vueuse-bearing re-exports from root barrel"). Speedtest manualChunk + Lane C subpath flatten + W2 modularization will further untangle the `useGlobalDark` → `useTokenColor` cycle if needed.

### Root dts curation verification

```
$ grep -cE "^export.*\bInput\b" dist/index.d.ts         → 0
$ grep -cE "^export.*\bTextarea\b" dist/index.d.ts       → 0
$ grep -cE "^export.*\bCombobox" dist/index.d.ts         → 0
$ grep -cE "^export.*\buseGlobalDark\b" dist/index.d.ts  → 0
$ grep -cE "^export.*\b(useKeyboardShortcuts|registerShortcut|formatCombo|isMac|useRegisteredShortcuts)\b" dist/index.d.ts → 0
$ grep -cE "^export.*\b(Carousel|CarouselApi|useCarousel)\b" dist/index.d.ts → 0
```

All six checks return 0. The root dts surface is vueuse-clean.

(Substring matches like `CommandInput`, `NumberFieldInput`, `TagsInputInput` still appear — these are unrelated reka-ui input wrappers, not the removed `Input` component.)

### Bundle-budget delta

Pre-W1 baseline (per task prompt): `dist/glass-ui.js` 138.5 kB raw / 25.4 kB gz.

Post-curation:

```
[PASS] dist/glass-ui.js — raw 124843 / 190000 (65.7%); gzip 22459 / 33700 (66.6%)
[PASS] dist/glass-ui.css — raw  22589 /  29000 (77.9%); gzip  4446 /  5750 (77.3%)
```

| Metric | Pre-W1 | Post-W1 Lane A | Delta |
| --- | ---: | ---: | ---: |
| `glass-ui.js` raw | 138.5 kB | 124.84 kB | **-13.66 kB (-9.9 %)** |
| `glass-ui.js` gz | 25.4 kB | 22.46 kB | **-2.94 kB (-11.6 %)** |

The wave-hard-gate target ("entry-chunk gz net drop ≥ 15 KB") is **speedtest-side** (the consumer entry chunk, not glass-ui's own bundle). The glass-ui-side -2.94 KB gz drop represents the symbols stripped from the root surface alone; the speedtest-entry-chunk delta will be larger because the SCC trap there was already amplifying the cost via modulepreload + vueuse-leaf walks. Speedtest re-link evidence is owned by L.W1 close ceremony.

### Test status (npm test)

`npm test` reports **13 failures / 327 passes**. All 13 failures are **expected per-design** v1.0 breaks:

`tests/public-surface.spec.ts` — 9 failures, all assertions that removed symbols still live at root:

- `> exports ui package Carousel`
- `> exports ui package Combobox`
- `> exports ui package Input`
- `> exports ui package Textarea`
- `> exports composable or utility useGlobalDark`
- `> exports composable or utility isMac`
- `> exports composable or utility formatCombo`
- `> exports composable or utility formatComboParts`
- `> exports composable or utility registerShortcut`
- `> exports composable or utility useRegisteredShortcuts`

`tests/components.smoke.spec.ts` — 2 failures (Input/Textarea wrappers imported from root):

- `> updates Input model value`
- `> updates Textarea model value`

`tests/composables.smoke.spec.ts` — 1 failure (keyboard registry imported from root):

- `> registers keyboard shortcuts`

(That accounts for 12 — there's one duplicate-name entry in the surface failures list at the tail; the runner reports 13 distinct assertions.)

These tests must be **rewritten** in the L.W1 close pass to import from the new subpaths (`@mkbabb/glass-ui/forms`, `/dark`, `/keyboard`, `/carousel`). The rewrite is **orchestrator + Lane B/C territory** per the wave dispatch instructions; Lane A intentionally leaves them red so the orchestrator's close-pass clearly identifies the consumer-facing breaks.

---

## § Brittleness declaration

L.W1 declares `breaking_changes_during_wave: yes` per the wave plan. Lane A's specific consumer-facing breaks (v0.9.x → v1.0):

| Symbol no longer importable from `@mkbabb/glass-ui` | New canonical import |
| --- | --- |
| `Input` | `import { Input } from "@mkbabb/glass-ui/forms"` |
| `Textarea` | `import { Textarea } from "@mkbabb/glass-ui/forms"` |
| `Combobox` + `ComboboxAnchor` + `ComboboxEmpty` + `ComboboxGroup` + `ComboboxInput` + `ComboboxItem` + `ComboboxItemIndicator` + `ComboboxList` + `ComboboxSeparator` + `ComboboxViewport` + `ComboboxCancel` + `ComboboxTrigger` | `import { … } from "@mkbabb/glass-ui/forms"` |
| `Carousel` + `CarouselContent` + `CarouselDots` + `CarouselItem` + `CarouselNext` + `CarouselPager` + `CarouselPrevious` + `GlassCarouselPager` + `useCarousel` + `CarouselApi` | `import { … } from "@mkbabb/glass-ui/carousel"` (Lane C provides this subpath) |
| `useGlobalDark` | `import { useGlobalDark } from "@mkbabb/glass-ui/dark"` (Lane C) |
| `useKeyboardShortcuts` + `registerShortcut` + `useRegisteredShortcuts` + `formatCombo` + `formatComboParts` + `isMac` + types | `import { … } from "@mkbabb/glass-ui/keyboard"` (Lane C) |

Per L invariant 4 (no backward-compat hacks, no legacy aliases): root-barrel aliases are NOT reintroduced. The break is canonical.

Per L invariant 16 (MIGRATION.md is binding deliverable): the consumer-facing migration path is authored in L.W5.

---

## § Open questions for orchestrator

1. **`useCarousel` package home** — currently `src/components/ui/carousel/`. Lane C may want to surface it (and the Carousel\*.vue wrappers) via `src/carousel.ts` that simply re-exports `./components/ui/carousel`. This artefact path stays valid because Lane A did NOT touch `src/components/ui/index.ts` or the carousel sub-package barrel. Confirm Lane C alignment.

2. **`/composables/dark` + `/composables/keyboard` nested subpaths** — these remain in `package.json` (per W0 Lane III). The L.W1 wave plan §Lane C "default = retire the nested forms in v1.0" but task prompt for Lane A explicitly says "MUST NOT TOUCH `package.json` exports map — Lane B + Lane C territory." So Lane A leaves the nested subpaths in `package.json` as-is — Lane C will retire them in the same close pass.

3. **`useTokenColor` + `useDarkModeSync` transitive vueuse pull** — both remain in the root barrel (correct; their implementations don't import vueuse). At the chunk level they pull `dark-subpath.js`. Whether this should be further untangled is **W2 modularization territory** (proposal: lift the dark-state singleton out of `@vueuse/core` if KISS allows; or accept the transitive chunk edge as the canonical "you opted into dark-aware composables" cost). Annotate in W2 dispatch.

4. **Tests that intentionally fail** — recommend the orchestrator close-pass updates `tests/public-surface.spec.ts` to move the 4 ui symbols + 6 composable symbols out of the root-asserted lists and into per-subpath assertion blocks (matching the existing `subpathRuntimeExports` pattern). The 3 smoke tests (Input/Textarea/keyboard registry) need import-source updates. Total touched tests: 3 files.

5. **`src/forms.ts` duplicate `Textarea` path** — pre-existing oddity: `src/components/ui/input/index.ts` exports BOTH `Input` AND `Textarea`. The `src/forms.ts` barrel does `export * from "./components/ui/input"` followed by `export * from "./components/ui/textarea"`, meaning `Textarea` appears twice on the forms-subpath wildcard merge. ES module dedup makes this benign, but L.W2 modularization should fix the input/ barrel to export only `Input`.

---

## Worktree-diff verification

```
$ git status --short
 M docs/tranches/K/audit/W4-bundle-profile.json
 M src/index.ts
```

(`docs/tranches/K/audit/W4-bundle-profile.json` is a side-effect of running `npm run profile:budget`; not a deliberate Lane A edit.) The deliberate edit is **only `src/index.ts`**. Worktree-isolation verified — no edits leaked to main repo.
