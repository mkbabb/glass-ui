# LANE γ — UNIT 2 · γ1 #49 GF-AURORA, **W0 W-AURORA-HARNESS built**

**Seat** IMPLEMENT · **modelId asserted** `claude-opus-5[1m]` (asserted before the first
byte; the assertion gates this chain) · **date** 2026-08-10 · **base** `2cfc1124`
*fix(styles): un-shrapnel the shipped material.css* · **lane text** the ratified LANE γ
(SUBSTRATE GREENFIELDS, Φ5), read from the workflow journal at seat open.

**Scope, exactly**: γ1 — #49's W0 wave, `W-AURORA-HARNESS`
(`GREENFIELD-TERMINAL.md:402-412`), opened by unit-1's intake. **No GLSL was deleted**
(the π-ARCHIVE receipt is still OWED and it fences that cut). **γ2 #50, γ3 flood-ceiling
and γ4 #51 were not opened.** No browser was launched; no capture is asserted anywhere.

**SHARED TREE** — this seat ran no `git add`, `commit`, `stash`, or `checkout`. The
driver commits.

---

## §0 · Step-0 baseline (banked BEFORE any byte)

```
BASELINE_FILE=/tmp/bk-lanegamma-baseline-1786382863.diff   (git diff -U0, 405 lines)
porcelain count: 4
```

| path | state | owner |
|---|---|---|
| `MIGRATION.md` | M | **Lane β** — untouched |
| `src/composables/dark/darkModeSyncScript.ts` | M | **Lane β** — untouched |
| `tests/composables/dark/darkModeSyncScript.test.ts` | M | **Lane β** — untouched |
| `docs/tranches/BK/execution/2026-08-10-lanebeta-unit1/` | `??` | **Lane β** — untouched |

Untracked enumerated at step 0 — exactly the three files under Lane β's unit-1 record
directory. The formerly-fenced pair (`src/styles/glass/material.css` ·
`tests/styles/material-css-syntax.test.ts`) had already landed at `2cfc1124` and is
absent from porcelain, as the brief states.

**The tree moved hard under this seat.** Porcelain went **4 → 40** during the run. Lane
β's dirt was committed or reverted out from under the baseline, and lane **#53
GF-FOURIER went mid-restructure** (`src/components/fourier-field/**` — 8 deletions, 5
modifications, a new untracked `renderer/` tree, a test rename). §4 measures around it
rather than through it.

---

## §1 · WHAT THIS UNIT BUILT — W0, the probe surface

Seven acts. Each is one of `GREENFIELD-TERMINAL.md:406-412`'s W0 deliverables or one of
row #49's own named riders (`TERMINAL-ROSTER.md:199`).

### A1 · The SETTLE BEACON — `data-aurora-settled`

`useAurora.ts` gains `isSettled`; `Aurora.vue:206` publishes it as
`:data-aurora-settled="api.isSettled.value ? '' : undefined"` on `.aurora-root`.

The predicate: armed ∧ the current config applied ∧ `AURORA_SETTLE_MS` (500) elapsed
since that application, **advanced on `requestAnimationFrame`, never `setTimeout`** — so
a backgrounded or parked surface cannot stamp a beacon it has not painted. Any config
change re-opens it (a preset switch has its own entrance). One rAF chain, re-aimed by a
new deadline, so a slider drag re-opens the beacon without stacking a chain per frame.

**500 ms is derived, not chosen.** The entrance is the ground→field **crossfade**:
`.aurora-canvas-layer` transitions opacity 0→1 over `--duration-slow`, and
`src/styles/tokens/scheme-motion.css:102` reads `--duration-slow: 0.45s`. 500 clears 450
with the margin for the frame the config write lands on. The harness asserts both halves
so the constant cannot drift away from its token.

**Two deviations from the terminal's letter, stated:**

1. The terminal says probe mode stamps the beacon. **This stamps it unconditionally.** A
   beacon that exists only under `?probe=1` cannot be waited on by a consumer's capture,
   and the π protocol makes beacon-less captures inadmissible *in this lane from W0 on* —
   which would silently exempt every consumer. It is one data attribute; gating it buys
   nothing and costs the instrument its reach.
2. The terminal says "on the stage". **This stamps `.aurora-root`** — the surface itself,
   library-owned. On the demo stage only the studio route could be captured admissibly.

**The beacon must not lie**, and that is asserted: on the `"css"` substrate (which never
arms) the attribute stays ABSENT. There is no live field there to certify, and stamping
a static ground as a settled field is exactly the false witness the beacon exists to
prevent. (`harness.test.ts` — *"never stamps on a surface that has not armed"*.)

