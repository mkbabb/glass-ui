# BK #33 W-ALERT / W-FEEDBACK-TONE — COMPLETION SEAT (2026-08-08)

Model: **claude-opus-5[1m]** (Opus 5, 1M context) — asserted at seat open, before the first byte.

Seat scope: COMPLETION of lane #33 (TERMINAL-ROSTER row 33 `W-ALERT`, charter
`COMPONENT-WAVES-TERMINAL.md` §ALERT), which has sat UNCOMMITTED in the shared working tree since
2026-08-05 while five consecutive scouts fenced around it. Not a redesign: the lane was designed
and largely implemented in-tree; this seat closes it to green, cures the prose it falsified
elsewhere in `src/`, and banks an airtight census. SHARED TREE — nothing staged, committed or
stashed; the driver commits.

Baseline banked BEFORE the first byte: `/tmp/bk-lane33-baseline-1786239464.diff`
(`git diff -U0`, 157,122 B), at HEAD `727f672327fcd5cdc18e37a43d2da0e15f171bf6`, with
`git status --porcelain | wc -l` = **53** and `| grep -c '^??'` = **4**. The `-U0` baseline cannot
see untracked files, so the four `??` entries were enumerated separately at seat open:
`src/components/slider/styles.css` · `src/composables/motion/morph/eyeglass.ts` ·
`tests/gates/feedback-tint-seam.test.ts` · `tests/gates/tabs-seam.test.ts`.

**The tree moved under the prompt, and re-deriving it was the first finding.** The prompt's lane
order named #40 as a sibling still in flight; at seat open its bytes were GONE from
`git status` — `deck/**`, `carousel/**`, `pager-dots/**`, `surfaces-pager.css`, `package.json`
were all clean. #40 is COMMITTED by the driver. IN-FLIGHT is read off the tree, never off a
prompt or a ledger.

---

## §1 · LANE CENSUS — every dirty and untracked path attributed

Post-seat porcelain: **55** (53 baseline + `src/styles/glass/ladder.css` +
`src/components/button/styles.css`, both clean at baseline and both authored by this seat).

### #33 — THIS SEAT'S LANE (10 paths)

| path | state | whose bytes |
|---|---|---|
| `src/components/_shared/feedback/feedback-tone.css` | M | #33 in-tree + **this seat's header consumer-split bracket** |
| `src/components/alert/index.ts` | M | #33 in-tree, unchanged by this seat |
| `src/components/alert/AlertTitle.vue` | M | #33 in-tree, unchanged by this seat |
| `src/components/alert/AlertDescription.vue` | M | #33 in-tree, unchanged by this seat |
| `tests/gates/feedback-tint-seam.test.ts` | ?? | #33 in-tree, unchanged by this seat |
| `tests/styles/typography.test.ts` | M | #33 in-tree (ONE hunk, wholly the `BK.#33` block) |
| `demo/stories/substrates/glass-material.vue` | M | #33 in-tree (whole diff — π cells 5–7 specimens) |
| `src/styles/glass/ladder.css` | M | **this seat** — 1 hunk, prose only |
| `src/components/button/styles.css` | M | **this seat** — 1 hunk, prose only |
| `src/styles/index.css` | M | **this seat owns HUNK 1 ONLY** (the §7a register block); the other four hunks are FOREIGN and untouched |

The `index.css` split is proven, not asserted: the banked `-U0` baseline holds five hunks for that
file at `@@ -174,0`, `@@ -186,0`, `@@ -191`, `@@ -237,0`, `@@ -245,0` — none within 60 lines of the
§7a block this seat edited at `:105`.

### FOREIGN — other uncommitted lanes, byte-untouched by this seat (45 paths)

- **#32 W-TABS** — `src/components/tabs/SegmentedTabs.vue` · `tabs/styles/drag.css` ·
  `tabs/styles/segmented.css` · `tests/gates/tabs-seam.test.ts` (??) ·
  `demo/stories/navigation/tabs.vue`
- **#35 W-SLIDER** — `src/components/slider/Slider.vue` · `slider/types.ts` ·
  `slider/styles.css` (??) · `demo/stories/forms/slider.vue` ·
  `tests/components/slider.contract.test.ts` · `src/styles/index.css` hunks 2–5 (the §17c slider
  lane block, the slider import, the `track-well.css` reorder, the deck/carousel imports)
