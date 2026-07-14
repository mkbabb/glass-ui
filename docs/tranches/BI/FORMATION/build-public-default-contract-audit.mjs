import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";

import { COMPONENT_CONCEPTS, SOURCE_BASE, SPECIAL_COMPONENT_CONCEPTS, WAVES } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const git = (...args) => execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
const sourceCache = new Map();
const blobCache = new Map();
const source = (path) => {
    if (!sourceCache.has(path)) sourceCache.set(path, git("show", `${SOURCE_BASE}:${path}`));
    return sourceCache.get(path);
};
const sourceBlob = (path) => {
    if (!blobCache.has(path)) blobCache.set(path, git("rev-parse", `${SOURCE_BASE}:${path}`).trim());
    return blobCache.get(path);
};
const uniq = (items) => [...new Set(items)];
const countBy = (items, key) => Object.fromEntries(
    Object.entries(Object.groupBy(items, key)).sort(([a], [b]) => a.localeCompare(b)).map(([name, values]) => [name, values.length]),
);
const table = (headers, rows) => [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replaceAll("|", "\\|").replaceAll("\n", " ")).join(" | ")} |`),
].join("\n");

const vuePaths = git("ls-tree", "-r", "--name-only", SOURCE_BASE, "--", "src/components")
    .trim().split("\n").filter((path) => path.endsWith(".vue")).sort();

const propertyName = (node, sourceFile) => {
    if (!node) return null;
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) return node.text;
    return node.getText(sourceFile);
};
const objectProperty = (object, name, sourceFile) => object?.properties.find((prop) => propertyName(prop.name, sourceFile) === name);
const propertyValue = (property) => ts.isPropertyAssignment(property) ? property.initializer : null;
const componentName = (path) => path.slice(path.lastIndexOf("/") + 1, -4);
const normalize = (value) => value.replace(/\s+/g, " ").trim();

const conceptAssay = JSON.parse(readFileSync(join(ROOT, "component-consumer-assay.json"), "utf8"));
const renderedAudit = JSON.parse(readFileSync(join(ROOT, "rendered-demo-audit.json"), "utf8"));
const renderedFindingIds = new Set(renderedAudit.findings.map((row) => row.id));
const renderedInteractionIds = new Set(renderedAudit.interactions.map((row) => row.id));
const conceptById = new Map(conceptAssay.concepts.map((row) => [row.conceptId, row]));
const conceptRoots = [...COMPONENT_CONCEPTS, ...SPECIAL_COMPONENT_CONCEPTS].flatMap((concept) => concept.members
    ? concept.members.map((member) => ({ concept, root: `src/components/${member.tier}/${member.name}` }))
    : [{ concept, root: `src/components/${concept.tier}/${concept.name}` }]
).sort((a, b) => b.root.length - a.root.length);
const resolveConcept = (path) => conceptRoots.find((row) => path === `${row.root}.vue` || path.startsWith(`${row.root}/`))?.concept ?? null;

const rawDefaults = [];
for (const path of vuePaths) {
    const text = source(path);
    const lines = text.split("\n");
    const scriptMatches = [...text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
    for (const match of scriptMatches) {
        const scriptText = match[2];
        const offset = match.index + match[0].indexOf(scriptText);
        const kind = /\blang\s*=\s*["']tsx["']/.test(match[1]) ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
        const sourceFile = ts.createSourceFile(path, scriptText, ts.ScriptTarget.Latest, true, kind);
        const addDefault = ({ node, prop, mechanism, modelName = null }) => {
            const start = offset + node.getStart(sourceFile);
            const end = offset + node.end;
            const line = text.slice(0, start).split("\n").length;
            const expressionRaw = text.slice(start, end);
            rawDefaults.push({
                path,
                component: componentName(path),
                sourceBaseBlob: sourceBlob(path),
                line,
                lineText: lines[line - 1].trim(),
                lineSha256: sha(lines[line - 1]),
                mechanism,
                prop,
                modelName,
                expression: normalize(expressionRaw),
                expressionSha256: sha(expressionRaw),
            });
        };
        const visit = (node) => {
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "withDefaults") {
                const defaults = node.arguments[1];
                if (defaults && ts.isObjectLiteralExpression(defaults)) {
                    for (const property of defaults.properties) {
                        const name = propertyName(property.name, sourceFile);
                        const value = propertyValue(property);
                        if (name && value) addDefault({ node: value, prop: name, mechanism: "WITH_DEFAULTS" });
                    }
                }
            }
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "defineModel") {
                const object = [...node.arguments].reverse().find(ts.isObjectLiteralExpression);
                const defaultProperty = object && objectProperty(object, "default", sourceFile);
                const value = defaultProperty && propertyValue(defaultProperty);
                if (value) {
                    const first = node.arguments[0];
                    const modelName = first && ts.isStringLiteralLike(first) ? first.text : "modelValue";
                    addDefault({ node: value, prop: modelName, mechanism: "DEFINE_MODEL_DEFAULT", modelName });
                }
            }
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "defineProps") {
                const object = node.arguments[0];
                if (object && ts.isObjectLiteralExpression(object)) {
                    for (const property of object.properties) {
                        const name = propertyName(property.name, sourceFile);
                        const descriptor = propertyValue(property);
                        if (!name || !descriptor || !ts.isObjectLiteralExpression(descriptor)) continue;
                        const defaultProperty = objectProperty(descriptor, "default", sourceFile);
                        const value = defaultProperty && propertyValue(defaultProperty);
                        if (value) addDefault({ node: value, prop: name, mechanism: "RUNTIME_PROP_DEFAULT" });
                    }
                }
            }
            ts.forEachChild(node, visit);
        };
        visit(sourceFile);
    }
}

rawDefaults.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.prop.localeCompare(b.prop));
// Bind direct first-party authoring use without pretending tag spelling is runtime
// completeness. This detects the exact hidden-default pattern: every current story
// can override a shipped default while the public omission path remains unexercised.
const firstPartyVuePaths = git("ls-tree", "-r", "--name-only", SOURCE_BASE, "--", "src", "demo")
    .trim().split("\n").filter((path) => path.endsWith(".vue")).sort();
const mask = (value) => value.replace(/[^\n]/g, " ");
const scanOpeningTags = (text) => {
    let template = text;
    for (const regex of [/<script\b[\s\S]*?<\/script\s*>/gi, /<style\b[\s\S]*?<\/style\s*>/gi, /<!--[\s\S]*?-->/g]) template = template.replace(regex, mask);
    const tags = [];
    for (let index = 0; index < template.length; index += 1) {
        if (template[index] !== "<" || !/[A-Za-z]/.test(template[index + 1] ?? "")) continue;
        let cursor = index + 1;
        while (/[\w.-]/.test(template[cursor] ?? "")) cursor += 1;
        const tag = template.slice(index + 1, cursor);
        let quote = null;
        let end = cursor;
        for (; end < template.length; end += 1) {
            const char = template[end];
            if (quote) {
                if (char === quote && template[end - 1] !== "\\") quote = null;
            } else if (char === "\"" || char === "'") quote = char;
            else if (char === ">") break;
        }
        if (end >= template.length) break;
        tags.push({ tag, attrs: text.slice(cursor, end), raw: text.slice(index, end + 1), line: text.slice(0, index).split("\n").length });
        index = end;
    }
    return tags;
};
const firstPartyOpenings = firstPartyVuePaths.flatMap((path) => scanOpeningTags(source(path)).map((opening) => ({ path, ...opening })));
const kebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const hasPropAttribute = (attrs, prop) => {
    const names = uniq([prop, kebab(prop)]).map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(`(?:^|\\s)(?:(?:v-bind:|:)?(?:${names.join("|")}))(?:\\s*=|\\s|$)`).test(attrs);
};
const hasSpreadBinding = (attrs) => /(?:^|\s)v-bind\s*=/.test(attrs);
const behavioralProp = /^(?:animate|animation|arrival|autosize|autoLuminance|backgroundInteractive|closeDelay|cursorBlink|defaultOpen|disableOutsidePointerEvents|disablePopover|disableTransitions|expandOnHover|fadeEnd|fadeStart|freeze|infinite|interactive|keepDockOpen|loop|motion|open|openDelay|playback|pointerReactive|portal|pulse|respectReducedMotion|showClose|showOverlay|stagger|transition|trigger|warpAutoRelease|warpOnClick)$/;
const modeProp = /^(?:as|asChild|direction|mode|renderMode|scrollMode|tag)$/;

const discoveredRows = rawDefaults.map((row, index) => {
    const concept = resolveConcept(row.path);
    const assay = concept && conceptById.get(concept.name);
    const usages = firstPartyOpenings.filter((opening) => opening.tag === row.component).map((opening) => ({
        path: opening.path,
        line: opening.line,
        sourceBaseBlob: sourceBlob(opening.path),
        propDisposition: hasPropAttribute(opening.attrs, row.prop) ? "EXPLICIT" : hasSpreadBinding(opening.attrs) ? "SPREAD_INDETERMINATE" : "DEFAULT_APPLIES",
        openingTagSha256: sha(opening.raw),
    }));
    const candidateReason = behavioralProp.test(row.prop)
        ? "BEHAVIOR_OR_INTERACTION_DEFAULT"
        : modeProp.test(row.prop)
            ? "MODE_OR_HOST_DEFAULT"
            : null;
    return {
        id: `PDC-${String(index + 1).padStart(3, "0")}`,
        ...row,
        conceptId: concept?.name ?? null,
        conceptDecision: assay?.decision ?? concept?.decision ?? null,
        canonicalWaves: assay?.canonicalWaves ?? [],
        candidateReason,
        firstPartyUsage: {
            total: usages.length,
            demo: usages.filter((usage) => usage.path.startsWith("demo/")).length,
            source: usages.filter((usage) => usage.path.startsWith("src/")).length,
            defaultApplies: usages.filter((usage) => usage.propDisposition === "DEFAULT_APPLIES").length,
            explicit: usages.filter((usage) => usage.propDisposition === "EXPLICIT").length,
            spreadIndeterminate: usages.filter((usage) => usage.propDisposition === "SPREAD_INDETERMINATE").length,
            demoDefaultApplies: usages.filter((usage) => usage.path.startsWith("demo/") && usage.propDisposition === "DEFAULT_APPLIES").length,
            demoExplicit: usages.filter((usage) => usage.path.startsWith("demo/") && usage.propDisposition === "EXPLICIT").length,
            demoSpreadIndeterminate: usages.filter((usage) => usage.path.startsWith("demo/") && usage.propDisposition === "SPREAD_INDETERMINATE").length,
            paths: uniq(usages.map((usage) => usage.path)),
            occurrences: usages,
        },
    };
});

const domainFor = (row) => {
    if (behavioralProp.test(row.prop)) return "BEHAVIOR_MOTION_OR_INTERACTION";
    if (modeProp.test(row.prop) || /^(?:ariaLabel|orientation|type)$/.test(row.prop)) return "HOST_MODE_OR_SEMANTIC_SHAPE";
    if (/^(?:active|activeProgress|activeSnapPoint|currentSegmentKey|defaultOpen|disabled|hasMore|index|indeterminate|isLoading|modelValue|open|paused)$/.test(row.prop)) return "PUBLIC_STATE_SEED";
    if (/^(?:count|cardBreakpoint|cycleDuration|deletingSpeed|drawDelayMs|drawMs|hideTimeoutMs|maxCharsBeforeNotice|maxHeight|maxVisible|pauseAfterDelete|pauseAfterType|sideOffset|threshold|visibleCount)$/.test(row.prop)) return "BOUNDS_TIMING_OR_CAPACITY";
    if (/^(?:appearance|backdrop|brush|color|deep|eclipse|grain|intensity|metal|placeholder|placement|position|register|reserve|ring|shadow|shape|size|specular|surface|tier|tone|variant)$/.test(row.prop)) return "PRESENTATION_DEFAULT";
    return "DATA_OR_CONFIGURATION_DEFAULT";
};
const exactWriteOwners = (path) => WAVES.filter((wave) => wave.subjects.some((subject) => subject.path === path && subject.action !== "verify")).map((wave) => wave.id);
const defaultOwners = (row) => uniq([...row.canonicalWaves, ...exactWriteOwners(row.path)]);
const redReview = ({ disposition, basis, acceptance, findingIds, interactionIds = [], canonicalWaves }) => ({
    status: "CURRENT_RED",
    disposition,
    basis,
    acceptance,
    findingIds,
    interactionIds,
    canonicalWaves,
});
const criticalReview = (row) => {
    const key = `${row.component}.${row.prop}`;
    if (["Constellation.warpOnClick", "Constellation.gravityWell", "Constellation.backgroundInteractive"].includes(key)) return redReview({
        disposition: "OPTIONAL_DECORATIVE_VERSUS_INTERACTIVE_CONTRACT_REPAIR_REQUIRED",
        basis: `${key} is omission-safe at ${row.expression}, but explicit first-party activation creates the RDA-016 contradiction: an aria-hidden/decorative canvas carries pointer affordance and a warp/well action whose GPU fork cannot paint the advertised overlay. A false default does not make the opt-in public branch valid.`,
        acceptance: "The retained Canvas2D Constellation chooses one contract. Decorative and aria-hidden instances delete warpOnClick/gravity-well activation, cursor, listener, and interactive prose; a deliberately interactive instance exposes one named keyboard/touch/pointer command with causal state through the same warp owner. The omission default and every explicit override are directly exercised.",
        findingIds: ["RDA-016"], interactionIds: ["INT-016"], canonicalWaves: ["BI.W-P048", "BI.W-P059", "BI.W-P061", "BI.W-P062"],
    });
    if (key === "DarkModeToggle.passive") return redReview({
        disposition: "FALSE_AFFORDANCE_OPTION_DELETE_REQUIRED",
        basis: "passive defaults false, but the public option retains the same click/pointer styling and handlers on a div that intentionally performs no theme action. Omission safety cannot legitimize a consumerless no-op branch.",
        acceptance: "Delete passive and its story/branch without alias. DarkModeToggle has one native pressed-command path; any separately needed decorative icon has no pointer cursor, focus style, activation handler, operable name, or Toggle identity.",
        findingIds: ["RDA-034"], interactionIds: ["INT-027"], canonicalWaves: ["BI.W-P059", "BI.W-P062", "BI.W-P082"],
    });
    if (["SortableHandle.as", "SortableItem.as", "SortableList.as"].includes(key)) return redReview({
        disposition: "SEMANTIC_HOST_DEFAULT_REPAIR_REQUIRED",
        basis: `${key} defaults to ${row.expression}; the composed public default therefore resolves reorder handles/items/list to span/div hosts while the current engine supplies pointer-only drag. The direct story proved causal reorder without list/listitem/native-button or keyboard transaction semantics.`,
        acceptance: "The default SortableList renders a semantic list, stable listitems, and named native button handles. Space/Enter lift/drop, Arrow/Home/End travel, Escape cancel, focus, announcements, pointer, and touch converge on one transaction; polymorphic overrides must preserve equivalent semantics rather than inherit generic hosts.",
        findingIds: ["RDA-013"], interactionIds: ["INT-013"], canonicalWaves: ["BI.W-P007", "BI.W-P062"],
    });
    if (key === "EasingPicker.mode") return redReview({
        disposition: "DEFAULT_EDITOR_MODE_SEMANTICS_REPAIR_REQUIRED",
        basis: "Bezier is the public default while every current direct picker occurrence explicitly selects a mode. The exercised Bezier default surface has two causal SVG handles absent from the focus/role/value tree; explicit story coverage cannot launder the omission path.",
        acceptance: "A direct default-mode EasingPicker scenario discovers two named bounded value controls with focus, visible focus, Arrow adjustment, and pointer/touch parity through setHandle. Explicit Steps/Spring modes retain their own coherent semantics, and mode omission is never inferred as PASS from an explicit-mode story.",
        findingIds: ["RDA-027"], interactionIds: ["INT-023"], canonicalWaves: ["BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P124"],
    });
    if (key === "EasingPicker.playback") return redReview({
        disposition: "DEFAULT_PREVIEW_AUTHORITY_REPAIR_REQUIRED",
        basis: "Playback defaults on and all current picker uses inherit it, but the exercised preview owns an undeclared fixed 1200ms rAF loop with no playing/restart/PRM state. A default-on temporal episode requires its own direct lifecycle evidence.",
        acceptance: "The default preview is a bounded editor-local normalized one-shot with explicit playing/restart/interruption state, reactive PRM immediate completion, teardown, and one writer; hiding it requires an explicit product decision and restoring an unlabeled fixed clock turns temporal/scenario evidence RED.",
        findingIds: ["RDA-030"], interactionIds: ["INT-023"], canonicalWaves: ["BI.W-P014", "BI.W-P022", "BI.W-P025", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P124"],
    });
    if (key === "TypewriterText.interactive") return redReview({
        disposition: "HIDDEN_DEFAULT_INTERACTION_DELETE_REQUIRED",
        basis: "interactive defaults true while both direct first-party Typewriter instances explicitly set it false. External omission therefore receives pointer-only per-glyph backspace that no direct story, keyboard model, focus model, or product owner demonstrates.",
        acceptance: "Delete interactive and per-character click-backspace unless a separately authorized coherent rewind/edit concept supplies one named semantic control or full text-editing composite, keyboard/pointer parity, causal readback, and a direct default scenario. Ordinary glyphs remain text.",
        findingIds: ["RDA-035"], canonicalWaves: ["BI.W-P059", "BI.W-P062", "BI.W-P080"],
    });
    if (["Drawer.mode", "Drawer.snapPoints", "Drawer.direction", "DrawerContent.showOverlay"].includes(key)) return redReview({
        disposition: "MODE_DERIVED_DEFAULT_CONTRACT_REPAIR_REQUIRED",
        basis: `${key} participates in a composed omission contract. The live fixed/content-sized modal story says no snap dragging, yet bottom/top omission synthesizes [0.12,0.5,1], renders an aria-hidden pointer-only handle, and a real drag moved 1→0.5. live-behind overlay/stage/detents are not independent props a consumer must remember to synchronize by folklore.`,
        acceptance: "Resolve mode atomically: ordinary modal/content-sized omission means one full rest, modal isolation, its truthful scrim/stage, and no handle; live-behind may default to its declared ladder and no occluding overlay. Explicit multi-detent mode exposes a named slider-equivalent grip whose keyboard/pointer/touch paths share activeSnapPoint, paint, focus, announcement, interruption, and PRM state.",
        findingIds: ["RDA-036"], interactionIds: ["INT-028"], canonicalWaves: ["BI.W-P032", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P107"],
    });
    if (row.component === "StackedIconGroup") return redReview({
        disposition: "ZERO_DEMAND_FALSE_DEFAULT_CONCEPT_DELETE_REQUIRED",
        basis: `${key} belongs to a zero-external-import layout wrapper already allocated to deletion. In its direct story, seven items/maxVisible=3 render only three item pucks plus +4; hidden items are sliced out before rendering and effective overlap is 0px, so expandOnHover's advertised reveal/stack is structurally impossible.`,
        acceptance: "Delete the component, /stacked-icons export, all six default declarations, hover CSS, dedicated story branch, tests, types, and docs; migrate local avatar/display sites to ordinary owner composition. No alias, private wrapper, or repaired novelty survives.",
        findingIds: ["RDA-037"], interactionIds: ["INT-029"], canonicalWaves: ["BI.W-P059", "BI.W-P061", "BI.W-P083"],
    });
    if (row.component === "GlassCarouselPager") return redReview({
        disposition: "ZERO_CONSUMER_MEMBER_FORK_DELETE_REQUIRED",
        basis: `${key} configures an exported pager with zero source, demo, test, or external runtime consumers. The live Carousel story exercises CarouselPager 1 / 6→2 / 6 with stable native-button focus and renders no GlassCarouselPager; the unused member independently forks counter/navigation/loop semantics.`,
        acceptance: "Delete GlassCarouselPager and both exports without alias. Keep the exercised CarouselPager and shared PagerDots as the only previous/next/counter/direct-position projections over one Carousel identity, loop, focus, announcement, drag, and autoplay-pause owner.",
        findingIds: ["RDA-038"], interactionIds: ["INT-030"], canonicalWaves: ["BI.W-P059", "BI.W-P061", "BI.W-P119"],
    });
    return null;
};
const reviewedDefault = (row) => {
    const critical = criticalReview(row);
    if (critical) return critical;
    const owners = defaultOwners(row);
    const domain = domainFor(row);
    if (row.conceptDecision === "delete") return {
        status: "ALLOCATED_DELETE",
        disposition: "INHERITS_CANONICAL_CONCEPT_DELETION",
        basis: `${row.component}.${row.prop} is part of the ${row.conceptId} concept whose consumer-bound formation decision is deletion; a default cannot preserve a file, export, alias, story, test, or dormant branch independently of that owner.`,
        acceptance: `The owning deletion wave removes ${row.component}.${row.prop} with the component and migrates any local behavior explicitly. No same-named compatibility surface or default-only helper remains, and tests/docs/path existence contribute zero demand credit.`,
        findingIds: [], interactionIds: [], canonicalWaves: owners,
    };
    if (row.candidateReason) return {
        status: "REVIEWED_ENROLLMENT",
        disposition: "BEHAVIOR_OR_MODE_DEFAULT_ENROLLED",
        basis: `${row.component}.${row.prop}=${row.expression} is a ${domain.toLowerCase().replaceAll("_", " ")} with ${row.firstPartyUsage.demo} direct demo occurrence(s), ${row.firstPartyUsage.demoDefaultApplies} exercising omission, ${row.firstPartyUsage.demoExplicit} explicit override(s), and ${row.firstPartyUsage.demoSpreadIndeterminate} spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.`,
        acceptance: `When omitted, ${row.component}.${row.prop} resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.`,
        findingIds: [], interactionIds: [], canonicalWaves: owners,
    };
    return {
        status: "REVIEWED_ENROLLMENT",
        disposition: `${domain}_ENROLLED`,
        basis: `${row.component}.${row.prop}=${row.expression} is classified as ${domain.toLowerCase().replaceAll("_", " ")} from its exact AST occurrence. Direct-tag discovery found ${row.firstPartyUsage.total} first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.`,
        acceptance: `The ${row.prop} omission value derives from the ${row.conceptId ?? row.component} owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.`,
        findingIds: [], interactionIds: [], canonicalWaves: owners,
    };
};

