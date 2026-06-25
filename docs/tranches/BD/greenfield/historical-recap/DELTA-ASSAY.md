# historical-recap — DELTA-ASSAY (golden-vs-current + the UNION path)

> The Band-E HISTORICAL recap is **not a per-component greenfield** — what is designed anew is the
> recap MECHANISM: a born-RED, re-runnable PROMPT-corpus oracle whose every `addressed` cell is a
> disk-checkable claim and whose convergence % is a COMPUTED fraction. This DELTA-ASSAY assays the
> GOLDEN (`GOLDEN.md` + `golden/recap.mjs` + `golden/recap.manifest.json` + emitted
> `HISTORICAL-RECAP.md`) against the CURRENT corpus on disk (2026-06-24), FOLDS the three challenge
> hardenings, and lays the UNION path: precisely how the extant artefacts evolve toward the golden
> reusing the sibling `wave-spec-audit/golden/audit.mjs` machinery — KISS, DRY, no legacy, no fork.
> Binding law: `GREENFIELD-HARDENING-PLAN.md §1` + `viz/video-audit/IOS27-REFERENCE.md` (the
> `design.md §L*` precept anchors resolve into the HARDENING-PLAN §L preamble/§L6/§L7, NOT a
> standalone `design.md` — that file does NOT exist on disk; see R2 below).

---

## 0. THE SPINE SURVIVES — the run-verified facts (KEEP)

`node golden/recap.mjs` this session → **exit 1**, deterministic across runs, numbers reproduce the
GOLDEN §7 verbatim:
```
38 de-duplicated asks · 40 greenfield dirs (38 converged) · 11 refine dirs · 158 waves on disk
recency-weighted convergence: 87.3%   (29 addressed · 7 partial · 1 deferred-with-trigger · 1 GAP)
born-RED lints firing: 1   (1 gap + 0 false-green + 0 phantom-cite + 0 stale + 0 self-drop + 0 orphan)
```
What is genuinely FIT and stays as-is:
- **The oracle is real, pure node, no new dep, born-RED, deterministic.** It is the prompt-corpus
  twin of `wave-spec-audit/golden/audit.mjs` — same loader, same default-RED + 2-consecutive-clean,
  same `authoredBy`/pruned/cross-tranche concepts. NOT a bolt-on, NOT a fork. (all 3 challenges concede)
