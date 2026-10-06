# W-C.3 · W-DOC-TRUTH: docs name only what the source carries; value tables are generated · 11.0.0

| field | value |
|---|---|
| seat | band-C wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `26d193b7` in a scratch worktree, with `dist/` built there. `git diff --stat v10.1.0 HEAD -- src` prints nothing |
| ships in | 11.0.0 |
| families | F-63 remainder (`audit/REGISTRY.md:1360-1372`). O-79 (1) and (2) are W-0.5's; this wave's invariants then cover those rows |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L09-01, L01a-26, L09-18 | README and canon import examples name a retired subpath (`./forms`), a missing subpath (`./instrument-chassis`) and missing symbols (`useKeyboardShortcuts`, `CardTier`); JSDoc on exported APIs names files and symbols that do not exist |
| L09-02, L09-05, L09-06, L04-F12 | README, DESIGN and canon name token families that do not exist (`--glass-opacity-*`, four retired springs, `--z-hovercard`, `--z-debug`) and print stale values (the z-index table wrong since 2026-05-02; glass tier blur radii) |
| L09-04, L05b-11, L15a-F11 | the dock README documents 13 props, 8 of them not props, and omits `collapse` |
| L09-07, C-17 | two divergent copies of the design canon (`docs/design/` and the `docs/precepts` submodule); 23 live lines cite the submodule copies |
| L09-11, L13-16 | the canon contradicts the scripts (ports, CI order, `profile:bundle` wording, `scripts/lib/canon-doc.mjs` described as a seam with no importer, `./styles/critical`, CVA/shadcn), and `vitest.config.ts:9-11` / `scripts/lib/subpath-policy.mjs:6-8` narrate mechanisms that are gone |
| L09-13 | `docs/consumer-evidence/` self-declared unenforced: 59 dead cites in 23 of 25 docs, a re-booked chronic |
| L09-15 | CHANGELOG misses published versions and carries non-version headings |
| L06-06, L01b-61 | MIGRATION's successor cells name removed subpaths or symbols that never existed; two contradictory `card-scroll-host` instructions |
| L03a-15, R3-01-14, R2-06-14 | demo copy that is false against HEAD (the blob blurb says WebGL2, the carousel promises mouse drag, `BottomDock.vue:11` describes a retired red pill) |
| inbound | UIA-V-522, UIA-KF-258, UIA-V-54, UIA-V-457, UIA-KF-058, UIA-F-123, UIA-V-326, UIA-V-545, UIA-V-581, UIA-V-583, UIA-KF-128, UIA-V-550, UIA-KF-322, UIA-F-223, UIA-F-228, UIA-V-410 (`audit/INBOUND-MAP.md:179,184,255,263,282,288,292,471-480`): the doc half of each |

Not here: L15a-F8 and L11-07 (the `resolveTokenColor` return contract, O-30) are cured by W-C.5's one colour leaf, whose gate makes the docblock true. The dialog's reading of `--radius-3xl` (24 px) where the role table names `--radius-dialog` (16 px) is a paint and role defect (W-E.8's off-role readers, W-E.2's lost `.glass-floating` rule); this wave makes the doc print the source, so the doc half of the six dialog-radius UIA rows closes here and the paint half stays with those waves.

## 2 · The defect at HEAD

Measured in the scratch worktree at `26d193b7` with the appendix-A detector (`node doc-truth.mjs . --arm <S|T|TJ> --list`) over 46 docs (README, DESIGN, CONTRIBUTING, `docs/{canon,design,instructions,audits}/*.md`, the 24 `src/**/*.md`) and 628 `src` files.

