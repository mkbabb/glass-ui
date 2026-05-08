# K-tranche reconciliation against post-open commits — 2026-05-08

**Plan authored at**: `0666be6` (commit count: 67 commits since)
**HEAD**: `23ce73c` (v0.9.0 — V-tranche bundled release)
**Tranches**: docs/tranches/K/ wave specs W0–W8

K was opened against J close `5bcf1ce` but never formally dispatched. In the
67 commits since (peaking with v0.8.4 / v0.8.5 / v0.8.6 / v0.9.0), an entire
**ad-hoc V-tranche** landed (V.W2 foundation polish + V.W3 structural
unions + V.W4 storybook + composables expansion). The V work overlaps K
scope substantially in some lanes (substrate retire-or-wire, vocab.γ, doc
adjacencies, Configurator second-consumer) and adds wholly new structural
transpositions K never anticipated (Section, ModalOverlay, LabeledField,
menuItemVariants, density-rail, popover-animation grammar, story-chassis
primitives, useStoryDemo, 23 promoted composables).

The headline K HEADLINE — `Button variant="primary-audacious"` — never
landed. The dispatch-precept hardening never landed. The bundle-budget gate
never landed. The Slider-in-GlassDock story-fidelity gap never closed.

## Summary table

| Wave | hard-gate items | ABSORBED | PARTIAL | OPEN | OBSOLETE |
|---|---:|---:|---:|---:|---:|
| W0 | 4 | 0 | 0 | 4 | 0 |
| W1 | 3 | 1 | 1 | 0 | 1 |
| W2 | 5 | 4 | 0 | 1 | 0 |
| W3 | 5 | 0 | 2 | 3 | 0 |
| W4 | 4 | 0 | 0 | 4 | 0 |
| W5 | 3 | 0 | 1 | 1 | 1 |
| W6 | 5 | 0 | 0 | 5 | 0 |
| W7 | 2 | 0 | 0 | 2 | 0 |
| W8 | 7 | 0 | 0 | 7 | 0 |
| **Total** | **38** | **5** | **4** | **27** | **2** |

ABSORBED at 13% (5/38). The bulk of K's plan is OPEN, but the V-tranche
absorbed the fastest-decay substrate items (foreground-tokens wire,
overlay-scrim shadowed by ModalOverlay, paper.css literal hsl, Tooltip
rounded radius, Configurator second consumer). The HEADLINE (W6) is
entirely OPEN; the dispatch-precept hardening (W0) is entirely OPEN; the
tooling restoration (W4) is entirely OPEN.

---

## W0 — Reconciliation + dispatch precept hardening

### Gate (a): `audit/W0-reconciliation.md` ledger
**Disposition**: OPEN
**Evidence**: `docs/tranches/K/audit/` is empty. No reconciliation ledger
exists at HEAD. (This file IS that ledger, retroactively.)

### Gate (b.1): `ORCHESTRATION.md` adds Worktree Isolation section
**Disposition**: OPEN
**Evidence**: `git -C /Users/mkbabb/Programming/glass-ui submodule status`
returns `6b8437a docs/precepts (heads/main)` — the same SHA the K plan
declared. `grep -l "Worktree Isolation"
docs/precepts/instructions/*.md` returns no matches.

### Gate (b.2): `tranche/AGENT_DISPATCH_TEMPLATE.md` adds Hardened Agent Git Clause
**Disposition**: OPEN
**Evidence**: submodule unchanged. `grep "Hardened agent git"` no matches.

### Gate (b.3): 3 new LESSONS-LEARNED entries
**Disposition**: OPEN
**Evidence**: submodule unchanged. None of the three 2026-05-06 entries
landed.

---

## W1 — Silent-miss closeout + Configurator gestalt completion

### Gate (a): `<HoverPopover hoverOpenDelay>` lands with consumer OR struck retroactively
**Disposition**: PARTIAL (likely OBSOLETE on naming)
**Evidence**: `src/components/custom/hover-popover/HoverPopover.vue`
exposes `openDelay?: number` (default 250) + `closeDelay?: number`
(default 150) at lines 47–58. The K plan's named prop (`hoverOpenDelay`)
does not exist under that exact name, but the **functional intent** is
delivered via the existing `openDelay` prop (this prop also predates K
— it was on `HoverPopover` before the K plan was authored). No K-era
commit added or modified the prop. The story under
`demo/stories/primitives/hover-popover.vue` does not demonstrate a
custom open-delay value. **Decision needed**: either rename to
`hoverOpenDelay` for plan-vs-actual hygiene OR strike the
`hoverOpenDelay` name from J FINAL retroactively per Option B.

