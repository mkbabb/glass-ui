#!/usr/bin/env node
// profile-bundle.mjs — derive row 02 (B-S11, zone scripts): scripts/profile-bundle.mjs
// splits into the module scripts/bundle-checks/ (door index.mjs) and keeps its program.
//
//   node profile-bundle.mjs --root <tree>
//
// profile-bundle.mjs is a program: it runs top to bottom at import (the value.js test
// imports it with its env set). It keeps that shape, its paths, its build, the dist census,
// the budget loop, the profile and every report it prints. What each check judges moves to
// a file named for the check:
//   budgets.mjs            the ceilings with their re-base history, and the resolved
//                          /styles draw the CSS ceiling measures
//   drift.mjs              D5: per-subpath drift against the committed baseline
//   value-capabilities.mjs the three Value capabilities the source may import
//   critical-path.mjs      the built root barrel's eager payload, and Aurora's medium tail
//   external-payload.mjs   a declared peer inlined into dist, with its self-test bite
//   files.mjs              the file walk and a dist chunk's name, which the program and
//                          two checks read
// Statements move verbatim. The edits: `export` on the names the program reads; `root`
// becomes a parameter of the two checks that read it; drift's module-level statements
// become the body of `evaluateDrift` (re-indented; its two `anyBudgetExceeded = true`
// become the function's own `exceeded`), and the program calls it where they stood. Every
// file's import lines are computed from what it reads (lib.mjs importLines).
import { importLines, importsOf, openSource, rootArg, sibling, sub, trimLead, write } from "./lib.mjs";

const root = rootArg();
const SRC = "scripts/profile-bundle.mjs";
const M = "scripts/bundle-checks";
const s = openSource(root, SRC);
const NODE = importsOf(root, s.text);

const exp = (block, names, where) => names.reduce((t, n) => sub(t, `\nconst ${n} =`, `\nexport const ${n} =`, where), `\n${block}`).slice(1);
const expFn = (block, names, where) => names.reduce((t, n) => sub(t, `\nfunction ${n}(`, `\nexport function ${n}(`, where), `\n${block}`).slice(1);
const FILES = sibling("./files.mjs", ["walk", "distName"]);
const emit = (name, head, body) => {
    const imports = importLines(root, body, [...NODE, FILES]);
    write(root, `${M}/${name}`, `${head}\n${imports.join("\n")}\n\n${trimLead(body).replace(/\n*$/, "\n")}`);
};

// ---- budgets.mjs
let budgets = s.takeAll(["BUDGETS", "combinedStylesDraw"]);
budgets = expFn(exp(budgets, ["BUDGETS"], `${M}/budgets.mjs`), ["combinedStylesDraw"], `${M}/budgets.mjs`);
emit("budgets.mjs", `// budgets.mjs — the bundle ceilings (each re-base with its reason) and the resolved
// \`dist/styles/index.css\` draw the CSS ceiling measures.`, budgets);

// ---- files.mjs
let files = s.takeAll(["walk", "distName"]);
files = exp(expFn(files, ["walk"], `${M}/files.mjs`), ["distName"], `${M}/files.mjs`);
emit("files.mjs", `// files.mjs — the recursive file walk and a dist chunk's name relative to \`dist/\`.`, files);

// ---- value-capabilities.mjs
let value = s.takeAll(["VALUE_JS_CAPABILITIES", "VALUE_JS_PACKAGE", "IMPORT_SPECIFIER_RE", "evaluateValueCapabilities"]);
value = sub(value, `\nfunction evaluateValueCapabilities() {`, `\nexport function evaluateValueCapabilities(root) {`, `${M}/value-capabilities.mjs`);
emit("value-capabilities.mjs", `// value-capabilities.mjs — the value.js entries the library source may import.`, value);

// ---- critical-path.mjs
const critical = expFn(s.takeAll(["CRIT_DIST_FLOOR_RE", "evaluateCriticalPath"]), ["evaluateCriticalPath"], `${M}/critical-path.mjs`);
emit("critical-path.mjs", `// critical-path.mjs — the built root barrel's eager payload and Aurora's medium tail.`, critical);

