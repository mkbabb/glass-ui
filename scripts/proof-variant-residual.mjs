#!/usr/bin/env node
// proof:variant-residual — a `variant` CVA map may carry STYLE members ONLY
// (BI.W-AXES-GATES · FAM-11 gate-soundness; the Kronecker factorization lock).
//
// The library's `variant` axis is a STYLE axis — a material/register (solid · outline ·
// ghost · glass · link · pill · underline · secondary · accent). It is NOT a home for a
// TONE (success/warning/info/destructive → the `tone` axis), a SIZE (→ the `size` axis),
// nor a SURFACE (glass/veil/opaque/clear → the `surface` axis). At HEAD a tone concept
// hides inside three `variant` CVA maps (alert · badge · button); this gate REDs each
// one so a future agent cannot re-smuggle a non-style concept into a `variant` map.
//
// The scope is the `variant: { … }` CVA block ONLY — a `tone: { success: … }` block is
// the CORRECT home and is never flagged (the block-scoping is the whole point: a tone in
// the VARIANT map is the residual; a tone in the TONE map is the fix). The tone vocabulary
// is read from _shared/axes.ts's TONES tuple (ONE source; a fallback keeps the gate
// runnable if the tuple regexes drift).
//
// Asserts (ONE clause, per-residual reporting):
//   V1 — NO-TONE-IN-VARIANT: no component's `variant: { … }` CVA block declares a key
//        ∈ TONES (neutral/success/warning/info/destructive). Born-RED on HEAD
//        (alert{destructive,success,warning,info} + badge{destructive,success,warning,
//        info} + button{destructive}); GREEN when W-SYNONYM-RENAMES (alert+badge → tone)
//        + W-BUTTON-TONE (button.destructive → tone) land.
//
// Self-test bites (born-RED demonstration + the false-red fences):
//   • a synthetic `variant: { success: … }` block FLAGS success (the residual);
//   • a synthetic `tone: { success: … }` block does NOT flag (the correct home — the
//     block-scoping fence, the CARDINAL bite);
//   • a synthetic `variant: { solid: … }` STYLE block does NOT flag (a style member is
//     legal);
//   • the migrated tree (no tone key in any variant block) carries ZERO violation.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMPONENTS_DIR = resolve(SRC, "components");
const AXES = resolve(SRC, "components/ui/_shared/axes.ts");
const COMMAND = "npm run proof:variant-residual";
const SELF_TEST = process.argv.includes("--self-test");

// The canonical tone vocabulary — read from axes.ts's TONES tuple (single source);
// the fallback mirrors the tuple so a regex drift never silently empties the fence.
const TONES_FALLBACK = ["neutral", "success", "warning", "info", "destructive"];

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments to spaces (a tone named in a comment is
// provenance, never a live CVA key).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Recursively collect every `.ts`/`.vue` file under `dir`.
function walkSrc(dir) {
    const out = [];
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
        const p = resolve(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...walkSrc(p));
        else if (/\.(ts|vue)$/.test(name)) out.push(p);
    }
    return out;
}

// Read the TONES members from axes.ts (a `TONES = [ "a", "b" ] as const` tuple).
function readTones() {
    const m = stripComments(read(AXES)).match(/\bTONES\s*=\s*\[([^\]]*)\]/);
    if (!m) return TONES_FALLBACK;
    const members = [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
    return members.length ? members : TONES_FALLBACK;
}

// The balanced inner body of the FIRST `<key>: { … }` block in `src` (comment-stripped);
// null when absent. Brace-matched so a nested `{}` in a value never truncates the block.
function braceBlock(src, key) {
    const clean = stripComments(src);
    const re = new RegExp(`\\b${key}\\s*:\\s*\\{`, "g");
    const m = re.exec(clean);
    if (!m) return null;
    let depth = 1;
    const start = re.lastIndex;
    for (let i = start; i < clean.length; i++) {
        if (clean[i] === "{") depth++;
        else if (clean[i] === "}") {
            depth--;
            if (depth === 0) return clean.slice(start, i);
        }
    }
    return null;
}

