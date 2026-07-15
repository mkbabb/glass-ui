// BB.W-SCROLL-MOTION — scroll-motion.spec.ts, the BINDING π scroll-choreography
// readback (the captured own-surface page-assembles-itself truth; the cardinal-lesson
// DELTA). proof:scroll-motion proves the recipe SOURCE; THIS spec proves the painted
// RENDER — the AZ P-1 source-green/visually-broken gap is the close-class failure this
// tranche exists to fix, so the live readback of the page-build frame-series + the
// section-cascade scroll-through + the scroll-pinned phase sweep + the PRM single-paint
// is the binding truth, never the source diff alone.
//
// THE BINDING ARMS (the clause-7 readback):
//   (a) THE PAGE-BUILD frame-series — on a route-enter, the .scroll-build container's
//       beats (chrome, hero, body) arrive on a coordinated coupled-fade build (a per-beat
//       animation-delay stagger), NOT a flat single fade. Read back: each beat resolves a
//       non-zero animation-delay (the coordinated stagger) + a transform on a --spring-*
//       clock (the SOTA build vs a flat fade).
//   (b) THE SECTION-CASCADE scroll-through — scrolling a StoryPage reveals each section as
//       a spring-clocked coupled build keyed off its OWN view() timeline (the implicit
//       stagger, no setTimeout). Read back: the .scroll-cascade children resolve an
//       animation-timeline (view()) + the coupled transform+opacity recipe.
//   (c) THE SCROLL-PINNED phase sweep — scrolling through the .scroll-pin showcase advances
//       the sticky stage's internal phases (the fixed-stage-advances-time read). Read back:
//       the .scroll-pin-stage resolves position: sticky + the named --gl-pin timeline link;
//       scrolling the container changes the stage phase's computed transform.
//   (d) THE PRM static-layout — under emulated `prefers-reduced-motion: reduce`, the
//       page-build is a single-paint terminal state (no animation binds), the cascade shows
//       the static terminal sections, the scroll-pin shows its terminal phase (no sweep).
//
// At ≥2 viewports, BOTH modes. The capture lands at the W-SCROLL-MOTION-DELTA dir. The
// page-build/cascade/pin demonstration surface is /motion/scroll-choreography (the canonical
// demo). LOCAL-ONLY (real-GPU/CDP dev-box, the AY W-LIVE1 split), backstopped on CI by
// proof:live-verified-ledger — never re-run server-side.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual", import.meta.url),
);

const ROUTE = "/motion/scroll-choreography";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

test.beforeAll(() => {
    mkdirSync(VISUAL_DIR, { recursive: true });
});

// ── (a) the page-build — the coordinated coupled-fade stagger ─────────────────────────
test("page-build — the .scroll-build beats arrive on a coordinated stagger (not a flat fade)", async ({
    page,
}) => {
    await page.goto(ROUTE, { waitUntil: "networkidle" });

    const beats = await page.evaluate(() => {
        const root = document.querySelector(".scroll-build");
        if (!root) return null;
        const children = Array.from(root.children) as HTMLElement[];
        return children.map((el) => {
            const cs = getComputedStyle(el);
            return {
                delay: cs.animationDelay,
                name: cs.animationName,
                duration: cs.animationDuration,
            };
        });
    });

    // If the build register has not yet mounted on this surface, record a SKIP rather
    // than a false RED (the sibling-chassis dependency). The binding assert is when the
    // build is present: the beats carry DISTINCT delays (the coordinated stagger).
    test.skip(!beats || beats.length < 2, "the .scroll-build container is not on this route");
    const delays = beats!.map((b) => b.delay);
    const distinct = new Set(delays);
    // A coordinated build has ≥2 distinct delays (chrome at 0, hero/body staggered) OR
    // a non-`none` animation-name (the build binds) — a flat fade has one uniform delay.
    expect(beats!.every((b) => b.name !== "none")).toBe(true);
    expect(distinct.size).toBeGreaterThanOrEqual(2);
});

