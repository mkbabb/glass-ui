// Copied from atlas (lv-atlas da0528f, src/filter/composables/useVirtualWindow.ts) for the witness.
// Changed: import paths, and the three lines marked "harness addition".
import {
    computed,
    onScopeDispose,
    ref,
    shallowRef,
    toValue,
    watch,
    type ComputedRef,
    type MaybeRefOrGetter,
} from "vue";
import {
    buildVirtualOffsets,
    resolveVirtualRange,
    roundedVirtualWidth,
    virtualMeasurementSession,
    type VirtualItem,
    type VirtualKey,
    type VirtualMeasurementSurface,
    type VirtualOffset,
} from "./virtual-window-core";
import { coalesceToFrame, type FrameCoalesced } from "./frame-coalesce";

export { buildVirtualOffsets, resolveVirtualRange } from "./virtual-window-core";
export type {
    VirtualItem,
    VirtualKey,
    VirtualMeasurementSurface,
    VirtualOffset,
} from "./virtual-window-core";

export interface UseVirtualWindowOptions<Item, Key extends VirtualKey = VirtualKey> {
    items: MaybeRefOrGetter<readonly Item[]>;
    viewport: MaybeRefOrGetter<HTMLElement | null>;
    key: (item: Item, index: number) => Key;
    /** Measurement cache identity. Omit for instance-local measurements; share deliberately to
        reuse row heights across equivalent surfaces at the same rounded width. */
    measurementSurface?: VirtualMeasurementSurface;
    estimateSize?: number;
    /** Space after each row, added to its size (harness addition, the note's step 5). */
    gap?: number;
    overscan?: { readonly before?: number; readonly after?: number };
}

export interface UseVirtualWindowReturn<Item, Key extends VirtualKey = VirtualKey> {
    items: ComputedRef<readonly VirtualItem<Item, Key>[]>;
    offsets: ComputedRef<ReadonlyMap<Key, VirtualOffset<Key>>>;
    totalSize: ComputedRef<number>;
    ariaRowCount: ComputedRef<number>;
    ensureTargetWindow(key: Key): boolean;
    observe(key: Key, element: Element): () => void;
}

/** One row-grain virtualizer: cumulative-offset binary search, 1×-before/2×-after overscan,
    resize remeasurement, and synchronous target mounting before focus. */
