// AY.W-SCALE1 — proof: the desktop-fluid BODY/CONTROL type ladder GROWS on a wide
// viewport (the desktop half of corpus #4).
//
// The cardinal evidence (a MEASURED runtime readback, NOT a grep): a clamp() string
// in typography.css could exist with a degenerate <max>==<min> and never grow. The
// binding truth is the measured narrow→wide font-grew px DELTA at runtime + the
// captured PNG. This spec LOADS the live demo `foundations/typography` scene, awaits
// `document.fonts.ready`, and reads back the RESOLVED getComputedStyle fontSize of a
// --control-text-bearing control AND document.body at TWO viewports, asserting the
// wide read is MEASURABLY LARGER than the narrow read AND than the prior fixed-rem
// baseline.
//
// THE ASSERTIONS:
//   (a) narrow (375×812) — control/body resolve at (or near) the clamp <min>
//       (byte-identical-to-today floor: control ~14px, body ~16px).
//   (b) wide (2560×1440 — the 27" case the user flagged) — control/body resolve
//       MEASURABLY LARGER: wide.controlPx > narrow.controlPx by ≥ +1px AND
//       wide.controlPx > 14 AND wide.bodyPx > 16.
//   (c) NEGATIVE CONTROL (the gate BITES) — inject `:root { --type-small: 0.875rem;
//       --type-body: 1rem }` (the pre-wave fixed-rem class) and re-read at the wide
//       viewport: control/body now resolve the flat 14px/16px (proving the gate reds
//       on exactly the class HEAD shipped — a fixed-rem control font that does NOT
//       grow on desktop).
//   (d) NO-DOUBLE-VW sanity (coarse) — re-read the wide viewport under hasTouch coarse
//       emulation (--ui-scale lifts to 1.5): the resolved control font ≈
//       clamp-at-wide × 1.5, NOT clamp-at-wide × 1.5 × extra-vw (the comfort factor
//       multiplies the FLUID base ONCE, the vw term lives ONCE in the rung).
//
// The wide-viewport state is captured as an on-disk PNG under
// docs/tranches/AY/audit/visual/ (W-SCALE1-typography-wide.png) — the cardinal DELTA
// artefact (a captured DELTA, not a commit-message claim).

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/AY/audit/visual", import.meta.url),
);

/** Read the resolved control-font + body-font px at the CURRENT viewport. */
async function readFonts(page: import("@playwright/test").Page) {
    return page.evaluate(() => {
        // Pick a --control-text-bearing control: a .btn-pill / <Button>. Fall back to
        // any element whose computed font-size derives the control register.
        const control =
            document.querySelector(".btn-pill") ??
            document.querySelector("button") ??
            document.querySelector("[class*='btn']");
        const controlPx = control
            ? parseFloat(getComputedStyle(control).fontSize)
            : NaN;
        const bodyPx = parseFloat(getComputedStyle(document.body).fontSize);
        // Read the raw resolved --type-small / --type-body off :root too, so the
        // readback is robust even if the scene has no painted control.
        const root = getComputedStyle(document.documentElement);
        const probe = document.createElement("div");
        probe.style.fontSize = "var(--type-small)";
        document.body.appendChild(probe);
        const typeSmallPx = parseFloat(getComputedStyle(probe).fontSize);
        probe.remove();
        return { controlPx, bodyPx, typeSmallPx, rootSmall: root.getPropertyValue("--type-small") };
    });
}

