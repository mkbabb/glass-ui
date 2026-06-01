# MIGRATION—v0.9.x → v1.0 → v2.0

> **v2.0.0 (AI.W1 R3)**—the motion composables move off the root barrel to
> the new `@mkbabb/glass-ui/motion` flat subpath, closing the
> AI-CARRY-GLASS-UI-KEYFRAMES-EDGE 4-tranche chronic. See the **v2.0.0**
> section below for the full symbol list + codemod hints. Same SCC-trap
> closure shape as L.W1 Lane C — different heavy peer
> (`@mkbabb/keyframes.js` instead of `@vueuse/core`).

v1.0 is the L-tranche cohort release. It freezes the public API and lands four
architectural transpositions that BREAK v0.9.x consumer shapes:

1. **Root-barrel Phase 2**—vueuse-bearing symbols leave the root barrel; they
   live on explicit subpaths so bundlers can tree-shake them.
2. **`src/api/` discovery layer**—pure types + constants surface for "where
   do I import the type from?" discovery.
3. **Subpath flatten**—`composables/dark` + `composables/keyboard` collapse
   to flat `/dark` + `/keyboard`; new `/carousel` subpath added.
4. **Second-consumer fidelity**—substrate without ≥ 2 consumers either wires
   a real second consumer or retires (per L invariant 8).

Per L invariant 4 (no backwards-compat shims), v1.0 ships no legacy aliases.
Every break is documented below. v0.9.4 remains available indefinitely as a
patch-stream tag; v1.0 adoption is opt-in.

---

## At a glance

- Vueuse-bearing symbols (`Input`, `Textarea`, `Combobox*`, `Carousel*`,
  `useCarousel`, `useGlobalDark`, `useKeyboardShortcuts`, `registerShortcut`,
  ...) NO LONGER on the root barrel—use the named subpath.
- Nested `composables/dark` + `composables/keyboard` subpaths RETIRED—flat
  `/dark` + `/keyboard`.
- NEW `@mkbabb/glass-ui/carousel` subpath for `useCarousel` + `CarouselApi`.
- NEW `@mkbabb/glass-ui/api` subpath for canonical types + constants
  discovery (32 symbols).
- RETIRED composables: `useOffsetPagination`, `useVirtualSectionWindow`,
  `useWindowedStore`, `virtualSectionLayout` helpers. `/pagination` +
  `/virtual` subpaths gone.
- RETIRED primitive: demo-private `<DockShowcaseFrame>` (was never public
  surface).
