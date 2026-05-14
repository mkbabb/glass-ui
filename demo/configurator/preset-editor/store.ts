// demo/configurator/preset-editor/store.ts — singleton state + the
// `usePresetEditor()` composable factory.
//
// O.W3 Lane C — split from the prior `usePresetEditor.ts` god-module per Rβ.
// Orchestrates the four supporting concerns:
//   - types/defaults (./types, ./defaults)
//   - CSS-variable writers (./css-writers)
//   - localStorage I/O + migration (./persistence)
//   - preset-active stylesheet hot-swap (./stylesheet-swap)
//
// Library tokens in `src/styles/tokens.css` stay authoritative. Only fields
// the user has explicitly touched are mirrored onto `document.documentElement.style`
// and persisted. Mounting with an empty delta writes *nothing* to `:root` —
// returning users never see stale overrides ghost-writing over library updates.
//
// Importing this module is side-effect-free; call `usePresetEditor()` to get
// (or create) the global singleton.

import { reactive, watch } from "vue";
import { useGlobalDark } from "../../../src/composables/dark";
import type { PresetId } from "../../presets/manifest";
import { writeField, writeFontSlot } from "./css-writers";
import { DEFAULT_CONFIG, FIELD_CSS_VARS, FONT_SLOT_VARS } from "./defaults";
import { loadPersisted, persist } from "./persistence";
import { applyPresetStylesheet, disablePresetLink } from "./stylesheet-swap";
import type {
    ConfigBaseline,
    ConfigDelta,
    DeltaKey,
    FontSlots,
    PresetEditor,
    WritableField,
} from "./types";

let singleton: PresetEditor | null = null;

/**
 * Apply every field present in `delta` to `:root` and record which CSS
 * custom properties we wrote. Mutates the `written` set in place.
 */
function applyDelta(delta: ConfigDelta, written: Set<string>): void {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const fontDelta = delta.font;
    if (fontDelta) {
        for (const slot of ["serif", "sans", "display", "mono"] as const) {
            const v = fontDelta[slot];
            if (v !== undefined) {
                writeFontSlot(root, slot, v);
                written.add(FONT_SLOT_VARS[slot]);
            }
        }
    }

    for (const field of [
        "scaleBase",
        "hueShift",
        "grain",
        "density",
        "radius",
        "cartoonShadow",
    ] as const) {
        if (delta[field] !== undefined) {
            writeField(root, field, delta[field]);
            for (const prop of FIELD_CSS_VARS[field]) written.add(prop);
        }
    }

    applyPresetStylesheet(delta.preset);
}

function removeWritten(written: Set<string>): void {
    if (typeof document === "undefined") return;
    const s = document.documentElement.style;
    for (const prop of written) s.removeProperty(prop);
    written.clear();
    // Also reset the preset stylesheet link.
    disablePresetLink();
}

