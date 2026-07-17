/**
 * Aurora's atoms-of-control door: the one consumer-facing surface
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
 * Contract:
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
} from "../constants/presets";
import { deriveAurora, oklchStopToHex, type AuroraHarmony } from "./color";
// Pure field mappings and their literal classifiers live in one cycle-free leaf;
// this module retains the consumer schema and resolve/config composition.
import {
    lerp,
    unlerp,
    motionFor,
    applyTexture,
    textureAmountFor,
    COLOR_ENERGY,
    MOTION_FIELDS,
    nucleiPrior,
    applyChromaBracket,
    applyNoise,
    type AuroraMotionAtom,
    type AuroraZoneArrangement,
} from "./atoms-fields";

/**
 * The ZONES arrangement character — selects the nuclei placement prior. NOT a bare
 * integer count: the same count reads as a different field per arrangement.
 * - `scattered` — radial-ish spread off the centre (loose, atmospheric).
 * - `composed`  — the rule-of-thirds prior (the deliberate, balanced field).
 * - `centred`   — a tight central cluster (one dominant glow, calm).
 */
// The placement classifier is mapping-owned in atoms-fields; this schema only
// references it as part of the consumer-facing zone atom.

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
 * The interactivity atom exposes only wired axes. `light` (cursor-as-light) and
 * `scroll` (scroll-coupled palette/breath) are wired by
 * `frameLoop.ts` and `useAurora.ts`.
 */
export interface AuroraFieldInteractivityAtom {
    /** palette/breath progress couples to scroll (via useScrollProgress). */
    scroll?: boolean;
    /**
     * Cursor swirl/luminance-lean axis, medium-gated. On the
     * `smooth` medium the cursor reads as a local LUMINANCE LEAN (engagement-driven, via the
     * `auroraCursorMapping` strength → `uCursorStrength`) instead of the dead
     * impasto light the `light` axis drives only on painterly media. It defaults to
     * the interactive state so every medium responds.
     */
    swirl?: boolean;
    /**
     * Sized amplitude atom (0..1, default 0.5). Sizes the cursor's
     * field influence — how much the velocity burst lifts the CPU-projected cursor strength.
     */
    amplitude?: number;
}

/** Smooth fields expose the cursor field but have no directional impasto light. */
export interface AuroraSmoothInteractivityAtom extends AuroraFieldInteractivityAtom {
    light?: never;
}

/** Textured media may additionally steer their directional light from the cursor. */
export interface AuroraPainterlyInteractivityAtom extends AuroraFieldInteractivityAtom {
    light?: boolean;
}

export type AuroraInteractivityAtom =
    | AuroraSmoothInteractivityAtom
    | AuroraPainterlyInteractivityAtom;

/**
 * The Tier-1 atoms of control (≤7) — the user's named control elements. EVERY atom is
 * OPTIONAL; an absent atom keeps the wispy-sky default for the fields it would drive,
 * so `DEFAULT_ATOMS` (the empty set) resolves to `DEFAULT_AURORA_CONFIG`.
 */
interface AuroraAtomsBase {
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
    /**
     * the lightness SCHEME of the derived ramp. `"light"`
     * (the default when a seed is set) is the light-pastel band; `"dark"` shifts the WHOLE
     * ramp into the luminous-dark band [0.18, 0.42] so a derived-from-seed field reads as a
     * rich luminous-dark wash behind glass in a dark shell — never a washed-pale salmon
     * field with dark cards floating on it (the dark-leg defect). CONFIG-LEVEL: routes
     * to `deriveAurora`'s `scheme`; ZERO shader edit. Only read when a `seed` is set (the
     * door drives the DERIVE path; an authored-palette config has no scheme to resolve).
     */
    lightnessScheme?: "light" | "dark";
    /**
     * an explicit derived L band `[min, max]` (OKLCh L
     * units) that OVERRIDES `lightnessScheme`. The single retune knob for a bespoke
     * luminosity window (e.g. `[0.18, 0.42]` for the deep luminous-dark identity). Routes
     * to `deriveAurora`'s `lBand`; only read when a `seed` is set.
     */
    lBand?: readonly [number, number];
    /**
     * the analogous hue-walk width (degrees). Optional;
     * omitted = the chroma-ADAPTIVE default (a higher `colorEnergy` widens the walk so a
     * vivid field carries a real second accent hue, a calm field stays a tight
     * neighbourhood). An explicit value wins. Only read when a `seed` is set.
     */
    hueSpread?: number;
    /**
     * the cross-stop chroma VARIANCE (0..1, the
     * bracket grammar). 0 (default) = the uniform painterly ramp (every stop near the
     * anchor chroma); 1 = a WIDE bracket — the vivid stops toward marigold, the calm stops
     * toward the sage-whisper pole (C≈0.03), so the ramp carries an "interesting" chroma
     * counterpoint rather than a flat monochrome. Applied post-derive (chroma-only —
     * hue/L preserved, each stop re-gamut-mapped). Only read when a `seed` is set.
     */
    chromaVariance?: number;
    /**
     * the counterpoint option. When true (and
     * `chromaVariance > 0`) the deepest ramp stop is pinned to the sage-whisper pole as a
     * deliberate low-chroma "silence" note against the vivid mass (the "silence ←
     * whisper → marigold" grammar). Default false (the variance spreads without a dedicated
     * whisper stop). Only read when a `seed` is set.
     */
    chromaCounterpoint?: boolean;

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

