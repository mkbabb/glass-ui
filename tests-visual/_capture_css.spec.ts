// One-shot helper (chromium): union every receiver route's injected CSS into one
// complete, deduped, browser-ready stylesheet for the WebKit cascade harness.
// Run: npx playwright test --config <w1 config> --project=chromium-capture
//
// Readiness/polling only (LIVE-π): each route waits until its injected stylesheet
// rule count STOPS GROWING (component CSS fully injected) rather than a fixed sleep.
import { test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

const OUT = fileURLToPath(
    new URL(
        "../docs/tranches/BJ/evidence/W1-RADIUS-REDRESS/compiled-demo.css",
        import.meta.url,
    ),
);

const ROUTES = [
    "/navigation/tabs",
    "/data/search",
    "/feedback/skeleton",
    "/data/infinite-scroll",
    "/display/atoms",
    "/data/tags-input",
    "/data/sortable-list",
    "/forms/inputs",
    "/containers/command",
];

// Poll until the total injected-stylesheet rule count is stable across two
// animation frames — the readiness signal that all route/component CSS has injected.
async function waitForStyleSheetsStable(page: Page): Promise<void> {
    const count = () =>
        page.evaluate(() => {
            let n = 0;
            for (const sheet of document.styleSheets) {
                try {
                    n += sheet.cssRules.length;
                } catch {
                    /* cross-origin */
                }
            }
            return n;
        });
    let prev = -1;
    for (let i = 0; i < 40; i++) {
        const cur = await count();
        if (cur === prev && cur > 0) return;
        prev = cur;
        await page.evaluate(
            () => new Promise<void>((r) => requestAnimationFrame(() => r())),
        );
    }
}

test("capture union CSS", async ({ page }) => {
    const seen = new Set<string>();
    const parts: string[] = [];
    for (const route of ROUTES) {
        await page.goto(route, { waitUntil: "networkidle" });
        await waitForStyleSheetsStable(page);
        // The atoms page lazy-mounts each family behind a switcher; reveal Avatar so
        // its component CSS injects, then wait for the mounted marker + CSS stability.
        if (route === "/display/atoms") {
            await page.evaluate(() => {
                const t = [...document.querySelectorAll("button, [role='tab'], .segmented-tab")].find(
                    (b) => (b.textContent || "").trim() === "Avatar",
                ) as HTMLElement | undefined;
                t?.click();
            });
            await page.locator(".glass-avatar").first().waitFor({ state: "attached" });
            await waitForStyleSheetsStable(page);
        }
        const rules = await page.evaluate(() => {
            const out: string[] = [];
            for (const sheet of document.styleSheets) {
                try {
                    for (const r of sheet.cssRules) out.push(r.cssText);
                } catch {
                    /* skip cross-origin */
                }
            }
            return out;
        });
        for (const r of rules) {
            if (!seen.has(r)) {
                seen.add(r);
                parts.push(r);
            }
        }
    }
    const css = parts.join("\n");
    writeFileSync(OUT, css);
    console.log(`CAPTURED ${css.length} bytes, ${parts.length} unique rules`);
});
