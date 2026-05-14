// demo/configurator/preset-editor/persistence.ts — localStorage I/O + the
// 2-version migration logic (full-snapshot → sparse-delta).
//
// O.W3 Lane C — split from the prior `usePresetEditor.ts` god-module per Rβ.
// Pure data plumbing; no DOM mutations.

import { DEFAULT_CONFIG, STORAGE_KEY } from "./defaults";
import type { ConfigBaseline, ConfigDelta, Density, FontSlots } from "./types";
import type { PresetId } from "../../presets/manifest";

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

export function loadPersisted(): ConfigDelta {
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

export function persist(delta: ConfigDelta): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(delta));
    } catch {
        /* quota / private-mode — silently drop */
    }
}
