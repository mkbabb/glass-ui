# Inventory — W-tabs-motion (Tabs + motion band status)

**Lane** W-tabs-motion · **Scope** W05 (one iOS-spring vocabulary) + W53 (tabs-unify → SegmentedTabs) ·
the spring registers, the squish, the Apple-SOTA ratify (R-apple-liquid numbers). · **Mode** read-only
inventory, tranche-development planning only. · **Repo HEAD at audit** `88a2ec5` (NOT the prompt's
`c72d2ac`; the docs reference convergence-2 W53 base `6050dc4` and the W05 base `a563563`).

---

## TL;DR status

| Item | Status | Note |
|---|---|---|
| **W05 — bezier excise (F4)** | DONE | `--ease-apple-spring`/`--motion-ease-apple-spring` excised from `src/`; 0 survivors confirmed at HEAD. 4 internal consumers re-pointed onto governed `--spring-*`. |
| **W05 — slider-in-dock re-point (F4)** | DONE | `Slider.vue` thumb reads `var(--slider-thumb-spring, var(--spring-dock))`. |
| **W05 — F3 truth-up / F5 coverage gate** | DONE | `proof:animation-coherence` carries APPLE-SPRING-SURVIVOR + SPRING-CONSUMER-COVERAGE; 5/5 presets reached. |
| **W05 — [MS] / D3 press double-spring collapse** | DONE (superseded by W53) | The press collapse landed inside `SegmentedTabs.vue` (the W53 successor to `BouncyToggle.vue`), not as a `BouncyToggle.vue` edit. Reads `--spring-snappy` + `--scale-press-btn`, no `>1` keyframe. |
| **W05 — [MS] press-keyframe-shape GATE arm** | NOT DONE (gap) | The spec'd `proof:animation-coherence` PRESS-KEYFRAME-SHAPE assertion (FAIL on `>1` keyframe / `--spring-bouncy` press / literal `duration`) was never added. The shipped gate has only the literal-scale PRESS-FROM-COHORT detector. |
| **W05 — Apple `(perceptualDuration, bounce)` pin (R-apple-liquid AUGMENT)** | NOT DONE (deferred) | `regen-spring-tokens.mjs` still authors on the LEGACY `(response, dampingFraction)` surface; the R-apple-liquid §2 "pin PRESETS to smooth(0.5s,0)/snappy(0.5s,0.15)/bouncy(0.5s,0.3)" ratify is unaddressed. |
| **W05 — cross-repo census (W34 leg)** | RED-PENDING (expected) | speedtest still reads `--ease-apple-spring` at 3 live sites; the forcing-function census stays RED until the W34 publish-gated re-point lands. |
| **W53 — SegmentedTabs unification** | DONE (DEVELOPED + live-verified per PROGRESS) | `SegmentedTabs.vue` is the sole component; the 4 old artefacts + `responsive-tabs/` + `/responsive-tabs` subpath DELETED; `proof:tabs-unified` registered + green. |
| **W53 — travel-squish atom** | DONE | `--tab-indicator-max-stretch: 1.08`; `useTabIndicator.squishOnTravel` writes `--stretch`; reciprocal `scale` pairing; PRM-gated. |
| **W53 — press duration token-resolve** | PARTIAL (minor gap) | `animatePress` `duration: 220` is a hardcoded literal — neither W05 [MS] nor D3's `--duration-normal` (300ms) token-resolve. |

---

## W05 — one iOS-spring vocabulary

### What landed (DONE, live-verified at 3.8.0)

Source-confirmed at HEAD `88a2ec5`:

- **Bezier excised.** `grep ease-apple-spring|motion-ease-apple-spring src/` → 0 (was 2 defs + 4
  consumers at the `a563563` base). The 4 internal consumers re-pointed: `UnderlineTabs.vue:75` →
  `--spring-snappy`, `BouncyToggle.vue:135` → `--spring-bouncy`, `ContinuousMarkers.vue:385` →
  `--spring-snappy` (inline cubic-bezier fallback deleted), `ProgressSectioned.vue:188` → collapsed dead
  middle layer. (Note: the first two files have since been DELETED by W53 — the re-point survives in the
  successor `SegmentedTabs.vue`.)
- **Slider-in-dock.** `Slider.vue` thumb timing now `var(--slider-thumb-spring, var(--spring-dock))` — the
  in-dock thumb breathes on the dock register; consumer-overridable via the one `--slider-thumb-spring`
  hook (matches the `--slider-thumb-{size,bg,shadow}` inline-default family convention).
