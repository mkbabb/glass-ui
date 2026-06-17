# W-DISPLAY-TRACKING — DELTA (the display-ONLY Apple-calibrated negative tracking + ~1.05 leading)

**Freshness headers (AZ-form):**

| field | value |
|---|---|
| capture date | 2026-06-17 |
| HEAD sha (pre-edit) | `086c030e97f26dcc3a86c0a33db931befb03f8cf` |
| branch | `tranche/BB` |
| dev-box | darwin 25.4.0 (Apple, Metal) |
| Chromium | the tests-visual Playwright `chromium-headless-new` + `coarse-touch` projects @ `:5199` |
| π capture | LOCAL-ONLY (`tests-visual/display-tracking.spec.ts`); the binding live capture rides **W-REFLECT3** (the demo dev server was not up in this impl session — the source/static derivation half is captured here; the live `getComputedStyle` readback JSON lands at `docs/tranches/BB/audit/visual/W-DISPLAY-TRACKING-readback.json` on the W-REFLECT3 pi run) |

---

## The charge

The deep-SOTA audit (`audit/sota-deep/findings.md:10,37`): Apple's live display type carries a tight **NEGATIVE** tracking ≈ **−1.5% of size** (measured 80px → −1.2px; home 34px → −0.374px ≈ −1.1%) + a tight **~1.05 line-height** (84/80). This is THE signature that separates "designed" display type from "just big." glass-ui owns a magnificent √φ audacious ladder but its tracking + leading were not Apple-calibrated.

## §0 RE-GROUND findings (re-grepped at HEAD `086c030e`)

