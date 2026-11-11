// O-212 with O-213's overlay cap — ONE inline bound for the plate and the rows inside it.
//
// 11.0.0 capped the Select plate at `min(22rem, 100vw - 2rem)` while the viewport inside
// was forced to the trigger's width, so a trigger wider than 22rem pushed every row past
// the plate's clip; and `100vw` counted a reserved scrollbar gutter as room. The bound is
// now one custom property: at least the anchor, up to 22rem for content, never past the
// room reka measured (`--reka-popper-available-width`, the layout viewport less the
// collision pad). Both the plate arms and the Select plate read it, and the viewport no
// longer forces a width of its own. The paint witness is
// docs/release-11.1.0/fix-2/witness (rows inside the plate, both engines).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) =>
    readFileSync(join(process.cwd(), path), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const plate = read("src/styles/glass/overlay-plate.css");
const select = read("src/components/select/SelectContent.vue");
const flat = (s: string) => s.replace(/\s+/g, " ");

describe("overlay plate — one inline bound", () => {
    it("states the bound once: anchor up to 22rem, inside reka's measured room", () => {
        expect(flat(plate)).toContain(
            "--overlay-inline-cap: min( max(22rem, var(--reka-popper-anchor-width)), var(--reka-popper-available-width) );",
        );
    });

    it("reads it on every anchored arm and never measures room in vw", () => {
        // `none` is the sheet form, which spans the screen and is not anchored.
        const caps = (plate.match(/max-inline-size:\s*[^;]+;/g) ?? []).filter((c) => !c.endsWith("none;"));
        expect(caps.length).toBe(2);
        for (const cap of caps) expect(cap).toBe("max-inline-size: var(--overlay-inline-cap);");
        expect(plate).not.toMatch(/100vw\s*-/);
    });

    it("lets the Select viewport follow its plate", () => {
        expect(select).not.toContain("min-w-(--reka-select-trigger-width)");
    });
});
