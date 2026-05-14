# O.Rδ — DI patterns + provide/inject audit

**Agent**: O.Rδ (delta — dependency injection + provide/inject)
**Scope**: src/ provide/inject sites; module-level singletons; cross-component shared state
**Mode**: READ-ONLY audit
**Tranche tip**: N close `37288e0` (v1.1.4)

---

## 1. Angle summary

Per O11: better encapsulation, consistent service boundaries, DI patterns. Per O2: fail explicitly; no silent fallbacks unless befitting. This audit enumerates every provide/inject pair across `src/`, scores each for InjectionKey hygiene + default-handling consistency, identifies missing-DI sites and dead provides, and proposes a canonical shape (typed `InjectionKey` + throw-on-missing helper composable) for O to adopt.

---

## 2. Evidence — provide/inject inventory

### 2.1 All `provide()` sites (10 total)

| # | Site | Key (raw) | Typed? | Provider helper? |
|---|---|---|---|---|
| 1 | `src/components/custom/dock/GlassDock.vue:89` | `glassDockContext` (via `provideDockContext`) | YES — `DockContext` interface | YES |
| 2 | `src/components/custom/dock/GlassDock.vue:98` | `"glassDockId"` (raw string) | NO | NO |
| 3 | `src/components/custom/dock/DockLayerGroup.vue:63` | `"dockLayerGroup"` (raw string) | NO (inline interface) | NO |
| 4 | `src/components/custom/dock/composables/useDockState.ts:230` | `"dockKeepOpen"` (raw string) | NO | NO |
| 5 | `src/components/custom/dock/composables/useDockState.ts:231` | `"dockRelease"` (raw string) | NO | NO |
| 6 | `src/components/custom/dock/composables/useDockState.ts:232` | `"dockExpanded"` (raw string) | NO | NO |
| 7 | `src/components/custom/dock/composables/useDockState.ts:237` | `"dockHeld"` (raw string; generic `<ComputedRef<boolean>>`) | NO key | NO |
| 8 | `src/components/custom/sortable-list/SortableList.vue:80` | `SORTABLE_CONTEXT` | YES — `InjectionKey<UseSortableReturn>` | NO (inline) |
| 9 | `src/components/custom/configurator/Configurator.vue:79` | `CONFIGURATOR_DENSITY_KEY` | YES — `InjectionKey<ComputedRef<ConfiguratorDensity>>` | NO (inline) |
| 10 | `src/components/custom/glyph-face/GlyphFace.vue:68` | `GlyphFaceSilhouetteKey` | YES — `InjectionKey<Ref<string \| undefined>>` | NO (inline) |
| 11 | `src/components/ui/toggle-group/ToggleGroup.vue:17` | `"toggleGroup"` (raw string) | NO | NO |

### 2.2 All `inject()` sites (13 total)

| # | Site | Key | Default | Default handling |
|---|---|---|---|---|
| A | `DockLayer.vue:29` | `"dockLayerGroup"` | `null` | **throws** if missing (`if (!group) throw`) |
| B | `dockContext.ts:26` (helper) | `DOCK_CONTEXT_KEY` (= `"glassDockContext"`) | `null` | returns nullable; consumer decides |
| C | `ConfiguratorRow.vue:62` | `CONFIGURATOR_DENSITY_KEY` | `undefined` | optional-chain on `injectedDensity?.value` |
| D | `HoverPopover.vue:138` | `"dockKeepOpen"` | `null` | optional-chain on call |
| E | `HoverPopover.vue:139` | `"dockRelease"` | `null` | optional-chain on call |
| F | `HoverPopover.vue:140` | `"glassDockId"` | `null` | used in computed; falsy → no portal attr |
| G | `SortableItem.vue:29` | `SORTABLE_CONTEXT` | (none) | **throws** if missing |
| H | `DiscoGlyph.vue:82` | `GlyphFaceSilhouetteKey` | `null` | silent no-op when no GlyphFace ancestor |
| I | `Slider.vue:48` | `"dockKeepOpen"` | `null` | optional-chain on call |
| J | `Slider.vue:49` | `"dockRelease"` | `null` | optional-chain on call |
| K | `Slider.vue:50` | `"dockHeld"` | `null` | optional-chain on `.value` |
| L | `DropdownMenuContent.vue:27` | `"glassDockContext"` | `null` | optional-chain on `.id` |
| M | `ToggleGroupItem.vue:16` | `"toggleGroup"` | (none) | silent fallback to local prop |
| N | `PopoverContent.vue:33` | `"glassDockContext"` | `null` | optional-chain on `.id` |
| O | `SelectContent.vue:35` | `"glassDockContext"` | `null` | optional-chain on `.id` |

