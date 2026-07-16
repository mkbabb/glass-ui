import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { InstrumentChassis } from "@glass/components/instrument-chassis";

describe("InstrumentChassis housing contract", () => {
    it("is landmark-neutral and omits absent optional regions", () => {
        const wrapper = mount(InstrumentChassis, {
            slots: { stage: "Specimen" },
        });

        expect(wrapper.element.tagName).toBe("DIV");
        expect(wrapper.find("main").exists()).toBe(false);
        expect(wrapper.get(".instrument-stage").text()).toBe("Specimen");
        expect(wrapper.find(".instrument-inspector").exists()).toBe(false);
        expect(wrapper.find(".instrument-action").exists()).toBe(false);
        expect(wrapper.find("[data-boundary]").exists()).toBe(false);
        expect(
            wrapper.get(".instrument-composition").attributes("data-has-inspector"),
        ).toBeUndefined();
    });

    it("emits generic state and a consumer tone without changing anatomy", () => {
        const wrapper = mount(InstrumentChassis, {
            props: { state: "active", tone: "oklch(0.7 0.15 250)" },
            slots: { stage: "Stage" },
        });

        expect(wrapper.attributes("data-state")).toBe("active");
        expect(wrapper.attributes("style")).toContain("--instrument-tone");
        expect(wrapper.find(".instrument-composition").exists()).toBe(true);
    });

    it("owns loading aria without adding a hidden reserve", () => {
        const wrapper = mount(InstrumentChassis, {
            props: { state: "loading" },
            slots: { stage: "Stage" },
        });

        expect(wrapper.attributes("aria-busy")).toBe("true");
        expect(wrapper.attributes("data-reserve")).toBe("none");
    });

    it("keeps stage, inspector, and action in document order", () => {
        const wrapper = mount(InstrumentChassis, {
            slots: {
                stage: "1 Stage",
                inspector: "2 Inspector",
                action: "3 Action",
            },
        });

        expect(wrapper.text()).toBe("1 Stage2 Inspector3 Action");
        expect(
            wrapper.get(".instrument-composition").attributes("data-has-inspector"),
        ).toBe("");
    });

    it("renders only explicitly requested valid boundaries", () => {
        const wrapper = mount(InstrumentChassis, {
            props: {
                boundaries: ["inspector-action", "stage-inspector", "stage-inspector"],
            },
            slots: { stage: "Stage", inspector: "Inspector", action: "Action" },
        });

        expect(wrapper.get(".instrument-composition").attributes("data-boundary")).toBe(
            "",
        );
        expect(wrapper.get(".instrument-action").attributes("data-boundary")).toBe("");
        expect(wrapper.findAll("[data-boundary]")).toHaveLength(2);
    });

    it("does not invent a boundary when its adjacent inspector is absent", () => {
        const wrapper = mount(InstrumentChassis, {
            props: { boundaries: ["stage-inspector", "inspector-action"] },
            slots: { stage: "Stage", action: "Action" },
        });

        expect(wrapper.find("[data-boundary]").exists()).toBe(false);
    });

    it("publishes only the selected explicit reserve", () => {
        for (const reserve of ["none", "stage", "inspector", "both"] as const) {
            const wrapper = mount(InstrumentChassis, {
                props: { reserve },
                slots: { stage: "Stage", inspector: "Inspector" },
            });
            expect(wrapper.attributes("data-reserve")).toBe(reserve);
        }
    });
});
