# C8 — PRECEPTS CONFORMANCE (RESPEC-GESTALT pass-1)

**Lens:** BOTH directions — (1) plan-vs-precepts, (2) precepts-vs-reality (stale precepts → cross-repo asks),
(3) precept GAPS (recurring friction classes with no precept home). **Date:** 2026-07-01 · **HEAD:** `976dc890` ·
**Branch:** `tranche/BG`. Every claim is disk-verified; a doc contradicting disk is itself a finding.

## VERDICT

The precept canon is in a **structurally unstable state that the BG+BH plan does not fully secure**, and the mandate's
"missing obvious issues / poor encapsulation" critique applies squarely to the *canon itself*. Three load-bearing facts:
(1) the friction taxonomy's **single biggest glass-specific recurring class — Class K, substitution-vs-inheritance /
dead-knob — has NO precept home and NO standing gate**, only per-instance prose notes, and BG mints a gate for Class L
(binding) but leaves K un-canonized; (2) BH **hard-deletes `CLAUDE.md` (B4f)** — the primary idiom home — and B4c
extracts the precept design-docs into `docs/design/`, but neither pass re-points the **≥7 prose cross-references that
point INTO the deleted CLAUDE.md sections** (design-idioms.md ×5, tunable-anim.md ×1, cross-repo-dev-resolution.md ×3),
so the extracted/surviving precepts will dangle at their new home; (3) the precepts submodule is **read-only + absent in
the /tmp close worktree (Class T)**, so new glass-specific canon *cannot* live there — the plan correctly routes it to
in-repo `docs/canon/`, but then the cross-repo precept `design-idioms.md` (the doc the constellation reads) permanently
loses discoverability of the glass traps unless it gains a pointer to the in-repo homes. These are precept-encapsulation
failures, not correctness bugs, and they are exactly the "canon on paper / muddy in reality" class the RESPEC-GESTALT
audit exists to catch. Nothing here is a feasibility blocker; all six fold candidates are bounded doc/gate waves.

---

## FINDINGS (ranked by severity)

### F1 — Class K (substitution-vs-inheritance / dead-knob) has NO precept home and NO standing gate [MAJOR]

