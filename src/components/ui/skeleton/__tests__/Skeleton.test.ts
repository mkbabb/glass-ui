import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Skeleton } from "../index";

describe("Skeleton", () => {
    it("renders with the pulse variant by default (animate-pulse class)", () => {
        const wrapper = mount(Skeleton);
        expect(wrapper.classes()).toContain("animate-pulse");
        expect(wrapper.classes()).not.toContain("skeleton-shimmer");
        expect(wrapper.classes()).not.toContain("skeleton-breath");
    });

    it("renders the shimmer class on variant=\"shimmer\"", () => {
        const wrapper = mount(Skeleton, { props: { variant: "shimmer" } });
        expect(wrapper.classes()).toContain("skeleton-shimmer");
        expect(wrapper.classes()).not.toContain("animate-pulse");
        expect(wrapper.classes()).not.toContain("skeleton-breath");
    });

    // AI.W4-M.3 — the breath variant is the known-imminent loading
    // register, distinct from pulse (short-wait) and shimmer (sliding
    // gradient). The class binding is the contract.
    it("renders the breath class on variant=\"breath\"", () => {
        const wrapper = mount(Skeleton, { props: { variant: "breath" } });
        expect(wrapper.classes()).toContain("skeleton-breath");
        expect(wrapper.classes()).not.toContain("animate-pulse");
        expect(wrapper.classes()).not.toContain("skeleton-shimmer");
    });

    it("merges consumer class with the variant class", () => {
        const wrapper = mount(Skeleton, {
            props: { variant: "breath", class: "h-12 w-32" },
        });
        expect(wrapper.classes()).toContain("skeleton-breath");
        expect(wrapper.classes()).toContain("h-12");
        expect(wrapper.classes()).toContain("w-32");
    });

    it("keeps the bg-muted + rounded-input base classes for all variants", () => {
        for (const variant of ["pulse", "shimmer", "breath"] as const) {
            const wrapper = mount(Skeleton, { props: { variant } });
            expect(wrapper.classes()).toContain("bg-muted");
            expect(wrapper.classes()).toContain("rounded-input");
        }
    });
});
