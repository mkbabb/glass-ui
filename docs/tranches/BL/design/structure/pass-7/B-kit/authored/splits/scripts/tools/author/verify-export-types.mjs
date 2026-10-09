#!/usr/bin/env node
// verify-export-types.mjs — derive row 03 (B-S11, zone scripts): scripts/verify-export-types.mjs
// splits into the module scripts/package-verify/ (door index.mjs) and keeps its CLI.
//
//   node verify-export-types.mjs --root <tree>
//
// The CLI (`npm run verify:package`) keeps its header and its one call. The verifier's
// files, by the proof each carries:
//   references.mjs       reading a package: export targets, declaration and CSS references
//   claims.mjs           what package.json claims, and its agreement with the lock root
//   closure.mjs          the declaration closure and the CSS closure the claims reach
//   roster.mjs           the published-name roster and its ratchet
//   pack.mjs             the immutable pack, its tar membership and the byte ratchet
//   install.mjs          the installed consumer: peers, runtime imports, CSS and fonts
//   type-resolution.mjs  the installed consumer's type check in three resolution modes
//   verify.mjs           verifyExportTypes, which runs them in order
// Statements move verbatim. The edits: `export` on the names a sibling reads; verify.mjs
// reads the repository root two levels up instead of one, and states the module's files
// (verifierInputs). Every file's import lines are computed from what it reads (lib.mjs
// importLines). The build's style lifecycle reads the door and watches the files
// verifierInputs names; each public-surface probe loads the file that defines its name.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { filesContaining, importLines, importsOf, openSource, rootArg, sibling, sub, trimLead, write } from "./lib.mjs";

const root = rootArg();
const SRC = "scripts/verify-export-types.mjs";
const M = "scripts/package-verify";
const s = openSource(root, SRC);
const NODE = importsOf(root, s.text);
const header = s.text.slice(0, s.text.search(/^import /m));
if (!header.startsWith("#!/usr/bin/env node\n")) throw new Error(`${SRC}: header not found`);

const exp = (block, names, where) => names.reduce((t, n) => sub(t, `\nconst ${n} =`, `\nexport const ${n} =`, where), `\n${block}`).slice(1);
const expFn = (block, names, where) => names.reduce((t, n) => sub(t, `\nfunction ${n}(`, `\nexport function ${n}(`, where), `\n${block}`).slice(1);
const siblings = [];
const emit = (name, head, body) => {
    const imports = importLines(root, body, [...NODE, ...[...siblings].sort((a, b) => a.spec.localeCompare(b.spec))]);
    write(root, `${M}/${name}`, `${head}\n${imports.join("\n")}\n\n${trimLead(body).replace(/\n*$/, "\n")}`);
};
/** Take `keys`, export `fns` (functions) and `consts`, write the file, and offer every exported name to later siblings. */
const put = (name, head, keys, fns = []) => {
    const t = expFn(s.takeAll(keys), fns, `${M}/${name}`);
    emit(name, head, t);
    siblings.push(sibling(`./${name}`, [...t.matchAll(/^export (?:const|function) (\w+)/gm)].map((m) => m[1])));
};

put("references.mjs",
    `// references.mjs — reading a package's files: export targets, declaration references and
// CSS references, each resolved against the file set the package actually holds.`,
    ["declarationPattern", "cleanReference", "isDeclaration", "isRawCodeSource", "flattenTargets", "listFiles", "targetMatches", "resolveDeclaration", "barePackageRoot", "resolveCssReference"],
    ["cleanReference", "isDeclaration", "isRawCodeSource", "flattenTargets", "listFiles", "targetMatches", "resolveDeclaration", "barePackageRoot", "resolveCssReference"]);

put("claims.mjs",
    `// claims.mjs — what package.json claims (types, exports, typesVersions), the code subpaths
// it publishes, and its root metadata's agreement with the lock.`,
    ["packageRootFields", "packageRootAgreement", "packageClaims", "packageCodeSpecifiers"],
    ["packageClaims", "packageCodeSpecifiers"]);

put("closure.mjs",
    `// closure.mjs — the declaration closure and the CSS closure the package's claims reach;
// every reference resolves, and every bare package it names is owned.`,
    ["validateDeclarations", "validateCss"],
    ["validateDeclarations", "validateCss"]);

put("roster.mjs",
    `// roster.mjs — the published-name roster (\`@theme\` tokens and \`@utility\` names on the
// \`./styles\` closure) and its two-sided ratchet against \`.published-roster\`.`,
    ["stripCssComments", "blockBody", "declaredCustomProperties", "publishedRoster", "rosterDatumLines", "rosterRatchetFailures"]);

put("pack.mjs",
    `// pack.mjs — the immutable pack: the tarball (made or caller-provided), its normalized
// membership, the packed CSS set, and the unpacked-content byte ratchet.`,
    ["canonicalRatchetPattern", "sha256", "createImmutablePack", "normalizeTarMembers", "tarFiles", "packedCssSetFailures", "ratchetEvidence", "unpackedContentBytes"],
    ["sha256", "createImmutablePack", "tarFiles"]);

