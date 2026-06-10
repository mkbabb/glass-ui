# AZ.W-SUFFUSE — the suffusion pass: the audacious-type uplift, the color-pop map under the one-color-event rule, the glass/grid/math thin spots — each surface gets its ONE deliberate event

- **Tranche:** AZ (glass-ui)
- **Track:** Band G — design
- **Type:** impl (chassis display-register + the motion-purple/dock-de-red color map + the calm grid/paper/math content idiom)
- **Depends on:** W-GATES (Batch 0 — `proof:all` runnable) + W-HIERARCHY (the `StoryPage.vue` hero chrome-`<h1>` edit lands first; the canonical section rung). Runs Batch 4, parallel with W-MORPH-SHOWCASE ‖ W-HIERARCHY ‖ W-METRIC-UNIFY (sequenced after W-HIERARCHY on the shared `StoryPage.vue`).
- **Status:** SPEC

---

## §0 RE-GROUND (mandatory step-0 before any edit)

This wave starts from the fleet's D2 (typography), D3 (color-pops), D4 (glass/grid/math) findings,
NOT a fresh diagnosis. The house OWNS a magnificent audacious type ladder + a 13-stop section-color
ramp + paper/grid/math vocabulary, but the demo STARVES all three: the chassis caps EVERY title at
`text-heading` regardless of hero-flag, 8 of 12 categories have ZERO display moments, the two top
audacious tiers have ZERO consumers (overfit substrate today — the fix is to ACTIVATE them, not
prune), the motion family spends the WRONG (Fourier-red) hue when R3-11 mandates the ppmycota PURPLE,
and ~104 of 121 routes wear the flat default with no glass-tier/paper/grid/math read. The binding
rule is the ONE-COLOR-EVENT proportion rule (D3-1, verified model): one color event per surface,
chip never exceeds icon scale, body ink never tinted. RE-GREP every cite at HEAD — the digest may
compress and line numbers drift across the Batch-4 siblings (W-HIERARCHY shares `StoryPage.vue`):

1. `grep -n 'text-heading\|variant\|hero' demo/stories/StoryPage.vue` — confirm `StoryPage.vue:41`
   caps EVERY title at `text-heading` (the `variant` computed reads `story.hero` but never upgrades
   the title rung — D2-1). NOTE: W-HIERARCHY lands the hero chrome-`<h1>` SUPPRESSION first; this
   wave lands the hero title DISPLAY-register upgrade on the SURVIVING hero title.
2. `grep -n 'type-display-mega\|type-display-audacious\|type-display-hero' src/styles/typography.css` +
   `grep -rn 'text-display-mega\|text-display-audacious\|text-display-hero' demo/` — confirm the two
   TOP tiers (mega φ^9/2 peak 177px, audacious φ^11/2 peak 352px) have ZERO demo consumers and
   `text-display-hero` rides ONLY `motion/animated-digit.vue` (D2-3: overfit substrate to ACTIVATE).
3. `grep -n 'viz-fourier\|demo-hue\|primary' demo/stories/foundations/motion.vue demo/stories/motion/springs.vue demo/stories/motion/typewriter.vue demo/stories/motion/underline.vue demo/stories/motion/curve-gallery.vue` —
   confirm the motion family spends Fourier-red/orange (D3-3) + the curve-gallery plots near-black
   `--primary` ink (D3-4) where R3-11 mandates the purple.
4. `grep -n 'viz-legendre\|section-color-7' src/styles/tokens/color-radius.css` — confirm the purple
   anchor `--viz-legendre = --section-color-7 = oklch(0.532 0.180 317.5)` (the ppmycota-purple
   library twin — D3-5; ppmycota itself NEVER enters library tokens per E1-7 + the scope fence).
5. `grep -n 'demo-nav-accent\|viz-fourier' demo/layout/dock-nav.css` — confirm the MIS-SPENT dock red
   (D3-2). NOTE: the DOCK red retire is W-REGISTER-IOS's scope (the ROOT register redefinition); this
   wave does NOT re-edit `dock-nav.css` — D3-2 is recorded here as the cross-reference, the surface is
   OWNED by W-REGISTER-IOS.
6. `grep -n 'background\|cardTier' demo/stories/StoryHero.vue` + parse `demo/stories/manifest.ts` —
   confirm ~104/121 routes declare NO `background` (D4-2) and the grid is suppressed under the 0.65α
   resting card (D4-3).
