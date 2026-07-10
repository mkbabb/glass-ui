// GOLDEN spike — de-risk the boldest mechanism: R1 "device-free thumbnails ALWAYS
// render, byte-identical Chrome/Safari" via the SHIPPED `auroraFallbackGround(config)`.
//
// THE THESIS UNDER TEST (GOLDEN §3 / §4.1 / R1):
//   The preset gallery never needs a WebGL/WebGPU device for a preview. Feeding each
//   real preset's config to the shipped `auroraFallbackGround` yields a colorful,
//   per-preset-DISTINCT CSS field (background-image + background-color) with zero GL —
//   so the gallery CANNOT be blank, and the cartoon deal CANNOT break on WebKit.
//
// If this spike is RED, the whole "never blank, Safari-perfect" leg of the GOLDEN is
// unfounded and the design must fall back to a live bake (the fragile path). If GREEN,
// the boldest mechanism is de-risked against the REAL primitive + the REAL presets.
//
// Run: npx vitest run docs/tranches/BD/greenfield/configurator-presentation/golden/tier0-render.spike.test.ts
//
// Throwaway greenfield spike. No src/ change. Imports the real shipped composable +
// the real demo presets — no mocks, no re-implemented math.

import { describe, expect, it } from "vitest";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { auroraFallbackGround } from "../../../../../../src/components/custom/aurora/composables/auroraFallbackGround";
import { PRESETS, PRESET_KEYS, PRESET_META } from "../../../../../../demo/stories/substrates/aurora/presets";

const HERE = dirname(fileURLToPath(import.meta.url));

// The grey-skeleton floor: a shimmer skeleton is ~achromatic. A real preset field must
// clear a small chroma floor (max channel − min channel, on 0..1) to read as "colorful".
const GREY_CHROMA_FLOOR = 0.04;

function parseRgb(s: string): [number, number, number] {
    const m = s.match(/rgb\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    if (!m) throw new Error(`not rgb: ${s}`);
    return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
}
function chromaOf([r, g, b]: [number, number, number]): number {
    return Math.max(r, g, b) - Math.min(r, g, b);
}
// A coarse hue bucket (0..11) off the dominant RGB ordering — enough to assert the set
// spans ≥2 distinct hue families (the R1 "≥2 distinct hues" bar).
function hueBucket([r, g, b]: [number, number, number]): number {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min < 1e-4) return -1; // achromatic
    let h: number;
    if (max === r) h = ((g - b) / (max - min)) % 6;
    else if (max === g) h = (b - r) / (max - min) + 2;
    else h = (r - g) / (max - min) + 4;
    h = (h * 60 + 360) % 360;
    return Math.floor(h / 30); // 12 buckets
}

describe("GOLDEN spike — Tier-0 device-free preset thumbnails (R1)", () => {
    const grounds = PRESET_KEYS.map((key) => ({
        key,
        meta: PRESET_META[key],
        ground: auroraFallbackGround(PRESETS[key], { grid: 8 }),
    }));

    it("produces a ground for EVERY preset with ZERO GL device (no throw)", () => {
        expect(grounds.length).toBeGreaterThanOrEqual(13);
        for (const { ground } of grounds) {
            expect(ground.backgroundColor).toMatch(/^rgb\(/i);
            expect(ground.backgroundImage.length).toBeGreaterThan(0);
            // The metrics the gate measures the faithfulness against.
            expect(ground.metrics.mean).toBeGreaterThan(0);
        }
    });

    it("every preset's base fill is COLORFUL — clears the grey-skeleton chroma floor", () => {
        const failing: string[] = [];
        for (const { key, ground } of grounds) {
            const c = chromaOf(parseRgb(ground.backgroundColor));
            if (c <= GREY_CHROMA_FLOOR) failing.push(`${key} (chroma ${c.toFixed(3)})`);
        }
        // The born-RED on HEAD is 13 grey skeletons; the GOLDEN floor is: no grey tiles.
        expect(failing, `grey/blank tiles: ${failing.join(", ")}`).toEqual([]);
    });

    it("the SET spans ≥2 distinct hue families (presets are visually distinguishable)", () => {
        const buckets = new Set(
            grounds.map(({ ground }) => hueBucket(parseRgb(ground.backgroundColor))).filter((b) => b >= 0),
        );
        expect(buckets.size).toBeGreaterThanOrEqual(2);
    });

    it("is DETERMINISTIC — a re-run reproduces the same ground byte-for-byte (Chrome⇄Safari parity)", () => {
        for (const { key } of grounds) {
            const a = auroraFallbackGround(PRESETS[key], { grid: 8 });
            const b = auroraFallbackGround(PRESETS[key], { grid: 8 });
            expect(a.backgroundColor).toBe(b.backgroundColor);
            expect(a.backgroundImage).toBe(b.backgroundImage);
        }
    });

    it("emits an HTML proof page (open in Chrome AND Safari — device-free, must match)", () => {
        const cells = grounds
            .map(({ key, meta, ground }) => {
                const c = chromaOf(parseRgb(ground.backgroundColor)).toFixed(3);
                return `
    <figure class="tile">
      <div class="well" style="background-color:${ground.backgroundColor};background-image:${ground.backgroundImage};"></div>
      <figcaption><b>${meta.label}</b><span>${meta.sub}</span><em>chroma ${c}</em></figcaption>
    </figure>`;
            })
            .join("");
        const html = `<!doctype html><meta charset="utf-8">
<title>GOLDEN spike — Tier-0 device-free preset thumbnails</title>
<style>
  :root { color-scheme: light dark; }
  body { margin:0; font:14px/1.4 -apple-system,system-ui,sans-serif;
    background:light-dark(#f4efe7,#1a1512); color:light-dark(#2a231d,#f0e8df);
    padding:24px; }
  h1 { font-size:clamp(28px,5vw,56px); letter-spacing:-0.015em; margin:0 0 4px; }
  p.note { opacity:.7; margin:0 0 20px; max-width:60ch; }
  .grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); }
  .tile { margin:0; border-radius:16px; overflow:hidden;
    /* warm-cream glass-ish plate (GOLDEN §5 tile re-skin, approximate for the spike) */
    background:light-dark(rgba(241,234,222,.55),rgba(46,38,32,.6));
    border:1px solid light-dark(rgba(255,255,255,.5),rgba(255,255,255,.08));
    box-shadow:3px 3px 0 light-dark(rgba(40,30,20,.18),rgba(0,0,0,.5)); }
  .well { aspect-ratio:16/10; background-size:cover; background-position:center; }
  figcaption { display:flex; flex-direction:column; gap:1px; padding:8px 12px; }
  figcaption b { font-weight:600; }
  figcaption span,figcaption em { font-size:11px; opacity:.65; font-style:normal; }
  figcaption em { opacity:.45; }
</style>
<h1>Tier-0 device-free preset thumbnails</h1>
<p class="note">Each well is <code>auroraFallbackGround(preset)</code> — pure CSS
background, ZERO WebGL/WebGPU device. Open this file in <b>Chrome AND Safari</b>: the
fields must render colorful, per-preset-distinct, and byte-identical. This is the
GOLDEN R1 thesis (the gallery can never be blank; the cartoon deal can never break on
WebKit) de-risked against the real shipped primitive + the real presets.</p>
<div class="grid">${cells}
</div>`;
        const out = join(HERE, "tier0-proof.html");
        writeFileSync(out, html, "utf-8");
        expect(html.length).toBeGreaterThan(1000);
        // eslint-disable-next-line no-console
        console.log(`\n[spike] proof page → ${out}\n`);
    });
});
