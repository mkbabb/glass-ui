# The Constellation Structure Standard — TRANCHE PLAN (band/wave DAG)

> The executable Plan phase against the CANONICAL `STRUCTURE-SPEC.md` (post-round-6) + the
> `ORCHESTRATOR-ADJUDICATION.md` (settled law). Authored per the adjudication's ruling 3 ("the Plan phase is
> commissioned now against the canonical spec"). This doc writes ZERO `src/`/`demo/`/`scripts/`/`styles/`/
> `package.json`; it is a plan, not an execution. Per-wave full specs live in `waves/<wave-id>.md`.
>
> **Precedence when sources disagree:** ORCHESTRATOR-ADJUDICATION > STRUCTURE-SPEC (§0–§6 LAW, then §7–§9
> RUNBOOK) > ROUND-6-VERDICT > CODEMOD-SPEC (the round-2 codemod is STALE on two points the canonical
> corrects — `@glass` alias is DROPPED for pure-relative dropSegment, and `tabs/reka` is renamed `tabs/primitives`;
> follow the canonical). The house row/wave grammar is `docs/tranches/BG/execution/EXECUTION-PROGRESS.md §1`.

---

## §0 — Verdict + the recommended tranche + the after-cut dependency (read first)

**Recommended tranche letter/name: `BI` — codename CONSTELLATION** (the Constellation Structure Standard made
flesh: the FLATTEN of the two-tier component namespace into one flat proportioned field, recursive colocation
under the divining rod, the language-abstracted backend transposition, and the by-name sibling propagation).
Alternatives if the orchestrator prefers a less-overloaded noun: `BI — LATTICE` (a flat, regular, recursively
structured field) or the literal `BI — THE FLATTEN`. The spec-structure development happened under `BH/` because
BH is the "5.0.0-restructure" tranche; the EXECUTION is a distinct, larger, riskier body of work that lands as
its own cut.

**SEQUENCING — this tranche lands AFTER the 5.0.0 cut (the commissioning instruction, honored).** The precond is
`published(5.0.0)` = `allDone(BG.W-CUT) ∧ allDone(BH.B0..B6)` (esp. `BH.B2-export-reshape` — the `/api` drop +
the export reshape — and `BH.B4f-claude-delete`) `∧ the v5.0.0 tag live on npm via release.yml`. BI cuts as
**5.1.0** (a semver-MINOR: ZERO public-export churn — the subpath surface is untouched `src/*.ts` entry files;
the internal churn is large).

**Named contested-matter (per adjudication rule 3 — surfaced, not silently resolved).** STRUCTURE-SPEC §7 frames
the reshape as landing "in the JOINT 5.0.0 cut"; the commissioning instruction OVERRIDES to AFTER the cut. The
override is **strictly safer** and I endorse it: (a) the FLATTEN is a ~568-file + 91-dir + 229-script ATOMIC
transaction of enormous blast radius — coupling it to a user-facing publish is the exact close-class risk the
house discipline warns against; (b) POST-cut the tree is already `RATCHET_BASELINES == {}` and 500-drained (the
BG-owned breachers GlassDock 515 / DockLayerGroup 524 are carved by their live BG waves at the cut), so the
BG/BH INTERLEAVE tension §7 wrestled with DISSOLVES — BI runs on a clean, ratchet-empty tree; (c) 5.1.0's
zero-public-churn makes it a clean minor. The `/api` drop stays orthogonal, done at 5.0.0 by `BH.B2`.

