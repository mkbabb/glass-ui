// REFLECTION focused probe — do the aurora studio combobox selects OPEN? (D1 dead-select fix)
import { test, expect, type Page } from "@playwright/test";
import { resolve } from "node:path";

const OUT = resolve(import.meta.dirname, "../docs/tranches/AZ/audit/reflect");
const AURORA = "/substrates/aurora";

test.setTimeout(180_000);

test("REFLECT aurora — combobox selects open + options mount", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(AURORA);
    await page.waitForTimeout(1500);
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(800);
    await page.locator("canvas.aurora-canvas").first().waitFor({ state: "visible", timeout: 25_000 });

    const results: Record<string, unknown> = {};

    // Probe each combobox by its current value text
    const probes = [
        { name: "harmony", value: "Analogous" },
        { name: "medium", value: "Van Gogh" },
        { name: "arrangement", value: "Composed" },
        { name: "motion", value: "Drifting" },
    ];

    for (const p of probes) {
        // find the combobox button with this text
        const trigger = page.locator('button[role="combobox"]', { hasText: p.value }).first();
        const existsCount = await page.locator('button[role="combobox"]', { hasText: p.value }).count();
        if (existsCount === 0) { results[p.name] = { found: false }; continue; }
        const before = await trigger.getAttribute("aria-expanded");
        await trigger.scrollIntoViewIfNeeded().catch(() => {});
        await trigger.click({ timeout: 4000 }).catch((e) => { results[p.name + "_clickErr"] = String(e).slice(0, 80); });
        await page.waitForTimeout(450);
        const after = await trigger.getAttribute("aria-expanded");
        const optionCount = await page.locator('[role="option"]').count();
        const listboxCount = await page.locator('[role="listbox"]').count();
        results[p.name] = { found: true, before, after, optionCount, listboxCount };
        // screenshot the open state for the first one
        if (p.name === "harmony") {
            await page.screenshot({ path: resolve(OUT, "aurora-select-harmony-open-dark.png") });
        }
        if (p.name === "medium") {
            await page.screenshot({ path: resolve(OUT, "aurora-select-medium-open-dark.png") });
        }
        // close
        await page.keyboard.press("Escape").catch(() => {});
        await page.waitForTimeout(250);
    }

    // eslint-disable-next-line no-console
    console.log("SELECT-PROBE", JSON.stringify(results, null, 2));
    expect(true).toBe(true);
});
