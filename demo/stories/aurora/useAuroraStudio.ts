import { computed, reactive, ref, type ComputedRef, type Ref } from "vue";
import type { AuroraConfig } from "@/components/custom/aurora";
import { PRESETS, PRESET_KEYS, PRESET_META, type PresetKey, type PresetMeta } from "./presets";

/**
 * Studio state: a per-preset deep clone so slider edits persist when the user
 * switches presets and comes back. Mirrors the pattern from the bundle's
 * `liveConfigs` — edits live on the clone, not on the immutable PRESETS table,
 * so "reset" restores from PRESETS while "switch back" preserves.
 */
function deepClone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}

export interface AuroraStudio {
    current: Ref<PresetKey>;
    currentConfig: ComputedRef<AuroraConfig>;
    currentMeta: ComputedRef<PresetMeta>;
    liveConfigs: Record<PresetKey, AuroraConfig>;
    selectPreset: (key: PresetKey) => void;
    resetCurrent: () => void;
    cyclePreset: (direction: 1 | -1) => void;
}

export function useAuroraStudio(initial: PresetKey = "OPENAI_SKY"): AuroraStudio {
    const current = ref<PresetKey>(initial);

    // Seed per-preset clones from the authored constants.
    const liveConfigs = reactive(
        Object.fromEntries(
            PRESET_KEYS.map((k) => [k, deepClone(PRESETS[k])]),
        ) as Record<PresetKey, AuroraConfig>,
    ) as Record<PresetKey, AuroraConfig>;

    const currentConfig = computed(() => liveConfigs[current.value]);
    const currentMeta = computed(() => PRESET_META[current.value]);

    function selectPreset(key: PresetKey) {
        if (!(key in PRESETS)) return;
        current.value = key;
    }

    function resetCurrent() {
        liveConfigs[current.value] = deepClone(PRESETS[current.value]);
    }

    function cyclePreset(direction: 1 | -1) {
        const i = PRESET_KEYS.indexOf(current.value);
        const n = PRESET_KEYS.length;
        const next = PRESET_KEYS[(i + direction + n) % n]!;
        current.value = next;
    }

    return {
        current,
        currentConfig,
        currentMeta,
        liveConfigs,
        selectPreset,
        resetCurrent,
        cyclePreset,
    };
}