- `src/composables/` restructured into coherent sub-trees
  (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`,
  `sidebar/`, `sortable/`)—affects deep relative imports only.
- Production demo build NOT shipped—`npm run build` is library-mode only.

Worked example: speedtest re-link commit `98f88325` migrated 15 src/ files
to the v1.0 subpath surface in ~30 minutes. Entry-chunk gz dropped 32.5 KB.

---

## Before you migrate

1. **Pin to v0.9.4 first** if you are on v0.9.0–v0.9.3. v0.9.4 patches the
   K.WS subpath-typing-publication gap and lets you adopt subpath imports
   incrementally BEFORE the breaking v1.0 cut.
2. **Run your tests + typecheck** at v0.9.4. Establish a green baseline.
3. **Inventory your imports**—`rg 'from "@mkbabb/glass-ui"' src/` lists
   every root-barrel call site. Save the output; you will sweep it twice.
4. **Plan the cut as one commit per repo**—v1.0 is intentionally
   atomic. Mixing v0.9.x and v1.0 import shapes across files in the same
   commit makes review noisier than necessary.
5. **Read the Cohabitation note** below if you intend to stay on v0.9.4
   indefinitely. That path is supported.

---

## Breaking changes

### 1. Root-barrel curation (Phase 2 SCC trap closure)

The root barrel is now vueuse-free. Re-exporting these symbols from
`@mkbabb/glass-ui` forced every consumer to walk the vueuse SCC at
tree-shake time, regressing entry-chunk gzip by ~2 KB (speedtest's X.W3.c
re-probe was the canonical evidence). Phase 2 carves them onto subpaths.

#### 1.1—Form primitives → `/forms`

```ts
// Before
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui";

// After
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui/forms";
```

The `/forms` subpath was added at v0.9.3 (K.WS Phase 1) and is preserved
verbatim at v1.0. Affected symbols: `Input`, `Textarea`, `Combobox`,
`ComboboxAnchor`, `ComboboxCancel`, `ComboboxEmpty`, `ComboboxGroup`,
`ComboboxInput`, `ComboboxItem`, `ComboboxItemIndicator`, `ComboboxList`,
`ComboboxSeparator`, `ComboboxTrigger`, `ComboboxViewport`.

Rationale: `Input` + `Textarea` import `useVModel` from `@vueuse/core`;
the `Combobox*` family imports `reactiveOmit`. Each is a vueuse-bearing
leaf; isolating them on `/forms` keeps the root barrel walk-free.

#### 1.2—Carousel → `/carousel`

```ts
// Before
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui";
import type { CarouselApi } from "@mkbabb/glass-ui";

// After
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui/carousel";
import type { CarouselApi } from "@mkbabb/glass-ui/carousel";
```

Affected symbols: `Carousel`, `CarouselContent`, `CarouselDots`,
`CarouselItem`, `CarouselNext`, `CarouselPager`, `CarouselPrevious`,
`GlassCarouselPager`, `useCarousel`, type `CarouselApi`.

Rationale: `useCarousel` imports `createInjectionState` from
`@vueuse/core`. The composable transitively taints every `Carousel*.vue`
in the package because they `inject` it. The whole family moves together.

The `/carousel` subpath is NEW at v1.0—v0.9.x consumers reached
`useCarousel` only via the root barrel.

#### 1.3—Dark-mode singleton → `/dark`

```ts
// Before
import { useGlobalDark } from "@mkbabb/glass-ui";

// After
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

Rationale: `useGlobalDark` composes `createGlobalState`, `useDark`,
`useToggle` from `@vueuse/core`. The `/dark` subpath is flat at v1.0
(the v0.9.4 nested form `composables/dark` is RETIRED—see §2).

#### 1.4—Keyboard registry → `/keyboard`

```ts
// Before
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui";

// After
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui/keyboard";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui/keyboard";
```

Rationale: keyboard-shortcuts registry composes `createGlobalState` +
`useEventListener` from `@vueuse/core`. Same flatten as `/dark`.

#### 1.5—Codemod hints

Find every root-barrel call site that references a moved symbol:

```bash
# Inventory: which files import from the root barrel?
rg -l 'from "@mkbabb/glass-ui"' src/

# Of those, which import a moved symbol?
rg -l 'from "@mkbabb/glass-ui"' src/ \
  | xargs rg -l '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
```

The mechanical rewrite is a per-symbol regex (run inside your editor or
via `sed -i`). Pattern shape:

```
# 1. Find imports that ONLY pull moved symbols → rewrite source
#    import { Input, Textarea } from "@mkbabb/glass-ui"
#    → import { Input, Textarea } from "@mkbabb/glass-ui/forms"

# 2. Find mixed imports → split the import statement
#    import { Button, Input } from "@mkbabb/glass-ui"
#    → import { Button } from "@mkbabb/glass-ui"
#      import { Input } from "@mkbabb/glass-ui/forms"
```

Speedtest's `98f88325` migration commit hand-rewrote 15 files in ~30
minutes without a scripted codemod—the breaks are mechanical enough
that an editor multi-cursor pass is the canonical workflow.

---

### 2. Subpath flatten (v0.9.4 transitional shapes retired)

v0.9.4 introduced nested `composables/dark` + `composables/keyboard`
subpaths as a transitional shape for the K.WS dts-publication-gap fix.
v1.0 flattens them to match every other public subpath
(`/forms`, `/dock`, `/configurator`, ...).

#### 2.1—`/composables/dark` → `/dark`

```ts
// Before (v0.9.4 only)
import { useGlobalDark } from "@mkbabb/glass-ui/composables/dark";

// After (v1.0)
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

#### 2.2—`/composables/keyboard` → `/keyboard`

```ts
// Before (v0.9.4 only)
import { registerShortcut } from "@mkbabb/glass-ui/composables/keyboard";

// After (v1.0)
import { registerShortcut } from "@mkbabb/glass-ui/keyboard";
```

Codemod:

```bash
rg -l '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/ \
  | xargs sed -i '' 's|@mkbabb/glass-ui/composables/dark|@mkbabb/glass-ui/dark|g; s|@mkbabb/glass-ui/composables/keyboard|@mkbabb/glass-ui/keyboard|g'
```

Trying the retired subpath at v1.0 fails with Node's standard package
exports gate:

```
$ node -e "import('@mkbabb/glass-ui/composables/dark')"
Error: ERR_PACKAGE_PATH_NOT_EXPORTED
```

That hard fail is intentional. Per L invariant 4, no alias re-routes the
nested form to the flat one.

---

### 3. Composable retirements (substrate-without-consumer binary)

L.W3 Lane A's audit ran the substrate-without-consumer check across six
composables. Three were WIRED via cross-repo speedtest consumption; three
retired with rationale.

#### 3.1—`useOffsetPagination`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers (no `src/` site; no speedtest site).
  Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/pagination` (entry removed from
  `package.json` exports + typesVersions and from `vite.library.ts`).
- **Migration**: roll your own with `ref()` + a `fetchFn`-driven loader.
  The v0.9.3 reference at
  `src/composables/pagination/useOffsetPagination.ts` was 60 LOC and had
  no glass-ui-private substrate dependency. Copy from v0.9.3 source if
  you want the exact shape; or adopt an external library
  (`@tanstack/vue-query` if you need server-state coordination,
  `@vueuse/core`'s `useOffsetPagination` if you want a thin wrapper).

#### 3.2—`useVirtualSectionWindow`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers. Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (the entire subpath
  retires; it housed `useVirtualSectionWindow` + `useWindowedStore`).
- **Migration**: production-grade virtualization belongs to
  `@tanstack/vue-virtual`. Consumers with light sectioned-list needs
  can hand-roll an `IntersectionObserver`-based windower in ~80 LOC.

#### 3.3—`useWindowedStore`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers. Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (shared with
  `useVirtualSectionWindow`).
