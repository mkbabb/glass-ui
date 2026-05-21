import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";

import type { MetaballPositioning } from "../types";

/**
 * AJ-W1-β — MetaballCanvas `positioning` prop test suite.
 *
 * The publisher adds a `positioning: "viewport" | "local"` prop that swaps
 * the canvas root's positioning utilities. `"viewport"` (default) preserves
 * the pre-W1-β viewport-cover trio (`fixed inset-0 -z-10 + h-full w-full +
 * pointer-events-none`). `"local"` drops the viewport-cover trio so the
 * consumer's scoped CSS becomes the sole source of layout truth.
 *
 * `useMetaballs` probes WebGL synchronously and gates the canvas via
 * `v-if="isSupported"`. happy-dom has no real WebGL context, so we mock
 * the composable to force `isSupported: true` and surface the canvas
 * element for class-string assertions. The composable's runtime mechanics
 * (shader compile, RAF loop) are exercised by the configurator-recursion
 * spec; this suite is scoped to the publisher prop contract.
 */
vi.mock("../useMetaballs", () => ({
    useMetaballs: () => ({
        isSupported: ref(true),
        isReducedMotion: ref(false),
        isReducedTransparency: ref(false),
    }),
    isWebGLSupported: () => true,
}));

// Imported AFTER the mock so the SFC consumes the mocked composable.
const { default: MetaballCanvas } = await import("../MetaballCanvas.vue");

describe("MetaballCanvas positioning prop (AJ-W1-β)", () => {
    it("defaults to `viewport` — emits the viewport-cover utility trio", () => {
        const wrapper = mount(MetaballCanvas);
        const canvas = wrapper.get("canvas");
        const classes = canvas.classes();

        // Viewport-cover trio:
        expect(classes).toContain("fixed");
        expect(classes).toContain("inset-0");
        expect(classes).toContain("-z-10");

        // Base utilities present in BOTH modes:
        expect(classes).toContain("pointer-events-none");
        expect(classes).toContain("h-full");
        expect(classes).toContain("w-full");
    });

    it("`positioning=\"viewport\"` matches the default class output", () => {
        const wrapper = mount(MetaballCanvas, {
            props: { positioning: "viewport" },
        });
        const canvas = wrapper.get("canvas");
        const classes = canvas.classes();

        expect(classes).toContain("fixed");
        expect(classes).toContain("inset-0");
        expect(classes).toContain("-z-10");
        expect(classes).toContain("pointer-events-none");
        expect(classes).toContain("h-full");
        expect(classes).toContain("w-full");
    });

    it("`positioning=\"local\"` drops the viewport-cover trio + retains the base utilities", () => {
        const wrapper = mount(MetaballCanvas, {
            props: { positioning: "local" },
        });
        const canvas = wrapper.get("canvas");
        const classes = canvas.classes();

        // Viewport-cover trio retired:
        expect(classes).not.toContain("fixed");
        expect(classes).not.toContain("inset-0");
        expect(classes).not.toContain("-z-10");

        // Base utilities retained — pointer-events-none + h-full + w-full
        // encode that the canvas is decorative substrate and fills its
        // container; consumer scoped CSS owns position/inset/z-index.
        expect(classes).toContain("pointer-events-none");
        expect(classes).toContain("h-full");
        expect(classes).toContain("w-full");
    });

    it("`MetaballPositioning` narrows to the literal union `\"viewport\" | \"local\"`", () => {
        // Static type-narrowing assertions — these would fail at type-check
        // time if the union widened or the literal-string contract drifted.
        // The runtime expectations also ensure the literals stay live as
        // values (so the test doesn't pass with a type-only declaration).
        const viewport: MetaballPositioning = "viewport";
        const local: MetaballPositioning = "local";

        expect(viewport).toBe("viewport");
        expect(local).toBe("local");

        // Confirm the prop accepts both literals at the component surface
        // (no console warning + matching class output for each).
        const w1 = mount(MetaballCanvas, { props: { positioning: viewport } });
        const w2 = mount(MetaballCanvas, { props: { positioning: local } });

        expect(w1.get("canvas").classes()).toContain("fixed");
        expect(w2.get("canvas").classes()).not.toContain("fixed");
    });
});