7. RE-CONFIRM the positive idioms stay UNTOUCHED (D3-8): timeline markers, notification tones,
   gate-pattern `text-success`, empty-states/icons chips — these ARE the model. RE-CONFIRM the
   legitimately-monochrome surfaces stay flat (D3-9): the icon GRID, the Section type-ladder, the
   curve-gallery TABLE — adding color VIOLATES proportion. RE-CONFIRM the OVER-SPEND axis is
   near-empty (D4-7): do NOT add live substrates to content pages (legibility + one-GL-context budget).

If any cite has moved, the scope-reveal trigger fires — re-derive the edit-site table.

---

## Goal criterion

The design language is SUFFUSED within proportion: type SINGS through the chassis (a hero-flagged
page wears a display-register title, the flat categories gain a display-register section-head
option, the dead mega/audacious tiers ACTIVATE on the metric/number surfaces — their natural home),
the motion family reads as ONE coherent ppmycota-PURPLE identity (the curve plots, dots, sample
blocks, typewriter, underline all re-pointed off Fourier-red onto `--viz-legendre`), and the thin
content pages gain the CALM glass-tier/paper-grain/blueprint-grid/section-accent/fira-code-math
idioms — each surface getting its ONE deliberate color/display event, never two competing. The
restraint counters are honored: the legitimately-monochrome surfaces stay flat, no content page
gains a live substrate, and the body ink is never tinted.

## Completion criterion

The born-RED gate `proof:suffuse` (G1) flips GREEN, AND the suffusion lands proven by a captured
DELTA (`proof:live-verified-ledger`). Specifically:

1. `npm run proof:suffuse` (born-RED, NEW — the source/structure arm) asserts: (a) `StoryPage`
   upgrades the hero title to a display register (text-display-3/4) on `variant="hero"` — the title
   rung is no longer `text-heading` for ALL pages; (b) the two top audacious tiers (`text-display-mega`/
   `text-display-audacious`) have ≥2 live demo consumers each (the metric/number/hero surfaces — the
   ACTIVATE, not prune); (c) the `--motion-accent` token exists keyed off `--viz-legendre`, and the
   motion-category surfaces consume it — NO `--viz-fourier`/`--primary`/`--demo-hue` orange-red
   remains on a motion plot/dot/sample/typewriter/underline; (d) the one-color-event proportion rule
   holds on the enrolled surfaces (one color event per surface; body ink untinted) and the
   legitimately-monochrome surfaces (icon grid, type ladder, curve TABLE) stay flat; (e) the enrolled
   thin pages gain the calm grid/paper/section-accent idiom WITHOUT a live substrate (no `<Aurora>`/
   `<Constellation>`/`<FourierField>`/`<GooBlob>` added to a content page — the over-spend fence).
2. The π DELTA arm (`tests-visual/suffuse.spec.ts`, NEW) — a `getComputedStyle` readback proves: a
   hero title resolves to a display-register font-size (not 25.9px); a motion plot/dot resolves to
   `--viz-legendre` (oklch 0.532 0.180 317.5) NOT `--viz-fourier`; an activated metric number resolves
   to the mega/audacious tier; an enrolled thin page's grid/paper underlay is VISIBLE (the
   readable-strength fix, not the 7%-under-0.65α-suppressed read).
3. `vue-tsc --noEmit` + `npm run build` green; `proof:glass-cohesion` stays green (the thin-page
   suffusion is calm grid/paper washes + content-level accents, not a solid-surface or live-substrate
   regression).

The π in-situ readback (G1.2) is the binding suffusion truth; the source arm ratifies shape only.

---

## The three suffusion arms (each surface gets its ONE deliberate event)

### Arm D2 — the audacious-type uplift

The ladder exists (golden-ratio √φ scale, display-1..5 + mega/hero/audacious peaking at 352px, the
fast.com peg); it is just not WIRED. The uplift (the D2-6 per-surface roadmap):

1. **Chassis hero-register (D2-1/D2-4).** `StoryPage` upgrades the hero title to `text-display-3`
   (or `text-display-4` on the front-door hero rows) when `variant="hero"`, and content rows to
   `text-title` — so the display moment is a CHASSIS affordance, not per-page bespoke craft. (Runs
   AFTER W-HIERARCHY's hero chrome-`<h1>` suppression — the surviving hero `<h1>` gets the display
   rung.)
2. **Activate the dead audacious tiers (D2-3).** `--type-display-mega` (peak 177px) + `--type-display-audacious`
   (peak 352px) get ≥2 live consumers each on the metric/number/hero surfaces — the dead tiers'
   natural home (the fast.com peg is a metric peg): `data/metric-cell`, `data/metric-stack`,
   `metric-badge` numbers, the hero compositions. The visual-load-bearing invariant is MET by
   activation (the user wants MORE audacity, not less — D2-3 explicitly says ACTIVATE, not prune).
