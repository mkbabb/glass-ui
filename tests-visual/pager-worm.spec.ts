// BI.W-PAGER-WORM — pager-worm.spec.ts, the BINDING π readback (the ruling-13 decider;
// the captured own-surface truth). `proof:pager-worm` proves the SOURCE structure (the
// three-layer split + the #pager-worm-goo Arm A + the @supports-not clip floor + the
// useLeadTrail driver); THIS spec proves the painted RENDER of the liquid dot-MORPH worm
// on the live `/navigation/carousel` route, BOTH modes — the σ8 empty-pill defect
// (D-PAGER PASS-1 §0 Defect 1: zero worm mass) is CURED, the worm ELONGATES → TRAVELS →
// RE-FORMS with liquid weight, and the bed pips stay individually crisp.
//
// THE BINDING ARMS (read the LIVE `/navigation/carousel` pager — the ruling-13 register):
//   (a) NOT EMPTY — the worm layer (`.pager-worm-layer`) paints a real silhouette (the two
//       `.goo-body` masses have non-zero size + are positioned) — the σ8 annihilation cured.
//   (b) THE WORM MORPHS — driving a multi-hop, the two bodies SEPARATE mid-travel (the live
//       lead↔trail elongation) then RE-FORM (the emergent release) — the elongate → travel
//       → reform read the Google-worm edict names.
//   (c) THE BED IS CRISP — N individually-distinct bed pips (`.goo-dot`), NEVER filtered.
//   (d) PRM SEATS — under `prefers-reduced-motion: reduce` a hop produces ZERO elongated
//       frames (the driver seats the worm on the target; one body, only the fade survives).
//
// + the captured DELTA frame. At ≥1 viewport, BOTH modes. Fail-CLOSED: an empty worm layer /
// a never-elongating worm / a PRM elongation reds the recompute, exit non-zero. LOCAL
// real-GPU (the full flood-fill connected-component + waist ≤ 0.45 + real Metal WebKit rides
// the W-PI-IN-CLOSE close; this arm binds the painted mechanism on the served demo).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/W-PAGER-WORM/", import.meta.url),
);

const HOST_ROUTE = "/navigation/carousel";