### A2 · The ENTRANCE-WINDOW MECHANISM — ⊕⁵'s default **CONFIRMED on disk, not merely taken**

`TERMINAL-ROSTER.md:199` ⊕⁵ ruled the mechanism question (`GREENFIELD:537`, the deferred
class) to a default of **CROSSFADE-FROM-FRAME-0 GROUND**, owner-reversible in one word
**at W0 bring-up**. This is W0 bring-up, and the disk settles it rather than inheriting
the default:

- The crossfade EXISTS and is the entrance: `Aurora.vue` `.aurora-canvas-layer` holds
  `opacity: 0` with `transition: opacity var(--duration-slow) var(--ease-standard)`, and
  `.aurora-canvas-layer--armed` (bound to `api.isArmed`) lifts it to 1 over the
  palette-derived `auroraFallbackGround` frame-0 ground.
- The rival mechanism is **REFUTED**: deferred-uniform-apply cannot be the cause, because
  `wgpuSetup.ts:219` re-packs and `writeBuffer`s the WHOLE uniform block **inside the
  per-frame `frame()`**. A config reaches the shader on the next frame; nothing is
  deferred.

So the ⊕⁵ default is not a coin-flip resolved by silence — it is the only mechanism the
tree implements. The reversal window closes on evidence, not on a clock.

### A3 · The `:dimmed` MEDIUM COUPLING — **STRUCK** (D7, a design act)

`AuroraStage.vue:76`'s `:dimmed="config.medium === 'smooth'"` is gone and
`NucleiOverlay`'s `dimmed` prop is **deleted, not defaulted** — the rings carry one
opacity (`opacity-70`). Repo-wide `dimmed` now survives under `demo/` only as this
file's own comment recording the strike (one unrelated `tests-visual/dockmorph-cta.spec.ts`
hit is a different component's word).

The ground, restated so it is not re-litigated: an overlay whose opacity stepped 35→70
with `medium === "smooth"` meant **the measured surface moved with the variable under
test** — three seats banked tables over it. And there was never an affordance ground: the
rings label the composition, and the composition does not move when the deposition body
does.

### A4 · `?probe=1` — the probe surface

`aurora.vue` reads it, `AuroraStage` consumes it, and it clears **every chrome layer
painted OVER the stage**: `NucleiOverlay`, `RendererStatusView`, and the "move to shape
the field" pointer cue (`pointerAffordanceEnabled` now carries `!props.probe`). The
canvas, its config and its engine are untouched — the probe removes OBSERVERS, never the
subject, because a probe that changes the picture cannot certify the picture.

**The controls column stays mounted, deliberately.** `G-HARNESS-DRIVES` clause (a) reads
the medium combobox *under* `probe=1` (`GREENFIELD-TERMINAL.md:484`), so "studio chrome"
here is read as the chrome over the stage, not the aside beside it. The gate's own
whole-page instrument is a different thing and stays where D6 put it: probe-side injected
`main, header, nav { visibility: hidden }` at capture time (`:496`), not app code.

### A5 · The ATOMS-DOOR FORCED MEDIUM — cured by **ORDER**, not by a watcher

`aurora.vue` now reads `?aurmedium=`/`?probe=`/`?engine=` **during `setup`**, and writes
`studio.config.medium` there. The defect was never a lost write (D1: the param reaches
the shader). It was pure ordering: `AuroraConfigDock` seeds
`reactive(configToAtoms(props.config))` in its own `setup`, which runs **before** the
parent's `onMounted`, so a medium written at mount landed in the shader and never in the
door — the control read "Smooth" over a live crayon field.

The terminal offers two cures — apply on the atoms object, **or** trigger the reseed
after the config write. Neither is taken: **moving the read one lifecycle phase earlier
deletes the race instead of servicing it.** Combobox, config and shader agree by
construction; no reseed watcher, no second source of truth, and the `?aurmedium=` param
keeps exactly the semantics it had. The harness pins the ordering (`studio.config.medium =`
must precede `onMounted(`) so a future edit cannot quietly move it back.

The "forced deposition is structurally non-zero" half of `:407` belongs to
`W-AURORA-CONFIG`'s `DEP_MIN` bridge clamp (`:434`) and is **NOT** taken here — that clamp
is the wave that promotes the atoms shape to be the config. Named, not silently skipped.

### A6 · `?engine=webgl2` — the REAL in-app arm

New runtime option `forceBackend?: "webgl2"`. It works by **withholding `setupWGPU`** from
`createGpuSubstrate`, because the picker's own test is
`attemptWebGPU = supportsWebGPU() && options.setupWGPU != null`
(`useGpuSubstrate.ts:187`) — absence *is* the forcing, and nothing downstream needs a
second switch. This is the only honest route: a browser flag does not reach it, and
`renderMode: "webgl"` is a MODE (animate at all / never), not a backend.

