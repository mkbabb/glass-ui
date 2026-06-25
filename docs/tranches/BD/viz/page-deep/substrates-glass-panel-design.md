# substrates/glass-panel — FRONTEND-DESIGN deep critique (Pass-E)

Page: `demo/stories/substrates/glass-panel.vue` · live `http://localhost:5173/substrates/glass-panel`
Captures: `_cap-glass-panel-light.png`, `_cap-glass-panel-dark.png` (1440×900, both modes)
Lens: the frontend-design skill (distinctive, production-grade, AVOID generic-AI) applied to this project's iOS-26/27 Liquid-Glass + PAPER language per DESIGN.md.

---

## TL;DR severity

This is the single most important page in the whole demo — it is the page that TEACHES the glass material that the entire library is built on — and it is rendered as a **flat spec-sheet**: one giant outer wash card holding a 5-column grid of equal-weight pastel chips over a muddy low-res aurora. It violates almost every precept it exists to demonstrate. The material gallery shows glass that does not look like glass. This is the "canon-on-paper / muddy-in-render" gap (W-MENU-GLASS P-1 lesson) at the substrate-defining surface. Priority page for the BD redesign.

---

## 1. VISUAL HIERARCHY — the eye lands flat, the ladder is invisible

- **The eye lands right at the H1** (`Glass Panel`, 86px / 600 / −1.29px tracking — the `text-display-3`-ish audacious rung resolves correctly; DESIGN.md typography-forward ✓). But that is the ONLY typographic event on the page. After the H1 there is no second focal beat — the eye then has to choose between five identically-weighted chips and gives up. There is no protagonist.
- **The five-rung ladder is the WHOLE POINT and it is the LEAST legible thing on the page.** wash→quiet→resting→floating→overlay is an alpha-monotonic progression (0.30→0.95) — a *gradient of presence* that should read as a visible crescendo left-to-right. In render the five chips look nearly identical: equal size, equal corner radius, equal padding, equal type, sitting in an even 5-col grid. The single most teachable relationship in the library — "each rung is more present than the last" — is asserted in the blurbs but **not staged**. The user's ask ("each sub-section in its OWN glassy card; the main area BIGGER") is the fix: each rung deserves to be a real, large, breathing specimen, not a thumbnail.
- **The outer wash card is a dead frame.** A single enormous `.glass-resting`-tinted container wraps everything (the StorySection plate), so the glass specimens float over an aurora that is *inside* another glass card — which is exactly the `glass-cannot-sample-glass` DESIGN.md prohibition staged as the page layout. The aurora the chips are meant to refract is occluded behind the section plate's own tint before it ever reaches them.
- **No section-heading rung used well.** The lone `GLASS MATERIALS — THE FIVE-RUNG LADDER` mono eyebrow is the only structural label; there is no `text-subheading` (√φ 20.4px) section register (W-HIERARCHY), so the page is H1 → caption → grid with nothing in between. The sqrt-φ ladder (DESIGN.md) is present at the title and absent everywhere else.

## 2. AFFORDANCE — weak interactive cues

- The `.glass-deep` / `.glass-lens` ToggleGroup chips are the only controls and they are **buried below the blurb, tiny, and visually subordinate** to the static specimens they drive. The most interesting thing on the page (toggle OS-grade refraction live!) is a 12px afterthought labeled `axes:`. A world-class version makes these the hero control — a segmented glass control bar that visibly re-renders the gallery.
- There is **no indication the specimens are inert** vs. interactive — they have `rounded-card p-6` and `transition: all` but no hover/press, so a user cannot tell whether a chip is a button or a swatch. Ambiguous affordance.
- The dock (bottom-center) is the generic demo-shell nav dock — the page does **not leverage the dock APIs** the user explicitly asked for (contextual-switching / morph / silhouette). For a *glass materials* page the dock should itself be a live glass-material specimen and a contextual switcher between rungs/axes.

## 3. ANIMATION AFFORDANCE — essentially STATIC (the biggest miss vs the iOS-27 bar)

- `transition: all` on the rungs is a non-answer — there is no entrance, no hover, no press, no state choreography. DESIGN.md + motion-canon.md demand **HIGH animation affordance for EVERY component**; this page has effectively none on its protagonist surfaces.
- The page imports NONE of the landed motion primitives it is surrounded by: no `.scroll-cascade` section build (W-SCROLL-MOTION) so the five specimens don't stagger-in; no `useLiquidReveal` bloom; no `.glass-reveal`; no `vSpecular` tier-root gleam (W-LIQUIDHOVER) so the glass plates are DEAD to the pointer — a glass-materials gallery where the glass does not catch light when you move over it is a contradiction in terms.
- Toggling `.glass-deep`/`.glass-lens` is an instant class-swap, not a `--glass-depth` scalar lerp — DESIGN.md spring physics + W-DEEP-GLASS ship a `@property --glass-depth` exactly so depth ANIMATES smoothly. The page snaps instead of morphing. This is the headline missed move: the depth/refraction toggle should be the page's signature animation.

## 4. POLISH + DISTINCTIVENESS — reads generic-AI, not bespoke-premium

