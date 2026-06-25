# historical-recap — brainstorm LENS-B (cross-engine / perf-first / KISS)

> Greenfield redesign of "the HISTORICAL analysis — a recency-weighted recap of EVERY user
> request across 100+ sessions + this session, cross-checked against the wave's coverage,
> chronic/deferred folded, nothing lost." Designed from first principles through the
> **cross-engine / performance-first / simplest-mechanism** lens.
>
> The deliverable is a DOC artifact (no live UI route), so my lens transposes: the "engines"
> are Chrome and Safari → here they are **the grep/source-verifier and the human reader**;
> "frame budget" → **the verification cost** (does a claim cost a live re-check or is it a
> cheap string-fence?); "compositor-only" → **machine-checkable** (a gate can re-derive it,
> not a prose assertion that drifts). The bar is identical: FLAWLESS in both "engines",
> simplest mechanism that hits it, no false-green.

---

## 0. The core idea (one sentence)

Stop hand-maintaining a prose recap table that silently drifts (stale counts, false
"addressed" claims, the gestalt-vs-mechanism gap) and instead build the recap as a **single
flat append-only request-ledger (`REQUEST-LEDGER.jsonl`) whose every row is source-verifiable,
recency-weighted, and cross-checked against the §6 coverage ledger by a tiny derive script** —
the human-readable `HISTORICAL-RECAP.md` is a *rendered view* of that data, never the source
of truth, so the coverage % and the gap list are computed, not asserted.

---

## 1. What the corpus actually demands (read in full, de-duplicated)

I read the whole corpus: `MASTER-REQUEST-RECAP.md` (§A A1-A15 · §B · §C C1-C6 · §D media · §E
spikes · §F path-forward), `USER-FEEDBACK-2026-06-23{,-batch2,-batch3}.md` (the three refine
batches + the dock/anim overhaul), the new 2026-06-24 directives in `GREENFIELD-HARDENING-PLAN.md`
§2 (`blend-morph-engine`, `hero-overflow`, `category-landing`, the design-adherence gate),
`FOLD-LEDGER.md` (Classes A-J, 43-wave no-silent-drop), `SEED.md` (the 9-band thesis),
`union/PROMPT-RECAP.md` (R1-R22 + §B), `union/DEFERRED-CENSUS.md` (D1-D32+), the §6 coverage
ledger (every greenfield item → `delta✓`), and the binding edicts/memories.

Three structural facts dominate the design:

1. **The recap already exists in FOUR overlapping artifacts that disagree.** `MASTER-REQUEST-RECAP`
   (~62% convergence, §A-§F), `union/PROMPT-RECAP` (R1-R22 ADDRESSED/PARTIAL/NOT), `union/
   DEFERRED-CENSUS` (D1-D32 BUILD/DEFER/RETIRE), and `FOLD-LEDGER` (Classes A-J). They cover
   different request-universes (the discharge tail vs the video/dock asks vs the deferred-fold)
   and use three different status vocabularies. **The greenfield's first job is to UNION them
   into ONE ledger with ONE vocabulary** — not author a fifth table that drifts from the other
   four. This is the DRY law applied to documentation.

2. **The corpus already records its own false-green failures.** batch3 A1: "nav docks NOT fixed —
   the judge passed but the user STILL sees it" (gestalt-vs-mechanism). The wave-spec-audit ORCH
   RULING: "PASS-2/PASS-3 shipped as the EXACT fake-gate fraud the corpus bans (a GREEN cell from
   the string 'warm floor' appearing anywhere)." `feedback_live_verify_capture`: "'live-verified'
   needs a captured DELTA artefact, not a commit-message claim." **A recap that marks rows
   "addressed" from a prose keyword is the same fraud.** My lens makes the verification mechanism
   first-class: each row carries HOW it was verified and at what cost.

3. **Everything is already converged in the §6 ledger** — every greenfield item reads `delta✓`
   except `icons/iconchip` (todo), the `configurator` sub-note (todo→now done), and
   `historical-recap` itself (this task). So the coverage cross-check is mostly a JOIN against an
   existing source-of-truth, not fresh adjudication. The honest output is high coverage *with the
   2-3 real gaps flagged loudly*, not a padded 100%.

---

## 2. The mechanism — one append-only ledger + a derive script (KISS)

### 2a. `REQUEST-LEDGER.jsonl` — the single source of truth (flat, append-only)

One JSON object per line, one line per atomic user request/precept/bug. JSONL (not a giant JSON
array) because it is **append-only and diff-friendly** — a new session's requests append at the
end, never re-flow the whole file (the same reason the FOLD-LEDGER is no-delete: rows are
immutable, dispositions FLIP in place via a new field, never a row rewrite). Schema:

```jsonc
{
  "id": "R-A7",                       // stable id; §-prefix preserves provenance
  "session": "2026-06-23",            // or a session-arc label; drives recency weight
  "verbatim": "Dock demo audit — contextual switching/prototyping; the docks DO NOT SPLIT",
  "intent": "generalized splittable liquid dock (V/H, arbitrary sub-dock)",
  "kind": "feature|bug|precept|process|media",
  "recency": 1.0,                     // COMPUTED, not authored (see 2c)
  "covered_by": ["dock-core", "dock-fission", "dock-hub", "blend-morph-engine"],
  "coverage": "ADDRESSED|PARTIAL|GAP|DEFERRED|RETIRED",
  "verify": {                         // the anti-false-green field — HOW, not just THAT
    "kind": "source|grep|live-paint|delta-artifact|cross-ref|none",
    "cite": "greenfield/dock-core/DELTA-ASSAY.md::delta✓ + §6 ledger row 'dock-core'",
    "cost": "cheap-string|join|live-recheck"
  },
  "chronic": true,                    // raised across >=2 sessions/tranches
  "supersedes": ["R5","R9","R13","R22"]  // dedup chain across the 4 prior artifacts
}
```

**Why this hits the "both-engines" bar:**
- **Reader-engine (human):** `HISTORICAL-RECAP.md` renders from the JSONL as a clean table,
  recency-sorted, grouped by band — readable, never the drift source.
- **Verifier-engine (grep/gate):** a tiny `derive-recap.mjs` (≤120 lines, no deps) reads the
  JSONL, JOINs `covered_by` against the §6 ledger's `delta✓` set + the wave files on disk,
  recomputes `coverage`, and **fails loud on any row whose asserted `coverage:"ADDRESSED"` cites
  a wave/greenfield-item that does NOT exist on disk or is NOT `delta✓`** (the false-green fence).
  This is the documentation analogue of "compositor-only": the truth is re-derivable by a machine,
  never trapped in prose.

### 2b. The derive script (the cheap verifier — the perf budget)

```
node derive-recap.mjs
  → reads REQUEST-LEDGER.jsonl
  → reads the §6 coverage set (parse the ledger table: item → delta✓|todo)
  → reads ls greenfield/*/DELTA-ASSAY.md + waves/*.md (existence check)
  → for each row:
       coverage=="ADDRESSED" requires EVERY covered_by ∈ {delta✓ items} ∪ {existing waves}
       else → auto-downgrade to GAP + emit a WARN line  (born-RED on a false claim)
  → recompute coverage% = (ADDRESSED + RETIRED) / (all non-DEFERRED)
  → render HISTORICAL-RECAP.md  (the human view)
  → render GAP-REPORT.md         (only GAP rows + the new-wave proposal)
  → exit 1 if any asserted-ADDRESSED row fails the join (the gate)
```

The cost is one file read + one `ls` + an in-memory join — **"cheap-string / join" budget, never
a live re-check**. That is the perf-first move: the recap NEVER needs to boot a browser to prove
coverage, because coverage is a JOIN against artifacts that were *already* live-paint-verified at
their own greenfield close (each `DELTA-ASSAY.md` carries the captured delta — `feedback_live_
verify_capture` satisfied once, upstream, not re-paid here). The recap inherits their proof by
citation; it does not re-litigate it. This is the analogue of "the static SVG goo filter is
authored once and every consumer references it" — verify-once, cite-many.

### 2c. Recency weight — COMPUTED, not editorialized

The user law: "BIAS and WEIGHT placed on the most recent ones." Make it a function, not a vibe:

```
recency(session) = 0.5 ^ ((today - session_date) / HALFLIFE_DAYS)   // HALFLIFE = 14d
this-session rows → recency 1.0 ;  06-23 batch3 → ~0.93 ;  100-sessions-ago → ~0.0
```

The ledger renders **recency-descending within each coverage class**, and the GAP-REPORT sorts
GAPs by `recency` so the freshest unmet asks float to the top. A chronic item (raised ≥2
sessions) gets `max(recency)` of its occurrences PLUS a `chronic:true` flag — so a thing asked
100 sessions ago AND last week is weighted by last week, not buried by its first mention. This is
the simplest mechanism that honors "recency-weighted" without hand-ranking 200 rows.

### 2d. The dedup `supersedes` chain (nothing lost, nothing double-counted)

