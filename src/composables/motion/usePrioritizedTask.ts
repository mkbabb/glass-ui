// AS.W3 §G4 — the `scheduler.postTask` priority lever. Where `yieldToMain()`
// cedes the thread BETWEEN chunks, `postTaskSafe()` SCHEDULES a unit of work at
// an explicit priority ('user-blocking' | 'user-visible' | 'background'), so a
// background recompute (fourier ι precompute, muster J re-rank warmup, speedtest
// AS history rollup) runs strictly behind input/paint instead of contending with
// it — the cheaper-than-a-Worker INP win for main-thread-bound work.
//
// Platform-native + feature-detected, keyframes-FREE + vueuse-FREE (no `vue`, no
// `@mkbabb/keyframes.js`, no `@vueuse/core` import) so it ships on the
// engine-free `/motion-core` subpath alongside `useYieldToMain`.
//
// Baseline: `scheduler.postTask` + `TaskController` = Baseline Newly Available
// (Chromium 94+, Firefox/Safari 2024). Per the Baseline policy this carries a
// ≤ 20-LOC feature-detected fallback with no deps: a `MessageChannel` macrotask
// (the `useYieldToMain` pattern, honouring `delay` via `setTimeout`) with a
// plain `AbortSignal` cancellation check. The fallback cannot order by priority
// (a macrotask is a macrotask) — it degrades to "run as a normal macrotask after
// any delay", still correctness-preserving, just without the priority ordering.

import { supportsPostTask } from "../../utils/platformSupport";

export type TaskPriority = "user-blocking" | "user-visible" | "background";

export interface PostTaskOptions {
    /** Scheduling priority. Defaults to the platform default ('user-visible'). */
    priority?: TaskPriority;
    /** Abort the task before it runs (rejects the returned promise). */
    signal?: AbortSignal;
    /** Delay in ms before the task becomes eligible to run. */
    delay?: number;
}

interface SchedulerWithPostTask {
    postTask?: <T>(
        callback: () => T,
        options?: { priority?: TaskPriority; signal?: AbortSignal; delay?: number },
    ) => Promise<T>;
}

function getSchedulerPostTask(): SchedulerWithPostTask["postTask"] | null {
    if (!supportsPostTask()) return null;
    const scheduler = (globalThis as { scheduler?: SchedulerWithPostTask })
        .scheduler;
    return scheduler?.postTask?.bind(scheduler) ?? null;
}

/** The error a fallback-path abort rejects with (the native API rejects with a
 *  DOMException 'AbortError'; we mirror the name for a uniform catch). */
function abortError(): Error {
    const err = new Error("The task was aborted.");
    err.name = "AbortError";
    return err;
}

/**
 * Merge ≥ 0 abort signals into one that aborts when ANY input does. Mirrors the
 * `postTaskSafe` fallback-with-feature-detect idiom: native `AbortSignal.any`
 * when available (Baseline 2024, alongside `scheduler.postTask`), else a manual
 * merge via a fresh `AbortController`. The manual branch is load-bearing — the
 * same legacy engines that lack `scheduler.postTask` also lack `AbortSignal.any`.
 *
 * Returns `undefined` for an empty live set so callers pass no signal at all
 * (rather than a never-aborting one), and the lone-signal case passes through
 * untouched (no needless wrapper controller).
 */
function anySignal(
    signals: ReadonlyArray<AbortSignal | undefined>,
): AbortSignal | undefined {
    const live = signals.filter((s): s is AbortSignal => s != null);
    if (live.length === 0) return undefined;
    if (live.length === 1) return live[0];

    // `AbortSignal.any` is Baseline 2024 (alongside scheduler.postTask); the
    // typeof guard still gates legacy engines that type-declare but lack it.
    if (typeof AbortSignal.any === "function") return AbortSignal.any(live);

    const merged = new AbortController();
    const onAbort = (source: AbortSignal) => merged.abort(source.reason);
    for (const signal of live) {
        if (signal.aborted) {
            merged.abort(signal.reason);
            break;
        }
        signal.addEventListener("abort", () => onAbort(signal), { once: true });
    }
    return merged.signal;
}

