# shell-layout · brainstorm · LENS A — PURE iOS-27 FIDELITY (greenfield)

> The demo SHELL: `AppShell.vue` + the nav docks (`BottomDock`/`SidebarDock`) + the
> category/page/meta IA + the "Pick a story" reload FOUC + the dock contextual-switching
> wiring — redesigned from FIRST PRINCIPLES through the iOS-27 Liquid-Glass lens.
>
> SCOPE FENCE (no dup vs dock-core / dock-hub): the **dock ENGINE** (morph, fission,
> envelop, deep-transmit, tab-indicator, motion-weight) is OWNED by `dock-core` +
> `dock-hub` + the on-disk BD waves. This lens owns ONLY the **SHELL that hosts the
> docks**: the composition, the IA presentation, the reload entrance/FOUC, the shell
> backdrop, and the **teal-hero hue purge** (a shell-IA defect, not a dock-engine one).
> Where contextual switching is named, this lens specs the **shell wiring** (which facet
> set, when, the entrance) and DEFERS the metaball/spring mechanism to the dock waves.

---

## 0. CONFIRM-CLEAN + the born-RED reads (real pixels, real reload)

Live-inspected on `http://localhost:5173`, light mode, Chrome (chrome-devtools-mcp).
Artefacts: `_assets/shell-display-buttons-light.png`, `_assets/shell-navigation-light.png`.

**CONFIRM CLEAN (do NOT re-litigate — verified):**
- The **live nav docks** ARE clean. `SidebarDock` (vertical, always-expanded, warm-cream
  pill, ℱ-home + category glyphs + utility gear/morph) and `BottomDock` (one-row
  `fit-content always-expanded` horizontal dock, the `FadingScroll` story-tab strip +
  prev/next + category-jump) read as intended. **0 broken-rail artefacts** — the
  `mode="facets"` carousel that collided was removed (BD.W-DOCK-CORE A1); both docks now
  carry facets via the in-flow `<DockSection>` grouping. **A1 RESOLVED — confirmed.**
- The **IA chassis IS standardized** (NOT ad-hoc): every category landing renders the
  SAME triad — `SectionLanding.vue` → `StoryHero variant="hero" depth="D1"` (eyebrow +
  √φ display title + Fira-Code subpath chip + blurb) → a `SectionPreviewCard` bento grid,
  one card/story. The IconChip/eyebrow/title/blurb hierarchy is coherent and repeats.
  This is a **REFINE**, not a re-invent.

**BORN-RED (the real defects, with numbers):**

1. **TEAL HERO — CONFIRMED, the flag is real (gestalt violation).** The Substrates
   landing hero `IconChip` computes **`color: oklch(0.542 0.089 222.8)`** (teal-cyan) +
   backplate **`srgb(0.138 0.479 0.583 / .25)`** (saturated teal). Navigation landing
   chip = **`oklch(0.601 0.092 208)`** (ocean). The **field behind** reads teal/cyan too
   (a full-bleed cool wash — see both screenshots). ROOT: `category-hero.ts` `sectionHue`
   = 3/11/2/12 for substrates/navigation/forms/motion → `sectionColorToHeroPalette()`
   (`aurora-hero.ts`) lifts L→0.8 + caps C→0.13 **but preserves the cool hue `h`
   verbatim** (222.8 / 208 / 265.5 / 291.9). There is **NO warm-hue clamp** on the
   dominant stop — only a warm-cream *tail* stop. So **4 of 11 category landings paint
   teal/ocean/indigo-dominant** in BOTH the chip AND the field. The `proof:teal-navy-purge`
   gate passes because its clauses target viz *palette/preset* defaults, NOT per-category
   hero `sectionHue` accents — the violation slipped the binding. **This lens fixes it.**

