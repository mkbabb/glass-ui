// authored/p6-publish.mjs — AUTHORED input to derive/publish.mjs (step S64; P5-R3, P4-R2,
// pass 6). The names B2 found consumers reading that no entry publishes, where the ruled or
// recommended arm is to publish (pass-6/B2-residual-arms.md holds the table, both arms per
// name). Each name is published on the entry that owns it, through the doors between (LAW
// §5: a door re-exports only its module's subtree), with one MIGRATION "added" row and one
// surface-pin row. Nothing else on the surface changes: derive/publish.mjs builds the tree
// and refuses any pin difference these rows do not name.
//
// Ruled (P5-R3): useDockState and useDockSearch's contract types on ./dock; SectionHierarchy
// on ./sidebar. Recommended (B2-residual-arms.md), landed so B2 reads 0, for the driver's
// ruling: GLASS_BACKDROP_SHARED_ATTR and useGlassBackdropLuminance on ./dock; springProjection
// on ./motion; motionTempo on ./motion-core; pendingRenderer on the root;
// isAuroraPointerEnabled on ./aurora-config; MAX_SATS on ./blob-config; FOURIER_STROKE_RUNGS
// on ./fourier-field.
//
// Pass 7 (P6-R1, the driver's ruling of REGISTRY §P6-4): every recommended row stands as
// landed except `useScrollScene`, which is arm (a). No library file reads it and it imports
// keyframes.js, so it is no published component's contract and never a `./motion-core`
// name: S65 gives the scroll story its own spine and the library file leaves `src`. This
// step publishes nothing for it (no door row, no MIGRATION row, no pin row).

export const why = "B-01/B-10 (P5-R3, P4-R2): the contract names consumers read through no entry are published on their owning entry, each with a MIGRATION \"added\" row and a surface-pin row; the dock search types and useDockState (ruled), SectionHierarchy (ruled), and the residual names as P6-R1 rules them (useScrollScene is arm (a): published nowhere)";

// the surface-pin additions derive/publish.mjs admits, entry → names (runtime or type)
export const added = {
    "./dock": { runtime: ["GLASS_BACKDROP_SHARED_ATTR", "useDockState", "useGlassBackdropLuminance"], types: ["FuzzySearchState", "GLASS_BACKDROP_SHARED_ATTR", "SearchResult", "SearchableItem", "useDockState", "useGlassBackdropLuminance"] },
    "./sidebar": { runtime: [], types: ["SectionHierarchy"] },
    "./motion": { runtime: ["springProjection"], types: ["springProjection"] },
    "./motion-core": { runtime: ["motionTempo"], types: ["motionTempo"] },
    ".": { runtime: ["pendingRenderer"], types: ["pendingRenderer"] },
    "./aurora-config": { runtime: ["isAuroraPointerEnabled"], types: ["isAuroraPointerEnabled"] },
    "./blob-config": { runtime: ["MAX_SATS"], types: ["MAX_SATS"] },
    "./fourier-field": { runtime: ["FOURIER_STROKE_RUNGS"], types: ["FOURIER_STROKE_RUNGS"] },
};

