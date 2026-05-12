# L.W7 Lane B — Aurora chrome Option-A unification — Proof

**Date**: 2026-05-11
**Lane**: L.W7 Lane B (aurora chrome Option-A unification; useConfiguratorState `cloneMode` extension; useAuroraStudio retirement).
**Bounds**: `src/components/custom/configurator/` · `demo/stories/aurora/` · `DESIGN.md` · `MIGRATION.md`. No Lane A or W8 territory touched.

## § 1 — API diff

### 1.1 `useConfiguratorState<T>` — extended

New option:

```ts
export type ConfiguratorCloneMode = "commit-on-write" | "per-preset";

export interface ConfiguratorStateOptions<T> {
    readonly presets: readonly ConfiguratorPreset<T>[];
    readonly initialPreset?: string;
    readonly clone?: (value: T) => T;
    readonly equals?: (a: T, b: T) => boolean;
    /** NEW (L.W7 Lane B). Default `"commit-on-write"`. */
    readonly cloneMode?: ConfiguratorCloneMode;
}
```

Plus `cyclePreset(direction?: 1 | -1)` (previously no parameter; default `1`).

### 1.2 `defaultClone` hardening

```ts
function defaultClone<T>(value: T): T {
    const raw = toRaw(value);          // NEW — unwrap reactive proxies
    if (typeof structuredClone === "function") {
        try { return structuredClone(raw); } catch { /* fallthrough */ }
    }
    return JSON.parse(JSON.stringify(raw)) as T;
}
```

