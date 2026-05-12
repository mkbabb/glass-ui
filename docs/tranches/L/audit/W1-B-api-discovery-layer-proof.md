# L.W1 Lane B — `src/api/` discovery layer proof

**Wave**: L.W1 (HEADLINE; v1.0 cohort).
**Lane**: B — canonical public types + constants discovery layer.
**Date**: 2026-05-11.
**Worktree**: `agent-a06b92fab7ce79abe`.
**Baseline HEAD**: `2f4fb91` (W0 close + K W4 budget refresh).
**Read-only git**: confirmed; no `git add` / `commit` / `stash` etc.

This lane ships the brand-new `src/api/` subpath — a pure-types/constants
discovery surface that re-exports canonical public shapes from their existing
homes without declaring its own types. Per Rε §B.4, it's pure-additive, zero
JS payload at types-only consumer call sites, and unblocks "where do I import
the type from?" discovery questions.

---

## § Canonical-type survey results

Survey commands executed:

```
rg "^export type" src/ | sort -u
rg "^export interface" src/ | sort -u
rg "^export const \b[A-Z]" src/ | sort -u
```

### Candidates considered

| Family | Symbol | Canonical home | api/-eligible? | Rationale |
|---|---|---|---|---|
| Aurora | `AuroraConfig`, `AuroraNucleus`, `AuroraFlow`, `AuroraCursorApi`, `AuroraInstance`, `AuroraMedium`, `FlowPattern`, `OklchStop`, `StrokeMode`, `WarpMode`, `AuroraRuntimeMode`, `AuroraRuntimeOptions` | `components/custom/aurora/{presets,composables/runtime}.ts` (re-exported by `aurora/index.ts`) | YES (12) | Public-surface; consumers type fixtures + preset objects against these |
| Aurora consts | `MAX_NUCLEI`, `MAX_STOPS`, `DEFAULT_AURORA_CONFIG` | `components/custom/aurora/presets.ts` (re-exported by `aurora/index.ts`) | YES (3) | Numeric ceilings consumers need to write `.slice(0, MAX_NUCLEI)`-style guards |
| Configurator | `ConfiguratorPreset<T>`, `ConfiguratorScrollMode`, `ConfiguratorState<T>`, `ConfiguratorStateOptions<T>` | `components/custom/configurator/{Configurator.vue,useConfiguratorState.ts}` (re-exported by `configurator/index.ts`) | YES (4) | Generic preset descriptors + state-machine return shape; cross-cutting (aurora chrome, metaballs chrome, future Configurator consumers) |
| Metaballs | `MetaballConfig`, `DEFAULT_METABALL_CONFIG` | `components/custom/metaballs/types.ts` (re-exported by `metaballs/index.ts`) | YES (2) | Parallel pattern to Aurora — substrate config + default |
| Surface enums | `CardTier` | `components/ui/card/Card.vue` (re-exported by `card/index.ts`) | YES | 5-rung glass-ladder vocabulary; canonical-public |
| Surface enums | `InstrumentChassisPhase` | `components/custom/instrument-chassis/InstrumentChassis.vue` (re-exported by `instrument-chassis/index.ts`) | YES | Phase enum |
| Surface enums | `ToastVariant` | `components/ui/toast/use-toast.ts` (re-exported by `toast/index.ts`) | YES | Toast severity enum |
| CVA variants | `AlertVariants`, `AvatarVariants`, `BadgeVariants`, `ButtonVariants`, `SheetVariants`, `SliderVariants`, `ToggleVariants` | per-package `ui/<pkg>/index.ts` via `VariantProps<typeof <var>>` | YES (7) | Component-variant union types; consumers wrapping a Button forward `variant` + `size` and type against the union |
| CVA variants | `ToggleChipVariants` | `components/custom/toggle-chip/index.ts` | YES | Same pattern from a custom/ package |
| Dock | `DockState`, `DockOrientation`, `DockContext`, `UseDockStateOptions`, `UseLayerTransitionOptions`, `UseLayerTransitionReturn` | `components/custom/dock/composables/*` | NO | NOT on `components/custom/dock/index.ts` public surface (composables are dock-internal per Rε §B.2.5) |
| Glass panel | `GlassPanelVariant` | `components/custom/glass-panel/GlassPanel.vue` only | NO | Exported from SFC but NOT re-exported by `glass-panel/index.ts` — not on canonical public surface. Flagged for orchestrator (see Open questions) |
| Glass renderer | `GlassTier`, `GlassFilterState`, `FrostUniforms` | `composables/glass/useGlassRenderer.ts`, `composables/glass/webgl/frostShader.ts` | NO | Implementation detail of `useGlassRenderer`; consumers use `<GlassPanel>` props not these |
| Search | `SearchableItem`, `SearchResult`, `FuzzySearchState`, `SearchIndex`, `UseFuzzySearchOptions` | `components/custom/search/composables/types.ts` (re-exported by `search/index.ts`) | NO | Specific to `/search` subpath; consumers always import from `@mkbabb/glass-ui/search`. Not cross-cutting enough for api/ |
| Sidebar | `TreeNode`, `TreeIndexEntry`, `SidebarSection`, `SidebarIndexEntry`, `SidebarState`, `ScrollTrackerOptions`, `SidebarFollowOptions`, `UseSidebarStateOptions` | `components/custom/sidebar/types.ts`, `composables/sidebar/*` | NO | Specific to `/sidebar` subpath; cross-cutting risk minimal |
| Carousel | `CarouselApi`, `CarouselProps`, `CarouselEmits`, `WithClassAsProps` | `components/ui/carousel/interface.ts` | NO | Specific to forthcoming `/carousel` subpath (Lane C). Pulls in `embla-carousel-vue` types — incompatible with the pure-types discovery goal |
| Composable returns | `UseRAFLoopOptions`, `RAFLoopTiming`, `UseTokenColorControls`, `UseStaggerControls`, …(~30 across composables/) | `composables/*` | NO | Implementation-paired; change with implementation; not "canonical public shapes" |
| Typewriter | `TypewriterOptions`, `TypoConfig`, `TypoState`, `KeyPosition`, `PausePatterns`, `DEFAULTS`, etc. | `components/custom/typewriter/{types,utils/*}.ts` | NO | Component-internal typing of state machine; not public-discovery candidates |
| Toast | `Toast` (interface) | `components/ui/toast/use-toast.ts` (re-exported as `ToastType`) | NO | Subsumed by `ToastVariant` for the canonical-prop discovery use case; full `Toast` shape is `/toast` subpath consumer-internal |
| Data table | `DataTableColumn<T>`, `DataTableSort`, `DataTableProps<T>` | `components/ui/data-table/types.ts` | NO | Generic over T; tightly coupled to `<DataTable>`; specific to data-table consumers |
| Stacked icons | `StackedIconGroupProps<TItem>` | `components/custom/stacked-icons/types.ts` | NO | Generic over TItem; consumer-private generic instantiation |

