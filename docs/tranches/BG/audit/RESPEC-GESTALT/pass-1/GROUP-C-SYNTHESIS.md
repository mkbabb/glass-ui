# GROUP C SYNTHESIS — Plan critique (lenses C1·C3·C5·C6·C7·C8)

**Collector:** Group C. **Date:** 2026-07-01 · branch `tranche/BG` @ `976dc890`. Every adjudication disk-verified.
**Scope:** the BG plan (C1 PHASE-0/WS1-3, C3 WS7-9), the BH plan (C5 B0-3, C6 B4-7), the plan-level meta (C7),
and precepts conformance (C8). The six lenses converge on ONE thesis and it is the most consequential finding of
the entire 32-lens audit.

---

## 1. Group verdict — against the user's five critique axes

**THE PLAN ITSELF IS THE OVER-CONTRIVANCE THE USER NAMED.** The tranche machinery has become the product. This is
not a rhetorical flourish — it is quantified on disk and corroborated independently by all six lenses at three
altitudes (band, plan, canon):

- **Over-contrivance (axis 3) — the headline.** C7 verified: **6.7 MB** of planning/audit markdown across 164 BG +
  51 BH `.md`, a 3,576-line plan-machine, steward **~1,833 LOC of net `src/` churn** (32 files, +957/−876). Of **138
  commits since v4.2.0, only 14 touch `src/` (10%)**. The plan enumerates **~194 wave rows** and mints **~85 new
  `proof:*` gates** (43 born-RED) on top of the **360** the user already condemned — a near **1:1 gate-per-wave**
  ratio (I verified 360 scripts, 85 unique `proof:` strings in the build-map, `gates.mjs` = 2640L). After **THREE
  full 32-agent audit passes, 17% of waves are DONE.** The mechanical carves that dominate the plan carry 5–10× their
  diff in spec+gate+self-test+doc-fold ceremony (C7 F1). CLOSEFIX-9SITE is the disease in one wave: a
  paint-NEUTRAL, dist-byte-identical dead-token retirement inflated to an 18-file / 15-gate production with a
  brand-new gate that probes a *sibling repo* (C1 F1).
