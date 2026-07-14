import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { MEMBER_JUDGMENT_OVERRIDES, resolveMemberJudgment } from "./public-component-member-judgments.registry.mjs";
import { SOURCE_BASE } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const sha = (value) => createHash("sha256").update(value).digest("hex");
const cell = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const table = (headers, rows) => [
    `| ${headers.map(cell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
].join("\n");

const demandPath = resolve(ROOT, "public-component-member-demand-audit.json");
const demandBytes = readFileSync(demandPath, "utf8");
const demand = JSON.parse(demandBytes);
if (demand.sourceBase !== SOURCE_BASE) throw new Error(`member demand audit source base ${demand.sourceBase} != ${SOURCE_BASE}`);

const duplicateNames = demand.members
    .map((row) => row.exportedName)
    .filter((name, index, all) => all.indexOf(name) !== index);
if (duplicateNames.length) throw new Error(`duplicate exported names need keyed judgment coordinates: ${[...new Set(duplicateNames)].join(", ")}`);

const unknownOverrides = Object.keys(MEMBER_JUDGMENT_OVERRIDES).filter((name) => !demand.members.some((row) => row.exportedName === name));
if (unknownOverrides.length) throw new Error(`judgment overrides name absent members: ${unknownOverrides.join(", ")}`);

const rows = demand.members.map((member) => ({
    id: member.id,
    exportedName: member.exportedName,
    sourcePath: member.sourcePath,
    publishedSpecifiers: member.publishedSpecifiers,
    conceptId: member.conceptId,
    discoveryDisposition: member.discoveryDisposition,
    evidence: {
        causalExternalRuntime: member.causalExternalRuntimeEvidence,
        foreignDemo: member.foreignDemoEvidence,
        firstPartyDemo: member.firstPartyDemoWitnessPaths,
        internalComposition: member.internalCompositionWitnessPaths,
        wrongOrRetiredSpecifier: member.misprojectedForeignEvidence,
    },
    ...resolveMemberJudgment(member),
}));

const countBy = (key) => Object.fromEntries([...new Set(rows.map((row) => row[key]))].sort().map((value) => [value, rows.filter((row) => row[key] === value).length]));
const dispositionCounts = countBy("disposition");
const sourceCounts = countBy("judgmentSource");
const output = {
    schemaVersion: "1.0.0",
    generatedAt: "2026-07-14",
    sourceBase: SOURCE_BASE,
    status: "FORMATION_ONLY__NOT_EXECUTION_AUTHORIZATION",
    authority: "EXACT_PUBLIC_COMPONENT_MEMBER_PRODUCT_JUDGMENT",
    demandAuditSha256: sha(demandBytes),
    law: "Every published component member receives exactly one authored retain, fold, privatize, rehome, migrate, rename, or delete disposition. A used sibling, internal composition, barrel, test, type import, path, or demo inventory cannot donate demand; external runtime use prevents silent deletion but does not preserve an alias or redundant concept.",
    rowCount: rows.length,
    dispositionCounts,
    judgmentSourceCounts: sourceCounts,
    rows,
};

writeFileSync(resolve(ROOT, "public-component-member-judgment-audit.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Public component-member judgment audit\n\n` +
    `Status: **FORMATION-ONLY; NOT EXECUTION AUTHORIZATION.** Source base: \`${SOURCE_BASE}\`. Demand input SHA-256: \`${output.demandAuditSha256}\`.\n\n` +
    `${output.law}\n\n` +
    `Rows: ${rows.length}. Dispositions: ${Object.entries(dispositionCounts).map(([key, value]) => `${key}=${value}`).join(", ")}.\n\n` +
    `## Exact judgments\n\n` +
    table(["id", "member", "source", "published at", "disposition", "target", "owners", "judgment source"], rows.map((row) => [
        row.id,
        row.exportedName,
        row.sourcePath,
        row.publishedSpecifiers.join(", "),
        row.disposition,
        row.target,
        row.ownerWaves.join(", "),
        row.judgmentSource,
    ])) + `\n\n` +
    `The JSON is normative for exact rationale, acceptance predicate, retained negative control, and all demand witnesses. No count above is a gate.\n`;
writeFileSync(resolve(ROOT, "PUBLIC-COMPONENT-MEMBER-JUDGMENT-AUDIT.md"), md);

console.log(JSON.stringify({ ok: true, rows: rows.length, dispositionCounts, judgmentSourceCounts: sourceCounts }, null, 2));
