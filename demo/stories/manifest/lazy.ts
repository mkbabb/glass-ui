// The glob stays in `manifest.ts` so its relative path and generated keys remain
// unchanged. This leaf owns only the category/id-to-module lookup.
import type { Component } from "vue";

/** The glob-resolved SFC module map: `<category>/<id>.vue` key → its lazy import. */
export type StoryModules = Record<
    string,
    () => Promise<{ default: Component }>
>;

/** A `(category, id)` → lazy-SFC-loader resolver bound to a glob module map. */
export type StoryLazyResolver = (
    category: string,
    id: string,
) => () => Promise<Component>;

/** Build a resolver that rejects invalid manifest rows immediately. */
export function makeLazy(modules: StoryModules): StoryLazyResolver {
    return (category, id) => {
        const key = `./${category}/${id}.vue`;
        const loader = modules[key];
        if (!loader) throw new Error(`Missing story module: ${category}/${id}`);
        return () => loader().then((m) => m.default);
    };
}
