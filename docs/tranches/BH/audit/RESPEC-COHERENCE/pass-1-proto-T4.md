# BH Coherence Re-Spec — PASS 1 — Prototype T4 (mode: spec)

**Issue.** C1 [HIGH] + C4 [MED] — *the B2.1-swap G4-block absorption*: BG's just-folded G4 (`e550f1b0`) placed FOUR
obligations on the wave it names *BH-B2.1-swap* — (a) the kf-peer bump `^5.0.0→^5.1.0`, (b) the L15 net-budget
re-baseline as ONE name-agnostic number across ALL chunks, (c) the FINAL `ci.yml` byte-fresh emit, (d) running
`proof:binding-sweep` `[local]` at the bump wave — plus it routed the floor-vs-API gate-hardening onto
`BG.W-GATE-FIELD-AURORA`. But **BH's OWN executable plan (`PLAN.md:68`, the B2.1-swap wave row) + the `EXECUTION-PROGRESS`
cursor (row `18.1`) carry NONE of it** — B2.1-swap is described as a pure subpaths-delete/regen wave. A resumed BH
execution reading ONLY BH docs would ship a 5.0.0 whose `useDragMorph` snap binding is dead on every `^5.0.0` consumer,
with no device-free gate catching it (the cut env's devDep pin masks the broken peer floor).

**Verdict: FEASIBLE.** The fix holds. It is a bounded, purely-additive **plan-text single-writer block** amended into
BOTH tranche docs (BH `PLAN.md:68` + `EXECUTION-PROGRESS.md:303` on the BH side; the BG `bh-interleave-map.md:40` W-regen-swap
row on the BG side) that absorbs BG's `bg-build-map.md:1182-1208` G4 obligations VERBATIM and records the cross-tranche
ownership split (BG owns the gate `BG.W-GATE-FIELD-AURORA`; BH owns the bump `BH-B2.1-swap`) so neither falls through the
seam. No src touch, no feasibility spike, no restart — the amendments are the load-bearing convergence gap, and the gate
that backstops them is a REAL WS7 build (verified on disk), so the amendment locks against a real net, not a phantom.

---

## §0 On-disk ground truth (this pass — verified fresh, not re-derived from prose)

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after; only file written is this report).
HEAD `f7dd6146` (mid-flight past the seed's `e550f1b0` anchor; every G4 source doc reads identically — the fold landed).

### The LIVE defect (C1 core — the kf-peer bump is un-homed on the BH side)

| Claim | Verified on disk |
|---|---|
| Peer floor is the BROKEN `^5.0.0` | `package.json:1078` — `"@mkbabb/keyframes.js": "^5.0.0"` (peerDependencies block). |
| `useDragMorph` ships `snap:` (needs kf 5.1.0 `DragOptions.snap`) | `useDragMorph.ts:325` — `snap: targetsOf().map((t) => t.center)`; header `:20-25` NAMES "THE NATIVE SNAP (kf 5.1.0 `DragOptions.snap`)"; the re-roll was EXCISED (`ba23c086`, EXEC row `1.4`). |
| The devDep pin MASKS it at the cut env | `package.json:1116` — devDep `"@mkbabb/keyframes.js": "^5.1.0"` (the build resolves 5.1.0, so no local/CI run reproduces the `^5.0.0` consumer break). |
| `proof:peer-conformance` has NO first-snap clause | `scripts/proof-peer-conformance.mjs` — only the value.js straddle clauses (`:141-174`) + a `PINNED_LATEST` admits-latest snapshot (`:39-41`, kf `5.1.0`); no `useDragMorph`/`snap`/`first-snap`/floor-vs-API assertion. It runs GREEN over the broken floor. |
| No commit ever bumped the peer floor | `git log -S '@mkbabb/keyframes.js.*5.1.0'` finds only the BD devDep bump — the peer floor was never touched. |

### The C1 defect EVADES every BH-side net (the un-homed obligation)

| Where the obligation SHOULD be, on the BH side | What is actually there |
|---|---|
| `PLAN.md:68` (W-regen-swap / B2.1-swap wave row) | Describes ONLY: glob-swap + delete `src/subpaths/` (79) + regen `package.json` exports vs the landed surface + re-author `flatten-subpath-types.mjs` + Stage-B rewrite of `tests/public-surface.spec.ts`. **Gate:** `verify-export-types` GREEN · `proof:subpath-enumeration` re-pinned · `exactSubpathRuntimeSurfaces` arm. **NO kf-peer bump · NO L15 budget re-baseline · NO ci.yml emit · NO proof:binding-sweep.** |
| `EXECUTION-PROGRESS.md:303` (row `18.1`, the BH-side cursor) | Gate cell = ONLY `proof:subpath-enumeration (landed surface)`. Status PENDING. The kf-peer bump has NO unambiguous cursor home. |
| `EXECUTION-PROGRESS.md:319` (row `19.1`, `BG.W-CUT`) | Lists "kf 5.1.0 `DragOptions.snap`/`Oscillator`" as a mechanical CONSUME — but that is the API *consume*, NOT the PEER-FLOOR bump. The floor bump is absent from the cut row too. |
| `asks-and-consumes.md:30` | Claims "The B1c CONSUME interims (kf `DragOptions.snap`, …) are all met at the pinned keyframes 5.1.0 / value.js 1.2.0 — ZERO upstream asks." This is the exact CONTRADICTION: "met at the pinned 5.1.0" describes the DEV pin; the PEER FLOOR is `^5.0.0`, so the consume is NOT discharged for a `^5.0.0` consumer. (Also carries the stale `value.js 1.2.0` — reconciled by T2/C6, out of T4 scope.) |

### The C4 defect (L15 budget re-baseline is ALSO one-sidedly folded, same shape as C1)

| Claim | Verified on disk |
|---|---|
| BG homes the L15 net-budget re-baseline on B2.1-swap | `bg-build-map.md:1197-1204` — "L15 — the net-lift as ONE NAME-AGNOSTIC number across ALL chunks (incl. siri + refract)" + "ADD the un-walked-chunk assertion: every `dist/*.js` **NON-AUX** chunk ∈ `BUDGETS`". |
| The budget gate walks only 6 chunks; siri + refract ABSENT | `scripts/profile-bundle.mjs:210-229` — `BUDGETS` = {`glass-ui.js`, `styles/index.css`, `aurora.js`, `goo-blob.js`, `constellation.js`, `fourier-field.js`}. NO `dist/siri-island.js`, NO `dist/siri-waveform.js`, NO `glass-refract` chunk. |
| No un-walked-chunk assertion exists | `scripts/profile-bundle.mjs` — the `readdirSync` (`:6`, used `:406`) walks the dist tree for the critical-path arm, NOT a "every non-aux chunk ∈ BUDGETS" red. A genuinely-un-budgeted GL/viz chunk sails past. |
| BH's plan carries the export re-baseline but NOT the budget obligation | `PLAN.md:116` (§5-1 re-baseline residual) names "re-run `regen-exports-failclosed.mjs` … re-pin, re-emit ci.yml" — it carries the EXPORT re-pin + the ci.yml emit-mention, but NOT the `profile:budget` net-rebaseline. `PLAN.md:27` (W1-external-payload) re-baselines budget DOWNWARD (the payload-drop) — a DIFFERENT, earlier obligation, not the L15 net-LIFT across siri/refract. |

### The gate that backstops C1 is a REAL WS7 build (the amendment locks against a real net)

| Claim | Verified on disk |
|---|---|
| The floor-vs-API hardening is BG-owned, single-owner | `bg-build-map.md:716-719` — `BG.W-GATE-FIELD-AURORA` Files include "`scripts/proof-peer-conformance.mjs` (COHERENCE FOLD G4 — the SINGLE [owner] … kf floor ≥ first-`snap`-version 5.1.0 when `useDragMorph.ts` references `snap:`, born-RED on `^5.0.0`)". |
| It is a live PENDING WS7 wave (lands before the post-WS12 B2.1-swap) | `EXECUTION-PROGRESS.md:239` — row `12.5` `BG.W-GATE-FIELD-AURORA (G6 · amended)`, `BG/WS7`, `H`, PENDING. WS7 precedes WS12; B2.1-swap is `[WS12]` (after WS5∧WS6∧WS12). So the gate CAN backstop the bump. |
| No double-ownership (the clause is genuinely absent, not double-homed) | grep `first-snap`/`useDragMorph`/`5.1.0`-floor-clause over `scripts/proof-peer-conformance.mjs` → EMPTY. The clause lives ONLY in the (unlanded) `BG.W-GATE-FIELD-AURORA` spec. |

### proof:binding-sweep is UNBUILT (BG mints it; BH must reference it at B2.1-swap)

| Claim | Verified on disk |
|---|---|
| `proof:binding-sweep` does not exist yet | `scripts/proof-binding-sweep.mjs` — No such file. Not in `package.json` scripts, not in `gates.mjs`. |
| BG mints it + wires it into 3 waves incl. B2.1-swap | `bg-build-map.md:1286-1296` — "MINT `proof:binding-sweep` `[local]`" wired into `BH-B2.1-swap` (the kf-peer bump wave, exemplar `useDragMorph` `snap:`), `WS4 BG.W-DESHADCN-SWEEP`, `BG.W-CUT`. "Recorded composition (no double-assign): `proof:binding-sweep` (G7 mints the locking gate) ↔ G4's kf-peer bump owner `BH-B2.1-swap` (G4 names the wave)." |

---

## §1 The coherence defect, stated precisely

BG's G4 fold (`bg-build-map.md:1182-1208`, `FINAL.md:553`+`:658`, `AMENDED-COHERENCE-PLAN.md §5.3`) treats
**`BH-B2.1-swap` as the FINAL pre-cut `package.json` + `ci.yml` single-writer** — the correct home, because:
- `B1-W2` (value-destraddle) is CLOSED on disk (`EXEC row 1.2`), so the peer-floor bump CANNOT re-home onto a run wave;
- `BG.W-CUT` fires the tag (irreversible), so the last-writable `package.json` edit before the tag is B2.1-swap;
- B2.1-swap ALREADY regenerates `package.json` exports + re-emits `ci.yml` against the landed post-WS12 surface, so
  the peer bump + budget re-pin + ci.yml emit ride the SAME single-writer pass with zero added edge risk.

BG did the routing correctly. The defect is **one-sided**: BG's docs point AT `BH-B2.1-swap`, but BH's own executable
plan does not know it owns these four obligations. This violates the seed's binding rule — *"BOTH sides of the interleave
must agree post-fold."* The fix is to make BH's B2.1-swap wave row + its EXEC cursor + BG's own interleave-map row all
carry the SAME four-obligation block, with the ownership split recorded so the gate (BG) and the bump (BH) can never land
apart (clause-without-bump reds-forever; bump-without-gate ships silently).

This is the **incomplete-pairing family** (§1-F1 of `pass-1-spec.md`) recurring ONE rung up from BG's intra-band L×S
near-misses (G2, G5) — a surface change (the `snap:` consume) landed without its dependent obligation (the floor bump)
propagating to the plan on the other side of the tranche seam.

---

## §2 The corrected approach — the single-writer B2.1-swap ABSORPTION block

**Principle.** B2.1-swap is the single-writer of the FINAL pre-cut `package.json` + `ci.yml`. It already writes them;
absorb BG's four G4 obligations into that same pass. Record the cross-tranche ownership split explicitly. Do NOT split
the bump into a new BH wave (that would re-introduce the exact multi-writer race G4 avoided by choosing the single-writer).

### §2.1 The four absorbed obligations (verbatim from BG's `bg-build-map.md:1182-1208`)

| # | Obligation | Owner | What B2.1-swap does |
|---|---|---|---|
| **O1** | kf peer bump `^5.0.0 → ^5.1.0` | **BH** (`BH-B2.1-swap`) | Bump `@mkbabb/keyframes.js` in `package.json` peerDependencies `^5.0.0 → ^5.1.0` (REQUIRED-BY the shipped `useDragMorph.ts:325` `snap:` use; the re-roll was excised at `ba23c086`). |
| **O2** | L15 net-budget re-baseline as ONE number across ALL chunks | **BH** (`BH-B2.1-swap`) | Re-baseline `profile:budget` (`scripts/profile-bundle.mjs`) so EVERY new dist GL/viz chunk BG added — the WS6 `siri-waveform`/`siri-island` GL chunk(s) + the WS8 `glass-refract` GL chunk + every WS5 viz chunk — is in `BUDGETS`, ceilings re-pinned as ONE net number AND `criticalPath.violations == []`. ADD the un-walked-chunk assertion (see §2.4). |
| **O3** | FINAL `ci.yml` emit byte-fresh | **BH** (`BH-B2.1-swap`) | Re-run `gates:emit-ci` at the swap so `.github/workflows/ci.yml` carries every re-tagged gate (incl. `proof:glass-idiom-factor` + `proof:category-card-warm` from `BG.W-CLOSEFIX-9SITE` R3/R4) re-confirmed byte-fresh against the FINAL gate set — so no mid-tranche tag-add rides a stale emit to the cut. |
| **O4** | `proof:binding-sweep` `[local]` runs at this bump wave | **BG mints** (`bg-build-map.md:1286`) · **BH references** at B2.1-swap | Run `proof:binding-sweep` `[local]` at the bump wave — a kf-version bump is the prime stale-binding vector (the `snap:` binding the exemplar). B2.1-swap does NOT mint it (BG mints); it names it in the wave's Gate set so the sweep fires where the bump lands. |
| **G** | floor-vs-API gate hardening (`proof:peer-conformance`) | **BG** (`BG.W-GATE-FIELD-AURORA`, WS7) | *Cross-referenced, NOT owned by BH.* The new assertion "kf floor ≥ first-`snap`-version 5.1.0 when `useDragMorph.ts` references `snap:`", born-RED on `^5.0.0`, lands on WS7 (before the WS12 swap), so it backstops the O1 bump. BH records the pointer so a resumed BH exec knows the gate exists and lands elsewhere. |

### §2.2 The ownership-split invariant (the load-bearing record)

The bump (O1, BH) and the gate (G, BG) are in DIFFERENT tranches. Record the coupling so neither strands the other:
- **If the gate lands but the bump does not** → `proof:peer-conformance` reds FOREVER (the floor-vs-API clause is
  born-RED on `^5.0.0` and nothing clears it) → the cut battery cannot pass. Loud, not silent — but blocks the cut.
- **If the bump lands but the gate does not** → the defect is silently fixed but the class is unguarded; a FUTURE
  `snap`-API bump could regress the floor with no red. The gate is the durable protector.
- **Sequencing guarantee (verified):** WS7 (gate) precedes WS12 (bump), so in the normal flow the gate is red on
  `^5.0.0` from WS7 until the WS12 swap flips it green — a walking born-RED→GREEN, exactly the discipline the fold
  intends. B2.1-swap's Gate line MUST assert `proof:peer-conformance` GREEN (proving the WS7-born-RED clause flipped),
  not merely re-run it.

### §2.3 The single-writer discipline (why NOT a new BH wave)

The seed and G4 both name B2.1-swap as the single-writer FINAL pre-cut `package.json` + `ci.yml`. Introducing a separate
"BH-kf-peer-bump" wave would create a SECOND writer of `package.json` between B2.1-swap and `BG.W-CUT` — reintroducing
the multi-writer race G4 exists to prevent. The bump rides the export-regen `package.json` write that B2.1-swap ALREADY
performs. ONE writer, ONE pass, all four obligations.

### §2.4 The un-walked-chunk assertion (O2 detail, verbatim from `bg-build-map.md:1200-1204`)

Add to `profile:budget`: every `dist/*.js` **NON-AUX** chunk (the `readdirSync` walk over `dist/`) must be ∈ `BUDGETS`,
with the AUX-EXCLUSION set NAMED so the walk reds on a genuinely-un-budgeted GL/viz chunk, NOT on every trivial subpath
mirror. The named AUX-EXCLUSION set:
- the trivial subpath mirror barrels (`src/subpaths/*.ts` → `dist/<name>.js`) — **note the WS12 interaction: B2.1-swap
  DELETES `src/subpaths/`, so the aux-exclusion must key off the post-swap dist shape, not the pre-swap `src/subpaths/`
  glob** (the exclusion is a dist-name allowlist derived from the regen policy maps `CURATED`/`COMPOSABLE_SUBPATHS`, not
  a `src/subpaths/` readdir that no longer exists after the swap);
- the root barrel `dist/glass-ui.js` / `dist/index.js`;
- the per-subpath re-export chunks.
So the walk reds ONLY on a real un-budgeted GL/viz chunk (siri/refract/viz). This is the un-walked-chunk class the
current 6-chunk `BUDGETS` (siri + refract absent) leaves open.

---

## §3 The EXACT amendments — both docs, verbatim

### §3.1 BH-side — `docs/tranches/BH/PLAN.md:68` (the W-regen-swap wave row)

**CURRENT (`PLAN.md:68`):**
> - **W-regen-swap (B2.1-swap) [WS12].** Glob-swap + delete `src/subpaths/` (79 files) + regen `package.json` exports
>   against the **landed post-WS12 surface** (captures WS6's +2 siri subpaths + WS5's viz deletes/renames — re-derived
>   via the generator, NOT the 4.2.0 snapshot) + re-author `flatten-subpath-types.mjs` for the new colocated dts emit +
>   Stage-B rewrite of `tests/public-surface.spec.ts`. **Gate:** `verify-export-types` post-build GREEN;
>   `proof:subpath-enumeration` re-pinned; the spec's `exactSubpathRuntimeSurfaces` arm GREEN (the no-silent-vanish proof).

**AMENDED (append the G4-absorption sentence + widen the Gate line):**
> - **W-regen-swap (B2.1-swap) [WS12].** Glob-swap + delete `src/subpaths/` (79 files) + regen `package.json` exports
>   against the **landed post-WS12 surface** (captures WS6's siri subpath additions + WS5's viz deletes/renames —
>   re-derived via the generator, NOT the 4.2.0 snapshot) + re-author `flatten-subpath-types.mjs` for the new colocated
>   dts emit + Stage-B rewrite of `tests/public-surface.spec.ts`. **B2.1-swap is the FINAL pre-cut `package.json` + `ci.yml`
>   single-writer (after WS5∧WS6∧WS12, before `BG.W-CUT`), so it ABSORBS BG's four G4 obligations (COHERENCE FOLD, BG
>   `bg-build-map.md:1182-1208`) into the SAME single-writer pass:** (O1) bump the kf peer `@mkbabb/keyframes.js`
>   `^5.0.0 → ^5.1.0` in `package.json` peerDependencies — REQUIRED-BY the shipped `useDragMorph.ts:325` `snap:` use
>   (the LIVE broken-gesture defect: a `^5.0.0` consumer NEVER snaps to a detent; the re-roll was excised at `ba23c086`);
>   (O2) re-baseline `profile:budget` so EVERY BG-added dist GL/viz chunk (WS6 siri, WS8 `glass-refract`, every WS5 viz)
>   is in `BUDGETS` with ceilings re-pinned as ONE net number AND `criticalPath.violations == []`, ADDING the
>   un-walked-chunk assertion (every `dist/*.js` NON-AUX chunk ∈ `BUDGETS`; the AUX-EXCLUSION is the named dist-name
>   allowlist from the regen policy maps, NOT a deleted-`src/subpaths/` glob); (O3) re-run `gates:emit-ci` so
>   `.github/workflows/ci.yml` is byte-fresh against the FINAL gate set; (O4) run `proof:binding-sweep` `[local]` (BG
>   mints it, `bg-build-map.md:1286`; a version bump is the prime stale-binding vector, `snap:` the exemplar). **The
>   floor-vs-API gate is BG-owned, NOT BH's:** the `proof:peer-conformance` "kf floor ≥ first-`snap`-version 5.1.0 when
>   `useDragMorph.ts` references `snap:`" clause (born-RED on `^5.0.0`) lands on `BG.W-GATE-FIELD-AURORA` (WS7, before
>   this WS12 swap) — so it backstops the O1 bump; if the clause and the bump do not BOTH land, the gate reds-forever
>   (clause without bump) OR the defect ships silently (bump without gate). **Gate:** `verify-export-types` post-build
>   GREEN; `proof:subpath-enumeration` re-pinned; the `exactSubpathRuntimeSurfaces` arm GREEN; **`proof:peer-conformance`
>   GREEN (proving the WS7-born-RED floor-vs-API clause flipped on the `^5.1.0` bump, NOT merely re-run);
>   `profile:budget` GREEN incl. the un-walked-chunk assertion (siri + refract now ∈ `BUDGETS`); `proof:binding-sweep`
>   `[local]` GREEN; `ci.yml` byte-fresh (`gates:emit-ci` diff empty).**

