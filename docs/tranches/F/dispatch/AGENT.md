# F Agent Dispatch Template

Use this template for F agents. Fill the bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche F - Interaction, Style, And Rendering Contract Hardening.

Wave: [W0/W1/W2/W3/W4/W5/W6]
Lane: [lane id and focus]
Mode: [read-only audit / implementation / verification]

Read first:
- docs/instructions/README.md
- docs/precepts/instructions/README.md
- docs/precepts/instructions/ORCHESTRATION.md
- docs/precepts/instructions/CONSUMING.md
- docs/precepts/instructions/tranche/SPEC.md
- docs/precepts/instructions/tranche/RESEARCH.md
- docs/precepts/instructions/tranche/CHALLENGE.md
- docs/tranches/F/F.md
- docs/tranches/F/waves/[wave].md
- docs/tranches/F/research/00-eight-lane-audit-synthesis.md
- docs/tranches/F/audit/W0-challenge.md

Task:
[bounded lane task]

Ownership:
[exact files/directories, or "read-only; do not edit"]

Rules:
- You are not alone in the codebase. Do not revert or overwrite unrelated edits.
- Follow KISS: one path, no compatibility shims, no fallback exports, no legacy/deprecation barrels.
- If scope reveals work outside this wave or ownership, stop and report the scope reveal instead of broadening.
- Do not treat bundle or CSS reductions as hard gates unless the wave spec says so.
- Evidence must be command-backed, source-backed, or runtime-backed. Label speculation as speculation.
- Large component splits must be consumed in the same wave.
- Styling changes must be visually isomorphic unless the wave names a deliberate correction.

Output:
- Summary of findings or changes.
- Exact files changed, if any.
- Commands run and outcomes.
- Residual risks and scope reveals.
```

## W0 Lane Prompts

W0 agents are read-only and must not edit source/config/test/consumer files.

- **W0.A Plan Lineage**: Recap C, D, D-II, E, current F prelude, and binding precepts. Name what remains binding and what is retired.
- **W0.B Consumer/Public Surface**: Audit current root exports, subpaths, public barrels, style exports, docs, and active consumer imports including speedtest.
- **W0.C Component Contracts**: Audit `v-html`, search cache/indexing, DataTable identity, document/listener lifecycle, large files, empty dirs, and composable ownership.
- **W0.D Style/Theme**: Audit Tailwind v4 namespaces, `@theme`, `@source`, global utilities, dock CSS duplication, brittle selectors, z-index, viewport/calc chains, and token gaps.
- **W0.E Dock/Navigation**: Audit `GlassDock`, rail variant, `DockLayerGroup`, popover layering, teleports, transitions, blur tokens, and navigation story substrate.
- **W0.F Aurora**: Audit Aurora config/uniform liveness, runtime/capture state, oil flow, thumbnail context, studio splits, docs drift, and benchmark needs.
- **W0.G Velocity**: Audit package scripts, proof commands, artifact paths, consumer validation split, runtime smoke, bundle/profile outputs, and close command scope.
- **W0.H Story Substrate**: Audit intro links, source viewer, flat-story navigation, keyboard/pager behavior, configurator style token consumption, and raw story surfaces.

## Implementation Dispatch Constraints

- W1 shared scripts/package command edits are orchestrator-owned unless W0 gives exact disjoint files.
- Consumer lanes in W1 may run in parallel only when their directories are disjoint.
- W2 dock runtime and dock style lanes must coordinate through the orchestrator because CSS authority is shared.
- W3 component lanes must not modify the same component family in parallel.
- W4 token decisions are orchestrator-owned; component-local CSS cleanup can be parallelized by disjoint family.
- W5 runtime and shader lanes must coordinate through explicit config/uniform ownership.
- W6 audit lanes are read-only; the orchestrator performs close commands and final docs.
