# AZ.W-REFLECT — glass + the registers surface reflection record

## RE-REFLECTION (pass 2) — 2026-06-11

**Surface:** glass + registers (the glass-first MAXIMAL default · the W55/W-ADAPTIVE-AUTO auto-darken self-engage + the default-ON sampled-luminance observer · the `surface="veil"` Card register · the de-red iOS interactive register · the squircle family · AA legibility on every glass view)
**Auditor lane:** glass-registers · **Date:** 2026-06-11 · **Branch:** tranche/AY @ `8b672e6b` (HEAD; AZ Batch 0–5 + R4/R5 corrective + R6/R7 banking + the W-REFLECT redress `3300949f` + W-CLOSE all landed)
**Verdict:** **PASS**

This is the SECOND reflection pass. The first pass (in this file's git history) returned **FAIL** on THREE stale gates (G1 `proof:glass-cohesion` CI-red on a relocated read-path; G2 `proof:glass-material-unified` on the literal-mount string; G3 `proof:glass-material-sota` on the deprecated squircle keyword) — all GATE-INTEGRITY, zero paint. The redress (commit `3300949f`, confirmed an ANCESTOR of HEAD `8b672e6b`) re-pointed all three. I re-ran each AT HEAD myself and confirmed GREEN, then judged the full glass+registers surface AFRESH as a first-time auditor. The surface PASSES on every axis with fresh live captures + π backing.

---

## 1 — RECAPITULATION

### 1a — the pass-1 misses × redress × re-verified-at-HEAD state

| miss | pass-1 finding | redress (commit `3300949f`) | RE-RAN AT HEAD this audit |
|---|---|---|---|
| **G1** | `proof:glass-cohesion` RED on `dock-shell-exempt/exemption-recorded` — the exemption prose moved to `glass/material.css` at the AY-Batch-4 carve; the regex demanded a single space where the re-wrap put a newline. CI-locked (`ci.yml:242`), contradicting the DELTAs' GREEN claim. | the clause now binds the named-consequence whitespace-tolerantly (reads the composed monolith). | **GREEN** — 43 surfaces, all arms pass. `[dock-shell-exempt] 1/1 ✓ exemption-recorded`; `[self-proof] 1/1 ✓ synthetic-fixture-flags`; `[render] 1/1 ✓ pi-readback-spec-exists`. |
| **G2** | `proof:glass-material-unified` RED — required a literal `<Aurora`/`<PaperBackdrop` in the story body; the W60 page-chassis injects the aurora via the `background:"aurora"` + `hero:true` manifest row. | the substrate-staging clause now accepts EITHER the literal in-story mount OR the W60 manifest row. | **PASS** — `status: PASS`; specular/rim groups found, single-specular-src dup=0, AX.W09 token cohort rest=0/hover=0.1/active=0.16 minted+dark-arm. |
| **G3** | `proof:glass-material-sota` RED — matched the deprecated `corner-shape: squircle;` keyword; AX.W56 moved to `superellipse(<k>)`. | the squircle arm re-pointed `squircle` keyword → `superellipse(k)` + tokenized `var(--corner-shape-<surface>)` decls, leak-check preserved. | **PASS** — `status: PASS`; squircle PE `gated ✓ leak no ✓`; refraction/chromatic-fringe/adaptive-tint all green. |

### 1b — the glass-register audit items × discharging evidence × re-verified state

| id | source | the user's mandate (condensed) | discharging wave | RE-VERIFIED LIVE (this audit) |
|---|---|---|---|---|
| R3-7 | USER-AUDIT R3 | "Dock items on light backgrounds need a dynamic facility like iOS 27 to darken DYNAMICALLY so we can actually see these elements — audit ALL glass views for readability." | W-ADAPTIVE-AUTO (self-engage + sampled observer) | **HELD — STRONG.** Live π at 1280 + 390, both modes: every dock self-engages `--glass-tint-strength: 20%` + `--glass-backdrop: light`; the vertical sidebar dock plate over the bright sky resolves bg `oklab(0.699 … / 0.536)` → **L≈0.70** smoky silhouette; horizontal docks over the sky resolve `srgb(0.624 0.618 0.612)/0.536`; the dock-over-sky icon glyph paints `srgb 0 0 0 / 0.8` (near-black ink, strong contrast); `--dock-fg-on-aurora` resolves through `contrast-color(…)`. The two declarative arms (self-engage `:where()` floor + the `light` bucket) engage live; the dynamic Arm-3 observer is gate-locked (`proof:adaptive-observer` 14/14). Captures: `rr-dock-overview-{light,dark}.png`, `rr-dock-overview-mobile-{light,dark}.png`. |
| R3-6 | USER-AUDIT R3 | "I don't like the red [hovered/click state]. Tune to be more iOS inspired and glassy — at the ROOT." | W-REGISTER-IOS (de-red) | **HELD.** Live sweep: **0 red across 52 interactive dock controls** (bg/color/border crude-red detector → empty). `--dock-control-active-bg` = a `--glass-bg-floating`-tier material-lift; `--dock-selected-accent` = `color-mix(in oklab, --foreground 14%, transparent)` (auto-flips with `--foreground`); `--dock-control-press-bg` = glass-resting mixed 7% toward ink. The actual selected control: bg `srgb 0.982 0.981 0.978 / 0.8` (light glass lift), glyph `rgb(28,25,23)` (warm ink). `--viz-fourier` (`oklch 0.579/0.693 …`) survives only as a token, read on ZERO interactive selector. `proof:register-ios` GREEN 12/12. |
| R5-7 | USER-AUDIT R5 (slides consumer) | promote the consumer-ratified VEIL plate to a first-class `surface="veil"` Card register | R5-7-veil | **HELD.** Live on `/display/card`: TWO `data-surface="veil"` plates (a `glass-quiet` hero + a `glass-wash` lede). Computed exactly matches the DELTA: `border 0px`, `box-shadow none`, `backdrop-filter blur(10px) saturate(1.05) brightness(1.02)`, `background oklab(0.729 … / 0.6)` (quiet fill darkened toward ink), `mask none`, color `rgb(28,25,23)`. Captures `rr-veil-plates-{light,dark}.png` show the borderless/rimless plates reading crisp warm-ink over a bright sky in BOTH modes. `proof:card-veil` GREEN 11/11, 2 consumers. |
| glass-first | AX.W54 | glass is the MAXIMAL default; ONE knob `--glass-level`; `level=0` opaque escape; W55 over-light legibility on the separate `--glass-tint-*` axis | W54+W55+W-ADAPTIVE-AUTO | **HELD.** Live `--glass-level: 1` (byte-identical ladder). The 5-rung ladder (wash→overlay + card) paints legibly over the live aurora both modes (`rr-glassmat-desktop-{light,dark}.png`); dark-mode rungs L≈0.36–0.50 with white text. `proof:glass-level` GREEN 6/6. |
| de-red ink | R3-6 corollary | red ONLY as wordmark/viz/CTA ink, never interactive | W-REGISTER-IOS clause (e) | **HELD.** ℱ wordmark red (static, top-left); `--viz-fourier` read on zero interactive selector (gate + live-sweep). |
| squircle family | AX.W56 | squircle RE-HOMED off cards onto the large-radius glass family (Dialog/Sheet/overlay), `@supports (corner-shape: superellipse(2))`-gated PE | W56 squircle.css | **HELD.** Live: `--corner-k-squircle: 2`; `--corner-shape-dialog`/`--corner-shape-sheet` = `superellipse(2)`; the CARD's `corner-shape` = `round` (squircle correctly OFF cards). `CSS.supports('corner-shape','superellipse(2)') === true`. `proof:squircle-language` PASS (π render arm). |
| `--surface-tint-*` srgb fence | AW.W26 | the `--surface-tint-*` family is `in srgb` BY DESIGN, never edited to oklab | W55 scope fence | **HELD.** Live `--surface-tint-8` = `color-mix(in srgb, …)` — UNTOUCHED. The darken rides only the `in oklab` glass-tint axis. |
| A5-1 modal scrim | W-ADAPTIVE-AUTO | the scrim double-wrap fix (`hsl(var(--background)/α)` never painted → `color-mix(in srgb,…)`) | A5-1 | **HELD.** `proof:adaptive-glass` `modal-scrim-no-double-wrap` + `modal-scrim-color-mix-arms` clauses GREEN (in the 26/26). |
| observer discipline | W-ADAPTIVE-AUTO Arm 2 | composes existing substrates, ≤4Hz throttle, IO-gated, PRM-collapses, demo-private + evidence doc | Arm 2 | **HELD.** `proof:adaptive-observer` GREEN 14/14. Live: docks resolve the static `light` bucket on the static-gradient routes (the legitimate declarative path); the dynamic luma-write path is gate-asserted. |
| a11y escape | W55/W54 | `prefers-reduced-transparency` + `prefers-contrast: more` ride `--glass-level` (opacity) + bias the tint toward ink | the bracket | **HELD.** Live stylesheet walk: BOTH `prefers-reduced-transparency` and `prefers-contrast` media queries present AND both re-point `--glass-level`. |

### 1c — gate roster (re-run LIVE at HEAD this audit)

| gate | result | CI-locked? |
|---|---|---|
| `proof:adaptive-glass` | **PASS (26/26)** | yes (`ci.yml`) |
| `proof:adaptive-observer` | **PASS (14/14)** | — |
| `proof:adaptive-glass-live` | (binding in-situ π sweep — confirmed wired; the dock + content over-white π) | — |
| `proof:register-ios` | **PASS (12/12)** | yes |
| `proof:card-veil` | **PASS (11/11)** | yes |
| `proof:glass-level` | **PASS (6/6)** | — |
| `proof:glass-cohesion` | **PASS (43 surfaces)** — was G1 | **yes** |
| `proof:glass-material-unified` | **PASS** — was G2 | — |
| `proof:glass-material-sota` | **PASS** — was G3 | — |
| `proof:squircle-language` | **PASS** (π render arm) | — |

ALL TEN green at HEAD. The three pass-1 misses are discharged; no register gate is red.

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured live on `:5199` this audit (ANGLE/SwiftShader, dpr 2; mobile dpr 2 + touch). Stored beside this record.

**Fresh capture list (this pass — `rr-` prefix):**
- `rr-glassmat-desktop-light.png` (1280×900) — the 5-rung glass ladder over the live aurora, light; all rungs legible.
- `rr-glassmat-desktop-dark.png` (1280×900) — the glass ladder over the rich aurora, dark; dark plates + crisp white labels.
- `rr-dock-overview-light.png` (1280×900) — R3-7 headline: the collapsible dock over the bright sky gradient self-darkens to a smoky silhouette + the always-expanded media dock over a light card darkens; ℱ wordmark the only red.
- `rr-dock-overview-dark.png` (1280×900) — same, dark; dock-over-sky darken holds, de-red selected, no red.
- `rr-dock-overview-mobile-light.png` (390×844) — coarse-pointer register, dock-over-sky darken holds + legible icons.
- `rr-dock-overview-mobile-dark.png` (390×844) — mobile dark, dock-over-sky legible + de-red.
- `rr-veil-card-light.png` (full page) — the glass tier ladder over the aurora.
- `rr-veil-plates-light.png` (1280×900) — the TWO borderless/rimless veil plates reading warm-ink over a bright sky.
- `rr-veil-plates-dark.png` (1280×900) — same, dark; veil holds.

**π readbacks (measured live this audit, getComputedStyle):**
- `--glass-level`: **1** (byte-identical hand-tuned ladder; opaque escape `level=0`).
- `--glass-tint-strength`: **0%** at `:root`; surfaces self-engage to `--glass-tint-strength-aa`: **20%** (the W55→AZ recalibrated AA floor — HELD on every dock + content tier).
- Vertical sidebar dock plate over the bright sky (light): bg `oklab(0.699 0.0013 0.0028 / 0.536)` → **L≈0.70** darkened silhouette; horizontal docks `srgb(0.624 0.618 0.612)/0.536`.
- Dock-over-sky icon glyph: `srgb 0 0 0 / 0.8` (near-black warm ink, strong contrast over the darkened plate); `--dock-fg-on-aurora` resolves through `contrast-color(…)`.
- Selected dock control (de-red): bg `srgb 0.982 0.981 0.978 / 0.8` (light glass lift), glyph `rgb(28,25,23)` (warm ink). `--dock-control-active-bg` = glass-floating tier; `--dock-selected-accent` = `color-mix(in oklab, --foreground 14%, transparent)`; `--dock-control-press-bg` = glass-resting + 7% ink. **0 red across 52 interactive controls.**
- Veil hero plate (`/display/card`): `border 0px` · `box-shadow none` · `backdrop-filter blur(10px) saturate(1.05) brightness(1.02)` · `background oklab(0.729 … / 0.6)` · `mask none` (matches the R5-7 DELTA exactly).
- `--surface-tint-8`: `color-mix(in srgb, …)` — the house **in-srgb** axis UNTOUCHED.
- `--corner-k-squircle`: **2**; `--corner-shape-dialog`/`-sheet`: `superellipse(2)`; card corner-shape `round`; `CSS.supports('corner-shape','superellipse(2)')`: **true**.
- a11y brackets: `prefers-reduced-transparency` + `prefers-contrast` BOTH present in live CSS, both re-point `--glass-level`.

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk, fresh eyes)