- **Migration**: a sliding-window resident store is a `ref<T[]>` plus
  an eviction policy. Copy the v0.9.3 file if you need the exact LRU
  shape.

#### 3.4—`virtualSectionLayout` helpers—REMOVED

- **Status**: REMOVED in v1.0.
- **Affected exports**: `buildSectionLayout`, `findSectionOffset`,
  `resolveActiveSection`, `resolveSectionWindow`, plus the
  `FlatSection`, `SectionLayout`, `SectionWindowRange`, and
  `ForcedSectionWindowRange` types.
- **Reason**: support substrate for `useVirtualSectionWindow`. Retires
  with its parent.
- **Migration**: the helpers were pure functions with no glass-ui-private
  dependencies—copy the v0.9.3 file
  (`src/composables/virtual/virtualSectionLayout.ts`) as-is if
  cumulative section-offset math is genuinely needed.

#### Composables KEPT (cross-repo wired)

The substrate-without-consumer audit retained three motion composables
because speedtest consumes them in production:

| Composable | Speedtest consumer | Disposition |
|---|---|---|
| `useRAFLoop` | `src/components/speedtest/composables/useMeterRenderer.ts` (canvas render loop) | WIRED |
| `useIntersectionPause` | `src/composables/useAuroraPolicy.ts` (reduced-motion + visibility gating) | WIRED |
| `useDarkModeSync` | `src/components/speedtest/SpeedtestMeter.vue` + `src/components/dashboard/composables/useEChartsTheme.ts` | WIRED |

All three remain on `@mkbabb/glass-ui` (vueuse-free) via
`src/composables/motion/`. Each has a demo story under
`demo/stories/composables/`. No consumer-side migration required.

---

### 4. Primitive retirements

#### 4.1—`<DockShowcaseFrame>`—REMOVED

- **Status**: REMOVED in v1.0 (demo file deleted).
- **Reason**: demo-private chassis introduced at V.W4 with ZERO non-self
  consumers at L.W3 open (`rg "DockShowcaseFrame" demo/` returned only
  the definition file).
- **Public-surface impact**: NONE. The component was never on the
  library public surface—it was a demo-private chassis primitive.
  No `src/` source / barrel / package.json export changes.
- **Migration**: dock-tier demos compose `<ShowcaseFrame>` (canonical
  demo chassis) directly, OR raw chassis recipes:

  ```vue
  <div class="rounded-[var(--radius-card)] border border-border/40 bg-card/40 shadow-cartoon">
      <!-- dock content -->
  </div>
  ```

#### Primitives KEPT (2nd consumer wired)

L.W3 Lane B wired second consumers for three primitives that reached
the wave at 1 consumer:

- **`<DiscoGlyph>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (chart-token
  facet-swatch row).
- **`<DockGroup>`**—2nd consumer at
  `demo/stories/compositions/dashboard.vue` (KPI pill-row shelf).
- **`<InstrumentChassis>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (live
  mini-chassis below the chassis-tier-tokens ladder).

No consumer-side change. All three remain exported via the root barrel
(`@mkbabb/glass-ui`) AND their per-package subpaths.