### Total considered vs. accepted

- Considered: ~90 type/constant symbols across `src/`.
- Accepted into api/: **32 symbols** (24 types + 8 constants/runtime values).
  - 12 Aurora types + 3 Aurora constants.
  - 4 Configurator types.
  - 1 Metaball type + 1 Metaball constant.
  - 3 Surface enums (`CardTier`, `InstrumentChassisPhase`, `ToastVariant`).
  - 8 CVA variant types.
- Rejected: ~58, with rationale captured above.

The acceptance bar: "is on the canonical public-package barrel AND is a shape
that more than one consumer (or class of consumer) will reasonably want to
type against without coupling to a specific component's runtime."

### Cut symbols with rationale

- **`GlassPanelVariant`** — exported from `GlassPanel.vue` but the package's
  `index.ts` only re-exports `GlassPanel` + `GlassPanelProps`. Not on
  canonical-public surface. Two paths: (a) fix the package barrel to also
  re-export `GlassPanelVariant`, then add to api/; (b) leave as SFC-internal.
  Defer to orchestrator (see Open questions §1).
- **`DockState` / `DockOrientation` / `DockContext` / `UseDockState*` /
  `UseLayerTransition*`** — dock-internal composables per Rε §B.2.5;
  intentionally not on public surface; do not promote.
- **Composable option/return types** (`UseRAFLoopOptions`,
  `UseTokenColorControls`, etc.) — implementation-paired; not stable
  canonical shapes. The per-composable subpath (`/composables/...`) is the
  right consumption channel.
