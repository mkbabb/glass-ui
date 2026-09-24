import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Configurator } from "@glass/components/configurator";

describe("Configurator material regions", () => {
    it("keeps gallery, live stage, and inspector as sibling regions", async () => {
        const wrapper = mount(Configurator, {
            props: {
                activePreset: "dawn",
                presets: [{ key: "dawn", label: "Dawn", config: {} }],
            },
            slots: {
                stage: '<canvas data-stage="true" />',
                controls: '<button type="button">Energy</button>',
            },
        });

        const root = wrapper.get('[data-slot="configurator"]');
        expect(
            Array.from(root.element.children).map((child) => child.className),
        ).toEqual([
            expect.stringContaining("configurator-presets"),
            expect.stringContaining("configurator-stage"),
            expect.stringContaining("configurator-aside"),
        ]);
        expect(
            root.get('[data-stage="true"]').element.closest(".configurator-stage"),
        ).toBe(root.get(".configurator-stage").element);

        const preset = root.get<HTMLButtonElement>("[data-preset-tile]");
        expect(preset.classes()).toEqual(
            expect.arrayContaining([
                "glass-capsule",
                "glass-capsule-hover",
                "is-active",
            ]),
        );
        expect(preset.attributes("aria-pressed")).toBe("true");

        await preset.trigger("click");
        expect(wrapper.emitted("select-preset")).toEqual([["dawn"]]);
    });
});

// O-75: `layout="detached"` paints no shell plate; each region is its own card.
describe("Configurator detached layout", () => {
    const mountStudio = (layout?: "attached" | "detached") =>
        mount(Configurator, {
            props: {
                ...(layout ? { layout } : {}),
                presets: [{ key: "dawn", label: "Dawn", config: {} }],
            },
            slots: { stage: "<canvas />", controls: "<p>controls</p>" },
        });
    const REGIONS = [".configurator-presets", ".configurator-stage", ".configurator-aside"];

    it("attached (default): one shell plate, no per-region surface", () => {
        const wrapper = mountStudio();
        const shell = wrapper.get(".configurator-shell");
        expect(shell.classes()).toEqual(
            expect.arrayContaining(["glass-floating", "rounded-panel", "border"]),
        );
        expect(wrapper.get('[data-slot="configurator"]').attributes("data-layout")).toBe(
            "attached",
        );
        for (const r of REGIONS) {
            expect(wrapper.get(r).classes()).not.toContain("glass-floating");
        }
        expect(shell.attributes("style")).toContain("--radius-ctx: var(--radius-panel)");
    });

    it("detached: no shell plate, border or cast; every region is its own card", () => {
        const wrapper = mountStudio("detached");
        const shell = wrapper.get(".configurator-shell");
        for (const c of ["glass-floating", "rounded-panel", "border", "overflow-hidden"]) {
            expect(shell.classes()).not.toContain(c);
        }
        expect(wrapper.get('[data-slot="configurator"]').attributes("data-layout")).toBe(
            "detached",
        );
        for (const r of REGIONS) {
            expect(wrapper.get(r).classes()).toEqual(
                expect.arrayContaining(["glass-floating", "rounded-card", "border"]),
            );
        }
        // Layers inside the aside card derive their corner from the card, not the panel.
        expect(shell.attributes("style")).toContain("--radius-ctx: var(--radius-card)");
    });
});
