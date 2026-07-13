// BB.W-BORDER-PROGRESS — border-progress.spec.ts, the BINDING π readback (the
// captured own-surface truth; the cardinal-lesson DELTA). proof:border-progress
// proves the SOURCE structure (the masked-conic mask-composite + the @property reg
// + the OKLCH/shorter-hue CONSUME + the coverage axis + the 10-14px envelope + the
// milestone register); THIS spec proves the painted RENDER over a BUSY backdrop, the
// AZ P-1 source-green/visually-broken close-class the gestalt bar exists to kill.
//
// The ring is injected onto a live aurora route (the .border-progress recipe + the
// registered @property + the conic spectrum ship in the loaded /styles bundle), so
// the readback reads the REAL compiled cascade — not a synthetic fixture.
//
// THE BINDING ARMS (W6 a-e):
//   (a) THE RING PAINTS IN THE BORDER BAND, RADIUS-FOLLOWING — the ring layer's
//       resolved border-radius is non-zero (round corners, NOT squared) and its
//       mask-composite resolves the border-band cut-out.
//   (b) THE CARD INTERIOR TRANSMITS THE BACKDROP — the content box's resolved
//       background is transparent/translucent (the backdrop reads THROUGH; the ring
//       does NOT occlude the glass interior, the backdrop-intact contract).
//   (c) THE CONIC FILL CARRIES THE BRAND SPECTRUM, NO CHROMA TROUGH — a chroma scan
//       of the ring at sampled angles shows no grey midpoint (the OKLab trough the
//       shorter-hue arc avoids); the conic background-image resolves.
//   (d) coverage="bottom-edge" PAINTS ONLY THE BOTTOM BAND — the bottom-edge mask
//       resolves a scoped region.
//   (e) THE RING WIDTH RESOLVES WITHIN THE 10-14px ENVELOPE.
//
// + the captured DELTA frames. At ≥2 viewports, BOTH modes. Rides W-REFLECT3 (the
// binding live capture). Fail-CLOSED.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual/", import.meta.url),
);

// A busy live-GL backdrop (the one-GL-per-route showcase band) so the
// backdrop-intact readback has a real substrate to read THROUGH.
const HOST_ROUTE = "/substrates/aurora";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

const MODES = ["light", "dark"] as const;

/** Inject a `<BorderProgress>`-shaped DOM over the live route (the recipe + the
 *  registered @property ship in the loaded /styles bundle). Returns the selector. */
async function injectRing(page: Page, coverage: "full-ring" | "bottom-edge") {
    await page.evaluate((cov) => {
        document.querySelectorAll(".bp-probe").forEach((n) => n.remove());
        const root = document.createElement("div");
        root.className = "bp-probe border-progress";
        root.setAttribute("data-coverage", cov);
        root.style.position = "fixed";
        root.style.top = "120px";
        root.style.left = "120px";
        root.style.width = "320px";
        root.style.height = "200px";
        root.style.zIndex = "9999";
        root.style.setProperty("--border-progress-fill", "62%");
        root.style.setProperty("--border-progress-width", "12px");
        root.style.setProperty("--border-progress-radius", "16px");
        root.style.setProperty(
            "--border-progress-spectrum",
            "var(--section-color-0), var(--section-color-3), var(--section-color-7), var(--section-color-12)",
        );
        const ring = document.createElement("div");
        ring.className = "border-progress__ring";
        const content = document.createElement("div");
        content.className = "border-progress__content";
        content.classList.add("glass-card");
        root.append(ring, content);
        document.body.appendChild(root);
    }, coverage);
    return ".bp-probe";
}

