// AX.W38 — binding-verification (JS-level, portal-independent): confirm the medium
// LabeledSelect option list is the library Select (the idiom swap), and that driving a
// preset that bakes medium:vangogh paints a different field than a smooth preset (the
// medium axis is live end-to-end). This is the MEMORY stale-binding antidote without a
// fragile portal click.

import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";

const URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5174";
test.setTimeout(90_000);
test.use({ viewport: { width: 1280, height: 800 } });

function meanDelta(a: PNG, b: PNG): number {
    const w = Math.min(a.width, b.width);
    const h = Math.min(a.height, b.height);
    let sum = 0;
    let n = 0;
    for (let y = Math.floor(h * 0.2); y < h * 0.8; y++) {
        for (let x = Math.floor(w * 0.2); x < w * 0.8; x++) {
            const ia = (y * a.width + x) * 4;
            const ib = (y * b.width + x) * 4;
            sum +=
                Math.abs(a.data[ia]! - b.data[ib]!) +
                Math.abs(a.data[ia + 1]! - b.data[ib + 1]!) +
                Math.abs(a.data[ia + 2]! - b.data[ib + 2]!);
            n++;
        }
    }
    return n === 0 ? 0 : sum / n;
}

test("W38/W47 binding — the medium LabeledSelect is the library Select + the medium axis is live", async ({
    page,
}) => {
    await page.goto(`${URL}/substrates/aurora`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // The atoms-panel medium picker IS a library Select (data-slot=select-trigger),
    // NOT a native <select> — confirm the idiom swap is structurally live.
    const triggers = await page
        .locator('[data-aurora-atoms-surface] [data-slot="select-trigger"]')
        .count();
    expect(triggers, "the atoms panel renders library Select triggers").toBeGreaterThanOrEqual(3);
    const nativeSelects = await page.locator("[data-aurora-atoms-surface] select").count();
    expect(nativeSelects, "no native <select> in the atoms panel").toBe(0);

    // The medium axis is live end-to-end: clicking the Van Gogh preset (medium:vangogh)
    // paints a materially different field than the smooth Sky preset.
    const stage = page.locator("canvas").first();
    await page.getByText("Sky", { exact: true }).first().click();
    await page.waitForTimeout(1500);
    const smooth = PNG.sync.read(await stage.screenshot());

    const vg = page.getByText("Van Gogh", { exact: true }).first();
    await vg.scrollIntoViewIfNeeded();
    await vg.click();
    await page.waitForTimeout(1800);
    const vangogh = PNG.sync.read(await stage.screenshot());

    const delta = meanDelta(smooth, vangogh);
    console.log("smooth→vangogh canvas delta:", delta);
    expect(delta, "the van-Gogh medium paints a materially different field (axis live)").toBeGreaterThan(8);
});
