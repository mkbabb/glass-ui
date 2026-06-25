# category-landing — DELTA-ASSAY (golden vs current; the UNION path)

> Assays the SHIPPED `SectionLanding.vue` + `SectionPreviewCard.vue` + `category-hero.ts`
> against `./GOLDEN.md` (folding the three `challenge/{1,2,3}.md` hardenings IN), live-measured
> on `:5173` (chrome-devtools-mcp, both modes, painted card). Verdict per surface: KEEP (fit) /
> REFINE (weak) / RE-INVENT (broken). Tranche-DEV only; the build is USER-gated.
>
> **A UNION, never a fork.** The current card chassis is FIT and ships today; the disease is
> localized to the preview WINDOW (gray + glyph + φ-less). This re-points the SHIPPED `#preview`
> seam + `previewKind` field + the warm `<Card>`/glass register + the manifest loader. KISS · DRY
> · NO LEGACY.

---

## 0 — THE BORN-RED TRUTH (live-measured this session, both modes, painted pixel)

`:5173/substrates` (current route) `getComputedStyle` on the real painted card + tokens on `:root`:

| read | live measurement (2026-06-24) | verdict |
|---|---|---|
| preview window GRAY | `.section-preview-card-preview` bg `color(srgb 0 0 0 / 0.03)`, border `srgb 0 0 0 / 0.06` | **RED** — gray, born honest |
| preview DEAD (glyph) | 11 cards, **11 `.section-preview-thumb`, 11 `<svg>` glyphs in `.preview`** (`previewKind` seam UNCONSUMED — `SectionLanding.vue` wires `sectionIcon` glyph, not the kind) | **RED** |
| cards LARGE+EMPTY | lead card **643×388**, preview rect **601×112**, `max-block-size:112px`, **`aspect-ratio:auto`** (NO φ) | **RED** |
| chip cool/teal | substrates chip `srgb 0.138 0.479 0.583` (TEAL H≈220); forms `0.193 0.336 0.727` (indigo); containers `0.303 0.393 0.457` (slate); display `0.598 0.361 -0.084` (warm — the lone warm cat) | **RED** (owned by warm-fence, §DEPEND) |
| `--section-color-3` | `light-dark(oklch(.542 .089 222.8), oklch(.767 .091 219.9))` (teal both arms) | **RED** (warm-fence territory) |
| every category | `/forms` 12 cards/12 glyphs, `/display` 11/11, `/containers` 14/14 — IDENTICAL gray+glyph window across ALL landings | **RED** (B10) |
| tokens UNSET | `--phi` · `--field-h` · `--card-field-h` · `--glass-key` · `--ease-cartoon-punch` · `--motion-weight` ALL **UNSET** on `:root` | **RED** (the 6-dep build-DAG — most owned by sibling deltas; `--phi` has NO owner) |

**The gestalt (all three challenges + this orch agree):** the card chassis (IconChip POP + title +
Fira-Code subpath + the single `RouterLink` a11y + `inert`+`aria-hidden` preview seam) is FIT and ships
today. The disease is the preview WINDOW: a gray box with a placeholder glyph, repeated N×, on a
cool/teal-tinted, φ-less, field-less landing. The gate is genuinely born-RED across categories — not a
paper-RED.

---

## 1 — THE DELTA (golden vs current, survival of the fittest)

### KEEP (fit — ships today, do NOT touch)

- **The card chassis** — `<RouterLink>` ONE-link a11y (accessible name = title + blurb), `IconChip`
  POP (reveal+bloom), title, Fira-Code subpath chip, the `glass-resting paper-grain-overlay` plate,
  the `lead && sm:col-span-2` wider-span lead. The plate glass is acceptably-warm (`oklab` C≈0.012,
  AMBER not gray).
- **The `#preview` seam** — `SectionPreviewCard.vue` already renders `<slot name="preview">` into an
  `inert` + `aria-hidden` region (0 tab-stops, never steals focus). This is the EXACT mount point the
  golden's specimen needs. KEEP verbatim.
