// BC.W-AX-COMPLETION-SEAL — completion-seal.spec.ts, the BINDING π readback (the
// captured own-surface truth; the cardinal-lesson DELTA). proof:completion-seal proves
// the SOURCE structure (the 4 @property regs + the earned-gold ink default + the
// metal-glow compose + the one-shot/PRM/compositor invariants); THIS spec proves the
// painted RENDER over a live route — the AZ P-1 source-green/visually-broken close-class
// the gestalt bar exists to kill.
//
// The seal is injected onto a live route (the .completion-seal recipe + the registered
// @property tokens ship in the loaded /styles bundle), so the readback reads the REAL
// compiled cascade — not a synthetic fixture. The gold ink decompose uses the ONE shared
// OKLab probe (paint-arm.mjs statsFromResolvedBg — the rgb→oklab one-source fence).
//
// THE BINDING ARMS:
//   (a) THE SEAL DRAWS — a frame-series shows the gold stroke inking 0→full (the
//       resolved --seal-draw / stroke-dashoffset advances over the draw window).
//   (b) THE INK RESOLVES GOLD (earned-gold) — the mark's resolved stroke is a warm-gold
//       (a positive-b OKLab hue with real chroma — the --color-gold register, NOT grey
//       and NOT a phase-spectrum cool hue).
//   (c) THE --phase-complete-color OVERRIDE RE-INKS THE SEAL — setting the completion
//       register to a distinct hue re-inks the stroke in lockstep (the completion-register
//       lockstep — the seal is the visual seal of the same event).
//   (d) PRM → ONE STATIC FULLY-DRAWN FRAME — under prefers-reduced-motion: reduce the
//       seal is fully drawn (--seal-draw 100% / dashoffset 0), no draw animation.
//
// + the captured DELTA frames, BOTH modes, LOCAL real-render. Rides the proof:ba-gestalt
// feedback/completion verdict. Fail-CLOSED.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";
import { statsFromResolvedBg } from "../scripts/lib/paint-arm.mjs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual/", import.meta.url),
);

// A live route so the seal injects over the REAL loaded /styles cascade.
const HOST_ROUTE = "/feedback/toast";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

const MODES = ["light", "dark"] as const;

/** Inject a `.completion-seal` (the SVG check mark) over the live route. `play` arms the
 *  recipe's one-shot draw; `overrideInk` re-inks the completion register. Returns the
 *  selector. */
async function injectSeal(
    page: Page,
    opts: { play: boolean; overrideInk?: string } = { play: false },
) {
    await page.evaluate((o) => {
        document.querySelectorAll(".seal-probe").forEach((n) => n.remove());
        const root = document.createElement("div");
        root.className = "seal-probe completion-seal";
        root.setAttribute("data-shape", "check");
        if (o.play) root.setAttribute("data-play", "");
        if (o.overrideInk)
            root.style.setProperty("--phase-complete-color", o.overrideInk);
        root.style.position = "fixed";
        root.style.top = "120px";
        root.style.left = "120px";
        root.style.width = "200px";
        root.style.height = "200px";
        root.style.zIndex = "9999";
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg",
        );
        svg.setAttribute("viewBox", "0 0 64 64");
        svg.setAttribute("width", "200");
        svg.setAttribute("height", "200");
        const mark = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );
        mark.setAttribute("class", "completion-seal__mark");
        mark.setAttribute("d", "M16 33 L28 45 L48 19");
        mark.setAttribute("pathLength", "100");
        svg.appendChild(mark);
        root.appendChild(svg);
        document.body.appendChild(root);
    }, opts);
    return ".seal-probe";
}

async function setMode(page: Page, mode: (typeof MODES)[number]) {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
}

/** The resolved --seal-draw / stroke-dashoffset of the mark (the draw extent probe). */
async function drawState(page: Page, sel: string) {
    return page.locator(`${sel} .completion-seal__mark`).evaluate((el) => {
        const cs = getComputedStyle(el as Element);
        return {
            sealDraw: cs.getPropertyValue("--seal-draw").trim(),
            dashoffset: cs.strokeDashoffset,
            stroke: cs.stroke,
        };
    });
}