- **The tri-state carrier JOIN — live / authored / stale / phantom — is the strongest part.**
  Mutation-probed (challenge #2): flipping R2.D2 `gap`→`addressed` fires `false-green`; adding a
  phantom wave-cite fires `phantom-cite`. `union/waves/W-BLURRED-IMAGE-BG.md` really is a pruned
  residue on disk that the `stale` machinery correctly fences. The honest distinction
  "spec-converged ≠ file-materialized (`·auth`) ≠ shipped (assembly-owed)" is load-bearing and right.
- **Deft integration is honest:** ingests (does not re-author) the FOLD-LEDGER + the 3 feedback
  batches + the §6 ledger; the `.md` is GENERATED (`--emit`); the phantom `BD-CONTINUATION-PROMPT.md`
  (confirmed ABSENT on disk) is absorbed into the generated `HISTORICAL-RECAP.md`, not forked.
- **The deferred-with-trigger fold (R6.METAL) + presets-in-consumers GAP disposition (R2.D2)** respect
  the binding laws (`feedback_no_backwards_compat`, presets-in-consumers).
- **Zero cross-engine/Safari/perf attack surface on the spine** (challenge #2 SURVIVES): it boots no
  browser, no `backdrop-filter`, no goo, no compositor. Pure `node:fs`. The whole cross-engine lens
  is structurally moot against the deliverable.

---

## 1. THE DELTA — golden vs current, fold the challenges (REFINE, three surgical gate-fixes)

The verdict across the three challenges is unanimous-modulo-severity: **the SPINE is fit; the GATE is
HOLLOW in three places, the §5 dogfood FACE is over-claimed, and the binding-law cite dangles.** All
fixes are surgical REFINE of the ONE `recap.mjs` + the manifest — RE-INVENT nothing. Confirmed on disk:

| # | finding (challenge) | disk-confirmed defect | severity | disposition |
|---|---|---|---|---|
| **D1** | **OR-blindness** (c1·R1, c3·R1) | `covers` is an **OR** over carriers; macro-rows collapse **46 distinct sub-asks** into `recurrence[]` with NO per-sub-ask JOIN. `manifest grep subAsks = 0`. `R2.C_VIZ` rides 6 deliverables on a logical-OR — if C4 cell-warp regresses while 5 stay `delta✓`, the row STILL derives ADDRESSED. The exact `batch3-A1`/`live_verify_capture` disease, one altitude up. | **TOP** | REFINE: add `subAsks[]` (each with own `covers`); derive macro-row as **AND** over sub-asks (ADDRESSED only when EVERY sub-ask has ≥1 live carrier, else PARTIAL naming the unmet one). |
| **D2** | **orphanOrigins tautology** (c1·R2) | `recap.mjs:163-167` builds `allRecurrence` as the UNION of every row's `recurrence[]`, then checks `rows.some(r=>r.recurrence.includes(id))` — **always true by construction**. PASS-4's no-silent-drop half is **dead** (unreachable, not merely 0-today). The literal "nothing lost" mechanism can never fire. | **TOP** | REFINE: build the origin enumeration from an EXTERNAL source — parse section ids out of `viz/refine/USER-FEEDBACK-*.md` + `MASTER-REQUEST-RECAP.md §A/§B/§C/§D`; born-RED any source-id present in NO row's `recurrence`. |
| **D3** | **falseGreens dead code** (c1·R3) | `recap.mjs:173` — `derived==="gap"` is produced ONLY by `!anyCarrier`, the same condition that fills `gaps[]`, so `falseGreens ⊆ gaps` — zero independent signal. The §0 "caught FOUR defects" boast is unfalsifiable (manifest hand-corrected to clean before commit). | high | REFINE: DELETE the dead line; the real false-green detector IS the D1 sub-ask AND-derive (typed-addressed-but-actually-partial). Add a regression FIXTURE (deliberately-broken mini-manifest) under `golden/` so "caught N defects" is a re-runnable test, not prose. |
| **D4** | **fidelity-blindness** (c3·R1) | `grep -c 'chroma|oklab|no-gray|warm|cartoon|squash|paint' recap.mjs = 1` (a code comment). The JOIN certifies `addressed` on **citation-existence alone** — never reads a π. It INGESTS the HARDENING-PLAN that records cited surfaces as gray/springless (`cards :254` composite C 0.0097 GRAY; `tabs :252` chroma 0.0128 NEAR-GRAY; `blend-morph :268` `--dock-morph-t≡0`) yet can fly "warm-cream addressed". | **TOP** | REFINE: add a **PASS-1.5 fidelity-lien** — for every `class:"precept"` row (gray/anim/proportion/paper/goo-Safari), parse the cited `DELTA-ASSAY.md` for a π token (`PI: GREEN/RED` or a `_delta-*-π.json` sidecar); DOWNGRADE `addressed`→`partial (fidelity-owed)` when the cited delta's π is RED or absent. Precept rows go green ONLY on a GREEN cited paint-π. |
| **D5** | **phantom `design.md` binding-law cite** (c2·R3, c3·R2) | `find docs -iname design.md` = **NOTHING** (confirmed). The GOLDEN header + §0/§1/§5 cite `design.md §L7/§L6/§3` as governing. The recap whose thesis is "every cite targets a live successor" dangles its OWN top reference — the exact phantom-class its PASS-3 catches on wave slugs. | high | REFINE: re-point every `design.md §L*` cite to `GREENFIELD-HARDENING-PLAN.md §L*` (the real precept home, per `:232`); add a **PASS-0 law-existence check** — the manifest's `law` field (already present) extended so every doc named in a `law`/binding-cite resolves on disk, born-RED on a dangling governing-doc cite. |
| **D6** | **§5 dogfood-face overfit** (c1·lesser, c2·R-1/R-2/R-4, c3·R3) | §5 cites primitives by **wrong/absent names**: `<ProgressBar>` (0 hits; real = `Progress.vue`/`ProgressGradient`), `<GooFilter>` (real = `GlassGooFilter` #glass-goo / `DockGooFilter` #dock-fission-goo), `--ease-cartoon-punch` + `.cartoon-cast` (spec-only, EMPTY on `:root`; real shipped = `.cartoon-surface` reading static `--shadow-cartoon`). PRM says "ONE motion" but enumerates THREE degrades; the GAP crimson is an infinite loop (WCAG 2.2.2); the "moving layered-offset cartoon cast" animates `box-shadow` (non-compositor, violates §5's own "pure compositor" promise). `grep '/meta/recap|recap-card|cartoon-cast' demo/ src/ = 0`. | medium | REFINE: rename to shipped reality (`<Progress>`/`BorderProgress`; `<DockGooFilter>` #dock-fission-goo; `.cartoon-surface` + cite `--ease-cartoon-punch` as a `BD.W-MORPH-PUNCH-TOKENS·auth` DEPEND, bar uses extant `--ease-*` until it lands). Declare **THREE** PRM degrades; GAP crimson = finite anticipation-dip-then-settle + `aria-live="polite"` text, never an infinite loop. Cast via an inert `::after` translated by `transform`; the bar's own `box-shadow` stays STATIC. Demote §5 to an EXPLICIT future-work arm gated born-RED on the `·auth` motion waves — NOT a present-tense shipped guarantee. |
| **D7** | **authoredSlugs greedy regex** (c2·R-5) | `recap.mjs:77` collapses `\n\s+`→space then `[^\n]*?` can span what were wrapped lines, binding a `NEW` verb to a slug from a LATER sentence — a silent up-grade (false-authored), the inverse of born-RED. Not firing today, un-fenced. | low | REFINE: scan per physical line (drop the newline-collapse for the mint pass) OR bound the span at a sentence period (`[^\n.]`). Add an assertion that each authored slug appears within ~12 tokens of its minting verb. |
| **D8** | **deferred=1.0 + hand-typed band** (c3·R4, c3·R5) | `deferred:1.0` gives R6.METAL (the biggest owed deferral) PERFECT credit; "are we done?" treats held == done. `band` is hand-typed — no disk-derived recency, nothing stops parking a weak ask in R6. | low | REFINE: split the headline into `% addressed` vs `% addressed-or-held` (or weight `deferred:0.75`); derive/assert `band` from the cited source-file's date stratum, born-RED on a mis-banded row. |

**No RE-INVENT.** Every defect is a surgical REFINE of the single `recap.mjs` + manifest schema. The
spine — the oracle, the tri-state JOIN, the GENERATED face, the deft `audit.mjs` union — is fit and stays.

---

## 2. THE UNION PATH — evolve the current toward the golden (KISS / DRY / no dual-path)

The current artefacts ALREADY exist (`recap.mjs` + `recap.manifest.json` + emitted
`HISTORICAL-RECAP.md`). The union is to HARDEN them in place — one script, one manifest, no second
linter, no parallel memo. Concretely, reusing the extant primitives:

1. **Manifest schema evolution (D1):** add `subAsks[]` to every macro-row (`R2.C_VIZ`, `R2.B_TOGGLE`,
   `R1.A_DOCK`, `R3.GRAY`, …). Each sub-ask carries its own `covers{}`. The 46 collapsed tokens
   become first-class JOIN targets. The macro-row's `coverState` is DERIVED as the AND. **No new file**
   — the manifest grows columns, the `.md` is re-emitted.
2. **`recap.mjs` PASS evolution (D2/D3/D4/D5/D7):** all edits land in the ONE script:
   - PASS-0 (NEW): law-existence — assert every binding-doc cite resolves on disk (reuse the existing
     `existsSync` carrier-root machinery; the `law` field is already in the manifest).
   - PASS-1 derive: replace the OR with the sub-ask AND (D1); add the PASS-1.5 fidelity-lien parsing the
     cited `DELTA-ASSAY.md` for a π token (D4) — reuse the same `readFileSync` the loader already uses.
   - PASS-3: DELETE the dead `falseGreens` line (D3); the AND-derive IS the real detector.
   - PASS-4: replace the tautological orphan check with the EXTERNAL-enumeration fence (D2) — parse the
     `USER-FEEDBACK-*.md`/`MASTER-REQUEST-RECAP.md` section headers (a small regex over files already
     on disk), born-RED any source-id with no home.
   - the mint regex per-physical-line (D7).
3. **Generated face REFINE (D6):** the `--emit` renderer + §5 prose re-point to shipped primitive
   names; §5 demoted to a born-RED-gated future-work arm. The `/meta/recap` card-wall, IF built, gets
   its OWN greenfield dir + DELTA-ASSAY + a manifest row (reflexive, like R0.7) — it is NOT shipped by
   the recap and must not read as a guarantee.
4. **Headline honesty (D8):** the `--emit` header prints TWO numbers (`% addressed` and
   `% addressed-or-held`); `band` is asserted against the source-file date stratum.
5. **Reflexive close:** the recap stays born-RED on itself until this DELTA-ASSAY lands (clears R0.7)
   and the macro-flower carrier lands (clears R2.D2 — the curated array folds into
   `BD.W-AUR-IMAGE-SOURCE·auth` as the consumer-asset arm, presets-in-consumers). Then 2-consecutive-clean.

**DRY guarantees:** no second linter framework (twins `audit.mjs`); FOLD-LEDGER + the 3 batches + the
§6 ledger remain INPUTS, never re-authored; the `.md` stays GENERATED; the phantom
`BD-CONTINUATION-PROMPT.md` stays absorbed. The four prior prose recaps
(`MASTER-REQUEST-RECAP`/`union/PROMPT-RECAP`/`union/DEFERRED-CENSUS`/`FOLD-LEDGER`) are frozen prior-art
the manifest's `recurrence[]` provenance-links — clean break, no alias.

---

## 3. THE GAP REPORT (the recap's real value — honest residual)

| Gap / partial | source ask | disk receipt | disposition (born-RED until carried) |
|---|---|---|---|
| **R2.D2 — macro-FLOWER image ARRAY** | batch2-D2 | no carrier; the blurred-image TECHNIQUE is homed (`BD.W-AUR-IMAGE-SOURCE·auth`), the curated ASSET array is not | AUGMENT `BD.W-AUR-IMAGE-SOURCE` with the consumer-asset arm (lib ships zone-blur engine, consumer ships flowers) |
| **R0.7 — historical-recap itself** | this item | greenfield dir present; THIS DELTA-ASSAY now lands | reflexive — clears when this file + the hardened `recap.mjs` land |
| **D1 fidelity sub-class** (NEW, post-hardening) | precept rows (gray/anim/proportion) | cited DELTA-ASSAYs carry RED π per HARDENING-PLAN `:252/:254/:268` | the PASS-1.5 lien DOWNGRADES these to `partial (fidelity-owed)` — resolves at tranche-EXECUTION when the cited deltas' π go GREEN |
| **materialization-owed** (67 `·auth` slugs) | union with wave-spec-audit §7 | spec-converged, file un-materialized | the wave-spec-audit §7 MATERIALIZE pass (cited, not re-owned) |
| **assembly-owed** (R1.A13 dock-assembly, R3.GRAY all-surfaces, R5.B2 real-name census, R3.6 close-glyph) | spec-converged ≠ shipped | engine + wave exist | tranche-EXECUTION (W-CUT, user-gated) |

---

## 4. CONVERGENCE

The current spine is fit and shipped; the three gate-hollowness fixes (D1/D2/D4) plus the
binding-law/§5/parser refinements (D5/D6/D7) are surgical REFINE of the ONE `recap.mjs` + the manifest.
After the hardening the headline % becomes HONEST (the AND-derive will reveal more partials, the
fidelity-lien will downgrade the precept rows — the number will DROP, correctly, then climb as the
`·auth` waves materialize and the deltas' π go green). **Verdict: REFINE-dominant; ~85% converged.**
Remaining ~15% = build-time: the `subAsks[]` AND-JOIN + the external-enumeration orphan fence + the
PASS-1.5 fidelity-lien + PASS-0 law-check + the `falseGreens` delete + the mint-regex fence + the
two-number headline + the §5 primitive-name re-point/demote + the R2.D2 consumer-asset fold (the last
being the wave-EXECUTION hinge). This DELTA-ASSAY itself clears R0.7.
