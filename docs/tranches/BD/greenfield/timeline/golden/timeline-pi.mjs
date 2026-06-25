// timeline-pi.mjs — the born-RED gate sketch for the GOLDEN timeline.
//
// THROWAWAY SPIKE GATE (docs/tranches/BD/greenfield/timeline/golden/).
// Samples the LIVE rail composite OKLab over the real .paper-field + a real
// scrub-drag frame-series, in BOTH engines (chromium + webkit). Asserts R1–R5
// from GOLDEN.md §9.
//
//   BORN-RED  against the shipped routes:  --target=http://localhost:5173/data/timeline
//   BORN-GREEN against the prototype:      --target=file://…/golden/timeline-golden.html
//
// Run (deps resolve from glass-ui's playwright):
//   node docs/tranches/BD/greenfield/timeline/golden/timeline-pi.mjs --target=<url>
//
// This is a SKETCH — the production π folds into the existing timeline π harness
// (the no-gray discipline + the scrub frame-series), not a new standalone runner.

import { chromium, webkit } from "playwright";

const target =
    process.argv.find((a) => a.startsWith("--target="))?.slice("--target=".length) ??
    "file://" + new URL("./timeline-golden.html", import.meta.url).pathname;

const WARM_HUE = [40, 90];   // OKLab hue window for warm-cream
const C_FLOOR = 0.018;       // the §3 warm-chroma transmissive floor

// sRGB → OKLab (Björn Ottosson). Input 0..255.
function srgbToOklab(r, g, b) {
    const lin = (c) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
    const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
    const C = Math.hypot(a, bb);
    let H = (Math.atan2(bb, a) * 180) / Math.PI;
    if (H < 0) H += 360;
    return { L, C, H };
}

async function sampleComposite(page, selector) {
    // Composite the rail over its field by screenshotting the rail's bbox and
    // averaging the painted pixels (the HONEST painted composite, not getComputedStyle).
    const el = await page.$(selector);
    if (!el) return null;
    const box = await el.boundingBox();
    if (!box) return null;
    const buf = await page.screenshot({
        clip: { x: box.x, y: box.y, width: box.width, height: box.height },
    });
    // decode PNG average in-page via canvas
    const dataUrl = "data:image/png;base64," + buf.toString("base64");
    return await page.evaluate(async (url) => {
        const img = new Image();
        await new Promise((res) => { img.onload = res; img.src = url; });
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; n++; }
        return { r: r/n, g: g/n, b: b/n };
    }, dataUrl);
}

async function runEngine(engine, name) {
    const results = [];
    const assert = (id, ok, detail) => results.push({ id, ok, detail });

    for (const mode of ["light", "dark"]) {
        const browser = await engine.launch();
        const ctx = await browser.newContext({
            colorScheme: mode === "dark" ? "dark" : "light",
            viewport: { width: 900, height: 1200 },
        });
        const page = await ctx.newPage();
        await page.goto(target, { waitUntil: "networkidle" }).catch(() => {});
        if (mode === "dark") {
            await page.evaluate(() => document.body.classList.add("dark")).catch(() => {});
        }
        await page.waitForTimeout(400);

        // R2 field-present
        const fieldCount = await page.$$eval(".paper-field", (els) => els.length).catch(() => 0);
        assert(`R2-field-${mode}`, fieldCount > 0, `paper-field count=${fieldCount}`);

        // R1 + R3 warm-rail composite (try the prototype + the shipped selectors)
        for (const sel of [".timeline-rail.scrub", ".glass-track", ".timeline-rail"]) {
            const px = await sampleComposite(page, sel);
            if (px) {
                const { L, C, H } = srgbToOklab(px.r, px.g, px.b);
                const warm = C >= C_FLOOR && H >= WARM_HUE[0] && H <= WARM_HUE[1];
                assert(`R1-warm-${sel}-${mode}`, warm,
                    `L${L.toFixed(3)} C${C.toFixed(4)} H${H.toFixed(1)} (need C≥${C_FLOOR}, H∈[${WARM_HUE}])`);
                break;
            }
        }

        // R4 liquid-scrub frame-series — drive a real drag, sample head scale mid-flight
        const scrubFrames = await page.evaluate(async () => {
            const head = document.getElementById("head") || document.querySelector('[role="slider"]');
            const rail = document.getElementById("scrub") || head?.closest(".timeline-rail,.glass-track");
            if (!head || !rail) return null;
            const r = rail.getBoundingClientRect();
            const pt = (x) => ({ clientX: r.left + x, clientY: r.top + r.height/2, pointerId: 1, bubbles: true });
            head.dispatchEvent(new PointerEvent("pointerdown", pt(r.width*0.2)));
            const frames = [];
            for (let i = 1; i <= 12; i++) {
                window.dispatchEvent(new PointerEvent("pointermove", pt(r.width*(0.2 + 0.6*i/12))));
                await new Promise((res) => requestAnimationFrame(res));
                const cs = getComputedStyle(head).transform;  // matrix(a,b,c,d,e,f)
                const m = cs.match(/matrix\(([^)]+)\)/);
                let sx = 1, sy = 1;
                if (m) { const v = m[1].split(",").map(Number); sx = Math.hypot(v[0],v[1]); sy = Math.hypot(v[2],v[3]); }
                frames.push({ sx, sy });
            }
            window.dispatchEvent(new PointerEvent("pointerup", pt(r.width*0.8)));
            return frames;
        }).catch(() => null);

        if (scrubFrames && scrubFrames.length) {
            const squished = scrubFrames.some((f) => Math.abs(f.sx - f.sy) > 0.02);
            const volPreserving = scrubFrames.every((f) => Math.abs(f.sx * f.sy - 1) < 0.06);
            assert(`R4-squish-${mode}`, squished, `max|sx-sy|=${Math.max(...scrubFrames.map(f=>Math.abs(f.sx-f.sy))).toFixed(3)}`);
            assert(`R4-volpreserve-${mode}`, volPreserving, `scrub frames vol-preserving`);
        } else {
            assert(`R4-squish-${mode}`, false, "no scrub frames (stiff/translate-only thumb)");
        }

        // R5 congruence — segmented gap > 0
        const segGap = await page.$eval(".seg, .segmented-track", (el) => getComputedStyle(el).gap).catch(() => "0px");
        assert(`R5-seg-gap-${mode}`, parseFloat(segGap) > 0, `segmented gap=${segGap}`);

        await browser.close();
    }

    return { engine: name, results };
}

(async () => {
    const out = [];
    for (const [eng, nm] of [[chromium, "chromium"], [webkit, "webkit"]]) {
        try { out.push(await runEngine(eng, nm)); }
        catch (e) { out.push({ engine: nm, error: String(e) }); }
    }
    let pass = 0, fail = 0;
    for (const e of out) {
        console.log(`\n── ${e.engine} ──`);
        if (e.error) { console.log("  ENGINE ERROR:", e.error); continue; }
        for (const r of e.results) {
            console.log(`  ${r.ok ? "GREEN" : "RED  "} ${r.id} — ${r.detail}`);
            r.ok ? pass++ : fail++;
        }
    }
    console.log(`\nTOTAL: ${pass} green / ${fail} red  (target=${target})`);
    process.exit(fail > 0 ? 1 : 0);
})();
