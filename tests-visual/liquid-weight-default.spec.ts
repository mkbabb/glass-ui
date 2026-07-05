// BG.W-LIQUID-WEIGHT-DEFAULT (F5.2) — liquid-weight-default.spec.ts, the BINDING π
// readback (the painted own-surface truth).
//
// proof:motion's LW arm proves the SOURCE (the token is spring-derived + GENERATED, the
// base atoms read it, the .motion-calm opt-out + PRM re-alias exist). THIS spec proves
// the painted RESOLUTION the browser actually computes: the DEFAULT interactive
// transition SPATIAL leg resolves to a spring `linear()` (weight/bounce), a `.motion-calm`
// scope resolves to the flat `--ease-standard` bezier (NO weight), and under
// `prefers-reduced-motion: reduce` BOTH snap to the bezier (the vestibular floor). A
// source-green/render-broken close (the token never resolves to a spring on the real
// cascade, or `.motion-calm` fails to override, or PRM keeps the overshoot) is the exact
// AZ close-class the gestalt bar kills; the live readback is the binding truth.
//
// THE BINDING ARMS:
//   (a) DEFAULT WEIGHT — a bare interactive surface (`.tap-squish` / `.interactive-item`)
//       resolves its SPATIAL `scale` transition-leg timing-function to a spring `linear(…)`
//       (the inversion: the prior default was a flat `--ease-standard` bezier).
//   (b) CALM OPT-OUT — the SAME surface under a `.motion-calm` ancestor resolves that leg
//       to the `--ease-standard` cubic-bezier (the explicit opt-out, no overshoot).
//   (c) PRM SNAP — under emulated `prefers-reduced-motion: reduce` the default surface's
//       spatial leg resolves to the bezier too (the PRM re-alias — no overshoot for
//       vestibular users; the fade/endpoint still confirm the gesture).
//
// The `scale` leg is the LAST transition-property in both `.tap-squish` and
// `.interactive-item`, so it is the LAST entry in the comma-joined resolved
// `transition-timing-function` list — the readback parses that tail.
//
// LOCAL-ONLY (real-browser/CDP dev-box). It LOADS :5199 (the harness auto-spawns +
// reuses the dev server); on a clean CI runner with no Playwright it grace-SKIPs. Captured
// to docs/tranches/BG/audit/visual/W-LIQUID-WEIGHT-DEFAULT-DELTA.md, BOTH modes,
// Chromium + WebKit. The LOAD-BEARING paint gate is the Fable storybook sweep (fableArm).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const SCHEMES = ["light", "dark"] as const;

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(80);
}

// Inject a probe surface carrying the base interactive-atom class, optionally under a
// `.motion-calm` ancestor, and read the RESOLVED timing-function of its `scale` leg (the
// last transition-property → the last function in the comma-joined list). Returns the
// tail function string as the browser computes it against the live /styles cascade.
async function scaleLegTimingFunction(
    page: Page,
    klass: "tap-squish" | "interactive-item",
    calm: boolean,
): Promise<string> {
    return page.evaluate(
        ({ klass, calm }) => {
            const host = document.createElement("div");
            if (calm) host.className = "motion-calm";
            const probe = document.createElement("div");
            probe.className = klass;
            host.appendChild(probe);
            document.body.appendChild(host);
            const tf = getComputedStyle(probe).transitionTimingFunction || "";
            host.remove();
            // Split on top-level commas (the timing-function list); the SPATIAL scale leg
            // is the LAST transition-property, hence the last function.
            const parts: string[] = [];
            let depth = 0;
            let cur = "";
            for (const ch of tf) {
                if (ch === "(") depth++;
                else if (ch === ")") depth--;
                if (ch === "," && depth === 0) {
                    parts.push(cur.trim());
                    cur = "";
                } else cur += ch;
            }
            if (cur.trim()) parts.push(cur.trim());
            return parts[parts.length - 1] ?? tf;
        },
        { klass, calm },
    );
}

for (const scheme of SCHEMES) {
    test.describe(`liquid-weight-default — ${scheme}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);
        });

        for (const klass of ["tap-squish", "interactive-item"] as const) {
            test(`${klass} — DEFAULT spatial leg is a spring linear() (weight)`, async ({
                page,
            }) => {
                const tf = await scaleLegTimingFunction(page, klass, false);
                // The spring register serializes as a `linear(…)` curve (many stops); the
                // pre-inversion default was a flat `cubic-bezier(…)`.
                expect(tf).toContain("linear(");
                expect(tf).not.toContain("cubic-bezier(");
            });

            test(`${klass} — .motion-calm opts OUT to the flat bezier (no weight)`, async ({
                page,
            }) => {
                const tf = await scaleLegTimingFunction(page, klass, true);
                // --ease-standard = cubic-bezier(0.4, 0, 0.2, 1); the calm scope removes
                // the spring overshoot from the spatial leg.
                expect(tf).toContain("cubic-bezier(");
                expect(tf).not.toContain("linear(");
            });
        }

        test("PRM — the default spatial leg snaps to the flat bezier (vestibular floor)", async ({
            page,
        }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.waitForTimeout(60);
            const tf = await scaleLegTimingFunction(page, "tap-squish", false);
            expect(tf).toContain("cubic-bezier(");
            expect(tf).not.toContain("linear(");
            await page.emulateMedia({ reducedMotion: null });
        });
    });
}
