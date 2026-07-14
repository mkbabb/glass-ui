import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
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

const sourceCache = new Map();
const sourceLines = (path) => {
    if (!sourceCache.has(path)) sourceCache.set(path, git("show", `${SOURCE_BASE}:${path}`).split("\n"));
    return sourceCache.get(path);
};
const oneIndex = (lines, needle, path, after = 0) => {
    const matches = lines.flatMap((line, index) => index >= after && line.includes(needle) ? [index] : []);
    if (matches.length !== 1) throw new Error(`${path}: expected one occurrence of ${JSON.stringify(needle)} after ${after + 1}, found ${matches.length}`);
    return matches[0];
};
const firstIndex = (lines, needle, path, after) => {
    const index = lines.findIndex((line, lineIndex) => lineIndex >= after && line.includes(needle));
    if (index === -1) throw new Error(`${path}: missing end occurrence of ${JSON.stringify(needle)} after ${after + 1}`);
    return index;
};
const witness = ({ path, start, endExclusive = null }) => {
    const lines = sourceLines(path);
    const startIndex = oneIndex(lines, start, path);
    const endIndex = endExclusive ? firstIndex(lines, endExclusive, path, startIndex + 1) : startIndex + 1;
    if (endIndex <= startIndex) throw new Error(`${path}: invalid witness range ${start} → ${endExclusive}`);
    const text = lines.slice(startIndex, endIndex).join("\n");
    return {
        path,
        sourceBaseBlob: git("rev-parse", `${SOURCE_BASE}:${path}`).trim(),
        lineStart: startIndex + 1,
        lineEnd: endIndex,
        excerptSha256: sha(text),
        excerpt: text,
    };
};

const rendered = json("rendered-demo-audit.json");
const renderedById = new Map(rendered.findings.map((row) => [row.id, row]));
const legacy = json("legacy-gate-dispositions.json");
const legacyById = new Map(legacy.rows.map((row) => [row.legacyId, row]));
const consumerAssay = json("component-consumer-assay.json");

const runLiveProbe = ({ script, expectedExitCode, needles }) => {
    const result = spawnSync(process.execPath, [join(REPO, script)], {
        cwd: REPO,
        encoding: "utf8",
        env: { ...process.env, GATE_SNAPSHOT: "0" },
        maxBuffer: 128 * 1024 * 1024,
    });
    if (result.error) throw result.error;
    if (result.status !== expectedExitCode) {
        throw new Error(`${script}: expected probe exit ${expectedExitCode}, observed ${result.status}`);
    }
    const stdout = result.stdout ?? "";
    const stderr = result.stderr ?? "";
    const lines = `${stdout}\n${stderr}`.split("\n").map((line) => line.trim()).filter(Boolean);
    const observedLines = needles.map((needle) => {
        const matches = lines.filter((line) => line.includes(needle));
        if (matches.length !== 1) throw new Error(`${script}: expected one live-probe line containing ${JSON.stringify(needle)}, found ${matches.length}`);
        return matches[0];
    });
    return {
        sourceBase: SOURCE_BASE,
        repoHead: git("rev-parse", "HEAD").trim(),
        script,
        scriptBlob: git("rev-parse", `${SOURCE_BASE}:${script}`).trim(),
        command: `node ${script}`,
        exitCode: result.status,
        signal: result.signal,
        stdoutSha256: sha(stdout),
        stderrSha256: sha(stderr),
        observedLines,
    };
};

const productPath = (path) => {
    const segments = path.split("/");
    if (segments.some((segment) => segment === "docs" || segment === "scripts" || segment === "test" || segment === "tests" || segment === "coverage" || segment === "node_modules" || /^dist(?:-|$)/.test(segment))) return false;
    if (path.startsWith("demo/capture/")) return false;
    if (/(?:^|\/)(?:package-lock\.json|pnpm-lock\.yaml|yarn\.lock)$/.test(path)) return false;
    return true;
};

const externalDemandCensus = (terms) => consumerAssay.repositories.map((repository) => {
    const termRows = terms.map((term) => {
        const result = spawnSync("git", ["-C", repository.path, "grep", "-l", "-F", "--", term, repository.head, "--", "."], {
            encoding: "utf8",
            maxBuffer: 128 * 1024 * 1024,
        });
        if (result.error) throw result.error;
        if (![0, 1].includes(result.status)) throw new Error(`${repository.repository}: git grep failed for ${term} with ${result.status}: ${result.stderr}`);
        const prefix = `${repository.head}:`;
        const trackedMatches = (result.stdout ?? "").split("\n").filter(Boolean).map((line) => line.startsWith(prefix) ? line.slice(prefix.length) : line);
        return { term, trackedMatches, productMatches: trackedMatches.filter(productPath) };
    });
    return {
        repository: repository.repository,
        path: repository.path,
        head: repository.head,
        tree: repository.tree,
        terms: termRows,
    };
});

