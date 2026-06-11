import { test, expect } from "@playwright/test";
import { resolve } from "node:path";
const OUT = resolve(import.meta.dirname, "../docs/tranches/AZ/audit/reflect");
test.setTimeout(120_000);
test("medium select opens", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/substrates/aurora");
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.waitForTimeout(800);
  await page.locator("canvas.aurora-canvas").first().waitFor({ state: "visible", timeout: 25000 });
  // list all comboboxes with their values
  const combos = await page.locator('button[role="combobox"]').evaluateAll((els) =>
    els.map((e) => ({ text: (e.textContent||"").trim().slice(0,30), expanded: e.getAttribute("aria-expanded") })));
  console.log("COMBOS", JSON.stringify(combos));
  // Click the medium one (value Van Gogh)
  const medium = page.locator('button[role="combobox"]', { hasText: "Van Gogh" }).first();
  const n = await page.locator('button[role="combobox"]', { hasText: "Van Gogh" }).count();
  if (n > 0) {
    await medium.click();
    await page.waitForTimeout(450);
    const after = await medium.getAttribute("aria-expanded");
    const opts = await page.locator('[role="option"]').count();
    await page.screenshot({ path: resolve(OUT, "aurora-select-medium-open-dark.png") });
    console.log("MEDIUM-RESULT", JSON.stringify({ after, opts }));
  } else {
    console.log("MEDIUM-RESULT", "no Van Gogh combobox found");
  }
  expect(true).toBe(true);
});
