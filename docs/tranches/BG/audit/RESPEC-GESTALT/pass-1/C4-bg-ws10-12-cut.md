# C4 — BG plan critique: WS10–WS12 + the cut waves (`BG.W-CUT` et al)

**Lens:** RESPEC-GESTALT pass-1, lens C4. **Method:** verdict-per-wave over WS10/WS11/WS12 + the cut
choreography, with the assigned deep-question — *is the paint battery ACTUALLY scheduled such that visual
waves get verified before the cut, or does the DAG allow a cut with unverified paint (the cardinal
disease)?* All claims verified on disk at HEAD `976dc890` (`tranche/BG`, tree clean).

---

## Verdict

The cut CHOREOGRAPHY is, on paper, the most rigorous artifact in the tranche — `publish-and-cut.md` and
`real-paint-protocol.md` are genuinely excellent: the inv-11 linear-lineage spine, the §1 pre-tag full
battery siblings-absent, the C-SAFARI ★★★ non-skippable close precondition, the `proof:ship-attestation`
release-axis re-couple, and the disk-confirmed `release/4.3.0` divergence reconcile are all correctly
designed and, where checkable, correct on disk. WS10 and WS11 are unusually self-critical develop-ready
specs (WS10 folds twelve on-disk corrections; WS11 folds its whole critique fleet) with an HONEST cap
that the integration branch does not yet exist. **But the cut's paint-gating rests on two mechanisms that
are BROKEN in the executable engine at HEAD, and the disease this whole protocol exists to cure — paint
decoupled from the tag — is re-expressed one level up as a DAG deadlock that the coherence audit already
diagnosed and PRESCRIBED a fix for, which was folded into the PLAN doc but NEVER applied to the engine
code.** Concretely: (1) `bg-bh-execute.wf.js` still computes `cutReady = every(status==='DONE')` while
`paintWaves=[]` retires the in-cycle judge, so no code path flips a `[P]` wave PAINT-PENDING→DONE — the
cut can never legitimately fire, and the only escape is a human relaxing the gate (⇒ cut with unverified
paint); (2) the phantom `W-REFLECT3` funnel — declared abolished in three places — still owns the proving
path of the four most paint-load-bearing waves (12.5/12.8/13.2/13.3) in the LIVE cursor, so their live-π
arms name a wave that does not exist. The coherence audit caught both. The remediation was authored and
not executed. This is exactly the "N locally-correct patches, not one designed product" incoherence the
user's verdict names — the abolition of the terminal-reflect funnel was specced cleanly and left
half-applied.

---

## Findings (ranked)

### F1 — CRITICAL · the engine DAG deadlock: `cutReady` can only be satisfied by relaxing it, i.e. by firing a cut with unverified paint

The paint-decoupling is implemented in `bg-bh-execute.wf.js` by RETIRING the in-cycle paint judge:

- `:204` — `const paintWaves = []` with the comment "the in-cycle judge is retired here."
- `:200` — a `[P]` wave that builds green is set `PAINT-PENDING`, never DONE.
- `:87` `allDone`, `:100` `ready`, `:243` `cutReady` all test the literal `w.status === 'DONE'`.
- `:243` — `cutReady = waves.filter(BG).every(status==='DONE') && WS12-LAST.every(status==='DONE')`.

There is **no code path in the engine that flips a `[P]` wave PAINT-PENDING → DONE.** The DAG-loader
prompt (`:136`) even codifies the stall: "a PAINT-PENDING row STAYS PAINT-PENDING … MUST NOT re-enter the
build frontier." So the moment WS1's first `[P]` wave lands, `cutReady` is `false` forever, AND every
downstream wave whose precond is that `[P]` wave is not `ready()` (§`:100` requires precond `=== 'DONE'`).
The coherence audit's `pass-2-research-wave-dag-coherence.md:86-100` diagnosed this precisely as "the
cardinal headless/paint-decoupling disease re-expressed as a DAG deadlock" and confirmed it is LIVE on the
cursor (WS2's 11 waves cannot build behind `3.6`'s PAINT-PENDING; WS5 has 7 `[P]` waves; every BH
interleave gate `allDone(WSn)` fans out).