### Gate (b): 8 demo `<CartoonCard>` raw-recipe migrations
**Disposition**: OBSOLETE — replaced by `<ShowcaseFrame>` chassis primitive (`8136baf`)
**Evidence**: `8136baf feat(ShowcaseFrame): pad knob with 5 rungs over
rounded-card showcase chassis`. `demo/stories/ShowcaseFrame.vue` lines
3–7 explicitly state: `// Replaces the 'rounded-card border
border-border bg-card shadow-cartoon' idiom across ~25-30 sites`. The
demo story chassis was the canonical landing point, not `<CartoonCard>`.
`<CartoonCard>` survives as a primitive at
`src/components/ui/cartoon-card/CartoonCard.vue` with one demo at
`demo/stories/primitives/cartoon-card.vue`. The K plan's "8 demos
migrate to `<CartoonCard>`" gate is superseded — the V-tranche shipped
a **better** sectioning chassis primitive that doesn't lock demo cells
into the cartoon visual register. Surveying the 8 sites K named: 7 of 8
(`colors`, `typography`, `paper-glass`, `scroll-type`, `avatar`,
`sortable-list`, `timeline`) still emit raw `rounded-card border bg-card
shadow-cartoon` triplets — but those uses are now demo-internal frames
that ShowcaseFrame is the canonical replacement for, not CartoonCard.

### Gate (c): `<ConfiguratorLayer>` / `<ConfiguratorRow>` / `useConfiguratorState` ≥ 2 consumers OR retired
**Disposition**: ABSORBED at `fb38034`
**Evidence**: `fb38034 feat(stories): add 9 missing primitive entries`
adds `demo/stories/primitives/configurator.vue` consuming
`ConfiguratorRow` + `useConfiguratorState`. Prior consumer:
`demo/stories/motion/metaballs.vue`. Total: 2 consumers ≥ 2 bar reached.
Aurora retains `useAuroraStudio` + `AuroraConfigDock.vue` (per-preset
clone semantics) — Option A (refactor AuroraConfigDock to consume) was
not taken; Option B (retire family) was not taken; instead the gate met
via a third consumer (the new primitive story). Note the K plan's
intent — gestalt completion — is only partially met: aurora chrome
remains a parallel implementation.

---

## W2 — Substrate retire-or-wire decision sweep

### Gate (a): `--{success,warning,info}-foreground` wired OR retired
**Disposition**: ABSORBED at `221d783`
**Evidence**: `221d783 fix(notification): consume status-color foreground
tokens`.
`src/components/ui/notification/Notification.vue:58–61` reads:
```
success: 'bg-success/90 text-success-foreground',
warning: 'bg-warning/90 text-warning-foreground',
info:    'bg-info/90 text-info-foreground',
```
Plus a Badge consumer landed at `5dfe6fb feat(badge): add
success/warning/info variants`. Two consumers, well above the bar.

### Gate (b): `cssVar()` ≥ 2 consumers OR retired
**Disposition**: OPEN
**Evidence**: `grep -rn "cssVar(" src/` returns one consumer at
`src/components/custom/tabs/BouncyToggle.vue:130–132`. The composable is
still public-exported via `src/composables/utils/cssVar.ts` →
`src/composables/utils/index.ts` → `src/composables/index.ts` →
`src/index.ts`. No additional consumer surfaced post-J; no retire
decision documented. v0.8.4 promoted `useTokenColor` (a related but
distinct composable: reactive computed-style read with dark-mode
re-resolution), which arguably **supersedes** `cssVar()` for most
WAAPI-adjacent use-cases — but cssVar() retire is not formal.

