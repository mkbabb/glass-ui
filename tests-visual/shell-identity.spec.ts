// AZ.W-SHELL-IDENTITY — shell-identity.spec.ts, the π MEASURED-BAND readback of the
// demo-shell home region (the BINDING close criterion; S5).
//
// R3-15: "the ℱ is not centered in its hover/shadow area." The italic script-ℱ ink-mass
// sat off the home-control's geometric center; an optical-center transform nudge re-seats
// it. THE DEVICE-FREE SOURCE GATE (proof-shell-identity.mjs, S1–S4) proves the template +
// the transform are PRESENT; THIS SPEC PROVES THE RENDER — the painted ink-mass lands
// within the ±0.5px band (the bite S2 cannot give: a present-but-WRONG nudge, e.g.
// translate(-1px,-1px), passes S2 but REDs S5).
//
// It re-runs the C8 live ink-scan (docs/tranches/AZ/audit/ground/C8-fourier-f-livescan.mjs)
// over the LIVE :5199 home-control rect at dpr=4, scans the red ℱ ink pixels for the
// bounding-box center, and asserts:
//   S5a — |dx| ≤ 0.5px AND |dy| ≤ 0.5px of the rect's geometric center (the OPTICAL
//         centering — the load-bearing band).
//   S5b — the home region renders ONE Foundations affordance (the ℱ present, ZERO
//         Foundations category DockIconButton), a <DockSeparator> in the #persistent
//         region, and the home control's hover bg is NON-transparent (the glass register).
//
// THE BINDING ASSERTION IS THE PAINTED-INK READBACK (axe-independent). It loads :5199 →
// auto-detected LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips, backstopped
// by proof:live-verified-ledger over the W-SHELL-IDENTITY DELTA.

import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/AZ/audit/visual", import.meta.url),
);

// The ±0.5px optical-centering band (the spec's HG2/S5 acceptance).
const CENTER_TOL = 0.5;
const DPR = 4;

/**
 * Scan a PNG for the red ℱ ink (red glyph on a pale pill / cream substrate): ink =
 * pixels where R dominates G and B. Returns the ink bounding-box center in CSS px
 * relative to the rect, plus the rect's geometric center — mirroring the C8 probe.
 */
function inkOffset(
    pngBuf: Buffer,
    dpr: number,
): { dx: number; dy: number; inkPixels: number } {
    const png = PNG.sync.read(pngBuf);
    const { width: W, height: H, data } = png;
    let minX = 1e9,
        maxX = -1,
        minY = 1e9,
        maxY = -1,
        n = 0;
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const i = (y * W + x) * 4;
            const r = data[i]!,
                gg = data[i + 1]!,
                b = data[i + 2]!;
            // warm-red ink: red channel dominant + reasonably saturated (the C8 threshold).
            if (r > 120 && r - gg > 50 && r - b > 50) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
                n++;
            }
        }
    }
    if (maxX < 0) return { dx: NaN, dy: NaN, inkPixels: 0 };
    const rectCx = W / dpr / 2,
        rectCy = H / dpr / 2;
    const inkCx = minX / dpr + (maxX - minX) / dpr / 2;
    const inkCy = minY / dpr + (maxY - minY) / dpr / 2;
    return {
        dx: +(inkCx - rectCx).toFixed(2),
        dy: +(inkCy - rectCy).toFixed(2),
        inkPixels: n,
    };
}

