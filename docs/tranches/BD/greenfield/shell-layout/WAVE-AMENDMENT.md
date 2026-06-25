# shell-layout · WAVE-AMENDMENT — the concrete tranche reconciliation

> Reconciled against the extant ~116-wave set in `docs/tranches/BD/union/waves/`. Each touched
> wave cited by filename. Reference implementation for every move: this directory's `GOLDEN.md`
> (as CORRECTED in `DELTA-ASSAY.md` — the 6 corrections are binding). NO duplicative work: the
> warm-fence + skeleton are the genuinely-NEW artefacts; the switch + edge + bento are AUGMENTs
> onto already-booked waves; the bento-specimen is EXCISED from this item (owned by
> `category-landing`).

---

## A. NEW wave — `BD.W-SECTION-HUE-WARM-FENCE`

**Band 16 (demo-chassis) · depends: `cssToOklch` (shipped, `proof:single-color-core`) · reads
`BC.W-TEAL-NAVY-PURGE` (`proof:teal-navy-purge`, the new T6 clause) · cross-link
`BD.W-NO-HARDCODED-REF` (the section-color identity discipline) · reference: `GOLDEN.md` §2 AS
CORRECTED (DELTA-ASSAY §1, corrections 1–6).**

**The ask:** make a cool-dominant category landing structurally impossible. The 4 cool categories
(substrates sc3 teal, forms sc2 indigo, containers sc9 slate, navigation sc11 ocean) + the
green-cyan compositions (sc4 forest 171.1) paint cool in BOTH modes — the headline gestalt
violation (live-confirmed: `--section-color-3 = light-dark(oklch(.542 .089 222.8), oklch(.767 .091
219.9))`; `aurora-hero.ts:67` carries the teal literal too).

**The mechanism (the CORRECTED two legs):**

- **Leg (a) — additive warm rows + re-index (NOT angle re-point, NOT slot-reuse).** Mint 4 (or 5,
  incl. compositions) DELIBERATE warm rows on the ONE `--section-color-N` ramp across ALL THREE CSS
  arms — `src/styles/tokens/color-radius.css:253–262` (light) + `dark-arm.css:107–116` (dark) +
  `light-dark.css:131–140` (combined) — AND the JS mirror `SECTION_COLOR_OKLCH` in
  `demo/stories/aurora-hero.ts:63` (the 4-store reality, DELTA-ASSAY correction-4). Re-point the
  cool indices in `category-hero.ts` + `CATEGORY_PALETTE_HUES` to the warm rows. Targets tuned
  against the √φ-spaced warm spectrum so all 11 stay ≥~10° distinct, ALL in the rose→amber→violet
  arc, BOTH arms. Clean break — the index slot keeps its number, the COLOR at it becomes warm; no
  alias, no second hue table.
- **Leg (b) — the structural `warmHeroHue()` clamp** in `aurora-hero.ts::sectionColorToHeroPalette`
  (`:94`), composing the ALREADY-read `cssToOklch` — `COOL_LO≈165` (catches the 150–180 green-cyan,
  correction-3), identity on already-warm hues. Adopt the warm-cream-dominant stop order.
- **Purge the stray** `demo/stories/.../overlays-scrims.vue:114`
  `linear-gradient(135deg, var(--section-color-3), var(--section-color-10))` → a warm slot.

**The gate — `proof:teal-navy-purge` NEW clause T6 (born-RED) + `--selftest`:** enumerate every
`CATEGORY_HERO.sectionHue` → resolve its painted hue from BOTH the CSS `--section-color-N` row AND
the `SECTION_COLOR_OKLCH` mirror, post-fence; assert each lands in the warm arc (predicate tightened
to the ACTUAL arc, NOT just `!(h∈[180,270])` — so forest-171 reds, correction-3), both modes.
**Born-RED on today's 222.8/265.5/239.6/208.0/171.1.** A `--selftest` bite feeds a synthetic cool
hue through `warmHeroHue` and asserts the fold (this is what KEEPS leg-(b) from being dead code,
correction-6). Named **T6** — T5 is the existing live-paint arm, correction-6. The binding live arm
is an out-of-page `screenshot→getImageData` (per the §296 FLAG's "stop-string averager is a LIAR"
finding), both modes, on `/substrates` + `/navigation` FCP.

---

## B. NEW wave — `BD.W-SHELL-ROUTE-BLOOM`

