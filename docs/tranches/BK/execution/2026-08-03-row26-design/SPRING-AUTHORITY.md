# BK #26 · W-SPRING-RETUNE — THE ONE SPRING AUTHORITY · TERMINAL DESIGN SPEC

**seat model: `claude-opus-5[1m]`** (declared per BK `PLAN.md` §3 tri-fold law · ⊕¹⁵ model-choice law: this
is mechanical-fanout-adjacent design authoring over an already-adjudicated canon, so Opus, not Fable)
· **HEAD `f7e2d7b7`** (`docs(BK): ⊕²³ row-91 tri-fold verdict …`, 2026-08-03)
· **DOC-SIDE ONLY — zero `src/`, zero `tests/`, zero repo bytes authored. No browser opened.**
· Independent seat: authored without coordination with the parallel #22 seat, per the owner's parallel-prototyping order.

**Row of record.** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:176` — row **26
W-SPRING-RETUNE — the ONE spring authority ⊕²**, Φ5, gates `G-SPRING-HONEST` · `G-SPRING-ONE-JOB`.

**Sources consumed in full this seat** (cited, never restated):
`MOTION-CANON.md` §0–§2 · `WAVES.md:568-640` (the W-SPRING-RETUNE body + its born-RED gate table) ·
`docs/tranches/IOS27-MICRO/FINAL/FINAL.md:24-31` (W-1, the three seams + the LIVE-π OWED clause) ·
`DESIGN-NOW.md:546` (DC-6 → C-4), `:601` (C-5, the `transient` name-grave), `:614` (the §9 routing to this row) ·
`CURES.md` K-4 + §9 (the W-OVERLAY entry rows routed here) ·
`docs/tranches/BK/EXECUTION-PROGRESS.md` ⊕¹¹–⊕²³ ·
`docs/tranches/BK/execution/2026-08-03-momentum-census/MOMENTUM-CENSUS.md` §4 (the `useLeadTrail` disposition).

**Every numeric figure below was re-derived on the shipped solver at this seat** (`@mkbabb/keyframes.js`
`SpringProgress` + `springTimingFunction`, the same two the generator calls), not copied from the canon.
Where the canon's arithmetic and the solver disagree, §0 rules and the solver wins. Marked **⊘** = reproduced
on disk/solver this seat.

---

# §0 · THE ADJUDICATION LEDGER — the four cells where the sources disagree or are wrong

| # | contested | ruling | ground + falsifier ⊘ |
|---|---|---|---|
| **A-1** | `panel`'s peak placement: MOTION-CANON §1 says the band change "moves the peak from **63% to 53%** of the clock" and the §1 table cell reads "**+4.2% at t=0.238s (53% of clock)**" | **BOTH FIGURES STRUCK — the canon's arithmetic is wrong in both cells** | ⊘ solver, `(0.40, ζ0.71)`: at `B=2%` settle **0.38s**, peak **+4.21%** at **t=0.284s = 75% of clock**; at `B=0.5%` settle **0.45s**, same peak at **63% of clock**. So the move is **75% → 63%**, not 63% → 53%, and `t_peak` is **0.284s**, not 0.238s. Falsifier: `t_peak = π/ω_d` where `ω_d = (2π/0.40)·√(1−0.71²) = 11.062 rad/s` → 0.2840s; the numeric probe's 48-stop grid puts the max at stop 30/48 = 62.5%. The two agree to the grid. The corrected cells are what §1 below ships |
| **A-2** | should `panel` re-tune to the *measured* pair `(0.34, ζ0.70)` — the pair the canon's own text says produced the Siri fit (t_peak 238ms) — rather than hold the shipped `(0.40, ζ0.71)`? | **HOLD `(0.40, ζ0.71)`. Pair UNCHANGED; only the band moves** | ⊘ `(0.34, 0.70)` @0.5% → settle **0.38s** / t_peak **0.238s**; `(0.40, 0.71)` @0.5% → settle **0.45s** / t_peak **0.284s**. The measurement is *two* numbers (settle 475ms, t_peak 238ms) and **no second-order spring satisfies both**: their ratio 238/475 = 50% demands a settle band of ≈0.18%, which no row uses. One must be conceded. **The settle is the load-bearing axis** — it is the value every CSS consumer reads as `--spring-panel-duration`, and it is what the eye called "done"; `t_peak` is a 46ms (≈3 frame) interior detail on a curve already carrying the right amplitude. Conceding the settle to win `t_peak` would ship a stroke that stops 95ms early against the frames. Parsimony agrees: holding the pair makes this a **one-field** change |
| **A-3** | `dock`: canon retunes `(0.35, 0.82) → (0.30, 0.88)`; the roster ⊕² pins the disk byte at `(0.35, 0.82)` and says "the 0.30↔0.35 question adjudicates against that byte"; IOS27 W-1 had itself just moved response 0.30→0.35 **with the live-π delta OWED, never captured** | **ADOPT `(0.30, ζ0.88)` — and here is the derivation the canon asserted but never showed** | ⊘ disk at HEAD is `springPresets.ts:109-111` = `response: 0.35, dampingFraction: 0.82` (the roster's byte reproduces; the remembered 0.30 is stale). ζ is **forced**: the three measured damping brackets are [0.85,1.0], ≈0.85, [0.9,1.0] and 0.82 is below all three; 0.88 is inside all three. Response is then decided by the clock, not by taste: ⊘ `(0.35, 0.88)` settles **0.25s** — outside the 150–250ms bracket's working centre and a 14% slowdown on the row that owns every dock morph; `(0.30, 0.88)` settles **0.21s**, i.e. it holds the shipped 0.22s to within one frame while fixing the damping. **The damping cure costs nothing only at response 0.30.** That is why the pair moves on both axes or not at all. ⊕ W-1's uncaptured 0.30→0.35 move is thereby superseded by a *derived* value, and W-1's owed capture folds into this wave's π row (§8 acceptance A-9) |
| **A-4** | `press` "a subtle rebound" (C-4 / DC-6): retune ζ down until the rebound is real, or delete the claim? | **DELETE THE CLAIM. `(0.20, ζ0.80)` UNCHANGED** | ⊘ analytic `M = exp(−ζπ/√(1−ζ²))` at ζ=0.80 = **1.52%**, below the `B=2%` horizon the curve is normalised over, so the emitted `linear()` is monotone (**+0.00%** ⊘) and no re-wording makes it otherwise. LAW 0's forced consequence: at ζ=0.75 the peak is 2.8% and lands at ~90% of a 0.12s clock — a tick at the end of a press, worse than none. A press's liveliness is the volume-preserving squish and `press-drain`, not positional overshoot. Second head of the same defect, ⊘ on disk: `utilities/base.css:181` asserts "At ζ=0.86 `--spring-smooth` settles a press…" — `smooth` is ζ=**0.80** on disk. Both prose blocks die with the rows (§6) |

**Convergent and adopted without re-litigation** (each independently in ≥2 of the sources, disk cells ⊘ this
seat): the six ruled names `press · present · dock · panel · bloom · world` (the `transient` name-grave
holds, C-5 / TR SE-2) · the four deletions `smooth`/`snappy`/`bouncy`/`gentle` · `orb-drop` → `present`
(zero CSS consumers at HEAD ⊘) · `gentle` → `world` retuned 0.82→0.48 · `bloom` minted · `settleBand`
as a row field · the derived `-exit-duration` generator killing the `0.15s` literal · exit = 0.6× entry,
floored 120ms, ceilinged 250ms, fade-led, **never a spring** · the K-4 entry-row mapping (hint = bezier,
menu = `present`, panel-role = `panel`) · the clock-fence arm on `G-SPRING-ONE-JOB` · zero gate-seat mints.

---

# §1 · THE TABLE — six rows, every figure solver-confirmed ⊘

| row | response | ζ | `settleBand` | emitted settle ⊘ | emitted overshoot ⊘ | peak at | **THE ONE JOB** |
|---|---|---|---|---|---|---|---|
| `press` | 0.20 | 0.80 | `0.02` | **0.12s** | +0.00% | — | **The touch answer** — hover glide, tap squish, release, end-stop return |
| `present` | 0.22 | 1.00 | `0.02` | **0.20s** | +0.00% | — | **The anchored materialization** — every overlay/menu/plate/orb birth |
| `dock` | 0.30 | 0.88 | `0.02` | **0.21s** | +0.00% | — | **The coordinated travel** — member FLIP, selection lens, indicator glide |
| `panel` | 0.40 | 0.71 | `0.005` | **0.45s** | **+4.21%** | **63% of clock (t≈0.284s)** | **The fired deploy** — the long axis of an anisotropic stroke, the extent morph |
| `bloom` | 0.42 | 0.90 | `0.005` | **0.37s** | +0.00% | — | **The room-sized growth** — a surface expanding to fill a sheet or a screen |
| `world` | 0.48 | 1.00 | `0.005` | **0.57s** | +0.00% | — | **The world's recession** — under-layer travel on recede/recover, scroll choreography |

**Exactly one row rebounds and it is the fired deploy.** Corpus ceiling is 4.7% on a clip edge;
`bouncy`'s 9.5% was above the entire measured corpus.

**Why four monotone rows is the honest answer, not a bug (LAW 0, restated as the fence the gate checks):**
a peak appears in the shipped curve **iff `M > B`**. At `B=2%` that is ζ<0.78; at `B=0.5%` it is ζ<0.86.
`press` 0.80, `present` 1.00, `dock` 0.88, `bloom` 0.90, `world` 1.00 all sit above their own thresholds.
The table refuses to ship a curve that cannot exist; the register text must say so.

**Why the band is a row field and not a constant (LAW 0b):** 2% of a 0.04 scale delta is 0.0008 — invisible.
2% of a 425px stroke is 8.5px — plainly visible. Small-amplitude rows generate over `0.02`; large-amplitude
rows over `0.005`. ⊘ validation: `panel` @0.5% predicts 0.45s against a measured 475ms (@2% it predicted
0.38s, 20% short); `bloom` @0.5% predicts 0.37s against a measured 350–400ms. Both land inside the
frame-derived brackets the 2% band was missing.

---

# §2 · THE SOURCE SURFACE — three files, and nothing else may hold a spring constant

## 2.1 `src/composables/motion/spring/springPresets.ts` — the root

```ts
export type SpringPresetName =
    | "press"
    | "present"
    | "dock"
    | "panel"
    | "bloom"
    | "world";

