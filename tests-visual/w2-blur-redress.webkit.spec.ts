// BJ.W2 BLUR REDRESS — the bundled-WebKit STATIC-CASCADE arm for 20e064f1.
//
// WHAT THIS IS (and is NOT). This is NOT Safari, NOT a mounted Vue receiver, NOT
// shipped package CSS. It is an ISOLATED bundled-WebKit cascade probe: Playwright's
// bundled WebKit engine resolving getComputedStyle over
//   (a) `w2-compiled.css` — the demo cascade captured from the live Vite CSSOM by the
//       Chromium arm's capture test (NOT one package entry's graph), and
//   (b) hand-authored, CLASS-ONLY static markup (no component mounts, no behavior):
//       the five calm `.glass-<role>` plates, the `.glass-floating.glass-deep` tier,
//       and a `[data-stage-scrim][data-stage-immersive]` scrim div — the EXACT
//       selectors the drawer/styles.css + glass.css rules target.
//
// WHY A STATIC HARNESS, NOT THE LIVE ROUTE ON WEBKIT: the Playwright-bundled WebKit
// build crashes its content process during the demo's eager shell boot (the recorded
// W1-lane finding). backdrop-filter radius is pure CSS and independent of that JS
// shell, so this arm probes the captured cascade over the real receiver SELECTORS.
//
// This spec runs in two DPR projects (webkit @1dppx + webkit-2dppx @2dppx) so the
// overlay every-DPR ruling is proven on WebKit at both densities; the 2dppx project
// also carries the mutation bite.

import { test, expect } from "@playwright/test";
import type { Page, TestInfo } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EVIDENCE_DIR = fileURLToPath(
    new URL("../docs/tranches/BJ/evidence/W2-BLUR-REDRESS", import.meta.url),
);
const COMPILED_PATH = `${EVIDENCE_DIR}/w2-compiled.css`;

const EPS = 0.3;
const CALM = {
    wash: { blur: 1, sat: 1.4 },
    quiet: { blur: 7, sat: 1.4 },
    resting: { blur: 7, sat: 1.4 },
    floating: { blur: 11, sat: 1.6 },
    overlay: { blur: 11, sat: 1.6 },
} as const;
const STANDARD_MAGNITUDES = [1, 7, 11];
const IMMERSIVE_BASE_BLUR = 14;

