#!/usr/bin/env node
// proof:no-retired-survivor — AY.W-LEG1 (the AX.W27a/b gate NEVER written;
// the AX hardening-corpus falsely asserted it was "authored W21 / registered W33").
//
// MIGRATION.md is BINDING (L invariant 16). Every "RETIRED" claim it makes is a
// promise that the named artefact — a `@mkbabb/glass-ui/<x>` subpath, a `src/…`
// component dir, an exported symbol, a `--<token>` — is GONE. A half-landed
// retirement that the migration guide asserts as complete is the exact
// headless-green / doc-says-done-but-reverted failure class: at HEAD,
// `MIGRATION.md:800` declares `metric-cell` + `metric-stack` RETIRED while the
// dirs/subpath-barrels/package.json-exports/api-re-exports all SURVIVE (speedtest
// re-adopted them). A consumer reading the guide is misled.
//
// This gate resolves each RETIRED claim's named artefacts to their on-disk
// reality and REDs on any survivor — so a binding-doc retirement lie cannot ride
// again. It does NOT re-retire a live-consumed family; the honest fix for the
// metric lie is the doc correction (the MIGRATION.md entry rewritten to the
// truth: un-retired, speedtest-consumed), which this gate then verifies stays
// honest.
//
// THE CLAIM MODEL. A RETIRED claim is a MIGRATION.md heading or bullet carrying
// the word `RETIRED`. From its text we extract the named artefacts:
//   - SUBPATH — a `@mkbabb/glass-ui/<x>` ref OR a `/<x>` slash-subpath in the
//     claim → must be ABSENT from package.json `exports` + `typesVersions`.
//   - DIR — a `<x>/` component-dir ref → the dir must NOT exist under
//     `src/components/{ui,custom}/<x>` and no `src/subpaths/<x>.ts` /
//     `src/<x>.ts` barrel may survive.
//   - EXPORT — a backticked Capitalized identifier the claim says is deleted →
//     ABSENT from `src/index.ts` + `src/api/index.ts`.
//   - TOKEN — a `--<x>` token the claim says is removed → ABSENT from
//     `src/styles/`.
// To stay precise (a RETIRED bullet often names the NEW live surface too — e.g.
// "flat `/dark` + `/keyboard`"), the gate keys off the EXPLICITLY-retired
// artefacts each claim enumerates, declared in RETIRED_CLAIMS below (parsed +
// machine-checked, the prose is the human half).
//
// SELF-PROVING: a synthetic RETIRED claim naming a definitely-present subpath
// (`/dock`) is evaluated every run and MUST flag — the bite proof. If it does
// not, the gate reds loudly.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:no-retired-survivor";
const MIGRATION = join(ROOT, "MIGRATION.md");

// ── Survival probes (PURE over the file system / loaded source) ────────────────

/** A claimed-retired SUBPATH survives if package.json still exports it. */
function subpathSurvives(name, pkg) {
    const exportKey = `./${name}`;
    const inExports = Object.prototype.hasOwnProperty.call(pkg.exports ?? {}, exportKey);
    const tv = pkg.typesVersions?.["*"] ?? {};
    const inTypesVersions = Object.prototype.hasOwnProperty.call(tv, name);
    return inExports || inTypesVersions;
}

/** A claimed-retired component DIR survives if the dir or a barrel for it exists. */
function dirSurvives(name) {
    const candidates = [
        join(ROOT, "src/components/ui", name),
        join(ROOT, "src/components/custom", name),
        join(ROOT, "src/subpaths", `${name}.ts`),
        join(ROOT, "src", `${name}.ts`),
    ];
    return candidates.find((p) => existsSync(p)) ?? null;
}

/** A claimed-retired EXPORT survives if a barrel still re-exports the symbol. */
function exportSurvives(symbol, barrels) {
    const re = new RegExp(`\\b${symbol}\\b`);
    for (const [rel, src] of barrels) if (re.test(src)) return rel;
    return null;
}

