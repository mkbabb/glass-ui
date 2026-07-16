// Shared capture evidence primitives: PNG authenticity/dimensions, viewport
// fidelity, source-byte freshness, region statistics, and OKLab decomposition.
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
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

export function isRealPng(path) {
    try {
        if (!existsSync(path) || !statSync(path).isFile()) return false;
        const bytes = readFileSync(path);
        return bytes.length > 1024 && bytes.subarray(0, 4).equals(PNG_MAGIC);
    } catch {
        return false;
    }
}

export function pngDimensions(path) {
    try {
        const bytes = readFileSync(path);
        if (bytes.length < 24 || bytes.subarray(12, 16).toString("ascii") !== "IHDR") return null;
        return { w: bytes.readUInt32BE(16), h: bytes.readUInt32BE(20) };
    } catch {
        return null;
    }
}

export const FABRICATED_MOBILE_WIDTH = 1000;

export function viewportFidelityVerdict(basename, dimensions) {
    if (!/-mobile-/.test(basename) || !dimensions) return { ok: true };
    if (dimensions.w < FABRICATED_MOBILE_WIDTH) return { ok: true };
    return {
        ok: false,
        reason: `${basename} declares a mobile viewport but its IHDR is ${dimensions.w}×${dimensions.h}`,
    };
}

export function baseName(reference) {
    const index = reference.lastIndexOf("/");
    return index === -1 ? reference : reference.slice(index + 1);
}

export function surfaceHash(root, surfacePaths) {
    const chunks = [];
    for (const path of surfacePaths) {
        const absolute = join(root, path);
        if (!existsSync(absolute)) return "";
        chunks.push(readFileSync(absolute));
    }
    return createHash("sha256").update(chunks.join("\n")).digest("hex");
}

export function freshnessVerdict(document, root = ROOT) {
    const pathsHeader = document.match(/<!--\s*surface-paths:\s*([^>]*?)\s*-->/);
    const hashHeader = document.match(/<!--\s*surface-hash:\s*([0-9a-fA-F]{64})\s*-->/);
    if (!pathsHeader?.[1]?.trim() || !hashHeader) return { state: "no-header" };
    const paths = pathsHeader[1].split(",").map((path) => path.trim()).filter(Boolean);
    for (const path of paths) {
        if (!existsSync(join(root, path))) {
            return { state: "stale", reason: `surface path ${path} no longer exists` };
        }
    }
    const declared = hashHeader[1].toLowerCase();
    const current = surfaceHash(root, paths);
    if (current === declared) return { state: "fresh" };
    return {
        state: "stale",
        reason: `surface ${paths.join(",")} changed since capture (${declared.slice(0, 12)} → ${current.slice(0, 12)})`,
    };
}

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
 * @returns {{meanL:number, meanChroma:number, meanAlpha:number, meanA:number, meanB:number, samples:number} | null}
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
        sumA = 0,
        sumB = 0,
        n = 0;
    for (let y = y0; y < y1; y++) {
        const rowBase = y * w * channels;
        for (let x = x0; x < x1; x++) {
            const i = rowBase + x * channels;
            const ok = oklabFromRgb(pixels[i], pixels[i + 1], pixels[i + 2]);
            sumL += ok.L;
            sumChroma += ok.chroma;
            sumA += ok.a;
            sumB += ok.b;
            sumAlpha += channels === 4 ? pixels[i + 3] / 255 : 1;
            n++;
        }
    }
    if (!n) return null;
    return {
        meanL: sumL / n,
        meanChroma: sumChroma / n,
        meanAlpha: sumAlpha / n,
        meanA: sumA / n,
        meanB: sumB / n,
        samples: n,
    };
}

// ── BG.W-PAINT-IS-THE-GATE — the per-region DELTA (defect localization) ───────────
// The Stage-0 ground-freeze adds defect-LOCALIZING decode: where pngRegionStats
// reads ONE region, the delta reads the OKLab divergence BETWEEN two regions of the
// SAME capture. The D5 aberrant-top-bar defect (a full-width horizontal band that
// reads as a distinct slab, NOT composed into the field) is localized as the OKLab
// ΔE between the top-bar region mean and the field region mean — a large ΔE NAMES
// the top bar as the failing region, not "the surface broke." The meanA/meanB
// exposure above is the prerequisite (a chroma-MAGNITUDE-only delta cannot tell a
// warm field from a cold-metallic one at equal chroma; the D2 hue axis needs a/b).

/**
 * The PURE per-region OKLab delta between two region-stat objects (the D5 top-bar
 * localization math). `dE` is the OKLab ΔE = √(ΔL² + Δa² + Δb²) between the two
 * regions' mean colours — the magnitude a divergent slab registers. PURE over two
 * stats objects (no PNG) so the gate self-test exercises it deterministically with
 * zero on-disk fixture (the text-patch discipline — no committed binary in a diff).
 *
 * @param {{meanL:number, meanChroma:number, meanA:number, meanB:number}} a
 * @param {{meanL:number, meanChroma:number, meanA:number, meanB:number}} b
 * @returns {{dL:number, dChroma:number, dE:number}}
 */