### Gate (c): `.overlay-scrim` @utility retired
**Disposition**: ABSORBED partially via `43bee82` (ModalOverlay collapse)
**Evidence**: `43bee82 feat(ModalOverlay): collapse 3 scrim declarations
onto _shared SFC`. Three Dialog/Sheet/DialogScroll overlays now consume
`<ModalOverlay>` which uses `bg-overlay-scrim{,-strong,-subtle}`
(Tailwind bridges, not the @utility). `@utility overlay-scrim` block at
`src/styles/utilities.css:552–554` STILL exists at HEAD but is unused
by any consumer — `grep` for bare `class="…overlay-scrim…"` (sans `bg-`
prefix) returns no hits. The K-mandated formal retire (drop the
@utility) didn't happen. The K plan's intent — eliminate the redundant
@utility — is met substantively (zero consumers); the formal-deletion
hygiene step remains. Tag as ABSORBED-WITH-RESIDUAL: the block is dead
code that should be removed in a one-line follow-up.

### Gate (d): paper.css literal `hsl(48 …)` rungs migrated
**Disposition**: ABSORBED (hsl literals removed)
**Evidence**: `grep "hsl(" src/styles/paper.css` returns 0 hits at HEAD.
The paper.css file no longer contains literal HSL color values; it ships
two `@utility` blocks for `paper-underpaint` + `paper-grain-overlay`
keyed against `var(--glass-grain-opacity)`. Cannot identify the exact
commit that removed them in the 67-commit log (no `paper.css`-touching
commit message refers to hsl literal migration); likely absorbed in a
v0.8.x cleanup. Verified at HEAD: gate met.

### Gate (e): `<Tooltip>` consumes `rounded-tooltip`
**Disposition**: ABSORBED (no specific commit citation; landed pre-K-open or in unattributed cleanup)
**Evidence**: `src/components/ui/tooltip/TooltipContent.vue:27` uses
`rounded-tooltip` (not `rounded-lg`). `grep "rounded-lg"
src/components/ui/tooltip/` returns 0 hits.

---

## W3 — Vocab.γ second-pass migration

### Gate (a): zero raw `color-mix(--foreground)` bypasses in src/
**Disposition**: OPEN
**Evidence**: `grep -rn "color-mix.*--foreground" src/` returns 43 hits
total, 19 of which are in non-tokens.css files (definitions in
`tokens.css` are canonical). Sites:
`styles/typography.css:313`, `styles/dock.css:396, 528, 611, 675, 698,
739, 778, 841`, plus more in `glass.css`, `instrument-chassis.css`,
`utilities.css`, and component SFCs. The K plan declared 18 such
bypasses; HEAD has 19. The gate is no closer to met than at K open.

### Gate (b): zero raw `focus-visible:shadow-[var(--focus-ring-shadow)]` in demo/
**Disposition**: OPEN
**Evidence**: `grep -rn "focus-visible:shadow-\[var(--focus-ring-shadow)\]"
demo/` returns 5 hits at:
- `demo/layout/CategoryRail.vue:33`
- `demo/stories/navigation/dock-layers.vue:49`
- `demo/stories/foundations/intro.vue:69`
- `demo/stories/foundations/shadows.vue:61`
- `demo/stories/primitives/combobox.vue:48`

`0187c7d refactor(focus-ring): unify .glass-btn onto box-shadow form` did
unify `.glass-btn` onto box-shadow form but did not migrate the demo
sites. Exactly the 5 K named, still extant.

### Gate (c): zero `transition-all` in CVAs (single-component exceptions documented)
**Disposition**: PARTIAL
**Evidence**: `grep -rn "transition-all" src/ demo/` returns 5 hits:
- `src/components/ui/carousel/CarouselDots.vue:62` (1 src/CVA-adjacent
  hit; the K plan named carousel-dots story canonicalization but didn't
  flag this src/site)
- `demo/stories/composables/use-stagger-reveal.vue:27`
- `demo/stories/composables/use-stagger.vue:45`
- `demo/stories/composables/use-story-demo.vue:43`
- `demo/stories/motion/stagger.vue:59` (the K-named site — still extant)

The K-named `motion/stagger.vue:59` `transition-all` is unchanged; 3 new
demo sites were added by the v0.8.4 + V.W4 composable-storybook
expansion (`use-stagger.vue`, `use-stagger-reveal.vue`,
`use-story-demo.vue`).

### Gate (d): per-rung mapping table in proof doc
**Disposition**: OPEN
**Evidence**: no proof doc; no migration; no mapping.

