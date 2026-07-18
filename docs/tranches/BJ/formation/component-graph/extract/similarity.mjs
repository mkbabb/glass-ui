// similarity.mjs — the five computed similarity edge types + composite duplication
// score (PROCESS.md §3b.2-6 + composite). All undirected, weighted [0,1], rounded
// to 4 dp, canonically sorted. Thresholds match §3b; raw scores emitted on every
// edge so INFER can re-threshold without a re-run.
import { jaccard, round, csort } from "./util.mjs";

const TH = {
    api_candidate: 0.6, api_near: 0.85,
    dom: 0.8,
    style: 0.5, anim: 0.5,
    role_afford: 0.5,
};

// ── decided-disposition overlay (standing-ruling fence) ──────────
// current_disposition annotations from the terminal rulings, for the ranked table.
const DISPOSITIONS = {
    "component:liquid-grid": { d: "DELETE", src: "ADJUDICATION-1 R1" },
    "component:configurator": { d: "DEMO-PRIVATIZE", src: "FABLE-DAG §2 / A8" },
    "component:data-table": { d: "ASK", src: "ASK-REDUCTION B1" },
    "component:easing-picker": { d: "ASK", src: "ASK-REDUCTION B4" },
    "component:easing-configurator": { d: "ASK", src: "ASK-REDUCTION B4" },
    "component:header-ribbon": { d: "KEEP", src: "round-2 refuted-delete" },
    "component:deck": { d: "KEEP-ENGINE", src: "ASK C1" },
    "component:carousel": { d: "KEEP", src: "ASK C1" },
    "component:completion-seal": { d: "ASK", src: "CHRONIC-ADJUDICATION R14" },
};

function apiSignatureTokens(api) {
    // union of prop-name, emit-name, slot-name, with a name→type map for the
    // type-compatible boost.
    const names = [];
    const typeByProp = new Map();
    for (const p of api.props) { names.push(`prop:${p.name}`); typeByProp.set(p.name, p.type); }
    for (const e of api.emits) names.push(`emit:${e}`);
    for (const s of api.slots) names.push(`slot:${s}`);
    return { set: new Set(names), typeByProp, props: api.props };
}

function apiSimilarity(a, b) {
    // weighted Jaccard: type-compatible prop pair 1.0, name-only 0.7 (§3b.2)
    const A = apiSignatureTokens(a), B = apiSignatureTokens(b);
    const union = new Set([...A.set, ...B.set]);
    if (union.size === 0) return { score: 0, superset: null };
    let matchWeight = 0;
    for (const tok of A.set) {
        if (!B.set.has(tok)) continue;
        if (tok.startsWith("prop:")) {
            const name = tok.slice(5);
            const ta = A.typeByProp.get(name), tb = B.typeByProp.get(name);
            matchWeight += ta && tb && ta === tb ? 1.0 : 0.7;
        } else matchWeight += 1.0;
    }
    const score = matchWeight / union.size;
    // superset relation on prop names (Type-3 wrapper signal)
    const pa = new Set(a.props.map((p) => p.name));
    const pb = new Set(b.props.map((p) => p.name));
    let superset = null;
    if (pa.size && pb.size) {
        const aSupB = [...pb].every((x) => pa.has(x)) && pa.size > pb.size;
        const bSupA = [...pa].every((x) => pb.has(x)) && pb.size > pa.size;
        if (aSupB) superset = "a⊇b";
        else if (bSupA) superset = "b⊇a";
    }
    return { score, superset };
}

// ── Zhang-Shasha tree edit distance over tag-only trees ──────────
function parseShape(str) {
    // inverse of serializeShape: "tag(a,b(c))" → tree
    let i = 0;
    function node() {
        let tag = "";
        while (i < str.length && !"(),".includes(str[i])) tag += str[i++];
        const children = [];
        if (str[i] === "(") {
            i++; // consume (
            while (str[i] !== ")") {
                children.push(node());
                if (str[i] === ",") i++;
            }
            i++; // consume )
        }
        return { tag, children };
    }
    return str ? node() : null;
}

function postorder(root) {
    // returns {labels:[], lmld:[] (leftmost-leaf descendant index), keyroots:[]}
    const labels = [], lmld = [];
    function trav(n) {
        let leftmost = null;
        const childIdx = [];
        for (const c of n.children) { const idx = trav(c); childIdx.push(idx); if (leftmost === null) leftmost = lmld[idx]; }
        labels.push(n.tag);
        const self = labels.length - 1;
        lmld.push(leftmost === null ? self : leftmost);
        return self;
    }
    trav(root);
    // keyroots
    const seen = new Set();
    const keyroots = [];
    for (let i = labels.length - 1; i >= 0; i--) {
        if (!seen.has(lmld[i])) { keyroots.push(i); seen.add(lmld[i]); }
    }
    keyroots.sort((a, b) => a - b);
    return { labels, lmld, keyroots };
}

