# LANE α — UNIT 1 (α0 + α1) · RECORD

**modelId: `claude-opus-5[1m]`** (asserted at open; the assertion gates this chain) · IMPLEMENT
seat · 2026-08-10 · base `074a3d0e` · SHARED tree, zero git-index acts by this seat.

Scope this run, verbatim from the driver: **the lane's FIRST COMMIT-UNIT ONLY — α0 (#78 LAND,
filing act; land the settled-three dock-primitive ruling record) THEN α1 (#67 IOS27 W-2
SPINE-CONDUCTOR, the ordering-critical first build act).** #47 / #42 / #76 / #22 are NOT started
here.

**The #7 fence, cited as the lane requires it in every wave record:**
`src/components/dock/styles/morph.css:67-76` — *"NO FILTER ON AN ANCESTOR OF A LENS — the #47
(GF-DOCK) fence… makes that ancestor a BACKDROP ROOT: the lens beneath samples IT instead of the
page and the glass goes flat."* Read on disk this seat. It is a DESIGN LAW the build carries, not
a sequencing blocker.

---

## §1 · STEP-0 CENSUS (banked BEFORE any byte)

| item | measurement |
|---|---|
| baseline diff | `/tmp/bk-lanealpha-baseline-1786380242.diff`, 4157 B |
| `git status --porcelain` count | **5** |
| HEAD | `074a3d0e4a22885b098be6986f404dee19e49279` |
| untracked, enumerated | `tests/styles/material-css-syntax.test.ts` (1 file, exactly) |

Tracked-dirty at open, all five enumerated:

```
 M demo/stories/foundations/typography.vue
 M demo/stories/substrates/aurora.vue
 M src/composables/dark/darkModeSyncScript.ts
 M src/styles/glass/material.css
?? tests/styles/material-css-syntax.test.ts
```

**FENCE HELD.** `src/styles/glass/material.css` + `tests/styles/material-css-syntax.test.ts` are
the two UNKNOWN-OWNER surfaces fenced out of every lane — **untouched by this seat**, attribution
is the driver's. The other three are foreign lane dirt (the `darkModeSyncScript.ts` wave and the
two lane parks named at `EXECUTION-PROGRESS.md:4428`) — **untouched by this seat**. Three other
lanes run concurrently on disjoint surfaces; nothing outside this record's own two files was
written.

---

## §2 · α0 · #78 W-DESIGN-CANON — THE FILING ACT, MEASURED

### 2.1 What the act is

`EXECUTION-DAG-2026-08-03.md:89` states #78's act operationally:

> `#78 | W-DESIGN-CANON | Φ4 | unstarted (spec sealed; **LAND not AUTHOR**) | canon bytes committed
> at e277ea42 (#90 residue) | file the 907-line body + 288-line emitter into /DESIGN.md +
> scripts/; regen --check exit 0`

Bytes verified present and measured this seat:

```
907 docs/tranches/BJ/audits/2026-07-28-claude-resume/salvage/W-DESIGN-CANON-APOTHEOSIS/DESIGN.md
288 docs/tranches/BJ/audits/2026-07-28-claude-resume/salvage/W-DESIGN-CANON-APOTHEOSIS/regen-design-canon.mjs
```

Both committed at `e277ea42`. The S/A ledger of record is `DESIGN-NOW.md:556-568` (S-1 REPLACE ·
S-2 DELETE `docs/design/` · S-3 UNPIN the `docs/precepts` submodule · S-4 DELETE the two restaters ·
S-5 DEMOTE-REWRITE · S-6 REPOINT `CANON_HOMES` · S-7 provenance · A-1 the emitter · A-2
`tests/gates/canon.test.ts`). `DESIGN-NOW.md:649`: *"BK's #78 executes S-1..S-7 + A-1/A-2 and flips
the four G-DOC-TRUTH(+ONE-CANON) arms — it authors nothing."*

### 2.2 Disk census of the nine items