There is deliberately **no `"webgpu"` member**: forcing WebGPU on a host with no adapter
would be a masking fallback, and the picker already prefers it and falls loud.

**On the "honest engine witness" clause (`:411`, `:484c`)** — the in-app witness already
exists and is already honest: `rendererStatus` carries `{ phase, engine, adapter }` and
`RendererStatusView` renders it, so a forced arm reads `webgl2` + the real adapter
string. The `engine=CHROME` complaint the terminal raises is against the **capture
manifest's** label, not the app's. Repo-wide grep for a `CHROME` engine label under
`scripts/` and `tests-visual/` returns **zero** at HEAD. Recorded as **already-satisfied
in-app**; nothing was minted to satisfy a clause the tree had already discharged.

### A7 · The DRIFT DEMAND GATE — one predicate, and a **refusal** on its threshold

`isAuroraDriftLive(config)` + `AURORA_DRIFT_FLOOR` land in `constants/presets.ts` (beside
the type they read — no cycle, since `runtime.ts → glSetup.ts → frameLoop.ts` would make
`runtime.ts` the wrong home). All three loops consume it:
`frameLoop.ts` · `wgpuSetup.ts` (palette pipeline) · `wgpuSetup.ts` (image pipeline).

**The bug the fold cured, which was not in the intake.** The ladder was **triplicated and
had already diverged**: the image pipeline's copy tested `nucleiDrift`/`warpDrift`/
`paletteDrift` and **omitted `breathDepth`**. A `source: "image"` aurora carrying breath
and no drift therefore parked its loop and **never rendered its breath**. That is a live
defect, cured structurally by having one answer instead of three.

**REFUSE-WITH-GROUNDS on the threshold — the lane text's cut is not derivable here.**

Row #49 names the target as *"the demand gate amplitude-aware, not zero-aware
(`frameLoop.ts:176-184` vs drift 0.012×3 — the largest steady-state cost)"*. The
`0.012×3` is `demo/chassis/hero/aurora-hero.ts:252-253` / `:295-296` / `:335-336` — the
hero + shell fields. **No config-space constant separates them from the focal studio
field.** Re-derived this seat over every authored config:

| axis | authored domain | shell / hero | studio default | separation |
|---|---|---|---|---|
| `nucleiDrift` | 0..0.05 | **0.012** (24% FS) | 0.015 (30% FS) | 1.25× |
| `paletteDrift` | 0..0.04 | **0.012** (30% FS) | 0.015 (38% FS) | 1.25× |
| `breathDepth` | 0..0.15 | 0.05 (33% FS) | 0.05 (33% FS) | **identical** |
| `warpDrift` | 0..0.015 | 0.008 (53% FS) | 0.008 (53% FS) | **identical** |

Two of four axes are byte-identical and the other two are 25% apart. Any floor that parks
the shell parks the studio's focal aurora with it. What actually separates them is not
drift amplitude but **the composited range each palette can express** — shell chroma
≤ 0.07 over an L span of 0.03 against the studio's C 0.16/0.13/0.095 — and that term is
`W-AURORA-FIELD` §6's to derive (it re-founds C at 0.85× the per-hue gamut ceiling) and
π-FIELD's to ratify in paint. **This seat holds no capture** and will not cut a paint
threshold blind.

So what lands is the **SHAPE**: per-axis floors against per-axis domains (a single flat
epsilon is provably wrong — any epsilon reaching `paletteDrift` exceeds `warpDrift`'s
entire range), seeded at 1% of each domain, which is below every shipped value and
therefore **paint-identical today**. The floors are stated in the source as the shape and
not the cut, and their ratification is routed to π-FIELD — the same discipline
`GREENFIELD-TERMINAL.md:491` applies to τ (*"the load-bearing fixes are the instruments,
not the constants"*).

**Not papered**: the fold is a real bug fix with a named victim, the shape is real and
per-axis, and the number this unit declines to invent is named with the wave that owns it.

There is a second on-disk contradiction this exposes, banked for §6: `aurora-hero.ts:274`
claims the shell field *"reads effectively static (WCAG 2.2.2 by being non-animated — no
pause control owed)"* while the gate holds its rAF loop open forever. Today that
conformance claim rests on the field being invisible, not on it being still. **The cure
belongs to §6, which makes the field visible** — at which point the claim must either be
struck or earned by an actual park.

### A8 · INTERACTIVITY DEFAULT **ON**, PRM-guarded (RATIFICATION §4 E6)

