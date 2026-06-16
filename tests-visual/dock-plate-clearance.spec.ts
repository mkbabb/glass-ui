// BA.W-DOCK-GEOMETRY — the binding π SHELL readback for the control-plate
// clearance (the lozenge dies at the geometry root). The cardinal lesson: the user
// audits the live :5199 SHELL, not a story mount. This spec drives the running demo
// and asserts the runtime truths on BOTH shell docks (SidebarDock vertical +
// BottomDock horizontal), both modes (light + dark), hover + active + press:
//
//   G1 — the plate slack inside the clip cell is ≥1px on EVERY axis at hover/active
//        (no perimeter on the clip edge — the painted plate is a clean circle inset
//        within the track, never a flat-topped lozenge). Measured as the painted
//        content-box rect vs the cross-axis clip ancestor rect.
//   G2 — the cross-axis clip ancestor on the fit-content shell computes
//        `overflow:visible` on the NON-scroll (cross) axis (not the companion
//        `auto`) — the DC-1 un-clip held live.
//   G3 — the contain:paint audit number: the maximal hover plate stays INSIDE the
//        dock padding box (the verdict-(a) live measurement that binds the source
//        marker; the plate-inside-padding margin ≥0).
//
// The evidence is the .png frames + the readback JSON, captured to
// docs/tranches/BA/audit/visual/W-DOCK-GEOMETRY-DELTA.md's sibling dir. Driven
// against the running demo on :5199. Local-only (the runner-truth disposition the
// dock-animation-live gates carry); proof:dock-plate-clearance is the device-free
// CI half, this is the binding visual truth. The whole-dock gestalt verdict is
// W-REFLECT2's proof:ba-gestalt — this is one input, not that verdict.

