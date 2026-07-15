import type { Ref } from "vue";

/**
 * A reactive config can be authored as a plain object, a `Ref`, or a getter.
 * `useAurora` and `useCursorInteraction` both accept this shape so consumers
 * can pass either a static config (single-config use) or a getter that
 * dereferences a parent ref every call (preset-switch scenarios where the
 * config object identity changes underneath the composable).
 */
export type ConfigSource<T> = T | Ref<T> | (() => T);

export function asGetter<T>(src: ConfigSource<T>): () => T {
    if (typeof src === "function") return src as () => T;
    if (src && typeof src === "object" && "value" in (src as object)) {
        return () => (src as Ref<T>).value;
    }
    return () => src as T;
}
