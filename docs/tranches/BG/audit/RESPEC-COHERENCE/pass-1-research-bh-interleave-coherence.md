# PASS 1 — RESEARCH — LENS: BG↔BH INTERLEAVE COHERENCE (re-verify post-fold)

**Agent:** BH-INTERLEAVE researcher · **Pass:** 1 (baseline) · **Date:** 2026-06-30
**Branch:** `tranche/BG` · **HEAD:** `4c761b64` (the re-spec FOLD) · **Siblings:** intact (verify exit 0, before)
**Scope:** `docs/tranches/BH/PLAN.md §3` (the interleave protocol) + `docs/tranches/BG/execution/bh-interleave-map.md`
(188L, the execution-side projection) cross-checked against the AMENDED-WAVE-PLAN's 7 folded gap-waves +
6 corrections, the live `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` rows, and the on-disk realized
BH scaffold (`docs/canon/`, `scripts/lib/canon-doc.mjs`, `.githooks/commit-msg`, `scripts/gates.mjs`).

---

## 0. THE QUESTION + THE METHOD

The lens question, verbatim: *after the audit folded 7 new BG gap-waves + corrections (incl. G3's canon-home
moving OUT of the `docs/precepts` SUBMODULE, G5's CLAUDE-delete census widening to 16 readers), are the BH
interleave POINTS still correctly gated against the AMENDED BG wave IDs (not the pre-fold ones)? Any BH band
that now needs to wait on a NEW BG gap-wave it doesn't currently reference?*

**Method.** The interleave map gates each BH wave on a **workstream class** (`[C]` / `[WSn]` / `[WS12]`), NOT on
an individual wave ID. So the gating axis is the WORKSTREAM, and the test is two-part:
1. **Workstream-granularity** — did any folded gap-wave create a NEW workstream, or reshape an existing WSn's
   deliverable surface, such that a BH `[WSn]` edge now points at the wrong thing?
2. **Sub-wave / shared-artifact granularity** — does any folded gap-wave write a file or mint a gate/canon-home
   that a BH wave reads/writes/re-homes, creating a NEW BG↔BH edge the interleave map's hard-collision table or
   post-WS12 DAG does NOT register?

---

## 1. THE REASSURING HEADLINE: EVERY `[WSn]` EDGE SURVIVES THE FOLD AT WORKSTREAM GRANULARITY

**On-disk-verified WS slotting of all 7 gap-waves** (EXECUTION-PROGRESS rows + build-map):

| Gap-wave | Wave ID | Executes | Classified WS |
|---|---|---|---|
| G4 | `BG.W-CLOSEFIX-9SITE` | **pre-WS1** (post-STAGE-0, "LANDS FIRST") | WS7 Band 0.5 (row 12.0) |
| G6-eyebrow | `BG.W-EYEBROW-LIGHT-POLISH` | WS3 Phase 3 | WS3 (row 3.12) |
| G7-a | `BG.W-VIZ-DEMIGRATE` | WS5 | WS5 (row 6.3) |
| G7-b | `BG.W-VIZ-SUBSTRATE-DELETE` | WS5 | WS5 (build-map §WS5) |
| G2 | `BG.W-GESTALT-CURSOR-PARITY` | WS7 | WS7 (row 12.4a) |
| G3 | `BG.W-CLOSE-SWEEP` | WS7 | WS7 (row 12.4b) |
| G6-gate | `BG.W-GATE-FIELD-AURORA` | WS7 | WS7 (row 12.5) |
| G1-gate | `BG.W-SAFARI-PARITY-GATE` | WS7 | WS7 (row 12.8) |
| G1-shader | `BG.W-GLASS-REFRACT-WEBGL` | WS8 | WS8 (row 13.2) |
| G1-keystone | `BG.W-GLASS-BACKDROP-SAMPLE` | WS8 | WS8 (row 13.3) |

**Every gap-wave slots INTO an existing workstream (pre-WS1, WS3, WS5, WS7, WS8) — ZERO new workstreams are
created.** Consequently every BH interleave class still gates on a workstream that exists and still owns the
deliverable surface the BH wave verifies-against:

- **B2.5 (dock-leaf-verify) `[WS2]`** — the example named in the lens. WS2 (dock convergence) is **untouched by the
  fold** (no gap-wave lands in WS2). B2.5 verifies `GlassDock`/`useDockFission` carved + `useDockContextSilhouette`
  DEFINITION-ABSENT — all WS2-owned TS-leaf shapes. **Edge INTACT.** (G4 carves `shell.css`→`dock/shell-regions.css`,
  but that is a CSS partial, not a TS leaf B2.5 reads — see F5.)
- **B2.4b `[WS4]`, B2.4c `[WS5]`, B5a `[WS3]`, B3 (all δ) `[WS4]`, the post-WS12 cluster `[WS12]`** — all gate on
  workstreams that survive the fold unchanged in identity. The gap-waves added sub-waves WITHIN WS3/WS5/WS7/WS8;
  none of those is the gating workstream for a BH wave EXCEPT WS5 (B2.4c) and WS3 (B5a), both of which already
  reference the right surface (B2.4c verifies the viz composables WS5/G7 touches; B5a is `vite.style-assets.ts`,
  untouched by G6-eyebrow).
- **No BH wave gates on WS7 or WS8 directly** — every WS7/WS8 gap-wave (the four close-machine gates + the two
  refraction shaders) lands BEFORE WS12, so every `[WS12]` BH wave automatically waits for them. The dominant
  fold-class (the WS7 close machine) is fully behind the `[WS12]` lock. **No `[WS12]` edge needs re-pointing.**

So the answer to "are the BH interleave POINTS still correctly gated against the AMENDED BG wave IDs" at the
GATING granularity the map actually uses (workstream) is: **YES — every `[WSn]` edge is intact.** The drift is
entirely at the **sub-wave / shared-artifact** granularity below, where the fold introduced new files, a new gate,
and a canon-home location that the BH interleave docs were authored BEFORE and do not yet reflect.

> **Engine caveat (from the sibling DAG lens, relevant here):** `bg-bh-execute.wf.js`'s `interleaveReady` returns
> `true` unconditionally for BG waves and gates BH waves via PROSE preconds parsed by a DAG-LOADER agent. So the
> interleave edges are only as correct as the prose. A drifted canon-home string (F1) or an un-referenced new gate
> (F2) is not a machine error today — it is a prose-coherence gap the loader will inherit. That is exactly why the
> sub-wave drift below is load-bearing.

---

## 2. THE DRIFT FINDINGS (ranked)

### F1 (HIGH) — Canon-home PATH drift: G3 homes `docs/tranches/BG/canon/`, the realized BH scaffold homes `docs/canon/`. The fold did NOT reconcile them.

**The on-disk facts (all verified this pass):**
- `docs/canon/` **already exists** (committed `2846bb25` "BH B4b-skeleton", an **ANCESTOR of the fold `4c761b64`**)
  with `build-and-gates.md`, `consumer-wiring.md`, `glass-system.md`, `motion-system.md`, `structure.md`, … —
  the BH B4b-skeleton canon scaffold, parent-tracked (top-level, NOT in the submodule).
- `scripts/lib/canon-doc.mjs` (the B5c resolver seam) homes EVERY cross-cutting canon at `docs/canon/<topic>.md`
  (`build-and-gates`, `consumer-wiring`, `glass-system`, …). **There is NO `close-disease-sweep` / `close-sweep`
  key in the resolver.**
- `docs/canon/build-and-gates.md` **already lists** "the `--run full` close-battery siblings-absent canon" as a
  redistribute item — i.e. it IS the home G5 re-points `proof:close-battery-parity` to.
- `docs/tranches/BG/canon/` **does NOT exist.**
- EXECUTION-PROGRESS **row 12.4b (G3)** literally specifies: *"**canon-home PARENT-TRACKED**
  (`docs/tranches/BG/canon/close-disease-sweep.md`, OUT of the `docs/precepts` submodule …)"* — and the AMENDED
  plan G3 + G5 repeat it ("PARENT-TRACKED doc … shared with G3's canon home").

**The drift.** The audit's submodule-fix (move the canon OUT of `docs/precepts`) is CORRECT, but it picked the
**wrong parent-tracked home**: a brand-new `docs/tranches/BG/canon/` dir that the already-existing BH canon
architecture (`docs/canon/` + the `canon-doc.mjs` resolver) does not know about. G5's own words — close-battery-parity
re-homes to "the build-and-gates canon … **shared with G3's canon home**" — are now **internally contradictory on
disk**: build-and-gates is at `docs/canon/build-and-gates.md`, G3's close-disease-sweep is specced at
`docs/tranches/BG/canon/close-disease-sweep.md`. They cannot both be "shared" without reconciliation. The fold
resolved the submodule hazard but split the close-machine canon across **two** parent-tracked homes.

**Why it's an INTERLEAVE finding, not just a BG-internal one.** Reconciling G3 to the correct home (`docs/canon/`,
matching the resolver + BH architecture) **creates a NEW BG↔BH shared-file edge the interleave map's hard-collision
table (§2) does not register**: `docs/canon/build-and-gates.md` (and/or a new `docs/canon/close-disease-sweep.md`)
would be written by **G3 at WS7** (the close-machine canon prose) AND by **BH-B4b-content at `[WS12]`** (the rest of
the §Build/gate-hygiene redistribution). The serialization (WS7 before WS12) holds, so B4b-content builds on G3's
content — but this edge is invisible in the map, and B4b-content's `auditCanonHomes()` "content-complete" assert
must not clobber G3's already-landed close-sweep prose. Conversely, if G3 stays literally at
`docs/tranches/BG/canon/` (the row-12.4b text), then BH's `canon-doc.mjs` resolver never points there, B5c re-homes
`close-battery-parity` to `docs/canon/build-and-gates.md`, and the close machine's canon is permanently fragmented —
violating the "one home discipline for both" the audit explicitly claimed.

