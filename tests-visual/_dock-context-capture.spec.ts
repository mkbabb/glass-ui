// AZ.W-DOCK-CONTEXT — W3 live capture: the per-route DockLayer swap on the SHELL
// docks (the binding observable). Navigates the BottomDock + SidebarDock between two
// route-contexts BY ROUTE ALONE and reads the contextual DockLayer set the dock
// renders, proving the SAME dock surfaces a DIFFERENT layer set purely because the
// route changed. Writes the screenshots + the layer-set delta readback into the AZ
// visual audit dir.
//
// One-shot generator (the evidence is the .png + the readback JSON). Driven against
// the running demo on :5199 (GLASS_UI_DEMO_URL).

import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AZ/audit/visual`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

async function goto(page: Page, route: string) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(450);
}

/** Read the contextual DockLayer set the SHELL dock renders for the active route. */
async function readContextLayers(page: Page, testid: string) {
    // AZ.W-RAIL3 — the contextual facets moved OUT of the in-dock <DockLayerGroup>
    // (deleted, box-inflating) onto the rail's floating-carousel strip. The route→layer
    // swap now reads off the rail strip chips (the facet set per route), not the retired
    // in-dock switcher rail. The `testid` is the SHELL dock testid (sidebar-dock-rail /
    // bottom-dock-rail).
    return page.evaluate((id) => {
        const rail = document.querySelector(`[data-testid="${id}"]`);
        if (!rail) return { present: false, railTabs: [], facetEntries: [] };
        // The carousel chips (one per facet) — their labels ARE the facet set.
        const railTabs = Array.from(
            rail.querySelectorAll(".dock-hairline-extend-chip"),
        ).map((t) => (t.getAttribute("aria-label") ?? t.textContent ?? "").trim());
        // The active facet chip (the highlight tracks the route).
        const facetEntries = Array.from(
            rail.querySelectorAll(".dock-hairline-extend-chip.is-active"),
        )
            .map((e) => (e.getAttribute("aria-label") ?? e.textContent ?? "").trim())
            .filter(Boolean);
        return { present: true, railTabs, facetEntries };
    }, testid);
}

test("AZ.W-DOCK-CONTEXT W3 — per-route DockLayer swap on the shell docks", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Two CALM content route-contexts (no heavy live WebGL substrate to saturate
    // headless rAF): Forms vs Data. The route→layer swap is proven the same — the
    // dock surfaces Forms facets {Text, Selection, Toggles} on one and Data facets
    // {Tables, Lists, Series} on the other.
    // ── Route-context A: Forms ──
    await goto(page, "/forms/inputs");
    const bottomA = await readContextLayers(page, "bottom-dock-rail");
    const sidebarA = await readContextLayers(page, "sidebar-dock-rail");
    await page.screenshot({
        path: `${OUT}/W-DOCK-CONTEXT-shell-forms.png`,
        clip: { x: 0, y: 540, width: 1280, height: 260 },
    });

    // ── Route-context B: Data (BY ROUTE ALONE — no other interaction) ──
    await goto(page, "/data/table");
    const bottomB = await readContextLayers(page, "bottom-dock-rail");
    const sidebarB = await readContextLayers(page, "sidebar-dock-rail");
    await page.screenshot({
        path: `${OUT}/W-DOCK-CONTEXT-shell-data.png`,
        clip: { x: 0, y: 540, width: 1280, height: 260 },
    });

    const readback = {
        wave: "AZ.W-DOCK-CONTEXT",
        clause: "W3 — live per-route DockLayer swap on the shell docks",
        base: BASE,
        routeA: { route: "/forms/inputs", bottom: bottomA, sidebar: sidebarA },
        routeB: { route: "/data/table", bottom: bottomB, sidebar: sidebarB },
        // The delta: the rail-tab facet sets DIFFER between the two routes.
        bottomRailDiffers:
            JSON.stringify(bottomA.railTabs) !== JSON.stringify(bottomB.railTabs),
        sidebarRailDiffers:
            JSON.stringify(sidebarA.railTabs) !== JSON.stringify(sidebarB.railTabs),
    };
    writeFileSync(
        `${OUT}/W-DOCK-CONTEXT-readback.json`,
        JSON.stringify(readback, null, 2) + "\n",
    );

    // The binding assertion: the SHELL dock renders a DIFFERENT facet layer set on
    // the two routes (route→layer determinism). Both shell docks must swap.
    expect(bottomA.present, "bottom context group present on route A").toBe(true);
    expect(bottomB.present, "bottom context group present on route B").toBe(true);
    expect(bottomA.railTabs.length, "route A has facet layers").toBeGreaterThan(0);
    expect(
        readback.bottomRailDiffers,
        "the BottomDock facet layer set CHANGES between Forms and Data (route→layer swap)",
    ).toBe(true);
    expect(
        readback.sidebarRailDiffers,
        "the SidebarDock facet layer set CHANGES between Forms and Data (route→layer swap)",
    ).toBe(true);
});
