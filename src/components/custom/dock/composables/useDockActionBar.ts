/**
 * Generic dock action bar system.
 *
 * Any view can provide a DockActionBar — a list of actions with icons,
 * titles, and callbacks. The dock renders them as dock-icon-btn buttons.
 */

import type { Component, InjectionKey, Ref } from "vue";

export interface DockAction {
    key: string;
    icon: Component;
    title: string;
    description: string;
    rotateOnClick?: boolean;
    iconClass?: string;
    disabled?: boolean;
    handler: () => void;
}

export interface DockActionBar {
    /** The label shown next to the Tools toggle button */
    label: string;
    /** Icon for the Tools toggle */
    icon: Component;
    /** Accent color for the action bar */
    accentColor?: string;
    /** The actions to display in the dock */
    actions: Ref<DockAction[]>;
}

export const DOCK_ACTION_BAR_KEY: InjectionKey<Ref<DockActionBar | null>> =
    Symbol("dockActionBar");
