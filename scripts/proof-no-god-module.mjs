#!/usr/bin/env node
// The no-god-module line-bound gate (proof:no-god-module).
//
// NO `src/` `.ts`/`.vue` file may exceed 500 lines. The gate WARNS at 300 (the
// early-signal band — a file past 300 is approaching the bound and should be
// watched) and BITES (RED) the instant a file grows past 500.
//
// THE RATCHET. `RATCHET_BASELINES` grandfathers a known over-bound file at its
// frozen line count so the gate can go CI-GREEN before its carve lands while
// reddening any GROWTH:
//   • lines ≤ 500                                  → PASS.
//   • 500 < lines ≤ baseline (a baseline row)      → GRANDFATHERED (a reported
//                                                    fact, NOT a violation).
//   • lines > 500 && (no baseline || > baseline)   → RED.
// The ratchet is MONOTONIC — a baseline only DRAINS: a file that shrinks under
// 500 has its row deleted in the same diff (it can never silently refill). The
// close state is BOTH `violations == []` AND `RATCHET_BASELINES == {}` —
// grandfathering is an interim state, never a close state.
//
// THE CONTRACT CHANGE (BG.W-GOD-MODULE-STRUCTURAL / GA-4). A new grandfathered
// baseline is not a free re-baseline that normalizes the disease it kills — it
// REQUIRES a companion carve-successor. Every LIVE ratchet row MUST carry an
// inline `// CARVE-SUCCESSOR(<wave-id>):` marker on its own source line naming
// the wave that DRAINS it (a live row with no marker REDs). The markers ARE the
// drain chain made VISIBLE — the `RATCHET_BASELINES == {}` cut precondition is
// self-documenting: read the markers, follow each to its owning carve wave. The
// baseline is FROZEN at the file's CURRENT count (no silent refill room — a
// baseline holding a value ABOVE the file's live line count REDs as stale).
//
// THE PHANTOM-SUCCESSOR RESOLUTION (BI.W-STYLE-REDRAIN / N2 / FAM-12). The
// CARVE-SUCCESSOR(<wave-id>) marker is no longer a bare string — its wave-id MUST
// RESOLVE to a real wave spec on disk at `docs/tranches/<LETTER>/waves/<wave-id>.md`.
// A carve-successor that names a wave which NEVER landed (a phantom — e.g. the two
// HEAD rows booking the never-written `BG.W-COHERENCE-CENSUS`) is a drain that self-
// normalizes the disease the ratchet kills, so the close REDs until the row is DRAINED
// or re-pointed to its REAL owning wave. This is the FAM-12 phantom-carve-successor
// class made machine-locked — the `RATCHET_BASELINES == {}` cut precondition's drain
// chain is now not only NAMED but PROVEN-owned.
//
// THE TRANCHE-BASELINE MANIFEST — GROWTH REDS THE GROWING WAVE (BI.W-RATCHET-GROWTH /
// GF5). The ratchet above makes a baseline SHRINK-only, but a GROWING wave could still
// ride green by (a) growing a file past 500 in its OWN diff and (b) adding its OWN
// baseline row + a (possibly phantom) carve-successor — "normalizing" the regrowth by
// booking a future drain (the GF5 "ratchet normalizes regrowth" disease). BI kills it
// at the CONTRACT level: `TRANCHE_BASELINE_MANIFEST` is the FROZEN set of files ALREADY
// >500 at the BI TRANCHE START (+ their frozen BI-start counts), and it is the ONLY
// legal source of baseline keys:
//   • R1 — a RATCHET_BASELINES key ABSENT from the manifest is a wave-INTRODUCED grow
//          (a file ≤500 at tranche start crossing the bound + self-grandfathering) →
//          RED. No self-added baseline row can grandfather wave-introduced growth.
//   • R2 — a manifest key whose LIVE line count EXCEEDS its frozen baseline REDs (a
//          grandfathered file that grew MORE, or a drained manifest file a later wave
//          re-inflated past its tranche-start count). A manifest file may only SHRINK.
// This makes the `RATCHET_BASELINES == {}` cut-precondition MONOTONIC-BY-CONSTRUCTION —
// a wave cannot re-inflate the map, only DRAIN it (shrink or delete a manifest key). The
// manifest is a BI-start snapshot LITERAL (frozen below, never edited by a later wave —
// a new >500 file REDs the introducing wave, it does NOT earn a manifest row); the
// drains (BI.W-STYLE-REDRAIN, BI.W-ENCAP-REDRAIN, D-DOCK, D-VIZ) shrink/delete its keys
// toward ∅. proof:encapsulation MIRRORS R1 (it imports this frozen manifest and reds any
// RATCHET_BASELINES key outside it — one manifest, two independent enforcers).
//
// THE SHADER-LITERAL EXEMPTION (BG.W-GOD-MODULE-STRUCTURAL / FC-B10). The
// ratchet is LOGIC-only. A `*.{wgsl,glsl,frag,vert}.ts` file is ONE cohesive
// GPU-program literal string — splitting it into line-count fragments breaks the
// GL/GPU program fence for ZERO logic benefit — so it is EXEMPT from the bound
// entirely: never a violation, and it MUST NOT carry a ratchet row (the
// exemption supersedes the ratchet; a shader path in RATCHET_BASELINES is RED).
//
// Excludes: `__tests__/` directories (test fixtures legitimately run long) and any
// concatenated build output (the gate walks `src/` source only, never `dist/`).
//
// bite-check: a 501-line src/*.ts (or *.vue) with no baseline → RED; append one
// line to a grandfathered file (past its baseline) → RED; a grandfathered row
// with no CARVE-SUCCESSOR marker → RED; a >500 shader literal → EXEMPT (not RED),
// but a shader path carrying a ratchet row → RED.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 (O1) — the per-monolith ordered partial-list authority. The `.css`
// arm asserts the carved monoliths @import their partials in the recorded
// cascade order (import-order preservation; the F3 caveat).
import { assertMonolithImportOrder } from "./read-css-monoliths.mjs";

const HARD_LIMIT = 500;
const WARN_LIMIT = 300;

// The shader-literal exemption (BG.W-GOD-MODULE-STRUCTURAL / FC-B10). A file
// whose name ends `.wgsl.ts` / `.glsl.ts` / `.frag.ts` / `.vert.ts` is ONE
// cohesive GPU-program literal string — the ratchet is LOGIC-only, so a shader
// literal is EXEMPT from the bound (never a violation; never a ratchet row).
const SHADER_LITERAL = /\.(wgsl|glsl|frag|vert)\.ts$/;

/** Escape a string for use inside a RegExp (the ratchet-key path safe form). */
function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * The companion carve-successor id a LIVE ratchet row must carry (the CONTRACT
 * change). The gate's own source line for `"<path>": <n>` must carry a
 * `CARVE-SUCCESSOR(<wave-id>)` marker naming the wave that DRAINS it. Returns
 * the wave-id string, or null when the marker is absent (→ the row REDs).
 */
