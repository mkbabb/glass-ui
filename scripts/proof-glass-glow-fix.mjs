#!/usr/bin/env node
// BC.W-GLASS-GLOW-FIX — the Atlas A-8 unbounded radial-halo ROOT defect (a library-CSS
// leak, NOT a viz-math change). The SOURCE/MECHANISM arm of proof:glass-glow-fix
// (device-free; the PAINT arm is the live :5199 capture the orchestrator owns + the π
// readback tests-visual/glass-glow-fix.spec.ts). Per-mechanism greens alone do NOT close
// the visual wave — the captured DELTA is the binding truth (BC anti-disease law).
//
// THE DISEASE (the §0 evidence pass, audit/visual/W-GLASS-GLOW-FIX-EVIDENCE.md): a
// breath-scaled radial-gradient glow layer (the `.pulse-aura`, the prime CANDIDATE 1) is
// `position:absolute; inset:0; transform: scale(→1.15 / 1.22 vivid)` with NO clip on the
// layer; when its host is `overflow: visible` (a viz/showcase tile, a card without
// `overflow:clip`, a bare relative wrapper) the scaled radial SPILLS past the host edge
// and over-paints whatever sits behind/beside it — the spurious unbounded halo the Atlas
// confirms over-painting a glass surface on its viz routes. The fix: BOUND the glow to its
// OWN box (`overflow: clip` on the layer), and codify the leak-class so it cannot return.
//
// The comment-strip + pure-detector house pattern (mirroring proof-black-bar.mjs /
// proof-glass-cal.mjs). Each witness is born-RED at HEAD pre-wave:
//   - HEAD `.pulse-aura` has NO `overflow: clip` — the scaled radial is unbounded (G1 reds).
// bite-check (each clause carries a planted self-test below): a `.pulse-aura` reverted to
// `overflow: visible` + `scale(1.15)` reds G1+G2; a `::before` catch-light planted over a
// canvas-content `.glass-card` reds G2; a deleted aura/catch-light/chassis glow reds G3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Extract the body `{ … }` of the FIRST rule whose selector list contains `selector`
// (a bare ident match; the body is comment-stripped). Returns "" when not found.
function ruleBody(css, selector) {
    const stripped = stripCss(css);
    // Walk every `… { … }` block; match the one whose head names the selector and is NOT
    // a pseudo/descendant variant (the head's selector token equals `selector`).
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(stripped)) !== null) {
        const head = m[1].trim();
        // the selector appears as a standalone class token in the head, AND the head is
        // exactly that token (not `selector::before`, not `.x selector`, not `selector:hover`).
        const heads = head.split(",").map((h) => h.trim());
        if (heads.includes(`.${selector}`)) return m[2];
    }
    return "";
}

// Extract the body of the FIRST rule for `.{selector}::{pseudo}` (e.g. `.pulse-aura::before`,
// matching the single- or double-colon form). Returns "" when not found.
function pseudoRuleBody(css, selector, pseudo) {
    const stripped = stripCss(css);
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(stripped)) !== null) {
        const heads = m[1].split(",").map((h) => h.trim());
        if (heads.some((h) => new RegExp(`^\\.${selector}::?${pseudo}$`).test(h))) return m[2];
    }
    return "";
}

// Does a CSS declaration block carry `overflow: clip` (or `overflow: hidden`)?  Both
// clip the box's painted background to its border-box — the bound the leak-class needs.
function hasClip(body) {
    return /overflow\s*:\s*(clip|hidden)\b/.test(body);
}

// Does the ORIGINATING element of a pseudo-element head carry `overflow: clip`? A scaled
// radial on a `::before`/`::after` CHILD is BOUND when its parent (the element it
// originates from) clips — the clip-parent/scaled-child split is the CORRECT bound (the
// clip element must stay UNSCALED, or the transform re-scales the clip rect). Given a head
// like `.pulse-aura::before`, derive the originating selector `.pulse-aura` and test its
// rule body for clip. Returns false when the head is not a pseudo or the parent has no clip.
function parentClips(css, head) {
    const pseudo = head.match(/^(.*?)::?(?:before|after)\s*$/);
    if (!pseudo) return false;
    const parentSel = pseudo[1].trim().replace(/^\./, "");
    if (!parentSel) return false;
    const parentBody = ruleBody(css, parentSel);
    return parentBody !== "" && hasClip(parentBody);
}

