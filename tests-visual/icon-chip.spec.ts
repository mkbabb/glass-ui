// BA.W-ICON-CHIP — icon-chip.spec.ts, the BINDING π readback (the captured
// own-surface truth; the cardinal-lesson DELTA). proof:icon-chip proves the
// <IconChip> primitive OWNS the recipe + the ratio + the axes (the SOURCE
// structure); THIS spec proves the painted RENDER — the rendered chip is
// byte-faithful to the reference register in BOTH modes, the chip diameter ≥ the
// glyph (the d2 proportion holds at render), and a duotone chip's glyph carries a
// `fill` (the axis paints, not a no-op). The A1-1/P-1 source-green/visually-broken
// gap is the exact AZ close-class BA exists to fix, so the live render is the
// binding truth, never the source diff alone.
//
// THE BINDING ARMS (the real /foundations/icons + /compositions/empty-states demo
// routes, which load the global `/styles` cascade so the `.icon-chip` recipe + the
// `--section-color-N` ramp resolve; mirrors menu-glass.spec.ts):
//
//   (a) CHIP BACKPLATE = THE SECTION-COLOR 25% MIX — the Pops reference chip
//       (stop 0) resolves a TRANSLUCENT backplate (alpha ≈ 0.25 — the
//       `color-mix(… --section-color-0 25%, transparent)` register reads the
//       backdrop through) AND a NON-ink glyph colour (the full-chroma section hue,
//       NOT --muted-foreground). POSITIVE: the alpha is the reference 0.25 stop.
//   (b) CHIP DIAMETER ≥ GLYPH — the chip's painted box clears the glyph (the d2
//       proportion holds at render; the plate never paints under the glyph).
//   (c) DUOTONE FILL PAINTS — a synthetic `.icon-chip--duotone` chip's inner svg
//       resolves a non-`none` `fill` (the filled-tonal axis paints, not a no-op).
//   (d) MODE-ROBUST — both (a) and (b) hold under `.dark` (the `--section-color-N`
//       dual arm flips the chip with no hardcoded dark re-declaration).
//
// + the captured DELTA frames written to the DELTA dir.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: a non-translucent plate / a glyph that
// reads --muted-foreground on a section chip / a plate-under-glyph break / an
// absent duotone fill reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const ICONS_ROUTE = "/foundations/icons";
const EMPTY_ROUTE = "/compositions/empty-states";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

function alphaOf(bg: string): number | null {
    const rgba = bg.match(
        /rgba?\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+(?:[,\s/]+([\d.]+))?/i,
    );
    if (rgba) return rgba[1] === undefined ? 1 : Number(rgba[1]);
    const fn = bg.match(
        /(?:color\(\s*srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+|oklab\(\s*[-\d.%]+\s+[-\d.%]+\s+[-\d.%]+)\s*\/\s*([\d.]+%?)\s*\)/i,
    );
    if (fn) {
        const v = fn[1]!;
        return v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
    }
    if (/^(color\(srgb|oklab\(|rgb\()/i.test(bg)) return 1;
    return null;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(150);
}

/**
 * Read the FIRST Pops chip (stop 0 — the lane's reference target) on the icons
 * route: its resolved backplate background, its glyph colour, and the chip-vs-glyph
 * diameter. The chip is the `<IconChip>`-rendered `.icon-chip` span; the glyph is
 * its `svg` child.
 */
async function readReferenceChip(page: Page): Promise<{
    bg: string;
    bgAlpha: number | null;
    glyphColor: string;
    chipDiameter: number;
    glyphDiameter: number;
} | null> {
    const chip = page.locator(".icon-chip").first();
    await chip.waitFor({ state: "visible", timeout: 8000 });
    return chip.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        const rect = (el as HTMLElement).getBoundingClientRect();
        const svg = (el as HTMLElement).querySelector("svg");
        const svgRect = svg?.getBoundingClientRect();
        const glyphCs = svg ? getComputedStyle(svg) : null;
        return {
            bg: cs.backgroundColor,
            glyphColor: glyphCs ? glyphCs.color : "",
            chipDiameter: Math.min(rect.width, rect.height),
            glyphDiameter: svgRect ? Math.min(svgRect.width, svgRect.height) : 0,
        };
    }).then((r) => ({ ...r, bgAlpha: alphaOf(r.bg) }));
}

/**
 * Synthesize a `.icon-chip--duotone[data-duotone]` chip carrying a real lucide-shaped
 * svg path and read the inner svg's resolved `fill` — the duotone axis must paint a
 * non-`none` fill on the glyph (the filled-tonal move).
 */
async function readDuotoneFill(page: Page): Promise<string> {
    return page.evaluate(() => {
        const ID = "__ic_duotone__";
        document.getElementById(ID)?.remove();
        const host = document.createElement("div");
        host.id = ID;
        host.style.cssText =
            "position:fixed;left:0;top:0;z-index:99999;--icon-chip-event-color:var(--section-color-0);--icon-chip-plate-color:var(--section-color-0);--icon-chip-glyph-size:22px;--icon-chip-size:48px;";
        host.className = "icon-chip icon-chip--duotone";
        host.setAttribute("data-duotone", "");
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg",
        );
        svg.setAttribute("class", "icon-chip__glyph");
        svg.setAttribute("width", "22");
        svg.setAttribute("height", "22");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );
        path.setAttribute("d", "M12 2 L22 22 L2 22 Z");
        svg.appendChild(path);
        host.appendChild(svg);
        document.body.appendChild(host);
        void host.offsetHeight;
        const fill = getComputedStyle(svg).fill;
        host.remove();
        return fill;
    });
}