`RATIFICATION.md:94`: *"**Default ON** (PRM-guarded) — 'ALL auroras should have proper
interactability'; a capability behind an opt-out flag has not landed the directive.
Opt-out stays."*

`isAuroraPointerEnabled` now reads `config.interactivity?.swirl !== false`. Clean break,
no alias, no shim.

**The medium-awareness is preserved, and moves to where it belongs — under the opt-out.**
`light` steers the impasto direction and the smooth body has no impasto, so `light` alone
over `smooth` must not arm a pointer path. The full contract, all four cells asserted:

| config | result |
|---|---|
| no `interactivity` at all / `{}` | **true** — the default lands |
| `{ swirl: false }` | **false** — the opt-out stays |
| `{ swirl: false, light: true }` on `smooth` | **false** — nothing to relight |
| `{ swirl: false, light: true }` on `oil` | **true** — light reaches real paint |

**PRM guard verified on disk, not assumed**: suppression is not this predicate's job.
`usePointerVelocityField` honors `prefers-reduced-motion: reduce` as a `tick(0)` freeze
(`:30`, `:96`), the master tempo scalar zeroes the field tick (`frameLoop.ts:142-144`),
and `AuroraStage` independently gates its affordance on `!reducedMotion.value`. A PRM
reader never sees the cursor regardless of what the predicate returns.

**Blast radius, bounded and stated**: the flip only reaches mounts that already wire
`useCursorInteraction`. Repo-wide that is exactly one — `AuroraStage.vue:66`. The shell
and hero fields call no cursor API, so nothing new starts responding behind a route.
`interaction-prm.test.ts` was updated to the new contract (a clean break's consumer, in
the same commit).

---

## §2 · U-19 — the two parts that were due **AT THE HARNESS CUT**

Unit-1 §6.3 carried parts 2 and 3 forward as *"named-or-RETIRED at the harness cut — that
cut is the next γ1 act, and both parts must be answered in it, not deferred past it."*
This is that cut. Both are answered **NAMED**, and neither answer is a deferral.

### U-19 part 2 — the WGSL stroke cascade (BD T17) · **NAMED**

`aurora-mediums.wgsl.ts:28-35` states in-tree that *"the ~38KB GLSL stroke engine stays
the WebGL2 `aurora.frag.ts` full-fidelity register … the full per-dab Starry-Night stroke
cascade remains a separate full-fidelity port"*.

