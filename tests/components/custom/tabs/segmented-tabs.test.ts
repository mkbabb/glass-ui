import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import SegmentedTabs from "@glass/components/tabs/SegmentedTabs.vue";

// The unified SegmentedTabs replaced BouncyToggle/BouncyTabs/UnderlineTabs +
// ResponsiveTabs. v-model round-trip across the variant axis (segmented default = group/
// aria-pressed; underline = tablist/aria-selected), keyed off the Vue 3.5 defineModel.
const OPTIONS = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];

afterEach(() => vi.restoreAllMocks());

function rect(left: number, top: number, width: number, height: number): DOMRect {
    return {
        x: left,
        y: top,
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        toJSON: () => ({}),
    } as DOMRect;
}

describe("SegmentedTabs v-model (segmented default)", () => {
    it("uses the measured indicator itself as the sole selected fill", () => {
        const wrapper = mount(SegmentedTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        const indicator = wrapper.get(".segmented-indicator");

        expect(indicator.classes()).toEqual(
            expect.arrayContaining(["glass-capsule", "glass-lens"]),
        );
        expect(indicator.element.childElementCount).toBe(0);
        expect(wrapper.find(".segmented-indicator__plate").exists()).toBe(false);
    });

    it.each([
        {
            label: "horizontal LTR",
            orientation: "horizontal" as const,
            dir: "ltr",
            modelValue: "two",
            targetIndex: 1,
            container: rect(10.25, 20.5, 300.75, 40.25),
            target: rect(90.875, 23.5, 72.375, 34.25),
            translate: "80.625px 3px",
        },
        {
            label: "vertical",
            orientation: "vertical" as const,
            dir: "ltr",
            modelValue: "two",
            targetIndex: 1,
            container: rect(10, 20, 120, 180),
            target: rect(14, 70, 83.125, 32.25),
            translate: "4px 50px",
        },
        {
            label: "horizontal RTL",
            orientation: "horizontal" as const,
            dir: "rtl",
            modelValue: "three",
            targetIndex: 2,
            container: rect(100, 20, 240, 40),
            target: rect(104, 24, 72.25, 32),
            translate: "4px 4px",
        },
    ])(
        "measures the exact active button rect in $label",
        async ({
            orientation,
            dir,
            modelValue,
            targetIndex,
            container,
            target,
            translate,
        }) => {
            const wrapper = mount(SegmentedTabs, {
                attrs: { dir },
                props: { options: OPTIONS, modelValue: "one", orientation },
            });
            const group = wrapper.get<HTMLElement>('[role="group"]');
            const buttons = wrapper.findAll<HTMLElement>(".segmented-tab");

            vi.spyOn(group.element, "getBoundingClientRect").mockReturnValue(container);
            vi.spyOn(
                buttons[targetIndex]!.element,
                "getBoundingClientRect",
            ).mockReturnValue(target);

            await wrapper.setProps({ modelValue });
            await nextTick();

            const indicator = wrapper.get(".segmented-indicator");
            const state = (
                wrapper.vm as unknown as {
                    singleSliderStyle: Record<string, string>;
                }
            ).singleSliderStyle;
            expect(state).toMatchObject({
                left: "0px",
                top: "0px",
                width: `${target.width}px`,
                height: `${target.height}px`,
                translate,
                opacity: "1",
            });
            expect(indicator.attributes("style")).toContain("left: 0px");
            expect(indicator.attributes("style")).toContain("top: 0px");
        },
    );

    it("emits update:modelValue when a segment is clicked", async () => {
        const wrapper = mount(SegmentedTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        const btns = wrapper.findAll('[role="group"] button');
        expect(btns.length).toBe(3);
        await btns[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
    });
    it("reflects an external modelValue write in aria-pressed", async () => {
        const wrapper = mount(SegmentedTabs, {
            props: { options: OPTIONS, modelValue: "one", ariaLabel: "Priority" },
        });
        await wrapper.setProps({ modelValue: "three" });
        const group = wrapper.get('[role="group"]');
        expect(group.attributes("aria-label")).toBe("Priority");
        expect(group.attributes("aria-orientation")).toBeUndefined();
        const btns = group.findAll("button");
        expect(btns[2]!.attributes("aria-pressed")).toBe("true");
    });
});

describe("SegmentedTabs variant=underline (panel nav)", () => {
    it("renders a tablist and round-trips aria-selected", async () => {
        const wrapper = mount(SegmentedTabs, {
            props: {
                options: OPTIONS,
                modelValue: "one",
                variant: "underline",
                ariaLabel: "View",
            },
        });
        expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
        const tabs = wrapper.findAll('[role="tab"]');
        expect(tabs.length).toBe(3);
        expect(wrapper.get('[role="tablist"]').attributes("aria-orientation")).toBe(
            "horizontal",
        );
        expect(wrapper.get('[role="tablist"]').attributes("aria-label")).toBe("View");
        await tabs[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
        await wrapper.setProps({ modelValue: "three" });
        expect(tabs[2]!.attributes("aria-selected")).toBe("true");
    });
});

describe("SegmentedTabs semantics=tabs with pill material", () => {
    it("keeps the pill look while exposing tab semantics and roving keyboard behavior", async () => {
        const Harness = defineComponent({
            components: { SegmentedTabs },
            setup() {
                return { options: OPTIONS, value: ref("two") };
            },
            template: `<SegmentedTabs v-model="value" :options="options" variant="pill" semantics="tabs" />`,
        });
        const wrapper = mount(Harness, { attachTo: document.body });
        const tablist = wrapper.get('[role="tablist"]');
        expect(tablist.classes()).toContain("segmented-tabs--pill");
        expect(tablist.attributes("aria-orientation")).toBe("horizontal");

        const tabs = () => wrapper.findAll('[role="tab"]');
        const expectRoving = (active: number) => {
            expect(tabs().map((tab) => tab.attributes("tabindex"))).toEqual(
                OPTIONS.map((_, index) => (index === active ? "0" : "-1")),
            );
            expect(tabs().map((tab) => tab.attributes("aria-selected"))).toEqual(
                OPTIONS.map((_, index) => (index === active ? "true" : "false")),
            );
        };

        expectRoving(1);
        await tablist.trigger("keydown", { key: "ArrowRight" });
        expectRoving(2);
        expect(document.activeElement).toBe(tabs()[2]!.element);

        await tablist.trigger("keydown", { key: "ArrowLeft" });
        expectRoving(1);
        await tablist.trigger("keydown", { key: "Home" });
        expectRoving(0);
        await tablist.trigger("keydown", { key: "End" });
        expectRoving(2);

        wrapper.unmount();
    });

    it("keeps focus separate from selection in manual activation", async () => {
        const options = [OPTIONS[0]!, { ...OPTIONS[1]!, disabled: true }, OPTIONS[2]!];
        const Harness = defineComponent({
            components: { SegmentedTabs },
            setup() {
                return { options, value: ref("one") };
            },
            template: `
                <div dir="rtl">
                    <SegmentedTabs
                        v-model="value"
                        :options="options"
                        semantics="tabs"
                        activation="manual"
                    />
                </div>
            `,
        });
        const wrapper = mount(Harness, { attachTo: document.body });
        const tablist = wrapper.get<HTMLElement>('[role="tablist"]');
        const tabs = () => wrapper.findAll<HTMLElement>('[role="tab"]');
        const indicatorState = () =>
            (
                wrapper.findComponent(SegmentedTabs).vm as unknown as {
                    singleSliderStyle: Record<string, string>;
                }
            ).singleSliderStyle;

        vi.spyOn(tablist.element, "getBoundingClientRect").mockReturnValue(
            rect(0, 0, 300, 40),
        );
        tabs().forEach((tab, index) =>
            vi
                .spyOn(tab.element, "getBoundingClientRect")
                .mockReturnValue(rect(index * 100, 0, 100, 40)),
        );
        (wrapper.vm as unknown as { value: string }).value = "three";
        await nextTick();
        await nextTick();
        (wrapper.vm as unknown as { value: string }).value = "one";
        await nextTick();
        await nextTick();

        const selectedFill = { ...indicatorState() };
        expect(selectedFill.translate).toBe("0px 0px");
        expect(wrapper.get('[dir="rtl"]').attributes("dir")).toBe("rtl");

        await tablist.trigger("keydown", { key: "ArrowRight" });
        expect(document.activeElement).toBe(tabs()[2]!.element);
        expect(tabs().map((tab) => tab.attributes("tabindex"))).toEqual([
            "-1",
            "-1",
            "0",
        ]);
        expect(tabs().map((tab) => tab.attributes("aria-selected"))).toEqual([
            "true",
            "false",
            "false",
        ]);
        expect(indicatorState()).toEqual(selectedFill);

        await tablist.trigger("keydown", { key: "Enter" });
        await nextTick();
        expect(tabs()[2]!.attributes("aria-selected")).toBe("true");
        expect(indicatorState().translate).toBe("200px 0px");

        await tablist.trigger("keydown", { key: "ArrowLeft" });
        expect(document.activeElement).toBe(tabs()[0]!.element);
        expect(tabs()[2]!.attributes("aria-selected")).toBe("true");
        await tablist.trigger("keydown", { key: " " });
        await nextTick();
        expect(tabs()[0]!.attributes("aria-selected")).toBe("true");

        wrapper.unmount();
    });

    it("preserves manual activation on the vertical axis", async () => {
        const Harness = defineComponent({
            components: { SegmentedTabs },
            setup() {
                return { options: OPTIONS, value: ref("one") };
            },
            template: `
                <SegmentedTabs
                    v-model="value"
                    :options="options"
                    semantics="tabs"
                    orientation="vertical"
                    activation="manual"
                />
            `,
        });
        const wrapper = mount(Harness, { attachTo: document.body });
        const tablist = wrapper.get('[role="tablist"]');
        const tabs = () => wrapper.findAll('[role="tab"]');

        expect(tablist.attributes("aria-orientation")).toBe("vertical");
        await tablist.trigger("keydown", { key: "ArrowDown" });
        expect(document.activeElement).toBe(tabs()[1]!.element);
        expect(tabs()[0]!.attributes("aria-selected")).toBe("true");
        expect(tabs()[1]!.attributes("aria-selected")).toBe("false");

        wrapper.unmount();
    });

    it("prevents native Enter/Space clicks and follows visual direction in RTL", async () => {
        const Harness = defineComponent({
            components: { SegmentedTabs },
            setup: () => ({ options: OPTIONS, value: ref("two") }),
            template: `<div dir="rtl"><SegmentedTabs v-model="value" :options="options" semantics="tabs" activation="manual" /></div>`,
        });
        const wrapper = mount(Harness, { attachTo: document.body });
        const tablist = wrapper.get('[role="tablist"]');
        const tabs = () => wrapper.findAll('[role="tab"]');

        await tablist.trigger("keydown", { key: "ArrowRight" });
        expect(document.activeElement).toBe(tabs()[0]!.element);

        const enter = new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
            cancelable: true,
        });
        tabs()[0]!.element.dispatchEvent(enter);
        await nextTick();
        expect(enter.defaultPrevented).toBe(true);
        expect(tabs()[0]!.attributes("aria-selected")).toBe("true");

        const space = new KeyboardEvent("keydown", {
            key: " ",
            bubbles: true,
            cancelable: true,
        });
        tabs()[0]!.element.dispatchEvent(space);
        expect(space.defaultPrevented).toBe(true);
        wrapper.unmount();
    });

    it("keeps one enabled tab stop across controlled and option-list changes", async () => {
        const wrapper = mount(SegmentedTabs, {
            props: {
                options: [{ ...OPTIONS[0]!, disabled: true }, OPTIONS[1]!, OPTIONS[2]!],
                modelValue: "one",
                semantics: "tabs",
                activation: "manual",
            },
        });
        const tabIndexes = () =>
            wrapper.findAll('[role="tab"]').map((tab) => tab.attributes("tabindex"));
        expect(tabIndexes()).toEqual(["-1", "0", "-1"]);

        await wrapper.setProps({ modelValue: "three" });
        expect(tabIndexes()).toEqual(["-1", "-1", "0"]);

        await wrapper.setProps({ options: [OPTIONS[0]!, OPTIONS[1]!] });
        expect(tabIndexes()).toEqual(["0", "-1"]);
    });

    it("projects a responsive desktop fallback through ARIA and roving focus", () => {
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);
        const wrapper = mount(SegmentedTabs, {
            props: {
                options: OPTIONS,
                modelValue: "three",
                semantics: "tabs",
                responsive: {
                    desktopOptions: [{ ...OPTIONS[0]!, disabled: true }, OPTIONS[1]!],
                },
            },
        });
        const tabs = wrapper.findAll('[role="tab"]');
        expect(tabs.map((tab) => tab.attributes("aria-selected"))).toEqual([
            "false",
            "true",
        ]);
        expect(tabs.map((tab) => tab.attributes("tabindex"))).toEqual(["-1", "0"]);
    });
});