- **Surface (arm S): 32 misses in 10 files.** 12 subpaths (`README.md:21,132` and `DESIGN.md:1573` `@mkbabb/glass-ui/forms`; `README.md:140` `/instrument-chassis`; `README.md:149` `/composables/dark`; `DESIGN.md:1765` `/paper-backdrop`; `docs/canon/exports-and-subpaths.md:5,38` and `docs/design/design-idioms.md:467` `/api`; the JSDoc heads `src/composables/dark/darkModeSyncScript.ts:1`, `useGlobalDark.ts:1`, `keyboard/useKeyboardShortcuts.ts:1`), 3 symbols (`README.md:19,130` `useKeyboardShortcuts from …/keyboard`, `README.md:33` `CardTier from …/card`, resolved against `dist/keyboard.d.ts` and `dist/card.d.ts` with the TypeScript checker), and 17 repo paths a doc cites that do not exist (e.g. `DESIGN.md:179` `src/components/handmark/texture.ts`, `:1038` `src/components/toggle-group/toggleGroupContext.ts`, `:1447-1448` two demo story files). Paths into the `docs/precepts` gitlink are not counted here (a sibling tree, P-7); C-17's gate below covers them.
- **Tokens (arm T): 200 misses in 13 docs; 232 with JSDoc and comments (arm TJ, 40 files).** DESIGN.md 143, `docs/design/design-idioms.md` 16, `tunable-anim.md` 12, `docs/canon/glass-system.md` 11, `affordance-map.md` 8, `music-staff/README.md` 6, `motion-canon.md` 5, `docs/audits/style-audit.md` 5, `README.md` 4. Most frequent: `--spring-smooth` 15, `--spring-snappy` 14, `--spring-bouncy` 8, `--font-brand-sans` 8, `--glass-highlight` 5, `--glass-bg` 5, `--z-hovercard` 3, `--glass-opacity-resting` 2, `--z-debug` 1. A token counts as existing when it is declared, registered, read (`var(--x`) or set from TS in `src` (L09-19's rule). W-B.11 measured DESIGN.md against declarations only and read 105 of 324 unresolved (`waves/W-B.11.md:21`); both readings are the same defect.
- **Values are wrong where names exist.** `DESIGN.md:336-355` gives `--z-tooltip` 60 against `scheme-motion.css:210` 120 (and `--z-hovercard` 60, `--z-debug` 99999, which do not exist; the consumer UIA-V-54 relied on `--z-debug`); the glass tier blur table gives 1/3/12/16/24 px against `tokens/glass.css:69-73` 10/14/16/20/22 px. An existence check cannot see these; a generated table can.
- **The canon has two homes.** `diff docs/design/<f>.md docs/precepts/<f>.md` (main checkout, submodule at `b0f6134` 2026-07-17) → 10, 76, 63, 64 differing lines for `affordance-map`, `design-idioms`, `motion-canon`, `tunable-anim`. `rg -n "docs/precepts/(affordance-map|design-idioms|motion-canon|tunable-anim)\.md"` over live files → **23** lines (17 `src` comments citing `design-idioms.md §cohesion-aware partials`, CONTRIBUTING, `docs/canon/motion-system.md:5`, `tabs/README.md:97`). The section they cite exists in `docs/design/design-idioms.md:161`.
- **The consumer-evidence corpus.** `ls docs/consumer-evidence | wc -l` → 25; its README says the forcing rule has no enforcer (L09-13); 7 live lines cite the corpus (`rg -n consumer-evidence src README.md DESIGN.md CONTRIBUTING.md docs/canon docs/audits docs/instructions`), among them `src/components/aurora/composables/textureUpload.ts:14` citing a file that does not exist, and `docs/audits/overfitting-audit.md`'s keep-current clause.
- **CHANGELOG.** Against `npm view @mkbabb/glass-ui versions` (35 versions), 16 have no bare `## X.Y.Z` heading (L09-15 counts 11; the other five have headings of the form `2.0.0—title`), and 3 headings are not versions (`CHANGELOG.md:1034` `AL.W4 Lane D—2026-05-26—…`, `:1045`, `:1083`).
- **MIGRATION successors.** `MIGRATION.md:2545-2569` folds `MultiSelect` onto `<Combobox multiple>`, and `src/index.ts:235-238` says there has never been a `<Combobox>` component; `:2533` sends ContextMenu to `./dropdown-menu`, which 8.0.0 removed (`:745`). `:2619` and `:1459-1470` give opposite `card-scroll-host` instructions (L01b-61).
- **Canon claims against scripts.** `docs/canon/build-and-gates.md:12` `npm run demo:serve # … :5199` against `package.json` `demo:serve: vite --host localhost --port 5400`; `:16-17` "CI runs those same three commands in that order" against `ci.yml`'s four steps and a second job; `docs/canon/README.md:9` calls `scripts/lib/canon-doc.mjs` the resolver the primitives generator uses, and `rg -l canon-doc scripts src tests demo` finds only the file itself.
- **Demo copy.** `demo/stories/manifest.ts:466` "WebGL2 metaball droplet" while the blob's renderer badge reads WebGPU (L03a-15); `manifest.ts:743` promises "Drag and keyboard navigation" and a mouse drag leaves `scrollLeft` at 0 (R3-01-14).

## 3 · The cure

1. **Two invariants, in the suite.** `tests/gates/doc-truth.test.ts` runs appendix A's two arms over README, DESIGN, CONTRIBUTING, `docs/{canon,design,instructions,audits}`, component READMEs and `src` comments, against `package.json` `exports` and the built `dist/*.d.ts` (arm S), and against declarations, registrations, reads and TS-set names in `src` plus the declarations in the built `dist/**/*.css` (arm T, so a token the build emits from TS resolves, as W-B.11 asks). Arm S also checks that every repo path a doc cites exists and every `npm run <x>` names a script. Classes it does not check are stated in the file: paths inside a gitlink (a sibling tree), and names a dependency owns (`--reka-*`, `--tw-*`, Tailwind's theme). Each arm is a roster entry (G-58 DOC-SURFACE, G-59 DOC-TOKENS; these are the `G-DOC-TRUTH` pair W-A.2 left to this wave, `waves/W-A.2.md:199`), each with a bite patch. The six table-scoped doc tests (L09-19: the doc-reading arms of `radius-role-canon`, `plate-register`, `token-bridges`, `drive-tokens`; `status-dot.contract`'s MIGRATION read; `consumer-paths-exist`) lose the doc-reading arms these invariants and step 2 replace. `consumer-paths-exist` keeps its roster check, which is P-6's.
2. **Value tables are generated.** `scripts/regen-docs.mjs` writes each value table between `<!-- generated:<name> -->` and `<!-- /generated -->` markers, from its source of record: the z-index, duration, shadow, radius-role and glass-tier tables in DESIGN.md from the built `dist/styles` custom properties; the spring table from `springPresets.ts` (the same table `regen-spring-tokens.mjs` reads); README's subpath list from `package.json` `exports`; `docs/canon/build-and-gates.md`'s command list and CI steps from `package.json` `scripts` and `.github/workflows/*.yml`; each component README's props table from the component's declared props in `dist/**/*.vue.d.ts` (name, type, the JSDoc line). `regen-docs.mjs --check` exits 1 when any block differs from what it would write; it runs in the suite. Prose outside the markers is checked by step 1 and is never generated. DESIGN.md's material section is rewritten from D3's converged ladder in W-H.1 and W-H.2 (W-B.11 §3.2); its tables land under this generator. Every later wave that edits `package.json` `scripts` or a workflow file runs `node scripts/regen-docs.mjs` in the same commit; this item is the one record of that duty, and C3-G3's `--check`, which runs in the suite, fails a wave that skips it (fix-9, pass 8's note on W-A.6, W-E.1, W-K.1, W-L.2 and W-L.3).
3. **The sweep.** Every arm-S and arm-T miss is fixed in its doc by the rule: the doc names what the source carries. A retired surface is not described in a live doc (the retirement is MIGRATION's row); an example imports from the subpath that exports the symbol; a token table cites the token the rule reads. Placeholders in examples are written `--<name>`, which the detector reads as a placeholder. JSDoc heads name the published subpath (`@mkbabb/glass-ui/dark`, not `/composables/dark`). `src/styles/tokens.ts:23-24` names the tokens `chartColors` actually matches.
4. **One home for the design canon (C-17, L09-07).** `docs/design/` is glass-ui's home (`docs/canon/README.md:28-30` already says so). The 23 live cites of the submodule's four duplicated files re-point to `docs/design/`. The `docs/precepts` submodule stays for the cross-repo precepts it carries (`cross-repo-dev-resolution.md`, `cross-repo-dev-iteration.md`, `canonical-readme-shape.md`, `instructions/`); its copies of the four glass-ui design files are the precepts repo's to delete. A letter goes to precepts saying glass-ui no longer reads them (P-7: glass seats do not edit a sibling tree). C-17 is thereby RETIRED on glass-ui's side, not re-booked: the precepts copy has no reader here.
5. **The consumer-evidence corpus retires (L09-13).** `docs/consumer-evidence/` is deleted. Consumer truth is read from consumers' import graphs (W-L.6's P-6 census and W-L.7's packets), so a hand-kept corpus per artefact is a second record of the same fact. `docs/audits/overfitting-audit.md`'s keep-current clause cites the import graph instead; `textureUpload.ts:14` loses its dead cite. This is the decided row for the chronic N-2 calls a disease row: RETIRE, with the successor mechanism named.
6. **CHANGELOG.** Every published version has a `## X.Y.Z` heading (the eleven missing entries are written from `git log v<prev>..v<X>`, one plain line per change); headings are versions only. `tests/gates/changelog-coverage.test.ts` checks it against a published-versions fixture refreshed at each cut.
7. **MIGRATION successors close (arm M).** Every `after` cell in W-C.2's table form names a subpath or symbol that exists at HEAD, or one that a later section's `before` column retires (so a reader can follow the chain to HEAD). Appendix A gains arm M for this when W-C.2's form lands. The `Combobox multiple` and `./dropdown-menu` successors are rewritten to their HEAD successors; the two `card-scroll-host` instructions become one.
8. **Canon claims and narration.** `build-and-gates.md`'s commands come from step 2's generated block. `scripts/lib/canon-doc.mjs` is deleted (no importer; an E-7 orphan) and its canon line goes. `vitest.config.ts`'s inert `"development"` condition and its narration (`:7-9`, L13-16: neither keyframes.js copy declares the condition) are W-D.2's, which removes them under its DEAD-CONDITION arm (W-D.2 §3 item 5, D2-G1) after this wave (PLAN §5); one remover, so D2-G1's arm does not enter W-D.2 green (fix-8, FG-03's class); `subpath-policy.mjs:6-8`'s count of a directory that does not exist goes.
9. **Demo copy.** The blob blurb names WebGPU; the carousel blurb names what works at HEAD (keyboard and touch swipe); `BottomDock.vue:11` describes the neutral accent. A later wave that adds a mouse drag edits the blurb in its own commit.

