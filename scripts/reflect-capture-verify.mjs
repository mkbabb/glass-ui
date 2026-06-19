// reflect-capture-verify — the SHARED capture-rigor leaf (BB.W-GESTALT-GATE2,
// extended BC.W-GESTALT-FIRST).
//
// The single import surface for the content/dimension/viewport/freshness/PIXEL
// verify mechanisms the reflection + paint gates run:
//   - proof:live-verified-ledger  (the cardinal-lesson PROGRESS ledger gate)
//   - proof:ba-gestalt            (the holistic per-surface PIXEL acceptance gate)
//   - scripts/lib/paint-arm.mjs   (BC.W-PAINT-GATE — imports the OKLab decompose)
//
// W-GESTALT-GATE2 transposed the ledger's proven rigor (IHDR dimension read,
// fabricated-viewport reconcile, content-hash freshness) onto the gestalt gate.
// The transposition is a SHARE, NOT a second copy: the four pure verify functions
// are minted ONCE in proof-live-verified-ledger.mjs (AX.W62 → AY.W-LIVE1 →
// AZ.W-GATES D6) and RE-EXPORTED here so both gates import from one place (the
// W-CANVAS-UNIFY discipline — a second `pngDimensions`/`surfaceHash` copy is the
// exact AV.W1 two-copy class the carve waves drain, machine-barred by
// proof:ba-gestalt G3's no-re-roll clause). There is exactly ONE
// `createHash("sha256")` over surface paths in the tree (the ledger's surfaceHash).
//
// BC.W-GESTALT-FIRST adds the PIXEL reader: `pngRegionStats(path, region) →
// {meanL, meanChroma, meanAlpha}` — the ONE PNG-decoder leaf (zlib IDAT inflate +
// scanline unfilter, reusing the ledger's IHDR read for dimensions; NO second
// decoder/hash). The OKLab decompose `oklabFromRgb` lives HERE, exported — it is
// the single color-math source BC.W-PAINT-GATE's `scripts/lib/paint-arm.mjs`
// imports for its live computed-style probe (the gate reads the LIVE surface, the
// gestalt reads the captured PNG; both share the OKLab decompose — one math
// source, the canvas-unify single-source discipline applied to colour).
//
// The ledger module guards its top-level run behind an `import.meta.url ===
// process.argv[1]` check, so importing it for these pure functions never runs the
// sibling gate (no console spam, no artifact write, no process.exit on import).
//
// This leaf adds ONE gestalt-only helper the ledger does NOT carry: the SYMMETRIC
// `-desktop-`-below-floor verdict (G2's desktop-fidelity arm). It is here, not in
// the ledger, so the ledger's own `viewportFidelityVerdict` call sites stay
// behaviour-identical (the ledger never gained the desktop arm).

import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { pngDimensions } from "./proof-live-verified-ledger.mjs";

export {
    isRealPng,
    pngDimensions,
    viewportFidelityVerdict,
    baseName,
    surfaceHash,
    freshnessVerdict,
    FABRICATED_MOBILE_WIDTH,
} from "./proof-live-verified-ledger.mjs";

// The desktop full-viewport floor: a `-desktop-` basename whose IHDR width is
// BELOW this is a non-desktop crop mislabeled desktop (the symmetric fabrication
// the gestalt gate's WEAK-2/G2 clause applies). 1280 is the CAPTURE-PROTOCOL
// desktop floor; a real desktop full-page capture is ≥ it (the BA reflect captures
// are 2880px @2× = comfortably above). It sits ABOVE FABRICATED_MOBILE_WIDTH (1000)
// so the two verdicts never overlap on a single capture.
export const DESKTOP_FULL_WIDTH = 1280;

/**
 * The GESTALT-gate fabricated-viewport verdict — the ledger's `-mobile-`-only
 * verdict PLUS the symmetric `-desktop-`-below-floor arm (G2). A `-mobile-` basename
 * with a desktop-class IHDR width REDs; a `-desktop-` basename below the desktop
 * floor REDs symmetrically. PURE over a {basename, dims} pair so the gate's self-test
 * can exercise both arms deterministically with no on-disk fixture.
 *
 * @param {string} basename
 * @param {{w:number, h:number} | null} dims
 * @param {(b:string, d:object|null)=>{ok:boolean,reason?:string}} mobileVerdict the
 *   shared `-mobile-` verdict (injected so the ledger's exported source is the ONE
 *   mobile-fidelity authority — no re-implementation of the mobile arm here).
 * @returns {{ok:true} | {ok:false, reason:string}}
 */
