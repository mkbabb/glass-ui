// R5-7 — the veil text-plate DELTA capture (own-surface, demo truth surface).
// Runs under tests-visual/playwright.config.ts (ANGLE backend, reuseExistingServer
// on :5199). Captures the veil section feather-off + feather-on, and reads back the
// LIVE computed border/box-shadow/backdrop-filter to ratify borderless+rimless+fill.
import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "docs/tranches/AZ/audit/visual";

test("veil text-plate — borderless/rimless render + feather DELTA", async ({ page }) => {
    mkdirSync(OUT, { recursive: true });
    await page.goto("/display/card", { waitUntil: "domcontentloaded" });
    await page.waitForSelector('[data-surface="veil"]', { timeout: 25_000 });
    await page.waitForTimeout(1500);

    const veil = page.locator('[data-surface="veil"]');
    await expect(veil).toHaveCount(2);

    const hero = veil.first();
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const heroBox = await hero.boundingBox();

    const readback = await hero.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
            borderTopWidth: cs.borderTopWidth,
            borderStyle: cs.borderTopStyle,
            boxShadow: cs.boxShadow,
            backdropFilter: (cs as any).backdropFilter || (cs as any).webkitBackdropFilter,
            background: cs.backgroundColor,
            maskImage: ((cs as any).maskImage || (cs as any).webkitMaskImage || "none").slice(0, 60),
        };
    });

    // BORDERLESS + RIMLESS on the live render.
    expect(readback.borderTopWidth).toBe("0px");
    expect(readback.boxShadow).toBe("none");
    // FILL present (a translucent rgba, not transparent) + a real blur.
    expect(readback.background).not.toBe("rgba(0, 0, 0, 0)");
    expect(readback.backdropFilter).toContain("blur");
    // Feather OFF default → no mask.
    expect(readback.maskImage).toBe("none");

    const sec = await hero.evaluate((el) => {
        const s = el.closest("section")!.getBoundingClientRect();
        return { x: Math.max(0, s.x), y: Math.max(0, s.y), width: s.width, height: Math.min(s.height, 1000) };
    });
    await page.screenshot({
        path: `${OUT}/R5-7-veil-feather-off-${Math.round(sec.width)}x${Math.round(sec.height)}.png`,
        clip: sec,
    });

    // Toggle the feather ON.
    const toggled = await page.evaluate(() => {
        const ls = [...document.querySelectorAll("label")];
        const fl = ls.find((l) => l.textContent!.includes("--veil-feather"));
        const sw = fl?.querySelector('button, [role="switch"], input') as HTMLElement | null;
        if (!sw) return false;
        sw.click();
        return true;
    });
    expect(toggled).toBe(true);
    await page.waitForTimeout(700);

    const maskOn = await hero.evaluate((el) => {
        const cs = getComputedStyle(el);
        return ((cs as any).maskImage || (cs as any).webkitMaskImage || "none").slice(0, 40);
    });
    // Feather ON → a radial-gradient mask paints.
    expect(maskOn).toContain("radial-gradient");

    const sec2 = await hero.evaluate((el) => {
        const s = el.closest("section")!.getBoundingClientRect();
        return { x: Math.max(0, s.x), y: Math.max(0, s.y), width: s.width, height: Math.min(s.height, 1000) };
    });
    await page.screenshot({
        path: `${OUT}/R5-7-veil-feather-on-${Math.round(sec2.width)}x${Math.round(sec2.height)}.png`,
        clip: sec2,
    });

    console.log(JSON.stringify({ heroDims: heroBox && { w: Math.round(heroBox.width), h: Math.round(heroBox.height) }, readback, maskOn }, null, 2));
});