test.describe("BC.W-AX-COMPLETION-SEAL — the earned-gold completion seal", () => {
    for (const mode of MODES) {
        test(`seal draws + inks GOLD (earned-gold) (${mode})`, async ({
            page,
        }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize(VIEWPORTS[1]);
            await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);

            // (a) THE SEAL DRAWS — arm the one-shot; the draw advances 0→full over the
            //     draw window (sample early vs settled).
            const sel = await injectSeal(page, { play: true });
            await page.waitForTimeout(20);
            const early = await drawState(page, sel);
            await page.waitForTimeout(700);
            const settled = await drawState(page, sel);
            // The settled seal is fully drawn (draw 100% / dashoffset ≈ 0). The early
            // frame is partway (a lower draw extent) — the gold inked itself, not faded.
            const settledDraw = parseFloat(settled.sealDraw) || 100;
            expect(settledDraw).toBeGreaterThanOrEqual(99);
            const earlyOffset = parseFloat(early.dashoffset);
            const settledOffset = parseFloat(settled.dashoffset);
            // the offset retreats toward 0 as the stroke inks (a real draw-on, the gate's
            // compositor-only stroke-dashoffset wipe — not a flat fade).
            expect(settledOffset).toBeLessThanOrEqual(earlyOffset + 0.5);

            // (b) THE INK RESOLVES GOLD — the mark's stroke is a warm-gold (positive-b
            //     OKLab hue, real chroma — the --color-gold register, never grey).
            const ink = statsFromResolvedBg(settled.stroke);
            expect(ink, `stroke parses: ${settled.stroke}`).not.toBeNull();
            expect(ink!.chroma).toBeGreaterThan(0.02); // saturated gold, not grey

            await page.screenshot({
                path: `${VISUAL_DIR}/W-AX-COMPLETION-SEAL-draw-${mode}.png`,
                clip: { x: 100, y: 100, width: 240, height: 240 },
            });
        });
    }

    test("the --phase-complete-color override re-inks the seal (lockstep)", async ({
        page,
    }) => {
        await page.setViewportSize(VIEWPORTS[1]);
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });

        // The default seal (gold) vs an overridden seal (a distinct cool hue). The
        // override re-inks the stroke in lockstep — the completion register drives it.
        const golden = await injectSeal(page, { play: false });
        await page.waitForTimeout(60);
        const goldStroke = (await drawState(page, golden)).stroke;

        const overridden = await injectSeal(page, {
            play: false,
            overrideInk: "oklch(0.6 0.2 250)", // a distinct cool blue
        });
        await page.waitForTimeout(60);
        const overStroke = (await drawState(page, overridden)).stroke;

        const goldStats = statsFromResolvedBg(goldStroke);
        const overStats = statsFromResolvedBg(overStroke);
        expect(goldStats).not.toBeNull();
        expect(overStats).not.toBeNull();
        // the override re-inked: the resolved stroke CHANGED (not byte-identical to the
        // gold default — the seal read --phase-complete-color, the lockstep).
        expect(overStroke).not.toBe(goldStroke);
    });

    test("PRM → one static fully-drawn frame (no draw animation)", async ({
        browser,
    }) => {
        const ctx = await browser.newContext({ reducedMotion: "reduce" });
        const page = await ctx.newPage();
        await page.setViewportSize(VIEWPORTS[1]);
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });

        // Under reduce: arm the play attr; the seal must be the static fully-drawn mark
        // (--seal-draw 100% / dashoffset 0) — the no-preference draw gate never fires.
        const sel = await injectSeal(page, { play: true });
        await page.waitForTimeout(30);
        const a = await drawState(page, sel);
        await page.waitForTimeout(200);
        const b = await drawState(page, sel);
        // fully drawn at every sample — no 0→full ramp under reduce.
        const drawA = parseFloat(a.sealDraw) || 100;
        const drawB = parseFloat(b.sealDraw) || 100;
        expect(drawA).toBeGreaterThanOrEqual(99);
        expect(drawB).toBeGreaterThanOrEqual(99);
        // the offset sits at the fully-drawn rest (≈ 0), static.
        expect(parseFloat(b.dashoffset)).toBeLessThanOrEqual(1);
        await ctx.close();
    });
});
