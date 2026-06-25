# category-landing — GREENFIELD BRAINSTORM (LENS B: CROSS-ENGINE / PERF-FIRST)

> The `/:category` landing — `SectionLanding.vue` (the D1 section hero + bento grid) +
> `SectionPreviewCard.vue` (the bento cards) — redesigned from first principles through the
> Chrome+Safari / performance lens. Tranche-DEV only; build USER-gated.
>
> **The bar (USER 2026-06-24, screenshot-grounded /substrates):** *"category landing pages should
> NOT have USELESS large cards — and these are all far too GRAY — ENTIRELY ABROGATE the gray in
> favor of proper GLASS — but should include LIVE DEMOS of those items and components baked in. In
> EVERY category landing page."*

---

## 0 — THE BORN-RED TRUTH (live-inspected this session, `/substrates` @ 1440, light)

Confirmed on `http://localhost:5173/substrates` — `getComputedStyle` + full-page screenshot:

| symptom | measured | the lie |
|---|---|---|
| **The page field is TEAL** | `--section-color-3 = light-dark(oklch(.542 .089 222.8), oklch(.767 .091 219.9))` — a cyan hero wash fills the whole landing | the cool teal the shell-layout warm-fence is *supposed* to purge (`--field-h` is **UNSET**; `hasPaperField:false`) |
| **The cards are GRAY** | `cardBg = oklab(0.763 0.005 0.011 / .72)` — chroma **0.012**, effectively neutral | the `glass-resting` plate over near-zero tint — the BA.W-NO-GRAY violation, literal |
| **The cards are HUGE + EMPTY** | each card `643 × 388px` (lead) — a vast plate holding a title, a subpath chip, an **empty gray preview box** (`thumbBg = srgb 0 0 0 / .03`), and a blurb | "useless large cards" — the preview is a single droplet GLYPH centered in dead space |
| **The preview is a GLYPH, not a demo** | `SectionLanding.vue:75–83` renders `<component :is="sectionIcon">` for EVERY card — the SAME droplet, 11×. NOT the live Aurora / GooBlob / component | the `#preview` seam EXISTS (`SectionPreviewCard.vue:91 $slots.preview`) + `previewKind` is declared (`category-hero.ts:48`) but is **UNCONSUMED** — no card renders a real specimen |

So: gray (not warm glass), teal field (not warm), large+empty (not proportioned), glyph (not a live demo). Four
defects, one screenshot. The gray is **honestly born-RED**.

---

## 1 — THE CORE IDEA: the bento card IS a tiny live story page — "the SPECIMEN STAGE"

The redesign is not a re-skin of the gray card. It is a re-conception of what a bento card *is*. Today a
card is a **text link wearing a glass costume with an empty window**. The greenfield card is a **bounded
LIVE SPECIMEN of the target story, framed in warm glass over the warm field** — a literal miniature of the
page you're about to visit. You don't read *about* Aurora; you *see* Aurora, frozen and luminous, behind glass.

Three moves, all UNIONS onto shipped seams — no fork:

### Move A — ABROGATE THE GRAY (consume the warm register, never mint a new one)

The card already wears `glass-resting` (`SectionPreviewCard.vue:55`). The gray is not the plate — it is the
**near-zero-chroma ground** behind/within it (no warm field, a 3%-foreground thumb tint). So:

1. **Mount the shared warm FIELD behind the landing.** The landing's `<StoryHero>` already routes through
   the `liveBackdrop`/`fullBleed`/`cardTier` seam (`StoryHero.vue:202,251`). Consume the page-background
   delta's `@utility paper-field` + `--field-h: warmFieldHue(categoryHue(id))` (the **booked**
   `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT`; clamp `[25,95]`, paint-hard). One writer → the field is warm in
   BOTH modes. **No teal** — `warmFieldHue(substrates sc3 222.8°) → a warm amber/terracotta degree.** This
   is the SAME field the story-page-standard chassis mounts; the landing inherits it, mints nothing.
2. **The card plate stays `glass-resting` — but its in-card preview region gets a `tier="wash"`
   field-transmitting floor** (the §3 "colorful field behind glass + a defined edge"), NOT
   `color-mix(--foreground 3%, transparent)`. The card transmits the warm field through translucent glass; the
   preview window shows the *specimen's own* color (the Aurora's amber mesh, the Button's accent) over the warm
   wash. Delete the `--foreground 3%` thumb-bg + the `--foreground 6%` thumb-border (`SectionPreviewCard.vue:140-141`)
   and the `.section-preview-thumb` color-mix glyph (`SectionLanding.vue:96-101`) — the EXCISED gray.
3. **The defined edge:** the preview region rim is a concentric-radius card edge (`r_inner = r_outer − pad`,
   `BD.W-CONCENTRIC-RADIUS`) with the `--glass-border-quiet` stroke + the §3 key-edge lit corner (`--glass-key`,
   booked `BD.W-GLASS-KEY-EDGE`). It reads as a bounded glass window onto a colorful field, the iOS-27 signature.

**Net:** the card is warm glass over a warm field; the preview is a colorful specimen behind a defined glass
edge. Zero gray, zero teal, both modes. **No new register, no new token** — consume the warm-fence + the field +
the concentric radius + the key-edge, all booked.

### Move B — BAKE IN A LIVE SPECIMEN per `previewKind` (the seam, finally wired)

`category-hero.ts` already declares `previewKind ∈ {field, control, surface, metric, glyph}` per category. Wire
the `#preview` slot to a **`<SpecimenStage>`** demo-private dispatcher that renders the category's representative
specimen — a UNION, one tiny component, dispatching on `previewKind`, composing SHIPPED primitives:

