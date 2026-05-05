import { type VariantProps, cva } from 'class-variance-authority'

export { default as Toast } from './Toast.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as Toaster } from './Toaster.vue'
export { toast, useToast } from './use-toast'
export type { Toast as ToastType, ToastVariant } from './use-toast'

// Toast surface CVA. `default` keeps the existing background/foreground;
// `destructive` is the existing destructive recipe; `inverse` flips to the
// foreground surface for high-contrast notifications.
export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-6 pr-8 shadow-lg transition-[opacity,transform] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive',
        inverse: 'bg-foreground text-background border-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type ToastVariants = VariantProps<typeof toastVariants>
