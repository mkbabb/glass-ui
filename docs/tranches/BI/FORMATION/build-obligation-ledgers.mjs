import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

import { INVARIANTS } from "./invariants.registry.mjs";
import { SOURCE_BASE, WAVES } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
const TRANCHE_ROOT = join(REPO, "docs/tranches");
const PROMPT_SOURCE = join(TRANCHE_ROOT, "BI/ledgers/PROMPT-RECAP.md");
const POSTMORTEM = join(ROOT, "POSTMORTEM.md");
const waveIds = new Set(WAVES.map((wave) => wave.id));
const invariantIds = new Set(INVARIANTS.map((row) => row.id));
const sha = (value) => createHash("sha256").update(value).digest("hex");
const uniq = (items) => [...new Set(items)];
const writeJson = (name, value) => writeFileSync(join(ROOT, name), `${JSON.stringify(value, null, 2)}\n`);
const cell = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const table = (headers, rows) => [
    `| ${headers.map(cell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
].join("\n");

const ROUTE_RULES = [
    [/\b(?:refraction|refract(?:ion|ive)?|metal device|native safari|safari capture)\b/, ["BI.W-P132"], ["procedural.renderer-parity", "demo.gestalt"]],
    [/\b(?:dock|rail|fission|fisheye)\b/, ["BI.W-P033", "BI.W-P035", "BI.W-P038", "BI.W-P041", "BI.W-P042"], ["behavior.dock"]],
    [/\b(?:glass|blur|material|radius|shadow|squircle|grain|transmissive|lensing)\b/, ["BI.W-P015", "BI.W-P016", "BI.W-P017", "BI.W-P018", "BI.W-P022"], ["design.material-hierarchy"]],
    [/\b(?:typography|type scale|display type|font(?:s)?|grapheme|text hierarchy)\b/, ["BI.W-P019", "BI.W-P058", "BI.W-P079", "BI.W-P080"], ["design.typography"]],
    [/\b(?:motion|spring|easing|keyframes?|transition|scroll|morph|flip|pointer|animations?|velocity|inertia|bounce|squish)\b/, ["BI.W-P023", "BI.W-P025", "BI.W-P026", "BI.W-P028", "BI.W-P030", "BI.W-P031", "BI.W-P032"], ["motion.single-clock", "motion.reduced"]],
    [/\b(?:aurora|blob|constellation|fourier|liquid grid|procedural|webgpu|webgl2?|canvas|shaders?|gpu)\b/, ["BI.W-P043", "BI.W-P045", "BI.W-P046", "BI.W-P047", "BI.W-P048", "BI.W-P049", "BI.W-P050", "BI.W-P053", "BI.W-P054"], ["procedural.renderer-parity", "procedural.lifecycle"]],
    [/\b(?:demo|story|stories|chassis|hero|storybook|live preview|code block|scenario)\b/, ["BI.W-P055", "BI.W-P056", "BI.W-P057", "BI.W-P059", "BI.W-P060", "BI.W-P061", "BI.W-P062"], ["demo.scenario-contract", "demo.gestalt"]],
    [/\b(?:component|shadcn|cva|duplicate|synonym|orphan|prune|deprecated)\b/, ["BI.W-P063", "BI.W-P126", "BI.W-P127"], ["architecture.component-topology", "architecture.clean-break"]],
    [/\b(?:structure|flatten|subpath|colocat(?:e|ion)|exports?|barrel|api delete|typescript|dts|declarations?|entry graph)\b/, ["BI.W-P005", "BI.W-P008", "BI.W-P010", "BI.W-P011", "BI.W-P013", "BI.W-P128"], ["integrity.entry-graph"]],
    [/\b(?:gate|gates|proof|vacuous|roster|snapshot)\b/, ["BI.W-P000", "BI.W-P014"], ["integrity.dag"]],
    [/\b(?:release|publish|tag|tagged|untagged|cut|final|close|version)\b/, ["BI.W-P002"], ["integrity.release"]],
    [/\b(?:precepts?|canon|models?|agents?|fable|sol|convergence|formation|prompt)\b/, ["BI.W-P003", "BI.W-P131"], ["integrity.lineage"]],
    [/\b(?:retire|retired|retirement|legacy|aliases?|shims?|dual path|defer|deferred|open question|oq)\b/, ["BI.W-P126"], ["architecture.clean-break"]],
    [/\b(?:performance|budget|dpr|memory|frame pace|long task|profiling)\b/, ["BI.W-P054", "BI.W-P130"], ["performance.experience"]],
    [/\b(?:accessibility|accessible|a11y|focus|keyboard|aria|contrast|reduced motion|forced colors)\b/, ["BI.W-P022", "BI.W-P062"], ["design.adaptive-accessibility"]],
    [/\b(?:input|textarea|slider|select|combobox|checkbox|radio|forms?|validation)\b/, ["BI.W-P067", "BI.W-P068", "BI.W-P086", "BI.W-P087", "BI.W-P093", "BI.W-P095", "BI.W-P096", "BI.W-P098"], ["behavior.forms"]],
    [/\b(?:dialog|drawer|popover|tooltip|menu|overlay|escape stack)\b/, ["BI.W-P100", "BI.W-P103", "BI.W-P104", "BI.W-P105", "BI.W-P106", "BI.W-P107", "BI.W-P108"], ["behavior.overlay-apg", "behavior.focus-escape"]],
    [/\b(?:table|datatable|metric|timeline|data model)\b/, ["BI.W-P115", "BI.W-P116", "BI.W-P117", "BI.W-P120"], ["behavior.data"]],
];

const FOREIGN_PROJECT = /\b(?:slides|speedtest|value\.js|keyframes\.js|sci-report|atlas|muster|bbnf-buddy|fourier-analysis)\b/;
const FOREIGN_STRONG = /\b(?:foreign[- ]tree|foreign owner|read[- ]only|outbox|inbound packet|owner ack|consumer-owned)\b/;

const route = (text) => {
    const value = text.toLowerCase().replaceAll("_", " ");
    const matches = ROUTE_RULES.filter(([pattern]) => pattern.test(value));
    const localWaves = uniq(matches.flatMap(([, waves]) => waves));
    const localFamilies = uniq(matches.flatMap(([, , families]) => families));
    const namesForeignProject = FOREIGN_PROJECT.test(value);
    const strongForeignBoundary = FOREIGN_STRONG.test(value);
    const constellationWaves = namesForeignProject || strongForeignBoundary
        ? (/\b(?:atlas|sci-report)\b/.test(value) ? ["BI.W-P004", "BI.W-P133"] : ["BI.W-P004"])
        : [];
    const pureForeign = strongForeignBoundary && localWaves.length === 0;
    const waves = uniq([...localWaves, ...constellationWaves]);
    const families = uniq([...localFamilies, ...(constellationWaves.length ? ["constellation.handshake"] : [])]);
    if (waves.length) return {
        disposition: pureForeign ? "BANK" : "FOLD",
        waves,
        families,
        custodian: pureForeign ? "custodian:named-foreign-owner" : "custodian:glass-ui-perfect-bi",
        retrigger: pureForeign
            ? "exact candidate tarball/patch packet followed by immutable owner ACK"
            : `execute ${waves.join(" + ")} when its reduced-DAG predecessors are terminal; any named foreign edge additionally requires an immutable owner ACK`,
    };
    return {
        disposition: "FOLD",
        waves: ["BI.W-P013", "BI.W-P126"],
        families: ["integrity.lineage", "architecture.clean-break"],
        custodian: "custodian:glass-ui-perfect-bi",
        retrigger: "current-source semantic differential classifies the row before its owning transaction",
    };
};

const mapped = ({ sourcePath, line, rowId, text, sourceClass, routed = route(text) }) => {
    for (const wave of routed.waves) if (!waveIds.has(wave)) throw new Error(`${rowId} maps to unknown wave ${wave}`);
    for (const family of routed.families) if (!invariantIds.has(family)) throw new Error(`${rowId} maps to unknown property family ${family}`);
    const sourceLineSha256 = sha(Buffer.from(`${sourcePath}\0${line}\0${text}`));
    return {
        rowId,
        sourceClass,
        sourcePath,
        sourceLine: line,
        sourceText: text,
        sourceLineSha256,
        producerDisposition: routed.disposition,
        canonicalWaves: routed.waves,
        canonicalFamilies: routed.families,
        canonicalFamily: routed.families[0],
        custodian: routed.custodian,
        retrigger: routed.retrigger,
        acceptancePredicate: typeof routed.acceptancePredicate === "function"
            ? routed.acceptancePredicate(sourceLineSha256)
            : `${routed.waves.join(" + ")} may terminalize this row only when ${routed.families.join(" + ")} prove every semantic obligation represented by source hash ${sourceLineSha256} on current source; old LANDED/DONE prose supplies no credit, and BANK rows require the named foreign-owner ACK without a Glass write.`,
    };
};

const parseTableRows = (absolute, sourceClass) => {
    const sourcePath = relative(REPO, absolute);
    const lines = readFileSync(absolute, "utf8").split("\n");
    const rows = [];
    for (let index = 0; index < lines.length; index += 1) {
        const text = lines[index].trim();
        if (!text.startsWith("|") || /^\|\s*(?:[-: ]+\|)+/.test(text)) continue;
        const cells = text.split("|").slice(1, -1).map((part) => part.trim());
        const first = cells[0] ?? "";
        if (!first || /^(id|tranche|packet|ks spec|bh-mandate item|source|wave|category|repo|finding|class)$/i.test(first)) continue;
        rows.push(mapped({
            sourcePath,
            line: index + 1,
            rowId: `${sourceClass}-${String(index + 1).padStart(4, "0")}-${first.replace(/[^A-Za-z0-9+_.-]+/g, "-").slice(0, 60)}`,
            text,
            sourceClass,
        }));
    }
    return rows;
};

const historicalPromptRows = parseTableRows(PROMPT_SOURCE, "PROMPT");
const coordinationRows = [
    ...parseTableRows(join(TRANCHE_ROOT, "BI/coordination/INBOUND-MARKS.md"), "INBOUND"),
    ...parseTableRows(join(TRANCHE_ROOT, "BI/coordination/asks-and-consumes.md"), "ASK"),
];

const currentRequests = [
    ["CURRENT-001", "Form one perfected BI, 100+ non-contrived current-HEAD waves, exact manifests, durable invariants, π or device-free, minimal maximal-strata DAG, terminal DONE/DEAD only."],
    ["CURRENT-002", "Use GPT 5.5 for sub-agents and GPT 5.6 Sol for design; never silently substitute an unavailable model."],
    ["CURRENT-003", "Do not return before twenty-four actual hours of research and tranche development (superseding the earlier eight-hour minimum) and 100% iteration convergence."],
    ["CURRENT-004", "Perform a deep post-mortem of failed tranches and propose exact amendments to the external ROOT precepts repository, not the local gitlink."],
    ["CURRENT-005", "Most gates are superfluous contrivances and should be removed without erasing a protected property."],
    ["CURRENT-006", "Audit all components, procedural animations, animations, glass properties, and Dock facilities from first principles alongside actual demos."],
    ["CURRENT-007", "Ingest SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001 bytewise; return exact row/gate/wave/target mappings and keep the ACK formulation-only while prerequisites are RED."],
    ["CURRENT-008", "Preserve all foreign trees read-only, especially active Atlas and the slides-to-sci-report/Atlas union plan."],
    ["CURRENT-009", "No quick fixes, workarounds, aliases, shims, dual paths, or masking fallbacks; favor idiomatic gestalt architecture."],
    ["CURRENT-010", "Begin and execute the current tranche to total completion under the exact plan, with the team lead orchestrating maximal dependency-safe parallelism rather than taking quick or direct-edit shortcuts."],
    ["CURRENT-011", "Execution authority includes necessary pull, push, publication, and deployment operations, while exact release and consumer preconditions remain binding."],
    ["CURRENT-012", "Use the current core model for orchestration, design, and synthesis; route bounded workflow fanout through Luna or Terra, superseding the earlier GPT-5.5/GPT-5.6 Sol routing wording."],
];
const waveRange = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => `BI.W-P${String(from + index).padStart(3, "0")}`);
const currentRoutes = {
    "CURRENT-001": {
        disposition: "FOLD",
        waves: ["BI.W-P000", "BI.W-P001", "BI.W-P002", "BI.W-P003", "BI.W-P005", "BI.W-P013", "BI.W-P014", "BI.W-P061", "BI.W-P131"],
        families: ["integrity.dag", "integrity.cursor", "integrity.release", "integrity.lineage", "demo.scenario-contract"],
        custodian: "custodian:glass-ui-perfect-bi",
        retrigger: "formation validation plus exact terminal execution receipts",
        acceptancePredicate: (hash) => `Source hash ${hash} is satisfied only by a current-HEAD 100+ wave registry with exact subject/repair manifests, transitive-reduced maximal-ready strata, π-or-device-free declarations, and a DONE/DEAD-only cursor; count alone is never credit.`,
    },
    "CURRENT-002": {
        disposition: "FOLD", waves: ["BI.W-P003"], families: ["integrity.lineage", "integrity.cursor"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "CURRENT-012 routing receipt is materialized",
        acceptancePredicate: (hash) => `Source hash ${hash} is historical routing authority superseded by the later CURRENT-012 user order; P003 must retain the conflict and supersession record, must not claim a GPT-5.5/GPT-5.6 Sol dispatch after supersession, and must never relabel an unavailable provider identity.`,
    },
    "CURRENT-003": {
        disposition: "FOLD", waves: ["BI.W-P003", "BI.W-P131"], families: ["integrity.lineage", "integrity.dag"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "independent audit and frozen-content passes",
        acceptancePredicate: (hash) => `Source hash ${hash} retains the convergence demand but its elapsed-time floor is superseded by the later no-Procrustean-bound order; completion requires an independent non-author audit and two consecutive clean frozen-content passes with zero unresolved gaps, never a wall-clock quota.`,
    },
    "CURRENT-004": {
        disposition: "FOLD", waves: ["BI.W-P003", "BI.W-P001", "BI.W-P002", "BI.W-P131"], families: ["integrity.lineage", "integrity.cursor", "integrity.release"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "ROOT maintainer reviews PRECEPTS-AMENDMENTS.md after formation",
        acceptancePredicate: (hash) => `Source hash ${hash} requires a causal—not merely symptomatic—post-mortem, exact externally rooted amendment proposals, and execution waves whose idempotence, close law, evidence freshness, and source authority directly cut the diagnosed loop.`,
    },
    "CURRENT-005": {
        disposition: "FOLD", waves: ["BI.W-P000", "BI.W-P014"], families: ["integrity.dag"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "atomic single-verifier bootstrap then post-structure semantic discovery projection",
        acceptancePredicate: (hash) => `Source hash ${hash} requires deletion of all historical and per-family command identities while every independent property retains a non-vacuous oracle, realistic RED mutation, and current evidence contract behind one cursor-driven verifier; exact counts, named cases, package aliases, and per-family table files receive zero credit.`,
    },
    "CURRENT-006": {
        disposition: "FOLD", waves: [...waveRange(15, 124), "BI.W-P132"],
        families: ["design.material-hierarchy", "motion.single-clock", "behavior.dock", "procedural.renderer-parity", "architecture.component-topology", "demo.scenario-contract", "demo.gestalt"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "product-assay owners execute after structural projection",
        acceptancePredicate: (hash) => `Source hash ${hash} requires first-principles contracts plus real current-demo witnesses and live Safari/Chrome state matrices for every component family, motion mechanism, glass plane, Dock facility, procedural system, and refraction path.`,
    },
    "CURRENT-007": {
        disposition: "FOLD", waves: ["BI.W-P004", "BI.W-P133"], families: ["constellation.handshake", "integrity.lineage", "integrity.dag"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "external RED prerequisites turn green and P.W0 plus immutable ACK authorize G.W0",
        acceptancePredicate: (hash) => `Source hash ${hash} requires byte-recomputed packet/scope/base bindings and one explicit disposition for all 512 actions, 60 predicates, 62 imports, and 36 target contracts; the ACK remains FORMULATION_ONLY while any named prerequisite is RED.`,
    },
    "CURRENT-008": {
        disposition: "FOLD", waves: ["BI.W-P004", "BI.W-P125", "BI.W-P133"], families: ["constellation.handshake", "integrity.lineage"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "candidate-byte handshake without any producer-side foreign write",
        acceptancePredicate: (hash) => `Source hash ${hash} requires pre/post foreign-state digests to remain identical and all adoption credit to come only from immutable foreign-owner ACKs, including the slides-to-sci-report/Atlas union boundary.`,
    },
    "CURRENT-009": {
        disposition: "FOLD", waves: ["BI.W-P024", "BI.W-P045", "BI.W-P126", "BI.W-P127"], families: ["architecture.clean-break", "architecture.present-tense-source"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "each owning transaction deletes the superseded path atomically",
        acceptancePredicate: (hash) => `Source hash ${hash} is satisfied only when superseded paths are deleted in the same transaction, failures remain explicit, and no alias, shim, compatibility path, masked fallback, or workaround survives in code, exports, docs, or tests.`,
    },
    "CURRENT-010": {
        disposition: "FOLD", waves: ["BI.W-P000", "BI.W-P001", "BI.W-P005", "BI.W-P127", "BI.W-P131"],
        families: ["integrity.dag", "integrity.cursor", "integrity.lineage", "architecture.clean-break", "demo.gestalt"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "cursor-derived maximal ready batch after every integration",
        acceptancePredicate: (hash) => `Source hash ${hash} authorizes source execution through the complete generated DAG: the orchestrator retains integration authority, delegates bounded work to the maximal lease-safe ready set, and cannot return success before every accepted obligation is terminal and current.`,
    },
    "CURRENT-011": {
        disposition: "FOLD", waves: ["BI.W-P002", "BI.W-P004", "BI.W-P127", "BI.W-P133"],
        families: ["integrity.release", "integrity.lineage", "integrity.dependencies", "constellation.handshake"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "exact candidate reaches each irreversible release or deployment boundary",
        acceptancePredicate: (hash) => `Source hash ${hash} grants operational authority for necessary pull, push, publish, and deploy actions, but no irreversible action may precede the exact cursor, candidate-byte, owner-ACK, native-evidence, FINAL, version, and provenance predicates owned by its canonical wave.`,
    },
    "CURRENT-012": {
        disposition: "FOLD", waves: ["BI.W-P003"], families: ["integrity.lineage", "integrity.cursor", "integrity.dag"],
        custodian: "custodian:glass-ui-perfect-bi", retrigger: "every workflow dispatch and synthesis decision",
        acceptancePredicate: (hash) => `Source hash ${hash} supersedes CURRENT-002: the current core session owns orchestration, design, synthesis, and adjudication; non-root workflow fanout is routed through explicitly named Luna or Terra task lanes; receipts record the platform-reported identity and state honestly and never infer a hidden provider model from a task label.`,
    },
};
const currentPromptRows = currentRequests.map(([rowId, text], index) => mapped({
    sourcePath: "CURRENT_THREAD", line: index + 1, rowId, text, sourceClass: "CURRENT", routed: currentRoutes[rowId],
}));
const promptRows = [...historicalPromptRows, ...currentPromptRows];

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
        if (path === ROOT || path.startsWith(`${ROOT}/`)) return [];
        return walk(path);
    }
    return [path];
});

const openPattern = /(DEFER(?:RED)?|OPEN[-_ ]?QUESTION|\bOQ(?:[-_A-Z0-9]+)?\b|\bD[0-9]+\b)/i;
const openRows = [];
for (const absolute of walk(TRANCHE_ROOT).filter((path) => /\.(?:md|json)$/.test(path)).sort()) {
    const sourcePath = relative(REPO, absolute);
    const lines = readFileSync(absolute, "utf8").split("\n");
    for (let index = 0; index < lines.length; index += 1) {
        const text = lines[index].trim();
        const eligibleMarkdown = absolute.endsWith(".md") && /^(?:\||[-*])/.test(text);
        const eligibleJson = absolute.endsWith(".json") && /"(?:status|state|disposition|id|key|claim)"\s*:/.test(text);
        if (!(eligibleMarkdown || eligibleJson) || !openPattern.test(text)) continue;
        const digest = sha(Buffer.from(`${sourcePath}\0${index + 1}\0${text}`));
        openRows.push(mapped({
            sourcePath,
            line: index + 1,
            rowId: `OPEN-${digest.slice(0, 20)}`,
            text,
            sourceClass: "DEFER_OQ_D_CENSUS",
        }));
    }
}

const trancheDirs = readdirSync(TRANCHE_ROOT, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const postmortemRows = parseTableRows(POSTMORTEM, "TRANCHE");
const postmortemByTranche = new Map(postmortemRows.map((row) => {
    const cells = row.sourceText.split("|").slice(1, -1).map((part) => part.trim());
    return [cells[0], cells];
}));
const trancheRows = trancheDirs.map((tranche) => {
    const dir = join(TRANCHE_ROOT, tranche);
    const files = walk(dir);
    const record = postmortemByTranche.get(tranche);
    if (!record) throw new Error(`POSTMORTEM has no promise/delivery row for tranche ${tranche}`);
    return {
        tranche,
        fileCount: files.length,
        byteCount: files.reduce((sum, path) => sum + statSync(path).size, 0),
        exactFinalExists: files.some((path) => relative(dir, path) === "FINAL.md"),
        planFiles: files.map((path) => relative(REPO, path)).filter((path) => /(?:^|\/)(?:PLAN|INDEX|PROGRESS|FINAL|CONVERGENCE|SEED)[^/]*\.md$/i.test(path)).sort(),
        promise: record[1],
        provedDelivery: record[2],
        deliveryClass: record[3],
        perfectedBiFold: record[4],
        producerDisposition: "FOLD",
        canonicalWaves: route(record.join(" ")).waves,
    };
});

const validateRows = (name, rows) => {
    if (new Set(rows.map((row) => row.rowId)).size !== rows.length) throw new Error(`${name} contains duplicate row IDs`);
    for (const row of rows) {
        if (!["ACCEPT", "FOLD", "REJECT", "BANK"].includes(row.producerDisposition)) throw new Error(`${name}:${row.rowId} has a nonterminal disposition`);
        if (!row.canonicalWaves.length || row.canonicalWaves.some((id) => !waveIds.has(id))) throw new Error(`${name}:${row.rowId} lacks exact canonical wave owners`);
        if (!row.canonicalFamilies.length || row.canonicalFamilies.some((id) => !invariantIds.has(id))) throw new Error(`${name}:${row.rowId} lacks exact canonical property owners`);
        if (!row.acceptancePredicate.includes(row.sourceLineSha256) && row.sourceClass !== "CURRENT") throw new Error(`${name}:${row.rowId} predicate is not bound to its source-line hash`);
        if (!row.custodian || !row.retrigger) throw new Error(`${name}:${row.rowId} lacks custodian or retrigger`);
    }
};
validateRows("prompt", promptRows);
validateRows("coordination", coordinationRows);
validateRows("open", openRows);
if (currentPromptRows.length !== currentRequests.length || currentPromptRows.some((row) => !currentRoutes[row.rowId])) throw new Error("current user requests are not exhaustively hand-routed");

const countBy = (rows, key) => Object.fromEntries(Object.entries(Object.groupBy(rows, (row) => row[key])).map(([name, values]) => [name, values.length]));
writeJson("prompt-recap-routing.json", {
    schemaVersion: "1.0.0", sourceBase: SOURCE_BASE, historicalSource: relative(REPO, PROMPT_SOURCE),
    historicalRowCount: historicalPromptRows.length, currentRowCount: currentPromptRows.length,
    dispositionCounts: countBy(promptRows, "producerDisposition"), rows: promptRows,
});
writeJson("coordination-routing.json", {
    schemaVersion: "1.0.0", sourceBase: SOURCE_BASE, rowCount: coordinationRows.length,
    dispositionCounts: countBy(coordinationRows, "producerDisposition"), rows: coordinationRows,
});
writeJson("open-row-routing.json", {
    schemaVersion: "1.0.0", sourceBase: SOURCE_BASE,
    definition: "Every Markdown table/bullet row or JSON identity/status row in the 42-dir corpus containing DEFER/DEFERRED, OPEN QUESTION, OQ*, or D<number>; exact occurrences remain distinct and receive terminal routing.",
    rowCount: openRows.length, dispositionCounts: countBy(openRows, "producerDisposition"), rows: openRows,
});
writeJson("tranche-directory-ledger.json", {
    schemaVersion: "1.0.0", sourceBase: SOURCE_BASE, trancheCount: trancheRows.length, rows: trancheRows,
});

const ownerCounts = Object.entries(Object.groupBy([...promptRows, ...coordinationRows, ...openRows].flatMap((row) => row.canonicalWaves), (id) => id))
    .map(([id, rows]) => [id, rows.length]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
const indexMd = `# Obligation and prompt-recap routing\n\n` +
    `Every imported row is an exact source occurrence bound to a line hash. Old DONE/LANDED language is archaeology only; FOLD means the current semantic owner must re-prove the property, and BANK means a named foreign owner must ACK exact candidate bytes. No row remains DEFERRED, PARTIAL, carried, or successor-owned in this formation.\n\n` +
    `## Counts\n\n` +
    table(["ledger", "rows", "purpose"], [
        ["prompt-recap-routing.json", promptRows.length, `${historicalPromptRows.length} historical prompt rows + ${currentPromptRows.length} current user orders`],
        ["coordination-routing.json", coordinationRows.length, "all table rows in INBOUND-MARKS and asks-and-consumes"],
        ["open-row-routing.json", openRows.length, "every exact DEFER/OQ/D occurrence under all 42 tranche directories"],
        ["tranche-directory-ledger.json", trancheRows.length, "promise versus proved delivery for every tranche directory"],
    ]) + `\n\n` +
    `## Current user orders\n\n` +
    table(["row", "request", "disposition", "canonical owners", "families"], currentPromptRows.map((row) => [row.rowId, row.sourceText, row.producerDisposition, row.canonicalWaves.join(", "), row.canonicalFamilies.join(", ")])) + `\n\n` +
    `## Highest-volume canonical owners\n\n` +
    table(["wave", "routed exact occurrences"], ownerCounts.slice(0, 30)) + `\n\n` +
    `The machine ledgers, not this summary, are the row-by-row authority. Their rows carry source path/line/hash, disposition, owner, family, custodian, retrigger, and acceptance predicate.\n`;
writeFileSync(join(ROOT, "OBLIGATION-INDEX.md"), indexMd);

console.log(JSON.stringify({
    ok: true,
    promptRows: promptRows.length,
    historicalPromptRows: historicalPromptRows.length,
    currentPromptRows: currentPromptRows.length,
    coordinationRows: coordinationRows.length,
    openRows: openRows.length,
    trancheDirs: trancheRows.length,
    dispositions: countBy([...promptRows, ...coordinationRows, ...openRows], "producerDisposition"),
}, null, 2));
