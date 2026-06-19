// BC.W-GLASS-GLOW-FIX — glass-glow-fix.spec.ts, the live PAINT-BOUNDS π readback (the
// Atlas A-8 unbounded radial-halo root: the breath-scaled aura must NOT bleed past its
// host content box).
//
// THE DISEASE (the §0 evidence pass, audit/visual/W-GLASS-GLOW-FIX-EVIDENCE.md): the
// `.pulse-aura` glow layer is `position:absolute; inset:0; transform: scale(→1.15 / 1.22
// vivid)` with NO clip; when its host is `overflow: visible` (a viz/showcase tile, a card
// without `overflow:clip`, a bare relative wrapper) the breath-scaled radial SPILLS past
// the host edge and over-paints whatever sits behind/beside it — the spurious unbounded
// halo the Atlas confirms over-painting a glass surface on its viz routes.
//
// THE FIX (this spec, the π arm): the aura LAYER carries `overflow: clip`, so its scaled
// radial background is clipped to its OWN inset:0 box and NEVER bleeds into the MARGIN
// BAND just outside its host. The binding paint truth: over the real `/display/pulse`
// aura showcase, forced to its breath PEAK (scale 1.15) with a high-contrast fill, a
// pixel scan of the margin band OUTSIDE the host shows NO aura-colored bleed; AND the
// aura's intentional halo still READS inside its host (the fix BOUNDS, it does not delete
// the glow). Born-RED on the rooted defect (without the clip the scaled radial bleeds into
// the margin band); GREEN only on the bounded aura this wave ratifies. BOTH modes.
//
// WebKit/Safari: the aura is a plain `background: radial-gradient()` clipped by `overflow:
// clip` — both are cross-engine (no `backdrop-filter: url()`), so the no-bleed bound paints
// identically on Safari (the source form is the cross-engine fence; the two chromium
// viewport projects carry the live readback, mirroring glass-identity.spec.ts).
//
// pngjs decode (tests-visual ships only @playwright/test + pngjs): the screenshot captures
// exactly the displayed pixels. No second colour-math — a margin-band bleed is a raw
// channel-diff against the page background (an aura pixel is FAR from the page bg; a clean
// margin pixel matches it).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PNG } from "pngjs";

const ROUTE = "/display/pulse";

// The aura breath PEAK — the 50% keyframe stop (scheme-motion.css --animate-ambient-pulse-
// scale-max). Forcing the peak STATICALLY makes the bound deterministic (no animation-frame
// race): at 1.15× the unclipped radial bleeds the FARTHEST past the host edge — the worst
// case the bound must hold against.
const AURA_PEAK_SCALE = 1.15;
// A high-contrast aura fill so a bleed pixel is unambiguous against the page background.
const AURA_PROBE_COLOR = "rgb(255, 0, 0)";
// |dR|+|dG|+|dB| over the page bg = an aura bleed pixel (mirrors blob-warm-default's
// COLOR_DIFF_THRESHOLD). A clean margin pixel matches the page bg (diff ≈ 0); a red aura
// bleed pixel reads ≥ ~200. 90 cleanly separates the two with AA headroom.
const BLEED_DIFF_THRESHOLD = 90;
// The margin band width (px) just OUTSIDE the host the bound must keep clean. A 1.15× scale
// on a ~48px aura pushes the radial ~3.6px past each edge; an 8px band captures the bleed
// without reaching neighboring demo content.
const MARGIN_BAND = 8;

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

/**
 * Pin the FIRST in-situ `.pulse-aura` to its breath PEAK with a high-contrast probe fill,
 * give its host an explicit margin so the band outside it is page-background (not adjacent
 * demo content), and return the host + aura geometry. The aura's `overflow` is NOT touched
 * — the wave's `overflow: clip` (or its absence at HEAD) is what we measure.
 *
 * BC.W-GLASS-GLOW-FIX architecture: the breath SCALE rides the `.pulse-aura::before`
 * CHILD (the radial paint), driven by the `--pulse-aura-breath-scale` registered property;
 * the `.pulse-aura` element is the UNSCALED `overflow: clip` boundary at `inset:0`. We pin
 * the peak by writing the scale property (the keyframe's own knob) + force the high-
 * contrast probe radial onto the `::before` via an injected rule (a pseudo-element's
 * background is not inline-settable). The clip lives on the element; the scaled child is
 * what the clip must bound.
 */