**Recommended reconciliation (for the amended-plan re-spec):** home G3's close-disease-sweep canon at **`docs/canon/`**
(fold into `build-and-gates.md`, or add a `close-disease-sweep: "docs/canon/close-disease-sweep.md"` key to
`canon-doc.mjs`), retire the `docs/tranches/BG/canon/` path from row 12.4b + AMENDED-WAVE-PLAN §2.G3/§2.G5, and add
`docs/canon/build-and-gates.md` to the interleave map §2 hard-collision table as a **G3(WS7) → B4b-content(WS12)**
shared-write edge.

---

### F2 (MEDIUM-HIGH) — `proof:claude-deletable` (G5's net-new born-RED gate) is ABSENT from the BH-side B4f gate.

G5's amended fix introduces a concrete net-new gate: *"the rm is the born-RED-last act gated by
`proof:claude-deletable` (C1 content-real homes / C2 zero hard readers / C3 file-is-last-act + self-test bites)"*
(AMENDED-WAVE-PLAN §2.G5 + D-G5). **Neither BH-side doc names it:**
- `bh-interleave-map.md` B4f gate (§4, line 152): `rg -l 'CLAUDE\.md' scripts/proof-*.mjs = 0 · the file is gone ·
  every redistributed contract has a live gate at its new home.`
