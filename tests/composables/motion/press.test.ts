import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useLiquidPress } from "@glass/composables/motion";
import { mountComposable } from "../../utils/mountComposable";

describe("useLiquidPress", () => {
    beforeEach(() => vi.useFakeTimers());

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    async function settle(frames = 90): Promise<void> {
        for (let i = 0; i < frames; i++) await vi.advanceTimersByTimeAsync(16);
    }

    it("owns the pointer press and release lifecycle", async () => {
        const mounted = mountComposable(() =>
            useLiquidPress({ response: 0.2, dampingFraction: 1, squish: false }),
        );

        expect(mounted.result.armed.value).toBe(true);
        mounted.result.handlers.onPointerdown();
        await settle();
        expect(mounted.result.value.value).toBeGreaterThan(0.95);
        expect(mounted.result.pressStyle.value.scale).toBeDefined();

        mounted.result.handlers.onPointerup();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);
        expect(mounted.result.pressStyle.value.scale).toBeUndefined();
        mounted.unmount();
    });

    it("handles keyboard activation and releases on blur", async () => {
        const mounted = mountComposable(() =>
            useLiquidPress({ response: 0.2, dampingFraction: 1 }),
        );

        mounted.result.handlers.onKeydown(
            new KeyboardEvent("keydown", { key: "Enter" }),
        );
        await settle();
        expect(mounted.result.value.value).toBeGreaterThan(0.95);

        mounted.result.handlers.onBlur();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);
        mounted.unmount();
    });

    it("releases a held press when disabled", async () => {
        const disabled = ref(false);
        const mounted = mountComposable(() =>
            useLiquidPress({
                response: 0.2,
                dampingFraction: 1,
                disabled,
            }),
        );

        mounted.result.press();
        await settle();
        expect(mounted.result.value.value).toBeGreaterThan(0.95);

        disabled.value = true;
        await nextTick();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);

        mounted.result.press();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);
        mounted.unmount();
    });

    it("re-seats an interrupted release without a value jump", async () => {
        const mounted = mountComposable(() =>
            useLiquidPress({ response: 0.3, dampingFraction: 0.7 }),
        );

        mounted.result.press();
        await vi.advanceTimersByTimeAsync(64);
        mounted.result.release();
        await vi.advanceTimersByTimeAsync(32);
        const beforeReseat = mounted.result.value.value;
        mounted.result.press();
        const afterReseat = mounted.result.value.value;

        expect(afterReseat).toBeCloseTo(beforeReseat, 6);
        await settle(180);
        expect(mounted.result.value.value).toBeGreaterThan(0.95);
        mounted.unmount();
    });

    // B7c C3-5: the cap read at rest. Z0's /sci phone profile put 248 ms of load on
    // `effectiveCap`'s `getComputedStyle` read, once per pressable control after its
    // template ref bound. At rest the stretch is 1 whatever the cap, so no read is owed.
    it("reads no computed style and tracks no element while at rest", async () => {
        const host = ref<HTMLElement | null>(null);
        const spy = vi.spyOn(window, "getComputedStyle");
        const mounted = mountComposable(() =>
            useLiquidPress({ el: host, response: 0.2, dampingFraction: 1 }),
        );

        const restStyle = mounted.result.pressStyle.value;
        expect(restStyle.scale).toBeUndefined();

        // The template ref binds after the first render: the press style must not
        // invalidate (no second render) and must not read the element's style.
        const el = document.createElement("button");
        document.body.appendChild(el);
        host.value = el;
        await nextTick();
        expect(mounted.result.pressStyle.value).toBe(restStyle);
        expect(spy).not.toHaveBeenCalledWith(el);

        // A press still couples the cap to the element's weight, read once as the press
        // begins and never again while the spring moves.
        mounted.result.press();
        await settle(4);
        expect(mounted.result.pressStyle.value.scale).toBeDefined();
        const reads = spy.mock.calls.filter(([target]) => target === el).length;
        expect(reads).toBe(1);
        await settle(8);
        void mounted.result.pressStyle.value;
        expect(spy.mock.calls.filter(([target]) => target === el).length).toBe(reads);

        mounted.unmount();
        el.remove();
    });

    // The `:root` tempo is one shared value within a task: a scene of pressable controls
    // mounting in one task reads it once at most.
    it("reads the root tempo once for a scene of presses", async () => {
        const spy = vi.spyOn(window, "getComputedStyle");
        const rootReads = () =>
            spy.mock.calls.filter(([el]) => el === document.documentElement).length;
        const mounted = Array.from({ length: 12 }, () =>
            mountComposable(() => useLiquidPress({ squish: false })),
        );
        expect(rootReads()).toBeLessThanOrEqual(1);

        // A later scene in the same task: no read.
        await Promise.resolve();
        const before = rootReads();
        const scene = Array.from({ length: 12 }, () =>
            mountComposable(() => useLiquidPress({ squish: false })),
        );
        expect(rootReads()).toBe(before);
        for (const m of scene) m.unmount();
        for (const m of mounted) m.unmount();
    });

    // The staleness path, on a fresh reader. happy-dom holds a MutationObserver's report
    // callback only through a `WeakRef`, so after a garbage collection its observers stop
    // hearing mutations: the same test on happy-dom's observer lost the change about one
    // run in six. The observer here is the platform's contract (records queue on a
    // mutation, `takeRecords` hands them over), so the reader's own logic is what runs.
    it("reads the root tempo again after <html> changes, even in the same task", async () => {
        const pending: MutationRecord[] = [];
        class RecordingObserver {
            observe(target: Node, init: MutationObserverInit): void {
                if (target !== document.documentElement || !init.attributes) return;
                const set = Element.prototype.setAttribute;
                vi.spyOn(document.documentElement, "setAttribute").mockImplementation(function (
                    this: Element,
                    name: string,
                    value: string,
                ) {
                    set.call(this, name, value);
                    pending.push({ type: "attributes", attributeName: name } as MutationRecord);
                });
            }
            takeRecords(): MutationRecord[] {
                return pending.splice(0);
            }
            disconnect(): void {}
        }
        vi.resetModules();
        vi.stubGlobal("MutationObserver", RecordingObserver);
        const { motionTempo } = await import("@glass/composables/motion/core/motionTempo");
        const spy = vi.spyOn(window, "getComputedStyle");
        const rootReads = () =>
            spy.mock.calls.filter(([el]) => el === document.documentElement).length;

        for (let i = 0; i < 12; i++) motionTempo();
        expect(rootReads()).toBe(1);

        document.documentElement.setAttribute("data-tempo-probe", "");
        motionTempo();
        expect(rootReads()).toBe(2);
        motionTempo();
        expect(rootReads()).toBe(2);

        vi.unstubAllGlobals();
        document.documentElement.removeAttribute("data-tempo-probe");
    });

    // The shared value lasts one task. A rule inserted into a sheet, a width query or a
    // stylesheet that loads later change no attribute; the next task reads the cascade.
    it("reads the root tempo again in the next task", async () => {
        vi.resetModules();
        const { motionTempo } = await import("@glass/composables/motion/core/motionTempo");
        const spy = vi.spyOn(window, "getComputedStyle");
        const rootReads = () =>
            spy.mock.calls.filter(([el]) => el === document.documentElement).length;

        for (let i = 0; i < 12; i++) motionTempo();
        expect(rootReads()).toBe(1);
        await vi.advanceTimersByTimeAsync(0);
        for (let i = 0; i < 12; i++) motionTempo();
        expect(rootReads()).toBe(2);
    });
});
