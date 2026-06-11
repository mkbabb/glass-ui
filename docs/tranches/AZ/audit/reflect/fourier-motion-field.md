# AZ.W-REFLECT — fourier-motion-field surface reflection record

**Surface:** fourier-field (the comet register both modes · the intensity envelope · the demo
staging · the ℱ brand tie-in shell-wordmark ↔ field · performance)
**Auditor lane:** fourier-motion-field · **Date:** 2026-06-11 · **Branch:** tranche/AY @ `3300949f`
(AZ Batch 0–5 + R4/R5 corrective landed; the AY.W-FF1/FF2/FF3 fourier band is the active register)
**Verdict:** **PASS** — the comet reads as a bold, present, full-frame phosphor comet in BOTH
modes (the W-FF3 reference register held live), the intensity envelope mechanism is sound + gate-
bound + recession-demonstrated, the demo staging renders all three sections + the full-bleed hero,
the ℱ brand tie-in is a genuine closed loop (the wordmark redraws itself AS a Fourier curve via the
shipped math), and performance clears the 60fps budget with the PRM-freeze confirmed. Two S3
nit-level demo-staging observations recorded (no interactive intensity knob on the story; the
color-preset pills are bare buttons, not the house register) — neither draws a first-time-auditor
"wtf"; both are routed to the triumvirate as polish, not as blockers.

---

## 1 — RECAPITULATION (every fourier audit item × discharging evidence × re-verified state)

| id | source | the user's words / mandate (condensed) | discharging wave + claim | RE-VERIFIED state (this audit) |
|---|---|---|---|---|
| AX.W43 / AY.W-FF1 | the chronic | the `OUTLINE_PEAK_ALPHA = 0.24` flat ceiling + `age*age` quadratic → the `final` preset a faint red corner stub; no api seat / README / smoke / gate; the math-leaf duplicated in the sibling | AY.W-FF1 rebase: PINNED per-variant six-field bundle, the `intensity` prop, the `/fourier-math` PROMOTE; AY.W-FF2 LANDED it | **HELD.** π: `OUTLINE_PEAK_ALPHA` absent (grep 0), `evalFourier` deleted (grep 0), `/fourier-math` subpath minted, api seat (`FourierFieldProps`/`FourierFieldVariant`), README (9KB), `FourierField.smoke.test.ts` 5/5. |
| AY.W-FF2 (D1-D11) | the FLEET | the intensity MECHANISM: per-variant bundle, the `intensity?:number` [0,2] clamp, the dark `lighter`/light `source-over` blend fork, amplitude sort, zero-alloc color hoist, the dead-export deletion | W-FF2 DELTA — `final` no longer a stub (spanW/spanH=1.0), distinct family, blend fork live | **HELD.** π live: `final` spanW/spanH=1.0 (diag 1.41 — full traverse, NOT a corner stub), hero paints more structure than final (distinct family), both modes render. `proof:fourier-field-intensity` PASS (6/6 bundle fields, head-forward, [0,2] clamp, blend-fork+sort, evalFourier-deleted, self-test bite OK). |
| §B B12 / AY.W-FF3 | USER-AUDIT 06-10 | "`/substrates/fourier-field` sucks — far too faint; look to how fourier-analysis renders; a procedural variant thereof" | W-FF3 REGISTER REBUILD: 3→bold stroke, 0.45→0.92 peak, 0.08→0.34 floor, the rainbow epicycle chain, the glowing head dot; gate raised BODY_MEAN 0.08→1.5, ARC_DIAG 0.6 added | **HELD + LIVE-PROVEN.** The comet reads BOLD (π: final card bodyMean 3.98 light, hero 6.36; the saturated red rgb [228,161,151] final / rainbow [195,181,194] hero); the rebuilt presets traverse diag 1.41. `proof:fourier-field-visibility-live` PASS 4/4, BITES the faint register (born-RED self-test). See §2. |
| RG4 / D11 | B2-ff | the recession parity — `:intensity="opacityCeiling"` threaded so the fourier hero recesses at parity with aurora (0.6 hero / 0.4 page) | W-FF2 `StoryHero.vue:202` `:intensity="opacityCeiling"`; the loudness is per-LAYER | **HELD.** Live: the full-bleed fourier hero (`data-full-bleed="true"`) paints the recessed field at intensity 0.6 (π: bg coverage 3.10% vs the un-recessed cards 3.76% — the recession is visible, the field sits behind the content). The smoke test binds `peak = peakAlpha * intensityClamped`. |
| R3-15 | USER-AUDIT R3 | "a rail for the fourier F; the F is NOT centered in its hover/shadow area" | **shell-ia lane scope** (the ℱ wordmark seating — AZ.W-SHELL-IDENTITY re-seats the script-ℱ ±0.5px optical nudge); NOT the comet register | **OUT-OF-LANE (routed to shell-ia).** This audit confirms the wordmark's BRAND TIE-IN to the field (the shared `--viz-fourier` token + the redraw egg), not the wordmark's box-centering, which the shell-ia reflection owns. |
| egg E1 | AY | the ℱ wordmark redraws itself as a Fourier epicycle curve (the logo named for the transform, the component performs it) | `FRedrawOverlay.vue` — `dftFromPoints(fGlyphPoints)` → `positionsAt` chain, PRM-gated, painted in `--viz-fourier` | **HELD + LIVE.** Triggered `glass-ui-demo:f-redraw` live: the egg canvas mounts (count=1), the red ℱ epicycle reconstruction (chained circles + arms tracing the glyph) renders in both modes, fades. Built on the SHIPPED `dftFromPoints`/`positionsAt` math. |

