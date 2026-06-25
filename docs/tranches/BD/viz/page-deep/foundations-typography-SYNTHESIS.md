# foundations/typography — Pass-E SYNTHESIS (binding per-page verdict)

**Route:** `/foundations/typography` · **SFC:** `demo/stories/foundations/typography.vue` · **Import chip (rendered):** `/foundations/typography` (route-form — correct for a class-only foundations page, see §PATH).
**Inputs reconciled:** `foundations-typography-{demo,design,component}.md` (Pass-E, three independent lenses).
**North star:** DESIGN.md (six-layer composite · 7 glass tiers · glass-cannot-sample-glass · spring physics) · design-idioms/motion-canon/affordance-map · the dock system · GLASS+PAPER both · TYPOGRAPHY-forward (√φ ladder).

---

## 1 · The three lenses AGREE (the consensus core)

All three reports — independently — land the SAME page-level verdict. This is not three opinions; it is one finding triangulated:

1. **Animationally DEAD.** The √φ token ladder is real and the audacious peaks (`display-audacious/-hero/-mega`) are activated, but every specimen is inert text. The page rides `StoryPage`'s `.scroll-cascade` entrance (the ONE live thing) then sits frozen — no hover, no press, no kinetic typography, on the one page *named* for the project's "kinetically typographic" thesis. The library SHIPS the cure with zero fork: `SplitChars`/`useCharStagger`, `TypewriterText`, `vReveal`, `useAnimatedNumber`/`useCountup`. (demo §2-3 · design §3 · component §1-F1 — UNANIMOUS, highest-weight.)

2. **Glass never reads as glass.** `canvasCount: 0`, `hasAurora: false`. The `tier="field"` frames (whose WHOLE point — the BG-2 black-plate kill — is glass floating over a LIVE field) have NOTHING colorful behind them, only flat paper. By the library's own canon (AX.W54: "the blur is imperceptible over a flat substrate") the six-layer composite is invisible; in dark mode it degrades to the "charcoal slab on a dead void" W-DARK-MATERIAL exists to kill. The user bar "glass demos over COLORFUL aurora" is unmet. (demo §3 · design §5 · component §6 — UNANIMOUS.)

3. **Structure — one card wraps everything.** ONE outer `glass-resting` card holds all four sections, divided only by hairline `--configurator-divider` rules. The user mandate "each sub-section in its OWN glassy card; main card BIGGER" is unmet. (demo §4 · design §5/§6 · component user-ask map — UNANIMOUS.)

4. **The ℱ caption LIES (concrete render bug).** `typography.vue:120` caption claims ".fourier-f — viz-fourier red" but `.fourier-f` (`typography/utilities.css:89`) declares NO color → resolves `rgb(28,25,23)` warm-ink. The page's lone designed color moment is broken and self-describes falsely — the exact "headless-green/visually-broken" class MEMORY warns about. (demo §7 · design §4 — both flagged independently.)

5. **The page leads with the WRONG voice.** The focal "Aa" is `Plus Jakarta Sans` (the neutral system grotesque) at 310px with `font-variation-settings: WONK 1, SOFT 0` — Fraunces axes Plus Jakarta IGNORES (dead attribute). A type specimen leading with the system font, not the `--font-display` Fraunces character voice, has buried its own thesis; the lone Fraunces moment (ℱ) is an afterthought 1500px down. (design §1 — the sharpest single design insight; demo/component note the same focal flatness.)

**One disagreement to RESOLVE (component vs disk-fact):** component-F2 calls the page's bare `.section-label <p>` the "37th" PAGE-HEADER-FOLD case. **Disk-fact overrides:** PAGE-HEADER-FOLD's enrolled set is the 36 files carrying ALL THREE markers (`borderLeft:`-in-`:style` AND `section-label--tinted text-admin-label` span AND `<IconChip>`); typography carries a bare `<p class="section-label">` with NONE of the three (grep = 0). It is NOT the 37th — folding it would force a 37th paste the wave's anti-gameability ratchet forbids. **Resolution: this is NOT a PAGE-HEADER-FOLD fold.** Typography legitimately leads with a bare eyebrow; the header-divergence is real but cosmetic and is absorbed into the bigger redesign (it gets a proper header for free when each section becomes its own card). Demote to a §AUGMENT footnote, not a fold.

---

## 2 · RANKED changes (by impact on the user's BD bar)

