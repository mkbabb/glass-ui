// D6.a — the grain filter is STATIC + SEEDED (the Δ4 gate, ds-crayon-handmark §3).
//
// The crayon's <filter> must raster ONCE, never animate. This is what licenses the
// crayon on permanent chrome: a static seeded filter is whitelist-irrelevant at
// rest (the draw-on is a clip-path wipe, not dashoffset under the filter). The
// determinism law (SPEC §7): same (brush, seed) ⇒ byte-identical filter; change
// only `seed` ⇒ a different but same-character grain.

import { describe, expect, it } from "vitest";
import { BRUSHES } from "../../../../src/components/custom/handmark/brush";
import { grainFilter } from "../../../../src/components/custom/handmark/texture";

describe("D6.a texture — the static seeded grain filter", () => {
    it("emits the 5-stage feTurbulence graph for the crayon (the proven recipe)", () => {
        const f = grainFilter("hm-a", BRUSHES.crayon, 7);
        // the canonical pipeline: warp turbulence → displace → grain turbulence →
        // alpha-gate → composite "in" (paper-through holes) → re-break displace
        expect(f).toContain("feTurbulence");
        expect(f).toContain("feDisplacementMap");
        expect(f).toContain("feColorMatrix");
        expect(f).toContain('operator="in"'); // punches holes THROUGH the body
        expect(f).toContain('color-interpolation-filters="sRGB"');
        // exactly two turbulence stages (warp + grain) and two displacements
        expect((f.match(/feTurbulence/g) ?? []).length).toBe(2);
        expect((f.match(/feDisplacementMap/g) ?? []).length).toBe(2);
    });

    it("is DETERMINISTIC: same (brush, seed) ⇒ byte-identical filter (SPEC §7)", () => {
        const a = grainFilter("hm-fixed", BRUSHES.crayon, 7);
        const b = grainFilter("hm-fixed", BRUSHES.crayon, 7);
        expect(a).toBe(b); // it rasters the SAME thing every time (static)
    });

    it("VARIES by seed: changing only seed ⇒ a different turbulence seed (same character)", () => {
        const a = grainFilter("hm-fixed", BRUSHES.crayon, 7);
        const c = grainFilter("hm-fixed", BRUSHES.crayon, 42);
        // the derived grain sub-seed (seed ^ 0x85eb) differs → different fleck field
        expect(a).not.toBe(c);
        // but the GRAPH shape (the stages) is identical — same medium, different grain
        const stagesA = a.match(/<fe[A-Za-z]+/g);
        const stagesC = c.match(/<fe[A-Za-z]+/g);
        expect(stagesA).toEqual(stagesC);
    });

    it("the filter carries NO animate/values-over-time elements (it is static, never boiled)", () => {
        const f = grainFilter("hm-a", BRUSHES.crayon, 7);
        // a static filter has no <animate>, no dur/begin — it never re-rasters per frame
        expect(f).not.toContain("<animate");
        expect(f).not.toContain("dur=");
        expect(f).not.toContain("begin=");
    });
});