2. **RELOAD FOUC — a BLANK-MAIN void, not a "Pick a story" flash.** A real cold reload of
   `/display/buttons` (init-script frame probe, 16ms cadence): **`<main>` has NO content
   for t=18→128ms (8 frames, ~130ms)** — the `PaperBackdrop` + both docks paint, but the
   route-content region is **empty** while the route-level dynamic-import chunk resolves;
   content appears at **t=199ms**. The "Pick a story" card **never** shows (`pick:false`
   throughout — the BD W-NAV-DOCK-FIX defect-7 fix HOLDS; do not re-fix that). The actual
   defect: **~130ms of chrome-around-a-void** with no skeleton/placeholder + no entrance —
   content *pops* in. iOS-27 never shows empty chrome: it shows a glass placeholder that
   **blooms into** the content.

3. **The bento previews are DEAD glyph-over-tint stills** (`SectionLanding.vue`
   `.section-preview-thumb` — a centered icon at 55%-transparent ink over a 7rem gray box).
   The user-mandate was "a live mini-preview, not a text link"; the current still reads as
   an **empty gray panel** (see screenshots — the cards look unfinished). The one-GL budget
   forbids a 2nd live context, but a single-paint *specimen* (a real button, a real card,
   a real metric) is budget-safe and infinitely more alive than a lone glyph.

---

## 1. CORE IDEA — "the shell is a sheet of warm glass; the route blooms through it"

The iOS-27 shell is not a frame-with-a-hole. It is a **continuous transmissive substrate**
where chrome (docks), backdrop (paper field), and content (the route) are ONE warm-cream
glass stack, and every transition is a **bloom** — squish-grow with weight, never a pop.
Three moves realize this on the EXISTING ecosystem:

- **(M1) The warm-glass shell composition** — the shell backdrop, the dock plates, and the
  route content share ONE warm-cream field with a defined edge (design.md §3 COLORFUL FIELD
  + the BA.W-NO-GRAY warm floor). The category identity tints this field via a **bounded,
  warm-clamped** accent — never a cool-dominant wash.
- **(M2) The route-bloom entrance** (kills the FOUC) — a glass **skeleton** holds the
  `<main>` rect from frame 0 (no void), and when the chunk resolves the real page **blooms
  through** it (squish-grow + cross-fade) via the SHIPPED `useBloomUp`/`.glass-reveal`.
- **(M3) The standardized IA, made alive** — the `SectionLanding` triad stays (it is fit),
  but the bento previews become **real single-paint specimens**, the section identity is
  **warm-clamped**, and the contextual-facet rail (already wired) gets the **liquid tab
  indicator** the dock waves ship (deferred mechanism, shell wiring here).

---

## 2. THE BOLDEST MOVE — **the WARM-HUE FENCE on the section identity, system-wide**

> **Re-base the per-category `sectionHue` onto the warm-cream identity arc and add a
> hard `warmHeroHue()` clamp in `sectionColorToHeroPalette` — so NO category landing can
> EVER paint cool-dominant, in either mode, by construction.**

This is the audacious, gestalt move because it does not patch 4 categories — it makes the
teal disease **structurally impossible** and turns the 11-category wall into a **coherent
warm spectrum** (rose→tomato→amber→cream→violet→ruby), the cartoon-technicolor register the
edicts demand, instead of a cool-blue scatter. Two coupled legs:

**(a) Re-index the cool four onto the warm arc** (`category-hero.ts` — the DATA fix, clean
break, no alias):
- `substrates` 3 (teal h222) → **0** (rose h360) or **6-adjacent warm-cyan-free** — the
  "water/droplet" read survives on a warm aqua-rose, not chart teal.
- `forms` 2 (indigo h265) → **7** (violet h317) — the "input" register reads as the system
  violet, the warm-side neighbour.
- `navigation` 11 (ocean h208) → **5** (amber h70) or **10-warm** — nav chrome reads warm.
- `motion` 12 (periwinkle h291) → **7/0** (violet/rose) — drift reads warm-violet.
  (Exact targets are tuned in the wave against the √φ-spaced warm spectrum so the 11 stay
  DISTINCT — distinct ≠ rainbow, distinct ≠ cool.)

