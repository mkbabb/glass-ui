/**
 * AW.W6 — the aurora "atoms of control" door: a PURE, TOTAL mapper from ≤7 intuitive
 * atoms to the full `AuroraConfig`. The thin consumer surface over the ~28-field
 * author schema (the Stripe/paper.design two-tier model) — nothing is removed from
 * `AuroraConfig`; the full schema stays whole as the progressive-disclosure
 * "Advanced" escape hatch. `resolveAtoms` is the NEW door, NOT a parallel config path.
 *
 * Contract (machine-asserted by proof:aurora-atoms-roundtrip):
 *   - TOTAL — every atom combination produces a VALID in-range `AuroraConfig`
 *     respecting every `budget.ts` cap (no NaN, no out-of-range field).
 *   - DEFAULT-PRESERVING — `resolveAtoms(DEFAULT_ATOMS)` deep-equals
 *     `DEFAULT_AURORA_CONFIG` (the wispy-sky default survives the new door).
 *
 * Mechanism: clone `DEFAULT_AURORA_CONFIG` and apply ONLY the atoms that are PRESENT
 * as clamped overrides. An absent atom keeps the default's value, so the empty atom
 * set (`DEFAULT_ATOMS`) resolves to exactly the wispy-sky default by construction.
 */

import {
    AV_MAX_COLORS,
    clampBudget,
} from "../constants/budget";
import {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI,
    type AuroraConfig,
    type AuroraMedium,
    type OklchStop,
} from "../constants/presets";
import { deriveAurora, type AuroraHarmony } from "./color";

/** The mood/energy poles — one slider fans to the co-varying energy axes. */
export type AuroraMoodAtom = "calm" | "balanced" | "vivid";

/** The motion atom — the three motion registers. */
export type AuroraMotionAtom = "still" | "breathing" | "drifting";

/**
 * The Tier-1 atoms of control (≤7). EVERY atom is OPTIONAL — an absent atom keeps the
 * wispy-sky default's value for the fields it would drive, so `DEFAULT_ATOMS` (the
 * empty set) resolves to `DEFAULT_AURORA_CONFIG`. The full `AuroraConfig` stays whole
 * as the progressive-disclosure "Advanced" tier.
 */
export interface AuroraAtoms {
    /** A seed color (CSS string or an OklchStop anchor) → drives the derived palette. */
    seed?: string | OklchStop;
    /** The hue scheme across the derived ramp. Default `analogous` (when a seed is set). */
    harmony?: AuroraHarmony;
    /** calm ↔ vivid (one knob) — fans to saturation + warpAmount + valueVariance + breath. */
    mood?: AuroraMoodAtom;
    /** The painterly medium. */
    medium?: AuroraMedium;
    /** 0..1 — the medium's dominant texture knob (strokeAmount / wetEdge / canvasGrain). */
    textureAmount?: number;
    /** still | breathing | drifting — the three motion registers. */
    motion?: AuroraMotionAtom;
    /** 2..6 — the number of color zones (nuclei), auto-arranged on a rule-of-thirds prior. */
    zones?: number;
    /** The pointer/scroll interactivity axes (default OFF — declared at W6, wired at W8). */
    interactivity?: AuroraConfig["interactivity"];
}

/**
 * The default atoms — the EMPTY set. `resolveAtoms(DEFAULT_ATOMS)` deep-equals the
 * wispy-sky `DEFAULT_AURORA_CONFIG` (machine-asserted). The user explicitly asked the
 * default to be preserved; the empty-atom pass-through is how the new door honors it.
 */
export const DEFAULT_ATOMS: AuroraAtoms = {};

/** The mood → co-varying energy axes recipe (calm ↔ vivid). */
interface MoodEnergy {
    saturation: number;
    warpAmount: number;
    valueVariance: number;
    breathDepth: number;
}
const MOOD_ENERGY: Record<AuroraMoodAtom, MoodEnergy> = {
    calm: { saturation: 0.85, warpAmount: 0.4, valueVariance: 0.06, breathDepth: 0.03 },
    balanced: { saturation: 1.0, warpAmount: 0.5, valueVariance: 0.08, breathDepth: 0.05 },
    vivid: { saturation: 1.2, warpAmount: 0.58, valueVariance: 0.14, breathDepth: 0.08 },
};

/** The motion atom → the four motion fields. */
interface MotionFields {
    nucleiDrift: number;
    paletteDrift: number;
    warpDrift: number;
    breathDepth: number;
}
const MOTION_FIELDS: Record<AuroraMotionAtom, MotionFields> = {
    still: { nucleiDrift: 0, paletteDrift: 0, warpDrift: 0, breathDepth: 0 },
    breathing: { nucleiDrift: 0, paletteDrift: 0, warpDrift: 0, breathDepth: 0.05 },
    drifting: { nucleiDrift: 0.015, paletteDrift: 0.015, warpDrift: 0.008, breathDepth: 0.05 },
};

