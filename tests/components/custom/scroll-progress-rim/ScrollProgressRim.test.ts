import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";

const STYLES = readFileSync(
    resolve(process.cwd(), "src/components/scroll-progress-rim/styles.css"),
    "utf8",
);

const fillVar = (style: string) =>
    style.match(/--scroll-progress-rim-fill:\s*([^;]+)/)?.[1]?.trim() ?? "";

describe("ScrollProgressRim — law-12 fill-pill + dots geometry", () => {
    // Gate (a): no progress indicator renders a partial-arc stroke. The angular
    // conic paint + the border-box mask-xor perimeter trick are the born-RED at
    // HEAD (styles.css:20-24 conic-gradient, :27-34 mask-composite); the fill-pill
    // is a linear paint, so no angular geometry may survive anywhere in the CSS.
    it("carries no angular/perimeter paint — the broken-arc geometry is retired", () => {
        expect(STYLES).not.toMatch(/conic-gradient/);
        expect(STYLES).not.toMatch(/mask-composite/);
        expect(STYLES).not.toMatch(/mask-border/);
    });

    it("paints the spectrum as a linear gradient, never an angular sweep", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: { value: 50, max: 100 },
        });
        const style = wrapper.attributes("style") ?? "";
        expect(style).toMatch(/--scroll-progress-rim-spectrum:\s*linear-gradient\(/);
        expect(style).not.toContain("conic-gradient");
    });

    // Gate (b) — the segment arm: the aggregate fill reads its true fraction, NOT
    // the pinned 100% that made "aggregate 52% read near-full" (the dossier's
    // 4-stages card). value 2.07 / max 4 = 51.75%.
    it("drives the segment fill by the true aggregate fraction, not a pinned 100%", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: { value: 2.07, max: 4, segments: [1, 0.72, 0.35, 0] },
        });
        const style = wrapper.attributes("style") ?? "";
        expect(fillVar(style)).toBe("51.750%");
        expect(fillVar(style)).not.toBe("100%");
    });

    // Gate (b) — monotonic growth (characterization pin of the new model; the
    // continuous fraction was already monotonic at HEAD, so this is NOT dressed as
    // born-RED — it pins the fill-pill contract across value steps).
    it("grows the fill-pill monotonically with value", () => {
        const at = (value: number) => {
            const wrapper = mount(ScrollProgressRim, {
                props: { value, max: 1 },
            });
            return parseFloat(fillVar(wrapper.attributes("style") ?? ""));
        };
        const [a, b, c] = [at(0.25), at(0.5), at(0.75)];
        expect(a).toBeCloseTo(25, 3);
        expect(b).toBeCloseTo(50, 3);
        expect(c).toBeCloseTo(75, 3);
        expect(a).toBeLessThan(b);
        expect(b).toBeLessThan(c);
    });

    // The dots half of law 12 — discrete positions render as the family's SHARED
    // checkpoint marks, and a mark the pill has passed is CONSUMED. AMENDED at BK
    // #88: the selector follows its moved subject (`.glass-value-mark`, the one
    // register) and the encoding follows the family's one declared law
    // (`[data-consumed]`), replacing this component's private fractional-opacity
    // math. Behaviour-equivalent at the partition level; the crossfade itself
    // changes from fraction-driven to time-based and is a DECLARED paint delta.
    it("renders one mark per segment and consumes the passed ones", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: { value: 2.07, max: 4, segments: [1, 0.72, 0.35, 0] },
        });
        const marks = wrapper.findAll(".glass-value-mark");
        expect(marks).toHaveLength(4);

        // mark centres at 12.5 / 37.5 / 62.5 / 87.5% — fill is 51.75%, so the first
        // two are consumed and the last two stay lit.
        expect(
            marks.map((mark) => mark.attributes("data-consumed") !== undefined),
        ).toEqual([true, true, false, false]);
    });

    it("renders no marks for continuous scroll progress", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: { value: 40, max: 100 },
        });
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(0);
        expect(wrapper.find(".glass-value-marks").exists()).toBe(false);
    });

    it("preserves the progressbar semantics and clamps to range", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: { value: 120, max: 100 },
            attrs: { "aria-label": "Article progress" },
        });
        expect(wrapper.attributes()).toMatchObject({
            role: "progressbar",
            "aria-label": "Article progress",
            "aria-valuemin": "0",
            "aria-valuenow": "100",
            "aria-valuemax": "100",
        });
        expect(fillVar(wrapper.attributes("style") ?? "")).toBe("100.000%");
        expect(
            wrapper.get(".scroll-progress-rim__track").attributes("aria-hidden"),
        ).toBe("true");
    });

    it("exposes an orientation for the horizontal/vertical fill axis", () => {
        const horizontal = mount(ScrollProgressRim, { props: { value: 1 } });
        expect(horizontal.attributes("data-orientation")).toBe("horizontal");
        const vertical = mount(ScrollProgressRim, {
            props: { value: 1, orientation: "vertical" },
        });
        expect(vertical.attributes("data-orientation")).toBe("vertical");
    });
});
