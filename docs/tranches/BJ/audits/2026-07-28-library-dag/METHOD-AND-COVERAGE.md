# Import DAG method, correction, and coverage contract

## Scope

`build-import-dag.mjs` inventories every regular file under `src/` and `demo/`.
The corrected v2 edge extractor includes:

- static ECMAScript imports and export-from declarations;
- literal dynamic imports;
- Vue `<style>`, `<script>`, and `<template>` external block sources;
- literal Vite `import.meta.glob` expansions to every matched file;
- CSS `@import`;
- non-data CSS `url()` assets;
- internal, external-package, and repository-boundary classifications.

Unresolved relative/alias imports and unmatched literal globs are explicit
defects. The corrected graph contains zero of either.

## Pass-1 falsification

The first graph counted 890 nodes, 2,182 internal edges, nine file SCCs, and 47
isolated nodes. Challenger A correctly falsified its edge completeness:

- 19 Vue external style-block edges were absent;
- 13 CSS targets were therefore falsely isolated;
- the manifest's two literal glob calls were absent;
- those globs add 107 edges: 103 ordinary story matches plus four additional
  tile-pattern matches;
- the missing edges concealed the manifest/StoryPage/navigation/story SCC and
  made the demo graph look more acyclic than the runtime loader.

Pass 1 is preserved as `IMPORT-DAG-PASS1.json` and
`IMPORT-DAG-PASS1-SUMMARY.md`. It is evidence of the audit correction, not a
count authority.

## Corrected v2 authority

| Measure | Count |
| --- | ---: |
| Nodes | 890 |
| Internal edges | 2,308 |
| External edges | 623 |
| Repository-boundary edges | 1 |
| Unresolved internal imports | 0 |
| Unmatched literal globs | 0 |
| Leaf modules | 112 |
| File SCC cycles | 10 |
| Cross-module edge pairs | 518 |
| Module SCC cycles | 3 |
| Isolated nodes | 34 |
| Tests under product roots | 0 |
| Module-prefix candidates | 146 |

Receipt:
`1f8124e4c3e1a87a5bcc79c8b6ce89b0c8862a044017d63ce6197057ee1581ed`.
`observedAt` is intentionally excluded from the receipt hash.

## Three-pass review

The review uses graph-cluster-sized batches, not a fixed file count:

1. Challenger A, fresh GPT Sol x-high, assumes every current boundary is
   wrong and dispositions all 112 leaf modules and all visible cycles.
2. Challenger B, fresh GPT Sol x-high, independently repeats the challenge,
   including public surface, tests, demo, shadcn abrogation, migration, and
   Goldilocks granularity.
3. A third fresh GPT Sol x-high adjudicates disagreements against corrected v2
   and must explicitly account for 112/112 modules, 10/10 file SCCs, and 3/3
   module SCCs.

The graph JSON is the every-node/every-edge record. The reports adjudicate
clusters and boundary laws without duplicating 2,308 edge rows into prose.

## Iteration acceptance

Before the first product source cut, graph schema v3 adds Vue/TypeScript/CSS
AST parsing, edge-kind projections, template/worker/URL edges, an explicit
owner manifest, and joinable package/build/test/generator graphs as ruled in
`ADJUDICATION-SOL.md`. This is now implemented by
`build-import-dag-v3.mjs`, checked by
`tests/architecture/import-dag-v3.test.ts`, and banked as
`OWNER-MANIFEST.json`, `IMPORT-DAG-V3.json`, and
`IMPORT-DAG-V3-SUMMARY.md`.

V3 inventories product, demo, tests, visual tests, scripts/generators, build
configuration, and package-surface files, then admits traversable
repository-boundary targets. Its seed universe is Git-tracked files plus
nonignored untracked files. Ordinary ignored build products, caches,
screenshots, and test results therefore cannot perturb the graph, while a
legitimate nonignored worktree source remains visible; `node_modules` is
excluded explicitly. It classifies Vue external-block metadata,
TypeScript import/export/load kinds, literal glob arrays with negative patterns
and options, workers and `new URL(..., import.meta.url)`, template-local assets,
literal bound Vue assets, static inline-style `url()` assets,
PostCSS imports with layer/supports/media clauses, CSS asset URLs, package
exports, `typesVersions`, Vite/Rolldown entries, `sideEffects`, and statically
detectable filesystem read/write/copy relationships. Literal CommonJS
`require`, `createRequire`, and `require.resolve` targets are module edges only
when lexical provenance resolves to the real Node loader. Named aliases,
namespace imports, CommonJS destructuring, factory variables, and shadowing are
distinguished; same-named local/domain functions are not admitted.
Finite dynamic-import values derived from lexical constants, arrays, objects,
property access, string concatenation, template expressions, and loop
iteration become exact edges. Unknown dynamic-import provenance is treated as
potentially local and therefore fails closed; proven remote and bare module
values remain nonlocal. Vue script, script-setup, template, and style locations
are translated from block-relative parser coordinates to exact file-native
lines and columns.
`exec`/`execFile`/`spawn` families have a separate command-and-argv ledger:
statically reducible repository targets are retained, and each dynamic argument
is counted instead of guessed. The same binding provenance admits named
aliases, namespace imports, and CommonJS forms while excluding `RegExp.exec`
and local/domain lookalikes. Dynamic Vue asset/style expressions have their own
ledger instead of disappearing. Its owner manifest is fail-closed: every real
graph file matches exactly one rule, every owner rule is active, and every
current public entry maps to exactly one owner. Whenever a package source entry
resolves, the declared public owner must equal that source node's owner.

