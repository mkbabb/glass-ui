# BD viz/glass/dock EXPANSION — CRITIQUE: D8 full-design-language congruence

**Lane** BD viz / critique / design-language-congruence · **Status** ADVERSARIAL CRITIQUE 2026-06-22 · **Branch** `prototype/liquid-dock` · **Scope** PLANNING AUDIT — zero `src/` edits, WRITE-only.
**Audited:** `VIZ-BAND-PLAN.md` (D1-D9 + V0-V4 roster + critique-fold pass 1) · `VIZ-DAG.md` · `fleet2/{glass-ios27-every-element,maps-card-expand,dock-sequence-hallmark,glass-ios27-buttons-icons-controls}.md` · `research/viz-configurator-pattern.md` · the converged `union/{SEED,UNIFIED-ROSTER}.md` · the codebase design-language tokens (`typography/scale.css`, `Card.vue` golden ladder, `configurator.css`, `StoryHero.vue`/`StoryPage.vue`, the on-disk `VizStudio.vue` prototype).
**Verdict bar:** is the WHOLE V-expansion congruent to the FULL design language (5 pillars), or GLASS-ONLY-MYOPIC?

---

## 0. The one-line verdict

**The V-expansion is GLASS-AND-GENERATIVE-RICH but PAPER-BLIND, TYPE-INCIDENTAL, and GOLDEN-RATIO-SILENT.** Pillars (1)/(3) are load-bearing in every wave spec; pillars (2)/(4)/(5) appear ONLY in D8's own prose sentence (`VIZ-BAND-PLAN.md:37`) and are NOWHERE wired into a wave mechanism, a surface design, or a gate. The congruence the prototype accidentally HAS (StoryPage carries the masthead) is **incidental, not contractual** — nothing in the V-spec guarantees it, and `proof:design-language-congruence` is NAMED once and never DESIGNED. D8 is asserted as a fence, never built as a truth — the exact disease the dock-sequence wave was written to kill, recurring one level up at the design-language axis.

---

## 1. The grounding — what the FULL design language actually is (so "congruent" is decidable)

The five pillars are not adjectives; each has a CONCRETE token/register home in `src/`:

| Pillar | Concrete register (the decidable anchor) |
|---|---|
| (1) GLASS morphism | `--glass-*` 5-rung ladder · `--glass-level`/`--glass-depth` · W55 adaptive tint · `.glass-lens` · the iOS-27 directional rim |
| (2) PAPER morphism | `paper.css` (`paper-grain-overlay`/`paper-underpaint`) · `scale-paper.css` blueprint-grid · `.paper-ink-mark` 2px ink hairline · `math-paper.vue` gold-standard (the `border-l-[3px]` section-rail + fira-code math) |
| (3) GENERATIVE backgrounds | the viz suite IS the substrate · `CATEGORY_DEFAULT_BG` per-category map · one-GL-per-route budget |
| (4) AUDACIOUS √φ TYPE | `text-display-{1..5,mega,hero,audacious}` · `--type-tracking-display: -0.015em` (BB.W-DISPLAY-TRACKING Apple −1.5%) · `--type-leading-display: 1.05` · the `heroScale ≥ 4` per-route masthead |
| (5) GOLDEN-RATIO (√φ) | `Card.vue` card-pad ladder (`inline × 1.272` / `÷1.618` / `÷2.618`) · `--type-*` √φ scale · `--space-phi-*` cadence · `--configurator-section-*`/`--configurator-preset-row-*` hierarchy |

**Test for each V-surface:** does it READ these named registers, or does it style ad-hoc? That is the only honest congruence test — and it is the one `proof:design-language-congruence` must encode.

---

## 2. THE INCONGRUENCES — ruthless, per pillar

### INC-1 (PAPER, the biggest hole) — the V-expansion is ALL-GLASS; paper is mentioned in zero surface designs

