// authored/aurora-config.mjs — AUTHORED input to derive/split-entry.mjs (step S33, pass 4;
// B-S10, P3-R5, harvested from G's rows 16-17 and L4.5).
//
// P3-R5 accepts `./aurora-config` as one new export key, mirroring `./blob-config`, and
// P3-R4 gives a config door's names to it: "a config door exists so a consumer can read
// config without pulling the renderer". So the entry carries every name `./aurora` took from
// the config module (`aurora/config/`, by origin) and the first-paint ground the eager shell
// paints before `Aurora` resolves (P3-R5's own reason), and `./aurora` drops each of them
// (R-6: one symbol, one door; a MIGRATION removal row per name, and one "added" row for the
// key). The atoms (`resolveAtoms` and the rest) stay on `./aurora`: their origin is the
// component's composables, not its config module.
//
// Where it lives. `./blob-config`'s source is `blob/config.ts`; aurora already has a
// `config/` module, so `aurora/config.ts` would name one thing twice beside it (G's tree
// carried that collision, which the pass-3 registry sent to B-07's name review). The
// config module's own door cannot be the entry either: it carries names the component reads
// that no consumer should (`isAuroraDriftLive`, the metal defaults), and an entry publishes
// every name its door holds. So the entry is a leaf at the unit root named for its key,
// `aurora/aurora-config.ts`, re-exporting from the config door and the ground's file (both
// inside its module, B9).
//
// The demo's eager shell and hero read these names from it, which lands the two consumer
// holds S29 froze (the boot graph keeps its barrel-free first paint: the leaf reaches the
// config module and the ground, never `Aurora.vue`), and the boot-graph test pins the new
// specifier. Every other consumer that took a moved name from `./aurora` is split by the
// tool.

export const why = "B-S10 / P3-R5: the ./aurora-config entry lands (a leaf at the aurora unit root, mirroring ./blob-config); ./aurora drops the config module's names and the first-paint ground (R-6, P3-R4), each a MIGRATION row; every consumer that took one through ./aurora is split onto the new entry";

export const key = "aurora-config";
export const source = "src/components/aurora/aurora-config.ts";

const CONFIG_VALUES = ["resolveRenderMode", "isSoftwareWebGLRenderer", "DEFAULT_AURORA_CONFIG", "PAPER_WASH_GROUND", "DEFAULT_VIVIDNESS", "VIVID_TARGET", "IMAGE_BLUR_MIN_DEFAULT", "IMAGE_BLUR_MAX_DEFAULT", "MAX_NUCLEI", "MAX_STOPS", "deriveAurora", "flattenPalette", "hexToOklchStop", "paletteToCssGradient"];
const CONFIG_TYPES = ["AuroraRenderMode", "ResolveRenderModeOptions", "AuroraConfig", "AuroraCursorApi", "AuroraFlow", "AuroraInstance", "AuroraInteractivity", "AuroraMedium", "AuroraNucleus", "AuroraSource", "AuroraImageSource", "AuroraImageBlur", "FlowPattern", "StrokeMode", "StrokeOrient", "WarpMode", "AuroraHarmony", "DeriveAuroraOptions", "DeriveEasing", "AuroraHuePath"];
const GROUND_VALUES = ["auroraFallbackGround", "sampleAuroraField", "nucleiFieldStatic", "relativeLuminance"];
const GROUND_TYPES = ["AuroraFallbackGround", "AuroraFallbackGroundOptions", "AuroraGroundMetrics"];
export const names = [...CONFIG_VALUES, ...CONFIG_TYPES, ...GROUND_VALUES, ...GROUND_TYPES];

export const create = `// @mkbabb/glass-ui/aurora-config — the aurora configuration, without the component.
//
// The configuration schema and its defaults, the palette derivation, the render-mode
// resolver, and the first-paint ground a shell paints before \`Aurora\` resolves. None of
// them reaches \`Aurora.vue\` or either renderer, so a consumer that reads configuration, or
// paints the eager ground, never pulls the component onto its first-paint path.
// \`/aurora\` publishes the component, its composables and the atom surface; the
// \`/blob-config\` leaf beside \`/blob\` is the same construction.
//
// \`isAuroraDriftLive\` and \`AURORA_DRIFT_FLOOR\` are deliberately not published: they are
// the render loops' own demand gate, with no consumer question they answer.
export {
    DEFAULT_AURORA_CONFIG,
    DEFAULT_VIVIDNESS,
    deriveAurora,
    flattenPalette,
    hexToOklchStop,
    IMAGE_BLUR_MAX_DEFAULT,
    IMAGE_BLUR_MIN_DEFAULT,
    isSoftwareWebGLRenderer,
    MAX_NUCLEI,
    MAX_STOPS,
    PAPER_WASH_GROUND,
    paletteToCssGradient,
    resolveRenderMode,
    VIVID_TARGET,
} from "./config";
export type {
    AuroraConfig,
    AuroraCursorApi,
    AuroraFlow,
    AuroraHarmony,
    AuroraHuePath,
    AuroraImageBlur,
    AuroraImageSource,
    AuroraInstance,
    AuroraInteractivity,
    AuroraMedium,
    AuroraNucleus,
    AuroraRenderMode,
    AuroraSource,
    DeriveAuroraOptions,
    DeriveEasing,
    FlowPattern,
    ResolveRenderModeOptions,
    StrokeMode,
    StrokeOrient,
    WarpMode,
} from "./config";
// The luminance-faithful fallback ground: the field-sampled nuclei-glow surface for the
// software-raster and capture substrate, and the eager shell's frame-0 wash.
// \`sampleAuroraField\` is the per-pixel static composite the certify π measures.
export {
    auroraFallbackGround,
    nucleiFieldStatic,
    relativeLuminance,
    sampleAuroraField,
    type AuroraFallbackGround,
    type AuroraFallbackGroundOptions,
    type AuroraGroundMetrics,
} from "./composables/auroraFallbackGround";
`;

