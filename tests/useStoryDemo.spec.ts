import { afterEach, describe, expect, it, vi } from "vitest";
import { useStoryDemo } from "../src/composables/useStoryDemo";
import { mountComposable } from "./utils/mountComposable";

afterEach(() => {
    vi.useRealTimers();
});

describe("useStoryDemo", () => {
    it("flushes registered cleanups on reset", () => {
        const { result, unmount } = mountComposable(() =>
            useStoryDemo<number>(0),
        );
        const { onPlay, play, reset } = result;

        let cleared = 0;
        onPlay((cleanup) => {
            cleanup(() => {
                cleared += 1;
            });
            cleanup(() => {
                cleared += 1;
            });
        });

        play();
        expect(cleared).toBe(0);

        reset();
        expect(cleared).toBe(2);

        // Re-running play after reset registers fresh cleanups; resetting again
        // flushes only the new set, not the already-cleared ones.
        play();
        reset();
        expect(cleared).toBe(4);

        unmount();
    });

    it("flushes registered cleanups on scope dispose (unmount)", () => {
        let cleared = 0;
        const { result, unmount } = mountComposable(() =>
            useStoryDemo<number>(0),
        );
        result.onPlay((cleanup) => {
            cleanup(() => {
                cleared += 1;
            });
        });

        result.play();
        expect(cleared).toBe(0);

        unmount();
        expect(cleared).toBe(1);
    });

    it("resets state to initial on every reset()", () => {
        const { result, unmount } = mountComposable(() =>
            useStoryDemo<number>(0),
        );

        result.state.value = 42;
        result.reset();
        expect(result.state.value).toBe(0);

        unmount();
    });

    it("flips status idle → running → complete for sync handlers", async () => {
        const { result, unmount } = mountComposable(() =>
            useStoryDemo<boolean>(false),
        );

        expect(result.status.value).toBe("idle");

        result.onPlay(() => {
            result.state.value = true;
        });

        result.play();
        expect(result.state.value).toBe(true);
        expect(result.status.value).toBe("complete");

        result.reset();
        expect(result.status.value).toBe("idle");

        unmount();
    });

    it("flips status to complete only after async handler resolves", async () => {
        vi.useFakeTimers();
        const { result, unmount } = mountComposable(() =>
            useStoryDemo<boolean>(false),
        );

        result.onPlay(async () => {
            await new Promise((r) => setTimeout(r, 50));
            result.state.value = true;
        });

        result.play();
        expect(result.status.value).toBe("running");

        await vi.advanceTimersByTimeAsync(50);
        expect(result.status.value).toBe("complete");
        expect(result.state.value).toBe(true);

        unmount();
    });

    it("no-op play when no handler registered", () => {
        const { result, unmount } = mountComposable(() =>
            useStoryDemo<number>(0),
        );
        result.play();
        expect(result.status.value).toBe("idle");
        unmount();
    });
});