### Gate (e): carousel-dots story canonicalized
**Disposition**: PARTIAL (no specific commit)
**Evidence**: `demo/stories/navigation/carousel.vue` exists; whether the
hand-rolled dot-strip dup was removed or remains was not directly
audited but the underlying `transition-all` survivor at
`CarouselDots.vue:62` suggests the story still exercises both.

---

## W4 — Doc + tooling cohort restoration

### Gate (a): CLAUDE.md / README.md / DESIGN.md align with HEAD
**Disposition**: OPEN
**Evidence**: CLAUDE.md drift sample:
- still lists `DockPopover.vue # portaled popover for dock items` at
  `CLAUDE.md:63` — but `src/components/custom/dock/` no longer contains
  `DockPopover.vue` (J retired it).
- does not mention `configurator/`, `cartoon-card/`, `metric-pill/`,
  `metric-badge/`, `instrument-chassis/`, `disco-glyph/`, `dock-group/`,
  `glyph-face/`, `hover-popover/`, `confirm-dialog/`, `expandable-container/`,
  `icon-tooltip/`, `labeled-field/`, `paper-backdrop/`, `progress-bar/`,
  `stacked-icons/`, `section/`, `_shared/` — substantial V-tranche +
  pre-V additions.
- does not list 23 v0.8.4–v0.9.0 promoted composables.

The 67 post-open commits substantially **expanded** the public surface
without any CLAUDE.md / README.md / DESIGN.md alignment. Drift is
larger than at K open.

### Gate (b): `npm run profile:budget` script + GitHub workflow job
**Disposition**: OPEN
**Evidence**: `package.json:283–306` does NOT define `profile:budget`.
`profile:bundle` exists (line 300) but no budget assertion mode + no CI
runner. `.github/workflows/` directory does not exist at HEAD. The
v0.8.0 silent regression remains.

### Gate (c): stress harness retire-or-restore
**Disposition**: OPEN
**Evidence**: `scripts/stress/` directory does not exist at HEAD. No
formal retire decision documented. Effectively retired by absence; no
proof doc cites the decision.

### Gate (d): `ay-close` retire if regressed
**Disposition**: OPEN
**Evidence**: `package.json:302` reads `"ay-close":
"scripts/ay-close.sh"`. Both file + script entry present.

---

## W5 — Mobile-viewport fitness

### Gate (a): `<CarouselPager>` orientation `ComputedRef` bug fix
**Disposition**: OBSOLETE — bug premise was wrong
**Evidence**: `src/components/ui/carousel/useCarousel.ts:6–11`
destructures `orientation` from `CarouselProps` as a plain string, not
a `ComputedRef`. The K plan claimed the comparison `orientation ===
'vertical'` always returns false — but the consumer side
(`CarouselPager.vue:46, 49, 59, 68, 87`) compares a plain string against
`'vertical'`, which is correct. The Rε B3 finding was either
mis-diagnosed or refers to a transient state at K-plan time that has
since been corrected by an upstream fix. There is no orientation bug at
HEAD.

### Gate (b): top story-pager dock 4px overflow at 375 viewport
**Disposition**: OPEN
**Evidence**: `demo/layout/StoryPager.vue` shows no `max-md:` /
`sm:` responsive utilities. No commit modifies this file post-K-open
for mobile fitness.

### Gate (c): GlassCarousel mobile pager wrap
**Disposition**: PARTIAL (the J-flagged defect remains)
**Evidence**: `src/components/ui/carousel/GlassCarouselPager.vue` shows
no `max-md:flex-wrap` or stacking utilities at small viewports. Pager
remains horizontally laid out regardless of viewport. No related commit
in the 67 post-open.

---

## W6 — Audacious primary-CTA gestalt extraction (K HEADLINE)

### Gate (a): `Button variant="primary-audacious"` exists in buttonVariants CVA
**Disposition**: OPEN
**Evidence**: `src/components/ui/button/index.ts:11–31` enumerates
variants: `default`, `destructive`, `outline`, `secondary`, `accent`,
`ghost`, `glass`, `glass-wash`, `ai`, `link`. No `primary-audacious`.
`grep` for `primary-audacious` across `src/` + `demo/` returns 0 hits.

