// demo/configurator/useConfigurator.ts — live token editor backing store.
//
// A single reactive config object, persisted to localStorage and mirrored onto
// `document.documentElement.style` as CSS custom properties. Importing this
// module is side-effect-free; call `useConfigurator()` to get (or create) the
// global singleton.

import { reactive, watch, type Ref } from "vue";
import { useGlobalDark } from "@/composables/useGlobalDark";
import { PRESETS, type PresetId } from "../presets/manifest";

// ─── Types ────────────────────────────────────────────────────────────────

export type Density = "cozy" | "comfortable" | "compact";

export interface FontSlots {
    serif: string;
    sans: string;
    display: string;
    mono: string;
}

export interface ConfiguratorState {
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

export const DEFAULT_CONFIG: ConfiguratorState = {
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

// ─── Persistence ──────────────────────────────────────────────────────────

function loadPersisted(): Partial<ConfiguratorState> | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as unknown;
        if (typeof parsed !== "object" || parsed === null) return null;
        return parsed as Partial<ConfiguratorState>;
    } catch {
        return null;
    }
}

function persist(state: ConfiguratorState): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function applyPresetStylesheet(presetId: ConfiguratorState["preset"]): void {
    const link = ensurePresetLink();
    if (!link) return;
    const def = PRESETS.find((p) => p.id === presetId);
    if (!def || def.cssHref === null) {
        link.disabled = true;
        return;
    }
    if (link.href !== def.cssHref) {
        link.href = def.cssHref;
    }
    link.disabled = false;
}

// ─── Token writing ────────────────────────────────────────────────────────

const DENSITY_SCALE: Record<Density, { pad: string; gap: string }> = {
    cozy: { pad: "1.25rem", gap: "0.875rem" },
    comfortable: { pad: "1rem", gap: "0.75rem" },
    compact: { pad: "0.625rem", gap: "0.5rem" },
};

function writeTokens(state: ConfiguratorState): void {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const s = root.style;

    // Fonts
    s.setProperty("--font-serif", state.font.serif);
    s.setProperty("--font-sans", state.font.sans);
    s.setProperty("--font-display", state.font.display);
    s.setProperty("--font-mono", state.font.mono);

    // Scale
    const px = `${state.scaleBase}px`;
    s.setProperty("--font-size-base", px);
    s.setProperty("--type-body", px);

    // Hue: we don't re-derive 13 section colors. We expose `--hue-shift` and
    // let consumer CSS apply `filter: hue-rotate(var(--hue-shift))` to the
    // sections it wants tinted. Tradeoff: rotates viz palette visually but
    // doesn't update the underlying hsl() values — acceptable for the demo
    // configurator's preview purpose.
    s.setProperty("--hue-shift", `${state.hueShift}deg`);

    // Grain
    s.setProperty("--glass-grain-opacity", state.grain.toFixed(4));

    // Density
    const d = DENSITY_SCALE[state.density];
    s.setProperty("--density-pad", d.pad);
    s.setProperty("--density-gap", d.gap);

    // Radius
    s.setProperty("--radius", `${state.radius}px`);

    // Cartoon shadow toggle
    s.setProperty(
        "--shadow-card",
        state.cartoonShadow ? "var(--shadow-cartoon)" : "var(--shadow-sm)",
    );

    applyPresetStylesheet(state.preset);
}

// ─── Preset field defaults ────────────────────────────────────────────────

export const PRESET_OVERRIDES: Record<PresetId, Partial<ConfiguratorState>> = {
    default: {
        cartoonShadow: true,
        radius: 10,
        grain: 0.035,
        font: { ...DEFAULT_CONFIG.font },
    },
    neutral: {
        cartoonShadow: false,
        radius: 8,
        grain: 0,
        font: {
            serif: '"Inter", system-ui, sans-serif',
            sans: '"Inter", system-ui, sans-serif',
            display: '"Inter", system-ui, sans-serif',
            mono: '"JetBrains Mono", ui-monospace, monospace',
        },
    },
};

// ─── Singleton store ──────────────────────────────────────────────────────

export interface Configurator {
    readonly state: ConfiguratorState;
    readonly isDark: Ref<boolean>;
    apply(): void;
    reset(): void;
    setPreset(id: ConfiguratorState["preset"]): void;
    markCustom(): void;
}

let singleton: Configurator | null = null;

function cloneDefault(): ConfiguratorState {
    return {
        ...DEFAULT_CONFIG,
        font: { ...DEFAULT_CONFIG.font },
    };
}

function mergePartial(
    base: ConfiguratorState,
    patch: Partial<ConfiguratorState>,
): ConfiguratorState {
    return {
        ...base,
        ...patch,
        font: { ...base.font, ...(patch.font ?? {}) },
    };
}

export function useConfigurator(): Configurator {
    if (singleton) return singleton;

    const { isDark, toggleDark } = useGlobalDark();
    const initial = cloneDefault();
    const persisted = loadPersisted();
    const merged = persisted ? mergePartial(initial, persisted) : initial;
    // Sync dark ref — localStorage wins at boot.
    merged.dark = isDark.value || Boolean(persisted?.dark);

    const state = reactive(merged) as ConfiguratorState;

    function apply(): void {
        writeTokens(state);
        persist(state);
        if (state.dark !== isDark.value) toggleDark();
    }

    function reset(): void {
        const fresh = cloneDefault();
        Object.assign(state, fresh);
        state.font = { ...fresh.font };
    }

    function setPreset(id: ConfiguratorState["preset"]): void {
        state.preset = id;
        if (id === "custom") return;
        const overrides = PRESET_OVERRIDES[id];
        if (!overrides) return;
        Object.assign(state, mergePartial(state, overrides));
    }

    function markCustom(): void {
        if (state.preset !== "custom") state.preset = "custom";
    }

    watch(
        () => state,
        () => apply(),
        { deep: true, immediate: true },
    );

    // Dark toggle side channel — if the user hits the lib-level toggle
    // elsewhere, mirror it back into configurator state.
    watch(isDark, (v) => {
        if (state.dark !== v) state.dark = v;
    });

    singleton = { state, isDark, apply, reset, setPreset, markCustom };
    return singleton;
}
