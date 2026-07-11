# BI.W-G9-HARVEST — the backend gate v2 harvested to disk (born-RED→GREEN on disk)

> **Wave id:** `BI.W-G9-HARVEST` · **band:** S0 (SCAFFOLD) · **class:** `H` (device-free) · **gate:**
> `proof:backend-structure` (v2, `["local","ci"]`; 7 arms + 14-bite self-test + 4 anti-evasion mutants) ·
> **preconds:** BI.W-CENSUS-RECOMPUTE.
>
> R6-FOLD cut-time directive #1: HARVEST the G9 v2 body + `greenfield-rs/pulse` witness into the standing gate,
> born-RED→GREEN ON DISK. The house close-class-lie discipline forbids claiming execution ahead of the artifact —
> the committed `proto-gates/proof-backend-structure.mjs` was v1; round-6 confirmed the v2 numbers reproduce but
> the body was PROSE. This wave makes the "executed" claim TRUE.

## §0 — Verdict

The backend twin of G2+G4, language-abstracted (edict 6). It reads the constellation's backends READ-ONLY (the
foreign-tree fence — glass-ui edits ZERO sibling tree) and reports born-RED; the RESHAPE that greens the real
siblings is each sibling's own ASK (S5). `greenfield-rs/pulse` — a self-contained reference backend — is the
GREEN witness proving the gate works before any sibling is touched. Consumes the shared
`scripts/lib/structure-predicates.mjs` (`languageSubtrees`/`infraContainment`/`dataVsLogic`) authored in
BI.W-PROOF-STRUCTURE (ONE predicate source).

## §1 — Scope (the 7 arms + FOLD6 + strict-infra-containment)

Harvest the v2 body (from proto-4's worktree, every number reproduced) into the standing gate. Seven arms:

- **(a) file-length ceiling** — `wc -l`, hard 500 / soft 300.
- **(b) grab-bag detection** — with the cohesive-leaf carve.
- **(c) layer-by-type of DOMAIN LOGIC — GENUINELY RECURSIVE at EVERY dir level** (over `walkDirs`, NOT top-level
  `readdirSync` — FOLD1 catches floridify's nested `api/{routers,repositories,services}/`, the +3 pushing
  47→49), with the DATA-vs-LOGIC split (FOLD2 — `models/`→WARN, the −1 keeping 49), the `core/`-vs-`pipelines/`
  downward-reach disambiguation (FOLD3), the `integrations/` external-adapter bucket (FOLD4), pluralize-NORMALIZE
  (FOLD5), and — the polyglot fix — **extension-filtered to the language's OWN source extensions (FOLD6,
  blocker-fold #2)**.
- **(d) depth** (T2).
- **(e) import-direction** — a per-language RESOLVER, with the **STRICT-INFRA-CONTAINMENT arm** (blocker-fold #3:
  an `INFRA_RING` file importing ANY non-infra/non-stdlib module flags — catching the pure infra→domain up-edge
  the edge-OR-pipeline scoping MISSED; `core/mod.rs → crate::metrics` leaks past both compiler and old gate).
  Directionality stays ADVISORY-strength (proto-4: a module cycle AND a `shared→domain` up-edge both compile
  clean in one Rust crate — the gate is the sole structural witness).
- **(f) god-FUNCTION advisory** — ruff `C901`/`PLR0915`.
- **(g) LANGUAGE→SUBTREE binding** (blocker-fold #2) — multi-manifest detection + per-language audit-root, so a
  polyglot repo (sci-report: Vue `app/` + Python `tools/`) audits each subtree with its OWN law, never crossed.

## §2 — The census (born-RED baseline, recomputed at cut)

| repo / subtree | violations | notes |
|---|---|---|
| floridify | **49** | 41 god + 5 grab-bag + 3 NESTED `api/`; `models/`(174 importers)→WARN; `wiktionary_parser.py` 1198 largest |
| dns-analysis (Python `src/`) | **20** | proto-4 GAP-F: previously uncensused under the first-manifest resolver |
| sci-report/`tools/` | **TBD-at-cut** | ~400-file Python backend; reached ONLY via the FOLD6 per-subtree binding |
| speedtest/server | **4** | genuinely top-level scatter (recursion does not over-fire) |
| dns-speedtest | **2** | `utils.py` god + grab-bag |
| greenfield-rs / pulse | **0** | the GREEN witness (domain-vertical packages, infra `core/`, `pipelines/` reaching domains downward) |

## §3 — Binding criteria (born-RED → GREEN)

- Born-RED: the v2 body lands, reports the census above (RED on the real backends read-only), GREEN on
  greenfield-rs/pulse. The "executed" claim is now TRUE (the artifact exists on disk).
- The **14-bite self-test ENUMERATES which bite covers which language + which arm**: python `..`, rust
  `crate/super`, ts relative; nested-scatter; data-registry-WARN; core→pipeline per-language; strict-infra-
  containment (an infra file importing a plain domain flags); the polyglot bite (a Vue-`app/`-plus-Python-
  `tools/` fixture audits each subtree with its OWN law, never crossed). FOUR anti-evasion mutants each drop to
  11/12: revert-recursion, null-rust-import-regex, force-isData-false, null-ts-import-regex.

## §4 — Fences

- **Foreign-tree fence (inv-26, LITERAL).** The gate READS the sibling backends read-only; it edits ZERO sibling
  tree. The RESHAPE greening the real siblings is deferred to the S5 ASKs.
- **FOLD4/FOLD5 hardening is a G8-precondition, not this wave.** `providers/`/`adapters/` blunt dir-name
  exemptions + the Latin `-us/-is/-sis` over-singularize caveats ship NAIVE for 5.1.0 (count-correct at the cut)
  and HARDEN before G8 promotes G9 constellation-wide (BI.W-G8-PROMOTE) — recorded, not a blocker.
- The gate is authored in glass-ui's `scripts/` but glass-ui itself has NO backend — the census is over the
  SIBLINGS; the GREEN witness is greenfield-rs/pulse.

## §5 — Cross-refs

R6-FOLD directive #1 (harvest to disk) + #6 (expanded census); blocker-folds #2 (language→subtree), #3 (strict-
infra-containment); §5.1 (the v2 folds), §5.2 (per-language notes), §6-G9, §9.13.
