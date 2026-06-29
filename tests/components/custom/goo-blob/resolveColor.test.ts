import { describe, expect, it } from "vitest";

import {
    cssToOklch,
    defaultBlobColorResolver,
} from "@glass/composables/color/index";

// AW.W13 — the goo-blob per-frame `value.js` throw.
//
// `defaultBlobColorResolver` resolves its color via `cssToOklch(css)`, which
// feeds the string straight to value.js's `parseCSSColor`. value.js CANNOT
// parse a CSS custom-property reference (`var(--primary)`) and THROWS — once per
// frame the renderer drew with a token color (the confirmed live runtime bug).
//
// The fix resolves the token to a CONCRETE color (a browser-computed `rgb(...)`)
// in `GooBlob.vue` BEFORE the resolver sees it. These units lock the contract at
// the value.js boundary: a `var()` wrapper throws (proving the bug the fix
// avoids), a concrete color resolves clean (proving the resolved value the fix
// produces is parseable).
describe("goo-blob color resolution — the var() → concrete fix (AW.W13)", () => {
    it("THROWS on a bare var() token (the bug the GooBlob computed-style resolve avoids)", () => {
        // This is the exact string the demo story passes; pre-fix it reached
        // value.js every frame and threw.
        expect(() => cssToOklch("var(--primary)")).toThrow();
        expect(() => defaultBlobColorResolver("var(--primary)")).toThrow();
    });

    it("resolves a concrete rgb() color clean (the value GooBlob's computed-style read produces)", () => {
        // `getComputedStyle(...).color` returns an `rgb(...)` literal — exactly
        // what GooBlob now feeds the resolver instead of the raw var().
        expect(() => cssToOklch("rgb(26, 23, 23)")).not.toThrow();
        const stop = cssToOklch("rgb(26, 23, 23)");
        expect(stop.L).toBeGreaterThanOrEqual(0);
        expect(stop.L).toBeLessThanOrEqual(1);

        const rgb = defaultBlobColorResolver("rgb(26, 23, 23)");
        expect(rgb).toHaveLength(3);
        for (const c of rgb) {
            expect(c).toBeGreaterThanOrEqual(0);
            expect(c).toBeLessThanOrEqual(1);
        }
    });

    it("passes a hex / oklch literal through value.js without a throw", () => {
        expect(() => defaultBlobColorResolver("#1a1717")).not.toThrow();
        expect(() => defaultBlobColorResolver("oklch(0.3 0.02 60)")).not.toThrow();
    });
});
