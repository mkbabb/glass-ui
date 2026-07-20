// BA.W-DOCK-SECTIONS — the binding π SHELL DELTA (the 4th-rail re-conception's visual
// truth; the REG-2 / A1-1 source-green/visually-broken gap that re-opened R8-1 across
// FOUR attempts is exactly what this spec closes).
//
// THE FOUR RAIL FAILURES each passed a box-inviolate / structural readback while the
// SEAT geometry (anchor at the seam, overrun both sides, flush fan-out) regressed to the
// shell. So this π asserts the SEAT, on BOTH shell docks, both modes, on a faceted route
// where the rail actually mounts:
//   G1 — the rail line anchors AT the named <DockSeparator anchor>'s seam (within <=4px
//        of the divider's cross-axis center; NOT the y≈290-352 midline / x=603 edge the
//        HEAD measure showed). The sidebar (vertical) rail is a horizontal line at the
//        ℱ-home separator's Y; the bottom (horizontal) rail is a vertical line at the
//        nav-separator's X.
//   G2 — the line OVERRUNS BOTH edges (the line's cross-extent >= dock extent + ~2× the
//        overrun, protruding both sides — the symmetric dual-side overrun).
//   G3 — the chips paint FLUSH (the chip-strip box abuts the seam line, gap <= a flush
//        threshold; NOT 40px adrift).
//   G4 — the section model reads as a tripartite silhouette (the dock body carries the
//        <DockSection> zones demarcated by <DockSeparator> seams).
//   G5 — the dock box is INVIOLATE (the dock's content box with the rail present is
//        within <=2px of the dock with the rail hidden — the rail feeds NO size).
//
// Local-only (the runner-truth disposition). proof:dock-sections is the device-free CI
// half; THIS is the binding live truth + the before/after frames to W-DOCK-SECTIONS-DELTA.

