// BK #85 W-EASING — the π readback of the published curve family over its consumer
// route (/motion/curve-gallery). The device-free battery in
// `tests/components/easing.contract.test.ts` covers structure and the boundary law;
// this scenario covers the RENDER — that the painted plot is the value.js twin, that
// the frame does not move, and that the curve strokes the one violet color event.
//
// The bite the source arm cannot give: an implementer could green the source parse
// while the rendered curve is a hand-rolled approximation drifted off the value.js
// callable. Only the painted path geometry binds it.
//
// It asserts, off the LIVE painted DOM:
//   P1 — the BEZIER stroke plots the real CubicBezier twin (the painted control
//        points match the printed literal's, through the SVG-Y flip).
//   P2 — the STEPS stroke is CONSTRUCTED, not sampled: it is H/V commands, it costs
//        at most 2n+1 of them, and its risers sit at exactly i/n.
//   P3 — the curve strokes the violet --motion-accent / --viz-legendre twin, both modes.
//   P4 — the readout is the re-parseable literal in both modes.
//   P5 — the frame is a CONSTANT: the viewBox is byte-identical at rest and after the
//        mode switch, and the plot's box is square (letterbox zero by identity).
//   P11 — the draw-on is a SWEEP: a new curve wipes itself in over ≥ 2 frames of
//        distinct `clip-path`, and under `reduce` it lands on ONE frame with no
//        un-drawn state ever painted.
//
// It loads :5199 → LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips.
//
// THE PORT, stated correctly because the first cut of this header got it wrong.
// Navigation here is baseURL-relative (`page.goto(ROUTE)`), and the baseURL is this
// suite's own — `tests-visual/playwright.config.ts:25-26` defaults `GLASS_UI_DEMO_PORT`
// to **5199** and spawns `npm run dev` on it. :5199 is therefore the lane's OWN port,
// not a foreign repository's; every sibling spec in this directory names it. `:5400`
// is the separate `demo:serve` script. The spec this one replaces was dead on its
// SELECTORS — it drove a family-chip rack the route does not render — and it
// navigated relative to the same baseURL, hardcoding no port at all.

import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/motion/curve-gallery";
const PICKER = '[data-slot="easing-picker"]';
const CURVE = '[data-slot="easing-curve"]';
const INK = '[data-slot="easing-curve-stroke"][data-tone="ink"]';