**Band 16 (demo-chassis) · depends: shipped `Skeleton.vue`
(`src/components/ui/skeleton/Skeleton.vue`) + `.glass-reveal` (`src/styles/glass/reveal.css`) +
`useBloomUp` (shipped FLIP runner) · sibling `W-NAV-DOCK-FIX` (the FOUC `<Card>` guard — UNTOUCHED)
· reference: `GOLDEN.md` §4 AS CORRECTED (DELTA-ASSAY §2).**

**The ask:** kill the route-pending blank-`<main>` void (no `<StorySkeleton>`, `skel:0` live). iOS-27
never shows empty chrome — a glass placeholder blooms into content.

**The mechanism (V-b ONLY — compose, don't fork):**

- A 3rd `<Transition>` branch in `AppShell.vue` (`:284–311`), keyed
  `v-else-if="route.matched.length > 0"` (matched-but-pending), `aria-busy="true"` — the "Pick a
  story" `<Card>` (`:298 route.matched.length === 0`) is BYTE-UNTOUCHED (defect-7 holds).
- `<SectionLandingSkeleton>` — a demo-local LAYOUT (eyebrow bar + √φ title block + bento shimmer
  grid) that COMPOSES the shipped `Skeleton` primitive (challenge-2 R3, the DRY fix — NOT a 2nd
  skeleton engine).
- The skeleton→content swap rides `useBloomUp` (`preset:"snappy"`) — squish-grow out of the rect.
- **V-a (pre-shell-mount) is OUT of scope** (a build/`index.html` static-stub concern, DELTA-ASSAY
  §2) — FLAGGED in the wave, NOT promised.

**The gate — `proof:shell-route-bloom` (NEW, born-RED) — the INVARIANT, not timestamps:** assert
"∃ ≥1 painted frame where `<main>` is present, the route chunk is still pending, and the skeleton
occupies the rect; AND no frame has `<main>` present-and-empty (textLen<50, no skeleton) between
chrome-paint and content." Drop the literal `t=18→128` (challenge-1 R5 — non-reproducible; my probe
read `skel:0` across all frames). Run against `vite build` output (prod chunking) for V-b. A 2nd arm
asserts the bloom rides a scale-track (not a hard swap). Born-RED if either FOUC guard is removed.
Cross-engine: NO `backdrop-filter:url` on this path; bloom→opacity-only under PRM.

---

## C. AUGMENT — `W-NAV-DOCK-FIX.md` (the shell-wiring wave)

**Add F8 + F9 to the BUILD-SPEC ledger** (the contextual-switch liquid, the GOLDEN §5c resolution —
wire the EXISTING capsule seam, do NOT import the tabs composable, DELTA-ASSAY §3):

| # | File | Change | GOLDEN move |
|---|---|---|---|
| F8 | `demo/layout/SidebarDock.vue` + `BottomDock.vue` (the `<DockSection>` facet render) | the facet chip's selected accent reads the SHARED `.glass-tab-capsule` recipe (post-fence WARM `--section-color-N`); the active-chip travel rides the `useTabIndicator` `--stretch` + `--tab-blob` envelope `BD.W-TABS-LIQUID` ships. NO `<DockFacetRail>`, NO tabs-composable import. | M3-c (switch made liquid) |
| F9 | `demo/layout/AppShell.vue` (or the dock category-change site) | the category-change facet-set swap wraps `startViewTransition` (already imported `:29`) keyed on `categoryId`; `@supports (view-transition-name: x)` → Chrome VT crossfade, Safari `.fade-slide` fallback. | M3-c (category change) |

The §9 "AUGMENT of the BOOKED `W-DOCK-TAB-INDICATOR`" is **CORRECTED**: that wave is unbooked
(challenge-3 R4). The seam is instead the already-booked `BD.W-TABS-LIQUID` + `BD.W-TAB-IOS-CAPSULE`
dock-tab consumer. The π extends `tests-visual/nav-dock-fix.spec.ts` (G2): a frame-series on a facet
switch asserts the chip TRANSLATE-tracks (glide present, not instant swap) + the `--tab-blob`
overshoot + a one-shot warm accent-flood that trails then clears, BOTH engines (chromium + webkit).
Born-RED on today's silent plate-swap (`grep useTabIndicator demo/layout/` = 0).

---

## D. AUGMENT — `BD.W-TAB-IOS-CAPSULE.md` (the dock-tab consumer covers the facet chip)

**Add a clause to `proof:tab-ios-capsule` C2** (the ≥2-consumers assertion): the dock `<DockSection>`
facet chip is a THIRD real `src/`/`demo/` consumer of `.glass-tab-capsule` (alongside
`.segmented-indicator` and `DockTabButton`). This makes the GOLDEN §5c "wire, don't fork" mechanically
true — the facet switch reads the SAME capsule, never a parallel selected-fill. No new component.

