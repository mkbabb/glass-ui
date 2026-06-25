# forms/inputs — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/forms/inputs.vue` · live `http://localhost:5173/forms/inputs`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon, affordance-map).
**Captured**: 1440×806 light + dark, full body, computed-style probes (`_cap-forms-inputs-{light,light-lower,dark}.png`).

This is a **foundational forms page** — the first text-input surface a consumer meets. It must read as the canonical statement of "this is what a glass-ui field IS." Today it reads as a **competent six-row spec-sheet** — left-aligned label · grey caption · one 384px pill, repeated six times down a flat warm-grey wash with hairline dividers between. The component (`.input-pill`) is correct and lovely in isolation; the *page* spends almost none of the library's identity. The structure, staging, hierarchy, animation life, and dock-API leverage are all under-spent.

---

## 1. The verdict up front

The page demonstrates six real input states (default · labelled · errored · disabled · SearchBar · raw `.input-pill`) honestly. But it demonstrates them as **a vertical documentation list, not a designed surface**. The frontend-design failures are systemic:

- **No card-per-section.** Probed: the body is ONE transparent `.scroll-cascade.story-sections` flex column (1086px wide, `bg: rgba(0,0,0,0)`, `radius: 0`). Every section is a bare `<StorySection>` stacked with a hairline `::after` divider. The user's "each sub-section in its OWN glassy card" is **entirely unmet** — there are zero glassy sub-cards on the page (the only glass surfaces probed are the fixed dock chrome + the input pills themselves).
- **The main area is NOT bigger.** The article body caps at **1086px on a 1440px viewport** (~350px dead margin) AND every input is `max-w-sm` (384px), leaving ~700px of empty wash to the RIGHT of every single field. The page is mostly void. The user asked for MORE screen space deployed; the page deploys a thin left column.
- **No aurora, no colorful field.** Probed: `canvas` count = **0**, `body background = transparent`. The brief's "glass demos over COLORFUL aurora backgrounds" is the whole reason glass exists, and it is unmet — these glass pills float over a flat `oklab(~0.94)` cream wash with nothing to refract (§L1 — "surfaces are lensing layers, not blur swatches"; the lens has nothing behind it). In dark mode the field collapses to a near-black void; the pills read as recessed wells, not lensing glass.
- **No dock-API leverage.** The page that should "leverage the dock APIs (contextual switching/animating)" has zero contextual dock. The six input states are the perfect candidate for a contextual switch — a `DockLayerGroup` / `DockStack mode="facets"` that swaps the field protagonist (default → label → error → disabled → search) with a live crossfade. Instead they're a static stack the user scrolls past.
- **Animation affordance is component-only.** The `.input-pill` carries its focus ring + the destructive ring on the error field, and the page mounts inside a `.scroll-cascade` wrapper — but nothing visibly *arrives*. Six static rows. At the iOS-27 bar (motion-canon "the page assembles itself"; affordance-map "every interactive element answers the pointer the same liquid way"), a foundational page should breathe: the fields should bloom in, the focus should feel liquid, the error should shake-settle.

---

## 2. VISUAL HIERARCHY — the eye lands on the title, then flattens

**What works.** The `Inputs` H1 resolves to **109.7px Plus Jakarta Sans / 600** (`--type-display-5`/`-mega` rung) — the audacious √φ ladder IS used for the hero, and it lands beautifully. The eyebrow (`FORMS · INPUTS`) + the Fira-Code subpath chip (`@mkbabb/glass-ui/forms`) is the correct three-rung StoryHeader cluster. Section `<h2>`s resolve to a consistent 20.4px `text-subheading` / 600 (`--type-subheading`). The typographic *scaffolding* is correct and on-ladder.

**What fails.** After the title the page is **six identical-weight sections** — six 20.4px headings, six grey captions, six 384px pills. There is no focal field, no protagonist, no "look here." The frontend-design bar demands a hierarchy: ONE field (the canonical `Input`, or the live error→valid transition) staged large and central as the protagonist, the variant states as a tighter supporting matrix. Today the SearchBar (a real custom component worth showing) is the same weight as the bare pill.

