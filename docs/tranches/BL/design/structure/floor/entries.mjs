#!/usr/bin/env node
// entries.mjs — F-3 CLI over the one entry record (records/entry-record.json).
//   node entries.mjs check [--root R] [--json]   exports + typesVersions regenerate byte-equal, guard clean
//   node entries.mjs write [--root R]            re-pin package.json from the record (refuses on a guard violation)
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_ROOT, openTree, recordPath } from "./lib/tree.mjs";
import { compareToPackage, loadRecord, readJson, validateRecord } from "./lib/entries.mjs";

const args = process.argv.slice(2);
const cmd = args[0] ?? "check";
const root = args.includes("--root") ? args[args.indexOf("--root") + 1] : DEFAULT_ROOT;
const JSON_OUT = args.includes("--json");

const tree = openTree(root);
const record = loadRecord(tree);
const violations = validateRecord(record, tree);
const pkg = readJson(root, "package.json");
const cmp = compareToPackage(record, pkg);

if (cmd === "write") {
    if (violations.length) {
        console.error(`entries write REFUSED — ${violations.length} guard violation(s)`);
        process.exit(1);
    }
    const next = { ...pkg, exports: cmp.emitted.exports, typesVersions: cmp.emitted.typesVersions };
    writeFileSync(join(root, "package.json"), `${JSON.stringify(next, null, 4)}\n`);
    console.log(`entries write — ${cmp.exportKeys} export keys, ${cmp.typesVersions} typesVersions`);
    process.exit(0);
}

const ok = violations.length === 0 && cmp.exportsByteEqual && cmp.typesVersionsByteEqual;
const report = {
    record: recordPath(root),
    jsEntries: cmp.jsEntries,
    exportKeys: cmp.exportKeys,
    typesVersions: cmp.typesVersions,
    doors: record.doors.length,
    exportsByteEqual: cmp.exportsByteEqual,
    typesVersionsByteEqual: cmp.typesVersionsByteEqual,
    violations,
    pass: ok,
};
if (JSON_OUT) console.log(JSON.stringify(report, null, 2));
else {
    console.log(`entries: ${report.jsEntries} js entries → ${report.exportKeys} export keys, ${report.typesVersions} typesVersions; ${report.doors} declared doors`);
    console.log(`  exports byte-equal: ${report.exportsByteEqual}; typesVersions byte-equal: ${report.typesVersionsByteEqual}`);
    for (const x of violations) console.log(`  VIOLATION ${JSON.stringify(x)}`);
    console.log(ok ? "PASS" : "FAIL");
}
process.exit(ok ? 0 : 1);