function carveSuccessorFor(source, path) {
    const keyRe = new RegExp(`["']${escapeRe(path)}["']\\s*:`);
    for (const line of source.split("\n")) {
        if (keyRe.test(line)) {
            const m = line.match(/CARVE-SUCCESSOR\(\s*([^)\s]+)\s*\)/);
            return m ? m[1] : null;
        }
    }
    return null;
}

/**
 * BI.W-STYLE-REDRAIN (N2) — the PHANTOM-successor resolution. A LIVE ratchet row's
 * CARVE-SUCCESSOR(<wave-id>) must resolve to a real wave spec on disk at
 * `docs/tranches/<LETTER>/waves/<wave-id>.md`. A carve-successor that names a wave
 * that NEVER landed (the FAM-12 phantom-carve-successor class — e.g. property-regs.css
 * booking the never-written BG.W-COHERENCE-CENSUS) is a drain that self-normalizes the
 * disease it kills, so the close REDs until the row is DRAINED or re-pointed to a REAL
 * owning wave. Returns true iff `<wave-id>.md` exists under some tranche's `waves/` dir.
 */
function waveSpecExists(root, waveId) {
    const tranches = resolve(root, "docs/tranches");
    let dirs;
    try {
        dirs = readdirSync(tranches, { withFileTypes: true });
    } catch {
        return false;
    }
    for (const d of dirs) {
        if (!d.isDirectory()) continue;
        if (existsSync(resolve(tranches, d.name, "waves", `${waveId}.md`))) return true;
    }
    return false;
}

/**
 * BI.W-RATCHET-GROWTH — THE FROZEN TRANCHE-BASELINE MANIFEST. The set of non-shader
 * `src/` files ALREADY over the 500-line bound at the BI TRANCHE START (commit 690fef91
 * "BI GREENLIGHT (user 2026-07-12): execution begins"), each pinned at its frozen BI-start
 * line count. This is the ONLY legal source of RATCHET_BASELINES keys (R1) and the
 * monotonic upper bound each key may hold (R2 — a manifest file may only SHRINK). A key
 * ABSENT here is a wave-INTRODUCED grow; a manifest file whose LIVE count EXCEEDS its
 * frozen value is a re-inflation — both RED. FROZEN: a later wave NEVER edits this map (a
 * new >500 file REDs the introducing wave, it does NOT earn a manifest row). The drains
 * empty RATCHET_BASELINES toward ∅; this manifest stays as the immutable BI-start witness.
 *
 * SOURCE FORM — the manifest is an ARRAY OF `[path, count]` TUPLES (→ Object.fromEntries),
 * NOT an object literal, DELIBERATELY: sibling gates (proof:encapsulation C1,
 * proof:dock-decompose D1, and every future per-file drain gate) detect a LIVE ratchet row
 * by scanning THIS file's text for the `"<path>": <n>` shape. An object-literal manifest
 * row shares that exact shape and would be mis-read as a live ratchet row for the paths it
 * lists (a false rowPresent that would block a real drain from greening those gates). The
 * tuple form (`["<path>", <n>]` — a comma after the quoted path, never a colon) cannot match
 * the `"<path>"\s*:\s*\d+` scanners, so ONE map lives in the god-module without polluting the
 * consumers' whole-text row detection. Do NOT convert this to an object literal.
 */
const TRANCHE_BASELINE_MANIFEST = Object.fromEntries([
    ["styles/segmented-tabs.css", 572], // drained → BI.W-STYLE-REDRAIN (413)
    ["styles/tokens/property-regs.css", 563], // drained → BI.W-STYLE-REDRAIN (405)
    ["composables/glass/useGlassBackdropLuminance.ts", 554], // drained → BI.W-ENCAP-REDRAIN (365)
    ["styles/dock/shell.css", 524], // over-bound → B3 D-DOCK
    ["components/custom/dock/DockLayerGroup.vue", 524], // over-bound → B3 D-DOCK
    ["components/custom/dock/GlassDock.vue", 515], // over-bound → B3 D-DOCK
    ["styles/glass/ladder.css", 510], // drained → BI.W-STYLE-REDRAIN (452)
    ["styles/glass/surfaces.css", 508], // drained → BI.W-STYLE-REDRAIN (434)
    ["styles/tokens/dark-arm.css", 507], // drained → BI.W-STYLE-REDRAIN (455)
    // aurora/composables/runtime.ts — DRAINED → BI.W-FIELD-CORE (the cursorModel retire onto
    // the shared field + auroraCursorMapping dropped it 502 → 498, ≤500; the ratchet only drains).
]);

/**
 * The per-violator ratchet baselines — a file over 500 lines that is
 * grandfathered at the frozen count below until its carve drains the row. KEYED
 * by the `src/`-relative POSIX path. Empty = every file is under bound (the close
 * state). A row whose value is ABOVE the frozen open count MUST carry a
 * `// BOOK(<wave-id>):` marker (asserted below). Every key MUST be a member of the
 * frozen TRANCHE_BASELINE_MANIFEST above (R1) — a key outside it is a wave-introduced
 * grow the growth-red clause reds (GROWTH reds the growing wave).
 */
