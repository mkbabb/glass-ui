// demo/configurator/usePresetEditor.ts — delta-based live token editor.
//
// Library tokens in `src/styles/tokens.css` stay authoritative. Only fields
// the user has explicitly touched are mirrored onto `document.documentElement.style`
// and persisted. Mounting with an empty delta writes *nothing* to `:root` —
// returning users never see stale overrides ghost-writing over library updates.
//
// Importing this module is side-effect-free; call `usePresetEditor()` to get
// (or create) the global singleton.

import { reactive, watch, type Ref } from "vue";
import { useGlobalDark } from "../../src/composables/useGlobalDark";
import { PRESETS, type PresetId } from "../presets/manifest";

// ─── Types ────────────────────────────────────────────────────────────────

export type Density = "cozy" | "comfortable" | "compact";

export interface FontSlots {
    serif: string;
    sans: string;
    display: string;
    mono: string;
}

/**
 * Full default-config shape — used ONLY for UI pre-population and reset
 * baselines. Never persisted, never written to `:root`.
 */
export interface ConfigBaseline {
    preset: PresetId | "custom";
    font: FontSlots;
    scaleBase: number;
    hueShift: number;
    grain: number;
    density: Density;
    radius: number;
    cartoonShadow: boolean;
    dark: boolean;
}

/**
 * Sparse, persisted delta. A field absent from the delta means the library
 * token is authoritative for that field. A present field means the user
 * explicitly set it (via preset selection or individual control).
 */
export interface ConfigDelta {
    preset?: PresetId | "custom";
    font?: Partial<FontSlots>;
    scaleBase?: number;
    hueShift?: number;
    grain?: number;
    density?: Density;
    radius?: number;
    cartoonShadow?: boolean;
    dark?: boolean;
}

