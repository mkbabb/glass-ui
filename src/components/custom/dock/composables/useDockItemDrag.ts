/* useDockItemDrag — the draggable dock-ITEMS axis (BD.W-DOCK-CORE A12).
 *
 * The iOS-27 grab-an-item-and-pull gesture on the dock's icon controls (the
 * SegmentedTabs `:draggable` precedent applied to a dock row). The user grabs a dock
 * item, it follows the pointer ~1:1 with a volume-preserving gel-squish, and on release
 * flings velocity-continuously to the nearest slot — a live REORDER.
 *
 * THE NO-FORK DISCIPLINE — the gesture COMPOSES the shipped motion primitives, mints no
 * new clock and no second drag engine: the follow is a direct pointer-capture translate
 * (compositor-only `transform`), the squish is the SHARED `useLiquidFlex` "tanh" velocity
 * register (capped LOW — swells, never taffy-pulls), and the release settle rides a
 * `SpringProgress` on the SAME re-tuned `DOCK_SPRING` register the dock morph uses (the
 * weighty inertial iOS-27 clock — ONE spring family, never a new one). The reorder is a
 * single-commit DOM move + an `onReorder` emit.
 *
 * Compositor-only (the follow + fling are `transform: translate`, the squish is `scale`
 * via `--stretch` — never a layout property; `proof:no-layout-animation` holds). PRM-safe
 * (the gesture still FUNCTIONS — drag follows, snap commits — but the squish is OFF and the
 * release is an instant nearest-snap, via `SpringProgress.respectReducedMotion` + the
 * `useLiquidFlex` PRM read). The roving-tabindex keyboard contract on the dock controls is
 * untouched (this adds a POINTER affordance beside it).
 */