export function viewportFidelityVerdictBoth(basename, dims, mobileVerdict) {
    if (/-mobile-/.test(basename)) return mobileVerdict(basename, dims);
    if (/-desktop-/.test(basename)) {
        if (!dims) return { ok: true }; // unreadable IHDR ≠ fabrication; the real-PNG bar already held
        if (dims.w < DESKTOP_FULL_WIDTH)
            return {
                ok: false,
                reason: `${basename} carries the -desktop- viewport token but its IHDR is ${dims.w}×${dims.h} — below the desktop full-viewport floor (${DESKTOP_FULL_WIDTH}px) — a crop/mobile mislabeled desktop`,
            };
        return { ok: true };
    }
    return { ok: true };
}

// ── BC.W-GESTALT-FIRST — the OKLab decompose (the ONE colour-math source) ────────
// The single sRGB→OKLab decompose in the tree. BC.W-PAINT-GATE's
// scripts/lib/paint-arm.mjs imports THIS for its live computed-style probe (the
// gate reads the LIVE surface), and the gestalt PNG reader below calls it (the
// gestalt reads the captured PNG) — one math source, the canvas-unify single-
// source discipline applied to colour. The matrices are the canonical Björn
// Ottosson OKLab values (the same the tests-visual/_cohere-debug.spec.ts +
// blob*-capture specs carry); a second decompose elsewhere REDs by the canvas-unify
// precedent. Chroma is the OKLab a/b magnitude √(a²+b²) — 0 is perfectly neutral
// (grey), >0 is tinted (warm cream reads chroma ≥ 0.01).
/**
 * @param {number} r8 0-255 sRGB red
 * @param {number} g8 0-255 sRGB green
 * @param {number} b8 0-255 sRGB blue
 * @returns {{L:number, a:number, b:number, chroma:number}}
 */
export function oklabFromRgb(r8, g8, b8) {
    const lin = (c8) => {
        const c = c8 / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const r = lin(r8),
        g = lin(g8),
        b = lin(b8);
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l),
        m_ = Math.cbrt(m),
        s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    return { L, a: A, b: B, chroma: Math.hypot(A, B) };
}

// ── BC.W-GESTALT-FIRST — the PNG region pixel reader (the ONE decoder leaf) ───────
// The gestalt gate's G5 pixel clause reads a captured PNG's luminance + chroma +
// alpha at a declared probe region and asserts the stats fall in the roster row's
// expect band (warm-translucent, NOT the grey oklab(0.695) slab). This is the ONLY
// PNG pixel decoder in the tree — it REUSES the ledger's pngDimensions IHDR read
// (no second IHDR parse) and decodes the IDAT via zlib inflate + the 5-filter
// scanline unfilter (PNG spec §9 — None/Sub/Up/Average/Paeth). Supports the two
// colour types a real :5199 screenshot emits at bit-depth 8: truecolor (type 2,
// 3 bytes/px) + truecolor+alpha (type 6, 4 bytes/px). A palette/16-bit/grayscale
// PNG (not a screenshot) returns null — the caller treats null as a degenerate read.

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Paeth predictor (PNG spec §9.4). */
function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a),
        pb = Math.abs(p - b),
        pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
}

/**
 * Decode a PNG to RGBA pixels. Truecolor (type 2) + truecolor+alpha (type 6),
 * bit-depth 8 only (the real-screenshot subset). Returns null for any other shape
 * (palette/16-bit/grayscale/interlaced) — the gate then treats the read as
 * degenerate rather than guessing.
 * @param {string} absPath
 * @returns {{w:number, h:number, channels:number, pixels:Buffer} | null}
 */