---

### 5. Composables restructure (internal re-org)

L.W2 Lane A restructured `src/composables/` into coherent sub-trees.
**This affects you ONLY if you import directly from a deep relative
path** (e.g., `@mkbabb/glass-ui/src/composables/useTimer`). The public
surface (`@mkbabb/glass-ui` root barrel + named subpaths) is unchanged
for KEPT composables.

| v0.9.x relative path | v1.0 relative path |
|---|---|
| `composables/useGlobalDark` | `composables/dark` |
| `composables/useKeyboardShortcuts` | `composables/keyboard` |
| `composables/useInterval` | `composables/reactive/useInterval` |
| `composables/useTimer` | `composables/reactive/useTimer` |
| `composables/useResizeObserver` | `composables/dom/useResizeObserver` |
| `composables/useTouchGate` | `composables/dom/useTouchGate` |
| `composables/useTokenColor` | `composables/dom/useTokenColor` |
| `composables/useStagger` | `composables/motion/useStagger` |
| `composables/useStoryDemo` | (moved to `demo/composables/useStoryDemo`—demo-private) |

Resulting tree:

```
src/composables/
├── dark/         useGlobalDark
├── keyboard/     useKeyboardShortcuts + family
├── reactive/     useInterval, useTimer
├── dom/          useResizeObserver, useTouchGate, useTokenColor
├── motion/       useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│                 useAnimatedNumber, useAnimatedNumberMap, useDarkModeSync,
│                 useRAFLoop, useIntersectionPause, useStagger
├── glass/        useGlassRenderer + webgl/ + webgpu/
├── sidebar/      useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
├── sortable/     useSortable
└── index.ts      (sub-tree re-exports)
```

Recommended: stop reaching for deep relative paths; the public surface
(`@mkbabb/glass-ui` root barrel + the dedicated subpaths) is the
canonical import shape.

---

## New surfaces in v1.0

### `@mkbabb/glass-ui/api`—type + constant discovery layer

32 canonical public symbols (28 types + 4 runtime constants) re-exported
from their existing homes. Recommended for consumer-side type discovery
without coupling to a specific component's runtime entry point:

```ts
import type {
    AuroraConfig, AuroraNucleus, AuroraFlow, AuroraInstance,
    AuroraRuntimeOptions, AuroraRuntimeMode,
    FlowPattern, OklchStop, StrokeMode, WarpMode,
    ConfiguratorPreset, ConfiguratorState, ConfiguratorStateOptions,
    ConfiguratorScrollMode,
    CardTier, InstrumentChassisPhase, ToastVariant,
    AlertVariants, AvatarVariants, BadgeVariants, ButtonVariants,
    SheetVariants, SliderVariants, ToggleVariants, ToggleChipVariants,
} from "@mkbabb/glass-ui/api";

import {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI, MAX_STOPS,
} from "@mkbabb/glass-ui/api";
```

The `/api` subpath has zero JS payload for types-only consumers—all 28
type aliases erase at build, leaving only the 4 constants in the runtime
chunk. Use it freely for prop-forwarding wrappers, fixture typings, and
union narrowing.

### `@mkbabb/glass-ui/carousel`

New at v1.0. See §1.2 above.

### `useConfiguratorState` gained `cloneMode` option

`useConfiguratorState<T>(options)` accepts a new `cloneMode?: "commit-on-write" | "per-preset"` option (default `"commit-on-write"`—unchanged behaviour for existing consumers).

```ts
import {
    useConfiguratorState,
    type ConfiguratorCloneMode,
} from "@mkbabb/glass-ui/configurator";

// per-preset: edits persist per-slot across preset switches.
const studio = useConfiguratorState<MyConfig>({
    presets,
    initialPreset: "default",
    cloneMode: "per-preset",
});
```

The L W7 Lane B Option-A unification (Rε §A.8) routed aurora's per-preset clone semantics through the canonical primitive; `useAuroraStudio` was demo-private and retired. `cyclePreset` also accepts an optional `direction?: 1 | -1` (default `1`) so consumers can map `ArrowLeft` / `ArrowRight` keyboard handlers cleanly. Purely additive—no consumer migration required.

---

## v2.0.0—Motion subpath surgery (AI.W1 R3)

