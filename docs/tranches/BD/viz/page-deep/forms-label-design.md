# forms/label — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/forms/label.vue` · live `http://localhost:5173/forms/label`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon, affordance-map, design-idioms).
**Captured**: 1440×900 light + dark, full body, computed-style probes (`forms-label-{light,dark}.png`).

The Label page is the **smallest, most documentary page in the forms band** — five sections (for-attribute coupling · nested checkbox · switch row · radio group · peer-disabled), each a label + a control + a mono caption, stacked in a flat transparent column with hairline dividers. The components are honest and the a11y point (the `for` binding, the nested hit-target, the peer-disabled dim) is real. But the *page* is the canonical generic-AI tell the frontend-design skill warns against: **a vertical spec-sheet in a thin left gutter over a vast empty wash, with one lonely teal dot of color and zero life.** It is the lowest-stakes page in the band and therefore the clearest place to see the systemic chassis failures — every one of them is here, undiluted. The probes confirm: `canvasCount: 0`, `sectionsContainer bg: rgba(0,0,0,0)` (no card), `scrollH === viewport (900px)` (the entire page fits in one screen with room left over), and the fields cap at `max-w-sm` (384px) inside a 1086px body inside a 1440px viewport.

---

## 1. The verdict up front

The page demonstrates five real label patterns correctly. It demonstrates them as **a flat documentation list, not a designed surface** — and because it is the lightest-weight page in the band, the void reads even harder than on `forms/inputs`. The frontend-design failures are systemic and shared with the whole band:

- **No card-per-section.** Probed: the body is ONE transparent `.scroll-cascade.story-sections` flex column (`bg: rgba(0,0,0,0)`, `radius: 0`, `backdrop: none`). Every section is a bare `<section>` divided by a hairline `--configurator-divider` rule. The user's "each sub-section in its OWN glassy card" is **entirely unmet** — the ONLY glass surfaces on the page are the fixed sidebar dock chrome and the input pill (and the lone switch-row `bg-card` plate, which is OPAQUE — `bg: rgb(251,248,244)`, `backdrop: none` — not glass).
- **The main area is NOT bigger — it's a column in a void.** The article is 1152px on a 1440px viewport; the section column is 1086px; **but every demo block is left-aligned and `max-w-sm`-capped (384px)**, so the entire page lives in a ~410px-wide left gutter and the right **~700px is dead grey wash all the way down.** And `scrollH === 900` — the page does not even fill one viewport. The user asked for MORE screen space deployed; the page deploys a third of it.
- **No aurora, no colorful field.** Probed: `canvas` count = **0**, `body background = transparent`. The brief's "glass demos over COLORFUL aurora backgrounds" is unmet — the input pill correctly composes `backdrop-filter: blur(8px) saturate(1.05) brightness(1.02)` (a real glass well) but it floats over a flat `oklab(~0.94)` cream wash with NOTHING to refract. §L1 is explicit: glass is a *lensing layer*, not a blur swatch — and here the lens has nothing behind it. In dark mode the pill collapses to a recessed near-black well over a near-black void; the "colorful aurora" is absent entirely.
- **No dock-API leverage.** The page that should "leverage the dock APIs (contextual switching/animating)" has zero contextual dock. The five label patterns are an *ideal* contextual-switch protagonist — a `DockStack mode="facets"` or `DockLayerGroup` that swaps the focal control (input → checkbox → switch → radio → disabled) with a live crossfade — and the page uses none of it.
- **Animation affordance is component-only, page-dead.** The page mounts inside `.scroll-cascade` and the IconChip carries `bloom reveal`, but nothing visibly *arrives* — five static rows. At the iOS-27 bar (motion-canon "the page assembles itself"; affordance-map "every element answers the pointer the same liquid way"), even the lightest page should breathe.

---

## 2. VISUAL HIERARCHY — the eye lands on the title, then falls off a cliff

**What works.** The `Label` H1 resolves to **86.1px Plus Jakarta Sans / 600** (`--type-display-4` rung) — the audacious √φ ladder IS used for the hero, and it lands. The three-rung StoryHeader cluster (eyebrow `FORMS · LABEL` → Fira-Code subpath chip → display H1) is the correct chassis idiom. The section eyebrows are the consistent mono `text-mono-caption` register. The typographic *scaffolding* is on-ladder.

**What fails.** After the 86px title the page **flatlines completely**. There is no second focal tier — the five sections are identical-weight (mono eyebrow + a 16px label + a small control + a mono caption), and because each is `max-w-sm` left-aligned, the eye has nowhere to travel but straight down a narrow column. There is no protagonist, no "look here," no scale contrast inside the body. The DESIGN.md "TYPOGRAPHY-forward / kinetically typographic" identity stops dead at the H1.

