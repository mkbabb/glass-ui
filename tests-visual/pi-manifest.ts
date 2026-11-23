// AX.W00 — the π-lane SCENES manifest.
//
// The SCENES list is re-sourced from the source of truth, the `routes.ts` file in
// each `demo/stories/<section>/` directory, never a hand list. The demo manifest is
// Vite-resolved (`import.meta.glob`), so a Node-side import would pull a Vite-only
// graph; instead each section's `id` and its rows' `{ id: "…", title` are parsed out
// of the source text. Route paths are `/${section}/${row}` (demo/router.ts). A
// renamed or removed row fails `resolveScene` rather than driving a dead route.
//
// The 3 target π scenes (aurora, blob, dock) are RESOLVED against the re-sourced
// set so a manifest rename fails the resolution rather than silently driving a dead
// route.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const LIBRARY_ROOT = fileURLToPath(new URL("..", import.meta.url));
const STORIES_DIR = `${LIBRARY_ROOT}demo/stories`;
const PRESETS_PATH = `${LIBRARY_ROOT}demo/stories/substrates/aurora/presets.ts`;

export interface Scene {
    /** `/${category}/${story}` — the navigable route path (demo/router.ts). */
    path: string;
    category: string;
    story: string;
}

/** Re-source every navigable scene from each section's `routes.ts`. NOT a hand list. */
export function sourceScenes(): Scene[] {
    const scenes: Scene[] = [];
    for (const dir of readdirSync(STORIES_DIR, { withFileTypes: true })) {
        const file = `${STORIES_DIR}/${dir.name}/routes.ts`;
        if (!dir.isDirectory() || !existsSync(file)) continue;
        const src = readFileSync(file, "utf8");
        const category = src.match(/\bid:\s*"([a-z0-9-]+)",\s*\n\s*title:/)?.[1];
        if (!category) continue;
        for (const m of src.matchAll(/\{ id: "([a-z0-9-]+)", title:/g)) {
            scenes.push({ path: `/${category}/${m[1]}`, category, story: m[1]! });
        }
    }
    if (scenes.length === 0) {
        throw new Error(
            `pi-manifest: re-source FAILED — no rows parsed from ${STORIES_DIR}/*/routes.ts. The row shape moved; do NOT hand-list.`,
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

/** The π-lane targets, RESOLVED (not hand-coded) from the manifest. */
export const PI_TARGETS = {
    get aurora(): Scene {
        return resolveScene("substrates", "aurora");
    },
    get blob(): Scene {
        // AY.W-BLOB2 — the demo blob story id is `substrates/blob` (the AX IA
        // consolidation renamed `goo-blob` → `blob` and folded interaction/mood into
        // ONE page); the prior `goo-blob` resolve was a stale route that REDded every
        // π-workspace blob gate with "scene not found" (RESEARCH.md §5.1 flagged it for
        // this wave). The anti-drift resolveScene tracks the manifest source-of-truth.
        return resolveScene("substrates", "blob");
    },
    get dock(): Scene {
        // The REAL collapsible dock is the app-chrome page, `("dock", "chrome")`:
        // `collapse="closed" fit-content`, folding to its seal when idle.
        return resolveScene("dock", "chrome");
    },
    // AY.W-COHERE — the constellation + fourier substrate routes the set-cohesion
    // gate samples (the focal ring + the comet head accent marks; the recession
    // bite). Resolved (not hand-coded) against the manifest source-of-truth.
    get constellation(): Scene {
        return resolveScene("substrates", "constellation");
    },
    get fourier(): Scene {
        return resolveScene("substrates", "fourier-field");
    },
    // AX.W44 — the destructive-Alert route (the "Session expired" ink-role surface).
    // dark-semantic-contrast.spec.ts toggles `.dark`, reads back the AlertTitle's
    // resolved color over the card, and recomputes the WCAG ratio in-test.
    get feedbackAlert(): Scene {
        return resolveScene("feedback", "alert");
    },
} as const;

/**
 * Re-source the aurora preset keys from `demo/stories/substrates/aurora/presets.ts`
 * (`AURORA_PRESETS = [{ key: "setting-sun", … }, …]`), in the order the page shows its
 * chips. The substrate-paints-color spec renders aurora DEFAULT + EACH preset at t=1.
 */
export function sourcePresetKeys(): string[] {
    const src = readFileSync(PRESETS_PATH, "utf8");
    // The `export const AURORA_PRESETS … = [ … ];` array literal; each entry opens
    // with its `key`.
    const block = src.match(/export const AURORA_PRESETS\b[^=]*=\s*\[([\s\S]*?)\n\];/);
    if (!block) {
        throw new Error(
            `pi-manifest: could not parse the AURORA_PRESETS array from ${PRESETS_PATH} — re-source the preset keys, do NOT hand-list.`,
        );
    }
    const keys = [...block[1]!.matchAll(/\{\s*key:\s*"([a-z0-9-]+)"/g)]
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
            "aurora WebGL2 interior paints non-black across all presets at t=1 (the black-canvas class)",
        ownerWave: "AX.W07",
        // RE-PROBED on a real Metal GPU (apple/metal-3): the aurora interior paints
        // non-black device-proven; the live aurora renders on the single-pass WebGL2
        // fragment shader (docs/tranches/AX/audit/W07-aurora-core-unblock.json).
        verdict: "re-probed",
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
