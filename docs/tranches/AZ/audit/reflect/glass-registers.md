# AZ.W-REFLECT — glass + the registers surface reflection record

**Surface:** glass + registers (the glass-first MAXIMAL default · the W55/W-ADAPTIVE-AUTO auto-darken self-engage + the default-ON sampled-luminance observer · the `surface="veil"` Card register · the de-red iOS interactive register · the squircle family · AA legibility on every glass view)
**Auditor lane:** glass-registers · **Date:** 2026-06-11 · **Branch:** tranche/AY @ `ee442d1e` (AZ Batch 0–5 + R4/R5 corrective + the R6/R7 banking commits landed; the prompt's `58c4265a` is one parent behind HEAD)
**Verdict:** **FAIL** — the SURFACE is visually/behaviorally CORRECT (every user mandate live-verified, no "wtf"-class defect), but ONE gate that LOCKS this surface (`proof:glass-cohesion`, wired into `ci.yml:242`) is RED at HEAD on a relocated-source read-path, while three AZ DELTAs + CLAUDE.md assert it GREEN. Two further glass-material gates are RED on stale string/regex checks (non-CI). The misses are GATE-INTEGRITY, not paint — but a CI-red gate + a doc-vs-truth contradiction is a real miss that routes to the triumvirate.

---

## 1 — RECAPITULATION (every glass-register audit item × discharging evidence × re-verified state)

| id | source | the user's words / mandate (condensed) | discharging wave + DELTA claim | RE-VERIFIED state (this audit) |
|---|---|---|---|---|
| R3-7 | USER-AUDIT R3 | "Dock items on light backgrounds need a dynamic facility like iOS 27 to darken DYNAMICALLY so we can actually see these elements — audit ALL glass views for readability." | W-ADAPTIVE-AUTO: the self-engage NO-OP fix (`:where(.glass-dock)` + content tiers self-darken UNCONDITIONALLY) + the sampled-luminance observer wired ON for the dock + the all-glass-views sweep `proof:adaptive-glass-live` 36/0 | **HELD — STRONG.** Live π: the collapsible dock over the bright sky gradient self-darkens to bg `oklab(0.699 … / 0.536)` (**L≈0.70** silhouette vs the prior ΔL≈0.01 vanish); tint strength resolves the recalibrated **20%** AA floor on every dock + content tier; `--dock-fg-on-aurora` resolves through `contrast-color()`. `proof:adaptive-glass-live` re-run live this audit: **GREEN, 36 passed / 0 failed** (the BINDING in-situ contrast truth). Captures: dock-over-light at desktop+mobile × both modes. |
| R3-6 | USER-AUDIT R3 | "I don't like the red [hovered/click state]. Tune to be more iOS inspired and glassy — at the ROOT, within icons and buttons." | W-REGISTER-IOS: brand-red (`--viz-fourier`) retires from ALL state registers; selected = `--glass-bg-floating` material-lift + `--dock-selected-accent` (14%-α luminance-lift, auto-flips with `--foreground`); press = `--dock-control-press-bg` darken+shrink | **HELD.** Live readback: the selected dock control (`aria-current="page"`) paints glyph `rgb(232,231,227)` + bg `color(srgb 0.108 0.098 0.092 / 0.88)` — a dark glass material-lift plate, **zero `--viz-fourier`** (`oklch(0.693 0.151 28.1)`). `--dock-selected-accent` resolves `color-mix(in oklab, hsl(48 10% 90%) 14%, transparent)` in dark (the LIGHT lift) — the auto-flip confirmed. `proof:register-ios` GREEN 12/12 (`no-interactive-red-anywhere`: 0 violations across 63 css). Red survives only as the ℱ wordmark (visible red glyph top-left, correct). |
| R5-7 | USER-AUDIT R5 (slides consumer) | the consumer-ratified VEIL plate promoted to a first-class `surface="veil"` Card register (borderless+rimless legibility plate over a busy backdrop) | R5-7-veil: `@utility veil-surface`, `--veil-{border,shadow,feather}` knobs, `CardSurface += "veil"`, ≥2 consumers | **HELD.** Live on `/display/card`: TWO `data-surface="veil"` plates in the DOM (a `tier=quiet` hero + a `tier=wash` lede), each `glass-quiet/glass-wash veil-surface [&::after]:hidden`. Computed-style readback matches the DELTA EXACTLY: `border 0px` (borderless), `box-shadow none` (rimless), `backdrop-filter blur(10px) saturate(1.05) brightness(1.02)` (quiet-tier on `--glass-level`), `background oklab(0.729 … / 0.6)` (the quiet fill DARKENED toward ink by the self-engage), `mask none` (feather off by default). `proof:card-veil` GREEN 11/11, 2 consumer contexts. |
| (glass-first) | AX.W54 canon | glass is the MAXIMAL default register for EVERY band; ONE knob `--glass-level`; `level=0` the opaque escape; W55 carries over-light legibility on the separate `--glass-tint-*` axis | W54 + W55 + W-ADAPTIVE-AUTO | **HELD.** Live: `--glass-level: 1` (byte-identical hand-tuned ladder); `proof:glass-level` GREEN (one knob threads both ladders, a11y `reduce`→0 / `contrast:more`→bounded ride level). The 5-rung ladder (wash→overlay + card) paints legibly over the aurora both modes (glass-material story captures). |
| (de-red ink) | R3-6 corollary | red ONLY as wordmark/viz/CTA ink, never on an interactive register | W-REGISTER-IOS clause (e) negative predicate | **HELD.** Live: ℱ wordmark red (static); `--viz-fourier` retained as a token (data-viz strokes) but read on ZERO interactive selector (gate-proven + live-sampled). |
| (squircle family) | AX.W56 policy | rounded-vs-squircle policy: squircle RE-HOMED off cards onto the LARGE-RADIUS glass family (Dialog/Sheet/overlay), `@supports (corner-shape: superellipse(2))`-gated PE | W56 squircle.css | **HELD (policy correct).** Live: `CSS.supports('corner-shape','superellipse(2)') === true` on this Chromium; `--corner-k-squircle: 2`; the policy keeps the squircle off `.glass-card`. `proof:squircle-language` GREEN (π render arm: big-dock cornerShape === superellipse(2)). NOTE the related `proof:glass-material-sota` reads the OLD `corner-shape: squircle` keyword → Miss G3 (gate-rot). |
| (`--surface-tint-*` srgb fence) | AW.W26 house identity | the `--surface-tint-*` family is `in srgb` BY DESIGN — NEVER edited to oklab; the glass tint axis is the separate `in oklab` path | W55/W-ADAPTIVE-AUTO scope fence | **HELD.** Live: `--surface-tint-8` resolves `color-mix(in srgb, …)` — UNTOUCHED. `proof:adaptive-glass` clause `surface-tint-family-stays-srgb` GREEN; the darken rides only the `in oklab` glass-tint axis. |
| A5-1 | W-ADAPTIVE-AUTO | the modal scrim double-wrap (`hsl(var(--background)/α)` never painted) → `color-mix(in srgb, …)` | W-ADAPTIVE-AUTO A5-1 | **HELD.** `proof:adaptive-glass` clauses `modal-scrim-no-double-wrap` + `modal-scrim-color-mix-arms` (≥3) GREEN. |
| (observer discipline) | W-ADAPTIVE-AUTO Arm 2 | the sampled observer composes existing substrates, ≤4Hz throttle, IO-gated, PRM-collapses, demo-private path B with evidence doc | W-ADAPTIVE-AUTO | **HELD.** `proof:adaptive-observer` GREEN 14/14 (write `--glass-backdrop-luma` + bucket, PRM matchMedia monitor + loop-collapse, dock binary consumer #1, path-B demo-private + evidence doc). Live: the `[data-glass-sample="live"]` observer element present + writing the bucket on `/substrates/glass-material`. |

**Gate roster (re-run LIVE this audit):**

| gate | result | CI-locked? | note |
|---|---|---|---|
| `proof:adaptive-glass` | **PASS** (28/28) | yes (`ci.yml:280`) | the self-engage rules + A5-1 + the srgb fence |
| `proof:adaptive-observer` | **PASS** (14/14) | — | observer write/throttle/PRM/path-B |
| `proof:adaptive-glass-live` | **PASS** (36/0) | — | the BINDING in-situ 4.5:1-over-white π sweep |
| `proof:register-ios` | **PASS** (12/12) | yes (`ci.yml:86`) | de-red — 0 interactive-red across 63 css |
| `proof:card-veil` | **PASS** (11/11) | yes (`ci.yml:214`) | veil borderless+rimless+fill, 2 consumers |
| `proof:glass-level` | **PASS** | — | one knob threads both ladders |
| `proof:squircle-language` | **PASS** | — | π render arm: superellipse(2) on Chrome-139 |
| **`proof:glass-cohesion`** | **FAIL (1 check)** | **YES (`ci.yml:242`)** | **Miss G1** — `dock-shell-exempt/exemption-recorded` RED: the exemption prose moved to `glass/material.css` at `875c271a` (AY Batch 4 carve), the gate still reads `glass.css` |
| `proof:glass-material-unified` | **FAIL** | no | **Miss G2** — wants literal `<Aurora>` in the story; the W60 page-chassis injects it via `background:"aurora"` manifest row (live-confirmed painting) |
| `proof:glass-material-sota` | **FAIL** | no | **Miss G3** — reads `corner-shape: squircle;` keyword; AX.W56 moved to `superellipse(2)` (live-confirmed supported) |

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured live on `:5199` this audit (ANGLE/SwiftShader, dpr 2). Stored beside this record.

**Capture list (literal filenames):**
- `reflect-dock-over-light-desktop-light.png` (1280×900) — the R3-7 headline: the collapsible dock over the bright sky gradient + the always-expanded media dock over a light card, all self-darkening to a legible smoky-glass plate; the ℱ wordmark the only red.
- `reflect-dock-over-light-desktop-dark.png` (1280×900) — the same, dark mode (the selected bottom-dock tab shows the LIGHT material-lift, no red).
- `reflect-dock-over-light-mobile-light.png` (390×844) — coarse-pointer register, the dock-over-sky darken holds; body ink full warm-ink (the muted-lift).
- `reflect-dock-over-light-mobile-dark.png` (390×844) — mobile dark, dock-over-sky legible + the de-red selected tab.
- `reflect-glassmat-desktop-light.png` (1280×900) — the 5-rung glass ladder (wash→overlay + card) over the live aurora, light; all rungs legible.
- `reflect-glassmat-desktop-dark.png` (1280×900) — the glass-wash/quiet rungs over the rich van-Gogh aurora, dark; labels + heading crisp.

**π readbacks (measured live this audit, getComputedStyle):**
- `--glass-level`: **1** (byte-identical hand-tuned ladder; opaque escape `level=0`).
- `--glass-tint-strength`: **0%** at `:root` (the genuine zero-delta rest); surfaces self-engage to `--glass-tint-strength-aa`: **20%** (the W55→AZ recalibrated AA floor — HELD on every dock + content tier).
- Collapsible dock plate over the bright sky gradient (light): bg `oklab(0.699 0.0013 0.0028 / 0.536)` → **L≈0.70** darkened silhouette (R3-7 satisfied).
- Selected dock control (`aria-current="page"`): glyph `rgb(232,231,227)`, plate `color(srgb 0.108 0.098 0.092 / 0.88)` — a dark glass material-lift, **ΔE ≫ 24 from `--viz-fourier`** (de-red proven).
- `--dock-selected-accent` (dark): `color-mix(in oklab, hsl(48 10% 90%) 14%, transparent)` — the LIGHT luminance-lift (auto-flip confirmed; no brand hue at either pole).
- Veil hero plate (`/display/card`): `border 0px` · `box-shadow none` · `backdrop-filter blur(10px) saturate(1.05) brightness(1.02)` · `background oklab(0.729 … / 0.6)` · `mask none` (matches the R5-7 DELTA exactly).
- `--surface-tint-8`: `color-mix(in srgb, hsl(48 10% 90%) 8%, transparent)` — the house **in-srgb** axis UNTOUCHED.
- `--corner-k-squircle`: **2**; `CSS.supports('corner-shape','superellipse(2)')`: **true**.
- Console on the live walks: **0 errors** (1 expected `useAurora` deferred-init warning only).

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk)

Walking the glass surface cold:

- The dock-over-light darken reads CORRECT — no "milky vanish" the user reported; the plate has a clear silhouette over the bright gradient at both viewports, both modes. **No paint "wtf".**
- The de-red register reads iOS-native — the selected control is a glass material-lift, the press darkens; nothing flashes warm-red. **No "wtf".**
- The veil plate reads as a clean borderless legibility plate; the glass ladder rungs are all legible over a vivid aurora. **No "wtf".**
- AA legibility holds everywhere walked (the muted-body-lift to full ink is visible; body copy never drops into the low-contrast register over a darkened plate). **No "wtf".**

The ONLY first-time-auditor "wtf" is **NOT visual** — it is the **gate ledger**: three glass gates that the AZ DELTAs + CLAUDE.md advertise GREEN are RED at HEAD, ONE of them (`proof:glass-cohesion`) wired into CI. A reviewer running `npm run proof:glass-cohesion` (as the docs invite) hits a RED gate whose message says the dock-shell exemption "is not RECORDED in glass.css" — when it plainly IS recorded, just in the `glass/material.css` partial the AY-Batch-4 carve relocated it to. That doc-vs-truth contradiction on a CI-locked gate is the FAIL trigger. The underlying glass REGISTER is sound; the gate that proves it is broken.

---

## 4 — MISSES (severity-graded, evidence-anchored → the triumvirate)

- **G1 (S2) — `proof:glass-cohesion` RED at HEAD on a relocated-source read-path; CI-locked.** The gate's `dock-shell-exempt/exemption-recorded` arm reads the exemption prose ("`.glass-dock` SHELL is OUT of this group BY DESIGN" + "NO shared edge-gleam / moving-specular") from `src/styles/glass.css` (the `glassRaw` var, `proof-glass-cohesion.mjs:294-296`). At `875c271a` (AY Batch 4 — the CSS carve) that prose MOVED to `src/styles/glass/material.css:22` (imported by `glass.css:45`), so the gate has been RED since. `glass.css` is byte-clean vs HEAD (empty diff) — this is not a working-tree artifact. `ci.yml:242` runs this gate, so it reds CI. CLAUDE.md ("Machine-locked by `proof:glass-level` + `proof:glass-cohesion`") + the W-REGISTER-IOS DELTA ("`proof:glass-cohesion` … stay green") both assert GREEN. The FIX is a one-line read-path widen (point `glassRaw` at the joined `glass.css`+`glass/*.css` partials, mirroring how the bundle composes) — the DESIGN FACT (dock shell carries no moving-specular; its controls carry the gleam) is intact and live-verified. Routes to the triumvirate (a gate-read-path redress).
- **G2 (S3) — `proof:glass-material-unified` RED on a stale substrate-detection string; NOT CI-locked.** The gate (`proof-glass-material-unified.mjs:425`) requires a literal `<Aurora|<PaperBackdrop` inside `demo/stories/substrates/glass-material.vue`. The W60 page-chassis stages the aurora via the manifest `background:"aurora"` + `hero:true` row → StoryHero injects the full-bleed `<Aurora>` (the story's own comment names this at lines 71-72), so the literal tag is correctly absent from the story body. LIVE-CONFIRMED: the aurora paints behind the glass-material rungs in both `reflect-glassmat-*` captures. Gate-rot; the substrate IS staged. Non-blocking (off CI/release).
- **G3 (S3) — `proof:glass-material-sota` RED on a stale squircle-keyword regex; NOT CI-locked.** The gate (`proof-glass-material-sota.mjs:183`) matches `corner-shape: squircle;` (the deprecated keyword). AX.W56 moved the language to `corner-shape: superellipse(<k>)` (the shipped CSS spec form), which I live-verified the engine supports (`superellipse(2)` true) and which `proof:squircle-language` already gates GREEN via the π render arm. Gate-rot; the squircle PE is present under the new keyword. Non-blocking (off CI/release).

**Note (NOT a glass-register miss — routed to other lanes):** programmatic `scrollIntoView()` on the demo fires a scroll-spy that re-writes the route to the nearest in-view story (it bounced me to `/dock/overview` / `/dock/morph-showcase` mid-probe). A CLEAN deep-link load does NOT auto-redirect (verified: `/substrates/glass-material` held 3.5s untouched). This is a demo-IA scroll-spy behavior, not a glass defect; flagged for the shell+demo-IA lane only.

---

## 5 — VERDICT

**FAIL** — but a NARROW, gate-integrity FAIL. The glass-register SURFACE is in excellent, finished shape: every user mandate (R3-6 de-red, R3-7 auto-darken, R5-7 veil) is live-verified at ≥2 viewports × both modes with numeric π backing, the glass-first default + squircle policy + srgb fence all hold, AA legibility is clean everywhere walked, and the four CI-locked register gates (`adaptive-glass`, `register-ios`, `card-veil`, `glass-level`) + the binding `adaptive-glass-live` (36/0) are GREEN. The FAIL is the THREE stale gates — chiefly G1 (`proof:glass-cohesion`, CI-locked, RED since the AY-Batch-4 carve, contradicting the DELTAs' GREEN claim) — which are read-path/string drift against correctly-shipped source, redressable by a one-to-three-line gate update with NO source/paint change. Re-reflect after the triumvirate widens the gate read-paths.

---

## 6 — REDRESS ADDENDUM (orchestrator, post-record)

All three misses were GATE-INTEGRITY (read-path/string drift against correctly-shipped source),
discharged directly as orchestrator-owned gate mechanics — no source/paint change:

- **G1** `proof:glass-cohesion` — the exemption prose IS composed via `readMonolith` (the W-CARVE
  read was already in place); the true miss was the regex demanding a single space in
  "NO shared edge-gleam" where the carve's re-wrap put a newline. The clause now binds the named
  consequence whitespace-tolerantly. **GREEN** (43 surfaces, all arms).
- **G2** `proof:glass-material-unified` — the substrate-staging clause now accepts EITHER the
  literal in-story `<Aurora>`/`<PaperBackdrop>` mount OR the W60 page-chassis manifest row
  (`background:"aurora"` + `hero:true` on the glass-material entry). **GREEN.**
- **G3** `proof:glass-material-sota` — the squircle arm re-pointed from the deprecated
  `corner-shape: squircle` keyword to the shipped spec form (`@supports (corner-shape:
  superellipse(k))` + the tokenized `var(--corner-shape-<surface>)` decls), leak-check preserved.
  **GREEN.**

The surface verdict stands as the auditor wrote it; the FAIL's misses are now discharged.
Re-reflection owed at W-CLOSE (the verdict matrix re-stamp).