export interface SpringPresetRow {
    readonly name: SpringPresetName;
    readonly response: number;
    readonly dampingFraction: number;
    /** The settle band the row's curve + clock are normalised over (LAW 0b).
     *  `0.02` for small-amplitude rows (a press, a plate); `0.005` for
     *  large-amplitude rows (a room-sized bloom, a long stroke, the world). */
    readonly settleBand: 0.02 | 0.005;
    readonly comment: string;
}
```

Rows in table order, with the register text each row's `comment` must carry (this is the ONE string the
generated mirror, the docs table and the demo all derive from — no figure inside it):

| row | `comment` (exact text) |
|---|---|
| `press` | `"A responsive press — a sub-200ms answer that lands dead. The rebound is the squish, and the light is the acknowledgement."` |
| `present` | `"The anchored materialization — an overlay, menu, plate or orb coalescing from its own seed onto a dead landing; the energy is the light that follows."` |
| `dock` | `"The coordinated travel — member FLIP, selection lens and indicator glide sharing one brisk liquid clock."` |
| `panel` | `"The fired deploy — the long axis of an anisotropic stroke, with the one intrinsic overshoot in the table."` |
| `bloom` | `"The room-sized growth — a surface expanding to fill a sheet or a screen, landing without a wobble on a plate that large."` |
| `world` | `"The world's recession — under-layer travel on recede, recover and scroll choreography; a world that overshoots reads as an earthquake."` |

**Fence, retained and now enforceable:** `world`'s ζ stays **exactly 1.0** (the existing `gentle` fence,
re-homed with a reason). **The `[0%,10%]` overshoot fence stays and now has slack of exactly one row.**

**The module header's prose loses every hand-typed figure** and keeps only: the no-second-authority
statement, the per-component-register seam (the ScrubberTimeline precedent, which §7 extends), and the
LAW 0 / LAW 0b sentences. Anything numeric in a comment is a second authority and is deleted.

## 2.2 `src/composables/motion/spring/springProjection.ts` — the band becomes a parameter

`const SETTLE_BAND = 0.02` (`:24`) is **deleted**. `springSettleDurationSeconds` and `springProjection`
take the band from the row:

```ts
type SpringParameters = Pick<SpringPresetRow, "response" | "dampingFraction"> &
    Partial<Pick<SpringPresetRow, "settleBand">>;