const RATCHET_BASELINES = {
    // BB.W-CARVE4 DRAINED the FINAL five ratchet rows to ∅ — the carve LANDED, the
    // close state reached (`violations == []` AND `RATCHET_BASELINES == {}`):
    //   • components/custom/dock/composables/dockMorphContext.ts (575 → 488) → the
    //     PURE measure/seat helpers (measureTo/seatTargetSync + the BA-VJS-1 nested-
    //     ordering nestedTargetsWithin/forceNestedMaxContent + the geometry primitives)
    //     extracted into a sibling composables/dockMorphMeasure.ts (165, the aurora/
    //     goo-blob/useFourierField colocation pattern); the orchestrator stays the
    //     morph driver + IMPORTS them. DOCK_SPRING byte-fenced.
    //   • styles/tokens/glass.css (505 → 194) → the decorative/fx tail (grain/specular/
    //     edge-light + the adaptive tint-source/backdrop-luma bucket + fringe/curvature/
    //     chart-palette + the per-tier shadow/spine/under-shadow/overlay-scrim) carved
    //     into tokens/glass-fx.css (333), an adjacent :root{} block @import-ed
    //     IMMEDIATELY AFTER glass.css; the §8 opacity/blur/saturate LADDER + composed
    //     bg/border + control-REST register stay. Dist byte-identical.
    //   • components/custom/tabs/SegmentedTabs.vue (543 → 478) → the BB.W-DRAG-MORPH
    //     wiring (the snap targets + useDragMorph call + the --stretch/refresh watchers)
    //     extracted into tabs/composables/useTabDragMorph.ts (131, the useTabIndicator
    //     sibling pattern); the SFC IMPORTS it.
    //   • styles/tokens/scale-paper.css (551 → 437) → the §20 PLATFORM MOTION section
    //     (the scroll-driven/choreography --scroll-* knobs + TOP-LAYER + VIEW-TRANSITION
    //     + dock-spring) carved WHOLE into tokens/scroll-tokens.css (123) at the §19/§20
    //     seam (the file's last section — a contiguous tail carve); the paper/control/
    //     display/metal/timeline/metric/table families stay. Dist byte-identical.
    //   • styles/glass/ladder.css (510 → 433) → the AW.W22 unified rim + the
    //     BB.W-GLASS-ACCENT per-INSTANCE chromatic rim/accent group carved into
    //     glass/rim.css (100), an adjacent @layer components block @import-ed
    //     IMMEDIATELY AFTER ladder.css (the SOLE writer of --glass-material-rim/
    //     --glass-border-accent, so cascade-order-invariant); the 5-rung ladder + the
    //     W55 bright-bucket @container (kept to preserve the contrast-color @supports
    //     source-order tie) + the calm-tier re-point + the ink-flip + the opaque escape
    //     + the under-shadow modifier + the grain ::after stay. Dist byte-identical.
    // The MONOTONIC drain is honoured (the rows DELETED in the same diff that carved
    // the files — a stale row reds, the gate's own guard). The ratchet WAS ∅ at the
    // W-CARVE4 close-state; the Batch-V/B-ask waves re-grew three files past the bound
    // (legitimate capability growth), BOOK'd to W-CARVE5.
    //
    // BB.W-CARVE5 RE-DRAINED those final three rows to ∅ — the FINAL ratchet re-drain
    // before W-CLOSE (the close-state `violations == []` AND `RATCHET_BASELINES == {}`):
    //   • components/custom/aurora/constants/shaders/mediums.glsl.ts (595 → 495) → the
    //     `StrokeProfile profileFor(int medium, int mode)` (medium,mode)→StrokeProfile
    //     selector carved into a sibling shaders/oil-modes.glsl.ts and spliced back into
    //     AURORA_MEDIUMS_POST_BRUSH_GLSL via a template join (immediately after the
    //     StrokeProfile struct, before paintStrokeLayers). The carve target moved off the
    //     W-AUR-KUWAHARA mediumKuwahara body (the BOOK marker's suggestion) because that
    //     body is grep-locked to mediums.glsl.ts by proof:aur-kuwahara — profileFor is the
    //     same-size cohesive non-grep-locked block, and every grep-locked body
    //     (mediumKuwahara/structureTensorField/mediumOilPastel/mediumCrayon) + the
    //     relightImpasto-call witness STAY. The ASSEMBLED shader string is BYTE-IDENTICAL
    //     (proven: PRE/POST_BRUSH identical to HEAD — the GL shader fence holds); only the
    //     proof:composable-return-types internal recompose hash re-snapshots (the same GLSL
    //     byte multiset, re-ordered by the MEDIUM_SIBLINGS concat — oil-modes was already
    //     enrolled in MEDIUM_SIBLINGS).
    //   • api/index.ts (543 → 483) → the contiguous composable-return + motion-curve type
    //     re-export run (Count-up / useDragMorph / useLiquidReveal / useDockCtaReceive / the
    //     motion suite + curve library) carved into a sibling api/types-extra.ts, re-joined
    //     via `export type * from "./types-extra"`. The @mkbabb/glass-ui/api public symbol
    //     set is byte-identical (164 symbols, verified) and every grep-locked discovery type
    //     (BorderProgress/EasingPicker/Surface/IconChip/HandMark/PagerDots/SpaView) STAYS
    //     textually in api/index.ts for the per-surface source gates.
    //   • components/custom/aurora/composables/atoms.ts (506 → 414) → the FIELD-MAPPING
    //     leaves (the COLOR-energy poles + MOTION_FIELDS table, the textured-medium texture
    //     fan + its inverse, the lerp/unlerp/motion inverses) carved into a sibling
    //     composables/atoms-fields.ts, imported back. The ZONES `nucleiPrior` + the NOISE
    //     `applyNoise`/`warpModeFor` fan + the `{kind:"smooth"}` arm + the public door
    //     (resolveAtoms/configToAtoms/DEFAULT_ATOMS + the atom types) STAY (the
    //     proof:aurora-atoms-roundtrip source witnesses read them in atoms.ts).
    //
    // BD.W-CUT — the BD greenfield build re-grew 19 files past the 500-line bound as
    // legitimate capability growth (the iOS-27 liquid-dock + procedural-viz + goo +
    // motion suite). The W-CUT close BOOKS them at their landed count; the EXEMPLAR
    // carve already LANDED this commit — dot-flow's 994-line useFlowParticles.ts split
    // into colocated backend leaves (flowSetupWGPU/flowSetupGL/flowSetupGLFlow/
    // flowGLProgram, all < 500), so it carries NO row. The remaining rows fall in two
    // buckets:
    //   (a) GENUINELY IRREDUCIBLE — one cohesive shader-program string or one ordered
    //       cascade-partial CSS file (splitting breaks the GL/cascade fence):
    //       metaball.wgsl.ts (the ONE metaball WGSL program), metaball.frag.ts (the ONE
    //       GL fragment program), flow-field.glsl.ts (the shared GLSL chunk the GL leaves
    //       both link), property-regs.css / scheme-motion.css / fission-bridge.css
    //       (ordered @property/@layer cascade partials — a split reorders the cascade).
    //   (b) IN-FLIGHT cluster src owned by a SIBLING P10 lane (the carve is that lane's
    //       deferred work, not this STRUCTURAL lane's to edit — lane discipline): the
    //       dock engine (GlassDock.vue, useDockFission.ts),
    //       the glass canvas/luminance (createCanvasLifecycle.ts, useWebGPUCanvas.ts,
    //       useGlassBackdropLuminance.ts), goo (useBlobSatellites.ts, useGooDotMatrix.ts),
    //       carousel/pager/tabs SFCs, useBloomUp.ts, api/index.ts.
    // The MONOTONIC drain holds — each row only DRAINS as its carve lands; a row that
    // shrinks below its baseline reds (the gate's stale-row guard). No backwards-compat.
    // BG.W-DEAD-COMPOSABLE-CUT DRAINED liquid-morph.css (850 → 0 in src/): the dead
    // useLiquidMorph spike was DEFINITION-ABSENT'd and this demo-face CSS MOVED to
    // demo/stories/dock/liquid-morph.css (co-located with its only consumer,
    // liquid-playground.vue) — the file left src/, so the baseline row DELETED in this
    // same diff (the monotonic drain — the src/ path is now absent).
    // BG.W-DOCK-DECOMPOSE DRAINED GlassDock.vue (711 → 495): the collapsed-pill
    // touch-gate (useTouchGate + tap/scroll discrimination + collapse-on-deactivate
    // watch) carved into composables/useDockTouchGate.ts, and the fission split-facility
    // wiring (split-signature/placement refs + piece auto-registration + detach vectors
    // + drag-to-split pointer state + imperative split/merge/toggle) carved into
    // composables/useDockFissionWiring.ts — the F6.5 one-writer-per-concern seams (each
    // carved leaf is single-consumer-by-design, NEVER a --dock-morph-t/--dock-morph-v
    // writer; the morph scalar stays the orchestrator's). The SFC IMPORTS both. Row
    // DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    // BG.W-COLOCATE DRAINED createCanvasLifecycle.ts (736 → 457): the ONE backing-store
    // sizer (sizeBacking + BackingSize/DprPolicy) carved into the colocated backingSize.ts,
    // and the DOM-observer plumbing (tab-visibility owner + content-visibility offscreen-park
    // + the leaf ResizeObserver/presize + the IntersectionObserver park + the one-shot
    // first-visible reveal bloom) carved into visibility.ts — the scheduler (the suspend Set +
    // rAF tick/wake gate + the live reduced-motion re-monitor + the context-loss circuit-breaker)
    // COMPOSES both leaves, driving them through injected suspend/resume/resize/wake callbacks.
    // The reader gates (proof:viz V1/V5/R5/R6, proof:offscreen-pause F1/F4, proof:webgl-substrate-
    // single + proof:gpu-substrate-single + proof:constellation-substrate-single leaf-machinery)
    // FOLLOW the carve into the leaves via the UNION read. Row DELETED in this same diff (the
    // monotonic drain — the file is now ≤ 500). Locked by proof:encapsulation.
    // BG.W-COLOCATE DRAINED useWebGPUCanvas.ts (606 → 474): the acquire-timeout race +
    // WEBGPU_ACQUIRE_TIMEOUT_MS carved into the webgpuDevice.ts device-support leaf (beside the
    // typed WebGPUInitError it throws), and the public TYPE surface (WebGPUCanvasFrame/Options/
    // Handle + WebGPUSuspendReason) carved into webgpuCanvasTypes.ts; the substrate re-imports +
    // re-exports both so the picker + barrel reach them unchanged. The WebGPU bootstrap
    // (navigator.gpu/getContext("webgpu")/requestAdapter) STAYS in the substrate (clause A). Row
    // DELETED in this same diff (the monotonic drain — the file is now ≤ 500). Locked by
    // proof:encapsulation.
    // BG.W-DOCK-FISSION-WIRE DRAINED useDockFission.ts (604 → ≤ 500): the fission SIGNATURE
    // data (the per-context goo-signature MAP + the placement vectors + their types) carved
    // into the colocated composables/dockFissionSignatures.ts (the orchestrator READS the
    // descriptor, re-exports it for the byte-identical public surface), AND the spring
    // routed through the ONE useDockSpring factory (the create/re-base/dispose dance no
    // longer hand-rolled). Row DELETED in this same diff (the monotonic drain — file ≤ 500).
    // BH.B2.4a DRAINED CarouselContent.vue (577 → 375): the embla scroll/select wiring +
    // the DRIVER-vs-OBSERVER autoplay seam + the barbell geometry carved into the colocated
    // ui/carousel/composables/useCarouselWorm.ts (the SFC keeps template + style + the refs).
    // Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    // BI.W-STYLE-REDRAIN DRAINED property-regs.css (563 → 405): the §11b pointer-anchored
    // moving-specular :root/.dark magnitude cohort + the interaction/scroll DRIVE @property
    // registrations (--glass-btn-press-t / --seal-* / --scroll-t / --chrome-collapse-t)
    // carved into a sibling tokens/property-regs-specular.css, @import-ed by tokens.css
    // IMMEDIATELY AFTER property-regs.css (order-invariant @property registrations + the
    // sole-writer specular :root/.dark cohort → the dist is byte-isomorphic; read-css-
    // monoliths tokens.order re-pointed). The PHANTOM CARVE-SUCCESSOR(BG.W-COHERENCE-CENSUS)
    // — a wave-spec that NEVER landed on disk — is DISCHARGED by the drain (the FAM-12
    // phantom-carve-successor class). Row DELETED in this same diff (the monotonic drain —
    // the file is now ≤ 500).
    // BD.W-CUT (no-god-module carve) — scheme-motion.css DRAINED (585 → 359): its
    // §2 EASING block (spring linear() curves + per-spring duration clocks + the
    // goo-morph dwell-flow curves incl. --pager-worm-flow + bezier cores/aliases)
    // carved WHOLE into the adjacent scheme-spring.css (239), @import-ed
    // IMMEDIATELY AFTER scheme-motion.css at the same cascade slot. The row is
    // DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    // BG.W-DOCK-FISSION-WIRE DRAINED fission-bridge.css (552 → ≤ 500): the fission ASSEMBLY
    // (the goo NECK filament + the SECOND-DOCK island plate) carved WHOLE into the colocated
    // dock/fission-island.css, @import-ed by dock.css IMMEDIATELY AFTER fission-bridge.css
    // into the SAME @layer components (order-preserving, unique selectors — no visual
    // delta). Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    // BG.W-DEAD-COMPOSABLE-CUT DRAINED useDockContextSilhouette.ts (551 → gone): the BE
    // dock-context-silhouette state machine had ZERO live consumer (its only demo
    // AppSwitcher.vue reads useBloomUp, not this) and was DEFINITION-ABSENT'd. Row
    // DELETED in this same diff (the monotonic drain — the file is now absent from disk).
    // BG.W-COLOCATE DRAINED useGlassBackdropLuminance.ts (534 → 438): the ambient-hue
    // histogram (the value.js srgbToOKLab/rawOklabToOklch color source + makeHueHistogram/
    // accumulateHuePixel/resolveAmbientHue + the AMBIENT_* constants + the gray-null identity)
    // carved into the colocated ambientHueHistogram.ts; the observer COMPOSES it (keeps the
    // sampling loop + the getImageData/canvas + the accumulate CALL). The value.js import moved
    // WITH the histogram so proof:single-color-core follows; proof:glass-foundation A1 reads the
    // UNION. Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500). Locked
    // by proof:encapsulation.
    // BG.W-BLOB-KINEMATICS-LEAF DRAINED useBlobSatellites.ts (533 → 427): the stateless
    // orbit/eccentricity/wobble math (createSatellite/orbitPos/randomizeOrbit) carved into
    // the colocated composables/satelliteKinematics.ts leaf (a pure math family — no
    // closure state, no SpringProgress fork); the driver KEEPS the satellite pool + the
    // phase state-machine + the pure numeric helpers (randRange/clamp01/lerp) and IMPORTS
    // the three kinematics functions. Row DELETED in this same diff (the monotonic drain —
    // the file is now ≤ 500). Locked by proof:encapsulation.
    // BG.W-GOD-MODULE-STRUCTURAL EXEMPTED metaball.wgsl.ts (529) — the shader-literal
    // exemption (FC-B10): a `*.wgsl.ts` GPU-program string is EXEMPT from the bound
    // (the ratchet is LOGIC-only), so its ratchet row is DELETED here (no CARVE-SUCCESSOR
    // owed; splitting a cohesive shader program breaks the GL fence for zero logic gain).
    // BH.B2.4a DRAINED PagerDots.vue (509 → 433): the worm geometry (centerOf/restSize) +
    // the useGooMorph instance + the active/shown travel/settle driver carved into the
    // colocated pager-dots/composables/usePagerWorm.ts (+ the named consts into constants.ts);
    // the SFC keeps the interaction layer (dot maps + keyboard focus recovery) + template +
    // style. Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500).
    // BG.W-GOD-MODULE-STRUCTURAL EXEMPTED flow-field.glsl.ts (517) — the shader-literal
    // exemption (FC-B10): a `*.glsl.ts` shared GPU chunk is EXEMPT (logic-only ratchet), so
    // its ratchet row is DELETED here (no CARVE-SUCCESSOR owed).
    // BG.W-COLOCATE DRAINED SegmentedTabs.vue (512 → 405): the responsive-collapse concern
    // (the <Select>-below-the-breakpoint fold + its matchMedia lifecycle) carved into the
    // colocated composables/useTabResponsive.ts, and the WAI-ARIA roving-tabindex keyboard
    // machine (the axis-derived arrows + Home/End + wrapping + disabled-skip) carved into
    // composables/useTabRovingFocus.ts — the SFC IMPORTS both + keeps the template wiring. The
    // reader gates (proof:liquid-tab L5, proof:drag-morph D5) FOLLOW the carve into the leaves.
    // Row DELETED in this same diff (the monotonic drain — the file is now ≤ 500). Locked by
    // proof:encapsulation.
    // BG.W-GOD-MODULE-STRUCTURAL EXEMPTED metaball.frag.ts (510) — the shader-literal
    // exemption (FC-B10): a `*.frag.ts` GL fragment-program string is EXEMPT (logic-only
    // ratchet), so its ratchet row is DELETED here (no CARVE-SUCCESSOR owed).
    // BG.W-GOODOT-SETUP-SPLIT DRAINED useGooDotMatrix.ts (497 → 322): the two setupWGPU/setupGL
    // draw builders carved into the sibling composables/gooDotFrame.ts (249, calls the
    // byte-identical gooDotSetup.ts creators); the composable keeps the sim + shared field-advance
    // + demand gate + lifecycle handle. Row DELETED in this same diff (the monotonic drain — ≤ 500).
    // BH.B2.4a DRAINED useBloomUp.ts (507 → 449): the pure field-channel resolution + write
    // helpers (resolveField/resolveHue/clampStrength/prefersReducedMotion + the field hue/
    // strength/release writes) carved into the sibling composables/motion/bloomUpField.ts;
    // the renderer stays. Row DELETED in this same diff (the monotonic drain — file ≤ 500).
    // BG.W-GOD-MODULE-STRUCTURAL DRAINED api/index.ts (505 → 490): the file re-shrank under
    // the bound (subpath-set trims), so its stale row is DELETED here (the monotonic drain —
    // a baseline holding a value ABOVE the live count is silent refill room, now closed).
    //
    // ── THE DRAIN CHAIN made VISIBLE (BG.W-GOD-MODULE-STRUCTURAL / GC-FC8c; the N2
    //    phantom-resolution clause added at BI.W-STYLE-REDRAIN). Every LIVE ratchet row
    //    names an owning carve-successor wave whose spec RESOLVES on disk (docs/tranches/
    //    **/waves/<id>.md) — a PHANTOM successor (a drain booked to a wave that never
    //    landed) REDs the close (the FAM-12 phantom-carve-successor class made machine-
    //    locked). property-regs.css DRAINED at BI.W-STYLE-REDRAIN (above); runtime.ts DRAINED
    //    at BI.W-FIELD-CORE (the cursorModel retire onto the shared field + auroraCursorMapping
    //    dropped 502 → 498, ≤500 — the row is DELETED, the ratchet only drains). No LIVE
    //    non-shader over-bound row remains in this manifest.
};

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_NO_GOD_MODULE_ARTIFACT",
            "AV-no-god-module",
        ),
    };
    return _cliPaths;
}

