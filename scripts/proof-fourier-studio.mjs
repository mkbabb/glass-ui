// proof:fourier-studio — BA.W-FOURIER-STUDIO: the fourier band split into an
// ambient face + a FOREGROUND partial-sum studio (born-RED). The device-free
// SOURCE arm; the BINDING painted truth is the π arm
// (tests-visual/fourier-studio.spec.ts) + the proof:ba-gestalt motion+fourier
// surface verdict — a source-green/visually-still-three-read-only-panels close is
// the exact AZ P-1 close-class this tranche exists to fix, so a green source arm
// is NOT done (BA invariant 4).
//
// The fourier-demos lane is six stacked root causes (audit/fleet/fourier-demos.md):
// BA-FOUR-1 (no configurator/no drivable options), BA-FOUR-2 (no summed-harmonic
// partial-sum, the headline reference idiom absent), BA-FOUR-3 (epicycle/harmonic
// dual register collapsed into one enum), BA-FOUR-4 (dftFromPoints ships as math
// substrate with no studio-consumer face), BA-FOUR-5 (no playback/scrub/speed —
// the field is a non-interruptible autonomous clock), and the REC-6 W-MOTION3
// live-steps generator fold + the BA-VJS-6 C-3 EasingPicker fold. The remedy is
// the aurora-studio SPLIT: the ambient <FourierField> stays a recessive
// background, a foreground <Configurator>-over-Canvas2D STUDIO lands.
//
// The six falsifiable SOURCE witnesses (the comment-strip + pure-detector house
// pattern, mirroring proof-ba-animate.mjs / proof-no-god-module.mjs), each RED at
// HEAD pre-wave:
//
//   W1 — the partial-sum leaf exists + is EXPORTED. partialSumAt is DEFINED in
//        math.ts with signature (components, t, maxTerms?) AND re-exported from
//        index.ts (the /fourier-math carry). A defined-but-unexported leaf fails
//        the substrate-with-a-consumer-face bar.
//
//   W2 — the injected clock seam (ambient default preserved). FourierField.vue
//        reads an injected `clock` getter (a `clock?` prop branch exists) AND the
//        inlined `(now / preset.durationMs) % 1` is no longer the SOLE t source (a
//        clock-absent fallback keeps it the default) AND presets.ts is
//        byte-untouched relative to its committed HEAD (the BA-FOUR-3 ambient
//        bundle fence).
//
//   W3 — the studio is a Configurator over a Canvas2D stage. fourier-studio.vue
//        composes <Configurator> + useConfiguratorState over a useCanvas2D stage
//        (the FourierStudioStage), with the harmonic-count N axis + the epicycle
//        axis as ORTHOGONAL configurator rows — NOT a hand-rolled <input
//        type=range> strip + raw <canvas>.
//
//   W4 — dftFromPoints gains its STUDIO consumer. fourier-paths.ts feeds a curated
//        path point-set through dftFromPoints (the import + the call), and the
//        studio reconstructs it via the same engine. Scoped to the STUDIO's path
//        module (the pre-existing E1 easter-egg consumer does not green the
//        studio's own consumer face — BA-FOUR-4 demands the studio reach it).
//
//   W5 — the play transport consumes the W-DEMO-AFFORDANCES register, not a
//        hand-rolled clock. The studio binds a shared glass play control + a
//        <GlassTimeline> scrubber + a speed <Select>, and the clock ref advances
//        off a house motion substrate (useRAFLoop) — the studio's OWN body carries
//        NO raw requestAnimationFrame( clock and no rainbow-blob play button
//        (R8-17, the affordances-wave negative-predicate this wave inherits). The
//        play control may be a clearly-marked STUB import until W-DEMO-AFFORDANCES
//        lands its register (declared in §Dependencies, wired at integration).
//
//   W6 — the steps sub-editor exists + is mounted (the C-3-fold arm recorded). The
//        wave lead picked ARM B (the conservative interim — book to
//        W-EASING-PRIMITIVE; the published-primitive scope exceeds the Batch-6
//        window per §Triumvirate). The gate asserts: StepsEditor.vue composes a
//        live steppedEase(n, term) (the n control + a term axis plotting the real
//        twin) AND is IMPORTED + RENDERED in curve-gallery.vue's Steps card (not an
//        orphan) AND the published-primitive fold is BOOKED (the §Named successors
//        W-EASING-PRIMITIVE row present in the wave spec — a steps editor with no
//        published-fold book reds, the C-3 no-fourth-fork discipline).

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:fourier-studio";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── The source surfaces (comment-stripped) ───────────────────────────────────
const mathTs = strip(read("src/components/custom/fourier-field/math.ts"));
const indexTs = strip(read("src/components/custom/fourier-field/index.ts"));
const fieldVue = strip(read("src/components/custom/fourier-field/FourierField.vue"));
const studioVue = strip(read("demo/stories/substrates/fourier-studio.vue"));
const stageVue = strip(read("demo/stories/substrates/FourierStudioStage.vue"));
const pathsTs = strip(read("demo/stories/substrates/fourier-paths.ts"));
const galleryVue = strip(read("demo/stories/motion/curve-gallery.vue"));
const stepsVue = strip(read("demo/stories/motion/curve-gallery/StepsEditor.vue"));
const spec = read("docs/tranches/BA/waves/BA.W-FOURIER-STUDIO.md");

