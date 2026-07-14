import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { RENDERED_FINDING_ADDENDA, RENDERED_INTERACTION_ADDENDA } from "./rendered-demo-addenda.registry.mjs";
import { SOURCE_BASE } from "./waves.registry.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const JSON_PATH = join(ROOT, "rendered-demo-audit.json");
const MD_PATH = join(ROOT, "RENDERED-DEMO-AUDIT.md");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const table = (headers, rows) => [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replaceAll("|", "\\|").replaceAll("\n", " ")).join(" | ")} |`),
].join("\n");

const audit = JSON.parse(readFileSync(JSON_PATH, "utf8"));
if (audit.sourceBase !== SOURCE_BASE) throw new Error("rendered audit source base diverges from formation");
if (audit.interactions.length < 28 || audit.findings.length < 36) throw new Error("base rendered research is incomplete; authored refresh cannot replace route capture");

const interactionIds = new Set(RENDERED_INTERACTION_ADDENDA.map((row) => row.id));
const findingIds = new Set(RENDERED_FINDING_ADDENDA.map((row) => row.id));
const preservedEnvelope = {
    manifest: audit.manifest,
    rawInputs: audit.rawInputs,
    warningSignatures: audit.warningSignatures,
    compatibilityRedirects: audit.compatibilityRedirects,
    relocatedRedirects: audit.relocatedRedirects,
    negativeRoute: audit.negativeRoute,
    contactSheets: audit.contactSheets,
    runs: audit.runs,
};
const preservedEnvelopeSha256 = sha(JSON.stringify(preservedEnvelope));

audit.interactions = [...audit.interactions.filter((row) => !interactionIds.has(row.id)), ...RENDERED_INTERACTION_ADDENDA]
    .sort((a, b) => a.id.localeCompare(b.id));
audit.findings = [...audit.findings.filter((row) => !findingIds.has(row.id)), ...RENDERED_FINDING_ADDENDA]
    .map((row) => ({ ...row, evidenceCredit: "CURRENT_SOURCE_RESEARCH_ONLY" }))
    .sort((a, b) => a.id.localeCompare(b.id));
audit.counts.interactionRows = audit.interactions.length;
audit.counts.findingRows = audit.findings.length;

for (const [index, row] of audit.interactions.entries()) {
    if (row.id !== `INT-${String(index + 1).padStart(3, "0")}`) throw new Error(`interaction sequence breaks at ${row.id}`);
}
for (const [index, row] of audit.findings.entries()) {
    if (row.id !== `RDA-${String(index + 1).padStart(3, "0")}`) throw new Error(`finding sequence breaks at ${row.id}`);
}
if (sha(JSON.stringify({
    manifest: audit.manifest,
    rawInputs: audit.rawInputs,
    warningSignatures: audit.warningSignatures,
    compatibilityRedirects: audit.compatibilityRedirects,
    relocatedRedirects: audit.relocatedRedirects,
    negativeRoute: audit.negativeRoute,
    contactSheets: audit.contactSheets,
    runs: audit.runs,
})) !== preservedEnvelopeSha256) throw new Error("authored refresh mutated route/contact/raw evidence envelope");

writeFileSync(JSON_PATH, `${JSON.stringify(audit, null, 2)}\n`);
const { runs, contactSheets, findings, interactions } = audit;
const md = `# Rendered demo and interaction audit\n\n` +
    `Source base: \`${SOURCE_BASE}\`. This is formation research only. The in-app harness did **not** expose trustworthy engine identity and is neither native Safari nor native Chrome; none of these captures satisfies π, DELTA, DesignSync refresh, or source-execution authorization.\n\n` +
    `## Census\n\n` +
    table(["surface", "rows", "direct", "redirected", "rendered main", "horizontal overflow", "broken-image routes", "screenshots"], [
        ["desktop 1280×720 @2", runs.desktop.routeCount, runs.desktop.directRouteCount, runs.desktop.redirectCount, runs.desktop.renderedMainCount, runs.desktop.horizontalOverflowCount, runs.desktop.brokenImageRouteCount, runs.desktop.screenshotCount],
        ["mobile 390×844 @1", runs.mobile.routeCount, runs.mobile.directRouteCount, runs.mobile.redirectCount, runs.mobile.renderedMainCount, runs.mobile.horizontalOverflowCount, runs.mobile.brokenImageRouteCount, runs.mobile.screenshotCount],
        ["extra redirects + 404", runs.extra.routeCount, runs.extra.directRouteCount, runs.extra.redirectCount, runs.extra.renderedMainCount, runs.extra.horizontalOverflowCount, runs.extra.brokenImageRouteCount, runs.extra.screenshotCount],
    ]) + `\n\n` +
    `The manifest census rendered all 124 requested paths at both viewports, but only 101 resolve directly: root redirects to Intro and 22 retained member paths are compatibility redirects. Six more historical composition routes redirect outside the manifest roster. The unknown-route control renders text but no h1. No document-level horizontal overflow or broken image appeared; this does not excuse offscreen or undersized controls inside the Dock.\n\n` +
    `## First-principles findings\n\n` +
    table(["ID", "state", "finding", "current evidence", "canonical owners", "acceptance predicate"], findings.map((row) => [row.id, row.status, row.finding, row.evidence, row.canonicalWaves.join(", "), row.acceptancePredicate])) + `\n\n` +
    `## Exercised interactions\n\n` +
    table(["ID", "route", "mechanism", "action", "observation", "owners"], interactions.map((row) => [row.id, row.route, row.mechanism ?? "—", row.action, row.observation, row.ownerWaves.join(", ")])) + `\n\n` +
    `## Visual review binding\n\n` +
    `All ${contactSheets.length} desktop/mobile category and root contact sheets were opened and inspected. Their byte/hash ledger is retained in [rendered-demo-audit.json](./rendered-demo-audit.json); the images are deliberately not acceptance snapshots. Every product claim must be re-exercised through named semantic/numeric observables in native Safari-current and Chrome-current at the terminal source commit, with human review added only for gestalt/paint.\n`;
writeFileSync(MD_PATH, md);

console.log(JSON.stringify({
    ok: true,
    sourceBase: SOURCE_BASE,
    preservedEnvelopeSha256,
    interactions: audit.interactions.length,
    findings: audit.findings.length,
    contactSheets: audit.contactSheets.length,
}, null, 2));
