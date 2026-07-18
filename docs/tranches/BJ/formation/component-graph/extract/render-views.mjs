// render-views.mjs — the four rendered views (PROCESS.md §3c "Rendered views").
// similarity-matrix.md · overview.mmd · duplication-candidates.md · role-census.md
import { writeFileSync } from "node:fs";
import path from "node:path";
import { csort } from "./util.mjs";

const ROLES = [
    "control", "field", "container", "overlay", "feedback", "nav", "data-display",
    "substrate", "motion-primitive", "typography", "chrome", null,
];

export function renderViews(graph, sim, outDir) {
    renderRoleCensus(graph, outDir);
    renderSimilarityMatrix(graph, sim, outDir);
    renderOverview(graph, outDir);
    renderDuplicationCandidates(graph, outDir);
}

function comps(graph) {
    return graph.nodes.filter((n) => n.class === "component");
}

function renderRoleCensus(graph, outDir) {
    const cs = comps(graph);
    const byRole = new Map();
    for (const c of cs) {
        const r = c.role || "null";
        if (!byRole.has(r)) byRole.set(r, []);
        byRole.get(r).push(c);
    }
    let md = `# role-census — nodes grouped by seeded \`role\` (synonym-scan input)\n\n`;
    md += `Deterministic seed labels from PROCESS.md §3a.6 (first-match rule id recorded). `;
    md += `\`role: null\` rows are the INFER seat's to assign. Generated from component-graph.json @ commit \`${graph.commit}\`.\n\n`;
    md += `| role | n | components (rule) |\n|---|---|---|\n`;
    for (const r of ROLES) {
        const key = r || "null";
        const list = byRole.get(key) || [];
        if (!list.length) continue;
        const cell = csort(list.map((c) => `${c.id.replace("component:", "")} (${c.role_rule || "-"})`)).join(", ");
        md += `| \`${key}\` | ${list.length} | ${cell} |\n`;
    }
    writeFileSync(path.join(outDir, "role-census.md"), md);
}

function renderSimilarityMatrix(graph, sim, outDir) {
    const cs = comps(graph);
    const edgeMap = new Map(); // "a|b|type" -> score
    for (const e of graph.edges) {
        if (e.a && e.b) edgeMap.set(`${e.a}|${e.b}|${e.type}`, e.score);
    }
    const get = (a, b, type) => {
        const k1 = edgeMap.get(`${a}|${b}|${type}`);
        if (k1 !== undefined) return k1;
        const k2 = edgeMap.get(`${b}|${a}|${type}`);
        return k2 !== undefined ? k2 : null;
    };

    let md = `# similarity-matrix — per-role-family redundancy heatmaps\n\n`;
    md += `Within-family similarity across the four component-grain metrics (api · dom · style · anim). `;
    md += `Cells blank below threshold; \`—\` is self. Generated @ commit \`${graph.commit}\`.\n\n`;

    for (const r of ROLES) {
        const key = r || "null";
        const fam = csort(cs.filter((c) => (c.role || "null") === key).map((c) => c.id));
        if (fam.length < 2) continue;
        md += `## \`${key}\` (${fam.length})\n\n`;
        for (const metric of ["api_similarity", "style_kinship", "animation_kinship"]) {
            md += `### ${metric}\n\n`;
            md += matrixTable(fam, (a, b) => get(a, b, metric));
            md += `\n`;
        }
        // dom at component grain: pull from duplication_candidates sub.dom
        md += `### dom_topology (root-sfc, from composite sub-scores)\n\n`;
        const domGet = (a, b) => {
            const dc = graph.duplication_candidates.find(
                (d) => (d.a === a && d.b === b) || (d.a === b && d.b === a),
            );
            return dc ? dc.sub.dom : null;
        };
        md += matrixTable(fam, domGet);
        md += `\n`;
    }
    writeFileSync(path.join(outDir, "similarity-matrix.md"), md);
}

function matrixTable(ids, get) {
    const short = (id) => id.replace("component:", "");
    let md = `| | ${ids.map(short).join(" | ")} |\n`;
    md += `|${"---|".repeat(ids.length + 1)}\n`;
    for (const a of ids) {
        const row = [short(a)];
        for (const b of ids) {
            if (a === b) row.push("—");
            else {
                const v = get(a, b);
                row.push(v == null || v === 0 ? "" : v.toFixed(2));
            }
        }
        md += `| ${row.join(" | ")} |\n`;
    }
    return md;
}