export function usePresetEditor(): PresetEditor {
    if (singleton) return singleton;

    const { isDark, toggleDark } = useGlobalDark();
    const written = new Set<string>();
    const delta = reactive<ConfigDelta>(loadPersisted());

    // Apply whatever was persisted. If delta is empty, this is a no-op and
    // `:root` carries zero configurator-origin inline styles.
    applyDelta(delta, written);

    // Dark is controlled by the global dark composable, not a CSS variable.
    // If persisted delta demands a value different from the current global,
    // flip it once at boot.
    if (delta.dark !== undefined && delta.dark !== isDark.value) {
        toggleDark();
    }

    // ─ Helpers ────────────────────────────────────────────────────────────

    function effective<K extends keyof ConfigBaseline>(key: K): ConfigBaseline[K] {
        const d = delta[key as DeltaKey];
        if (d === undefined) return DEFAULT_CONFIG[key];
        if (key === "font") {
            // Merge partial font delta over baseline slots.
            const merged = {
                ...DEFAULT_CONFIG.font,
                ...(d as Partial<FontSlots>),
            } as FontSlots;
            return merged as ConfigBaseline[K];
        }
        return d as ConfigBaseline[K];
    }

    function effectiveFont(slot: keyof FontSlots): string {
        return delta.font?.[slot] ?? DEFAULT_CONFIG.font[slot];
    }

    function clearField(key: DeltaKey): void {
        if (!(key in delta)) return;
        delete delta[key];
        if (typeof document !== "undefined") {
            const s = document.documentElement.style;
            if (key === "font") {
                for (const slot of ["serif", "sans", "display", "mono"] as const) {
                    s.removeProperty(FONT_SLOT_VARS[slot]);
                    written.delete(FONT_SLOT_VARS[slot]);
                }
            } else if (key === "preset") {
                applyPresetStylesheet(undefined);
            } else if (key in FIELD_CSS_VARS) {
                const vars = FIELD_CSS_VARS[key as WritableField];
                for (const prop of vars) {
                    s.removeProperty(prop);
                    written.delete(prop);
                }
            }
            // `dark` has no CSS prop — handled via useGlobalDark.
        }
        persist(delta);
    }

    function setField<K extends keyof ConfigBaseline>(
        key: K,
        value: ConfigBaseline[K],
    ): void {
        // Equal-to-default → clear the delta entry (touching then reverting
        // doesn't pollute).
        if (
            key !== "font" &&
            // Shallow equality is sufficient for primitives + our known
            // shape; `font` has its own per-slot setter.
            Object.is(value, DEFAULT_CONFIG[key])
        ) {
            clearField(key as DeltaKey);
            return;
        }

        if (key === "preset") {
            setPreset(value as PresetId | "custom");
            return;
        }

        if (key === "dark") {
            const v = value as boolean;
            delta.dark = v;
            if (v !== isDark.value) toggleDark();
            persist(delta);
            return;
        }

        if (key === "font") {
            // Full-font assignment: replace entirely. Use the per-slot setter
            // for finer control.
            const slots = value as FontSlots;
            const partial: Partial<FontSlots> = {};
            for (const slot of ["serif", "sans", "display", "mono"] as const) {
                if (slots[slot] !== DEFAULT_CONFIG.font[slot]) {
                    partial[slot] = slots[slot];
                }
            }
            if (Object.keys(partial).length === 0) {
                clearField("font");
                return;
            }
            delta.font = partial;
            if (typeof document !== "undefined") {
                const root = document.documentElement;
                for (const slot of ["serif", "sans", "display", "mono"] as const) {
                    if (partial[slot] !== undefined) {
                        writeFontSlot(root, slot, partial[slot]);
                        written.add(FONT_SLOT_VARS[slot]);
                    } else {
                        root.style.removeProperty(FONT_SLOT_VARS[slot]);
                        written.delete(FONT_SLOT_VARS[slot]);
                    }
                }
            }
            persist(delta);
            return;
        }

        // Writable scalar fields.
        const writable = key as WritableField;
        (delta as Record<string, unknown>)[writable] = value;
        if (typeof document !== "undefined") {
            writeField(document.documentElement, writable, value);
            for (const prop of FIELD_CSS_VARS[writable]) written.add(prop);
        }
        persist(delta);
    }

    function setFont(slot: keyof FontSlots, stack: string): void {
        const isDefault = stack === DEFAULT_CONFIG.font[slot];
        const currentFont = delta.font ?? {};
        if (isDefault) {
            // Revert this slot: drop it from the partial; clear whole font
            // entry if the partial becomes empty.
            if (!(slot in currentFont)) return;
            const next: Partial<FontSlots> = { ...currentFont };
            delete next[slot];
            if (Object.keys(next).length === 0) {
                delete delta.font;
            } else {
                delta.font = next;
            }
            if (typeof document !== "undefined") {
                document.documentElement.style.removeProperty(FONT_SLOT_VARS[slot]);
                written.delete(FONT_SLOT_VARS[slot]);
            }
            persist(delta);
            return;
        }

        const next: Partial<FontSlots> = { ...currentFont, [slot]: stack };
        delta.font = next;
        if (typeof document !== "undefined") {
            writeFontSlot(document.documentElement, slot, stack);
            written.add(FONT_SLOT_VARS[slot]);
        }
        persist(delta);
    }

    function setPreset(id: PresetId | "custom"): void {
        // Selecting "default" preset is equivalent to "no override".
        if (id === DEFAULT_CONFIG.preset) {
            if (delta.preset !== undefined) {
                delete delta.preset;
                applyPresetStylesheet(undefined);
                persist(delta);
            }
            return;
        }
        delta.preset = id;
        applyPresetStylesheet(id);
        persist(delta);
    }

    function reset(): void {
        // Strip every inline prop we ever owned.
        removeWritten(written);
        // Clear delta.
        for (const key of Object.keys(delta) as DeltaKey[]) {
            delete delta[key];
        }
        // Sync dark back to its library/system default.
        if (isDark.value !== DEFAULT_CONFIG.dark) toggleDark();
        persist(delta);
    }

    // Mirror library-level dark toggles (from elsewhere) back into the
    // delta as an explicit "user touched" signal — but only if the new
    // value diverges from the library default.
    watch(isDark, (v) => {
        if (v === DEFAULT_CONFIG.dark) {
            if (delta.dark !== undefined) {
                delete delta.dark;
                persist(delta);
            }
        } else if (delta.dark !== v) {
            delta.dark = v;
            persist(delta);
        }
    });

    singleton = {
        delta,
        defaults: DEFAULT_CONFIG,
        isDark,
        effective,
        effectiveFont,
        setField,
        setFont,
        clearField,
        reset,
        setPreset,
    };
    return singleton;
}

// Re-export the canonical public surface so the façade can `export *` from
// this single module.
export { DEFAULT_CONFIG, FONT_OPTIONS } from "./defaults";
export type {
    ConfigBaseline,
    ConfigDelta,
    DeltaKey,
    Density,
    FontOption,
    FontSlots,
    PresetEditor,
} from "./types";
