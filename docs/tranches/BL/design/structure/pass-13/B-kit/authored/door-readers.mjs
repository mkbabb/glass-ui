// authored/door-readers.mjs — AUTHORED input to derive/edits.mjs (step S30).
//
// S20 put the floor runtime behind one door (scripts/structure/index.mjs), so every reader
// of the graph, the record or the gate now loads the CLIs that hold those functions
// (gates.mjs → cascade.mjs, surface.mjs; seal/seal.mjs). A test running in a DOM environment
// takes Vite's web transform, which does not parse a hashbang line, and the suite fails to
// load (14 suites under npm test). The CLIs are run as `node <file>` (mode 644, no bin), so
// the hashbang line does nothing: it leaves every CLI of the runtime, not only the four a
// door reaches today (one rule for the zone, not a list that drifts). The gate's own file
// takes the same cut through its re-land (gate/seal.mjs in the kit).
//
// B11: the minify door published hasCommentOutsideString for its own test alone; the
// colocated test reads it from the file (its home's inside, LAW §5), and the door keeps
// minifyCss, the one name the style fold reads.

export const why = "the floor runtime's CLIs lose their hashbang (the door loads them into DOM-environment tests, whose web transform refuses it); B11: the minify door keeps only minifyCss";

const HASHBANG = "#!/usr/bin/env node\n";
const CLIS = ["bounds", "browser", "cascade", "classify", "entries", "fixpoint", "gates", "graph", "move", "placement", "surface"].map((n) => `scripts/structure/${n}.mjs`);

export const edits = [
    ...CLIS.map((file) => ({ file, why: "run as `node <file>`; the door loads it into DOM-environment tests", from: HASHBANG, to: "" })),
    { file: "scripts/minify/index.ts", why: "B11: only the colocated test read hasCommentOutsideString", from: 'export { hasCommentOutsideString, minifyCss } from "./minify-css";', to: 'export { minifyCss } from "./minify-css";' },
    { file: "scripts/minify/__tests__/minify-css.test.ts", why: "LAW §5: a colocated test reads its home's inside", from: 'import { hasCommentOutsideString, minifyCss } from "..";', to: 'import { hasCommentOutsideString, minifyCss } from "../minify-css";' },
];