/** Recursively collect `.ts`/`.vue`/`.css` files under `dir`, skipping `__tests__/`.
 *  AY.W-CSS1 (O1) — `.css` joins the filter so the ONE bound covers the style
 *  tree too (the F3 general `.css`-extension the dock-only gate's header named
 *  and never landed). The carved monolith partials (tokens/glass/utilities) are
 *  all < 500; theme.css + dock-controls.css are ratchet-grandfathered. */
function collect(dir, acc) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "__tests__") continue;
            if (entry.name === "node_modules") continue;
            collect(full, acc);
        } else if (entry.isFile()) {
            if (
                entry.name.endsWith(".ts") ||
                entry.name.endsWith(".vue") ||
                entry.name.endsWith(".css")
            ) {
                acc.push(full);
            }
        }
    }
    return acc;
}

/** Line count = number of newline-delimited lines (matches `wc -l` + final line). */
function lineCount(file) {
    const text = readFileSync(file, "utf8");
    if (text.length === 0) return 0;
    // wc -l counts trailing-newline-terminated lines; mirror it (split on "\n"
    // and drop a trailing empty segment from a final newline).
    const parts = text.split("\n");
    if (parts[parts.length - 1] === "") parts.pop();
    return parts.length;
}

/**
 * The pure ratchet detector — runs over an INJECTED input map so a self-test can
 * sabotage `{ measured, ratchetBaselines, source }` (the proof:encapsulation
 * detect(overrides) precedent). `measured` is the sorted `{ path, displayPath,
 * lines }[]`; `ratchetBaselines` the frozen map; `source` this gate's own text
 * (for the CARVE-SUCCESSOR marker parse). Returns `{ violations, grandfathered,
 * shaderExempt, warnings }`.
 */