- **The `previewKind` field** — `category-hero.ts` `PreviewKind = glyph|field|control|surface|metric`
  is populated per-category. The dispatcher reads THIS (no second switch). KEEP.
- **The one-GL budget posture** — the preview is documented as a budget-safe still; the landing mounts
  ≤1 live GL. The golden HONORS this (Aurora `render-mode="css"` first-frame, verified on disk —
  `Aurora.vue:59` "never arm WebGL" → `paletteToCssGradient`). KEEP.
- **The manifest lazy-loader + `categoryHero(id)` single source.** KEEP.
- **PRM guard** present on the card (`transition:none` / `transform:none`). KEEP, ELEVATE (§REFINE motion).

### REFINE (weak — evolve toward the golden, reuse extant primitives)

1. **The preview WINDOW (M1).** `.section-preview-card-preview` bg `color-mix(... --foreground 3%/6% ...)`
   → DELETE (clean break). Replace with a **bounded warm §3 field + a defined edge**: `radial-gradient`
   warm stops over `oklch(0.93 0.045 var(--field-h))` (light) / warm-ember floor (dark), an inset lit
   rim. PLAIN per-mode arms (`.dark .x`, never `:global(.dark)` — the Vue scoped `:global()` drop,
   MEMORY; never an inset-shadow inside `light-dark()` — the inset-shadow trap, MEMORY). The `--field-h`
   reads the per-card warmed hue (CONSUMED from `warmFieldHue`, §DEPEND), CSS-clamped `[25,95]`.
2. **PROPORTION (M3).** `max-block-size:112px` + `aspect-ratio:auto` → `aspect-ratio: var(--phi, 1.618)`
   AND a `max-block-size` on the φ-ladder (the R2/R7 double-bound: the window cannot run away vertically
   on the span-2 lead). grid `gap: calc(1rem * var(--phi, 1.618))`; card `max-inline-size` φ-bound so a
   3-col grid at ≥1280 doesn't blow each card to 643px. Concentric preview rim (CONSUME
   `BD.W-CONCENTRIC-RADIUS`).
3. **The hover (M2 motion).** `:hover { translate(-1px,-1px) }` is too tight → liquid lift on
   `--spring-smooth` with squish (`translate(-2px,-3px) scale(1.018)`), the cast travels
   `--shadow-cartoon-md`→`-lg` (CONSUME `BD.W-CARTOON-CASTER`/the shipped `--shadow-cartoon-*`), the
   specimen parallax-LAGS the frame +2px. Press `:active { scale(.97) }`. Liquid weight, never tight.
4. **The cel-slam entrance.** UNION onto the shipped `.scroll-cascade` + `.scroll-build` mount-clock
   stagger (already on `SectionLanding.vue`), ELEVATED to `--spring-bouncy` overshoot, specimen lags the
   frame one stagger-step. (Mount-clock, NOT `view()` — the above-fold/Safari-installed-base lesson the
   story-page-standard delta already established.)

### RE-INVENT (broken — the metaphor inverts)

1. **The preview CONTENT (M2 — the headline).** The glyph-over-tint thumb (`SectionLanding.vue:75-83`
   `<component :is="sectionIcon">`) is the wrong metaphor (app-icon era). RE-INVENT as a
   **`<SpecimenStage :kind :hue :lead>`** dispatcher (demo-private, ~60 LOC) rendered INTO the existing
   `#preview` seam: a `<component :is>`/`v-if` switch over `previewKind` composing SHIPPED primitives —
   `field`→`<Aurora render-mode="css">` (frozen, warm-clamped palette §FOLD-R1), `control`→a `<Button>`
   + `<Slider :model-value="[62]">` + `<Switch :model-value="true">` cluster, `surface`→a mini
   `<Card tier="quiet">`, `metric`→`<MetricBadge>`, `glyph`→`<IconChip>` (LAST RESORT, foundations).
   The widget SHOWS its component, never symbolizes (iOS-27 home-screen truth).

