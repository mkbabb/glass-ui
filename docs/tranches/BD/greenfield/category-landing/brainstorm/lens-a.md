# category-landing · LENS-A (PURE iOS-27 FIDELITY) — the bento card as a LIVE GLASS SLIDE over the warm field

> The `/:category` LANDING — `SectionLanding.vue` (the D1 section hero + the bento grid) +
> `SectionPreviewCard.vue` (the bento cards) — redesigned from FIRST PRINCIPLES through the
> iOS-27 Liquid-Glass lens. The mandate (USER 2026-06-24, screenshot-grounded `/substrates`):
> ABROGATE THE GRAY, BAKE IN A LIVE DEMO per `previewKind`, make the cards USEFUL +
> PROPORTIONED, on EVERY category landing, NEVER teal, both modes.
>
> **A UNION, never a fork.** It RE-POINTS the shipped `SectionPreviewCard` `#preview` seam
> (`SectionPreviewCard.vue:91`), the `previewKind` field (`category-hero.ts:48`), the shared
> WARM-glass register (`<Card tier>` + the §3 `.paper-field`), the manifest's per-story
> `component` lazy-loader, and the one-GL budget. No new card system. No second field engine.
> KISS, DRY, NO LEGACY.

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173`, both modes, chrome-devtools-mcp)

Navigated `/substrates` + `/forms`, screenshot + `getComputedStyle` on the real painted card.

| read | live measurement | verdict |
|---|---|---|
| **the preview thumb is GRAY** | `.section-preview-card-preview` background = `color(srgb 0 0 0 / 0.03)` (`SectionPreviewCard.vue:140`) + border `srgb 0 0 0 / 0.06` | **RED** — near-zero-chroma black-wash gray, exactly the "far too GRAY" complaint. Born-RED is HONEST. |
| **the preview is DEAD** | every card renders the SAME lone `sectionIcon` glyph at 55% ink, centered in a 7rem box (`SectionLanding.vue:75` `#preview` → `.section-preview-thumb`) — `/substrates/Aurora` shows a Droplet, NOT the live aurora | **RED** — "a live mini-preview, not a text link" unmet; the glyph is a placeholder, identical on all 11 cards |
| **the cards are USELESS + LARGE** | `/forms` cards are ~half-viewport-wide gray slabs holding one tiny generic glyph + a blurb; the "lead" card spans 2 cols and is even emptier | **RED** — "USELESS large cards" verbatim |
| **TEAL** | `--section-color-3` = `light-dark(oklch(0.542 0.089 222.8), oklch(0.767 0.091 219.9))` — h≈220-222 (teal/ocean), BOTH modes; the IconChip + eyebrow tint cool | **RED** — the cool sectionHue, owned by the shell-layout fence (DEPEND, §6) |
| **`--field-h`** | UNSET on `/substrates` landing; the hero field is the GL aurora but the bento sits over flat page, no warm field behind the cards | **RED** — no §3 field behind the bento (the cards have nothing to bend) |
| **the card SHELL is warm-ish** | `.section-preview-card` bg = `oklab(0.763 0.005 0.011 / 0.72)` — a faint-warm glass plate (the `.glass-resting` register) | **AMBER** — the CARD plate is acceptably warm glass; the PREVIEW WINDOW inside it is the gray. The disease is localized to the thumb + the dead glyph. |

**The gestalt:** the card chassis (`IconChip` POP + √φ title + Fira-Code subpath chip + the
hover-lift) is FIT and ships TODAY — it is the *preview window* that is born dead: a gray box
with a placeholder glyph, repeated 11×. The hero field above is alive (GL aurora); the bento
below is a spec-sheet of gray panels. **The job: make the preview window a LIVE GLASS SLIDE of
the actual component, on the warm field, useful + proportioned — never gray, never teal.**

---

## 1 — THE GOLDEN IDEA: the bento preview is a LIVE GLASS SLIDE — a real bounded mini-render of the target component, floating on the warm §3 field, with the ONE-GL budget honored as a FROZEN FIRST-PAINT for GL targets