function ted(treeA, treeB) {
    const A = postorder(treeA), B = postorder(treeB);
    const n = A.labels.length, m = B.labels.length;
    const TD = Array.from({ length: n }, () => new Array(m).fill(0));
    for (const ki of A.keyroots) {
        for (const kj of B.keyroots) {
            const li = A.lmld[ki], lj = B.lmld[kj];
            const rows = ki - li + 2, cols = kj - lj + 2;
            const fd = Array.from({ length: rows }, () => new Array(cols).fill(0));
            for (let x = 1; x < rows; x++) fd[x][0] = fd[x - 1][0] + 1;
            for (let y = 1; y < cols; y++) fd[0][y] = fd[0][y - 1] + 1;
            for (let x = 1; x < rows; x++) {
                for (let y = 1; y < cols; y++) {
                    const i = li + x - 1, j = lj + y - 1;
                    const cost = A.labels[i] === B.labels[j] ? 0 : 1;
                    if (A.lmld[i] === li && B.lmld[j] === lj) {
                        fd[x][y] = Math.min(fd[x - 1][y] + 1, fd[x][y - 1] + 1, fd[x - 1][y - 1] + cost);
                        TD[i][j] = fd[x][y];
                    } else {
                        const p = A.lmld[i] - li, q = B.lmld[j] - lj;
                        fd[x][y] = Math.min(fd[x - 1][y] + 1, fd[x][y - 1] + 1, fd[p][q] + TD[i][j]);
                    }
                }
            }
        }
    }
    return TD[n - 1][m - 1];
}

function domSim(shapeA, shapeB, hashA, hashB, countA, countB) {
    if (hashA && hashA === hashB) return { score: 1, isomorphic: true };
    if (!shapeA || !shapeB) return { score: 0, isomorphic: false };
    // prune: only run TED when trees are size-compatible (bounds cost)
    const big = Math.max(countA, countB), small = Math.min(countA, countB);
    if (big > 140 || big / Math.max(small, 1) > 3) return { score: 0, isomorphic: false };
    const ta = parseShape(shapeA), tb = parseShape(shapeB);
    const d = ted(ta, tb);
    const score = 1 - d / Math.max(countA, countB);
    return { score, isomorphic: false };
}

// ── the composite ────────────────────────────────────────────────
function composite(sub) {
    return 0.30 * sub.api + 0.30 * sub.dom + 0.15 * sub.style + 0.10 * sub.anim + 0.15 * sub.role_syn;
}

