// Pure forward/inverse field mappings for the Aurora atoms door. The consumer schema
// and resolve/config composition live in atoms.ts; this leaf owns the literal field
// classifiers and every mapping they select, and never imports back from the schema.

import { clampBudget } from "../constants/budget";
import {
    MAX_NUCLEI,
    METAL_POLISH_DEFAULT,
    type AuroraConfig,
    type AuroraMedium,
    type OklchStop,
    type WarpMode,
} from "../constants/presets";
import { gamutMapStop } from "./color";

/** The motion field classifier. */
export type AuroraMotionAtom = "still" | "breathing" | "drifting";

/** The deterministic zone-placement classifier. */
export type AuroraZoneArrangement = "scattered" | "composed" | "centred";

/** Linear interpolation over a co-varying axis (the continuous curve, not a LUT). */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/** The motion atom → the three motion fields. */
export interface MotionFields {
    nucleiDrift: number;
    paletteDrift: number;
    warpDrift: number;
    breathDepth: number;
}

/** The calm↔vivid poles for each co-varying COLOR-energy axis. */
export const COLOR_ENERGY = {
    saturation: { calm: 0.85, vivid: 1.2 }, // 0.6..1.3 budget; 0.5→1.0 (default)
    valueVariance: { calm: 0.04, vivid: 0.14 }, // 0..0.3; 0.5→0.09
    breathDepth: { calm: 0.03, vivid: 0.08 }, // 0..0.15; 0.5→0.055
    temperatureShift: { calm: 0.15, vivid: 0.5 }, // the palette warm/cool coupling (folded from the old mood recipe)
    // Chroma-adaptive hue-walk width in degrees. A calm
    // field stays a tight analogous neighbourhood (16°); a vivid field widens the walk to
    // ~44° so the derived ramp carries a real SECOND accent hue (a monochrome ramp reads
    // flat — the "interesting" second note). 0.5 → ~28° (the deriveAurora default).
    hueSpread: { calm: 16, vivid: 44 },
} as const;

export const MOTION_FIELDS: Record<AuroraMotionAtom, MotionFields> = {
    still: { nucleiDrift: 0, paletteDrift: 0, warpDrift: 0, breathDepth: 0 },
    // `breathing` uses actual spatial and chromatic drift.
    // HEAD shipped all three spatial/chromatic drift terms ZERO, so the frag's
    // surviving `col *= 1 + 0.05·breath·0.5` was a ±2.5% global luminance pulse
    // only (gl.readPixels ±1–2/255, SUB-perceptible — the register read DEAD on
    // any calm seed for every consumer). The terms gain SMALL non-zero life — ~1/3
    // of `drifting`'s drift + a touch more breath amplitude — so a calm-seed aurora
    // reads as small-but-perceptible ATMOSPHERIC drift while `breathing` STAYS the
    // CALMEST non-dead register (still < breathing < drifting, the ordering held).
    // The JS motion TABLE only — aurora.frag is UNTOUCHED (the GL fence holds).
    breathing: { nucleiDrift: 0.005, paletteDrift: 0.006, warpDrift: 0.003, breathDepth: 0.06 },
    drifting: { nucleiDrift: 0.015, paletteDrift: 0.015, warpDrift: 0.008, breathDepth: 0.05 },
};

const PHI_INV = 0.61803398875;

/** Deterministic, bounded placement for one to eight color zones. */
export function nucleiPrior(
    count: number,
    arrangement: AuroraZoneArrangement = "composed",
): AuroraConfig["nuclei"] {
    const n = Math.max(1, Math.min(MAX_NUCLEI, Math.round(count)));
    const thirds: [number, number][] = [
        [0.33, 0.33],
        [0.67, 0.67],
        [0.67, 0.33],
        [0.33, 0.67],
        [0.5, 0.33],
        [0.5, 0.67],
        [0.33, 0.5],
        [0.67, 0.5],
    ];

    const placeAt = (i: number): [number, number] => {
        if (arrangement === "scattered") {
            const angle = i * PHI_INV * Math.PI * 2;
            const radius = 0.12 + 0.3 * Math.sqrt((i + 0.5) / n);
            return [
                clampBudget(0.5 + radius * Math.cos(angle), 0.1, 0.9),
                clampBudget(0.5 + radius * Math.sin(angle), 0.1, 0.9),
            ];
        }
        if (arrangement === "centred") {
            if (n === 1) return [0.5, 0.5];
            const angle = (i / n) * Math.PI * 2;
            return [0.5 + 0.12 * Math.cos(angle), 0.5 + 0.12 * Math.sin(angle)];
        }
        return thirds[i % thirds.length]!;
    };

    return Array.from({ length: n }, (_, i) => {
        const [x, y] = placeAt(i);
        return {
            x,
            y,
            radius: 0.5,
            paletteBias: n === 1 ? 0 : i / (n - 1),
            valueBias: (i % 2 === 0 ? 1 : -1) * 0.05,
            driftRadius: 0.045,
            driftPhase: (i * 2.4) % (Math.PI * 2),
        };
    });
}

const SAGE_WHISPER_C = 0.03;

