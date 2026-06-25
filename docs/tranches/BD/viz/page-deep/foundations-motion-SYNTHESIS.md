# foundations/motion — Pass-E SYNTHESIS (binding per-page verdict)

**Route:** `/foundations/motion` · **SFC:** `demo/stories/foundations/motion.vue` · **Import chip (rendered):** `/foundations/motion` (route-form — correct for a class-only foundations page; no single exported component, the intro/typography/radii/shadows convention).
**Inputs reconciled:** `foundations-motion-{demo,design,component}.md` (Pass-E, three independent lenses).
**North star:** DESIGN.md (six-layer composite · 7 glass tiers · glass-cannot-sample-glass · spring physics) · design-idioms/motion-canon/affordance-map · the dock system · GLASS+PAPER both · TYPOGRAPHY-forward (√φ ladder) · HIGH animation affordance for EVERY component.

---

## 1 · The three lenses AGREE (the consensus core)

All three reports land the SAME page-level verdict — one finding triangulated, not three opinions:

1. **The page that teaches motion is the library's most MOTIONLESS surface.** It composes exactly TWO library atoms — one `<Button variant="secondary">` (the Toggle) + raw Vue `<Transition>` — around a bordered HTML `<table>` (the easing doctrine) + a 6-up grid of OPAQUE `bg-card` tiles. The headline mechanisms the library SHIPS and CLAUDE.md canonizes (`useSpringPress`/`useLiquidPress`, `.scroll-build`/`.scroll-cascade`, `useLiquidReveal`, `useDragMorph`, `vReveal`/`SplitChars`, the per-spring duration clock) appear NOWHERE on the page's own chrome. The §6 doctrine — the heart of motion-canon P1 (spatial-spring vs effects-bezier) — is a STATIC prose table. (demo §1-2 · design §1-3 · component F4 — UNANIMOUS, highest weight.)

2. **Glass never reads as glass.** Zero `.glass-*` tiers on the page (§L1 0/7). The 6 transition tiles paint a fully-opaque cream plate (`rgb(251,248,244)` `bg-card`), the doctrine table is opaque-bordered `bg-[--surface-tint-1]`, and the sample stage is `bg-background/40` — the BG-2 "black-plate" class CLAUDE.md condemns (W-DEMO-DESIGN), reproduced on the page whose subject IS glass+motion. (demo §3 · design §5 · component §6 — UNANIMOUS.)

3. **Structure — sub-sections are bare, the main area reads sparse.** The two `<StorySection>`s render bare (`flex flex-col`, no card surface); the tiles are hand-rolled `bg-card` divs, NOT `<Card>` (so they miss the W-CARD-PAD √φ ladder, the `surface` axis, and `:pressable` HOVER-LIFT). Above-fold is < 50% filled — title + table, then empty cream margin. The user bars "each sub-section in its OWN glassy card" + "main card area BIGGER" are unmet. (demo §4 · design §6 · component user-ask map — UNANIMOUS.)

4. **The `hello` chip is an outright register violation.** `motion.vue:133` paints `bg-[var(--motion-accent)] text-white` — a saturated opaque violet slab with a hard white label, the exact thing W-NO-GRAY/W-FEEDBACK-TONE + the glass-first canon (AX.W54) retired everywhere else. On a FOUNDATIONS page it models bad practice. (design §4 · component F2 — both flagged; ALREADY ENROLLED in OFFTOKEN-SWEEP M11-1.)

5. **The COMPONENT (the `<Transition>` system + §6 tokens) is the library's CLEANEST motion surface — KEEP, zero src change.** All three lenses, and the component lens emphatically: the 9 `<Transition>` recipes + the `--spring-*`/`--ease-*` tokens are the SOURCE the §6 doctrine re-states, so they are P1-P6 motion-canon-correct BY CONSTRUCTION (spring-iff-spatial, enter-bouncy/exit-no-overshoot, per-spring duration clock wired, PRM keeps-fade/drops-transform), compositor-only, `@layer`-hygienic, Safari-graceful (`linear()` 17.2+ degrades to a flat ramp), and gate-locked by `proof:animation-coherence` + `proof:no-layout-animation`. NO dead token, no clock-drift, no alias bloat, no dual-path. **Every gap is DEMO-presentation-side.** (component F1, the highest-confidence single finding.)

