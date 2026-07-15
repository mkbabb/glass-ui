// AW.W14 — DataTable row-identity (colocated, INTERNAL composable).
//
// One of the two orthogonal concerns extracted from the 442-line DataTable.vue
// god-module: stable per-row keying. Given the rows + the id-resolution props
// (`rowKey` / `getRowId`), it produces the keyed `rowEntries` Vue iterates over,
// validating identity (missing / duplicate ids) with a dev-only warn and
// falling back to a per-object generated key. Pure utility — it owns no
// template, sort, or pagination state, so it lifts out clean.
//
// NOT exported from the package barrel (`data-table/index.ts`); the SFC is its
// only consumer.
import { computed, type ComputedRef, type MaybeRefOrGetter, toValue } from "vue";

/** A row paired with its stable iteration key. */
export interface RowEntry<T> {
    row: T;
    key: PropertyKey;
}

/** An explicit per-row id resolver — wins over the `rowKey` lookup. */
export type RowIdResolver<T> = (row: T) => PropertyKey | null | undefined;

export interface UseDataTableRowIdentityOptions<T> {
    /** The reactive row set. */
    rows: MaybeRefOrGetter<readonly T[]>;
    /** Dotted-path key into each row resolving its stable id (default `_id`). */
    rowKey: MaybeRefOrGetter<string>;
    /**
     * Explicit id resolver — wins over `rowKey` when supplied. Pass either the
     * resolver itself OR a getter returning it (a getter lets the SFC thread the
     * reactive `props.getRowId`). NOT a `MaybeRefOrGetter`: the resolver is
     * itself a function, which `toValue` would mis-invoke as a getter.
     */
    getRowId?: RowIdResolver<T> | (() => RowIdResolver<T> | undefined);
}

/** Resolve the explicit id resolver from the prop (a resolver OR a getter). */
function resolveGetRowId<T>(
    getRowId: UseDataTableRowIdentityOptions<T>["getRowId"],
): RowIdResolver<T> | undefined {
    if (!getRowId) return undefined;
    // A zero-arg getter returns the resolver; an arity-≥1 fn IS the resolver.
    if (getRowId.length === 0) {
        return (getRowId as () => RowIdResolver<T> | undefined)();
    }
    return getRowId as RowIdResolver<T>;
}

export interface UseDataTableRowIdentityReturn<T> {
    /** Rows paired with stable iteration keys (validated; generated fallback). */
    rowEntries: ComputedRef<RowEntry<T>[]>;
}

function getNestedValue(obj: unknown, key: string): unknown {
    return key.split(".").reduce<unknown>((o, k) => {
        if (o == null || typeof o !== "object") return undefined;
        return (o as Record<string, unknown>)[k];
    }, obj);
}

function isPropertyKey(value: unknown): value is PropertyKey {
    return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "symbol"
    );
}

function describeRowId(id: PropertyKey): string {
    return typeof id === "symbol" ? id.toString() : JSON.stringify(id);
}

/**
 * Resolve stable iteration keys for a DataTable's rows.
 *
 * Explicit ids (via `getRowId` or the dotted `rowKey`) win when present AND
 * unique; missing / duplicate ids fall back to a per-object generated symbol
 * (object identity), with a one-shot dev warning per distinct issue.
 */
export function useDataTableRowIdentity<T extends Record<string, any>>(
    options: UseDataTableRowIdentityOptions<T>,
): UseDataTableRowIdentityReturn<T> {
    const { rows, rowKey, getRowId } = options;

    // Per-object generated keys + the de-duped dev-warning ledger persist across
    // recomputes (the WeakMap keeps a row's generated key stable across renders).
    const generatedRowIds = new WeakMap<object, symbol>();
    const warnedRowIdentityIssues = new Set<string>();
    let nextGeneratedRowId = 0;

    function warnRowIdentityIssue(issue: string, message: string): void {
        if (!import.meta.env.DEV || warnedRowIdentityIssues.has(issue)) return;
        warnedRowIdentityIssues.add(issue);
        console.warn(`[DataTable] ${message}`);
    }

    function getExplicitRowId(row: T): unknown {
        const resolver = resolveGetRowId(getRowId);
        if (resolver) return resolver(row);
        return getNestedValue(row, toValue(rowKey));
    }

    function getGeneratedRowId(row: T): symbol {
        const objectRow = row as object;
        const existing = generatedRowIds.get(objectRow);
        if (existing) return existing;

        const generated = Symbol(`DataTable row ${nextGeneratedRowId++}`);
        generatedRowIds.set(objectRow, generated);
        return generated;
    }

    const rowEntries = computed<RowEntry<T>[]>(() => {
        const currentRows = toValue(rows);
        const explicitIds = currentRows.map((row) => getExplicitRowId(row));
        const idCounts = new Map<PropertyKey, number>();

        for (const id of explicitIds) {
            if (!isPropertyKey(id)) continue;
            idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
        }

        const missingCount = explicitIds.filter((id) => !isPropertyKey(id)).length;
        if (missingCount > 0) {
            warnRowIdentityIssue(
                "missing",
                `Missing row identity for ${missingCount} row(s). Provide getRowId or a rowKey with stable unique values; falling back to object identity.`,
            );
        }

        const duplicateIds = Array.from(idCounts)
            .filter(([, count]) => count > 1)
            .map(([id]) => describeRowId(id));
        if (duplicateIds.length > 0) {
            warnRowIdentityIssue(
                `duplicate:${duplicateIds.join(",")}`,
                `Duplicate row identity value(s) ${duplicateIds.join(", ")}. Provide getRowId or a rowKey with stable unique values; falling back to object identity for those rows.`,
            );
        }

        return currentRows.map((row, index) => {
            const explicitId = explicitIds[index];
            const key =
                isPropertyKey(explicitId) && idCounts.get(explicitId) === 1
                    ? explicitId
                    : getGeneratedRowId(row);

            return { row, key };
        });
    });

    return { rowEntries };
}
