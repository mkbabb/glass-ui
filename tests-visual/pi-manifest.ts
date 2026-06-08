// AX.W00 — the π-lane SCENES manifest.
//
// keyframes I-1/I-2 anti-drift mandate: the SCENES list is RE-SOURCED from the
// source-of-truth (`demo/stories/manifest.ts`), NEVER a drifted hand-list. The
// demo manifest is browser/Vite-resolved (`import.meta.glob` + lucide SFC lazy
// loaders), so a Node-side import would pull a Vite-only graph; instead we STATIC-
// PARSE the canonical `s("<cat>", "<id>", …)` call sites out of the manifest source
// text. Route paths are `/${category}/${story}` (demo/router.ts buildRoutes). If a
// story id/category is renamed in the manifest, this re-source tracks it — there is
// no second hand-list to drift.
//
// The 3 target π scenes (aurora, blob, dock) are RESOLVED against the re-sourced
// set so a manifest rename fails the resolution rather than silently driving a dead
// route.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const LIBRARY_ROOT = fileURLToPath(new URL("..", import.meta.url));
const MANIFEST_PATH = `${LIBRARY_ROOT}demo/stories/manifest.ts`;
const PRESETS_PATH = `${LIBRARY_ROOT}demo/stories/aurora/presets.ts`;

export interface Scene {
    /** `/${category}/${story}` — the navigable route path (demo/router.ts). */
    path: string;
    category: string;
    story: string;
}

/**
 * Re-source every navigable scene from the demo manifest source-of-truth by
 * static-parsing the `s("<cat>", "<id>", …)` helper call sites. NOT a hand list.
 */
