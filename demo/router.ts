import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { CATEGORIES, firstStoryPath } from "./stories/manifest";

/**
 * Routes are derived from the manifest. Every category produces a
 * `/:category` SECTION-LANDING hero (BC.W-PAGE-CHASSIS — the SECTION-HERO model)
 * plus a `/:category/:story` route per story. There are no flat standalone routes
 * — the former Aurora/GooBlob/Blob flat tools are now rows in the Substrates
 * category (AV.W10).
 */
function buildRoutes(): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = [
        {
            path: "/",
            redirect: () => firstStoryPath(),
        },
    ];

    for (const category of CATEGORIES) {
        // BC.W-PAGE-CHASSIS — the category landing is the D1 SECTION HERO (the
        // newly-begotten per-section identity moment + the bento <SectionPreviewCard>
        // grid), NOT a redirect to the first story. The SAME StoryHero chassis at
        // heroScale: "hero" / depth: "D1" (no new component — SectionLanding composes
        // it). An empty category falls back to the first story path.
        routes.push(
            category.stories.length > 0
                ? {
                      path: `/${category.id}`,
                      name: `category:${category.id}`,
                      component: () => import("./stories/SectionLanding.vue"),
                      meta: {
                          categoryId: category.id,
                          landing: true,
                          title: category.title,
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
                },
            });
        }
    }

    // Catch-all → the 404 constellation egg ("lost in the lattice"). A real
    // route (not a root redirect) so an unknown path paints the lattice rather
    // than silently bouncing home.
    routes.push({
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("./eggs/NotFound.vue"),
    });

    return routes;
}

export const router = createRouter({
    history: createWebHistory(),
    routes: buildRoutes(),
    // BG.W-ROUTE-TRANSITION (M0) — NO window-targeted scrollBehavior. `<main>` (not the
    // window) owns route scroll, so a window scroll-reset is a no-op double-fire of the
    // AppShell `route.path` watch that scrolls `mainEl` to the top. The ONE scroll-reset
    // owner is the AppShell watch.
});

// W-NAV-DOCK-FIX (defect 7) — eager-resolve the lazy component of the FIRST navigation
// so the initial mount never paints an empty <RouterView> (the "Pick a story" flash).
// Subsequent navigations are gated by the AppShell placeholder guard. A one-shot guard
// that removes itself after the first resolve (no per-nav cost).
let firstResolved = false;
router.beforeResolve(async (to) => {
    if (firstResolved) return true;
    firstResolved = true;
    const comps = to.matched
        .map((r) => r.components?.default)
        .filter(
            (c): c is () => Promise<unknown> => typeof c === "function",
        );
    await Promise.all(comps.map((c) => c().catch(() => undefined)));
    return true;
});