```

with `settleBand ?? 0.02` as the default so the Springs-lab free-authoring path (`demo/stories/motion/springs.vue`,
which projects arbitrary `(response, ζ)` pairs) keeps working unchanged. Nothing else in the module moves:
the 48-stop grid, the 0.5ms tick, the 5s ceiling and the 10ms rounding are unchanged, so every existing
`-settle` value for an unchanged row reproduces byte-identically (⊘ `press` 0.12s, `panel`@2% 0.38s both
re-derived at this seat against the committed file).

## 2.3 `scripts/regen-spring-tokens.mjs` — three edits, no new mechanism

1. `generateBlock()` and `generateDurationBlock()` already pass the whole `preset` object into
   `springProjection` / `springSettleDurationSeconds`; with 2.2 landed they carry the band for free.
   **No edit** — this is the payoff of the existing shape.
2. **New `generateExitDurationBlock()`** (§3) + its anchor regex + its guard, following the exact shape of
   `SPRING_DURATION_LINES_RE` (derived `NAME_ALTERNATION`, never a hand list).
3. `INTERACTIVE_SPATIAL_SPRING = "smooth"` → **`"press"`** (canon §1 edit 6: the interactive-spatial default
   is the touch answer; `smooth` is gone).

The mirror block regenerates from the table with zero further edits — including the "Note on the +0.0% rows"
paragraph, which is **rewritten once, by hand, into the marker header** to state LAW 0 as the reason four
rows are monotone rather than as a to-do ("a row to RE-TUNE"). That sentence is the honesty defect's home
and it dies with the retune.

---

# §3 · THE EXIT GENERATOR — the `0.15s` literal's replacement

Emitted per row, immediately after the `-duration` readers, from the same table:

```css
--spring-<n>-exit-duration: clamp(
    0.12s,
    calc(var(--spring-<n>-settle) * 0.6 * var(--motion-tempo)),
    0.25s
);
```

0.6× entry, floored 120ms, ceilinged 250ms — the CURES convergent clause, generated rather than typed.
Solver-derived values ⊘: `press` 0.12s (floored) · `present` 0.12s (floored) · `dock` 0.126s ·
`panel` 0.25s (ceilinged) · `bloom` 0.222s · `world` 0.25s (ceilinged).

**The curve is never a spring.** `--exit-curve: var(--ease-out)` stays exactly as it is
(`motion-registers.css:77`) — an exit must not overshoot past gone.

**Deletion:** `motion-registers.css:75` `--exit-overlay-duration: 0.15s` **dies**. ⊘ six sites at HEAD: the
**four readers** `glass/reveal.css:54, :98, :107, :116` (the `--reveal-exit-clock` writers) re-point to
`var(--spring-present-exit-duration)`; the **two prose cites** `reveal.css:186` and `transitions.css:105`
have their "(150ms)" parentheticals **deleted rather than updated** — a figure in a comment is a second
authority. `--exit-curve` keeps all four of its readers unchanged.

---

# §4 · THE CLOCK FENCE — the `G-SPRING-ONE-JOB` arm (⊕⁴ U-39 lane C)

> **A `--spring-<n>` curve may only be paired with its own `--spring-<n>-duration` /
> `--spring-<n>-exit-duration` clock. A generic `--duration-*` on a spring curve is a fence break.**

Grounds: the `linear()` is normalised over its own settle; replaying it on a foreign clock re-times the whole
trajectory (the measured ~5× CSS-vs-JS t90 compression the parity fix already cured once — and which crept
back in at nine sites). The fence covers **indirect** pairings too: `--transition-liquid-spatial` resolves to
a `--spring-*`, so it carries the same obligation.

**Born-RED census — nine sites, every one ⊘ this seat:**

| # | site | current | after |
|---|---|---|---|
| 1-3 | `components/dock/styles/layer-group.css:287,288,289` | `width/height/translate var(--duration-fast) var(--spring-snappy)` | `var(--spring-dock-duration) var(--spring-dock)` |
| 4 | `components/configurator/ConfiguratorLayer.vue:207` | `grid-template-rows var(--duration-fast) var(--spring-snappy)` | `var(--spring-dock-duration) var(--spring-dock)` |
| 5-7 | `styles/theme/literals.css:19,20,21` | `--animate-fade-in/scale-in/slide-up: … var(--duration-normal) var(--spring-smooth)` | `var(--spring-present-duration) var(--spring-present)` |
| 8 | `styles/theme/literals.css:22` | `--animate-dock-in: dock-in var(--duration-panel) var(--spring-snappy) both` | `var(--spring-dock-duration) var(--spring-dock) both` |
| 9a | `styles/utilities/base.css:143` (`.interactive-item`) | `scale var(--duration-fast) var(--transition-liquid-spatial)` | `scale var(--spring-press-duration) var(--transition-liquid-spatial)` |
| 9b | `styles/utilities/base.css:213` (`.tap-squish`) | same | same |
| 9c | `components/radio-group/styles.css:44` | `scale var(--duration-fast) var(--transition-liquid-spatial)` | `scale var(--spring-press-duration) var(--transition-liquid-spatial)` |

(9a/9b/9c are one class of three sites — canon §1 edit 6, restoring the CSS_t90 == JS_t90 parity the
`base.css` doc-block already claims and the `--duration-fast` clock quietly breaks.)

**The PRM re-alias is untouched** and remains the last `:root` declaration in `scheme-spring.css` — the
source-order argument in that file's comment still holds after the value changes.

---

# §5 · THE RIDER MIGRATION — the exhaustive edit list

Census taken at HEAD ⊘ (`rg -n -g'!scheme-spring.css' -- '--spring-<n>'` over `src/`):
`smooth` **31 refs / 15 files** · `snappy` **75 / 33** · `bouncy` **18 / 10** · `gentle` **5 / 3** ·
`orb-drop` **0** · `press` 3 · `panel` 1 · `dock` 11.
The roster's "~10 sites, not 8" note for `snappy` counted re-homes, not references; the reference count is 75
and is stated here so the wave is not surprised by it.

## 5.1 `smooth` → its two successors

| site(s) | to | why |
|---|---|---|
| `scheme-spring.css:187` `--transition-liquid-spatial` | **`press`** | the interactive-spatial default is the touch answer (§2.3 item 3 regenerates this line) |
| `utilities/btn.css:22` (`scale` leg) | **`press`** (curve + clock) | same register |
| `utilities/base.css:143,213` · `radio-group/styles.css:44` | **`press`** via `--transition-liquid-spatial`, clock per §4 | same register |
| `slider/Slider.vue:369,416` (`--slider-thumb-spring` fallback) | **`press`** | the thumb is a touch answer |
| `styles/transitions.css:48` (`.pane-swap-enter-active`) · `:68` (`.metric-swap-enter-active`) | **`present`** | content materialization |
| `_shared/menu/menu.css:11` (`translate`) | **`dock`** | a menu's own travel is coordinated travel |
| `_shared/disclosure/disclosure.css:95,96` | **`present`** | a disclosure body is a plate arriving |
| `music-staff/styles.css:170` (clef settle) | **`present`** | **#91 seam — see §10** |
| `tokens/motion-registers.css:61,62` (`--enter-menu-spring` / `-clock`) | **`present`** | K-4 ruling ⊕⁵ (the C-5 grave: the constants ride the `present` name) |
| `theme/literals.css:19,20,21` | **`present`** + §4 clock | entrances |
| `theme/bridges.css:340` (`--ease-spring-smooth`) | **DELETED** (§6.2) | |
| `tokens/manifest.ts:45` | re-point (§6.3) | |
| prose-only: `dock/styles/controls.css:67-68` · `dock/styles/controls/tab-button.css:67` · `utilities/base.css:178-185` · `tokens/scroll-tokens.css:120-133` · `tokens/motion-registers.css:45-47` · `springPresets.ts:38` | **rewritten or deleted** | every one carries a stale name and/or a hand-typed figure |

## 5.2 `snappy` → `dock` (travel/indicator) or `present` (entrances)

**→ `dock`** (the control job, measured at 150–250ms = dock's 0.21s):
`tabs/styles/segmented.css:144,145,146,147,279,280` (+ `:33` prose) · `tokens/scale-paper.css:63`
(`--tab-indicator-duration` → `var(--spring-dock-duration)`) · `dock/styles/layer-group.css:287-289` (§4) ·
`switch/styles.css:87` · `dark-mode-toggle/dark-mode-toggle.css:76,77` ·
`timeline/ContinuousMarkers.vue:381-384` · `scroll-progress-rim/styles.css:59-60, 94-95` (**and the
`, 0.44s` / `, ease-out` hand fallbacks are deleted** — a fallback literal is a second authority) ·
`configurator/ConfiguratorLayer.vue:207` (§4) · `music-staff/styles.css:103` (**#91 seam**) ·
`tabs/SegmentedTabs.vue:247` (`readToken("--spring-snappy", …)` → `"--spring-dock"`) ·
`composables/motion/morph/useElementMorph.ts:121` (default `"snappy"` → `"dock"`) ·
`composables/motion/morph/useDragMorph.ts:177` (`springPreset("snappy")` → `"dock"`) ·
`theme/literals.css:22` (§4) · `theme/bridges.css:353` + `scheme-spring.css:212` (`--ease-spring`, **both
deleted**, §6.2).

**→ `present`** (the entrance job, measured dead-critical at 150–250ms):
`tokens/motion-registers.css:53,54` (`--enter-overlay-spring` / `-clock`) · `styles/transitions.css:83`
(`.dock-in`) · `glass/reveal.css:16-17` (prose + the register it names) · `glass/liquid-enter.css:57,66,176` ·
`styles/animations.css:229` (prose) · `styles/view-transition.css:49,58` · `dock/styles/cta-seat.css:64,74`
(the `--cta-seat-reveal-duration` fallback) · `drawer/styles.css:80` (**and its `, 0.4s` / `, ease` hand
fallbacks are deleted**) · `dialog/DialogContent.vue:122` (prose) · `toast/Toast.vue:93` (prose) ·
`select/SelectTrigger.vue:87` (prose) · `configurator/ConfiguratorLayer.vue:142` (prose) ·
`utilities/btn.css:62,70` (the `rotate` leg keeps `--ease-cartoon-punch`; only its **clock** re-points to
`--spring-present-duration`) · `tabs/README.md:53,100` · `completion-seal/*` (**#18 seam — see §10**).

## 5.3 `bouncy` → `panel` (geometry) or `present` (entrance); the ceremony goes to the light

`styles/view-transition.css:41,42` + `tokens/scroll-tokens.css:86,90` (`--vt-ease`/`--vt-duration`) →
**`present`** · `glass/liquid-enter.css:121` (the `--ease-cartoon-punch` fallback) → **`present`** ·
`music-staff/styles.css:231` (settle leg) → **`panel`** (**#91 seam**) ·
`completion-seal/constants.ts:72,80` + `styles.css:7,112,113` + `README.md:41` +
`property-regs-specular.css:79` → **#18 seam** · `theme/bridges.css:342` → **DELETED** ·
`tokens/manifest.ts:45` → re-point · `demo/stories/motion/reveal.vue:65,66,144` +
`demo/stories/foundations/motion.vue:23` → **`panel`** (the demo teaches the one row that rebounds).

## 5.4 `gentle` → `world`

`styles/scroll-choreography.css:66` (`--ease-scroll-spring`) → `var(--spring-world)`; its prose at `:61` and
`:125` (which asserts "ζ ≈ 0.85" against a disk ζ of 1.0 — the third head of the C-4 defect class) is
**rewritten to name the row and carry no figure** · `composables/motion/scroll/useScrollScene.ts:70`
(the "0.85 ≈ the `--spring-gentle` identity" default) → reads `springPreset("world").dampingFraction`, so
the default is derived, never a literal · `theme/bridges.css:343` → **DELETED**.

## 5.5 `orb-drop` → `present` (rename only; constants unchanged)

Zero CSS consumers ⊘. Type-level and prose only: `springPresets.ts` row + header · the K-4 mapping ·
`DESIGN-NOW.md:421`'s chip enter-pair cite (doc-side, #40's cut). **The name `transient` is graved (C-5) and
must not appear as a spring**; ⊘ `rg -n -- '--spring-transient|springPreset\("transient"\)' src` → **0** at
HEAD (the bare word appears 25× in `src/` as ordinary English — "a transient bloom", "a Presence-transient
`$el`" — and is **not** in scope; the grave is on the register name, and A-6 is scoped accordingly).

## 5.6 The typed surfaces — three hand-typed unions die

| site | current | after |
|---|---|---|
| `composables/motion/spring/useSpringMount.ts:37` | `export type SpringPreset = "smooth" \| "snappy" \| "bouncy" \| "gentle"` — a **hand-typed second roster** of names, none of which survives | `export type SpringPreset = Extract<SpringPresetName, "present" \| "panel" \| "bloom">` — derived. `MOUNT_PRESETS` follows from it |
| `composables/motion/morph/useElementMorph.ts:18` | `Extract<SpringPresetName, "snappy" \| "bouncy">` | `Extract<SpringPresetName, "dock" \| "panel">` (canon §1 edit 7) |
| `demo/stories/motion/springs.vue:37,94` | `Exclude<SpringPresetName, "dock">`; `preset = ref<PresetId>("smooth")` | `Exclude` clause unchanged (dock is still taught in the dock lab); seed → `"press"` |

**Consequent public-API break, stated not hidden:** `<DialogContent spring-preset>` / `<DrawerContent>` and
the `data-spring` attribute change their legal values from `smooth|snappy|bouncy|gentle` to
`present|panel|bloom`. Mount-preset mapping: **centred plate → `present`** (the default), **sheet/edge
placement → `panel`**, **full-screen sheet → `bloom`**. No alias, no shim — the no-backwards-compat edict.
Tests carrying the old union (⊘ `tests/components/ui/dialog/dialog-spring.test.ts:24,76,81,89,94,99` ·
`sheet-motion.test.ts:75,152,154,171,174` · `dialog-focus-return.test.ts:41,74` ·
`tests/composables/useSpringMount.test.ts:28` · `tests/demo/springs-story.test.ts:101,155`) re-point in the
same cut; they are the wave's own consequential edits, not a separate wave.

---

# §6 · THE DELETIONS — this wave must subtract at least as boldly as it adds

## 6.1 Four table rows

`smooth` (0.58, 0.80) · `snappy` (0.48, 0.74) · `bouncy` (0.60, 0.60) · `gentle` (0.82, 1.00). Grounds are
the canon's, re-stated in one line each: `smooth`'s job **is** `press`'s at a longer clock, and its other job
is `present`'s · `snappy` is the slowest row in the table calling itself quick (0.44s against a 150–250ms
measured job) · `bouncy`'s 9.5% is above the entire measured corpus, and the exemplars spend the
liveliness budget on the **light** that follows, never on a geometry bounce · `gentle` named a tone, not a
job, and predicted 0.76s against a 500–600ms measurement.

## 6.2 The `--ease-spring-*` alias family — 6 declarations, **zero readers** ⊘

⊘ `rg -n 'ease-spring' src demo tests` returns **only the declarations**: `theme/bridges.css:340,341,342,343,347,353`
and `scheme-spring.css:212`. Two further facts make this a strike rather than a re-point:
`--ease-spring` is declared **twice, in two files** (`bridges.css:353` and `scheme-spring.css:212`) — a
literal second authority inside the wave that exists to have one; and the family is an `@theme` bridge, so it
also mints six dead Tailwind `ease-spring-*` utilities into every consumer's CSS. **All seven declarations
die.** Anything that later wants a spring by utility name reaches the `--spring-*` token directly.

## 6.3 The stale prose and the hand-typed figures

`utilities/base.css:178-185` (the ζ=0.86 claim, C-4's second head) · `scroll-choreography.css:125`
(the ζ≈0.85 claim, its third head) · `scheme-spring.css`'s "a row to RE-TUNE" note (rewritten to LAW 0) ·
the whole "Which easing fits which job" table in the `scheme-spring.css` header, whose five register rows
name four dead springs — **replaced by a six-line job table generated from `comment`**, so the doctrine
table can never again disagree with the roster it describes · every `, 0.44s` / `, 0.4s` / `, 0.34s` /
`, ease` / `, ease-out` hand fallback beside a `--spring-*` reader — ⊘ **17 occurrences in 3 files**
(`rg -n 'var\(--spring-[a-z-]+(-duration)?,\s*[^)]+\)' src`): `scroll-progress-rim/styles.css` 4 ·
`drawer/styles.css:80` 2 · `completion-seal/styles.css` 11 (**#18 seam** — they die with the component if
#18 lands first). Not in this class and **kept**: `dock/styles/cta-seat.css:64,74`, which falls back *to* a
spring token, not away from one ·
`tokens/manifest.ts:45`'s `"--spring-smooth", "--spring-snappy", "--spring-bouncy"` → the manifest's motion
domain re-points to `"--spring-press", "--spring-present", "--spring-dock"`.

## 6.4 Two root-barrel exports (§7)

**Net:** 4 rows + 7 alias declarations + 1 exit literal + 14 hand fallbacks + 3 hand-typed unions +
2 barrel exports removed, against **1 new row** (`bloom`), **1 new row field** (`settleBand`), **1 new
generated token family** (`-exit-duration`, 6 lines, generated) and **1 gate arm**. Subtraction wins on
every axis except emitted-token count, where six rows × four token families replaces eight rows × three.

---

# §7 · `useLeadTrail` — the momentum census's strike-or-wire, RULED

`MOMENTUM-CENSUS.md` §4 gives the row a disjunction ("reaches its named second consumer, the dock, or is
struck") and forbids exactly one outcome: *leaving a one-consumer root export standing while the roster row
reads as satisfied.*

⊘ reproduced at this seat: the only import is `pager-dots/composables/usePagerWorm.ts:19` (used `:167`);
`rg -n useLeadTrail src/components/dock` → **0**; it is re-exported from `src/index.ts:508-514` and
`composables/motion/core/index.ts:50`, and listed in `tests/public-surface.spec.ts:234`.

**RULING — the export is the overfit, not the mechanism.** The composable **relocates** to
`src/components/pager-dots/composables/useLeadTrail.ts`, beside its one consumer, and **both barrel exports
die** (clean break, no alias; the public-surface row is removed in the same cut). This is not a third
outcome smuggled past the census's disjunction — it *is* the strike, applied to the thing that was actually
unearned. The mechanism keeps painting the goo-morph worm the liquid-weight edict demands; nothing
regresses visually; and if #47 GF-DOCK wants the worm grammar it promotes the file back on merit with two
consumers, which is the bar.

**And it closes a spring-authority leak this wave exists to close** ⊘: `useLeadTrail.ts:41-43` hard-codes
`LEAD_RESPONSE = 0.68`, `LEAD_DAMPING = 0.64`, `TRAIL_TAU_S = 0.27` — a **third** set of spring constants,
off the table, at ζ=0.64 (M = 7.4%, above the measured corpus ceiling). Relocated, they become a **named
per-primitive register** declared in `pager-dots/constants.ts` beside `PAGER_NECK_GIRTH`, under the seam
`springPresets.ts` already sanctions for the ScrubberTimeline legs — a documented per-primitive default,
JS-only, no `--spring-*` token. The seam is legal; an anonymous literal in a root-exported composable was
not.

**What this wave does NOT do:** retune the lead pair. The worm was tuned by eye and is paint-verified;
re-pointing it at `dock` blind would move a shipped goo-morph with no capture to justify it. The retune
question is banked as an **OWED paired capture** routed to **#40** (pager/goo-morph) with **#10** holding
the browser seat, and the target stated so the capture can decide it: *does the lead re-point to
`springPreset("dock")` (0.30, ζ0.88), or does the per-primitive pair stay and earn its comment?* Naming the
question with its falsifier is the honest close; asserting either answer here would be the inflation class.

---

# §8 · GATES + ACCEPTANCE — two seats, both already budgeted, zero mints

**`G-SPRING-HONEST`** — *A preset's register text may mention rebound iff `M > B` for its own row. Presets
are regenerated from the table, never hand-edited.*
RED at HEAD ⊘ on four rows (`springPresets.ts:120` "a subtle rebound" at ζ=0.80 where M=1.52% < B=2%;
`base.css:181` ζ=0.86 against a disk 0.80; `scroll-choreography.css:125` ζ≈0.85 against a disk 1.0;
`scheme-spring.css`'s own "a row to RE-TUNE" note). GREEN when the mirror is a fixed point and no `src/`
comment outside the generated mirror contains a spring figure.

**`G-SPRING-ONE-JOB`** — *No two rows own the same job; every row has ≥1 rider.*
RED at HEAD ⊘ (`orb-drop` 0 CSS riders; `panel` 1; `smooth`/`press` and `snappy`/`dock` duplicate jobs).
**+ THE CLOCK ARM (⊕⁴ U-39 lane C, seats +0):** *a `--spring-<n>` curve — directly or through
`--transition-liquid-spatial` — pairs only with its own `-duration`/`-exit-duration` clock.* RED at HEAD on
the nine sites of §4.

**Acceptance checks — every one falsifiable, in landing order:**

| # | check |
|---|---|
| **A-1** | `node scripts/regen-spring-tokens.mjs` runs clean; `npx vitest run tests/composables/motion/springTokenMirror.test.ts` green — the committed `scheme-spring.css` is a **fixed point** of the generator (the existing gate, unchanged, now over six rows) |
| **A-2** | the mirror block on disk reads exactly the six settles of §1: `0.12 / 0.20 / 0.21 / 0.45 / 0.37 / 0.57`s and the six overshoots `+0.0 / +0.0 / +0.0 / +4.2 / +0.0 / +0.0` % |
| **A-3** | `rg -n -- '--spring-(smooth\|snappy\|bouncy\|gentle\|orb-drop)' src demo tests` → **0** |
| **A-4** | `rg -n 'ease-spring' src demo tests` → **0** |
| **A-5** | `rg -n -- '--exit-overlay-duration' src` → **0**; `rg -n '0\.15s' src/styles/tokens` → **0** |
| **A-6** | `rg -n -- '--spring-transient\|springPreset\("transient"\)\|"transient"' src/composables src/styles` → **0** (the C-5 name-grave holds on the **register name**; the bare English word is out of scope, §5.5) |
| **A-7** | the §4 fence: `rg -n 'var\(--duration-[a-z]+\)\s+var\(--(spring-\|transition-liquid-spatial)'` over `src` → **0** |
| **A-8** | `npx vue-tsc --noEmit` clean **and** `npx vitest run` green — the three re-pointed unions (§5.6) compile and the dialog/sheet/springs-story suites assert the new values |
| **A-9** | **π / paired capture, the one browser-seat obligation.** `docs/tranches/BK/execution/2026-08-03-row26-design/evidence/` carries a pre/post pair on **(a)** the dock morph at `/dock/overview` (this discharges W-1's LIVE-π OWED row, `IOS27-MICRO/FINAL/FINAL.md:31`, which never captured its own 0.30→0.35 move), **(b)** a `panel` deploy, **(c)** a `.tap-squish` press. Each carries UA + mode + build freshness (K-12's P0 stamp) and a `getComputedStyle` figure table. Observed by screenshot + computed style only — never `getContext()` on a live canvas. **Owned by #10, which holds the singleton seat; this wave does not claim closure without it.** |
| **A-10** | **conditional on #71.** If `scripts/regen-design-canon.mjs` exists at this wave's cut, `node scripts/regen-design-canon.mjs --check` exits **0** after the re-emit. ⊘ **it does not exist at HEAD** (`ls scripts/` this seat), so the check is stated with its precondition rather than asserted; if #71 lands after this wave, the re-emit is **#71's** to run and this row is its precondition, not its blocker. Recording it either way is the seam, not a deferral |

---

# §9 · LOC + THE RELAY CENSUS

**LOC.** `springPresets.ts` ≈ −45 net (four rows out, one in; the header's figure-carrying prose deleted) ·
`springProjection.ts` +4 / −1 · `regen-spring-tokens.mjs` +26 (the exit block + its anchor + its guard) ·
`scheme-spring.css` regenerates: −2 curves, −4 settles, −4 readers, +6 exit readers, and the header's
easing-doctrine table −45 → +8 · `bridges.css` −7 · `motion-registers.css` −2 · rider re-points are
in-place (≈130 lines touched, ≈0 net) · `useLeadTrail.ts` moves 0 net across a directory boundary,
−9 barrel/public-surface lines. **Net ≈ −120 lines and −2 authorities** (the `--ease-spring*` bridge family,
and the hand-typed `SpringPreset` union).

**Relay census ⊘ — measured at this seat, four consumer repos** (`~/Programming/*/src`), because
`G-RELAY` makes an uncensused break a landing failure:

| repo | tokens used | count |
|---|---|---|
| `atlas` | `--spring-snappy` (7), `--spring-smooth` (5), `--spring-snappy-duration` (3) | **15** |
| `speedtest` | `--spring-snappy` (15), `--spring-bouncy` (8), `--spring-smooth` (3), `--spring-smooth-duration` (1) | **27** |
| `slides` | `--spring-smooth` (4) | **4** |
| `bbnf-buddy` | `--spring-snappy` (2) | **2** |

All four break. Under the consumer-updates ruling that is correct and expected: **no alias ships**; each
consumer adopts via a marked addendum in its own tranche, using the §5 mapping (`smooth`→`press` for
interactive scale legs / `present` for entrances; `snappy`→`dock` for travel / `present` for entrances;
`bouncy`→`present`). Noted so nobody mistakes them for ours: ⊘ `speedtest`'s `--spring-crisp` (5) and
`slides`' `--spring-deck` (12) are **consumer-local mints**, not glass-ui rows, and this wave neither
owns nor breaks them.

---

# §10 · SEAMS, ROUTED, OWED

| seam | ruling |
|---|---|
| **#18 · completion-seal** | ⊕²(i): #18's completion-seal delete lands **BEFORE** the table cut, so those riders die free. ⊘ the roster's "`bouncy`'s only rider" is imprecise — `bouncy` has **18 refs / 10 files** at HEAD, of which 6 are completion-seal's; the other four homes (`view-transition.css`, `scroll-tokens.css`, `liquid-enter.css`, `music-staff`) are re-pointed by §5.3 regardless of #18's order. **If #18 slips, this wave re-points completion-seal's six sites and #18's delete removes them; no ordering deadlock either way.** |
| **#91 · music-staff (IN-FLIGHT, ⊕²³ CURE-REQUIRED)** | four sites (`styles.css:103, 170, 195/204, 231`) ride `snappy`/`smooth`/`dock`/`bouncy`. `:195/:204` already ride `dock` and need **no edit**. The other three are named in §5 with their targets. **One owner per file per cut:** if #91's cure batch is open, #91 lands the three re-points using §5's mapping and this wave does not touch `music-staff/`; the mapping is the value source either way. |
| **#71 · W-DESIGN-CANON** | the canon emitter is #71's deliverable and ⊘ absent at HEAD. A-10 states the check with its precondition. #71's canon §4/§6 spring rows derive from this wave's table; **this wave lands first and is the value source.** |
| **#89/#90 · W-OVERLAY** | CURES §9 routes here: the entry-row re-point (`--enter-overlay-spring` → the role table's rows), the `-exit-duration` generator, and `--enter-menu-spring` smooth→**`present`** (⊕⁵, C-5). **All three land in this cut** (§3, §5.1, §5.2). The role-level assignment (hint = bezier · menu = `present` · panel-role = `panel`) is W-OVERLAY's to *bind*; this wave only guarantees the rows exist and are correct. The `--enter-overlay-scale` 0.94→0.85 and `--enter-menu-scale` 0.96→0.85 moves are **W-OVERLAY's**, not this wave's — they are geometry, not physics. |
| **#40 · pager/goo-morph** | the `useLeadTrail` lead-pair retune question + its owed capture (§7). |
| **#47 · GF-DOCK** | may re-promote `useLeadTrail` to a shared morph primitive on merit (two consumers), after §7's relocation. |
| **#10 · π-SUITE** | A-9's three paired captures, including W-1's inherited debt. It holds the singleton browser seat and is never co-batched. |
| **#61 · W-DOC-TRUTH** | the A-1 arithmetic corrections (MOTION-CANON §1's `panel` cell: `53%` → `63%`, `t=0.238s` → `t≈0.284s`, "63% → 53%" → "75% → 63%") are doc-truth rows against the canon text; the **table** in §1 above is this wave's value source and needs no canon edit to land. |
| **#77 · momentum census** | §7 discharges its `useLeadTrail` row; re-run its §1 detectors after this cut. The wave is honest that it moves **no** component out of RED on its own — the engagement ladder is #27's, and a spring retune is not breath. |

---

# §REJECTED — with the falsifier that killed each

| rejected | falsifier |
|---|---|
| lower `press`'s ζ until the rebound is real | LAW 0 ⊘: at ζ=0.75 the peak is 2.8% arriving at ~90% of a 0.12s clock — a late tick, the worst of the three reads. The claim dies, not the damping (A-4) |
| re-tune `panel` to the measured `(0.34, ζ0.70)` | ⊘ settle 0.38s against a measured 475ms; no second-order spring satisfies both measurements (A-2) |
| keep `dock` at `(0.35, ζ0.82)` because that is the disk byte | ζ0.82 is below **all three** measured damping brackets; and ⊘ `(0.35, 0.88)` costs 0.25s — the damping cure is free only at response 0.30 (A-3) |
| ship the canon's "peak at 53% of clock" figure | ⊘ solver + `t_peak = π/ω_d` both say 63% at `B=0.5%` (A-1) |
| keep `--ease-spring-*` as a deprecation surface | ⊘ zero readers, a duplicate declaration across two files, and six dead Tailwind utilities minted into every consumer's CSS; no-backwards-compat is the edict |
| alias `smooth`/`snappy` to their successors for the four consumer repos | consumer dependence never preserves an obsolete API; the census is measured (§9) and the addenda are the mechanism |
| a `settleBand` constant kept global at 0.02 with a per-consumer override | the band is a property of the **job's amplitude**, which is the row's property; a per-consumer override is the second-authority disease with better manners |
| strike `useLeadTrail` outright | it is the live driver of a paint-verified goo-morph worm; the census's target was the unearned **export**, and §7 strikes exactly that |
| re-point `useLeadTrail`'s lead pair to `dock` in this cut | no capture; retuning shipped paint from a doc-side seat is the live-verify inflation class. Banked with its falsifier to #40/#10 (§7) |
| mint a `G-SPRING-CLOCK` gate seat for §4 | the budget is exactly 60, add-one-retire-one; the fence is an **arm** on `G-SPRING-ONE-JOB` (⊕⁴ U-39 lane C, seats +0) |
| use the `transient` name for the materialization row | C-5 name-grave + TR SE-2; ⊘ `rg '\btransient\b' src` → 0 and A-6 keeps it so. `present` is owner-reversible in one word |
| defer the exit-duration generator to W-OVERLAY | CURES §9 routes it **here**; a wave that leaves a `0.15s` literal standing has not landed the one spring authority |
| author this spec through DesignSync | ⊘ ruled at `DESIGN-NOW.md` §7 (both arms concordant, ratified): DesignSync is a **sync channel for component authoring**, not a prose-authoring instrument; the correction is banked at #11 (`PROCESS-CURE` L-series). This spec is a design ruling over an adjudicated canon, banked as the deliverable |

---

**What this row delivers:** the six-row table with every figure re-derived on the shipped solver ⊘ · four
adjudications where the sources were wrong or silent, each with the arithmetic that decides it · the
`settleBand` plumb-through · the exit generator that kills the `0.15s` literal · the nine-site clock fence
with its born-RED census · the exhaustive rider migration by file and line · six classes of deletion ·
the `useLeadTrail` disposition with its owed capture named · ten falsifiable acceptance checks · the
four-repo relay census · nine seams routed.

**What it does not deliver, by hard wall:** any `src/`, `tests/` or script byte · any paint capture (A-9,
routed to #10) · any edit to another row's files, including the cursor and the DAG.
