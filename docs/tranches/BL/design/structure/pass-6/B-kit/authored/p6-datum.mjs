// authored/p6-datum.mjs — AUTHORED input to derive/edits.mjs (step S70, last; P4-R3, P5-R2).
// The ratchet is one two-sided total, rebound once at the migration's landing, with its bytes
// broken down by class (tools/pack-diff.mjs) and the declarations by kind and step
// (tools/decl-diff.mjs --doors --chain), both read on the chain's final tree against the
// floor base (results/p6/pack-diff.json, results/p6/decl-diff.json).
export const why = "P4-R3/P5-R2: the datum rebinds once, at the landing. HEAD 2,919,057 B; the floor 2,913,546 (−5,511, ruled as measured); the route 2,925,765 (+12,219 over the floor, +6,708 over HEAD). By class: MIGRATION.md +9,654 (the structure cut's rows, 16 published names among them), door declarations +3,192, other declarations −1,703, CSS doors +574, other CSS +69, JS +201, other +232. Declarations by kind: wiring +17,549, JSDoc prose −22,503, declarations +6,443. By step: S5-1 (the JS doors) +17,332; S64 (the published names) +7,928, all wiring; S39-12 (the blob shader split, after S63 declares its chunks `string`) −30,779, all prose: the stage source the pass-5 datum carried twice (13,678 B) now ships in no declaration";
export const edits = [
    { file: ".bundle-ratchet", why: "the datum rebinds from 2,919,057 to 2,925,765, the chain's final unpacked content total (two builds of the final tree read the same number)", from: "2919057\n", to: "2925765\n" },
];
