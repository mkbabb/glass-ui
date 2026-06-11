# AZ.W-REFLECT — motion surface reflection record

**Surface:** motion (`/motion` in totality — the FULL curve canon, the spring playground on
`SPRING_PRESETS` with zero forks, the scroll/VT facilities, the ppmycota-purple band accent,
the §6 easing-doctrine cohesion, the morph-showcase motion quality)
**Auditor lane:** motion · **Date:** 2026-06-11 · **Branch:** tranche/AY @ `58c4265a` (AZ Batch 0–5 + R4/R5 corrective landed)
**Verdict:** **PASS** — every R3-11 mandate discharged, both gates GREEN, live π corroborates the
violet identity + the live playground + the §6 doctrine in the real button transition. No
first-time-auditor "wtf". One trivial environmental footnote (the parity sub-gate needs a built
`dist/motion.d.ts`; it is GREEN after `npm run build`, not a regression).

---

## 1 — RECAPITULATION (every motion audit item × discharging evidence × re-verified state)

| id | source | the user's words / mandate (condensed) | discharging wave + claim | RE-VERIFIED state (this audit) |
|---|---|---|---|---|
| R3-11 | USER-AUDIT R3 | "/motion should have the FULL keyframes.js suite: easing functions, spring timing, scroll facilities — take the keyframes design language, configurator and animation demo, port over to match our glass items. A robust motion demo. The curve-set area expanded to ALL of our curves plus all keyframes.js timing curves, leveraging the keyframes.js ppmycota purple." | W-MOTION-SUITE (Batch 3) — all-families gallery + spring playground + bezier editor + scroll/VT demos + foundations de-dup + `--motion-accent` violet; the springs.vue fork DEAD | **HELD in full.** Live: 10-family pill strip renders, 9 violet plots on Standard, playground authors a spring live, scroll/VT both supported, foundations de-duped. See §2. |
| C7-2/C7-3/D5-4 | FLEET | live Curve Gallery plotted ONLY 10 canonical MOTION_CURVES (5 springs + 5 beziers) — no Sine/Quad/Cubic/Expo/Circ/Back/Bounce/Steps/editable-bezier | gallery grouped by the keyframes 10-family taxonomy, each row a REAL JS twin | **HELD.** π: `body.innerText` matches all 10 families (Standard/Sine/Quad/Cubic/Expo/Circ/Back/Bounce/Steps/Custom); the Custom tab opens the editable bezier (`BezierEditor.vue`). Source `curve-families.ts` proves the per-family twin SOURCE split. |
| C7-4/D5-3 | FLEET | `springs.vue:23` opened a LOCAL `damped(stiffness,damping)` closed-form FORK with arbitrary pairs (40/12·120/18·90/8·20/10); MISLABELED 'smooth' as critically-damped | DELETE the local solver; drive off `SPRING_PRESETS`/`springTimingFunction`; correct the label | **HELD.** Gate `fork-dead-no-local-damped` + `fork-dead-no-arbitrary-pairs` + `fork-dead-no-mislabel` all PASS; source `springs.vue` imports `SPRING_PRESETS`/`springPreset`/`springTimingFunction`, no `damped()`. |
| C7-5/D5-5/D3-3/4/5 | FLEET | the motion family read warm-RED (the R3-6 dislike): `springs.vue:158` `hsl(var(--demo-hue,12)…)`, curve/foundations dots warm-ink/red | mint `--motion-accent: var(--viz-legendre)`; re-point plots/dots/block; ppmycota stays demo-local | **HELD.** π: gallery polylines stroke `oklch(0.532 0.18 317.5)` (light) / `oklch(0.739 0.134 318.1)` (dark) — the violet, NOT red; the springs card bg `oklch(0.46 0.18 317.5)`; `hasDemoHueRed:false`. `--motion-accent` resolves to `--viz-legendre` both arms. |
| C7-7/D5-6 | FLEET | `foundations/motion.vue` duplicated the SAME 10 curves with FAKE hint-SVGs (hardcoded quarter-ellipse `M 0 18 C…`) + warm-red dots | fold the curve table into the gallery; re-focus on the `<Transition>` grammar tour | **HELD.** Live π on `/foundations/motion`: `hasCurveTable:false`, `hasFakePath:false` (no `M 0 18 C`), `hasTransitionGrammar:true`, `hasDoctrine:true`. The page is now the Transition-grammar + doctrine tour. |
| C7-8/C7-9 | FLEET | no /motion demo for useViewTransition / supportsCssTimeline / scroll-driven.css recipes; no spring PLAYGROUND (live response/ζ → linear() readout) | a "Scroll & View Transitions" section + a live Spring Playground | **HELD.** `/motion/scroll-vt`: `.scroll-progress` + `[data-scroll-reveal]` + `vt-*` group + both capability badges "supported" + the "Rotate order" VT reorder all present. The playground updates `linear()` live (overshoot 0.5%→20.5% on the bouncy seed). |
| D7/C7-11/F3-M1 | FLEET | the keyframes EasingEditor (curve dropdown + editable bezier canvas + readout/copy) was UNOWNED; port tailwind-first | `BezierEditor.vue` ported tailwind-first, driven by the REAL `CSSCubicBezier` twin | **HELD.** Gate `bezier-editor-tailwind-first` PASS (Tailwind utilities + token vars, no raw `.easing-curve-canvas` CSS). Source: drag handles, `cubic-bezier(…)` readout/copy, value.js `bezierPresets` dropdown. |
| E1-7 (BINDING) | FLEET | ppmycota purple is the keyframes CONSUMER brand color — it must NOT enter glass-ui library tokens (presets-in-consumers) | `--motion-accent`/`--ppmycota` minted DEMO-LOCAL in `demo/demo.css`; never `src/styles/` | **HELD.** `grep ppmycota src/` empty; gate `ppmycota-demo-local-only` PASS; `demo/demo.css:101/103` carries `--motion-accent: var(--viz-legendre)` + the `--ppmycota` demo-local nod. |
| §6 doctrine (AX.W52) | precept | which easing fits which job — surface→bezier, transform→`--spring-smooth`, enter→bouncy/snappy, exit→ease-out (no overshoot) | the doctrine legend on both the gallery + foundations; the registers consistent across components | **HELD + LIVE-PROVEN.** The doctrine table renders (5 rows). The REAL "Play family" glass-btn pairs surface legs (bg/border/box-shadow/color/opacity) → `cubic-bezier(.4,0,.2,1)` and the `scale` leg → the `--spring-smooth` `linear()` (peak 1.00502 ≈ +0.5%, settles to 1). The coherent-channel idiom is the live behavior, not just doc. |
| R3-13 (motion quality) | USER-AUDIT R3 | the morph showcase: VERTICAL→HORIZONTAL dock, liquid-glass, smooth, keyframes-driven, amorphous, bidirectional, deterministic | W-MORPH-SHOWCASE (Batch 4) — VT-crossfade shipped default, metaball-teardrop perf-gated preview, `useDockOrientationMorph` on ONE `--dock-morph-t` scalar | **HELD (motion-quality slice).** Live: the morph button flips V↔H deterministically (label "Morph to horizontal"→"Morph to vertical"), the VT crossfade is clean, the readout `MODE = VIEW-TRANSITION · T = 0.000`. `useLiquidFlex` has its ≥2 consumers (`useDockOrientationMorph` + `useTabIndicator`). The DEEP dock-morph audit belongs to the dock lane; the motion quality reads finished here. |

