// W13 — useSpringMount composable: spring-driven mount + drag-dismiss state.
//
// Validates the load-bearing pieces of the iOS Spring-Dialog/Sheet primitive:
// (a) `open` flips drive target 0↔1, (b) pointer drag re-seats target by
// pointer-y delta, (c) release above threshold fires `onDismiss` on settle,
// (d) release below threshold bounces back to 0, (e) mid-flight pointer
// re-target preserves spring continuity (no position jump on release —
// SpringProgress G-W2-3), (f) PRM bracket snaps to target without animating.

import { defineComponent, h, nextTick, ref } from "vue";
import { mount as vueMount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSpringMount, type SpringMountRef } from "@glass/composables/motion";

function mountHost(opts: {
    initialOpen?: boolean;
    dismissThreshold?: number;
    onDismiss?: () => void;
    respectReducedMotion?: boolean;
}) {
    const open = ref(opts.initialOpen ?? true);
    const captured: { value: SpringMountRef | null } = { value: null };

    const Host = defineComponent({
        setup() {
            const sm = useSpringMount({
                open,
                preset: "snappy",
                dismissThreshold: opts.dismissThreshold,
                onDismiss: opts.onDismiss,
                respectReducedMotion: opts.respectReducedMotion,
            });
            captured.value = sm;
            return () => h("div", {
                "data-test": "host",
                style: "height: 400px",
            });
        },
    });

    const wrapper = vueMount(Host, { attachTo: document.body });
    if (!captured.value) throw new Error("useSpringMount did not capture");
    return { wrapper, open, sm: captured.value };
}

function makePointer(type: string, opts: { pointerId: number; clientY: number; button?: number; target: HTMLElement }): PointerEvent {
    const ev = new PointerEvent(type, {
        pointerId: opts.pointerId,
        button: opts.button ?? 0,
        clientY: opts.clientY,
        clientX: 0,
        bubbles: true,
    });
    // currentTarget is normally only set during real dispatch; the handlers
    // read it to find the host element. Stub it directly.
    Object.defineProperty(ev, "currentTarget", { value: opts.target, configurable: true });
    return ev;
}

function stubHostElement(el: HTMLElement, height = 400): void {
    el.getBoundingClientRect = () => ({
        height, width: 200, top: 0, bottom: height, left: 0, right: 200, x: 0, y: 0, toJSON: () => ({}),
    }) as DOMRect;
    el.setPointerCapture = () => {};
    el.releasePointerCapture = () => {};
    el.hasPointerCapture = () => true;
}