- **Gestalt cohesion (axis 2) — the plan's own topology is anti-gestalt.** One design concern is fragmented across
  2–3 workstreams, batches apart: de-shadcn (WS4 + WS10, six batches apart), glass (WS3 + WS8 + reaches in WS6/WS2),
  paper (WS1 + WS9), dock (WS2 + WS5 + WS6) — C7 F4. At the band level: WS3 scatters ONE move ("every glass surface
  reads from one unified tint+blur register") across five field-gated sub-waves (C1 F2); the demo restructure is
  split across BG-WS4 + BH-B3 with an *unresolved manifest-direction conflict* (C5 F2). A reader cannot see "the
  glass story" as one designed arc; they see N locally-scoped patches on a linear schedule.
- **Poor encapsulation (axis 4).** `useGlassBackdropLuminance` has **two BG carve-owners on different axes** (WS4
  histogram-leaf + WS8 backdrop-source, C3 F2 — verified both in the build-map); `createCanvasLifecycle` is
  simultaneously carve-scheduled (WS4) *and* "UNTOUCHED shasum-fenced" against its pre-carve byte count (WS8, C3 F3).
  Carve ownership is a single-writer discipline the plan violates against itself.
- **Missing obvious issues (axis 1) — recurses INSIDE the cleanup tranche.** BH's PLAN.md narrates **all of B1 + B2.4a
  as pending while they are LANDED on disk**, and grounds its §1 binding question on a payload bug fixed at
  `7813a695` three days before the coherence audit ran (C5 F1). The 92%-converged coherence audit caught B1-W2/W3
  but *missed B1-W1* — the exact "missing obvious issues" recursion, occurring inside the tranche whose thesis is
  "the repo is disciplined, not dirty."
- **Lacking elegance (axis 5).** Gate-as-separate-wave reproduces, on the device-free axis, the exact
  feature/verification decoupling the tranche's paint-thesis exists to cure — six WS7 waves author gates for
  features built 4+ batches earlier, leaving a WS1→WS7 window where the shipped feature has *no gate at all* (C7 F2).
  The one band positioned to answer the "360 ceremony gates" complaint — B5 — restructures the gate runner
  (2640L → runner+manifest) while pruning **ZERO** gates and *defers* its only prune wave (B5d) past BH (C6 F1). The
  CLAUDE-reader ceremony is *transposed* onto a new `docs/canon/` tree + a `canon-doc.mjs` resolver + an
  `auditCanonHomes()` audit — more machinery to keep ~14 prose-presence assertions alive (C6 F2).

And the canon that governs all of it is structurally unstable: the **biggest glass-specific recurring class (Class K,
substitution-vs-inheritance / dead-knob) has NO precept home and NO gate** — only per-instance prose notes in the
CLAUDE.md that B4f deletes — violating the binding same-tranche-gate meta-precept (C8 F1); and that deletion orphans
≥7 precept prose cross-references and strands glass canon out of the read-only submodule (C8 F2/F3).

**Net:** the fold of this audit must be the demonstration that "fewer, sharper primitives" applies to WAVES and GATES,
not only to components. Target ~50 BG + ~14 BH waves, **net-negative gate count**, DAG reorganized into ~7 gestalt
families. AND it must be the **LAST** audit pass — no pass-2 before build resumes (C7 FC6).

**What is RIGHT and must be PRESERVED** (do not fold away — these caught the actual bugs): the paint-decoupled
dual-engine per-wave verify (the ONE discipline that killed the headless-green/visually-broken disease); batch-3
concurrency + null-guarded agents + literal `const PASS`; the disposition/deferral ledger *as a read-at-cut
artifact*; the BH interleave collision census; and WS2's dock convergence (C1: "the strongest band in the plan") —
especially **4.10 INPLACE-MORPH** (C1 F5), the real mechanism-replacement that is the model the whole tranche
should aspire to. WS7's Band-0 close-machine is genuinely un-contrived and already BUILT (C3 verdict).

---

## 2. Deduplicated, severity-ranked finding set

Weak/duplicate findings killed. Each survivor carries its lens provenance and disk evidence.

### CRITICAL

**S1 — The plan is the contrivance: wave + gate proliferation is a structural property of the plan, not just the
built work.** [C7 whole · corroborated C1 F1, C5 F4, C6 F1] Verified: 360 gates, ~85 new minted, ~194 waves, 6.7 MB
prose : 1,833 LOC src, 90% non-source commits, 17% DONE after 3 passes. The single highest-value target.

**S2 — Gate-as-separate-wave + gate-per-wave (never per-family); B5 prunes zero of 360; the #1 user complaint is
DEFERRED.** [C7 F2 + C6 F1 + C6 F2] Six WS7 gate-only waves gate features built 4+ batches earlier; B5b/B5c
restructure and re-home but prune nothing; B5d (the only prune) deferred past BH; 16 CLAUDE-reader clauses are
doc-PRESENCE ceremony that B5c transposes onto more machinery. Fix: gate-per-family, born-with-feature, net-negative.

### MAJOR

**S3 — One concern fragmented across N workstreams (anti-gestalt plan topology).** [C7 F4 + C1 F2 + C5 F2 + C3 F2/F3]
De-shadcn/glass/paper/dock each scatter across 2–3 workstreams; WS3 splits the unified-glass-register into 5 waves;
the demo restructure splits across BG-WS4 + BH-B3 with an unresolved manifest-direction conflict;
`useGlassBackdropLuminance` has two BG carve-owners and `createCanvasLifecycle` is carve-scheduled-AND-fenced.

**S4 — The cleanup tranche fails its own discipline bar: the plan narrates landed work as pending and rests its
binding question on a fixed bug.** [C5 F1 + C5 F8 + C3 F8 · and C5's OWN ratchet claim is stale-wrong, see §3-A]
BH B1 (3/3) + B2.4a LANDED yet narrated pending; §1-#4 payload claim fixed at `7813a695`; B0 "99 images" stale;
WS8/WS9 SPEC files stale vs cursor (`uDispersion`→`uChromatic`, "nothing on disk" false while Band-0 is DONE).

**S5 — Feature builds smuggled into the close workstream.** [C3 F6] WS7 Band-4 (DATE-CALENDAR reka build,
CHART-FAMILY, DS-COMPLETE) is net-new component development the spec itself labels "post-close coverage," dressed as
a FOLD-LEDGER adjudication, bloating the close to ~16 waves.

**S6 — The god-module ratchet is NOT drained; `BG.W-CUT`'s close-state is coupled to ~8 pending carve waves; the
cut-gating dependency chain is un-surfaced.** [C3 F4 — ADJUDICATED, see §3-A] Disk-verified: **16 baselines remain**
in `RATCHET_BASELINES` (`proof-no-god-module.mjs:138-172`). A single slipped carve (esp. the WS1-gated WS8 keystone,
S7) leaves `RATCHET_BASELINES != {}` → the cut cannot pass `--run full`. BH PLAN §71's "drained to ∅" is FALSE.

**S7 — C-SAFARI keystone is gated on an unbuilt WS1 render-target seam; shaped to defer at the fidelity ceiling for a
4th time.** [C3 F1] `createRenderTarget.ts` absent; WS1 landed only the `getImageData` luminance-proxy marker, not
the in-context FBO the second-sample gestalt needs. The Tier-1 WebGL2 floor (which does NOT depend on the
Safari-impossible `backdrop-filter: url()`) is the real, landable win; the full-fidelity metal-flow apotheosis rides
a keystone whose WS1 precondition was never delivered.

**S8 — WS9 paper re-opens the twice-rejected feTurbulence mechanism; the robust raster-asset transposition is booked
as fallback, not primary.** [C3 F7] The user rejected the SVG-noise paper register twice ("disgusting metallic");
WS9's primary fix swaps `feColorMatrix` for `feDiffuseLighting` on the SAME `feTurbulence` family (7 open calibration
mustFix + a Safari `lighting-color` colorspace risk), while the engine-stable warm-raster-tooth transposition is
gated as a "prototype fallback." The simpler, single-rejection-proof, cross-engine-robust move is booked second.

**S9 — Class K (substitution/dead-knob) — the biggest glass-specific recurring class — has NO precept home and NO
gate; violates the same-tranche-gate meta-precept.** [C8 F1] Bitten ≥4 recorded times; lives only in the CLAUDE.md
prose B4f deletes; BG mints a gate for the smaller Class L but leaves K a note.

**S10 — The CLAUDE.md delete orphans ≥7 precept prose cross-references and strands glass canon out of the read-only
submodule.** [C8 F2 + C8 F3] `design-idioms.md` (×5), `tunable-anim.md` (×1), `cross-repo-dev-resolution.md` (×3)
point INTO deleted CLAUDE.md sections; B4c re-points the 10 reader GATES but nothing about the prose; no wave
re-points `design-idioms.md`'s home-map to `docs/canon/`, so a cross-repo consumer lands nowhere.

**S11 — Zero Fable/DesignSync routing on all 61 P-waves despite the binding standing directive.** [C1 F7] Verified:
`grep -c "Fable\|DesignSync" bg-build-map.md` = 0; `grep -c "\[P\]"` = 61. The seed's 2026-07-01 directive is binding
and 0/61 comply.

### MODERATE

**S12 — BH's marquee value (the 5.0.0 export reshape) is entirely serialized behind BG and built on a provisional
map; net-indirection is asserted, not measured.** [C5 F6 + C5 F7] All swap waves `[WS12]`; the 203-row `/api` map is
a 4.2.0 snapshot re-derived post-WS12; the "3 layers → 1 source" claim needs a LOC/indirection-depth acceptance
measure, not a file-count-deleted count.

**S13 — B1 "Legacy excision" is misnamed; the real dead-mechanism sweep (detector-kit B5d) is deferred past BH.**
[C5 F5] §1's "disciplined not dirty" rests on a TODO grep (= 0), which is not a legacy-mechanism census; the band
fixes 3 bugs and excises no legacy; latent dead exports would surface in the B2 reshape, which B1 does not gate on.

**S14 — B3 δ6's glob-to-`index.vue` migration is over-contrivance that Group B's B8-F8 depth-nest already
supersedes.** [C5 F3 → cross-ref Group B / B8 F8] Disk: 120 flat stories, 0 `index.vue`. A mixed-glob to migrate ~40
stories-with-parts while leaving ~80 flat is over-engineering; B8's `git mv aurora/ → substrates/aurora/` depth-nest
solves the namespace leak with one move and no glob change.

### MINOR

**S15 — Paint verdicts drain into a late W-REFLECT3 sweep (re-concentrating the disease the tranche cures).** [C1 F8]
Build-map defers ≥11 paint verdicts to one terminal sweep; hold P-waves to the WS1 per-wave dual-engine standard.

**S16 — Granularity cluster (merge/prune fodder).** [C1 F3/F6/F9 + C5 F4 + C6 F5] 3.11 near-empty stub double-owns
`liquid-morph.css:104` with 3.5; 3.12 is a 1-token paint-only wave with no device-free gate; 3.2 is dead-code + one
PRM carve; BH B2.4b/c/B2.5 are verify-only "waves"; B6 is near-complete-as-authored with a missing dogfood.

**S17 — Dangling/stale precept refs.** [C8 F4/F5/F6/F7] inv-11 → nonexistent `precepts-conformance.md`; motion
"P1-P6" vs actual P1-P7 miscount (P7 is `proof:motion-one-clock`'s allowlist source); the shadow-execution
attribution gate is unshipped though BG re-touches `.githooks/commit-msg` (Q-chron-3's named trigger fired); the
WS2 `DOCK_SPRING` retune makes the auto-loaded precept stale.

---

## 3. Contradictions between lenses (adjudicated with disk evidence)

**A. C3 F4 vs C5 F1 — is `RATCHET_BASELINES` drained? [C3 CORRECT; C5 WRONG]** — the sharpest, most consequential
adjudication. C5 F1 asserts "`RATCHET_BASELINES == {}` (`proof-no-god-module.mjs:20`)"; C3 F4 asserts ~15 baselines
remain including `createCanvasLifecycle.ts: 695`. **Disk (`proof-no-god-module.mjs`): 16 real baseline entries at
lines 138–172** (`liquid-morph.css:850`, `GlassDock.vue:711`, `createCanvasLifecycle.ts:695`,
`useWebGPUCanvas.ts:606`, `useDockFission.ts:604`, `property-regs.css:566`, `fission-bridge.css:552`,
`useDockContextSilhouette.ts:551`, `useGlassBackdropLuminance.ts:542`, `useBlobSatellites.ts:533`,
`SegmentedTabs.vue:512`, `api/index.ts:505`, + 4 shader files). **C5 misread the line-20 COMMENT** — which states
the *close-STATE goal* "`violations == []` AND `RATCHET_BASELINES == {}`" — as the current value. C3 F4 stands.
This adjudication matters twice: (1) it confirms S6 (the un-surfaced cut-gating chain); (2) it is *itself the proof of
S4* — C5's finding is that the plan narrates landed-as-pending, yet C5 narrated pending-as-landed on the ratchet.
The develop-rule "every band re-verifies landed-vs-pending against disk before fold" must apply to the AUDIT too.

**B. Gate-count framing: C7 "85 new gates atop 360" vs C6 "prunes zero of 360" — NOT a contradiction, complementary.**
Disk: build-map carries 85 unique `proof:` strings; 360 gate scripts exist. The plan is **net-additive** (~+85,
−0). Both lenses agree the direction must reverse to net-negative. Reconciled: S1 (add) and S2 (prune-zero) are the
two halves of one indictment.

**C. W-REFLECT3 defer count: C1 "19" vs my build-map grep "11".** Minor — C1 likely counted across cursor +
build-map; the disk build-map shows ≥11. Directionally identical (S15). No adjudication needed; cite the disk floor.

**D. C6 (prune the 14 doc-presence CLAUDE clauses) vs C8 (canon needs a home + a NEW proof:dead-knob gate) — NOT a
contradiction.** C6 prunes prose-PRESENCE ceremony gates; C8 adds ONE behavioral gate (dead-knob detector) plus
re-points doc HOMES. Both are consistent with "net-negative gate count, but the RIGHT gates": drop gates that verify
prose, add the one gate that verifies a recurring behavioral trap. The fold (GC-FC4 + GC-FC5) applies both.

No hard contradiction exists between C1's band-detail and C7's generalization, or between C3's WS-half and C5/C6's
BH-half — they are complementary strata of the same thesis.

---

## 4. Consolidated FOLD candidates

Merged across the six lenses. Each is named, shaped, and cross-referenced. The set is deliberately small — the fold
itself must demonstrate "fewer, sharper primitives."

### GC-FC1 [plan-doc-edit · CRITICAL] — Codify the overhead FLOOR + gate-per-family + audit-freeze
**Merges:** C7 FC2 + FC3 + FC6 + FC7. The single structural rule-set that prevents 194-row regrowth, added to
`EXECUTION-PLAN.md §C/§E`:
- **(a) Overhead floor:** a change earns a wave row ONLY if it (i) alters a shipped surface's paint, (ii) advances a
  named gestalt axis, or (iii) is a genuine cross-file mechanism. Sub-threshold (one token, one alias, one
  colocation, one verify-assert) is a CLAUSE on a family wave, never a row.
- **(b) Gates born with their feature, per FAMILY:** every wave authors its own device-free gate clause; there are NO
  gate-only waves; the object is ~12 long-lived family gates (`proof:glass/dock/viz/paper/motion/route/encapsulation/
  demo/de-shadcn/a11y/close/ba-gestalt`) each accreting a clause + bite per landed wave.
- **(c) Net-negative gate count:** run `DEAD-GATE-SWEEP` FIRST; the tranche REDUCES the 360.
- **(d) Audit-freeze:** RESPEC-GESTALT is the LAST pass; no pass-2 before build resumes; an audit:build commit-ratio
  ceiling in §E.
**Gestalt:** the plan machine is measured by whether the wave count tracks *design surface*, not *task list*.
**Cross-ref:** builds on Group A `A-gate-system.md` (gate soundness RC1-RC4 / paint-decoupling) — GC-FC1 is the
proliferation twin. Preserve verbatim: dual-engine per-wave paint verify, batch-3, the disposition ledger.

### GC-FC2 [merge-waves · CRITICAL] — Reorganize the DAG into ~7 gestalt FAMILIES; ~halve the wave count
**Merges:** C7 FC1 + FC4 + FC5 · C1 FC2/FC3/FC4/FC5/FC6 · C5 FC4. Target BG ~110→~50, BH ~43→~14. Families:
**Field/Route · Glass** (WS3+WS8 unified — one calm→deep arc as clauses) **· Dock** (WS2+siri) **· Viz** (WS5+goodot)
**· Paper** (WS1-grain+WS9) **· De-shadcn** (WS4-W0+WS10, ONE concern) **· Encapsulation/Demo** (WS4-carves+WS11) **·
Coherence** capstone. Real HARD edges only (Dock←Glass-blur, Siri←Dock-spring, Coherence←all). Concrete sub-moves:
- MERGE WS3 `3.5+3.6+3.8+3.9` → ONE `BG.W-GLASS-REGISTER-UNIFY` (6 fill-tint consumers + 3 chromatic pairs = one
  migration, C1 FC2); PRUNE `3.11` into `3.5-M5a` (C1 FC3); FOLD `3.2`→`3.3` (C1 FC5), `3.12`→WS7 field-aurora (C1
  FC6); MERGE `4.1+4.2` → `BG.W-DOCK-ENGINE-UNIFY`, `4.7+4.8` → `BG.W-DOCK-CAP-SCROLL-FADE` (C1 FC4).
- Collapse WS4's ~14 mechanical carves into 3 family waves (`BG.W-DEAD-SWEEP` / `BG.W-COLOCATE` / `BG.W-SPRING-TIDY`),
  each closing one growing family gate (C7 FC1). WS4 25→~8.
- Collapse the BH B2.x 10-row export-reshape fan + B4a-d file-moves + the verify-only trio into ~14 rows (C7 FC5).
**Gestalt:** one restructure = one family = one growing gate. Protect **4.10 INPLACE-MORPH** and its
UNIFY(#1)+SHELL-DOCK-DRY(#9) precond chain — it is the model wave (C1 F5).

### GC-FC3 [amend-wave · MAJOR] — Strip CLOSEFIX-9SITE to its real work; KILL the sibling-probe gate
**From:** C1 FC1. Rename `BG.W-DOCK-BLUR-RETIRE-CARVE`. KEEP the two <500 carves (`ladder.css` 527→470,
`shell.css` 510→459) + the `--glass-blur-dock` delete. **PRUNE the planned `proof:retired-token-consumers` gate** —
it is absent on disk today (a planned mint) and it *probes a sibling repo* to gate-block glass-ui retiring its own
internal token: the foreign-tree fence (inv-26) run backwards into a coupling. Record the retirement in MIGRATION.md;
the sibling resolves built `dist/` on its own bump per contract-v2. Drop the "9-SITES-not-6" framing + the
R4-before-R3 intra-wave ordering ceremony. Wave shrinks from 18-file/15-gate to ~5 source files + a routine ci-emit.
**Cross-ref C6 F6:** the sibling-probe gate is *also* named as the born-RED witness for B7 relay rows 3–4
(`--ring` retint, `--glass-blur-dock` retire) — so killing it requires re-basing those B7 asks on MIGRATION.md +
the `proof:crossrepo-asks :bh` arm, NOT the sibling-probe gate. Fold that re-base into GC-FC5's ask consolidation.

### GC-FC4 [amend-wave · MAJOR] — B5: ADD the gate-prune sub-wave; PRUNE 14 doc-presence clauses; dissolve
structure-sync/doc-consistency into freshness gates
**Merges:** C6 FC1 + FC2 + FC3. The concrete instrument of GC-FC1(c). Add **B5e-gate-prune [WS12, after B5b]**:
(1) collapse per-wave π-presence gates into `proof:{glass,motion,dock,feedback}-band` category gates (extend the
`proof:ba-gestalt` roster model that already replaced N per-mechanism π with 1 holistic gate); (2) DELETE the
`claudeMd` clause from the ~14 soft-reader gates (surface-axis, spa-view, easing, dropdown, phase-palette, dock-unify,
split-chars, handmark, on-glass-fg, readme-meta-clean, dock-rail-realize, close-battery-parity, doc-override-idiom,
accent-tone) — they assert a prose sentence EXISTS, nothing functional; (3) dissolve the 2 real readers: generate
`structure.md` + `dependencies.md` from disk, replace `proof:claude-structure-sync`'s dir-diff with a `committed ==
regen` freshness assert (tautological once regenerated-from-disk), point `doc-consistency`'s dep-rot arm at the
generated table. Target **360 → ~250 with ZERO behavioral assertion lost.** Gate: `--list` count DROPS (inverse of
B5b's byte-identical); a manifest diff enumerates each pruned gate + its subsuming category gate; `--run full` GREEN.
**Gestalt:** a gate asserts behavior/structure, not prose; do not re-home ceremony onto a new doc tree — delete it.

### GC-FC5 [new-wave + amend · MAJOR] — Canonize Class K + mint `proof:dead-knob`; re-point orphaned precept
cross-refs; consolidate the `mkbabb/precepts` asks with honest triggers
**Merges:** C8 FC1 + FC2 + FC3 + FC4 + FC5 + FC6. The precept-encapsulation close:
- (a) `BG.W-DEADKNOB-CANON`: add design-idioms §14 (substitution-vs-inheritance / dead-knob — the three canonical
  shapes) + mint `proof:dead-knob [local,ci]` flagging any `--*` read on a descendant scope whose SOURCE token is
  composed at `:root` and never re-declared on that scope, with a bite proving a registered-`@property` inheriting
  custom is NOT flagged. Retires the biggest glass class from note-per-instance to canon+gate (Q-chron-3 same-tranche
  rule). This is the ONE behavioral gate ADD that GC-FC4's net-negative budget absorbs.
- (b) B4c: re-point the 7 precept→CLAUDE.md prose cross-refs to their `docs/canon/` homes + add a born-RED "zero
  `CLAUDE.md` string survives in `docs/design/*` after B4f" detector so the orphan cannot ship silently.
- (c) Elevate B4c's footnote "by-name ask" to a tracked cross-repo obligation in `asks-and-consumes.md`:
  upstream-DELETE of the 4 extracted design docs; fix `cross-repo-dev-resolution.md §7`'s dead CLAUDE.md ref; carry
  the `DOCK_SPRING 0.68/0.64` retune into `motion-canon.md:195` + `tunable-anim.md:63` — each with an honest trigger
  + disposition. Re-base the GC-FC3 B7 rows 3-4 here.
- (d) Fix `docs/canon/motion-system.md:8` **P1-P6 → P1-P7** (P7 is `proof:motion-one-clock`'s allowlist source);
  drop/redirect inv-11's dangling `precepts-conformance.md` pointer; ship the shadow-execution attribution gate in
  G3's commit-msg wave (the named Q-chron-3 trigger has fired); unify the canon-home PATH to `docs/canon/` and add
  the `design-idioms.md` home-map POINTER bridge that keeps the cross-repo precept discoverable after CLAUDE.md dies.
**Gestalt:** the canon is a first-class artifact; it earns a home + a gate for its recurring class, and its
cross-references survive the delete they are subjected to.

### GC-FC6 [prune-wave / defer-honest · MAJOR] — Extract WS7 Band-4 feature builds out of the close workstream
**From:** C3 FC1. Remove `BG.W-DATE-CALENDAR` / `BG.W-CHART-FAMILY` / `BG.W-DS-COMPLETE` from WS7. Either (a) charter
a dedicated `WS-COVERAGE` band where each build carries its Fable design-arm + DesignSync review + the ≥2-consumer
bar (per the standing directive), or (b) KEEP-BOOKED in the fold-ledger with an honest trigger (a real consumer ask).
**Gestalt:** the close workstream closes; it does not grow the component surface. Shrinks WS7 ~16→~13.

### GC-FC7 [amend-wave · MAJOR] — WS9 paper: promote the raster-asset tooth to PRIMARY (build-first de-risk)
**From:** C3 FC2. Make the committed warm raster tooth tile the PRIMARY close artifact and `feDiffuseLighting` a
progressive-enhancement layer over it — at minimum sequence the raster asset FIRST as the born-RED anchor.
**Gestalt:** the user rejected the SVG-noise family TWICE; a scanned/generated warm tooth is engine-stable by
construction (kills the Safari `lighting-color` colorspace risk + the cross-engine determinism risk + the
metallic-recurrence risk in one move). Same token, same blend law, same seed leaf — a transposition, not a third
procedural attempt at the exact-rejected mechanism. **Cross-ref:** the design-quality of the paper surface may be
another group's territory (viz/design lens) — flag for reconciliation.

### GC-FC8 [plan-doc-edit · MAJOR] — Reconcile intra-BG carve double-owners; surface the ratchet-drain cut-gate;
scope WS8 fidelity honestly; mark stale SPECs superseded
**Merges:** C3 FC3 + FC4 + FC5. One reconciliation pass: (a) name a SINGLE owner + sequence for
`useGlassBackdropLuminance` (WS4 histogram-leaf FIRST → WS8 consumes the carved residual, or fold both into one
wave); (b) re-pin WS8's `createCanvasLifecycle` P1 shasum-fence to the POST-WS4-carve leaf shape, not the pre-carve
695L monolith; (c) add an explicit "ratchet-drain dependency chain" to `bg-build-map.md` enumerating each of the **16
remaining baselines → its owning carve wave → its band**, so `BG.W-CUT`'s `RATCHET_BASELINES == {}` precondition is a
VISIBLE cut gate (S6); (d) **correct BH PLAN §71's "drained to ∅" to "the 3 BH rows drained; 16 BG baselines drain
across WS2/4/5/8 + B2.2"**; (e) either RE-OPEN a small WS1 wave exposing the live `WebGL2RenderingContext`
render-target as the WS8 keystone precond, OR scope the WS8 apotheosis to the Tier-1 WebGL2 floor + SOURCE arm and
DROP-WITH-TRIGGER the FBO in-context second-sample (S7 — do not carry an unbuildable keystone as the binding π); (f)
stamp WS8/WS9 `SPEC-pass*-converged.md` SUPERSEDED-BY-CURSOR (`uDispersion`→`uChromatic`, "nothing on disk" false).
**Gestalt:** carve ownership is single-writer; the cut's preconditions are visible, not implicit surprises.

### GC-FC9 [plan-doc-edit · MAJOR] — Encode Fable/DesignSync routing on every P-wave; pull paint verdicts to
per-wave close
**Merges:** C1 FC7 + FC8. Amend the build-map so each of the 61 P-class waves names (a) its Fable design arm and (b)
its DesignSync review surface (the binding 2026-07-01 directive, 0/61 compliant). Hold WS2/WS3 P-waves to the WS1
per-wave dual-engine standard; where a wave genuinely cannot close paint before a downstream field lands, name that
dependency as an honest defer with the exact proving wave — the late W-REFLECT3 sweep catches cross-page gestalt only,
not 11+ per-wave binding verdicts (S15). **Cross-ref:** the design-arm assignment interacts with whichever group owns
the visual-quality lenses — the Fable routing is the seam between plan-critique (us) and design-execution.

### GC-FC10 [plan-doc-edit · MAJOR] — Re-sync BH PLAN.md + §1 to disk; add a per-band landed-vs-pending re-verify
develop-rule
**Merges:** C5 FC1 + FC7 · C3 FC5. Mark B1-W1/W2/W3 LANDED with SHAs (`7813a695` / `ba23c086`); DELETE the
present-tense payload-bug claim at `PLAN.md:17`; refresh the B0 "99 images" figure; state plainly in §1 that BH's
export-reshape payoff is the tail of BG (all swap waves `[WS12]`, the 203-row map provisional post-WS12). ADD the
develop-rule: *every BH band re-verifies landed-vs-pending against disk before fold* — the coherence audit's miss of
B1-W1 AND this audit's own ratchet mis-read (§3-A) are the two proofs this is needed.

### GC-FC11 [merge/amend · MODERATE] — BH housekeeping cluster
**Merges:** C5 FC3 + FC5 + FC6 · C6 FC5 + FC6. (a) B3 δ6: drop the glob-to-`index.vue` migration; adopt Group B's
B8-F8 depth-nest (`git mv aurora/ → substrates/aurora/`, all 120 stories stay flat) — **cross-ref Group B / B8 F8
explicitly** so the lenses agree; (b) rename B1 "Payload + dep-floor fixes (LANDED)" and either add a real
dead-export/orphan-token sweep gated on the B2 reshape OR state the mechanism-sweep deferral with a named post-BH
trigger (S13); (c) B2.1-mech: add a net-indirection acceptance measure (LOC/indirection-depth before vs after), not
"79 files deleted + fidelity 96/96" (S12); (d) wire B6's RESTRUCTURE-{BACKEND,FRONTEND}/LEGACY-EXCISION prompts into
B2/B3/B5a/B5b dispatches (dogfood the tranche's own tooling) + fold B6's promotion-ask into B7; (e) label BH's OWN
5.0.0 break as the 2 `/api` asks (muster, speedtest), keep the 4-row relay for completeness.

---

## 5. Cross-group hand-offs

- **Group A (`A-gate-system.md`):** GC-FC1/GC-FC4 are the proliferation twin of A's gate-soundness (RC1-RC4). The
  paint-decoupling A validated is the ONE discipline GC-FC1 preserves verbatim.
- **Group B (`B8-demo-architecture.md`):** GC-FC11(a) adopts B8-F8's depth-nest verbatim; the demo restructure
  ownership (S3) must consolidate under one owner consuming B8's `BG.W-DEMO-DUP-MERGE` −4-page set.
- **Design/Viz groups:** GC-FC7 (paper raster-asset) and GC-FC2's `GLASS-REGISTER-UNIFY` touch surface-design quality
  another group owns on the visual axis — flag for reconciliation. GC-FC9's Fable routing is the plan↔design seam.

**Bottom line:** ~50 BG + ~14 BH waves, net-NEGATIVE gate count, DAG in ~7 gestalt families with real edges only, an
explicit overhead floor + audit-freeze, the ratchet-drain chain made visible, the two twice-rejected/unbuildable
mechanisms (paper feTurbulence, WS8 FBO keystone) re-shaped honestly, and the precept canon given a home + a gate for
its biggest recurring class. The fold IS the demonstration that "fewer, sharper primitives" applies to waves and
gates — which is precisely the user's complaint, answered at the altitude it was made.
