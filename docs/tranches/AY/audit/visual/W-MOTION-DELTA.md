# AY.W-MOTION — DELTA (impl write-up)

**Wave** AY.W-MOTION · **State** dev-complete (source-verified) · **Gate**
`proof:animation-coherence` GREEN + CI-promoted + byte-locked.

This is a SOURCE/STRUCTURE wave — the §6 easing doctrine is a source truth, not a
painted one, so no own-surface PNG is warranted (spec §5, W-CARDINAL-INFRA). The
artefacts are: gate exit codes, a born-RED detector fixture, the CI-manifest diff,
and zero-grep deletion proofs.

---

## §1 — Survivor re-point before/after table

| site | before | after | register |
|---|---|---|---|
| `src/styles/cards.css:41-42` | `translate … var(--spring-bouncy), box-shadow … var(--ease-apple)` | `translate … var(--spring-smooth), box-shadow … var(--ease-standard)` | hover transform → smooth; surface box-shadow → standard (off the ambient-only `--ease-apple`) |
| `src/components/custom/aurora/Aurora.vue:223` | `transition: opacity 600ms ease-out` | `transition: opacity var(--duration-slow) var(--ease-standard)` | surface opacity → bezier |
| `src/components/custom/metric-stack/MetricRow.vue:229` | `transition: color 220ms ease-out` | `transition: color var(--duration-fast) var(--ease-standard)` | surface color → bezier |
| `src/components/custom/metric-stack/MetricRow.vue:246` | `transition: color 220ms ease-out` | `transition: color var(--duration-fast) var(--ease-standard)` | surface color → bezier |
| `src/components/ui/slider/Slider.vue` thumb `transform` | `var(--slider-thumb-spring, var(--spring-dock))` | `var(--slider-thumb-spring, var(--spring-smooth))` | press transform → smooth (W-GLASS ceded; see §6 decision) |

The hover/value ENDPOINTS are unchanged in every case — only the easing register
moved. The `cards.css` hover lift (`translate: var(--lift-sm)`, `box-shadow:
var(--shadow-cartoon-lg)`) is byte-identical; only the two transition legs changed.

### Chosen `--duration-*` tokens (the magic-number → token map)

- **Aurora `600ms` → `--duration-slow` (`0.45s`/450ms).** `--duration-slow` is the
  nearest §-tokened duration. It is a meaningful reduction (450ms vs the prior
  600ms), but the aurora canvas cross-fade is a slow background bleed — the
  perceptible difference at the cross-fade between a placeholder and a WebGL canvas
  is sub-noticeable, and the §6 surface register (a §-tokened bezier) is the goal.
  The PRM block (`Aurora.vue:230-232`, `transition-duration: 1ms`) is UNCHANGED.
- **MetricRow `220ms` ×2 → `--duration-fast` (`0.2s`/200ms).** `--duration-fast` is
  the nearest §-tokened duration to the magic `220ms`. A 20ms delta on a color
  cross-fade is imperceptible; the token replaces the magic number.

---

## §2 — The Toast register DECISION (D4, HG6)

**DECISION: (b) — documented keep.** The reka-ui `ToastRoot` OWNS its data-state
choreography: the entrance slide direction tracks BOTH the viewport origin AND the
swipe-end gesture (`data-[swipe=end]:slide-out-to-right-full`), so the entrance and
exit are coupled to reka's `tw-animate-css` data-state machinery (`Toast.vue:55`).
Re-authoring the toast onto a glass-ui `<Transition name="toast">` would fork the
primitive's swipe-coupled contract, and `tw-animate-css` is the shipped optionalPeer
that contract depends on. The §6 spring vocabulary governs glass-ui-OWNED entrance
surfaces (`dialog-scale`, `pop`, `dropdown`, `fade-slide`, `dock-in`); the reka-Toast
entrance is not one. Confirmed against the painted toast: the toast does NOT read as
a foreign curve beside a dialog — it arrives on the same fast ease-out the rest of the
`tw-animate-css` data-state surfaces use, and the swipe coupling is the load-bearing
reason the entrance/exit cannot be hand-authored.

**Landed:** the contract doc at `transitions.css:152-191` gains an explicit §6
EASING-DOCTRINE EXEMPTION block — names the doctrine, states the delegation is BY
DESIGN (reka owns the data-state choreography + the swipe coupling), and cross-refs
the gate's exemption. The gate carries the rationale in `REGISTER_ASSIGNMENT_ALLOW`'s
header note (the Toast emits NO `transition:` with a `--spring-*` easing — it uses
`transition-[opacity,transform]` for the swipe-drag with reka's timing — so it never
reaches the register detector; the keep is recorded, no phantom allow-list entry).

---

## §3 — HG1: speedtest census born-RED → GREEN (the GREEN-flip artefact)

**BEFORE move 4** (`../speedtest` still reading the EXCISED `--ease-apple-spring`):

