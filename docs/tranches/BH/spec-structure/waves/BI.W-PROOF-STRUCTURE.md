# BI.W-PROOF-STRUCTURE — the enforcement-gate wave (the `proof:colocation` evolution)

> **Wave id:** `BI.W-PROOF-STRUCTURE` · **band:** S0 (SCAFFOLD) · **class:** `H` (device-free) · **gate:** the
> gate suite it authors, self-tested (`proof:colocation` G1 · `proof:depth` G3 · `proof:import-boundaries` G4 ·
> G5 orthogonality · `proof:no-glass-in-dist` G10), each `["local","ci"]` (G10 `["ci","release"]`) · **preconds:**
> BI.W-CENSUS-RECOMPUTE.
>
> The commissioned carry (c): the evolution of `proof:colocation` into the full structure-enforcement suite, PLUS
> the shared predicate library carrying the camel-segment matcher, the language→subtree binder, and the
> strict-infra-containment predicate. Born-RED on the pre-move tree; the S1–S3 moves GREEN it.

## §0 — Verdict

The house machine-locks structure with `proof:colocation` + `proof:no-god-module`; this wave EXTENDS them (no
parallel regime) and adds the new gates the standard needs. It harvests the 6 FE proto-gates
(`proto-gates/proof-{colocation-globality,depth,import-boundaries,css-ownership,barrel-cycle,no-tier-literal}.mjs`
+ `proof-css-colocation-golden.mjs`) into `scripts/`, evolves them per the round-6 folds, and lands them
born-RED. Every new gate is a device-free `proof:*` script with self-test bites — NEVER ESLint (§0.5-12).

## §1 — Scope (the gates authored + the shared lib)

### 1.1 — `scripts/lib/structure-predicates.mjs` (the shared predicate lib — the (c) core)

ONE lib, consumed by BOTH the FE G4 arm and the BE G9 gate (BI.W-G9-HARVEST):

