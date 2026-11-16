// A card's preview: the story's own tile where it has one (its stage cannot run small
// and inert), else its stage. Every row has one or the other; a row with neither fails
// here, loudly, rather than showing a card without a component.
import type { Component } from "vue";
import type { Category, Story } from "../../stories/manifest";

export type StoryPreview = () => Promise<Component>;

export function resolveStoryTile(story: Story): StoryPreview {
    const loader = story.tile ?? story.stage;
    if (!loader) throw new Error(`"${story.id}" has neither a stage nor a tile`);
    return loader;
}

/** A section's card on `/` shows its first page's preview. */
export function resolveCategoryTile(category: Category): StoryPreview {
    const first = category.stories[0];
    if (!first) throw new Error(`"${category.id}" has no pages`);
    return resolveStoryTile(first);
}
