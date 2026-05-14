# O.W3 Lane C — `demo/configurator/usePresetEditor.ts` split proof

**Wave**: O.W3 (god-module cohesion splits)
**Lane**: C — `demo/configurator/usePresetEditor.ts` 657 LOC → 6 demo-private files + 1 thin façade.
**Rβ reference**: `docs/tranches/O/research/Rbeta-god-modules.md` §3.3.
**Status**: implementation complete; typecheck green.

## § Disposition (per-sub-module concern + Rβ cohesion verdict)

Per Rβ §3.3 the file mixed 5 concerns flat. Split into 6 files (the Rβ "concerns" → 5 sub-modules + 1 dedicated singleton/orchestration module, matching the W3.md Lane C plan):

| File | LOC | Concern | Rβ cohesion verdict |
|------|-----|---------|---------------------|
| `preset-editor/types.ts` | 97 | Type-only interfaces — `Density`, `FontSlots`, `FontOption`, `ConfigBaseline`, `ConfigDelta`, `DeltaKey`, `WritableField`, `PresetEditor`. Pure declarations; zero runtime cost. | COHESIVE — single concern, types only |
| `preset-editor/defaults.ts` | 90 | Const data + CSS-variable name tables — `FONT_OPTIONS`, `DEFAULT_CONFIG`, `DENSITY_SCALE`, `FONT_SLOT_VARS`, `FIELD_CSS_VARS`, `STORAGE_KEY`, `PRESET_LINK_ID`. | COHESIVE — schema-version + defaults colocated; the const tables are the writers' contract |
| `preset-editor/css-writers.ts` | 53 | Runtime CSS-variable application — `writeField`, `writeFontSlot`. Pure functions over `HTMLElement`; no module-level state, no localStorage, no `<link>` toggling. | COHESIVE — single concern, pure CSS-var mutation |
| `preset-editor/persistence.ts` | 139 | localStorage I/O + 2-version migration — `loadPersisted`, `persist`, internal `parseDelta`, `migrateFullSnapshotToDelta`, `looksLikeFullSnapshot`, type guards. | COHESIVE — pure data plumbing; testable in isolation now that it's not tangled with the DOM or the singleton |
| `preset-editor/stylesheet-swap.ts` | 53 | Preset-active stylesheet `<link>` hot-swap — `applyPresetStylesheet`, `disablePresetLink`, internal `ensurePresetLink` + the `presetLinkEl` module-singleton. | COHESIVE — owns the `<link id="glass-ui-demo-preset-link">` lifecycle end-to-end |
| `preset-editor/store.ts` | 313 | Singleton state + the `usePresetEditor()` factory — orchestrates the four supporting modules. Holds `applyDelta` (full-delta application composite) + `removeWritten` (CSS+link reset composite). Also the public re-export hub the façade points at. | COHESIVE — orchestration-only; every "what to write/persist/swap" lives in a peer module |

**Rβ cohesion verdict overall**: each split module has exactly one reason to change. Persistence migrations no longer force a re-read of the writer table; CSS-writer additions don't touch storage code; the stylesheet `<link>` substitution can be unit-tested without instantiating the singleton.

### Concern → file mapping (Rβ §3.3 numeric list)

| Rβ concern | Lines (original) | Target file |
|------------|------------------|-------------|
| 1. Types + defaults | 1–130 | `types.ts` + `defaults.ts` |
| 2. CSS prop writers | 130–196 | `css-writers.ts` |
| 3. Persistence + migration | 197–328 | `persistence.ts` |
| 4. Preset stylesheet swap | 329–365 | `stylesheet-swap.ts` |
| 5. Singleton store | 366–657 | `store.ts` |

One W3 plan-deviation worth noting: the W3.md Lane C bullet list says "store.ts — singleton + composable export". The store also owns `applyDelta` and `removeWritten` because both are composites that orchestrate the writers + stylesheet-swap modules — they would create a circular dependency if hoisted to `css-writers.ts`. Putting them at the orchestration layer (the store) keeps `css-writers.ts` pure.

## § File changes summary (657 → 6 files + 1 thin façade)

```
Original:
  demo/configurator/usePresetEditor.ts  657 LOC  (mixed: 5 concerns)

New layout:
  demo/configurator/preset-editor/
  ├── types.ts            97 LOC  — interfaces only
  ├── defaults.ts         90 LOC  — const tables + storage keys
  ├── css-writers.ts      53 LOC  — pure CSS-variable writers
  ├── persistence.ts     139 LOC  — localStorage + migration
  ├── stylesheet-swap.ts  53 LOC  — <link> hot-swap state
  └── store.ts           313 LOC  — singleton + composable

  demo/configurator/usePresetEditor.ts   24 LOC  — thin re-export façade

Total: 769 LOC across 7 files (+112 LOC vs 657, all from per-file headers /
import blocks / blank cohesion separators; no logic changes).
```

