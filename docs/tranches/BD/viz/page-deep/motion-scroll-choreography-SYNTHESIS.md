# Pass-E SYNTHESIS — `motion/scroll-choreography` (the binding per-page verdict)

- **Import path (standardized):** `@mkbabb/glass-ui/styles` → the `.scroll-build` / `.scroll-cascade` / `.scroll-pin` CSS register (NOT a JS symbol; the route chip `/motion/scroll-choreography` names the route, the package label names the importable).
- **SFC:** `demo/stories/motion/scroll-choreography.vue` (155 lines) · **src register:** `src/styles/scroll-choreography.css` (BB.W-SCROLL-MOTION) + `tokens/scroll-tokens.css` · **the only JS:** `src/composables/motion/supportsCssTimeline.ts` (badge gating).
- **Inputs reconciled:** the demo (meta-storybook), design (frontend-design), and component (src-register) auditors.

---

## The reconciled verdict (one paragraph)

The CSS register itself is **architecturally sound and SHOULD NOT be rebuilt**: native `scroll()`/`view()`/`timeline-scope`, no Lenis/GSAP dep, compositor-only, PRM-carved, Safari-defensive `@supports`-gated — all three auditors independently confirm this. The defect is entirely at the **PAGE-COMPOSITION layer**: a *motion* page that is visually inert in a still frame — three flat caption-led sections stacked inside ONE washed StoryHero card, a hero-scale gray "Pinned" slab over a near-dead constellation (NOT the colorful aurora the user mandates), ~60vh of empty temporal scrollage, and **zero interactive glass-ui components** (0 docks, 0 tabs, 0 buttons, 0 procedural viz — the page hand-rolls pills instead of `Badge`). This is the textbook "canon-on-paper / muddy-in-render" gap the `proof:ba-gestalt` bar exists to kill, re-introduced one band up. Plus two real CSS-register bugs the demo/design auditors couldn't see from the surface: a **dead `--col` column-stagger** (`* 0` hardcode, the L14 no-op class) and a **two-phase pin masquerading as three-phase**.

All three reports AGREE on the five top moves (glass-over-aurora · own glassy cards per section · bigger showcase + kill dead acres · dock-API contextual switching · wire affordance + replay). The only conflict is **how to host the redesign in the tranche**: the component auditor flags that NO BD wave owns the motion-page redesign (a genuine gap); the demo/design auditors describe the redesign but don't map it. Resolution below: a **net-new Band-7 wave** owns the page-band redesign, two **MODIFY**s land the register bugs, and the existing roster/deep-glass waves AUGMENT to enroll + tier this page.

---

## RANKED changes (by impact) + tranche action

### 1 — Glass over a COLORFUL aurora, full-bleed [NEW · highest leverage]
The single most-cited move across all three reports + a direct user mandate. The cards collapse to gray *because there is nothing colorful to refract* (DESIGN.md §L1: a lens over a flat field reads as a gray swatch — the exact W-NO-GRAY/W-DARK-MATERIAL defect class re-introduced at composition). Override the `motion`-category `constellation` default to **aurora** for this route (or wrap the showcase in `<DockStage>`, the shared offscreen-paused aurora chassis), full-bleed not boxed. One GL context per route (the budget holds — aurora self-stages). The glass stops being gray the instant there is color to refract.
→ **NEW: `BD.W-MOTION-PAGE-LIQUID` (Band 7).** Gate: route bg resolves `aurora` (not `constellation`); the live π asserts ≥1 colorful canvas full-bleed behind the cards + the cards' composited fill is NOT gray (OKLab chroma floor, both modes).

### 2 — Each sub-section in its OWN glassy card, tiered for depth [NEW · user mandate]
Promote the three `StorySection`s out of the single shared `wash` card into three distinct glass cards at DIFFERENT tiers ("The register" → `glass-quiet`, "Section cascade" → `glass-resting`, "Scroll-pinned showcase" → `glass-floating`/`.glass-deep`) so §L1 "solid drawing" z-depth reads. Each gets a `--glass-accent` chromatic rim in the motion-violet (BB.W-GLASS-ACCENT) so the band identity rides the rim, not the current 2px speck dot.
→ **NEW: `BD.W-MOTION-PAGE-LIQUID` (Band 7), same wave.** Gate: 3 distinct cards at ≥2 distinct tiers + a non-zero `--glass-accent` per card.