export function regionStatsDelta(a, b) {
    const dL = (a.meanL ?? 0) - (b.meanL ?? 0);
    const dA = (a.meanA ?? 0) - (b.meanA ?? 0);
    const dB = (a.meanB ?? 0) - (b.meanB ?? 0);
    const dChroma = (a.meanChroma ?? 0) - (b.meanChroma ?? 0);
    return { dL, dChroma, dE: Math.hypot(dL, dA, dB) };
}

/**
 * The on-disk top-bar/field delta (BG.W-PAINT-IS-THE-GATE D5 localization). Reads
 * two probe regions of ONE capture via pngRegionStats (the SINGLE decoder — no
 * second IDAT inflate) and returns regionStatsDelta plus the two region stats. The
 * gate feeds `dE` into the roster row's expect band as the `topDelta` axis. `null`
 * when either region is undecodable/empty.
 *
 * @param {string} absPath absolute path to the captured PNG
 * @param {{x:number, y:number, w:number, h:number}} regionA the top-bar region
 * @param {{x:number, y:number, w:number, h:number}} regionB the field region
 * @returns {{dL:number, dChroma:number, dE:number, regionA:object, regionB:object} | null}
 */
export function pngRegionDelta(absPath, regionA, regionB) {
    const a = pngRegionStats(absPath, regionA);
    const b = pngRegionStats(absPath, regionB);
    if (!a || !b) return null;
    return { ...regionStatsDelta(a, b), regionA: a, regionB: b };
}

// ── BG.W-COMPOSITED-GESTALT-GATE — the DOMINANT-HUE histogram (measure the WHOLE) ──
// The Stage-0 kernel is a MEAN over a box (pngRegionStats' scalar meanL/meanChroma). A
// mean is fooled by a warm-token-over-achromatic-page COMPOSITE: the mean a/b of a warm
// plate + a flat grey field averages toward neutral, so a "near-gray" composited whole
// (the greenfield GF1 — a shipped Button rest fill oklab chroma 0.0138 read "NEAR-GRAY"
// over a flat page, re-diagnosed BY HAND because the mean-L box could not see it) reads
// as an acceptable mean while the EYE reads grey. The SHARPER kernel bins the region's
// per-pixel OKLab hue (chroma-WEIGHTED) into a histogram + reports the DOMINANT hue
// FAMILY: a two-peaked warm+cold field no longer averages to a passing neutral (its
// dominant family is whichever peak carries the most chroma-weight), and a flat
// achromatic page has NO colour weight → the dominant family is NEUTRAL, not warm → the
// composited-reads-grey defect is caught at the whole, not the part. ONE colour source
// (oklabFromRgb) + ONE decoder (decodePngRgba) — no second math, no second inflate.

/**
 * Classify an OKLab a/b pair (+ its chroma) into a hue FAMILY. A sample BELOW
 * `chromaFloor` is NEUTRAL regardless of angle — the grey-slab discriminator: the
 * historical oklab(0.695 0.002 0.006) slab has chroma 0.0063 at a warm-ISH 71.6° angle,
 * so ANGLE ALONE would mis-read it warm; the chroma floor sends it NEUTRAL (the CLAUDE.md
 * "chroma alone cannot separate grey from cream" fact made a gate predicate). Above the
 * floor the OKLab hue angle θ = atan2(b, a) ∈ [0,360) buckets into warm (the amber/gold/
 * warm-red identity arc [15,115], where the warm-cream `--foreground` H62-75° lives),
 * green, cold (cyan/blue/violet — the cerulean field-warmth catch, GB-5), or magenta.
 * @param {number} a OKLab a
 * @param {number} b OKLab b
 * @param {number} chroma OKLab chroma √(a²+b²)
 * @param {number} [chromaFloor=0.010]
 * @returns {{family:"neutral"|"warm"|"green"|"cold"|"magenta", angleDeg:number, warm:boolean}}
 */
export function hueFamily(a, b, chroma, chromaFloor = 0.01) {
    let angleDeg = (Math.atan2(b, a) * 180) / Math.PI;
    if (angleDeg < 0) angleDeg += 360;
    if (!(chroma >= chromaFloor)) return { family: "neutral", angleDeg, warm: false };
    let family;
    if (angleDeg >= 15 && angleDeg <= 115) family = "warm";
    else if (angleDeg > 115 && angleDeg <= 200) family = "green";
    else if (angleDeg > 200 && angleDeg <= 330) family = "cold";
    else family = "magenta"; // (330,360] ∪ [0,15)
    return { family, angleDeg, warm: family === "warm" };
}