### Gate (b): `btn-audacious` utility ships canonical recipe
**Disposition**: OPEN
**Evidence**: `grep "btn-audacious" src/styles/` returns 0 hits.

### Gate (c): Dock primary tier consumes canonical recipe
**Disposition**: OPEN
**Evidence**: `src/styles/dock.css` still defines the disco-grain +
sparkle-sweep + specular-highlight composite locally (lines ~675-790).
Recipe still duplicated in a single home (dock.css), not lifted. The
recipe MAY have moved location within dock.css (audit found `audacious`
references to it) but it has not been extracted into a reusable
canonical utility.

### Gate (d): ≥ 2 consumers (dock + ≥ 1 demo story)
**Disposition**: OPEN
**Evidence**: precondition (a) not met → consumers don't exist.

### Gate (e): phase-color decoupling decision documented
**Disposition**: OPEN
**Evidence**: no decision doc.

The K HEADLINE — the architectural transposition the tranche was named
for — is entirely OPEN. None of the 67 post-K-open commits touched this
work.

---

## W7 — Drag-keep-open story-fidelity + NumberField consumer

### Gate (a): demo story demonstrates `<Slider>` inside `<GlassDock>`
**Disposition**: OPEN
**Evidence**: `grep "Slider" demo/stories/navigation/dock.vue
demo/stories/compositions/` — only `LabeledSlider` in
`compositions/settings.vue` (not in a dock context). No
`compositions/dock-with-slider.vue`. The `slider.vue` story doesn't
embed a dock. The J FINAL story-fidelity gap remains.

### Gate (b)/(c)/(d): NumberField `keep-dock-open` decision
**Disposition**: OPEN
**Evidence**: `grep "keepDockOpen" src/components/ui/number-field` returns
0 hits. No formal Option-B documentation in DESIGN.md (reference only
shows Slider as the consumer). Decision not recorded.

---

## W8 — Close ceremony + 7-agent strengthened post-close audit

### Gate (a): all seven lane audit reports return
**Disposition**: OPEN
**Evidence**: `docs/tranches/K/audit/` is empty.

### Gate (b): ι lane returns zero "named but not landed" P0 items
**Disposition**: OPEN — there ARE named-but-not-landed items (this audit
itself surfaces them: `Button variant="primary-audacious"`,
`hoverOpenDelay` precise name, profile:budget script, etc).

### Gate (c)–(j): findings absorb / FINAL.md / typecheck-build-test green / etc.
**Disposition**: OPEN — ceremony not run.

---

## Newly surfaced concerns

The 67 post-K-open commits delivered an entire ad-hoc V-tranche that K
never anticipated. New artefacts and architectural transpositions:

### New chassis primitives + sectioning vocabulary
- **`<Section>`** (`d2247c8`) — sectioning landmark over the typography
  ladder; composes `text-heading` / `text-title` / `text-subheading` /
  `section-label` rungs. New `.section-description` utility.
- **`<ModalOverlay>`** (`43bee82`) — `_shared` SFC collapsing Dialog +
  Sheet + DialogScrollContent overlays onto a single SFC with
  `scrim × animate × layout` CVA-style props. Effectively retires the
  bare `@utility overlay-scrim` (W2.3 substrate fades).
- **`<LabeledField>`** (`05e1d44`) — parent SFC + `.labeled-field-label`
  utility; 4 wrappers compose. K explicitly deferred this to L per
  cross-tranche debt; landed inside K's window anyway.
- **`menuItemVariants`** (`6e6916e`) — shared `_shared` CVA collapsing 9
  menu-family + picker-family items (DropdownMenu × 4, ContextMenu × 4,
  SelectItem, ComboboxItem, CommandItem).
- **`<MetricPill>`** (`0601d62`, v0.8.3) — stacked taller-fatter pill
  primitive composing `<MetricBadge>`.
- **`containerName` prop on GlassDock** (`d62a836`, v0.8.3) — lifts
  container-query host onto the dock primitive.
- **`<StorySection>`** (`deff97a`) — demo-side label + body chassis
  primitive.
- **`<ShowcaseFrame>`** (`8136baf`) — pad knob over the
  rounded-card showcase chassis (replaces the K-planned `<CartoonCard>`
  adoption work).
