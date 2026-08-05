import { nextTick } from "vue";
import type { RouteLocationRaw, Router } from "vue-router";
import {
    ROUTE_WINDOW_ATTR,
    routeTransition,
    type RouteNavClass,
} from "@glass/composables/motion/core";
import { CATEGORIES } from "../stories/manifest";

/**
 * The demo's one route mutation owner, and the grammar's one consumer.
 *
 * The library owns the mechanism (naming the window, typing the transition, the CSS
 * fork); what a consumer owns is the two questions only it can answer — WHICH class this
 * navigation is, and WHICH element is continuous across it.
 *
 * ── The classifier ───────────────────────────────────────────────────────────
 * Depth decides. `/` → `/forms` and `/forms` → `/forms/slider` go DEEPER, so they are
 * zooms; `/forms/slider` → `/forms` comes back OUT, a collapse; two paths at the same
 * depth are siblings, a lateral push. Anything the manifest cannot place (the 404, an
 * external path) falls to `route`, the cut — which is the honest answer, because with
 * nothing continuous between the two states there is nothing to carry.
 *
 * ── The window key ───────────────────────────────────────────────────────────
 * Every element that can be a window declares `data-route-window="<path>"`: a preview
 * card declares the path it opens, a story article declares the path it IS. The
 * continuous object is then always the DEEPER of the two paths — the cell going in, the
 * same cell coming back out — and a lateral names one article on each side.
 */
export type { RouteNavClass };

const depthOf = (path: string): number =>
    path.split("/").filter(Boolean).length;

/** The flat manifest order, used only to give a lateral push its sign. */
function flatIndex(path: string): number {
    const [categoryId, storyId] = path.split("/").filter(Boolean);
    let index = 0;
    for (const category of CATEGORIES) {
        if (category.id === categoryId) {
            if (!storyId) return index;
            const local = category.stories.findIndex((s) => s.id === storyId);
            return local < 0 ? index : index + 1 + local;
        }
        index += 1 + category.stories.length;
    }
    return -1;
}

interface NavPlan {
    readonly nav: RouteNavClass;
    /** The `data-route-window` key in the OLD state, if any. */
    readonly sourceKey: string | null;
    /** The `data-route-window` key in the NEW state, if any. */
    readonly targetKey: string | null;
    readonly direction: number;
}

export function planNav(from: string, to: string): NavPlan {
    const fromDepth = depthOf(from);
    const toDepth = depthOf(to);

    if (toDepth > fromDepth) {
        return { nav: "zoom", sourceKey: to, targetKey: to, direction: 0 };
    }
    if (toDepth < fromDepth) {
        return { nav: "collapse", sourceKey: from, targetKey: from, direction: 0 };
    }

    const a = flatIndex(from);
    const b = flatIndex(to);
    if (a < 0 || b < 0 || a === b) {
        return { nav: "route", sourceKey: null, targetKey: null, direction: 0 };
    }
    return {
        nav: "lateral",
        sourceKey: from,
        targetKey: to,
        direction: Math.sign(b - a),
    };
}

const windowFor = (key: string | null): HTMLElement | null =>
    key === null
        ? null
        : document.querySelector<HTMLElement>(
              `[${ROUTE_WINDOW_ATTR}="${CSS.escape(key)}"]`,
          );

/** Push a route under the typed grammar. */
export function pushRoute(router: Router, to: RouteLocationRaw): Promise<void> {
    const target = router.resolve(to);
    const from = router.currentRoute.value.path;
    if (target.fullPath === router.currentRoute.value.fullPath) {
        return Promise.resolve();
    }

    const plan = planNav(from, target.path);

    return routeTransition({
        nav: plan.nav,
        source: windowFor(plan.sourceKey),
        target: () => windowFor(plan.targetKey),
        direction: plan.direction,
        mutate: async () => {
            await router.push(to);
            // The destination must be RENDERED before the runtime snapshots the new
            // state, otherwise `target()` resolves nothing and the window silently
            // degrades to a root cross-fade.
            await nextTick();
        },
    }).finished;
}
