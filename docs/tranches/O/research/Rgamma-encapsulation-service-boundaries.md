# Rγ — Encapsulation + Service Boundaries

**Tranche:** O
**Angle:** O9 + O10 — leaky abstractions, service-boundary consistency, cross-module shared state, public-surface shape
**Method:** read-only audit of `src/` at N close (`37288e0`, v1.1.4) + worktree HEAD
**Cap:** ~300 lines

---

## 1. Angle summary

glass-ui at L close formalised three public surfaces — root barrel (`src/index.ts`), `/api` discovery layer (`src/api/index.ts`), 38 flat per-package subpaths. The L.W1 SCC carve-out cleanly walled off vueuse-bearing leaves, but did NOT canonicalise the **inner** shape of what each surface exposes. The audit asks four questions:

1. **Leaky abstraction**: does any public symbol leak implementation detail (private state ref, registry singleton, internal token name)?
2. **Service-boundary consistency**: do composables share a return shape — `{state, actions}` object — or do shapes drift (tuple, void, plain ref, module-level dispatcher)?
3. **Cross-module shared state**: which module-level singletons exist? Which should be DI'd (overlap with Rδ)?
4. **Public-surface gap**: types/constants on a per-package barrel that should be on `/api`; types on `/api` that aren't on the implementing barrel; types that leak only via per-package subpath without `/api` echo.

---

## 2. Evidence

### 2.1 Module-level mutable state (singletons)

`rg 'const \w+ = new (Set|Map|WeakMap|WeakSet)' src/`:

| Site | Singleton | Scope |
|---|---|---|
| `src/composables/dom/useTouchGate.ts:21` | `gateRegistry: Set<GateProxy>` | cross-instance touch-outside dispatch |
| `src/composables/sortable/useSortable.ts:180` | `instances: Set<InstanceHandle>` | cross-list drop resolution (`group` keyed) |
| `src/components/ui/toast/use-toast.ts:26` | `toastTimeouts: Map<string, timeout>` | per-toast removal queue |
| `src/components/ui/toast/use-toast.ts:44` | `toasts = ref<ToasterToast[]>([])` | module-level toast list ref |
| `src/components/ui/data-table/DataTable.vue:61` | `generatedRowIds: WeakMap<object, symbol>` | stable row ids across re-renders |
| `src/components/custom/typewriter/TypewriterText.vue:141` | `activeTimers: Set<TypewriterTimer>` | cross-instance timer registry |
| `src/components/custom/typewriter/utils/timing.ts:6` | `listeners: Set<() => void>` | tick subscription |
| `src/freshness.ts:24-25` | `SRC_EXT`, `SKIP_DIRS` (immutable consts) | constants, not state — N/A |
| `src/utils/cn.ts:165` | `lastIndex: Map<string, number>` | per-call local — N/A |

`rg 'createGlobalState' src/`:

| Site | Symbol |
|---|---|
| `src/composables/dark/useGlobalDark.ts:15` | `useGlobalDark` (canon — confined to `/dark` subpath) |
| `src/composables/keyboard/useKeyboardShortcuts.ts:214` | `useShortcutRegistry` (canon — confined to `/keyboard` subpath) |

Both vueuse globals sit exactly where L.W1 Lane C carved them. Compliant.

### 2.2 Composable return-shape sampling

`rg 'return \{' across composables/`:

| Composable | Return shape |
|---|---|
| `useTouchGate` | `{ isActive, isTouchDevice, handleTouchStart, handleScrollCheck, handleTouchEnd, resetTimer, deactivate, suppressDeactivate }` — flat (state ref + 7 actions, no nested grouping) |
| `useGlobalDark` | `{ isDark, toggleDark, disableTransitions, setDisableTransitions }` — flat (2 refs + 2 actions) |
| `useConfiguratorState<T>` | `{ config, activePreset, isDirty, selectPreset, resetCurrent, cyclePreset, getPreset }` — flat (state + 3 computeds + 4 actions); explicit `ConfiguratorState<T>` interface |
| `useSidebarState` | `{ sections, activeId, activeRootId, treeIndex, isExpanded, toggleSection, navigateTo, scrollToTop, isActive, isInActiveChain }` — flat (data + refs + actions); explicit `SidebarState` interface |
| `useSortable<T>` | `{ registerItem, container, isDragging, dragId, dragPosition, dropIndex }` — flat (1 factory action + 1 binding + 4 computeds); explicit `UseSortableReturn` interface |
| `useAurora` | `{ setCursor, clearCursor, setCursorRadius, renderAt, pause, resume }` — **actions only**; no `UseAuroraReturn` interface (inline literal type at call-site) |
| `useGlassRenderer` | `{ tier }` — single ref; no actions |
| `useResizeObserver` | `{ stop }` — single action; no state |
| `useTokenColor` | `{ value, refresh }` — ref + action |
| `useInterval` / `useTimer` | `{ start, stop, ... }` — actions; consistent |
| `useDarkModeSync` | `void` — **side-effect-only** (subscribes to `useGlobalDark` and fires callback) |
| `useStaggerReveal` | `{ targets, register, revealed }` — flat |
| `useSidebarFollow` | `{ queueSidebarFollow }` — single action |