D8 says "the viz studios + content surfaces use PAPER where the gestalt calls for it, never all-glass." Then **every single fleet2/research surface doc is glass-only:**
- `viz-configurator-pattern.md` — the `<VizStudio>` chassis: `<Configurator>` aside + stage + schema rows. ZERO paper. The configurator aside is a glass plate; nothing routes the calm content/control surfaces to the paper-grain/blueprint register the `math-paper.vue` gold-standard establishes.
- `maps-card-expand.md` — the sheet, the list-rows, the icon-chips, the search-pill, the control discs: ALL glass (`.glass-menu-row`/`.input-pill`/`<GlassControl>`/`--glass-opacity-sheet`). A frosted SHEET full of CONTENT (Recents, Guides, Favorites — a list, a document) is the EXACT case where the gestalt calls for a paper-grain underpaint under the glass plate (the iOS sheet content reads on a near-paper substrate, not raw glass-on-map). Zero paper consideration.
- `dock-sequence-hallmark.md` — the dock floats on a live ALBUM field. Fine for the dock chrome. But the dock-hero CAPTURE surfaces and the search-FIELD terminus (a list of results — content) carry no paper register where a results-list gestalt would call for it.
- The `W-CONCENTRIC-LEVELSET`/`W-PAPERGRID-WARP` viz are "paper-grid"/"ink" by NAME but that is the viz's INK STROKE (the `contourInk`), NOT the paper-morphism design register — a category confusion the plan never disambiguates (the ink-on-transparent viz output ≠ the `.paper-ink-mark` structural register ≠ the `paper-grain-overlay` surface wash). **THE THREE-INK-REGISTER FENCE (BA.W-HANDMARK) is the existing precedent the plan ignores** — there are distinct ink registers and conflating them is a known trap.

**The miss:** the V-expansion treats glass as the universal surface. The library's identity is glass-AND-paper (the `math-paper.vue` calm-content idiom, the `<ShowcaseFrame tier="field">` paper-wash, the W-STAGE `paper`/`grid` per-category washes). A studio's CALM content/control column, a results-list terminus, a content-bearing sheet — these are where paper belongs. **No V-wave names a paper surface.** All-glass IS the incongruence D8 forbids.

### INC-2 (AUDACIOUS TYPE, incidental-not-contractual) — the masthead is inherited by accident, asserted by nothing

The GOOD news: the on-disk `VizStudio.vue` prototype composes `<StoryPage>`, which carries the `heroScale ≥ 4` audacious display masthead (BC.W-PAGE-CHASSIS). So the current prototype IS type-congruent. **The BAD news: nothing in the V-spec REQUIRES it.**
- `viz-configurator-pattern.md §2a` shows `<StoryHero> → <Configurator>` but never states the masthead is load-bearing, never names `heroScale`, never asserts the studio ACTIVATES the audacious tier. A future executor reading the PLAN (not the prototype) builds a `<VizStudio>` with a plain `text-heading` title and is spec-compliant.
- `proof:viz-configurator` (the named gate, `viz-configurator-pattern.md §7`) asserts "≥1 row per Field/Color/Motion group + `useConfiguratorState`" — it asserts the CONTROLS shape, NOT the display masthead. A studio could pass that gate with body-type everywhere.
- `maps-card-expand.md` — the sheet has a `Places`/`Recents`/`Your Guides` HEADER structure but specs ZERO type register. An expandable sheet hero is a prime audacious-type moment (the sheet title is a display-rung opportunity); the spec defaults it to body type by silence.
- `dock-sequence-hallmark.md` — the dock-hero capture surfaces name no type register at all.

**The miss:** the audacious-√φ-type pillar is satisfied incidentally by `StoryPage` composition on EXISTING studios, and is UN-SPECIFIED on every NEW surface (the sheet, the dock-hero, the configurator headings). D8 says "the studios + hero surfaces ACTIVATE the audacious tiers" — the plan never makes that a clause. Incidental ≠ congruent; the BB-disease law (every wave proves its own truth) demands it be asserted, not inherited-by-luck.

### INC-3 (GOLDEN-RATIO, totally silent) — not one V-surface reads the √φ card-pad ladder or names a √φ token

