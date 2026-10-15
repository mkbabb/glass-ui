// authored/p7-peer-class-doors.mjs — AUTHORED input to derive/edits.mjs (step S71b; pass 7,
// §P6-8.4, LAW §5). After S71's moves the engine has re-pointed every relative reader at the
// moved files; each crossing now goes through the door of the module that holds the name (B1),
// the spring and morph doors stop carrying names outside their modules (B9), the selection
// module gets its door, the entry record lists it (B7), and the prose that cites the moved
// files by path names where they are.
export const why = "§P6-8.4 (pass 7, LAW §5): useLiquidFlex is read through the engine-free core's door and the selection engine through its own; the spring and morph doors keep only their modules' names, so no name ./motion-core publishes evaluates keyframes.js through a door";

const SEL_DOOR = `// composables/motion/selection — module door: the names read from outside this module.
export type { SelectionMode, SelectionRole, UseSelectionGroupParams, UseSelectionGroupReturn } from "./useSelectionGroup";
export { useSelectionGroup } from "./useSelectionGroup";
export type { SelectionDeform, SelectionOption, UseSelectionIndicatorParams, UseSelectionIndicatorReturn } from "./useSelectionIndicator";
export { DEFAULT_INDICATOR_MAX_STRETCH, INDICATOR_RELEASE_AT_ARRIVAL, useSelectionIndicator } from "./useSelectionIndicator";
export type { TabActivation } from "./useTabRovingFocus";
`;