---

## 2 · Reconciled facts + ONE resolved conflict (disk overrides)

- **CONFLICT (background): the manifest fact RESOLVES it.** The demo report read `background: "constellation"`; the design report assumed `foundations → paper`; the component report split the difference ("constellation per manifest, but resolves to a calm wash"). **Disk-fact (manifest.ts:491-493): `/foundations/motion` carries an EXPLICIT `{ background: "constellation" }` override** — it is a GL route TODAY, not the `foundations→paper` default. **This materially changes the aurora disposition:** the page is ALREADY spending a one-GL-per-route budget on a monochrome node field that reads as faint gray dots behind opaque tiles — a live GL context for zero visual payoff (demo §7 latent bug). Swapping `constellation → aurora` is therefore NOT a new GL stage on a static-wash route — it does NOT trip the M8 GL-on-static-wash gate (that gate fires on `paper`/`grid` routes; this route is already GL). So the design report's "colorful aurora" ask is the EASY case here: re-point the budget the page already spends from a dead monochrome field onto a live colorful one the opaque tiles would finally read through. This is the inverse of the typography page (where aurora WAS a decision-gated M8 collision).
- **CONFLICT (component-F2 "is this a header-fold case?"): N/A.** The component report itself dispositions every gap as demo-side + already-enrolled; no PAGE-HEADER-FOLD claim is made. No conflict.
- **PATH-label: PASS, do nothing** (all three concur — `/foundations/motion` route chip is correct for a class-only foundations page).

---

## 3 · RANKED changes (by impact on the user's BD bar)

