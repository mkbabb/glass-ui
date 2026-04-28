import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    CATEGORIES,
    FLAT_STORIES,
    findCategory,
    findFlatStory,
    type Category,
    type FlatStory,
    type Story,
} from "../stories/manifest";

export interface CategoryStoryLocation {
    kind: "category";
    category: Category;
    story: Story;
    categoryIndex: number;
    storyIndex: number;
}

export interface FlatStoryLocation {
    kind: "flat";
    story: FlatStory;
    flatIndex: number;
}

export type StoryLocation = CategoryStoryLocation | FlatStoryLocation;

/**
 * Story navigation helpers keyed off the current route + manifest.
 * Resolves to either a category-story (`kind: "category"`) or a flat
 * standalone story (`kind: "flat"`). Within-category siblings drive
 * `next` / `prev`; flat stories have no siblings, so those calls no-op.
 */
export function useStoryNavigation() {
    const route = useRoute();
    const router = useRouter();

    const current = computed<StoryLocation | null>(() => {
        const flatStoryId = route.meta.flatStoryId as string | undefined;
        if (flatStoryId) {
            const flatIndex = FLAT_STORIES.findIndex((f) => f.id === flatStoryId);
            if (flatIndex < 0) return null;
            const story = FLAT_STORIES[flatIndex]!;
            return { kind: "flat", story, flatIndex };
        }

        const categoryId = route.meta.categoryId as string | undefined;
        const storyId = route.meta.storyId as string | undefined;
        if (!categoryId || !storyId) return null;

        const categoryIndex = CATEGORIES.findIndex((c) => c.id === categoryId);
        if (categoryIndex < 0) return null;
        const category = CATEGORIES[categoryIndex]!;

        const storyIndex = category.stories.findIndex((s) => s.id === storyId);
        if (storyIndex < 0) return null;
        const story = category.stories[storyIndex]!;

        return { kind: "category", category, story, categoryIndex, storyIndex };
    });

    function goTo(categoryId: string, storyId: string): void {
        void router.push(`/${categoryId}/${storyId}`);
    }

    function goToFlat(flatStoryId: string): void {
        if (!findFlatStory(flatStoryId)) return;
        void router.push(`/${flatStoryId}`);
    }

    /** First story of a category (used by rail clicks + jump-to-category shortcuts). */
    function firstOfCategory(categoryId: string): void {
        const category = findCategory(categoryId);
        if (!category || category.stories.length === 0) return;
        void router.push(`/${category.id}/${category.stories[0]!.id}`);
    }

    function next(): void {
        const loc = current.value;
        if (!loc || loc.kind !== "category") return;
        const nextStory = loc.category.stories[loc.storyIndex + 1];
        if (nextStory) {
            void router.push(`/${loc.category.id}/${nextStory.id}`);
        }
    }

    function prev(): void {
        const loc = current.value;
        if (!loc || loc.kind !== "category") return;
        const prevStory = loc.category.stories[loc.storyIndex - 1];
        if (prevStory) {
            void router.push(`/${loc.category.id}/${prevStory.id}`);
        }
    }

    function nextCategory(): void {
        const loc = current.value;
        if (!loc || loc.kind !== "category") return;
        // Find the next category (with at least one story) — wraps at end.
        for (let i = 1; i <= CATEGORIES.length; i++) {
            const target = CATEGORIES[(loc.categoryIndex + i) % CATEGORIES.length]!;
            if (target.stories.length > 0) {
                firstOfCategory(target.id);
                return;
            }
        }
    }

    function prevCategory(): void {
        const loc = current.value;
        if (!loc || loc.kind !== "category") return;
        for (let i = 1; i <= CATEGORIES.length; i++) {
            const idx =
                (loc.categoryIndex - i + CATEGORIES.length) % CATEGORIES.length;
            const target = CATEGORIES[idx]!;
            if (target.stories.length > 0) {
                firstOfCategory(target.id);
                return;
            }
        }
    }

    return {
        current,
        next,
        prev,
        goTo,
        goToFlat,
        nextCategory,
        prevCategory,
        firstOfCategory,
    };
}
