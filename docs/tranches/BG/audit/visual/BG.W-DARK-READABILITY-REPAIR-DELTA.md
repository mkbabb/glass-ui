# BG.W-DARK-READABILITY-REPAIR — paint-judge DELTA (F2.R3 re-run over the F2.R2 fix)

> **Role:** NON-AUTHORING paint judge. Did NOT build this wave. Verdict is the PAINTED
> truth measured against the wave's own criterion, not the builder's claim.
> **Date:** 2026-07-07. **Branch:** `tranche/BG` @ HEAD `d49a9189` (the F2.R2 Class-A/B fix
> is committed on the tree AND present in the freshly-built bytes; verified directly).
> **Instrument:** the PROVEN dual-engine `?capture=` pipeline — freshly-BUILT demo dist on
> `:5200` (`npm run demo:dist:build && demo:dist:serve`, BUILT bytes not the `:5199` dev
> shell), Chrome CDP (real Chrome.app 149, `connectOverCDP :9333`, GL_RENDERER =
> `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`) + off-screen WKWebView
> (`.wkshot-live-bin`, system WebKit.framework / Apple GPU / Metal), poll `data-capture-ready`.
> Engine badges decoded in-pixel on every capture (CHROME/ANGLE-Metal · WEBKIT/Apple GPU).

## Verdict: **PASS** (dual-engine dark — the re-run census reads 0 genuine dark-specific rows below floor; light arm regression-free; warm-not-gray held)

The F2.R2 register-level fix CLOSES the entire prior FAIL basis. The F2.R1→R2 re-run FAIL
DELTA enumerated **37 genuine dark-specific below-floor nodes** (Class A: 13 avatar + 8 badge;
Class B: 11 shadows + 2 paper-texture + 3 configurator-preset). A re-run full-route dark walk
over the fixed bytes finds **0 of those 37 surviving** — every one is now legible, dual-engine
confirmed. The 21 raw dark WCAG-fails that remain are **6 auth-shell composite artifacts**
(pixel-verified: dark ink on a warm `background-image` gradient the color-only census can't
sample) + **15 mode-invariant pre-existing** nodes (all classified `both-modes` against the
light census — destructive buttons, `—` empty-state placeholders, `*` asterisks, `text-micro`
mono annotations, a loud status badge) that fail in BOTH modes and are out of the
dark-readability wave's scope by the prior judge's own established framing.

## Method / census (how the paint was re-measured)

- **Fresh build.** `demo:dist:build` (the F2.R2 fix at HEAD) → `demo:dist:serve` on `:5200`.
  Fixed bytes confirmed in the served dist: `avatar-*.js`/`badge-*.js`/`timeline-*.js` carry
  `contrast-color(var(--section-color-…))`; the dark `--on-glass-muted-strong` compiles to
  `#d5d0c8` (= `hsl(36 13% 81%)`, L81 — the recalibration).
- **STALE-ROUTE TRAP CAUGHT + AVOIDED (the load-bearing rigor of this judgment).** The prior
  census `routes.json` (120 routes, generated 07-06 12:30) is STALE: the `BG.W-DEMO-IA-REDESIGN`
  (F7, committed 07-07 07:09, at HEAD) collapsed the demo IA **120 → 94 routes** AFTER that
  file was written. `?capture=/data/avatar` and `?capture=/foundations/paper-texture` now render
  the **404 page** ("Lost in the lattice / That route drifted off the graph") — a stale-route
  census would false-CLEAN both fix-target routes. The route set was re-derived from the LIVE
  `vue-router` (`getRoutes()`, 94 leaf routes → `census/routes-current.json`) and the census
  re-run over it. The folded fix targets were re-located and measured where they render NOW:
  avatar → `/display/atoms` behind the family switcher (async-imports `../data/avatar.vue`);
  paper-texture frequency captions → `/foundations/paper-glass`.
- **Chrome CDP** re-walked all **94** current routes in dark (chunked 16/pass to bound the
  viz-cluster GL load) — **4015** visible text nodes. For every node: resolved `color` + the
  composited plate (ancestor `background-color` chain alpha-composited to the page base;
  `oklch()`/`color-mix()`/`light-dark()`/`contrast-color()`/container buckets RESOLVED by the
  real browser via 1×1-canvas pixel readback — NOT token math). Both witnesses: **WCAG-2 AA**
  (≥4.5 body / 3.0 large) AND **APCA Lc** (|Lc| ≥ 60 body / 75 small), the exact
  `scripts/lib/paint-arm.mjs` formulas. `analyze.mjs` separates the binding **WCAG-fail** floor
  from the acknowledged **APCA-only-subordinate** register (the 1090 muted-on-glass/opaque-canvas
  KEPT nodes — the deliberately-subordinate muted register the prior judge + the gate DL2/DL5
  clauses established as acceptable, WCAG being the binding floor for an idle muted label).
