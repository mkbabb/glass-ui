# forms/textarea — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/forms/textarea.vue` · live `http://localhost:5173/forms/textarea`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon, affordance-map).
**Captured**: 1440×806 light + dark, full body, computed-style probes (`_cap-forms-textarea-{light,dark}.png`).

This is the **second forms-band text-entry surface** — the multi-line sibling of `forms/inputs`. It is structurally a near-clone of that page and inherits ALL of its systemic frontend-design failures, plus three of its own (a false "auto-grow" header claim, the most-kinetic-state-of-a-textarea — the resize gesture — shown as inert prose, and a shrunk hero relative to the sibling). The `Textarea` primitive itself (`.input-pill` well + `--input-on-glass` dark-material register) is correct and lovely. The *page* spends almost none of the library's identity.

---

## 1. The verdict up front

The page demonstrates four real textarea states (default · resizable · resize-off · disabled) honestly. But it demonstrates them as **a vertical documentation list, not a designed surface** — the generic-AI tell the frontend-design skill exists to kill. Probed failures, systemic:

- **No card-per-section.** Probed: the body is ONE transparent `.scroll-cascade` flex column (1086px wide, `bg: rgba(0,0,0,0)`, `radius: 0`). Every section is a bare `<StorySection>` stacked with a hairline `::after` divider. The user's "each sub-section in its OWN glassy card" is **entirely unmet** — the only glass surfaces probed (`glassSurfaces: 13`) are the two shell docks, their icon buttons, the ONE `story-hero-card` header, and the four `.input-pill` wells. Zero glassy sub-cards frame the demos.
- **The main area is NOT bigger.** The article body caps at **1086px on a 1440px viewport** (`x:219`, ~350px dead left/right margin); every textarea is `max-w-md` → **448px wide**, leaving ~600px of empty wash to the RIGHT of every field. The page occupies a thin gutter of its canvas. The user asked for MORE screen space deployed; the page deploys a thin left column.
- **No aurora, no colorful field.** Probed: `canvasCount = 0`, `bodyBg = transparent`. The brief's "glass demos over COLORFUL aurora backgrounds" — the whole reason glass exists — is unmet. The `.input-pill` correctly composes `backdrop-filter: blur(8px) saturate(1.05) brightness(1.02)` (light) / `saturate(1.35) brightness(1.16)` (dark) — a *genuine six-layer well* — but it sits over a flat `oklab(~0.94)` cream wash with nothing to refract. §L1 is unambiguous: "surfaces are lensing layers, not blur swatches." The lens has nothing behind it.
- **No dock-API leverage.** The page that should "leverage the dock APIs (contextual switching/animating)" has zero contextual dock. The four states are the ideal contextual-switch content — a `DockStack mode="facets"` / `DockLayerGroup` that swaps the protagonist textarea (default → resizable → fixed → disabled) with a live crossfade. Instead they are a static stack the user scrolls past. (The two shell docks present are demo-shell chrome, not page content.)
- **Animation affordance is component-only and partially absent.** The `.input-pill` carries its focus ring; the page mounts inside `.scroll-cascade`. But nothing visibly *arrives*, the focus is a static ring, and the textarea's single most-kinetic affordance — the **resize gesture** — is shown only as prose ("grab the bottom-right corner"), never staged or animated. Four static rows.

---

## 2. VISUAL HIERARCHY — the eye lands on the title, then flattens (and the hero is undersized)

**What works.** The `Textarea` H1 resolves to **86.1px Plus Jakarta Sans / 600** (`--type-display-mega` rung) — the audacious √φ ladder IS used for the hero, on-ladder. The eyebrow (`FORMS · TEXTAREA`) + the Fira-Code subpath chip (`@mkbabb/glass-ui/forms`) is the correct three-rung StoryHeader cluster. Section `<h2>`s resolve to a consistent 20.35px `text-subheading` / 600. The typographic *scaffolding* is correct and on-ladder.

