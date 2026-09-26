#!/usr/bin/env node
// comment-census.mjs — derive row 01 (B-S11, zone scripts): scripts/comment-census.mjs
// splits into the module scripts/comments/ (door index.mjs) and keeps its CLI.
//
//   node comment-census.mjs --root <tree>
//
// The CLI keeps its header (the detector's statement and USAGE), `pct` and `main`, and
// reads the census through the module's door. The module's files, by concern:
//   lexer.mjs          the stateful line lexer (modes, classify, scanLine)
//   interpolation.mjs  the declared `${…}` approximation, bounded (--audit-interp)
//   detectors.mjs      the prose classes and the commented-out declarations
//   corpus.mjs         the tracked corpus: working tree or a committed revision
//   census.mjs         the census, the one-string seam the gate drives, the prefix roll-up
// Every statement moves verbatim. The edits are `export` on a name a sibling reads, and
// each file's import lines, computed from what the file reads (lib.mjs importLines). The
// gate's test reads the door instead of the CLI.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { filesContaining, importLines, importsOf, openSource, rootArg, sibling, sub, trimLead, write } from "./lib.mjs";

const root = rootArg();
const SRC = "scripts/comment-census.mjs";
const M = "scripts/comments";
const s = openSource(root, SRC);
const NODE = importsOf(root, s.text);
const firstImport = s.text.search(/^import /m);
const header = s.text.slice(0, firstImport);
if (!header.startsWith("#!/usr/bin/env node\n")) throw new Error(`${SRC}: header not found`);

const exp = (block, names, where) => names.reduce((t, n) => sub(t, `\nconst ${n} =`, `\nexport const ${n} =`, where), `\n${block}`).slice(1);
const expFn = (block, names, where) => names.reduce((t, n) => sub(t, `\nfunction ${n}(`, `\nexport function ${n}(`, where), `\n${block}`).slice(1);
const siblings = [];
const emit = (name, head, body, exports) => {
    const imports = importLines(root, body, [...NODE, ...siblings]);
    write(root, `${M}/${name}`, `${head}\n${imports.length ? `${imports.join("\n")}\n\n` : ""}${trimLead(body).replace(/\n*$/, "\n")}`);
    siblings.push(sibling(`./${name}`, exports));
};

// ---- lexer.mjs
let lexer = s.takeAll(["JS", "CSS", "HTML", "MODE_BY_EXT", "classify", "scanLine"]);
lexer = expFn(exp(lexer, ["JS", "CSS", "MODE_BY_EXT"], `${M}/lexer.mjs`), ["classify"], `${M}/lexer.mjs`);
emit("lexer.mjs", `// lexer.mjs — the comment detector's lexer: one file's lines, each BLANK, COMMENT or CODE,
// in the language mode its extension names. The rule, and what it deliberately does not
// do, is stated at the head of scripts/comment-census.mjs.`, lexer, ["JS", "CSS", "MODE_BY_EXT", "classify"]);

// ---- interpolation.mjs
const interp = expFn(s.takeAll(["interpApproximations", "jsRuns"]), ["interpApproximations", "jsRuns"], `${M}/interpolation.mjs`);
emit("interpolation.mjs", `// interpolation.mjs — the lexer's one declared approximation (template interpolation
// interiors read as string content), bounded by a re-runnable count.`, interp, ["interpApproximations", "jsRuns"]);

// ---- detectors.mjs
const det = expFn(s.takeAll(["PROSE_CLASSES", "proseHits", "DEAD_DECL", "deadDeclarations"]), ["proseHits", "deadDeclarations"], `${M}/detectors.mjs`);
emit("detectors.mjs", `// detectors.mjs — what the census convicts on a classified file: the prose classes and the
// commented-out declarations.`, det, ["proseHits", "deadDeclarations"]);

// ---- corpus.mjs
const corpus = expFn(s.takeAll(["EXTENSIONS", "tracked", "readAtRev"]), ["tracked", "readAtRev"], `${M}/corpus.mjs`);
emit("corpus.mjs", `// corpus.mjs — the census's corpus: the tracked .ts/.vue/.css/.mjs files under a root, read
// from the working tree or at a committed revision.`, corpus, ["tracked", "readAtRev"]);

// ---- census.mjs (siblings imported in name order)
siblings.sort((a, b) => a.spec.localeCompare(b.spec));
const census = s.takeAll(["census", "classifyText", "byPrefix"]);
emit("census.mjs", `// census.mjs — the census over a corpus, the same detector applied to one string (the
// seam the gate's fixtures drive), and the roll-up by directory prefix.`, census, ["census", "classifyText", "byPrefix"]);

// ---- the door
const DOOR = ["byPrefix", "census", "classifyText"];
write(root, `${M}/index.mjs`, `// comments/ — the ONE comment counter's detector and census (scripts/comment-census.mjs is
// its CLI; tests/gates/comment-ratio.test.ts drives it).
export { ${DOOR.join(", ")} } from "./census.mjs";
`);

// ---- the CLI: header, its imports (computed), pct, main
for (const i of NODE) s.take(`import:${i.spec}`);
const body = s.rest();
const cliImports = importLines(root, body, [...NODE, sibling("./comments/index.mjs", DOOR)]);
write(root, SRC, `${header}${cliImports.join("\n")}\n\n${trimLead(body)}`);

// ---- the gate's test reads the door (found by what it imports, wherever it lives)
const READERS = filesContaining(root, ["tests", "tests-visual"], `scripts/comment-census.mjs"`);
if (READERS.length !== 1) throw new Error(`${SRC}: ${READERS.length} test files import the CLI, expected 1 (the gate's test)`);
const T = READERS[0];
write(root, T, sub(
    readFileSync(join(root, T), "utf8"),
    `from "../../scripts/comment-census.mjs";`,
    `from "../../scripts/comments/index.mjs";`,
    T,
));
console.log(`split ${SRC}: ${M}/{lexer,interpolation,detectors,corpus,census,index}.mjs; ${T} re-pointed`);
