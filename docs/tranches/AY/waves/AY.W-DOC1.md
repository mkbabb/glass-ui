# AY.W-DOC1 — README research-backed quality-uplift + strip provenance meta

**Wave** W-DOC1 — README research-backed quality-uplift + strip provenance meta
· **Repo** glass-ui · **Band** D (docs) · **State** OPEN
· **Kind** docs / doc-reconciliation · **Depends on** W-AUR1 (`aurora/RESEARCH.md` — EXISTS at
HEAD, 304 lines; W-AUR1 may revise its content, and DOC1's citation must trace to the final),
W-BLOB1 (`goo-blob/RESEARCH.md` — EXISTS at HEAD, 261 lines; same revise-then-cite ordering),
W-AUR-WEBGPU-DECIDE (the W14-restoration reconcile — the HARD dependency: clause 2's tense-match
cannot be authored ahead of the disposition), W-CON1/W-CON2 (the constellation drift-source ship
that the README asserts). The two RESEARCH.md presence-checks (clause 4) are already satisfiable
at HEAD; only the W14 reconcile (clause 2) is a HARD block on a sibling wave's outcome.

---

## Defect (source-grounded, file:line)

The seed premise "the 4 READMEs are DEFERRED / from-zero" is FALSE — all four ship at HEAD
(`at-dock-convergence`): `aurora/README.md` (702 lines), `goo-blob/README.md` (422),
`dock/README.md` (299), `constellation/README.md` (381). This is a **quality-uplift +
meta-strip + doc-vs-source reconcile**, NOT a write. Three concrete defect classes:

### D1 — provenance / version-history meta on the public surface (greenfield-no-meta)

The shipped README is a consumer-facing surface; the wave archaeology belongs in the tranche
docs, not in `src/`. Two READMEs leak it:

- **`constellation/README.md:15-25`** — a "Research-backed" provenance blockquote that is
  pure wave history: *"The primitive lands the `useCanvas2D` + `Constellation` design that
  AV.W8 authored but GATED-NOT-LANDED ... the slides anomaly-ring deck is consumer #2 that
  adopts it at AX.W30 ... AX.W17 completes the abstraction."* This describes the build arc,
  not what IS. (H-constellation FINDING 5.)
- **`aurora/README.md:23-39`** — a "Research-backed" blockquote whose back half is a
  five-wave arc narrative: *"The aurora perfection arc landed across five waves, each gated:
  W4 — painterly ... W5 — color ... W6 — options — AX.W10 converged it ... W7 — WebGPU ...
  W8 — interactive."* The FRONT half (the SOTA-cited / DESIGN.md-authoritative statement) is
  legitimate research framing and STAYS; the back-half wave-by-wave arc is meta and goes.

### D2 — inline wave tags on the public surface (constellation file-heads + aurora prose)

- **`constellation/constellationField.ts:1`** + **`constellation/index.ts:1`** — both
  file-head doc-comments open `// AW.W17 — ...`. These are PUBLIC doc-comments (they ride
  the shipped `dist/` source map / a reader's editor). H-constellation FINDING 5: the headers
  ALSO conflict with the README/warp comments that say **AX.W17** — the work is AX.W17; the
  `AW.W17` headers are stale.
- **`aurora/README.md`** carries inline `AX.W10`/`AX.W11`/`AX.W13` tags in PROSE (`:33`,
  `:39`, `:145`, `:266`, `:329`, `:355`, `:373`, `:409`). The prose tags read as internal
  changelog. (NOTE the distinction in §"Scope boundary" below — internal `:NNN`
  source-line citations stay; tranche-letter prose tags go.)

### D3 — stale W14-restoration prose contradicting the EXCISE outcome (doc-vs-source drift)

`aurora.wgsl.ts` is a medium-less smooth-pole twin; the W7c multi-pass scaffold was EXCISED
(zero consumers, AX.W14 — H-aurora FINDING 1+7). But the README still describes AX.W14 as a
PENDING *restoration*:

- **`aurora/README.md:395`** — heading *"WebGPU — gated OFF by default until the W14 parity
  finalize (KNOWN LIMITATION)"*.
- **`aurora/README.md:373`** — *"(… behind `WEBGPU_PARITY` until the W14 finalize) relaxes this
  on the WebGPU branch only"* (a SIXTH W14-restoration prose site the sweep must also catch —
  verified at HEAD `grep -n 'W14' aurora/README.md` returns `:35,:373,:395,:422,:432,:468`).
- **`aurora/README.md:422`** — *"the cap-lift is a W14 follow-up."*
- **`aurora/README.md:432-434`** — *"**The restoration wave is AX.W14** ... it owns the
  `WEBGPU_PARITY` flip ... a knowingly-DEGRADED phased outcome with a named restoration wave."*
- **`aurora/README.md:35`** (inside the D1 blockquote) — *"gated OFF by default behind
  `WEBGPU_PARITY` until the W14 multi-pass finalize."*
- **`aurora/README.md:468`** — *"staged with the W14 painterly finalize."*

AX.W14 RAN and its verdict was the de-facto EXCISE (the multi-pass scaffold deleted). The
README points at a wave that did NOT restore — it excised. This drift is downstream of
W-AUR-WEBGPU-DECIDE (retire-or-resurrect); W-DOC1 reconciles the PROSE to whichever
disposition that wave lands.

### D4 — "(planned)" prose for work that landed (accurate-status)

Spot-check confirms the two `planned`/`coming` hits are already self-correcting in prose
(`goo-blob/README.md:229` *"it is no longer 'planned'"*; `dock/README.md:139` *"coming alive
on touch"* — not a deferral). The gate still requires a sweep: ZERO `(planned — *)` /
`(coming —)` / `TODO` / "will ship" prose describing LANDED work across all four.

### D0 — the research-citation gap (the headline uplift)

The READMEs cite SOTA techniques inline. **`aurora/README.md:638`**, **`goo-blob/README.md:395`**,
and **`constellation/README.md:372`** each carry a `## References` HEADING; **`dock/README.md`
does NOT** — it carries its citations as INLINE blockquote lines (`> Sources: …` and
`> [NN/g — Liquid Glass](…) — accessed 2026-06-06.` at `:114`), a cited-source-with-access-date
block but NOT under a `## References` heading (verified at HEAD: `grep '## References'
dock/README.md` → 0). NONE of the four READMEs cites the per-lane **`RESEARCH.md`** as the
authoritative research artefact.

**Status of the `RESEARCH.md` artefacts at HEAD (re-verified — the original D0 framing was
STALE):** `aurora/RESEARCH.md` (304 lines) AND `goo-blob/RESEARCH.md` (261 lines) **ALREADY EXIST**
at HEAD `fba6262` (`find src/components/custom -name RESEARCH.md` → both present). The earlier
"they do not exist yet; produced by W-AUR1/W-BLOB1" claim is false against the live tree. This
SOFTENS — does not remove — the W-AUR1/W-BLOB1 dependency: those waves may REVISE the research
artefacts (and DOC1's citation must trace to the FINAL content), but the fail-closed
presence-check (clause 4) is already satisfiable at HEAD. `constellation` has no `RESEARCH.md`
(it cites its proximity-graph ancestry inline at `:372-381`); `dock` has no `RESEARCH.md` (it
cites the AX dock-research corpus). The uplift binds each README's research section to its lane's
authoritative research artefact — `./RESEARCH.md` where one exists (aurora, blob), the inline
References block elsewhere (constellation, dock).

---

## Goal criterion

The four shipped component READMEs read as research-backed, meta-free, consumer-facing source
of truth. A fresh reader opening `aurora/README.md` sees the SOTA technique behind each axis
with a citation that traces to the lane's `RESEARCH.md`, NOT a wave-by-wave build arc; opening
`constellation/README.md` sees what the primitive IS, NOT which wave authored it; and no
shipped doc-comment or README prose contradicts the source (no "W14 restoration pending" over
an excised path, no stale `AW.W17` over `AX.W17` work, no "planned" over landed).

## Completion criterion

The HARD GATE below verifies via a new fail-closed gate `proof:readme-meta-clean` (a
deletion/absence proof over the four shipped READMEs + the two constellation file-heads) PLUS
a per-README research-citation presence check, PLUS the W14-prose reconcile cross-walked
against W-AUR-WEBGPU-DECIDE's landed disposition.

---

## Scope boundary (what the strip does NOT touch)

The meta-strip is SURGICAL — it removes provenance/arc/restoration prose, NOT load-bearing
internal references:

- **KEEP** internal `file.ts:NNN` source-line citations (e.g. `aurora.frag.ts:348`,
  `tokens.css:495-512`) — these are how a maintainer navigates the source; they are reference
  pointers, not version history.
- **KEEP** the `## proof:*` gate-table rows in the aurora README (`:621-634`) that read
  `shipped (AV.W1)` / `shipped (AW.W4)` — these are a CAPABILITY ledger (what each gate
  asserts), and the parenthetical wave is the gate's provenance, which is legitimate for a
  test-coverage table. (If the close-honesty review judges these as meta, they convert to a
  `## Gates` table WITHOUT the wave parenthetical — author's-discretion, recorded so the gate
  does not false-fire on them.)
- **KEEP** the front-half SOTA-cited framing of both blockquotes (the "documents X as it
  ships, with the SOTA technique behind each axis cited" sentence). Only the wave-arc /
  provenance back-half is struck. The blockquote becomes a research-citation pointer to
  `RESEARCH.md`, not a build log.
- **STRIP** tranche-letter PROSE tags (`AX.W10`, `AW.W17`, `AV.W8`, `AX.W30`) wherever they
  narrate WHEN/WHICH-WAVE rather than WHAT.

The boundary is encoded in the gate's allowlist (§"Hard gate" below): the gate forbids
`A[VWX]\.W[0-9]+` in README PROSE and file-head doc-comments, with the gate-table rows
explicitly exempted by section-fence.

---

## Edit sites (exact)

| # | File | Site | Edit |
|---|---|---|---|
| 1 | `src/components/custom/constellation/README.md` | `:15-25` | DELETE the provenance blockquote; replace with a one-line research-citation pointer (`> Research-backed — see [`RESEARCH.md`](./RESEARCH.md) for the cited proximity-graph / Canvas2D-substrate techniques.` — or fold the citation into `## References`) |
| 2 | `src/components/custom/constellation/constellationField.ts` | `:1` | strike `// AW.W17 — ` prefix → meta-free engine description (`// The constellation field engine: a pure, framework-free proximity graph. ...`) |
| 3 | `src/components/custom/constellation/index.ts` | `:1` | strike `// AW.W17 — ` prefix → `// The Constellation package barrel.` |
| 4 | `src/components/custom/aurora/README.md` | `:26-39` | DELETE the five-wave arc back-half of the blockquote; KEEP `:23-25` SOTA framing; repoint to `RESEARCH.md` |
| 5 | `src/components/custom/aurora/README.md` | `:33,:39,:145,:266,:329,:355,:373,:409` | strike tranche-letter PROSE tags (`AX.W10`/`AX.W11`/`AX.W13`) — rewrite each sentence to state the design fact without the wave tag |
| 6 | `src/components/custom/aurora/README.md` | `:35,:373,:395,:422,:432-434,:468` (the SIX W14 prose sites, verified at HEAD) | RECONCILE the W14-restoration prose to W-AUR-WEBGPU-DECIDE's landed disposition (see §"W14 reconcile" — retire-branch vs resurrect-branch wording) |
| 7 | `src/components/custom/aurora/README.md` | `## References` (`:638`) | add a `RESEARCH.md` citation row (the authoritative research artefact produced by W-AUR1) |
| 8 | `src/components/custom/goo-blob/README.md` | `## References` (`:395`) | add a `RESEARCH.md` citation row (produced by W-BLOB1); sweep D4 "planned"-prose |
| 9 | `src/components/custom/dock/README.md` | the inline citation blockquote at `:110-114` (`> Sources: …` + `> [NN/g — Liquid Glass](…) — accessed 2026-06-06.`; there is NO `## References` HEADING in this README — verified) | already research-cited (NN/g, 2026-06-06) — ADD a citation to the dock research corpus (`docs/tranches/AX/research/dock-facilities-corpus.json` / `dock-liquidglass-README.md`) as the lane's research artefact, appended to the existing inline blockquote or under a NEW `## References` heading (author's choice; record which). D2 prose-tag absence: VERIFIED tag-clean at HEAD (`grep -E 'A[VWX]\.W[0-9]+' dock/README.md` → 0) — no strip needed |
| 10 | new `scripts/proof-readme-meta-clean.mjs` | — | author the fail-closed gate (§"Hard gate") + wire `proof:readme-meta-clean` into `package.json` scripts |

**Public doc-comment sweep (D2, beyond constellation):** the gate scans the file-head
doc-comment (line 1, the first `//` / `/**` block) of every shipped SFC + barrel under
`src/components/custom/{aurora,goo-blob,dock,constellation}/` for a leading `A[VWX]\.W\d+`
tag. Aurora/blob/dock source heads carry wave tags too (verified: `Aurora.vue`,
`GlassDock.vue`, `gpuRuntime.ts`, etc.) — but these are INTERNAL implementation files whose
heads are NOT consumer-facing the way the README + the package `index.ts` barrel + the
engine free-function module are. **Decision (recorded):** the gate scans ONLY (a) the four
READMEs and (b) the package `index.ts` barrels + the named engine modules
(`constellationField.ts`) — the surfaces a consumer reads via the subpath. Internal
composables/shaders keep their wave-tag heads (they are the source-line-citation class, kept
per the scope boundary). This keeps the gate from churning ~40 internal files for a
public-surface concern.

---

## W14 reconcile (edit site 6 — branches on W-AUR-WEBGPU-DECIDE)

W-DOC1 runs AFTER W-AUR-WEBGPU-DECIDE lands its disposition. Two prose outcomes:

- **If RETIRED** (`aurora.wgsl.ts`/`gpuRuntime.ts`/`WEBGPU_PARITY` deleted): the entire
  `### WebGPU` section (`:395-446`) is REWRITTEN to a NON-GOAL note — *"Aurora is a
  single-pass WebGL2 surface by design; the multi-pass painterly half (Gaussian-smoothed
  tensor + anisotropic Kuwahara) that a WebGPU compute path would enable was evaluated and
  NOT shipped — no consumer demanded the Kuwahara finish, and the single-pass field meets the
  arresting bar. There is no WebGPU twin."* All `until the W14 finalize` / `restoration wave`
  / `W14 follow-up` / `staged with the W14 painterly finalize` prose is DELETED.
- **If RESURRECTED** (named consumer + parity definition): the section states the SHIPPED
  parity contract (the named consumer route, the stated parity definition) in the PRESENT
  tense — NO "until the W14 finalize" future-tense, NO "restoration wave is AX.W14" (the work
  landed; describe what IS).

Either way: ZERO occurrence of "restoration wave is AX.W14" / "until the W14 ... finalize" /
"W14 follow-up" / "staged with the W14" survives in the shipped README. This is the
doc-vs-source-reconcile artefact class the hard-gate discipline names.

---

## Hard gate

`proof:readme-meta-clean` (new fail-closed gate, `scripts/proof-readme-meta-clean.mjs`,
wired into `package.json`, run by CI) is GREEN, asserting ALL of:

1. **META-STRIP (deletion proof).** Across the four READMEs + the two named public modules
   (`constellation/constellationField.ts`, `constellation/index.ts`) + the four package
   `index.ts` barrels:
   - ZERO `A[VWX]\.W\d+` tranche-letter tag in README PROSE or in a scanned file-head
     doc-comment (the gate-table section in `aurora/README.md` is fenced-out by an explicit
     `## proof` / `## Gates` section marker the gate skips — encoded as an allowlist range,
     NOT a blanket grep);
   - ZERO line matching the provenance-blockquote signature (`> .*(authored but
     GATED-NOT-LANDED|perfection arc landed across|completes the abstraction|consumer #2 that
     adopts)`).
2. **W14-RECONCILE (deletion proof).** ZERO occurrence of `restoration wave is AX.W14` /
   `until the W14 .*finalize` / `W14 follow-up` / `W14 painterly finalize` in
   `aurora/README.md`. Cross-walked: the surviving `### WebGPU` prose tense MATCHES
   W-AUR-WEBGPU-DECIDE's landed disposition (retire → non-goal note; resurrect → present-tense
   parity contract) — verified by the gate asserting the section contains EITHER the
   non-goal sentinel (`There is no WebGPU twin`) OR a present-tense parity-contract sentinel,
   never the future-tense restoration prose.
3. **STATUS-CLEAN (deletion proof).** ZERO `(planned — ` / `(coming — ` / `TODO` / `will ship`
   prose describing landed work across the four READMEs (the gate allows the existing
   self-negating `no longer "planned"` / `coming alive` literals via an exact-phrase
   allowlist).
4. **RESEARCH-CITATION (presence proof, per lane).** Each README's research section cites its
   lane's authoritative research artefact, present on disk:
   - `aurora/README.md` → cites `./RESEARCH.md` AND `src/components/custom/aurora/RESEARCH.md`
     EXISTS (PRESENT at HEAD, 304 lines; W-AUR1 may revise it — the gate `find`-asserts the file
     exists, and DOC1's citation must trace to the final content);
   - `goo-blob/README.md` → cites `./RESEARCH.md` AND `goo-blob/RESEARCH.md` EXISTS (PRESENT at
     HEAD, 261 lines; W-BLOB1 may revise);
   - `dock/README.md` → cites the dock research artefact
     (`docs/tranches/AX/research/dock-facilities-corpus.json` or the lane's research doc) AND
     retains its ≥1 cited external source with an access date (NN/g, present in the inline
     citation blockquote at `:114` — this README has no `## References` heading, so the gate's
     dock-arm asserts the inline blockquote line, NOT a heading);
   - `constellation/README.md` → cites its research references (the Garey-Johnson
     proximity-graph + the particle-network-motif ancestry already at `:372-381`) AND repoints
     the struck blockquote to `## References` / a `RESEARCH.md` pointer.

   The gate fails CLOSED: if a cited `RESEARCH.md` does not exist on disk, the gate is RED
   (this is what binds W-DOC1's close to W-AUR1/W-BLOB1 having shipped their research
   artefacts — a citation to a non-existent file is a broken-link defect, not a pass).

**Evidence class:** deletion-proof (clauses 1-3) + document-presence proof (clause 4) +
explicit doc-vs-source reconciliation (clause 2 cross-walk). NOT a grep-only "the word
research appears" check — the gate asserts the ABSENCE of named meta-strings AND the PRESENCE
of named on-disk artefacts AND the tense-match of the reconciled section. The gate is
reproducible (`npm run proof:readme-meta-clean` → exit 0) and fail-closed (a re-introduced
provenance blockquote, a stale W14 line, or a dangling `RESEARCH.md` citation flips it RED).

---

## Named successor (if missed)

- Clause-4 miss: the two `RESEARCH.md` files EXIST at HEAD, so the original "did-not-land"
  miss-path is moot. The residual risk is a CONTENT one — if W-AUR1 / W-BLOB1 REVISE their
  RESEARCH.md and DOC1's README citation points at stale framing, the successor is W-AUR1 /
  W-BLOB1 (DOC1's citation must trace to the FINAL research content; the orchestrator still
  orders DOC1 after the W-*1 revise per the AY EXECUTION-DAG). If a citation points at a
  NON-EXISTENT file (constellation/dock have no RESEARCH.md — they cite inline References), that
  is a DOC1 authoring bug, not a successor handoff.
- Clause-2 miss because W-AUR-WEBGPU-DECIDE has not landed its disposition → successor is
  W-AUR-WEBGPU-DECIDE; the W14-prose reconcile cannot be authored ahead of the decision.

## Cross-references

- H-aurora FINDING 1 (WGSL comment-lie) + FINDING 7 (W14-restoration drift) →
  `docs/tranches/AY/audit/hardening/H-aurora.md`.
- H-constellation FINDING 5 (provenance blockquote + AW.W17/AX.W17 mixed tags) →
  `docs/tranches/AY/audit/hardening/H-constellation.md:158-170`.
- H-precept-drift F4 (all four READMEs exist; uplift not from-zero) + the greenfield-no-meta
  chronic → `docs/tranches/AY/audit/hardening/H-precept-drift.md:103-116,192-198`.
- The greenfield-no-meta + writing-style memory keeps; the doc-currency precept.
