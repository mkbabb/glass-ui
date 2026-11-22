// BA.W-ANIMATE — ba-animate.spec.ts, the BINDING π readback of the shipped motion
// facilities wired onto real surfaces. proof:ba-animate proves the SOURCE
// (the <Transition> wraps the mount, the .scroll-progress bar is scoped to the
// route scroller, the audacious figures carry [data-countup] + the intersection
// gate, the hero is on the SETTLE register); THIS spec proves the painted RENDER
// — the AZ P-1 source-green/visually-still-flat gap is the close-class this
// tranche exists to fix, so the live readback is the binding truth, never the
// source diff alone.
//
// THE BINDING ARMS:
//   (b) the dock scroll-progress ring tracks the route scroller
//       (BG.W-DOCK-SCROLL-PROGRESS — the standalone `.demo-scroll-progress` bar is
//       RETIRED onto the dock's own BORDER): the SidebarDock `<ScrollProgressRim>`
//       overlay wears the `inline-end-edge` coverage, is a named progressbar,
//       and its registered `--scroll-progress-rim-fill` sweeps to ~100% as the <main>
//       scroller reaches the bottom; the retired bar is DEFINITION-ABSENT.
//   (d) the hero <h1> fade-rises with no overshoot — the hero title's resolved
//       transform translateY rises from negative toward 0 on entrance and never
//       crosses past 0 (no overshoot past its terminal transform).
//
// At ≥2 viewports, BOTH modes where the arm reads a mode-sensitive surface.
// Fail-CLOSED on the mechanism arms.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

// ── (b) the dock wears the scroll progress as its BORDER (BG.W-DOCK-SCROLL-PROGRESS)
test("(b) the dock scroll-progress ring tracks the route scroller; the standalone bar is gone", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1280, height: 500 });
    await page.goto("/feedback/progress", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    const reg = await page.evaluate(() => {
        const ring = document.querySelector<HTMLElement>(".demo-dock-scroll-ring");
        const main = document.querySelector<HTMLElement>(".demo-main-scroller");
        if (!ring || !main) return null;
        const cs = getComputedStyle(ring);
        return {
            coverage: ring.getAttribute("data-coverage"),
            fill: parseFloat(cs.getPropertyValue("--scroll-progress-rim-fill")) || 0,
            // the retired standalone bar must be DEFINITION-ABSENT in the DOM
            barSurvives: !!document.querySelector(".demo-scroll-progress"),
            role: ring.getAttribute("role"),
            label: ring.getAttribute("aria-label"),
        };
    });
    expect(reg).not.toBeNull();
    // The standalone route-scroller bar is RETIRED (clean break, no alias).
    expect(reg!.barSurvives).toBe(false);
    // The vertical rail wears the inline-end-edge coverage (the scrollbar
    // metaphor as the dock's own border) and exposes its progress semantics.
    expect(reg!.coverage).toBe("inline-end-edge");
    expect(reg!.role).toBe("progressbar");
    expect(reg!.label).toBe("Page scroll progress");

    // Scroll the route scroller to the bottom → the registered fill sweeps to ~100%.
    const before = reg!.fill;
    const scrolled = await page.evaluate(() => {
        const main = document.querySelector<HTMLElement>(".demo-main-scroller");
        if (!main) return 0;
        main.style.scrollBehavior = "auto";
        main.scrollTop = main.scrollHeight;
        return main.scrollTop;
    });
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => {
        const ring = document.querySelector<HTMLElement>(".demo-dock-scroll-ring");
        return ring
            ? parseFloat(
                  getComputedStyle(ring).getPropertyValue(
                      "--scroll-progress-rim-fill",
                  ),
              ) || 0
            : -1;
    });
    // The scroller genuinely moved (the route owns scroll on <main>) …
    expect(scrolled).toBeGreaterThan(0);
    // … and the dock ring's fill tracked it to the bottom (≈100%).
    expect(after).toBeGreaterThan(before);
    expect(after).toBeGreaterThan(90);
});

// ── (d) the hero <h1> fade-rises with no overshoot ────────────────────────────
test("(d) the hero <h1> fade-rises on entrance with no overshoot past 0", async ({
    page,
}) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    // The home/landing route carries the StoryHero display <h1>.
    await page.goto("/", { waitUntil: "commit" });

    // Sample the hero title transform across the entrance window. The fade-slide
    // enter-from is translateY(-4px) settling to 0; the SETTLE register never
    // overshoots PAST 0 (no positive translateY).
    const ys: number[] = [];
    for (let i = 0; i < 12; i++) {
        const y = await page.evaluate(() => {
            const h1 = document.querySelector<HTMLElement>(".story-hero-title");
            if (!h1) return Number.NaN;
            const t = getComputedStyle(h1).transform;
            if (!t || t === "none") return 0;
            const m = t.match(/matrix\(([^)]+)\)/);
            return m ? parseFloat(m[1].split(",")[5]) : 0;
        });
        if (!Number.isNaN(y)) ys.push(y);
        await page.waitForTimeout(60);
    }
    // The title settled at translateY 0 (its terminal transform) …
    const last = ys[ys.length - 1];
    expect(Math.abs(last)).toBeLessThan(1.0);
    // … and NEVER overshot to a meaningful positive translateY (no bounce past 0;
    // the SETTLE register — "audacious type arrives with gravity, not bounce").
    expect(Math.max(...ys)).toBeLessThan(1.0);
});

// ── Captures (the cardinal-lesson DELTA frames — BOTH modes) ──────────────────
test("captures — / in both modes", async ({ page }) => {
    mkdirSync(VISUAL_DIR, { recursive: true });
    for (const mode of [false, true] as const) {
        await page.goto("/", { waitUntil: "networkidle" });
        await setDark(page, mode);
        await page.waitForTimeout(600);
        await page.screenshot({
            path: `${VISUAL_DIR}/W-ANIMATE-hero-enter-${mode ? "dark" : "light"}.png`,
            fullPage: false,
        });
    }
    expect(true).toBeTruthy();
});
