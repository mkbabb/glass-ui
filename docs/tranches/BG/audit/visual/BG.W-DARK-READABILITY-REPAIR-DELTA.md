# BG.W-DARK-READABILITY-REPAIR — paint-judge DELTA (F2.R2 re-run over the F2.R1 fix)

> **Role:** NON-AUTHORING paint judge. Did NOT build this wave. Verdict is the PAINTED
> truth measured against the wave's own criterion, not the builder's claim.
> **Date:** 2026-07-06. **Branch:** tranche/BG @ HEAD `2ea7f9f5` (fix commit `96774518`
> BG F2 (F2.R1) IS at HEAD; re-built + re-served + re-walked over the fixed bytes).
> **Instrument:** the PROVEN dual-engine `?capture=` pipeline — freshly-BUILT demo dist on
> `:5200` (`npm run demo:dist:build && demo:dist:serve`), Chrome CDP (real Chrome.app 149,
> `connectOverCDP :9333`, GL_RENDERER = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`)
> + off-screen WKWebView (`.wkshot-bin`, system WebKit.framework / Apple GPU / Metal), poll
> `data-capture-ready`. Engine badges decoded in-pixel (WEBKIT/Apple GPU · CHROME/ANGLE-Metal).

## Verdict: **FAIL** (dual-engine dark — the re-run census does NOT read 0 rows below floor)

The F2.R1 register-level fix is real and it CLOSES the wave's headline defect — the PRIMARY
≈1.05 illegible swatch-labels are FIXED, dual-engine confirmed (see "What the fix closed").
But the binding criterion **(c)** — *"the re-run census reads 0 rows below floor dual-engine
dark"* — is still **not met**: a re-run full-route dark walk (120 routes, **5050** visible text
nodes, composited contrast on the engine-resolved painted plate via the paint-arm WCAG-2 + APCA
math) surfaces **37 genuine dark-specific below-floor nodes** that the fix did not reach — and
**two of those classes (avatar white-on-chip, shadow/paper muted captions) were named verbatim
in the wave's OWN prior mustFix (rows 3 and 5) and were left unaddressed.**

## Method / census (how the paint was re-measured)

- **Fresh build.** `demo:dist:build` (the F2.R1 fix at HEAD) → `demo:dist:serve` on `:5200`
  (BUILT bytes, not the `:5199` dev shell). Chrome relaunched on a fresh in-repo throwaway
  profile; the walk chunked (20 routes/pass, fresh page reuse) to keep the viz-route GL-context
  load bounded (a single long-lived page OOM-crashed Chrome at the viz cluster).
- **Chrome CDP** re-walked all **120** routes in dark; the affected routes re-walked in light
  for mode-specificity. For every visible text node: resolved `color` + the **composited plate**
  (ancestor `background-color` chain alpha-composited to the page base; `oklch()`/`color-mix()`/
  `light-dark()`/container-query buckets RESOLVED by the real browser, recovered by 1×1-canvas
  pixel readback where the string parser can't read — NOT token math). Both witnesses: **WCAG-2
  AA** (≥4.5 body / 3.0 large) AND **APCA Lc** (|Lc| ≥ 60 body / 75 small), the exact
  `scripts/lib/paint-arm.mjs` formulas.
- **WKWebView (WebKit/Metal)** captured the fixed routes + the defect routes + the artifact
  route in dark (and the fixed routes in light) for dual-engine paint-provenance.
- Harness + data under `docs/tranches/BG/audit/visual/census/`: `census-rerun-dark.json`
  (120 routes dark), `census-rerun-light.json` (affected routes light), `analyze.mjs`,
  `rerun-chrome/` + `rerun-safari/` PNGs.

## What the fix CLOSED (credit — the headline PRIMARY defect is dead, dual-engine)

| prior defect (F2.R1 mustFix) | prior | now | evidence |
|---|---|---|---|
| **carousel color-swatch labels** (`Warm Cream`/`Kelp`/`Carmine`/…) | **1.05** illegible | **GONE** from census (fixed dark ink on the fixed-light swatch reads in BOTH modes) | `rerun-safari/carousel-safari-dark.png` "Warm Cream" crisp; `rerun-chrome/navigation-carousel-chrome-dark.png` |
| **paper-texture retint labels** (`WARM`/`COOL`/`BONE`) | **1.05–1.11** illegible | **GONE** — crisp dark ink both modes | `rerun-safari/paper-texture-safari-dark.png` (WARM/COOL/BONE read) |
| **timeline step-numbers** (white on brand-ramp) | 1.8–2.8 | **GONE** — `contrast-color()` per-fill ink | timeline not in the dark WCAG-fail set |
| **motion demo chip** (`hello` white on violet) | 2.45 | **GONE** — `contrast-color(var(--motion-accent))` | motion not in the dark WCAG-fail set |
| **feedback/alert + notification muted** (tone-tinted glass) | 3.93–4.27 | **GONE** — DL5 `.feedback-tone` → `--on-glass-muted-strong` | alert/notification not in the dark WCAG-fail set; `rerun-safari/alert-safari-dark.png` |
| **forms toggle/selectable chips + stacked-icons/tags-input pucks** | 3.3–4.0 | **GONE** — DL5 `.glass-capsule` → `--on-glass-muted-strong` | those routes not in the dark WCAG-fail set |

14 of 18 priority routes are 0-WCAG-fail clean in dark; the wave route (`/foundations/typography`)
is clean. The muted register over the near-black page / opaque cards reads WCAG-legible (the
deliberately-subordinate "opaque-canvas KEPT" case, 1452 APCA-only-subordinate nodes NOT counted).

## The FAIL basis — 37 genuine dark-specific below-floor nodes (NOT fixed)

Of the 65 raw dark WCAG-fail nodes: **6 are artifacts** (ruled out), **22 are mode-invariant /
pre-existing** (out of the dark-readability scope, per the prior judge's own framing), and
**37 are genuine dark-specific below-floor defects** — the FAIL basis:

| route(s) | count | node | composited (dark) | WCAG | light | verdict |
|---|---|---|---|---|---|---|
| **data/avatar** | 13 | white fallback initials (`AL`/`AT`/`GH`/`ED`/`DK`/…) on the **dark-arm-LIGHTENED** `--section-color-*` chip | `[255,255,255]` on `[102,204,175]`/`[232,185,109]`/`[109,209,222]`/… | **1.78–2.77** | passes (fill deeper L≈0.53) | **DARK-SPECIFIC** — mustFix #3 named avatar; timeline+motion got `contrast-color()`, avatar did NOT |
| **foundations/shadows** | 11 | `.text-mono-caption text-muted-foreground` swatch labels (`xs`/`sm`/`cartoon`/`modal`/…) on the dark elevated card | `[172,160,145]` on `[71,61,53]` | **4.12** | 5.2 (passes) | **DARK-SPECIFIC** — mustFix #5 named "shadow/paper captions"; DL5 does not reach the opaque elevated-card muted register |
| **display/badge** | 8 | white on jewel-tone loud pills (`rose`/`teal`/`amber`/`slate`/`legendre`/…) — **dark-arm-lightened** fill | `[255,255,255]` on `[232,185,109]`/`[206,142,225]`/… | **1.81–2.93** | passes | **DARK-SPECIFIC** — the W54 loud-pill allowlist is an OPACITY exemption, not a text-contrast one; the pill text genuinely collapses in dark |
| **compositions/configurator** | 3 | `.text-admin-label text-muted-foreground` preset sub-rows (`ink · spread 28`/…) on glass | `[207,200,191]` on `[100,85,68]` | **4.33** | passes | **DARK-SPECIFIC** marginal |
| **foundations/paper-texture** | 2 | `.text-mono-caption` frequency-card captions (`0.65 base / 4 octaves`) on the dark elevated card | `[172,160,145]` on `[75,65,57]` | **3.87** | passes | **DARK-SPECIFIC** — the same opaque-elevated-card muted register as shadows |

**Root cause of avatar+badge (the 21-node bulk):** the `--section-color-*` ramp has a DARK ARM
that LIGHTENS the fill (probe: rose `oklch(0.552…)` light → `oklch(0.721…)` dark; amber
`oklch(0.53…)` → `oklch(0.813…)`), so a hardcoded `text-white` that reads on the deeper
light-mode fill collapses on the pastel dark-mode fill. This is a genuine dark REGRESSION, and
`contrast-color(var(--section-color-…))` (the exact fix already applied to timeline+motion in
F2.R1) closes it in one line per site. Dual-engine confirmed: `rerun-safari/avatar-safari-dark.png`
+ `rerun-chrome/data-avatar-chrome-dark.png` (ED/GH/DK washed in BOTH engines).

**Root cause of shadows/paper/configurator captions:** `--muted-foreground` (dark `--neutral-5`)
on a mid-tone OPAQUE elevated swatch/preset card lands 3.87–4.33 in dark (light reads 5.2). The
F2.R1 DL5 lift reaches `.feedback-tone`/`.glass-capsule`/`.metric-badge` and the calm glass
content-tiers, but NOT the opaque elevated-card muted-caption register these use.

### Ruled OUT — 6 artifacts (pixel-verified, NOT counted)

**compositions/auth-shell** (6 rows incl. the only ≤1.5 "illegible" census entries): the brand
panel fill is a `background-image` warm gradient the color-only composite can't sample, so the
plate falls through to the page base near-black `[11,10,9]` → a spurious 1.13. **Pixel read
(`rerun-safari/auth-shell-safari-dark.png`): the dark ink (`glass-ui` / the display heading /
`SOC 2 Type II` / `End-to-end encrypted` / `Trusted by 12k teams`) reads PERFECTLY on the warm
gradient in both engines.** Composite ARTIFACT, not a defect.

### Ruled OUT — 22 mode-invariant / pre-existing (fail BOTH modes; out of dark-scope)

Destructive buttons (5: dialog `Delete` / search `Clear cache` / toast `Destructive` /
confirm-dialog `Delete workspace` / badge `destructive`, cream on `--destructive` red 3.06,
also 3.57 in light) · metric-badge `—`/`n/a`/`…` dim placeholders (11 across metric-badge +
instrument-chassis, 2.6–2.73 both modes — a dimmer empty-state token DL5's `--muted-foreground`
re-point doesn't touch) · configurator mono sub-labels (3, both modes) · form-validation
required `*` asterisks (2, `--destructive` red both modes) · table `overdue` loud status badge
(1). Recorded, not counted against this dark-readability wave.

**Light arm regression-free:** the affected-route light census surfaced only the pre-existing
`destructive` fail (mode-invariant); the carousel/paper-texture fixes are correct in light
(fixed dark ink on the always-light swatch); no NEW light-mode WCAG-fail introduced by the fix.

## defectLocalization

- **Class A (bulk, 21 nodes): white text on the dark-arm-lightened `--section-color-*` fill.**
  `demo/stories/data/avatar.vue` (fallback initials, `.text-white` on `var(--section-color-N)`)
  and `demo/stories/display/badge.vue` loud-pill register (`.badge-atom`, white on
  `var(--section-color-N)`). The ramp's dark arm lightens the fill to L 0.72–0.81; `text-white`
  collapses to 1.78–2.93. mustFix #3 named avatar; the F2.R1 fix applied `contrast-color()` to
  timeline+motion but not to avatar (or badge). SAME one-line fix.
- **Class B (muted captions on opaque elevated cards, 16 nodes): `text-muted-foreground` on a
  mid-tone opaque swatch/preset card.** `foundations/shadows` swatch labels, `foundations/
  paper-texture` frequency-card captions, `compositions/configurator` preset sub-rows. The DL5
  lift (`.feedback-tone`/`.glass-capsule`/`.metric-badge` + calm glass content-tiers) does not
  reach the opaque elevated-card muted-caption register; it lands 3.87–4.33 dark (5.2 light).
  mustFix #5 named "shadow/paper swatch captions".

## mustFix[]

1. **avatar fallback initials** (`demo/stories/data/avatar.vue`) — give the on-chip initials a
   per-fill contrast-aware ink in dark (`contrast-color(var(--section-color-N))`, the exact fix
   F2.R1 already shipped for timeline+motion). 1.78–2.77 → ≥ 4.5 / APCA ≥ 60.
2. **badge loud pills** (`demo/stories/display/badge.vue` + wherever the loud `.badge-atom`
   jewel register lives) — same per-fill contrast-aware ink in dark. 1.81–2.93 → ≥ 4.5.
   (Or record a formal loud-pill text-contrast allowlist in the gate + roster — but the paint
   collapse is real and dark-specific; an unrostered green sweep is the close-class lie.)
3. **shadow / paper-texture / configurator muted captions on opaque elevated cards** — extend
   the on-glass muted lift (the DL5 `--on-glass-muted-strong` pattern) to the opaque
   elevated-card muted-caption register in dark (a register-level lift, substitution-over-paste).
   3.87–4.33 → ≥ 4.5.
4. **Re-run the full-route dark census after the fix** (both engines) — criterion (c) requires
   0 dark-specific rows below floor; keep the F2.R1 wins un-regressed (carousel/paper labels,
   timeline/motion, feedback tone, glass-capsule chips), keep the light arm regression-free, and
   ADD the avatar/badge/opaque-caption classes to the born-RED roster so the re-run proves them
   fixed.

## Evidence on disk (`docs/tranches/BG/audit/visual/census/`)

Census JSON: `census-rerun-dark.json` (120 routes), `census-rerun-light.json` (affected routes),
`analyze.mjs` (the WCAG-collapse + mode-specificity classifier).

| PNG | engine | mode | shows |
|---|---|---|---|
| `rerun-safari/carousel-safari-dark.png` | WebKit | dark | **FIX** — "Warm Cream" crisp dark ink on light chip |
| `rerun-chrome/navigation-carousel-chrome-dark.png` | Chrome | dark | **FIX** — second engine |
| `rerun-safari/carousel-safari-light.png` | WebKit | light | fixed ink correct in light |
| `rerun-safari/paper-texture-safari-dark.png` | WebKit | dark | **FIX** — WARM/COOL/BONE read (frequency-card caption still faint) |
| `rerun-chrome/foundations-paper-texture-chrome-dark.png` | Chrome | dark | **FIX** — second engine |
| `rerun-safari/avatar-safari-dark.png` | WebKit | dark | **DEFECT** — ED/GH/DK white-on-pastel washed |
| `rerun-chrome/data-avatar-chrome-dark.png` | Chrome | dark | **DEFECT** — second engine (dual-engine) |
| `rerun-safari/shadows-safari-dark.png` | WebKit | dark | **DEFECT** — muted swatch captions faint (4.12) |
| `rerun-chrome/foundations-shadows-chrome-dark.png` | Chrome | dark | **DEFECT** — second engine |
| `rerun-safari/auth-shell-safari-dark.png` | WebKit | dark | **ARTIFACT** — dark ink on warm gradient reads perfectly |
| `rerun-safari/alert-safari-dark.png` | WebKit | dark | **FIX** — DL5 feedback-tone muted legible |
| `rerun-chrome/foundations-typography-chrome-dark.png` | Chrome | dark | wave route clean (core fix) |
| `rerun-chrome/feedback-alert-chrome-dark.png` | Chrome | dark | DL5 second engine |

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. Zero `src`/`demo`/`styles`/`scripts`
edits — the defect is RECORDED, never patched (the census harness + `analyze.mjs` live under
`docs/tranches/BG/audit/visual/census/`, which the fence permits). No `/tmp` output. No sibling
under `~/Programming` touched/moved (the `:4321` sci-report preview was left running, untouched).
`verify-siblings-intact.mjs --quiet` exit 0 before AND after. `demo:dist:serve` + Chrome CDP
killed + the throwaway profile removed on completion.