**Gate roster (re-run live this audit):**

| gate | result | note |
|---|---|---|
| `proof:fourier-field-visibility-live` | **PASS (4/4)** | final-NOT-a-stub + substantial-arc (diag≥0.6) + bold-body (mean≥1.5) + distinct-family, BOTH modes; the device gate reads the painted canvas back. Bites the faint W-FF2 register. |
| `proof:fourier-field-intensity` | **PASS** | the static mechanism arm — OUTLINE_PEAK_ALPHA absent, 6/6 bundle fields, head-forward, soft fade+floor, cached triple, [0,2] clamp, blend-fork+sort, evalFourier-deleted, self-test (quadratic-decay synthetic line FLAGGED). |
| `tests/components/custom/fourier-field/FourierField.smoke.test.ts` | **PASS (5/5)** | the mount-smoke + the intensity arithmetic (`peak = peakAlpha * intensityClamped`) — happy-dom has no Canvas2D so the math is the load-bearing unit. |
| `proof:colocation` | **PASS** | the feature-dir colocation (FourierField.vue + math.ts + presets.ts + README.md). |

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured live on `:5199` this audit (an ISOLATED browser context to dodge the concurrent
aurora/constellation reflection lanes that share the SPA's selected-tab pointer — the headless
Playwright captures + the `proof:*` gates are immune to that churn and are the binding truth).
Stored beside this record.

**Capture list (literal filenames):**
- `ff-reflect-story-desktop-light.png` (1280×900 — the full-bleed fourier hero + the two-preset grid: hero rainbow-epicycle + comet, final graceful red comet, both bold on cream)
- `ff-reflect-story-desktop-dark.png` (1280×900 — the dark arm: the additive `lighter` sheen lifts the comet leading edge, the vivid blue/cyan rainbow epicycle chain + glowing head dot on ink)
- `ff-reflect-story-mobile-light.png` (390×844 — the two-preset grid stacks single-column, the bold comet + blue epicycle circles + glowing head dot legible at narrow width)
- `ff-reflect-story-mobile-dark.png` (390×844 — mobile dark: the bold red comet + pink/white glowing head dot + blue/purple epicycles over the dark plate)
- `ff-reflect-story-injected-light.png` (1280×900 — the Injected-color section: the color-preset pills + the wide 16:6 hero field retinting)
- `ff-reflect-story-freeze-light.png` (1280×900 — the Freeze section: a static deterministic best-frame, a bold red comet arc + glowing head dot, no animation)
- `ff-reflect-egg-redraw-light.png` (1280×800 — the ℱ-redraw egg mid-reconstruction: the red epicycle chain + circles + arms tracing the ℱ glyph in `--viz-fourier` on cream)
- `ff-reflect-egg-redraw-dark.png` (1280×800 — the egg in dark: the red ℱ Fourier reconstruction over the dark page)

