// which non-root public entries export a symbol originating in each of the D′ law's 30 moved files (paths from Dp-proto.md §3)
import { join } from "node:path";
import { readFileSync } from "node:fs";
const W = process.argv[2]; const F = join(W, "docs/tranches/BL/design/structure/floor");
const { buildGraph } = await import(join(F, "lib/graph.mjs"));
const { makeOrigins } = await import(join(F, "lib/symbols.mjs"));
const g = buildGraph(W); const o = makeOrigins(g);
const rec = JSON.parse(readFileSync(join(F, "records/entry-record.json"), "utf8"));
const moved = ["components/aurora/constants/budget.ts","components/dialog/ModalOverlay.vue","components/dock/composables/useDockHold.ts","components/fourier-field/shaders/compute.wgsl.ts","components/fourier-field/shaders/render.wgsl.ts","composables/dom/useClipboard.ts","composables/dom/useDocumentVisibility.ts","composables/dom/useDragVelocity.ts","composables/glass/canvas2d/useCanvas2D.ts","composables/glass/useGlassBackdropLuminance.ts","composables/glass/webgl/createCanvasLifecycle.ts","composables/glass/webgl/shaders/flow.glsl.ts","composables/glass/webgl/shaders/flow.wgsl.ts","composables/motion/core/useRAFLoop.ts","composables/motion/core/useViewTransition.ts","composables/motion/morph/useElementMorph.ts","composables/motion/pointer/useRoutePointer.ts","composables/motion/scroll/useScrollChrome.ts","composables/motion/scroll/useScrollProgress.ts","composables/reactive/useTimer.ts","composables/search/useFuzzySearch.ts","composables/glass/backdropLuminanceSample.ts","composables/glass/webgl/backingSize.ts","composables/glass/webgl/visibility.ts","composables/motion/core/useYieldToMain.ts","composables/search/match.ts","composables/glass/backdropSampleMath.ts","composables/search/types.ts"].map(p=>"src/"+p);
const to = {"composables/dom/useClipboard.ts":"components/easing/","composables/dom/useDragVelocity.ts":"components/slider/","composables/glass/canvas2d/useCanvas2D.ts":"components/constellation/composables/","composables/motion/pointer/useRoutePointer.ts":"components/constellation/composables/","composables/motion/scroll/useScrollChrome.ts":"components/dock/composables/","composables/motion/scroll/useScrollProgress.ts":"components/aurora/composables/","composables/search/useFuzzySearch.ts":"components/dock/composables/","composables/glass/useGlassBackdropLuminance.ts":"components/dock/composables/","composables/motion/core/useRAFLoop.ts":"components/dock/composables/ (pass 2)","composables/motion/core/useYieldToMain.ts":"components/dock/composables/ (pass 3)","composables/glass/backdropLuminanceSample.ts":"components/dock/","composables/glass/backdropSampleMath.ts":"components/dock/","composables/search/match.ts":"components/dock/","composables/search/types.ts":"components/dock/","components/dock/composables/useDockHold.ts":"components/slider/"};
let n=0, pubIntoComp=0;
for (const f of moved) {
  const pubs = [];
  for (const [name, src] of rec.js) { if (name === "index") continue; for (const [sym, origins] of o.exportsOf(src)) if (origins.some(x => x.file === f)) pubs.push(`./${name}#${sym}`); }
  const t = to[f.slice(4)] ?? ""; n++;
  if (pubs.length && t.startsWith("components/")) pubIntoComp++;
  console.log(`${f.slice(4)} -> ${t||"(substrate/other)"} | public: ${pubs.join(", ") || "-"}`);
}
console.log({ files: n, publicSubstrateMovedIntoAComponent: pubIntoComp });
