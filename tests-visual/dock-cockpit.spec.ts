// BC.W-AX-DOCK-COCKPIT — the binding π readback for the `cockpit` dock preset (the
// dock-oversize chronic A-9, closed). The cardinal lesson: the user audits the live
// :5199 SHELL, not a story mount. This spec mounts a comfortable dock + a
// `[data-preset="cockpit"]` dock with the SAME controls, both modes, and asserts the
// runtime truths via getComputedStyle:
//
//   C1 — the cockpit control floors at ≈ 2.75rem (44px). The fixed Q6 floor.
//   C2 — the cockpit label is sized `≈ control × --dock-label-ratio` AND is
//        MEASURABLY tighter (relative to its control) than the comfortable dock's
//        label (the proportional label, the A-9 close — the label never reads
//        OVERSIZE on the tight pill).
//   C3 — a BARE comfortable dock resolves the HEAD label size (byte-near-identical:
//        the resolved label ≈ --type-subheading 20.35px within a tight band).
//   C4 — a `:root { --dock-label-ratio: … }` override RETUNES every dock label (the
//        token cascade — one write retints the whole label family).
//   C5 — on coarse-pointer emulation the cockpit control clears 44px (the WCAG-2.5.5
//        floor holds; the cockpit is tight but never sub-floor).
//
// The evidence is the .png frames + the readback JSON, captured to the
// W-AX-DOCK-COCKPIT-DELTA.md sibling dir. Driven against the running demo on :5199.
// Local-only (the runner-truth disposition the dock gates carry); proof:dock-cockpit
// is the device-free CI half, this is the binding visual truth. The whole-dock
// gestalt verdict is the proof:ba-gestalt dock verdict — this is one input.

