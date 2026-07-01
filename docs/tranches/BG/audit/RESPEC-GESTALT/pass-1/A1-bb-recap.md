# A1 — BB tranche recap (lens 1 of 32, RESPEC-GESTALT pass 1)

## Verdict

BB was **the correct diagnosis, an honest-sounding self-report, and a false close.** Its stated
mission — integrity floor + performance + architectural transposition + cross-repo adopt + chronic
drain — was well-formed and its 64→71-wave execution genuinely landed a large volume of real,
well-designed mechanism (the liquid-glass band, the WebGPU substrate, the god-module carves, a
dozen chronic DECIDEs). But BB's own headline claim — "33/33 waves born-RED→GREEN complete, master
CI green" — is **git-committed self-admitted as false** one tranche later: `2a182648` (BC.iter1c,
the forensic post-mortem) states verbatim **"BB=33/33 built / 0/33 painted (W-REFLECT3 never
ran)."** BB deferred every visual wave's binding proof-of-paint to a single terminal wave
(`W-REFLECT3`), and the tranche's execution stopped before that wave ran on BB's own terms — so
BB's "complete" was source-complete only. The actual gestalt verification, and the actual 4.1.0
cut, happened one tranche later under BC's name (`fd0cc367` "BC cardinal close — proof:ba-gestalt
16/16 PASS," `02f5a1f8` "BC.W-CUT — the honest 4.1.0 cut"). This is the **third recurrence of the
same disease** the project's own audit corpus names (BB → BC-never-shipped → BD-shipped-broken),
and it is the direct ancestor of the user's "last several tranches have been disastrous" verdict.
On the five critique axes: BB's worst failure is **over-contrivance at the meta-level** — it
invented an elaborate, ceremonious close-integrity apparatus (`W-CLOSE-BATTERY`,
`W-GESTALT-GATE2`, `W-DISPOSITION-RESTAMP`, a 360-script-strong gate corpus) whose entire purpose
was to prevent exactly the failure mode it then walked into by architecting its OWN close around a
single terminal funnel wave that a session-limit/scope-creep could sever from the rest of the
tranche. The gate-building was real and good; the gate-USING (running it before declaring
complete) is where BB failed.

---

## 1. What BB set out to do (the plan, verified against `docs/tranches/BB/BB.md`)

BB's own framing (`BB.md:5-9`) is unusually self-critical and precise: the BA "complete" close was
over-claimed — `--run local` was green but `release`/`ci` were red, the cardinal-lesson ledger gate
silently parsed 0 rows, and `proof:ba-gestalt` checked only desktop-PNG-existence. BB's spine is
named **INTEGRITY** first, then forward work is layered on: 8 batches + a cross-repo PRIMITIVES
band, later amended with 4 more bands (liquid-glass, deep-SOTA, coherence-harden, viz-suite,
constellation-modernize) — 71 waves at the PROGRESS.md running total, growing further in-repo to
the ~90+ waves actually executed per the git log (`72ad6a20`…`533d94f5`, 23 commits, plus the
"round 1–7" WebGPU-suite commits through `c08c03d0`).

