// authored/p6-names-cite.mjs — AUTHORED input to derive/edits.mjs (step S62c; B-07). The two
// renamed specs (S62) name their own old file in their header comment; the header now names
// the file it is in. Test titles are kept: a title is a report key, and base-green reads it.
export const why = "B-07: the renamed specs' header comments name the file they are in";
export const edits = [
    {
        file: "tests-visual/storybook/configurator/category-color-identity.spec.ts",
        why: "the header names this file",
        from: "// BA.W-SUFFUSE2 — suffuse2.spec.ts, the π getComputedStyle readback of the",
        to: "// BA.W-SUFFUSE2 — category-color-identity.spec.ts, the π getComputedStyle readback of the",
    },
    {
        file: "tests-visual/motion/curve-gallery-render.spec.ts",
        why: "the header names this file",
        from: "// AZ.W-MOTION2 (R7) — motion2.spec.ts, the painted browser half of the motion",
        to: "// AZ.W-MOTION2 (R7) — curve-gallery-render.spec.ts, the painted browser half of the motion",
    },
];