**The fix was prescribed and NOT applied.** `AMENDED-COHERENCE-PLAN.md:45-46,62` folds the exact
architectural remedy: `doneBuilding(w) = {DONE, PAINT-PENDING}` routed through `allDone`/`ready`/
`pendingLeft`; `cutReady` SPLIT into `buildComplete ∧ paintComplete`; a `FAIL-PAINT` status + FIX-AGENT
recovery — and lists `bg-bh-execute.wf.js` as the fold's deliverable file. **The engine on disk carries
ZERO of these markers** — `grep -c 'doneBuilding|buildComplete|paintComplete|FAIL-PAINT|paintFixable'
bg-bh-execute.wf.js` → `0`. `git log` shows the engine's last touch (`1e6127c9`) DELIBERATELY set the
paint-judge-retired/PAINT-PENDING-out-of-frontier state and predates the fold. The fold landed in the
PLAN prose; the CODE still deadlocks.

The danger is not the stall per se (a stall is loud). The danger is the RESOLUTION an operator reaches
for under a stalled frontier: manually flip PAINT-PENDING rows to DONE, or relax `cutReady`, to let the
cut proceed — which fires the tag with paint that was never dual-engine captured. That is the precise
disease (`real-paint-protocol.md:5`: "shipped broken 3× — BB green-lie · BC never-built-cure · BD
77-gates-re-pointed-but-live-π-never-blocks-the-tag"), re-created by the cure's own engine.

### F2 — CRITICAL · the phantom `W-REFLECT3` funnel persists on the four most paint-load-bearing cursor rows; the corpus holds THREE inconsistent positions on whether it exists

`real-paint-protocol.md:89-94` (§3) ABOLISHES the terminal reflect funnel: "There is NO W-REFLECT funnel
wave that flips all verdicts at the end (the write-locked-verdict deadlock that destroyed BB)."
`FINAL.md:346` states flatly "there is no W-REFLECT3 wave in BG." Yet the LIVE cursor still routes the
binding live-π arms of the field/refract/safari waves to it:

- `EXECUTION-PROGRESS.md:239` (12.5 `BG.W-GATE-FIELD-AURORA`) — `F-AA-LIVE _anchor re-shoot at ebf6e45b → W-REFLECT3)`
- `:242` (12.8 `BG.W-SAFARI-PARITY-GATE`) — `(non-authoring Metal capture → close / W-REFLECT3)`
- `:253` (13.2 `BG.W-GLASS-REFRACT-WEBGL`) — `(→ 13.3/close/W-REFLECT3)`
- `:254` (13.3 `BG.W-GLASS-BACKDROP-SAMPLE`) — `(non-authoring dual-engine Metal capture → close / W-REFLECT3)`
- `:98` (2.7 VT-ROUTE) — `re-attempt at W-REFLECT3` (×3 on the row); `:237` (12.4a) — `Model-B → W-REFLECT3`.

`bg-build-map.md` carries 11 more. These are the surfaces whose paint is the actual open risk (field-AA
over the recessive shell, the refraction Metal-drift, the C-SAFARI decode). Naming their proving path
"→ W-REFLECT3" points the live-π at a wave FINAL.md says does not exist.

The coherence audit AUTHORED a byte-precise remediation — `pass-1-proto-PT-1.md:56-98` re-homes all 29
occurrences across the cursor/build-map/AMENDED-WAVE-PLAN, each to "the wave's OWN non-authoring close."
Only the two ★ BLOCKING G8a-tripping lines (old L38/L113) were applied (the current cursor §0 paragraph
now reads "the wave's OWN non-authoring paint close"). The ~8 non-blocking B/C resolver tails were left.

Worse, the corpus now holds THREE mutually inconsistent positions: (a) abolished entirely
(`real-paint-protocol §3`, `FINAL.md:346`); (b) allowed for non-gestalt π —
`bg-build-map.md:72-74`: "A NON-ba-gestalt π deferral may still legitimately name W-REFLECT3"; (c) scrub
ALL occurrences (`pass-1-proto-PT-1.md §4.1`, which lists the non-blocking tails at old L233/236/247/248
as re-home targets). A reader of the plan cannot tell whether `W-REFLECT3` is a forbidden phantom, a
tolerated non-gestalt bucket, or a scheduled step. This is the gestalt-incoherence the user's verdict
names, manifest in the plan's own governance layer.

### F3 — MAJOR · `bg-paint.wf.js` is orphaned from the execution loop — the only mechanism that flips `[P]`→DONE is never triggered

`bg-paint.wf.js` is the decoupled dual-engine paint workflow that reads the PAINT-PENDING set, captures
real Chrome.app + real Safari.app, non-authoring-verdicts, and flips passing rows DONE (its header:
"reads the live [paint-pending] set from the cursor … then flips passing rows DONE"). **The main engine
`bg-bh-execute.wf.js` contains no `Workflow(` call and no `bg-paint` reference** — the two workflows are
not wired to each other. `pass-2-research-wave-dag-coherence.md:96` confirms: "The build engine never
triggers `bg-paint.wf.js`; nothing flips `3.6`→DONE in the build loop." So the paint-flip depends on a
human remembering to run a second, separate workflow between build sweeps, against a frontier that (per
F1) has no `doneBuilding`-for-ordering widen to let downstream waves proceed while the flip is pending.
This is the operational fragility that turns F1's deadlock into a live cut-with-unverified-paint vector:
the interleave is manual, undocumented in `engine-design.md`, and un-checkpointed at the cut.

### F4 — MINOR · `publish-and-cut.md §4` under-scopes the consumer reach the deeper constellation scout found

`publish-and-cut.md:85` asserts the break "touches exactly 3 by-name asks (NOT the whole constellation):
muster, speedtest, atlas. Every other live consumer (bbnf-buddy, slides-K) keeps every key — no ask
owed." The deeper `consumer-constellation.md:38-42,155-166` (the read-only sibling scout) finds a "fourth,
latent vector": muster (3.1.0), slides-K (3.2.0), bbnf-buddy (3.9.0) install BELOW 4.0.0 and slides is
exact-pinned 3.13.0 — so their `^5` bump crosses the ENTIRE 4.x BA reshape first, with a LIVE witness
(`slides-K DeckGate.vue:41` `DialogContent variant="opaque"` silently no-ops post-4.0.0 —
`BA.W-SURFACE-AXIS` retired `variant`→`surface`). "Keeps every key / no ask owed" is technically true
(key-preserving) but materially understates the lift: for four consumers the 5.0.0 update is a 4.0.0+5.0.0
JOINT migration, not a narrow re-point. The foreign-tree fence means glass-ui's OWN cut is not blocked, so
this is minor — but the operative cut-day cadence doc mis-scopes what four of six consumers actually face,
while the constellation scout (a different doc) gets it right. The two docs disagree; the operative one is
the looser.

### Verified-sound (noted so the plan is not re-litigated)

- **The `release/4.3.0` divergence handling is correct and disk-confirmed.** `publish-and-cut.md §0`
  claims `release/4.3.0` is NOT an ancestor of `tranche/BG` (both fork `998136bb`). Verified:
  `git merge-base --is-ancestor release/4.3.0 tranche/BG` → false; `git merge-base` → `998136bb`. The
  mitigation (merge `release/4.3.0`→master before its tag; linear `4.2→4.3→4.4→5.0` descent so `^4→^5`
  loses nothing) is the correct inv-11 fix. This is a well-handled edge, not a defect.
- **The C-SAFARI ★★★ close precondition (`real-paint-protocol §5`) and the release-axis re-couple
  (`proof:ship-attestation` §7) are well-designed** — the cut DOES gate on a committed real-Metal-Safari
  capture + a per-region pixel digest bound to source bytes, run siblings-absent in `.claude/worktrees/`.
  The paint-gating INTENT at the cut is sound; F1/F2/F3 are about the engine machinery that must actually
  drive the roster to that gate.
- **WS10/WS11/WS12 specs are develop-ready with honest caps.** WS10 folds twelve verified on-disk
  corrections (E1–E12) and correctly owns the `--ring→--focus-ring-color` 5.0.0 break vector; WS11 folds
  its full critique fleet and caps honestly on the absent integration branch; WS12 flips the R8 Card-press
  disposition to KEEP-THE-FOLD after re-verifying `Card.vue:221` at HEAD. These do not need re-derivation.

---

## Fold candidates

### FOLD-1 · `plan-doc-edit` (engine) — APPLY the coherence G1 fix to `bg-bh-execute.wf.js` as a hard Stage-0 pre-execution precondition (closes F1)

The gestalt fix is not a patch — it is the one the coherence audit already designed and left un-applied:
route `allDone`/`ready`/`pendingLeft` through `doneBuilding(w) = {DONE, PAINT-PENDING}` for BUILD
ORDERING, and SPLIT `cutReady` into `buildComplete ∧ paintComplete` so the tag stays coupled to painted
truth while the build frontier is unblocked by pending paint. Add the `FAIL-PAINT` status + bounded
FIX-AGENT recovery (`AMENDED-COHERENCE-PLAN.md:45-46,62` is the exact spec). Because this is tranche-DEV,
the fold is a PLAN edit that RE-STATES this as a NAMED Stage-0 engine-patch precondition ("no build cycle
opens until the engine emits `doneBuilding`/`buildComplete`/`paintComplete`/`FAIL-PAINT`; a boot dry-run
witnesses that `cutReady` is `paintComplete`-gated") — NOT an "accept-residual, owner=first boot" note
(the current MR-4 residual covers only the G4 node-emit, not this). Elevate it to a cut-blocker checklist
item in `publish-and-cut.md §1`.

### FOLD-2 · `plan-doc-edit` — reconcile the THREE `W-REFLECT3` positions into ONE, and execute the pending scrub (closes F2)

One canonical rule: `W-REFLECT3` is ABOLISHED; EVERY live-π (gestalt OR non-gestalt) closes at its owning
wave's OWN non-authoring paint close. (a) Apply the un-executed half of `pass-1-proto-PT-1.md §4.1/§4.2`:
scrub cursor `:98/:237/:239/:242/:253/:254` and the 11 build-map tails, re-homing each to the named owning
wave's own close (13.2→13.3 keystone + own close; 12.5/12.8/13.3→own non-authoring Metal close). (b) DELETE
the `bg-build-map.md:72-74` "a NON-ba-gestalt π may legitimately name W-REFLECT3" carve-out — it
re-legitimizes the phantom and is the source of the three-way inconsistency. (c) DELETE the `FINAL.md:344-347`
re-legitimizing clause ("it is the name for the deferred post-integration human-verdict step") per the
audit's bucket-E; the cross-page harmonized-whole read is WS12 `BG.W-PAGE-COMPONENT-AUDIT`'s OWN close, a
real wave, not a funnel.

### FOLD-3 · `plan-doc-edit` (engine + `engine-design.md`) — wire the paint workflow into the build cadence (closes F3)

The gestalt approach: the paint-flip must be a scheduled edge, not a human ritual. Either (a) the main
engine invokes `Workflow({ scriptPath: bg-paint.wf.js })` after each build sweep drains a batch of `[P]`
waves (the natural interleave), or (b) if the heavy capture must stay a separate manual pass, then
`engine-design.md` + `publish-and-cut.md §1` MUST document the mandatory interleave with an explicit
cut-blocking checkpoint: "no `[P]` wave may be PAINT-PENDING at `cutReady`; `bg-paint.wf.js` has flipped
every `[P]`→DONE (or FAIL-PAINT→FIX)." Option (a) is the idiomatic one — it removes the human from the
critical path and makes the deadlock structurally impossible. Pairs with FOLD-1 (the `paintComplete` half
of the split `cutReady` is exactly what this edge feeds).

### FOLD-4 · `plan-doc-edit` — re-scope `publish-and-cut.md §4` to the constellation's fourth-latent-vector (closes F4)

Replace the "narrow / no ask owed" framing with the constellation's honest reach: name muster/slides-K/
bbnf-buddy/slides as the four pre-4.0.0-floored consumers whose 5.0.0 update is a 4.0.0+5.0.0 JOINT
migration (cite `slides-K DeckGate.vue:41` as the live Dialog-variant witness), distinct from the 3
by-name asks. Key-preserving ≠ zero-lift. This aligns the operative cut-day cadence doc with the deeper
`consumer-constellation.md` scout so the two governance docs stop disagreeing.

### FOLD-5 · `merge-waves` / `plan-doc-edit` — resolve the `6.3`+`6.7` "ONE atomic gate edit" that the file-disjoint batcher cannot honor (adjacent to the cut's WS5-consume)

Noted for completeness (surfaced while tracing the cut's WS5 viz-subpath consume): `pass-2-research-wave-dag-coherence.md:114-120`
finds the WS5 `6.3`+`6.7` "atomic co-edit of `proof-gpu-substrate-single.mjs`" is unenforceable under the
file-disjoint `composeBatch` (`:111`) — they land in separate commits and `6.3` can transiently RED the
integrator's gate-re-run and revert. Resolution: MERGE `6.3`+`6.7` into one wave owning the single gate
edit, or author `6.3` to leave the gate green alone. Both are `[P]`, so this compounds F1's stall onto
WS4's `AFTER WS5` carves. This is WS5-scoped (adjacent to my lens via the cut's viz-consume), flagged for
the WS5 lens to own.
