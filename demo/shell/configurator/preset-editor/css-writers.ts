// demo/shell/configurator/preset-editor/css-writers.ts — runtime CSS-variable writers.
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
        case "glassLevel":
            // The W54 maximal-glass knob. The library's `@property --glass-level`
            // (<number>, inherits:true, initial 1) threads BOTH glass ladders; the
            // demo writes the inheriting `:root` value the descendant surfaces read.
            s.setProperty("--glass-level", `${value as number}`);
            return;
        case "scale":
            // The GLOBAL comfort scalar. `--ui-scale` (the master `<number>`,
            // inherits:true, initial 1) re-tints the whole library's control sizing;
            // the dock's `--dock-scale` derives from it (calc(--ui-scale *
            // --dock-local-scale)), so writing --ui-scale moves the dock for FREE —
            // the demo NEVER writes --dock-scale directly.
            s.setProperty("--ui-scale", `${value as number}`);
            return;
        case "motion":
            // The demo-local reduced-motion override. A custom-property SIGNAL the
            // demo's `@container style(--demo-reduce-motion: reduce)` bracket
            // (demo.css) reads — the shipped @container style() bucket mechanism,
            // no media-query override (a media query cannot be forced from :root).
            // false = honour the system PRM (strip the signal, no override).
            if (value as boolean) s.setProperty("--demo-reduce-motion", "reduce");
            else s.removeProperty("--demo-reduce-motion");
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