### §3.2 BH-side — `docs/tranches/BG/execution/EXECUTION-PROGRESS.md:303` (row `18.1`, the BH-side cursor)

> NOTE: `EXECUTION-PROGRESS.md` is BH's authoritative cursor even though it lives under `docs/tranches/BG/execution/`
> (BH shares BG's branch + execution tracking — see `EXECUTION-PROGRESS.md:42`'s BH row block). This is the row a
> resumed BH execution reads to know what to build; it MUST carry the bump, or the bump has no cursor home (the §3-gap-1
> load-bearing convergence gap).

**CURRENT (row `18.1`):**
> | 18.1 | BH.B2.1-swap W-regen-swap (delete src/subpaths/) | BH/B2 | WS12 | PENDING | proof:subpath-enumeration (landed surface) | — |

**AMENDED (widen the wave-name to signal the absorption + widen the Gate cell to the four obligations + the cross-ref):**
> | 18.1 | BH.B2.1-swap W-regen-swap (delete src/subpaths/ · **FINAL pre-cut package.json + ci.yml single-writer — absorbs G4: kf-peer bump ^5.0.0→^5.1.0 · L15 net-budget re-pin incl. siri+refract · ci.yml byte-fresh emit · proof:binding-sweep**) | BH/B2 | WS12 | PENDING | proof:subpath-enumeration (landed surface) · **proof:peer-conformance GREEN (the floor-vs-API clause — BG-owned on `BG.W-GATE-FIELD-AURORA` row 12.5 WS7 — flips born-RED→GREEN on the ^5.1.0 bump) · profile:budget GREEN + un-walked-chunk assertion (siri+refract ∈ BUDGETS) · proof:binding-sweep `[local]` (BG-minted, exemplar `useDragMorph` snap:) · ci.yml byte-fresh (gates:emit-ci diff empty)** | — |

