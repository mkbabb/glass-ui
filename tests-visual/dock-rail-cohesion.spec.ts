// AY.W-DOCK2 (D5 / HG5) — proof:dock-rail-cohesion, the live-DOM arm in the π
// workspace. The DockLayerGroup switcher rail double-rendered its indicator: the
// `<TabsList class="dock-layer-rail">` mounted WITHOUT `:indicator="false"`, so
// TabsList rendered its phantom DEFAULT `<TabsIndicator>` (the `bg-[var(--glass-bg-quiet)]`
// plate) AND the rail's explicit `.dock-layer-tab-indicator` (the `--primary 15%`
// plate) both painted (H-dock §D7 L1). W-DOCK2's `:indicator="false"` kills the
// phantom default.
//
// This spec asserts the rendered DOM carries EXACTLY ONE `[data-slot="tabs-indicator"]`
// under `.dock-layer-rail` (the single-indicator truth). The device-free source arm
// (the `:indicator="false"` attribute + the one-clock + the persistence book) lives
// in proof-dock-rail-cohesion.mjs.

import { test, expect } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

test.describe("dock-rail-cohesion (π lane — single-indicator DOM truth)", () => {
    test("the DockLayerGroup rail renders exactly ONE TabsIndicator", async ({
        page,
    }) => {
        // The dock-layers story (`/dock/layers`) mounts a DockLayerGroup with the
        // built-in switcher rail (`show-rail`). PI_TARGETS.dock → /dock/overview;
        // navigate from there to the layers story (the rail surface).
        await page.goto(PI_TARGETS.dock.path);
        await page.evaluate(() => {
            const a = [...document.querySelectorAll("a[href]")].find(
                (x) => x.getAttribute("href") === "/dock/layers",
            ) as HTMLAnchorElement | undefined;
            a?.click();
        });
        await page.waitForSelector(".dock-layer-rail", { timeout: 15_000 });

        // Count `[data-slot="tabs-indicator"]` descendants of EACH `.dock-layer-rail`.
        // EXACTLY ONE per rail — the explicit `.dock-layer-tab-indicator`, with the
        // phantom default TabsIndicator killed by `:indicator="false"`.
        const counts = await page.evaluate(() => {
            const rails = [...document.querySelectorAll(".dock-layer-rail")];
            return rails.map(
                (r) => r.querySelectorAll('[data-slot="tabs-indicator"]').length,
            );
        });

        expect(counts.length, "no .dock-layer-rail rendered on /dock/layers").toBeGreaterThan(
            0,
        );
        for (const n of counts) {
            expect(
                n,
                `a .dock-layer-rail painted ${n} [data-slot="tabs-indicator"] — must be exactly 1 (the phantom default TabsIndicator must be killed by :indicator="false"; the double-indicator regression, H-dock §D7 L1)`,
            ).toBe(1);
        }
    });
});
