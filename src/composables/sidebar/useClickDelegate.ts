/**
 * Delegated scroll-target click handling — ONE listener on the container that
 * `closest(selector)`-matches a click, reads the configured attribute, resolves
 * it to a scroll id, and calls `scrollTo(id)`. The single delegated handler for
 * an entire ToC (not N per-link listeners). Composes `useScrollTo`'s `scrollTo`
 * (the consumer passes it in).
 */
import { onMounted, onUnmounted } from "vue";
import type { ClickDelegateOptions } from "./types";

export function useClickDelegate(options: ClickDelegateOptions) {
    const selector = options.selector ?? "[data-scroll-target]";
    const attribute = options.attribute ?? "data-scroll-target";

    function handleClick(e: MouseEvent) {
        const target = (e.target as HTMLElement).closest<HTMLElement>(selector);
        if (!target) return;
        e.preventDefault();
        const value = target.getAttribute(attribute);
        if (!value) return;
        const id = options.resolve(value);
        if (id) options.scrollTo(id);
    }

    onMounted(() => {
        const el = options.container.value;
        if (el) el.addEventListener("click", handleClick);
    });

    onUnmounted(() => {
        const el = options.container.value;
        if (el) el.removeEventListener("click", handleClick);
    });

    return { handleClick };
}
