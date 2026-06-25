# display/badge — FRONTEND-DESIGN deep critique (Pass-E)

SFC: `demo/stories/display/badge.vue` · live: `http://localhost:5173/display/badge`
North star: `DESIGN.md` (iOS-26/27 Liquid Glass §L1–§L5) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md`
Captured: 1440×900, full page + lower scroll, the floating shell dock. Both modes not re-run (light captured).

---

## TL;DR

This is the *least designed* page in the display band — a flat gray spec-sheet that violates almost every BD ask at once. There is **no aurora, no glass, no paper, no color stage** — just nine hairline-delimited flat rows on ONE warm-cream resting plate over a dead `#e8e6e3` page. Worse, it ships **two live defects**: (1) the `success`/`warning`/`info` semantic-tone row — the page's richest teaching moment — renders as **plain ink text with transparent plates** (`bg-success`/`bg-warning`/`bg-info` Tailwind utilities are not emitted, so the CVA arm paints nothing); (2) the leading-dot status badges are **static** while the blurb literally says "pair with status-dot for richer pulse compositions." The Badge is a status primitive — it cannot squish or be dragged (correctly `—` on the affordance-map), but a status badge's whole *job* is to read at a glance with semantic color and pulse, and this page kills both. The user's seven asks are all real and all unmet.

---

## 1. VISUAL HIERARCHY — does the eye land right?

**Strong (the only strong thing):** the `Badge` masthead — `text-display` √φ ladder (~96px) over a standardized import chip — is the typography-forward opening DESIGN.md wants. The eye lands on the wordmark. Correct.

**The collapse below the fold:** every one of the nine sections is the identical `StorySection label=… → optional blurb → flat pill row` sandwich, all inside ONE outer resting plate, all separated by the same faint hairline. The √φ ladder is used **once** (the masthead) and never again — the body never rises above `text-sm`. For a page whose subject is the *loud saturated pill* there is no second display moment, no oversized status numeral, no editorial focal badge. It reads as a documentation dump, not a designed page. There is no landmark; the eye skims a table.

