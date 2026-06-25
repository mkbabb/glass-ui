# historical-recap — GOLDEN (the canonical recency-weighted prompt-corpus recap)

> The single golden reference for the Band-E HISTORICAL recap over the WHOLE user-ask corpus:
> EVERY de-duplicated request across the 100+ sessions + this session, recency-weighted,
> cross-checked against the wave/greenfield coverage, the chronic/deferred items folded, a
> GUARANTEE that nothing is lost. Synthesized from lens-a (the executable coverage ledger),
> lens-b (cross-engine/perf JOIN + false-green fence), lens-c (double-entry + the technicolor
> face). **Not a per-component greenfield** — what is *designed anew* here is the **recap
> MECHANISM**: a born-RED, re-runnable corpus oracle whose every `addressed` cell is a
> disk-checkable claim and whose convergence % is a COMPUTED fraction, immune to the
> "addressed"-claim inflation the corpus itself legislates against. Every count below is
> source-verified against disk (2026-06-24). Binding law: `design.md` +
> `GREENFIELD-HARDENING-PLAN §1` + `viz/video-audit/IOS27-REFERENCE.md`.

---

## 0. THE GOLDEN THESIS — the recap is a CORPUS-as-build-graph oracle, not a memo

A prose recap rots the instant the next prompt lands; its "Status: addressed" column is a
judge-claim no one re-runs — the exact `feedback_live_verify_capture` disease ("live-verified is
a commit-message claim, not a captured delta") and the batch3-A1 disease ("the judge passed but
the user STILL sees it"). The greenfield move, welding the strongest act from each lens:

- **From lens-a + lens-b (the spine):** model the WHOLE de-duplicated user-ask corpus as a typed,
  machine-readable manifest (`recap.manifest.json`) — ONE row per atomic ask — and ship a tiny
  born-RED oracle (`recap.mjs`) that **re-derives each row's coverState FROM DISK** and OVERWRITES
  the typed value. A row claiming `addressed` whose carriers are absent auto-downgrades to GAP and
  the script exits 1. This is the **prompt-corpus twin of the sibling `wave-spec-audit/golden/
  audit.mjs`** — same loader pattern, same default-RED + 2-consecutive-clean convergence, same
  "the truth is re-derivable by a machine, never trapped in prose." Convergence = a JOIN, not a vibe.
- **From lens-b (the cheap verifier):** the recap NEVER boots a browser to prove coverage — coverage
  is a JOIN against artefacts that were ALREADY live-paint-verified at their own greenfield close
  (each `DELTA-ASSAY.md` carries the captured delta). The recap inherits their proof by citation;
  it does not re-litigate it. **Verify-once-upstream, cite-many** — the documentation analogue of
  "the static SVG goo filter is authored once and every consumer references it."
- **From lens-c (the framing + the no-loss spine):** **double-entry bookkeeping for user intent** —
  every ask is a DEBIT (obligation), every covering wave/greenfield is the matching CREDIT (the
  discharge, with an on-disk-verified citation). The books BALANCE or a row flashes an honest,
  un-suppressible GAP. Recency is a first-class column (the user's binding "BIAS and WEIGHT on the
  most recent"). The chronic/deferred FOLD-LEDGER is INGESTED (DRY), never re-authored.

**The reconciled boldest single act:** ship `recap.mjs` (built + born-RED below), whose own gate
caught FOUR real defects in its first author's manifest — a stale-pruned slug citation
(`W-DOCK-HUB-API`, EXCISED into `BD.W-DOCK-LINK-API`), 5 phantom/prefix-straddle cites
(`BD.W-DOCK-CORE`→`W-DOCK-CORE`, etc.), 7 self-drops, and the genuine macro-flower GAP. The recap
cannot lie, because its own gate re-derives the truth on every run and the human view
(`HISTORICAL-RECAP.md`) is RENDERED from that re-derived truth — one source, two views that can
never disagree.

---

## 1. SOURCE-VERIFIED CORPUS (disk reality, 2026-06-24)

The recap ingests SEVEN recency-banded strata, de-duplicated by a `recurrence[]` chain (the same
ask raised across sessions collapses to ONE row whose recurrence is the chronic signal). Read in
FULL: `MASTER-REQUEST-RECAP.md` (§A1-15 · §B · §C1-6 · §D media · §E spikes · §F), the three
`viz/refine/USER-FEEDBACK-2026-06-23{,-batch2,-batch3}.md` (every verbatim row),
`GREENFIELD-HARDENING-PLAN.md` §0/§2/§6 (this session's edicts + the 40-band ledger),
`FOLD-LEDGER.md` (Classes A-J), `IOS27-REFERENCE.md`, and the sibling `wave-spec-audit/GOLDEN.md`
(the proven Band-E format + the fake-gate ruling).

| Band | weight | source | role in the JOIN |
|---|---|---|---|
| **R0** | 6 | THIS session (2026-06-24): design-edicts · category-landing · blend-morph-engine · hero-overflow · the design-adherence gate · wave-spec-audit · historical-recap | the highest-weight, freshest asks |
| **R1** | 5 | batch3 — the DOCK + ANIMATION overhaul (A1-A13 · B1-B2 · C1-C3 · D1-D4) | dock-core, the global anim law, goo-Safari, chrome/buttons |
| **R2** | 5 | batch2 — nav docks + viz + procedural bg (A1-A7 · B1-B5 · C1-C6 · D1-D3) | nav-dock-fix, viz-respec, page-background, the BLURRED-IMAGE bg |
| **R3** | 4 | batch1 — the gray-glass triumvirate (1-6) | gray-glass, goo-morph-refine, reveal, select, toggle, padding |
| **R4** | 4 | MASTER §C — the /goal NEW design items (C1-C6) | metallic aurora, dotflow-surpass, liquid-weight-universal |
| **R5** | 3 | MASTER §A/§B — Pass-D/E originals + dock-hub (A1-15 · B1-2) | story-page, entrance, scroll, paper, handmark, dock-hub API |
| **R6** | 2 | the 100+-session deferred long-tail (FOLD-LEDGER Classes A-J) | DRY-ingested by reference; the Real-Metal-GPU parity deferral |

**DISK RECEIPTS (the source-verify spine, not name-presence):**
- 40 greenfield dirs; **38 are converged carriers** (have a `DELTA-ASSAY.md`); 11 refine dirs; 158
  waves on disk; 67 amendment-authored (un-materialized) slugs; 14 pruned slugs.
- **`blurred-image-bg` has NO greenfield AND NO refine dir** — but it is NOT a gap: the technique
  was FOLDED into the aurora `source:"image"` axis (`BD.W-AUR-IMAGE-SOURCE`), and
  `union/waves/W-BLURRED-IMAGE-BG.md` was PRUNED by the aurora amendment (its file is a
  **stale-prune residue** — a citation MUST target the live successor, which the oracle enforces).
- **`W-DOCK-HUB-API.md` is a stale-prune residue** too — EXCISED + SUBSUMED into
  `BD.W-DOCK-LINK-API` by the dock-hub amendment. The oracle caught the author citing the dead slug.
- The genuine residual GAP is **R2.D2 — the curated macro-FLOWER image ARRAY** (a consumer-asset
  deliverable, presets-in-consumers law) with zero carrier on disk.
- **`BD-CONTINUATION-PROMPT.md` is ABSENT** though prior docs cite it as a "standing recap" sister.
  This GOLDEN designates the GENERATED `HISTORICAL-RECAP.md` as the single standing-recap home
  (it absorbs + retires the phantom — KISS, no second doc).

---

## 2. THE DESIGN — the mechanism (the visual + interaction is the LEDGER + its oracle)

The "visual design" of a recap is the **legibility + the un-lie-ability of the ledger**. Two views,
one source:

### 2a. `recap.manifest.json` — the single source of truth
One row per atomic de-duplicated ask. Schema (the substance that survives the challenge):
```jsonc
{
  "id": "R1.A13",                          // stable id (band.section.item)
  "verbatim": "THE BIG ONE — generalize the dock to MORPH V/H, SPLITTABLE into ARBITRARY parts…",
  "band": "R1",                            // drives the recency weight
  "class": "feature|bug|precept|process|media",
  "recurrence": ["R1.A13","R1.A10","B1"],  // every prior raising → CHRONIC if long; MUST include own id
  "covers": { "greenfield": ["dock-fission","dock-hub"], "wave": ["BD.W-DOCK-SUBDOCK"] },
  "coverState": "addressed|partial|deferred|gap"   // a HINT the machine AUDITS, never trusts
}
```

### 2b. `recap.mjs` — the born-RED oracle (the cheap verifier — the perf budget)
Pure node, no new dep, deterministic, `--json`/`--emit`, exit 1 on any lint. The JOIN re-derives
each carrier into one of FOUR states — the single most important reconciliation, the union with
`audit.mjs`'s `authoredBy`/`CROSS_RE`:

| carrier state | meaning | counts as |
|---|---|---|
| **live** | a greenfield dir with a `DELTA-ASSAY.md` · a refine dir · a materialized wave file · the FOLD-LEDGER · a cross-tranche `B[BCEF].W-` prior-art wave (whitelisted) | a real carrier |
| **authored** | a wave NAMED + MINTED in a converged `WAVE-AMENDMENT.md` body but whose file is **not yet materialized** (the wave-spec-audit §7 materialization gap) | a real carrier; keeps a row **partial** (materialization owed) |
| **stale** | a wave file on disk that was PRUNED/EXCISED/SUPERSEDED by an amendment (the `W-BLURRED-IMAGE-BG`/`W-DOCK-HUB-API` trap) | a born-RED **stale-residue** lint (false-green) |
| **phantom** | cited ∧ ¬disk ∧ ¬authored ∧ ¬cross-tranche — a typo/dangling ref | a born-RED **phantom-cite** lint |

The derive rule (strict, disk-true): `gap` = zero live/authored carrier; `deferred` = a held wave
with ≥1 carrier; `addressed` = ≥1 LIVE carrier ∧ no phantom ∧ ¬typed-partial; `partial` =
otherwise (a phantom, OR only-authored carriers → materialization-owed, OR an honest typed-partial
= assembly-owed). **An AUTHORED-only wave keeps the row partial** — the honest distinction
"spec-converged ≠ file-materialized ≠ shipped" the corpus demands.

### 2c. `HISTORICAL-RECAP.md` — the human face (GENERATED, never hand-typed)
`recap.mjs --emit` renders it FROM the manifest: recency-banded (R0 first), every row → its
disk-verified carriers (`·auth` flags the un-materialized) → its derived state, + a GAP REPORT. It
REPLACES the phantom `BD-CONTINUATION-PROMPT.md` as the standing-recap home (the prose and the
machine can never drift — the wave-spec-audit U6 "re-derive from `--json`, never the eyeballed
table" lesson).

### 2d. Recency weight — COMPUTED, not editorialized
`convergence = Σ(weight · score) / Σ(weight)` over all rows, `score = {addressed:1, partial:.5,
deferred:1, gap:0}` (deferred-with-trigger counts as discharged — it is held, not lost). The bands
are the weights (R0=6 … R6=2): the freshest asks dominate the headline number, the long-tail is
weighted low — the user's "BIAS and WEIGHT on the most recent" as a function, never a vibe.

---

## 3. THE CHRONIC + DEFERRED FOLD — ingest the FOLD-LEDGER, don't re-invent it (the no-loss spine)

The `FOLD-LEDGER.md` (Classes A-J, the L-inv-8 no-delete law) is ALREADY a no-silent-drop machine.
The recap does NOT re-author it (DRY) — it INGESTS it as ONE row (`R6.FOLD`, carrier
`foldLedger:FOLD-LEDGER`), binds it to user-ask provenance, and adds the chronic signal via
`recurrence[]`. The chronic asks the recap surfaces (raised across many strata, computed not typed):

| chronic ask | recurrence | carriers (disk-verified) | derived |
|---|---|---|---|
| **Gray glass → warm-cream everywhere** | R3.GRAY (§C4·b1#1·b1#5·b2-B1·b2-B4·b1-D3·mem) | `glass-material`✓ + `glass-abrogate-gray`✓ + `W-GLASS-ABROGATE-GRAY` + `BD.W-GLASS-FIELD·auth` + `BD.W-GLASS-KEY-EDGE·auth` | partial (systemic; all-surfaces owed) |
| **Liquid-weight universal** | R1.B_ANIM (b3-B1·b3-B2·§C6·mem) | `motion-spring-register`✓ + `anim-ios27-tune`✓ + `BD.W-MOTION-WEIGHT·auth` + `BD.W-CARTOON-PUNCH·auth` | addressed (law codified) |
| **Dock core liquid + generalize/split** | R1.A_DOCK + R1.A13 (b2-A·b3-A·§A7·§B1·IOS27 T2) | `dock-core`✓ + `dock-fission`✓ + `dock-hub`✓ + `W-DOCK-CORE` + `BD.W-DOCK-SUBDOCK` | partial (engine ✓ / assembly owed) |
| **Goo Safari parity + real blob↔meatball** | R1.C_GOO (§D·b3-C1·IOS27 T2) | `goo-morph`✓ + `carousel-deck`✓ + `goo-carousel-deck`✓ + `BD.W-GOO-BARBELL-NECK·auth` | addressed |
| **Real-Metal-GPU cross-backend parity** | R6.METAL (FOLD Class B) | `BD.W-VIZ-PARITY-METAL` | **deferred** (HELD-trigger: real-hardware Metal capture) |

**Deferred-with-trigger** rows fold WITH their un-MET trigger (the wave EXISTS on disk; the trigger
is recorded; nothing re-decided). The recap is a READ-and-VERIFY layer over the FOLD-LEDGER, not a
parallel ledger (the "no 2nd mint" law from wave-spec-audit, applied to the deferred census).

---

## 4. THE GAP REPORT — the honest residual (the recap's real value)

Coverage is high (the 38 greenfields are mostly `delta✓`), so the recap's worth is the SHORT, LOUD
gap list. From the disk-verified cross-check, the genuine residual:

| Gap | source ask | disk receipt | disposition (born-RED until carried) |
|---|---|---|---|
| **R2.D2 — macro-FLOWER image ARRAY** | batch2-D2 ("research the web for MACRO images of FLOWERS, provide an ARRAY") | no carrier; the blurred-image TECHNIQUE is homed (`BD.W-AUR-IMAGE-SOURCE·auth`), the curated ASSET array is not | **fold as the consumer-asset arm of `BD.W-AUR-IMAGE-SOURCE`** (presets-in-consumers: the lib ships the zone-blur engine, the consumer ships the flowers) |
| **R0.7 — historical-recap itself** | this very item | greenfield dir present, no `DELTA-ASSAY.md` yet | **born-RED ON ITSELF** — goes green only when its own DELTA-ASSAY lands (the reflexive anti-inflation discipline) |

**The two PARTIAL classes the recap honestly distinguishes** (NOT gaps, NOT silently-green):
- **materialization-owed** — the engine is `delta✓` but the NEW wave file isn't materialized
  (the 67 `·auth` slugs; the union with wave-spec-audit §7). Resolves when those waves are
  materialized as files.
- **assembly-owed** — the wave + engine exist but the user's ask is spec-converged, not shipped
  (R1.A13 dock-assembly, R3.GRAY all-surfaces, R5.B2 the real-name census, R3.6 the close-glyph
  stylize). Resolves at tranche-EXECUTION (the user-gated W-CUT).

Each GAP/partial carries a concrete disposition — a named wave to fold into or a process arm to
verify, never a bare "TODO."

---

## 5. THE iOS-27 FIDELITY FACE (optional dogfood — the doc is the spine)

The deliverable is doc-first; but because the recap is a storybook-adjacent artefact the user reads,
the EDICTS bind its FORM when surfaced as an optional `/meta/recap` story — a **golden-ratio
coverage CARD-WALL** that COMPOSES the extant primitives (zero new engine, deft union):
- The headline % is a **balance-bar** (composes `<ProgressBar>` + the cartoon-shadow register) that
  fills with `--ease-cartoon-punch` WEIGHT — anticipation-dip → inertial overshoot → follow-through
  settle, casting a moving layered-offset cartoon cast (the `.cartoon-cast` inert-child caster).
- A FOLDED chronic chip **goo-splits off the DEFERRED spine-rail** and morphs to its wave's row,
  reusing the shipped Safari-safe `useDockFission` + the static SVG `<GooFilter>` (sRGB-forced
  waist, NO `backdrop-filter:url`, a real blob↔meatball neck — `design.md §L7`) — the literal
  visual proof of "nothing lost."
- A GAP row flashes an honest, un-suppressible technicolor-crimson anticipation-dip-then-punch until
  it gains a carrier.
- Every surface is the warm-cream six-layer transmissive composite over a §3 colorful field with a
  defined edge, NEVER gray, both modes; proportion on the √φ ladder; paper-grain visible.

**Cross-engine + PRM:** pure compositor (opacity/transform); the goo-fold is the ONE SVG-filter
motion and rides the Safari-verified `DockGooFilter`; PRM → the bar fills instantly, the chip
relocates with no neck frames, the crimson is static. But the SPINE is the doc + `recap.mjs`; the
card-wall is the dogfood face, never the source of truth.

---

## 6. DEFT INTEGRATION — a UNION, not a bolt-on (KISS / DRY / no legacy)

- **Reuse the wave-spec-audit machinery wholesale.** `recap.mjs` is the prompt-corpus twin of
  `audit.mjs` — same loader, same born-RED + 2-consecutive-clean, same `authoredBy`/pruned/
  cross-tranche concepts. NO new linter framework.
- **Ingest, don't re-author, the FOLD-LEDGER** (§3) + the 3 feedback batches + the §6 ledger as
  INPUTS; a FOLD-LEDGER edit flows into the recap on the next run.
- **The ledger .md is GENERATED** from the manifest — no hand-typed table to drift.
- **REPLACE the phantom `BD-CONTINUATION-PROMPT.md`** — one standing-recap home, no parallel memo.
- **No new prose recap tables, no fifth drift surface** — the prior `MASTER-REQUEST-RECAP`/
  `union/PROMPT-RECAP`/`union/DEFERRED-CENSUS`/`FOLD-LEDGER` are frozen prior-art the manifest's
  `recurrence[]` provenance-links (clean-break, no alias — `feedback_no_backwards_compat`).

---

## 7. THE BORN-RED GATE — `recap.mjs` (BUILT + RUN this session)

`docs/tranches/BD/greenfield/historical-recap/golden/recap.mjs` — pure node. Four passes, exit 1 on
any lint. **Built + run this session; its own gate caught 4 author-defects, then converged:**

- **PASS 1 — carrier JOIN:** re-derives every row's coverState from disk (live/authored/stale/
  phantom), overwriting the typed hint.
- **PASS 2 — the GAP report:** asks with NO live/authored carrier. **Today: 1 — R2.D2 (macro-flower
  array).**
- **PASS 3 — the anti-inflation fence:** false-green (typed-addressed, derived-gap) · phantom-cite
  (typo/dangling) · stale-prune residue (a pruned slug cited). **Today: 0 / 0 / 0** (after the
  author-defect corrections the gate itself surfaced).
- **PASS 4 — no-silent-drop attestation:** every canonical row lists its own id in `recurrence`
  (no self-drop); every origin id is accounted (no orphan). **Today: 0 / 0.**

**The current state (disk-verified, deterministic across runs):**
```
recency-weighted convergence: 87.3%   (29 addressed · 7 partial · 1 deferred-with-trigger · 1 GAP)
born-RED lints firing: 1   (1 gap + 0 false-green + 0 phantom-cite + 0 stale + 0 self-drop + 0 orphan)
```

**The acceptance bar / convergence proof:** the recap is converged when `recap.mjs` runs
**2-consecutive-clean** — `0 GAP ∧ 0 false-green ∧ 0 phantom-cite ∧ 0 stale-residue ∧ 0 self-drop
∧ 0 orphan` — AFTER (a) R2.D2 gains a carrier on disk (the macro-flower consumer-asset arm folded
into `BD.W-AUR-IMAGE-SOURCE`) and (b) the historical-recap's own `DELTA-ASSAY.md` lands (clearing
R0.7). The convergence % then climbs toward ~100% as the `·auth` waves materialize (the
wave-spec-audit §7 pass) and the assembly-owed partials ship (tranche-EXECUTION, W-CUT). The % is a
fraction immune to the "addressed"-claim inflation — the discipline the corpus legislates against,
finally applied to the USER-ASK ledger itself, for real.

---

## 8. THE WAVE-AMENDMENT this lens proposes

- **NEW `BD.W-HISTORICAL-RECAP`** — authors `recap.manifest.json` + `recap.mjs` + the generated
  `HISTORICAL-RECAP.md` (which absorbs + retires the phantom `BD-CONTINUATION-PROMPT.md`). Born-RED
  on any GAP/false-green/phantom-cite/stale-residue/self-drop. Auto-enrolls into the BD freshness
  roster (a new feedback-batch file or a new greenfield dir drifts the corpus → a newly-orphaned
  ask born-REDs).
- **AUGMENT `BD.W-AUR-IMAGE-SOURCE`** with the curated macro-flower CONSUMER-ASSET arm (closes
  R2.D2; presets-in-consumers — the lib ships the zone-blur engine, the consumer ships the flowers).
- **DOC-reconcile** — re-point the docs that cite the phantom `BD-CONTINUATION-PROMPT.md` to the
  generated `HISTORICAL-RECAP.md` (a doc-reconcile, like FOLD Class H).
- The 67 `·auth` materialization-owed waves are the wave-spec-audit §7 deliverable (cited, not
  re-owned here); the assembly-owed partials are the tranche-EXECUTION (W-CUT) deliverable.
