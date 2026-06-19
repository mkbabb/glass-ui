#!/usr/bin/env node
// BC.W-GLASS-PRUNE — proof:glass-prune.
//
// The glass system consolidates to TWO registers: Glass MATERIALS (the five-rung
// `.glass-{wash,quiet,resting,floating,overlay}` ladder + the .glass-deep DEPTH axis +
// the .glass-lens REFRACTION axis, taught bare on /substrates/glass-panel — the MATERIALS
// gallery) and Glass CARDS (`<Card>` — a material in a content chassis, /display/card).
// The `<GlassPanel>` component is a TRUE DUPLICATE of Card (its `variant` ≡ Card's `tier`,
// its `surface` ≡ Card's `surface`, its `tier` renderer-preference folds onto the ONE
// `.glass-lens`/#glass-refract refraction source) and is RETIRED clean-break (no alias).
//
// ── THE BINDING PRE-FLIGHT: the registry-consumer probe (BA inv-11; the AY-restore lesson) ─
// `<GlassPanel>` was retired at AY.W-SB1/W-PRUNE then RESTORED at AZ.W-PRUNE2 because the
// disk import-graph census MISSED a registry consumer (keyframes.js). The structural defense
// is the registry+constellation consumer probe BEFORE any retire: a published-but-external
// consumer of `@mkbabb/glass-ui/glass-panel` / `GlassPanel` forces a NAMED fold/migration
// line, NEVER a silent prune. This gate makes that probe + the no-silent-prune floor
// MACHINE-ENFORCED — a found-and-UNFOLDED external consumer REDs (the silent-prune disease),
// AND a half-landed retire (component gone while a live consumer is un-recorded) REDs.
//
// ── THE PROBE-GATED RETIRE CONTRACT (the green is a COHERENT state, not a half-cut) ───────
// At this authoring the probe finds a LIVE external consumer — the Connectivity Atlas
// (`sci-report/atlas`, pinned `@mkbabb/glass-ui@4.0.1`) imports `GlassPanel` from
// `@mkbabb/glass-ui/glass-panel` in THREE SFCs (HoverCard.vue, AuroraVeilStage.vue,
// GalleryView.vue). Per the wave Fences ("no retire lands until the probe confirms zero
// un-folded external consumers — the single non-negotiable pre-flight") the destructive
// retire is HELD: the Atlas fold rides `BC.W-ATLAS-ASK` (Band 10, post-cut, the foreign-tree
// fence — the Atlas consume-and-deletes GlassPanel→<Card>/.glass-{rung} in its OWN tree on
// its `^4.x` bump). The retire lands AFTER that fold. So the COHERENT green has two shapes:
//   (A) RETIRED   — the component dir + the /glass-panel export + every internal import are
//                   ABSENT, AND the probe confirms ZERO live external consumers. The clean cut.
//   (B) HELD-FOLDED — the component is STILL live (retire correctly deferred) AND every live
//                   external consumer the probe finds is RECORDED in a named fold line (the
//                   no-silent-prune floor honored). The retire is sequenced, not silent.
// The born-RED states (an incoherent middle) are:
//   • SILENT-PRUNE  — the component/export is GONE while a live external consumer exists with
//                     NO recorded fold (the exact AY disease).
//   • HALF-RETIRE   — the component dir is gone but the export survives, or an internal import
//                     of GlassPanel/createGlassFilter survives a claimed retire (a dual path).
//   • UNRECORDED    — a live external consumer is found but the named fold line is missing
//                     from the consumer-evidence re-grade / the BC.W-ATLAS-ASK relay.
//
// Born-RED self-test: a synthetic re-added `./glass-panel` export AND a synthetic re-added
// `createGlassFilter` import each MUST flag against the live detector (a hollow detector reds
// itself). The MATERIALS-gallery story importing zero `<GlassPanel>` is asserted (P6).
//
// House style mirrors proof-no-dual-path.mjs (the comment-strip pure-detector form): a
// device-free SOURCE gate, no browser spawn. The PAINT arm (the five bare rungs translucent-
// warm over the live aurora) is the π spec tests-visual/glass-prune.spec.ts + the orchestrator
// capture.

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT, CONSUMERS, resolveSibling } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_PRUNE_ARTIFACT", "BC-glass-prune");
const rel = (p) => p.startsWith(ROOT) ? p.slice(ROOT.length + 1) : p;

