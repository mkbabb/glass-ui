// authored/p8-scroll-cite.mjs — AUTHORED input to derive/edits.mjs (step S72; pass 8, P7-G6,
// P6-R1). S65 moved the useScrollScene spine out of src into the scroll story's own directory
// (P6-R1 arm (a)); the register sheet's membership note still cited it as if the library held
// it. The citation follows the move and names the demo file.
export const why = "P7-G6 (P6-R1): scroll-driven.css's membership note names the demo's own scroll spine, demo/stories/motion/scroll/useScrollScene.ts, which S65 moved out of src";
export const edits = [
    {
        file: "src/styles/scroll/scroll-driven.css",
        why: "the spine the note cites left src at S65; the citation names where it lives",
        from: " * `useScrollScene` spine, so the axis has one in-repo specimen showing all three\n",
        to: " * story's own `useScrollScene` spine (`demo/stories/motion/scroll/useScrollScene.ts`),\n * so the axis has one in-repo specimen showing all three\n",
    },
];