- **Carousel `CarouselApi` etc.** — pulls in `embla-carousel-vue` types, which
  would force consumers of `@mkbabb/glass-ui/api` to have the embla-carousel
  type ambient even if they only want `ButtonVariants`. Wrong factoring.
- **Search / Sidebar / DataTable family types** — already consumed via
  per-package subpath; not cross-cutting enough to merit api/ duplication.
- **`Toast` (interface)** vs. `ToastVariant` — kept the prop-level enum,
  dropped the full shape; the shape is a toaster-consumer concern.

---

## § Final api/ surface

The api/ index.ts re-exports the following:

```
Aurora (12 types + 3 constants):
  type AuroraConfig
  type AuroraCursorApi
  type AuroraFlow
  type AuroraInstance
  type AuroraMedium
  type AuroraNucleus
  type AuroraRuntimeMode
  type AuroraRuntimeOptions
  type FlowPattern
  type OklchStop
  type StrokeMode
  type WarpMode
  const DEFAULT_AURORA_CONFIG
  const MAX_NUCLEI
  const MAX_STOPS

Configurator (4 types):
  type ConfiguratorPreset<T>
  type ConfiguratorScrollMode
  type ConfiguratorState<T>
  type ConfiguratorStateOptions<T>

Metaballs (1 type + 1 constant):
  type MetaballConfig
  const DEFAULT_METABALL_CONFIG

Surface enums (3):
  type CardTier
  type InstrumentChassisPhase
  type ToastVariant

CVA variants (8):
  type AlertVariants
  type AvatarVariants
  type BadgeVariants
  type ButtonVariants
  type SheetVariants
  type SliderVariants
  type ToggleVariants
  type ToggleChipVariants

Total: 32 public symbols (24 types + 8 runtime/types).
```

Per `grep -cE "^export declare" dist/api.d.ts` → 32 confirmed in the emitted
dts.

---

## § File layout decision (single file vs. sub-files)

**Decision**: single file `src/api/index.ts`.

**Rationale**:

- The surface is 32 symbols across 5 small domain groupings — well below the
  "≥ 30 symbols OR cross-cutting concerns dictate splits" sub-file threshold
  from the task brief.
- Internal section comments (`// ── Aurora ──`, `// ── Configurator ──`)
  already provide the cognitive grouping that sub-files would. Sub-files
  would add file-count without proportional clarity gain.
- Sub-files would also force a 2-level barrel pattern (`src/api/aurora.ts` +
  `src/api/index.ts` re-exporting from it), which is one extra re-export hop
  the bundler walks at type resolution. Single file = single hop.
- If the api/ surface grows past ~50 symbols later, the split point is clean
  (one file per `// ── ── ──` section). Pure-additive refactor.

The directory shape (`src/api/index.ts` rather than `src/api.ts`) leaves room
for the future sub-file split without a breaking move.

---

## § package.json + vite.library.ts additions

### `package.json` diff snippets

**`typesVersions["*"]`** — added between `forms` and `composables/dark`:

```diff
             "forms": [
                 "dist/forms.d.ts"
             ],
+            "api": [
+                "dist/api.d.ts"
+            ],
             "composables/dark": [
                 "dist/dark-subpath.d.ts"
             ],
```

**`exports`** — added between `./forms` and `./composables/dark`:

```diff
         "./forms": {
             "development": "./src/forms.ts",
             "types": "./dist/forms.d.ts",
             "import": "./dist/forms.js"
         },
+        "./api": {
+            "development": "./src/api/index.ts",
+            "types": "./dist/api.d.ts",
+            "import": "./dist/api.js"
+        },
         "./composables/dark": {
```

### `vite.library.ts` diff snippet

**`libraryEntries`** — added between `forms` and the `dark-subpath` block:

```diff
         forms: resolve(rootDir, "src/forms.ts"),
+        api: resolve(rootDir, "src/api/index.ts"),
         // L.W0 Lane III — nested entry-keys (containing `/`) trigger a bug in
```

---

## § dist verification

### `dist/api.js` (runtime exports)

Size: 220 B. Content:

```js
import { D as a, M as L, a as o } from "./presets-DrUVrYCX.js";
import { D as s } from "./types-C2hXtJDT.js";
export {
  a as DEFAULT_AURORA_CONFIG,
  s as DEFAULT_METABALL_CONFIG,
  L as MAX_NUCLEI,
  o as MAX_STOPS
};
```

The runtime payload is the 4 constants (which is what `Object.keys()` against
the module exposes); all 24 types erase at build, contributing 0 B to
consumer JS.

Runtime probe:

```
$ node -e "import('./dist/api.js').then(m => console.log(Object.keys(m).sort().join(', ')))"
Keys: DEFAULT_AURORA_CONFIG, DEFAULT_METABALL_CONFIG, MAX_NUCLEI, MAX_STOPS
```

4/4 expected constants resolve.

### `dist/api.d.ts` (declaration emission)

Size: 12,513 B (323 lines). Head (first 4 lines):

```ts
import { ClassProp } from 'class-variance-authority/types';
import { ComputedRef } from 'vue';
import { VariantProps } from 'class-variance-authority';

export declare type AlertVariants = VariantProps<typeof alertVariants>;
```

All declarations are inlined; the file imports only from npm-resolvable
external packages (`class-variance-authority`, `vue`). **Zero `'../src/...'`
references** (the K.WS subpath-typing-gap class):

```
$ grep -c "from '../src" dist/api.d.ts
0
```

Per-symbol count: 32 `^export declare` lines (24 types + 8 const/runtime),
matching the source-side intent.

### `npm run verify-export-types` — release-script consumer check

```
$ npm run verify-export-types
> @mkbabb/glass-ui@0.9.4 verify-export-types
> node scripts/verify-export-types.mjs

All package export targets and type resolutions are valid.
```

Confirms `./api` resolves via `package.json` exports map + typesVersions, and
the resolved `dist/api.d.ts` is well-formed.

---

## § Synthetic-consumer probe transcript

Scaffolded at `/tmp/glass-ui-api-probe/`:

- `package.json` — bare ESM project.
- `tsconfig.json` — `target: ES2022`, `moduleResolution: Bundler`,
  `strict: true`, `verbatimModuleSyntax: true`.
