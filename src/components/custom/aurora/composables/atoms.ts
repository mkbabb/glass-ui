/**
 * AX.W10 — the aurora "atoms of control" door: the ONE consumer-facing surface
 * over the ~28-field author schema. `AuroraConfig` is the INTERNAL author schema
 * (the full escape hatch a preset author types against); `resolveAtoms` is the
 * SIMPLIFIED door the live config UI + every consumer drives.
 *
 * The atoms are the user's named control elements (§2.7) — COLOR, ZONES, NOISE,
 * MEDIUM(+texture), MOTION — ≤7 intuitive knobs, each normalized and total
 * (Burley's "Principled" 5-rule discipline: intuitive, few, normalized, robust for
 * EVERY combination). Each atom maps to a co-varying cluster of config fields so one
 * knob moves the entangled axes together (a single COLOR-energy knob co-varies
 * saturation + valueVariance + breath + the warm/cool temperature, because moving any
 * one alone reads as a defect).
 *
 * Contract (machine-asserted by proof:aurora-atoms-roundtrip):
 *   - TOTAL — every atom combination (incl. out-of-range/adversarial inputs) produces
 *     a VALID in-range `AuroraConfig` respecting every `budget.ts` cap (no NaN, no
 *     out-of-range field). Clamp/saturate, never garbage.
 *   - DEFAULT-PRESERVING — `resolveAtoms(DEFAULT_ATOMS)` deep-equals
 *     `DEFAULT_AURORA_CONFIG` (the wispy-sky default survives the door).
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
    type WarpMode,
} from "../constants/presets";
import { deriveAurora, oklchStopToHex, type AuroraHarmony } from "./color";

/** The motion atom — the three motion registers. */
export type AuroraMotionAtom = "still" | "breathing" | "drifting";

/**
 * The ZONES arrangement character — selects the nuclei placement prior. NOT a bare
 * integer count: the same count reads as a different field per arrangement.
 * - `scattered` — radial-ish spread off the centre (loose, atmospheric).
 * - `composed`  — the rule-of-thirds prior (the deliberate, balanced field).
 * - `centred`   — a tight central cluster (one dominant glow, calm).
 */
export type AuroraZoneArrangement = "scattered" | "composed" | "centred";

/** The ZONES atom — a count + an arrangement character (default `composed`). */
export interface AuroraZones {
    /** 1..MAX_NUCLEI — the number of color zones (nuclei). Clamped. */
    count: number;
    /** The placement prior. Default `composed` (rule-of-thirds). */
    arrangement?: AuroraZoneArrangement;
}

/**
 * The MEDIUM atom — the painterly medium + (only for a TEXTURED medium) its dominant
 * texture amount. `amount` is STRUCTURALLY ABSENT for `smooth`: a smooth medium has
 * no dominant texture knob, so the door does not offer/accept one (no silent-inert
 * arm). For a textured medium `amount` (0..1) drives the medium's signature knob.
 */
export type AuroraMediumAtom =
    | { kind: "smooth" }
    | { kind: Exclude<AuroraMedium, "smooth">; amount?: number };

/**
 * The interactivity atom — ONLY the wired axes ship. `light` (cursor-as-light) and
 * `scroll` (scroll-coupled palette/breath) are wired downstream
 * (`frameLoop.ts`/`useAurora.ts`); the declared-but-unwired `flow`/`wake` axes are
 * EXCISED from the shipped atom shape (no declared-but-dead axis — excise-or-wire).
 */
export interface AuroraInteractivityAtom {
    /** cursor drives the impasto light direction (cursor-as-light + idle orbit). */
    light?: boolean;
    /** palette/breath progress couples to scroll (via useScrollProgress). */
    scroll?: boolean;
}

/**
 * The Tier-1 atoms of control (≤7) — the user's named control elements. EVERY atom is
 * OPTIONAL; an absent atom keeps the wispy-sky default for the fields it would drive,
 * so `DEFAULT_ATOMS` (the empty set) resolves to `DEFAULT_AURORA_CONFIG`.
 */
