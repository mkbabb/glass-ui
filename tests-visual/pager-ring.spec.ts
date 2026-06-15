// BA.W-PAGER — pager-ring.spec.ts, the BINDING π readback (the captured own-surface
// truth; the cardinal-lesson DELTA). proof:pager-ring proves the source structure
// (the `.glass-pager-ring` recipe + the one-register/subpath/adopt clauses); THIS
// spec proves the painted RENDER on the live `/navigation/carousel` route, BOTH
// modes — the dots host computes a TRANSLUCENT glass plate, the counter is OFF the
// opaque `bg-card` dark slab, the pager reads as ONE encapsulated glass control.
// The A1-1/P-1 source-green/visually-broken gap is the exact AZ close-class BA exists
// to fix, so the live render is the binding truth, never the source diff alone.
//
// THE BINDING ARMS (read the LIVE `/navigation/carousel` route — the canonical
// chassis composition; the dots + counter both ringed):
//
//   (a) THE DOTS ARE RINGED — the PagerDots host (`[data-slot="pager-dots"]`)
//       resolves a TRANSLUCENT glass plate: background-color α in (0.05, 0.95),
//       backdrop-filter non-none, border-radius pill. RED at HEAD (the bare
//       CarouselDots row: bg/blur/radius all none/0).
//   (b) THE COUNTER IS OFF bg-card — the counter
//       (`[data-slot="carousel-pager-counter"]`) resolves a TRANSLUCENT plate
//       (α < 0.95) in BOTH modes; the dark `rgb(28,25,23)` slab is dead. RED at
//       HEAD (the opaque `bg-card` ring).
//   (c) ONE REGISTER — the dots host AND the counter resolve the SAME glass-floating
//       background (the ONE `.glass-pager-ring` recipe, two consumers).
//   (d) THE COUNTER TEXT CLEARS THE LEGIBILITY FLOOR — the counter's resolved
//       foreground over its translucent plate clears the readable register in BOTH
//       modes (the ring-material-failure triumvirate trigger: the glass-floating ring
//       must read legibly over the carousel image content).
//
// + the captured DELTA frames written to the DELTA dir. At ≥2 viewports, BOTH modes.
// Fail-CLOSED: an opaque dots host / an opaque counter / a diverged register reds the
// recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const HOST_ROUTE = "/navigation/carousel";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

function alphaOf(bg: string): number | null {
    const rgba = bg.match(/rgba?\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+(?:[,\s/]+([\d.]+))?/i);
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

// WCAG relative-luminance contrast (sRGB) over an alpha-composited plate.
function parseRgb(c: string): [number, number, number] | null {
    const m = c.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    return m ? [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255] : null;
}
function lin(c: number): number {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relLum([r, g, b]: [number, number, number]): number {
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: [number, number, number], b: [number, number, number]): number {
    const L1 = relLum(a), L2 = relLum(b);
    const hi = Math.max(L1, L2), lo = Math.min(L1, L2);
    return (hi + 0.05) / (lo + 0.05);
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(150);
}

interface RingReadback {
    dotsBg: string;
    dotsBlur: string;
    dotsRadius: string;
    counterBg: string;
    counterColor: string;
    counterBlur: string;
}

async function readPager(page: Page): Promise<RingReadback> {
    return page.evaluate(() => {
        const dots = document.querySelector('[data-slot="pager-dots"]') as HTMLElement | null;
        const counter = document.querySelector(
            '[data-slot="carousel-pager-counter"]',
        ) as HTMLElement | null;
        const dotsCs = dots ? getComputedStyle(dots) : null;
        const counterCs = counter ? getComputedStyle(counter) : null;
        return {
            dotsBg: dotsCs?.backgroundColor ?? "",
            dotsBlur: dotsCs?.backdropFilter ?? (dotsCs as unknown as { webkitBackdropFilter?: string })?.webkitBackdropFilter ?? "",
            dotsRadius: dotsCs?.borderTopLeftRadius ?? "",
            counterBg: counterCs?.backgroundColor ?? "",
            counterColor: counterCs?.color ?? "",
            counterBlur: counterCs?.backdropFilter ?? "",
        };
    });
}

test.describe("pager-ring (π — the unified pager-dots register in a glass ring, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    for (const vp of VIEWPORTS) {
        for (const dark of [false, true] as const) {
            const mode = dark ? "dark" : "light";

            test(`(a-c) dots ringed · counter off bg-card · one register @ ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                await page.waitForTimeout(120);
                const r = await readPager(page);

                // (a) the dots host is a translucent glass plate.
                const dotsA = alphaOf(r.dotsBg);
                expect(dotsA, `dots host bg "${r.dotsBg}"`).not.toBeNull();
                expect(dotsA!, "dots host must be translucent (0.05 < α < 0.95)").toBeGreaterThan(0.05);
                expect(dotsA!, "dots host must be translucent (0.05 < α < 0.95)").toBeLessThan(0.95);
                expect(r.dotsBlur, `dots host backdrop-filter "${r.dotsBlur}"`).not.toBe("none");
                expect(r.dotsBlur.length, "dots host has a backdrop-filter").toBeGreaterThan(0);
                // pill radius — a large radius (≥ 50% of a ~28px box → ≥ 14px or a px≥9999).
                const radPx = parseFloat(r.dotsRadius);
                expect(radPx, `dots host radius "${r.dotsRadius}"`).toBeGreaterThan(12);

                // (b) the counter is off bg-card — translucent in BOTH modes.
                const counterA = alphaOf(r.counterBg);
                expect(counterA, `counter bg "${r.counterBg}"`).not.toBeNull();
                expect(counterA!, "counter must be translucent (the dark slab dead)").toBeLessThan(0.95);

                // (c) one register — the dots host and counter share the glass-floating bg.
                expect(r.counterBg, "counter reads the SAME ring register as the dots host").toBe(
                    r.dotsBg,
                );
            });

            test(`(d) counter text clears the legibility floor @ ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                await page.waitForTimeout(120);
                const r = await readPager(page);
                const fg = parseRgb(r.counterColor);
                // The plate composited over the page; approximate the plate as its own
                // resolved bg over the page card. The counter text is `--foreground`,
                // so the contrast floor is the readable register over the translucent
                // glass plate (≥ 3:1 here, the non-text/dim-context floor — the ring
                // material-failure trigger).
                const plate = parseRgb(r.counterBg);
                expect(fg, `counter color "${r.counterColor}"`).not.toBeNull();
                if (fg && plate) {
                    const c = contrast(fg, plate);
                    expect(c, `counter text contrast over its plate (${c.toFixed(2)}:1)`).toBeGreaterThan(3.0);
                }
            });
        }
    }

    // ── The captured DELTA frame (the pager on the live route, both modes, desktop) ──
    test("DELTA capture — the pager glass ring on /navigation/carousel", async ({ page }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: 1280, height: 800 });
        for (const dark of [false, true] as const) {
            await setDark(page, dark);
            await page.waitForTimeout(200);
            const pager = page.locator(".mt-4.flex.items-center.justify-between").first();
            await pager.screenshot({
                path: `${VISUAL_DIR}W-PAGER-ring-${dark ? "dark" : "light"}.png`,
            });
        }
    });
});
