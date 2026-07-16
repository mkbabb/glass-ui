import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import * as CollapsibleSurface from "@glass/components/collapsible";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@glass/components/collapsible";
import { Button } from "@glass/components/button";

afterEach(() => {
    document.body.innerHTML = "";
});

function mountCollapsible(open = false, disabled = false) {
    return mount(
        {
            components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
            data: () => ({ disabled, open }),
            template: `
      <Collapsible v-model:open="open" :disabled="disabled">
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent force-mount>Disclosure body</CollapsibleContent>
      </Collapsible>
    `,
        },
        { attachTo: document.body },
    );
}

describe("Collapsible product contract", () => {
    it("publishes only the root, trigger, and content owners", () => {
        expect(Object.keys(CollapsibleSurface).sort()).toEqual([
            "Collapsible",
            "CollapsibleContent",
            "CollapsibleTrigger",
        ]);
    });

    it("keeps the trigger and region linked while controlled state changes", async () => {
        const wrapper = mountCollapsible(true);
        const root = wrapper.get('[data-slot="collapsible"]');
        const trigger = wrapper.get('[data-slot="collapsible-trigger"]');
        const content = wrapper.get('[data-slot="collapsible-content"]');

        expect(trigger.attributes("aria-controls")).toBe(content.attributes("id"));
        expect(content.attributes("role")).toBe("region");
        expect(content.attributes("aria-labelledby")).toBe(trigger.attributes("id"));
        expect(trigger.attributes("aria-expanded")).toBe("true");
        expect(root.attributes("data-state")).toBe("open");

        await trigger.trigger("click");
        await nextTick();

        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false);
        expect(trigger.attributes("aria-expanded")).toBe("false");
        expect(root.attributes("data-state")).toBe("closed");
        expect(content.attributes("data-state")).toBe("closed");

        wrapper.unmount();
    });

    it("uses a native button for Enter and Space activation semantics", () => {
        const wrapper = mountCollapsible();
        const trigger = wrapper.get('[data-slot="collapsible-trigger"]');

        expect(trigger.element.tagName).toBe("BUTTON");
        expect(trigger.attributes("type")).toBe("button");
        (trigger.element as HTMLElement).focus();
        expect(document.activeElement).toBe(trigger.element);

        wrapper.unmount();
    });

    it("prevents activation when the disclosure is disabled", async () => {
        const wrapper = mountCollapsible(false, true);
        const trigger = wrapper.get('[data-slot="collapsible-trigger"]');

        expect(trigger.attributes("disabled")).toBeDefined();
        expect(trigger.attributes("data-disabled")).toBe("");
        await trigger.trigger("click");

        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false);
        expect(trigger.attributes("aria-expanded")).toBe("false");

        wrapper.unmount();
    });

    it("pins root, trigger, and region hosts when retired vendor attrs are supplied", () => {
        const wrapper = mount({
            components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
            data: () => ({
                contentAttrs: { as: "section", asChild: true },
                rootAttrs: { as: "article", asChild: true, unmountOnHide: false },
                triggerAttrs: { as: "a" },
            }),
            template: `
        <Collapsible v-bind="rootAttrs" default-open>
          <CollapsibleTrigger v-bind="triggerAttrs">Details</CollapsibleTrigger>
          <CollapsibleContent v-bind="contentAttrs" force-mount>
            <span class="body">Disclosure body</span>
          </CollapsibleContent>
        </Collapsible>
      `,
        });

        const root = wrapper.get('[data-slot="collapsible"]');
        const trigger = wrapper.get('[data-slot="collapsible-trigger"]');
        const content = wrapper.get('[data-slot="collapsible-content"]');

        expect(root.element.tagName).toBe("DIV");
        expect(trigger.element.tagName).toBe("BUTTON");
        expect(content.element.tagName).toBe("DIV");
        expect(content.get(".body").element.parentElement).toBe(content.element);
    });

    it("retains the consumed asChild trigger composition with one real button", () => {
        const wrapper = mount({
            components: { Button, Collapsible, CollapsibleContent, CollapsibleTrigger },
            template: `
        <Collapsible default-open>
          <CollapsibleTrigger as-child>
            <Button emphasis="quiet">Details</Button>
          </CollapsibleTrigger>
          <CollapsibleContent force-mount>Disclosure body</CollapsibleContent>
        </Collapsible>
      `,
        });

        const trigger = wrapper.get('[data-slot="collapsible-trigger"]');
        const content = wrapper.get('[data-slot="collapsible-content"]');

        expect(trigger.element.tagName).toBe("BUTTON");
        expect(wrapper.findAll("button")).toHaveLength(1);
        expect(trigger.attributes("aria-controls")).toBe(content.attributes("id"));
    });
});