- `BH/PLAN.md` B4f gate (§4): same `rg=0 + file gone` shape.

The BH delete-gate is still the **pre-fold prose** (a grep + a presence check); it does not reference the
born-RED-throughout-the-tranche `proof:claude-deletable` the audit added as the actual safety mechanism. On disk
`scripts/proof-claude-deletable.mjs` does NOT yet exist (expected — B4f unexecuted), but the BH band's WAVE SPEC
must now reference the gate so the executing agent builds + arms it. **Fix:** add `proof:claude-deletable
(born-RED whole tranche → GREEN at delete)` to the B4f gate line in both `bh-interleave-map.md §4` and `BH/PLAN.md`
B4f, and note its C2 detector is the **de-blinded** form (widened to flag ANY call receiving the `CLAUDE.md`
literal/var — the 4-missed-reader correction, see F7).

---

### F3 (MEDIUM) — `proof:doc-override-idiom` re-home is UNDERSOLD in B5c; G5 requires a two-sided README↔consumer-wiring compare + an implicit B4b-content→B5c edge.

Both BH docs say B5c re-homes `proof:doc-override-idiom` **"→ README.md"** (a presence-swap). The AMENDED plan G5
corrects this explicitly: *"This is NOT a presence-swap — re-home must make the **consumer-wiring canon home carry
the override block verbatim-equal to README.md**, and re-point the gate to **compare README↔consumer-wiring**."*