The receipt excludes only `observedAt`;
`node docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs --check`
recomputes the repository and compares the complete stored JSON payload after
normalizing only `observedAt`; it also re-renders and byte-compares the human
summary. A stale node, owner, ledger, SCC, summary sentence, or count therefore
fails even if a stored receipt string was left untouched. Unresolved literal
local references, locally hinted nonliteral loaders, unmatched positive globs,
Vue/CSS parse errors, TypeScript syntactic diagnostics, unowned/multiply owned
files, unused owner rules, and public-entry ownership drift all fail generation.
Irreducibly dynamic filesystem operations
are counted explicitly rather than converted into invented edges. The initial
pre-source challenge seal contained 251 such operations; the current exact
count is recorded in both v3 artifacts. This is a known static-analysis bound,
not a claim of exhaustive runtime filesystem coverage.

Node lifecycle and physical type are separate total classifications.
`repository-file` covers canonical source even if a maintenance script rewrites
it, so `package.json` remains source. `generated-by-write` requires a real
`generator-write` edge and a matching `generatedBy`; declared package outputs,
missing runtime placeholders, and directories are not conflated with generated
artifacts. Generated and declared output nodes are virtual,
provenance-defined facts: ignored physical artifacts never supply their type,
bytes, or hash. The graph construction rejects incomplete or contradictory
provenance.

The checked owner manifest also carries exact, hand-authored file- and
owner-component SCC baselines for all three projections. A current component
may disappear or split, but a new member, merge of baseline components, growth
in total cyclic nodes, or growth in maximum SCC size fails generation. This is
stronger than a cycle-count ceiling, which could miss a same-count replacement
or a much larger merged component.

The measurer is intentionally present in the measurement. The architecture
test statically imports the generator and literally loads the owner manifest
and package declaration, so those sources and edges appear in v3. The generated
JSON and Markdown files are deliberately outside seed discovery: including the
machine result would make its receipt recursively depend on itself. The focused
suite falsifies binding lookalikes, malformed TypeScript, finite and unknown
dynamic-import provenance, file-native Vue SFC locations, SCC growth/merges,
ignored-artifact overlays without permanent user mutation, and external
temporary copies with tampered node payloads, public owners, and summaries.

The round-one `IMPORT-DAG-V3.json` was approximately 4.7 MB; the binding,
asset-expression, lifecycle, and ratchet ledgers bring round two to
approximately 4.85 MB. That machine snapshot is accepted and committed because
the tranche explicitly requires an exact, reviewable every-node/every-edge/SCC
record; the Markdown is only a human index. The preserved pass-1 and v2 JSON
receipts establish the same audit form, so replacing the v3 snapshot with a
smaller lossy report would break evidentiary continuity.

Pass 1 and v2 remain immutable historical evidence. V2 remains the binding
historical audit receipt; v3 is the current execution instrument and issues its
own schema and receipt without rewriting either predecessor.

After each file-owning source cut:

1. regenerate v3 with
   `node docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs`;
2. run the same command with `--check`, then run
   `npx vitest run tests/architecture/import-dag-v3.test.ts`, proving zero
   unresolved local references, unmatched globs, parse failures, ownership
   defects, and receipt drift;
3. compare removed, redirected, and new edges against the cut contract;
4. repeat two challenge passes and one adjudication for changed clusters and
   every adjacent cluster;
5. continue until there are zero file and module SCCs, no upward dependency,
   no mechanical kind-bag, no unearned public shelf, no god façade, and no
   one-wrapper file sand.

Zero SCCs is necessary but insufficient. A façade or pass-through barrel can
make a graph acyclic while preserving the wrong ownership.
