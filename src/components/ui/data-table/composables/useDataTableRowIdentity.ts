import { computed, type ComputedRef } from "vue";

/**
 * A row paired with the stable key Vue's `:key` should track it by. The key is
 * the row's explicit identity (a unique `getRowId`/`rowKey` value) when one
 * exists, otherwise a generated symbol pinned to the row's object identity so
 * the row survives immutable reorders without remounting.
 */
export type RowEntry<T> = {
    row: T;
    key: PropertyKey;
};

/** Reactive inputs the row-identity concern reads off the host props. */
export interface UseDataTableRowIdentityOptions<T> {
    rows: () => T[];
    /** Dotted path to the identity field on each row (e.g. `"_id"`, `"meta.id"`). */
    rowKey: () => string;
    /** Explicit identity resolver; takes precedence over `rowKey` when set. */
    getRowId?: () => ((row: T) => PropertyKey | null | undefined) | undefined;
}

export interface UseDataTableRowIdentityReturn<T> {
    rowEntries: ComputedRef<RowEntry<T>[]>;
}

/**
 * Reads a dotted-path value off a (possibly nested) row object. Shared by the
 * identity resolver and the cell renderers — both walk the same `a.b.c` key.
 */
export function getNestedValue(obj: unknown, key: string): unknown {
    return key.split(".").reduce<unknown>((o, k) => {
        if (o == null || typeof o !== "object") return undefined;
        return (o as Record<string, unknown>)[k];
    }, obj);
}

function isPropertyKey(value: unknown): value is PropertyKey {
    return typeof value === "string" || typeof value === "number" || typeof value === "symbol";
}

function describeRowId(id: PropertyKey): string {
    return typeof id === "symbol" ? id.toString() : JSON.stringify(id);
}

/**
 * Owns DataTable's row-identity generation and validation: it keys every row by
 * its explicit unique identity when one exists, and falls back to a stable
 * per-object generated symbol (warning once in DEV) when an identity is missing
 * or duplicated. Pure data concern — no template, sort, or pagination coupling.
 */
export function useDataTableRowIdentity<T extends Record<string, any>>(
    options: UseDataTableRowIdentityOptions<T>,
): UseDataTableRowIdentityReturn<T> {
    const generatedRowIds = new WeakMap<object, symbol>();
    const warnedRowIdentityIssues = new Set<string>();
    let nextGeneratedRowId = 0;

    function warnRowIdentityIssue(issue: string, message: string): void {
        if (!import.meta.env.DEV || warnedRowIdentityIssues.has(issue)) return;
        warnedRowIdentityIssues.add(issue);
        console.warn(`[DataTable] ${message}`);
    }

    function getExplicitRowId(row: T): unknown {
        const resolver = options.getRowId?.();
        if (resolver) return resolver(row);
        return getNestedValue(row, options.rowKey());
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
        const rows = options.rows();
        const explicitIds = rows.map((row) => getExplicitRowId(row));
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

        return rows.map((row, index) => {
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