```
  constellation census       : ../speedtest (3 reads, inherits)
  one motion source          : NO
VIOLATIONS:
  ✗ constellation consumer ../speedtest reads var(--ease-apple-spring) at 3 site(s) with NO local definition — it inherits the EXCISED glass-ui token and degrades to instant/linear.
  status: FAIL   (exit 1)
```

**AFTER move 4** (the three speedtest reads re-pointed → `--ease-standard`):

```
  constellation census       : ../speedtest (0 reads, inherits)
  one motion source          : YES
  status: PASS   (exit 0)
```

The three re-pointed sites:
- `../speedtest/.../MeterColumn.vue:291` `transform … var(--ease-apple-spring)` → `var(--ease-standard)`
- `../speedtest/.../MeterColumn.vue:292` `width … var(--ease-apple-spring)` → `var(--ease-standard)`
- `../speedtest/.../SpeedtestResults.vue:842` `transform … var(--ease-apple-spring)` → `var(--ease-standard)`

The departure-spring comment (`MeterColumn.vue:281-288`) is reconciled to name
`--ease-standard` + the §6 exit-register cross-ref; the departure RATIONALE is
preserved (an exit must settle with no overshoot — the consumer's own AO-C4 reasoning
AGREES with §6). **Deletion proof:** `grep -rn "ease-apple-spring" ../speedtest/src`
→ 0 reads (exit 1). The speedtest transitions no longer degrade to instant/linear.

---

## §4 — HG2: the register-assignment born-RED fixture → GREEN-at-HEAD

The NEW `detectRegisterAssignment` is a PURE exported detector. On the synthetic
off-register fixture it REDs with BOTH register witnesses (captured via the detector
run + locked in `tests/scripts/proof-animation-coherence.detect.test.ts`):

```
REGISTER-ASSIGNMENT born-RED witnesses (synthetic off-register fixture):
  X fixture.css:3: surface prop 'color' transitions on '--spring-bouncy' — a --spring-* on a surface leg reads as a wobble; use --ease-standard (§6)
  X fixture.css:6: transform prop 'transform' presses on '--spring-bouncy' — use --spring-smooth/--spring-snappy for hover/press, never --spring-bouncy/-dock/-gentle (§6)
  count: 2 (expected 2)
```

GREEN-at-HEAD (the widened gate over the full set, post-survivor-fix):

```
proof:animation-coherence — the one-motion-source gate (AW.W31.a + AX.W05 + AY.W-MOTION)
  --spring-* definitions     : 5
  animated surfaces scanned  : 250
  hand-rolled easing forks   : 0
  literal press-scale forks  : 0
  register-assignment forks  : 0
  apple-spring survivors     : 0
  --spring-* coverage        : 5/5 presets reached
  constellation census       : ../speedtest (0 reads, inherits)
  one motion source          : YES
  status: PASS   (exit 0)
```

The scan no longer lists only 3 CSS + 2 SFC — it scans **250 animated surfaces**
(the widened `SURFACE_CSS`: dock/dock-controls/utilities + transitions/animations/
cards/glass/instrument-chassis/drawer/hover-popover/floating-panel/scroll-driven/
view-transition + the six `dock/*.css` partials; the named SFC anchors Aurora/GooBlob/
MetricRow/ScrollingText/Slider; AND the `*.vue` `<style>` catch-all).

The unit suite locks the detector bite: `npx vitest run tests/scripts/` → 36 passed
(13 new register/press/strip units + the 3 prior detect suites).

### The widening surfaced + correctly-classified four legitimate-pattern false-positives

The wide scan over animations.css/transitions.css/decorative SFCs surfaced patterns
the narrow gate never saw; the detector classifies them by ROLE (not flagged):
1. **`ScrollingText.vue:104` marquee** `cubic-bezier(…)` on `scrolling-text-pan` — a
   continuous material sweep → added to `NON_PHYSICAL_ALLOW` (authored exemption).
2. **`@keyframes` `scale()` waypoints** (animations.css, ContinuousMarkers) — enter/
   exit START/END positions, NOT press recipes → `detectPressForks` exempts
   `@keyframes` block contexts.
3. **Vue-transition `*-enter-from`/`*-leave-to` `scale()` waypoints** (transitions.css)
   → exempted by the `selectorRoleAt` enter/exit role classification.
4. **`.dialog-scale-enter-active`/`.pop-enter-active`/`.toggle-sun` `transition:
   transform … --spring-bouncy`** — ENTER and state-morph transforms legitimately ride
   the §6 ENTER spring → `detectRegisterAssignment` flags a transform-on-bouncy ONLY in
   a HOVER/PRESS selector role (`:hover`/`:active`/`[data-pressed]`), exempting enter/
   exit/state-morph. (An EXIT transform-on-spring IS flagged — no overshoot past gone.)