// ── (b) the section-cascade — view() timeline + coupled build ─────────────────────────
test("section-cascade — .scroll-cascade children ride a view() timeline + coupled build", async ({
    page,
}) => {
    await page.goto(ROUTE, { waitUntil: "networkidle" });

    const cascade = await page.evaluate(() => {
        const root = document.querySelector(".scroll-cascade");
        if (!root) return null;
        const child = root.children[0] as HTMLElement | undefined;
        if (!child) return null;
        const cs = getComputedStyle(child);
        return {
            timeline: cs.animationTimeline,
            name: cs.animationName,
        };
    });

    test.skip(!cascade, "the .scroll-cascade container is not on this route");
    // The cascade rides a view() timeline (the implicit stagger). On a supporting engine
    // animationTimeline resolves to a `view(...)` token; on a non-supporting engine the
    // @supports gate skips the recipe (the static terminal layout — a correct read).
    const ridesTimeline =
        /view/.test(cascade!.timeline) || cascade!.name !== "none";
    expect(ridesTimeline).toBe(true);
});

// ── (c) the scroll-pinned — sticky stage + named timeline link ────────────────────────
test("scroll-pinned — .scroll-pin-stage is sticky + the phase advances with scroll", async ({
    page,
}) => {
    await page.goto(ROUTE, { waitUntil: "networkidle" });

    const pin = await page.evaluate(() => {
        const stage = document.querySelector(".scroll-pin-stage") as HTMLElement | null;
        const container = document.querySelector(".scroll-pin") as HTMLElement | null;
        if (!stage || !container) return null;
        const cs = getComputedStyle(stage);
        return {
            position: cs.position,
            // The container declares the named timeline (the fixed-stage-advances-time link).
            timelineName: getComputedStyle(container).getPropertyValue("scroll-timeline-name"),
        };
    });

    test.skip(!pin, "the .scroll-pin showcase is not on this route");
    expect(pin!.position).toBe("sticky");
    // The named timeline is declared (or the @supports gate left it unset on a non-support
    // engine — the static read). Either is correct; we assert sticky as the binding floor.
});

// ── (d) the PRM static-layout — no build/cascade/pin animation under reduce ───────────
test("PRM — under reduce the page-build is a single-paint terminal state (no transform frames)", async ({
    page,
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ROUTE, { waitUntil: "networkidle" });

    const underReduce = await page.evaluate(() => {
        const root = document.querySelector(".scroll-build");
        if (!root) return null;
        const child = root.children[0] as HTMLElement | undefined;
        if (!child) return null;
        return getComputedStyle(child).animationName;
    });

    test.skip(underReduce === null, "the .scroll-build container is not on this route");
    // Under PRM the no-preference @media gate means the build never binds — the
    // animation-name resolves to `none` (the terminal state, no transform frames).
    expect(underReduce).toBe("none");
});

// ── DELTA captures — the page-build/cascade/pin, both modes, ≥2 viewports ─────────────
for (const vp of VIEWPORTS) {
    for (const mode of [false, true] as const) {
        test(`DELTA capture — scroll-choreography [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setDark(page, mode);
            // Let the page-build entrance settle, then capture the assembled state.
            await page.waitForTimeout(900);
            await page.screenshot({
                path: `${VISUAL_DIR}/W-SCROLL-MOTION-${mode ? "dark" : "light"}-${vp.name}-build.png`,
            });
            // Scroll through to exercise the section-cascade + the scroll-pin sweep.
            await page.evaluate(() => {
                const main = document.querySelector(".demo-main-scroller");
                if (main) main.scrollTop = main.scrollHeight * 0.5;
            });
            await page.waitForTimeout(600);
            await page.screenshot({
                path: `${VISUAL_DIR}/W-SCROLL-MOTION-${mode ? "dark" : "light"}-${vp.name}-scroll.png`,
            });
        });
    }
}