// The morph binds at ≥ the carousel's `sm` breakpoint (768px), where the hero carousel
// drives its pager under BOTH projects (chromium + coarse-touch). At the 390px basis-2/3
// register the demo carousel's embla does not respond to a pager-dot tap (a demo-coupling
// artifact orthogonal to the worm mechanism, which is width-agnostic).
const VIEWPORTS = [
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

interface WormFrame {
    /** centre-to-centre separation of the two bodies (px on the travel axis). */
    sep: number;
    /** neck opacity (0 at rest → 1 while it spans the gap). */
    neckOpacity: number;
}

/** Poll the worm masses over ~`frames` rAF ticks, returning the per-frame series. */
async function sampleWorm(page: Page, frames: number): Promise<WormFrame[]> {
    return page.evaluate((n) => {
        const pager = document.querySelector('[data-slot="pager-dots"]') as HTMLElement | null;
        if (!pager) return [];
        const bodies = pager.querySelectorAll<HTMLElement>(".goo-body");
        const neck = pager.querySelector<HTMLElement>(".goo-neck");
        const vertical = pager.getAttribute("data-orientation") === "vertical";
        const out: { sep: number; neckOpacity: number }[] = [];
        return new Promise<{ sep: number; neckOpacity: number }[]>((resolve) => {
            let i = 0;
            const tick = () => {
                if (bodies.length >= 2) {
                    const a = bodies[0]!.getBoundingClientRect();
                    const b = bodies[1]!.getBoundingClientRect();
                    const ca = vertical ? a.top + a.height / 2 : a.left + a.width / 2;
                    const cb = vertical ? b.top + b.height / 2 : b.left + b.width / 2;
                    const no = neck ? Number(getComputedStyle(neck).opacity) : 0;
                    out.push({ sep: Math.abs(cb - ca), neckOpacity: no });
                }
                if (++i >= n) return resolve(out);
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }, frames);
}

/** The visible bed pip count + their distinct centres (crispness). */
async function readBed(page: Page): Promise<{ count: number; distinct: number }> {
    return page.evaluate(() => {
        const pager = document.querySelector('[data-slot="pager-dots"]') as HTMLElement | null;
        if (!pager) return { count: 0, distinct: 0 };
        const pips = [...pager.querySelectorAll<HTMLElement>(".pager-bed-layer .goo-dot")];
        const centres = pips.map((p) => {
            const r = p.getBoundingClientRect();
            return Math.round(r.left + r.width / 2);
        });
        return { count: pips.length, distinct: new Set(centres).size };
    });
}

/** Click the pager dot at index `i` (drives a worm hop). */
async function hopTo(page: Page, i: number): Promise<void> {
    const dots = page.locator('[data-slot="pager-dot"]');
    const n = await dots.count();
    if (n === 0) return;
    await dots.nth(Math.min(i, n - 1)).click({ force: true });
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(120);
}

test.describe("pager-worm (π — the liquid dot-MORPH worm, ruling 13, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true] as const) {
            const mode = dark ? "dark" : "light";
            test(`worm morphs + bed crisp + PRM seats — ${vp.name} ${mode}`, async ({ page }) => {
                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);
                const pager = page.locator('[data-slot="pager-dots"]').first();
                await pager.waitFor({ state: "visible" });

                // (c) THE BED IS CRISP — N distinct pips
                const bed = await readBed(page);
                expect(bed.count, "the bed renders pips").toBeGreaterThanOrEqual(2);
                expect(bed.distinct, "every bed pip is individually crisp (distinct centre)").toBe(
                    bed.count,
                );

                // (a)+(b) THE WORM MORPHS — reset, then drive a nearby hop + sample the
                // full elongate → peak → contract series (the two-edge morph GESTALT; the
                // reform is timing-robust — the peak is mid-series, the tail contracts).
                await hopTo(page, 0);
                await page.waitForTimeout(500);
                const rest = await sampleWorm(page, 4);
                const restSep = Math.max(...rest.map((f) => f.sep), 0);

                await hopTo(page, Math.min(3, bed.count - 1)); // a nearby deterministic hop
                const series = await sampleWorm(page, 90);
                const seps = series.map((f) => f.sep);
                const maxSep = Math.max(...seps, 0);
                const peakIdx = seps.indexOf(maxSep);
                const tail = seps.slice(-12);
                const tailMean = tail.reduce((s, v) => s + v, 0) / Math.max(1, tail.length);
                const maxNeck = Math.max(...series.map((f) => f.neckOpacity), 0);

                // (a) NOT EMPTY — the worm layer paints a real silhouette
                const painted = await pager.evaluate((el) => {
                    const b = el.querySelector<HTMLElement>(".goo-body");
                    if (!b) return false;
                    const r = b.getBoundingClientRect();
                    return r.width > 2 && r.height > 2;
                });
                expect(painted, "the worm masses paint (NOT the σ8 empty pill)").toBe(true);

                // (b) THE WORM MORPHS — it ELONGATES then CONTRACTS (peak mid-series, tail reels in)
                expect(
                    maxSep,
                    "the worm ELONGATES on travel (the lead↔trail gap opens beyond rest)",
                ).toBeGreaterThan(restSep + 8);
                expect(maxNeck, "the welling neck reads while the worm spans the gap").toBeGreaterThan(
                    0.5,
                );
                expect(
                    peakIdx,
                    "the elongation PEAK is mid-travel, not stuck at the end (a true morph, not a static bar)",
                ).toBeLessThan(seps.length * 0.75);
                expect(
                    tailMean,
                    "the worm RE-FORMS toward the target (the trail reels the gap in — emergent release)",
                ).toBeLessThan(maxSep * 0.55);

                await pager.screenshot({
                    path: `${VISUAL_DIR}/worm-morph_${vp.name}_${mode}.png`,
                });

                // (d) PRM SEATS — a hop under reduce produces ZERO elongated frames
                await page.emulateMedia({ reducedMotion: "reduce" });
                await hopTo(page, 0);
                await page.waitForTimeout(200);
                await hopTo(page, Math.min(3, bed.count - 1));
                const prm = await sampleWorm(page, 24);
                const prmMaxSep = Math.max(...prm.map((f) => f.sep), 0);
                expect(
                    prmMaxSep,
                    "PRM seats the worm — no elongated frames (one body on the target)",
                ).toBeLessThan(restSep + 6);
                await page.emulateMedia({ reducedMotion: null });
            });
        }
    }
});

// ── The roving-tabindex keyboard contract (BI.W-PAGER-A11Y — the a11y arm) ─────────
// The pager was keyboard-BROKEN (N independent tab stops, no Arrow/Home/End). This arm
// drives the roving contract on the LIVE /navigation/carousel route: EXACTLY ONE tab stop,
// Arrow moves focus + activates the adjacent dot, Home/End jump, wrap holds. Keyboard is
// engine-agnostic (no device run beyond the shared W-PAGER-WORM capture). Target the
// hero-scale exhibit (aria-label "Hero-scale worm carousel") — non-windowed, horizontal,
// no autoplay, synchronous v-model — so the assertions are deterministic. Both modes.