test.describe("shell-identity (π lane — the home-region MEASURED-BAND readback, fail-CLOSED)", () => {
    // S5a is measured at dpr=4 (the C8 ground-probe scale) — at dpr=1 a ~40px glyph's
    // ink bounding box is integer-quantized and the center metric is coarse (±a few px);
    // dpr=4 gives the sub-pixel resolution the ±0.5px band demands. A fresh high-dpr
    // browser context is the only way to set deviceScaleFactor in-spec.
    test("S5a — the ℱ ink-mass is optically centered within ±0.5px", async ({
        browser,
        baseURL,
    }) => {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            deviceScaleFactor: DPR,
            reducedMotion: "reduce",
        });
        const page = await ctx.newPage();
        try {
            await page.goto(`${baseURL}/foundations/intro`, {
                waitUntil: "domcontentloaded",
            });
            await page.waitForTimeout(1200);
            // Park any WebGL background so the readback is deterministic.
            await page.evaluate(() => {
                try {
                    Object.defineProperty(document, "hidden", {
                        value: true,
                        configurable: true,
                    });
                    document.dispatchEvent(new Event("visibilitychange"));
                } catch {
                    /* noop */
                }
            });
            await page.waitForTimeout(250);

            const link = page.locator('a[aria-label="glass-ui home"]');
            await expect(link, "the ℱ home control must be present").toHaveCount(1);
            const box = (await link.boundingBox())!;
            expect(box, "the home-control rect must be measurable").not.toBeNull();
            // Measure the REST state (NO hover): the optical centering is a static-geometry
            // property of the resting box. The hover register scales the control 1.1×
            // (--scale-hover-dock) from its center, which perturbs the painted ink within a
            // pre-hover clip rect — so the centering band is read at rest (the hover GLASS
            // register is asserted separately in S5b).
            const buf = await page.screenshot({ clip: box });
            const probe = PNG.sync.read(buf);
            // The clip is at device pixels: derive the EFFECTIVE dpr from the buffer vs
            // the CSS rect so the offset math is correct even if the context dpr is not
            // honoured for the clip (a Playwright clip-screenshot quirk).
            const effDpr = Math.max(1, Math.round(probe.width / box.width));
            const { dx, dy, inkPixels } = inkOffset(buf, effDpr);

            expect(
                inkPixels,
                `no red ℱ ink found in the home-control rect (png ${probe.width}x${probe.height}, box ${box.width}x${box.height}, effDpr ${effDpr})`,
            ).toBeGreaterThan(500);
            expect(
                Math.abs(dx),
                `the ℱ ink-mass dx=${dx}px exceeds the ±${CENTER_TOL}px optical-centering band — the transform nudge is present-but-WRONG (the S2 structural check passes; only this S5 band catches it)`,
            ).toBeLessThanOrEqual(CENTER_TOL);
            expect(
                Math.abs(dy),
                `the ℱ ink-mass dy=${dy}px exceeds the ±${CENTER_TOL}px optical-centering band — the transform nudge is present-but-WRONG`,
            ).toBeLessThanOrEqual(CENTER_TOL);
        } finally {
            await ctx.close();
        }
    });

    test("S5b — the home region is ONE Foundations entry, demarcated, glass-hovered", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1000);

        const dom = await page.evaluate(() => {
            const home = document.querySelector('a[aria-label="glass-ui home"]');
            const foundationsBtns = document.querySelectorAll(
                '.demo-sidebar-dock [aria-label="Foundations"]',
            );
            const persistent = document.querySelector(
                ".demo-sidebar-dock .dock-persistent",
            );
            const sep = persistent
                ? persistent.querySelector(".dock-separator")
                : null;
            // The home control should carry the dock-control class (the glass register).
            const homeHasDockClass =
                home?.classList.contains("dock-icon-button") ?? false;
            return {
                hasHomeF: !!home,
                foundationsCategoryButtonCount: foundationsBtns.length,
                persistentHasSeparator: !!sep,
                homeHasDockClass,
            };
        });

        expect(dom.hasHomeF, "the ℱ home control must render").toBe(true);
        expect(
            dom.foundationsCategoryButtonCount,
            "a redundant Foundations category DockIconButton survives (the Compass home dup — R3-12)",
        ).toBe(0);
        expect(
            dom.persistentHasSeparator,
            "the #persistent region must carry a <DockSeparator> demarcating the home control (R3-12 / D1)",
        ).toBe(true);
        expect(
            dom.homeHasDockClass,
            "the home control must render AS a .dock-icon-button (the dock-control glass register)",
        ).toBe(true);

        // The hover bg must be NON-transparent (the glass register, R3-15 / D3). The
        // C8 hover-pill probe measured the BEFORE bg as rgba(0,0,0,0); AFTER it lifts.
        const link = page.locator('a[aria-label="glass-ui home"]');
        const box = (await link.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(400);
        const hoverBg = await page.evaluate(() => {
            const el = document.querySelector('a[aria-label="glass-ui home"]')!;
            return getComputedStyle(el).backgroundColor;
        });
        // Parse the alpha; transparent === rgba(0,0,0,0) or color(... / 0).
        const alphaMatch =
            hoverBg.match(/\/\s*([\d.]+)\s*\)/) ??
            hoverBg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
        const isTransparent =
            hoverBg === "rgba(0, 0, 0, 0)" ||
            hoverBg === "transparent" ||
            (alphaMatch ? Number(alphaMatch[1]) === 0 : false);
        expect(
            isTransparent,
            `the home control hover bg "${hoverBg}" is transparent — the glass hover register did NOT lift (R3-15 / D3); a bare transparent circle survives`,
        ).toBe(false);
    });

    // ── G-CLOSE — capture the home-region + hover DELTA PNGs (the cardinal-lesson
    // artefact; filename ^W-SHELL-IDENTITY-* per the ledger own-surface clause). ──────
    test("G-CLOSE — capture the home-region + hover DELTA", async ({ page }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1200);
        await page.evaluate(() => {
            try {
                Object.defineProperty(document, "hidden", {
                    value: true,
                    configurable: true,
                });
                document.dispatchEvent(new Event("visibilitychange"));
            } catch {
                /* noop */
            }
        });
        await page.waitForTimeout(250);

        const dock = page.locator(".demo-sidebar-dock").first();
        const dbox = (await dock.boundingBox())!;
        const clip = {
            x: Math.max(0, dbox.x - 6),
            y: Math.max(0, dbox.y - 6),
            width: dbox.width + 12,
            height: 220,
        };
        await page.screenshot({
            path: `${VISUAL_DIR}W-SHELL-IDENTITY-home-rest.png`,
            clip,
        });
        const link = page.locator('a[aria-label="glass-ui home"]');
        const lb = (await link.boundingBox())!;
        await page.mouse.move(lb.x + lb.width / 2, lb.y + lb.height / 2);
        await page.waitForTimeout(450);
        await page.screenshot({
            path: `${VISUAL_DIR}W-SHELL-IDENTITY-home-hover.png`,
            clip,
        });
    });
});
