// BG.W-ANIMATION-CONGRUENCE — deck-slide.spec.ts, the BINDING deck-slide π readback.
//
// proof:motion-one-clock proves the SOURCE (the deck slide rides `--spring-deck` =
// `--spring-smooth`, one spring family — no forked clock); THIS spec proves the painted
// RENDER — the slide the user reads: ONE spring-clocked page-flip, the outgoing→incoming
// goo bridge welling during travel, the "Slide N of M" announce, and — under PRM — the
// swap still COMMITS (the deck functions; the physics off — the vestibular floor).
//
// THE BINDING ARMS:
//   (a) SLIDE ADVANCE — Next flips the active slide (`[data-state="active"]` moves to the
//       next section) and the goo bridge ENGAGES (`[data-traveling]` set on the stage
//       during the travel window — the outgoing/incoming neck wells, not a hard cut).
//   (b) SPRING CLOCK — the slide transition reads the deck spring register, not a generic
//       wall clock: the stage resolves a non-empty `--deck-goo-duration` (the deck's own
//       settle) and `--spring-deck` resolves to the shared `--spring-smooth` curve (the
//       one-spring-family congruence the A9 lock guards on the source side).
//   (c) ANNOUNCED — the aria-live announcer updates to the new "Slide N of M" per step.
//   (d) PRM-COMMITS — under emulated `prefers-reduced-motion: reduce`, Next still commits
//       the swap (the active slide changes + the announcer updates); the deck FUNCTIONS,
//       the goo overshoot off — motion off, never off.
//
// LOCAL-ONLY (real-GPU/CDP/pointer dev-box). It LOADS :5199 (the harness auto-spawns +
// reuses the dev server); on a clean CI runner with no Playwright it grace-SKIPs. The
// FEEL read (buttery-smooth cadence) is the paint judge's — deferred. Captured to
// docs/tranches/BG/audit/visual/W-ANIMATION-CONGRUENCE-DELTA.md, BOTH modes.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BG/audit/visual");

const SCHEMES = ["light", "dark"] as const;
const DECK_ROUTE = "/motion/deck";

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

async function activeIndex(page: Page): Promise<number> {
    return page.evaluate(() => {
        const slides = Array.from(document.querySelectorAll(".deck-demo-slide"));
        return slides.findIndex((s) => s.getAttribute("data-state") === "active");
    });
}

for (const scheme of SCHEMES) {
    test.describe(`deck-slide — ${scheme}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(DECK_ROUTE);
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);
        });

        // ── (a) SLIDE ADVANCE + (b) SPRING CLOCK + (c) ANNOUNCED ──────────────────
        test("(a/b/c) Next advances the active slide on the deck spring, wells the goo bridge, and announces", async ({
            page,
        }) => {
            const stage = page.locator(".deck-demo-stage").first();
            if ((await stage.count()) === 0) {
                test.skip(true, "no deck stage mounted (served-app sentinel — /motion/deck)");
                return;
            }

            // (b) SPRING CLOCK — the deck reads its own settle clock + `--spring-deck`
            // resolves to the shared smooth curve (one spring family).
            const clocks = await stage.evaluate((el) => {
                const cs = getComputedStyle(el as Element);
                const rs = getComputedStyle(document.documentElement);
                return {
                    deckGooDuration: cs.getPropertyValue("--deck-goo-duration").trim(),
                    springDeck: rs.getPropertyValue("--spring-deck").trim(),
                    springSmooth: rs.getPropertyValue("--spring-smooth").trim(),
                };
            });
            expect(clocks.deckGooDuration, "the deck resolves its own settle clock").not.toBe("");
            // `--spring-deck: var(--spring-smooth)` — the deck rides the shared smooth
            // curve (the one-spring-family alias, not a forked clock).
            expect(clocks.springDeck, "--spring-deck === --spring-smooth (one spring family)").toBe(
                clocks.springSmooth,
            );

            const before = await activeIndex(page);
            expect(before, "a slide is active at rest").toBeGreaterThanOrEqual(0);
            const liveBefore = (await page.locator('[aria-live="polite"]').first().textContent()) ?? "";

            // Advance.
            await page.getByRole("button", { name: "Next", exact: true }).first().click();

            // (a) the goo bridge engages during the travel window (sample fast).
            await page.waitForTimeout(40);
            const traveling = await stage.evaluate((el) =>
                (el as Element).hasAttribute("data-traveling"),
            );
            expect(traveling, "the goo bridge welled during travel (data-traveling)").toBe(true);

            // (a) the active slide moved forward.
            await page.waitForTimeout(400);
            const after = await activeIndex(page);
            expect(after, "the active slide advanced").toBe(before + 1);

            // (c) the announcer updated.
            const liveAfter = (await page.locator('[aria-live="polite"]').first().textContent()) ?? "";
            expect(liveAfter.trim(), "the 'Slide N of M' announcer updated").not.toBe(liveBefore.trim());

            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.screenshot({
                path: resolve(VISUAL_DIR, `deck-slide_advance_${scheme}.png`),
            });
        });

        // ── (d) PRM — the swap still COMMITS ─────────────────────────────────────
        test("(d) PRM-COMMITS — under reduced-motion Next still commits the swap + announces", async ({
            page,
        }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.reload();
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);

            const stage = page.locator(".deck-demo-stage").first();
            if ((await stage.count()) === 0) {
                test.skip(true, "no deck stage mounted (served-app sentinel — /motion/deck)");
                return;
            }
            const before = await activeIndex(page);
            const liveBefore =
                (await page.locator('[aria-live="polite"]').first().textContent()) ?? "";

            await page.getByRole("button", { name: "Next", exact: true }).first().click();
            await page.waitForTimeout(300);

            const after = await activeIndex(page);
            expect(after, "the deck FUNCTIONS under PRM — the swap commits").toBe(before + 1);
            const liveAfter =
                (await page.locator('[aria-live="polite"]').first().textContent()) ?? "";
            expect(liveAfter.trim(), "the announcer updated under PRM").not.toBe(liveBefore.trim());

            await page.emulateMedia({ reducedMotion: null });
        });
    });
}