const definitions = [
    {
        id: "GCA-001",
        classification: "FALSE_ORACLE",
        title: "The demo gate requires the compatibility surface that clean-break must delete.",
        legacyGateIds: ["proof:demo"],
        rdaFindingIds: ["RDA-001"],
        witnessSpecs: [
            { path: "scripts/proof-demo.mjs", start: "    // HD2 — the demoted deep-link resolves", endExclusive: "    // FR3 —" },
        ],
        rewardedState: "A retired deep link remains reachable through RELOCATED_STORY_ROUTES or FOLDED_MEMBER_FAMILY, and every folded member gains a derived redirect.",
        currentContradiction: "The current browser census observed 22 folded redirects plus six relocated redirects. The user requires a clean break with no alias, shim, compatibility, or migration route.",
        canonicalWaves: ["BI.W-P056", "BI.W-P057"],
        replacementPredicate: "FOLDED_STORY_IDS, FOLDED_MEMBER_FAMILY, RELOCATED_STORY_ROUTES, and every redirect-registration loop are definition-absent; retained stories resolve directly; each retired/unknown path reaches the semantic not-found owner without intermediate compatibility state.",
        negativeControl: "Re-add one folded-member redirect or relocated route and require architecture.clean-break plus demo.scenario-contract to RED.",
    },
    {
        id: "GCA-002",
        classification: "SHALLOW_ORACLE",
        title: "Catch-all source presence is accepted as 404 correctness.",
        legacyGateIds: ["proof:demo"],
        rdaFindingIds: ["RDA-002"],
        witnessSpecs: [
            { path: "scripts/proof-demo.mjs", start: "    // FR3 — the catch-all is preserved", endExclusive: "    return { facts, violations };" },
        ],
        rewardedState: "The router source merely contains :pathMatch(.*)*; the gate does not render the route, inspect heading/landmark/recovery semantics, or distinguish a direct not-found owner from a redirecting compatibility path.",
        currentContradiction: "The actual unknown-route capture rendered body content but zero h1 elements. A catch-all regex proves neither semantic heading, recovery action, landmark ownership, nor absence of redirect behavior.",
        canonicalWaves: ["BI.W-P056", "BI.W-P062"],
        replacementPredicate: "The named unknown-route negative control renders one visible h1 identifying not-found/404, one reachable recovery action, correct main semantics, direct URL ownership, and no redirect in wide/fine and narrow/coarse browser projects.",
        negativeControl: "Remove the h1 while preserving the catch-all route and require demo.scenario-contract to RED.",
    },
    {
        id: "GCA-003",
        classification: "FALSE_ORACLE",
        title: "WebGPU gates and unit tests make silent internal-failure engine switching mandatory.",
        legacyGateIds: ["proof:webgpu-everywhere"],
        rdaFindingIds: ["RDA-004", "RDA-010"],
        witnessSpecs: [
            { path: "scripts/gates.manifest.mjs", start: "        note: \"BC.W-WEBGPU-EVERYWHERE —" },
            { path: "scripts/proof-webgpu-everywhere.mjs", start: "    // ── W2 — the WebGPU no-adapter path", endExclusive: "    // ── W3 —" },
            { path: "tests/composables/glass/webgpu/useWebGPUCanvas.test.ts", start: "    it(\"a no-adapter init failure", endExclusive: "        // The WebGL2 net armed" },
        ],
        rewardedState: "Any WebGPU initialization, adapter, device, validation, or loss failure silently rebuilds as WebGL2 and does not invoke onInitError; a painted result is treated as success without exposing engine identity.",
        currentContradiction: "Aurora currently warns that a deferred failure will surface as an unhandled rejection, while procedural stories expose no actual renderer identity. Silent switching masks attribution and invalidates parity claims.",
        canonicalWaves: ["BI.W-P045", "BI.W-P046", "BI.W-P061", "BI.W-P132"],
        replacementPredicate: "Capability absence may select a declared peer backend before commitment. After a backend is selected, init, validation, uncaptured-error, device.lost, and resource-invalidation failures remain attributed to it, produce one typed visible state and telemetry, never silently switch engines, and expose the actual active renderer in every procedural demo/evidence row.",
        negativeControl: "Inject adapter absence before commitment and an internal validation/device-loss failure after commitment; the first follows the declared capability matrix, while the second must RED if it paints through silent WebGL2 replacement or suppresses attribution.",
    },
    {
        id: "GCA-004",
        classification: "COMPOSED_RUNTIME_GAP",
        title: "The adaptive-observer gate proves source wiring while the advertised live luma is false.",
        legacyGateIds: ["proof:adaptive-observer"],
        rdaFindingIds: ["RDA-005"],
        witnessSpecs: [
            { path: "scripts/proof-adaptive-observer.mjs", start: "// ── 1. The composable exists", endExclusive: "// ── 2. Composes the existing substrates" },
            { path: "scripts/proof-adaptive-observer.mjs", start: "// ── 5. The no-overfitting bar", endExclusive: "// ── Report" },
        ],
        rewardedState: "The composable writes token names, imports expected helpers, appears in Dock/demo source, and has an evidence-document trigger.",
        currentContradiction: "The live Glass Material story remained at luma 0.000 · dark over a visibly warm moving Aurora; the current sampling expression permits animated failure to coalesce into a static value.",
        canonicalWaves: ["BI.W-P016", "BI.W-P017", "BI.W-P132"],
        replacementPredicate: "Every sample reports source kind, sampled element/field identity, timestamp/frame provenance, value, and failure. A moving enrolled backdrop yields temporally current nonconstant composited measurements; animated-sample failure becomes typed RED and never coalesces into static success.",
        negativeControl: "Force the animated sampler to return no value while a static color exists and require both material and contrast families to RED rather than report luma 0.000/static success.",
    },
    {
        id: "GCA-005",
        classification: "MASKED_FAILURE_ORACLE",
        title: "The no-masking gate removes a literal but permits semantic-value substitution.",
        legacyGateIds: ["proof:no-masking-fallback"],
        rdaFindingIds: ["RDA-003"],
        witnessSpecs: [
            { path: "scripts/proof-no-masking-fallback.mjs", start: "// ── Arm C — STALE-LITERAL", endExclusive: "// ── Arm D —" },
            { path: "src/components/custom/dock/composables/dockMorphMeasure.ts", start: "function collapsedFloorPx", endExclusive: " * BD.W-DOCK-CORE — capture the two convex-blend endpoints" },
        ],
        rewardedState: "dockMorphMeasure imports DOCK_TAP_FLOOR_PX and removes a bare 44, even though an unreadable required mounted token still returns the same semantic value and continues.",
        currentContradiction: "The first desktop load emitted 38 identical unreadable-token warnings while continuing with the WCAG tap floor. A named constant is still a masking fallback when the token cascade is broken.",
        canonicalWaves: ["BI.W-P039", "BI.W-P041", "BI.W-P042"],
        replacementPredicate: "A mounted Dock resolves one finite positive semantic morph floor before measurement. Missing/unparseable values yield one typed failing state, one deduplicated diagnostic, and no continued-success geometry or constant substitution; ordinary dogfood emits zero unexpected warnings.",
        negativeControl: "Remove --dock-morph-min from one mounted story root and require architecture.clean-break and behavior.dock to RED without returning DOCK_TAP_FLOOR_PX.",
    },
    {
        id: "GCA-006",
        classification: "COMPOSED_RUNTIME_GAP",
        title: "Crossfade gates prove shallow attributes and regex shapes, not the composed accessibility tree.",
        legacyGateIds: ["proof:dock-crossfade"],
        rdaFindingIds: ["RDA-006", "RDA-007"],
        witnessSpecs: [
            { path: "scripts/proof-dock-crossfade.mjs", start: "    // (b) focus-transfer-on-dissolve", endExclusive: "    return { violations, facts };" },
            { path: "tests/components/custom/dock/DockLayerRail.a11y.test.ts", start: "    it(\"7. ARIA-HIDDEN", endExclusive: "    it(\"8. TRAVELLING-INDICATOR" },
        ],
        rewardedState: "Source contains focus()/nextTick(), and one inactive .dock-face host carries aria-hidden=true in a component test.",
        currentContradiction: "The actual Dock layers story exposed blank controls/generics from inactive faces; the narrow Dock retained opacity-zero focusable facets, nonintersecting tabbables, and targets as short as 20.6 px.",
        canonicalWaves: ["BI.W-P036", "BI.W-P039", "BI.W-P042", "BI.W-P062"],
        replacementPredicate: "Across rest and every crossfade frame, inactive faces and every descendant are inert, accessibility-hidden, non-tabbable, pointer-inactive, and absent from accessible-name/control census; focus transfers to the revealed semantic target, and narrow/coarse focus reveal plus target floors hold.",
        negativeControl: "Leave aria-hidden on the inactive host but make one descendant focusable or named; the composed browser case must RED even though the shallow unit assertion remains green.",
    },
    {
        id: "GCA-007",
        classification: "PROSE_RECEIPT_ORACLE",
        title: "Liquid-morph M5 accepts named Markdown fields instead of measured behavior.",
        legacyGateIds: ["proof:liquid-morph"],
        rdaFindingIds: ["RDA-012"],
        witnessSpecs: [
            { path: "scripts/proof-liquid-morph.mjs", start: "    // The DELTA names the required ship-decision fields", endExclusive: "// ── compose ──" },
        ],
        rewardedState: "A DELTA contains the words p50, throttle, Metal/ANGLE, resulting default, and historical 13.7/15.1 values.",
        currentContradiction: "The live CTA→Dock handoff completed around 2009 ms but supplied no declared acceptance band. Field-name presence cannot establish current timing, continuity, hardware identity, or a source-bound ship decision.",
        canonicalWaves: ["BI.W-P041", "BI.W-P042", "BI.W-P061"],
        replacementPredicate: "Record actual time-series geometry/state/focus samples, frame pacing, exact browser/device/hardware identity, source SHA, declared perceptual bands, and the resulting decision; JSON measurement values—not Markdown keywords—determine PASS.",
        negativeControl: "Supply a prose-complete DELTA with an out-of-band 2009 ms handoff and require motion.transition-continuity to RED.",
    },
    {
        id: "GCA-008",
        classification: "SUPERFLUOUS_COUNT_GATE",
        title: "The Dock meta-gate turns an exact script roster into the product invariant.",
        legacyGateIds: ["proof:dock-gate-roster"],
        rdaFindingIds: [],
        witnessSpecs: [
            { path: "scripts/proof-dock-gate-roster.mjs", start: "// The greenfield (BI B3 dock rebuild", endExclusive: "// ── The retired-mechanism gate blocklist" },
        ],
        rewardedState: "Exactly ten named proof-dock files exist, an exact historical blocklist is absent, and every roster row carries close tags.",
        currentContradiction: "The current browser audit found Dock defects while that exact roster exists. File count and command enrollment are registry shape, not Dock behavior; preserving them would recreate the accretion the user ordered removed.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P042"],
        replacementPredicate: "One behavior.dock family discovers all current public Dock states, scenarios, and retained negative controls. The engine rejects orphan semantic cases, but has no fixed file count, per-mechanism command, tranche ID, or exact filename roster.",
        negativeControl: "Add a new public Dock state without an executable case and require discovered-roster RED; adding/removing a script filename alone has no product verdict.",
    },
    {
        id: "GCA-009",
        classification: "EVIDENCE_AUTHORITY_GAP",
        title: "The legacy visual architecture lets enrollment and receipts stand in for current native paint.",
        legacyGateIds: ["proof:adaptive-glass-live", "proof:live-verified-ledger", "proof:visual-runner"],
        rdaFindingIds: [],
        witnessSpecs: [
            { path: "scripts/gates.manifest.mjs", start: " * LIVE-VERIFICATION GATES ARE `local`-ONLY", endExclusive: " */" },
            { path: "scripts/gates.manifest.mjs", start: "        note: \"AZ.W-ADAPTIVE-AUTO G1 —" },
        ],
        rewardedState: "CI verifies enrollment or an on-disk DELTA while local native-browser execution can be absent from the current run; release excludes the local-only gates.",
        currentContradiction: "Enrollment proves only that a test could run, and receipt integrity proves only that bytes once existed. Neither establishes current native Safari/Chrome paint, renderer identity, console cleanliness, or gestalt at the exact terminal source.",
        canonicalWaves: ["BI.W-P061"],
        replacementPredicate: "Every visual claim binds exact source SHA, native browser name/version/build, feature probes, device/hardware, viewport/input/preferences, scenario/action, numeric/semantic observations, console/unhandled ledger, and applicable-matrix result. Receipt verification authenticates that run but cannot substitute for it or downgrade a missing run to PASS.",
        negativeControl: "Keep a syntactically valid fresh ledger row while removing the native execution payload or changing testedSourceSha; integrity.release and demo.scenario-contract must RED.",
    },
    {
        id: "GCA-010",
        classification: "SELF_CONTRADICTORY_ORACLE",
        title: "The gate registry states the exact inverse of the Fourier and Constellation executables.",
        legacyGateIds: ["proof:fourier-field", "proof:viz-constellation"],
        rdaFindingIds: ["RDA-017"],
        witnessSpecs: [
            { path: "scripts/gates.manifest.mjs", start: "        note: \"BG.W-VIZ-DEMIGRATE — the fourier Canvas2D DE-migration gate:" },
            { path: "scripts/proof-fourier-field.mjs", start: "// BC.W-VIZ-FOURIER — proof:fourier-field", endExclusive: "import { existsSync, readFileSync }" },
            { path: "scripts/gates.manifest.mjs", start: "        note: \"BG.W-VIZ-DEMIGRATE — the constellation Canvas2D DE-migration SOURCE gate" },
            { path: "scripts/proof-viz-constellation.mjs", start: "// BC.W-VIZ-CONSTELLATION — proof:viz-constellation", endExclusive: "import { existsSync, readFileSync }" },
        ],
        rewardedState: "The authoritative registry prose demands Canvas2D, no createGpuSubstrate, and no GPU shaders, while the executable commands under those same IDs demand createGpuSubstrate, WGSL/WebGL2 twins, and the complete absence of Canvas2D.",
        currentContradiction: "Both current implementations are GPU renderer pairs. Fourier's live route says so, while its README and suite table still state Canvas2D; Constellation's live route, README, and suite table state Canvas2D even though its source arms the GPU pair. A green command cannot repair an identity whose declared meaning is its logical negation, nor decide whether the product should keep the implementation or the simpler declared model.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P045", "BI.W-P048", "BI.W-P049", "BI.W-P056", "BI.W-P061"],
        replacementPredicate: "Delete both named command identities and let the owning product wave select the proportionate renderer before projecting one truth lane. P049 retains Fourier's justified WebGPU/WebGL2 compute/render pair; P048 deletes Constellation's dual-GPU upload/render fork and restores its CPU-owned 64-node field plus ordered overlay on Canvas2D. Applicable renderer evidence rejects any manifest, documentation, demo, type, or receipt that disagrees with the landed product; prose and executable predicates have no independent authority lanes.",
        negativeControl: "Invert one component's suite-table or story claim while leaving its renderer and executable scenario unchanged; integrity.lineage plus demo.scenario-contract must RED without relying on a legacy command note.",
    },
    {
        id: "GCA-011",
        classification: "NO_OP_SURVIVOR_ORACLE",
        title: "The retirement oracle explicitly preserves an inert public callback and lets the demo claim it works.",
        legacyGateIds: ["proof:no-retired-survivor", "proof:constellation-substrate-single"],
        rdaFindingIds: ["RDA-016"],
        witnessSpecs: [
            { path: "scripts/proof-no-retired-survivor.mjs", start: "        // BC.W-VIZ-CONSTELLATION — the Canvas2D `drawOverlay` frozen-`now` handoff", endExclusive: "        // BC.W-RADIO-FIX / Band 6" },
            { path: "src/components/custom/constellation/Constellation.vue", start: " * The focal node + click-to-warp", endExclusive: " * The prop contract is the public" },
            { path: "src/components/custom/constellation/constellationTypes.ts", start: "    /** The skin seam — paints the consumer's focal mark on the live field. */", endExclusive: "}" },
        ],
        rewardedState: "The retirement proof declares the Canvas2D overlay handoff gone but deliberately keeps drawOverlay as a public ConstellationProps prop even though the GPU loop never invokes it; separate skin-literal checks then reward prose that says branded content reaches the canvas only through that callback.",
        currentContradiction: "The live Constellation story passes drawOverlay in five advertised focal/warp/pinned examples across seven mounted canvases, yet the renderer resolves only nodes, edges, and uniforms. The public type makes a silent no-op look valid, and the demo turns that no-op into apparent product evidence.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P048", "BI.W-P056", "BI.W-P059", "BI.W-P061"],
        replacementPredicate: "A clean break treats an uncalled public prop as a surviving defect. P048 restores the proportionate Canvas2D renderer and invokes drawOverlay exactly once as its ordered final pass with live field and frozen-now semantics; all GPU setup/shader paths and comments legalizing inertness are removed. Five story bindings must paint causal focal/warp/pinned states, including reset and PRM. No compatibility no-op or built-in lookalike can satisfy the public contract.",
        negativeControl: "Add an optional callback to the public props and demo but omit its invocation from one or both renderer paths; architecture.clean-break and the live scenario must RED even if compilation, shader source checks, and screenshots remain nonblank.",
    },
    {
        id: "GCA-012",
        classification: "COMPLETENESS_THEATER_ORACLE",
        title: "The one-clock completeness gate excludes demos and lets an engine import legalize unrelated local playback.",
        legacyGateIds: ["proof:motion-one-clock"],
        rdaFindingIds: ["RDA-018", "RDA-030"],
        witnessSpecs: [
            { path: "scripts/proof-motion-one-clock.mjs", start: "// COMPLETENESS — a gate that reds the instant", endExclusive: "// It is the PROPERTY-SPINE sibling" },
            { path: "scripts/proof-motion-one-clock.mjs", start: "const UI_MOTION_DIRS = [", endExclusive: "function isVizFile" },
            { path: "scripts/proof-motion-one-clock.mjs", start: "        const importsKf = KF_PRIMITIVE_RE.test(stripped);", endExclusive: "        // PRONG B" },
            { path: "demo/stories/motion/springs.vue", start: "let playRaf = 0;", endExclusive: "const copied = ref(false);" },
            { path: "src/components/custom/easing/composables/useEasingPicker.ts", start: "    function playTravel(): void {", endExclusive: "    return {" },
        ],
        rewardedState: "A local rAF/easing writer is considered on-spine whenever its file imports any keyframes primitive, and the completeness corpus excludes demo stories entirely. The named Springs demonstration can therefore bypass managed playback while the completeness command remains green.",
        currentContradiction: "The live Springs trajectory is plausible, but its playground cancels and self-schedules requestAnimationFrame, samples springTimingFunction, and writes transform directly. EasingPicker independently animates a public travelling-dot preview through a fixed 1200 ms local rAF with no PRM or playing-state contract. The command still reports one clock YES because import provenance and selected corpora, not the complete reachable product, decide enrollment. A demo or public authoring component is part of shipped truth rather than an exempt harness.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P022", "BI.W-P025", "BI.W-P026", "BI.W-P059", "BI.W-P061", "BI.W-P124"],
        replacementPredicate: "Delete the command identity. Discover src and demo schedulers semantically and classify upstream managed physics playback, Glass continuous/render lifecycles, native/CSS timelines, bounded editor-local previews, one-shot coalescers, and discrete cancellable timers. For each animated property/episode, prove exactly one declared authority plus pause/PRM/interruption/settle/teardown. A keyframes import and corpus omission have zero exemption power; the Springs story consumes managed engine playback, while an authoring preview either truthfully owns a proportionate normalized one-shot or actually consumes the upstream playback owner it claims.",
        negativeControl: "Import SpringProgress into a story or composable, then add a separate rAF that writes the same transform, or add a fixed editor preview outside the discovered corpus with no PRM/final state; motion.single-clock must RED even though the old importsKf/corpus shortcuts would have passed it.",
    },
    {
        id: "GCA-013",
        classification: "INERT_FORK_ORACLE",
        title: "The Deck gate mandates an unused spring fork and silent fallback while calling it an alias.",
        legacyGateIds: ["proof:deck"],
        rdaFindingIds: ["RDA-019"],
        witnessSpecs: [
            { path: "scripts/proof-deck.mjs", start: "//   D7 — `--spring-deck` RESOLVES THE `.smooth` REGISTER.", endExclusive: "// The BINDING painted truth" },
            { path: "scripts/proof-deck.mjs", start: "    // ── D7 — --spring-deck resolves the .smooth register", endExclusive: "    return { facts, violations };" },
            { path: "src/components/custom/deck/constants.ts", start: "export const DECK_SPRING =" },
            { path: "src/composables/motion/springPresets.ts", start: "        name: \"smooth\"," , endExclusive: "        name: \"snappy\"," },
            { path: "src/components/custom/deck/composables/useDeckSpring.ts", start: "export function installDeckSpring(): void {", endExclusive: "}" },
        ],
        rewardedState: "The source must retain installDeckSpring, a dynamic engine import, springTimingFunction(DECK_SPRING), and a separate 0.5/0.85 constant even though --spring-deck aliases the canonical smooth token and no current Glass/foreign package import consumes deckEase. A caught import failure silently changes the easing to cubic-out.",
        currentContradiction: "The canonical smooth family is 0.58/0.8, so the required DECK_SPRING is not its JS twin. The live Deck's navigation, pager identity, focus retention, and polite announcement work without reading deckEase; the story merely calls the installer. The gate turns donor archaeology into a public contract and rewards an unobservable fallback.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P025", "BI.W-P026", "BI.W-P059", "BI.W-P061", "BI.W-P121"],
        replacementPredicate: "Delete the named command and the unused installDeckSpring/deckEase/DECK_SPRING public facility, exports, docs, token claims, and inert demo install call in one clean break. Retain Deck's actual behavior contract and move its showcase-only barbell to private story ownership on declared engine playback. The foreign slides donor keeps its distinct local editorial spring under its own owner packet; it cannot force a Glass compatibility export.",
        negativeControl: "Restore an exported callable easing with no current runtime consumer, give it values that differ from the family it claims to mirror, or catch engine failure into a visually different curve; component topology, clean-break, temporal ownership, and demo truth must RED.",
    },
    {
        id: "GCA-014",
        classification: "SOURCE_SHAPE_FORK_ORACLE",
        title: "The Button gate forces a direct press reconstruction after the product declared one canonical wrapper.",
        legacyGateIds: ["proof:button-glass"],
        rdaFindingIds: ["RDA-020"],
        witnessSpecs: [
            { path: "scripts/proof-button-glass.mjs", start: "//   B2 — the press composes useSpringPress driving useLiquidFlex", endExclusive: "//   B3 —" },
            { path: "scripts/proof-button-glass.mjs", start: "    // ── B2 — the press composes the squishy interruptible spring", endExclusive: "    // ── B3 —" },
            { path: "src/composables/motion/useLiquidPress.ts", start: "// The ≥2-consumer bar (J-inv-10) is on the DEAD primitive", endExclusive: "import {" },
            { path: "src/components/ui/button/Button.vue", start: "const press = useSpringPress()", endExclusive: "// Feed the live spring value" },
            { path: "src/components/custom/dock/DockControl.vue", start: "const press = useLiquidPress({" },
        ],
        rewardedState: "Button must import and call useSpringPress and useLiquidFlex directly and retain a CSS :active scale. Repointing Button to the declared canonical useLiquidPress owner makes the gate RED even if product behavior, interruption, squish, accessibility, and PRM improve.",
        currentContradiction: "useLiquidPress says it is the one public coupled press wrapper and that useSpringPress-alone is no longer a second face, while its own comment admits Button remains an inline reconstruction solely so proof:button-glass stays green. DockControl already consumes the wrapper. The gate preserves duplication and does not establish exclusive CSS-vs-JS write phases.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P025", "BI.W-P026", "BI.W-P027", "BI.W-P063"],
        replacementPredicate: "Delete the source-shape command. One canonical public press composable owns state, engine playback, reciprocal squish, semantic drive variables, PRM, and teardown; useSpringPress is folded into a private engine leaf. Button, Card, DockControl, and every discovered pressable consume configurations. The CSS floor is active only before JS ownership or without JS, never concurrently.",
        negativeControl: "Recreate the spring+flex leaves inside Button, expose the private spring leaf publicly, or keep CSS and JS scale writers active together; component topology, temporal ownership, and press trajectory evidence must RED regardless of import spelling.",
    },
    {
        id: "GCA-015",
        classification: "DISTRIBUTION_MIRROR_ORACLE",
        title: "Motion parity gates manufacture a consumerless Glass distribution seam and certify their own stale inventory.",
        legacyGateIds: ["proof:motion-suite", "proof:motion2", "proof:motion-demo"],
        rdaFindingIds: ["RDA-021"],
        witnessSpecs: [
            { path: "scripts/proof-motion-suite.mjs", start: "// glass-ui is the DISTRIBUTION SEAM", endExclusive: "import { existsSync" },
            { path: "scripts/proof-motion-suite.mjs", start: "const STATIC_RUNTIME = [", endExclusive: "// The heavy AnimationEngine surface" },
            { path: "scripts/proof-motion2.mjs", start: "// ── (4) CANON-ISOMORPHIC", endExclusive: "// ── (5) MUTED-LIFTED" },
            { path: "src/composables/motion/suite.ts", start: "// AY.W-MOTION2 — the FULL @mkbabb/keyframes.js STATIC suite", endExclusive: "// ── STATIC runtime exports" },
            { path: "src/subpaths/motion-curves.ts", start: "// @mkbabb/glass-ui/motion-curves", endExclusive: "export * from" },
            { path: "demo/stories/motion/curve-families.ts", start: "        family: \"Springs\",", endExclusive: "];" },
        ],
        rewardedState: "Glass republishes an enumerated keyframes root barrel and value.js catalogue, publishes a reverse CSS-token→JS table with no tracked external consumer, clones the upstream demo taxonomy, and calls a hard-coded major-version roster complete. A local sibling checkout may change the answer, while its absence skips the supposed live parity census.",
        currentContradiction: "Installed keyframes.js 5.2.0 exposes splitText, SplitTextRefusalError, and viewTransition beyond the gate's 31-name STATIC_RUNTIME, so SUITE-COMPLETE can pass while incomplete. The live gallery then says FULL and 1:1 while all five displayed spring parameter labels differ from the SPRING_PRESETS callables/descriptions they purport to visualize. No tracked sibling imports /motion-curves, MOTION_CURVES, or motionCurve.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P023", "BI.W-P024", "BI.W-P025", "BI.W-P026", "BI.W-P059", "BI.W-P061", "BI.W-P129"],
        replacementPredicate: "Delete all three named identities and the manufactured mirror. /motion exports only Glass-owned Vue/composable behavior and semantic preset data; consumers import upstream primitives from their upstream package. Delete suite.ts, curves.ts, /motion-curves, package/type/build projections, mirror tests, and parity prose in one clean break while preserving the real /easing component boundary. A Glass demo derives current displayed semantics from its Glass owner instead of duplicating an upstream inventory, and all exact tracked consumer builds remain green.",
        negativeControl: "Add a new keyframes export and require no Glass diff; importing it from Glass must fail. Add a CSS alias and require no JS table row. Hard-code one stale spring label or restore /motion-curves without a current runtime consumer and require dependency, entry-graph, demo-truth, and clean-break evidence to RED.",
    },
    {
        id: "GCA-016",
        classification: "CONSUMER_LAUNDERING_ORACLE",
        title: "The motion consumer gate converts a demo path plus a unit-test path into product demand without proving either runtime edge.",
        legacyGateIds: ["proof:motion-composables-consumer"],
        rdaFindingIds: ["RDA-022"],
        witnessSpecs: [
            { path: "scripts/proof-motion-composables-consumer.mjs", start: "// Each NEW motion composable", endExclusive: "import { existsSync" },
            { path: "scripts/proof-motion-composables-consumer.mjs", start: "export function detectConsumers(tally, resolves)", endExclusive: "function run()" },
            { path: "docs/tranches/AV/audit/W3-motion-consumers.json", start: "  \"note\": \"Each NEW motion composable" },
        ],
        rewardedState: "Each primitive is declared consumed when two arbitrary path strings exist; the committed tally deliberately chooses one demo and one unit test for both useCountup and vReveal. The detector never parses an import, renders a binding, exercises behavior, distinguishes a test from demand, or decides whether a public API belongs in the product.",
        currentContradiction: "A test is evidence about a chosen product surface, not an independent reason for that surface to exist. File existence can pass even if the cited file no longer imports the primitive. Counting tests also makes a newly invented primitive self-justify by creating its own test, the exact substrate-without-consumer failure the rule was supposed to prevent.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P023", "BI.W-P024", "BI.W-P057", "BI.W-P059", "BI.W-P129"],
        replacementPredicate: "Delete the named command and tally. Semantic import/runtime discovery establishes actual first-party and external owners; tests, types, barrels, documentation, future asks, and path existence have zero demand credit. An internal substrate needs a real runtime owner. A public primitive needs a current external runtime receipt or an explicit product-owner decision plus a causal first-party demo; otherwise the primitive, export, docs, and tests are removed together. No fixed minimum count survives.",
        negativeControl: "Create an unused test file and a demo file that never imports the primitive; topology must remain RED. Remove a test for a genuinely imported and causally exercised primitive; consumer demand must remain true while ordinary test coverage is judged separately.",
    },
    {
        id: "GCA-017",
        classification: "CHANNEL_CLASSIFICATION_ORACLE",
        title: "The compositor-only gate is actually a reflow-name filter with paint/custom-property blind spots and a permanent exception registry.",
        legacyGateIds: ["proof:no-layout-animation"],
        rdaFindingIds: ["RDA-023"],
        witnessSpecs: [
            { path: "scripts/proof-no-layout-animation.mjs", start: "// proof:no-layout-animation", endExclusive: "import { existsSync" },
            { path: "scripts/proof-no-layout-animation.mjs", start: "const isReflowProp = (prop) =>", endExclusive: "// ── The narrow, named, CLS-bounded allowlist" },
            { path: "scripts/proof-no-layout-animation.mjs", start: "const TRANSITION_ALLOWLIST = [", endExclusive: "const transitionAllowed" },
            { path: "scripts/proof-no-layout-animation.mjs", start: "    `\\n[proof:no-layout-animation] LOCKED" },
        ],
        rewardedState: "Any property outside a hand-maintained reflow-name list passes the supposed compositor lock, including background, box-shadow, filters, and every custom property without tracing its sink. Nineteen named layout exceptions can remain indefinitely because file/path membership converts them to green, and the final message still claims compositor-only architecture.",
        currentContradiction: "Paint work is not compositing, custom properties inherit the cost of their final consumer, and width/height/inset/grid/margin transitions remain layout work even when allowlisted. The current command reports LOCKED with four keyframe plus fifteen transition exceptions but provides no browser trace, CLS, frame-pacing, or main-thread evidence and cannot decide whether an exception is semantically necessary.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P025", "BI.W-P029", "BI.W-P030", "BI.W-P031", "BI.W-P061", "BI.W-P130"],
        replacementPredicate: "Delete the command and fixed allowlists. Current-tree discovery resolves custom-property dependency sinks and classifies final animation channels as layout, paint, or composite. Each necessary user-initiated layout reclaim is justified by product semantics and measured against owner-specific CLS/frame/main-thread bands in exact Safari/Chrome scenarios; other layout transitions are transformed or removed. Paint is reported as paint, and composite credit comes from trace evidence rather than a property-name whitelist.",
        negativeControl: "Animate --probe consumed by width and require layout RED; animate background or box-shadow and require paint classification, never compositor credit; keep a file-path exception with excessive CLS and require RED; animate transform on a demoted/noncomposited layer and withhold composite credit until the trace proves it.",
    },
    {
        id: "GCA-018",
        classification: "FUTURE_CONSUMER_ORACLE",
        title: "The motion-presets gate turns a prose future-consumer record into permanent demand for otherwise unconsumed substrate.",
        legacyGateIds: ["proof:motion-presets"],
        rdaFindingIds: [],
        witnessSpecs: [
            { path: "scripts/proof-motion-presets.mjs", start: "// ── the ≥2-consumer record", endExclusive: "export function detectAll" },
            { path: "src/styles/tokens/scheme-spring.css", start: "    --ease-convergence: var(--spring-gentle);" },
            { path: "src/styles/scroll-driven.css", start: "    [data-scroll-reveal-once] > * {" },
            { path: "src/composables/motion/useStaggerReveal.ts", start: " * The `[data-scroll-reveal-once]` latch", endExclusive: "export const vScrollRevealOnce" },
            { path: "demo/chassis/section/useSectionReveal.ts", start: "// the public-but-unused `vScrollRevealOnce`, which stays untouched." },
            { path: "tests/composables/motion/scroll-reveal-once.test.ts", start: "import { vScrollRevealOnce } from \"@glass/composables/motion/useStaggerReveal\";" },
        ],
        probeSpec: {
            script: "scripts/proof-motion-presets.mjs",
            expectedExitCode: 0,
            needles: ["MP1 convergence row", "MP3 once latch", "proof:motion-presets PASSED"],
        },
        externalDemandTerms: ["--ease-convergence", "data-scroll-reveal-once"],
        rewardedState: "A hard-coded CONSUMER_RECORD names future Fourier surfaces and a Glass demo, so --ease-convergence plus a second scroll-reveal selector/directive can PASS without resolving a current import, CSS read, rendered binding, or owner receipt. The definitions and their own tests then become their only concrete local witnesses.",
        currentContradiction: "The command is currently green, yet the source-base/current-HEAD tracked product census across value.js, keyframes.js, atlas, fourier-analysis, sci-report, muster, bbnf-buddy, slides, and speedtest finds zero product files containing either token. Within Glass, --ease-convergence appears only in its mirror/definition/tests; the once branch appears in capture CSS, its definition, and its own unit test, while the real demo section-reveal owner explicitly calls vScrollRevealOnce public-but-unused and leaves it untouched. A future adoption sentence and self-test are not present product demand.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P023", "BI.W-P024", "BI.W-P025", "BI.W-P029", "BI.W-P031", "BI.W-P059", "BI.W-P129"],
        replacementPredicate: "Delete the named command, --ease-convergence alias, reverse-table row/tests/prose, and the consumerless data-scroll-reveal-once selector/directive branch in one clean break. Preserve the shared reveal engine's ordinary once semantics only where current runtime discovery proves an owner. Future Fourier adoption must arrive as a new immutable consumer receipt against the then-current direct semantic owner; it cannot keep unused producer substrate alive in advance.",
        negativeControl: "Restore either token with only a test, demo comment, registry row, or future consumer sentence and require clean-break plus runtime-demand evidence to RED; add a real causal consumer later and require ownership to become true without any fixed minimum count.",
    },
    {
        id: "GCA-019",
        classification: "STATIC_LITERAL_ORACLE",
        title: "Animation-coherence rejects a correct dynamic binding while fixed rosters, exceptions, and aliases self-certify the register system.",
        legacyGateIds: ["proof:animation-coherence"],
        rdaFindingIds: [],
        witnessSpecs: [
            { path: "scripts/proof-animation-coherence.mjs", start: "const DURATION_BAND_EXEMPT = {", endExclusive: "// (b) TEMPLATE-DURATION" },
            { path: "scripts/proof-animation-coherence.mjs", start: "const REGISTER_BINDING_ROSTER = {", endExclusive: "// Blank HTML comments" },
            { path: "scripts/proof-animation-coherence.mjs", start: "export function detectRegisterBinding(file, src, register) {", endExclusive: "// ── AX.W05 src-tree walk" },
            { path: "scripts/proof-animation-coherence.mjs", start: "export function detectSpringCoverage(tokensSrc, files, read) {", endExclusive: "// APPLE-SPRING-CONSTELLATION" },
            { path: "src/components/ui/dialog/DialogContent.vue", start: "      :data-reveal=\"isCenter ? 'overlay' : undefined\"" },
        ],
        probeSpec: {
            script: "scripts/proof-animation-coherence.mjs",
            expectedExitCode: 1,
            needles: ["register-binding forks", "missing its assigned register binding data-reveal=\"overlay\"", "one motion source          : NO"],
        },
        rewardedState: "A static-literal regex and fixed file→register table are treated as semantic truth; two filename exemptions make known literal-duration debt green, and an alias definition itself counts as a live spring consumer. Architectural equivalence, resolved Vue bindings, actual token reads, animation output, and browser behavior are outside the oracle.",
        currentContradiction: "DialogContent composes glass-reveal and resolves :data-reveal to overlay for centered dialogs, but the gate is currently RED because it searches only for the literal data-reveal=\"overlay\" spelling. In the same run, the spring coverage tally reports every preset reached partly because publishing --ease-spring-X: var(--spring-X) is counted as its own consumer. The oracle can reject correct behavior and preserve dead vocabulary simultaneously.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P024", "BI.W-P025", "BI.W-P026", "BI.W-P029", "BI.W-P031", "BI.W-P059", "BI.W-P061", "BI.W-P130"],
        replacementPredicate: "Delete the command, fixed register/file roster, permanent duration exemptions, alias-as-consumer rule, and static-literal binding requirement. Semantic source discovery resolves Vue expressions and custom-property/token graphs; typed browser scenarios observe the effective register, writer, timing/trajectory, PRM result, focus/final state, and teardown. Equivalent dynamic or static implementations satisfy the same property, while an alias with no runtime read contributes zero demand.",
        negativeControl: "Keep the current dynamic centered-dialog binding and require PASS; change its resolved value to menu or remove the effective binding and require RED. Publish a new --ease-* alias without a runtime reader and require the token graph to remain dead rather than self-credit it as consumed.",
    },
    {
        id: "GCA-020",
        classification: "STALE_VALUE_ORACLE",
        title: "The spring synchronization gate carries a second taste authority and fails the current owner for not returning to an obsolete Dock curve.",
        legacyGateIds: ["proof:spring-tokens-synced"],
        rdaFindingIds: ["RDA-021", "RDA-026"],
        witnessSpecs: [
            { path: "scripts/proof-spring-tokens-synced.mjs", start: "const DOCK_RESPONSE = 0.68;", endExclusive: "// Analytic underdamped overshoot" },
            { path: "scripts/proof-spring-tokens-synced.mjs", start: "    // BI SU3 RECONCILE", endExclusive: "    if (!(constResponse > 0" },
            { path: "scripts/proof-spring-tokens-synced.mjs", start: "    // BD.W-ANIM-IOS27-TUNE — positive confirmation", endExclusive: "    // Legacy back-compat" },
            { path: "src/composables/motion/springPresets.ts", start: "        name: \"dock\",", endExclusive: "        name: \"transient\"," },
            { path: "demo/stories/motion/springs.vue", start: "            blurb=\"The four SHIPPED spring registers" },
            { path: "demo/stories/motion/springs.vue", start: "const orchestrator = computed(() =>", endExclusive: "function play(): void {" },
            { path: "demo/stories/motion/springs.vue", start: "const playStops = computed(() =>", endExclusive: "const playFn = computed(() =>" },
            { path: "scripts/regen-spring-tokens.mjs", start: "const SAMPLE_COUNT = 48;", endExclusive: "// BA.W-GLASS-CAL Unit 3" },
        ],
        probeSpec: {
            script: "scripts/proof-spring-tokens-synced.mjs",
            expectedExitCode: 1,
            needles: ["dock spring (const/preset): (0.3, 0.82) / (0.3, 0.82)", "canonical dock-spring numbers (0.68, 0.64) are not both present"],
        },
        rewardedState: "The script duplicates 0.68/0.64 as canonical taste, scans for old/new literal comments, and freezes an exact global preset count beside the purported SPRING_PRESETS authority. It can therefore demand that generated/runtime sources move backward to its stale local preference even when generation and direct consumers agree with the current table.",
        currentContradiction: "The same script says the BI ruling forbids value-binding taste gates and explicitly records the current 0.30/0.82 decision, then later requires the obsolete 0.68/0.64 literals. Its live run reports const and preset correctly synchronized at 0.3/0.82, eight of eight CSS/JS tempo trajectories within 25 ms, and still exits RED solely because the stale positive regex remains. The gallery separately displays a third obsolete Dock pair, 0.32/0.7. The Springs lab then calls a different default solver horizon the exact shipped CSS twin: smooth renders 24 percentage stops while the generated token has 48 because only the generator passes measured-settle maxDuration, and the story plays every row for fixed 1100 ms while claiming it cannot drift.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P023", "BI.W-P025", "BI.W-P026", "BI.W-P041", "BI.W-P042", "BI.W-P059", "BI.W-P061", "BI.W-P130"],
        replacementPredicate: "Delete the script-local taste literals, stale-number blacklist, exact vocabulary count, and command identity. SPRING_PRESETS is the sole parameter owner; one generator contract projects CSS and exposes its measured-settle maxDuration, sample density, rounding, and tempo duration to direct JavaScript consumers and demos. The motion.spring-language family checks generated-byte/trajectory equivalence, semantic-family assignment, measured settle/overshoot/continuity bands, derived option/copy truth, and displayed-to-callable/token equality without prescribing a duplicated aesthetic pole.",
        negativeControl: "Change one preset without regenerating CSS and require parity RED; omit maxDuration or change sample density only in a seeded demo and require projection truth RED; keep CSS/runtime aligned but hard-code an old demo number or fixed 1100 ms clock and require demo truth RED; change the owner to another measured in-band value and require no stale script literal or exact-count oracle to reject it.",
    },
    {
        id: "GCA-021",
        classification: "FOSSILIZED_PATH_ORACLE",
        title: "The easing primitive gate fails a working externally consumed subpath because it treats a vanished internal barrel as public behavior.",
        legacyGateIds: ["proof:easing-primitive"],
        rdaFindingIds: ["RDA-027", "RDA-028", "RDA-029", "RDA-030"],
        witnessSpecs: [
            { path: "scripts/proof-easing-primitive.mjs", start: "    API_INDEX_TS: resolve(ROOT, \"src/api/index.ts\")," },
            { path: "scripts/proof-easing-primitive.mjs", start: "    // ── W4 — the ≥2-consumer bar", endExclusive: "    // ── W5 —" },
            { path: "scripts/proof-easing-primitive.mjs", start: "    // ── W5 — the api publication", endExclusive: "    const facts =" },
            { path: "src/subpaths/easing.ts", start: "export * from \"../components/custom/easing\";" },
            { path: "package.json", start: "        \"./easing\": {", endExclusive: "        \"./expandable-container\":" },
            { path: "src/components/custom/easing/EasingPicker.vue", start: "function onDown(ev: PointerEvent): void {", endExclusive: "function onMove(ev: PointerEvent): void {" },
            { path: "src/components/custom/easing/EasingPicker.vue", start: "async function copy(): Promise<void> {", endExclusive: "// The bezier canvas viewBox" },
            { path: "src/components/custom/easing/EasingPicker.vue", start: "                class=\"btn-pill glass-btn rounded-pill px-3 py-2 text-sm text-foreground\"" },
        ],
        probeSpec: {
            script: "scripts/proof-easing-primitive.mjs",
            expectedExitCode: 1,
            needles: ["W1 primitive exists ONCE on /easing : YES", "W5 api publication                  : NO", "src/api/index.ts does not publish"],
        },
        externalImportSpecifier: "@mkbabb/glass-ui/easing",
        externalImportBinding: "EasingPicker",
        rewardedState: "The product must preserve an exact pre-flatten internal directory, subpath source shape, and src/api/index.ts re-export; two modes of one Glass demo plus Markdown mentions are called a two-consumer bar. Packed resolution, actual external imports, editable output, keyboard/pointer semantics, playback, and current generated topology are secondary to regexes over old paths.",
        currentContradiction: "The command currently reports W1–W4 YES and exits RED only because src/api/index.ts no longer exists. package.json and src/subpaths/easing.ts still publish /easing, while the bound consumer assay finds current EasingPicker runtime imports in both value.js and keyframes.js. The real product boundary is not broken; the fossilized internal barrel oracle is. Conversely, actual product behavior is: Bezier handles are pointer-only, Clipboard denial is silent, the play label resolves to a clipped 40×40 blob, and the fixed local preview has no PRM/playing contract. None affects W1–W4, proving the gate rejects incidental topology while ignoring the boundary it claims to certify.",
        canonicalWaves: ["BI.W-P000", "BI.W-P008", "BI.W-P010", "BI.W-P014", "BI.W-P023", "BI.W-P059", "BI.W-P061", "BI.W-P124", "BI.W-P129"],
        replacementPredicate: "Delete the command and internal-path assertions while preserving the owned /easing product. The generated entry graph and packed candidate must resolve EasingPicker/Configurator and types; current value.js/keyframes.js owner fixtures import the exact candidate; causal scenarios exercise semantic pointer/keyboard Bezier handles, Steps parity, reparsable output, explicit Clipboard success/denial recovery, content-width playback control, declared proportionate preview ownership, PRM, focus, and teardown; boundary checks reject local value.js math or falsely claimed playback authority.",
        negativeControl: "Remove the packed /easing export, fork stepped/cubic math locally, make a handle pointer-only/readout inert, swallow Clipboard denial, collapse a text action to the icon square, or run travel under PRM and require the applicable family RED. Move or regenerate internal files without changing the packed/runtime contract and require no product failure merely because src/api/index.ts stays absent.",
    },
    {
        id: "GCA-022",
        classification: "FIXED_ENROLLMENT_ORACLE",
        title: "The affordance gate passes the exact clipped-button regression it names because its hand-written file roster did not follow the component re-home.",
        legacyGateIds: ["proof:demo-affordances"],
        rdaFindingIds: ["RDA-029"],
        witnessSpecs: [
            { path: "scripts/proof-demo-affordances.mjs", start: "// ── The enrolled surfaces", endExclusive: "// W2 — the play/replay-bearing stories" },
            { path: "scripts/proof-demo-affordances.mjs", start: "    // BEZIER_EDITOR + StepsEditor retired", endExclusive: "    SPRINGS:" },
            { path: "src/components/custom/easing/EasingPicker.vue", start: "                class=\"btn-pill glass-btn rounded-pill px-3 py-2 text-sm text-foreground\"" },
            { path: "src/styles/glass/surfaces.css", start: "    /* BA.W-DEMO-AFFORDANCES (IG-A4)", endExclusive: "    .glass-btn {" },
        ],
        probeSpec: {
            script: "scripts/proof-demo-affordances.mjs",
            expectedExitCode: 0,
            needles: ["W1 no .glass-btn+.btn-pill stack : YES", "status: PASS"],
        },
        rewardedState: "A fixed PATHS object and two hand-authored sub-rosters define the affordance universe. The script comments say EasingPicker's travelling-dot control survives the editor re-home, but the actual EasingPicker path is not read, so moving a forbidden class stack from a demo SFC into the published component converts the exact same defect to green.",
        currentContradiction: "The live Steps playback control is the previously documented ~40 px blob: width=height=40 px and its Climb the staircase text is visibly wrapped/clipped. EasingPicker carries class=btn-pill glass-btn, and surfaces.css explicitly says those classes are mutually exclusive. The diagnostic command nonetheless reports zero class/text hits, W1 YES, and PASS because its roster stopped at the old demo boundary.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P059", "BI.W-P061", "BI.W-P124"],
        replacementPredicate: "Delete the named command and fixed PATHS/PLAY_STORIES rosters. The design.affordance family discovers every current rendered text-bearing action through direct story reachability and component composition, resolves its effective size/material styles, and compares label geometry against clipping/overflow plus the semantic icon-square floor. Component creation, move, or re-home changes discovery automatically; a non-rendered helper earns no case. A source detector may assist but cannot PASS a rendered 40×40 text blob.",
        negativeControl: "Move a correctly enrolled text play control into a newly published component and reintroduce glass-btn beside btn-pill; design.affordance and demo.scenario-contract must RED from semantic discovery without editing a file roster. Move the component again with unchanged correct behavior and require no verdict change.",
    },
    {
        id: "GCA-023",
        classification: "FINITE_ARM_ORACLE",
        title: "The accessibility gate certifies a finite source-arm roster while reachable pointer-active, hidden-default, and no-op affordances remain outside its semantic universe.",
        legacyGateIds: ["proof:a11y"],
        rdaFindingIds: ["RDA-027", "RDA-031", "RDA-032", "RDA-033", "RDA-034", "RDA-035", "RDA-036"],
        witnessSpecs: [
            { path: "scripts/proof-a11y.mjs", start: "//   EP  EasingPicker", endExclusive: "//   SD  StatusDot" },
            { path: "scripts/proof-a11y.mjs", start: "export function detectEP() {", endExclusive: "// ── SD —" },
            { path: "src/components/custom/easing/EasingPicker.vue", start: "            <svg", endExclusive: "                <!-- bounding box + diagonal reference -->" },
            { path: "src/components/custom/easing/EasingPicker.vue", start: "                <!-- bezier draggable handles -->", endExclusive: "                <!-- travelling dot" },
        ],
        probeSpec: {
            script: "scripts/proof-a11y.mjs",
            expectedExitCode: 0,
            needles: ["proof:a11y — PASS", "EP  triggers=2 unnamed=0"],
        },
        rewardedState: "A finite authored arm list is called a framework. Its EasingPicker arm iterates only SelectTrigger source tags, so two labelled comboboxes make EP green; a separate host role=img check elsewhere can credit the plot while the two circles that actually respond to pointer capture have no role, tabindex, accessible name/value, key handler, or focus indication. Components, demos, and public defaults absent from the arm list contribute no contradiction even when they expose causal pointer behavior or a control-styled no-op.",
        currentContradiction: "Live causal assays exposed the same omission class across unlike implementations. A Bezier handle drag changed its literal; Blob press incremented clicks 0→1; a DataTable th reordered rows; a Timeline li changed the selected callout; and Drawer's imperative detent listener moved both explicit and allegedly fixed sheets, all while the active controls remained absent from the focus model. DarkModeToggle's pointer-styled passive div intentionally did nothing, while Typewriter defaults pointer-only glyph deletion on even though every first-party story disables it. proof:a11y still reports PASS and EP triggers=2 unnamed=0 because finite source arms define the answer before template, imperative, render-function, and current composed reachability are inspected.",
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P032", "BI.W-P047", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P080", "BI.W-P082", "BI.W-P107", "BI.W-P116", "BI.W-P120", "BI.W-P124"],
        replacementPredicate: "Delete the named command and finite EP/SC/etc arm roster as global accessibility authority. Discover every current operable descendant from the route/import/render graph plus every public default-on interaction, then apply generic semantic and family-specific causal cases. Interactive SVG/canvas/table/list/glyph/custom-component descendants expose the role, name, value/state, focus, keyboard/touch/pointer parity, and visible focus their behavior requires; noninteractive description remains separate, decorative branches own no handlers, and disabled controls use truthful native semantics. Moving a pointer-active control, hiding it from first-party stories, or styling a no-op as a command always REDs without adding a roster arm.",
        negativeControl: "Keep both EasingPicker comboboxes labelled and role=img on the SVG, then remove tabindex/keyboard/value semantics from one handle; behavior.focus-escape must RED in the composed browser. Move the same defect into a new component, make a public pointer-only interaction default true while every story disables it, and render a cursor:pointer no-op div; semantic discovery and scenario coverage must RED all three without roster edits. Replace any implementation with equivalent semantic controls and require no failure merely because tag shape changed.",
    },
];

