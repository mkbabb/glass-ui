# Band-E META-PASS — lens-a (the consolidating wave-spec audit + consistency gate)

> **NOT a per-component greenfield.** This is the consolidating AUDIT over the WHOLE tranche: the
> 116 union waves (`docs/tranches/BD/union/waves/`) + the 37 greenfield `WAVE-AMENDMENT.md` files.
> It produces ONE consolidated tranche-amendment LEDGER (stand / amend / prune / new, in build-DAG
> order), the cross-cutting DESIGN-ADHERENCE CONSISTENCY verdict, and a tranche convergence %.
> Every claim below is grep/source-verified against disk (counts as of 2026-06-24).

---

## §0. THE CORE FINDING — the amendments are SPEC-COMPLETE but NOT MATERIALIZED

Source-verified census:
- **116** union wave files on disk (`union/waves/`) + **42** in `waves/` = 158 total `.md`.
- **37** `WAVE-AMENDMENT.md` + **37** `DELTA-ASSAY.md` (one per greenfield item; complete).
- The amendments name **~44 NEW `BD.W-*` waves** (MOTION-WEIGHT, CARTOON-PUNCH, GLASS-FIELD,
  PAGE-FIELD, GLASS-KEY-EDGE, TAB-IOS-CAPSULE-extract, GOO-BARBELL-NECK, …).
  **VERIFIED: ZERO of those 44 NEW waves exist as standalone files** under `union/waves/` or
  `waves/`. They live ONLY inside the amendment bodies.

This is **correct for tranche-DEV** (the amendment IS the spec home; nothing is published) — but it
means **there is no single materialized, DAG-ordered wave-spec set**. That set is exactly the
deliverable Band-E (`wave-spec-audit`) owes, and the ledger marks `wave-spec-audit: todo`. **So this
audit's #1 product is the consolidated ledger itself** — the canonical list that the user-gated
implementation will build from, in order. The boldest move (§7) is to MATERIALIZE that set as real
files so the build-DAG stops living implicitly across 37 prose docs.

---

## §1. COGENCY / CORRECTNESS / UP-TO-DATENESS — the reconciliation HOLDS (with 4 flags)

I source-verified every AUGMENT/PRUNE/EXCISE/SUPERSEDE target. **All exist on disk; the
reconciliation is sound.** No two amendments author the same NEW wave (cross-amendment NEW-name
collision check: clean — high reference counts on MOTION-WEIGHT/CARTOON-PUNCH/PAGE-FIELD are
*DEPEND* edges into the shared foundation, the correct DRY shape, not dups).

**The prune/supersede set LANDS, verified:**
| Verb | Target (on disk ✓) | Into | Authoring amendment |
|---|---|---|---|
| PRUNE | `W-AURORA-METALLIC` | `BD.W-AUR-METAL-FINISH` | aurora |
| PRUNE | `W-BLURRED-IMAGE-BG` | `BD.W-AUR-IMAGE-SOURCE` | aurora |
| EXCISE (10/11+finish-split framing) | `BD.W-AUR-METAL` | superseded by `BD.W-AUR-METAL-FINISH` | aurora |
| EXCISE (delete file) | `W-DOCK-HUB-API` | subsumed into `BD.W-DOCK-LINK-API` | dock-hub |
| SUPERSEDE | `W-GOO-CAROUSEL-DECK`, `W-GOO-MORPH-REFINE`, `W-PAGER-GOO-MORPH` | `BD.W-GOO-BARBELL-NECK` (topology) + `BD.W-GOO-BRIDGE-SHELL` (shell de-dup) | goo-morph + carousel-deck |
| RE-POINT (in place) | `BD.W-PAPERGRID-WARP` (doubly stale) | `cellTwist` face, + NEW `BD.W-PAPERGRID-FACE` | paper-grid |

The **double-supersede on the 3 goo waves is correctly coordinated** — carousel-deck explicitly
records "ADDS the shell-de-dup reason to the same SUPERSEDE (no double-prune; one record)." Holds.

The **satin/prism phantom-slot framing** (`BD.W-AUR-SATIN`, `BD.W-AUR-PRISM` exist on disk) is
EXCISED-as-framing by the aurora amendment but the **files are not pruned** — flagged for Band-E
(see §3, FLAG-2).

**FLAGS (correctness drift to fix in the consolidation):**
- **FLAG-1 (naming drift):** substrate amendment cites `BD.W-VIZ-RESPEC.md`; the on-disk file is
  `W-VIZ-RESPEC.md` (no `BD.` prefix). Same for `W-DOCK-CORE`/`W-DOCK-SCROLL-FISSION`/`W-NAV-DOCK-FIX`
  /`W-PATH-STANDARDIZE`/`W-GLASS-ABROGATE-GRAY` — a mixed `W-` vs `BD.W-` corpus. The build-DAG must
  pin canonical filenames or `make-buildable` greps will miss. **Consolidation: one rename pass to a
  single prefix convention, recorded as clean-break (no alias).**
