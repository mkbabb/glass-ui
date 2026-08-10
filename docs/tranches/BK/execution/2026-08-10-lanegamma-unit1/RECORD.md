# LANE γ — UNIT 1 · γ0 + the #51 atlas ACK dispatch + #49 W0 intake

**Seat** IMPLEMENT · **modelId asserted** `claude-opus-5[1m]` (the assertion gates this
chain; asserted before the first byte) · **date** 2026-08-10 · **base** `074a3d0e`
*docs(BK/coordination): ⊕⁷⁵ #76 addenda-batch back-annotation* · **lane text** the ratified
LANE γ (SUBSTRATE GREENFIELDS, Φ5), read from the workflow journal at seat open.

**Scope, exactly**: γ0's PARK COMMIT SEAT ruling · the #51 atlas ACK dispatch · #49
GF-AURORA **W0 intake only**. **No GLSL was deleted. No #50/#51 W1+ was started.** Later
lane acts belong to later runs.

**SHARED TREE** — this seat ran no `git add`, `commit`, `stash`, or `checkout`. The driver
commits.

---

## §0 · Step-0 baseline (banked BEFORE any byte)

```
BASELINE_FILE=/tmp/bk-lanegamma-baseline-1786380261.diff   (git diff -U0)
porcelain count: 5
```