const HERO_SCALE = '[data-slot="pager-dots"][aria-label="Hero-scale worm carousel"]';

/** The 1-based slide number the active dot announces (parsed off its aria-label). */
async function activeIdxIn(page: Page, sel: string): Promise<number> {
    return page.evaluate((s) => {
        const pager = document.querySelector(s);
        const el = pager?.querySelector('[data-slot="pager-dot"][data-active]');
        const m = el?.getAttribute("aria-label")?.match(/(\d+)/);
        return m ? Number(m[1]) : -1;
    }, sel);
}
/** The count of `tabindex="0"` dots in the pager (the roving invariant → exactly 1). */
async function tabstopCountIn(page: Page, sel: string): Promise<number> {
    return page.evaluate((s) => {
        const pager = document.querySelector(s);
        return pager ? pager.querySelectorAll('[data-slot="pager-dot"][tabindex="0"]').length : -1;
    }, sel);
}
/** Focus the ONE tab stop (the active dot). */
async function focusTabStop(page: Page, sel: string): Promise<void> {
    await page.evaluate((s) => {
        const pager = document.querySelector(s);
        (pager?.querySelector('[data-slot="pager-dot"][tabindex="0"]') as HTMLElement | null)?.focus();
    }, sel);
}
/** True iff the active element is a pager dot inside the target pager (focus followed). */
async function focusedIsDotIn(page: Page, sel: string): Promise<boolean> {
    return page.evaluate((s) => {
        const pager = document.querySelector(s);
        const el = document.activeElement as HTMLElement | null;
        return !!el && !!pager && pager.contains(el) && el.getAttribute("data-slot") === "pager-dot";
    }, sel);
}

test.describe("pager-a11y (π — the roving-tabindex keyboard contract, BI.W-PAGER-A11Y)", () => {
    for (const dark of [false, true] as const) {
        const mode = dark ? "dark" : "light";
        test(`one tabstop + arrow/Home/End drive + wrap — ${mode}`, async ({ page }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);
            const pager = page.locator(HERO_SCALE);
            await pager.waitFor({ state: "visible" });
            await pager.scrollIntoViewIfNeeded();

            // W1 — EXACTLY ONE roving tab stop on the button grid
            expect(await tabstopCountIn(page, HERO_SCALE), "exactly ONE roving tab stop").toBe(1);

            // seat on the first dot, focus the ONE tab stop
            await pager.locator('[data-slot="pager-dot"]').first().click({ force: true });
            await page.waitForTimeout(250);
            await focusTabStop(page, HERO_SCALE);
            expect(await focusedIsDotIn(page, HERO_SCALE), "focus lands on the active dot").toBe(true);
            expect(await activeIdxIn(page, HERO_SCALE), "seated on the first dot").toBe(1);

            // ArrowRight → focus moves + ACTIVATES the next dot
            await page.keyboard.press("ArrowRight");
            await page.waitForTimeout(160);
            expect(await activeIdxIn(page, HERO_SCALE), "ArrowRight activates the next dot").toBe(2);
            expect(await focusedIsDotIn(page, HERO_SCALE), "focus FOLLOWS the activated dot").toBe(true);

            // ArrowLeft → the previous dot
            await page.keyboard.press("ArrowLeft");
            await page.waitForTimeout(160);
            expect(await activeIdxIn(page, HERO_SCALE), "ArrowLeft activates the previous dot").toBe(1);

            // End → the last dot (capture the count — window-agnostic)
            await page.keyboard.press("End");
            await page.waitForTimeout(160);
            const last = await activeIdxIn(page, HERO_SCALE);
            expect(last, "End jumps to the last dot").toBeGreaterThan(1);

            // wrap forward: ArrowRight at the last → the first
            await page.keyboard.press("ArrowRight");
            await page.waitForTimeout(160);
            expect(await activeIdxIn(page, HERO_SCALE), "ArrowRight wraps last→first").toBe(1);

            // Home → the first dot
            await page.keyboard.press("Home");
            await page.waitForTimeout(160);
            expect(await activeIdxIn(page, HERO_SCALE), "Home jumps to the first dot").toBe(1);

            // wrap backward: ArrowLeft at the first → the last
            await page.keyboard.press("ArrowLeft");
            await page.waitForTimeout(160);
            expect(await activeIdxIn(page, HERO_SCALE), "ArrowLeft wraps first→last").toBe(last);

            await pager.screenshot({ path: `${VISUAL_DIR}/a11y-roving_${mode}.png` });
        });
    }
});
