import { computed } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import {
    CATEGORIES,
    firstStoryPath,
} from "./stories/manifest";
import { isFocalRoute, suppressesShellField } from "./chassis/hero/focal";

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
        // the category landing is the D1 SECTION HERO (the
        // newly-begotten per-section identity moment + the bento <SectionPreviewCard>
        // grid), NOT a redirect to the first story. The SAME StoryHero chassis at
        // heroScale: "hero", depth: "D1" (no new component — SectionLanding composes
        // it). An empty category falls back to the first story path.
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
                          // Whether the landing paints its own full-bleed field.
                          focal: isFocalRoute(category.id, category.landing?.background),
                          // A landing always mounts `StoryHero`
                          // as a true hero route (`isHeroPage: true`); the shell
                          // stands down only for a CHROMATIC landing field.
                          suppressesShellField: suppressesShellField(
                              category.id,
                              category.landing?.background,
                              true,
                          ),
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
                    // A route is focal when it owns a live background or stages one itself.
                    focal: isFocalRoute(`${category.id}/${story.id}`, story.background),
                    // A `background.kind` field mounts only on a hero page
                    // (`story.hero`); a CONTENT page (no hero) mounts no field and
                    // KEEPS the warm shell, and an achromatic constellation/fourier
                    // hero keeps it as an underpaint (CHROMATIC_FIELD_KINDS only).
                    suppressesShellField: suppressesShellField(
                        `${category.id}/${story.id}`,
                        story.background,
                        story.hero === true,
                    ),
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

/**
 * The shell field is a projection of the committed route, not parallel state.
 * A chromatic hero or self-staging Dock route owns the one page field and suppresses
 * the shell; ordinary routes retain it. Vue Router updates `currentRoute` only after
 * navigation commits, so a keeps→keeps navigation preserves the mounted shell node.
 */
export const shellFieldActive = computed(
    () => !router.currentRoute.value.meta?.suppressesShellField,
);

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
