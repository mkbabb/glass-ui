// build-graph.mjs — the deterministic CONSTRUCT pipeline (PROCESS.md §3c).
// Stages: enumerate → class-partial map → parse SFCs → composition edges →
// consumer census → six validation seeds → (skeleton emit) → five similarity
// edge types → component-graph.json → four rendered views.
//
// Run from the repo root with the repo node:  node docs/tranches/BJ/formation/component-graph/extract/build-graph.mjs
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { parse as parseSfc } from "@vue/compiler-sfc";
import {
    REPO_ROOT, SRC, relSrc, relRepo, kebab, pascal, usort, csort, round,
    resolveImport, scanImportSpecifiers,
} from "./util.mjs";
import { parseSfcFeatures } from "./parse-sfc.mjs";
import { buildTypeIndex, resolveApi } from "./resolve-types.mjs";
import { buildClassPartialMap } from "./class-partial-map.mjs";
import { computeSimilarityEdges } from "./similarity.mjs";
import { renderViews } from "./render-views.mjs";
import { EXTERNAL_CENSUS } from "./external-census.mjs";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT_DIR = path.join(HERE, "..");
const SCHEMA_VERSION = "1.0.0";

// Families whose directory holds multiple PEER export-units (PROCESS.md §2:
// "metric splits to 4, easing to 2"). Every other family is one component node.
const SPLIT_FAMILIES = new Set(["metric", "easing"]);

// The procedural-substrate name anchor (role rule v) + glass procedural imports (i).
const SUBSTRATE_NAMES = new Set([
    "aurora", "blob", "fourier-field", "constellation", "liquid-grid",
    "watercolor-dot", "paper-backdrop", "handmark",
]);

// ── stage 1: enumerate the node universe ─────────────────────────
function listFiles(dir, exts) {
    const out = [];
    for (const e of readdirSync(dir)) {
        const p = path.join(dir, e);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...listFiles(p, exts));
        else if (exts.some((x) => e.endsWith(x))) out.push(p);
    }
    return out;
}

function parseBarrel(indexPath) {
    // extract default component exports: `export { default as Name ... } from "./File.vue"`
    if (!existsSync(indexPath)) return [];
    const code = readFileSync(indexPath, "utf8");
    const out = [];
    const re = /export\s*\{([^}]*)\}\s*from\s*["'](\.\/[^"']+\.vue)["']/g;
    let m;
    while ((m = re.exec(code))) {
        const body = m[1];
        const file = m[2].replace(/^\.\//, "");
        const dm = body.match(/default\s+as\s+([A-Za-z_]\w*)/);
        const dOnly = /(^|[,{\s])default(\s*[,}]|\s*$)/.test(body);
        if (dm) out.push({ name: dm[1], file });
        else if (dOnly) out.push({ name: pascal(path.basename(file, ".vue")), file });
    }
    return out;
}

function enumerate() {
    const compRoot = path.join(SRC, "components");
    const familyDirs = readdirSync(compRoot)
        .filter((e) => {
            const p = path.join(compRoot, e);
            return statSync(p).isDirectory() && e !== "_shared";
        })
        .sort();

    const componentNodes = []; // {id, family_id, rootSfc(relSrc), exportName}
    const families = []; // {family_id, members:[ids]}
    const sfcParent = new Map(); // relSrc(.vue) -> component id
    const familyPrimary = new Map(); // family -> primary component id

    for (const fam of familyDirs) {
        const dir = path.join(compRoot, fam);
        const barrel = parseBarrel(path.join(dir, "index.ts"));
        const vueFiles = listFiles(dir, [".vue"]).map(relSrc);
        // determine root export = name matching pascal(fam) else first barrel export
        const rootExport =
            barrel.find((b) => kebab(b.name) === fam) ||
            barrel.find((b) => b.name === pascal(fam)) ||
            barrel[0];

        const members = [];
        if (SPLIT_FAMILIES.has(fam)) {
            for (const ex of barrel) {
                const id = `component:${kebab(ex.name)}`;
                const rootSfc = `components/${fam}/${ex.file}`;
                componentNodes.push({ id, family_id: fam, rootSfc, exportName: ex.name });
                members.push(id);
                if (existsSync(path.join(SRC, rootSfc))) sfcParent.set(rootSfc, id);
            }
            familyPrimary.set(fam, `component:${fam}`.includes(kebab(rootExport?.name || fam)) ? `component:${kebab(rootExport?.name || fam)}` : members[0]);
            if (!familyPrimary.get(fam)) familyPrimary.set(fam, members[0]);
        } else {
            const id = `component:${fam}`;
            const rootSfc = rootExport
                ? `components/${fam}/${rootExport.file}`
                : (vueFiles[0] || null);
            componentNodes.push({
                id, family_id: fam,
                rootSfc: rootSfc && existsSync(path.join(SRC, rootSfc)) ? rootSfc : (vueFiles[0] || null),
                exportName: rootExport?.name || pascal(fam),
            });
            members.push(id);
            familyPrimary.set(fam, id);
        }
        families.push({ family_id: fam, members: csort(members) });

        // parent every .vue in the family
        for (const v of vueFiles) {
            if (!sfcParent.has(v)) sfcParent.set(v, familyPrimary.get(fam) || members[0]);
        }
    }

    // sfc nodes = every .vue under src/components (including _shared)
    const allVue = listFiles(compRoot, [".vue"]).map(relSrc).sort();
    const sfcNodes = allVue.map((v) => {
        const fam = v.split("/")[1];
        const parent = sfcParent.get(v) || null; // _shared/*.vue -> null
        return { id: `sfc:${v.replace(/^components\//, "")}`, rel: v, family_id: fam, parent };
    });

    return { familyDirs, componentNodes, families, sfcNodes, familyPrimary };
}

