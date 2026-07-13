#!/usr/bin/env node
// BC.W-VIZ-INTERACTION — proof:viz-interaction, the cross-cutting "every procedural
// background reacts to cursor + touch with velocity AND acceleration" enforcement floor.
//
// THE BB DISEASE THIS CURES (SYNTHESIS class 2 — source-mechanism-gate-not-paint-gate):
// the shared pointer-physics field (`usePointerVelocityField`) was minted EARLY (BB.B4)
// "so the born-WebGPU viz consume it at birth" — and then NO viz wired it. The grep
// `rg usePointerVelocityField src/components/custom/{viz}/` is EMPTY across the whole
// suite (viz-codebase.md §8). The only gate that should catch the unmet ≥2-consumer bar
// (`proof:pointer-velocity` V5) was BLIND BY DESIGN: it greened off DOC PROSE
// (`evidenceExists && evidenceNamesBooked && evidenceHasReaudit`), never running the real
// `src/components/custom/…` grep the consumer-evidence doc promised. So the field greened
// on a shelf with zero consumers while the user's exact ask — "velocity AND acceleration,
// real-time touch/pointer reactivity, gel-like flexibility" (USER-DEFECTS §D) — stayed
// structurally UNMET across every procedural background.
//
// THIS GATE is the SUBSTRATE-FLOOR enforcement net for the per-viz wiring. Each per-viz
// wave (BC.W-VIZ-AURORA / GOOBLOB-MEATBALL / VIZ-DOTFLOW / VIZ-CONCENTRIC / VIZ-CONSTELLATION
// / VIZ-FOURIER / VIZ-DOTMATRIX / VIZ-HYBRID) WIRES its own mapping; this wave owns the
// shared field + the gate that ENFORCES the real call sites. It is born-RED at the
// substrate-floor close (every per-viz grep EMPTY — the actual HEAD paint) and goes GREEN
// only when the per-viz waves wire the field AND read BOTH velocity AND acceleration/burst.
// Mid-build RED is BY-DESIGN (the EXECUTION-PROGRESS cardinal note): a per-viz wave that
// forgets the field, or reads velocity-only (skipping the user's accel ask), REDs here.
//
// Clauses (each falsifiable; the source clauses carry self-test bites):
//   V1 (source) — the `usePointerVelocityField` grep over each canvas viz finds a REAL
//      call site (the field is IMPORTED and `.tick(` is fed from a frame callback). Born-
//      RED on HEAD (every grep EMPTY). This is the enforced grep `proof:pointer-velocity`
//      V5 promised but never ran.
//   V2 (source) — each wired viz reads BOTH `velocity` AND `acceleration`/`burst` (the
//      velocity-only half is not enough — the user's accel ask is the bar). A viz that
//      imports the field and feeds `.tick` but reads only `velocity` REDs.
//   V3 (source) — no viz pointer composable adds its OWN rAF for the pointer (the `tick()`
//      is fed from the EXISTING createCanvasLifecycle callback). A `requestAnimationFrame(`
//      added inside a viz pointer wiring REDs (the one-loop / proof:offscreen-pause floor).
//   V4 (source) — each interactive demo story PASSES `:interactive` (or the viz's own
//      enable-prop) — the aurora demo-unwired dead-flow class (viz-codebase.md §1): a viz
//      whose `interactive` defaults false AND whose story never enables it REDs.
//   V5/V6 (paint, local) — the binding paint truth is the LOCAL π lane
//      `tests-visual/viz-interaction.spec.ts`: a synthetic pointer sweep + flick over the
//      canvas makes the COMPOSITED frame DIFFER between rest / mid-sweep / post-flick
//      (velocity AND acceleration each paint a distinguishable response), and the PRM run
//      produces NO pixel change (the freeze honored). This gate ASSERTS the π spec exists
//      + is enrolled (the source half); the real sweep/flick pixel-diff runs `--run pi` on
//      real Metal (the orchestrator owns the capture).
//
// + the self-test bite (the SYNTHESIS class 2 cure, proven every run): a synthetic viz
//   that imports + ticks the field reads as WIRED (V1 greens on it); a synthetic viz that
//   reads velocity-only is flagged by V2; a synthetic pointer composable that forks an
//   own rAF is flagged by V3. The prose-green path is GONE — a doc with a re-audit clause
//   but ZERO real call site no longer greens.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The canvas-viz dirs every interactive procedural background lives in. dot-matrix is a
// forward-looking per-viz wave (BC.W-VIZ-DOTMATRIX mints the dir) — it is enrolled the
// moment its dir lands (a present-but-unwired dir REDs V1, the substrate-floor enforcement;
// an absent dir is not yet a violation — the wave that mints it wires the field in the same
// cut). The six EXTANT viz dirs are the binding enforcement set at HEAD.
const VIZ = [
    { id: "aurora", dir: "src/components/custom/aurora" },
    { id: "blob", dir: "src/components/custom/blob" },
    { id: "constellation", dir: "src/components/custom/constellation" },
    { id: "dot-flow-field", dir: "src/components/custom/dot-flow-field" },
    { id: "concentric", dir: "src/components/custom/concentric" },
    { id: "fourier-field", dir: "src/components/custom/fourier-field" },
    // dot-matrix: minted by BC.W-VIZ-DOTMATRIX — enrolled below when the dir lands.
    { id: "dot-matrix", dir: "src/components/custom/dot-matrix" },
];

