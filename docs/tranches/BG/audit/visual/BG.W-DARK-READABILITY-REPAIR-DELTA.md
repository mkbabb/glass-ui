# BG.W-DARK-READABILITY-REPAIR — paint-judge DELTA (F2.R1)

> **Role:** NON-AUTHORING paint judge. Did NOT build this wave. Verdict is the PAINTED
> truth measured against the wave's own criterion, not the builder's claim.
> **Date:** 2026-07-06. **Branch:** tranche/BG @ HEAD `20b09bc7` (fix commit `3ea6b051`).
> **Instrument:** the PROVEN dual-engine `?capture=` pipeline — built demo dist on `:5200`
> (`npm run demo:dist:build && demo:dist:serve`), Chrome CDP (real Chrome.app 149,
> `connectOverCDP :9333`, GL_RENDERER = ANGLE Metal Apple M5 Max) + off-screen WKWebView
> (`wkshot-live.m`, system WebKit.framework / Apple GPU / Metal), poll `data-capture-ready`.

## Verdict: **FAIL** (dual-engine dark — the full-route census does NOT read 0 rows below floor)

The wave's CORE register fix is real and lands (see "What works"). But the binding criterion
(c) — *"the re-run census reads 0 rows below floor dual-engine dark"* — is **not met**: a
full-route dark walk (120 routes, **4369** visible text nodes, composited contrast measured on
the engine-resolved painted plate via the paint-arm WCAG-2 + APCA math) surfaces genuine
dark-specific below-floor nodes the wave's born-RED roster never enumerated. Two are
**visually confirmed illegible** (contrast ≈ 1.05:1) in BOTH engines, and are DARK-SPECIFIC
(they read fine in light). A green sweep with these un-rostered is the close-class lie the
criterion (a) forbids.

## Method / census (how the paint was measured)

- **Chrome CDP** walked all **120** routes in dark (+ the 21 affected routes in light for
  mode-specificity, + priority routes both modes). For every visible text node: the resolved
  `color` and the **composited plate** (the ancestor `background-color` chain alpha-composited
  down to the page base — every `oklch()`/`color-mix()`/`light-dark()`/container-query bucket
  already RESOLVED by the real browser; colors that the string parser can't read are recovered
  by a 1×1-canvas pixel readback, so `oklch()` plates like the dark `--primary` violet resolve
  faithfully — NOT token math). Both witnesses: **WCAG-2 AA** (≥ 4.5 body / 3.0 large) AND
  **APCA Lc** (|Lc| ≥ 60 body / 75 small), the exact `scripts/lib/paint-arm.mjs` formulas.
- **WKWebView (WebKit/Metal)** captured the defect routes + the wave route in both modes for
  the paint-provenance (in-pixel engine badge decodes ENGINE/GPU/VIEW/MODE).
- Harness under `docs/tranches/BG/audit/visual/census/` (census.mjs / capture-chrome.mjs /
  wkshot-live). Census data: `census-full.json` (dark all-routes + light affected),
  `census-light-affected.json`, `census-recheck.json`.

## What WORKS (credit to the wave's core register fix)

The wave's register-level fixes (`--on-glass-muted` dark arm, the card field-floor dark arm,
the bright-bucket `--foreground` lockstep, the W-DARK-MATERIAL luminous-dark register) **land
in paint**. Of the 18 named priority routes, **14 are 0-WCAG-fail clean in dark** and the rest
carry only marginal/out-of-scope items:

| priority route | dark WCAG-fail | note |
|---|---|---|
| foundations/typography · colors · intro | 0 | clean — muted eyebrow/blurb read (WCAG 7.7:1) |
| display/card · section | 0 | **DL1 card field-floor dark arm works** — cream labels + muted body read over the warm amber field-floor (no hot lamp) |
| data/data-table · metric-cell · metric-stack | 0 | clean |
| forms/inputs · select | 0 | clean |
| feedback/progress | 0 | clean |
| compositions/settings · math-paper | 0 | clean (recheck; a transient 0-node read during the big run) |
| navigation/toc-tracking | 0 (recheck) | clean + legible; the big-run "10 fails" on a near-white plate were a transient active-state/strain artifact, not reproducible |
| data/table | 1 | the `overdue` saturated status badge only (loud-pill register) |
| feedback/alert · notification | 2 / 3 | muted descriptions/labels on tone-tinted glass plates, WCAG 3.93–4.27 (marginal, faint-but-readable) |

The muted register over the near-black page/opaque cards reads **WCAG 5.4–7.7:1** (APCA
subordinate ~48–52 but WCAG-legible) — the deliberately-subordinate "opaque-canvas KEPT" case,
visually confirmed legible (typography eyebrow/blurb read cleanly in both engines).

