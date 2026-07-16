import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@glass/components/dialog";

const frames = () => new Promise((resolve) => setTimeout(resolve, 40));

afterEach(() => vi.restoreAllMocks());

describe("Dialog stage ownership", () => {
    it("degrades and restores scene travel when reduced motion changes live", async () => {
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
            components: { Dialog, DialogContent, DialogDescription, DialogTitle },
            template: `
                <main data-stage-wrapper>
                    <Dialog :open="true">
                        <DialogContent stage="immersive">
                            <DialogTitle>Live motion dialog</DialogTitle>
                            <DialogDescription>Reactive stage</DialogDescription>
                        </DialogContent>
                    </Dialog>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await frames();

        const stage = wrapper.get("[data-stage-wrapper]");
        const scrim = () => document.querySelector<HTMLElement>("[data-stage-scrim]")!;
        expect(stage.attributes("data-stage-scale")).toBe("");
        expect(scrim().hasAttribute("data-stage-immersive")).toBe(true);

        reduced = true;
        for (const listener of listeners)
            listener({ matches: true } as MediaQueryListEvent);
        await nextTick();
        await frames();
        expect(stage.attributes("data-stage-scale")).toBeUndefined();
        expect(scrim().hasAttribute("data-stage-immersive")).toBe(false);

        reduced = false;
        for (const listener of listeners)
            listener({ matches: false } as MediaQueryListEvent);
        await nextTick();
        await frames();
        expect(stage.attributes("data-stage-scale")).toBe("");
        expect(scrim().hasAttribute("data-stage-immersive")).toBe(true);

        wrapper.unmount();
        expect(listeners).toHaveLength(0);
    });

    it("keeps nested concurrent wrappers and portaled scrims instance-scoped", async () => {
        const outerOpen = ref(true);
        const innerOpen = ref(true);
        const Harness = defineComponent({
            components: {
                Dialog,
                DialogContent,
                DialogDescription,
                DialogTitle,
            },
            setup: () => ({ innerOpen, outerOpen }),
            template: `
                <main data-stage-wrapper data-stage-owner="outer">
                    <Dialog v-model:open="outerOpen">
                        <DialogContent stage="scale">
                            <DialogTitle>Outer dialog</DialogTitle>
                            <DialogDescription>Outer owner</DialogDescription>
                        </DialogContent>
                    </Dialog>
                    <section data-stage-wrapper data-stage-owner="inner">
                        <Dialog v-model:open="innerOpen">
                            <DialogContent stage="immersive">
                                <DialogTitle>Inner dialog</DialogTitle>
                                <DialogDescription>Inner owner</DialogDescription>
                            </DialogContent>
                        </Dialog>
                    </section>
                </main>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await frames();

        const outer = wrapper.get('[data-stage-owner="outer"]');
        const inner = wrapper.get('[data-stage-owner="inner"]');
        expect(outer.attributes("data-stage-scale")).toBe("");
        expect(inner.attributes("data-stage-scale")).toBe("");

        const scrims = document.querySelectorAll<HTMLElement>("[data-stage-scrim]");
        expect(scrims).toHaveLength(2);
        expect(
            Array.from(scrims).filter((scrim) =>
                scrim.hasAttribute("data-stage-immersive"),
            ),
        ).toHaveLength(1);

        innerOpen.value = false;
        await nextTick();
        expect(outer.attributes("data-stage-scale")).toBe("");
        expect(inner.attributes("data-stage-scale")).toBeUndefined();

        wrapper.unmount();
    });
});