## 4 · Files it touches

- `README.md`, `DESIGN.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `MIGRATION.md` (successor cells), `docs/canon/*.md`, `docs/design/*.md`, `docs/instructions/README.md`, `docs/audits/overfitting-audit.md`, the 24 `src/**/*.md`, JSDoc and comments in the `src` files arm TJ lists (40 at HEAD), `demo/stories/manifest.ts:466,743`, `demo/shell/BottomDock.vue:11`, `scripts/lib/subpath-policy.mjs` (before W-D.1 deletes it, PLAN §5).
- Deleted: `docs/consumer-evidence/` (25 files), `scripts/lib/canon-doc.mjs`.
- New: `tests/gates/doc-truth.test.ts`, `tests/gates/changelog-coverage.test.ts`, `scripts/regen-docs.mjs`, the `<!-- generated -->` markers. Edited: the six table-scoped doc tests (step 1).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| C3-G1 · every named surface exists | `npm run build && node <appendix A> . --arm S` | exit 0 | **exit 1**: `S misses 32 · files 10` (12 subpath, 3 symbol, 17 path) |
| C3-G2 · every named token exists | `node <appendix A> . --arm TJ` | exit 0 | **exit 1**: `T misses 232 · files 40` (200 in docs, 32 in `src` comments) |
| C3-G3 · value tables are what the source says | `node scripts/regen-docs.mjs --check` | exit 0 | **exit 1**: the script does not exist; the stale values it would rewrite are in §2 (z-index, glass tiers, springs, the dock props table) |
| C3-G4 · one home for the design canon (C-17) | `! rg -n "docs/precepts/(affordance-map\|design-idioms\|motion-canon\|tunable-anim)\.md" --glob '!docs/tranches/**' --glob '!docs/archive/**' .` | exit 0 | **exit 1**: 23 lines |
| C3-G5 · the consumer-evidence corpus is retired | `test ! -e docs/consumer-evidence && ! rg -q consumer-evidence src README.md DESIGN.md CONTRIBUTING.md docs/canon docs/audits docs/instructions` | exit 0 | **exit 1**: 25 files; 7 live cites |
| C3-G6 · every published version has a CHANGELOG entry | `tests/gates/changelog-coverage.test.ts` (headings `## X.Y.Z` only; every version in the fixture present) | pass | **fail**: 16 versions without a bare heading, 3 non-version headings |
| C3-G7 · MIGRATION successors reach HEAD (arm M) | `node <appendix A> . --arm M` on W-C.2's table form | exit 0 | **fail**: the table form is absent (W-C.2's C2-G4 reads `33 headings · 26 misses`), and the two dead successors of §2 (`Combobox multiple`, `./dropdown-menu`) are present at `MIGRATION.md:2545,2533` |
| C3-G8 · no orphan canon seam | `test ! -e scripts/lib/canon-doc.mjs` | exit 0 | **exit 1** |

