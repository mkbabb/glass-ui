# substrates/aurora — FRONTEND-DESIGN deep critique (Pass-E)

Page: `demo/stories/substrates/aurora.vue` → `VizStudio` chassis → `<Configurator asideSide="right">` + `AuroraStage` + `AuroraConfigDock` + `PresetPickerRow`.
Live: `http://localhost:5173/substrates/aurora`. Captured 1440×900 desktop + 390×844 mobile, live GL field running.
Lens: the frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) applied to glass-ui's OWN language — DESIGN.md (iOS-26/27 six-layer Liquid Glass + 7 tiers + glass-cannot-sample-glass + spring physics), motion-canon.md, design-idioms.md, PROCEDURAL-SUITE.md, the dock system APIs.

---

## Verdict in one breath

The bones are right — a real `useConfiguratorState` studio, a genuinely beautiful live coral/amber/violet aurora field, a 2:1 stage:controls split, correct responsive collapse, the √φ section rung at 20.35px/600, glass-floating on the studio frame. But the page is currently a **competent admin-inspector, not a bespoke iOS-27 studio**. Three structural defects undercut the premise: (1) the studio name is **triple-stamped** (hero `<h1>` 244px + violet "Aurora Studio" masthead + "Aurora" `<h2>` 20px) — the eye lands nowhere clean; (2) the **preset thumbnails are DEAD** — Sky/Dawn render as blank white wells, the exact "dead card" the SFC comment swears it fixed; (3) the **controls column glass has nothing colorful behind it** — it floats over dead warm page and reads as a flat gray AI-template slab, defeating "glass demos over COLORFUL aurora backgrounds." And the page leverages **zero dock APIs** for its own content (the only docks are the demo shell's nav chrome) — the user asked the viz pages to "deftly use a series of glass-ui components: docks/procedural-anims/cards/tabs/buttons."

---

## 1. VISUAL HIERARCHY — the eye lands in three places at once

**The triple-name defect (top priority).** Live DOM carries THREE "Aurora" lockups stacked vertically:
- `<h1>` hero, `font-size: 244.8px`, ink `rgb(28,25,23)` — the StoryPage audacious display title.
- The violet `#masthead` `<span class="text-display-3">` "Aurora Studio", `var(--motion-accent)` = `oklch(0.532 0.180 317.5)`.
- The StorySection `<h2>` "Aurora", `font-size: 20.352px`, same ink.

That is the D1-4 double-`<h1>` suppression class RE-OPENING in a new costume. The eye reads "Aurora… Aurora Studio… Aurora" top to bottom — a stutter. Per the W-HIERARCHY2 cluster doctrine the descriptor shows ONCE in reading order (eyebrow → title → blurb). Decision needed: the **hero `<h1>` is the page title; the violet masthead is the studio's color event; the `<h2>` "Aurora" is redundant and must go** (or the hero collapses to a thin chrome line and the violet masthead becomes the in-frame title). Right now all three fire — the audacious ladder is being *spent three times on the same word*, which is the opposite of typography-forward; it's typography-loud.

**The hero eats the first viewport whole.** At 1440×900 the 244px "Aurora" + blurb fill the entire first screen; the live studio frame begins at scroll y≈760 — fully below the fold. A studio page should let the *live field* be the hero. The user's explicit ask — "the main card area BIGGER (more screen space)" — is the fix: shrink the standalone hero (it already has a shrink-on-scroll mechanism that isn't doing enough here), or fold the title INTO the stage as an overlay lockup so the colorful field IS the masthead, the iOS-27 move (content-forward, chrome-quiet).

**Where hierarchy is RIGHT:** the section labels resolve the canonical `--type-subheading` 20.35px/600 rung (not a sub-body caption), the mono `5 stops · 4 nuclei` sub-label is the correct tertiary register, and the stage:controls 703:360 split is a near-golden 1.95:1. The skeleton of the ladder is here; it's the *count* of competing display events that breaks it.

## 2. AFFORDANCE — clear, but the colorful-glass premise is half-delivered

- **Stage interactivity is well-cued in prose** (drag to swirl, alt-click nucleus, ring drag) and the nucleus rings render with numbered handles — genuinely good direct-manipulation affordance, distinctive and on-brand for a procedural studio.
- **The preset cards have a real hover transition** (`transform 0.2s` + box-shadow) and a selected-ring — correct affordance grammar.
- **BUT the controls column is a flat gray slab.** Both `configurator-stage` and `configurator-aside` are `background: transparent`; the gray comes from the studio frame's own `glass-floating` (`oklab(0.798 … / 0.84)`, blur 13px) compositing over warm page. The stage HALF has the live aurora glowing behind the glass — that half sings. The controls HALF sits over dead page substrate, so the same glass has **nothing colorful to refract** and collapses to the generic warm-gray inspector look DESIGN.md's "glass-cannot-sample-glass / needs a rich backdrop to POP" precept warns about. This is the W54 "blur is imperceptible over a flat substrate" fact biting in production: the controls glass needs the aurora (or a paper/grid wash) *behind it* to read as liquid glass rather than an opaque panel.

