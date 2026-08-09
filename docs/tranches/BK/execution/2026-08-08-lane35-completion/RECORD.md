# BK #35 W-SLIDER — COMPLETION SEAT RECORD

**Seat model asserted at open, before the first byte: `claude-opus-5[1m]` (Opus 5, 1M context).**
Opus, as the lane requires. No Fable inheritance.

**Date:** 2026-08-08 · **Lane:** #35 W-SLIDER · **Mode:** COMPLETION (to green + census), not redesign.

---

## §0 · STEP-0 BASELINE, BANKED BEFORE ANY BYTE

| item | value |
|---|---|
| epoch | `1786240373` |
| baseline diff | `/tmp/bk-lane35-baseline-1786240373.diff` (160,353 B, `git diff -U0`) |
| porcelain snapshot | `/tmp/bk-lane35-porcelain-1786240373.txt` |
| untracked snapshot | `/tmp/bk-lane35-untracked-1786240373.txt` (`-U0` is blind to these — enumerated separately) |
| HEAD at open | `727f672327fcd5cdc18e37a43d2da0e15f171bf6` |
| porcelain count | **56** |
| untracked count | **5** — `docs/tranches/BK/execution/2026-08-08-lane33-completion/` · `src/components/slider/styles.css` · `src/composables/motion/morph/eyeglass.ts` · `tests/gates/feedback-tint-seam.test.ts` · `tests/gates/tabs-seam.test.ts` |

**The tree was re-derived fresh, not inherited from the prompt.** HEAD is unchanged from lane #33's
open, so **#33's dirt is still in the tree, pending-commit by the driver** — foreign to this seat and
left untouched. #40 W-PAGER *is* committed (`85c322dd`), so its bytes are absent from the porcelain.
IN-FLIGHT is read off the tree, never off a prompt or a ledger.

---

## §1 · CHARTER, AND WHAT WAS ALREADY TRUE ON DISK

Cursor row (`EXECUTION-PROGRESS.md:3881`) reads `UNSTARTED`; the tree says otherwise — the cut is
**designed and substantially implemented in the working tree**. The seat's job was to find what the
cut had *not* finished, not to re-author it.

Charter items verified DISCHARGED on disk before any edit:

| charter item | disposition | ground |
|---|---|---|
| the 621-LOC carve (#62's list, "this wave owns the file") | **DONE** | `Slider.vue` 850 → 368 ln; `slider/styles.css` created (THE ONE SLIDER LANE), `@import`-ed at `styles/index.css:251` with its §17c manifest entry |
| `glass-scrubber` rename (E38 / RATIFICATION §4) | **DONE** | `SliderVariant = "scrubber" \| "spectrum"`; `standard` has **zero** surviving occurrences in `src`/`demo`/`tests`. The consumer that invented the name (fourier, ×14) no longer references it at all |
| ⊕² loupe constants — k-band [1.15, 2.60] · `--s: 3` clone transformed DOWN · `present` raise seeded 0.13 · exit 0.5× entry | **DONE** | `styles.css` §THE LOUPE: `--loupe-k-max: 2.6` / `--loupe-k-min: 1.15`, `--s: 3` with `scale(calc(var(--loupe-k) / var(--s)))`, `scale: 0.13` seed, `--spring-present-exit-duration` exit |
| ⊕² rider (1) — provenance: velocity keys off `writeVelocityWeight`'s registered `--flex-vel`, **never** a local pole | **DONE** | `useDragVelocity.ts` writes `--flex-vel` at the ratified `FLEX_V0 = 900` px/s through a `FLEX_TAU_MS = 100` one-pole; the second term `--atom-drag-v` is the smear, "two terms, never two engines" |
| S-C — the spectrum's dropped-`backdrop-filter` reset | **DISCHARGED DIFFERENTLY, AND BETTER** | not by deleting the register's `backdrop-filter` (which #22 W-FROST re-authored as the grasp rest-filter seam, `liquid-fill.css:76,82`) but by never composing `.glass-liquid-fill` on the spectrum range at all — "a class that is never applied cannot be un-applied wrongly" |
| S2 hover → 100% legalized | **DONE** | `--liquid-fill-strength: 100%` on `:not([data-variant="spectrum"]):hover .slider-range`, hover-only by ruling (two density authorities would multiply to 60%) |
| A-10 `valueText` | **DONE** | `types.ts` + per-thumb `aria-valuetext`, excluded from `delegatedProps` so it never forwards as an attr |
| A-12 the ONE forced-colors block (binary triad) | **DONE** | `styles.css` `@media (forced-colors: active)` — Canvas track, Highlight fill, CanvasText spectrum edge, and the loupe housing |
| G-SLIDER-INSCRIBE | **NO SEAT OWED** | `BAND-FOLD.md:293` — **CUT → absorbed by G-COARSE-TARGET**, which is exactly what `coarse-target.test.ts` does (percentage-on-the-cross-axis is a pure source read). Register receipt stays byte-identical; **seats +0** |

---

## §2 · COMPLETION LEDGER — FOUR CURES

### CURE-1 (the headline) · THE LOUPE'S FOCUS PULL WAS DEAD IN PAINT

`.glass-loupe-clone` declared

```css
filter: blur(calc(var(--flex-vel, 0) * 0.75px));
```

`--flex-vel` is `@property`-registered **`inherits: false`** with **`initial-value: 0`**
(`styles/tokens/property-regs.css:109-113`), and `property-regs.css` says why, verbatim:

> `inherits: false` is LOAD-BEARING (the subtree-storm bite): a per-frame write invalidates exactly
> ONE element, never a subtree — an inheriting velocity channel would re-paint every descendant on
> every frame. `initial-value: 0` is the still rest (no boost when unwired).

`useDragVelocity`'s `mirror` reaches the **lens** (`.glass-loupe`) and nothing under it. The clone is
a child. So on the clone the property resolves to its registered **initial value 0** — it does not
even reach its own `, 0` fallback — and the blur computed **`blur(0px)` at every velocity, always**.
The `transition: filter` had nothing to transition. The ~120 ms focus pull, one of the ⊕² ratified
constants of this lane, was a **proven-live-DEAD** channel: unreachable by every gate in the tranche,
green in every battery, and invisible without reading the registration.

`--loupe-k` was never affected and that is not luck — an *unregistered* custom property substitutes
its `var()`s **on the element that declares it**, so `--loupe-k`'s live value is baked in on the lens
before the clone inherits the token stream.

**Cured** by publishing that same substitution under a name on the lens, and reading it on the clone:

```css
--loupe-vel: var(--flex-vel, 0);        /* on .glass-loupe */
filter: blur(calc(var(--loupe-vel, 0) * 0.75px));   /* on .glass-loupe-clone */
```

One measurement, one writer, one pole — carried one level down. No second velocity engine, no new
registered property, no new public token.

### CURE-2 · `--loupe-scale` WAS A LITERAL WEARING A TOKEN'S NAME

`scale: var(--loupe-scale, 0.13)` — nothing in `src`, `demo` or `tests` declares `--loupe-scale`. The
file's **own opening law**, written for `--glass-slider-track-background` twelve lines in, is that
"a knob whose only declaration is a fallback is a literal wearing a token's name, and nobody can
retune a fallback." 0.13 is a **ratified constant** (roster: "`present` raise seeded 0.13"), so it is
now written as one: `scale: 0.13`.

### CURE-3 · THREE ARTEFACTS ASSERTED A SPECTRUM LOUPE THAT CANNOT MOUNT

The loupe mounts off `loupeShown = grasping && orientation !== "vertical"`, and `grasping` opens only
`if (held && graspable)` where `graspable = variant !== "spectrum"`. So the loupe is scrubber-only by
construction. Three separate pieces of the cut were nevertheless written for a spectrum loupe:

- `.glass-loupe[data-variant="spectrum"] .glass-loupe-clone { background: … --secondary }` — unreachable;
- `:data-variant="v"` on the loupe span — whose only reader was that rule;
- `<span v-if="graspable" class="glass-loupe-fill">` — a guard that is **always true** when the loupe exists.

**Ruled: strike the three, do not open the spectrum loupe.** Opening it is not a one-line change and
carries a state leak this seat will not ship blind: `grasping` is CLOSED by the grasp carrier's own
`transitionend`, and a spectrum mounts no carriers — so a **vertical spectrum**, which this very cut
adds to the demo (`forms/slider.vue`, "Inverted vertical · spectrum"), would raise `grasping` with
nothing able to lower it and strand it open forever. Unreachable paint that reads like shipped paint
is precisely what gets "fixed" later into that leak, so the ground is written **into the file** where
the next seat will meet it, not only here. Routed as **RT-35A** below.

### CURE-4 · FOUR STALE CROSS-REFERENCES THIS LANE'S OWN FILE-MOVE CREATED

Moving the slider's paint out of the SFC falsified committed text elsewhere. Struck **in place, with
dated brackets**, never rewritten:

| file | correction |
|---|---|
| `src/styles/glass/grasp.css:54` | the two unlayered outranking shorthands are carried by ~~`Slider.vue`~~ → `components/slider/styles.css`. The mechanism is unchanged — that partial is UNLAYERED ON PURPOSE — and the census still reads two |
| `src/styles/tokens/sizing.css:564` | `--slider-touch-target` is read by the coarse rule in ~~`slider/Slider.vue`~~ → `slider/styles.css` |
| `src/styles/theme/radius.css:253` | `--corner-shape-thumb` is `@supports`-gated in ~~`Slider.vue`~~ → `slider/styles.css` |
| `tests/components/a11y/coarse-target.test.ts:72` | assertion message hardcoded `"Slider.vue"` while the file's own `SLIDER` const had been re-pointed — now interpolates `${SLIDER}`, so it can never go stale again |

And one **gate honesty** fix, seats +0: `tests/styles/glass-subtlety.test.ts` asserted
`expect(grasp).toContain("Slider.vue")`. After CURE-4 that literal survives **only inside a
strike-through**, so the check would have been reading struck text and calling it doctrine. It now
additionally requires `grasp` to name `slider/styles.css` — the file that actually carries the
shorthands.

**MUTATION M1, and it bites.** On a **scratch copy** (`cp`, never `git checkout` — the #31 fence
lesson), the true path was struck out of the bracket in `grasp.css`:
`glass-subtlety.test.ts` → **`1 failed | 35 passed (36)`**. Restored from the scratch copy and
verified **byte-exact by sha256** — `8b76de2a8c45b2343870696ebde09316d8cecdd49a88e213ec3f3430e82ba067`
before and after — then green again at **36 passed (36)**.

### GATES: MINTED ZERO

No seat added, no seat removed, no roster edit. Register receipt byte-identical (§4). CURE-1 is
recorded with its **analytic** proof (the registration is on disk and quotable) rather than with a
bespoke detector: a one-property CSS check is exactly the contrived-gate class the standing
abrogation mandate struck, and the register is at its ceiling.

---

## §3 · CENSUS — EVERY PATH ATTRIBUTED

Post-seat porcelain **60**, untracked **6**. The delta off §0's 56/5 is **+4, all this seat's and all
accounted**: `src/styles/glass/grasp.css`, `src/styles/tokens/sizing.css`, `src/styles/theme/radius.css`
— each newly dirtied by a CURE-4 dated bracket and by nothing else — plus this record directory,
`docs/tranches/BK/execution/2026-08-08-lane35-completion/`, the one new untracked path. Every other
path was already dirty at §0.

### MINE — lane #35 (14 paths)

| path | this seat's bytes | pre-existing lane bytes (unchanged by this seat) |
|---|---|---|
| `src/components/slider/styles.css` *(untracked, 481 ln)* | CURE-1 (`--loupe-vel` + its ground), CURE-2 (`scale: 0.13`), CURE-3 (dead spectrum rule struck, ground written in) | the whole ONE SLIDER LANE |
| `src/components/slider/Slider.vue` | CURE-3 (`:data-variant` + `v-if="graspable"` dropped; the one-predicate note on `loupeShown`) | the 850→368 carve, grasp/veil/loupe mounts, the DEV nameless-thumb warn |
| `src/components/slider/types.ts` | — | `scrubber` rename + `valueText` |
| `src/composables/dom/useDragVelocity.ts` | — | the `mirror` host + `--flex-vel` at V0 900 / τ 100 (the ⊕² rider) |
| `src/styles/glass/grasp.css` | **CURE-4** dated bracket (whole diff) | — |
| `src/styles/tokens/sizing.css` | **CURE-4** dated bracket (whole diff) | — |
| `src/styles/theme/radius.css` | **CURE-4** dated bracket (whole diff) | — |
| `tests/components/a11y/coarse-target.test.ts` | **CURE-4** `${SLIDER}` message | the `SLIDER` re-point → `styles.css` |
| `tests/styles/glass-subtlety.test.ts` | **CURE-4** the `slider/styles.css` assertion | — |
| `tests/components/a11y/focus-visible.test.ts` | — | `SLIDER` re-point (1 ln) |
| `tests/styles/radius-role-canon.test.ts` | — | `FORKS` re-point (1 ln) |
| `tests/styles/typed-track-seam.test.ts` | — | `W4_STYLE_SOURCES` re-point + the scrubber rename in the case title |
| `demo/stories/forms/slider.vue` | — | `scrubber` rename ×3 + the new vertical-spectrum cell |
| `src/styles/index.css` — **§17c manifest entry + the `@import` only** | — | the slider lane's wiring |

### FOREIGN — present in the tree, NOT this seat's (and not touched)

Split files are named per-hunk; everything else is whole-file foreign.

- **`src/styles/index.css` — SPLIT.** §7a Toast/Alert bracket = **#33**. The `track-well.css`
  import move (from below `dock/styles/index.css` to above `glass-specular-track.css`) and the
  `deck/styles/index.css` + `carousel/styles.css` imports = **FOREIGN-UNATTRIBUTED**; neither
  touches the slider, whose own import sits ~50 lines later and is order-independent of both.
- **`tests/components/slider.contract.test.ts` — SPLIT.** The whole added case is marked
  `[2026-08-07 · BK #46 GF-TIMELINE]` — a timeline re-home landing *in* the slider's contract file.
  Foreign content on a lane-#35 path; left exactly as found.
- **`tests/components/a11y/coarse-target.test.ts` — SPLIT.** The entire second `describe`
  ("sortable arm") is marked `[2026-08-05 · BK #41 W-SORTABLE]`.
- **#33** (still uncommitted at HEAD `727f6723`): `_shared/feedback/feedback-tone.css` ·
  `button/styles.css` · `glass/ladder.css` · `alert/{index.ts,AlertTitle.vue,AlertDescription.vue}` ·
  `tests/styles/typography.test.ts` · `tests/gates/feedback-tint-seam.test.ts` *(??)* ·
  `demo/stories/substrates/glass-material.vue`
- **#55**: `PROCEDURAL-SUITE.md` · `blob/README.md` · `demo/stories/substrates/blob.vue`
- **#46**: `motion/spring/springPresets.ts`
- **#84**: `tests/gates/overfit-structure.test.ts`
- **#32 (tabs)**: `tabs/SegmentedTabs.vue` · `tabs/styles/{drag,segmented}.css` ·
  `demo/stories/navigation/tabs.vue` · `tests/gates/tabs-seam.test.ts` *(??)*
- **#71 (selection/eyeglass)**: `motion/morph/{useSelectionGroup,useSelectionIndicator}.ts` ·
  `motion/core/index.ts` · `motion/morph/eyeglass.ts` *(??)*
- **unattributed, untouched**: `demo/stories/containers/configurator.vue` ·
  `demo/stories/foundations/typography.vue` · `demo/stories/substrates/aurora*.vue` ·
  `demo/stories/substrates/fourier-field.vue` · `configurator/styles.css` ·
  `handmark/{HandMark.vue,texture.ts}` · `dark/darkModeSyncScript.ts` ·
  `glass/procedural/{color.glsl.ts,prng.ts}` · `glass/{rim,surface-axis}.css` ·
  `tokens/{property-regs,scale-paper}.css` · `tests/styles/engage-ladder.test.ts` ·
  `src/index.ts` (ToggleGroup type exports) · `vite.library.ts` (`embla-carousel-vue` external) ·
  `docs/tranches/BK/execution/2026-08-08-lane33-completion/` *(??)*

---

## §4 · STANDING VERIFY — VERBATIM

See `PASTE-BLOCKS.md` for the literal blocks.

- `npx vue-tsc --noEmit` → **0** (exit 0, zero output lines)
- `npx vitest run tests/styles tests/components tests/gates` →
  **`Test Files  2 failed | 160 passed (162)` / `Tests  2 failed | 1543 passed | 5 expected fail (1550)`**
  — the banked expectation exactly. The two failures are the two banked ones and no others:
  `boot-graph.test.ts` (→ **#66**) and `emitted-utility-vars.test.ts` (→ **#85**).
  **Zero failures added, zero subtracted.**
- `node scripts/gate-register.mjs` → **byte-identical** to the banked receipt:
  `seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0`
- `npm run build` → **GREEN** (the `85c322dd` unblock not regressed)
- `npm run demo:dist:build` → **green**
- `node scripts/regen-exports.mjs` → **`>>> EXACT REPRODUCTION: YES`**, `EXIT 0`

**One standing condition met, not worked around.** Editing source staled `dist-demo` and
`boot-graph` correctly RED'd its "the dist-demo it measures is NEWER than every source it is built
from" arm — a third failure. That is the documented `demo:dist:build`-runs-last-before-verify
condition (#27's ⊕⁴², twice), not a lane failure: rebuilt, and the battery returned to 2/1543/5.
Recorded rather than quietly re-run.

---

## §5 · OWED / ROUTED

- **RT-35A — the spectrum loupe.** DECLINED here with grounds (CURE-3): it needs its own close path
  before it can have a lens, because the grasp carrier's `transitionend` is what lowers `grasping`
  and a spectrum mounts no carriers — vertical spectrum, now demoed, would strand it. A design row,
  not a completion item.
- **RT-35B — the `inherits: false` descendant-read class.** CURE-1 is one instance of a general trap:
  a registered non-inheriting property read on a descendant of its writer resolves to `initial-value`,
  silently, past every source gate. The cohort is `--specular-x/y`, `--specular-intensity`,
  `--veil-x/y`, `--flex-vel`, `--cast-travel`, `--cast-spread`, `--vap-saturate`. Each writer/reader
  pair wants one look. **Routed to #65** (the detector-bind seat) rather than gated here — the
  register is at its 60 ceiling and a one-property check is the contrived class the abrogation
  mandate struck.
- **Device cells → #67**, per charter: the entrance blur sweep (rendered backdrop radius ≈2.3→18px as
  the plate scales 0.13→1.0, adjudicated under LAW 13's refocus clause, **not** an X-G(1) breach) and
  the loupe's mask-over-live-backdrop construction (P-MASK/P-NECK class).
- **The loupe has had no paint verification in this seat.** CURE-1's cure is proved analytically
  (the registration is on disk, quotable) and by the fact that the identical construction already
  works for `--loupe-k`; the *rendered* focus pull is a π item and belongs with the #67 cells above.
  Stated, not inflated into a "live-verified" claim.
- **A-4 rail-species / per-thumb slot**: DECLINE-AT-8.0.0 stands, owner-revivable, untouched.

---

## §6 · FENCE

- **Shared tree respected absolutely.** No `git add`, no `git commit`, no `git stash`, no
  `git checkout`, no branch or worktree operation, at any point. The driver commits.
- **No foreign lane's bytes were altered — PROVED, not asserted.** The §0 baseline diff was split
  per-file and compared against the closing `git diff -U0`:

  ```
  baseline files: 51   final files: 54
  ADDED   + src/styles/glass/grasp.css  + src/styles/theme/radius.css  + src/styles/tokens/sizing.css
  REMOVED (none)
  CHANGED ~ src/components/slider/Slider.vue  ~ tests/components/a11y/coarse-target.test.ts
          ~ tests/styles/glass-subtlety.test.ts
  UNCHANGED (foreign, byte-identical): 48
  ```

  Three added (the CURE-4 brackets), three changed (CURE-3 + CURE-4), **48 foreign files
  byte-identical**, nothing removed. The untracked `src/components/slider/styles.css` — this lane's
  own file, invisible to `-U0` — carries CURE-1/2/3 and was enumerated separately at §0.
- **Mutation restores from scratch copies only** (`cp` to the scratchpad), sha256-verified — the
  `git checkout --` breach disclosed at #31 is the reason, and it was not repeated.
- **No sibling repo touched, nothing parked, nothing moved to `/tmp` but this seat's own logs and
  scratch copies.**
- **No figure minted.** Every constant quoted (k-band, V0 900, τ 100, 0.13, 1.625, 0.6) is read off
  disk or off the ratified roster; the detector counts in §4 are the runners' own words.