| item | on disk at `074a3d0e` |
|---|---|
| S-1 `/DESIGN.md` | present, **1760 lines** (the pre-canon body; 0 `CANON:BEGIN` markers) |
| S-2 `docs/design/` | present, 4 files |
| S-3 `docs/precepts` | present; `.gitmodules` carries the submodule |
| S-4 `docs/canon/design-axes.md` + `aristotelian-proportion.md` | both present |
| S-5 `docs/canon/{glass-system,motion-system}.md` | both present, undemoted |
| S-6 `CANON_HOMES` (`scripts/lib/canon-doc.mjs:39-56`) | carries `design-axes` / `glass-system` / `motion-system` keys; **no `design → DESIGN.md` key** |
| S-7 provenance headers | not applied |
| A-1 `scripts/regen-design-canon.mjs` | **ABSENT** |
| A-2 `tests/gates/canon.test.ts` | **ABSENT** |

All nine unstarted. The row's own state cell is accurate.

### 2.3 THE REFUSAL — the filing act is UNEXECUTABLE at HEAD, with grounds

The emitter was scratch-copied (never run from the repo tree) and executed against **current disk**
under `node v26.0.0`. Result: **4 of 6 registered blocks emit; 2 THROW.** Detector output, verbatim:

```
Error: canon: --glass-opacity-wash absent from src/styles/tokens/glass.css — emit its OWED row or fix the source
    at Object.get (…/probe.mjs:31:23)
    at Object.emitGlassLadder [as emit] (…/probe.mjs:112:24)
```

```
Error: canon: --glass-saturate-floating absent from src/styles/tokens/glass.css — emit its OWED row or fix the source
    at Object.get (…/probe.mjs:31:23)
    at Object.emitGlassRegisters [as emit] (…/probe.mjs:146:108)
```

**Ground: #22 W-FROST's material re-authoring landed at `4b1a9733` and its `--glass-veil-*` rename
was RATIFIED at #68 R-1/A-15** (*"ratification stands on HEAD merits"*, `EXECUTION-PROGRESS.md:4629`).
The canon body's §1 THE MATERIAL is written against the pre-`4b1a9733` disk and no longer describes
it. Measured on disk this seat:

| the canon's §1.1 column | source it names | disk at HEAD |
|---|---|---|
| α light/dark, per rung | `--glass-opacity-{rung}` | **gone** → `--glass-veil-{rung}` = `calc(--glass-veil-base ∓ n·--glass-veil-step)` (`glass.css:57-64`); dark carries **only** `--glass-veil-base: 0.18` (`dark-arm.css:268`) — no per-rung dark α exists to print |
| saturate light/dark, per rung | `--glass-saturate-{rung}` | **gone** → ONE `--glass-saturate: 1.5` (`glass.css:98`) |
| brightness light/dark | `brightness()` inside `--glass-blur-{rung}` | **gone** — the lift arm was struck |
| the §1.2 continuum | `--glass-blur-deep-radius` | **gone** → `--glass-blur-deep-boost: 5px` (`glass-deep.css:66`) |

Two consequences, and the second is the disqualifying one:

1. **`regen-design-canon.mjs --check` cannot exit 0** — the DAG's own stated acceptance. Filing the
   emitter unchanged ships a script that throws on 2 of 6 blocks.