The current preview is a *symbol of* the target (a glyph). iOS-27 never symbolizes when it can
SHOW — a Settings row shows the real toggle, a widget shows the live content. So the redesign
makes the preview window literally **mount the target story's marquee specimen, bounded and
inert**, over the warm field — a true "live slide" the way an iOS widget is a live slide of its
app. Four moves, each a UNION onto a shipped seam:

### M1 — ABROGATE THE GRAY: the preview window is the warm §3 FIELD behind glass, with a defined edge (never the black-wash)

The `.section-preview-card-preview` thumb stops being `color(srgb 0 0 0 / 0.03)`. It becomes a
**bounded §3 colorful field** — the SAME `.paper-field` warm-cel the page-background GOLDEN mints
(amber key-mass + terracotta mid + sand bounce), driven by the per-route warm `--field-h`, with a
**defined glass edge** (the §3 "a colorful field behind glass + a defined edge"). The live specimen
renders OVER this field, transmitting it. There is no gray anywhere: the card plate is warm glass
(KEEP, it already is), the preview window is the warm field, the specimen is a real glass control.

```css
/* SectionPreviewCard.vue scoped — the preview WINDOW: a bounded warm §3 field + a defined edge.
   NEVER the black-wash gray. The card-local --field-h is the WARMED per-category hue (M6). */
.section-preview-card-preview {
  --field-h: var(--card-field-h, 62);     /* the warmed category hue, NEVER teal (DEPEND §6) */
  position: relative;
  overflow: clip;
  border-radius: var(--radius-md);
  aspect-ratio: var(--phi);                /* φ proportion, NOT a fixed 7rem (M5) */
  /* the bounded warm-cel field (the SAME stop-script as .paper-field, scaled to the window) */
  background:
    radial-gradient(120% 100% at 18% 0%, oklch(0.90 0.075 calc(var(--field-h) + 8) / .55), transparent 60%),
    radial-gradient(120% 120% at 100% 100%, oklch(0.86 0.085 calc(var(--field-h) - 6) / .42), transparent 65%),
    oklch(0.93 0.045 var(--field-h));      /* the low-chroma warm base wash — the floor */
  /* the defined edge — the §3 transmissive rim, NOT a flat gray hairline */
  box-shadow: inset 0 0 0 1px oklch(1 0 0 / .35), inset 0 1px 2px oklch(1 0 0 / .25);
}
.dark .section-preview-card-preview {
  background:
    radial-gradient(120% 100% at 18% 0%, oklch(0.46 0.075 calc(var(--field-h) + 8) / .55), transparent 60%),
    radial-gradient(120% 120% at 100% 100%, oklch(0.40 0.085 calc(var(--field-h) - 6) / .42), transparent 65%),
    oklch(0.30 0.040 var(--field-h));      /* warm-luminous dark floor, NOT charcoal */
  box-shadow: inset 0 0 0 1px oklch(1 0 0 / .12), inset 0 1px 2px oklch(0 0 0 / .25);
}
```

Light-dark via PLAIN per-mode arms (the `light-dark()` inset-shadow trap — MEMORY). The
`color-mix(... var(--foreground) 3%...)` line is DELETED (clean break, no alias).

### M2 — BAKE IN A LIVE DEMO: the `#preview` slot mounts the target's REAL marquee specimen per `previewKind`

The five `previewKind` registers each get a **real bounded mini-render** — a thin per-kind
"specimen" component that composes a SHIPPED glass-ui primitive at thumbnail scale. This is the
heart of the mandate: every bento card shows the actual thing.