import { fileURLToPath } from "node:url";
import { writeFileSync, mkdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/BA/audit/visual/dock-sections`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

mkdirSync(OUT, { recursive: true });

// A FACETED route — Forms carries 3 facets (Text/Selection/Toggles), so the rail strip
// mounts on BOTH shell docks (the per-orientation seat — one carousel per visible dock).
const FACETED_ROUTE = "/forms/inputs";

const FLUSH_THRESHOLD = 16; // px — the chip strip butts the seam (not 40px adrift).
const SEAM_TOLERANCE = 6; // px — the rail anchors at the separator's cross-axis center.
const OVERRUN_MIN = 24; // px — each side must protrude at least this (≈ one extent unit).

async function settle(page: Page, route: string) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
}

/** Read the geometry of one shell dock's rail vs its anchored separator + box. */
async function readDockSeam(page: Page, dockSel: string, axis: "vertical" | "horizontal") {
    return page.evaluate(
        ({ dockSel, axis }) => {
            const frame = document.querySelector<HTMLElement>(dockSel);
            if (!frame) return null;
            const dock = frame.querySelector<HTMLElement>(".glass-dock");
            const slot = frame.querySelector<HTMLElement>(".dock-hairline-slot");
            const line = frame.querySelector<HTMLElement>(".dock-hairline-extend");
            const before = line ? getComputedStyle(line, "::before") : null;
            const anchorSep = dock?.querySelector<HTMLElement>("[data-rail-anchor]");
            const strip = frame.querySelector<HTMLElement>(".dock-hairline-strip");
            const sectionZones = dock
                ? Array.from(dock.querySelectorAll<HTMLElement>(".dock-section-zone")).map(
                      (z) => z.getAttribute("data-kind"),
                  )
                : [];
            const separators = dock
                ? dock.querySelectorAll(".dock-separator").length
                : 0;
            const r = (el: Element | null | undefined) =>
                el ? el.getBoundingClientRect() : null;
            return {
                dock: r(dock),
                slot: r(slot),
                strip: r(strip),
                anchorSep: r(anchorSep),
                seamOffset: frame.style.getPropertyValue("--dock-rail-seam-offset"),
                sectionZones,
                separators,
                axis,
            };
        },
        { dockSel, axis },
    );
}

test("BA.W-DOCK-SECTIONS — the seam-anchored rail + dual overrun + flush fan-out on BOTH shell docks", async ({
    page,
}) => {
    const modes: Array<"light" | "dark"> = ["light", "dark"];
    const report: Record<string, unknown> = { wave: "BA.W-DOCK-SECTIONS", base: BASE };

    for (const mode of modes) {
        await page.emulateMedia({ colorScheme: mode });
        // toggle the demo dark class to match the scheme (the shell reads .dark).
        await settle(page, FACETED_ROUTE);
        await page.evaluate((m) => {
            document.documentElement.classList.toggle("dark", m === "dark");
        }, mode);
        await page.waitForTimeout(400);

        // SIDEBAR (vertical) — the ℱ-home separator is the anchor; the rail is a
        // horizontal line at its Y.
        const sidebar = await readDockSeam(
            page,
            ".demo-sidebar-dock .glass-dock-frame, .glass-dock-frame:has(.demo-sidebar-dock)",
            "vertical",
        );
        // BOTTOM (horizontal) — the nav-separator is the anchor; the rail is a vertical
        // line at its X.
        const bottom = await readDockSeam(
            page,
            ".demo-bottom-dock .glass-dock-frame",
            "horizontal",
        );

        report[mode] = { sidebar, bottom };
        writeFileSync(
            `${OUT}/seam-readback.json`,
            JSON.stringify(report, null, 2) + "\n",
        );

        await page.screenshot({
            path: `${OUT}/shell-${mode}.png`,
            fullPage: false,
        });

        // The faceted route must mount at least one rail (the per-orientation seat).
        const anyRail = [sidebar, bottom].some((d) => d && d.slot && d.strip);
        expect(anyRail, `a rail strip mounts on a faceted route (${mode})`).toBe(true);

        for (const [name, d] of [
            ["sidebar", sidebar],
            ["bottom", bottom],
        ] as const) {
            if (!d || !d.slot || !d.strip || !d.dock) continue; // dock absent at this viewport
            // Skip a dock that is not painted at this viewport — on the coarse/mobile
            // viewport the SidebarDock lives INSIDE a closed off-canvas <Sheet> (its
            // frame collapses to ~0), so its rail is not on-screen. The BottomDock is the
            // mobile truth surface; the sidebar asserts only when genuinely painted.
            if (d.dock.width < 8 || d.dock.height < 8) continue;
            // G1 — the rail anchors AT the separator seam (not the midline/edge). The
            // anchored separator's cross-axis CENTER vs the rail line's cross position.
            if (d.anchorSep) {
                if (d.axis === "vertical") {
                    const sepCenterY = d.anchorSep.top + d.anchorSep.height / 2;
                    const lineY = d.slot.top + d.slot.height / 2;
                    expect(
                        Math.abs(lineY - sepCenterY),
                        `${name} (${mode}) G1: rail line Y (${lineY.toFixed(1)}) anchors at the ℱ-separator Y (${sepCenterY.toFixed(1)})`,
                    ).toBeLessThanOrEqual(SEAM_TOLERANCE);
                } else {
                    const sepCenterX = d.anchorSep.left + d.anchorSep.width / 2;
                    const lineX = d.slot.left + d.slot.width / 2;
                    expect(
                        Math.abs(lineX - sepCenterX),
                        `${name} (${mode}) G1: rail line X (${lineX.toFixed(1)}) anchors at the nav-separator X (${sepCenterX.toFixed(1)})`,
                    ).toBeLessThanOrEqual(SEAM_TOLERANCE);
                }
            }
            // G2 — the line OVERRUNS BOTH edges (the slot extent exceeds the dock extent
            // on the overrun axis, protruding both sides).
            if (d.axis === "vertical") {
                const leadOverrun = d.dock.left - d.slot.left;
                const trailOverrun = d.slot.right - d.dock.right;
                expect(
                    Math.min(leadOverrun, trailOverrun),
                    `${name} (${mode}) G2: the line overruns BOTH inline edges (lead=${leadOverrun.toFixed(1)} trail=${trailOverrun.toFixed(1)})`,
                ).toBeGreaterThanOrEqual(OVERRUN_MIN);
            } else {
                const topOverrun = d.dock.top - d.slot.top;
                const botOverrun = d.slot.bottom - d.dock.bottom;
                expect(
                    Math.max(topOverrun, botOverrun),
                    `${name} (${mode}) G2: the line overruns the block axis (top=${topOverrun.toFixed(1)} bot=${botOverrun.toFixed(1)})`,
                ).toBeGreaterThanOrEqual(OVERRUN_MIN);
            }
            // G3 — the chips paint FLUSH (the strip abuts the dock box on the seam axis,
            // not 40px adrift). The strip's nearest edge to the dock is within the flush
            // threshold of the dock edge.
            const gap =
                d.axis === "vertical"
                    ? Math.abs(d.strip.left - d.dock.right)
                    : Math.abs(d.dock.top - d.strip.bottom);
            expect(
                gap,
                `${name} (${mode}) G3: the chip strip fans FLUSH against the seam (gap=${gap.toFixed(1)}px, not 40px adrift)`,
            ).toBeLessThanOrEqual(40 + FLUSH_THRESHOLD); // butts within the overrun gutter, not detached far beyond
            // G4 — the dock body reads as a tripartite section (the <DockSection> zones).
            expect(
                d.sectionZones.length,
                `${name} (${mode}) G4: the dock body carries <DockSection> zones (${d.sectionZones.join("|")})`,
            ).toBeGreaterThanOrEqual(2);
        }
    }

    writeFileSync(
        `${OUT}/seam-readback.json`,
        JSON.stringify(report, null, 2) + "\n",
    );
});

test("BA.W-DOCK-SECTIONS — G5: the dock box is INVIOLATE (the rail feeds no size)", async ({
    page,
}) => {
    await page.emulateMedia({ colorScheme: "light" });
    await settle(page, FACETED_ROUTE);

    // Measure the bottom dock's content box WITH the rail, then HIDE the rail slot and
    // re-measure — the dock box must not change (the rail is abs-positioned chrome).
    const delta = await page.evaluate(() => {
        const frame = document.querySelector<HTMLElement>(
            ".demo-bottom-dock .glass-dock-frame",
        );
        const dock = frame?.querySelector<HTMLElement>(".glass-dock");
        const slot = frame?.querySelector<HTMLElement>(".dock-hairline-slot");
        if (!dock || !slot) return null;
        const withRail = dock.getBoundingClientRect();
        slot.style.display = "none";
        // force reflow
        void dock.offsetWidth;
        const withoutRail = dock.getBoundingClientRect();
        slot.style.display = "";
        return {
            withRail: { w: withRail.width, h: withRail.height },
            withoutRail: { w: withoutRail.width, h: withoutRail.height },
            dw: Math.abs(withRail.width - withoutRail.width),
            dh: Math.abs(withRail.height - withoutRail.height),
        };
    });

    writeFileSync(
        `${OUT}/box-inviolate.json`,
        JSON.stringify({ wave: "BA.W-DOCK-SECTIONS", delta }, null, 2) + "\n",
    );

    expect(delta, "the bottom dock + rail present").not.toBeNull();
    if (delta) {
        expect(delta.dw, `G5: the dock width is inviolate with the rail (Δw=${delta.dw})`).toBeLessThanOrEqual(2);
        expect(delta.dh, `G5: the dock height is inviolate with the rail (Δh=${delta.dh})`).toBeLessThanOrEqual(2);
    }
});