const rows = discoveredRows.map((row) => ({ ...row, defaultDomain: domainFor(row), ...reviewedDefault(row) }));
for (const row of rows) {
    if (row.canonicalWaves.length === 0) throw new Error(`${row.id}:${row.path}:${row.prop}: no canonical owner wave`);
    if (row.findingIds.some((id) => !renderedFindingIds.has(id))) throw new Error(`${row.id}: unknown rendered finding`);
    if (row.interactionIds.some((id) => !renderedInteractionIds.has(id))) throw new Error(`${row.id}: unknown rendered interaction`);
}

const output = {
    schemaVersion: "1.0.0",
    sourceBase: SOURCE_BASE,
    generatedAt: "2026-07-14",
    status: "FORMATION_RESEARCH_ONLY",
    authority: "DESCRIPTIVE_AST_AND_DIRECT_USAGE_DISCOVERY_PLUS_AUTHORED_FIRST_PRINCIPLES_DISPOSITION__NEVER_EXECUTION_PASS__RUNTIME_COMPOSITION_REDISCOVERS_DEFAULTS",
    method: "Parse every tracked Vue script under src/components at the frozen source base. Enumerate withDefaults, defineModel default, and runtime defineProps default expressions by AST occurrence. Separately scan every current src+demo Vue opening tag with a quote-aware parser to record direct component use and whether the prop is explicit, omitted, or hidden behind a spread. Assign every row one authored product disposition and exact canonical owner; generic domain text never overrides the explicit RED/delete cases. Tag spelling is diagnostic only, frozen counts never become a gate, and runtime composition remains authoritative.",
    componentFileCount: vuePaths.length,
    componentFilesWithDefaults: new Set(rows.map((row) => row.path)).size,
    defaultRowCount: rows.length,
    mechanismCounts: countBy(rows, (row) => row.mechanism),
    candidateRowCount: rows.filter((row) => row.candidateReason).length,
    candidateReasonCounts: countBy(rows.filter((row) => row.candidateReason), (row) => row.candidateReason),
    candidateRowsWithNoDirectDemoUsage: rows.filter((row) => row.candidateReason && row.firstPartyUsage.demo === 0).length,
    candidateRowsWithDemoUsageButNoDefaultDemo: rows.filter((row) => row.candidateReason && row.firstPartyUsage.demo > 0 && row.firstPartyUsage.demoDefaultApplies === 0).length,
    statusCounts: countBy(rows, (row) => row.status),
    dispositionCounts: countBy(rows, (row) => row.disposition),
    domainCounts: countBy(rows, (row) => row.defaultDomain),
    linkedRenderedFindingCount: uniq(rows.flatMap((row) => row.findingIds)).length,
    linkedRenderedInteractionCount: uniq(rows.flatMap((row) => row.interactionIds)).length,
    rows,
};