async function pinAuraPeak(page: Page): Promise<{
    overflow: string;
    host: { x: number; y: number; w: number; h: number };
    auraRadial: boolean;
} | null> {
    return page.evaluate(
        ({ scale, color }) => {
            const aura = document.querySelector(".pulse-aura");
            if (!(aura instanceof HTMLElement)) return null;
            const host = aura.parentElement;
            if (!(host instanceof HTMLElement)) return null;

            const auraStyle = getComputedStyle(aura);
            // The radial halo paints on the `::before` child (the scaled paint layer).
            const auraRadial = /radial-gradient/.test(
                getComputedStyle(aura, "::before").backgroundImage,
            );
            const overflow = auraStyle.overflowX; // overflow:clip resolves overflowX/Y to "clip"

            // Force the breath peak via the registered scale knob (the keyframe's own
            // drive), kill the animation so the frame is static, and force a high-contrast
            // probe radial onto the `::before` via an injected rule (the worst-case bleed —
            // a pseudo background is not inline-settable). Isolate the host with a margin so
            // the band outside it is the page background.
            aura.setAttribute("data-aura-probe", "1");
            const probe = document.createElement("style");
            probe.textContent = `
                [data-aura-probe] { animation: none !important; opacity: 1 !important; }
                [data-aura-probe]::before {
                    background: radial-gradient(ellipse at 50% 50%, ${color} 0%, ${color} 60%, transparent 100%) !important;
                    transform: scale(${scale}) !important;
                }`;
            document.head.appendChild(probe);
            host.style.margin = "24px";

            const r = host.getBoundingClientRect();
            return {
                overflow,
                host: { x: r.x, y: r.y, w: r.width, h: r.height },
                auraRadial,
            };
        },
        { scale: AURA_PEAK_SCALE, color: AURA_PROBE_COLOR },
    );
}

/** The page background RGB — the most-common 16-step-quantized colour (immune to a stray
 *  dark pixel; mirrors blob-warm-default's modalBackground). Samples ONLY pixels OUTSIDE
 *  the host rect: a host-filling ambient aura (the correct A-8-bounded read — the radial
 *  fills its host box) makes the probe colour dominate the host INTERIOR, so a whole-frame
 *  mode would pick the PROBE colour as "background" and invert the bleed verdict. The
 *  genuine page bg lives in the margin region around the host, so we count there. */
function pageBackground(png: PNG, hostInShot?: { x: number; y: number; w: number; h: number }): [number, number, number] {
    const { data, width } = png;
    const counts = new Map<number, number>();
    for (let i = 0; i < data.length; i += 4) {
        if (hostInShot) {
            const px = (i / 4) % width;
            const py = Math.floor(i / 4 / width);
            const insideHost =
                px >= hostInShot.x && px < hostInShot.x + hostInShot.w && py >= hostInShot.y && py < hostInShot.y + hostInShot.h;
            if (insideHost) continue; // the host interior is the filled aura, not page bg
        }
        const key = ((data[i]! >> 4) << 8) | ((data[i + 1]! >> 4) << 4) | (data[i + 2]! >> 4);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    let best = 0;
    let bestKey = 0;
    for (const [k, c] of counts) {
        if (c > best) {
            best = c;
            bestKey = k;
        }
    }
    return [((bestKey >> 8) & 15) * 16 + 8, ((bestKey >> 4) & 15) * 16 + 8, (bestKey & 15) * 16 + 8];
}

function diffFromBg(data: Buffer, i: number, bg: [number, number, number]): number {
    return Math.abs(data[i]! - bg[0]) + Math.abs(data[i + 1]! - bg[1]) + Math.abs(data[i + 2]! - bg[2]);
}

/**
 * Is this pixel the AURA PROBE colour (red) having escaped its box? The probe fill is
 * `rgb(255,0,0)`, so a genuine radial-bleed pixel is RED-DOMINANT (R ≫ G and R ≫ B), even
 * alpha-faded over the page bg. We test red-dominance (NOT a bare diff-from-bg) so the bound
 * counts ONLY the aura escaping — not the dark demo CAPTION/content text that a tight mobile
 * layout pushes into the band (near-black text is far-from-bg but is NOT an aura spill; the
 * A-8 defect is specifically the radial halo over-painting past the host, which is RED here).
 */
function isAuraBleed(data: Buffer, i: number): boolean {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    // Red-biased AND meaningfully red (a faint AA edge or a grey/dark pixel fails this).
    return r > 110 && r - g > 60 && r - b > 60;
}

/**
 * Count aura-bleed pixels in the MARGIN BAND — the ring of width MARGIN_BAND just OUTSIDE
 * the host rect, captured in the same screenshot. A RED-DOMINANT pixel in that band is the
 * radial having escaped its box (the A-8 bleed). With the breath scale bounded (the
 * `::before` scaled child clipped by the unscaled `overflow: clip` aura) the band carries no
 * aura red; without the bound the 1.15× radial bleeds RED in (born-RED). The red-dominance
 * test (not a bare diff-from-bg) keeps dark demo text out of the count on tight layouts.
 */
function marginBleedCount(
    png: PNG,
    bg: [number, number, number],
    hostInShot: { x: number; y: number; w: number; h: number },
): number {
    const { data, width, height } = png;
    let bleed = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const insideHost =
                x >= hostInShot.x && x < hostInShot.x + hostInShot.w && y >= hostInShot.y && y < hostInShot.y + hostInShot.h;
            if (insideHost) continue; // the contained halo INSIDE the host is allowed (G3)
            const inBand =
                x >= hostInShot.x - MARGIN_BAND &&
                x < hostInShot.x + hostInShot.w + MARGIN_BAND &&
                y >= hostInShot.y - MARGIN_BAND &&
                y < hostInShot.y + hostInShot.h + MARGIN_BAND;
            if (!inBand) continue;
            const i = (y * width + x) * 4;
            // A genuine A-8 spill is the RED radial escaping — diff-from-bg AND red-dominant
            // (the latter fences out dark demo text on tight mobile layouts).
            if (diffFromBg(data, i, bg) >= BLEED_DIFF_THRESHOLD && isAuraBleed(data, i)) bleed++;
        }
    }
    return bleed;
}