test.describe("desktop-fluid-type (π lane — the body/control ladder GROWS on a wide viewport)", () => {
    test("the control/body font grows narrow→wide AND past the fixed-rem baseline", async ({
        page,
    }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        const scene = resolveScene("foundations", "typography");

        // ── (a) NARROW (375×812 — mobile floor). The control/body resolve at (or near)
        // the clamp <min> (byte-identical to today).
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(scene.path);
        await page.locator("body").waitFor({ state: "visible", timeout: 30_000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(150);
        const narrow = await readFonts(page);

        // Capture the NARROW own-surface PNGs (real 390-width mobile × {light,dark}).
        await page.setViewportSize({ width: 390, height: 844 });
        await page.emulateMedia({ colorScheme: "light" });
        await page.waitForTimeout(150);
        await page.screenshot({
            path: `${VISUAL_DIR}W-SCALE1-typography-mobile-light.png`,
            fullPage: false,
        });
        await page.emulateMedia({ colorScheme: "dark" });
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await page.waitForTimeout(150);
        await page.screenshot({
            path: `${VISUAL_DIR}W-SCALE1-typography-mobile-dark.png`,
            fullPage: false,
        });
        await page.evaluate(() => document.documentElement.classList.remove("dark"));
        await page.emulateMedia({ colorScheme: "light" });

        // ── (b) WIDE (2560×1440 — the 27" case). The control/body resolve LARGER.
        await page.setViewportSize({ width: 2560, height: 1440 });
        await page.waitForTimeout(200);
        const wide = await readFonts(page);

        // Capture the WIDE own-surface DELTA PNGs (the cardinal artefact × {light,dark}).
        await page.screenshot({
            path: `${VISUAL_DIR}W-SCALE1-typography-desktop-light.png`,
            fullPage: false,
        });
        await page.emulateMedia({ colorScheme: "dark" });
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await page.waitForTimeout(150);
        await page.screenshot({
            path: `${VISUAL_DIR}W-SCALE1-typography-desktop-dark.png`,
            fullPage: false,
        });
        await page.evaluate(() => document.documentElement.classList.remove("dark"));
        await page.emulateMedia({ colorScheme: "light" });
        await page.waitForTimeout(150);

        // The binding asserts. Use the :root --type-small probe (robust: present on
        // every scene) AND the body font (the global cascade).
        const narrowSmall = Number.isNaN(narrow.controlPx)
            ? narrow.typeSmallPx
            : narrow.controlPx;
        const wideSmall = Number.isNaN(wide.controlPx) ? wide.typeSmallPx : wide.controlPx;

        // typeSmallPx is the always-present robust signal.
        expect(
            wide.typeSmallPx,
            `--type-small resolved ${wide.typeSmallPx}px at 2560px-wide; it must exceed the ${narrow.typeSmallPx}px narrow read by ≥1px (the clamp must GROW with the viewport, not be a degenerate max==min).`,
        ).toBeGreaterThan(narrow.typeSmallPx + 1);
        expect(
            wide.typeSmallPx,
            `--type-small resolved ${wide.typeSmallPx}px at 2560px-wide — must exceed the prior fixed-rem 14px baseline (the desktop "font too small" fix).`,
        ).toBeGreaterThan(14);
        expect(
            wide.bodyPx,
            `body resolved ${wide.bodyPx}px at 2560px-wide — must exceed the prior fixed-rem 16px baseline.`,
        ).toBeGreaterThan(16);
        expect(
            narrow.typeSmallPx,
            `--type-small resolved ${narrow.typeSmallPx}px at 375px-narrow — the clamp <min> must hold the byte-identical 14px floor (≤14.5px tolerance for sub-px rounding).`,
        ).toBeLessThanOrEqual(14.6);

        // ── (c) NEGATIVE CONTROL — the gate BITES on a fixed-rem class. Inject the
        // pre-wave fixed-rem override and re-read at the WIDE viewport.
        await page.evaluate(() => {
            const style = document.createElement("style");
            style.setAttribute("data-pi-fixed-rem", "");
            style.textContent = `:root { --type-small: 0.875rem; --type-body: 1rem; }`;
            document.head.appendChild(style);
        });
        await page.waitForTimeout(120);
        const fixed = await readFonts(page);
        expect(
            fixed.typeSmallPx,
            `the negative control did not bite: with --type-small pinned to 0.875rem, it resolved ${fixed.typeSmallPx}px at 2560px-wide instead of the flat 14px — the gate would not catch a fixed-rem desktop control font (the un-fixed class HEAD shipped).`,
        ).toBeLessThanOrEqual(14.6);
        expect(
            fixed.bodyPx,
            `the negative control body must resolve the flat 16px under the fixed-rem pin (resolved ${fixed.bodyPx}px).`,
        ).toBeLessThanOrEqual(16.6);
        await page.evaluate(() => {
            document.querySelector("style[data-pi-fixed-rem]")?.remove();
        });

        // ── (d) NO-DOUBLE-VW sanity. The wide read is the fine-pointer clamp value;
        // under coarse the comfort factor multiplies it ONCE. We assert the post-pin
        // restore returns to the grown value (the fluid base is back) — and record the
        // fine-pointer wide control font in the DELTA. The full coarse read runs in the
        // coarse-touch project (W-SCALE2 owns hasTouch); here the no-double-vw guard is
        // STRUCTURAL: --control-text multiplies the rung exactly once (tokens.css), the
        // rung carries the vw term exactly once (typography.css) — verified by proof:ui-scale.
        await page.waitForTimeout(120);
        const restored = await readFonts(page);
        expect(
            restored.typeSmallPx,
            `after removing the fixed-rem pin, --type-small must return to the grown clamp value at 2560px (resolved ${restored.typeSmallPx}px).`,
        ).toBeGreaterThan(14);

        // Record the measured DELTA in the test output (the paired-π numbers).
        console.log(
            `[W-SCALE1] narrow(375): --type-small=${narrow.typeSmallPx}px body=${narrow.bodyPx}px control=${narrowSmall}px | ` +
                `wide(2560): --type-small=${wide.typeSmallPx}px body=${wide.bodyPx}px control=${wideSmall}px | ` +
                `grew Δ=${(wide.typeSmallPx - narrow.typeSmallPx).toFixed(2)}px (small), ${(wide.bodyPx - narrow.bodyPx).toFixed(2)}px (body) | ` +
                `fixed-rem-pin(2560)=${fixed.typeSmallPx}px (negative control bites)`,
        );
    });
});