3. **The 8 flat categories' section heads (D2-2/D2-5/D2-6c).** The flat categories (forms, display,
   containers, data, feedback, dock, navigation, substrates) gain a display-register section-head
   OPTION — the math/grid flavor: the `.section-label` mono-smallcaps eyebrow pairs with a display
   rung above. This couples W-HIERARCHY's canonical section rung (the STRUCTURE) with the DISPLAY
   register (the audacity) — W-HIERARCHY owns the rung canon, this wave owns the display-register
   option ON it. The substrates pages (0/5, the most VISUAL surfaces) + the dock/navigation chrome
   demos (the front-door facilities) get a hero title (D2-6d/e).

### Arm D3 — the color-pop map under the one-color-event rule

The MODEL is verified (D3-1): `color-mix(in srgb, var(--section-color-N) 25%, transparent)` chip
backplate + full-chroma glyph, ONE event per surface, chip ≤ icon scale, body ink untinted. The
increase-within-proportion map:

1. **The motion-PURPLE identity (D3-3/D3-4/D3-5 — the headline color move).** Mint `--motion-accent:
   var(--viz-legendre)` (the ppmycota-purple library twin, an EXISTING token — NOT ppmycota itself,
   which never enters library tokens per E1-7) and re-point the WHOLE motion category onto it: the
   curve-gallery plots + driven dots (`curve-gallery.vue:152,162` off `--primary` ink), the
   `foundations/motion` dots + sample blocks (`:174,220` off `--viz-fourier`), the springs
   orchestrator subject block (`springs.vue:158` off the `--demo-hue` orange-red), the typewriter
   (`typewriter.vue:53` off `--viz-fourier`), the underline tinted example (`underline.vue:99` off
   `--viz-fourier`). The motion family gains ONE coherent purple event anchored in the existing
   `--section-color-7`/`--viz-legendre` family — the keyframes design-language identity R3-11 names.
2. **The MIS-SPENT dock red (D3-2) — CROSS-REFERENCE, not this wave's edit.** The dock active register
   reads Fourier-red; the retire is W-REGISTER-IOS's ROOT register redefinition (the de-red moves
   hover/active/selected to the iOS luminance-lift). This wave RECORDS D3-2 as the color-map entry but
   does NOT touch `dock-nav.css` (W-REGISTER-IOS owns it — disjoint surface, sequenced Batch 1).
3. **Flat surfaces that EARN a proportioned event (D3-6/D3-7/D3-10).** The metric-cell leading glyph
   tints to its semantic `--chart-*` viz color (download/upload/latency/jitter — an icon-glyph tint,
   body value+unit untinted; needs a small `iconColor`/`accent` prop on MetricCell, which folds onto
   W-METRIC-UNIFY's shared core); the colored section-marker idiom (`settings.vue` inline
   `color: var(--section-color-N)`) abstracts into a reusable `.section-label--tinted` variant applied
   to flat composition pages; the GOLD register (`--color-gold`/`--tier-featured`, under-used) gains a
   featured/recommended card marker — the natural one-color-event for premium/achievement surfaces.
4. **The restraint counters (D3-8/D3-9) — DO NOT touch.** The positive idioms (timeline markers,
   notification tones, gate `text-success`, empty-states/icons chips) are the model; the
   legitimately-monochrome surfaces (icon grid, Section type-ladder, curve-gallery TABLE) stay flat —
   adding color VIOLATES the one-event-per-surface proportion rule. The gate asserts these stay flat.

### Arm D4 — the glass/grid/math thin spots (the calm content idiom, NOT a live substrate)

The DOMINANT axis is UNDER-spend (D4-1/D4-2): ~104/121 routes wear a single 0.65α resting card on a
flat warm-white page with zero glass-tier/paper/grid/math read. The OVER-spend axis is near-empty
(D4-7) — no content page stacks competing live substrates; the only multi-substrate files are the
substrate demos themselves (intentional). The GOLD STANDARD is `compositions/math-paper.vue` (D4-5):
a section-accent `border-l-[3px]` rail keyed off `--section-color-3`, a `§ 3 · Convergence` mono
section-label, an italic fourier S glyph, a fira-code `tabular-nums` math block on a `paper-grain-overlay`
article — the suffusion lives in CONTENT COMPOSITION, not the (faint, buried) page `background`. The
lever:

1. **Lift the declared-background strength (D4-3 over-restraint counter).** Where a page DOES declare
   grid/paper (metric-cell, metric-stack), the 7%-grid-under-0.65α-card is invisible — drop the
   content card to a thinner tier (`quiet`/`wash`, the same thinning `StoryHero` already applies over
   LIVE substrates) so the calm wash reads. The lever already exists; extend it to grid/paper.
