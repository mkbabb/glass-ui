import { ref, computed } from 'vue'
import type { Component, VNode } from 'vue'

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

// AW.W25 — semantic-tone parity. The Toast surface resolves the
// success/warning/info tones from the `--{success,warning,info}` tokens
// (mirroring Badge). This is the single source for the variant union; Toast.vue
// consumes it.
export type ToastVariant =
  | 'default'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: Component | VNode
  variant?: ToastVariant
  /**
   * Auto-dismiss delay in ms, forwarded to reka-ui's `ToastRoot`. Omit to
   * inherit the `ToastProvider` default; `Number.POSITIVE_INFINITY` keeps the
   * toast open until dismissed.
   */
  duration?: number
}

type ToasterToast = Toast & {
  id: string
  title?: string
  description?: string
  action?: Component | VNode
  open?: boolean
  // AY.W-ANIM1 (W-ANIM-FIX) — the close-request listener key. reka-ui's
  // `ToastRoot` emits `update:open` (a Vue event), so the spread-as-prop key
  // MUST be `onUpdate:open` — NOT the React shadcn `onOpenChange`, which reka
  // silently ignores (the stale-reka-binding no-op class: timer/close-X/swipe
  // all fire `update:open` but the request never reached the store while the
  // spread `open: true` kept the root controlled-open). One key revives the
  // whole dismissal surface (auto-dismiss + close-X + swipe).
  'onUpdate:open'?: (open: boolean) => void
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const toasts = ref<ToasterToast[]>([])

type ToastAction =
  | { type: 'ADD_TOAST'; toast: ToasterToast }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToasterToast> & { id: string } }
  | { type: 'DISMISS_TOAST'; toastId?: string }
  | { type: 'REMOVE_TOAST'; toastId?: string }

function dispatch(action: ToastAction) {
  switch (action.type) {
    case 'ADD_TOAST':
      toasts.value = [action.toast, ...toasts.value].slice(0, TOAST_LIMIT)
      break

    case 'UPDATE_TOAST':
      toasts.value = toasts.value.map((t) =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t
      )
      break

    case 'DISMISS_TOAST': {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        toasts.value.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      toasts.value = toasts.value.map((t) =>
        t.id === toastId || toastId === undefined
          ? {
              ...t,
              open: false,
            }
          : t
      )
      break
    }

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        toasts.value = []
      } else {
        toasts.value = toasts.value.filter((t) => t.id !== action.toastId)
      }

      break
  }
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ToastOptions = Omit<ToasterToast, 'id'>

function toast(props: ToastOptions) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })

  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      // The reka `update:open` listener — when reka requests close (auto-dismiss
      // timer, close-X, swipe-end) it emits `update:open false`, which lands here
      // and dismisses the store entry, closing the controlled root.
      'onUpdate:open': (open: boolean) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

function useToast() {
  return {
    toasts: computed(() => toasts.value),
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { toast, useToast }