- **`<DockShowcaseFrame>`** (`60fd745`) — chassis-aware showcase frame
  for 13 dock sites.
- **`TokenLadder` + `ToneSwatch`** (`cfbcb48`) — token tour primitives.
- **`useStoryDemo`** (`227e1b0`) — canonical play/reset/status harness
  with cleanup discipline.

### Token + theme expansion
- **`--icon-{2xl,3xl,hero}`** rungs (`4cc8571`, `a371fe7`, `ee34655`).
- **`--z-behind: -10`** (`ee34655`) for Aurora background tier.
- **`--surface-tint-{quiet,floating,modal}`** tier aliases (`44f2414`).
- **`.hairline-accent`** canonical utility + token (`b66891d`).
- **`--duration-shimmer`** offset documented (`4fb2102`).
- **`--opacity-disabled`** bridge + 12-component sweep (`a22f335`).
- **Duplicate `--leading` / `--tracking` retired** in favor of `--type-*`
  canon (`c5e56a1`).
- **Typography ladder migrations** for Card, Label, Dialog, Sheet,
  Drawer titles (`38b94ac`, `cf3bf37`).
- **Radii sweep** for toggle/button/avatar/badge (`8912d4b`, `345d11e`).
- **12 orphan tokens excised** (`afb2b34`) — covers most of the K
  substrate-without-consumer cohort that W2 was scoped to address.

### Active-state + interaction grammars
- **Active-state vocabulary canon** (`3e925e1`) — BouncyToggle +
  UnderlineTabs unified.
- **Density-rail unification** (`c3df06e`) — GlassDock + DockGroup +
  MetricPill onto `data-density` canonical attribute.
- **Popover-animation grammar** (`7ed3b73`, `c0b8992`) — HoverPopover +
  floating-panel onto canon.
- **`.popover-content` utility** (`1841de5`) — collapses 2 W1 survivors.
- **menu-item three-state contract** (`2e01d68`) — explicit
  `data-[disabled]` selectors.

### Composable promotions
- **v0.8.4 `1a685ad`** promoted `useTokenColor` + `useStagger` +
  `useAnimatedNumberMap` from speedtest. `useTokenColor` arguably
  supersedes `cssVar()` (W2.2 dilemma) for the WAAPI-adjacent reactive
  read use-case.
- **24 composable storybook entries** (`323d675`) — public surface
  documented for the first time.
- **23 composables** total in v0.9.0 release notes.

### Test + tooling
- **Storybook smoke gate** (`6667370` / V.W4.T16) — vitest variant
  exercising every story import. Replaces the originally-spec'd
  Playwright smoke. Catches manifest-vs-file drift.
- **Resource hints + .browserslistrc** (`08ffbde`) — preconnect to
  api.fontshare.com + browserslist floor (perf-adjacent; adjacent to
  the Lighthouse / bundle-budget concerns K W4 named).

### Mention of V tranche
- `6667370` references `V.W4.T16`; release notes for `23ce73c` mention
  `V.W2 / V.W3 / V.W4`. **No V.md plan, no V wave specs, no V FINAL.md
  exist** under `docs/tranches/` — V is referenced only in commit
  messages and release notes. The V work was dispatched and shipped
  ad-hoc through the U/V-tagged audit cohorts, without the formal
  tranche-letter folder structure.

---

## Recommended K replan

### Headline observation

K's planning baseline (`0666be6`) is two months stale. Since then,
v0.7.x → v0.8.0 → v0.8.6 → v0.9.0 shipped, including an entire
**unwritten V-tranche** that absorbed:
- 5/38 K hard-gate items directly (W1.c Configurator second consumer;
  W2.1 foreground triple wire; W2.3 overlay-scrim shadowed; W2.4
  paper.css hsl literals; W2.5 Tooltip rounded-tooltip).
- 12 of K's 36 chronic-deferral substrate-without-consumer rows
  (orphan tokens excise — `afb2b34`).
- Most of K invariant 7's gestalt-sweep intent (V.W3 structural unions
  delivered the largest gestalt convergence pass since I).