/**
 * The DOMINANT-HUE histogram over a set of OKLab samples. PURE over an array of
 * {a, b, chroma} (so a gate self-test feeds synthetic pixels with NO PNG — the
 * text-patch discipline, no committed binary fixture). Accumulates chroma-WEIGHT per
 * family (a saturated pixel dominates the histogram; a near-neutral pixel barely moves
 * it) + a `bins`-slot hue histogram (default 12 × 30°). The dominant family is the
 * max-weight COLOURED family UNLESS the coloured pixels are a small fraction of the
 * region (`colouredFraction < neutralCeiling`) — then NEUTRAL dominates (a flat
 * achromatic field has no dominant hue). warm = dominantFamily === "warm";
 * warmFraction = warmWeight / (all coloured weight) — a two-peaked warm+cold field's
 * warmFraction drops below the floor even when warm barely wins the argmax (the mean
 * can't see that; the histogram can).
 * @param {{a:number,b:number,chroma:number}[]} samples
 * @param {{bins?:number, chromaFloor?:number, neutralCeiling?:number}} [opts]
 * @returns {{dominantFamily:string, warm:boolean, warmFraction:number, coldFraction:number, neutralFraction:number, colouredFraction:number, angleDegPeak:number, hist:number[], samples:number}}
 */
export function dominantHue(samples, opts = {}) {
    const bins = opts.bins ?? 12;
    const chromaFloor = opts.chromaFloor ?? 0.01;
    // The coloured-fraction floor below which the region has NO dominant hue (neutral).
    const neutralCeiling = opts.neutralCeiling ?? 0.35;
    const weight = { warm: 0, green: 0, cold: 0, magenta: 0 };
    const hist = new Array(bins).fill(0);
    let coloured = 0;
    let n = 0;
    for (const s of samples) {
        n++;
        const hf = hueFamily(s.a, s.b, s.chroma, chromaFloor);
        if (hf.family === "neutral") continue;
        coloured++;
        weight[hf.family] += s.chroma;
        const bin = Math.min(bins - 1, Math.floor((hf.angleDeg / 360) * bins));
        hist[bin] += s.chroma;
    }
    const totalWeight = weight.warm + weight.green + weight.cold + weight.magenta;
    const colouredFraction = n ? coloured / n : 0;
    let peakBin = 0;
    for (let i = 1; i < bins; i++) if (hist[i] > hist[peakBin]) peakBin = i;
    const angleDegPeak = totalWeight > 0 ? (peakBin + 0.5) * (360 / bins) : 0;
    let dominantFamily = "neutral";
    if (colouredFraction >= neutralCeiling && totalWeight > 0)
        dominantFamily = Object.entries(weight).sort((x, y) => y[1] - x[1])[0][0];
    return {
        dominantFamily,
        warm: dominantFamily === "warm",
        warmFraction: totalWeight ? weight.warm / totalWeight : 0,
        coldFraction: totalWeight ? weight.cold / totalWeight : 0,
        neutralFraction: n ? 1 - colouredFraction : 1,
        colouredFraction,
        angleDegPeak,
        hist,
        samples: n,
    };
}

/**
 * The DOMINANT-HUE histogram over a captured PNG REGION (BG.W-COMPOSITED-GESTALT-GATE).
 * Decodes the region via the SINGLE decoder (decodePngRgba — no second IDAT inflate),
 * collects each pixel's OKLab {a,b,chroma}, and runs dominantHue. Returns the histogram
 * stats + the region mean L/chroma/a/b (the chroma-ceiling + delta axes). null when the
 * PNG is undecodable or the region empty — the caller treats null as a degenerate read.
 * @param {string} absPath
 * @param {{x:number,y:number,w:number,h:number}} region fractional box ∈ [0,1]
 * @param {{bins?:number, chromaFloor?:number, neutralCeiling?:number}} [opts]
 * @returns {{dominantFamily:string, warm:boolean, warmFraction:number, coldFraction:number, neutralFraction:number, meanL:number, meanChroma:number, meanA:number, meanB:number, angleDegPeak:number, samples:number} | null}
 */
