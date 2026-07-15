import { afterEach, describe, expect, it, vi } from "vitest";

import { createCanvasVisibility } from "@glass/composables/glass/webgl/visibility";

afterEach(() => vi.unstubAllGlobals());

function setup(revealBloom = false) {
    let nextRaf = 0;
    let disposed = false;
    const callbacks = new Map<number, FrameRequestCallback>();
    const cancel = vi.fn((id: number) => callbacks.delete(id));
    const removeEventListener = vi.fn();

    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
        callbacks.set(++nextRaf, cb);
        return nextRaf;
    });
    vi.stubGlobal("cancelAnimationFrame", cancel);
    vi.stubGlobal("IntersectionObserver", undefined);
    vi.stubGlobal("ResizeObserver", undefined);
    vi.stubGlobal("document", {
        hidden: false,
        addEventListener: vi.fn(),
        removeEventListener,
    });

    const visibility = createCanvasVisibility({
        canvas: {
            parentElement: null,
            setAttribute: vi.fn(),
        } as unknown as HTMLCanvasElement,
        suspend: vi.fn(),
        resume: vi.fn(),
        resize: vi.fn(),
        wake: vi.fn(),
        isArmed: () => true,
        hasHooks: () => true,
        isDisposed: () => disposed,
        isReducedMotion: () => false,
        composeIntersectionPark: false,
        revealBloom,
    });

    return {
        callbacks,
        cancel,
        removeEventListener,
        visibility,
        dispose: () => {
            disposed = true;
            visibility.dispose();
        },
    };
}

describe("createCanvasVisibility resource ownership", () => {
    it("cancels pending settle and fallback-reveal frames on dispose", () => {
        const { callbacks, cancel, dispose, removeEventListener, visibility } =
            setup(true);

        visibility.presize();
        visibility.armRevealBloom();
        expect(callbacks.size).toBe(2);

        dispose();

        expect(cancel.mock.calls.map(([id]) => id)).toEqual([1, 2]);
        expect(callbacks.size).toBe(0);
        expect(removeEventListener).toHaveBeenCalledWith(
            "visibilitychange",
            expect.any(Function),
        );
    });

    it("cancels the second settle frame after the first has run", () => {
        const { callbacks, cancel, dispose, visibility } = setup();

        visibility.presize();
        const first = callbacks.get(1)!;
        callbacks.delete(1);
        first(0);
        expect(callbacks.has(2)).toBe(true);

        dispose();
        expect(cancel).toHaveBeenLastCalledWith(2);
        expect(callbacks.size).toBe(0);
    });
});