This is the cleanest miss. **Zero** of `VIZ-BAND-PLAN.md` / `viz-configurator-pattern.md` / `maps-card-expand.md` / `dock-sequence-hallmark.md` mentions `card-pad`, `1.272`, `1.618`, `2.618`, `--space-phi-*`, or the golden padding ladder (verified by grep — only `9.81`/`√(g·k)` wave-math φ-adjacent noise, no DESIGN-√φ).
- `maps-card-expand.md` — the sheet is a CARD that expands. It is the textbook consumer of the `Card.vue` golden card-pad ladder (`--card-pad-inline`/`-block`/`-section-gap`/`-footer`). The spec specs the MORPH (reserved-footprint grow, backdrop dim, content cascade) in fine frame-matched detail — and says NOTHING about the sheet's internal padding reading the golden ladder. It will be ad-hoc `p-4`/`p-6` by default. **The richest geometry surface in the expansion is golden-ratio-blind.**
- `viz-configurator-pattern.md` — the configurator already HAS its golden hierarchy (`--configurator-section-*` is the √φ subheading rung, AZ.W-HIERARCHY). But `<VizStudio>` is a NEW chassis wrapping it; the plan never asserts VizStudio inherits the configurator golden hierarchy OR the card-pad ladder for its stage/aside cells. The stage tile and the controls aside will be ad-hoc-padded.
- `dock-sequence-hallmark.md` — the search-field terminus, the sub-dock, the now-playing pill: no √φ radius/padding/spacing register named. The dock has its OWN `--dock-scale` geometry cascade (that's fine), but the BLOOMED surfaces (the search field, the card-sheet) escape into the general √φ system and the plan never routes them there.

**The miss:** golden-ratio is THE most pervasive identity claim ("√φ EVERYTHING — radii · font · margins · spacing · cards · hierarchy") and it is the LEAST present in the V-spec. Every new content surface (sheet, search field, studio cells, sub-dock panels) will default to Tailwind `p-N`/`rounded-N` ad-hoc px — the exact "ad-hoc styling" D8's gate-name forbids.

### INC-4 (the gate is vapor) — `proof:design-language-congruence` is named once, designed never

`VIZ-BAND-PLAN.md:37` and `:110` name `proof:design-language-congruence` as the machine-lock. **It has no clauses, no roster, no self-test, no owning wave in the DAG.** `VIZ-DAG.md` never places it. Contrast every OTHER D-decision: D1→`proof:gpu-only-spine` (G1-G7), D2→`proof:wave-field-single`, D3→`proof:emotional-state`/`proof:lava-field`, D9→`proof:dock-hub` — all have clause structure. D8 alone is a gate-name with no gate. A gate that does not exist cannot fail; D8 is currently un-enforceable prose.

### INC-5 (one-GL-per-route, a latent budget collision the VizStudio fold introduces) — pillar (3) at risk

Pillar (3)'s discipline is "one live GPU context per route." The `substrates` category DEFAULTS to a live `aurora` background (`CATEGORY_DEFAULT_BG.substrates = "aurora"`, manifest.ts:183). A `<VizStudio>` for, say, the blob puts a LIVE blob GL context as its STAGE hero **on a route whose category background is ALSO a live aurora** → TWO live contexts. The existing studios dodge this because `StoryHero`/`StoryPage` resolves the per-route background and the studios self-stage (the blob hero IS the route's one context, no second aurora). **But `viz-configurator-pattern.md` never states VizStudio MUST self-stage / suppress the category aurora** — it specs the schema fan-out and is silent on the GL budget. A naive `<VizStudio>` migration that keeps the category-default aurora AND mounts a live viz stage breaches the budget on all 10 studios at once. The perf-budget arch (`arch/perf-budget.md` P1) has the census, but the VizStudio plan does not WIRE to it. Pillar (3) is load-bearing in the gate but UN-CITED in the chassis that touches every viz route.

### INC-6 (the "richer-than-reference" bar applied only to glass) — D8's congruence is not in the hallmark bar

