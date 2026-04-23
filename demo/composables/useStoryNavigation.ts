import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CATEGORIES, findCategory, type Category, type Story } from "../stories/manifest";

export interface StoryLocation {
    category: Category;
    story: Story;
    categoryIndex: number;
    storyIndex: number;
}

/**
 * Story navigation helpers keyed off the current route + manifest.
 * All setters call `router.push` with `/:category/:story` paths.
 */
export function useStoryNavigation() {
    const route = useRoute();
    const router = useRouter();

    const current = computed<StoryLocation | null>(() => {
        const categoryId = route.meta.categoryId as string | undefined;
        const storyId = route.meta.storyId as string | undefined;
        if (!categoryId || !storyId) return null;

        const categoryIndex = CATEGORIES.findIndex((c) => c.id === categoryId);
        if (categoryIndex < 0) return null;
        const category = CATEGORIES[categoryIndex]!;

        const storyIndex = category.stories.findIndex((s) => s.id === storyId);
        if (storyIndex < 0) return null;
        const story = category.stories[storyIndex]!;

        return { category, story, categoryIndex, storyIndex };
    });

    function goTo(categoryId: string, storyId: string): void {
        void router.push(`/${categoryId}/${storyId}`);
    }

    /** First story of a category (used by rail clicks + jump-to-category shortcuts). */
    function firstOfCategory(categoryId: string): void {
        const category = findCategory(categoryId);
        if (!category || category.stories.length === 0) return;
        void router.push(`/${category.id}/${category.stories[0]!.id}`);
    }

    function next(): void {
        const loc = current.value;
        if (!loc) return;
        const nextStory = loc.category.stories[loc.storyIndex + 1];
        if (nextStory) {
            void router.push(`/${loc.category.id}/${nextStory.id}`);
        }
    }

    function prev(): void {
        const loc = current.value;
        if (!loc) return;
        const prevStory = loc.category.stories[loc.storyIndex - 1];
        if (prevStory) {
            void router.push(`/${loc.category.id}/${prevStory.id}`);
        }
    }

    function nextCategory(): void {
        const loc = current.value;
        if (!loc) return;
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
        if (!loc) return;
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
        nextCategory,
        prevCategory,
        firstOfCategory,
    };
}
