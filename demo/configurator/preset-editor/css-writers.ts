// demo/configurator/preset-editor/css-writers.ts — runtime CSS-variable writers.
//
// O.W3 Lane C — split from the prior `usePresetEditor.ts` god-module per Rβ.
// Pure CSS-custom-property application — no module-level state, no localStorage,
// no stylesheet `<link>` toggling. Caller owns the `written` accounting; this
// module just mutates `root.style`.

import { DENSITY_SCALE, FONT_SLOT_VARS } from "./defaults";
import type { Density, FontSlots, WritableField } from "./types";

export function writeField(root: HTMLElement, field: WritableField, value: unknown): void {
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

export function writeFontSlot(
    root: HTMLElement,
    slot: keyof FontSlots,
    stack: string,
): void {
    root.style.setProperty(FONT_SLOT_VARS[slot], stack);
}