The ladder is **used at page chrome but never inside the body**. DESIGN.md's "TYPOGRAPHY-forward / kinetically typographic" identity stops at the H1. A forms page could let a `text-display-mega` mono character or a single audacious word anchor the protagonist (e.g. a giant ghosted "Aa" or a live-typed value at poster scale behind the focal field — the `--type-display-mega` poster rung the library ships for exactly this). The interior is 100% body-and-caption — the same flat register the frontend-design skill flags as the generic-template tell.

**Move**: stage ONE protagonist field at ~1.5–2× scale (the focal `Input` with a live entrance + focus bloom), demote the five other states to a tight 2-up supporting matrix, and give the protagonist a poster-rung typographic anchor.

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract

This is the **single highest-leverage failure**, shared with the dock flagship. DESIGN.md §L1 is unambiguous: glass *bends and concentrates light*; the six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) only reads as iOS-26-liquid **over content worth refracting**. The `.input-pill` correctly composes `backdrop-filter: blur(8px) saturate(1.05) brightness(1.02)` (probed) — a genuine glass well — but it sits over a **flat single-hue wash**, so the blur has nothing structured to smear, the `saturate()` channel has no chroma to concentrate, and the pill reads as a tinted cream lozenge instead of glass.

- **Light mode:** the pills are `rgb(243,236,226)` warm-cream over a near-identical wash — a low-contrast, almost-invisible field on an almost-identical background. The glass is doing nothing because there's nothing behind it.
- **Dark mode:** the wells read as recessed (good `--input-on-glass` dark-material contrast — the BB.W-ON-GLASS-FG register IS working), but the "colorful aurora" is gone entirely; it's a black void.

The brief's directive — **"glass demos over COLORFUL aurora backgrounds"** — is the fix, exactly as on the dock flagship. Run a **multi-nuclei aurora preset** behind the protagonist field (offscreen-paused by construction, one GL context per route, budget-safe) so the focal glass actually *lenses* a varied field — warm-to-cool nuclei drifting behind the pill, the blur smearing real color structure, the `saturate()` concentrating it. THIS is what makes a glass field read as Apple-grade vs. a div with a border. Keep the supporting-matrix fields on the calm wash so the page doesn't over-spend; the aurora belongs behind the protagonist (the §L1 tier-selection-rule discipline — reach for the lowest tier that meets the floor, save the spend for the hero).

---

## 4. CARD-PER-SECTION + LAYOUT — a flat stack, not a composition

The user's structural ask is explicit: **each sub-section in its OWN glassy card; the main card BIGGER.** Probed today:

| Treatment | Sections | Reads as |
|---|---|---|
| bare `<StorySection>` in a transparent `.scroll-cascade` column | all 6 (Default · Label · Error · Disabled · SearchBar · pill) | a label + caption + pill, divided by hairlines |

ONE container treatment for the whole page — a flat transparent stack. There are no cards. This is the **generic-AI list tell** the frontend-design skill warns against: "I stacked each block with a divider." It is *correct* that an opaque `bg-card` plate would occlude an aurora — but the page didn't choose the harder, better path (a permeable veil card); it chose no card at all.

**The resolution is a `surface="veil"` glass tier card per section, NOT opaque and NOT bare.** DESIGN.md ships exactly the right primitive: the **Wash/Quiet/veil tiers admit the backdrop through** (§L1 tier table — "permeable veil over a kinetic backdrop"; the library factored `surface="veil"` at BA.W-SURFACE-AXIS precisely for this). A `.glass-wash`/veil section card frames each demo as a *real glassy card* (rim + catch-light + grain), AND the backdrop reads through it onto the field — satisfying "own glassy card" AND "glass over the live field" at once, with no occlusion. **This is the architectural transposition**: stop choosing between "opaque plate (occludes)" and "bare stack (no card)" — use the veil tier the library already ships. The glass-cannot-sample-glass rule (§L1) is honored as long as the veil card and the input pill share the page's single composition container (they do — monotone Z-stack).

**The width + the dead margin**: lift the body cap from 1086px toward a generous width, and — critically — kill the `max-w-sm` 384px straitjacket on the fields. A protagonist field should be wide and central; the supporting matrix should fill its card. ~700px of empty wash to the right of every input is the opposite of "BIGGER."

---

## 5. ANIMATION AFFORDANCE — component-alive, page-dead

