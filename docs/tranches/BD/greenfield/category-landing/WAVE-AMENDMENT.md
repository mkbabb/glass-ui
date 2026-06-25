# category-landing — WAVE-AMENDMENT (the concrete tranche amendment)

> Reconciled against the on-disk 116-wave set (`docs/tranches/BD/union/waves/`). Cites every
> touched wave by filename. Each NEW wave references `./GOLDEN.md` as the reference implementation
> and carries a real born-RED gate (live-confirmed §0 of `./DELTA-ASSAY.md`). NO duplicative work.
> Tranche-DEV only; build USER-gated.

---

## The reconciliation (what already exists, what's reserved)

- **`W-BENTO-SPECIMEN` was EXCISED by shell-layout** and re-homed HERE (plan §6 ledger, shell-layout
  row: *"EXCISE from this item (de-dup) the GOLDEN's `W-BENTO-SPECIMEN` → re-homed to the
  `category-landing` ledger item … the `$slots.preview` seam EXISTS in `SectionPreviewCard.vue:91`"*).
  This item OWNS the bento card + the live specimen. The reserved wave name is **`BD.W-BENTO-SPECIMEN`**.
- **Grep:** NO `SpecimenStage`/`SPECIMEN`/`previewSpecimen` on disk (`src/`+`demo/`) — genuinely NEW.
- **The seams it unions onto all SHIP:** `#preview` slot (`SectionPreviewCard.vue`, `inert`+`aria-hidden`),
  `previewKind` field (`category-hero.ts`), `<Aurora render-mode="css">` (`Aurora.vue:59`, zero-GL),
  `<Card tier>`/`<Button>`/`<Slider>`/`<Switch>`/`<MetricBadge>`/`<IconChip>`, `GlassGooFilter`/`#glass-goo`,
  `--shadow-cartoon-*`, `--spring-bouncy`/`--spring-smooth`, `.scroll-cascade`/`.scroll-build`, the
  manifest loader. A genuine UNION, never a fork.

---

## NEW — `BD.W-BENTO-SPECIMEN` (the live specimen stage; the gray-window RE-INVENT)

**Band C (demo/storybook chassis) · DEPENDS (hard, sequence AFTER):** `BD.W-SECTION-HUE-WARM-FENCE`,
`BD.W-PAGE-FIELD`, `BD.W-FIELD-SCRIPT`, `BD.W-GLASS-KEY-EDGE`, `BD.W-CONCENTRIC-RADIUS`.
**Reference implementation:** `docs/tranches/BD/greenfield/category-landing/GOLDEN.md` (with the F1–F14
hardenings of `./DELTA-ASSAY.md` §2 FOLDED).

### The deliverables (the UNION — §3 of DELTA-ASSAY)

1. **`demo/stories/SpecimenStage.vue`** (NEW, ~60 LOC) — the `previewKind`→specimen dispatcher.
   `<component :is>`/`v-if` over `previewKind` composing SHIPPED primitives, each FILLING its stage
   (`container-type:size` + `cqmin`, ≥45% occupancy at every width — fold F6):
   - `field` → `<Aurora render-mode="css">` with a **WARM-CLAMPED palette** (H∈[25,95]; substrates'
     `cat-substrates` teal is clamped to warm-amber — fold F7), bounded `inset:0`, FROZEN.
   - `control` → `<Button>` + `<Slider :model-value="[62]">` (ARRAY — fold F9) +
     `<Switch :model-value="true">` (reka-ui `modelValue`, NOT `:checked`/`:pressed`), inert, LIVE.
     LEAD = a 3-row STACK (earns the span-2 width — fold F6).
   - `surface` → a mini `<Card tier="quiet">` + hairline header + 2 rule bars, LIVE.
   - `metric` → `<MetricBadge>` (the delta chip may be SEMANTIC green/red — fold F11).
   - `glyph` → `<IconChip>` POP over the warm field (LAST RESORT — foundations only).
2. **`SPECIMEN` registry** (sibling in `category-hero.ts`) — `Record<categoryId, {kind, props}>` reading
   `previewKind` (ONE switch, DRY). **NO manifest `specimen?` override** (fold F4 — DRY by subtraction).
3. **AUGMENT `SectionPreviewCard.vue`** — EXCISE the gray `color-mix(... --foreground 3%/6% ...)` bg +
   border on `.section-preview-card-preview`; replace with the bounded warm §3 field
   (`oklch(0.93 0.045 var(--field-h))` light / `oklch(0.30 0.05 var(--field-h))` dark — C 0.05 clears B7,
   fold F9) + a defined `--glass-key` ASYMMETRIC lit edge (fold F8). `aspect-ratio:var(--phi,1.618)` +
   a φ-ladder `max-block-size` (double-bound, fold F1/F7). Concentric rim (CONSUME
   `BD.W-CONCENTRIC-RADIUS`). The liquid hover (`translate(-2px,-3px) scale(1.018)` on `--spring-smooth`,
   cast `--shadow-cartoon-md`→`-lg`, specimen parallax-lag +2px). PLAIN per-mode `.dark .x` arms (the
   `:global()` drop + the inset-shadow-in-`light-dark()` traps, MEMORY).
4. **AUGMENT `SectionLanding.vue`** — replace the `<component :is="sectionIcon">` `#preview` block +
   DELETE the `.section-preview-thumb` style; wire `<SpecimenStage :kind :hue :lead>` per card; write
   `--card-field-h = warmFieldHue(category.id)` (CONSUME `BD.W-FIELD-SCRIPT`); grid
   `gap: calc(1rem * var(--phi,1.618))`; cel-slam on `--spring-bouncy` UNION onto `.scroll-cascade`.
5. **CO-MINT `--phi:1.618`** (fold F1) — a tiny demo-side token in `demo/stories/` chassis CSS (NO owner
   on disk; story-page-standard's GOLDEN prose uses it but books no mint). Cross-link
   `W-STORY-PAGE-STANDARD` as co-consumer; first-to-land mints, no double-mint. NEVER ship a bare
   `var(--phi)` without `,1.618`.

### STRETCH (descoped — the FIRST budget cut, fold F3): the goo-merge lead card

Build ONLY if budget allows AND WebKit-verified. MOUNT the shipped `GlassGooFilter` (`#glass-goo`, sRGB,
`x=-50% width=200%` region — fold F10), on a SIBLING layer OUTSIDE the glass plate's `backdrop-filter`
host, `z` ABOVE the stage so the neck reads. Cut FIRST if budget tightens.

### The born-RED gate — `proof:bento-specimen` (RASTER-honest, paired-engine, both modes)

Sample the COMPOSITED card pixel via full-page screenshot → `getImageData`, NEVER a `getComputedStyle`
stop-string average (the recurring fraud bite — plan §6 systemic note). Paired-engine (Chromium +
WebKit), both modes. Surfaces: `/substrates`+`/motion` (field), `/forms`+`/navigation` (control),
`/display`+`/containers` (surface), `/data` (metric), `/foundations` (glyph) → LOOP all 11.

| # | assert | born-RED on HEAD (live §0) | GREEN when |
|---|---|---|---|
| **G0 DEPS-PRESENT** | `--field-h`/`--glass-key`/`--phi` resolve to NON-fallback; `warmFieldHue(id)` returns a warm hue; FAIL LOUD if any DEPEND absent (fold F2) | all 6 tokens UNSET (live) | the 5 DEPEND deltas + the `--phi` co-mint land |
| **G1 no-gray window** | preview window rasters mean OKLab **C ≥ 0.045 warm**, H∈[25,95]; NOT `srgb 0 0 0/.0x` | bg `srgb 0 0 0/.03`, C≈0 (live) | the warm §3 field (M1) |
| **G2 no-teal (window AND specimen)** | NO sampled card/field/chip/**specimen** patch lands H∈[180,270] (fold F7) | chip `srgb .138 .479 .583` teal; substrates specimen would paint `cat-substrates` teal (live) | warm-fence + warm-clamped specimen palette |
| **G3 LIVE specimen, DISTINCT from field** | window rasters the specimen's OWN structure (`field`=aurora hue-histogram DISTINCT from the field-floor histogram — fold F7; `control`=button silhouette+thumb; `surface`=card edge; `metric`=tabular digits); a centered glyph OR an all-warm-smear-matching-the-field FAILS | 11× the same droplet glyph (live) | `SpecimenStage` wired (M2) + B3-distinct |
| **G4 useful + proportioned, WIDE-card** | painted-specimen-bbox / stage-bbox **≥ 0.38 AT THE SPAN-2 LEAD WIDTH** (not just 1-col); window:text ≈ φ; card TOTAL height bounded at the wide width (fold F6/F7) | 643×388 card, 601×112 empty box, `aspect:auto` (live) | scale-to-fit ≥45% + the φ double-bound clamp |
| **G5 one-GL budget** | the landing mounts ≤1 live WebGL context; `field` specimens are CSS stills (zero canvas) | — | Aurora `render-mode="css"` (M4) |
| **G6 defined edge — ASYMMETRIC** | the lit corner exceeds the opposite by ΔL keyed off `--glass-key`; the symmetric/`-58deg` literal is FORBIDDEN (a missing `--glass-key` FAILS, never papers over — fold F8) | flat box, no edge (live) | the `--glass-key` over-glaze |
| **G7 both-mode warm** | dark window **C≥0.045 warm** (floor `oklch(.30 .05 …)` — fold F9), L∈[0.25,0.6] (GLOWS, not charcoal) | — | the warm-ember dark arm |
| **G8 cross-engine (WebKit-real)** | the WebKit capture shows the warm specimen (sRGB-pinned, no gray seam); NO `backdrop-filter:url()` anywhere; (stretch) the goo waist reads in sRGB + a real DOM-ancestry assert (goo on an ancestor-of-the-transmissive-plate → RED — fold F3) | — | sRGB pin + no-url filter + sibling goo |
| **G9 perf budget (measured)** | a chrome-devtools performance trace on the real N-card landing holds 60fps on the cel-slam with all blur active; the below-fold blur budget is bounded (fold F12) | — | content-visibility park + bounded blur layers |
| **G10 a11y arms** | PRM → specimens static, hover frozen, no goo neck frames; reduced-transparency → field warm-solid (C≥0.045) AND specimen warm-clamped legible (fold F14); specimen `inert`+`aria-hidden` (0 tab-stops) | — | the carves wire |
| **G11 every category** | ALL 11 landings pass G1-G3 (no category renders a gray/glyph/teal placeholder) | only the glyph everywhere (live) | the registry covers 11 (M2) |
| **G12 cartoon punch** | the cel-slam mid-flight has scale≠1 + an overshoot frame; hover lifts + the cast travels; (stretch) the goo neck reads a metaball waist at the split midpoint on WebKit | static 1px translate, no cast (live) | the §2 motion + (stretch) §2.1 goo |
| **G13 prop-binding (anti-no-op)** | the `control` specimen paints a slider THUMB (`:model-value="[62]"` array, not `62`) + a switch ON-state (`modelValue`, not `:checked`) — a thumbless track FAILS (fold F9, the binding-verification trap) | — | the array/modelValue props |
| **G14 anti-evasion (≥10 bites)** | FAILS on: re-pasted `--foreground 3%` thumb (G1) · teal window OR teal specimen (G2) · glyph-only/all-warm-smear preview (G3) · a 2nd live GL (G5) · <38% wide-card occupancy (G4) · a stop-string-average reader (the fraud bite) · `backdrop-filter:url()` OR a goo filter on an ancestor-of-the-glass (G8 DOM-ancestry) · a symmetric flat rim passing as the key-edge (G6) · a thumbless slider (G13) · a literal `62`/`1.618` painted at gate time with the DEPEND absent (G0) | — | passes only on the real warm specimen stage |

**Self-test (`--selftest`):** re-paste the gray thumb → G1 RED; pin `--card-field-h:210` → G2 RED; pass
substrates `cat-substrates` teal palette to the specimen → G2 RED; swap `SpecimenStage` back to the glyph
→ G3 RED; arm 11 live Auroras → G5 RED; un-clamp card height → G4 RED; symmetric rim → G6 RED; un-set
`--glass-key` AND ban the literal → G6 RED (right reason); `:model-value="62"` → G13 RED; remove a DEPEND
→ G0 RED. Each MUST flag; the fixed tree clean. **No source-green close — the painted paired-engine
RASTER π is binding.**

---

## AUGMENT / CROSS-LINK / DEPEND (cited by filename — no edit-here on the consumed)

| disposition | wave (filename) | why |
|---|---|---|
| **AUGMENT** | — (none; `BD.W-BENTO-SPECIMEN` is NEW and owns the bento card + specimen outright) | the two shipped surfaces it edits (`SectionPreviewCard.vue`, `SectionLanding.vue`) are demo files, owned by THIS new wave's deliverables, not a prior wave |
| **CROSS-LINK** | `W-STORY-PAGE-STANDARD.md` | co-consumer of the CO-MINTED `--phi:1.618` (its GOLDEN prose uses `--phi`; first-to-land mints, no double-mint — fold F1) |
| **DEPEND (hard, sequence AFTER)** | `BD.W-SECTION-HUE-WARM-FENCE`* | the warmed `sectionHue` re-index — teal/cool chips impossible by construction; this CONSUMES `categoryHue(id)` + derives `--card-field-h`, never re-rolls the hue (fold F2) |
| **DEPEND** | `BD.W-PAGE-FIELD`* + `BD.W-FIELD-SCRIPT`* | `@utility paper-field` + `@property --field-h` (CSS-clamped `clamp(25,raw,95)`) + `warmFieldHue(id)` — the bounded-window field + the per-card warm hue (fold F2/F7) |
| **DEPEND** | `BD.W-GLASS-KEY-EDGE`* | `--glass-key` — the §3 ASYMMETRIC lit-corner edge (fold F8) |
| **DEPEND** | `BD.W-CONCENTRIC-RADIUS.md` (on disk) | the preview rim `r_inner = r_outer − pad` |
| **DEPEND / RIDE** | `BD.W-CARTOON-CASTER`* / shipped `--shadow-cartoon-md/lg`, `--spring-bouncy`, `--spring-smooth`, `.scroll-cascade`, `.scroll-build` | the cartoon cast + the liquid hover + the cel-slam cascade |
| **RIDE (shipped)** | `<Aurora render-mode="css">` (`Aurora.vue:59`), `<Card tier>`, `<Button>`/`<Slider>`/`<Switch>`/`<MetricBadge>`/`<IconChip>`, `GlassGooFilter`/`#glass-goo` (stretch), the `#preview` seam, `previewKind`, the manifest loader | the specimen primitives + the seam — zero new engine |

> *Asterisked DEPEND waves are SIBLING-DELTA deliverables (shell-layout / page-background / glass-material
> / cartoon-shadow amendments), each with its own born-RED gate — NOT files in the 116-wave set yet. This
> wave's G0 born-RED precondition FAILS LOUD if any is absent (no literal-by-stealth). DEPEND, never
> re-mint.

**PRUNE:** none. **EXCISE (from the GOLDEN/spike, NOT a wave):** the manifest `specimen?` override (F4);
the hand-rolled `#goo` filter → the shipped `#glass-goo` (F10); the bare `var(--phi)` (F1); the
symmetric-rim "B6 GREEN" claim (F8); the field hue-walk (F13); the goo lead card demoted to STRETCH (F3);
the spike's stop-string `sampleField` reader → painted-pixel `getImageData` (the fraud bite). **EXCISE
(from the demo source, clean break, NO LEGACY):** the `.section-preview-thumb` glyph block +
`<component :is="sectionIcon">` `#preview` wiring; the gray `--foreground 3%/6%` window bg + border.