export function useVirtualWindow<Item, Key extends VirtualKey = VirtualKey>(
    options: UseVirtualWindowOptions<Item, Key>,
): UseVirtualWindowReturn<Item, Key> {
    const gap = options.gap ?? 0; // harness addition
    const estimate = Math.max(1, options.estimateSize ?? 40) + gap;
    const measurementSurface = options.measurementSurface ?? {};
    const sizes = shallowRef<ReadonlyMap<Key, number>>(new Map());
    const measurements = new Set<ResizeObserver>();
    const scrollTop = ref(0);
    const viewportSize = ref(0);
    let activeWidth: number | undefined;
    const layout = computed(() =>
        buildVirtualOffsets(toValue(options.items), options.key, sizes.value, estimate),
    );
    const totalSize = computed(() => layout.value.at(-1)?.bottom ?? 0);
    const offsets = computed<ReadonlyMap<Key, VirtualOffset<Key>>>(() =>
        new Map(layout.value.map((row) => [row.key, row])),
    );
    const range = computed(() => {
        const before = options.overscan?.before ?? viewportSize.value;
        const after = options.overscan?.after ?? viewportSize.value * 2;
        return resolveVirtualRange(
            layout.value,
            Math.max(0, scrollTop.value - before),
            scrollTop.value + viewportSize.value + after,
        );
    });
    const visible = computed(() => layout.value.slice(range.value[0], range.value[1]));

    onScopeDispose(() => {
        for (const observer of measurements) observer.disconnect();
        measurements.clear();
        rowCommit?.cancel();
    });

    watch(
        () => toValue(options.viewport),
        (element, _old, cleanup) => {
            if (!element) return;
            const sync = (): void => {
                const width = roundedVirtualWidth(element.clientWidth);
                if (width !== activeWidth) {
                    activeWidth = width;
                    sizes.value = new Map(
                        virtualMeasurementSession<Key>(measurementSurface, width),
                    );
                }
                scrollTop.value = element.scrollTop;
                viewportSize.value = element.clientHeight;
            };
            sync();
            element.addEventListener("scroll", sync, { passive: true });
            const observer =
                typeof ResizeObserver === "undefined" ? null : new ResizeObserver(sync);
            observer?.observe(element);
            cleanup(() => {
                element.removeEventListener("scroll", sync);
                observer?.disconnect();
            });
        },
        { immediate: true },
    );

    function ensureTargetWindow(key: Key): boolean {
        const target = offsets.value.get(key);
        const element = toValue(options.viewport);
        if (!target || !element) return false;
        if (target.top < scrollTop.value || target.bottom > scrollTop.value + viewportSize.value) {
            scrollTop.value = target.top;
            element.scrollTop = target.top;
        }
        return true;
    }

    /** Commit a batch of row sizes as ONE `sizes` update, so a batch re-lays the window once. */
    function commit(batch: Iterable<readonly [Key, number]>): void {
        let next: Map<Key, number> | null = null;
        for (const [key, size] of batch) {
            if (!(size > 0) || (next ?? sizes.value).get(key) === size) continue;
            next ??=
                activeWidth == null
                    ? new Map(sizes.value)
                    : virtualMeasurementSession<Key>(measurementSurface, activeWidth);
            next.set(key, size);
        }
        if (next) sizes.value = new Map(next);
    }

    // ONE observer for every mounted row (U/B8r DV-3). An observer per row is a callback per row,
    // and the browser runs a microtask checkpoint after each callback: every row's commit then
    // re-rendered the window on its own, all inside one frame. The /bead provider table's phone open
    // read 96-203 ms at 4x CPU with 20 mounted rows. One observer delivers a frame's resizes as one
    // batch, committed once.
    const targets = new Map<Element, Key>();
    let rowObserver: ResizeObserver | null = null;
    let rowCommit: FrameCoalesced | null = null;
    function observer(): ResizeObserver {
        if (rowObserver) return rowObserver;
        // Commit the BORDER box (as the section-window observer's own `borderBoxSize` read does).
        // The row is stacked by its full visual height — its `border-block-end` rule included — so
        // the border box is the correct measure. Reading `contentRect` (the CONTENT box, one border
        // shorter) once disagreed with a border-box seed, and `sizes` flip-flopped forever.
        // The batch commits on the next frame, never inside the delivery (P6-motion-15): a commit
        // re-lays the window, which resized observed rows in the same delivery, and WebKit raised the
        // ResizeObserver loop error. Sizes delivered before the frame fold into one commit.
        const delivered = new Map<Key, number>();
        const commitOnFrame = coalesceToFrame(() => {
            const batch = [...delivered];
            delivered.clear();
            commit(batch);
        });
        rowCommit = commitOnFrame;
        rowObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const key = targets.get(entry.target);
                if (key === undefined) continue;
                delivered.set(key, (entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height) + gap); // harness addition
            }
            if (delivered.size) commitOnFrame();
        });
        measurements.add(rowObserver);
        return rowObserver;
    }

    // A row's size comes from the observer's first delivery, which the browser makes after its own
    // layout and before paint. `observe` reads no layout: the DataTable calls `row-ref` while it is
    // still inserting rows, so a `getBoundingClientRect` seed here forced one layout per row
    // (2-5 ms each at 4x CPU, 30 rows on the /bead open).
    function observe(key: Key, element: Element): () => void {
        if (typeof ResizeObserver === "undefined") return () => undefined;
        const rows = observer();
        targets.set(element, key);
        rows.observe(element);
        return (): void => {
            if (targets.get(element) !== key) return;
            targets.delete(element);
            rows.unobserve(element);
        };
    }

    return {
        items: visible,
        offsets,
        totalSize,
        ariaRowCount: computed(() => toValue(options.items).length),
        ensureTargetWindow,
        observe,
    };
}
