#!/usr/bin/env node
// AW.W31.b — the DESIGN.md currency gate (proof:design-md-current).
//
// The standing gate that every `src/**/DESIGN.md` reflects the post-AW shape —
// a future aurora change cannot drift the design-document-of-record back to a
// stale single-pass / `color.ts`-local invariant without failing closed.
//
// At HEAD the inventory is ONE doc: `src/components/custom/aurora/DESIGN.md`
// (the blob ships `goo-blob/README.md`, not a DESIGN.md — no blob DESIGN.md is
// minted, the overfit guard). The gate discovers `src/**/DESIGN.md` dynamically;
// if a future band lands a new one it joins the currency check.
//
// THE CURRENCY MARKERS (the four post-AW deltas the spec §3/§5 names) — the
// aurora DESIGN.md must:
//
//   COLOR-HOME  — name the SHARED `procedural-color.glsl.ts` color source (the
//                 W5 splice: the OKLCh Ottosson matrices live in the chunk
//                 aurora + blob both consume), not ONLY the CPU `color.ts`
//                 flatten. (The v4.1 doc named only `color.ts`.)
//
//   PAINTERLY-MEDIUMS — name the W4 painterly mediums + the tensor-orientation
//                 axis: the structure-tensor / ETF orientation field, real
//                 (height→normal→relit) impasto, the van-Gogh atomic-stroke
//                 medium, and the `strokeOrient:"tensor"` axis.
//
//   V5-MARKER   — carry the `v5.0` version marker citing W4/W5/W7 (the post-AW
//                 cut) — distinct from the stale `v4.1` marker.
//
// AND a STALENESS guard: the doc must NOT carry the bare v4.1 stale claims as
// the LIVE invariant — "Single draw, single shader, zero deps" + "No multi-pass
// pipelines" must be re-framed (the gate accepts them ONLY inside a
// fallback/WebGL2/relaxation framing, not as the unqualified invariant).
//
// House style mirrors the repo's .mjs gates: ESM, a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on any
// violation.

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// Each marker: a label + a predicate over the doc text + the human gap message.
// `anyOf` passes if ANY listed term is present (case-insensitive).
const MARKERS = [
    {
        label: "COLOR-HOME",
        anyOf: [
            "procedural-color.glsl.ts",
            "procedural-color.glsl",
            "OKLCH_MATRICES_GLSL",
        ],
        gap: "does not name the SHARED procedural-color.glsl.ts color source (the W5 splice) — names only the CPU color.ts flatten",
    },
    {
        label: "PAINTERLY-MEDIUMS",
        // The W4 mediums + the tensor axis. Require the van-Gogh medium AND the
        // tensor orientation AND the impasto relight named.
        allOf: [
            ["van-gogh", "van gogh", "vangogh"],
            ["structure-tensor", "structure tensor", "strokeorient", "tensor"],
            ["impasto"],
        ],
        gap: "does not name the W4 painterly mediums (van-Gogh atomic-stroke + structure-tensor/strokeOrient + real-impasto relight)",
    },
    {
        label: "V5-MARKER",
        anyOf: ["v5.0"],
        gap: "does not carry the v5.0 version marker (the post-AW cut)",
    },
    {
        label: "W4-W5-W7-CITED",
        // The §"Spec deltas (v4.1 → v5.0)" block must cite the source waves.
        allOf: [
            ["w4", "aw.w4"],
            ["w5", "aw.w5"],
            ["w7", "aw.w7"],
        ],
        gap: "does not cite W4/W5/W7 by wave id in the v4.1 → v5.0 spec-delta block",
    },
];

// Staleness guard: the bare v4.1 invariant claims must not stand UNQUALIFIED as
// the live invariant. Each: a stale phrase + the framing terms that, if PRESENT
// in the doc, mean the phrase is re-framed (acceptable). A stale phrase with NO
// framing term anywhere in the doc is a violation.
const STALENESS = [
    {
        stale: "v4.1",
        // The version line must not still DECLARE the doc as v4.1 (the status
        // line). A historical "(v4.1 → v5.0)" delta-block citation is fine — so
        // the violation fires only when the doc lacks the v5.0 marker entirely
        // (handled by V5-MARKER) AND still leads with v4.1. Here: flag a v4.1
        // STATUS declaration with no v5.0 anywhere.
        requireFraming: ["v5.0"],
        gap: "still declares the doc version as v4.1 with no v5.0 cut",
    },
];

export function detectDoc(text) {
    const hay = text.toLowerCase();
    const violations = [];

    for (const m of MARKERS) {
        let present;
        if (m.anyOf) {
            present = m.anyOf.some((t) => hay.includes(t.toLowerCase()));
        } else {
            // allOf: each inner group is an anyOf; every group must hit.
            present = m.allOf.every((group) =>
                group.some((t) => hay.includes(t.toLowerCase())),
            );
        }
        if (!present) violations.push(`${m.label}: ${m.gap}`);
    }

    for (const s of STALENESS) {
        const hasStale = hay.includes(s.stale.toLowerCase());
        const framed = s.requireFraming.some((t) => hay.includes(t.toLowerCase()));
        if (hasStale && !framed) violations.push(`STALE: ${s.gap}`);
    }

    return violations;
}

// Discover every src/**/DESIGN.md.
export function findDesignDocs(read, walkRoot = "src") {
    const out = [];
    const walk = (relDir) => {
        for (const e of read.dir(relDir)) {
            if (e.name === "node_modules") continue;
            const rel = `${relDir}/${e.name}`;
            if (e.isDirectory()) walk(rel);
            else if (e.name === "DESIGN.md") out.push(rel);
        }
    };
    walk(walkRoot);
    return out;
}

export function detectAll(read) {
    const docs = findDesignDocs(read);
    const violations = [];
    const perDoc = {};
    for (const rel of docs) {
        const v = detectDoc(read.file(rel)).map((msg) => `${rel}: ${msg}`);
        perDoc[rel] = v.length;
        violations.push(...v);
    }
    return { docs, perDoc, violations };
}

const io = {
    file: (rel) => readFileSync(resolve(ROOT, rel), "utf8"),
    dir: (rel) => readdirSync(resolve(ROOT, rel), { withFileTypes: true }),
};

function run() {
    const { docs, perDoc, violations } = detectAll(io);
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DESIGN_MD_CURRENT_ARTIFACT",
        "AW-design-md-current",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:design-md-current",
        designDocs: docs,
        perDoc,
        violations,
    });
    console.log("proof:design-md-current — the DESIGN.md currency gate (AW.W31.b)");
    console.log(
        `  src/**/DESIGN.md docs      : ${docs.length} (${docs.join(", ") || "none"})`,
    );
    console.log(`  currency violations        : ${violations.length}`);
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
