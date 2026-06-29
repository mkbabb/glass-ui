import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { MetricRow, MetricStack } from "@glass/components/custom/metric-stack/index";

describe("MetricStack", () => {
    it("mounts with the container-name + data-variant attributes", () => {
        const wrapper = mount(MetricStack, {
            props: {
                containerName: "results-stack",
                variant: "dpi",
                rows: 2,
            },
            slots: { default: "<div>row</div>" },
        });

        const root = wrapper.get(".metric-stack");
        expect(root.attributes("data-variant")).toBe("dpi");
        // The container-name applies through inline style; vue-test-utils
        // surfaces it via the style attribute.
        expect(root.attributes("style") || "").toContain("container-name");
        expect(root.attributes("style") || "").toContain("--metric-stack-rows: 2");
    });

    it("defaults the rows knob to 4 + container-name to 'metric-stack'", () => {
        const wrapper = mount(MetricStack);
        const root = wrapper.get(".metric-stack");
        expect(root.attributes("style") || "").toContain("--metric-stack-rows: 4");
        expect(root.attributes("style") || "").toContain("metric-stack");
    });

    it("defaults the register to 'audacious' (the poster-scale hero clamp)", () => {
        const wrapper = mount(MetricStack);
        const root = wrapper.get(".metric-stack");
        expect(root.attributes("data-register")).toBe("audacious");
    });

    it("mirrors the 'result' register to a data-register attribute", () => {
        // The compact result register opts a multi-row ledger of finished
        // values down from the poster clamp so it seats inside a bounded
        // card — the `[data-register="result"]` selector carries the
        // retuned clamp tokens.
        const wrapper = mount(MetricStack, {
            props: { register: "result" },
        });
        const root = wrapper.get(".metric-stack");
        expect(root.attributes("data-register")).toBe("result");
    });
});

describe("MetricRow", () => {
    it("renders label + value + unit through props", () => {
        const wrapper = mount(MetricRow, {
            props: {
                label: "Download",
                value: "85",
                unit: "Mbps",
            },
        });

        expect(wrapper.text()).toContain("Download");
        expect(wrapper.text()).toContain("85");
        expect(wrapper.text()).toContain("Mbps");
    });

    it("renders the placeholder glyph when value is null", () => {
        const wrapper = mount(MetricRow, {
            props: { value: null, placeholder: "—" },
        });
        expect(wrapper.text()).toContain("—");
    });

    it("sets --phase-color + --digit-count inline when props are passed", () => {
        const wrapper = mount(MetricRow, {
            props: {
                value: "1000",
                phaseColor: "rgb(255, 0, 0)",
                digitCount: 4,
            },
        });
        const style = wrapper.get(".metric-row").attributes("style") || "";
        expect(style).toContain("--phase-color: rgb(255, 0, 0)");
        expect(style).toContain("--digit-count: 4");
    });

    it("mirrors active + colorTinted to data attributes", () => {
        const wrapper = mount(MetricRow, {
            props: { value: "1", active: true, colorTinted: true },
        });
        const row = wrapper.get(".metric-row");
        expect(row.attributes("data-row-active")).toBe("true");
        expect(row.attributes("data-color-tinted")).toBe("true");
    });

    it("renders the aura slot inside the value span", () => {
        const wrapper = mount(MetricRow, {
            props: { value: "1" },
            slots: {
                aura: '<span class="test-aura">aura</span>',
            },
        });
        const value = wrapper.get(".metric-row__value");
        expect(value.find(".test-aura").exists()).toBe(true);
    });

    it("renders the description slot — promotion is container-query driven", () => {
        const wrapper = mount(MetricRow, {
            props: { value: "1" },
            slots: {
                description: '<div class="metric-row__description">desc</div>',
            },
        });
        expect(wrapper.text()).toContain("desc");
    });

    it("accepts the `--metric-row-unit-color` knob to demote the unit color (AJ-W1-γ-pub)", () => {
        // Consumer demotes the UNIT register to muted-foreground while the
        // VALUE register stays bound to --phase-color. The knob cascades
        // through MetricRow's inline `--phase-color` setter so a single
        // tinted row can carry a saturated value + a neutral unit per
        // DESIGN.md §1387-1389. Default behaviour (no knob set) keeps both
        // VALUE + UNIT bound to --phase-color — verified by the prior
        // tests above continuing to pass.
        const wrapper = mount(MetricRow, {
            props: {
                value: "240",
                unit: "Mbps",
                phaseColor: "rgb(200, 31, 46)",
                colorTinted: true,
            },
            attrs: {
                style: "--metric-row-unit-color: rgb(115, 115, 115)",
            },
        });
        const row = wrapper.get(".metric-row");
        const style = row.attributes("style") || "";
        // Both the phase-color setter (from the prop) and the
        // consumer-supplied unit-color override land on the row root, so
        // the cascade resolves the value cell at `--phase-color` and the
        // unit cell at `--metric-row-unit-color`.
        expect(style).toContain("--phase-color: rgb(200, 31, 46)");
        expect(style).toContain("--metric-row-unit-color: rgb(115, 115, 115)");
        expect(row.attributes("data-color-tinted")).toBe("true");
    });
});