**What fails.**
- **The hero is SMALLER than its sibling.** `forms/inputs` resolves its H1 to **109.7px** (`--type-display-5`/`-mega` ceiling at this viewport); `textarea` lands at **86.1px** — a noticeably weaker protagonist for a coequal forms page. The shorter word ("Textarea" vs "Inputs") is not the cause — both ride the same vw-clamp; the page reads as a lesser sibling. A foundational forms surface should command the same poster weight.
- **Four identical-weight sections.** After the title the page is four 20.35px headings, four grey captions, four 448px wells. No focal field, no protagonist, no "look here." The frontend-design bar demands a hierarchy: ONE textarea (the auto-grow protagonist, or the live resize-drag) staged large and central, the variant states as a tighter supporting matrix.
- **The ladder is used at page chrome but never inside the body.** DESIGN.md's "TYPOGRAPHY-forward / kinetically typographic" identity stops at the H1. A textarea page could let a `--type-display-mega` ghosted glyph or a live-typed value at poster scale anchor the protagonist (the poster rung the library ships for exactly this). The interior is 100% body-and-caption — the flat register the frontend-design skill flags as the generic-template tell.

**Move**: lift the hero to the sibling's poster weight; stage ONE protagonist textarea at ~1.5–2× scale (auto-grow + live entrance + liquid focus), demote the other three states to a tight matrix, and give the protagonist a poster-rung typographic anchor.

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract

This is the **single highest-leverage failure**, shared with `forms/inputs` and the dock flagship. DESIGN.md §L1: glass *bends and concentrates light*; the six-layer composite reads as iOS-26-liquid **only over content worth refracting**. Probed:

- **Light mode:** the wells are `rgb(243,236,226)` warm-cream over a near-identical wash — a low-contrast, almost-invisible field on an almost-identical background. The `blur(8px) saturate(1.05)` is doing nothing because there is nothing structured behind it to smear or concentrate. The textarea reads as a tinted cream lozenge, not glass.
- **Dark mode:** the well reads correctly recessed (`--input-on-glass: hsl(26 12% 22%)` over `--card: hsl(24 8% 16%)` — the BB.W-ON-GLASS-FG register IS working, the silhouette reads), but the "colorful aurora" is gone entirely — a near-black void. The `saturate(1.35) brightness(1.16)` dark-glow companion (DESIGN.md §L1 dark tint) has no backdrop chroma to glow through.

