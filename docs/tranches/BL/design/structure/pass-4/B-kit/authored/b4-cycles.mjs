// authored/b4-cycles.mjs — AUTHORED input to derive/edits.mjs (step S35, pass 4; B-01, cB O-1).
//
// LAW §8 says sibling edges are acyclic at every depth; the pass-3 gate filed a cycle between
// two files of one directory under `meta.b4info` instead of counting it. B4 now counts it
// (one rule, no exemption), and on the tree after S34 it names three, each cured by moving
// the declaration or the helper to the file that owns its meaning:
//   - `composables/glass/lifecycle`: `visibility.ts` read the suspend-reason union from
//     `createCanvasLifecycle.ts`, which composes `visibility.ts`. The observers write three of
//     the four reasons, so the union moves to `visibility.ts` and the scheduler reads it there;
//   - `composables/color`: the shell `useAccentTone.ts` typed its lazy leaf as
//     `typeof import("./accent-tone-solve")` while the leaf reads the shell's options type.
//     The shell now declares the one export it reads from the leaf, and the leaf implements
//     it (the type edge runs one way, leaf → shell; the assignment of the dynamic import still
//     type-checks the leaf against it);
//   - `scripts/structure/lib` (the landed floor): `move.mjs` calls FD-5's `classifyImage`,
//     and `classify.mjs` read the move plan's vocabulary (`expandMoves`, `kindClass`) from
//     `move.mjs`. The vocabulary moves to its own leaf, `lib/plan.mjs`, read by both. This
//     edits the floor's landed copy; the floor's own files carry the same cycle (a floor gap,
//     reported in B-proto.md).

export const why = "B4 (LAW §8, cB O-1): same-directory file cycles are counted; the three on the tree are cured by moving the declaration or helper to the file that owns its meaning";

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

const PLAN = `// plan.mjs — the move plan's vocabulary, read by the engine (move.mjs) and by FD-5's
// classifier (classify.mjs): a move list expanded to file moves, and an edge's mechanism
// class. It sits apart from both so neither reads the other for it (B4).

/** A move list with every directory move expanded to its member files. */
export function expandMoves(tree, moves) {
    const out = [];
    for (const m of moves) {
        if (m.from.endsWith("/")) {
            const base = m.from.replace(/\\/$/, "");
            const dest = m.to.replace(/\\/$/, "");
            const members = tree.files.filter((f) => f.startsWith(\`\${base}/\`));
            if (members.length) for (const f of members) out.push({ from: f, to: \`\${dest}/\${f.slice(base.length + 1)}\` });
            else if (tree.isDir(dest)) out.push({ from: m.from, to: m.to, applied: true, dir: true });
            else throw new Error(\`move: directory \${m.from} is empty and \${m.to} does not exist\`);
        } else out.push({ from: m.from, to: m.to });
    }
    return out;
}

/** Kinds that name one mechanism, a path relative to a file whose text carries it; a
 *  rewrite may change which of the three spellings F-1 reads (P3-F5). */
const TEXT_ANCHORED = new Set(["base-relative", "quoted-relative", "embedded-path"]);
/** an edge's mechanism: its kind, with the three text-anchored spellings as one */
export const kindClass = (kind) => (TEXT_ANCHORED.has(kind) ? "text-anchored" : kind);
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
    // ---- scripts/structure/lib (the landed floor)
    { file: "scripts/structure/lib/plan.mjs", why: "the move plan's vocabulary, read by the engine and by FD-5", create: PLAN },
    {
        file: "scripts/structure/lib/move.mjs",
        why: "the engine reads the plan's vocabulary from its leaf",
        from: 'import { classifyImage } from "./classify.mjs";\n',
        to: 'import { classifyImage } from "./classify.mjs";\nimport { expandMoves, kindClass } from "./plan.mjs";\n',
    },
    {
        file: "scripts/structure/lib/move.mjs",
        why: "expandMoves moves to lib/plan.mjs",
        from: "export function expandMoves(tree, moves) {\n",
        until: "        } else out.push({ from: m.from, to: m.to });\n    }\n    return out;\n}\n\n",
        to: "",
    },
    {
        file: "scripts/structure/lib/move.mjs",
        why: "kindClass moves to lib/plan.mjs",
        from: "/** Kinds that name one mechanism, a path relative to a file whose text carries it; a\n *  rewrite may change which of the three spellings F-1 reads (P3-F5). */\nconst TEXT_ANCHORED = new Set([\"base-relative\", \"quoted-relative\", \"embedded-path\"]);\n/** an edge's mechanism: its kind, with the three text-anchored spellings as one */\nexport const kindClass = (kind) => (TEXT_ANCHORED.has(kind) ? \"text-anchored\" : kind);\n",
        to: "",
    },
    { file: "scripts/structure/lib/classify.mjs", why: "FD-5 reads the plan's vocabulary from its leaf, not from the engine that calls it", from: 'import { expandMoves, kindClass } from "./move.mjs";', to: 'import { expandMoves, kindClass } from "./plan.mjs";' },
];
