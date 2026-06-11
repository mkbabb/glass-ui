import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { GlassPanel } from "../../../../src/components/custom/glass-panel/index";

const VARIANTS = ["wash", "quiet", "resting", "floating", "overlay"] as const;

// AW.W12 — every renderer tier must honor `variant` per-rung. The svg-filter
// branch (the tier Chromium detects by default) and the fallback branch both
// emit a stable `data-variant` attr so the scoped CSS resolves
// `--glass-bg-{variant}` per rung — pre-fix the svg branch collapsed every
// variant onto the single lightest `wash` rung and the fallback onto
// `floating`. The CSS-half (five DISTINCT rungs per tier) is locked by
// `proof:glass-panel-tiers`; this mount test locks the RENDER half — that the
// per-variant `data-variant` hook the scoped CSS keys on is emitted under each
// forced tier.
describe("GlassPanel — per-rung tier honoring (AW.W12)", () => {
    for (const tier of ["svg-filter", "css", "fallback"] as const) {
        it(`emits a distinct data-variant per rung under tier="${tier}"`, () => {
            const seen = new Set<string>();
            for (const variant of VARIANTS) {
                const wrapper = mount(GlassPanel, {
                    props: { tier, variant },
                });
                const dv = wrapper.attributes("data-variant");
                expect(dv).toBe(variant);
                seen.add(dv ?? "");
                expect(wrapper.classes()).toContain("glass-panel");
                wrapper.unmount();
            }
            // Five distinct rung markers — the ladder reads, not one collapsed surface.
            expect(seen.size).toBe(5);
        });
    }

    it("carries the tier-class marker so the scoped CSS can branch", () => {
        const svg = mount(GlassPanel, { props: { tier: "svg-filter", variant: "wash" } });
        expect(svg.classes()).toContain("glass-panel--svg");
        svg.unmount();

        const fb = mount(GlassPanel, { props: { tier: "fallback", variant: "overlay" } });
        expect(fb.classes()).toContain("glass-panel--fallback");
        fb.unmount();
    });
});
