// BA.W-EMISSION — emission.spec.ts, the BINDING π readback (the captured own-surface
// truth; the cardinal-lesson DELTA). proof:emission proves the producer-side BUILT-CSS
// (the backing rules SHIP); THIS spec proves the painted RENDER — the source-green/
// visually-broken gap is the P-1 close-class BA exists to fix, so the live
// getComputedStyle/getBoundingClientRect readback is the binding truth, never the
// build-grep alone.
//
// THE BINDING ARMS (the live demo cascade, so the PRECOMPILED shipped rules resolve):
//   (a) THE SELECT COLLISION-BOUND — opening the demo Select computes a REAL maxHeight
//       (NOT "none"), and the content box BOTTOMS INSIDE the viewport with inner scroll
//       available. On a SHORT viewport the --reka-popper-available-height tighten clamps
//       the panel below the trigger; the precompiled [data-slot=select-content] rule is
//       the ONLY way maxHeight resolves (the dead arbitrary-bracket class never painted).
//   (b) THE OPEN GROWS FROM THE ANCHOR — the content's transform-origin is set (the WO-2
//       honor: the panel grows from the trigger edge, not a center sweep).
//   (c) THE SLIDER SIZE AXIS — a standard size=md slider measures a REAL track-height
//       ≈1.25rem (20px), NOT the 6px fallback; the spectrum thumb is ≤0.5× its track
//       (the slim value.js bar). The precompiled [data-size] rule is the only backing.
//   [BK #55 · 2026-08-07] ARM (d) THE WATERCOLOR GHOST (BC.W-VIZ-WATERCOLOR) IS STRUCK
//       WITH ITS SUBJECT. It asserted that a seeded `variant=ghost` dot renders the blob
//       silhouette as a dashed SVG <ellipse> stroke matching the solid dot of the same
//       seed. `WatercolorDot` RELOCATED to value.js at BK #55 and the `ghost register`
//       StorySection went with it, so `[data-testid="watercolor-ghost-pair"]`,
//       `[data-testid="watercolor-swatch"]` and `.watercolor-ghost-stroke` have ZERO
//       producers repo-wide — the arm could never fail again, which is the masking class
//       (#18 arm-(c): the masking class dies with its subject; ⊕²⁵: an unwired gate is
//       ABSENT, never GREEN). This cut created that deadness and carries it out.
//
// + the captured DELTA frames written to the DELTA dir. Fail-CLOSED: an unbounded
// dropdown / a 6px md track reds the readback, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);

function frame(name: string): string {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return `${VISUAL_DIR}${name}`;
}

// ── (a)+(b) THE SELECT COLLISION-BOUND ───────────────────────────────────────────────
test.describe("BA.W-EMISSION — the Select collision-bound ships + bounds in-viewport", () => {
    // A SHORT viewport forces the --reka-popper-available-height tighten to clamp the
    // panel; the precompiled bound is the only path to a real maxHeight + an in-viewport
    // bottom + inner scroll.
    test.use({ viewport: { width: 520, height: 460 } });

    test("the opened Select content computes a real maxHeight, bottoms in-viewport, grows from the anchor", async ({
        page,
    }) => {
        await page.goto("/forms/select", { waitUntil: "networkidle" });

        // Open the first Select (the font-family trigger).
        const trigger = page.locator('[id="sel-font"]');
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();

        const content = page.locator('[data-slot="select-content"]').first();
        await content.waitFor({ state: "visible", timeout: 5000 });

        // (a) the bound is a REAL value, not "none" (the HEAD born-RED state).
        const readback = await content.evaluate((el) => {
            const cs = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                maxHeight: cs.maxHeight,
                overflowY: cs.overflowY,
                transformOrigin: cs.transformOrigin,
                bottom: rect.bottom,
                top: rect.top,
                height: rect.height,
                scrollHeight: el.scrollHeight,
                clientHeight: el.clientHeight,
                viewportH: window.innerHeight,
            };
        });
        console.log("[emission] select bound:", JSON.stringify(readback));

        expect(readback.maxHeight, "Select maxHeight must resolve (not none)").not.toBe(
            "none",
        );
        // The maxHeight is a positive px value.
        const maxH = parseFloat(readback.maxHeight);
        expect(maxH, "Select maxHeight must be a positive px bound").toBeGreaterThan(0);

        // (a) the content bottoms INSIDE the viewport (a small tolerance for sub-px).
        expect(
            readback.bottom,
            "Select content must bottom inside the viewport",
        ).toBeLessThanOrEqual(readback.viewportH + 2);

        // (a) inner scroll is available (overflow-y auto/scroll).
        expect(["auto", "scroll"]).toContain(readback.overflowY);

        // (b) the transform-origin is set (the anchor-honored open; not the empty default).
        expect(
            readback.transformOrigin,
            "the content transform-origin must be set (the anchor-honored grow)",
        ).toBeTruthy();

        await page.screenshot({ path: frame("W-EMISSION-select-bound-light.png") });
    });
});