function detect({
    measured,
    ratchetBaselines,
    source,
    resolveWave = () => true,
    trancheManifest = TRANCHE_BASELINE_MANIFEST,
}) {
    const over = measured.filter((m) => m.lines > HARD_LIMIT);
    const grandfathered = [];
    const shaderExempt = [];
    const violations = [];
    for (const m of over) {
        const display = m.displayPath ?? m.path;
        // The shader-literal exemption — the ratchet is LOGIC-only. A `*.{wgsl,
        // glsl,frag,vert}.ts` file over the bound is EXEMPT (never a violation).
        if (SHADER_LITERAL.test(m.path)) {
            shaderExempt.push({ path: display, key: m.path, lines: m.lines });
            continue;
        }
        const baseline = ratchetBaselines[m.path];
        if (baseline !== undefined && m.lines <= baseline) {
            grandfathered.push({ path: display, key: m.path, lines: m.lines, baseline });
            // THE CONTRACT: a live grandfathered baseline REQUIRES a companion
            // CARVE-SUCCESSOR(<wave-id>) marker naming its owning carve wave.
            const cs = carveSuccessorFor(source, m.path);
            if (!cs) {
                violations.push(
                    `the ratchet baseline row for ${display} (${baseline}) carries NO CARVE-SUCCESSOR(<wave-id>) marker — a new/held baseline REQUIRES a companion carve-successor id (the drain chain must name its owning carve wave)`,
                );
            } else if (!resolveWave(cs)) {
                // BI.W-STYLE-REDRAIN (N2) — the carve-successor must RESOLVE to a real
                // wave spec on disk; a phantom successor (a drain booked to a wave that
                // never landed) REDs the close (the FAM-12 phantom-carve-successor class).
                violations.push(
                    `the ratchet baseline row for ${display} (${baseline}) names carve-successor ${cs} that resolves to NO docs/tranches/**/waves/${cs}.md on disk — a PHANTOM carve-successor (FAM-12: a drain booked to a wave that never landed; re-point it to a REAL owning wave OR drain the row)`,
                );
            }
        } else if (baseline !== undefined) {
            violations.push(
                `${display} is ${m.lines} lines (> its ratchet baseline ${baseline}) — a grandfathered file may not GROW`,
            );
        } else {
            violations.push(`${display} is ${m.lines} lines (> ${HARD_LIMIT})`);
        }
    }

    // ── Stale-baseline + shader-row guards (the ratchet is monotonic + LOGIC-only).
    //    A shader path in the map is a CONTRACT error (the exemption supersedes the
    //    ratchet); any other row whose file is now ≤ 500 (or gone) is a stale row.
    for (const [key, value] of Object.entries(ratchetBaselines)) {
        if (SHADER_LITERAL.test(key)) {
            violations.push(
                `the ratchet baseline row for ${key} (${value}) is a SHADER LITERAL — shader files are EXEMPT (logic-only ratchet); delete the row (the exemption supersedes the ratchet)`,
            );
            continue;
        }
        const live = measured.find((m) => m.path === key);
        if (!live || live.lines <= HARD_LIMIT) {
            violations.push(
                `the ratchet baseline row for ${key} (${value}) is STALE — the file is now ≤ ${HARD_LIMIT} (or gone); delete the row (the ratchet only drains)`,
            );
        }
    }

    // ── R1 (BI.W-RATCHET-GROWTH) — GROWTH REDS THE GROWING WAVE. The frozen
    //    TRANCHE_BASELINE_MANIFEST is the ONLY legal source of baseline keys. A
    //    RATCHET_BASELINES key ABSENT from the manifest is a wave-INTRODUCED >500 file
    //    self-grandfathering its own growth (the GF5 disease) — RED. (A shader key is
    //    handled by the shader-row guard above and never appears in the manifest, so it
    //    is skipped here to avoid a redundant double-flag.)
    for (const key of Object.keys(ratchetBaselines)) {
        if (SHADER_LITERAL.test(key)) continue;
        if (!(key in trancheManifest)) {
            violations.push(
                `the ratchet baseline row for ${key} is NOT in the TRANCHE_BASELINE_MANIFEST — a wave-INTRODUCED >${HARD_LIMIT} file cannot self-grandfather its own growth (GROWTH reds the growing wave; only a file already >${HARD_LIMIT} at tranche start may carry a baseline row)`,
            );
        }
    }

    // ── R2 (BI.W-RATCHET-GROWTH) — a manifest file may only SHRINK. A frozen-manifest
    //    key whose LIVE line count EXCEEDS its frozen BI-start baseline is a re-inflation
    //    (a grandfathered file that grew MORE, or a drained manifest file a later wave
    //    re-grew past its tranche-start count + self-grandfathered) — RED. A shrink or a
    //    delete (live undefined) is the only legal ratchet move.
    for (const [key, frozen] of Object.entries(trancheManifest)) {
        const live = measured.find((m) => m.path === key);
        if (live && live.lines > frozen) {
            const display = live.displayPath ?? live.path;
            violations.push(
                `${display} is ${live.lines} lines (> its FROZEN tranche baseline ${frozen}) — a manifest file may only SHRINK from its tranche-start count (GROWTH reds the growing wave; the ratchet drains, never re-inflates)`,
            );
        }
    }

    const warnings = measured.filter(
        (m) =>
            m.lines > WARN_LIMIT &&
            m.lines <= HARD_LIMIT &&
            !SHADER_LITERAL.test(m.path),
    );
    return { over, grandfathered, shaderExempt, violations, warnings };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration). Each synthetic
