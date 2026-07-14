// BG.W-DISCLOSURE-ROTATE — disclosure-rotate.spec.ts, the BINDING π readback.
//
// proof:motion's DR arm proves the SOURCE (DR1 the ONE `transition-disclosure` register +
// the three carets re-pointed onto it; DR2 the widened Tailwind-TEMPLATE detector, device-
// free). THIS spec proves the painted RENDER the user reads: the disclosure chevron across
// Accordion + Select + Configurator SETTLES on the SAME clock + curve — none SNAP.
//
// THE BINDING ARMS:
//   (a) COVERS-ROTATE / NON-ZERO — every caret's computed transition covers the `rotate`
//       property with a non-zero duration. The HEAD Configurator bug (a `transition:
//       transform` that never covered the `rotate` Tailwind writes → the chevron SNAPPED)
//       reads here as transitionProperty ⊉ rotate — the config-level "snap" this catches.
//   (b) SAME REGISTER — the three carets resolve the SAME transition-duration AND the SAME
//       timing-function (the ONE `transition-disclosure` register, substitution over
//       re-declaration — a divergent clock/curve reds).
//   (c) SETTLES-NOT-SNAPS — a live toggle drives the caret's computed `rotate` through
//       INTERMEDIATE angles (strictly between the 0°/180° endpoints) rather than jumping in
//       one frame — the binding "it animates" truth the source alone cannot see.
//   PRM — `--ease-cartoon-punch` self-re-aliases to the no-overshoot `--ease-standard` under
//       reduce (scheme-motion.css), so the caret still flips (no vestibular concern on a
//       tiny rotation); this spec runs the fine-pointer default (motion on).
//
// LOCAL-ONLY (real browser + demo). It LOADS :5199 (the harness auto-spawns + reuses the
// dev server); on a clean CI runner with no Playwright it grace-SKIPs. Captured to
// docs/tranches/BG/audit/visual, BOTH modes. The binding live capture is the ORCHESTRATOR's.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BG/audit/visual");

const SCHEMES = ["light", "dark"] as const;

// The three disclosure surfaces + how to reach each caret's rotating chevron.
const SURFACES = [
    {
        name: "accordion",
        route: "/containers/accordion",
        trigger: '[data-slot="accordion-trigger"]',
        caret: '[data-slot="accordion-trigger"] svg',
    },
    {
        name: "select",
        route: "/forms/select",
        trigger: '[data-slot="select-trigger"]',
        caret: '[data-slot="select-trigger"] svg',
    },
    {
        name: "configurator",
        route: "/containers/configurator",
        trigger: '[data-slot="configurator-layer-trigger"]',
        caret: '[data-slot="configurator-layer-trigger"] svg',
    },
] as const;

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** The caret's computed transition config — the property list, the settle clock, the curve. */
async function transitionConfig(caret: Locator): Promise<{
    property: string;
    durationMs: number;
    timing: string;
}> {
    return caret.evaluate((el) => {
        const cs = getComputedStyle(el);
        const durationMs = (cs.transitionDuration || "")
            .split(",")
            .map((d) => parseFloat(d) * (d.includes("ms") ? 1 : 1000))
            .reduce((a, b) => Math.max(a, b), 0);
        return {
            property: cs.transitionProperty || "",
            durationMs,
            timing: cs.transitionTimingFunction || "",
        };
    });
}

/** Sample the caret's computed `rotate` over ~14 rAF frames while a toggle runs. */
async function sampleRotateThroughToggle(page: Page, trigger: Locator, caret: Locator): Promise<number[]> {
    // Start the sampler, then fire the toggle — capture the in-flight angles.
    const samplerHandle = caret.evaluate((el) => {
        const samples: number[] = [];
        let frames = 0;
        return new Promise<number[]>((done) => {
            const tick = () => {
                const r = getComputedStyle(el).rotate || "none";
                const m = r.match(/(-?\d+(?:\.\d+)?)deg/);
                samples.push(m ? Math.abs(parseFloat(m[1])) : 0);
                if (++frames >= 26) done(samples);
                else requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    });
    await page.waitForTimeout(16);
    await trigger.click({ trial: false }).catch(() => {});
    return samplerHandle;
}

for (const scheme of SCHEMES) {
    test(`disclosure-rotate — ONE register, none snap (${scheme})`, async ({ page }, testInfo) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        const configs: Record<string, { property: string; durationMs: number; timing: string }> = {};

        for (const s of SURFACES) {
            await page.goto(s.route);
            await setScheme(page, scheme);
            const caret = page.locator(s.caret).first();
            const trigger = page.locator(s.trigger).first();
            const present = await caret.count();
            if (present === 0) {
                test.skip(true, `no ${s.name} disclosure caret on ${s.route} at HEAD`);
                return;
            }
            await caret.waitFor({ state: "attached" });

            // (a) COVERS-ROTATE / NON-ZERO — the caret transitions `rotate` with a real clock
            //     (the HEAD `transition: transform` snap reads as property ⊉ rotate).
            const cfg = await transitionConfig(caret);
            configs[s.name] = cfg;
            expect(cfg.property, `${s.name} caret must transition the 'rotate' property (a 'transform'-only transition never animates the chevron flip — the Configurator snap bug)`).toContain("rotate");
            expect(cfg.durationMs, `${s.name} caret transition duration must be non-zero (a 0ms clock snaps)`).toBeGreaterThan(50);

            // (c) SETTLES-NOT-SNAPS — the live toggle drives the caret through intermediate angles.
            const samples = await sampleRotateThroughToggle(page, trigger, caret);
            const distinct = new Set(samples.map((v) => Math.round(v))).size;
            const intermediate = samples.some((v) => v > 5 && v < 175);
            expect(
                distinct > 2 || intermediate,
                `${s.name} caret must SETTLE through intermediate angles on toggle (samples ${JSON.stringify(samples.slice(0, 10))}) — a one-frame jump between 0°/180° is a snap`,
            ).toBeTruthy();

            await page.keyboard.press("Escape").catch(() => {});
            await page.screenshot({
                path: resolve(VISUAL_DIR, `disclosure-rotate-${s.name}-${scheme}.png`),
            }).catch(() => {});
        }

        // (b) SAME REGISTER — the three carets resolve the SAME clock + curve.
        const present = SURFACES.map((s) => configs[s.name]).filter(Boolean);
        if (present.length >= 2) {
            const [ref, ...rest] = present;
            for (const c of rest) {
                expect(Math.abs(c.durationMs - ref.durationMs), `all disclosure carets must share ONE settle clock (${JSON.stringify(present.map((p) => p.durationMs))})`).toBeLessThan(10);
                expect(c.timing, `all disclosure carets must share ONE arrival curve (the transition-disclosure register)`).toBe(ref.timing);
            }
        }

        await testInfo.attach("disclosure-rotate-configs", {
            body: JSON.stringify(configs, null, 2),
            contentType: "application/json",
        });
    });
}
