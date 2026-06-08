# AX.W23 — Carousel indicator re-author + glass-scrubber naming decision

**Band** H · SLIDERS · **Severity** blocker · **dependsOn** AX.W00 · AX.W09 · **Charter** AX.md §3 (the
`### AX.W23` block, lines 1218-1254) + the §1 summary row (line 131) + the §2 band-H line (185) + §2b
band-H precept row (220) + §4 note 5 (the slider half is DONE/visually-true at AV.W11; the only open
slider item is the literal glass-scrubber RENAME — USER-ADJUDICATED, folded here; the carousel half is the
genuine blocker — lines 2015-2018) · **Audit** `deep-audit-corpus.json` slice `sliders-consolidate`
(index 21, findings F0=cardinality-DONE / F1=rounded-knob-DONE / F2=glass-scrubber-rename-PARTIAL-deliberate
/ F3=consumers-ported-DONE / F4=carousel-dots-BROKEN-blocker / F5=carousel-chrome-glass-atoms-UNRUN) +
slice `aw-plan-delivery-audit` (index 31, F6=the rename fell between "done" items, schedule it explicitly) +
`constellation-analysis-corpus.json` `harden:storybook-primitives-sliders` (findings 4=the rename
decision-gate-with-default, 7=π-lane needs DOM-cascade/computed-style readback not GPU readPixels, 9=W23's
only true dependency is W09+W00, 10=route the tree-wide no-dead-arbitrary SWEEP to W27a, W23 owns the
carousel INSTANCE) + the slides `idiom:slides` DeckPager working-oracle citation.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `eaba94f` on four falsifiable witnesses that do NOT hold today. Each was
re-proven live against HEAD (not trusted from the audit) — the §0 cardinal "re-verify before acting":

- **RED witness 1 (the carousel position-dot rail reads as one lopsided bright bar on a dark page —
  inactive dots are functionally invisible).** `src/components/ui/carousel/CarouselDots.vue:71-72` paints
  the INACTIVE dot `bg-muted-medium` — `--muted-medium` resolves to `color-mix(in srgb, var(--muted) 50%,
  transparent)` (`tokens.css:419`), a near-black at 50% alpha. The carousel story
  (`demo/stories/navigation/carousel.vue`) places the dots on a translucent dark card (`bg-card/30`), so
  the inactive dots have NO contrast against the surface behind them and the row reads as a single bright
  active pill with no track. The falsifiable RED: *a π-lane computed-style readback at
  `/navigation/carousel` on a dark page measures the inactive dot's resolved background contrast against
  the card surface BELOW the WCAG 1.4.11 non-text floor of 3:1 (the live audit measured the inactive dot
  as `srgb 0.116…/0.5` on `oklab(0.216/0.3)` — invisible). After the re-author: every inactive dot
  resolves ≥3:1 against the translucent dark surface in BOTH schemes (GREEN).*

- **RED witness 2 (the active dot's `scale-[var(--scale-hover)]` arbitrary class emits NO CSS — the
  Tailwind-v4 var-in-arbitrary content-scan non-emit).** `CarouselDots.vue:68-69` drives the active dot's
  emphasis with `scale-[var(--scale-hover)]`. `--scale-hover` EXISTS (`tokens.css:1035` = `1.08`), but the
  arbitrary form `scale-[var(--…)]` is silently dropped by Tailwind v4's content-scan — no matching
  stylesheet rule emits, so the live computed `transform` is `none`. The active dot's only real emphasis
  is the `w-6` width, which on its own reads as a "progress fill," not a position pip (the SAME non-emit
  family as the §13/W24 card-lift `@utility` snag — slice 21 F4). The falsifiable RED: *a π-lane probe
  asserts the active dot's computed `transform` is NOT `none` (i.e. a real scale/morph emitted) — at HEAD
  it IS `none` (RED). After: the active emphasis emits real CSS (a scoped `data-[active]` rule or an
  emitted utility), computed `transform`/width reads the morph (GREEN).*

- **RED witness 3 (`proof:carousel-glass-atoms` does NOT exist; the carousel chrome is the never-run
  AW.W30 surface).** `package.json` has NO `proof:carousel-glass-atoms` scripts entry (only
  `proof:slider-two-only` at line 585), and `proof:slider-two-only` is NOT registered in `scripts/gates.mjs`
  (it rides the AV gate-fleet, un-re-registered into AX). The carousel CHROME confirms the gap live:
  `GlassCarousel.vue:127-149` is a flat bordered pill with on-hover-only `--glass-shadow-wash` and NO
  `.glass-material` specular/rim; `GlassCarouselItem.vue:24-40` has NO four-state contract (no
  `aria-pressed`/`data-state`, no `.focus-ring`, no `.tap-squish`); the three carousel surfaces speak
  divergent spring tongues (the shell + item both spring on `--spring-snappy`/`--ease-standard`, off the
  governed `--spring-*` register). The falsifiable RED: *`node -e 'require("./package.json").scripts["proof:carousel-glass-atoms"]'`
  → undefined (RED); GlassCarouselItem carries no `data-state`/`aria-pressed` (RED). After: the gate is
  registered + GREEN with a dot-contrast assertion + a no-dead-class assertion, and the chrome carries the
  four-state contract on the `.glass-material` substrate (GREEN).*

