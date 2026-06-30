# PASS 1 — RESEARCH — LENS: BG↔BH INTERLEAVE COHERENCE (re-verify post-fold)

**Agent:** BH-INTERLEAVE researcher · **Pass:** 1 (baseline) · **Date:** 2026-06-30
**Branch:** `tranche/BG` · **HEAD:** `4c761b64` (the re-spec FOLD) · **Siblings:** intact (`verify-siblings-intact --quiet` exit 0, before AND after)
**Scope:** `docs/tranches/BH/PLAN.md §3` (interleave protocol) + `docs/tranches/BG/execution/bh-interleave-map.md`
(188L, the execution-side projection) cross-checked against the AMENDED-WAVE-PLAN's 7 folded gap-waves +
6 corrections, the live `EXECUTION-PROGRESS.md` rows, and the on-disk realized BH scaffold
(`docs/canon/`, `scripts/lib/canon-doc.mjs`, `.githooks/commit-msg`, `scripts/gates.mjs`, the 27 CLAUDE-mentioning gates).

**This baseline INDEPENDENTLY RE-VERIFIED every load-bearing on-disk fact** (not inherited from the prior pass).
Every finding below carries its verification command result. Net: the 7 prior drifts (F1–F7) all confirm TRUE;
**one NEW finding (F8) surfaced** — the B4f delete-gate's literal grep scope ≠ the B5c cleanup scope, with
`crossrepo-asks` (double-touched by G7) the standout.

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
2. **Sub-wave / shared-artifact granularity** — does any folded gap-wave write a file or mint a gate / canon-home
   that a BH wave reads/writes/re-homes, creating a NEW BG↔BH edge the interleave map's hard-collision table or
   post-WS12 DAG does NOT register?

---

## 1. THE HEADLINE: EVERY `[WSn]` EDGE SURVIVES THE FOLD AT WORKSTREAM GRANULARITY

**On-disk-verified WS slotting of all 10 gap-wave arms** (EXECUTION-PROGRESS rows, re-grepped this pass):

| Gap-wave | Wave ID | Executes | Classified WS | EXEC-PROG row |
|---|---|---|---|---|
| G4 | `BG.W-CLOSEFIX-9SITE` | **pre-WS1** (post-STAGE-0, "LANDS FIRST") | WS7 | row 12.0 |
| G6-eyebrow | `BG.W-EYEBROW-LIGHT-POLISH` | WS3 | WS3 | row 3.12 |
| G7-a | `BG.W-VIZ-DEMIGRATE` | WS5 | WS5 | row 6.3 |
| G7-b | `BG.W-VIZ-SUBSTRATE-DELETE` | WS5 | WS5 | rows 6.7 / 6.b1 |
| G2 | `BG.W-GESTALT-CURSOR-PARITY` | WS7 | WS7 | row 12.4a |
| G3 | `BG.W-CLOSE-SWEEP` | WS7 | WS7 | row 12.4b |
| G6-gate | `BG.W-GATE-FIELD-AURORA` | WS7 | WS7 | row 12.5 |
| G1-gate | `BG.W-SAFARI-PARITY-GATE` | WS7 | WS7 | row 12.8 |
| G1-shader | `BG.W-GLASS-REFRACT-WEBGL` | WS8 | WS8 | row 13.2 |
| G1-keystone | `BG.W-GLASS-BACKDROP-SAMPLE` | WS8 | WS8 | row 13.3 |

**Every gap-wave slots INTO an existing workstream (pre-WS1, WS3, WS5, WS7, WS8) — ZERO new workstreams created.**
Consequently every BH interleave class still gates on a workstream that exists and still owns the deliverable
surface the BH wave verifies-against:

- **B2.5 (dock-leaf-verify) `[WS2]`** — the lens example. WS2 (dock convergence) is **untouched by the fold** (no
  gap-wave lands in WS2). B2.5 verifies `GlassDock`/`useDockFission` carved + `useDockContextSilhouette`
  DEFINITION-ABSENT — all WS2-owned TS-leaf shapes. **Edge INTACT.** (G4 carves `shell.css`→`dock/shell-regions.css`,
  but that is a CSS partial, not a TS leaf B2.5 reads — see F5.)