`toRaw` is a no-op on plain objects and unwraps Vue reactive proxies. Without this, `structuredClone(config)` on a `reactive` proxy threw `DataCloneError: #<Object> could not be cloned` (reproduced and fixed during this lane's Playwright probe — see § 5.2).

### 1.3 Surface barrel

`src/components/custom/configurator/index.ts` re-exports the new `ConfiguratorCloneMode` type alongside the existing `ConfiguratorState` + `ConfiguratorStateOptions`.

## § 2 — `cloneMode: "per-preset"` semantics

### 2.1 Behavioural contract

- Each preset slot holds an independent deep clone seeded from `preset.config` at composable construction time.
- `studio.config` is one reactive proxy whose contents reflect the active slot.
- `selectPreset(key)`:
  1. Snapshots the current `config` (via `toRaw` + `clone`) into the outgoing slot's clone-map entry.
  2. Switches `activeKey.value = key`.
  3. Writes the named slot's clone into `config` in place (preserving the reactive identity).
- `resetCurrent()` re-clones the active slot from the preset definition and writes it into `config`.
- `cyclePreset(±1)` is `selectPreset` on the next/prev preset key in array order (wraps via `(idx + dir + n) % n`).

Live edits made to `studio.config` are retained per slot: the user can edit Sunset, switch to Cool, return to Sunset and find their edits intact. This is the demo-side property aurora needs ("slider edits persist when the user switches presets and comes back").

### 2.2 Code snippet (consumer-side)

```ts
const studio = useConfiguratorState<AuroraConfig>({
    presets: AURORA_PRESETS,
    initialPreset: "OPENAI_SKY",
    cloneMode: "per-preset",
});

// Reactive — bind directly to canvases and controls.
studio.config           // AuroraConfig (reactive proxy)
studio.activePreset     // ComputedRef<string | undefined>
studio.selectPreset("OPENAI_DAWN")
studio.cyclePreset(-1)  // reverse cycle for ArrowLeft
studio.resetCurrent()
```

### 2.3 `commit-on-write` (default) preserved

Metaballs storybook (`demo/stories/motion/metaballs.vue`) still works at HEAD with the default `cloneMode`. Verified via `npm test` (330 tests pass) + Playwright probe at `/motion/metaballs` (2 preset swaps + 4 color mutations, zero console errors).

## § 3 — AuroraConfigDock + aurora.vue migration

### 3.1 Before

`demo/stories/aurora.vue` consumed `useAuroraStudio("OPENAI_SKY")` (63 LOC at `demo/stories/aurora/useAuroraStudio.ts`):

```ts
const studio = useAuroraStudio("OPENAI_SKY");
// studio.current: Ref<PresetKey>
// studio.currentConfig: ComputedRef<AuroraConfig>
// studio.currentMeta: ComputedRef<PresetMeta>
// studio.liveConfigs: Record<PresetKey, AuroraConfig>
// studio.selectPreset(key)
// studio.resetCurrent()
// studio.cyclePreset(direction: 1 | -1)
```

### 3.2 After

```ts
const AURORA_PRESETS: ConfiguratorPreset<AuroraConfig>[] = PRESET_KEYS.map(key => ({
    key,
    label: PRESET_META[key].label,
    sub: PRESET_META[key].sub,
    config: PRESETS[key],
}));

const studio = useConfiguratorState<AuroraConfig>({
    presets: AURORA_PRESETS,
    initialPreset: "OPENAI_SKY",
    cloneMode: "per-preset",
});

const currentKey = computed<PresetKey>(
    () => (studio.activePreset.value ?? "OPENAI_SKY") as PresetKey,
);
const currentMeta = computed(() => PRESET_META[currentKey.value]);
```

Template bindings shift from `studio.currentConfig.value` to `studio.config` (reactive proxy — no `.value`), and from `studio.current.value` to a local `currentKey` computed.

The `<AuroraConfigDock>` template was NOT refactored — its axis sub-components (MediumLayer, PaletteLayer, FlowLayer, TextureLayer, CompositionLayer, NucleiLayer) already receive `config: AuroraConfig` as a prop and mutate it via direct property assignment. They compose `<BouncyTabs>` + `<DockLayerGroup>` for axis selection, which is aurora-specific chrome (six axes with custom controls per axis). Wedging them into a flat stack of `<ConfiguratorLayer>` / `<ConfiguratorRow>` would lose the axis-tab UX. The Configurator-family second-consumer maturity is achieved at the state-management layer (`useConfiguratorState` consumed by aurora + metaballs + the configurator primitive story); the layered-controls chrome maturity is satisfied independently by metaballs + configurator primitive consumers.

### 3.3 Keyboard handlers

`ArrowLeft` / `ArrowRight` map to `studio.cyclePreset(-1)` / `studio.cyclePreset(1)`. `Mod+Shift+R` maps to `studio.resetCurrent()`. Behavior parity with the prior `useAuroraStudio` is verified by the Playwright probe (§ 5.3).

## § 4 — `useAuroraStudio` disposition: Option I (delete)

`demo/stories/aurora/useAuroraStudio.ts` was DELETED. Verification:

```
$ rg "useAuroraStudio" src/ demo/
demo/stories/aurora.vue: * `useAuroraStudio` composable. Aurora is now the second consumer of the
demo/stories/aurora.vue:// the template below — kept for parity with the prior useAuroraStudio API
```

The 2 remaining hits are historical block-comment references in `aurora.vue` documenting the unification path (no functional callsites). The composable file itself is gone; no other consumer existed.

`useAuroraStudio` was demo-private from inception (not in `src/`, not in `package.json` exports, not in MIGRATION.md). No public surface migration debt.

## § 5 — F-ε-3 disposition + verification

### 5.1 Context (from L W6 audit)

L W6 Lighthouse re-probe at `/motion/metaballs` reproduced "Maximum recursive updates exceeded in component `<Configurator>`" (F-ε-3 P0-1), which K W8 had marked "false-positive". W6 forwarded to W8 ι integrity-sweep or M-tranche.

### 5.2 W7 Lane B probe

Sequence:
1. `npm run dev` on port 5173.
2. Playwright navigate to `/motion/metaballs`.
3. Expand the `Color` ConfiguratorLayer.
4. 2 preset swaps via clicking preset chips: Sunset → Cool → Mono.
5. 4 color mutations via `<input type="color">` change events.
6. Inspect console for `Maximum recursive updates exceeded` errors.

**Result**: ZERO console errors (only the unrelated Vite HMR WebSocket-connect notice common to all dev-mode pages). F-ε-3 NOT reproduced under the typical interaction pattern.

### 5.3 Aurora probe

1. Playwright navigate to `/aurora`.
2. 3 `ArrowRight` / `ArrowLeft` keyboard cycles to exercise `studio.cyclePreset(±1)` + per-preset clone snapshotting.

**First attempt FAILED** with `DataCloneError: Failed to execute 'structuredClone' on 'Window': #<Object> could not be cloned` — the `snapshotInto` path was passing a Vue reactive proxy directly to `structuredClone`. **Fixed in § 1.2 (`toRaw` unwrap)**. Second attempt: zero console errors across the full cycle.

### 5.4 F-ε-3 final disposition

**Probe-clean post-W7-Lane-B.** Under the canonical reproduction pattern (2 preset swap + 4 color mutation, slow-pace Playwright at dev-mode), `/motion/metaballs` shows zero recursion errors. The metaballs path was NOT directly modified by W7 Lane B; the absorption is incidental — possibly the `toRaw` hardening on the shared `defaultClone` path stabilises a subtle proxy-related re-entry that L W6 Lighthouse was surfacing under stricter load discipline.

**Caveat**: W6 noted that Lighthouse (headless Chrome, network-idle wait + RAF gates) reproduced the error while looser Playwright probes did not — the recursion appears to be load-timing-dependent. This W7 probe is a Playwright probe under typical interaction cadence; a Lighthouse re-run is the canonical re-verification, which W8 ι integrity-sweep owns.

**Recommendation**: W8 ι integrity-sweep includes a fresh Lighthouse run at `/motion/metaballs` to confirm F-ε-3 is fully cleared post-Lane-B. If it surfaces again, route to M-tranche; if clean, F-ε-3 closes here.

## § 6 — DESIGN.md update

`DESIGN.md:655-670` (the Configurator section) was updated:
- Lists 3 consumers (metaballs, configurator-primitive story, aurora) with their respective clone-modes.
- New `## Clone modes` subsection documents `"commit-on-write"` vs `"per-preset"` semantics + the `toRaw` clone-path hardening.
- The "Aurora chrome retains parallel implementation — Option-B-with-rationale" note was REPLACED with the L W7 Lane B Option-A unification note (closes K cross-tranche-debt).
- F-ε-3 disposition cross-referenced to this proof.

## § 7 — Configurator family second-consumer maturity

```
$ rg "useConfiguratorState" demo/stories/ -l
demo/stories/aurora.vue
demo/stories/motion/metaballs.vue
demo/stories/primitives/configurator.vue

$ rg "ConfiguratorLayer|ConfiguratorRow" demo/stories/ -l
demo/stories/motion/metaballs.vue
demo/stories/primitives/configurator.vue
```

- `useConfiguratorState`: 3 consumers (metaballs + primitives/configurator + aurora) — passes ≥ 2.
- `<ConfiguratorLayer>` + `<ConfiguratorRow>`: 2 consumers (metaballs + primitives/configurator) — passes ≥ 2.
- `<Configurator>` (shell): consumed by aurora + metaballs + primitives/configurator — passes ≥ 2.

K cross-tranche debt for configurator-family second-consumer fidelity is CLOSED. The Option-A unification supersedes the prior Option-B-with-rationale documented in K DESIGN.md (now retired — see § 6).

## § 8 — Verification matrix

| Gate                                         | Status |
|----------------------------------------------|--------|
| `npm run typecheck`                          | green  |
| `NODE_OPTIONS=--max-old-space-size=8192 npm run build` | green (29.7s build, dts emit clean) |
| `npm test`                                   | green (330 tests / 27 files) |
| `rg "useAuroraStudio" src/ demo/`            | 0 functional hits (2 comment refs) |
| `rg "useConfiguratorState" demo/stories/`    | 3 consumers (≥ 2 maturity bar) |
| Aurora story renders post-migration          | yes (Playwright probe + cycle clean) |
| F-ε-3 metaballs probe                        | clean under typical Playwright cadence; Lighthouse re-verify owed to W8 ι |

## § 9 — File-bound compliance

**Modified**:
- `src/components/custom/configurator/useConfiguratorState.ts` (added `cloneMode` + `toRaw` + `cyclePreset` direction).
- `src/components/custom/configurator/index.ts` (re-exported `ConfiguratorCloneMode`).
- `demo/stories/aurora.vue` (consumer migration to `useConfiguratorState` per-preset mode).
- `DESIGN.md` (Configurator section update, retire Option-B note).
- `MIGRATION.md` (additive note in "New surfaces in v1.0").

**Deleted**:
- `demo/stories/aurora/useAuroraStudio.ts` (Option I — clean retire).

**Untouched (per spec MUST-NOT)**:
- W7 Lane A: `src/components/custom/pulse/`, `src/components/custom/typewriter/`, `src/styles/animations.css`.
- W8 territory: `docs/tranches/L/audit/` integrity-sweep planning.
- Aurora sub-component configs (`demo/stories/aurora/config/*.vue`) — already compatible with the new state shape via the `config: AuroraConfig` prop contract.

## § 10 — Worktree diff at lane close

```
$ git -C /Users/mkbabb/Programming/glass-ui status --short
```

(see Lane B reporting — appended to final summary.)