    // ── MOTION (the user's "motion" control element) ──
    /** still | breathing | drifting — the three motion registers. */
    motion?: AuroraMotionAtom;

}

/**
 * The medium-discriminated atoms surface. Smooth fields retain swirl/scroll/amplitude but
 * reject the directional `light` axis; textured media expose it explicitly.
 */
export type AuroraAtoms = AuroraAtomsBase &
    (
        | {
              medium?: { kind: "smooth" };
              interactivity?: AuroraSmoothInteractivityAtom;
          }
        | {
              medium: {
                  kind: Exclude<AuroraMedium, "smooth">;
                  amount?: number;
              };
              interactivity?: AuroraPainterlyInteractivityAtom;
          }
    );

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

/**
 * Expand the ≤7 Tier-1 atoms into a full, valid, in-range `AuroraConfig`. A PURE,
 * TOTAL function: clones the BASE config and applies ONLY the present atoms as clamped
 * overrides, so the empty atom set resolves to exactly the base and every atom
 * combination yields a config respecting every `budget.ts` cap.
 *
 * `base` defaults to the wispy-sky `DEFAULT_AURORA_CONFIG`, so
 * `resolveAtoms(DEFAULT_ATOMS)` deep-equals it. A consumer that
 * REFINES a richer config (the live atoms studio seeding FROM the active preset) passes the
 * preset config as `base`, so the ~21 non-atom fields the ≤7-knob projection does NOT carry
 * (the hero's stroke params, the per-preset palette specifics beyond the seed) SURVIVE the
 * atom touch: the first edit refines the active preset rather than replacing it.
 */