---

## E. AUGMENT — `BD.W-PAGE-BACKGROUND.md` (the defined-edge hero field, GOLDEN §3/M1)

**Add a hero-field-rim arm:** the `StoryHero` contained-live-field path (`StoryHero.vue:202–207`,
the `liveBackdrop`/`fullBleed`/`cardTier` seam this wave already owns) gives the hero field a
**concentric-radius card edge** (the BD concentric token) so it is a BOUNDED, rimmed surface — the
dock plates read as glass OVER a defined colorful card (the iOS-27 signature). Today the hero wash is
full-bleed with no rim (challenge-3 R7, live-confirmed). **A born-RED edge π:** assert a non-zero
border-radius + a rim inset > 0 on the hero field rect (extends `tests-visual/page-background.spec.ts`).
This gives M1 a concrete OWNER + gate, not a bare cross-link (challenge-3 R7).

---

## F. EXCISED from this item (no-dup) — the bento specimen → `category-landing`

`GOLDEN.md` §5b / §9's `W-BENTO-SPECIMEN` (the dead-gray-thumb → warm-glass + live `previewKind`
specimen) is **NOT authored here.** A separate `category-landing` ledger item (HARDENING-PLAN §6 :102,
USER 2026-06-24, screenshot-grounded) ALREADY OWNS it verbatim: *"the bento cards are USELESS large
GRAY placeholders … ABROGATE the gray … BAKE IN a real LIVE DEMO per `previewKind`."* The seam EXISTS
(`SectionPreviewCard.vue:91 $slots.preview` + the `previewKind` field). Authoring `W-BENTO-SPECIMEN`
in shell-layout would DUPLICATE that item. The shell-layout assay records the dependency and a
cross-link only; the no-gray + live-specimen π (warm-cream floor on the thumb, challenge-3 R8) travels
with `category-landing`. **This is the deliberate de-dup the prompt mandates.**

---

## G. NO-OP / KEEP (confirmed fit — no wave)

- The `AppShell.vue` composition + the morph stage + the eggs — KEEP byte-for-byte.
- `SidebarDock` / `BottomDock` clean rails — KEEP (the `W-NAV-DOCK-FIX` census + 3-lens confirm).
- The FOUC `<Card>` guard + `router.ts beforeResolve` — KEEP (defect-7 holds; never re-fixed).
- The IA chassis (`CATEGORY_HERO` → `SectionLanding` → `StoryHero` → `SectionPreviewCard` bento) —
  KEEP the chassis; the gaps are downstream (hue=A, bento=category-landing).
- The contextual resolver surface (`railItems`/`railContext` → `<DockSection>`) — KEEP (surface
  exists; only the switch MOTION is augmented in C).
- The dock ENGINE (morph/fission/envelop/deep-transmit/goo baton) — NO-OP here (owned by dock-core /
  dock-hub waves; the shell DEPENDS/RIDES only).

---

## H. Reconciliation summary (vs the ~116-wave set)

| Disposition | Wave(s) |
|---|---|
| **NEW** | `BD.W-SECTION-HUE-WARM-FENCE` (A), `BD.W-SHELL-ROUTE-BLOOM` (B) |
| **AUGMENT** | `W-NAV-DOCK-FIX` (+F8/F9, C), `BD.W-TAB-IOS-CAPSULE` (+facet-chip consumer, D), `BD.W-PAGE-BACKGROUND` (+hero-rim, E) |
| **DEPEND / RIDE (no edit)** | `BD.W-TABS-LIQUID`, `BC.W-TEAL-NAVY-PURGE`, the shipped `Skeleton.vue`/`useBloomUp`/`.glass-reveal`/`startViewTransition`/`cssToOklch` |
| **EXCISE from this item (de-dup)** | `W-BENTO-SPECIMEN` → re-homed to the `category-landing` ledger item |
| **PRUNE** | none — the GOLDEN's `W-DOCK-TAB-INDICATOR` was never booked (a phantom); replaced by the real `BD.W-TABS-LIQUID`/`BD.W-TAB-IOS-CAPSULE` seam, not pruned from disk |

No-dup audit (grep-verified): no `W-SECTION-HUE-WARM-FENCE`, no `W-SHELL-ROUTE-BLOOM`, no `warmHeroHue`,
no `SectionLandingSkeleton`, no `*TAB-INDICATOR*` wave exist on disk. The 2 NEW artefacts are genuinely
missing; everything else is an AUGMENT onto a booked wave or a DEPEND on a shipped primitive.
