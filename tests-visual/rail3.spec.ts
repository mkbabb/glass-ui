// AZ.W-RAIL3 — the binding π SHELL readback for the floating-carousel rail. The
// third-rail lesson: the user audits the live :5199 SHELL, not a story mount. This
// spec drives the running demo and asserts the four runtime truths on BOTH shell docks
// (SidebarDock + BottomDock) at >=2 viewports:
//
//   G1 — box INVIOLATE (the headline). The shell dock's getBoundingClientRect with the
//        rail strip mounted == the SAME dock with the strip slot removed, within <=1px
//        (the pre-fix tree FAILS this — 115px vs ~59px / 578px vs ~235px is the ~2×
//        inflation). The box did NOT grow.
//   G2 — the strip paints OUTSIDE on the visible hairline. Every chip's bounding box
//        lies entirely OUTSIDE the dock's border box (the strip is a .glass-dock-frame
//        sibling, not a .glass-dock descendant), and the connective --border-hairline
//        line is computed-present between the dock edge and the strip.
//   G3 — the carousel cycles. Clicking a facet chip moves the active highlight (and
//        navigates), writing the ONE registry.
//   G4 — the corpses are buried. No writing-mode/rotate clipped label on the dock edge;
//        no in-dock contextual DockLayerGroup TabsIndicator inside the shell dock body.
//
// One-shot generator + assertions (the evidence is the .png + the readback JSON).
// Driven against the running demo on :5199 (GLASS_UI_DEMO_URL). Local-only (the
// runner-truth disposition the dock-animation-live gates carry); proof:rail3 is the
// device-free CI half, this is the binding visual truth captured to W-RAIL3-DELTA.md.

import { fileURLToPath } from "node:url";
import { writeFileSync, mkdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AZ/audit/visual/rail3`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

mkdirSync(OUT, { recursive: true });

async function goto(page: Page, route: string) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(450);
}

/**
 * Read the rail-strip truth for a shell dock: the box-equality (G1), the
 * outside-the-box paint + connective hairline (G2), and the no-corpse witness (G4).
 */
async function readShell(page: Page, dockSelector: string) {
    return page.evaluate((sel) => {
        const dock = document.querySelector(sel) as HTMLElement | null;
        if (!dock) return { found: false } as const;
        const frame = dock.closest(".glass-dock-frame") as HTMLElement | null;
        const dr = dock.getBoundingClientRect();

        // G1 box-equality — measure with the strip slot, then remove it + re-measure.
        const withBox = { w: +dr.width.toFixed(2), h: +dr.height.toFixed(2) };
        const slot = frame?.querySelector(".dock-hairline-slot") as HTMLElement | null;
        let withoutBox = withBox;
        let deltaW = 0;
        let deltaH = 0;
        if (slot && slot.parentElement) {
            const parent = slot.parentElement;
            const next = slot.nextSibling;
            parent.removeChild(slot);
            void dock.offsetWidth;
            const dr2 = dock.getBoundingClientRect();
            withoutBox = { w: +dr2.width.toFixed(2), h: +dr2.height.toFixed(2) };
            deltaW = +(dr2.width - dr.width).toFixed(2);
            deltaH = +(dr2.height - dr.height).toFixed(2);
            if (next) parent.insertBefore(slot, next);
            else parent.appendChild(slot);
        }

        // G2 outside-the-box paint — every chip's box lies entirely outside the dock.
        const chips = Array.from(
            frame?.querySelectorAll(".dock-hairline-extend-chip") ?? [],
        ) as HTMLElement[];
        const chipBoxes = chips.map((c) => {
            const r = c.getBoundingClientRect();
            const outside =
                r.left >= dr.right - 1 || // beside (right)
                r.right <= dr.left + 1 || // beside (left)
                r.top >= dr.bottom - 1 || // below
                r.bottom <= dr.top + 1; // above
            return {
                label: (c.textContent ?? "").trim(),
                active: c.classList.contains("is-active"),
                outsideDock: outside,
            };
        });
        const allChipsOutside = chipBoxes.length > 0 && chipBoxes.every((c) => c.outsideDock);
        // the chip strip is a .glass-dock-frame sibling (not a .glass-dock descendant)
        const strip = frame?.querySelector(".dock-hairline-slot") as HTMLElement | null;
        const stripIsDockDescendant = !!strip && !!dock.contains(strip);

        // the connective --border-hairline line is computed-present
        const ext = frame?.querySelector(".dock-hairline-extend") as HTMLElement | null;
        const hairlineBoxShadow = ext
            ? getComputedStyle(ext, "::before").boxShadow
            : "";
        const hairlinePresent = /rgba?\(/.test(hairlineBoxShadow);

        // G4 corpses — no rotated/writing-mode clipped label inside the dock; no in-dock
        // contextual DockLayerGroup TabsIndicator inside the shell dock body.
        const rotatedLabel = !!dock.querySelector(
            ".demo-sidebar-context-label, [style*='writing-mode']",
        );
        const inDockContextGroup = !!dock.querySelector(
            "[data-testid='sidebar-dock-context-group'], [data-testid='bottom-dock-context-group']",
        );

        return {
            found: true,
            box: { withBox, withoutBox, deltaW, deltaH },
            chips: chipBoxes,
            allChipsOutside,
            stripIsDockDescendant,
            hairlineBoxShadow,
            hairlinePresent,
            corpses: { rotatedLabel, inDockContextGroup },
        } as const;
    }, dockSelector);
}

const SIDEBAR = ".demo-sidebar-dock";
const BOTTOM = ".demo-bottom-dock__shell";
const VIEWPORTS = [
    { name: "1280", width: 1280, height: 860 },
    { name: "820", width: 820, height: 900 },
];

for (const vp of VIEWPORTS) {
    for (const mode of ["light", "dark"] as const) {
        test(`AZ.W-RAIL3 — shell rail ${mode} @ ${vp.name}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            if (mode === "dark") {
                await page.emulateMedia({ colorScheme: "dark" });
            }
            // Forms carries 3 facets (Text/Selection/Toggles) — the multi-facet case
            // that mounts the carousel strip.
            await goto(page, "/forms/inputs");
            if (mode === "dark") {
                await page.evaluate(() => document.documentElement.classList.add("dark"));
                await page.waitForTimeout(150);
            }

            const sidebar = await readShell(page, SIDEBAR);
            const bottom = await readShell(page, BOTTOM);

            await page.screenshot({
                path: `${OUT}/shell-${mode}-forms-${vp.name}.png`,
            });

            const readback = {
                wave: "AZ.W-RAIL3",
                base: BASE,
                viewport: vp,
                mode,
                route: "/forms/inputs",
                sidebar,
                bottom,
            };
            writeFileSync(
                `${OUT}/readback-${mode}-${vp.name}.json`,
                JSON.stringify(readback, null, 2) + "\n",
            );

            // ── G1 box INVIOLATE (the headline) ──
            expect(sidebar.found, "SidebarDock present").toBe(true);
            expect(bottom.found, "BottomDock present").toBe(true);
            expect(
                Math.abs(sidebar.box!.deltaW),
                "SidebarDock width unchanged with the rail strip mounted vs removed (box INVIOLATE)",
            ).toBeLessThanOrEqual(1);
            expect(
                Math.abs(bottom.box!.deltaH),
                "BottomDock height unchanged with the rail strip mounted vs removed (box INVIOLATE)",
            ).toBeLessThanOrEqual(1);

            // ── G2 the strip paints OUTSIDE on the visible hairline ──
            expect(sidebar.chips!.length, "SidebarDock has facet chips").toBeGreaterThan(1);
            expect(bottom.chips!.length, "BottomDock has facet chips").toBeGreaterThan(1);
            expect(
                sidebar.allChipsOutside,
                "every SidebarDock chip lies OUTSIDE the dock box",
            ).toBe(true);
            expect(
                bottom.allChipsOutside,
                "every BottomDock chip lies OUTSIDE the dock box",
            ).toBe(true);
            expect(
                sidebar.stripIsDockDescendant,
                "the SidebarDock strip is NOT a .glass-dock descendant (it is a frame sibling)",
            ).toBe(false);
            expect(
                bottom.stripIsDockDescendant,
                "the BottomDock strip is NOT a .glass-dock descendant",
            ).toBe(false);
            expect(sidebar.hairlinePresent, "SidebarDock connective hairline present").toBe(
                true,
            );
            expect(bottom.hairlinePresent, "BottomDock connective hairline present").toBe(
                true,
            );

            // ── G4 the corpses are buried ──
            expect(
                sidebar.corpses!.rotatedLabel,
                "no rotated/writing-mode clipped label on the SidebarDock edge",
            ).toBe(false);
            expect(
                sidebar.corpses!.inDockContextGroup,
                "no in-dock contextual DockLayerGroup inside the SidebarDock body",
            ).toBe(false);
            expect(
                bottom.corpses!.inDockContextGroup,
                "no in-dock contextual DockLayerGroup inside the BottomDock body",
            ).toBe(false);
        });
    }
}