/** Apply the derived palette's bounded chroma counterpoint in place. */
export function applyChromaBracket(
    palette: OklchStop[],
    variance: number,
    counterpoint: boolean,
): void {
    const n = palette.length;
    if (n === 0 || variance <= 0) return;
    const meanC = palette.reduce((sum, stop) => sum + stop.C, 0) / n;
    const marigold = Math.min(0.22, meanC * 1.5);
    const safeC = (L: number, C: number, h: number): number =>
        gamutMapStop({ L, C, h }).C;
    palette.forEach((stop, i) => {
        const pole = i % 2 === 0 ? marigold : SAGE_WHISPER_C;
        stop.C = safeC(
            stop.L,
            clampBudget(lerp(stop.C, pole, variance), 0, 0.4),
            stop.h,
        );
    });
    if (!counterpoint) return;
    let deepest = 0;
    for (let i = 1; i < n; i++) {
        if (palette[i]!.L < palette[deepest]!.L) deepest = i;
    }
    const stop = palette[deepest]!;
    stop.C = safeC(stop.L, SAGE_WHISPER_C, stop.h);
}

/** Organic-boundary classifier: smooth fBm to hybrid to cellular. */
export function warpModeFor(amount: number): WarpMode {
    if (amount < 0.4) return "fbm";
    if (amount < 0.75) return "hybrid";
    return "cellular";
}

/** Expand one bounded noise amount into the coupled boundary fields. */
export function applyNoise(cfg: AuroraConfig, amount: number): void {
    const t = clampBudget(amount, 0, 1);
    cfg.warpAmount = clampBudget(lerp(0.2, 0.6, t), 0, 0.6);
    cfg.warpScale = clampBudget(lerp(1, 2.6, t), 0.5, 3);
    cfg.warpMode = warpModeFor(t);
    cfg.noiseOctaves = (t < 0.5 ? 3 : t < 0.85 ? 4 : 5) as 3 | 4 | 5;
}

// ── MEDIUM: the texture fan-out (textured mediums only) ─────────────────────────

/** The textured medium → its dominant texture knob. Only reached for a textured medium. */
export function applyTexture(
    cfg: AuroraConfig,
    medium: Exclude<AuroraMedium, "smooth">,
    amount: number,
): void {
    const a = clampBudget(amount, 0, 1);
    switch (medium) {
        case "watercolor":
            cfg.wetEdge = a;
            cfg.granulation = a * 0.8;
            break;
        case "pastel":
            cfg.strokeAmount = a;
            cfg.canvasGrain = a * 0.05;
            break;
        case "oil":
        case "vangogh":
            cfg.strokeAmount = a;
            cfg.impasto = a;
            cfg.canvasGrain = a * 0.06;
            break;
        case "oil-pastel":
        // Crayon is a first-class medium (the strokeMode peer route is gone);
        // the atoms-door texture knob is strokeAmount + canvasGrain (the DRY pressure +
        // tooth), so a `medium:"crayon"` atom does not silently no-op the texture amount.
        case "crayon":
        // The Kuwahara finish reads strokeAmount as its smoothing
        // strength + canvasGrain as its faint oil-paint tooth; the atoms door maps both
        // so a `medium:"kuwahara"` atom carries its amount (no silent no-op).
        case "kuwahara":
            cfg.strokeAmount = a;
            cfg.canvasGrain = a * 0.05;
            break;
        // Metal mediums read `metalPolish` as their signature
        // texture amount (the specular catch intensity, 0..4); the atoms door maps it so a
        // `medium:"metal"`/`"metal-gradient"` atom carries its amount (no silent no-op).
        case "metal":
        case "metal-gradient":
            cfg.metalPolish = a * 4;
            break;
    }
}

/** Read back the textured medium's dominant texture amount (the applyTexture inverse). */
export function textureAmountFor(cfg: AuroraConfig, kind: Exclude<AuroraMedium, "smooth">): number {
    switch (kind) {
        case "watercolor":
            return clampBudget(cfg.wetEdge, 0, 1);
        case "oil":
        case "vangogh":
        case "pastel":
        case "oil-pastel":
        case "crayon":
        case "kuwahara":
            // strokeAmount is the shared signature knob for every stroke medium (the
            // Kuwahara finish reads it as its smoothing-strength knob too).
            return clampBudget(cfg.strokeAmount, 0, 1);
        case "metal":
        case "metal-gradient":
            // metalPolish (0..4) is the metal signature knob; the
            // atoms round-trip reads it back in the 0..1 door range (÷4, the applyTexture inverse).
            return clampBudget((cfg.metalPolish ?? METAL_POLISH_DEFAULT) / 4, 0, 1);
    }
}

/** Classify the motion atom from the config's drift fields (the resolveAtoms forward map). */
export function motionFor(cfg: AuroraConfig): AuroraMotionAtom {
    const drifts = cfg.nucleiDrift + cfg.paletteDrift + cfg.warpDrift;
    if (drifts > 0.001) return "drifting"; // any sustained drift ⇒ drifting
    if (cfg.breathDepth > 0.001) return "breathing"; // breath only ⇒ breathing
    return "still";
}

/** Invert a clamped lerp(calm, vivid, t) back to t∈[0,1] (the energy/noise inverses). */
export function unlerp(value: number, lo: number, hi: number): number {
    if (hi === lo) return 0;
    return clampBudget((value - lo) / (hi - lo), 0, 1);
}
