import { defineComponent, h, type VNode } from "vue";
import DockIconButton from "./DockIconButton.vue";

export { default as GlassDock } from "./GlassDock.vue";
export { default as DockPopover } from "./DockPopover.vue";
export { default as DockLayerGroup } from "./DockLayerGroup.vue";
export { default as DockLayer } from "./DockLayer.vue";
export { default as DockIconButton } from "./DockIconButton.vue";
export { default as DockTabButton } from "./DockTabButton.vue";
export { default as DockSelectTrigger } from "./DockSelectTrigger.vue";
export { default as DockDropdownTrigger } from "./DockDropdownTrigger.vue";

/**
 * One action inside a dock action bar. Icons are accepted as VNodes so
 * consumers can pass any rendered Lucide / SVG glyph; the factory does
 * not own icon rendering.
 */
export interface DockActionBarAction {
    label: string;
    icon?: VNode;
    onClick: () => void;
}

export interface DockActionBarOptions {
    label: string;
    icon: VNode | string;
    actions: Array<DockActionBarAction>;
    /** Optional accent color forwarded as `--dock-action-accent`. */
    accentColor?: string;
}

/**
 * `defineDockActionBar({...})` — bake an action-bar configuration into a
 * named Vue component. Closes synthesis gap #41 (3 watcher hooks per
 * consumer site) by promoting the action-bar shape from a per-consumer
 * recipe to a glass-ui-canonical factory.
 *
 * Returns a `defineComponent`; render directly:
 *
 * ```ts
 * const ToolBar = defineDockActionBar({ label, icon, actions });
 * // <ToolBar />
 * ```
 */
export function defineDockActionBar(options: DockActionBarOptions) {
    const { label, icon, actions, accentColor } = options;
    return defineComponent({
        name: "DockActionBar",
        setup() {
            return () =>
                h(
                    "div",
                    {
                        class: "dock-action-bar",
                        role: "toolbar",
                        "aria-label": label,
                        style: accentColor
                            ? { "--dock-action-accent": accentColor }
                            : undefined,
                    },
                    [
                        h(
                            "span",
                            { class: "dock-action-bar__lead", "aria-hidden": "true" },
                            [typeof icon === "string" ? icon : icon],
                        ),
                        ...actions.map((action) =>
                            h(
                                DockIconButton,
                                {
                                    key: action.label,
                                    "aria-label": action.label,
                                    title: action.label,
                                    onClick: action.onClick,
                                },
                                () => (action.icon ? [action.icon] : [action.label]),
                            ),
                        ),
                    ],
                );
        },
    });
}
