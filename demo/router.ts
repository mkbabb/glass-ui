import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { CATEGORIES, FLAT_STORIES, firstStoryPath } from "./stories/manifest";

/**
 * Routes are derived from the manifest. Categories produce
 * `/:category/:story` routes; standalone tools/playgrounds in `FLAT_STORIES`
 * get top-level static paths (`/aurora`, etc.) — Vue Router prefers static
 * over dynamic, so they resolve cleanly alongside the category routes.
 */
function buildRoutes(): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = [
        {
            path: "/",
            redirect: () => firstStoryPath(),
        },
    ];

    // Flat standalone stories first — static paths win over `:dynamic`.
    for (const flat of FLAT_STORIES) {
        routes.push({
            path: `/${flat.id}`,
            name: `flat:${flat.id}`,
            component: flat.component,
            meta: {
                flatStoryId: flat.id,
                title: flat.title,
            },
        });
    }

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