- **RED witness 4 (the §9.1 literal glass-scrubber RENAME is un-adjudicated and un-scheduled — it fell
  between "done" items).** `src/components/ui/slider/index.ts:36` still keys `standard: ''` with
  default `'standard'`; the doc-comment (`:18`) names the glass-scrubber INTENT ("the general-purpose
  glass-scrubber knob") but the literal token name the directive asked for is absent. AV.W11 §2
  deliberately kept the key `standard` (zero call-site churn). Slice 21 F2 recommends ACCEPT; slice 31 F6
  recommends RENAME — the corpus is SPLIT, and the charter marks it USER-ADJUDICATED. The falsifiable RED:
  *the §9.1 rename directive carries no recorded adjudication + no forcing function, so it has already
  fallen between "done" items exactly as slice 31 F6 warns (RED — un-decided). After: the wave records the
  decision (with a wave-open DEFAULT if no user adjudication) + the FULL consumer-port FileBound if RENAME
  is chosen (GREEN — decided + scheduled).*

The wave is RED at HEAD on witnesses 1-3 (live carousel defects + the missing gate) and un-decided on
witness 4; the HardGate drives each to GREEN.

---

## Goal

`CarouselDots` is re-authored from first principles as a token-adaptive, dark/light-safe position-dot rail
(inactive dots with ≥3:1 contrast in BOTH schemes, the dead `scale-[var(--scale-hover)]` non-emit excised,
active emphasis on a real emitted morph), the never-run AW.W30 carousel-chrome restyle is folded into the
SAME wave (shell `.glass-material`, item four-state, unified `--spring-*` vocabulary), and the §9.1
glass-scrubber naming is adjudicated and recorded — leaving a `proof:carousel-glass-atoms` gate (newly
registered, GREEN with dot-contrast + no-dead-class assertions) + a re-registered `proof:slider-two-only`,
closed on a LIVE dark-page Playwright audit, not a headless proof alone.

---

## Scope (the gestalt fix — no workaround, no legacy, no Progress fork)

The root cause is ONE class — a position-dot rail authored for an opaque LIGHT card, never re-derived for
the translucent DARK surface every dark-mode consumer (and the carousel's own story) places it on — plus a
Tailwind-v4 var-in-arbitrary non-emit that papers the active emphasis. The gestalt fix is to RE-AUTHOR the
indicator from first principles, idiomatically composing the glass-atoms band rather than hand-rolled
per-state class soup, and to fold the never-run AW.W30 chrome restyle into the same write set (it shares
the surface). **The slides `DeckPager` (`~/Programming/slides/src/deck/DeckPager.vue:115-137` + deck.css §8)
is the WORKING reference oracle** — it solves exactly these defects (inactive `color-mix(in srgb,
var(--foreground) 52%, transparent)` ≥3:1 per WCAG 1.4.11, a 24×24 hit area per WCAG 2.5.8, active
emphasis via a REAL emitted `width` morph in a scoped `.is-active::before` rule, all dark/light-safe).
Three folds; W23 is KISS — one SFC + the chrome restyle + a token choice + a naming decision, no new
primitive, no Progress fork:

**(1) RE-AUTHOR CarouselDots as a dark/light-safe position-dot rail (F4, the BLOCKER).** Re-express
`CarouselDots.vue:53-76`:
- **(a) CONTRAST — inactive dots paint a surface-tint rung with contrast on a translucent surface in BOTH
  schemes.** Drop `bg-muted-medium`; paint the inactive dot from the foreground-derived `--surface-tint-*`
  ladder (`tokens.css:395-410`, `color-mix(in srgb, var(--foreground) N%, transparent)` — the house
  pattern that re-tints under `.dark` BY CONSTRUCTION since `--foreground` flips). The DeckPager oracle
  uses 52% for its inactive rung against the dock surface; pick the rung that clears ≥3:1 against the
  translucent `bg-card/30` dark surface (`--surface-tint-25` is the audit's named candidate — RATIFY the
  exact rung against the live π-lane contrast readback, since the card translucency lowers the effective
  contrast). NEVER `bg-muted-medium` (a token tuned for an opaque light card).
- **(b) DEAD CLASS — excise `scale-[var(--scale-hover)]` and drive active emphasis through a REAL emitted
  rule.** Remove the `scale-[var(--scale-hover)]` arbitrary class (the var-in-arbitrary non-emit). Drive
  the active dot through the `w-6`/`h-6` width morph PLUS a real emitted scale — either an emitted Tailwind
  utility OR a scoped `[data-active]`/`.is-active` SFC rule (the DeckPager pattern: `width: calc(...)` in a
  scoped `::before` rule), so the active dot reads as an ELONGATED PIP, not a stuck progress fill. This
  root-causes the v4 var-in-arbitrary non-emit FOR THIS INSTANCE rather than papering it; the TREE-WIDE
  sweep + the guard gate is W27a's (`proof:no-dead-arbitrary`, charter line 1389-1391) — W23 owns the
  carousel instance, W20 the card instance.
- **(c) AFFORDANCE — route the dots onto the four-state contract + the unified motion vocabulary.** The
  dots predate the glass-atoms band (no `.tap-squish` press-spring, no `transition-control`, off the
  four-state contract). Route them onto `.tap-squish` + the `.focus-ring` (already present at `:62`) + the
  governed `--spring-*` motion vocabulary (NOT a bespoke `duration-fast` transition list). Keep the
  `role="tablist"`/`role="tab"`/`aria-selected`/`aria-label` a11y already present (`:43-59`) and a ≥24×24
  hit target (WCAG 2.5.8 — the DeckPager target-size oracle).

**(2) FOLD the never-run AW.W30 carousel-chrome restyle (F5) — same write set.** The deferred AW.W30
surface around the dots shares the carousel write set, so fix it in one bounded wave:
- **shell `.glass-material`** — `GlassCarousel.vue:127-149` flat bordered pill → the `.glass-material`
  substrate (specular/rim, not on-hover-only `--glass-shadow-wash`), matching the GlassDock visual language
  the SFC comment already claims to match.
- **item four-state** — `GlassCarouselItem.vue:24-40` gains the four-state contract (`data-state`/
  `aria-pressed`, `.focus-ring`, `.tap-squish`), the standard/hover/active/disabled vocabulary the
  component-over-CSS-class invariant requires of an interactive element.
- **data-slot coverage** — confirm the `data-slot` attributes are present across the carousel surfaces
  (CarouselDots already carries `data-slot="carousel-dots"`/`carousel-dot`; sweep the shell/item/pager).
- **unified spring vocabulary** — the three carousel surfaces speak divergent ease/spring tongues
  (`--spring-snappy`/`--ease-standard` on shell + item); re-point onto the governed `--spring-*` register
  (the W05 one-iOS-spring-vocabulary canon — the carousel chrome shares the dock-family register, not a
  bespoke curve). COORDINATE with W05 (the register's owner) — W23 CONSUMES the governed register, does
  NOT re-author it.

**(3) ADJUDICATE the §9.1 glass-scrubber naming (F2/31-F6) — a DECISION GATE with a default.** This is
USER-ADJUDICATED, not a runtime defect. The corpus is split: slice 21 F2 recommends ACCEPT (keep CVA key
`standard`, glass-scrubber stays the prose name — zero call-site churn, the no-backwards-compat precept is
NOT implicated because nothing renames); slice 31 F6 recommends RENAME (clean break across the keyset +
every consumer). **RECORD a wave-open DECISION GATE with a default (harden finding 4): if no user
adjudication by wave-open, DEFAULT to ACCEPT — keep the CVA key `standard`, glass-scrubber stays prose.**
If RENAME is chosen, the FULL consumer-port sweep is a hard FileBound (see FileBounds) so the clean break
is total, no alias per the no-backwards-compat precept: `index.ts:36` CVA key, the default + `Slider.vue`
`[data-variant]` default selectors, the `/api` `SliderVariants` union (`src/api/index.ts:108`), the slider
story, and every `variant="standard"` call-site INCLUDING `~/Programming/slides/src` (the consumer-port
leg routes to W34 with a born-RED no-`variant="standard"`-survivor sweep). **RATIFY-BEFORE-IMPL.** The
muster `glass-pill` slider sites (SignalsLayer:113 + CommandPalette:485 → the surviving
standard/glass-scrubber key) are the §9.3 consumer-port leg — also routed to W34, NOT executed here.

**Verify-only (no edit):** F0 (the two-only cardinality), F1 (the fully-rounded knob), F3 (consumers
ported) are DONE/visually-true at AV.W11 — re-grep `src demo ~/Programming/slides/src` for any stale
`timeline|glass-pill|glass-cartoon|glass-scrubber` variant binding (the AV.W11 low-blast-radius assumption
a new sibling binding would invalidate), re-register `proof:slider-two-only` in the AX gate fleet so the
cardinality stays frozen through the AX waves, and confirm — NO slider source edit beyond the optional §9.1
rename.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/ui/carousel/CarouselDots.vue` | **RE-AUTHOR** (F4) — drop `bg-muted-medium` → a `--surface-tint-*` rung (≥3:1 both schemes); excise `scale-[var(--scale-hover)]` (`:68-69`) → a real emitted active-emphasis morph (scoped `[data-active]` rule or emitted utility); route onto `.tap-squish` + the governed `--spring-*` vocabulary; keep the a11y + ≥24px target. |
| `src/components/custom/glass-carousel/GlassCarousel.vue` | **RESTYLE** (F5) — the flat bordered pill (`:127-149`) → `.glass-material` substrate; re-point the spring list onto the governed `--spring-*` register. |
| `src/components/custom/glass-carousel/GlassCarouselItem.vue` | **RESTYLE** (F5) — add the four-state contract (`data-state`/`aria-pressed`, `.focus-ring`, `.tap-squish`); re-point `--spring-snappy`/`--ease-standard` (`:56-63`) onto the governed register. |
| `src/components/ui/carousel/GlassCarouselPager.vue` | **RESTYLE** (F5) — data-slot coverage + unified spring vocabulary; align with the re-authored dot rail. |
| `src/components/ui/slider/index.ts` | **ONLY IF RENAME ratified** (F2) — the CVA `standard` key → `glass-scrubber` + the `defaultVariant`. NO edit under the DEFAULT-ACCEPT path. |
| `src/components/ui/slider/Slider.vue` | **ONLY IF RENAME ratified** — the `[data-variant]` default selectors. NO edit under ACCEPT. |
| `src/api/index.ts` | **ONLY IF RENAME ratified** — the `SliderVariants` union re-export (`:108`) follows the CVA keyset. NO edit under ACCEPT. |
| `demo/stories/navigation/carousel.vue` | The carousel story — verify the re-authored dots read on the dark card; the π-lane probe surface. Touch ONLY to update a demo blurb if the restyle changes the affordance text. |
| `demo/stories/sliders/*` (the slider story) | **ONLY IF RENAME ratified** — re-point `variant="standard"`. NO edit under ACCEPT. |
| `scripts/proof-carousel-glass-atoms.mjs` | **NEW** — the born-RED→GREEN gate (dot-contrast assertion + no-dead-class assertion + chrome four-state coverage). |
| `package.json` | ADD the `proof:carousel-glass-atoms` scripts entry; (no slider-two-only edit — the entry exists at `:585`). |
| `scripts/gates.mjs` | REGISTER `proof:carousel-glass-atoms` + RE-REGISTER `proof:slider-two-only` into the AX gate fleet (the AV gate un-registered into AX). |
| `docs/tranches/AX/audit/W23-carousel-indicator.json` | **NEW** — the born-RED→GREEN audit artefact + the §9.1 naming-decision record. |

**OUT of bounds:** the slider thumb/track/range recipe (AV.W11 DONE — verify-only, NO re-author —
witnesses F0/F1); `src/styles/tokens.css` (W23 CONSUMES `--surface-tint-*`/`--scale-hover`, does NOT mint
new tokens — a new token routes to the J-band CSS waves); the governed `--spring-*` register AUTHORSHIP
(**W05** owns it — W23 consumes the register, never re-authors a curve); the TREE-WIDE no-dead-arbitrary
sweep + `proof:no-dead-arbitrary` guard gate (**W27a** owns the root-cause class — W23 fixes the carousel
INSTANCE only, charter line 1389-1391); the card-lift `@utility` non-emit instance (**W20**); the muster
`glass-pill` slider port + the slides `variant="standard"` consumer port (**W34** — W23 writes no sibling
source, it routes the consumer-port legs); the slides `DeckPager` (**cited as oracle only**, not edited —
it is slides-local single-consumer chrome).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W05 (one iOS-spring vocabulary).** W23 re-points the carousel chrome onto the governed `--spring-*`
  register; W05 AUTHORS that register (excises the legacy apple-spring bezier, governs settle/control/
  playful). **Disjoint by ownership:** W05 owns the token authorship in `tokens.css`/`theme.css`; W23
  CONSUMES the resolved `--spring-*` names in the carousel SFCs. The shared surface is the register names —
  W23 references them, never re-defines a curve. Sequence: the carousel chrome should re-point AFTER the
  register lands (W05), so W23 consumes the FINAL names; if co-landed, coordinate the name set. (W23 does
  NOT dependsOn W05 in the charter — it is band-cohesion-late, not dependency-late; the re-point can use
  the published `--spring-*` set if W05 has not yet landed.)
- **vs W09 (specular tune-to-subtle).** W23 dependsOn W09 (the specular/glass-atoms tokens the
  re-authored chrome composes via `.glass-material`). **Disjoint by surface:** W09 owns the specular token
  ladder + `.glass-material` substrate; W23 CONSUMES `.glass-material` on the carousel shell. W23 never
  re-authors the specular recipe — it applies the W09-tuned substrate. If W09 retunes the intensity ladder
  after W23 lands, the carousel inherits it (cascade, no W23 edit).
- **vs W20 (primitive fix — card toggles + the card-lift @utility non-emit).** Both wave-23 and wave-20
  excise a var-in-arbitrary non-emit instance — but DIFFERENT instances (W23: the carousel
  `scale-[var(--scale-hover)]`; W20: the card-lift `@utility`). **Disjoint by file:** W23 touches
  `CarouselDots.vue`; W20 touches the card surfaces. Neither owns the tree-wide root-cause (that is W27a).
  No shared file.
- **vs W27a (legacy gate-hardening — the var-in-arbitrary ROOT-CAUSE sweep + `proof:no-dead-arbitrary`).**
  W27a authors the TREE-WIDE no-dead-arbitrary guard gate (the card-lift snag CLASS, §13). **W23 fixes the
  carousel INSTANCE; W27a owns the class + the guard.** Disjoint by scope: W23's no-dead-class assertion is
  carousel-scoped (inside `proof:carousel-glass-atoms`); W27a's `proof:no-dead-arbitrary` is the
  tree-wide grep that catches ANY `scale-[var(--x)]`/`shadow-[var(--x)]` non-emit. W23 routes its instance
  to W27a's class (harden finding 10) so the whole class is closed once, not per-occurrence. The two gates
  are file-disjoint (`proof-carousel-glass-atoms.mjs` vs `proof-no-dead-arbitrary.mjs`).
- **vs W18 (storybook IA reinvention).** W18 **dependsOn W23** (charter line 1004 — the IA tree
  re-baselines LAST, after the component prunes/restyles rule). W23 owns the carousel SFC restyle; W18 owns
  the category-tree authorship + the manifest re-baseline. **Disjoint by ownership:** W23 does NOT author
  the IA tree; W18 does NOT re-author the carousel. The shared file is `demo/stories/manifest.ts` only if
  W23 touches a blurb — coordinate the row at merge (the carousel restyle does not delete/move a row, so no
  semantic conflict).
- **vs W34 (cross-repo idiom-maximization + consumer-adoption ledger).** W34 receives the muster
  `glass-pill`→standard/glass-scrubber slider port (SignalsLayer:113 + CommandPalette:485) + the slides
  `variant="standard"` port (if RENAME) — both consumer-side, sibling-source. **W23 is the in-repo
  carousel re-author + the naming DECISION; W34 is the consumer adoption.** W23 writes NO sibling source —
  it routes the two consumer-port legs to W34 with born-RED no-survivor sweeps. File-disjoint (W23:
  glass-ui src; W34: muster/slides src + annexes).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms).** Arm A (the dot rail — the BLOCKER): re-author
  `CarouselDots.vue` — inactive dots onto a `--surface-tint-*` rung (≥3:1 both schemes), excise
  `scale-[var(--scale-hover)]` → a real emitted active-emphasis morph (scoped `[data-active]` rule), route
  onto `.tap-squish` + the governed `--spring-*` vocabulary, keep the a11y + ≥24px target, oracle the
  DeckPager pattern. Arm B (the chrome restyle, F5 — independent file set): `GlassCarousel.vue` →
  `.glass-material`; `GlassCarouselItem.vue` → four-state contract; `GlassCarouselPager.vue` data-slot +
  spring; re-point all onto the governed register. `vue-tsc` + `npm run build` at every interval. The §9.1
  naming edit (Arm A, ONLY IF RENAME ratified) is the optional total-consumer-port sweep — gated behind the
  wave-open DECISION GATE.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the patched tree:
  asserts a π-lane computed-style readback at `/navigation/carousel` on a DARK page measures every inactive
  dot ≥3:1 against the translucent card surface (witness 1 GREEN); asserts the active dot's computed
  `transform` is NOT `none` and emits a real morph (witness 2 GREEN); asserts `proof:carousel-glass-atoms`
  exists + is registered + GREEN and `GlassCarouselItem` carries `data-state`/`aria-pressed`/`.focus-ring`
  (witness 3 GREEN); confirms the §9.1 decision is RECORDED with its default (witness 4 GREEN). ADVERSARIAL
  twists: (a) tries to make the dot-contrast "pass" by reading the dot on a LIGHT page only (confirms the
  gate measures the DARK-page translucent-card case — the actual failure surface — not just the easy light
  case); (b) tries to re-introduce `scale-[var(--x)]` and confirms the no-dead-class assertion REDs
  (the guard bites); (c) confirms the slider thumb/track/range recipe is UNTOUCHED (verify-only F0/F1 — a
  collateral slider edit is the regression class); (d) re-greps `src demo ~/Programming/slides/src` for any
  stale retired-variant binding (the AV.W11 low-blast-radius re-validation).
- **Gate-author (≤1 agent — one net-new gate + one re-registration).** Authors
  `scripts/proof-carousel-glass-atoms.mjs`: a RENDER assertion (not a string-scan) — the dot-contrast
  assertion (inactive dots resolve a color with measurable ≥3:1 contrast against a translucent dark
  surface) + the no-dead-class assertion (the active emphasis emits real CSS — computed `transform` is not
  `none`) + the chrome four-state coverage check. Registers it in `package.json` + `gates.mjs`;
  re-registers `proof:slider-two-only` into the AX gate fleet. Confirms each assertion FAILS at `eaba94f`
  (the dots broken, the gate absent) and PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement +
1 verify + 1 gate.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**

The wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — devise an in-FileBounds gestalt fix; spawn a tangent triumvirate to work AROUND an error; escalate ONLY when genuinely user-gated) + §6.2 (the 4-class halt-vs-work-around decision tree). It governs here by reference; the orchestrator may not redispatch the failing unit alone. The wave-specific §3a triggers (authored from this wave's FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2).** If the dot re-author needs a NEW `tokens.css` token (W23 consumes `--surface-tint-*`/`--scale-hover`, never mints — a new token routes to the J-band CSS waves), if the spring re-point requires authoring a `--spring-*` curve W05 owns, if the carousel `scale-[var(--scale-hover)]` excise pulls in the tree-wide `proof:no-dead-arbitrary` guard W27a owns (fix the INSTANCE only), or if the `.glass-material` restyle needs a specular-ladder edit W09 owns, or the muster/slides consumer-port reaches sibling source W34 receives → HALT, dispatch the triumvirate. A sibling-owned surface is NEVER edited in-line.
- **Non-local gate failure → triumvirate (Class 2).** If `proof:carousel-glass-atoms` reds because the consumed `--surface-tint-*`/`--spring-*`/`.glass-material` substrate is not yet at HEAD (a W05/W09 dependency not landed), or `proof:slider-two-only` re-registration reds on a slider surface the verify-only F0/F1 was supposed to leave untouched → triumvirate.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the dark-page dot-contrast π-lane readback fails the ≥3:1 floor for a third `--surface-tint-*` rung re-tune, or the active-dot emitted-morph live audit fails to settle for a third pass → HALT the failing unit + triumvirate.
- **§5.3 ratify reached un-ratified → halt-and-ratify (Class 3).** If the §9.1 glass-scrubber RENAME decision gate reaches impl un-adjudicated → stop, surface to the orchestrator, never self-ratify. (The glass-scrubber rename is USER-ADJUDICATED per §6.1(iii) — escalate, do not self-decide; the DEFAULT-ACCEPT path makes no rename edit.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`proof:carousel-glass-atoms` (NEW, π-lane render assertion) — born-RED→GREEN.** The gate (a) reads
   back the inactive dot's resolved background contrast against the translucent dark card surface and
   asserts ≥3:1 (WCAG 1.4.11 non-text); (b) reads back the active dot's computed `transform` and asserts it
   is NOT `none` (the var-in-arbitrary non-emit is gone — a real emitted morph); (c) asserts
   `GlassCarouselItem` carries the four-state contract attributes. **Born-RED** at HEAD — the gate does not
   exist AND, once authored, FAILS on the `bg-muted-medium` invisible dot + the `transform:none` dead
   class; GREEN after the re-author. A runtime/render artefact (the precept-valid form — NOT a grep).
2. **`proof:slider-two-only` re-registered + GREEN.** The AV two-only cardinality gate re-registered into
   the AX gate fleet (`gates.mjs`) so the `{standard, spectrum}` keyset stays frozen through the AX waves;
   GREEN (the thumb border-radius 50% + no-border-paint + the two-key set all hold per AV.W11). If RENAME
   is ratified, the gate's `EXPECTED_KEYS` updates to `{glass-scrubber, spectrum}` and the assertion
   re-greens against the renamed keyset. **Born-RED** only in the un-registered sense (it must enter the AX
   fleet); GREEN on registration (+ keyset update if RENAME).
3. **`vue-tsc --noEmit` GREEN** — the carousel SFC re-author + the chrome restyle (+ the optional rename's
   `/api SliderVariants` union follow) typecheck clean; no dangling variant reference. A build artefact.
4. **`npm run build` GREEN** — the carousel chunk + the styles bundle emit clean; the `.glass-material`
   substrate + the `--surface-tint-*`/`--spring-*` token references resolve. A build artefact.
5. **The §9.1 naming-decision RECORD (explicit document reconciliation).** The audit json records the
   decision (ACCEPT-by-default if no user adjudication by wave-open, OR the ratified RENAME with the full
   consumer-port FileBound) — a recorded adjudication, never a silent deferral. A document-reconciliation
   artefact (the precept-valid form).

These are render / build / document-reconciliation artefacts (the precept-valid forms per SPEC.md §Hard
Gates) — NOT grep-for-source-string-as-runtime-behaviour gates.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass over `/navigation/carousel` AND `/navigation/glass-carousel`, in **light AND DARK** at
**≥ 3 viewports** (375×667 / 1280×800 / 1440×900):
- **The dot rail reads as a position register on a DARK page (the slice's named close criterion):** every
  inactive dot is VISIBLE against the translucent dark card (≥3:1, measured by computed-style readback —
  the harden-7 DOM-cascade/getComputedStyle capability, NOT GPU readPixels); the active dot reads as an
  ELONGATED PIP (the width morph + the real emitted scale), NOT a single bright bar stuck at the left with
  an invisible track; the row reads as N dots with one emphasized, the carousel's position legible at a
  glance.
- **The active emphasis emits real motion:** stepping the carousel samples the active dot's computed
  `transform`/width across ≥5 frames spanning the transition — the morph is real, not `transform:none`.
- **The chrome restyle reads:** the GlassCarousel shell paints the `.glass-material` specular/rim (not a
  flat hover-only wash); the items carry the four-state affordance (hover/active/focus-ring/tap-squish);
  the three surfaces breathe on ONE spring (no divergent tongues); affordance/hierarchy/spacing/padding
  hold, no visual occlusion.
- **The paired-π BEFORE/AFTER + DELTA** (the W00 protocol): the carousel dot rail before (one lopsided
  bright bar, invisible inactive dots) → after (a legible position register), at ≥3 viewports × light/dark,
  captured under `docs/tranches/AX/audit/`.

**The wave does NOT close on the headless gates alone** — the executed live dark-page audit is the binding
close criterion (the cardinal AX precept; the slice's own close criterion: "live audit of the carousel
indicator on a dark page").

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `eaba94f`
   live: at `/navigation/carousel` on a dark page the inactive dots measure below 3:1 (invisible); the
   active dot's computed `transform` is `none` (the dead class); `proof:carousel-glass-atoms` does not
   exist + the chrome lacks the four-state contract; the §9.1 rename is un-decided. Record them in
   `audit/W23-…json` as the born-RED baseline. Open the §9.1 DECISION GATE — if no user adjudication, set
   the ACCEPT default. Do NOT proceed on the audit's word — re-prove.
2. **RE-AUTHOR CarouselDots (F4) — the BLOCKER.** Drop `bg-muted-medium` → a `--surface-tint-*` rung
   (RATIFY the exact rung against the live contrast readback); excise `scale-[var(--scale-hover)]` → a real
   emitted active-emphasis morph (scoped `[data-active]` rule, the DeckPager pattern); route onto
   `.tap-squish` + the governed `--spring-*` vocabulary; keep the a11y + ≥24px target. `vue-tsc` + `npm run
   build`.
3. **FOLD the AW.W30 chrome restyle (F5).** GlassCarousel shell → `.glass-material`; GlassCarouselItem →
   four-state contract; GlassCarouselPager data-slot + spring; re-point all onto the governed `--spring-*`
   register (coordinate with W05). `vue-tsc` + `npm run build`.
4. **ADJUDICATE + RECORD the §9.1 naming (F2/31-F6).** Record the decision (ACCEPT-by-default or the
   ratified RENAME) in the audit json. If RENAME: execute the FULL in-repo consumer-port sweep
   (`index.ts:36` + `Slider.vue` default + `/api SliderVariants` + the slider story) and route the
   sibling-source ports (muster, slides) to W34 with born-RED no-survivor sweeps.
5. **VERIFY-ONLY F0/F1/F3.** Re-grep `src demo ~/Programming/slides/src` for stale retired-variant
   bindings; confirm the slider thumb/track/range recipe UNTOUCHED.
6. **Gates GREEN.** Author + register `proof:carousel-glass-atoms`; re-register `proof:slider-two-only` into
   the AX fleet; run `vue-tsc`/`build`; run the VISUAL-TRUTH live dark-page Playwright audit; capture the
   paired-π BEFORE/AFTER + DELTA; route the consumer-port legs to W34; write `audit/W23-…json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W23-carousel-indicator.json` — the born-RED→GREEN ledger: the four RED witnesses
  (inactive-dot contrast below 3:1 on the dark card; the `scale-[var(--scale-hover)]` non-emit /
  `transform:none`; the absent `proof:carousel-glass-atoms` + the four-state-less chrome; the un-decided
  §9.1 rename), the per-finding (F0-F5) disposition, the post-wave GREEN measurements (inactive-dot
  contrast ≥3:1 both schemes, the active morph emits real CSS, the gate registered + GREEN, the chrome
  four-state coverage), the chosen `--surface-tint-*` rung + its measured contrast, and the §9.1
  naming-decision RECORD (ACCEPT-by-default or RENAME, with the consumer-port routing).
- `scripts/proof-carousel-glass-atoms.mjs` — the NEW render-assertion gate (dot-contrast + no-dead-class +
  four-state coverage), registered in `package.json` + `gates.mjs`.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the carousel dot rail before (lopsided
  bright bar, invisible inactive dots) → after (legible position register), at ≥3 viewports × light/dark;
  the chrome restyle before (flat hover-only pill) → after (`.glass-material` + four-state).
- A consumer-port NOTE annex (routed to W34, NOT executed here): muster's `glass-pill` slider sites
  (SignalsLayer:113 + CommandPalette:485) → the surviving standard/glass-scrubber key, and (if RENAME) the
  slides `variant="standard"` → `variant="glass-scrubber"` port — each with a born-RED no-survivor sweep.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(carousel): W23 born-RED baseline — CarouselDots dark-page invisible dots + scale-[var(--scale-hover)] non-emit + the absent carousel-glass-atoms gate (AX.W23)`
2. `fix(carousel): re-author CarouselDots as a dark/light-safe position-dot rail — surface-tint inactive rung + real emitted active pip + tap-squish/spring (AX.W23 F4)`
3. `style(glass-carousel): fold the AW.W30 chrome restyle — .glass-material shell + item four-state + unified --spring-* vocabulary (AX.W23 F5)`
4. `docs(slider): adjudicate the §9.1 glass-scrubber naming — record the decision (ACCEPT-by-default / RENAME) + route the consumer ports to W34 (AX.W23 F2)`
5. `test(gates): register proof:carousel-glass-atoms (dot-contrast + no-dead-class render assertion) + re-register proof:slider-two-only into the AX fleet (AX.W23)`
6. `chore(AX.W23): audit ledger GREEN + paired-π dark-page carousel BEFORE/AFTER + DELTA capture`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  dark-page carousel dot-contrast readback + the active-morph frame sampling — the binding close criterion.
  W23 cannot close on the headless gate alone (a green gate over an invisible dot rail is exactly the AW
  cardinal failure). Per harden finding 7, the π lane MUST carry the DOM-cascade/`getComputedStyle`/
  canvas-fingerprint readback capability (not just GPU `readPixels`) — the carousel dot-contrast gate is a
  NAMED π-lane consumer alongside the W22 font gate, the W20 card-toggle gate, and the W24 deck-progress
  gate. (Charter `### AX.W23` dependsOn AX.W00, line 1219.)
- **AX.W09 (specular tune-to-subtle / glass-atoms tokens) — the substrate the restyle composes.** The
  AW.W30 chrome fold routes the GlassCarousel shell onto `.glass-material` (the specular/rim substrate W09
  tunes). W23 CONSUMES the W09-tuned `.glass-material` — the re-authored chrome would compose a not-yet-tuned
  specular if it landed first. (Charter `### AX.W23` dependsOn AX.W09, line 1219.) Harden finding 9 notes
  W23's ONLY true dependencies are W09 (specular tokens) + W00 (the dot-contrast π-lane gate) — it is
  band-cohesion-late, not dependency-late, so it MAY be pulled forward if the dock band (A) stalls; keep it
  labeled blocker so it is not dropped.
- **Soft-coordination (not a hard dependsOn):** **AX.W05** owns the governed `--spring-*` register the
  chrome re-points onto (consume the published names; coordinate the final set at merge). **Downstream:**
  **AX.W18** dependsOn W23 (the IA tree re-baselines LAST, after the carousel restyle rules — charter line
  1004). **AX.W27a** owns the tree-wide no-dead-arbitrary guard W23 routes its carousel instance to (the
  card-lift snag CLASS). **AX.W34** receives the muster `glass-pill` + the slides `variant="standard"`
  consumer-port legs (the §16 receiver).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`99a1108`** (AV.W11, `docs/tranches/AV/waves/AV.W11-slider-unification.md`) — the slider consolidation
  that landed the two-only `{standard, spectrum}` keyset + the fully-rounded 50% borderless knob (F0/F1
  DONE/visually-true). AV.W11 §2 DELIBERATELY kept the CVA key `standard` (renaming only the doc-comment
  INTENT to "the canonical glass-scrubber knob") to avoid churning every default/no-variant call site +
  the gate's keyset assertion — the engineering trade-off that left the §9.1 literal RENAME un-done (the
  witness-4 decision point). The slider half is the verify-only baseline; the rename is the only open
  slider item.
- **AW.W30** (`docs/tranches/AW/waves/AW.W30-carousel-redesign.md`, status: NEVER RUN) — the carousel
  glass-atoms restyle authored but never executed (REQUIREMENTS §13). AW.W30 §3.5 explicitly scoped
  Progress OUT ("the pager has no progress affordance"), so the broken dots were DELIBERATELY left
  unaddressed by the deferred carousel wave. W23 folds the AW.W30 chrome scope (shell `.glass-material`,
  item four-state, data-slot, unified spring) into the same wave (F5 — same write set).
- **The session-limit halt** (MEMORY `project_aw_session_limit_halt` — "REMAINING: … band-G, W33") — the
  AW close wave W33 was renumbered three times (W18→W21→W27→W33) as bands inserted ahead of it and never
  reached; the tranche shipped 3.4.0→3.6.0 + batch-1 @ `eaba94f` WITHOUT a formal close, so the carousel
  restyle (AW.W30) + the glass-scrubber rename both fell between "done" items (slice 31 F6). W23 absorbs
  them as a concrete component wave on the band-H slider spine, not a deferred "close" afterthought.
- **The slides `DeckPager`** (`~/Programming/slides/src/deck/DeckPager.vue:115-137` + `deck.css §8`) — the
  WORKING reference oracle the audit cites: a token-adaptive, dark/light-safe, target-size position-dot
  rail that solves exactly the slice 21 F4 defects (inactive `color-mix(in srgb, var(--foreground) 52%,
  transparent)` ≥3:1 per WCAG 1.4.11, 24×24 hit area per WCAG 2.5.8, active emphasis via a REAL emitted
  `width` morph in a scoped `.is-active::before` rule — never a dead arbitrary Tailwind class). Cited as
  oracle only; NOT edited (slides-local single-consumer chrome).
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: `CarouselDots.vue:71-72`
  ships `bg-muted-medium`, `:68-69` ships the dead `scale-[var(--scale-hover)]`, the chrome is the flat
  pre-glass-atoms pill, `proof:carousel-glass-atoms` does not exist, and `slider/index.ts:36` still keys
  `standard`.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-H binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code (no backwards-compat memory; SPEC.md §"no shadow APIs or temporary
  compatibility layers"; §0 "excise or fail explicitly").** The carousel re-author is clean — the dead
  `scale-[var(--scale-hover)]` var-in-arbitrary class (which emits NO CSS — a path that silently
  fails-OPEN) is EXCISED, not papered: the active emphasis is driven through a REAL emitted morph (the
  fail-explicit form — a path that actually paints). MUST NOT leave the dead arbitrary class as a
  no-op fall-through. If the §9.1 RENAME is ratified it is a clean break with NO alias — `standard` →
  `glass-scrubber` across the CVA keyset + every call-site, name-forward, no `@deprecated` shim (the
  no-backwards-compat precept). MUST NOT ship a `standard`→`glass-scrubber` alias.
- **substrate-with-consumer (precepts/README.md "Substrate and consumer land together"; SPEC.md §"every
  wave lands substrate with its consumer").** The re-authored CarouselDots + the restyled chrome have a
  live in-repo consumer (the `/navigation/carousel` + `/navigation/glass-carousel` demo stories) and the
  cross-repo consumers (muster's slider sites, slides) whose adoption is ROUTED to W34 with born-RED
  no-survivor sweeps (wire-before-retire for the §9.1 rename). MUST NOT introduce a NEW primitive or a
  Progress fork — KISS: it is one SFC + the chrome restyle + a token choice, the audit's own constraint.
- **documentation-is-part-of-the-change (precepts/README.md; SPEC.md §"wave close updates docs").** The
  §9.1 glass-scrubber naming DECISION is RECORDED in the audit json (the binding-doc honesty — a recorded
  adjudication with its default, never a silent deferral); the slider doc-comment intent is reconciled
  against the chosen key; `proof:slider-two-only` is re-registered into the AX gate fleet (the gate
  manifest IS documentation). MUST NOT leave the rename "between done items" un-recorded (the slice 31 F6
  failure class).
- **Gates close on evidence (precepts/README.md; SPEC.md §Hard Gates lines 94-116 — build/test/runtime/
  diff/deletion, NOT "grep found a source string for runtime behaviour" line 108).** The
  `proof:carousel-glass-atoms` gate is a RENDER assertion (computed-style contrast readback + computed
  `transform` non-`none` + four-state attribute coverage) — the precept-valid runtime-observation form, NOT
  a string-scan. The close is the executed LIVE dark-page Playwright pass, never a headless proof alone —
  the cardinal AX precept (the slice's own close criterion). MUST NOT close on the gate's green over an
  un-audited live dark page.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (SPEC.md
  §Hard Gates line 112; precepts/README.md "Edicts").** The dead `scale-[var(--scale-hover)]` is a
  LIBRARY-INTERNAL silent failure (an arbitrary class that never emits, so the active emphasis silently
  no-ops) — a library defect, NOT a befitting browser-API degradation. The re-author makes the active
  emphasis a path that actually paints (fail-explicit by replacement). MUST NOT collapse a silently-broken
  library style path into "befitting silence."

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The §9.1 glass-scrubber naming decision — ACCEPT vs RENAME (USER-ADJUDICATED).** The corpus is split:
   slice 21 F2 recommends ACCEPT (keep CVA key `standard`, glass-scrubber stays prose — zero call-site
   churn, the no-backwards-compat precept NOT implicated); slice 31 F6 recommends the clean RENAME across
   the keyset + every consumer. **Recommendation:** DEFAULT to ACCEPT if no user adjudication by wave-open
   (harden finding 4 — the decision-gate-with-default; the user's directive used the word "rename" but
   AV.W11 read it as INTENT, and ACCEPT is the cheapest path that does not implicate the no-backwards-compat
   precept since nothing renames). **RATIFY-BEFORE-IMPL** — if the user wants the literal key, the FULL
   consumer-port sweep is a hard FileBound (`index.ts:36` CVA key + default, `Slider.vue` `[data-variant]`
   selectors, `/api SliderVariants` union, the slider story, every `variant="standard"` call-site incl.
   `~/Programming/slides/src` + muster) routed to W34 with a born-RED no-`variant="standard"`-survivor
   sweep, name-forward, no alias.
2. **The exact `--surface-tint-*` rung for the inactive dot.** The audit names `--surface-tint-25` as the
   candidate; the DeckPager oracle uses 52% against the DOCK surface (no card translucency). The carousel's
   `bg-card/30` translucent card LOWERS the effective contrast, so the rung that clears ≥3:1 against the
   composited surface may be higher than 25%. **Recommendation:** RATIFY the rung against the LIVE π-lane
   contrast readback at `/navigation/carousel` on a dark page (measure the composited surface, not the
   token in isolation) — pick the lowest `--surface-tint-*` rung that clears ≥3:1 in BOTH schemes, so the
   inactive dots are visible-but-subordinate, not loud. The gate's dot-contrast assertion is the binding
   floor.
3. **The active-emphasis emit mechanism — scoped SFC rule vs emitted Tailwind utility.** F4 prescribes
   "drive the active emphasis through the w-6 width morph + a real emitted scale utility OR a data-[active]
   scoped rule in the SFC." **Recommendation:** the scoped `[data-active]`/`data-slot` SFC rule (the
   DeckPager `.is-active::before` pattern) — it is the proven oracle shape, keeps the morph in the SFC's
   scoped CSS (no reliance on a content-scan emitting an arbitrary class), and is the most robust against
   the v4 var-in-arbitrary non-emit the wave is root-causing. RATIFY scoped-rule vs emitted-utility (the
   former is the safer one-path; the latter keeps the styling in the template but re-risks the
   content-scan).
4. **The governed `--spring-*` register name the chrome re-points onto (coordination with W05).** W23
   re-points the carousel chrome off `--spring-snappy`/`--ease-standard` onto the governed register, but
   W05 AUTHORS that register (settle/control/playful). **Recommendation:** the carousel chrome shares the
   dock-family register (the `--spring-dock` ~+4.6% (0.32,0.7) baseline or the "control" rung W05
   establishes) — RATIFY which governed rung the carousel consumes once W05's register lands, so W23
   references the FINAL name. If W23 lands before W05, use the published `--spring-*` set and re-point at
   the W05 merge.
