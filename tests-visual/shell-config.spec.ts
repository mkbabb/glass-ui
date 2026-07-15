// AZ.W-SHELL-CONFIG — shell-config.spec.ts, the π/runtime readback of the gear-hosted
// demo configurator (the BINDING visual + runtime truth; the local-only half of
// proof:shell-config).
//
// R3-4 (refined by R4-3): the demo's gear opens the glass-ui demo CONFIGURATOR. The
// DEVICE-FREE gate (proof-shell-config.mjs) proves the SOURCE deletions + axis fields
// are present; THIS SPEC proves the RENDER + RUNTIME:
//   G1 — no floating gear button hovers over the page (the FAB is gone) on the overview.
//   G2 — the `,` shortcut opens the configurator; the title reads "glass-ui demo
//        Configurator" (the re-framed render), not "Preset Editor".
//   G3 — the dock gear control ALSO opens the configurator (the rehomed open).
//   G4 — driving the --glass-level slider writes the changed :root --glass-level (the
//        W54 knob taking effect); driving the --ui-scale slider writes the changed
//        :root --ui-scale AND --dock-scale moves via its derivation.
//   G5 — the IA carries no composables category (the deleted reference view).
//   G-CLOSE — capture the floating-FAB-gone overview (light+dark), the open configurator
//        with the new axes, the IA-without-composables, + the axes-write JSON.
//
// THE BINDING ASSERTIONS ARE THE RENDER + THE :root READBACKS (axe-independent). It
// loads :5199 → auto-detected LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips,
// backstopped by proof:live-verified-ledger over the W-SHELL-CONFIG DELTA.

import { test, expect } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/AZ/audit/visual", import.meta.url),
);

// Park any WebGL background so a capture is deterministic.
async function parkBackground(page: import("@playwright/test").Page): Promise<void> {
    await page.evaluate(() => {
        try {
            Object.defineProperty(document, "hidden", {
                value: true,
                configurable: true,
            });
            document.dispatchEvent(new Event("visibilitychange"));
        } catch {
            /* noop */
        }
    });
    await page.waitForTimeout(250);
}

// Drive a Reka slider (a [role="slider"] thumb) by focusing it and pressing an arrow
// key N times — a deterministic, real-input write (no programmatic value injection).
// The configurator field rows have no stable class, so locate the slider as the
// [role="slider"] inside the closest field div ANCESTOR of the field's <Label> text
// (the nearest div that also contains a slider — precise per field).
async function nudgeSlider(
    page: import("@playwright/test").Page,
    label: string,
    key: "ArrowRight" | "ArrowLeft" | "ArrowUp" | "ArrowDown",
    times: number,
): Promise<void> {
    const thumb = page
        .getByText(label, { exact: true })
        .locator('xpath=ancestor::div[.//*[@role="slider"]][1]')
        .locator('[role="slider"]')
        .first();
    await thumb.focus();
    for (let i = 0; i < times; i++) {
        await page.keyboard.press(key);
        await page.waitForTimeout(20);
    }
}

