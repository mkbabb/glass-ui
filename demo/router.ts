import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { CATEGORIES, firstStoryPath } from "./stories/manifest";
import { isFocalRoute } from "./stories/focal";

/**
 * BG.W-FIELD-AURORA (M2) — the shell-field gate. `false` on a FOCAL route (the
 * route owns its own route-dominant GL field → the shell `<Aurora>` stands down,
 * so exactly ONE GL context is mounted per route — the never-2-contexts law).
 * Flipped in `router.afterEach` on the COMMITTED route (not the live `route.meta`
 * computed) so a non-focal→non-focal nav stays `false→false` and the shell node
 * PERSISTS (the per-route hue re-uploads on the persisted node, no reparent). The
 * `afterEach` fires during `router.isReady()` (the initial navigation) BEFORE the
 * app mounts, so the first paint already reflects the correct shell state.
 */
export const shellFieldActive = ref(true);

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
                          // BG.W-FIELD-AURORA (M2) — the landing's focal flag,
                          // derived from its resolved section-landing background.
                          focal: isFocalRoute(category.id, category.landing?.background),
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
                    // BG.W-FIELD-AURORA (M2) — the route's focal flag (GL
                    // background.kind OR a SELF_STAGES_GL dock route). On a focal
                    // route the shell aurora stands down (the one-GL law).
                    focal: isFocalRoute(`${category.id}/${story.id}`, story.background),
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

// BG.W-FIELD-AURORA (M2) — flip the shell-field gate on the COMMITTED route. The
// shell `<Aurora>` mounts IFF the destination is NOT focal, so a focal route's own
// route-dominant GL field is the ONLY mounted context (the never-2-contexts law).
// Reading the committed `to.meta.focal` (not a live computed) means a non-focal→
// non-focal nav stays `false→false` and the shell node persists (no reparent).
router.afterEach((to) => {
    shellFieldActive.value = !to.meta?.focal;
});

// BG.W-ROUTE-ENTER-VISIBLE (fix a) — pre-resolve the route chunk BEFORE the swap on
// EVERY navigation, so the dynamic-import stall PRECEDES the entrance beat instead of
// landing INSIDE the `.route-enter` animation clock (the stall-eaten window that made
// 2.1's `gl-route-enter` rise sub-perceptual: the animation start-time is style-resolve,
// so a ~120ms chunk stall arrived past snappy's half-clock and the surviving 12px-rise
// tail read as a plain fade). Awaiting the lazy `component: () => import()` in
// `beforeResolve` means the swap commits with the chunk ALREADY warm — frame 0 of the
// new route paints the `from` state and the whole rise reads. This SUPERSEDES the
// W-NAV-DOCK-FIX one-shot (which only warmed the FIRST navigation — the initial-flash
// fix — and left every subsequent swap stall-eaten): the guard is now every-nav, and a
// warm chunk resolves synchronously so there is no per-nav cost after the first visit.
router.beforeResolve(async (to) => {
    const comps = to.matched
        .map((r) => r.components?.default)
        .filter(
            (c): c is () => Promise<unknown> => typeof c === "function",
        );
    await Promise.all(comps.map((c) => c().catch(() => undefined)));
    return true;
});
