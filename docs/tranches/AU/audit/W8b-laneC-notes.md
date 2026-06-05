# AU.W8b Lane C (framework) — notes

Units: AU.W8b.5 (defineModel ×8) + AU.W8b.6 (Readonly dock layer-context guards).
Worktree: `glass-ui-w8b-c` (branch `w8b-c`, from W8 commit `6dd0d14`).

## AU.W8b.5 — the 8 defineModel conversions

All 8 re-grounded against HEAD (W8 drift checked). NONE was already on `defineModel`
at HEAD — all 8 were live conversions. Each public prop+event surface is preserved
exactly (`modelValue`/`update:modelValue`, `open`/`update:open`, `page`/`update:page`),
so demo + downstream consumers need zero changes (verified: `typecheck` covers `demo/`).

| # | site | conversion | notes |
|---|---|---|---|
| 1 | `ui/multi-select/MultiSelect.vue` | `defineModel<string[]>({ default: () => [] })` | matched spec default; uncontrolled mount now reads `[]` (prior required-prop crash on `.includes` is now a safe empty) — added uncontrolled-mount test. |
| 2 | `custom/tabs/BouncyTabs.vue` | `defineModel<string>({ required: true })` | inner `BouncyToggle` bound `:model-value="model"`; `onUpdate` narrows the toggle's `string\|string[]` emit back to string. |
| 3 | `custom/tabs/UnderlineTabs.vue` | `defineModel<string>({ required: true })` | `select()` writes `model.value`; `aria-selected` reads `model`. |
| 4 | `custom/tabs/BouncyToggle.vue` | `defineModel<string \| string[]>({ required: true })` | both emits → `model.value`; `activeValues`/`updateSingleSlider`/watch re-pointed at `model`. Existing `bouncy-toggle-scroll.test.ts` already a round-trip (multi-select); added single-select round-trip. |
| 5 | `custom/responsive-tabs/ResponsiveTabs.vue` | `defineModel<string>({ required: true })` | ONE model drives BOTH child controls (Select + UnderlineTabs via `effectiveDesktopValue`). |
| 6 | `custom/hover-popover/HoverPopover.vue` | `defineModel<boolean>("open", { default: false })` | DELETED the dual-watch reconciliation (`props.open`→`isOpen` + `isOpen`→emit) and the `isOpen` ref; `open` model is now the single source for reka `v-model:open`, the native `toggle` sync, AND the keepDockOpen watcher. **keepDockOpen CONFIRMED non-regressed** (test: open→`keepOpen()`×1, close→`release()`×1, `keepDockOpen:false`→no token). `{ default: false }` preserves the prior `props.open ?? false` uncontrolled cadence (reka writes the local model). |
| 7 | `ui/data-table/DataTable.vue` | `defineModel<number>("page", { required: true })` | page model ONLY; `update:sort` STAYS a plain emit (carries `{key,direction}` — an event, not a model). Tests assert both: page round-trip + `update:sort` still a plain emit. |
| 8 | `custom/configurator/ConfiguratorLayer.vue` | `defineModel<boolean \| undefined>("open", { default: undefined })` | controlled-or-uncontrolled. `{ default: undefined }` bypasses Vue's boolean-prop coercion so the unbound model reads `undefined`; seeded once to `props.defaultOpen` — preserving the prior `props.open ?? props.defaultOpen` cadence AND natively fixing the old coercion bug the retired `open: undefined` withDefaults override patched. `internalOpen` ref + external-sync watch RETIRED. |

Round-trip tests added/extended (RENDERED-behavior per binding-verification discipline):
`tabs/__tests__/tabs-model.test.ts` (new), `multi-select/__tests__/MultiSelect.test.ts` (+3),
`data-table/__tests__/DataTable.test.ts` (+3), `responsive-tabs/__tests__/ResponsiveTabs.model.test.ts`
(new), `configurator/__tests__/ConfiguratorLayer.model.test.ts` (new),
`hover-popover/__tests__/HoverPopover.model.test.ts` (new).

## AU.W8b.6 — Readonly context guards

- `dockLayerContext.ts`: `currentLayerId` → `Readonly<Ref<string>>`, `leavingLayerId`
  → `Readonly<Ref<string | null>>` on `DockLayerGroupContext`.
- `DockLayerGroup.vue` provide site: imports `readonly` from vue; provides
  `readonly(currentLayer)` / `readonly(leavingLayer)`. The W8 reka-Tabs rail
  (the `<Tabs v-model="activeLayer">` block) is UNDISTURBED — the readonly wrap
  is a one-line projection at the existing `provideDockLayerGroupContext({...})`
  call only. `useLayerTransition` keeps its OWN writable `currentLayer`/`leavingLayer`
  refs and goes on mutating them (it owns the transition state); only the context
  projection is readonly. `<DockLayer>` only READS `currentLayerId.value`/`leavingLayerId.value`
  (for `isActive`/`isLeaving`) — no write site, so the guard is non-breaking.
- Negative fixture: `dock/__tests__/dockLayerContext.readonly.test-d.ts` (type-only,
  zero-runtime). **Uses `expectTypeOf` ONLY — no `@ts-expect-error` directive** —
  because `proof:strict-templates` forbids ALL suppression directives anywhere in
  `src/` (the idiomatic-root rule; the spec's "`@ts-expect-error` fixture" wording
  conflicts with that gate, so the negative-write proof is re-expressed as a
  `toEqualTypeOf<Readonly<Ref<…>>>` + `not.toEqualTypeOf<Ref<…>>` type-shape pair).
  Bite-verified: relaxing the context type back to a writable `Ref` reddens
  `vue-tsc --noEmit` (the `expectTypeOf` matchers flip → `TS2554`).

### dockContext.ts audit verdict — NO-OP (no mutable-ref leak)

`provideDockContext(...)` in `GlassDock.vue:183-189` passes: `id` (string),
`orientation` (ComputedRef), `keepOpen`/`release` (functions), `held: isHeld`
(a ComputedRef). The internal `keepOpenCount` mutable ref is NEVER provided.
The `DockContext` type already types `held` as `ComputedRef<boolean>` and the
two callables as `() => void`. Nothing leaks a writable `Ref`. No change made —
per the spec, recorded as a confirmed no-op (do not invent a change).

## Gate outputs (all green in this worktree)

- `npm run typecheck` — GREEN.
- `npm run proof:strict-templates` — GREEN (exit 0; zero `src/` suppressions).
- `npm run proof:dock-a11y-contract` — GREEN (8/8; DockLayerGroup touched).
- `npx vitest run` over all touched dirs — 13 files / 62 tests GREEN.
- `npm run build` — GREEN (vite arm + vue-tsc dts arm, exit 0).

## Risks

- **HoverPopover keepDockOpen**: covered by a focused test (acquire/release on
  the defineModel setter path, and no-token when `keepDockOpen:false`). The reka
  HoverCard hover machinery is not driveable in happy-dom, so the test drives the
  open state via the v-model:open channel (the SAME ref reka writes on hover).
- **DockLayerGroup composition**: the readonly wrap is provide-site-only; the
  reka-Tabs rail + `useLayerTransition` writable refs are untouched. dock-a11y
  contract stays green.

## Git / scope discipline

- ZERO working-tree-mutating git subcommands run (read-only `git status` only).
- ZERO writes to the main tree — all edits inside `glass-ui-w8b-c`.
- `docs/precepts/` untouched. `docs/tranches/AU/PROGRESS.md` untouched (orchestrator-owned).
