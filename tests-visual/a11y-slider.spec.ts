// BI.W-SLIDER-THUMB-NAME — a11y-slider.spec.ts, the π accessible-name readback over
// the Slider family (the binding PAINT truth behind proof:a11y's device-free floor).
//
// THE DEFECT (born-RED at HEAD): every Slider thumb on /substrates/aurora was nameless
// (axe `aria-input-field-name` ×≥22). reka's SliderThumbImpl names the role="slider"
// element `$attrs['aria-label'] || getLabel(index, count)`, and getLabel returns
// UNDEFINED for a single-thumb slider — so a bare single-thumb <Slider> (or a
// LabeledSlider that forwarded `aria-labelledby`, which falls through to the roleless
// SliderRoot and never reaches the thumb) yields a spinbutton a screen reader announces
// with a generic name. The fix: LabeledSlider forwards its field <Label> to the thumb as
// `aria-label` (the library never-nameless floor), and every bare aurora LCH <Slider>
// (OklchStopRow's L/C/h) supplies an explicit `aria-label`.
//
// THE BINDING ASSERTION is the RENDERED accessibility tree — `getByRole('slider', {
// name })` uses the browser's OWN accessible-name computation (honoring aria-label /
// aria-labelledby, exactly as axe's aria-input-field-name does), NOT a source grep. On
// /substrates/aurora (+ the configurator route) EVERY rendered role="slider" resolves a
// non-empty accessible name (was ≥22 nameless). Color mode does not affect the name, so
// a default-mode + a `.dark`-toggled arm both hold (the mode-invariance guard). Runs on
// every Playwright project (Chromium + real WebKit).
//
// LOCAL-only — rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the
// close battery). Fail-CLOSED: a nameless thumb reds the readback, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { resolveScene, sourceScenes } from "./pi-manifest.ts";

// substrates/aurora is the permanent born-RED route (the ≥22-nameless surface).
const AURORA = resolveScene("substrates", "aurora");
// The configurator route's LCH/token sliders ride LabeledSlider, so the library forward
// names them. Resolved by STORY id against the manifest source-of-truth — its category
// may migrate (a later IA prune re-homes the compositions band), so this tracks the id
// wherever it lands and skips gracefully if it is ever removed, rather than throwing at
// import and taking the aurora arm down with it.
const CONFIGURATOR = sourceScenes().find((s) => s.story === "configurator");

// Every rendered role="slider" resolves a non-empty accessible name (the axe
// aria-input-field-name truth, via the browser's own name computation).
async function assertEveryThumbNamed(page: Page, label: string): Promise<void> {
    // Let the config layers + palette editor mount.
    await page.waitForLoadState("networkidle");
    const all = await page.locator('[role="slider"]').count();
    // The route must actually render slider thumbs (else the readback is vacuous).
    expect(all, `${label}: no role="slider" thumbs rendered`).toBeGreaterThan(0);
    const named = await page.getByRole("slider", { name: /\S/ }).count();
    expect(
        named,
        `${label}: ${all - named} of ${all} slider thumb(s) resolve NO accessible name (aria-input-field-name)`,
    ).toBe(all);
}

test.describe("a11y-slider (π lane — every Slider thumb resolves an accessible name)", () => {
    test("aurora — no nameless thumb (was ≥22), light + dark", async ({ page }) => {
        await page.goto(AURORA.path, { waitUntil: "networkidle" });
        await assertEveryThumbNamed(page, "aurora (light)");

        // Color mode does not change the accessible name — the mode-invariance guard.
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await assertEveryThumbNamed(page, "aurora (dark)");
    });

    test("configurator — LabeledSlider forwards the field label to the thumb", async ({
        page,
    }) => {
        test.skip(!CONFIGURATOR, "configurator story not present in the manifest");
        await page.goto(CONFIGURATOR!.path, { waitUntil: "networkidle" });
        await assertEveryThumbNamed(page, "configurator");
    });
});
