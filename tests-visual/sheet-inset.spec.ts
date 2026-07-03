// BG.W-SHEET-INSET-ROOT — sheet-inset.spec.ts, the BINDING π readback (the D7
// configurator-drawer fix). proof:emission proves the producer-side truth (the CVA
// geometry is STRIPPED + the [data-slot="sheet-content"][data-side] positioning SHIPS in
// dist/glass-ui.css); THIS spec proves the painted RENDER — an opened Sheet actually
// PINS to its viewport edge (`top === 0` for the right/left/top sheets, `bottom` flush for
// the bottom sheet), reads on-screen on all four edges, and sits under NO transformed/
// contained ancestor that would break `position: fixed` (reka teleports to <body>).
//
// This is the source-green/visually-broken gap the BA gestalt bar exists to close: the
// authored CVA utilities were "present in source" yet never compiled into a consumer's
// scan, so the Sheet rendered unpositioned and off-screen. The live getBoundingClientRect
// readback is the binding truth. Fail-CLOSED: an off-screen / unpositioned sheet reds.
//
// RUN AFTER `npm run build` (the /styles cascade must carry the shipped sheet.css rule the
// demo dev-server resolves via @mkbabb/glass-ui/styles).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BG/audit/visual/sheet-inset/", import.meta.url),
);

function frame(name: string): string {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return `${VISUAL_DIR}${name}`;
}

type Side = "top" | "right" | "bottom" | "left";
const SIDES: readonly Side[] = ["right", "left", "top", "bottom"] as const;

// The ancestor chain from the portaled content node up to <html> carries no property that
// re-roots `position: fixed` off the viewport (transform/filter/backdrop-filter/perspective/
// will-change:transform/contain). Returns the list of offending ancestors (empty = clean).
async function badFixedAncestors(page: Page, side: Side): Promise<string[]> {
    return page.evaluate((s) => {
        const el = document.querySelector(
            `[data-slot="sheet-content"][data-side="${s}"]`,
        ) as HTMLElement | null;
        if (!el) return ["<content node missing>"];
        const bad: string[] = [];
        let node: HTMLElement | null = el.parentElement;
        while (node && node !== document.documentElement) {
            const cs = getComputedStyle(node);
            const offenders: string[] = [];
            if (cs.transform && cs.transform !== "none") offenders.push(`transform:${cs.transform}`);
            if (cs.filter && cs.filter !== "none") offenders.push(`filter:${cs.filter}`);
            if (cs.backdropFilter && cs.backdropFilter !== "none")
                offenders.push(`backdrop-filter:${cs.backdropFilter}`);
            if (cs.perspective && cs.perspective !== "none")
                offenders.push(`perspective:${cs.perspective}`);
            if (/transform/.test(cs.willChange)) offenders.push(`will-change:${cs.willChange}`);
            if (/\b(paint|layout|strict|content)\b/.test(cs.contain))
                offenders.push(`contain:${cs.contain}`);
            if (offenders.length)
                bad.push(`${node.tagName.toLowerCase()}.${node.className || "-"}: ${offenders.join(", ")}`);
            node = node.parentElement;
        }
        return bad;
    }, side);
}

async function openSheet(page: Page, side: Side): Promise<void> {
    const trigger = page.getByRole("button", { name: new RegExp(`open ${side}`, "i") });
    await trigger.first().scrollIntoViewIfNeeded();
    await trigger.first().click();
    await page
        .locator(`[data-slot="sheet-content"][data-side="${side}"]`)
        .first()
        .waitFor({ state: "visible", timeout: 5000 });
}

async function closeSheet(page: Page): Promise<void> {
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400); // let the exit animation settle + unmount
}

function runSuite(mode: "light" | "dark"): void {
    test.describe(`BG.W-SHEET-INSET-ROOT — the Sheet pins to its viewport edge (${mode})`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/containers/sheet", { waitUntil: "networkidle" });
            if (mode === "dark") {
                await page.evaluate(() => document.documentElement.classList.add("dark"));
            }
        });

        for (const side of SIDES) {
            test(`the ${side} sheet is fixed, edge-pinned, on-screen, no bad ancestor`, async ({
                page,
            }) => {
                await openSheet(page, side);
                const content = page
                    .locator(`[data-slot="sheet-content"][data-side="${side}"]`)
                    .first();

                // position:fixed — the shipped [data-slot] rule paints it (not the dead CVA).
                await expect(content).toHaveCSS("position", "fixed");

                const vp = page.viewportSize()!;
                const box = await content.boundingBox();
                expect(box, `${side} sheet has a bounding box`).not.toBeNull();
                const { x, y, width, height } = box!;
                const TOL = 1.5;

                // Edge-pinned — the D7 `top===0` truth for the top-anchored sides; the
                // bottom sheet pins its bottom edge flush to the viewport floor.
                if (side === "right" || side === "left" || side === "top") {
                    expect(Math.abs(y), `${side} sheet top===0`).toBeLessThanOrEqual(TOL);
                } else {
                    expect(
                        Math.abs(y + height - vp.height),
                        "bottom sheet bottom edge flush to viewport",
                    ).toBeLessThanOrEqual(TOL);
                }
                if (side === "right") {
                    expect(
                        Math.abs(x + width - vp.width),
                        "right sheet right edge flush",
                    ).toBeLessThanOrEqual(TOL);
                }
                if (side === "left") {
                    expect(Math.abs(x), "left sheet left edge flush").toBeLessThanOrEqual(TOL);
                }

                // onScreen all-4 — every edge lands within the viewport (with tolerance).
                expect(y, `${side} top on-screen`).toBeGreaterThanOrEqual(-TOL);
                expect(x, `${side} left on-screen`).toBeGreaterThanOrEqual(-TOL);
                expect(x + width, `${side} right on-screen`).toBeLessThanOrEqual(vp.width + TOL);
                expect(
                    y + height,
                    `${side} bottom on-screen`,
                ).toBeLessThanOrEqual(vp.height + TOL);
                // And the sheet has real extent (not a collapsed 0-box).
                expect(width, `${side} sheet has width`).toBeGreaterThan(1);
                expect(height, `${side} sheet has height`).toBeGreaterThan(1);

                // No transform/contain ancestor re-roots the fixed positioning.
                const bad = await badFixedAncestors(page, side);
                expect(bad, `no fixed-breaking ancestor for the ${side} sheet`).toEqual([]);

                if (side === "right") {
                    await page.screenshot({ path: frame(`sheet-right-${mode}.png`) });
                }

                await closeSheet(page);
            });
        }
    });
}

runSuite("light");
runSuite("dark");
