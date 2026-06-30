# PT-1 · [adversarial critique] DAG re-anchor + paint-decouple deadlock fix

**Critique agent · PASS 1 · coherence cluster §2.D1+D2+D3 · HEAD `6c1f5386` · siblings-intact exit 0 · scope READ-MOSTLY (this file only)**

Verdict on the spec (`pass-1-proto-PT-1.md`): **feasible + core-correct, NOT yet amend-ready.** convergence **70%**. The reframe (3.6 is G4's *prerequisite* not its *victim*) is correct and well-evidenced; every line-number, the orphan-chain, the 8px peer, the dist-0, and the five control-flow edits verify on disk. Five concrete opens remain — one genuine model-completeness gap, one honesty overclaim, one 2/9-coverage gap.

## What I re-verified GREEN (the spec is honest on these)
- wf.js line refs A1-A5 (byId:86, allDone:87, ready-precond:100, pendingLeft:153, cutReady:241-247) — **all exact.**
- orphan chain: `var(--glass-blur-dock)` composite **0 src readers**, `--blur-dock` bridge **0 readers**, `--glass-saturate-dock` read only inside the chain's own decls; `dist/glass-ui.css` carries **0** `glass-blur-dock`. Retirement genuinely dist-neutral *at G4-run-time (post-3.6)*. ✓
- the "8px peer" is **correct** (`--glass-blur-resting-radius: 8px` on disk; CLAUDE.md's "resting 10px" narrative is stale, the file is the truth) — so site (5)'s `→resting→8px` is consistent, NOT a defect.
- 3.6 shipped `--dock-surface-blur: var(--glass-blur-resting)` at shell.css:29, read at :159 — G4 must NOT re-declare it (C1 correct). ✓
- B1 targets exist: cursor EXECUTION-ORDER NOTE 218-222 (the FALSE "predecessor of WS1"), G4 row at :226 seq 12.0. ✓

## The five opens (most-severe first)

### O1 (model-completeness, strongest) — paint-FAIL recovery is undefined; "correct either way" is overstated
The decoupled model's FAIL axis is incoherent across THREE artifacts:
- `bg-bh-execute.wf.js:204` `const paintWaves = []` → the entire in-cycle paint-judge + fix loop (205-233, incl. the `w.status='PENDING'` re-queue at 223) is **dead code**. The engine has NO path to re-queue a paint-FAILed wave.
- `bg-paint.wf.js:51` on FAIL: *"leave PAINT-PENDING, write defectLocalization + mustFix[] into the DELTA (a build-fix-agent will address it)"* — external, unautomated, unspecified.
- `engine-design.md:156/168/210` STILL documents a LIVE in-cycle `fixLoop(v.w,v,MAX_FIX)` re-entering at BUILDING — stale; describes the retired model.

Under Part A's two-phase terminal, a paint FAIL produces an infinite `build-complete ↔ run-bg-paint` ping-pong (the FAILed wave stays PAINT-PENDING = doneBuilding = nothing to rebuild; bg-paint re-FAILs it). `cutReady` correctly never fires (good — painted truth demanded), but there is no automated fix injection. PT-1's A5 terminal log only describes the happy path. **Fix:** A5's log must carry an explicit FAIL branch (external root re-implement + integrator re-commit before resume); the spec must reconcile or flag engine-design.md's stale fixLoop; soften "Part A makes the decoupled model correct either way" → "correct for build-ordering + the terminal signal; paint-FAIL recovery is a PT-2/external dependency, not closed here."

### O2 (honesty) — "deadlocked right now" / "cutReady can NEVER fire" is overstated; the deadlock is LATENT/induced
- **No** build-map wave names a PAINT-PENDING wave (3.1 CARTOON-INK-GAMUT / 3.6 GLASS-BLUR-PEER) as a precond (grep empty).
- The build has **empirically progressed to 44 DONE / 7 PAINT-PENDING / 130 PENDING** — the [P] waves did not block anything; the frontier is not frozen.
- The genuine live failures are (a) the engine reaches an *ungraceful empty-batch human-gate terminal* when only PAINT-PENDING remain (Part A4/A5 cleans this), and (b) Part B's OWN new `G4→3.6(PAINT-PENDING)` edge would deadlock G4 under the old `=== 'DONE'` code — so **Part A3 is a prerequisite FOR Part B's edge, not a fix for a current freeze.** And `cutReady` is not permanently broken — it fires once bg-paint flips the [P] rows. Re-state §0/§1 accordingly (V-A's synthetic deadlock-repro is the right verification — just label it latent/induced).

### O3 (coverage) — Part C re-derives only 2 of G4's 9 sites
Carve (C3) + retire (C1/C2) = 5 files re-anchored. Sites 5-9 + R3 + R4 are NOT re-verified by the spec: `proof-dock-shrink-blur` S3, `proof-theme-style` `.blur-dock` probe (:51), the `InstrumentChassis.spine-variant` vitest assertion (:115, asserts `--glass-blur-dock-radius:9px`), `glass-cal.spec.ts` EXPECT_RADII (:46), `proof-glass-cal` B1/B3 **incl. its internal self-test fixtures** (`proof-glass-cal.mjs:177` models the dock reading the retired `--glass-blur-dock` — the retirement reaches into the gate's own fixtures), `proof-glass-depth` D3 (:79), R3 gates:emit-ci regen, R4 category-card-warm full-battery. I confirmed **all are LIVE on disk (no drift)** — so PASS-2 reading the build-map handles them — but the spec's title "re-derive G4's spec against the live frontier" overclaims its 2/9 coverage. **Fix:** state explicitly "sites 5-9 + R3/R4 re-verified live, no drift; this Part C delta corrects only the carve+retire arms," and name the proof-glass-cal internal-fixture reach.

### O4 (mechanism robustness) — seq re-anchor leans on the B3 loader-prompt pin alone
The loader DERIVES seq from "build-order ordinal" (structural map position), not the EXECUTION-PROGRESS seq cell. B1 (cursor cell) + B2 (prose/headers) do NOT relocate G4's row out of bg-build-map.md's Band-0.5/WS7 region into a PHASE-0 structural slot, so B3's explicit "seq 0.7" prompt-pin is the SOLE load-bearing seq source — an LLM-behavior dependency. V-B #1 (dry-run seq===0.7) is the right backstop but must be a HARD gate before G4 picks, not assumed. Also: the existing `G4→BG.W-CLOSE-SWEEP` (P-CLOSE→P-SWEEP) precond edge (build-map:489,496) survives the re-anchor — enumerate it so the re-anchor doesn't silently drop it.

### O5 (minor self-inconsistencies) — reconcile before amend
(a) §0 "already violated on disk" contradicts §1's corrected ordering — under the corrected ordering (G4 after 3.6, before 3.5/WS6/WS9) the on-disk state is CONSISTENT, not violated; re-state as "at risk once 3.5/WS6/WS9 run." (b) V-C #4 keeps the literal "all 15 affected gates" while the spec de-literalizes 470/459 — apply the same de-literalization. (c) the cursor EXECUTION-ORDER NOTE (218-222) + build-map prose lines 13/32/39/137/442/902/920/979 carry "LANDS FIRST, before WS1" — the loader may read this contradictory ordering prose; B2 reconciles 6 build-map headers but the cursor note + lines 32/39 must also flip to "lands early — after 3.6, before 3.5/WS6/WS9."

## Handoffs the spec already flags (not re-raised): §2.M1 (WS9 *Files*→carved leaves), §2.U1 (bbnf-buddy external `--glass-blur-dock` override), the PT-2 decouple-vs-recouple decision. O1 sharpens the PT-2 link: the paint-FAIL recovery IS the crux of that adjudication.

**FENCE honored:** wrote only this file under `docs/tranches/BG/audit/RESPEC-COHERENCE/`; zero src/demo/scripts/CLAUDE.md edits; siblings-intact exit 0.
