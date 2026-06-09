# W-demo-ia — Demo IA + story band — deep inventory

**Lane** W-demo-ia · **Mode** read-only inventory / tranche-planning · **HEAD at audit** `88a2ec5`
(the inventory-index snapshot says `c72d2ac`; the W45 dock band landed AFTER it — see §regression)
· **Scope** W18 (IA reinvention), W40 (demo-shell dock-nav), W57 (demo-radial, DEVELOPED), W58
(story-language, DEVELOPED), the P1–P11 asks; the speedtest-grid idiom (P8), the dock section
(D14/DK10), the aurora/constellation heros (P7).

---

## Status at a glance

| Wave / ask | Plan status | LIVE/source truth at HEAD `88a2ec5` |
|---|---|---|
| **W18** storybook IA reinvention | planned | **NOT-STARTED.** IA is still the old AV.W10 11-category tree; blob trio still 3 rows; dock still scattered under `navigation/`; `foundations/dock-active-tokens` still present; `fourier-field` src dir exists but NO manifest row; `proof:storybook-complete` still UNREGISTERED. |
| **W40** demo-shell dock-nav coherence | planned | **NOT-STARTED** for its content reauthor. `proof:demo-dock-nav` passes structurally but the 5 coherence/runtime gates are NOT re-scoped/re-registered; shell composes the pre-AX dock; runtime falsifier still fail-open SKIP. |
| **W57** demo-radial + pulse-calm (P6/P7) | DEVELOPED, live-verified | **DONE (source); π handed-to-orchestrator.** Gate `proof:demo-radial-calm` GREEN; the 4 Aurora heros + `aurora-hero.ts` helper landed; pulse twin collapsed to `--pulse-aura-strength 0.22`. JSON: `dev-complete-source-green-pi-pending`. |
| **W58** story-language strip (P10 prose / P11 meta) | DEVELOPED | **PARTIAL — gate RED again (regression).** W58 swept 49 SFCs GREEN, but the W45 dock band re-introduced ONE tranche-code comment in `navigation/dock.vue:86` (`<!-- AX.W45 …`). `proof:story-language` now reports 1 hit → FAIL. The W58 gate worked as designed — it caught a downstream regression. |
| **P8** speedtest-grid idiom | unowned → routed to W18 augment | **NOT-STARTED.** Only 3 `MetricCell`/`MetricStack`/`MetricRow` references in `demo/stories/` (manifest + the two dedicated metric story pages). The grid idiom is essentially unused across the storybook. |
| **P10** StorySection/ShowcaseFrame migration | unowned → routed to W18 augment | **PARTIAL.** 60/145 SFCs use `StorySection`, 44/145 use `ShowcaseFrame`. ~85 pages still hand-roll the `flex flex-col gap-4` + `<h2>` + muted `<p>` triplet. |
| **P11** meta-language strip | W58 | **DONE then REGRESSED** (see W58 row). |
| **P1–P5** prunes / carousel | W19 (P1-P4) + W23 (P5) | **OUT OF THIS LANE** (W-primitives / W-sliders) — but the IA tree (W18) frames the survivors after these rule; status tracked there. |

---

## DONE (this lane's developed waves)

### W57 — demo-radial reauthor + pulse-aura calm (P6/P7) — DONE (source), π-pending
- Gate `proof:demo-radial-calm` GREEN at HEAD. Verified live: `--pulse-aura-strength: 0.22 (≤0.25)`,
  `--pulse-aura-breath-max: 0.42 (≤0.5)`, pct/num twin collapsed YES, all four hero files
  (`compositions/hero.vue`, `foundations/intro.vue`, `foundations/paper-glass.vue`,
  `compositions/auth-shell.vue`) render `<Aurora>` and carry NO `--section-color-*` radial wash.
  `demo/stories/aurora-hero.ts` helper present (3 brand palettes).
- Gate tags `["local","ci"]` — CI-registered.
- **Residual:** the π live arm (ambient-halo readback + hero-drift legibility + no-GL parity, light+dark)
  is `handed-to-orchestrator` (JSON `piLiveArm.status: handed-to-orchestrator`). The wave does NOT
  formally close until that paired-π BEFORE/AFTER lands. This is a CARRY-INTO-CLOSE, not a gap.
