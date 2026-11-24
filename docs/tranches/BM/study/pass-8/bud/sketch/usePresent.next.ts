// BM pass 8 (Q11; DESIGN §10.4): glass-ui's own presence for a portalled overlay, a design sketch, not library source.
// reka's `usePresence` waits only on `animationName`, so 11.1.1 holds every popup's transition exit open with a keyframe
// that paints nothing (`glass-reveal-hold`, reveal.css:201-207, animations.css:171-175), and Dialog and Sheet hand
// unmounting to a JS spring (`useSpringMount`). Both are ways round reka. reka's own idiom for an outside animation is
// `forceMount`: glass-ui keeps the content mounted while `present` is true and decides `present` itself. It mounts on
// open; on close it waits for the element's running animations, CSS transitions included (`Element.getAnimations()`,
// Safari 13.1), then unmounts; a reopen during the exit turns the same transitions round and cancels the unmount
// (P0a rule 6). Nothing is written per frame and no keyframe is held.
import { ref, watch, type Ref } from "vue";

export function usePresent(open: Readonly<Ref<boolean>>, el: Readonly<Ref<HTMLElement | null>>) {
    const present = ref(open.value);
    let closing = 0;
    watch(open, async (isOpen) => {
        const me = ++closing;
        if (isOpen) { present.value = true; return; }
        const node = el.value;
        if (!node) { present.value = false; return; }
        await new Promise(requestAnimationFrame); // the closed state's transitions have started
        await Promise.allSettled(node.getAnimations({ subtree: true }).map((a) => a.finished));
        if (me === closing && !open.value) present.value = false;
    });
    return present; // bound as `:force-mount="present"` on reka's content, under `v-if="present"`
}
