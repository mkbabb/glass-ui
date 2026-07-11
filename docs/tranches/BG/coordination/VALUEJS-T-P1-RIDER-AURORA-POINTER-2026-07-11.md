# VALUEJS-T-P1-RIDER — the aurora pointer-interactivity ask (T-38, OWNER-ORDERED 2026-07-11)

**To**: the glass-ui BG/BH inbox (`tranche/BG` → the joint 5.0.0). **From**: value.js Tranche T.
**Class**: **RIDER on the standing P1 packet** (`VALUEJS-T-ASKS-2026-07-09.md` P1, "AURORA BOOT
+ FIELD QUALITY" — the pointer-door HONESTY row), **escalated from book to OWNER ORDER**.
**Window**: W-3 (behavior; land early — value.js sees it live via the `file:` pin).
**Stamped HEAD**: glass-ui **`b4c1998c`** (`tranche/BG`), cites re-verified live at this HEAD
2026-07-11. Self-contained — readable without the parent letter.

---

## §1 The owner's verbatim order (value.js `MANDATE-2026-07-06.md §0.6`, 2026-07-11 audit)

> The mouse interactivtiy of the background aurora is not extreme enough or noteworthy enough
> and should be relayed to glass-ui.

Encoded as value.js **T-38** (PRODUCER class — an owner-ORDERED relay). The prior state of this
ask was the F-10 pointer-retune **book** (the S-era finding your L19-base door consumed against);
the owner's word upgrades it: the pointer response as shipped is not perceptible enough to
register on the live demo, and the cure is yours by the root-cause law (E-2: component-level
items at the root).

## §2 The door/consume assay (why this is NOT a consumer-tuning problem)

**What the door ships at `b4c1998c`** (all cites re-verified at this HEAD):

- `setCursor(x, y, strength)` → the eased cursor model
  (`src/components/custom/aurora/composables/cursorModel.ts` — `CURSOR_POS_LERP 0.22` `:15`,
  `CURSOR_STRENGTH_LERP 0.18` `:16`, `CURSOR_DECAY_PER_FRAME 0.992` `:17` ≈ 2s half-life)
  feeding the continuous field swirl.
- `injectCursorVelocity(dx, dy)` (AW.W8.1) → the transient swirl-burst
  (`CURSOR_BURST_DECAY_PER_FRAME 0.96` `:32`, ≈1s ease-out), PRM early-out at the write path.
- `interactivity: { light?: boolean }` (`composables/atoms.ts:90-92`, atom threaded `:139` /
  `:355-357` — "ONLY the wired axes ship") → the movable impasto light (cursor-as-light +
  idle orbit).

**What the consumer already consumes** (value.js `demo/color-picker/composables/boot/
useAtmosphere.ts`, verified at our HEAD): **everything.** Window `pointermove` →
`setCursor(x, y, 0.45)` (`ATMOSPHERE_POINTER_STRENGTH`, `:49`, applied `:282`) + per-move
`injectCursorVelocity` (`:284`); `pointerleave` → `clearCursor()` decay-to-rest (`:292`);
`interactivity: { light: true }` armed in the default atoms; medium `smooth`. **There is no
unconsumed producer knob left** — the only consumer-side dial is the 0.45 scalar, and a scalar
cannot cure axes that don't render.

## §3 The two dead axes (the P1 pointer surface, named)

On the **`smooth` medium** — the atmosphere's shipped register — F-10's finding stands
owner-confirmed:

1. **The swirl axis is perceptually DEAD**: the smooth field integrates the eased-cursor swirl
   away — a moving pointer produces no legible field response.
2. **The velocity-burst axis is perceptually DEAD**: a fast flick's `injectCursorVelocity`
   burst does not visibly perturb the smooth field either.

The **light lean** is the only visible response, and it is subtle. So the consumer's full,
correct consume of the entire shipped door renders as "not extreme enough or noteworthy
enough" — the owner's exact words. Evidence lane: value.js `audit/lanes/t-aurora-boot-active.md`
(F-10/F-13); the fresh assay: `audit/t33-research.md §7`.

## §4 The ask (three honesty arms + one sizing atom)

1. **Honesty arms (F-10, now owner-backed)** — at least one of, ideally the set:
   (a) **light** = a cursor-LOCAL luminance lean that visibly reads on smooth fields (not the
   global wash); (b) **burst reaches the domain-warp path** so a flick VISIBLY perturbs the
   field on every medium; (c) **medium-gated interactivity atom types** — the smooth medium
   honestly declares which axes it can speak, so a consumer arming a dead axis is a type error,
   not a silent no-op.
2. **A sized AMPLITUDE atom** — `interactivity: { light, strength?, radius? }` (or kin) so the
   consumer can dial "noteworthy" without forking constants. Sizing discipline: the **T-26
   bracket grammar** (the same judged-by-eye bracket the variance atoms L2/A3 ride — the
   consumer supplies bracket frames on ask).
3. **GAP-ARM arm-replay first** (already P1's first item, still live at your `useAurora.ts`
   arm/watch/construct seam): the pointer response must be judged on a field that has actually
   ARMED — the replay is the precondition for any honest retune.

**Fence**: no demo workaround exists or will be minted — a demo-side shader fork is the named
anti-pattern (PR-2); the consumer's one legitimate pre-landing move (the 0.45 scalar) cannot
cure dead axes. The value.js **W2-5 pointer retune stays DEFERRED** until this lands; the row
is **verify-at-cut at value.js T.W7** against a fresh dist build (G-CUR-1 discipline).

## §5 Record

Dispatched per the standing relay law: path-scoped single-file commit on `tranche/BG`, no
force, your work untouched. The value.js-side record: `docs/tranches/T/letters/
GLASSUI-T-ASKS.md §P1 rider` + the PROGRESS event row. An ack is a bonus, never waited on;
delivery ≠ disposition (the row stays open until source-verified at HEAD).

---

## §6 ADDENDUM (same audit, same relay — two ADDITIONAL producer rows; dispatched 2026-07-11)

**Stamped HEAD**: glass-ui **`c93a7f13`** (`tranche/BG`; the F8 5.0.0 cut row is USER-GATED
and **untagged** at this write — both cites below re-verified live at this HEAD). These rows
ride the standing **P10** and **P3** packets (`VALUEJS-T-ASKS-2026-07-09.md`), recorded here
so the SAME owner audit (`MANDATE §0.6`, 2026-07-11) travels as one relay. Books, never
gates — each is walked at value.js **T.W7 verify-at-cut** beside the §4 asks.

### §6.1 P10 rider — `text-title` hardcodes `font-weight: 700` (value.js T-40)

Owner verbatim: "Dropdown options should not be bold." The demo's color-space dropdown option
letterforms (`font-display italic text-title`) compute to **700** Fraunces — root probed live:
the **`text-title` @utility hardcodes `font-weight: 700`**
(`src/styles/typography/semantic.css:132-139`, verified at `c93a7f13`). Same class as the
`text-heading` 700 the consumer already had to retire from its pane title by pinning
`font-weight: var(--type-weight-display)` on its own class list. **Ask**: `text-title` (and
kin) join P10's weight TOKENIZATION (`--type-weight-title`, or the shared heading station) so
a consumer re-voices weight without un-utility-ing the type class. The demo's pin is the
booked interim; it retires the day the token lands (value.js `audit/t33-research.md §6.5`).

### §6.2 P3 rider — the glass-recipe backdrop-filter edge-sampling bleed (value.js T-45)

Owner verbatim: "Strange clipping artifacts on the borders of these cards." Root FOUND BY
BISECTION on the value.js built bundle (`audit/t33-research.md §6.8` — header-veil off: rim
persists; card `backdrop-filter: none`: rim GONE): a glass plate's own
`backdrop-filter: blur(N) saturate(…)` samples the bright field BEYOND the element's edge and
smears it inward ≈ one blur radius; the rounded clip then cuts the smeared band unevenly at
the corner arcs → a light rim/streak inside the top edge + corners. **Population-wide by
construction**: every ladder rung pairing backdrop blur with a radius clip over a bright
ground (e.g. the veil rung `cards.css:459`, the refract chain `glass-refract.css:109`, the
`--glass-blur-*` family). **Ask**: the **oversampled-pseudo idiom at the LADDER** — the
backdrop-filter moves onto a `::before { inset: calc(-2 * blur) }` oversampling pseudo
clipped by the host's radius+overflow, so the smear falls outside the visible edge. The demo
lands the same idiom as a booked interim on its OWN pane-card recipe only (T.W6.5 Lane M);
the interim swaps out when the ladder cure ships — never a demo fork of the ladder (PR-2).