| `previewKind` | the LIVE specimen (the real primitive, bounded + inert) | one-GL? |
|---|---|---|
| `field` (substrates, motion) | a **single FROZEN first-paint** of the category viz (`<Aurora>` / constellation / fourier) — `frozen` prop renders ONE frame, no RAF, no second live context. The droplet is GONE; you see the actual painterly aurora. | **YES → frozen still** |
| `control` (forms, navigation) | a REAL interactive-looking control row — `<Button>` + `<Slider>` at a set value + `<Switch>` checked — rendered live but `inert` (paints the real glass control, no JS handlers fire). | no — pure CSS/DOM glass |
| `surface` (display, containers, dock, feedback, compositions) | a REAL `<Card tier="quiet">` mini glass surface with a hairline + a title rung + a chip — the actual glass register at thumbnail scale, transmitting the field. | no |
| `metric` (data) | a REAL metric badge — a `<Card>` with a √φ stat number + a sparkline glyph + a delta chip (the ledger idiom). | no |
| `glyph` (foundations only) | the LAST-RESORT floor — the category icon over the warm field (foundations is the abstract root; it has no single specimen). | no |

The specimen is chosen by `previewKind`, but the BEST move (M3) makes it per-STORY, not
per-category, so `/substrates/Aurora` shows aurora and `/substrates/GooBlob` shows the goo blob.

### M3 — the specimen is the STORY's OWN marquee, lazy-resolved from the manifest (per-card, not per-category)

`SectionLanding.vue` currently renders ONE `sectionIcon` for every card (`:is="sectionIcon"`).
Greenfield: each `<SectionPreviewCard>` resolves the **target story's** representative specimen.
The manifest already lazy-loads each story's full `component` — but mounting 11 full story pages
is forbidden (cost + the one-GL budget). Instead a thin **`previewSpecimen(story)` registry**
maps each story id → a lightweight bounded specimen (the marquee primitive only, not the whole
page). Most resolve by `previewKind` to the per-kind specimen above; a story may name an explicit
specimen. So the bento becomes a true index of WHAT each card leads to:

```ts
// demo/stories/section-preview-specimen.ts (NET-NEW, demo-private) — the per-story bento
// specimen registry. KISS: a story resolves its specimen by previewKind unless it names one.
// NO full-page mount (cost + one-GL); a thin marquee primitive only.
export function previewSpecimen(story: Story, kind: PreviewKind) {
  return story.previewSpecimen ?? KIND_SPECIMEN[kind];   // explicit override XOR the kind floor
}
```

### M4 — the ONE-GL BUDGET: a GL target's specimen is a FROZEN FIRST-PAINT (inert, scale-clamped, PRM→static)

The landing must NEVER mount N live canvases (CLAUDE.md §BA.W-STAGE). For `previewKind: "field"`,
the specimen passes `frozen` (or `paused` + a `still` first-paint) so the viz renders ONE frame
and stops — a painted-pixel aurora image, not a running RAF. The whole preview window is already
`inert` + `pointer-events: none` (the seam ships this at `SectionPreviewCard.vue:93-94`). PRM →
the frozen still is the only state (no animation ever). This is how `/substrates` shows the REAL
aurora pigment without 6 GL contexts: 6 frozen first-paints, each one composited image.

### M5 — USEFUL + PROPORTIONED: the φ-proportioned card, the lead card is a SHOWCASE not a void

The cards stop being large+empty. Three proportion fixes (§L6):

- The preview window is `aspect-ratio: var(--phi)` (golden, NOT a fixed `7rem` that leaves a huge
  empty slab on the wide `lead` card). The window grows with the card width but stays φ.
- The **lead card** (`idx === 0`, `sm:col-span-2`) is the category's MARQUEE — it gets the
  largest/most-detailed specimen (e.g. `/substrates` lead = the full frozen aurora field; `/forms`
  lead = a 3-control stack). It earns its width by SHOWING more, not by being emptier.
- The card padding + the window radius are concentric (`r_inner = r_outer − gap`, §L6) so the
  preview window's corners stay parallel to the card's.

### M6 — NEVER TEAL: consume the WARMED hue from the shell-layout fence (DEPEND, do not re-fix)

