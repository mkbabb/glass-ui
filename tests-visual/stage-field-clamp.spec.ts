// BI.W-STAGE-FIELD-CLAMP — the BINDING backing-store π (LOCAL real-GPU).
//
// The device-free source gate (proof:stage-field-clamp) proves the sizing MECHANISM
// (100dvh + sticky + sub-2× DPR). THIS spec binds the painted truth: the live DockStage
// aurora backing store on /dock/overview clamps to the VIEWPORT (~2.5MP), not the full
// ~2365px scroll column (9.68MP), AND the viewport-sized field stays visible under
// scroll (the sticky pin). Born-RED at HEAD: the field was `position: absolute; inset: 0`
// on the full column, so the Aurora ResizeObserver sized the backing store to the whole
// column.
//
// THE DPR-INDEPENDENT CORE (the primary assertion): the field's CSS height tracks the
// VIEWPORT (≈100dvh), NOT the scroll column — a robust discriminator regardless of the
// runner's devicePixelRatio (headless DPR≈1 vs a real-DPR dev box). The absolute
// backing-store megapixel bound (≤~2.5MP, the PERF-3 number) is the secondary check,
// binding on the real-DPR run.

import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/dock/overview";

// The PERF-3 target: the field backing store ≤ ~2.5MP (the measured 2.46MP viewport
// clamp), down from 9.68MP. A small tolerance over the nominal 100dvh × width × 1.5×
// DPR for viewport/window variance.
const BACKING_MP_MAX = 2.6;

// The field CSS height must track the viewport (100dvh), not the tall column. Allow a
// small margin for dvh/window rounding.
const VIEWPORT_HEIGHT_TOLERANCE = 1.2;
// The stage column must be materially taller than the viewport — proving there IS an
// offscreen region the clamp is NOT rasterizing (else the test is vacuous).
const COLUMN_TALLER_THAN_VIEWPORT = 1.4;

async function setMode(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(120);
}

/** Read the DockStage aurora field geometry: backing store + CSS box + the stage column. */
async function readField(page: Page) {
    return page.evaluate(() => {
        const stage = document.querySelector<HTMLElement>(".dock-stage");
        const field = document.querySelector<HTMLElement>(
            ".dock-stage-field",
        );
        const canvas = field?.querySelector<HTMLCanvasElement>("canvas") ?? null;
        if (!stage || !field || !canvas) return null;
        const fieldRect = field.getBoundingClientRect();
        const stageRect = stage.getBoundingClientRect();
        const cs = getComputedStyle(field);
        // The aurora wash clamps its DPR to AV_AURORA_DPR_MAX (1.5×) — the backing
        // store the field WILL allocate is round(cssBox × washDpr) (the sizeBacking
        // formula). Measuring the IMPLIED backing off the (now viewport-clamped) CSS
        // box is DPR-correct AND always measurable — it does not depend on the deferred
        // WebGL arm having fired in the headless test window (the raw canvas stays at
        // its 300×150 default until arm). This is the honest "what GPU memory this
        // field allocates" number the PERF-3 bound binds on.
        const washDpr = Math.min(window.devicePixelRatio, 1.5);
        return {
            backingW: canvas.width,
            backingH: canvas.height,
            impliedBackingW: Math.round(fieldRect.width * washDpr),
            impliedBackingH: Math.round(fieldRect.height * washDpr),
            fieldCssH: fieldRect.height,
            fieldCssW: fieldRect.width,
            columnCssH: stageRect.height,
            position: cs.position,
            dpr: window.devicePixelRatio,
            washDpr,
            viewportH: window.innerHeight,
        };
    });
}