Per affordance-map + motion-canon, every element should answer the pointer the same liquid way, and the page should *arrive*.

**Alive (good):** the `.input-pill` carries the focus-ring floor; the error field carries the destructive `--invalid-ring` (BB.W-INVALID-RING) destructive ring; the SearchBar bakes its icon. The component-level four-state contract is honored where the components ship it. The page mounts inside `.scroll-cascade` (the wrapper is present).

**Dead (the gap):**
- **No entrance.** The `.scroll-cascade` wrapper is present but the six fields do not visibly *build in* — there's no per-field gravity-rise, no staggered arrival landing on each pill. A foundational forms page should assemble itself (each field blooming in on its own `--spring-snappy-duration` beat, the eyebrow→title→blurb gravity cluster already shipped at W-HIERARCHY2 generalized to the body).
- **No liquid focus.** The input focus is a static ring. At the iOS-27 bar the focus should be a *liquid* event — the pill should subtly swell/brighten on focus (the `useLiquidReveal`/`--press-t` brightness-settle vocabulary the library ships), the field reading as glass that *responds*. Today focus is a 2px box-shadow, which is correct-but-inert.
- **No state-life on the error.** The error field is *born* errored (`errored = ref("not-an-email")`) — the most kinetic moment in forms (the validation snap, the destructive-ring bloom, the optional shake-settle) is shown as a static red border + a static red caption. The library has the spring vocabulary; a premium forms page makes the invalid-ring ARRIVE (a one-shot ring-bloom on the `--ease-out` no-overshoot register) rather than ship pre-broken.
- **No typing life.** A forms page that never shows a field being typed into, with the placeholder fading and the value landing, misses the obvious affordance demonstration. The SearchBar could live-demo the fuzzy pipeline; the `Input` could show a `useCountup`/typewriter-fed live value.

**Move**: (a) wire `.scroll-cascade` gravity-entrance to land on each field card (per-field `--spring-snappy-duration` stagger); (b) make focus liquid (swell+brighten on the press-t vocabulary); (c) animate the error into existence (invalid-ring bloom on `--ease-out`); (d) let the protagonist field show a live-typed value.

---

## 6. POLISH / DISTINCTIVENESS — competent, not bespoke

The page avoids the worst generic-AI sins (real tokens, real components, the lovely warm-cream pill, the audacious H1). But it does not yet read **bespoke + premium**:

- **Repetition without rhythm.** Six left-aligned label+caption+pill rows in a vertical stack is a *list*, not a composition. There's no asymmetry, no bento, no scale contrast — the frontend-design skill's "distinctive layout" bar wants the protagonist/satellite or matrix arrangement, not a uniform stack.
- **The captions are spec-sheet voice, not showcase copy.** "Bare `Input`, no label." · "`Label` + `Input`, explicit `for` binding." · "`disabled` attribute dims opacity and blocks pointer events." — these are API-doc captions (MEMORY: no grandiloquence, tighten superfluous language). They tell the *mechanism*, not the *value*. A foundational page should read as a product statement of the field material, not a prop reference. (The library voice is otherwise restrained — this is the one place to compress, not expand.)
- **The hairline dividers** between sections are the most generic element on the page — a faint horizontal rule is the AI-template default. The veil-glass cards (§4) replace them with surfaces that read as glass-ui.
- **The dead horizontal space** is itself an anti-polish signal: a premium page commands its canvas; this one occupies a thin gutter of it.

---

## 7. SPACING / RHYTHM + COLOR SUFFUSION

**Spacing**: the *vertical* rhythm is fine and tokenized (`StorySection gap="lg"`, the golden-ratio section cadence). The failure is **horizontal**: the 1086px body cap + the 384px `max-w-sm` field cap + the left-alignment together waste ~half the viewport and give zero spatial hierarchy. The golden-ratio discipline (DESIGN.md √φ ladder, the W-CARD-PAD sqrt-φ block-over-inline) lives in the type scale but is absent from the page layout.

