#!/usr/bin/env node
// AW.W14 — the DataTable god-module split gate (proof:datatable-split).
//
// DataTable.vue was the single component the code-quality assay flagged clearly
// over the god-module threshold (442 lines). This wave extracts its two
// orthogonal concerns — row identity (keying/validation) + the responsive
// card-vs-table projection — into colocated INTERNAL composables, dropping the
// SFC below 380 lines with ZERO public-API change.
//
// This gate asserts: (1) DataTable.vue ≤ 380 lines; (2) both composables exist
// under data-table/composables/ and the SFC consumes them; (3) the extracted
// logic no longer resides in the SFC (the row-id generators + the projection
// computeds moved out); (4) the package barrel exports no new symbol (the
// composables are internal).
//
// bite-check: inline either composable back into the SFC → the line ceiling
// and/or the "no longer in the SFC" clauses redden.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const LINE_CEILING = 380;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const DT = resolve(ROOT, "src/components/ui/data-table");
    _cliPaths = {
        ROOT,
        SFC: resolve(DT, "DataTable.vue"),
        ROW_IDENTITY: resolve(DT, "composables/useDataTableRowIdentity.ts"),
        RESPONSIVE: resolve(DT, "composables/useDataTableResponsive.ts"),
        BARREL: resolve(DT, "index.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DATATABLE_SPLIT_ARTIFACT",
            "AW-datatable-split",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, SFC, ROW_IDENTITY, RESPONSIVE, BARREL, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(SFC)) {
        violations.push("DataTable.vue is absent");
    } else {
        const raw = readFileSync(SFC, "utf8");
        const lineCount = raw.split("\n").length;
        facts.lineCount = lineCount;
        if (lineCount > LINE_CEILING) {
            violations.push(
                `DataTable.vue is ${lineCount} lines — over the ${LINE_CEILING}-line ceiling; the split did not reduce it enough`,
            );
        }

        // The SFC must IMPORT + CONSUME both composables.
        facts.importsRowIdentity = /useDataTableRowIdentity/.test(raw);
        facts.importsResponsive = /useDataTableResponsive/.test(raw);
        if (!facts.importsRowIdentity) {
            violations.push("DataTable.vue does not consume useDataTableRowIdentity");
        }
        if (!facts.importsResponsive) {
            violations.push("DataTable.vue does not consume useDataTableResponsive");
        }

        // The extracted logic must NO LONGER live in the SFC.
        facts.rowIdGenInSfc =
            /function getGeneratedRowId/.test(raw) ||
            /new WeakMap<object, symbol>/.test(raw);
        if (facts.rowIdGenInSfc) {
            violations.push(
                "the row-id generation logic still resides in DataTable.vue — it must move to useDataTableRowIdentity",
            );
        }
        // The card-projection computeds (`headerColumn` / `bodyColumns`) must be
        // destructured from the composable, NOT declared inline in the SFC.
        facts.projectionInSfc =
            /const headerColumn = computed/.test(raw) ||
            /const bodyColumns = computed/.test(raw);
        if (facts.projectionInSfc) {
            violations.push(
                "the card-projection computeds still reside in DataTable.vue — they must move to useDataTableResponsive",
            );
        }
    }

    facts.rowIdentityExists = existsSync(ROW_IDENTITY);
    facts.responsiveExists = existsSync(RESPONSIVE);
    if (!facts.rowIdentityExists) {
        violations.push("composables/useDataTableRowIdentity.ts is absent");
    }
    if (!facts.responsiveExists) {
        violations.push("composables/useDataTableResponsive.ts is absent");
    }

    // The package barrel exports NO new symbol — the composables are internal.
    if (!existsSync(BARREL)) {
        violations.push("data-table/index.ts is absent");
    } else {
        const barrel = readFileSync(BARREL, "utf8");
        facts.barrelLeaksComposable =
            /useDataTableRowIdentity|useDataTableResponsive/.test(barrel);
        if (facts.barrelLeaksComposable) {
            violations.push(
                "the data-table barrel re-exports an internal composable — the split must change no public API",
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:datatable-split",
        facts,
        violations,
    });

    console.log(
        "proof:datatable-split — DataTable.vue split into two colocated internal composables, ≤380 lines, zero public-API change (AW.W14)",
    );
    console.log(`  DataTable.vue lines        : ${facts.lineCount ?? "?"}/${LINE_CEILING}`);
    console.log(
        `  row-identity composable    : ${facts.rowIdentityExists ? "exists ✓" : "NO ✗"}   consumed: ${facts.importsRowIdentity ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  responsive composable      : ${facts.responsiveExists ? "exists ✓" : "NO ✗"}   consumed: ${facts.importsResponsive ? "yes ✓" : "NO ✗"}`,
    );
    console.log(`  barrel public-API stable   : ${facts.barrelLeaksComposable ? "NO ✗" : "yes ✓"}`);
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