**Gate roster (re-run live this audit):**

| gate | result | note |
|---|---|---|
| `proof:motion-demo` | **PASS (17/17)** after `npm run build` | the device-free source arm — fork-dead (×4), curve-families-all-10, real-twins, no-fake-svg, spring-playground-live, scroll-vt-demo, foundations-dedup (×2), purple (×3), ppmycota-demo-local, parity-preserved, pi-spec-exists, bezier-editor-tailwind-first |
| `proof:motion-suite` | **PASS** (24/24 STATIC, 16/16 DYNAMIC, 0 leaked-static, MOTION_CURVES 22 rows, /motion value.js-free) | the AY.W-MOTION2 substrate-distribution parity gate this wave must not break — INTACT |
| `tests-visual/motion-demo.spec.ts` | exists (the π light+dark capture half — `proof:motion-demo` bite `pi-spec-exists` PASS) | the binding visual truth, ledger-backstopped |

**Environmental footnote (NOT a miss):** on a pre-build tree `proof:motion-suite` RED'd with
`SUITE-COMPLETE: dist/motion.{js,d.ts} not found — run npm run build first` because the vite arm
had emitted `dist/motion.js` but the `vue-tsc` dts arm had not run, so `dist/motion.d.ts` was
absent. This is a build-required gate state, not a motion-demo regression — after `npm run build`
(full two-arm build, 24/24+16/16) it is GREEN. The motion-demo wave touched NO substrate seam.

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured live on `:5199` this audit. Stored beside this record.

