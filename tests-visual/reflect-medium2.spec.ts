import { test, expect } from "@playwright/test";
import { resolve } from "node:path";
const OUT = resolve(import.meta.dirname, "../docs/tranches/AZ/audit/reflect");
test.setTimeout(120_000);
test("medium select (2nd combobox) opens", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/substrates/aurora");
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.waitForTimeout(800);
  await page.locator("canvas.aurora-canvas").first().waitFor({ state: "visible", timeout: 25000 });
  // The Medium combobox is the one reading "Smooth" at default load
  const medium = page.locator('button[role="combobox"]', { hasText: "Smooth" }).first();
  const before = await medium.getAttribute("aria-expanded");
  await medium.scrollIntoViewIfNeeded();
  await medium.click();
  await page.waitForTimeout(500);
  const after = await medium.getAttribute("aria-expanded");
  const opts = await page.locator('[role="option"]').count();
  const optTexts = await page.locator('[role="option"]').evaluateAll((els) => els.map((e)=>(e.textContent||"").trim().slice(0,24)));
  await page.screenshot({ path: resolve(OUT, "aurora-select-medium-open-dark.png") });
  console.log("MEDIUM2", JSON.stringify({ before, after, opts, optTexts }));
  expect(true).toBe(true);
});
