// authored/p6-consumer-entries.mjs — AUTHORED input to derive/edits.mjs (step S65; B-S14,
// P5-R3, pass 6). Every consumer module reference B2 found reaching a non-published src file
// that an entry now carries (S64) is re-pointed at that entry, and the two the rulings settle
// otherwise are cured at the consumer:
//   - demo/stories/data/search.vue drives the ranking engine through `useDockSearch`, the
//     engine's one public expression (BK #42, SE-4; pass-6/B2-residual-arms.md arm (a) for
//     `useFuzzySearch`), and reads `fuzzy` from it;
//   - the Fourier studio's seeded shapes read a demo-local copy of the two PRNG primitives
//     (P5-R3: `mulberry32`/`hashString` are not a published contract).
// The visual specs that import library modules into the page re-point at the entry sources
// that publish the same names (`/src/components/aurora/aurora-config.ts`, the aurora door).
// `FOURIER_QUANTUM_FINE` is not published: the surface test states the quantum it observes.
export const why = "B-S14 (P5-R3): consumer references re-point at the entries that publish their names (S64); /data/search drives the engine through useDockSearch (arm (a)); the Fourier studio's PRNG is demo-local; the page-imported aurora names read their entry sources";

const DOCK = "@glass/components/dock";
export const edits = [
    // ---- demo: the sidebar, dock and search names
    { file: "demo/composables/virtual/virtualSectionLayout.ts", why: "SectionHierarchy is published on ./sidebar (S64)", from: `import type { SectionHierarchy } from "@glass/composables/sidebar/types";`, to: `import type { SectionHierarchy } from "@glass/composables/sidebar";` },
    { file: "demo/stories/data/search/catalogue.ts", why: "SearchableItem is published on ./dock (S64)", from: `import type { SearchableItem } from "@glass/components/dock/search/types";`, to: `import type { SearchableItem } from "${DOCK}";` },
    { file: "demo/stories/dock/_frame/DockStage.vue", why: "the backdrop-luminance pair is published on ./dock (S64)", from: `} from "@glass/components/dock/legibility/useGlassBackdropLuminance";`, to: `} from "${DOCK}";` },
    { file: "demo/stories/dock/dock-search.vue", why: "useDockState is published on ./dock (P5-R3, S64)", from: `import { GlassDock, useDockSearch } from "${DOCK}";\nimport { useDockState } from "@glass/components/dock/composables/useDockState";`, to: `import { GlassDock, useDockSearch, useDockState, type SearchableItem } from "${DOCK}";` },
    { file: "demo/stories/dock/dock-search.vue", why: "SearchableItem rides the ./dock import above", from: `import type { SearchableItem } from "@glass/components/dock/search/types";\n`, to: `` },
    { file: "demo/stories/substrates/glass-material.vue", why: "useGlassBackdropLuminance is published on ./dock (S64)", from: `import { useGlassBackdropLuminance } from "@glass/components/dock/legibility/useGlassBackdropLuminance";`, to: `import { useGlassBackdropLuminance } from "${DOCK}";` },
    {
        file: "demo/stories/data/search.vue",
        why: "arm (a): the route drives the ranking engine through useDockSearch, its one public expression (BK #42, SE-4); no dock is mounted, so the composed state machine has no root",
        from: `import { useFuzzySearch } from "@glass/components/dock/search/useFuzzySearch";\nimport type { SearchResult, SearchableItem } from "@glass/components/dock/search/types";`,
        to: `// The engine ships as the dock's search mode (BK #42, SE-4): \`useDockSearch\` composes\n// \`useFuzzySearch\` and hands it back as \`fuzzy\`, so this route reads the same handle the\n// dock does. No dock is mounted here, so the composed state machine has no root to watch.\nimport {\n    useDockSearch,\n    useDockState,\n    type SearchResult,\n    type SearchableItem,\n} from "${DOCK}";`,
    },
    {
        file: "demo/stories/data/search.vue",
        why: "arm (a): the select hook is useDockSearch's onResultSelect; the engine handle is its fuzzy",
        from: `const searchState = useFuzzySearch<SearchableItem>({\n    items: () => searchItems,\n    debounceMs: 40,\n    maxResults: 12,\n    onSelect: (result) => {\n        selectedResult.value = itemById.get(result.item.id) ?? null;\n    },\n});`,
        to: `const { fuzzy: searchState } = useDockSearch<SearchableItem>({\n    dockState: useDockState({ rootEl: ref(null) }),\n    items: () => searchItems,\n    debounceMs: 40,\n    maxResults: 12,\n    onResultSelect: (result) => {\n        selectedResult.value = itemById.get(result.item.id) ?? null;\n    },\n});`,
    },
    // ---- demo: motion
    { file: "demo/stories/motion/scroll.vue", why: "useScrollScene is published on ./motion-core (S64)", from: `import { useScrollScene } from "@glass/composables/motion/scroll/useScrollScene";`, to: `import { useScrollScene } from "@glass/composables/motion/motion-core";` },
    { file: "demo/stories/motion/springs/CustomAuthoring.vue", why: "springProjection is published on ./motion, motionTempo on ./motion-core (S64)", from: `import { springPreset } from "@glass/composables/motion";\nimport { springProjection } from "@glass/composables/motion/spring/springProjection";\nimport { motionTempo } from "@glass/composables/motion/core/tempo/motionTempo";`, to: `import { springPreset, springProjection } from "@glass/composables/motion";\nimport { motionTempo } from "@glass/composables/motion/motion-core";` },
    { file: "demo/stories/motion/springs/NamedRegisters.vue", why: "springProjection is published on ./motion, motionTempo on ./motion-core (S64)", from: `import { springPreset } from "@glass/composables/motion";\nimport { springProjection } from "@glass/composables/motion/spring/springProjection";\nimport { motionTempo } from "@glass/composables/motion/core/tempo/motionTempo";`, to: `import { springPreset, springProjection } from "@glass/composables/motion";\nimport { motionTempo } from "@glass/composables/motion/motion-core";` },
    // ---- demo: the substrates
    { file: "demo/stories/substrates/aurora/AuroraStage.vue", why: "isAuroraPointerEnabled is published on ./aurora-config (S64)", from: `import type { AuroraConfig } from "@glass/components/aurora/aurora-config";\nimport { isAuroraPointerEnabled } from "@glass/components/aurora/runtime/contract";`, to: `import { isAuroraPointerEnabled, type AuroraConfig } from "@glass/components/aurora/aurora-config";` },
    { file: "demo/stories/substrates/aurora/AuroraStage.vue", why: "pendingRenderer and RendererStatus ride the root (S64)", from: `} from "@glass/composables/glass/webgpu/rendererStatus";`, to: `} from "@glass/index";` },
    { file: "demo/stories/substrates/blob.vue", why: "pendingRenderer and RendererStatus ride the root (S64)", from: `import { pendingRenderer, type RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";`, to: `import { pendingRenderer, type RendererStatus } from "@glass/index";` },
    { file: "demo/stories/substrates/blob.vue", why: "MAX_SATS is published on ./blob-config (S64)", from: `import { BLOB_CONFIG_DEFAULTS } from "@glass/components/blob/config";\nimport { MAX_SATS } from "@glass/components/blob/mood/constants";`, to: `import { BLOB_CONFIG_DEFAULTS, MAX_SATS } from "@glass/components/blob/config";` },
    { file: "demo/stories/substrates/constellation.vue", why: "pendingRenderer and RendererStatus ride the root (S64)", from: `import { pendingRenderer, type RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";`, to: `import { pendingRenderer, type RendererStatus } from "@glass/index";` },
    { file: "demo/stories/substrates/fourier-field.vue", why: "pendingRenderer and RendererStatus ride the root (S64)", from: `} from "@glass/composables/glass/webgpu/rendererStatus";`, to: `} from "@glass/index";` },
    { file: "demo/stories/substrates/fourier-field.vue", why: "FOURIER_STROKE_RUNGS is published on ./fourier-field beside the config (S64)", from: `    type MintedSpectrum,\n} from "@glass/components/fourier-field";\n// The rung ladder is module-level, not barrel surface — the one source of the three\n// strokes this control offers.\nimport { FOURIER_STROKE_RUNGS } from "@glass/components/fourier-field/register/constants";`, to: `    type MintedSpectrum,\n    // The rung ladder: the one source of the three strokes this control offers.\n    FOURIER_STROKE_RUNGS,\n} from "@glass/components/fourier-field";` },
    { file: "demo/stories/substrates/fourier-field/sources.ts", why: "P5-R3: the PRNG primitives are not a published contract; the studio seeds from a demo-local copy", from: `import { mulberry32, hashString } from "@glass/composables/glass/procedural/prng";`, to: `import { mulberry32, hashString } from "./prng";` },
    {
        file: "demo/stories/substrates/fourier-field/prng.ts",
        why: "P5-R3: the studio's seeded PRNG, demo-local (the same two primitives the library seeds its organic shapes with; no published name carries them)",
        create: `// The Fourier studio's seeded PRNG: the elliptic source is keyed by a string seed, so a
// shape reproduces across mounts. The two primitives are the library's own seeding
// functions, which no entry publishes (P5-R3), so the studio keeps its own copy.

/** Mulberry32, a fast 32-bit seeded PRNG. Returns a \`() => number\` in [0, 1). */
export function mulberry32(seed: number): () => number {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** String to u32 hash (djb2). */
export function hashString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return hash >>> 0;
}
`,
    },
    // ---- scripts
    { file: "scripts/regen-spring-tokens.mjs", why: "springProjection is published on ./motion (S64); its settleSeconds is the settle the tokens carry, so the script reads the one projection", from: `import { SPRING_PRESETS } from "../src/composables/motion/index.ts";\nimport {\n    springProjection,\n    springSettleDurationSeconds,\n} from "../src/composables/motion/spring/springProjection.ts";`, to: `import { SPRING_PRESETS, springProjection } from "../src/composables/motion/index.ts";` },
    { file: "scripts/regen-spring-tokens.mjs", why: "the settle clock is the projection's settleSeconds", from: `        const sec = springSettleDurationSeconds(preset);`, to: `        const sec = springProjection(preset).settleSeconds;` },
    { file: "scripts/regen-spring-tokens.mjs", why: "the settle clock is the projection's settleSeconds", from: `settle=\${springSettleDurationSeconds(preset)}s`, to: `settle=\${springProjection(preset).settleSeconds}s` },
    // ---- tests-visual: the page imports read the entry sources
    { file: "tests-visual/aurora/aurora-swraster.spec.ts", why: "sampleAuroraField and auroraFallbackGround are published on ./aurora-config", from: `"/src/components/aurora/composables/auroraFallbackGround.ts"`, to: `"/src/components/aurora/aurora-config.ts"` },
    { file: "tests-visual/aurora/aurora-swraster.spec.ts", why: "DEFAULT_AURORA_CONFIG is published on ./aurora-config", from: `"/src/components/aurora/config/presets.ts"`, to: `"/src/components/aurora/aurora-config.ts"`, all: true },
    { file: "tests-visual/aurora/aurora-swraster.spec.ts", why: "isSoftwareWebGLRenderer is published on ./aurora-config", from: `"/src/components/aurora/config/renderMode.ts"`, to: `"/src/components/aurora/aurora-config.ts"` },
    { file: "tests-visual/aurora/aurora-swraster.spec.ts", why: "createAurora is published on ./aurora", from: `"/src/components/aurora/runtime/runtime.ts"`, to: `"/src/components/aurora/index.ts"` },
    { file: "tests-visual/aurora/aurora-vibrancy.spec.ts", why: "sampleAuroraField is published on ./aurora-config", from: `"/src/components/aurora/composables/auroraFallbackGround.ts"`, to: `"/src/components/aurora/aurora-config.ts"`, all: true },
    // ---- tests: the published names
    { file: "tests/composables/motion/springProjection.test.ts", why: "springProjection is published on ./motion (S64)", from: `import { SPRING_PRESETS } from "@glass/composables/motion";\nimport { springProjection } from "@glass/composables/motion/spring/springProjection";`, to: `import { SPRING_PRESETS, springProjection } from "@glass/composables/motion";` },
    { file: "tests/demo/springs-story.test.ts", why: "springProjection is published on ./motion (S64)", from: `import { springProjection } from "@glass/composables/motion/spring/springProjection";\nimport { springPreset } from "@glass/composables/motion";`, to: `import { springPreset, springProjection } from "@glass/composables/motion";` },
    { file: "tests/components/sheet/sheet-motion.test.ts", why: "the sheet calls useSpringMount through the ./motion entry; the spy sits on that entry", from: `import * as springMountModule from "@glass/composables/motion/spring/useSpringMount";`, to: `import * as springMountModule from "@glass/composables/motion";` },
    { file: "tests/components/fourier-field/surface.smoke.test.ts", why: "FOURIER_QUANTUM_FINE is not published; the test states the quantum the slider steps by", from: `import { FOURIER_QUANTUM_FINE } from "@glass/components/fourier-field/register/constants";\n`, to: `` },
    { file: "tests/components/fourier-field/surface.smoke.test.ts", why: "the fine keyboard quantum, 1/64 of the period, stated where it is observed", from: `            FOURIER_QUANTUM_FINE,\n`, to: `            1 / 64, // the fine keyboard quantum: 1/64 of the period\n` },
];