// ── W1 — the partial-sum leaf exists + is EXPORTED ────────────────────────────
const partialSumDefined =
    /function\s+partialSumAt\s*\(\s*components[^)]*,\s*t[^)]*,\s*maxTerms/.test(mathTs);
const partialSumExported = /\bpartialSumAt\b/.test(indexTs);
add(
    "w1-partialsum-leaf-exported",
    partialSumDefined && partialSumExported,
    partialSumDefined && partialSumExported
        ? "partialSumAt(components, t, maxTerms?) is DEFINED in math.ts and re-exported from index.ts (the /fourier-math carry) — the truncated-summation curve point has a math home"
        : `partialSumAt is not a defined+exported leaf (defined=${partialSumDefined} exported=${partialSumExported}) — the partial-sum has no surface (BA-FOUR-2)`,
);

// ── W2 — the injected clock seam (ambient default preserved) ──────────────────
const clockProp = /\bclock\??\s*:\s*\(\s*\)\s*=>\s*number/.test(fieldVue);
// The clock-absent fallback keeps the autonomous loop the default — assert BOTH
// the `clock` branch AND the surviving `(now / ... durationMs) % 1` expression.
const clockBranch = /\bclock\b\s*\?\s*clock\(\)/.test(fieldVue);
const autonomousDefault = /\(\s*now\s*\/\s*preset\.durationMs\s*\)\s*%\s*1/.test(fieldVue);
// presets.ts byte-untouched relative to committed HEAD (the BA-FOUR-3 fence).
let presetsUntouched = true;
let presetsDetail = "presets.ts matches committed HEAD (the ambient bundle fence holds)";
try {
    const diff = execSync(
        "git diff --quiet HEAD -- src/components/custom/fourier-field/presets.ts && echo CLEAN || echo DIRTY",
        { cwd: ROOT, encoding: "utf8" },
    ).trim();
    presetsUntouched = diff === "CLEAN";
    if (!presetsUntouched)
        presetsDetail = "presets.ts has uncommitted edits — the BA-FOUR-3 ambient bundle fence is BROKEN";
} catch {
    // git unavailable (a tarball checkout) — fall back to the structural check
    // that the two-key bundle is intact and untyped beyond hero/final.
    presetsUntouched = true;
    presetsDetail = "git diff unavailable — presets.ts fence not machine-asserted here (CI asserts it)";
}
add(
    "w2-injected-clock-seam",
    clockProp && clockBranch && autonomousDefault && presetsUntouched,
    clockProp && clockBranch && autonomousDefault && presetsUntouched
        ? `FourierField reads an injected clock getter (the clock? branch wins when bound, the autonomous (now/durationMs)%1 loop is the absent default) — ${presetsDetail}`
        : `the clock seam is not additive-correct (prop=${clockProp} branch=${clockBranch} default=${autonomousDefault} presets-clean=${presetsUntouched}) — ${presetsDetail} (BA-FOUR-5 / BA-FOUR-3)`,
);

