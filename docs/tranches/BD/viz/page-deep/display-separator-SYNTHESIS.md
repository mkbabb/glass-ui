# display/separator — Pass-E SYNTHESIS (binding per-page verdict)

**Page:** `demo/stories/display/separator.vue` · **Import:** `@mkbabb/glass-ui/separator` · **Live:** `http://localhost:5173/display/separator`
**Component:** `src/components/ui/separator/Separator.vue` (reka `Separator` + the BC.W-SEPARATOR-FIX split-rule arm) · **Manifest:** `manifest.ts:771` → `CATEGORY_DEFAULT_BG.display = "paper"`
**Synthesized from:** `display-separator-{demo,design,component}.md`

---

## Reconciliation — where the three reports agree, conflict, and resolve

**Unanimous (all three):**
- The COMPONENT is correct-by-design and PRUNE-nothing. Separator is a deliberately-minimal **legibility-allowlist hairline** — warm `--separator-ink` (NOT grey `--border`, BA.W-NO-GRAY), `role="separator"`, the split-rule `─── or ───` flexbox is the right textbook transposition, the `bg-background` label chip is the **sanctioned opaque survivor** (not a missing-glass defect). It has NO four-state contract and NO six-layer composite BY DESIGN — do NOT "fix" it into glass.
- The PAGE is the headline failure: four flat cream-on-cream sub-sections, `canvas count = 0`, glass morphism structurally defeated (nothing high-frequency behind to lens), the √φ ladder used once then abandoned, ~95% static, zero color event, PAPER register absent. The user's seven asks are real and almost all unmet.

**Conflict (one, resolved):** the demo + design reports BOTH claimed the import chip already reads standardized `@mkbabb/glass-ui/separator`. The COMPONENT report (and the live SFC) is correct: the SFC import is the deep-relative `../../../src/components/ui/separator` — the **rendered chip** reads standardized (it is manifest-driven, `manifest.ts:248`) but the **source import** is not. Resolution: the visible label is already correct (no rendered-chip defect); the source-import standardization is a one-line SFC cleanup that rides the chassis-import sweep, NOT a blocker.

**Conflict (latent):** "each sub-section in its own glassy card" — demo says structurally met (each `StorySection` wraps a `Card`); design says structurally INCONSISTENT (two boxed, two bare CardContent on the outer plate) and none are GLASSY. Resolution: design is right at the gestalt — the bar is *glassy* cards over a live field, not opaque cream plates, and consistency matters. This folds into `W-PAGE-BACKGROUND` (tier-up + field) not a structural re-card.

**The KISS/DRY collapse:** nearly every finding is a SHARED Band-16 chassis fix already owned — separator is a near-pure consumer of the chassis waves, not a bespoke-redesign page. The ONE genuinely page-distinctive opportunity (the rule must DRAW + a typography display moment) is the only net-new design content, and even the draw-on rides the existing `.scroll-cascade` substrate.

---

## Ranked changes → tranche actions

### 1 — Stage over a live colorful aurora; tier-up each sub-section to glassy [the headline — AUGMENT]
The single move that answers four asks at once (own glassy card per section · bigger stage · glass-over-colorful-aurora · the §L1 six-layer composite actually lenses). This is the **dominant systemic miss** the Band-16 `W-PAGE-BACKGROUND` already owns (the `tier="field"` glass-over-live-field generalization across the 9 glass atoms on flat paper, separator named among them in `display.md`). Inner `Card`s drop to `tier="wash"`/`quiet` over a single contained `<Aurora>` (one-GL-per-route honored).
→ **AUGMENT `BD.W-PAGE-BACKGROUND`** — name `display/separator` as a live-field consumer + the inner-card tier-up. No bespoke re-roll.

