# Pass-E SYNTHESIS — `motion/deck` (the binding per-page verdict)

- **Import path (standardized):** `@mkbabb/glass-ui/deck` — the chrome chip already renders this label (verified, `manifest.ts:316`); the SFC's deep relative import (`../../../src/components/custom/deck`, `deck.vue:19`) is the in-repo exerciser convention every sibling shares (NOT a label defect). The path-label ask is ALREADY SATISFIED on this page. No change.
- **SFC:** `demo/stories/motion/deck.vue` (136 lines) · **src register:** `src/components/custom/deck/` — `useDeck` · `useDeckKeyboard` · `useDeckSpring`/`installDeckSpring` · `<DeckPager>` (→ `<PagerDots>`). Subpath barrel `src/deck.ts`.
- **Inputs reconciled:** demo (meta-storybook), design (frontend-design), component (src-register) auditors — all three independently converge.

---

## The reconciled verdict (one paragraph)

The `/deck` **headless core is architecturally correct and must NOT be touched** — all three auditors agree: one spring (`DECK_SPRING` = `.smooth`, the same `(response, ζ)` row `--spring-smooth` derives from), one pager oracle (`pagerWindow` via `<DeckPager>`→`<PagerDots>`, zero re-fork), one pure keyboard handler, a lazy keyframes count-up (SCC-trap-correct), PRM-correct, Safari-safe, compositor-only. **Zero src defect, zero legacy, zero dual-path.** The failure is entirely at the **PAGE-COMPOSITION layer**, and it is the most acute in the motion band: this is the library's *presentation register* — the canonical keynote surface — rendered as a 224px (`min-block-size: 14rem`) grey `glass-quiet` letterbox-strip floating in a sea of empty card, over a near-dead monochrome constellation, with bare ghost-text Prev/Next, ~6px afterthought pager dots, a 53px slide title that reads as a card heading not a slide, and an API-reciting blurb shown three times. It fails FIVE of the user's explicit bars (no colorful aurora · no per-section glassy cards · main card not bigger · no dock-API contextual-switching · no component series) and its own README identity (it sells "full-viewport presentation" and ships a thin band). The redesign is a gestalt rebuild — it earns its own NEW Band-7 wave, the established sibling pattern (`W-MOTION-GALLERY-REDESIGN`/`W-COUNTUP-ENTER-GATE`/`W-SCROLL-CHROME-SPRING`/`W-MOTION-PAGE-LIQUID`).

**Conflict resolved — the phantom-wave miscite.** The COMPONENT report maps its findings onto `BD.W-LIQUID-ENTRANCE-GENERAL` and `BD.W-STORY-PAGE-STANDARD` as "already-drafted Band-17 waves." **Neither exists in the wave roster** (`ls waves/` confirms — they are PROTOTYPE-FIXES draft names that never became waves; the real chassis family is the ADDENDUM Band-16 set: `W-PAGE-BACKGROUND`/`W-HEADER-SCALE`/`W-PAGE-CHASSIS`/`W-CONFIG-GALLERY-DOCK`). The DEMO + DESIGN reports describe the redesign but map nothing. Resolution below re-homes every finding onto a REAL wave: a NEW Band-7 `BD.W-DECK-KEYNOTE` owns the page gestalt rebuild (aurora-field · per-section glassy cards · bigger stage · dock-transport · directional liquid slide), three shared Band-16/9 chassis waves AUGMENT to enroll this page, and the prose-tighten FOLDs into the existing copy arm.

---

## RANKED changes (by impact) + tranche action

### 1 — Bigger stage as the hero, over a COLORFUL violet aurora [NEW · highest leverage · 2 user mandates at once]
The single most-cited move (all three reports) and the root cause of the grey-slab gestalt. The stage is `min-block-size: 14rem` → a 224px strip letterboxing a "full-viewport PRESENTATION register"; lift it to `min-block-size: clamp(20rem, 50dvh, 34rem)` and promote `glass-quiet` → `glass-resting` (the hero tier). It reads grey *because there is nothing colorful to refract* — the field is the monochrome `motion → constellation` default (DESIGN.md §L1: a lens over a flat field is iOS-7-flat). Override the route bg to a **violet-seeded `<Aurora>`** (the `--motion-accent`/`--viz-legendre` family hue — the natural keynote seed), offscreen-paused, one-GL-per-route. This single move satisfies "main card BIGGER" + "COLORFUL aurora backgrounds" + makes the six-layer composite actually read.
→ **NEW: `BD.W-DECK-KEYNOTE` (Band 7).** Gate: stage `min-block-size` ≥ `20rem`; route bg resolves a colorful canvas (NOT constellation); the live π asserts the stage's composited fill is NOT grey (OKLab chroma floor, both modes) over a full-bleed field.