`dock-sequence-hallmark.md §close` defines the cross-cutting hallmark bar: "liquid CONTINUITY · MATERIAL HIERARCHY · ALBUM REACTIVITY · ONE ORGANISM · SAFARI-FIRST · COMPOSITOR-ONLY · PRM-SAFE." Six glass/motion criteria, ZERO design-language-breadth criterion. The "a viewer cannot tell which is iOS-27 — and where they differ, glass-ui is RICHER" verdict is measured purely on glass/motion fidelity. But glass-ui's RICHER claim over Apple is precisely the OTHER pillars — the audacious √φ type, the paper morphism, the generative substrate. The hallmark bar omits the exact axes that make glass-ui distinct from a faithful Apple clone. **D8 is absent from the bar that decides the hallmark.**

---

## 3. What IS congruent (fairness — the expansion is not a write-off)

- **(1) GLASS** — exhaustively load-bearing: the iOS-27 token-delta map (D1-D5), the element census (92 packages), the directional-rim re-point, the de-shadcn ledger. This pillar is the spec's spine. PASS.
- **(3) GENERATIVE** — the viz suite IS the substrate; the one-GL-per-route budget has an arch + a census gate. The pillar is present (modulo INC-5's VizStudio-fold gap). MOSTLY PASS.
- The prototype `VizStudio.vue` composing `StoryPage` is the right INSTINCT (INC-2) — the fix is to make the instinct contractual, not to invent it.

---

## 4. PROPOSED `proof:design-language-congruence` (the missing gate — clause-designed)

A device-free census gate (`local`+`ci`) over the V-expansion's NEW/migrated demo surfaces (the studio set, the card-sheet, the dock-hero captures, the search-field terminus) + a binding π readback. Born-RED on the all-glass-no-pillars baseline → GREEN at the fix. Clauses:

- **DLC-1 (PAPER presence).** Each ENROLLED content/control surface that the gestalt calls for paper (the configurator calm-content/control column, a content-bearing sheet, a results-list terminus) reads a PAPER register (`paper-grain-overlay` / `.paper-ink-mark` / `<ShowcaseFrame tier="field">` / the `math-paper` calm idiom) where appropriate — asserted against a per-surface ROSTER declaring each surface's intended {glass|paper|generative} register with rationale (the anti-evasion: an all-glass surface on the roster's paper-list REDs). + the THREE-INK-REGISTER fence: the viz `contourInk`/`paper-grid` OUTPUT is NOT counted as the paper-morphism register (the BA.W-HANDMARK disambiguation).
- **DLC-2 (AUDACIOUS √φ TYPE — contractual, not incidental).** Every V studio + hero surface ACTIVATES the `text-display-*` audacious ladder at `heroScale ≥ 4` AND resolves the Apple-calibrated `--type-tracking-display`/`--type-leading-display` on the display rung — asserted as a CLAUSE (a studio with a plain `text-heading` title REDs), with the one-color-event proportion held (`proof:suffuse` d1-d3 stays GREEN). The masthead is REQUIRED, never inherited-by-luck. The π binds the hero `<h1>` resolving a display rung (a `getComputedStyle` font-size readback, not a class string-match — a class re-roll cannot evade it, the `proof:hierarchy` precedent).
- **DLC-3 (GOLDEN-RATIO surfaces).** Each NEW content surface (the card-sheet, the search field, the VizStudio stage/aside cells, the sub-dock panels) reads the √φ register: the card-sheet reads the `Card.vue` golden card-pad ladder (`--card-pad-*`); the VizStudio inherits the configurator golden hierarchy (`--configurator-section-*`/`-preset-row-*`); radii read the `--radius-*` √φ rungs — NOT ad-hoc `p-N`/`rounded-N` off a NAMED allowlist (the `proof:card-padding` C4 ad-hoc-pad-roster precedent transposed). A bare ad-hoc px-pad on an enrolled surface REDs.
- **DLC-4 (one-GL-per-route in the VizStudio fold).** The `<VizStudio>` chassis SELF-STAGES its one live context and the migration does NOT add a second live context to any studio route (the `proof:demo-design` D6 / `arch/perf-budget.md` P1 census extended to the VizStudio surfaces) — closing INC-5.
- **DLC-5 (the hallmark-bar amendment).** The dock-hallmark cross-cutting bar GAINS a "FULL-DESIGN-LANGUAGE BREADTH" criterion — the RICHER-than-reference verdict is measured on the audacious-type / paper / golden-ratio axes, not glass/motion alone (closing INC-6). The `proof:ba-gestalt` per-surface verdict reads the breadth, not just the glass gestalt.
- **DLC-6 (the roster + self-test).** A `docs/tranches/BD/viz/design-language-roster.md` enrolls every NEW/migrated V-surface with its declared per-pillar register + rationale; a synthetic all-glass-no-type-no-golden surface REDs each clause (the 5-bite self-test). The roster ≡ the enrolled V-demo set (no surface escapes the census — the W-DOCK-NORMALIZE F4 closure precedent).

