// authored/p6-datum.mjs — AUTHORED input to derive/edits.mjs (step S70, last; P4-R3, P5-R2,
// P6-R2). The ratchet is one two-sided total, rebound once, at the last step that changes the
// shipped bytes, with its bytes broken down by class (tools/pack-diff.mjs) and the declarations
// by kind and step (tools/decl-diff.mjs --doors --chain), both read on the chain's final tree
// against the floor base (results/p8/pack/). Pass 7 re-measured it after P6-R1, P6-R2 and
// S71-S71d. Pass 8 re-measures it after S73-S73c (the dock context's own module): S72 and the
// gate's re-land change no shipped byte (the citation is a source comment the build drops;
// scripts/ and tests/ do not ship), so S73c is the last step that changes the package bytes.
// Pass 10 re-measures it after S74-S75 (P9-R1 (a), P9-R2 (a)): the package ships `dist` and
// MIGRATION.md (package.json `files`); S74 moves the ./fourier-math source (its declarations
// follow), S74b-S74e touch scripts/ only, and S75 re-heads and re-words MIGRATION.md, so S75 is
// the last step that changes the package bytes, and S69 and S69s ship nothing.
export const why = "P4-R3/P5-R2/P6-R2: the datum rebinds once, after the last step that changes the shipped bytes (S75, pass 10). HEAD 2,919,057 B; the route 2,920,386 (+1,329 over HEAD), measured by verify:package on the chain's final tree (pass-10 B-kit results/p10/logs/datum-verify-package.log, and the toolchain's two builds). Against pass 9's 2,920,391: -5 (S74's declaration paths under fourier-field/register/ and S75's MIGRATION.md heading and eight re-worded lines; the class breakdown is in results/p10/pack/)";
export const edits = [
    { file: ".bundle-ratchet", why: "the datum rebinds from 2,919,057 to 2,920,386, the chain's final unpacked content total (two builds of the final tree read the same number)", from: "2919057\n", to: "2920386\n" },
];