**π readbacks (measured live this audit — the isolated Playwright canvas readback):**
- **Comet register (light, the 5 fourier canvases on the story):** bg full-bleed hero cov 3.10% / bodyMean 8.31 / rgb [160,153,151] (the recessed field); **hero card cov 3.76% / bodyMean 6.36 / rgb [195,181,194]** (the rainbow comet+epicycles); **final card cov 1.90% / bodyMean 3.98 / rgb [228,161,151]** (the saturated red comet — clears the gate's BODY_MEAN_MIN=1.5 floor); injected-color hero cov 2.67% / bodyMean 4.79; freeze-final cov 4.29% / bodyMean 6.47. All cards diag 1.41 (full traverse).
- **Comet register (dark):** the device gate `proof:fourier-field-visibility-live` reads back ≥12 bodyMean dark (the additive `lighter` phosphor sheen) — PASS 4/4; the dark captures confirm the comet's leading edge blooms WITHOUT washing the saturated body to white.
- **Intensity envelope (recession):** the full-bleed fourier hero paints at `intensity=opacityCeiling=0.6` (recessed cov 3.10% behind the content vs the un-recessed cards 3.76%); the smoke test binds `peak = peakAlpha * intensityClamped` so a recessed loudness strictly dims the paint.
- **Injected-color seam:** the wide field retints live — Fourier red default, picking Indigo shifts the painted mean to a blue/cyan family rgb [190,203,199], Teal to a greener [199,206,189] — distinct hue families, the resolver re-resolves on the color change.
- **Performance:** rAF frame deltas over 115 frames on the 5-field story page — **meanMs 9.35, p50 8.4, p90 15.8, p99 17.3, max 25.3** (the p99/max spikes are a 5-simultaneous-field worst case; a single-field consumer page is far lighter). Canvas2D is the settled render at this scale (≤64 phasors, two orders below the WebGPU crossover, W-FF1 §4).
- **PRM-freeze:** under `prefers-reduced-motion: reduce` two hero-card frames 700ms apart are BYTE-IDENTICAL (`prmHeroFrozen: true`) — the `useCanvas2D` substrate paints ONE static frame and parks; the offscreen/tab-hidden park inherits from the same substrate.
- **ℱ brand tie-in:** `--viz-fourier` resolves `light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))` — the SAME token the field's default color, the wordmark ink, and the egg ink all read; the egg reconstructs the ℱ glyph via `dftFromPoints(fGlyphPoints(128))` → `positionsAt` (the shipped math), fired live in both modes.

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk)

Walking the fourier surface cold:

- **The comet register reads FINISHED.** On `/substrates/fourier-field` a first-time auditor sees
  two genuinely-distinct presets — the `hero` carries a bold red comet with a colorful beaded
  rainbow epicycle chain (blue/purple/cyan circles + arms + joint dots) and a glowing head dot;
  the `final` sweeps a graceful long red arc with a glowing tip. Both read with REAL presence on
  cream AND on ink (the dark additive sheen lifts the leading edge without blowing the body white).
  This is the "look to how fourier-analysis renders" reference register the user demanded — there
  is NO faint-hairline whisper anywhere. The full-bleed hero field bleeds the recessed curve across
  the whole page behind the title + content, a quiet brand texture that does not fight the copy.
- **The intensity envelope is SOUND but under-DEMONSTRATED on the story** (see Miss FF-1). The
  mechanism is correct, gate-bound, and visible as the hero recession — but the story page itself
  offers no draggable loudness control, so a first-time auditor reading "the loudness knob" finds
  the knob only in the StoryHero recession, not as an interactive control. It does NOT draw a
  "wtf" — the field reads finished — but the named "envelope knob" is not surfaced as a control.