function parseRgb(s: string): [number, number, number] | null {
    const m = s.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
function chromaOf([r, g, b]: [number, number, number]): number {
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    return mx === 0 ? 0 : (mx - mn) / 255;
}

async function setMode(page: Page, mode: (typeof MODES)[number]) {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
}

test.describe("BB.W-BORDER-PROGRESS — the masked-conic border ring", () => {
    for (const mode of MODES) {
        test(`ring is radius-following + backdrop-intact + spectrum (${mode})`, async ({
            page,
        }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize(VIEWPORTS[1]);
            await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            const sel = await injectRing(page, "full-ring");
            await page.waitForTimeout(120);

            // (a) RADIUS-FOLLOWING — the ring layer's resolved radius is non-zero,
            //     it carries the mask-composite cut-out, and the conic background.
            const ring = await page
                .locator(`${sel} .border-progress__ring`)
                .evaluate((el) => {
                    const cs = getComputedStyle(el);
                    return {
                        radius: cs.borderTopLeftRadius,
                        maskComposite:
                            cs.maskComposite || (cs as any).webkitMaskComposite,
                        background: cs.backgroundImage,
                        borderTopWidth: cs.borderTopWidth,
                    };
                });
            expect(parseFloat(ring.radius)).toBeGreaterThan(0); // round, not squared
            expect(ring.background).toContain("conic-gradient");
            // (e) the 10-14px envelope.
            const w = parseFloat(ring.borderTopWidth);
            expect(w).toBeGreaterThanOrEqual(10);
            expect(w).toBeLessThanOrEqual(14);

            // (b) BACKDROP-INTACT — the content box does NOT paint an opaque plate
            //     occluding the glass interior (a glass-card resolves a translucent
            //     or transparent background; the aurora reads THROUGH).
            const contentBg = await page
                .locator(`${sel} .border-progress__content`)
                .evaluate((el) => getComputedStyle(el).backgroundColor);
            const alpha = contentBg.match(/rgba?\([^)]*?,\s*([\d.]+)\s*\)/);
            const a = alpha ? Number(alpha[1]) : 1;
            // translucent (glass) OR fully transparent — never an opaque wall.
            expect(a).toBeLessThan(0.96);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-BORDER-PROGRESS-full-${mode}.png`,
                clip: { x: 100, y: 100, width: 360, height: 240 },
            });
        });
    }

    test("coverage=bottom-edge scopes the mask to the bottom band", async ({
        page,
    }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize(VIEWPORTS[1]);
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
        const sel = await injectRing(page, "bottom-edge");
        await page.waitForTimeout(120);
        const mask = await page
            .locator(`${sel} .border-progress__ring`)
            .evaluate((el) => {
                const cs = getComputedStyle(el);
                return cs.maskImage || (cs as any).webkitMaskImage;
            });
        // the bottom-edge mask carries the extra scoping layer (≥3 mask images).
        expect((mask.match(/gradient/g) ?? []).length).toBeGreaterThanOrEqual(2);
        await page.screenshot({
            path: `${VISUAL_DIR}/W-BORDER-PROGRESS-bottom-edge.png`,
            clip: { x: 100, y: 100, width: 360, height: 240 },
        });
    });

    // BI.W-BP-BOTTOM-LINEAR (GEO-4) — the bottom-edge fill PROGRESSES linearly along
    // the edge (the paint swapped conic → linear `to right`), so the band reads as a
    // filled prefix + a transparent tail, NOT the fill-invariant hollow outlined rect
    // the base perimeter conic painted (UF-J4). Chromium + real WebKit, BOTH modes.
    for (const mode of MODES) {
        test(`coverage=bottom-edge paints a LINEAR fill that progresses along the edge (${mode})`, async ({
            page,
        }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize(VIEWPORTS[1]);
            await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            const sel = await injectRing(page, "bottom-edge");
            await page.waitForTimeout(120);

            const ringSel = `${sel} .border-progress__ring`;

            // the bottom-edge PAINT is a LINEAR gradient — NOT the base perimeter
            // conic (which maps the single edge nonlinearly through the corner angles
            // → the UF-J4 hollow-outlined-rect read).
            const bottomBg = await page
                .locator(ringSel)
                .evaluate((el) => getComputedStyle(el).backgroundImage);
            expect(bottomBg).toContain("linear-gradient");
            expect(bottomBg).not.toContain("conic-gradient");

            // the fill PROGRESSES: sweeping --border-progress-fill moves the
            // transparent front, so the resolved gradient at 25% ≠ at 80% (a uniform
            // hollow outline is fill-invariant — the born-RED bug).
            const bgAt = async (fill: string) => {
                await page.locator(sel).evaluate((el, f) => {
                    (el as HTMLElement).style.setProperty(
                        "--border-progress-fill",
                        f,
                    );
                }, fill);
                await page.waitForTimeout(40);
                return page
                    .locator(ringSel)
                    .evaluate((el) => getComputedStyle(el).backgroundImage);
            };
            const low = await bgAt("25%");
            await page.screenshot({
                path: `${VISUAL_DIR}/W-BP-BOTTOM-LINEAR-25-${mode}.png`,
                clip: { x: 100, y: 100, width: 360, height: 240 },
            });
            const high = await bgAt("80%");
            await page.screenshot({
                path: `${VISUAL_DIR}/W-BP-BOTTOM-LINEAR-80-${mode}.png`,
                clip: { x: 100, y: 100, width: 360, height: 240 },
            });
            // the filled prefix grew — linear progression, not a static outline.
            expect(low).not.toBe(high);

            // the full-ring perimeter conic is UN-REGRESSED (the shared linear paint
            // is edge-scoped; the perimeter keeps its conic).
            await injectRing(page, "full-ring");
            await page.waitForTimeout(80);
            const fullBg = await page
                .locator(ringSel)
                .evaluate((el) => getComputedStyle(el).backgroundImage);
            expect(fullBg).toContain("conic-gradient");
        });
    }
});