## Below-floor roster (the FAIL basis — dark-specific, not in the wave's born-RED roster)

### PRIMARY — visually-confirmed ILLEGIBLE, ratio ≈ 1.05, dual-engine, dark-specific

The `--foreground` label is painted directly on a **fixed LIGHT-colored demo swatch**. In dark
`--foreground` = warm cream → collapses on the light chip. In light `--foreground` = dark ink →
reads fine (dual-engine confirmed). Register-substitution cannot reach it (the plate is a fixed
demo color, not a glass tier).

| route | node | composited | WCAG | APCA | light-mode |
|---|---|---|---|---|---|
| **navigation/carousel** | swatch labels `Warm Cream` / `Kelp` / `Carmine` / `base surface` / `accent — *` | cream `[233,230,226]` on light swatch `[237,204,182]`/`[182,237,218]`/… | **1.05–1.39** | 0–19 | dark-ink, readable ✓ |
| **foundations/paper-texture** | retint swatch labels `WARM` / `COOL` / `BONE` | cream `[233,230,226]` on light paper `[244,235,214]`/`[230,237,244]`/`[246,241,232]` | **1.05–1.11** | 0 | dark-ink, readable ✓ |

Visual proof: `sus-navigation-carousel-safari-dark.png` ("Warm Cream" barely visible) vs
`navigation-carousel-chrome-light.png` ("Carmine" crisp dark ink); `sus-foundations-paper-texture-safari-dark.png`
("WARM/COOL/BONE" ghost) vs `sus-foundations-paper-texture-safari-light.png` (crisp dark ink).

### SECONDARY — dark-specific below-floor (less severe; pass in light)

| route(s) | node class | composited | WCAG |
|---|---|---|---|
| data/avatar, data/timeline | white initials / step-numbers on saturated color chips | `[255,255,255]` on `[233,123,171]`/`[232,185,109]`/… | 1.78–2.77 |
| display/badge | white on jewel-tone loud pills (rose/teal/amber/slate/indigo/…) | `[255,255,255]` on `[232,185,109]`/… | 1.81–2.93 |
| foundations/motion | white `hello` on violet demo chip | `[255,255,255]` on `[206,142,225]` | 2.45 |
| forms/toggle · toggle-chip · selectable-chip | muted label on selected-glass capsule chip | `[172,160,145]` on `[77–95,60–78,47–77]` | 3.3–4.0 |
| display/stacked-icons, data/tags-input, data/avatar `+3` | muted `+3` / `✕` on puck | `[172,160,145]` on `[82,65,49]` | 3.79 |
| feedback/alert, feedback/notification | muted descriptions / mono labels on tone-tinted glass | `[172,160,145]` on `[79,61,40]`/`[60,60,67]`/… | 3.93–4.27 |
| foundations/shadows, foundations/paper-texture (caption) | muted swatch-caption on elevated card | `[172,160,145]` on `[71,61,53]`/`[75,65,57]` | 3.87–4.12 |
| display/metric-badge | dim `—` placeholder on glass | `[90,81,72]` on `[35,29,24]` | 2.05–2.15 |

### NOTED — mode-INVARIANT (fails BOTH modes; pre-existing, out of THIS wave's dark-scope)

- Destructive buttons (`Delete` / `Clear cache` / `Destructive` / `Delete workspace` + Badge
  `destructive`): cream on `--destructive` red `[235,71,71]` = **3.06** in dark, dark-ink on red
  `[219,36,36]` = 3.57 in light — a pre-existing destructive-contrast calibration present in
  both modes, not a dark regression. Recorded, not counted against this wave.

### CONFIRMED NON-DEFECTS (census composite artifacts, ruled out by pixel read)

- **compositions/auth-shell** — `glass-ui` / display heading / `SOC 2 Type II` in dark ink
  computed 1.13:1 against the page, but the brand panel's fill is a `background-image` warm
  gradient the color-only composite can't sample. Pixel read (`sus-compositions-auth-shell-safari-dark.png`):
  dark ink on the warm gradient reads **perfectly**. Artifact, NOT a defect.

## defectLocalization

- **Class 1 (PRIMARY): fixed-light-swatch labels use mode-dependent `--foreground`.**
  `demo/stories/navigation/carousel.vue` (color-sample swatch labels `Warm Cream`/`Kelp`/…)
  and `demo/stories/foundations/paper-texture.vue` (retint swatch labels `WARM`/`COOL`/`BONE`)
  overlay `--foreground`/`text-muted-foreground` text on a FIXED light swatch color. In dark
  `--foreground` inverts to cream → 1.05:1 collapse. The swatch color is fixed (mode-invariant),
  so the label needs a contrast-aware ink (a scrim, a per-swatch computed on-color foreground,
  or a fixed dark label since the swatch is always light) — NOT the on-glass register.
