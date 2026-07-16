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