### 2 — Each teaching surface in its OWN glassy sub-card [NEW · user mandate]
All 6 slides + the controls + the announcer live in ONE undifferentiated column (`distinctGlassCards` in body = 1, live). Split into THREE distinct glass cards the ask names: the BIG `glass-resting` **STAGE** (hero), a `glass-floating` **CONTROL DOCK** (move #3), and a `glass-quiet` **CONTRACT aside** (the live keyboard map + the visible "Slide N of M" aria readout — the announcer made visible). Each gets a `--glass-accent` motion-violet rim (BB.W-GLASS-ACCENT) so the band identity rides the rim. CRITICAL fence: route the slide-on-stage composition through ONE container — the active slide must stay transparent inside the glass stage (never a second `backdrop-filter` tier — the `glass-cannot-sample-glass` trap, DESIGN.md §L1).
→ **NEW: `BD.W-DECK-KEYNOTE` (Band 7), same wave.** Gate: 3 distinct glass cards at ≥2 tiers + a non-zero `--glass-accent` per card + a single-composition-container assert (no nested `backdrop-filter`).

### 3 — Make the controls a REAL `<GlassDock>` transport + leverage dock contextual-switching [NEW · user mandate, the explicitly-named ask]
The deck's controls ARE a dock by nature — the canonical home for the dock APIs the brief names. Replace the bare ghost Prev/dots/Next row with a `glass-floating` `<GlassDock>` presentation strip: chevron `<DockIconButton>`s (first/prev/next/last) · the `<DeckPager>` riding inside · a play/pause. Drive a `<DockStack mode="facets">` (or `<DockLayerGroup>`) off the slide index so the dock MORPHS/animates as the deck advances — the literal "leverage the dock APIs (contextual switching/animating)" mandate, and the canonical affordance showcase (HOVER-LIFT · GLEAM-TRACK · PRESS-SQUISH per affordance-map). The chevrons get the real four-state press floor the ghost buttons only weakly carry.
→ **NEW: `BD.W-DECK-KEYNOTE` (Band 7), same wave.** Gate: a `<GlassDock>` hosts the transport + a `<DockStack mode="facets">`/`<DockLayerGroup>` is wired to `deck.index` + `<DeckPager>` rides inside the dock + ≥3 affordance primitives present on the chevrons.

### 4 — A directional, depth-aware liquid slide transition [NEW · the iOS-27 keynote bar · the deepest motion failure]
This is a `--spring-deck` page that never SHOWS the spring. The slide enter is a flat `translateX(2rem)+opacity` cross-fade — honest + PRM-carved, but the MINIMUM viable transition, and it DISCARDS the direction `onChange(to, from)` already carries (prev and next both enter from the right). Author the iOS-27 keynote move: read `to − from` sign into a `--deck-dir` custom property; outgoing slide recedes + blurs (`filter` blur-settle, motion-canon P3 fade-coupled-to-transform), incoming blooms FROM the advance direction via the `useLiquidReveal`/spring source-rect with a volume-preserving ≈0.88 squish + overshoot — the generalized liquid-entrance the family already owns. Expose it as a LIBRARY-owned `.glass-deck-slide` `data-state="active|inactive"` recipe class the demo composes (NOT a per-demo scoped-CSS transition) so the entrance ships once and the direction bakes in.
→ **NEW: `BD.W-DECK-KEYNOTE` (Band 7), same wave** (the directional-liquid-slide clause — a library `.glass-deck-slide` recipe + `--deck-dir` off `onChange`). Gate: the slide recipe is library-owned (not demo scoped-CSS), reads `--deck-dir`, couples a `filter` blur-settle on the spring clock, PRM-keeps-fade-drops-transform. **Note:** the component report's F1/F2 routed this to the phantom `W-LIQUID-ENTRANCE-GENERAL`; re-homed here (the deck-slide recipe is deck-specific enough to live in its own keynote wave, and there is no general-entrance wave to AUGMENT).

### 5 — Real windowing: bump slide count + the progress affordance [NEW/FOLD · API completeness]
`:window-fit="6"` on a 6-slide deck windows NOTHING — the windowing oracle (the whole point of `<DeckPager>` over a flat dot row) is invisible, a dead parameter for the feature it names. Bump to 10–14 slides (or `:window-fit="5"`) so the windowed dots + focus-survival-across-recompute the README sells actually demonstrate. AND render the unshown first-class API member `deck.progress` — a `<BorderProgress coverage="bottom-edge">` ring on the stage card (a first-class component pairing) driven by `deck.progress`, which also exercises the lazy count-up easing (F3, currently unconsumed). The active pager dot becomes a confident `--motion-accent` violet pill that GLIDES (the PagerDots glide register), not a 6px grey afterthought.
→ **FOLD into `BD.W-DECK-KEYNOTE` (Band 7).** Gate: ≥10 slides (windowing live) + `deck.progress` rendered as a real component + the active dot is the violet glide pill.

### 6 — Entrance choreography (the page ASSEMBLES) [FOLD · user mandate]
No entrance choreography — the stage/dock/first-slide don't stagger in. `.scroll-cascade` the stage→dock→first-slide assembly (the chassis gives `.scroll-build` for free but the deck's own elements are inert). A deck should ASSEMBLE: stage settles, control-dock slides up, first slide blooms.
→ **FOLD into `BD.W-DECK-KEYNOTE` (Band 7).** Gate: ≥3 staggered entrance beats wired (compositor-only, PRM-static-terminal).