**Owning wave + DAG position:** a NEW `W-DESIGN-LANGUAGE-CONGRUENCE` (VT3 or a VT-CLOSE-adjacent breadth wave) that AMENDS the V studio/sheet/dock-hero surface specs to wire the paper/type/golden registers + mints `proof:design-language-congruence` + the roster. It reads every V demo-surface wave (upstream); it lands beside `W-DEMO-BREADTH` / before `W-REFLECT-ALL`. It ships ~zero `src/` (the registers all EXIST — it WIRES the demo surfaces + the gate), the W-DEMO-DESIGN consume-not-fork posture.

---

## 5. The historical-hardening angle (D8's second half — RECENCY-WEIGHTED)

D8 also binds "ALL items from the last 100+ sessions, recency-weighted." The design-language pillars are themselves the RECENT hardening lessons: BB.W-DISPLAY-TRACKING (the Apple −1.5% tracking, most-recent type work), BB.W-CARD-PAD (the golden card-pad ladder), BA.W-NO-GRAY (the warm-chroma floor), the W-SUFFUSE one-color-event proportion. **The V-expansion's all-glass myopia is itself a regression against the most-recent type/golden/paper hardening** — the recency-weighting cuts AGAINST the expansion: the freshest lessons (golden card-pad, Apple tracking, suffusion proportion) are exactly the ones the V-spec drops. `proof:design-language-congruence` is the machine-lock that keeps the 100+-session breadth from collapsing back to glass-only under the weight of a glass-heavy expansion.

---

## VERDICT (5-7 lines)

D8 is GLASS-AND-GENERATIVE-RICH but **PAPER-BLIND, TYPE-INCIDENTAL, GOLDEN-RATIO-SILENT**: pillars (2)/(4)/(5) appear ONLY in D8's own prose (`VIZ-BAND-PLAN.md:37`) and are wired into ZERO wave mechanism, surface design, or gate. INC-1: every fleet2/research surface (VizStudio · maps-card-sheet · dock-hero · search-field) is ALL-GLASS — no paper register where content/control/results-list gestalts call for it (and the viz `contourInk`/paper-grid output is conflated with paper-morphism, ignoring the BA.W-HANDMARK three-ink fence). INC-2: the audacious masthead is inherited by ACCIDENT (the on-disk `VizStudio.vue` composes `StoryPage`) but the PLAN never requires it — `proof:viz-configurator` asserts controls, not display type; the sheet/dock-hero name no type register. INC-3 (cleanest): not one V-surface reads the √φ card-pad ladder or names a golden token — the richest geometry surface (`maps-card-expand`, a CARD that expands) is golden-ratio-blind, defaulting to ad-hoc `p-N`. INC-4: `proof:design-language-congruence` is named twice and DESIGNED never (no clauses, no DAG node — un-enforceable vapor). INC-5: the VizStudio fold risks a two-live-GL-context breach on `substrates`-category routes (pillar 3). INC-6: the hallmark "richer-than-reference" bar measures glass/motion only — omitting the exact pillars that make glass-ui richer than an Apple clone. Recency cuts AGAINST the expansion: the freshest hardening (BB golden card-pad, Apple −1.5% tracking, suffusion proportion) is precisely what the all-glass V-spec drops. FIX: mint `W-DESIGN-LANGUAGE-CONGRUENCE` + the clause-designed `proof:design-language-congruence` (DLC-1..6, §4) + the per-surface roster — make congruence CONTRACTUAL, not incidental.