The teal is owned by `BD.W-SECTION-HUE-WARM-FENCE` (shell-layout GOLDEN §2, the `warmHeroHue()`
clamp + the 4-cool-row re-index in `category-hero.ts`). This item **CONSUMES** the warmed
`sectionHue` (the IconChip + eyebrow + the card-local `--field-h`) — it does NOT re-roll the hue.
`--card-field-h` is derived from `categoryHue(id)` via the SAME `warmFieldHue()` adapter the
page-background GOLDEN mints (`--field-h ∈ [25,95]`, a cool field unrepresentable by clamp). So the
preview window's warm field is teal-IMPOSSIBLE by construction — the gate clause T5 covers it.

---

## 2 — THE MOTION (cartoon flow & punch + liquid weight, §L4)

The bento is the most ALIVE moment after the hero. The motion is a UNION onto the shipped
`scroll-cascade` entrance + the `.section-preview-card` hover-lift.

- **The cel-slam cascade (entrance).** The bento already rides `.scroll-cascade`
  (`SectionLanding.vue:54`). Each card SLAMS in on `--ease-cartoon-punch` (anticipation squash →
  arc → follow-through stretch-overshoot → settle), stagger-offset so card N+1 begins before card
  N settles (overlapping action, §L4). The card's `--shadow-cartoon` cast lags +8% so the weight
  visibly catches up (the story-page-standard cel-slam, REUSED — not re-authored).
- **The hover-lift, MORE liquid.** The shipped `:hover { translate(-1px,-1px) }` is too tight.
  Greenfield: on hover the card lifts on `--spring-smooth` with a real squish (`scale: 1.018` +
  the cartoon cast travels OPPOSITE the lift, §L4 moving-cast), and the **specimen inside parallaxes
  +2px** (overlapping action — the contents lag the frame). Liquid weight, never springy.
- **The frozen field "breathes" on hover (field kind only).** A GL frozen still can't animate, but
  the bounded warm field behind it can do a sub-perceptual `--field-h` drift on hover (a 6° warm
  hue-walk over 1.2s) — the card feels alive without a second live context. PRM → static.

---

## 3 — THE CROSS-ENGINE FLOOR (§L7) + the a11y/PRM carve

- **Glass + field** — pure `radial-gradient` + `box-shadow` inset rim, oklch with `in oklab`
  interpolation pinned (Safari defaults oklab; we state it). No `backdrop-filter: url()`. Chrome +
  Safari identical. The frozen GL still is a `<canvas>` first-paint (or a static `<img>` snapshot
  fallback if WebGL is unavailable) — composited, no per-frame cost.
- **Goo/meatball** — N/A here (no blob merge in the bento); the goo lives in the dock.
- **PRM** — the cel-slam → one static frame; the hover squish/parallax/field-drift → none; the
  frozen still is ALREADY static (it never animated). Proportion (§L6) has no PRM bracket.
- **reduced-transparency** — the warm field floors to a solid warm tint (still NOT gray); the
  defined edge survives as a legibility anchor.
- **a11y** — the preview is `inert` + `aria-hidden` (KEEP, ships at `:93-94`); the card is ONE
  `RouterLink` with the title as its accessible name; the specimen never steals focus or tab order.

---

## 4 — THE MECHANISM (files — the UNION, no fork)

| file | change | kind |
|---|---|---|
| `SectionPreviewCard.vue` | DELETE the gray `color(srgb 0 0 0 / .03)` thumb; the preview window = bounded warm §3 field + defined edge (M1); `aspect-ratio: var(--phi)` (M5); concentric radius; the more-liquid hover (M2 motion) | REFINE |
| `SectionLanding.vue` | replace the single `sectionIcon` `#preview` with `previewSpecimen(story, kind)` per card (M3); pass `--card-field-h` (warmed hue, M6); the lead card gets the marquee specimen (M5) | REFINE |
| `section-preview-specimen.ts` | NET-NEW (demo-private) — the per-story specimen registry + the 5 `KIND_SPECIMEN` thin specimens (frozen-field / control-row / glass-surface / metric-badge / glyph-floor) (M2/M3) | NEW |
| `manifest.ts` `Story` | OPTIONAL `previewSpecimen?` field for an explicit per-story override (M3) | REFINE (additive) |
| `category-hero.ts` | the `previewKind` field STAYS (it ships); the cool `sectionHue` rows are re-indexed by the shell-layout fence (DEPEND, not here) | NO-OP (DEPEND §6) |
| `warmFieldHue()` / `.paper-field` stops | CONSUMED for the bounded window field (page-background GOLDEN) | DEPEND |
| frozen-viz `frozen`/`paused` prop on `<Aurora>` etc. | CONSUMED for the field specimen one-GL still | DEPEND (substrate/aurora GOLDENs) |

