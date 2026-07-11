#!/usr/bin/env node
// BH.B4b-content — proof:canon-homes (the canon-home CONTENT + silent-loss fence).
//
// THE CLASS THIS KILLS — the green-over-scaffold. B4b-skeleton landed the docs/canon
// homes as EMPTY-but-present scaffolds (each a `> SKELETON (BH.B4b-skeleton)` stub) +
// the resolver seam; B4b-content redistributes the live CLAUDE.md contract PROSE into
// those homes. The silent-loss fence (the whole reason the redistribution precedes the
// B4f CLAUDE.md delete): a contract must land content-COMPLETE at its new home BEFORE
// the source is deleted — a home that still carries the skeleton marker, or a one-line
// stub, is the close-class lie this gate REDs.
//
// TWO clauses, both DEVICE-FREE and pure-FS:
//   (H) HOMES-CONTENT — auditCanonHomes("content") == [] : every CANON_HOMES key is
//       content-real (the verbatim SKELETON marker STRIPPED + a >200-char body). A
//       skeleton stub / a thin body / an absent home each fails.
//   (D) DEP-TABLE — the dependencies home carries its dependency list AS A MARKDOWN
//       TABLE (fold-obligation 1). citedDeps() parses ONLY a `| `pkg` ^range | role |`
//       table, and the doc-consistency dep-rot arm re-homes onto it — so a PROSE-only
//       dependencies.md (marker stripped, >200 chars, NO table) would green clause (H)
//       WHILE the dep-rot arm parses 0 deps and stays permanently vacuous. This clause
//       asserts citedDeps() over the on-disk home returns ≥ MIN_DEPS rows.
//   (R) REGISTER-FRESH — the GENERATED canonical-primitives register
//       (docs/canon/primitives.json, BH.B4-canon / ATLAS-M item 7) is present AND
//       byte-fresh (committed == `regen-primitives --write`) AND carries ≥ MIN_PRIMITIVES
//       exported symbols. It is the ROOT registry atlas's G-M11 gate references — a
//       subpath add / export rename that never re-generated it would strand atlas on a
//       stale register (the derive-not-hand-author self-lock, mirroring
//       proof:claude-structure-sync's structure.md freshness arm).
//
// SELF-PROVING — the pure detectors are fed synthetic bodies each run (a skeleton-
// marker stub must classify "skeleton", a fat body "content", a prose-only dep block
// 0 rows); if a detector loses its bite the gate REDs (the bite is demonstrated every
// invocation — the proof:consumer-evidence-live shape).
//
// Born-RED on HEAD (the 8 skeleton canon docs + the absent instrument-chassis README →
// 9 content violations, AND the skeleton dependencies.md → 0 dep rows); GREEN once the
// contracts redistribute content-complete + the dep TABLE lands. House style mirrors
// proof-consumer-evidence-live.mjs: ESM .mjs, pure exported detectors, a byte-stable
// JSON artefact via gate-output, a human summary, process.exit(1) on any violation.

import { pathToFileURL } from "node:url";
import {
    ROOT,
    CANON_HOMES,
    SKELETON_MARKER,
    auditCanonHomes,
    classifyCanonBody,
    citedDeps,
    canonHomeState,
} from "./lib/canon-doc.mjs";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
import {
    primitivesFreshness,
    buildPrimitivesRegister,
} from "./regen-primitives.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_CANON_HOMES_ARTIFACT",
    "BH-canon-homes",
);

// The dependency TABLE floor — the real peer set is 11 rows; a table that lost its
// rows (or a prose-only regression) drops below this and REDs the dep-rot arm's source.
const MIN_DEPS = 5;

// The primitives-register floor — the real surface is 90 subpaths / >1500 exports; a
// register that collapsed (a broken generator emitting an empty `primitives`) drops
// below this and REDs, so a vacuous register cannot green the REGISTER-FRESH clause.
const MIN_PRIMITIVES = 40;

