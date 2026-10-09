// authored/p6-datum.mjs — AUTHORED input to derive/edits.mjs (step S70, last; P4-R3, P5-R2,
// P6-R2). The ratchet is one two-sided total, rebound once, at the last step that changes the
// shipped bytes, with its bytes broken down by class (tools/pack-diff.mjs) and the declarations
// by kind and step (tools/decl-diff.mjs --doors --chain), both read on the chain's final tree
// against the floor base (results/p7/pack.txt). Pass 7 re-measures it after P6-R1 (the scroll
// spine leaves src, its three published names and MIGRATION rows with it) and P6-R2 (the
// morph door keeps its HEAD names: the 1,607 B of eyeglass wiring leave the package), and after
// S71-S71d (the peer-class doors).
export const why = "P4-R3/P5-R2/P6-R2: the datum rebinds once, at the last step that changes the shipped bytes. HEAD 2,919,057 B; the floor 2,913,546 (−5,511, ruled as measured); the route 2,920,401 (+6,855 over the floor, +1,344 over HEAD). By class: MIGRATION.md +9,338 (the structure cut's rows, 13 published names among them), door declarations +2,804, other declarations −5,275, CSS doors +574, other CSS +69, JS −887, other +232. Declarations by kind: wiring +16,913, JSDoc prose −25,161, declarations +5,777. By step (a file is charged to the last step that wrote or moved its source): S5-1 (the JS doors) +14,073; S71b and S71d (the peer-class doors: the core, selection and morph doors and the files they carry) +4,694 and +2,279; S64 (the published names) +1,861; S39-12 (the blob shader split, after S63 declares its chunks `string`) −30,779, all prose. Against pass 6's 2,925,765: −5,364 (P6-R1's three names and MIGRATION rows, P6-R2's 1,607 B of eyeglass wiring, the scroll spine's module)";
export const edits = [
    { file: ".bundle-ratchet", why: "the datum rebinds from 2,919,057 to 2,920,401, the chain's final unpacked content total (two builds of the final tree read the same number)", from: "2919057\n", to: "2920401\n" },
];