**Shape verdict:** ~85% follow the flat `{state-refs + computeds + actions}` object pattern. The outliers are `useDarkModeSync` (returns `void`; not a composable in the controlled-facade sense — it's a watch-installer) and `useAurora` (inline-typed return without an exported `UseAuroraReturn` interface).

### 2.3 Public-surface inventory: `/api` vs per-package barrels

`/api` re-exports (N close, 37 symbols — 29 types + 8 constants):

| Source package | Symbols promoted to `/api` | Symbols on barrel NOT on `/api` |
|---|---|---|
| `aurora` | `AuroraConfig`, `AuroraCursorApi`, `AuroraFlow`, `AuroraInstance`, `AuroraMedium`, `AuroraNucleus`, `AuroraRuntimeMode`, `AuroraRuntimeOptions`, `FlowPattern`, `OklchStop`, `StrokeMode`, `WarpMode`, `DEFAULT_AURORA_CONFIG`, `MAX_NUCLEI`, `MAX_STOPS` | `useAurora`, `useCursorInteraction`, `createAurora`, color utilities (`cssToOklch`, `flattenPalette`, `hexToOklchStop`, `oklchStopToHex`, `oklchToLinear`) — composables + utilities (correct exclusion per `/api` charter) |
| `configurator` | `ConfiguratorCloneMode`, `ConfiguratorPreset`, `ConfiguratorScrollMode`, `ConfiguratorState`, `ConfiguratorStateOptions` | `CONFIGURATOR_DENSITY_KEY`, `ConfiguratorDensity` — **`/api` gap** if density is intentionally public; or **leaky** if intentionally private |
| `metaballs` | `MetaballConfig`, `DEFAULT_METABALL_CONFIG` | `isWebGLSupported` (runtime predicate), `useMetaballs` |
| `timeline` | `TimelineSegment`, `TimelineSegmentGradient`, `TimelineSegmentState` | none |
| `card` | `CardTier` | (re-exported `*` so all ui/card symbols flow through root barrel too) |
| `glass-panel` | `GlassPanelVariant` | `GlassPanelProps` — **`/api` gap candidate** (parallels `*Variants` policy; consumer needs props shape to wrap component) |
| `instrument-chassis` | `InstrumentChassisPhase` | none |
| `toast` | `ToastVariant` | `Toast` (aliased `ToastType` on barrel) — **`/api` gap candidate** if consumers type their own toast call-sites |
| `alert`, `avatar`, `badge`, `button`, `sheet`, `slider`, `toggle` | `*Variants` | `*Variants` const itself (CVA function) is on barrel but NOT on `/api` — `/api` only carries the derived **type**, not the runtime CVA (correct per charter) |
| `toggle-chip` | `ToggleChipVariants` | `toggleChipVariants` (CVA) — same pattern as ui/ |
| `sidebar` | nothing on `/api` | `TreeNode`, `TreeIndexEntry`, `SidebarSection`, `SidebarIndexEntry`, `SidebarState`, `ScrollTrackerOptions` — **`/api` gap candidate**: `SidebarState` parallels `ConfiguratorState` semantically (composable return type), but isn't promoted |
| `stacked-icons` | nothing | `StackedIconGroupProps` |
| `tabs` (custom) | nothing | `TabOption`, `ToggleOption`, `BouncyToggleProps` |
| `glass-carousel` | nothing | `UseGlassCarouselOptions` |
| `search` | nothing | `SearchableItem`, `SearchResult`, `FuzzySearchState`, `UseFuzzySearchOptions`, `SearchIndex` — **substantial domain types absent from `/api`** |
| `sortable-list` | nothing | `SORTABLE_CONTEXT` (InjectionKey — internal contract) |

**`*Variant` vs `*Variants` naming irregularity:** `src/components/ui/avatar/index.ts:7,28`:
```
export const avatarVariant = cva(...)         // SINGULAR — outlier
export type AvatarVariants = VariantProps<typeof avatarVariant>
```
Every other ui/ component uses plural `*Variants` for both const and type (`buttonVariants` + `ButtonVariants`, `sliderVariants` + `SliderVariants`, etc). The `/api` re-export hides this — `/api` carries the canonically-named `AvatarVariants` type but the underlying runtime const is the only `*Variant` in the codebase.

### 2.4 `_shared/` boundary

`src/components/ui/_shared/` contains:
- `ModalOverlay.vue` — consumed by `dialog/DialogContent.vue`, `dialog/DialogScrollContent.vue`, `sheet/SheetContent.vue` (3 consumers).
- `menuItemVariants.ts` — exports `menuItemVariants` (CVA) + `MenuItemVariants` (type). Consumed by 11 sites: `command/CommandItem.vue`, 5 `dropdown-menu/*` items, 4 `context-menu/*` items, `combobox/ComboboxItem.vue`, `select/SelectItem.vue`.

`_shared/` has NO `index.ts` barrel. Consumers reach symbols via relative path `../_shared/menuItemVariants`. The `MenuItemVariants` type is NOT on `/api`. Consumer writing a custom menu item cannot pin against the canonical variant union; they'd have to thread the relative path or duplicate the CVA.

**Verdict:** `_shared/` is a sub-internal boundary inside `ui/`. Two readings — (a) intentionally private (the leading underscore signals so); (b) `menuItemVariants` is load-bearing across 11 sites and arguably canonical for menu-item styling consumers. The current shape conflates "private to ui/" with "absent from /api" — those are separate axes.

### 2.5 Provide/inject context modules

`rg 'InjectionKey|provide(?:Dock|Sortable|Configurator)Context' src/`:

| Module | Pattern |
|---|---|
| `components/custom/dock/composables/dockContext.ts` | `provideDockContext` + `useDockContext` functions wrapping `provide(string-key)` — context is INTERNAL to dock; symbol key (`"glassDockContext"`) is a plain string, not an `InjectionKey<DockContext>`. `DockContext` type is not exported. |
| `components/custom/sortable-list/context.ts` | `SORTABLE_CONTEXT: InjectionKey<UseSortableReturn>` (typed Symbol-keyed). Exported from sortable-list barrel. |
| `components/custom/configurator/density.ts` | `CONFIGURATOR_DENSITY_KEY` + `ConfiguratorDensity` exported from configurator barrel. |

**Inconsistency:** three different idioms for the same DI concept — string-key wrapped in helper (dock), typed-symbol `InjectionKey` exported (sortable-list), typed-symbol + value union exported (configurator). Sortable and configurator are usable by external composers; dock is locked private.

### 2.6 `useDockState` / aurora composable type re-export

`src/components/custom/dock/composables/index.ts` exports `UseDockStateOptions`, `DockState` types — but `src/components/custom/dock/index.ts` does NOT re-export them. So `@mkbabb/glass-ui/dock` consumers cannot type the dock-state shape; only `import "@mkbabb/glass-ui/dock/composables"` (a deeper, undocumented path) would resolve.

Aurora similarly: `useAurora` returns an inline literal `{ setCursor, clearCursor, ... }` — there is no `UseAuroraReturn` exported anywhere. A consumer assigning the return value cannot annotate without re-deriving `ReturnType<typeof useAurora>`.

---

## 3. Findings

### 3.1 Top leaky abstractions

**L1. `useDockState` types stranded.** `UseDockStateOptions` + `DockState` are exported from `src/components/custom/dock/composables/index.ts` but NOT re-exported from `src/components/custom/dock/index.ts` — the canonical dock barrel that `@mkbabb/glass-ui/dock` resolves through. Consumer cannot type a wrapper around `useDockState` without reaching past the published surface. Either expose on `/dock` barrel + `/api`, or formally pin as internal and drop from `composables/index.ts`.

**L2. `useAurora` return is anonymous.** The composable returns an inline-typed object; no `UseAuroraReturn` interface exists. Consumer code reading `const aurora = useAurora(...)` cannot annotate the variable without `ReturnType<typeof useAurora>`. Parallel composables (`useConfiguratorState` → `ConfiguratorState<T>`, `useSidebarState` → `SidebarState`, `useSortable` → `UseSortableReturn`) all ship named return interfaces. Aurora is the outlier.

**L3. `useDarkModeSync` is a side-effect installer dressed as a composable.** Returns `void`; takes a callback. It's a watcher, not a controlled facade. The naming (`use*`) implies a return-state shape consistent with the rest of the composable canon, but consumers get nothing back. Either rename (e.g. `onDarkModeSync`, `watchDarkMode`) or invert it to `useDarkModeSync(): { isDark: Ref<boolean>, onSync: (cb) => void }` — matching the controlled-facade shape.

### 3.2 Top service-boundary inconsistencies

**B1. Provide/inject idiom triple.** Three different DI patterns:
- Dock: string-key + helper functions, types kept private (`dockContext.ts`).
- Sortable: typed `InjectionKey<UseSortableReturn>` exported from `sortable-list/context.ts` for external composers.
- Configurator: typed `InjectionKey<ConfiguratorDensity>` + value-union enum exported from `configurator/density.ts`.

A consumer wiring a custom `<DockTrigger>` outside the library can't subscribe to dock context the way they can subscribe to sortable-list — the keys aren't published. Canonical shape should be: typed `InjectionKey<T>` exported from each package's `context.ts` (or `keys.ts`); `provide*Context` helper optional.

**B2. `useToast` module-level dispatcher.** `src/components/ui/toast/use-toast.ts` ships `toasts = ref<ToasterToast[]>([])` at module scope plus `toastTimeouts: Map`. This is a global singleton in the `createGlobalState`-style but WITHOUT the vueuse wrapper — it just leverages ES module caching. The pattern is intentional (shadcn-vue parity) but it sits in `ui/` not under a vueuse-bearing subpath, so it falsely appears tree-shakable. Consumers calling `toast()` from multiple Vue app instances share one queue.

**B3. `avatarVariant` singular naming.** `src/components/ui/avatar/index.ts:7` declares `export const avatarVariant = cva(...)` while every other CVA in the codebase is `*Variants` (plural). The exported type `AvatarVariants` masks this on `/api`. Rename the const to `avatarVariants` — single character, zero behaviour change, closes a search-grep papercut.

### 3.3 Top `/api` discovery gaps

**A1. Sidebar domain types absent.** `SidebarState` parallels `ConfiguratorState<T>` semantically (composable return-shape interface) but isn't on `/api`. Same for `SidebarSection`, `TreeNode`, `TreeIndexEntry`, `ScrollTrackerOptions`. Either declare sidebar a private-by-policy package (and document so) or promote 1–3 canonical sidebar types to `/api`. Currently inconsistent with configurator and timeline promotions.

**A2. Search/fuzzy-search domain types absent.** `SearchableItem`, `SearchResult`, `FuzzySearchState`, `UseFuzzySearchOptions`, `SearchIndex` — a substantial public surface for a feature with multiple consumers — none on `/api`. Consumers typing fixtures or building search wrappers reach for the per-package subpath only.

**A3. `GlassPanelProps` + `ToastType` + `MenuItemVariants` gaps.** Three discrete additions parallel to existing `/api` policy:
- `GlassPanelProps` — `/api` already carries `GlassPanelVariant`; the prop shape is the natural sibling for wrap-component consumers.
- `ToastType` (the `Toast` interface aliased on the toast barrel) — `/api` carries `ToastVariant` but not the row shape; an SDK consumer building a typed toast caller has half the surface.
- `MenuItemVariants` (from `ui/_shared/menuItemVariants.ts`) — 11 consumers internally, parallels every other `*Variants` export's `/api` promotion policy; `_shared/` privacy is a separate axis.

### 3.4 Module-state vs DI overlap (Rδ cite)

`gateRegistry` (useTouchGate), `instances` (useSortable), `activeTimers` (TypewriterText), `listeners` (typewriter/timing) — all are module-scoped registries that survive component disposal cycles. Rδ owns the DI angle; Rγ flags these as candidates where a Vue `provide`/`inject` boundary OR an explicit "registry context" composable would replace ES-module-caching as the cross-instance binding mechanism. The current pattern works but pins the library to one runtime per process — a constraint not declared in CLAUDE.md.

The `useToast` singleton (§3.2 B2) is the most consumer-visible instance: it's also the only module-state singleton on the root barrel's public surface (since toast is vueuse-free and re-exported via `export * from "./components/ui/toast"`).

---

## 4. Proposed plan implications

(Plan-implication notes for the synthesist; this research is read-only.)

1. **Public-surface canonicalisation wave (low risk, mechanical):**
   - Rename `avatarVariant` → `avatarVariants` (1 file; const-only; matches canon).
   - Add `UseAuroraReturn` interface to `aurora/composables/useAurora.ts`; export from aurora barrel.
   - Re-export `UseDockStateOptions` + `DockState` from `components/custom/dock/index.ts`.
   - Promote `GlassPanelProps`, `ToastType`, `MenuItemVariants` to `/api` (3 type adds).
   - Decide sidebar + search disposition: either promote canonical types (`SidebarState`, `SearchableItem`, `SearchResult`, `FuzzySearchState`) to `/api` or document them as per-package-private.

2. **Provide/inject canonicalisation (medium risk, ergonomic):**
   - Adopt one DI idiom across dock + configurator + sortable. Recommend: typed `InjectionKey<T>` exported from each package's `keys.ts` (configurator already conforms; dock needs the most lift).
   - Audit whether dock context should be on the public surface — if `<DockIconButton>` consumers need to wire dock-state queries, yes; otherwise document as private.

3. **`useDarkModeSync` rename or reshape (low risk, naming):**
   - Either rename to `onDarkModeSync` / `watchDarkMode` (signal it's a side-effect installer), or restructure return to `{ isDark, onSync }` for parity with the rest of the composable canon. Consumer change is one-line.

4. **DI vs module-state policy doc (no code change):**
   - Document in CLAUDE.md the canonical guidance: "Cross-instance registries (gateRegistry, sortable instances, typewriter timers, toast queue) are intentionally module-scoped and assume one library copy per app. Consumers running multi-app or micro-frontend topologies provide their own DI wrapper." Closes the implicit-contract gap Rδ surfaces from a different angle.

---

## 5. Risks

1. **Renaming `avatarVariant` is a semver break.** Anyone reaching past the type into the CVA function (e.g. composing a custom avatar wrapper) will see a runtime ImportError. Mitigation: only land at a major bump; document in `MIGRATION.md`.

2. **Promoting types to `/api` is additive but lock-in.** Once `SidebarState` is on `/api`, changes to the composable return shape ripple to every `/api` consumer — even ones who don't import it. Mitigate by promoting only stable shapes (≥ 2 minor releases without internal change).

3. **Provide/inject canonicalisation can leak internals.** Publishing `DOCK_CONTEXT` as a typed `InjectionKey<DockContext>` requires `DockContext` to be public — which exposes the dock's internal state model. If the team prefers dock-internal flexibility, status quo (private string-key) is correct.

4. **`useDarkModeSync` rename ripples to speedtest (the cited consumer).** Worth scoping the rename against the consumer-side `npm run verify-export-types` probe before landing.

5. **`useToast` singleton is shadcn-vue parity.** Diverging from the upstream shape costs documentation cohesion. If the team values that parity, the leak-flag is acknowledge-and-document, not refactor.

---

## Appendix — surface count delta if all `/api` gaps closed

Current: 37 symbols (29 types + 8 constants).

If §3.3 A1+A2+A3 land: +8 types (`GlassPanelProps`, `ToastType` aliased, `MenuItemVariants`, `SidebarState`, `SidebarSection`, `SearchableItem`, `SearchResult`, `FuzzySearchState`) = **45 symbols** (37 types + 8 constants).

If §4.1 lands without the sidebar/search promotion: +3 types = **40 symbols**.

The K.WS/L.W1 charter scales linearly to ~50 — no architectural strain at either count.
