// The aurora atoms-door FIELD-MAPPING helpers (BB.W-CARVE5 carve out of atoms.ts to
// hold the door under the no-god-module bound). PURE field-mapping leaves — the
// COLOR-energy poles + the MOTION_FIELDS table, the textured-medium texture fan +
// its inverse, and the motion/lerp inverses — the cluster atoms.ts imports back.
// The ZONES `nucleiPrior` + the NOISE `applyNoise`/`warpModeFor` fan STAY in atoms.ts
// (the proof:aurora-atoms-roundtrip source witnesses read them there); the atom TYPE
// shapes + `resolveAtoms`/`configToAtoms`/`DEFAULT_ATOMS` STAY as the public door.

import { clampBudget } from "../constants/budget";
import {
    METAL_POLISH_DEFAULT,
    type AuroraConfig,
    type AuroraMedium,
} from "../constants/presets";
import type { AuroraMotionAtom } from "./atoms";

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
} as const;

export const MOTION_FIELDS: Record<AuroraMotionAtom, MotionFields> = {
    still: { nucleiDrift: 0, paletteDrift: 0, warpDrift: 0, breathDepth: 0 },
    // BA.W-STAGE scope 12 (BA-VJS-2, valuejs-fold A-4) — `breathing` made HONEST.
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
        // AX.W13 — crayon is a first-class medium (the strokeMode peer-route is gone);
        // the atoms-door texture knob is strokeAmount + canvasGrain (the DRY pressure +
        // tooth), so a `medium:"crayon"` atom does not silently no-op the texture amount.
        case "crayon":
        // BB.W-AUR-KUWAHARA — the kuwahara finish reads strokeAmount as its smoothing
        // strength + canvasGrain as its faint oil-paint tooth; the atoms door maps both
        // so a `medium:"kuwahara"` atom carries its amount (no silent no-op).
        case "kuwahara":
            cfg.strokeAmount = a;
            cfg.canvasGrain = a * 0.05;
            break;
        // BG.W-AUR-METAL-FINISH — the metal mediums read `metalPolish` as their signature
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
            // kuwahara finish reads it as its smoothing-strength knob too — BB.W-AUR-KUWAHARA).
            return clampBudget(cfg.strokeAmount, 0, 1);
        case "metal":
        case "metal-gradient":
            // BG.W-AUR-METAL-FINISH — metalPolish (0..4) is the metal signature knob; the
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