The friction taxonomy names Class K "**MOD-HIGH (biggest glass-specific)**" with the verdict "**no single gate (§2.T1)**"
(`docs/tranches/BG/audit/RESPEC-COHERENCE/COHERENCE.md:110`). §2.T1's resolution is a per-instance **note** folded into
one wave ("the F substitution-trap note … folded into G2 WS9 §0", `COHERENCE.md:66`) — not a standing gate, not a canon
entry. Disk confirms: `ls scripts/proof-dead-knob*.mjs scripts/proof-substitution*.mjs` → **none**; no gate references
`dead-knob`/`substitution-vs`. The precept submodule is silent — `grep -rniE "substitution|dead.knob"
docs/precepts/*.md instructions/*.md` → **zero hits**. The idiom lives ONLY in CLAUDE.md prose ("THE
SUBSTITUTION-VS-INHERITANCE SEAM (the recurring trap, recorded)", repeated across the per-tier-alpha, dock-scale, and
adaptive-glass sections) — the file B4f **deletes**. It has bitten at least four recorded times (AX.W55 dead-knob, the
dock `--dock-scale` re-declare, the `--glass-bg-dock` pre-substituted read, the AZ dock-rail 3rd recurrence). This is
the direct violation of the binding meta-precept **LESSONS-LEARNED Q-chron-3** ("*codification without a gate is
necessary-but-not-sufficient … every new invariant that addresses a recurring anti-pattern MUST ship its tooling gate
the SAME tranche*", `docs/precepts/instructions/LESSONS-LEARNED.md:592-597`). BG mints `proof:binding-sweep` for Class L
(`AMENDED-COHERENCE-PLAN.md:235`) but leaves the *bigger* glass-specific class with only a note.

**Evidence:** `COHERENCE.md:110` (Class K verdict) · `COHERENCE.md:66` (§2.T1 = note only) · `LESSONS-LEARNED.md:592`
(the gate-the-same-tranche meta-precept) · absent `scripts/proof-dead-knob*.mjs`.

### F2 — B4c/B4f orphan ≥7 precept→CLAUDE.md prose cross-references; only the GATES are re-pointed [MAJOR]

The precept design-docs cross-reference INTO CLAUDE.md sections that B4f deletes:
`design-idioms.md:57` (§Cartoon-shadow override), `:67` (§"The warm-chroma floor"), `:77` (§"The dark register…"),
`:224` (§Structure), `:325` (Conventions §"color-mix(in srgb…)"); `tunable-anim.md:136` (W-EASING-PRIMITIVE);
`cross-repo-dev-resolution.md:294,301` (§Subpath surface) + `:292` (§7 header). BH **B4c** extracts
design-idioms/motion-canon/tunable-anim/affordance-map to `docs/design/` and re-points the **10 precept-reading gates**
via `design-docs.mjs` (`docs/tranches/BH/PLAN.md:90`) — but says **nothing about the prose cross-refs inside those
docs**. After B4f, the extracted `docs/design/design-idioms.md` will still say "see `CLAUDE.md` §The warm-chroma floor"
pointing at a deleted file whose content now lives in `docs/canon/conventions.md`. This is a "clean-break-misses-a-
consumer" (Class C) one level up: the consumer is the human/agent following a doc pointer. `cross-repo-dev-resolution.md`
is EXCLUDED from extraction ("stay base", `PLAN.md:90`) so its §7 CLAUDE.md ref stays in the read-only submodule → only
a cross-repo ask can fix it.

**Evidence:** the 9 precept→CLAUDE.md refs above · `PLAN.md:90` (B4c re-points gates, not prose) · `docs/canon/
conventions.md` (warm-chroma now homes here, not CLAUDE.md).

### F3 — Class T (submodule canon-home) permanently strands glass-specific canon out of the cross-repo precept [MAJOR]

`docs/precepts` is a git submodule, **read-only here and absent in the fresh `/tmp` close worktree** (Class T,
`COHERENCE.md:118`; G3/G5 explicitly move new canon OUT of it because "a fresh `git worktree add /tmp` does not recurse
submodules → the doc is ABSENT → C3 reds", `AMENDED-WAVE-PLAN.md:107`). The plan correctly homes the new build/close
canon in parent-tracked `docs/canon/` — but the *consequence* is unaddressed: `design-idioms.md` (the doc the
constellation repos actually read for cross-repo idioms) will **never** gain the glass-specific traps (K, U, per-tier
alpha, dead-knob), because they can only live in-repo now. `design-idioms.md`'s home-map currently POINTS to CLAUDE.md
(§2/§3); after B4f those pointers are dead and there is **no wave that re-points design-idioms.md's home-map to
`docs/canon/`**. So a cross-repo consumer following the precept lands nowhere. The canon literally loses discoverability
across the submodule boundary. This is the "poor encapsulation" critique applied to the doc architecture: the in-repo
canon (`docs/canon/`) and the cross-repo canon (`docs/precepts/design-idioms.md`) diverge with no bridge.

**Evidence:** `COHERENCE.md:118` (Class T split verdict) · `AMENDED-WAVE-PLAN.md:107` (canon moved out of submodule) ·
`design-idioms.md:57/67/77/325` (home-map points at soon-deleted CLAUDE.md).

### F4 — The WS2 DOCK_SPRING retune makes the auto-loaded precept STALE; the fix is a deferred by-name ask [MODERATE]

WS2 rewrites `DOCK_SPRING 0.32/0.7 → 0.68/0.64` (`PLAN.md:90`). The precept states the OLD value in TWO auto-loaded
places: `motion-canon.md:195` ("`DOCK_SPRING` `(0.32, 0.7)`") and `tunable-anim.md:63` ("dock … 0.32, 0.7 … FROZEN with
the dock row"). B4c sequences extraction AFTER WS2 so the EXTRACTED `docs/design/` copies are fresh, and issues "a
by-name ask to `mkbabb/precepts` for the **upstream delete**." Two residual risks: (a) until the upstream delete lands,
the submodule precept — the doc future sessions **boot from** (`docs/canon/README.md`: "Future sessions boot from
`docs/precepts` … + THIS index") — carries the stale `0.32/0.7` and the "FROZEN" claim that WS2 falsifies; (b) the
by-name ask is a DEFERRED cross-repo dependency recorded as a plan clause, not a tracked obligation with an honest
trigger — exactly the "deferral without a named restoration trigger" the LESSONS ledger warns against
(`LESSONS-LEARNED.md:504-509`).

**Evidence:** `PLAN.md:90` (retune + upstream-delete ask) · `motion-canon.md:195` · `tunable-anim.md:63` ·
`docs/canon/README.md` (sessions boot from the submodule).

### F5 — CLAUDE.md inv-11 points to a precept that does not exist (`precepts-conformance.md`) [MODERATE]

`CLAUDE.md:449` (BA invariant 11, the d6-lineage post-mortem) says "See `docs/precepts/instructions/
precepts-conformance.md` (the d6 lineage post-mortem)." That file **does not exist** — `ls docs/precepts/instructions/
precepts-conformance.md` → No such file; the seed itself named "precepts-conformance.md" as READ-FIRST and it is absent.
The d6-lineage post-mortem was never authored as a precept. The lesson IS partially captured in
`LESSONS-LEARNED.md:576-588` (invariant 30, cross-repo dev-resolution) but not under the named path inv-11 cites. Since
CLAUDE.md is being deleted, this dangling pointer must be resolved in the `exports-and-subpaths` / lineage
redistribution (drop or redirect it), and the missing post-mortem should be authored as a real precept (cross-repo ask)
if it is to survive.

**Evidence:** `CLAUDE.md:449` (dangling ref) · absent `docs/precepts/instructions/precepts-conformance.md` ·
`LESSONS-LEARNED.md:576` (the lesson lives under a different name).

### F6 — The docs/canon motion redistribute-list under-counts the motion canon (P1-P6 vs P1-P7) [MINOR]

`docs/canon/motion-system.md:8` says the redistribution covers "the motion canon (**P1-P6**…)", but the precept
`motion-canon.md` has **P1 through P7** — P7 ("the ONE source + the ONE clock + the sanctioned off-spine SET",
`motion-canon.md:134`) is the load-bearing section `proof:motion-one-clock` reads its `OFF_SPINE_ALLOWLIST` +
`SPRING_DEFAULTS_ALLOWLIST` against (`motion-canon.md:213`). CLAUDE.md's own motion subsection inherited the "P1-P6"
miscount, and the skeleton copied it. If B4b-content redistributes the CLAUDE.md prose verbatim, P7's allowlist canon
(the single source for the two sanctioned off-spine seams) risks being orphaned from the in-repo home. A one-line
skeleton fix + a redistribution assertion closes it.

**Evidence:** `docs/canon/motion-system.md:8` (P1-P6) · `motion-canon.md:134,213` (P7 is the gate's allowlist source).

### F7 — BG re-touches `.githooks/commit-msg` but does NOT ship the deferred shadow-execution attribution gate [MINOR→MODERATE]

Q-chron-3 (`LESSONS-LEARNED.md:596`) named "**the shadow-execution gate candidate — a `commit-msg`/`pre-push` hook
rejecting commits not attributed to an open `docs/tranches/<LETTER>/` folder … is the standing recommendation for the
next tranche that re-touches the dispatch-template surface.**" BG's G3 wave **re-touches `.githooks/commit-msg`** (adds
the env-gated close-sweep arm, `AMENDED-WAVE-PLAN.md:106`; `AMENDED-COHERENCE-PLAN.md:197` "register the B0→G3
commit-msg EXTEND-not-clobber edge"). The trigger condition has fired — yet `ls scripts/proof-tranche-attribution*.mjs
scripts/proof-shadow*.mjs` → **none**, and no wave ships it. The shadow-execution anti-pattern has recurred FOUR times
(V→AB→AB+1→post-P), each time between-tranches; a hook is the only enforcement that fires at the failure moment. BG is
the tranche the precept named.

**Evidence:** `LESSONS-LEARNED.md:596` (the named trigger) · `AMENDED-WAVE-PLAN.md:106` (BG re-touches the hook) ·
absent `scripts/proof-tranche-attribution*.mjs`.

---

## FOLD CANDIDATES (for the AMENDED-GESTALT plan)

### FC1 [new-wave] — `BG.W-DEADKNOB-CANON`: canonize Class K + mint `proof:dead-knob` (closes F1)
GESTALT approach, not a patch: Class K is a *systemic idiom*, so it earns a §-home + a standing gate, per Q-chron-3
(gate-the-same-tranche). (a) Add **design-idioms §14 "substitution-vs-inheritance / the dead-knob discipline"** to the
in-repo `docs/design/design-idioms.md` (post-B4c) with the three canonical shapes: a `@property`-registered inheriting
custom re-substitutes per-element (correct), a `:root`-only redeclare freezes a descendant override (the dead knob), a
pre-substituted composite token (`--glass-bg-dock`) does not re-compose from a descendant `--glass-opacity-*` override
(re-declare the composite on the scope). (b) Mint `proof:dead-knob` [local,ci]: flag any `--*` read on a descendant
scope whose SOURCE token is composed at `:root` and never re-declared on that scope (the `--glass-bg-dock`/`--dock-scale`
shape), plus a bite proving a registered-`@property` inheriting custom is NOT flagged. This retires the "biggest
glass-specific" recurring class from note-per-instance to canon+gate. Mechanical build; no Fable arm.

### FC2 [amend-wave] — B4c: re-point every extracted design-doc's CLAUDE.md prose cross-ref (closes F2)
In the SAME extraction pass that moves the 4 design docs to `docs/design/` and re-points the 10 gates, re-point the
**7 prose cross-references** (design-idioms.md ×5, tunable-anim.md ×1, motion-canon.md `:10` narrative) to their
`docs/canon/` homes: §Cartoon-shadow→`docs/canon/glass-system.md` (or the shadow-contract home), §warm-chroma floor +
Conventions §color-mix→`docs/canon/conventions.md`, §dark register→`docs/canon/glass-system.md`, §Structure→
`docs/canon/structure.md`, W-EASING-PRIMITIVE→`docs/canon/motion-system.md`. Add a self-consistency clause to
`proof:claude-deletable` (or `design-docs.mjs`'s `auditDesignHomes`): **zero `CLAUDE.md` string survives in
`docs/design/*` after B4f** — a born-RED-until-re-pointed detector, so the orphan cannot ship silently.

### FC3 [new-wave / cross-repo ask] — `mkbabb/precepts` ask consolidation with honest triggers (closes F4 + the F2 tail)
Elevate B4c's footnote "by-name ask" to a first-class tracked cross-repo obligation in
`docs/tranches/BH/coordination/asks-and-consumes.md`, carrying: (1) upstream-DELETE of the 4 extracted glass-ui design
docs (design-idioms, motion-canon, tunable-anim, affordance-map); (2) fix `cross-repo-dev-resolution.md §7`'s dead
CLAUDE.md ref (that doc stays in the submodule); (3) carry (or confirm-superseded-by-delete) the DOCK_SPRING
`0.68/0.64` retune into `motion-canon.md:195` + `tunable-anim.md:63`. Each ask carries an **honest trigger + a
disposition** (LANDED / CONSUME-and-delete / accept-residual-with-rationale), never a silent deferral — the foreign-tree
fence + `proof:crossrepo-asks` W-clause is the home. Until the delete lands, add a one-line "post-BG-WS2 stale" banner
note to the two submodule motion values (the only writable path is the ask, so the banner is the ask's content).

### FC4 [plan-doc-edit] — reconcile the redistribution homes + the P-count + the dangling inv-11 (closes F5 + F6)
(a) Fix `docs/canon/motion-system.md:8` redistribute-list **P1-P6 → P1-P7** and add a B4b-content assertion that P7's
off-spine allowlist canon lands (`proof:motion-one-clock` reads it — a redistribution that drops P7 breaks the gate's
single source). (b) In the `exports-and-subpaths` / lineage redistribution, **drop or redirect** CLAUDE.md inv-11's
dangling `precepts-conformance.md` pointer; if the d6-lineage post-mortem is worth keeping, author it as a real precept
via the FC3 cross-repo ask, else retire the reference cleanly (no-legacy: a dangling pointer to a never-existent file is
legacy debt).

### FC5 [amend-wave] — G3: ship the shadow-execution attribution gate in the commit-msg wave (closes F7)
Since BG's G3 already edits `.githooks/commit-msg` (the exact "dispatch-template surface" Q-chron-3 named), add
`proof:tranche-attribution` / a commit-msg arm that **rejects a commit not attributed to an open
`docs/tranches/<LETTER>/` folder** (documented bypass for retrospective/authorized work, mirroring the `audit:stash`
env-bypass shape). This discharges the 4-recurrence chronic (V→AB→AB+1→post-P) with the enforcement that fires at the
failure moment, and satisfies Q-chron-3's own "same-tranche gate" rule for the shadow-execution invariant.

### FC6 [plan-doc-edit / merge-waves] — unify the canon-home PATH across the two folded plans (closes the F3 tail)
The RESPEC plan homes new canon at `docs/tranches/BG/canon/` (`AMENDED-WAVE-PLAN.md:107`) while the realized + coherence-
reconciled home is `docs/canon/` (`AMENDED-COHERENCE-PLAN.md:191`, §2.I1/G6). Merge to the ONE realized path
(`docs/canon/`) in the RESPEC plan text so G3's close-disease canon, G5's CLAUDE-delete homes, and the B4b redistribution
all target one home — AND add the bridge that closes F3: `design-idioms.md`'s home-map §2/§3 (post-extraction, in
`docs/design/`) gains a POINTER row to the `docs/canon/` in-repo homes, so the cross-repo precept remains discoverable
after CLAUDE.md is gone.
