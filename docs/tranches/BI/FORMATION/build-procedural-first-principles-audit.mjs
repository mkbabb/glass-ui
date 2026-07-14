import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

import { SOURCE_BASE } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const json = (name) => JSON.parse(readFileSync(join(ROOT, name), "utf8"));
const git = (...args) => execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
const table = (headers, rows) => [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replaceAll("|", "\\|").replaceAll("\n", " ")).join(" | ")} |`),
].join("\n");

const consumer = json("component-consumer-assay.json");
const rendered = json("rendered-demo-audit.json");
const consumerById = new Map(consumer.concepts.map((row) => [row.conceptId, row]));
const renderedFindingById = new Map(rendered.findings.map((row) => [row.id, row]));
const renderedInteractionById = new Map(rendered.interactions.map((row) => [row.id, row]));
const renderedRows = Object.fromEntries(Object.entries(rendered.runs).map(([run, value]) => [run, new Map(value.rows.map((row) => [row.requestedPath, row]))]));

const sourceCache = new Map();
const source = (path) => {
    if (!sourceCache.has(path)) sourceCache.set(path, git("show", `${SOURCE_BASE}:${path}`));
    return sourceCache.get(path);
};
const witness = ({ path, needle }) => {
    const text = source(path);
    const lines = text.split("\n");
    const indexes = lines.flatMap((line, index) => line.includes(needle) ? [index] : []);
    if (indexes.length === 0) throw new Error(`${path}: missing witness ${JSON.stringify(needle)}`);
    const index = indexes[0];
    return {
        path,
        sourceBaseBlob: git("rev-parse", `${SOURCE_BASE}:${path}`).trim(),
        line: index + 1,
        lineSha256: sha(lines[index]),
        excerpt: lines[index].trim(),
        matchCount: indexes.length,
    };
};

const definitions = [
    {
        id: "PROC-000",
        conceptId: null,
        name: "Shared lifecycle, capability, color, and resource substrate",
        decision: "retain-and-collapse",
        model: "One scheduling/lifecycle owner; capability selection only for scenes whose work justifies more than one renderer; explicit attributed failure after commitment.",
        currentRenderer: "createGpuSubstrate selects WebGPU/WebGL2 for dual-engine scenes; useCanvas2D composes the same lifecycle for proportionate vector/raster scenes.",
        productResolution: "Keep one lifecycle and one capability policy, but do not turn WebGPU into a suite-wide quota. A scene earns each renderer from its math, instance count, public seams, and resource envelope.",
        sourceWitnessSpecs: [
            { path: "src/composables/glass/webgpu/useGpuSubstrate.ts", needle: "export function createGpuSubstrate" },
            { path: "src/composables/glass/webgl/createCanvasLifecycle.ts", needle: "export function createCanvasLifecycle" },
            { path: "src/composables/glass/canvas2d/useCanvas2D.ts", needle: "export function useCanvas2D" },
        ],
        liveRoutes: ["/substrates/aurora", "/substrates/blob", "/substrates/constellation", "/substrates/fourier-field", "/substrates/liquid-grid"],
        findingIds: ["RDA-004", "RDA-010", "RDA-017"],
        canonicalWaves: ["BI.W-P043", "BI.W-P044", "BI.W-P045", "BI.W-P052", "BI.W-P053", "BI.W-P054"],
        requiredStates: ["mount", "resize/DPR", "offscreen", "visibility", "PRM", "capability absence", "internal failure", "context loss", "teardown", "route budget"],
    },
    {
        id: "PROC-001",
        conceptId: "aurora",
        name: "Aurora",
        decision: "retain-dual-engine",
        model: "A painterly multi-nucleus OKLCh field whose medium, warp, palette, and pointer response remain recognizably one Aurora across WebGPU and WebGL2.",
        currentRenderer: "WebGPU/WebGL2 through createGpuSubstrate.",
        productResolution: "Retain both engines: the per-pixel field and medium pipeline justify GPU rendering. Make actual backend and attributed initialization failure visible; eliminate warning-bearing fire-and-forget ownership.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/aurora/composables/runtime.ts", needle: "createGpuSubstrate(canvas" },
            { path: "demo/stories/substrates/aurora.vue", needle: "A WebGPU-first procedural painterly gradient field" },
        ],
        liveRoutes: ["/substrates/aurora"],
        findingIds: ["RDA-004", "RDA-010", "RDA-011"],
        canonicalWaves: ["BI.W-P045", "BI.W-P046", "BI.W-P052", "BI.W-P053", "BI.W-P054"],
        requiredStates: ["default", "mediums", "image", "pointer", "dark", "narrow", "PRM", "webgpu", "webgl2", "injected failure", "teardown"],
    },
    {
        id: "PROC-002",
        conceptId: "blob",
        name: "Blob",
        decision: "retain-dual-engine",
        model: "One SDF/smooth-min gel body with satellites, mood, pointer response, and a legible lit material; action causality is semantic/numeric, not incidental pixel churn.",
        currentRenderer: "WebGPU/WebGL2 through createGpuSubstrate, despite WebGL2-only lead prose.",
        productResolution: "Retain the GPU pair for the per-pixel SDF. Correct public renderer truth, expose the selected engine, and give Poke/preset/fission explicit state readback and reset. When the SDF body itself is a press target, expose one named semantic control whose keyboard/touch/pointer paths share the same bounded pulse owner; decorative and aria-hidden Blob instances mount no operable hit layer.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/blob/composables/useMetaballRenderer.ts", needle: "canvasHandle = createGpuSubstrate(canvas" },
            { path: "demo/stories/manifest.ts", needle: "WebGL2 metaball droplet on the shared substrate" },
        ],
        liveRoutes: ["/substrates/blob"],
        findingIds: ["RDA-010", "RDA-011", "RDA-017", "RDA-031"],
        interactionIds: ["INT-024"],
        canonicalWaves: ["BI.W-P045", "BI.W-P047", "BI.W-P052", "BI.W-P053", "BI.W-P054", "BI.W-P059", "BI.W-P062"],
        requiredStates: ["calm", "merge", "satellites", "pointer", "poke", "keyboard press", "touch", "decorative", "PRM", "webgpu", "webgl2", "failure", "teardown"],
    },
    {
        id: "PROC-003",
        conceptId: "constellation",
        name: "Constellation",
        decision: "retain-single-canvas2d",
        model: "One seeded CPU proximity graph with bounded wells/warp/pin mechanics and an ordered consumer skin pass; graph scale and multi-instance use determine the renderer, not a WebGPU quota.",
        currentRenderer: "Current source uploads the CPU field to WebGPU/WebGL2; current route/docs claim Canvas2D; drawOverlay remains typed and demoed but is never invoked.",
        productResolution: "De-migrate to one Canvas2D renderer. The current 64-node CPU scan, five overlay bindings, seven direct instances, and route context budget make dual GPU upload/render paths strictly disproportionate. Restore drawOverlay and delete the GPU setup/bridge/shader fork. Then decide pointer well/warp from product semantics rather than leaving a decorative contradiction: decorative or aria-hidden instances delete the listener, pointer cursor, gravity-well prose, and warpOnClick default; any retained manipulation becomes a named keyboard/touch/pointer command with causal state through one warp owner.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/constellation/composables/useConstellation.ts", needle: "handle = createGpuSubstrate(canvas" },
            { path: "src/components/custom/constellation/Constellation.vue", needle: "`drawOverlay` seam is inert post-" },
            { path: "demo/stories/manifest.ts", needle: "A drifting proximity-graph lattice on the Canvas2D substrate" },
        ],
        liveRoutes: ["/substrates/constellation"],
        findingIds: ["RDA-010", "RDA-016", "RDA-017"],
        canonicalWaves: ["BI.W-P043", "BI.W-P044", "BI.W-P048", "BI.W-P052", "BI.W-P054", "BI.W-P062"],
        requiredStates: ["default", "density", "warp overlay", "pinned overlay", "decorative/no listener", "semantic pointer well when retained", "keyboard/touch parity", "multi-instance", "offscreen", "PRM", "canvas2d", "zero GPU contexts", "teardown"],
    },
    {
        id: "PROC-004",
        conceptId: "fourier-field",
        name: "Fourier Field",
        decision: "retain-dual-engine",
        model: "One DFT/epicycle reconstruction and head clock, with pure coefficient math feeding equivalent compute/render semantics and a causal scrub/config surface.",
        currentRenderer: "WebGPU compute/render primary plus WebGL2 fallback; live route says so, README and suite table still claim Canvas2D.",
        productResolution: "Retain the GPU pair: compute plus dense ribbon/field rendering is a justified renderer use. Delete retired Canvas2D/future-migration prose and expose actual backend identity.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/fourier-field/composables/useFourierField.ts", needle: "handle = createGpuSubstrate(canvas" },
            { path: "src/components/custom/fourier-field/README.md", needle: "A Fourier epicycle field on a Canvas2D surface" },
            { path: "demo/stories/substrates/fourier-field.vue", needle: "WebGPU-first, on the GPU substrate" },
        ],
        liveRoutes: ["/substrates/fourier-field"],
        findingIds: ["RDA-010", "RDA-011", "RDA-017"],
        canonicalWaves: ["BI.W-P045", "BI.W-P049", "BI.W-P052", "BI.W-P053", "BI.W-P054"],
        requiredStates: ["default", "ribbon", "config", "scrub", "resize", "PRM", "webgpu", "webgl2", "failure", "teardown"],
    },
    {
        id: "PROC-005",
        conceptId: "liquid-grid",
        name: "Liquid Grid",
        decision: "retain-dual-engine",
        model: "One derivative-AA grid evaluated after a smooth curl/affine sheet deformation, with semantic color and bounded pointer bulge.",
        currentRenderer: "WebGPU/WebGL2 through createGpuSubstrate; the live route truthfully describes WebGPU-first but exposes no runtime-derived backend identity.",
        productResolution: "Retain both fullscreen fragment paths, collapse setup/bridge duplication, expose selected engine/failure, and prove the same grid/curl semantics rather than screenshot sameness.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/liquid-grid/composables/useLiquidGrid.ts", needle: "handle = createGpuSubstrate(canvas" },
            { path: "demo/stories/manifest.ts", needle: "A WebGPU-first liquid AA-grid" },
        ],
        liveRoutes: ["/substrates/liquid-grid"],
        findingIds: ["RDA-010"],
        canonicalWaves: ["BI.W-P045", "BI.W-P050", "BI.W-P052", "BI.W-P053", "BI.W-P054"],
        requiredStates: ["default", "density", "warp", "pointer", "dark", "narrow", "PRM", "webgpu", "webgl2", "failure", "teardown"],
    },
    {
        id: "PROC-006",
        conceptId: "handmark",
        name: "HandMark",
        decision: "retain-svg",
        model: "Real selectable text with a deterministic, namespaced SVG mark whose geometry, medium, blend, draw-on, and boil remain legible and semantically absent under PRM.",
        currentRenderer: "DOM/SVG plus CSS compositor motion; no drawing context is warranted.",
        productResolution: "Retain as the hand-voice primitive. Consolidate underline/circle/strike/highlight/path into one shape/brush model and prove baseline, blend, replay, seeded morphology, PRM, and multi-instance ID isolation.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/handmark/HandMark.vue", needle: "const uid = `hm-${useId()" },
            { path: "demo/stories/motion/handmark.vue", needle: "Replay draw" },
        ],
        liveRoutes: ["/motion/handmark"],
        findingIds: [],
        canonicalWaves: ["BI.W-P051", "BI.W-P061"],
        requiredStates: ["underline", "circle", "strike", "highlight", "custom path", "draw replay", "boil", "multi-instance", "narrow", "PRM"],
    },
    {
        id: "PROC-007",
        conceptId: "watercolor-dot",
        name: "Watercolor Dot",
        decision: "retain-svg-css",
        model: "A cheap seeded decorative mark whose solid/ghost silhouettes share one geometry and whose per-instance wet-edge filter is namespaced and static under animation.",
        currentRenderer: "CSS shape/compositor plus SVG filter; deliberately zero Canvas/WebGPU/WebGL contexts.",
        productResolution: "Retain as the suite's explicit non-GPU counterexample. Prove same-seed silhouette identity, unique filter IDs, Safari-static filter raster, compositor-only motion, ghost legibility, and complete unmount cleanup.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/watercolor-dot/WatercolorDot.vue", needle: "const filterId = `watercolor-filter-${useId()" },
            { path: "src/components/custom/watercolor-dot/WatercolorDot.vue", needle: "no WebGL/WebGPU/Canvas2D" },
        ],
        liveRoutes: ["/foundations/colors", "/substrates/blob"],
        findingIds: [],
        canonicalWaves: ["BI.W-P051", "BI.W-P054"],
        requiredStates: ["solid", "ghost", "same seed", "different seed", "multi-instance", "hover", "animated", "PRM", "Safari", "teardown"],
    },
    {
        id: "PROC-008",
        conceptId: "goo-filter",
        name: "Goo filter facilities",
        decision: "rehome-private",
        model: "An SVG URL resource belongs to the smallest component/demo that owns its geometry and lifetime; document-global filter IDs are not a library facility.",
        currentRenderer: "One shell-root SVG exports five global IDs, although current runtime use is limited to PagerDots and Deck while three IDs are dead.",
        productResolution: "Delete the public/global GooFilter, dead IDs, Dock re-export, and AppShell mount. PagerDots owns a per-instance namespaced worm filter/clipPath; Deck owns its private filter and geometry next to the sole demo consumer.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/goo-filter/GooFilter.vue", needle: "const LIBRARY_IDS" },
            { path: "demo/shell/AppShell.vue", needle: "<GooFilter />" },
            { path: "src/components/custom/pager-dots/PagerDots.vue", needle: "#pager-worm-goo" },
        ],
        liveRoutes: ["/navigation/carousel", "/motion/deck"],
        findingIds: ["RDA-015"],
        canonicalWaves: ["BI.W-P118", "BI.W-P121"],
        requiredStates: ["two instances", "four instances", "stable rerender ID", "fresh mount ID", "unmount", "Safari filter", "Chrome filter", "no shell global", "no dead IDs"],
    },
];