But K's HEADLINE — the audacious primary-CTA extraction — and K's
process-hardening (W0 dispatch precepts) and K's tooling restoration
(W4 bundle-budget) **never landed**. Vocab.γ second-pass (W3) is no
closer to met. Mobile-viewport fitness (W5) is barely touched. W7
Slider-in-dock story is unmade. W8 close ceremony is unrun.

### New invariants to add

If a successor tranche opens, it should bind:

1. **No tranche-letter shadow execution** — work that lands without a
   plan-folder structure cannot be retroactively claimed under a later
   plan. The V-tranche's commit-message-only existence is a precept
   violation.
2. **Cross-tranche absorption requires explicit reconciliation at
   open** — when a tranche opens against a stale baseline, the
   reconciliation lane (analog of K W0 Lane I) is **mandatory**, not
   one of two parallel lanes.
3. **HEADLINE invariant** — every tranche's named architectural
   transposition closes at HEAD before the tranche closes. K's
   audacious primary-CTA was not just a wave — it was the tranche
   identity. Tranches that miss their headline are mis-scoped.

### Waves to retire

- **W2** — 4/5 gates absorbed by V; the `.overlay-scrim @utility`
  cleanup + `cssVar()` retire-or-wire are 2-line follow-ups, not a
  wave.
- **W1.b** (CartoonCard adoption) — superseded by `<ShowcaseFrame>`.
  The 8 demo migrations target a chassis primitive that lifts the
  intent better than `<CartoonCard>` would.
- **W1.c** (Configurator gestalt completion) — one consumer added; can
  be marked closed with the residual that aurora chrome remains
  parallel (formal Option-B-with-rationale).
- **W5.a** (CarouselPager `ComputedRef` orientation bug) — the bug
  premise is wrong; orientation is destructured as a string. Strike.

### Waves to add

- **WX — Doc-drift catch-up at v0.9.0**: CLAUDE.md / README.md /
  DESIGN.md needs a substantial rewrite. Drift now spans 11 V-tranche
  primitives + 23 composables + 5 chassis demo primitives.
- **WY — V-tranche post-hoc plan**: write `docs/tranches/V/` with
  V.W2 / V.W3 / V.W4 wave specs + FINAL.md attributing the 67-commit
  cohort to its phases. Otherwise the next reconciliation faces the
  same unattributed-work problem.
- **WZ — Composable promotion audit**: 23 composables shipped in
  v0.9.0; Rε B5/B6 cross-tranche debt rows (3 unused composables; 3
  sidebar/virtual composables) need second-consumer audit at the new
  surface size, not the old one.

### Headline architectural transposition for K-successor

Given v0.9.0 already shipped chassis primitives + 23 composables, the
natural successor headline is **canonical-CTA extraction completion**:
the K-original `Button variant="primary-audacious"` work — now lifted
above a substantially richer chassis vocabulary (`<ShowcaseFrame>`,
`<DockShowcaseFrame>`, `data-density` rail, popover-animation grammar,
status-color foreground tokens). The recipe is the same; the
substrate it lifts onto is much more polished.

### Final recommendation

**Supersede K with a new tranche letter (L).**

K was opened against a baseline two stale releases ago. The V-tranche
landed unwritten, absorbing K's substrate-cohort work but not its
headline or process-hardening. Closing K at HEAD would require:
- retroactively claiming V's 67 commits as K execution (precept
  violation; mis-attributes the V work);
- formal write-up of W6 / W0 / W4 absences as residuals (substantial);
- a 7-agent post-close audit on a tranche that never dispatched.

Replanning K against v0.9.0 is also wrong: the wave structure (W0–W8)
was scoped against `0666be6`, and ~40% of its hard gates have either
been absorbed or rendered obsolete by V. The replanning effort exceeds
opening a new tranche.

**Recommended action**: archive K with a `K-superseded.md` note citing
this reconciliation; open **L** against `23ce73c` (v0.9.0) with:
- a mandatory reconciliation lane (this audit + post-V-tranche residuals);
- the K HEADLINE re-promoted to L W1 (audacious primary-CTA);
- the K W0 dispatch-precept hardening re-promoted to L W0 (now with
  more incident data — the unattributed V-tranche being the latest);
- a V-tranche post-hoc write-up as L's first wave or sub-tranche;
- the bundle-budget gate restoration in L's tooling wave;
- the doc-drift catch-up at v0.9.0 size in L's doc wave.