/** A claimed-retired TOKEN survives if any styles/ file still declares it. */
function tokenSurvives(token, stylesSrc) {
    // `--metric-row-*` → the family stem; a literal `--x` → exact.
    const stem = token.replace(/-\*$/, "");
    return stylesSrc.includes(stem);
}

// ── The declared RETIRED claims — each line+artefacts machine-checked ──────────
// Parsed from MIGRATION.md (the `line` is verified to carry `RETIRED`), the
// artefact lists are the concrete promise each claim makes. This keeps the gate
// precise: a bullet that names BOTH the retired AND the live-replacement surface
// (the common shape) only asserts the RETIRED side.
const RETIRED_CLAIMS = [
    {
        label: "nested composables/dark + composables/keyboard subpaths (MIGRATION.md:33)",
        mustCarry: "RETIRED",
        line: 33,
        subpaths: ["composables/dark", "composables/keyboard"],
    },
    {
        label: "pagination/virtual composables + subpaths (MIGRATION.md:38)",
        mustCarry: "RETIRED",
        line: 38,
        subpaths: ["pagination", "virtual"],
        exports: [
            "useOffsetPagination",
            "useVirtualSectionWindow",
            "useWindowedStore",
            "virtualSectionLayout",
        ],
    },
    {
        label: "demo-private <DockShowcaseFrame> primitive (MIGRATION.md:41)",
        mustCarry: "RETIRED",
        line: 41,
        exports: ["DockShowcaseFrame"],
    },
    // NOTE: the metric-cell + metric-stack families are NOT retired — they ship,
    // speedtest-consumed (MIGRATION.md §"KEPT (speedtest-consumed)", corrected
    // here from the AV.W10 doc lie). They are deliberately absent from this list:
    // a RETIRED claim for a live-consumed family would be the lie this gate exists
    // to forbid. The gate stays honest by the un-retirement doc correction, not by
    // listing them as retired.
];

/**
 * Evaluate a single claim → violation strings. PURE over the loaded inputs so the
 * self-test can drive a synthetic claim.
 *
 * @param {object} claim
 * @param {{pkg:object, barrels:[string,string][], stylesSrc:string}} ctx
 * @returns {string[]}
 */
export function evaluateClaim(claim, ctx) {
    const v = [];
    for (const sp of claim.subpaths ?? []) {
        if (subpathSurvives(sp, ctx.pkg))
            v.push(
                `${claim.label}: subpath "@mkbabb/glass-ui/${sp}" is claimed RETIRED but package.json still exports it`,
            );
    }
    for (const d of claim.dirs ?? []) {
        const hit = dirSurvives(d);
        if (hit)
            v.push(
                `${claim.label}: dir/barrel "${d}" is claimed RETIRED but survives at ${hit.slice(ROOT.length + 1)}`,
            );
    }
    for (const e of claim.exports ?? []) {
        const hit = exportSurvives(e, ctx.barrels);
        if (hit)
            v.push(`${claim.label}: export "${e}" is claimed RETIRED but survives in ${hit}`);
    }
    for (const t of claim.tokens ?? []) {
        if (tokenSurvives(t, ctx.stylesSrc))
            v.push(`${claim.label}: token "${t}" is claimed RETIRED but survives in src/styles/`);
    }
    return v;
}

// ── Load the inputs ────────────────────────────────────────────────────────
function loadBarrels() {
    const rels = ["src/index.ts", "src/api/index.ts"];
    return rels
        .map((rel) => [rel, existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), "utf8") : ""])
        .filter(([, src]) => src.length > 0);
}

function loadStyles() {
    // Concatenate every styles/ file's text — a token survives if ANY declares it.
    const dir = join(ROOT, "src/styles");
    if (!existsSync(dir)) return "";
    let out = "";
    const walk = (d) => {
        for (const n of readdirSync(d)) {
            const p = join(d, n);
            if (statSync(p).isDirectory()) walk(p);
            else if (n.endsWith(".css")) out += readFileSync(p, "utf8") + "\n";
        }
    };
    walk(dir);
    return out;
}