**Color suffusion**: the page is **correctly restrained but inert**. The one-color-event rule (AZ.W-SUFFUSE) is honored — the IconChip resolves the `--section-color-3` teal (probed `oklch(0.48 0.58 222.8)` backplate at 25%, the cool forms-band stop), the eyebrow is the tinted teal (`oklch(0.542 0.089 222.8)`), and the field controls stay ink (the discipline the SFC comment names). That's the right *proportion*. But with the aurora absent and the cards absent, the ONE teal event is the only color on a vast grey field — so the proportion reads as *inert*, not *calm*. The fix is NOT more color events (the teal discipline is right); it's giving the teal something to sit against — the aurora field (§3) + the veil cards (§4) supply the depth and color structure that make the single teal event read as a deliberate accent rather than a lonely dot. Optionally, the protagonist field's focus could carry a `--glass-accent` teal chromatic rim (BB.W-GLASS-ACCENT, the per-instance axis) — one color event, on the focal element, the band's own hue.

---

## 8. PATH-LABEL + LANGUAGE (the user's explicit asks)

- **Path label**: the rendered subpath chip is correct and standardized (`@mkbabb/glass-ui/forms`). BUT the SFC imports via local relative paths (`../../../src/components/ui/input`, `../../../src/components/custom/search`) AND the SearchBar caption prose contradicts the chip — it reads "`SearchBar` from `@/components/custom/search`" (line 101), a THIRD path dialect (`@/components/...`) inconsistent with both the chip (`@mkbabb/glass-ui/forms`) and the relative import. Standardize: the chip is the one canonical label; the in-prose `@/components/custom/search` reference should be `@mkbabb/glass-ui/search` (its real published subpath) or deleted. The `.input-pill from glass.css` prose is fine (it IS a raw utility, not an export).
- **Superfluous language**: the captions are short already, but they're all mechanism-voice. Compress each to one showcase line stating the *value*, not the *prop*. The "`disabled` attribute dims opacity and blocks pointer events" caption is pure API doc — a forms page reader knows what disabled means; the caption should say what the disabled *field* communicates. The SFC top-comment (`PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip> double-header shape)`) is internal-changelog noise that belongs in a commit, not the source header of a showcase page.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Veil-glass card per section + a protagonist.** Replace the flat transparent `.scroll-cascade` stack with ONE `surface="veil"` (`.glass-wash` tier) card per demo — a real glassy card whose backdrop reads through onto the field (§L1 permeable veil, BA.W-SURFACE-AXIS). Promote ONE field (the canonical `Input` with a live entrance + focus bloom) to a HERO card at ~1.5–2× scale; demote the other five states to a tight 2-up supporting matrix. Satisfies "own glassy card" + "main area bigger" + "protagonist hierarchy" at once, with no occlusion.
2. **Colorful aurora behind the protagonist.** Run a vivid multi-nuclei aurora preset behind the hero field card (offscreen-paused, one GL context, budget-safe) so the focal glass actually lenses varied color (§L1). Single highest-leverage fidelity fix — it makes the hero field read as liquid glass instead of a cream lozenge. Verify dark-mode chroma survives (don't collapse to black). Keep the supporting matrix on the calm wash (the tier-selection discipline — save the spend for the hero).
3. **Leverage the dock APIs — contextual state switching.** Wire a `DockStack mode="facets"` (or `DockLayerGroup`) that swaps the protagonist field across its states (default → labelled → error → disabled → search) with a live crossfade, so the page actually SHOWS the dock *switching context/animating* — the capability the brief names and the page currently lacks entirely. The forms states are the ideal contextual-switch content.
4. **Make the page arrive + the fields live.** Wire the `.scroll-cascade` gravity entrance to land on each field card (per-field `--spring-snappy-duration` stagger, motion-canon); make focus a liquid swell+brighten event (the `--press-t` brightness-settle vocabulary, affordance-map); animate the error INTO existence (the `--invalid-ring` bloom on `--ease-out` no-overshoot) instead of shipping it pre-broken; let the protagonist show a live-typed value.
5. **Bigger + tighter + standardized.** Lift the 1086px body cap toward the full width; kill the `max-w-sm` straitjacket on the protagonist (let the hero field be wide); fix the path-label split (the in-prose `@/components/custom/search` → `@mkbabb/glass-ui/search`, the chip is canonical); compress every caption to one showcase line stating the field's *value* not its *prop*; delete the internal-changelog SFC header comment.
