#!/usr/bin/env node
// AV.W14 — the DI-consistency gate (proof:di-consistency).
//
// Born-RED at open (the four context triplets were hand-rolled). The canonical
// `createStrictContext`/`createOptionalContext` factory pair is the SINGLE
// source every `InjectionKey<T>` context that hand-rolls a strict-or-optional
// triplet must collapse onto. This gate forbids the regression on two axes:
//
//   (1) NO hand-rolled strict triplet survives outside the factory — a context
//       module that declares `InjectionKey<T>` AND hand-rolls the
//       `inject(KEY)` + `if (!ctx) throw` strict pattern (rather than calling
//       `createStrictContext`) is a violation. The factory module itself
//       (`composables/context/createContext.ts`) is the ONE allowed home of
//       that pattern. A bare external-provide key carrying a `// di-default:`
//       sentinel (the goo-blob `BLOB_CONFIG_KEY`) is allowlisted.
//
//   (2) The strict-vs-optional matrix matches the recorded table — each context
//       file resolves to the factory shape the matrix names.
//
//   (3) (Lane E fold) `mulberry32` / `hashString` are DEFINED exactly once in
//       `src/` (the shared `src/utils/prng.ts` leaf) — the PRNG de-dup lock.
//
// bite-check: re-inline a hand-rolled `inject(KEY)` + `if (!ctx) throw` triplet
// at one call site → RED; re-add a second `function mulberry32` → RED.

import { readdirSync, readFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        SRC: resolve(ROOT, "src"),
        FACTORY: resolve(ROOT, "src/composables/context/createContext.ts"),
        FACTORY_BARREL: resolve(ROOT, "src/composables/context/index.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DI_CONSISTENCY_ARTIFACT", "AV-di-consistency"),
    };
}

/** Recursively collect `.ts`/`.vue` files under `dir`, skipping `__tests__/`. */
function collect(dir, acc) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "__tests__" || entry.name === "node_modules") continue;
            collect(full, acc);
        } else if (entry.isFile()) {
            if (entry.name.endsWith(".ts") || entry.name.endsWith(".vue")) acc.push(full);
        }
    }
    return acc;
}

/** The canonical strict-vs-optional matrix — context module → factory shape. */
const MATRIX = {
    "src/components/custom/dock/composables/dockContext.ts": "strict+optional",
    "src/components/custom/dock/composables/dockLayerContext.ts": "strict+optional",
    "src/components/ui/toggle-group/toggleGroupContext.ts": "optional",
    "src/components/custom/sortable-list/context.ts": "strict",
    "src/components/custom/configurator/size.ts": "optional",
};

export function detect(ROOT, SRC, FACTORY, FACTORY_BARREL) {
    const files = collect(SRC, []);
    const violations = [];
    const inventory = [];

    // Axis 1 — no hand-rolled strict triplet outside the factory.
    const STRICT_TRIPLET = /inject\(\s*[A-Z_][A-Za-z0-9_]*\s*\)[\s\S]{0,160}?if\s*\(\s*!\s*[A-Za-z_][A-Za-z0-9_]*\s*\)\s*\{?\s*[\s\S]{0,40}?throw\s+new\s+Error/;
    for (const f of files) {
        if (f === FACTORY || f === FACTORY_BARREL) continue;
        const rel = relative(ROOT, f).split(sep).join("/");
        const text = readFileSync(f, "utf8");
        const declaresKey = /InjectionKey\s*</.test(text);
        const usesFactory = /\bcreate(Strict|Optional)Context\b/.test(text);
        // A context module is one that builds an injection context — either via
        // the factory, or by declaring/exporting an injection key (the
        // di-default external-provide keys, plus any un-migrated triplet).
        if (!declaresKey && !usesFactory) continue;
        const hasDiDefault = /\/\/\s*di-default:/.test(text);
        const hasTriplet = STRICT_TRIPLET.test(text);
        let shape = "n/a";
        if (/\bcreateStrictContext\b/.test(text)) {
            // strict+optional IFF the optional shape is exported (a `= ctx.useOptional`).
            shape = /ctx\.useOptional|useOptional\s*=/.test(text) ? "strict+optional" : "strict";
        } else if (/\bcreateOptionalContext\b/.test(text)) {
            shape = "optional";
        } else if (hasDiDefault) {
            shape = "di-default";
        }
        inventory.push({ file: rel, shape });

        if (hasTriplet) {
            violations.push(
                `${rel} hand-rolls a strict inject()+throw triplet — use createStrictContext() from composables/context`,
            );
        }
        // A keyed context module that is neither factory-built nor a bare
        // di-default external-provide key is an un-migrated triplet.
        if (!usesFactory && !hasDiDefault) {
            violations.push(
                `${rel} declares InjectionKey<T> but neither uses the DI factory nor carries a // di-default: sentinel`,
            );
        }
    }

    // Axis 2 — the matrix matches.
    for (const [relPath, expected] of Object.entries(MATRIX)) {
        const found = inventory.find((i) => i.file === relPath);
        if (!found) {
            violations.push(`matrix: ${relPath} not found in scanned src/ contexts`);
        } else if (found.shape !== expected) {
            violations.push(
                `matrix: ${relPath} resolves shape '${found.shape}', expected '${expected}'`,
            );
        }
    }

    // Axis 3 — single PRNG source.
    const prngDefs = [];
    for (const f of files) {
        const rel = relative(ROOT, f).split(sep).join("/");
        const text = readFileSync(f, "utf8");
        if (/\bexport\s+function\s+mulberry32\b/.test(text)) prngDefs.push(`${rel}:mulberry32`);
        if (/\bexport\s+function\s+hashString\b/.test(text)) prngDefs.push(`${rel}:hashString`);
    }
    const mulberryDefs = prngDefs.filter((d) => d.endsWith(":mulberry32"));
    const hashDefs = prngDefs.filter((d) => d.endsWith(":hashString"));
    if (mulberryDefs.length !== 1) {
        violations.push(`mulberry32 defined ${mulberryDefs.length}× (expected 1): ${mulberryDefs.join(", ")}`);
    }
    if (hashDefs.length !== 1) {
        violations.push(`hashString defined ${hashDefs.length}× (expected 1): ${hashDefs.join(", ")}`);
    }

    return { violations, inventory, prngDefs };
}

function run() {
    const { ROOT, SRC, FACTORY, FACTORY_BARREL, ARTIFACT } = cliPaths();
    const { violations, inventory, prngDefs } = detect(ROOT, SRC, FACTORY, FACTORY_BARREL);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:di-consistency",
        facts: { matrix: MATRIX, contexts: inventory, prngDefs },
        violations,
    });

    console.log("proof:di-consistency — one DI factory pair + matrix + single PRNG (AV.W14)");
    console.log("  context inventory:");
    for (const i of inventory) console.log(`    ${i.shape.padEnd(16)} ${i.file}`);
    console.log(`  PRNG defs: ${prngDefs.join(", ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