export function pngRegionHueHistogram(absPath, region, opts = {}) {
    const dec = decodePngRgba(absPath);
    if (!dec) return null;
    const { w, h, channels, pixels } = dec;
    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const x0 = Math.floor(clamp01(region.x) * w);
    const y0 = Math.floor(clamp01(region.y) * h);
    const x1 = Math.min(w, Math.ceil(clamp01(region.x + region.w) * w));
    const y1 = Math.min(h, Math.ceil(clamp01(region.y + region.h) * h));
    if (x1 <= x0 || y1 <= y0) return null;
    const samples = [];
    let sumL = 0,
        sumChroma = 0,
        sumA = 0,
        sumB = 0,
        n = 0;
    for (let y = y0; y < y1; y++) {
        const rowBase = y * w * channels;
        for (let x = x0; x < x1; x++) {
            const i = rowBase + x * channels;
            const ok = oklabFromRgb(pixels[i], pixels[i + 1], pixels[i + 2]);
            samples.push({ a: ok.a, b: ok.b, chroma: ok.chroma });
            sumL += ok.L;
            sumChroma += ok.chroma;
            sumA += ok.a;
            sumB += ok.b;
            n++;
        }
    }
    if (!n) return null;
    const dom = dominantHue(samples, opts);
    return {
        dominantFamily: dom.dominantFamily,
        warm: dom.warm,
        warmFraction: dom.warmFraction,
        coldFraction: dom.coldFraction,
        neutralFraction: dom.neutralFraction,
        angleDegPeak: dom.angleDegPeak,
        meanL: sumL / n,
        meanChroma: sumChroma / n,
        meanA: sumA / n,
        meanB: sumB / n,
        samples: n,
    };
}

// ── The PART-probe recalibration — dominant-hue divergence over the real route REGION ──
// (BG.W-COMPOSITED-GESTALT-GATE, F8.2 — "mean-L box → dominant-hue histogram over real
// route REGION"). The topBar / edgeCast PART predicates used to read a MEAN-L OKLab ΔE box
// (pngRegionDelta) between a PART region and the field. That box FALSE-TRIPS on geometry
// OUTSIDE the composited whole: the browser page-top MARGIN (white in light / near-black in
// dark — a legitimate achromatic page chrome, NOT an aberrant slab: measured topDelta 0.184
// light / 0.499 dark on the warm dock capture, both > the 0.14 topBarCeiling), and a benign
// glass-card↔backdrop LUMINANCE STEP at a field edge — none of which is a HUE defect. The
// dominant-hue histogram reads the region's actual hue FAMILY: a NEUTRAL part (an achromatic
// margin — dominantFamily "neutral") is the ABSENCE of an aberrant colour slab, and a part
// reading the SAME family as the field is CONSISTENT; only a part reading a DIVERGENT
// COLOURED family (cold/magenta/green with real chroma weight, DIFFERENT from the warm field)
// is the genuine D5 aberrant-slab defect the box conflated with those benign luminance steps.
// So the recalibrated gate reads the divergence FIRST and only measures the mean-L ΔE when the
// part is a genuinely divergent COLOURED slab. ONE decoder + ONE hue kernel — no second math.

/**
 * PURE classifier — is a PART region a DIVERGENT COLOURED slab relative to the field? Over
 * two dominant-hue results (so a gate self-test feeds synthetic histograms with NO PNG).
 * A NEUTRAL part (an achromatic page margin) is NOT divergent (no slab); a part reading the
 * SAME dominant family as the field is NOT divergent (consistent); only a coloured part whose
 * dominant family DIFFERS from the field's is divergent.
 * @param {{dominantFamily?:string} | null} partHist
 * @param {{dominantFamily?:string} | null} fieldHist
 * @returns {boolean}
 */
export function hueDivergent(partHist, fieldHist) {
    if (!partHist || !fieldHist) return false;
    const part = partHist.dominantFamily;
    if (!part || part === "neutral") return false; // achromatic margin — no aberrant slab
    return part !== fieldHist.dominantFamily; // a genuinely divergent COLOURED slab
}

/**
 * The dominant-hue divergence of a PART region vs the FIELD region of ONE capture. Reads both
 * regions' dominant-hue histograms via the SINGLE decoder (pngRegionHueHistogram — no second
 * IDAT inflate) and classifies via hueDivergent. Returns the verdict + both families (for the
 * gate's facts + a legible RED). null when the field region is undecodable.
 * @param {string} absPath
 * @param {{x:number,y:number,w:number,h:number}} partRegion
 * @param {{x:number,y:number,w:number,h:number}} fieldRegion
 * @param {{bins?:number, chromaFloor?:number, neutralCeiling?:number}} [opts]
 * @returns {{divergent:boolean, partFamily:string, fieldFamily:string, partColouredFraction:number} | null}
 */
export function pngRegionHueDivergence(absPath, partRegion, fieldRegion, opts = {}) {
    const field = pngRegionHueHistogram(absPath, fieldRegion, opts);
    if (!field) return null;
    const part = pngRegionHueHistogram(absPath, partRegion, opts);
    if (!part) return { divergent: false, partFamily: "unread", fieldFamily: field.dominantFamily, partColouredFraction: 0 };
    return {
        divergent: hueDivergent(part, field),
        partFamily: part.dominantFamily,
        fieldFamily: field.dominantFamily,
        partColouredFraction: 1 - part.neutralFraction,
    };
}
