# W-DEMO-DESIGN — the DELTA (the binding π readback + the per-pane before/after)

**Freshness header**
- Capture date: 2026-06-17
- HEAD sha: `12326f99` (BB Batch L round 3 — deep-glass · liquid-reveal · hierarchy2)
- Dev box: darwin 25.4.0, Node v26.0.0
- Chromium: Playwright 1.60.0 (chromium-headless-new), demo origin `http://localhost:5199`
- Both modes (light + dark) captured per pane; `proof:demo-design` 7/7 GREEN; `tests-visual/demo-design.spec.ts` 10/10 pass.

The frontend-design digest headline: the LIBRARY atoms are SOTA, but the DEMO PRESENTATION was under-designed — the design-language CORE panes (typography ladder, colors-core, icons-grid, the radii/shadows/surface-tint token tours) read as FLAT SPEC-SHEETS over flat opaque `bg-card` plates, no focal point, no atmosphere, ZERO motion. This wave is the COMPOSER: it redesigns the flat panes, stages the glass atoms over a live field, promotes the buried vibrant assets to focal placement, and wires the sibling-wave MOTION primitives onto the demo surfaces. ZERO `src/` paint (`git diff src/` empty — demo-private).

## The binding readback (`W-DEMO-DESIGN-readback.json`)

| π | surface | measure | result |
|---|---|---|---|
| P1 | typography | focal display specimen font-size | **284.8px** (text-display-audacious) — the editorial focal type-event (>> 32.9px text-title); the flat 18-row label/sample table GONE |
| P2 | colors | rainbow Y vs core-grid Y | rainbow **353px** ABOVE core grid **760px** — promoted to focal |
| P3 | icons | Pops Y vs ref-grid Y + reveal hook | Pops **395px** ABOVE ref grid **537px**, `hasReveal=true` — leads + pops in on the IconChip `:reveal` spring entrance |
| P4 | buttons | CTA Y/width vs destructive | CTA **381px / 196.6px-wide** out-presents destructive **1105px / 113.2px-wide** — focal placement AND scale |
| P5 | notification | `.feedback-tone` row bg α | **α 0.836 (light) / 0.9016 (dark)** — translucent colored glass, NOT a 10px solid dot |

## Per-pane before → after

| pane | HEAD (flat spec-sheet) | after (designed specimen) | capture |
|---|---|---|---|
| typography | 18-row `grid-cols-[10rem_1fr]` label/sample table; ladder tops at display-5; mega/hero/audacious NEVER SHOWN | a focal `text-display-audacious` "Aa" word leads; the mega/hero/audacious peaks ACTIVATED as field-staged specimens; the graded ladder a designed rhythm over the `quiet`-tier calm wash; the ℱ glyph on `<ShowcaseFrame tier="field">` | `W-DEMO-DESIGN-typography-{light,dark}.png` |
| colors | flat 12-box `bg-card` core grid FIRST; the vibrant 13-stop rainbow buried below, all static | rainbow PROMOTED to the focal lead (larger, `h-24` stops) popping in on the `.scroll-cascade--columns` register; viz tiles pop in on `.scroll-cascade`; the core role grid → calm `quiet` wash + glass-tier hover, monochrome held | `W-DEMO-DESIGN-colors-{light,dark}.png` |
| icons | flat 21-card monochrome grid FIRST; the user-cited Pops row buried below, static `<IconChip>` | the Pops row PROMOTED to LEAD over a `tier="field"` host, each chip blooms in on the IconChip `:reveal`+`:saturated`+`:bloom` spring entrance; the reference grid → `quiet` wash + glass-tier hover, glyphs stay ink | `W-DEMO-DESIGN-icons-{light,dark}.png` |
| buttons | every glass variant on the flat `StoryPage` card (nothing to refract); `destructive` red out-presents the `primary-audacious` "Launch sequence" CTA | the `primary-audacious` + `gold-audacious` CTAs lead in a focal `tier="field"` hero row at `size="lg"`; the glass + `.glass-btn` rows staged over `tier="field"` (BG-2 fix); the opaque-atom rows (incl. destructive) on the opaque host BELOW; press-squish rides the library register | `W-DEMO-DESIGN-buttons-{light,dark}.png` |
| notification | the tones table = 10px `size-2.5 rounded-full bg-(--tone)` solid DOTS on an opaque host (the worst pane) | real mini colored-glass `.feedback-tone` rows (the shared tinted-glass recipe — a tone-tinted translucent wash + tone-keyed rim + full-chroma glyph) over a `tier="field"` host, popping in on `.scroll-cascade` | `W-DEMO-DESIGN-notification-{light,dark}.png` |
| fourier-studio | the masthead had eyebrow + title but NO blurb; the StorySection below re-stated the full studio description (the duplicated blurb sandwich) | the ONE description blurb moved UNDER the masthead title (eyebrow → display-title → ONE blurb, W-HIERARCHY2 reading-order); the StorySection carries a SHORT label only — the sandwich killed | (whole-page, on the gestalt roster) |
| reveal | a hand-rolled top-level `text-prose` bypass of `<StorySection>` | routed through `<StorySection heading>`; promoted to the W-LIQUID-REVEAL FLAGSHIP — a bloom-from-source overlay composing the shipped `useLiquidReveal` leaf; the `v-reveal` stagger demo retained (its scoped CSS is the documented consumer-CSS the directive drives, NOT a fork) | (whole-page, on the gestalt roster) |
| radii / shadows / surface-tints | flat token tours over `bg-card`, no atmosphere, no motion | the calm wash read-through (StorySection over the StoryHero `wash` drop) + the PRM-safe `.scroll-cascade` rung stagger (ONE chassis lever, no GL); the shadows-on-stage + tints-on-checker perception-corrections PRESERVED | (whole-page, on the gestalt roster) |
| accordion | (already designed header) | the disclosure body pops in on `.scroll-cascade`; the content-height open/close rides reka-ui's collapsible keyframes (on W-MOTION-CANON's NAMED CLS-bounded allowlist — a sanctioned discrete reflow, NOT killed; the demo HOSTS the correct register) | (whole-page, on the gestalt roster) |

