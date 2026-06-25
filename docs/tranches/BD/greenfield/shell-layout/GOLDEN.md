# shell-layout · GOLDEN — the canonical reference (synthesis of lenses A·B·C)

> The demo SHELL: `AppShell.vue` + the nav docks (`SidebarDock`/`BottomDock`) + the
> category/page/meta IA + the "Pick a story" reload FOUC + the dock contextual-switching
> wiring — resolved from FIRST PRINCIPLES through the iOS-27 Liquid-Glass lens to ONE
> coherent, deftly-integrable design.
>
> SCOPE FENCE (no dup vs dock-core / dock-hub): the **dock ENGINE** (morph, fission,
> envelop, deep-transmit, the `useTabIndicator` glide/squish, `useBloomUp`, `DockGooFilter`,
> the metaball necks) is OWNED by the dock waves and ships TODAY. This spec owns ONLY the
> **SHELL that hosts the docks**: the composition, the IA presentation, the reload
> entrance/FOUC, the warm-field identity, and the **shell-side WIRING** that makes the
> contextual switch read as iOS-27. Every mechanism here is a UNION onto shipped machinery —
> no new engine, no parallel fork, no legacy.

---

## 0. CONFIRM-CLEAN + the born-RED reads (reconciled across the three lenses)

Live-inspected on `http://localhost:5173`, both modes, real reload (chrome-devtools-mcp).
All three lenses agree on the confirm-clean set and on three of four defects. The fourth
(the contextual-switching surface) is the ONE place the lenses disagreed; this spec
resolves it from source.

**CONFIRM CLEAN (do NOT re-litigate — triple-verified):**

- **The live nav docks are clean.** `SidebarDock` (vertical warm-cream pill rail) +
  `BottomDock` (one-row `fit-content always-expanded` plate, `FadingScroll` story-tab strip
  + prev/next + category-jump + morph control). **0 broken-rail artefacts** — the
  `mode="facets"` carousel that collided was removed (BD.W-DOCK-CORE A1); both docks carry
  facets via the in-flow `<DockSection>` grouping. Dark-mode docks read WARM
  (`--card rgb(53,42,34)`, sidebar `srgb 0.35 0.30 0.25 / .56`), not gray — the BA.W-NO-GRAY
  floor holds in the chrome. **A1 RESOLVED.**

- **The reload FOUC's "Pick a story" flash is CLOSED.** `router.ts:82` `beforeResolve`
  one-shot eager-resolves the first navigation's chunk; AppShell's `<Transition>` renders
  the empty branch (not the Card) during an async-pending MATCHED route; the "Pick a story"
  `<Card>` paints ONLY for `route.matched.length === 0`. Triple-verified `pickEverShown:false`.
  **The `<Card>` flash is NOT re-fixed. Defect-7 holds.**

- **The IA chassis IS standardized.** ONE `CATEGORY_HERO` source (`category-hero.ts`) →
  `SectionLanding` → `StoryHero(variant="hero", depth="D1")` (eyebrow + √φ display title +
  Fira-Code subpath chip + blurb) → a `SectionPreviewCard` bento grid. Repeats coherently
  across all 11 categories. This is a **REFINE**, never a re-invent.

- **The contextual resolver HAS a surface.** Resolved from source (settling the lens
  A↔B/C dispute): `useContextualDockLayers(route)` → `{ categoryId, layers, activeLayerId }`;
  `SidebarDock.vue:101` consumes `layers`, derives `railItems` (facets, when
  `contextLayers.length > 1`) + a `railContext` writable-computed (user-activation
  short-circuited), and **feeds them into the in-flow `<DockSection>`** (`SidebarDock.vue:131
  → :306`). `BottomDock` does the same on its axis. So `railItems`/`railContext` are **NOT
  dead computeds** — they render through `<DockSection>`. Lens-B/C's "renders nothing" read
  was stale (pre-`<DockSection>`). **The surface EXISTS.**

**BORN-RED (the real defects, all three lenses converge):**

