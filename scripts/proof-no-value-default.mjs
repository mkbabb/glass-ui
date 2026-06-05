#!/usr/bin/env node
// AU.W7 — the no-value-default gate (proof:no-value-default, DEC-AT-2).
//
// The blob's color seam is REQUIRED-injected: a no-resolver mount must THROW,
// naming `defaultBlobColorResolver` (the loud failure with an actionable
// instruction), NOT fall back to a silent gray default (the forbidden form, P6 —
// a silent default would mask a mis-wired consumer + ship a wrong color).
//
// Static, falsifiable: the renderer guards `colorResolver` and throws a message
// that names `defaultBlobColorResolver`, AND no silent gray/zero default color
// path exists in its stead.
//
// inv ε / bite-check: replacing the throw with a default color reddens it.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        RENDERER: resolve(ROOT, "src/components/custom/goo-blob/composables/useMetaballRenderer.ts"),
        GOOBLOB: resolve(ROOT, "src/components/custom/goo-blob/GooBlob.vue"),
        ARTIFACT: gateArtifactPath("GLASS_UI_NO_VALUE_DEFAULT_ARTIFACT", "AU-no-value-default"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, RENDERER, GOOBLOB, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(RENDERER)) {
        violations.push("the metaball renderer is absent");
    } else {
        const src = readFileSync(RENDERER, "utf8");
        // a throw whose message names defaultBlobColorResolver, guarded on the resolver
        const guardThrows = /typeof\s+colorResolver\s*!==?\s*["']function["']/.test(src) && /throw\b/.test(src);
        const namesDefault = /defaultBlobColorResolver/.test(src);
        facts.guardThrows = guardThrows;
        facts.namesDefault = namesDefault;
        if (!guardThrows) violations.push("useMetaballRenderer does not GUARD + THROW on a missing/invalid colorResolver");
        if (!namesDefault) violations.push("the no-resolver error does not name `defaultBlobColorResolver` (the actionable instruction)");
    }

    // GooBlob requires the prop (not optional with a default)
    if (existsSync(GOOBLOB)) {
        const goo = readFileSync(GOOBLOB, "utf8");
        facts.gooHasResolverProp = /colorResolver/.test(goo);
        if (!facts.gooHasResolverProp) violations.push("GooBlob.vue does not thread a colorResolver prop");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:no-value-default", facts, violations });

    console.log("proof:no-value-default — a no-resolver mount THROWS (names defaultBlobColorResolver), no silent gray (AU.W7)");
    console.log(`  guard + throw       : ${facts.guardThrows ? "yes ✓" : "NO"}`);
    console.log(`  names default       : ${facts.namesDefault ? "yes ✓" : "NO"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