export function computeSimilarityEdges(ctx) {
    const { compNodeRecords, sfcNodeRecords, sfcFeatures, sfcNodes } = ctx;
    const edges = [];
    const counts = { api_similarity: 0, dom_topology_similarity: 0, style_kinship: 0, animation_kinship: 0, role_synonymy: 0 };

    // composition adjacency (to exclude wrapper pairs from role_synonymy)
    const composed = new Set();
    for (const e of ctx.compositionEdges) composed.add(`${famOf(e.from)}|${famOf(e.to)}`);
    function connectedFams(fa, fb) {
        return composed.has(`${fa}|${fb}`) || composed.has(`${fb}|${fa}`);
    }

    // ── component×component: api, style, anim, role_synonymy, composite ──
    const comps = compNodeRecords;
    const styleTokens = (n) => [
        ...n.style_consumption.utility_classes,
        ...n.style_consumption.custom_props_read,
        ...n.style_consumption.custom_props_written,
        ...n.style_consumption.resolved_partials,
        ...n.style_consumption.data_hooks,
    ];
    const animTokens = (n) => [
        ...n.animation_register.spring_presets,
        ...n.animation_register.motion_composables,
        ...n.animation_register.keyframes,
        ...n.animation_register.transitions,
    ];
    const affordTokens = (n) => [
        ...n.affordance_register.handlers,
        ...n.affordance_register.aria,
        ...n.affordance_register.reka_primitive,
        ...(n.affordance_register.role ? [`role:${n.affordance_register.role}`] : []),
        ...(n.affordance_register.focus_ring ? ["focus-ring"] : []),
        ...(n.affordance_register.tap_squish ? ["tap-squish"] : []),
        ...(n.affordance_register.drag ? ["drag"] : []),
    ];

    // root sfc shape lookup per component
    const rootShape = new Map();
    const sfcById = new Map(sfcNodeRecords.map((s) => [s.id, s]));
    for (const c of comps) {
        const rootRel = ctx.rootRelById.get(c.id);
        const sfcId = rootRel ? `sfc:${rootRel.replace(/^components\//, "")}` : null;
        const sfc = sfcId ? sfcById.get(sfcId) : null;
        rootShape.set(c.id, sfc?.dom_topology || null);
    }

    const dupCandidates = [];
    for (let i = 0; i < comps.length; i++) {
        for (let j = i + 1; j < comps.length; j++) {
            const A = comps[i], B = comps[j];
            const apiR = apiSimilarity(A.api_signature, B.api_signature);
            const styleJ = jaccard(styleTokens(A), styleTokens(B));
            const animJ = jaccard(animTokens(A), animTokens(B));
            const affordJ = jaccard(affordTokens(A), affordTokens(B));
            const da = rootShape.get(A.id), db = rootShape.get(B.id);
            const dom = da && db ? domSim(da.shape_string, db.shape_string, da.shape_hash, db.shape_hash, da.node_count, db.node_count) : { score: 0, isomorphic: false };

            // emit edges above thresholds
            if (apiR.score >= TH.api_candidate) {
                edges.push({ type: "api_similarity", a: A.id, b: B.id, score: round(apiR.score), api_superset: apiR.superset });
                counts.api_similarity++;
            }
            if (styleJ >= TH.style) {
                edges.push({ type: "style_kinship", a: A.id, b: B.id, score: round(styleJ) });
                counts.style_kinship++;
            }
            if (animJ >= TH.anim) {
                edges.push({ type: "animation_kinship", a: A.id, b: B.id, score: round(animJ) });
                counts.animation_kinship++;
            }
            // role_synonymy: equal role AND affordJ>=0.5 AND not composition-connected
            let roleSyn = 0;
            if (A.role && A.role === B.role && affordJ >= TH.role_afford && !connectedFams(A.family_id, B.family_id)) {
                roleSyn = affordJ;
                edges.push({ type: "role_synonymy", a: A.id, b: B.id, score: round(roleSyn) });
                counts.role_synonymy++;
            }

            const sub = { api: round(apiR.score), dom: round(dom.score), style: round(styleJ), anim: round(animJ), role_syn: round(roleSyn) };
            const comp = composite(sub);
            if (comp >= 0.15) {
                const disp = DISPOSITIONS[A.id] || DISPOSITIONS[B.id] || null;
                dupCandidates.push({
                    a: A.id, b: B.id, composite: round(comp), sub,
                    api_superset: apiR.superset,
                    dom_isomorphic: dom.isomorphic,
                    current_disposition: disp ? disp.d : "none",
                    disposition_source: disp ? disp.src : "none",
                });
            }
        }
    }

    // ── sfc×sfc: dom_topology_similarity (isomorphism + shared substructure) ──
    const sfcs = sfcNodeRecords.filter((s) => !s.dom_topology.template_empty && s.dom_topology.node_count > 0);
    // bucket by hash for exact isomorphs (cheap), then TED for near pairs
    for (let i = 0; i < sfcs.length; i++) {
        for (let j = i + 1; j < sfcs.length; j++) {
            const A = sfcs[i], B = sfcs[j];
            const da = A.dom_topology, db = B.dom_topology;
            const r = domSim(da.shape_string, db.shape_string, da.shape_hash, db.shape_hash, da.node_count, db.node_count);
            if (r.isomorphic || r.score >= TH.dom) {
                edges.push({ type: "dom_topology_similarity", a: A.id, b: B.id, score: round(r.score), isomorphic: r.isomorphic });
                counts.dom_topology_similarity++;
            }
        }
    }

    edges.sort(edgeSort);
    dupCandidates.sort((x, y) => y.composite - x.composite || (x.a < y.a ? -1 : x.a > y.a ? 1 : x.b < y.b ? -1 : 1));

    return { edges, counts, duplicationCandidates: dupCandidates };
}

function famOf(nodeId) {
    // component:foo | sfc:foo/Bar.vue | composable:x | style:x
    if (nodeId.startsWith("sfc:")) return nodeId.slice(4).split("/")[0];
    if (nodeId.startsWith("component:")) return nodeId.slice(10).split("/")[0];
    return nodeId;
}

function edgeSort(a, b) {
    const ta = a.type, tb = b.type;
    if (ta !== tb) return ta < tb ? -1 : 1;
    const ka = a.from ?? a.a, kb = b.from ?? b.a;
    if (ka !== kb) return ka < kb ? -1 : 1;
    const la = a.to ?? a.b, lb = b.to ?? b.b;
    return la < lb ? -1 : la > lb ? 1 : 0;
}