v2.0.0 closes the **AI-CARRY-GLASS-UI-KEYFRAMES-EDGE** chronic (4-tranche
deferral from AI). The root barrel statically reached `@mkbabb/keyframes.js`
through `composables/motion`, which forced every consumer's entry chunk to
carry the ~102 KB raw / ~34 KB gz `keyframes-*.js` chunk even when the
consumer only imported `<Card>` or `<Button>`. The motion composables now
live on the `@mkbabb/glass-ui/motion` flat subpath. The root barrel is
keyframes.js-free.

The shape mirrors the L.W1 Lane C SCC-trap closure that carved `/dark`,
`/keyboard`, and `/carousel` off the root barrel for the vueuse-bearing
surface. Same precedent, different heavy peer.

### Symbols moved—root barrel → `/motion`

```ts
// Before (≤ v1.9.x)
import {
    Card,
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui";

// After (≥ v2.0.0)—split the import statement
import { Card } from "@mkbabb/glass-ui";
import {
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";
```

### Symbols inventory

The following 11 runtime exports + 2 type exports move from root → `/motion`:

| Symbol | Kind |
|---|---|
| `useSpringOrchestrator` | composable (keyframes.js `NumericAnimation`) |
| `useAnimatedNumber` | composable (keyframes.js `SmoothProgress`) |
| `useAnimatedNumberMap` | composable (depends on `useAnimatedNumber`) |
| `useStagger` | composable (timer-driven; no keyframes reach but rides the same barrel) |
| `useStaggerReveal` | composable (IO-driven; same) |
| `useScrollProgress` | composable (scroll-driven; same) |
| `useRAFLoop` | composable (rAF wrapper; same) |
| `useIntersectionPause` | composable (IO + animation pause; same) |
| `installDarkModeSync` | composable (motion engine ↔ dark-mode bridge) |
| `DAMPING` | constant |
| `SNAP_THRESHOLD` | constant |
| `RAFLoopTiming` | type |
| `PausableRuntime` | type |
| `AnimatedNumber` | type (also reachable via `/api`) |
| `UseAnimatedNumberOptions` | type (also reachable via `/api`) |
| `SpringSnapshot` | type (also reachable via `/api`) |

### Why the entire motion barrel moves (not just the keyframes-touching subset)

Only `useSpringOrchestrator` + `useAnimatedNumber` (and `useAnimatedNumberMap`
transitively) statically reach `@mkbabb/keyframes.js`. The rest of the motion
sub-tree (`useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`,
`useIntersectionPause`, `installDarkModeSync`) is keyframes-free. Conceptually
the keyframes-free composables could stay on the root barrel.

In practice the sub-tree's `index.ts` rolls up every leaf with `export *`, so
Rollup walks the entire sub-tree as one SCC at root-barrel build time. Either
the whole sub-tree moves or none of it does — splitting it would require a
second internal sub-barrel (`motion-keyframes/` vs `motion-pure/`), which is
the wrong shape. The motion subpath is the canonical home for every kinetic
composable; consumers reach `/motion` for any kinetic primitive regardless of
whether that specific primitive happens to touch the engine today.

### Codemod hints

```bash
# Find every site that needs migration:
rg 'from "@mkbabb/glass-ui"' src/ | rg 'useStagger|useAnimatedNumber|useSpringOrchestrator|useStaggerReveal|useScrollProgress|useRAFLoop|useIntersectionPause|installDarkModeSync|DAMPING|SNAP_THRESHOLD|RAFLoopTiming|PausableRuntime'
```

For mixed imports (e.g. `import { Card, useAnimatedNumber } from "@mkbabb/glass-ui"`),
split into two import statements: `Card` stays on root, the motion symbols
move to `/motion`. There is no auto-codemod shipped — the diffs are mechanical
1-line edits per site and easier to apply by hand than to write a robust
transform for (the import-statement-splitting case requires AST awareness).

### Verification

After the migration, `dist/glass-ui.js` must NOT contain a static import of
`@mkbabb/keyframes.js`. Verify with:

```bash
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/glass-ui.js
# Expected: 0
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (NumericAnimation + SmoothProgress reach)
```

Consumer bundle graphs should show the `keyframes-*.js` chunk dropping off
routes that don't use motion composables. The carry retires per route.

### No back-compat shim

Per precept 1 (NO workarounds) + precept 2 (NO legacy code) + L invariant 4
(no backwards-compat shims), v2.0.0 ships no root-barrel alias for the moved
symbols. Pinning to `^1.9.3` remains supported on the v1.x patch stream if a
consumer cannot migrate immediately.

---

## v3.0.0—`/motion-core` engine-free carve (AP.W3 R0G-7)