2. **Propagate the math-paper content idiom (D4-5/D4-6) WITHIN PROPORTION.** The section-accent rail +
   fira-code math marginalia + section/fourier accent pops abstract onto the thin pages — a consistent
   section-accent register (the `.section-label`/`--section-color` ramp, under-spent) across content
   pages, a cheap in-proportion gain needing NO background change + NO live substrate. The enrolled
   thin pages: the canonical thin offenders (settings — a page literally ABOUT grain/paper renders
   flat white-on-white — D4-1; the ledger-shaped table/data-table, the most native grid-underlay fit,
   currently bare — D4-4).
3. **The restraint counter (D4-7 — the binding fence).** Do NOT add live substrates to content pages
   (kills legibility + the one-GL-context-per-route budget). The lever is the CALM grid/paper washes
   lifted to readable strength + the content-level section-accent/math-marginalia idiom — NOT another
   aurora. The gate asserts NO `<Aurora>`/`<Constellation>`/`<FourierField>`/`<GooBlob>` is added to a
   content page.

---

## The defect (file:line-grounded — RE-GREP at HEAD per §0)

| id | surface | mechanism | evidence (file:line at digest time) |
|---|---|---|---|
| D2-1 (S2) | chassis title | The per-page title chassis caps EVERY story at `text-heading` (~26px) — the global flat-type root. `StoryPage.vue:41` renders the page `<h1>` as `text-heading` for ALL pages including the hero-flagged ones; the hero variant never upgrades the chassis title. | `demo/stories/StoryPage.vue:41`; live h1fs=25.888px across routes; `ground/D2-front-door-intro.png`, `D2-flat-buttons.png` |
| D2-2 (S2) | 8 categories | 8 of 12 categories have ZERO display moments — forms/display/containers/data/feedback/dock/navigation/substrates (~75 pages) use no display/hero/pane-title; section heads cap at `text-subheading` (smallest rung). | per-category grep (8/12 0-sing); live dialog/buttons/inputs section h2=20.352px; `ground/D2-flat-content-dialog.png` |
| D2-3 (S3) | dead tiers | The two TOP audacious tiers are dead minted substrate — ZERO consumers. `--type-display-mega` (peak 177px) + `--type-display-audacious` (peak 352px) used in NO page; `text-display-hero` only in `animated-digit.vue`. ACTIVATE on metric/number/hero (not prune). | `src/styles/typography.css:129-131`; grep live consumers (only `motion/animated-digit.vue:31,38`); `ground/D2-type-ladder.png` |
| D2-4 (S2) | hero register | Type sings ONLY where a hero body is hand-authored — `intro.vue:58` + `hero.vue:96` (text-display-4, 86px) are bespoke in-body markup; 17/110 stories touch any display class. Make the display moment a CHASSIS affordance. | `demo/stories/foundations/intro.vue:58`; `demo/stories/compositions/hero.vue:96`; `ground/D2-front-door-intro.png` |
| D3-2 (S2) | dock red | MIS-SPENT RED (R3-6 cross) — the demo dock active register reads Fourier-red on the rail `::before` + bottom-dock active glyph. **OWNED by W-REGISTER-IOS** (the ROOT de-red); recorded here as the color-map entry. | `demo/layout/dock-nav.css:18-21,57-60,101-106`; `ground/D3-misspent-dock-red-light.png` |
| D3-3 (S2) | motion red | MIS-SPENT RED across MOTION — `foundations/motion` dots (`:174`) + sample blocks (`:220`); springs subject block (`springs.vue:158` `--demo-hue` orange-red); typewriter (`typewriter.vue:53` `--viz-fourier`); underline (`underline.vue:99` `--viz-fourier`). No coherent identity; the wrong hue. | `demo/stories/foundations/motion.vue:174,220`; `demo/stories/motion/springs.vue:158`, `typewriter.vue:53`, `underline.vue:99`; `ground/D3-misspent-motion-red-light.png` |
| D3-4 (S2) | curve-gallery | MONOCHROME-FLAT — the flagship CSS↔JS curve table plots polylines + driven dots in near-black `--primary` ink (`:152,162`). The single highest-leverage motion-purple opportunity. | `demo/stories/motion/curve-gallery.vue:152,162`; `ground/D3-flat-curve-gallery-ink-light.png` |
| D3-5 (S3) | purple anchor | THE PURPLE ANCHOR — `--viz-legendre = --section-color-7 = oklch(0.532 0.180 317.5)` is the ppmycota-purple library twin already shipped. Mint `--motion-accent: var(--viz-legendre)` consumed across motion. | `src/styles/tokens/color-radius.css:211,228`; `docs/tranches/Q/research/Qrho-keyframes-easing-playground-audit.md:100,159` |
| D3-6 (S3) | metric-cell | MONOCHROME-FLAT metric-accent gap — MetricCell exposes `:icon` but NO color/accent axis; the glyphs map 1:1 onto the `--chart-*` semantic palette. Tint the leading glyph to its semantic viz color (body value+unit untinted; small `iconColor` prop, folds onto W-METRIC-UNIFY). | `demo/stories/data/metric-cell.vue:14-19`; `src/components/custom/metric-cell/MetricCell.vue` (no color prop); `ground/D3-flat-metric-cell-light.png` |
| D3-7 (S3) | section-marker | IDIOM TO ABSTRACT — the colored section-marker (`settings.vue` inline `color: var(--section-color-N)`, 4 sites) is shipped but ad-hoc; abstract into a `.section-label--tinted` variant + apply to flat composition pages. | `demo/stories/compositions/settings.vue:77-78,107-109,196-198,235-237`; `src/styles/typography.css:455` |
| D3-10 (S3) | gold under-use | GOLD register under-used — `--color-gold`/`--tier-featured` spent only on the CTA + chassis upload phase; the natural one-color-event for featured/premium/achievement surfaces. | `src/styles/tokens/scale-paper.css:90-93`; `src/styles/tokens/color-radius.css:233` |
| D4-1 (S2) | settings | THIN SURFACE (canonical) — a page literally ABOUT 'Grain'/'Paper underpaint' renders flat off-white nested Cards on flat warm-white; no paper grain, grid, glass-tier read, or section accent. | `ground/d4-thin-settings.png`; `demo/stories/compositions/settings.vue:84,116,205,244`; `manifest.ts` settings row (no background) |
| D4-2 (S2) | breadth | ~104/121 routes declare NO `background` — a single 0.65α resting card on a flat page; the design language is absent on the bulk of the storybook. | `demo/stories/manifest.ts` (~17 rows carry background); `demo/stories/StoryHero.vue:132-135` (cardTier default resting) |
| D4-3 (S3) | over-restraint | Even grid/paper-declaring pages read flat — the 7% grid (`story-hero.css:15`) under a 0.65α card is invisible; lift the strength / drop the card to `quiet`/`wash` (the lever StoryHero already applies over LIVE substrates). | `demo/stories/story-hero.css:15`; `demo/stories/StoryHero.vue:132-135`; `ground/d4-suf-metric-stack-grid.png` |
| D4-5 (S3) | gold standard | `compositions/math-paper.vue` — the design language done right WITHIN PROPORTION: section-accent rail + mono section-label + italic fourier glyph + fira-code math block on a paper-grain article. The idiom to PROPAGATE (content composition, not a live substrate). | `demo/stories/compositions/math-paper.vue:11-30,73-100`; `ground/d4-suf-math-paper-grid.png` |
| D4-7 (S3) | over-spend fence | The over-spend axis is near-empty — do NOT add live substrates to content pages (legibility + one-GL-context budget). The lever is calm grid/paper + content-level accents. | grep `<Aurora\|<Constellation\|<FourierField\|<GooBlob` over `demo/stories/**.vue` (only substrate-demo + chassis files 2+) |