test.describe("glass-glow-fix (the breath-scaled aura is BOUND to its host — no A-8 bleed)", () => {
    for (const mode of ["light", "dark"] as const) {
        test(`${mode}: the breath-scaled aura does NOT bleed past its host content box`, async ({ page }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);

            const pinned = await pinAuraPeak(page);
            expect(pinned, `${ROUTE}: no .pulse-aura found (the aura showcase must paint at least one aura)`).not.toBeNull();

            // G1/G2 (source twin): the bound is PRESENT — the aura layer is clipped.
            expect(
                pinned!.overflow,
                `${ROUTE} (${mode}): the .pulse-aura computed overflow is "${pinned!.overflow}", not "clip" — the breath-scaled radial is unbounded (the Atlas A-8 root). The bound must live on the aura LAYER so it holds on every host overflow.`,
            ).toBe("clip");

            // G3 (preserve): the aura STILL paints its radial halo (the fix bounds, not deletes).
            expect(
                pinned!.auraRadial,
                `${ROUTE} (${mode}): the .pulse-aura no longer paints a radial-gradient halo — the fix must BOUND the aura, not delete its glow.`,
            ).toBe(true);

            // The binding PAINT truth: screenshot the host + margin band and assert NO aura
            // bleed in the band OUTSIDE the host. Clip the screenshot to the host±margin so
            // the scan region is tight + the page bg dominates.
            await page.waitForTimeout(60);
            const sx = Math.max(0, Math.floor(pinned!.host.x - MARGIN_BAND - 4));
            const sy = Math.max(0, Math.floor(pinned!.host.y - MARGIN_BAND - 4));
            const sw = Math.ceil(pinned!.host.w + (MARGIN_BAND + 4) * 2);
            const sh = Math.ceil(pinned!.host.h + (MARGIN_BAND + 4) * 2);
            const shot = await page.screenshot({ clip: { x: sx, y: sy, width: sw, height: sh } });
            const png = PNG.sync.read(shot);
            // the host rect in screenshot-local coordinates.
            const hostInShot = {
                x: pinned!.host.x - sx,
                y: pinned!.host.y - sy,
                w: pinned!.host.w,
                h: pinned!.host.h,
            };
            // Derive the page bg from the margin region OUTSIDE the host (the host interior
            // is the filled ambient aura — a whole-frame mode would mistake the probe colour
            // for the bg and invert the verdict).
            const bg = pageBackground(png, hostInShot);
            const bleed = marginBleedCount(png, bg, hostInShot);

            // A handful of AA pixels at the host edge are tolerable; a spilled radial paints
            // a soft DISC of many bleed pixels. The bound holds iff the band is essentially
            // clean. (Unclipped at 1.15× the band fills with hundreds of red bleed pixels.)
            expect(
                bleed,
                `${ROUTE} (${mode}): ${bleed} aura-bleed pixels in the ${MARGIN_BAND}px margin band OUTSIDE the host — the breath-scaled radial escaped its box (the spurious A-8 halo). With overflow:clip on the aura the band is clean. Born-RED on the unclipped aura; GREEN only on the bounded one.`,
            ).toBeLessThanOrEqual(12);
        });
    }
});