import { fileURLToPath } from "node:url";
import { writeFileSync, mkdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/BC/audit/visual/dock-cockpit`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

mkdirSync(OUT, { recursive: true });

const PX_PER_REM = 16;
const COCKPIT_PX = 2.75 * PX_PER_REM; // 44px
const SUBHEADING_PX = 1.272 * PX_PER_REM; // 20.35px — the HEAD bare-default label
const FLOOR_PX = 44; // WCAG 2.5.5

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
 * Mount a comfortable dock + a cockpit dock (same controls) into the running page,
 * then read each dock's resolved control-size + label font-size + label ratio. The
 * docks carry a real `.dock-label` so the `@utility dock-label` font-size resolves
 * against the per-scope `--dock-control-size`/`--dock-label-ratio`.
 */
async function mountAndRead(page: Page, rootRatioOverride?: number) {
    return page.evaluate(
        ({ override }) => {
            const host = document.createElement("div");
            host.id = "cockpit-probe";
            host.innerHTML = `
                <div class="glass-dock" data-density="comfortable" id="probe-comfortable">
                    <button class="dock-tab-button"><span class="dock-label">Start</span></button>
                </div>
                <div class="glass-dock" data-density="comfortable" data-preset="cockpit" id="probe-cockpit">
                    <button class="dock-tab-button"><span class="dock-label">Start</span></button>
                </div>
            `;
            document.body.appendChild(host);
            if (typeof override === "number") {
                document.documentElement.style.setProperty(
                    "--dock-label-ratio",
                    String(override),
                );
            }

            const read = (id: string) => {
                const dock = document.getElementById(id) as HTMLElement;
                const label = dock.querySelector(".dock-label") as HTMLElement;
                const dcs = getComputedStyle(dock);
                const lcs = getComputedStyle(label);
                const controlSize = parseFloat(dcs.getPropertyValue("--dock-control-size"));
                const ratio = parseFloat(dcs.getPropertyValue("--dock-label-ratio"));
                return {
                    controlSizePx: +controlSize.toFixed(2),
                    labelRatio: +ratio.toFixed(4),
                    labelFontPx: +parseFloat(lcs.fontSize).toFixed(2),
                };
            };

            const out = {
                comfortable: read("probe-comfortable"),
                cockpit: read("probe-cockpit"),
            };
            host.remove();
            if (typeof override === "number") {
                document.documentElement.style.removeProperty("--dock-label-ratio");
            }
            return out;
        },
        { override: rootRatioOverride },
    );
}

const results: Record<string, unknown> = {};

for (const dark of [false, true]) {
    const mode = dark ? "dark" : "light";

    test(`cockpit preset geometry + label ratio (${mode})`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await goto(page, "/dock/overview");
        await setDark(page, dark);

        const base = await mountAndRead(page);
        results[`${mode}/base`] = base;

        // C1 — the cockpit control floors at ≈ 2.75rem (44px). Fine pointer, scale 1.
        expect(
            base.cockpit.controlSizePx,
            `${mode}: cockpit control-size must be ≈ ${COCKPIT_PX}px (got ${base.cockpit.controlSizePx}px)`,
        ).toBeGreaterThanOrEqual(COCKPIT_PX - 1);
        expect(base.cockpit.controlSizePx).toBeLessThanOrEqual(COCKPIT_PX + 1);

        // C2 — the cockpit label tracks the control by ratio AND reads tighter
        // (relative to its control) than the comfortable dock's label. The relative
        // measure: label / control. The cockpit ratio (0.42) < comfortable (0.5088).
        const cockpitRel = base.cockpit.labelFontPx / base.cockpit.controlSizePx;
        const comfRel = base.comfortable.labelFontPx / base.comfortable.controlSizePx;
        results[`${mode}/relative`] = { cockpitRel, comfRel };
        expect(
            cockpitRel,
            `${mode}: the cockpit label must read TIGHTER relative to its control (${cockpitRel.toFixed(3)}) than the comfortable dock's label (${comfRel.toFixed(3)}) — the A-9 oversize-label close`,
        ).toBeLessThan(comfRel);
        // The cockpit label ≈ control × ratio (the proportion holds live).
        const expectedCockpitLabel = base.cockpit.controlSizePx * base.cockpit.labelRatio;
        expect(Math.abs(base.cockpit.labelFontPx - expectedCockpitLabel)).toBeLessThanOrEqual(1.5);

        // C3 — the bare comfortable dock label is byte-near-identical to the HEAD
        // subheading rung (20.35px within a tight band).
        expect(
            Math.abs(base.comfortable.labelFontPx - SUBHEADING_PX),
            `${mode}: the bare comfortable label must reproduce the HEAD subheading ${SUBHEADING_PX}px (got ${base.comfortable.labelFontPx}px)`,
        ).toBeLessThanOrEqual(0.6);

        // C4 — a :root --dock-label-ratio override retunes EVERY dock label.
        const overridden = await mountAndRead(page, 0.7);
        results[`${mode}/override-0.7`] = overridden;
        expect(
            overridden.comfortable.labelFontPx,
            `${mode}: a :root --dock-label-ratio override must retune the comfortable label (base ${base.comfortable.labelFontPx}px → override ${overridden.comfortable.labelFontPx}px)`,
        ).toBeGreaterThan(base.comfortable.labelFontPx);

        // Capture the comfortable-vs-cockpit frame for the DELTA (the gestalt input).
        await goto(page, "/dock/overview");
        await setDark(page, dark);
        await page.screenshot({ path: `${OUT}/dock-overview-${mode}.png` });
    });
}

test("cockpit control clears the 44px floor on coarse pointer", async ({ browser }) => {
    const ctx = await browser.newContext({ hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await goto(page, "/dock/overview");

    const coarse = await mountAndRead(page);
    results["coarse/base"] = coarse;
    // C5 — the cockpit control clears the WCAG-2.5.5 44px floor on coarse pointer
    // (the floor holds; the cockpit is tight but never sub-floor).
    expect(
        coarse.cockpit.controlSizePx,
        `coarse: the cockpit control must clear the 44px floor (got ${coarse.cockpit.controlSizePx}px)`,
    ).toBeGreaterThanOrEqual(FLOOR_PX);
    await ctx.close();
});

test.afterAll(() => {
    writeFileSync(`${OUT}/readback.json`, `${JSON.stringify(results, null, 2)}\n`);
});
