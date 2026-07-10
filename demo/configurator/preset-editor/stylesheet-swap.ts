// demo/configurator/preset-editor/stylesheet-swap.ts — preset-active stylesheet
// `<link>` hot-swap path.
//
// O.W3 Lane C — split from the prior `usePresetEditor.ts` god-module per Rβ.
// Owns the singleton `<link id="glass-ui-demo-preset-link">` lifecycle: lazy
// creation, href swap, enable/disable. No CSS-variable writes, no localStorage.

import { DEFAULT_CONFIG, PRESET_LINK_ID } from "./defaults";
import { PRESETS, type PresetId } from "../presets/manifest";

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

export function applyPresetStylesheet(presetId: PresetId | "custom" | undefined): void {
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

/**
 * Disable the preset-active stylesheet without clearing its `href`. Used by
 * the store's reset path so a subsequent re-enable can reuse the same DOM
 * node without re-fetching.
 */
export function disablePresetLink(): void {
    if (presetLinkEl) presetLinkEl.disabled = true;
}