test.describe("stage-field-clamp (BI.W-STAGE-FIELD-CLAMP — the DockStage field clamps to the viewport)", () => {
    for (const dark of [false, true]) {
        const modeLabel = dark ? "dark" : "light";

        test(`the DockStage aurora field is viewport-clamped, not scroll-column-sized @ ${modeLabel}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, dark);

            // Let the aurora arm (deferred WebGL init) + the ResizeObserver settle.
            await page
                .waitForFunction(
                    () => {
                        const c = document
                            .querySelector(".dock-stage-field")
                            ?.querySelector("canvas");
                        return !!c && c.width > 1 && c.height > 1;
                    },
                    { timeout: 8000 },
                )
                .catch(() => {
                    /* css substrate (GPU-less) — the CSS-height core still binds below */
                });

            const f = await readField(page);
            expect(
                f,
                `${ROUTE}: the DockStage aurora field (.dock-stage-field > canvas) was not found — the stage did not mount`,
            ).not.toBeNull();

            // ── SF2 (position) — the field is sticky (pins under scroll). ───────
            expect(
                f!.position,
                `${ROUTE} @ ${modeLabel}: the field position is "${f!.position}", not sticky — a non-sticky viewport-clamped field scrolls off into a blank backdrop`,
            ).toBe("sticky");

            // ── SF1 core (DPR-independent) — the field CSS height tracks the VIEWPORT,
            // not the scroll column. This is the born-RED discriminator: at HEAD the
            // field CSS height == the full column height (>> viewport). ─────────────
            expect(
                f!.columnCssH,
                `${ROUTE} @ ${modeLabel}: the stage column is only ${f!.columnCssH.toFixed(0)}px (viewport ${f!.viewportH}px) — not materially taller than the viewport, so the clamp test is vacuous (the overview column should stack many demos)`,
            ).toBeGreaterThan(f!.viewportH * COLUMN_TALLER_THAN_VIEWPORT);

            expect(
                f!.fieldCssH,
                `${ROUTE} @ ${modeLabel}: the field CSS height is ${f!.fieldCssH.toFixed(0)}px — it tracks the ${f!.columnCssH.toFixed(0)}px scroll COLUMN, not the ${f!.viewportH}px viewport (the 9.68MP over-provisioning: the field is sized to the full column)`,
            ).toBeLessThanOrEqual(f!.viewportH * VIEWPORT_HEIGHT_TOLERANCE);

            // ── SF1 secondary — the backing store the field allocates ≤ ~2.5MP (PERF-3).
            // The IMPLIED backing (round(cssBox × washDpr)) is the honest allocation
            // number: it is DPR-correct (the 1.5× wash clamp) AND always measurable (it
            // does not depend on the deferred WebGL arm having sized the canvas within
            // the headless window). Born-RED at HEAD: the CSS box == the full column, so
            // the implied backing is the 9.68MP over-provisioning. ─────────────────────
            const impliedMP =
                (f!.impliedBackingW * f!.impliedBackingH) / 1_000_000;
            expect(
                impliedMP,
                `${ROUTE} @ ${modeLabel}: the field allocates ${f!.impliedBackingW}×${f!.impliedBackingH} = ${impliedMP.toFixed(2)}MP (cssBox ${f!.fieldCssW.toFixed(0)}×${f!.fieldCssH.toFixed(0)} × washDpr ${f!.washDpr}) — over the ${BACKING_MP_MAX}MP viewport-clamp ceiling (the PERF-3 9.68MP over-provisioning survives — the field is sized to the ${f!.columnCssH.toFixed(0)}px column)`,
            ).toBeLessThanOrEqual(BACKING_MP_MAX);

            // Corroboration: once the WebGL path arms (canvas sized off the same box),
            // the ACTUAL backing store must also be under the bound.
            const armed =
                f!.backingW > 1 &&
                f!.backingH > 1 &&
                !(f!.backingW === 300 && f!.backingH === 150);
            if (armed) {
                const mp = (f!.backingW * f!.backingH) / 1_000_000;
                expect(
                    mp,
                    `${ROUTE} @ ${modeLabel}: the ARMED aurora backing store is ${f!.backingW}×${f!.backingH} = ${mp.toFixed(2)}MP (dpr ${f!.dpr}) — over the ${BACKING_MP_MAX}MP ceiling`,
                ).toBeLessThanOrEqual(BACKING_MP_MAX);
            }
        });

        test(`the field stays visible under scroll (the sticky pin) @ ${modeLabel}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, dark);
            await page.waitForTimeout(300);

            // Scroll the <main> route-scroller deep into the column.
            await page.evaluate(() => {
                const main = document.querySelector<HTMLElement>(
                    ".demo-main-scroller",
                );
                if (main) main.scrollTop = Math.round(main.scrollHeight * 0.55);
            });
            await page.waitForTimeout(200);

            // The viewport-clamped, sticky field must STILL cover the viewport region
            // over the stage (top above the fold, bottom below it) — a clamped-but-not-
            // sticky field would have scrolled off, leaving a blank backdrop.
            const visible = await page.evaluate(() => {
                const field = document.querySelector<HTMLElement>(
                    ".dock-stage-field",
                );
                if (!field) return null;
                const r = field.getBoundingClientRect();
                return {
                    top: r.top,
                    bottom: r.bottom,
                    viewportH: window.innerHeight,
                };
            });
            expect(
                visible,
                `${ROUTE}: the DockStage field was not found after scroll`,
            ).not.toBeNull();
            // Intersects the viewport: top is at/above the fold and bottom is below 0 —
            // i.e. the field still overlaps the visible region.
            expect(
                visible!.top,
                `${ROUTE} @ ${modeLabel}: after scrolling deep into the column the field top is ${visible!.top.toFixed(0)}px — the sticky pin did not keep it at the fold (it scrolled off)`,
            ).toBeLessThanOrEqual(visible!.viewportH * 0.5);
            expect(
                visible!.bottom,
                `${ROUTE} @ ${modeLabel}: after scroll the field bottom is ${visible!.bottom.toFixed(0)}px — the field is entirely above the fold (scrolled off), a blank backdrop`,
            ).toBeGreaterThan(0);
        });
    }
});
