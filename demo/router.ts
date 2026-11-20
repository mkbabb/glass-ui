import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import {
    CATEGORIES,
    cardsRunCanvas,
    cardsSetCode,
    firstStoryPath,
} from "./stories/manifest";

/**
 * Routes are derived from the manifest: `/`, a `/:category` section page per category
 * and a `/:category/:story` route per row. `meta.ownsCanvas` is read from the rows'
 * own `canvas` declarations: where the page (or a card on it) runs a live canvas, the
 * shell keeps its field static. `meta.codeFace` is read from the rows' `codeFace` the
 * same way: the page renders once the code face has loaded.
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
                codeFace: cardsSetCode(CATEGORIES.flatMap((c) => c.stories.slice(0, 1))),
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
                          codeFace: cardsSetCode(category.stories),
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
                    codeFace: Boolean(story.codeFace),
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
// synchronously after the first visit. A page whose first screen sets the code face
// waits for that face too, so its first frame paints in it, not in the fallback (a
// document with no font set, the tests' DOM, has no face to wait for).
router.beforeResolve(async (to) => {
    const loads: Promise<unknown>[] = to.matched
        .map((r) => r.components?.default)
        .filter(
            (c): c is () => Promise<unknown> => typeof c === "function",
        )
        .map((c) => c());
    if (to.meta.codeFace && "fonts" in document) loads.push(document.fonts.load('1em "Fira Code"'));
    await Promise.all(loads.map((l) => l.catch(() => undefined)));
    return true;
});
