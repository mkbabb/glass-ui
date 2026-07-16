import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";

import ConfirmDialogStory from "../../demo/stories/feedback/confirm-dialog.vue";
import DialogStory from "../../demo/stories/containers/dialog.vue";
import GatePatternStory from "../../demo/stories/compositions/gate-pattern.vue";

const storyStubs = {
    StoryPage: { template: "<main><slot /></main>" },
    StorySection: { template: "<section><slot /></section>" },
    teleport: false,
};

describe("confirm-flow Dialog composition", () => {
    it("binds every opener to the Dialog root that owns focus restoration", async () => {
        const wrapper = mount(ConfirmDialogStory, {
            attachTo: document.body,
            global: {
                stubs: storyStubs,
            },
        });
        const triggers = wrapper.findAll('button[aria-haspopup="dialog"]');

        expect(triggers.map((trigger) => trigger.text().trim())).toEqual([
            "Delete workspace",
            "Archive thread",
            "Sign out",
        ]);
        expect(triggers.every((trigger) => trigger.attributes("aria-expanded") === "false"))
            .toBe(true);

        const trigger = triggers[0]!;
        await trigger.trigger("click");
        await nextTick();

        expect(trigger.attributes("aria-expanded")).toBe("true");
        expect(
            document
                .getElementById(trigger.attributes("aria-controls")!)
                ?.getAttribute("role"),
        ).toBe("dialog");
        wrapper.unmount();
    });

    it.each([
        ["confirm preset", DialogStory, "Delete"],
        ["gate pattern", GatePatternStory, "Open the modal demo"],
    ])("keeps the %s opener in its owning Dialog root", (_, Story, label) => {
        const wrapper = mount(Story, {
            attachTo: document.body,
            global: { stubs: storyStubs },
        });
        const trigger = wrapper
            .findAll('button[aria-haspopup="dialog"]')
            .find((button) => button.text().trim() === label);

        expect(trigger?.attributes("aria-expanded")).toBe("false");
        wrapper.unmount();
    });
});