- **Gates truthed-up.** `proof:animation-coherence` EXTENDED (not a new gate — parity bijection held) with
  APPLE-SPRING-SURVIVOR (deletion-proof, 9→0), SPRING-CONSUMER-COVERAGE (fail-closed; bite-tested
  `--spring-dead` → FAIL), and the APPLE-SPRING-CONSTELLATION cross-repo census. F3 was already truthed
  (the `proof-dock-motion-parity.mjs` stale-prose target named in the plan never existed at the `a563563`
  base; `proof-spring-tokens-synced.mjs` import-renders the overshoot).
- **Consumer census** (`W05-one-ios-spring-vocabulary.json`): 5/5 `--spring-*` presets reached. `gentle`
  is JUSTIFIED-via-alias (reached only through `--ease-spring-gentle`); ratified KEEP, not retired.

### The D3 / [MS] re-open — the press double-spring (DONE, but the home MOVED)

PROGRESS.md line 181-182 records W05 carries "the BouncyTabs double-spring motion-shape arm (D3)". The
D3 ledger and the W05 [MS] arm both targeted `BouncyToggle.vue:125-155 animatePress` — the
`scale(1)→0.96→1.08→1` keyframe (the `--scale-hover` 1.08 mis-recruited as a press rebound peak) baked
UNDER `--spring-bouncy` at a hardcoded 200ms (overshoot-on-overshoot, the user's loudest motion defect).

**This is resolved — but the resolution landed in W53's `SegmentedTabs.vue`, not as a `BouncyToggle.vue`
edit.** W53 deleted `BouncyToggle.vue` and the new `SegmentedTabs.vue:220-238 animatePress` is the
correct single-overshoot track:

```js
const easing = readToken("--spring-snappy", "ease");   // CONTROL register (was --spring-bouncy)
const press = readToken("--scale-press-btn", "0.97");  // settle-into (was --scale-hover 1.08)
btn.animate(
    [{ transform: "scale(1)" },
     { transform: `scale(${press})`, offset: 0.4 },     // dip only — NO >1 keyframe
     { transform: "scale(1)" }],
    { duration: 220, easing },                          // STILL a literal (see gap below)
);
```

The track is the iOS squish, the easing is CONTROL, the `--scale-hover` mis-recruitment is gone. D3's
RATIFY (Open Q6 — CONTROL vs a single-overshoot PLAYFUL) resolved to CONTROL. **The D3 defect is fixed.**

### Gaps / deferred-into-this-tranche (W05)

1. **[MS] press-keyframe-shape GATE arm — NOT DONE (deferred-gate gap).** W05 §HardGate + the FileBounds
   row spec'd a NEW assertion on `proof-animation-coherence.mjs`: parse `animatePress`, FAIL CLOSED on
   (a) a `>1` press keyframe, (b) the press easing reading `--spring-bouncy`, (c) `duration` being a
   numeric literal. The shipped gate has ONLY the literal-scale PRESS-FROM-COHORT detector
   (`PRESS_LITERAL_RE` / `detectPressForks`) — it checks scale PROVENANCE, never track TOPOLOGY or the
   press register/duration. So the press double-spring is fixed in source but UNGATED: a regression that
   re-bakes a `>1` keyframe or re-points the press to `--spring-bouncy` would NOT be caught. `proof:tabs-unified`
   gates the indicator-GLIDE register (`--spring-snappy`, not `--spring-bouncy`) but says nothing about the
   `animatePress` press track. This is the one piece of W05's own spec that did not ship.

2. **`duration: 220` hardcoded literal — PARTIAL.** Both W05 [MS] (sub-step 10) and D3 §3 mandated
   resolving the press duration from `--duration-normal` (0.3s/300ms) via the same `readToken` pattern the
   file already uses for scales — "a spring needs room to settle; 200ms forces the ring into a snap." The
   shipped value is `220` (a literal, bumped from 200 but still un-tokenized, and ≠ the 300ms target). Minor,
   but it is an explicit spec divergence and the un-token-resolved duration is exactly what gate-arm (c)
   above would have caught.

3. **Apple `(perceptualDuration, bounce)` authoring-surface pin — NOT DONE (R-apple-liquid AUGMENT,
   deferred).** R-apple-liquid §2 + CONVERGENCE-PLAN-2:30-31 prescribe the NET ADD for W05: pin
   `regen-spring-tokens.mjs` PRESETS to the confirmed Apple defaults on the `(duration, bounce)` surface —
   `smooth(0.5s, bounce 0)` / `snappy(0.5s, bounce 0.15)` / `bouncy(0.5s, bounce 0.3)` — so the registers
   MAP to named Apple presets rather than hand-tuned ζ that drifts. The shipped `regen` STILL authors on the
   LEGACY `(response, dampingFraction)` surface: `smooth(0.5, ζ0.86)`, `snappy(0.35, ζ0.65)`,
   `bouncy(0.5, ζ0.45)`, `gentle(0.7, ζ1.0)`, `dock(0.32, ζ0.7)`. The W05 SOTA-deepening §1 also names this
   adoption ("adopt the iOS-17+ (perceptualDuration, bounce) authoring surface … the internal ζ stays the
   math; (duration, bounce) is the human dial") — it is in W05's own scope and was not implemented. This is
   the **"Apple-number ratify pending"** the lane brief flags. It is a generator-internal authoring-surface
   refactor (the emitted `linear()` stops can stay byte-identical if the ζ is preserved, OR be re-derived to
   the exact Apple shapes) — NOT a behaviour change unless the team chooses to re-derive to the Apple ζ
   values. RATIFY: do the glass-ui registers ADOPT the exact Apple ζ (snappy ζ→~0.85 from 0.65; bouncy
   ζ→~0.7 from 0.45) or keep the hand-tuned ζ and merely re-EXPRESS them via the `(duration, bounce)` dial?
   The two are different: the former changes the overshoot of every spring; the latter is a cosmetic dial swap.

4. **Cross-repo census (W34 leg) — RED-PENDING, expected.** The APPLE-SPRING-CONSTELLATION census stays
   RED on the real checkout: `../speedtest/src` reads `--ease-apple-spring` at 3 live sites
   (`SpeedtestResults.vue:842`, `MeterColumn.vue:291,292` — the `:281` "DEPARTURE spring" comment confirms
   the CONTROL-register intent). speedtest carries NO local `--ease-apple-spring` def, so deleting the
   glass-ui token leaves these resolving empty → silent degradation. The 4-site re-point is the W34
   cross-repo PR, publish-gated per §4 note 12. Recorded `{receiver: W34, close-gate: this census}` per the
   §16.4 zero-loss mandate — this is the EXPECTED forcing-function RED, NOT a regression, and it correctly
   keeps the token from being a silent clean-break. It folds into W34 / the publish leg, not W05 itself.

---

## W53 — tabs-unify (SegmentedTabs)

### What landed (DONE — DEVELOPED, live-verified per PROGRESS.md line 76)

Source-confirmed at HEAD `88a2ec5`:

- **ONE component.** `src/components/custom/tabs/SegmentedTabs.vue` (24 KB) is the sole tab-family
  component. `BouncyToggle.vue` + `BouncyTabs.vue` + `UnderlineTabs.vue` + `useBouncySlider.ts` + the
  `responsive-tabs/` dir + `src/subpaths/responsive-tabs.ts` are all DELETED (confirmed gone). The only
  `Bouncy` strings remaining in `src/` are 2 PROSE comments (allowed by the gate's comment-strip) describing
  the merge. demo has 1 prose ref in `navigation/tabs.vue`.
- **Variant axis.** Three-value `variant` (`segmented` DEFAULT · `pill` · `underline`), ONE indicator
  grammar; chrome differs (filled pill vs `::before` hairline) as a CSS concern.
- **Travel-squish atom.** `--tab-indicator-max-stretch: 1.08` (tokens.css:1252).
  `useTabIndicator.squishOnTravel(idx)` writes a distance-driven `--stretch` (`1 + frac·(cap−1)`, frac =
  travel/containerW); the indicator pairs it reciprocally `scale: var(--stretch) calc(1/var(--stretch))`
  (volume-preserving), releases on the snappy clock (60ms release timer). PRM-gated. The underline `::before`
  reads `scale: var(--stretch) 1` (X-only width flex).
- **Glide register.** All indicator transitions read `--spring-snappy` (CONTROL) — never `--spring-bouncy`.
- **Press.** The W05/D3-collapsed `animatePress` lives here (see W05 §[MS] above).
- **ARIA-role-per-variant.** `underline` → `role=tablist`/`tab`+`aria-selected`; `segmented`/`pill` →
  `role=group`+`aria-pressed`. Gated by `proof:tabs-unified`.
- **multi-select + responsive folded.** `multiSelect` (segmented/pill) + `responsive` (the matchMedia
  Select-swap lifted from ResponsiveTabs) are props on the one component.
- **Gate.** `proof:tabs-unified` registered (package.json:648 + gates.mjs:528); device-free SOURCE arm +
  fail-CLOSED π LIVE arm. Self-gated green: typecheck, build (dist/tabs.js 9.86 kB / 3.57 kB gz),
  proof:tabs-unified, gate-script-parity, theme, components-css, vt-names, composable-return-types, package,
  + resolution/verify-export-types/storybook-ia/doc-consistency.
- **Symbol-naming RATIFY resolved.** The unified custom component is `SegmentedTabs` (NOT `Tabs`); reka
  `ui/tabs` stays the root-barrel panel-nav primitive — no collision. Clean break, no alias.
- **CLAUDE.md updated** with the `### SegmentedTabs (AX.W53)` contract section + the structure-tree line.

### Gaps / open items (W53)

1. **Press duration literal** — see W05 gap #2 (the `duration: 220` lives in `SegmentedTabs.vue`).

2. **Live-verify provenance.** The `W53-tabs-unified.json` `liveArmNotes` is the orchestrator HANDOFF
   instruction set (the 7-point chrome-devtools-mcp tuning checklist + exact magnitudes), NOT a recorded
   capture of an executed live audit with paired-π artefacts. PROGRESS.md marks W53 "live-verified
   (DEVELOPED)", but the audit json records only the self-gated device-free arms as PASS and the π live arm
   as "befitting-silent on the no-workspace runner". The binding close criterion per AX.W00 (the executed
   live chrome-devtools-mcp audit captured as a paired-π artefact) is asserted at the orchestrator layer; the
   wave doc's HandOff is the contract, and the squish cap (`1.08`, tune 1.06–1.10) was a live-tuning dial.
   If the convergence re-verify pass has not captured this surface, it belongs on the cardinal-lesson
   re-verify list (CONVERGENCE-PLAN-2 §47-50 does NOT currently list tabs — it lists blob/carousel/dock).

3. **The shared `useSquish` overfitting flag (deferred, correct).** The volume-preserving scaleX squish
   atom now has the tab-indicator as consumer #1; W23 carousel page-indicator (§ R-apple-liquid §4 / P5) +
   the W06 dock press-squish are candidate consumers #2/#3. Per A-tabs-unify §6 + W53 OUT-of-bounds, W53
   correctly did NOT double-mint a `useSquish`/`--*-max-stretch` family — it is the first consumer, and the
   shared atom is flagged for the overfitting bar when ≥2 land. This is a tracked future-fold, not a W53 gap.

---

## DEFERRED items that must FOLD INTO this tranche

- **[D-1] W05 [MS] press-keyframe-shape gate arm** — author the `proof:animation-coherence` PRESS-KEYFRAME-SHAPE
  assertion (parse `animatePress`: FAIL on `>1` keyframe / `--spring-bouncy` press easing / literal duration).
  W05's own spec'd gate; not shipped. Now retargets `SegmentedTabs.vue animatePress` (the `BouncyToggle.vue`
  target it named is gone). Without it the D3 fix is ungated.
- **[D-2] W05 press `duration` token-resolve** — `SegmentedTabs.vue:236` `duration: 220` → resolve from
  `readToken("--duration-normal", "0.3s")` per W05 [MS] sub-step 10 + D3 §3.
- **[D-3] W05 Apple `(perceptualDuration, bounce)` pin** — the R-apple-liquid §2 AUGMENT
  (CONVERGENCE-PLAN-2:30-31). Re-author `regen-spring-tokens.mjs` onto the `(duration, bounce)` authoring
  surface; RATIFY whether glass-ui adopts the exact Apple ζ or keeps hand-tuned ζ re-expressed. This is the
  "Apple-number ratify pending" the lane brief names.
- **[D-4] W05 cross-repo census green (W34 leg)** — the speedtest 3-site `--ease-apple-spring` re-point;
  publish-gated, owned by W34. Not W05-internal, but the W05 census stays RED until it lands.

## GAPS — unaddressed prompts / plan divergences

- **W05 [MS] re-home not documented in the wave doc.** AX.W05.md still spec's the press fix against
  `BouncyToggle.vue:125-155`. W53 deleted that file and the press fix landed in `SegmentedTabs.vue`. The
  W05 wave doc + its CommitPlan ("`fix(tabs): collapse the BouncyToggle press double-spring …`") are now
  stale-by-rename. The W05 audit json's carried `liveArmNotes` STILL reads "BouncyToggle still bounces
  (PLAYFUL — overshoot survives the map)" — the EXACT pre-D3 note D3 was opened to invert. It was never
  flipped to the close criterion ("press settles smoothly on CONTROL — single governed overshoot"). The
  fix is real; the ledger is stale. (Doc-currency, not a code gap.)
- **`proof:tabs-unified` does not gate the press.** It gates the GLIDE register and the squish + ARIA +
  deletion-proof, but the `animatePress` press track (the literal D3 surface) is covered by NEITHER gate
  (W05's keyframe-shape arm never shipped, and tabs-unified only checks the glide). The D3 fix is
  source-correct but doubly-ungated.
- **No conflict between W05 and W53 on `--spring-*`** — W53 is a pure CONSUMER of `--spring-snappy` (mints
  no spring), W05 owns the registers. Clean dependency, no divergence. Confirmed.

## PATH FORWARD (gestalt, planning only)

The tabs surface (W53) is architecturally DONE and idiomatic — ONE component, one elastic indicator, clean
break, no aliases, ARIA-role-per-variant, gated. No re-architecture is warranted; the W53 work is sound.

The motion band (W05) has a **DONE behaviour with an undergated, doc-stale tail**. The gestalt close is a
single small motion-coherence fold that finishes W05's own deferred half and lands the R-apple-liquid pin
as ONE governed authoring-surface change — not a scatter of patches:

1. **Land the spec'd press-keyframe-shape gate arm ([D-1]) retargeted at `SegmentedTabs.vue`.** This is
   W05's own HardGate clause; authoring it now closes the "double-spring fixed but ungated" hole AND
   provides the bite-test for [D-2] (the literal-duration assertion fails on `220`, forcing the token-resolve).
   Do [D-1] and [D-2] together — the gate is born-RED on the current `220` literal, GREEN once the press
   reads `--duration-normal`. One commit, one bite-test.
2. **Adopt the `(perceptualDuration, bounce)` authoring surface in `regen-spring-tokens.mjs` ([D-3]) as
   ONE generator refactor with the RATIFY decided first.** The clean path: re-express the 5 PRESETS on the
   `(duration, bounce)` dial with the closed-form map (`bounce = 1−ζ`, `stiffness=(2π/duration)²`,
   `damping=(1−bounce)·4π/duration`), keep the set SMALL (Apple ships 3; the F5 census already justified the
   5). RATIFY whether to also adopt Apple's exact ζ (changes overshoot — a visual change requiring its own
   π live-verify on every `--spring-*` consumer) or hold the hand-tuned ζ (cosmetic dial swap, byte-stable
   `linear()` output). Recommend: re-express via the dial (byte-stable), and only re-derive to Apple ζ if a
   live audit shows a register reads wrong — keep it a deliberate, audited change, not a silent drift.
3. **Flip the W05 audit-json `liveArmNotes` carry + refresh AX.W05.md's `BouncyToggle.vue` references to
   `SegmentedTabs.vue`** (the W53-rename) so the ledger states the actual close criterion ("press settles
   smoothly on CONTROL — single governed overshoot, no double-spring") and the doc points at the live file.
   Documentation-is-part-of-the-change; this is the P-inv-28 zero-deferral hygiene the M-band close (W33)
   will otherwise flag.
4. **Re-verify the tabs surface live + record the paired-π artefact ([W53 gap #2]).** Add `navigation/tabs`
   to the cardinal-lesson re-verify list and capture the executed chrome-devtools-mcp audit (glide smooth,
   `--stretch` peak ~1.08 then release, press no-ring-past-1, ARIA-per-variant, responsive swap) so
   "live-verified" has a captured artefact, not only a HandOff checklist.
5. **W34 leg + the squish overfitting bar are tracked future-folds** — the speedtest 3-site re-point
   ([D-4]) rides the publish/W34 DAG; the `useSquish` family lands only when W23/W06 give it consumer #2.
   Neither belongs inside W05/W53; both are correctly deferred with named receivers.

The net: W05's behaviour is GREEN, but its GATE + its generator-authoring-surface + its ledger are the
unfinished tail. Closing them is small, surgical, and finishes W05's own mandate rather than re-opening
the design.
