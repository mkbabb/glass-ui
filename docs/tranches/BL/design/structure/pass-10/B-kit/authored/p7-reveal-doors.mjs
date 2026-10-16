// authored/p7-reveal-doors.mjs — AUTHORED input to derive/edits.mjs (step S71d; pass 7, §P6-8.4,
// LAW §5). After S71c moves useLiquidReveal into morph, the reveal door stops carrying it (B9),
// the morph door carries it for ./motion, the leaf reads useElementMorph as a member of its own
// module (never through its own door, B1), and ./motion takes it from morph.
export const why = "§P6-8.4 (pass 7, LAW §5): useLiquidReveal is read through the morph door; the reveal door keeps useStagger and vReveal, so ./motion-core reads no door that carries keyframes.js";
export const edits = [
    { file: "src/composables/motion/reveal/index.ts", why: "the reveal door carries only its module's names (B9): useLiquidReveal left at S71c", from: `export type { LiquidRevealPreset, UseLiquidRevealOptions, UseLiquidRevealReturn } from "../morph/useLiquidReveal";\nexport { useLiquidReveal } from "../morph/useLiquidReveal";\n`, to: `` },
    { file: "src/composables/motion/morph/index.ts", why: "the morph door carries useLiquidReveal, which ./motion reads", from: `export { trailOffset, useLeadTrail } from "./useLeadTrail";\n`, to: `export { trailOffset, useLeadTrail } from "./useLeadTrail";\nexport type { LiquidRevealPreset, UseLiquidRevealOptions, UseLiquidRevealReturn } from "./useLiquidReveal";\nexport { useLiquidReveal } from "./useLiquidReveal";\n` },
    { file: "src/composables/motion/morph/useLiquidReveal.ts", why: "a member reads its sibling, never its own door (B1)", from: `import { useElementMorph, type ElementMorphPreset } from "./";`, to: `import { useElementMorph, type ElementMorphPreset } from "./useElementMorph";` },
    { file: "src/composables/motion/index.ts", why: "./motion takes useLiquidReveal from morph", from: `export { useLiquidReveal } from "./reveal";\nexport type { LiquidRevealPreset, UseLiquidRevealOptions, UseLiquidRevealReturn } from "./reveal";`, to: `export { useLiquidReveal } from "./morph";\nexport type { LiquidRevealPreset, UseLiquidRevealOptions, UseLiquidRevealReturn } from "./morph";` },
];
