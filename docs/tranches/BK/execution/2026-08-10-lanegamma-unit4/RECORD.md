# LANE γ · UNIT 4 — γ3, the FLOOD-CEILING follow-up wave

**Seat**: IMPLEMENT · `claude-opus-5[1m]` (asserted before the first byte; the assertion
gates the chain).
**Base**: `350f7a90` (γ2/#50 W0 landed). **Tree**: SHARED, concurrent lanes live. No
`git add`/`commit`/`stash`/`checkout` was run — the driver commits.

**What this unit is**: the ratified γ3 row and nothing past it — *"give the MAX 0.7
ceiling arm its own differential/unclipped read in
`tests-visual/substrate-paints-color.spec.ts` so a planted flood defect REDs"*, plus the
π enqueue. **γ4 (#51) is unopened. #50 W1–W8 stay behind the π-W1 fence; no GLSL byte was
deleted; no `src/` byte was written at all.** No browser was opened.

One clause of the routed text does not survive the arithmetic and is **corrected with
grounds** (§3): at HEAD the sampled interior is *not* clipped, so the old ceiling was
never geometrically vacuous. What it was — and what γ3 actually cures — is a bound that
**had no plant and had therefore never been seen to fail**, which this file's own header
calls theatre.

---

## §1 · CENSUS — step-0, banked before any byte

| axis | value |
|---|---|
| baseline diff | `/tmp/bk-lanegamma-baseline-1787584591.diff` (131,539 bytes) |
| HEAD at step 0 | `350f7a90` |
| porcelain at step 0 | **41** (38 tracked-modified/deleted · 3 untracked) |
| porcelain at hand-off | **58** (5 of the delta are mine; the rest is four other lanes' during the run) |
| vue-tsc at step 0 | `VUE_TSC_EXIT=2` — **foreign**, §6.3 |
| battery at step 0 | **3 failed · 2011 passed · 7 expected fail (2021)**, `BATTERY_EXIT=1` |
| gate receipt at step 0 | `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0` |

**Untracked at step 0, enumerated** (none of it this lane's): `scripts/import-dag.mjs` ·
`tests/components/custom/dock/GlassDock.posture.test.ts` ·
`tests/components/custom/dock/__scratch-inert.test.ts`.

**The brief's battery figure does not match the tree, and the tree wins** — the brief
carries *"1538 passed | 5 xf"*; `vitest run` at step 0, before this seat wrote a byte,
returns **2011 passed | 7 xf with 3 FAILs**. Unit-3 recorded the same divergence at its
own base. Both step-0 REDs are foreign and both are proven so in §6.

---

## §2 · THE ACT LEDGER — one instrument, five surfaces

The deliverable is a **ceiling that can be seen to fail**. Until this unit the blob floor
carried two bounds and exactly one plant: `blob-blank` drops the canvas from the
composite, which bites the MIN and cannot touch the MAX. The non-flood ceil had never
RED-ed in any run, self-test or otherwise.

### 2.1 · `tests-visual/substrate-paints-color.spec.ts` (~~+205/−41~~ **+224/−39** [2026-08-24 · adjudication CURE-1: figure re-measured on the tree])

**(a) The `blob-flood` plant.** The canvas is given an opaque background
(`#ff00ff !important`), so every pixel it is allowed to paint contributes to the
composite and no transparent margin survives. That is the flood class expressed at the
compositor, exactly as `blob-blank` is the blank class expressed there. `grabBlobBaseline`
hides the canvas with `opacity: 0`, which hides the background with it, so the baseline
stays the true ground and the differential is the flood.

Magenta is not decoration: the threshold is `|ΔR|+|ΔG|+|ΔB| > 40`, and `#ff00ff` scores
`510 − g ≥ 255` against **every** grey and ≥255 against both card grounds. A plant colour
that could coincide with the ground somewhere would under-report its own flood.

**Two alternative plants were considered and REFUSED, in the file:**

| candidate | ground for refusal |
|---|---|
| a SHADER flood (the `black-aurora` idiom) | it mutates `src/components/blob`'s WebGL2 arm — the path #50 W1 deletes *entire*. Born with a death date one wave away: the ad-hoc class |
| driving the configurator to a flooding radius | the plant would then depend on the physics **admitting** a flood, and #50 W3's energy ceiling exists to forbid one. The plant could stop biting for the RIGHT reason and read as a hollow gate |

**(b) `blob-flood` is deliberately OUTSIDE `PI_PLANT=all`.** The two blob plants are
mutually exclusive mutations of the same element — one hides the canvas, one paints it
opaque — and `opacity: 0` wins over a background. Folding the flood into `all` would
silently retire the blank bite *and* leave the ceiling untested. It gets its own
invocation.

**(c) The ceiling's own region.** The readback box is the canvas BOUNDING BOX; the studio
stage card is `overflow-hidden` and the canvas is 160% of its wrapper, so part of that box
shows the page BEHIND the stage — pixels the canvas cannot paint, identical in the live
and baseline reads by construction, and therefore pure dilution of any coverage fraction.
The ceiling now reads the interior INTERSECTED with the canvas's unclipped rect
(`unclippedRegion`: the bounding box ∩ every clipping ancestor, read from layout after an
explicit `scrollIntoViewIfNeeded` so the rects and the pixels describe the same frame).
The root element is excluded from that walk by design — its overflow propagates to the
viewport, which is a scroll port, not a paint clip, and Playwright captures an element
screenshot beyond the viewport.

**The FLOOR is untouched and reads what it always read**, the whole interior inset box —
the region its measured `0.166 / 0.000` pair was taken on. The two bounds now score the
same frames over different denominators, one screenshot per frame, both logged.

**(d) `interiorCoverageDiff(png, png, inset, threshold)` → `coverageDiff(live, base,
region, threshold)`.** A clean break, no alias: a `Region` in fractions of the readback
box, so it survives the device scale factor and any layout move. `insetRegion(0.12)`
reproduces the old sample box exactly (`Math.floor(w*0.12)` … `Math.ceil(w*0.88)`), so the
floor's arithmetic is byte-for-byte the arithmetic that measured 0.166. An EMPTY region
now throws rather than returning `0/0` — a fraction over zero pixels is not a verdict.

**(e) A degenerate clip hard-fails.** If the intersection misses the interior entirely the
canvas is wholly behind the stage clip and nothing it paints can be read: RED, with the
measured rect in the message. No threshold constant was minted for "how much clip is too
much" — the only bright line is *nothing to measure*.

**BANDS: NOT RETUNED. `BLOB_COVERAGE_MIN = 0.1` and `BLOB_COVERAGE_MAX = 0.7` stand
exactly where W00 put them.** γ3 gives the ceil a plant and a denominator, not a number.

### 2.2 · `tests-visual/pi-gate-verify.mjs` (~~+41/−10~~ **+43/−8** [2026-08-24 · CURE-1]) — the bite made attributable

`FLOOR_BITE` was keyed by floor alone, one regex per title. The blob floor carries **two**
plantable bounds that fail on different sentences, so a flood run would have been credited
to the blank floor's bite — the wrong-assertion class that map already refuses one level
up. It is now keyed **per plant**, and `--plant=<kind>` (default `all`) tells the verifier
which plant the run drove. A required floor with no plant in the run is RED with its own
message: a *planted-red* verdict over a floor nothing mutated is credited to a defect it
never saw.

### 2.3 · `tests-visual/package.json` (+1 script, 2 edited)

New: **`gate:pixel-floor:planted:flood`** — `PI_PLANT=blob-flood`, its own report
(`.cache/pi-report-flood.json`, so all three arms coexist), `-g 'blob paints'`,
`--floors=blob --plant=blob-flood`. The two existing planted arms now pass `--plant=all`
explicitly rather than leaning on the default.

### 2.4 · `.github/workflows/ci.yml` (+6) and `scripts/release.sh` (+4)

**A plant with no runner is ABSENT, never GREEN** — the register's own vocabulary. The
flood arm is wired into both places the pixel floor already runs: the CI `pixel-floor` job
(the plant is CSS-only, so it bites on SwiftShader exactly as on Metal) and the pre-tag
real-GPU block in `release.sh`. The CI artifact step already globs `pi-report-*.json`, so
the third report banks itself.

**FENCE NOTE, stated rather than assumed.** The lane text names
`tests-visual/substrate-paints-color.spec.ts`. The other four surfaces are the same
instrument — its verdict authority, its invocation, and the two runners that invoke it —
and *none* of them is another lane's: all four were clean in step-0 porcelain and are
clean of every other lane's fence. Landing the plant without them would ship an unwired
gate, which is the one thing this tranche refuses outright.

---

## §3 · THE ROUTED PREMISE, CORRECTED — the stage clip does not reach the sampled interior

`4e201a3a` routed this wave with the ground *"the stage card clips the canvas; MAX rests
on W08's own metric"*, and the lane text repeats it. **The clip is real; its reach is
not.** Derived from the CSS on disk, no device needed:

| step | source |
|---|---|
| the stage card is the clipper | `demo/stories/substrates/blob.vue:503-505` — `flex h-full w-full items-center justify-center overflow-hidden` |
| the Blob box is ≤ 78% of the stage's SHORT axis | `blob.vue:523` [2026-08-24 · CURE-2: :524 is the div's closing bracket] — `aspect-square w-full max-h-[78%] max-w-[min(78%,30rem)]`, centred by the flex |
| the canvas is 160% of that box, centred on it | `src/components/blob/Blob.vue:364-374` |
| the wrapper does not clip | `Blob.vue` — `contain: layout style`, **no** `paint` (stated in its own comment: the 160% satellites must overflow) |

⇒ `canvasSide ≤ 1.6 × 0.78 × min(stageW, stageH) = 1.248 × min(stageW, stageH)`
⇒ the visible band is **≥ 1/1.248 = 0.8013 of the canvas box on BOTH axes**, at every
viewport (the `30rem` cap only makes the canvas smaller, i.e. the band larger).

The sampled interior is the central **0.76** (`BLOB_INTERIOR_INSET = 0.12`).
**0.76 ≤ 0.8013**, with 0.0413 of the box to spare — so the interior sits inside the
visible band and the old whole-interior read was **never diluted**.

**Measured, not argued** (§4.1): the whole-interior ceiling only goes vacuous below a
visible fraction of **0.6340** — a canvas 1.58× its clip. HEAD is at 0.8013, clear of it.

**So what was actually wrong.** Not the denominator: the *absence of a plant*. The ceil
had never been exercised by anything, and by this file's own standard — *"a floor that has
never been SEEN to fail is theatre"* — it was hollow for that reason alone. γ3 delivers the
plant, and delivers the paintable denominator as the thing that keeps the ceiling honest
**when the geometry moves** — which is not hypothetical: #50 W8's routed row is
*"canvas 160% → orbit-envelope"*, i.e. this exact ratio, and the margin it has today is
4 points of the box.

---

## §4 · DEVICE-FREE PROOFS — scratch-copy, zero repo bytes, real exit codes

π is ENQUEUE-only for this seat, so every claim below is one a browser is not needed for.
The metrics were exercised by SCRATCH-COPYING the spec (`test.describe` cut, the
playwright import dropped, exports appended) into
`…/scratchpad/gamma3/metrics.ts` — throwaway, no repo byte.

### 4.1 · The two metrics on synthetic frames (`PROVE_EXIT=0`)

A non-uniform synthetic ground (gradient + badge + prose band), flooded across the
paintable rect only — i.e. what a *total* flood looks like through a clip:

```
visible  wholeInterior  paintable   ceilREDs(whole)  ceilREDs(paintable)
1.0000   1.000          1.000       RED              RED   (share 1.000)
0.8013   1.000          1.000       RED              RED   (share 1.000)   ← HEAD
0.7500   0.979          1.000       RED              RED   (share 0.974)
0.6500   0.736          1.000       RED              RED   (share 0.731)
0.5500   0.528          1.000       PASS             RED   (share 0.524)
0.4500   0.354          1.000       PASS             RED   (share 0.351)
0.3500   0.215          1.000       PASS             RED   (share 0.212)

blank canvas (live ≡ baseline): whole=0.000 paintable=0.000
EMPTY REGION throws: blob differential readback: the sample region [0.5,0.5]-[0.5,0.5] is EMPTY
```

Bisected crossing (`CROSS_EXIT=0`): **the whole-interior ceiling goes vacuous below
v = 0.6340** (a total flood reads 0.700 there, 0.696 just under). The paintable read is
1.000 at every clip severity — it cannot be diluted, which is the whole point.

The blank row matters as much as the flood row: **the floor's measured pair is undisturbed
by the ceiling's new denominator** — 0.000 on both regions.

### 4.2 · The plant selector, every value (`PLANTS_EXIT=0`)

```
PI_PLANT=""            → black-aurora=false  blob-blank=false  blob-flood=false
PI_PLANT="all"         → black-aurora=true   blob-blank=true   blob-flood=false
PI_PLANT="black-aurora"→ black-aurora=true   blob-blank=false  blob-flood=false
PI_PLANT="blob-blank"  → black-aurora=false  blob-blank=true   blob-flood=false
PI_PLANT="blob-flood"  → black-aurora=false  blob-blank=false  blob-flood=true
```

`all` drives the two arm-compatible plants and **not** the flood; the green run drives
none. Exactly as designed, and the mutual exclusion cannot be entered by accident.

### 4.3 · The verifier, eight synthetic reports — including the regression arms

| # | report | invocation | verdict | exit |
|---|---|---|---|---|
| A | blob FAILED on the ceiling sentence | `--plant=blob-flood` | GREEN (self-test) | 0 |
| B | blob FAILED on the **blank** sentence | `--plant=blob-flood` | RED — *WRONG ASSERTION* | 1 |
| C | blob PASSED | `--plant=blob-flood` | RED — *DID NOT BITE* | 1 |
| D | aurora required | `--plant=blob-flood` | RED — *has NO plant under this run* | 1 |
| E | blob FAILED on the blank sentence | `--plant=all` | GREEN — **unchanged** | 0 |
| F | same, **no `--plant`** | (default `all`) | GREEN — **unchanged** | 0 |
| G | blob FAILED on the ceiling sentence | `--plant=all` | RED — *WRONG ASSERTION* | 1 |
| H | `--plant=nope` | — | `unknown plant 'nope'` | 2 |

E and F are the regression arms: the two existing planted invocations behave byte-for-byte
as before. B and G are the pair that earns the change — each plant is now pinned to the
bound it actually mutates, in both directions.

### 4.4 · Typecheck of the π spec — ZERO delta, proven against a HEAD control

`tests-visual/` is in **no** repo tsconfig (`tsconfig.test.json` includes `tests/` and
`src/` only), so `npm run typecheck` never sees this file. Checked with a scratch
`tsc -p` over the spec + manifest, and against a `git show HEAD:` control of the same two
files:

```
HEAD_PI_TSC_EXIT=2      TS7016 (pngjs has no types) · TS2683 · TS2345
WORK_PI_TSC_EXIT=2      TS7016                      · TS2683 · TS2345
```

**Same three errors, same codes, same lines of untouched code** (the `pngjs` import and
`forceWebGLFloorPath`'s prototype patch). A pre-existing condition of the workspace,
neither introduced nor papered here.

---

## §5 · π — the ENQUEUE order (RECEIPT OWED; nothing claimed)

**This seat opened no browser and asserts no capture.** Enqueued to the singleton seat in
the unit-2/3 form. Two rows, one of which is new to this unit.

| axis | value |
|---|---|
| route | `/substrates/blob` (the studio) |
| port | the π seat starts its own server and cites the port |
| build freshness | verified per π; σ≈50 admissibility; oklab paint-arm |
| **π-CEILING (this unit)** | the three arms of the pixel floor at one seat: `gate:pixel-floor` (GREEN), `gate:pixel-floor:planted` (blank RED at MIN), **`gate:pixel-floor:planted:flood` (flood RED at MAX)** — the third has never run on a device |
| the figures it must bank | `paintableShareOfInterior` (derived **0.8013 ⇒ share 1.000**; the receipt confirms or refutes it), the green `coverage` and `paintedShare` pair, and the flood arm's `paintedShare` |
| **π-W1** (carried, unit-3 §8.4) | paired before/after byte-identical WGPU paint across the GL excise — **the row that unfences #50 W1** |
| observation law | screenshot / computed-style ONLY — `getContext()` on a live canvas steals the context and fabricates the black fallback |
| blob pixel-floor law | differential read; `BLOB_GROUND_QUIET_EPSILON` 0.002 |

**Status: ENQUEUED — RECEIPT OWED.** If the receipt returns a `paintableShareOfInterior`
below 1.000 the derivation in §3 is wrong and the *ceiling arm still measures correctly* —
that is the property the paintable denominator buys: the instrument does not depend on the
derivation being right, only the prose does.

---

## §6 · VERIFY — verbatim, real exit codes, never a piped tail's

### 6.1 · Gate receipt — the full line, BEFORE and AFTER, byte-identical

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`GATE_EXIT=0` both sides. **`seats:60 · violations:0` · `rosterSha256:282d05cf`
unchanged. ZERO GATES MINTED** — the flood arm is a second plant on an existing floor, not
a seat name, and this unit binds none.

### 6.2 · Battery

| | Test Files | Tests |
|---|---|---|
| before | 2 failed \| 225 passed (227) | **3 failed \| 2011 passed \| 7 expected fail (2021)** |
| after | 1 failed \| 226 passed (227) | **1 failed \| 2014 passed \| 7 expected fail (2022)** |

`BATTERY_EXIT=1` both sides. **This unit's contribution to the vitest battery is exactly
ZERO**: `vitest.config.ts` includes `tests/**` and `scripts/**` only — `tests-visual/` is
Playwright's, never collected here. The whole delta is foreign, and it moves in the GREEN
direction: the two `tests/demo/router-field-ownership.test.ts` failures at step 0 were a
concurrent lane mid-write (`demo/router.ts` had not yet exported `shellFieldActive`) and
cleared during the run; `+3 passed / +1 total` is that lane's own.

**The one remaining FAIL is RED BY ROUTE and was already RED at step 0**:
`tests/gates/boot-graph.test.ts` — *"the dist-demo it measures is NEWER than every source
it is built from"*. `dist-demo/` is gitignored (`.gitignore:65`) and can never enter a
commit; under concurrent lanes no single seat can hold it green. Stated, not papered. **No
γ surface is in its offending set** — this unit wrote nothing under `src/` or `demo/`.

### 6.3 · vue-tsc

```
before  VUE_TSC_EXIT=2   tests/demo/router-field-ownership.test.ts(2,18): error TS2305:
                         Module '"../../demo/router"' has no exported member 'shellFieldActive'.
after   VUE_TSC_EXIT=0
```

The step-0 RED is the carried foreign-mid-write class named in the brief, here on a
router surface rather than a dock one: the test file referenced an export the writing lane
had not yet added. It cleared during the run without any act of this seat's. **Zero errors
at hand-off, both arms, whole tree.**

### 6.4 · `verify:package` — G-BUNDLE-RATCHET, RED by route, as the driver ratified

```
VERIFY_PACKAGE_EXIT=1
Error: G-BUNDLE-RATCHET: bundle ratchet shrink — rebind down deliberately: 2607399 < 2633353
```

Lawful and not this unit's — the single batch-close rebind carries β0's +1215 and the
driver's −71. **This unit's contribution to `unpackedBytes` is exactly zero**: `files` is
`["dist"]`, and this unit's five surfaces are `tests-visual/` (a private workspace),
`.github/`, `scripts/` and `docs/`. None is published. (The candidate figure moved
2607590 → 2607399 since unit 3; that motion is other lanes' `src/` bytes, not claimed
here either way.)

---

## §7 · REFUSED WITH GROUNDS

| row | ground |
|---|---|
| **#50 W1–W8** | unchanged from unit-3 §8.4/§8.5. **π-W1 is blob's fence** and its *before* half must be captured before the excise; this seat holds no capture seat. W2–W6 are blocked by the measured dual-packer coupling; W7 is routed to #52; W8's rows need W3's ceiling and W6's `settled` |
| **γ4 (#51 GF-HANDMARK)** | not this commit-unit. Untouched |
| **retuning `BLOB_COVERAGE_MAX`** | the ceil separates 1.000 (flood) from a green read the receipt has yet to bank; retuning a constant this seat cannot measure would be minting. `0.7` stands where W00 put it |
| **a "how much clip is too much" threshold** | would mint a tunable with no measurement behind it. The only bright line kept is *nothing to measure* (empty region → hard fail) |
| **a shader / configurator-driven flood plant** | §2.1 — one dies with W1, the other depends on the physics admitting a flood that W3 exists to forbid |
| **asserting `paintableShareOfInterior == 1`** | the derivation says it is, but no device has confirmed it and a seat that cannot run the page must not ship an assertion that can only false-RED. The receipt banks the figure; a later unit may pin it with a witness |
| footage · device-matrix · Safari-GUI · physical classes | the plan's four refusals, honored as ratified |
| `./blob-config` export-key motion | Lane β's cut. **This seat touched no export key** |

---

## §8 · FENCE

**TOUCHED — five surfaces, all one instrument:**

| path | act |
|---|---|
| `tests-visual/substrate-paints-color.spec.ts` | ~~+205/−41~~ **+224/−39** [2026-08-24 · CURE-1] — the flood plant, the paintable region, `coverageDiff`, the two-denominator verdict |
| `tests-visual/pi-gate-verify.mjs` | ~~+41/−10~~ **+43/−8** [2026-08-24 · CURE-1] — per-plant attributable bite, `--plant=` |
| `tests-visual/package.json` | **+1 script**, 2 edited — the flood arm and explicit `--plant=all` |
| `.github/workflows/ci.yml` | **+6** — the flood arm in the `pixel-floor` job [2026-08-24 · CURE-3: LANDED via the driver's β2 batch commit `96f0f257`, content γ3's verbatim] |
| `scripts/release.sh` | **+4** — the flood arm in the pre-tag real-GPU block [2026-08-24 · CURE-3: LANDED via `96f0f257`, content γ3's verbatim] |
| `docs/tranches/BK/execution/2026-08-10-lanegamma-unit4/{RECORD,PASTE-BLOCKS}.md` | this record |

**NOT TOUCHED — `src/` entire.** No `src/components/blob` byte, no GLSL, no export key, no
demo story. The blob GL arm stands byte-untouched; the #50 register still reads 53.

**FOREIGN LANES, untouched and unread-for-edit:** `src/components/dock/**` +
`demo/shell/**` + `demo/stories/dock/**` + `tests/components/custom/dock/**` (α) ·
`demo/router.ts` + `tests/demo/router-field-ownership.test.ts` · `scripts/import-dag.mjs` ·
`src/components/_shared/feedback/README.md` · `src/styles/glass/material.css` +
`tests/styles/material-css-syntax.test.ts` (landed attributed at `2cfc1124`; ordinary
tracked files, still not lane surfaces) · `docs/tranches/BK/EXECUTION-PROGRESS.md` · every
other lane's `execution/` record dir. Their dirt is not this unit's and no figure here is
claimed over it.

**SIBLING REPOS: ZERO WRITES.** None read, moved, parked or stashed.

**NO INDEX ACT.** No `git add`/`commit`/`stash`/`checkout`. **NO BROWSER.** **0 GATES
MINTED** — receipt byte-identical.

**NOT STARTED (later runs):** #50 W1–W8 · γ4 (#51) · any GLSL delete · any export-key
motion · the π receipt itself.

---

## §9 · WHAT THE NEXT γ RUN INHERITS

1. **The pixel floor now has THREE arms**, and the third has never run on a device.
   `gate:pixel-floor:planted:flood` is the first thing the π seat should run, and its
   `paintableShareOfInterior` is the one figure that adjudicates §3.
2. **π-W1 is still blob's fence** and still OWED (unit-3 §8.4). One blob capture unfences
   the excise; it does not wait on aurora.
3. **The margin in §3 is 4 points of the box.** #50 W8's *"canvas 160% → orbit-envelope"*
   row moves the exact ratio the derivation rests on. Whoever lands it should read the
   `paintableShareOfInterior` line the ceiling now prints on every run, and expect it to
   move.
4. **The ceiling's constant is unmeasured on its new denominator.** `0.7` was kept rather
   than retuned, and the derivation says the green read cannot exceed ≈0.25 there. The
   receipt is what turns that into a figure.
5. **`tests-visual/` is outside every repo tsconfig.** A type error in the π corpus shows
   up at Playwright runtime, not at `npm run typecheck`. §4.4's scratch `tsc -p` is the
   cheap way to check it; the three standing errors there are pre-existing.