export interface FontOption {
    readonly id: string;
    readonly label: string;
    readonly stack: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────

export const FONT_OPTIONS: readonly FontOption[] = [
    {
        id: "cm-serif",
        label: "Computer Modern Serif",
        stack: '"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif',
    },
    {
        id: "fraunces",
        label: "Fraunces",
        stack: '"Fraunces", Georgia, serif',
    },
    {
        id: "general-sans",
        label: "General Sans",
        stack: '"General Sans", "Inter", system-ui, sans-serif',
    },
    {
        id: "inter",
        label: "Inter",
        stack: '"Inter", system-ui, sans-serif',
    },
    {
        id: "jetbrains-mono",
        label: "JetBrains Mono",
        stack: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    },
    {
        id: "fira-code",
        label: "Fira Code",
        stack: '"Fira Code", ui-monospace, monospace',
    },
    {
        id: "system",
        label: "System",
        stack: "system-ui, -apple-system, sans-serif",
    },
] as const;

export const DEFAULT_CONFIG: ConfigBaseline = {
    preset: "default",
    font: {
        serif: '"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif',
        sans: '"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif',
        display: '"Fraunces", Georgia, serif',
        mono: '"Fira Code", "Fira Mono", monospace',
    },
    scaleBase: 16,
    hueShift: 0,
    grain: 0.035,
    density: "comfortable",
    radius: 10,
    cartoonShadow: true,
    dark: false,
};

const STORAGE_KEY = "glass-ui-demo-config";
const PRESET_LINK_ID = "glass-ui-demo-preset-link";

// ─── CSS prop writers ─────────────────────────────────────────────────────
// Each top-level delta field maps to one-or-more CSS custom properties. The
// writer sets them; the reset path needs the same key list to know what to
// remove. Centralising the mapping here keeps "write" and "unwrite" symmetric.

// Story surfaces keep their authored comfortable spacing as CSS fallbacks.
// These values are deltas added on top, so an empty/default configurator
// delta remains visually identical to library tokens.
const DENSITY_SCALE: Record<Density, { pad: string; gap: string }> = {
    cozy: { pad: "0.25rem", gap: "0.125rem" },
    comfortable: { pad: "0rem", gap: "0rem" },
    compact: { pad: "-0.25rem", gap: "-0.125rem" },
};

const FONT_SLOT_VARS: Record<keyof FontSlots, string> = {
    serif: "--font-serif",
    sans: "--font-sans",
    display: "--font-display",
    mono: "--font-mono",
};

const FIELD_CSS_VARS = {
    scaleBase: ["--type-body"],
    hueShift: ["--hue-shift"],
    grain: ["--glass-grain-opacity"],
    density: ["--density-pad", "--density-gap"],
    radius: ["--radius"],
    cartoonShadow: ["--shadow-card", "--shadow-card-hover"],
} as const satisfies Record<string, readonly string[]>;

type WritableField = keyof typeof FIELD_CSS_VARS;

function writeField(root: HTMLElement, field: WritableField, value: unknown): void {
    const s = root.style;
    switch (field) {
        case "scaleBase": {
            const px = `${value as number}px`;
            s.setProperty("--type-body", px);
            return;
        }
        case "hueShift":
            s.setProperty("--hue-shift", `${value as number}deg`);
            return;
        case "grain":
            s.setProperty("--glass-grain-opacity", (value as number).toFixed(4));
            return;
        case "density": {
            const d = DENSITY_SCALE[value as Density];
            s.setProperty("--density-pad", d.pad);
            s.setProperty("--density-gap", d.gap);
            return;
        }
        case "radius":
            s.setProperty("--radius", `${value as number}px`);
            return;
        case "cartoonShadow":
            s.setProperty(
                "--shadow-card-hover",
                (value as boolean) ? "var(--shadow-cartoon-hover)" : "var(--shadow-md)",
            );
            s.setProperty(
                "--shadow-card",
                (value as boolean) ? "var(--shadow-cartoon)" : "var(--shadow-sm)",
            );
            return;
    }
}

function writeFontSlot(root: HTMLElement, slot: keyof FontSlots, stack: string): void {
    root.style.setProperty(FONT_SLOT_VARS[slot], stack);
}

// ─── Persistence + migration ──────────────────────────────────────────────

function isPlainObject(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isDensity(v: unknown): v is Density {
    return v === "cozy" || v === "comfortable" || v === "compact";
}

/**
 * Detect old full-snapshot shape (pre-delta). Heuristic: the object carries
 * *all* baseline keys as scalars. New delta shape will generally carry a
 * subset, and `font` (if present) will be a partial map.
 */
function looksLikeFullSnapshot(raw: Record<string, unknown>): boolean {
    const baselineKeys: (keyof ConfigBaseline)[] = [
        "preset",
        "font",
        "scaleBase",
        "hueShift",
        "grain",
        "density",
        "radius",
        "cartoonShadow",
        "dark",
    ];
    return baselineKeys.every((k) => k in raw);
}

function migrateFullSnapshotToDelta(raw: Record<string, unknown>): ConfigDelta {
    const out: ConfigDelta = {};

    const preset = raw.preset;
    if (typeof preset === "string" && preset !== DEFAULT_CONFIG.preset) {
        out.preset = preset as PresetId | "custom";
    }

    if (isPlainObject(raw.font)) {
        const fontDelta: Partial<FontSlots> = {};
        for (const slot of ["serif", "sans", "display", "mono"] as const) {
            const v = raw.font[slot];
            if (typeof v === "string" && v !== DEFAULT_CONFIG.font[slot]) {
                fontDelta[slot] = v;
            }
        }
        if (Object.keys(fontDelta).length > 0) out.font = fontDelta;
    }

    if (typeof raw.scaleBase === "number" && raw.scaleBase !== DEFAULT_CONFIG.scaleBase) {
        out.scaleBase = raw.scaleBase;
    }
    if (typeof raw.hueShift === "number" && raw.hueShift !== DEFAULT_CONFIG.hueShift) {
        out.hueShift = raw.hueShift;
    }
    if (typeof raw.grain === "number" && raw.grain !== DEFAULT_CONFIG.grain) {
        out.grain = raw.grain;
    }
    if (isDensity(raw.density) && raw.density !== DEFAULT_CONFIG.density) {
        out.density = raw.density;
    }
    if (typeof raw.radius === "number" && raw.radius !== DEFAULT_CONFIG.radius) {
        out.radius = raw.radius;
    }
    if (
        typeof raw.cartoonShadow === "boolean" &&
        raw.cartoonShadow !== DEFAULT_CONFIG.cartoonShadow
    ) {
        out.cartoonShadow = raw.cartoonShadow;
    }
    if (typeof raw.dark === "boolean" && raw.dark !== DEFAULT_CONFIG.dark) {
        out.dark = raw.dark;
    }

    return out;
}

function parseDelta(raw: Record<string, unknown>): ConfigDelta {
    const out: ConfigDelta = {};
    if (typeof raw.preset === "string") out.preset = raw.preset as PresetId | "custom";
    if (isPlainObject(raw.font)) {
        const f: Partial<FontSlots> = {};
        for (const slot of ["serif", "sans", "display", "mono"] as const) {
            const v = raw.font[slot];
            if (typeof v === "string") f[slot] = v;
        }
        if (Object.keys(f).length > 0) out.font = f;
    }
    if (typeof raw.scaleBase === "number") out.scaleBase = raw.scaleBase;
    if (typeof raw.hueShift === "number") out.hueShift = raw.hueShift;
    if (typeof raw.grain === "number") out.grain = raw.grain;
    if (isDensity(raw.density) && raw.density !== DEFAULT_CONFIG.density) {
        out.density = raw.density;
    }
    if (typeof raw.radius === "number") out.radius = raw.radius;
    if (typeof raw.cartoonShadow === "boolean") out.cartoonShadow = raw.cartoonShadow;
    if (typeof raw.dark === "boolean") out.dark = raw.dark;
    return out;
}

function loadPersisted(): ConfigDelta {
    if (typeof window === "undefined") return {};
    try {
        const rawStr = window.localStorage.getItem(STORAGE_KEY);
        if (!rawStr) return {};
        const parsed = JSON.parse(rawStr) as unknown;
        if (!isPlainObject(parsed)) return {};
        if (looksLikeFullSnapshot(parsed)) {
            const migrated = migrateFullSnapshotToDelta(parsed);
            // Re-persist in the new shape so we never migrate again.
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
            } catch {
                /* ignore */
            }
            return migrated;
        }
        return parseDelta(parsed);
    } catch {
        return {};
    }
}

function persist(delta: ConfigDelta): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(delta));
    } catch {
        /* quota / private-mode — silently drop */
    }
}

