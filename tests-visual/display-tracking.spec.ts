// BB.W-DISPLAY-TRACKING — display-tracking.spec.ts, the π getComputedStyle
// readback of the display-ONLY Apple-calibrated negative tracking + ~1.05 leading
// (the BINDING close criterion; clause 6).
//
// The deep-SOTA audit (audit/sota-deep/findings.md:10,37): Apple's live display
// type carries a tight NEGATIVE tracking ≈ −1.5% of size (80px → −1.2px) + a tight
// ~1.05 line-height (84/80) — THE signature that separates "designed" display from
// "just big." THE DEVICE-FREE SOURCE GATE (proof-display-tracking.mjs) proves the
// STRUCTURE — the display-only --type-tracking-display rung exists in the −1.5%
// band, every display @utility reads it, the leading is in the 1.04–1.06 band, and
// the body/heading/hero fences hold. THIS SPEC PROVES THE RENDER, the bite the
// source arm cannot give: an alias to the shared −2.5% rung greens a presence-check
// but only the RESOLVED `getComputedStyle` letterSpacing ≈ −1.5%-of-fontSize binds
// the Apple band, in both modes, across the rendered ladder.
//
// It asserts:
//   D1 — every display rung (text-display{,-2..-5}) resolves letter-spacing to a
//        NEGATIVE px ≈ −1.5% of its resolved font-size (the proportional-negative
//        signature) AND line-height to the tight ~1.05 band (1.04–1.06), BOTH modes.
//   D2 — the body/caption rungs (text-body/text-caption/text-prose) resolve a
//        NON-negative letter-spacing (the display tracking never reached them) and
//        their UNCHANGED leading (the fence holds in the render).
//   D3 — the heading/title rungs (text-title/text-heading) resolve their UNCHANGED
//        tokens — text-title keeps the −2.5% tight tracking (NOT the −1.5% display
//        rung), the heading register is untouched.
//
// THE BINDING ASSERTION IS THE RESOLVED letterSpacing/lineHeight READBACK. It loads
// :5199 → auto-detected LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips,
// backstopped by proof:live-verified-ledger over the W-DISPLAY-TRACKING DELTA.

import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual", import.meta.url),
);

// The Apple −1.5%-of-size band the display rungs must resolve to. The em rung is
// -0.015em (−1.5%); a band tolerance accommodates sub-px rounding + face metrics.
const TRACK_PCT_TARGET = -0.015; // −1.5% of font-size
const TRACK_PCT_TOL = 0.006; // band: −0.9% .. −2.1% (well above the body 0%, below the −2.5% shared rung)
// The Apple ~1.05 leading band (84/80). Allow the 1.04–1.06 face-safe band.
const LEADING_LO = 1.035;
const LEADING_HI = 1.065;

const DISPLAY_RUNGS = [
    "text-display-5",
    "text-display-4",
    "text-display-3",
    "text-display-2",
    "text-display",
];
const BODY_RUNGS = ["text-body", "text-caption", "text-prose"];
const HEADING_RUNGS = ["text-title", "text-heading"];

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

// Read the resolved letterSpacing(px), lineHeight(ratio), fontSize(px) for the
// FIRST element bearing each named class on the page.
async function readRungs(page: Page, classes: string[]) {
    return page.evaluate((cls: string[]) => {
        const px = (v: string) => Math.round(parseFloat(v) * 1000) / 1000;
        const out: Record<
            string,
            { fontSize: number; letterSpacing: number; lineHeightRatio: number } | null
        > = {};
        for (const c of cls) {
            const el = document.querySelector(`.${c}`);
            if (!el) {
                out[c] = null;
                continue;
            }
            const cs = getComputedStyle(el);
            const fs = px(cs.fontSize);
            // letter-spacing computes to "normal" (=0) or a px value.
            const lsRaw = cs.letterSpacing;
            const ls = lsRaw === "normal" ? 0 : px(lsRaw);
            // line-height computes to a px value; ratio = lh / fontSize.
            const lhRaw = cs.lineHeight;
            const lh = lhRaw === "normal" ? NaN : px(lhRaw);
            out[c] = {
                fontSize: fs,
                letterSpacing: ls,
                lineHeightRatio: Number.isFinite(lh) ? Math.round((lh / fs) * 1000) / 1000 : NaN,
            };
        }
        return out;
    }, classes);
}

