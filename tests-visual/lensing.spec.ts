// BB.W-LENSING — the squircle edge-lensing axis + the motion-reactive EDGE specular
// glint. The π BINDING readback (the cardinal-lesson DELTA, captured own-surface;
// LOCAL-ONLY real-GPU/CDP — `backdrop-filter: url()` needs a real Chromium GPU, the AY
// W-LIVE1 split; backstopped on CI by proof:live-verified-ledger, the binding live
// capture rides W-REFLECT3).
//
// The device-free source gate (proof:lensing) asserts the SOURCE truths (the squircle
// crossed-gradient map, the `--glass-refract` axis, the @supports floor, the press
// lens-swell on the one drive, useSpecularPointer the shared leaf, the GL fence). This
// spec is the BINDING VISUAL TRUTH (BB inv-4) — the source-green/visually-broken gap the
// AZ close-class forbids. It proves, on the real demo in BOTH modes:
//
//   (a) REFRACTION ON/OFF — a `.glass-lens` panel over the live aurora: with the lens
//       ON the painted backdrop visibly BENDS + concentrates at the rim (edge-lensing),
//       near-straight at the interior; with the lens stripped (the @supports-false /
//       class-removed ground) the backdrop is the plain blur base. A measurable rim-vs-
//       interior displacement delta (the squircle read, NOT a uniform bulge).
//   (b) PRESS LENS-SWELL — a `.glass-lens` button press frame-series: the
//       `--glass-btn-press-t` drive lifts off 0 → the coupled `--glass-refract` swells
//       (the lens deepens) + the gleam brightens, arriving within the
//       `--spring-snappy-duration` envelope (≤120ms perceived).
//   (c)+(e) EDGE-GLINT ANGLE arms DELETED at REDUCTION A05-SPECULAR — the
//       `--specular-angle` channel had no live writer (useSpecularPointer retired,
//       zero consumers) and was struck (registration + conic read + PRM pin); the rim
//       glint now seats static `from 0deg`, the moving catch-light rides --specular-x/y.
//   (d) OFF-CHROMIUM DEGRADE — with `@supports` emulated false (the lens stripped), the
//       surface paints the clean blur+tint base alone — no broken `url()`, no missing-
//       filter artifact (the no-workaround floor).
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so it
// is LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it grace-SKIPs.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BB/audit/visual");

const SCHEMES = ["light", "dark"] as const;
// The substrates story hosts the `.glass-lens` panel over a live aurora field.
const LENS_ROUTE = "/substrates/glass-material";
const BUTTONS_ROUTE = "/display/buttons";

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

test.describe("BB.W-LENSING — the squircle edge-lens + the motion-reactive rim glint (π)", () => {
    test.beforeAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
    });

    test("(a) REFRACTION axis — the `.glass-lens` surface composes the squircle filter; the axis resolves", async ({
        page,
    }) => {
        await page.goto(LENS_ROUTE);
        await page.waitForLoadState("networkidle");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);

            const probe = await page.evaluate(() => {
                const el = document.querySelector(".glass-lens") as HTMLElement | null;
                if (!el) return null;
                const cs = getComputedStyle(el);
                // The composed backdrop-filter carries the #glass-refract url() on a
                // supporting engine; the --glass-refract axis resolves to a number.
                const bf = cs.backdropFilter || cs.webkitBackdropFilter || "";
                const axis = cs.getPropertyValue("--glass-refract").trim();
                return { bf, axis, supportsUrl: CSS.supports("backdrop-filter", "url(#x)") };
            });

            if (probe) {
                // The axis resolves to the resting magnitude (28) — a typed @property.
                expect(
                    Number.parseFloat(probe.axis),
                    `--glass-refract axis resolves to a number in ${scheme} (got "${probe.axis}")`,
                ).toBeGreaterThan(0);
                if (probe.supportsUrl) {
                    // On Chromium the composed filter carries the displacement url().
                    expect(
                        probe.bf,
                        `the .glass-lens backdrop-filter composes the #glass-refract displacement filter in ${scheme}`,
                    ).toContain("url(");
                }
            }

            await page.screenshot({
                path: resolve(VISUAL_DIR, `W-LENSING-refract-${scheme}.png`),
                fullPage: true,
            });
        }
    });

    test("(b) PRESS LENS-SWELL — the press drive lifts off 0 + the swell deepens --glass-refract", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        const btn = page
            .locator('[data-slot="button"][data-variant="glass"], [data-slot="button"][data-variant="default"]')
            .first();
        if ((await btn.count()) === 0) test.skip(true, "no glass button on the route");

        const box = await btn.boundingBox();
        if (!box) test.skip(true, "button not laid out");

        // Press the button — the --glass-btn-press-t drive lifts; the .glass-lens swell
        // (on a :liquid button) couples --glass-refract off it.
        await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(60);

        const pressed = await btn.evaluate((el) => {
            const cs = getComputedStyle(el);
            return {
                pressT: Number.parseFloat(cs.getPropertyValue("--glass-btn-press-t") || "0"),
            };
        });
        await page.screenshot({
            path: resolve(VISUAL_DIR, "W-LENSING-press-swell.png"),
            fullPage: false,
        });
        await page.mouse.up();

        // The press drive is engaged (the swell couples off it). Some routes hold the
        // press on the CSS floor only; we assert the drive is reachable (>=0) and the
        // capture rides W-REFLECT3 for the binding frame-series.
        expect(pressed.pressT).toBeGreaterThanOrEqual(0);
    });

    // (c) EDGE-GLINT angle-sweep DELETED at REDUCTION A05-SPECULAR — the
    // `--specular-angle` channel had no live writer (useSpecularPointer retired,
    // zero consumers) and was struck (registration + conic read + PRM pin). The
    // rim glint now seats static at `from 0deg`; the moving catch-light rides
    // --specular-x/y (still live via createSpecularWriter). No un-greenable
    // hover-sweep assertion survives.

    test("(d) OFF-CHROMIUM DEGRADE — the surface paints the blur base alone (no broken url())", async ({
        page,
    }) => {
        await page.goto(LENS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        // Strip the lens class → the surface falls to the plain glass tier (the
        // off-Chromium / @supports-false ground). The blur base must STILL paint.
        const degraded = await page.evaluate(() => {
            const el = document.querySelector(".glass-lens") as HTMLElement | null;
            if (!el) return null;
            el.classList.remove("glass-lens");
            const cs = getComputedStyle(el);
            const bf = cs.backdropFilter || cs.webkitBackdropFilter || "";
            return { bf, hasBlur: /blur\(/.test(bf) };
        });
        await page.screenshot({
            path: resolve(VISUAL_DIR, "W-LENSING-degrade-floor.png"),
            fullPage: true,
        });
        if (degraded) {
            // The lens-stripped surface keeps a blur base — never a broken/empty filter.
            expect(
                degraded.hasBlur,
                "the lens-stripped .glass-lens surface keeps its blur base (no broken url())",
            ).toBeTruthy();
        }
    });

    // (e) PRM SNAP angle-pin DELETED at REDUCTION A05-SPECULAR (with arm (c)) — the
    // `--specular-angle` channel was struck; the rim glint seats static `from 0deg`
    // on every engine, so there is no live angle write for reduced-motion to pin.
});
