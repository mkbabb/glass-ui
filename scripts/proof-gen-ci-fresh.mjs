// proof:gen-ci-fresh — AX.W62 Gate 4: the ci.yml byte-freshness gate.
//
// `gates.mjs --verify-ci` only DETECTS a drift (the ci-tagged set vs the ci.yml
// `run:` lines) — it cannot PREVENT one, and the committed ci.yml had silently
// fallen 20 gates behind the manifest. This gate makes drift IMPOSSIBLE rather
// than merely detected: it regenerates the YAML from the manifest
// (`renderCiYaml`) and asserts the committed `.github/workflows/ci.yml` is
// byte-identical. The file is a GENERATED artefact — to change CI you edit the
// manifest and re-emit (`npm run gates:emit-ci`), never hand-edit the YAML.
//
// In the RELEASE set: a drifted ci.yml refuses to publish. Born-RED whenever the
// committed file differs from the emit (a hand edit, or a manifest change not
// re-emitted). Bite: add a ci-tagged gate without re-emitting → RED.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { renderCiYaml } from "./gates.mjs";

const ciPath = resolve(ROOT, ".github/workflows/ci.yml");

let expected;
try {
    expected = renderCiYaml();
} catch (e) {
    console.error(String(e?.message ?? e));
    process.exit(1);
}

let committed = "";
try {
    committed = readFileSync(ciPath, "utf8");
} catch {
    console.error(`[proof:gen-ci-fresh] ${ciPath} not found — run \`npm run gates:emit-ci\`.`);
    process.exit(1);
}

if (committed !== expected) {
    const a = committed.split("\n");
    const b = expected.split("\n");
    const n = Math.max(a.length, b.length);
    let firstDiff = -1;
    for (let i = 0; i < n; i++) {
        if (a[i] !== b[i]) {
            firstDiff = i;
            break;
        }
    }
    console.error("[proof:gen-ci-fresh] ci.yml has DRIFTED from `gates.mjs --emit-ci`:");
    console.error(`  committed lines: ${a.length}   expected lines: ${b.length}`);
    if (firstDiff >= 0) {
        console.error(`  first difference at line ${firstDiff + 1}:`);
        console.error(`    committed: ${JSON.stringify(a[firstDiff] ?? "(missing)")}`);
        console.error(`    expected : ${JSON.stringify(b[firstDiff] ?? "(missing)")}`);
    }
    console.error("\n  Fix: `npm run gates:emit-ci` then commit the regenerated ci.yml.");
    process.exit(1);
}

console.log(
    "[proof:gen-ci-fresh] ci.yml is byte-identical to `gates.mjs --emit-ci` (no drift possible).",
);