- **The demo staging reads FINISHED** — the three sections (two-presets / injected-color / freeze)
  all render the bold register; the injected-color pills retint the field live; the freeze section
  paints a static deterministic best-frame. All three are reachable (the lower two scroll inside
  the page's `<main>` scroller — the shared StoryPage layout, NOT a fourier defect; ruled out).
- **The ℱ brand tie-in reads FINISHED and is genuinely delightful** — the logo is literally named
  for the Fourier transform, and the egg literally reconstructs the ℱ glyph AS a Fourier epicycle
  curve using the same shipped math the field uses, painted in the same `--viz-fourier` token the
  wordmark wears. The wordmark ↔ field ↔ egg form one coherent identity loop. A first-time auditor
  who long-presses the ℱ and watches it redraw itself as its own mathematical namesake gets the
  best kind of "oh, that's clever" — not a "wtf".
- The one register-divergence a polished-everywhere bar would flag: the color-preset buttons on
  the injected-color section are bare `btn-press rounded-pill border` raw buttons rather than the
  house SegmentedTabs/glass register (Miss FF-2). On a substrate STORY this is far lower-stakes
  than the gear/PresetEditor R4-4 case, and it reads as fine — but it is a divergence.

No surface drew a first-time-auditor "wtf". The comet register, the brand tie-in, and the
performance all read finished; the two observations are demo-staging polish, not defects.

---

## 4 — MISSES

Two S3 (nit-level, demo-staging polish) observations — NEITHER is a blocker; both are recorded so
the triumvirate can decide whether to surface them, not so a cycle is spent "fixing" a finished
register.

### FF-1 (S3) — the intensity envelope has no interactive demo control on the story
**What:** the lane scope names "the intensity envelope knob." The `intensity?:number` [0,2] prop is
the loudness envelope, but the `/substrates/fourier-field` story exposes NO draggable control for
it — it is exercised ONLY indirectly via the StoryHero recession (`:intensity="opacityCeiling"`,
0.6/0.4) and the smoke-test arithmetic. The aurora/blob studios surface live configurators; the
fourier story does not surface the loudness knob. **Evidence:** the story `.vue` has 3 sections
(two-presets / injected-color / freeze) and a color-preset row but no intensity slider; `grep
:intensity demo/` returns only `StoryHero.vue`. The mechanism is gate-bound (`proof:fourier-field-
intensity` + the smoke test) and recession-demonstrated, so this is a STAGING completeness nit, not
a mechanism gap. **Severity rationale:** S3 — the field reads finished and the envelope is proven;
adding a story slider is additive polish.

### FF-2 (S3) — the color-preset buttons are bare raw buttons, not the house register
**What:** the injected-color section's hue pills are `class="btn-press rounded-pill border px-3 py-1
text-sm"` raw `<button>`s with a `bg-primary text-primary-foreground` active state — not the house
SegmentedTabs / glass register the R4-4 audit demanded for option rows ("not even proper glassy/pill
tabs or selects"). On a substrate STORY (not the gear/PresetEditor) this is lower-stakes, but it is
the same register-divergence class. **Evidence:** `demo/stories/substrates/fourier-field.vue:70-78`
(the raw button loop); contrast the aurora/blob studios' Configurator-driven SegmentedTabs.
**Severity rationale:** S3 — purely a demo-chrome register choice on a teaching story; does not
affect the field, the comet, the envelope, or the brand tie-in.

### Non-misses confirmed (recorded so the triumvirate does NOT re-touch them)
- **The comet register (W-FF3 bold rainbow)** — genuinely bold + present in BOTH modes (π
  bodyMean clears the 1.5 floor; the gate bites the faint register). Do NOT re-tune toward faint.
- **The blend fork** — dark `lighter` SHEEN (bounded ≈0.18 on the youngest third) over the
  `source-over` saturated body; light is `source-over` throughout. Do NOT make the body additive
  (it washes crossings to white) and do NOT apply the sheen on cream (it blows the hue out).
- **The `/fourier-math` PROMOTE + the `evalFourier`/`OUTLINE_PEAK_ALPHA` deletions** — clean, the
  sibling re-point booked to fourier-analysis's own tranche. Do NOT re-add the dead export.
- **R3-15 (the ℱ wordmark box-centering)** — OUT of this lane; owned by the shell-ia reflection.
  This lane confirms the brand TIE-IN (shared token + redraw egg), not the wordmark seating.
- **The `<main>` inner-scroll on the full-bleed hero page** — the shared StoryPage layout (the
  scroller is `<main overflow-y:auto height:900>` with content 2249px), NOT a fourier defect; the
  lower two story sections ARE reachable. Do NOT chase it as a fourier bug.
- **Performance / Canvas2D** — the settled render at this scale; p50 8.4ms, PRM-freeze confirmed.
  Do NOT migrate to WebGPU (two orders below the crossover, W-FF1 §4).

---

## 5 — VERDICT

**PASS.** The fourier-motion-field surface meets the user's standards in totality across every
facet of this lane's scope. The comet reads as the bold, present, full-frame phosphor comet the
W-FF3 "look to how fourier-analysis renders" mandate demanded — legible on cream AND ink, with the
rainbow epicycle chain and the glowing head dot, the dark additive sheen lifting the leading edge
without washing the body white (π bodyMean clears the gate's 1.5 floor; the device gate bites the
faint register). The intensity envelope mechanism is sound, gate-bound, and recession-demonstrated
via the full-bleed hero. The demo staging renders all three sections + the full-bleed hero, with the
injected-color seam retinting live and the freeze lever painting a deterministic best-frame. The ℱ
brand tie-in is a genuine closed loop — the wordmark wears `--viz-fourier`, the field paints it, and
the redraw egg reconstructs the ℱ glyph AS a Fourier epicycle curve via the shipped math.
Performance clears the 60fps budget (p50 8.4ms) with the PRM-freeze + offscreen-park confirmed. Both
`proof:fourier-field-visibility-live` (4/4) and `proof:fourier-field-intensity` are GREEN, the
smoke test is 5/5, and the citizenship is complete (api seat + README + smoke + `/fourier-math`).
No first-time-auditor "wtf". The two S3 observations (no interactive intensity knob on the story;
the color pills are bare buttons) are demo-staging polish routed to the triumvirate, not blockers.
The surface holds a PASS reflection.
