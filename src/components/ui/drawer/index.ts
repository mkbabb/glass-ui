export { DrawerPortal, DrawerTrigger, DrawerClose } from 'vaul-vue'

/**
 * Drawer presentation mode (AN.W3). `"modal"` is the default iOS scale-down
 * sheet (focus-trapped, page `aria-hidden`, page-behind scaled). `"live-behind"`
 * is the non-modal peek/half/full bottom sheet — no focus trap, no page
 * `aria-hidden`, page-behind at native size — bundling the
 * `modal:false` + `shouldScaleBackground:false` + `snapPoints:[0.12,0.5,1]`
 * defaults. Explicit props still override the mode's defaults.
 */
export type DrawerMode = 'modal' | 'live-behind'

export { default as Drawer } from './Drawer.vue'
export { default as DrawerOverlay } from './DrawerOverlay.vue'
export { default as DrawerContent } from './DrawerContent.vue'
export { default as DrawerHeader } from './DrawerHeader.vue'
export { default as DrawerFooter } from './DrawerFooter.vue'
export { default as DrawerTitle } from './DrawerTitle.vue'
export { default as DrawerDescription } from './DrawerDescription.vue'
