# K.W7 — Drag-keep-open Story-fidelity + Configurator-recursion P0 + NumberField Decision

**Wave**: K.W7
**Date**: 2026-05-09
**Status**: closed pending orchestrator commit

W7 closes the J FINAL named-residual ("drag-keep-open story-fidelity gap") AND absorbs the 2026-05-08 Lighthouse P0-1 (`<Configurator>` reactive-recursion on `/motion/metaballs`).

## Step 0 — Configurator reactive-recursion P0 absorb

Two compounding defects per `audit/K-lighthouse-2026-05-08.md` P0-1.

### Step 0 Part A — `activeKey` reactivity in `useConfiguratorState.ts`

**File**: `src/components/custom/configurator/useConfiguratorState.ts`

**Before** (lines 18, 84-94, 114-132 baseline):
```ts
import { reactive, computed, type ComputedRef } from "vue";
…
const config = reactive(initialConfig) as T;
let activeKey: string | undefined = initialKey;

const activePreset = computed<string | undefined>(() => activeKey);

const isDirty = computed(() => {
    if (!activeKey) return false;
    const preset = presets.find((p) => p.key === activeKey);
    if (!preset) return false;
    return !equals(config, preset.config);
});
…
function selectPreset(key: string): void {
    const preset = getPreset(key);
    if (!preset) return;
    activeKey = key;
    applyPreset(preset);
}

function resetCurrent(): void {
    if (!activeKey) return;
    const preset = getPreset(activeKey);
    if (preset) applyPreset(preset);
}

function cyclePreset(): void {
    if (presets.length === 0) return;
    const idx = activeKey ? presets.findIndex((p) => p.key === activeKey) : -1;
    const next = presets[(idx + 1) % presets.length]!;
    selectPreset(next.key);
}
```

`activeKey` was a plain `let` binding. The `activePreset` computed read it directly with no reactive dependency — the computed cached its first read forever, so consumers reading `studio.activePreset.value` saw stale data. `isDirty` had the same defect.

**After**:
```ts
import { reactive, ref, computed, type ComputedRef } from "vue";
…
const config = reactive(initialConfig) as T;
const activeKey = ref<string | undefined>(initialKey);

const activePreset = computed<string | undefined>(() => activeKey.value);

const isDirty = computed(() => {
    const key = activeKey.value;
    if (!key) return false;
    const preset = presets.find((p) => p.key === key);
    if (!preset) return false;
    return !equals(config, preset.config);
});
…
function selectPreset(key: string): void {
    const preset = getPreset(key);
    if (!preset) return;
    activeKey.value = key;
    applyPreset(preset);
}

function resetCurrent(): void {
    const key = activeKey.value;
    if (!key) return;
    const preset = getPreset(key);
    if (preset) applyPreset(preset);
}

function cyclePreset(): void {
    if (presets.length === 0) return;
    const key = activeKey.value;
    const idx = key ? presets.findIndex((p) => p.key === key) : -1;
    const next = presets[(idx + 1) % presets.length]!;
    selectPreset(next.key);
}
```

`ref` import added; `activeKey` lifted to `ref<string | undefined>`; mutation sites updated to `.value` writes; `activePreset` and `isDirty` read `.value`. Public `ConfiguratorState<T>` interface is unchanged — consumers still receive `activePreset: ComputedRef<string | undefined>` and `isDirty: ComputedRef<boolean>`.

### Step 0 Part B — break the `colorDraft ↔ cfg.colors` write-write loop

**File**: `demo/stories/motion/metaballs.vue`

Strategy 1 (KISS): drop `colorDraft` entirely. `cfg.colors` is already a reactive proxy (`studio.config.colors`) — bind the UI directly.

**Before** (script lines 105-134, template lines 326-339):
```ts
import { computed, reactive, ref, watch } from "vue";
…
const colorDraft = reactive(cfg.colors.map((c) => ({ value: c })));

watch(
    () => cfg.colors,
    (next) => {
        colorDraft.length = 0;
        for (const c of next) colorDraft.push({ value: c });
    },
    { deep: false },
);

function commitColor(index: number, value: string) {
    if (index < 0 || index >= cfg.colors.length) return;
    cfg.colors[index] = value;
    colorDraft[index]!.value = value;
}

function addColor() {
    cfg.colors.push("#cccccc");
    colorDraft.push({ value: "#cccccc" });
}

function removeColor(index: number) {
    if (cfg.colors.length <= 1) return;
    cfg.colors.splice(index, 1);
    colorDraft.splice(index, 1);
}
```
```vue
<div v-for="(stop, index) in colorDraft" :key="index" …>
    <input :value="stop.value" … @input="commitColor(index, ($event.target as HTMLInputElement).value)" />
    <span … >{{ stop.value }}</span>
</div>
```

