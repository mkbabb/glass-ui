// Critic replay of G-proto Appendix A move lists on the floor's F-2 engine.
// Scan deltas are auto-declared (the proto's reviewed declarations were lost with /tmp).
import { runMoves } from "../wt/docs/tranches/BL/design/structure/floor/lib/move.mjs";
import { existsSync, writeFileSync } from "node:fs";
const root = process.argv[2];
const C = "src/components/", K = "src/composables/";
const mv = (from, toDir, name) => ({ from, to: toDir.replace(/\/?$/, "/") + (name ?? from.split("/").pop()) });
const many = (base, names, toDir) => names.map((n) => mv(base + n, toDir));
const A = C + "aurora/", B = C + "blob/", D = C + "dock/";
const steps = [
  ["S2-p1", [
    mv(A + "constants/budget.ts", K), mv(C + "dialog/ModalOverlay.vue", C + "_shared"),
    mv(D + "composables/useDockHold.ts", C + "slider"),
    ...many(C + "fourier-field/shaders/", ["compute.wgsl.ts", "render.wgsl.ts"], C + "fourier-field/renderer"),
    mv(K + "dom/useClipboard.ts", C + "easing"), mv(K + "dom/useDocumentVisibility.ts", K + "motion/core"),
    mv(K + "dom/useDragVelocity.ts", C + "slider"), mv(K + "glass/canvas2d/useCanvas2D.ts", C + "constellation/composables"),
    mv(K + "glass/useGlassBackdropLuminance.ts", D + "composables"), mv(K + "glass/webgl/createCanvasLifecycle.ts", K + "glass"),
    mv(K + "glass/webgl/shaders/flow.glsl.ts", A + "constants/shaders", "curl-fbm.glsl.ts"),
    mv(K + "glass/webgl/shaders/flow.wgsl.ts", A + "constants/shaders", "curl-fbm.wgsl.ts"),
    mv(K + "motion/core/useRAFLoop.ts", K + "glass"), mv(K + "motion/core/useViewTransition.ts", K + "motion/route"),
    mv(K + "motion/morph/useElementMorph.ts", K + "motion"), mv(K + "motion/pointer/useRoutePointer.ts", C + "constellation/composables"),
    mv(K + "motion/scroll/useScrollChrome.ts", D + "composables"), mv(K + "motion/scroll/useScrollProgress.ts", A + "composables"),
    mv(K + "reactive/useTimer.ts", K + "dom"), mv(K + "search/useFuzzySearch.ts", D + "composables"),
  ]],
  ["S2-p2", [mv(K + "glass/backdropLuminanceSample.ts", D), mv(K + "glass/useRAFLoop.ts", D + "composables"),
    mv(K + "motion/core/useYieldToMain.ts", K + "glass"), mv(K + "search/match.ts", D)]],
  ["S2-p3", [mv(K + "glass/backdropSampleMath.ts", D), mv(K + "glass/useYieldToMain.ts", D + "composables"), mv(K + "search/types.ts", D)]],
  ["S3", [mv(D + "styles/controls.css", D + "styles/controls", "index.css"), mv("src/styles/tokens.css", "src/styles/tokens", "index.css"),
    mv("src/styles/typography.css", "src/styles/typography", "index.css"), mv("src/styles/utilities.css", "src/styles/utilities", "index.css")]],
  ["S4-c1", [
    ...many(A + "composables/", ["runtime.ts", "frameLoop.ts", "uniformBridge.ts", "auroraImageSource.ts", "textureUpload.ts"], A + "runtime"),
    ...many(A + "composables/", ["wgpuSetup.ts", "uniformBridgeWGPU.ts", "uniformBridgeWGPUImage.ts"], A + "runtime/wgpu-setup"),
    mv(A + "constants/shaders/aurora-image.wgsl.ts", A + "runtime/wgpu-setup"),
    ...many(A + "constants/shaders/", ["aurora.wgsl.ts", "aurora-mediums.wgsl.ts", "curl-fbm.wgsl.ts"], A + "runtime/wgpu-setup/aurora-wgsl"),
    mv(A + "composables/glSetup.ts", A + "runtime/gl-setup"),
    ...many(A + "constants/shaders/", ["aurora-image.frag.ts", "aurora.vert.ts"], A + "runtime/gl-setup"),
    ...many(A + "constants/shaders/", ["aurora.frag.ts", "brush.glsl.ts", "tonemap.glsl.ts", "flow.glsl.ts", "composition.glsl.ts", "curl-fbm.glsl.ts"], A + "runtime/gl-setup/aurora-frag"),
    ...many(A + "constants/shaders/", ["mediums.glsl.ts", "metal-medium.glsl.ts", "oil-modes.glsl.ts", "vangogh-medium.glsl.ts"], A + "runtime/gl-setup/aurora-frag/mediums-glsl"),
    ...many(A + "constants/", ["renderMode.ts", "presets.ts"], A),
    ...many(B + "composables/", ["wgpuSetup.ts", "uniformBridgeWGPU.ts"], B + "wgpu-setup"),
    ...many(B + "shaders/", ["metaball.wgsl.ts", "metaball-palette.wgsl.ts", "metaball-noise.wgsl.ts"], B + "wgpu-setup/metaball-wgsl"),
    mv(B + "composables/buildMetaballProgram.ts", B + "build-metaball-program"), mv(B + "shaders/metaball.vert.ts", B + "build-metaball-program"),
    ...many(B + "shaders/", ["metaball.frag.ts", "metaball-uniforms.glsl.ts", "oklch-perturb.glsl.ts", "watercolor-edges.glsl.ts", "sdf-body.glsl.ts"], B + "build-metaball-program/metaball-frag"),
    mv(C + "carousel/useCarousel.ts", C + "carousel/composables"),
    ...many(D + "composables/", ["useDockSearch.ts", "useScrollChrome.ts", "useFuzzySearch.ts"], D + "search"),
    ...many(D, ["match.ts", "types.ts"], D + "search"),
    mv(D + "GlassDock.vue", D + "glass-dock"),
    ...many(D + "composables/", ["useDockRun.ts", "useDockClickIntegrity.ts", "useDockShellProps.ts", "dockMorphMeasure.ts", "useDockMorph.ts"], D + "glass-dock"),
    ...many(D + "composables/", ["useGlassBackdropLuminance.ts", "useRAFLoop.ts", "useYieldToMain.ts"], D + "glass-dock/glass-backdrop-luminance"),
    ...many(D, ["backdropLuminanceSample.ts", "backdropSampleMath.ts"], D + "glass-dock/glass-backdrop-luminance"),
    ...many(C + "fourier-field/renderer/", ["wgpu.ts", "uniforms.ts", "render.wgsl.ts", "compute.wgsl.ts"], C + "fourier-field/wgpu"),
    mv(C + "fourier-field/renderer/mint.ts", C + "fourier-field"),
    mv(C + "sheet/SheetContent.vue", C + "sheet/content"), ...many(C + "sheet/detents/", ["use.ts", "projection.ts"], C + "sheet/content"),
    ...many(C + "sortable-list/", ["useSortable.ts", "resolve.ts"], C + "sortable-list/sortable"),
    ...many(C + "sortable-list/", ["drag.ts", "ghost.ts", "motion.ts"], C + "sortable-list/sortable/drag"),
    mv(C + "tabs/SegmentedTabs.vue", C + "tabs/segmented-tabs"),
    ...many(C + "tabs/composables/", ["useTabResponsive.ts", "useTabDragMorph.ts"], C + "tabs/segmented-tabs"),
    ...many(C + "toast/", ["Toaster.vue", "use-toast.ts", "ToastDescription.vue", "ToastTitle.vue", "ToastClose.vue"], C + "toast/toaster"),
    ...many(C + "typewriter/utils/", ["typoStateMachine.ts", "timing.ts", "pausePatterns.ts", "graphemes.ts", "keyboard.ts"], C + "typewriter"),
  ]],
  ["S4-g1", many(K + "glass/webgpu/", ["useGpuSubstrate.ts", "useWebGPUCanvas.ts", "webgpuDevice.ts"], K + "glass/webgpu/gpu-substrate")],
];
const log = [];
for (const [tag, moves0] of steps) {
  const moves = moves0.filter((m) => existsSync(`${root}/${m.from}`));
  const missing = moves0.length - moves.length;
  let r = runMoves(root, moves, { dry: true, declaredScanDeltas: [] });
  const decl = [...(r.scanDeltas?.undeclared ?? [])].map((d) => ({ ...d, reason: "critic replay: auto-declared" }));
  if (r.errors) { console.log(tag, "PLAN ERRORS", JSON.stringify(r.errors).slice(0, 800)); break; }
  r = runMoves(root, moves, { declaredScanDeltas: decl });
  const row = { tag, moves: moves.length, missing, ok: r.ok, phase: r.phase, residue: r.residue?.length, declared: decl.length, rewrites: r.rewrites, lost: r.image?.lost ?? [], gained: r.image?.gained?.length ?? 0 };
  log.push(row); console.log(JSON.stringify(row).slice(0, 600));
  if (!r.ok) { writeFileSync(`${root}/../out/replay-fail-${tag}.json`, JSON.stringify(r, null, 1)); }
}
writeFileSync(`${root}/../out/replay-log.json`, JSON.stringify(log, null, 1));