---

## 5 — THE DELTA-ASSAY (reconcile vs the ~116-wave set + shell-layout + story-page-standard; no dup)

| disposition | wave(s) |
|---|---|
| **NEW** | `BD.W-BENTO-SPECIMEN` — the live per-story bento specimen (M2/M3) + the no-gray warm-field window (M1) + the φ proportion (M5) + the liquid hover (motion). This is the item the shell-layout WAVE-AMENDMENT §F EXCISED to here ("re-homed to the `category-landing` ledger item"). It exists NOWHERE on disk yet — genuinely NEW, not a dup. |
| **AUGMENT** | `BD.W-PAGE-BACKGROUND` (+the bounded-window field variant — the `.paper-field` stop-script scaled to a 7rem window) |
| **DEPEND / RIDE (no edit)** | `BD.W-SECTION-HUE-WARM-FENCE` (the warmed hue + `warmHeroHue`/re-index, shell-layout §6), `warmFieldHue()`, the shipped `<Aurora frozen>`/viz still-paint, `<Card tier>`, the `#preview` seam (`SectionPreviewCard.vue:91`), the `previewKind` field, the `scroll-cascade`/`--ease-cartoon-punch` cel-slam (story-page-standard), the manifest `component` lazy-loader |
| **PRUNE** | the dead `.section-preview-thumb` glyph-over-tint (`SectionLanding.vue:96`) + the gray thumb bg (`SectionPreviewCard.vue:140`) — clean break, NO LEGACY |

**No-dup audit (grep):** no `W-BENTO-SPECIMEN`, no `section-preview-specimen.ts`, no
`previewSpecimen` on disk — genuinely missing. The hue fix is the shell-layout fence's (DEPEND).
This item owns ONLY the bento card + the live specimen; the IA chassis (`CATEGORY_HERO` →
`SectionLanding` → `StoryHero` → bento) is KEPT.

**CRITICAL GATE (the binding π):** a REAL painted-pixel read of the actual landing card over the
real page, both modes: (1) the preview window paints a WARM field — `meanC ≥ 0.045` at the §3
floor, `tealFrac = 0.000`, NOT `srgb 0 0 0 / .03` gray; (2) the specimen actually PAINTS the
component (a frozen aurora image / a real glass control / a real card — sampled, not a placeholder
glyph); (3) NO teal anywhere (the IconChip + eyebrow + window field all `h ∈ [25,95]`); (4) the
card is φ-proportioned, not large+empty; (5) EVERY category landing (`/substrates`, `/forms`,
`/display`, `/containers`, …) passes — the assay loops all 11. The gray-born-RED is honest; the
live-paint is the proof.

---

## 6 — WHY THIS IS THE iOS-27 ANSWER (not a placeholder, not a fork)

iOS-27's home screen is a grid of LIVE widgets — each one shows its app's real content (the
weather widget shows the live sky, the calendar shows today), not an app icon. The category
landing is glass-ui's home screen: each bento card is a live widget of its component. The gray
box + droplet was the app-icon era; the live glass slide over the warm field is the widget era.
It is maximally FAITHFUL (show, never symbolize), maximally IDIOMATIC (it reuses the `#preview`
seam + `previewKind` + the warm field + the glass register + the one-GL budget — zero new
engine), and it abolishes the gray + the teal by construction (the warm field is hue-clamped, the
gray thumb is deleted).