// ---- external-payload.mjs
let external = s.takeAll(["BUNDLED_PEER_MARKERS", "evaluateExternalPayload", "externalPayloadSelfTest"]);
external = sub(external, `\nfunction evaluateExternalPayload(jsFiles) {`, `\nexport function evaluateExternalPayload(root, jsFiles) {`, `${M}/external-payload.mjs`);
external = expFn(external, ["externalPayloadSelfTest"], `${M}/external-payload.mjs`);
emit("external-payload.mjs", `// external-payload.mjs — an externalized peer must ship as an import in dist, never
// inlined; the detector proves its own bite on every run.`, external);

// ---- drift.mjs: the D5 statements become evaluateDrift's body
const run = s.takeRun("DRIFT_CEIL", /^for \(const \[name, cur\] of currentEntries\)/);
const cut = run.indexOf("\nconst subpathReport = [];");
if (cut < 0) throw new Error(`${SRC}: drift body not found`);
const n = run.split("anyBudgetExceeded = true;").length - 1;
if (n !== 2) throw new Error(`${SRC}: drift sets anyBudgetExceeded ${n} times, expected 2`);
const consts = exp(run.slice(0, cut), ["MIN_GATED_GZIP"], `${M}/drift.mjs`);
const body = run.slice(cut + 1).split("anyBudgetExceeded = true;").join("exceeded = true;");
const indent = (t) => t.split("\n").map((l) => (l ? `    ${l}` : l)).join("\n");
emit("drift.mjs", `// drift.mjs — D5: every published entry chunk's gzip drift against the committed baseline.`, `${consts}

export function evaluateDrift(subpathEntries, baselinePath) {
    let exceeded = false;
${indent(body)}
    return { subpathReport, exceeded };
}
`);

// ---- the door
const DOOR = [
    ["./budgets.mjs", ["BUDGETS", "combinedStylesDraw"]],
    ["./critical-path.mjs", ["evaluateCriticalPath"]],
    ["./drift.mjs", ["evaluateDrift", "MIN_GATED_GZIP"]],
    ["./external-payload.mjs", ["evaluateExternalPayload", "externalPayloadSelfTest"]],
    ["./files.mjs", ["distName", "walk"]],
    ["./value-capabilities.mjs", ["evaluateValueCapabilities"]],
];
write(root, `${M}/index.mjs`, `// bundle-checks/ — what scripts/profile-bundle.mjs judges on a built dist: the ceilings,
// D5 drift, the Value capabilities, the critical path and the external payload.
${DOOR.map(([f, ns]) => `export { ${ns.join(", ")} } from "${f}";`).join("\n")}
`);

// ---- the program: its imports computed from what it still reads, plus the door
for (const i of NODE) s.take(`import:${i.spec}`);
let prog = s.rest(new Map([["DRIFT_CEIL", `

// D5 — per-subpath drift against the committed baseline (bundle-checks/drift.mjs).
const drift = evaluateDrift(subpathEntries, baselinePath);
const subpathReport = drift.subpathReport;
if (drift.exceeded) anyBudgetExceeded = true;`]]));
prog = sub(prog, `const valueCapabilities = evaluateValueCapabilities();`, `const valueCapabilities = evaluateValueCapabilities(root);`, SRC);
prog = sub(prog, `const externalPayload = evaluateExternalPayload(externalPayloadJs);`, `const externalPayload = evaluateExternalPayload(root, externalPayloadJs);`, SRC);
const door = sibling("./bundle-checks/index.mjs", DOOR.flatMap(([, ns]) => ns).sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })));
const imports = importLines(root, prog, [...NODE, door]);
write(root, SRC, `${imports.join("\n")}\n\n${trimLead(prog)}`);
console.log(`split ${SRC}: ${M}/{budgets,files,value-capabilities,critical-path,external-payload,drift,index}.mjs`);