const rows = definitions.map((definition) => {
    const consumerRow = definition.conceptId ? consumerById.get(definition.conceptId) : null;
    if (definition.conceptId && !consumerRow) throw new Error(`${definition.id}: missing component-consumer row ${definition.conceptId}`);
    if (consumerRow && consumerRow.decision !== definition.decision.replace("retain-dual-engine", "retain").replace("retain-single-canvas2d", "retain").replace("retain-svg-css", "retain").replace("retain-svg", "retain")) {
        throw new Error(`${definition.id}: decision mismatch ${definition.decision} vs ${consumerRow.decision}`);
    }
    const liveEvidence = definition.liveRoutes.map((route) => {
        const desktop = renderedRows.desktop.get(route);
        const mobile = renderedRows.mobile.get(route);
        if (!desktop || !mobile || desktop.redirected || mobile.redirected) throw new Error(`${definition.id}: route ${route} lacks direct desktop/mobile rendered evidence`);
        return {
            route,
            desktop: { canvases: desktop.counts.canvases, svgs: desktop.counts.svgs, sections: desktop.counts.section, visibleInteractives: desktop.counts.visibleInteractives, screenshotSha256: desktop.screenshot.sha256 },
            mobile: { canvases: mobile.counts.canvases, svgs: mobile.counts.svgs, sections: mobile.counts.section, visibleInteractives: mobile.counts.visibleInteractives, screenshotSha256: mobile.screenshot.sha256 },
        };
    });
    const findings = definition.findingIds.map((id) => {
        const finding = renderedFindingById.get(id);
        if (!finding) throw new Error(`${definition.id}: missing rendered finding ${id}`);
        return { id, status: finding.status, finding: finding.finding };
    });
    const interactionIds = definition.interactionIds ?? [];
    const interactions = interactionIds.map((id) => {
        const interaction = renderedInteractionById.get(id);
        if (!interaction) throw new Error(`${definition.id}: missing rendered interaction ${id}`);
        return { id, route: interaction.route, observation: interaction.observation, values: interaction.values };
    });
    return {
        ...definition,
        interactionIds,
        sourceWitnessSpecs: undefined,
        sourceWitnesses: definition.sourceWitnessSpecs.map(witness),
        consumerEvidence: consumerRow ? {
            decision: consumerRow.decision,
            externalImportClauseCount: consumerRow.externalImportClauseCount,
            externalRepositories: consumerRow.externalRepositories,
            currentFirstPartyDemos: consumerRow.currentFirstPartyDemos,
            canonicalWaves: consumerRow.canonicalWaves,
        } : null,
        liveEvidence,
        findings,
        interactions,
        evidenceCredit: "FORMATION_RESEARCH_ONLY__NOT_EXECUTION__NOT_NATIVE_PI",
    };
});

