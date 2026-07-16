import { afterEach, describe, expect, it, vi } from "vitest";
import { effectScope } from "vue";

afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
});

function mediaPreference(initial = false) {
    let matches = initial;
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const media = {
        get matches() {
            return matches;
        },
        addEventListener: vi.fn(
            (_: string, listener: (event: MediaQueryListEvent) => void) => {
                listeners.add(listener);
            },
        ),
        removeEventListener: vi.fn(
            (_: string, listener: (event: MediaQueryListEvent) => void) => {
                listeners.delete(listener);
            },
        ),
    } as unknown as MediaQueryList;

    return {
        media,
        set(next: boolean) {
            matches = next;
            for (const listener of listeners) {
                listener({ matches: next } as MediaQueryListEvent);
            }
        },
    };
}

describe("reduced-motion authority", () => {
    it("reads false without a browser media-query facility", async () => {
        vi.spyOn(window, "matchMedia").mockImplementation(undefined as never);
        const { readReducedMotion } = await import(
            "@glass/composables/motion/core/useReducedMotion"
        );

        expect(readReducedMotion()).toBe(false);
    });

    it("shares one live query and listener", async () => {
        const preference = mediaPreference();
        const matchMedia = vi
            .spyOn(window, "matchMedia")
            .mockReturnValue(preference.media);
        const { readReducedMotion, useReducedMotion } = await import(
            "@glass/composables/motion/core/useReducedMotion"
        );

        expect(readReducedMotion()).toBe(false);
        const first = useReducedMotion();
        const second = useReducedMotion();

        expect(first).toBe(second);
        // One non-subscribing snapshot plus one cached reactive query.
        expect(matchMedia).toHaveBeenCalledTimes(2);
        expect(preference.media.addEventListener).toHaveBeenCalledTimes(1);

        preference.set(true);
        expect(first.value).toBe(true);
        expect(second.value).toBe(true);
        expect(readReducedMotion()).toBe(true);
    });

    it("releases the shared listener after the last scoped consumer", async () => {
        const preference = mediaPreference();
        vi.spyOn(window, "matchMedia").mockReturnValue(preference.media);
        const { useReducedMotion } = await import(
            "@glass/composables/motion/core/useReducedMotion"
        );

        const firstScope = effectScope();
        const secondScope = effectScope();
        const first = firstScope.run(useReducedMotion)!;
        secondScope.run(useReducedMotion);

        expect(preference.media.addEventListener).toHaveBeenCalledOnce();
        firstScope.stop();
        expect(preference.media.removeEventListener).not.toHaveBeenCalled();

        preference.set(true);
        expect(first.value).toBe(true);
        secondScope.stop();
        expect(preference.media.removeEventListener).toHaveBeenCalledOnce();

        preference.set(false);
        expect(first.value).toBe(true);

        const nextScope = effectScope();
        nextScope.run(useReducedMotion);
        expect(first.value).toBe(false);
        expect(preference.media.addEventListener).toHaveBeenCalledTimes(2);
        nextScope.stop();
        expect(preference.media.removeEventListener).toHaveBeenCalledTimes(2);
    });

    it("moves the sole listener when the matchMedia source changes", async () => {
        const firstPreference = mediaPreference();
        const secondPreference = mediaPreference(true);
        const firstSource = vi
            .spyOn(window, "matchMedia")
            .mockReturnValue(firstPreference.media);
        const { useReducedMotion } = await import(
            "@glass/composables/motion/core/useReducedMotion"
        );

        const preference = useReducedMotion();
        expect(preference.value).toBe(false);
        expect(firstPreference.media.addEventListener).toHaveBeenCalledOnce();

        firstSource.mockRestore();
        vi.spyOn(window, "matchMedia").mockReturnValue(secondPreference.media);
        expect(useReducedMotion()).toBe(preference);
        expect(preference.value).toBe(true);
        expect(firstPreference.media.removeEventListener).toHaveBeenCalledOnce();
        expect(secondPreference.media.addEventListener).toHaveBeenCalledOnce();

        firstPreference.set(false);
        expect(preference.value).toBe(true);
        secondPreference.set(false);
        expect(preference.value).toBe(false);
    });
});
