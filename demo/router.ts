import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { CATEGORIES, firstStoryPath } from "./stories/manifest";

/**
 * Routes are derived from the manifest: every category produces a
 * landing redirect to its first story, and every story produces a
 * `/:category/:story` route that lazy-loads its component.
 */
function buildRoutes(): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = [
        {
            path: "/",
            redirect: () => firstStoryPath(),
        },
    ];

    for (const category of CATEGORIES) {
        // Category landing — redirect to first story (or show empty-state fallback below).
        routes.push({
            path: `/${category.id}`,
            name: `category:${category.id}`,
            redirect: () => {
                const first = category.stories[0];
                return first
                    ? `/${category.id}/${first.id}`
                    : firstStoryPath();
            },
        });

        for (const story of category.stories) {
            routes.push({
                path: `/${category.id}/${story.id}`,
                name: `story:${category.id}:${story.id}`,
                component: story.component,
                meta: {
                    categoryId: category.id,
                    storyId: story.id,
                    title: story.title,
                },
            });
        }
    }

    // Catch-all → root redirect
    routes.push({ path: "/:pathMatch(.*)*", redirect: "/" });

    return routes;
}

export const router = createRouter({
    history: createWebHistory(),
    routes: buildRoutes(),
    scrollBehavior: () => ({ top: 0 }),
});
