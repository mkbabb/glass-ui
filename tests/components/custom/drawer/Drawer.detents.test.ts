import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { describe, expect, it } from "vitest";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@glass/components/drawer";

async function mountDrawer(rootProps = "", contentProps = "") {
    const Harness = defineComponent({
        components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
        template: `
            <Drawer :open="true" ${rootProps}>
                <DrawerContent ${contentProps} data-detent-test>
                    <DrawerTitle>Test drawer</DrawerTitle>
                    <DrawerDescription>Adjust the drawer position.</DrawerDescription>
                </DrawerContent>
            </Drawer>
        `,
    });
    const wrapper = mount(Harness, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
    await nextTick();
    await nextTick();
    return wrapper;
}

describe("Drawer detent semantics", () => {
    it("keeps an ordinary modal drawer content-sized with no implicit handle", async () => {
        const wrapper = await mountDrawer();
        const sheet = document.querySelector<HTMLElement>("[data-detent-test]")!;

        expect(sheet.dataset.glassDrawerSnapPoints).toBeUndefined();
        expect(sheet.querySelector("[data-glass-drawer-handle]")).toBeNull();

        wrapper.unmount();
    });

    it("retains the declared live-behind default ladder", async () => {
        const wrapper = await mountDrawer(
            'mode="live-behind"',
            ':show-overlay="false"',
        );
        const sheet = document.querySelector<HTMLElement>("[data-detent-test]")!;
        const handle = sheet.querySelector<HTMLElement>("[data-glass-drawer-handle]")!;

        expect(sheet.dataset.glassDrawerSnapPoints).toBe("true");
        expect(handle.getAttribute("role")).toBe("slider");
        expect(handle.getAttribute("aria-label")).toBe("Drawer position");
        expect(handle.getAttribute("aria-valuemin")).toBe("0.12");
        expect(handle.getAttribute("aria-valuemax")).toBe("1");
        expect(handle.getAttribute("aria-valuenow")).toBe("1");
        expect(handle.getAttribute("aria-valuetext")).toBe("100%, position 3 of 3");

        wrapper.unmount();
    });

    it("steps the active detent through the slider keyboard contract", async () => {
        const wrapper = await mountDrawer(
            ':active-snap-point="0.4" :snap-points="[0.25, 0.4, 0.7, 1]"',
        );
        const drawer = wrapper.findComponent(Drawer);
        const handle = document.querySelector<HTMLElement>("[data-glass-drawer-handle]")!;

        handle.focus();
        expect(document.activeElement).toBe(handle);
        expect(handle.getAttribute("aria-valuenow")).toBe("0.4");
        expect(handle.getAttribute("aria-valuetext")).toBe("40%, position 2 of 4");

        handle.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
        await nextTick();
        expect(handle.getAttribute("aria-valuenow")).toBe("0.7");

        handle.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
        await nextTick();
        expect(handle.getAttribute("aria-valuenow")).toBe("0.25");

        handle.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
        await nextTick();
        expect(handle.getAttribute("aria-valuenow")).toBe("1");
        expect(drawer.emitted("update:activeSnapPoint")?.at(-1)).toEqual([1]);

        wrapper.unmount();
    });

    it("starts an interrupted drag from the painted fraction", async () => {
        const wrapper = await mountDrawer(':snap-points="[0.25, 1]"');
        const sheet = document.querySelector<HTMLElement>("[data-detent-test]")!;
        const handle = sheet.querySelector<HTMLElement>("[data-glass-drawer-handle]")!;
        sheet.style.setProperty("--glass-drawer-t", "0.4");

        handle.dispatchEvent(
            new PointerEvent("pointerdown", {
                bubbles: true,
                clientY: 100,
                pointerId: 1,
            }),
        );
        handle.dispatchEvent(
            new PointerEvent("pointermove", {
                bubbles: true,
                clientY: 100,
                pointerId: 1,
            }),
        );

        expect(sheet.style.getPropertyValue("--glass-drawer-t")).toBe("0.4");
        wrapper.unmount();
    });
});