// ─── Preset stylesheet toggling ───────────────────────────────────────────

let presetLinkEl: HTMLLinkElement | null = null;

function ensurePresetLink(): HTMLLinkElement | null {
    if (typeof document === "undefined") return null;
    if (presetLinkEl) return presetLinkEl;
    const existing = document.getElementById(PRESET_LINK_ID);
    if (existing instanceof HTMLLinkElement) {
        presetLinkEl = existing;
        return presetLinkEl;
    }
    const link = document.createElement("link");
    link.id = PRESET_LINK_ID;
    link.rel = "stylesheet";
    link.disabled = true;
    document.head.appendChild(link);
    presetLinkEl = link;
    return presetLinkEl;
}

function applyPresetStylesheet(presetId: PresetId | "custom" | undefined): void {
    const link = ensurePresetLink();
    if (!link) return;
    // Absent or "default" preset → library tokens win, link disabled.
    const id = presetId ?? DEFAULT_CONFIG.preset;
    const def = PRESETS.find((p) => p.id === id);
    if (!def || def.cssHref === null) {
        link.disabled = true;
        return;
    }
    if (link.href !== def.cssHref) {
        link.href = def.cssHref;
    }
    link.disabled = false;
}

// ─── Singleton store ──────────────────────────────────────────────────────

export type DeltaKey = keyof ConfigDelta;

export interface PresetEditor {
    /** Sparse reactive delta — only fields the user has touched. */
    readonly delta: ConfigDelta;
    /** Baseline values (for UI pre-population + reset). Never mutated. */
    readonly defaults: ConfigBaseline;
    readonly isDark: Ref<boolean>;
    /** Read the effective value — delta wins, baseline fallback. */
    effective<K extends keyof ConfigBaseline>(key: K): ConfigBaseline[K];
    /** Effective value for a single font slot. */
    effectiveFont(slot: keyof FontSlots): string;
    /**
     * Set a field. Equal-to-default clears the delta entry and strips the
     * inline CSS property. Anything else stores and writes.
     */
    setField<K extends keyof ConfigBaseline>(key: K, value: ConfigBaseline[K]): void;
    /** Set one font slot; equal-to-default clears just that slot. */
    setFont(slot: keyof FontSlots, stack: string): void;
    /** Clear one field back to library-default behaviour. */
    clearField(key: DeltaKey): void;
    /** Clear everything; removes every inline property we ever wrote. */
    reset(): void;
    /**
     * Preset selection. Tags delta.preset; individual field deltas are not
     * touched so the user's explicit overrides survive a preset switch.
     */
    setPreset(id: PresetId | "custom"): void;
}

let singleton: PresetEditor | null = null;

/**
 * Apply every field present in `delta` to `:root` and record which CSS
 * custom properties we wrote. Returns the set of written property names.
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

    for (const field of ["scaleBase", "hueShift", "grain", "density", "radius", "cartoonShadow"] as const) {
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
    const link = presetLinkEl;
    if (link) link.disabled = true;
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
