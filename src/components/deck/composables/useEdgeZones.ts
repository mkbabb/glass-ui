import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/* useEdgeZones — arm the stage's edge affordances for a FINE pointer only.
   A presentation shows its previous/next arrows when the mouse approaches an edge
   and hides them the rest of the time, which is the correct behaviour for a mouse
   and exactly wrong for a finger: a touch pointer has no hover, so an edge-armed
   control is either permanently on or permanently unreachable. The arming is
   therefore gated on `(pointer: fine)`, and a coarse pointer keeps its controls
   visible by never arming this at all.

   Content-free: it publishes two booleans and owns no DOM. */

export interface UseEdgeZonesOptions {
    /** The edge band width, as a fraction of the host's inline size. Default 0.12. */
    band?: number;
    /** The minimum band in px, so a narrow stage still has a reachable edge. Default 64. */
    minBand?: number;
}

export interface UseEdgeZones {
    /** The pointer is inside the leading edge band. */
    atStart: Ref<boolean>;
    /** The pointer is inside the trailing edge band. */
    atEnd: Ref<boolean>;
}

export function useEdgeZones(
    host: Ref<HTMLElement | null>,
    options: UseEdgeZonesOptions = {},
): UseEdgeZones {
    const band = options.band ?? 0.12;
    const minBand = options.minBand ?? 64;
    const atStart = ref(false);
    const atEnd = ref(false);

    function fine(): boolean {
        return (
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(pointer: fine)").matches
        );
    }

    function move(e: PointerEvent): void {
        const el = host.value;
        if (!el || !fine()) return;
        const box = el.getBoundingClientRect();
        const width = Math.max(1, Math.min(box.width * band, box.width / 2));
        const zone = Math.max(width, Math.min(minBand, box.width / 2));
        const x = e.clientX - box.left;
        atStart.value = x >= 0 && x <= zone;
        atEnd.value = x >= box.width - zone && x <= box.width;
    }

    function leave(): void {
        atStart.value = false;
        atEnd.value = false;
    }

    onMounted(() => {
        const el = host.value;
        if (!el) return;
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
    });
    onBeforeUnmount(() => {
        const el = host.value;
        if (!el) return;
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
    });

    return { atStart, atEnd };
}