const MIGRATION_ROWS = [
    ["useDockState", "./dock", "the dock state machine `useDockSearch` composes; a consumer driving a search dock constructs it (P5-R3)"],
    ["SearchableItem", "./dock", "the item type of `useDockSearch`'s `items` (P5-R3)"],
    ["SearchResult", "./dock", "the result type `onResultSelect` receives (P5-R3)"],
    ["FuzzySearchState", "./dock", "the type of `UseDockSearchReturn.fuzzy` (P5-R3)"],
    ["GLASS_BACKDROP_SHARED_ATTR", "./dock", "the attribute a consumer sets on a shared backdrop the dock's legibility sampler reads"],
    ["useGlassBackdropLuminance", "./dock", "the backdrop-luminance sampler the dock's legibility runs on, for a consumer's own glass surface"],
    ["SectionHierarchy", "./sidebar", "the base of the published `TreeIndexEntry` (P5-R3)"],
    ["springProjection", "./motion", "the `linear()` stops and settle time of a spring row, the projection the `--spring-*` tokens are generated from"],
    ["motionTempo", "./motion-core", "a duration's tempo register (engine-free)"],
    ["pendingRenderer", "@mkbabb/glass-ui", "the pending value of the published `RendererStatus`, before a substrate reports"],
    ["isAuroraPointerEnabled", "./aurora-config", "whether a config shapes the field under the pointer (interactivity on, PRM aside)"],
    ["MAX_SATS", "./blob-config", "the satellite count's upper bound"],
    ["FOURIER_STROKE_RUNGS", "./fourier-field", "the stroke-width rungs a `FourierFieldConfig` takes"],
];
const pkg = (e) => (e.startsWith("@") ? e : `@mkbabb/glass-ui${e.slice(1)}`);
const migration = [
    "",
    "_Published names_",
    "",
    "A name a consumer read past a door is published on the entry that owns it. Nothing",
    "leaves; import the name from its entry.",
    "",
    "| Name | Import it from | What it is |",
    "| --- | --- | --- |",
    ...MIGRATION_ROWS.map(([n, e, w]) => `| \`${n}\` | \`${pkg(e)}\` | ${w} |`),
    "",
].join("\n");

