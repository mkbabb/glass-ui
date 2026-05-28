# AN.W6 — Dock panel-host disposition + chassis-phase decision

Two single-decision dispositions close here.

## Gap 5 — Dock panel-host variant: ARCHIVED (2-consumer gate)

**Disposition**: ARCHIVED on the substrate-without-consumer binary (J inv 10 / L inv 8).

The dock panel-host variant (F.W10 item 4 / H3-FATAL→reshape) does NOT land. muster's F redesign explicitly **cut "the dock IS the app"** (synthesis SYNTHESIS §2.2) — the v1 composition is a verdict/instrument split with the dock as a slim control strip, not a tall stacked-control pane host. Zero realised consumers need a panel-host.

**Named realisation condition**: the dock panel-host variant LANDS when **≥ 2 consumers declare a tall-vertical-pane stacked-control pattern** (e.g. value.js or another `@mkbabb/*` project mounting a Figma-style stacked-panel rail inside the dock). Until then `GlassDock` + `DockLayerGroup`/`DockLayer` (the existing multi-layer grid) cover every realised case; no panel-host ships.

## Gap 6 — InstrumentChassis "scoring" phase: DOCUMENTED ("ping" canon)

**Disposition**: DOCUMENTED — `"ping"` is the canonical generic-active phase. No additive `"scoring"` union member ships.

The `InstrumentChassisPhase` union at HEAD is:

```ts
export type InstrumentChassisPhase =
    | "ready" | "ping" | "download" | "upload" | "jitter" | "complete";
```

`"ping"` already serves as the generic-active phase (and a phase-canon test enforces the union). muster's F redesign settled on `"ping"` for both the scoring-active and error states (F.md decision 5). Adding a `"scoring"` member that no consumer references would be speculative substrate — the overfitting precept forbids it (every union member earns its place via a consumer). The clean disposition is to DOCUMENT `"ping"` as canonical rather than expand the type.

**CLAUDE.md §Component architecture** gains a one-line note (applied at integration):

> The `InstrumentChassisPhase` union's `"ping"` member is the canonical generic-active phase — use it for any active-but-unspecialised state (scoring, validating, processing). The union does not carry a per-domain `"scoring"` member; a consumer maps its domain-active state onto `"ping"`.

## Evidence

- `src/components/custom/instrument-chassis/InstrumentChassis.vue:7-13` — the union (ping present, no scoring).
- muster F.md decision 5 — "ping"-canon for scoring + error.
- muster synthesis §2.2 — "dock IS the app" cut from v1.

`npm run typecheck` + `npm run build` unaffected (both dispositions write no source).