## 3. ANIMATION AFFORDANCE — the field is alive; the chrome is mostly static

At the iOS-27 bar EVERY element should be alive — entrance, hover, press, state. Audit:
- **ALIVE:** the aurora field (continuous GL drift + pointer swirl + flick-burst), the preset card hover (transform/shadow), the `ConfiguratorLayer` chevron reveal (collapsible spring).
- **STATIC / missing:** the studio frame has **no entrance** — it just exists below the fold; per W-SCROLL-MOTION `.scroll-cascade`/`.scroll-build` the stage + each section should build in on a `view()` timeline with the spring-clocked coupled transform+opacity (the page ships the register; this page doesn't consume it). The **section headers don't morph** — collapsing is a height toggle, not the liquid dock-style contextual morph the user wants. The **preset row doesn't stagger in**. The masthead violet title has no GRAVITY entrance (W-HIERARCHY2's 3-stage fade-rise). The Reset button is a plain ghost button with no press-spring read (`useSpringPress`/`useLiquidPress` exist and are unused here). Net: the *substrate* is iOS-27-alive, the *interface around it* is a quiet form.

## 4. POLISH + DISTINCTIVENESS — bespoke field, template chrome

The aurora field itself is unmistakably bespoke and premium — the coral→amber→violet OKLCh composition with nucleus rings is exactly the distinctive, not-generic-AI surface the skill demands. The problem is the **frame around it reads like a Tailwind admin panel**: a gray right-rail of stacked collapsibles, white-welled cards, a header row with a ghost Reset. Nothing here says "glass-ui" except the field. The user's instinct is dead-on: **"each sub-section in its OWN glassy card"** — the seven `ConfiguratorLayer` sections (Color/Composition/Motion/Warp/Flow/Texture/Nuclei) should each be a discrete `glass-quiet`/`glass-resting` card floating over the aurora wash, not flat collapsibles inside one slab. That single move converts the admin-inspector into a stack of liquid-glass instrument tiles — the iOS-27 Control Center idiom, on-brand and distinctive.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **Six-layer composite:** the studio frame has backdrop blur+saturate (13px/1.18) + surface tint + edge rim (`oklab(… / 0.6)`) — but over dead page the inner catch-light + drop shadow don't read, and the grain is absent on the controls half. Fidelity is ~3 of 6 layers visible where it matters (the controls).
- **Glass-cannot-sample-glass** is respected (one frame, no nested-glass-over-glass). Good.
- **Tier discipline:** the studio uses `glass-floating` (tier 4) for the whole frame; the sub-sections should step DOWN to `glass-quiet` cards so there's a real elevation ladder (frame floats, tiles rest), the DESIGN.md 7-tier move. Currently it's one tier flat.
- **PAPER morphism is absent.** The brief wants GLASS + PAPER both. A procedural-suite page is a natural home for a paper-grain `.scroll-cascade` body band beneath the studio (the hint prose currently floats as bare muted `<p>`s — that's the paper register begging to be used: a `paper-grain-overlay` notes card with a `border-l-[3px]` section-accent rail, the math-paper gold standard).

## 6. SPACING / RHYTHM — mostly clean, one orphan

- The studio frame radius is 12px (`--radius`), the section gap rhythm is the configurator density ladder — coherent.
- **Orphan:** the three hint `<p>`s below the frame are bare `text-small text-muted-foreground` with `gap-1` — no card, no φ-derived padding, no rail. They read as an afterthought. Promote to a captioned paper notes tile (W-CARD-PAD sqrt-φ block ladder) so the page closes with rhythm instead of trailing off.
- The hero→frame gap is a void (full viewport of empty warm page between the 244px title and the studio). Tightening the hero closes it.

## 7. COLOR — suffusion proportion is correct; backdrop reach is not

- **One-color-event discipline holds:** the violet `--motion-accent` masthead is the single text color event; the body ink stays warm-neutral; the field carries the chroma. This is the W-SUFFUSE3 proportion done right — do NOT add a second hue to the chrome.
- **The miss is backdrop REACH, not palette.** The aurora is gorgeous but its colorful pixels only live in the LEFT 703px. The right 360px controls column + the below-frame prose get NONE of it. "Glass demos over colorful aurora backgrounds" means the aurora (or a tinted wash) must reach UNDER the whole studio, so the controls glass refracts color too.

## 8. DEAD CARDS (regression — fix first)

`PresetPickerRow` renders Sky + Dawn as **blank white/gray wells** — no `<img>`, no canvas, `background-image: none`, `background-color: transparent` on the thumbnail well. `usePresetThumbnails({widthCss:320,heightCss:200})` is producing nothing that reaches the DOM (the WebGPU `armAsync`-await bake the SFC comment promises isn't painting). This is the literal dead-card the file header claims to have solved. It's the single most damaging polish defect — two empty cards at the top of the controls column read as broken.

## 9. IMPORT-PATH LABEL + LANGUAGE (the user's housekeeping asks)

- **Import chip:** the page DOES carry the Fira-Code subpath chip (`@mkbabb/glass-ui/aurora`) on the hero, and the blurb ends "Shipped /aurora." That trailing "Shipped /aurora." is a SECOND, inconsistent restatement of the same fact — standardize on the ONE chip, drop the prose echo.
- **Superfluous language:** the blurb is a 90-word wall ("A WebGPU-first procedural painterly gradient field — multi-nuclei composition, four mediums (smooth · oil · oil-pastel · van-Gogh) + the anisotropic-Kuwahara finish, cursor-driven swirl. Drag inside the stage… The configurator on the RIGHT drives EVERY axis… The warm-cream Dawn identity is the default lead; the blue Sky is a named non-default preset. Shipped /aurora."). Half of it is implementation narration (RIGHT, default-lead, named-non-default) that belongs in a code comment, not the reader-facing blurb. Tighten to one editorial line: *"A WebGPU procedural gradient field — multi-nuclei, four painterly mediums, cursor-driven swirl."* The interaction hints already live below the frame; don't repeat them in the blurb.

---

## TOP DESIGN MOVES (ranked, concrete, idiomatic)

1. **Kill the triple-name; let the field be the hero.** Suppress the `<h2>` "Aurora", shrink the standalone hero (or overlay the title lockup INTO the stage), and make the studio frame the first-viewport focal — the user's "main card BIGGER" ask. (W-HIERARCHY2 / D1-4 suppression.)
2. **Fix the dead preset thumbnails** — bake-and-paint or fall back to the `auroraFallbackGround` field raster so Sky/Dawn show real previews. No empty wells. (W-AURORA-SWRASTER luminance-faithful ground is the ready fallback.)
3. **Each sub-section in its OWN glass card.** Re-skin the seven `ConfiguratorLayer` sections as `glass-quiet` tiles floating over the aurora wash — a Control-Center stack, not a flat slab. Step the tier ladder: `glass-floating` frame, `glass-quiet` tiles. (DESIGN.md 7-tier + the user's headline ask.)
4. **Extend the colorful backdrop UNDER the whole studio** (stage + controls + notes) — a tinted aurora/grid wash behind the controls column so the glass refracts color, not dead page. (W54 "glass needs a rich backdrop to POP".)
5. **Leverage the dock APIs for section navigation.** Replace the 7-collapsible scroll with a `<DockLayerGroup>` contextual switcher (or `<SegmentedTabs variant="pill">` glass tabs) so switching Color→Composition→Motion is a liquid morph, not a height toggle — the user's "leverage the dock APIs (contextual switching/animating)" + "deftly uses docks/tabs" ask. This also shortens the column and animates state.
6. **Animate the chrome entrance.** Consume `.scroll-cascade`/`.scroll-build` so the stage + each tile builds in on a `view()` timeline; give the masthead the W-HIERARCHY2 GRAVITY fade-rise; route Reset through `useSpringPress`. Every element alive. (motion-canon P1–P6.)
7. **Add the PAPER register for the notes.** Promote the trailing hint `<p>`s into a `paper-grain-overlay` captioned tile with a section-accent rail (W-CARD-PAD sqrt-φ padding) — closes the page with GLASS+PAPER both, on rhythm.
8. **Tighten the copy + standardize the chip** — one editorial blurb line, the single Fira-Code `/aurora` chip, drop "Shipped /aurora."

---

### 5-line verdict
The live aurora field is bespoke and premium — the procedural surface nails the not-generic-AI bar — but the studio FRAME around it is a competent admin inspector that undersells it: a flat gray controls slab over dead page, dead preset thumbnails, and a name stamped three times (hero + violet masthead + `<h2>`). The colorful-glass premise is half-delivered — only the stage half has aurora behind the glass; the controls half collapses to warm-gray template chrome. The page leverages ZERO of its own dock/tab/card/paper components for content — the very components it exists to show. Top moves: let the field be the hero (kill the triple-name, enlarge the frame), re-skin each section as its own glass-quiet tile over an aurora wash that reaches the WHOLE studio, swap the 7 collapsibles for a dock/tabs contextual switcher, fix the dead thumbnails, and animate every chrome element to the iOS-27 alive bar. Do that and this goes from "good demo" to the flagship liquid-glass studio the suite needs.