### 2.3 Typed `InjectionKey<T>` declarations (only 3)

```
src/components/custom/sortable-list/context.ts:11
  → SORTABLE_CONTEXT: InjectionKey<UseSortableReturn>

src/components/custom/configurator/density.ts:25
  → CONFIGURATOR_DENSITY_KEY: InjectionKey<ComputedRef<ConfiguratorDensity>>

src/components/custom/glyph-face/keys.ts:10
  → GlyphFaceSilhouetteKey: InjectionKey<Ref<string | undefined>>
```

### 2.4 Module-level shared state (DI-adjacent)

| Site | Pattern | Justified? |
|---|---|---|
| `src/composables/dom/useTouchGate.ts:21` | `const gateRegistry = new Set<GateProxy>()` + shared listener install/uninstall ref-counted | **YES** — cross-instance off-target detection requires a single shared `touchstart` listener; per-instance listeners would multiply N×N |
| `src/composables/sortable/useSortable.ts:180` | `const instances = new Set<InstanceHandle>()` | **YES** — cross-list drag requires source-list lookup at drop time |
| `src/composables/keyboard/useKeyboardShortcuts.ts:214` | `createGlobalState(useShortcutRegistry)` (vueuse-bearing) | **YES** — global keyboard registry by design |
| `src/composables/dark/useGlobalDark.ts:15` | `createGlobalState` (vueuse-bearing) | **YES** — global dark-mode state by design |

No module-level state was found in `src/composables/sidebar/`. Sidebar composables are per-instance (correct — sidebars are independent).

---

## 3. Findings

### 3.1 Dock subsystem — INCONSISTENT (highest-priority cleanup target)

The dock subsystem provides FIVE keys to descendants — `glassDockContext`, `glassDockId`, `dockKeepOpen`, `dockRelease`, `dockExpanded`, `dockHeld`. Of these:

- **`glassDockContext`** has a typed helper (`provideDockContext` / `useDockContext` at `dockContext.ts`). Only `DockLayerGroup.vue:40` consumes via the helper. Three UI primitives (`PopoverContent`, `SelectContent`, `DropdownMenuContent`) and `HoverPopover` all bypass the helper and string-key `inject("glassDockContext", null)` directly with inline `{ id: string } | null` typing — drift.
- **`glassDockId`** is a SECOND provide on the same provider that duplicates `glassDockContext.id`. `HoverPopover.vue:140` is the only consumer. Justification in code comment: "string-keyed dock id for `<HoverPopover keep-dock-open>`" — but `HoverPopover` could equally read `useDockContext()?.id`. Pure drift; one provide can be removed.
- **`dockKeepOpen` / `dockRelease` / `dockHeld`** are raw-string keyed by `useDockState`; consumed by `Slider` (3 calls) + `HoverPopover` (2 calls). No typed key, no helper composable.
- **`dockExpanded`** is provided at `useDockState.ts:232` but **never injected anywhere** in `src/`. **Dead provide** (per the wire-before-retire posture: either wire a consumer or remove the provide — current state is substrate-without-consumer at the provide layer).

**Verdict**: WIRE — consolidate to a single typed `DOCK_CONTEXT_KEY: InjectionKey<DockContext>` carrying `{ id, orientation, keepOpen, release, held, expanded }` and a single `useDockContext()` helper. Migrate Slider, HoverPopover, PopoverContent, SelectContent, DropdownMenuContent to the helper. Remove the duplicate `glassDockId` provide. Remove or wire `dockExpanded`.

### 3.2 Configurator subsystem — CLEAN

