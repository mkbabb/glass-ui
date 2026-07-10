// The per-row lazy SFC resolver (BH.B3 δ5 — the manifest-carve `lazy` target).
//
// This is the ONE cleanly-extractable concern of the story manifest: "given a
// <category>/<id>, resolve its SFC (or the MissingStory placeholder)". It is carved
// OFF `manifest.ts` because it is pure resolution machinery — no manifest DATA (the
// `s()` rows, the SUBPATHS / FOLDED / DECLARED literals, the `Story` interface
// fields) lives here, so the ~13 device-free gates that parse
// `demo/stories/manifest.ts` by literal path + regex keep reading the un-moved
// source (the manifest stays the single parseable source-of-truth).
//
// The glob stays in `manifest.ts` (its relative path + generated keys unchanged):
// `makeLazy(modules)` takes the glob record so this leaf owns ZERO glob of its own —
// the δ6 per-story-directory move is DROPPED (KISS: ~80 trivial stories stay flat
// `<category>/<id>.vue`, so the flat glob is correct and no story renders blank).
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

// Build the per-row lazy SFC resolver over a glob module map. A key miss returns a
// render-null `MissingStory:<category>/<id>` placeholder (never throws — the
// manifest ≡ disk bijection is the gate's job, not the resolver's).
export function makeLazy(modules: StoryModules): StoryLazyResolver {
    return (category, id) => {
        const key = `./${category}/${id}.vue`;
        const loader = modules[key];
        if (!loader) {
            return () =>
                Promise.resolve({
                    render: () => null,
                    name: `MissingStory:${category}/${id}`,
                }) as Promise<Component>;
        }
        return () => loader().then((m) => m.default);
    };
}