### 3 — Bigger showcase + KILL the dead acres + dock-API contextual switching [NEW · user mandate]
The `.scroll-pin` stage is the hero of a *scroll* page — give it real screen presence (wide deep-glass card, aurora reading through) and REPLACE the empty 60vh tail with a **procedural viz that advances as the stage pins** (`DotFlowField`/`Concentric` — the literal "scrolling advances time inside the scene" thesis, now with something worth advancing). Seat a `<GlassDock>` + `<DockStack mode="facets">` (or `<DockLayerGroup>`) that switches the live demo between the three registers (build · cascade · pin) — the contextual-switching/morph API, the on-brand "deftly uses a series of glass-ui components" answer. Widen the main column for this route (reclaim the 288px the `--story-page-max-inline` cap wastes).
→ **NEW: `BD.W-MOTION-PAGE-LIQUID` (Band 7), same wave.** Gate: ≥1 procedural viz inhabits the pin stage + a dock facet-switch is wired + the dead-acre 60vh tail is gone (no empty container > Nvh) + the showcase card is wider than the default column.

### 4 — Wire affordance + a replay harness [NEW · user mandate]
The page wires ZERO of the five `affordance-map.md` pointer primitives — "there is nothing to touch." Make the cascade cards `:pressable` (HOVER-LIFT + PRESS-SQUISH + GLEAM-TRACK + FOCUS-RING) with `:reveal` spring entrances (W-SUFFUSE3); turn the capability badges into real `<Button variant="ghost">`/`<Toggle>`; add a `<StoryPlayButton>` to **REPLAY** `.scroll-build`/`.scroll-cascade` on demand — the correct answer to "a motion page can't show motion in a still frame" (the headline recipe currently fires only on route-nav and is dead on refresh/deep-link).
→ **FOLD into `BD.W-MOTION-PAGE-LIQUID` (Band 7).** Gate: ≥3 affordance primitives wired + a replay control present + no inert interactive element.

### 5 — Dead `--col` column-stagger bug [MODIFY · real src bug]
`scroll-choreography.css:195` hardcodes `... + var(--scroll-cascade-column-stagger, 60ms) * 0` — the `* 0` zeroes the stagger; `--col` is read NOWHERE in src/ or demo/ (grep-confirmed). A shipped-but-inert sub-feature (L14 no-op class). Wire `* var(--col, 0)` (and have the consumer set `--col` per child) OR prune the stagger sub-claim from the doc.
→ **MODIFY: `BD.W-PAGE-OFFTOKEN-SWEEP`** — extend its inert-token hygiene scope with a **keyframe-stagger clause** (it is currently value-token-scoped; widen to "a documented stagger term multiplied by a hardcoded `0` reds"). A real gate already in the right band.

### 6 — Pin two-phase → genuine three-phase arc [AUGMENT · register fidelity]
The `.scroll-pin` settle keyframe starts at `opacity:1 scale(1)` with no entrance of its own; the `--scroll-pin-phase-expand-end` token (90%) exists but no expand keyframe binds the gap, so the DESIGN.md/Codrops "reveal → expand → settle" three-phase arc is only two phases. Bind the missing expand keyframe on the existing tokens.
→ **AUGMENT: the new `BD.W-MOTION-PAGE-LIQUID` (Band 7)** carries this register-fidelity clause (it touches the same showcase; no separate wave warranted). Gate: 3 bound pin-phase keyframes against the 3 phase tokens.

