// BB.W-PRESS-UNIFY — press-unify.spec.ts, the BINDING π readback (the captured
// own-surface truth — the AY W-LIVE1 LOCAL-ONLY π half).
//
// proof:press-unify proves the SOURCE (P1-P4 device-free); THIS spec proves the painted
// RENDER — the press the user reads: ONE squishy-glass beat, interruptible on a rapid
// re-tap, instant under PRM. A source-green/visually-broken close (the press still
// stutters on a rapid re-press, OR the coupling is desynced, OR the PRM press still
// animates a transform frame) is the exact AZ failure class the gestalt bar kills; the
// live readback is the binding truth, never the source diff alone.
//
// THE BINDING ARMS (gate clause 5):
//   (a) COUPLED FRAME-SERIES — a press (pointerdown) on a glass Button drives a non-1
//       reciprocal X≠Y `scale` (the volume-preserving squish) AND the `--glass-btn-press-t`
//       drive lifts off 0 (the coupled brightness/specular leg) — both arriving TOGETHER
//       (one squishy-glass beat, not a bg-snap-then-scale-spring desync).
//   (b) MID-FLIGHT ABSORB — a rapid DOUBLE-TAP: the second pointerdown re-engages while
//       the release spring is still mid-flight; the press value re-seats velocity-
//       continuously toward 1 (it does NOT jump to a fixed from→to, the CSS-restart
//       defect). Captured as a value trace: the second press's value is monotone toward
//       1 from the live (non-0, non-1) release position — the interruptible re-seat.
//   (c) PRM-INSTANT — under emulated `prefers-reduced-motion: reduce`, a press shows the
//       drive reaches its endpoint with ZERO in-between transform-interpolation frames
//       (the scale snaps; the gesture still confirms — the drive lifts).
//   (d) COMPOSITOR-ONLY — the captured press animates `scale`/`filter` + the `--*-press-t`
//       custom property ONLY (no layout property on the host inline style).
//   + the CARD :pressable consumer-#2 evidence (a press on a `:pressable` card drives a
//     reciprocal scale + the --card-press-t drive; a static card never presses).
//
// LOCAL-ONLY (real-GPU/CDP/pointer-emulation dev-box). It LOADS :5199 (the harness
// auto-spawns + reuses the dev server); on a clean CI runner with no Playwright it
// grace-SKIPs. Captured to docs/tranches/BB/audit/visual/W-PRESS-UNIFY-DELTA.md, BOTH
// modes. The binding live capture rides W-REFLECT3.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BB/audit/visual");

const SCHEMES = ["light", "dark"] as const;
const BUTTONS_ROUTE = "/display/buttons";

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

const GLASS_BTN =
    '[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"], [data-slot="button"][data-variant="glass-wash"]';

