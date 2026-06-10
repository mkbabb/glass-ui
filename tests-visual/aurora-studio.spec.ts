// AY.W-AUR-STUDIO — proof:aurora-studio, the π-lane STUDIO-REPAIR device gate.
//
// The aurora studio's default control surface had a third of its dropdowns DEAD to every
// user gesture (the `:is-open="false"` controlled-shut footgun), the atoms surface clobbered
// the per-preset look on first touch, and the served-app skip/fail discrimination keyed on
// canvas-presence alone (a foreign server clobbered status:pass → status:skipped). This spec
// is the live-GPU binding truth for the repairs:
//
//   (2) SELECTS-OPEN LIVE — the medium select trigger opens (≥1 [role=option] mounts,
//       aria-expanded→true); picking a TEXTURED medium changes the canvas above the drift
//       floor AND makes the Texture slider reachable (the headline dead-atom fix).
//   (4) ATOMS-SEED-FROM-PRESET — select a distinctive preset (Van Gogh); the medium atom
//       reads "Van Gogh" (the atoms surface seeded FROM the live preset, NOT the wispy-sky
//       default); touch ONE atom (nudge energy) and the canvas stays WITHIN drift of the
//       preset (the per-preset look SURVIVES — not the 255.7 clobber-delta).
//   (5) SERVED-APP SENTINEL CANARY — the sentinel PASSES on the real demo (the marker is
//       present) and THROWS (fail-closed) on a planted wrong-root fixture (a foreign app).
//
// READBACK MECHANISM (AX.W00 precedent): a composited canvas screenshot decoded with pngjs.
// Real GPU (darwin→Metal) paints; the served-app sentinel fails-not-skips on a foreign app.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";
import { assertServedDemoAurora, DEMO_TITLE } from "./served-app-sentinel.ts";

const INTERIOR_INSET = 0.2;
const SETTLE_MS = 700;
// The atom's mean-channel delta must clear the ambient drift baseline by this margin (the
// same scale the atoms-render spec uses).
const CHANGE_FLOOR = 8;
// The seed-from-preset round-trip: a one-step energy nudge must stay WITHIN this band of the
// preset (the per-preset look survives — NOT the ~255 clobber-delta a default-atoms takeover
// produced). Generous enough for one energy step's legitimate refinement, far below clobber.
const SURVIVE_DRIFT_MAX = 60;

test.setTimeout(240_000);

async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

function meanInteriorDelta(a: PNG, b: PNG, inset: number): number {
    const w = Math.min(a.width, b.width);
    const h = Math.min(a.height, b.height);
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let sum = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const ia = (y * a.width + x) * 4;
            const ib = (y * b.width + x) * 4;
            sum +=
                Math.abs(a.data[ia]! - b.data[ib]!) +
                Math.abs(a.data[ia + 1]! - b.data[ib + 1]!) +
                Math.abs(a.data[ia + 2]! - b.data[ib + 2]!);
            n++;
        }
    }
    return n === 0 ? 0 : sum / n;
}

/** Open the medium select + click an option by its Title-Case label. */
async function pickMedium(page: Page, label: string): Promise<void> {
    const trigger = page.locator(`[data-atom="medium"] [role="combobox"]`).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await page
        .locator('[role="option"]')
        .filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) })
        .first()
        .click();
    await page.waitForTimeout(SETTLE_MS);
}