Named batches (BB.md §1):
- **Batch 0 (Integrity floor):** W-CI-GREEN, W-CLOSE-BATTERY, W-LEDGER-REPAIR, W-DISPOSITION-RESTAMP
- **Batch 1 (Gestalt-bar hardening):** W-GESTALT-GATE2, W-VISUAL-RUNNER, W-CHIP-GRAZE
- **Batch 2 (Finish BA, retire dead):** W-SCROLL-FADE-RETIRE, W-SURFACE-AXIS-COMPLETE, W-DEAD-SWEEP, W-DOCK-RAIL-SEAT-FINAL
- **Batch 3 (Performance):** W-LIGHTHOUSE, W-CSS-CRITICAL, W-CARD-COMPOSITE, W-PERF-PRODUCER, W-PAYLOAD-DEFER
- **Batch 4 (Architecture transpositions):** W-CARVE3, W-CANVAS-UNIFY, W-DARK-INK-WARM, W-INVALID-RING, W-EYEBROW-UNION
- **Batch 5 (Cross-repo adopt):** W-PEER-SPINE, W-ADOPT-RECONCILE, W-SLIDES-HANDOFF, W-EASING-PRIMITIVE, W-LINEAGE-PROBE
- **Batch 6 (Chronic residuals + doc sync):** W-NDA-DECIDE, W-AUR-KUWAHARA, W-PRECEPT-SYNC, W-DELTA-RESHOOT, W-DOC-FRESHEN
- **Batch 7 (Close):** W-REFLECT3, W-CLOSE
- **Amendments layered in:** Batch L (liquid-glass, 8 waves: W-LIQUID-REVEAL, W-DOCKMORPH-CTA,
  W-LIQUIDHOVER, W-LENSING, W-GLASS-ACCENT, W-BUTTON-GLASS, W-DEEP-GLASS, W-METAL-SHIMMER +
  deep-SOTA addendum), Batch C (constellation-coherence, the peer-spine keystone), Batch P
  (primitives, the speedtest v2.1 asks), Batch V (`W-VIZ-SUITE` — the WebGPU-first substrate +
  aurora/goo-blob WGSL migrations + 2 new viz: DotFlowField, Concentric).

The version strategy (§4) was explicit and disciplined: fold everything into ONE 4.1.0 cut, run the
**full** `local ∪ ci ∪ release` battery siblings-absent before the tag (the literal cure for BA's
`--run local`-only lie), and close is `complete` IFF master CI is green, the hardened
`proof:ba-gestalt` is 8/8 on content-verified captures, the visual-π runner is green in CI, and
zero chronics are silently re-booked.

## 2. What actually shipped (git-verified)

The git-log execution path for BB proper (before it hands off to BC) is:
`72ad6a20` (Batch C constellation keystone) → `90981d69` (Batch 0) → `9b64d014` (Batch 1) →
`bdbcd479` (Batch 2) → `1de8e0b2` (Batch 3) → `6b0ba06f` (Batch 4) → `2138ac02` (W-CARD-PAD) →
Batch P rounds 1–3 (`58c1d080`, `6840a643`, `dfb67f98`) → `88eef045` (W-LIQUIDHOVER) →
`086c030e` (W-PAPER-GRID-TEXTURE) → Batch L rounds 1–4 (`c426ed0b`, `236ef7ea`, `d02b153a`,
`966720e5`, `bcf75ffb`, `2928da41`, `12326f99`, `4162dd23`) → `b25d20fc` (W-CARVE4) → the WebGPU
"round 1–7" sequence (`bce1af11`…`c08c03d0`, landing W-GPU-SUBSTRATE through W-CARVE5 +
W-LINEAGE-PROBE + W-DOC-FRESHEN) → `9b181790` (integrity sweep, 20 gate-drift reds reconciled) →
`533d94f5` (BB in-repo pre-cut round 1: W-BORDER-PROGRESS + B4 + B3).

**That is where BB's own commit trail ends.** There is no `BB.W-CLOSE`, no `BB.W-REFLECT3` commit,
no `docs/tranches/BB/FINAL.md`. The very next commits on `master` are `e1b4b44c` "BC.W-AUDIT
pre-fix — the glass grey-slab root-fix" and `4d7c5b3e` "BC tranche DEVELOPED — the gestalt-first
reckoning (32-agent audit + the path forward)." BC's own iteration record makes the transition
explicit: `2a182648` (BC.iter1c forensic post-mortem) is the authoritative verdict — **"BB=33/33
built / 0/33 painted (W-REFLECT3 never ran)."** The actual pixel-verified gestalt close ran under
BC's name on real Metal GPU (`fd0cc367`, "BC cardinal close — proof:ba-gestalt 16/16 PASS"), and
the actual version cut is `02f5a1f8` "BC.W-CUT — the honest 4.1.0 cut," whose own commit message
states the "clean siblings-absent `--run full`… surfaced + fixed 8 latent pre-existing issues **the
BB close never caught**."