// ── (c) THE SLIDER SIZE AXIS ──────────────────────────────────────────────────────────
test.describe("BA.W-EMISSION — the Slider size axis ships as real geometry", () => {
    test("a standard size=md slider measures a real ≈1.25rem track (not 6px); the spectrum thumb is slim", async ({
        page,
    }) => {
        await page.goto("/forms/slider", { waitUntil: "networkidle" });

        // The variant×size matrix renders aria-label="standard md" etc.
        const stdMd = page.locator('[aria-label="standard md"]').first();
        await stdMd.scrollIntoViewIfNeeded();
        await stdMd.waitFor({ state: "visible" });

        const trackH = await stdMd.evaluate((root) => {
            const track = root.querySelector(".slider-track") as HTMLElement | null;
            if (!track) return null;
            const cs = getComputedStyle(track);
            return {
                trackHeight: parseFloat(cs.height),
                trackVar: getComputedStyle(root)
                    .getPropertyValue("--slider-track-height")
                    .trim(),
            };
        });
        console.log("[emission] slider std md:", JSON.stringify(trackH));
        expect(trackH, "standard md slider track must be measurable").not.toBeNull();
        // 1.25rem = 20px at the default 16px root. NOT the 6px (0.375rem) fallback.
        expect(
            trackH!.trackHeight,
            "the standard md track must paint ≈20px (1.25rem), not the 6px fallback",
        ).toBeGreaterThanOrEqual(16);

        // The spectrum thumb is ≤0.5× its track (the slim value.js bar).
        const specMd = page.locator('[aria-label="spectrum md"]').first();
        await specMd.scrollIntoViewIfNeeded();
        const ratio = await specMd.evaluate((root) => {
            const track = root.querySelector(".slider-track") as HTMLElement | null;
            const thumb = root.querySelector(".slider-thumb") as HTMLElement | null;
            if (!track || !thumb) return null;
            const tH = track.getBoundingClientRect().height;
            const thW = thumb.getBoundingClientRect().width;
            return { trackH: tH, thumbW: thW, ratio: tH ? thW / tH : null };
        });
        console.log("[emission] spectrum md thumb:", JSON.stringify(ratio));
        expect(ratio, "spectrum md thumb must be measurable").not.toBeNull();
        if (ratio && ratio.ratio !== null) {
            expect(
                ratio.ratio,
                "the spectrum thumb must be ≤0.5× the track width (the slim bar)",
            ).toBeLessThanOrEqual(0.6);
        }

        await page.screenshot({ path: frame("W-EMISSION-slider-size-light.png") });
    });
});