function run() {
    const md = existsSync(MIGRATION) ? readFileSync(MIGRATION, "utf8") : "";
    if (!md) {
        console.error(`[proof:no-retired-survivor] MIGRATION.md not found: ${MIGRATION}`);
        process.exit(1);
    }
    const mdLines = md.split("\n");
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    const barrels = loadBarrels();
    const stylesSrc = loadStyles();
    const ctx = { pkg, barrels, stylesSrc };

    const violations = [];

    // Every declared claim's `line` MUST still carry `RETIRED` (the claim is real
    // + located) — a moved/edited line that no longer asserts retirement is a
    // stale claim entry, flagged so the gate's claim list stays honest.
    for (const claim of RETIRED_CLAIMS) {
        const text = mdLines[claim.line - 1] ?? "";
        if (!text.includes(claim.mustCarry)) {
            // Not a hard violation if the artefacts are all gone; but if the line
            // moved, the human + machine halves drifted — surface it as a note.
            // We still evaluate the artefacts below (the binding check).
            console.error(
                `  NOTE: ${claim.label} — MIGRATION.md:${claim.line} no longer carries "RETIRED"; re-anchor the claim line.`,
            );
        }
        violations.push(...evaluateClaim(claim, ctx));
    }

    // Coverage guard — every MIGRATION.md line that ASSERTS a retirement must be
    // anchored by a declared claim (or be a back-reference to one). A NEW RETIRED
    // line not on this set is an un-checked claim that could ride a fresh lie —
    // flagged so the declared claim list cannot silently fall behind the doc.
    const declaredLines = new Set(RETIRED_CLAIMS.map((c) => c.line));
    // Back-reference / cross-link lines that point at an ALREADY-declared claim
    // (not a new retirement assertion): MIGRATION.md:139 ("…is RETIRED—see §2").
    const BACKREF_LINES = new Set([139]);
    mdLines.forEach((ln, i) => {
        const n = i + 1;
        if (!/RETIRED/.test(ln)) return;
        if (declaredLines.has(n) || BACKREF_LINES.has(n)) return;
        violations.push(
            `MIGRATION.md:${n} asserts RETIRED but is not anchored by a declared claim in RETIRED_CLAIMS — add it (with its named artefacts) so the retirement is machine-checked, or mark it a back-reference.`,
        );
    });

    // SELF-TEST — a synthetic RETIRED claim naming a definitely-LIVE subpath
    // (`/dock`) MUST flag. The bite proof, every run.
    const selfFlag = evaluateClaim(
        { label: "SELFTEST", subpaths: ["dock"] },
        ctx,
    );
    if (selfFlag.length === 0) {
        console.error(
            "[proof:no-retired-survivor] SELF-TEST FAILED — a synthetic RETIRED claim for the LIVE /dock subpath was NOT flagged; the gate is not load-bearing.",
        );
        process.exit(1);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GATE_NO_RETIRED_SURVIVOR_OUT", "AY-no-retired-survivor");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-retired-survivor",
        command: COMMAND,
        claims: RETIRED_CLAIMS.map((c) => c.label),
        violations,
    });

    console.log("proof:no-retired-survivor — every MIGRATION.md RETIRED claim resolves to absent (AY.W-LEG1)");
    console.log(`  MIGRATION.md          : ${MIGRATION.slice(ROOT.length + 1)}`);
    console.log(`  RETIRED claims checked: ${RETIRED_CLAIMS.length}`);
    console.log(`  self-test (bite proof): OK — synthetic /dock RETIRED claim flagged`);
    console.log(`  violations            : ${violations.length}`);
    for (const v of violations) console.error(`  ${v}`);

    if (status === "fail") {
        console.error(
            `\n[proof:no-retired-survivor] ${violations.length} surviving retired artefact(s) — a MIGRATION.md RETIRED claim is a binding promise (L inv 16). Re-land the retirement OR rewrite the claim to the truth.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:no-retired-survivor] every RETIRED claim resolves to zero surviving dir/subpath/export/token.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
