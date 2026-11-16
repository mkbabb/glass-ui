// BK row #31 (W-A11Y) — O-8: "the native `title` tooltip occludes the control it
// describes" (COMPONENT-WAVES-TERMINAL D-6; the capture shows a raw dark
// square-cornered rect covering the trigger it labels — the browser's tooltip, not
// ours). The routed cure, verbatim: "strike `title` from any control that carries a
// `<Tooltip>`."
//
// The two sites, both in the dock family, whose documented label affordance IS the
// library's `<Tooltip side="right">` (recorded at
// `dock/styles/controls/touch-floor.css`):
//   · `DockLayerGroup.vue` switcher tabs — the switcher story wraps every entry in a Tooltip;
//   · `DockBackgroundToggle.vue` — [W-I.8, RULINGS-6] deleted with its rendered-attr test:
//     no app used it.
// Both carried `:title` AND `:aria-label`, so the native rect painted over the styled
// one on the browser's own delay, and the browser's delay is not ours to tune.
//
// RENDERED-attr asserts: an attribute that survives in the template but is dropped by
// `inheritAttrs`/`v-bind` plumbing (or the reverse) is caught only in the rendered DOM
// — the binding-verification discipline.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string): string => readFileSync(path, "utf8");

describe("O-8 — a control that carries a <Tooltip> renders no native title", () => {
    it("the switcher tab template stamps no title either", () => {
        // Rendering the switcher needs the whole dock layer context; the assertion that
        // matters is that the attribute is not authored.
        const template = read("src/components/dock/DockLayerGroup.vue").replace(
            /<!--[\s\S]*?-->/g,
            "",
        );
        expect(template).not.toMatch(/:title=/);
    });

    it("the strike is family-wide — no dock control re-introduces one", () => {
        // O-8 is a CLASS, not two sites: the next dock control to want a label must
        // reach for the Tooltip the family already ships.
        const offenders: string[] = [];
        for (const file of [
            "src/components/dock/DockControl.vue",
            "src/components/dock/DockLayerGroup.vue",
            "src/components/dock/DockLayer.vue",
            "src/components/dock/GlassDock.vue",
        ]) {
            const template = read(file).replace(/<!--[\s\S]*?-->/g, "");
            if (/\s:?title="/.test(template)) offenders.push(file);
        }
        expect(offenders).toEqual([]);
    });
});