- **16 routes re-walked in light** (every route bearing a dark WCAG-fail + the fix-affected set)
  for mode-specificity.
- **Avatar (behind the atoms family switcher)** was measured directly (Chrome switch-activate +
  the census contrast fn) and captured (Chrome switch + screenshot) — the census default walk
  can't reach an inactive switcher pane.
- **WKWebView (WebKit/Metal)** captured the fix classes + the wave route + the artifact route in
  dark (+ the wave route in light) for dual-engine paint-provenance.
- Harness + data under `docs/tranches/BG/audit/visual/census/`: `census-current-dark-merged.json`
  (94 routes), `census-current-light-check.json`, `routes-current.json`, `analyze.mjs`. Captures
  under `docs/tranches/BG/audit/visual/dark-readability-repair/`.

## What the fix CLOSED — the prior 37-node dark-specific basis is dead, dual-engine

| prior FAIL class (dark-specific) | prior WCAG | now | evidence |
|---|---|---|---|
| **avatar fallback initials** (13, white on `--section-color-*` lightened chip) | 1.78–2.77 | **BLACK `contrast-color()` ink** (~10–13:1) | `display-atoms-avatar-chrome-dark.png` (AL/AT/GH/ED/CS/BL/DK black on pastel; roster + grouped stack) |
| **badge loud pills** (8, white on jewel-tone/viz fill) | 1.81–2.93 | **BLACK `contrast-color()` ink**, DUAL-ENGINE | `display-badge-chrome-dark.png` + `display-badge-safari-dark.png` (rose/teal/amber/slate/indigo/fourier/chebyshev/legendre black in BOTH) |
| **shadows swatch labels** (11, `text-mono-caption text-muted-foreground`) | 4.12 | **WCAG 6.89** (`--on-glass-muted-strong` L81, `[213,208,200]`) | census + `foundations-shadows-safari-dark.png` (XS…2XL / CARTOON…ELEVATED read) |
| **paper-texture freq captions** (2) | 3.87 | **L81 lift `[213,208,200]`**, moved to `/foundations/paper-glass` | census (`0.65 base / 4 octaves`) + `foundations-paper-glass-safari-dark.png` |
| **configurator preset sub-rows** (3, `.text-admin-label` on `.glass-capsule`) | 4.33 | **L81 lift 4.68** (`.glass-capsule` → `-strong`) | `compositions-configurator-safari-dark.png` (INK/AURORA/GOUACHE · SPREAD read) |
| **feedback/alert + notification muted** (DL5, tone-tinted glass) | 3.93–4.27 | **GONE** (`.feedback-tone` → `-strong`) | `feedback-alert-safari-dark.png` (Default/Destructive/Warning descriptions read) |

**The `contrast-color()` DUAL-ENGINE litmus (the load-bearing concern):** `contrast-color()` is
CSS-Color-5, new in Safari 26. If WebKit fell back to the authored `text-white`, the Class-A fix
would REGRESS in Safari. It does NOT — the badge loud pills (default-visible on `/display/badge`)
paint **black ink identically in Chrome AND WebKit** (`display-badge-{chrome,safari}-dark.png`),
so `contrast-color(var(--section-color-N))` resolves in both engines. Avatar uses the identical
mechanism (badge is its dual-engine witness).

## The FAIL-basis is empty — the 21 remaining dark WCAG-fails are artifacts or mode-invariant

| class | count | routes | why NOT a dark-readability defect |
|---|---|---|---|
| **auth-shell composite artifact** | 6 | `/compositions/auth-shell` | `hasImg=true`; the brand panel fill is a warm `background-image` gradient the color-only composite can't sample → falls through to page near-black `[11,10,9]` → spurious 1.13. **Pixel-verified dual-engine** (`compositions-auth-shell-safari-dark.png`): the dark ink (`glass-ui`, the display heading, `SOC 2 Type II`, `End-to-end encrypted`, `Trusted by 12k teams`, the prose) reads PERFECTLY on the warm gradient. Measurement false-negative, not a defect. |
| **destructive buttons/badge** | 5 | dialog `Delete`, search `Clear cache`, badge `destructive`, confirm-dialog `Delete workspace`, toast `Destructive` | cream on `--destructive` red, WCAG 3.06 dark / 3.57 light — `both-modes`, pre-existing, out of dark-scope |
| **`—` empty-state placeholders** | 4 | `/compositions/instrument-chassis` | `metric-badge__amount` dim empty-state token, 2.84 dark / 2.0 light — `both-modes`, a dimmer empty-state token the muted re-point doesn't touch |
| **`text-micro` mono annotations** | 3 | `/compositions/configurator` | `--field-*`/`medium`/`spread` tiny mono labels, 3.39 dark / 3.05 light — `both-modes` micro-annotation register (distinct from the preset sub-rows, which ARE fixed) |
| **`*` required asterisks** | 2 | `/compositions/form-validation` | `--destructive` red, 3.31 dark / 4.21 light — `both-modes` |
| **`overdue` loud status badge** | 1 | `/data/table` | loud jewel-tone status pill, 3.8 dark / 3.57 light — `both-modes` |

