// zz-chip-band.spec.ts — a P4-F7 plant fixture (copied into a plant worktree's tests-visual/,
// never into the checkout). It reads the property the accent-tone rung swaps: every Chip wears
// `glass-chip … accent-tone` (chipVariants.ts), and at base `.glass-chip` follows `.accent-tone`
// in @layer components at (0,1,0), so the chip's --accent-band-strength is glass-chip's
// contrast-floored `max(18%, calc(var(--chip-tint-floor) + 10%))`, not the register's flat 18%.
import { expect, test } from "@playwright/test";

test("a Chip's --accent-band-strength is glass-chip's floored band, not the register's 18%", async ({ page }) => {
    await page.goto("/foundations/icons", { waitUntil: "domcontentloaded" });
    const chip = page.locator(".glass-chip.accent-tone").first();
    await chip.waitFor({ state: "attached", timeout: 30_000 });
    const band = await chip.evaluate((el) => getComputedStyle(el).getPropertyValue("--accent-band-strength").trim());
    console.log(`--accent-band-strength on .glass-chip.accent-tone: ${band}`);
    expect(band).toMatch(/^max\(/);
});
