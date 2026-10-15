// authored/b4-cycles.mjs — AUTHORED input to derive/edits.mjs (step S35, pass 4; B-01, cB O-1).
//
// LAW §8 says sibling edges are acyclic at every depth; the pass-3 gate filed a cycle between
// two files of one directory under `meta.b4info` instead of counting it. B4 now counts it
// (one rule, no exemption), and on the tree after S34 it names two, each cured by moving
// the declaration or the helper to the file that owns its meaning:
//   - `composables/glass/lifecycle`: `visibility.ts` read the suspend-reason union from
//     `createCanvasLifecycle.ts`, which composes `visibility.ts`. The observers write three of
//     the four reasons, so the union moves to `visibility.ts` and the scheduler reads it there;
//   - `composables/color`: the shell `useAccentTone.ts` typed its lazy leaf as
//     `typeof import("./accent-tone-solve")` while the leaf reads the shell's options type.
//     The shell now declares the one export it reads from the leaf, and the leaf implements
//     it (the type edge runs one way, leaf → shell; the assignment of the dynamic import still
//     type-checks the leaf against it);
//   The floor's own `lib/move.mjs` ↔ `lib/classify.mjs` cycle is cured in the floor itself
//   (P5-F1, `lib/plan.mjs`), so this row no longer carries a floor arm.

export const why = "B4 (LAW §8, cB O-1): same-directory file cycles are counted; the two on the tree are cured by moving the declaration or helper to the file that owns its meaning";

const LC = "src/composables/glass/lifecycle/createCanvasLifecycle.ts";
const VIS = "src/composables/glass/lifecycle/visibility.ts";
const REASON = `// Offscreen parking combines two independent detectors writing
// DISTINCT reason keys, so the "one writer per reason" invariant is literally true:
//   - "off-screen"    — the substrate's \`contentvisibilityautostatechange\` path
//                       (content-visibility:auto, the headline lever).
//   - "off-screen-io" — the consumer's IntersectionObserver \`rootMargin\` fallback
//                       (the engine-without-content-visibility path).
// Both gate the same empty-\`Set\` \`isRunning()\` check, so the loop runs only when both
// agree the surface is visible.
export type CanvasSuspendReason =
    | "tab-hidden"
    | "off-screen"
    | "off-screen-io"
    | "manual";
`;


export const edits = [
    // ---- composables/glass/lifecycle
    { file: LC, why: "the suspend-reason union moves to the observers that write three of its four reasons", from: REASON + "\n", to: "" },
    { file: LC, why: "the scheduler reads the union from the observers' leaf, which it already composes", from: 'import { createCanvasVisibility } from "./visibility";', to: 'import { createCanvasVisibility, type CanvasSuspendReason } from "./visibility";' },
    { file: VIS, why: "the union is declared where its reasons are written", from: 'import type { CanvasSuspendReason } from "./createCanvasLifecycle";\n', to: REASON },
    // ---- composables/color
    {
        file: "src/composables/color/useAccentTone.ts",
        why: "the shell declares the one export it reads from the lazy leaf; the leaf implements it",
        from: 'type AccentToneSolveModule = typeof import("./accent-tone-solve");',
        to: "/** The one export this shell reads from the lazy solve leaf. The leaf implements it\n *  (it reads `UseAccentToneOptions` from here), so the type edge runs one way. */\ninterface AccentToneSolveModule {\n    solveAccentInk(toneCss: string, opts?: UseAccentToneOptions): string;\n}",
    },
];