The four prior artifacts overlap heavily (e.g. dock-split is `MASTER §A A7` ≈ `union R3/R9/R22` ≈
batch3 A10/A13). Rather than delete duplicates (violates no-silent-drop), each canonical row lists
its `supersedes:[...]` ids; the superseded ids stay in the JSONL with `coverage:"RETIRED",
verify.kind:"cross-ref"` pointing at the canonical id. The derive script asserts **every id in
every prior artifact appears either as a canonical row or in some `supersedes[]`** — the
no-silent-drop fence, mechanized. Coverage % counts canonical rows only.

---

## 3. The cross-engine carve — Chrome AND Safari, transposed to the verification engines

My binding lens-lens is "flawless in Chrome AND Safari." For a doc deliverable the two "engines"
that must BOTH pass are:

- **The grep/gate engine** (the machine that re-derives truth): served by the JSONL + derive
  script + the false-green join — re-derivable, born-RED on a stale claim, exit-1 gate. ✓
- **The human reader engine** (the user who said "ensure NOTHING is lost"): served by the rendered
  `HISTORICAL-RECAP.md` (recency-sorted, band-grouped, every row → its covering greenfield item or
  a loud GAP flag) + `GAP-REPORT.md` (the short honest list of what is NOT yet covered). ✓

The recap is "flawless on both engines" exactly when the two views can NEVER disagree — because
the human view is *rendered from* the machine-checked data. There is one source, two renders. That
is the documentation form of "the SDF field math is shared; the engine abstracts the raster
backend" — share the data, abstract the view.