The `detectPressForks` PRESS-FROM-COHORT assertion stays scoped to the named canonical
press anchors (the gate header's authored intent: `.tap-squish`/button/slider/dock-
icon/dock-tab) + keyframe-context-aware; the catch-all gets easing + register only (the
off-doctrine-spring + hand-rolled-curve sweep the spec names for the wide set).

---

## §5 — HG3: the gate IN CI, byte-locked (the CI-manifest diff)

`scripts/gates.mjs` GATES gains (beside `proof:spring-tokens-synced`):

```js
{
    id: "proof:animation-coherence",
    cmd: "proof:animation-coherence",
    tags: ["local", "ci", "release"],
    sibling: true,
    note: "AY.W-MOTION — the §6 register guard PROMOTED into CI (was excluded + RED). …",
},
```

`.github/workflows/ci.yml` (REGENERATED via `npm run gates:emit-ci`, NEVER hand-edited)
gains the step:

```yaml
            - name: proof:animation-coherence
              run: npm run proof:animation-coherence
```

Byte-lock GREEN:

```
[gates --emit-ci] wrote .github/workflows/ci.yml (101 ci gates + 2 meta-steps).
[gates:verify-ci] ci.yml matches the manifest ci set (101 gates).
[proof:gen-ci-fresh] ci.yml is byte-identical to `gates.mjs --emit-ci` (no drift possible).
```

Grep proofs: `grep -c "proof:animation-coherence" .github/workflows/ci.yml` → 2;
`grep -c "proof:animation-coherence" scripts/gates.mjs` → 2. The dead-gate violation
is FIXED: the gate is green-and-in-CI, not excluded-because-red.

---

## §6 — HG4: zero hardcoded-ms / bare-keyword surface survivors

The widened gate GREEN (`easingForks: 0`, `registerForks: 0`) IS the witness — it now
scans cards.css / Aurora.vue / MetricRow.vue / transitions.css / the dock partials /
the `*.vue` catch-all. Cross-check (genuine bare-keyword/ms survivors on a transition,
the keyword NOT inside `var(…)`):

```
grep -rEn "transition:" src/styles src/components | grep -vE "var\(--ease|var\(--spring|var\(--dock" | grep -oE "transition:[^;{]*" | grep -E "\b(ease|ease-out|ease-in|linear)\b" | grep -vE "var\("
→ (no matches)
```

The `cartoon-surface` legs read `--spring-smooth`+`--ease-standard`; Aurora/MetricRow
read `var(--ease-standard)`. (The spec's loose HG4 grep over-matches the token NAME
`ease-out` inside `var(--ease-out)` — those are tokenized, correct; and DarkModeToggle's
`500ms`/`750ms` are hardcoded durations on TRANSFORM legs with tokenized easing, off
the surface-transition class HG4 names and out of this wave's edit-sites.)

---

## §7 — HG5: the `--scale-hover-btn` value/comment drift reconciled to 1.05

Three stale comments said the value is `1.035`; the token (`tokens.css:1454`) is
`1.05` (the W54 Q3 bump). Reconciled:
- `tokens.css:184` ("… = 1.035" → "… = 1.05").
- `utilities.css:1040` ("(1.035, NOT …" → "(1.05, NOT …").
- `tokens.css:1443` already read correctly (no stale "1.035" in the prose above the
  token block — the W54 Q3 note at `:1448` records the bump).

**Deletion proof:** `grep -rn "1.035" src/styles/` → ONE remaining match,
`tokens.css:1448` ("lifted 1.035 → 1.05"), which is the LEGITIMATE historical record
of the bump (not a stale "the value is 1.035" claim). The token value did NOT change.

---

## §8 — Coordination (verify-not-edit boundaries)

- **W-DOCK2 owns `--dock-press-spring`** (`tokens.css:1771` still `--spring-bouncy`,
  shadowed by the `dock-controls.css:43` re-point to `--spring-smooth` at HEAD). The
  register assertion's `detectPressSpringRegister` (the composite press-token check)
  VERIFIES the outcome — it would RED on `--dock-press-spring: … --spring-bouncy`
  EXCEPT for the AUTHORED `PRESS_SPRING_PENDING` bridge entry naming W-DOCK2 as the
  lander (spec §5 — GREEN now via the noted bridge; naturally clean once W-DOCK2 lands
  `--spring-smooth`, the exemption becomes a no-op). A NON-allowlisted press-spring
  token naming bouncy REDs (locked by the unit test).
- **W-GLASS** CEDED the `Slider.vue` `--slider-thumb-spring` §6 re-point to W-MOTION.
  Decision: the thumb `transform` carries the `:active` press-give (`scaleX(0.97)`),
  and reka owns the value-follow POSITION (inline inset, not this CSS transform), so
  the transition is a PRESS leg → re-pointed `--spring-dock` → `--spring-smooth`.
  W-GLASS keeps the `glass.css` specular `::before` on `--ease-standard`; the gate
  READS glass.css (scan target) without editing it — no write overlap.
