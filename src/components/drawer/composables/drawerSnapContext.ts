// BB.W-DRAWER-ABROGATE — the Drawer snap-engine DI seam.
//
// `<Drawer>` (the reka `DialogRoot` host) owns the snap state (the resolved
// detent ladder, the open ref, the live snap-fraction scalar + its writeback) and
// PROVIDES it; `<DrawerContent>` injects it to bind the drag gesture + read the
// `--glass-drawer-t` transform. ONE registry — `<DrawerContent>` owns no shadow of
// the snap state (the dock-rail one-registry discipline).

import type { Ref } from "vue";
import { createOptionalContext } from "../../../composables/context";
import { DRAWER_SNAP_LABEL } from "../constants";
import type { DrawerDirection, DrawerMode, DrawerStage } from "../index";

/**
 * The snap seam the root provides + the content consumes. The root resolves the
 * effective ladder (consumer `snapPoints` ?? the direction-derived default) + the
 * direction; the content binds the drag gesture against it. The read-only refs
 * (`snapPoints`/`direction`) are root-derived computeds; `open`/`activeSnapPoint`
 * are writable so the engine round-trips the open-control + the snap-fraction.
 */
export interface DrawerSnapContext {
    /** The drawer's open state (mirrors the reka root's `v-model:open`). */
    open: Ref<boolean>;
    /** The resolved detent ladder (fractions 0..1; empty = full-slide side-lens). */
    snapPoints: Readonly<Ref<readonly number[]>>;
    /** The drag/slide axis. */
    direction: Readonly<Ref<DrawerDirection>>;
    /** The root presentation mode; the content owns the mode-specific layer contract. */
    mode: Readonly<Ref<DrawerMode>>;
    /** The PRM-resolved scene-staging register. */
    stage: Readonly<Ref<DrawerStage>>;
    /** This Drawer's nearest consumer-owned stage wrapper. */
    wrapperEl: Ref<HTMLElement | null>;
    /** This Drawer's own portaled scrim. */
    scrimEl: Ref<HTMLElement | null>;
    /** The live active detent fraction (the `v-model:active-snap-point` writeback). */
    activeSnapPoint: Ref<number | string | null>;
}

const ctx = createOptionalContext<DrawerSnapContext>(DRAWER_SNAP_LABEL);

export const { KEY: DRAWER_SNAP_KEY } = ctx;

export function provideDrawerSnapContext(context: DrawerSnapContext): void {
    ctx.provide(context);
}

/**
 * Befitting-silent — returns `null` for a `<DrawerContent>` rendered outside a
 * `<Drawer>` (a misuse the optional context renders bare for, rather than throwing).
 */
export const useOptionalDrawerSnapContext = ctx.use;