//    input sabotages `detect()` and asserts the expected bite fires (or, for a
//    fence, does NOT). Throws on any miss so a regression that weakens the
//    contract/exemption re-reds the gate at import.
function selfTest() {
    let checks = 0;
    const mk = (path, lines) => ({ path, displayPath: path, lines });
    const sab = (input, needle, name) => {
        const { violations } = detect(input);
        if (violations.some((v) => v.includes(needle))) checks++;
        else
            throw new Error(
                `[proof:no-god-module self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (input, needle, name) => {
        const { violations } = detect(input);
        if (!violations.some((v) => v.includes(needle))) checks++;
        else
            throw new Error(
                `[proof:no-god-module self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // Bite 1 — THE CONTRACT: a new baseline WITHOUT a carve-successor id REDs.
    //   (Each synthetic key is pinned into an explicit trancheManifest so the R1/R2
    //   growth-red clauses stay silent — the bite tests ONLY its own concern.)
    sab(
        {
            measured: [mk("synthetic/god.ts", 600)],
            ratchetBaselines: { "synthetic/god.ts": 600 },
            source: `const RATCHET_BASELINES = { "synthetic/god.ts": 600 };`,
            trancheManifest: { "synthetic/god.ts": 600 },
        },
        "NO CARVE-SUCCESSOR",
        "a grandfathered baseline with no carve-successor id",
    );
    // Bite 1 (fence) — the SAME baseline WITH a carve-successor id passes the contract.
    sabNot(
        {
            measured: [mk("synthetic/god.ts", 600)],
            ratchetBaselines: { "synthetic/god.ts": 600 },
            source: `"synthetic/god.ts": 600, // CARVE-SUCCESSOR(BG.W-SYNTH)`,
            trancheManifest: { "synthetic/god.ts": 600 },
        },
        "NO CARVE-SUCCESSOR",
        "a baseline WITH a carve-successor id (fence)",
    );
    // Bite 2 — the SHADER-LITERAL EXEMPTION: a >500 shader is NOT a violation.
    sabNot(
        {
            measured: [mk("components/custom/x/shaders/big.wgsl.ts", 999)],
            ratchetBaselines: {},
            source: `const RATCHET_BASELINES = {};`,
        },
        "big.wgsl.ts",
        "a 999-line shader literal is exempt (fence)",
    );
    // Bite 3 — the shader-row contradiction: a shader path in the map REDs.
    sab(
        {
            measured: [mk("components/custom/x/shaders/big.frag.ts", 999)],
            ratchetBaselines: { "components/custom/x/shaders/big.frag.ts": 999 },
            source: `"components/custom/x/shaders/big.frag.ts": 999,`,
        },
        "is a SHADER LITERAL",
        "a shader path carrying a ratchet row",
    );
    // Bite 4 — a genuine un-baselined logic god-module (>500, no row) REDs.
    sab(
        {
            measured: [mk("components/custom/x/useThing.ts", 700)],
            ratchetBaselines: {},
            source: `const RATCHET_BASELINES = {};`,
        },
        "700 lines",
        "an un-baselined 700-line logic file",
    );
    // Bite 5 — the stale-row guard: a baseline whose file is now ≤ 500 REDs.
    sab(
        {
            measured: [mk("components/custom/x/useThing.ts", 400)],
            ratchetBaselines: { "components/custom/x/useThing.ts": 600 },
            source: `"components/custom/x/useThing.ts": 600, // CARVE-SUCCESSOR(BG.W-X)`,
            trancheManifest: { "components/custom/x/useThing.ts": 600 },
        },
        "is STALE",
        "a stale baseline row (file drained under the bound)",
    );
    // Bite 6 — a grandfathered file that GREW past its baseline REDs (even with a marker).
    //   The frozen manifest holds it at 700 so the R2 growth-red clause stays silent —
    //   the bite isolates the pre-existing per-row grow-guard (against the ratchet value).
    sab(
        {
            measured: [mk("components/custom/x/useThing.ts", 650)],
            ratchetBaselines: { "components/custom/x/useThing.ts": 600 },
            source: `"components/custom/x/useThing.ts": 600, // CARVE-SUCCESSOR(BG.W-X)`,
            trancheManifest: { "components/custom/x/useThing.ts": 700 },
        },
        "may not GROW",
        "a grandfathered file grew past its baseline",
    );
    // Bite 7 (BI.W-STYLE-REDRAIN, N2) — THE PHANTOM-SUCCESSOR RESOLUTION: a live baseline
    //   whose carve-successor names NO real wave-spec on disk REDs (the FAM-12 phantom class).
    sab(
        {
            measured: [mk("synthetic/god.ts", 600)],
            ratchetBaselines: { "synthetic/god.ts": 600 },
            source: `"synthetic/god.ts": 600, // CARVE-SUCCESSOR(BI.W-DOES-NOT-EXIST)`,
            resolveWave: () => false,
            trancheManifest: { "synthetic/god.ts": 600 },
        },
        "PHANTOM carve-successor",
        "a ratchet row whose carve-successor resolves to no wave-spec on disk",
    );
    // Bite 7 (fence) — the SAME row with a RESOLVING carve-successor passes N2.
    sabNot(
        {
            measured: [mk("synthetic/god.ts", 600)],
            ratchetBaselines: { "synthetic/god.ts": 600 },
            source: `"synthetic/god.ts": 600, // CARVE-SUCCESSOR(BI.W-REAL)`,
            resolveWave: () => true,
            trancheManifest: { "synthetic/god.ts": 600 },
        },
        "PHANTOM carve-successor",
        "a ratchet row with a resolving carve-successor (fence)",
    );

    // Bite 8 (BI.W-RATCHET-GROWTH, R1) — GROWTH REDS THE GROWING WAVE: a wave adds a
    //   baseline row for a file NOT in the frozen manifest (a file it grew past 500 in
    //   its own diff + self-grandfathered). The disease the current contract ACCEPTS
    //   today; the manifest freeze reds it.
    sab(
        {
            measured: [mk("components/custom/x/wave-grown.ts", 600)],
            ratchetBaselines: { "components/custom/x/wave-grown.ts": 600 },
            source: `"components/custom/x/wave-grown.ts": 600, // CARVE-SUCCESSOR(BI.W-REAL)`,
            trancheManifest: {}, // NOT >500 at tranche start — a wave-introduced grow
        },
        "NOT in the TRANCHE_BASELINE_MANIFEST",
        "a wave-introduced >500 file self-grandfathering a fresh baseline row (R1 grow-and-self-grandfather)",
    );
    // Bite 8 (fence) — a baseline row for a file ALREADY >500 at tranche start passes R1.
    sabNot(
        {
            measured: [mk("components/custom/x/at-start.ts", 600)],
            ratchetBaselines: { "components/custom/x/at-start.ts": 600 },
            source: `"components/custom/x/at-start.ts": 600, // CARVE-SUCCESSOR(BI.W-REAL)`,
            trancheManifest: { "components/custom/x/at-start.ts": 600 },
        },
        "NOT in the TRANCHE_BASELINE_MANIFEST",
        "a baseline row for a manifest file already >500 at tranche start (R1 fence)",
    );
    // Bite 9 (BI.W-RATCHET-GROWTH, R2) — REGROW-PAST-BASELINE: a manifest file a later
    //   wave re-inflated PAST its frozen tranche-start count + self-grandfathered at the
    //   higher value (the key IS in the manifest so R1 passes — R2 is the only catcher).
    sab(
        {
            measured: [mk("components/custom/x/regrown.ts", 600)],
            ratchetBaselines: { "components/custom/x/regrown.ts": 600 },
            source: `"components/custom/x/regrown.ts": 600, // CARVE-SUCCESSOR(BI.W-REAL)`,
            trancheManifest: { "components/custom/x/regrown.ts": 520 }, // BI-start 520
        },
        "FROZEN tranche baseline",
        "a manifest file re-inflated past its frozen tranche-start count (R2 regrow-past-baseline)",
    );
    // Bite 10 (BI.W-RATCHET-GROWTH, R2 fence) — a manifest file DRAINED under its frozen
    //   count is the LEGAL ratchet move (a shrink) → GREEN.
    sabNot(
        {
            measured: [mk("components/custom/x/drained.ts", 400)],
            ratchetBaselines: {},
            source: `const RATCHET_BASELINES = {};`,
            trancheManifest: { "components/custom/x/drained.ts": 520 },
        },
        "FROZEN tranche baseline",
        "a manifest file drained below its frozen count (R2 shrink fence — the legal drain)",
    );
    // Bite 10b (BI.W-RATCHET-GROWTH, R2 fence) — a manifest file DELETED entirely (gone
    //   from disk) is the LEGAL delete move → GREEN.
    sabNot(
        {
            measured: [],
            ratchetBaselines: {},
            source: `const RATCHET_BASELINES = {};`,
            trancheManifest: { "components/custom/x/deleted.ts": 520 },
        },
        "FROZEN tranche baseline",
        "a manifest file deleted entirely (R2 delete fence — the legal drain)",
    );
    return checks;
}

function run() {
    const { ROOT, SRC, ARTIFACT } = cliPaths();

    let files;
    try {
        files = collect(SRC, []);
    } catch {
        // fail-explicit: a missing src/ is a hard failure, not a silent skip.
        console.error("proof:no-god-module — src/ is absent");
        process.exit(1);
    }

    const measured = files
        .map((f) => ({
            // The `src/`-relative POSIX path is the ratchet baseline key (so the
            // map reads cleanly without the `src/` prefix on every row).
            path: relative(SRC, f).split(sep).join("/"),
            displayPath: relative(ROOT, f).split(sep).join("/"),
            lines: lineCount(f),
        }))
        .sort((a, b) => b.lines - a.lines);

    // ── The ratchet split (BG.W-GOD-MODULE-STRUCTURAL). Delegated to the pure
    //    detect() over the live disk state + this gate's OWN source (for the
    //    CARVE-SUCCESSOR marker parse). detect() applies the shader-literal
    //    exemption, the carve-successor contract, and the stale/shader-row guards.
    const source = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const { grandfathered, shaderExempt, violations, warnings } = detect({
        measured,
        ratchetBaselines: RATCHET_BASELINES,
        source,
        // BI.W-STYLE-REDRAIN (N2) — resolve each live carve-successor to its wave spec
        // on disk; a phantom (never-landed) successor REDs.
        resolveWave: (id) => waveSpecExists(ROOT, id),
        // BI.W-RATCHET-GROWTH (R1/R2) — the frozen BI-start manifest is the only legal
        // source of baseline keys; a wave-introduced grow (a key outside it, or a
        // manifest file re-inflated past its frozen count) REDs the growing wave.
        trancheManifest: TRANCHE_BASELINE_MANIFEST,
    });

    // ── The born-RED self-test (throws if a bite fails to fire). The contract +
    //    exemption cannot silently un-arm — a regression re-reds at import.
    const selfTestCount = selfTest();

    // ── The drain chain made VISIBLE — each live row's owning carve-successor
    //    wave, an ENUMERATED cut gate for BG.W-CUT's `RATCHET_BASELINES == {}`.
    const ratchetDrainChain = Object.keys(RATCHET_BASELINES).map((path) => ({
        path,
        carveSuccessor: carveSuccessorFor(source, path),
    }));

    // ── AY.W-CSS1 (O1) — import-order preservation for the carved CSS monoliths.
    //    Each thin @import root (tokens.css/glass.css/utilities.css) MUST @import
    //    its partials in the recorded cascade order; a reordered @import or a
    //    missing partial → RED (the carve-isomorphism witness — alongside the per-
    //    file line bound the `.css` collector above already enforces).
    const monolithFacts = assertMonolithImportOrder(ROOT);
    for (const f of monolithFacts) {
        if (f.missing.length) {
            violations.push(
                `${f.root} — carved partial(s) missing on disk: ${f.missing.join(", ")}`,
            );
        } else if (!f.importOrderPreserved) {
            violations.push(
                `${f.root} — @import order drifted from the recorded cascade order (expected ${f.expected.join(" → ")}; got ${f.actual.join(" → ")})`,
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ratchetDrained = Object.keys(RATCHET_BASELINES).length === 0;
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-god-module",
        facts: {
            scanned: measured.length,
            hardLimit: HARD_LIMIT,
            warnLimit: WARN_LIMIT,
            largest: measured.slice(0, 10).map((m) => ({
                path: m.displayPath,
                lines: m.lines,
            })),
            grandfathered,
            // BG.W-GOD-MODULE-STRUCTURAL — the shader-literal exemption (logic-only
            // ratchet): >500 GPU-program strings are EXEMPT, reported as a fact.
            shaderExempt,
            ratchetBaselineCount: Object.keys(RATCHET_BASELINES).length,
            ratchetDrained,
            // BG.W-GOD-MODULE-STRUCTURAL — the drain chain made VISIBLE: each live
            // ratchet row → its owning carve-successor wave (the cut gate).
            ratchetDrainChain,
            selfTestChecks: selfTestCount,
            // AY.W-CSS1 (O1) — the carved-monolith import-order assertion per
            // thin root (the F3 caveat: import-order, not just per-file count).
            cssMonoliths: monolithFacts.map((f) => ({
                name: f.name,
                importOrderPreserved: f.importOrderPreserved,
                missing: f.missing,
            })),
        },
        violations,
    });

    console.log("proof:no-god-module — no src/ .ts/.vue file > 500 lines");
    console.log(
        `  scanned ${measured.length} files; hard limit ${HARD_LIMIT}, warn ${WARN_LIMIT}`,
    );
    const top = measured.slice(0, 8);
    console.log("  largest files:");
    for (const m of top) {
        const grand = RATCHET_BASELINES[m.path] !== undefined && m.lines <= RATCHET_BASELINES[m.path];
        const shader = SHADER_LITERAL.test(m.path);
        const tag =
            shader && m.lines > HARD_LIMIT
                ? "◈ shdr"
                : grand
                  ? "▣ grand"
                  : m.lines > HARD_LIMIT
                    ? "✗ OVER"
                    : m.lines > WARN_LIMIT
                      ? "• warn"
                      : "✓ ok";
        console.log(`    ${String(m.lines).padStart(4)}  ${tag}  ${m.displayPath}`);
    }
    if (warnings.length) {
        console.log(
            `\n  ${warnings.length} file(s) in the 301–500 warn band (watch, not RED).`,
        );
    }
    if (shaderExempt.length) {
        console.log(
            `\n  ${shaderExempt.length} shader-literal file(s) EXEMPT (logic-only ratchet — over bound but a cohesive GPU-program string, not a god-module):`,
        );
        for (const s of shaderExempt)
            console.log(`    ◈ ${s.path} is ${s.lines} (shader-exempt)`);
    }
    if (grandfathered.length) {
        console.log(
            `\n  ${grandfathered.length} file(s) GRANDFATHERED by the ratchet (over bound, carve pending — NOT a violation):`,
        );
        for (const g of grandfathered) {
            const cs = carveSuccessorFor(source, g.key) ?? "??";
            console.log(
                `    ▣ ${g.path} is ${g.lines} (baseline ${g.baseline}) → carve-successor ${cs}`,
            );
        }
    }
    if (ratchetDrained) {
        console.log("\n  RATCHET_BASELINES drained to ∅ — every file is under bound.");
    }
    console.log(
        `\n  self-test: ${selfTestCount} synthetic bite(s) handled (contract + exemption + stale/shader-row + grow guards).`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
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

export {
    detect,
    selfTest,
    carveSuccessorFor,
    SHADER_LITERAL,
    RATCHET_BASELINES,
    TRANCHE_BASELINE_MANIFEST,
};