function decodePngRgba(absPath) {
    let fd;
    try {
        fd = readFileSync(absPath);
    } catch {
        return null;
    }
    if (fd.length < 8 || !fd.subarray(0, 8).equals(PNG_SIG)) return null;
    const dims = pngDimensions(absPath); // the ledger's IHDR read (no second parse)
    if (!dims || dims.w <= 0 || dims.h <= 0) return null;
    // IHDR fields: width(0) height(4) bitDepth(8) colorType(9) … at the IHDR data
    // start (offset 16 in the file — after sig(8)+len(4)+"IHDR"(4)).
    const bitDepth = fd[24];
    const colorType = fd[25];
    const interlace = fd[28];
    if (bitDepth !== 8 || interlace !== 0) return null;
    let channels;
    if (colorType === 2) channels = 3; // truecolor
    else if (colorType === 6) channels = 4; // truecolor + alpha
    else return null; // palette/grayscale — not a screenshot shape

    // Concatenate every IDAT chunk, then inflate.
    const idat = [];
    let off = 8;
    while (off + 8 <= fd.length) {
        const len = fd.readUInt32BE(off);
        const type = fd.subarray(off + 4, off + 8).toString("ascii");
        const dataStart = off + 8;
        if (type === "IDAT") idat.push(fd.subarray(dataStart, dataStart + len));
        if (type === "IEND") break;
        off = dataStart + len + 4; // skip data + CRC(4)
    }
    if (!idat.length) return null;
    let raw;
    try {
        raw = inflateSync(Buffer.concat(idat));
    } catch {
        return null;
    }

    const { w, h } = dims;
    const stride = w * channels;
    if (raw.length < (stride + 1) * h) return null; // truncated/short inflate
    const pixels = Buffer.alloc(stride * h);
    let prev = Buffer.alloc(stride); // the scanline above (all-zero before row 0)
    for (let y = 0; y < h; y++) {
        const rowStart = y * (stride + 1);
        const filter = raw[rowStart];
        const cur = Buffer.alloc(stride);
        for (let i = 0; i < stride; i++) {
            const x = raw[rowStart + 1 + i];
            const a = i >= channels ? cur[i - channels] : 0; // left
            const b = prev[i]; // up
            const c = i >= channels ? prev[i - channels] : 0; // up-left
            let val;
            switch (filter) {
                case 0:
                    val = x;
                    break;
                case 1:
                    val = x + a;
                    break;
                case 2:
                    val = x + b;
                    break;
                case 3:
                    val = x + ((a + b) >> 1);
                    break;
                case 4:
                    val = x + paeth(a, b, c);
                    break;
                default:
                    return null; // unknown filter — corrupt
            }
            cur[i] = val & 0xff;
        }
        cur.copy(pixels, y * stride);
        prev = cur;
    }
    return { w, h, channels, pixels };
}

/**
 * The PIXEL stats over a declared probe REGION of a captured PNG (BC.W-GESTALT-
 * FIRST G5). Averages OKLab-L, OKLab-chroma, and alpha across the region's pixels.
 * The region is a fractional box {x, y, w, h} ∈ [0,1] (so a roster row declares a
 * surface-relative probe that survives a viewport-size change). A truecolor PNG
 * (no alpha channel) reports meanAlpha 1 (fully opaque — the captured composite is
 * what the eye saw over the real backdrop; the gestalt judges the COMPOSITED read).
 *
 * @param {string} absPath absolute path to the captured PNG
 * @param {{x:number, y:number, w:number, h:number}} region fractional box ∈ [0,1]
 * @returns {{meanL:number, meanChroma:number, meanAlpha:number, samples:number} | null}
 *   null when the PNG cannot be decoded or the region is empty.
 */
export function pngRegionStats(absPath, region) {
    const dec = decodePngRgba(absPath);
    if (!dec) return null;
    const { w, h, channels, pixels } = dec;
    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const x0 = Math.floor(clamp01(region.x) * w);
    const y0 = Math.floor(clamp01(region.y) * h);
    const x1 = Math.min(w, Math.ceil(clamp01(region.x + region.w) * w));
    const y1 = Math.min(h, Math.ceil(clamp01(region.y + region.h) * h));
    if (x1 <= x0 || y1 <= y0) return null;
    let sumL = 0,
        sumChroma = 0,
        sumAlpha = 0,
        n = 0;
    for (let y = y0; y < y1; y++) {
        const rowBase = y * w * channels;
        for (let x = x0; x < x1; x++) {
            const i = rowBase + x * channels;
            const ok = oklabFromRgb(pixels[i], pixels[i + 1], pixels[i + 2]);
            sumL += ok.L;
            sumChroma += ok.chroma;
            sumAlpha += channels === 4 ? pixels[i + 3] / 255 : 1;
            n++;
        }
    }
    if (!n) return null;
    return { meanL: sumL / n, meanChroma: sumChroma / n, meanAlpha: sumAlpha / n, samples: n };
}
