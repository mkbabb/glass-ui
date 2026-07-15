// BI.W-SHADOW-GRAMMAR — shadow-grammar.spec.ts, the π UF-A8/A9 readback (the BINDING
// close; §π/DELTA).
//
// The defect (UF-A8 ss-08 "artifacts on the bottom left corners of these buttons" ·
// UF-A9 ss-26 "the dark CRESCENT past a pill's left end-cap … behind a CAPSULE"): the
// loud CTA punch register (`.btn-punch`, default-ON for `primary-audacious`/
// `gold-audacious`) mounts an inert `.cartoon-cast` child carrying the HARD 0-blur
// `--shadow-cartoon-md` offset stamp (`-3px 3px 0, -5px 5px 0, -7px 7px 0`). On a PILL
// (`border-radius: inherit` = a stadium) the hard directional stamp pokes off the
// bottom-left arc = the lopsided crescent.
//
// THE DEVICE-FREE SOURCE GATE (proof:geometry-grammar Law 4) proves the STRUCTURE — the
// `.btn-punch .cartoon-cast` cast carries a soft-drop re-point, and no `--shadow-cartoon`
// on a stadium host off the card-radius allowlist. THIS SPEC PROVES THE RENDER the
// source arm cannot — by reading the RESOLVED `box-shadow` on the actual painted casts:
//   SG-π1 — the `primary-audacious` / `gold-audacious` pill cast paints a SOFT
//           radius-following drop (a blurred layer, blur ≥ 8px) and carries ZERO hard
//           0-blur down-left offset layers → the crescent is ABSENT, the punch WEIGHT
//           reads (the soft drop, ratified — BD.W-CARTOON-PUNCH survives).
//   SG-π2 — a card-radius `<Card surface="cartoon">` cast STILL carries the hard
//           `--shadow-cartoon` offset stamp (a 0-blur negative-offset-x layer) → the
//           stamp is LEGAL and UNCHANGED under a card silhouette (it tucks under the
//           corner).
//   A/B  — the loud-CTA region is captured (both modes) for the USER-JUDGMENT paired
//           capture (PASS-1 Open Gap 8 — the punch must survive; it reverses a BD
//           register).
//
// BOTH modes, Chromium + real WebKit. It loads :5199 → LIVE_VERIFIED_LOCAL_ONLY
// (tags: ["local"]); CI grace-skips, backstopped by proof:live-verified-ledger over the
// DELTA.

import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/W-SHADOW-GRAMMAR", import.meta.url),
);

// A shadow LAYER (paren-aware; the color function's commas do not split layers).
interface ShadowLayer {
    inset: boolean;
    offX: number;
    offY: number;
    blur: number;
    spread: number;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(120);
}

// Read the `.cartoon-cast` child inside `hostSel`, parse its resolved box-shadow into
// layers, and classify: hard-offset-stamp layers (blur ≈ 0 AND a negative offset-x —
// the down-left cel stamp / the crescent) vs soft-drop layers (a real blur).
async function readCast(page: Page, hostSel: string) {
    return page.evaluate((sel: string) => {
        const splitTop = (s: string): string[] => {
            const out: string[] = [];
            let depth = 0;
            let cur = "";
            for (const ch of s) {
                if (ch === "(") depth++;
                else if (ch === ")") depth--;
                if (ch === "," && depth === 0) {
                    out.push(cur.trim());
                    cur = "";
                } else cur += ch;
            }
            if (cur.trim()) out.push(cur.trim());
            return out;
        };
        const parseLayer = (layer: string) => {
            const inset = /\binset\b/.test(layer);
            // strip color functions so their inner numbers do not leak into the px scan.
            const bare = layer.replace(
                /\b(?:rgba?|hsla?|oklab|oklch|lab|lch|color|color-mix)\([^)]*\)/g,
                "",
            );
            const nums = (bare.match(/-?[\d.]+px/g) || []).map((n) => parseFloat(n));
            return {
                inset,
                offX: nums[0] ?? 0,
                offY: nums[1] ?? 0,
                blur: nums[2] ?? 0,
                spread: nums[3] ?? 0,
            };
        };
        const host = document.querySelector<HTMLElement>(sel);
        if (!host) return null;
        const cast = host.querySelector<HTMLElement>(".cartoon-cast");
        if (!cast) return { present: false, raw: "", layers: [] as ShadowLayer[] };
        const raw = getComputedStyle(cast).boxShadow || "";
        const layers = raw === "none" || !raw ? [] : splitTop(raw).map(parseLayer);
        return { present: true, raw, layers };
    }, hostSel);
}