---

## Scope (numbered — concrete change/deletion only)

1. **D2 chassis hero-register.** In `demo/stories/StoryPage.vue`, upgrade the hero title to a display
   register (`text-display-3`, or `text-display-4` on the front-door hero rows) on `variant="hero"`,
   and content rows to `text-title` — the display moment becomes a chassis affordance. (Sequenced
   AFTER W-HIERARCHY's hero chrome-`<h1>` suppression on the same file — §4a.)
2. **D2 activate the dead tiers.** Wire `text-display-mega` + `text-display-audacious` onto ≥2 demo
   consumers each on the metric/number/hero surfaces (`data/metric-cell`, `data/metric-stack`,
   `metric-badge`, the hero compositions) — the dead tiers gain live load-bearing consumers.
3. **D2 flat-category section heads.** Add the display-register section-head OPTION to the flat
   categories (the math/grid flavor pairing the mono `.section-label` with a display rung) — coupled
   onto W-HIERARCHY's canonical section rung; the substrates (0/5) + dock/navigation chrome demos get
   a hero title.
4. **D3 the motion-purple identity.** Mint `--motion-accent: var(--viz-legendre)` (in the demo theme
   layer — a DEMO-LOCAL accent, presets-in-consumers, NOT a library token edit beyond the existing
   `--viz-legendre`) and re-point `curve-gallery.vue:152,162`, `foundations/motion.vue:174,220`,
   `springs.vue:158`, `typewriter.vue:53`, `underline.vue:99` onto it — the motion family's ONE
   coherent purple event.
5. **D3 flat-surface earned events.** Tint the metric-cell leading glyph to its semantic `--chart-*`
   viz color (the `iconColor`/`accent` prop folds onto W-METRIC-UNIFY's MetricCell core); abstract the
   colored section-marker into a `.section-label--tinted` variant in `src/styles/typography.css` +
   apply to enrolled flat composition pages; add the gold featured-marker idiom on a featured/
   recommended surface.
6. **D4 lift the declared-background strength.** In `demo/stories/StoryHero.vue` (or `story-hero.css`),
   extend the live-substrate card-thinning (`quiet`/`wash`) to grid/paper-declaring pages so the calm
   wash reads (the D4-3 over-restraint fix).
7. **D4 propagate the math-paper idiom.** Apply the section-accent rail + fira-code math marginalia +
   section-accent register to the enrolled thin pages (settings — its own subject; table/data-table —
   the ledger grid-underlay fit) WITHIN PROPORTION, NO live substrate.
8. Author `scripts/proof-suffuse.mjs` (the born-RED source gate, G1) + register it in
   `scripts/gates.mjs` (local+ci) + `ci.yml`.
9. Author `tests-visual/suffuse.spec.ts` (the π DELTA arm, G2).
10. Update `CLAUDE.md` (the design-language suffusion register — the chassis hero display register,
    the `--motion-accent` purple identity, the calm content-suffusion idiom + the one-color-event
    proportion rule as the binding constraint).

## §3a Triumvirate Dispatch

- **File-bounds expansion**: if the motion-purple re-point requires a LIBRARY token edit beyond the
  existing `--viz-legendre`/`--motion-accent` (a structural reveal that the motion surfaces cannot be
  re-pointed in the demo layer alone) OR if a thin-page suffusion cannot land without a live substrate
  (violating D4-7), the scope-reveal trigger fires — research, augment bounds, redress. ppmycota purple
  entering library tokens is a HARD FENCE breach (E1-7) — never absorb it.
- **Hard-gate failure** not local-recoverable: if the π readback finds a one-color-event VIOLATION
  after the suffusion (two competing color events on one surface, or a tinted body ink), triumvirate —
  re-derive the proportion budget, do not add color blindly.
- **Diagnostic loop**: three iterations where the lifted grid/paper strength still reads flat
  (suppressed by the opacity stack) without isolating WHY (the substitution-vs-inheritance / card-tier
  interaction) → triumvirate.

## File Bounds

| File | Access |
|---|---|
| `demo/stories/StoryPage.vue` | modify (hero title display register — sequenced after W-HIERARCHY) |
| `demo/stories/StoryHero.vue` (+ `story-hero.css`) | modify (grid/paper card-thinning) |
| `demo/stories/data/metric-cell.vue` / `metric-stack.vue` | modify (activate audacious tiers + metric glyph tint) |
| `demo/stories/foundations/motion.vue` | modify (purple re-point) |
| `demo/stories/motion/curve-gallery.vue` / `springs.vue` / `typewriter.vue` / `underline.vue` | modify (purple re-point) |
| `demo/stories/compositions/settings.vue` / `table.vue` / `data-table.vue` | modify (math-paper idiom propagate + tinted section-marker) |
| `demo/` theme layer (the `--motion-accent` demo-local mint) | modify |
| `src/styles/typography.css` | modify (the `.section-label--tinted` variant) |
| `src/components/custom/metric-cell/MetricCell.vue` | modify (the `iconColor`/`accent` prop — folds onto W-METRIC-UNIFY) |
| `scripts/proof-suffuse.mjs` | create |
| `scripts/gates.mjs` / `ci.yml` | modify (gate rows) |
| `tests-visual/suffuse.spec.ts` | create |
| `CLAUDE.md` | modify (the suffusion register section) |

**Do NOT touch:** `demo/layout/dock-nav.css` (the dock red retire — W-REGISTER-IOS owns it, disjoint
surface), the positive-idiom surfaces (timeline/notification/gate/chips — D3-8, the model), the
legitimately-monochrome surfaces (icon grid, Section type-ladder, curve-gallery TABLE — D3-9, adding
color violates proportion), ANY library color token beyond `--viz-legendre`/`--motion-accent`
(ppmycota purple NEVER enters library tokens — E1-7 + the AZ scope fence), any content page's
background to add a LIVE substrate (D4-7 over-spend fence), the typography rung VALUES (the rungs are
correct — this wave WIRES them).

### §4a Disjointness

Three natural agent units — D2 (type), D3 (color), D4 (glass/grid/math) — touch LARGELY disjoint
files; the overlaps are sequenced: `StoryPage.vue` is shared between D2 (hero title) and W-HIERARCHY
(hero chrome-`<h1>`) — W-HIERARCHY lands FIRST (the dependency), then D2's title edit on the surviving
hero `<h1>`; `StoryHero.vue` is touched by D4 only; `metric-cell.vue`/`MetricCell.vue` is shared by D2
(activate tiers) + D3 (glyph tint) — fold those two into ONE agent unit, not parallel. Cross-wave:
shares `ci.yml`/`gates.mjs` with the Batch-4 siblings — sequence the gate-row registrations into the
Batch-4 re-byte-lock, not a parallel write. The `MetricCell.vue` `iconColor` prop coordinates with
W-METRIC-UNIFY (it lands on the unified value-display core) — sequence after W-METRIC-UNIFY's core if
both touch `MetricCell.vue`, or fold the prop into W-METRIC-UNIFY with this wave consuming it.

## §5 Agent Units

### AZ.W-SUFFUSE.1 The audacious-type uplift (Arm D2)

- **Goal:** type sings through the chassis — hero pages wear a display-register title, the dead
  mega/audacious tiers activate on the metric/number/hero surfaces, the flat categories gain a
  display-register section-head option.
- **Mechanism:** the `StoryPage` hero title display register; wire mega/audacious onto ≥2 metric/
  number consumers each; the flat-category display-register section-head option.
- **Files:** the D2 subset (StoryPage, metric-cell/stack, the flat-category stories).
- **Sub-gate:** `proof:suffuse` D2 asserts GREEN (hero title off `text-heading`, the two tiers ≥2
  consumers) + the π readback proving a hero title resolves to a display register.

### AZ.W-SUFFUSE.2 The color-pop map under the one-color-event rule (Arm D3)

- **Goal:** the motion family reads as ONE coherent ppmycota-purple identity, the flat surfaces that
  earn an event get their proportioned chip/glyph, and the restraint counters hold.
- **Mechanism:** mint `--motion-accent: var(--viz-legendre)` + re-point the motion surfaces; the
  metric glyph tint + `.section-label--tinted` + gold featured-marker; the monochrome surfaces stay flat.
- **Files:** the D3 subset (motion stories, the demo theme, typography.css, the composition pages).
- **Sub-gate:** `proof:suffuse` D3 asserts GREEN (no `--viz-fourier`/`--demo-hue` on a motion surface;
  the proportion rule holds) + the π readback proving a motion plot resolves to `--viz-legendre`.

### AZ.W-SUFFUSE.3 The glass/grid/math thin spots (Arm D4)

- **Goal:** the thin content pages gain the calm glass-tier/paper-grain/grid/section-accent/math idiom
  within proportion — each surface its ONE deliberate event, no live substrate.
- **Mechanism:** lift the declared-background strength (card-thinning to quiet/wash); propagate the
  math-paper section-accent + fira-code idiom to settings + table/data-table.
- **Files:** the D4 subset (StoryHero/story-hero.css, settings/table/data-table).
- **Sub-gate:** `proof:suffuse` D4 asserts GREEN (NO live substrate added to a content page; the
  enrolled thin pages gain the idiom) + the π readback proving the grid/paper underlay is visible.

## §6 Hard Gate

1. **G1 — `npm run proof:suffuse` (born-RED, source arm).** Parses the enrolled demo surfaces +
   tokens: (a) `StoryPage` upgrades the hero title off `text-heading` on `variant="hero"`; (b) the two
   top audacious tiers have ≥2 live consumers each; (c) `--motion-accent` keyed off `--viz-legendre`
   exists + the motion surfaces consume it (NO `--viz-fourier`/`--demo-hue`/`--primary` orange-red on
   a motion plot/dot/sample/typewriter/underline); (d) the one-color-event proportion holds (one event
   per surface; body ink untinted) + the legitimately-monochrome surfaces stay flat; (e) NO
   `<Aurora>`/`<Constellation>`/`<FourierField>`/`<GooBlob>` added to a content page (the over-spend
   fence) + ppmycota purple is NOT in any library token. Born-RED: FAILS on the pre-edit tree (the
   flat type + the Fourier-red motion + the thin pages) and passes after.
2. **G2 — `tests-visual/suffuse.spec.ts` (π DELTA).** Live `:5199` readback: a hero title resolves to
   a display-register font-size (≠25.9px); a motion plot/dot resolves to `--viz-legendre`
   (oklch 0.532 0.180 317.5) ≠ `--viz-fourier`; an activated metric number resolves to the
   mega/audacious tier; an enrolled thin page's grid/paper underlay is VISIBLE. The captured paired-π +
   screenshots are the close DELTA artefact.
3. `vue-tsc --noEmit` + `npm run build` green; `proof:glass-cohesion` stays green (calm washes +
   content accents, no solid-surface or live-substrate regression).

## §7 Format And Lint Cadence

`npm run typecheck` after each arm; `npm run build` to confirm the demo + `/styles` re-emit (the
`.section-label--tinted` variant + the MetricCell prop); `git diff --check`. Prettier on touched
`.vue`/`.css`; ESLint on the MetricCell SFC. The π spec runs against a quiet `:5199` server.

## §8 Verification Artefacts

- `scripts/proof-suffuse.mjs` output (born-RED→GREEN transcript).
- `tests-visual/suffuse.spec.ts` paired-π JSON (hero title rung, motion plot color, metric tier,
  thin-page grid visibility) + before/after screenshots of a hero page, a motion page, a thin page,
  saved under `docs/tranches/AZ/audit/visual/W-SUFFUSE-DELTA.md`.
- The per-surface one-color-event ledger (each enrolled surface + its ONE deliberate event + the
  restraint counters recorded — the proportion budget as a close artefact).

## §9 Commit Plan

- Arm-D2 commit: `feat(AZ): audacious-type uplift — chassis hero display register + activate the dead
  mega/audacious tiers on metric/number surfaces (W-SUFFUSE.1)`. Body required (the per-surface roadmap
  + the activate-not-prune rationale).
- Arm-D3 commit: `feat(AZ): the motion-purple identity + the color-pop map under the one-color-event
  rule (W-SUFFUSE.2) — --motion-accent off --viz-legendre; the restraint counters held`. Body required
  (the proportion budget + ppmycota-stays-in-consumer).
- Arm-D4 commit: `feat(AZ): the glass/grid/math content-suffusion idiom on the thin pages, within
  proportion, no live substrate (W-SUFFUSE.3)`. Body required (the calm-wash lever + the over-spend fence).
- Gate-row commit folds into the Batch-4 re-byte-lock.
- Doc/status commit at close (`CLAUDE.md`/PROGRESS).

## §10 Dependencies

- **Depends on:** W-GATES (`proof:all` runnable; the `:5199` convention) + W-HIERARCHY (the
  `StoryPage.vue` hero chrome-`<h1>` suppression lands first; the canonical section rung the
  display-register section-head option pairs with). Coordinates with W-METRIC-UNIFY (the MetricCell
  `iconColor` prop lands on the unified value-display core) + W-REGISTER-IOS (the dock-red retire — the
  D3-2 color-map entry — is THAT wave's surface, not this one).
- **Blocks:** nothing hard downstream.

## §11 Archaeology

Prior attempt: the house shipped the full type ladder + the 13-stop section-color ramp + the
paper/grid/math vocabulary + a verified one-color-event chip model (the icons/empty-states chips),
but the demo STARVED all of it — the audacity existed in the tokens, accidental in the render (17/110
stories hand-author a display moment; the dead tiers had zero consumers; the motion family spent the
wrong hue). The new guardrail is `proof:suffuse` asserting the chassis hero register + the ≥2-consumer
activation of the audacious tiers + the one-color-event proportion + the over-spend fence — the
"language-in-tokens / starved-in-render" gap cannot recur because the gate binds the WIRING, not just
the token presence.

## Successor for any deferral

The enrolled surfaces are the high-leverage subset (the worst thin offenders, the motion category, the
metric/hero surfaces). The LIBRARY-WIDE thin-page suffusion (all ~104 flat routes) is the W60-class
page-redesign (the rich per-page backgrounds that make glass POP — D6-6) — NAMED there, not silently
dropped; this wave lands the CALM content-suffusion idiom + the chassis affordances + the proportion
gate on the enrolled subset, and W60 consumes them at breadth. The MetricCell `iconColor` prop, if it
cannot land cleanly without W-METRIC-UNIFY's shared core, is NAMED to W-METRIC-UNIFY (this wave
consumes it there). The press-register reconciliation deferred from W-REGISTER-IOS (the Button CVA vs
dock control press divergence) folds into this wave's suffusion register if it surfaces — recorded.