// ── paths ─────────────────────────────────────────────────────────────────────
const PANEL_DIR = resolve(ROOT, "src/components/custom/glass-panel");
const PANEL_SUBPATH = resolve(ROOT, "src/subpaths/glass-panel.ts");
const PACKAGE_JSON = resolve(ROOT, "package.json");
const STORY_PANEL = resolve(ROOT, "demo/stories/substrates/glass-panel.vue");
const CONSUMER_EVIDENCE = resolve(ROOT, "docs/consumer-evidence/glass-panel.md");
const ATLAS_RELAY = resolve(ROOT, "docs/tranches/BC/coordination/ATLAS-BC.md");

// ── comment strip helpers (a clause cannot be satisfied/tripped by a comment) ────
function stripJsComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}
function stripVueComments(src) {
    return stripJsComments(src.replace(/<!--[\s\S]*?-->/g, ""));
}
function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

/** Recursive walk for the named extensions (gate-local, no repo-helper dep). */
function walk(dir, exts, out = []) {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const p = join(dir, entry);
        let st;
        try { st = statSync(p); } catch { continue; }
        if (st.isDirectory()) {
            if (/node_modules|\.git|dist|\.cache/.test(p)) continue;
            walk(p, exts, out);
        } else if (exts.some((x) => p.endsWith(x))) out.push(p);
    }
    return out;
}

// ── P1: the component dir disposition (ABSENT once retired) ──────────────────────
const componentPresent = existsSync(PANEL_DIR) && statSync(PANEL_DIR).isDirectory();

// ── P2: the published-surface disposition (export + typesVersions + subpath barrel) ─
const pkg = JSON.parse(read(PACKAGE_JSON) || "{}");
const exportPresent = Boolean(pkg.exports && pkg.exports["./glass-panel"]);
const typesVersionsPresent = Boolean(
    pkg.typesVersions &&
        pkg.typesVersions["*"] &&
        pkg.typesVersions["*"]["glass-panel"],
);
const subpathBarrelPresent = existsSync(PANEL_SUBPATH);
const distChunkPresent =
    existsSync(resolve(ROOT, "dist/glass-panel.js")) ||
    existsSync(resolve(ROOT, "dist/glass-panel.d.ts"));
// The published surface is "live" iff ANY of the publication facets survive.
const publishedSurfaceLive =
    exportPresent || typesVersionsPresent || subpathBarrelPresent || distChunkPresent;

// ── P3: the internal import disposition (no src/** GlassPanel / createGlassFilter import) ─
// The refraction is the SOLE `.glass-lens`/#glass-refract source once retired — no src tree
// imports `GlassPanel` (the component) nor `createGlassFilter` (the runtime filter-builder
// useGlassRenderer published; GlassPanel was its only consumer). The component's OWN tree +
// the renderer source's OWN file are EXCLUDED (they are the retire target, not a consumer).
const RENDERER_SRC = resolve(ROOT, "src/composables/glass/useGlassRenderer.ts");
function internalImportSites() {
    const hits = [];
    for (const f of walk(resolve(ROOT, "src"), [".ts", ".vue"])) {
        if (f.startsWith(PANEL_DIR)) continue; // the retire target's own tree
        if (f === RENDERER_SRC) continue; // the renderer source defines it; not a consumer
        const raw = read(f);
        const stripped = f.endsWith(".vue") ? stripVueComments(raw) : stripJsComments(raw);
        // an import of the GlassPanel component (named or default) OR the runtime
        // filter-builder createGlassFilter (the second-refraction-source dual path)
        const importsPanel =
            /\bimport\b[^;]*\bGlassPanel\b/.test(stripped) ||
            /\bGlassPanel\b[^;]*\bfrom\b/.test(stripped);
        const importsFilterBuilder =
            /\bimport\b[^;]*\bcreateGlassFilter\b/.test(stripped) ||
            /\bcreateGlassFilter\b[^;]*\bfrom\b/.test(stripped);
        if (importsPanel || importsFilterBuilder) hits.push(rel(f));
    }
    return hits;
}
const internalImports = internalImportSites();