/**
 * Schedule `callback` at an explicit priority, resolving with its result.
 * Native `scheduler.postTask` when available; otherwise a `MessageChannel`
 * macrotask (honouring `delay` via `setTimeout`, and `signal` via a plain
 * `AbortSignal` check) that cannot order by priority but still runs off the
 * current task.
 *
 * @example
 *   await postTaskSafe(() => recomputeHistory(), { priority: "background" });
 */
export function postTaskSafe<T>(
    callback: () => T,
    options: PostTaskOptions = {},
): Promise<T> {
    const { priority, signal, delay } = options;

    const nativePostTask = getSchedulerPostTask();
    if (nativePostTask) {
        return nativePostTask(callback, { priority, signal, delay });
    }

    return new Promise<T>((resolve, reject) => {
        if (signal?.aborted) {
            reject(abortError());
            return;
        }
        const run = () => {
            if (signal?.aborted) {
                reject(abortError());
                return;
            }
            try {
                resolve(callback());
            } catch (err) {
                // fail-explicit: the callback's throw is SURFACED — it rejects
                // the task promise so the caller's await sees the real error.
                reject(err);
            }
        };
        const dispatch =
            typeof MessageChannel === "function"
                ? () => {
                      const channel = new MessageChannel();
                      channel.port1.onmessage = () => {
                          channel.port1.onmessage = null;
                          run();
                      };
                      channel.port2.postMessage(undefined);
                  }
                : () => setTimeout(run, 0);
        if (delay && delay > 0) {
            setTimeout(dispatch, delay);
        } else {
            dispatch();
        }
    });
}

interface TaskControllerLike {
    readonly signal: AbortSignal;
    abort: (reason?: unknown) => void;
}

interface TaskControllerCtor {
    new (init?: { priority?: TaskPriority }): TaskControllerLike;
}

function getTaskController(priority?: TaskPriority): TaskControllerLike | null {
    const Ctor = (globalThis as { TaskController?: TaskControllerCtor })
        .TaskController;
    if (typeof Ctor !== "function") return null;
    return new Ctor(priority ? { priority } : undefined);
}

export interface UsePrioritizedTaskReturn {
    /**
     * Schedule a unit of work. The controller's `signal` is merged in (its own
     * `abort()` cancels every task it scheduled), and an explicit `options.signal`
     * still applies on the fallback path.
     */
    postTask: <T>(callback: () => T, options?: PostTaskOptions) => Promise<T>;
    /** Abort every task scheduled through this controller. */
    abort: (reason?: unknown) => void;
}

/**
 * Composable wrapper over {@link postTaskSafe} that owns a `TaskController`
 * (when supported) so a single `abort()` cancels every task it scheduled — the
 * controller a consumer constructs once and tears down on unmount. When
 * `TaskController` is absent the controller is a no-op shell and per-task
 * `options.signal` is the only cancellation channel.
 *
 * Pure-native (no `vue` import) — owns no reactive state and no lifecycle, so it
 * has no cleanup obligation beyond the `abort()` the consumer calls itself.
 */
export function usePrioritizedTask(
    priority?: TaskPriority,
): UsePrioritizedTaskReturn {
    const controller = getTaskController(priority);
    return {
        postTask: <T>(callback: () => T, options: PostTaskOptions = {}) =>
            postTaskSafe(callback, {
                priority,
                ...options,
                // Merge BOTH signals so the controller's own `abort()` still
                // cancels a task scheduled with an explicit `options.signal`
                // (the prior `??` dropped the controller signal in that case).
                signal: anySignal([controller?.signal, options.signal]),
            }),
        abort: (reason?: unknown) => controller?.abort(reason),
    };
}