- `CONFIGURATOR_DENSITY_KEY` is correctly typed (`InjectionKey<ComputedRef<ConfiguratorDensity>>`), correctly placed in its own module (`density.ts`), correctly carries a `ComputedRef` for reactivity, correctly handled with prop-over-inject precedence in `ConfiguratorRow`. Default `undefined` resolves to `undefined` → no `data-density` attr → bit-for-bit-preserved pre-N.W2 visual. N.W2 Lane A pattern is canonical.
- `useConfiguratorState<T>` is a stand-alone composable, not DI'd through Configurator. Per N.W4 audit (cited in CLAUDE.md), Aurora "consumes `useConfiguratorState<AuroraConfig>`" — but verified at HEAD via `rg -n 'useConfiguratorState' src/`: zero consumers outside configurator/'s own files. The CLAUDE.md claim is stale (it's a demo-side wiring, not src/ wiring). Not a src/ DI gap.

**Verdict**: KEEP. Pattern at `CONFIGURATOR_DENSITY_KEY` is the canonical reference shape for O.

### 3.3 Sortable subsystem — CLEAN

- `SORTABLE_CONTEXT` is typed, lives in its own `context.ts` module, default-handling throws explicitly per O2 (`SortableItem.vue:30-34`: `if (!sortable) throw new Error("[glass-ui] <SortableItem> must be used inside <SortableList>")`).

**Verdict**: KEEP. Pattern at `SortableItem.vue` is the canonical reference for throw-on-missing.

### 3.4 GlyphFace ↔ DiscoGlyph — CLEAN (optional cooperation)

- `GlyphFaceSilhouetteKey` is typed, lives in `keys.ts`, defaults to `null` and the consumer (`DiscoGlyph.vue:82-91`) silent-no-ops when absent. **This silent fallback is befitting** (per O2) — the cooperation is optional; DiscoGlyph stands alone OR cooperates with a wrapping GlyphFace.

**Verdict**: KEEP. Distinguish from `Slider/HoverPopover` dock cooperation, which is the SAME pattern (optional cooperation with an ancestor) — i.e., the dock-key inject defaults are also befitting, not legacy.

### 3.5 ToggleGroup ↔ ToggleGroupItem — DRIFT (low priority)

- Raw-string key `"toggleGroup"`. No InjectionKey. Inline `ToggleGroupVariants` type cast. ToggleGroupItem silent-falls-back to local props when context is missing — also befitting (ToggleGroupItem may be used solo), but the raw string is unhygienic.

**Verdict**: WIRE (low-priority polish) — promote to typed `TOGGLE_GROUP_KEY: InjectionKey<ToggleGroupVariants>` in `_shared/` or `toggle-group/context.ts`. Untouched in this tranche if scope tight.

### 3.6 DockLayer ↔ DockLayerGroup — DRIFT (medium priority)

- Raw-string key `"dockLayerGroup"`. The `DockLayerGroupContext` interface is **duplicated** between provider (`DockLayerGroup.vue`) and consumer (`DockLayer.vue:22-27`). Default `null` is throw-handled — correct per O2.

**Verdict**: WIRE — extract `DockLayerGroupContext` + typed `InjectionKey` to `dock/composables/dockLayerGroup.ts` (matching the existing `dockContext.ts` shape). Eliminates the duplicated interface AND the string-key drift.

### 3.7 Sidebar composables — NO DI USED

- `useSidebarState`, `useSidebarFollow`, `useScrollTracker`, `useTreeIndex` are 4 independent per-instance composables. None provide; none inject. Component-level consumption only. No god module; no shared state.

**Verdict**: KEEP. No DI gap.

### 3.8 Missing-DI candidates — none identified

The audit looked for cases where current code reaches for a global/direct import where DI would be cleaner. None found. The 4 module-level singletons identified at §2.4 are all load-bearing (cross-instance coordination requires shared state; per-instance DI would not solve the problem).

### 3.9 InjectionKey hygiene gaps

| Gap | Sites | Severity |
|---|---|---|
| Raw-string key with typed-helper-already-exists | `glassDockContext` consumers (Slider, HoverPopover, PopoverContent, SelectContent, DropdownMenuContent) | **HIGH** — the typed helper `useDockContext()` is the single source of truth and is bypassed |
| Raw-string key, no helper | `dockKeepOpen` / `dockRelease` / `dockHeld` / `dockExpanded` / `glassDockId` / `dockLayerGroup` / `toggleGroup` | **MEDIUM** — the keys ARE service boundaries; promoting to `InjectionKey<T>` gives compile-time guarantees |
| Dead provide (zero consumers in src/) | `dockExpanded` | **MEDIUM** — wire OR remove |
| Duplicate provide (same data, two keys) | `glassDockId` duplicates `glassDockContext.id` | **MEDIUM** — collapse to one |

---

## 4. Proposed plan implications

### 4.1 Canonical DI shape for O to adopt

Per N.W2 Lane A precedent (`CONFIGURATOR_DENSITY_KEY`) + N.W4 invariant 23 (wire-before-retire), the canonical DI shape across glass-ui subsystems is:

**Step 1 — typed key in its own module.**

```ts
// src/components/custom/<pkg>/keys.ts (or context.ts)
import type { InjectionKey } from "vue";
export interface FooContext { /* ... */ }
export const FOO_KEY: InjectionKey<FooContext> = Symbol("glass-ui:foo");
```

**Step 2 — `provideFooContext` / `useFooContext` helper pair.**

```ts
// same module
import { inject, provide } from "vue";
export function provideFooContext(ctx: FooContext): void {
    provide(FOO_KEY, ctx);
}
export function useFooContext(): FooContext {
    const ctx = inject(FOO_KEY, null);
    if (!ctx) throw new Error("[glass-ui] useFooContext must be called inside <Foo>");
    return ctx;
}
export function useOptionalFooContext(): FooContext | null {
    return inject(FOO_KEY, null);
}
```

**Step 3 — provider component uses `provideFooContext`; consumer components use `useFooContext` (strict) OR `useOptionalFooContext` (optional cooperation per §3.4).**

This pair (strict vs. optional) makes the contract explicit at the call site — no more eyeball-reading `inject<T | null>(key, null)` to decide whether the consumer requires the ancestor or merely cooperates with it.

### 4.2 Dock subsystem migration (O.W* lane proposal)

Folded into O wave that absorbs O11 + O15-derived dock cleanups (likely "DI standardization" wave):

1. Extend `DockContext` at `dock/composables/dockContext.ts` to carry `{ id, orientation, keepOpen, release, held, expanded? }` — promote from `provideDockContext({ id, orientation })` to a richer context that the existing `useDockState` populates.
2. Migrate `useDockState.ts` to `provide(DOCK_CONTEXT_KEY, fullContext)` once, instead of 4 separate `provide("dockKeepOpen", ...)` / `provide("dockRelease", ...)` / `provide("dockExpanded", ...)` / `provide("dockHeld", ...)`.
3. Add `useDockContext()` (strict — throws) + `useOptionalDockContext()` (optional — for primitives like Popover/Select/Dropdown that may be used outside a dock).
4. Migrate Slider, HoverPopover, PopoverContent, SelectContent, DropdownMenuContent to `useOptionalDockContext()`. Each call site reduces from 3 inject calls (Slider) to 1.
5. Remove `provide("glassDockId", ...)` at `GlassDock.vue:98` — duplicates `glassDockContext.id`.
6. Either wire `dockExpanded` (the substrate is there — the demo-side `<DockShowcase>` chrome could conceivably consume it) OR remove. Wire-before-retire defaults to WIRE; orchestrator decides based on consumer-audit findings (round 2).

### 4.3 DockLayer subsystem migration (same wave)

1. Extract `DockLayerGroupContext` interface + `DOCK_LAYER_GROUP_KEY: InjectionKey<DockLayerGroupContext>` to `dock/composables/dockLayerGroup.ts`.
2. Promote raw-string `provide("dockLayerGroup", ...)` to `provide(DOCK_LAYER_GROUP_KEY, ...)`.
3. Provide `provideDockLayerGroup` + `useDockLayerGroup` (strict — throws; matches current DockLayer behavior).

### 4.4 ToggleGroup polish (deferable; low priority)

1. Add `src/components/ui/toggle-group/context.ts` with typed `TOGGLE_GROUP_KEY`.
2. Optional cooperation pattern (silent fallback to local props is correct).

### 4.5 No-action subsystems

Configurator (density), Sortable, GlyphFace, sidebar composables — all canonical. No O changes.

---

## 5. Risks

- **Risk R1 — breaking change at consumer boundary.** The provide/inject contract is internal (no consumer in `src/`-external code reaches into these inject keys per `MIGRATION.md` review at v1.0 — but demo + downstream consumers MIGHT). Round-2 consumer audit must spot-verify whether any demo / downstream consumer string-keys these dock injects. If yes → migration shim deferred OR forced rename in next major; if no → clean break.
- **Risk R2 — Slider's keepDockOpen contract is the only cross-substrate proof story (per CLAUDE.md §"Slider keep-dock-open contract").** Refactor must not regress the bidirectional contract. Acceptance: existing demo-side proof at `demo/stories/compositions/dock-with-slider.vue` continues to pass (visual + interaction).
- **Risk R3 — `dockExpanded` dead-provide disposition.** If wire-before-retire applies (per N invariant 23), the question "is there a useful consumer for `dockExpanded`?" must be answered by the consumer audit before retiring. Default to retire IF round-2 finds zero meaningful demand.
- **Risk R4 — `useDockContext` strict-vs-optional split.** A primitive like `<PopoverContent>` is used BOTH inside a dock (where it sets the portal-allowlist attrs) AND standalone. The optional helper is correct. The risk is a future contributor accidentally using the strict helper and shipping a contract that breaks standalone usage. Mitigation: name both helpers explicitly (`useDockContext` strict; `useOptionalDockContext` optional) — no overloaded API.
- **Risk R5 — N.W4 stale claim in CLAUDE.md.** CLAUDE.md asserts "Aurora chrome consumes `useConfiguratorState<AuroraConfig>`" but `rg -n 'useConfiguratorState' src/` returns zero hits outside configurator/. This claim refers to demo wiring, not src/ wiring. Folded into O-N-3 doc-tier wave or a doc-fix at this tranche close.

---

## Verification

- Read commands cited: `rg -n 'provide\(' src/`, `rg -n 'inject<\|inject\(' src/`, `rg -n 'InjectionKey<' src/`, `rg -n 'dockKeepOpen|dockRelease|dockHeld|dockExpanded' src/`, `rg -n 'useDockContext|provideDockContext' src/`, `rg -ln 'useConfiguratorState' src/`.
- Spot-verified files: `src/components/custom/dock/composables/dockContext.ts`, `src/components/custom/dock/composables/useDockState.ts`, `src/components/custom/dock/GlassDock.vue`, `src/components/custom/dock/DockLayer.vue`, `src/components/custom/dock/DockLayerGroup.vue`, `src/components/ui/slider/Slider.vue`, `src/components/custom/hover-popover/HoverPopover.vue`, `src/components/custom/configurator/Configurator.vue`, `src/components/custom/configurator/ConfiguratorRow.vue`, `src/components/custom/configurator/density.ts`, `src/components/custom/sortable-list/SortableItem.vue`, `src/components/custom/sortable-list/context.ts`, `src/components/custom/disco-glyph/DiscoGlyph.vue`, `src/components/custom/glyph-face/GlyphFace.vue`, `src/components/custom/glyph-face/keys.ts`, `src/components/ui/toggle-group/ToggleGroup.vue`, `src/components/ui/toggle-group/ToggleGroupItem.vue`, `src/components/ui/dropdown-menu/DropdownMenuContent.vue`, `src/components/ui/popover/PopoverContent.vue`, `src/components/ui/select/SelectContent.vue`, `src/composables/dom/useTouchGate.ts`.
- Worktree diff: this lane is read-only — no diff.

## Open questions for orchestrator

1. **`dockExpanded` disposition** — wire to a useful consumer (candidate: demo-side dock chrome status indicators) OR retire? Round-2 consumer audit should resolve.
2. **`glassDockId` collapse** — confirm no consumer-external code injects this raw string before removing.
3. **Toggle-group polish in scope?** — low-priority cleanup; orchestrator decides whether to bundle into O DI-standardization wave or defer.
4. **CLAUDE.md doc-drift** — Aurora `useConfiguratorState` claim stale per §5 R5; fold into O.W* doc-tier wave (matches O-N-3 cohort).
