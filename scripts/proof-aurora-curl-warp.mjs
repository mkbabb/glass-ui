#!/usr/bin/env node
// BB.B1 — the aurora curl-warp gate (proof:aurora-curl-warp).
//
// The born-RED→GREEN device-free SOURCE arm. The ask (the cross-repo relay §5 B1):
// aurora's domain warp gains an OPT-IN `warpMode: "curl"` — a Bridson curl-noise flow
// warp (the divergence-free curl of an fbm potential, the SOTA flow-field warp) — as a
// new warp mode BESIDE the existing fbm/cellular/hybrid, with the curl-noise fbm
// FACTORED into a SHARED glsl chunk (flow.glsl.ts, the AV.W2 shared-chunk precedent)
// so it is reusable, the ≥3-consumer bar BOOKED. The .frag arm ONLY this cut (the WGSL
// arm is the booked procedural tail).
//
// THE CARDINAL CONSTRAINT — the warp mode is OPT-IN, DEFAULT UNCHANGED. The existing
// aurora default config (warpMode: "fbm") must render BYTE-IDENTICAL so every existing
// proof:aurora-* gate + the W-AURORA-WGPU parity surface stays green: the curl is a new
// BRANCH gated behind uWarpMode == 3, the default warp paths byte-untouched (no curl
// call outside the == 3 branch), and warpModeFor NEVER auto-selects curl.
//
// Four falsifiable SOURCE witnesses (each born-RED at HEAD pre-wave), the
// comment-strip + pure-detector house pattern (mirrors proof-aurora-swraster.mjs):
//
//   W1 — THE SHARED curlFBM CHUNK EXISTS + IS BASIS-AGNOSTIC. flow.glsl.ts exports
//        CURL_FBM_GLSL containing a `curlFBM(vec2 …)` that computes the 2D curl via the
//        (g.y, -g.x) cross-pairing of central-difference partials, AND it owns ONLY the
//        curl operator — it calls a host-supplied `potentialFBM` (the basis-agnostic
//        contract, a forward-declared prototype). It imports NO value.js + declares no
//        uniforms (a pure GLSL string). RED at HEAD: flow.glsl.ts (the shared chunk)
//        does not exist beside procedural-color.glsl.ts. Bite: a chunk that inlines its
//        own fbm basis (no potentialFBM seam) REDs the basis-agnostic clause.
//
//   W2 — AURORA SPLICES THE SHARED CHUNK + THE CURL WARP IS OPT-IN (uWarpMode == 3
//        ONLY). aurora.frag.ts imports CURL_FBM_GLSL from the shared chunk, splices it,
//        defines potentialFBM against its OWN fbm (the host owns the basis), AND the
//        ONLY curlFBM call sits inside a `uWarpMode == 3` branch — the default warp
//        paths (fbm/cellular/hybrid) carry NO curl call (the default-byte-identical
//        fence). RED at HEAD: no shared-chunk splice, no curl branch. Bite: a curlFBM
//        call OUTSIDE the == 3 branch (in the default fbm path) REDs the opt-in clause;
//        a forked inline curl (no shared-chunk splice) REDs the shared-chunk clause.
//
//   W3 — THE TS SEAM WIDENS + warpModeFor NEVER AUTO-SELECTS CURL. The WarpMode union
//        adds "curl", WARP_ID maps curl: 3 (the int the .frag dispatches on), AND the
//        NOISE atom fan-out (warpModeFor) NEVER returns "curl" — so the default config
//        is byte-unchanged (curl is reached only by an explicit warpMode: "curl"). RED
//        at HEAD: the union is fbm|cellular|hybrid only. Bite: a warpModeFor that
//        returns "curl" REDs the default-unchanged clause.
//
//   W4 — THE ≥3-CONSUMER BOOKING IS RECORDED. docs/consumer-evidence/curl-fbm.md names
//        consumer #1 (LIVE: aurora-curl-warp) + the booked #2/#3 (B5 paper-grid-breathe
//        + W-FLOWFIELD) — the shared-chunk bar in its BOOKED form. RED at HEAD: the doc
//        does not exist.
//
// + the self-test bite (the false-witness discipline) and the BINDING live-π / WebGPU
//   parity capture rides W-REFLECT3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip block + line comments so a witness never matches commented prose (the
 *  URL-safe `//` strip — `(^|[^:])//` keeps a `://` in a URL intact). */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