// ── (d) THE WATERCOLOR GHOST — STRUCK WITH ITS SUBJECT [BK #55 · 2026-08-07] ──────────
// The whole `BA.W-EMISSION / BC.W-VIZ-WATERCOLOR` describe (one test, ~80 lines: the
// dashed-silhouette readback over `[data-testid="watercolor-ghost-pair"]`, its four
// dasharray/stroke-width/border-style assertions, the seeded ghost↔solid border-radius
// match, and the `W-EMISSION-watercolor-ghost-light.png` DELTA frame) is DELETED here.
// `WatercolorDot` RELOCATED to value.js at BK #55; every selector that describe stood on
// has ZERO producers in this repo, so it could no longer fail — a permanent silent PASS.
// The header's arm (d) carries the full record. NOT re-pointed at a stand-in: there is no
// surviving dashed-silhouette surface, and inventing one would preserve the masking class
// rather than kill it (#18 arm-(c) precedent, #19's RT-18G discharge).

// ── (e) THE CVA-FOREGROUND CONTRAST (BI.W-DEMO-SOURCE-SCAN · A11Y-1 / FAM-15) ──────────
// The BINDING render truth of the E-CVA clause: a shipped `<Button tone="destructive">`
// composes the BARE `text-destructive-foreground` label ink over the `bg-destructive`
// fill. Before the demo scanned the `ui/**/index.ts` CVA maps, the bare rule never
// generated, so the label fell to the inherited dark ink over the red (3.57:1 — the born-
// RED). With the demo scan reaching the CVA map, the label resolves --destructive-
// foreground (near-white) and CLEARS WCAG AA (≥4.5:1) in BOTH modes. proof:emission
// asserts the static reach; THIS spec measures the painted contrast (the P-1 close-class).
test.describe("BI.W-DEMO-SOURCE-SCAN — the destructive Button label clears AA (the CVA-foreground emission fix)", () => {
    // WCAG relative luminance + contrast ratio, computed from the painted colors.
    async function labelContrast(page: Page) {
        return page.evaluate(() => {
            const btn = Array.from(document.querySelectorAll("button")).find(
                (b) => (b.textContent || "").trim().toLowerCase() === "destructive",
            ) as HTMLElement | undefined;
            if (!btn) return null;
            const cs = getComputedStyle(btn);
            const parse = (v: string): [number, number, number] | null => {
                const m = v.match(/rgba?\(([^)]+)\)/);
                if (!m) return null;
                const p = m[1].split(",").map((x) => parseFloat(x.trim()));
                return [p[0], p[1], p[2]];
            };
            const fg = parse(cs.color);
            const bg = parse(cs.backgroundColor);
            if (!fg || !bg) return { fg: cs.color, bg: cs.backgroundColor, ratio: null };
            const lum = ([r, g, b]: [number, number, number]) => {
                const f = (c: number) => {
                    const s = c / 255;
                    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
                };
                return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
            };
            const L1 = lum(fg);
            const L2 = lum(bg);
            const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
            return { fg: cs.color, bg: cs.backgroundColor, ratio };
        });
    }

    for (const mode of ["light", "dark"] as const) {
        test(`${mode} mode — the destructive label ink resolves over bg-destructive at ≥4.5:1`, async ({
            page,
        }) => {
            await page.goto("/display/buttons", { waitUntil: "networkidle" });
            await page.evaluate((m) => {
                document.documentElement.classList.toggle("dark", m === "dark");
            }, mode);
            // Let the cascade settle after the theme toggle.
            await page.waitForTimeout(150);

            const readback = await labelContrast(page);
            console.log(`[emission] destructive contrast (${mode}):`, JSON.stringify(readback));
            expect(readback, "the destructive Button must be present").not.toBeNull();
            expect(
                readback!.ratio,
                "the destructive label/fill contrast must be measurable",
            ).not.toBeNull();
            // The bg is the red destructive fill (never transparent — the bare bg-destructive
            // rule generated); the label ink is the resolved --destructive-foreground.
            expect(readback!.bg, "the fill must be the destructive red, not transparent").not.toContain(
                "rgba(0, 0, 0, 0)",
            );
            expect(
                readback!.ratio as number,
                "the destructive label must clear WCAG AA (≥4.5:1) — the CVA-foreground emission fix (was 3.57:1)",
            ).toBeGreaterThanOrEqual(4.5);

            await page.screenshot({
                path: frame(`W-EMISSION-destructive-contrast-${mode}.png`),
            });
        });
    }
});