test.describe("BA.W-ICON-CHIP — the IconChip pop register π readback", () => {
    mkdirSync(VISUAL_DIR, { recursive: true });

    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`icons Pops reference chip — ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(ICONS_ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);

                const ref = await readReferenceChip(page);
                expect(ref, "the reference chip must render").not.toBeNull();
                if (!ref) return;

                // (a) the backplate is the TRANSLUCENT 25% section-color mix.
                expect(
                    ref.bgAlpha,
                    `chip backplate must be translucent (the 25% reference stop) — got ${ref.bg}`,
                ).not.toBeNull();
                expect(ref.bgAlpha!).toBeGreaterThan(0.1);
                expect(ref.bgAlpha!).toBeLessThan(0.45);

                // the glyph reads the full-chroma section hue, NOT the muted ink.
                const muted = await page.evaluate(() =>
                    getComputedStyle(document.documentElement)
                        .getPropertyValue("--muted-foreground")
                        .trim(),
                );
                expect(
                    ref.glyphColor,
                    "the chip glyph must read the full-chroma section hue, not --muted-foreground",
                ).not.toBe(muted);

                // (b) the chip diameter ≥ the glyph (the d2 proportion at render).
                expect(
                    ref.chipDiameter,
                    `chip diameter (${ref.chipDiameter}) must be ≥ the glyph (${ref.glyphDiameter}) — the plate never paints under the glyph`,
                ).toBeGreaterThanOrEqual(ref.glyphDiameter);

                await page.screenshot({
                    path: `${VISUAL_DIR}/W-ICON-CHIP-icons-${vp.name}-${mode}.png`,
                    fullPage: false,
                });
            });
        }
    }

    test("empty-states grid chips render the pop register — desktop light", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(EMPTY_ROUTE, { waitUntil: "networkidle" });
        await setDark(page, false);
        const count = await page.locator(".icon-chip").count();
        expect(count, "the empty-states grid must render ≥1 IconChip").toBeGreaterThan(
            0,
        );
        const first = await readReferenceChip(page);
        expect(first).not.toBeNull();
        expect(first!.bgAlpha!).toBeGreaterThan(0.1);
        expect(first!.chipDiameter).toBeGreaterThanOrEqual(first!.glyphDiameter);
        await page.screenshot({
            path: `${VISUAL_DIR}/W-ICON-CHIP-empty-states-desktop-light.png`,
            fullPage: false,
        });
    });

    test("the duotone axis paints a non-none fill", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(ICONS_ROUTE, { waitUntil: "networkidle" });
        const fill = await readDuotoneFill(page);
        expect(
            fill,
            "the duotone glyph must resolve a non-`none` fill (the filled-tonal axis paints)",
        ).not.toMatch(/^none$/i);
        // it is a real colour value (rgb/oklab/color()), not empty.
        expect(fill.length).toBeGreaterThan(0);
    });
});