const AURORA = "src/components/custom/aurora";
const FLOW_CHUNK = "src/composables/glass/webgl/shaders/flow.glsl.ts";
const EVIDENCE = "docs/consumer-evidence/curl-fbm.md";

/**
 * Pure detector — given the source strings, return { facts, violations }.
 *
 * `sources` shape:
 *   flow        : the shared flow.glsl.ts chunk (W1)
 *   frag        : aurora.frag.ts (W2 — the splice + the opt-in branch)
 *   presets     : constants/presets.ts (W3 — the WarpMode union)
 *   uniformBridge: composables/uniformBridge.ts (W3 — the WARP_ID map)
 *   atoms       : composables/atoms.ts (W3 — warpModeFor)
 *   evidence    : the consumer-evidence doc (W4)
 *   chunkExists : flow.glsl.ts present on disk
 *   evidenceExists: the evidence doc present on disk
 */
export function detectAuroraCurlWarp(sources) {
    const {
        flow,
        frag,
        presets,
        uniformBridge,
        atoms,
        evidence,
        chunkExists,
        evidenceExists,
    } = sources;
    const facts = {};
    const violations = [];

    // The RAW chunk (NOT comment-stripped) — the GLSL body lives inside a
    // /* glsl */ template literal, so stripComments would EAT the whole chunk. We
    // detect against the raw flow source for the GLSL body; the TS files are stripped.
    const flowRaw = flow;
    const fr = stripComments(frag);
    const pr = stripComments(presets);
    const ub = stripComments(uniformBridge);
    const at = stripComments(atoms);

    // ── W1 — the shared curlFBM chunk exists + is basis-agnostic ───────────────
    facts.w1 = {};
    facts.w1.chunkExists = chunkExists;
    // Exports the CURL_FBM_GLSL string.
    facts.w1.exportsChunk = /export\s+const\s+CURL_FBM_GLSL\s*=/.test(flowRaw);
    // The curl operator: a curlFBM function returning the (g.y, -g.x) cross-pairing
    // (the 2D curl of the potential gradient). We assert the function + the
    // sign-flipped cross-pairing return.
    facts.w1.curlFunction = /vec2\s+curlFBM\s*\(\s*vec2\s+\w+\s*\)/.test(flowRaw);
    facts.w1.crossPairing = /return\s+vec2\s*\(\s*g\.y\s*,\s*-\s*g\.x\s*\)/.test(
        flowRaw,
    );
    // Basis-agnostic: it calls a host-supplied potentialFBM (the forward-declared
    // prototype seam — the host owns the noise basis, the chunk owns only the curl).
    facts.w1.basisAgnostic =
        /float\s+potentialFBM\s*\(\s*vec2\s+\w+\s*\)\s*;/.test(flowRaw) &&
        /potentialFBM\s*\(/.test(flowRaw);
    // Pure GLSL string — imports NO value.js + declares NO uniforms (a uniform decl
    // would couple the chunk to one shader's uniform block).
    facts.w1.pureString =
        !/import\s/.test(flowRaw.replace(/\/\*[\s\S]*?\*\//g, "")) &&
        !/uniform\s/.test(flowRaw);
    facts.w1.ok =
        facts.w1.chunkExists &&
        facts.w1.exportsChunk &&
        facts.w1.curlFunction &&
        facts.w1.crossPairing &&
        facts.w1.basisAgnostic &&
        facts.w1.pureString;
    if (!facts.w1.ok) {
        violations.push(
            "W1: flow.glsl.ts must export CURL_FBM_GLSL with a basis-agnostic curlFBM (the (g.y, -g.x) 2D-curl cross-pairing of central-difference partials, calling a host-supplied potentialFBM prototype), a pure GLSL string (no value.js import, no uniform decl)",
        );
    }

    // ── W2 — aurora splices the chunk + the curl warp is OPT-IN (uWarpMode == 3) ─
    facts.w2 = {};
    // Aurora imports the shared chunk (NOT a forked inline curl).
    facts.w2.splicesChunk =
        /import\s*\{[^}]*CURL_FBM_GLSL[^}]*\}\s*from\s*["'][^"']*\/flow\.glsl["']/.test(
            fr,
        ) && /\$\{CURL_FBM_GLSL\}/.test(fr);
    // Aurora defines potentialFBM against its OWN fbm (the host owns the basis).
    facts.w2.definesPotential =
        /float\s+potentialFBM\s*\(\s*vec2\s+\w+\s*\)\s*\{\s*return\s+fbm\s*\(\s*\w+\s*\)\s*;\s*\}/.test(
            fr,
        );
    // The ONLY curlFBM call sits inside a `uWarpMode == 3` branch. We assert the
    // curl branch exists AND there is no curlFBM call in a NON-3 context. The detector
    // counts curlFBM call-sites and asserts EVERY one is inside an `else if (uWarpMode
    // == 3)` (or `if (uWarpMode == 3)`) block.
    facts.w2.curlBranchPresent = /uWarpMode\s*==\s*3[\s\S]{0,260}?curlFBM\s*\(/.test(
        fr,
    );
    // Anti-evasion: count curlFBM calls; every one must be within ~260 chars after a
    // `uWarpMode == 3` token. We approximate by asserting the # of curlFBM calls ==
    // the # reachable from a `uWarpMode == 3` guard (exactly one expected).
    const curlCalls = (fr.match(/curlFBM\s*\(/g) || []).length;
    const curlAfter3 = (
        fr.match(/uWarpMode\s*==\s*3[\s\S]{0,260}?curlFBM\s*\(/g) || []
    ).length;
    facts.w2.curlCallCount = curlCalls;
    facts.w2.curlCallsAllGated = curlCalls > 0 && curlCalls === curlAfter3;
    // The default warp dispatch (fbm == 0 implicit / cellular == 1 / hybrid == 2) is
    // PRESERVED — the existing cellular/hybrid branches survive (a curl rewrite that
    // clobbered the default paths would break byte-identity).
    facts.w2.defaultPathsPreserved =
        /uWarpMode\s*==\s*1/.test(fr) && /uWarpMode\s*==\s*2/.test(fr);
    facts.w2.ok =
        facts.w2.splicesChunk &&
        facts.w2.definesPotential &&
        facts.w2.curlBranchPresent &&
        facts.w2.curlCallsAllGated &&
        facts.w2.defaultPathsPreserved;
    if (!facts.w2.ok) {
        violations.push(
            "W2: aurora.frag.ts must splice CURL_FBM_GLSL from the shared chunk (no forked inline curl), define potentialFBM against its own fbm, and gate the ONLY curlFBM call behind `uWarpMode == 3` (the default fbm/cellular/hybrid paths carry no curl call — the default-byte-identical fence)",
        );
    }

    // ── W3 — the TS seam widens + warpModeFor never auto-selects curl ──────────
    facts.w3 = {};
    facts.w3.unionWidened =
        /export\s+type\s+WarpMode\s*=[^;]*"curl"/.test(pr) &&
        /"fbm"/.test(pr) &&
        /"cellular"/.test(pr) &&
        /"hybrid"/.test(pr);
    facts.w3.warpIdMapsCurl = /curl\s*:\s*3/.test(ub);
    // The default-unchanged fence: warpModeFor (the NOISE atom fan-out) NEVER returns
    // "curl" — curl is reached ONLY by an explicit warpMode: "curl".
    // The signature carries a `: WarpMode` return-type annotation between `)` and `{`,
    // so the body match allows an optional `: <Type>` before the brace.
    const warpModeForBody =
        at.match(
            /function\s+warpModeFor\s*\([^)]*\)\s*(?::\s*\w+\s*)?\{[\s\S]*?\n\s*\}/,
        )?.[0] || "";
    facts.w3.warpModeForBodyFound = warpModeForBody.length > 0;
    facts.w3.warpModeForNeverCurl =
        warpModeForBody.length > 0 && !/"curl"/.test(warpModeForBody);
    facts.w3.ok =
        facts.w3.unionWidened &&
        facts.w3.warpIdMapsCurl &&
        facts.w3.warpModeForBodyFound &&
        facts.w3.warpModeForNeverCurl;
    if (!facts.w3.ok) {
        violations.push(
            "W3: the WarpMode union must widen with \"curl\", WARP_ID must map curl: 3, AND warpModeFor must NEVER auto-select \"curl\" (the default-unchanged fence — curl is reached only by an explicit warpMode: \"curl\")",
        );
    }

    // ── W4 — the ≥3-consumer booking is recorded ───────────────────────────────
    facts.w4 = {};
    facts.w4.evidenceExists = evidenceExists;
    facts.w4.namesConsumer1 = /aurora-curl-warp/.test(evidence);
    facts.w4.booksConsumer2 = /paper-grid-breathe/.test(evidence);
    facts.w4.booksConsumer3 = /W-FLOWFIELD/.test(evidence);
    facts.w4.ok =
        facts.w4.evidenceExists &&
        facts.w4.namesConsumer1 &&
        facts.w4.booksConsumer2 &&
        facts.w4.booksConsumer3;
    if (!facts.w4.ok) {
        violations.push(
            "W4: docs/consumer-evidence/curl-fbm.md must record the ≥3-consumer booking — consumer #1 (LIVE: aurora-curl-warp) + the booked #2/#3 (B5 paper-grid-breathe + W-FLOWFIELD)",
        );
    }

    return { facts, violations };
}

// ── The self-test bite: the false-witness discipline (each bite REDs its clause
//    through the PURE detector). ─────────────────────────────────────────────
function selfTest() {
    const goodFlow = `
      export const CURL_FBM_GLSL = /* glsl */ \`
      const float CURL_EPS = 0.012;
      float potentialFBM(vec2 p);
      vec2 curlFBM(vec2 p) {
        float dx = potentialFBM(p + vec2(CURL_EPS, 0.0)) - potentialFBM(p - vec2(CURL_EPS, 0.0));
        float dy = potentialFBM(p + vec2(0.0, CURL_EPS)) - potentialFBM(p - vec2(0.0, CURL_EPS));
        vec2 g = vec2(dx, dy) / (2.0 * CURL_EPS);
        return vec2(g.y, -g.x);
      }
      \`;`;
    const goodFrag = `
      import { CURL_FBM_GLSL } from "../../../../../composables/glass/webgl/shaders/flow.glsl";
      const SRC = \`
      float fbm(vec2 p) { return 0.0; }
      \${CURL_FBM_GLSL}
      float potentialFBM(vec2 p) { return fbm(p); }
      vec2 domainWarp(vec2 p, float t) {
        vec2 warp = r;
        if (uWarpMode == 1) { warp = vec2(0.0); }
        else if (uWarpMode == 2) { warp = vec2(0.0); }
        else if (uWarpMode == 3) { warp = curlFBM(p * uWarpScale); }
        return p + warp;
      }
      \`;`;
    const goodPresets = `export type WarpMode = "fbm" | "cellular" | "hybrid" | "curl";`;
    const goodUniformBridge = `export const WARP_ID = { fbm: 0, cellular: 1, hybrid: 2, curl: 3 };`;
    const goodAtoms = [
        "function warpModeFor(t) {",
        '  if (t < 0.4) return "fbm";',
        '  if (t < 0.75) return "hybrid";',
        '  return "cellular";',
        "}",
    ].join("\n");
    const goodEvidence =
        "aurora-curl-warp consumer #1; paper-grid-breathe #2; W-FLOWFIELD #3";

    const base = {
        flow: goodFlow,
        frag: goodFrag,
        presets: goodPresets,
        uniformBridge: goodUniformBridge,
        atoms: goodAtoms,
        evidence: goodEvidence,
        chunkExists: true,
        evidenceExists: true,
    };

    // The good corpus is GREEN (the positive control).
    const baseResult = detectAuroraCurlWarp(base);

    const bites = [];

    // Bite A — a chunk that inlines its own fbm basis (no potentialFBM seam) reds W1.
    {
        const bad = goodFlow
            .replace(/float\s+potentialFBM\s*\(\s*vec2\s+p\s*\)\s*;/, "")
            .replace(/potentialFBM/g, "myInlineFbm");
        const { facts } = detectAuroraCurlWarp({ ...base, flow: bad });
        bites.push({ name: "W1 inlined-basis reds", reds: !facts.w1.ok });
    }
    // Bite B — a curlFBM call in the DEFAULT fbm path (outside the == 3 branch) reds W2.
    {
        const bad = goodFrag.replace(
            "if (uWarpMode == 1) { warp = vec2(0.0); }",
            "if (uWarpMode == 1) { warp = curlFBM(p); }",
        );
        const { facts } = detectAuroraCurlWarp({ ...base, frag: bad });
        bites.push({ name: "W2 curl-in-default-path reds", reds: !facts.w2.ok });
    }
    // Bite C — a forked inline curl (no shared-chunk splice) reds W2.
    {
        const bad = goodFrag
            .replace(
                /import\s*\{\s*CURL_FBM_GLSL\s*\}\s*from\s*"[^"]*\/flow\.glsl";/,
                "",
            )
            .replace(/\$\{CURL_FBM_GLSL\}/, "");
        const { facts } = detectAuroraCurlWarp({ ...base, frag: bad });
        bites.push({ name: "W2 forked-inline-curl reds", reds: !facts.w2.ok });
    }
    // Bite D — warpModeFor auto-selecting "curl" (the default-unchanged break) reds W3.
    {
        const bad = goodAtoms.replace(
            'return "cellular";',
            'return "curl";',
        );
        const { facts } = detectAuroraCurlWarp({ ...base, atoms: bad });
        bites.push({ name: "W3 warpModeFor-auto-curl reds", reds: !facts.w3.ok });
    }
    // Bite E — the union NOT widened (curl absent) reds W3.
    {
        const bad = `export type WarpMode = "fbm" | "cellular" | "hybrid";`;
        const { facts } = detectAuroraCurlWarp({ ...base, presets: bad });
        bites.push({ name: "W3 union-not-widened reds", reds: !facts.w3.ok });
    }
    // Bite F — the consumer-evidence doc absent reds W4.
    {
        const { facts } = detectAuroraCurlWarp({
            ...base,
            evidenceExists: false,
        });
        bites.push({ name: "W4 evidence-absent reds", reds: !facts.w4.ok });
    }

    return { bites, basePass: baseResult.violations.length === 0 };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_AURORA_CURL_WARP_ARTIFACT",
        "BB-aurora-curl-warp",
    );

    const flowPath = resolve(ROOT, FLOW_CHUNK);
    const evidencePath = resolve(ROOT, EVIDENCE);

    const flow = safeRead(flowPath);
    const frag = safeRead(
        resolve(ROOT, AURORA, "constants/shaders/aurora.frag.ts"),
    );
    const presets = safeRead(resolve(ROOT, AURORA, "constants/presets.ts"));
    const uniformBridge = safeRead(
        resolve(ROOT, AURORA, "composables/uniformBridge.ts"),
    );
    const atoms = safeRead(resolve(ROOT, AURORA, "composables/atoms.ts"));
    const evidence = safeRead(evidencePath);

    const { facts, violations } = detectAuroraCurlWarp({
        flow,
        frag,
        presets,
        uniformBridge,
        atoms,
        evidence,
        chunkExists: existsSync(flowPath),
        evidenceExists: existsSync(evidencePath),
    });

    // The self-test bites.
    const { bites, basePass } = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.selfTest = {
        bites,
        basePass,
        allBite: biteFailures.length === 0 && basePass,
    };
    if (!facts.selfTest.allBite) {
        violations.push(
            `SELF-TEST: ${
                !basePass ? "the good corpus did NOT pass; " : ""
            }bite(s) did not RED: ${biteFailures
                .map((b) => b.name)
                .join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:aurora-curl-warp",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:aurora-curl-warp — the opt-in Bridson curl-noise flow warp + the shared curlFBM chunk (BB.B1)",
    );
    console.log(`  W1 shared curlFBM chunk exists + basis-agnostic       : ${yn(facts.w1.ok)}`);
    console.log(`  W2 aurora splices chunk + curl OPT-IN (uWarpMode == 3): ${yn(facts.w2.ok)}`);
    console.log(`  W3 TS seam widens + warpModeFor never auto-curl       : ${yn(facts.w3.ok)}`);
    console.log(`  W4 ≥3-consumer booking recorded                       : ${yn(facts.w4.ok)}`);
    console.log(`  self-test bites RED (+ good corpus passes)            : ${yn(facts.selfTest.allBite)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