**Capture list (literal filenames):**
- `motion-curve-gallery-desktop-light.png` (1280×800 — 10-family pill strip, Standard family, violet plots)
- `motion-curve-gallery-desktop-dark.png` (1280×800 — the dark-arm violet plots, spring overshoot shapes, kind tags, register notes)
- `motion-curve-gallery-mobile-light.png` (390×844 — pill strip wraps to two rows, single-column cards, no collapse)
- `motion-springs-desktop-dark.png` (1280×800 — Named Registers, single-source blurb, violet spring card, translateX/rotate/lightness readouts)
- `motion-springs-playground-light.png` (1280×800 — the Spring Playground: response/ζ sliders, seed chips, the live `linear()` readout showing stops > 1.0, overshoot ~20.5%)
- `motion-springs-mobile-dark.png` (390×844 — Named Registers adapts to narrow viewport)
- `motion-scroll-vt-desktop-light.png` (1280×800 — CAPABILITY badges supported, scroll() progress bar, view() reveal, VT reorder)
- `motion-foundations-dedup-desktop-light.png` (1280×800 — the §6 EASING DOCTRINE table + the Transition class-sets; NO duplicate curve table)
- `motion-morph-showcase-desktop-light.png` (1280×800 — the V↔H morph stage, VT-crossfade default, teardrop preview toggle, T readout, vertical dock)
- `motion-morph-showcase-horizontal-light.png` (1280×800 — post-morph: button flipped to "Morph to vertical", dock now horizontal — bidirectional/deterministic)

**π readbacks (measured live this audit):**
- Curve gallery: **10 families** found in `body.innerText` (word-boundary match) — full keyframes taxonomy. **9 polylines** on Standard, all stroked **`oklch(0.532 0.18 317.5)`** (light) / **`oklch(0.739 0.134 318.1)`** (dark) — the violet `--motion-accent`/`--viz-legendre`, auto-flipping by mode. Row codes are the real twins (`springTimingFunction(0.5, 0.86)`, `CSSCubicBezier(.4,0,.2,1)`, …).
- `--motion-accent` resolves to `light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1))` — identical to `--viz-legendre`.
- Springs: playground present, `linear()` readout present, spring card bg `oklch(0.46 0.18 317.5)` (violet, NOT red), **`hasDemoHueRed:false`** (no `hsl(var(--demo-hue…)` block anywhere), seed chips smooth/snappy/bouncy/gentle.
- Spring playground LIVE: seeding "bouncy" moved the `linear()` first-stops `0.28457→0.35284` AND introduced stops > 1.0 (`1.17574 12.000%`), overshoot readout `0.5%→20.5%` — genuinely reactive (the SPRING-PLAYGROUND-LIVE truth).
- Scroll/VT: `.scroll-progress` present (bg `oklch(0.532 0.18 317.5)`), `[data-scroll-reveal]` present, `vt-*` group present, both badges "scroll()/view() timeline supported", "Rotate order" VT button present.
- §6 doctrine: legend renders (5 rows). The live "Play family" glass-btn transitions `background-color, border-color, box-shadow, color, opacity` on `cubic-bezier(.4,0,.2,1)` (`--ease-standard`) and `scale` on the `--spring-smooth` `linear()` (peak `1.00502`, settles to 1) — the AX.W52 unified-channel idiom is the real behavior. `--scale-press-btn` = `0.97`.
- Foundations/motion de-dup: `hasCurveTable:false`, `hasFakePath:false`, `hasTransitionGrammar:true`, `hasDoctrine:true`.
- Morph showcase: button label flips "Morph to horizontal"↔"Morph to vertical" deterministically; VT crossfade clean; `MODE = VIEW-TRANSITION`. `useLiquidFlex` ≥2 consumers confirmed in source.

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk)

Walking `/motion` cold:

- **Curve Gallery** reads FINISHED — a first-time auditor sees the full motion vocabulary grouped
  the way the keyframes design language groups it (Standard / Sine / Quad / Cubic / Expo / Circ /
  Back / Bounce / Steps / Custom), each card showing the curve NAME, its JS-twin SOURCE label, a
  one-line register note (SETTLE / CONTROL / PLAYFUL / GENTLE / DOCK), a real violet plot of the
  twin's shape (springs and back-curves visibly overshoot-then-settle), and a driven dot that
  fires off the same twin on click. The Custom tab opens a live draggable cubic-bezier. Nothing
  reads as a stub or a fake hint.