- **RATIFY-at-live (W57 §Open-Questions):** (1) `substrates/aurora.vue` scoped bloom KEEP-static vs
  `renderMode="css"` Aurora; (2) per-hero `opacityCeiling` tune; (3) Class-B Constellation ADD
  (`tools/command.vue`/system index) — deferred behind a live "wants a bg at all?" call.

### W58 — storybook-language strip (P10 prose / P11 meta) — DEVELOPED then REGRESSED
- The sweep landed: 49 SFCs cleaned; the canonical P11 witnesses the user named
  (`dock.vue` WCAG/`ref-counted`/`#collapsed slot`/`DockIconButton flush-fit` lines,
  `buttons.vue` K.W6, `dock-with-slider.vue` AW.W3, `form-validation.vue` muster-J) all confirmed
  GONE at HEAD (grep for `WCAG|ref-counted|#collapsed slot|DockIconButton for flush` in
  `navigation/dock.vue` → empty). Gate `proof:story-language` born-RED→GREEN at dev time.
- **BUT the gate is RED at HEAD `88a2ec5`** — see §Regression. Gate tags `["local"]` (NOT ci-tagged —
  this is a divergence worth noting given the regression it just caught; consider promoting to `ci`).

---

## PARTIAL / NOT-STARTED (the IA spine)

### W18 — storybook IA reinvention — NOT-STARTED
The headline F-band wave has not run. Confirmed at source:
- `demo/stories/manifest.ts` still ships the **11-category AV.W10 tree** (`proof:storybook-ia`
  reports `categories: 11 (foundations, substrates, primitives, containers, navigation, data,
  feedback, motion, tools, compositions, composables)` — verbatim the old tree).
- **Blob trio still THREE rows** (`substrates/goo-blob` `:96`, `blob-interaction` `:97`,
  `blob-mood` `:98`) — the D6 fold-to-one `substrates/blob` not done.
- **Dock still scattered** across `navigation/dock` `:160`, `navigation/dock-layers` `:161`,
  `navigation/rail` `:162`, plus `foundations/dock-active-tokens` `:86` + `compositions/dock-with-slider`
  `:233` — the first-class `dock` category (D14) does not exist.
- **`tools` single-story bin** still present; **24-story `primitives`** not split.
- **`fourier-field`** src dir exists (`src/components/custom/fourier-field/`) but has NO manifest
  row and NO `demo/stories/substrates/fourier-field.vue` — the W18 row+SFC create is owed.
- **`proof:storybook-complete` still UNREGISTERED** (`grep -c storybook-complete scripts/gates.mjs`
  → 0) — the headline "gate exists, gate not wired" fix is open.
- `proof:storybook-ia` header still reads `(AV.W10)` and freezes the OLD tree — the born-RED lock
  is intact; the wave will redden it by construction the instant the new tree lands.

W18 dependsOn W06 (dock story home + `dock-active-tokens` delete + the `dock/variants` content),
W19/W20/W22/W23 (prune-wave row deletions land first), informally trails W28/W29 (instrument/metric
rows). NONE of those have run for their demo-row legs, so W18 cannot open yet — the dependency chain
is the gating fact.

### W40 — demo-shell dock-nav coherence reaudit — NOT-STARTED (content/gates)
- `proof:demo-dock-nav` passes structurally (SidebarDock+BottomDock render GlassDock, CategoryRail/
  StoryPager deleted, 0 residual imports) — but this is the MERGED-BUT-UNTRUSTED AW.W28 shell.
- The five W40 gates (`demo-dock-nav`, `demo-dock-nav-runtime`, `animation-coherence`,
  `design-md-current`, `naming-consistency`) are NOT registered in `gates.mjs` (only `demo-dock-nav`
  is — the runtime falsifier + three coherence gates are absent from the registered fleet).
- The runtime falsifier is still a fail-open SKIP (`process.exit(0)` when Playwright absent) — the
  cardinal AW flaw, unfixed.
- The shell composes the pre-AX dock; W40 must rebuild it on the AX-rebuilt GlassDock + reconcile
  against the W18 tree. Both predecessors (W06, W18) are unrun → W40 is fully downstream.

