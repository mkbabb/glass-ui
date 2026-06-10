import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { MetricBadge } from "../../../../src/components/custom/metric-badge/index";

// D6.b — `MetricBadge variant="record"`: the GILT pill, the single superlative
// figure (the all-time-high / peak). The CSS recipe (the 1px `--gold-rim` edge +
// `--gold-ink` amount + the faint ≤8% gold wash) is locked by the cascade in
// utilities.css; this mount test locks the RENDER half — that the `record`
// variant emits the `metric-badge--record` modifier class + the `data-variant`
// hook the scoped CSS keys on, while `default` stays bare (the gold is OPT-IN,
// never the resting register).
describe("MetricBadge — variant=record (the gilt pill, D6.b)", () => {
    it("defaults to the bare glass pill (no gold modifier)", () => {
        const wrapper = mount(MetricBadge, {
            props: { amount: "1,204", unit: "Mbps" },
        });
        expect(wrapper.classes()).toContain("metric-badge");
        expect(wrapper.classes()).not.toContain("metric-badge--record");
        expect(wrapper.attributes("data-variant")).toBe("default");
        wrapper.unmount();
    });

    it("emits the metric-badge--record modifier + data-variant under variant=record", () => {
        const wrapper = mount(MetricBadge, {
            props: { amount: "9,999", unit: "Mbps", variant: "record" },
        });
        // The base pill class is preserved (the modifier composes ON it).
        expect(wrapper.classes()).toContain("metric-badge");
        // The gilt modifier the scoped CSS keys on.
        expect(wrapper.classes()).toContain("metric-badge--record");
        // The attribute hook (mirrors data-size — for attribute-keyed CSS).
        expect(wrapper.attributes("data-variant")).toBe("record");
        wrapper.unmount();
    });

    it("renders the amount in the `metric-badge__amount` slot the gold ink targets", () => {
        // The CSS scopes `--gold-ink` to `.metric-badge--record .metric-badge__amount`.
        // Lock that the amount slot carries that classname so the ink lands on the
        // figure (not the unit/label — the gold is on the numeral, not the furniture).
        const wrapper = mount(MetricBadge, {
            props: { amount: "320", unit: "Mbps", variant: "record" },
        });
        const amount = wrapper.find(".metric-badge__amount");
        expect(amount.exists()).toBe(true);
        expect(amount.text()).toBe("320");
        wrapper.unmount();
    });

    it("does not force an inline color (the CSS gold ink wins when no color prop)", () => {
        // Without an explicit `color` prop, the amount carries no inline `color:`
        // style, so the `.metric-badge--record .metric-badge__amount` gold-ink rule
        // resolves. An explicit `color` prop would (correctly) override it.
        const wrapper = mount(MetricBadge, {
            props: { amount: "42", variant: "record" },
        });
        const style = wrapper.find(".metric-badge__amount").attributes("style");
        expect(style ?? "").not.toMatch(/color\s*:/);
        wrapper.unmount();
    });
});