- Five equal pastel cards in an even grid over a gradient is the canonical generic-AI template the frontend-design skill warns against. Nothing here says "Apple shipped this in iOS 27." The aurora canvas reports **300×150 backing store** (unsized `<canvas>` stretched to full width) → the field is upscaled and soft, reading as a muddy orange wash rather than a crisp breathing nuclei-field. The glass cannot demonstrate refraction over a backdrop that has no structure to refract.
- The aurora is **the same warm-orange in both modes** — the user asked for "glass demos over COLORFUL aurora backgrounds." One monochrome warm field across the whole gallery is the opposite of colorful; the 13-stop `--section-color` ramp / `--viz-*` palette is right there. A material gallery should pick a vivid, structured field (and ideally a different one per rung-cluster) so the alpha-monotonic ladder reads as *increasing occlusion of a colorful scene*.
- The glass border is `α 0.04–0.05` — sub-perceptual. The DESIGN.md six-layer composite calls for a real **edge rim + inner catch-light**; here the rim is invisible, so the plates have no silhouette and bleed into the aurora. Combined with near-zero `box-shadow` (`0 1px 0`), the specimens have no *lift* — no drop-shadow layer. Two of the six optical layers (rim, drop-shadow) are effectively missing on the very gallery meant to showcase all six.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- DESIGN.md six-layer composite: backdrop-blur+saturate ✓ (present, calm W-GLASS-CAL values), surface-tint ✓, **edge-rim ✗ (invisible α), inner catch-light ✗ (no specular, vSpecular not wired), drop-shadow ✗ (≈0), grain ✗ (no paper-grain on the specimens)**. 2/6 layers visibly present on a page whose job is all 6.
- **PAPER morphism entirely absent.** The user wants GLASS + PAPER both. This page is pure glass-over-gradient; there is no paper-grain backdrop, no blueprint-grid, no `.paper-ink-mark` register, no editorial paper specimen alongside the glass. The math-paper.vue gold-standard idiom (border-l accent rail + mono label + grain) has no echo here.
- The "glass-cannot-sample-glass" rule is *inverted* — the page nests glass specimens inside a glass section plate (§1). The architecturally-correct staging is bare specimens directly over the live field with NO intervening glass frame.

## 6. SPACING / RHYTHM (golden-ratio) + COLOR (suffusion proportion)

- Padding is uniform `p-6`/`p-8`/`gap-4` — the W-CARD-PAD sqrt-φ block-over-inline ladder is NOT used; the specimens hug their type with a flat 1:1 pad. No golden cadence.
- Color suffusion: the page is correctly restrained on *ink* (one mono eyebrow, muted blurbs — the d1 ink floor holds), but it spends its ONE color event on a flat warm aurora and an off-palette pastel salmon tint on the chips, rather than a deliberate `--section-color` event. The one-color-event rule (W-SUFFUSE) is technically met but joylessly — there is no `<IconChip>` pop, no protagonist hue.
- **Import-path label is WRONG, not just unstandardized.** The chip reads `@mkbabb/glass-ui/glass-panel`, but the SFC's own header says `<GlassPanel>` is GONE and this route teaches bare `.glass-{rung}` CLASSES (a CSS register, not a subpath import). The label advertises a retired/non-existent import. Standardize AND correct it (e.g. `@mkbabb/glass-ui/styles` → the `.glass-*` ladder, since there is no component to import).

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Stage the ladder as a crescendo, not a grid.** Each rung gets its OWN large glassy specimen card (the user's ask), sized to read — e.g. a vertical stack or stepped diagonal where alpha visibly climbs 0.30→0.95 left-to-right/top-to-bottom, each labeled with the audacious type ladder. Make the *increasing presence* the visual protagonist. Bare specimens directly over the field — kill the outer glass frame (fixes glass-cannot-sample-glass).
2. **Make the gallery ALIVE.** Wire `vSpecular`/`useSpecularPointer` (W-LIQUIDHOVER) so every plate catches a pointer-following gleam; stagger the specimens in via `.scroll-cascade` (W-SCROLL-MOTION); bloom on first paint via `.glass-reveal`. Every specimen gets entrance + hover-specular at the iOS-27 bar.
3. **Animate the depth/refraction toggle — the signature move.** Promote `.glass-deep`/`.glass-lens` to a hero segmented glass control; drive a `--glass-depth` (W-DEEP-GLASS `@property`) scalar lerp on a `--spring-*` clock so the whole gallery *morphs* deeper/refractive on toggle (motion-canon P1 spring-iff-spatial). This single animated transition is the page's distinctiveness.
4. **A COLORFUL, structured, high-res field — and use it.** Size the `<Aurora>` canvas to its box (the 300×150 backing-store bug must die) and pick a vivid `--viz-*`/`--section-color` palette so the ladder reads as increasing occlusion of a real colorful scene. Consider a different field hue per rung-cluster so "more present" reads chromatically too.
5. **Restore the six optical layers + add PAPER.** Lift the edge-rim α and drop-shadow so each specimen has a real silhouette + lift (all six DESIGN.md layers visible on the gallery that teaches them). Add a PAPER counterpart specimen (grain/blueprint-grid + `.paper-ink-mark`) so the page honors GLASS + PAPER both. Apply the W-CARD-PAD sqrt-φ padding ladder.
6. **Leverage the dock APIs as the page's switcher.** Replace/augment the generic shell dock with a contextual dock that switches the active rung / toggles axes / morphs between glass↔paper registers (W-DOCK-MORPH-FAMILY silhouette + contextual-switching) — the dock becomes a live glass-material specimen that also drives the gallery. Fix + standardize the import-path chip (it currently advertises a retired `/glass-panel`).