### P8 — speedtest-grid idiom — NOT-STARTED (routed to W18 augment)
- The `A-demo-grid-text.md` audit proved the grid idiom is a SHIPPED exported triad
  (`MetricCell`/`MetricStack`/`MetricRow`, subpaths `/metric-cell`, `/metric-stack`) — overfitting
  bar already cleared; the opportunity is CONSUMPTION not invention.
- At HEAD only **3** demo references exist (manifest + the two metric story pages). The befitting
  metric/data/token-tour pages (`foundations/colors`, `shadows`, `surface-tints`,
  `primitives/metric-badge`, `compositions/dashboard`/`instrument-chassis`, substrate token-tours)
  still hand-roll bespoke `flex flex-wrap` chip rows / ad-hoc swatch grids.
- Disposition (audit): augment W18 content scope — adopt `MetricCell` in a
  `grid grid-cols-2 sm:grid-cols-4 gap-3` (or `<Card tier="wash">` tiles) inside `StorySection`
  on the befitting pages. NO new primitive. The "befitting" page set is a flagged
  needs-user-decision (the user's "when befitting" signals selective, not blanket).

### P10 structural-duplication migration — PARTIAL (routed to W18 augment)
- `StorySection` 60/145, `ShowcaseFrame` 44/145. ~85 pages still hand-roll the triplet
  (`primitives/buttons.vue` 16 raw `<section>` blocks, `inputs.vue` 12, `card.vue` 12).
- This is the "duplicative text" half of P10 (distinct from W58's meta-language strip). It is owed to
  W18's content augment, NOT W58 (W58 explicitly excludes the StorySection migration — its FileBounds
  cover body-prose + the gate only).

---

## REGRESSION (live-truth, the cardinal-lesson manifestation in THIS lane)

**`proof:story-language` (W58's gate) is RED at HEAD `88a2ec5`.** The W45 dock band (landed AFTER
W58 developed) re-introduced a tranche-code comment:

```
demo/stories/navigation/dock.vue:86 — <!-- AX.W45 — Home is a PERSISTENT control: authored ONCE in
     #persistent, it stays in-flow + visible in BOTH collapsed and expanded … -->
```

This is the EXACT regression class W58's gate was built to catch — a downstream wave re-leaking
internal meta-language into demo-visitor-facing source. The gate is doing its job; the fix is a
one-line comment rewrite (strip the `AX.W45 —` prefix, keep the `#persistent`/forward-ref language
which is allowed). **This must FOLD INTO this tranche** — it cannot ship with W58's gate RED. It also
argues for promoting `proof:story-language` from `local` to `ci` so the regression cannot recur silently.

---

## DEFERRED items that must FOLD INTO this tranche

1. **W58 gate RE-GREEN** — strip the `AX.W45` tranche-code from `navigation/dock.vue:86` (one-line),
   re-run `proof:story-language` to GREEN. Trivial but BLOCKING (a RED gate at HEAD).
2. **W57 π live arm** — the orchestrator's paired-π BEFORE/AFTER (pulse ambient-halo + hero drift +
   no-GL parity, light+dark) is the binding close criterion; `handed-to-orchestrator` is not closed.
3. **`proof:storybook-complete` registration** (W18) — the 272-line export→story totality gate exists
   (`scripts/proof-storybook-complete.mjs`) but is unwired; W18 owns the registration. A standing
   "gate exists, gate not wired" debt feeding the W33 gate-fleet close.
4. **P8 grid-idiom adoption** + **P10 StorySection migration** — both routed to W18 content augments,
   neither started. The `A-demo-grid-text.md` "befitting page set" needs-user-decision is unresolved.
5. **`fourier-field` IA seat** — the src primitive ships with no story/manifest row; W18 creates the
   `substrates/fourier-field` row + SFC. W57 §depends on W18 settling the page set; the fourier-field
   hero/IA seat is also a W43 citizenship dependency.

---

## GAPS — plan divergences / unaddressed prompts

- **W58 vs P10/P8 SCOPE SPLIT is a latent double-ownership.** The convergence-2 plan minted W58 for
  the prose/meta strip (P10/P11), but `A-demo-grid-text.md` disposed P10's STRUCTURAL-duplication half
  (StorySection migration) + P8 (grid idiom) as **W18 augments**. So P10 is split across two waves:
  W58 owns meta-language, W18 owns the StorySection migration + grid. This is COHERENT but must be
  recorded explicitly so neither wave assumes it owns the whole P10 — W58's FileBounds correctly
  exclude the migration. NO conflict, but the split is easy to lose; the W18 content augment clauses
  (P8 grid + P10 migration) are NOT yet written into the W18 wave doc Scope (the doc references D6/D14
  only). **The W18 spec needs the P8+P10-migration augment clauses folded in.**