**The single-plate problem (user ask #1, unmet):** the whole body is wrapped in ONE `resting`-tier plate; the sub-sections are flat regions *inside* it, not their own cards. The page demonstrates the badge's variant/size/tone *axes* but never structures them — nothing is elevated, nothing is grouped into a glassy card. Self-undermining for a library whose §L1 ladder is the headline.

## 2. AFFORDANCE — clear interactive cues?

Badge is non-interactive by contract (a `<div>` status label, `cursor: auto`, no role) — so "interactive affordance" is mostly N/A and correctly so per `affordance-map.md` (P/D are `—` on a status pill). BUT:

- The **size×variant matrix** is a dense 4×3 grid of bare pills with mono captions — it reads as a parts bin, not a guided comparison. No affordance to tell the reader *why* they'd reach for `lg` vs `sm`.
- The **leading-dot** pattern is the one place a badge carries semantics (Active/Syncing/Idle/Error) and it gives **zero state cue** — the dots are static fills, no pulse, no breathing, so "Active" and "Idle" look identically inert.
- The **import chip** (`@mkbabb/glass-ui/badge`) is a valid subpath and reads as the standardized label — good — but the SFC actually imports from `../../../src/components/ui/badge` (the raw src path). The chip is hand-typed prose, not derived; it happens to be right here but is the un-standardized class the brief flags.

## 3. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**The biggest miss after the defects.** Per `affordance-map.md` the page should make every element answer with the closed FIVE-primitive set; Badge legitimately carries none of the pointer primitives (status label), so the burden falls on **ENTRANCE + STATE life**, and the page ships neither:

- **Entrance:** the pills do NOT ride `.scroll-cascade`/`.scroll-build` (`BB.W-SCROLL-MOTION`). They hard-appear. A loud-pill page is the *ideal* stagger candidate — pills should pop in on `--spring-snappy` with the ~7% overshoot (the IconChip `:reveal` precedent the masthead already uses, never extended to the specimens).
- **State:** the only motion is a 0.12s `background-color` bezier transition (effects-only, correct per `motion-canon.md` P1 EFFECTS) — but it never fires because nothing changes a badge's state on this static page.
- **Pulse:** the status-dot row is the canonical place for an ambient `--spring`-free pulse (a status dot breathing at 0.85 ζ), and DESIGN.md's own blurb promises it. Dead. This is a `feedback_liquid_weight_universal` violation — "ALL motion must carry weight; dots goo-morph between states" — the status dots don't even pulse, let alone morph.
- **No procedural life, no glass life:** there is no aurora, no GL context, no specular, nothing kinetic on the entire route.

Verdict against the BD "HIGH animation affordance for EVERY component" bar: **F**. The one alive thing is the masthead IconChip bloom.

## 4. POLISH + DISTINCTIVENESS — bespoke or generic-AI-template?

**Generic.** Strip the warm-cream tint and this is a Bootstrap badge documentation page: flat plate, hairline rules, label-paragraph-pills, ×9. Nothing here could only be glass-ui. The saturated jewel-tone row (`--section-color-*`) is the one genuinely on-brand moment — five vivid pills that *do* sing — and it's buried as section 1 of 9 with no scale, no stage, no animation. The page has the library's best asset (the 13-stop ramp) and presents it as a wrapped flex row.

**The two defects make it worse than generic — they make it look broken.** A reader who scrolls to "semantic tones" sees three words in plain ink (`success warning info`) with no pill at all, then "• success with dot" again plain — the page appears half-rendered. On the protagonist status-primitive page this is the cardinal sin.

## 5. iOS-27 / GLASS / PAPER NORTH-STAR FIDELITY

- **§L1 six-layer composite:** entirely absent. Zero glass tiers on the page — the outer plate is the only glass and it's a flat resting card over a *flat gray page*, so blur+saturate refract nothing (nothing behind). iOS-7-flat, not iOS-26-liquid.
- **Glass over COLORFUL aurora (user ask #5):** completely unmet — there is no aurora at all. The badges should float over a saturated multi-nuclei field (the DockStage `<Aurora>` pattern, one offscreen-paused GL context/route) so the loud pills read against motion and the glass plate actually lenses.
- **GLASS + PAPER both:** neither. The jewel-tone teaching row would sing on a `paper-grain`/blueprint-grid substrate (the `math-paper` gold standard) — a paper register for the tone axis, glass for the variant matrix, would give the page the duality DESIGN demands.
- **§L2/§L3 spring physics:** unused (no spring on any specimen, no entrance).
- **§L5 a11y brackets:** inherited via tokens, fine (not a page concern).

## 6. SPACING / RHYTHM (golden-ratio)

Inter-section rhythm is **monotone** — every section is the same vertical beat with the same hairline, so there is no φ-stepped cadence between a major axis (variants) and a sub-example (size×variant). The pill `gap-3` flex rows are uniform. Card-internal √φ padding (`--card-pad-*`) is invisible because there are no inner cards. The masthead-to-body transition is the one good beat; everything after is a flat ledger.

## 7. COLOR — suffusion proportion

The §W-SUFFUSE discipline is *respected* (body ink untinted, the section identity is the one `--section-color-5` amber event in the eyebrow + IconChip) — but the page **squanders its color budget**. The jewel-tone row and viz-basis row carry real color, yet they're presented as small wrapped rows, not focal. Meanwhile the semantic-tone row — which should be the loudest, most colorful moment — paints **nothing** (the defect). Net result: ~85% warm-cream-monochrome with two small vivid rows and one broken row. The aurora should be carrying the color event and there is no aurora.

---

## DEFECTS (file these — not just critique)

1. **`bg-success` / `bg-warning` / `bg-info` paint transparent.** The CVA arms exist (`badge/index.ts:36-41`, `border-transparent bg-success text-success-foreground`) and the `--success/--warning/--info` tokens resolve (valid `oklch`), but the demo build does not emit the `bg-success`/`bg-warning`/`bg-info` Tailwind utilities (the `@theme` semantic-color→utility map / content-scan gap CLAUDE.md §"self-emission class" describes). The semantic-tone row + the "with dot" row render as bare ink. **The page's richest section is invisible.**
2. **Status dots are static.** No pulse on the leading-dot or `bg-current` dot rows, contra DESIGN.md's own blurb and `feedback_liquid_weight_universal`.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Fix the semantic-tone defect FIRST.** Emit `bg-success`/`bg-warning`/`bg-info` (safelist via the `vite.style-assets.ts emitComponentUtilities` P9 path / `@source inline()`, the `BA.W-EMISSION` mechanism) or re-point the CVA arms onto the shipped `--success` token via an inline `:style`/`color-mix` recipe (the `feedback-tone.css` register, `BA.W-FEEDBACK-TONE` — enroll Badge as it enrolled Toast/Notification/Alert). A semantic badge that paints nothing is a broken page, not a design nit.

2. **Each axis in its OWN glassy card over a COLORFUL aurora (user asks #1, #2, #5).** Drop the single outer plate. Render each axis — tone / variant / viz-basis / status-dot / size — as a discrete `<Card>` (the variant matrix in a bigger `floating` card given real viewport, the tone ramp in a `resting` card), all over ONE offscreen-paused saturated multi-nuclei `<Aurora>` field (DockStage pattern, one GL context/route). The loud pills only read as *loud* against busy color; the §L1 refraction only reads against high frequency. This fixes hierarchy + glass + color at once.

3. **Animate every pill to the iOS-27 bar (user ask: HIGH animation affordance).** Ride the specimen rows on `.scroll-cascade` so pills pop in staggered on `--spring-snappy` (the ~7% overshoot — §L2/§L3, the IconChip `:reveal` already on the masthead). Make the status dots **pulse** (the `<StatusDot>`/`<Pulse>` primitive the library ships) and goo-morph between Active→Syncing→Idle→Error states (`feedback_liquid_weight_universal`). The blurb already promises it — deliver it.

4. **Leverage the dock APIs for contextual switching (user ask #3).** The badge's axes (tone · variant · size · semantic) are a perfect `<DockLayerGroup>`/`<DockStack mode="facets">` contextual switcher — flip a facet chip and the pill specimen morphs between axes on the `--spring-dock` clock. One animated dock replaces four flat sections and demonstrates the dock's contextual-switching/silhouette API the brief asks for.

5. **Deploy a series of glass-ui components + a second display moment (user ask #4).** Use `<SegmentedTabs variant="pill">` to switch tone presets, an oversized `text-display` status numeral or a hero `<IconChip>`/`<Badge size="lg">` as a second typographic landmark, a `<BorderProgress>` card showing a count-up badge, and a paper-grain specimen for the GLASS+PAPER duality. Make it a tour, not a table.

6. **Make the loud jewel-tone row the HERO, at scale (user ask #2).** Promote the `--section-color-*` ramp to a full-width focal stage — the 13-stop rainbow as oversized pills with a `.scroll-cascade` pop-in is the page's single most on-brand asset and it's currently a buried wrapped row.

7. **Standardize the import label + tighten language (user asks #6, #7).** Keep `@mkbabb/glass-ui/badge` but derive it / make the SFC import match the canonical surface. Cut the editorializing blurbs ("the loud pills carry their own register", "Pair with status-dot for richer pulse compositions", "baselines coincide because the badge inherits text-sm leading-5") to one declarative line each — let the live, animated specimen teach.
