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
 * `/:category` SECTION-LANDING hero (BC.W-PAGE-CHASSIS — the SECTION-HERO model)
 * plus a `/:category/:story` route per story. There are no flat standalone routes
 * — the former Aurora/GooBlob/Blob flat tools are now rows in the Substrates
 * category (AV.W10).
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
                      component: () => import("./chassis/landing/SectionLanding.vue"),
                      meta: {
                          categoryId: category.id,
                          landing: true,
                          title: category.title,
                          // BG.W-FIELD-AURORA (M2) — the landing's focal flag,
                          // derived from its resolved section-landing background.
                          focal: isFocalRoute(category.id, category.landing?.background),
                          // BG.W-PAGE-COMPONENT-AUDIT (17.6) — the shell-field
                          // suppression flag. A landing always mounts `StoryHero`
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
                    // BG.W-FIELD-AURORA (M2) — the route's focal flag (GL
                    // background.kind OR a SELF_STAGES_GL dock route). Owns-a-GL-field
                    // enumeration (the one-GL law); `proof:focal-complete` reads it.
                    focal: isFocalRoute(`${category.id}/${story.id}`, story.background),
                    // BG.W-PAGE-COMPONENT-AUDIT (17.6) — the shell-field suppression
                    // flag. A `background.kind` field mounts ONLY on a hero page
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
    // BG.W-ROUTE-TRANSITION (M0) — NO window-targeted scrollBehavior. `<main>` (not the
    // window) owns route scroll, so a window scroll-reset is a no-op double-fire of the
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
