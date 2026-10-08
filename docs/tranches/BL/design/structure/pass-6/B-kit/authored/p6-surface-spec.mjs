// authored/p6-surface-spec.mjs — AUTHORED input to derive/edits.mjs (step S69s; P4-R2). The
// public-surface spec states the exact runtime surface of the root and of ./dock; S64
// published runtime names on both, so the spec's lists name them (the type-only names and the
// other entries' names are not in an exact runtime list). The orphan-CSS gate's dead-referrer
// bite used useScrollScene as "a present src module no public entry reaches"; S64 publishes it
// on ./motion-core, so the bite takes a colocated test, which no entry reaches by law (a helper
// in a slot is read only by its slot's tests, B16, so the bite names a test file).
export const why = "P4-R2: the exact runtime surfaces the public-surface spec states carry the names S64 published on the root (pendingRenderer) and on ./dock (useDockState, GLASS_BACKDROP_SHARED_ATTR, useGlassBackdropLuminance); the orphan-CSS bite's unreachable referrer is a colocated test, since S64 publishes useScrollScene";
export const edits = [
    { file: "tests/public-surface/exports.ts", why: "the root publishes pendingRenderer (S64)", from: `    "createSpecularWriter",\n    "createTokenColorCache",\n`, to: `    "createSpecularWriter",\n    "createTokenColorCache",\n    "pendingRenderer",\n` },
    { file: "tests/public-surface/runtime.spec.ts", why: "./dock publishes the state machine useDockSearch composes and the backdrop-luminance pair (S64)", from: `            // The dock-as-native-dynamic-search-bar seam.\n            "useDockSearch",\n`, to: `            // The dock-as-native-dynamic-search-bar seam, and the state machine it composes.\n            "useDockSearch",\n            "useDockState",\n            // The adaptive-legibility sampler and the attribute a shared backdrop carries.\n            "GLASS_BACKDROP_SHARED_ATTR",\n            "useGlassBackdropLuminance",\n` },
    {
        file: "tests/gates/orphan-css/partial.test.ts",
        why: "S64 publishes useScrollScene, so it is reachable; a colocated test is present in src and reached by no entry",
        from: "so any nonexistent path is vacuously \"unreachable\" — that proves nothing). `useScrollScene`\n        // is a genuine `src/` module that no public entry imports: present AND excluded from reach.\n        const deadSfc = join(SRC, \"composables\", \"motion\", \"scroll\", \"useScrollScene.ts\");",
        to: "so any nonexistent path is vacuously \"unreachable\" — that proves nothing). A colocated test\n        // is a genuine `src/` module that no public entry imports (a slot is never on a door's\n        // chain): present AND excluded from reach.\n        const deadSfc = join(SRC, \"composables\", \"color\", \"__tests__\", \"resolveColor.test.ts\");",
    },
];