Every non-artifact remainder is marked `both-modes` by the dark-vs-light cross-reference — it
fails identically in light and is therefore a pre-existing / mode-agnostic contrast tradeoff,
not a dark-readability regression this wave owns.

## Light arm regression-free

The 16-route light census surfaced **20 WCAG-fails, all pre-existing classes**: destructive
buttons (3.57), `/data/table` loud status badges (`paid`/`pending`/`overdue` 3.55–4.15 — a
mode-agnostic loud-pill register untouched by the fix), `—` empty placeholders (2.0),
`text-micro` mono (3.05). **The fix-affected routes** — shadows, paper-glass, carousel, alert,
notification, typography — have **0 light WCAG-fails**. No NEW light-mode WCAG-fail was
introduced by the F2.R2 fix (the dark `--on-glass-muted-strong` L81 recalibration is DARK-arm
only; the light `-strong` rung `#5b4633` is untouched; `contrast-color()` picks the correct ink
per mode).

## Warm-not-gray held (criterion d)

`proof:no-gray` PASSES **52/52** (exit 0). The fix lifts L on the WARM hue, never desaturates
onto gray: the dark `--on-glass-muted-strong` `#d5d0c8` = `hsl(36 13% 81%)` (R>G>B warm, OKLab
H≈36°); the dark surface-tint is `--foreground`-derived (`oklch(from …)`, H75.4°, not the
condemned H95° yellow-green). The `contrast-color()` avatar/badge ink is the automatic
max-contrast label ink on a vibrant section-color chip — not a neutral-gray substitution.

## Wave route + dual-engine provenance

`/foundations/typography` (the named wave route) reads CLEAN in both engines, both modes
(`foundations-typography-{chrome,safari}-{dark,light}.png`; census 0 WCAG-fail). Every capture
carries an in-pixel engine badge — CHROME/ANGLE Metal Renderer Apple M5 Max and WEBKIT/Apple GPU
— decoded for provenance.

## Evidence on disk

**Captures** (`docs/tranches/BG/audit/visual/dark-readability-repair/`):

| PNG | engine | mode | shows |
|---|---|---|---|
| `foundations-typography-chrome-dark.png` | Chrome | dark | wave route CLEAN |
| `foundations-typography-safari-dark.png` | WebKit | dark | wave route CLEAN (2nd engine) |
| `foundations-typography-{chrome,safari}-light.png` | both | light | wave route CLEAN light |
| `display-badge-chrome-dark.png` | Chrome | dark | **FIX** — loud pills black `contrast-color()` ink |
| `display-badge-safari-dark.png` | WebKit | dark | **FIX + `contrast-color()` resolves in Safari 26** |
| `display-atoms-avatar-chrome-dark.png` | Chrome | dark | **FIX** — avatar initials black ink (switch-activated) |
| `foundations-shadows-safari-dark.png` | WebKit | dark | **FIX** — swatch labels L81 lift read |
| `foundations-paper-glass-safari-dark.png` | WebKit | dark | **FIX** — paper hero + tiers; freq captions L81 |
| `compositions-configurator-safari-dark.png` | WebKit | dark | **FIX** — preset sub-rows L81 lift |
| `feedback-alert-safari-dark.png` | WebKit | dark | **FIX (DL5)** — tone-tinted muted descriptions read |
| `compositions-auth-shell-safari-dark.png` | WebKit | dark | **ARTIFACT** — dark ink on warm gradient reads perfectly |
| `foundations-{shadows,paper-glass,configurator,auth-shell,notification}-chrome-dark.png` | Chrome | dark | 2nd-engine set |

**Census JSON** (`docs/tranches/BG/audit/visual/census/`): `census-current-dark-merged.json`
(94 routes / 4015 nodes / 21 WCAG-fail = 6 artifact + 15 mode-invariant / 0 dark-specific / 1090
APCA-only-subordinate), `census-current-light-check.json` (16 routes, 20 pre-existing WCAG-fails),
`routes-current.json` (the re-derived live route set), `analyze.mjs`.

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. Zero `src`/`demo`/`styles`/`scripts`
edits — the defect classes were RECORDED and the fix was VERIFIED, never patched (the census
harness lives under `docs/tranches/BG/audit/visual/`, which the fence permits). No `/tmp` output.
No sibling under `~/Programming` touched/moved. The WKWebView binary was compiled UNDER the repo.
`verify-siblings-intact.mjs --quiet` exit 0 before AND after. `demo:dist:serve` + Chrome CDP
killed + the throwaway profile removed on completion.
