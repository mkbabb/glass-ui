#!/usr/bin/env node
// BI.W-E10-AURORA-ENTRANCE — the palette-derived aurora entrance gate
// (proof:aurora-entrance).
//
// The born-RED→GREEN device-free SOURCE arm. UF-E10 + value.js T-60 name ONE
// gray-entrance register: at HEAD the aurora page-load fades in from a "repulsive
// gray", pulses to a desaturated composite, then pulses to the field — three stacked
// tone shifts. The forensic root is threefold:
//   (a) the capable-path aurora placeholder is the CHEAP flat `linear-gradient(135deg)`
//       band (`paletteToCssGradient`) — the "repulsive gray/neutral" first frame;
//   (b) the one-shot `substrate-reveal-bloom` filter-bloom ramps from
//       `brightness(0.4) saturate(0.7)` — a `brightness<1`/`saturate<1` GRAY VEIL over
//       the chromatic field, stamped while the canvas still sits at consumer opacity:0
//       (the visible arrival opens INSIDE the dim floor — measured brightness 0.54–0.83);
//   (c) `revealBloom` is HARDWIRED `true` on BOTH chromatic runtimes (the aurora
//       runtime + the blob renderer) — no consumer door to opt out / arrival-sync.
//
// The fix — the AURORA ENTRANCE REGISTER:
//   AE1 — first paint is the palette-derived GROUND (`auroraFallbackGround`) on the
//         CAPABLE path too; the flat band retires from Aurora.vue.
//   AE2 — the ground reuses the value.js `oklchToLinear` core (ONE color source — no
//         re-implemented OKLCh math).
//   AE3 — `gl-route-enter` is the CONTENT-enter (fade COUPLED to the transform rise,
//         P3), never an atomic whole-root neutral fade; the FIELD is a frame-0
//         PERSISTENT layer OUTSIDE the enter (the field/content split, documented in
//         transitions.css + focal.ts — the palette ground persists from frame 0).
//   AE4 — PRM: the palette ground is the static rest frame; the route-enter reduce arm
//         keeps the fade + drops the transform; the reveal-bloom sits under
//         `no-preference` (settled from frame 0 under reduce).
//   AE5 — the T-60 PRODUCER HALF: the `revealBloom` consumer DOOR is exposed on
//         AuroraRuntimeOptions AND the blob renderer options (opt-out / arrival-sync,
//         not hardwired), and the `substrate-reveal-bloom` keyframe is PALETTE-HONEST
//         (brightness/saturate never dip below 1 — no gray veil over a chromatic field).
//
// Five falsifiable SOURCE witnesses (born-RED at HEAD pre-wave), the pure-detector
// house pattern (mirrors proof-aurora-swraster.mjs) + the self-test bites (a planted
// flat-band capable-path first frame REDs; a planted atomic-root-fade gl-route-enter
// REDs; a planted re-implemented OKLCh math REDs; a planted brightness<1 veil REDs; a
// planted hardwired reveal-bloom REDs). The BINDING painted truth rides
// tests-visual/aurora-entrance.spec.ts (the /foundations/intro frame-series — frame 0
// palette-colored, the live field warms into it, the content enters over it — + the
// value.js t60-probe 4-leg class: no achromatic/dim stage inside the visible window).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const AURORA = "src/components/custom/aurora";

function safeRead(p) {
    try {
        return existsSync(p) ? readFileSync(p, "utf8") : "";
    } catch {
        return "";
    }
}

/** Strip `//` line-comments + block-comments so a doc mention of a code-shaped
 *  literal (e.g. a comment naming `revealBloom: true`) never false-flags a
 *  STRUCTURAL check. Marker checks (the documented split invariants) read RAW. */
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

/** Extract the body of a top-level `@keyframes <name> { … }` block (column-0 close). */
function keyframeBody(css, name) {
    const re = new RegExp(`@keyframes\\s+${name}\\s*\\{([\\s\\S]*?)\\n\\}`);
    const m = css.match(re);
    return m ? m[1] : "";
}

