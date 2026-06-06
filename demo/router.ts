import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { CATEGORIES, firstStoryPath } from "./stories/manifest";

/**
 * Routes are derived from the manifest. Every category produces a
 * `/:category` landing redirect plus a `/:category/:story` route per story.
 * There are no flat standalone routes — the former Aurora/GooBlob/Blob flat
 * tools are now rows in the Substrates category (AV.W10).
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
