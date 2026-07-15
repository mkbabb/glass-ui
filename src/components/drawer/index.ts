// BB.W-DRAWER-ABROGATE — the Drawer family on the HOUSE reka headless substrate.
// vaul-vue is ABROGATED: the three primitives that used to re-export straight from
// the foreign tree are now house wrappers over reka `DialogTrigger`/`DialogClose`/
// `DialogPortal` (the SAME vueuse-free substrate every other compound wrapper binds).
// The `as-child`/`as-child` trigger contract is reka-native, so the trigger/close/
// portal pass-through is byte-identical for the consumer.
export {
    DialogPortal as DrawerPortal,
    DialogTrigger as DrawerTrigger,
    DialogClose as DrawerClose,
} from "reka-ui";

/**
 * Drawer drag/slide direction (BB.W-DRAWER-ABROGATE). `bottom` (default) + `top`
 * are the peek/half/full bottom-sheet axes; `left`/`right` are the side-lens
 * full-slide axes. The house snap engine (`useDrawerSnap`) resolves the default
 * detent ladder FROM this (BB-2): bottom/top → `[0.12, 0.5, 1]`, left/right →
 * a full-slide (no detents).
 */
export type DrawerDirection = "top" | "bottom" | "left" | "right";

/**
 * Drawer presentation mode (AN.W3). `"modal"` is the default iOS scale-down sheet —
 * focus-trapped (reka `:modal="true"`), page-behind scaled. `"live-behind"` is the
 * non-modal peek/half/full bottom sheet — reka `:modal="false"` (no focus trap, no
 * page `aria-hidden`, page-behind at native size + interactive) — bundling the
 * `modal:false` + `stage:"none"` + the direction-derived snap ladder. Explicit props
 * still override the mode's defaults.
 */
export type DrawerMode = "modal" | "live-behind";

/**
 * BD.W-OVERLAY-STAGE-COUPLE — the honest scene-staging enum. `none` leaves the page
 * untouched; `dim` deepens the scrim only (the PRM-safe luminance depth cue); `scale`
 * recedes +
 * scales the page (the iOS card-recede); `immersive` adds the backdrop-blur engage.
 * `modal` defaults to `scale`; `live-behind` to `none`. PRM degrades `scale`/
 * `immersive` to `dim`. All four couplings ride the ONE `--stage-t` scalar the snap
 * engine writes at `:root`.
 */
export type DrawerStage = "none" | "dim" | "scale" | "immersive";

export { default as Drawer } from "./Drawer.vue";
export { default as DrawerContent } from "./DrawerContent.vue";
export { default as DrawerHeader } from "./DrawerHeader.vue";
export { default as DrawerFooter } from "./DrawerFooter.vue";
export { default as DrawerTitle } from "./DrawerTitle.vue";
export { default as DrawerDescription } from "./DrawerDescription.vue";
