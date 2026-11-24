// BM pass 9, corrected from pass 8 (folds A8-2, B8-2; DESIGN §10.4 item 1): glass-ui's own presence for a portalled
// overlay, a design sketch, not library source.
// reka's `usePresence` waits only on `animationName`, so 11.1.1 holds every popup's transition exit open with a keyframe
// that paints nothing, and Dialog and Sheet hand unmounting to a JS spring (`useSpringMount`). reka's own idiom for an
// outside animation is `forceMount`: glass-ui keeps the content mounted while `present` is true and decides `present`
// itself. On close it waits for the exit's own legs and nothing else:
//   - the content node's own animations and transitions, never its subtree's, so a busy ring, a Skeleton's shimmer or a
//     StatusDot inside the overlay (all `infinite`) does not hold it (pass 8 waited on the subtree and never unmounted);
//   - finite ones only (an effect whose computed end time is finite);
//   - and no longer than the latest of those ends plus two frames, so a paused or stalled leg cannot hold it either.
// Then it unmounts, and reka drops `hideOthers` and the body's `pointer-events: none` with it (DialogContentModal.js:52-53,
// DismissableLayer.js:86-93). A reopen during the exit turns the same transitions round and cancels the unmount (P0a
// rule 6). Nothing is written per frame and no keyframe is held.
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
        const legs = node.getAnimations().filter((a) => Number.isFinite(Number(a.effect?.getComputedTiming().endTime)));
        const end = Math.max(0, ...legs.map((a) => Number(a.effect!.getComputedTiming().endTime) - Number(a.currentTime ?? 0)));
        await Promise.race([
            Promise.allSettled(legs.map((a) => a.finished)),
            new Promise((r) => setTimeout(r, end + 34)),
        ]);
        if (me === closing && !open.value) present.value = false;
    });
    return present; // bound as `:force-mount="present"` on reka's content, under `v-if="present"`
}
