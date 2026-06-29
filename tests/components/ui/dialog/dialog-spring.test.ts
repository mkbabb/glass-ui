// W13 — Dialog spring entrance opt-in.
//
// Validates the surface contract: when `spring` is set, DialogContent emits
// the `data-spring` hook + inline transform/opacity driven by useSpringMount;
// when `spring` is unset, the spring-clocked `.glass-reveal` LIQUID-ENTER path is
// composed (BB.W-LIQUID-REVEAL — off the retired `popover-animate` bezier zoom-95).
// The composable's drag-dismiss + continuity properties are exercised at
// `useSpringMount.test.ts` against the underlying useSpring engine directly.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it } from "vitest";

import { Dialog, DialogContent, DialogTrigger } from "@glass/components/ui/dialog/index";

type SpringValue = boolean | "smooth" | "snappy" | "bouncy" | "gentle";

function mountDialog(spring?: SpringValue) {
    const Host = defineComponent({
        components: { Dialog, DialogContent, DialogTrigger },
        setup() {
            return () =>
                h(Dialog, { open: true }, () => [
                    h(DialogTrigger, () => "open"),
                    h(
                        DialogContent,
                        {
                            ...(spring !== undefined ? { spring } : {}),
                            class: "test-dialog",
                        },
                        () => h("p", "body"),
                    ),
                ]);
        },
    });
    // tests/setup.ts stubs `<teleport>` by default; opt out per-mount so the
    // portaled DialogContent ends up in `document.body` where reka-ui puts it.
    return mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

function findDialog(): HTMLElement | null {
    return document.querySelector(".test-dialog") as HTMLElement | null;
}

describe("DialogContent — W13 spring entrance", () => {
    it("does not emit the data-spring attribute when spring is unset", async () => {
        const wrapper = mountDialog();
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        expect(portal!.getAttribute("data-spring")).toBeNull();
        // The spring-clocked .glass-reveal LIQUID-ENTER recipe is the default path
        // (off the retired bezier popover-animate zoom-95 — BB.W-LIQUID-REVEAL).
        expect(portal!.className).toContain("glass-reveal");
        expect(portal!.className).not.toContain("popover-animate");
        wrapper.unmount();
    });

    it("emits data-spring=\"smooth\" by default when spring=true", async () => {
        const wrapper = mountDialog(true);
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        expect(portal!.getAttribute("data-spring")).toBe("smooth");
        // Spring path SUPPRESSES the default .glass-reveal recipe (the useSpringMount
        // inline transform is the sole entrance source).
        expect(portal!.className).not.toContain("glass-reveal");
        wrapper.unmount();
    });

    it("emits data-spring=\"bouncy\" when spring=\"bouncy\" is passed", async () => {
        const wrapper = mountDialog("bouncy");
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        expect(portal!.getAttribute("data-spring")).toBe("bouncy");
        wrapper.unmount();
    });

    it("writes an inline transform + opacity + animation override under spring", async () => {
        const wrapper = mountDialog(true);
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        // Style is exposed via cssText since happy-dom builds it from the
        // property keys; either getAttribute("style") or el.style.cssText works.
        const styleAttr = portal!.getAttribute("style") ?? portal!.style.cssText;
        expect(styleAttr).toContain("transform");
        expect(styleAttr).toContain("opacity");
        expect(styleAttr).toMatch(/animation/);
        wrapper.unmount();
    });
});
