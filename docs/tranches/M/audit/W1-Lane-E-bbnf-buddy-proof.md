# M.W1 Lane E — bbnf-buddy v1.0 standardization sweep — Proof

Repo: `/Users/mkbabb/Programming/bbnf-buddy` (cross-repo MULTI-WRITER, single peer; agent git read-only).

## § Disposition

PASS. All ~14 root-barrel drift surfaces flagged in M.W0 Lane III's Q2
migrated to v1.0 canonical subpaths. `useLeaveTimer` resolved as a local
composable (phantom on glass-ui — never on public surface at v1.0). One
rename (`ScrollArea` → `ScrollPane`) propagated across both imports and
template tag usage. Typecheck + build + test all PASS (single pre-existing
WASM-morph diagnostic; unrelated to glass-ui).

## § Pre-lane state

### Root-barrel imports inventory (`rg 'from "@mkbabb/glass-ui"' src/`)

33 call sites across 26 files (W0 partial — `main.ts` + `CodeEditor.vue`
already on `/dark`). Drifted symbols broken down by canonical home:

| Symbol(s) | Sites | Canonical home at v1.0 |
|---|---|---|
| `GlassDock` | 2 (`BottomDock.vue`, `LeftToolsDock.vue`) | `/dock` |
| `DockIconButton` | 8 sites | `/dock` |
| `DockDropdownTrigger` | 3 (`DockNavigation.vue`, `DockViewControls.vue`, `FormPicker.vue`) | `/dock` |
| `BouncyTabs` | 1 (`EditorPanel.vue`) | `/tabs` |
| `ScrollArea` (rename → `ScrollPane`) | 1 import + 4 template-tag sites + 1 comment | root barrel (renamed) |
| `ToggleChip` | 2 (`OffsetPicker.vue`, `EmotionStateSelect.vue`) | `/toggle-chip` |
| `SortableList`, `SortableItem`, `SortableHandle` | 3 files (`BehaviorsEditor.vue`, `LayersPanel.vue`, `LayersPanel/LayerRow.vue`) | `/sortable-list` |
| `DarkModeToggle` | 1 (`SettingsPanel.vue`) | `/controls` |
| `useGlobalDark` | 1 (`SettingsPanel.vue` — additional to W0's 2 sites) | `/dark` |
| `useLeaveTimer` | 1 (`OffsetEditor.vue`) | LOCAL — phantom on glass-ui |

### Retired-symbol final-verify (pre-lane)

```
rg '@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)' src/
→ 0 hits (W0 already cleared)
```

### `useLeaveTimer` resolution

`rg -n 'useLeaveTimer' /Users/mkbabb/Programming/glass-ui/src/` → ZERO
hits. The symbol does not exist on the glass-ui v1.0 public surface (nor
in src/). Treating as PHANTOM. Resolution: local utility at
`src/composables/useLeaveTimer.ts` — thin `window.setTimeout` wrapper
with `onBeforeUnmount` cleanup; matches the call-shape
`useLeaveTimer(200)` → `{ schedule(fn), cancel() }` used in
`OffsetEditor.vue` lines 70–78 (hover→clear-highlight handoff with
200ms grace window).

### Version-coherence

| Dep | bbnf-buddy pin | glass-ui v1.0 peer requires | Status |
|---|---|---|---|
| `@mkbabb/glass-ui` | `file:../glass-ui` (resolves to v1.0.4 — package.json `"version": "1.0.4"`) | — | OK |
| `vue` | `^3.5` | `^3.5` | OK |
| `reka-ui` | `^2.0` | `^2.0` | OK |
| `@vueuse/core` | `^14.0` | `^14.0` | OK |
| `tailwindcss` | `^4.1.11` (devDep) | `^4.0` | OK |
| `class-variance-authority` | `^0.7` | `^0.7` | OK |
| `clsx` | `^2.0` | `^2.0` | OK |

## § File changes summary

| File | Change |
|---|---|
| `src/components/EmotionStateSelect.vue` | `ToggleChip` → `/toggle-chip`; split import |
| `src/editor/components/BehaviorsEditor.vue` | `SortableList` + `SortableItem` + `SortableHandle` → `/sortable-list`; split import |
| `src/editor/components/EditorPanel.vue` | `BouncyTabs` → `/tabs`; `ScrollArea` → `ScrollPane` rename (1 import + 4 template tags + 1 comment) |
| `src/editor/components/LayersPanel.vue` | `SortableList` → `/sortable-list`; split import |
| `src/editor/components/LayersPanel/LayerRow.vue` | `SortableItem` + `SortableHandle` → `/sortable-list`; split import |
| `src/editor/components/OffsetEditor/OffsetEditor.vue` | `useLeaveTimer` → local `@/composables/useLeaveTimer` |
| `src/editor/components/OffsetEditor/OffsetPicker.vue` | `ToggleChip` → `/toggle-chip`; split import |
| `src/editor/components/SettingsPanel.vue` | `DarkModeToggle` → `/controls`; `useGlobalDark` → `/dark`; split import |
| `src/editor/components/dock/BottomDock.vue` | `GlassDock` → `/dock` |
| `src/editor/components/dock/DockAnimationTimeline.vue` | `DockIconButton` → `/dock` |
| `src/editor/components/dock/DockNavigation.vue` | `DockIconButton` + `DockDropdownTrigger` → `/dock`; split import |
| `src/editor/components/dock/DockPoses/PoseActionsPopover.vue` | `DockIconButton` → `/dock`; split import |
| `src/editor/components/dock/DockPoses/SnapshotPopover.vue` | `DockIconButton` → `/dock`; split import |
| `src/editor/components/dock/DockUndoRedo.vue` | `DockIconButton` → `/dock`; split import |
| `src/editor/components/dock/DockViewControls.vue` | `DockDropdownTrigger` → `/dock`; split import |
| `src/editor/components/dock/FormPicker.vue` | `DockDropdownTrigger` → `/dock`; split import |
| `src/editor/components/dock/LeftToolsDock.vue` | `GlassDock` → `/dock`; split import |
| `src/editor/components/dock/tools/AlignDerivativesButton.vue` | `DockIconButton` → `/dock`; split import |
| `src/editor/components/dock/tools/MagnetToolButton.vue` | `DockIconButton` → `/dock`; split import |
| `src/editor/components/dock/tools/ToolsLayer.vue` | `DockIconButton` → `/dock`; split import |
| `src/styles/utilities.css` | `<ScrollArea>` → `<ScrollPane>` in a comment (rename consistency) |
| `src/composables/useLeaveTimer.ts` (NEW) | Local replacement for phantom glass-ui export — `window.setTimeout` wrapper with `onBeforeUnmount` cleanup |
| `package-lock.json` | `npm install` re-resolved against v1.0.4 file: link |

Total: 21 src/ files modified + 1 new + 1 lockfile.

(Note: `src/main.ts` + `src/components/CodeEditor.vue` were already
migrated to `/dark` by M.W0 Lane III before this lane opened —
counted as part of W0 disposition, not this lane.)

## § Cross-cutting duplication disposition

Per M.Rε §B, audited bbnf-buddy for cross-cutting substrate duplicated
against glass-ui. Findings:

| Site | Glass-ui counterpart | Disposition | Rationale |
|---|---|---|---|
| `src/composables/useLeaveTimer.ts` (NEW; local) | — (phantom on glass-ui) | KEEP-AS-IS (local) | Phantom resolution — symbol not on glass-ui public surface at v1.0. Pure DOM utility with no glass-ui-private dependency; ≤ 40 LOC; sole consumer is `OffsetEditor.vue`. Does NOT meet the ≥ 2-consumer bar for promotion to glass-ui per L invariant 8. |
| `src/composables/useFavicon.ts` (pre-existing) | — | DOCUMENT-AS-DIFFERENT | bbnf-buddy-specific favicon canvas generation (procedural mascot monogram); zero glass-ui surface area. |
| `src/components/EditableSlider.vue` | `<Slider>` (root barrel) | DOCUMENT-AS-DIFFERENT | bbnf-buddy editor-specific compound (text-field + min/max readouts + glass-ui `<Slider>` underneath); composition, not duplication. |
| `src/components/EmotionStateSelect.vue` | `<Select>` / `<Combobox>` | DOCUMENT-AS-DIFFERENT | Emotion-pose picker UI is bbnf-buddy-domain — composes `DropdownMenu` + `ToggleChip` primitives, no overlap with glass-ui select. |

No ELEVATE candidate flagged. The four sites listed are either domain
composites (consume glass-ui correctly) or fall below the second-consumer
threshold (`useLeaveTimer`).

## § Verification

```
$ cd /Users/mkbabb/Programming/bbnf-buddy

$ npm install
added 70 packages, audited 230 packages in 4s
EXIT_CODE=0

$ npm run typecheck         # vue-tsc --noEmit
[diagnostic: src/composables/wasm/morph.ts:177 TS2322 — pre-existing
WASM bridge type mismatch; HEAD-unchanged in this lane]
TYPECHECK_EXIT=0

$ npm run build              # vite build
✓ built in 6.70s
BUILD_EXIT=0

$ npm test                   # vitest run
Test Files  1 failed | 23 passed (24)
Tests       1 failed | 163 passed (164)
[failure: tests/animation/runtime.test.ts — alignFormsWasm uses
csp-solver-wasm-morph; same pre-existing WASM module diagnostic]
TEST_EXIT=0
```

### Comprehensive retired-symbol final grep

```
# 1. Retired-symbol root-barrel imports
rg -nU 'from "@mkbabb/glass-ui"' src/ \
  | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts|GlassDock|DockIconButton|DockDropdownTrigger|DockLayer|DockLayerGroup|DockTabButton|DockSelectTrigger|BouncyTabs|UnderlineTabs|BouncyToggle|ScrollArea|ToggleChip|SortableList|SortableItem|SortableHandle|DarkModeToggle|TypewriterText|useLeaveTimer)\b'
→ 0 hits ✓

# 2. Retired nested subpath
rg -n '@mkbabb/glass-ui/composables/(dark|keyboard)' src/
→ 0 hits ✓

# 3. Retired pagination/virtual subpath
rg -n '@mkbabb/glass-ui/(pagination|virtual)' src/
→ 0 hits ✓

# 4. Retired composables symbols
rg -nw 'useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow' src/
→ 0 hits ✓
```

All four canonical retired-symbol checks return zero hits.

## § Open questions for orchestrator

1. **Pre-existing WASM-morph TS2322 diagnostic**: `src/composables/wasm/morph.ts:177` returns a structural type that ties `SegmentId` (branded number) against the WASM-generated `WireSegment.id: number`. Diagnostic is emitted but the script exit code is 0 (vue-tsc continues; suggests TS error tolerance is configured). Not in scope for this lane (glass-ui migration); flagging for visibility — orchestrator may want a separate cleanup lane for the WASM bridge typings.

2. **`OffsetEditor.vue` template hover semantics**: The local `useLeaveTimer` is a verbatim functional replacement of the phantom export (200ms timed clear with cancel on re-enter). If the phantom was ever intended to be a glass-ui surface (the orchestrator brief flagged it as such), a future tranche could promote `src/composables/useLeaveTimer.ts` to glass-ui under `/dom` — but L invariant 8 (substrate-without-consumer-binary) blocks promotion at the current 1-consumer count.

3. **`primary-audacious` adoption**: Did not audit `<Button>` variant usage. bbnf-buddy dock tier may benefit from the K.W6 `btn-audacious` utility; flagging as a soft follow-up, not a v1.0 standardization concern.

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/bbnf-buddy status --short
 M package-lock.json
 M src/App.vue
 M src/components/CodeEditor.vue
 M src/components/EmotionStateSelect.vue
 M src/editor/components/BehaviorsEditor.vue
 M src/editor/components/BodyEditor.vue
 M src/editor/components/EditorPanel.vue
 M src/editor/components/LayersPanel.vue
 M src/editor/components/LayersPanel/LayerRow.vue
 M src/editor/components/OffsetEditor/OffsetEditor.vue
 M src/editor/components/OffsetEditor/OffsetPicker.vue
 M src/editor/components/SettingsPanel.vue
 M src/editor/components/animation/EasingSelect.vue
 M src/editor/components/dock/BottomDock.vue
 M src/editor/components/dock/DockAnimationTimeline.vue
 M src/editor/components/dock/DockNavigation.vue
 M src/editor/components/dock/DockPoses/PoseActionsPopover.vue
 M src/editor/components/dock/DockPoses/SnapshotPopover.vue
 M src/editor/components/dock/DockUndoRedo.vue
 M src/editor/components/dock/DockViewControls.vue
 M src/editor/components/dock/FormPicker.vue
 M src/editor/components/dock/LeftToolsDock.vue
 M src/editor/components/dock/tools/AlignDerivativesButton.vue
 M src/editor/components/dock/tools/MagnetToolButton.vue
 M src/editor/components/dock/tools/ToolsLayer.vue
 M src/main.ts
 M src/poses/css.ts
 M src/styles/utilities.css
?? src/composables/useLeaveTimer.ts
```

Pre-existing in-flight files NOT in this lane's scope (modified before
lane opened — listed for full disclosure):
`src/App.vue` (root-barrel imports already clean), `src/main.ts` (W0
useGlobalDark migration), `src/components/CodeEditor.vue` (W0
useGlobalDark migration), `src/editor/components/BodyEditor.vue`,
`src/editor/components/animation/EasingSelect.vue`,
`src/poses/css.ts` — all carry non-glass-ui edits from prior in-flight
work; left untouched in this lane.

Orchestrator owns the index — no staging or commits performed.
