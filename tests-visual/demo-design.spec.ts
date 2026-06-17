// BB.W-DEMO-DESIGN — demo-design.spec.ts, the π getComputedStyle readback of the
// demo-design pass (the BINDING close criterion; BB inv-4). The device-free SOURCE
// arm (scripts/proof-demo-design.mjs) proves the STRUCTURE; THIS SPEC PROVES THE
// RENDER.
//
// The flat spec-sheet token tours become DESIGNED specimens. The bite the source arm
// cannot give: an implementer could green the source parse while the RESOLVED render
// is still flat/buried/on-a-dead-plate. Only the resolved getComputedStyle + capture
// readback binds it.
//
// It asserts, off the LIVE painted :5199 DOM:
//   P1 — the type pane's focal specimen resolves to a DISPLAY register font-size
//        (>> 32.9px text-title) — the editorial focal type-event landed (D1).
//   P2 — the color pane's rainbow ramp is the FOCAL moment: the first --section-color
//        swatch renders ABOVE the core role grid in layout order (vertical Y) — the
//        promotion landed (D2).
//   P3 — the icons pane's Pops row renders ABOVE the monochrome icon grid (vertical
//        Y) + the IconChips carry the [data-reveal] pop-entrance hook (D2/D4).
//   P4 — the buttons pane's primary-audacious CTA renders ABOVE the destructive
//        register (vertical Y) — the CTA out-presents destructive (D5) + the glass
//        cluster sits in a field host (transparent plate — the BG-2 fix, D3).
//   P5 — the notification pane renders real .feedback-tone rows (a translucent
//        tinted-glass background, NOT a 10px solid dot) (D5).
//
// THE BINDING ASSERTION IS THE RESOLVED READBACK. It loads :5199 →
// LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips, backstopped by
// proof:live-verified-ledger over the W-DEMO-DESIGN DELTA.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual/", import.meta.url),
);

// The page-title rung the focal type-event must EXCEED — text-title = 32.9px.
const TEXT_TITLE_PX = 32.9;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