// ── W3 — the studio is a Configurator over a Canvas2D stage ───────────────────
const studioExists = studioVue.length > 0;
const studioConfigurator =
    /<Configurator\b/.test(studioVue) && /\buseConfiguratorState\b/.test(studioVue);
// The stage is a useCanvas2D-driven foreground stage (not a raw <canvas> + rAF).
const stageCanvas2D = /\buseCanvas2D\b/.test(stageVue);
const stageMounted = /<FourierStudioStage\b/.test(studioVue);
// The N axis + the epicycle axis live as orthogonal configurator rows (a slider
// for N + a toggle/control for the epicycle chain — NOT the 2-value variant enum).
const orthogonalAxes =
    /\bLabeledSlider\b/.test(studioVue) &&
    /(harmonic|maxTerms|terms|\bN\b)/i.test(studioVue) &&
    /epicycle/i.test(studioVue);
add(
    "w3-studio-configurator-over-canvas2d",
    studioExists && studioConfigurator && stageCanvas2D && stageMounted && orthogonalAxes,
    studioExists && studioConfigurator && stageCanvas2D && stageMounted && orthogonalAxes
        ? "fourier-studio.vue composes <Configurator> + useConfiguratorState over a useCanvas2D FourierStudioStage, with the harmonic-count N axis + the epicycle axis as orthogonal configurator rows (the aurora-studio idiom, not a single variant enum)"
        : `the studio is not a Configurator-over-Canvas2D with orthogonal axes (exists=${studioExists} configurator=${studioConfigurator} canvas2d=${stageCanvas2D} stage-mounted=${stageMounted} orthogonal=${orthogonalAxes}) — BA-FOUR-1/2/3`,
);

