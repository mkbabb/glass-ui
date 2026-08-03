# Orphan-CSS gate `0169e935` closer reconciliation C2

Date: 2026-07-22  
Existing owners: `BJ.W-COLO-3`, GATES W3 `orphan-CSS-partial`  
Disposition: **bank a bounded source-graph partial; reject `close` / acceptance remains RED**

## Exact landed input

- commit: `0169e93534e754dea50e2a80dd499a26a2a955c4`
- tree: `8be0b36d4e34b6b8a7e6e4b70f7e2bcd5b53fa2c`
- parent: `620f0d37d9fe5da4042210efb2c5b1d18a8fd30d`
- changed path: `tests/gates/orphan-css-partial.test.ts` only
- committed file SHA-256:
  `aa34910b2c16b747bbdce2b2766976bde9ac7b53ee377bd1b803574bc8131946`
- test: `npx vitest run tests/gates/orphan-css-partial.test.ts --reporter=verbose` → 7/7 GREEN
- diff check: GREEN
- precursor exact-byte Sol critic: `ORPHAN-GATE-ACTIVE-CRIT-C2.md`, SHA-256
  `91da629893f6c30d92c2b86cb9be523c6f24c6b3071b22c9bdb99c41626881c5`

The closer committed with `--no-verify`. The commit has a useful body but does not state why hooks were
bypassed or route the full runtime/package remainder required by commit discipline.

## What the byte-changing closer fixed

Relative to active candidate `f77d2440…`, the closer made three genuine improvements:

1. It renamed and documented the suite as source-graph reach, explicitly stating that it reads zero
   `dist` bytes and cannot prove package-output omission.
2. It exercises recursive conditional-object CSS export discovery with a retained nested-leaf unit
   test and negative non-style/generated-bundle cases.
3. It replaces the nonexistent dead referrer with a present-but-currently-unreachable source module
   and asserts the reach set remains a proper subset of the source module set.

It also preserves W7's source closure, turns the simple planted dead-SFC mechanism RED, and keeps a
reachable exported SFC GREEN. Those source mechanics are bankable.

## Why the commit does not close the existing contract

### 1. Runtime reach is still inferred by a whole-file regex

`jsImportSpecs()` at committed lines 131–142 scans complete TS and Vue text. It still treats erased
`import type`, `export type`, `export { type ... }`, `ImportTypeNode`, comments, commented Vue blocks,
template/style prose and similar lexical matches as runtime edges. A dead SFC can therefore receive a
counterfeit inbound edge and rescue CSS. The closer added no type/comment/dead-cycle/dynamic-value
mutation.

### 2. “Public” roots still come from build entries, not actual package exports

`publicJsReach()` defaults to all `libraryEntryMap()` values at lines 150–152. It does not recursively
derive actual package JS export leaves or assert exact parity. Removing a package export while retaining
its build entry leaves the component and CSS falsely public.

### 3. Vue and CSS remain lexically scanned

`componentReferenceMap()` at lines 171–189 scans the whole file. It can count commented/disabled style
descriptors, misses binding-form/dynamic CSS imports, and does not use `@vue/compiler-sfc` to separate
script, script-setup and real style descriptors.

### 4. Component CSS does not seed the transitive CSS closure

Line 211 computes:

`importClosure(public CSS roots) ∪ reachable component CSS roots`.

It must compute:

`importClosure(public CSS roots ∪ reachable component CSS roots)`.

A reachable component's `styles.css → nested.css` therefore false-orphans the nested partial.

### 5. The retained dead/live tests still do not exercise the integrated corpus

The “dead SFC” is actually `useScrollScene.ts`, not an SFC and not an actual CSS referrer. The test
constructs a `Map` linking it to a nonexistent CSS path; it does not feed a present unreachable SFC,
real style descriptor and CSS file through `componentReferenceMap()`, `publicJsReach()` and the final
`orphans` calculation. All 174 current SFCs are reachable, so the real SFC exclusion path has no corpus
witness. Restoring the old ungated all-source union in the final production calculation can leave the
current corpus and helper tests GREEN.

### 6. The package/output half remains absent

The new scope note is honest, but the existing `R-CSS-PUBLISHED-REACH` contract is deliberately a split
source + package unit. No fresh build, generated public entry closure, W7 cascade order, tarball,
installed consumer, source/build freshness or served identity exists. The missing half therefore remains
RED; copied `dist/components/*.css` and `sideEffects:["*.css"]` do not prove public reach.

### 7. Commit/status truth overclaims

The subject says `close BJ.W-ORPHAN-GATE` and the body says “every required arm has a mutation watching
it.” Both are false under the existing row. Only the bounded source approximation and three local
mutations landed. The runtime-value parser, real export roots, nested component closure, integrated
old-union bite and package arm are routed remainder. The `--no-verify` bypass is also unexplained.

## Binding continuation

Preserve `0169e935` without rewriting history. A bounded forward Luna x-high redress:

1. parses TS/JS through the installed TypeScript parser and Vue through `@vue/compiler-sfc`;
2. follows runtime value imports/re-exports, side-effect imports and literal dynamic imports only;
3. recursively derives actual package JS export leaves and asserts parity with mapped build entries;
4. collects real reachable SFC style descriptors and supported JS CSS import forms;
5. applies one CSS import closure over public CSS roots plus reachable component CSS roots; and
6. lands integrated mutations for type/comment/ImportType edges, dead SCCs, dynamic value reach,
   nested component CSS, removed package export and restored ungated all-source rescue.

Separately, the package gate fresh-builds and proves both public CSS entries, generated `glass-ui.css`
fold, W7 `capsule→chip→atom→liquid-fill` order, source/build freshness, immutable pack/install/served
identity and downstream selector/paint survival.

No new row, primitive, product style, W7 rewrite, consumer shim or history rewrite follows. Two fresh
unchanged-byte Sol x-high critics remain required after the forward redress.