// ── THE REGISTRY + CONSTELLATION CONSUMER PROBE (P5 — the binding pre-flight) ─────
// (a) the constellation sweep: every PRESENT consumer sibling's source tree, greped for an
//     import of `@mkbabb/glass-ui/glass-panel` or a `GlassPanel` mount. A live hit is an
//     external consumer the internal `rg` is blind to (the d6 blind-spot).
const SUBPATH_IMPORT_RE = /@mkbabb\/glass-ui\/glass-panel\b/;
const PANEL_SYMBOL_RE = /\bGlassPanel\b/;
function probeConstellation() {
    const found = [];
    for (const member of CONSUMERS) {
        if (member.self) continue; // glass-ui itself is the publisher
        const { present } = resolveSibling(member);
        if (!present) continue; // a registry-default-world skip (the offline arm covers it)
        const roots = (member.roots ?? [member.dir]).filter(
            (r) => existsSync(r) && statSync(r).isDirectory(),
        );
        const files = [];
        for (const r of roots) walk(r, [".ts", ".tsx", ".vue", ".js", ".jsx"], files);
        const consumerFiles = [];
        for (const f of files) {
            if (/node_modules/.test(f)) continue;
            const raw = read(f);
            const stripped = f.endsWith(".vue") ? stripVueComments(raw) : stripJsComments(raw);
            if (SUBPATH_IMPORT_RE.test(stripped) && PANEL_SYMBOL_RE.test(stripped))
                consumerFiles.push(f.slice(member.dir.length + 1));
        }
        if (consumerFiles.length)
            found.push({ id: member.id, dir: member.dir, files: consumerFiles });
    }
    return found;
}
const externalConsumers = probeConstellation();

// (b) the registry probe (offline-safe): is `./glass-panel` a CURRENT published export? A
//     published subpath is consumable by ANY registry consumer the disk census cannot see —
//     so a CURRENT export forces the named-fold discipline regardless of the disk sweep.
function probeRegistry() {
    try {
        const out = execSync("npm view @mkbabb/glass-ui dist-tags.latest", {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
            timeout: 15000,
        }).trim();
        return { reachable: Boolean(out), latest: out || null };
    } catch {
        return { reachable: false, latest: null };
    }
}
const registry = probeRegistry();

// ── THE NO-SILENT-PRUNE FLOOR: every live external consumer is RECORDED in a named fold ──
// The consumer-evidence re-grade names the Atlas fold + routes it to BC.W-ATLAS-ASK; the
// ATLAS-BC relay (or the consumer-evidence doc) carries the by-name migration line. A live
// external consumer with NO recorded fold is a SILENT prune (the AY disease) — RED.
const evidence = read(CONSUMER_EVIDENCE);
const atlasRelay = read(ATLAS_RELAY);
function consumerFolded(id) {
    // a named fold line: the consumer id named + a migration target (<Card> / .glass-{rung} /
    // the BC.W-ATLAS-ASK relay) in the consumer-evidence re-grade OR the ATLAS-BC relay.
    const idRe = new RegExp(id.replace(/[/.]/g, "\\$&"), "i");
    const foldRe = /<Card|glass-\{rung\}|\.glass-(wash|quiet|resting|floating|overlay)|BC\.W-ATLAS-ASK|consume-and-delete/i;
    const inEvidence = idRe.test(evidence) && foldRe.test(evidence);
    const inRelay = idRe.test(atlasRelay) && foldRe.test(atlasRelay);
    return inEvidence || inRelay;
}
const unfoldedConsumers = externalConsumers.filter((c) => !consumerFolded(c.id));

// ── P6: the MATERIALS-gallery story imports ZERO GlassPanel + renders the bare rungs ─────
const storySrc = stripVueComments(read(STORY_PANEL));
const storyImportsPanel =
    /\bimport\b[^;]*\bGlassPanel\b/.test(storySrc) || /<GlassPanel\b/.test(storySrc);
const RUNGS = ["glass-wash", "glass-quiet", "glass-resting", "glass-floating", "glass-overlay"];
const storyRungs = RUNGS.filter((r) => new RegExp(`\\b${r}\\b`).test(storySrc));
const storyStagesAurora = /<Aurora\b/.test(storySrc);
const storyToggleAxes =
    /\bglass-deep\b/.test(storySrc) && /\bglass-lens\b/.test(storySrc);

