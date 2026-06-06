import { inject, provide, type InjectionKey } from "vue";

/**
 * Domain-neutral provide/inject DI factory pair — the single source the dock,
 * dock-layer-group, toggle-group, sortable-list, glyph-face, and configurator
 * contexts collapse onto (AV.W14). Generalizes the four hand-rolled
 * provide/inject/throw triplets into ONE typed factory so a `*_KEY:
 * InjectionKey<T>` declaration + its `provide`/`use`/throw boilerplate is never
 * re-rolled per call site — each site keeps only its distinct `interface`,
 * label, and (strict) error message.
 *
 * Two shapes, chosen per the strict-vs-optional matrix (PROGRESS.md):
 *  - `createStrictContext<T>(label, outsideError)` — a `use()` that THROWS
 *    `outsideError` when injected outside its provider (the consumer is
 *    meaningless without the parent). It ALSO exposes `useOptional()` over the
 *    SAME key, so a context that is strict for its primary consumer yet must
 *    read null-safe elsewhere (the dock: `<Slider>` may sit outside) shares one
 *    key across both `use` shapes — no second symbol, no `any` leak.
 *  - `createOptionalContext<T>(label)` — a `use()` that returns `T | null`
 *    (befitting-silent; the consumer renders bare when no provider is present).
 *    No strict counterpart is minted — a strict throw would be dead code at
 *    these sites (invariant 25's "per intent" clause).
 *
 * The returned `KEY` is exported by each call site so an external provider can
 * `provide(KEY, …)` directly (the goo-blob `BLOB_CONFIG_KEY` external-provide
 * pattern stays a bare `inject(KEY, default)` and is NOT minted here — it is not
 * a strict-or-optional triplet).
 */

export interface StrictContext<T> {
    /** The typed injection key — exported so an external provider can target it. */
    readonly KEY: InjectionKey<T>;
    /** Provide the context to descendants. */
    provide: (ctx: T) => void;
    /** Strict — throws `outsideError` when used outside the provider. */
    use: () => T;
    /** Befitting-silent over the SAME key — returns `null` outside the provider. */
    useOptional: () => T | null;
}

export interface OptionalContext<T> {
    /** The typed injection key — exported so an external provider can target it. */
    readonly KEY: InjectionKey<T>;
    /** Provide the context to descendants. */
    provide: (ctx: T) => void;
    /** Befitting-silent — returns `null` when used outside the provider. */
    use: () => T | null;
}

/**
 * Strict context factory. `use()` throws `outsideError` outside the provider;
 * `useOptional()` returns `null` over the same key for the null-safe-elsewhere
 * case.
 */
export function createStrictContext<T>(
    label: string,
    outsideError: string,
): StrictContext<T> {
    const KEY: InjectionKey<T> = Symbol(label);
    return {
        KEY,
        provide: (ctx: T) => provide(KEY, ctx),
        use: (): T => {
            const ctx = inject(KEY);
            if (!ctx) {
                throw new Error(outsideError);
            }
            return ctx;
        },
        useOptional: (): T | null => inject(KEY, null),
    };
}

/**
 * Optional context factory. `use()` returns `T | null` (befitting-silent); no
 * strict counterpart is minted.
 */
export function createOptionalContext<T>(label: string): OptionalContext<T> {
    const KEY: InjectionKey<T> = Symbol(label);
    return {
        KEY,
        provide: (ctx: T) => provide(KEY, ctx),
        use: (): T | null => inject(KEY, null),
    };
}
