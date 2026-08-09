import { inject, provide, ref, type InjectionKey, type Ref } from "vue";
import { useDeck, useDeckSnap, type DeckCore } from "../deck";
import type { CarouselContext, CarouselEmits, CarouselProps } from "./types";

/* The carousel's provide/inject, over the substrate.
   The tween engine is gone and the surface stayed: the strip is a native
   scroll-snap container now, so momentum, rubber-banding, trackpad and touch
   scrubbing and the snap itself are the platform's, correct in both engines and
   free. What the engine bought — a `duration` number nobody could reason about,
   a plugin array, an options object, an API handle leaking onto the public
   surface, and a second motion vocabulary on a paged strip — is not bought any
   more. `loop` DIES with it: native snap cannot wrap, the core has never wrapped,
   and this is a named clean break rather than an alias.

   ONE AUTHORITY. `deck.index` is it. The predecessor ran two — the engine's
   selected snap and the model — and paid for it with a delta guard, two echo
   watchers and a mirror ref in every chrome element. None of those exist here,
   because there is nothing for them to reconcile.

   THE PROPS ARE READ AT USE, not destructured at creation. Destructuring a props
   object in a plain `.ts` factory FREEZES every value it takes — no Vue transform
   applies outside an SFC — so the predecessor's `orientation` was fixed at
   whatever it was on the first render, silently, forever. */

const CAROUSEL: InjectionKey<CarouselContext> = Symbol("glass-carousel");

export function useProvideCarousel(
    props: CarouselProps,
    emits: CarouselEmits,
    active: Ref<number>,
): CarouselContext {
    const count = ref(0);
    const viewport = ref<HTMLElement | null>(null);

    const deck: DeckCore = useDeck(count, {
        initial: active.value,
        // read at use — never destructured into a frozen local
        axis: () => props.orientation ?? "horizontal",
        onChange: (to, from) => {
            active.value = to;
            emits("change", to, from);
        },
    });

    // The inertial travel arm. It commits the settled index from the platform's
    // own snap signal and feeds the continuous channel off the same scroll.
    useDeckSnap({ strip: viewport, deck });

    const context: CarouselContext = {
        deck,
        viewport,
        setCount: (n: number) => {
            count.value = n;
        },
        get orientation() {
            return props.orientation ?? "horizontal";
        },
        get projection() {
            return props.projection ?? "none";
        },
        get pattern() {
            return props.pattern ?? "group";
        },
        get panelIds() {
            return props.panelIds;
        },
    };

    provide(CAROUSEL, context);
    return context;
}

export function useCarousel(): CarouselContext {
    const context = inject(CAROUSEL, null);
    if (!context) throw new Error("useCarousel must be used within a <Carousel />");
    return context;
}