Can each fail and pass? C3-G1 and C3-G2: 29 of the 46 docs read clean at HEAD, so both arms can pass. Appending to a clean doc (`docs/canon/build-and-gates.md`) one sentence naming `--glass-opacity-quiet` and a fenced `import { Button, Combobox } from "@mkbabb/glass-ui/button"` gives `T token … :41 --glass-opacity-quiet` and `S symbol … :44 Combobox from @mkbabb/glass-ui/button`, run here and restored (`git status --porcelain docs` empty after). C3-G3 bites when one generated cell is hand-edited. The weakness C3-G1/G2 alone would leave (a doc that names only real tokens with wrong values) is C3-G3's.

## 6 · π and DELTA obligations

No visual claim. The wave edits docs, comments, demo copy strings and test files; it changes no stylesheet or component. The evidence that no paint moved is W-C.2's C2-G8 method applied here: every `dist/**/*.css` and `dist/**/*.js` sha equal between `<C3-base>` and the wave build (the demo's `dist-demo` differs only in the two copy strings of step 9, shown by a `diff` of the built manifest chunk in the wave record).

## 7 · MIGRATION rows

None. Docs, the retired corpus and the deleted `canon-doc.mjs` are not published (`package.json` `files`: `dist`, `MIGRATION.md`).