test.describe("shell-config (π lane — the gear-hosted configurator render + runtime, fail-CLOSED)", () => {
    test("G1 — no floating gear button hovers over the overview", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1000);

        // The prior floating FAB was a `fixed bottom-6 right-6 … rounded-full` button
        // with aria-label "Open configurator". Assert NO such floating affordance exists.
        const floatingFab = await page.evaluate(() => {
            const candidates = Array.from(
                document.querySelectorAll("button, a"),
            ) as HTMLElement[];
            return candidates.some((el) => {
                const cs = getComputedStyle(el);
                if (cs.position !== "fixed") return false;
                // bottom-6 right-6 ≈ 1.5rem (24px) from the bottom-right corner.
                const r = el.getBoundingClientRect();
                const nearBottomRight =
                    window.innerWidth - r.right < 64 &&
                    window.innerHeight - r.bottom < 64;
                const round = parseFloat(cs.borderRadius) >= 9999 || cs.borderRadius.includes("9999");
                const label = (el.getAttribute("aria-label") ?? "").toLowerCase();
                return nearBottomRight && (round || label.includes("configurator"));
            });
        });
        expect(
            floatingFab,
            "a floating gear FAB (fixed bottom-right rounded-full) still hovers over the page — the floating affordance must be GONE (D1)",
        ).toBe(false);
    });

    test("G2 — the `,` shortcut opens the re-framed configurator", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(800);

        // The `,` shortcut dispatches glass-ui-demo:toggle-configurator (AppShell).
        await page.keyboard.press(",");
        await page.waitForTimeout(500);

        const title = page.getByText("glass-ui demo Configurator", { exact: true });
        await expect(
            title,
            'the configurator title must read "glass-ui demo Configurator" (re-framed from "Preset Editor" — D2)',
        ).toBeVisible();
        // The old title must NOT survive.
        await expect(page.getByText("Preset Editor", { exact: true })).toHaveCount(0);
    });

    test("G3 — the dock gear control opens the configurator", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(800);

        const gear = page.locator(
            '[aria-label="Open the glass-ui demo configurator"]',
        );
        await expect(gear, "the rehomed dock gear control must render").toHaveCount(1);
        await gear.click();
        await page.waitForTimeout(500);
        await expect(
            page.getByText("glass-ui demo Configurator", { exact: true }),
            "the dock gear must open the configurator (the rehomed open — D1)",
        ).toBeVisible();
    });

    test("G4 — the axes write live :root values (--glass-level + --ui-scale → --dock-scale)", async ({
        page,
    }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(800);

        // Open via the `,` shortcut.
        await page.keyboard.press(",");
        await page.waitForTimeout(500);

        const readRoot = () =>
            page.evaluate(() => {
                const inline = document.documentElement.style;
                // --dock-scale = calc(--ui-scale * --dock-local-scale); it is not a
                // registered @property, so getComputedStyle returns the unresolved
                // calc() string. RESOLVE it numerically via a probe element whose
                // width consumes the token (offsetWidth gives the px-resolved value).
                const probe = document.createElement("div");
                probe.style.position = "absolute";
                probe.style.visibility = "hidden";
                probe.style.width = "calc(var(--dock-scale) * 1000px)";
                document.body.appendChild(probe);
                const dockScale = probe.offsetWidth / 1000;
                probe.remove();
                return {
                    glassLevel: inline.getPropertyValue("--glass-level").trim(),
                    uiScale: inline.getPropertyValue("--ui-scale").trim(),
                    dockScale,
                };
            });

        const before = await readRoot();

        // Drive --glass-level DOWN (toward opaque). Step 0.05; ArrowLeft from default 1.
        await nudgeSlider(page, "Glass level", "ArrowLeft", 4);
        await page.waitForTimeout(150);
        // Drive --ui-scale UP. ArrowRight from default 1, step 0.05.
        await nudgeSlider(page, "UI scale", "ArrowRight", 4);
        await page.waitForTimeout(150);

        const after = await readRoot();

        // --glass-level was written to :root and changed (the W54 knob took effect).
        expect(
            after.glassLevel,
            "the --glass-level slider did NOT write a :root inline value (the W54 maximal-glass knob must take effect)",
        ).not.toBe("");
        expect(
            after.glassLevel,
            `--glass-level did not change from the slider drive (before "${before.glassLevel}" → after "${after.glassLevel}")`,
        ).not.toBe(before.glassLevel);

        // --ui-scale was written to :root and changed (the GLOBAL knob).
        expect(
            after.uiScale,
            "the --ui-scale slider did NOT write a :root inline value (the global comfort scalar must take effect)",
        ).not.toBe("");
        expect(Number(after.uiScale)).toBeGreaterThan(1);

        // --dock-scale MOVED via its derivation calc(--ui-scale * --dock-local-scale)
        // — writing --ui-scale moved the dock for FREE (the binding "not --dock-scale
        // directly" decision).
        expect(
            Number(after.dockScale),
            `--dock-scale (computed ${after.dockScale}) did not track the --ui-scale lift (before ${before.dockScale}) — the derivation must carry the dock for free`,
        ).toBeGreaterThan(Number(before.dockScale));

        // Capture the open configurator with the new axes + write the readback JSON.
        await page.screenshot({
            path: `${VISUAL_DIR}W-SHELL-CONFIG-configurator-axes.png`,
        });
        writeFileSync(
            `${VISUAL_DIR}W-SHELL-CONFIG-axes-write.json`,
            JSON.stringify({ before, after, note: "--ui-scale lifts --dock-scale via its derivation; --glass-level is the W54 knob" }, null, 2),
        );
    });

    test("G5 — the IA carries no composables category", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        // The deleted composables routes no longer resolve to a real page.
        await page.goto("/composables/use-token-color", {
            waitUntil: "domcontentloaded",
        });
        await page.waitForTimeout(600);
        // The route falls through to the no-match "Pick a story" frame (no story).
        const hasComposablesNav = await page.evaluate(() =>
            Array.from(document.querySelectorAll("[aria-label]")).some((el) =>
                (el.getAttribute("aria-label") ?? "")
                    .toLowerCase()
                    .includes("composable"),
            ),
        );
        expect(
            hasComposablesNav,
            "a Composables nav affordance still renders — the reference category must be deleted (D4)",
        ).toBe(false);
    });

    // ── G-CLOSE — capture the overview (FAB-gone) + IA DELTA PNGs, light + dark. ──────
    test("G-CLOSE — capture the FAB-gone overview + IA DELTA (light+dark)", async ({
        page,
    }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: 1440, height: 900 });

        for (const scheme of ["light", "dark"] as const) {
            await page.emulateMedia({ colorScheme: scheme });
            await page.goto("/foundations/intro", {
                waitUntil: "domcontentloaded",
            });
            await page.waitForTimeout(1000);
            await parkBackground(page);
            // Ensure the demo's dark class matches the emulated scheme for the dark arm.
            if (scheme === "dark") {
                await page.evaluate(() =>
                    document.documentElement.classList.add("dark"),
                );
                await page.waitForTimeout(150);
            }
            await page.screenshot({
                path: `${VISUAL_DIR}W-SHELL-CONFIG-floating-fab-after-${scheme}.png`,
                fullPage: false,
            });
        }

        // The IA-without-composables capture (the rail + the bottom dock, light).
        await page.emulateMedia({ colorScheme: "light" });
        await page.evaluate(() =>
            document.documentElement.classList.remove("dark"),
        );
        await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(800);
        await parkBackground(page);
        await page.screenshot({
            path: `${VISUAL_DIR}W-SHELL-CONFIG-ia-no-composables.png`,
            fullPage: false,
        });
    });
});