| # | Change | User-bar served | Lens consensus |
|---|--------|-----------------|----------------|
| **R1** | **Re-point the dead GL budget `constellation → colorful aurora` + drop each sub-section into its OWN glass card (`tier="field"`/`<Card tier="quiet">`) over it** — the §L1 six-layer composite finally reads, the field is colorful, the opaque tiles become glass | glass-over-colorful-aurora · own-glassy-card · main-card-BIGGER · §L1 reads | 3/3 (fuses #2+#3; the disk-fact makes it M8-free) |
| **R2** | **Make the doctrine LIVE — kill the `<table>`, render a two-lane SPATIAL(spring)/EFFECTS(bezier) split where each row's own mini-element animates on hover with its named curve** (motion-canon P1 DEMONSTRATED, not tabulated) | distinctive (not generic-AI) · HIGH-animation · the doctrine IS the content | 3/3 (demo §1, design §3 top-move, component F4) |
| **R3** | **Add a HERO motion specimen + leverage the dock APIs** — ONE large focal demonstration above the grid (a `useLiquidReveal` bloom or a spring-driven viz the page can switch), contextually switched by a `<DockLayerGroup>`/`DockStack mode="facets"` picking the active spring register / transition family (LEGEND · GALLERY · live spring-press) | leverage-the-dock-APIs · deftly-uses-a-series-of-components · second focal beat · main-area-BIGGER | 3/3 (demo §4-5, design §5, component F5) |
| **R4** | **Auto-animate on entrance + hover, not only manual Toggle** — compose `.scroll-cascade` so the tiles build in (each on its own `view()` timeline) + re-fire each `<Transition>` on hover + add HOVER-LIFT/GLEAM-TRACK/PRESS-SQUISH (affordance-map #1/#2/#3) via real `<Card :pressable>` tiles; the user FEELS bouncy-vs-snappy without clicking; promote card title to `text-subheading` | HIGH-animation-for-every-component · affordance-map · own-glassy-card (real `<Card>`) | 3/3 (demo §1, design §4 top-move, component F4) |
| **R5** | **Fix the `text-white`-over-`--motion-accent` register violation** → `text-foreground` (warm ink) | concrete register-violation · warm-ink identity | 3/3 (ALREADY ENROLLED, M11-1) |
| **R6** | **Tighten language** — collapse the encyclopedic doctrine blurb (`:83`), de-shout the ALL-CAPS "NO overshoot" legend strings (`:16,:19`), trim the SFC docstring restating the de-dup thesis | tighten-superfluous-language | 2/3 (demo §6, component F7) |
| — | **PATH-label: PASS, do nothing.** `/foundations/motion` route chip correct for a class-only foundations page. | standardize-import-label (already standard) | PASS |

---

## 4 · Tranche actions (the binding dispositions)

### R1 → MODIFY `BD.W-TOKEN-TOUR-GLASS` (Arm A+B) + a SCOPED manifest re-point (NOT a new aurora wave)

TOKEN-TOUR-GLASS already names `foundations/motion.vue:85-100` + `:108-115` verbatim as Arm-A folds (the `<table>` wrapper + the 6 raw triplets → `<ShowcaseFrame>`/`<Card>`). **MODIFY** to extend its Arm-B per-section glass-card framing to motion's two sub-sections AND to carry the **`constellation → aurora` manifest re-point** — and here the SYNTHESIS DIVERGES from the typography precedent: typography's aurora half was a DECISION-GATED NEW wave because it was an M8 GL-on-static-wash collision. **Motion is NOT** — the disk-fact (§2) is that the route is ALREADY GL (`constellation`); re-pointing one GL background to another is a manifest one-liner that keeps the one-GL-per-route budget intact and never trips M8. So **fold the aurora re-point into TOKEN-TOUR-GLASS's motion row** (gate clause: motion's tiles compose `tier="field"` glass over a LIVE colorful field, not `bg-card` over a dead monochrome one) — NO separate `BD.W-FOUNDATIONS-AURORA-FIELD` wave is owed FOR THIS PAGE. (If the foundations/colors+typography aurora wave is minted for the static-wash pages, motion is NOT enrolled in it — it is already-GL and folds cleaner into TOKEN-TOUR-GLASS. Record the divergence so the two waves don't both claim motion.)

### R2 → NEW Band-16 wave `BD.W-MOTION-DOCTRINE-LIVE` (zero src paint)

The static `<table>` → live two-lane SPATIAL/EFFECTS split is a page redesign that exceeds TOKEN-TOUR-GLASS's "fold the wrapper" remit (that wave wraps the table in a ShowcaseFrame; it does NOT replace the table with a live specimen). **PROMOTE to a real wave with a real gate.** Scope: replace the doctrine `<table>` with two columns (springs vs beziers), each row a card whose own mini-element animates on hover reading its NAMED `--spring-*`/`--ease-*` token (consume the real tokens, never re-author). **Gate (born-RED):** assert `motion.vue` composes ZERO `<table>` in the doctrine section + each doctrine row binds a real `--spring-*`/`--ease-*` token to an animating element (not a prose string); π readback: the SPATIAL rows overshoot + the EFFECTS rows don't, both modes, PRM-static. This is the bespoke distinctive move all three lenses rank #1-or-2.

### R3 → AUGMENT `BD.W-MOTION-DOCTRINE-LIVE` §2 (dock + hero specimen, scope-gated)

Fold the "hero specimen + dock contextual-switch" into MOTION-DOCTRINE-LIVE as its §2: ONE large focal `useLiquidReveal`/spring specimen above the grid, switched by a content `<DockLayerGroup>`/`DockStack mode="facets"` (LEGEND · GALLERY · live spring-press). **Respects one-dock-per-route** (the page already renders shell docks — the contextual switch rides a CONTENT dock-layer-group, not a 4th GL/dock context; the aurora from R1 is the one GL context). Gate-extend with a "page-composes-≥3-library-components (Tabs/DockLayerGroup/Card/Button)" clause. (Component-F5 maps R3 here as a NEW scope-gated wave; this folds it into the page's ONE redesign wave so the gestalt is coherent — 3 sub-arms of one wave, not 3 waves fighting one SFC, the typography precedent.)

### R4 → AUGMENT `BD.W-MOTION-DOCTRINE-LIVE` §3 (auto-animate + real `<Card :pressable>` tiles)

Fold the entrance/hover-life + real-`<Card>` move into MOTION-DOCTRINE-LIVE §3: `.scroll-cascade` tile build, re-fire `<Transition>` on hover, HOVER-LIFT/GLEAM/PRESS via `<Card :pressable>`, `text-subheading` title rung. Keep it in the ONE wave that owns the redesign. **The overlap with TOKEN-TOUR-GLASS Arm A (which folds the 6 tiles onto `<ShowcaseFrame>`/`<Card>`):** MOTION-DOCTRINE-LIVE SUPERSEDES the Arm-A motion-tile fold — if MOTION-DOCTRINE-LIVE re-architects the grid into pressable `<Card>` specimens, the Arm-A motion-tile rows are DRAINED from TOKEN-TOUR-GLASS (no double-fold; the two waves coordinate the M9A baseline edit — TOKEN-TOUR keeps `section`/`pulse`, MOTION-DOCTRINE-LIVE owns motion's tiles). Record this hand-off in both wave specs.

### R5 → KEEP in `BD.W-PAGE-OFFTOKEN-SWEEP` (already enrolled, M11-1)

The `text-white` → `text-foreground` re-point is already enrolled (M11-1, `OFFTOKEN_ENROLLED ⊇ {foundations/motion}`). **No change** — note only that if MOTION-DOCTRINE-LIVE re-architects the `hello` chip into a glass-accent surface (R1's glass register), the chip may DISAPPEAR entirely; OFFTOKEN-SWEEP's gate must still pass (zero `text-white` on the page is the assertion — a deleted chip satisfies it). Coordinate so the two don't fight over the same line.

### R6 → MODIFY `BD.W-PAGE-OFFTOKEN-SWEEP` (comment-tighten arm)

**MODIFY** to add motion's language-tighten to the comment-tighten arm: collapse the `:83` encyclopedic blurb, de-shout the ALL-CAPS legend strings, trim the docstring. Already its remit (the off-token + comment-tighten arm); extend the enrolled set. Zero src.

---

## 5 · Convergence call

**NOT close — needs SEVERAL more loops** (2-3). The page misses on FOUR user bars simultaneously (animation, glass-over-colorful, own-cards, use-the-components) — the worst-converged foundations page alongside typography. The bones are EXCELLENT (the `<Transition>`/§6 component is the library's cleanest motion surface — KEEP, zero src) so this is NOT a rebuild; but the EXECUTION layer is a near-total demo redesign: a NEW wave (`BD.W-MOTION-DOCTRINE-LIVE`, 3 sub-arms) + two MODIFY-extends (TOKEN-TOUR-GLASS with the M8-FREE aurora re-point + Arm-A hand-off; OFFTOKEN-SWEEP comment arm). After those land it needs a fresh capture + ≥1 design re-loop to confirm the live two-lane doctrine + dock-switched hero specimen actually read as "the page where the motion system LIVES" rather than a reorganized spec-sheet.

**The single highest-leverage move (do first):** R1+R2 together — re-point the dead constellation budget onto a colorful aurora, drop the sub-sections into glass cards over it, and replace the dead doctrine `<table>` with a live spatial-vs-effects split. That ONE structural pass converts the page from a generic-AI documentation template into a self-demonstrating glass-over-color motion specimen; R3 (dock + hero) is the second focal beat, R4 (auto-animate) is the polish, R5/R6 are hygiene.