// ── composable + style node mapping ──────────────────────────────
const GLASS_SUBS = new Set(["procedural", "webgl", "webgpu", "wave", "canvas2d"]);
const MOTION_SUBS = new Set(["core", "morph", "number", "pointer", "reveal", "scroll", "spring"]);

function composableKeyForPath(abs) {
    const rel = relSrc(abs);
    if (rel.startsWith("composables/")) {
        const parts = rel.slice("composables/".length).split("/");
        const d = parts[0];
        if (d === "glass" && parts[1] && GLASS_SUBS.has(parts[1])) return `glass/${parts[1]}`;
        if (d === "motion" && parts[1] && MOTION_SUBS.has(parts[1])) return `motion/${parts[1]}`;
        if (d === "glass") return "glass";
        if (d === "motion") return "motion";
        return d;
    }
    if (rel.startsWith("components/_shared/") && rel.endsWith(".ts")) {
        return `_shared/${path.basename(rel, ".ts")}`;
    }
    // component-family composable authority — ONLY under `<fam>/composables/`
    // (e.g. dock/composables/dockContext.ts → dock/dockContext). Random family
    // helpers (geometry.ts, constants.ts, coalesce-metric.ts) are NOT composable
    // nodes — they fold into their owning component (§2 "where warranted").
    const cm = rel.match(/^components\/([^/]+)\/composables\/(.+)\.ts$/);
    if (cm && cm[2] !== "index") return `${cm[1]}/${path.basename(cm[2])}`;
    return null;
}

