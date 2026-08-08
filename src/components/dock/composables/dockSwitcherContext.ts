import type { Ref } from "vue";
import { createOptionalContext } from "../../../composables/context";

/**
 * The dock switcher tablist context.
 *
 * `<DockLayerGroup>` provides it so a `<DockLayer>` face can complete the APG
 * tablist↔tabpanel linkage: the switcher's `role="tab"` buttons `aria-controls` a face,
 * and each face is the matching `role="tabpanel"` with a stable `id` +
 * `aria-labelledby` back to its tab. The id derivation lives HERE (once), keyed off a
 * group-level uid, so the tab side (`DockLayerGroup`) and the panel side (`DockLayer`)
 * mint the SAME strings with no shared literal.
 *
 * `isTablist` is reactive because the switcher only renders as a tablist when it actually
 * paints (`showSwitcher && >1 face`) — that is not known until faces register. A face
 * reads it to decide whether to BECOME a tabpanel: absent (the controlled-no-switcher
 * `<DockCrossfade>` case, or a 0/1-face group), the face carries no panel role, so a
 * dangling `aria-labelledby` to a tab that does not exist is never minted.
 */
export interface DockSwitcherContext {
    /** True while the switcher renders as an APG tablist (`showSwitcher && >1 face`). */
    isTablist: Readonly<Ref<boolean>>;
    /** The switcher tab button's id for a face id — the panel's `aria-labelledby` target. */
    tabId: (faceId: string) => string;
    /** The face panel's id for a face id — the tab's `aria-controls` target. */
    panelId: (faceId: string) => string;
}

const ctx = createOptionalContext<DockSwitcherContext>("glass-ui:dock-switcher-tablist");

export const { KEY: DOCK_SWITCHER_KEY } = ctx;

export function provideDockSwitcherContext(context: DockSwitcherContext): void {
    ctx.provide(context);
}

/** Befitting-silent — `null` when a face is not inside a tablist switcher. */
export const useDockSwitcherContext = ctx.use;