put("install.mjs",
    `// install.mjs — the installed consumer: the tarball installed with the declared peers and
// nothing else, the peers' ranges, the runtime imports, and the CSS and font files it reaches.`,
    ["versionTuple", "satisfiesPeerRange", "installTarball", "installedEvidence"],
    ["installTarball", "installedEvidence"]);

put("type-resolution.mjs",
    `// type-resolution.mjs — the installed consumer's type check under Bundler, Node16 and
// NodeNext, and the root surface it must match: the source root's named exports.`,
    ["require_", "sourceRootSurface", "compilerOptionsForMode", "installedModuleSurface", "compareRootSurface", "runTypeResolverChecks"],
    ["sourceRootSurface", "runTypeResolverChecks"]);

// ---- verify.mjs: the root now sits two levels up
let verify = s.takeAll(["root", "verifyExportTypes"]);
verify = sub(verify, `new URL("..", import.meta.url)`, `new URL("../..", import.meta.url)`, `${M}/verify.mjs`);
verify = sub(verify, `new URL("../package.json", import.meta.url)`, `new URL("../../package.json", import.meta.url)`, `${M}/verify.mjs`);
verify = sub(verify, `new URL("../package-lock.json", import.meta.url)`, `new URL("../../package-lock.json", import.meta.url)`, `${M}/verify.mjs`);
const FILES = ["claims", "closure", "install", "pack", "references", "roster", "type-resolution", "verify"];
verify += `
/** The verifier's own files. The build's watch list reads them here, so a staged build
 *  re-runs when any of them changes and the build names no file inside this module. */
export function verifierInputs() {
    return [
${FILES.map((n) => `        fileURLToPath(new URL("./${n}.mjs", import.meta.url)),`).join("\n")}
    ];
}
`;
emit("verify.mjs", `// verify.mjs — the single package/declaration/CSS verifier: staged (the build's lifecycle)
// or pack-and-install (the CLI, \`npm run verify:package\`).`, verify);

// ---- the door
write(root, `${M}/index.mjs`, `// package-verify/ — the package verifier (scripts/verify-export-types.mjs is its CLI; the
// build's style lifecycle runs it staged and watches its files).
export { verifierInputs, verifyExportTypes } from "./verify.mjs";
`);

// ---- the CLI: header, its imports (computed), the call
for (const i of NODE) s.take(`import:${i.spec}`);
const body = s.rest();
const cliImports = importLines(root, body, [...NODE, sibling("./package-verify/index.mjs", ["verifierInputs", "verifyExportTypes"])]);
write(root, SRC, `${header}${cliImports.join("\n")}\n\n${trimLead(body)}`);

// ---- readers
const edit = (f, pairs, all = false) => {
    let t = readFileSync(join(root, f), "utf8");
    for (const [from, to] of pairs) {
        if (all) {
            const n = t.split(from).length - 1;
            if (n < 1) throw new Error(`${f}: no match for ${from}`);
            t = t.split(from).join(to);
        } else t = sub(t, from, to, f);
    }
    write(root, f, t);
};
edit("vite.style-assets.ts", [
    [`import { verifyExportTypes } from "./scripts/verify-export-types.mjs";`, `import { verifierInputs, verifyExportTypes } from "./scripts/package-verify/index.mjs";`],
    [`        "scripts/verify-export-types.mjs",\n`, ``],
    [
        `    for (const path of closure.sources) plugin.addWatchFile(path);\n`,
        `    for (const path of verifierInputs() as string[]) plugin.addWatchFile(path);
    for (const path of closure.sources) plugin.addWatchFile(path);\n`,
    ],
]);

// The public-surface probes load the verifier by path in a subprocess (the test seam, LAW
// §5): each probe loads the file that defines the name it imports.
const HOME = { verifyExportTypes: "index.mjs", normalizeTarMembers: "pack.mjs", ratchetEvidence: "pack.mjs", packedCssSetFailures: "pack.mjs", rosterRatchetFailures: "roster.mjs" };
const OLD = `resolve("scripts/verify-export-types.mjs")`;
const PROBES = filesContaining(root, ["tests", "tests-visual"], OLD);
if (!PROBES.length) throw new Error(`${SRC}: no test loads the verifier by path`);
for (const f of PROBES) {
    const parts = readFileSync(join(root, f), "utf8").split(OLD);
    let out = parts[0];
    for (let i = 1; i < parts.length; i++) {
        const m = /^[^\n]*\n(?:[^\n]*\n){0,3}?[^\n]*import \{ (\w+) \} from \$\{JSON\.stringify\(verifier\)\}/.exec(parts[i]);
        if (!m || !HOME[m[1]]) throw new Error(`${f}: probe ${i} imports no known verifier name`);
        out += `resolve("${M}/${HOME[m[1]]}")` + parts[i];
    }
    write(root, f, out);
}
console.log(`split ${SRC}: ${M}/{references,claims,closure,roster,pack,install,type-resolution,verify,index}.mjs; vite.style-assets.ts and ${PROBES.join(", ")} re-pointed`);
