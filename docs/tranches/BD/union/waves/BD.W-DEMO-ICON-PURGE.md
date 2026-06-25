# BD.W-DEMO-ICON-PURGE — purge the superfluous giant greyed-out placeholder icon from the storybook chassis

**Band 9 (breadth/discharge — demo-breadth) · Tier T9 · depends: — (a demo-chassis-only fix; zero src/ paint) · folds into the demo-design/breadth band**

## The defect / the ask

The user's verbatim ask (ORCHESTRATOR-NOTES §"NEW DEFECTS folded 2026-06-22", screenshot — the Foundations section-landing): a **superfluous GIANT greyed-out placeholder icon on every storybook section-landing/hero/intro card.** The bento preview card's empty-preview box renders an OVERSIZED faint section-glyph watermark — a low-opacity icon centred in a 7rem box — superfluous, on every page. It is a DEMO-chassis defect (zero library paint).

The root cause is a SOURCE fact across THREE chassis call-sites, all identical. The `<SectionPreviewCard>` (`demo/stories/SectionPreviewCard.vue`) exposes a `#preview` slot meant for "a bounded inert mini-render of the target story's marquee specimen" (a tiny live `<Button>` row, a mini glass-card silhouette, a frozen aurora still — the user's "a live mini-preview within the sub-card, not just a text link" made literal). But the BC.W-HERO-AUDACIOUS Part C/E "populate the per-category preview content" step never landed a REAL mini-render — instead all three consumers fall back to a placeholder GLYPH:

1. **`demo/stories/SectionLanding.vue:75-83`** — `<template #preview>` → `.section-preview-thumb` rendering `<component :is="sectionIcon" :size="34" :stroke-width="1.5">` in a `block-size: 7rem` box at `color: color-mix(in oklab, var(--foreground), transparent 55%)` (`:96-101`). This is the Foundations watermark the user screenshotted.
2. **`demo/stories/compositions/hero.vue:130-138`** — `<template #preview>` → `.composition-scene-thumb`, BYTE-IDENTICAL recipe (`size:34` glyph, 7rem box, `transparent 55%`).
3. **`demo/stories/foundations/intro.vue:104-112`** — `<template #preview>` → `.intro-cat-thumb`, BYTE-IDENTICAL recipe.

All three are the SAME anti-pattern: a giant faint icon standing in for a real preview. The `<SectionPreviewCard>`'s own fallback (`:99` `<p v-if="blurb">`) is the CORRECT empty state — a card with NO `#preview` slot falls back to the blurb text. The three thumb wrappers DEFEAT that fallback by always providing a placeholder-glyph preview. There is no real-mini-render anywhere; the "preview" is universally the giant watermark.

The fix is demo-only: REMOVE the oversized low-opacity placeholder-icon thumb fallbacks. The preview falls back to the blurb text (the shipped `<SectionPreviewCard>` empty-state — `:99`), OR a REAL bounded inert mini-render where a marquee specimen is cheap (a `<Button>` row, a mini glass-card silhouette — the user's literal "live mini-preview"). NEVER a giant faint glyph.

## The mechanism

Audit the storybook chassis + the three preview-slot consumers; remove the giant greyed-out placeholder-icon thumbs. Demo-only (zero `src/` paint). KISS+DRY — collapse the three byte-identical thumb recipes, never re-paste a fourth.

1. **Delete the three placeholder-glyph thumbs.** Remove `.section-preview-thumb` / `.composition-scene-thumb` / `.intro-cat-thumb` (the `size:34` glyph-over-tint 7rem watermark) from `SectionLanding.vue`, `compositions/hero.vue`, `foundations/intro.vue` — both the `<template #preview>` block AND the scoped-CSS rule. Clean break (no alias, no kept-but-hidden rule).

2. **Fall back to the shipped empty state OR a real mini-render.** Two correct outcomes per card, the consumer chooses:
   - **The blurb fallback (default).** A card with NO `#preview` slot already renders the blurb (`SectionPreviewCard.vue:99`). Dropping the thumb lets the blurb be the preview — the card is a clean `[IconChip POP + title + subpath + blurb]` bento (the IconChip is the ONE deliberate color/glyph event per card — the W-SUFFUSE one-color-event idiom; the giant faint second glyph was the superfluous duplicate).
   - **A REAL mini-render (where cheap).** Where a story's marquee specimen is a no-GL static (a `<Button>` row, a mini `.glass-card` silhouette, a token swatch), the `#preview` slot hosts that bounded inert render (`pointer-events: none` + `inert` + height-clamped — the SectionPreviewCard preview seam, `:90-97`, UNTOUCHED). NEVER a second live-GL context (the one-GL-per-route budget the card header documents). A live-GL target (aurora/blob/fourier) takes the blurb fallback or a single-paint frozen still, NEVER a giant glyph.

3. **The IconChip POP is KEPT (it is NOT the watermark).** The card's leading `<IconChip :icon :section reveal bloom>` (`SectionPreviewCard.vue:65-74`) is the deliberate, proportioned, full-chroma section-color POP — the one-color-event vehicle, NOT the defect. The defect is the SECOND, GIANT, faint glyph in the preview box. The purge removes ONLY the giant faint placeholder; the IconChip POP stays.

This is NOT a re-fork — it composes the EXISTING `<SectionPreviewCard>` blurb-fallback + the EXISTING preview seam (the bounded inert render). It mints NO new chassis primitive; it DELETES three redundant watermark recipes. The chassis seam (`SectionPreviewCard.vue`) is byte-untouched (the slot + the fallback already exist correctly); only the three CONSUMERS that fed the giant glyph change.

## The gate — `proof:demo-icon-purge` (born-RED → GREEN)

`scripts/proof-demo-icon-purge.mjs`, `tags: ["local","ci"]` (a demo-chassis census; the binding paint is the π / the gestalt row — no source-green close). NEW gate. The detector comment-strips first + exports a pure detector for the self-test bites. Scans the ENROLLED chassis set (`demo/stories/SectionPreviewCard.vue`, `SectionLanding.vue`, `StoryHero.vue`, `StoryPage.vue`, `compositions/hero.vue`, `foundations/intro.vue` + any `#preview`-slot consumer — the set is computed from disk: every demo file passing a `#preview`/`name="preview"` slot).

- **C1 — no oversized low-opacity placeholder icon in the enrolled chassis.** No enrolled file renders an icon glyph at a LARGE size (`:size ≥ 28` / `size-7`+ / a ≥7rem box) AT a LOW opacity (a `color-mix(… transparent ≥40%)` / `opacity ≤ 0.6` / `text-muted` glyph tint) as a preview/empty-box fallback. The conjunction (large AND faint AND placeholder-positioned) is the watermark signature; the gate flags it. Born-RED: the three `.*-thumb` recipes (`size:34`, `transparent 55%`, 7rem box) all match.
- **C2 — the three byte-identical thumb recipes are GONE (clean break).** `.section-preview-thumb` / `.composition-scene-thumb` / `.intro-cat-thumb` are DEFINITION-ABSENT (no scoped rule, no `<template #preview>` rendering them). A surviving thumb rule (even hidden) REDs. Born-RED: all three present at HEAD.
- **C3 — the SectionPreviewCard blurb-fallback + preview seam are PRESERVED (no chassis regression).** `SectionPreviewCard.vue` still carries the `#preview` slot (`v-if="$slots.preview"`) AND the blurb fallback (`v-if="blurb"`) — the purge removes the giant-glyph CONSUMERS, not the seam. A purge that deletes the blurb fallback / the preview slot REDs (the over-cut bite — the seam is the correct empty-state home).
- **C4 — the IconChip POP is KEPT (not over-purged).** Each card still mounts its leading `<IconChip>` POP (the one-color-event glyph) — the purge does NOT strip the IconChip (a census that deleted the IconChip would mistake the legitimate POP for the watermark). A card with no IconChip POP after the purge REDs.
- **C5 — a real mini-render, where present, is bounded + inert + no second live-GL.** Any `#preview` slot that DOES host a render is `inert`/`pointer-events: none`/height-clamped and mounts NO second live-GL context on the landing (the one-GL-per-route budget). A `#preview` mounting a live `<Aurora>`/`<GooBlob>` REDs.

**Self-test bites (`--self-test`, born-RED→GREEN, ≥5 bites):** (1) re-add a `size:34` glyph at `transparent 55%` in a 7rem preview box → C1 RED; (2) keep a `.section-preview-thumb` scoped rule → C2 RED; (3) delete the `<p v-if="blurb">` fallback from SectionPreviewCard → C3 RED; (4) delete a card's leading IconChip → C4 RED; (5) mount a live `<Aurora>` in a `#preview` slot → C5 RED. Each MUST flag; the purged tree MUST be clean.

**What REDs on the pre-fix tree:** C1 (the three `.*-thumb` watermarks all match the large-AND-faint-AND-placeholder signature), C2 (all three thumb recipes present) — born-RED by construction; GREEN only after the three thumbs are purged + the blurb/real-render fallback stands + the seam/POP are preserved.

## The binding π — `tests-visual/demo-icon-purge.spec.ts`

The painted-truth readback the user's screenshot defect demands — a FRESH capture proving the giant watermark is GONE. Both modes (light/dark) at `:5199`, 4 PNGs {light,dark}×{desktop,mobile}, a `getComputedStyle` readback, a surface-hash. Surface: the three enrolled landings — `/foundations` (SectionLanding, the screenshotted page), `/compositions` (hero.vue), `/foundations/intro` (intro.vue).

- **THE WATERMARK IS GONE (the headline):** a getImageData scan of each preview card's body region finds NO large faint-glyph silhouette — the region reads either the blurb text (a `getComputedStyle` over the rendered `<p>` clears the body register) OR a bounded real mini-render (a `<Button>`/glass-card silhouette within the clamped box), NEVER a centred ≥28px low-alpha glyph. The defect (a faint oversized glyph filling a 7rem box) is the measurable failure.
- **THE IconChip POP READS:** each card's leading `<IconChip>` POP still paints its full-chroma section-color glyph (a getImageData over the chip reads the saturated hue at the glyph — the ONE color event, untouched by the purge).
- **THE CARD STAYS A CLEAN BENTO:** the card reads `[IconChip POP + title + subpath chip + blurb]` (or `+ real mini-render`) — a coherent bento, not a card dominated by a faint watermark. Body text clears its register; the layout is unbroken.
- **PRM single-paint:** under `prefers-reduced-motion: reduce`, the IconChip reveal/bloom snaps static; the card reads one static frame with NO watermark.

## The gestalt row

**BD-union-roster surface: `demo-icon-purge`** (wired by W-GESTALT-WIRE). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture of `/foundations` (+ `/compositions` + `/foundations/intro`), NEVER reducedMotion, surface-hash freshness floor, 4 PNGs {light,dark}×{desktop,mobile}. The gestalt judgement: the storybook section-landing / hero / intro cards read as CLEAN bento cards — a deliberate IconChip POP + title + subpath + blurb (or a real bounded mini-render), with NO superfluous giant greyed-out placeholder-icon watermark dominating the preview box. PASS iff the watermark the user screenshotted is GONE in both modes. Born-FAIL on HEAD (the giant faint glyph is on every section-landing card); GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels, never the first paint.

## Fences

- **Demo-only / zero src/ paint.** The purge touches ONLY `demo/stories/**` (the three thumb consumers + the gate/π). The library `<IconChip>` / `<SectionPreviewCard>` chassis source is byte-untouched (the seam + the blurb fallback already exist correctly). A diff over `src/` is empty.
- **No-legacy / clean break.** The three thumb recipes are DELETED (no alias, no kept-but-hidden rule, no `display: none` stub) — the watermark is ABSENT, the blurb/real-render fallback is the successor.
- **KISS+DRY.** The three byte-identical thumb recipes collapse to ZERO (the correct empty-state is the shipped blurb fallback, already DRY in `SectionPreviewCard.vue`); no fourth thumb is minted.
- **The one-color-event restraint (KEPT).** The card's IconChip POP is the ONE deliberate color/glyph event (the W-SUFFUSE idiom); the giant faint second glyph was the superfluous duplicate the purge removes. The POP stays — C4 fences over-purge.
- **The one-GL-per-route budget (KEPT).** Any real mini-render is bounded + inert + no second live-GL context (the SectionPreviewCard preview-seam discipline); a live-GL target takes the blurb fallback or a frozen still — C5 fences a second live context.
- **The anti-pattern this must NOT become:** a card stripped of its IconChip POP (mistaking the legitimate POP for the watermark — C4 fences it); OR a giant glyph re-introduced under a renamed thumb class (C1's large-AND-faint signature catches it regardless of class name); OR the blurb fallback deleted leaving an empty preview box (C3 fences it).

## Disposition links

- **Closes the user's 2026-06-22 placeholder-icon screenshot defect** (the Foundations section-landing watermark, + the byte-identical hero/intro consumers) → ADDRESSED, paint-verified both modes.
- **SUBSUMES the SEED-DRAFT / ORCHESTRATOR-NOTES `W-DEMO-ICON-PURGE [NEW]` member** — "audit the storybook chassis + REMOVE the superfluous giant greyed-out placeholder icons (the empty-preview-box watermark) — the preview falls back to the blurb / a real mini-render, never a giant faint icon" IS this wave.
- **CONSUMES the shipped `<SectionPreviewCard>` blurb-fallback + preview seam** (`SectionPreviewCard.vue:90-99`) — the correct empty-state home; the purge removes the consumers that defeated it, not the seam.
- **Related to BC.W-HERO-AUDACIOUS Part C/E** — that step booked "populate the per-category preview content"; it never landed a real mini-render and fell back to the giant glyph. This wave DECIDES it: the blurb fallback is the default; a real bounded mini-render is the cheap-specimen opt-in; the giant faint placeholder is RETIRED (clean break — the booked-but-never-landed preview content discharged to the correct empty state).
- **Folds into the demo-breadth band (Band 9 W-DEMO-BREADTH)** — the section-landing / hero / intro cards are part of the demo-breadth gestalt; the purge is a prerequisite for those rows to read clean.