### 7 — Deep-glass focal tier on the showcase card [AUGMENT · existing wave]
The focal pin showcase card is the right home for the BD deep-glass tier.
→ **AUGMENT: `BD.W-DEEP-GLASS-20PX`** — add the motion showcase card as a named deep-tier consumer (IFF the budget clears per that wave's own re-decide; else `.glass-floating`).

### 8 — Enroll the gestalt roster + capture Safari static fallback [MODIFY · close-oracle]
`motion/scroll-choreography` is NOT in the gestalt roster (grep-confirmed absent), and the Safari `timeline-scope`-gap static-fallback paint is a paper claim — uncaptured on real Safari. Both block the close oracle for this page.
→ **MODIFY: `BD.W-GESTALT-ROSTER-GROW`** — add the motion/scroll-choreography row (both modes + the 320vh-scroll capture note P1) + the Safari-static-fallback capture.

### 9 — Standardize the import-path chip + tighten prose [FOLD + PRUNE]
The chip should read the package label `@mkbabb/glass-ui/styles` (the register's home), standardized with every page. The SFC header (16-line spec novella), the CSS file-header novella, and the on-page prose (ALL-CAPS + em-dash pile-ups, internal-spec voice: "SOTA," "NO setTimeout," "the implicit stagger," "the §Triumvirate support-matrix trigger") all violate the writing-style precept.
→ **Chip:** FOLD into `BD.W-MOTION-PAGE-LIQUID` (Band 7, the page-chassis clause). **CSS+SFC prose PRUNE:** FOLD into `BD.W-PRECEPTS-README-FRESHEN` is wrong (precepts-only) — instead carry the **prose-tighten as a clause of `BD.W-MOTION-PAGE-LIQUID`** (the page already opens for redesign; tightening its copy in the same wave is free). Cut SFC header to ~4 lines; one clean caption per section; retire placeholder cascade stubs ("Cascade 1..6 / Builds in on its own view() timeline") with real designed content.

### 10 — `.scroll-pin` 320vh reserve [KEEP · note]
Correct by design (the tall scroll-distance for the pin); noted for the roster capture so a reviewer expects the long scroll. After move #3 fills the tail with a viz, the reserve becomes load-bearing rather than dead.
→ **KEEP**, captured under `BD.W-GESTALT-ROSTER-GROW` (P1 note).

---

## Tranche-action summary

| # | Change | Action | Wave |
|---|---|---|---|
| 1 | Glass over colorful aurora, full-bleed | **NEW** | `BD.W-MOTION-PAGE-LIQUID` (Band 7) |
| 2 | Own glassy card per section, tiered + accent rim | **NEW** | `BD.W-MOTION-PAGE-LIQUID` |
| 3 | Bigger showcase + viz-in-pin + dock facet-switch + wider column | **NEW** | `BD.W-MOTION-PAGE-LIQUID` |
| 4 | Affordance primitives + replay harness | **FOLD** | `BD.W-MOTION-PAGE-LIQUID` |
| 5 | Dead `--col` stagger (`* 0`) | **MODIFY** | `BD.W-PAGE-OFFTOKEN-SWEEP` (keyframe-stagger clause) |
| 6 | Pin two-phase → three-phase | **AUGMENT** | `BD.W-MOTION-PAGE-LIQUID` (register-fidelity clause) |
| 7 | Deep-glass tier on showcase card | **AUGMENT** | `BD.W-DEEP-GLASS-20PX` |
| 8 | Roster enroll + Safari static capture | **MODIFY** | `BD.W-GESTALT-ROSTER-GROW` |
| 9 | Import chip standardize + prose tighten | **FOLD/PRUNE** | `BD.W-MOTION-PAGE-LIQUID` (chassis + prose clauses) |
| 10 | 320vh reserve | **KEEP** | `BD.W-GESTALT-ROSTER-GROW` (note) |

**Why a NEW Band-7 wave (not a fold into BD.W-DATA-BAND-GLASS):** the data-band wave is a zero-paint re-thread of opaque plates onto `<ShowcaseFrame>` — a hygiene drain, not a composition redesign. The motion page needs a *gestalt rebuild* (new aurora bg + new card topology + new dock composition + new viz-in-pin + new affordance wiring), which is a different kind of work with its own real gate. Band 7 is currently **unoccupied** (bands run 1-6, 8, 9), so it cleanly hosts the page-band-redesign family the user's brief opens — and the same wave is the home for the sibling motion-band pages the other Pass-E syntheses will surface (springs/curve-gallery/etc.), making it a band, not a one-off.

**Anti-overfit note:** `BD.W-MOTION-PAGE-LIQUID` must be a BAND wave (≥2 motion pages), not a one-page special-case — the gate enrolls the motion-category page set, not just scroll-choreography, so the redesign primitives (aurora-bg override · per-section tiered cards · dock facet-switch · viz-in-pin) are reusable chassis moves. Zero src paint (demo-private) EXCEPT the two register clauses (#5 `--col`, #6 third-phase keyframe) which touch `src/styles/scroll-choreography.css` — those ride their own gates.

---

## Convergence call

**NOT close — needs a full redesign loop (≈2-3 iterations).** This is one of the thinnest, least-converged pages in the storybook: the register CSS is done, but the page composition fails 5 of the user's explicit bars (no aurora · no per-section cards · no bigger area · no dock APIs · no component series) AND carries 2 real src bugs. The redesign is substantial (new wave + viz-in-pin + dock composition), so expect: **loop 1** lands the Band-7 wave skeleton + the aurora bg + the tiered cards; **loop 2** wires the dock facet-switch + viz-in-pin + affordance/replay; **loop 3** re-earns the gestalt verdict on a fresh capture (the W-GESTALT-ROSTER-GROW enrollment) + the Safari static-fallback capture. The hero masthead (86px `text-display-4` √φ + Fira-Code chip) is the one converged element — keep it, build the rest up to its bar.
