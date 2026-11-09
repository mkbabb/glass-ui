import { mount } from "@vue/test-utils";
import { SliderRoot } from "reka-ui";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

import { Slider } from "@glass/components/slider";

/* A drag streams the model once per frame and the hand owns the value from press to
   release; a key step emits at once. reka's own emits are driven through its root, so
   the test reads Slider's contract and not reka's pointer geometry. */

let frames: FrameRequestCallback[] = [];
function runFrame(): void {
    const due = frames;
    frames = [];
    for (const cb of due) cb(performance.now());
}

beforeEach(() => {
    frames = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
        frames.push(cb);
        return frames.length;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {
        frames = [];
    });
});
afterEach(() => vi.unstubAllGlobals());

function mountSlider(value = [50]) {
    return mount(Slider, {
        props: { modelValue: value, "aria-label": "Position" },
        attachTo: document.body,
    });
}

function press(wrapper: ReturnType<typeof mountSlider>): void {
    wrapper.element.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerId: 1 }),
    );
}

describe("Slider drag stream", () => {
    it("emits at most once per frame under a burst, the latest value winning", async () => {
        const wrapper = mountSlider();
        press(wrapper);
        const root = wrapper.findComponent(SliderRoot);
        for (const v of [51, 52, 53, 54]) root.vm.$emit("update:modelValue", [v]);
        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
        runFrame();
        expect(wrapper.emitted("update:modelValue")).toEqual([[[54]]]);
        root.vm.$emit("update:modelValue", [55]);
        root.vm.$emit("update:modelValue", [56]);
        runFrame();
        expect(wrapper.emitted("update:modelValue")).toEqual([[[54]], [[56]]]);
        wrapper.unmount();
    });

    it("delivers the pending value before valueCommit, and release last", async () => {
        const wrapper = mountSlider();
        press(wrapper);
        const root = wrapper.findComponent(SliderRoot);
        root.vm.$emit("update:modelValue", [70]);
        root.vm.$emit("valueCommit", [70]);
        wrapper.element.dispatchEvent(
            new PointerEvent("pointerup", { bubbles: true, button: 0, pointerId: 1 }),
        );
        expect(wrapper.emitted("update:modelValue")).toEqual([[[70]]]);
        expect(wrapper.emitted("valueCommit")).toEqual([[[70]]]);
        expect(wrapper.emitted("grab")).toHaveLength(1);
        expect(wrapper.emitted("release")).toEqual([[[70]]]);
        expect(frames).toHaveLength(0);
        wrapper.unmount();
    });

    it("emits a key step synchronously", () => {
        const wrapper = mountSlider();
        const root = wrapper.findComponent(SliderRoot);
        root.vm.$emit("valueCommit", [51]);
        root.vm.$emit("update:modelValue", [51]);
        expect(wrapper.emitted("update:modelValue")).toEqual([[[51]]]);
        expect(frames).toHaveLength(0);
        wrapper.unmount();
    });
});

describe("Slider hand and model", () => {
    it("holds the pointer's value against a model written during the grab", async () => {
        const wrapper = mountSlider([10]);
        press(wrapper);
        const root = wrapper.findComponent(SliderRoot);
        root.vm.$emit("update:modelValue", [40]);
        await wrapper.setProps({ modelValue: [12] });
        await nextTick();
        expect(root.props("modelValue")).toEqual([40]);
        wrapper.unmount();
    });

    it("follows the model again after the release", async () => {
        const wrapper = mountSlider([10]);
        press(wrapper);
        const root = wrapper.findComponent(SliderRoot);
        root.vm.$emit("update:modelValue", [40]);
        wrapper.element.dispatchEvent(
            new PointerEvent("pointerup", { bubbles: true, button: 0, pointerId: 1 }),
        );
        await wrapper.setProps({ modelValue: [40] });
        await nextTick();
        expect(root.props("modelValue")).toEqual([40]);
        await wrapper.setProps({ modelValue: [41] });
        expect(root.props("modelValue")).toEqual([41]);
        wrapper.unmount();
    });
});
