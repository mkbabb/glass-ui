// useConfiguratorState<T> — preset selection + diff-from-preset detection +
// reset/randomize semantics for a <Configurator> consumer.
//
// Generic over the live config shape `T`. Authors pass a list of preset
// descriptors (per-preset baseline `T` values) plus an initial preset id;
// the composable returns:
//
//   - `config`        — reactive live config (the model the controls bind to)
//   - `activePreset`  — current preset id
//   - `isDirty`       — true when `config` diverges from the active preset
//   - `selectPreset`  — switch to another preset (writes its baseline into `config`)
//   - `resetCurrent`  — restore `config` to the active preset's baseline
//   - `cyclePreset`   — advance to the next preset id (wraps)
//
// The composable does NOT persist; consumers wire localStorage / URL state
// externally if needed.

import { reactive, ref, computed, type ComputedRef } from "vue";
import type { ConfiguratorPreset } from "./Configurator.vue";

export interface ConfiguratorStateOptions<T> {
    readonly presets: readonly ConfiguratorPreset<T>[];
    readonly initialPreset?: string;
    /**
     * Optional deep-clone hook. The default uses `structuredClone`. Pass a
     * custom cloner for shapes that contain unclonable values (functions,
     * DOM nodes, etc.).
     */
    readonly clone?: (value: T) => T;
    /**
     * Optional equality check used by `isDirty`. Default uses JSON-string
     * equality; sufficient for plain config objects but not for shapes
     * that contain non-serialisable fields.
     */
    readonly equals?: (a: T, b: T) => boolean;
}

export interface ConfiguratorState<T> {
    /** Reactive live config. */
    readonly config: T;
    /** Current preset id (or `undefined` if `presets` is empty). */
    readonly activePreset: ComputedRef<string | undefined>;
    /** True when `config` diverges from the active preset's baseline. */
    readonly isDirty: ComputedRef<boolean>;
    /** Switch to a preset by key — writes its baseline into `config`. */
    selectPreset(key: string): void;
    /** Restore `config` to the active preset's baseline. */
    resetCurrent(): void;
    /** Advance to the next preset id (wraps). No-op for empty presets. */
    cyclePreset(): void;
    /** Look up a preset by key, or `undefined`. */
    getPreset(key: string): ConfiguratorPreset<T> | undefined;
}

function defaultClone<T>(value: T): T {
    if (typeof structuredClone === "function") {
        return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value)) as T;
}

function defaultEquals<T>(a: T, b: T): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function useConfiguratorState<T extends object>(
    options: ConfiguratorStateOptions<T>,
): ConfiguratorState<T> {
    const clone = options.clone ?? defaultClone<T>;
    const equals = options.equals ?? defaultEquals<T>;
    const presets = options.presets;

    const initialKey =
        options.initialPreset ?? (presets.length > 0 ? presets[0]!.key : undefined);
    const initialPreset = initialKey
        ? presets.find((p) => p.key === initialKey)
        : undefined;
    const initialConfig: T = initialPreset
        ? clone(initialPreset.config)
        : ({} as T);

    // `reactive` typing on a generic T requires the cast; equivalent to
    // `reactive<T>(initialConfig)` in non-generic contexts.
    const config = reactive(initialConfig) as T;
    /* K.W7 — `activeKey` is a `ref` so the `activePreset` computed (and any
       template / consumer reading `studio.activePreset.value`) re-evaluates
       on `selectPreset` / `cyclePreset` / `resetCurrent`. Prior to this
       fix `activeKey` was a plain `let` binding wrapped in a `computed` with
       no reactive dependency — the computed cached its first read forever,
       so consumers reading `activePreset.value` saw stale data. Combined
       with the metaballs `colorDraft ↔ cfg.colors` watch-write loop this
       produced "Maximum recursive updates exceeded" on `/motion/metaballs`
       (Lighthouse 2026-05-08 P0-1). */
    const activeKey = ref<string | undefined>(initialKey);

    const activePreset = computed<string | undefined>(() => activeKey.value);

    const isDirty = computed(() => {
        const key = activeKey.value;
        if (!key) return false;
        const preset = presets.find((p) => p.key === key);
        if (!preset) return false;
        return !equals(config, preset.config);
    });

    function getPreset(key: string): ConfiguratorPreset<T> | undefined {
        return presets.find((p) => p.key === key);
    }

    function applyPreset(preset: ConfiguratorPreset<T>): void {
        const next = clone(preset.config);
        // Replace each top-level key on the reactive object so consumers
        // don't lose their `reactive` proxy reference.
        const target = config as Record<string, unknown>;
        const source = next as Record<string, unknown>;
        for (const k of Object.keys(target)) {
            if (!(k in source)) delete target[k];
        }
        for (const k of Object.keys(source)) {
            target[k] = source[k];
        }
    }

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

    return {
        config,
        activePreset,
        isDirty,
        selectPreset,
        resetCurrent,
        cyclePreset,
        getPreset,
    };
}