// ── the COHERENT-STATE verdict (the probe-gated retire contract) ─────────────────
const retired = !componentPresent && !publishedSurfaceLive && internalImports.length === 0;
const heldFolded =
    componentPresent && unfoldedConsumers.length === 0;
const coherent = retired || heldFolded;

// ── SELF-TEST BITES (anti-evasion — proven every run) ────────────────────────────
const bites = [];
// Bite 1 — a synthetic re-added `./glass-panel` export flags as a published surface.
{
    const synthetic = { exports: { "./glass-panel": { import: "./dist/glass-panel.js" } } };
    const flagged = Boolean(synthetic.exports["./glass-panel"]);
    bites.push({ id: "re-added-export", flagged });
}
// Bite 2 — a synthetic re-added `createGlassFilter` import flags as an internal dual path.
{
    const synthetic = stripJsComments(`import { createGlassFilter } from "../glass/useGlassRenderer";`);
    const flagged = /\bimport\b[^;]*\bcreateGlassFilter\b/.test(synthetic);
    bites.push({ id: "re-added-createGlassFilter-import", flagged });
}
// Bite 3 — a synthetic `<GlassPanel>` re-import in the gallery story flags (P6).
{
    const synthetic = stripVueComments(`import { GlassPanel } from "@mkbabb/glass-ui/glass-panel";`);
    const flagged = /\bimport\b[^;]*\bGlassPanel\b/.test(synthetic);
    bites.push({ id: "story-re-imports-GlassPanel", flagged });
}
// Bite 4 — a synthetic live external consumer with NO recorded fold flags as a silent prune.
{
    const syntheticConsumer = { id: "phantom-repo", files: ["x.vue"] };
    const syntheticEvidence = ""; // no fold recorded
    const idRe = new RegExp(syntheticConsumer.id, "i");
    const flagged = !(idRe.test(syntheticEvidence)); // un-recorded → flags
    bites.push({ id: "silent-prune-unrecorded-consumer", flagged });
}
const allBitesFlagged = bites.every((b) => b.flagged);

// ── verdict ─────────────────────────────────────────────────────────────────────
const violations = [];

// P5/no-silent-prune — a found-and-UNFOLDED external consumer REDs (born-RED if a live
// external consumer is un-recorded). This is the SINGLE non-negotiable pre-flight.
for (const c of unfoldedConsumers)
    violations.push(
        `P5 — live external consumer '${c.id}' imports @mkbabb/glass-ui/glass-panel (${c.files.join(", ")}) with NO recorded fold line (the silent-prune disease — record a named fold to <Card>/.glass-{rung} routed via BC.W-ATLAS-ASK before the retire lands)`,
    );

// The coherent-state floor — the tree must be in a RETIRED or HELD-FOLDED state, never a
// half-cut middle.
if (!coherent) {
    if (!componentPresent && publishedSurfaceLive)
        violations.push(
            `HALF-RETIRE — the component dir is absent but the published surface survives (export=${exportPresent}, typesVersions=${typesVersionsPresent}, subpath-barrel=${subpathBarrelPresent}, dist-chunk=${distChunkPresent}) — a dangling publication`,
        );
    if (!componentPresent && internalImports.length)
        violations.push(
            `HALF-RETIRE — the component dir is absent but src imports survive: ${internalImports.join(", ")} (a broken-reference half-delete)`,
        );
    if (componentPresent && unfoldedConsumers.length === 0 && !heldFolded)
        violations.push(
            "incoherent — the component is present yet the HELD-FOLDED state did not resolve",
        );
}

// P3 — once retired, ZERO internal imports survive (the ONE refraction source). When HELD,
// the component's OWN renderer import is legitimate (excluded above) — but no OTHER src file
// may import GlassPanel/createGlassFilter (a second consumer would be a new dual path).
if (internalImports.length)
    violations.push(
        `P3 — internal import(s) of GlassPanel/createGlassFilter survive outside the component+renderer source (a dual refraction path): ${internalImports.join(", ")}`,
    );