v2.0.0 moved the whole motion sub-tree onto `/motion` on the theory that "the
bundler walks the sub-tree's `export *` chain as one SCC anyway" — so splitting
keyframes-touching from keyframes-adjacent leaves "would be a fictitious
distinction" (the v2.0.0 §"Why the entire motion barrel moves" rationale above).
**That premise is overturned by consumer measurement.** A cheap path touching
ZERO keyframes (e.g. importing only `useIntersectionPause`) still dragged the
~125 KB `@mkbabb/keyframes.js` engine onto the eager graph, because the joined
barrel is what makes the SCC, not the leaves — the leaves split cleanly.

v3.0.0 breaks the barrel. The keyframes-BEARING leaves stay on `/motion`; the
keyframes-FREE leaves carve out to a new flat sibling `@mkbabb/glass-ui/motion-core`
(keyframes-free AND vueuse-free); the keyframes-free-but-vueuse-bearing
`installDarkModeSync` relocates to `@mkbabb/glass-ui/dark` (it reads
`useGlobalDark`, so it is topically a dark-mode leaf). `dist/motion-core.js`
reaches neither heavy peer; `dist/motion.js` keeps the engine.

### Rename table (no alias — inv 47)

| Symbol | Old path | New path |
|---|---|---|
| `useStaggerReveal` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useScrollProgress` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useRAFLoop`, `RAFLoopTiming` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useIntersectionPause`, `PausableRuntime` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useStagger` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `DAMPING`, `SNAP_THRESHOLD` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` (also still on `/motion`) |
| `installDarkModeSync` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/dark` |
| `useSpring`, `useSpringMount`, `useSpringPress`, `useNumericTransition`, `useAnimatedNumber`, `useAnimatedNumberMap` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion` (unchanged) |

`DAMPING` + `SNAP_THRESHOLD` resolve identically from either path (the same
pure-data `constants` module is duplicate-exported on both barrels because the
bearing leaves read them). `RAFLoopTiming` + `PausableRuntime` are type-only
relocations — no bearing leaf references them, so they move with their leaves to
`/motion-core` and drop from `/motion`'s type surface.

### Example

```ts
// Before (v2.0.0–v2.x)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    installDarkModeSync,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";

// After (≥ v3.0.0)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion-core";
import { installDarkModeSync } from "@mkbabb/glass-ui/dark";
```

The keyframes-bearing imports (`useSpring*`, `useNumericTransition`,
`useAnimatedNumber*`) stay on `@mkbabb/glass-ui/motion` unchanged.

### Verification

```bash
grep -c "@mkbabb/keyframes\|@vueuse/core" node_modules/@mkbabb/glass-ui/dist/motion-core.js
# Expected: 0 (both heavy peers absent — engine-free + vueuse-free)
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (the engine still resolves on /motion)
```

### No back-compat shim

Per inv 47 (no back-compat alias on `/motion` for the relocated leaves) +
precept 1/2 + L invariant 4, `/motion` ships no alias for the carved symbols.
Consumers rename per call site (the diffs are mechanical 1-line edits).

---

## v1.2.1—Aurora init fail-explicit (O.W1 Lane A)

Per O invariant 24 (library-internal contract violations throw; browser-API
degradation paths remain befitting silent fallbacks), `<Aurora>` init failure
is now **fail-explicit**.

### Before (≤ v1.2.0)

```ts
// useAurora's onMounted try/catch:
try {
    inst = createAurora(canvas, getCfg(), runtimeOptions);
} catch (err) {
    console.warn("[Aurora]", err);   // silent—surface renders nothing
    return;
}
```

A `createAurora` failure (WebGL2 unavailable, shader compile/link failure)
logged a warning to the console and rendered an empty `<canvas>`. The
consumer received no surface signal beyond the dev-console warn.

### After (≥ v1.2.1)

`createAurora` is glass-ui-internal; its failure is an internal contract
violation. The composable now rethrows by default so the failure surfaces to
the consumer's error boundary (or dev console as an uncaught exception). To
opt back into the prior silent-warn behaviour, pass `onInitError`:

```vue
<template>
    <Aurora
        :config="auroraConfig"
        :on-init-error="(err) => console.warn('[Aurora]', err)"
    />
</template>
```

The callback is invoked with the caught `Error`; the canvas stays unmounted
(matching the prior silent-fallback shape). The prop is also threadable via
`runtimeOptions.onInitError` for consumers passing a fully-composed
`AuroraRuntimeOptions` object (e.g. thumbnail-baking pipelines):

```ts
import type { AuroraRuntimeOptions } from "@mkbabb/glass-ui/api";