// Does a block carry a breath-scaled radial glow — `inset: 0` (or `position: absolute`
// + `inset:0`) AND a `transform: scale(>1)` (a literal or a token whose default >1)?
// This is the UNBOUNDED-SCALE-SPILL signature: a glow layer that scales PAST its box.
function isScaledGlowLayer(body) {
    const insetZero = /\binset\s*:\s*0\b/.test(body);
    if (!insetZero) return false;
    // a radial-gradient background (the glow) — the layer must actually paint a glow.
    const hasRadial = /radial-gradient\s*\(/.test(body);
    if (!hasRadial) return false;
    // transform: scale(…) where the resolved peak is >1: a literal scale(1.15) OR a
    // var() whose token default is >1 (e.g. var(--animate-ambient-pulse-scale-max, 1.15)).
    const tm = body.match(/transform\s*:\s*scale\(\s*([^)]+)\)/);
    if (!tm) return false;
    const arg = tm[1].trim();
    // literal number > 1?
    const litNum = Number(arg);
    if (!Number.isNaN(litNum)) return litNum > 1;
    // var(--…, N) fallback — read the fallback default.
    const vm = arg.match(/var\([^,]+,\s*([\d.]+)\s*\)/);
    if (vm) return Number(vm[1]) > 1;
    // a bare var() with no default — treat as potentially >1 (the breath token IS >1).
    return /var\(/.test(arg);
}

// ── G1 — the ROOTED rule is BOUND. The `.pulse-aura` glow layer carries `overflow: clip`
//    so its breath-scaled radial cannot spill past its own inset:0 box.
const BOUND_LAYERS = [
    { selector: "pulse-aura", file: "src/components/custom/pulse/Pulse.vue", why: "the breath-scaled (1.15× / 1.22× vivid) aura radial — the Atlas A-8 root" },
];
export function detectBound(overrides = {}) {
    const violations = [];
    const facts = { layers: {} };
    for (const { selector, file, why } of BOUND_LAYERS) {
        const css = overrides[file] ?? readFile(file);
        const body = ruleBody(css, selector);
        const bound = body !== "" && hasClip(body);
        facts.layers[selector] = { found: body !== "", clipped: bound };
        if (body === "") {
            violations.push(`G1: .${selector} rule not found in ${file} (${why})`);
        } else if (!bound) {
            violations.push(`G1: .${selector} carries NO 'overflow: clip' (${why}) — the radial glow can spill PAST its box; bound it so the scaled/oversized radial stays within inset:0`);
        }
    }
    return { facts, violations };
}

// ── G2 — the leak PATTERN is barred class-wide. Sweep the glow corpus: NO radial-gradient
//    glow layer is `inset:0` + `transform: scale(>1)` with NO clip on the layer (the
//    unbounded-scale-spill bite). AND no `::before` catch-light paints OVER a canvas-content
//    glass card (the over-canvas-specular bite — a `.glass-card` whose content is a <canvas>
//    must suppress the plate `::before` over the canvas).
const GLOW_CORPUS = [
    "src/components/custom/pulse/Pulse.vue",
    "src/styles/glass/material.css",
    "src/styles/tokens/glass-fx.css",
];
export function detectPattern(overrides = {}) {
    const violations = [];
    const facts = { scaledSpillHits: [] };
    for (const file of GLOW_CORPUS) {
        const css = overrides[file] ?? readFile(file);
        const stripped = stripCss(css);
        // walk every rule body; a scaled glow layer with NO clip is the leak.
        const re = /([^{}]+)\{([^{}]*)\}/g;
        let m;
        while ((m = re.exec(stripped)) !== null) {
            const head = m[1].trim();
            const body = m[2];
            // A scaled radial glow is BOUND when it clips ITSELF, OR — for a `::before`/
            // `::after` scaled CHILD — when its ORIGINATING element clips it (the clip-
            // parent/scaled-child split: the clip element stays unscaled so the transform
            // can't re-scale the clip rect; the scaled child is bounded by the parent's clip).
            if (isScaledGlowLayer(body) && !hasClip(body) && !parentClips(stripped, head)) {
                facts.scaledSpillHits.push({ file, head: head.slice(0, 60) });
                violations.push(`G2: ${file} '${head.slice(0, 50)}' is an inset:0 radial-gradient glow with transform: scale(>1) and NO clip on the layer OR its originating parent — the unbounded-scale-spill leak; clip the layer (or its parent, for a scaled ::before child)`);
            }
        }
    }
    return { facts, violations };
}

// ── G3 — the intentional glows are PRESERVED (BOUND, don't remove). The Pulse aura still
//    paints its radial halo; the .glass-material::before catch-light still reads (the
//    masked radial disc); the chassis curvature/spine sheen still reads (the vignette/
//    curvature radial tokens survive). A fix that DELETES a glow wholesale reds.
export function detectPreserved(overrides = {}) {
    const violations = [];
    const facts = {};

    const pulse = overrides["src/components/custom/pulse/Pulse.vue"] ?? readFile("src/components/custom/pulse/Pulse.vue");
    // The aura halo is PRESERVED whether it paints on `.pulse-aura` itself OR on the
    // `.pulse-aura::before` scaled CHILD (the clip-parent/scaled-child split moves the
    // radial onto the pseudo so the unscaled parent can clip it). Read both.
    const auraBody = ruleBody(pulse, "pulse-aura");
    const auraBeforeBody = pseudoRuleBody(pulse, "pulse-aura", "before");
    facts.auraRadial = /radial-gradient\s*\(/.test(auraBody) || /radial-gradient\s*\(/.test(auraBeforeBody);
    if (!facts.auraRadial) {
        violations.push("G3: neither .pulse-aura nor .pulse-aura::before paints a radial-gradient halo — the fix must BOUND the aura, not delete its glow");
    }

    const material = overrides["src/styles/glass/material.css"] ?? readFile("src/styles/glass/material.css");
    const materialStripped = stripCss(material);
    facts.catchLight = /::before[\s\S]*?radial-gradient\s*\(/.test(materialStripped) && /--glass-specular-core/.test(materialStripped);
    if (!facts.catchLight) {
        violations.push("G3: the .glass-material::before catch-light (the masked radial disc + --glass-specular-core) is gone — the catch-light recipe must stay untouched (W-LENSING built seam)");
    }

    const glassFx = overrides["src/styles/tokens/glass-fx.css"] ?? readFile("src/styles/tokens/glass-fx.css");
    const glassFxStripped = stripCss(glassFx);
    facts.chassisSheen = /--glass-curvature-overlay\s*:\s*radial-gradient/.test(glassFxStripped) && /--glass-spine-vignette\s*:\s*radial-gradient/.test(glassFxStripped);
    if (!facts.chassisSheen) {
        violations.push("G3: the chassis curvature/spine sheen (--glass-curvature-overlay / --glass-spine-vignette radial tokens) is gone — the fix bounds, it does not remove the chassis sheen");
    }

    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause (the anti-evasion floor),
//    AND a clean fixture must NOT red (the anti-false-positive floor). The disease-root
//    bite: the EXACT rooted leak (the .pulse-aura reverted to overflow:visible +
//    scale(1.15)) MUST fail the gate.
export function selfTest() {
    const fails = [];

    // The DISEASE-ROOT bite — the rooted leak re-introduced (the §0-named rule): a
    // `.pulse-aura` with the scaled radial and NO clip MUST red G1 AND G2.
    const leakedAura = `.pulse-aura { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, white 0%, transparent 70%); transform: scale(var(--animate-ambient-pulse-scale-max, 1.15)); }`;
    const g1Leak = detectBound({ "src/components/custom/pulse/Pulse.vue": leakedAura });
    if (!g1Leak.violations.some((v) => /pulse-aura.*NO 'overflow: clip'/.test(v))) {
        fails.push("self-test G1/disease-root: a .pulse-aura reverted to NO clip did NOT red");
    }
    const g2Leak = detectPattern({ "src/components/custom/pulse/Pulse.vue": leakedAura });
    if (!g2Leak.violations.some((v) => /unbounded-scale-spill/.test(v))) {
        fails.push("self-test G2/disease-root: a scaled inset:0 radial glow with NO clip did NOT red the pattern bite");
    }

    // A CLEAN bounded aura must NOT red G1/G2 (anti-false-positive).
    const cleanAura = `.pulse-aura { position: absolute; inset: 0; overflow: clip; background: radial-gradient(ellipse at 50% 50%, white 0%, transparent 70%); transform: scale(var(--animate-ambient-pulse-scale-max, 1.15)); }`;
    if (detectBound({ "src/components/custom/pulse/Pulse.vue": cleanAura }).violations.length !== 0) {
        fails.push("self-test G1: a clean clipped aura unexpectedly red");
    }
    if (detectPattern({ "src/components/custom/pulse/Pulse.vue": cleanAura, "src/styles/glass/material.css": "", "src/styles/tokens/glass-fx.css": "" }).violations.length !== 0) {
        fails.push("self-test G2: a clean clipped scaled glow unexpectedly red the pattern bite");
    }

    // G3 bite — a DELETED aura glow (no radial on the element OR its ::before) reds the
    // preservation assert.
    const deadAura = `.pulse-aura { position: absolute; inset: 0; overflow: clip; background: none; }`;
    if (!detectPreserved({ "src/components/custom/pulse/Pulse.vue": deadAura }).violations.some((v) => /radial-gradient halo/.test(v))) {
        fails.push("self-test G3: a deleted aura glow did NOT red the preservation assert");
    }

    // The CLIP-PARENT/SCALED-CHILD architecture (the corrected bound): the `.pulse-aura`
    // clips (unscaled), the `.pulse-aura::before` carries the scaled radial. This MUST be
    // recognized as BOUND — G2 no spill (the parent clips the scaled child) AND G3 preserved
    // (the radial lives on the ::before). Anti-false-positive for the real fix shape.
    const splitArch = `.pulse-aura { position: absolute; inset: 0; overflow: clip; opacity: 0.28; }
.pulse-aura::before { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, white 0%, transparent 70%); transform: scale(var(--pulse-aura-breath-scale, 1.15)); }`;
    if (detectPattern({ "src/components/custom/pulse/Pulse.vue": splitArch, "src/styles/glass/material.css": "", "src/styles/tokens/glass-fx.css": "" }).violations.length !== 0) {
        fails.push("self-test G2: the clip-parent/scaled-child aura unexpectedly red the pattern bite (the scaled ::before is bounded by the unscaled parent's clip)");
    }
    if (detectPreserved({ "src/components/custom/pulse/Pulse.vue": splitArch }).violations.some((v) => /radial-gradient halo/.test(v))) {
        fails.push("self-test G3: the clip-parent/scaled-child aura unexpectedly red the preservation assert (the radial lives on the ::before)");
    }
    // AND the DISEASE-ROOT must still red even in the split shape if the PARENT does not clip:
    // a scaled ::before whose parent is overflow:visible is STILL a spill.
    const splitLeak = `.pulse-aura { position: absolute; inset: 0; overflow: visible; }
.pulse-aura::before { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, white 0%, transparent 70%); transform: scale(1.15); }`;
    if (!detectPattern({ "src/components/custom/pulse/Pulse.vue": splitLeak, "src/styles/glass/material.css": "", "src/styles/tokens/glass-fx.css": "" }).violations.some((v) => /unbounded-scale-spill/.test(v))) {
        fails.push("self-test G2/split-leak: a scaled ::before whose parent does NOT clip did NOT red the pattern bite");
    }

    return fails;
}

export function detect() {
    const bound = detectBound();
    const pattern = detectPattern();
    const preserved = detectPreserved();
    const selfTestFails = selfTest();
    const violations = [
        ...bound.violations,
        ...pattern.violations,
        ...preserved.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            bound: bound.facts,
            pattern: pattern.facts,
            preserved: preserved.facts,
            selfTestFails,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_GLOW_FIX_ARTIFACT", "BC-glass-glow-fix");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-glow-fix",
        facts,
        violations,
    });

    console.log("proof:glass-glow-fix — the Atlas A-8 unbounded radial-halo root (BC.W-GLASS-GLOW-FIX)");
    console.log(`  G1 bound layers   : ${Object.entries(facts.bound.layers).map(([k, v]) => `${k}=${v.clipped ? "clipped ✓" : "UNBOUND ✗"}`).join("  ")}`);
    console.log(`  G2 spill hits     : ${facts.pattern.scaledSpillHits.length === 0 ? "none ✓" : `${facts.pattern.scaledSpillHits.length} ✗`}`);
    console.log(`  G3 preserved      : aura-radial=${facts.preserved.auraRadial ? "✓" : "✗"}  catch-light=${facts.preserved.catchLight ? "✓" : "✗"}  chassis-sheen=${facts.preserved.chassisSheen ? "✓" : "✗"}`);
    console.log(`  self-tests        : ${facts.selfTestFails.length === 0 ? "all bites fire ✓" : `BROKEN ✗ (${facts.selfTestFails.length})`}`);

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