**(b) The hard fence** — `sectionColorToHeroPalette` gains a `warmHeroHue(h)` that **maps
any hue into the warm arc** `[ -40 .. +130 ]` (rose→amber, through cream) before building
the wash, with a small per-category offset preserved for distinctness. This is the
analogue of the viz `warmFieldHue` clamp the orch named — it exists for the FIELD but was
**never applied to the per-category hero palette**; this leg extends the SAME clamp idiom to
the hero source. Result: even a future cool `sectionHue` row cannot leak a cool hero. The
`proof:teal-navy-purge` script gains a **new clause T5**: census every `CATEGORY_HERO`
`sectionHue` → resolve its painted hero hue → assert it lands in the warm arc (born-RED on
today's 222/208/265/291, GREEN after the fence). This closes the binding gap that let the
violation slip.

DEFT: zero new color math — `warmHeroHue` is a 6-line hue-fold composing the EXISTING
`cssToOklch` (value.js) read already in the function. The chip + eyebrow auto-track (they
read the same `--section-color-N` for the chip, so leg (a) re-indexes the chip too — ONE
source, the `categoryHue()` accessor unchanged).

---

## 3. M1 — THE WARM-GLASS SHELL COMPOSITION (visual + mechanism)

The shell is three stacked planes sharing one warm field + a defined edge:

| Plane | Element | iOS-27 register |
|---|---|---|
| **Field** | `PaperBackdrop` (shipped, `fixed inset-0 -z-10`) | the breathing warm-cream substrate (design.md §3 — a COLORFUL FIELD, not flat) |
| **Chrome** | `SidebarDock` + `BottomDock` GlassDocks | transmissive warm plates floating over the field, the route reads through their blur |
| **Content** | `<main>` route + the `SectionLanding` hero | the route's own hero field is a **bounded, warm** tint of the same substrate |

**The defined edge (the iOS-27 signature the field must carry):** the hero field today is
an unbounded full-bleed wash (the screenshots show it bleeding to the dock). The greenfield
gives the hero field a **concentric-radius card edge** (the BD concentric token) so the
field is a *defined surface* with a crisp rim, not a gradient that dissolves into the
chrome — design.md §3 "a COLORFUL FIELD behind glass + a DEFINED edge". The dock plates then
read as glass *over* a bounded colorful card, the canonical iOS-27 read.

**Liquid-weight on the shell entrance:** the shell itself enters once (cold load) with a
single coordinated `useBloomUp` squish-grow on the dock plates + the field (≈0.88
vol-preserving, spring overshoot, the IOS27 T10 register) — the SHIPPED entrance, applied
to the shell frame, not just overlays.

---

## 4. M2 — THE ROUTE-BLOOM ENTRANCE (kills the FOUC, the §289 fix)

The `<RouterView v-slot>` + `<Transition name="fade-slide">` stays, but the **empty-void
window** is filled and the entrance becomes a bloom:

**(a) The glass skeleton holds the rect (no void).** During async-chunk resolve (the
t=18→128ms window where both `<Transition>` branches are false), render a **third branch**:
a `<StorySkeleton>` — a glass-reveal placeholder that paints the hero silhouette (a tall
eyebrow bar + a √φ title block + a bento-grid of shimmer cards), composing the SHIPPED
`.glass-reveal` recipe (`src/styles/glass/reveal.css`) + the warm-cream plate. It is keyed
so it shows ONLY while `route.matched.length > 0 && !Component` (a matched-but-pending
route) — NEVER for the no-match "Pick a story" case (that branch is untouched; defect-7
holds). Frame 0 now paints a coherent glass placeholder in the `<main>` rect — zero void.

**(b) The content blooms THROUGH the skeleton.** When `Component` resolves, the skeleton
→ content swap rides `useBloomUp` (the SHIPPED FLIP runner) so the real hero **squish-grows
out of** the skeleton's rect (scale 0.96→1 + opacity, weight, low-overshoot settle) rather
than the current hard `fade-slide` pop. The skeleton's title block and the real title share
a `view-transition-name` so the title appears to *solidify in place* — the iOS-27
"materialize" read (T14 `.glass-reveal`), not a cross-dissolve.

**(c) PRM + cross-engine:** PRM → the skeleton stays (it is calm), the bloom collapses to
an opacity-only reveal (no transform), per the SHIPPED `.glass-reveal` PRM arm + the
`fade-slide` PRM block already in `transitions.css`. Compositor-only (opacity/transform);
no `backdrop-filter:url`; Safari-safe by construction (no goo on this path).

**Born-RED gate:** the FOUC π re-runs the 16ms frame-probe on a cold reload and asserts
`<main>` is **non-empty from the first frame** (the skeleton paints) — born-RED on today's
8 empty frames (t=18→128), GREEN when the skeleton fills them. A second arm asserts the
content arrives via a bloom (scale-track present), not a hard swap.

---

## 5. M3 — THE STANDARDIZED IA, MADE ALIVE + the contextual-switching shell wiring

**(a) The IA stays standardized (it is FIT — REFINE):** the `SectionLanding` →
`StoryHero(hero/D1)` → `SectionPreviewCard` bento triad is the coherent standard; keep it.
The category→page→meta presentation (eyebrow=category title, √φ display title, subpath
chip, blurb, bento of stories) repeats across all 11 — confirmed coherent in the live reads.

**(b) The dead bento glyph → a real single-paint specimen.** Replace
`.section-preview-thumb`'s lone glyph with a **budget-safe specimen render**: the card's
`previewKind` (already in `category-hero.ts`: `control`/`surface`/`metric`/`field`/`glyph`)
selects a SHIPPED primitive painted ONCE, inert (a real `<Button>` for `control`, a real
`<Card>` mini for `surface`, a `<Metric>` for `metric`) — NO second live-GL context (the
one-GL budget holds: these are static DOM/CSS specimens, not GL). The card now reads as a
*preview of the thing*, the user-mandate satisfied, the bento alive. The `field` kind (the
GL categories) keeps a single-paint still (budget) but warm-clamped.

**(c) The contextual-facet rail — shell wiring (mechanism DEFERRED to dock waves):** the
`useContextualDockLayers` route→facet resolver IS wired (both docks read it; the
`railItems`/`railContext` writable-computed navigates on genuine activation — the
BA.W-SHELL-HOLD discriminator). The shell's job here is to make the facet SWITCH **read as
iOS-27**: when the route's category changes, the facet set should **glide+squish** between
states (the IOS27 T4 liquid tab-indicator), and the active facet should carry a one-shot
warm accent-flood. This is EXACTLY `BD.W-DOCK-TAB-INDICATOR` (dock-core's named wave) — so
this lens **DEPENDS** on it and specs only the **shell consumption**: the shell passes the
warm-clamped `--section-color-N` accent (post-fence) as the facet `--glass-accent`, and the
category-change animation rides the SHIPPED `startViewTransition` already in AppShell. NO
new facet engine. The "animated category change" the user asks for = the route-bloom (M2) +
the dock-tab-indicator glide (deferred) + the warm accent — all SHIPPED or BOOKED.

---

## 6. CROSS-ENGINE + a11y/PRM

- **Cross-engine:** every shell-layout move is compositor-only (opacity/transform/CSS color)
  — no `backdrop-filter:url`, no goo on the shell path (the goo lives in the dock fission
  waves, behind their Safari-safe static-SVG floors). The warm field uses `light-dark()`
  with **plain per-mode arms** (the inset-shadow trap is avoided — no inset fragment inside
  `light-dark()`). The hero palette is oklch→sRGB via the shipped `cssToOklch`, sRGB-stable.
- **a11y:** the skeleton carries `aria-busy="true"` + `aria-hidden` decorative shimmer; the
  route landmark + the dock `aria-label`s are untouched. The warm-hue fence is purely
  visual (color only) — no contrast regression (the L/C wash band is unchanged; only `h`
  folds, and the chip text re-checks the ≥4.5:1 census the section-color ramp already holds).
- **PRM:** skeleton stays, bloom→opacity-only, view-transition→instant; the existing global
  motion gate covers it.

---

## 7. DELTA-ASSAY → the wave-amendment (no dup vs the 116-wave set / dock-core)

| Move | Disposition | Wave |
|---|---|---|
| **M1** warm-glass shell + defined-edge hero field | REFINE (concentric edge on the hero card) | folds into `BD.W-PAGE-BACKGROUND` / hero-field wave (cross-link, no new engine) |
| **M2** route-bloom skeleton (FOUC) | **NEW** — the genuinely-missing artefact | `BD.W-SHELL-ROUTE-BLOOM` (NEW): `<StorySkeleton>` + the 3rd `<Transition>` branch + `useBloomUp` swap + the 16ms-frame born-RED FOUC π. DEPENDS `useBloomUp` (shipped, no re-ship) + `.glass-reveal` (shipped). |
| **M2-skeleton** as a primitive | RIDE | `useBloomUp` / `BD.W-FLIP-SPINE` (the runner — NOT a 2nd runner) |
| **BOLDEST: warm-hue fence** | **NEW** (data re-index + the clamp + the gate clause) | `BD.W-SECTION-HUE-WARM-FENCE` (NEW): re-index the cool four in `category-hero.ts` (clean break) + `warmHeroHue()` in `sectionColorToHeroPalette` + `proof:teal-navy-purge` **clause T5** (the per-category hero-hue census, born-RED). DEPENDS the shipped `cssToOklch`. |
| **M3-a** IA chassis | NO-OP (confirmed fit) | — (the `SectionLanding`/`StoryHero`/`SectionPreviewCard` triad is canon) |
| **M3-b** dead bento → specimen | **NEW** (small) | `BD.W-BENTO-SPECIMEN` (NEW or fold into a Pass-E IA wave): `previewKind`→shipped-primitive single-paint specimen, one-GL-budget-safe. |
| **M3-c** contextual facet switch read | DEPEND (shell wiring only) | `BD.W-DOCK-TAB-INDICATOR` (dock-core BOOKED) — shell passes warm accent + rides `startViewTransition`; NO new facet engine. |
| dock morph/fission/envelop/deep-transmit | **NO-OP here** (owned elsewhere) | `dock-core` + `dock-hub` WAVE-AMENDMENTs — explicitly NOT re-specced |

**No dup audit:** M2/the boldest fence/M3-b are the only genuinely-new artefacts and none
exist in dock-core/dock-hub/the 116-wave set (grep-verified: no `W-SHELL-ROUTE-BLOOM`, no
`W-SECTION-HUE-WARM-FENCE`, no `warmHeroHue`). The dock ENGINE is untouched (DEPEND/RIDE
only). The IA chassis is confirmed-fit (NO-OP). The fence REUSES the `proof:teal-navy-purge`
binding (a new clause, not a new gate) and the shipped `cssToOklch` (no re-rolled math).

---

## 8. THE GESTALT BAR (what "done" looks like, both modes)

A coherent standardized shell: warm-cream glass stack with a defined-edge hero field; the
nav docks clean (confirmed); the 11 category landings a **warm distinct spectrum** (no teal,
no ocean, no indigo, no periwinkle — every chip+field+eyebrow in the rose→amber→violet→ruby
warm arc, fenced by construction); a cold reload that paints a glass skeleton from frame 0
and **blooms** the content through it (zero void, zero pop); bento cards that preview the
real thing; and a contextual facet rail that glides+squishes on category change with a warm
accent. Liquid weight on every motion; √φ type; cartoon warm-technicolor field. Both modes.