const output = {
    schemaVersion: "1.0.0",
    sourceBase: SOURCE_BASE,
    generatedAt: "2026-07-14",
    status: "FORMATION_RESEARCH_ONLY",
    method: "First-principles model and proportionate-renderer decision reconciled against exact source reachability, exact component-consumer evidence, and bound desktop/mobile direct-route demos.",
    rowCount: rows.length,
    componentRows: rows.filter((row) => row.conceptId).length,
    sourceWitnessCount: rows.reduce((sum, row) => sum + row.sourceWitnesses.length, 0),
    liveRouteCount: new Set(rows.flatMap((row) => row.liveRoutes)).size,
    rows,
};
writeFileSync(join(ROOT, "procedural-first-principles-audit.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Procedural systems from first principles and actual demos\n\n` +
    `**Status:** formation research only; no implementation, native Safari/Chrome π, release, or execution credit\n` +
    `**Bound source:** \`${SOURCE_BASE}\`\n` +
    `**Rows:** ${output.rowCount} (${output.componentRows} component concepts + shared substrate)\n` +
    `**Exact source witnesses:** ${output.sourceWitnessCount}\n` +
    `**Distinct direct demo routes:** ${output.liveRouteCount}\n\n` +
    `## Governing decision\n\n` +
    `Renderer uniformity is not a product principle. One lifecycle, explicit failure, semantic color, bounded resources, and honest demos are principles; a scene earns WebGPU/WebGL2, Canvas2D, SVG, or CSS from its math, instance count, public composition seams, and measured envelope. This removes both forms of theater: forcing every visualization onto WebGPU and retaining a GPU path merely because a gate once named parity.\n\n` +
    table(["ID", "system", "decision", "current reachable renderer", "first-principles resolution", "actual direct demos", "current findings", "owners"], rows.map((row) => [
        row.id,
        row.name,
        row.decision,
        row.currentRenderer,
        row.productResolution,
        row.liveRoutes.join(", "),
        row.findingIds.join(", ") || "no current RED finding; execution evidence still pending",
        row.canonicalWaves.join(", "),
    ])) + `\n\n` +
    rows.map((row) => `## ${row.id} — ${row.name}\n\n` +
        `**Product model:** ${row.model}\n\n` +
        `**Resolution:** ${row.productResolution}\n\n` +
        `**Required live states:** ${row.requiredStates.join(", ")}\n\n` +
        `**Bound source witnesses:**\n\n${row.sourceWitnesses.map((item) => `- \`${item.path}:${item.line}\` · blob \`${item.sourceBaseBlob}\` · line sha256 \`${item.lineSha256}\` · ${item.excerpt}`).join("\n")}\n\n` +
        `**Bound rendered routes:**\n\n${row.liveEvidence.map((item) => `- \`${item.route}\` · desktop ${item.desktop.canvases} canvas / ${item.desktop.svgs} SVG / ${item.desktop.visibleInteractives} visible controls · mobile ${item.mobile.canvases} canvas / ${item.mobile.svgs} SVG / ${item.mobile.visibleInteractives} visible controls`).join("\n")}\n`).join("\n") +
    `\n## Credit boundary\n\nThese direct-route screenshots and interactions prove that a current demo was actually rendered and inspected. They do not prove native Safari, native Chrome, Metal, backend parity, resource teardown, performance, PRM, or product acceptance. Each owner wave must produce those exact causal receipts on its landed bytes.\n`;
writeFileSync(join(ROOT, "PROCEDURAL-FIRST-PRINCIPLES-AUDIT.md"), md);

console.log(JSON.stringify({
    ok: true,
    rows: output.rowCount,
    componentRows: output.componentRows,
    sourceWitnesses: output.sourceWitnessCount,
    directRoutes: output.liveRouteCount,
}, null, 2));
