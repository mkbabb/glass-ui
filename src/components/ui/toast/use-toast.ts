import { ref, computed } from 'vue'
import type { Component, VNode } from 'vue'

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

export type ToastVariant = 'default' | 'destructive'

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: Component | VNode
  variant?: ToastVariant
}

type ToasterToast = Toast & {
  id: string
  title?: string
  description?: string
  action?: Component | VNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
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
      onOpenChange: (open: boolean) => {
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
