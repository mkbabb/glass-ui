// D6.a — the HandMark SFC renders pen + crayon + circle, with the right draw-on
// mechanism per medium and the PRM-instant collapse.
//
// The load-bearing render contracts (SPEC §6.2 / §8 / ds-crayon-handmark §5):
//   - pen (grain:0) renders a bare stroked <path>, NO <filter>, dashoffset draw-on;
//   - crayon (grain>0) renders the static seeded <filter> + 2 passes, and its
//     draw-on is a clip-path WIPE (never dashoffset under the filter — the Δ4 gate);
//   - circle (positioned) rides ellipsePoints and renders a closed ring;
//   - the mark is aria-hidden, the slotted word stays real selectable text;
//   - PRM collapses every draw-on to the finished static state.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HandMark from "@glass/components/custom/handmark/HandMark.vue";

function mockPRM(matches: boolean): void {
    Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: (query: string) =>
            ({
                matches: query.includes("prefers-reduced-motion") ? matches : false,
                media: query,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }) as unknown as MediaQueryList,
    });
}

beforeEach(() => mockPRM(false));
afterEach(() => vi.restoreAllMocks());

describe("D6.a HandMark — the medium renders", () => {
    it("PEN is free: a bare stroked <path>, NO <filter> def (grain:0)", () => {
        const w = mount(HandMark, {
            props: { brush: "pen" },
            slots: { default: "who pays in" },
        });
        expect(w.text()).toContain("who pays in"); // the word stays real text
        const svg = w.find("svg.hm__svg");
        expect(svg.exists()).toBe(true);
        expect(svg.attributes("aria-hidden")).toBe("true");
        expect(svg.attributes("preserveAspectRatio")).toBe("none"); // width-invariance
        // no filter def, exactly one stroked pass
        expect(w.find("filter").exists()).toBe(false);
        const paths = w.findAll("path.hm__path");
        expect(paths).toHaveLength(1);
        expect(paths[0].attributes("stroke")).not.toBe("none");
        expect(paths[0].attributes("filter")).toBeUndefined();
        // the width-invariance contract: non-scaling-stroke + pathLength=1
        expect(paths[0].attributes("vector-effect")).toBe("non-scaling-stroke");
        expect(paths[0].attributes("pathLength")).toBe("1");
        w.unmount();
    });

    it("CRAYON renders the static seeded <filter> + 2 offset passes (stroke-crayon)", () => {
        const w = mount(HandMark, {
            props: { brush: "crayon", color: "#cc0000", seed: 6 },
            slots: { default: "got connected" },
        });
        // the static grain filter is mounted (the 5-stage graph)
        const html = w.html();
        expect(html).toContain("<filter");
        expect(html).toContain("feTurbulence");
        expect(html).toContain('operator="in"');
        // two passes (the overdraw brick), both referencing the filter
        const paths = w.findAll("path.hm__path");
        expect(paths).toHaveLength(2);
        expect(paths[0].attributes("filter")).toContain("url(#");
        w.unmount();
    });

    it("CIRCLE (positioned) rides ellipsePoints — a closed ring over a datum box", () => {
        const w = mount(HandMark, {
            props: {
                brush: "crayon",
                shape: "circle",
                box: { x: 30, y: 12, w: 40, h: 16 },
                seed: 3,
            },
        });
        const path = w.find("path.hm__path");
        expect(path.exists()).toBe(true);
        // the ring `d` is non-empty (the overshoot ring serialized to a bezier)
        expect(path.attributes("d")?.length ?? 0).toBeGreaterThan(10);
        expect(w.find("span.hm").attributes("data-shape")).toBe("circle");
        w.unmount();
    });

    it("RING brush ring is ASPECT-STABLE: thin weight + non-scaling-stroke (E7a)", () => {
        // the positioned circle in the toned `ring` brush: a single thin pass whose
        // rendered stroke band is INVARIANT to the figure's aspect ratio — the
        // `preserveAspectRatio="none"` stretch scales the PATH, never the stroke
        // band, because the SFC stamps `vector-effect="non-scaling-stroke"`.
        const w = mount(HandMark, {
            props: {
                brush: "ring",
                shape: "circle",
                color: "#cc0000",
                box: { x: 20, y: 8, w: 60, h: 24 },
                seed: 11,
            },
        });
        const paths = w.findAll("path.hm__path");
        // single pass (the whisper), not the crayon's 2-pass slab.
        expect(paths).toHaveLength(1);
        const path = paths[0];
        // the rendered stroke band is the thin ring weight (5), aspect-stable …
        expect(path.attributes("stroke-width")).toBe("5");
        // … because the stroke is non-scaling (immune to the non-uniform x-stretch).
        expect(path.attributes("vector-effect")).toBe("non-scaling-stroke");
        // the hand-circle overshoot character is KEPT (the closed ellipsePoints ring).
        expect(path.attributes("d")?.length ?? 0).toBeGreaterThan(10);
        w.unmount();
    });
});

describe("D6.a HandMark — the draw-on mechanism per medium (the Δ4 gate)", () => {
    it("PEN draw-on uses stroke-dashoffset (clean ink — no filter to re-raster)", () => {
        const w = mount(HandMark, {
            props: { brush: "pen", animation: "draw-on", appear: "manual" },
            slots: { default: "ink" },
        });
        const path = w.find("path.hm__path");
        expect(path.classes()).toContain("hm__path--dashoffset");
        expect(path.classes()).not.toContain("hm__path--clip");
        // the transition targets stroke-dashoffset, NOT the filter
        expect(path.attributes("style")).toContain("stroke-dashoffset");
        w.unmount();
    });

    it("CRAYON draw-on uses a clip-path WIPE (never dashoffset under the filter)", () => {
        const w = mount(HandMark, {
            props: { brush: "crayon", animation: "draw-on", appear: "manual" },
            slots: { default: "ink" },
        });
        const path = w.find("path.hm__path");
        expect(path.classes()).toContain("hm__path--clip");
        expect(path.classes()).not.toContain("hm__path--dashoffset");
        // the transition targets clip-path (compositor-eligible), NOT dashoffset
        const style = path.attributes("style") ?? "";
        expect(style).toContain("clip-path");
        expect(style).not.toContain("stroke-dashoffset");
        w.unmount();
    });

    it("PRM collapses draw-on to instant: under reduce, the draw transition no-ops via CSS", () => {
        // the @media (prefers-reduced-motion: reduce) block forces transition:none and
        // the finished state on BOTH mechanisms — assert the marker classes are present
        // so the media query has a target (the static collapse is CSS-enforced).
        mockPRM(true);
        const w = mount(HandMark, {
            props: { brush: "crayon", animation: "draw-on", appear: "mount" },
            slots: { default: "ink" },
        });
        const path = w.find("path.hm__path");
        // the clip marker is present → the PRM block's `clip-path: none !important`
        // (and the dashoffset arm's `stroke-dashoffset: 0`) collapse it to finished.
        expect(path.classes()).toContain("hm__path--clip");
        w.unmount();
    });
});
