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
//   - `selectPreset`  — switch to another preset
//   - `resetCurrent`  — restore `config` to the active preset's baseline
//   - `cyclePreset`   — advance to the next preset id (wraps)
//
// The composable does NOT persist; consumers wire localStorage / URL state
// externally if needed.
//
// ## Clone modes
//
// `cloneMode: "commit-on-write"` (default) — a single live `config` reactive
// object. `selectPreset(key)` overwrites `config` with that preset's baseline;
// edits to `config` are NOT retained when the user switches away. Matches the
// metaballs storybook shape.
//
// `cloneMode: "per-preset"` — each preset slot holds an independent live
// clone. `selectPreset(key)` saves the current `config` snapshot into the
// previous slot, then loads the named slot's clone into `config`. Edits are
// retained per slot across switches. `resetCurrent` re-clones the active
// slot from the preset definition. Matches the aurora storybook shape
// (slider edits persist when the user switches presets and comes back).

import { reactive, ref, computed, toRaw, type ComputedRef } from "vue";
import type { ConfiguratorPreset } from "./Configurator.vue";

export type ConfiguratorCloneMode = "commit-on-write" | "per-preset";

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
    /**
     * Clone-mode strategy. Default `"commit-on-write"` (metaballs shape:
     * single live config; preset switch overwrites). Use `"per-preset"`
     * (aurora shape: per-preset clone map; edits persist per slot across
     * switches).
     */
    readonly cloneMode?: ConfiguratorCloneMode;
}

export interface ConfiguratorState<T> {
    /** Reactive live config. */
    readonly config: T;
    /** Current preset id (or `undefined` if `presets` is empty). */
    readonly activePreset: ComputedRef<string | undefined>;
    /** True when `config` diverges from the active preset's baseline. */
    readonly isDirty: ComputedRef<boolean>;
    /** Switch to a preset by key. */
    selectPreset(key: string): void;
    /** Restore `config` to the active preset's baseline. */
    resetCurrent(): void;
    /**
     * Advance to the next preset id (wraps). Pass `-1` to cycle backwards.
     * No-op for empty presets.
     */
    cyclePreset(direction?: 1 | -1): void;
    /** Look up a preset by key, or `undefined`. */
    getPreset(key: string): ConfiguratorPreset<T> | undefined;
}

function defaultClone<T>(value: T): T {
    // Unwrap Vue reactive proxies before cloning. `structuredClone` rejects
    // Proxy-wrapped objects with DataCloneError, and `toRaw` is a no-op on
    // plain objects so this path is safe for both reactive snapshots and
    // immutable preset baselines.
    const raw = toRaw(value);
    if (typeof structuredClone === "function") {
        try {
            return structuredClone(raw);
        } catch {
            // Fall through to JSON-based clone for values that nested-walk
            // into non-cloneable shapes (functions, symbols, DOM nodes,
            // class instances). Consumers can override `clone` if even
            // JSON-clone is insufficient.
        }
    }
    return JSON.parse(JSON.stringify(raw)) as T;
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
    const cloneMode: ConfiguratorCloneMode = options.cloneMode ?? "commit-on-write";

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

    // Per-preset live clones (only allocated in `"per-preset"` clone-mode).
    // Each slot is an independent deep clone seeded from the preset
    // definition. `applyPreset` writes the named slot's contents into
    // `config`; the reverse direction (live edits → slot) is a snapshot
    // captured on `selectPreset` (saves the outgoing slot before switch).
    const liveClones: Record<string, T> | null =
        cloneMode === "per-preset"
            ? Object.fromEntries(
                  presets.map((p) => [p.key, clone(p.config)]),
              )
            : null;

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

    /**
     * Replace `config`'s top-level keys with the given source object, in
     * place. Preserves the reactive proxy identity so consumers binding to
     * `studio.config` don't lose reactivity on preset switch.
     */
    function writeIntoConfig(source: T): void {
        const target = config as Record<string, unknown>;
        const next = source as Record<string, unknown>;
        for (const k of Object.keys(target)) {
            if (!(k in next)) delete target[k];
        }
        for (const k of Object.keys(next)) {
            target[k] = next[k];
        }
    }

    /**
     * Snapshot the current `config` into the named live-clone slot. Only
     * used in `"per-preset"` mode; no-op otherwise. The snapshot is a deep
     * clone so subsequent edits to `config` don't bleed into the saved
     * slot.
     */
    function snapshotInto(key: string): void {
        if (!liveClones) return;
        liveClones[key] = clone(config);
    }

    function selectPreset(key: string): void {
        const preset = getPreset(key);
        if (!preset) return;
        if (cloneMode === "per-preset" && liveClones) {
            const prevKey = activeKey.value;
            // Save the outgoing slot's live edits before switching.
            if (prevKey && prevKey !== key && prevKey in liveClones) {
                snapshotInto(prevKey);
            }
            activeKey.value = key;
            writeIntoConfig(liveClones[key]!);
        } else {
            activeKey.value = key;
            writeIntoConfig(clone(preset.config));
        }
    }

    function resetCurrent(): void {
        const key = activeKey.value;
        if (!key) return;
        const preset = getPreset(key);
        if (!preset) return;
        if (cloneMode === "per-preset" && liveClones) {
            // Re-clone the active slot from the preset definition, then
            // load it back into `config`.
            liveClones[key] = clone(preset.config);
            writeIntoConfig(liveClones[key]!);
        } else {
            writeIntoConfig(clone(preset.config));
        }
    }

    function cyclePreset(direction: 1 | -1 = 1): void {
        if (presets.length === 0) return;
        const key = activeKey.value;
        const idx = key ? presets.findIndex((p) => p.key === key) : -1;
        const n = presets.length;
        const next = presets[(idx + direction + n) % n]!;
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