// sRGB → OKLab hue (Chrome serializes oklch()/oklab() as rgb when sampled).
function lin(c: number): number {
    const x = c / 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function rgbHueDeg(r: number, g: number, b: number): number {
    const R = lin(r),
        G = lin(g),
        B = lin(b);
    const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
    const l_ = Math.cbrt(l),
        m_ = Math.cbrt(m),
        s_ = Math.cbrt(s);
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const Bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    let h = (Math.atan2(Bb, A) * 180) / Math.PI;
    if (h < 0) h += 360;
    return h;
}
function parseRgb(str: string): [number, number, number] | null {
    const m = str.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    return m ? [+m[1]!, +m[2]!, +m[3]!] : null;
}

test.describe("BK #85 W-EASING — the published curve family (π)", () => {
    test("P1 — the bezier stroke plots the real CubicBezier twin", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        const picker = page.locator(`${PICKER}[data-mode="bezier"]`);
        await expect(picker, "the editor mounts in bezier mode").toBeVisible();

        const probe = await picker.evaluate((root, ink) => {
            const code = root.querySelector("code");
            const path = root.querySelector(ink);
            return {
                literal: (code?.textContent || "").trim(),
                d: path?.getAttribute("d") || "",
            };
        }, INK);

        const cb = probe.literal.match(
            /cubic-bezier\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/,
        );
        expect(
            cb,
            `the readout is a re-parseable cubic-bezier literal (got "${probe.literal}")`,
        ).not.toBeNull();
        const dm = probe.d.match(/M 0 1 C ([-\d.]+) ([-\d.]+), ([-\d.]+) ([-\d.]+), 1 0/);
        expect(dm, `the bezier path is the M 0 1 C … 1 0 form (got "${probe.d}")`).not.toBeNull();
        const [, x1, y1, x2, y2] = cb!.map(Number);
        const [, px1, py1, px2, py2] = dm!.map(Number);
        expect(px1).toBeCloseTo(x1!, 2);
        expect(py1).toBeCloseTo(1 - y1!, 2);
        expect(px2).toBeCloseTo(x2!, 2);
        expect(py2).toBeCloseTo(1 - y2!, 2);
    });

    test("P2 — the steps stroke is constructed, not sampled", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.getByRole("button", { name: "Steps", exact: true }).click();

        const picker = page.locator(`${PICKER}[data-mode="steps"]`);
        await expect(picker, "the editor switches to steps mode").toBeVisible();

        const probe = await picker.evaluate((root, ink) => {
            const code = root.querySelector("code");
            const path = root.querySelector(ink);
            return {
                literal: (code?.textContent || "").trim(),
                d: path?.getAttribute("d") || "",
            };
        }, INK);

        const st = probe.literal.match(/steps\((\d+),\s*([a-z-]+)\)/);
        expect(
            st,
            `the readout is a re-parseable steps() literal (got "${probe.literal}")`,
        ).not.toBeNull();
        const n = Number(st![1]);

        // A sampled staircase is a run of `L` commands; a constructed one is treads
        // and risers. 241 commands could never draw a crisp riser; 2n+1 is exact.
        const commands = probe.d.match(/[MHVL]/g) || [];
        expect(commands.filter((c) => c === "L"), "no sampled segments remain").toHaveLength(0);
        expect(commands.length, `≤ 2n+1 commands at n=${n} (got ${commands.length})`)
            .toBeLessThanOrEqual(2 * n + 1);

        // Every tread ends on an exact i/n boundary.
        for (const [, x] of probe.d.matchAll(/H\s+([-\d.]+)/g)) {
            const scaled = Number(x) * n;
            expect(Math.abs(scaled - Math.round(scaled)), `riser at x=${x} is exactly i/${n}`)
                .toBeLessThan(1e-3);
        }
    });

    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`P3 — the curve strokes the violet --motion-accent twin (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await page.evaluate((on) => {
                document.documentElement.classList.toggle("dark", on);
            }, dark);
            await page.waitForTimeout(150);

            const picker = page.locator(`${PICKER}[data-mode="bezier"]`);
            await expect(picker).toBeVisible();
            const strokeRgb = await picker.evaluate((root, ink) => {
                const path = root.querySelector(ink) as SVGPathElement | null;
                return path ? getComputedStyle(path).stroke : null;
            }, INK);
            const rgb = parseRgb(strokeRgb || "");
            expect(rgb, `the curve stroke resolves to a color (${strokeRgb})`).not.toBeNull();
            const hue = rgbHueDeg(rgb![0], rgb![1], rgb![2]);
            // --viz-legendre is the violet identity (oklch hue ~317.5° light /
            // ~318.1° dark) — NOT the warm-red --viz-fourier (~30°).
            expect(
                hue,
                `the curve stroke hue ${hue.toFixed(1)}° must be the violet --motion-accent/--viz-legendre band (290-350°), not warm-red`,
            ).toBeGreaterThan(290);
            expect(hue).toBeLessThan(350);
        });
    }

    test("P4 — the readout is the re-parseable literal in both modes", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        const bezierLiteral = await page
            .locator(`${PICKER}[data-mode="bezier"] code`)
            .first()
            .textContent();
        expect(bezierLiteral?.trim()).toMatch(/^cubic-bezier\(/);

        await page.getByRole("button", { name: "Steps", exact: true }).click();
        const stepsLiteral = await page
            .locator(`${PICKER}[data-mode="steps"] code`)
            .first()
            .textContent();
        expect(stepsLiteral?.trim()).toMatch(/^steps\(\d+,/);
    });

    test("P5 — the frame is constant and the plot is square (letterbox zero)", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        const svg = page.locator(`${CURVE} svg`).first();
        const before = await svg.getAttribute("viewBox");
        expect(before, "the shipped constant frame").toBe("-0.1 -0.1 1.2 1.2");

        const box = await svg.boundingBox();
        expect(box, "the plot has a box").not.toBeNull();
        // `preserveAspectRatio="meet"` discards nothing when the element aspect and
        // the viewBox aspect agree; both are 1.
        expect(Math.abs(box!.width - box!.height) / box!.width, "element aspect == viewBox aspect")
            .toBeLessThan(0.005);

        await page.getByRole("button", { name: "Steps", exact: true }).click();
        expect(await svg.getAttribute("viewBox"), "the frame is not a function of the curve")
            .toBe(before);
    });

    // Sample the ink stroke's wipe every frame while a new curve arrives, as the
    // RIGHT inset of its `clip-path` (100 = closed, 0 = open). The ink path is `v-for`
    // index 1 in BOTH modes, so the element survives the switch and one sampler spans
    // the whole event.
    async function sampleSweep(page: Page): Promise<number[]> {
        await page.evaluate((ink) => {
            const store = window as unknown as { __sweep?: number[] };
            store.__sweep = [];
            const path = document.querySelector(ink);
            let frames = 0;
            const tick = (): void => {
                if (!path || frames++ > 90) return;
                const clip = getComputedStyle(path).clipPath;
                const right = clip.match(/inset\(\s*[-\d.%px ]*?\s+([-\d.]+)%/);
                store.__sweep!.push(right ? Number(right[1]) : 0);
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, INK);
        await page.getByRole("button", { name: "Steps", exact: true }).click();
        await page.waitForTimeout(700);
        return page.evaluate(
            () => (window as unknown as { __sweep?: number[] }).__sweep ?? [],
        );
    }

    test("P11 — the draw-on sweeps over frames, and lands on one under reduce", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await expect(page.locator(PICKER)).toBeVisible();

        const swept = await sampleSweep(page);
        const between = swept.filter((v) => v > 1 && v < 103);
        expect(
            new Set(between).size,
            `the wipe paints ≥ 2 distinct in-between frames (got ${JSON.stringify(swept.slice(0, 12))})`,
        ).toBeGreaterThanOrEqual(2);
        expect(swept.at(-1), "the wipe finishes OPEN").toBeLessThan(0);

        // The PRM arm is one FRAME, not a fast sweep: the picker never arms it, so no
        // un-drawn state is ever painted at all.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await expect(page.locator(PICKER)).toBeVisible();

        const reduced = await sampleSweep(page);
        expect(reduced.length, "the reduced arm still samples").toBeGreaterThan(2);
        expect(
            Math.max(...reduced),
            `no closed frame under reduce (got ${JSON.stringify(reduced.slice(0, 12))})`,
        ).toBeLessThan(0);
    });
});