**It cannot be retired at this cut, and the reason is structural, not timid.** The
cascade's fidelity delta against the WGSL primary is *precisely the quantity π-ARCHIVE
exists to measure* (`:412` — *"banked as authoring reference for `dab`/`stick` before
deletion — the on-disk comment claims the WebGL2 arm carries the richer bodies and nobody
has measured them"*). Retiring it now would destroy the measurement that justifies
retiring it. **NAMED**: it stands as the GL arm's full-fidelity register until the
π-ARCHIVE receipt lands, and the receipt is what makes its disposition an evidenced act
rather than a guess. The parity claim rides `W-AURORA-BODIES`' own π cells.

### U-19 part 3 — the `warpMode == 3` curl branch · **NAMED** (CURE-1 binding, honored)

**CURE-1's corrected fact re-derived at this seat, from the disk:**

| site | verbatim |
|---|---|
| `aurora.wgsl.ts:191-193` | `} else if (warpMode == 3) { let fp = p * warpScale + vec2<f32>(t * warpDrift * K_WARP); warp = curlFBM(fp); }` |
| `aurora.frag.ts:286-292` | `} else if (uWarpMode == 3) { … vec2 fp = p * uWarpScale + vec2(t * uWarpDrift * K_WARP); warp = curlFBM(fp); }` |

`curlFBM` is DEFINED once in the shared chunk (`composables/glass/webgl/shaders/flow.wgsl.ts`
· `flow.glsl.ts`) and **CALLED at exactly those two aurora sites** — one per engine, the
WGSL one being the **primary**. `brush.glsl.ts:346` is `uFlowCurl`
(`float localCurl = … * uFlowCurl * curlScale`) — a different uniform on a different axis,
and that cite stays withdrawn.

**NAMED, and the naming is load-bearing**: the branch is opt-in and never auto-selected
(`presets.ts:130-134` — `warpModeFor` stays fbm→hybrid→cellular), but it is **NOT
GL-arm-only**. Deleting the GL arm leaves it **live in the shipped WGSL engine**.
Retiring it is therefore a **separate, explicit act against a live WGSL feature and never
a rider of any GL-arm deletion** — this unit performs no such act, and no GLSL was
deleted here in any case.

### The other three parts — no movement

Part 1 (satin/prism `uMedium 8/9`) stays **ARM** — the greenfield re-derives the medium
roster and the D87 contradiction dies with the old table. Part 4 is **ASK g7**,
jury-logged NOT-BUILT at unit-1 with its reversal window OPEN — **not re-opened, not
re-logged**. Part 5 stays **RETIRED** under U-37's device-parity ruling.

---

## §3 · JURY LOG · π · GATES — what did NOT move

- **g7** — logged at unit-1 as **NOT-BUILT**, window OPEN. **Untouched.** This unit
  re-states it only to record that it did not re-adjudicate it.
- **g3** (aurora DUSK/DAWN, default harden-not-delete) — fires at **π-GALLERY**, after the
  medium-collapse renderer fix. **NOT logged here.** Both presets remain on disk.
- **g1 / g12** — other waves' rows (γ2 / γ4). Not opened.
- **π-ARCHIVE** — **still ENQUEUED, RECEIPT OWED.** No browser was opened, no capture is
  asserted, no GLSL was deleted. The order stands exactly as unit-1 §3.2 banked it; this
  unit adds the two axes the harness now makes capturable, in PASTE-BLOCKS.
- **GATES: ZERO MINTED.** The **unit-executable half** of `G-HARNESS-DRIVES` is built as
  **ordinary unit cases**, not a seat — `GATE-SEMANTIC-ROSTER-C20.json`
  `ordinaryTestLaw.ordinaryTestsConsumeBudget: false`, and the house law is *gates exactly
  60, mint nothing*. That half is what a unit test can witness: the probe surface, the
  ordering, the demand predicate, and the beacon's own arm/re-open/never-lie behaviour.
  Clauses **(a)**, **(c)** and **(d)** — the combobox read *under `?probe=1`*, the honest
  engine witness on a live page, and the whole-page capture instrument — are **PAINT
  clauses and remain OWED with the π seat**; nothing here discharges them. The register
  receipt is **byte-identical** pre and post (§4).

---

## §4 · VERIFY — real exit codes, never a piped tail's

### 4.1 · BORN-RED, then GREEN

`tests/components/custom/aurora/harness.test.ts` (NEW, 13 cases) was written and run
**against the pre-cure bytes first**:

```
RED2_EXIT=1
 Test Files  1 failed (1)
      Tests  11 failed | 2 passed (13)
```

The two that passed at HEAD are not misses: `{swirl:false}` was already false, and the
never-lie beacon absence is a regression guard that must be green on both sides. After the
cures:

```
GREEN2_EXIT=0
 Test Files  1 passed (1)
      Tests  13 passed (13)
```

Whole aurora suite, on a HEAD tree carrying only this unit's bytes:

```
AURORA_SUITE_EXIT=0
 Test Files  14 passed (14)
      Tests  106 passed (106)
```

Both suites this unit reaches — `tests/components/custom/aurora` + all of `tests/demo`
(the probe surface's consumers) — on the real working tree, taken last:

```
SUITES_EXIT=0
 Test Files  29 passed (29)
      Tests  172 passed (172)
```

### 4.2 · TYPECHECK — the foreign lane makes the real tree unmeasurable, so it was measured against a control

`npm run typecheck` on the working tree exits **2 with 35 errors**. **Every one is
foreign** — the file set is exactly `src/components/fourier-field/**` (7 files) plus
`demo/stories/substrates/fourier-field.vue`, lane #53's live restructure. **Zero errors on
any γ surface** (`grep -c aurora` over the log → **0**).

That is a disclosure, not a proof, so the proof was taken by scratch-copy — the same
instrument the house law names for born-RED. `git archive HEAD` → scratch, `node_modules`
+ `dist` + `dist-demo` symlinked from the real repo, run pure and then with this unit's
13 files overlaid:

| tree | command | real exit | result |
|---|---|---|---|
| `git archive HEAD` → scratch, **pure** | `npm run typecheck` | `BASE3_TSC_EXIT=0` | **0 errors** |
| `git archive HEAD` → scratch, **+ this unit's 13 files** | `npm run typecheck` | `FINAL_TSC_EXIT=0` | **0 errors** |

**Both arms clean on both trees** — `vue-tsc --noEmit` over `src` + `demo`, then
`vue-tsc --noEmit -p tsconfig.test.json`. **This unit's bytes add exactly zero typecheck
errors.**

*(One correction to an intermediate reading, kept because a green-only record is the
inflation this tranche has already paid for once.* The first two scratch runs both exited
**2** with the same two lines — `tests/components/custom/fourier-field/FourierField.smoke.test.ts(23,30)`
and `(28,8)`, `TS2307: Cannot find module '@mkbabb/glass-ui/fourier-math'` — and were
called a resolution artifact on the strength of the pure-vs-overlay equality alone. The
attribution was right and the mechanism is now proven rather than asserted: the subpath
resolves through the package's own `exports` map into `dist/`, and those runs had **no
`dist`**. Symlinking it drops both trees to 0. Nothing rested on the intermediate
figure.)*

### 4.3 · BATTERY

**On a HEAD tree carrying only this unit's bytes** (scratch overlay, real `dist`/`dist-demo`
symlinked):

```
SCRATCH2_EXIT=1
 Test Files  1 failed | 223 passed (224)
      Tests  1 failed | 1969 passed | 5 expected fail (1975)
```

The single red is **not a code assertion**:

```
FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm
     > the dist-demo it measures is NEWER than every source it is built from
AssertionError: dist-demo/index.html is STALE (built 2026-08-10T17:16:14.229Z,
newest source 2026-08-10T17:42:46.263Z) — run `npm run demo:dist:build`
```

It is a **build-artifact staleness comparison**, and it reds because *some* lane wrote
under `src`/`demo` after the last demo build — this unit's writes are among them, as are
#53's. Its own message names the cure. `dist/` and `dist-demo/` are **both gitignored**
(`.gitignore:2`, `:65`), so this is a purely local artifact fact and never a committed
one. **It was deliberately not cured**: `npm run demo:dist:build` over a tree whose
`src/components/fourier-field` does not compile would either fail or bake a foreign lane's
in-flight bytes into an artifact. The driver re-measures on a quiesced tree.

**On the real working tree** (both lanes live), for disclosure:

```
REAL2_EXIT=1
 Test Files  2 failed | 222 passed (224)
      Tests  2 failed | 1968 passed | 5 expected fail (1975)
```

The second red is `tests/gates/overfit-structure.test.ts` EXPORT-REACH, and **all four of
its offenders are `src/components/fourier-field/renderer/*`** — #53's untracked new tree.
Zero γ offenders. (The count moved 5→4 between two runs minutes apart, which is itself the
foreign lane editing under the seat.)

**One act was taken because of that gate**, and it is worth naming: the first cut also
re-exported `isAuroraDriftLive` + `AURORA_DRIFT_FLOOR` from the `/aurora` barrel. They
were **struck back out** — three internal consumers, no consumer question they answer, and
a published export nobody outside can name a use for is exactly the surface bloat the
overfit sweep exists to catch. `AURORA_SETTLE_MS` **stays** exported: a consumer polling
`[data-aurora-settled]` needs the same timeout number, and there should be one.

### 4.4 · GATE RECEIPT — the full line, verbatim, BEFORE and AFTER

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`GATE_EXIT=0`. **`seats:60` · `violations:0` · `drift:0`.** Byte-identical to the step-0
reading and to the AFTER line at
`docs/tranches/BK/execution/2026-08-09-row66-close/RECORD.md:42`. **This unit moves no
gate and mints no seat.**

### 4.5 · The battery figure vs the brief — stated with its act

The brief cites the standing as `1538 passed | 5 xf`. The tree reads **1969 passed | 5
expected fail (1975)** across 224 files. This is not movement caused by this unit — unit-1
already recorded the brief's figure as stale (it measured 1956 at `074a3d0e`), and the
delta since is the intervening commits plus the concurrent lanes. **The 5 expected-fail
count did not move**, which is the number that matters: `layout-canon.test.ts:403`
`it.fails("kill #15")` stays expected-fail, as unit-1 §1 ruled it must until the three
routed remainders land.

---

## §5 · FENCE — what this unit touched, and what it did not

**WRITTEN — 13 files, all inside the γ fence:**

| file | act |
|---|---|
| `src/components/aurora/constants/presets.ts` | `AURORA_DRIFT_FLOOR` + `isAuroraDriftLive`; interactivity doc re-authored |
| `src/components/aurora/composables/frameLoop.ts` | consumes the one predicate |
| `src/components/aurora/composables/wgpuSetup.ts` | consumes it ×2 (palette + image pipelines) |
| `src/components/aurora/composables/runtime.ts` | interactivity default ON; `forceBackend: "webgl2"` |
| `src/components/aurora/composables/useAurora.ts` | the settle beacon + `AURORA_SETTLE_MS` |
| `src/components/aurora/Aurora.vue` | publishes `data-aurora-settled` |
| `src/components/aurora/index.ts` | exports `AURORA_SETTLE_MS`; records the two deliberate non-exports |
| `demo/stories/substrates/aurora.vue` | probe/engine/medium params read at `setup` |
| `demo/stories/substrates/aurora/AuroraStage.vue` | probe mode; forced backend; `dimmed` binding struck |
| `demo/stories/substrates/aurora/NucleiOverlay.vue` | `dimmed` prop deleted |
| `tests/components/custom/aurora/harness.test.ts` | **NEW** — the 13 born-RED cases |
| `tests/components/custom/aurora/interaction-prm.test.ts` | updated to the default-ON contract |
| `tests/components/custom/aurora/Aurora.opacity-ceiling.test.ts` | mock mirrors the new `useAurora` shape |
| `docs/tranches/BK/execution/2026-08-10-lanegamma-unit2/{RECORD,PASTE-BLOCKS}.md` | this record |

**NOT TOUCHED — the GL arm.** All 13 GL-arm files (−2,889 lines, re-derived at unit-1)
stand byte-untouched. **No GLSL was deleted**; the π-ARCHIVE receipt fences that cut and
it is still OWED.

**FOREIGN LANES, untouched, unread-for-edit:** every `src/components/fourier-field/**`
path and `demo/stories/substrates/fourier-field.vue` (#53) · `src/index.ts` ·
`src/composables/motion/pointer/pointerFieldMappings.ts` · `scripts/comment-census.mjs` ·
`docs/design/*.md` · `docs/tranches/IOS27-MICRO/**` · `docs/tranches/BK/EXECUTION-PROGRESS.md`.
Their dirt is not this unit's and no figure here is claimed over it.

**SIBLING REPOS: ZERO WRITES.** No sibling repo was read, moved, parked or stashed.

**NOT STARTED (later runs):** any GLSL delete · `W-AURORA-CONFIG` / `-FIELD` / `-BODIES` /
`R-AURORA-REGISTER` · #50 GF-BLOB (γ2) · the γ3 flood-ceiling wave ·
`tests-visual/substrate-paints-color.spec.ts` · #51 (γ4) · any export-key motion
(`./blob-config` is Lane β's) · any browser.

**Refusals honored as ratified:** footage · device-matrix · Safari-GUI · physical classes.

---

## §6 · What the next γ run inherits

1. **π-ARCHIVE is still the fence.** The receipt is OWED; no GLSL may be deleted before it
   lands. The harness now makes the capture *admissible* — `?probe=1` + `?engine=webgl2` +
   `?aurmedium=` + the beacon all exist on disk. The updated order is in PASTE-BLOCKS.
2. **The drift floor's CUT is π-FIELD's** (§A7). The shape is on disk; the number is not,
   and the arithmetic showing why no config-space constant can supply it is banked here so
   the next seat does not re-derive it.
3. **`aurora-hero.ts:274`'s WCAG 2.2.2 claim** rests on invisibility, not stillness. §6
   makes the field visible; the claim must then be struck or earned.
4. **U-19 parts 2 and 3 are ANSWERED (both NAMED)** and are not owed again. Part 3's
   retirement, if it ever comes, is a separate explicit act against a live WGSL feature.
5. **The entrance mechanism is CONFIRMED, not defaulted** — crossfade, with
   deferred-uniform-apply refuted at `wgpuSetup.ts:219`.
6. **`W-AURORA-CONFIG` inherits one un-taken half of `:407`**: the forced medium's
   structurally-non-zero deposition, which belongs to the `DEP_MIN` bridge clamp (`:434`).

---

## §7 · ADDENDUM — the CURE PASS, 2026-08-10 (post-adjudication, pre-commit)

**Seat** CURE · **modelId asserted** `claude-opus-5[1m]` · **base** `18654497` · **verdict**
`CURE-REQUIRED` (workflow `wf_9c556949-d86`, adjudicator `claude-fable-5`). Same shared
tree, same fence: no `git add`/`commit`/`stash`/`checkout`, no GLSL byte, no browser, no
foreign path. Four cures, all pre-commit, all inside the γ fence.

### 7.1 · CURE-A — the harness now DRIVES the beacon's positive arm

The confirmed defect: §4.1's 13 cases assert the beacon's ABSENCE (`"css"`) and its
SOURCE (a `toContain` over `Aurora.vue`), and never once its presence. Deleting the stamp
(`isSettled.value = true`) left the whole cited verification surface green — and
π-ARCHIVE's admissibility gates on exactly that attribute.

Three behavioral cases land in `harness.test.ts`, mounting the REAL `Aurora` +
`useAurora` over a stubbed `createAurora` (the GPU device is the one thing the DOM env
cannot supply; everything the beacon is made of stays real) and a hand-driven frame clock
(`requestAnimationFrame` + `performance.now` owned by the test — a wall-clock wait is the
instrument the beacon replaces):

| case | what it drives |
|---|---|
| *STAMPS one entrance after the arm seats the current config* | eager arm → `configs === [config]` → absent inside the window → present past `AURORA_SETTLE_MS` |
| *RE-OPENS on a config change and re-stamps one entrance later* | preset switch → the deep watch applies it AND re-opens the beacon → present again one entrance later |
| *never carries a stamp across a loss→restore replay* | CURE-B's pin (§7.2) |

**Why the `useAurora` mock could not do this.** `Aurora.opacity-ceiling.test.ts` mocks the
composable itself — the door that REPLACES the state under test. Mounting over a stubbed
runtime is one layer lower and is what makes the mutant fall.

### 7.2 · CURE-B — the never-lie law on loss→restore

Both ratified spellings were on the table. **The seam spelling is taken**
(`useAurora.ts`, the `onRendererStatus` callback), not the template conjunction at
`Aurora.vue:206`, for one reason: `isSettled` is a **published composable return**, so a
programmatic consumer awaiting it — not only the DOM attribute — must never be told a
lost field is settled; fixing only the publish would leave the beacon itself lying and
`Aurora.vue` doing the not-lying.

`createGpuSubstrate` publishes `pendingRenderer(engine)` on context LOSS and a ready
status on RESTORE (`useGpuSubstrate.ts` `emitRendererContextState`). The seam now closes
the beacon with the field (`cancelSettle()` on any non-ready phase, cancelling the chain
in flight) and re-schedules one entrance on the restore. An `entranceStarted` flag keeps
the arm's OWN first ready status from opening an entrance before `armRuntime` has applied
the config.

### 7.3 · CURE-C — the retired-ladder detector gains `breathDepth !== 0`

The one axis whose omission WAS the cured bug was the one spelling the detector did not
look for. Four spellings now, not three.

### 7.4 · CURE-D — record errata

- `§A8` blast-radius cite `AuroraStage.vue:42` → **`:66`**, verified on disk (`:42` is the
  `engine?: "webgl2"` prop declaration; `:66` is the `useCursorInteraction(` call).
- `§3` and `PASTE-BLOCKS §1` now say the **unit-executable half** of `G-HARNESS-DRIVES`.
  Clauses **(a)/(c)/(d)** are paint clauses and stay **OWED with the π seat** — the
  ordinary cases never discharged them and the record no longer reads as if they had.

### 7.5 · VERIFY — the mutant transcript, real exit codes

`M2` = delete the `isSettled.value = true` stamp from `scheduleSettle`'s rAF step
(`useAurora.ts:207` pre-cure · `:213` post-cure — the same statement). Applied in a
**SCRATCH COPY** (`src` + `demo` + `tests` + configs rsynced out, `node_modules`
symlinked); **the repo tree was never mutated.**

```
SCRATCH_PRISTINE_EXIT=0   scratch control, unmutated       → 16 passed (16)
MUTANT_PRECURE_EXIT=0     M2 + the pre-cure 13 only        → 13 passed | 3 skipped  SURVIVED
MUTANT_FULL_EXIT=1        M2 + the cured harness           → 3 failed | 13 passed   KILLED
MUTANT_B_EXIT=1           CURE-B seam reverted             → 1 failed | 15 passed   KILLED
```

The `SURVIVED → KILLED` flip is measured on ONE file with ONE mutant: the pre-cure case
set (selected by name filter) passes green against M2; the cured set does not.

Pristine repo tree, after the cures:

```
CURE_HARNESS_EXIT=0      Test Files 1 passed (1) · Tests 16 passed (16)
AURORA_SUITE_EXIT=0      Test Files 14 passed (14) · Tests 109 passed (109)
GATE_EXIT=0              seats:60 … drift:0 rosterSha256:282d05cf violations:0   (byte-identical)
TSC_EXIT=0               `npm run typecheck`, whole tree, 0 errors
BATTERY_EXIT=1           1 failed | 2005 passed | 6 expected fail (2012), 225 files
```

The battery's sole red is the **same gitignored `dist-demo` staleness comparison** §4.3
already attributed — collective, not γ's, and re-measured by the driver on a quiesced
tree. Test count moved 2009 → 2012: exactly this cure's three cases.

### 7.6 · FENCE, this pass

**WRITTEN — 4 files:** `tests/components/custom/aurora/harness.test.ts` ·
`src/components/aurora/composables/useAurora.ts` · this `RECORD.md` · `PASTE-BLOCKS.md`.
`Aurora.vue` was **not** touched (the seam spelling won). **NO GLSL** — π-ARCHIVE's
receipt is still **OWED** and still fences that cut. No index act, no browser, no sibling
repo, no foreign path.
