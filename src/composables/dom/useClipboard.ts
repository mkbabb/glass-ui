// Clipboard copy with auto-resetting `copied` flag.
//
// O.W6 Lane A — constellation promotion. Synthesises two consumer shapes:
//
//   1. value.js `demo/@/composables/useClipboard.ts` (20 sites) — async
//      `navigator.clipboard.writeText` with `execCommand("copy")` legacy
//      fallback; returns a `Promise<boolean>` from a bare `copyToClipboard`
//      function (no reactive state).
//   2. fourier-analysis `web/src/composables/useMorphConfig.ts:90` (1 inline
//      site) — pairs a `copied` ref with a `setTimeout` reset window, but
//      lacks the execCommand fallback.
//
// Both shapes converge here: the robust copy path from value.js wrapped in
// a Vue-reactive `copied` ref with the auto-reset window from fourier-analysis.
// Cross-repo adoption sweep deferred to user-authorized cross-repo wave per
// W6.md hard gate (e).
//
// SSR-safe: `navigator` + `document` guards return `false` when either is
// unavailable. The `copied` ref stays `false` in that path.

import { onScopeDispose, ref, type Ref } from "vue";

export interface UseClipboardOptions {
    /** Milliseconds before `copied` auto-resets to `false` (default 1500). */
    resetMs?: number;
}

export interface UseClipboardReturn {
    /** Reactive flag — flips `true` on successful copy, auto-resets after `resetMs`. */
    copied: Ref<boolean>;
    /** Copy `text` to the clipboard. Returns the success boolean. */
    copy: (text: string) => Promise<boolean>;
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

    async function copy(text: string): Promise<boolean> {
        const ok = (await writeViaClipboardApi(text)) || writeViaExecCommand(text);
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
