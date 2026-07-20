import { effectScope } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useStagger } from "@glass/composables/motion/reveal/useStagger";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("useStagger reduced-motion lifecycle", () => {
    it("settles only a cascade that has actually started", () => {
        let listener: ((event: MediaQueryListEvent) => void) | undefined;
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: false,
            addEventListener: vi.fn(
                (_type: string, next: (event: MediaQueryListEvent) => void) => {
                    listener = next;
                },
            ),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);

        const scope = effectScope();
        const stagger = scope.run(() =>
            useStagger({ items: 3, immediate: false }),
        )!;

        listener?.({ matches: true } as MediaQueryListEvent);
        expect(stagger.revealed.value).toEqual([false, false, false]);

        stagger.start();
        expect(stagger.revealed.value).toEqual([true, true, true]);
        expect(stagger.isComplete.value).toBe(true);
        scope.stop();
    });
});
