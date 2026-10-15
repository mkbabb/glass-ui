// authored/p6-datum.mjs — AUTHORED input to derive/edits.mjs (step S70, last; P4-R3, P5-R2,
// P6-R2). The ratchet is one two-sided total, rebound once, at the last step that changes the
// shipped bytes, with its bytes broken down by class (tools/pack-diff.mjs) and the declarations
// by kind and step (tools/decl-diff.mjs --doors --chain), both read on the chain's final tree
// against the floor base (results/p8/pack/). Pass 7 re-measured it after P6-R1, P6-R2 and
// S71-S71d. Pass 8 re-measures it after S73-S73c (the dock context's own module): S72 and the
// gate's re-land change no shipped byte (the citation is a source comment the build drops;
// scripts/ and tests/ do not ship), so S73c is the last step that changes the package bytes.
export const why = "P4-R3/P5-R2/P6-R2: the datum rebinds once, after the last step that changes the shipped bytes (S73c). HEAD 2,919,057 B; the floor 2,913,546 (−5,511, ruled as measured); the route 2,920,391 (+6,845 over the floor, +1,334 over HEAD). By class: MIGRATION.md +9,338 (the structure cut's rows, 13 published names among them), door declarations +2,977, other declarations −5,422, CSS doors +574, other CSS +69, JS −923, other +232. Declarations by kind: wiring +17,086, JSDoc prose −25,240, declarations +5,709. By step (a file is charged to the last step that wrote or moved its source): S5-1 (the JS doors) +14,081; S71b and S71d (the peer-class doors) +4,694 and +2,279; S64 (the published names) +1,837; S73, S73b, S73c (the dock context's module and door) −147, −8, +181; S39-12 (the blob shader split, after S63 declares its chunks `string`) −30,779, all prose. Against pass 7's 2,920,401: −10";
export const edits = [
    { file: ".bundle-ratchet", why: "the datum rebinds from 2,919,057 to 2,920,391, the chain's final unpacked content total (two builds of the final tree read the same number)", from: "2919057\n", to: "2920391\n" },
];
