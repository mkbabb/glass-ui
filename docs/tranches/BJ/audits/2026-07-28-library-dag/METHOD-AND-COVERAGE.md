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

Before the first product source cut, graph schema v3 must add Vue/TypeScript/CSS
AST parsing, edge-kind projections, template/worker/URL edges, explicit owner
manifests, and joinable package/build/test/generator graphs as ruled in
`ADJUDICATION-SOL.md`. V2 remains the binding audit receipt; v3 becomes the
execution instrument without rewriting v2.

After each file-owning source cut:

1. regenerate v2;
2. prove zero unresolved imports/globs;
3. compare removed, redirected, and new edges against the cut contract;
4. repeat two challenge passes and one adjudication for changed clusters and
   every adjacent cluster;
5. continue until there are zero file and module SCCs, no upward dependency,
   no mechanical kind-bag, no unearned public shelf, no god façade, and no
   one-wrapper file sand.

Zero SCCs is necessary but insufficient. A façade or pass-through barrel can
make a graph acyclic while preserving the wrong ownership.