- **Class 2 (SECONDARY): white-on-saturated chips.** avatar fallback / timeline step-node /
  badge loud-pill / motion demo chip paint `text-white` on a mid-saturated fill. Light passes
  (dark-ink or lighter fill); dark inverts to white on the same mid fill → 1.8–2.9. The
  avatar/badge sit on the W54 loud-register allowlist (opaque loud pills), but contrast still
  drops; the timeline/motion chips are demo-side.
- **Class 3 (SECONDARY): muted register on mid-tone / tone-tinted plates.** `--muted-foreground`
  (dark neutral-5 cream) on selected-glass capsules, tone-tinted feedback plates, pucks, and
  elevated swatch cards lands 3.3–4.27 (just below AA 4.5). The on-glass-muted lift reaches the
  calm content-tier glass; it does NOT reach these mid-tone/selected/tinted plates.

## mustFix[]

1. **carousel color-swatch labels** — give the on-swatch label a contrast-aware ink in dark
   (the swatch is a fixed light color; the label must not follow `--foreground` into cream).
   `[233,230,226]` on `[237,204,182]` = 1.05 → target ≥ 4.5 / APCA ≥ 60.
2. **paper-texture retint swatch labels (`WARM`/`COOL`/`BONE`)** — same fix; on-swatch ink must
   not invert to cream in dark. 1.05–1.11 → ≥ 4.5.
3. **avatar / timeline / motion white-on-saturated chips** — lift the on-chip text contrast in
   dark (a darker on-color ink or a stronger fill), 1.8–2.9 → ≥ 4.5 (or ≥ 3.0 large + APCA).
4. **feedback/alert + feedback/notification muted labels on tone-tinted glass** — extend the
   on-glass-muted lift to the tone-tinted feedback plates (these are the wave's own on-glass
   register scope), 3.93–4.27 → ≥ 4.5.
5. **forms toggle/selectable chips, stacked-icons/tags-input pucks, shadow/paper swatch
   captions, metric-badge `—`** — lift the muted-on-mid-tone register in dark, 2.05–4.12 → ≥ 4.5.
6. **Re-run the full-route dark census after the fix** (both engines) — criterion (c) requires 0
   rows below floor; re-earn the priority-route clean state (regression-free) and add the
   swatch-label + saturated-chip classes to the wave's born-RED roster so the re-run proves them
   fixed.

## Evidence on disk (`docs/tranches/BG/audit/visual/census/`)

| PNG | engine | mode | shows |
|---|---|---|---|
| `sus-navigation-carousel-safari-dark.png` | WebKit | dark | "Warm Cream" label collapse (1.05) |
| `navigation-carousel-chrome-dark.png` | Chrome | dark | same, second engine |
| `navigation-carousel-chrome-light.png` | Chrome | light | "Carmine" crisp dark ink (dark-specific proof) |
| `sus-navigation-carousel-safari-light.png` | WebKit | light | readable dark ink |
| `sus-foundations-paper-texture-safari-dark.png` | WebKit | dark | WARM/COOL/BONE ghost (1.05–1.11) |
| `foundations-paper-texture-chrome-dark.png` | Chrome | dark | same, second engine |
| `sus-foundations-paper-texture-safari-light.png` | WebKit | light | crisp dark ink (dark-specific proof) |
| `foundations-paper-texture-chrome-light.png` | Chrome | light | crisp dark ink |
| `foundations-typography-chrome-dark.png` / pipeline-validate `dark-readability-{chrome,safari}-*` | both | both | wave route CLEAN (core fix) |
| `display-card-chrome-dark.png` | Chrome | dark | DL1 field-floor works (labels legible over amber) |
| `feedback-alert-chrome-dark.png` | Chrome | dark | titles legible; muted descriptions faint (4.0–4.3) |
| `data-table-chrome-dark.png` | Chrome | dark | body ink `--foreground` (clean) |
| `sus-display-badge-safari-dark.png` | WebKit | dark | loud-pill register (allowlist) |
| `sus-compositions-auth-shell-safari-dark.png` | WebKit | dark | artifact ruled out (dark ink on warm gradient reads) |
| `sus-toc-tracking-safari-dark.png` | WebKit | dark | clean (transient fails not reproduced) |

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. Zero `src`/`demo`/`styles`/`scripts`
edits — the defect is RECORDED, never patched. No `/tmp` PNG/DELTA output (harness + captures
live under `docs/tranches/BG/audit/visual/census/`; the compiled `wkshot-live` binary + the
`.chrome-profile-census` dot-dir are in-repo throwaways removed on completion). No sibling under
`~/Programming` touched/moved. `verify-siblings-intact.mjs --quiet` exit 0 before AND after.
`demo:dist:serve` + Chrome CDP killed on completion.
