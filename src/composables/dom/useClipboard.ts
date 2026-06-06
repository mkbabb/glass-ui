// Clipboard copy with auto-resetting `copied` flag + bare-function co-export.
//
// Synthesises two consumer shapes:
//
//   1. An async `navigator.clipboard.writeText` with an `execCommand("copy")`
//      legacy fallback, returned from a bare `copyToClipboard` function (no
//      reactive state).
//   2. A `copied` ref paired with a `setTimeout` reset window.
//
// Both shapes converge here. The composite copy path (clipboard API → exec-
// Command fallback) lives at module scope as private helpers so both surface
// shapes (`useClipboard()` composable + `copyToClipboard()` bare function)
// call into the same implementation.
//
// The bare `copyToClipboard(text): Promise<boolean>` signature is the
// cross-repo verbatim contract (consumers migrate via a one-line import
// rewrite); the composable's `copy()` returns the richer `{ ok, reason }` so a
// copy FAILURE is reported, not silently swallowed.
//
// SSR-safe: `navigator` + `document` guards report `'no-api'` when neither
// channel is available. The `copied` ref stays `false` in that path.
//
// Fail-explicit: the `execCommand` arm STAYS — it is the legacy-browser
// fallback (befitting) — but every copy failure surfaces a NAMED `reason`
// through `onCopyError` / the composable return; no `catch` returns a bare,
// unreported `false`.

import { onScopeDispose, ref, type Ref } from "vue";

/**
 * Why a copy did not succeed. `'clipboard-api'` — the async
 * `navigator.clipboard.writeText` channel threw or rejected; `'exec-command'`
 * — the legacy `document.execCommand("copy")` fallback returned/threw failure;
 * `'no-api'` — neither channel exists in this environment (SSR / locked-down).
 */
export type CopyFailureReason = "clipboard-api" | "exec-command" | "no-api";

export interface UseClipboardOptions {
    /** Milliseconds before `copied` auto-resets to `false` (default 1500). */
    resetMs?: number;
    /**
     * Called with the NAMED reason when a copy attempt fails on a given
     * channel. Both the clipboard-API and exec-command arms report through this
     * (the exec-command arm only after the clipboard-API arm has already
     * failed). Surfaces the failure instead of swallowing it.
     */
    onCopyError?: (reason: CopyFailureReason) => void;
}

/** Result of a composable `copy()` — the success flag plus, on failure, the
 *  named reason the copy did not land. */
export interface CopyResult {
    ok: boolean;
    /** The failure channel when `ok` is false; `undefined` on success. */
    reason?: CopyFailureReason;
}

export interface UseClipboardReturn {
    /** Reactive flag—flips `true` on successful copy, auto-resets after `resetMs`. */
    copied: Ref<boolean>;
    /**
     * Copy `text` to the clipboard. Resolves `{ ok }` on success or
     * `{ ok: false, reason }` naming the channel that failed — the failure is
     * REPORTED, never silently swallowed.
     */
    copy: (text: string) => Promise<CopyResult>;
}

// Module-scope copy-path helpers—the bare `copyToClipboard` + the composable's
// internal `copy()` both call into these so the two surface shapes share one
// implementation. Each returns a discriminated result so the FAILURE channel
// is named, not collapsed into a bare boolean.

async function writeViaClipboardApi(text: string): Promise<CopyResult> {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        return { ok: false, reason: "no-api" };
    }
    try {
        await navigator.clipboard.writeText(text);
        return { ok: true };
    } catch {
        // fail-explicit: the clipboard-API channel rejected (permissions /
        // insecure context). NOT swallowed — the named reason flows to the
        // caller, which then attempts the exec-command fallback and ultimately
        // reports through `onCopyError`.
        return { ok: false, reason: "clipboard-api" };
    }
}

function writeViaExecCommand(text: string): CopyResult {
    if (typeof document === "undefined") return { ok: false, reason: "no-api" };
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
        ok = document.execCommand("copy");
    } catch {
        // fail-explicit: the legacy exec-command channel threw. NOT swallowed —
        // `ok` stays false and the named 'exec-command' reason is returned to
        // the caller below.
        ok = false;
    }
    document.body.removeChild(ta);
    return ok ? { ok: true } : { ok: false, reason: "exec-command" };
}

/**
 * Run the composite copy path (clipboard-API → exec-command fallback) and
 * report a failure through `onCopyError`. Returns the discriminated
 * `{ ok, reason }` so callers that need the channel can read it; the bare
 * `copyToClipboard` collapses it to a boolean.
 */
async function runCopy(
    text: string,
    onCopyError?: (reason: CopyFailureReason) => void,
): Promise<CopyResult> {
    const viaApi = await writeViaClipboardApi(text);
    if (viaApi.ok) return viaApi;

    const viaExec = writeViaExecCommand(text);
    if (viaExec.ok) return viaExec;

    // Both channels failed. Report the LAST attempted channel's reason (the
    // exec-command fallback's), falling back to the clipboard-API reason.
    const reason = viaExec.reason ?? viaApi.reason ?? "no-api";
    onCopyError?.(reason);
    return { ok: false, reason };
}

/**
 * Bare clipboard copy—stateless `Promise<boolean>` return, no reactive `copied`
 * flag. Use this when call sites manage their own confirmation state (e.g.
 * hand-rolled `ref + setTimeout`) or in non-component contexts (utility
 * modules, stores). A copy failure is reported through `options.onCopyError`
 * (the boolean return stays the verbatim cross-repo signature).
 *
 * @example
 * import { copyToClipboard } from "@mkbabb/glass-ui";
 *
 * async function shareLink(url: string) {
 *   const ok = await copyToClipboard(url, {
 *     onCopyError: (reason) => toast.show(`Copy failed: ${reason}`),
 *   });
 *   if (ok) toast.show("Link copied");
 * }
 */
export async function copyToClipboard(
    text: string,
    options: UseClipboardOptions = {},
): Promise<boolean> {
    const { ok } = await runCopy(text, options.onCopyError);
    return ok;
}

/**
 * Reactive clipboard copy with auto-reset confirmation flag.
 *
 * @example
 * const { copied, copy } = useClipboard();
 * <button @click="copy(value)">
 *   {{ copied ? "Copied" : "Copy" }}
 * </button>
 *
 * @example
 * // Custom reset window (e.g. for paired toast feedback):
 * const { copied, copy } = useClipboard({ resetMs: 2000 });
 */
export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
    const resetMs = options.resetMs ?? 1500;
    const copied = ref(false);
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    function clearResetTimer(): void {
        if (resetTimer != null) {
            clearTimeout(resetTimer);
            resetTimer = null;
        }
    }

    async function copy(text: string): Promise<CopyResult> {
        const result = await runCopy(text, options.onCopyError);
        if (result.ok) {
            copied.value = true;
            clearResetTimer();
            resetTimer = setTimeout(() => {
                copied.value = false;
                resetTimer = null;
            }, resetMs);
        }
        return result;
    }

    onScopeDispose(clearResetTimer);

    return { copied, copy };
}