### §3.3 BH-side — `docs/tranches/BH/coordination/asks-and-consumes.md:30` (the stale-discharge contradiction)

**CURRENT (`:30`):**
> - **The B1c CONSUME interims** (kf `DragOptions.snap`, value.js `oklchSpectrum`, the viz `Oscillator`) are all met at
>   the pinned keyframes 5.1.0 / value.js 1.2.0 — ZERO upstream asks.

**AMENDED (correct the false-discharge; the kf snap consume is NOT met at the `^5.0.0` PEER floor):**
> - **The B1c CONSUME interims** (kf `DragOptions.snap`, value.js `oklchSpectrum`, the viz `Oscillator`) carry ZERO
>   upstream asks (the APIs ship in the installed engines). **BUT the kf `DragOptions.snap` consume is NOT yet
>   discharged for a `^5.0.0` consumer: the peer FLOOR is `^5.0.0` (`package.json:1078`) while `snap:` first ships kf
>   5.1.0 — the LIVE broken-gesture defect. The floor bump `^5.0.0 → ^5.1.0` rides `BH-B2.1-swap` (the FINAL pre-cut
>   single-writer, COHERENCE FOLD G4-O1); the floor-vs-API gate rides `BG.W-GATE-FIELD-AURORA` (WS7). Only AFTER the
>   B2.1-swap bump is the consume discharged at the FLOOR, not merely the dev pin.** (The stale `value.js 1.2.0` literal
>   is reconciled to the CUT floor `^1.1.1` by C6/T2 — out of this row's scope.)

### §3.4 BG-side — `docs/tranches/BG/execution/bh-interleave-map.md:40` (the W-regen-swap row — the OTHER side of the seam)

> The interleave-map is BG's projection of the BH plan; the seed's rule ("BOTH sides must agree post-fold") requires this
> row to carry the SAME absorption. It currently carries only the re-baseline checkpoint note.

**CURRENT (`:40`):**
> | W-regen-swap (B2.1-swap) | **[WS12]** | WS12 | glob-swap + **delete `src/subpaths/` (79)** · regen `package.json`
>   exports vs the **landed** surface · re-author `flatten-subpath-types.mjs` · rewrite `tests/public-surface.spec.ts` |
>   re-baseline checkpoint (captures WS6 +2 siri, WS5 viz deletes/renames). |

**AMENDED (add the G4-absorption to the work cell + the ownership cross-ref to the notes cell):**
> | W-regen-swap (B2.1-swap) | **[WS12]** | WS12 | glob-swap + **delete `src/subpaths/` (79)** · regen `package.json`
>   exports vs the **landed** surface · re-author `flatten-subpath-types.mjs` · rewrite `tests/public-surface.spec.ts`
>   **· ABSORBS G4 (FINAL pre-cut single-writer): kf-peer `^5.0.0→^5.1.0` (O1) · `profile:budget` net-rebaseline incl.
>   siri+refract + un-walked-chunk assertion (O2) · `gates:emit-ci` byte-fresh (O3) · `proof:binding-sweep` `[local]`
>   (O4, BG-minted)** | re-baseline checkpoint (captures WS6 siri, WS5 viz deletes/renames). **G4 ownership split: BH
>   owns the bump (this wave); BG owns the floor-vs-API gate (`BG.W-GATE-FIELD-AURORA`, WS7 — born-RED on `^5.0.0`,
>   flips GREEN on this bump). See `bg-build-map.md:1182-1208`.** |

---

## §4 The verifying check (does the fix hold?)

The amendments are plan-text (no src touch), so "feasibility" = *do the four obligations have a real, unambiguous,
single-writer home on the BH side that agrees with the BG side, backstopped by a real gate?* Verification, per obligation:

| Obligation | Verifying check | Result |
|---|---|---|
| **O1 (kf bump)** | After the amendment, does a resumed BH exec reading ONLY `PLAN.md:68` + `EXEC row 18.1` know to bump `^5.0.0→^5.1.0`? | YES — both now name it verbatim. Post-bump, `package.json:1078` reads `^5.1.0`; a `^5.0.0` consumer no longer resolves. |
| **G (gate backstop)** | Does the floor-vs-API clause land on a REAL wave BEFORE the bump wave, so it can flip born-RED→GREEN? | YES — `BG.W-GATE-FIELD-AURORA` is EXEC row `12.5` (WS7, PENDING, real build); WS7 < WS12; the clause is genuinely absent from `proof-peer-conformance.mjs` at HEAD (no double-home). |
| **O2 (budget)** | Does `profile:budget` (`profile-bundle.mjs`) gain the siri + refract chunks + the un-walked-chunk assertion at this wave? | The amendment names it; the current 6-chunk `BUDGETS` (siri/refract absent) is the born-RED baseline the re-pin flips. The aux-exclusion keys off the POST-swap dist-name allowlist (not the deleted `src/subpaths/`) — the WS12 interaction is handled. |
| **O3 (ci.yml)** | Does B2.1-swap re-run `gates:emit-ci` so no mid-tranche tag-add rides a stale emit? | YES — B2.1-swap already re-emits `ci.yml` for the export regen; O3 rides the same emit, asserted byte-fresh (diff empty). |
| **O4 (binding-sweep)** | Is `proof:binding-sweep` referenced at the bump wave (where BG wired it), even though BG mints it? | YES — the Gate line names it `[local]`; the ownership record ("BG mints, BH references") prevents a double-mint. |
| **Cross-tranche agreement** | Do BOTH sides (BH `PLAN.md`/`EXEC` + BG `bh-interleave-map.md`) now carry the SAME absorption? | YES — §3.1/§3.2/§3.4 amend all three, with the ownership split recorded on both sides. The seed's "BOTH sides must agree" rule is satisfied. |

**Feasibility verdict: the fix HOLDS.** The single-writer B2.1-swap already writes `package.json` + `ci.yml`; the four
obligations ride that pass with zero added multi-writer race. The gate that catches O1 is a real WS7 build sequenced
before the WS12 bump. The un-walked-chunk assertion's only subtlety (the deleted `src/subpaths/` aux-key) is handled by
keying the exclusion off the post-swap dist-name allowlist. No feasibility spike, no restart — the entire fix is bounded
plan-text amended into three doc sites.

---

## §5 Fences honored / negative findings (record so PASS 2 skips)

- **NO new BH wave minted** — the bump rides the EXISTING single-writer B2.1-swap (§2.3). A separate bump-wave would
  reintroduce the multi-writer `package.json` race G4 exists to prevent. Rejected by design.
- **NO src touch** — this is a PASS-1 spec; the write-fence holds (only this report written; siblings-intact exit 0
  before + after). The actual `package.json`/`profile-bundle.mjs`/`ci.yml`/plan edits are the FOLD's act, not this pass's.
- **NO double-ownership of the gate** — the floor-vs-API clause is BG-owned (`BG.W-GATE-FIELD-AURORA`) and genuinely
  absent from `proof-peer-conformance.mjs` at HEAD. BH references it, never re-mints it (would red `proof:gate-script-parity`).
- **NO double-mint of `proof:binding-sweep`** — BG mints it (`bg-build-map.md:1286`); BH references it at the wired wave.
  The ownership record ("BG mints, BH references") is the anti-double-mint fence.
- **The stale `value.js 1.2.0` in `asks-and-consumes.md:30`** is corrected to the CUT floor `^1.1.1` by C6/T2 (the
  value-floor axis) — this T4 spec touches that literal only to remove the FALSE kf-discharge claim, not to re-litigate
  the value floor (out of scope; cross-referenced, not owned).
- **The "+2 siri subpaths" literal (C6 / §6-C6 of `pass-1-spec.md`)** is a SEPARATE drift: the amended BG froze
  `siri-waveform` = INTERNAL, so the real delta is +1 published subpath (`/siri-island`). This T4 amendment softens the
  literal to "WS6's siri subpath additions" (§3.1/§3.4) to avoid re-encoding the stale count, but the precise
  PUBLISH-vs-INTERNAL re-baseline is the C6/re-baseline residual, owned by the post-WS12 human classification step
  (`PLAN.md:116`), not this pass.
- **O3 does NOT duplicate `BG.W-CLOSEFIX-9SITE`'s R3/R4 ci.yml emit** — those emit `proof:glass-idiom-factor` +
  `proof:category-card-warm` EARLIER (WS7 band 0.5); O3 re-CONFIRMS byte-freshness against the FINAL gate set at the
  swap, so a mid-tranche tag-add cannot ride a stale emit to the cut. Complementary, not a clobber (`bg-build-map.md:1205-1208`).
- **The `criticalPath.violations == []` clause (part of O2)** is already an arm of `profile:budget` (`profile-bundle.mjs`
  BB.W-PAYLOAD-DEFER, `:250+`); O2 asserts it stays GREEN through the re-pin, it does not add a new critical-path arm.

siblings-intact exit 0 (after). Only file written: this report.
