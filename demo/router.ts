import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import {
    CATEGORIES,
    firstStoryPath,
} from "./stories/manifest";
import { ownsCanvas } from "./chassis/hero/focal";

/**
 * Routes are derived from the manifest. Every category produces a
 * `/:category` section-landing hero
 * plus a `/:category/:story` route per story. There are no flat standalone routes
 * the former Aurora/GooBlob/Blob flat tools are now rows in the Substrates
 * category.
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
                          ownsCanvas: false,
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
                    ownsCanvas: ownsCanvas(`${category.id}/${story.id}`),
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
