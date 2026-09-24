#!/usr/bin/env node
// entries.mjs — F-3 CLI over the one entry record (records/entry-record.json).
//   node entries.mjs check [--root R] [--json]   exports + typesVersions regenerate byte-equal, guard clean
//   node entries.mjs write [--root R]            re-pin package.json from the record (refuses on a guard violation)
//   node entries.mjs derive [--root R]           bootstrap: write the record from HEAD's subpath-policy (run once)
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULT_ROOT, openTree } from "./lib/tree.mjs";
import { RECORD_PATH, compareToPackage, emitExports, loadRecord, readJson, validateRecord } from "./lib/entries.mjs";

/** One entry per line, so a door change is a one-line diff. */
export function formatRecord(record) {
    const q = (x) => JSON.stringify(x);
    const lines = ["{"];
    lines.push(`    "$schema": ${q(record.$schema)},`, `    "note": ${q(record.note)},`);
    lines.push(`    "js": [`, record.js.map((e) => `        ${q(e)}`).join(",\n"), `    ],`);
    lines.push(`    "css": [`, record.css.map((e) => `        ${q(e)}`).join(",\n"), `    ],`);
    lines.push(`    "types": ${q(record.types)},`, `    "cascade": ${q(record.cascade)},`);
    lines.push(`    "doors": [`, record.doors.map((d) => `        ${q(d)}`).join(",\n"), `    ]`, "}");
    return `${lines.join("\n")}\n`;
}

const args = process.argv.slice(2);
const cmd = args[0] ?? "check";
const root = args.includes("--root") ? args[args.indexOf("--root") + 1] : DEFAULT_ROOT;
const JSON_OUT = args.includes("--json");

if (cmd === "derive") {
    const policy = await import(pathToFileURL(join(root, "scripts/lib/subpath-policy.mjs")).href);
    const pkg = readJson(root, "package.json");
    const { entries } = policy.buildEntrySet(policy.readTree({ repoRoot: root }));
    // Published order: package.json's key order (the regen's own order), so the record regenerates byte-equal.
    const order = ["index", ...Object.keys(pkg.exports).filter((k) => k !== "." && typeof pkg.exports[k] === "object").map((k) => k.slice(2))];
    const js = order.map((name) => {
        if (!entries[name]) throw new Error(`derive: exports key ${name} has no policy entry`);
        return [name, entries[name]];
    });
    const extra = Object.keys(entries).filter((n) => !order.includes(n));
    if (extra.length) throw new Error(`derive: policy entries with no exports key: ${extra.join(", ")}`);
    const css = Object.entries(policy.CSS_FONT_EXPORTS).map(([key, target]) => {
        const rel = target.replace(/^\.\/dist\//, "");
        if (rel.endsWith("*")) return [key, { assets: `src/${rel.slice(0, -1)}` }];
        if (rel === "component-styles.css") return [key, { generated: rel }];
        return [key, { source: `src/${rel}` }];
    });
    const tree = openTree(root);
    const sources = new Set(js.map(([, s]) => s));
    const doors = tree.files.filter((f) => f.startsWith("src/") && /(^|\/)index\.ts$/.test(f) && !sources.has(f));
    const record = {
        $schema: "entry-record/1",
        note: "The one entry record (BL D1 floor F-3). js: [name, source] in published order; css: [export key, target]; doors: every index.ts barrel under src/ that is not an entry; cascade.terminal: the stylesheet the published cascade ends on.",
        js,
        css,
        types: policy.TYPES_OVERRIDE,
        cascade: { terminal: "src/styles/accessibility.css" },
        doors,
    };
    mkdirSync(dirname(join(root, RECORD_PATH)), { recursive: true });
    writeFileSync(join(root, RECORD_PATH), formatRecord(record));
    console.log(`derive: wrote ${RECORD_PATH} — ${js.length} js entries, ${css.length} css keys, ${doors.length} doors`);
    process.exit(0);
}

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
    record: RECORD_PATH,
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
