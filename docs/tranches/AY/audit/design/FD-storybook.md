# FD-storybook — the storybook pages as designed artifacts

Lane: FD-storybook · AY design audit · 2026-06-09 · TWO independent passes, converged
Surface: the demo shell at `http://localhost:5199` (1440×900 + 390×844, light + dark), driven live via Playwright (system Chrome headless — the bundled headless-shell SwiftShader renderer hard-wedges on the aurora WebGL page; first finding before the first capture. Pass 2 reproduced it independently and confirmed the cure: `--headless=new --use-gl=angle --use-angle=metal`, the π config's real-GPU path).
Captures: `docs/tranches/AY/audit/design/FD-storybook/*.png` (36 files, pass 1) + `docs/tranches/AY/audit/design/captures/FD-storybook/*.png` (44 files, pass 2 — adds tall full-page pairs at 1440×2400, element crops of both shell docks, and the dark/mobile/interaction set). §§1–8 are pass 1; §9 is the pass-2 addendum (independent drive, new probes — every shared finding below was re-derived independently before the two passes were merged, so the converged diagnoses are corroborated, not copied).

**Verdict: DESIGN-DEFECTS** — strong bones (the chassis architecture, the chrome, the typography register are genuinely distinctive), but the headline design promise of the page redesign — glass cards over live substrates — visually fails on four of the five substrate kinds, the front door ships a fully dead category index, and one declared substrate is outright broken at the CSS layer. The standard ("contained in a glass-card, occasional usage of aurora/constellation/fourier/blob, divined easter eggs, proper hierarchy and affordance") is MET on containment and hierarchy, MISSED on substrate usage and easter eggs.

---

## 1. The shell chrome — judged

The frame is the best-designed thing in the storybook, and it dogfoods the product.

- **SidebarDock rail** (`demo/layout/SidebarDock.vue`): glass rail, red ℱ wordmark home anchor, icon-per-category with tooltips, the reference shelf below a separator, NCSU-red active accent + left-edge rule. Reads instantly; active state unambiguous. (`intro-aurora-hero.png`)
- **BottomDock story strip** (`demo/layout/BottomDock.vue`): in-category tabs + prev/next + category skip, kbd hints in the tooltips, red underline active state. The whole nav is two docks — the product IS the chrome. Distinctive.
- **Keyboard layer**: `[` `]` `{` `}` `,` `?` all registered; the `?` help dialog enumerates them (`ix-help-dialog.png`). This is real, discoverable craft.
- **PresetEditor** (`,` or the gear FAB): a live token-editing side panel — presets, four font axes, scale slider, persists locally (`ix-preset-editor.png`). The strongest delight feature on the surface.
- Chrome warts: (a) on mobile the gear FAB collides with/occludes the BottomDock's right edge (`ix-mobile-intro.png`); (b) in dark mode the hovered story tab paints a full white pill — visually LOUDER than the active tab's red underline, an affordance inversion (`ix-bottomdock-hover.png`); (c) there is no global cmd+K — the library ships a Command palette component and the shell that navigates 100+ stories doesn't use it (see §5).

## 2. The systemic finding — the substrate architecture defeats its own intent

`StoryPage` → `StoryHero` (the page-redesign chassis) is the RIGHT shape: every page body in a `Card` over a manifest-declared backdrop, two registers (page/hero). Containment is near-universal — 130 of 131 story SFCs compose `StoryPage` (the one exception, `substrates/aurora.vue`, is the full-bleed studio shell, a deliberate and correct escape).

But only **8 of ~115 manifest rows** declare a background at all (aurora ×1, paper ×1, constellation ×1, fourier ×1, grid ×4), and of those five kinds only ONE survives to the eye:

| kind | page | live result | cause (probed) |
|---|---|---|---|
| aurora | foundations/intro | **VISIBLE** — pale at top/bottom, lovely at the category-index depth (`intro-category-index.png`) | big soft color fields survive the card |
| constellation | compositions/hero | **BROKEN — paints nothing** (`comp-hero-card-hidden.png`: card hidden = blank cream) | host `h=0`, canvas stuck at default 300×150. `Constellation.vue` scoped `.constellation { position: relative; block-size: 100% }` (specificity-bumped by the scoped attribute) beats `.story-hero-bg { position: absolute; inset: 0 }` → in-flow, percentage-height-of-auto → 0 |
| fourier | compositions/auth-shell | **INVISIBLE** — canvas sized (1152×822) and painting, zero read-through | erased by the card: `oklab(... / 0.8)` bg + `blur(16px)` over thin 1px strokes |
| grid | metric-cell, metric-stack, math-paper, dashboard | **INVISIBLE** on all four (`data-metric-cell.png`, `comp-dashboard.png`) | 7%/12% foreground hairlines behind an 80%-opaque blurred plate ≈ nothing |
| paper | foundations/paper-glass | **IMPERCEPTIBLE** | same erasure |

The geometry compounds it: the glass card spans the **entire** `.story-hero` container — the substrate has no exposed margin, so it is only ever seen THROUGH the card. An 0.8-opacity blur(16px) plate transmits broad color (aurora) and annihilates line work (constellation/fourier/grid). The architecture demonstrates glass blur and in doing so deletes its own backdrops. Fix routes (any one suffices, the first two compose): (a) hero cards take a lower-opacity tier over live substrates; (b) inset the card so the substrate rims it (the visible-margin move); (c) raise grid/paper alpha specifically for the behind-card role; (d) fix the constellation positioning bug regardless.

Net against the user's standard: "occasional usage of aurora, constellation, fourier-field, blob" — the declarations exist, the usage does not reach the retina. Zero pages use GooBlob anywhere.

## 3. Per-page disposition

Glass-card containment is a non-issue (130/131) — the table judges what the standard actually discriminates: substrate, hierarchy/affordance, and the design read.

| page | capture | contained | substrate | disposition |
|---|---|---|---|---|
| foundations/intro | `intro-aurora-hero.png` | hero | aurora — partial read | The wordmark + display headline are excellent. THREE defects: (1) **dead category index** — all 8 cards `href="#/primitives"` etc. on a `createWebHistory` router; clicking verifies `pathChanged: false`. (2) **stale IA** — the index names Primitives (doesn't exist) and omits Substrates/Forms/Display/Dock/Data-as-shipped. (3) the cards are opaque `bg-card` slabs punching holes in the glass hero (`intro-category-index.png`). Front door, highest-traffic page, broken at its one interactive moment. |
| foundations/colors | `foundations-colors.png` | page | none | Competent and on-brand; mono section labels (CORE / RAINBOW · SECTION-COLOR-0..12 / VIZ BASIS) carry hierarchy. |
| foundations/typography | `foundations-typography.png` | page | none | **Strong** — left mono rail labels (DISPLAY-5…) against huge specimens; characterful, stepped, intentional. |
| foundations/paper-glass | `foundations-paper-glass.png` | hero | paper — imperceptible | **The mission-failure page**: the five glass-tier cards read as five identical white rectangles. The page whose entire subject is the glass ladder has nothing behind the glass. Plus the orphaned 5th tier card on its own row. Contrast display/card, which solved this. |
| foundations/motion | `foundations-motion.png` | page | none | Good interactive specimen ("Click a row — the dot slides 500px"); affordance prompt does its job. Rows stretch 1100px for a 500px run. |
| substrates/aurora | `substrates-aurora.png` | full-bleed studio (deliberate) | itself | The preset rail (Dawn/Messina/Deliberative/Day 9/CK Impasto) is vivid; the default stage at load is a washed-out blue field that undersells the thumbnails above it. |
| substrates/blob | `substrates-blob.png` | page | none | The "lit contained droplet" static register paints four FLAT saturated slabs (the black one reads as a void) under prose promising "a CSS/SVG pastel swatch." Register and prose disagree. |
| substrates/fourier-field | `substrates-fourier.png` | page | none | Specimens near-empty at load (one faint epicycle ring + a small red arc — the reconstruction needs dwell time a first paint doesn't have). Prose is internal-notes register: "variant is a configuration BUNDLE, not a recolour of one curve." Spec-speak, lowercase, reads pasted from a worklog. |
| substrates/glass-material | `substrates-glass-material.png` | page | local color field | **MODEL PAGE** — glass chips over a vivid in-region gradient; the only foundations/substrates page where glass legibly behaves as glass. |
| forms/inputs | `forms-inputs.png` | page | none | Clean four-state walkthrough. The repeated spatial defect debuts here: a `max-w-sm` specimen column inside a `max-w-6xl` card — the right ~60% of every section is empty cream. |
| display/buttons | `display-buttons.png` | page | none | default/outline/ghost/glass/glass-wash are near-indistinguishable white pills over flat cream (glass-first default + no backdrop = no differentiation). The audacious black CTAs land. **Gold CTA hover defect**: white text over a pale-gold backplate — washed to near-invisibility (`ix-gold-cta-hover.png`); the AW.W13 "white over SATURATED gold" contract is not what paints. All-caps mono spec-speak in page prose ("REST TEXT: VAR(--FOREGROUND)…"). |
| display/card | `display-card.png` | page | local color strip | **MODEL PAGE** — tier specimens over a teal/yellow/pink watercolor strip; the wash→overlay ladder actually reads. This is the pattern paper-glass and dock/* should steal. |
| containers/dialog | `containers-dialog.png` | page | none | Sparse but honest; two sections, page 60% empty. |
| navigation/tabs | `navigation-tabs.png` | page | none | Solid specimens; the segmented strips stretch the full 1100px card for 3 options — comic proportions, same spatial timidity. |
| dock/overview | `dock-overview.png` | page | none | **The headline primitive over a void**: every dock specimen floats in an empty cream frame. The dock IS glass; there is nothing behind it to vouch for that. The #1 divined-backdrop placement (§6). Prose here is the good story-register. |
| dock/rail | `dock-rail.png` | page | none | A small rail centered in a vast empty frame — negative space without composition. Raw markdown backticks render literally in the manifest blurb ("The vertical \`GlassDock variant="rail"\`…"). |
| data/table | `data-table.png` | page | none | Charming — Ada Lovelace/Turing/Hopper invoice fixtures (levity, present), tinted status pills, mono money column. |
| data/metric-cell | `data-metric-cell.png` | page | grid — invisible | Declared grid does not read; backticks leak into body prose; left-hugging content, dead right half. |
| feedback/toast | `feedback-toast.png` | page | none | **Weakest page shape**: one row of trigger pills + a paragraph set entirely in mono (code-comment register), 70% empty. |
| motion/springs | `motion-springs.png` | page | none | Competent play/reset harness; half-empty. |
| compositions/hero | `comp-hero-constellation.png` | hero | constellation — **broken** (h=0) | The typewriter headline is a real motion moment (delight, present). Two defects: the dead substrate (§2), and the headline word-break — the static ℱ-glyph and the typed "or…" are separate inline elements, so the line wraps MID-WORD: "A design system f / or mathematician" (captured). |
| compositions/auth-shell | `comp-auth-fourier.png` | hero | fourier — invisible | The split brand/sign-in card is a clean composition; the brand panel's promised fourier drift is erased. "Sign in" (the primary action) is a pale glass pill with less visual weight than the headline checkboxes — primary affordance underpowered. |
| compositions/dashboard | `comp-dashboard.png` | page | grid — invisible | The best composition in the book: asymmetric three-column, mono-accented bento metrics, activity rail. Wart: the "Paused" status pill wraps to "Pause/d". |
| compositions/settings | `comp-settings.png` | page | none | Section labels tinted from the section ramp (ACCOUNT blue, APPEARANCE amber) — quiet, good. |
| composables/use-token-color | `composables-ref.png` | page | none | The reference shelf outclasses several component pages — live token swatches, theme indicator. |

Dark mode (`ix-intro-dark.png`, `ix-buttons-dark.png`): coherent inversion overall; the dark aurora hero collapses to near-black with a faint red breath — moody but the painterly brand identity is gone (the known dark-aurora register). Mobile (`ix-mobile-intro.png`): the aurora reads RICHER at 390px than at 1440px; dock collapse is good; the FAB/dock collision noted in §1.

## 4. The two leaking voices

A storybook is prose + specimens. Two registers leak into the user-facing layer and cheapen it:

1. **Markdown in manifest blurbs** — blurbs render as plain interpolated text, so backticks and angle-bracket component names print literally (dock/rail, native-top-layer, metric-cell, others). Either strip the syntax or render it.
2. **Spec-speak in page prose** — all-caps mono contract lines (buttons), lowercase worklog paragraphs (fourier-field), tranche citations in blurbs ("AQ.W4", "(AK-W2-α)", "Z.W2 / A2 §B5"). The dock pages prove the team can write the story register; it isn't applied evenly.

## 5. Easter eggs — inventory and divination

**Exists** (all discoverable, none gratuitous): the `?` shortcut help; the `,`/FAB PresetEditor; the typewriter hero with the anchored ℱ-glyph; the Lovelace/Turing/Hopper fixtures; kbd hints inside dock tooltips. **Grep across `demo/` + `src/` confirms: no konami, no seasonal, no hidden interactions.** For a system shipping FOUR live substrates, the easter-egg shelf is bare — the substrate set implies surprises it never cashes.

Divined (feeds W-SB1/W-COHERE — each uses ONLY shipped machinery):

1. **The ℱ redraws itself** — click-and-hold (or double-click) the rail wordmark → a FourierField overlay reconstructs the ℱ glyph as an epicycle curve, then fades. The logo is literally named for this; the component literally does this. The single most befitting easter egg in the codebase.
2. **Konami → full-bleed aurora** — the shipped Aurora at `intensity: 1`, escaped from behind the card for 10 seconds (the "what the substrate can really do" reveal), any page.
3. **cmd+K command palette** — dogfood the shipped Command component for fuzzy story navigation. Half affordance gap, half delight; the highest-value single addition to the shell.
4. **GooBlob as the empty-states mascot** — compositions/empty-states is the natural home for a small pointer-reactive blob that leans toward the cursor; also the missing 404 route (a constellation + "lost in the lattice").
5. **Long-press the dark-mode flip** — a slow eclipse transition (the sun/moon SVG is already animated; give it one indulgent register).

## 6. Divined backdrop placements (the occasional-usage map)

Restraint is part of the standard — forms/feedback/containers should STAY quiet. The befitting placements:

| placement | substrate | why befitting |
|---|---|---|
| dock/overview + dock/rail + dock/layers specimen frames | aurora, low intensity, INSIDE the frames | the dock is the headline glass primitive; glass needs something behind it to exist. The display/card strip is the proven pattern |
| foundations/paper-glass tier ladder | in-region color field (the display/card / glass-material move) | the page's subject is the glass ladder; currently five identical white cards |
| substrates/{aurora, blob, constellation, fourier} page backgrounds | each page's OWN substrate at whisper intensity | self-demonstration: the constellation page over a drifting lattice |
| compositions/hero | constellation (after the h=0 fix) | already declared; fix + raise read-through |
| compositions/empty-states | GooBlob accent | the only blob placement in the book; mascot register |
| data/metric-stack + dashboard + math-paper | grid, raised alpha or inside-card | declared and invisible today; the blueprint conceit deserves to land |
| foundations/motion + motion/springs | constellation, whisper | motion pages over the moving lattice — quiet self-reference |
| navigation/carousel | aurora wash | a media-shaped surface over a painterly drift |

Pre-requisite for all rows: the §2 read-through fix (card tier/inset/alpha) — without it every placement is decoration the card erases.

## 7. Defect ledger (ranked)

1. **Front-door category index is dead** — 8 hash-hrefs on a web-history router; probed: click → `/foundations/intro#/primitives`, no navigation. Also stale (names categories that don't exist, omits half the real IA) and off-register (opaque `bg-card` slabs in the glass hero). `demo/stories/foundations/intro.vue:55-71`.
2. **Constellation substrate paints nothing** — `Constellation.vue` scoped `position: relative` + `block-size: 100%` defeats `.story-hero-bg`'s absolute placement → h=0, canvas 300×150. `comp-hero-card-hidden.png` is the proof frame.
3. **Substrate read-through ≈ 0 for fourier/grid/paper** — the 0.8-opacity blur(16px) card erases line-work substrates; the chassis demonstrates glass by deleting its backdrops (§2 probe data).
4. **Gold CTA hover contrast** — white label over a pale-gold backplate at the settled hover state (`ix-gold-cta-hover.png`); the saturated-backplate contract is not what paints on this page.
5. **Hero headline mid-word wrap** — "f / or" breaks across lines whenever the typewriter headline wraps (`comp-hero-constellation.png`).
6. **Headless-shell renderer hard-wedge on the aurora page** — bundled Playwright chromium (SwiftShader) hangs the tab permanently on `foundations/intro`; every CI-grade visual capture of the storybook must run a GPU-real channel. Latent CI trap.
7. **Markdown/spec-speak leakage** in blurbs and page prose (§4).
8. Minor: mobile FAB/dock collision; dark hover-pill > active-state loudness; "Pause/d" pill wrap; blob static slabs vs "pastel" prose; the paper-glass orphan card row; the repeated left-hugging dead right half on narrow-specimen pages.

## 8. Calibration — what is exceptional

Named as readily as the defects: the typography page; the display/card and glass-material backdrop strips; the dashboard composition; the two-dock chrome with its keyboard layer and PresetEditor; the table fixtures; the composables reference pages; the mobile aurora hero. The system's point of view (warm cream + mono eyebrows + cartoon shadows + the ℱ) is real and distinctive — nothing here is AI-slop sameness. The gap is not taste; it is that the storybook's most ambitious layer (live substrates under glass) is wired but not lit.

---

## 9. Pass-2 addendum — independent drive: quantification + new findings

A second independent drive of the same surface (44 captures in `captures/FD-storybook/`, a 104-route DOM sweep, targeted computed-style/pixel probes). It re-derived §2's diagnoses from scratch — the constellation `position: relative` specificity win → `1152×0` host → 300×150 canvas, the fourier canvas live-but-erased (1152×822, 360 non-blank samples behind the `oklab(…/0.8)` + `blur(16px)` plate), the glass-on-white variant collapse, the model-page status of display/card — so those stand corroborated. New material:

### 9.1 The sweep numbers (104 routes driven programmatically)

| measure | count |
|---|---|
| Pages in the glass-card chassis (`.story-hero-card` present) | **103/104** (the escape: `/substrates/aurora`, the full-bleed studio) |
| Pages declaring a background substrate | **9/104** |
| Declared substrates that visibly read | **1/9** (intro's aurora) |
| Exposed substrate margin around the glass card | **0×0 px on every page** — `.story-hero-card` fills `.story-hero` exactly |

The last row hardens §2's geometry note into an invariant: on no page does the substrate show AROUND the plate. "A glass card floating over a substrate" (the chassis's own header comment) never floats — there is no bleed, no offset, no negative space at full substrate strength. One spatial decision (an exposed gutter of even 1.5–2rem, or an asymmetric card offset on hero pages) is the prerequisite that makes every §6 placement readable.

### 9.2 New defects (extend the §7 ledger)

9. **Konami code: verified dead at runtime** (extends §5's grep). The full sequence dispatched live against the shell — zero DOM reaction (element count 298 → 298, no class change). The §5 inventory's "no hidden interactions" is now a runtime fact, not a static read.
10. **The `purple-tomato` hero palette is an orphan.** `demo/stories/aurora-hero.ts` mints it, documented as "auth-shell.vue brand panel" — grep confirms zero consumers. The auth-shell brand panel that was DESIGNED to carry a purple→tomato aurora ships white-on-white (its manifest row declares the invisible fourier instead). Un-orphaning it is §6's auth-shell row, pre-authored.
11. **Sub-AA prose on `substrates/glass-material`** — the intro section's 18px prose paints `color: rgb(108,106,96)` (muted-foreground) directly over the saturated cyan demo gradient, roughly 2.5–3:1. The W55 G2 class (content over a VERY LIGHT/busy backdrop), live on the very page that demonstrates adaptive tint. The page demonstrating the cure exhibits the disease.
12. **No dark-mode toggle in the shell chrome.** `DarkModeToggle` exists only on its own story page (`display/dark-mode-toggle`) — flipping the whole book dark requires knowing that page exists. The rail's `#persistent` region has room beside ℱ; a design system whose dark register is a selling point hides the switch.
13. **Intro hero dead space** (tall capture `T-01-intro-full.png`) — the category grid ends ≈55% down the hero card, leaving ~580px of empty aurora wash before the card bottom. Compounds §7.1: the front door's one interactive moment is dead AND the space below it is a void. The 4×2 category grid is also the book's one cookie-cutter moment — eight identical white boxes, no hierarchy among them.
14. **Aurora studio configurator runs under the BottomDock** (capture `06-substrate-aurora.png`) — the controls column's lower rows are occluded by the floating story dock; the studio (already the lone no-chassis, no-h1 page) also lacks the bottom-inset clearance `<main>` gives every chassis page.
15. **Hero pages double-header** — the chassis eyebrow/h1/blurb ("Intro / What this storybook is.") stacks directly above the hero card's own eyebrow/wordmark/headline: two headers saying the same thing within 100px on intro, hero, and auth-shell.

### 9.3 Convergent priority order (feeds W-SB1 / W-COHERE)

**§7.2 constellation fix → 9.1 exposed margin (unlocks grid/paper/fourier read-through) → §7.1 intro index → display/card's wallpaper well behind every glass specimen (buttons, paper-glass, glass-panel, dock ×3) → 9.2.11 over-light prose → 9.2.12 shell dark toggle → eggs (§5.1 ℱ-fourier redraw + §5.2 konami aurora — both pure shipped machinery).** The first two are small CSS/markup changes with outsized effect: they make already-declared design intent visible. The wallpaper well is the move that takes the book from competent component docs to the material demonstrating itself.
