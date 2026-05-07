import { afterEach, describe, expect, it, vi } from "vitest";
import { computed, nextTick, ref, type ComputedRef } from "vue";
import { useAnimatedNumberMap } from "../motion/useAnimatedNumberMap";
import { mountComposable } from "../../../tests/utils/mountComposable";

describe("useAnimatedNumberMap", () => {
    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllTimers();
        vi.restoreAllMocks();
    });

    it("returns a Record keyed by the input keys", () => {
        const sources: Record<string, ComputedRef<number | null>> = {
            ping: computed(() => 25),
            jitter: computed(() => 3),
            download: computed(() => 100),
            upload: computed(() => 50),
        };

        const { result, unmount } = mountComposable(() =>
            useAnimatedNumberMap({
                keys: ["ping", "jitter", "download", "upload"] as const,
                source: (key) => sources[key]!,
                damping: 1,
                snapThreshold: 0.01,
            }),
        );

        expect(Object.keys(result)).toEqual(["ping", "jitter", "download", "upload"]);
        expect(typeof result.ping.value).toBe("number");

        unmount();
    });

    it("propagates null when the source is null", () => {
        vi.useFakeTimers();

        const ping = ref<number | null>(null);
        const download = ref<number | null>(50);

        const { result, unmount } = mountComposable(() =>
            useAnimatedNumberMap({
                keys: ["ping", "download"] as const,
                source: (key) =>
                    key === "ping" ? computed(() => ping.value) : computed(() => download.value),
                damping: 1,
                snapThreshold: 0.01,
            }),
        );

        vi.runAllTimers();

        expect(result.ping.value).toBe(null);
        expect(result.download.value).not.toBe(null);

        unmount();
    });

    it("smooths each source independently toward its target", async () => {
        vi.useFakeTimers();

        const a = ref<number | null>(0);
        const b = ref<number | null>(0);

        const { result, unmount } = mountComposable(() =>
            useAnimatedNumberMap({
                keys: ["a", "b"] as const,
                source: (key) =>
                    key === "a" ? computed(() => a.value) : computed(() => b.value),
                damping: 1,
                snapThreshold: 0.01,
            }),
        );

        a.value = 100;
        b.value = 200;
        await nextTick();
        vi.runAllTimers();

        expect(result.a.value).toBeCloseTo(100, 0);
        expect(result.b.value).toBeCloseTo(200, 0);

        unmount();
    });
});