export interface AuroraAtoms {
    // ── COLOR (the user's "color" control element — seed + scheme + energy) ──
    /** A seed color (CSS string or an OklchStop anchor) → drives the derived palette. */
    seed?: string | OklchStop;
    /** The hue scheme across the derived ramp. Default `analogous` (when a seed is set). */
    harmony?: AuroraHarmony;
    /**
     * 0..1 — the color ENERGY knob. One scalar co-varies the entangled chroma/value
     * cluster: saturation, valueVariance, breath, AND the warm-light/cool-shadow
     * temperature on the derived palette. 0 = calm/muted, 1 = vivid/charged. A
     * continuous curve, not a 3-point named LUT.
     */
    colorEnergy?: number;

    // ── ZONES (the user's "zones" control element — count + arrangement) ──
    /** The color zones (nuclei) — a count + an arrangement character. */
    zones?: AuroraZones;

    // ── NOISE (the user's "noise" control element — one organic-boundary knob) ──
    /**
     * 0..1 — the NOISE knob. One scalar fans to the organic-boundary cluster:
     * warpAmount (how much the zones distort), warpScale (the distortion frequency),
     * warpMode (smooth fBm → cellular as it climbs), and noiseOctaves (detail). 0 =
     * clean isotropic zones, 1 = turbulent organic edges.
     */
    noise?: number;

    // ── MEDIUM (the user's "medium" control element — medium + texture) ──
    /** The painterly medium + (textured mediums only) its dominant texture amount. */
    medium?: AuroraMediumAtom;

    // ── MOTION (the user's "motion" control element) ──
    /** still | breathing | drifting — the three motion registers. */
    motion?: AuroraMotionAtom;

    // ── interactivity (only the wired axes) ──
    /** The pointer/scroll interactivity axes (default OFF). Only `light`/`scroll` ship. */
    interactivity?: AuroraInteractivityAtom;
}

/**
 * The default atoms — the EMPTY set. `resolveAtoms(DEFAULT_ATOMS)` deep-equals the
 * wispy-sky `DEFAULT_AURORA_CONFIG` (machine-asserted). The user explicitly asked the
 * default to be preserved; the empty-atom pass-through is how the door honors it.
 */
export const DEFAULT_ATOMS: AuroraAtoms = {};

// ── COLOR-energy curve ────────────────────────────────────────────────────────
//
// One scalar t∈[0,1] drives a CONTINUOUS curve over the co-varying chroma/value
// cluster (facet 26 SOTA: a curve, not a 3-point LUT). The endpoints are the calm
// (t=0) and vivid (t=1) poles; the curve interpolates between them. The midpoint
// (t=0.5) is the wispy-sky default's value for each field so a half-energy config
// reads as the balanced default.

/** Linear interpolation over a co-varying axis (the continuous curve, not a LUT). */
function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/** The calm↔vivid poles for each co-varying COLOR-energy axis. */
const COLOR_ENERGY = {
    saturation: { calm: 0.85, vivid: 1.2 }, // 0.6..1.3 budget; 0.5→1.0 (default)
    valueVariance: { calm: 0.04, vivid: 0.14 }, // 0..0.3; 0.5→0.09
    breathDepth: { calm: 0.03, vivid: 0.08 }, // 0..0.15; 0.5→0.055
    temperatureShift: { calm: 0.15, vivid: 0.5 }, // the palette warm/cool coupling (folded from the old mood recipe)
} as const;

/** The motion atom → the three motion fields. */
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

// ── ZONES: the ONE nuclei prior (single-sourced; the AW duplicated prior pair
// collapses onto this) ─────────────────────────────────────────────────────────

/** The φ⁻¹ conjugate — the golden-ratio step for a low-discrepancy scatter walk. */
const PHI_INV = 0.61803398875;

/**
 * The deterministic nuclei prior for `count` zones under an `arrangement` character.
 * ONE home for the rule-of-thirds prior (the AW duplicated prior pair is gone). Total:
 * clamps `count` to `[1, MAX_NUCLEI]`; every arrangement yields a valid in-range nuclei
 * array.
 *
 * - `composed`  — the rule-of-thirds anchor table (the deliberate balanced field).
 * - `scattered` — a golden-angle (φ⁻¹) low-discrepancy spread off-centre (loose).
 * - `centred`   — a tight cluster around the centre (one dominant glow).
 */
