# O.W6 Lane A—`useClipboard` + `HeaderRibbon` constellation promotions (proof)

**Wave**: O.W6 Lane A
**Worktree**: `agent-a37e655841ac8cd82`
**Date**: 2026-05-14
**Predecessor audit**: `docs/tranches/O/audit/O11-Lane-e-value-js.md` (O round 2—value.js deep audit)
**W6.md hard gate**: (a) `useClipboard` + HeaderRibbon ship as canonical primitives; ≥ 2-consumer verification at lane open documented.

## § Disposition (per-promotion shape comparison)

### Promotion 1—`useClipboard`

**≥ 2-consumer bar evidence** (re-verified at lane open):

| Repo | Path | Shape | Site count |
|---|---|---|---|
| value.js | `demo/@/composables/useClipboard.ts` | Bare `async copyToClipboard(text): Promise<boolean>`; navigator.clipboard with execCommand fallback; **no reactive state** | 20 (audit O11/e) |
| fourier-analysis | `web/src/composables/useMorphConfig.ts:90` | Inline; `navigator.clipboard.writeText().then(...)`; pairs with a sibling `copied = ref(false)` + `setTimeout` reset window; **no execCommand fallback** | 1 (inline) |

**Shape divergence**: value.js carries the well-tested copy path (legacy execCommand fallback) but ships as a plain function—no Vue reactivity. fourier-analysis carries the reactive-confirmation pattern (`copied` ref with auto-reset) inline but lacks the fallback. Neither consumer carries the canonical merged shape.

**Glass-ui canonical synthesis** (`src/composables/dom/useClipboard.ts`):

```ts
export interface UseClipboardOptions {
    resetMs?: number;            // default 1500
}
export interface UseClipboardReturn {
    copied: Ref<boolean>;        // flips true on success, auto-resets after resetMs
    copy: (text: string) => Promise<boolean>;
}
export function useClipboard(options?: UseClipboardOptions): UseClipboardReturn;
```

The canonical shape merges:

- The async clipboard API + execCommand legacy fallback (value.js path),
- Wrapped in a `copy()` method exposed alongside a `copied` Ref<boolean> that auto-resets after `resetMs` (fourier-analysis pattern with a configurable knob—default 1500ms; dispatch spec'd default).
- `onScopeDispose` cleanup of any pending reset timer (prevents the `useMorphConfig` `onUnmounted` boilerplate from spreading to every consumer site).
- SSR-safe—`navigator` + `document` guards return `false` from each path.

The composable is **vueuse-free**—imports only from `vue` (`ref`, `onScopeDispose`, `type Ref`). The Clipboard API is browser-native; no `@vueuse/core` dependency. Per L invariant 6 (vueuse-FREE root barrel), the composable lands on the root barrel via the existing `src/composables/dom/` export chain (already re-exported from `src/index.ts` line 154).

**Note on dispatch instruction**: dispatch says "follow the value.js shape". The value.js shape is a plain function with no reactive state. The audit (O11/e §3 fork 1) and dispatch task body both describe a **composable with `Ref<boolean>` return**—this is the synthesized canonical shape, not a verbatim lift. Treating dispatch + audit task description as authoritative.

### Promotion 2—`HeaderRibbon`

**≥ 2-consumer bar evidence** (constellation-level; re-verified at lane open):

| Repo | Path | LoC | Distinguishing features |
|---|---|---|---|
| value.js | `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` | 155 | `z-[var(--z-dock)]`; side-specific transition triples; **no** hover-tracking guard; inline `max-width: 30rem` |
| keyframes.js | `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` | 152 | `z-dock` arbitrary-value class; unified base + side-specific overrides; **`isMouseOver` hover-tracking guard**; **`--header-max-width: 500px` CSS var** |

**Shape divergence note—`O11/e` audit + `W6.md` had the comparison BACKWARDS.**

`docs/tranches/O/waves/W6.md:28` recommends "value.js's hover-tracking + `--header-max-width` var version". Direct file inspection at lane open shows the inverse: **keyframes.js** carries the `isMouseOver` hover-tracking guard AND the `--header-max-width` CSS var (`value.js` does not—value.js has neither). `O11-Lane-e-value-js.md:96` table similarly attributes "hover-tracking" + "max-width custom CSS var" to value.js where in fact those features live in keyframes.js.

This lane proceeds with the spirit of the recommendation (pick the more capable variant)—the **keyframes.js shape** is canonical here, paired with the value.js side-specific transition triples (slightly more granular animation per side).

**Glass-ui canonical synthesis** (`src/components/custom/header-ribbon/HeaderRibbon.vue`):

- Props: `position?: 'left' | 'right'` (default `'left'`), `hideTimeoutMs?: number` (default `2000`). Lifted into a public `HeaderRibbonProps` interface in `types.ts` so /api can pin against it.
- Hover-tracking: `isMouseOver` ref guards `startHideTimeout`—collapse never schedules while the pointer is still inside the ribbon.
- Pin/toggle state: `isPinned` + `isToggled` exposed via `defineExpose` (parallel to both consumer shapes).
- CSS variable: `--header-max-width` (default `30rem`—averages the two consumers' values of `500px` ~31rem and `30rem`). Consumers override at any ancestor (root, themed container, ribbon root) without forking.
- z-index: `z-[var(--z-dock)]` (matches value.js's literal-var form; the `--z-dock` token already exists in `src/styles/tokens.css`).
- Slots: `left` (optional extra element, e.g. logo), `anchor` (with scoped `{ pinned, toggled }`), `items` (the collapse-target group).
- Scoped CSS—uses the canonical token vocabulary: `var(--duration-slow)`, `var(--ease-standard)`, `var(--duration-normal)`, `var(--ease-decelerate)`.

The package ships as a new flat subpath: **`@mkbabb/glass-ui/header-ribbon`**. Not added to the root barrel—per the v1.0 cherry-pick acceptance bar in `src/index.ts:58-74`, this is a "vertical/themed substrate" (full-bleed fixed-position chrome strip; not a composition primitive alongside `<Button>` / `<Card>`), so it follows the precedent of `aurora`/`sidebar`/`dock`—subpath-only.

## § File changes summary

**Modified** (5 files):

| File | Change |
|---|---|
| `src/composables/dom/index.ts` | Add `export * from "./useClipboard";` + header-comment entry |
| `src/api/index.ts` | Add `UseClipboardOptions` + `UseClipboardReturn` (clipboard cohort) + `HeaderRibbonPosition` + `HeaderRibbonProps` (header-ribbon cohort) re-exports |
| `package.json` | Register `./header-ribbon` in `exports` (development + types + import) + `typesVersions["*"]["header-ribbon"]` |
| `vite.library.ts` | Register `"header-ribbon"` library entry mapping to `src/header-ribbon.ts` |
| `docs/tranches/K/audit/W4-bundle-profile.json` | Auto-rewritten by `npm run profile:budget` (pre-existing modification in worktree status) |

**Added** (4 files + 1 dir):

| Path | Purpose |
|---|---|
| `src/composables/dom/useClipboard.ts` | Canonical composable; 108 LoC including JSDoc + types |
| `src/components/custom/header-ribbon/HeaderRibbon.vue` | Canonical SFC; 131 LoC (template + script + scoped style) |
| `src/components/custom/header-ribbon/types.ts` | `HeaderRibbonPosition` + `HeaderRibbonProps` |
| `src/components/custom/header-ribbon/index.ts` | Package barrel—SFC default + types |
| `src/header-ribbon.ts` | Flat subpath entry—`export * from "./components/custom/header-ribbon"` |

**Surface count delta**:

- `package.json` exports: 38 → **39** flat JS subpaths (header-ribbon added).
- `typesVersions["*"]`: 36 → **37** entries.
- `vite.library.ts` `libraryEntries`: 38 → **39** entries.
- `/api` surface: 49 → **53** symbols (4 new types: `UseClipboardOptions`, `UseClipboardReturn`, `HeaderRibbonPosition`, `HeaderRibbonProps`). Types-only delta—no new constants.

## § Verification (gates output)

All five gates from the dispatch verification block PASS at lane close.

### `npm run typecheck`

```
> @mkbabb/glass-ui@1.3.1 typecheck
> vue-tsc --noEmit

[exit 0]
```

### `npm test`

```
Test Files  30 passed (30)
     Tests  348 passed (348)
  Duration  2.39s
```

(Lane A is additive substrate—no test churn expected; all 348 pre-existing tests pass.)

### `npm run build` (with `NODE_OPTIONS='--max-old-space-size=8192'`)

```
[vite:dts] Declaration files built in 26327ms.
✓ built in 27.05s
```

New chunks emitted:

- `dist/header-ribbon.js`—2.61 kB raw / 1.00 kB gzip
- `dist/header-ribbon.d.ts`—1709 bytes

`useClipboard` rolls into `dist/glass-ui.js` (root barrel chunk)—total raw 128.78 KB / gzip 23.26 KB (well under the 190 KB / 33.7 KB budget).

### `npm run profile:budget`

```
Bundle budget report:
  [PASS] dist/glass-ui.js—raw 128782 / 190000 (67.8%); gzip 23261 / 33700 (69.0%)
  [PASS] dist/glass-ui.css—raw 34248 / 36000 (95.1%); gzip 6283 / 6700 (93.8%)
```

CSS budget unchanged (no new styles outside the SFC scoped block). JS budget gains ~minimal—`useClipboard` is ~108 LoC of pure logic; rolled into the root chunk.

### `npm run verify-export-types`

```
> @mkbabb/glass-ui@1.3.1 verify-export-types
> node scripts/verify-export-types.mjs

All package export targets and type resolutions are valid.
```

The new `./header-ribbon` export resolves cleanly; `package.json.exports["./header-ribbon"]` + `typesVersions["*"]["header-ribbon"]` + emitted `dist/header-ribbon.{js,d.ts}` all align.

## § Cross-repo adoption status (DEFERRED)

Per W6.md hard gate (e) + dispatch §"Cross-repo coordination": **no consumer-side mutations** in this lane. Glass-ui ships the canonical primitives at HEAD; adoption sweep awaits user-authorized cross-repo wave.

**Adoption paths (post-glass-ui ship)**:

| Consumer | Repo path | Action | LoC delta estimate |
|---|---|---|---|
| value.js | `demo/@/composables/useClipboard.ts` | Replace local 28-LoC fork with `import { useClipboard } from "@mkbabb/glass-ui";` + per-site call-shape adaptation (function → composable; 20 call sites refactor `await copyToClipboard(x)` → `const { copied, copy } = useClipboard(); await copy(x)`) | -28 LoC + adapt 20 sites |
| value.js | `demo/@/components/custom/header-ribbon/` | Replace local 155-LoC SFC + index.ts barrel with `export { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";` re-export; consumer can drop the package dir entirely if no Vue imports route through it locally | -155 LoC |
| fourier-analysis | `web/src/composables/useMorphConfig.ts:90` | Replace inline `copyToClipboard()` + `copied` ref + `copiedTimer` setup with `const { copied, copy } = useClipboard({ resetMs: 2000 })`; drop `onUnmounted(clearTimeout)` (composable handles it) | -10 LoC |
| keyframes.js | `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` | Replace 152-LoC fork with `export { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";` re-export in barrel; the import site in `EditorShell.vue` is path-stable (already imports from `@components/custom/header-ribbon`, which becomes a re-export) | -152 LoC |

**Cohort signal at completion**: ≥ 4 consumer repos x ~345 LoC removed (~28 + 155 + 10 + 152). Cross-repo wave-author should reference this proof doc when sequencing the adoption sweep.

## § Open questions for orchestrator

1. **HeaderRibbon shape attribution error in O11/e + W6.md.** Both docs attribute `isMouseOver` hover-tracking + `--header-max-width` CSS var to value.js where the features actually live in keyframes.js. The implementation here picks the more-capable shape (spirit of the recommendation honored) but the audit docs need a one-line correction. Confirm whether O11/e should be amended in-place or annotated at O.W6 close.

2. **`useClipboard` shape—composable vs utility.** Audit O11/e §3 fork 1 disposition line 54 recommends "ships as utility (function, not composable)—no Vue reactivity needed for the fire-and-forget clipboard call shape both consumers use." Dispatch §"Promotion 1" explicitly specifies a **composable** with `Ref<boolean>` return. This lane shipped the dispatch spec (composable). The "open question" from O11/e §"Open questions for orchestrator" item 2 is now answered by dispatch—confirm at next consumer-adoption wave that the composable shape ships to call sites.

3. **HeaderRibbon → root barrel?** Currently subpath-only per the v1.0 cherry-pick rationale (vertical/themed substrate). Both consumer copies sit at the chrome-strip layer (fixed-position viewport-anchor), not as `<Card>`/`<Button>`-companion composition. Confirm subpath-only is the correct disposition for this primitive (vs adding to the root barrel's 7-package `custom/` cherry-pick).

4. **Cross-repo coordination doc.** W6.md hard gate (e) calls for `coordination/AC-cohort-coordination.md`. This proof doc captures the per-promotion adoption path table in `§ Cross-repo adoption status`; whether that table should migrate into the coordination doc (or stay split between lane proof + coordination doc) is an orchestrator decision.

## § Worktree diff verification

`git status` at lane close:

```
Changes not staged for commit:
        modified:   docs/tranches/K/audit/W4-bundle-profile.json
        modified:   package.json
        modified:   src/api/index.ts
        modified:   src/composables/dom/index.ts
        modified:   vite.library.ts

Untracked files:
        src/components/custom/header-ribbon/
        src/composables/dom/useClipboard.ts
        src/header-ribbon.ts
```

`git diff --stat`:

```
 docs/tranches/K/audit/W4-bundle-profile.json | 50 ++++++++++++++++------------
 package.json                                 |  8 +++++
 src/api/index.ts                             | 23 +++++++++++++
 src/composables/dom/index.ts                 |  3 ++
 vite.library.ts                              |  1 +
 5 files changed, 63 insertions(+), 22 deletions(-)
```

(The `W4-bundle-profile.json` modification is the auto-rewritten profile snapshot from `npm run profile:budget`; pre-existing in worktree status at lane open—not authored by this lane.)

All modifications stay within the dispatch §"Bounds" envelope:
- `src/composables/dom/useClipboard.ts` (NEW) ✓
- `src/composables/dom/index.ts` (re-export) ✓
- `src/composables/index.ts` (re-export)—N/A, picks up via `export * from "./dom"`
- `src/index.ts` (re-export if vueuse-free)—N/A, picks up via `export * from "./composables/dom"`
- `src/api/index.ts` (clipboard + header-ribbon cohorts) ✓
- `src/components/custom/header-ribbon/` (NEW dir; 3 files) ✓
- `src/header-ribbon.ts` (NEW subpath entry) ✓
- `package.json` (exports + typesVersions) ✓
- `vite.library.ts` (libraryEntries) ✓

No files outside bounds touched. No git mutations attempted (hardened agent git clause honored—`git status` and `git diff --stat` read-only).
