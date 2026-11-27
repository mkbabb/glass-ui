// Copied unchanged from atlas (lv-atlas da0528f, src/filter/composables/virtual-window-core.ts) for the witness.
export type VirtualKey = string | number;

export interface VirtualOffset<Key extends VirtualKey = VirtualKey> {
    readonly key: Key;
    readonly index: number;
    readonly top: number;
    readonly bottom: number;
}

export interface VirtualItem<Item, Key extends VirtualKey = VirtualKey>
    extends VirtualOffset<Key> {
    readonly item: Item;
}

export type VirtualMeasurementSurface = object | string;
type WidthSessions = Map<number, Map<VirtualKey, number>>;

const objectSessions = new WeakMap<object, WidthSessions>();
const namedSessions = new Map<string, WidthSessions>();

export function roundedVirtualWidth(width: number): number {
    return Math.max(0, Math.round(Number.isFinite(width) ? width : 0));
}

/** One session bucket per stable surface and rounded layout width. */
export function virtualMeasurementSession<Key extends VirtualKey>(
    surface: VirtualMeasurementSurface,
    width: number,
): Map<Key, number> {
    let sessions =
        typeof surface === "string"
            ? namedSessions.get(surface)
            : objectSessions.get(surface);
    if (!sessions) {
        sessions = new Map();
        if (typeof surface === "string") namedSessions.set(surface, sessions);
        else objectSessions.set(surface, sessions);
    }
    const key = roundedVirtualWidth(width);
    let measurements = sessions.get(key);
    if (!measurements) {
        measurements = new Map();
        sessions.set(key, measurements);
    }
    return measurements as Map<Key, number>;
}

export function virtualOffset<Key extends VirtualKey>(
    key: Key,
    index: number,
    top: number,
    size: number,
): VirtualOffset<Key> {
    return { key, index, top, bottom: top + size };
}

/** Build cumulative offsets once per item/measurement change. */
export function buildVirtualOffsets<Item, Key extends VirtualKey>(
    items: readonly Item[],
    keyOf: (item: Item, index: number) => Key,
    sizes: ReadonlyMap<Key, number>,
    estimateSize: number,
): readonly VirtualItem<Item, Key>[] {
    let top = 0;
    return items.map((item, index) => {
        const key = keyOf(item, index);
        const row = {
            item,
            ...virtualOffset(key, index, top, sizes.get(key) ?? estimateSize),
        };
        top = row.bottom;
        return row;
    });
}

/** Binary-search a cumulative layout for the visible interval. */
export function resolveVirtualRange<Key extends VirtualKey>(
    offsets: readonly VirtualOffset<Key>[],
    start: number,
    end: number,
): readonly [number, number] {
    let lo = 0;
    let hi = offsets.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (offsets[mid].bottom <= start) lo = mid + 1;
        else hi = mid;
    }
    const first = lo;
    lo = first;
    hi = offsets.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (offsets[mid].top < end) lo = mid + 1;
        else hi = mid;
    }
    return [first, lo];
}