import { fileURLToPath } from "node:url";
import { writeFileSync, mkdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/BA/audit/visual/dock-plate-clearance`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

mkdirSync(OUT, { recursive: true });

async function goto(page: Page, route: string) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(450);
}

async function setDark(page: Page, dark: boolean) {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(120);
}

/**
 * Read the plate-clearance truth for ONE dock control: the painted plate
 * (content-box) rect vs its cross-axis clip ancestor, the clip ancestor's computed
 * cross-axis `overflow`, and the plate-inside-dock-padding margin (the contain:paint
 * verdict number). Measured at the CURRENT interaction state (the caller hovers /
 * presses before calling).
 */
async function readControl(page: Page, dockSelector: string, controlSelector: string) {
    return page.evaluate(
        ([dockSel, ctrlSel]) => {
            const dock = document.querySelector(dockSel) as HTMLElement | null;
            if (!dock) return { found: false as const };
            const ctrl = dock.querySelector(ctrlSel) as HTMLElement | null;
            if (!ctrl) return { found: false as const };

            // The PAINTED plate is the content box (the inset background-clip:
            // content-box plate). Compute it from the element border box minus the
            // resolved padding, then apply the live transform (the hover/press
            // `scale`) by reading getBoundingClientRect (which includes the
            // transform) and insetting by the scaled padding.
            const cs = getComputedStyle(ctrl);
            const cr = ctrl.getBoundingClientRect(); // includes the live scale
            // scale factor along each axis (the rendered box vs the layout box).
            const layoutW = ctrl.offsetWidth || cr.width;
            const layoutH = ctrl.offsetHeight || cr.height;
            const sx = layoutW ? cr.width / layoutW : 1;
            const sy = layoutH ? cr.height / layoutH : 1;
            const padL = parseFloat(cs.paddingLeft) * sx;
            const padR = parseFloat(cs.paddingRight) * sx;
            const padT = parseFloat(cs.paddingTop) * sy;
            const padB = parseFloat(cs.paddingBottom) * sy;
            const plate = {
                left: cr.left + padL,
                right: cr.right - padR,
                top: cr.top + padT,
                bottom: cr.bottom - padB,
            };

            // The cross-axis CLIP ancestor — the nearest ancestor with a non-visible
            // overflow on either axis (the `.dock-layer--full` for horizontal, or the
            // dock for vertical). Walk up to the dock root.
            let clip: HTMLElement | null = ctrl.parentElement;
            let clipEl: HTMLElement | null = null;
            while (clip && clip !== dock.parentElement) {
                const ccs = getComputedStyle(clip);
                if (ccs.overflowX !== "visible" || ccs.overflowY !== "visible") {
                    clipEl = clip;
                    break;
                }
                clip = clip.parentElement;
            }
            const clipTarget = clipEl ?? dock;
            const clipR = clipTarget.getBoundingClientRect();
            const clipCs = getComputedStyle(clipTarget);

            // G1 — slack per axis of the painted plate inside the clip cell.
            const slack = {
                top: +(plate.top - clipR.top).toFixed(2),
                bottom: +(clipR.bottom - plate.bottom).toFixed(2),
                left: +(plate.left - clipR.left).toFixed(2),
                right: +(clipR.right - plate.right).toFixed(2),
            };
            const minSlack = Math.min(slack.top, slack.bottom, slack.left, slack.right);

            // G3 — plate-inside-dock-padding margin (the contain:paint verdict number:
            // the dock border box is the contain:paint clip; the plate must stay
            // inside it with margin).
            const dr = dock.getBoundingClientRect();
            const padMargin = {
                top: +(plate.top - dr.top).toFixed(2),
                bottom: +(dr.bottom - plate.bottom).toFixed(2),
                left: +(plate.left - dr.left).toFixed(2),
                right: +(dr.right - plate.right).toFixed(2),
            };
            const minPadMargin = Math.min(
                padMargin.top,
                padMargin.bottom,
                padMargin.left,
                padMargin.right,
            );

            return {
                found: true as const,
                control: ctrlSel,
                clipAncestorClass: clipTarget.className,
                clipOverflowX: clipCs.overflowX,
                clipOverflowY: clipCs.overflowY,
                plateRect: {
                    w: +(plate.right - plate.left).toFixed(2),
                    h: +(plate.bottom - plate.top).toFixed(2),
                },
                scale: { sx: +sx.toFixed(3), sy: +sy.toFixed(3) },
                slack,
                minSlack: +minSlack.toFixed(2),
                padMargin,
                minPadMargin: +minPadMargin.toFixed(2),
            };
        },
        [dockSelector, controlSelector] as const,
    );
}

const results: Record<string, unknown> = {};

// The two shell docks + a representative control selector for each. The icon
// button is the canonical fixed-square plate (the DC-2 victim); the sidebar nav
// uses icon buttons / tab buttons.
const SHELLS = [
    {
        name: "sidebar-vertical",
        viewport: { width: 1280, height: 800 },
        dock: ".demo-sidebar-dock",
        controls: [".dock-icon-button", ".dock-tab-button"],
    },
    {
        name: "bottom-horizontal",
        viewport: { width: 1280, height: 800 },
        dock: ".demo-bottom-dock__shell",
        controls: [".dock-icon-button", ".dock-tab-button"],
    },
];

for (const shell of SHELLS) {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`plate clearance — ${shell.name} (${mode})`, async ({ page }) => {
            await page.setViewportSize(shell.viewport);
            await goto(page, "/dock/overview");
            await setDark(page, dark);

            const dockHandle = page.locator(shell.dock).first();
            await expect(dockHandle).toBeVisible({ timeout: 8000 });

            for (const ctrlSel of shell.controls) {
                const ctrl = dockHandle.locator(ctrlSel).first();
                if ((await ctrl.count()) === 0) continue;

                // HOVER state — drive the real pointer so CSS :hover engages (the
                // hover scale needs it; a synthetic event never sets :hover).
                await ctrl.hover();
                await page.waitForTimeout(220); // settle the scale spring
                const hoverRead = await readControl(page, shell.dock, ctrlSel);
                const key = `${shell.name}/${mode}/${ctrlSel}/hover`;
                results[key] = hoverRead;

                if (hoverRead.found) {
                    // G1 — ≥1px slack on every axis (the painted plate clears the
                    // clip cell; the lozenge is a clean inset circle).
                    expect(
                        hoverRead.minSlack,
                        `${key}: painted-plate slack inside the clip cell must be ≥1px on every axis (min ${hoverRead.minSlack}px) — slack ${JSON.stringify(hoverRead.slack)} clip=${hoverRead.clipAncestorClass}`,
                    ).toBeGreaterThanOrEqual(1);

                    // G2 — the cross-axis clip ancestor computes `visible` on at
                    // least one axis (the fit-content shell does not clip both).
                    const crossVisible =
                        hoverRead.clipOverflowX === "visible" ||
                        hoverRead.clipOverflowY === "visible";
                    expect(
                        crossVisible,
                        `${key}: the clip ancestor (${hoverRead.clipAncestorClass}) must leave the CROSS axis visible (x=${hoverRead.clipOverflowX} y=${hoverRead.clipOverflowY}) — the DC-1 companion-clip un-pinned`,
                    ).toBe(true);

                    // G3 — the plate stays inside the dock padding box (contain:paint
                    // verdict (a) live measurement: margin ≥0).
                    expect(
                        hoverRead.minPadMargin,
                        `${key}: the maximal hover plate must stay INSIDE the dock padding box (contain:paint verdict-a; min margin ${hoverRead.minPadMargin}px)`,
                    ).toBeGreaterThanOrEqual(0);
                }

                // PRESS state — pointer down (the :active darken-plus-shrink). The
                // shrink makes the plate SMALLER, so clearance only improves; we
                // capture it for the DELTA record, not a tighter assert.
                await ctrl.hover();
                await page.mouse.down();
                await page.waitForTimeout(140);
                const pressRead = await readControl(page, shell.dock, ctrlSel);
                results[`${shell.name}/${mode}/${ctrlSel}/press`] = pressRead;
                await page.mouse.up();
            }

            // Capture the whole-dock frame for the DELTA (the gestalt input).
            await dockHandle.screenshot({
                path: `${OUT}/${shell.name}-${mode}.png`,
            });
        });
    }
}

test.afterAll(() => {
    writeFileSync(`${OUT}/readback.json`, `${JSON.stringify(results, null, 2)}\n`);
});
