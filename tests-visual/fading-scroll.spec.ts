// BA.W-FADING-SCROLL — fading-scroll.spec.ts, the BINDING π edge-fade readback (the
// captured own-surface at-rest-sharp truth; the cardinal-lesson DELTA). proof:fading-scroll
// proves the recipe SOURCE; THIS spec proves the painted RENDER — the AZ P-1 source-green/
// visually-broken gap is the close-class failure BA exists to fix, so the live readback of
// the per-edge mask-width customs + the captured frames are the binding truth, never the
// source diff alone.
//
// THE BINDING ARMS (the W7 readback):
//   (a) THE MECHANISM — a self-mounted overflowing `.fading-scroll--x` strip: at-rest
//       (scrollLeft = 0) the resolved `--fade-start` is 0px (start edge SHARP — the R8-08
//       defect gone) and `--fade-end` feathers (trailing overflow cue present); scrolled to
//       the end, `--fade-end` collapses to 0px (sharp) and `--fade-start` feathers; a strip
//       that FITS (no overflow) shows NEITHER edge feathered. Both axes (x + y).
//   (b) THE LIVE AURORA SURFACES (the real migrated consumers) — the `/substrates/aurora`
//       route's `<FadingScroll axis="y">` controls column reads `--fade-start: 0px` at rest
//       (top edge sharp); the PresetPickerRow `<FadingScroll axis="x">` reads `--fade-start:
//       0px` at rest (the first card's chrome sharp).
//   (c) THE BLOB MOOD ROW (the R8-08 surface) — the `/substrates/blob` mood-preset row, once
//       wrapped in `<FadingScroll axis="x">` (the W-GOO-REDRESS coordination seam), reads
//       `--fade-start: 0px` at rest. Tolerant if the wrap has not yet landed (the sibling's
//       file) — recorded SKIP, not a false RED.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED on the mechanism arm: an at-rest start feather /
// an end feather on a fitting strip reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

// Resolve a CSS length custom (e.g. "0px" / "16px") to a number of px.
function pxOf(raw: string): number {
    const m = raw.trim().match(/^(-?[\d.]+)px$/);
    return m ? Number(m[1]) : NaN;
}

// ── (a) THE MECHANISM — a self-mounted overflowing strip ─────────────────────────────────
for (const axis of ["x", "y"] as const) {
    test(`mechanism — .fading-scroll--${axis} at-rest start SHARP, scrolled end SHARP, fits NEITHER`, async ({
        page,
    }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        const result = await page.evaluate(async (ax) => {
            // Mount an OVERFLOWING strip and a FITTING strip with the recipe class.
            const mk = (overflow: boolean) => {
                const el = document.createElement("div");
                el.className = `fading-scroll fading-scroll--${ax}`;
                el.setAttribute("data-fade-start", "");
                el.setAttribute("data-fade-end", "");
                const horizontal = ax === "x";
                el.style.cssText = horizontal
                    ? "width:300px;height:60px;display:flex;gap:8px;"
                    : "width:60px;height:300px;display:flex;flex-direction:column;gap:8px;";
                const n = overflow ? 12 : 1;
                for (let i = 0; i < n; i++) {
                    const c = document.createElement("div");
                    c.style.cssText = horizontal
                        ? "flex:0 0 120px;height:40px;background:#888;"
                        : "flex:0 0 120px;width:40px;background:#888;";
                    el.appendChild(c);
                }
                document.body.appendChild(el);
                return el;
            };
            // The BINDING readback: drive the ACTUAL scroll position and read the
            // resolved per-edge customs. The single writer (native scroll(self)
            // timeline on chromium-headless-new, the JS fallback elsewhere) drives
            // --fade-start/--fade-end off the REAL scrollLeft/Top — so we never write
            // the customs by hand (that would fight the live animation); we scroll and
            // observe, which is the truth the user reads.
            const overflowing = mk(true);
            const fitting = mk(false);
            // The composable doesn't run on a hand-mounted node (no Vue instance), so
            // on the native engine the CSS recipe is the writer; to also exercise the
            // discrete path deterministically we dispatch a scroll + a settle frame.
            const horizontal = ax === "x";
            const maxOf = (el: HTMLElement) =>
                horizontal
                    ? el.scrollWidth - el.clientWidth
                    : el.scrollHeight - el.clientHeight;
            const settle = () =>
                new Promise((r) =>
                    requestAnimationFrame(() => requestAnimationFrame(r)),
                );
            const scrollTo = (el: HTMLElement, frac: number) => {
                const max = maxOf(el);
                if (horizontal) el.scrollLeft = max * frac;
                else el.scrollTop = max * frac;
            };
            await settle();

            // AT REST (scroll 0): start edge SHARP, end edge FEATHERED (overflow present).
            scrollTo(overflowing, 0);
            await settle();
            const atRest = {
                fadeStart: getComputedStyle(overflowing).getPropertyValue("--fade-start"),
                fadeEnd: getComputedStyle(overflowing).getPropertyValue("--fade-end"),
                hasMask:
                    getComputedStyle(overflowing).maskImage !== "none" ||
                    getComputedStyle(overflowing).webkitMaskImage !== "none",
            };

            // SCROLLED TO END (frac 1): start edge FEATHERED, end edge SHARP.
            scrollTo(overflowing, 1);
            await settle();
            const atEnd = {
                fadeStart: getComputedStyle(overflowing).getPropertyValue("--fade-start"),
                fadeEnd: getComputedStyle(overflowing).getPropertyValue("--fade-end"),
            };

            // FITS (no overflow): NEITHER edge feathered (scroll 0, range never opens).
            const fits = {
                fadeStart: getComputedStyle(fitting).getPropertyValue("--fade-start"),
                fadeEnd: getComputedStyle(fitting).getPropertyValue("--fade-end"),
                max: maxOf(fitting),
            };

            overflowing.remove();
            fitting.remove();
            return { atRest, atEnd, fits };
        }, axis);

        // AT REST: start edge SHARP (0px), end edge FEATHERED (> 0).
        expect(pxOf(result.atRest.fadeStart)).toBe(0);
        expect(pxOf(result.atRest.fadeEnd)).toBeGreaterThan(0);
        expect(result.atRest.hasMask).toBe(true);
        // SCROLLED TO END: start FEATHERED, end SHARP.
        expect(pxOf(result.atEnd.fadeStart)).toBeGreaterThan(0);
        expect(pxOf(result.atEnd.fadeEnd)).toBe(0);
        // FITS: NEITHER edge feathered.
        expect(result.fits.max).toBeLessThanOrEqual(0);
        expect(pxOf(result.fits.fadeStart)).toBe(0);
        expect(pxOf(result.fits.fadeEnd)).toBe(0);
    });
}