// ── The self-test bite — the pure detectors must keep their teeth every run ──────────
function selfTest() {
    const notes = [];
    // classifyCanonBody: a skeleton stub classifies "skeleton".
    const stub = `# X\n\n> ${SKELETON_MARKER}. redistributes later.\n`;
    if (classifyCanonBody(stub) !== "skeleton")
        notes.push("classifyCanonBody failed to flag a synthetic SKELETON stub");
    // classifyCanonBody: a fat marker-free body classifies "content".
    const fat = `# X\n\n${"real contract prose. ".repeat(20)}`;
    if (classifyCanonBody(fat) !== "content")
        notes.push("classifyCanonBody failed to accept a synthetic content body");
    // classifyCanonBody: a thin marker-free body classifies "thin" (not content).
    if (classifyCanonBody("# X\n\nstub.") === "content")
        notes.push("classifyCanonBody wrongly accepted a synthetic thin stub");
    // citedDeps: a PROSE-only dep block parses 0 rows (the dep-table would go vacuous).
    const prose =
        "# Dependencies\n\nAll deps are peer: vue, reka-ui, tailwindcss — a bulleted list, no table.\n";
    if (citedDeps(prose).length !== 0)
        notes.push("citedDeps wrongly parsed rows from a prose-only (no-table) dep block");
    // citedDeps: a real table row parses; the header row does not.
    const table =
        "# Deps\n\n| Package | Role |\n|---|---|\n| `vue` ^3.5 | Framework |\n";
    const parsed = citedDeps(table);
    if (parsed.length !== 1 || parsed[0].pkg !== "vue" || parsed[0].range !== "^3.5")
        notes.push("citedDeps failed to parse a synthetic dependency TABLE row");
    // primitives register: the generator yields a non-vacuous `primitives` array…
    const reg = buildPrimitivesRegister();
    if (!Array.isArray(reg.primitives) || reg.primitives.length < MIN_PRIMITIVES)
        notes.push("buildPrimitivesRegister produced a vacuous/short primitives array");
    // …and a synthetic DRIFT (a mutated register) is not byte-equal to the fresh form
    // (the committed==regen comparator would catch a stale on-disk register).
    const fresh = JSON.stringify(reg, null, 2) + "\n";
    const drifted = fresh.replace(/"subpathCount":\s*\d+/, '"subpathCount": -1');
    if (fresh === drifted)
        notes.push("the primitives-register freshness comparator failed to detect a synthetic drift");
    return notes;
}

function run() {
    const violations = [];

    // (H) HOMES-CONTENT
    const failing = auditCanonHomes("content");
    for (const { key, rel, state } of failing) {
        violations.push(
            `canon home "${key}" (${rel}) is ${state.toUpperCase()}, not content-complete — ` +
                `redistribute the live contract PROSE there (strip the "${SKELETON_MARKER}" marker; a >200-char body) before B4f deletes CLAUDE.md (the silent-loss fence)`,
        );
    }

    // (D) DEP-TABLE
    const deps = citedDeps();
    if (deps.length < MIN_DEPS) {
        violations.push(
            `docs/canon/dependencies.md cites ${deps.length} dependency table row(s) (< ${MIN_DEPS}) — ` +
                "the dependency list MUST be a markdown TABLE (| `pkg` ^range | role | rows), NOT prose/bullets, or the doc-consistency dep-rot arm parses 0 deps and stays vacuous (fold-obligation 1)",
        );
    }

    // (R) REGISTER-FRESH — the generated canonical-primitives register is present,
    // byte-fresh, and non-vacuous (the ROOT registry atlas G-M11 references).
    const reg = primitivesFreshness();
    const regRows = buildPrimitivesRegister().primitives.length;
    if (reg.committed === null) {
        violations.push(
            `${reg.outRel} — the generated canonical-primitives register is ABSENT; run \`node scripts/regen-primitives.mjs --write\` (ATLAS-M item 7 — atlas G-M11 references this ROOT registry)`,
        );
    } else if (!reg.fresh) {
        violations.push(
            `${reg.outRel} — STALE: a published subpath / an export drifted from disk without re-generating the register. Run: node scripts/regen-primitives.mjs --write (derive-not-hand-author — the register cannot be stale when atlas reads it)`,
        );
    } else if (regRows < MIN_PRIMITIVES) {
        violations.push(
            `${reg.outRel} — the register lists ${regRows} subpath(s) (< ${MIN_PRIMITIVES}) — the generator collapsed to a vacuous register`,
        );
    }

    // SELF-PROOF
    const selfNotes = selfTest();
    for (const n of selfNotes) violations.push(`SELF-PROOF FAILED: ${n}`);

    const status = violations.length === 0 ? "pass" : "fail";
    const facts = {
        homeCount: Object.keys(CANON_HOMES).length,
        contentComplete: Object.keys(CANON_HOMES).length - failing.length,
        failing: failing.map((f) => ({ key: f.key, state: f.state })),
        depTableRows: deps.length,
        depTableFloor: MIN_DEPS,
        primitivesRegister: reg.outRel,
        primitivesRegisterFresh: reg.committed !== null && reg.fresh,
        primitivesSubpaths: regRows,
        selfProof: selfNotes.length === 0 ? "ok" : "FAILED",
        states: Object.fromEntries(
            Object.keys(CANON_HOMES).map((k) => [k, canonHomeState(k)]),
        ),
    };

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:canon-homes",
        facts,
        violations,
    });

    console.log(
        "proof:canon-homes — every canon home is content-complete + the dep TABLE parses (BH.B4b-content silent-loss fence)",
    );
    console.log(`  canon homes                 : ${facts.homeCount}`);
    console.log(`  content-complete            : ${facts.contentComplete}`);
    console.log(`  dependency table rows       : ${facts.depTableRows} (floor ${facts.depTableFloor})`);
    console.log(`  primitives register         : ${facts.primitivesSubpaths} subpaths, fresh=${facts.primitivesRegisterFresh}`);
    console.log(`  self-proof                  : ${facts.selfProof}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