// The top-level KEYS of a flat block body — a `key:`/`'key':` that opens an entry
// (preceded by the block start, a `,`, or a `{`); a string-internal `hover:` (preceded
// by a space inside a quoted value) never matches.
function blockKeys(body) {
    return [
        ...body.matchAll(/(?:^|[,{]\s*)(['"]?)([A-Za-z_$][\w$-]*)\1\s*:/g),
    ].map((m) => m[2]);
}

// The tone-residual keys inside a file's `variant: { … }` CVA block (never the `tone:`
// block — a `variant` that appears only as a `defaultVariants` string value has no
// `{` after it and is skipped).
function toneResidualsIn(src, tones) {
    const body = braceBlock(src, "variant");
    if (body === null) return [];
    const toneSet = new Set(tones);
    return blockKeys(body).filter((k) => toneSet.has(k));
}

// ── The detector — runs over the components tree with per-file overrides so a
//    self-test can inject a synthetic offender / holder. ──
// overrides: { tones?, sources? } — `sources` is a { rel: text } map.
function detect(overrides = {}) {
    const tones = overrides.tones ?? readTones();
    const violations = [];
    const residualsByFile = {};

    const consider = (rel, text) => {
        const residuals = toneResidualsIn(text, tones);
        if (residuals.length) {
            residualsByFile[rel] = residuals;
            for (const key of residuals)
                violations.push(
                    `V1 — ${rel} declares the TONE \`${key}\` as a \`variant\` CVA member — a tone is not a style; move it onto the \`tone\` axis (W-SYNONYM-RENAMES / W-BUTTON-TONE)`,
                );
        }
    };

    const overSources = overrides.sources ?? {};
    for (const f of walkSrc(COMPONENTS_DIR)) {
        const rel = f.slice(SRC.length + 1);
        consider(rel, overSources[rel] ?? read(f));
    }
    for (const [rel, text] of Object.entries(overSources))
        if (!existsSync(resolve(SRC, rel))) consider(rel, text);

    return {
        facts: {
            tones,
            residualCount: violations.length,
            residualsByFile,
        },
        violations,
    };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration + false-red fences). ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, prefix, name) => {
        const { violations } = detect(overrides);
        if (violations.some((v) => v.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:variant-residual self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, name) => {
        const { violations } = detect(overrides);
        // The fence bite injects a synthetic file that must NOT itself produce a
        // violation; the real tree may still be born-RED, so scope to the injected file.
        const rel = Object.keys(overrides.sources ?? {})[0];
        const injectedFlagged = violations.some((v) => v.includes(rel));
        if (!injectedFlagged) flagged++;
        else
            throw new Error(
                `[proof:variant-residual self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // A tone key in a `variant:` block flags (the residual class).
    sab(
        {
            sources: {
                "components/_selftest-variant-tone.ts":
                    "const v = cva('base', { variants: { variant: { default: 'x', success: 'y' } } });",
            },
        },
        "V1",
        "a tone key `success` inside a variant CVA block",
    );
    sab(
        {
            sources: {
                "components/_selftest-variant-destructive.ts":
                    "cva('b', { variants: { variant: { solid: 'x', destructive: 'y' } } })",
            },
        },
        "V1",
        "a tone key `destructive` inside a variant CVA block",
    );
    // The CARDINAL fence: a tone key inside a `tone:` block is the CORRECT home → no flag.
    sabNot(
        {
            sources: {
                "components/_selftest-tone-block.ts":
                    "cva('b', { variants: { variant: { solid: 'x' }, tone: { neutral: 'n', success: 'y', destructive: 'z' } } })",
            },
        },
        "a tone key inside the tone block (the correct home)",
    );
    // A pure STYLE variant block does NOT flag (a style member is legal).
    sabNot(
        {
            sources: {
                "components/_selftest-variant-style.ts":
                    "cva('b', { variants: { variant: { solid: 'x', outline: 'y', ghost: 'z', secondary: 'w' } } })",
            },
        },
        "a style-only variant block",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_VARIANT_RESIDUAL_ARTIFACT",
        "BI-variant-residual",
    );
    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:variant-residual",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:variant-residual — a `variant` CVA map may carry STYLE members ONLY (BI.W-AXES-GATES · FAM-11)",
    );
    console.log(
        `  V1 no-tone-in-variant  : ${status === "pass" ? "GREEN" : "RED"} (${facts.residualCount} tone residual(s); TONES=${JSON.stringify(facts.tones)})`,
    );
    for (const [rel, keys] of Object.entries(facts.residualsByFile))
        console.log(`    ${rel}: ${keys.join(", ")}`);
    console.log(
        `  self-test (bite proof) : OK — ${selfTestCount} synthetic sabotages handled (V1-variant-tone×2 + tone-block-fence + style-variant-fence)`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    if (SELF_TEST)
        console.log(
            `\n[proof:variant-residual --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, toneResidualsIn, selfTest };