1. **TEAL/OCEAN/INDIGO HERO — CONFIRMED RED, both modes (the headline, the gestalt
   violation).** `category-hero.ts` mints COOL `sectionHue` for **4 of 11** categories:
   substrates=3 (`oklch 0.542 0.089 222.8` teal), navigation=11 (`0.601 0.092 208` ocean),
   forms=2 (`0.484 0.163 265.5` indigo), containers=9 (`0.492 0.038 239.6` slate); motion=12
   (`0.513 0.163 291.9` periwinkle) is borderline-warm-violet. These tint the IconChip
   backplate + eyebrow + the hero FIELD + every bento card chip + the **facet-rail accent**
   (`dock-layer-contexts.ts` `accent: var(--section-color-N)`). So 4 category landings paint
   cool-dominant in BOTH modes (dark arm keeps them cool: sc3→219.9, sc11→206.7). ROOT:
   `aurora-hero.ts::sectionColorToHeroPalette` lifts L→0.8 + caps C→0.13 but **preserves the
   cool hue `h` verbatim** — there is NO warm clamp. `proof:teal-navy-purge` T1 fences
   library viz constants only; the per-category demo hero `sectionHue` **slipped the binding**.

2. **RELOAD: a BLANK-MAIN void window (~130ms of chrome-around-a-void).** A cold reload of
   `/display/buttons` (16ms frame-probe): `<main>` has NO content for t=18→128ms (8 frames)
   while the route-level dynamic-import chunk resolves; content pops in at t≈199ms. The
   chrome (PaperBackdrop + both docks) paints, but the route region is **empty** — no
   skeleton, no placeholder, no entrance. iOS-27 never shows empty chrome: it shows a glass
   placeholder that **blooms into** content. (The "Pick a story" flash is separately CLOSED —
   §0 confirm-clean; this is a distinct defect: the void + the pop, not the wrong card.)

3. **The bento previews are DEAD glyph-over-tint stills + the contextual SWITCH is calm.**
   The `SectionPreviewCard` `.section-preview-thumb` is a lone centered glyph at 55%-ink over
   a ~7rem gray box — reads as an empty panel; the user mandate was "a live mini-preview, not
   a text link." AND: the facet rail renders, but its SWITCH is a silent `<DockSection>`
   plate-swap — **no `useTabIndicator` glide, no per-glyph scale-pop, no commit accent-flood**
   (grep: 0 `useTabIndicator` refs in the nav docks). The route page-enter is a calm
   `fade-slide` pop. The shell's two defining moments (category change + section entrance)
   carry **no liquid weight** — a LIQUID-WEIGHT-UNIVERSAL violation.

---

## 1. THE GOLDEN CORE IDEA — "the shell is one sheet of warm glass; the route blooms through it; the context flows"

The synthesis takes the strongest move from each lens and reconciles their tensions:

- **From LENS A (pure fidelity):** the **warm-glass shell composition** (one warm-cream
  field + defined edge across chrome/backdrop/content) + the **route-bloom skeleton** that
  kills the void + the **structural warm-hue FENCE** that makes teal impossible by
  construction. *(A's strongest, most correct moves.)*
- **From LENS B (cross-engine/perf):** the **one-context-engine gestalt** (the route's
  `categoryId` is the single signal every shell surface reads) + the **Safari-graceful VT/fade
  per-engine floor** + the **bento groups rhyme with the facet set** (one taxonomy, two
  scales). *(B's strongest unification + its cross-engine discipline.)*
- **From LENS C (cartoon punch):** the **liquid-weight on the contextual SWITCH** — the
  `useTabIndicator` glide+squish + per-glyph scale-pop + a one-shot warm accent-flood on the
  facet rail, and the **squish-grow page entrance** with overlapping action (dock leads,
  page follows). *(C's strongest audacity, carved to DRIVERS only — §L2.)*

**The three tensions, resolved:**

| Tension | Resolution |
|---|---|
| **C4 surface dispute** (A: surface exists via `<DockSection>`; B/C: dead) | A is correct (source-verified). The gap is the **SWITCH MOTION**, not the surface. So we do NOT build a `<DockFacetRail>` parallel component (B/C's bolt-on) — we bring `useTabIndicator` + scale-pop + accent-flood INTO the existing `<DockSection>` render. KISS, no fork. |
| **Audacity vs correctness** (C's goo "category baton" vs Safari safety) | The baton goo is a dock-ENGINE concern (owned by dock-core fission) and risks Safari `backdrop-filter:url`. The shell DEFERS the goo to the dock waves and consumes the SHIPPED `useTabIndicator` glide (compositor-only, WebKit-verified) for the shell-altitude switch. Audacious motion, zero Safari risk. |
| **Hue: re-index (A/C) vs warm-anchor-ramp (B)** | Do BOTH legs (proved in §2 spike): leg-(a) re-index the 4 cool rows to distinct warm slots (the DATA identity fix); leg-(b) `warmHeroHue()` as the STRUCTURAL fence (identity on already-warm hues, fires only on a future cool leak). B's ramp-inversion is folded as the "warm-cream dominant, hue accent tail" stop order. |

Three moves realize it, each a UNION onto shipped machinery:

- **M1 — the warm-glass shell + the warm-hue FENCE** (fixes defect 1, the headline).
- **M2 — the route-bloom skeleton** (fixes defect 2, the void).
- **M3 — the IA made alive + the contextual SWITCH made liquid** (fixes defect 3).

---

## 2. THE BOLDEST MOVE (de-risked + live-verified) — the WARM-HUE FENCE, system-wide

> **Re-base the per-category `sectionHue` onto the warm-cream identity arc AND add a hard
> `warmHeroHue()` clamp so NO category landing can EVER paint cool-dominant, in either mode,
> by construction — turning the 11-category wall from a cool-scatter into a coherent warm
> technicolor spectrum.**

This is the audacious gestalt move: it does not patch 4 categories, it makes the teal disease
**structurally impossible** and yields the 1940s-technicolor warm wall the edicts demand.

### The mechanism (two legs, both proved)

**Leg (a) — DATA re-index** (`category-hero.ts` + the `aurora-hero.ts` `CATEGORY_PALETTE_HUES`
mirror; clean break, NO alias). Re-point the 4 cool `sectionHue` indices onto distinct warm
hues, intent preserved:

| Category | was | hue was | → GOLDEN target | rationale |
|---|---|---|---|---|
| substrates | sc3 | 222.8 teal | **~20 (rose-coral)** | the "water/droplet" read survives as a warm aqua-rose |
| forms | sc2 | 265.5 indigo | **~340 (magenta-rose)** | the "input" register as warm magenta |
| containers | sc9 | 239.6 slate | **~50 (warm gold)** | "glass surfaces" as warm gold |
| navigation | sc11 | 208.0 ocean | **~95 (chartreuse-amber)** | "nav chrome" as warm chartreuse |

The 7 already-warm categories are KEPT verbatim (survival of the fittest): foundations 317.5,
display 69.6, dock 30.4, data 305.9, feedback 8.4, motion 291.9, compositions 128.8. Exact
targets are tuned in the wave against the √φ-spaced warm spectrum so the 11 stay DISTINCT
(distinct ≠ rainbow, distinct ≠ cool). *(Re-indexing is preferred over minting raw new ramp
indices: the `--section-color-N` ramp is the ONE identity source; pick existing warm slots or
add deliberate warm rows, never a parallel hue table.)*

**Leg (b) — the STRUCTURAL fence** (`aurora-hero.ts::sectionColorToHeroPalette`). Add a
`warmHeroHue(h)` that folds any cool-band hue `[180,270]` out into the warm vacancy before
building the wash; it is **identity on already-warm hues** (no double-bend), so it changes
nothing visible after leg-(a) but **guarantees** a future cool row cannot leak. Also adopt
B's stop-order: warm-cream is the DOMINANT lead/mid stop and the section hue a single accent
tail (the field reads warm at rest in EVERY category; distinctness survives as a warm accent +
the chip). `warmHeroHue` is a ~6-line hue-fold composing the EXISTING `cssToOklch` already read
in the function — ZERO new color math.

```js
// the proved fold (golden/warm-fence-spike2.mjs)
const COOL_LO=180, COOL_HI=270, WARM_LO=290, WARM_HI=410;        // warm vacancy: violet→cream→amber
function warmHeroHue(h){
  h = ((h % 360) + 360) % 360;
  if (h < COOL_LO || h > COOL_HI) return h;                       // already warm — UNTOUCHED (identity)
  const t = (h - COOL_LO) / (COOL_HI - COOL_LO);
  return ((WARM_LO + t * (WARM_HI - WARM_LO)) % 360 + 360) % 360; // monotone fold (order-preserving)
}
```

### De-risk result (LIVE-VERIFIED — `golden/spectrum-spike.html`, Chrome screenshot banked)

- **ALL 11 land in the warm arc** (`inWarmArc` true for every category, both legs).
- **min pairwise hue gap 10.4°** (distinct: violet/coral/pink/amber/peach/gold/salmon/lilac/
  rose/periwinkle/sage — a coherent warm wall, ZERO teal/ocean/indigo/navy). Screenshot
  confirms the read.
- **the fence is identity on the re-indexed warm hues** (no double-bend; it fires structurally
  only on a hypothetical future cool leak).

DEFT: the chip + eyebrow + facet-rail accent ALL auto-track — they read the same
`--section-color-N` (chip) / the re-indexed `sectionHue` (hero), ONE source, so leg-(a) fixes
every consumer at once. The substrates `bgKind:"aurora"` field reads through
`heroAuroraConfig` → the re-indexed palette → warm; the navigation `bgKind:"aurora"` likewise.
*(Note: also purge the one stray hardcode `overlays-scrims.vue:114`
`linear-gradient(135deg, var(--section-color-3), …)` → a warm slot, per lens-C §3.3.)*

---

## 3. M1 — THE WARM-GLASS SHELL COMPOSITION (visual + mechanism)

Three stacked planes sharing one warm field + a defined edge (design.md §3 — a COLORFUL FIELD
behind glass + a DEFINED edge; the BA.W-NO-GRAY warm floor):

| Plane | Element (shipped) | iOS-27 register |
|---|---|---|
| **Field** | `PaperBackdrop` (`fixed inset-0 -z-10`) | the breathing warm-cream substrate |
| **Chrome** | `SidebarDock` + `BottomDock` GlassDocks | transmissive warm plates over the field; the route reads through their blur |
| **Content** | `<main>` route + the `SectionLanding` hero | the hero's own field is a bounded, warm tint of the same substrate |

**The defined edge (the iOS-27 signature):** the hero field today is an unbounded full-bleed
wash that bleeds into the dock. The GOLDEN gives the hero field a **concentric-radius card
edge** (the BD concentric token) so it is a *defined surface* with a crisp rim — the dock
plates then read as glass *over* a bounded colorful card, the canonical iOS-27 read. (Cross-
links the page-background / hero-field wave; no new engine.)

**Liquid-weight on the shell entrance:** the shell enters once on cold load with a single
coordinated `useBloomUp` squish-grow (≈0.88 vol-preserving, low overshoot — the T10 register)
on the dock plates + field — the SHIPPED entrance applied to the shell frame.

---

## 4. M2 — THE ROUTE-BLOOM SKELETON (kills the void; the §0-defect-2 fix)

The `<RouterView v-slot>` + `<Transition name="fade-slide">` stays; the **empty-void window**
is filled and the entrance becomes a bloom. Three legs:

**(a) The glass skeleton holds the rect (no void).** During async-chunk resolve (the
t=18→128ms window where both `<Transition>` branches are false), render a THIRD branch — a
`<StorySkeleton>` glass-reveal placeholder painting the hero silhouette (a tall eyebrow bar +
a √φ title block + a bento-grid of shimmer cards), composing the SHIPPED `.glass-reveal`
recipe (`src/styles/glass/reveal.css`) + the warm-cream plate. Keyed so it shows ONLY while
`route.matched.length > 0 && !Component` (a matched-but-pending route) — NEVER for the
no-match "Pick a story" case (that branch is untouched; defect-7 holds). Frame 0 now paints a
coherent glass placeholder in the `<main>` rect — zero void. *(Silhouette + warm-cream read
LIVE-VERIFIED in `golden/spectrum-spike.html`.)*

```vue
<RouterView v-slot="{ Component }">
  <Transition name="fade-slide">
    <component :is="Component" v-if="Component" :key="route.fullPath" />
    <StorySkeleton
      v-else-if="route.matched.length > 0"           <!-- matched-but-pending: NEW branch -->
      aria-busy="true"
    />
    <Card v-else-if="route.matched.length === 0">     <!-- defect-7: UNTOUCHED -->
      Pick a story …
    </Card>
  </Transition>
</RouterView>
```

**(b) The content blooms THROUGH the skeleton.** When `Component` resolves, the skeleton→content
swap rides `useBloomUp` (the SHIPPED FLIP runner, `preset:"snappy"`) so the real hero
**squish-grows out of** the skeleton rect (scale 0.96→1 + opacity, weight, low-overshoot
settle) rather than the hard `fade-slide` pop. The skeleton title block and the real title
share a `view-transition-name` so the title appears to *solidify in place* (the T14
materialize read), not a cross-dissolve. **Overlapping action (lens-C, carved to drivers):**
the page-enter fires a beat AFTER the dock's category-change indicator glide (§5c), so the
two read as ONE choreography — but ONLY the navigation driver carries the punch (§L2; the
bento grid + content carousels stay calm-overdamped).

**(c) PRM + cross-engine.** PRM → the skeleton stays (it is calm), the bloom collapses to
opacity-only (no transform) per the `.glass-reveal` PRM arm + the `fade-slide` PRM block in
`transitions.css`. Compositor-only (opacity/transform); NO `backdrop-filter:url`; no goo on
this path — Safari-safe by construction.

---

## 5. M3 — THE IA MADE ALIVE + the contextual SWITCH made LIQUID

**(a) The IA stays standardized (FIT — REFINE only).** The `SectionLanding` →
`StoryHero(hero/D1)` → `SectionPreviewCard` bento triad is canon. KEEP it.

**(b) The dead bento glyph → a real single-paint specimen.** Replace `.section-preview-thumb`'s
lone glyph with a budget-safe specimen render keyed off `previewKind` (already in
`category-hero.ts`: `control`/`surface`/`metric`/`field`/`glyph`): a real `<Button>` for
`control`, a real `<Card>` mini for `surface`, a `<Metric>` for `metric` — each a SHIPPED
primitive painted ONCE, inert (static DOM/CSS, NOT a 2nd live-GL context — the one-GL-per-route
budget holds). The `field` kind keeps a single-paint still, warm-clamped. The card now previews
*the thing*. **One taxonomy, two scales (lens-B):** the bento groups its cards by the SAME
facet set `useContextualDockLayers` returns, so the landing is the EXPANDED view of the dock
facet rail (the landing is the map, the rail is the compass) — clicking a facet chip scrolls/
filters the bento to that group.

**(c) The contextual SWITCH made liquid (the C4 resolution — wire, don't fork).** The facet
surface EXISTS (`<DockSection>` renders `railItems`); the GAP is the SWITCH motion. Bring the
SHIPPED `useTabIndicator` (SegmentedTabs' glide + volume-preserving squish, `--spring-snappy`,
cap ≤1.08, WebKit-verified) INTO the `<DockSection>` facet row so the active indicator
**TRAVELS** between facets on a route change with weight + a hair of squish — not a hard
plate-swap. Compose the IconChip reveal on the `data-active` flip for the per-glyph
scale-pop (~1.15× overshoot). On commit, a one-shot **warm accent-flood**
(`--dock-accent-flood-t`, plus-lighter wash off the selected facet's `--glass-accent` =
the **post-fence WARM** `--section-color-N`) that trails the SPATIAL leg then clears (the T4
signature, EFFECTS-after-SPATIAL). When the CATEGORY itself changes, the whole facet set
swaps — wrap the swap in the SHIPPED `startViewTransition` (already imported `AppShell.vue:29`)
keyed on `categoryId`: Chrome gets the native VT crossfade; **Safari (no VT API) falls back to
the `.fade-slide` opacity transition** via `@supports (view-transition-name: x)` — one code
path, graceful per-engine degrade. This is EXACTLY the `BD.W-DOCK-TAB-INDICATOR` wave; the
shell is its CONSUMER. **NO new facet engine, NO goo on this path** (chips don't merge — the
goo baton of lens-C is a dock-engine concern, deferred; the liquid quality here comes from the
indicator glide + squish + the warm flood, all Safari-safe).

---

## 6. CROSS-ENGINE + a11y/PRM (the binding-law carve)

- **Cross-engine:** every shell-layout move is compositor-only (opacity/transform/CSS color) —
  NO `backdrop-filter:url`, NO goo on the shell path (goo lives in the dock fission waves
  behind their Safari-safe static-SVG floors). The warm field uses `light-dark()` with PLAIN
  per-mode arms (the inset-shadow trap avoided — no inset fragment inside `light-dark()`). The
  hero palette is oklch→sRGB via the shipped `cssToOklch`, sRGB-stable. The category-change VT
  has the `@supports` floor → `.fade-slide` on Safari. `useTabIndicator` + `useBloomUp` +
  `.glass-reveal` are all WebKit-verified shipped primitives. **PERFECT in Chrome AND Safari by
  construction** (no engine-fragile leg on any shell path).
- **a11y:** the skeleton carries `aria-busy="true"` + `aria-hidden` decorative shimmer; the
  route landmark + dock `aria-label`s untouched. The facet rail is `role="tablist"` of
  `role="tab"` chips with `aria-selected` tracking `railContext` + arrow-key roving; the
  category nav stays `aria-current="page"`; the bottom-dock story tabs keep `aria-current`. The
  accent-flood / indicator / baton are `aria-hidden` decoration — the real affordance is always
  the `aria-current`/`aria-selected` semantic. The warm-hue fence is purely visual (h only;
  L/C wash band unchanged) — re-check the chip-text ≥4.5:1 census the ramp already holds; no
  contrast regression. Facet chips ≥44px; the rail seats in the dock gutter clear of `<main>`
  at every y (dock-nav.css topology).
- **PRM:** skeleton stays; bloom→opacity-only; indicator glide→instant snap; category-change
  VT/fade→instant swap; scale-pop/flood→none. All inherit the global motion gate + each
  recipe's `@media (prefers-reduced-motion: reduce)` block. (`--shell-punch:0` is lens-C's
  one-assignment zero if a shell-scoped punch scalar is adopted for the entrance choreography.)

---

## 7. THE ACCEPTANCE BAR (what "done" looks like, both modes, both engines)

A coherent standardized shell: a warm-cream glass stack with a defined-edge hero field; the
nav docks clean (confirmed); the **11 category landings a warm DISTINCT spectrum** (no teal,
no ocean, no indigo, no slate, no navy — every chip + field + eyebrow + facet-accent in the
rose→amber→violet→ruby warm arc, FENCED by construction, both modes); a cold reload that
paints a glass skeleton from frame 0 and **blooms** the content through it (zero void, zero
pop); bento cards that preview the REAL thing, grouped by the facet set; and a contextual
facet rail that **glides + squishes** on switch with a one-shot warm accent-flood (the
`useTabIndicator` consumer), the category change crossfading via VT (Chrome) / fade (Safari).
Liquid weight on every DRIVER motion (not every pixel — §L2); √φ type; cartoon warm-technicolor
field. Perfect in Chrome AND Safari. A union onto shipped machinery — KISS, DRY, no fork, no
legacy.

---

## 8. THE BORN-RED GATE SKETCH (the π/readback that proves it)

Four arms, each born-RED on today's pixels, GREEN only after the GOLDEN lands:

1. **Warm-hue census (`proof:teal-navy-purge` clause T5 — NEW).** Enumerate every
   `CATEGORY_HERO` `sectionHue` → resolve its PAINTED hero hue (the `sectionColorToHeroPalette`
   output, post-fence) → assert each lands in the warm arc (`!(h∈(180,270))` above the 0.02
   chroma floor), BOTH modes. **Born-RED on today's 222.8/208/265.5/239.6; GREEN after legs
   (a)+(b).** A second bite: a LIVE-paint sample of the `/substrates` + `/navigation` hero FCP
   surface for a dominant warm hue (born-RED on the captured `rgb(122,203,231)` teal). *(The
   fold + distinctness already proved GREEN in `golden/warm-fence-spike2.mjs` + the Chrome
   screenshot.)*

2. **FOUC frame-probe (`proof:shell-route-bloom` — NEW).** A 16ms frame-probe on a cold reload
   of a deep lazy route asserts `<main>` is **non-empty from the first frame** (the skeleton
   paints), NEVER the "Pick a story" card, NEVER an empty `<main>`. **Born-RED on today's 8
   empty frames (t=18→128).** A second arm asserts the content arrives via a bloom (scale-track
   present), not a hard swap. Born-RED if either FOUC guard (router one-shot / matched-length
   branch) is removed.

3. **Liquid-switch readback (`BD.W-DOCK-TAB-INDICATOR` gate — shell consumer arm).** A π frame-
   series on a facet switch asserts the indicator TRANSLATE-tracks between slots (glide present,
   not an instant plate swap) + a volume-preserving squish mid-flight (X·Y≈1) + the per-glyph
   scale-pop overshoot + a one-shot accent-flood that trails then clears, BOTH engines
   (chromium + webkit). **Born-RED on today's 0 `useTabIndicator` refs / silent swap.**

4. **Cross-engine parity.** The category-change transition runs the VT crossfade in chromium
   AND the `.fade-slide` opacity fallback in webkit (assert no broken/empty frame in either);
   the bloom + skeleton + indicator render identically. **Born-RED if any shell path uses
   `backdrop-filter:url` or a goo filter** (grep + a webkit paint check).

---

## 9. DELTA-ASSAY → the wave amendment (no dup vs dock-core / dock-hub / the 116-wave set)

| Move | Disposition | Wave |
|---|---|---|
| **M1** warm-glass shell + defined-edge hero field | REFINE (concentric edge on the hero card) | folds into the page-background / hero-field wave (cross-link, no new engine) |
| **M2** route-bloom skeleton (the void) | **NEW** — the genuinely-missing artefact | `BD.W-SHELL-ROUTE-BLOOM`: `<StorySkeleton>` + the 3rd `<Transition>` branch + `useBloomUp` swap + the 16ms FOUC π. DEPENDS shipped `useBloomUp` + `.glass-reveal` (no re-ship). |
| **BOLDEST: warm-hue fence** | **NEW** (data re-index + the clamp + the gate clause) | `BD.W-SECTION-HUE-WARM-FENCE`: re-index the 4 cool rows in `category-hero.ts` + the `aurora-hero.ts` mirror (clean break) + `warmHeroHue()` in `sectionColorToHeroPalette` + `proof:teal-navy-purge` clause T5 (born-RED) + the `overlays-scrims.vue:114` stray purge. DEPENDS shipped `cssToOklch`. |
| **M3-a** IA chassis | NO-OP (confirmed fit) | — |
| **M3-b** dead bento → specimen + facet-grouped bento | **NEW (small)** | `BD.W-BENTO-SPECIMEN`: `previewKind`→shipped-primitive single-paint specimen + group by the resolver facet set. One-GL-budget-safe. |
| **M3-c** contextual SWITCH made liquid | **AUGMENT** (shell consumer; wire, don't fork) | `BD.W-DOCK-TAB-INDICATOR` (dock-core, propose) — bring `useTabIndicator` glide+squish + IconChip scale-pop + warm accent-flood INTO the existing `<DockSection>` facet row; category-change rides `startViewTransition`/`.fade-slide`. NO new `<DockFacetRail>` component (the surface already exists). |
| dock morph/fission/envelop/deep-transmit/the goo baton | **NO-OP here** (owned by dock-core/dock-hub) | the dock-engine waves — explicitly NOT re-specced; the shell DEPENDS/RIDES only |

**No-dup audit:** the only genuinely-NEW artefacts are `W-SHELL-ROUTE-BLOOM`,
`W-SECTION-HUE-WARM-FENCE`, `W-BENTO-SPECIMEN` (grep-verified: no `W-SHELL-ROUTE-BLOOM`, no
`W-SECTION-HUE-WARM-FENCE`, no `warmHeroHue`, no `StorySkeleton` exist). The contextual switch
is an AUGMENT of the BOOKED `W-DOCK-TAB-INDICATOR` (the shell is its consumer), NOT a new facet
engine and NOT a parallel `<DockFacetRail>`. The dock ENGINE (morph/fission/baton/deep-transmit)
is untouched. The fence REUSES `proof:teal-navy-purge` (a new clause) + the shipped `cssToOklch`
(no re-rolled math). The IA chassis + the FOUC `<Card>` guard are confirmed-fit (NO-OP).

---

## Spike artefacts (de-risk, throwaway)

- `golden/warm-fence-spike.mjs` — the naive monotone fold (showed a 1.1° collision → motivated
  the two-leg approach).
- `golden/warm-fence-spike2.mjs` — the GOLDEN two-leg fence: PROVES all 11 land warm, min
  pairwise gap 10.4° (distinct), the fence is identity on already-warm hues. Run with `node`.
- `golden/spectrum-spike.html` — the LIVE visual proof (Chrome screenshot banked): the warm
  distinct 11-category spectrum (zero teal/ocean/indigo) + the bloom-skeleton silhouette read.