### 2 — The rule must DRAW — the page-distinctive animation affordance [the one NEW design content — AUGMENT]
All three flag it; design + component converge on the exact move: a compositor-only **draw-on / scaleX-origin-center reveal** on the rule (and the split-rule's two segments growing outward from the label chip) on `--spring-snappy`/`--spring-smooth`, PRM-static, riding the W-SCROLL-MOTION `.scroll-cascade` page-build. A 1px line is the EASIEST distinctive animation in the library and it sits dead. This is the only finding that is genuinely page-bespoke (a `.separator-draw`/`.split-rule-grow` recipe class is the one src artifact — library-owned, ≥2 consumers: any cascade-entering rule).
→ **AUGMENT `BD.W-SCROLL-MOTION` / the cascade-entrance arm** with an OPT-IN `data-reveal` draw-on for `Separator` (additive default-off, PRM-static). The recipe class rides that wave's own gate.

### 3 — `label→heading` section re-key [the dominant per-page arm — FOLD]
The page uses `<StorySection label=>` (mono eyebrow) only — zero semantic `<h2>`/`text-subheading`, the "no section affordance" read all three name. This is the genuinely-per-page arm `display.md` already routes.
→ **FOLD into `BD.W-PAGE-CHASSIS`** (the `label→heading` re-key, the per-page arm of the chassis wave) — re-key the four sections to `heading=`.

### 4 — Header over-scaled + missing header→body rule [FOLD · pure chassis]
The masthead is strong but rides the over-scaled demo header rung (chassis-wide defect) and there is no header/body dividing line — both ONE-chassis-edit Band-16 fixes, not separator-specific.
→ **FOLD into `BD.W-HEADER-SCALE`** (halve the rung) + **`BD.W-PAGE-CHASSIS`** (`--story-header-rule`). Zero separator-page work — it inherits.

### 5 — Bigger main card area / kill the right gutter [FOLD · chassis]
The full-width rule wants the screen; the demo notes the large empty right gutter. Systemic, chassis-owned.
→ **FOLD into `BD.W-PAGE-CHASSIS`** (the StoryPage max-inline + body-width arm). Inherited.

### 6 — Standardize the source import + tighten copy [FOLD · trivial]
SFC import `../../../src/components/ui/separator` → `@mkbabb/glass-ui/separator` (rendered chip already correct). Filler copy ("Paragraph above the rule." / "Docs · API · Playground · Changelog") is already terse — minimal tighten.
→ **FOLD into `BD.W-PAGE-OFFTOKEN-SWEEP`** (the import-label + copy-sweep arm). One-line SFC, component byte-untouched.

### 7 — Contextual-switch composition (dock/tabs orientation·label·density switcher) [the "series of components" bar — AUGMENT, scoped]
Demo + design both want a `<SegmentedTabs>`/`<ToggleGroup>`/`<DockStack mode="facets">` driving a live H↔V orientation morph on the hero specimen — turning the static gallery into a parametric instrument (the user's "deftly uses a series of components" + "leverage the dock APIs" asks). This is real and genuinely page-level, but it is the *most-build* item and is OPTIONAL polish, not a correctness bar.
→ **AUGMENT `BD.W-PAGE-BACKGROUND`'s separator consumer** with a small `<SegmentedTabs>` orientation switcher over the hero specimen (composes the live re-render + a 2nd component). The H↔V morph reuses the shipped View-Transitions / `--dock-morph-t` substrate — no new engine. KEEP-able if loop budget is tight (it is the lowest-correctness, highest-effort item).

### 8 — A typography display moment + one color event + a paper specimen [the distinctiveness lift — KEEP/absorb]
Design's strongest aesthetic notes: a giant `text-display` `or` straddling a split-rule (the √φ ladder used >once); ONE `useBorderSpectrum` OKLCH gradient-spectrum rule (the proportionate `proof:suffuse` color event); a `paper-grain`/blueprint separator specimen (the separator's most-native register, DESIGN's GLASS+PAPER mandate). These are the bespoke-premium ceiling.
→ **ABSORB into #1/#2** — the display `or` specimen + the paper-register card land inside the `W-PAGE-BACKGROUND` separator composition (the field stage + the tier-up are the prerequisites); the spectrum-rule + paper-grain are demo-private composition under that same consumer arm. No separate wave — the page rework is small enough that these are the *content* of the field-stage rework, not a new gate.

### 9 — Gestalt-roster enroll [MODIFY · close-oracle prerequisite]
`display/separator` must carry a `proof:ba-gestalt` verdict row to gate the redesigned page's close (both modes + a dark-mode capture note — the warm `--separator-ink` vs grey distinction reads MOST in dark, the primitive's identity witness all three flag).
→ **MODIFY `BD.W-GESTALT-ROSTER-GROW`** — add the `display/separator` row (both modes + the dark-witness note).

---

## Tranche-action summary

| # | Change | Action | Wave |
|---|---|---|---|
| 1 | Live aurora field + inner cards → glass tiers | **AUGMENT** | `BD.W-PAGE-BACKGROUND` (name separator consumer) |
| 2 | The rule DRAWS (draw-on/scaleX, split-rule grow) | **AUGMENT** | `BD.W-SCROLL-MOTION` (cascade-entrance arm; opt-in recipe) |
| 3 | `label→heading` section re-key | **FOLD** | `BD.W-PAGE-CHASSIS` (per-page arm) |
| 4 | Header scale + header→body rule | **FOLD** | `BD.W-HEADER-SCALE` + `BD.W-PAGE-CHASSIS` |
| 5 | Bigger main area / kill right gutter | **FOLD** | `BD.W-PAGE-CHASSIS` |
| 6 | Standardize source import + tighten copy | **FOLD** | `BD.W-PAGE-OFFTOKEN-SWEEP` |
| 7 | Orientation/label switcher (dock/tabs contextual) | **AUGMENT** | `BD.W-PAGE-BACKGROUND` separator consumer (KEEP-able) |
| 8 | Display `or` specimen + spectrum rule + paper register | **ABSORB** | into #1/#2 (demo-private composition) |
| 9 | Gestalt-roster enroll (+ dark witness) | **MODIFY** | `BD.W-GESTALT-ROSTER-GROW` |

**No NEW wave. No PRUNE. No FOLD-NEW-COMPONENT, no src-component edit.** The separator component is correct-by-design (allowlist hairline) and byte-untouched. Every finding is demo-layer or shared-chassis. The ONE src artifact is the opt-in `Separator` draw-on recipe class (#2), which rides `BD.W-SCROLL-MOTION`'s gate. This is a **pure consumer of the Band-16 chassis fixes** plus one small bespoke draw-on — NOT a page needing its own redesign wave (unlike `motion/deck`'s `W-DECK-KEYNOTE`), because the separator subject carries no composition complexity (no transport, no directional slide, no windowing). The DRY lever is maximal here: fix the chassis once, separator inherits 4 of its 6 structural asks.

**Anti-overfit note:** the draw-on recipe (#2) earns its keep as the general cascade-entrance reveal for ANY rule (≥2 consumers: this page + every `.scroll-cascade`-entering separator across the storybook); it is not a separator-page-only artifact.

---

## Convergence call

**CLOSE-ADJACENT — needs ~1 redesign loop, not several.** Unlike the worst Pass-E pages (deck, the substrate redesigns), separator has NO net-new component work, NO new engine, NO composition complexity — the component is done and PRUNE-nothing, and 4 of the 6 structural asks land for FREE via the Band-16 chassis fixes the wave roster already owns. The bespoke content (#1 field stage + tier-up, #2 draw-on, #8 the `or` display specimen + paper register) is a single small composition pass. **Loop 1:** AUGMENT `W-PAGE-BACKGROUND` to stage separator over a contained aurora + tier-up the inner cards + drop in the display `or` specimen and the paper-register card; the `label→heading` re-key + import-label + header inherit from the chassis waves. **Loop 2 (if needed):** wire the draw-on reveal (#2) + the optional orientation switcher (#7), then re-earn the gestalt verdict on a fresh capture (both modes + dark witness) via `W-GESTALT-ROSTER-GROW`. The strong masthead + the BC split-rule are already converged — build the rest up to their bar. The risk is OVER-building a humble primitive's page; hold the line at one premium color event + one display moment + the field stage (the `proof:suffuse` proportion fence).
