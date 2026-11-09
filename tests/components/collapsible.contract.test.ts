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

    // An uncontrolled disclosure. `open?: boolean` with no own `default` key compiles to
    // `{ type: Boolean }`, and Vue casts an ABSENT Boolean prop to `false`; bound onto
    // `CollapsibleRoot` that reads controlled-and-shut, so `default-open` never paints.
    it("honours default-open when the controlled prop is absent", async () => {
        const wrapper = mount({
            components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
            template: `
        <Collapsible default-open>
          <CollapsibleTrigger>Details</CollapsibleTrigger>
          <CollapsibleContent force-mount>Disclosure body</CollapsibleContent>
        </Collapsible>
      `,
        });

        const root = wrapper.get('[data-slot="collapsible"]');
        const trigger = wrapper.get('[data-slot="collapsible-trigger"]');
        const content = wrapper.get('[data-slot="collapsible-content"]');
        await nextTick();

        expect(root.attributes("data-state")).toBe("open");
        expect(trigger.attributes("aria-expanded")).toBe("true");
        // A region that loads open carries no `data-state` until its first frame, so the
        // page never animates what it loads open; its ABSENCE is the open assertion here.
        expect(content.attributes("data-state")).toBeUndefined();

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
        // The content sits in the region's one clip, the row the height engine sizes.
        const clip = content.get(".body").element.parentElement;
        expect(clip?.classList.contains("disclosure-content-clip")).toBe(true);
        expect(clip?.parentElement).toBe(content.element);
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

describe("Collapsible height engine", () => {
    it("keeps the region mounted through its close and unmounts it when the row has closed", async () => {
        const wrapper = mount(
            {
                components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
                data: () => ({ open: false }),
                template: `
          <Collapsible v-model:open="open">
            <CollapsibleTrigger>Details</CollapsibleTrigger>
            <CollapsibleContent><span class="body">Body</span></CollapsibleContent>
          </Collapsible>
        `,
            },
            { attachTo: document.body },
        );
        const content = wrapper.get('[data-slot="collapsible-content"]');
        expect(content.attributes("hidden")).toBeDefined();
        expect(content.find(".body").exists()).toBe(false);

        (wrapper.vm as unknown as { open: boolean }).open = true;
        await nextTick();
        expect(content.attributes("hidden")).toBeUndefined();
        expect(content.attributes("data-state")).toBe("open");
        expect(content.attributes("inert")).toBeUndefined();
        expect(content.find(".body").exists()).toBe(true);

        (wrapper.vm as unknown as { open: boolean }).open = false;
        await nextTick();
        // Closing: still painted, inert, waiting for its row to reach zero.
        expect(content.attributes("data-state")).toBe("closed");
        expect(content.attributes("inert")).toBeDefined();
        expect(content.find(".body").exists()).toBe(true);

        const end = new Event("transitionend") as TransitionEvent;
        Object.defineProperty(end, "propertyName", { value: "grid-template-rows" });
        content.element.dispatchEvent(end);
        await nextTick();
        expect(content.attributes("hidden")).toBeDefined();
        expect(content.find(".body").exists()).toBe(false);
        wrapper.unmount();
    });
});