**Class posture — the whole tranche is device-free (`H`), paint-neutral by construction.** The FLATTEN changes
ZERO paint (a pure path-relabel); CSS colocation is byte-identical dist cascade; the PROMOTE/FOLD reshape moves
code without touching a pixel. `proof:ba-gestalt` is the RECORDED backstop for the SINGLE paint-adjacent risk —
the non-scoped-global-SFC-block reorder (blocker-fold #6); every other wave closes on device-free `proof:*` +
the born-RED→GREEN differential. There is NO Fable/DesignSync arm (no visual surface changes). This paint-
neutrality is the flatten's strongest property and the reason a 20-wave structural tranche needs no π ladder.

**20 waves · 7 bands (S0–S6) · a linear atom-gated spine with two parallel fans.**

---

## §1 — The band DAG

| Band | Name | Concern | Waves | Greens |
|---|---|---|---|---|
| **S0** | SCAFFOLD | the born-RED gate suite + the cut-HEAD census recompute (foundations; everything born-RED before a byte moves) | 3 | authors G1/G3/G4/G5/G10 (FE) + G9 (BE) born-RED |
| **S1** | FLATTEN — ATOM A | the atomic 91-family flatten: generator swap + golden rebaseline + 9-barrel un-mix, then the physical move + scripts codemod + dead-barrel delete + domain-map | 2 | G6-golden, G7-no-tier-literal, `proof:barrel-pure`, G1-domain-map |
| **S2** | CSS — ATOM B | CSS colocation under the `index.css` order-authority: B1 file-move+walk (byte-identical), B2 gate re-point + corpus-root widen | 2 | `proof:css-colocation`, `proof:css-ownership` |
| **S3** | RECURSIVE COLOCATION | the proportion pass: PROMOTE-context + PROMOTE-primitives + FOLD census + machinery-gated README remediation | 4 | G1-globality/no-empty-segment/complexity, G4-DI/buried-primitive |
| **S4** | RESIDUE VERIFICATION | the R6-FOLD cut-time directives as explicit born-RED verification waves | 3 | G4-guts-staging, G6-block-disjoint, the differential floor |
| **S5** | SIBLING ASKS | the BY-NAME relays (foreign-tree fence) — each sibling restructures ITSELF | 4 | `proof:sibling-sideEffects`, `proof:barrel-pure` (read-only per sibling), G9 (per-subtree) |
| **S6** | CLOSE | G8 LAW-promotion + the tranche close battery + the 5.1.0 cut | 2 | `proof:full` siblings-absent, the 5.1.0 tag |

The G9-HARVEST wave (backend gate) is co-located in S0 with the FE gate wave — both are born-RED gate-authoring
— but its GREENING lives in S5 (the siblings reshape their own backends). greenfield-rs/pulse is the self-
contained GREEN witness proving the gate works before any sibling touches it.

---

## §2 — The wave roster (id · band · class · gate · preconds)

| # | wave | band | class | gate (+ self-test) | preconds |
|---|------|:---:|:---:|---|---|
| 1 | **BI.W-CENSUS-RECOMPUTE** | S0 | H | `proof:structure-census` (snapshot-vs-disk soundness; a drifted count REDs) | `published(5.0.0)` |
| 2 | **BI.W-PROOF-STRUCTURE** | S0 | H | `proof:structure` (the G1/G3/G4/G5/G10 evolution of `proof:colocation` + the shared predicate lib) | 1 |
| 3 | **BI.W-G9-HARVEST** | S0 | H | `proof:backend-structure` v2 (7 arms + 14-bite self-test + 4 anti-evasion mutants) | 1 |
| 4 | **BI.W-FLATTEN-PREP** | S1 | H | `proof:css-colocation-golden` (scoped-token-SET + one-time byte rebaseline) + `proof:barrel-pure` + `proof:bp-lazy` + `proof:vueuse-free-root` + `profile:budget` (basename-keyed) | 2 |
| 5 | **BI.W-FLATTEN-MOVE** | S1 | H | `proof:no-tier-literal` (G7) + the CLOSE BATTERY (differential resolves-on-disk + `proof:subpath-classify` + `proof:build` + `vue-tsc -p tsconfig.test` + 12 fixture gates + `@source` resolves + dead-barrel post-condition + barrel-reader re-point) | 4 *(atomic with 4)* |
| 6 | **BI.W-CSS-COLOCATE-B1** | S2 | H | `proof:css-colocation` (target-uniqueness + subtree-copy + T1b no-double-emit) | 5 |
| 7 | **BI.W-CSS-COLOCATE-B2** | S2 | H | `proof:css-colocation` (source-reader arm + `STYLE_CORPUS_ROOTS` widen) + `proof:css-ownership` | 6 |
| 8 | **BI.W-PROMOTE-CONTEXT** | S3 | H | `proof:import-boundaries` (G4 DI-context arm; +0 backward edges; −327gz ×5) | 5 |
| 9 | **BI.W-PROMOTE-PRIMITIVES** | S3 | H | `proof:import-boundaries` (G4 buried-primitive arm; byte-neutral 190→190) | 5 |
| 10 | **BI.W-FOLD-CENSUS** | S3 | H | `proof:colocation` (G1 globality T3 + no-empty-segment T4) | 5 |
| 11 | **BI.W-README-REMEDIATE** | S3 | H | `proof:colocation` (G1 machinery-gated complexity trigger + composable-at-root) | 5 |
| 12 | **BI.W-GUTS-RESIDUAL** | S4 | H | `proof:import-boundaries` (G4 cross-component-GUTS arm, warn-staged) | 8, 9 |
| 13 | **BI.W-BLOCK-DISJOINT** | S4 | H | `proof:css-colocation-golden` (non-scoped-global disjointness arm) | 5 |
| 14 | **BI.W-DIFFERENTIAL-CLOSE** | S4 | H | the born-RED DIFFERENTIAL re-run over the ACTUAL cut HEAD (every gate born-RED→GREEN; the 46-dangler prune; basename-keyed parse confirm; `@source` resolves; test typecheck; README-scope reconfirm) | 6,7,10,11,12,13 |
| 15 | **BI.W-ASK-SPEEDTEST** | S5 | H | `proof:crossrepo-asks` + read-only `proof:sibling-sideEffects`/`proof:barrel-pure`/G9 over speedtest | 3, 14 |
| 16 | **BI.W-ASK-WORDS** | S5 | H | same, over words/frontend + floridify + dns-analysis + dns-speedtest | 3, 14 |
| 17 | **BI.W-ASK-SLIDES** | S5 | H | same, over slides (proportion fence — 0 barrels, no forced feature dirs) | 3, 14 |
| 18 | **BI.W-ASK-SCI-REPORT** | S5 | H | same, over sci-report (the POLYGLOT flagship — FOLD6 language→subtree) | 3, 14 |
| 19 | **BI.W-G8-PROMOTE** | S6 | H | `proof:sibling-sideEffects` + `proof:barrel-pure` (`['ci','release']`) + the LAW→precepts promotion record | 15,16,17,18 |
| 20 | **BI.W-CLOSE** | S6 | H | `proof:full` siblings-absent (the deduped union) + the 5.1.0 cut + `proof:ba-gestalt` recorded backstop | 19 |

---

## §3 — DAG shape + the batch-3 execution schedule

**Shape:** a LINEAR atom-gated SPINE — `S0-scaffold → S1-flatten(A) → S2-css(B) → S3/S4-verify` — with TWO
PARALLEL FANS: the 4-wave PROPORTION pass (S3, fanning off the flat tree) and the 4-wave SIBLING RELAY (S5,
independent per repo) — converging on a single S6 CLOSE. The spine is atomic-serial by necessity (the flatten
touches everything; ATOM B follows ATOM A; the differential closes over all of glass-ui). The fans exploit the
≤3-concurrent rate-wall.

```
                      BI.W-CENSUS-RECOMPUTE  (1)
                         /                \
        BI.W-PROOF-STRUCTURE (2)      BI.W-G9-HARVEST (3) ─────────────┐
                    |                                                   │
        BI.W-FLATTEN-PREP (4) ══(atomic)══ BI.W-FLATTEN-MOVE (5)        │
                                                 |                      │
                                    BI.W-CSS-COLOCATE-B1 (6)            │
                                                 |                      │
                                    BI.W-CSS-COLOCATE-B2 (7)            │
                                                 |                      │
              ┌──────────────┬─────────────┬─────┴────────┐            │
        PROMOTE-CONTEXT  PROMOTE-PRIM   FOLD-CENSUS   README-REMED       │
             (8)            (9)           (10)          (11)             │
              └──────┬───────┘             |             |               │
           BI.W-GUTS-RESIDUAL(12)   BLOCK-DISJOINT(13)   |               │
                     └──────────────┬──────┴─────────────┘               │
                          BI.W-DIFFERENTIAL-CLOSE (14) ──────────────────┤
                                                 |                       │
              ┌──────────────┬──────────────┬────┴──────────────────────┘
         ASK-SPEEDTEST   ASK-WORDS    ASK-SLIDES    ASK-SCI-REPORT
             (15)          (16)         (17)            (18)
              └──────────────┴──────┬───────┴───────────────┘
                          BI.W-G8-PROMOTE (19)
                                    |
                          BI.W-CLOSE (20 — 5.1.0 cut)
```

**Batch-3 execution order (≤3 concurrent — the pipeline rate-wall lesson):**

| Batch | Waves | Rationale |
|---|---|---|
| B1 | CENSUS-RECOMPUTE | solo — establishes the cut-HEAD snapshot every later wave reads |
| B2 | PROOF-STRUCTURE · G9-HARVEST | the two gate-authoring waves, parallel (FE + BE, disjoint files) |
| B3 | FLATTEN-PREP | solo — the atomic PREP (generator + golden + barrel un-mix) |
| B4 | FLATTEN-MOVE | **solo — the atomic MOVE; NOTHING runs parallel during the flatten** (it rewrites every specifier) |
| B5 | CSS-COLOCATE-B1 | solo — the CSS file-move (byte-identical, but touches the walk) |
| B6 | CSS-COLOCATE-B2 | solo — the ~238-site gate re-point + corpus-root widen |
| B7 | PROMOTE-CONTEXT · PROMOTE-PRIMITIVES · FOLD-CENSUS | 3 parallel proportion moves (disjoint targets) |
| B8 | README-REMEDIATE · GUTS-RESIDUAL · BLOCK-DISJOINT | 3 parallel (README + the two verification enumerations) |
| B9 | DIFFERENTIAL-CLOSE | solo — the terminal born-RED differential over the whole cut HEAD |
| B10 | ASK-SPEEDTEST · ASK-WORDS · ASK-SLIDES | 3 sibling relays, parallel (independent repos) |
| B11 | ASK-SCI-REPORT | solo — the polyglot flagship (the 4th relay; G8-PROMOTE depends on it, so it CANNOT share a batch) |
| B12 | G8-PROMOTE | solo — the LAW promotion (precond = all 4 ASKs 15–18, incl. B11's ASK-SCI-REPORT) |
| B13 | CLOSE | solo — the 5.1.0 cut |

---

## §4 — Coverage of the five commissioned carries (a)–(e)

**(a) The glass-ui restructure waves** — FLATTEN + recursive colocation + CSS-under-index.css + PROMOTE-context +
machinery-gated READMEs + core.ts→runtime.ts:

| item | wave(s) |
|---|---|
| FLATTEN 91-family move (atomic) | **BI.W-FLATTEN-PREP + BI.W-FLATTEN-MOVE** (one atomic transaction) |
| recursive colocation (PROMOTE/FOLD proportion pass) | **BI.W-PROMOTE-CONTEXT · BI.W-PROMOTE-PRIMITIVES · BI.W-FOLD-CENSUS · BI.W-README-REMEDIATE** |
| CSS colocation under `index.css` order-authority | **BI.W-CSS-COLOCATE-B1 (byte-identical) · BI.W-CSS-COLOCATE-B2 (gate re-point + `STYLE_CORPUS_ROOTS`)** |
| PROMOTE-context (`dockContext` → `composables/context/`) | **BI.W-PROMOTE-CONTEXT** (−327gz ×5 routes, +0 backward edges) |
| machinery-gated READMEs (24→4) | G1 complexity trigger in **BI.W-PROOF-STRUCTURE**; remediation in **BI.W-README-REMEDIATE** (configurator/carousel/drawer/progress) |
| `core.ts` → `runtime.ts` (blocker-fold #8) | the `composables/color` un-mix in **BI.W-FLATTEN-PREP** (`composables/color/runtime.ts`, the FE own-runtime FALLBACK kind-name, disjoint from BE `core/`) |

**(b) The R6-FOLD residue as explicit born-RED VERIFICATION waves:**

| R6-FOLD directive | wave |
|---|---|
| harvest the G9 gate to disk (born-RED→GREEN on disk; the close-class-lie discipline) | **BI.W-G9-HARVEST** |
| the §2.5 guts residual enumeration (`ContinuousMarkers→HoverPopover.vue` &c., decide per-reach) | **BI.W-GUTS-RESIDUAL** |
| block-disjointness proof (the ~6 non-scoped global SFC blocks) | **BI.W-BLOCK-DISJOINT** |
| basename-keyed census confirm (`proof:css-critical` completeness parse) | **BI.W-DIFFERENTIAL-CLOSE** (clause; the emission side lands in B2) |
| the born-RED differential re-run over the ACTUAL cut HEAD | **BI.W-DIFFERENTIAL-CLOSE** |
| README-scope reconfirm at feature-interior scale (directive #5) | **BI.W-DIFFERENTIAL-CLOSE** (clause) |
| expanded backend census + FOLD4/FOLD5 hardening (directive #6) | **BI.W-G9-HARVEST** + **BI.W-G8-PROMOTE** (hardening before G8 promotes G9 constellation-wide) |

**(c) The enforcement-gate wave** — `proof:structure` evolution of `proof:colocation` + the camel-segment
predicate + language→subtree binding + strict-infra-containment: **BI.W-PROOF-STRUCTURE** authors the FE gate
suite (G1/G3/G4/G5/G10) AND the shared `scripts/lib/structure-predicates.mjs` (the `camelSegments()` matcher used
by G4's product-app domain-graduation arm; the `languageSubtrees()` binder + the `infraContainment()` predicate
consumed by G9 in **BI.W-G9-HARVEST**). ONE predicate lib, two gate families.

**(d) The per-sibling-repo ASK waves** (BY-NAME relays — the foreign-tree fence; each sibling restructures
itself): **BI.W-ASK-SPEEDTEST · BI.W-ASK-WORDS · BI.W-ASK-SLIDES · BI.W-ASK-SCI-REPORT**. glass-ui authors the
ASK + the repo-agnostic FORMULA (§7) + the per-repo instrument spec + runs the READ-ONLY census; the SIBLING
executes in its OWN repo. Content-only (inv-26); glass-ui edits ZERO sibling tree.

**(e) Sequencing relative to the 5.0.0 cut** — named in §0: precond `published(5.0.0)`; BI cuts 5.1.0; the spec's
"joint cut" framing is superseded (named contested-matter, endorsed as strictly safer).

---

## §5 — The gate register + the born-RED→GREEN ledger

Every gate is a device-free `proof:*` with self-test bites, born-RED on the pre-move tree, GREEN at its owning
move. Register assignments follow STRUCTURE-SPEC §6.

| gate | register | born-RED baseline | greened by |
|---|---|---|---|
| `proof:structure-census` | `["local","ci"]` | snapshot absent | BI.W-CENSUS-RECOMPUTE |
| `proof:colocation` (G1 extend) | `["local","ci"]` | complexity trigger flags configurator/carousel/drawer/progress; globality/no-empty-segment reds | README-REMEDIATE + FOLD-CENSUS |
| `proof:depth` (G3) | `["local","ci"]` | 5/5 prototyped | flat tree passes by construction |
| `proof:import-boundaries` (G4) | `["local","ci"]` | 25 cross-component guts reaches | PROMOTE-CONTEXT + PROMOTE-PRIMITIVES + GUTS-RESIDUAL (warn-staged residual) |
| `proof:domain-graduation` (G4 arm) | `["local","ci"]` | 3 speedtest violations (camel-segment) | ASK-SPEEDTEST (sibling reshape) |
| G5 orthogonality | `["local","ci"]` | prototyped | flat tree |
| `proof:css-colocation` (G6) | `["ci","release"]` | colocated paths ENOENT | CSS-COLOCATE-B1 + B2 |
| `proof:css-colocation-golden` (G6) | `["ci","release"]` | token-set rotates @flat until parent-scoped rebaseline | FLATTEN-PREP (rebaseline) + BLOCK-DISJOINT (disjointness arm) |
| `proof:css-ownership` (G6) | `["local","ci"]` | 5/5 prototyped | CSS-COLOCATE-B2 |
| `proof:no-tier-literal` (G7) | `["local","ci"]` | 865 literals / 229 files | FLATTEN-MOVE |
| `proof:barrel-pure` (G8) | `["ci","release"]` | 9 mixed barrels | FLATTEN-PREP |
| `proof:backend-structure` (G9) | `["local","ci"]` | floridify 49 · dns-analysis 20 · speedtest/server 4 · sci-report/tools TBD@cut · dns-speedtest 2 · pulse 0 | G9-HARVEST (gate) + the sibling ASKs (reshape) |
| `proof:no-glass-in-dist` (G10) | `["ci","release"]` | 0 today (permanent lock) | PROOF-STRUCTURE (authored; born-RED on a synthetic `@glass` src file) |
| `proof:sibling-sideEffects` (G8) | `["ci","release"]` | per-sibling | the sibling ASKs |

**The recompute-at-cut MANDATE is binding** (STRUCTURE-SPEC freshness note + R6-7): BI.W-CENSUS-RECOMPUTE
RE-COMPUTES at the ACTUAL cut HEAD — the barrel census (round-6: STABLE 9), viz membership (STABLE 9,
`useGpuSubstrate` edge ∪ {goo-filter}), family count (91 dirs / 90 barrel-bearing), the ~568 flatten-variant
specifier count, `RATCHET_BASELINES` (must be `{}` post-5.0.0-cut), the 46 pre-existing stale-ref danglers, and
the over-500 breachers (must be drained by BG). Every later wave reads THIS snapshot, never a verification-HEAD
figure.

---

## §6 — The 5 riskiest waves + mitigations

1. **BI.W-FLATTEN-MOVE** (highest blast radius, atomic-or-nothing). The 91-family move: ~568 specifier rewrites +
   229 scripts + the tests-dir mirror flatten + the dead-barrel delete. A half-migration breaks the tree. The
   exact trap is blocker-fold #5 — **the migration axis is by MOVEMENT not SPACE**: tests MOVE (recompute via
   elide-both-sides, depth −1 AND segment drop) while demo STAYS (single-side drop); mislabeling tests as a
   segment-drop overshoots root by one and typechecks RED. *Mitigation:* the CODEMOD-SPEC prototype already
   executed this end-to-end (typecheck 0); the close battery's `vue-tsc -p tsconfig.test` is the SOLE gate that
   catches the tests-recompute-vs-drop mislabel; the `@source` resolves-on-disk assertion catches the silent
   `demo.css:96-97` scan-glob break (the `menuItemVariants`/`*Variants.ts` unstyled-render class); the dead-barrel
   post-condition THROWS on a skipped unlink. Runs SOLO (batch B4).

2. **BI.W-CSS-COLOCATE-B2** (subtle, wide). The ~238 path-site gate re-point (176 the DOCK family, one uniform
   pass; 39 non-dock gates born-RED→GREEN) + the `STYLE_CORPUS_ROOTS` corpus-root widen (4 blind-spot walkers) +
   the basename-keyed `critical-partition.mjs` parse. Without B2 the close is RED on ~81 gates. The silent-failure
   class is blocker-fold #7 — a specifier-keyed (not basename-keyed) `proof:css-critical` parse false-REDs the
   instant B1 rewrites `@import "./border-progress.css"` → the colocated path. *Mitigation:* the corpus-root
   constant closes the blind spot in ONE seam (not 4); `BI.W-DIFFERENTIAL-CLOSE` confirms the basename-keyed
   parse at the cut; `gates.manifest.mjs` + `no-masking-manifest.mjs` update in the SAME pass.

3. **BI.W-G9-HARVEST** (foreign-tree + close-class-lie risk). The backend gate over POLYGLOT siblings read-only.
   The round-6 blocker #2 (FOLD6 wrong-tree audit) + blocker #3 (v2 was PROSE, not on disk; strict-infra-
   containment missed the pure infra→domain up-edge) both live here. The sci-report/tools census is
   **TBD-at-cut** (unknown until the FOLD6 per-subtree binding runs). *Mitigation:* the harvest lands the v2 body
   born-RED→GREEN ON DISK (the artifact BEFORE the claim); greenfield-rs/pulse is the self-contained GREEN
   witness; the 14-bite self-test + 4 anti-evasion mutants (revert-recursion, null-rust-regex, force-isData-false,
   null-ts-regex) prove no stub passes; the strict-infra-containment bite + the polyglot bite are added. The
   RESHAPE (greening the real siblings) is deferred to the sibling ASKs — glass-ui only READS.

4. **BI.W-ASK-SCI-REPORT** (the polyglot flagship + coordination risk). sci-report has BOTH `pyproject.toml` +
   `package.json`, a Vue `app/` FE + a ~400-file Python `tools/` backend NEVER censused. The FOLD6 binding is the
   mechanism that reaches `tools/` while sanctifying `app/views/`. glass-ui can only RELAY (foreign-tree fence);
   the sibling must restructure a backend it has never audited. *Mitigation:* the ASK is content-only + carries
   the exact FOLD6 audit-root binding + the extension-filtered stem count (a Python audit counts `.py` only,
   never `.vue`/`.md`); the born-RED census is run read-only FIRST so the sibling receives a precise violation
   list, not a vague ask; `proof:crossrepo-asks` locks the no-silent-drop completeness.

5. **BI.W-FLATTEN-PREP** (critical-path config + the value.js fence). The GLOBAL parent-scoped generator swap +
   the ONE-TIME golden byte rebaseline + the 9-barrel un-mix. The golden gate's TRUE invariant is scoped-token-SET
   identity (NOT byte-identity — the full flatten reorders SFC-fold blocks, blocker-fold #6); a naive byte-identity
   gate FALSE-REDs. The `composables/color` un-mix is the ONE case with graph impact (+1 JS chunk, 190→191, the
   value.js color-math leaf three gates fence off the eager first-paint path). *Mitigation:* the generator swap is
   EXECUTED-proven (6 real builds + live dev/HMR); the golden gate ships scoped-token-SET + a one-time byte
   rebaseline + sorted-block canonicalization; the value.js fence adds `proof:bp-lazy` + `proof:vueuse-free-root`
   + `profile:budget` (per-chunk basename-keyed DIFF, isolating the un-mix delta against the pre-existing HEAD
   red); the barrel-reader re-point clause (blocker-fold #4) re-points `proof-slider-two-only`/`proof-tabs-std`
   from `index.ts` → `variants.ts` so they don't born-RED at the cut. Runs SOLO (batch B3).

*Honorable mention:* **BI.W-BLOCK-DISJOINT** — if the ~6 non-scoped global SFC blocks are NOT pairwise
selector-disjoint, the byte rebaseline is UNSAFE and the reorder escalates to a rendering concern (sorted-block-
hash, not byte-rebaseline). `proof:ba-gestalt` is the recorded visual backstop for that single non-disjoint case.

---

## §7 — Fences (absolute) + the born-RED discipline

- **Foreign-tree fence (inv-26, LITERAL).** glass-ui reads siblings under `~/Programming` READ-ONLY as version +
  response authority; edits ZERO sibling tree. The backend reshape + sibling restructures are BY-NAME ASKs the
  sibling executes in its OWN repo. NEVER `mv`/`rm` a sibling path; NEVER a `/tmp/sibling-park` (the 2026-06-20
  park-not-restored incident). `scripts/verify-siblings-intact.mjs` runs BEFORE and AFTER any close-battery.
- **Precepts are read-only for THIS plan.** G8's LAW-promotion to the precepts submodule (§0–§6) is a RECORDED
  act BI.W-G8-PROMOTE performs at execution — the plan books it; the plan does not write precepts.
- **The BG execution engine is untouched.** This plan writes ZERO to `docs/tranches/BG/execution/
  EXECUTION-PROGRESS.md` — the orchestrator folds the BI rows. All BI plan writes stay under
  `docs/tranches/BH/spec-structure/`.
- **Clean break, no aliases (edict 7).** The flatten, FOLD/PROMOTE, CSS colocation, the barrel un-mix, the sibling
  graduations are MOVES — position-preserving where byte-identical-carve applies, gestalt-reshaping where
  structure demands. No compat shim survives. Grep-locked provenance comments carry VERBATIM into the host file.
  `@glass` is DROPPED (pure-relative dropSegment); `src` stays RELATIVE (dts self-containment, G10 permanent lock).
- **Born-RED, always.** Every structural gate lands RED on the tree it drains and GREENS at its owning move;
  BI.W-DIFFERENTIAL-CLOSE re-runs the FULL born-RED→GREEN differential over the ACTUAL cut HEAD (never a
  verification HEAD). The close runs `proof:full` siblings-absent (the deduped `local ∪ ci ∪ release` union) in a
  fresh throwaway `/tmp` worktree, NEVER by moving the user's real repos.

---

## §8 — The per-wave specs

Full house-shape specs live in `waves/<wave-id>.md`, one per wave (20 files). Each carries: the header block
(wave id · band · class · gate · preconds), the scope, the mechanism/steps, the binding born-RED→GREEN criteria,
the gate clauses + self-test bites, the scope-fences, and the blocker-fold / R6-FOLD cross-references. The
orchestrator folds each wave's born-RED cursor row into `EXECUTION-PROGRESS §1` at execution; this plan touches
ZERO execution file.

---

## COHERENCE CHECK — adversarial audit (2026-07-10)

Verdict: **SOUND-WITH-FIXES.** Completeness of the 8 blocker-folds + 6 cut-time verification directives is total
(each lands in exactly one wave); DAG is acyclic; fences are ASK-only and literal; proportion is right (no
ceremonial micro-waves, no monolith). Three defects found — two FIXED inline, one CONTESTED (needs an orchestrator
scope-ruling). Detail:

### Fixed inline

1. **DAG — batch B11 ran a wave with its own precond (`G8-PROMOTE` ← `ASK-SCI-REPORT`).** The §3 batch table put
   `ASK-SCI-REPORT` (18) and `G8-PROMOTE` (19) in ONE concurrent batch, but roster row 19 depends on 18 — they
   cannot be concurrent. The roster DAG itself is acyclic and correct; only the batch PACKING was unsound. **FIX:**
   split into B11 (ASK-SCI-REPORT solo) → B12 (G8-PROMOTE solo) → B13 (CLOSE). The 4 ASKs need ≥2 batches under
   the ≤3-concurrent wall (3+1), and G8-PROMOTE must strictly follow all four; 12 batches → 13.

2. **Completeness — `dns-speedtest` (2 G9 violations) was an orphan.** The `proof:backend-structure` census
   (§5 register + G9-HARVEST §2) born-REDs six backends: floridify, dns-analysis, sci-report/tools, speedtest/server,
   **dns-speedtest**, pulse. The four ASK waves relay speedtest+server / words+floridify+dns-analysis / slides /
   sci-report — `dns-speedtest` was named in NO ASK, so its born-RED reshape had no relay (the register's
   "greened by … the sibling ASKs" was false for it). **FIX:** homed into `BI.W-ASK-WORDS` (the Python-backend
   relay cluster) + roster row 16 updated; a name-affinity re-home to ASK-SPEEDTEST is left open to the
   orchestrator (either is fence-clean — the point is it MUST have a relay).

### Contested — needs an orchestrator scope-ruling (NOT fixed)

3. **glass-ui's OWN demo `§4-STORYBOOK` restructure has no wave AND no recorded disposition.** `§4-STORYBOOK`
   (LAW §4) names glass-ui's demo explicitly — "glass-ui's rich demo EARNS the `chassis/subtype/` taxonomy" and
   "`blob.vue` 875 + `constellation.vue` 759 → feature dirs (T1b→T1c compose)". The commissioned carry (a)
   enumerates the glass-ui restructure as src-only (FLATTEN + colocation + CSS + PROMOTE + READMEs + runtime.ts) and
   omits the demo storybook reshape; no BI wave carries it. BUT G1 `proof:colocation` SCOPE-EXTENDS to `demo/`
   (§6-G1, PROOF-STRUCTURE §1.2) and `BI.W-DIFFERENTIAL-CLOSE` re-runs G1 born-RED→GREEN over the WHOLE cut HEAD —
   so if glass-ui's demo carries un-greened G1 violations, the differential (and the close) RED with no owning wave.
   The plan must record which holds: **(i)** glass-ui's demo already satisfies G1 at the flat cut (the storybook
   chassis is in place; `blob.vue`/`constellation.vue` are G2/`proof:no-god-module` breachers owned by BG pre-cut,
   asserted GREEN by `BI.W-CENSUS-RECOMPUTE`; `chassis/subtype` is an advisory "WHEN-EARNED" recommendation G1 does
   not force) → **no demo wave owed, record the pass**; or **(ii)** a demo `§4-STORYBOOK` proportion wave IS owed
   (mint `chassis/subtype/`, escalate blob/constellation to feature dirs, apply the stories colocation ladder) —
   add it to S3. Recommend (i) with an explicit one-line disposition in §4 (a) if the demo passes G1 at HEAD; else
   (ii). This is the ONE genuine completeness ambiguity; every other mandate lands cleanly.

### ORCHESTRATOR RULING on the contested item (2026-07-10)

**Ruling: (i), census-verified — no speculative demo wave.** The BH.B3 chassis-colocation series (landed
pre-cut: `9f0a5285` + B3-δ1/δ2/δ34) already minted the storybook `chassis/{page,hero,section,landing,showcase,
code,play,family}` taxonomy at HEAD, so the demo is PRESUMED G1-conformant at the flat cut. The presumption is
made DECIDABLE, not trusted: **`BI.W-CENSUS-RECOMPUTE` (S0) is explicitly charged to verify demo/ G1 conformance
(including the `blob.vue`/`constellation.vue` proportion status) as a named census output.** CONTINGENCY: if the
census REDs demo G1, the (ii) demo `§4-STORYBOOK` proportion wave is minted into S3 at that point (the fold is a
one-row addition; the DAG holds — S3 is a fan). This converts the ambiguity into a census outcome with a named
owner; the differential close can never RED unowned. Secondary ruling: `dns-speedtest` STAYS homed in
`BI.W-ASK-WORDS` (the Python-relay cluster, as fixed) — language-cluster relays keep one coherent ask doc per
maintainer surface; the name-affinity alternative is recorded and declined.

### Notes (non-blocking, no fix required)

- **Gate-name shorthand.** §1 band table + §2 roster call `BI.W-PROOF-STRUCTURE`'s gate `proof:structure` — an
  umbrella for the suite `{proof:colocation G1, proof:depth G3, proof:import-boundaries G4, G5, proof:no-glass-in-dist
  G10}`; §5 register + the wave file use the real per-gate names. Harmless; a one-line "`proof:structure` = the
  suite {…}" gloss would remove the ambiguity.
- **`94/94` vs `90/90` subpaths.** The ADJUDICATION + ROUND-6-VERDICT narrate "90/90 subpaths resolve"; the
  CANONICAL STRUCTURE-SPEC (§3, A5) + the waves say `94/94`. Per the plan's own precedence (ADJUDICATION >
  STRUCTURE-SPEC), the 90 is a family-count/subpath-count conflation in the verdict prose — the plan CORRECTLY
  follows the canonical `94/94` (family count is 91/90; resolving subpaths 94). No defect.
- **`greenfield-rs/pulse` witness locus (fence clarity).** `BI.W-G9-HARVEST` must land pulse ON DISK born-RED→GREEN
  as a GREEN witness, and the siblings-absent close SKIPS sibling-reading gates — so pulse should be a glass-ui-
  VENDORED self-contained fixture (harvestable on-disk without touching a sibling, and present at the /tmp
  siblings-absent close via the `local` arm at G9-HARVEST time), NOT an edited/created foreign sibling tree. The
  "harvest into the standing gate" + "self-contained reference backend" phrasing implies vendored; a one-line
  statement that pulse lives under glass-ui's `scripts/proto-gates/` (or fixtures) removes the fence ambiguity.
- **ATOM-A batch split (B3/B4) vs "atomic commit."** FLATTEN-PREP (B3) and FLATTEN-MOVE (B4) are separate batches
  but "commit together as ATOM A"; the golden gate is only truly GREEN post-MOVE (`@FLAT`). This is internally
  consistent (batches = work-phases; the commit is one atomic transaction verified on the combined result) — noted
  for the executor, not a defect.
- **B7/B8 parallelism reader-overlap.** The B7 proportion trio (PROMOTE-CONTEXT · PROMOTE-PRIMITIVES · FOLD-CENSUS)
  is "disjoint TARGETS" (moved files), but their import-specifier REWRITES can touch overlapping READER files (e.g.
  a dock SFC importing both a promoted context and a folded composable) — a merge-order concern for the orchestrator
  running them concurrently, not a DAG defect. Serialize on conflict.