The façade pattern preserves the public surface verbatim: every name the existing `./index.ts` barrel re-exports (`DEFAULT_CONFIG`, `FONT_OPTIONS`, `usePresetEditor`, `PresetEditor`, `ConfigBaseline`, `ConfigDelta`, `DeltaKey`, `Density`, `FontOption`, `FontSlots`) is re-exported through `./usePresetEditor.ts` → `./preset-editor/store.ts`.

`PresetEditor.vue` imports `FONT_OPTIONS`, `usePresetEditor`, `type Density`, `type FontSlots` from `"./usePresetEditor"` — all four names still resolve through the façade with byte-identical types.

## § Verification

### Typecheck

```
$ npm run typecheck
> @mkbabb/glass-ui@1.2.2 typecheck
> vue-tsc --noEmit
(no errors)
```

Green. `vue-tsc --noEmit` traverses the demo directory (per the demo-private tsconfig include) and finds no type errors across the 6 new files + the façade + `PresetEditor.vue` + `index.ts`.

### Consumer-import invariance proof

Two direct importers of `./usePresetEditor` exist in the worktree:

```
$ grep -rn "from.*usePresetEditor\|from.*configurator/usePresetEditor" \
    --include="*.vue" --include="*.ts"
demo/configurator/index.ts:14:} from "./usePresetEditor";
demo/configurator/PresetEditor.vue:31:} from "./usePresetEditor";
```

Neither file was modified. The named imports they request:

- `index.ts` (barrel): `DEFAULT_CONFIG`, `FONT_OPTIONS`, `usePresetEditor`, `PresetEditor` (aliased as `PresetEditorApi`), `ConfigBaseline`, `ConfigDelta`, `DeltaKey`, `Density`, `FontOption`, `FontSlots` — **all 10 surface names re-exported by the façade**.
- `PresetEditor.vue`: `FONT_OPTIONS`, `usePresetEditor`, `Density`, `FontSlots` — **all 4 names re-exported by the façade**.

No `*.vue` story file was touched (W3 Lane C bounds). The orchestrator/external scan confirms no other consumer imports `./preset-editor/*` directly (the sub-modules are demo-private internals; consumers reach them only through the façade).

### Internal-helper containment

```
$ grep -rn "presetLinkEl|writeField|writeFontSlot|applyPresetStylesheet|\
ensurePresetLink|loadPersisted|migrateFullSnapshotToDelta|looksLikeFullSnapshot|\
parseDelta|FIELD_CSS_VARS|FONT_SLOT_VARS|DENSITY_SCALE|STORAGE_KEY|\
PRESET_LINK_ID|WritableField" demo/ src/  | grep -v "preset-editor/"
(zero hits)
```

Every internal helper that was previously a top-level binding in the 657-LOC file is now confined to its concern-specific sub-module. No leak into the façade, no leak into stories.

### Bundle profile

Per W3.md Lane C: the demo is not part of the library's published dist, so no bundle-profile change is expected and no `profile:budget` rerun is required. The split is purely structural.

## § Open questions for orchestrator

1. **W3 Lane C plan vs implementation deviation** — the Lane C bullet list in `W3.md` lists 6 files where the names imply `store.ts` holds only the singleton + composable. In practice `applyDelta` and `removeWritten` also live in `store.ts` because they are composites that orchestrate the four supporting modules; moving them to `css-writers.ts` would create a circular dependency on `stylesheet-swap.ts`. Calling this out per N invariant 23 (wire-before-retire — no silent contract drift); flag if the orchestrator wants `applyDelta`/`removeWritten` factored out to a 7th `orchestration.ts` module.
2. **`store.ts` at 313 LOC** is the only module that exceeds 200 LOC. The bulk is the `usePresetEditor()` factory body (setField/setFont/clearField/setPreset/reset) — these are the singleton's stable lifecycle methods and they collectively define the `PresetEditor` interface contract. Per Rβ this is COHESIVE-LARGE (single composable); splitting further would forfeit the `delta`/`written` closure that the methods share. Confirm orchestrator concurs.
3. **`WritableField` typing** — promoted to a `types.ts`-exported alias (was previously inferred from the `FIELD_CSS_VARS` const). Used by both `css-writers.ts` (the writer's discriminant) and `store.ts` (the setField narrow path). Symmetric `satisfies Record<WritableField, readonly string[]>` constraint on `FIELD_CSS_VARS` in `defaults.ts` is now the cohesion anchor.

## § Worktree diff verification

```
$ git status --porcelain
 M demo/configurator/usePresetEditor.ts
?? demo/configurator/preset-editor/
```

Two changes total:

1. `demo/configurator/usePresetEditor.ts` modified (657 LOC → 24 LOC façade).
2. `demo/configurator/preset-editor/` new directory containing 6 sub-modules.

No other file in the worktree was touched (verified via `git status` — only these two entries). The Lane C bounds (`demo/configurator/preset-editor/` NEW dir; `demo/configurator/usePresetEditor.ts` rewrite; this proof doc) were honoured exactly. Lane A files (`src/components/custom/timeline/`) and Lane B files (`scripts/profile-aurora.mjs`) were not touched.

Per the hardened agent git clause (K W0): no git mutations performed. Worktree files left in place for the orchestrator to inspect.