## 8 · Ledger rows

Closes #61 W-DOC-TRUTH (`census-register-b.md:51`); #26's RT-26C, the canon teaching deleted springs (`census-register-a.md:38`); #78's derivation half, folded here by W-B.11 (`census-register-b.md:64`); #90's "canon LAND to #78" residue; the F-63 items the census routes here (`ledger/CENSUS.md:135`): #29 RT-29B's canon figure, #31 RT-31D, #38 RT-38E and RT-38G, #51's evidence doc (retired with the corpus), #76's 18 consumer-evidence docs with dead cites (retired); C-17 (`census-carries-recap.md:44`, RETIRED on glass-ui's side with a relay letter to precepts); the doc half of the 16 UIA rows of §1; B11-G2 (bound here). #7's F-63 cite is W-C.2's (the `proof:` cite class).

## 9 · Gestalt passes (P-1)

Tranche fit (the generator follows the one `regen-spring-tokens.mjs` pattern; no second doc system), wave (C3-G1 to C3-G8 green in one run on the wave's HEAD), feature (a consumer copying the README's first example and the token override block into a fresh Vite app builds, and the override changes paint: checked in W-L.3's consumer matrix, which reads the README recipe).

## Appendix A · the doc-truth detector (prototype run at this seat; arm M is added when W-C.2's table form lands)

```js
// W-C.3 prototype: the two doc-truth invariants, run from a repo root with dist/ built.
//   S (surface): every `@mkbabb/glass-ui[/sub]` a doc or a src comment names is an export key,
//     and every name a fenced `import { … } from "@mkbabb/glass-ui[/sub]"` imports is exported by
//     that entry's built declarations (resolved with the TypeScript checker).
//   T (tokens): every `--token` a doc names is declared, registered or set in src/ (CSS `--x:`,
//     `@property --x`, or a "--x" string literal in .ts/.vue), or sits in a pattern the doc marks
//     as one (`--x-*`, `--x-{a,b}`, `--x-<n>`).
//   T counts a read (`var(--x`) as existence, per L09-19; whether a read-only knob should exist is W-C.4's.
// Docs: README, DESIGN, CONTRIBUTING, docs/{canon,design,instructions,audits}, src/**/*.md.
// Usage: node doc-truth.mjs [root] [--arm S|T] [--list]. Exit 1 on any miss.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const root = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : ".");
const arm = (process.argv.indexOf("--arm") > -1) ? process.argv[process.argv.indexOf("--arm") + 1] : "ST";
const list = process.argv.includes("--list");
const require = createRequire(path.join(root, "package.json"));
const ts = require("typescript");
const git = (...a) => execFileSync("git", a, { cwd: root, encoding: "utf8", maxBuffer: 1 << 28 }).split("\n").filter(Boolean);
const tracked = git("ls-files");
const DOCS = tracked.filter((f) => /^(README|DESIGN|CONTRIBUTING)\.md$/.test(f) || /^docs\/(canon|design|instructions|audits)\/[^/]+\.md$/.test(f) || /^src\/.*\.md$/.test(f));
const SRC = tracked.filter((f) => /^src\/.*\.(ts|vue|css|mjs)$/.test(f));
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const keys = new Set(Object.keys(pkg.exports).map((k) => (k === "." ? "" : k.slice(1))));
const fails = [];
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const lineOf = (s, i) => s.slice(0, i).split("\n").length;

// ---- S: subpaths and symbols
if (arm.includes("S")) {
  const program = new Map();
  const exportsOf = (sub) => {
    if (program.has(sub)) return program.get(sub);
    const entry = pkg.exports[sub === "" ? "." : "." + sub];
    const types = entry && typeof entry === "object" ? entry.types : null;
    let names = null;
    if (types && fs.existsSync(path.join(root, types))) {
      const p = ts.createProgram([path.join(root, types)], { skipLibCheck: true, noEmit: true, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext, allowJs: false });
      const c = p.getTypeChecker(); const sf = p.getSourceFile(path.join(root, types));
      const sym = sf && c.getSymbolAtLocation(sf);
      names = new Set(sym ? c.getExportsOfModule(sym).map((s) => s.getName()) : []);
    }
    program.set(sub, names); return names;
  };
  const subRe = /@mkbabb\/glass-ui((?:\/[A-Za-z0-9_.*-]+)*)/g;
  const scan = (f, text, commentsOnly) => {
    for (const m of text.matchAll(subRe)) {
      let sub = m[1].replace(/[.,;:)]+$/, "");
      if (commentsOnly) { const ln = text.slice(text.lastIndexOf("\n", m.index) + 1, m.index); if (!/(\/\/|\/\*|^\s*\*|<!--)/.test(ln)) continue; }
      if (sub === "" || keys.has(sub)) continue;
      if (/node_modules\/$/.test(text.slice(Math.max(0, m.index - 13), m.index))) continue; // a file path, not a subpath
      if ((pkg.files ?? []).includes(sub.split("/")[1])) continue; // a tarball file
      if (/^\/[^/]+$/.test(sub) && keys.has(sub + "/*") && /^\/[<*]/.test(text.slice(m.index + m[0].length))) continue; // a wildcard key
      if (/^\/fonts\//.test(sub) && keys.has("/fonts/*")) continue;
      if (/^\/styles\//.test(sub) && keys.has(sub)) continue;
      fails.push(`S subpath  ${f}:${lineOf(text, m.index)}  @mkbabb/glass-ui${sub}`);
    }
  };
  for (const f of DOCS) {
    const t = read(f); scan(f, t, false);
    for (const fence of t.matchAll(/```[a-z]*\n([\s\S]*?)```/g)) {
      for (const im of fence[1].matchAll(/import\s+(type\s+)?\{([^}]*)\}\s+from\s+["']@mkbabb\/glass-ui((?:\/[A-Za-z0-9_-]+)*)["']/g)) {
        const sub = im[3]; const names = exportsOf(sub);
        if (names === null) continue; // the subpath arm reports it
        for (let n of im[2].split(",")) { n = n.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim(); if (!n) continue;
          if (!names.has(n)) fails.push(`S symbol   ${f}:${lineOf(t, fence.index + fence[0].indexOf(im[0]))}  ${n} from @mkbabb/glass-ui${sub}`); }
      }
    }
  }
  for (const f of SRC) scan(f, read(f), true);
  // repo paths and npm scripts a doc cites must exist
  const gitlinks = execFileSync("git", ["ls-files", "-s"], { cwd: root, encoding: "utf8", maxBuffer: 1 << 28 }).split("\n").filter((l) => l.startsWith("160000")).map((l) => l.split("\t")[1]);
  const all = new Set(tracked); const dirs = new Set(); for (const f of tracked) { const parts = f.split("/"); for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join("/")); }
  for (const f of DOCS) {
    const t = read(f);
    for (const m of t.matchAll(/`((?:src|scripts|tests|tests-visual|demo|docs)\/[A-Za-z0-9_./@-]+?)(?::[0-9,-]+)?`/g)) {
      const p = m[1].replace(/\/$/, "");
      if (/[*<{]/.test(p)) continue;
      if (gitlinks.some((g) => p === g || p.startsWith(g + "/"))) continue; // a sibling tree (P-7); C-17's own gate covers the duplicated canon
      if (all.has(p) || dirs.has(p)) continue;
      fails.push(`S path     ${f}:${lineOf(t, m.index)}  ${p}`);
    }
    for (const m of t.matchAll(/npm run ([a-z0-9:_-]+)/g)) if (!(m[1] in (pkg.scripts ?? {}))) fails.push(`S script   ${f}:${lineOf(t, m.index)}  npm run ${m[1]}`);
  }
}

// ---- T: tokens
if (arm.includes("T")) {
  const declared = new Set();
  for (const f of SRC) {
    const t = read(f);
    for (const m of t.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) declared.add(m[1]);
    for (const m of t.matchAll(/@property\s+(--[A-Za-z0-9_-]+)/g)) declared.add(m[1]);
    for (const m of t.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) declared.add(m[1]);
    if (/\.(ts|vue|mjs)$/.test(f)) for (const m of t.matchAll(/["'`](--[A-Za-z0-9_-]+)["'`]/g)) declared.add(m[1]);
    if (/\.(ts|vue|mjs)$/.test(f)) for (const m of t.matchAll(/["'`](--[A-Za-z0-9_-]+-)\$\{/g)) declared.add(m[1] + "*");
  }
  const prefixDeclared = (p) => [...declared].some((d) => d.startsWith(p));
  for (const f of DOCS) {
    const t = read(f);
    for (const m of t.matchAll(/(?<![A-Za-z0-9_-])(--[a-z][a-z0-9-]*[a-z0-9])(\*|-\*|-\{|-<|\{)?/g)) {
      const name = m[1]; const pat = m[2];
      if (declared.has(name)) continue;
      if (pat && prefixDeclared(name)) continue;
      if (/^--(no|with|run|ignore|access|provenance|project|config|arm|list|enforce|rebaseline|force|host|port|save|dry|out|reporter|grep|update|workspace|run-in-band|max|verbose|help|version|noEmit|watch|dir)/.test(name) && /`[^`\n]*npm|npx|node|git|vite|--/.test(t.slice(Math.max(0, m.index - 60), m.index + 30))) continue; // CLI flags inside a shell line
      fails.push(`T token    ${f}:${lineOf(t, m.index)}  ${name}`);
    }
  }
}

// T over src comments (JSDoc and block comments): a token a comment names must exist as well.
if (arm.includes("T") && arm.includes("J")) {
  const declared2 = new Set();
  for (const f of SRC) { const t = read(f); for (const m of t.matchAll(/(--[A-Za-z0-9_-]+)\s*:|@property\s+(--[A-Za-z0-9_-]+)|var\(\s*(--[A-Za-z0-9_-]+)|["'`](--[A-Za-z0-9_-]+)["'`]/g)) declared2.add(m[1] ?? m[2] ?? m[3] ?? m[4]); }
  for (const f of SRC) { const t = read(f);
    for (const c of t.matchAll(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g)) for (const m of c[0].matchAll(/(?<![A-Za-z0-9_-])(--[a-z][a-z0-9-]*[a-z0-9])(\*|-\*|-\{|-<|\{)?/g)) {
      if (declared2.has(m[1]) || (m[2] && [...declared2].some((d) => d.startsWith(m[1])))) continue;
      fails.push(`T comment  ${f}:${lineOf(t, c.index + m.index)}  ${m[1]}`); } }
}
const byArm = { S: fails.filter((x) => x.startsWith("S")).length, T: fails.filter((x) => x.startsWith("T")).length };
if (list) console.log(fails.join("\n"));
const files = new Set(fails.map((x) => x.split(/\s+/)[2].split(":")[0]));
console.log(`doc-truth: docs ${DOCS.length} · src files ${SRC.length} · S misses ${byArm.S} · T misses ${byArm.T} · files ${files.size}`);
process.exitCode = fails.length ? 1 : 0;
```

The prototype's `T comment` arm reads dependency-owned names (`--reka-tabs-indicator` in `dock/DockLayerGroup.vue:38`) and CLI flags in comments (`--use-gl` in `aurora/composables/auroraFallbackGround.ts:6`) as misses; the wave's test exempts those two classes by rule (§3.1), so its HEAD count will be slightly under 32.
