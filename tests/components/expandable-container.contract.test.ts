import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import ExpandableContainer from "@glass/components/expandable-container/ExpandableContainer.vue";

afterEach(() => {
    document.body.innerHTML = "";
    document.body.style.overflow = "";
});

describe("ExpandableContainer", () => {
    it("renders one content subtree in both inline and fullscreen states", async () => {
        const host = document.createElement("div");
        document.body.append(host);
        const StatefulContent = defineComponent({
            props: { fullscreen: Boolean },
            setup(props) {
                return () =>
                    h(
                        "button",
                        { "data-content": "", "data-fullscreen": props.fullscreen },
                        "Content",
                    );
            },
        });

        const wrapper = mount(ExpandableContainer, {
            attachTo: host,
            global: { stubs: { teleport: false } },
            slots: {
                default: ({ fullscreen }: { fullscreen: boolean }) =>
                    h(StatefulContent, { fullscreen }),
            },
        });

        const expand = wrapper.get('[data-mode="expand"]');
        expect(expand.attributes("data-control-target")).toBe("");
        expect(document.querySelectorAll("[data-content]")).toHaveLength(1);
        (expand.element as HTMLElement).focus();
        await expand.trigger("click");
        await nextTick();

        expect(document.querySelectorAll("[data-content]")).toHaveLength(1);
        expect(document.body.querySelector('[data-content]')?.getAttribute("data-fullscreen")).toBe("true");
        expect(document.body.style.overflow).toBe("hidden");
        expect(document.activeElement?.getAttribute("data-mode")).toBe("collapse");
        expect(
            document
                .querySelector('[data-mode="collapse"]')
                ?.getAttribute("data-control-target"),
        ).toBe("");

        document
            .querySelector<HTMLElement>('[data-mode="collapse"]')
            ?.click();
        await nextTick();
        await nextTick();

        expect(document.querySelectorAll("[data-content]")).toHaveLength(1);
        expect(wrapper.get('[data-content]').attributes("data-fullscreen")).toBe("false");
        expect(document.body.style.overflow).toBe("");
        expect(document.activeElement?.getAttribute("data-mode")).toBe("expand");

        wrapper.unmount();
    });

    it("contains focus while fullscreen", async () => {
        const host = document.createElement("div");
        document.body.append(host);
        const outside = document.createElement("button");
        document.body.append(outside);
        const wrapper = mount(ExpandableContainer, {
            attachTo: host,
            global: { stubs: { teleport: false } },
            props: { open: true },
            slots: { default: '<button data-inside="">Inside</button>' },
        });
        await nextTick();
        await nextTick();
        await nextTick();

        outside.focus();

        expect(document.activeElement).not.toBe(outside);
        expect(
            document
                .querySelector<HTMLElement>('[data-state="expanded"]')
                ?.contains(document.activeElement),
        ).toBe(true);

        wrapper.unmount();
    });
});
