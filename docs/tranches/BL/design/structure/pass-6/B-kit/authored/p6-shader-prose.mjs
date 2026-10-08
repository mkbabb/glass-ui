// authored/p6-shader-prose.mjs — AUTHORED input to derive/edits.mjs (step S63; P5-R2). The
// S39-12 blob shader split gave each field stage its own module. A `const` initialised by a
// template with no substitution is declared with its literal type, so each chunk's declaration
// shipped the stage's whole source, comments included: 13,678 B of shader prose copied into
// new declarations, beside the assembled shader's own (decl-diff.mjs --doors --chain). The
// cure is one source of record: a chunk is declared as what it is to its one reader, a
// `string`, so its text stays in the source and leaves the declarations. METABALL_WGSL splices
// its chunk, so its declaration becomes `string` too. Neither name is published by an entry;
// no consumer reads either type.
export const why = "P5-R2: the S39-12 shader chunks are declared `string`, so the stage source they hold (13,678 B of comment prose in the pass-5 datum) stays in the source and leaves the declarations; one source of record";
export const edits = [
    {
        file: "src/components/blob/renderer/webgl/metaball-field.glsl.ts",
        why: "the GLSL field stage is a string to its one reader (metaball.frag.ts); its source is not a declaration",
        from: "export const METABALL_FIELD_GLSL = /* glsl */ `",
        to: "export const METABALL_FIELD_GLSL: string = /* glsl */ `",
    },
    {
        file: "src/components/blob/renderer/webgpu/metaball-field.wgsl.ts",
        why: "the WGSL field stage is a string to its one reader (metaball.wgsl.ts); its source is not a declaration",
        from: "export const METABALL_FIELD_WGSL = /* wgsl */ `",
        to: "export const METABALL_FIELD_WGSL: string = /* wgsl */ `",
    },
];