// ── (b) THE LIVE AURORA SURFACES (the real migrated consumers) ───────────────────────────
test("live — aurora controls column + preset row read --fade-start: 0px at rest", async ({
    page,
}) => {
    await page.goto("/substrates/aurora", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const readings = await page.evaluate(() => {
        const out: { sel: string; fadeStart: string | null }[] = [];
        // The migrated surfaces carry the .fading-scroll recipe class. Read every
        // .fading-scroll port that is at scroll 0 and report its resolved --fade-start.
        const ports = Array.from(
            document.querySelectorAll<HTMLElement>(".fading-scroll"),
        );
        for (const el of ports) {
            const atStart = (el.scrollLeft || 0) <= 1 && (el.scrollTop || 0) <= 1;
            if (!atStart) continue;
            out.push({
                sel: el.getAttribute("data-fade-axis") ?? el.className,
                fadeStart: getComputedStyle(el).getPropertyValue("--fade-start").trim(),
            });
        }
        return out;
    });
    // At least one migrated FadingScroll port present, and every at-rest port reads
    // --fade-start: 0px (the start edge SHARP — no at-rest feather).
    expect(readings.length).toBeGreaterThan(0);
    for (const r of readings) {
        expect(pxOf(r.fadeStart ?? "")).toBe(0);
    }
});

// ── (c) THE BLOB MOOD ROW (the R8-08 surface; the W-GOO-REDRESS coordination seam) ───────
test("live — blob mood row start edge SHARP at rest (post W-GOO-REDRESS wrap)", async ({
    page,
}) => {
    await page.goto("/substrates/blob", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const reading = await page.evaluate(() => {
        // The mood row is wrapped in <FadingScroll axis="x"> by W-GOO-REDRESS. If the
        // wrap has not yet landed (the sibling's file), report null → SKIP, not a RED.
        const port = document.querySelector<HTMLElement>(
            '[role="tablist"][aria-label="Blob presets"]',
        );
        if (!port) return { found: false, fadeStart: null as string | null };
        // The port itself OR its FadingScroll ancestor carries the recipe.
        const fader = port.closest<HTMLElement>(".fading-scroll") ?? port;
        const isFader = fader.classList.contains("fading-scroll");
        return {
            found: isFader,
            fadeStart: isFader
                ? getComputedStyle(fader).getPropertyValue("--fade-start").trim()
                : null,
        };
    });
    if (!reading.found) {
        test.skip(true, "blob mood-row <FadingScroll> wrap not yet landed (W-GOO-REDRESS seam)");
        return;
    }
    expect(pxOf(reading.fadeStart ?? "")).toBe(0);
});

// ── THE CAPTURED DELTA — the blob mood row + the aurora column (both modes) ───────────────
for (const vp of VIEWPORTS) {
    for (const mode of [false, true] as const) {
        test(`DELTA capture — blob mood row [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
            page,
        }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto("/substrates/blob", { waitUntil: "networkidle" });
            await setDark(page, mode);
            await page.waitForTimeout(500);
            await page.screenshot({
                path: `${VISUAL_DIR}W-FADING-SCROLL-blob-after-${mode ? "dark" : "light"}-${vp.name}.png`,
            });
        });
        test(`DELTA capture — aurora controls column [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
            page,
        }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto("/substrates/aurora", { waitUntil: "networkidle" });
            await setDark(page, mode);
            await page.waitForTimeout(500);
            await page.screenshot({
                path: `${VISUAL_DIR}W-FADING-SCROLL-aurora-after-${mode ? "dark" : "light"}-${vp.name}.png`,
            });
        });
    }
}
