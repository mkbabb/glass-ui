// V.W2 T4 — empty-wrapper decisions:
// Dialog / DialogTrigger / DialogClose are pure forwarding wrappers around
// reka-ui's DialogRoot / DialogTrigger / DialogClose. Per B3 §2.6: Vue SFCs
// cannot be 1-line re-exports (only `.ts` files can do non-component default
// exports), so the 3-line wrapper IS the floor. Decision: KEEP all three —
// the typed prop+emit forwarding via useForwardPropsEmits IS scope-providing
// behaviour, and excising would require breaking the SFC import path.
export { default as Dialog, type DialogProps } from "./Dialog.vue";
export { default as DialogClose, type DialogCloseProps } from "./DialogClose.vue";
export { default as DialogTrigger, type DialogTriggerProps } from "./DialogTrigger.vue";
export { default as DialogHeader } from "./DialogHeader.vue";
export { default as DialogTitle, type DialogTitleProps } from "./DialogTitle.vue";
export {
    default as DialogDescription,
    type DialogDescriptionProps,
} from "./DialogDescription.vue";
export { default as DialogContent, type DialogContentProps } from "./DialogContent.vue";
export { default as DialogFooter } from "./DialogFooter.vue";