| `previewKind` | category | the SPECIMEN (shipped primitive) | live or still |
|---|---|---|---|
| `field` | substrates, motion | `<Aurora>` (`src/components/custom/aurora`) — its OWN palette, bounded | **STILL** (one-GL budget — §1.1 below) |
| `control` | forms, navigation | a real `<Button>` + `<Slider>` + `<Switch>` cluster (`src/components/ui/*`) — inert | **LIVE** (CSS-only, free) |
| `surface` | display, containers, dock, feedback, compositions | a mini `<Card tier="quiet">` silhouette with a header + a faux row (`src/components/ui/card`) | **LIVE** (CSS-only, free) |
| `metric` | data | a real `<MetricBadge>` row (`src/components/custom/metric-badge`) | **LIVE** (CSS-only, free) |
| `glyph` | foundations (last resort) | the IconChip POP over the warm field — the ONLY card that may show a glyph | LIVE (CSS-only) |

The specimen is rendered inside the `inert` + `pointer-events:none` `#preview` region (already there,
`SectionPreviewCard.vue:91-97`) so it never steals the card's click and never tabs. It is scale-clamped to a
thumbnail (`transform: scale(.78)` + `transform-origin: top left`, the §L6 1/φ-adjacent rung) so a real control
reads as a *miniature of the real thing*, not a full-size widget crammed in.

**KISS:** `SpecimenStage.vue` is ~40 lines — a `<component :is>` switch over `previewKind` plus a per-category
specimen registry (`SPECIMEN` map, sibling to `CATEGORY_HERO`, keyed by category id → which marquee specimen +
its frozen props). NOT a per-story bespoke render; the category's ONE representative specimen stands for the band
(substrates→Aurora, forms→a control cluster). DRY: the registry reads `categoryHero(id).previewKind`, never a
second per-category switch.

### Move C — PROPORTION the card (§L6 golden; not large+empty)

The card is 388px tall and mostly air because the empty preview box reserves `7rem` for a glyph. With a real
specimen filling it, the card earns its height — but we still golden-proportion it:

- **The bento grid is a φ-rhythm:** the lead card spans `φ:1` of the row (the existing `lead && sm:col-span-2`,
  kept), the preview region is `--specimen-h` = `clamp(5rem, 38.2% of card, 7rem)` (the 1/φ² rung), so the card is
  ~ specimen : (chip+title+blurb) ≈ φ — the preview is the protagonist, the text the supporting caption.
- **Card max-width is bounded** so a 3-col grid at ≥1280 doesn't blow each card to 643px: `max-inline-size`
  on the φ-ladder, the grid `gap` steps by √φ (the §L6 spacing rule). The cards shrink to *useful* — a specimen
  you can read at a glance, a title, a one-line blurb. No vast plate.

---

## 1.1 — THE ONE-GL BUDGET (the perf spine — CLAUDE.md §BA.W-STAGE)

A landing has up to 11 cards. If `field` specimens mounted 11 live `<Aurora>` WebGL contexts, the page would
melt (context-limit thrash + 11 RAF loops). **The budget: the landing mounts ≤1 live GL context** — and the
elegant truth is **it needs ZERO for the previews**, because:

- **Aurora's first frame is CSS, zero-GL.** `Aurora.vue:144,195,267` paints a `paletteToCssGradient` first-frame
  with **zero JS / zero GPU**; the canvas only cross-fades in past idle. A `field` specimen renders Aurora with
  the WebGL path **never armed** → it is a pure-CSS painterly gradient still. No canvas, no RAF, no context.
  This is the frozen still the budget demands, and Aurora already ships the seam (`matchMedia` freeze, the
  `contentvisibility` park — `Aurora.vue:69,229`).
- **Mechanism:** `<SpecimenStage>` passes a `still` intent that maps to Aurora's CSS-first-frame path
  (render="css", no webgl arm) — a SINGLE PAINT, never a running context. The ONE live GL the landing *is*
  allowed (the hero field, if `bgKind:"aurora"`) is the page backdrop, owned by the field delta — the previews
  never add a second.
- **PRM → every specimen is its terminal static frame** (Aurora already collapses; the control/surface/metric
  specimens are static by nature). `content-visibility:auto` on the card + the off-screen pause means cards below
  the fold cost nothing until scrolled near (the §2 perf fence).

So: **field specimens are FROZEN CSS stills (zero GL); control/surface/metric/glyph specimens are CSS-only live
(free).** The landing's total live-GL cost is ≤1 (the optional hero backdrop), exactly the budget. This is the
boldest *perf* truth — the live demo costs nothing because the representative paint is already free.

---

## 2 — CROSS-ENGINE (Chrome + Safari) — the WebKit fences

The landing must be FLAWLESS on WebKit. The specimens are chosen to be Safari-trivial:

- **No `backdrop-filter: url()` anywhere** — the card glass is `backdrop-filter: blur()+saturate()` (already
  `blur(10px) saturate(1.4)`, live-confirmed, Safari-native). The warm field is a CSS gradient/mesh, not an
  SVG-filter chain. The §3 edge is `box-shadow`/`border`, compositor-only.
- **Aurora-still is sRGB-pinned.** The CSS first-frame gradient interpolation space is PINNED to sRGB (the
  page-background DELTA-ASSAY R6 lesson: the CSS default is oklab, which gray-edges across warm stops on a Safari
  gamut-map). Chroma-preserving end-stops → no gray seam in WebKit. (Inherit the field delta's pinned stops; the
  specimen Aurora reads the same warm script.)
- **The hover-lift is compositor-only** (`transform: translate` + `box-shadow`, already so —
  `SectionPreviewCard.vue:107-112`) — no layout property animates; Safari composites it on the GPU.
- **The specimen scale-clamp is `transform: scale()`** — a compositor transform, identical in both engines, no
  reflow.
- **No metaball/goo on the LANDING** (the meatballing lives in the dock, not the bento) — so this item carries no
  `filter:url()` goo risk. If a future `field` specimen wanted a goo-blob still, it would render the SVG-goo
  static frame (sRGB `color-interpolation-filters`, the shipped `DockGooFilter` Safari-safe pattern), never a
  live `filter:url()` animation. Out of scope here; flagged.
- **`@supports` floor:** `content-visibility` is progressive (Safari 17+); the `@supports not (content-visibility:auto)`
  arm simply renders all cards eagerly (correctness, not perf — acceptable, the specimens are cheap).

---

## 3 — A11Y / PRM CARVE

- **PRM (`prefers-reduced-motion: reduce`)** → the hover-lift freezes (already carved, `:114-121`); the
  Aurora-still is *already* static (no animation to stop); the control/surface specimens are static; the card
  entrance cel-slam (inherited from the story-page chassis `.scroll-build`) collapses to a fade. The landing reads
  as one static specimen sheet.