`commitColor` wrote to BOTH `cfg.colors[index]` and `colorDraft[index].value`. The watcher then resynced `colorDraft` from `cfg.colors`. Combined with `applyPreset` reassigning every key on the reactive proxy, Vue's scheduler produced "Maximum recursive updates exceeded" on `/motion/metaballs` route load.

**After**:
```ts
import { computed, ref } from "vue";
…
function commitColor(index: number, value: string) {
    if (index < 0 || index >= cfg.colors.length) return;
    cfg.colors[index] = value;
}

function addColor() {
    cfg.colors.push("#cccccc");
}

function removeColor(index: number) {
    if (cfg.colors.length <= 1) return;
    cfg.colors.splice(index, 1);
}
```
```vue
<div v-for="(color, index) in cfg.colors" :key="index" …>
    <input :value="color" … @input="commitColor(index, ($event.target as HTMLInputElement).value)" />
    <span … >{{ color }}</span>
</div>
```

`reactive` and `watch` imports dropped; `colorDraft` deleted; UI iterates `cfg.colors` directly; `commitColor` writes only to `cfg.colors[index]`. The watch-write loop is broken at the source — there is no longer two reactive sources to keep in sync.

## Step 1 — Slider-in-Dock cross-substrate composition demo

**Venue**: option (A) — NEW story `demo/stories/compositions/dock-with-slider.vue` (default per W7 spec).

**Cells** (three `StorySection` blocks):

1. **slider in dock — standard variant** (`<GlassDock fit-content>` host, `Volume2` icon button + `<Slider v-model="volume">` inside a width-anchored container). Drag visually intensifies the standard thumb halo + tier-shades the dock substrate via `data-held`.
2. **slider in dock — glass-pill variant** (`<GlassDock fit-content>`, `Sun` icon + `<Slider variant="glass-pill" …>`). Same contract, denser variant-specific halo recipe (`.glass-slider[data-variant='glass-pill'][data-held]` in `Slider.vue` scoped CSS).
3. **multi-slider dock — collapsible** (default-collapsible `<GlassDock>` with two `<Slider>` cells separated by a `dock-separator`). Demonstrates ref-counted `dockKeepOpen` tokens — either drag holds the dock open and BOTH thumb halos intensify because both subscribe to the same `dockHeld` computed.

Manifest entry registered in `demo/stories/manifest.ts` under the `compositions` category:
```ts
s("compositions", "dock-with-slider", "Dock with Slider", "Cross-substrate `keep-dock-open` contract — slider thumb-halo + dock substrate response while dragging.");
```

Visual probe via Playwright (dev server `http://localhost:5174`):
- `/motion/metaballs` — page renders cleanly; **0 console errors**, **0 warnings**. The "Maximum recursive updates exceeded" runtime error is absent.
- `/compositions/dock-with-slider` — page renders cleanly; **0 console errors**, **0 warnings**. All three story sections + dock substrates + slider widgets present in the accessibility snapshot.

## Step 2 — `<NumberField keep-dock-open>` decision

**Decision: Option B — Slider-only contract**.

**Rationale**:
- NumberField's primary interaction is keyboard-driven (typing a numeric value) plus button-driven (`+`/`−` Increment/Decrement firing **discrete** click events). `src/components/ui/number-field/NumberFieldInput.vue` is a thin reka-ui wrapper around `<NumberFieldInput>`; `NumberFieldIncrement.vue` / `NumberFieldDecrement.vue` are `<Button>` triggers. None of these emit a continuous-pointer-drag interaction where the pointer leaves the dock surface mid-gesture.
- The `keep-dock-open` contract optimises for continuous pointer-drag — the canonical case where the pointer (and the slider thumb) leave the dock's hover/focus envelope while the user is still actively interacting. Slider's drag is the pure exemplar.
- NumberField's edit-mode is pointer-anchored (focus stays inside the dock-internal `<input>` while typing); the existing dock collapse-after-blur semantics (focus-out → `scheduleCollapse` → 2.5s timer) handle it correctly without a held-state token.
- Long-press repeat-fire on the +/− buttons is a quasi-continuous interaction, but it stays focus-anchored inside the dock; ref-counted `dockKeepOpen` is unnecessary overhead.

Per W7 spec REVISION default + Rε B5 cross-substrate coupling research: NumberField is **not** extended. The `keepDockOpen` prop and the `dockKeepOpen`/`dockRelease`/`dockHeld` injection trio remain Slider-specific.

