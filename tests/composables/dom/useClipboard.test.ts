import { effectScope } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useClipboard, writeClipboard } from "@glass/composables/dom/useClipboard";

function deferred<T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });
    return { promise, resolve, reject };
}

function installClipboard(writeText: (text: string) => Promise<void>): void {
    Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: vi.fn(writeText) },
    });
}

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Reflect.deleteProperty(document, "execCommand");
    Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: undefined,
    });
});

describe("useClipboard", () => {
    it("publishes a successful copy for the configured reset window", async () => {
        vi.useFakeTimers();
        installClipboard(async () => undefined);
        const scope = effectScope();
        const clipboard = scope.run(() => useClipboard({ resetMs: 40 }))!;

        await expect(clipboard.copy("glass")).resolves.toEqual({ ok: true });
        expect(clipboard.status.value).toBe("success");

        await vi.advanceTimersByTimeAsync(40);
        expect(clipboard.status.value).toBe("idle");
        scope.stop();
    });

    it("reports both failure channels without invoking execCommand", async () => {
        const execCommand = vi.fn();
        Object.defineProperty(document, "execCommand", {
            configurable: true,
            value: execCommand,
        });
        const onCopyError = vi.fn();
        const scope = effectScope();
        const clipboard = scope.run(() => useClipboard({ onCopyError }))!;

        // No clipboard API present -> "no-api".
        await expect(clipboard.copy("missing")).resolves.toEqual({
            ok: false,
            reason: "no-api",
        });
        expect(clipboard.status.value).toBe("failure");
        expect(onCopyError).toHaveBeenLastCalledWith("no-api");

        // Clipboard API present but rejecting -> "clipboard-api".
        installClipboard(async () => {
            throw new Error("denied");
        });
        await expect(clipboard.copy("denied")).resolves.toEqual({
            ok: false,
            reason: "clipboard-api",
        });
        expect(clipboard.status.value).toBe("failure");
        expect(onCopyError).toHaveBeenLastCalledWith("clipboard-api");
        expect(execCommand).not.toHaveBeenCalled();
        scope.stop();
    });

    it("exposes writeClipboard as the stateless primitive", async () => {
        // The public stateless door for consumers that own their own feedback;
        // returns the discriminated result, no scope required.
        installClipboard(async () => undefined);
        await expect(writeClipboard("value")).resolves.toEqual({ ok: true });

        Object.defineProperty(navigator, "clipboard", {
            configurable: true,
            value: undefined,
        });
        await expect(writeClipboard("gone")).resolves.toEqual({
            ok: false,
            reason: "no-api",
        });
    });

    it("reports a timed-out write as a clipboard-api failure", async () => {
        vi.useFakeTimers();
        const pending = deferred<void>();
        installClipboard(() => pending.promise);
        const onCopyError = vi.fn();
        const scope = effectScope();
        const clipboard = scope.run(() =>
            useClipboard({ timeoutMs: 50, onCopyError }),
        )!;

        const result = clipboard.copy("slow");
        expect(clipboard.status.value).toBe("pending");
        await vi.advanceTimersByTimeAsync(50);
        await expect(result).resolves.toEqual({ ok: false, reason: "clipboard-api" });
        expect(clipboard.status.value).toBe("failure");
        expect(onCopyError).toHaveBeenLastCalledWith("clipboard-api");
        scope.stop();
    });

    it("reclaims the timeout watchdog on mid-flight disposal", async () => {
        vi.useFakeTimers();
        const pending = deferred<void>();
        installClipboard(() => pending.promise);
        const scope = effectScope();
        const clipboard = scope.run(() => useClipboard({ timeoutMs: 50 }))!;

        const result = clipboard.copy("armed");
        expect(clipboard.status.value).toBe("pending");
        expect(vi.getTimerCount()).toBe(1); // the watchdog is scope-owned

        scope.stop();
        expect(vi.getTimerCount()).toBe(0); // disposal reclaimed it, no leak

        pending.resolve();
        await expect(result).resolves.toEqual({ ok: true });
        expect(clipboard.status.value).not.toBe("success");
    });

    it("recovers from a failed attempt on retry", async () => {
        vi.useFakeTimers();
        const writeText = vi
            .fn<(text: string) => Promise<void>>()
            .mockRejectedValueOnce(new Error("denied"))
            .mockResolvedValue(undefined);
        installClipboard(writeText);
        const onCopyError = vi.fn();
        const scope = effectScope();
        const clipboard = scope.run(() => useClipboard({ resetMs: 40, onCopyError }))!;

        await expect(clipboard.copy("retry")).resolves.toEqual({
            ok: false,
            reason: "clipboard-api",
        });
        expect(clipboard.status.value).toBe("failure");
        expect(onCopyError).toHaveBeenCalledTimes(1);

        // Retry from the failed state succeeds and re-arms the reset window.
        await expect(clipboard.copy("retry")).resolves.toEqual({ ok: true });
        expect(clipboard.status.value).toBe("success");
        expect(onCopyError).toHaveBeenCalledTimes(1);

        await vi.advanceTimersByTimeAsync(40);
        expect(clipboard.status.value).toBe("idle");
        scope.stop();
    });

    it("lets only the latest active attempt publish feedback", async () => {
        vi.useFakeTimers();
        const first = deferred<void>();
        const second = deferred<void>();
        const writeText = vi
            .fn<(text: string) => Promise<void>>()
            .mockImplementationOnce(() => first.promise)
            .mockImplementationOnce(() => second.promise);
        installClipboard(writeText);
        const onCopyError = vi.fn();
        const scope = effectScope();
        const clipboard = scope.run(() => useClipboard({ resetMs: 40, onCopyError }))!;

        const stale = clipboard.copy("first");
        const latest = clipboard.copy("second");
        expect(clipboard.status.value).toBe("pending");
        second.resolve();
        await latest;
        expect(clipboard.status.value).toBe("success");

        first.reject(new Error("stale rejection"));
        await stale;
        expect(clipboard.status.value).toBe("success");
        expect(onCopyError).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(40);
        expect(clipboard.status.value).toBe("idle");
        scope.stop();
    });

    it("invalidates feedback and ignores completion for a superseded payload", async () => {
        vi.useFakeTimers();
        const pending = deferred<void>();
        installClipboard(() => pending.promise);
        const onCopyError = vi.fn();
        const scope = effectScope();
        const clipboard = scope.run(() => useClipboard({ onCopyError }))!;

        const result = clipboard.copy("old payload");
        expect(clipboard.status.value).toBe("pending");
        clipboard.invalidate();
        expect(clipboard.status.value).toBe("idle");

        pending.resolve();
        await expect(result).resolves.toEqual({ ok: true });
        expect(clipboard.status.value).toBe("idle");
        expect(onCopyError).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);
        scope.stop();
    });

    it("invalidates pending state, callbacks, and timers on scope disposal", async () => {
        vi.useFakeTimers();
        const pending = deferred<void>();
        installClipboard(() => pending.promise);
        const onCopyError = vi.fn();
        const scope = effectScope();
        const clipboard = scope.run(() => useClipboard({ onCopyError }))!;

        const result = clipboard.copy("late");
        scope.stop();
        pending.reject(new Error("after disposal"));

        await expect(result).resolves.toEqual({
            ok: false,
            reason: "clipboard-api",
        });
        // Disposal froze the attempt: the late rejection published nothing.
        expect(clipboard.status.value).not.toBe("failure");
        expect(onCopyError).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);
    });
});
