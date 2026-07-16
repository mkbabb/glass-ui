import { defineComponent, h, markRaw } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import * as MetricSurface from "@glass/components/metric";
import { coalesceMetric } from "@glass/components/metric/coalesce-metric";

const { Metric, MetricCell, MetricRow, MetricStack } = MetricSurface;
const TestIcon = markRaw(defineComponent({
    name: "TestIcon",
    setup: () => () => h("svg", { "data-test": "icon" }),
}));

describe("metric value truth", () => {
    it.each([
        [0, "0"],
        [0.25, "0.25"],
        ["ready", "ready"],
    ])("preserves %j", (value, display) => {
        expect(coalesceMetric(value)).toEqual({ display, empty: false, loading: false });
    });

    it.each([null, undefined, "", "  ", Number.NaN, Infinity, -Infinity])(
        "coalesces %j to the placeholder",
        (value) => {
            expect(coalesceMetric(value, "n/a")).toEqual({
                display: "n/a",
                empty: true,
                loading: false,
            });
        },
    );

    it("gives loading precedence over a present value", () => {
        expect(coalesceMetric(42, "pending", true)).toEqual({
            display: "…",
            empty: false,
            loading: true,
        });
    });
});

describe("metric family contract", () => {
    it("keeps Metric a static span with explicit size and orientation", () => {
        const wrapper = mount(Metric, {
            props: {
                context: "Current",
                label: "Latency",
                orientation: "stacked",
                size: "xl",
                unit: "ms",
                value: 0,
            },
        });

        expect(wrapper.element.tagName).toBe("SPAN");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("tabindex")).toBeUndefined();
        expect(wrapper.attributes("data-orientation")).toBe("stacked");
        expect(wrapper.attributes("data-size")).toBe("xl");
        expect(wrapper.get(".metric__label").text()).toBe("Latency");
        expect(wrapper.get(".metric__value").text()).toBe("0");
        expect(wrapper.get(".metric__unit").text()).toBe("ms");
        expect(wrapper.get(".metric__context").text()).toBe("Current");
    });

    it("masks a custom value slot while loading without changing geometry", () => {
        const wrapper = mount(Metric, {
            props: { value: 42, loading: true },
            slots: { value: "sensitive" },
        });

        expect(wrapper.attributes("data-loading")).toBe("true");
        expect(wrapper.attributes("aria-busy")).toBe("true");
        expect(wrapper.get(".metric__value").text()).toBe("…");
        expect(wrapper.text()).not.toContain("sensitive");
    });

    it("renders MetricCell as one wash surface with a direct icon", () => {
        const wrapper = mount(MetricCell, {
            props: { icon: TestIcon, label: "Requests", value: 12, unit: "/s" },
            slots: { context: "Five-minute window" },
        });

        expect(wrapper.element.tagName).toBe("DIV");
        expect(wrapper.attributes("data-density")).toBeUndefined();
        expect(wrapper.find("[data-test='icon']").exists()).toBe(true);
        expect(wrapper.get(".metric__label").text()).toBe("Requests");
        expect(wrapper.get(".metric__value").text()).toBe("12");
        expect(wrapper.get(".metric__context").text()).toBe("Five-minute window");
        expect(wrapper.find(".glass-chip").exists()).toBe(false);
    });

    it("renders MetricRow as one truthful static row", () => {
        const label = "Extraordinarily long checkpoint description";
        const wrapper = mount(MetricRow, {
            props: { context: "Current window", label, value: 12048, unit: "events" },
        });

        expect(wrapper.element.tagName).toBe("DIV");
        expect(wrapper.attributes("tabindex")).toBeUndefined();
        expect(wrapper.get(".metric__label").text()).toBe(label);
        expect(wrapper.get(".metric__context").text()).toBe("Current window");
        expect(wrapper.get(".metric__value").text()).toBe("12048");
    });

    it("makes MetricStack only a density-bearing div grid", () => {
        const wrapper = mount(MetricStack, {
            props: { density: "compact" },
            slots: {
                default: () => [
                    h(MetricRow, { label: "A", value: 1 }),
                    h(MetricRow, { label: "B", value: 2 }),
                ],
            },
        });

        expect(wrapper.element.tagName).toBe("DIV");
        expect(wrapper.attributes("data-density")).toBe("compact");
        expect(wrapper.findAll(":scope > .metric-row")).toHaveLength(2);
        expect(wrapper.attributes("data-register")).toBeUndefined();
        expect(wrapper.attributes("data-variant")).toBeUndefined();
    });
});
