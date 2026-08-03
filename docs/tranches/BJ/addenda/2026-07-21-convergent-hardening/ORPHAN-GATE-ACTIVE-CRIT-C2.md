# Orphan-CSS published-reach gate — active candidate third-pass critic

Date: 2026-07-22  
Existing owners: `BJ.W-COLO-3`, GATES W3 `orphan-CSS-partial`  
Disposition: **HOLD / acceptance-RED; bank only the bounded source-graph direction**

## Frozen input

- repository HEAD: `620f0d37d9fe5da4042210efb2c5b1d18a8fd30d`
- repository tree: `06e5a10724cb1a01311418e45afd1afdccc1e010`
- active file: `tests/gates/orphan-css-partial.test.ts`
- active file SHA-256:
  `f77d244095590bb275c69b1285bfea032ab51443b8d3f6f6ba3ec55ef7d85bbe`
- Claude workflow: `wf_81fc2edb-c07`, task `w7lk16htk`
- build seat: `aad79ac5ff6c7c2ee`, `claude-opus-4-8`
- active workflow critics: `af29a34e4fce5d60e`, `ab83302f493fea410`
- non-interrupting boundary steer: `SOL-TO-CLAUDE-LIVE-STEER-18.md`, SHA-256
  `2488870dc2b1b49b7a0470870003e4dcf5fd9adfebd6c9e6401f702c3e9ab45`

This report is an exact-byte third critic of the active uncommitted candidate. Any implementation
change supersedes the candidate bytes and requires reconciliation, not silent carry-forward of this
verdict.

## What the candidate genuinely improves

1. It recursively discovers nested `./dist/styles/*.css` string leaves in conditional export objects.
2. It filters component CSS references through a source-entry reach set rather than allowing every
   source SFC to rescue a partial.
3. A real planted unreachable SFC with a sole `<style src>` reference turns the integrated gate RED;
   a reachable exported SFC remains GREEN.
4. W7's landed source closure and `glass-capsule → glass-chip → glass-atom → glass-liquid-fill` order
   remain untouched.
5. The candidate's ordinary suite passes 6/6 and `git diff --check` is clean.

These are useful mechanics. They do not establish the claimed runtime-value or emitted-package
contract.

## Material defects

### 1. The JS graph is lexical, not runtime-accurate

The one whole-file regular expression at the active file's `jsImportSpecs()` treats each of these as a
runtime edge:

- `import type ...`;
- `export type ...` and `export { type ... }`;
- `type T = import("./Dead.vue").T`;
- commented imports and commented literal dynamic imports;
- import-like text in commented Vue script blocks.

Dedicated type edges erase at runtime. Comments, templates and styles do not create module edges. A
counterfeit edge can therefore make a dead SFC and its CSS appear published.

### 2. The roots are build entries, not the public JS surface

`publicJsReach()` begins at every `libraryEntryMap()` value but does not recursively derive the actual
package JS export leaves or assert export-map parity. Removing a public package export while leaving a
build entry makes the unique component CSS remain falsely reachable.

### 3. Dead SCCs can still receive counterfeit inbound reach

An unrooted barrel/SFC cycle must remain dead. Type/comment false edges can currently create a fake
inbound path. The governing relation is directed runtime value reach from real public roots, not
all-edge reach or cycle membership.

### 4. Conditional CSS discovery is unbitten and incomplete

The recursive function is not exercised by any conditional-object or array fixture. Restoring the old
one-level implementation leaves all six tests GREEN. It also accepts only `./dist/styles/**`; the
generated public `./dist/glass-ui.css` leaf is silently discarded rather than classified as a
build-only root.

### 5. Vue and CSS references are not parsed by language

The candidate scans the whole SFC. It can count commented/disabled `<style>` descriptors, cannot
separate `<script>` from `<script setup>`, and misses binding-form CSS imports such as
`import sheet from "./x.css"`. Source readers must parse TypeScript and Vue structure, then accept SFC
styles only after the SFC is runtime-value reachable.

### 6. Reachable component CSS does not seed a transitive CSS closure

The candidate computes:

`importClosure(public CSS roots) ∪ reachable component CSS roots`

It must compute:

`importClosure(public CSS roots ∪ reachable component CSS roots)`.