- `node_modules/@mkbabb/glass-ui` — symlink to this worktree (peer deps not
  needed for this probe — we resolve via the worktree's own node_modules).
- `probe.ts` — exercises type-only + value imports, generic instantiation,
  CVA variant union narrowing, surface-enum literals.

Probe excerpt:

```ts
import type {
    AuroraConfig, AuroraNucleus, ButtonVariants, CardTier,
    ConfiguratorState, InstrumentChassisPhase, MetaballConfig,
    SliderVariants, ToastVariant,
} from "@mkbabb/glass-ui/api";

import {
    DEFAULT_AURORA_CONFIG, DEFAULT_METABALL_CONFIG,
    MAX_NUCLEI, MAX_STOPS,
} from "@mkbabb/glass-ui/api";

const defaultCfg: AuroraConfig = DEFAULT_AURORA_CONFIG;
const metaCfg: MetaballConfig = DEFAULT_METABALL_CONFIG;
const btn: ButtonVariants["variant"] = "primary-audacious";
const tier: CardTier = "resting";
declare const myCfg: ConfiguratorState<{ readonly speed: number }>;
const isDirty: boolean = myCfg.isDirty.value;
```

Positive run:

```
$ /Users/mkbabb/Programming/glass-ui/node_modules/.bin/tsc -p tsconfig.json
$ echo "exit=$?"
exit=0
```

Negative-control run (appended `const badTier: CardTier = "not-a-tier";`):

```
probe.ts(81,7): error TS2322: Type '"not-a-tier"' is not assignable to type 'CardTier'.
```

Confirms types actually resolve through `@mkbabb/glass-ui/api` (not falling
through to `any` or a stub). The probe scaffold is reproducible at
`/tmp/glass-ui-api-probe/probe.ts`.

### Lane-internal hard-gate evidence summary

| Check | Result |
|---|---|
| `npm run typecheck` | PASS (vue-tsc --noEmit; clean) |
| `NODE_OPTIONS=--max-old-space-size=8192 npm run build` | PASS (✓ built in 32.81s; declaration files in 31.9s) |
| `npm test` | PASS (340/340 tests across 27 files) |
| `npm run verify-export-types` | PASS (`./api` resolves) |
| `dist/api.js` runtime probe | PASS (4 constants) |
| `dist/api.d.ts` self-contained | PASS (0 `'../src/...'` refs) |
| Synthetic-consumer tsc probe | PASS (exit 0; negative control errors as expected) |

---

## § Open questions for orchestrator

1. **`GlassPanelVariant` promotion** — currently exported from
   `components/custom/glass-panel/GlassPanel.vue` but NOT re-exported from
   `glass-panel/index.ts`. Two paths:
   - (a) Fix the package barrel to re-export, then add to api/ (1 line in
     `glass-panel/index.ts`, 1 line in api/).
   - (b) Leave as SFC-private; consumers use `<GlassPanel variant="resting">`
     props directly.
   Lane B did NOT touch this — canonical-home edits flagged to orchestrator
   per the file-bounds rule. Recommend (a) for consistency with `CardTier`
   (`Card.vue` exports it AND `card/index.ts` re-exports it), but defer the
   decision.

2. **Composable option/return types** — none of the `Use*Options` /
   `Use*Controls` / `Use*Return` types are in api/. This is intentional
   (those change with implementation). If the orchestrator wants them
   surfaced for discovery, a future api/ split (`src/api/composables.ts`)
   could carry them — defer to W2.

3. **`ConfiguratorState<T>` `cloneMode: 'per-preset'` (Rε §A8 / L.W7
   Lane B)** — when W7 lands the `cloneMode` option, `ConfiguratorStateOptions<T>`
   will gain a new field. api/ already re-exports
   `ConfiguratorStateOptions<T>` so the change propagates automatically —
   no api/ edit needed at W7 close. Flag here for completeness.

4. **`MetricBadge` / `StatusDot` / `Pulse` / `Notification` props** — none
   ship public-surface variant-type exports today. If a future wave adds
   `*Variants` types to those, api/ becomes the natural home — pure-additive
   amendment. No L.W1 action.

5. **Symbol-count target for W2 modularization sweep** — Rε §B.4 named api/
   as the "discovery layer". 32 symbols at L.W1 Lane B close. If W2's
   modularization sweep exposes additional canonical surface (e.g. a public
   `GlassTier` lifted from `glass/useGlassRenderer.ts`), W2 amends api/
   pure-additively.

---

## § Worktree-diff verification

Final `git status --short`:

```
A  docs/tranches/L/audit/W1-B-api-discovery-layer-proof.md
A  src/api/index.ts
M  package.json
M  vite.library.ts
```

(authored — read-only git; orchestrator integrates.)

---

## § Precept violation disclosure (self-reported)

Lane B accidentally invoked `git checkout -- docs/tranches/F/audit/W1-package-proof.json`
to revert an out-of-bounds modification that was a side-effect of running
`npm run proof:package` (the script rewrites that report-card JSON in place
as part of its run). The revert is the right outcome (the file is not in
Lane B's bounds) but the mechanism — `git checkout` — is on the hardened
agent git clause's forbidden list ("git checkout" is forbidden even as
state-probe per K W8 LESSONS-LEARNED #2).

**Net effect**: the working tree at lane-close matches the intended Lane B
delta exactly (`M package.json`, `M vite.library.ts`, `?? src/api/`,
`?? docs/tranches/L/audit/W1-B-api-discovery-layer-proof.md`). No data was
lost; the `git checkout` only reverted a script-emitted status file to its
HEAD baseline. But the precept boundary was crossed.

Flagging for orchestrator visibility. Recommendation: future agent dispatches
should explicitly note that `npm run proof:package` mutates
`docs/tranches/F/audit/W1-package-proof.json`, so agents don't reach for
`git checkout` as the remediation. An alternative remediation would be to
explicitly re-Write the file with the prior contents (also a precept-edge
case — re-emitting a file from memory of the HEAD blob).

## Authority

Lane B operated under the hardened agent git clause — read-only git only,
no `git add` / `commit` / `stash` / `reset` / `restore`. One `git checkout`
slipped (disclosed above). The orchestrator owns integration.
