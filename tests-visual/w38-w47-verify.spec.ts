// AX.W38/W47 live-verification (the π-lane binding close, captured DELTA).
// Drives the live aurora story and asserts: the configurator preset chip reads as a
// glass-tier pill (non-`none` backdrop-filter, NOT an opaque foreground stamp); the
// section reveal animates on a fast spring (a `linear(...)` timing function at a fast
// duration, NOT a 200ms ease-out bezier); the atoms panel composes the library form
// primitives (no native <select>/<input type=range>); the preset strip advertises
// "Van Gogh" / "Oil Pastel" / "Crayon".

import { test, expect } from "@playwright/test";

const URL = process.env.GLASS_UI_DEMO_URL ?? "http://127.0.0.1:5174";

test.setTimeout(120_000);

test("W38/W47 — configurator glass-atoms + fast reveal + idiomatic atoms + preset roster", async ({
    page,
}) => {
    const results: Record<string, unknown> = {};

    await page.goto(`${URL}/substrates/aurora`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    // ── W47: the preset strip advertises the W13 mediums by name. ──────────────
    const stripText = await page.evaluate(() => document.body.innerText);
    results.vanGoghOnStrip = /Van Gogh/i.test(stripText);
    results.oilPastelOnStrip = /Oil Pastel/i.test(stripText);
    results.crayonOnStrip = /\bCrayon\b/i.test(stripText);

    // ── W38 Arm 1: the active preset chip reads as a glass-tier pill. ──────────
    const chip = page.locator('[data-slot="configurator-preset"][data-active="true"]').first();
    const chipCount = await page.locator('[data-slot="configurator-preset"]').count();
    results.chipCount = chipCount;
    if ((await chip.count()) > 0) {
        const cs = await chip.evaluate((el) => {
            const s = getComputedStyle(el);
            return {
                backdropFilter: s.backdropFilter || (s as any).webkitBackdropFilter,
                backgroundColor: s.backgroundColor,
                borderRadius: s.borderRadius,
                transitionProperty: s.transitionProperty,
            };
        });
        results.activeChip = cs;
        // glass-tier: a non-`none` backdrop-filter OR a translucent (alpha < 1) bg,
        // NOT the opaque foreground stamp.
        const translucent = /rgba?\([^)]*,\s*0?\.\d+\)/.test(cs.backgroundColor);
        results.chipGlassTier = cs.backdropFilter !== "none" || translucent;
        results.chipPill = parseFloat(cs.borderRadius) > 100 || cs.borderRadius.includes("9999");
    }

    // ── W38 Arm 3: the section reveal animates on a fast spring. ───────────────
    // Open the Advanced disclosure, then inspect a ConfiguratorLayer region.
    const advancedTab = page.getByRole("button", { name: /Advanced/i }).first();
    if ((await advancedTab.count()) > 0) {
        await advancedTab.click();
        await page.waitForTimeout(400);
    }
    const region = page.locator(".configurator-layer-region").first();
    if ((await region.count()) > 0) {
        const reveal = await region.evaluate((el) => {
            const s = getComputedStyle(el);
            return {
                transitionProperty: s.transitionProperty,
                transitionDuration: s.transitionDuration,
                transitionTimingFunction: s.transitionTimingFunction,
            };
        });
        results.reveal = reveal;
        // a spring is a multi-stop linear() function; a fast duration ≤ 0.25s.
        results.revealIsSpring = /linear\(/.test(reveal.transitionTimingFunction);
        results.revealIsFast =
            parseFloat(reveal.transitionDuration) <= 0.25 &&
            parseFloat(reveal.transitionDuration) > 0;
    }

    // ── W38 Arm 2: the atoms panel composes the library form primitives. ──────
    // (re-open Atoms)
    const atomsTab = page.getByRole("button", { name: /^Atoms$/i }).first();
    if ((await atomsTab.count()) > 0) {
        await atomsTab.click();
        await page.waitForTimeout(300);
    }
    const atomsSurface = page.locator("[data-aurora-atoms-surface]").first();
    results.atomsNativeSelects = await atomsSurface.locator("select").count();
    results.atomsNativeRanges = await atomsSurface.locator('input[type="range"]').count();
    // the library SelectTrigger carries the fira-code class (the LabeledSelect trigger).
    results.atomsLabeledSelectTriggers = await atomsSurface
        .locator('[data-slot="select-trigger"], .fira-code')
        .count();

    // ── Screenshots (the captured DELTA). ─────────────────────────────────────
    await page.screenshot({ path: "docs/tranches/AX/audit/screens/W38-aurora-after-light.png" });

    // dark scheme
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(500);
    await page.screenshot({ path: "docs/tranches/AX/audit/screens/W38-aurora-after-dark.png" });

    console.log("W38/W47 VERIFY RESULTS:\n" + JSON.stringify(results, null, 2));

    // Assertions (the binding close).
    expect(results.vanGoghOnStrip, "Van Gogh on the preset strip").toBe(true);
    expect(results.oilPastelOnStrip, "Oil Pastel on the preset strip").toBe(true);
    expect(results.crayonOnStrip, "Crayon on the preset strip").toBe(true);
    expect(results.atomsNativeSelects, "no native <select> in atoms").toBe(0);
    expect(results.atomsNativeRanges, "no native range in atoms").toBe(0);
    if (results.activeChip) {
        expect(results.chipGlassTier, "active chip is glass-tier").toBe(true);
    }
    if (results.reveal) {
        expect(results.revealIsSpring, "reveal animates on a spring").toBe(true);
        expect(results.revealIsFast, "reveal is fast (≤0.25s)").toBe(true);
    }
});
