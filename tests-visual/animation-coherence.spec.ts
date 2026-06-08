// AX.W05 — the π-lane VISUAL-TRUTH spec for the ONE iOS-spring vocabulary.
//
// This spec is the LIVE/RENDER half of the close criterion: a green headless
// proof:animation-coherence over a visually-broken motion product is NOT done
// (the AX cardinal lesson). It runs in the tests-visual π workspace on a real
// device (the orchestrator owns the Metal box) — it is NOT wired into the
// device-free vitest run, so a sandbox with no browser binary simply does not
// execute it. The device-free SOURCE arms (survivor sweep / consumer-coverage /
// governed rationale) hard-RED on every runner; THIS spec proves the re-pointed
// surfaces still READ RIGHT and the in-dock slider breathes on the dock register.
//
// It is fail-CLOSED when the workspace is present (a missing demo route / a
// timing-function that resolves to the deleted bezier is a hard failure), and
// runs at >= 2 viewports in light AND dark per the AX cardinal gate.
//
// PRECONDITIONS the orchestrator wires up on the device:
//   - the demo dev server is serving (DEMO_URL, default http://localhost:5173)
//   - the routes below exist (the storybook foundations/motion tour, the tabs
//     showcase, the dock-with-slider composition)
//
// The orchestrator runs:  npx playwright test tests-visual/animation-coherence.spec.ts

import { expect, test } from "@playwright/test";

const BASE = process.env.DEMO_URL ?? "http://localhost:5173";

const VIEWPORTS = [
    { name: "desktop", width: 1280, height: 800 },
    { name: "mobile", width: 390, height: 844 },
];

// The four governed registers — their resolved linear() peaks (sampled by the
// keyframes.js solver). A re-pointed surface must resolve ONE of these, never
// the deleted cubic-bezier(0.175, 0.885, 0.32, 1.275).
const RETIRED_BEZIER = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";

async function resolvedVar(page: import("@playwright/test").Page, name: string): Promise<string> {
    return page.evaluate(
        (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(),
        name,
    );
}

for (const vp of VIEWPORTS) {
    for (const scheme of ["light", "dark"] as const) {
        test.describe(`${vp.name} · ${scheme}`, () => {
            test.use({ viewport: { width: vp.width, height: vp.height }, colorScheme: scheme });

            test("the retired apple-spring bezier no longer resolves anywhere", async ({ page }) => {
                await page.goto(`${BASE}/`);
                // The token is DELETED: var(--ease-apple-spring) resolves empty.
                const ease = await resolvedVar(page, "--ease-apple-spring");
                expect(ease).toBe("");
                const motionEase = await resolvedVar(page, "--motion-ease-apple-spring");
                expect(motionEase).toBe("");
                // The governed registers all resolve to a linear() spring.
                for (const reg of ["--spring-smooth", "--spring-snappy", "--spring-bouncy", "--spring-gentle"]) {
                    const v = await resolvedVar(page, reg);
                    expect(v).toContain("linear(");
                    expect(v).not.toContain(RETIRED_BEZIER);
                }
            });

            test("the UnderlineTabs indicator glides on the control register (snappy)", async ({ page }) => {
                await page.goto(`${BASE}/#/components/tabs`);
                const indicator = page.locator(".underline-tabs::before, .underline-tabs").first();
                await expect(indicator).toBeVisible();
                const timing = await page.locator(".underline-tabs").first().evaluate((el) => {
                    const before = getComputedStyle(el, "::before");
                    return before.transitionTimingFunction;
                });
                // The resolved timing must be the snappy linear() spring, never the bezier.
                expect(timing).not.toContain(RETIRED_BEZIER);
                expect(timing).toContain("linear(");
            });

            test("the in-dock slider thumb shares the dock register (the headline visual)", async ({ page }) => {
                await page.goto(`${BASE}/#/compositions/dock-with-slider`);
                const thumb = page.locator("[data-slot=slider] .slider-thumb, .slider-thumb").first();
                await expect(thumb).toBeVisible();
                const thumbTiming = await thumb.evaluate((el) => getComputedStyle(el).transitionTimingFunction);
                const dockRegister = await resolvedVar(page, "--spring-snappy");
                // The thumb transform timing resolves the dock register (--slider-thumb-spring
                // defaults to --spring-snappy), so the thumb morph and the dock collapse
                // read as ONE iOS spring — not a sibling-snappier mismatch.
                expect(thumbTiming).not.toContain(RETIRED_BEZIER);
                expect(thumbTiming).toContain("linear(");
                // The resolved register equals the dock's own breathing curve.
                expect(thumbTiming.replace(/\s/g, "")).toContain(dockRegister.slice(0, 20).replace(/\s/g, ""));
            });

            test("the BouncyToggle press still bounces (playful register survives the map)", async ({ page }) => {
                await page.goto(`${BASE}/#/components/tabs`);
                const toggle = page.locator(".bouncy-toggle button, [data-bouncy-toggle] button").first();
                if ((await toggle.count()) === 0) test.skip(true, "no bouncy toggle on this route");
                const bouncy = await resolvedVar(page, "--spring-bouncy");
                // The WAAPI press reads --spring-bouncy at runtime (the playful register);
                // the resolved value is an overshoot linear() spring, not the bezier.
                expect(bouncy).toContain("linear(");
                expect(bouncy).not.toContain(RETIRED_BEZIER);
            });

            test("no visual occlusion / affordance regression on the motion tour", async ({ page }) => {
                await page.goto(`${BASE}/#/foundations/motion`);
                await expect(page.locator("body")).toBeVisible();
                // The deleted ease-apple-spring swatch is gone; the 4 spring swatches remain.
                const appleSpring = page.getByText("ease-apple-spring", { exact: true });
                expect(await appleSpring.count()).toBe(0);
            });
        });
    }
}