function hardStampLayers(layers: ShadowLayer[]): ShadowLayer[] {
    // the hard cel offset stamp = a near-0-blur layer offset DOWN-LEFT (negative x).
    return layers.filter((l) => Math.abs(l.blur) < 1.5 && l.offX < -1);
}
function softDropLayers(layers: ShadowLayer[]): ShadowLayer[] {
    // a real diffuse radius-following drop (--shadow-md = 16px blur, --shadow-lg = 20px).
    return layers.filter((l) => l.blur >= 8 && !l.inset);
}

const paired: Record<string, unknown> = {};

test.describe("BI.W-SHADOW-GRAMMAR — the pill crescent is gone; the card stamp legal (π)", () => {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";

        test(`the loud-CTA pill cast reads a SOFT drop (no crescent); the punch weight survives (${mode})`, async ({
            page,
            browserName,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/display/buttons", { waitUntil: "domcontentloaded" });
            await page.waitForSelector('[data-slot="button"][data-variant="primary-audacious"]', {
                timeout: 8000,
            });
            await page.waitForTimeout(250);
            await setDark(page, dark);

            for (const variant of ["primary-audacious", "gold-audacious"] as const) {
                const hostSel = `[data-slot="button"][data-variant="${variant}"]`;
                const r = await readCast(page, hostSel);
                paired[`${variant}-${mode}`] = r;
                expect(r, `${mode} ${variant}: button host renders`).not.toBeNull();
                expect(
                    r!.present && r!.layers.length > 0,
                    `${mode} ${variant}: the loud CTA mounts a .cartoon-cast child with a box-shadow (raw='${r!.raw}')`,
                ).toBe(true);

                const hard = hardStampLayers(r!.layers);
                const soft = softDropLayers(r!.layers);

                // SG-π1 — the crescent is ABSENT: no hard 0-blur down-left offset stamp.
                expect(
                    hard.length,
                    `${mode} ${variant}: the pill cast carries ${hard.length} HARD 0-blur down-left offset layer(s) (the UF-A8/A9 crescent) — must be 0 (the offset stamp is gated OFF the stadium; raw='${r!.raw}')`,
                ).toBe(0);
                // SG-π1 — the punch WEIGHT reads: a soft radius-following drop is present.
                expect(
                    soft.length,
                    `${mode} ${variant}: the pill cast carries no SOFT drop layer — the re-landed punch weight (soft --shadow-lg drop + press-squish + specular) must read (raw='${r!.raw}')`,
                ).toBeGreaterThanOrEqual(1);
            }

            // A/B capture — the loud CTA region for the USER-JUDGMENT paired capture.
            mkdirSync(VISUAL_DIR, { recursive: true });
            const cta = page.locator(
                '[data-slot="button"][data-variant="primary-audacious"]',
            ).first();
            const box = await cta.boundingBox();
            if (box) {
                await page.screenshot({
                    path: `${VISUAL_DIR}/${browserName}_cta-punch_${mode}.png`,
                    clip: {
                        x: Math.max(0, box.x - 24),
                        y: Math.max(0, box.y - 12),
                        width: box.width + 48,
                        height: box.height + 40,
                    },
                });
            }
        });

        test(`the card-radius Card surface="cartoon" keeps the hard offset stamp (legal, unchanged) (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/display/card", { waitUntil: "domcontentloaded" });
            await page.waitForSelector(".cartoon-surface", { timeout: 8000 });
            await page.waitForTimeout(250);
            await setDark(page, dark);

            const r = await readCast(page, ".cartoon-surface");
            paired[`card-cartoon-${mode}`] = r;
            expect(r, `${mode} card: cartoon card renders`).not.toBeNull();
            expect(
                r!.present && r!.layers.length > 0,
                `${mode} card: the cartoon Card mounts a .cartoon-cast child with a box-shadow (raw='${r!.raw}')`,
            ).toBe(true);

            // SG-π2 — the hard offset stamp is UNCHANGED under a card silhouette (legal —
            // it tucks under the corner radius).
            const hard = hardStampLayers(r!.layers);
            expect(
                hard.length,
                `${mode} card: the card-radius cartoon cast must KEEP the hard --shadow-cartoon offset stamp (it tucks under the corner) — found ${hard.length} hard layer(s) (raw='${r!.raw}')`,
            ).toBeGreaterThanOrEqual(1);
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-SHADOW-GRAMMAR-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});
