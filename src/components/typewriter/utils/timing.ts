import type { CancellationToken } from "../types";

// --- Cancellation ---

export function createCancellationToken(): CancellationToken {
    const listeners = new Set<() => void>();
    let _cancelled = false;

    return {
        get cancelled() {
            return _cancelled;
        },
        cancel() {
            if (_cancelled) return;
            _cancelled = true;
            for (const fn of listeners) fn();
            listeners.clear();
        },
        onCancel(fn: () => void) {
            if (_cancelled) {
                fn();
            } else {
                listeners.add(fn);
            }
        },
        offCancel(fn: () => void) {
            listeners.delete(fn);
        },
    };
}

// --- Cancellable sleep ---

/** Resolves `true` if elapsed normally, `false` if cancelled. */
export function sleep(ms: number, token: CancellationToken): Promise<boolean> {
    if (token.cancelled) return Promise.resolve(false);
    if (ms <= 0) return Promise.resolve(true);

    return new Promise<boolean>((resolve) => {
        const timer = setTimeout(() => {
            token.offCancel(onCancel);
            resolve(true);
        }, ms);

        function onCancel() {
            clearTimeout(timer);
            resolve(false);
        }

        token.onCancel(onCancel);
    });
}

// --- Stochastic delays ---

/** Uniform noise around base: `base * (1 + uniform(-variance, +variance))`, clamped to [min, max]. */
export function stochasticDelay(base: number, variance: number, min = 30, max = 600): number {
    const noise = (Math.random() * 2 - 1) * variance;
    return Math.max(min, Math.min(max, base * (1 + noise)));
}

/** Accelerating backspace delay: gets faster with each consecutive backspace. */
export function backspaceDelay(
    base: number,
    variance: number,
    index: number,
    acceleration: number,
): number {
    const factor = Math.max(0.3, 1 - acceleration * index);
    const raw = base * factor;
    return stochasticDelay(raw, variance, 20, 200);
}

// --- N-gram sizing ---

/** Pick n-gram size. Fixed number passthrough, or geometric distribution biased small. */
export function pickNgramSize(config: number | { min: number; max: number }): number {
    if (typeof config === "number") return config;
    const { min, max } = config;
    if (min === max) return min;

    // Geometric-ish: smaller sizes are more likely
    // P(k) ~ (1/2)^(k - min)
    let roll = Math.random();
    for (let k = min; k < max; k++) {
        // Each size has 50% chance of being selected vs continuing
        if (roll < 0.5) return k;
        roll = (roll - 0.5) * 2; // renormalize
    }
    return max;
}

// --- Utilities ---

/** Uniform random integer in [min, max] (inclusive). */
export function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Check if user prefers reduced motion. SSR-safe. */
export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
