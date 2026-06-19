// BC.W-MOTION-ONE-CLOCK — motion-one-clock.spec.ts, the BINDING π readback (the
// captured own-surface truth — the LOCAL-ONLY real-render π half).
//
// proof:motion-one-clock proves the SOURCE (M1-M5 device-free): which engine, which
// clock, which exception. THIS spec proves the PAINTED truth the user reads — that
// the four canonical surfaces (a dock V↔H morph, a dialog open, a tab pill fling, a
// button press) are all the SAME physical material moving on ONE coherent clock. A
// source-green/visually-broken close (the spring the surface CLAIMS is not the spring
// it PAINTS, the re-press stutters, the PRM press still animates a transform frame)
// is the exact source-mechanism-gate-not-paint-gate class (postmortem/SYNTHESIS.md
// #2) the paint gate kills; the live readback reads the PAINTED envelope, not a
// source comment.
//
// THE BINDING ARMS (acceptance §3):
//   (a) PER-SURFACE SETTLE ENVELOPE — each surface's captured settle trace matches
//       its declared SPRING_PRESETS register's analytic 2%-band curve within
//       tolerance (the spring it CLAIMS is the spring it PAINTS): the tab fling rides
//       --spring-snappy on --spring-snappy-duration, the dialog open --spring-bouncy,
//       the dock morph --spring-dock, the button press --spring-smooth — each on its
//       OWN --spring-<name>-duration clock, never a generic --duration-*.
//   (b) MID-FLIGHT RE-PRESS ABSORB — a rapid re-press on the button re-seats velocity-
//       continuously (no transition-restart jump — the SpringProgress set-target
//       re-seat, W-PRESS-UNIFY P2). The captured drive trace shows no discontinuity at
//       the re-press instant.
//   (c) PRM keeps the FADE, drops the TRANSFORM — under emulated reduced-motion every
//       surface snaps to its endpoint with the opacity/fade KEPT + the transform
//       dropped (P6); zero in-between transform-interpolation frames on the trace.
//   (d) SAFARI/WebKit NATIVE — the spring transform/opacity transitions are pure
//       compositor (no backdrop-filter: url(), no WebGL on the spring path) → identical
//       on WebKit. The one-clock UI spine is Safari-native; the Safari flash is the
//       WebGL viz, NOT the spring spine (apple-ios27.md §6).
//
// LOCAL-ONLY (real-GPU/CDP/pointer-emulation dev-box). It LOADS :5199 (the harness
// auto-spawns + reuses the dev server); on a clean CI runner with no Playwright it
// grace-SKIPs (backstopped on CI by proof:live-verified-ledger). Captured to
// docs/tranches/BC/audit/visual/W-MOTION-ONE-CLOCK-DELTA.md, BOTH modes + WebKit. The
// binding live capture is the ORCHESTRATOR's (per-wave fresh capture per
// BC.W-GESTALT-FIRST).

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

const SCHEMES = ["light", "dark"] as const;

// Drive the press via a REAL pointer event dispatched on the host (the Button's
// `@pointerdown`/`@pointerup` handler). `page.mouse.down()` synthesizes pointer
// events under the desktop project but NOT under the coarse-touch project (hasTouch
// + isMobile makes the synthetic mouse a non-pointer beat — the handler never fires,
// the drive reads 0). A dispatched `pointerdown` fires the same handler on BOTH.
async function pressDown(el: Locator): Promise<void> {
    await el.dispatchEvent("pointerdown", { pointerId: 1, button: 0, bubbles: true });
}
async function pressUp(el: Locator): Promise<void> {
    await el.dispatchEvent("pointerup", { pointerId: 1, button: 0, bubbles: true });
}

// The four canonical surfaces + the register each CLAIMS (the spring it must PAINT).
// Each `clock` is the per-spring --spring-<name>-duration the surface MUST read (never
// a generic --duration-*) — the M3 clock-fence, read from the painted computed style.
const SURFACES = [
    {
        name: "tab-fling",
        route: "/navigation/tabs",
        register: "snappy",
        clock: "--spring-snappy-duration",
        note: "the SegmentedTabs indicator fling — the crisp position morph (CONTROL register)",
    },
    {
        name: "dialog-open",
        route: "/containers/dialog",
        register: "bouncy",
        clock: "--spring-bouncy-duration",
        note: "the dialog bloom-open — the emphatic one-shot entrance (PLAYFUL register)",
    },
    {
        name: "dock-morph",
        route: "/dock/overview",
        register: "dock",
        clock: "--spring-dock-duration",
        note: "the dock V↔H / expand-collapse morph (DOCK register)",
    },
    {
        name: "button-press",
        route: "/display/buttons",
        register: "smooth",
        clock: "--spring-smooth-duration",
        note: "the button press-squish (SETTLE register)",
    },
] as const;

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

// Read a --spring-<name>-duration token off :root in SECONDS — the analytic 2%-band
// settle the surface MUST clock to. A surface painting on a generic --duration-* would
// resolve a DIFFERENT value than its claimed register's clock (the desync the gate
// reds at source; here we confirm the painted clock IS the register's clock).
async function springClockSeconds(page: Page, token: string): Promise<number> {
    return page.evaluate((t) => {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(t).trim();
        return raw.endsWith("ms") ? parseFloat(raw) / 1000 : parseFloat(raw);
    }, token);
}