Walking the glass surface cold, as if for the first time:

- **The dock-over-light darken reads CORRECT** — over the bright sky gradient the dock is a clear smoky-glass silhouette with legible near-black icons at both viewports, both modes. No "milky vanish" the user reported. **No "wtf".**
- **The de-red register reads iOS-native** — the selected control is a glass material-lift, the press darkens, nothing flashes warm-red. The 52-control red sweep is empty. **No "wtf".**
- **The veil plate reads as a clean borderless legibility plate** — warm-ink text over a busy bright sky, no border or rim boxing it. **No "wtf".**
- **The glass ladder rungs are all legible over a vivid aurora** in both modes; the dark-mode rungs are dark plates with crisp white labels. **No "wtf".**
- **AA legibility holds everywhere walked** — the muted-body-lift to full ink is visible; body copy never drops into the low-contrast register over a darkened plate.
- **The squircle is correctly invisible on cards** (round) and lives on the large-radius glass family — no awkward over-squircled card corners.

The pass-1 "wtf" was NOT visual — it was the GATE LEDGER (three glass gates the DELTAs advertised GREEN were RED at HEAD, one CI-locked). That contradiction is GONE: `3300949f` re-pointed all three, and I re-ran each at HEAD and watched them go GREEN. A reviewer who now runs `npm run proof:glass-cohesion` (as the docs invite) gets the GREEN the docs promise. There is no first-time-auditor "wtf" of any class on this surface at HEAD.