const rows = definitions.map((definition) => {
    const legacyRows = definition.legacyGateIds.map((id) => {
        const row = legacyById.get(id);
        if (!row) throw new Error(`${definition.id}: unknown legacy gate ${id}`);
        return {
            legacyId: id,
            disposition: row.disposition,
            canonicalFamilies: row.canonicalFamilies,
            canonicalInvariantBindings: row.canonicalInvariantBindings,
            legacyNamedCasesRetained: row.legacyNamedCasesRetained,
            legacyNoteSha256: row.legacyNoteSha256,
            reversal: row.reversal,
        };
    });
    const rdaFindings = definition.rdaFindingIds.map((id) => {
        const row = renderedById.get(id);
        if (!row) throw new Error(`${definition.id}: unknown rendered finding ${id}`);
        return { id, status: row.status, finding: row.finding, evidence: row.evidence };
    });
    const externalImportEvidence = definition.externalImportSpecifier ? consumerAssay.imports
        .filter((row) => row.specifier === definition.externalImportSpecifier && row.bindings.includes(definition.externalImportBinding))
        .map((row) => ({
            repository: row.repository,
            repositoryHead: row.repositoryHead,
            file: row.file,
            specifier: row.specifier,
            binding: definition.externalImportBinding,
            kind: row.kind,
        })) : [];
    if (definition.externalImportSpecifier && externalImportEvidence.length === 0) {
        throw new Error(`${definition.id}: no bound external import evidence for ${definition.externalImportBinding} from ${definition.externalImportSpecifier}`);
    }
    return {
        ...definition,
        witnessSpecs: undefined,
        probeSpec: undefined,
        externalDemandTerms: undefined,
        externalImportSpecifier: undefined,
        externalImportBinding: undefined,
        evidenceCredit: "FORMATION_RESEARCH_ONLY",
        legacyRows,
        rdaFindings,
        sourceWitnesses: definition.witnessSpecs.map(witness),
        liveProbe: definition.probeSpec ? runLiveProbe(definition.probeSpec) : null,
        externalDemandCensus: definition.externalDemandTerms ? externalDemandCensus(definition.externalDemandTerms) : [],
        externalImportEvidence,
    };
});