const runtimeOptions: AuroraRuntimeOptions = {
    mode: "capture",
    preserveDrawingBuffer: true,
    onInitError: (err) => myErrorBus.report("aurora-init", err),
};
```

The top-level prop wins when both are set.

### Why the change

Per Rα FAIL-EXPLICITLY F1 (`docs/tranches/O/research/Ralpha-legacy-code.md:85`)
and O invariant 24:

- Library-internal contract (shader compile / factory init / WebGL2 unavailable)
  → throw.
- Browser-API degradation (pointer-capture failure / reduced-motion preference)
  → silent fallback with rationale.

Silent-warn concealed bugs in shader edits, masked WebGL2-context-cap
exhaustion (Chromium ~8/page), and left consumers debugging "why is my canvas
blank" without a signal. The throw forces the bug to the surface where the
consumer can decide how to handle it.

### Migration cost

`grep` your codebase for `<Aurora` and `useAurora(`:

- If you depend on the prior render-nothing-and-warn behaviour, add
  `onInitError={(err) => console.warn("[Aurora]", err)}` to your `<Aurora>`
  call site.
- If you have an error boundary upstream and want the failure to surface
  there, no change needed.
- Speedtest's single `<Aurora>` call site (`src/App.vue:5`) inherits the
  fail-explicit default—the consumer-side disposition is coordinated at
  the cross-repo cohort wave (O.W6).

---

## v1.3.0—`avatarVariant` → `avatarVariants` (O.W4 Lane C)

Renamed for consistency with every other CVA variants const in the library
(`buttonVariants`, `toggleVariants`, `badgeVariants`, `sliderVariants`,
`menuItemVariants`, ...). The singular `avatarVariant` was the only
non-pluralized CVA constant in the codebase. One-line consumer migration:

```ts
// Before
import { avatarVariant } from "@mkbabb/glass-ui";
// After
import { avatarVariants } from "@mkbabb/glass-ui";
```

The `AvatarVariants` type alias is unchanged. Cross-repo audit
(`words`, `fourier-analysis`, `bbnf-buddy`, `keyframes.js`, `value.js`,
`speedtest`) found one passthrough re-export site
(`value.js/demo/@/components/ui/avatar/index.ts`); coordinated at O.W6
cross-repo cohort wave. No other production call sites use the symbol
across the constellation.

---

## v1.3.0—`useDarkModeSync` → `installDarkModeSync` (O.W4 Lane B)

Renamed because the composable doesn't follow the canonical `useFoo`
contract—it returns `void` after installing a `watch` side-effect.
The new name names the side-effect plainly (it installs a sync between
two darkness sources; it does not return a reactive handle). One-line
consumer migration:

```ts
// Before
import { useDarkModeSync } from "@mkbabb/glass-ui";
useDarkModeSync(localIsDark);
// After
import { installDarkModeSync } from "@mkbabb/glass-ui";
installDarkModeSync(localIsDark);
```

Cross-repo audit found 3 references in speedtest
(`src/components/speedtest/SpeedtestMeter.vue`,
`src/components/dashboard/composables/useEChartsTheme.ts`); coordinated
at O.W6 cross-repo cohort. No other constellation references.

---

## Recommended new surfaces (best-practice, not strict migration)

Even where a root-barrel import still works at v1.0, prefer per-package
subpaths for better tree-shake granularity:

```ts
// Works at v1.0, but is broad—pulls the whole glass-ui root chunk.
import { GlassDock, Configurator } from "@mkbabb/glass-ui";

// Better—pulls only what you need.
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
```

Speedtest's re-link did NOT make this best-practice rewrite (it kept
root-barrel imports for non-vueuse-bearing symbols) and still saw the
-32.5 KB entry-chunk gz drop. Per-package subpath imports are an
incremental polish above that baseline.

---

## Cohabitation note—v0.9.4 stays supported

v0.9.4 remains available indefinitely as a v0.9.x patch-stream tag.
v1.0 adoption is opt-in. If you cannot migrate immediately:

- Pin to `^0.9.4` in `package.json`.
- The K.WS subpath typing-publication gap is patched at v0.9.4—you can
  adopt subpath imports incrementally (`@mkbabb/glass-ui/forms`,
  `@mkbabb/glass-ui/composables/dark`, etc.) without breaking your
  existing root-barrel calls.
- When you DO migrate to v1.0, the v0.9.4 subpath adopters have fewer
  call sites to rewrite—only the nested `composables/{dark,keyboard}`
  → flat `/dark` + `/keyboard` shape changes.

There is no scheduled v0.9.4 EOL. The patch line is frozen but not
retired.

---

## Worked example—speedtest re-link

Speedtest re-linked from v0.9.3 (root-barrel imports) directly to v1.0
in commit `98f88325` (`feat(deps): adopt glass-ui v1.0`). The diff
touched 15 src/ files:

| Pattern | Sites | Time to rewrite |
|---|---|---|
| `Input` + `Textarea` → `/forms` | 10 sites | ~10 min (multi-cursor pass) |
| `useGlobalDark` → `/dark` | 2 sites | ~2 min |
| `registerShortcut` → `/keyboard` | 2 sites (incl. 1 test mock) | ~2 min |
| Build + typecheck + lighthouse re-probe |—| ~15 min |

Cross-repo observed deltas (from
`docs/tranches/L/coordination/speedtest-Y.md`):

| Indicator | Pre-v1.0 | Post-v1.0 | Delta |
|---|---|---|---|
| `dist/index.html` modulepreload directives | 1 | 0 | canonical SCC closure |
| Entry chunk gz (speedtest) | ~204 KB (X close) | 171.5 KB | -32.5 KB |
| Glass-ui `dist/glass-ui.js` gz | 33.6 KB (K close) | 22.4 KB | -11.2 KB |
| Glass-ui `dist/glass-ui.js` raw | 189 KB (K close) | 124.8 KB | -65 KB |
| Subpath dts publication (`/dark`, `/keyboard`, `/api`, `/carousel`) | broken (K.WS regression) | self-contained | gap closed |

Speedtest build PASS in 9.83s. Consumer-side vue-tsc resolution clean.

---

## Production demo build—formal retire (per L.W5 Lane B Option B)

`npm run build` is library-mode only—it produces the `dist/glass-ui.{js,css,d.ts}`
bundle plus the per-subpath dist artefacts. There is NO `vite.demo.config.ts`
that produces a static demo build artefact.

**Disposition at L.W5**: option B—formally retire the demo as a production
deploy target. Rationale:

- The demo storybook is dev-mode-only—the canonical workflow is `npm run dev`
  → Vite dev server.
- Lighthouse audits run against the dev server with the documented dev-mode
  caveat. The K.W4 + L.W6 Lighthouse passes used this workflow.
- Consumer-deploy concerns (CloudFlare Pages, Vercel, GitHub Pages hosting,
  cache-TTL, etc.) are out of glass-ui scope—they belong to consumer repos
  (speedtest is the canonical reference for demo build chains).
- Shipping a `vite.demo.config.ts` would create a second build target this
  library does not need to maintain.

If you need a static demo for offline review, the path is: clone the repo,
`npm run dev`, navigate, screenshot. The demo storybook is an internal
authoring substrate, not a published artefact.

---

## Verification checklist

After migrating to v1.0:

```bash
# 1. Build clean
npm run build

# 2. Typecheck clean (vue-tsc or vue-tsc-bundled)
npx vue-tsc --noEmit

# 3. No retired-symbol root-barrel imports remain
rg 'from "@mkbabb/glass-ui"' src/ \
  | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
# (expected: zero hits)

# 4. No retired nested subpath imports remain
rg '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/
# (expected: zero hits)

# 5. No retired composable imports remain
rg '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow)\b' src/
# (expected: zero hits)

# 6. No retired subpath imports remain
rg '"@mkbabb/glass-ui/(pagination|virtual)"' src/
# (expected: zero hits)

# 7. Bundle re-probe (consumer-specific; speedtest observed -32.5 KB entry-chunk gz)
```

---

## Reference

- **CHANGELOG**: full v1.0 entry at the top of `CHANGELOG.md`.
- **Tranche plan**: `docs/tranches/L/L.md` (invariants, hard gates).
- **HEADLINE wave proof**: `docs/tranches/L/audit/W1-{A,B,C}-*.md`
  (root-barrel curation, api/ discovery, subpath flatten).
- **Wire-or-retire proofs**: `docs/tranches/L/audit/W3-{A,B}-*.md`
  (composables + primitives).
- **Cross-repo verification**: `docs/tranches/L/coordination/speedtest-Y.md`
  (re-link ledger, before/after deltas).
- **Research basis**: `docs/tranches/L/research/Rε-architectural-transpositions.md`
  (HEADLINE rationale).
- **Speedtest re-link diff**: speedtest commit `98f88325`
  (`feat(deps): adopt glass-ui v1.0`).
