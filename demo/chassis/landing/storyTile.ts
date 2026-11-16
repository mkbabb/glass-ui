// A card's preview: the story's own tile where it has one (its stage cannot run small
// and inert), else its stage. A story with neither shows its title alone.
import type { Component } from "vue";
import type { Category, Story } from "../../stories/manifest";

export type TileResolution =
    | { kind: "live"; loader: () => Promise<Component> }
    | { kind: "none" };

const NO_PREVIEW: TileResolution = { kind: "none" };

export function resolveStoryTile(story: Story): TileResolution {
    const loader = story.tile ?? story.stage;
    return loader ? { kind: "live", loader } : NO_PREVIEW;
}

/** A section's card on `/` shows its first page's preview. */
export function resolveCategoryTile(category: Category): TileResolution {
    const first = category.stories[0];
    return first ? resolveStoryTile(first) : NO_PREVIEW;
}