/**
 * A deterministic rule-of-thirds / golden nuclei prior for `count` zones (NOT
 * centred), so a derived field reads as composed. Mirrors `deriveScene`'s thirds
 * prior; clamped to `[1, MAX_NUCLEI]`.
 */
function thirdsZones(count: number): AuroraConfig["nuclei"] {
    const T = [0.33, 0.67] as const;
    const anchors: [number, number][] = [
        [T[0], T[0]],
        [T[1], T[1]],
        [T[1], T[0]],
        [T[0], T[1]],
        [0.5, 0.5],
        [0.5, T[0]],
    ];
    const n = Math.max(1, Math.min(MAX_NUCLEI, anchors.length, Math.round(count)));
    return Array.from({ length: n }, (_, i) => {
        const [x, y] = anchors[i]!;
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

/** The medium → its dominant texture knob (textureAmount routes per medium). */
function applyTexture(cfg: AuroraConfig, medium: AuroraMedium, amount: number): void {
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
            cfg.strokeAmount = a;
            cfg.canvasGrain = a * 0.05;
            break;
        case "smooth":
        default:
            // smooth has no dominant texture knob — the amount is inert (still TOTAL).
            break;
    }
}

/**
 * Expand the ≤7 Tier-1 atoms into a full, valid, in-range `AuroraConfig`. A PURE,
 * TOTAL function: clones the wispy-sky default and applies ONLY the present atoms as
 * clamped overrides, so the empty atom set resolves to exactly `DEFAULT_AURORA_CONFIG`
 * and every atom combination yields a config respecting every `budget.ts` cap.
 */
export function resolveAtoms(atoms: AuroraAtoms = DEFAULT_ATOMS): AuroraConfig {
    // Deep-clone the default so the returned config is independent (no shared nuclei
    // array / palette / flow references the consumer could mutate into the default).
    const cfg: AuroraConfig = {
        ...DEFAULT_AURORA_CONFIG,
        palette: DEFAULT_AURORA_CONFIG.palette.map((s) => ({ ...s })),
        nuclei: DEFAULT_AURORA_CONFIG.nuclei.map((n) => ({ ...n })),
        flow: { ...DEFAULT_AURORA_CONFIG.flow },
    };

    // ── seed + harmony → the derived palette (clamped to the perf color budget). An
    // absent seed keeps the default palette (the pass-through that preserves the default).
    if (atoms.seed !== undefined) {
        const stopCount = Math.min(AV_MAX_COLORS, 4);
        cfg.palette = deriveAurora(atoms.seed, {
            harmony: atoms.harmony ?? "analogous",
            stopCount,
        });
    }

    // ── mood → the co-varying energy axes.
    if (atoms.mood !== undefined) {
        const m = MOOD_ENERGY[atoms.mood];
        cfg.saturation = clampBudget(m.saturation, 0.6, 1.3);
        cfg.warpAmount = clampBudget(m.warpAmount, 0, 0.6);
        cfg.valueVariance = clampBudget(m.valueVariance, 0, 0.3);
        cfg.breathDepth = clampBudget(m.breathDepth, 0, 0.15);
    }

    // ── medium (+ the medium's preset orientation default).
    if (atoms.medium !== undefined) {
        cfg.medium = atoms.medium;
        // The painterly mediums hug the color zones — request the tensor orientation
        // (the bridge forces it for vangogh/oil-pastel anyway; this makes it explicit).
        if (atoms.medium === "vangogh" || atoms.medium === "oil-pastel") {
            cfg.strokeOrient = "tensor";
        }
    }

    // ── textureAmount → the medium's dominant texture knob.
    if (atoms.textureAmount !== undefined) {
        applyTexture(cfg, cfg.medium, atoms.textureAmount);
    }

    // ── motion → the four motion fields.
    if (atoms.motion !== undefined) {
        const mo = MOTION_FIELDS[atoms.motion];
        cfg.nucleiDrift = clampBudget(mo.nucleiDrift, 0, 0.05);
        cfg.paletteDrift = clampBudget(mo.paletteDrift, 0, 0.04);
        cfg.warpDrift = clampBudget(mo.warpDrift, 0, 0.015);
        // motion's breath only LOWERS a vivid mood's breath when "still"; otherwise the
        // mood breath wins. Take the min so "still" zeroes it regardless of mood.
        cfg.breathDepth = clampBudget(
            atoms.motion === "still" ? 0 : Math.max(cfg.breathDepth, mo.breathDepth),
            0,
            0.15,
        );
    }

    // ── zones → the nuclei count on the rule-of-thirds prior (clamped to MAX_NUCLEI).
    if (atoms.zones !== undefined) {
        cfg.nuclei = thirdsZones(atoms.zones);
    }

    // ── interactivity (the W6 SHAPE; default OFF — behavior wired at W8).
    if (atoms.interactivity !== undefined) {
        cfg.interactivity = { ...atoms.interactivity };
    }

    return cfg;
}