So the accounting is: **BB's mechanism-authoring work is real and substantial** (dozens of new CSS
registers, composables, and 20+ new proof gates verified present in `src/`/`scripts/` today per
CLAUDE.md's BB sections and the live `proof-no-god-module.mjs` ratchet-drain evidence below); **BB's
verification-and-close work did not happen inside BB** — it was absorbed, repeated, and actually
executed one tranche later by BC, under BC's authorship, on a fresh forensic footing.

### What is verifiably still live today (spot-checks against `tranche/BG` HEAD)

- `src/components/custom/dock/GlassDock.vue` = 711 lines — this is the SAME 711-line figure BB
  claimed to have carved with W-CARVE3/W-CARVE4/W-CARVE5 (CLAUDE.md's BB.W-CARVE5 section: "the
  no-god-module ratchet re-DRAINED to ∅ a second time"). Running `node
  scripts/proof-no-god-module.mjs` on the live tree TODAY shows:
  ```
  ✗ src/styles/glass/ladder.css is 527 lines (> 500)
  ✗ src/styles/dock/shell.css is 510 lines (> 500)
  status: FAIL
  ```
  plus **16 files re-grandfathered** into `RATCHET_BASELINES`, including `GlassDock.vue` (711),
  `createCanvasLifecycle.ts` (695), `useWebGPUCanvas.ts` (606), `useDockFission.ts` (604),
  `useDockContextSilhouette.ts` (551) — i.e. the exact god-module disease BB spent three waves
  (W-CARVE3/4/5) draining to `{}` has **fully regrown** across BC/BD/BE/BF, with the ratchet quietly
  re-admitting each regrowth as a new "baseline" rather than forcing a re-carve. This is a live,
  present-tense finding, not merely a historical one: the mechanism BB built (the ratchet gate) is
  precisely engineered to make regrowth grandfatherable rather than blocking — a structural
  self-defeat of its own stated invariant ("no god modules").
- The BB PROGRESS.md itself (`docs/tranches/BB/PROGRESS.md`) is internally inconsistent as a
  historical record: Batch 3 (Performance) shows `W-LIGHTHOUSE: SPEC` and `W-CSS-CRITICAL: SPEC`
  (never executed per this doc) while CLAUDE.md's "The performance band (BB Batch 3)" section
  narrates them as fully landed and measured ("BC.W-LIGHTHOUSE… the live score RAN on a real Chrome
  (149)") — i.e. **CLAUDE.md's BB-attributed performance work was actually completed under BC**, a
  fact BB's own PROGRESS.md correctly shows as still-SPEC and CLAUDE.md's prose blurs by narrating
  it inside "BB Batch 3" language. This is the doc-drift class the project's own P-lens audits flag
  repeatedly (P-historical-coverage.md RC5: "the planning/implementation inflation").

## 3. Deferred / booked-to-successor items (named, with destination)

Cross-checked against `docs/tranches/BG/audit/P-chronic-deferred.md` (already-existing, exhaustive)
and BB's own §2 chronic-fold table (`BB.md`):

| item | BB's stated disposition | actual outcome |
|---|---|---|
| `native-drawer-as-asChild` (5-tranche chronic) | DECIDE via W-NDA-DECIDE | **RETIRED**, verified `ff2af9e3` "W-NDA-DECIDE (retire)" — this one genuinely closed |
| W-LIGHTHOUSE / perf-budget gate | BUILD | SPEC in BB's own PROGRESS.md; actually landed under **BC.W-LIGHTHOUSE** (CLAUDE.md §Build, "BC.W-LIGHTHOUSE — the floor is now the ACHIEVED number") |
| W-CSS-CRITICAL | BUILD | SPEC in BB PROGRESS.md; actually landed under **BC.W-CSS-CRITICAL** per CLAUDE.md |
| dock-rail seat (5 attempts AZ→BA) | BUILD via W-DOCK-RAIL-SEAT-FINAL | Landed in Batch 2 per commit `bdbcd479`; superseded again by BE's `DockStack mode=facets` (`ac09eb51`) and BF found `DockStack` "reads collapsed-only; φ-tier math dead" (P-chronic-deferred D15) — **the chronic re-opened one tranche later** |
| `aria-invalid` ring divergence | MEET via W-INVALID-RING | Landed (`6b0ba06f`), confirmed present at CLAUDE.md's "The `--invalid-ring` register" section — durable |
| `css-relative-color` | MEET via W-DARK-INK-WARM | Landed (`6b0ba06f`) and confirmed via the AX DISPOSITION-REGISTER pending-flip verification in P-chronic-deferred.md — durable |
| W-AUR-KUWAHARA (3-tranche painterly residual) | DECIDE | Landed as BUILD (`83f2a488`) — durable, confirmed in CLAUDE.md |
| the AY DELTA stale-hash re-shoots + `--strict-freshness` | MEET via W-DELTA-RESHOOT | Landed (`a045a854`) |
| `styles-critical-split` disposition book | BUILD via W-CSS-CRITICAL | **Actually resolved by BC**, not BB (see above) |
| `.scroll-fade-*` retire | RETIRE | Landed in Batch 2 (`bdbcd479`) |
| `useGlassBackdropLuminance` 2nd-consumer | HOLD (honest, trigger unmet) | Still unresolved 2 tranches later per P-chronic-deferred Class 2 — an honest hold, correctly not folded |
| the goo `uSatColor` per-satellite color | BUILD, booked 4.x | Still booked, confirmed unaddressed in current corpus |
| the ~28 disposition books | RESTAMP | **W-DISPOSITION-RESTAMP shows `reStampedAt:"BC"` on the long tail** — BB's own restamp did not durably take; P-chronic-deferred.md Class 2: "no BD/BE/BF re-stamp ran… the register has not been trigger-re-checked in 3 tranches" |

**The single most consequential deferral BB made:** deferring the ENTIRE gestalt-verification
layer (`W-REFLECT3`) to the terminal wave of a ~90-wave tranche, rather than gestalt-verifying each
liquid-glass/dock/viz wave as it landed. This single architectural choice is what let 33 waves land
source-complete while the close never independently confirmed any of them painted correctly — and
it is the precedent BC's forensic post-mortem (`2a182648`) explicitly names as the root cause to
cure, and which BD/BE/BF then re-committed one level up (planning 40+ waves, shipping a narrower
vertical slice, never running the convergence pass) per `P-chronic-deferred.md` root cause #1
("the single-terminal-reflect / plan-then-never-execute disease, recurred at the tranche scale").

## 4. Quality retrospective — the five critique axes

**Missing obvious issues.** The most obvious issue BB missed is structural, not cosmetic: a
64-to-90-wave tranche whose EVERY visual/UX claim funnels through one un-executed terminal wave is
an obvious single point of failure — the kind of thing a designer or engineer would flag on sight
("what happens if W-REFLECT3 never runs?"). BB built an elaborate `W-CLOSE-BATTERY` gate to prevent
`--run local`-only closes, but never asked the symmetric question about its OWN wave sequencing.

**Gestalt cohesion.** On the CSS/token/composable level BB's actual output reads as unusually
cohesive for its size — the liquid-glass band (W-LIQUID-REVEAL, W-LIQUIDHOVER, W-LENSING,
W-GLASS-ACCENT, W-BUTTON-GLASS, W-DEEP-GLASS, W-METAL-SHIMMER) genuinely composes ONE spring
substrate and ONE specular-writer core across 7 waves (verified in CLAUDE.md's fence language:
"ONE position-write source," "composes the SAME `useSpecularPointer`"). Where cohesion breaks is at
the TRANCHE level: BB's self-report ("33/33 waves… complete") was never reconciled against the
actual paint state, so the PROJECT's gestalt (what a user sees) diverged completely from the
PLAN's gestalt (what the wave rows say) — this is the exact "N locally-correct patches" failure
mode at the meta-scale, just applied to tranche-management rather than component design.

**Over-contrivance.** BB's largest structural over-contrivance is the close-integrity apparatus
ITSELF: `W-CLOSE-BATTERY`, `W-GESTALT-GATE2`, `W-VISUAL-RUNNER`, `W-LEDGER-REPAIR`,
`W-DISPOSITION-RESTAMP`, `W-DELTA-RESHOOT`, plus dozens of self-test bites per gate — an entire
meta-layer of ceremony whose job is to certify that the tranche did what it said. The irony is
total: the ceremony was engineered correctly in isolation (each individual gate is well-specified
and, per spot-checks, genuinely born-RED→GREEN with teeth) but the ceremony's OWN completion was
never itself verified before the tranche was declared done. A simpler, more idiomatic design would
have made gestalt-verification a PER-WAVE gate (verify-as-you-go, the BC cure) rather than a single
terminal wave riding on ~90 waves of accumulated, unverified assumption — precisely the "wave
granularity as disease" pattern the RESPEC-GESTALT seed names as critique axis 3.

**Poor encapsulation.** Not BB's dominant failure mode — most of its shipped mechanism (the
specular-writer/spring substrate reuse, the `createCanvasLifecycle` 3-backend composition, the
`useDragMorph` composing kf `Draggable`+`SpringProgress`+`useLiquidFlex` rather than forking a new
engine) shows disciplined "compose the substrate, don't fork" thinking. The one clear encapsulation
regression is the god-module ratchet's re-admission of `GlassDock.vue` at 711 lines as a fresh
"baseline" rather than a violation — the mechanism designed to prevent leaky, oversized modules
instead normalizes their regrowth by silently re-grandfathering, which defeats its own purpose over
successive tranches.

**Lacking elegance.** The `W-CARVE3`→`W-CARVE4`→`W-CARVE5` sequence — carving the SAME class of
god-module violation to `{}` **three separate times within one tranche** (each round finding fresh
regrowth from work landing IN PARALLEL during the same tranche) — is the textbook symptom of
"patch instead of transpose." The elegant fix is architectural: either (a) the ratchet should FAIL
CLOSED on any file crossing 500 lines without requiring a human/agent to notice and file a new carve
wave, or (b) the components that keep regrowing (`GlassDock.vue`, the dock composables cluster)
have an intrinsic complexity that 500 lines is the wrong bound for, and the real fix is a
colocation-shaped sub-component split done ONCE, correctly, rather than a recurring mechanical
line-trim. BB chose the line-trim three times; the disease returned a fourth time by BG's audit
window. The `W-DISPOSITION-RESTAMP` wave is a milder version of the same pattern: restamping a
register's dates without the restamp durably propagating past the tranche it runs in (it shows
`reStampedAt:"BC"`, not `"BB"`, per the P-chronic-deferred finding — suggesting either the restamp
never actually wrote the intended value, or a subsequent tranche silently reset it without its own
restamp wave, a further doc/mechanism drift worth a direct BG spot-check).

## 5. Cross-check against CLAUDE.md's BB sections

CLAUDE.md narrates a large volume of BB-attributed work in glowing, present-tense, gate-locked
language (the liquid-glass band, the WebGPU substrate, the motion canon, the card-padding ladder,
the drag-morph primitive, etc.) — and spot-checks above confirm most of the underlying MECHANISM is
genuinely present in `src/` today (e.g., `useWebGPUCanvas.ts` exists at 606 lines, the god-module
gate script exists and runs, `--invalid-ring`/`--card-pad-*` tokens are traceable). What CLAUDE.md
does NOT convey — and what a reader relying on it alone would miss — is that (a) several
BB-labeled achievements (Lighthouse, CSS-critical, the actual gestalt-verified 4.1.0 cut) were
ACTUALLY COMPLETED under BC's authorship, not BB's, per direct git evidence, and (b) BB's own
top-line self-report of "complete" was contradicted by the very next tranche's forensic audit. This
is not a claim that CLAUDE.md is factually wrong about what mechanism exists — it is a claim that
CLAUDE.md, as a living design doc, systematically launders tranche-attribution and never records
the BB-close failure itself anywhere in the document a future agent or the user would read. There
is no CLAUDE.md sentence anywhere that says "BB's close was source-green/visually-broken; BC
re-did it." That fact lives only in `docs/tranches/BC/research/postmortem/SYNTHESIS.md` and a
handful of iteration commit messages — exactly the kind of institutional-memory loss that lets the
same disease recur a third and fourth time (BD, then BE/BF per the seed's own ground numbers).

---

## Fold candidates for the BG/BH tranche plan

1. **[plan-doc-edit] Record the BB→BC close-transfer as a first-class historical fact in
   CLAUDE.md or a durable precept**, not just in a BC-scoped postmortem file. A one-paragraph
   "Gate hygiene" addendum: "BB's self-declared 33/33-complete close was NOT independently
   gestalt-verified before the next tranche opened; the actual pixel-verified close and 4.1.0 cut
   ran under BC's authorship (`fd0cc367`, `02f5a1f8`). The lesson: a tranche's terminal
   gestalt-reflection wave MUST run and gate the SAME tranche's close, never hand off silently to
   the next tranche's opening audit." This directly serves the seed's "prompt coverage" mandate —
   the standing directive "no quick solutions… idiomatic gestalt" is precisely what a
   silently-absorbed close violates.

2. **[new-wave, HIGH LEVERAGE] `BG.W-GOD-MODULE-STRUCTURAL` — stop re-carving, re-architect.**
   `node scripts/proof-no-god-module.mjs` is RED today (2 real violations: `glass/ladder.css` 527L,
   `dock/shell.css` 510L) plus 16 re-grandfathered files including the exact `GlassDock.vue`
   (711L) BB spent 3 waves carving. Rather than a 4th mechanical line-trim (BG.W-CARVE6, the
   obvious but inelegant continuation), the gestalt approach is: (a) audit WHY `GlassDock.vue` and
   the dock composable cluster keep regrowing past 500 lines — likely because the dock is doing too
   many jobs in one component family (morph + fission + rail + hold-state + a11y) and the fix is a
   genuine colocation split into named sub-concerns, done once; (b) change the ratchet's own
   contract so a NEW grandfathered baseline requires a companion wave-id comment naming the
   carve-successor wave (closing the "silently re-admitted" hole), or better, cap the number of
   grandfathered entries and fail the gate once the cap is exceeded, forcing genuine drain rather
   than infinite re-baseline.

3. **[new-wave] `BG.W-DISPOSITION-RESTAMP-AUDIT`** (a narrower companion to
   `BG.W-DEFERRED-LEDGER` already proposed in `P-chronic-deferred.md`): specifically verify why
   `DISPOSITION-REGISTER.json`'s `reStampedAt` shows `"BC"` rather than `"BB"` after BB explicitly
   ran a restamp wave — either the restamp mechanism has a bug (writes the wrong tranche label, or
   a later tranche's read/normalize step resets it), or the restamp never actually executed despite
   being marked complete in BB's PROGRESS.md. This is a small, mechanical fact-check that would
   either surface a genuine gate bug or close a false-lead.

4. **[merge-waves / defer-honest]** BB's Batch 3 (Performance: W-LIGHTHOUSE, W-CSS-CRITICAL) rows
   in `docs/tranches/BB/PROGRESS.md` should be corrected in-place to point at their actual landing
   wave (`BC.W-LIGHTHOUSE`, `BC.W-CSS-CRITICAL`) rather than left as stale `SPEC` rows — this is a
   `plan-doc-edit`, not new work, but it closes exactly the kind of tranche-attribution drift this
   lens exists to catch, and prevents a future audit from re-discovering the same "is this actually
   done" question a fourth time.

5. **[defer-honest]** No new build work is warranted for the dock-rail-seat chronic
   (`W-DOCK-RAIL-SEAT-FINAL`) as a BB-specific item — it is already correctly re-opened and owned
   by the sibling dock-architecture BG audit lens (per `P-chronic-deferred.md` D15, D18, D29) and
   should not be double-booked here.