export function sourceScenes(): Scene[] {
    const src = readFileSync(MANIFEST_PATH, "utf8");
    // The canonical row helper: `s("category", "id", "Title", …)`.
    const RE = /\bs\(\s*"([a-z0-9-]+)"\s*,\s*"([a-z0-9-]+)"/g;
    const scenes: Scene[] = [];
    const seen = new Set<string>();
    for (const m of src.matchAll(RE)) {
        const category = m[1]!;
        const story = m[2]!;
        const path = `/${category}/${story}`;
        if (seen.has(path)) continue;
        seen.add(path);
        scenes.push({ path, category, story });
    }
    if (scenes.length === 0) {
        throw new Error(
            `pi-manifest: re-source FAILED — no s("cat","id") rows parsed from ${MANIFEST_PATH}. The manifest helper shape moved; the SCENES re-source is the source-of-truth, do NOT hand-list.`,
        );
    }
    return scenes;
}

/** Resolve ONE scene by category/story against the re-sourced set (fail if renamed). */
export function resolveScene(category: string, story: string): Scene {
    const scene = sourceScenes().find(
        (s) => s.category === category && s.story === story,
    );
    if (!scene) {
        throw new Error(
            `pi-manifest: scene ${category}/${story} not found in the re-sourced manifest — the demo story was renamed/removed; update the π target, do NOT hard-code a dead route.`,
        );
    }
    return scene;
}

/** The 3 π-lane substrate targets, RESOLVED (not hand-coded) from the manifest. */
export const PI_TARGETS = {
    get aurora(): Scene {
        return resolveScene("substrates", "aurora");
    },
    get blob(): Scene {
        return resolveScene("substrates", "goo-blob");
    },
    get dock(): Scene {
        return resolveScene("navigation", "dock");
    },
} as const;

/**
 * Re-source the 12 aurora preset KEYS from `demo/stories/aurora/presets.ts`
 * (`PRESETS = { OPENAI_SKY, … }`) — the same anti-drift discipline. The
 * substrate-paints-color spec renders aurora DEFAULT + EACH preset at t=1.
 */
export function sourcePresetKeys(): string[] {
    const src = readFileSync(PRESETS_PATH, "utf8");
    // The `export const PRESETS = { KEY, KEY, … } as const;` object literal — the
    // shorthand-property block names the 12 preset keys (close is `} as const;`,
    // NOT `};`, so the terminator match must accept the `as const` clause).
    const block = src.match(
        /export const PRESETS\s*=\s*\{([\s\S]*?)\}\s*(?:as const)?\s*;/,
    );
    if (!block) {
        throw new Error(
            `pi-manifest: could not parse the PRESETS object from ${PRESETS_PATH} — re-source the preset keys, do NOT hand-list.`,
        );
    }
    const keys = [...block[1]!.matchAll(/\b([A-Z][A-Z0-9_]+)\b/g)]
        .map((m) => m[1]!)
        .filter((k, i, a) => a.indexOf(k) === i);
    if (keys.length === 0) {
        throw new Error(`pi-manifest: zero preset keys parsed from ${PRESETS_PATH}.`);
    }
    return keys;
}

/**
 * The 7 AW PENDING `browserVerify` re-probe obligations — ENUMERATED as named
 * rows (§HardGate-4; the "no silent deferrals" edict). Each carries its OWNER wave
 * + a `re-probed | pending-re-probe` verdict. At W00 close NONE is yet re-probed on
 * the real device (the per-surface fixes land in W07/W08); so each is
 * `pending-re-probe` with the owner wave that re-probes it. The manifest gate
 * asserts every row has an owner + a verdict ∈ {re-probed, pending-re-probe} — a
 * row with no owner or an unknown verdict is a phantom-owner re-defer and reds.
 */
export type ReprobeVerdict = "re-probed" | "pending-re-probe";

export interface PendingBrowserVerify {
    /** The AW wave that raised the browserVerify obligation. */
    awWave: string;
    surface: "aurora" | "blob";
    /** Short description of what must be re-probed on the real device. */
    obligation: string;
    /** The AX wave that OWNS the re-probe (where it lands GREEN). */
    ownerWave: string;
    verdict: ReprobeVerdict;
}

export const PENDING_BROWSER_VERIFY: PendingBrowserVerify[] = [
    {
        awWave: "AW.W4",
        surface: "aurora",
        obligation:
            "aurora WebGPU/WebGL2 interior paints non-black across all presets at t=1 (the black-canvas class)",
        ownerWave: "AX.W07",
        verdict: "pending-re-probe",
    },
    {
        awWave: "AW.W6",
        surface: "aurora",
        obligation:
            "aurora medium transposition (smooth/oil/crayon/pastel) renders distinctly on the live device, not a CPU-oracle equivalence only",
        ownerWave: "AX.W07",
        verdict: "pending-re-probe",
    },
    {
        awWave: "AW.W7",
        surface: "aurora",
        obligation:
            "aurora impasto relight + specular highlight is not blown-out on the live device (the over-bright specular class)",
        ownerWave: "AX.W07",
        verdict: "pending-re-probe",
    },
    {
        awWave: "AW.W8",
        surface: "aurora",
        obligation:
            "aurora cursor-driven swirl/warp paints a live interaction delta (not a static frame) on the real device",
        ownerWave: "AX.W07",
        verdict: "pending-re-probe",
    },
    {
        awWave: "AW.W9",
        surface: "blob",
        obligation:
            "blob metaball field paints a contained non-flood droplet (not a black canvas, not a flooded fill) on the live device",
        ownerWave: "AX.W08",
        verdict: "pending-re-probe",
    },
    {
        awWave: "AW.W10",
        surface: "blob",
        obligation:
            "blob pointer interaction (spring follow + pseudopod trail + click impulse) paints a live delta on the real device",
        ownerWave: "AX.W08",
        verdict: "pending-re-probe",
    },
    {
        awWave: "AW.W11",
        surface: "blob",
        obligation:
            "blob mood/palette ({valence, arousal} + OKLCh palette) renders distinct moods on the live device, not a CPU-oracle equivalence only",
        ownerWave: "AX.W08",
        verdict: "pending-re-probe",
    },
];

/** Validate the PENDING rows carry an owner + a known verdict (the gate's assert). */
export function validatePendingRows(): string[] {
    const violations: string[] = [];
    const verdicts: ReprobeVerdict[] = ["re-probed", "pending-re-probe"];
    for (const row of PENDING_BROWSER_VERIFY) {
        if (!row.ownerWave || !/^AX\.W\d+$/.test(row.ownerWave)) {
            violations.push(
                `${row.awWave} (${row.surface}): missing/invalid owner wave "${row.ownerWave}" — a phantom-owner re-defer`,
            );
        }
        if (!verdicts.includes(row.verdict)) {
            violations.push(
                `${row.awWave} (${row.surface}): unknown verdict "${row.verdict}" (expected re-probed | pending-re-probe)`,
            );
        }
    }
    if (PENDING_BROWSER_VERIFY.length !== 7) {
        violations.push(
            `expected 7 AW PENDING browserVerify rows, found ${PENDING_BROWSER_VERIFY.length}`,
        );
    }
    return violations;
}