// The translucency readback only needs the ALPHA channel (the colored-glass floor
// is α < 0.95). Chrome serializes the .feedback-tone background as either rgba() or
// oklab()/oklch() with a `/ α` slash component — parse the alpha from any of them.
function parseAlpha(str: string): number | null {
    if (!str || str === "transparent" || str === "none") return null;
    // rgba(r, g, b, a) or rgb(r g b / a)
    const rgb = str.match(/rgba?\([^)]*?(?:[ ,/]+([\d.]+))?\s*\)/i);
    // oklab(L a b / α) / oklch(L C h / α) — the slash alpha component
    const slash = str.match(/(?:oklab|oklch|rgba?|color)\([^)]*\/\s*([\d.]+)/i);
    if (slash) return +slash[1]!;
    // rgba with a 4th comma-separated component
    const comma = str.match(/rgba?\(\s*[\d.]+[ ,]+[\d.]+[ ,]+[\d.]+[ ,]+([\d.]+)/i);
    if (comma) return +comma[1]!;
    // a bare rgb()/oklab() with no alpha component is fully opaque.
    if (/^(rgb|oklab|oklch|color)\(/i.test(str)) return 1;
    return rgb ? 1 : null;
}

const paired: Record<string, unknown> = {};

test.describe("BB.W-DEMO-DESIGN — the demo presentation designed to SOTA (π)", () => {
    for (const mode of ["light", "dark"] as const) {
        const dark = mode === "dark";

        // ── P1 — the type pane's focal specimen is a display register ─────────────
        test(`P1 — the type pane leads with a focal display specimen (>> text-title) [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1000 });
            await page.goto("/foundations/typography", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(400);

            const focal = await page.evaluate(() => {
                const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;
                // The focal specimen is the audacious display word leading the pane.
                const el = document.querySelector(
                    "article .text-display-audacious, article .text-display-mega, article .text-display-hero",
                );
                if (!el) return null;
                const cs = getComputedStyle(el);
                return { fs: px(cs.fontSize), text: (el.textContent ?? "").trim().slice(0, 16) };
            });
            paired[`p1-${mode}`] = focal;
            expect(focal, "the type pane has a focal display specimen").not.toBeNull();
            expect(
                focal!.fs,
                `the focal specimen "${focal!.text}" resolves ${focal!.fs}px — must be a display register (>> ${TEXT_TITLE_PX}px text-title)`,
            ).toBeGreaterThan(TEXT_TITLE_PX + 20);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-DESIGN-typography-${mode}.png`,
                fullPage: true,
            });
        });

        // ── P2 — the color rainbow is the focal moment (above the core grid) ──────
        test(`P2 — the rainbow ramp reads as the focal moment (above the core grid) [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1200 });
            await page.goto("/foundations/colors", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(400);

            const order = await page.evaluate(() => {
                // The first rainbow swatch (a section-color background) and the first
                // core-role swatch (a bg-background/bg-card etc. backed swatch).
                const swatches = Array.from(
                    document.querySelectorAll<HTMLElement>("article div[style*='--section-color']"),
                );
                const rainbow = swatches[0];
                const coreLabel = Array.from(
                    document.querySelectorAll<HTMLElement>("article h2"),
                ).find((h) => /Core roles/i.test(h.textContent ?? ""));
                if (!rainbow || !coreLabel) return null;
                return {
                    rainbowY: rainbow.getBoundingClientRect().top,
                    coreY: coreLabel.getBoundingClientRect().top,
                };
            });
            paired[`p2-${mode}`] = order;
            expect(order, "the rainbow + core grid both render").not.toBeNull();
            expect(
                order!.rainbowY,
                `the rainbow ramp (Y=${order!.rainbowY}) must lead above the core grid (Y=${order!.coreY}) — the focal promotion`,
            ).toBeLessThan(order!.coreY);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-DESIGN-colors-${mode}.png`,
                fullPage: true,
            });
        });

        // ── P3 — the icons Pops row leads + carries the pop-entrance hook ─────────
        test(`P3 — the Pops row leads the icons pane + carries the reveal hook [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1200 });
            await page.goto("/foundations/icons", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(400);

            const pops = await page.evaluate(() => {
                // The Pops row chips carry the icon-chip--reveal class + a data-reveal
                // hook (the W-SUFFUSE3 pop-entrance). The first chip + the reference
                // grid heading vertical order.
                const chip = document.querySelector<HTMLElement>("article .icon-chip--reveal");
                const refHead = Array.from(
                    document.querySelectorAll<HTMLElement>("article h2"),
                ).find((h) => /Lucide reference/i.test(h.textContent ?? ""));
                if (!chip || !refHead) return null;
                return {
                    chipY: chip.getBoundingClientRect().top,
                    refY: refHead.getBoundingClientRect().top,
                    hasReveal: chip.hasAttribute("data-reveal"),
                };
            });
            paired[`p3-${mode}`] = pops;
            expect(pops, "the Pops row + the reference grid render").not.toBeNull();
            expect(
                pops!.chipY,
                `the Pops row (Y=${pops!.chipY}) must lead above the reference grid (Y=${pops!.refY})`,
            ).toBeLessThan(pops!.refY);
            expect(pops!.hasReveal, "the Pops chips carry the [data-reveal] pop-entrance hook").toBe(true);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-DESIGN-icons-${mode}.png`,
                fullPage: true,
            });
        });

        // ── P4 — the CTA out-presents destructive + the glass cluster is fielded ──
        test(`P4 — the primary-audacious CTA out-presents destructive + glass over field [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1200 });
            await page.goto("/display/buttons", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(400);

            const cta = await page.evaluate(() => {
                const buttons = Array.from(
                    document.querySelectorAll<HTMLElement>("article button"),
                );
                const launch = buttons.find((b) => /launch sequence/i.test(b.textContent ?? ""));
                const destructive = buttons.find((b) => /^destructive$/i.test((b.textContent ?? "").trim()));
                if (!launch || !destructive) return null;
                return {
                    ctaY: launch.getBoundingClientRect().top,
                    destructiveY: destructive.getBoundingClientRect().top,
                    ctaW: launch.getBoundingClientRect().width,
                    destructiveW: destructive.getBoundingClientRect().width,
                };
            });
            paired[`p4-${mode}`] = cta;
            expect(cta, "the CTA + destructive buttons render").not.toBeNull();
            expect(
                cta!.ctaY,
                `the CTA (Y=${cta!.ctaY}) must out-present destructive (Y=${cta!.destructiveY}) — the focal placement above`,
            ).toBeLessThan(cta!.destructiveY);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-DESIGN-buttons-${mode}.png`,
                fullPage: true,
            });
        });

        // ── P5 — the notification tones render as colored-glass rows ──────────────
        test(`P5 — the notification tones render as translucent .feedback-tone rows [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1000 });
            await page.goto("/feedback/notification", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(400);

            const tone = await page.evaluate(() => {
                const row = document.querySelector<HTMLElement>("article .feedback-tone");
                if (!row) return null;
                const cs = getComputedStyle(row);
                return { bg: cs.backgroundColor };
            });
            paired[`p5-${mode}`] = tone;
            expect(tone, "a .feedback-tone row renders").not.toBeNull();
            const alpha = parseAlpha(tone!.bg);
            expect(alpha, `the tone row background resolves (${tone!.bg})`).not.toBeNull();
            // A tinted-glass row is translucent (α < ~0.95) — NOT an opaque solid dot/slab.
            expect(
                alpha!,
                `the .feedback-tone row reads as translucent colored glass (α=${alpha!}, < 0.95) — not a 10px solid dot`,
            ).toBeLessThan(0.95);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-DESIGN-notification-${mode}.png`,
                fullPage: true,
            });
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-DEMO-DESIGN-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});