export const edits = [
    // ---- ./dock
    { file: "src/components/dock/search/index.ts", why: "the search module's door carries useDockSearch's contract types, which ./dock publishes", from: `export { useDockSearch } from "./useDockSearch";\n`, to: `export { useDockSearch } from "./useDockSearch";\nexport type { FuzzySearchState, SearchableItem, SearchResult } from "./types";\n` },
    { file: "src/components/dock/legibility/index.ts", why: "the legibility door carries the shared-backdrop attribute, which ./dock publishes", from: `export { useGlassBackdropLuminance } from "./useGlassBackdropLuminance";`, to: `export { GLASS_BACKDROP_SHARED_ATTR, useGlassBackdropLuminance } from "./useGlassBackdropLuminance";` },
    { file: "src/components/dock/index.ts", why: "P5-R3: useDockState, the state machine useDockSearch composes, beside its published types", from: `export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables/useDockState";`, to: `export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables/useDockState";\nexport { useDockState } from "./composables/useDockState";` },
    { file: "src/components/dock/index.ts", why: "P5-R3: useDockSearch's contract types; the backdrop-luminance pair the legibility runs on", from: `export { useDockSearch } from "./search";\nexport type { UseDockSearchOptions, UseDockSearchReturn } from "./search";`, to: `export { useDockSearch } from "./search";\nexport type { FuzzySearchState, SearchableItem, SearchResult, UseDockSearchOptions, UseDockSearchReturn } from "./search";\n// The adaptive-legibility sampler and the attribute a consumer sets on a backdrop it\n// shares with a dock (the story frame does exactly this).\nexport { GLASS_BACKDROP_SHARED_ATTR, useGlassBackdropLuminance } from "./legibility";` },
    // ---- ./sidebar
    { file: "src/composables/sidebar/index.ts", why: "P5-R3: SectionHierarchy, the base of the published TreeIndexEntry", from: `export type {\n    TreeNode,\n    TreeIndexEntry,`, to: `export type {\n    SectionHierarchy,\n    TreeNode,\n    TreeIndexEntry,` },
    // ---- ./motion and ./motion-core
    { file: "src/composables/motion/spring/index.ts", why: "the spring door carries springProjection, which ./motion publishes", from: `export { SPRING_PRESETS, springPreset } from "./springPresets";`, to: `export { SPRING_PRESETS, springPreset } from "./springPresets";\nexport { springProjection } from "./springProjection";` },
    { file: "src/composables/motion/index.ts", why: "springProjection ships beside the spring register it projects (it evaluates keyframes.js's SpringProgress, so ./motion, not ./motion-core)", from: `export {\n    SPRING_PRESETS,\n    springPreset,\n    type SpringPresetRow,\n    type SpringPresetName,\n} from "./spring";`, to: `export {\n    SPRING_PRESETS,\n    springPreset,\n    springProjection,\n    type SpringPresetRow,\n    type SpringPresetName,\n} from "./spring";` },
    { file: "src/composables/motion/motion-core.ts", why: "motionTempo, pure, ships beside the core constants on the keyframes-free entry", from: `export { useScrollChrome } from "./scroll";\nexport type { UseScrollChromeOptions, UseScrollChromeReturn } from "./scroll";`, to: `export { useScrollChrome } from "./scroll";\nexport type { UseScrollChromeOptions, UseScrollChromeReturn } from "./scroll";\n// A duration's tempo register, pure.\nexport { motionTempo } from "./core";` },
    // ---- the root
    { file: "src/index.ts", why: "pendingRenderer, the pending value of the published RendererStatus (a dependency-free constructor), rides the root beside its type", from: `    // The substrate status pair, type-only (no runtime rides the root barrel with it).\n`, to: `    // The substrate status pair and its pending value (a dependency-free constructor).\n` },
    { file: "src/index.ts", why: "pendingRenderer on the root", from: `    createSpecularWriter,\n    resolveCanvasColor,`, to: `    createSpecularWriter,\n    pendingRenderer,\n    resolveCanvasColor,` },
    // ---- ./aurora-config
    { file: "src/components/aurora/runtime/index.ts", why: "the runtime door carries isAuroraPointerEnabled, which ./aurora-config publishes", from: `export type { AuroraRuntime, AuroraRuntimeMode, AuroraRuntimeOptions } from "./contract";`, to: `export type { AuroraRuntime, AuroraRuntimeMode, AuroraRuntimeOptions } from "./contract";\nexport { isAuroraPointerEnabled } from "./contract";` },
    { file: "src/components/aurora/aurora-config.ts", why: "isAuroraPointerEnabled is a predicate on an AuroraConfig: a consumer reads it with the config, without the component", from: `// The luminance-faithful fallback ground:`, to: `// Whether a config shapes the field under the pointer (interactivity on; reduced motion aside).\nexport { isAuroraPointerEnabled } from "./runtime";\n// The luminance-faithful fallback ground:` },
    // ---- ./blob-config
    { file: "src/components/blob/config.ts", why: "MAX_SATS bounds BlobConfig's satellite count; the config door carries it", from: `export { BLOB_CONFIG_DEFAULTS, BLOB_CONFIG_KEY } from "./types";`, to: `export { BLOB_CONFIG_DEFAULTS, BLOB_CONFIG_KEY } from "./types";\nexport { MAX_SATS } from "./mood";` },
    // ---- ./fourier-field
    { file: "src/components/fourier-field/register/index.ts", why: "the register door carries the stroke rungs, which ./fourier-field publishes", from: `export { DEFAULT_FOURIER_CONFIG, `, to: `export { DEFAULT_FOURIER_CONFIG, FOURIER_STROKE_RUNGS, ` },
    { file: "src/components/fourier-field/index.ts", why: "the stroke rungs a FourierFieldConfig takes, beside the config", from: `export {\n    DEFAULT_FOURIER_CONFIG,\n    type FourierFieldConfig,`, to: `export {\n    DEFAULT_FOURIER_CONFIG,\n    FOURIER_STROKE_RUNGS,\n    type FourierFieldConfig,` },
    // ---- MIGRATION
    { file: "MIGRATION.md", why: "one \"added\" row per published name (P4-R2)", from: `## UNRELEASED — the structure cut (BL)\n`, to: `## UNRELEASED — the structure cut (BL)\n${migration}` },
];
