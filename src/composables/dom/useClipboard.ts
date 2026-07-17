// Clipboard copy with one modern write path and scope-owned feedback.

import { computed, onScopeDispose, ref, type ComputedRef } from "vue";

export type CopyFailureReason = "clipboard-api" | "no-api";
export type ClipboardStatus = "idle" | "pending" | "success" | "failure";

export interface UseClipboardOptions {
    /** Milliseconds before a successful copy resets to `idle` (default 1500). */
    resetMs?: number;
    /**
     * Optional watchdog: a write that has not settled within this many ms is
     * reported as a `clipboard-api` failure (some platforms leave `writeText`
     * pending forever). Default: no timeout.
     */
    timeoutMs?: number;
    /** Called when the current active copy attempt fails. */
    onCopyError?: (reason: CopyFailureReason) => void;
}

/** A failed copy always names its channel; a successful copy carries no reason. */
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };

export interface UseClipboardReturn {
    /** The current active attempt's complete feedback state. */
    status: ComputedRef<ClipboardStatus>;
    /** Copy `text`, returning a named failure when the platform rejects it. */
    copy: (text: string) => Promise<CopyResult>;
    /** Invalidate pending or settled feedback because its payload is no longer current. */
    invalidate: () => void;
}

/**
 * Stateless one-shot clipboard write — the honest primitive shared by
 * `useClipboard` and by consumers that own their own feedback. Returns the
 * discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy
 * boolean, for identical call ergonomics: `const { ok } = await writeClipboard(text)`.
 */
export async function writeClipboard(text: string): Promise<CopyResult> {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        return { ok: false, reason: "no-api" };
    }

    try {
        await navigator.clipboard.writeText(text);
        return { ok: true };
    } catch (error) {
        // Surface the platform's rejection instead of swallowing it. The discriminated
        // CopyResult keeps its named-channel shape, so the underlying error rides a
        // console warning rather than a new result member.
        console.warn("[useClipboard] clipboard writeText rejected:", error);
        return { ok: false, reason: "clipboard-api" };
    }
}

/**
 * Reactive clipboard copy with scope-owned confirmation state.
 *
 * @example
 * const { status, copy } = useClipboard({ resetMs: 2000 });
 */
export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
    const state = ref<ClipboardStatus>("idle");
    const status = computed(() => state.value);
    let active = true;
    let generation = 0;
    // One handle for whichever timer is live — the pending watchdog or the
    // success reset — so bump/invalidate/dispose all clear it symmetrically.
    let timer: ReturnType<typeof setTimeout> | null = null;

    function clearTimer(): void {
        if (timer == null) return;
        clearTimeout(timer);
        timer = null;
    }

    function invalidate(): void {
        if (!active) return;
        generation++;
        clearTimer();
        state.value = "idle";
    }

    // The write raced against the optional watchdog, whose handle lives in the
    // scope-owned `timer` so disposal reclaims it. A stale attempt never clears
    // a newer timer: the generation guard in `copy` bails before touching it.
    function write(text: string): Promise<CopyResult> {
        const pending = writeClipboard(text);
        if (options.timeoutMs == null) return pending;
        return new Promise<CopyResult>((resolve) => {
            timer = setTimeout(() => {
                timer = null;
                // A hung write reports as clipboard-api — no third reason member.
                resolve({ ok: false, reason: "clipboard-api" });
            }, options.timeoutMs);
            void pending.then(resolve);
        });
    }

    async function copy(text: string): Promise<CopyResult> {
        const attempt = ++generation;
        clearTimer();
        state.value = "pending";

        const result = await write(text);
        if (!active || attempt !== generation) return result;
        clearTimer();

        if (!result.ok) {
            state.value = "failure";
            options.onCopyError?.(result.reason);
            return result;
        }

        state.value = "success";
        timer = setTimeout(() => {
            if (active && attempt === generation) state.value = "idle";
            timer = null;
        }, options.resetMs ?? 1500);
        return result;
    }

    onScopeDispose(() => {
        active = false;
        generation++;
        clearTimer();
    });

    return { status, copy, invalidate };
}