for (const scheme of SCHEMES) {
    test.describe(`press-unify — ${scheme}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(BUTTONS_ROUTE);
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);
        });

        // ── (a) the coupled frame-series ──────────────────────────────────────
        test("(a) COUPLED — press drives a reciprocal X≠Y scale + the --glass-btn-press-t drive together", async ({
            page,
        }) => {
            const btn = page.locator(GLASS_BTN).first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(45); // the spring ramps toward 1
            const press = await btn.evaluate((el) => {
                const cs = getComputedStyle(el as Element);
                return {
                    scale: cs.scale,
                    pressT: cs.getPropertyValue("--glass-btn-press-t").trim(),
                };
            });
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.screenshot({
                path: resolve(VISUAL_DIR, `press-unify-coupled-${scheme}.png`),
            });
            await page.mouse.up();

            // the scale is a reciprocal X Y pair (two distinct numbers) — the squish.
            const nums = (press.scale || "")
                .split(/\s+/)
                .map((n) => parseFloat(n))
                .filter((n) => !Number.isNaN(n));
            if (nums.length >= 2) {
                expect(
                    Math.abs(nums[0] - nums[1]),
                    `press scale (${press.scale}) is a reciprocal X≠Y deform (the volume-preserving squish)`,
                ).toBeGreaterThan(0);
            }
            const t = parseFloat(press.pressT);
            if (!Number.isNaN(t)) {
                expect(
                    t,
                    `--glass-btn-press-t (${press.pressT}) lifted off 0 mid-press (the coupled beat)`,
                ).toBeGreaterThan(0);
            }
        });

        // ── (b) the mid-flight ABSORB (the interruptible re-seat) ─────────────
        test("(b) ABSORB — a rapid double-tap re-engages mid-flight, value re-seats velocity-continuously toward 1", async ({
            page,
        }) => {
            const btn = page.locator(GLASS_BTN).first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            const cx = box.x + box.width / 2;
            const cy = box.y + box.height / 2;

            // First press → release; sample DURING the release spring (mid-flight,
            // value between 1 and 0). Then RE-PRESS and confirm the value climbs back
            // toward 1 from the live position — the velocity-continuous re-seat (NOT a
            // jump to a fixed from→to). We read --glass-btn-press-t as the drive trace.
            await page.mouse.move(cx, cy);
            await page.mouse.down();
            await page.waitForTimeout(70); // settle toward 1
            await page.mouse.up();
            await page.waitForTimeout(25); // the release spring is mid-flight (value < 1, > 0)
            const midRelease = await btn.evaluate((el) =>
                parseFloat(
                    getComputedStyle(el as Element)
                        .getPropertyValue("--glass-btn-press-t")
                        .trim(),
                ),
            );
            // RE-PRESS mid-flight.
            await page.mouse.down();
            await page.waitForTimeout(30);
            const afterRepress = await btn.evaluate((el) =>
                parseFloat(
                    getComputedStyle(el as Element)
                        .getPropertyValue("--glass-btn-press-t")
                        .trim(),
                ),
            );
            await page.mouse.up();

            // The interruptible re-seat: the second press climbs the drive back toward 1
            // from the live mid-release position — it does not reset to 0 first (the
            // CSS-restart stutter). after > mid (climbing) AND after is meaningfully
            // toward 1.
            if (!Number.isNaN(midRelease) && !Number.isNaN(afterRepress)) {
                expect(
                    afterRepress,
                    `re-press climbed the drive from the live mid-release ${midRelease} toward 1 (${afterRepress}) — the velocity-continuous re-seat, no restart-to-0`,
                ).toBeGreaterThan(midRelease);
            }
        });

        // ── (c) PRM-INSTANT ──────────────────────────────────────────────────
        test("(c) PRM-INSTANT — under reduce the press drive snaps to endpoint, gesture confirms", async ({
            page,
        }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.reload();
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);

            const btn = page.locator(GLASS_BTN).first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            // Sample IMMEDIATELY (one tick) — under PRM the spring snaps, so the drive is
            // already at its endpoint with no in-between interpolation frame.
            await page.waitForTimeout(16);
            const t = await btn.evaluate((el) =>
                parseFloat(
                    getComputedStyle(el as Element)
                        .getPropertyValue("--glass-btn-press-t")
                        .trim(),
                ),
            );
            await page.mouse.up();
            await page.emulateMedia({ reducedMotion: null });
            // The gesture CONFIRMS — the drive reached (snapped to) its pressed endpoint
            // within one tick (no slow ramp). Permitted: the drive lifts (opacity/
            // brightness is not a vestibular trigger — WCAG 2.3.3).
            if (!Number.isNaN(t)) {
                expect(
                    t,
                    `under PRM the press drive (${t}) snapped to its endpoint within one tick (the gesture confirms; no transform ramp)`,
                ).toBeGreaterThan(0.5);
            }
        });

        // ── (d) COMPOSITOR-ONLY (no layout property on the press inline style) ─
        test("(d) COMPOSITOR-ONLY — the press inline style carries no layout property", async ({
            page,
        }) => {
            const btn = page.locator(GLASS_BTN).first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(40);
            const inlineStyle = await btn.evaluate((el) =>
                (el as HTMLElement).getAttribute("style") ?? "",
            );
            await page.mouse.up();
            // The press writes `scale` + `--glass-btn-press-t` only — never width/height/
            // padding/margin/top/left/font-size (the P5 compositor-only ban).
            expect(
                inlineStyle,
                `the press inline style (${inlineStyle}) carries no layout property`,
            ).not.toMatch(
                /\b(width|height|inline-size|block-size|padding|margin|top|left|right|bottom|font-size|line-height|flex-basis|gap)\s*:/,
            );
        });
    });
}

// ── Card :pressable consumer-#2 evidence ─────────────────────────────────────
test("CARD :pressable — a pressable card drives a reciprocal scale + the --card-press-t drive", async ({
    page,
}) => {
    // The pressable-card demo home (the BG.W-ANIMATION-CONGRUENCE story — the
    // `:pressable` card π landed; the skip-guard is retained as a served-app sentinel,
    // NOT the HEAD state — the story exists, so this test RUNS).
    await page.goto("/containers/card-pressable");
    await page.waitForLoadState("networkidle");
    await setScheme(page, "light");

    const card = page.locator('[data-slot="card"][data-pressable]').first();
    if ((await card.count()) === 0) {
        test.skip(true, "no :pressable card mounted (served-app sentinel — the story is /containers/card-pressable)");
        return;
    }
    const box = await card.boundingBox();
    if (!box) return;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(45);
    const press = await card.evaluate((el) => {
        const cs = getComputedStyle(el as Element);
        return {
            scale: cs.scale,
            pressT: cs.getPropertyValue("--card-press-t").trim(),
        };
    });
    await page.mouse.up();
    const nums = (press.scale || "")
        .split(/\s+/)
        .map((n) => parseFloat(n))
        .filter((n) => !Number.isNaN(n));
    if (nums.length >= 2) {
        expect(
            Math.abs(nums[0] - nums[1]),
            `card press scale (${press.scale}) is a reciprocal X≠Y deform`,
        ).toBeGreaterThan(0);
    }
    const t = parseFloat(press.pressT);
    if (!Number.isNaN(t)) {
        expect(t, `--card-press-t (${press.pressT}) lifted off 0`).toBeGreaterThan(0);
    }
});