- **Reduced-transparency (`prefers-reduced-transparency`)** → `--field-intensity:0` drops the field to the warm
  `--neutral-0` solid floor (H∈[25,95], still warm, NOT gray — the field delta's carve); the card glass goes
  opaque-warm; the specimen stays legible over the solid warm ground. Conformity survives.
- **The specimen is `aria-hidden + inert`** (already, `SectionPreviewCard.vue:93-94`) — it is decorative; the
  card's accessible name is the title + blurb. A screen-reader user gets "Aurora — procedural painterly
  gradients" and navigates the link; the live demo is purely visual. No specimen tab-stops, no duplicate
  announcements.
- **Prose AA over the field:** the title/blurb sit on the card glass, not directly on the field; the §3 field is
  behind the *preview* window, the text is on the plate — AA holds (the field-behind-glass discipline).

---

## 4 — THE MECHANISM (precise — tokens / components / files)

**Net-new (demo-private, ~2 small artefacts):**

- `demo/stories/SpecimenStage.vue` — the `previewKind`→specimen dispatcher (~40 lines). A `<component :is>` /
  `v-if` switch composing SHIPPED `<Aurora still>` / `<Button>+<Slider>+<Switch>` / `<Card tier="quiet">` /
  `<MetricBadge>` / `<IconChip>`. Scale-clamped, inert (it renders INTO the existing `#preview` slot region).
- `SPECIMEN` registry in `category-hero.ts` (or a sibling `specimen.ts`) — `Record<categoryId, {kind, props}>`
  reading `previewKind` (DRY — no second switch). The category's ONE marquee specimen + its frozen props.

**AUGMENT (the shipped surfaces):**

- `SectionLanding.vue:75-83` — replace the glyph `#preview` template with `<SpecimenStage :category="category.id"/>`.
  Delete the `.section-preview-thumb` color-mix glyph block (`:96-101`).
- `SectionPreviewCard.vue:134-142` — re-point `.section-preview-card-preview`: drop the `--foreground 3%` bg + the
  `--foreground 6%` border; mount the `tier="wash"` field-transmit floor + the concentric §3 edge + the
  `--glass-key` lit corner; `--specimen-h` φ-clamp; `content-visibility:auto` + `contain-intrinsic-size` for the
  off-screen pause.
- `SectionPreviewCard.vue:56-60` — bound `max-inline-size` (φ-ladder); the grid `gap` → √φ rung
  (`SectionLanding.vue:56`).

**CONSUME / DEPEND (booked, no edit):**

- `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT` — the `@utility paper-field` + `warmFieldHue` (the warm, non-teal field).
- `BD.W-SECTION-HUE-WARM-FENCE` (shell-layout) — the warm-re-indexed `--section-color-N` (the chip + eyebrow read
  warm; no teal sc3).
- `BD.W-GLASS-KEY-EDGE` — `--glass-key` for the §3 lit corner.
- `BD.W-CONCENTRIC-RADIUS` — the preview rim `r_inner = r_outer − pad`.
- `Aurora.vue` (shipped) — its CSS-first-frame zero-GL still seam.
- `Card`/`Button`/`Slider`/`Switch`/`MetricBadge`/`IconChip` (shipped) — the specimens.

**EXCISE:** the per-card droplet glyph (`SectionLanding.vue:75-101`), the `--foreground 3%/6%` gray thumb
(`SectionPreviewCard.vue:140-141`). NO fork of `SectionLanding`/`SectionPreviewCard` — a UNION onto the shipped
chassis.

---

## 5 — THE BORN-RED GATE (RASTER-honest, paired-engine, both modes)

Reference discipline: the page-background RASTER lesson — **sample the COMPOSITED card pixel via full-page
screenshot → `getImageData`, NEVER `getComputedStyle`-string-average.** Paired-engine (Chromium + WebKit), both
modes. Surfaces: `/substrates`, `/forms`, `/display`, `/containers` (the four named) + `/data` (metric) +
`/motion` (field). Born-RED on HEAD by construction (gray + teal + glyph, live-measured §0).

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **B1 no-gray card** | each card region rasters mean OKLab **C ≥ 0.018 warm**, H∈[25,95] | C **0.012** neutral (live) | the warm field + transmit floor |
| **B2 no-teal** | NO sampled card/field/chip patch lands H∈[180,270]; the field H∈[25,95] | field is teal 222.8° (live) | the warm-fence + `warmFieldHue` |
| **B3 LIVE specimen (not glyph/placeholder)** | each card's preview region rasters the specimen's OWN color/structure — a `field` card shows a polychrome aurora (hue-spread Δ≥25° across patches), a `control` card shows a real button silhouette (edge + accent), a `metric` card shows tabular digits; a single centered droplet glyph FAILS | every card is the SAME droplet glyph (live) | `SpecimenStage` wired |
| **B4 useful + proportioned (§L6)** | card height bounded; preview : text ≈ φ; the preview region occupies ≥ 38% of card height with NON-empty content; dead space < floor | 388px card, ~7rem empty box (live) | the φ-clamp + the filled specimen |
| **B5 one-GL budget** | the landing mounts **≤1 live WebGL context** (count `canvas` with a live RAF); the `field` specimens are CSS-stills (zero canvas) | — | Aurora-still (css-first-frame) |
| **B6 defined edge (§3)** | the preview rim rasters a contrast delta ≥ floor against the field at its border; the §3 lit corner exceeds the opposite by ΔL keyed off `--glass-key` | flat box, no edge (live) | the concentric rim + key-edge |
| **B7 both-mode warm** | dark-mode card C ≥ 0.018 warm, L∈[0.25,0.6] (GLOWS, not charcoal) | — | the warm-dark field + tier |
| **B8 cross-engine (WebKit-real)** | the WebKit capture shows the warm specimen (sRGB-pinned, no gray seam); the Aurora-still has NO gray edge; the card glass `backdrop-filter` is blur-only (no `url()`) | — | sRGB pin + no-url filter |
| **B9 a11y arms** | PRM → specimens static, hover frozen; reduced-transparency → field drops to warm-solid `--neutral-0` (C≥0.012 warm, NOT gray), specimens legible; the specimen is `inert`+`aria-hidden` (0 tab-stops) | — | the carves wire |
| **B10 every category** | ALL category landings pass B1-B3 (no category renders a gray placeholder card) | only the glyph everywhere (live) | the registry covers 11 categories |
| **B11 anti-evasion (≥7 bites)** | FAILS on: a re-introduced `--foreground 3%` thumb (B1), a teal field (B2), a glyph-only preview (B3), a 2nd live GL context (B5), an empty/oversized card (B4), a stop-string-average reader (the fraud bite), a `backdrop-filter:url()` (B8) | — | passes only on the real warm specimen stage |

**Self-test (`--self-test`):** re-paste the `--foreground 3%` thumb → B1 RED; pin `--field-h:210` → B2 RED; swap
`SpecimenStage` back to the droplet glyph → B3 RED; arm 11 live Auroras → B5 RED; un-clamp the card height → B4 RED.
Each MUST flag; the fixed tree clean. **No source-green close — the painted paired-engine RASTER π is binding.**

---

## 6 — DELTA-ASSAY HOOK (reconcile vs the 116-wave set + shell-layout + story-page-standard)

- **shell-layout `WAVE-AMENDMENT §F` EXCISED `W-BENTO-SPECIMEN` and re-homed it HERE** verbatim — this item OWNS
  the dead-gray-thumb → warm-glass + live-`previewKind`-specimen work. No dup: shell-layout authors the warm-fence
  + the hero-field rim (E); category-landing authors the bento specimen. The cross-link is recorded there (§F).
- **story-page-standard mounts the universal warm field** (`AppShell.vue:251` `warmFieldHue` mount) — the landing
  INHERITS it (the same field behind the bento). category-landing does NOT re-mint the field; it CONSUMES it and
  adds the per-card transmit floor + the specimen. DISJOINT: story-page owns content pages' `<DemoFrame>`;
  category-landing owns the bento card's preview window.
- **page-background delta** owns `paper-field` + `warmFieldHue` + the §3 floor — DEPEND, never re-mint.
- Likely wave name: **`BD.W-BENTO-SPECIMEN`** (the name shell-layout §F reserved) — AUGMENT `SectionLanding`/
  `SectionPreviewCard` + NEW `SpecimenStage.vue` + `SPECIMEN` registry; DEPEND the 5 booked siblings above;
  CONSUME the warm-fence + field + concentric + key-edge. NO on-disk wave pruned; no new field/hue registry (DRY).

---

## 7 — SUMMARY + THE BOLDEST MOVE

**Core idea:** the bento card stops being a text-link-in-a-gray-costume and becomes a **SPECIMEN STAGE** — a
bounded, warm-glass window onto a frozen-or-CSS-live miniature of the target story's representative component,
floating over the shared warm field (never gray, never teal, both modes). Move A abrogates the gray by consuming
the warm field + transmit floor + §3 defined edge (all booked, mint nothing); Move B wires the long-dead
`#preview` seam to a tiny `SpecimenStage` dispatcher composing SHIPPED primitives per `previewKind`; Move C
golden-proportions the card so the specimen is the protagonist, not air. The whole thing is a UNION onto the
shipped `SectionLanding`/`SectionPreviewCard` + `#preview` slot + `previewKind` field — ~2 small net-new demo
artefacts, zero fork.

**The single boldest move:** make the "live demo" cost **ZERO GL** by exploiting Aurora's already-shipped
CSS-first-frame zero-GPU paint as the `field` specimen — so a landing with 11 "live" demos mounts **≤1 live
WebGL context total** (the optional hero backdrop), the previews are FREE single-paint warm stills, and the
one-GL budget is honored not by faking the demo but by realizing the representative paint was free all along.
The user gets a real baked-in live demo in every card; the GPU never notices.
