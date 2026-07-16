import {
    computed,
    isRef,
    toValue,
    type ComputedRef,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";

export interface RowEntry<T> {
    row: T;
    key: PropertyKey;
}

export type RowIdResolver<T> = (row: T) => PropertyKey | null | undefined;

export interface UseDataTableRowIdentityOptions<T> {
    rows: MaybeRefOrGetter<readonly T[]>;
    rowKey: MaybeRefOrGetter<string>;
    getRowId?: RowIdResolver<T> | Readonly<Ref<RowIdResolver<T> | undefined>>;
}

function nestedValue(value: unknown, path: string): unknown {
    return path.split(".").reduce<unknown>((current, key) => {
        if (current == null || typeof current !== "object") return undefined;
        return (current as Record<string, unknown>)[key];
    }, value);
}

function resolver<T>(
    value: UseDataTableRowIdentityOptions<T>["getRowId"],
): RowIdResolver<T> | undefined {
    return isRef(value) ? value.value : value;
}

function isKey(value: unknown): value is PropertyKey {
    return ["string", "number", "symbol"].includes(typeof value);
}

/** Resolve the stable, unique identities required by keyed interactive rows. */
export function useDataTableRowIdentity<T extends Record<string, any>>(
    options: UseDataTableRowIdentityOptions<T>,
): { rowEntries: ComputedRef<RowEntry<T>[]> } {
    const rowEntries = computed(() => {
        const seen = new Set<PropertyKey>();
        const getRowId = resolver(options.getRowId);

        return toValue(options.rows).map((row, index) => {
            const key = getRowId
                ? getRowId(row)
                : nestedValue(row, toValue(options.rowKey));
            if (!isKey(key)) {
                throw new TypeError(`[DataTable] Row ${index} has no stable identity.`);
            }
            if (seen.has(key)) {
                throw new TypeError(`[DataTable] Duplicate row identity ${String(key)}.`);
            }
            seen.add(key);
            return { row, key };
        });
    });

    return { rowEntries };
}