---

## 2 — THE CHALLENGE HARDENINGS, FOLDED INTO THE UNION (all three challenges)

Every refutation that LANDS is reconciled here; the gate (§WAVE-AMENDMENT) is keyed to catch each.

| # | challenge | the fold into the UNION path |
|---|---|---|
| **F1 (ch1·R1, TOP)** | `--phi` UNSET (live-confirmed), bare `var(--phi)` resolves `auto` → B4 silently no-ops | `--phi` has **NO owner on disk or in any sibling amendment** (story-page-standard's GOLDEN *prose* uses it but its WAVE-AMENDMENT books no mint). → **THIS wave CO-MINTS `--phi: 1.618`** (a tiny demo-side token, `demo/stories/` chassis CSS), and **never ships a bare `var(--phi)` without the `,1.618` literal fallback**; story-page-standard CROSS-LINKS as co-consumer (first-to-land mints, no double-mint). Born-RED bite: `getComputedStyle(:root)['--phi']` UNSET on HEAD; GREEN only once minted; `aspect-ratio` rasters ≈1.618, not `auto`. |
| **F2 (ch1·R2, ch2·R4, ch3·R7, DEPEND-order)** | 5 sibling tokens UNSET; if this lands first, B2/B6/per-route-variety are RED-by-dependency, not by this item; the literal `62`/`1.618` fallbacks are LEGACY-by-stealth | **Sequence `BD.W-BENTO-SPECIMEN` strictly AFTER** `BD.W-SECTION-HUE-WARM-FENCE` (shell delta — re-indexes the cool hues; teal impossible by construction), `BD.W-PAGE-FIELD`+`BD.W-FIELD-SCRIPT` (`paper-field`/`--field-h`/`warmFieldHue`, CSS-clamped), `BD.W-GLASS-KEY-EDGE` (`--glass-key`), `BD.W-CONCENTRIC-RADIUS` (on disk). **Born-RED DEPS-PRESENT precondition** (G0): a `--selftest` probe asserts `--field-h`/`--glass-key`/`warmFieldHue(id)` resolve to NON-fallback values; FAIL LOUD if any DEPEND is absent (don't eat the literal). The literal `62`/`1.618` are FORBIDDEN in shipped CSS except as the `,fallback` second-arg (and that arm must never be the painted value at gate time). |
| **F3 (ch1·R3, ch2·R2, KISS — goo lead card)** | §2.1 goo neck = ~40% of motion risk for ONE card; on the real `SectionPreviewCard` the chip + stage sit inside the glass plate's `backdrop-filter:blur(10px)` — a goo filter on ANY ancestor → dock-goo-tear; the spike's neck is OCCLUDED (`z:0` under the `z:1` stage) + region-less | **DESCOPE the goo lead card to a STRETCH arm** (the FIRST budget cut). The cel-slam cascade carries the cartoon punch without it. IF built: (a) MOUNT the shipped `GlassGooFilter` (`url(#glass-goo)`, sRGB, `x=-50% width=200%` region) — NOT a hand-rolled `#goo` (DRY; one goo id on the landing); (b) the goo-bridge is a SIBLING with its OWN stacking context OUTSIDE the `backdrop-filter` host, `z` ABOVE the stage so the neck reads; (c) B11/B8 raster the ACTUAL painted neck pixel between chip+stage on a **WebKit** capture + a real DOM-ancestry assertion (goo on an ancestor-of-the-transmissive-plate → RED). |
| **F4 (ch1·R5, KISS/DRY)** | the OPTIONAL manifest `specimen?` override = a 3rd source of truth (override→registry→`previewKind`); YAGNI for 11 categories | **DROP the manifest `specimen?` field.** ONE registry keyed off `previewKind` (the category floor). Re-introduce a per-story override ONLY if a real heterogeneous category (forms input/slider/switch) is in hand at build time — and even then prefer per-story `previewKind`. DRY by subtraction. |
| **F5 (ch1·R4, anchors)** | cited line numbers drifted (`:91`→`:90-97`, `category-hero.ts:48`→`:61`) | The WAVE-AMENDMENT cites by **SELECTOR/SYMBOL** (`.section-preview-card-preview`, `previewKind`, the `#preview` slot, the `.section-preview-thumb` block), never by line number. |
| **F6 (ch2·R1, ch2·R7, TOP — occupancy)** | the spike's `control` specimen fills 5% of its stage; φ-proportioning the WINDOW does not proportion the CONTENT; the wider the lead, the emptier | The specimen must **FILL its stage**, not float in it. `field` already does (`inset:0`). `control`/`surface`/`metric` scale-to-fit: a `container-type:size` stage + `cqmin`-sized specimen (or `transform:scale()` keyed off `--stage-cqw`) so it occupies **≥45% at EVERY card width**; the LEAD `control` is a 3-row STACK (earns width by SHOWING more). **B4 gets a wide-card sub-arm**: raster painted-specimen-bbox / stage-bbox ≥ 0.38 AT THE SPAN-2 LEAD WIDTH, not just the 1-col default. |
| **F7 (ch2·R3, ch3·R1, TOP — teal specimen)** | the substrates lead `field` specimen renders `cat-substrates` = palette index **3 (teal)** (verified `aurora-hero.ts:112`) — the most prominent specimen on the page the wave is NAMED after paints TEAL; and the spike's all-warm `field` is INDISTINGUISHABLE from the field floor behind it | **Warm-clamp the SPECIMEN palette, not only the window floor.** The `field` specimen passes Aurora a warm-clamped palette (H∈[25,95]) for cool categories — substrates' frozen aurora paints warm-amber, NOT teal. BUT the specimen palette must read DISTINCT from the window-field-floor histogram (a real component preview shows the component, not more field): **B3 rasters the specimen hue-histogram DISTINCT from the field-floor histogram** (Δ in dominant hue OR a multi-modal spread), not merely "Δ≥25° somewhere" (the all-warm-smear fraud bite). **B2's teal-ban reads the SPECIMEN pixels too** (a teal frozen-aurora on a warm field → RED). |
| **F8 (ch3·R3, ch2·R2b — the defined edge)** | the spike's edge is a SYMMETRIC plain-white rim (`inset 0 0 0 1px oklch(1 0 0/.35)`) — NOT the §3 "lit corner exceeds the opposite by ΔL keyed off `--glass-key`"; B6 is born-GREEN-by-omission on a flat rim | **DECIDE:** the lit-corner asymmetry is the precept → CONSUME `--glass-key` (from `BD.W-GLASS-KEY-EDGE`) for the asymmetric over-glaze; **B6 rasters the lit corner exceeds the opposite by ΔL** keyed off `--glass-key`, the `-58deg`/symmetric literal FORBIDDEN (a missing token FAILS, never papers over — the page-field G7 discipline). |
| **F9 (ch3·R3, ch3·R8 — props + dark chroma)** | `<Slider :model-value="62">` paints ZERO thumbs (modelValue is an ARRAY, verified `Slider.vue:161`); the spike dark floor `C=0.040` FAILS its own B7 `C≥0.045` | **`<Slider :model-value="[62]">`** (array); `<Switch :model-value="true">` (reka-ui `modelValue`, NOT `:checked`/`:pressed` — the binding-verification trap, MEMORY); live-mount + confirm the slider paints a thumb before claiming a control row. **Dark floor → `oklch(0.30 0.05 var(--field-h))`** (C=0.05 ≥ B7's 0.045). |
| **F10 (ch3·R6 — goo id)** | the spike mints a local `#goo`, a 3rd id vs shipped `#glass-goo`/`#dock-fission-goo` | IF the goo lead card is built: mount the shipped `GlassGooFilter` (`#glass-goo`); a DRY bite asserts exactly ONE goo filter id on the landing. (Moot if F3 descopes it.) |
| **F11 (ch2·R5 — semantic-color carve)** | the `metric` delta chip uses H=145 (green) — outside the warm fence, un-named | **Carve a semantic-color exception in §3**: delta up=success-green / down=danger-red are SEMANTIC, excluded from the warm-fence raster (named, not a leak). |
| **F12 (ch2·R6 — backdrop blur budget)** | up to 11 simultaneous `backdrop-filter:blur(10px)` layers; `content-visibility` does NOT skip a blur intersecting the viewport; the "costs nothing" claim is GL-only | **Add a perf arm to the gate**: measure paint+composite time (chrome-devtools performance trace) on the real N-card landing; the below-fold card plate may be a `background` warm-glass without a live blur (or share ONE blur via a parent). Assert 60fps on the cel-slam with blur active. "Costs nothing" is a measured number, not a GL-context count. |
| **F13 (ch3·R4 — field hue-walk)** | the §2 frozen-field "breathes on hover" (6°/1.2s `--field-h` hue-walk) repaints a non-compositor background every frame for a sub-perceptual result | **DROP the hue-walk** (keep the still truly free), OR move it to a compositor-safe channel (`opacity`/`transform` on a sibling glaze). Do not pay background-repaint cost for a sub-perceptual effect. |
| **F14 (ch3·R8 a11y, all — PRM/reduced-transparency)** | PRM/reduced-transparency carves stated; the reduced-transparency arm covers the FIELD, not the SPECIMEN (a teal frozen-aurora survives behind the warm floor) | The reduced-transparency arm warm-clamps the SPECIMEN too (F7 makes this free — the specimen is already warm-clamped). PRM → cel-slam one frame, hover/parallax/no goo neck; specimen `inert`+`aria-hidden` (0 tab-stops, already shipped). |

---

## 3 — THE UNION PATH (deft integration — how to evolve current → golden)

**ONE NEW demo-private artefact + 1 registry + AUGMENT 2 shipped surfaces. No new card system, no
second field engine, no parallel fork.**

1. **`demo/stories/SpecimenStage.vue`** (NEW, ~60 LOC) — the `previewKind`→specimen dispatcher. A
   `<component :is>`/`v-if` switch composing SHIPPED `<Aurora render-mode="css">` (warm-clamped palette) /
   `<Button>`+`<Slider :model-value="[62]">`+`<Switch :model-value="true">` / `<Card tier="quiet">` /
   `<MetricBadge>` / `<IconChip>`. Each specimen FILLS its stage (`container-type:size` + `cqmin`,
   ≥45% occupancy, F6). Renders INTO the existing `#preview` slot. Scale-clamped, `inert` (inherited).
2. **`SPECIMEN` registry** (sibling in `category-hero.ts`) — `Record<categoryId, {kind, props}>` reading
   `previewKind` (DRY, ONE switch). The category's marquee specimen + its frozen props. NO manifest
   `specimen?` override (F4).
3. **AUGMENT `SectionPreviewCard.vue`** — DELETE the gray `--foreground 3%/6%` thumb
   (`.section-preview-card-preview`); the window becomes a bounded warm §3 field + a defined `--glass-key`
   edge (M1/F8); `aspect-ratio:var(--phi,1.618)` + a φ-ladder `max-block-size` (M3/F1/F7-double-bound);
   concentric rim (CONSUME `BD.W-CONCENTRIC-RADIUS`); the liquid hover + cartoon cast (§REFINE).
4. **AUGMENT `SectionLanding.vue`** — replace the `<component :is="sectionIcon">` `#preview` block (and
   DELETE the `.section-preview-thumb` style) with `<SpecimenStage :kind="hero.previewKind"
   :hue="cardFieldH" :lead="idx===0"/>` per card; write `--card-field-h` = `warmFieldHue(category.id)`
   (CONSUME, §DEPEND); grid `gap: calc(1rem * var(--phi,1.618))`; lead = the marquee 3-row specimen.
5. **CO-MINT `--phi:1.618`** (F1) — a tiny demo-side token; cross-link story-page-standard.

**EXCISE (clean break, NO LEGACY):** the `.section-preview-thumb` glyph block + the
`<component :is="sectionIcon">` `#preview` wiring (`SectionLanding.vue`); the gray
`color-mix(... --foreground 3%/6% ...)` bg + border (`.section-preview-card-preview`).

**CONSUME / DEPEND (booked sibling deltas — NO edit here):** `BD.W-SECTION-HUE-WARM-FENCE` (warm hue,
teal impossible), `BD.W-PAGE-FIELD`+`BD.W-FIELD-SCRIPT` (`paper-field`/`--field-h`/`warmFieldHue`,
CSS-clamped `[25,95]`), `BD.W-GLASS-KEY-EDGE` (`--glass-key`), `BD.W-CONCENTRIC-RADIUS` (on disk),
`BD.W-CARTOON-CASTER`/`--shadow-cartoon-*` (the cast), `--spring-bouncy`/`--spring-smooth` (shipped),
`.scroll-cascade`/`.scroll-build` (shipped). SHIPPED: `<Aurora render-mode="css">`, `<Card tier>`,
`<Button>`/`<Slider>`/`<Switch>`/`<MetricBadge>`/`<IconChip>`, `GlassGooFilter`/`#glass-goo` (stretch),
the `#preview` seam, the `previewKind` field, the manifest loader.

**No-dup reconciliation:** shell-layout's WAVE-AMENDMENT EXCISED `W-BENTO-SPECIMEN` and re-homed it HERE
(verified line 242 of the plan §6 ledger: "EXCISE from this item (de-dup) the GOLDEN's `W-BENTO-SPECIMEN`
→ re-homed to the `category-landing` ledger item … the `$slots.preview` seam EXISTS in
`SectionPreviewCard.vue:91`"). This item OWNS the bento card + the live specimen; shell-layout owns the
warm-fence; page-background owns `paper-field`/`warmFieldHue`/`--field-h`; glass-material owns
`--glass-key`. Grep confirms NO `SpecimenStage`/`SPECIMEN`/`previewSpecimen` on disk — genuinely NEW, not
a re-fork. The reserved wave name is **`BD.W-BENTO-SPECIMEN`**.

---

## 4 — THE VERDICT

**REFINE-dominant (the card chassis + the `#preview`/`previewKind`/one-GL seam SURVIVE all 3 challenges)
+ ONE RE-INVENT (the preview CONTENT: glyph → live specimen stage).** The current ships a fit chassis
with a born-dead preview window; the golden inverts the window's metaphor (gray-thumb → warm-field
specimen stage) onto the SAME seam — a genuine UNION. The fourteen challenge folds (F1–F14) harden the
spike's weak points: the `--phi` orphan (CO-MINT, no bare var), the 5-token DEPEND-order gate (G0
deps-present, FAIL LOUD, no literal-by-stealth), the goo lead card DESCOPED to a stretch arm (the
highest risk-per-card), the teal substrates-specimen (warm-clamp the palette + B3 distinct-from-field),
the 5%-occupancy float (scale-to-fit ≥45% at the wide lead), the symmetric rim (`--glass-key`
asymmetry), the thumbless slider (`[62]` array), the sub-floor dark chroma (`C 0.05`), the un-named
green chip (semantic carve), the unaudited blur budget (perf arm). The build is BLOCKED on the 5 sibling
deltas landing first; the painted paired-engine RASTER π is binding (no source-green close).

**Convergence: ~74%.** (Idea fit + seam re-point + one-GL budget + both-mode warm SURVIVE; remaining 26%
= build-time, BLOCKED on the 5 DEPEND deltas: the `--phi` co-mint, the `SpecimenStage` dispatcher +
registry, the scale-to-fit ≥45% stage, the warm-clamped specimen palette + B3 distinct-from-field, the
`--glass-key` asymmetric edge, the `[62]`/`modelValue` prop fixes, the dark `C 0.05` floor, the perf
arm, the painted paired-engine both-mode π, the descoped-goo stretch — all USER-gated.)