- **B2.4b `[WS4]`, B2.4c `[WS5]`, B5a `[WS3]`, B3 (all δ) `[WS4]`, the post-WS12 cluster `[WS12]`** — all gate on
  workstreams that survive the fold unchanged in identity. The gap-waves added sub-waves WITHIN WS3/WS5/WS7/WS8;
  none is the gating workstream for a BH wave EXCEPT WS5 (B2.4c) and WS3 (B5a), both already pointing at the right
  surface (B2.4c verifies the viz composables G7 touches; B5a is `vite.style-assets.ts`, untouched by G6-eyebrow,
  which edits `typography.css`/`.section-label`).
- **No BH wave gates on WS7 or WS8 directly** — every WS7/WS8 gap-wave (the four close-machine gates + the two
  refraction shaders) lands BEFORE WS12, so every `[WS12]` BH wave automatically waits for them. The dominant
  fold-class (the WS7 close machine) is fully behind the `[WS12]` lock. **No `[WS12]` edge needs re-pointing.**

So at the GATING granularity the map actually uses (workstream): **YES — every `[WSn]` edge is intact.** The drift
is entirely at the **sub-wave / shared-artifact** granularity below, where the fold introduced new files, new gates,
and a canon-home location the BH interleave docs were authored BEFORE and do not yet reflect.

> **Engine caveat (corroborated, relevant here):** `bg-bh-execute.wf.js`'s `interleaveReady` returns `true`
> unconditionally for BG waves and gates BH waves via PROSE preconds parsed by a DAG-LOADER agent. So the interleave
> edges are only as correct as the prose. A drifted canon-home string (F1), an un-referenced new gate (F2), or a
> gate-scope mismatch (F8) is not a machine error today — it is a prose-coherence gap the loader inherits. That is
> why the sub-wave drift is load-bearing.

---

## 2. THE DRIFT FINDINGS (ranked; each INDEPENDENTLY re-verified on disk this pass)

### F1 (HIGH) — Canon-home PATH drift: G3 specs `docs/tranches/BG/canon/`, the realized BH scaffold homes `docs/canon/`. The fold did NOT reconcile them.

**On-disk facts (re-verified):**
- `docs/canon/` **EXISTS** — `ls docs/canon/` → `build-and-gates.md, consumer-wiring.md, conventions.md,
  dependencies.md, design-axes.md, exports-and-subpaths.md, glass-system.md, motion-system.md, structure.md` +
  `README.md` (the BH B4b-skeleton scaffold, parent-tracked top-level, NOT in the submodule).
- `docs/tranches/BG/canon/` **ABSENT** (`ls` → ABSENT).
- `scripts/lib/canon-doc.mjs` resolver keys (grepped): `build-and-gates`, `design-axes`, `glass-system`,
  `motion-system`, `consumer-wiring`, `exports-subpaths`. **There is NO `close-disease-sweep` / `close-sweep` key.**
- `EXECUTION-PROGRESS.md` row 12.4b (G3) literally specs *"**canon-home PARENT-TRACKED**
  (`docs/tranches/BG/canon/close-disease-sweep.md`, OUT of the `docs/precepts` submodule …)"*; AMENDED-WAVE-PLAN
  §2.G3 + §2.G5 repeat it and call it *"shared with G3's canon home."*