## Motion wiring (CONSUMED, never forked — D4 anti-fork held)

- **Pop-entrance** on the focal pops: the IconChip `:reveal` spring-clock bloom-in (scale 0.85→1, the snappy ~+7% overshoot, PRM-gated by `vReveal`) — the W-SUFFUSE3 primitive. The Pops chips also carry `:saturated` (the louder-chroma axis) + `:bloom` (the smooth-glass hover).
- **Section-cascade** on the body panes: the `.scroll-cascade` register (the spring-clocked coupled view()-timeline build) — the W-SCROLL-MOTION primitive. StoryPage already wraps the body slot in `.scroll-cascade`; the redesigned token-tour grids declare their own `.scroll-cascade` host so each cell builds in.
- **Press-squish** on the interactive demo chrome: the library `<Button>` (`tap-squish` + `useSpringPress`) and `.glass-btn` (`:active` scale + the W-LENSING lens-swell) press registers — composed, never re-implemented.

## §0 RE-GROUND drift recorded

1. The four CORE panes confirmed as recorded at HEAD (born-RED: D1 type-specimen / D2 designed-tours / D3 glass-staged / D5 no-dots all FALSE at `git show HEAD:`).
2. **Drift — `.scroll-cascade` register location**: the spec names it from W-SCROLL-MOTION; it landed in `src/styles/scroll-choreography.css` (not scroll-driven.css). StoryPage already wraps the body in `.scroll-cascade` — body panes inherit it. Consumed the REAL register, no fork.
3. **Drift — the IconChip pop-entrance axis name**: the spec names `:saturated` as the pop axis; the actual pop-ENTRANCE is the `:reveal` axis (vReveal-driven, spring-clocked). `:saturated` is the louder-chroma axis; `:bloom` the hover. Consumed all three on the Pops row.
4. **Drift — accordion height-animation**: the spec says W-MOTION-CANON KILLs it; the actual W-MOTION-CANON decision put it on the NAMED CLS-bounded ALLOWLIST (a sanctioned discrete user-initiated reflow, NOT a per-scroll-frame storm). The accordion demo HOSTS the correct register; no re-cut needed.

## House fences held

- `git diff src/` is EMPTY (demo-private — zero library paint).
- The one-GL-per-route budget held: NO `<Aurora>`/`<Constellation>`/`<FourierField>`/`<GooBlob>` added to a foundations/display static-wash route. The glass-button staging uses `<ShowcaseFrame tier="field">` (the static-wash read-through pattern), no added GL context.
- `proof:suffuse` d1–d3 GREEN after the redesign (the one-color-event proportion held — the type pane's ONE event is the type itself; the ladder/grids stay ink).
- The library `--section-color`/display tokens are read, never minted as demo color; warm-cream identity intact; ppmycota purple stays demo-local on the motion surfaces only.

## Sibling-wave coordination drift (RECORDED, out of bounds — NOT this wave's fix)

`proof:suffuse2` is RED at HEAD (pre-existing, NOT caused by this wave's edits):
- `w2-content-h1-one-rung-above-section` — W-HIERARCHY2 refactored `StoryPage.vue`'s `<h1>` from `v-if="title && variant === 'page'"` to `v-if="title"` (the variant gate moved to the `<header>` level). The suffuse2 detector regex still expects the old combined `v-if`. StoryPage is a chassis primitive OUTSIDE this wave's bounds.
- `w3-motion-band-reads-accent` — W-SCROLL-MOTION added `demo/stories/motion/scroll-choreography.vue` with ZERO `--motion-accent` reference (un-enrolled in the suffuse2 motion-band LEDGER). Outside this wave's bounds.

Both files are untouched by this wave (`git diff --stat HEAD -- demo/stories/StoryPage.vue demo/stories/motion/scroll-choreography.vue` is empty). The fix belongs to the suffuse2 owner / the W-HIERARCHY2 + W-SCROLL-MOTION band-close reconciliation.

## proof:ba-gestalt per-pane verdicts

The redesigned demo panes JOIN the `proof:ba-gestalt` roster; the binding whole-page gestalt verdicts (both modes, judged as designed specimens) ride **W-REFLECT3** (the band close — the gestalt OR is the `complete` vs `complete_with_misses` decision). The per-mechanism D1–D6 greens + the P1–P5 readbacks above are the SOURCE + RENDER floor; the gestalt verdict is the close.