writeFileSync(join(ROOT, "public-default-contract-audit.json"), `${JSON.stringify(output, null, 2)}\n`);
const md = `# Public default contract audit\n\n` +
    `**Source base:** \`${SOURCE_BASE}\`\n` +
    `**Status:** formation research only; no implementation or execution PASS credit\n` +
    `**Vue component files scanned:** ${output.componentFileCount}\n` +
    `**Files with discovered defaults:** ${output.componentFilesWithDefaults}\n` +
    `**Default expressions:** ${output.defaultRowCount}\n` +
    `**Behavior/mode candidates:** ${output.candidateRowCount}\n\n` +
    `${output.method}\n\n` +
    `This ledger is never a file roster or completeness oracle. The future verifier rediscovers effective defaults from the current compiler/import/render/route graph and validates their composed product behavior; this frozen audit proves the formation inspected every current explicit declaration and did not let a story override hide the omission path.\n\n` +
    table(["ID", "Component", "Path:line", "Prop/model", "Default", "Domain", "Demo omission/total", "Status", "Disposition", "Findings", "Owners"], rows.map((row) => [
        row.id, row.component, `${row.path}:${row.line}`, row.prop, `\`${row.expression}\``, row.defaultDomain, `${row.firstPartyUsage.demoDefaultApplies}/${row.firstPartyUsage.demo}`, row.status, row.disposition, row.findingIds.join(", ") || "—", row.canonicalWaves.join(", "),
    ])) + "\n\n" +
    `## Reviewed reasoning\n\n` + rows.map((row) => `### ${row.id} — ${row.component}.${row.prop}\n\n**Basis:** ${row.basis}\n\n**Acceptance:** ${row.acceptance}\n`).join("\n");
writeFileSync(join(ROOT, "PUBLIC-DEFAULT-CONTRACT-AUDIT.md"), md);
console.log(JSON.stringify({ ok: true, rows: output.defaultRowCount, files: output.componentFilesWithDefaults, mechanisms: output.mechanismCounts, candidates: output.candidateRowCount, candidatesWithNoDirectDemo: output.candidateRowsWithNoDirectDemoUsage, candidatesWithDemoButNoDefaultDemo: output.candidateRowsWithDemoUsageButNoDefaultDemo, statuses: output.statusCounts, linkedFindings: output.linkedRenderedFindingCount, linkedInteractions: output.linkedRenderedInteractionCount }, null, 2));