import { onBeforeUnmount, ref, watch, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { useLiquidFlex } from "../../../../composables/motion/useLiquidFlex";
import { springPreset } from "../../../../composables/motion/springPresets";

export interface UseDockItemDragParams {
    /** The dock root element (the items live in its active layer). */
    rootEl: Ref<HTMLElement | null>;
    /** Whether the axis is armed (the `:draggable-items` prop). May be a getter. */
    enabled: () => boolean;
    /** The morph axis (`"x"` horizontal · `"y"` vertical). A getter (orientation flips). */
    axis: () => "x" | "y";
    /** Fired once on settle with the committed (from, to) item indices. */
    onReorder?: (from: number, to: number) => void;
}

export interface UseDockItemDragReturn {
    /** True while a dock item is being dragged. */
    dragging: Readonly<Ref<boolean>>;
    /** Tear down the gesture + listeners. */
    detach: () => void;
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/** The draggable item set in the active layer (marked items, else every icon button). */
function resolveItems(root: HTMLElement | null): HTMLElement[] {
    if (!root) return [];
    const layer =
        root.querySelector<HTMLElement>(".dock-layer.is-active") ?? root;
    const marked = Array.from(
        layer.querySelectorAll<HTMLElement>("[data-dock-draggable]"),
    );
    if (marked.length) return marked;
    return Array.from(layer.querySelectorAll<HTMLElement>(".dock-icon-button"));
}

export function useDockItemDrag(
    params: UseDockItemDragParams,
): UseDockItemDragReturn {
    const dragging = ref(false);

    // The grabbed item + its starting slot index.
    let grabbed: HTMLElement | null = null;
    let grabbedIndex = -1;
    let grabbedToIndex = -1;
    // The slot centers on the morph axis (client space), measured at grab time.
    let slotCenters: number[] = [];
    // The pointer-down anchor + the grabbed item's own start center (the follow origin).
    let pointerStart = 0;
    let itemStartCenter = 0;
    let activePointerId: number | null = null;
    // The post-release fling state — the easing of the item onto its target slot.
    let flingActive = false;
    let flingFromOffset = 0;
    let flingTargetCenter = 0;

    // The squish — the SHARED `useLiquidFlex` "tanh" velocity register, capped LOW.
    // Driven off the normalized follow offset so a fast pull swells the plate (capped),
    // a slow drag barely deforms it. ONE squish source (no forked deformation math).
    const liquid = useLiquidFlex({
        from: 0,
        to: 1,
        axis: "width",
        squishLaw: "tanh",
        maxStretch: () => 1.12,
    });

    // The release settle — a SpringProgress on the DOCK register (the weighty inertial
    // iOS-27 clock the dock morph rides; NEVER a new spring). Lazy: minted on the first
    // real grab so a never-dragged dock counts ZERO springs.
    const { response, dampingFraction } = springPreset("dock");
    let spring: SpringProgress | null = null;
    let unsub: (() => void) | null = null;

    function ensureSpring(): SpringProgress {
        if (spring) return spring;
        const s = new SpringProgress({ response, dampingFraction, respectReducedMotion: true });
        spring = s;
        unsub = s.subscribe((v: number) => {
            // `v` runs 0→1 over the fling; the visible offset eases from the release
            // offset toward 0 (the item lands on its target slot, then the DOM move +
            // the reorder commit fire on settle).
            if (grabbed && dragging.value === false && flingActive) {
                const offset = (1 - v) * flingFromOffset;
                writeTransform(grabbed, offset);
                if (!(prefersReducedMotion())) liquid.drive(Math.min(1, v));
                if (s.settled) {
                    flingActive = false;
                    finishFling();
                }
            }
        });
        s.play(() => {});
        return s;
    }

    function axisCenter(el: HTMLElement, isX: boolean): number {
        const r = el.getBoundingClientRect();
        return isX ? r.left + r.width / 2 : r.top + r.height / 2;
    }

    function writeTransform(el: HTMLElement, offset: number): void {
        const isX = params.axis() === "x";
        el.style.transform = isX
            ? `translateX(${offset}px)`
            : `translateY(${offset}px)`;
        // The squish rides `--stretch` on the grabbed item (the dock-icon plate reads
        // `scale: var(--stretch) calc(1/var(--stretch))` via the shared liquid register).
        el.style.setProperty(
            "--stretch",
            prefersReducedMotion() ? "1" : `${liquid.stretch.value}`,
        );
    }

    function clearTransform(el: HTMLElement): void {
        el.style.transform = "";
        el.style.removeProperty("--stretch");
        el.classList.remove("glass-drag-lift");
        el.style.removeProperty("z-index");
        el.style.removeProperty("position");
    }

    function onPointerDown(event: PointerEvent): void {
        if (!params.enabled() || dragging.value || flingActive) return;
        const root = params.rootEl.value;
        if (!root) return;
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
            "[data-dock-draggable], .dock-icon-button",
        );
        if (!target || !root.contains(target)) return;

        const items = resolveItems(root);
        const index = items.indexOf(target);
        if (index < 0) return;

        const isX = params.axis() === "x";
        slotCenters = items.map((el) => axisCenter(el, isX));
        grabbed = target;
        grabbedIndex = index;
        itemStartCenter = slotCenters[index];
        pointerStart = isX ? event.clientX : event.clientY;
        activePointerId = event.pointerId;
        dragging.value = true;

        target.classList.add("glass-drag-lift");
        target.style.position = "relative";
        target.style.zIndex = "20";
        try {
            target.setPointerCapture(event.pointerId);
        } catch {
            // fail-explicit: setPointerCapture is a BEFITTING optional — an engine
            // without pointer-capture support throws here, and the window-level
            // pointermove/up listeners still track the gesture to completion. The
            // capture is a refinement, never a liability; surfacing would be noise.
        }
        event.preventDefault();
    }

    function onPointerMove(event: PointerEvent): void {
        if (!dragging.value || !grabbed) return;
        if (activePointerId != null && event.pointerId !== activePointerId) return;
        const isX = params.axis() === "x";
        const pointer = isX ? event.clientX : event.clientY;
        const offset = pointer - pointerStart;
        // Drive the squish off the normalized travel (a fast pull swells, capped).
        if (!prefersReducedMotion()) {
            liquid.drive(Math.min(1, Math.abs(offset) / 120));
        }
        writeTransform(grabbed, offset);
    }

    function nearestSlotIndex(currentCenter: number): number {
        let best = grabbedIndex;
        let bestDist = Infinity;
        slotCenters.forEach((c, i) => {
            const d = Math.abs(c - currentCenter);
            if (d < bestDist) {
                bestDist = d;
                best = i;
            }
        });
        return best;
    }

    function onPointerUp(event: PointerEvent): void {
        if (!dragging.value || !grabbed) return;
        if (activePointerId != null && event.pointerId !== activePointerId) return;
        dragging.value = false;
        const isX = params.axis() === "x";
        const pointer = isX ? event.clientX : event.clientY;
        const releaseOffset = pointer - pointerStart;
        const releaseCenter = itemStartCenter + releaseOffset;

        const toIndex = nearestSlotIndex(releaseCenter);
        flingTargetCenter = slotCenters[toIndex];
        // The fling eases the item from its release offset to its target-slot offset.
        flingFromOffset = releaseCenter - flingTargetCenter;
        grabbedToIndex = toIndex;

        if (prefersReducedMotion()) {
            // Instant nearest-snap — the gesture confirms, the physics off.
            flingActive = false;
            if (grabbed) writeTransform(grabbed, 0);
            finishFling();
            return;
        }
        flingActive = true;
        const s = ensureSpring();
        s.reset(0, 0);
        s.target = 1;
    }

    function finishFling(): void {
        const root = params.rootEl.value;
        const from = grabbedIndex;
        const to = grabbedToIndex;
        const moving = grabbed;
        if (moving) clearTransform(moving);
        if (root && moving && from >= 0 && to >= 0 && from !== to) {
            const items = resolveItems(root);
            const refEl = items[to];
            if (refEl && moving.parentElement) {
                const parent = moving.parentElement;
                if (from < to) parent.insertBefore(moving, refEl.nextSibling);
                else parent.insertBefore(moving, refEl);
                params.onReorder?.(from, to);
            }
        }
        grabbed = null;
        grabbedIndex = -1;
        grabbedToIndex = -1;
    }

    // Window-level move/up so the gesture tracks even when the pointer leaves the item.
    function bindWindow(): void {
        if (typeof window === "undefined") return;
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
    }
    function unbindWindow(): void {
        if (typeof window === "undefined") return;
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
    }

    const stop = watch(
        () => [params.rootEl.value, params.enabled()] as const,
        ([root, on], _prev, onCleanup) => {
            if (root && on) {
                root.addEventListener("pointerdown", onPointerDown);
                bindWindow();
                onCleanup(() => {
                    root.removeEventListener("pointerdown", onPointerDown);
                    unbindWindow();
                });
            }
        },
        { immediate: true },
    );

    function detach(): void {
        stop();
        unbindWindow();
        unsub?.();
        spring = null;
    }

    onBeforeUnmount(detach);

    return { dragging, detach };
}