This page in particular has a beautiful unused move: **a label IS typography**. The `--type-display-mega` (177px) / `-hero` poster rungs exist for exactly this — a forms/label page could stage one giant ghosted character or a poster-scale focal label/value behind the protagonist control, making the page a *statement about the label material* rather than five caption rows. The interior is currently 100% body-and-mono — the flat register the frontend-design skill flags as the generic-template tell.

**Move**: stage ONE control pattern (the for-attribute `Input`+`Label` pair, the page's headline concept) as a focal protagonist at ~1.5–2× scale with a poster-rung typographic anchor; demote the other four to a tight supporting matrix.

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract (highest-leverage failure)

Shared with every page in the band and the dock flagship. DESIGN.md §L1 is unambiguous: glass *bends and concentrates light*; the six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) only reads as iOS-26-liquid **over content worth refracting.** Today:

- **The input pill** is a genuine glass well (`blur(8px) saturate(1.05)`) sitting over a flat single-hue cream wash — `rgb(243,236,226)` over a near-identical `oklab(~0.94)` page — so the blur has nothing structured to smear and the `saturate()` channel has no chroma to concentrate. It reads as a **tinted cream lozenge, not glass.**
- **The switch-row card is OPAQUE** (`bg: rgb(251,248,244)`, `backdrop: none`, `radius: 16px`) — it is the ONE "card" on the page and it is a solid `bg-card` plate, the literal anti-pattern §L1's tier-selection rule + the dock-flagship lesson name. It occludes whatever is behind it instead of admitting it.
- **Dark mode** collapses to a near-black void (W-DARK-MATERIAL's low page↔card elevation band is visible — the page card barely separates from the page), and the "colorful aurora" is absent; the violet `--primary` switch (`oklch(0.739 0.134 318.1)`, the legendre-violet) is the only chroma on the entire screen.

The brief's directive — **"glass demos over COLORFUL aurora backgrounds"** — is the fix, identical to `forms/inputs`. Run a **multi-nuclei aurora preset** behind the protagonist control (offscreen-paused by construction via `useIntersectionPause` + `content-visibility`, one GL context per route, budget-safe per the suite discipline) so the focal glass actually *lenses* a varied field — warm-to-cool nuclei drifting behind the pill, the blur smearing real color structure, the `saturate()` concentrating it. Keep the supporting matrix on the calm wash (the §L1 tier-selection discipline — save the spend for the hero). Verify dark-mode chroma survives the worst-case-contrast floor (§L5) — don't collapse to black.

---

## 4. CARD-PER-SECTION + LAYOUT — a flat stack, not a composition

The user's structural ask is explicit: **each sub-section in its OWN glassy card; the main card BIGGER.** Probed today:

| Treatment | Sections | Reads as |
|---|---|---|
| bare `<section>` in a transparent `.scroll-cascade` column, hairline-divided | for-attr · nested checkbox · radio · peer-disabled (4) | label + control + caption, divided by a faint rule |
| ONE inline opaque `rounded-card border bg-card p-4` (384px) | switch row (1) | the ONLY "card" — and it's solid, not glass |

So the page has FIVE sections, ZERO of them in a glass card, and the one card present is opaque. This is the **generic-AI list tell** the frontend-design skill warns against ("I stacked each block with a divider"), plus an inconsistency tell (four bare sections + one bespoke opaque card — no shared treatment).

**The resolution is the `surface="veil"` glass tier card per section — NOT opaque, NOT bare.** DESIGN.md ships exactly the right primitive: the Wash/Quiet/veil tiers admit the backdrop through (§L1 — "permeable veil over a kinetic backdrop"; BA.W-SURFACE-AXIS factored `surface="veil"` precisely for this). A `.glass-wash`/veil section card frames each demo as a *real glassy card* (rim + catch-light + grain) WHILE the backdrop reads through it onto the control — satisfying "own glassy card" AND "glass over the live field" at once, with zero occlusion. **This is the architectural transposition**: stop choosing between "opaque plate (occludes)" and "bare stack (no card)" — use the veil tier the library already ships, and retire the lone opaque switch-row `bg-card` plate onto it. glass-cannot-sample-glass (§L1) is honored as long as the veil cards and the input pill share the page's single composition container (they do — monotone Z-stack: aurora → veil cards → pill).

**Width + dead margin**: lift the body toward a generous width AND kill the `max-w-sm` 384px straitjacket. The page committing only ~410px of a 1440px canvas (and not filling even one viewport tall) is the literal opposite of "BIGGER." A 2-column bento (protagonist card spanning, the four states as a tighter matrix) would deploy the canvas the user asked for.

---

## 5. ANIMATION AFFORDANCE — component-alive, page-dead

Per affordance-map + motion-canon, every element should answer the pointer the same liquid way, and the page should *arrive*.

**Alive (good):** the IconChip carries `bloom reveal` (the `:reveal` spring-clock entrance + `:bloom` hover, W-SUFFUSE3) — the one element on the page with real entrance life. The input pill carries the focus-ring floor; the Switch/Checkbox/Radio carry their reka four-state contracts; the `.tap-squish` press register is on the dock controls. The component-level contracts are honored where the primitives ship them.

**Dead (the gap):**
- **No body entrance.** `.scroll-cascade` is the wrapper, but the five sections do not visibly *build in* — no per-section gravity-rise, no staggered arrival. The eyebrow→title→blurb gravity cluster shipped at W-HIERARCHY2 should generalize to the body sections (each blooming in on its own `--spring-snappy-duration` beat).
- **No liquid focus.** Input focus is a static 2px box-shadow ring — correct but inert. At the iOS-27 bar focus should be a *liquid* event: the pill swelling/brightening on the `useLiquidReveal`/`--press-t` brightness-settle vocabulary the library ships, the field reading as glass that *responds*.
- **The toggles are the page's whole point and they're shown at rest.** A label page is fundamentally about hit-targets and state — yet the checkbox is shown unchecked, the radio's selection is static, the switch is a single rest snapshot. The most kinetic moments (the checkbox check-bloom, the radio dot-pop, the switch thumb-spring on `--spring-snappy`) are exactly what a premium label page should *demonstrate in motion* — auto-cycle them, or make their state changes land with the spring vocabulary on display.
- **The "click the label to focus the input" caption describes an interaction the page never animates.** The for-binding IS the headline a11y concept; the focus-on-label-click should be a *staged, liquid* moment (the input swelling+brightening as the label is clicked), not a mono caption the reader has to take on faith.

**Move**: (a) wire `.scroll-cascade` gravity-entrance to land on each section card (per-section `--spring-snappy-duration` stagger); (b) make input focus a liquid swell+brighten event; (c) demonstrate the toggle state changes in motion (the check-bloom, the dot-pop, the thumb-spring); (d) stage the for-binding focus-on-label-click as a deliberate liquid beat.

---

## 6. POLISH / DISTINCTIVENESS — competent, not bespoke

The page avoids the worst generic-AI sins (real tokens, real reka components, the audacious H1, the disciplined one-color-event). But it does not read **bespoke + premium**:

- **Repetition without rhythm.** Five left-aligned label+control+caption rows in a narrow column is a *list*, not a composition. No asymmetry, no bento, no scale contrast — the frontend-design skill's "distinctive layout" bar wants protagonist/satellite or matrix, not a uniform stack.
- **Voice inconsistency in the copy.** The captions mix registers oddly: the showcase-cute ("I agree to the paper-and-glass manifesto.", "Free — library on the house.", "Pro — private palettes.") sits next to debug-output captions (`agreed · false`, `plan · pro`). The debug-state captions are dev-console voice in a showcase surface — they tell the *mechanism state*, not the *value* (MEMORY: tighten superfluous language). Keep the playful product copy; drop the `agreed · false` / `plan · pro` live-state readouts (or fold them into a single subtle state pill, not a mono caption per section).
- **The SFC header comment is internal-changelog noise.** Lines 11–13 (`// BC.W-SUFFUSE-reconcile … PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip> double-header shape).`) are commit-message rationale living in a showcase page's source header. It belongs in a commit, not the SFC.
- **The hairline dividers** are the single most generic element on the page — a faint horizontal rule is the AI-template default. The veil-glass cards (§4) replace them with surfaces that read as glass-ui.
- **The opaque switch-row card** is the one bespoke-looking element and it's bespoke in the *wrong* direction (a hand-rolled `rounded-card border bg-card p-4` triplet — the exact "raw recipe" the `<ShowcaseFrame>`/veil chassis exists to retire).

---

## 7. SPACING / RHYTHM + COLOR SUFFUSION

**Spacing**: the *vertical* rhythm is tokenized and fine (`--story-page-section-gap`, the golden-ratio cadence). The failure is **horizontal + density**: the 384px `max-w-sm` cap + left-alignment + a page that doesn't fill one viewport together waste ~two-thirds of the canvas. The √φ golden-ratio discipline (DESIGN.md, the W-CARD-PAD sqrt-φ block-over-inline ladder) lives in the type scale but is entirely absent from the page LAYOUT — there is no spatial hierarchy at all.

**Color suffusion**: **correctly restrained but inert** — the same diagnosis as `forms/inputs`. The one-color-event rule (AZ.W-SUFFUSE) is honored: the IconChip resolves the `--section-color-3` teal (probed `color(srgb 0.138 0.480 0.583 / 0.25)` backplate at 25%, the cool forms-band stop), the eyebrow is the tinted teal, the controls stay ink. That's the right *proportion*. But with aurora absent and cards absent, the ONE teal event is a lonely dot on a vast grey field — the proportion reads as *inert*, not *calm*. The fix is NOT more color events (the teal discipline is correct); it's giving the teal something to sit against — the aurora field (§3) + the veil cards (§4) supply the depth and structure that make the single teal accent read as deliberate rather than abandoned. Optionally the protagonist control's focus could carry a `--glass-accent` teal chromatic rim (BB.W-GLASS-ACCENT, the per-instance axis) — one color event, on the focal element, in the band's own hue.

---

## 8. PATH-LABEL + LANGUAGE (the user's explicit asks)

- **Path label — there is a real BUG here.** The rendered subpath chip reads **`@mkbabb/glass-ui/label`** (probed). But `Label` is NOT a published subpath — it is a `ui/` barrel export, reachable via the **root barrel** `@mkbabb/glass-ui` (or `/forms` for the forms family), per the §Subpath surface enumeration. There is no `dist/label.js` chunk. The manifest row for this page declares a `subpath` that does not exist as a published entry — the chip is *standardized in shape* but *factually wrong*. Worse, the page composes FIVE different primitives (`Label`, `Input`, `Checkbox`, `Switch`, `RadioGroup`) — no single subpath labels the page honestly. **Standardize to the band convention**: a forms-family page's canonical chip is `@mkbabb/glass-ui/forms` (the band's published subpath) or the root `@mkbabb/glass-ui` (where `Label`/`Checkbox`/`Switch`/`RadioGroup` actually live) — NOT a fabricated `/label` subpath. And the SFC imports via deep relative paths (`../../../src/components/ui/label`); the in-source convention should match the chip the page advertises.
- **Superfluous language**: drop the SFC header changelog comment (§6); drop the `agreed · false` / `plan · pro` debug-state mono captions (§6); the showcase product copy is already tight and good — keep it. The blurb ("Accessible control labels and hit-targets — the section identity is the ONE color event.") is half product-voice, half internal-design-note — the "the section identity is the ONE color event" clause is meta-commentary about the *page's own design discipline*, not about labels; compress to a labels-about-labels line.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Veil-glass card per section + retire the opaque switch-row plate.** Replace the flat transparent `.scroll-cascade` stack with ONE `surface="veil"` (`.glass-wash` tier) card per pattern — a real glassy card whose backdrop reads through onto the control (§L1 permeable veil, BA.W-SURFACE-AXIS). Fold the lone opaque `bg-card` switch-row card onto the SAME veil treatment so the page has ONE coherent card register. Satisfies "own glassy card" + "no occlusion" at once.
2. **Colorful aurora behind a protagonist control.** Promote the for-attribute `Input`+`Label` pair to a HERO card at ~1.5–2× scale, run a vivid multi-nuclei aurora preset behind it (offscreen-paused, one GL context, budget-safe), so the focal glass actually lenses varied color (§L1). Demote the other four patterns to a tight supporting matrix on the calm wash. Single highest-leverage fidelity fix — makes the field read as liquid glass instead of a cream lozenge. Verify dark-mode chroma survives the §L5 worst-case-contrast floor.
3. **Leverage the dock APIs — contextual control switching.** Wire a `DockStack mode="facets"` (or `DockLayerGroup`) that swaps the protagonist control across its patterns (input ↔ checkbox ↔ switch ↔ radio ↔ disabled) with a live crossfade, so the page SHOWS the dock switching context/animating — the capability the brief names and the page entirely lacks. The label patterns are the ideal contextual-switch content.
4. **Make the page arrive + the controls live.** Wire `.scroll-cascade` gravity entrance to land on each section card (per-section `--spring-snappy-duration` stagger, motion-canon); make input focus a liquid swell+brighten (the `--press-t` brightness-settle vocabulary); demonstrate the toggle state changes IN MOTION (the checkbox check-bloom, the radio dot-pop, the switch thumb-spring on `--spring-snappy`); stage the for-binding focus-on-label-click as a deliberate liquid beat (the page's headline a11y concept, shown not described).
5. **Bigger + tighter + fix the path bug.** Lift the body toward full width into a 2-column bento; kill the `max-w-sm` straitjacket; **fix the fabricated `@mkbabb/glass-ui/label` chip → `@mkbabb/glass-ui/forms`** (or root `@mkbabb/glass-ui` — `Label` is a barrel export, not a subpath); delete the SFC header changelog comment + the `agreed · false`/`plan · pro` debug captions; compress the blurb to a labels-about-labels line.
