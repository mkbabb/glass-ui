# F.W0 Plan Lineage Ledger

W0 read the governing tranche and precept corpus, C/D/D-II/E lineage, the current F plan, Aurora lineage notes, and the active source/consumer state. The purpose of this ledger is to preserve the decisions that must constrain F implementation.

## Binding Decisions

| Source | Decision that binds F | Implementation consequence |
|---|---|---|
| C | Public UI and story surfaces must compose library primitives instead of rebuilding one-off variants. | Story repairs in W2/W4 must consume dock/card/style primitives or delete unused substrate. |
| D | Public surface is evidence-backed. Root compatibility is not an excuse to preserve drift. | W1 migrates active consumers to explicit subpaths and adds static policy before export trimming or docs cleanup. |
| D-II | Rail is a dock mode, not a separate component family. | W2 keeps `GlassDock variant="rail"` and strengthens orientation/context/proof rather than reviving `rail` code. |
| E | Package publication is explicit subpaths plus one public stylesheet path. | W1 keeps root core narrow, rejects source-relative consumer imports, and keeps `@mkbabb/glass-ui/styles` as the only style entry. |
| F prelude | Proof substrate precedes broad cleanup. | W1 owns scripts and artifacts first; later waves run against durable gates instead of one-off checks. |

## Retired Claims

| Claim | W0 disposition | Reason |
|---|---|---|
| Old plugin-first F | Rejected | Tailwind v4 namespace correctness, token bridges, and CSS authority are not yet proved. |
| Hard CSS/JS byte floors in W0 | Rejected | Bundle numbers are measurements until style/runtime contracts stabilize. |
| Root compatibility/deprecation barrels | Rejected | The product is in active development; drift is fixed by consumer migration and static enforcement. |
| Rail is not a dock | Rejected | Current implementation and story intent identify it as a vertical `GlassDock` variant. |
| Restore heavy dock blur | Rejected | The default dock blur was intentionally reduced; W2 must prove subtle blur is present and named. |
| Mechanical large-file splitting | Rejected | Splits must reduce coupling, have colocated ownership, and be consumed in the same wave. |
| WebGPU/OffscreenCanvas as Aurora default | Rejected | W5 keeps the WebGL2 single-pass path unless profiling proves a concrete need. |

## Exact Wave Consequences

| Wave | Narrowed ownership from W0 |
|---|---|
| W1 | Package proof, static consumer policy, consumer builds, runtime smoke, bundle/profile artifacts, README/docs drift, and active consumer import migration. |
| W2 | Dock context/orientation, layer transition lifecycle, owned portal markers, token z-index, dock blur proof, popup registry scope, and navigation story dock controls. |
| W3 | Unsafe HTML boundaries, fuzzy-search cache/timers, data-table row identity, lifecycle cleanup, approved large splits, and empty custom directories. |
| W4 | Tailwind v4 namespaces, runtime/theme bridges, utility/token gaps, dock CSS authority after W2, brittle selectors, z-index tokens, and configurator/story token drift. |
| W5 | Aurora config/uniform liveness, oil flow consumption, live/capture runtime split, deterministic `renderAt`, thumbnail capture, studio editor split, docs drift, and Aurora profile script. |

## W0 Command Evidence

| Command | Result |
|---|---|
| `git status --short` | clean before W0 and before W0 doc edits |
| `/usr/bin/time -p npm run iter-check` | pass, observed real time about 4-6s across orchestrator/agent runs |
| `/usr/bin/time -p npm run iter-test` | pass, 13 files and 233 tests, observed real time about 3-7s |
| `/usr/bin/time -p npm run verify-export-types` | pass, observed real time about 0.5s |

## W0 Close Decision

F has more than five findings, but they are not unrelated scope expansion. W0 maps them into the already planned W1-W5 path:

1. proof and consumers;
2. dock/navigation;
3. component contracts;
4. style/theme;
5. Aurora.

No new tranche is required before implementation.
