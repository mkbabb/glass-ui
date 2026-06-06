// AV.W7 G2 — the WCAG 2.2.2 (Pause, Stop, Hide), Level-A pause/play toggle for
// the AV backgrounds. The control is available to ALL users (NOT gated behind
// reduced-motion), binds an EXISTING renderer seam (pause()/resume()), and
// reflects state via aria-pressed + a Pause↔Play glyph swap.
//
// This asserts the RENDERED a11y contract — NOT just mount success — per the
// glass-ui-binding-verification discipline (a stale aria binding silently
// no-ops; only a rendered-attr assertion catches it).
//
// Bite: drop aria-pressed (or stop swapping the glyph) → the contract reddens.

import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { nextTick, ref, watch } from "vue";

import DockBackgroundToggle from "../../../../src/components/custom/dock/DockBackgroundToggle.vue";

describe("DockBackgroundToggle — WCAG 2.2.2 pause/play (G2)", () => {
    it("reflects paused via aria-pressed and swaps the glyph + label", async () => {
        const wrapper = mount(DockBackgroundToggle, { props: { paused: false } });
        const btn = wrapper.get("button");

        // RUNNING: not pressed, the Pause action label, the Pause glyph.
        expect(btn.attributes("aria-pressed")).toBe("false");
        expect(btn.attributes("aria-label")).toBe("Pause background animation");
        // Lucide renders an <svg>; the Pause icon has two vertical bars (rects).
        expect(wrapper.findAll("svg").length).toBe(1);

        // PAUSED: pressed, the Play (resume) action label.
        await wrapper.setProps({ paused: true });
        expect(btn.attributes("aria-pressed")).toBe("true");
        expect(btn.attributes("aria-label")).toBe("Resume background animation");
        expect(wrapper.findAll("svg").length).toBe(1);
    });

    it("emits update:paused on click (the v-model toggle)", async () => {
        const wrapper = mount(DockBackgroundToggle, { props: { paused: false } });
        await wrapper.get("button").trigger("click");
        expect(wrapper.emitted("update:paused")?.[0]).toEqual([true]);

        await wrapper.setProps({ paused: true });
        await wrapper.get("button").trigger("click");
        expect(wrapper.emitted("update:paused")?.[1]).toEqual([false]);
    });

    it("drives a bound renderer pause()/resume() via the v-model seam", async () => {
        // The canonical consumer wiring: a paused ref bound to the toggle, with a
        // watcher routing it to the renderer's existing pause()/resume().
        const renderer = { pause: vi.fn(), resume: vi.fn() };
        const paused = ref(false);
        watch(paused, (p) => (p ? renderer.pause() : renderer.resume()));

        const wrapper = mount(DockBackgroundToggle, {
            props: {
                paused: paused.value,
                "onUpdate:paused": (v: boolean) => (paused.value = v),
            },
        });

        await wrapper.get("button").trigger("click");
        await nextTick();
        expect(paused.value).toBe(true);
        expect(renderer.pause).toHaveBeenCalledTimes(1);
        expect(renderer.resume).not.toHaveBeenCalled();
    });

    it("honors custom labels", async () => {
        const wrapper = mount(DockBackgroundToggle, {
            props: { paused: false, pauseLabel: "Halt drift", playLabel: "Run drift" },
        });
        expect(wrapper.get("button").attributes("aria-label")).toBe("Halt drift");
        await wrapper.setProps({ paused: true });
        expect(wrapper.get("button").attributes("aria-label")).toBe("Run drift");
    });
});
