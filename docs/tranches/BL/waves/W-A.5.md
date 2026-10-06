# W-A.5 · W-PAYLOAD-INVARIANT: one CI gate on what a consumer loads, and an exact surface for every subpath · 11.0.0

| field | value |
|---|---|
| seat | band-A wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fabc95e2` in a scratch worktree, `dist/` built there (`vite build`, exit 0, "declaration entries: projected 63 public entries") |
| ships in | 11.0.0 |
| families | F-10 whole (`audit/REGISTRY.md:279-288`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L02-F07 | the public runtime surface is exact for the root and 6 of 63 subpaths |
| L02-F10 | `G-BUNDLE-RATCHET` is an exact-equality literal, rebound 10 times in 7 weeks, run only at tag time |
| L07-04 | the consumer-payload budget is unwired, red at HEAD, and measures CSS one `@import` level deep |
| L14-09 | two bundle authorities; the budget's baseline lives in a closed tranche directory |
| R2-07-09 | the ratchet counts unpacked tarball bytes, 36.3 % of which are `.d.ts` and 12.0 % `MIGRATION.md` |

## 2 · The defect at HEAD

- **The ratchet is an exact literal.** `.bundle-ratchet` reads `2919057` (the 10.1.0 datum). `scripts/verify-export-types.mjs:941-966` fails on any increase and on any shrink ("rebind down deliberately"), so the gate equals one byte count. It counts every file in the tarball, types and prose included (R2-07-09). `grep -rn "G-BUNDLE-RATCHET" scripts tests` gives 6 lines.
- **The budget is red and unwired.** `node scripts/profile-bundle.mjs --skip-build --enforce` exits **1**: 5 FAIL drift rows (`easing.js` +62.8 %, `motion-core.js` +65.4 %, `sortable-list.js` +407.3 %, `chip.js` +63.6 %, `infinite-scroll.js` +15.7 %) and 28 MISSING rows (subpaths the baseline names that no longer exist, for example `liquid-grid.js`, `drawer.js`, `search.js`, `forms.js`). The baseline is `docs/tranches/AP/W4-bundle-profile.baseline.json` (`profile-bundle.mjs:64-66`). No workflow and no release step runs it: `git grep -n profile-bundle -- .github scripts/release.sh` gives nothing, and `CONTRIBUTING.md:29` says "run locally — CI does not run it".
- **The ceilings mean little.** The same report: `dist/glass-ui.js` gzip 5,324 of 33,700 (15.8 %), `dist/styles/index.css` gzip 27,144 of 140,000 (19.4 %), `constellation.js` 56.3 %, `fourier-field.js` 79.7 %, `blob.js` 88.6 %, `aurora.js` 98.2 %. `BUDGETS` (`:255-266`) has no dock entry; the dock appears only as a drift row.
- **The CSS draw is half-measured.** `combinedStylesDraw` (`:285`) resolves `@import` one level (`:290`, "One-level resolve"). A closure reader over `dist/styles/index.css` (appendix A) gives: one level, raw 154,058 B, gzip 27,100 B, **83 `@import` lines left unresolved**; the recursive closure, raw 323,403 B, gzip 56,823 B, over 122 files. The gate measures 0.48 of the draw a consumer's bundler loads.
- **Subpaths are not exact.** Appending `export const probeSubpathLeak = 1;` to `src/components/status-dot/index.ts` and running `npx vitest run tests/public-surface.spec.ts` (with `dist/` built) gives 96 passed: **SURVIVED**. `public-surface.spec.ts:283-` lists runtime names that must be present per subpath; L02 counts 6 of 63 runtime subpaths as exact.

## 3 · The cure

1. **One payload script.** `scripts/payload.mjs` replaces `profile-bundle.mjs` and the ratchet. It builds nothing; it reads `dist/` after `npm run build`. For each gated entry it computes the consumer draw and its gzip size (level 9, Node's `zlib`):
   - root: `dist/glass-ui.js` and every chunk in its static import closure;
   - `./aurora`, `./blob`, `./dock`: each subpath's entry and its static import closure;
   - `./styles`: `dist/styles/index.css` with every `@import` resolved recursively, each file once. An `@import` that does not resolve is an error, not a skip.
2. **Ceilings with bounded headroom.** `scripts/data/payload.json` holds one ceiling per entry, set at the wave's HEAD to the measured gzip × 1.10, rounded up to the next 256 B. The gate fails when a reading exceeds its ceiling, and when a reading is below 0.75 × its ceiling (a ceiling that loose no longer describes the artefact). Moving a ceiling is an edit to that file in a commit whose body gives the before and after readings; there is no rebaseline flag and no drift baseline.
3. **Wired.** `ci.yml`'s `verify` job runs `node scripts/payload.mjs --enforce` after `npm run build`; `release.yml` runs it before `publish`. This wave lands after W-A.3 and before W-D.2 (PLAN §5), and W-D.2 moves the step into `verify.yml` with the rest of the verify job (W-D.2 §3 item 6), so A5-G5 reads the workflow directory, not one file.
4. **Every subpath exact.** `tests/_support/surface.json` records the runtime export names of the root and of every runtime subpath in `package.json` `exports` (the 63 of `dist`'s projection). `tests/public-surface.spec.ts` imports each built subpath and asserts `Object.keys(module).sort()` equals its record, and asserts the record's key set equals the runtime subpaths of `package.json` `exports`, so a new subpath without a record fails. `node scripts/regen-surface.mjs` prints the diff between `dist` and the record for a reviewer; it does not write the record, so the test is not a restatement of the build.
5. **The old authorities go.** Deleted: `.bundle-ratchet`, `ratchetEvidence` and its callers in `verify-export-types.mjs`, `scripts/profile-bundle.mjs`, the `profile:bundle` script, and `CONTRIBUTING.md:29`'s line (replaced by `node scripts/payload.mjs --enforce`). The AP baseline file stays as a record; nothing reads it.

Release note for W-0.7 and W-L.8: 10.2.0 ships before this wave and binds `.bundle-ratchet` as today. From this wave on the release law "the ratchet datum in content bytes" is read as this gate's `--enforce` run on the committed tree; W-L.8's spec cites this gate, not the deleted file.

## 4 · Files it touches

- New: `scripts/payload.mjs`, `scripts/data/payload.json`, `scripts/regen-surface.mjs`, `tests/_support/surface.json`.
- Deleted: `scripts/profile-bundle.mjs`, `.bundle-ratchet`.
- Edited: `scripts/verify-export-types.mjs` (the ratchet removed), `tests/public-surface.spec.ts`, `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `package.json` (`profile:bundle` removed; `files` unchanged), `CONTRIBUTING.md`, `tests/gates/roster.json` (G-01, G-05 turn `bound`).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| A5-G1 · the payload gate is green | `npm run build && node scripts/payload.mjs --enforce` | exit 0 | the script is absent; its predecessor `node scripts/profile-bundle.mjs --skip-build --enforce` gives **exit 1** (5 FAIL, 28 MISSING) |
| A5-G2 · the styles draw is the whole closure | `node scripts/payload.mjs --print styles` reports 0 unresolved imports and a file count equal to appendix A's recursive reader on the same `dist` | both | appendix A at HEAD: **exit 1**, 83 unresolved imports in the gated draw; 122 files in the closure |
| A5-G3 · the four closures are gated | `node -e 'const c=require("./scripts/data/payload.json");for(const k of ["root","aurora","blob","dock","styles"]) if(!(k in c)) process.exit(1)'` | exit 0 | **exit 1** (no file); `BUDGETS` at `profile-bundle.mjs:255-266` has no dock |
| A5-G4 · no loose ceiling | inside `--enforce`: every reading ≥ 0.75 × its ceiling | exit 0 | by this rule HEAD's `BUDGETS` fail on 4 of 6: root 15.8 %, styles 19.4 %, constellation 56.3 %, fourier 79.7 % of their gzip ceilings |
| A5-G5 · the gate runs in CI | `grep -rq "payload.mjs --enforce" .github/workflows` | exit 0 | **exit 1** (fix-8 re-ran it at `e64da115`; no workflow names the script). It holds on `ci.yml` at this wave and on `verify.yml` after W-D.2 (fix-8, FG-01) |
| A5-G6 · the exact ratchet is gone | `test ! -e .bundle-ratchet && ! grep -rq "G-BUNDLE-RATCHET" scripts tests` | exit 0 | **exit 1**: the file reads `2919057`; 6 lines name the gate |
| A5-G7 · a leaked subpath export fails | append `export const probeSubpathLeak = 1;` to `src/components/status-dot/index.ts`, `npm run build`, `npx vitest run tests/public-surface.spec.ts` | exit 1 | **exit 0**: 96 passed (SURVIVED) |
| A5-G8 · a new subpath without a record fails | add a `./probe` key to a scratch copy of `package.json` `exports` pointing at an existing built file, run the same test | exit 1 | no record exists at HEAD |
| A5-G9 · the payload gate bites | append a 40 KB incompressible string export to `src/components/aurora/index.ts`, rebuild, `node scripts/payload.mjs --enforce` | exit 1 naming `aurora` | not runnable at HEAD (no script); roster G-05's bite |