- **#71** — `src/composables/motion/morph/eyeglass.ts` (??) · `useSelectionGroup.ts` ·
  `useSelectionIndicator.ts`
- **FOREIGN-UNATTRIBUTED** (no lane claim in this seat's hand; named, not guessed at) —
  `demo/stories/containers/configurator.vue` · `demo/stories/foundations/typography.vue` ·
  `demo/stories/substrates/aurora.vue` · `aurora/sections/AuroraColorSection.vue` ·
  `AuroraCompositionSection.vue` · `AuroraMotionSection.vue` · `demo/stories/substrates/blob.vue` ·
  `demo/stories/substrates/fourier-field.vue` · `src/components/PROCEDURAL-SUITE.md` ·
  `src/components/blob/README.md` · `src/components/configurator/styles.css` ·
  `src/components/handmark/HandMark.vue` · `handmark/texture.ts` ·
  `src/composables/dark/darkModeSyncScript.ts` · `src/composables/dom/useDragVelocity.ts` ·
  `src/composables/glass/procedural/color.glsl.ts` · `procedural/prng.ts` ·
  `src/composables/motion/core/index.ts` · `src/composables/motion/spring/springPresets.ts` ·
  `src/index.ts` · `src/styles/glass/rim.css` · `src/styles/glass/surface-axis.css` ·
  `src/styles/tokens/property-regs.css` · `src/styles/tokens/scale-paper.css` ·
  `tests/components/a11y/coarse-target.test.ts` · `tests/components/a11y/focus-visible.test.ts` ·
  `tests/gates/overfit-structure.test.ts` · `tests/styles/engage-ladder.test.ts` ·
  `tests/styles/glass-subtlety.test.ts` · `tests/styles/radius-role-canon.test.ts` ·
  `tests/styles/typed-track-seam.test.ts` · `vite.library.ts`

**Collision check, run rather than assumed.** `grep -rn "feedback-tone\|alert" src/ tests/ demo/`
over the whole dirty set returns contact with this lane's subject at exactly four sites:
`ladder.css`, `index.css`, `button/styles.css` (all three cured here) and
`tests/styles/radius-role-canon.test.ts:472` — the latter is `G-RADIUS-ROLE`'s Alert row, foreign,
GREEN against this lane's bytes (`rounded-card` present, no `rounded-lg`), and untouched. No other
uncommitted lane writes an alert or feedback-tone byte.

---

## §2 · COMPLETION LEDGER — the roster row, item by item

TERMINAL-ROSTER row 33: *"hard fence: G-FROST-TRANSMISSION green first. G-FEEDBACK-TINT-SEAM
SEATED. **R-3 RULED: neutral glass + status ink** — the tinted plate is not built. + alert breath
(0/0/0 in 77 LOC) + `line-clamp-1` strike + radius parity per E26."*

| # | obligation | disposition | on disk |
|---|---|---|---|
| 1 | **Hard fence: `G-FROST-TRANSMISSION` green first** | **DISCHARGED before this seat** | green on #22's ⊕³⁵ seal; the driver RULED #32/#33/#34/#35 selectable at `EXECUTION-PROGRESS.md:1085-1087`. The five-scout stale-#22 propagation is struck there, not here |
| 2 | **`G-FEEDBACK-TINT-SEAM` SEATED** | **DONE** | `tests/gates/feedback-tint-seam.test.ts`, 3/3 PASS. Binds a PRE-EXISTING roster seat (`gates/ROSTER.md:25`, family SEAM; `2026-08-03-row9-register/SEAT-BINDING.json:264`) — nothing minted, register still `seats:60` |
| 3 | **R-3: neutral glass + status ink; the tinted plate is NOT built** | **DONE** | `alert/index.ts:66-72` — no arm composes `.feedback-tone`. Each toned arm takes `feedback-tone-<name>` (the bare `--tone` register) + `TONED` ink, over the one neutral `.glass-quiet` rung. The four `[--feedback-tone-rung:…]` re-points and all five `[backdrop-filter:var(--glass-blur-wash)]` are gone |
| 4 | **Alert breath (0 hover / 0 transition / 0 spring in 77 LOC)** | **DONE** | `.liquid-enter` on BASE (`index.ts:46`) — the library's universal mount recipe, zero JS, own reduced-motion arm (`glass/liquid-enter.css:42-95, 216-233`). Rest stays material-only per the idle canon; `[--glass-specular-intensity-hover:0]` kills the false hover affordance a `role="alert"` would otherwise inherit from the rung |
| 5 | **`line-clamp-1` strike** | **DONE** | `AlertTitle.vue` — gone, and locked by `tests/styles/typography.test.ts` *"the title is not clamped to one line"* |
| 6 | **Radius parity per E26** | **DONE** | `rounded-card` (= `--radius-card` 16px) on BASE. E26's register is *"Alerts are not rounded like our cards—they should be the same"* (`ARCHAEOLOGY.md:115`) — exact card parity, gated foreign by `G-RADIUS-ROLE` at `radius-role-canon.test.ts:472` |

### The charter's own arms (CWT §ALERT, A-1…A-7)

| id | disposition |
|---|---|
| A-1 tone register defects out of the tint seam | **CLOSED** — `.feedback-tone`'s mix base is `var(--glass-veil, var(--feedback-tone-rung))`. **Token correction, stated:** the charter specified `--glass-plate-tinted`; that token does NOT exist at this HEAD (`grep -rn -- --glass-plate-tinted src/` → **0 hits**). Its successor is `--glass-veil`, the nestable VALUE token `@utility glass-plate` publishes at the element, whose own header (`glass/veil.css:35`) names "a tone-tinted feedback panel" as one of its two intended consumers. The seam is the charter's; the spelling is the tree's |
| A-2 wrong blur rung (`--glass-blur-wash` 1px on a content panel) | **CLOSED** — `.glass-quiet` supplies `--glass-blur-quiet` |
| A-3 radius under the card role | **CLOSED** — see row 6 |
| A-4 opaque `currentColor` hairline | **CLOSED** — bare `border` deleted; the rung's `--glass-border-accent` + rim stack paints |
| A-5 neutral arm misses the on-glass muted re-point | **CLOSED, and by a DIFFERENT arm than the charter predicted.** The charter routed it through `ladder.css`'s `:where(.feedback-tone,.glass-capsule)` `-strong` rung. Under R-3 Alert never composes `.feedback-tone`, so it lands instead on the CONTENT-TIER `:where()` at `ladder.css:199-209`, which lists `.glass-quiet` and re-points `--muted-foreground: var(--on-glass-muted)`. Correct register, one rung softer than the tinted-plate arm — which is right, because Alert's plate is no longer tinted. This is the fact that falsified the `ladder.css` prose cured in §3 |
| A-6 law-10 type ladder absent | **CLOSED** — `--control-text` off BASE, `text-[length:var(--type-body)] font-semibold` on the title, `text-small` on the description; ratio pinned at 1.143 floor / 1.134 @1440 at BOTH pointer classes. Locked by the `typography.test.ts` block |
| A-7 pointer-reactive gleam on `role="alert"` | **CLOSED** — one declaration, see row 4 |

---

## §3 · THIS SEAT'S OWN BYTES — three falsified-prose cures, dated in place

R-3 landing moved Alert OFF `.feedback-tone`. Three committed comments elsewhere in `src/` still
described the old arrangement and were live falsehoods at this HEAD. Each is struck in place with
a dated bracket, per house law; none changes a declaration.

1. **`src/styles/glass/ladder.css:217`** — the on-glass `-strong` block listed the tone-tinted
   plates as *"`.feedback-tone` — Alert / Toast, the AlertDescription caption + mono labels"*.
   Struck: Toast is the one consumer, and `AlertDescription` now takes `--on-glass-muted` from the
   content-tier `:where()` ABOVE, not the `-strong` rung there. (This is A-5's true mechanism —
   §2's row.)
2. **`src/styles/index.css:108`** — the §7a register block read *"Toast / Alert consume it."*
   Struck to the consumer SPLIT: Toast composes `.feedback-tone` (the tinted plate); Alert
   composes only the four `.feedback-tone-<name>` `--tone` registers. The load-order rationale
   ("reads the same `--glass-plate-*` rung tokens") is annotated rather than struck — it survives
   as the no-rung FALLBACK path, while the live mix base is `--glass-veil`.
3. **`src/components/button/styles.css:27`** — *"the tone reads `--feedback-tone-strength` — the
   same knob a destructive Alert reads."* Alert reads it no longer. Struck to Toast; the
   one-grammar claim the sentence exists to make survives intact on Toast.
4. **`src/components/_shared/feedback/feedback-tone.css:1`** — the file's own opening sentence
   ("Shared feedback-tone styles for Alert and Toast") framed the whole 40-line header as
   describing BOTH consumers' plates. One dated bracket after it pins the split so the rest of the
   header reads true: the WASH prose is Toast's; the four `--tone` registers and the full-chroma
   glyph are shared.

No other byte was authored by this seat. The #33 implementation as found in-tree — `alert/**`,
the `feedback-tone.css` seam, the gate, the typography block, the demo specimens — is left exactly
as the lane wrote it, because it was correct.

---

## §4 · STANDING VERIFY — verbatim

```
$ npx vue-tsc --noEmit
EXIT:0
(0 lines of output)
```

```
$ npx vitest run tests/styles tests/components tests/gates
 FAIL  tests/styles/emitted-utility-vars.test.ts > emitted component utilities > routes the emitted transition-duration chain through --duration-fast
 FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the eager graph stays under the modulepreload and byte ceilings
 Test Files  2 failed | 160 passed (162)
      Tests  2 failed | 1543 passed | 5 expected fail (1550)
```

Byte-identical to the banked expectation — the two known reds are #66 (boot-graph) and #85
(emitted-utility-vars). **The boot-graph figure is byte-identical to this seat's own pre-work
baseline run**: `eager graph: 63 modulepreloads + 1 entry = 64 files / 477311 B` before AND after.
This lane adds nothing to the eager graph.

```
$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
```

```
$ npm run build
EXIT:0
{"type":"glass-ui:ready","generation":"b740b602fc2229238553317e35ecf67153b8a053a122060551522cd0664bde06","output":"/Users/mkbabb/Programming/glass-ui/dist","tuple":"js/sfc-css/declarations/relays/styles/fonts/utilities/component-styles"}
declaration entries: projected 61 public entries
```

```
$ npm run demo:dist:build
EXIT:0
✓ built in 1.60s
```

```
$ node scripts/regen-exports.mjs
FAIL-CLOSED CHECK: PASS — every dir classified
SYMBOL-FIDELITY EXISTENCE: 61 sources checked, 0 failed
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

### One OPERATIONAL finding for the driver — the verify order is not free

`tests/gates/boot-graph.test.ts` carries a THIRD leg the banked expectation does not name: *"the
dist-demo it measures is NEWER than every source it is built from"* (`:530-538`, strict
`toBeGreaterThan` over the newest mtime in `demo/` + `src/`, `:504-516`). It has two behaviours and
this seat saw both, so both are recorded rather than merged:

1. **DETERMINISTIC and reproducible.** Edit any `src/` or `demo/` byte after `demo:dist:build` and
   it reds — a third failure (`3 failed | 1542 passed`) that is pure ordering, not a regression.
   This seat tripped it by curing the three prose sites in §3 after its first build. Cure:
   `npm run build && npm run demo:dist:build`, then re-run. **The battery must run the builds
   BEFORE vitest.**
2. **One TRANSIENT, honestly unexplained.** A single later run reported `3 failed | 1542 passed`
   with no intervening `src/`/`demo/` write (only `docs/**`, which the walk does not visit).
   **NOT reproducible: three consecutive re-runs immediately after returned the banked
   `2 failed | 1543 passed | 5 expected fail`, and `find src demo -type f -newer
   dist-demo/index.html` returns EMPTY.** Stated as an observation, not diagnosed, and not
   attributed to this lane's bytes — a strict mtime comparison under a parallel runner is the
   suspect shape, and the next seat that sees a bare third boot-graph red should re-run before
   adjudicating it.

---

## §5 · π / DELTA — OWED, and where it is payable

Not paid at this seat: the browser seat is a global singleton (concurrent lanes hijack each
other's tabs) and live-π is the driver's cadence. The obligation is stated so it is visibly held,
not visibly absent. Charter table, CWT §ALERT §"π / DELTA obligations":

| cell | route | viewport | proves |
|---|---|---|---|
| 1–2 | `/feedback/alert` | 1440×900 DPR2, light + dark | radius, the lost opaque outline, rim, elevation, type ladder |
| 3–4 | `/feedback/alert` | 390×844 DPR3, light + dark | coarse-pointer type ladder (24.6→16px title), the `line-clamp-1` strike |
| **5–6** | **`/substrates/glass-material`** | 1440×900 DPR2, light + dark | **A-1 and A-2 — the only cells that can.** `/feedback/alert`'s substrate measures luminance σ 1.17–1.69 with HF 0.003; a 1→7px blur is invisible there |
| **7** | `/substrates/glass-material` | 1440×900 DPR2, dark | the nested cell — `--glass-cell-backdrop-filter: none` + the `@container style(--glass-backdrop: light)` bucket in one frame |
| 8–9 | `/feedback/alert` | 1440×900 DPR2, light + dark | **WebKit, owed** — payable once the ~249 `@supports (color:color-mix(in lab, red, red))` guards are deleted |

**The demo staging for cells 5–7 is IN TREE and is this lane's** —
`demo/stories/substrates/glass-material.vue` adds the five-arm specimen group plus the nested
floating-host cell, on the one route where `useGlassBackdropLuminance` is wired outside the dock.
The capture is a driver run away; the page it needs no longer is.

**One amendment the charter's DELTA JSON needs.** It asks for resolved `background-color` "with
and without an ancestor `--glass-backdrop: light`", *"the two values must differ in light on all
five arms."* Under R-3 all five arms ride ONE neutral plate, so the correct reading is: the two
values differ in light on the ONE plate, and the five arms are byte-identical to each other in
`background-color` — differing only in glyph `color` and `--tone`. Stated here so the capture is
not adjudicated against a pre-R-3 expectation.

---

## §6 · OPEN, routed — not this seat's to decide

- **`--feedback-tone-rung` now has zero writers in `src/`** (arm (b) of the gate holds it there).
  Keep as fallback or clean-break delete? Charter routes it to `W-DAG-REDUCE` (#21), which
  charters the `_shared/feedback` consolidation. #21 is gated hard on #17, Φ4-UNSTARTED. Held.
- **`ToastTitle.vue:14`** `text-small font-semibold` carries the same utility-font-weight collision
  A-6's fix routes around on Alert. Out of scope, unchanged, named.
- **`class-names.ts:141`** cannot see role radii (`rounded-card`/`panel`/`badge`), so
  `rounded-3xl` and `rounded-badge` silently no-op on Alert as they already do on Card, Toast and
  Dialog. Routed to `W-RADIUS-ROLE`, which owns every role-radius adoption. Not cured here.
- **`G-NO-WHITE-SPECULAR` vs `--glass-material-rim`** — joining the rung moves Alert from exempt
  into that gate's condemned set. W-FROST's to scope. Recorded, unchanged.
- **ASK-27 / OPEN-FM-3 idle breath.** The charter's honest consequence — post-wave Alert has rest
  specular 0 and hover suppressed — is answered here by `.liquid-enter` (arrival), NOT by an idle
  loop. The idle axis stays W-IDLE-BREATH's.

---

## §7 · FENCE

- Shared tree. **Nothing staged, nothing committed, nothing stashed, no `git checkout`, no
  branch.** The driver commits.
- Foreign lanes' bytes (#32, #35, #71 and the 32 unattributed paths) are **exactly as the banked
  baseline left them**; the only files this seat wrote are the four named in §3.
- Gate register **byte-identical** at `seats:60 … rosterSha256:dc05df91 violations:0`. Nothing
  minted: `G-FEEDBACK-TINT-SEAM` binds a seat that pre-existed in `gates/ROSTER.md` and
  `SEAT-BINDING.json`.
- Suite adds **ZERO** failures and subtracts none: the two reds are #66 and #85, both pre-existing
  and both byte-identical to the pre-work run.
- Born-RED provenance is the gate file's own, measured on a pristine pre-cut tree and stated
  verbatim at `feedback-tint-seam.test.ts:34-43` — *(a) RED, the mix base was
  `var(--feedback-tone-rung)`; (b) RED, 4 writers in `alert/index.ts`; run receipt
  `Tests 2 failed | 1 passed (3)`*. This seat did not re-run it and does not restate it as its
  own measurement.
- No masking fallback introduced. `var(--glass-veil, var(--feedback-tone-rung))` is not one: the
  fallback arm serves a no-rung consumer that does not ship, and gate arm (b) forbids anything
  re-pointing it — a stated degenerate, held by an executable, not a hidden failure path.
