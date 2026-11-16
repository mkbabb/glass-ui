import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import {
    CATEGORIES,
    cardsRunCanvas,
    firstStoryPath,
} from "./stories/manifest";

/**
 * Routes are derived from the manifest: `/`, a `/:category` section page per category
 * and a `/:category/:story` route per row. `meta.ownsCanvas` is read from the rows'
 * own `canvas` declarations: where the page (or a card on it) runs a live canvas, the
 * shell keeps its field static.
 */
function buildRoutes(): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = [
        {
            path: "/",
            name: "home",
            component: () => import("./chassis/landing/CatalogLanding.vue"),
            meta: {
                landing: true,
                title: "Glass UI",
                ownsCanvas: cardsRunCanvas(
                    CATEGORIES.flatMap((c) => c.stories.slice(0, 1)),
                ),
            },
        },
    ];

    for (const category of CATEGORIES) {
        // A category's landing is its title, its lede and a card per page.
        routes.push(
            category.stories.length > 0
                ? {
                      path: `/${category.id}`,
                      name: `category:${category.id}`,
                      component: () => import("./chassis/landing/SectionLanding.vue"),
                      meta: {
                          categoryId: category.id,
                          landing: true,
                          title: category.title,
                          ownsCanvas: cardsRunCanvas(category.stories),
                      },
                  }
                : {
                      path: `/${category.id}`,
                      name: `category:${category.id}`,
                      redirect: () => firstStoryPath(),
                  },
        );

        for (const story of category.stories) {
            routes.push({
                path: `/${category.id}/${story.id}`,
                name: `story:${category.id}:${story.id}`,
                component: story.component,
                meta: {
                    categoryId: category.id,
                    storyId: story.id,
                    title: story.title,
                    ownsCanvas: Boolean(story.canvas),
                },
            });
        }
    }

    // Retired, folded, relocated, and unknown paths all resolve honestly to the
    // semantic 404. Canonical category and story routes above remain unchanged.
    routes.push({
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("./shell/NotFound.vue"),
    });

    return routes;
}

export const router = createRouter({
    history: createWebHistory(),
    routes: buildRoutes(),
    // `<main>` owns route scroll, so a window scroll reset would duplicate the
    // AppShell `route.path` watch that scrolls `mainEl` to the top. The ONE scroll-reset
    // owner is the AppShell watch.
});

// Pre-resolve each lazy route chunk before the View Transition update callback so
// snapshot capture never includes an unresolved component. Warm chunks resolve
// synchronously after the first visit.
router.beforeResolve(async (to) => {
    const comps = to.matched
        .map((r) => r.components?.default)
        .filter(
            (c): c is () => Promise<unknown> => typeof c === "function",
        );
    await Promise.all(comps.map((c) => c().catch(() => undefined)));
    return true;
});