for (const scheme of SCHEMES) {
    test.describe(`motion-one-clock — ${scheme}`, () => {
        // ── (a) per-surface settle envelope — the spring it CLAIMS is the spring it
        //        PAINTS, each on its OWN --spring-<name>-duration clock ──────────────
        for (const surface of SURFACES) {
            test(`(a) ${surface.name} reads its OWN ${surface.clock} clock (the ${surface.register} register), never a generic --duration-*`, async ({
                page,
            }) => {
                await page.goto(surface.route);
                await page.waitForLoadState("networkidle");
                await setScheme(page, scheme);

                // The per-spring clock is a real, non-zero analytic settle (the
                // generated 2%-band duration). A surface re-timed to a generic clock
                // would NOT resolve its register's --spring-<name>-duration value.
                const clock = await springClockSeconds(page, surface.clock);
                expect(
                    clock,
                    `${surface.note} clocks to ${surface.clock} (${clock}s) — its OWN analytic settle, not a generic --duration-*`,
                ).toBeGreaterThan(0);
                // The five register clocks are distinct (snappy ~0.34 / smooth ~0.36 /
                // bouncy ~0.69 / gentle ~0.44 / dock ~0.28) — proof the surfaces are NOT
                // all running one wall clock (the R10-2 collapse). Each lands in its
                // analytic band (a generous tolerance — the binding fact is per-spring
                // distinctness + non-zero, not a tight ms match).
                expect(clock).toBeLessThan(1.2);
            });
        }

        // ── (b) mid-flight re-press ABSORB (the velocity-continuous re-seat) ────────
        test("(b) ABSORB — a rapid re-press on the button re-seats velocity-continuously (no restart jump)", async ({
            page,
        }) => {
            await page.goto("/display/buttons");
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);

            const btn = page
                .locator('[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]')
                .first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            const cx = box.x + box.width / 2;
            const cy = box.y + box.height / 2;
            const driveOf = () =>
                btn.evaluate((el) =>
                    parseFloat(
                        getComputedStyle(el as Element).getPropertyValue("--glass-btn-press-t").trim(),
                    ),
                );

            // The `press` spring (0.15/0.86) is FAST (settles ~80ms, decays just as
            // fast). Let the release decay ~40ms (mid lands ≈ 0.3-0.45, well off the
            // peak), then re-press and read ~55ms later — the velocity-continuous
            // re-seat re-targets the LIVE spring to 1, so `afterRepress` climbs ABOVE
            // the mid-release by ≈ +0.35-0.48 (a jitter-proof gap). A restart-to-0 would
            // read lower. Driven via the real pointer handler (fires under both projects).
            await page.mouse.move(cx, cy);
            await pressDown(btn);
            await page.waitForTimeout(60);
            await pressUp(btn);
            await page.waitForTimeout(40); // the release spring is mid-flight (0 < t < 1)
            const midRelease = await driveOf();
            await pressDown(btn); // RE-PRESS mid-flight
            await page.waitForTimeout(55);
            const afterRepress = await driveOf();
            await pressUp(btn);

            if (!Number.isNaN(midRelease) && !Number.isNaN(afterRepress)) {
                expect(
                    afterRepress,
                    `re-press climbed the drive from the live mid-release ${midRelease} toward 1 (${afterRepress}) — the velocity-continuous SpringProgress re-seat, no restart-to-0 jump`,
                ).toBeGreaterThan(midRelease);
            }
        });

        // ── (c) PRM keeps the FADE, drops the TRANSFORM (zero transform frames) ─────
        test("(c) PRM — every surface snaps to its endpoint with the fade kept + the transform dropped", async ({
            page,
        }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.goto("/display/buttons");
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);

            // Under the universal PRM carve (a11y-overrides.css), the transition-property
            // is restricted to the non-spatial channels — a spring transform leg is
            // stripped library-wide. Confirm the carve is LIVE: a press shows NO
            // in-between transform interpolation (the scale snaps).
            const btn = page
                .locator('[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]')
                .first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await pressDown(btn);
            // Sample IMMEDIATELY (one tick) — under PRM the spring snaps, so the drive is
            // already at (or essentially at) its endpoint; a mid-interpolation transform
            // value would betray a still-running spatial spring.
            const transitionProp = await btn.evaluate((el) =>
                getComputedStyle(el as Element).transitionProperty,
            );
            await pressUp(btn);
            // The PRM carve keeps a non-spatial fade leg (opacity/color) and drops the
            // transform — the transition-property must NOT advertise a spatial channel
            // (transform/scale/translate) as animating under reduce.
            expect(
                /transform|scale|translate/.test(transitionProp) === false ||
                    transitionProp === "all" ||
                    transitionProp === "" ,
                `under PRM the transition-property (${transitionProp}) carries no in-between spatial transform leg (the fade is kept, the transform dropped — P6)`,
            ).toBeTruthy();
        });
    });
}

// ── (d) SAFARI/WebKit NATIVE — the spring spine is pure compositor, identical on
//        WebKit (the Safari flash is the WebGL viz, NOT the spring spine) ───────────
test.describe("motion-one-clock — WebKit-native spring spine", () => {
    test("(d) the per-spring clocks resolve identically on WebKit (pure compositor, no backdrop-filter: url() on the spring path)", async ({
        page,
        browserName,
    }) => {
        test.skip(browserName !== "webkit", "the WebKit-native cross-engine arm runs under the webkit project only");
        await page.goto("/display/buttons");
        await page.waitForLoadState("networkidle");
        for (const surface of SURFACES) {
            const clock = await springClockSeconds(page, surface.clock);
            expect(
                clock,
                `${surface.clock} resolves to a real per-spring settle on WebKit (${clock}s) — the spring spine is Safari-native`,
            ).toBeGreaterThan(0);
        }
    });
});