**The drift.** The submodule-fix (move the canon OUT of `docs/precepts`) is CORRECT, but the fold picked the **wrong
parent-tracked home**: a brand-new `docs/tranches/BG/canon/` the already-existing BH canon architecture
(`docs/canon/` + the `canon-doc.mjs` resolver) does not know about. G5's own words — close-battery-parity re-homes
to "the build-and-gates canon … **shared with G3's canon home**" — are **internally contradictory on disk**:
build-and-gates is at `docs/canon/build-and-gates.md` (and that file already LISTS "the `--run full` close-battery
siblings-absent canon" as a redistribute item), while G3's close-disease-sweep is specced at
`docs/tranches/BG/canon/close-disease-sweep.md`. They cannot both be "shared" without reconciliation. The fold
resolved the submodule hazard but split the close-machine canon across **two** parent-tracked homes.

**Why it is an INTERLEAVE finding.** Reconciling G3 to `docs/canon/` (matching resolver + BH architecture) **creates
a NEW BG↔BH shared-write edge the §2 hard-collision table does not register**: `docs/canon/build-and-gates.md`
(and/or a new `docs/canon/close-disease-sweep.md`) written by **G3 at WS7** AND by **BH-B4b-content at `[WS12]`**.
The serialization (WS7 < WS12) holds, so B4b-content builds on G3's content — but the edge is invisible, and
B4b-content's `auditCanonHomes()` "content-complete" assert must not clobber G3's already-landed close-sweep prose.
Conversely, if G3 stays at `docs/tranches/BG/canon/`, BH's `canon-doc.mjs` never points there, B5c re-homes
`close-battery-parity` to `docs/canon/build-and-gates.md`, and the close-machine canon is permanently fragmented —
violating the "one home discipline for both."

**Recommended reconciliation (for the amended-plan re-spec):** home G3's close-disease-sweep canon at **`docs/canon/`**
(fold into `build-and-gates.md`, or add a `close-disease-sweep` key to `canon-doc.mjs`), retire the
`docs/tranches/BG/canon/` path from row 12.4b + AMENDED §2.G3/§2.G5, and add `docs/canon/build-and-gates.md` to the
interleave map §2 hard-collision table as a **G3(WS7) → B4b-content(WS12)** shared-write edge.

---

### F2 (MEDIUM-HIGH) — `proof:claude-deletable` (G5's net-new born-RED gate) is ABSENT from the BH-side B4f gate.

G5's amended fix introduces a concrete net-new gate: *"the rm is the born-RED-last act gated by
`proof:claude-deletable` (C1 content-real homes / C2 zero hard readers / C3 file-is-last-act + self-test bites)"*
(AMENDED §2.G5 + D-G5). **Neither BH-side doc names it** (re-verified):
- `bh-interleave-map.md §4:151` B4f gate: `rg -l 'CLAUDE\.md' scripts/proof-*.mjs = 0 · the file is gone · every
  redistributed contract has a live gate at its new home.`
- `BH/PLAN.md §4:93` B4f gate: `rg -l 'CLAUDE\.md' scripts/proof-*.mjs (readFileSync sites) = 0` …

The BH delete-gate is still the **pre-fold prose** (a grep + presence check); it does not reference the
born-RED-throughout-the-tranche `proof:claude-deletable`. On disk `scripts/proof-claude-deletable.mjs` does NOT yet
exist (`ls` → ABSENT, expected — B4f unexecuted), but the B4f wave spec must reference the gate so the executing
agent builds + arms it. **Fix:** add `proof:claude-deletable (born-RED whole tranche → GREEN at delete)` to the B4f
gate line in BOTH `bh-interleave-map.md §4` and `BH/PLAN.md` B4f, and note its C2 detector is the **de-blinded** form
(flag ANY call RECEIVING the `CLAUDE.md` literal/var — the 4-missed-reader correction, F7). **F8 sharpens this:**
the existing literal `rg=0` command is not just *missing* `proof:claude-deletable` — it is a DIFFERENT (naive
string-grep) scope that will DISAGREE with the gate's receiver-scope.

---

### F3 (MEDIUM) — `proof:doc-override-idiom` re-home is UNDERSOLD in B5c; G5 requires a two-sided README↔consumer-wiring compare + an implicit B4b-content→B5c edge.

Both BH docs say B5c re-homes `proof:doc-override-idiom` **"→ README.md"** (a presence-swap). AMENDED G5 corrects it
explicitly: *"This is NOT a presence-swap — re-home must make the **consumer-wiring canon home carry the override
block verbatim-equal to README.md**, and re-point the gate to **compare README↔consumer-wiring**."*

**On-disk (re-verified):** the gate today reads BOTH `CLAUDE.md` AND `README.md` and asserts byte-parity of the
`--glass-blur-resting-radius` override block (`proof-doc-override-idiom.mjs:50` `const CLAUDE`, `:51` `const README`,
`:143-144 / :166-167` the `["CLAUDE.md", claudeDecls]` / `["README.md", readmeDecls]` pairs, `:192` the divergence
red). `docs/canon/consumer-wiring.md` is still a SKELETON. So the correct re-home is: **B4b-content lands the
override block VERBATIM in `consumer-wiring.md`**, THEN **B5c re-points the gate to compare
`README.md ↔ docs/canon/consumer-wiring.md`** (dropping the CLAUDE arm).

**The undocumented edge:** this couples **B4b-content(consumer-wiring) → B5c(doc-override-idiom re-point)** — if B5c
re-points before B4b-content lands the verbatim block, the re-pointed gate reds (the home has only skeleton prose).
The post-WS12 DAG shows `B5c→B4f`, `{B2.6,B4e}→B4f`, and the global "B4b-content precedes B4f" fence, but NOT
**B4b-content(consumer-wiring) → B5c**. **Fix:** correct the B5c line to the two-sided compare + add the
intra-`[WS12]` edge.

---

### F4 (MEDIUM) — `.githooks/commit-msg` is a shared BG×BH writer NOT in the hard-collision table; B0 (done) and G3 (WS7) both edit it.

**On-disk (re-verified):** `.githooks/commit-msg` is **already env-driven** (`TRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"`
at :15; runs `node scripts/proof-live-verified-ledger.mjs --tranche="$TRANCHE"` at :19) — BH.B0-W0 landed during BH
tranche-dev. It does NOT yet carry a close-sweep arm. G3's amended decision adds an **env-gated `proof:close-sweep`
(sweep-fast) arm** to this SAME hook (row 12.4b: *"commit-hook arm `GLASS_UI_ACTIVE_TRANCHE`-env-gated (NOT
hot-file-fires)"*). So G3 (BG WS7) EXTENDS B0's (BH, done) env-driven hook.

The §2 hard-collision table lists `src/index.ts`, `scripts/gates.mjs`, `ui/**`, `CLAUDE.md`, dock god-modules,
substrate god-modules, `vite.library.ts` — but **NOT `.githooks/commit-msg`.** The ordering is naturally satisfied
(B0 landed; G3 runs at WS7), and the risk is low BECAUSE B0 is done — but the EDGE is undocumented and the constraint
("G3 must EXTEND the existing env-driven arm, never re-introduce a `--tranche=BB` hardcode or clobber the ledger arm")
is load-bearing for the C4 self-test. **Fix:** add `.githooks/commit-msg` to §2 as a **B0(done, [C]) → G3(WS7)**
extend-not-clobber edge.

---

### F5 (MEDIUM) — B2.6 styles-colocation does NOT enumerate the 2 NEW G4 partials (`glass/grain-overlay.css`, `dock/shell-regions.css`); their cascade-order is load-bearing.

**On-disk (re-verified):** the partials are ABSENT (G4 unexecuted — `ls src/styles/glass/grain-overlay.css` →
ABSENT, `ls src/styles/dock/shell-regions.css` → ABSENT). `ladder.css`=**527L**, `shell.css`=**510L** (both >500 —
R1/R2 live reds confirmed; matches AMENDED §0). G4 will carve two new `@layer components` partials with REGISTERED
`@import`-order (`read-css-monoliths.mjs glass.order` gets `grain-overlay`; `read-dock-css.mjs DOCK_PARTIAL_ORDER`
gets `shell-regions`).

B2.6 (`[WS12]`) GATHERs 9 SAFE sheets (`border-progress, completion-seal, configurator, instrument-chassis,
hover-popover, drawer, segmented-tabs, select, icon-chip`) and KEEPs the rest global — but neither list enumerates the
two new G4 partials. By `[WS12]` both exist + are cascade-ordered. B2.6's `diff -r dist/styles_before _after EMPTY`
gate would catch a re-order break and the KEEP-global DEFAULT holds them, so a silent break is unlikely — but the map
should **explicitly mark `glass/grain-overlay.css` + `dock/shell-regions.css` KEEP-global** (they belong with the
`glass` roots / `dock-controls` already kept global) so the executor does not mistake a grain/shell partial for a
component sheet and colocate it out of its cascade slot. **Fix:** one line in B2.6's KEEP-global note.

---

### F6 (LOW-MEDIUM) — `scripts/gates.mjs` BG-writer set in §2 is STALE: omits G4 (pre-WS1) + the WS7/WS8 gap-wave gate-adds (and the downstream `ci.yml` re-emit).

§2 lists the BG `gates.mjs` writers as **"WS1, WS7, WS10, WS12."** Post-fold the writer set grew (EXECUTION-PROGRESS
re-verified):
- **G4 `BG.W-CLOSEFIX-9SITE` (pre-WS1)** writes `gates.mjs` (R3 `gates:emit-ci` regen adds `proof:category-card-warm`
  + `proof:glass-idiom-factor`; R4 `category-card-warm`→`["local","ci","release"]` tag bump; +15 gate flips) — a
  writer BEFORE WS1 the list omits.
- The WS7 gap-waves add 4 rows (`proof:close-sweep`, `proof:gestalt-cursor-parity`, `proof:field-aurora-aa`,
  `proof:safari-parity`); the WS8 gap-waves add `proof:glass-refract-fence`.
- **Downstream:** G4's R3 also re-emits `ci.yml` (`gates:emit-ci`). B5c also re-emits `ci.yml` + asserts
  `proof:gen-ci-fresh`. Both write the generated `ci.yml`; B5c is `[WS12]` (after G4) so it captures the delta.

B5b (gate-manifest-extract, `[WS12]`) extracts `gates.mjs`→`gates.manifest.mjs` with `--list byte-identical`; because
it is `[WS12]` (after every BG gates.mjs write) it naturally captures every new row — ORDERING holds, no real break.
This is a **completeness** flag: the §2 writer enumeration is stale, and B5b's byte-identical assert must include the
4+1 new rows + the `category-card-warm` tag change + the regenerated `ci.yml`. **Fix:** refresh the §2 `gates.mjs`
writer list to "pre-WS1 (G4) · WS1 · WS7 (+4 gap-rows) · WS8 (+1) · WS10 · WS12", and note `ci.yml` is a generated
downstream artifact of every gates.mjs write (B5c re-emits last).

---

### F7 (LOW) — The "16 readers" COUNT is post-fold aligned, but the 4 newly-found readers' SPECIFIC re-home keys live ONLY in the AMENDED plan, not echoed into the BH B5c spec.

Good news: both `bh-interleave-map.md` B5c and `BH/PLAN.md §1/§4` **already say "16 CLAUDE-readers"** — so the
census-widening-to-16 correction is NOT a count drift; the BH side carries 16. All 4 newly-found hard readers exist on
disk and reference CLAUDE (re-verified: `close-battery-parity` 4×, `doc-override-idiom` 14×, `on-glass-fg` 3×,
`readme-meta-clean` 11×).

The residual: the BH B5c spec lists re-home keys only generically ("16 via `canon-doc.mjs`") and names exactly one
specific re-point — `doc-override-idiom→README.md` (the wrong/simplified form, F3). AMENDED G5 enumerates the 4 with
SPECIFIC keys (close-battery-parity→**build-and-gates**, doc-override-idiom→**consumer-wiring** + README compare,
on-glass-fg→**glass-system**, readme-meta-clean→**multi-home**) + the de-blinded C2 detector. Those corrections live
ONLY in `AMENDED-WAVE-PLAN.md §2.G5` — not folded into the BH B5c wave spec the executing agent reads. **Fix:** echo
the 4 specific re-home keys + the C2 de-blind into `bh-interleave-map.md` B5c and `BH/PLAN.md` B5c (the resolver
already has `build-and-gates`/`consumer-wiring`/`glass-system` keys, so the homes resolve — only the spec prose lags).

---

### F8 (MEDIUM, NEW this pass) — The B4f delete-gate is a NAIVE STRING GREP whose scope ≠ the B5c hard-reader cleanup scope; ~7 SOFT CLAUDE-mentions sit in the gap, and `crossrepo-asks` (a soft mention that ALSO gains a G7-WS5 clause) is the double-touched standout.

**The gate text DISAGREES with itself across the two BH docs (re-verified):**
- `bh-interleave-map.md §4:151` — bare literal: `rg -l 'CLAUDE\.md' scripts/proof-*.mjs = 0`.
- `BH/PLAN.md §4:93` — qualified: `rg -l 'CLAUDE\.md' scripts/proof-*.mjs (readFileSync sites) = 0`.

The PARENTHETICAL "(readFileSync sites)" is the INTENT (the ~16 hard readers B5c re-homes). The LITERAL command is a
plain string grep. **They compute different sets.** On disk RIGHT NOW: `grep -lE 'CLAUDE\.md' scripts/proof-*.mjs` →
**27 files**. Of those, a demonstrable **~7 are SOFT** — the string `CLAUDE.md` is present but NO `readFileSync`/`read`
of the file content occurs (so they do NOT ENOENT-break on delete, so B5c's hard-reader rehome does NOT touch them):

| File | Soft kind | Line |
|---|---|---|
| `proof-crossrepo-asks.mjs` | `WAVE_BOUNDS` path-allowlist entry `"CLAUDE.md"` (the W4 `../`-escape fence; never reads content) | :56 |
| `proof-bc-fold-ledger.mjs` | prose comment `// (CLAUDE.md §"…")` | :274 |
| `proof-handmark.mjs` | prose comment | :42 |
| `proof-scroll-trigger.mjs` | prose comment `// …; CLAUDE.md side` | :87 |
| `proof-spring-tokens-synced.mjs` | prose comment `// … per CLAUDE.md …` | :7 |
| `proof-visual-runner.mjs` | prose comment `// … CLAUDE.md repeatedly names …` | :5 |
| `proof-peer-optional.mjs` | prose comment | (header) |

**The break.** B5c is scoped to the HARD readers (the 16-census; my coarse receiver-grep finds 19 — the exact count
is a soft/hard classification nuance the G5 census already litigated 12→16, not re-opened here). Whatever the hard
count, the **literal B4f command flags all 27**, including these ~7 soft files. So executed as written
(interleave-map form), **B4f cannot reach `=0`** until the 7 soft mentions are ALSO cleaned (comments rewritten off
the literal; `crossrepo-asks`'s `WAVE_BOUNDS` entry removed) — and **no BH wave currently owns that cleanup** (B5c
re-homes readers, not comments). This is the friction-history "gate literal-vs-intent mismatch / vacuity" class.

**`crossrepo-asks` is the standout (double-touched):**
1. Its `WAVE_BOUNDS` (`:56`) lists `"CLAUDE.md"` as a path the cross-repo wave "is allowed to touch." After B4f
   deletes CLAUDE.md, that allowlist entry is **stale** (references a deleted file) — a LOW cleanliness item, AND it
   is one of the ~7 strings the literal B4f gate flags.
2. G7's amended decision ADDS a new **`W5-viz-disposition`** clause to THIS SAME gate (`proof:crossrepo-asks`,
   `[local,ci,release]`), reading NEW paths (`docs/tranches/BH/coordination/asks-and-consumes.md` +
   `docs/tranches/BG/execution/consumer-constellation.md`, importing `subpath-policy.mjs`). The gate is currently
   **hardwired to `docs/tranches/BB/...`** (`RELAY/AMENDMENT/INBOUND/PROGRESS/waves`, lines 43-57). AMENDED-G7 itself
   flagged "Home-stability: confirm `crossrepo-asks` is NOT in the rehome/retire set OR pin where the viz clause lands
   post-restructure" — but **neither BH-side doc registers this G7(WS5)-edits-crossrepo-asks × BH(B5c/B5b)-restructure
   interaction.** (Reassuringly: `docs/tranches/BH/coordination/asks-and-consumes.md` **already exists** on disk —
   2.7KB, authored during BH tranche-dev — so the file G7's W5-clause reads is present at WS5; the read/write ordering
   is satisfied by construction, and the binding net is the cut's `--run full`, not the WS5 build, per AMENDED-G7.)

**Fix (two options):**
- (a) **Reconcile the B4f gate to receiver-scope** — change BOTH BH docs' B4f gate command to the `proof:claude-deletable`
  C2 receiver form (e.g. `rg "readFileSync\(.*CLAUDE|const CLAUDE *=|safeRead\(.*CLAUDE" scripts/proof-*.mjs = 0`,
  the de-blinded "ANY call RECEIVING the literal/var"), so the gate measures hard readers (intent) not naive strings.
  This is the cleanest — it aligns the B4f gate with the gate F2 says to add.
- (b) **Widen B5c's cleanup** to additionally strip the ~7 soft string-mentions (rewrite the comments off the literal,
  remove `crossrepo-asks`'s `WAVE_BOUNDS` `"CLAUDE.md"` entry) so a naive `rg=0` passes.

Either way, **record the G7(WS5)→`crossrepo-asks` edit as a §2 hard-collision edge** (G7 must EXTEND, never clobber,
the BB-hardwired gate; BH's B5c/B5b restructure of the same gate must preserve G7's W5-clause), and **remove the stale
`WAVE_BOUNDS CLAUDE.md` entry** at the crossrepo restructure or at B4f.

---

## 3. THE RE-VERIFIED INTERLEAVE TABLE (post-fold)

`INTACT` = the `[WSn]` edge survives the fold unchanged. `DRIFT-Fn` = a sub-wave/shared-artifact gap (above).

| BH wave | Class | Gates on | Post-fold verdict |
|---|:---:|:---:|---|
| B0 W0-scratch-sweep | [C] | — | **INTACT** (landed); **DRIFT-F4** — shares `.githooks/commit-msg` with G3(WS7) |
| B1 W1-external-payload | [C] | — | INTACT (`vite.library.ts` × WS6 graze already in §2) |
| B1 W2-value-destraddle | [C] | — | INTACT **edge** — but the LITERAL value floor is `^1.2.0` here vs the audit's CORRECTED `^1.1.1` (§4 note) |
| B1 W3-dragmorph-snap-excise | [C] | — | INTACT |
| B2.0 W-alias-codemod | [C] | — | INTACT |
| B2.1-mech W-regen-mechanism | [C] | — | **INTACT + DONE** — `proof:subpath-classify` LIVE at `gates.mjs:377` (real script on disk); aligns with AMENDED-G7 "Lock-2 ALREADY LIVE" |
| B2.4a W-bh-carves | [C]¹ | — | INTACT (carousel arm × WS10 graze already in §2) |
| B2.5 W-dock-leaf-verify | [WS2] | WS2 | **INTACT** — WS2 untouched by the fold (the lens example holds) |
| B2.4b W-leaf-verify-ws4 | [WS4] | WS4 | INTACT |
| B2.4c W-leaf-verify-ws5 | [WS5] | WS5 | **INTACT** — G7 lands in WS5; B2.1-swap "captures WS5 viz deletes/renames." Optional LOW widen: confirm viz subpath KEYS survived G7 (key-preserved per rows 6.3/6.7) |
| B2.6 W-styles-colocation | [WS12] | WS12 | **DRIFT-F5** — does not enumerate the 2 new G4 partials (KEEP-global) |
| B2.1-swap W-regen-swap | [WS12] | WS12 | INTACT — re-baselines WS5/WS6 deltas |
| B2.2 W-api-fold | [WS12] | WS12 | INTACT |
| B2.3 W-curated-relocate | [WS12] | WS12 | INTACT |
| B3 δ1–δ6 | [WS4] | WS4 | INTACT (batched post-WS12; runs after WS8/G1's `demo/main.ts` C18 edits) |
| B4a-archive-refresh | [C] | — | INTACT |
| B4b-skeleton | [C] | — | **INTACT + DONE** (`docs/canon/` + `canon-doc.mjs` + `docs/design/` on disk) |
| B4b-content | [WS12] | WS12 | **DRIFT-F1** — new G3(WS7)→B4b-content(WS12) shared-write of `docs/canon/build-and-gates.md`; **DRIFT-F3** — must land consumer-wiring override block before B5c |
| B4c-precept-extract | [C]/[WS2]/[WS12] | WS2,WS12 | INTACT (the 4 design docs already extracted to `docs/design/`) |
| B4d-evidence-prune | [C]/[WS12] | WS12 | INTACT |
| B4e-doc-slim | [WS12] | WS12 | INTACT |
| **B4f-claude-delete** | [WS12] LAST | WS12+B5c | **DRIFT-F2** (add `proof:claude-deletable`); **DRIFT-F8** (literal-grep scope ≠ cleanup scope; ~7 soft mentions + the `crossrepo-asks` `WAVE_BOUNDS`/G7 double-touch block the bare `rg=0`) |
| B5a-deps-currency | [WS3] | WS3 | INTACT — WS3's G6-eyebrow touches `typography.css`/`.section-label`, NOT `vite.style-assets.ts` |
| B5b-gate-manifest-extract | [WS12] | WS12 | **DRIFT-F6** — must capture the +5 new gap-wave rows (+ tag bump + regen ci.yml) in `--list` |
| B5c-gate-rehome | [WS12] | WS12 | **DRIFT-F2/F3/F7/F8** — proof:claude-deletable + doc-override two-sided + the 4 specific re-home keys + reconcile-or-widen for the soft mentions / `crossrepo-asks` |
| B6 W-core-prompts | [C] | — | INTACT |
| B7 W-api-ask-roster | [WS12] | WS12+B2.2 | INTACT — already "Confirm BG-WS5 owns the viz-subpath/slides migration"; G7 is that owner. The `asks-and-consumes.md` it authors is the file G7-WS5's W5-clause reads (file pre-exists — read/write order OK; see F8) |

¹ the carousel arm of B2.4a × WS10 — pre-existing graze, already in §2.

---

## 4. ANSWERS TO THE LENS QUESTIONS (direct)

**Q: Are the BH interleave POINTS still correctly gated against the AMENDED BG wave IDs (not the pre-fold ones)?**
**A: At the workstream granularity the map uses — YES, every `[WSn]` edge is intact** (the 7 gap-waves slot into
existing WS1/WS3/WS5/WS7/WS8, ZERO new workstreams; B2.5-after-WS2 and all `[WS12]` edges verify intact).
**At the sub-wave / shared-artifact granularity — NO, there are 8 drifts** (F1–F8), one HIGH (F1: the fold's chosen
G3 canon-home `docs/tranches/BG/canon/` is inconsistent with the realized BH `docs/canon/` scaffold + `canon-doc.mjs`
resolver and was never reconciled) and one NEW (F8: the B4f literal-grep delete-gate's scope ≠ the B5c hard-reader
cleanup scope, with `crossrepo-asks` double-touched by G7).

**Q: Any BH band that now needs to wait on a NEW BG gap-wave it doesn't currently reference?**
**A: Three new BG→BH edges the map does not register:**
1. **G3 (WS7) → B4b-content (WS12)** on `docs/canon/build-and-gates.md` (after F1 reconciliation) — G3 authors the
   close-machine canon prose; B4b-content's `auditCanonHomes()` must build on it, not clobber it.
2. **B0 (done) → G3 (WS7)** on `.githooks/commit-msg` (F4) — G3 must EXTEND B0's env-driven hook, never clobber.
3. **G7 (WS5) → `proof:crossrepo-asks`** (F8) — G7 adds the `W5-viz-disposition` clause to the BB-hardwired gate;
   BH's B5c/B5b restructure of the same gate must preserve it; the file G7 reads (`asks-and-consumes.md`) pre-exists
   so order holds. Plus one intra-`[WS12]` edge: **B4b-content(consumer-wiring) → B5c(doc-override re-point)** (F3).

**No BH band needs to wait on a gap-wave it cannot already reach via its `[WSn]` class** — all new edges are either
inside `[WS12]` (already serialized) or behind an already-landed `[C]` wave (B0). The exposure is PROSE-COHERENCE
(the DAG-loader parses prose; a stale home string, an un-named gate, or a gate-scope mismatch is the failure mode),
not a broken ordering — EXCEPT F8, where the bare-literal B4f gate command, executed as written, cannot reach `=0`
until the soft mentions are cleaned (a real, if mechanical, blocker the cleanup scope must own).

---

## 5. CROSS-CUTTING NOTE FOR THE SYNTHESIS (a literal conflict, not this lens's to resolve)

The value.js floor is the one place the BH docs and the BG amended plan **openly disagree on a literal** (both
re-verified): BH `B1-W2` (`bh-interleave-map:28`, `BH/PLAN.md:62/63`) say `^0.13.0||^1.0.0 → **^1.2.0**`; the BG
audit CORRECTED the floor to `^1.1.1` (AMENDED §1.4 + §2.G6 + EXECUTION-PROGRESS row 12.5: "`^1.2.0` would EXCLUDE
npm-latest 1.1.1 + red `proof:peer-conformance`'s admits-latest clause"). Since `B1-W2` is a `[C]` wave that lands
EARLY and edits `package.json` peer/deps, an executor following the stale `^1.2.0` BH text re-introduces the exact
peer-conformance red the audit fixed. **This is a friction-history / dependency-floor-miscalculation lens item**
(SEED-CONTEXT class), surfaced here only because it lives in a BH interleave wave — flag it to that lens; the BH
`B1-W2` string must be reconciled to `^1.1.1` before B1 executes.

---

## 6. SIBLINGS

`node scripts/verify-siblings-intact.mjs --quiet` → exit **0** at start AND end of pass. Read-only throughout; the
only write is this report under `docs/tranches/BG/audit/RESPEC-COHERENCE/`. No path outside
`/Users/mkbabb/Programming/glass-ui` touched.