const classificationCounts = Object.fromEntries(Object.entries(Object.groupBy(rows, (row) => row.classification)).map(([name, values]) => [name, values.length]));
const output = {
    schemaVersion: "1.0.0",
    sourceBase: SOURCE_BASE,
    generatedAt: "2026-07-14",
    status: "FORMATION_RESEARCH_ONLY",
    rowCount: rows.length,
    sourceWitnessCount: rows.reduce((sum, row) => sum + row.sourceWitnesses.length, 0),
    linkedRenderedFindingCount: new Set(rows.flatMap((row) => row.rdaFindingIds)).size,
    classificationCounts,
    rows,
};
writeFileSync(join(ROOT, "gate-contradiction-audit.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Gate contradiction audit\n\n` +
    `**Status:** formation research only\n` +
    `**Bound Glass source:** \`${SOURCE_BASE}\`\n` +
    `**Rows:** ${rows.length}\n` +
    `**Exact source witnesses:** ${output.sourceWitnessCount}\n\n` +
    `## Executive crux\n\n` +
    `The legacy fleet is not merely too large. Some gates reward the state the product must remove: compatibility redirects, silent renderer switching, semantic-value substitution, shallow source shape, exact gate-file counts, prose receipts, downstream dependency mirrors, tests or future prose laundered into product demand, static-literal/file rosters, duplicated taste values, fossilized internal paths, and property-name whitelists mislabeled as runtime truth. Others verify a leaf or registry while the composed browser remains broken. Therefore 403→40 cannot be a command aliasing exercise. It must delete command identities, bind every useful clause to a named family case, explicitly reject ceremony, and reverse a false oracle before deleting its command.\n\n` +
    table(["ID", "class", "legacy gate(s)", "rendered finding(s)", "canonical waves", "title"], rows.map((row) => [
        row.id,
        row.classification,
        row.legacyGateIds.join(", "),
        row.rdaFindingIds.join(", ") || "source audit",
        row.canonicalWaves.join(", "),
        row.title,
    ])) + `\n\n` +
    rows.map((row) => `## ${row.id} — ${row.title}\n\n` +
        `**What the old oracle rewards:** ${row.rewardedState}\n\n` +
        `**Current contradiction:** ${row.currentContradiction}\n\n` +
        `**Replacement predicate:** ${row.replacementPredicate}\n\n` +
        `**Retained negative control:** ${row.negativeControl}\n\n` +
        `**Exact witnesses:**\n\n${row.sourceWitnesses.map((item) => `- \`${item.path}:${item.lineStart}-${item.lineEnd}\` · blob \`${item.sourceBaseBlob}\` · excerpt sha256 \`${item.excerptSha256}\``).join("\n")}\n` +
        (row.liveProbe ? `\n**Observed command probe:** \`${row.liveProbe.command}\` exited \`${row.liveProbe.exitCode}\` at \`${row.liveProbe.repoHead}\`; script blob \`${row.liveProbe.scriptBlob}\`.\n\n${row.liveProbe.observedLines.map((line) => `- ${line}`).join("\n")}\n` : "") +
        (row.externalDemandCensus.length ? `\n**Tracked product-demand census:** ${row.externalDemandCensus.length} bound sibling repositories × ${row.externalDemandCensus[0].terms.length} exact terms; product matches \`${row.externalDemandCensus.reduce((sum, repo) => sum + repo.terms.reduce((inner, term) => inner + term.productMatches.length, 0), 0)}\`. Tests, scripts, docs, and built output are excluded from demand.\n` : "") +
        (row.externalImportEvidence.length ? `\n**Current external import evidence:**\n\n${row.externalImportEvidence.map((item) => `- \`${item.repository}@${item.repositoryHead}\` · \`${item.file}\` imports \`${item.binding}\` from \`${item.specifier}\``).join("\n")}\n` : "")
    ).join("\n") +
    `\n## Credit boundary\n\nThis audit is current-source and rendered-demo research. It changes formation predicates but grants no implementation, native-browser π, release, tag, publication, Atlas FINAL, or execution-authorization credit.\n`;
writeFileSync(join(ROOT, "GATE-CONTRADICTION-AUDIT.md"), md);

console.log(JSON.stringify({
    ok: true,
    rows: output.rowCount,
    witnesses: output.sourceWitnessCount,
    linkedRenderedFindings: output.linkedRenderedFindingCount,
    classificationCounts,
}, null, 2));