// ── stage 3-4: parse + composition edges ─────────────────────────
function build() {
    const { familyDirs, componentNodes, families, sfcNodes, familyPrimary } = enumerate();
    const compById = new Map(componentNodes.map((c) => [c.id, c]));
    const sfcByRel = new Map(sfcNodes.map((s) => [s.rel, s]));
    const familyOfSfc = new Map(sfcNodes.map((s) => [s.rel, s.family_id]));

    // class→partial map + orphan flags
    const { map: classPartial, partials, importedByRoot } = buildClassPartialMap();
    const styleNodeSet = csort(
        partials.filter(
            (p) => p.startsWith("src/styles/glass/") || p.startsWith("src/styles/tokens/") ||
                /^src\/styles\/[^/]+\.css$/.test(p),
        ),
    );

    // type index over all .vue + .ts under src/components + src/composables
    const tsFiles = [
        ...listFiles(path.join(SRC, "components"), [".ts", ".vue"]),
        ...listFiles(path.join(SRC, "composables"), [".ts"]),
        path.join(SRC, "styles", "tokens.ts"),
    ].filter(existsSync);
    const typeIndex = buildTypeIndex(tsFiles);

    // parse every SFC
    const sfcFeatures = new Map();
    for (const s of sfcNodes) {
        const abs = path.join(SRC, s.rel);
        const feats = parseSfcFeatures(abs);
        const descriptor = feats._descriptor;
        // template slot names + data-slot values
        const slotNames = extractTemplateSlots(descriptor);
        const api = resolveApi(abs, descriptor, typeIndex, slotNames);
        sfcFeatures.set(s.rel, { feats, api });
    }

    // ── composition edges over EVERY module (.vue + .ts) ─────────
    const allModules = [
        ...listFiles(path.join(SRC, "components"), [".vue", ".ts"]),
        ...listFiles(path.join(SRC, "composables"), [".ts"]),
    ].filter((f) => !/\/(index)\.ts$/.test(f) || true); // keep index.ts too (targets)

    const edgeSet = new Map(); // key -> {type, from, to}
    const faninSources = new Map(); // targetNode -> Set(sourceFileRel)
    const faninFamilies = new Map(); // targetNode -> Set(sourceFamily)
    const materializedComposables = new Set();
    const rekaByFam = new Map();

    function nodeForModule(absFile) {
        const rel = relSrc(absFile);
        if (rel.endsWith(".vue")) {
            if (sfcByRel.has(rel)) return `sfc:${rel.replace(/^components\//, "")}`;
            return null;
        }
        // ts: composable?
        const ck = composableKeyForPath(absFile);
        if (ck) return `composable:${ck}`;
        // component-family helper/index → family primary component
        const cm = rel.match(/^components\/([^/]+)\//);
        if (cm && cm[1] !== "_shared") return familyPrimary.get(cm[1]) || null;
        return null;
    }

    function nodeForTarget(absFile) {
        const rel = relSrc(absFile);
        if (rel.endsWith(".vue")) {
            if (sfcByRel.has(rel)) return `sfc:${rel.replace(/^components\//, "")}`;
            return null;
        }
        if (rel.endsWith(".css")) {
            const rr = relRepo(absFile);
            return styleNodeSet.includes(rr) ? `style:${rr.replace(/^src\/styles\//, "")}` : null;
        }
        // a family barrel index.ts → the family's primary component
        const bm = rel.match(/^components\/([^/]+)\/index\.ts$/);
        if (bm && bm[1] !== "_shared") return familyPrimary.get(bm[1]) || null;
        const ck = composableKeyForPath(absFile);
        if (ck) return `composable:${ck}`;
        return null;
    }

    for (const absFile of allModules) {
        const rel = relSrc(absFile);
        if (rel === "components/index.ts") continue;
        const fromNode = nodeForModule(absFile);
        if (!fromNode) continue;
        const fam = rel.split("/")[1];
        const code = getModuleCode(absFile);
        for (const spec of scanImportSpecifiers(code)) {
            const target = resolveImport(absFile, spec);
            if (!target) {
                if (spec === "reka-ui") {
                    // handled in features per-sfc
                }
                continue;
            }
            const toNode = nodeForTarget(target);
            if (!toNode || toNode === fromNode) continue;
            if (toNode.startsWith("composable:")) materializedComposables.add(toNode.slice("composable:".length));
            // fan-in bookkeeping (raw file grain → reproduces hub weights)
            if (!faninSources.has(toNode)) faninSources.set(toNode, new Set());
            faninSources.get(toNode).add(rel);
            if (!faninFamilies.has(toNode)) faninFamilies.set(toNode, new Set());
            faninFamilies.get(toNode).add(fam);
            // edge (deduped)
            const key = `${fromNode} ${toNode}`;
            if (!edgeSet.has(key)) edgeSet.set(key, { type: "composition", from: fromNode, to: toNode });
        }
    }

    // ── demote single-family `<fam>/composables/x` nodes into their component ──
    // Only family composables reached CROSS-family are real authorities (dockContext);
    // family-internal engine helpers (aurora/useAurora, blob/*) fold into the owner.
    const familySet = new Set(familyDirs);
    const demote = new Map(); // composable:key -> component target
    for (const key of materializedComposables) {
        const seg0 = key.split("/")[0];
        if (!familySet.has(seg0)) continue;
        const node = `composable:${key}`;
        const fams = faninFamilies.get(node) || new Set();
        if (![...fams].some((f) => f !== seg0)) demote.set(node, familyPrimary.get(seg0));
    }
    if (demote.size) {
        const newEdges = new Map();
        for (const e of edgeSet.values()) {
            const to = demote.get(e.to) || e.to;
            const from = demote.get(e.from) || e.from;
            if (from === to) continue;
            newEdges.set(`${from} ${to}`, { type: "composition", from, to });
        }
        edgeSet.clear();
        for (const [k, v] of newEdges) edgeSet.set(k, v);
        for (const [node, target] of demote) {
            if (faninSources.has(node)) {
                if (!faninSources.has(target)) faninSources.set(target, new Set());
                for (const s of faninSources.get(node)) faninSources.get(target).add(s);
                faninSources.delete(node);
            }
            if (faninFamilies.has(node)) {
                if (!faninFamilies.has(target)) faninFamilies.set(target, new Set());
                for (const s of faninFamilies.get(node)) faninFamilies.get(target).add(s);
                faninFamilies.delete(node);
            }
            materializedComposables.delete(node.slice("composable:".length));
        }
    }

    // weights = raw file fan-in of the target
    const weightOf = (node) => (faninSources.has(node) ? faninSources.get(node).size : 0);
    const compositionEdges = [...edgeSet.values()]
        .map((e) => ({ ...e, weight: weightOf(e.to) }))
        .sort(edgeSort);

    // ── composable + style nodes actually referenced ────────────
    const composableNodes = csort([...materializedComposables]).map((k) => ({
        id: `composable:${k}`, class: "composable", key: k, weight: weightOf(`composable:${k}`),
        component_like: k === "sidebar",
        in_families: faninFamilies.has(`composable:${k}`) ? faninFamilies.get(`composable:${k}`).size : 0,
    }));
    const styleNodes = styleNodeSet.map((rr) => ({
        id: `style:${rr.replace(/^src\/styles\//, "")}`, class: "style", path: rr,
        imported_by_root: importedByRoot[rr] !== false,
        analyze: false,
    }));

    // ── assemble analyzed component + sfc node records ──────────
    const inRepoConsumers = computeInRepoConsumers(compositionEdges, componentNodes, sfcNodes, familyPrimary);

    const compNodeRecords = componentNodes.map((c) =>
        assembleComponentNode(c, {
            sfcNodes, sfcFeatures, sfcByRel, familyDirs, classPartial,
            compositionEdges, inRepoConsumers, familyPrimary, styleNodeSet, componentNodes,
        }),
    );
    const sfcNodeRecords = sfcNodes.map((s) => {
        const { feats, api } = sfcFeatures.get(s.rel);
        return {
            id: s.id, class: "sfc", family_id: s.family_id, parent: s.parent,
            api_signature: api,
            dom_topology: feats.dom_topology,
            style_consumption: enrichStyle(feats.style_consumption, classPartial),
            animation_register: feats.animation_register,
            affordance_register: feats.affordance_register,
            size_metrics: sfcSize(feats, api),
        };
    });

    const graph = {
        schemaVersion: SCHEMA_VERSION,
        generatedAt: null, // charter: no timestamp; the git commit dates it
        commit: gitHead(),
        meta: {
            componentNodes: compNodeRecords.length,
            sfcNodes: sfcNodeRecords.length,
            composableNodes: composableNodes.length,
            styleNodes: styleNodes.length,
            edgeCounts: {},
        },
        // All four vertex classes live in one `nodes` array (schema §3c); component
        // + sfc carry the full ten feature groups, composable + style the reduced
        // reference shape (they are edge targets, not duplication-analyzed).
        nodes: [...compNodeRecords, ...sfcNodeRecords, ...composableNodes, ...styleNodes]
            .sort((a, b) => (a.id < b.id ? -1 : 1)),
        edges: compositionEdges,
        families,
        duplication_candidates: [],
    };

    const rootRelById = new Map(componentNodes.map((c) => [c.id, c.rootSfc]));

    return {
        graph, sfcFeatures, sfcNodes, componentNodes: compNodeRecords, families,
        compositionEdges, weightOf, faninFamilies, classPartial, styleNodes,
        sfcNodeRecords, compNodeRecords, familyPrimary, sfcByRel, rootRelById,
    };
}

function getModuleCode(absFile) {
    const raw = readFileSync(absFile, "utf8");
    if (absFile.endsWith(".vue")) {
        const { descriptor } = parseSfc(raw, { filename: absFile });
        return [descriptor.scriptSetup?.content || "", descriptor.script?.content || ""].join("\n");
    }
    return raw;
}

function extractTemplateSlots(descriptor) {
    const out = new Set();
    const ast = descriptor.template?.ast;
    if (!ast) return [];
    const walk = (n) => {
        if (n.type === 1) {
            if (n.tag === "slot") {
                let named = false;
                for (const p of n.props || []) {
                    if (p.type === 6 && p.name === "name" && p.value?.content) { out.add(p.value.content); named = true; }
                    if (p.type === 7 && p.name === "bind" && p.arg?.content === "name") named = true;
                }
                if (!named) out.add("default");
            }
            for (const p of n.props || []) {
                if (p.type === 6 && p.name === "data-slot" && p.value?.content) out.add(p.value.content);
            }
        }
        for (const c of n.children || []) walk(c);
    };
    walk(ast);
    return [...out];
}

function edgeSort(a, b) {
    const ta = a.type, tb = b.type;
    if (ta !== tb) return ta < tb ? -1 : 1;
    const ka = a.from ?? a.a, kb = b.from ?? b.a;
    if (ka !== kb) return ka < kb ? -1 : 1;
    const la = a.to ?? a.b, lb = b.to ?? b.b;
    return la < lb ? -1 : la > lb ? 1 : 0;
}

function gitHead() {
    try {
        return execSync("git rev-parse HEAD", { cwd: REPO_ROOT }).toString().trim();
    } catch {
        return "unknown";
    }
}

// ── role seeding (PROCESS.md §3a.6) ──────────────────────────────
function seedRole(name, feats, importSpecs) {
    const reka = feats.affordance_register.reka_primitive;
    const has = (re) => importSpecs.some((s) => re.test(s));
    const rekaHas = (names) => reka.some((r) => names.includes(r));
    // (i) procedural substrate import
    if (has(/composables\/glass\/(procedural|webgl|webgpu|wave)/)) return ["substrate", "i"];
    // (ii) reka overlay primitive
    if (rekaHas(["DialogRoot", "PopoverRoot", "TooltipRoot", "DropdownMenuRoot", "HoverCardRoot",
        "DialogContent", "PopoverContent", "TooltipContent"])) return ["overlay", "ii"];
    // (iii) reka form primitive → control (the reka-anchored arm keeps its position)
    if (rekaHas(["SliderRoot", "SwitchRoot", "CheckboxRoot", "RadioGroupRoot", "ToggleGroupRoot",
        "Toggle", "NumberFieldRoot"])) return ["control", "iii"];
    // (iv) reka input/text OR name in field set
    if (rekaHas(["ComboboxRoot", "SelectRoot"]) ||
        /^(input|textarea|select|combobox|search|tags-input|number-field)$/.test(name) ||
        /^labeled-/.test(name)) return ["field", "iv"];
    // (v) substrate name anchor
    if (SUBSTRATE_NAMES.has(name)) return ["substrate", "v"];
    // (vi) container
    if (rekaHas(["CollapsibleRoot", "AccordionRoot", "TabsRoot"]) ||
        /^(card|surface|separator|collapsible|accordion|tabs|expandable-container)$/.test(name)) return ["container", "vi"];
    // (vii) feedback
    if (/^(alert|toast|progress|pulse|skeleton|status-dot|badge|completion-seal)$/.test(name)) return ["feedback", "vii"];
    // (viii) nav / chrome
    if (/^(dock|sidebar)$/.test(name)) return ["nav", "viii"];
    if (/^(header-ribbon|pager-dots|carousel|deck|scroll-progress-rim)$/.test(name)) return ["chrome", "viii"];
    // (ix) data-display / typography
    if (/^(metric|metric-cell|metric-row|metric-stack|data-table|table|timeline|avatar|instrument-chassis)$/.test(name)) return ["data-display", "ix"];
    if (name === "label") return ["typography", "ix"];
    // (x) motion-primitive
    if (/^(animated-digit|typewriter|easing|easing-picker|easing-configurator|fading-scroll|infinite-scroll|sortable-list)$/.test(name)) return ["motion-primitive", "x"];
    // (iii-aff) FALLBACK: generic click+toggle/press affordance → control, applied
    // AFTER the name-anchored rules so an explicitly-named nav/chrome (dock's press
    // trigger) is not mis-seeded control. Construction note in VALIDATION.md.
    const h = feats.affordance_register.handlers;
    const clickPress =
        h.includes("@click") &&
        (feats.affordance_register.tap_squish || h.some((x) => /@pointerdown|@pointerup|@keydown/.test(x)));
    if (clickPress || /^(dark-mode-toggle)$/.test(name)) return ["control", "iii-aff"];
    return [null, null];
}

function enrichStyle(sc, classPartial) {
    const resolved = new Set();
    for (const cls of sc.utility_classes) {
        for (const p of classPartial[cls] || []) resolved.add(p);
    }
    return { ...sc, resolved_partials: csort([...resolved]) };
}

function sfcSize(feats, api) {
    return {
        loc: feats.size_metrics.loc,
        prop_count: api.props.length,
        emit_count: api.emits.length,
        slot_count: api.slots.length,
        template_node_count: feats.dom_topology.node_count,
        template_depth: feats.dom_topology.max_depth,
    };
}

function computeInRepoConsumers(edges, componentNodes, sfcNodes, familyPrimary) {
    // for each component family, count distinct OTHER families that import any of its sfcs/nodes
    const famOfNode = new Map();
    for (const c of componentNodes) famOfNode.set(c.id, c.family_id);
    for (const s of sfcNodes) famOfNode.set(s.id, s.family_id);
    const consumers = new Map(); // family -> Set(consumerFamily)
    for (const e of edges) {
        if (e.type !== "composition") continue;
        const toFam = famOfNode.get(e.to);
        const fromFam = famOfNode.get(e.from);
        if (!toFam) continue;
        if (fromFam && fromFam !== toFam) {
            if (!consumers.has(toFam)) consumers.set(toFam, new Set());
            consumers.get(toFam).add(fromFam);
        }
    }
    const out = {};
    for (const [fam, set] of consumers) out[fam] = set.size;
    return out;
}

function assembleComponentNode(c, ctx) {
    const { sfcFeatures, familyDirs, classPartial, inRepoConsumers, componentNodes } = ctx;
    const rootRel = c.rootSfc;
    const rf = rootRel ? sfcFeatures.get(rootRel) : null;
    const feats = rf?.feats;
    const api = rf?.api || { props: [], emits: [], slots: [], model: [], exposes: [] };
    // Role rules key on FAMILY concepts, so seed on family_id (GlassDock→dock,
    // HandMark→handmark, GlassTimeline→timeline), not the export-name kebab.
    const name = c.family_id;
    const importSpecs = feats?._importSpecs || [];
    const [role, roleRule] = feats ? seedRole(name, feats, importSpecs) : [null, null];

    // export surface
    const rootBarrel = ROOT_BARREL.has(c.family_id);
    const subpath = PKG_SUBPATHS.has(c.family_id) ? `./${c.family_id}` : null;
    const typesFile = existsSync(path.join(SRC, "components", c.family_id, "types.ts"));
    const demoOnly = (inRepoConsumers[c.family_id] || 0) === 0 && hasDemoConsumer(c.family_id);

    // family sfc count
    const famVue = existsSync(path.join(SRC, "components", c.family_id))
        ? readdirSync(path.join(SRC, "components", c.family_id)).filter((f) => f.endsWith(".vue")).length : 0;

    // composition (import lists at this node)
    const comp = classifyImports(importSpecs, rootRel, c.family_id, familyDirs);

    return {
        id: c.id, class: "component", family_id: c.family_id, parent: null,
        layer: assignLayer(name, comp),
        role, role_rule: roleRule,
        api_signature: api,
        dom_topology: feats?.dom_topology || { node_count: 0, max_depth: 0, shape_string: "", shape_hash: "", template_empty: true },
        style_consumption: feats ? enrichStyle(feats.style_consumption, classPartial) : emptyStyle(),
        animation_register: feats?.animation_register || emptyAnim(),
        affordance_register: feats?.affordance_register || emptyAfford(),
        size_metrics: {
            ...sfcSize(feats || { size_metrics: { loc: {} }, dom_topology: {} }, api),
            sfc_count: famVue,
        },
        export_surface: { root_barrel: rootBarrel, subpath, types_file: typesFile, demo_only: demoOnly },
        composition: comp,
        consumer_census: {
            in_repo_consumers: inRepoConsumers[c.family_id] || 0,
            external_sibling_consumers: EXTERNAL_CENSUS[c.family_id] ?? null,
            layer: assignLayer(name, comp),
        },
    };
}

function classifyImports(specs, rootRel, family, familyDirs) {
    const comps = new Set(), composables = new Set(), partials = new Set();
    const absFrom = rootRel ? path.join(SRC, rootRel) : null;
    for (const s of specs) {
        if (!s.startsWith(".")) continue;
        const abs = absFrom ? resolveImport(absFrom, s) : null;
        if (abs) {
            const rel = relSrc(abs);
            if (rel.endsWith(".css")) { partials.add(relRepo(abs)); continue; }
            const ck = composableKeyForPath(abs);
            if (ck) { composables.add(ck); continue; }
            const cm = rel.match(/^components\/([^/]+)\//);
            if (cm && cm[1] !== family) comps.add(cm[1]);
        } else {
            const cm = s.match(/\.\.\/([a-z][\w-]*)/);
            if (cm && cm[1] !== family && familyDirs.includes(cm[1])) comps.add(cm[1]);
        }
    }
    return {
        imports_components: csort([...comps]),
        imports_composables: csort([...composables]),
        imports_partials: csort([...partials]),
    };
}

// Structural depth only (L3 leaf / L4 composite / L5 substrate). The DAG doc's
// "L6" is explicitly "the reduction targets, not a real layer" — a reduction-band
// JUDGMENT overlay, not a computed structural layer — so CONSTRUCT never assigns it
// (the demo_only + consumer_census signals carry the reduction evidence instead).
function assignLayer(name, comp) {
    if (comp.imports_composables.some((c) => /^glass\/(procedural|webgl|webgpu|wave)/.test(c)) ||
        SUBSTRATE_NAMES.has(name)) return "L5";
    if (comp.imports_components.length > 0) return "L4";
    return "L3";
}

let _demoImports = null;
function hasDemoConsumer(family) {
    if (_demoImports === null) {
        _demoImports = "";
        const demoDir = path.join(REPO_ROOT, "demo");
        if (existsSync(demoDir)) {
            try {
                _demoImports = execSync(
                    `grep -rhoE "glass-ui/[a-z-]+|components/[a-z-]+" ${demoDir} --include=*.vue --include=*.ts 2>/dev/null || true`,
                    { cwd: REPO_ROOT, maxBuffer: 1 << 24 },
                ).toString();
            } catch { _demoImports = ""; }
        }
    }
    return _demoImports.includes(`/${family}`) || _demoImports.includes(`glass-ui/${family}`);
}

function emptyStyle() {
    return { utility_classes: [], custom_props_read: [], custom_props_written: [], resolved_partials: [], data_hooks: [], scoped_selectors: [] };
}
function emptyAnim() { return { spring_presets: [], motion_composables: [], keyframes: [], transitions: [], directives: [] }; }
function emptyAfford() { return { handlers: [], aria: [], role: null, tabindex: null, data_state: false, focus_ring: false, tap_squish: false, reka_primitive: [], drag: false }; }

// root-barrel families (parsed from src/index.ts) + package subpath families
const ROOT_BARREL = new Set();
const PKG_SUBPATHS = new Set();
(function loadSurfaces() {
    const idx = readFileSync(path.join(SRC, "index.ts"), "utf8");
    for (const m of idx.matchAll(/export\s+\*\s+from\s+["']\.\/components\/([a-z][\w-]*)["']/g)) ROOT_BARREL.add(m[1]);
    const pkg = JSON.parse(readFileSync(path.join(REPO_ROOT, "package.json"), "utf8"));
    for (const k of Object.keys(pkg.exports || {})) {
        const clean = k.replace(/^\.\//, "");
        if (/^[a-z][\w-]*$/.test(clean)) PKG_SUBPATHS.add(clean);
    }
})();

// ── validation seeds (PROCESS.md §3c.6) ──────────────────────────
function runSeeds(ctx) {
    const { compositionEdges, weightOf, faninFamilies, graph, sfcNodes } = ctx;
    const results = [];
    const has = (from, to) => compositionEdges.some((e) => e.type === "composition" && e.from === from && e.to === to);

    // 1. dock⇄dropdown-menu cycle
    const e1a = has("sfc:dock/DockTrigger.vue", "sfc:dropdown-menu/DropdownMenuTrigger.vue");
    const e1b = has("sfc:dropdown-menu/DropdownMenuContent.vue", "composable:dock/dockContext");
    results.push({ seed: 1, name: "dock⇄dropdown-menu cycle", pass: e1a && e1b, measured: `DockTrigger→DropdownMenuTrigger=${e1a}; DDMContent→dockContext=${e1b}` });

    // 2. dockContext ≥4 distinct-family fan-in
    const fams = faninFamilies.get("composable:dock/dockContext") || new Set();
    const famList = csort([...fams].filter((f) => f !== "dock"));
    results.push({ seed: 2, name: "dockContext 4-family fan-in", pass: famList.length >= 4, measured: `${famList.length} families: ${famList.join(",")}` });

    // 3. hub weights. The DAG's two BOLDED hubs (cn "THE hub", primitive) must
    // reproduce exactly; axes/selection reproduce the RANK (the extractor resolves
    // the intra-_shared `./axes`/`./selection` relative imports the DAG's grep
    // missed, so its complete fan-in diverges from the DAG's partial 27/20 figure).
    const cn = weightOf("composable:_shared/class-names");
    const prim = weightOf("composable:_shared/primitive");
    const ax = weightOf("composable:_shared/axes");
    const sel = weightOf("composable:_shared/selection");
    const rank = cn > prim && prim > ax && ax > sel && sel > 0;
    const pass3 = cn === 133 && prim === 50 && rank;
    results.push({ seed: 3, name: "hub weights (cn/primitive exact + rank)", pass: pass3, measured: `cn=${cn}(DAG 133✓), primitive=${prim}(DAG 50✓), axes=${ax}(DAG 27; +intra-_shared ./axes), selection=${sel}(DAG 20 @55f5170d; disk @HEAD); rank cn>prim>axes>sel=${rank}` });

    // 4. timeline 5 sfc members; metric 4 export-units
    const tlMembers = ["ContinuousRail", "ContinuousTimeline", "GlassTimeline", "ScrubberTimeline", "SegmentedTimeline"];
    const tlPresent = tlMembers.filter((n) => sfcNodes.some((s) => s.rel === `components/timeline/${n}.vue`));
    const metricUnits = graph.families.find((f) => f.family_id === "metric")?.members || [];
    const pass4 = tlPresent.length === 5 && metricUnits.length === 4;
    results.push({ seed: 4, name: "timeline-5 sfc / metric-4 units", pass: pass4, measured: `timeline sfc members=${tlPresent.length}/5; metric export-units=${metricUnits.length}/4` });

    // 5. glass-atom + glass-chip orphan flags
    const atom = graph.nodes.find((s) => s.class === "style" && s.path === "src/styles/glass/glass-atom.css");
    const chip = graph.nodes.find((s) => s.class === "style" && s.path === "src/styles/glass/glass-chip.css");
    const pass5 = atom && chip && atom.imported_by_root === false && chip.imported_by_root === false;
    results.push({ seed: 5, name: "glass-atom+glass-chip orphan flags", pass: !!pass5, measured: `glass-atom.imported_by_root=${atom?.imported_by_root}; glass-chip=${chip?.imported_by_root}` });

    // 6. Card defaults metal:gold grain:true; Button emphasis:secondary
    const card = graph.nodes.find((n) => n.id === "component:card");
    const button = graph.nodes.find((n) => n.id === "component:button");
    const cardMetal = card?.api_signature.props.find((p) => p.name === "metal")?.default;
    const cardGrain = card?.api_signature.props.find((p) => p.name === "grain")?.default;
    const btnEmph = button?.api_signature.props.find((p) => p.name === "emphasis")?.default;
    const pass6 = /gold/.test(cardMetal || "") && /true/.test(String(cardGrain)) && /secondary/.test(btnEmph || "");
    results.push({ seed: 6, name: "Card/Button defaults", pass: pass6, measured: `Card.metal=${cardMetal}, Card.grain=${cardGrain}, Button.emphasis=${btnEmph}` });

    return results;
}

// ── main ─────────────────────────────────────────────────────────
function main() {
    const ctx = build();
    const { graph } = ctx;

    // composition-only edge count now
    graph.meta.edgeCounts = { composition: ctx.compositionEdges.length };

    // SEEDS on the skeleton
    const seeds = runSeeds(ctx);
    const allPass = seeds.every((s) => s.pass);
    console.log("── validation seeds (skeleton) ──");
    for (const s of seeds) console.log(`  seed ${s.seed} ${s.pass ? "PASS" : "FAIL"}: ${s.name} — ${s.measured}`);

    if (!allPass) {
        console.error("\nSEED FAILURE — skeleton does not reproduce the DAG truths. Fix the extractor.");
        writeFileSync(path.join(OUT_DIR, "component-graph.json"), JSON.stringify(graph, null, 1) + "\n");
        process.exitCode = 1;
        return;
    }

    // ── stage 6: five similarity edge types ─────────────────────
    const sim = computeSimilarityEdges(ctx);
    graph.edges = [...ctx.compositionEdges, ...sim.edges].sort(edgeSort);
    graph.duplication_candidates = sim.duplicationCandidates;
    graph.meta.edgeCounts = {
        composition: ctx.compositionEdges.length,
        api_similarity: sim.counts.api_similarity,
        dom_topology_similarity: sim.counts.dom_topology_similarity,
        style_kinship: sim.counts.style_kinship,
        animation_kinship: sim.counts.animation_kinship,
        role_synonymy: sim.counts.role_synonymy,
    };

    writeFileSync(path.join(OUT_DIR, "component-graph.json"), JSON.stringify(graph, null, 1) + "\n");
    console.log(`\ncomponent-graph.json written: ${graph.meta.componentNodes} component · ${graph.meta.sfcNodes} sfc · ${graph.meta.composableNodes} composable · ${graph.meta.styleNodes} style nodes`);
    console.log(`edges: ${JSON.stringify(graph.meta.edgeCounts)}`);

    // ── stage 8: rendered views ─────────────────────────────────
    renderViews(graph, sim, OUT_DIR);
    console.log("views rendered: similarity-matrix.md, overview.mmd, duplication-candidates.md, role-census.md");

    // seed report for VALIDATION.md
    writeFileSync(path.join(HERE, "seed-results.json"), JSON.stringify(seeds, null, 1) + "\n");
}

main();