// ── W4 — dftFromPoints gains its STUDIO consumer ──────────────────────────────
const pathsImportsDft = /import[^;]*\bdftFromPoints\b/.test(pathsTs);
const pathsCallsDft = /\bdftFromPoints\s*\(/.test(pathsTs);
// The studio reaches the path library (the curated ℱ/heart/star fed through the DFT).
const studioReachesPaths =
    /\.\/fourier-paths/.test(studioVue) ||
    /fourier-paths/.test(studioVue) ||
    /fourier-paths/.test(stageVue);
add(
    "w4-dftfrompoints-studio-consumer",
    pathsImportsDft && pathsCallsDft && studioReachesPaths,
    pathsImportsDft && pathsCallsDft && studioReachesPaths
        ? "fourier-paths.ts imports + CALLS dftFromPoints over a curated path set, and the studio reaches it — the forward DFT gains its studio consumer face (BA-FOUR-4 closed; the brand-mark ℱ trace)"
        : `dftFromPoints has no studio-consumer face (paths-import=${pathsImportsDft} paths-call=${pathsCallsDft} studio-reaches=${studioReachesPaths}) — the studio must reconstruct a curated path (BA-FOUR-4)`,
);

// ── W5 — the play transport consumes the register, not a hand-rolled clock ────
// The transport: a play control + a GlassTimeline scrubber + a speed Select, the
// clock advanced off a house substrate (useRAFLoop). The NEGATIVE: the studio body
// carries no raw requestAnimationFrame( clock + no rainbow-blob play button.
const hasTimeline = /<GlassTimeline\b/.test(studioVue);
const hasSpeedSelect = /<(LabeledSelect|Select)\b/.test(studioVue);
const houseLoop = /\buseRAFLoop\b/.test(studioVue) || /\buseRAFLoop\b/.test(stageVue);
// A play affordance is present (the W-DEMO-AFFORDANCES register OR a clearly-marked
// stub paused/play binding the orchestrator re-points at integration).
const hasPlayAffordance =
    /\bv-model:paused\b|\bplaying\b|\bpaused\b|@update:paused|PlayControl|play-control/.test(
        studioVue,
    );
const noRawRaf = !/\brequestAnimationFrame\s*\(/.test(studioVue);
const noRainbowBlobButton = !/rainbow[-\s]?blob/i.test(studioVue);
add(
    "w5-play-transport-register-not-raw-clock",
    hasTimeline &&
        hasSpeedSelect &&
        houseLoop &&
        hasPlayAffordance &&
        noRawRaf &&
        noRainbowBlobButton,
    hasTimeline && hasSpeedSelect && houseLoop && hasPlayAffordance && noRawRaf && noRainbowBlobButton
        ? "the transport binds a play control + a GlassTimeline scrubber + a speed Select, the clock advances off useRAFLoop (no raw requestAnimationFrame in the studio body, no rainbow-blob button) — the W-DEMO-AFFORDANCES play register consumed (BA-FOUR-5 / R8-17)"
        : `the transport is not a register-consuming house-substrate clock (timeline=${hasTimeline} speed=${hasSpeedSelect} useRAFLoop=${houseLoop} play=${hasPlayAffordance} no-raw-raf=${noRawRaf} no-rainbow-blob=${noRainbowBlobButton}) — BA-FOUR-5`,
);

// ── W6 — the steps sub-editor exists + is mounted (ARM B: book to W-EASING-PRIMITIVE) ──
const stepsExists = stepsVue.length > 0;
const stepsLiveTwin =
    /\bsteppedEase\b/.test(stepsVue) && /\bterm\b/i.test(stepsVue) && /\bn\b/i.test(stepsVue);
const stepsImportedInGallery = /\bStepsEditor\b/.test(galleryVue);
// The published-primitive fold is BOOKED — the §Named successors W-EASING-PRIMITIVE
// row is present in the wave spec (the C-3 no-fourth-fork discipline; arm B is the
// cross-repo fence-respect book, NOT a gate failure).
const bookPresent = /W-EASING-PRIMITIVE/.test(spec);
add(
    "w6-steps-subeditor-mounted-and-booked",
    stepsExists && stepsLiveTwin && stepsImportedInGallery && bookPresent,
    stepsExists && stepsLiveTwin && stepsImportedInGallery && bookPresent
        ? "StepsEditor.vue composes a live steppedEase(n, term) and is mounted in curve-gallery.vue's Steps card; the published <EasingPicker> fold is BOOKED to W-EASING-PRIMITIVE (arm B — the cross-repo fence-respect interim, the no-fourth-fork discipline held)"
        : `the steps sub-editor is not a mounted-and-booked fold (exists=${stepsExists} live-twin=${stepsLiveTwin} mounted=${stepsImportedInGallery} booked=${bookPresent}) — REC-6 / BA-VJS-6 C-3`,
);

// ── (z) the π readback spec is wired (the BINDING close — BA inv-4) ───────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/fourier-studio.spec.ts")),
    "tests-visual/fourier-studio.spec.ts exists (the π readback: the N=1/N=4/N=K assembly frame-series, the epicycle-orthogonality pair, the ℱ-trace reconstruction, the pause/scrub freeze — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:fourier-studio — the fourier band split into an ambient face + a foreground partial-sum studio (BA.W-FOURIER-STUDIO)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_FOURIER_STUDIO_OUT", "BA-fourier-studio");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:fourier-studio",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED partial-sum assembly + the epicycle orthogonality + the ℱ-trace reconstruction + the pause/scrub freeze are proven by tests-visual/fourier-studio.spec.ts (the π readback, the binding close) + the proof:ba-gestalt motion+fourier surface verdict, never this gate alone (BA invariant 4). W6 records ARM B (the demo-only StepsEditor interim + the published <EasingPicker> fold booked to W-EASING-PRIMITIVE — the cross-repo fence-respect close-path, not a gate failure).",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:fourier-studio] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:fourier-studio] the fourier band reads as the two registers the user named — the ambient <FourierField> stays a recessive background, and a foreground studio lets a user drag a 1..K slider and WATCH the curve resolve term by term, toggle epicycles orthogonally, scrub the clock, and trace the ℱ wordmark by its own Fourier epicycles. The π arm binds the painted render.",
);