export function resolveAtoms(
    atoms: AuroraAtoms = DEFAULT_ATOMS,
    base: AuroraConfig = DEFAULT_AURORA_CONFIG,
): AuroraConfig {
    // Deep-clone the base so the returned config is independent (no shared nuclei
    // array, palette, flow references the consumer could mutate into the base).
    const cfg: AuroraConfig = {
        ...base,
        palette: base.palette.map((s) => ({ ...s })),
        nuclei: base.nuclei.map((n) => ({ ...n })),
        flow: { ...base.flow },
    };

    // ── COLOR: seed + harmony + colorEnergy → the derived palette + the co-varying
    // chroma/value cluster. Color energy also drives temperature shift during palette
    // derivation. An absent seed keeps the
    // default palette; an absent colorEnergy keeps the default chroma/value fields.
    const energy =
        atoms.colorEnergy !== undefined ? clampBudget(atoms.colorEnergy, 0, 1) : undefined;

    if (atoms.seed !== undefined) {
        const stopCount = Math.min(AV_MAX_COLORS, 4);
        // the chroma-ADAPTIVE hue-walk: an explicit atom wins; else a vivid field
        // (high energy) widens the analogous walk so the ramp carries a real second accent
        // hue, a calm field stays a tight neighbourhood; an unset energy keeps the derive default.
        const hueSpread =
            atoms.hueSpread !== undefined
                ? clampBudget(atoms.hueSpread, 0, 180)
                : energy !== undefined
                  ? lerp(COLOR_ENERGY.hueSpread.calm, COLOR_ENERGY.hueSpread.vivid, energy)
                  : undefined;
        cfg.palette = deriveAurora(atoms.seed, {
            harmony: atoms.harmony ?? "analogous",
            stopCount,
            // The COLOR-energy knob drives the warm-light/cool-shadow temperature on
            // the derived palette.
            temperatureShift:
                energy !== undefined
                    ? lerp(COLOR_ENERGY.temperatureShift.calm, COLOR_ENERGY.temperatureShift.vivid, energy)
                    : 0,
            // the (adaptive) hue-walk + the luminance scheme, explicit L band.
            // Each is spread only when present so an unset door is a byte-identical derive.
            ...(hueSpread !== undefined ? { hueSpread } : {}),
            ...(atoms.lightnessScheme !== undefined ? { scheme: atoms.lightnessScheme } : {}),
            ...(atoms.lBand !== undefined ? { lBand: atoms.lBand } : {}),
        });
        // the cross-stop chroma bracket. Post-derive, chroma-only + opt-in.
        if (atoms.chromaVariance !== undefined && atoms.chromaVariance > 0) {
            applyChromaBracket(
                cfg.palette,
                clampBudget(atoms.chromaVariance, 0, 1),
                atoms.chromaCounterpoint ?? false,
            );
        }
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

    // ── Zones: count + arrangement → nuclei.
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

    // ── Interactivity: light/scroll, medium-gated swirl, and sized amplitude.
    // `swirl` defaults on whenever
    //    interactivity is engaged so the cursor reads on the `smooth` medium (the
    // `auroraCursorMapping` paints cursor-local luminance lean, not just painterly light.
    if (atoms.interactivity !== undefined) {
        const it = atoms.interactivity;
        const light = atoms.medium?.kind !== undefined && atoms.medium.kind !== "smooth"
            ? atoms.interactivity.light
            : undefined;
        cfg.interactivity = {
            ...(light !== undefined ? { light } : {}),
            ...(it.scroll !== undefined ? { scroll: it.scroll } : {}),
            // Smooth-medium interactivity reads by default through swirl.
            swirl: it.swirl ?? true,
            // The sized amplitude atom — clamped 0..1 (default balanced 0.5).
            amplitude: it.amplitude !== undefined ? clampBudget(it.amplitude, 0, 1) : 0.5,
        };
    }

    return cfg;
}

// ── The inverse projection: config → atoms (the seed-from-preset door) ──────────
//
// `resolveAtoms` is a ~28-field expansion of ≤7 atoms; `configToAtoms` is the LOSSY
// inverse: it reads back seed, color energy, zone count, noise, medium,
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

/**
 * Project a full `AuroraConfig` back onto the ≤7 Tier-1 atoms. The minimal recovered
 * set is seed, colorEnergy, zones-count, noise, medium(+amount), motion; `harmony`
 * and `zones.arrangement` take their door defaults (not recoverable — lossy by design).
 * `configToAtoms(resolveAtoms(a))` recovers the energy/noise/medium/motion/zone-count
 * axes of `a` within the projection's resolution.
 */
export function configToAtoms(cfg: AuroraConfig): AuroraAtoms {
    const kind = cfg.medium;
    const it = cfg.interactivity;
    const field =
        it &&
        (it.scroll !== undefined || it.swirl !== undefined || it.amplitude !== undefined)
            ? {
                  ...(it.scroll !== undefined ? { scroll: it.scroll } : {}),
                  ...(it.swirl !== undefined ? { swirl: it.swirl } : {}),
                  ...(it.amplitude !== undefined ? { amplitude: it.amplitude } : {}),
              }
            : undefined;
    const base: AuroraAtomsBase = {
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
        motion: motionFor(cfg),
    };
    return kind === "smooth"
        ? { ...base, medium: { kind }, ...(field ? { interactivity: field } : {}) }
        : {
              ...base,
              medium: { kind, amount: textureAmountFor(cfg, kind) },
              ...(field || it?.light !== undefined
                  ? {
                        interactivity: {
                            ...field,
                            ...(it?.light !== undefined ? { light: it.light } : {}),
                        },
                    }
                  : {}),
          };
}
