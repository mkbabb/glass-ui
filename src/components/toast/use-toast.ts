import { ref, computed } from "vue";
import type { Component, ComputedRef, VNode } from "vue";
import type { Surface, Tone } from "../_shared/axes";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

// BI.W-SYNONYM-RENAMES — the toast's semantic status reads the ONE shared `Tone`
// axis (_shared/axes.ts's TONES tuple: neutral/success/warning/info/destructive),
// NOT a private `ToastVariant` re-mint of the tone vocabulary (proof:encapsulation
// axes-ext G8; proof:variant-residual). `neutral` is the un-toned floating glass
// (the former `variant:'default'`), byte-identical paint. The old `ToastVariant`
// export is RETIRED (clean break, no alias) — a consumer typing a toast tone imports
// `Tone` from `@mkbabb/glass-ui/axes`.

export interface ToastOptions {
    title?: string;
    description?: string;
    action?: Component | VNode;
    tone?: Tone;
    /**
     * BB.W-SURFACE-AXIS-COMPLETE — the shared {glass·veil·opaque} surface-decoration
     * axis on a queued toast (default `glass`). Forwarded through `Toaster.vue`'s
     * per-toast `v-bind` exactly like `variant`; orthogonal to the tone arm.
     */
    surface?: Surface;
    /**
     * Auto-dismiss delay in ms, forwarded to reka-ui's `ToastRoot`. Omit to
     * inherit the `ToastProvider` default; `Number.POSITIVE_INFINITY` keeps the
     * toast open until dismissed.
     */
    duration?: number;
}

interface QueuedToast extends ToastOptions {
    id: string;
    open?: boolean;
    // AY.W-ANIM1 (W-ANIM-FIX) — the close-request listener key. reka-ui's
    // `ToastRoot` emits `update:open` (a Vue event), so the spread-as-prop key
    // MUST be `onUpdate:open` — NOT the React shadcn `onOpenChange`, which reka
    // silently ignores (the stale-reka-binding no-op class: timer/close-X/swipe
    // all fire `update:open` but the request never reached the store while the
    // spread `open: true` kept the root controlled-open). One key revives the
    // whole dismissal surface (auto-dismiss + close-X + swipe).
    "onUpdate:open"?: (open: boolean) => void;
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string) {
    if (toastTimeouts.has(toastId)) {
        return;
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId,
        });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
}

const toasts = ref<QueuedToast[]>([]);
const toastQueue = computed<readonly QueuedToast[]>(() => toasts.value);

type ToastAction =
    | { type: "ADD_TOAST"; toast: QueuedToast }
    | { type: "UPDATE_TOAST"; toast: Partial<QueuedToast> & { id: string } }
    | { type: "DISMISS_TOAST"; toastId?: string }
    | { type: "REMOVE_TOAST"; toastId?: string };

function dispatch(action: ToastAction) {
    switch (action.type) {
        case "ADD_TOAST":
            toasts.value = [action.toast, ...toasts.value].slice(0, TOAST_LIMIT);
            break;

        case "UPDATE_TOAST":
            toasts.value = toasts.value.map((t) =>
                t.id === action.toast.id ? { ...t, ...action.toast } : t,
            );
            break;

        case "DISMISS_TOAST": {
            const { toastId } = action;

            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                toasts.value.forEach((toast) => {
                    addToRemoveQueue(toast.id);
                });
            }

            toasts.value = toasts.value.map((t) =>
                t.id === toastId || toastId === undefined
                    ? {
                          ...t,
                          open: false,
                      }
                    : t,
            );
            break;
        }

        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                toasts.value = [];
            } else {
                toasts.value = toasts.value.filter((t) => t.id !== action.toastId);
            }

            break;
    }
}

let count = 0;

function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}

export interface ToastHandle {
    readonly id: string;
    dismiss: () => void;
    update: (props: ToastOptions) => void;
}

function toast(props: ToastOptions): ToastHandle {
    const id = genId();

    const update = (props: ToastOptions) =>
        dispatch({
            type: "UPDATE_TOAST",
            toast: { ...props, id },
        });

    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            // The reka `update:open` listener — when reka requests close (auto-dismiss
            // timer, close-X, swipe-end) it emits `update:open false`, which lands here
            // and dismisses the store entry, closing the controlled root.
            "onUpdate:open": (open: boolean) => {
                if (!open) dismiss();
            },
        },
    });

    return {
        id,
        dismiss,
        update,
    };
}

interface UseToastReturn {
    readonly toast: typeof toast;
    readonly dismiss: (toastId?: string) => void;
}

function useToast(): UseToastReturn {
    return {
        toast,
        dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    };
}

/** Renderer-only queue access; intentionally absent from the public barrel. */
function useToastQueue(): ComputedRef<readonly QueuedToast[]> {
    return toastQueue;
}

export { toast, useToast, useToastQueue };