export function nucleiPrior(
    count: number,
    arrangement: AuroraZoneArrangement = "composed",
): AuroraConfig["nuclei"] {
    const n = Math.max(1, Math.min(MAX_NUCLEI, Math.round(count)));

    // The rule-of-thirds anchor table (the `composed` prior).
    const THIRDS: [number, number][] = [
        [0.33, 0.33],
        [0.67, 0.67],
        [0.67, 0.33],
        [0.33, 0.67],
        [0.5, 0.5],
        [0.5, 0.33],
    ];

    const placeAt = (i: number): [number, number] => {
        switch (arrangement) {
            case "scattered": {
                // Golden-angle stratified scatter: deterministic, stays composed for
                // any count, no two seeds-of-count collide. Spiral out from centre.
                const a = i * PHI_INV * Math.PI * 2;
                const r = 0.12 + 0.3 * Math.sqrt((i + 0.5) / n);
                return [
                    clampBudget(0.5 + r * Math.cos(a), 0.1, 0.9),
                    clampBudget(0.5 + r * Math.sin(a), 0.1, 0.9),
                ];
            }
            case "centred": {
                // A tight central cluster — small ring around the middle.
                if (n === 1) return [0.5, 0.5];
                const a = (i / n) * Math.PI * 2;
                const r = 0.12;
                return [0.5 + r * Math.cos(a), 0.5 + r * Math.sin(a)];
            }
            case "composed":
            default:
                return THIRDS[i % THIRDS.length]!;
        }
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

// ── NOISE: the organic-boundary fan-out ────────────────────────────────────────

/** WarpMode as a function of the noise scalar — smooth fBm → hybrid → cellular. */
function warpModeFor(t: number): WarpMode {
    if (t < 0.4) return "fbm";
    if (t < 0.75) return "hybrid";
    return "cellular";
}

/**
 * The NOISE atom fan-out: one scalar t∈[0,1] drives the organic-boundary cluster.
 * Total — clamps t and every output into its budget band.
 */
function applyNoise(cfg: AuroraConfig, amount: number): void {
    const t = clampBudget(amount, 0, 1);
    cfg.warpAmount = clampBudget(lerp(0.2, 0.6, t), 0, 0.6); // distortion strength
    cfg.warpScale = clampBudget(lerp(1.0, 2.6, t), 0.5, 3); // distortion frequency
    cfg.warpMode = warpModeFor(t); // fBm → hybrid → cellular
    cfg.noiseOctaves = (t < 0.5 ? 3 : t < 0.85 ? 4 : 5) as 3 | 4 | 5; // detail
}

// ── MEDIUM: the texture fan-out (textured mediums only) ─────────────────────────

/** The textured medium → its dominant texture knob. Only reached for a textured medium. */
function applyTexture(
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
            cfg.strokeAmount = a;
            cfg.canvasGrain = a * 0.05;
            break;
    }
}

/**
 * Expand the ≤7 Tier-1 atoms into a full, valid, in-range `AuroraConfig`. A PURE,
 * TOTAL function: clones the BASE config and applies ONLY the present atoms as clamped
 * overrides, so the empty atom set resolves to exactly the base and every atom
 * combination yields a config respecting every `budget.ts` cap.
 *
 * `base` defaults to the wispy-sky `DEFAULT_AURORA_CONFIG` (so `resolveAtoms(DEFAULT_ATOMS)`
 * deep-equals it — the machine-asserted default-preserving contract). A consumer that
 * REFINES a richer config (the live atoms studio seeding FROM the active preset) passes the
 * preset config as `base`, so the ~21 non-atom fields the ≤7-knob projection does NOT carry
 * (the hero's stroke params, the per-preset palette specifics beyond the seed) SURVIVE the
 * atom touch — the first atom edit refines the preset rather than clobbering it to the
 * wispy-sky default (the W-AUR-STUDIO D4 atoms-trap fix).
 */
export function resolveAtoms(
    atoms: AuroraAtoms = DEFAULT_ATOMS,
    base: AuroraConfig = DEFAULT_AURORA_CONFIG,
): AuroraConfig {
    // Deep-clone the base so the returned config is independent (no shared nuclei
    // array / palette / flow references the consumer could mutate into the base).
    const cfg: AuroraConfig = {
        ...base,
        palette: base.palette.map((s) => ({ ...s })),
        nuclei: base.nuclei.map((n) => ({ ...n })),
        flow: { ...base.flow },
    };

    // ── COLOR: seed + harmony + colorEnergy → the derived palette + the co-varying
    // chroma/value cluster. The colorEnergy temperatureShift folds the old mood
    // coupling into the palette derive (one door covers it). An absent seed keeps the
    // default palette; an absent colorEnergy keeps the default chroma/value fields.
    const energy =
        atoms.colorEnergy !== undefined ? clampBudget(atoms.colorEnergy, 0, 1) : undefined;

    if (atoms.seed !== undefined) {
        const stopCount = Math.min(AV_MAX_COLORS, 4);
        cfg.palette = deriveAurora(atoms.seed, {
            harmony: atoms.harmony ?? "analogous",
            stopCount,
            // The COLOR-energy knob drives the warm-light/cool-shadow temperature on
            // the derived palette (the old mood→temperatureShift coupling, folded).
            temperatureShift:
                energy !== undefined
                    ? lerp(COLOR_ENERGY.temperatureShift.calm, COLOR_ENERGY.temperatureShift.vivid, energy)
                    : 0,
        });
    }

    if (energy !== undefined) {
        cfg.saturation = clampBudget(
            lerp(COLOR_ENERGY.saturation.calm, COLOR_ENERGY.saturation.vivid, energy),
            0.6,
            1.3,
        );
        cfg.valueVariance = clampBudget(
            lerp(COLOR_ENERGY.valueVariance.calm, COLOR_ENERGY.valueVariance.vivid, energy),
            0,
            0.3,
        );
        cfg.breathDepth = clampBudget(
            lerp(COLOR_ENERGY.breathDepth.calm, COLOR_ENERGY.breathDepth.vivid, energy),
            0,
            0.15,
        );
    }

    // ── ZONES: count + arrangement → the nuclei (the ONE prior).
    if (atoms.zones !== undefined) {
        cfg.nuclei = nucleiPrior(atoms.zones.count, atoms.zones.arrangement ?? "composed");
    }

    // ── NOISE: one knob → the organic-boundary cluster.
    if (atoms.noise !== undefined) {
        applyNoise(cfg, atoms.noise);
    }

    // ── MEDIUM (+ texture, textured mediums only — smooth offers no texture knob).
    if (atoms.medium !== undefined) {
        cfg.medium = atoms.medium.kind;
        if (atoms.medium.kind === "vangogh" || atoms.medium.kind === "oil-pastel") {
            // The painterly mediums hug the color zones — request the tensor orientation.
            cfg.strokeOrient = "tensor";
        }
        // texture amount is STRUCTURALLY ABSENT for smooth (the union has no `amount`
        // field on the smooth arm — TypeScript narrows it away). For a textured medium
        // an absent amount keeps the default; a present amount fans to its knob.
        if (atoms.medium.kind !== "smooth" && atoms.medium.amount !== undefined) {
            applyTexture(cfg, atoms.medium.kind, atoms.medium.amount);
        }
    }

    // ── MOTION → the three motion fields.
    if (atoms.motion !== undefined) {
        const mo = MOTION_FIELDS[atoms.motion];
        cfg.nucleiDrift = clampBudget(mo.nucleiDrift, 0, 0.05);
        cfg.paletteDrift = clampBudget(mo.paletteDrift, 0, 0.04);
        cfg.warpDrift = clampBudget(mo.warpDrift, 0, 0.015);
        // motion's breath only LOWERS the colorEnergy breath when "still"; otherwise the
        // larger of the two wins. Take the min so "still" zeroes it regardless of energy.
        cfg.breathDepth = clampBudget(
            atoms.motion === "still" ? 0 : Math.max(cfg.breathDepth, mo.breathDepth),
            0,
            0.15,
        );
    }

    // ── interactivity (only the wired axes — light/scroll; default OFF).
    if (atoms.interactivity !== undefined) {
        cfg.interactivity = { ...atoms.interactivity };
    }

    return cfg;
}

// ── The inverse projection: config → atoms (the seed-from-preset door) ──────────
//
// `resolveAtoms` is a ~28-field expansion of ≤7 atoms; `configToAtoms` is the LOSSY
// inverse — it reads back the SHIPPED atoms (seed/colorEnergy/zones-count/noise/medium
// /motion) that the live preset config implies, so the atoms surface seeds FROM the
// active preset instead of a fixed wispy-sky default. A preset's first atom touch then
// REFINES the preset rather than clobbering it to the atoms default.
//
// It is lossy BY DESIGN: `harmony` and `zones.arrangement` are NOT recoverable from a
// resolved palette/nuclei array (the harmony is baked into the derived palette; the
// arrangement is baked into the nuclei coordinates), so they take their door defaults —
// the projection is a ≤7-knob shadow of the config, not a round-trip identity. Nudging
// an unrecoverable axis (harmony) re-derives from the recovered seed, which is the
// intended "refine from here" behaviour.

/** Invert a clamped lerp(calm, vivid, t) back to t∈[0,1] (the energy/noise inverses). */
function unlerp(value: number, lo: number, hi: number): number {
    if (hi === lo) return 0;
    return clampBudget((value - lo) / (hi - lo), 0, 1);
}

/** Classify the motion atom from the config's drift fields (the resolveAtoms forward map). */
function motionFor(cfg: AuroraConfig): AuroraMotionAtom {
    const drifts = cfg.nucleiDrift + cfg.paletteDrift + cfg.warpDrift;
    if (drifts > 0.001) return "drifting"; // any sustained drift ⇒ drifting
    if (cfg.breathDepth > 0.001) return "breathing"; // breath only ⇒ breathing
    return "still";
}

/** Read back the textured medium's dominant texture amount (the applyTexture inverse). */
function textureAmountFor(cfg: AuroraConfig, kind: Exclude<AuroraMedium, "smooth">): number {
    switch (kind) {
        case "watercolor":
            return clampBudget(cfg.wetEdge, 0, 1);
        case "oil":
        case "vangogh":
        case "pastel":
        case "oil-pastel":
        case "crayon":
            // strokeAmount is the shared signature knob for every stroke medium.
            return clampBudget(cfg.strokeAmount, 0, 1);
    }
}

/**
 * Project a full `AuroraConfig` back onto the ≤7 Tier-1 atoms. The minimal recovered
 * set is seed / colorEnergy / zones-count / noise / medium(+amount) / motion; `harmony`
 * and `zones.arrangement` take their door defaults (not recoverable — lossy by design).
 * `configToAtoms(resolveAtoms(a))` recovers the energy/noise/medium/motion/zone-count
 * axes of `a` within the projection's resolution (the round-trip the seed-from-preset
 * fix needs + the gate asserts).
 */
export function configToAtoms(cfg: AuroraConfig): AuroraAtoms {
    const kind = cfg.medium;
    const medium: AuroraMediumAtom =
        kind === "smooth"
            ? { kind }
            : { kind, amount: textureAmountFor(cfg, kind) };

    return {
        // COLOR — seed off palette[0]; harmony is baked into the palette (door default).
        seed: cfg.palette.length > 0 ? oklchStopToHex(cfg.palette[0]!) : "#3a7bd5",
        harmony: "analogous",
        // colorEnergy inverts off saturation (the most stable energy axis — the
        // valueVariance/breathDepth axes co-move but saturation has the widest range).
        colorEnergy: unlerp(
            cfg.saturation,
            COLOR_ENERGY.saturation.calm,
            COLOR_ENERGY.saturation.vivid,
        ),
        // ZONES — count off the nuclei array length; arrangement is baked in (door default).
        zones: {
            count: Math.max(1, Math.min(MAX_NUCLEI, cfg.nuclei.length)),
            arrangement: "composed",
        },
        // NOISE inverts off warpAmount (the applyNoise primary axis: lerp(0.2, 0.6, t)).
        noise: unlerp(cfg.warpAmount, 0.2, 0.6),
        medium,
        motion: motionFor(cfg),
    };
}
