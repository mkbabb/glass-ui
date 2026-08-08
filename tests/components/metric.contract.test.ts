import { h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import * as MetricSurface from "@glass/components/metric";
import { coalesceMetric, metricPolarity } from "@glass/components/metric/coalesce-metric";

const { Metric, MetricRow, MetricStack } = MetricSurface;

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

    // BORN-RED at HEAD (A-21). There was no compact form at all, so a dashboard
    // rendering 12400 in a narrow column either printed all five digits or
    // invented its own rounding at the call site — a different one per consumer.
    // `Intl` already knows every locale's compact form; the family's ONE
    // data-shaping seam hands it the number.
    it("compacts a NUMBER through the one seam, and leaves a string alone", () => {
        expect(coalesceMetric(12400, { compact: true, locale: "en-US" }).display).toBe(
            "12.4K",
        );
        expect(coalesceMetric(1240000, { compact: true, locale: "en-US" }).display).toBe(
            "1.2M",
        );
        // A string reading is already the author's chosen shape.
        expect(coalesceMetric("12400", { compact: true, locale: "en-US" }).display).toBe(
            "12400",
        );
        // Loading and empty still outrank formatting.
        expect(
            coalesceMetric(12400, { compact: true, loading: true }).display,
        ).toBe("…");
        expect(
            coalesceMetric(Number.NaN, { compact: true, placeholder: "n/a" }).display,
        ).toBe("n/a");
    });

    it("reads polarity off a numeric delta, and off nothing else", () => {
        expect(metricPolarity(3)).toBe("up");
        expect(metricPolarity(-3)).toBe("down");
        // Zero change is not an event.
        expect(metricPolarity(0)).toBe("flat");
        expect(metricPolarity("steady")).toBeUndefined();
        expect(metricPolarity(null)).toBeUndefined();
    });
});

describe("metric family contract", () => {
    // BORN-RED at HEAD (SL-2). The family shipped FOUR components and three of them
    // re-implemented one readout — the same `coalesceMetric` call, the same
    // `metric__reading`/`__value`/`__unit` markup, the same empty/loading stamps.
    // HEAD reading: `Object.keys(MetricSurface)` included `MetricCell`, and
    // `MetricRow` declared `label`/`value`/`unit`/`context` props of its own.
    it("publishes ONE atom and TWO layout composers", () => {
        expect(Object.keys(MetricSurface).sort()).toEqual([
            "Metric",
            "MetricRow",
            "MetricStack",
            "coalesceMetric",
            "metricPolarity",
        ]);
    });

    it("keeps Metric a static span with explicit size and posture", () => {
        const wrapper = mount(Metric, {
            props: {
                context: "Current",
                label: "Latency",
                posture: "stacked",
                size: "xl",
                unit: "ms",
                value: 0,
            },
        });

        expect(wrapper.element.tagName).toBe("SPAN");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("tabindex")).toBeUndefined();
        expect(wrapper.attributes("data-posture")).toBe("stacked");
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
        // Rest is STILL (#27's rest rung): a display atom reports its state and
        // runs no idle animation. The loading mask is a plate, never a shimmer.
        expect(wrapper.find(".skeleton").exists()).toBe(false);
    });

    // The `cell` posture is what `MetricCell.vue` was a whole component for.
    it("renders the cell posture from the same atom, with no icon surface", () => {
        const wrapper = mount(Metric, {
            props: { posture: "cell", label: "Requests", value: 12, unit: "/s" },
            slots: { context: "Five-minute window" },
        });

        expect(wrapper.attributes("data-posture")).toBe("cell");
        expect(wrapper.classes()).toContain("metric");
        expect(wrapper.classes()).not.toContain("metric-cell");
        expect(wrapper.get(".metric__label").text()).toBe("Requests");
        expect(wrapper.get(".metric__value").text()).toBe("12");
        expect(wrapper.get(".metric__context").text()).toBe("Five-minute window");
        expect(wrapper.find(".glass-chip").exists()).toBe(false);
    });

    // BORN-RED at HEAD. The delta did not exist as a part of the atom at all.
    // It paints status INK on the neutral material — the house `--success` /
    // `--destructive` tokens — never a bespoke green/red and never a coloured plate.
    it("carries a delta whose polarity it derives, and accepts an override", () => {
        const up = mount(Metric, { props: { value: 42, delta: 3 } });
        expect(up.get(".metric__delta").attributes("data-polarity")).toBe("up");
        expect(up.get(".metric__delta").text()).toBe("3");

        const down = mount(Metric, { props: { value: 42, delta: -3 } });
        expect(down.get(".metric__delta").attributes("data-polarity")).toBe("down");

        // A string delta has no polarity of its own; the author states it.
        const stated = mount(Metric, {
            props: { value: 42, delta: "steady", polarity: "flat" },
        });
        expect(stated.get(".metric__delta").attributes("data-polarity")).toBe("flat");

        // No delta, no node — an absent change is not a zero change.
        expect(mount(Metric, { props: { value: 42 } }).find(".metric__delta").exists()).toBe(
            false,
        );
    });

    // BORN-RED at HEAD. `MetricRow` rendered a whole metric; it now places one.
    it("makes MetricRow a pure layout composer with zero readout of its own", () => {
        const label = "Extraordinarily long checkpoint description";
        const wrapper = mount(MetricRow, {
            slots: {
                default: () =>
                    h(Metric, {
                        posture: "row",
                        context: "Current window",
                        label,
                        value: 12048,
                        unit: "events",
                    }),
            },
        });

        expect(wrapper.element.tagName).toBe("DIV");
        expect(wrapper.attributes("tabindex")).toBeUndefined();
        // It stamps NOTHING of its own — no empty, no loading, no aria-busy: those
        // belong to the readout, and a composer that mirrored them was a second
        // source of truth for the same fact.
        expect(wrapper.attributes("data-empty")).toBeUndefined();
        expect(wrapper.attributes("data-loading")).toBeUndefined();
        expect(wrapper.attributes("aria-busy")).toBeUndefined();
        expect(wrapper.get(".metric__label").text()).toBe(label);
        expect(wrapper.get(".metric__context").text()).toBe("Current window");
        expect(wrapper.get(".metric__value").text()).toBe("12048");
        expect(wrapper.get(".metric").attributes("data-posture")).toBe("row");
    });

    it("makes MetricStack only a density-bearing div grid", () => {
        const wrapper = mount(MetricStack, {
            props: { density: "compact" },
            slots: {
                default: () => [
                    h(MetricRow, null, {
                        default: () => h(Metric, { posture: "row", label: "A", value: 1 }),
                    }),
                    h(MetricRow, null, {
                        default: () => h(Metric, { posture: "row", label: "B", value: 2 }),
                    }),
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