| # | Change | User-bar served | Lens consensus |
|---|--------|-----------------|----------------|
| **R1** | **Aurora field behind the page + each sub-section its OWN glass card over it** (the `<DockStage>` pattern: one offscreen-paused `<Aurora>`, `glass-resting`/`glass-quiet` per-section cards lensing it) | glass-over-colorful-aurora · own-glassy-card · main-card-BIGGER · §L1 composite reads | 3/3 (R1 fuses consensus #2+#3) |
| **R2** | **Lead with FRAUNCES, kinetically** — focal `--font-display` audacious WORD ("Audacious") entering via `SplitChars`/`useCharStagger` per-glyph stagger, breathing its `wght`/WONK axes on a slow ambient `--spring-gentle` loop or morphing on hover | HIGH-animation-for-every-component · kinetic-typography thesis · the type IS the brand | 3/3 (design §1 sharpest; demo/component concur) |
| **R3** | **Make the page USE the library** — `<SegmentedTabs variant="pill">` to switch register (Display/Text/Mono/Math), wired to a `<DockLayerGroup>`/`<DockStack>` contextual-switch; `<Slider>` on the `wght` axis; the peaks as `<Card :pressable>` squish tiles | deftly-uses-a-series-of-components · leverage-the-dock-APIs | 3/3 |
| **R4** | **Re-set the ladder as a ratio-revealing POSTER, not an 18-row list** — left-aligned shared-baseline overlapping staircase so the √φ growth is VISIBLE as geometry; hover lifts (`--spring-snappy`) + swells toward next-rung size | distinctive (not generic-AI) · the ratio IS the content | 2/3 (design §1 + demo §1; component neutral) |
| **R5** | **Fix the ℱ red bug** — `.fourier-f { color: var(--viz-fourier) }` OR correct the caption; earn ONE color event (focal word in `--motion-accent` violet or a `--section-color`) | concrete-bug · one earned color moment | 2/3 (demo §7 + design §4) |
| **R6** | **Tighten language + drop off-token re-pins** — collapse the 3 restating comment blocks to one tight docstring; drop the focal `leading-[0.85] tracking-tight` arbitrary that overrides the BB.W-DISPLAY-TRACKING canonical rung; de-editorialize captions ("the fast.com number") | tighten-superfluous-language · token-discipline | 2/3 (component §5 + demo §6) |
| — | **PATH-label: PASS, do nothing.** The `/foundations/typography` route chip is correct for a class-only foundations page (no single exported component); design+demo confirm. The manifest category-subpath `@mkbabb/glass-ui/styles` divergence (demo §5) is a category-level note, not a per-page fix — fold any canon decision to a repo-wide manifest pass, NOT here. | standardize-import-label (already standard for its kind) | PASS |

---

## 3 · Tranche actions (the binding dispositions)

### R1 → MODIFY `BD.W-TOKEN-TOUR-GLASS` (Arm B) + DECISION-GATE the aurora half

TOKEN-TOUR-GLASS already owns "each sub-section gains `<ShowcaseFrame tier="field">`/`<Card tier>` per-section glass framing" and is explicitly GL-FREE. **MODIFY** it to name `foundations/typography` in its Arm-B enrolled set (the per-section glass-card framing + the deep/lens/accent band demo over the wash — already its remit, extend the page list). The π Arm (c) gains a typography row.

**BUT the aurora-behind half (R1's colorful field) COLLIDES with TOKEN-TOUR-GLASS's load-bearing one-GL-per-route + M8-GL-on-static-wash fence + the `foundations→paper` manifest default.** This is the component report's F7 DECISION-GATE, and it is real — do NOT smuggle a live `<Aurora>` into the GL-FREE wave. **Two honest paths:**
- **(a) GL-FREE path (default, in-scope NOW):** per-section glass cards over the EXISTING designed paper-grain wash via `tier="field"` — satisfies "own glassy card" + "main card bigger" + makes the glass band demo READ against the page substrate, M8 stays GREEN. This is TOKEN-TOUR-GLASS Arm B verbatim.
- **(b) Aurora path (NEW wave, orchestrator scope-call):** the colorful-aurora-behind ask = a manifest `background:` change for `/foundations/typography` from `paper` → a live `<Aurora>` field + an M8-gate carve. This is NOT free and NOT TOKEN-TOUR-GLASS's (which is GL-free by contract). It is a **NEW Band-16 wave `BD.W-FOUNDATIONS-AURORA-FIELD`** (sibling scope: the foundations/colors SYNTHESIS will name the SAME ask — colors §1 is identical — so the NEW wave should cover BOTH foundations token pages that want the aurora, one one-GL-per-route budget per route, ≥2 consumers by construction).

### R2 → NEW Band-16 wave `BD.W-TYPOGRAPHY-ALIVE` (zero src paint)

The component report already names this (`BD.W-TYPOGRAPHY-ALIVE`, sibling of TOKEN-TOUR-GLASS, Band 4, zero src paint). **PROMOTE it from a report-suggestion to a real wave with a real gate.** Scope: wire `SplitChars`+`useCharStagger` gravity-stagger on a focal Fraunces `--font-display` word + the 3 audacious peaks; the variable-axis ambient breathe (a `--spring-gentle` loop on `font-variation-settings`, PRM→static); PRM-static everywhere. **Gate (born-RED):** assert `typography.vue` composes `SplitChars`/`useCharStagger` (not raw `<span>` type), the focal word reads `--font-display` (NOT Plus Jakarta — kills the dead WONK/SOFT attribute), the variable-breathe is PRM-carved; π readback: per-glyph stagger frame-series + the Fraunces voice resolves + PRM single-paint, both modes. This is R2's home.

### R3 → AUGMENT `BD.W-TYPOGRAPHY-ALIVE` §2 (dock + components, scope-gated)

Fold the "use the library" moves into TYPOGRAPHY-ALIVE as its §2: `<SegmentedTabs>` register-switch wired to `<DockLayerGroup>`/`<DockStack>` contextual switch + `<Slider>` on `wght` + peaks as `<Card :pressable>`. **Respects the one-dock-per-route budget** (the page already renders the shell docks — the contextual switch rides a content `DockLayerGroup`, not a 4th GL/dock context). Gate-extend TYPOGRAPHY-ALIVE with a "page-composes-≥3-library-components" clause. (Component-F6 already maps R3 here.)

### R4 → AUGMENT `BD.W-TYPOGRAPHY-ALIVE` §3 (the ratio-poster ladder)

The ratio-revealing poster ladder is a layout redesign of the same page — fold it into TYPOGRAPHY-ALIVE as §3 (the ladder becomes a shared-baseline staircase with hover-lift/swell). Keep it in the ONE wave that owns the page redesign so the gestalt is coherent (3 sub-waves of ONE wave, not 3 waves fighting over one SFC).

### R5 → MODIFY `BD.W-PAGE-OFFTOKEN-SWEEP` (add the ℱ bug + the earned color event)

OFFTOKEN-SWEEP already owns the Band-4 foundations off-token/no-gray sweep. **MODIFY** to add: the `.fourier-f` color fix (caption-vs-render reconcile — either ink `--viz-fourier` or correct the caption) + the ONE earned color event on the focal word. NOTE: the `.fourier-f` rule lives in `src/styles/typography/utilities.css` — if the fix INKS the glyph it is a **src paint** (small, but real), so either (a) keep it demo-side (caption correction only, zero src) or (b) the inking moves to TYPOGRAPHY-ALIVE if that wave is already touching src. **Recommend: caption-correction in OFFTOKEN-SWEEP (zero src), glyph-inking deferred to the earned-color-event in TYPOGRAPHY-ALIVE's focal word (demo-side `:style`).**

### R6 → MODIFY `BD.W-PAGE-OFFTOKEN-SWEEP` (language + the off-token re-pin)

Already its remit (the comment-tighten arm + the off-token sweep). **MODIFY** to add `typography.vue` to the enrolled set: collapse the 3 restating comment blocks to one docstring; drop the focal `leading-[0.85] tracking-tight` arbitrary (read `text-display-audacious` clean, or `text-hero` for poster leading); de-editorialize captions. Gate-extend `OFFTOKEN_ENROLLED` to include `foundations/typography` (the recorded-set discipline).

### Header divergence (the resolved conflict) → AUGMENT footnote, NOT a fold

PRUNE the component-F2 "37th PAGE-HEADER-FOLD case" claim (disk-disproven, §1). The bare `.section-label <p>` is fine as-is; it gets a proper per-section header for free in R1's card redesign. No PAGE-HEADER-FOLD edit.

---

## 4 · Convergence call

**NOT close — this page needs SEVERAL more loops.** It is the worst-converged page in the foundations band: it misses on FOUR of the user's BD bars simultaneously (animation, glass-over-aurora, own-cards, use-the-components) plus carries a concrete render bug. The bones are sound (√φ tokens correct, tracking/leading canon, Capsize zero-CLS, Safari-safe, performant) so it is not a rebuild — but the EXECUTION layer is a near-total redesign: a NEW wave (TYPOGRAPHY-ALIVE, 3 sub-arms) + a DECISION-GATED NEW wave (FOUNDATIONS-AURORA-FIELD) + two MODIFY-extends (TOKEN-TOUR-GLASS, OFFTOKEN-SWEEP). After those land it needs a fresh capture + ≥1 design re-loop to confirm the Fraunces-kinetic focal word and ratio-poster ladder actually read as "the system's signature page" rather than a reorganized font menu. Estimate: **2-3 loops** (build → capture → design re-judge → tighten).

**The single highest-leverage move (do first):** R1+R2 together — aurora field + per-section glass cards + Fraunces-kinetic focal word — converts the page from a generic-AI font menu into a glass-over-color typesetting composition in one structural pass. R3/R4 are refinement on top; R5/R6 are hygiene.