interface FilterReadout {
    raw: string;
    blurPx: number | null;
    saturate: number | null;
    hasSaturate: boolean;
    hasBrightness: boolean;
}
function parseFilter(str: string): FilterReadout {
    const blur = str.match(/blur\(\s*([\d.]+)px\s*\)/i);
    const sat = str.match(/saturate\(\s*([\d.]+)\s*\)/i);
    return {
        raw: str,
        blurPx: blur ? parseFloat(blur[1]) : null,
        saturate: sat ? parseFloat(sat[1]) : null,
        hasSaturate: /saturate\(/i.test(str),
        hasBrightness: /brightness\(/i.test(str),
    };
}

// Class-only markup over the captured cascade. The @layer theme,base,components,
// utilities order + every rule come from w2-compiled.css.
function harness(css: string): string {
    return `
<style>${css}</style>
<div style="padding:24px;display:flex;gap:12px;flex-wrap:wrap;background:linear-gradient(135deg,#3a1d6e,#0d6e6e,#c83a5a)">
  <div id="p-wash" class="glass-wash" style="width:110px;height:110px;border-radius:16px"></div>
  <div id="p-quiet" class="glass-quiet" style="width:110px;height:110px;border-radius:16px"></div>
  <div id="p-resting" class="glass-resting" style="width:110px;height:110px;border-radius:16px"></div>
  <div id="p-floating" class="glass-floating" style="width:110px;height:110px;border-radius:16px"></div>
  <div id="p-overlay" class="glass-overlay" style="width:110px;height:110px;border-radius:16px"></div>
  <div id="p-deep" class="glass-floating glass-deep" style="width:110px;height:110px;border-radius:16px"></div>
  <!-- the private immersive stage scrim — the EXACT selector drawer/styles.css targets -->
  <div id="scrim" data-stage-scrim data-stage-immersive style="width:220px;height:110px"></div>
</div>`;
}

async function settleFrames(page: Page): Promise<void> {
    await page.evaluate(
        () =>
            new Promise<void>((res) =>
                requestAnimationFrame(() => requestAnimationFrame(() => res())),
            ),
    );
}

test.describe("W2 blur redress — bundled-WebKit static-cascade (captured dev CSS, class-only markup)", () => {
    test("bundled WebKit resolves the ruled computed blur values over the W2 cascade (calm ladder, overlay every-DPR, immersive scrim, deep-separate)", async ({
        page,
    }, info) => {
        expect(
            existsSync(COMPILED_PATH),
            `w2-compiled.css missing — run the chromium capture test first (${COMPILED_PATH})`,
        ).toBe(true);
        const css = readFileSync(COMPILED_PATH, "utf8");
        expect(css, "captured cascade carries the immersive scrim rule").toContain(
            "--stage-immersive-blur",
        );

        await page.setContent(harness(css), { waitUntil: "load" });
        // Readiness — wait until the overlay plate has resolved a non-empty filter.
        await page.waitForFunction(() => {
            const el = document.getElementById("p-overlay");
            if (!el) return false;
            const cs = getComputedStyle(el);
            const v =
                cs.backdropFilter ||
                (cs as unknown as { webkitBackdropFilter: string })
                    .webkitBackdropFilter ||
                "";
            return v.length > 0 && v !== "none";
        });

        const probe = await page.evaluate(() => {
            const rawOf = (id: string): string => {
                const el = document.getElementById(id);
                if (!el) return "(MISSING)";
                const cs = getComputedStyle(el);
                return (
                    cs.backdropFilter ||
                    (cs as unknown as { webkitBackdropFilter: string })
                        .webkitBackdropFilter ||
                    ""
                );
            };
            const radiusOf = (s: string): number | null => {
                const m = s.match(/blur\(\s*([\d.]+)px\s*\)/i);
                return m ? parseFloat(m[1]) : null;
            };
            // Scrim response to --glass-level (inline override on the real element).
            const scrim = document.getElementById("scrim")!;
            const scrimAt = (lvl: string): number | null => {
                scrim.style.setProperty("--glass-level", lvl);
                void scrim.offsetHeight;
                const r = radiusOf(rawOf("scrim"));
                scrim.style.removeProperty("--glass-level");
                return r;
            };
            const scrimStageT = (t: string): number | null => {
                scrim.style.setProperty("--stage-t", t);
                void scrim.offsetHeight;
                const r = radiusOf(rawOf("scrim"));
                scrim.style.removeProperty("--stage-t");
                return r;
            };
            return {
                devicePixelRatio: window.devicePixelRatio,
                calm: {
                    wash: rawOf("p-wash"),
                    quiet: rawOf("p-quiet"),
                    resting: rawOf("p-resting"),
                    floating: rawOf("p-floating"),
                    overlay: rawOf("p-overlay"),
                    deep: rawOf("p-deep"),
                },
                scrim: {
                    base: rawOf("scrim"),
                    level1: scrimAt("1"),
                    level03: scrimAt("0.3"),
                    level0: scrimAt("0"),
                    stageT0: scrimStageT("0"),
                    stageT1: scrimStageT("1"),
                },
            };
        });

        const ledger: Record<string, unknown> = {
            engine: info.project.name,
            target: "20e064f1 — W2 C2 producer-side blur redress",
            note:
                "Bundled-WebKit getComputedStyle over w2-compiled.css (captured DEVELOPMENT cascade) + class-only static markup. NOT Safari, NOT shipped CSS, NO mounted Vue receiver. Cross-engine cascade corroboration only.",
            devicePixelRatio: probe.devicePixelRatio,
            proofs: probe,
        };

        // ── calm ladder — three magnitudes {1,7,11} + current provisional saturates ──
        for (const [role, spec] of Object.entries(CALM)) {
            const f = parseFilter(probe.calm[role as keyof typeof probe.calm]);
            expect(f.blurPx, `${role} resolves a blur (${f.raw})`).not.toBeNull();
            expect(f.blurPx!, `${role} blur == ${spec.blur}px`).toBeCloseTo(spec.blur, 1);
            expect(f.saturate, `${role} carries a saturate (${f.raw})`).not.toBeNull();
            expect(f.saturate!, `${role} saturate == ${spec.sat} (provisional)`).toBeCloseTo(
                spec.sat,
                2,
            );
        }
        const distinct = [
            ...new Set(
                Object.keys(CALM).map((r) =>
                    Math.round(parseFilter(probe.calm[r as keyof typeof probe.calm]).blurPx!),
                ),
            ),
        ].sort((a, b) => a - b);
        expect(distinct, "calm magnitudes exactly {1,7,11}").toEqual(STANDARD_MAGNITUDES);

        // ── deep continuum separate ──────────────────────────────────────────────
        const deep = parseFilter(probe.calm.deep);
        const floating = parseFilter(probe.calm.floating);
        expect(deep.blurPx!, `deep ${deep.blurPx} > floating ${floating.blurPx}`).toBeGreaterThan(
            floating.blurPx! + EPS,
        );
        expect(deep.blurPx!, "deep ≤ 16px ceiling").toBeLessThanOrEqual(16 + EPS);
        expect(deep.saturate!, "deep saturate > 1.6").toBeGreaterThan(1.6);
        expect(deep.saturate!, "deep saturate ≤ 1.8").toBeLessThanOrEqual(1.8 + EPS);

        // ── overlay EVERY-DPR — 11px at this project's DPR (1 or 2) ───────────────
        const overlay = parseFilter(probe.calm.overlay);
        expect(
            overlay.blurPx!,
            `overlay == 11px at DPR ${probe.devicePixelRatio} (killed 17px arm gone)`,
        ).toBeCloseTo(11, 1);

        // ── immersive scrim — 14px × level, no --stage-t coupling, no saturation ──
        const scrim = parseFilter(probe.scrim.base);
        expect(probe.scrim.level1, "scrim 14px at --glass-level:1").toBeCloseTo(
            IMMERSIVE_BASE_BLUR,
            1,
        );
        expect(probe.scrim.level03, "scrim 4.2px at --glass-level:0.3").toBeCloseTo(4.2, 1);
        expect(probe.scrim.level0, "scrim 0px at --glass-level:0").toBeCloseTo(0, 1);
        expect(probe.scrim.stageT0, "scrim radius holds 14px at --stage-t:0").toBeCloseTo(
            IMMERSIVE_BASE_BLUR,
            1,
        );
        expect(probe.scrim.stageT1, "scrim radius holds 14px at --stage-t:1").toBeCloseTo(
            IMMERSIVE_BASE_BLUR,
            1,
        );
        expect(scrim.hasSaturate, "scrim carries NO saturate term").toBe(false);
        expect(scrim.hasBrightness, "scrim carries NO brightness term").toBe(false);

        // ── MUTATION BITE (2dppx project only) — restoring the min-resolution 17px
        //    writer flips the overlay to 17 at 2dppx, proving the ==11 assertion bites.
        if (probe.devicePixelRatio >= 2 - EPS) {
            await page.addStyleTag({
                content:
                    "@media (min-resolution: 2dppx){:root{--glass-blur-overlay-radius:17px}}",
            });
            await settleFrames(page);
            const mutated = await page.evaluate(() => {
                const el = document.getElementById("p-overlay")!;
                const cs = getComputedStyle(el);
                const v =
                    cs.backdropFilter ||
                    (cs as unknown as { webkitBackdropFilter: string })
                        .webkitBackdropFilter ||
                    "";
                const m = v.match(/blur\(\s*([\d.]+)px\s*\)/i);
                return m ? parseFloat(m[1]) : NaN;
            });
            (ledger as { mutationBite?: unknown }).mutationBite = {
                shippedOverlayPx: overlay.blurPx,
                mutationRestored17Px: mutated,
                bites: Math.abs(mutated - 17) <= 1 && Math.abs(mutated - 11) > 1,
            };
            expect(
                mutated,
                "mutation-bite: 2dppx→17px writer flips overlay to 17 on WebKit",
            ).toBeCloseTo(17, 1);
            expect(mutated, "mutation-bite genuinely differs from shipped 11px").not.toBeCloseTo(
                11,
                1,
            );
        }

        // Screenshots at both mandated viewports.
        mkdirSync(EVIDENCE_DIR, { recursive: true });
        for (const vp of [
            { name: "desktop", width: 1440, height: 900 },
            { name: "mobile", width: 390, height: 844 },
        ]) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await settleFrames(page);
            await page.screenshot({
                path: `${EVIDENCE_DIR}/${info.project.name}--cascade-harness-${vp.name}.png`,
                fullPage: false,
            });
        }

        ledger.finishedAt = new Date().toISOString();
        writeFileSync(
            `${EVIDENCE_DIR}/computed-${info.project.name}.json`,
            JSON.stringify(ledger, null, 2),
        );
    });
});