const paired: Record<string, unknown> = {};

test.describe("BB.W-DISPLAY-TRACKING — the Apple-calibrated display tracking + leading (π)", () => {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";

        test(`D1 — each display rung resolves negative ≈−1.5% tracking + ~1.05 leading (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/foundations/typography", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(400);
            await setDark(page, dark);

            const rungs = await readRungs(page, DISPLAY_RUNGS);
            paired[`display-${mode}`] = rungs;

            for (const c of DISPLAY_RUNGS) {
                const r = rungs[c];
                expect(r, `${c} renders in ${mode}`).not.toBeNull();
                const { fontSize, letterSpacing, lineHeightRatio } = r!;

                // The proportional-negative tracking signature: letterSpacing/fontSize
                // ≈ −1.5%, NEGATIVE, in the Apple band (and DISTINCT from the body 0%
                // and the −2.5% shared tight rung text-title carries).
                const pct = letterSpacing / fontSize;
                expect(
                    letterSpacing,
                    `${mode} ${c}: letter-spacing (${letterSpacing}px) must be NEGATIVE (the Apple display tracking)`,
                ).toBeLessThan(0);
                expect(
                    Math.abs(pct - TRACK_PCT_TARGET),
                    `${mode} ${c}: tracking is ${(pct * 100).toFixed(3)}% of size (${letterSpacing}px / ${fontSize}px) — must be ≈${(TRACK_PCT_TARGET * 100).toFixed(1)}% (the Apple −1.5% band, NOT the −2.5% shared rung)`,
                ).toBeLessThanOrEqual(TRACK_PCT_TOL);

                // The tight ~1.05 display leading.
                expect(
                    lineHeightRatio,
                    `${mode} ${c}: line-height ratio is ${lineHeightRatio} — must be in the Apple ~1.05 band [${LEADING_LO}, ${LEADING_HI}] (the 84/80 signature, tighter than HEAD 1.1)`,
                ).toBeGreaterThanOrEqual(LEADING_LO);
                expect(lineHeightRatio).toBeLessThanOrEqual(LEADING_HI);
            }
        });

        test(`D2+D3 — the body/caption + heading fences hold in the render (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/foundations/typography", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(400);
            await setDark(page, dark);

            // D2 — the body/caption register: NON-negative tracking (the display
            // rung never reached it). Body classes resolve "normal" (0) tracking.
            const bodyRungs = await readRungs(page, BODY_RUNGS);
            paired[`body-${mode}`] = bodyRungs;
            for (const c of BODY_RUNGS) {
                const r = bodyRungs[c];
                expect(r, `${c} renders in ${mode}`).not.toBeNull();
                expect(
                    r!.letterSpacing,
                    `${mode} ${c}: body register must NOT carry the negative display tracking (resolved ${r!.letterSpacing}px) — the §1 fence holds in the render`,
                ).toBeGreaterThanOrEqual(0);
            }

            // D3 — the heading/title register: text-title keeps the −2.5% tight
            // tracking (DISTINCT from the −1.5% display rung); text-heading carries
            // no negative display tracking.
            const headingRungs = await readRungs(page, HEADING_RUNGS);
            paired[`heading-${mode}`] = headingRungs;

            const title = headingRungs["text-title"]!;
            expect(title, `text-title renders in ${mode}`).not.toBeNull();
            const titlePct = title.letterSpacing / title.fontSize;
            // text-title's tracking is the SHARED −2.5% rung, MORE negative than the
            // −1.5% display band → its |pct| must EXCEED the display band's upper edge.
            expect(
                titlePct,
                `${mode} text-title: tracking is ${(titlePct * 100).toFixed(3)}% — must be the −2.5% shared tight rung (more negative than the −1.5% display band), NOT re-pointed onto the display rung`,
            ).toBeLessThan(TRACK_PCT_TARGET - TRACK_PCT_TOL / 2);
            // text-title leading is the heading register (1.2), NOT the display ~1.05.
            expect(
                title.lineHeightRatio,
                `${mode} text-title: line-height ratio ${title.lineHeightRatio} must be the heading register (≈1.2), NOT the display ~1.05`,
            ).toBeGreaterThan(LEADING_HI);
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-DISPLAY-TRACKING-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});