| finding id | recorded state | HEAD-confirmed state | drift |
|---|---|---|---|
| **DISPLAY-SHARES-TRACKING** | the display rungs read the SHARED `--type-tracking-tight` (also the heading/title register's tracking) | CONFIRMED — all display @utilities read `letter-spacing: var(--type-tracking-tight)`; `text-title` reads the SAME token | line-numbers drifted (file is 220 lines; the rungs are at the SAME structural positions) |
| **DISPLAY-LEADING-LOOSE** | `--type-leading-display: 1.1` (scheme-motion.css:54) | CONFIRMED — `scheme-motion.css:54` reads `1.1` | none |
| **HERO-OUT-OF-SCOPE** | `text-hero` is a separate poster register w/ own knobs | CONFIRMED — `text-hero` at `semantic.css:41-57`, `--text-hero-leading: 0.84` / `--text-hero-tracking: -0.03em`, reads NEITHER ladder rung | none |
| **the "nine display @utilities" count** | the spec prose says NINE; cites `:27,63,73,83,93,103,113,123` (= EIGHT lines) | **DRIFT — there are EXACTLY 8 display @utilities** (`text-display`, `-2`, `-3`, `-4`, `-5`, `-mega`, `-hero`, `-audacious`); `text-hero` is the 9th-named but is the OUT-OF-SCOPE poster register, NOT a ladder rung | the spec's "nine" is an off-by-one (it counted `text-hero` as a ladder rung); the gate + π enumerate the real 8 |
| **non-display consumers of `--type-tracking-tight`** | text-title:136, configurator.css:26, utilities.css:96, MetricRow.vue:228 | CONFIRMED present, line-numbers drifted: `text-title` semantic.css:136, `configurator.css:26`, `typography/utilities.css:108` (was :96), `MetricRow.vue:244` (was :228) | line-numbers drifted; all four still read the shared rung |
| **`.text-pane-title` (utilities.css:104)** | (not named in the spec) | a display-family AUX pane title reads BOTH `--type-leading-display` AND `--type-tracking-tight` — it is NOT one of the 8 `@utility text-display*` rungs | RECORDED: it keeps `--type-tracking-tight` (a non-display consumer, T5 fence) but DOES inherit the re-calibrated `--type-leading-display` (legitimate — it is a display-family pane title; the spec fences the TRACKING to display-only, the leading is the display leading rung this pane shares) |

This wave EVOLVES already-shipped tokens (the √φ ladder + the leading/tracking rungs) — not a blind rebuild. The clamp() vw-axis + the size tokens are PRESERVED.

## The Apple-calibration derivation

- **Tracking.** Apple measure: 80px → −1.2px ⇒ −1.2/80 = **−0.015em = −1.5%** of size. The home measure 34px → −0.374px ⇒ −0.011em ≈ −1.1% (the optical-sizing natural taper at the small end). The em-relative form is proportional-in-px by construction (an em IS a multiple of font-size), so a single **`-0.015em`** carries a constant −1.5% across the whole `clamp()` ladder (φ² → φ^(11/2)). `font-optical-sizing: auto` (already set on every display @utility) carries the small-end taper toward Apple's −1.1% — so a single em value at the −1.5% measure is the in-scope harden; a per-rung `calc()` taper is the booked successor (see §Named successors).
- **The HEAD `-0.025em` was OVER-aggressive, not under.** −0.025em is −2.5% at every rung — TIGHTER than Apple's −1.5%. So the calibration RELAXES the tracking toward the designed band (40% less negative), while the leading TIGHTENS — both move toward the Apple signature.
- **Leading.** Apple 84/80 = **1.05**. The HEAD `1.1` is loose. `--type-leading-display: 1.1 → 1.05` (the 84/80 signature; in the face-safe 1.04–1.06 band so the largest poster rungs — mega 177px / audacious 352px — do not clip ascenders/descenders).

## Before / after — per-rung tracking measure (at the clamp peaks)

| rung | φ-stop | peak px | HEAD track (`-0.025em`) | NEW track (`-0.015em`) | Δ |
|---|---|---|---|---|---|
| `text-display`   | φ²        |  41.9 | −1.047px | −0.628px | +0.419px (40% less negative — toward the Apple −1.5% band) |
| `text-display-2` | φ^(5/2)   |  53.3 | −1.332px | −0.799px | +0.533px |
| `text-display-3` | φ³        |  67.8 | −1.694px | −1.017px | +0.678px |
| `text-display-4` | φ^(7/2)   |  86.1 | −2.153px | −1.292px | +0.861px |
| `text-display-5` | φ⁴        | 109.7 | −2.742px | −1.645px | +1.097px |

(The mega/hero/audacious poster rungs scale the SAME −1.5%; e.g. at the 80px Apple anchor the rung resolves exactly −1.2px — the byte-matched Apple measure.)

| leading | HEAD | NEW |
|---|---|---|
| `--type-leading-display` | 1.1 | **1.05** (Apple 84/80) |

## The edits (token-first, clean break, no alias)

1. **`src/styles/tokens/scheme-motion.css`** — minted `--type-tracking-display: -0.015em` (the display-ONLY Apple −1.5% rung) in the `--type-tracking-*` block beside `--type-tracking-tight` (kept `-0.025em`); tightened `--type-leading-display: 1.1 → 1.05`. The other leading/tracking rungs UNTOUCHED.
2. **`src/styles/typography/semantic.css`** — re-pointed the 8 display @utilities' `letter-spacing: var(--type-tracking-tight)` → `var(--type-tracking-display)`. The leading reaches all 8 through the existing `var(--type-leading-display)` reads (no leading-line edit). `text-title` (the heading register, keeps `--type-tracking-tight` + `--type-leading-heading`), `text-hero` (poster register), and the body/caption block are BYTE-untouched.
3. **`src/styles/theme/bridges.css`** — bridged `--tracking-display: var(--type-tracking-display)` alongside the `--tracking-*` family (the `tracking-display` Tailwind utility — the token-first consumer affordance). The `--leading-display` bridge (`:46`) already tracks the re-calibrated rung (no edit).

## The PRESERVE fences (held)

- `text-hero` + `--text-hero-leading: 0.84` / `--text-hero-tracking: -0.03em` — BYTE-untouched (T6 GREEN).
- The body/caption/small/prose/micro/admin-label register — BYTE-untouched (T3 GREEN).
- `text-title`/`text-heading`/`text-subheading` keep their existing tokens (T4 GREEN); `text-title` still reads `--type-tracking-tight` (T5 GREEN).
- `--type-tracking-tight` unchanged (`-0.025em`) + all 4 non-display consumers still read it (T5 GREEN).
- The `--type-display-*` SIZE tokens + the clamp() vw-axis (`scale.css:122-146`) — UNTOUCHED (this wave changes tracking + leading, NOT size).
- ZERO color token touched (pure type metrics; the ppmycota fence is irrelevant to this wave by construction).

## Gate evidence

`proof:display-tracking` born-RED at HEAD `086c030e` (4 fails: T1, T2, bridge, π-spec; PRESERVE clauses T3/T4/T5/T6 + self-test green) → **9/9 GREEN** at close. The self-test bite fires: re-point one display @utility back onto the shared rung REDs T1; an alias `var(--type-tracking-tight)` is out of the −1.5% band REDs T1; leaving the leading at 1.1 REDs T2; mutating `--type-tracking-tight` to `-0.015em` (the shared-rung-bleed) REDs T5.

Sibling gates GREEN after the calibration: `proof:hierarchy`, `proof:suffuse`, `proof:suffuse2`, `proof:no-god-module` (scheme-motion.css 352 lines, well under 500).

## π readback (clause 6 — the binding visual truth)

The π spec `tests-visual/display-tracking.spec.ts` (LOCAL-ONLY, `tags: ["local"]`, `:5199`) asserts, BOTH modes:
- **D1** — each display rung (`text-display`/`-2`/`-3`/`-4`/`-5`) resolves `letterSpacing/fontSize` ≈ −1.5% (NEGATIVE, in the Apple band [−0.9%, −2.1%], DISTINCT from the body 0% and the −2.5% shared rung) AND `lineHeight/fontSize` in the ~1.05 band [1.035, 1.065].
- **D2** — the body/caption rungs (`text-body`/`text-caption`/`text-prose`) resolve NON-negative tracking (the display rung never reached them) — the fence holds in the render.
- **D3** — `text-title` resolves the −2.5% shared tight rung (more negative than the −1.5% display band — NOT re-pointed) + the heading leading (≈1.2, NOT the display ~1.05); `text-heading` carries no negative display tracking.

The live readback JSON lands at `W-DISPLAY-TRACKING-readback.json` on the W-REFLECT3 pi run (the demo dev server was not up in this impl session). The cardinal-lesson capture (the side-by-side designed-vs-just-big render) rides W-REFLECT3.

## proof:ba-gestalt type verdict (clause 7)

The type surface (the foundations typography ladder + the activated display tiers on the motion/hero surfaces the SUFFUSE waves enrolled) is on the `proof:ba-gestalt` `motion-fourier`/type roster, judged whole-page BOTH modes at W-REFLECT2. **Verdict pending the W-REFLECT2 flip** (born against the R8 ground; this wave's calibration is the type-half of the eventual type-gestalt PASS — the ladder now reads the tight Apple-grade tracking + leading pulling the headline into a cohesive mass, vs the HEAD `1.1`/`-0.025em` "just-big looser letters" ground). Per BB inv-4 the per-mechanism T1–T5 greens alone do not close the visual wave; the operative gestalt PASS rides W-REFLECT2/3.

## Named successors (booked)

- **A per-rung tracking taper** (if a single em value reads "too tight" at φ² or "not tight enough" at the poster rungs across three iterations) — booked to a tracking-taper successor (`calc()`-per-rung OR a confirmation that `font-optical-sizing: auto` carries the small-end taper). The ladder ships the calibrated proportional band now.
- **The variable-font optical-size axis** (SF-Pro-Display-style optical thinning at poster size) — booked OUT (a font-payload decision; the bundled Plus Jakarta Sans has `font-optical-sizing: auto` but no variable optical-size axis at HEAD).
