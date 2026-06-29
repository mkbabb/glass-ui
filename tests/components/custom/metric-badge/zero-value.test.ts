import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { MetricBadge } from "@glass/components/custom/metric-badge/index";
import { MetricPill } from "@glass/components/ui/metric-pill/index";
import { coalesceMetric } from "@glass/utils/coalesceMetric";

// AZ.W-METRIC-UNIFY — the born-RED zero-value regression.
//
// The pre-unify MetricBadge coalesced on truthiness: `amount || placeholder`
// renders `0 || "—"` → "—", `!amount` (`!0` → true) muted the span, and
// `amount ? { color }` stripped the colour. So a VALID `0` metric (0 Mbps,
// 0 ms, 0 errors) silently rendered the em-dash, muted, colourless — a
// data-falsification bug. The unified `coalesceMetric` core kills it: a `0` is
// NOT empty, so it renders "0", un-muted, with its colour.

describe("coalesceMetric — the value core", () => {
    it("renders a valid 0 as '0' (NOT the placeholder), un-empty", () => {
        expect(coalesceMetric(0)).toEqual({ display: "0", isEmpty: false });
        expect(coalesceMetric("0")).toEqual({ display: "0", isEmpty: false });
    });

    it("coalesces only null / undefined / '' to the placeholder", () => {
        expect(coalesceMetric(null)).toEqual({ display: "—", isEmpty: true });
        expect(coalesceMetric(undefined)).toEqual({ display: "—", isEmpty: true });
        expect(coalesceMetric("")).toEqual({ display: "—", isEmpty: true });
    });

    it("honours a custom placeholder for the empty case", () => {
        expect(coalesceMetric(null, "n/a")).toEqual({ display: "n/a", isEmpty: true });
    });
});

describe("MetricBadge — zero-value (the killed bug)", () => {
    it("renders a 0 value as '0', not the em-dash", () => {
        const wrapper = mount(MetricBadge, {
            props: { value: 0, unit: "/min", color: "rgb(255, 0, 0)" },
        });
        const amount = wrapper.get(".metric-badge__amount");
        expect(amount.text()).toBe("0");
        expect(amount.text()).not.toBe("—");
    });

    it("does NOT mute a 0 value (no text-muted-foreground/40)", () => {
        const wrapper = mount(MetricBadge, { props: { value: 0 } });
        const amount = wrapper.get(".metric-badge__amount");
        expect(amount.classes()).not.toContain("text-muted-foreground/40");
    });

    it("applies the color to a 0 value", () => {
        const wrapper = mount(MetricBadge, {
            props: { value: 0, color: "rgb(255, 0, 0)" },
        });
        const amount = wrapper.get(".metric-badge__amount");
        // The inline color style IS applied when a non-empty value carries a color.
        expect(amount.attributes("style") || "").toContain("rgb(255, 0, 0)");
    });

    it("still coalesces a null value to the placeholder, muted, colourless", () => {
        const wrapper = mount(MetricBadge, {
            props: { value: null, color: "rgb(255, 0, 0)" },
        });
        const amount = wrapper.get(".metric-badge__amount");
        expect(amount.text()).toBe("—");
        expect(amount.classes()).toContain("text-muted-foreground/40");
        expect(amount.attributes("style") || "").not.toContain("rgb(255, 0, 0)");
    });

    it("renders the stacked register's 0 value as '0' too", () => {
        const wrapper = mount(MetricBadge, {
            props: { value: 0, labelPosition: "stacked", label: "ERRORS" },
        });
        const amount = wrapper.get(".metric-badge__amount");
        expect(amount.text()).toBe("0");
        expect(amount.classes()).not.toContain("text-muted-foreground/40");
    });
});

describe("MetricPill — zero-value (inherits the fixed core via MetricBadge)", () => {
    it("renders a 0 value as '0', not the em-dash", () => {
        const wrapper = mount(MetricPill, {
            props: { value: 0, unit: "ms", label: "LATENCY" },
        });
        const amount = wrapper.get(".metric-badge__amount");
        expect(amount.text()).toBe("0");
        expect(amount.classes()).not.toContain("text-muted-foreground/40");
    });
});
