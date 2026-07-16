import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@glass/components/drawer";
import { Button } from "@glass/components/button";
import { DialogTrigger } from "@glass/components/dialog";

const settle = () => new Promise((resolve) => setTimeout(resolve, 80));

describe("Drawer spring lifecycle", () => {
    let priorTempo = "";

    beforeEach(() => {
        priorTempo = document.documentElement.style.getPropertyValue("--motion-tempo");
        document.documentElement.style.setProperty("--motion-tempo", "0.01");
    });

    afterEach(() => {
        vi.restoreAllMocks();
        if (priorTempo)
            document.documentElement.style.setProperty("--motion-tempo", priorTempo);
        else document.documentElement.style.removeProperty("--motion-tempo");
    });

    it("degrades and restores the stage when reduced motion changes live", async () => {
        let reduced = false;
        const listeners = new Set<(event: MediaQueryListEvent) => void>();
        vi.spyOn(window, "matchMedia").mockReturnValue({
            get matches() {
                return reduced;
            },
            addEventListener: (
                _type: string,
                listener: (event: MediaQueryListEvent) => void,
            ) => listeners.add(listener),
            removeEventListener: (
                _type: string,
                listener: (event: MediaQueryListEvent) => void,
            ) => listeners.delete(listener),
        } as unknown as MediaQueryList);

        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
            template: `
                <main data-stage-wrapper>
                    <Drawer :open="true" stage="immersive">
                        <DrawerContent style="--motion-tempo:0.01">
                            <DrawerTitle>Live motion drawer</DrawerTitle>
                            <DrawerDescription>Reactive stage</DrawerDescription>
                        </DrawerContent>
                    </Drawer>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await settle();

        const stage = wrapper.get("[data-stage-wrapper]");
        expect(stage.attributes("data-stage-scale")).toBe("");

        reduced = true;
        for (const listener of listeners)
            listener({ matches: true } as MediaQueryListEvent);
        await nextTick();
        expect(stage.attributes("data-stage-scale")).toBeUndefined();

        reduced = false;
        for (const listener of listeners)
            listener({ matches: false } as MediaQueryListEvent);
        await nextTick();
        expect(stage.attributes("data-stage-scale")).toBe("");

        wrapper.unmount();
        expect(listeners).toHaveLength(0);
    });

    it("retains inert presence through close settle and reverses without remounting", async () => {
        const open = ref(true);
        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
            setup: () => ({ open }),
            template: `
                <main data-stage-wrapper>
                    <Drawer v-model:open="open">
                        <DrawerContent data-motion-drawer style="--motion-tempo:0.01">
                            <DrawerTitle>Motion drawer</DrawerTitle>
                            <DrawerDescription>Lifecycle test</DrawerDescription>
                        </DrawerContent>
                    </Drawer>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await settle();

        const initial = document.querySelector<HTMLElement>("[data-motion-drawer]")!;
        expect(initial).toBeTruthy();
        expect(wrapper.get("[data-stage-wrapper]").attributes("data-stage-scale")).toBe(
            "",
        );

        open.value = false;
        await nextTick();
        const closing = document.querySelector<HTMLElement>("[data-motion-drawer]")!;
        expect(closing).toBe(initial);
        expect(closing.hasAttribute("inert")).toBe(true);

        open.value = true;
        await nextTick();
        expect(document.querySelector("[data-motion-drawer]")).toBe(initial);
        expect(initial.hasAttribute("inert")).toBe(false);

        open.value = false;
        await nextTick();
        expect(document.querySelector("[data-motion-drawer]")).toBe(initial);
        expect(wrapper.get("[data-stage-wrapper]").attributes("data-stage-scale")).toBe(
            "",
        );

        await settle();
        expect(document.querySelector("[data-motion-drawer]")).toBeNull();
        expect(
            wrapper.get("[data-stage-wrapper]").attributes("data-stage-scale"),
        ).toBeUndefined();

        wrapper.unmount();
    });

    it.each(["bottom", "right"] as const)(
        "snaps the %s drawer to both endpoints under reduced motion",
        async (direction) => {
            vi.spyOn(window, "matchMedia").mockReturnValue({
                matches: true,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            } as unknown as MediaQueryList);

            const open = ref(false);
            const Harness = defineComponent({
                components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
                setup: () => ({ direction, open }),
                template: `
                    <main data-stage-wrapper>
                        <Drawer v-model:open="open" :direction="direction" stage="immersive">
                            <DrawerContent data-prm-drawer>
                                <DrawerTitle>Reduced motion drawer</DrawerTitle>
                                <DrawerDescription>Endpoint test</DrawerDescription>
                            </DrawerContent>
                        </Drawer>
                    </main>
                `,
            });
            const wrapper = mount(Harness, {
                attachTo: document.body,
                global: { stubs: { teleport: false } },
            });

            open.value = true;
            await nextTick();
            await nextTick();
            const sheet = document.querySelector<HTMLElement>("[data-prm-drawer]")!;
            expect(sheet.style.getPropertyValue("--glass-drawer-t")).toBe("1");
            expect(sheet.hasAttribute("inert")).toBe(false);

            open.value = false;
            await nextTick();
            const closing = document.querySelector<HTMLElement>("[data-prm-drawer]")!;
            expect(closing.style.getPropertyValue("--glass-drawer-t")).toBe("0");
            expect(closing.hasAttribute("inert")).toBe(true);
            await settle();
            expect(document.querySelector("[data-prm-drawer]")).toBeNull();
            wrapper.unmount();
        },
    );

    it("dismisses a right drawer on Escape, retains inert close presence, and restores trigger focus", async () => {
        const open = ref(false);
        const Harness = defineComponent({
            components: {
                Drawer,
                DrawerContent,
                DrawerDescription,
                DrawerTitle,
                DialogTrigger,
            },
            setup: () => ({ open }),
            template: `
                <main data-stage-wrapper>
                    <Drawer v-model:open="open" direction="right">
                        <DialogTrigger data-drawer-trigger>Open drawer</DialogTrigger>
                        <DrawerContent data-escape-drawer style="--motion-tempo:0.01">
                            <DrawerTitle>Right drawer</DrawerTitle>
                            <DrawerDescription>Escape lifecycle</DrawerDescription>
                            <button data-drawer-action>Action</button>
                        </DrawerContent>
                    </Drawer>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        const trigger = wrapper.get<HTMLElement>("[data-drawer-trigger]");

        await trigger.trigger("click");
        await nextTick();
        await settle();
        const sheet = document.querySelector<HTMLElement>("[data-escape-drawer]")!;
        expect(open.value).toBe(true);
        expect(sheet.contains(document.activeElement)).toBe(true);

        sheet.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
        );
        await nextTick();
        await nextTick();
        expect(open.value).toBe(false);
        expect(document.querySelector("[data-escape-drawer]")).toBe(sheet);
        expect(sheet.hasAttribute("inert")).toBe(true);

        await settle();
        expect(document.querySelector("[data-escape-drawer]")).toBeNull();
        expect(document.activeElement).toBe(trigger.element);
        wrapper.unmount();
    });

    it("keeps focus valid through an as-child live-behind close", async () => {
        const open = ref(false);
        const Harness = defineComponent({
            components: {
                Button,
                Drawer,
                DrawerContent,
                DrawerDescription,
                DrawerTitle,
                DialogTrigger,
            },
            setup: () => ({ open }),
            template: `
                <main data-stage-wrapper>
                    <button data-live-outside>Continue editing</button>
                    <Drawer v-model:open="open" direction="right" mode="live-behind">
                        <DialogTrigger as-child>
                            <Button
                                data-live-trigger
                                :aria-label="open ? 'Close release review' : 'Open release review'"
                            >Review</Button>
                        </DialogTrigger>
                        <DrawerContent
                            :show-overlay="false"
                            data-live-drawer
                            style="--motion-tempo:0.01"
                        >
                            <DrawerTitle>Release review</DrawerTitle>
                            <DrawerDescription>Live-behind lifecycle</DrawerDescription>
                            <button data-live-action>Finish review</button>
                        </DrawerContent>
                    </Drawer>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        const trigger = wrapper.get<HTMLElement>("[data-live-trigger]");
        await trigger.trigger("click");
        await nextTick();

        const sheet = document.querySelector<HTMLElement>("[data-live-drawer]")!;
        expect(open.value).toBe(true);
        expect(sheet.contains(document.activeElement)).toBe(true);

        sheet.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
        );
        await nextTick();
        expect(open.value).toBe(false);
        expect(sheet.hasAttribute("inert")).toBe(true);
        expect(document.activeElement).toBe(trigger.element);

        await settle();
        expect(document.querySelector("[data-live-drawer]")).toBeNull();
        expect(document.activeElement).toBe(trigger.element);

        await trigger.trigger("click");
        await nextTick();
        await settle();
        const outside = wrapper.get<HTMLElement>("[data-live-outside]");
        outside.element.focus();
        outside.element.dispatchEvent(
            new PointerEvent("pointerdown", { bubbles: true }),
        );
        await nextTick();
        await nextTick();
        expect(open.value).toBe(false);
        expect(document.activeElement).toBe(outside.element);

        await settle();
        wrapper.unmount();
    });

    it("dismisses a bottom drawer on outside pointerdown without leaving a hit target", async () => {
        const open = ref(true);
        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
            setup: () => ({ open }),
            template: `
                <main data-stage-wrapper>
                    <button data-drawer-outside>Outside</button>
                    <Drawer v-model:open="open">
                        <DrawerContent data-outside-drawer style="--motion-tempo:0.01">
                            <DrawerTitle>Bottom drawer</DrawerTitle>
                            <DrawerDescription>Outside lifecycle</DrawerDescription>
                        </DrawerContent>
                    </Drawer>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await settle();
        const scrim = document.querySelector<HTMLElement>("[data-stage-scrim]")!;
        expect(scrim.hasAttribute("inert")).toBe(false);

        wrapper
            .get("[data-drawer-outside]")
            .element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
        await nextTick();
        await nextTick();
        const closing = document.querySelector<HTMLElement>("[data-outside-drawer]")!;
        expect(open.value).toBe(false);
        expect(closing.hasAttribute("inert")).toBe(true);
        expect(document.querySelector("[data-stage-scrim]")).toBe(scrim);
        expect(scrim.hasAttribute("inert")).toBe(true);

        await settle();
        expect(document.querySelector("[data-outside-drawer]")).toBeNull();
        expect(document.querySelector("[data-stage-scrim]")).toBeNull();
        wrapper.unmount();
    });

    it("releases only the settling owner across nested concurrent drawers", async () => {
        const outerOpen = ref(true);
        const innerOpen = ref(true);
        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
            setup: () => ({ innerOpen, outerOpen }),
            template: `
                <main data-stage-wrapper data-drawer-owner="outer">
                    <Drawer v-model:open="outerOpen">
                        <DrawerContent data-owner-drawer="outer" style="--motion-tempo:0.01">
                            <DrawerTitle>Outer drawer</DrawerTitle>
                            <DrawerDescription>Outer owner</DrawerDescription>
                        </DrawerContent>
                    </Drawer>
                    <section data-stage-wrapper data-drawer-owner="inner">
                        <Drawer v-model:open="innerOpen" stage="immersive">
                            <DrawerContent data-owner-drawer="inner" style="--motion-tempo:0.01">
                                <DrawerTitle>Inner drawer</DrawerTitle>
                                <DrawerDescription>Inner owner</DrawerDescription>
                            </DrawerContent>
                        </Drawer>
                    </section>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await settle();

        const outer = wrapper.get('[data-drawer-owner="outer"]');
        const inner = wrapper.get('[data-drawer-owner="inner"]');
        expect(outer.attributes("data-stage-scale")).toBe("");
        expect(inner.attributes("data-stage-scale")).toBe("");
        expect(document.querySelectorAll("[data-stage-scrim]")).toHaveLength(2);

        innerOpen.value = false;
        await nextTick();
        expect(outer.attributes("data-stage-scale")).toBe("");
        expect(inner.attributes("data-stage-scale")).toBe("");
        expect(document.querySelector('[data-owner-drawer="inner"]')).toBeTruthy();

        await settle();
        expect(outer.attributes("data-stage-scale")).toBe("");
        expect(inner.attributes("data-stage-scale")).toBeUndefined();
        expect(document.querySelector('[data-owner-drawer="outer"]')).toBeTruthy();
        expect(document.querySelector('[data-owner-drawer="inner"]')).toBeNull();

        wrapper.unmount();
    });
});
