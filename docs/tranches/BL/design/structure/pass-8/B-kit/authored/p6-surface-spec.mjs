// authored/p6-surface-spec.mjs — AUTHORED input to derive/edits.mjs (step S69s; P4-R2). The
// public-surface spec states the exact runtime surface of the root and of ./dock; S64
// published runtime names on both, so the spec's lists name them (the type-only names and the
// other entries' names are not in an exact runtime list). (Pass 7: the orphan-CSS bite's
// referrer moved to S65, the step that removes the file it named; P6-R1.)
export const why = "P4-R2: the exact runtime surfaces the public-surface spec states carry the names S64 published on the root (pendingRenderer) and on ./dock (useDockState, GLASS_BACKDROP_SHARED_ATTR, useGlassBackdropLuminance)";
export const edits = [
    { file: "tests/public-surface/exports.ts", why: "the root publishes pendingRenderer (S64)", from: `    "createSpecularWriter",\n    "createTokenColorCache",\n`, to: `    "createSpecularWriter",\n    "createTokenColorCache",\n    "pendingRenderer",\n` },
    { file: "tests/public-surface/runtime.spec.ts", why: "./dock publishes the state machine useDockSearch composes and the backdrop-luminance pair (S64)", from: `            // The dock-as-native-dynamic-search-bar seam.\n            "useDockSearch",\n`, to: `            // The dock-as-native-dynamic-search-bar seam, and the state machine it composes.\n            "useDockSearch",\n            "useDockState",\n            // The adaptive-legibility sampler and the attribute a shared backdrop carries.\n            "GLASS_BACKDROP_SHARED_ATTR",\n            "useGlassBackdropLuminance",\n` },
];
