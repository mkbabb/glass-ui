import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    CATEGORIES,
    findCategory,
    type Category,
    type Story,
} from "../stories/manifest";
import { pushRoute } from "./routeTransition";

export interface CategoryStoryLocation {
    kind: "category";
    category: Category;
    story: Story;
    categoryIndex: number;
    storyIndex: number;
}

export type StoryLocation = CategoryStoryLocation;

/**
 * Story navigation helpers keyed off the current route + manifest. Every story
 * lives in a category. Next and previous page walk the whole site in manifest order,
 * crossing sections and wrapping at the ends, so a page control is never disabled;
 * the category arrows wrap the same way.
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

        return { kind: "category", category, story, categoryIndex, storyIndex };
    });

    function goTo(categoryId: string, storyId: string): void {
        void pushRoute(router, `/${categoryId}/${storyId}`);
    }

    /** First story of a category (used by rail clicks + jump-to-category shortcuts). */
    function firstOfCategory(categoryId: string): void {
        const category = findCategory(categoryId);
        if (!category || category.stories.length === 0) return;
        void pushRoute(router, `/${category.id}/${category.stories[0]!.id}`);
    }

    /** Every page on the site, in manifest order. */
    const pages = CATEGORIES.flatMap((category) =>
        category.stories.map((story) => `/${category.id}/${story.id}`),
    );

    function step(by: 1 | -1): void {
        const loc = current.value;
        if (!loc || pages.length === 0) return;
        const at = pages.indexOf(`/${loc.category.id}/${loc.story.id}`);
        void pushRoute(router, pages[(at + by + pages.length) % pages.length]!);
    }

    function next(): void {
        step(1);
    }

    function prev(): void {
        step(-1);
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