export const edits = [
    // ---- the doors
    { file: "src/composables/motion/spring/index.ts", why: "the spring door carries only its module's names (B9): useLiquidFlex left at S71", from: `export type { LiquidFlexAxis, UseLiquidFlexParams, UseLiquidFlexReturn } from "../core/useLiquidFlex";\nexport { useLiquidFlex } from "../core/useLiquidFlex";\n`, to: `` },
    { file: "src/composables/motion/core/index.ts", why: "the core door carries useLiquidFlex and its types, read by the selection engine, morph's drag, spring's press and ./motion-core", from: `export { useIntersectionPause } from "./useIntersectionPause";\n`, to: `export { useIntersectionPause } from "./useIntersectionPause";\nexport type { LiquidFlexAxis, UseLiquidFlexParams, UseLiquidFlexReturn } from "./useLiquidFlex";\nexport { useLiquidFlex } from "./useLiquidFlex";\n` },
    { file: "src/composables/motion/morph/index.ts", why: "the morph door carries only its module's names (B9): the selection engine left at S71", from: `export type { SelectionMode, SelectionRole, UseSelectionGroupParams, UseSelectionGroupReturn } from "../selection/useSelectionGroup";\nexport { useSelectionGroup } from "../selection/useSelectionGroup";\nexport type { SelectionDeform, SelectionOption, UseSelectionIndicatorParams, UseSelectionIndicatorReturn } from "../selection/useSelectionIndicator";\nexport { DEFAULT_INDICATOR_MAX_STRETCH, INDICATOR_RELEASE_AT_ARRIVAL, useSelectionIndicator } from "../selection/useSelectionIndicator";\nexport type { TabActivation } from "../selection/useTabRovingFocus";\n`, to: `` },
    { file: "src/composables/motion/selection/index.ts", why: "the selection module's door: the names ./motion-core and the tabs unit read from it (B7, B11)", create: SEL_DOOR },
    { file: "scripts/structure/records/entry-record.json", why: "the entry record lists every src door (B7)", from: `        "src/composables/motion/scroll/index.ts",\n`, to: `        "src/composables/motion/scroll/index.ts",\n        "src/composables/motion/selection/index.ts",\n` },
    // ---- the readers
    { file: "src/composables/motion/spring/useLiquidPress.ts", why: "a crossing into the core goes through its door (B1)", from: `import { useLiquidFlex } from "../core/useLiquidFlex";`, to: `import { useLiquidFlex } from "../core";` },
    { file: "src/composables/motion/selection/useSelectionIndicator.ts", why: "useLiquidFlex is the core's: the spring door's keyframes-bearing names stay out of the engine's closure", from: `import { useLiquidFlex } from "../spring";\nimport { effectiveCap, writeVelocityWeight } from "../core";`, to: `import { effectiveCap, useLiquidFlex, writeVelocityWeight } from "../core";` },
    { file: "src/composables/motion/morph/useDragMorph.ts", why: "useLiquidFlex is the core's", from: `import { useLiquidFlex } from "../spring";`, to: `import { useLiquidFlex } from "../core";` },
    { file: "src/composables/motion/motion-core.ts", why: "./motion-core takes useLiquidFlex from the core, the keyframes-free module it already reads", from: `export { useLiquidFlex } from "./spring";\nexport type { LiquidFlexAxis, UseLiquidFlexParams, UseLiquidFlexReturn } from "./spring";`, to: `export { useLiquidFlex } from "./core";\nexport type { LiquidFlexAxis, UseLiquidFlexParams, UseLiquidFlexReturn } from "./core";` },
    { file: "src/composables/motion/motion-core.ts", why: "./motion-core takes the selection engine from its own module, whose door carries no peer", from: `export { DEFAULT_INDICATOR_MAX_STRETCH, INDICATOR_RELEASE_AT_ARRIVAL, useSelectionIndicator } from "./morph";\nexport type { SelectionOption, SelectionDeform, UseSelectionIndicatorParams, UseSelectionIndicatorReturn } from "./morph";\nexport { useSelectionGroup } from "./morph";\nexport type { SelectionMode, SelectionRole, UseSelectionGroupParams, UseSelectionGroupReturn } from "./morph";`, to: `export { DEFAULT_INDICATOR_MAX_STRETCH, INDICATOR_RELEASE_AT_ARRIVAL, useSelectionIndicator } from "./selection";\nexport type { SelectionOption, SelectionDeform, UseSelectionIndicatorParams, UseSelectionIndicatorReturn } from "./selection";\nexport { useSelectionGroup } from "./selection";\nexport type { SelectionMode, SelectionRole, UseSelectionGroupParams, UseSelectionGroupReturn } from "./selection";` },
    { file: "src/components/tabs/types.ts", why: "TabActivation is the selection module's", from: `import type { TabActivation } from "../../composables/motion/morph";`, to: `import type { TabActivation } from "../../composables/motion/selection";` },
    // ---- the prose that cites the moved files by path
    { file: "src/styles/tokens/sizing/scale-paper.css", why: "the eyeglass law moved at S71", from: "`composables/motion/morph/eyeglass.ts`. */", to: "`composables/motion/selection/eyeglass.ts`. */" },
    { file: "src/components/tabs/styles/segmented.css", why: "the eyeglass law moved at S71", from: "`composables/motion/morph/eyeglass.ts`", to: "`composables/motion/selection/eyeglass.ts`", all: true },
    { file: "src/components/tabs/README.md", why: "the eyeglass law moved at S71", from: "`composables/motion/morph/eyeglass.ts`", to: "`composables/motion/selection/eyeglass.ts`", all: true },
    { file: "src/components/tabs/README.md", why: "the selection engine is its own module since S71", from: "  (`src/composables/motion/morph/`) — the library's ONE selection engine and its ONE", to: "  (`src/composables/motion/selection/`) — the library's ONE selection engine and its ONE" },
    { file: "src/components/tabs/__tests__/tabs-seam.test.ts", why: "the eyeglass law and its test moved at S71", from: "// The law's own arms pin the same three numbers on motion/morph/eyeglass.ts:\n// src/composables/motion/morph/__tests__/eyeglass.test.ts.", to: "// The law's own arms pin the same three numbers on motion/selection/eyeglass.ts:\n// src/composables/motion/selection/__tests__/eyeglass.test.ts." },
    { file: "src/composables/motion/README.md", why: "the selection engine is a mechanism group of its own since S71", from: "`reveal/`, `pointer/`, `morph/`, and `core/`.", to: "`reveal/`, `pointer/`, `morph/`, `selection/`, and `core/`." },
];