- **`camelSegments(base)`** — `camelSegments("useDashboardFilterStore") = ["use","Dashboard","Filter","Store"]`.
  The §4P.5 hard-branch matcher (blocker-fold #1): a module counts toward `<domain>` iff
  `base === domain || base === domain+'s' || camelSegments(base).includes(Pascal(domain)) || a stores/<domain>/
  or api/<domain>/ dir exists`. STRICTLY NARROWER than a loose substring (`dash` needs a `Dash` SEGMENT).
- **`languageSubtrees(repoRoot)`** — FOLD6 (blocker-fold #2): multi-manifest detection (each `pyproject.toml`/
  `Cargo.toml`/`go.mod`/backend `package.json` roots its OWN subtree) + per-language audit-root + extension-filter
  of the stem count to the language's OWN source extensions. Consumed by G9.
- **`infraContainment(file, imports)`** — FOLD3 strict-infra-containment (blocker-fold #3): an `INFRA_RING` file
  importing ANY non-infra/non-stdlib module (a domain, the pipeline tier, OR the app edge) is an upward leak.
  Consumed by G9's arm (e).
- **`dataVsLogic(dirName)`** — the DATA-vs-LOGIC split (FOLD2): `LOGIC_LAYER_DIRS` → RED, `DATA_LAYER_DIRS` →
  WARN. Consumed by G9's arm (c).

### 1.2 — G1 `proof:colocation` extend

KEEP the README-marker binding. ADD: the globality clause (T3 FOLD↔PROMOTE census), the no-empty-segment clause
(T4 — a 1-file `lib/`/`composables/`/`styles/`), SCOPE-EXTEND to `demo/`, and — the LOAD-BEARING R6-5 fold — the
MACHINERY-GATED complexity trigger closing the README-derivation circularity:

```
complex := (sfcCount ≥ 3 AND hasMachinery) OR subComponentWithOwnMultiFileDir OR rootLineSum > ~1200
where hasMachinery := a root use*/Context.ts | composables/ | constants.ts|constants/ | shaders/ | root shader
target set = README-bearing ∪ complexity-triggered
```

The machinery-gate narrows the raw ≥3-SFC storm 24→4 (configurator/carousel/drawer/progress); the 23 thin
shadcn compound-forwarders are SUPPRESSED (edict 2 — no ceremony READMEs). Line-sum ROOT-only (depth-1;
recursive line-sum penalizes good colocation). ADD the domain-map COMPLETENESS clause (dir-list == rows) + viz
membership from the `useGpuSubstrate` edge ∪ {goo-filter} + the closed-enum non-empty tag floor (blocker-fold's
tag-freshness FLOOR: `viz|form|overlay|feedback|mark|data|nav|motion|container|control|…`; semantics ADVISORY).

### 1.3 — G3 `proof:depth`, G4 `proof:import-boundaries`, G5, G10

- **G3** — the T2 cap: no segment dir under a segment dir unless the inner carries `index.ts` (recursion reset);
  ≤5 dirs below the nearest feature/component root. Prototyped 5/5.
- **G4** — the 4-node DAG (`shared → components → subpath-entries → app`); the DI-context sub-ruling (a reach
  into a `createStrictContext`/`createOptionalContext` module imported by ≥2 FOREIGN families → PROMOTE); the
  `proof:domain-graduation` arm (every product-app `components/<domain>/` meeting hard≥3 [camel-segment] OR soft≥2
  LIVES at `features/<domain>/`); the cross-component-GUTS arm ships `warn`-gated for the enumerated residual
  (blocker-fold's G4-staging — flips to `error` when the barrel-discipline pass greens it). Born-RED with 25
  guts reaches. Self-test 11/11 incl. the DI bite.
- **G5** — location-vs-publish orthogonality (a colocated PUBLIC composable is never flagged for being public).
- **G10 `proof:no-glass-in-dist`** — assert ZERO `@glass` specifiers in `dist/*.d.ts` (the permanent src-stays-
  relative lock). Born-RED on a synthetic `@glass` src file.

## §2 — Binding criteria (born-RED → GREEN)

- Born-RED at HEAD: G1 flags configurator/carousel/drawer/progress (complexity trigger) + globality/no-empty reds;
  G4 reds 25 guts reaches + 3 product-app graduation violations (via the sibling census); the domain-map is
  absent. GREEN progressively: README-REMEDIATE + FOLD-CENSUS green G1; PROMOTE-CONTEXT + PROMOTE-PRIMITIVES +
  GUTS-RESIDUAL green G4; the domain-map lands in FLATTEN-MOVE.
- Every gate carries a self-test bite proving the detector is not hollow, INCLUDING the enriched G1 machinery-gate
  suite: a ≥3-SFC-NO-machinery dir MUST NOT flag (the shadcn-suppression bite); a ≥3-SFC-WITH-machinery dir MUST
  flag; the SFC boundary (==3 complex, ==2 not); the line-sum boundary (==1200 not, +1 complex); the
  circularity-target assertion (a complex-no-README dir IS a target); the recursion-arm bite (0 live positives —
  self-test load-bearing).

## §3 — Fences

- This wave AUTHORS gates + the shared lib; it does NOT move any component (the moves are S1–S3). ZERO `.vue`/
  `.css` edits.
- The gates land RED — that is CORRECT (born-RED on the tree they drain). A GREEN gate at authoring would mean
  the detector is hollow.
- NEVER ESLint (§0.5-12). Device-free `proof:*` only.
- The shared lib's `languageSubtrees`/`infraContainment`/`dataVsLogic` predicates are AUTHORED here but CONSUMED
  by G9 in BI.W-G9-HARVEST — ONE predicate source, two gate families (no re-implementation).

## §4 — Cross-refs

R6-5 (machinery-gated README); blocker-folds #1 (camel-segment), #2 (language→subtree), #3 (strict-infra-
containment); §6 G1/G3/G4/G5/G10; §9.10 (the domain-graduation chain).