2. **Filing the body unchanged lands a canon that lies about the bytes.** Its §1.1 post-table
   paragraph (*"the library is at fault in four places at once, by construction: two blur pairs are
   identical… every brightness arm lifts… the dark arm's lift is the largest"*) indicts four defects
   the tree **no longer has**: blur radii are now 10/14/16/20/22, strictly monotone (`glass.css:85-89`);
   there is no brightness arm; the veil is an ink that dims. That is the exact failure the canon was
   written to kill — `DESIGN-NOW.md:595`: *"a table disk doesn't carry is a false derivation — the
   disease with better manners."*

Making the two blocks emit is **not** a re-point. Per-rung saturate and the brightness arm do not
exist to be re-pointed at; the dark arm has one scalar where the table wants five. Emitting requires
**changing the generated table's column set** — authoring the canon's §1 schema. #78 is ruled
**LAND not AUTHOR** and *"authors nothing"*. Under the ratified posture the filing seat cannot make
this edit.

**DISPOSITION: S-1 + A-1 REFUSED-WITH-GROUNDS at this seat; S-2..S-7 + A-2 not started.** The
refusal is falsifiable in one command — restore `--glass-opacity-*` / `--glass-saturate-{rung}` to
`glass.css` and both throws vanish. Two narrow rulings are owed, both above an implement seat
(§6 OWED-1, OWED-2).

**Not refused, and landed here: the ruling record α0 exists to hand forward.**

---

## §3 · α0 LANDED · THE SETTLED-THREE DOCK-PRIMITIVE RULING RECORD

The record #47 W1 consumes. Three dock-primitive rulings are SETTLED in the canon body
(`…/W-DESIGN-CANON-APOTHEOSIS/DESIGN.md`, committed `e277ea42`) — adjudicated, uncontested, and
independent of the §1 material schema this seat refused to author. Quoted verbatim with line pins.

### RULING D-1 — THE DOUBLE-DOCK COMPOSITION LAW (canon §3 law 8, `:517-522`)

> **THE DOUBLE-DOCK COMPOSITION LAW.** A dock is a STACK of separate glass bodies with load-bearing
> air — the gap ≈ 0.25–0.33 of the adjacent slab *(class D — re-measured at the codex adjudication;
> the "≈ half" reading is rejected there)* — gated on legibility through it; each slab its own rim
> and cast, the upper's shadow falling on the lower; born by Y-division, killed by Y-merge,
> transformed by member-set diff. The collapsed form is a first-class composition, never a scaled
> clone.

Settled at codex ADJ-2; the loser carries its falsifier at `DESIGN-NOW.md:593` — *"Arm 1's C-5: 'gap
≈ ½ the adjacent slab' | codex ADJ-2 re-measured `zoom-f001dock.png`: 0.26-0.33; the ≈½ reading is
in the codex's own §REJECTED."* **W1 consumes**: the gap is a ratio of the adjacent slab, never a
literal; the collapsed dock is composed, never `scale()`d.

### RULING D-2 — THE DOCK IS A SCOPED α REGISTER, NEVER A RUNG (canon LAW I.5 `:76-89`, Appendix A `:881`)

> There is exactly **one** glass ladder… Everything else is one of three things, and each is named:
> a **scoped α register** (dock, dialog, sheet, chassis) — a substitution *on* a rung, never a new
> one;

with Appendix A retiring the counter-claim: *"the seven-tier ladder (`dock`, `chassis` as rungs) →
five rungs + the named non-rung roles (§1)"*. **W1 consumes**: the dock declares a rung and
substitutes its α on it. A dock-local rung is a defect.

### RULING D-3 — THE DOCK-BLUR "NO-OP BY DESIGN" NARRATIVE IS A DEFECT CLASS (canon Appendix A `:895`)

> the dock-blur "NO-OP by design" narrative → a defect class, never a design; the dock reads its
> rung through its seam

Grounded at `DESIGN-NOW.md:548` (DC-7): *"the doc launders defects as design (§N7 'NO-OP by
design'); Appendix A retires the narrative."* **W1 consumes**: the dock's `backdrop-filter` computes
non-`none` in the engine or the wave fails loud. This is LAW I.1 with the dock's name on it, and it
composes with the #7 fence above — the fence names the *mechanism* that flattens the lens, D-3 names
the *narrative* that used to excuse the flat result.

**Adjacent carries, named so they are not mistaken for the settled three:** LAW I.6 (*"THE HOUSING
CARRIES THE MATERIAL; THE MOVER CARRIES NONE"* — general, not dock-specific) and the §II.1 dock
engagement budgets (`--scale-hover-dock` 1.1, `--scale-press-dock` = `var(--scale-press)`, both live
on disk in `scale-paper.css`, both emitted). These are consumed by W1 but are not dock-primitive
*rulings*.

**These three stand on `e277ea42`'s committed bytes and are unaffected by the §2.3 refusal** — each
rests on a HAND-WRITTEN pin, and none depends on the material schema. #47 W1 may cite this record
directly.

**One pin was withdrawn from D-2 at the cure pass, and the withdrawal is stated rather than silent.**
D-2 was first cited as *"LAW I.5 `:76-89`, §1.2 `:363`, Appendix A `:881`"*. The `:363` row —
`| dock | --glass-opacity-dock | 0.50 | *(mode-invariant)* | a scoped α substitution… |` — sits
**inside** the generated `<!-- CANON:BEGIN glass-registers -->` block (`:360-369`), which is exactly
the block `emitGlassRegisters` throws on (§2.3), and it names `--glass-opacity-dock`, **absent from
`src/` at HEAD** (`grep -rn -- '--glass-opacity-dock' src/` → real exit 1). A generated row printing a
token the tree does not carry cannot bear a ruling. **D-2 therefore stands on its two hand-written
pins alone — LAW I.5 `:76-89` and Appendix A `:881` — both outside every generated block, and the
ruling itself is unchanged.** This narrows the earlier claim that *"none of them sits in a generated
block"*: one cited pin did, it has been dropped, and the two that carry D-2 do not.

---

## §4 · α1 · #67 IOS27 W-2 SPINE-CONDUCTOR

### 4.1 Spec read at open, as ordered

Spec of record: `docs/tranches/IOS27-MICRO/FINAL/FINAL.md:40-45` (the wave) →
`docs/tranches/IOS27-MICRO/passes/PASS-3/SPEC-SPINE-CONDUCTOR.md` (476 lines, the kernel). Both read
in full this seat. Ordering pin confirmed on disk: `EXECUTION-DAG-2026-08-03.md:78` —
*"W-2 before #47 kernel"*.

Evidence base re-run this seat, not quoted: `docs/tranches/IOS27-MICRO/prototypes/spine-conductor/`

```
$ node check.mjs
87/87 gates PASS (+1 info)
EXIT=0
```

`SC-KERNEL` is DOM-free (`index.html:546-1187`, ~640 lines); `SC-BANDS` is `:1191-1248`. The battery
extracts both verbatim. The port surface is real and proven.

### 4.2 Born-RED census (re-derived this seat, `grep -rl … | wc -l`)

| symbol | `src/` | `demo/` |
|---|---|---|
| `useLiquidSpine` | **0** | **0** |
| `useAnisotropicExtent` | **0** | **0** |
| `--scrub-t` | **0** | **0** |
| `claimMediumWriter` | **0** | **0** |

`useAnisotropicExtent`'s 0 corroborates #46's C5 (*"minted ONCE at #67 W-2, never re-mint, and is 0
on disk"*) at HEAD. Substrate present and consumable per §3: `useLeadTrail`
(`src/composables/motion/morph/useLeadTrail.ts`), `useDockSpring`
(`src/components/dock/composables/useDockSpring.ts`), `springPresets.ts`.

### 4.3 CONSUMING vs NON-CONSUMING against the R-7 marks — the partition ordered by the driver

R-7 is three owner-filmed captures and nothing else (`EXECUTION-DAG-2026-08-03.md:78`;
`EXECUTION-PROGRESS.md:4428`): **draggable loupe close-up · Siri waveform · ChatGPT dock-motion**.
The gate blocks **only the consuming arms**.

**CONSUMING — REFUSED-AS-RATIFIED, footage absent (4):**

| # | fold | mark | why it consumes |
|---|---|---|---|
| C-1 | §2.3(2) the panel register's Siri re-derivation | **Siri waveform** | *"MARKS-D-SIRI mark 3, re-derived on resume"* — both axes one spring, intrinsic 4.5–4.8% overshoot, text born blurred condensing ~190ms, rim flare +0.5s/+0.85s. Only the RE-DERIVATION is gated; the constant is landed (§4.4) |
| C-2 | §7.1 the slot-axis lens artifact, whole acceptance set | **loupe close-up** (+ the L-3 device cell) | ≥3 wells · velocity-seeded travel · the momentum tick vs the N3 tick-vs-budget test · C4/C5 as binding laws · F5's fence anatomy pixel-sampled ≥4.5:1 at bloom peak on both engines · **plus the R-9 destination-charge row** (+70% slot redness over ~83ms) |
| C-3 | §2.6 + §2.7 + §7.3 — the dock grow-to-card growth/status-migration manifest and the H1 ladder on that surface | **ChatGPT dock-motion** | the growth organ's read is `MARKS-C-APPS` mark 6 (`:52`, `:166` — the card settles then expands to full-bleed); the manifest's verification arm cannot be scored off a still |
| C-4 | §7.2 R4 cross-surface composition + §7.4 the merged page's paint run | all three, + the singleton browser seat | π class. Any capture **ENQUEUES to the singleton seat** — this seat opened no browser |

**NON-CONSUMING — proceed now (14):** §1 the primitive surface + the three drive verbs · §1.1 the
three laws and three modifiers + the `sat`×`source` construction throw · §1.2 the intent/direction
law, both faces · §2.1 the medium law (sat position map + the emergent occupancy rule θ 0.02/0.10,
attack 20ms / release 120ms) · §2.2 the clock table (medium/content/periphery/light) · §2.4 the light
channel's clocks · §2.5 the close order + the mirrored-exit kill, incl. §9 row 3's `glass-reveal-out`
EXACT TEXT · §2.8 the drawer velocity-projection cure, §9 row 4 EXACT TEXT
(`useDrawerSnap.ts:361-365`) · §2.9 the dock-invariance invariant · §3 substrate relations + the
mount fence · §4 the compositor-first invariant · §5 the union battery port · §6 the census +
migration order · §9 row 5 the `--scrub-t` publication with `--gl-t` a clean break.

**One disambiguation, load-bearing:** §2.2's *"release RATIFIED by corpus (CHARTER R-7 — τ≈54/57/58ms,
three independent surfaces)"* is **CHARTER ruling R-7**, a banked three-surface corpus fit. It is
**not** the R-7 footage gate and does **not** block. Two different R-7s; conflating them would park
the content clock for nothing.

### 4.4 THE FINDING — CHARTER R-1 is superseded on disk; the acceptance floor cannot be met as written

W-2's acceptance floor is stated as *"the 86-gate battery + the 71/71 union battery"* (`FINAL.md:43`),
standing at **87/87** after `[P4-AGG]`. Ten of those are register-arithmetic gates. §3 forbids the
kernel from carrying its own register table: *"`springPresets` stays the single named-register
authority."* So a faithful port reads `springPreset("dock")` by name — and the R-1 gates then measure
the **landed** pair.

Measured, both pairs, arithmetic recomputed this seat (`f_d = (1/response)·√(1−ζ²)`; overshoot
`= exp(−πζ/√(1−ζ²))`), never quoted:

| pair | source | f_d | zero-seed overshoot |
|---|---|---|---|
| `{0.35, ζ0.82}` | CHARTER R-1, the prototype's `REG.dock` | **1.6353 Hz** | **1.11%** |
| `{0.30, ζ0.88}` | **disk at HEAD**, `springPresets.ts:84-86` | **1.5832 Hz** | **0.30%** |

**The mutation was EXECUTED, not reasoned about.** The prototype was copied to scratchpad, `REG.dock`
set to the landed pair at its one site (`index.html:595`), and `check.mjs` re-run. Real exit codes,
both arms:

```
baseline  {0.35, ζ0.82}   87/87 gates PASS (+1 info)             EXIT=0
mutated   {0.30, ζ0.88}   83/87 gates PASS — 4 FAIL (+1 info)    EXIT=1
```

**FOUR rows go red. Printed verbatim from the mutated run:**

```
FAIL  R-1 dock pair (response, ζ)                         0  band [1, 1] [R-1] 0.30→0.35 AMENDED, ζ HELD; overpull register CONVERGED — no second arrival authority
FAIL  settle from rest-crossing (ms)                      0  band [140, 220] [MARKS C2 — model 169–183, data 183]
FAIL  crossing velocity sane (/s)                    0.1556  band [0.3, 4] [REG-LOCK flick seed]
FAIL  no hold: velocity still buys overshoot (guard)     1.0087  band [1.01, 1.2] [DESIGN falsifiability guard — aging must not kill bought velocity; the 3/s seed decelerates over the 0.1 approach gap]
```

The same four under the charter pair, so the delta is visible: `1` · `176` · `0.4846` · `1.0198` —
all PASS. Read row by row:

- **`R-1 dock pair` — HARD FAIL (1 → 0).** Band `[1,1]` is a pair-identity assertion on
  `{0.35, 0.82}`. Disk is `{0.30, 0.88}`.
- **`settle from rest-crossing (ms)` — HARD FAIL (176 → 0), and it is a CORPUS row, not a lock.** Its
  band `[140, 220]` is `[MARKS C2 — model 169–183, data 183]`. At ζ0.88 the zero-seed overshoot is
  0.30%, so the trajectory never produces a measurable rest-crossing and the metric reads 0. **A MARKS
  corpus bracket does NOT survive the retune.**
- **`crossing velocity sane (/s)` — HARD FAIL (0.4846 → 0.1556).** `[REG-LOCK flick seed]`; the seeded
  crossing velocity falls to under a third and drops out of `[0.3, 4]`.
- **`no hold: velocity still buys overshoot (guard)` — HARD FAIL (1.0198 → 1.0087).** `[DESIGN
  falsifiability guard]`; at ζ0.88 the 3/s seed no longer buys the ≥1% overshoot the guard exists to
  prove, so a DESIGN law's own falsifier goes red.
- **`R-1 dock f_d` — SURVIVES.** 1.5832 Hz sits inside `[1.52, 1.70]`.
- **`R-1 dock zero-seed overshoot` — SURVIVES.** 0.0030 sits inside `[0, 0.03]`.
- **`zero-seed settle <2px` — PASSES on the number, STALE on the label.** It measures **177 ms** under
  the landed pair, inside `[150, 260]` — but the band reads `[REG-LOCK on {0.35, 0.82}]`, a pair the
  tree no longer carries. Re-derivation is owed for the label, not for a red.

**The supersession is NOT benign on physics.** It reds four of 87 at real exit 1: a pair-identity
assertion, a REG-LOCK seed, a DESIGN falsifiability guard, and one MARKS C2 **corpus** row. The two
brackets that DO survive (`f_d`, zero-seed overshoot) are real corroboration that #26's retune stayed
inside the MARKS-C-MUSIC dock-event window — but they are not the whole physics, and the claim that
*both corpus brackets survive* is false: `settle from rest-crossing` is one, and it does not.

**R-2 and R-3 landed byte-exact under #26, verified on disk:** `panel {0.40, 0.71}`
(`springPresets.ts` panel row) and `orb-drop {0.22, ζ1.0}` → renamed **`present`** with the pair
held. **R-1 alone diverged.**

§2.2 closes with *"Nobody re-litigates these constants between here and the FINAL wave set (the R-1
clause)"*, and `FINAL.md:32`'s W-1 seam clause orders the opposite direction of truth-up (*"hand-true
to W-1's shipped values — never the pre-W-1 0.30"*) against a W-1 that #26 executed differently. Two
ratified texts, one landed tree, and the reconciliation is a **spec amendment**.

### 4.5 DISPOSITION — the kernel commit is REFUSED at this seat, with grounds

W-2 hard-precedes #47's kernel commit. A kernel landed against a superseded register pin propagates
into every #47 wave that consumes it — the reversal class the lane text already warns about at α4
(*"do NOT repeat the ⊕⁵⁵ reversal-class error"*). The three options are all above an implement seat:
re-derive all four red rows under the landed pair with #26 as the value source; re-open CHARTER R-1;
or fork the register (forbidden by §3's no-second-authority law).

**Landed at α1: the spec read, the ordering pin, the born-RED census, the R-7 partition, the battery
datum (87/87, exit 0), and the R-1 supersession with its arithmetic and its executed four-gate cost.** The next seat resumes on a
measured base and needs one ruling (§6 OWED-3), not a re-scout.

---

## §5 · VERIFY — real exit codes, this seat, at the close

Every figure below was measured with the command's own exit code. No piped tail's status was read.

```
$ npx vue-tsc --noEmit                          → TSC1_EXIT=0
$ npx vue-tsc --noEmit -p tsconfig.test.json    → TSC2_EXIT=0
```

**vue-tsc 0.**

```
$ npx vitest run                                → BATTERY_EXIT=1
 Test Files  1 failed | 222 passed (223)
      Tests  1 failed | 1956 passed | 5 expected fail (1962)
```

**The battery figure the driver handed this seat has lawfully moved, and the full line is stated with
its act.** The standing figure in the dispatch is `1538 passed | 5 xf`; the tree measures **1956
passed | 5 expected fail**. The act is not this seat's — this seat wrote no `src`, `demo` or `tests`
byte. The +418 is the accumulation of the rows landed between that figure's banking and `074a3d0e`
(the #65/#66/#76 band and the Φ5 component lanes). The **5 expected-fail** count is UNMOVED, which is
the invariant that actually carries.

**The ONE failure is pre-existing at HEAD and foreign to this seat:**

```
FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm >
      the dist-demo it measures is NEWER than every source it is built from
```

It is the standing `boot-graph` dist-staleness failure of record — #46's landing states it (*"1
`boot-graph` this seat's and left RED by design — the driver's `npm run demo:dist:build` greens
it"*), and ⊕⁷² routes it as **RT-40-C**. It reproduces at `074a3d0e` in a tree this seat never wrote
to. Zero-failure standing is therefore held **on this seat's own surface**, and the one open failure
is named with its owner rather than absorbed.

**RE-MEASURED AT THE CURE PASS — the row has FLIPPED GREEN, and the flip is bracketed rather than
quietly adopted.** The figures above are honest for their mid-window instant (window closed 12:59);
at the cure pass they no longer hold:

```
$ npx vitest run tests/gates/boot-graph.test.ts   → BOOTGRAPH_EXIT=0   (Test Files 1 passed, Tests 14 passed)
$ npx vitest run                                  → BATTERY_EXIT=0
 Test Files  223 passed (223)
      Tests  1957 passed | 5 expected fail (1962)
```

The mechanism, measured not assumed: `dist-demo`'s newest file is **13:16:14** and the newest `src/` or
`demo/` source is **13:05:13**, so the build arm's *"dist-demo is NEWER than every source"* assertion
now holds. Another lane ran the rebuild — this unit is doc-only and wrote no `src`, `demo` or `tests`
byte in either window. **The driver should carry the row as RACY, not as CURED:** it re-reds the
instant any lane writes a source byte after the last `demo:dist:build`, which is precisely how it was
RED at 12:59 and GREEN at 13:17. RT-40-C's ownership is unchanged.

```
$ node scripts/gate-register.mjs                → GR_EXIT=0
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**seats:60 · violations:0 · drift:0.** Byte-identical pre and post — this unit is doc-only and moved
no seat. **Zero gates minted.**

---

## §6 · OWED — three narrow rulings, each above an implement seat

**OWED-1 (α0, blocks S-1).** The canon body's §1 THE MATERIAL is written against the pre-`4b1a9733`
disk. Re-authoring its §1.1/§1.2 generated-block schema against the ratified `--glass-veil-*` material
is an AUTHOR act; #78 is ruled LAND-not-AUTHOR. **Who:** the driver, or a design seat under #61
W-DOC-TRUTH (already sequenced *"after #78"*, `EXECUTION-DAG:72`, and already carrying #46's routed
*"DESIGN.md sweep → #61"*). **Falsifier:** the two throws in §2.3 vanish the moment the named tokens
exist.

**OWED-2 (α0, blocks A-1).** The salvaged emitter is marked *"PROTOTYPE — scratchpad only"* at
`:2`, hardcodes `ROOT = … ?? "/Users/mkbabb/Programming/glass-ui"` at `:15`, and resolves `DOC`
beside itself at `:246` — all three break at `scripts/`, on CI, and in any clone. Also: its `BLOCKS`
registry has **6** entries while the body carries **7** `CANON:BEGIN` markers; `ink-series` is
unregistered, so `--check` is structurally blind to it, and its OWED rows are stale — #68 landed
`--ink-seam/edge/perimeter` 0.08/0.16/0.48 and `--fill-hover/selected` 0.05/0.12 into
`src/styles/tokens/color-radius.css`, **not** the `src/styles/tokens/ink.css` the marker names (that
file does not exist). Whether A-1 ships the prototype's blind spot or closes it is a ruling.

**OWED-3 (α1, blocks the W-2 kernel commit).** CHARTER R-1's dock pair `{0.35, ζ0.82}` vs the landed
`{0.30, ζ0.88}`. **Measured cost, executed rather than reasoned (§4.4): the landed pair reds FOUR of
the 87 at real exit 1** — `R-1 dock pair` (identity assertion), `settle from rest-crossing (ms)`
(**MARKS C2 corpus**), `crossing velocity sane (/s)` (REG-LOCK flick seed), and `no hold: velocity
still buys overshoot (guard)` (DESIGN falsifiability guard). Sufficient ruling: **re-derive all four
rows under the landed pair, with #26 W-SPRING-RETUNE named as the value source**, and re-label the
`zero-seed settle` REG-LOCK band, which passes at 177 ms but still names the retired pair. The
direction is the one `FINAL.md:32`'s W-1 seam clause already ordered. **It is NOT free in physics:**
`settle from rest-crossing` is a corpus bracket, and at ζ0.88's 0.30% overshoot there is no measurable
rest-crossing left to bracket — so that row is a corpus question rather than a lock edit, and the
DESIGN guard needs either a new seed or a new band to stay falsifiable. The alternative — re-opening
R-1 — is a design act and re-litigates a constant §2.2 fenced.

---

## §7 · FENCE — what this seat wrote, and what it did not

**WROTE (2 files, both new, both inside this record's own directory):**

```
docs/tranches/BK/execution/2026-08-10-lanealpha-unit1/RECORD.md
docs/tranches/BK/execution/2026-08-10-lanealpha-unit1/PASTE-BLOCKS.md
```

**DID NOT WRITE — every one verified unchanged against the step-0 baseline:** `DESIGN.md` ·
`scripts/**` · `src/**` · `demo/**` · `tests/**` · `docs/design/**` · `docs/canon/**` ·
`.gitmodules` · `package.json` · any committed BK cursor, roster or DAG file. The two fenced
unknown-owner surfaces (`src/styles/glass/material.css`,
`tests/styles/material-css-syntax.test.ts`) were **not opened for write**. No sibling repo was
touched. No git index act: no `add`, no `commit`, no `stash`, no `checkout` — the driver commits.
No browser was opened; every π obligation found in W-2's §7 **enqueues to the singleton seat**.
Zero gate seats minted; zero addenda minted; no committed text was struck, so no dated bracket was
owed by this unit.

### 7.1 The tree at close — concurrent-lane growth, measured and attributed away

`git status --porcelain` went **5 → 17** while this unit ran. Every one of the twelve additions is
another lane's, and the fence is proved rather than asserted by diffing the step-0 baseline against
the close:

- **`src/styles/glass/material.css` — hunk BYTE-IDENTICAL baseline → close** (**374 B** both sides;
  `sha256 5eeaf21c…`, `cmp` exit 0). The fenced unknown-owner surface moved not one byte, by this seat
  or anyone else, in this window. *(The figure first written here was 372 B — that is the `wc -m`
  CHARACTER count; the section carries two multi-byte `π` glyphs, so bytes are 374. The byte-identity
  claim itself re-verified TRUE.)*
- **`tests/styles/material-css-syntax.test.ts`** — still untracked, never opened.
- **`demo/stories/substrates/aurora.vue`** — hunk identical.
- **`demo/stories/foundations/typography.vue`** and **`src/composables/dark/darkModeSyncScript.ts`**
  — hunks CHANGED during the window. Foreign: neither file was opened by this seat, and both are
  named lane parks at `EXECUTION-PROGRESS.md:4428` with owners already assigned.
- **New at close, all foreign, none in this lane's fence:** `MIGRATION.md` ·
  `demo/stories/substrates/_frame/VizStudio.vue` · `src/components/configurator/{Configurator.vue,
  ConfiguratorRow.vue,styles.css}` · `src/components/expandable-container/{ExpandableContainer.vue,
  README.md,styles.css}` · `tests/composables/dark/darkModeSyncScript.test.ts` ·
  `docs/tranches/BJ/coordination/glass-outbound-2026-08-10-atlas-handmark-ack.md` ·
  `docs/tranches/BK/execution/2026-08-10-lanegamma-unit1/`.

This seat's entire footprint is the two files listed above, in one new directory. **Caveat the
driver should carry into attribution: the §5 battery and receipt figures were measured mid-window,
so they are honest for this unit's own surface and are NOT a claim about the other lanes' bytes.**