// The interactive demo stories — V4 reads the `:interactive` (or the viz enable-prop) pass.
// The substrate stories live under demo/stories/substrates/. A story for a viz whose
// `interactive` config defaults false MUST pass the prop (the aurora dead-flow close).
const STORY_DIR = "demo/stories/substrates";

const PI_SPEC = "tests-visual/viz-interaction.spec.ts";

const FILES = {
    pointerVelocityGate: "scripts/proof-pointer-velocity.mjs",
    evidence: "docs/consumer-evidence/use-pointer-velocity-field.md",
};

function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}

// Strip JS line- + block-comments so a detector matches REAL source, not a docstring
// example (the house comment-strip pattern; URL-safe `://` preserved).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else acc.push(p);
    }
    return acc;
}

// ── The per-viz wiring detector (PURE — exported for the self-test bites). Given the
//    CONCATENATED stripped source of a viz's TS/Vue files, decide whether it WIRES the
//    shared field: (a) imports/names `usePointerVelocityField`, (b) feeds `.tick(` (the
//    renderer-fed push-step), (c) reads BOTH `velocity` AND an accel/burst axis. A viz
//    that only feeds `.tick` but never reads an accel axis is velocity-only (V2 RED).
export function detectVizWiring(concatSrc) {
    const src = stripComments(concatSrc);
    // (a) the field is named (an import OR a `usePointerVelocityField(` call). The grep
    // proof:pointer-velocity V5 always meant: a REAL call site, not a doc mention.
    const namesField = /\busePointerVelocityField\b/.test(src);
    const callsField = /\busePointerVelocityField\s*\(/.test(src);
    // (b) the renderer FEEDS the field: a `.tick(` call (the push-step from the
    // createCanvasLifecycle frame callback) on the field handle.
    const feedsTick = /\.tick\s*\(/.test(src) && namesField;
    // (c) reads VELOCITY (or speed — the scalar magnitude is the velocity read).
    const readsVelocity =
        namesField &&
        (/\.velocity\b/.test(src) || /\.speed\b/.test(src));
    // (c') reads ACCELERATION or the flick BURST (the second-derivative axis — the user's
    // explicit accel ask, the non-negotiable bar).
    const readsAccel =
        namesField &&
        (/\.acceleration\b/.test(src) || /\.burst\b/.test(src));
    return {
        namesField,
        callsField,
        feedsTick,
        readsVelocity,
        readsAccel,
        // WIRED iff it calls the field, feeds tick, AND reads both axes (the full bar).
        wired: callsField && feedsTick && readsVelocity && readsAccel,
        velocityOnly: callsField && feedsTick && readsVelocity && !readsAccel,
    };
}

// ── The own-rAF detector (V3) — a viz pointer composable that forks its OWN
//    requestAnimationFrame / setInterval for the pointer breaks the one-loop discipline.
//    PURE — exported for the self-test bite. The renderer's createCanvasLifecycle loop is
//    the only rAF; the field is a tick()-fed push-API. We scan ONLY the viz's POINTER
//    composables (a file whose name carries Pointer/Cursor/Interaction) — the renderer's
//    own canvas loop legitimately calls rAF (it owns the frame loop), so a blanket scan
//    would false-flag it.
export function detectOwnPointerRaf(pointerSrc) {
    const src = stripComments(pointerSrc);
    const forksRaf = /\brequestAnimationFrame\s*\(/.test(src);
    const forksInterval = /\bsetInterval\s*\(/.test(src);
    return { forksRaf, forksInterval, forksOwnLoop: forksRaf || forksInterval };
}

// Concatenate a viz dir's TS + Vue source (excluding tests + shaders — the wiring lives in
// the composables + the SFC, never the .glsl.ts/.wgsl.ts shader strings).
function vizSource(dirRel) {
    const dir = resolve(ROOT, dirRel);
    const files = walk(dir).filter(
        (p) =>
            (/\.ts$/.test(p) || /\.vue$/.test(p)) &&
            !/\.(test|spec)\.ts$/.test(p) &&
            !/\.(glsl|wgsl)\.ts$/.test(p),
    );
    return files.map((f) => readFileSync(f, "utf8")).join("\n\n");
}

// The viz POINTER composables (for the V3 own-rAF scan) — a file under the viz dir whose
// name carries the pointer/cursor/interaction noun (the wiring lives there, not the
// renderer).
function vizPointerComposables(dirRel) {
    const dir = resolve(ROOT, dirRel);
    return walk(dir).filter(
        (p) =>
            /\.ts$/.test(p) &&
            !/\.(test|spec)\.ts$/.test(p) &&
            /(Pointer|Cursor|Interaction)/.test(p),
    );
}

function run() {
    const violations = [];
    const facts = {};

    // ── V1 + V2 + V3 — the per-viz wiring + velocity-AND-accel + no-own-rAF scan.
    const vizFacts = [];
    for (const { id, dir } of VIZ) {
        const present = existsSync(resolve(ROOT, dir));
        if (!present) {
            // An absent forward-looking viz dir (dot-matrix before BC.W-VIZ-DOTMATRIX) is
            // not yet a violation — the wave that MINTS the dir wires the field in the same
            // cut. We record it absent + skip.
            vizFacts.push({ id, present: false, wired: false });
            continue;
        }
        const det = detectVizWiring(vizSource(dir));
        // V3 — the pointer composables must not fork an own rAF for the pointer.
        const pointerFiles = vizPointerComposables(dir).map((p) => p.slice(ROOT.length + 1));
        let ownRaf = false;
        for (const f of vizPointerComposables(dir)) {
            const r = detectOwnPointerRaf(readFileSync(f, "utf8"));
            if (r.forksOwnLoop) ownRaf = true;
        }
        vizFacts.push({
            id,
            present: true,
            namesField: det.namesField,
            callsField: det.callsField,
            feedsTick: det.feedsTick,
            readsVelocity: det.readsVelocity,
            readsAccel: det.readsAccel,
            wired: det.wired,
            velocityOnly: det.velocityOnly,
            pointerFiles,
            ownRaf,
        });

        // V1 — the grep finds a REAL call site (imported + tick-fed).
        if (!det.callsField || !det.feedsTick)
            violations.push(
                `[V1] ${id}: usePointerVelocityField is not wired — ${det.callsField ? "" : "no usePointerVelocityField() call site; "}${det.feedsTick ? "" : "no .tick(delta) feed from the frame callback"} (the per-viz wave must IMPORT the shared field and FEED tick() from its createCanvasLifecycle loop — the enforced grep proof:pointer-velocity V5 promised)`,
            );
        // V2 — reads BOTH velocity AND acceleration/burst (the velocity-only half is not
        //      the user's accel ask).
        else if (det.velocityOnly)
            violations.push(
                `[V2] ${id}: reads VELOCITY but not ACCELERATION/burst — the user's ask is "velocity AND acceleration" (the second derivative). Read field.acceleration / field.burst into a DISTINCT one-shot response (a flick burst), not only field.velocity`,
            );
        else if (!det.readsVelocity || !det.readsAccel)
            violations.push(
                `[V2] ${id}: missing a derivative read — velocity:${det.readsVelocity} accel/burst:${det.readsAccel} (both axes are required: steady-drag velocity + the flick accel burst)`,
            );
        // V3 — no own rAF in the pointer composables.
        if (ownRaf)
            violations.push(
                `[V3] ${id}: a viz pointer composable forks its OWN requestAnimationFrame/setInterval (${pointerFiles.join(", ")}) — the field is a tick()-fed push-API the renderer feeds from its EXISTING createCanvasLifecycle loop (the one-loop / proof:offscreen-pause discipline)`,
            );
    }
    facts.viz = vizFacts;
    const extantWired = vizFacts.filter((v) => v.present && v.wired).length;
    const extantPresent = vizFacts.filter((v) => v.present).length;
    facts.wiredCount = extantWired;
    facts.presentCount = extantPresent;

    // ── V4 — each interactive demo story PASSES :interactive (the dead-flow close). The
    //    aurora story (viz-codebase.md §1) NEVER wired the cursor — the field is dead in
    //    the demo. A substrate story whose viz config `interactive` defaults false MUST
    //    pass the prop (or the viz's own enable-prop). We scan the substrate story SFCs.
    const storyDir = resolve(ROOT, STORY_DIR);
    const storyFacts = [];
    if (existsSync(storyDir)) {
        for (const { id } of VIZ) {
            const storyPath = join(storyDir, `${id}.vue`);
            if (!existsSync(storyPath)) {
                storyFacts.push({ id, storyExists: false });
                continue;
            }
            const story = stripComments(readFileSync(storyPath, "utf8"));
            // The story passes `:interactive` (bound or shorthand) on its viz element.
            const passesInteractive =
                /:interactive\b/.test(story) || /\binteractive\b/.test(story);
            storyFacts.push({ id, storyExists: true, passesInteractive });
            // Only enforce V4 on a viz that is itself WIRED (the story-pass is the
            // demo-side enable; an unwired viz's story-pass is moot until the per-viz wave
            // lands). A WIRED viz whose story does NOT pass :interactive is the dead-flow
            // class (the field wired but unreachable in the demo).
            const vizWired = vizFacts.find((v) => v.id === id)?.wired;
            if (vizWired && !passesInteractive)
                violations.push(
                    `[V4] ${id}: the demo story ${STORY_DIR}/${id}.vue does not pass :interactive — the field is wired but DEAD in the demo (the aurora dead-flow class, viz-codebase.md §1). The interactive viz must be reachable on its :5199 route`,
                );
        }
    }
    facts.stories = storyFacts;

    // ── V5/V6 — the binding paint truth is the LOCAL π lane. The source half here ASSERTS
    //    the π spec exists + reads the right things (the runner picks it up by the
    //    non-private glob — pi-runner-manifest.mjs). The real sweep/flick pixel-diff + the
    //    PRM no-diff run `--run pi` on real Metal (the orchestrator owns the capture).
    facts.piSpecExists = existsSync(resolve(ROOT, PI_SPEC));
    if (!facts.piSpecExists)
        violations.push(
            `[V5/V6] the real-paint π spec ${PI_SPEC} is absent — the V5 rest/sweep/flick pixel-diff (velocity AND accel each paint a distinguishable response) + the V6 PRM no-diff lanes have no home`,
        );
    else {
        const spec = readFileSync(resolve(ROOT, PI_SPEC), "utf8");
        // The spec drives a sweep + a flick and pixel-diffs the composited frame; under PRM
        // it asserts NO diff. We assert it reads a frame diff + drives a pointer + carries
        // the PRM arm.
        const hasFrameDiff = /diff|pixelDiff|frameDiff|getImageData|screenshot/i.test(spec);
        const drivesPointer = /pointer|sweep|flick|dispatchEvent|mouse\.move|\.move\(/i.test(spec);
        const hasPrmArm = /reduced[-\s]?motion|prefers-reduced|emulateMedia/i.test(spec);
        facts.piSpecFrameDiff = hasFrameDiff;
        facts.piSpecDrivesPointer = drivesPointer;
        facts.piSpecPrmArm = hasPrmArm;
        if (!hasFrameDiff)
            violations.push(
                "[V5] the π spec must pixel-diff the composited frame (rest vs sweep vs flick — the binding paint truth a source grep cannot give)",
            );
        if (!drivesPointer)
            violations.push(
                "[V5] the π spec must drive a synthetic pointer sweep + flick over the canvas (the velocity + acceleration response)",
            );
        if (!hasPrmArm)
            violations.push(
                "[V6] the π spec must carry the PRM arm (under prefers-reduced-motion the sweep/flick produces NO pixel change — the freeze honored)",
            );
    }

    // ── The gate-blindness close (deliverable D): proof:pointer-velocity's prose-green path
    //    is REMOVED — its V5 now runs the REAL src/components/custom/ grep, not the doc
    //    prose. We assert the sibling gate no longer carries the
    //    `evidenceNamesBooked && evidenceHasReaudit` prose-green expression (the
    //    SYNTHESIS class 2 cure is permanent — a future agent cannot re-blind it).
    if (existsSync(resolve(ROOT, FILES.pointerVelocityGate))) {
        // Strip comments first — the docstring legitimately NAMES the removed prose-green
        // expression to explain the cure; the disease is the LIVE code path, not the prose.
        const pvGate = stripComments(read(FILES.pointerVelocityGate));
        // The disease form: the OR branch greening V5 off the doc alone
        // (`evidenceExists && evidenceNamesBooked && evidenceHasReaudit`).
        const carriesProseGreen =
            /evidenceExists\s*&&\s*evidenceNamesBooked\s*&&\s*evidenceHasReaudit/.test(
                pvGate,
            );
        // The cure form: V5 runs the real per-viz grep over src/components/custom/{viz}/.
        const runsRealGrep =
            /components\/custom/.test(pvGate) &&
            /usePointerVelocityField\s*\(/.test(pvGate);
        facts.pointerVelocityProseGreenRemoved = !carriesProseGreen;
        facts.pointerVelocityRunsRealGrep = runsRealGrep;
        if (carriesProseGreen)
            violations.push(
                "[self-test/D] proof:pointer-velocity still carries the prose-green V5 path (evidenceExists && evidenceNamesBooked && evidenceHasReaudit) — it must be REMOVED for the real src/components/custom/ grep (the SYNTHESIS class 2 cure — a doc with zero real call site must RED)",
            );
        if (!runsRealGrep)
            violations.push(
                "[self-test/D] proof:pointer-velocity does not run the real src/components/custom/{viz}/ usePointerVelocityField() grep its consumer-evidence doc promised — re-point V5 to the live call-site grep",
            );
    }

    // ── self-test bites (anti-evasion — each PROVEN every run) ──────────────────
    const bites = [];
    {
        // Bite 1 (V1) — a synthetic WIRED viz (imports + ticks + reads both axes) reads as
        //   wired; a doc-only mention does NOT.
        const WIRED = `
import { usePointerVelocityField } from "@mkbabb/glass-ui/motion-core";
const field = usePointerVelocityField();
function onFrame({ delta }) { field.tick(delta); upload({ v: field.velocity.value, a: field.acceleration.value }); }`;
        const DOC_ONLY = `/* see usePointerVelocityField — booked for W-FLOWFIELD */ const x = 1;`;
        const wiredDet = detectVizWiring(WIRED);
        const docDet = detectVizWiring(DOC_ONLY);
        const ok = wiredDet.wired && !docDet.wired && !docDet.callsField;
        bites.push({ id: "V1-wired-vs-doc", ok });
        if (!ok)
            violations.push(
                `[self-test] the V1 wiring detector is broken (wired:${JSON.stringify({ w: wiredDet.wired })}, doc:${JSON.stringify({ call: docDet.callsField })}) — a real call site must read wired; a doc-only mention must not`,
            );
    }
    {
        // Bite 2 (V2) — a velocity-only viz (ticks + reads velocity, never accel) is flagged.
        const VEL_ONLY = `
import { usePointerVelocityField } from "@mkbabb/glass-ui/motion-core";
const field = usePointerVelocityField();
function onFrame({ delta }) { field.tick(delta); upload({ v: field.velocity.value }); }`;
        const det = detectVizWiring(VEL_ONLY);
        const ok = det.velocityOnly && !det.wired && !det.readsAccel;
        bites.push({ id: "V2-velocity-only", ok });
        if (!ok)
            violations.push(
                `[self-test] the V2 velocity-only bite is broken (${JSON.stringify({ velocityOnly: det.velocityOnly, wired: det.wired })}) — a viz reading velocity but no accel/burst must be flagged (the user's accel ask)`,
            );
    }
    {
        // Bite 3 (V3) — a pointer composable that forks an own rAF is flagged; a tick-fed one
        //   is not.
        const OWN_RAF = `function loop(){ requestAnimationFrame(loop); }`;
        const TICK_FED = `function tick(dt){ smooth(dt); }`;
        const rafDet = detectOwnPointerRaf(OWN_RAF);
        const tickDet = detectOwnPointerRaf(TICK_FED);
        const ok = rafDet.forksOwnLoop && !tickDet.forksOwnLoop;
        bites.push({ id: "V3-own-raf", ok });
        if (!ok)
            violations.push(
                `[self-test] the V3 own-rAF bite is broken (raf:${rafDet.forksOwnLoop}, tick:${tickDet.forksOwnLoop}) — a forked pointer rAF must be flagged; a tick()-fed push must pass`,
            );
    }
    facts.selfTestBites = bites;

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_VIZ_INTERACTION_ARTIFACT",
        "BC-viz-interaction",
    );
    writeGateArtifact(ARTIFACT, {
        gate: "proof:viz-interaction",
        status,
        generatedAt: snapshotStamp(),
        facts,
        violations,
    });

    console.log(
        "proof:viz-interaction — EVERY procedural background reacts to cursor/touch with velocity AND acceleration (BC.W-VIZ-INTERACTION)",
    );
    console.log(
        `  V1/V2 per-viz wiring (present ${extantPresent}, wired ${extantWired}):`,
    );
    for (const v of vizFacts) {
        if (!v.present) {
            console.log(`    ${v.id.padEnd(16)} — dir absent (forward-looking; enrolled when minted)`);
            continue;
        }
        const tag = v.wired
            ? "WIRED ✓ (velocity+accel)"
            : v.velocityOnly
              ? "velocity-only ✗ (no accel)"
              : v.callsField
                ? "partial ✗ (no tick/accel)"
                : "UNWIRED ✗ (no call site)";
        console.log(
            `    ${v.id.padEnd(16)} — ${tag}${v.ownRaf ? " · OWN-rAF ✗" : ""}`,
        );
    }
    console.log(
        `  V5/V6 π spec      : ${facts.piSpecExists ? `present ✓ (frame-diff:${facts.piSpecFrameDiff ? "✓" : "✗"} pointer:${facts.piSpecDrivesPointer ? "✓" : "✗"} PRM:${facts.piSpecPrmArm ? "✓" : "✗"}) — the rest/sweep/flick pixel-diff runs --run pi` : "ABSENT ✗"}`,
    );
    console.log(
        `  D gate-blindness  : prose-green removed:${facts.pointerVelocityProseGreenRemoved ? "✓" : "✗ STILL BLIND"} real-grep:${facts.pointerVelocityRunsRealGrep ? "✓" : "✗"}`,
    );
    console.log(
        `  self-test bites   : ${(facts.selfTestBites ?? []).map((b) => `${b.id}:${b.ok ? "✓" : "BROKEN"}`).join(" · ")}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS (born-RED until the per-viz waves wire the field):");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
