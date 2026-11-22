// A card's substrate draws for a moment after it mounts, then parks; it runs again
// while its card is hovered or holds focus.
import { computed, onBeforeUnmount, onMounted, ref, type ComputedRef, type Ref } from "vue";

const WARM_MS = 1600;

export function useCardRun(el: Ref<HTMLElement | null>): ComputedRef<boolean> {
    const warming = ref(true);
    const awake = ref(false);
    let card: HTMLElement | null = null;
    let timer = 0;
    let frame = 0;

    const sync = (): void => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            awake.value = !!card && (card.matches(":hover") || card.matches(":focus-within"));
        });
    };
    const EVENTS = ["pointerenter", "pointerleave", "focusin", "focusout"] as const;

    onMounted(() => {
        timer = window.setTimeout(() => (warming.value = false), WARM_MS);
        card = el.value?.closest<HTMLElement>("[data-story-card]") ?? null;
        for (const e of EVENTS) card?.addEventListener(e, sync);
    });
    onBeforeUnmount(() => {
        window.clearTimeout(timer);
        cancelAnimationFrame(frame);
        for (const e of EVENTS) card?.removeEventListener(e, sync);
    });

    return computed(() => warming.value || awake.value);
}
