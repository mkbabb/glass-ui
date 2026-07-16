import type { RouteLocationRaw, Router } from "vue-router";
import { startViewTransition } from "@glass/composables/motion/core";

/** The demo's one route mutation owner: native when useful, immediate otherwise. */
export function pushRoute(router: Router, to: RouteLocationRaw): Promise<void> {
    if (router.resolve(to).fullPath === router.currentRoute.value.fullPath) {
        return Promise.resolve();
    }

    return startViewTransition(async () => {
        await router.push(to);
    }, { types: ["route"] }).finished;
}