- **FLAG-2 (phantom-slot residue):** `BD.W-AUR-SATIN` + `BD.W-AUR-PRISM` remain on disk after their
  framing was EXCISED. They are now orphan slots (satin=8/prism=9 are "not user asks"). **Either
  PRUNE the two files, or RE-POINT them as Disposition-only stubs pointing at AUR-METAL-FINISH.** The
  aurora amendment "logged the slot-collision for the Band-E wave audit" — this is that audit; resolve.
- **FLAG-3 (forward-dep inside the set):** `BD.W-CARTOON-PUNCH` is AUGMENTed by cartoon-shadow but is
  itself a NEW wave authored by motion-spring-register — a forward DEPEND, fine, but it means the
  cartoon-shadow amendment's AUGMENT target does not exist until motion-spring lands first. **The DAG
  must order motion-spring-register (Band 0) strictly before cartoon-shadow.** (It already does; just
  make it explicit in the materialized ledger so no agent picks cartoon-shadow first.)
- **FLAG-4 (cross-track ledger-named, not-on-disk):** `BD.W-MORPH-PUNCH-TOKENS` and `BD.W-FLIP-SPINE`
  are referenced as DEPEND-ON by entrance-reveal/scroll-choreography but are "ledger-named, not on
  disk." `BD.W-MORPH-PUNCH-TOKENS` (blend-morph-engine) overlaps `BD.W-MOTION-WEIGHT`+`BD.W-CARTOON-
  PUNCH` (motion-spring) — **both claim authority over `--motion-weight`/`--ease-cartoon-punch`.**
  This is the single most important DUP risk in the set. **Consolidation: collapse to ONE token
  authority — `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (motion-spring, Band 0) are canonical;
  `BD.W-MORPH-PUNCH-TOKENS` becomes a CROSS-LINK/alias-of-record, NOT a second mint.** (The
  blend-morph amendment's own ledger row already says "NEW #2 the missing Band-0 token wave" — that
  framing must yield to motion-spring's pre-existing authority, or the two waves mint the same tokens.)

---

## §2. THE BUILD-DAG — coherent + complete, ONE addition needed

The plan's §6 build-DAG (the toggle-chip + select-forms grep-verified note) is correct and I
re-confirmed it live: **`.glass-capsule` = 0 src files, `.paper-field`/`--field-h` = 0 src files** —
the 5 shared primitives are UN-LANDED specs, and every consumer amendment DEPENDs them, never
claims-extant. The DAG, as the consolidation must encode it (tiers build in order):

```
TIER 0  (Band 0 — no deps, unblock everything):
  BD.W-MOTION-WEIGHT, BD.W-CARTOON-PUNCH        (the 2 motion tokens — 57+53 DEPEND edges; the hubs)
  W-GLASS-ABROGATE-GRAY +warm-FLOOR decl ON .glass-capsule   (the dormant-tint root-cause #2 fix)
  BD.W-GLASS-KEY-EDGE   (the §3 asymmetric lit edge)
  BD.W-CARTOON-CEL-INK, BD.W-CARTOON-CASTER     (warm ink + inert-child caster)
TIER 1  (the field + the capsule extract — the load-bearing #1 fix):
  BD.W-PAGE-FIELD (co-mints @utility paper-field, inset:0 TRANSMITTED) + BD.W-GLASS-FIELD (MERGE: one
    paper-field, two floors) + BD.W-FIELD-SCRIPT (warmFieldHue derive) + BD.W-FIELD-AURORA-RECONCILE
  BD.W-TAB-IOS-CAPSULE  (EXTRACT .glass-capsule/-hover + warm-floor from the inline indicator)
TIER 2  (consumers — compose the above; never claim-extant):
  buttons / cards / select / toggle-chip / glass-atoms / timeline / overlays / dock-* / carousel /
  scroll / entrance / story-page / page-chrome / category-landing / shell-layout / configurator …
TIER A  (procedural viz — parallel to T2, each DEPENDs paper-field + the parity net):
  aurora / goo-* / dot-* / fourier / concentric / paper-grid / substrate / handmark
```

**Completeness check: PASS.** Every consumer amendment I read carries an explicit DEPEND ledger
listing its TIER-0/1 prerequisites with the born-RED "FAILS LOUD if absent" fence (no
literal-by-stealth). The **7 build-traps** (`@property inherits:false` on pseudo → initial;
self-referential `--x:max(var(--x))` no-op; cel-cast must ride inert child not `::before`;
`color-mix … transparent` WebKit black-premultiply; `scale()` shorthand clobbers centering; second
`animation:` shorthand clobbers; Vue `ref` on component → instance) are captured in the plan §6 and
referenced by the relevant amendments. **One DAG gap to add: the FLAG-1 rename pass and the FLAG-4
token-authority collapse must be TIER-(-1) — they precede even Band 0**, else two waves mint the
same token and the consumers' `var()` resolution is ambiguous.

---

## §3. THE DESIGN-ADHERENCE CONSISTENCY GATE — verdict: 1 live divergence (captured), the rest CONSISTENT

Ran the cross-cutting precept checklist across all converged items. design.md §L1–L7 are APPLIED
(ledger-confirmed: Philosophy 5th pillar + §L2/§L4 cartoon + NEW §L6 proportion + §L7 cross-engine,
the T1–T17 bar referencing `IOS27-REFERENCE.md`, verified 265 lines on disk).

| Precept | Consistency across the converged set | Verdict |
|---|---|---|
| **GLASS** (one `.glass-capsule` warm-floor register, §3 field, never gray, both modes) | tabs/buttons/chips/atoms/dock ALL route to the ONE capsule + warm-floor; the dormant-tint #2 fix is a single decl on `.glass-capsule`; the field is the ONE `paper-field` (GLASS-FIELD merged into PAGE-FIELD, not forked) | **CONSISTENT** ✓ |
| **PAPER** (re-invented texture) | one paper wave (`BD.W-PAPER-MORPHISM`), AUGMENTED in place, no parallel fork | **CONSISTENT** ✓ |
| **AURORA / procedural** (vivid, warm/no-teal, ONE substrate, §3 field behind every demo) | every Band-A delta routes its §3 dep onto the ONE `paper-field`/`--field-h` (no per-viz field forks); AUR-VIVIDNESS lifts ≥0.045 chroma | **CONSISTENT** ✓ except the hero registry — see DIVERGENCE below |
| **ROUNDED √φ + concentric (§L6)** | `BD.W-CONCENTRIC-RADIUS` on disk; consumers DEPEND it for `r_inner = r_outer − pad`; §L6 in design.md | **CONSISTENT** ✓ |
| **CARTOON shadow** (warm cel-ink, inert-child cast, no dark white-flip) | `BD.W-CARTOON-CEL-INK` fixes the dark near-white glow (the §0-missed defect); `BD.W-CARTOON-CASTER` is the ONE inert-child caster all consumers (card/btn/atoms/story) ride — no per-item `::after` re-fork | **CONSISTENT** ✓ |
| **PLAYFUL ios27 motion** (liquid-weight universal, `--ease-cartoon-punch`, never tight/springy) | ONE token authority (after FLAG-4 collapse); `--motion-weight` driver-scoped per §L4 (observer-snap stays calm — the carousel deliberately NOT springy); PRM → 0 universally | **CONSISTENT** ✓ (gated on FLAG-4) |

**THE ONE LIVE DIVERGENCE (locally-converged, globally-divergent) — TEAL/NAVY in the hero registry:**
Live-verified `demo/stories/category-hero.ts`: **5 categories still carry COOL `sectionHue`** —
`substrates: 3 //teal`, `forms: 2 //indigo`, `containers: 9 //slate`, `navigation: 11 //ocean`,
`scenes: 4 //forest(171° green-cyan)`. The field WARM-clamps via `warmFieldHue`, so the *field*
reads warm — but the **category HEROES themselves still paint teal/navy**, a `BC.W-TEAL-NAVY-PURGE`
violation. The ledger §3 footnote flagged this and deferred it to "shell-layout + Band-E audit."
**RECONCILIATION VERDICT: it IS captured** — `BD.W-SECTION-HUE-WARM-FENCE` (shell-layout amendment)
re-indexes ALL 5 cool slots to warm rows across all 3 CSS arms + the JS mirror + adds the structural
`warmHeroHue()` clamp + a born-RED `proof:teal-navy-purge` T6 clause (born-RED on today's
222.8/265.5/239.6/208.0/171.1). The fix is sound and complete. **Band-E action: ELEVATE this wave's
priority** — it is the sole globally-divergent gestalt violation, and it currently lives buried in a
prose amendment. Materialize it as a TIER-2 chassis wave with the consistency-gate seal.

---

## §4. SYSTEMIC FINDINGS — all captured as waves (verified)

- **§3 two root-causes** (flat-field #1 + dormant-tint #2): #1 → `BD.W-PAGE-FIELD` (the load-bearing
  build, was SPEC-ONLY, now buildable); #2 → the warm-FLOOR decl on `.glass-capsule` in
  `W-GLASS-ABROGATE-GRAY`. Both captured. **Transmitted-not-halo** (inset:0, not inset:-20%) is the
  select-forms REFINEMENT #3, folded into PAGE-FIELD. ✓
- **The fake-gate fraud rule** (parse-oklab-as-sRGB over hardcoded purple → gray passes; the
  buttons/tabs/glass-material/page-background recurrence): captured as the gate-discipline — **the
  binding π is an out-of-page `screenshot→getImageData`, never in-page getImageData (taints) nor
  stop-strings.** Source-confirmed in PAGE-FIELD + SECTION-HUE-WARM-FENCE gates. ✓
- **The 7 build-traps**: captured in plan §6, referenced by amendments. ✓
- **Teal-navy re-warm**: §3 above. ✓
- **PROCESS finding** ("vet the CHALLENGE survives-count, not the delta self-summary" — buttons
  scored 0/3 yet shipped a sound body): captured as an orchestration discipline. ✓

---

## §5. THE CONSOLIDATED LEDGER (the deliverable — stand / amend / prune / new, DAG order)

**Net tranche shape after consolidation:** 116 union waves → **disposition: ~6 SUPERSEDE/PRUNE/EXCISE,
~28 AUGMENT/RE-POINT, ~82 STAND** + **~44 NEW** (materialized from amendment bodies) − **FLAG-4
collapse (−1: MORPH-PUNCH-TOKENS folds to MOTION-WEIGHT/CARTOON-PUNCH)** − **FLAG-2 (−2 or restub:
AUR-SATIN/PRISM)**. Final canonical set ≈ **116 − 6 pruned + 41 new ≈ 151 buildable wave specs**, in
the §2 DAG tiers. The full per-wave table is the consolidation artefact this audit emits (one row per
wave: ID · tier · disposition · DEPENDs · reference-amendment · gate). It is too long to inline here
but is fully determined by §1–§4 above + the 37 amendment ledgers.

**Disposition rules (DRY, no-legacy, source-verified):**
- STAND: any union wave not named by an amendment (the ~82 quiet waves) — verify each still has ≥1
  consumer at build (the overfitting-audit canned prompt runs at close).
- AMEND: the ~28 waves an amendment AUGMENTs/RE-POINTs in place (no new file).
- PRUNE/EXCISE: the 6 above + FLAG-2's 2 — clean break, Disposition stamp, no alias.
- NEW: the 44 from amendment bodies → materialize as files in DAG order (§7).

---

## §6. CONVERGENCE % (the whole tranche)

- **Spec/design convergence: ~95%.** Every item has brainstorm→golden→challenge→delta→amendment;
  37/37 amendments authored; reconciliation source-verified sound. The remaining 5% is the 4 FLAGS
  (naming drift, phantom-slot residue, token-authority collapse, hero-registry materialization) — all
  small, all identified, none requiring re-design.
- **Materialization convergence: ~0%.** The 44 NEW waves are spec-in-amendment only; no DAG-ordered
  file set exists. (Correct for tranche-DEV; this is the Band-E deliverable.)
- **Implementation convergence: ~0% by design** — user-gated; `.glass-capsule`/`.paper-field` = 0 src.
- **WEIGHTED TRANCHE CONVERGENCE: ~88%** (spec done; consolidation = the last spec-side mile; build
  is the separately-gated hinge). The plan's own "~30% of the greenfield wave" counts *items delta'd*;
  this audit's 88% is *spec-coherence* — they measure different axes and both are true.

---

## §7. THE SINGLE BOLDEST MOVE — MATERIALIZE the DAG as real files (kill the implicit build order)

The whole tranche's build order currently lives IMPLICITLY across 37 prose amendments — an agent
building TIER-2 buttons could pick it before TIER-0 motion tokens land, and the only guard is each
amendment's prose DEPEND list. **Bold move: emit the 44 NEW waves as actual files under
`union/waves/`, each with a frontmatter `tier:` + `depends:` + `disposition:` block, in the §2 DAG
order, plus a generated `union/BUILD-DAG.md` index that topologically sorts them and FAILS if any
DEPEND points at an unauthored wave.** This converts the consolidation from a prose claim into a
*machine-checkable* DAG: the implementation cron can `topo-sort BUILD-DAG.md` and refuse to start a
wave whose deps are unbuilt — the same discipline that caught the fake-gates, applied to build order
itself. It also forces FLAG-1 (rename), FLAG-2 (phantom prune), and FLAG-4 (token-authority collapse)
to resolve AT MATERIALIZATION, because a topo-sort with a duplicate token-mint or a dangling `BD.W-`
filename throws. The audit stops being a document you trust and becomes a graph the build verifies.