- **Spring Orchestrator + Playground** reads FINISHED — the named registers drive off the
  single-source table (the blurb says so AND the source proves it: no local solver), and the
  playground genuinely lets you author a spring (drag response/ζ, read the exact `linear()` stops,
  copy them, seed from a register). I drove it live and watched the stops cross 1.0 and the
  overshoot climb to 20.5% — it is real, not a static mock.
- **Scroll & View Transitions** reads FINISHED — both native capabilities probe "supported", the
  scroll() bar tracks off the main thread, the view() reveal staggers implicitly, and the VT
  reorder animates rows between slots.
- **Foundations ▸ Motion** reads FINISHED — it owns the §6 doctrine legend + the `<Transition>`
  grammar tour and correctly DEFERS the curve canon to the gallery; the old duplicated fake-SVG
  table is gone.
- **The violet identity** is coherent across every motion surface — plots, dots, spring block,
  progress bar, capability dots, VT markers all read the ONE `--motion-accent` violet event. There
  is no warm-red anywhere, and ppmycota stays a demo-local nod that never leaks into the library.
- **The §6 doctrine is not just documented — it is the live behavior**: the real button's surface
  legs glide on the bezier and its scale settles on the smooth spring, one coherent transition set.

No surface drew a "wtf". The motion lane is the cleanest of the AZ surfaces I have seen — the wave
delivered the FULL R3-11 mandate, the fork is genuinely dead (deletion-proof, not a values-check),
and every numeric claim re-verifies live.

---

## 4 — MISSES

**None.** No S1/S2/S3 miss. The only nit-level observations, recorded so the triumvirate does NOT
spend a cycle "fixing" them:

- The `proof:motion-suite` parity sub-gate REDs on a tree where `dist/motion.d.ts` has not been
  emitted (vite arm ran, vue-tsc dts arm did not). This is **build-required, not a regression** —
  GREEN after `npm run build`. It is correct behavior for a distribution-seam gate; no action.
- The spring playground's live state persists my "bouncy" seed in the capture (overshoot 20.5%).
  That is the intended reactivity, not a defect — it is the EVIDENCE the playground is live.

### Non-misses confirmed (recorded so the triumvirate does NOT re-touch them)

- **The springs.vue local-spring fork** — genuinely DEAD (no `damped()`, drives off
  `SPRING_PRESETS`/`springTimingFunction`); do NOT re-touch.
- **The violet `--motion-accent`** — minted demo-local, never enters `src/styles/`; the R3-6
  warm-red is gone from every motion channel. Do NOT touch the library token cascade.
- **The foundations/motion de-dup** — the fake quarter-ellipse paths are deleted; the page owns
  the Transition grammar. Do NOT re-add a curve table there.
- **The full curve taxonomy + the Back/Steps twin SOURCE split** — Back via `bezierPresets`→
  `CSSCubicBezier`, Steps via the value.js step generators, Bounce via the `bounce*Ease` siblings,
  all imported directly from `@mkbabb/value.js` (the sanctioned peer demo dep). This is the shipped
  twin, not a fork. Do NOT "consolidate" it into a hand-rolled sampler.

---

## 5 — VERDICT

**PASS.** The /motion section is the robust motion-language demonstration R3-11 demanded. The full
curve canon renders grouped by the keyframes 10-family taxonomy with every plot driven by its REAL
JS twin (the Back/Steps/Bounce SOURCE split honored); the spring playground authors a spring live
on `SPRING_PRESETS` with the local `damped()` fork genuinely deleted; the scroll-driven +
view-transition facilities have a working first demo; the foundations/motion duplicate is folded
out onto the Transition grammar; the whole family reads ONE coherent ppmycota-violet event
(`--motion-accent`/`--viz-legendre`) with zero warm-red and ppmycota kept demo-local; and the §6
easing doctrine is not only documented but is the live behavior of the real button transitions.
Both gates (`proof:motion-demo` 17/17 + `proof:motion-suite` 24/24+16/16) are GREEN after a build,
and every numeric claim re-verifies live at desktop + mobile, light + dark. No first-time-auditor
"wtf". The surface holds a PASS reflection.