/** Extract the body of the first `from { … }` block inside a keyframe body. */
function fromBlock(kfBody) {
    const m = kfBody.match(/from\s*\{([^}]*)\}/);
    return m ? m[1] : "";
}

/**
 * The pure detector — every witness a falsifiable regex over the source strings.
 * Comments are NOT stripped: the documented field/content-split + palette-ground
 * invariants ARE greppable markers (AE3), and the "absence" checks (no flat band, no
 * forked OKLCh, no brightness<1 veil) run over the code region that matters (the
 * keyframe body for the veil, the whole file for the retired-symbol absence).
 */
export function detectAuroraEntrance({
    auroraVue,
    ground,
    transitions,
    focal,
    runtime,
    blob,
    vizReveal,
}) {
    const facts = { ae1: {}, ae2: {}, ae3: {}, ae4: {}, ae5: {} };
    const violations = [];

    // ── AE1 — the capable-path first frame is the palette-derived ground ─────────
    // Aurora.vue paints the `auroraFallbackGround` ground as the placeholder, and the
    // flat `paletteToCssGradient` band is RETIRED from Aurora.vue (a re-introduction
    // of the capable-path gradient — the "repulsive gray/neutral" — REDs).
    facts.ae1.groundIsPlaceholder =
        /auroraFallbackGround\(/.test(auroraVue) &&
        /placeholderBackgroundImage/.test(auroraVue) &&
        /faithfulGround\.value\.backgroundImage/.test(auroraVue);
    facts.ae1.noFlatBand = !/paletteToCssGradient/.test(auroraVue);
    facts.ae1.ok = facts.ae1.groundIsPlaceholder && facts.ae1.noFlatBand;
    if (!facts.ae1.ok) {
        violations.push(
            "AE1: Aurora.vue must paint the palette-derived auroraFallbackGround as the placeholder background on the capable path (the flat linear-gradient(135deg) paletteToCssGradient band RETIRED from Aurora.vue) — a flat-band capable-path first frame is the repulsive-gray defect",
        );
    }

    // ── AE2 — the ground reuses the value.js oklchToLinear core (ONE color source) ─
    facts.ae2.reusesColorCore =
        /import\s*\{[^}]*oklchToLinear[^}]*\}\s*from\s*["']\.\.\/\.\.\/\.\.\/\.\.\/composables\/color["']/.test(
            ground,
        ) && /oklchToLinear\(/.test(ground);
    // No re-implemented OKLCh matrix / Ottosson bake inline (a forked color path).
    facts.ae2.noForkedOklch =
        !/LINEAR_SRGB_TO_LMS|LMS_TO_OKLAB|oklabToLinearSRGB\s*\(/.test(ground);
    facts.ae2.ok = facts.ae2.reusesColorCore && facts.ae2.noForkedOklch;
    if (!facts.ae2.ok) {
        violations.push(
            "AE2: the palette ground must reuse the value.js oklchToLinear core (import from /color + call it) and re-implement NO OKLCh→linear math inline (no forked LMS/oklab matrix)",
        );
    }

    // ── AE3 — the field/content split ────────────────────────────────────────────
    // gl-route-enter is the CONTENT-enter: its from-state COUPLES opacity:0 to a
    // transform rise (P3), so it is a content settle, NOT an atomic opacity-only
    // whole-root fade of the field.
    const routeEnterFrom = fromBlock(keyframeBody(transitions, "gl-route-enter"));
    facts.ae3.contentEnterCoupled =
        /opacity:\s*0/.test(routeEnterFrom) &&
        /transform:\s*translate/i.test(routeEnterFrom);
    // The field/content split is documented on the route-enter register.
    facts.ae3.fieldContentSplitMarker =
        /BI\.W-E10-AURORA-ENTRANCE/.test(transitions) &&
        /field\s*\/\s*content\s*split/i.test(transitions);
    // focal.ts records the palette-ground-persists invariant (the shell suppression is
    // of the LIVE field, never the palette ground; the entrance colors from frame 0).
    facts.ae3.paletteGroundPersistsMarker =
        /BI\.W-E10-AURORA-ENTRANCE/.test(focal) &&
        /LIVE field/.test(focal) &&
        /frame\s*[- ]?0/.test(focal);
    facts.ae3.ok =
        facts.ae3.contentEnterCoupled &&
        facts.ae3.fieldContentSplitMarker &&
        facts.ae3.paletteGroundPersistsMarker;
    if (!facts.ae3.ok) {
        violations.push(
            "AE3: gl-route-enter must be the CONTENT-enter (from-state couples opacity:0 to a transform rise — not an atomic whole-root opacity-only fade) AND the field/content split must be documented in transitions.css (the field is a frame-0 persistent layer outside the enter) + focal.ts (the suppression is of the LIVE field, the palette ground persists from frame 0)",
        );
    }

    // ── AE4 — PRM: palette ground is the static rest frame, fade survives / transform drops ─
    // The route-enter reduce arm swaps to the opacity-only gl-route-fade (drops the rise).
    const reduceArm = transitions.match(
        /@media\s*\(prefers-reduced-motion:\s*reduce\)([\s\S]*?)\n\s*\}\n\}/,
    );
    facts.ae4.routeFadeKeepsDropsTransform =
        /\.route-enter\s*\{\s*animation:\s*gl-route-fade/.test(transitions) &&
        !/transform/.test(keyframeBody(transitions, "gl-route-fade"));
    // Aurora.vue carries the canvas PRM arm (the canvas snaps; the palette ground —
    // painted unconditionally on the placeholder — is the static rest frame).
    facts.ae4.groundIsStaticRestFrame =
        /prefers-reduced-motion:\s*reduce/.test(auroraVue) &&
        /faithfulGround/.test(auroraVue);
    // The reveal-bloom animation sits under `no-preference` (settled from frame 0 under reduce).
    facts.ae4.revealUnderNoPreference =
        /@media\s*\(prefers-reduced-motion:\s*no-preference\)[\s\S]*?canvas\[data-substrate-reveal\][\s\S]*?animation:\s*substrate-reveal-bloom/.test(
            vizReveal,
        );
    facts.ae4.ok =
        facts.ae4.routeFadeKeepsDropsTransform &&
        facts.ae4.groundIsStaticRestFrame &&
        facts.ae4.revealUnderNoPreference &&
        !!reduceArm;
    if (!facts.ae4.ok) {
        violations.push(
            "AE4: PRM — the route-enter reduce arm must keep the fade + drop the transform (gl-route-fade, opacity-only), the palette ground must be the static rest frame (Aurora.vue PRM canvas arm + unconditional ground), and the reveal-bloom must sit under prefers-reduced-motion: no-preference",
        );
    }

    // ── AE5 — the T-60 producer half: the reveal-bloom door + the palette-honest floor ─
    // The aurora runtime exposes the door (revealBloom?: boolean on AuroraRuntimeOptions)
    // and threads it (options.revealBloom ??), NOT a hardwired `revealBloom: true`. The
    // hardwired check runs on comment-STRIPPED code (a doc mention of the literal is fine).
    const runtimeCode = stripComments(runtime);
    const blobCode = stripComments(blob);
    facts.ae5.auroraDoorExposed =
        /revealBloom\?\s*:\s*boolean/.test(runtime) &&
        /revealBloom:\s*options\.revealBloom\s*\?\?/.test(runtimeCode) &&
        !/revealBloom:\s*true\b/.test(runtimeCode);
    // The blob renderer exposes the SAME door (the door lands on BOTH chromatic runtimes).
    facts.ae5.blobDoorExposed =
        /revealBloom\?\s*:\s*boolean/.test(blob) &&
        /revealBloom:\s*options\.revealBloom\s*\?\?/.test(blobCode) &&
        !/revealBloom:\s*true\b/.test(blobCode);
    // The substrate-reveal-bloom keyframe is PALETTE-HONEST: brightness + saturate never
    // dip below 1 (no `brightness(0.x)` / `saturate(0.x)` gray veil). Checked over the
    // KEYFRAME BODY only (the doc comment names the condemned brightness(0.4) form).
    const bloomKf = keyframeBody(vizReveal, "substrate-reveal-bloom");
    facts.ae5.paletteHonestKeyframe =
        bloomKf.length > 0 &&
        !/brightness\(0/.test(bloomKf) &&
        !/saturate\(0/.test(bloomKf);
    facts.ae5.ok =
        facts.ae5.auroraDoorExposed &&
        facts.ae5.blobDoorExposed &&
        facts.ae5.paletteHonestKeyframe;
    if (!facts.ae5.ok) {
        violations.push(
            "AE5 (T-60): the revealBloom consumer door must be exposed on AuroraRuntimeOptions AND the blob renderer options (revealBloom?: boolean, threaded options.revealBloom ?? — not hardwired true), and the substrate-reveal-bloom keyframe must be palette-honest (no brightness<1 / saturate<1 veil over the chromatic field)",
        );
    }

    return { facts, violations };
}

// ── The self-test bites — the false-witness discipline (each REDs its clause). ────
function selfTest() {
    const goodAuroraVue = `
      import { auroraFallbackGround } from "./composables/auroraFallbackGround";
      const faithfulGround = computed(() => auroraFallbackGround(props.config));
      const placeholderBackgroundImage = computed(() => faithfulGround.value.backgroundImage);
      @media (prefers-reduced-motion: reduce) { .aurora-canvas { transition-duration: 1ms; } }`;
    const goodGround = `
      import { oklchToLinear } from "../../../../composables/color";
      export function sampleAuroraField(config, x, y) { return oklchToLinear(config.palette[0]); }`;
    const goodTransitions = `
      /* BI.W-E10-AURORA-ENTRANCE — the FIELD / CONTENT SPLIT: content-enter only. */
      .route-enter { animation: gl-route-enter var(--spring-snappy-duration) var(--spring-snappy) backwards; }
      @media (prefers-reduced-motion: reduce) {
        .route-enter { animation: gl-route-fade var(--duration-fast) var(--ease-out) backwards; }
      }
      @keyframes gl-route-enter { from { opacity: 0; transform: translateY(1.25rem); } to { opacity: 1; transform: none; } }
      @keyframes gl-route-fade { from { opacity: 0; } to { opacity: 1; } }`;
    const goodFocal = `
      // BI.W-E10-AURORA-ENTRANCE — the suppression is of the LIVE field, the palette
      // ground persists from frame 0.`;
    const goodRuntime = `
      export interface AuroraRuntimeOptions { revealBloom?: boolean; }
      const handle = createGpuSubstrate(canvas, { revealBloom: options.revealBloom ?? false });`;
    const goodBlob = `
      export interface UseMetaballRendererOptions { revealBloom?: boolean; }
      const h = createGpuSubstrate(canvas, { revealBloom: options.revealBloom ?? true });`;
    const goodVizReveal = `
      @keyframes substrate-reveal-bloom {
        from { opacity: 0; filter: brightness(1) saturate(1); }
        55% { filter: brightness(1.08) saturate(1.05); }
        to { opacity: 1; filter: brightness(1) saturate(1); }
      }
      @media (prefers-reduced-motion: no-preference) {
        canvas[data-substrate-reveal] { animation: substrate-reveal-bloom var(--substrate-reveal-duration) var(--ease-out); }
      }`;

    const base = {
        auroraVue: goodAuroraVue,
        ground: goodGround,
        transitions: goodTransitions,
        focal: goodFocal,
        runtime: goodRuntime,
        blob: goodBlob,
        vizReveal: goodVizReveal,
    };

    const bites = [];

    // Bite A — a flat-band capable-path first frame (paletteToCssGradient back in Aurora.vue) reds AE1.
    {
        const bad =
            goodAuroraVue +
            `\n const placeholderBackgroundImage2 = resolvedRenderMode === "css" ? faithfulGround.value.backgroundImage : paletteToCssGradient(cfg.palette);`;
        const { facts } = detectAuroraEntrance({ ...base, auroraVue: bad });
        bites.push({ name: "AE1 flat-band-capable-path reds", reds: !facts.ae1.ok });
    }
    // Bite B — an atomic whole-root opacity-only fade (no transform coupling) reds AE3.
    {
        const bad = goodTransitions.replace(
            "@keyframes gl-route-enter { from { opacity: 0; transform: translateY(1.25rem); } to { opacity: 1; transform: none; } }",
            "@keyframes gl-route-enter { from { opacity: 0; } to { opacity: 1; } }",
        );
        const { facts } = detectAuroraEntrance({ ...base, transitions: bad });
        bites.push({ name: "AE3 atomic-root-fade reds", reds: !facts.ae3.ok });
    }
    // Bite C — a re-implemented OKLCh bake (no oklchToLinear reuse) reds AE2.
    {
        const bad = `
          const LMS_TO_OKLAB = [];
          export function sampleAuroraField(config, x, y) { return oklabToLinearSRGB(0,0,0); }`;
        const { facts } = detectAuroraEntrance({ ...base, ground: bad });
        bites.push({ name: "AE2 forked-oklch reds", reds: !facts.ae2.ok });
    }
    // Bite D — a brightness<1 / saturate<1 gray veil in the keyframe reds AE5.
    {
        const bad = goodVizReveal.replace(
            "from { opacity: 0; filter: brightness(1) saturate(1); }",
            "from { filter: brightness(0.4) saturate(0.7); }",
        );
        const { facts } = detectAuroraEntrance({ ...base, vizReveal: bad });
        bites.push({ name: "AE5 brightness<1-veil reds", reds: !facts.ae5.ok });
    }
    // Bite E — a hardwired reveal-bloom (no door, revealBloom: true) reds AE5.
    {
        const bad = `
          const handle = createGpuSubstrate(canvas, { revealBloom: true });`;
        const { facts } = detectAuroraEntrance({ ...base, runtime: bad });
        bites.push({ name: "AE5 hardwired-reveal-bloom reds", reds: !facts.ae5.ok });
    }

    return bites;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_AURORA_ENTRANCE_ARTIFACT",
        "BI-aurora-entrance",
    );

    const inputs = {
        auroraVue: safeRead(resolve(ROOT, AURORA, "Aurora.vue")),
        ground: safeRead(resolve(ROOT, AURORA, "composables/auroraFallbackGround.ts")),
        transitions: safeRead(resolve(ROOT, "src/styles/transitions.css")),
        focal: safeRead(resolve(ROOT, "demo/chassis/hero/focal.ts")),
        runtime: safeRead(resolve(ROOT, AURORA, "composables/runtime.ts")),
        blob: safeRead(
            resolve(ROOT, "src/components/custom/blob/composables/useMetaballRenderer.ts"),
        ),
        vizReveal: safeRead(resolve(ROOT, "src/styles/viz-reveal.css")),
    };

    const { facts, violations } = detectAuroraEntrance(inputs);

    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.selfTest = { bites, allBite: biteFailures.length === 0 };
    if (!facts.selfTest.allBite) {
        violations.push(
            `SELF-TEST: bite(s) did not RED: ${biteFailures
                .map((b) => b.name)
                .join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:aurora-entrance",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:aurora-entrance — the palette-derived aurora entrance (BI.W-E10-AURORA-ENTRANCE / value.js T-60)",
    );
    console.log(`  AE1 capable-path first frame = palette ground (no flat band) : ${yn(facts.ae1.ok)}`);
    console.log(`  AE2 ground reuses value.js oklchToLinear (one color source)  : ${yn(facts.ae2.ok)}`);
    console.log(`  AE3 field/content split (content-enter, field persists)      : ${yn(facts.ae3.ok)}`);
    console.log(`  AE4 PRM — palette ground is the static rest frame            : ${yn(facts.ae4.ok)}`);
    console.log(`  AE5 reveal-bloom door + palette-honest floor (T-60)          : ${yn(facts.ae5.ok)}`);
    console.log(`  self-test bites RED                                          : ${yn(facts.selfTest.allBite)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT}`);

    process.exit(status === "pass" ? 0 : 1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    run();
}
