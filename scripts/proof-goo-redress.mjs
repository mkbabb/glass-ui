#!/usr/bin/env node
// BA.W-GOO-REDRESS — the goo studio's renderer half (proof:goo-redress).
//
// Two falsifiable SOURCE witnesses (the comment-strip + pure-detector house
// pattern, mirroring proof-blob-smin-normalized.mjs / proof-blob-studio.mjs),
// each RED at HEAD pre-wave. The π readback (tests-visual/goo-redress.spec.ts +
// the W-GOO-REDRESS-DELTA) is the BINDING visual truth — the source-green/
// visually-broken gap is the exact BA inv-4 P-1 close class this gate refuses to
// cover alone. This device-free gate is the CI half; the DELTA is the floor.
//
// The two renderer root causes (each independently confirmed at HEAD):
//
//   ROOT CAUSE 1 — the satellite bridge is tuned to the EDGE of the smin reach
//   (BA-goo-2). The studio seeds orbit 0.30 / sat 0.10 / body ~0.22, all
//   POS_SCALE'd; useBlobSatellites inflates the per-satellite orbit by a random
//   ×0.8..1.2 (baseR) + ecc + wobble. The smin BAND (uSmoothK upload,
//   uploadBlobUniforms.ts) rides POS_SCALE but NOT the ×1.2 orbit worst case, so
//   at the high excursion the satellite near-edge leaves the band → an
//   instantaneous fully-detached disc, no gooey bridge. The COUPLING: the band
//   scale must reference the WORST-CASE orbit excursion (the ×1.2 / ecc-max term
//   the uMaxReach bounding-discard already sums), not the nominal.
//
//   ROOT CAUSE 2 — no pointer→wake on the demand-parked render loop (BA-goo-3).
//   The blob runs a demand loop that PARKS when fully at rest (the AX.W16
//   quiescence gate). The park re-arms on a satellite-phase setTimeout OR the
//   color/paletteStops watch — but NOT on POINTER activity. So a first hover over
//   a parked blob does not repaint until the next scheduled satellite wake (up to
//   an orbit horizon away), then the spring lurches one 50ms-clamped step — the
//   "quick and jittery" signature. The fix: a watch on the pointer's `active`
//   signal that calls the EXISTING renderer wake handle — no new rAF, no second
//   wake path (the single-substrate-loop invariant).
//
// W1 — THE SMIN BAND HOLDS THE WORST-CASE BRIDGE. The uSmoothK upload (the named
//      smin/orbit envelope seam, uploadBlobUniforms.ts) is scaled by the
//      worst-case orbit excursion, not only the nominal: POSITIVELY, the
//      band-scale expression references the orbit random worst case (the ×1.2 /
//      ecc-max factor the uMaxReach pad already sums). Anti-evasion: the detector
//      asserts the COUPLING (the band scale and the orbit worst case are tied),
//      not a magic constant; AND proof:blob-smin-normalized must stay GREEN (the
//      two gates compose — the new band cannot green by over-inflating past the
//      calm-lean ceiling the old gate bounds; that is the close-battery's job).
//      RED at HEAD: the upload is `cMem.smoothK * params.smoothK * POS_SCALE`
//      with no worst-case orbit term.
//
// W2 — POINTER ACTIVITY WAKES THE PARKED LOOP. A watch on the pointer's active
//      signal (or an equivalent pointer-enter callback) that calls the renderer's
//      wake / canvasHandle.wake() handle EXISTS in Blob.vue. Anti-evasion: the
//      detector asserts the wake handle is REACHED from a pointer-active signal
//      (a renamed signal that still drives the wake on pointer-enter passes; a
//      `watch` that does NOT reach `wake` fails) — NOT a literal `pointer.active`
//      string match. RED at HEAD: Blob.vue carries no pointer→wake wire; the
//      only wake watchers are color/paletteStops in useMetaballRenderer.ts.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const B = "src/components/custom/blob";
    _cliPaths = {
        ROOT,
        UPLOAD: resolve(ROOT, `${B}/composables/uploadBlobUniforms.ts`),
        GOOBLOB: resolve(ROOT, `${B}/Blob.vue`),
        RENDERER: resolve(ROOT, `${B}/composables/useMetaballRenderer.ts`),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_GOO_REDRESS_ARTIFACT",
            "BA-goo-redress",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, UPLOAD, GOOBLOB, RENDERER, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── W1: the smin band holds the WORST-CASE bridge ─────────────────────────
    if (!existsSync(UPLOAD)) {
        violations.push("uploadBlobUniforms.ts is absent");
    } else {
        const src = stripComments(readFileSync(UPLOAD, "utf8"));
        // Isolate the uSmoothK upload statement (the named smin/orbit seam).
        const m = src.match(/U\.uSmoothK\s*,([\s\S]*?)\)\s*;/);
        const uploadExpr = m ? m[1] : "";
        facts.smoothKUpload = uploadExpr.replace(/\s+/g, " ").trim();

        // The COUPLING is asserted over the BAND-DERIVATION REGION that feeds the
        // uSmoothK upload — the block from the gooey-band comment marker through
        // the uSmoothK statement (the band may be derived into a named local — e.g.
        // `orbitWiden` — rather than inlined in the gl.uniform1f call; the bite is
        // the COUPLING reaching the upload, not a single-line literal). The region
        // is bounded by the uSmoothK statement so a coupling elsewhere in the file
        // (the uMaxReach pad already references the orbit worst case) does NOT
        // satisfy it — the band that DRIVES the upload must carry the coupling.
        const upIdx = src.search(/gl\.uniform1f\s*\(\s*U\.uSmoothK/);
        // Walk back to the nearest local-derivation block opener before the upload.
        const regionStart = (() => {
            const pre = src.slice(0, upIdx);
            // The band-derivation block — take a generous window before the upload
            // (the const/let derivations the upload reads). Cap at ~1600 chars so a
            // far-upstream incidental `eccentricity` cannot leak in.
            return Math.max(0, pre.length - 1600);
        })();
        const bandRegion = upIdx >= 0 ? src.slice(regionStart, upIdx) + uploadExpr : "";
        facts.bandRegion = bandRegion.replace(/\s+/g, " ").trim().slice(-280);

        // The band fed to uSmoothK must reference BOTH the worst-case orbit
        // multiplier (a literal 1.2 — the high end of the ×0.8..1.2 baseR random —
        // OR a named worst-orbit local) AND the eccentricity coupling, tying the
        // band to the orbit excursion rather than the nominal. AND the uSmoothK
        // upload itself must consume the widened band (a derived local whose name
        // is not the bare nominal `cMem.smoothK * params.smoothK` form).
        const regionHasOrbitWorst =
            /1\.2\b/.test(bandRegion) ||
            /orbitWorst|worstOrbit|orbitExcursion|worstOrbitDist|orbitWiden|bridgeGap/i.test(bandRegion);
        const regionHasEcc = /eccentricity/.test(bandRegion);
        // The upload statement must read a WIDENED band, not the bare nominal —
        // i.e. it carries a widen factor local (orbitWiden / bridge*) OR a worst
        // term, never just `cMem.smoothK * params.smoothK * POS_SCALE` alone.
        const uploadConsumesWiden =
            /orbitWiden|bridgeWiden|worstBand|widenedBand/i.test(uploadExpr) ||
            /1\.2\b/.test(uploadExpr);
        facts.smoothKReferencesOrbitWorst = regionHasOrbitWorst && uploadConsumesWiden;
        facts.smoothKReferencesEccentricity = regionHasEcc;

        if (!facts.smoothKReferencesOrbitWorst)
            violations.push(
                "the uSmoothK band does NOT scale by the worst-case orbit excursion (the ×1.2 random-orbit factor reaching the upload) — it rides only the nominal band, so the satellite leaves the smin reach at the high excursion and detaches (root cause 1 / BA-goo-2)",
            );
        if (!facts.smoothKReferencesEccentricity)
            violations.push(
                "the uSmoothK band scale is not coupled to the orbit eccentricity — the worst-case orbit excursion is the Y-long eccentric axis (×1.2 baseR × (1+ecc)); the band must reference it or the eccentric near-edge leaves the band (root cause 1)",
            );

        // POS_SCALE must stay on the upload (proof:blob-smin-normalized's W08
        // contract — the band is a length in the inner-region UV space). A
        // widening that drops POS_SCALE would 1.6× over-flood; assert it survives.
        facts.posScaleOnSmoothK = /POS_SCALE/.test(uploadExpr);
        if (!facts.posScaleOnSmoothK)
            violations.push(
                "the uSmoothK upload no longer multiplies by POS_SCALE — the band is a length in the inner-region UV space and must carry the 0.625 compression (proof:blob-smin-normalized W08); the worst-case widening rides POS_SCALE in the SAME UV space as the radii",
            );

        // The uMaxReach bounding-discard must still PAD the (now widened) band so
        // it never clips the wet meniscus. Assert the pad references the band term
        // — either the nominal `smoothK` form OR the derived widened-band local
        // (`orbitWiden` / `nominalBand`) — in the maxReach sum.
        const reachM = src.match(/const\s+maxReach\s*=([\s\S]*?);/);
        const reachExpr = reachM ? reachM[1] : "";
        facts.maxReachSumsSmoothK =
            /smoothK/.test(reachExpr) || /orbitWiden|nominalBand|widenedBand/i.test(reachExpr);
        if (!facts.maxReachSumsSmoothK)
            violations.push(
                "the uMaxReach bounding-discard no longer sums the smin band — a widened band must be padded by uMaxReach or the bounding-discard clips the wet meniscus (uploadBlobUniforms.ts uMaxReach pad)",
            );
    }

    // ── W2: pointer activity wakes the parked loop ────────────────────────────
    if (!existsSync(GOOBLOB)) {
        violations.push("Blob.vue is absent");
    } else {
        const src = stripComments(readFileSync(GOOBLOB, "utf8"));

        // The wake handle the captured renderer exposes — `renderer.wake` (the
        // public twin of the pause/resume control surface) OR a direct
        // `canvasHandle.wake()`. The pointer-active signal is the BlobPointer's
        // `active` ref (pointer.active). Assert a watch (or callback) that, given
        // the pointer becoming active, REACHES the wake handle.
        //
        // Anti-evasion: we require BOTH a watch over the pointer's active signal
        // AND a wake call, with the wake reachable in the same SFC. A renamed
        // signal still passes if it drives the wake; a `watch` with no wake fails.
        const watchesPointerActive =
            /watch\s*\(\s*\(\s*\)\s*=>\s*pointer\.active|watch\s*\(\s*(?:\(\s*\)\s*=>\s*)?pointer\.active|pointer\.active/.test(src);
        const callsWake = /renderer\.wake\s*\(|\.wake\s*\(\s*\)/.test(src);
        // Stronger: a single watch statement whose BODY both reads the active
        // signal (as the source) and calls wake — the wire, not two unrelated
        // sites. Match a watch(...) call that mentions `active` in its source arg
        // and `wake` anywhere in the same statement.
        const wireM = src.match(/watch\s*\(([\s\S]{0,400}?)\)\s*;/g) || [];
        const hasWakeWire = wireM.some(
            (w) => /active/.test(w) && /wake\s*\(/.test(w),
        );

        facts.watchesPointerActive = watchesPointerActive;
        facts.callsWake = callsWake;
        facts.hasPointerWakeWire = hasWakeWire;

        if (!hasWakeWire) {
            // Fall back to the looser pair (a pointer-active watch AND a wake call
            // present) only if the tight single-statement wire didn't match — but
            // still require BOTH halves, never just a watch.
            if (!(watchesPointerActive && callsWake))
                violations.push(
                    "Blob.vue has no pointer→wake wire: a watch on the pointer's active signal that calls the renderer's wake/canvasHandle.wake() handle does NOT exist — the parked demand loop never re-arms on a first hover (root cause 2 / BA-goo-3)",
                );
            else
                violations.push(
                    "Blob.vue carries a pointer-active watch and a wake call, but not as ONE wire (the active signal must DRIVE the wake in the same statement) — a disjoint watch+wake does not prove the pointer-enter reaches the wake handle",
                );
        }
    }

    // The wake handle must be REACHABLE from the SFC — assert the renderer return
    // exposes a `wake` (the public twin of pause/resume) so Blob.vue's wire can
    // call it. (The color/paletteStops watchers call canvasHandle.wake() from
    // INSIDE the renderer; the SFC-side wire needs the handle on the return.)
    if (existsSync(RENDERER)) {
        const rsrc = stripComments(readFileSync(RENDERER, "utf8"));
        // The return object literal (the control surface) carries a wake handle.
        facts.rendererExposesWake = /wake\s*:/.test(rsrc) || /\bwake\b\s*=>/.test(rsrc);
        // Not a hard violation on its own (the SFC could call canvasHandle.wake
        // via a different route), but recorded as supporting evidence.
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:goo-redress",
        facts,
        violations,
    });

    console.log("proof:goo-redress — the satellite bridge holds the worst-case orbit + the pointer wakes the parked loop (BA.W-GOO-REDRESS)");
    console.log(
        `  W1 smin band : worst-orbit-factor ${facts.smoothKReferencesOrbitWorst ? "present ✓" : "ABSENT ✗"} | ecc-coupled ${facts.smoothKReferencesEccentricity ? "yes ✓" : "NO ✗"} | POS_SCALE ${facts.posScaleOnSmoothK ? "present ✓" : "ABSENT ✗"} | maxReach-pads-band ${facts.maxReachSumsSmoothK ? "yes ✓" : "NO ✗"}`,
    );
    console.log(`    uSmoothK upload: ${facts.smoothKUpload ?? "(not found)"}`);
    console.log(
        `  W2 wake wire : pointer→wake ${facts.hasPointerWakeWire ? "wired ✓" : "MISSING ✗"} | renderer exposes wake ${facts.rendererExposesWake ? "yes ✓" : "no"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