export const fromSpecs = {
    "@glass/components/aurora": "@glass/components/aurora/aurora-config",
    "@mkbabb/glass-ui/aurora": "@mkbabb/glass-ui/aurora-config",
};

const moved = names.map((n) => `| \`${n}\` | \`@mkbabb/glass-ui/aurora\` | \`@mkbabb/glass-ui/aurora-config\` |`).join("\n");
const IDX = "src/components/aurora/index.ts";

export const edits = [
    // ---- ./aurora drops the moved names (R-6)
    { file: IDX, why: "R-6: the render-mode names ship from ./aurora-config", from: "// Adaptive render substrate. `AuroraRenderMode` is the public prop\n", until: "    type ResolveRenderModeOptions,\n} from \"./config\";\n", to: "" },
    { file: IDX, why: "R-6: the config defaults and types ship from ./aurora-config (the drift-gate note moves with them)", from: "// `isAuroraDriftLive` + `AURORA_DRIFT_FLOOR` are deliberately NOT re-exported here.\n", until: "    type WarpMode,\n} from \"./config\";\n", to: "" },
    { file: IDX, why: "R-6: the palette derivation ships from ./aurora-config", from: "export {\n    deriveAurora,\n", until: "    paletteToCssGradient,\n} from \"./config\";\n", to: "" },
    { file: IDX, why: "R-6 / P3-R5: the first-paint ground ships from ./aurora-config", from: "// The luminance-faithful headless fallback ground (the\n", until: "} from \"./composables/auroraFallbackGround\";\n", to: "" },
    { file: IDX, why: "R-6: the derive-colour types ship from ./aurora-config", from: "// D10b — the seed-one-color → N-stop palette producer (composes the shipped\n", until: "export type { AuroraHuePath } from \"./config\";\n", to: "" },
    // ---- the entry record (F-3); package.json follows it in the next step (entries write)
    { file: "scripts/structure/records/entry-record.json", why: "P3-R5: one new export key", from: "        [\"aurora\",\"src/components/aurora/index.ts\"],\n", to: "        [\"aurora\",\"src/components/aurora/index.ts\"],\n        [\"aurora-config\",\"src/components/aurora/aurora-config.ts\"],\n" },
    // ---- MIGRATION: one removal row per name (E-6) and the added key
    {
        file: "MIGRATION.md",
        why: "E-6: a removal row per name, first cell the name; P3-R5: the added entry",
        from: "| `SurfaceTier` | `@mkbabb/glass-ui/surface` | `@mkbabb/glass-ui/axes` |\n",
        to: `| \`SurfaceTier\` | \`@mkbabb/glass-ui/surface\` | \`@mkbabb/glass-ui/axes\` |\n${moved}\n\n_A new entry: \`@mkbabb/glass-ui/aurora-config\`_\n\nThe aurora configuration, beside \`/aurora\` as \`/blob-config\` sits beside \`/blob\`: the\nconfiguration schema and defaults, the palette derivation, the render-mode resolver and the\nfirst-paint ground (\`auroraFallbackGround\`), without the component or either renderer. The\nnames in the table above whose new home is \`/aurora-config\` leave \`/aurora\`.\n`,
    },
    // ---- the two consumer holds S29 froze (demo/shell/AppShell.vue, demo/chassis/hero/aurora-hero.ts)
    { file: "demo/shell/AppShell.vue", why: "R-10: the eager ground through its entry (the hold S29 froze)", from: "import { auroraFallbackGround } from \"@glass/components/aurora/composables/auroraFallbackGround\";", to: "import { auroraFallbackGround } from \"@glass/components/aurora/aurora-config\";" },
    { file: "demo/shell/AppShell.vue", why: "the comment names the ground's eager deps as they now are", from: "// chunk resolves is a first-paint regression, not a diet. Its deps\n// (`composables/color`, the type-only `aurora/constants/presets`) are already eager.\n", to: "// chunk resolves is a first-paint regression, not a diet. Its entry, `./aurora-config`,\n// reaches the config module and the colour kernel only, both already eager.\n" },
    // ---- R-10's async boundary: the public entry, loaded dynamically (G's L4.5 construction)
    { file: "demo/shell/AppShell.vue", why: "R-10: a deliberate async boundary imports the public subpath dynamically (B2: a consumer reaches src through an entry)", from: "    loader: () => import(\"@glass/components/aurora/Aurora.vue\"),", to: "    loader: () => import(\"@glass/components/aurora\").then((m) => m.Aurora)," },
    { file: "demo/shell/AppShell.vue", why: "the comment names what the async chunk now loads", from: "// shader sets was still eager. The direct component path is imported rather than the\n// aurora barrel so the async chunk carries the component, not the whole export surface.\n", to: "// shader sets was still eager. The boundary loads the public `./aurora` entry (R-10): the\n// component, its composables and the atoms; the configuration rides `./aurora-config`.\n" },
    { file: "tests/gates/boot-graph.test.ts", why: "the async boundary's pinned target is the public entry (R-10)", from: "        [\"Aurora\", \"@glass/components/aurora/Aurora.vue\"],", to: "        [\"Aurora\", \"@glass/components/aurora\"]," },
    { file: "tests/gates/boot-graph.test.ts", why: "the swap mutation plants on the boundary's text as it now reads", from: "                .replace('import(\"@glass/components/aurora/Aurora.vue\")', 'import(\"./configurator/PresetEditor.vue\")')\n                .replace('import(\"__C19_SWAP__\")', 'import(\"@glass/components/aurora/Aurora.vue\")'),", to: "                .replace('import(\"@glass/components/aurora\")', 'import(\"./configurator/PresetEditor.vue\")')\n                .replace('import(\"__C19_SWAP__\")', 'import(\"@glass/components/aurora\")')," },
    { file: "tests/gates/boot-graph.test.ts", why: "the ground mutation plants on the specifier as it now reads", from: "            source.replace(\"@glass/components/aurora/composables/auroraFallbackGround\", \"./wrong-ground\"),", to: "            source.replace(\"@glass/components/aurora/aurora-config\", \"./wrong-ground\")," },
    // ---- the hero reads the config defaults off the entry (the hold S29 froze)
    { file: "demo/chassis/hero/aurora-hero.ts", why: "R-10: the config defaults through ./aurora-config, which carries no component (the hold S29 froze)", from: "// The config factory reads the plain-object default from the leaf that DEFINES it, not\n// from the aurora barrel: the barrel's first line re-exports `Aurora.vue`, so a barrel\n// import here would statically re-drag the component into the eager graph and undo the\n// shell's async boundary.\nimport type { AuroraConfig } from \"@glass/components/aurora/config/presets\";\nimport { DEFAULT_AURORA_CONFIG } from \"@glass/components/aurora/config/presets\";\n", to: "// The config factory reads the plain-object default from `./aurora-config`, not from the\n// aurora barrel: the barrel's first line re-exports `Aurora.vue`, so a barrel import here\n// would statically re-drag the component into the eager graph and undo the shell's async\n// boundary.\nimport type { AuroraConfig } from \"@glass/components/aurora/aurora-config\";\nimport { DEFAULT_AURORA_CONFIG } from \"@glass/components/aurora/aurora-config\";\n" },
    // ---- the boot-graph pin reads the ground off the entry
    { file: "tests/gates/boot-graph.test.ts", why: "the source arm pins the ground's barrel-free specifier, now its entry", from: "            binding.module === \"@glass/components/aurora/composables/auroraFallbackGround\",", to: "            binding.module === \"@glass/components/aurora/aurora-config\"," },
    // ---- the unit's README reads the configuration off its entry
    { file: "src/components/aurora/README.md", why: "the documented import takes the config names from ./aurora-config", from: "import {\n    Aurora,\n    DEFAULT_AURORA_CONFIG,\n    deriveAurora,\n} from \"@mkbabb/glass-ui/aurora\";", to: "import { Aurora } from \"@mkbabb/glass-ui/aurora\";\nimport { DEFAULT_AURORA_CONFIG, deriveAurora } from \"@mkbabb/glass-ui/aurora-config\";" },
    { file: "src/components/aurora/README.md", why: "the documented runtime import takes the config names from ./aurora-config", from: "    createAurora,\n    useAurora,\n    resolveAtoms,\n    deriveAurora,\n    resolveRenderMode,\n    DEFAULT_AURORA_CONFIG,\n} from \"@mkbabb/glass-ui/aurora\";\n\nimport type {\n    AuroraConfig,\n    AuroraInstance,\n    AuroraRuntimeOptions,\n} from \"@mkbabb/glass-ui/aurora\";", to: "    createAurora,\n    useAurora,\n    resolveAtoms,\n} from \"@mkbabb/glass-ui/aurora\";\nimport { deriveAurora, resolveRenderMode, DEFAULT_AURORA_CONFIG } from \"@mkbabb/glass-ui/aurora-config\";\n\nimport type { AuroraRuntimeOptions } from \"@mkbabb/glass-ui/aurora\";\nimport type { AuroraConfig, AuroraInstance } from \"@mkbabb/glass-ui/aurora-config\";" },
];
