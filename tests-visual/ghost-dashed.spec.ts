// BC.W-GHOST-DASHED — ghost-dashed.spec.ts, the BINDING π readback (the captured painted
// truth). proof:ghost-dashed proves the SOURCE (the @utility ghost-slot recipe + the 6
// collapsed forks + the ghost-iff-empty empty-states framing + the rounded witnesses);
// THIS spec proves the RENDER — the live getComputedStyle readback, never the source diff
// alone (the AZ source-green/visually-broken close-class this bar exists to kill).
//
// THE BINDING ARMS (both modes; the spec reads the live demo cascade so the ghost-slot
// recipe + the semantic radii resolve):
//
//   (a) THE GHOST-SLOT REGISTER — a mounted `.ghost-slot` element resolves
//       border-style: dashed, border-radius == --radius-card (16px), a WARM dashed
//       border-color (OKLab chroma > 0 — not a grey), and a TRANSLUCENT host (bg α < 1 —
//       reads "empty," not a flat opaque slab). In BOTH modes.
//   (b) THE RADIUS MATCH — the ghost-slot's resolved radius equals the live --radius-card
//       (the single ghost radius is the semantic card radius, not an ad-hoc value).
//   (c) THE ROUNDED WITNESSES — a mounted `.rounded-card` plate resolves a non-zero radius
//       == --radius-card; a `.rounded-panel` plate resolves a non-zero radius ==
//       --radius-panel (the configurator clip / the home tiles read a semantic radius,
//       never a square corner).
//
// At ≥2 viewports. Fail-CLOSED: a solid/none border-style, a grey dashed (chroma 0), an
// opaque host (α==1), or a square radius (0px) reds the readback, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual/", import.meta.url),
);

const HOST_ROUTE = "/foundations/radii";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// ── OKLab plumbing (sRGB → OKLab chroma; the perceptual chroma the eye reads) ─────────────
function parseRgbA(str: string): { r: number; g: number; b: number; a: number } | null {
    let m = str.match(/rgba?\(([^)]+)\)/);
    if (m) {
        const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
        return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
    }
    return null;
}
function rgbChroma(r: number, g: number, b: number): number {
    const lin = (c: number) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const lr = lin(r);
    const lg = lin(g);
    const lb = lin(b);
    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const mm = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    const a = 1.9779984951 * l - 2.428592205 * mm + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * mm - 0.808675766 * s;
    return Math.hypot(a, bb);
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(120);
}

/** Resolve a length token (e.g. --radius-card) to its computed px on the live cascade. */
async function resolveRadiusToken(page: Page, token: string): Promise<number> {
    return page.evaluate((t) => {
        const p = document.createElement("div");
        p.style.cssText = `position:fixed;left:-9999px;width:100px;height:100px;border-radius:var(${t});`;
        document.body.appendChild(p);
        const r = parseFloat(getComputedStyle(p).borderTopLeftRadius) || 0;
        p.remove();
        return r;
    }, token);
}

/** Mount a `.ghost-slot` element and read its painted border/radius/host. */
async function readGhostSlot(
    page: Page,
): Promise<{ borderStyle: string; radius: number; borderColor: string; bg: string }> {
    return page.evaluate(() => {
        const el = document.createElement("div");
        el.className = "ghost-slot";
        el.style.cssText =
            "position:fixed;left:0;top:0;width:200px;height:100px;z-index:99999;padding:16px;";
        document.body.appendChild(el);
        void el.offsetHeight;
        const cs = getComputedStyle(el);
        const out = {
            borderStyle: cs.borderTopStyle,
            radius: parseFloat(cs.borderTopLeftRadius) || 0,
            borderColor: cs.borderTopColor,
            bg: cs.backgroundColor,
        };
        el.remove();
        return out;
    });
}

/** Mount a plate with a semantic radius class and read its painted radius. */
async function readClassRadius(page: Page, cls: string): Promise<number> {
    return page.evaluate((c) => {
        const el = document.createElement("div");
        el.className = c;
        el.style.cssText =
            "position:fixed;left:-9999px;width:120px;height:120px;border:1px solid;";
        document.body.appendChild(el);
        void el.offsetHeight;
        const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        el.remove();
        return r;
    }, cls);
}

test.describe("ghost-dashed (π — the ONE dashed-ghost register + rounded-everywhere, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    for (const vp of VIEWPORTS) {
        for (const mode of [false, true] as const) {
            const modeLabel = mode ? "dark" : "light";

            test(`(a)+(b) the ghost-slot resolves a warm dashed register at --radius-card [${modeLabel}] @ ${vp.name}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, mode);

                const radiusCard = await resolveRadiusToken(page, "--radius-card");
                expect(radiusCard, "--radius-card must resolve a non-zero radius").toBeGreaterThan(0);

                const ghost = await readGhostSlot(page);

                // (a1) dashed, not solid/none.
                expect(ghost.borderStyle, `ghost-slot border-style "${ghost.borderStyle}"`).toBe(
                    "dashed",
                );

                // (b) the single ghost radius == --radius-card.
                expect(
                    Math.abs(ghost.radius - radiusCard),
                    `ghost-slot radius ${ghost.radius}px must equal --radius-card ${radiusCard}px`,
                ).toBeLessThanOrEqual(1.5);

                // (a2) the dashed hairline is WARM (OKLab chroma > 0 — not a grey border).
                const bc = parseRgbA(ghost.borderColor);
                expect(bc, `could not parse border-color "${ghost.borderColor}"`).not.toBeNull();
                if (bc) {
                    const chroma = rgbChroma(bc.r, bc.g, bc.b);
                    expect(
                        chroma,
                        `ghost-slot dashed hairline must be WARM (chroma>0), got ${chroma.toFixed(4)} (${ghost.borderColor})`,
                    ).toBeGreaterThan(0.001);
                    // and translucent (the 22% warm-ink hairline, not a hard opaque rule).
                    expect(bc.a, `dashed hairline α ${bc.a}`).toBeLessThan(1);
                }

                // (a3) the host is TRANSLUCENT (reads "empty," not a flat opaque slab).
                const hb = parseRgbA(ghost.bg);
                expect(hb, `could not parse host bg "${ghost.bg}"`).not.toBeNull();
                if (hb) {
                    expect(
                        hb.a,
                        `ghost-slot host must be translucent (α<1), got α=${hb.a} (${ghost.bg})`,
                    ).toBeLessThan(1);
                }
            });

            test(`(c) the rounded witnesses resolve a semantic radius [${modeLabel}] @ ${vp.name}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, mode);

                const radiusCard = await resolveRadiusToken(page, "--radius-card");
                const radiusPanel = await resolveRadiusToken(page, "--radius-panel");

                const cardR = await readClassRadius(page, "rounded-card");
                const panelR = await readClassRadius(page, "rounded-panel");

                expect(cardR, "rounded-card must resolve a non-zero radius").toBeGreaterThan(0);
                expect(panelR, "rounded-panel must resolve a non-zero radius").toBeGreaterThan(0);
                expect(
                    Math.abs(cardR - radiusCard),
                    `rounded-card ${cardR}px must equal --radius-card ${radiusCard}px (the home tiles / SectionPreviewCard radius)`,
                ).toBeLessThanOrEqual(1.5);
                expect(
                    Math.abs(panelR - radiusPanel),
                    `rounded-panel ${panelR}px must equal --radius-panel ${radiusPanel}px (the configurator clip radius)`,
                ).toBeLessThanOrEqual(1.5);
            });
        }
    }
});