A reachable SFC's `styles.css` that imports `nested.css` currently makes the valid nested partial look
orphaned.

### 7. The dead/live self-tests are not integrated mutations

The two new tests fabricate Maps and nonexistent paths. They do not exercise parsing, graph traversal,
the real corpus or the final orphan calculation. Restoring the old ungated all-source union in the
production calculation can leave the live corpus GREEN while both helper tests remain GREEN. Therefore
the named regression can return without turning the suite RED.

### 8. The `AND dist` claim has no instrument

The test reads no fresh build, generated asset, tarball or downstream install. Current `dist` bytes can
be older than the source/test. `copyStyleAssets()` also copies component CSS physically into
`dist/components`; existence or tarball inclusion does not prove a published consumer entry reaches
those rules. `sideEffects: ["*.css"]` is valuable metadata, not reach evidence.

### 9. No output-omission, order, freshness or downstream mutation exists

Removing `dist/styles/index.css → ../glass-ui.css`, omitting a built partial, reordering chip/atom before
capsule, serving stale build bytes, or packing dead component CSS cannot affect this gate. Its title and
comments therefore overclaim emitted-package truth.

## KISS redress

Keep two honest instruments rather than implementing a home-grown bundler in one Vitest file.

### Source runtime-reach gate

1. Parse TS/JS with the installed TypeScript parser and Vue with installed `@vue/compiler-sfc`.
2. Follow only static value imports/re-exports, side-effect imports and literal dynamic imports. Ignore
   dedicated type edges, `ImportTypeNode`, comments, templates and styles.
3. Recursively collect the real package JS export leaves, map them to `libraryEntryMap()`, and assert
   exact parity.
4. Collect real style descriptors from reachable SFCs and supported CSS import forms from reachable
   JS.
5. Apply one transitive import closure to both public CSS source roots and reachable component-CSS
   roots.
6. Classify every recursive CSS export leaf as source-mappable or generated. Rename the source gate so
   it does not claim `AND dist`.

### Fresh package-output gate

1. Build from the pinned source candidate and record source/build identities.
2. Recursively resolve every retained public CSS target and its local import closure.
3. Prove canonical `./styles` reaches generated `glass-ui.css` and the retained alternate CSS entry is
   complete.
4. Assert the W7 order `capsule → chip → atom → liquid-fill` in the actual generated cascade.
5. Pack and install the immutable candidate in a minimal downstream consumer, then prove the required
   selectors and paint survive without workspace/source substitution.

## Born-RED matrix

| mutation | required result |
| --- | --- |
| unreachable SFC references `dead.css` | RED |
| same SFC receives a public value re-export | GREEN |
| it receives only `import type`, `export type` or `ImportTypeNode` reach | RED |
| dead barrel ↔ SFC cycle has no public inbound value edge | RED |
| reachable literal dynamic import names the SFC | GREEN |
| the dynamic import exists only in a comment/type position | RED |
| reachable `<style src>` root imports a nested CSS partial | both GREEN |
| delete that nested `@import` | nested partial RED |
| reachable binding-form/literal-dynamic CSS import | GREEN |
| commented or disabled style reference | RED |
| nested conditional CSS export leaf | discovered |
| restore one-level conditional traversal | RED |
| package removes a JS export while its build entry remains | CSS RED or export-map parity RED |
| remove generated `../glass-ui.css` fold | package gate RED |
| remove a built W7 partial/import | package gate RED |
| reorder chip/atom before capsule | package order gate RED |
| delete or stale a built CSS target | package gate RED |
| dead component CSS is merely copied into `dist/components` | still RED |
| restore ungated all-source component references | integrated source gate RED |

## Coordination ruling

- This deepens existing `R-CSS-PUBLISHED-REACH` / `BJ.W-COLO-3` / GATES W3 only. It mints no row,
  primitive, consumer shim or product style.
- The simple dead-SFC fix may be banked as a source-graph partial after truthful naming and language-
  parsed value reach. It may not close the combined gate without the separate package-output arm.
- Preserve W7 source repair `4442b451`; do not rewrite its history.
- The current candidate is Opus-authored. Under the user's model law it remains mechanics discovery;
  terminal redress requires declared Luna x-high mechanics and fresh unchanged-byte Sol x-high critics.
