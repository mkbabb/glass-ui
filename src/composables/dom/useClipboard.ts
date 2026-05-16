// Clipboard copy with auto-resetting `copied` flag + bare-function co-export.
//
// O.W6 Lane A—constellation promotion. Synthesises two consumer shapes:
//
//   1. value.js `demo/@/composables/useClipboard.ts` (20 sites)—async
//      `navigator.clipboard.writeText` with `execCommand("copy")` legacy
//      fallback; returns a `Promise<boolean>` from a bare `copyToClipboard`
//      function (no reactive state).
//   2. fourier-analysis `web/src/composables/useMorphConfig.ts:90` (1 inline
//      site)—pairs a `copied` ref with a `setTimeout` reset window, but
//      lacks the execCommand fallback.
//
// Both shapes converge here. The composite copy path (clipboard API → exec-
// Command fallback) lives at module scope as private helpers so both surface
// shapes (`useClipboard()` composable + `copyToClipboard()` bare function)
// call into the same implementation.
//
// P.W5 Lane A.1 (Path B): the bare `copyToClipboard(text, options?)` co-export
// closes the value.js 19-site bulk-import-flip story per P11/e §"Path B".
// Value.js's existing `copyToClipboard(text): Promise<boolean>` signature
// matches verbatim—the consumer-side migration is one-line `import` rewrite
// per call site.
//
// SSR-safe: `navigator` + `document` guards return `false` when either is
// unavailable. The `copied` ref stays `false` in that path.

import { onScopeDispose, ref, type Ref } from "vue";

export interface UseClipboardOptions {
    /** Milliseconds before `copied` auto-resets to `false` (default 1500). */
    resetMs?: number;
}

export interface UseClipboardReturn {
    /** Reactive flag—flips `true` on successful copy, auto-resets after `resetMs`. */
    copied: Ref<boolean>;
    /** Copy `text` to the clipboard. Returns the success boolean. */
    copy: (text: string) => Promise<boolean>;
}

// Module-scope copy-path helpers (P.W5 Lane A.1)—the bare `copyToClipboard`
// + the composable's internal `copy()` both call into these so the two
// surface shapes share one implementation.

async function writeViaClipboardApi(text: string): Promise<boolean> {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        return false;
    }
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

function writeViaExecCommand(text: string): boolean {
    if (typeof document === "undefined") return false;
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
        ok = false;
    }
    document.body.removeChild(ta);
    return ok;
}

/**
 * Bare clipboard copy—stateless `Promise<boolean>` return, no reactive `copied`
 * flag. P.W5 Lane A.1 (Path B) co-export paralleling the canonical
 * `useClipboard()` composable. Use this when call sites manage their own
 * confirmation state (e.g. hand-rolled `ref + setTimeout`) or in non-component
 * contexts (utility modules, stores).
 *
 * The `resetMs` option is currently a no-op for the bare function (no reactive
 * state to auto-reset); kept on the signature for forward-compatibility with
 * future paired-callback hooks.
 *
 * @example
 * import { copyToClipboard } from "@mkbabb/glass-ui";
 *
 * async function shareLink(url: string) {
 *   const ok = await copyToClipboard(url);
 *   if (ok) toast.show("Link copied");
 * }
 */
export async function copyToClipboard(
    text: string,
    _options: UseClipboardOptions = {},
): Promise<boolean> {
    return (await writeViaClipboardApi(text)) || writeViaExecCommand(text);
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

    async function copy(text: string): Promise<boolean> {
        const ok = await copyToClipboard(text);
        if (ok) {
            copied.value = true;
            clearResetTimer();
            resetTimer = setTimeout(() => {
                copied.value = false;
                resetTimer = null;
            }, resetMs);
        }
        return ok;
    }

    onScopeDispose(clearResetTimer);

    return { copied, copy };
}
