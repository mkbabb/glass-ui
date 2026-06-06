import { afterEach, describe, expect, it, vi } from "vitest";
import {
    postTaskSafe,
    usePrioritizedTask,
} from "../../src/composables/motion/core";

describe("postTaskSafe", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("uses native scheduler.postTask when available, threading options", async () => {
        const nativePostTask = vi.fn(
            <T>(cb: () => T, _opts?: { priority?: string }) =>
                Promise.resolve(cb()),
        );
        vi.stubGlobal("scheduler", { postTask: nativePostTask });

        const result = await postTaskSafe(() => 42, { priority: "background" });

        expect(result).toBe(42);
        expect(nativePostTask).toHaveBeenCalledTimes(1);
        expect(nativePostTask.mock.calls[0][1]).toMatchObject({
            priority: "background",
        });
    });

    it("falls back to a MessageChannel macrotask when scheduler.postTask is absent", async () => {
        vi.stubGlobal("scheduler", undefined);
        expect(typeof MessageChannel).toBe("function");

        let ran = false;
        const p = postTaskSafe(() => {
            ran = true;
            return "done";
        });
        // Not run synchronously — it is scheduled off the current task.
        expect(ran).toBe(false);
        await expect(p).resolves.toBe("done");
        expect(ran).toBe(true);
    });

    it("falls back to setTimeout(0) when MessageChannel is also absent", async () => {
        vi.stubGlobal("scheduler", undefined);
        vi.stubGlobal("MessageChannel", undefined);

        await expect(postTaskSafe(() => "ok")).resolves.toBe("ok");
    });

    it("rejects when the callback throws", async () => {
        vi.stubGlobal("scheduler", undefined);

        await expect(
            postTaskSafe(() => {
                throw new Error("boom");
            }),
        ).rejects.toThrow("boom");
    });

    it("rejects with AbortError when the signal is already aborted (fallback path)", async () => {
        vi.stubGlobal("scheduler", undefined);

        const controller = new AbortController();
        controller.abort();

        await expect(
            postTaskSafe(() => "never", { signal: controller.signal }),
        ).rejects.toMatchObject({ name: "AbortError" });
    });

    it("rejects with AbortError when aborted before the macrotask runs (fallback path)", async () => {
        vi.stubGlobal("scheduler", undefined);

        const controller = new AbortController();
        const p = postTaskSafe(() => "never", { signal: controller.signal });
        controller.abort();

        await expect(p).rejects.toMatchObject({ name: "AbortError" });
    });
});

describe("usePrioritizedTask", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("schedules through the native path with the controller priority", async () => {
        const nativePostTask = vi.fn(
            <T>(cb: () => T, _opts?: { priority?: string }) =>
                Promise.resolve(cb()),
        );
        vi.stubGlobal("scheduler", { postTask: nativePostTask });

        const { postTask } = usePrioritizedTask("user-blocking");
        await expect(postTask(() => "v")).resolves.toBe("v");

        expect(nativePostTask.mock.calls[0][1]).toMatchObject({
            priority: "user-blocking",
        });
    });

    it("aborts a pending fallback task via the controller's abort()", async () => {
        // No native scheduler and no TaskController → the controller falls back
        // to per-task signal-less scheduling; an explicit per-task signal still
        // cancels. (TaskController is absent under happy-dom.)
        vi.stubGlobal("scheduler", undefined);
        vi.stubGlobal("TaskController", undefined);

        const controller = new AbortController();
        const { postTask } = usePrioritizedTask("background");
        const p = postTask(() => "never", { signal: controller.signal });
        controller.abort();

        await expect(p).rejects.toMatchObject({ name: "AbortError" });
    });

    it("abort() is a no-op shell when TaskController is unavailable", () => {
        vi.stubGlobal("TaskController", undefined);
        const { abort } = usePrioritizedTask();
        expect(() => abort()).not.toThrow();
    });
});