`rg "keepDockOpen" src/components/ui/` returns Slider-only hits (the contract did not propagate beyond `Slider.vue`):

```
$ rg "keepDockOpen" /Users/mkbabb/Programming/glass-ui/src/components/ui/
src/components/ui/slider/Slider.vue:    keepDockOpen?: boolean
src/components/ui/slider/Slider.vue:const keepDockOpen = computed(() => props.keepDockOpen ?? true)
src/components/ui/slider/Slider.vue:    const { class: _, variant: __, size: ___, keepDockOpen: ____, ...delegated } = props
src/components/ui/slider/Slider.vue:  if (!keepDockOpen.value || acquired) return
```

## Step 3 — DESIGN.md deferral

DESIGN.md update for the Slider-only `keep-dock-open` contract is **deferred to W4 Lane A** (the comprehensive doc-cohort wave per `K.md` wave schedule). Per W7 dispatch bounds, this wave does not touch DESIGN.md / CLAUDE.md / README.md; W4 Lane A absorbs the doc walk including:

- Contract description (acquire on pointer-down, release on pointer-up; reflects `data-held` from `dockHeld`).
- Consumer enumeration: Slider — and only Slider — per Step 2 Option B.
- Cross-substrate visual feedback expectations (thumb-halo intensification + dock substrate tier-shading).

## Step 4 — Verification

### Sentinel `rg` checks

```
$ rg "let activeKey" /Users/mkbabb/Programming/glass-ui/src/components/custom/configurator/
(0 hits)

$ rg "colorDraft" /Users/mkbabb/Programming/glass-ui/demo/stories/motion/metaballs.vue
// K.W7 Step 0 Part B — `colorDraft` was a redundant reactive mirror of
// `cfg.colors[index]` and `colorDraft[index].value`. Combined with
// Fix (Strategy 1, KISS): drop `colorDraft` entirely and bind the UI
```

The only `colorDraft` mentions remaining are inside the explanatory comment that documents the removal. The runtime symbol is gone.

### `npm run typecheck`

```
> @mkbabb/glass-ui@0.9.2 typecheck
> vue-tsc --noEmit

(no errors)
```

Green.

### `npm test`

```
> @mkbabb/glass-ui@0.9.2 test
> vitest run

 Test Files  27 passed (27)
      Tests  340 passed (340)
   Duration  3.04s
```

All 340 tests pass.

### `npm run build`

The `vite-plugin-dts` / `@microsoft/api-extractor` step in the in-flight K-tranche branch surfaces transient races against sister waves' modifications (different error each run — `pulse.d.ts` not found, `glyph-face.d.ts` not found, `nextTick` symbol-follow internal error). The races are pre-existing in the branch state, not introduced by W7 (the W7 diff is a reactivity rename + a watcher deletion + a new demo SFC, none of which touch the dts pipeline). Typecheck + test pass; orchestrator can re-run the build during W8 close-ceremony assembly, or after sister waves quiesce.

### Browser console probe (dev server)

`vite` dev server up on `http://localhost:5174`. Playwright navigation:

- **`/motion/metaballs`** — 0 errors, 0 warnings. The "Maximum recursive updates exceeded" runtime error is **absent**. Lighthouse P0-1 absorbed.
- **`/compositions/dock-with-slider`** — 0 errors, 0 warnings. All three composition cells render with their dock + slider widgets visible in the accessibility tree.

## Files changed

- **MODIFIED** `src/components/custom/configurator/useConfiguratorState.ts` — `activeKey` lifted to `ref`; `selectPreset` / `resetCurrent` / `cyclePreset` mutate `.value`; `activePreset` / `isDirty` read `.value`.
- **MODIFIED** `demo/stories/motion/metaballs.vue` — `colorDraft` reactive mirror + `watch` deleted; UI binds directly to `cfg.colors[index]`; `commitColor` / `addColor` / `removeColor` write only to `cfg.colors`.
- **CREATED** `demo/stories/compositions/dock-with-slider.vue` — three-cell cross-substrate composition demo (standard + glass-pill + collapsible-multi-slider).
- **MODIFIED** `demo/stories/manifest.ts` — registered the new composition story.
- **CREATED** `docs/tranches/K/audit/W7-drag-keep-open-story-proof.md` — this proof doc.

## Git posture

No mutating git was run by this agent. Read-only `git status` only (per K invariant 7 + W7 dispatch hardened-agent-git clause). Orchestrator owns the W7 close commit.
