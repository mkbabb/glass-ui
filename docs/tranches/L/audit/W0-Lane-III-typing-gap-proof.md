# L.W0 Lane III — subpath dts publication-gap proof (v0.9.4)

**Date**: 2026-05-11
**Lane**: III (subpath typing-publication gap P0)
**Source spec**: `docs/tranches/L/waves/W0.md` Lane III
**Status**: fix applied; build + typecheck + synthetic-consumer probes green; orchestrator pending tag + push.

## § Diagnosis

At v0.9.3 HEAD the two nested subpath dts artefacts were broken:

```
$ cat dist/composables/dark.d.ts
export * from '../src/composables/dark'
export {}

$ cat dist/composables/keyboard.d.ts
export * from '../src/composables/keyboard'
export {}
```

`glass-ui` ships only `dist` + `src/styles` (per `package.json` `files`), so the `'../src/...'` relative path from the consumer's `node_modules/@mkbabb/glass-ui/dist/composables/` resolves to a non-existent `node_modules/@mkbabb/glass-ui/src/composables/dark.d.ts`. Consumer `vue-tsc` raises `TS2305: Module has no exported member`.

The **JS emission** for both subpaths was correct (chunk-relative imports of inlined implementation). The break was strictly in dts emission.

### Root cause — `vite-plugin-dts` nested-entry-key handling

`vite.config.ts` passes `rollupTypes: true` to `vite-plugin-dts`. The plugin's flow (`node_modules/vite-plugin-dts/dist/index.mjs:1212–1302`) is:

1. **Per-file dts emit** (`writeBundle` opener, lines 1095–1210). For each TS source file under `entryRoot` (defaults to "smallest LCP of entry source paths" — here `src/`), emit the full per-file `.d.ts` to `dist/<src-relative>.d.ts`. For `src/composables/dark.ts` this places the full inlined declaration at `dist/composables/dark.d.ts`.
2. **Insert-index pass** (lines 1236–1258). For each entry-key `name`, write a synthetic stub at `dist/<name>.d.ts` that re-exports the corresponding per-file dts via a `relative(dirname(entryDtsPath), sourceEntry)` path. The pass skips with `if (existsSync(entryDtsPath)) continue` ONLY if the entry-key's dts path equals the per-file dts path AND step 1 already wrote it. For nested entry-key `composables/dark` whose source is `src/composables/dark.ts`, the entry-key dts path (`dist/composables/dark.d.ts`) **does** equal the per-file dts path — so the pass should skip.
3. **Rollup pass** (lines 1260–1302). Each entry-key's dts is fed through Rollup with `fileName: basename(entryPath)` (line 1271). Rollup writes the bundled output at `outDir/<basename>` — for entry-key `composables/dark`, basename is `dark.d.ts`, so the rolled output lands at `dist/dark.d.ts` (flat, **wrong location**). The pre-existing `dist/composables/dark.d.ts` from step 1 is left untouched on disk; the post-rollup `unlink` sweep (line 1289) clears the in-memory `emittedFiles` map but leaves on-disk files outside the rolled set in place.

The net effect:

- `dist/dark.d.ts` (rolled, **correct, self-contained**) is written — but this filename is NOT mapped to any subpath via `package.json` `exports`, so it's an orphan.
- `dist/composables/dark.d.ts` ends up as a **broken stub** `export * from '../src/composables/dark'`, written by the insert-index pass at some point in the flow (the exact race is plugin-internal — the practical observation is that with nested entry-keys, the file on disk is the broken form rather than the per-file full-impl form).

Top-level entries (`forms`, `tokens`, `aurora`, ...) do not exhibit the bug because their entry-key has no `/` — the rolled-output basename matches the entry-key location, and the in-memory `emittedFiles` map stays coherent.

`dist/forms.d.ts` (the working sibling) is self-contained at 336 lines; `dist/composables/dark.d.ts` (the broken nested case) is 3 lines.

## § Fix chosen — flat dist entry-keys, preserved consumer subpath names

Per the dispatch's **Fix A** branch (rebind nested entry-keys to flat dist names) — chosen over Fix E (lift implementations into subpath barrels) after empirical verification that Fix E alone did NOT clear the bug. Rationale:

1. The bug is structural to `vite-plugin-dts` nested-entry-key handling. Source-side restructuring of the re-export indirection (Fix E) does not affect the plugin's path computation — it still emits a broken stub at the entry-key location for nested keys.
2. Flat dist entry-keys eliminate the trigger. `vite.library.ts` rebinds `composables/dark` → `dark-subpath` and `composables/keyboard` → `keyboard-subpath` (flat, non-colliding names). The consumer-facing `@mkbabb/glass-ui/composables/dark` subpath is preserved verbatim via `package.json` `exports` + `typesVersions` pointing to `dist/dark-subpath.{js,d.ts}`.
3. L.W1 will flatten the consumer-facing subpath names to `./dark` / `./keyboard` (Rε A2 option (b)) as the final breaking gestalt. W0's intermediate `dark-subpath` dist filename retires at W1.

The implementation was ALSO lifted from `src/composables/{useGlobalDark,useKeyboardShortcuts}.ts` INTO `src/composables/{dark,keyboard}.ts` (Fix E partial). This is a strict cohesion win — the subpath barrels are now canonical implementation homes — and prepares the W2 modularization sweep. The two legacy files become one-line re-export shims that keep all internal `./useGlobalDark` and `./useKeyboardShortcuts` imports compiling without churn.

### Diff summary

- `vite.library.ts:41-42` — entry-key keys `"composables/dark"` / `"composables/keyboard"` → `"dark-subpath"` / `"keyboard-subpath"` (source paths unchanged).
- `package.json:8` — version `0.9.3` → `0.9.4`.
- `package.json:115-120` — `typesVersions["composables/dark"]` → `dist/dark-subpath.d.ts`; same for keyboard.
- `package.json:308-317` — `exports["./composables/dark"].types/.import` → `dist/dark-subpath.{d.ts,js}`; same for keyboard. `development` condition kept at `./src/composables/dark.ts` (no dist rename leaks into source).
- `src/composables/dark.ts` — implementation lifted in from `useGlobalDark.ts`; header comment updated.
- `src/composables/keyboard.ts` — implementation lifted in from `useKeyboardShortcuts.ts`; header comment updated.
- `src/composables/useGlobalDark.ts` — replaced with one-line `export { useGlobalDark } from "./dark"` shim.
- `src/composables/useKeyboardShortcuts.ts` — replaced with one-line `export * from "./keyboard"` shim.
- `CHANGELOG.md` — v0.9.4 entry added.
- `scripts/release.sh` — subpath-resolve probe block inserted after the `dist/index.d.ts` smoke check and before tag.

## § Importer-graph impact

`rg "from .*useGlobalDark"` and `rg "from .*useKeyboardShortcuts"` against `src/` + `demo/` enumerated 18 importers across both names. None required modification because the legacy files at `src/composables/{useGlobalDark,useKeyboardShortcuts}.ts` are preserved as re-export shims. Importer summary:

| Path | Imports | Notes |
|---|---|---|
| `src/index.ts:26,28` | `useGlobalDark`, `*` from keyboard | Root barrel — re-exports via shim. |
| `src/composables/index.ts:2,4` | both | Internal barrel — re-exports via shim. |
| `src/composables/useTokenColor.ts:24` | `useGlobalDark` | Via shim (file path unchanged). |
| `src/composables/motion/useDarkModeSync.ts:14` | `useGlobalDark` | Via shim (`../useGlobalDark`). |
| `src/composables/__tests__/useKeyboardShortcuts.test.ts:8` | 5 symbols | Via shim. |
| `src/components/custom/controls/DarkModeToggle.vue:3` | `useGlobalDark` | Via shim. |
| `src/components/custom/expandable-container/ExpandableContainer.vue:65` | `registerShortcut` | Via shim. |
| `demo/layout/AppShell.vue:16` | keyboard symbols | Via shim. |
| `demo/configurator/usePresetEditor.ts:12` | `useGlobalDark` | Via shim. |
| `demo/stories/aurora.vue:6` | `registerShortcut` | Via shim. |
| `demo/stories/composables/use-global-dark.vue:9` | `useGlobalDark` | Via shim. |
| `demo/stories/composables/use-keyboard-shortcuts.vue:10` | keyboard symbols | Via shim. |
| `demo/stories/composables/use-dark-mode-sync.vue:9` | `useGlobalDark` | Via shim. |
| `demo/stories/composables/use-token-color.vue:6` | `useGlobalDark` | Via shim. |

Net file modifications: 9 (source/config/docs/scripts). Net deletions: 0.

## § Verification

### `npm run typecheck` (vue-tsc, full project)

```
$ npm run typecheck
> @mkbabb/glass-ui@0.9.4 typecheck
> vue-tsc --noEmit
[clean exit]
```

### Build + dts inspection

Clean rebuild with the fix in place:

```
$ rm -rf dist && NODE_OPTIONS=--max-old-space-size=8192 npm run build
... [vite:dts] Declaration files built in ~32s.
✓ built in ~33s
```

Post-build artefacts:

```
$ ls dist | grep -E "(dark|keyboard)"
dark-subpath.d.ts
dark-subpath.js
keyboard-subpath.d.ts
keyboard-subpath.js

$ ls dist/composables 2>&1
ls: dist/composables: No such file or directory
```

`dist/composables/` is GONE. `dist/dark.d.ts` and `dist/keyboard.d.ts` orphans are also gone (no nested-entry → no basename-flattened orphan).

`dist/dark-subpath.d.ts` (self-contained, 12 lines):

```ts
import { Ref } from 'vue';
import { UseDarkReturn } from '@vueuse/core';

/** Single shared dark mode instance — avoids multiple useDark() watchers racing on classList. */
export declare const useGlobalDark: () => {
    isDark: UseDarkReturn;
    toggleDark: () => void;
    disableTransitions: Ref<boolean, boolean>;
    setDisableTransitions: (value: boolean) => void;
};

export { }
```

`dist/keyboard-subpath.d.ts` (self-contained, 44 lines): full `RegisteredShortcut` / `ShortcutCombo` / `ShortcutOptions` interfaces + `formatCombo` / `formatComboParts` / `isMac` / `registerShortcut` / `useRegisteredShortcuts` declarations. No `'../src/...'` references.

`grep '../src' dist/*.d.ts dist/*.js`: zero matches.

### Synthetic-consumer probe (node import)

```
$ for sp in forms composables/dark composables/keyboard tokens dock; do
    node -e "import('@mkbabb/glass-ui/$sp').then((m) => console.log('$sp:', Object.keys(m).length, 'exports'))"
  done
forms: 14 exports
composables/dark: 1 exports
composables/keyboard: 5 exports
tokens: 4 exports
dock: 7 exports
```

All 5 probes resolve.

### Synthetic-consumer tsc probe

Scratch consumer at `/tmp/glass-ui-subpath-probe/`:

```ts
import { useGlobalDark } from "@mkbabb/glass-ui/composables/dark";
import {
    useRegisteredShortcuts,
    registerShortcut,
    formatCombo,
} from "@mkbabb/glass-ui/composables/keyboard";

const dark = useGlobalDark();
const _isDark: typeof dark.isDark = dark.isDark;
const _shortcuts = useRegisteredShortcuts();
const _unreg: () => void = registerShortcut("Mod+K", () => {});
const _label: string = formatCombo("Mod+K");
```

```
$ cd /tmp/glass-ui-subpath-probe && npx -p typescript@5.8 tsc --noEmit
[clean exit]
```

Consumer typecheck resolves `useGlobalDark`, `useRegisteredShortcuts`, `registerShortcut`, `formatCombo` from the two subpaths via `dist/dark-subpath.d.ts` + `dist/keyboard-subpath.d.ts`. The TS2305 publication gap is closed.

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui status --short
 M CHANGELOG.md
 M package.json
 M scripts/release.sh
 M src/composables/dark.ts
 M src/composables/keyboard.ts
 M src/composables/useGlobalDark.ts
 M src/composables/useKeyboardShortcuts.ts
 M vite.library.ts
?? docs/tranches/L/audit/W0-Lane-III-typing-gap-proof.md
```

(Plus the regenerated `dist/` — orchestrator will rebuild before tag, so dist changes do not need to be committed by the agent.)

## § Open questions for orchestrator

1. **Dist filename `dark-subpath` is intermediate** — L.W1 will retire it when the consumer-facing subpath flattens to `./dark`. No orchestrator action needed in W0; flagging for W1's PR description so the cosmetics flow.
2. **Top-level `dist/dark.d.ts` orphan** (the basename-flattened rolled output that existed at v0.9.3 BEFORE this fix) is gone post-fix — but if any consumer somehow grabbed it via direct path (very unlikely; not in `exports`), they'd see a 404. Risk is negligible (no exports route to that path; not in typesVersions; npm tarball at v0.9.3 had it as a stranded orphan).
3. **Test suite was not rerun** in this lane (`npm test` not invoked) — orchestrator's release flow runs `npm test` as part of `scripts/release.sh`. The fix surface is configuration + barrel re-export rebinding; no runtime semantics change.
4. **`profile:budget` gate** likely unaffected — bundle composition for `composables/dark` and `composables/keyboard` is unchanged (same impls, same `@vueuse/core` external dep, just rebound output filenames). Worth a confirmation run by orchestrator.