// ── G3 the carousel cycles (the ONE registry) ──
test("AZ.W-RAIL3 — carousel cycle writes the ONE registry", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 860 });
    await goto(page, "/forms/inputs");

    const cycle = await page.evaluate(async (sel) => {
        const dock = document.querySelector(sel);
        const frame = dock?.closest(".glass-dock-frame");
        const chips = Array.from(
            frame?.querySelectorAll(".dock-hairline-extend-chip") ?? [],
        ) as HTMLElement[];
        const before = {
            route: location.pathname,
            active: chips.find((c) => c.classList.contains("is-active"))?.textContent?.trim(),
        };
        const selection = chips.find((c) => (c.textContent ?? "").trim() === "Selection");
        selection?.dispatchEvent(
            new MouseEvent("click", { bubbles: true, cancelable: true, view: window }),
        );
        await new Promise((r) => setTimeout(r, 300));
        const chips2 = Array.from(
            frame?.querySelectorAll(".dock-hairline-extend-chip") ?? [],
        ) as HTMLElement[];
        const after = {
            route: location.pathname,
            active: chips2.find((c) => c.classList.contains("is-active"))?.textContent?.trim(),
        };
        return { before, after };
    }, SIDEBAR);

    writeFileSync(
        `${OUT}/readback-cycle.json`,
        JSON.stringify({ wave: "AZ.W-RAIL3", clause: "G3 carousel cycle", cycle }, null, 2) +
            "\n",
    );

    // Clicking the Selection chip moves the active highlight AND navigates (the ONE
    // registry — the rail writes the same navigation state the nav items drive).
    expect(cycle.before.active, "before: Text active").toBe("Text");
    expect(cycle.after.active, "after: Selection active (the highlight moved)").toBe(
        "Selection",
    );
    expect(cycle.after.route, "navigated to the Selection facet's first story").toContain(
        "/forms/select",
    );
});
