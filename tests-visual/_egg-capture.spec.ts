// AY.W-EGG — own-surface DELTA capture + the per-egg π readback (NOT the gate;
// the proof:easter-eggs source-witness is the gate, this is the ledger
// evidence). Each egg FIRES on the live demo and the reaction is read back, then
// captured. Honest dimensions: 390 mobile, 1280 desktop.

import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AY/audit/visual`;

async function setScheme(
    page: import("@playwright/test").Page,
    scheme: "light" | "dark",
) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(180);
}

// ── E3 — cmd+K command palette (the highest-value egg; navigation π) ─────────
for (const scheme of ["light", "dark"] as const) {
    test(`E3 cmd+K palette opens + navigates (${scheme})`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto("/foundations/intro", { waitUntil: "networkidle" });
        await setScheme(page, scheme);

        // Open via the keyboard combo (Meta on mac, Control elsewhere).
        await page.keyboard.press("Meta+k");
        await page.waitForTimeout(300);
        // Fallback for the Linux/CI runner — Control+k.
        const dialogVisible = await page
            .locator('[role="dialog"]')
            .first()
            .isVisible()
            .catch(() => false);
        if (!dialogVisible) {
            await page.keyboard.press("Control+k");
            await page.waitForTimeout(300);
        }
        const palette = page.locator('[data-slot="command"]').first();
        await expect(palette).toBeVisible();

        // Type a query → the list filters.
        await page.keyboard.type("dialog");
        await page.waitForTimeout(250);

        await page.screenshot({
            path: `${OUT}/W-EGG-cmdk-palette-desktop1280-${scheme}.png`,
            fullPage: false,
        });

        // Select the first match → the route changes.
        await page.keyboard.press("Enter");
        await page.waitForTimeout(400);
        const path = await page.evaluate(() => window.location.pathname);
        expect(path).not.toBe("/foundations/intro");
    });
}

// ── E1 — the ℱ wordmark Fourier redraw ──────────────────────────────────────
for (const scheme of ["light", "dark"] as const) {
    test(`E1 ℱ-redraw paints an epicycle overlay (${scheme})`, async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto("/foundations/intro", { waitUntil: "networkidle" });
        await setScheme(page, scheme);

        // The wordmark dispatches the redraw on long-press / dbl-click; drive the
        // window CustomEvent directly (the same seam the gesture fires).
        await page.evaluate(() => {
            window.dispatchEvent(new CustomEvent("glass-ui-demo:f-redraw"));
        });
        await page.waitForTimeout(900); // mid-reconstruction

        const overlay = await page.evaluate(() => {
            const c = document.querySelector(
                'canvas[data-egg="f-redraw"]',
            ) as HTMLCanvasElement | null;
            if (!c) return { present: false, painted: 0 };
            const ctx = c.getContext("2d");
            if (!ctx) return { present: true, painted: 0 };
            const { data } = ctx.getImageData(0, 0, c.width, c.height);
            let painted = 0;
            for (let i = 3; i < data.length; i += 4) if (data[i] > 8) painted++;
            return { present: true, painted };
        });
        expect(overlay.present).toBe(true);
        expect(overlay.painted).toBeGreaterThan(200);

        await page.screenshot({
            path: `${OUT}/W-EGG-f-redraw-desktop1280-${scheme}.png`,
            fullPage: false,
        });
    });
}

// ── E2 — konami → full-bleed aurora ─────────────────────────────────────────
test("E2 konami reveals the full-bleed aurora", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/foundations/intro", { waitUntil: "networkidle" });
    await setScheme(page, "light");

    const seq = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ];
    for (const k of seq) {
        await page.keyboard.press(k);
        await page.waitForTimeout(30);
    }
    await page.waitForTimeout(700);

    const reveal = await page.evaluate(() => {
        const el = document.querySelector(
            '[data-egg="konami-aurora"]',
        ) as HTMLElement | null;
        return {
            present: !!el,
            shown: el?.getAttribute("data-shown") === "true",
        };
    });
    expect(reveal.present).toBe(true);
    expect(reveal.shown).toBe(true);

    await page.screenshot({
        path: `${OUT}/W-EGG-konami-aurora-desktop1280-light.png`,
        fullPage: false,
    });
});

// ── E4 — the 404 constellation + the empty-states mascot ────────────────────
for (const scheme of ["light", "dark"] as const) {
    test(`E4 404 paints the lattice (${scheme})`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto("/this/route/does/not/exist", {
            waitUntil: "networkidle",
        });
        await setScheme(page, scheme);
        await page.waitForTimeout(500);

        const has404 = await page.evaluate(() =>
            document.body.textContent?.includes("Lost in the lattice"),
        );
        expect(has404).toBe(true);

        await page.screenshot({
            path: `${OUT}/W-EGG-404-lattice-desktop1280-${scheme}.png`,
            fullPage: false,
        });
    });
}

test("E4 empty-states mascot is mounted (light·mobile390)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/compositions/empty-states", { waitUntil: "networkidle" });
    await setScheme(page, "light");
    await page.waitForTimeout(500);

    const mascot = await page.evaluate(() => {
        const el = document.querySelector('[data-egg="empty-states-mascot"]');
        return { present: !!el };
    });
    expect(mascot.present).toBe(true);

    await page.screenshot({
        path: `${OUT}/W-EGG-mascot-mobile390-light.png`,
        fullPage: false,
    });
});

// ── E5 / E6 — the shell dark toggle + the long-press eclipse register ────────
for (const scheme of ["light", "dark"] as const) {
    test(`E5/E6 shell dark toggle present + eclipse register (${scheme})`, async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto("/foundations/intro", { waitUntil: "networkidle" });
        await setScheme(page, scheme);

        // E6 — the toggle is in the rail chrome.
        const toggle = page.locator(".demo-sidebar-dark-toggle").first();
        await expect(toggle).toBeVisible();

        // E5 — a long-press fires the eclipse register (data-eclipsing flips).
        const box = await toggle.boundingBox();
        if (box) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(650); // past the long-press threshold
            const eclipsing = await toggle.getAttribute("data-eclipsing");
            await page.screenshot({
                path: `${OUT}/W-EGG-eclipse-desktop1280-${scheme}.png`,
                fullPage: false,
            });
            await page.mouse.up();
            expect(eclipsing).toBe("true");
        }
    });
}