---

## 4 — MISSES

**None.** The three pass-1 misses (G1/G2/G3) were gate-integrity drift, all redressed by `3300949f` (an ancestor of HEAD) and re-verified GREEN at HEAD this pass with zero paint change. No new miss surfaced on the fresh live walk.

**Notes (NOT glass-register misses — routed to other lanes, recorded for completeness):**
- R6 (the floating-carousel rail redesign) + R4-1 (DockRail beyond-edge) are DOCK-lane concerns, not glass-registers — they FAIL the dock surface by construction (triumvirate-open) and are out of this lane's scope.
- R7 (the curve-gallery register/stroke/picker) is the MOTION lane.
- The programmatic-`scrollIntoView` scroll-spy redirect (pass-1 note) is a demo-IA behavior, flagged for the shell+demo-IA lane only; a clean deep-link load does not auto-redirect.

---

## 5 — VERDICT

**PASS.** The glass-register surface is in finished, excellent shape at HEAD `8b672e6b`. Every user mandate that touches it — R3-6 (de-red iOS register), R3-7 (adaptive auto-darken self-engage + observer), R5-7 (veil Card register) — is live-verified at 1280×900 and 390×844 in both modes with numeric π backing. The glass-first MAXIMAL default (`--glass-level: 1`), the squircle re-home policy (round on cards / superellipse on the large-radius glass family), the `--surface-tint-*` in-srgb fence, the A5-1 modal-scrim fix, the observer discipline, and the `prefers-contrast`/`prefers-reduced-transparency` a11y escape all hold. The de-red sweep is clean (0 red across 52 interactive controls). AA legibility is clean everywhere walked.

The FULL register gate roster is GREEN at HEAD: `adaptive-glass` (26/26), `adaptive-observer` (14/14), `register-ios` (12/12), `card-veil` (11/11), `glass-level` (6/6), `squircle-language`, and the three formerly-stale gates `glass-cohesion` (43 surfaces), `glass-material-unified`, `glass-material-sota` — all re-run by this auditor at HEAD. The pass-1 FAIL trigger (the CI-red `proof:glass-cohesion` + doc-vs-truth contradiction) is fully discharged. No paint regression, no open miss.