On disk the gate today reads BOTH `CLAUDE.md` (the `## Consumer wiring` section) AND `README.md` and asserts W3
byte-parity of the `--glass-blur-resting-radius` override block (`proof-doc-override-idiom.mjs:50-51,113-114,184-192`).
`docs/canon/consumer-wiring.md` is still a SKELETON ("Redistributes: … the override-the-PRIMITIVE-not-the-composite
blur idiom"). So the correct re-home is: **B4b-content lands the override block VERBATIM in `consumer-wiring.md`**,
THEN **B5c re-points the gate to compare `README.md ↔ docs/canon/consumer-wiring.md`** (dropping the CLAUDE arm).

**The undocumented edge:** this couples **B4b-content (consumer-wiring) → B5c (doc-override-idiom re-point)** — if
B5c re-points before B4b-content lands the verbatim block, the re-pointed gate reds (the canon home has only the
skeleton prose, not the byte-equal block). The post-WS12 DAG (interleave map §3) shows `B5c→B4f` and
`{B2.6,B4e}→B4f`, plus the global "B4b-content precedes B4f" fence, but does NOT show **B4b-content(consumer-wiring)
→ B5c**. **Fix:** correct the B5c line to the two-sided compare and add the intra-`[WS12]` edge.

---

### F4 (MEDIUM) — `.githooks/commit-msg` is a shared BG×BH writer NOT in the hard-collision table; B0 (done) and G3 (WS7) both edit it.

`.githooks/commit-msg` is **already env-driven** on disk (`BH.B0-W0` landed — the `[C]` scratch-sweep wave executed
during BH tranche-dev; the hook reads `GLASS_UI_ACTIVE_TRANCHE`, runs `proof:live-verified-ledger --tranche=$TRANCHE`).
G3's amended decision adds an **env-gated `proof:close-sweep` (sweep-fast) arm** to this SAME hook
(*"commit-hook arm `GLASS_UI_ACTIVE_TRANCHE`-env-gated (NOT hot-file-fires)"*, row 12.4b). So G3 (BG WS7) EXTENDS
B0's (BH, done) env-driven hook.

The interleave map §2 hard-collision table lists `src/index.ts`, `scripts/gates.mjs`, `ui/**`, `CLAUDE.md`, dock
god-modules, substrate god-modules, `vite.library.ts` — but **NOT `.githooks/commit-msg`.** The ordering is
naturally satisfied (B0 already landed; G3 runs at WS7), and the risk is low BECAUSE B0 is done — but the EDGE is
undocumented, and the constraint ("G3 must EXTEND the existing env-driven arm, never re-introduce a `--tranche=BB`
hardcode or clobber the ledger arm") is load-bearing for the C4 self-test. **Fix:** add `.githooks/commit-msg` to
§2 as a **B0(done, [C]) → G3(WS7)** extend-not-clobber edge.

---

### F5 (MEDIUM) — B2.6 styles-colocation does NOT enumerate the 2 NEW G4 partials (`glass/grain-overlay.css`, `dock/shell-regions.css`); their cascade-order is load-bearing.

G4 (`BG.W-CLOSEFIX-9SITE`, lands FIRST) carves two new `@layer components` partials with REGISTERED `@import`-order
(`read-css-monoliths.mjs` `glass.order` gets `grain-overlay`; `read-dock-css.mjs` `DOCK_PARTIAL_ORDER` gets
`shell-regions`). B2.6 (styles-colocation, `[WS12]`) GATHERs 9 SAFE sheets and KEEPs the rest global — but neither
its 9-colocate list (`border-progress, completion-seal, configurator, instrument-chassis, hover-popover, drawer,
segmented-tabs, select, icon-chip`) NOR its KEEP-global list enumerates the two new G4 partials.

By `[WS12]` both partials exist and are cascade-ordered. B2.6's `diff -r dist/styles_before dist/styles_after
EMPTY` gate WOULD catch a re-order break, and the KEEP-global DEFAULT holds them (they are not in the 9-colocate
set), so this is unlikely to break silently — but the interleave map should **explicitly mark
`glass/grain-overlay.css` + `dock/shell-regions.css` KEEP-global** (they belong with the `glass` roots /
`dock-controls` the band already keeps global), so the executing agent does not mistake a grain/shell partial for a
component sheet and colocate it out of its cascade slot. **Fix:** one line in B2.6's KEEP-global note.

---

### F6 (LOW-MEDIUM) — `scripts/gates.mjs` BG-writer set in §2 is STALE: omits G4 (pre-WS1) + the 6 WS7/WS8 gap-wave gate-adds.

Interleave map §2 lists the BG `gates.mjs` writers as **"WS1, WS7, WS10, WS12."** Post-fold the writer set grew:
- **G4 `BG.W-CLOSEFIX-9SITE` (pre-WS1)** writes `gates.mjs` (R3 `gates:emit-ci` regen, R4 `category-card-warm` tag
  bump, +15 gate flips) — a writer BEFORE WS1 that the list does not include.
- The WS7 gap-waves add 4 new rows (`proof:close-sweep`, `proof:gestalt-cursor-parity`, `proof:field-aurora-aa`,
  `proof:safari-parity`); the WS8 gap-waves add `proof:glass-refract-fence`.

B5b (gate-manifest-extract, `[WS12]`) extracts `gates.mjs`→`gates.manifest.mjs` with a "`--list` byte-identical"
gate, and because it is `[WS12]` (AFTER all BG `gates.mjs` writes) it naturally captures every new row — so the
ORDERING holds and there is no real break. This is a **completeness** flag: the §2 writer enumeration is stale, and
B5b's byte-identical assert must include the 4+1 new rows (and the `category-card-warm` tag change). **Fix:**
refresh the §2 `gates.mjs` writer list to "pre-WS1 (G4) · WS1 · WS7 (+4 gap-rows) · WS8 (+1) · WS10 · WS12."

---

### F7 (LOW) — The "16 readers" COUNT is post-fold aligned, but the 4 newly-found readers' SPECIFIC re-home keys live ONLY in the AMENDED plan, not echoed into the BH B5c spec.

Good news first: both `bh-interleave-map.md` B5c and `BH/PLAN.md §1/§4` **already say "16 CLAUDE-readers"** — so the
census-widening-to-16 correction is NOT a count drift; the BH side carries 16. All 4 newly-found hard readers exist
on disk and reference CLAUDE (`close-battery-parity` 4×, `doc-override-idiom` 14×, `on-glass-fg` 3×,
`readme-meta-clean` 11×).

The residual: the BH B5c spec lists re-home keys only generically ("16 via `canon-doc.mjs`") and names exactly one
specific re-point — `doc-override-idiom→README.md` (the wrong/simplified form, F3). The AMENDED plan G5 enumerates
the 4 with SPECIFIC keys (close-battery-parity→**build-and-gates**, doc-override-idiom→**consumer-wiring** + README
compare, on-glass-fg→**glass-system**, readme-meta-clean→**multi-home**) AND the de-blinded C2 detector. Those
corrections currently live ONLY in `AMENDED-WAVE-PLAN.md §2.G5` — they are not folded into the BH B5c wave spec the
executing agent reads. **Fix:** echo the 4 specific re-home keys + the C2 de-blind into `bh-interleave-map.md` B5c
and `BH/PLAN.md` B5c (the canon-doc.mjs resolver already has `build-and-gates`/`consumer-wiring`/`glass-system`
keys, so the homes resolve — only the spec prose lags).

---

## 3. THE RE-VERIFIED INTERLEAVE TABLE (post-fold)

`INTACT` = the `[WSn]` edge survives the fold unchanged. `DRIFT-Fn` = a sub-wave/shared-artifact gap (above).

| BH wave | Class | Gates on | Post-fold verdict |
|---|:---:|:---:|---|
| B0 W0-scratch-sweep | [C] | — | **INTACT** (landed); **DRIFT-F4** — shares `.githooks/commit-msg` with G3(WS7) |
| B1 W1-external-payload | [C] | — | INTACT (vite.library.ts × WS6 graze already in §2) |
| B1 W2-value-destraddle | [C] | — | INTACT — but value floor is `^1.2.0` here vs the audit's CORRECTED `^1.1.1` (see §4 note) |
| B1 W3-dragmorph-snap-excise | [C] | — | INTACT |
| B2.0 W-alias-codemod | [C] | — | INTACT |
| B2.1-mech W-regen-mechanism | [C] | — | **INTACT + DONE** — `proof:subpath-classify` LIVE at `gates.mjs:377` (149L real script). The map's "becomes proof:subpath-classify" now describes COMPLETED work; aligns with AMENDED-G7 "Lock-2 ALREADY LIVE." |
| B2.4a W-bh-carves | [C]¹ | — | INTACT (carousel arm × WS10 graze already in §2) |
| B2.5 W-dock-leaf-verify | [WS2] | WS2 | **INTACT** — WS2 untouched by the fold (the lens example holds) |
| B2.4b W-leaf-verify-ws4 | [WS4] | WS4 | INTACT |
| B2.4c W-leaf-verify-ws5 | [WS5] | WS5 | **INTACT** — G7 (VIZ-DEMIGRATE/SUBSTRATE-DELETE) lands in WS5; B2.1-swap already "captures WS5 viz deletes/renames." Optional widen: B2.4c could also confirm the viz subpath KEYS survived G7's substrate-delete (LOW). |
| B2.6 W-styles-colocation | [WS12] | WS12 | **DRIFT-F5** — does not enumerate the 2 new G4 partials (KEEP-global) |
| B2.1-swap W-regen-swap | [WS12] | WS12 | INTACT — re-baselines WS5/WS6 deltas |
| B2.2 W-api-fold | [WS12] | WS12 | INTACT |
| B2.3 W-curated-relocate | [WS12] | WS12 | INTACT |
| B3 δ1–δ6 | [WS4] | WS4 | INTACT (batched post-WS12; runs after WS8/G1's demo/main.ts C18 edits) |
| B4a-archive-refresh | [C] | — | INTACT |
| B4b-skeleton | [C] | — | **INTACT + DONE** (`docs/canon/` + `canon-doc.mjs` + `docs/design/` on disk) |
| B4b-content | [WS12] | WS12 | **DRIFT-F1** — new G3(WS7)→B4b-content(WS12) shared-write of `docs/canon/build-and-gates.md`; **DRIFT-F3** — must land consumer-wiring override block before B5c |
| B4c-precept-extract | [C]/[WS2]/[WS12] | WS2,WS12 | INTACT (the 4 design docs already extracted to `docs/design/`) |
| B4d-evidence-prune | [C]/[WS12] | WS12 | INTACT |
| B4e-doc-slim | [WS12] | WS12 | INTACT |
| **B4f-claude-delete** | [WS12] LAST | WS12+B5c | **DRIFT-F2** — gate must add `proof:claude-deletable` |
| B5a-deps-currency | [WS3] | WS3 | INTACT — WS3's G6-eyebrow touches typography.css/.section-label, NOT `vite.style-assets.ts` |
| B5b-gate-manifest-extract | [WS12] | WS12 | **DRIFT-F6** — must capture the +5 new gap-wave rows in `--list` |
| B5c-gate-rehome | [WS12] | WS12 | **DRIFT-F2/F3/F7** — proof:claude-deletable + doc-override two-sided + the 4 specific re-home keys |
| B6 W-core-prompts | [C] | — | INTACT |
| B7 W-api-ask-roster | [WS12] | WS12+B2.2 | INTACT — already "Confirm BG-WS5 owns the viz-subpath/slides migration"; G7 is that owner |

¹ the carousel arm of B2.4a × WS10 — pre-existing graze, already in §2.

---

## 4. ANSWERS TO THE LENS QUESTIONS (direct)

**Q: Are the BH interleave POINTS still correctly gated against the AMENDED BG wave IDs (not the pre-fold ones)?**
**A: At the workstream granularity the map uses — YES, every `[WSn]` edge is intact** (the 7 gap-waves slot into
existing WS1/WS3/WS5/WS7/WS8, creating zero new workstreams; B2.5-after-WS2 and all `[WS12]` edges verify intact).
**At the sub-wave / shared-artifact granularity — NO, there are 7 drifts** (F1–F7), one HIGH: the canon-home the
fold chose for G3 (`docs/tranches/BG/canon/`) is inconsistent with the realized BH `docs/canon/` scaffold +
`canon-doc.mjs` resolver, and was never reconciled by the fold.

**Q: Any BH band that now needs to wait on a NEW BG gap-wave it doesn't currently reference?**
**A: Two new BG→BH edges the map does not register:**
1. **G3 (WS7) → B4b-content (WS12)** on `docs/canon/build-and-gates.md` (if F1 is reconciled to the correct home) —
   G3 authors the close-machine canon prose; B4b-content's `auditCanonHomes()` must build on it, not clobber it.
2. **B0 (done) → G3 (WS7)** on `.githooks/commit-msg` (F4) — G3 must EXTEND B0's env-driven hook, never clobber.

Plus one **intra-`[WS12]`** edge: **B4b-content(consumer-wiring) → B5c(doc-override re-point)** (F3).

**No BH band needs to wait on a gap-wave it cannot already reach via its `[WSn]` class** — all the new edges are
either inside `[WS12]` (already serialized) or behind an already-landed `[C]` wave (B0). The exposure is
PROSE-COHERENCE (the DAG-loader parses prose; a stale home string or an un-named gate is the failure mode), not a
broken ordering.

---

## 5. CROSS-CUTTING NOTE FOR THE SYNTHESIS (not this lens's to resolve)

The value.js floor is the one place the BH docs and the BG amended plan **openly disagree on a literal**: BH
`B1-W2` / `bh-interleave-map:28` say `^0.13.0||^1.0.0 → **^1.2.0**`; the BG audit CORRECTED the floor to `^1.1.1`
(AMENDED-WAVE-PLAN §1.4 + §2.G6: "`^1.2.0` would EXCLUDE npm-latest 1.1.1 + red proof:peer-conformance"). Since
B1-W2 is a `[C]` wave that lands EARLY (and edits `package.json` peer/deps), an executor following the stale
`^1.2.0` BH text would re-introduce the exact peer-conformance red the audit fixed. **This is a friction-history /
dependency-floor lens item** (the SEED-CONTEXT's "dependency-floor miscalculation" class), surfaced here only
because it lives in a BH interleave wave — flag it to that lens for resolution; the BH B1-W2 string must be
reconciled to `^1.1.1` before B1 executes.

---

## 6. SIBLINGS

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (start of pass). Read-only throughout; the only write is
this report under `docs/tranches/BG/audit/RESPEC-COHERENCE/`.