test.describe("aurora-studio (π lane — the studio-repair device gate, fail-CLOSED)", () => {
    // ── Clause 2: the dead selects OPEN + bite; the Texture slider becomes reachable. ──
    test("the medium select opens, picking a textured medium changes the canvas + reveals Texture", async ({
        page,
    }: {
        page: Page;
    }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(PI_TARGETS.aurora.path);
        await assertServedDemoAurora(page);

        const canvas = page.locator("canvas.aurora-canvas").first();
        await canvas.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(SETTLE_MS);

        // The medium trigger opens (was controlled-shut forever at HEAD).
        const trigger = page.locator(`[data-atom="medium"] [role="combobox"]`).first();
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        const options = page.locator('[role="option"]');
        await expect(
            options.first(),
            "the medium select did not open — zero [role=option] mounted (the dead-select footgun is live)",
        ).toBeVisible({ timeout: 5_000 });
        expect(
            await options.count(),
            "the medium select opened but mounted no options",
        ).toBeGreaterThanOrEqual(1);
        await expect(trigger, "the medium trigger aria-expanded stayed false").toHaveAttribute(
            "aria-expanded",
            "true",
        );

        // Pick a TEXTURED medium (Oil) — the canvas changes + the Texture slider appears.
        const before = await grab(canvas);
        await options.filter({ hasText: /^\s*Oil\s*$/ }).first().click();
        await page.waitForTimeout(SETTLE_MS);
        const after = await grab(canvas);
        const delta = meanInteriorDelta(before, after, INTERIOR_INSET);
        expect(
            delta,
            `picking the Oil medium did not change the canvas (Δ ${delta.toFixed(2)} ≤ floor ${CHANGE_FLOOR}) — the select is dead chrome`,
        ).toBeGreaterThan(CHANGE_FLOOR);

        // The Texture slider is reachable ONLY via a textured medium (v-if=isTextured).
        await expect(
            page.locator('[data-atom="texture"]'),
            "the Texture slider is unreachable after a textured-medium pick (the v-if gate never opened — the dead select kept it hidden)",
        ).toBeVisible({ timeout: 5_000 });
    });

    // ── Clause 4: the atoms surface seeds FROM the active preset (no first-touch clobber). ──
    test("selecting Van Gogh seeds the medium atom + the look survives a one-atom touch", async ({
        page,
    }: {
        page: Page;
    }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(PI_TARGETS.aurora.path);
        await assertServedDemoAurora(page);

        const canvas = page.locator("canvas.aurora-canvas").first();
        await canvas.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(SETTLE_MS);

        // Select the distinctive Van Gogh preset via the picker (sets the full hero config).
        await page.locator(`button[aria-pressed]`, { hasText: "Van Gogh" }).first().click();
        await page.waitForTimeout(SETTLE_MS);

        // The medium atom READS the preset's medium (the atoms surface is a TRUE projection,
        // not the wispy-sky default — at HEAD the atom read "Smooth" regardless of preset).
        const trigger = page.locator(`[data-atom="medium"] [role="combobox"]`).first();
        await expect(
            trigger,
            "the medium atom did not seed from the Van Gogh preset (it read a fixed default, not the live preset)",
        ).toHaveText(/Van Gogh/, { timeout: 5_000 });

        // The per-preset look BEFORE the atom touch.
        await page.waitForTimeout(SETTLE_MS);
        const presetFrame = await grab(canvas);

        // Nudge ONE atom by one step (the energy slider) — at HEAD this clobbered the WHOLE
        // config to the atoms-default resolution (delta 255.7). The seed-from-preset fix makes
        // it REFINE Van Gogh, so the canvas stays within drift of the preset. The nudge is a
        // small POINTER drag (NOT keyboard ArrowRight — the demo binds a global ArrowRight
        // preset-cycle shortcut that would fire on the focused non-input slider thumb).
        const energyThumb = page.locator(`[data-atom="colorEnergy"] [role="slider"]`).first();
        await energyThumb.scrollIntoViewIfNeeded();
        const tb = await energyThumb.boundingBox();
        if (!tb) throw new Error("the colorEnergy slider thumb has no bounding box");
        await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2);
        await page.mouse.down();
        await page.mouse.move(tb.x + tb.width / 2 + 25, tb.y + tb.height / 2, { steps: 5 });
        await page.mouse.up();
        await page.waitForTimeout(SETTLE_MS);

        // The medium atom must STILL read Van Gogh (the touch refined, not clobbered to a
        // different medium — the structural divergence the seed-from-preset fix closes).
        await expect(
            trigger,
            "a one-atom energy touch FLIPPED the medium atom away from Van Gogh — the per-preset config was clobbered",
        ).toHaveText(/Van Gogh/, { timeout: 5_000 });

        const afterTouch = await grab(canvas);

        const delta = meanInteriorDelta(presetFrame, afterTouch, INTERIOR_INSET);
        expect(
            delta,
            `the first atom touch CLOBBERED the Van Gogh look (Δ ${delta.toFixed(2)} > ${SURVIVE_DRIFT_MAX}) — the atoms surface discarded the per-preset config instead of refining it`,
        ).toBeLessThanOrEqual(SURVIVE_DRIFT_MAX);
    });

    // ── Clause 5: the served-app sentinel CANARY — passes on the demo, throws on a wrong app. ──
    test("the served-app sentinel passes on the real demo and FAILS-CLOSED on a foreign app", async ({
        page,
    }: {
        page: Page;
    }) => {
        await page.goto(PI_TARGETS.aurora.path);
        // POSITIVE arm: the real demo aurora surface — the sentinel must NOT throw.
        await assertServedDemoAurora(page);

        // NEGATIVE arm (the born-RED→GREEN detector): plant a wrong-root fixture (a foreign
        // app — no [data-aurora-atoms-surface] marker, a different title). The sentinel MUST
        // THROW (fail-closed), NOT skip. A canvas-presence-only liveness would silently
        // attach to this and SKIP — the §2a clobber.
        await page.setContent(
            `<!doctype html><html><head><title>Some Other App</title></head>` +
                `<body><h1>not the glass-ui demo</h1></body></html>`,
        );
        let threw = false;
        let message = "";
        try {
            await assertServedDemoAurora(page);
        } catch (e) {
            threw = true;
            message = e instanceof Error ? e.message : String(e);
        }
        expect(
            threw,
            "the served-app sentinel did NOT fail-closed on a foreign app — a wrong app on the port would clobber status:pass → status:skipped (the §2a hole is open)",
        ).toBe(true);
        expect(
            message,
            `the sentinel threw but with an unexpected message: ${message}`,
        ).toContain("fail-closed");
        // And it names the demo title it expected (the diagnostic signal).
        expect(message).toContain(DEMO_TITLE);
    });
});
