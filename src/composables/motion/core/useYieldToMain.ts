// `yieldToMain()` breaks a long task into
// chunks by ceding the main thread BETWEEN chunks of synchronous work, so the
// browser can run pending input/paint handlers and the Interaction-to-Next-Paint
// metric stays low under heavy compute.
//
// Platform-native + feature-detected, keyframes-FREE + vueuse-FREE (no `vue`,
// no `@mkbabb/keyframes.js`, no `@vueuse/core` import) so it ships on the
// engine-free `/motion-core` subpath and is reachable wherever `useRAFLoop` is.
//
// Baseline: `scheduler.yield()` is Baseline Newly Available (Chromium 129+,
// 2024). Per the Baseline policy this carries a ≤ 20-LOC feature-detected
// fallback with no deps: a `MessageChannel`-pumped macrotask (which, unlike
// `setTimeout(0)`, is not clamped to 4ms and is not deprioritized after nested
// timers), with a final `setTimeout(0)` floor for engines without
// `MessageChannel`. The native `scheduler.yield()` continuation is prioritized
// AHEAD of fresh tasks (it resumes after pending input but before new work),
// which the macrotask fallback cannot replicate — so the fallback degrades to
// "yield, then resume as a normal macrotask", still a correctness-preserving
// INP win, just slightly less optimal scheduling.

interface SchedulerWithYield {
    yield?: () => Promise<void>;
}

function getSchedulerYield(): (() => Promise<void>) | null {
    const scheduler = (globalThis as { scheduler?: SchedulerWithYield })
        .scheduler;
    return typeof scheduler?.yield === "function"
        ? scheduler.yield.bind(scheduler)
        : null;
}

/**
 * Yield control to the main thread, returning a promise that resolves after the
 * browser has had a chance to run pending input/render work. Native
 * `scheduler.yield()` when available; otherwise a `MessageChannel` macrotask
 * (with a `setTimeout(0)` floor). Await it between chunks of a long task to keep
 * input responsive (the INP lever).
 *
 * @example
 *   for (const chunk of chunks) {
 *     processChunk(chunk);
 *     await yieldToMain();   // let the browser breathe between chunks
 *   }
 */
export function yieldToMain(): Promise<void> {
    const nativeYield = getSchedulerYield();
    if (nativeYield) return nativeYield();

    if (typeof MessageChannel === "function") {
        return new Promise<void>((resolve) => {
            const channel = new MessageChannel();
            channel.port1.onmessage = () => {
                channel.port1.onmessage = null;
                resolve();
            };
            channel.port2.postMessage(undefined);
        });
    }

    return new Promise<void>((resolve) => setTimeout(resolve, 0));
}

export interface UseYieldToMainReturn {
    /** True when the native `scheduler.yield()` is available (vs the fallback). */
    readonly hasNativeYield: boolean;
    /** Yield to the main thread. Native `scheduler.yield()` or the fallback. */
    yield: () => Promise<void>;
}

/**
 * Composable wrapper over {@link yieldToMain} that exposes the native-yield
 * feature flag alongside the bound `yield` function. Consumers loop their work
 * units and `await ctx.yield()` between chunks to keep input responsive.
 *
 * Pure-native (no `vue` import) — call it from setup or anywhere; it owns no
 * reactive state and no lifecycle, so it has no cleanup obligation.
 */
export function useYieldToMain(): UseYieldToMainReturn {
    return {
        hasNativeYield: getSchedulerYield() !== null,
        yield: yieldToMain,
    };
}
