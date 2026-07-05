#!/usr/bin/env node
// proof-aurora-glsl-webkit.mjs — the WebKit-strictness GLSL smoke over the aurora shader corpus
// (VALUEJS-S L1, 2026-07-05). ANGLE (Chrome) tolerates two GLSL sins WebKit's compiler REJECTS, so
// a shader that renders on Chrome silently falls back to CSS on every Safari user's screen:
//   W1  a GLSL RESERVED KEYWORD used as an identifier (the L1a `flat` local — flat/smooth/
//       noperspective/centroid/patch/sample/subroutine are interpolation/reserved qualifiers).
//   W2  a function whose FORWARD-DECLARATION return type disagrees with its DEFINITION (the L1b
//       `vec3 structureTensorField(...)` prototype vs the `vec4` body — a signature mismatch).
// Device-free source scan over src/components/custom/aurora/**/*.glsl.ts (the assembled fragment
// corpus). Born-RED on the pre-fix tree; the binding live proof is the aurora paint re-verify on
// real WebKit26 (the C-SAFARI dual-engine gate) — this is the cheap CI floor that stops the
// regression BEFORE the paint gate has to catch it.

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GLSL_DIR = path.join(REPO, "src/components/custom/aurora/constants/shaders");

// GLSL reserved words that are NOT valid identifiers (interpolation + reserved qualifiers + a few
// type/flow keywords that read as plausible locals). Kept to the ones a human would actually type
// as a variable — the full reserved list would false-positive on substrings.
const RESERVED_AS_IDENT = [
  "flat", "smooth", "noperspective", "centroid", "sample", "patch", "subroutine",
  "coherent", "volatile", "restrict", "readonly", "writeonly", "precise", "invariant",
];

function glslFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (statSync(p).isDirectory()) out.push(...glslFiles(p));
    else if (e.endsWith(".glsl.ts")) out.push(p);
  }
  return out;
}

// detect a declaration `<type> <RESERVED>` (a local/param named with a reserved word)
function reservedIdentViolations(src, file) {
  const v = [];
  const typeRe = "(?:float|int|uint|bool|void|vec[234]|ivec[234]|uvec[234]|bvec[234]|mat[234]|mat[234]x[234]|sampler\\w+)";
  for (const kw of RESERVED_AS_IDENT) {
    const re = new RegExp(`\\b${typeRe}\\s+${kw}\\b\\s*(?:=|;|\\)|,)`, "g");
    let m;
    while ((m = re.exec(src))) {
      const line = src.slice(0, m.index).split("\n").length;
      v.push(`${path.basename(file)}:${line} — reserved keyword '${kw}' used as an identifier (WebKit rejects)`);
    }
  }
  return v;
}

// collect `<ret> name(args);` prototypes and `<ret> name(args) {` definitions; flag return-type disagreement
function returnTypeMismatches(allSrc) {
  const sigRe = /\b(vec[234]|float|int|uint|bool|void|mat[234])\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*([;{])/g;
  const proto = new Map(); // name -> ret (from a `;` decl)
  const defn = new Map(); //  name -> ret (from a `{` body)
  let m;
  while ((m = sigRe.exec(allSrc))) {
    const [, ret, name, , term] = m;
    if (name === "main") continue;
    (term === ";" ? proto : defn).set(name, ret);
  }
  const v = [];
  for (const [name, pret] of proto) {
    const dret = defn.get(name);
    if (dret && dret !== pret) v.push(`${name}: forward-decl returns ${pret} but definition returns ${dret} (WebKit rejects the signature mismatch)`);
  }
  return v;
}

function scan() {
  const files = glslFiles(GLSL_DIR);
  const reserved = [];
  let combined = "";
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    reserved.push(...reservedIdentViolations(src, f));
    combined += "\n" + src;
  }
  const mismatches = returnTypeMismatches(combined);
  return { files: files.length, reserved, mismatches };
}

function selfTest() {
  // W1 bite: `vec3 flat = ...` MUST flag
  const bite1 = reservedIdentViolations("vec3 flat = mix(a, b, 0.5);", "synthetic");
  // W2 bite: prototype/definition return mismatch MUST flag
  const bite2 = returnTypeMismatches("vec3 fooField(vec2 p);\nvec4 fooField(vec2 p) { return vec4(0.0); }");
  // negative: a correctly-named local + consistent sig must NOT flag
  const neg1 = reservedIdentViolations("vec3 flatCol = mix(a, b, 0.5);", "synthetic");
  const neg2 = returnTypeMismatches("vec4 barField(vec2 p);\nvec4 barField(vec2 p) { return vec4(0.0); }");
  return {
    ok: bite1.length === 1 && bite2.length === 1 && neg1.length === 0 && neg2.length === 0,
    detail: `W1-bite=${bite1.length} W2-bite=${bite2.length} neg1=${neg1.length} neg2=${neg2.length}`,
  };
}

const { files, reserved, mismatches } = scan();
const st = selfTest();
const violations = [...reserved, ...mismatches];
const pass = violations.length === 0 && st.ok;

console.log(`proof:aurora-glsl-webkit — the WebKit GLSL strictness smoke (VALUEJS-S L1)`);
console.log(`  aurora .glsl.ts files scanned : ${files}`);
console.log(`  W1 reserved-keyword idents    : ${reserved.length}`);
console.log(`  W2 return-type mismatches     : ${mismatches.length}`);
console.log(`  self-test (bite proof)        : ${st.ok ? "OK" : "FAIL"} — ${st.detail}`);
if (violations.length) violations.forEach((x) => console.log(`    ✗ ${x}`));
console.log(`\n  status: ${pass ? "PASS" : "FAIL"}`);
process.exit(pass ? 0 : 1);
