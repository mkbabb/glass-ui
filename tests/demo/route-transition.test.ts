import { afterEach, describe, expect, it, vi } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";

import { pushRoute } from "../../demo/chassis/routeTransition";

const doc = document as unknown as { startViewTransition?: unknown };

function testRouter() {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: "/dock/overview", component: { template: "<div />" } },
            { path: "/dock/layers", component: { template: "<div />" } },
        ],
    });
}

afterEach(() => {
    delete doc.startViewTransition;
    vi.restoreAllMocks();
});

describe("demo route transitions", () => {
    it("does not capture an unchanged route", async () => {
        const router = testRouter();
        await router.push("/dock/overview");
        const native = vi.fn();
        doc.startViewTransition = native;

        await pushRoute(router, "/dock/overview");

        expect(native).not.toHaveBeenCalled();
        expect(router.currentRoute.value.fullPath).toBe("/dock/overview");
    });

    it("wraps a real route change in the native transition owner", async () => {
        const router = testRouter();
        await router.push("/dock/overview");
        vi.spyOn(CSS, "supports").mockReturnValue(false);
        const native = vi.fn((update: () => void | Promise<void>) => ({
            finished: Promise.resolve(update()),
        }));
        doc.startViewTransition = native;

        await pushRoute(router, "/dock/layers");

        expect(native).toHaveBeenCalledTimes(1);
        expect(router.currentRoute.value.fullPath).toBe("/dock/layers");
    });
});