### 7 — Tighten the blurb; KEEP the slide bodies [FOLD · user mandate]
The section blurb recites the entire anatomy ("useDeck owns the headless index + progress + the 'Slide N of M' announcer; useDeckKeyboard pages on Arrow/Space/digit… `<DeckPager>` windows the dots over PagerDots' ONE oracle") — a commit message shown THREE times (hero blurb → section blurb → README echo), with caps-for-emphasis ("DISTINCT"/"PRESENTATION"/"ONE oracle"). Cut to one distinguishing line: *"A keyboard-paged presentation deck — Arrow/Space to advance, digits to jump, focus-guarded so controls inside a slide still work."* Also split the `manifest.ts:1100` comma-spliced run-on hero blurb. KEEP the per-slide bodies (they teach the keyboard contract concisely — they are good).
→ **FOLD into `BD.W-PAGE-OFFTOKEN-SWEEP`** (the demo-copy tighten arm) for the blurb prose; the chip-label is already correct (no action). The blurb edit also lands free inside `BD.W-DECK-KEYNOTE` since the page opens for redesign — assign to OFFTOKEN to keep the copy-sweep band coherent across pages.

### 8 — Bigger-stage + aurora-field enroll on the shared chassis waves [AUGMENT · the KISS/DRY lever]
The bigger-stage + colorful-field asks are the SHARED-chassis moves the ADDENDUM Band-16 waves already own — the deck is one of the worst misses, so it enrolls explicitly. `W-HEADER-SCALE` (the demo header is over-scaled chassis-wide) and `W-PAGE-BACKGROUND` (stage ALL glass demos over a live field — the user's core glass ask) should NAME `motion/deck` as a consumer so the chassis fix propagates here, not a deck-bespoke re-roll.
→ **AUGMENT: `BD.W-PAGE-BACKGROUND`** (name `motion/deck` as a live-aurora-field consumer — the deck stage is the strongest case) + **`BD.W-HEADER-SCALE`** (the deck inherits the halved header rung). The deck-SPECIFIC composition (dock transport · directional slide · per-section cards) stays in `BD.W-DECK-KEYNOTE`; the systemic chassis moves ride the Band-16 waves.

### 9 — Enroll the gestalt roster [MODIFY · close-oracle prerequisite]
`motion/deck` is not in the gestalt roster — it blocks the close oracle for this redesigned page. Add the row (both modes + a "Next-pressed mid-transition" capture note so the directional slide is captured, not just the rest frame).
→ **MODIFY: `BD.W-GESTALT-ROSTER-GROW`** — add the `motion/deck` row (both modes + the in-transition capture note).

### 10 — In-slide focus-guard cue [KEEP · note]
The in-slide `<Button variant="default">` (slide 3, the focus-guard demo) tells the "Tab then Space activates, never pages" story in prose but makes it weakly demonstrable. A small visual focus-guard callout would help, but it is minor — folds free into the per-section CONTRACT card (#2) where the live keyboard map lives.
→ **KEEP**, absorbed by the CONTRACT card in `BD.W-DECK-KEYNOTE` (#2). No separate action.

---

## Tranche-action summary

| # | Change | Action | Wave |
|---|---|---|---|
| 1 | Bigger stage + colorful violet aurora field | **NEW** | `BD.W-DECK-KEYNOTE` (Band 7) |
| 2 | Per-section glassy sub-cards, tiered + accent rim | **NEW** | `BD.W-DECK-KEYNOTE` |
| 3 | `<GlassDock>` transport + dock contextual-switching | **NEW** | `BD.W-DECK-KEYNOTE` |
| 4 | Directional depth-aware liquid slide (`--deck-dir` + `.glass-deck-slide`) | **NEW** | `BD.W-DECK-KEYNOTE` (re-homed off phantom `W-LIQUID-ENTRANCE-GENERAL`) |
| 5 | Real windowing (≥10 slides) + render `deck.progress` + violet glide pager | **FOLD** | `BD.W-DECK-KEYNOTE` |
| 6 | Entrance choreography (`.scroll-cascade` assembly) | **FOLD** | `BD.W-DECK-KEYNOTE` |
| 7 | Tighten the API-reciting blurb (keep slide bodies) | **FOLD** | `BD.W-PAGE-OFFTOKEN-SWEEP` (copy arm) |
| 8 | Enroll on the shared chassis fixes | **AUGMENT** | `BD.W-PAGE-BACKGROUND` + `BD.W-HEADER-SCALE` |
| 9 | Gestalt-roster enroll | **MODIFY** | `BD.W-GESTALT-ROSTER-GROW` |
| 10 | In-slide focus-guard cue | **KEEP** | absorbed by #2 CONTRACT card |

**No PRUNE, no FOLD-NEW-COMPONENT.** The deck headless core ships clean — every finding is demo-modernization. **No src paint** EXCEPT the library-owned `.glass-deck-slide` recipe class (#4, `src/styles/` — the deck-slide entrance recipe + `--deck-dir`), which rides `BD.W-DECK-KEYNOTE`'s own gate; everything else is demo-private composition.

**Why a NEW Band-7 wave (`BD.W-DECK-KEYNOTE`):** the deck page needs a *gestalt rebuild* (new aurora field · new card topology · new dock composition · new directional slide recipe · new windowing) — a different kind of work than the zero-paint Band-16 chassis drains. This matches the established sibling pattern exactly: every motion page that needs a redesign got its OWN Band-7 NEW wave (`W-MOTION-GALLERY-REDESIGN`, `W-COUNTUP-ENTER-GATE`, `W-SCROLL-CHROME-SPRING`, `W-MOTION-PAGE-LIQUID`). `BD.W-DECK-KEYNOTE` is the deck's member of that family. **Anti-overfit note:** the wave's redesign primitives (per-section tiered cards · dock-transport · directional slide recipe · aurora-field) are shared chassis moves the other motion-band redesign waves also use — the `.glass-deck-slide` recipe is the one deck-specific src artifact, and it earns its keep as the keynote-slide register a consumer building a real deck reuses (≥2 consumers: the demo + any consumer presentation app — the README's stated lift-boundary client).

---

## Convergence call

**NOT close — needs a full redesign loop (≈2-3 iterations).** This is one of the least-converged motion pages: the component is done, but the page composition fails 5 of the user's explicit bars and under-presents the library's most identity-defining register (the keynote/presentation surface). The redesign is substantial — new wave + dock-transport composition + directional liquid slide recipe (the one src artifact) + aurora field + per-section cards + windowing bump. Expect: **loop 1** lands the `BD.W-DECK-KEYNOTE` skeleton + the aurora field + the bigger `glass-resting` stage + the three tiered cards; **loop 2** wires the `<GlassDock>` transport + dock facet-switch + the `.glass-deck-slide` directional recipe + the windowing bump + `deck.progress`; **loop 3** re-earns the gestalt verdict on a fresh capture (both modes + the in-transition frame) via `W-GESTALT-ROSTER-GROW`. The one converged element is the hero masthead (the audacious display `<h1>` + the `@mkbabb/glass-ui/deck` chip) — keep it, build the keynote up to its bar.