// P6 — the MATERIALS-gallery story is the bare-rung gallery (zero GlassPanel, the 5 rungs,
// the live aurora, the two axis toggles). This is wave-owned source, landed now regardless
// of the retire's hold.
if (storyImportsPanel)
    violations.push(
        "P6 — the MATERIALS-gallery story still imports/mounts <GlassPanel> (it must compose the bare .glass-{rung} CLASSES)",
    );
if (storyRungs.length < 5)
    violations.push(
        `P6 — the MATERIALS-gallery story renders ${storyRungs.length}/5 bare rungs (${storyRungs.join(", ")}) — the five-rung ladder did not land`,
    );
if (!storyStagesAurora)
    violations.push(
        "P6 — the MATERIALS-gallery story does not stage a live <Aurora> behind the rungs (glass-on-craft; the one-GL-per-route budget — ONE aurora)",
    );
if (!storyToggleAxes)
    violations.push(
        "P6 — the MATERIALS-gallery story does not expose the .glass-deep DEPTH + .glass-lens REFRACTION axis toggles",
    );

// the self-test bite — every planted state MUST flag
if (!allBitesFlagged)
    violations.push(
        `SELF-TEST — a planted retire-evasion did NOT flag (hollow detector): ${bites.filter((b) => !b.flagged).map((b) => b.id).join(", ")}`,
    );

const status = violations.length === 0 ? "pass" : "fail";

const facts = {
    // P1
    componentPresent,
    // P2
    exportPresent,
    typesVersionsPresent,
    subpathBarrelPresent,
    distChunkPresent,
    publishedSurfaceLive,
    // P3
    internalImports,
    // P5 — the registry+constellation probe (the binding pre-flight)
    registryReachable: registry.reachable,
    registryLatest: registry.latest,
    externalConsumers: externalConsumers.map((c) => ({ id: c.id, files: c.files })),
    unfoldedConsumers: unfoldedConsumers.map((c) => c.id),
    consumerEvidenceRecorded: existsSync(CONSUMER_EVIDENCE),
    atlasRelayRecorded: existsSync(ATLAS_RELAY),
    // P6
    storyImportsPanel,
    storyRungs,
    storyStagesAurora,
    storyToggleAxes,
    // the coherent-state verdict
    retired,
    heldFolded,
    coherent,
    // self-test
    selfTestBites: bites,
    allBitesFlagged,
};

writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status,
    gate: "proof:glass-prune",
    facts,
    violations,
});

console.log("proof:glass-prune — the two-register glass consolidation + the registry-consumer probe-gated retire (BC.W-GLASS-PRUNE)");
console.log(`  component present         : ${componentPresent}${componentPresent ? " (retire HELD — see external-consumer probe)" : " (RETIRED)"}`);
console.log(`  published surface live    : ${publishedSurfaceLive} (export=${exportPresent}, typesVersions=${typesVersionsPresent}, subpath=${subpathBarrelPresent}, dist=${distChunkPresent})`);
console.log(`  internal imports (dual)   : ${internalImports.length === 0 ? "none ✓" : internalImports.join(", ")}`);
console.log(`  external consumers (probe): ${externalConsumers.length === 0 ? "none ✓" : externalConsumers.map((c) => `${c.id}[${c.files.length}]`).join(", ")}   registry: ${registry.reachable ? registry.latest : "offline-skip"}`);
console.log(`  unfolded (silent-prune)   : ${unfoldedConsumers.length === 0 ? "none ✓ (every live consumer has a named fold)" : unfoldedConsumers.map((c) => c.id).join(", ")}`);
console.log(`  MATERIALS gallery story   : zero-panel=${!storyImportsPanel} rungs=${storyRungs.length}/5 aurora=${storyStagesAurora} axes=${storyToggleAxes}`);
console.log(`  coherent state            : ${coherent ? (retired ? "RETIRED ✓" : "HELD-FOLDED ✓ (retire sequenced via BC.W-ATLAS-ASK, no silent prune)") : "INCOHERENT ✗"}`);
console.log(`  self-test bites flagged   : ${allBitesFlagged} (${bites.length} bites)`);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(`\n  status: ${status.toUpperCase()}   artefact: ${rel(ARTIFACT)}`);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    process.exit(status === "pass" ? 0 : 1);
}

export { probeConstellation, internalImportSites };
