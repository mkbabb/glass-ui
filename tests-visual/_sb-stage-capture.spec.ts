// AY.W-SB-STAGE — own-surface DELTA capture + the G-READTHROUGH π readback (NOT a
// gate; the ledger evidence). Captures the staged pages — the substrate
// PERCEIVABLE behind the glass — at honest dimensions (390 mobile, 1280 desktop).

import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AY/audit/visual`;

const VIEWPORTS = [
    { name: "mobile390", w: 390, h: 844 },
    { name: "desktop1280", w: 1280, h: 800 },
] as const;

// The staged pages: each declares a LIVE substrate the thinned plate must read
// through (+ the exposed margin).
const STAGED = [
    { cat: "substrates", id: "aurora", slug: "aurora" },
    { cat: "substrates", id: "blob", slug: "blob" },
    { cat: "substrates", id: "constellation", slug: "constellation" },
    { cat: "substrates", id: "fourier-field", slug: "fourier-field" },
    { cat: "compositions", id: "hero", slug: "hero" },
    { cat: "compositions", id: "empty-states", slug: "empty-states" },
] as const;

async function setScheme(page: import("@playwright/test").Page, scheme: string) {
    await page.emulateMedia({ colorScheme: scheme as "light" | "dark" });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(180);
}

for (const scheme of ["light", "dark"] as const) {
    for (const vp of VIEWPORTS) {
        test.describe(`W-SB-STAGE capture (${scheme} · ${vp.name})`, () => {
            for (const target of STAGED) {
                test(`${target.cat}/${target.id} — substrate perceivable (${scheme}·${vp.name})`, async ({
                    page,
                }) => {
                    await page.setViewportSize({ width: vp.w, height: vp.h });
                    await page.goto(`/${target.cat}/${target.id}`, {
                        waitUntil: "networkidle",
                    });
                    await setScheme(page, scheme);
                    await page.waitForTimeout(700);

                    // G-READTHROUGH (i) — the substrate host is PAINTED + the card
                    // is on a THINNER rung over it (the read-through seam). We read
                    // that the .story-hero-bg host exists + has a non-zero size AND
                    // that the card carries an exposed margin (the inset gutter).
                    const readback = await page.evaluate(() => {
                        const host = document.querySelector(".story-hero-bg");
                        const card = document.querySelector(
                            ".story-hero-card",
                        ) as HTMLElement | null;
                        if (!host || !card) return { ok: false };
                        const hr = host.getBoundingClientRect();
                        const cr = card.getBoundingClientRect();
                        // exposed margin: the card does NOT fill the host exactly
                        // (the §2.1b inset). margin > 0 on at least one side.
                        const exposed =
                            cr.left - hr.left > 2 ||
                            hr.right - cr.right > 2 ||
                            cr.top - hr.top > 2 ||
                            hr.bottom - cr.bottom > 2;
                        const cs = getComputedStyle(card);
                        return {
                            ok: true,
                            hostH: Math.round(hr.height),
                            exposedMargin: exposed,
                            // the W55 bucket on the card region (over a bright sub)
                            glassBackdrop: cs.getPropertyValue("--glass-backdrop").trim(),
                        };
                    });
                    expect(readback.ok).toBe(true);
                    expect(readback.hostH).toBeGreaterThan(100);
                    // the exposed-substrate margin (the §2.1b inset).
                    expect(readback.exposedMargin).toBe(true);

                    await page.screenshot({
                        path: `${OUT}/W-SB-STAGE-${target.slug}-${vp.name}-${scheme}.png`,
                        fullPage: false,
                    });
                });
            }
        });
    }
}
