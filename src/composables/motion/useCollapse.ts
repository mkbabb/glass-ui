import { computed, ref, type ComputedRef, type Ref } from "vue";

export interface UseCollapseOptions {
    /** Animation axis. `"y"` collapses height; `"x"` collapses width. Default `"y"`. */
    axis?: "x" | "y";
    /**
     * Initial collapsed state. Default `false` (open). The returned `collapsed`
     * ref is mutable; consumers may call `toggle` / `open` / `close` or set the
     * ref directly.
     */
    initialCollapsed?: boolean;
}

export interface UseCollapseStyle {
    maxWidth?: string;
    maxHeight?: string;
    opacity: number;
    overflow: string;
}

export interface UseCollapseReturn {
    /** Mutable collapsed state. */
    collapsed: Ref<boolean>;
    /** Inline style derived from `collapsed` and `axis`; bind via `:style`. */
    style: ComputedRef<UseCollapseStyle>;
    /** Flip `collapsed`. */
    toggle: () => void;
    /** Set `collapsed = false`. */
    open: () => void;
    /** Set `collapsed = true`. */
    close: () => void;
}

/**
 * `useCollapse` — extracts the axis-aware collapse pattern from the dock
 * transition machinery for reuse on plain elements (panels, cards, drawers).
 * Returns a `collapsed` ref, a derived `style` object, and toggle helpers.
 *
 * The derived style sets the chosen axis (`maxHeight` for `y`,
 * `maxWidth` for `x`) to `0` when collapsed and `100%` when open; opacity
 * follows the same gate. Consumers compose this with a CSS transition on
 * `max-height`/`max-width`/`opacity`.
 */
export function useCollapse(options: UseCollapseOptions = {}): UseCollapseReturn {
    const axis = options.axis ?? "y";
    const collapsed = ref(options.initialCollapsed ?? false);

    const style = computed<UseCollapseStyle>(() => {
        const open = !collapsed.value;
        const dimValue = open ? "100%" : "0";
        const base: UseCollapseStyle = {
            opacity: open ? 1 : 0,
            overflow: "hidden",
        };
        if (axis === "x") base.maxWidth = dimValue;
        else base.maxHeight = dimValue;
        return base;
    });

    function toggle(): void {
        collapsed.value = !collapsed.value;
    }
    function open(): void {
        collapsed.value = false;
    }
    function close(): void {
        collapsed.value = true;
    }

    return { collapsed, style, toggle, open, close };
}