- **W57 dependsOn W18/W40 — but W57 already LANDED its heros while W18/W40 are unrun.** W57 authored
  the four Aurora heros on the CURRENT (pre-reinvention) page set. When W18 reinvents the IA + W40
  rebuilds the shell, the hero pages may move/rename — the heros could need re-placement. W57's own
  dependency note says "the heros are authored on the FINAL page set, not mid-churn." This was
  VIOLATED by sequencing (W57 ran before W18). Surface as a re-verify-at-W18 obligation: confirm the
  four hero SFCs survive the IA relocation, or re-home the `<Aurora>` blocks.
- **The dock SECTION (D14/DK10) content is W06 scope, W06 is unrun.** The user's explicit ask ("an
  ENTIRE section dedicated to the dock — morphing, animations, layers, variants, rail") needs the
  W06 morph-showcase + `dock/variants` axis-tour SFC content BEFORE W18 frames the `dock` category.
  `navigation/dock.vue` today has wrap/morph prose but no "Watch it morph" controlled showcase and no
  variant/density/orientation axis-tour. This content is the visible payoff of the W45 dock band that
  just landed — it is the dogfood that PROVES the dock work; its absence is the biggest user-visible
  gap in this lane.
- **`proof:story-language` is `local`-only** — given it just caught a real regression, the CI gap is a
  divergence from the "born-RED gate locks it closed" intent.

---

## Gestalt PATH FORWARD (planning, not code)

The demo-IA spine is a strict dependency DAG, and the lane is currently **bottom-heavy**: the two
leaf demo-side waves (W57/W58) landed, but the SPINE (W18 IA tree → W40 shell) is blocked behind the
unrun dock-band/prune predecessors (W06, W19, W20, W28/W29). The idiomatic order:

1. **Immediate (unblock the RED gate):** re-green `proof:story-language` by stripping the `AX.W45`
   comment in `navigation/dock.vue:86`, and promote the gate to `ci`. This is a tranche-blocking RED
   that any close must clear. (Fold into the next dock-band commit, not a standalone wave.)
2. **W06 first (the dock CONTENT):** author the dock morph-showcase + `dock/variants` axis-tour SFC
   content + delete `foundations/dock-active-tokens` — the D14 content half + the visible proof of the
   W01/W45 dock work. This is the user's most-named demo ask (D14/DK10) and the dogfood the whole dock
   band converges on. Without it the dock band has no live storybook surface to audit.
3. **W18 (the IA TREE) — only after the prune waves rule:** author the new category tree (first-class
   `dock` category, dissolve `tools`, split `primitives` Forms+Display, fold the blob trio to ONE
   `substrates/blob`, add `substrates/fourier-field`), relocate SFCs, register `proof:storybook-complete`,
   re-baseline `EXPECTED_TREE` LAST. **Fold the P8 grid + P10 StorySection-migration augment clauses
   into the W18 spec FIRST** (currently the spec only carries D6/D14) so the content scope is single-owner.
4. **W40 (the SHELL) after W18:** rebuild SidebarDock/BottomDock on the AX-rebuilt GlassDock over the
   reinvented tree; promote the runtime falsifier from fail-open SKIP to fail-CLOSED in the π workspace;
   re-scope+register the five coherence/nav gates.
5. **Re-verify W57 at W18 close:** confirm the four Aurora heros survive the IA relocation (re-home the
   `<Aurora>` blocks if hero pages moved/renamed); ratify the W57 open-questions live (scoped bloom,
   opacityCeiling, Class-B Constellation ADD).
6. **Close the W57 π arm** as part of the W18/W40 live π navigation audit (one combined demo-IA live
   pass covers W18 routes + W40 shell + W57 heros + pulse).

The discipline that governs all of it: a wave closes on the LIVE π audit, never the headless gate
alone (the cardinal lesson). W57's `dev-complete-source-green-pi-pending` and W58's gate-RED-at-HEAD
are both honest manifestations of that — neither is "done" until the live truth + the regression are
green.