function renderOverview(graph, outDir) {
    const cs = comps(graph);
    const byLayer = new Map();
    for (const c of cs) {
        const l = c.layer || "L?";
        if (!byLayer.has(l)) byLayer.set(l, []);
        byLayer.get(l).push(c);
    }
    const layers = csort([...byLayer.keys()]);
    let mmd = `%% component-graph overview — composition (solid) subsumes the DAG doc.\n`;
    mmd += `%% similarity edges (dashed) omitted from the whole-graph view for legibility;\n`;
    mmd += `%% see similarity-matrix.md + duplication-candidates.md. Commit ${graph.commit}.\n`;
    mmd += `graph TD\n`;
    for (const l of layers) {
        mmd += `  subgraph ${l}\n`;
        for (const c of csort(byLayer.get(l).map((c) => c.id))) {
            const short = c.replace("component:", "");
            mmd += `    ${idSafe(c)}["${short}"]\n`;
        }
        mmd += `  end\n`;
    }
    // composition edges between components (and to composable hubs) — sample the
    // component→component + hub edges to keep the diagram readable.
    const compIds = new Set(cs.map((c) => c.id));
    const hubs = new Set([
        "composable:_shared/class-names", "composable:_shared/primitive",
        "composable:_shared/axes", "composable:_shared/selection",
        "composable:dock/dockContext",
    ]);
    mmd += `  %% hub authorities\n`;
    for (const h of csort([...hubs])) mmd += `  ${idSafe(h)}(["${h.replace("composable:", "")}"])\n`;
    const drawn = new Set();
    for (const e of graph.edges) {
        if (e.type !== "composition") continue;
        // component→component
        const fromComp = toComp(e.from), toC = toComp(e.to);
        if (fromComp && compIds.has(fromComp) && compIds.has(toC) && fromComp !== toC) {
            const k = `${fromComp}->${toC}`;
            if (!drawn.has(k)) { mmd += `  ${idSafe(fromComp)} --> ${idSafe(toC)}\n`; drawn.add(k); }
        }
        // →hub
        if (hubs.has(e.to)) {
            const fc = toComp(e.from);
            if (fc && compIds.has(fc)) {
                const k = `${fc}=>${e.to}`;
                if (!drawn.has(k)) { mmd += `  ${idSafe(fc)} -.-> ${idSafe(e.to)}\n`; drawn.add(k); }
            }
        }
    }
    // the dock⇄dropdown-menu cycle marker
    mmd += `  %% dock ⇄ dropdown-menu 2-cycle (seed 1)\n`;
    writeFileSync(path.join(outDir, "overview.mmd"), mmd);

    // also an embedded copy for humans
    let md = `# overview — whole component graph by layer\n\n`;
    md += `Composition edges (solid = component→component, dashed = component→hub). The `;
    md += `\`dock ⇄ dropdown-menu\` cycle + the un-\@imported orphan partials reproduce the DAG doc. `;
    md += `Commit \`${graph.commit}\`.\n\n\`\`\`mermaid\n${mmd}\`\`\`\n`;
    writeFileSync(path.join(outDir, "overview.md"), md);
}

function toComp(nodeId) {
    if (nodeId.startsWith("component:")) return nodeId;
    if (nodeId.startsWith("sfc:")) {
        const fam = nodeId.slice(4).split("/")[0];
        return `component:${fam}`;
    }
    return null;
}
function idSafe(id) {
    return id.replace(/[^A-Za-z0-9]/g, "_");
}

function renderDuplicationCandidates(graph, outDir) {
    let md = `# duplication-candidates — ranked pairs (INFER's primary input)\n\n`;
    md += `Component↔component pairs with composite \`S = 0.30·api + 0.30·dom + 0.15·style + 0.10·anim + 0.15·role_syn\` ≥ 0.15, `;
    md += `sorted descending. \`suggested-finding\` is a MECHANICAL clone-type hint from the sub-scores — NOT a verdict; `;
    md += `INFER adjudicates. \`current_disposition\` reflects a terminal ruling where one exists (the standing-ruling fence). `;
    md += `Commit \`${graph.commit}\`.\n\n`;
    md += `| pair | api | dom | style | anim | role | composite | superset | iso | disposition | suggested-finding |\n`;
    md += `|---|---|---|---|---|---|---|---|---|---|---|\n`;
    for (const d of graph.duplication_candidates) {
        const pair = `${d.a.replace("component:", "")} ↔ ${d.b.replace("component:", "")}`;
        md += `| ${pair} | ${f(d.sub.api)} | ${f(d.sub.dom)} | ${f(d.sub.style)} | ${f(d.sub.anim)} | ${f(d.sub.role_syn)} | **${f(d.composite)}** | ${d.api_superset || ""} | ${d.dom_isomorphic ? "✓" : ""} | ${d.current_disposition} | ${suggestFinding(d)} |\n`;
    }
    md += `\n_Total candidates: ${graph.duplication_candidates.length}._\n`;
    writeFileSync(path.join(outDir, "duplication-candidates.md"), md);
}

function f(n) { return n == null || n === 0 ? "" : n.toFixed(2); }

function suggestFinding(d) {
    // mechanical clone-type hint (§1.1 taxonomy), NOT a verdict.
    if (d.sub.api >= 0.85 && d.sub.dom >= 0.85) return "Type-1/2 near-duplicate (metrics)";
    if (d.dom_isomorphic && d.sub.style < 0.5) return "Type-2 isomorph, different skin";
    if (d.api_superset && d.sub.dom >= 0.6) return "Type-3 wrapper/superset";
    if (d.sub.role_syn >= 0.5 && d.sub.api < 0.6) return "Type-4 role-synonym (needs judge)";
    if (d.sub.dom >= 0.8) return "shared-substructure (topology)";
    return "weak — likely coincidental";
}