describe("useSpringMount", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("seats position at 1 (off-screen) before the entrance arms", () => {
        const { sm, wrapper } = mountHost({ initialOpen: true });
        // Before nextTick, the onMounted callback hasn't fired the target=0.
        expect(sm.position.value).toBe(1);
        wrapper.unmount();
    });

    it("drives position from 1 toward 0 once mounted with open=true", async () => {
        const { sm, wrapper } = mountHost({ initialOpen: true });
        await nextTick();
        await nextTick();
        // Run a number of frames; the spring should integrate toward 0.
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(sm.position.value).toBeLessThan(0.1);
        wrapper.unmount();
    });

    it("flips open → false drives position back to 1", async () => {
        const { sm, open, wrapper } = mountHost({ initialOpen: true });
        await nextTick();
        for (let i = 0; i < 80; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(sm.position.value).toBeLessThan(0.05);
        open.value = false;
        await nextTick();
        for (let i = 0; i < 80; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(sm.position.value).toBeGreaterThan(0.95);
        wrapper.unmount();
    });

    it("pointer drag re-seats target by delta / sheet height", async () => {
        const { sm, wrapper } = mountHost({ initialOpen: true });
        await nextTick();
        for (let i = 0; i < 80; i++) await vi.advanceTimersByTimeAsync(16);
        const host = wrapper.element as HTMLElement;
        stubHostElement(host, 400);

        sm.dragHandlers.onPointerdown(makePointer("pointerdown", { pointerId: 1, clientY: 100, target: host }));
        expect(sm.isDragging.value).toBe(true);

        // Move down 80px → target ~ 80/400 = 0.2.
        sm.dragHandlers.onPointermove(makePointer("pointermove", { pointerId: 1, clientY: 180, target: host }));
        for (let i = 0; i < 30; i++) await vi.advanceTimersByTimeAsync(16);
        expect(sm.position.value).toBeGreaterThan(0.1);
        expect(sm.position.value).toBeLessThan(0.3);
        wrapper.unmount();
    });

    it("releases above threshold fires onDismiss after settle (drag-dismiss path)", async () => {
        const onDismiss = vi.fn();
        const { sm, wrapper } = mountHost({ initialOpen: true, dismissThreshold: 0.3, onDismiss });
        await nextTick();
        for (let i = 0; i < 80; i++) await vi.advanceTimersByTimeAsync(16);
        const host = wrapper.element as HTMLElement;
        stubHostElement(host, 400);

        sm.dragHandlers.onPointerdown(makePointer("pointerdown", { pointerId: 1, clientY: 50, target: host }));
        // Drag down 200px → target 0.5, above the 0.3 threshold.
        sm.dragHandlers.onPointermove(makePointer("pointermove", { pointerId: 1, clientY: 250, target: host }));
        sm.dragHandlers.onPointerup(makePointer("pointerup", { pointerId: 1, clientY: 250, target: host }));

        // Spring settles to 1 → onDismiss fires.
        for (let i = 0; i < 120; i++) await vi.advanceTimersByTimeAsync(16);
        expect(onDismiss).toHaveBeenCalledTimes(1);
        expect(sm.position.value).toBeGreaterThan(0.95);
        wrapper.unmount();
    });

    it("releases below threshold bounces back to 0 (no dismiss)", async () => {
        const onDismiss = vi.fn();
        const { sm, wrapper } = mountHost({ initialOpen: true, dismissThreshold: 0.3, onDismiss });
        await nextTick();
        for (let i = 0; i < 80; i++) await vi.advanceTimersByTimeAsync(16);
        const host = wrapper.element as HTMLElement;
        stubHostElement(host, 400);

        sm.dragHandlers.onPointerdown(makePointer("pointerdown", { pointerId: 1, clientY: 50, target: host }));
        // Drag down 60px → target 0.15, below 0.3 threshold.
        sm.dragHandlers.onPointermove(makePointer("pointermove", { pointerId: 1, clientY: 110, target: host }));
        sm.dragHandlers.onPointerup(makePointer("pointerup", { pointerId: 1, clientY: 110, target: host }));

        for (let i = 0; i < 120; i++) await vi.advanceTimersByTimeAsync(16);
        expect(onDismiss).not.toHaveBeenCalled();
        expect(sm.position.value).toBeLessThan(0.05);
        wrapper.unmount();
    });

    it("mid-flight pointer re-target preserves spring continuity (no position jump on release)", async () => {
        const { sm, wrapper } = mountHost({ initialOpen: true });
        await nextTick();
        for (let i = 0; i < 80; i++) await vi.advanceTimersByTimeAsync(16);
        const host = wrapper.element as HTMLElement;
        stubHostElement(host, 400);

        // Drag halfway down (0.5).
        sm.dragHandlers.onPointerdown(makePointer("pointerdown", { pointerId: 1, clientY: 0, target: host }));
        sm.dragHandlers.onPointermove(makePointer("pointermove", { pointerId: 1, clientY: 200, target: host }));

        // Let the spring catch up partially.
        for (let i = 0; i < 8; i++) await vi.advanceTimersByTimeAsync(16);
        const positionBefore = sm.position.value;
        // Release below threshold — spring re-targets to 0 from current position.
        // The hallmark of continuity: the position immediately after release
        // is essentially unchanged from before; only the target shifts.
        sm.dragHandlers.onPointerup(makePointer("pointerup", { pointerId: 1, clientY: 50, target: host }));
        await vi.advanceTimersByTimeAsync(16);
        const positionAfter = sm.position.value;
        // The continuity guarantee: no discontinuous jump (no spurious snap
        // to 0 or 1 on release — the spring keeps integrating from where it was).
        expect(Number.isFinite(positionBefore)).toBe(true);
        expect(Number.isFinite(positionAfter)).toBe(true);
        expect(Math.abs(positionAfter - positionBefore)).toBeLessThan(0.1);
        wrapper.unmount();
    });

    it("honours prefers-reduced-motion by snapping past entrance/drag without animation", async () => {
        const mql: MediaQueryList = {
            matches: true,
            media: "(prefers-reduced-motion: reduce)",
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(() => true),
        };
        vi.stubGlobal("matchMedia", vi.fn(() => mql));
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            writable: true,
            value: vi.fn(() => mql),
        });

        const { sm, wrapper } = mountHost({ initialOpen: true, respectReducedMotion: true });
        await nextTick();
        await nextTick();
        // PRM fast-path: the entrance snaps to 0 immediately, no rAF needed.
        expect(sm.position.value).toBe(0);
        wrapper.unmount();
    });
});