| path | state | owner |
|---|---|---|
| `demo/stories/foundations/typography.vue` | M | **foreign lane** — untouched |
| `demo/stories/substrates/aurora.vue` | M | **γ (this lane)** — the γ0 subject |
| `src/composables/dark/darkModeSyncScript.ts` | M | **foreign lane** — untouched |
| `src/styles/glass/material.css` | M | **FENCED OUT** (unknown owner; driver's attribution) |
| `tests/styles/material-css-syntax.test.ts` | `??` | **FENCED OUT** (unknown owner; the only untracked path) |

Untracked enumerated (`git status --porcelain --untracked-files=all | grep '^??'`): exactly
one — `tests/styles/material-css-syntax.test.ts`.

---

## §1 · γ0 — the `aurora.vue` PARK COMMIT SEAT · **RULING: COMMIT**

### The subject, verbatim

```
demo/stories/substrates/aurora.vue | 1 deletion
@@ -122,7 +122,6 @@
-        height-class="h-[min(86vh,880px)]"
```

### The ruling

**COMMIT the deletion.** The working-tree bytes stand; this seat wrote nothing to the file
and reverted nothing. Four grounds, each verified on disk this seat:

**(a) The deleted override was a NO-OP restatement of the default it overrode.** At
`80f3455f^` (the #59 pre-cut tree): `VizStudio.vue:54` — `heightClass:
"h-[min(86vh,880px)]"`, and `aurora.vue:125` — `height-class="h-[min(86vh,880px)]"`.
**Byte-identical.** The aurora line never expressed an aspect decision; it restated the
chassis default in the story's own dialect. Deleting it changes nothing that the line
itself was deciding.

**(b) Reverting would NOT restore the status quo ante — it would mint a new opt-out.**
#59 already landed the default change (`VizStudio.vue:58` at HEAD — `heightClass:
"story-stage"`). Keeping the aurora attribute therefore no longer duplicates the default;
it makes aurora the **one** substrate story pinned to a retired dialect, opting out of the
chassis envelope. Nobody ruled that. It is a new decision wearing the costume of a
no-change.

**(c) Committed gate text already asserts the deletion.** `tests/styles/layout-canon.test.ts:404-406`,
committed at HEAD, reads verbatim:

> `// FOUR of seven landed on `--stage-block` in this cut (VizStudio's default,`
> `// aurora, springs, NotFound). The three left — blob, fourier-field,`
> `// configurator — sit in files carrying another lane's uncommitted bytes.`

A revert would make committed text false on disk and would owe a strike-in-place dated
bracket on it — documentary cost paid to restore a duplicate literal.

**(d) The override carve-out does not reach.** `VizStudio.vue:42-50` (committed) reserves
an override for *"a viz whose aspect genuinely differs"* and names `86vh/880` **verbatim**
as one of the eight dialects the one token replaces. Aurora is the plain full-bleed
procedural field — the same shape as blob and fourier-field. It is the dialect, not the
exception.

### CORRECTION to the lane text — refuse-with-grounds, stated not absorbed

The lane text says landing this *"discharges one of K15's last-3 raw-vh remainders (#59's
routing)"*. **The tree contradicts the register.** Per `docs/tranches/BK/execution/2026-08-07-row59-layout/RECORD.md:88`,
aurora was one of the **FOUR CUT**, and per `:206` the **routed last-3** are
`blob.vue:466` · `fourier-field.vue:322` · `configurator.vue:173`. Aurora is #59's
**fourth cut held uncommitted by the γ fence**, not a routed remainder.

Consequence, stated so no downstream row over-claims: landing aurora leaves the routed
remainder at **3, not 2**. Re-derived this seat (`grep -rn "[0-9]\+vh\b" demo/`, filtered
to `height-class`/envelope sites):

| # | site | value | owner |
|---|---|---|---|
| 1 | `demo/stories/substrates/blob.vue:466` | `h-[min(70vh,560px)]` | **γ2 (#50)** |
| 2 | `demo/stories/substrates/fourier-field.vue:322` | `h-[min(72vh,600px)]` | #53 |
| 3 | `demo/stories/containers/configurator.vue:173` | `h-[min(70vh,560px)]` | #56/#59 |

`layout-canon.test.ts:403` `it.fails("kill #15: …")` therefore **stays expected-fail** —
the battery figure does not move on this ruling, and that is the correct outcome, not a
miss.

### The one declared WATCH — named, not waved

Aurora is the **only** demo story binding `scroll-mode="never"` (whole-`demo/` census:
`aurora.vue:125` alone). `Configurator.vue:241` — `const controlsScrolls = computed(() =>
props.scrollMode !== "never")` — renders the controls column as a **plain `<div>`**, i.e.
*the host owns overflow*. The host envelope shrinks from `min(86vh, 880px)` to
`--stage-block` = `min(62svh, 44rem)` (`demo/chassis/layout.css:59`; `min(78svh, 44rem)`
under the one narrow arm at `:81`) — **704px cap → 669px at a 1080px-tall viewport, −211px
(−24%)** against a non-scrolling controls column that drives *every* aurora axis.

**This is checkable, and its check is the very capture this unit enqueues.** The #49
π-ARCHIVE (§3) captures `/substrates/aurora` at the committed height; if the controls
column clips, the archive is the evidence and the reversal is one line — the preferred
cure being `scroll-mode="auto"` at `aurora.vue:125` (restoring the scroll port), **not**
restoring the retired envelope, because (a)-(d) stand regardless. Recorded as a watch on
the archive, not a blocker on the ruling.

---

## §2 · The #51 atlas ACK dispatch — **AUTHORED**

**Artifact**: `docs/tranches/BJ/coordination/glass-outbound-2026-08-10-atlas-handmark-ack.md`

Dispatched at batch open (driver dispatch, not gated on lane position) so W2's close-gate
is already in flight. Authored on the **#85/#76 outbound form** (both cited in its header).
**glass-ui docs only — zero sibling writes**; both atlas trees were read with `git`/`grep`
and left at `dirty: 0`.

What it carries, all detector-verified at this seat:

- **Census**: `atlas` `master` `1e2b911` dirty 0, pins `^6.0.0`/`6.0.0`; `.p-totality/atlas`
  `p/totality` `6dd96b9` dirty 0, pins `^7.0.0`/`7.0.0`.
- **Six `glass-ui/handmark` hits per tree; three real import statements**, enumerated with
  file:line and symbols.
- **One CORRECTION and one AMPLIFICATION to the terminal's own PASS-4 verification**
  (`GREENFIELD-TERMINAL.md:715`) — *not* two corrections:
  - **CORRECTION (path)**: PASS-4 cites `useMarkMorphology.ts:40` **pathless**; the file is
    at `src/motion/` in both trees. It attributes it to **no** wrong directory — the
    `src/platform/composables/` attribution is **withdrawn** (`grep` over
    `GREENFIELD-TERMINAL.md` returns **zero hits**, exit 1; that path is sci-report's, at
    `docs/tranches/BB/BB-AMENDMENT-constellation-modernize.md:385`).
  - **AMPLIFICATION (symbols)**: PASS-4's *"three real import statements"* is **TRUE** and
    is affirmed, not corrected. The **six-symbol** enumeration is **ADDED** by the ACK
    (statements 3, symbols 6 — different things counted).
  - **Scope note**: "pinned 6.0.0" describes the legacy line only — atlas-active is at 7.0.0.
- **Four breaking deltas** with live call sites: `strikethrough`→`strike`
  (`AnimatedRule.vue:124` master / `:105` active) · `shape="path"` CUT
  (`PaperCallout.vue:118` both, `d` produced at `usePaperCallout.ts:154`) · `weight`
  px→dimensionless (the vue-tsc-blind break; feeds at `charts/glyph/HandMark.vue:144`
  `HIGHLIGHT_WEIGHT_VB` and `:151` `bandWeight`) · `HandShape` keeps its name.
- **The units scar named**: `charts/glyph/HandMark.vue:10-16` records that `weight:40`
  already once read as a **viewBox unit** and painted a full-viewBox amber blob. Atlas has
  a prior units-confusion at this exact prop; this cut moves the unit again.
- **Five live props outside the greenfield five-prop surface** (`brush` · `overrides`
  (active only — a mirror divergence) · `animation` · `appear` · `path`), plus the
  clarification that **`clock` is atlas's own wrapper prop, not glass-ui's**.
- **The sequencing law**: `strokeRibbon` publishes at W1 **before** `path` is cut at W2.
- **Three ask rows** (A-1/A-2/A-3), each with a ratified default that holds on silence.

**Gate semantics recorded**: the ACK gates **only W2's sub-close**. Atlas silence is a
disclosed cross-repo hold on that one sub-close — **never a deferral of the wave**.

---

## §3 · #49 GF-AURORA — **W0 INTAKE** (harness-first posture; nothing cut)

### 3.1 · Posture: HARNESS FIRST — declared, not yet built

Existing aurora visual surface on disk (the harness this lane extends, not replaces):
`tests-visual/aurora-arresting.spec.ts` · `aurora-arresting-readback.ts` ·
`aurora-atoms-render.spec.ts` · `aurora-entrance.spec.ts` · `aurora-mediums-substrate.spec.ts` ·
`aurora-painterly-statistics.spec.ts` · `aurora-studio.spec.ts` · `aurora-swraster.spec.ts` ·
`aurora-vibrancy.spec.ts` · `reflect-aurora.spec.ts` · `reflect-aurora-selects.spec.ts` ·
`_aur-vangogh-harness.{html,ts}`.

### 3.2 · **π-ARCHIVE — ENQUEUED, NOT EXECUTED**

**This seat opened no browser.** Per the house law, π captures enqueue to the **singleton
browser seat**.

**Honest state of the enqueue**: `ListAgents` at this seat returned 39 peer sessions and
**no addressable π/browser seat**. The order is therefore banked here as the durable
enqueue record, in the paste-block form, and its status is **ENQUEUED — RECEIPT OWED**.
No archive is claimed, and no capture is asserted anywhere in this unit.

**The order** (the GLSL delete is fenced behind its receipt):

| axis | value |
|---|---|
| route | `/substrates/aurora` (the studio) + the shipped `/aurora` |
| mediums | smooth · oil · oil-pastel · van-Gogh · crayon · kuwahara · metal · metal-gradient (`uMedium` 0-9, `presets.ts:80-100`) |
| presets | all 17 `PRESET_KEYS`; **DUSK + OPENAI_DAWN captured adjacently** (the g3 confusability pair) |
| engines | the WGSL primary **and** the WebGL2 GL arm — the GL arm is the thing being archived |
| themes | light + dark |
| V-A95 rider | π-REVERSE-DRAG observed via **screenshot / computed-style ONLY** — `getContext()` on a live WebGPU canvas steals the context and fakes the black fallback |
| receipt must cite | port · build-freshness · σ≈50 admissibility · oklab paint-arm |
| γ0 watch (§1) | the `scroll-mode="never"` controls column at `--stage-block` — clipped or not |

Seat conditions observed this run: **no dev server listening** (`lsof -nP -iTCP -sTCP:LISTEN`
→ no node/vite), and `dist/` held a **stale Aug-9 build**, dated **Aug 9 04:33**.

*(Corrected at the cure seat.* The original line read *"`dist/` is **empty**"* and is
**false — self-contradicted by the figure pasted beside it**: `total 3288` is 3,288
512-byte blocks (~1.6 MB) of build output. A genuinely empty directory reads `total 0` —
verified at the cure seat against a fresh `mkdir`. The *"two entries, both directory dots"*
observation was a **truncated listing**, not an empty one. What `dist/` actually held was
the **Aug-9 04:33 build**, the same build event the §4.1 `boot-graph` assertion names from
the other side — `dist-demo/index.html … built 2026-08-09T08:33:20.689Z` = **04:33:20
local**. That listing is no longer recoverable: `dist/` was **rebuilt by a later agent at
Aug 10 13:04**, and at the cure seat it reads 226 entries / 4.9 MB, every entry stamped
13:04, with **zero Aug-9 survivors**. Nothing in this unit reads or writes `dist/`; the
correction is to the observation, not to any claim resting on it.)*

The π seat starts its own server and cites the port + build-freshness in its receipt;
neither is asserted here.

### 3.3 · Jury-log — **g7 = NOT-BUILT** (per `docs/tranches/BK/ASK.md:24-25`)

`ASK.md:24-25`: *"If the owner is present at the capture, the eye settles it; if not, the
capture jury records the default against the edict and the row stays reversible in one
word."*

| field | value |
|---|---|
| row | **g7** — the aurora Kuwahara multipass-FBO hinge (BD T19, never presented) |
| fires at | **#49's lane intake (W0 bring-up)** — i.e. here |
| owner present | **NO** |
| jury record | **NOT-BUILT** — the ratified default, recorded against the edict |
| edict cited | performant-penchant + KISS; GF-AURORA's harness-first terminal names no multipass pass |
| **on-disk corroboration (this seat)** | `src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:18-21` — *"`mediumKuwahara` — THE KEYSTONE (Kyprianidis 2010 …); **aurora is a PROCEDURAL field so no FBO** — the operator runs over `sampleBase` over an elliptical kernel oriented along the structure tensor, 4 rings × 8 angular taps = 32 procedural samples, 8 OVERLAPPING sectors blended SOFT by 1/(1+var^q) → no 8-spoke pinwheel by construction"* |
| reversal window | **OPEN** — one owner word revives the build into #49's lane |

The shipped single-pass form is not a compromise standing in for the multipass one: the
file states the procedural field has **no rasterized texture to ping-pong**, so the FBO
apparatus would exist to serve a pass that has no input. NOT-BUILT is the parsimonious
answer and the disk agrees with it.

`g3` (aurora DUSK/DAWN, default **harden-not-delete**) fires **later** — at π-GALLERY,
after the medium-collapse renderer fix. It is **NOT** jury-logged here. Recorded so the
sequence is not collapsed: both presets exist on disk today (`DUSK` and `OPENAI_DAWN` in
`demo/stories/substrates/aurora/presets.ts:720-726`), and the row lands in-wave at the
π-GALLERY capture.

### 3.4 · U-19 — the five-part arm-or-RETIRE intake

Source: `docs/tranches/BJ/addenda/2026-07-24-refinement/PROOF-SWEEP.md:396` (lane C §4),
roster cell `TERMINAL-ROSTER.md:199`. One arm-or-RETIRE line each, **taken at the lane's
intake** as ordered. Every part verified present on disk this seat.

| # | part | on-disk detector | intake disposition |
|---|---|---|---|
| **1** | satin/prism `uMedium 8/9` — slots consumed by `metal`/`metal-gradient` against BD D87's own ruling; D87 called false by BD's critic; never reconciled | `presets.ts:94-100` — *"the two MUTUALLY-EXCLUSIVE metal mediums (`uMedium==8/9`, NOT a finish axis)"*; `glSetup.ts:78` *"Metal-medium knobs (`uMedium==8/9`)"*; `uniformBridge.ts:326`; `uniformBridgeWGPU.ts:149` | **ARM — the greenfield RE-DERIVES the medium roster.** The contradiction is an artifact of the old table, and it **dies with the table**, not with a reconciliation memo. No D87 adjudication is owed |
| **2** | the WGSL stroke cascade (BD T17) | `aurora-mediums.wgsl.ts:28-35` — *"the ~38KB GLSL stroke engine stays the WebGL2 `aurora.frag.ts` full-fidelity register … the full per-dab Starry-Night stroke cascade remains a separate full-fidelity port"*; `:398` | **NAMED-OR-RETIRED AT THE HARNESS CUT** — deferred exactly one wave, to the named trigger, per the roster. The parity claim (*"a `vangogh`/`oil`/`oil-pastel` config on Safari 26 paints painterly, never a silent smooth degrade"*) is a **π claim**, and the harness is what tests it |
| **3** | the `warpMode==3` curl branch (BD T18 ≡ BG D7) | `uniformBridge.ts:121` — `curl: 3, // — opt-in Bridson curl-noise flow warp (the .frag uWarpMode == 3 branch)`; `presets.ts:130-134` — *"never auto-selected by the NOISE atom fan-out (`warpModeFor` stays fbm→hybrid→cellular)"*; **implemented in BOTH engines** — WGSL **primary** `aurora.wgsl.ts:191-193` (`} else if (warpMode == 3) { let fp = p * warpScale + vec2<f32>(t * warpDrift * K_WARP); warp = curlFBM(fp); }`) and GL `aurora.frag.ts:286-292` (same operator, same warp-drift clock) | **NAMED-OR-RETIRED AT THE HARNESS CUT** — same trigger as (2). Standing fact for that cut, **stated with both consumers**: it is **opt-in and never auto-selected**, so it is reachable only by an explicit `warpMode: "curl"` — but it is **NOT GL-arm-only, and it does NOT retire with the GL-arm deletion**. The WGSL primary implements it (`aurora.wgsl.ts:191-193`), so deleting the GL arm leaves the branch **live** in the shipped engine; retiring it is a **separate, explicit act against a live WGSL feature**, and the harness cut must name it as such. **A prior `brush.glsl.ts:345-346` cite is withdrawn** — that line is `uFlowCurl` (`float localCurl = … * uFlowCurl * curlScale`), the stroke-direction curl knob, a **different uniform on a different axis**. Repo-wide the shared `curlFBM` chunk (`composables/glass/webgl/shaders/flow.glsl.ts:48` · `flow.wgsl.ts:37`) has **exactly two call sites**: `aurora.wgsl.ts:193` and `aurora.frag.ts:292` |
| **4** | the Kuwahara multipass-FBO **USER-HINGE** | §3.3 above | **ASK g7 — jury-logged NOT-BUILT, reversal window OPEN.** Lane C §3.5 overrules BC's structural discharge via `ASK.md` g3 (a different question, never presented); this intake is the first presentation |
| **5** | OD-4 texture-parity certification clause (BD T45) | — | **RETIRED** with U-37's device-parity ruling (same trigger-death). Consistent with the driver's standing refusal of the device-matrix class |

### 3.5 · The two standing lane facts, re-derived here (never trusted from a census)

**The GL arm = exactly −2,889 lines at the lane boundary.** Detector:
`cat <the 13 GL-arm files> | wc -l` → **2889**, matching `TERMINAL-ROSTER.md:199` to the
line.

| lines | file |
|---|---|
| 385 | `constants/shaders/brush.glsl.ts` |
| 64 | `constants/shaders/composition.glsl.ts` |
| 79 | `constants/shaders/flow.glsl.ts` |
| 496 | `constants/shaders/mediums.glsl.ts` |
| 116 | `constants/shaders/metal-medium.glsl.ts` |
| 112 | `constants/shaders/oil-modes.glsl.ts` |
| 32 | `constants/shaders/tonemap.glsl.ts` |
| 258 | `constants/shaders/vangogh-medium.glsl.ts` |
| 468 | `constants/shaders/aurora.frag.ts` |
| 11 | `constants/shaders/aurora.vert.ts` |
| 284 | `constants/shaders/aurora-image.frag.ts` |
| 224 | `composables/glSetup.ts` |
| 360 | `composables/uniformBridge.ts` |
| **2889** | **sum** |

**None of these was touched this run.** They are fenced behind the π-ARCHIVE receipt.

**The demand gate is ZERO-aware on disk and must become AMPLITUDE-aware.** Confirmed
verbatim at `src/components/aurora/composables/frameLoop.ts:176-184`:

```ts
function needsAnimation(): boolean {
    if (getReducedMotion()) return false;
    const config = getConfig();
    const driftLive =
        config.nucleiDrift !== 0 ||
        config.paletteDrift !== 0 ||
        config.breathDepth !== 0 ||
        config.warpDrift !== 0;
    if (driftLive) return true;
```

Four `!== 0` tests. A drift of `0.012` reads as live and holds the loop — the largest
steady-state cost, at an amplitude no eye resolves. The cure belongs to a later wave;
recorded here as intake so it cannot be re-discovered.

**The 06-10 owner keep-set is intact on disk** — `CRAYON`, `SPEEDTEST`, `OPENAI_SKY`
(*"Sky"*), `OPENAI_DAWN` (*"Dawn"*) all present in `PRESET_META`
(`demo/stories/substrates/aurora/presets.ts:720-737`). B21's named keep-set is the owner's
own preset ruling and is senior to any later reduction table
(`docs/tranches/AY/audit/USER-AUDIT-2026-06-10.md` B20/B21).

---

## §4 · VERIFY — real exit codes, never a piped tail's

Every command's exit status was written to its own file and read back.

| check | command | real exit | result |
|---|---|---|---|
| typecheck | `npm run typecheck` (`vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json`) | `TSC_EXIT=0` | **0 errors** — log is 4 lines, banner only |
| battery | `npx vitest run` | `VITEST_EXIT=0` | see below |
| gate receipt | `node scripts/gate-register.mjs` | `GATE_EXIT=0` | see below |

**Battery, verbatim:**

```
 Test Files  223 passed (223)
      Tests  1956 passed | 5 expected fail (1961)
```

**Gate receipt, the full line, verbatim:**

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60` · `violations:0` · `drift:0`. Byte-identical to the AFTER line banked at
`docs/tranches/BK/execution/2026-08-09-row66-close/RECORD.md:42`. **This unit moves no
gate.**

### The one figure that differs from the brief — stated with its act

The brief cites the battery standing as `1538 passed | 5 xf`. The tree reads
**`1956 passed | 5 expected fail (1961)`, 223 files**. **This is not a movement caused by
this unit.** The unit's only writes are **three** Markdown files under `docs/`; the battery
does not read `docs/`. The figure was already 1956 at the step-0 baseline, i.e. the brief's
1538 is stale against `074a3d0e` plus the tree's pre-existing foreign dirt. Recorded as a
correction, attributed to the tree, **not** claimed as this unit's delta.

**Zero-failure standing HELD at the unit's own measurement**: 0 failures, 5 expected-fail,
all three checks exit 0. The 5 xf include `layout-canon.test.ts:403` `kill #15`, which §1
rules must stay expected-fail until the three routed remainders land.

### §4.1 · The post-write re-run went RED — and it is provably NOT this unit's

The battery was re-run after the two `docs/` writes to prove no movement. **It moved**, and
the honest record is the whole of it, not the green half.

```
VITEST2_EXIT=1
 Test Files  4 failed | 219 passed (223)
      Tests  4 failed | 1953 passed | 5 expected fail (1962)
   Duration  38.22s     (run 1: 10.17s)
```

Gate receipt at the same moment: **`GATE2_EXIT=0`**, line byte-identical
(`seats:60 … rosterSha256:282d05cf violations:0`).

**The tree changed under this seat.** Porcelain moved **5 → 11** between the two runs; the
new dirt is four foreign `src/`/root paths and the three γ paths:

| path | mtime (local) | attribution |
|---|---|---|
| `src/composables/dark/darkModeSyncScript.ts` | 12:52:05 | foreign lane (was already M at step-0; re-written mid-run) |
| `tests/composables/dark/darkModeSyncScript.test.ts` | 12:52:18 | foreign lane, **new** |
| `MIGRATION.md` | 12:54:50 | foreign lane, **new** |
| `src/components/configurator/Configurator.vue` | 12:56:06 | foreign lane, **new** |
| `src/components/configurator/styles.css` | 12:57:24 | foreign lane, **new** |
| `demo/stories/substrates/aurora.vue` | **2026-08-07T20:42:18** | **untouched today by anyone** — see below |
| `docs/…/glass-outbound-2026-08-10-atlas-handmark-ack.md` | 12:51:55 | **this seat** |
| `docs/…/2026-08-10-lanegamma-unit1/` | 12:54:35 | **this seat** |

**Non-authorship proved three ways, not asserted:**

1. **`aurora.vue` is byte-identical to the step-0 baseline.** Detector: the working diff's
   `+`/`-` lines diffed against the banked baseline's → **no difference**. Its mtime is
   **2026-08-07T20:42:18** — three days old, i.e. #59's seat. This seat added and reverted
   nothing.
2. **This unit's only writes are under `docs/`, and the battery is structurally blind to
   them.** `tests/gates/boot-graph.test.ts:543-554` — `newestSourceMtime()` walks exactly
   `[REPO_ROOT/demo, REPO_ROOT/src]`, nothing else. Repo-wide, only **one** test reads a
   `docs/` file at all: `tests/components/easing.contract.test.ts:793`, and it reads a
   **literal** path — `../../docs/tranches/BJ/coordination/glass-outbound-2026-08-08-easing-consumer-addenda.md`
   — not a glob over the directory. The new `…-2026-08-10-atlas-handmark-ack.md` is
   unreachable from the battery. (The other `docs/` hits in `tests/` are **four**, not
   three, and all are comments: `gates/boot-graph.test.ts:78` and `:92` ·
   `composables/motion/springTokenMirror.test.ts:107` · `styles/layout-canon.test.ts:30`.
   A fifth comment, `easing.contract.test.ts:785`, is the header of the one real read at
   `:793` and is counted with it, not among the four.)
3. **THREE of the four failures re-run GREEN in isolation. The fourth was NOT re-run**, and
   its non-authorship does not rest on a re-run — it rests on the walk and the mtime (below).

| failure | class | isolation re-run |
|---|---|---|
| `tests/components/custom/aurora/atoms.test.ts` — *resolveAtoms total-function fuzz* | `Test timed out in 5000ms` | **exit 0 · 23/23 passed** (run alone) |
| `tests/styles/glass-subtlety.test.ts` — *DISCOVERS its hosts from the mounts* | `Test timed out in 5000ms` | **exit 0 · 36 passed** (in the trio below) |
| `tests/demo/router-field-ownership.test.ts` — *keeps one story-owned field across DockStage route navigation* | `Test timed out in 5000ms` | **exit 0 · 2 passed** (in the trio below) |
| `tests/gates/boot-graph.test.ts` — *dist-demo is NEWER than every source* | **staleness, not timeout** | **NOT RE-RUN** — see below |

**The trio figure, decomposed so it is not read as "the three failures".** The
`3 files / 71 passed` run is `glass-subtlety` (**36**) + `router-field-ownership` (**2**) +
`easing.contract` (**33**) = **71**, exit 0. Only the first two of those three ever failed;
**`easing.contract.test.ts` was added to the run deliberately and never failed** — it is
the one test that reads a `docs/` file (`:793`), so it is the direct check that this unit's
`docs/` writes did not perturb it. Per-file counts re-measured on disk at the cure seat.

**Why `boot-graph` is not re-run.** A re-run would prove nothing about authorship: the
assertion is a *staleness comparison against the newest `src`/`demo` mtime*, so it tracks
whatever the foreign lanes last wrote, not what this unit wrote. Its non-authorship stands
on two facts instead: (a) `boot-graph.test.ts:543-554` walks exactly `[demo, src]`, and
this unit wrote only under `docs/`; (b) the mtime the assertion names — `12:56:42` local —
is the **foreign** `configurator` write window (12:56:06 / 12:57:24), two minutes after
this seat's last write.

Three of four are the same 5,000 ms timeout under a machine running ~**3.8× slower**
(38.22s vs 10.17s wall) with three lanes' batteries in contention. The fourth is not a
timeout and its assertion names its own cause verbatim:

```
AssertionError: dist-demo/index.html is STALE (built 2026-08-09T08:33:20.689Z,
newest source 2026-08-10T16:56:42.084Z) — run `npm run demo:dist:build`
```

`2026-08-10T16:56:42Z` = **12:56:42 local**, which falls between the foreign
`Configurator.vue` (12:56:06) and `configurator/styles.css` (12:57:24) writes — inside
`src/`, inside the gate's walk, and **21 minutes after** this seat's earliest write and
**two minutes after** its latest. `dist-demo/` is a build artifact this unit never
regenerated and never needed to.

**Verdict**: the unit's figure of record is **run 1** — the measurement taken on the
step-0 tree, `exit 0`, `1956 passed | 5 expected fail (1961)`, 223 files. Run 2 is
recorded in full because a green-only record would be the inflation this tranche has
already paid for once; it is **foreign contamination plus load**, and the driver may
re-measure on a quiesced tree at the commit. **No figure in this unit is claimed on run 2,
and no failure in run 2 is this unit's.**

---

## §5 · FENCE — what this unit touched, and what it did not

**WRITTEN (3 files, all `docs/`, all new):**
1. `docs/tranches/BJ/coordination/glass-outbound-2026-08-10-atlas-handmark-ack.md`
2. `docs/tranches/BK/execution/2026-08-10-lanegamma-unit1/RECORD.md` (this file)
3. `docs/tranches/BK/execution/2026-08-10-lanegamma-unit1/PASTE-BLOCKS.md`

**NOT WRITTEN — the γ0 subject.** `demo/stories/substrates/aurora.vue` carries the same
one-line deletion it carried at step-0. The ruling is COMMIT; the bytes were already
correct; this seat added and reverted nothing. **Driver commits.**

**FENCED OUT, untouched, unread-for-edit:** `src/styles/glass/material.css` ·
`tests/styles/material-css-syntax.test.ts` (unknown owner — driver's attribution).

**FOREIGN LANES, untouched:** `demo/stories/foundations/typography.vue` ·
`src/composables/dark/darkModeSyncScript.ts`.

**SIBLING REPOS: ZERO WRITES.** Both atlas trees read-only; both verified `dirty: 0` after
the census. No sibling repo was moved, parked, or stashed.

**NOT STARTED (later runs):** any GLSL delete · #50 GF-BLOB (γ2) · #51 W1+ · the γ3
flood-ceiling wave · `tests-visual/substrate-paints-color.spec.ts` · any export-key motion
(`./blob-config` is Lane β's) · any browser.

**Refusals honored as ratified:** footage · device-matrix · Safari-GUI · physical classes.
U-19 part 5 retires under the device-parity ruling, consistent with the device-matrix
refusal.

---

## §6 · What the next γ run inherits

1. **The π-ARCHIVE order (§3.2) is enqueued and its receipt is OWED.** No GLSL may be
   deleted before it lands. The order includes the γ0 watch as a capture axis.
2. **g7 = NOT-BUILT is jury-logged with the window open**; `g3` is NOT yet logged and fires
   at π-GALLERY, after the medium-collapse renderer fix.
3. **U-19 parts 2 and 3 are named-or-RETIRED at the harness cut** — that cut is the next
   γ1 act, and both parts must be answered in it, not deferred past it.
4. **The K15 routed remainder is 3, not 2** (§1 correction). `layout-canon.test.ts:403`
   stays `it.fails` until `blob.vue:466`, `fourier-field.vue:322` and
   `configurator.vue:173` all land.
5. **The atlas ACK is in flight.** If atlas is silent at W2, that is a disclosed cross-repo
   hold on the sub-close — the wave proceeds on the ratified defaults.