A5-G1 alone passes on generous ceilings; A5-G4 bounds them from below and A5-G9 shows a real growth fails. A5-G7 alone passes if the record is regenerated from `dist` at test time; step 4 forbids that and A5-G8 checks the record is independent of the build.

## 6 · π and DELTA obligations

None: the wave makes no visual claim. Its readings (the five gzip sizes at the wave's HEAD and their ceilings) go into the wave record as the before-and-after of the budget.

## 7 · MIGRATION rows

None. No published name changes; `package.json` `files` is unchanged, and `profile:bundle` is a development script, not a published entry.

## 8 · Ledger rows

Closes #85's remainder (`census-register-b.md:70`: "The absent public-surface pins are F-10's subpath exactness"). The census row F-10 holds (`CENSUS.md:80`) closes with it. CT-7 (CSS partials in `dist` that no published entry reaches) closes on A5-G2: the styles draw is the whole closure, 0 unresolved and no unreached file.

## Appendix A · the closure reader

Run at HEAD as `node css-closure.mjs <worktree>`:

```js
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { gzipSync } from "node:zlib";
const entry = resolve(process.argv[2], "dist/styles/index.css");
const RE = /@import\s+(?:url\()?["']([^"']+\.css)["']\)?[^;]*;?/g;
const oneLevel = () => { const css = readFileSync(entry, "utf8"); return css.replace(RE, (m, ref) => { const t = resolve(dirname(entry), ref); return existsSync(t) ? readFileSync(t, "utf8") : m; }); };
const seen = new Set();
const rec = (f) => { if (seen.has(f)) return ""; seen.add(f); const css = readFileSync(f, "utf8"); return css.replace(RE, (m, ref) => { const t = resolve(dirname(f), ref); return existsSync(t) ? rec(t) : m; }); };
const a = oneLevel(), b = rec(entry);
const left = [...a.matchAll(RE)].length;
console.log(JSON.stringify({ oneLevel: { raw: a.length, gzip: gzipSync(a).length, unresolvedImports: left }, recursive: { raw: b.length, gzip: gzipSync(b).length, files: seen.size } }));
process.exit(left ? 1 : 0);
```

Output at `fabc95e2`:

```
{"oneLevel":{"raw":154058,"gzip":27100,"unresolvedImports":83},"recursive":{"raw":323403,"gzip":56823,"files":122}}
```

The one-level figure (27,100) matches the budget report's `dist/styles/index.css` gzip 27,144 to within the difference in gzip settings, which confirms the report measures the one-level draw.
