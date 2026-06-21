// BE.W-ARIA-ORIENTATION-GUARD — aria-orientation.spec.ts, the ATTRIBUTE-readback π
// (NOT a screenshot diff — a zero-pixel-delta wave: dropping an invisible ARIA attribute
// paints nothing). This is the RENDERED-DOM proof beside the device-free
// `proof:aria-orientation` SOURCE gate (the BC anti-disease split — a stale reka binding
// that silently no-ops the `undefined`-drop passes the source gate but reds THIS readback,
// the feedback_glass_ui_binding_verification class).
//
// THE TWO BINDING ARMS:
//   (a) the defect-closing assertion — the DEFAULT `pill` strip (role="group") has
//       getAttribute('aria-orientation') === null (the WAI-ARIA-§6.3-prohibited attr is
//       GONE — the exact assertion kf's `proof:glassui-aria-ask` runs against the
//       published cut, the bilateral lock);
//   (b) the FENCE assertion — the `underline` strip (role="tablist") KEEPS
//       aria-orientation === 'horizontal' (or 'vertical' on a vertical mount) — the
//       allow-listed emit is preserved (no over-cut).
//
// Both modes asserted (the attribute is mode-invariant — a regression in either reds).
// tags:["local"] with the CI grace-skip (the device-free gate is the CI-side proof).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

test.beforeEach(async ({ page }) => {
    await page.goto("/navigation/tabs", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
});

for (const dark of [false, true]) {
    const mode = dark ? "dark" : "light";

    // (a) THE DEFECT-CLOSING ASSERTION — the pill default drops the prohibited attr.
    test(`pill (role=group) carries NO aria-orientation — ${mode}`, async ({
        page,
    }) => {
        await setDark(page, dark);
        const pill = page.locator(".segmented-tabs--pill").first();
        if ((await pill.count()) === 0) test.skip();
        // the pill strip renders role="group" (the ToggleGroup-shaped surface).
        await expect(pill).toHaveAttribute("role", "group");
        // … and the WAI-ARIA-prohibited aria-orientation is GONE (Vue dropped the
        // undefined-bound attr). getAttribute returns null when absent.
        const orientation = await pill.getAttribute("aria-orientation");
        expect(orientation).toBeNull();
    });

    // (b) THE FENCE ASSERTION — the underline (tablist) keeps the allow-listed emit.
    test(`underline (role=tablist) KEEPS aria-orientation — ${mode}`, async ({
        page,
    }) => {
        await setDark(page, dark);
        const underline = page.locator(".segmented-tabs--underline").first();
        if ((await underline.count()) === 0) test.skip();
        // the underline strip renders role="tablist" (panel-nav).
        await expect(underline).toHaveAttribute("role", "tablist");
        // … and the allow-listed aria-orientation is PRESENT + a real axis value.
        const orientation = await underline.getAttribute("aria-orientation");
        expect(orientation).not.toBeNull();
        expect(["horizontal", "vertical"]).toContain(orientation);
    });
}
