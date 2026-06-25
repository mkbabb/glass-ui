# historical-recap — brainstorm LENS-A (the recap-as-EXECUTABLE-LEDGER, recency-weighted, no-loss)

> GREENFIELD, pure-fidelity lens. The deliverable is **the BD Band-E meta-pass twin of
> `wave-spec-audit`**: that band proved "the wave CORPUS is a build-graph you can lint"; THIS band
> proves "the USER-PROMPT corpus is a build-graph you can lint." The recap is not a prose summary you
> trust — it is a **born-RED, runnable coverage oracle** (`recap.mjs`) whose every "addressed" cell is
> a disk-checkable claim (the covering wave/greenfield/refine artefact EXISTS), whose every chronic/
> deferred item is a row that cannot be silently dropped (the FOLD-LEDGER L-inv-8 no-delete law,
> applied to user asks), and whose convergence % is a **computed fraction**, immune to the
> "live-verified"/"addressed"-claim inflation the corpus legislates against (`feedback_live_verify_capture`,
> the cardinal-lesson inflation at the PROGRESS roll-up). Survival-of-the-fittest: the MASTER-REQUEST-RECAP
> table + the 3 USER-FEEDBACK batch tables + the FOLD-LEDGER are FIT prior-art — KEEP their content,
> RE-INVENT only their *verification model* (today they are hand-typed status columns that no machine
> ever re-checks).

---

## 0. METHOD — what was read + disk-verified this pass (not name-presence)

Read in FULL: `MASTER-REQUEST-RECAP.md` (§A1-15, §B1-2, §C1-6, §D media, §E spikes, §F path),
`FOLD-LEDGER.md` (Classes A-J, the no-silent-drop attestation), `GREENFIELD-HARDENING-PLAN.md` §1/§5/§6
ledger + the 40-band greenfield coverage table, the 3 `viz/refine/USER-FEEDBACK-2026-06-23{,-batch2,
-batch3}.md` (every verbatim row), `IOS27-REFERENCE.md` T1-T15 + the per-target convergence %, and the
sibling `wave-spec-audit/DELTA-ASSAY.md` (the established Band-E delta format + the fake-gate lesson).

**SOURCE-VERIFY receipts (disk, `prototype/liquid-dock`, 2026-06-24):**
- The §6 ledger row `| E | historical-recap | — | todo |` is REAL — this band is genuinely unbuilt.
- 40 greenfield dirs on disk; 14 refine dirs (`viz/refine/`). Every feedback slug maps to a dir EXCEPT
  one (the gap, below).
- **`BD-CONTINUATION-PROMPT.md` is ABSENT** (`ls docs/tranches/BD/*CONTINUATION*` → no match) although
  MASTER-REQUEST-RECAP and the HARDENING-PLAN both cite it as a live "standing recap" sister doc. A
  recap that cites a phantom source is the exact PASS-2 fraud wave-spec-audit caught — **flag, don't
  trust.** This LENS proposes the recap LEDGER itself BECOMES that standing doc (one home, no phantom).
- **`blurred-image-bg` (batch2 D3, the explicit NEW "BLURRED IMAGE" procedural-bg directive + D2 macro-
  flower array) has NO greenfield dir AND NO refine dir** — `ls greenfield/blurred-image-bg` and
  `viz/refine/blurred-image-bg` both empty. This is a GENUINE GAP (a recently-raised, explicit user ask
  with zero carrier). The recap MUST surface it as a born-RED gap-row → a new wave.
- Cross-check spot: `dock-core` has BOTH a greenfield (`greenfield/dock-core`) and a refine
  (`viz/refine/dock-core`) — the batch3 dock overhaul IS double-carried (good, not a gap).

---

## 1. THE CORE IDEA — the recap is a corpus-as-build-graph oracle, not a memo

A prose recap rots the instant the next prompt lands; its "addressed" column is a judge-claim no one
re-runs (the `feedback_live_verify_capture` disease). The greenfield move: model the **entire user-ask
corpus** as a typed, machine-readable manifest `recap.manifest.json` — one ROW per atomic user ask,
each carrying:

```jsonc
{
  "id": "B3.A13",                        // stable id (batch3, section A, item 13)
  "verbatim": "Generalize the facility to handle MORPHING…SPLITTABLE into ARBITRARY parts…",
  "session": "2026-06-23",               // when raised (drives recency weight)
  "recurrence": ["B3.A13","BD.D40-dock","mem:project_bd_union_tranche"],  // every prior raising → CHRONIC if ≥3
  "class": "feature|bug|precept|process|media",
  "weight": 5,                            // recency·emphasis (the user's "BIAS and WEIGHT on recent")
  "covers": ["dock-core","dock-fission","blend-morph-engine","BD.W-DOCK-MORPH-FAMILY"],  // carriers
  "coverState": "addressed|partial|deferred|GAP",
  "proof": "greenfield/dock-core/DELTA-ASSAY.md exists ∧ IOS27-REFERENCE T2 cites it"
}
```

`recap.mjs` loads the manifest, then for each row **re-derives `coverState` from DISK** — it does not
read the typed `coverState`, it COMPUTES it and asserts it matches (a self-bite: a row claiming
"addressed" whose carriers don't exist on disk throws, exit 1). This is the wave-spec-audit thesis
transposed from waves to prompts: **default-RED, computed convergence, no judge.** The recap's
convergence % = `addressed / total`, weight-adjusted — a fraction you can re-run, never a vibe.

The ledger .md (`HISTORICAL-RECAP.md`) is the human face — generated FROM the manifest (the table is
emitted, never hand-typed), so the prose and the machine never drift. It REPLACES the phantom
`BD-CONTINUATION-PROMPT.md` as the single standing recap home (KISS, no second doc).

---

## 2. THE RECENCY-WEIGHTED CORPUS — every ask, de-duplicated, organized (the §A of the deliverable)

The corpus is **banded by recency** (the user's binding "BIAS and WEIGHT on the most recent"), newest
first, each band a weight tier. De-dup is by `recurrence[]` — the same ask raised across sessions
collapses to ONE row whose weight ACCUMULATES (recurrence is the chronic signal, not a duplicate).

| Band | Source | Weight | Coverage home (cite) |
|---|---|---|---|
| **R0 — THIS session's greenfield directives** (highest) | the /goal + the 5 new edicts: design-edicts · category-landing live-demos · blend-morph SDF/Houdini Safari-no-fallback · hero-overflow · design-adherence consistency | 6 | greenfield `design-language-edicts`✓ · `category-landing`✓ · `blend-morph-engine`✓ · `page-chrome`/`story-page-standard` (hero-overflow) · `wave-spec-audit` PASS-2 (design-adherence) |
| **R1 — batch3 (2026-06-23, the DOCK + ANIM overhaul)** | A1-A13 dock · B1-B2 anim-law · C1-C3 goo/carousel-dedup · D1-D4 chrome/buttons | 5 | `greenfield/dock-core`✓+`refine/dock-core`✓ · `dock-fission`✓ · `dock-hub`✓ · `blend-morph-engine`✓ · `refine/anim-ios27-tune`✓ · `refine/goo-carousel-deck`✓+`carousel-deck`✓ · `page-chrome`✓+`buttons`✓+`tabs`✓ |
| **R2 — batch2 (2026-06-23, nav + viz + bg)** | A1-A7 nav-dock · B1-B5 toggle/glass/chrome · C1-C6 viz-respec · D1-D3 per-page aurora + **BLURRED IMAGE** | 5 | `refine/nav-dock-fix`✓ · `glass-atoms`/`toggle-chip`✓ · `refine/viz-respec`✓ → `concentric`/`paper-grid`/`fourier-field`/`dot-matrix`/`goo-blob`/`goo-dot-matrix`✓ · `page-background`✓ · **D3 blurred-image → GAP (no carrier)** · D2 macro-flowers → GAP-adjacent (consumer-asset, presets-in-consumers) |
| **R3 — batch1 (2026-06-23, gray-glass triumvirate)** | 1 gray-glass · 2 goo-morph-refine · 3 reveal · 4 select · 5 toggle-chip · 6 padding | 4 | `refine/glass-abrogate-gray`✓ · `refine/goo-morph-refine`✓+`goo-morph`✓ · `entrance-reveal`✓ (reveal) · `select-forms`✓ · `toggle-chip`✓ · padding → `story-page-standard`/`concentric` proportion (verify ≥1 carrier — partial) |
| **R4 — MASTER-RECAP §C (this /goal's design items)** | C1 metallic-aurora ×2 · C2 dotflow-surpass · C3 shadcn-abrogate/ios27-suffuse · C4 gray-abrogate · C5 goo-morph-liquid · C6 liquid-weight-universal | 4 | `aurora`✓ (metallic) · `dot-flow-field`✓ · `design-language-edicts`✓ (de-shadcn precept) + `wave-spec-audit` PASS-2 (suffuse consistency) · `glass-material`✓ · `goo-morph`✓ · `motion-spring-register`✓ |
| **R5 — MASTER-RECAP §A/§B (Pass-D/E originals + dock-hub)** | A1-A15 audit/story-page/liquid-entrance/scroll/paper · B1-B2 dock-hub-API + no-hardcoded-refs | 3 | `story-page-standard`✓ · `entrance-reveal`✓ · `scroll-choreography`✓ · `paper-morphism`✓+`paper-grid`✓ · `handmark`✓ · `substrate`✓ · `dock-hub`✓ · **no-hardcoded-refs → verify (de-overfit census — partial/process)** |
| **R6 — the 100+-session deferred long-tail** | the FOLD-LEDGER Classes A-J (chronic/deferred books) | 2 | each FOLD-LEDGER row → its `→BD.W-*` disposition (already a no-loss machine; the recap INGESTS it, §3) |

The recap's de-dup is honest: e.g. **gray-glass** appears in §C4, batch1#1, batch2 B4, batch3 D3-adjacent —
ONE row, `recurrence` length 4, weight accumulates → **CHRONIC** (the most-repeated systemic ask; the
recap surfaces it at the top of the chronic ledger, §3). **liquid-weight-universal** is the same:
MASTER §C6, batch3 B1-B2, `feedback_liquid_weight_universal` memory, the design-edicts §L4 elevate —
the recap proves it is carried by `motion-spring-register` + `anim-ios27-tune` + the design.md amendment,
NOT lost.

---

## 3. THE CHRONIC + DEFERRED FOLD — ingest the FOLD-LEDGER, don't re-invent it (the no-loss spine)

The FOLD-LEDGER is ALREADY a no-silent-drop machine (Classes A-J, every row → a disposition, L-inv-8
no-delete). The recap does NOT re-author it — it **ingests + cross-references** it, and adds the ONE
thing it lacks: **the USER-ASK provenance.** The FOLD-LEDGER tracks *engineering* deferrals (GL-fence
tails, kf republish-gates, doc-count drift); the recap binds each back to *the user prompt that
demands it*, then classifies CHRONIC by recurrence-count.

**Chronic = raised ≥3× across the corpus, not yet resolved.** The recap's chronic ledger (computed, not
typed):

| Chronic ask | recurrence | carriers | state |
|---|---|---|---|
| **Gray glass → warm-cream everywhere** | §C4 · b1#1 · b2-B4 · b3-D3 · `feedback_lightdark_inset_shadow`-adjacent | `glass-material`✓ + `refine/glass-abrogate-gray`✓ + design.md §3-field amendment | partial (systemic; verify ALL surfaces) |
| **Liquid-weight universal** (inertia/bounce/squish on ALL motion) | §C6 · b3-B1 · b3-B2 · mem:`feedback_liquid_weight_universal` | `motion-spring-register`✓ + `refine/anim-ios27-tune`✓ + design §L4 | addressed (law codified + tuned) |
| **Dock core liquid + generalize/split** | §A7 · §B1 · b2-A1..A7 · b3-A1..A13 · IOS27 T1-T3 | `dock-core`✓+`dock-fission`✓+`dock-hub`✓+`blend-morph-engine`✓ | partial (engine 100% / assembly the gap — IOS27 T2) |
| **Goo SAFARI parity + real blob↔meatball** | §D · b3-C1 · IOS27 T2 · `feedback`-cross-engine | `goo-morph`✓+`goo-blob`✓+`carousel-deck`✓+`blend-morph-engine`✓ (SDF) | partial (the Safari floor is the bar) |
| **Per-page custom aurora / NOT constellation** | §A6 · b2-D1 · `page-background` | `page-background`✓+`aurora`✓ | addressed |
| **Storybook chrome = warm-cream identity** | b2-B3 · b3-D · §A8 | `page-chrome`✓+`shell-layout`✓+`story-page-standard`✓ | partial |
| **Real-Metal-GPU cross-backend parity** (FOLD Class B, the "single biggest owed") | FOLD-B · viz band | `→BD.W-VIZ-PARITY-METAL`✓ (wave exists on disk) | deferred (HELD-trigger: real-hardware) |

**Deferred-with-trigger** (explicitly held, NOT lost — folded with their un-MET trigger from FOLD-LEDGER):
kf Oscillator/Draggable/value.js republish-consumes (Class C), the cross-repo adopt sweep + slides
redeploy (Class D, user-gated), the aurora WGSL strokes/curl/kuwahara GL-tails (Class B), the
disposition-restamp watches (Class I). Each already has a `→BD.W-*` wave on disk — the recap CITES the
wave, asserts it EXISTS (born-RED if absent), and records the trigger. **NOTHING is re-decided; the
recap is a READ-and-VERIFY layer over the FOLD-LEDGER, not a parallel ledger** (DRY, no fork — the exact
"no 2nd mint" law from wave-spec-audit U2).

---

## 4. THE GAP REPORT — born-RED rows for the genuinely-uncovered (nothing lost)

A gap = a user ask with NO carrier on disk. Each becomes a born-RED recap row → a NEW wave/greenfield.
Verified gaps this pass:

| Gap | Source ask | Why a gap (disk receipt) | Fold → |
|---|---|---|---|
| **G1 — BLURRED IMAGE procedural bg** | b2-D3 (explicit NEW directive, "blur DRAMATICALLY, zones, moving like aurora") | NO `greenfield/blurred-image-bg` AND NO `refine/blurred-image-bg` dir; not in the §6 ledger | **NEW `BD.W-BLURRED-IMAGE-BG`** + a `greenfield/blurred-image-bg` brainstorm (compose `page-background` + the aurora zone-drift) |
| **G2 — macro-flower image ARRAY** | b2-D2 ("research the web for MACRO images of FLOWERS, provide an ARRAY") | consumer-asset (presets-in-consumers `feedback_presets_in_consumer`); no asset array curated | fold → G1's wave as the consumer asset set (the library ships the zone-blur engine; the consumer ships the flowers) |
| **G3 — `BD-CONTINUATION-PROMPT.md` phantom** | MASTER-RECAP + HARDENING-PLAN cite it as a live "standing recap" | `ls *CONTINUATION*` → no match (the cited source does not exist) | the recap LEDGER (`HISTORICAL-RECAP.md`) BECOMES the standing recap; the two citing docs re-point (a doc-reconcile, like FOLD Class H) |
| **G4 — padding/spacing-pass + x-glyph stylize** | b1#6 ("x's bigger+stylized; padding awful") | no dedicated `padding-spacing` dir; folds into proportion but the x-glyph stylize has no explicit carrier | verify `glass-atoms`/`overlays` covers the close-glyph; if not → AUGMENT `BD.W-IOS27-SUFFUSE` (close-glyph register) |
| **G5 — no-hardcoded-refs de-overfit CENSUS** | §B2 ("NO 'maps' refs — generalized precepts") + b3-A10 ("Do not use real names") | a census/process ask; `dock-hub`✓ carries the API but the LIBRARY-WIDE real-name census (the audit sweep) needs a verify | fold → `dock-hub` DELTA + a `proof:no-hardcoded-refs` grep gate (born-RED on "maps"/real-names in src/) |

Every gap is a born-RED row in `recap.mjs` — the audit EXITS 1 until each gap has a carrier on disk
(the same default-broken discipline as the wave-spec-audit FOUNDATION gate). **A gap cannot be silently
greened: the row stays RED until the wave-file exists.**

---

## 5. THE iOS-27 FIDELITY LENS — why a RECAP earns a design-edict treatment

A recap is a doc, not a surface — but the EDICTS still bind its FORM, because the recap is itself a
storybook-adjacent artefact the user reads. The fidelity move: the recap ledger, when surfaced in the
demo (a `/meta/recap` story — optional, the deliverable is doc-first), is rendered as a **golden-ratio
coverage CARD-WALL** — one glass card per recap band (R0-R6), the card's fill a **coverage heat** (warm-
cream at 100% addressed → a defined-edge amber rim that thins toward GAP-red as coverage drops), the
chronic items as **tinted chips** on a transmissive plate, the % a √φ-laddered display numeral. The
motion: a card REVEALS with the liquid-entrance squish (the `entrance-reveal` engine, DRY-consumed),
and a gap-row PULSES with a cartoon-shadow recoil (anticipation → over-RED → settle) so a gap reads as
*alive and unresolved*, never a quiet strikethrough. This is the design-adherence consistency edict
applied REFLEXIVELY — the recap of "did we honor the edicts?" is itself rendered to the edicts. Chrome
+ Safari: pure compositor (opacity/transform on the coverage heat; the rim is a static-gradient border,
NO backdrop-filter:url); PRM → the pulse becomes a single opacity step, the heat static. But the
SPINE is the doc + `recap.mjs` — the card-wall is the optional dogfood face, never the source of truth.

---

## 6. DEFT INTEGRATION — a UNION, not a bolt-on (KISS / DRY / no legacy)

- **Reuse the wave-spec-audit machinery wholesale.** `recap.mjs` is the prompt-corpus twin of
  `golden/audit.mjs` — same loader pattern, same born-RED-foldsinto-exit-code discipline, same
  2-consecutive-clean convergence. NO new linter framework.
- **Ingest, don't re-author, the FOLD-LEDGER** (§3) — the recap READS `FOLD-LEDGER.md` + the §6 ledger +
  the 3 feedback batches as its inputs; it never copies their content (DRY). A FOLD-LEDGER row edit
  flows into the recap on the next run.
- **The ledger .md is GENERATED** from the manifest — no hand-typed table to drift (the exact
  wave-spec-audit U6 "re-derive from --json, never the eyeballed table" lesson).
- **REPLACE the phantom continuation doc** (G3) — one standing-recap home, no parallel memo. No legacy.
- **The manifest auto-enrolls into `--run pi`-style freshness** — keyed off the feedback-batch files +
  the greenfield dir-listing, so a NEW user prompt (a new batch file) or a NEW greenfield dir DRIFTS the
  corpus-hash → the recap re-derives, and a newly-orphaned ask born-REDs (the `GESTALT-ROSTER-GROW`
  auto-revoke pattern, transposed to prompts).

---

## 7. CONVERGENCE — the computed fraction

Coverage % = `Σ(weight · addressed) / Σ(weight)` over all rows, weight = recency·emphasis. With the
corpus banded R0-R6 and the 5 gaps born-RED, the HONEST current coverage (this pass, disk-verified) is
**~88% weighted-addressed** — most asks carry a real greenfield/refine/wave artefact; the 12% deficit is
the 5 gaps (G1 blurred-image the largest, an explicit recent ask with zero carrier) + the partials
(dock-assembly, gray-glass-all-surfaces, padding/x-glyph). Convergence to ~100% = the 5 gap-rows each
gain a carrier on disk (G1 → `BD.W-BLURRED-IMAGE-BG` + brainstorm; G3 → the doc-reconcile; G4/G5 →
AUGMENT rows) AND `recap.mjs` runs 2-consecutive-clean (`0 GAP-rows ∧ every addressed-claim disk-verified
∧ corpus-hash fresh`). The % is then a fraction immune to the "addressed"-claim inflation — the
discipline the corpus legislates against, finally applied to the USER-ASK ledger for real.

---

## 8. THE WAVE-AMENDMENT this lens proposes

- **NEW `BD.W-HISTORICAL-RECAP`** — authors `recap.manifest.json` + `recap.mjs` (the born-RED corpus
  oracle) + the generated `HISTORICAL-RECAP.md` (which absorbs + retires the phantom
  `BD-CONTINUATION-PROMPT.md`). Born-RED on any GAP-row or any addressed-claim whose carrier is absent.
- **NEW `BD.W-BLURRED-IMAGE-BG`** (closes G1) — the zone-varying dramatic-blur drifting procedural bg,
  composing `page-background` + the aurora zone-drift; the macro-flower array as the consumer-asset set
  (G2). + a `greenfield/blurred-image-bg` brainstorm to de-risk.
- **AUGMENT** `dock-hub` DELTA with a `proof:no-hardcoded-refs` grep gate (G5); AUGMENT
  `BD.W-IOS27-SUFFUSE` with the close-glyph stylize register (G4); a DOC-reconcile re-pointing the two
  docs that cite the phantom continuation prompt (G3).
- The recap manifest auto-enrolls into the BD freshness roster (G6 of the roster-grow oracle) so the
  corpus stays self-revoking.