**The actual cross-engine items in the corpus** (Safari/WebKit asks — R17 "validate morphing on
Safari" asked 2×, batch3 C1 "does NOT work on SAFARI", D7 "Safari ZERO real verification asked 3×",
the blend-morph-engine "SAFARI must work, Chrome-only NOT an option") get a **dedicated
`tags:["safari"]` facet** in the ledger so the GAP-REPORT can emit a *Safari-coverage sub-report*:
every cross-engine ask → its covering wave's Safari arm (`BF.W-SAFARI-CAPTURE`, `BF.W-GOO-SPLIT-
PERF`, the blend-morph-engine dual-arm Houdini+WebGL2). This is the one place the recap itself must
respect the cross-engine bar in CONTENT, not just in form — and it does, as a queryable facet, not
a buried prose line.

---

## 4. The chronic / deferred fold (Classes A-J → ledger rows, mechanized)

The `FOLD-LEDGER.md` Classes A-J and `union/DEFERRED-CENSUS.md` D1-D32 are ALREADY the chronic/
deferred census with dispositions. The greenfield does NOT re-author them — it **ingests them as
ledger rows** with `kind:"deferred"|"chronic"`, `coverage:"DEFERRED"`, and `verify.cite` pointing
at the FOLD-LEDGER class. The derive script asserts **every FOLD-LEDGER row and every DEFERRED-
CENSUS D-row has a corresponding ledger row** (the union-completeness fence — the same gate
`proof:bd-fold-ledger` already promises: items == expectedCount). A chronic item that has NOW been
addressed by a greenfield (e.g. D1 the 5-way rAF re-fork → `blend-morph-engine` unifies it; D3 V↔H
crossfade-facsimile → `dock-core`/`blend-morph-engine`) FLIPS `coverage:"DEFERRED"→"ADDRESSED"` in
place with the new `covered_by` — the disposition flip, never a row delete.

**The fold is therefore a JOIN, not re-adjudication:** the historical-recap's deferred section is
`SELECT * FROM ledger WHERE kind IN (chronic,deferred)`, rendered, with each row's current
disposition re-derived from `covered_by` ∩ `delta✓`. Cheap, honest, complete.

---

## 5. The gap report — the honest residual (the recap's real value)

Coverage is high (§6 is nearly all `delta✓`), so the recap's worth is the SHORT, LOUD gap list.
From the corpus cross-check, the genuine residual GAPs my lens flags (born-RED until covered):

- **G1 — `icons/iconchip`** — §6 ledger status `?→todo` (the one un-converged Band-B item).
  Several requests touch it (IconChip glass, the `+N` stacked-icon EXCISE in glass-atoms, the
  dock-item icon presence R12). → new wave-item `icons-iconchip` OR fold the residual into
  `glass-atoms` + `dock-core` and converge. **Flag, do not paper over.**
- **G2 — the `configurator` sub-note** — `timeline (configurator: todo)` — the per-page
  configurator/gallery convergence rode under `configurator-presentation` (now `delta✓`) but the
  ledger still carries the `timeline`-row `configurator: todo` annotation. → assert it is
  discharged by `configurator-presentation` `delta✓`, else flag.
- **G3 — `/dock/morph-showcase` BROKEN** (blend-morph-engine directive: "USER: BROKEN, only the
  teardrop preview works") — a DIAGNOSE+FIX ask folded into `blend-morph-engine` (`delta✓`); the
  recap must assert the diagnose-arm is in the amendment, not just the engine spec.
- **G4 — the EXECUTION gap (meta)** — EVERY row is tranche-DEV `delta✓`, i.e. *spec-converged, not
  built*. The single most important honest flag: coverage % is "design-coverage," and the user's
  "ensure they have been ADDRESSED" is satisfied at the PLAN level only. The recap must state this
  in its headline so no row's `ADDRESSED` is mis-read as "shipped." (This is the `union/PROMPT-
  RECAP` ADDRESSED-means-"shipped-engine-+-owning-wave" vs design-coverage distinction, made
  explicit.)

Each GAP row carries a concrete disposition: a named existing wave to fold into, or a proposed new
wave-item, never a bare "TODO." The GAP-REPORT is the deliverable the user actually reads.

---

## 6. Deft integration — a UNION, never a fifth table (the no-fork law)

The boldest restraint: **author ZERO new prose recap tables.** The greenfield's artifacts are:

1. `REQUEST-LEDGER.jsonl` — the one source of truth (unions the 4 prior artifacts via `supersedes`).
2. `derive-recap.mjs` — the ≤120-line zero-dep verifier+renderer (the gate + the view-generator).
3. `HISTORICAL-RECAP.md` + `GAP-REPORT.md` — RENDERED, regenerated, never hand-edited.

This composes the EXISTING ecosystem deftly: it reuses the §6 ledger as the coverage truth, the
`DELTA-ASSAY.md` files as the inherited live-paint proof, the FOLD-LEDGER classes as the deferred
census, and `proof:bd-fold-ledger`'s items==expectedCount discipline as the completeness gate. It
adds ONE small mechanism (the JSONL + derive join) and RETIRES the drift surface (the four prose
tables become read-only prior-art that the JSONL `supersedes` — the same clean-break, no-legacy
move the corpus mandates: keep what is fit, the data; re-invent what is broken, the hand-maintained
prose). No backwards-compat alias, no migration shim — the prior tables are cited as provenance and
frozen.

---

## 7. The boldest move (the single one)

**Make "addressed" a JOIN that fails loud, not a word someone typed.** The chronic disease across
this entire corpus — recorded by the corpus itself — is the false-green: "the judge passed but the
user still sees it" (batch3 A1), "a GREEN cell from the string 'warm floor' appearing anywhere"
(wave-spec-audit ruling), "live-verified is a commit-message claim, not a captured delta"
(`feedback_live_verify_capture`). The recap is the LAST line of defense against losing a request,
and a recap that marks rows green from prose is the very fraud it exists to catch. So the boldest
move is to **forbid a hand-typed `coverage:"ADDRESSED"` from surviving** — the derive script
overwrites every asserted coverage with the JOIN result (covered_by ∩ §6-delta✓ ∩ waves-on-disk),
auto-downgrades any unbacked claim to `GAP`, and exits 1. The recap cannot lie, because its own
gate re-derives the truth on every run and the human view is rendered from that re-derived truth.
A perfect, honest, recency-weighted recap proving every ask is covered (or loudly flagged) — by
construction, not by assertion.

---

## 8. PRM / a11y / degrade carve (the doc analogue)

No motion, no GL — N/A in the literal sense. The transposed "graceful degrade": if the §6 ledger
or a `DELTA-ASSAY.md` is ABSENT at derive time (e.g. mid-tranche, an item not yet greenfielded),
the join must DEGRADE to `coverage:"GAP"` for that row + a `WARN: source absent`, never silently
treat-as-covered — the born-RED-on-absence floor (the documentation form of "default-to-broken-on-
Safari = auto-FAIL"). The recap is always honest about its own incompleteness; an absent proof is
a GAP, never an assumed pass.

---

## Convergence self-estimate (this lens): ~80%

Risks for the golden/challenge to resolve: (a) the exact ID-reconciliation map across the 4 prior
artifacts (~200 rows to union — mechanical but laborious; the `supersedes` chains must be complete
or the no-drop fence reds); (b) whether `derive-recap.mjs` should be a real wired gate
(`proof:historical-recap`) or a one-shot generator (my lens says wired — it is cheap and it is the
only thing that keeps the recap from re-drifting); (c) the recency half-life constant (14d is a
guess; the golden should anchor it to the actual session cadence). The cross-engine/perf bar is
fully met: the recap is re-derivable, cheap, born-RED on false-green or absent-proof, and its two
views (machine + human) cannot disagree.