The brief's directive — **"glass demos over COLORFUL aurora backgrounds"** — is the fix. Run a **multi-nuclei aurora preset** behind the protagonist textarea (offscreen-paused by construction, one GL context per route, budget-safe) so the focal glass actually *lenses* a varied field — warm-to-cool nuclei drifting behind the well, the blur smearing real color structure, the `saturate()` concentrating it. THIS is what makes a textarea read as Apple-grade glass vs. a div with a border. Keep the supporting-matrix fields on the calm wash (the §L1 tier-selection-rule — reach for the lowest tier that meets the floor, save the spend for the hero). Verify dark-mode chroma survives the well's `brightness(1.16)` (don't collapse to black).

---

## 4. CARD-PER-SECTION + LAYOUT — a flat stack, not a composition

The user's structural ask is explicit: **each sub-section in its OWN glassy card; the main card BIGGER.** Probed: ONE container treatment for the whole page — a flat transparent `.scroll-cascade` stack, four `<StorySection>`s divided by hairlines. No cards. This is the **generic-AI list tell** ("I stacked each block with a divider").

**The resolution is a `surface="veil"` glass tier card per section, NOT opaque and NOT bare.** DESIGN.md ships exactly the right primitive: the **Wash/Quiet/veil tiers admit the backdrop through** (§L1 tier table — "permeable veil over a kinetic backdrop"; `surface="veil"` factored at BA.W-SURFACE-AXIS precisely for this). A `.glass-wash`/veil section card frames each demo as a real glassy card (rim + catch-light + grain), AND the backdrop reads through it onto the field — satisfying "own glassy card" AND "glass over the live field" at once, no occlusion. This is the **architectural transposition**: stop choosing between "opaque plate (occludes aurora)" and "bare stack (no card)" — use the veil tier the library already ships. The glass-cannot-sample-glass rule (§L1) is honored as long as the veil card and the input well share the page's single composition container (they do — monotone Z-stack).

**The width + dead margin**: lift the body cap from 1086px toward a generous width, and kill the `max-w-md` 448px straitjacket on the protagonist (a hero textarea should be wide and central; the supporting matrix fills its card). ~600px of empty wash to the right of every field is the opposite of "BIGGER."

---

## 5. ANIMATION AFFORDANCE — component-alive, page-dead, and the resize gesture is inert prose

Per affordance-map + motion-canon, every element should answer the pointer the same liquid way, and the page should *arrive*.

**Alive (good):** the `.input-pill` carries the focus-ring floor (affordance-map FOCUS-RING primitive); the dark `--input-on-glass` well contrast is correct. The component-level contract is honored where the component ships it. The page mounts inside `.scroll-cascade`.

**Dead (the gap):**
- **No entrance.** The `.scroll-cascade` wrapper is present but the four fields do not visibly *build in* — no per-field gravity-rise, no staggered arrival landing on each well. A foundational forms page should assemble itself (each field blooming in on its own `--spring-snappy-duration` beat — the W-HIERARCHY2 eyebrow→title→blurb gravity cluster generalized to the body; motion-canon P2/P3).
- **No liquid focus.** Probed: focus is a static 2px ring. At the iOS-27 bar focus should be a *liquid* event — the well subtly swells/brightens on focus (the `--press-t` brightness-settle vocabulary, affordance-map GLEAM-TRACK/PRESS-SQUISH register), the field reading as glass that *responds*. Correct-but-inert today.
- **The resize gesture is shown only as prose.** This is the textarea-specific miss. The single most-kinetic, most-textarea-defining affordance is the resize-drag — and the page demonstrates it with a caption ("grab the bottom-right corner") and the native OS handle, never staged or animated. A premium textarea page makes resize a *designed* gesture: a `useDragMorph`/`useLiquidFlex` volume-preserving stretch on the grow (affordance-map DRAG-MORPH — the element that EARNS a pull), the well gel-squishing as it grows rather than a hard native handle-drag. (DRAG-MORPH is already in the affordance vocabulary for the tab pill, the Slider track, the SortableHandle — the textarea grip is the same class of "earns a pull" element.)
- **The header claims "auto-grow" but there is none.** Probed: every textarea is `rows=2`, `min-height:80px` FIXED, `overflow-y:auto`, `resize` = vertical/vertical/none/vertical. There is **no auto-grow** anywhere on the page — the field does not expand to its content; it scrolls inside a fixed 80px well. The header prose "Multi-line text entry with **auto-grow**" (line 41) is **false** and the most kinetic, most desirable textarea affordance is entirely absent. A textarea page MUST show auto-grow (the value lands, the field breathes taller on its own settle clock) — this is the page's reason to exist beyond `inputs`.
- **No state-life on the disabled field.** Disabled is shown static (opacity drop). Fine — but it is the same inert register as everything else.

**Move**: (a) wire the `.scroll-cascade` gravity entrance to land on each field card (per-field `--spring-snappy-duration` stagger); (b) make focus a liquid swell+brighten (the `--press-t` vocabulary); (c) **ship real auto-grow** on the protagonist (the field grows to content on its own settle clock — the page's headline affordance, currently a lie); (d) stage the resize as a designed `useLiquidFlex` gel-squish gesture, not a native handle + a caption.

---

## 6. POLISH / DISTINCTIVENESS — competent, not bespoke

The page avoids the worst generic-AI sins (real tokens, real components, the lovely warm-cream well, the audacious H1). But it does not read **bespoke + premium**:

- **Repetition without rhythm.** Four left-aligned label+caption+well rows in a vertical stack is a *list*, not a composition. No asymmetry, no bento, no scale contrast — the frontend-design "distinctive layout" bar wants the protagonist/satellite or matrix arrangement.
- **Captions are spec-sheet voice, not showcase copy.** "The baseline pairing — `Label` above, field below." · "Native `resize: vertical`." · "Forced `resize: none` — height stays where you put it." · "`disabled` drops opacity and blocks interaction." — these are API-doc captions (MEMORY: no grandiloquence, tighten superfluous language). They tell the *mechanism*, not the *value*.
- **The hairline dividers** between sections are the most generic element on the page — the AI-template default. The veil-glass cards (§4) replace them with surfaces that read as glass-ui.
- **The dead horizontal space** is itself an anti-polish signal: a premium page commands its canvas; this one occupies a thin gutter.
- **The SFC header comment is internal-changelog noise.** Lines 9–11 (`BC.W-SUFFUSE-reconcile … PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip> double-header shape)`) belong in a commit message, not the source header of a showcase page (MEMORY: greenfield — no version history / migration language in artifacts).

---

## 7. SPACING / RHYTHM + COLOR SUFFUSION

**Spacing**: the *vertical* rhythm is fine and tokenized (`StorySection gap="lg"`, the golden-ratio section cadence). The failure is **horizontal**: the 1086px body cap + the 448px `max-w-md` field cap + the left-alignment together waste ~half the viewport and give zero spatial hierarchy. The golden-ratio discipline (DESIGN.md √φ ladder, the W-CARD-PAD sqrt-φ block-over-inline) lives in the type scale but is absent from the page layout.

**Color suffusion**: **correctly restrained but inert**. The one-color-event rule (AZ.W-SUFFUSE) is honored — the IconChip resolves the `--section-color-3` teal (probed `color(srgb 0.138 0.480 0.583 / 0.25)` backplate at 25%, the cool forms-band stop), the eyebrow is the tinted teal, the field controls stay ink (the discipline the SFC comment names). That is the right *proportion*. But with the aurora absent and the cards absent, the ONE teal event is the only color on a vast grey field — so the proportion reads as *inert*, not *calm*. The fix is NOT more color events (the teal discipline is right); it is giving the teal something to sit against — the aurora field (§3) + the veil cards (§4) supply the depth and color structure that make the single teal event read as a deliberate accent rather than a lonely dot. Optionally, the protagonist's focus could carry a `--glass-accent` teal chromatic rim (BB.W-GLASS-ACCENT, the per-instance axis) — one color event, on the focal element, the band's own hue.

---

## 8. PATH-LABEL + LANGUAGE (the user's explicit asks)

- **Path label**: the rendered subpath chip is correct and standardized (`@mkbabb/glass-ui/forms`). The SFC imports via local relative paths (`../../../src/components/ui/textarea`, `../label`, `../../../src/components/custom/icon-chip`) — internal, fine. Unlike `forms/inputs`, there is **no third in-prose path dialect** here (the `Textarea`/`Label` captions reference bare component names, not a `@/components/...` path). Path-label is clean on this page; keep the chip as the one canonical label.
- **Superfluous language**: compress each caption to one showcase line stating the *value*, not the *prop*. "`disabled` drops opacity and blocks interaction" is pure API doc — a forms reader knows what disabled means; say what the disabled *field* communicates. **And fix the false claim**: the header "Multi-line text entry with auto-grow" must either become true (ship auto-grow, §5) or drop "auto-grow" — a showcase page must not advertise an affordance it does not have. Delete the lines 9–11 SFC changelog comment.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Veil-glass card per section + a protagonist.** Replace the flat transparent `.scroll-cascade` stack with ONE `surface="veil"` (`.glass-wash` tier) card per demo — a real glassy card whose backdrop reads through onto the well (§L1 permeable veil, BA.W-SURFACE-AXIS). Promote ONE textarea (the auto-grow protagonist) to a HERO card at ~1.5–2× scale; demote the other three to a tight matrix. Satisfies "own glassy card" + "main area bigger" + "protagonist hierarchy" at once, no occlusion.
2. **Colorful aurora behind the protagonist.** Run a vivid multi-nuclei aurora preset behind the hero well (offscreen-paused, one GL context, budget-safe) so the focal glass actually lenses varied color (§L1). Single highest-leverage fidelity fix. Verify dark-mode chroma survives the `brightness(1.16)` glow; keep the supporting matrix on the calm wash (the tier-selection discipline).
3. **Ship real auto-grow + a designed resize gesture.** The page's headline affordance is currently a LIE (probed `rows=2`/fixed `min-height:80px`/no grow). Make the protagonist auto-grow to content on its own settle clock, and stage resize as a `useLiquidFlex` volume-preserving gel-squish drag (affordance-map DRAG-MORPH), not a native OS handle + a caption. This is the textarea page's reason to exist beyond `inputs`.
4. **Leverage the dock APIs — contextual state switching.** Wire a `DockStack mode="facets"` (or `DockLayerGroup`) that swaps the protagonist across its states (default → resizable → fixed → disabled) with a live crossfade, so the page SHOWS the dock *switching context/animating* — the capability the brief names and the page lacks entirely.
5. **Bigger + alive + tighter.** Lift the 1086px body cap toward full width; kill `max-w-md` on the hero; lift the H1 to the sibling's poster weight (86→110px); wire the `.scroll-cascade` gravity entrance + liquid focus (the `--press-t` swell+brighten); compress every caption to one showcase line stating the field's *value* not its *prop*; fix/drop the false "auto-grow" header; delete the lines 9–11 SFC changelog comment.
