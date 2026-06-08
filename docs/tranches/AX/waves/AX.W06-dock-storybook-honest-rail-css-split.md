# AX.W06 — Dock storybook consolidation + honest rail + dock.css split

**Band** A · DOCK · **Severity** major · **dependsOn** AX.W01, AX.W04 (· AX.W00 for the π-lane close
machinery) · **Charter** AX.md §3 (the `### AX.W06` block, lines 487-524) + §4 note 3 (the renamed-not-cut
token-ladder, lines 2004-2007) + §4 note 19 (the CSS god-module split clears via W25b + W06 for dock) +
§4 note 23 (the dock-spring oracle) + §2b band-A precept row (line 213) · **Audit**
`deep-audit-corpus.json` slice `dock-rail-sections` (index 4, findings F0-F4) + slice `god-modules`
(index 25, the `dock.css` 1227-line split finding) + slice `storybook-structure` (index 15, the dock
category) + `constellation-analysis-corpus.json` `result[0].findings[6]` (the keyframes
`data-glass-dock-portal` consumer contract), `result[4].findings[4]/[7]` (the DDR-AS-RC-3 standalone
`DockIconButton` 44px floor), `result[17].foldIntoWaves[2]` (the bbnf-buddy ToolsLayer rail re-derivation).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `eaba94f` on four falsifiable witnesses that do NOT hold today:

- **RED witness 1 (the headline — token-ladder debris still shipping).** The route
  `/dock/icon-button-token-ladder` was **RENAMED, not removed**: `git show 0b27f01 --stat` shows a pure
  rename `{…dock/icon-button-token-ladder.vue => foundations/dock-active-tokens.vue} | 0` (the `| 0` = ZERO
  content delta). The file `demo/stories/foundations/dock-active-tokens.vue` exists at HEAD (7134 bytes), is
  byte-for-byte the old token-ladder (same `// dock-icon-button token ladder — O.W6 Lane B active-state
  vocabulary` header, same `activeRung` ref, same 5 rungs default/audacious/boomed/outlined/shadowed), and
  is registered in `demo/stories/manifest.ts:86` as `foundations/dock-active-tokens` ("Dock Active Tokens").
  The falsifiable RED assertion: *`test -f demo/stories/foundations/dock-active-tokens.vue` → EXISTS (RED);
  `grep -c "dock-active-tokens" demo/stories/manifest.ts` → 1 (RED). After the wave: file GONE, manifest
  ref = 0 (GREEN).*

- **RED witness 2 (dock-primary content scattered across THREE categories).** Dock-PRIMARY routes live in
  `navigation/` (dock, dock-layers, rail — `manifest.ts:162-164`), `foundations/` (dock-active-tokens —
  `:86`, the token-ladder debris), AND `compositions/` (dock-with-slider — `:237`, the keepDockOpen proof
  filed by lineage at the J.W5.C closeout, not by subject). The falsifiable RED: *the keepDockOpen proof
  lives at `compositions/dock-with-slider.vue` (RED — dock-primary content outside the dock home). After the
  wave: it is a "Slider in dock" SECTION inside the single `navigation/dock` home; `compositions/dock-with-slider`
  + its manifest row are GONE (GREEN).* (The six INCIDENTAL-host stories — metric-pill/dark-mode-toggle/
  header-ribbon/AuroraConfigDock/instrument-chassis/instrument-rail — are correct-as-is and MUST NOT move:
  a component demoed inside a dock host belongs with that component.)

- **RED witness 3 (the rail is a half-inapplicable variant flag + the demo re-derives a worse rail).**
  `variant="rail"` on `GlassDock` force-vertical (`GlassDock.vue:157-160`) and force-always-expanded
  (`:178-182`) yet inherits the ENTIRE horizontal prop surface — `collapseDelay`, `startCollapsed`, the
  `#collapsed` slot, the dual-layer grid — **NONE of which apply to a rail**. The CSS contribution is ~6
  rules (`dock.css:376-420`). Meanwhile `demo/layout/SidebarDock.vue` dogfoods the polished
  active-item/tap-squish/tooltip rail treatment LIVE, and `demo/stories/navigation/rail.vue` re-derives a
  WORSE rail by hand over a bespoke icon-button list. The falsifiable RED: *type-check a `<GlassDock
  variant="rail" :collapse-delay="2000">` — it COMPILES at HEAD (RED: the inapplicable prop is accepted);
  the refined active-rail treatment is NOT in `dock.css`/`dock-controls.css` (it lives only in
  `SidebarDock.vue`) so a consumer reaching for the rail gets the un-refined surface (RED). After the wave:
  the rail surface is type-narrowed (collapse/startCollapsed/#collapsed inapplicable under `variant="rail"`)
  AND the refined treatment is hoisted into the variant CSS so the demo == the shipped contract (GREEN).*

- **RED witness 4 (dock.css is a structurally-invisible 1227-line CSS god-module).** `wc -l
  src/styles/dock.css` = **1227** — over the 500-line bound. It is invisible to `proof:no-god-module` at HEAD
  because the collector accepts only `.ts`/`.vue` (`scripts/proof-no-god-module.mjs:47`) — the false
  "largest now 475" green-claim. It carries six distinct concern clusters inside ONE `@layer components`
  (`:8`): shell/morph-clip (`:52-308`), density tiers (`:163-294`), shape/variant incl. instrument-strip
  (`:326-481`), the layer crossfade/hit-test contract (`:606-810`), overflow-wrap (`:911-952`), layer-group/
  rail/stack (`:964-1133`). The falsifiable RED (once the W25a `.css`-aware collector lands): *`proof:no-god-module`
  reports `dock.css` at 1227 > 500 (RED). After the wave: `dock.css` is carved into `src/styles/dock/`
  cohesive partials, each under the bound, GREEN.*

The wave is RED at HEAD on all four; the HardGate drives each to GREEN.

---

## Goal

The dock has ONE storybook home, an honest type-narrowed rail variant carrying the refined chrome the demo
already dogfoods, and a `dock.css` carved into cohesive `src/styles/dock/` partials that pass the
`.css`-aware god-module gate — with the renamed token-ladder debris DELETED outright.

---

## Scope (the gestalt fix — no workaround, no legacy, no debris)

Four coupled excise-and-consolidate folds, all on the FINAL post-W01/post-W04 dock model:

**(1) DELETE the token-ladder debris (F0).** Excise `demo/stories/foundations/dock-active-tokens.vue`
OUTRIGHT and drop its `manifest.ts:86` row. NO rename, NO rehome — the AV.W13 restructure (0b27f01) treated
a `| 0`-content-delta rename as an IA-relocation, the exact wrong disposition for an item the user flagged
"wtf / remove." The `--dock-active-{bg,color,scale,border,shadow}` override pattern is already proven by the
live `SidebarDock`/`BottomDock` chrome (`.is-active` + accent restyle) and documented in CLAUDE.md's "Dock
Active Tokens" note + `dock-controls.css` comments; it needs no standalone swatch tour. If any
token-override teaching survives, it folds as ONE short subsection into the consolidated `navigation/dock`
story — never a foundations page.

**(2) ONE dock home (F1).** Establish `navigation/dock` as the SINGLE dock home. Fold the keepDockOpen /
keepDockOpen-hold proof from `compositions/dock-with-slider.vue` in as a "Slider in dock" SECTION (retire
`compositions/dock-with-slider` + its `manifest.ts:237` row). `dock-layers` + `rail` stay as sibling
`navigation/` routes (distinct enough to warrant their own pages) OR collapse into `navigation/dock`
sections if the page stays readable — DECIDE at wave time by length (RATIFY-BEFORE-IMPL below). Do NOT
touch the six incidental-host stories — moving them would be the contrivance the §0 mandate forbids.
Document the **dock-as-portal-host consumer contract** in the consolidated home: a consumer mounting a
dropdown/menu in a dock MUST be inside the `keepOpen` + `data-glass-dock-portal` teleport contract (the
keyframes D9 menu-dropped-out-of-keepOpen break is the canonical mis-wire — constellation
`result[0].findings[6]`).

**(3) Honest rail + hoisted polish (F2 + F3).** Make the rail honest, then make the code honest. Keep rail
as a `GlassDock` variant but FORMALLY scope its surface: under `variant="rail"` the inapplicable
`collapseDelay`/`startCollapsed`/`#collapsed`/dual-layer-grid surface is type-narrowed away (a discriminated
prop union or a build-time fail-loud), so the rail's vertical-always-expanded contract is the single
documented shape. HOIST the polished active-item-accent / tap-squish / tooltip-anchoring treatment proven in
`demo/layout/SidebarDock.vue` into the variant's CSS (the `dock-controls.css` carve home) so consumers get
the refined rail for free — not just the demo re-deriving a worse one. `navigation/rail.vue` then stops
re-deriving by hand and shows the canonical refined variant; the bespoke icon-button list is retired in
favour of the same recipe the chrome uses (demo == shipped contract). DISAMBIGUATE "Dock Rail" (`GlassDock
variant="rail"`) vs "Instrument Rail" (the separate `<InstrumentRail>` cockpit-ratio chassis column,
`manifest.ts:241`) in the IA — the two share the noun but are architecturally unrelated; the latter
DISSOLVES if W28/W29 retire instrument-chassis (so the disambiguation is a signpost now, a removal later).
Carry the **DDR-AS-RC-3 standalone-`DockIconButton` 44px coarse-pointer hit-target floor** (a real primitive
gap a speedtest consumer measured at 40×40 regardless of `.glass-dock` ancestry — constellation
`result[4].findings[7]`) into the `dock-controls.css` carve so the floor lands WITH the rail-polish hoist.

### SOTA deepening (liquid-glass research)

The iOS-26 Liquid-Glass corpus deepens the rail-polish hoist + the dock-as-portal-host contract W06
documents (facets 0, 2, 5, 18 — `docs/tranches/AX/research/liquidglass-synthesis.md`):

1. **The hoisted rail tap-squish IS Apple's `.glassEffect(.interactive())` gel-squish** (facets 0, 5, 18).
   The press register: a ~0.96 scale on the `scale:` LONGHAND (never `transform: scale()` — the longhand
   avoids minting a new stacking context mid-press), keyed off the dock spring with the specular
   brightening in LOCKSTEP. The hoisted treatment must use the W05-governed dock register
   (`--spring-dock` (0.32,0.7) ~+4.6%) so the press reads crisp, NOT wobbly — and CAP the squish LOW
   (`--scale-press` 0.96, ~4%; iOS Liquid Glass is RESTRAINED, iOS 26.2 dialed DOWN). If the hoist adds a
   velocity-driven squash, it is `scale: var(--squash) calc(1/var(--stretch))` (volume-preserving
   reciprocal, facet 18) capped at `maxStretch ~1.06-1.10` — but that is an AX.W42-facility door, NOT a
   W06 deliverable (W06 hoists the EXISTING refined treatment; it does not author new physics).

2. **The dock-as-portal-host contract is the no-glass-on-glass + navigation-layer rule** (facets 0, 1, 4,
   30). Apple's hard constraint — glass floats only in the navigation/overlay band, glass never nests in
   glass (stacked blur muddies, the rim doubles) — is the architectural why behind the
   `keepOpen`/`data-glass-dock-portal` teleport contract: a menu mounted in a dock must TELEPORT OUT to its
   own sampling region, not paint a second glass plate inside the dock's. The keyframes D9 mis-wire (a
   dropdown mounted OUTSIDE keepOpen+portal) is the canonical break — document it in the consolidated home
   as the navigation-layer/no-glass-on-glass discipline, not just a portal mechanic.

3. **The rest state must be GENUINELY static** (facets 0, 24, 28, 30). The corpus's over-animation rule
   (NN/g + Apple HIG): Liquid Glass elements stay "visually quiet" at rest and come to life ONLY on
   interaction/intent — never ambient idle motion (a low-amplitude breathing loop violates the rest-quiet
   contract + the reduced-motion floor). The consolidated dock home's audit must confirm the rail/dock is
   STILL at rest (no ambient pulse), bounce only on user-initiated expand/tap.

**(4) Split dock.css LAST (F4 / slice 25 / §4 note 19).** Carve `dock.css` (1227) into `src/styles/dock/`
sibling partials in the SAME `@layer components`, `@import`ed in cascade order after a `dock/shell.css`
core, continuing the proven AU.W8b.3 `dock-controls.css` carve pattern: `dock/shell.css` (the `.glass-dock`
root, morph-clip aperture, density tiers, shape/variant rules), `dock/layers.css` (the `.dock-layer` /
`.dock-layers` crossfade + hit-test + reveal-stagger contract), `dock/layer-group.css` (`.dock-layer-group`
/ rail / stack), `dock/overflow.css` (the W04-settled wrap recipe). DELETE every retired-arm tombstone
comment as the carve settles. This is **LAST in the dock band** — AFTER the W01 morph rewrite + the W04 wrap
rewrite land — so the partials carve the FINAL model, not mid-churn debris (the charter's prior "BEFORE the
churn settles" wording was BACKWARDS — a pre-churn split guarantees three-way merge conflicts across the
whole dock band; corrected per §4 note 19 + digest harden:dock-graphics). The split CLEARS the `dock.css`
arm of the W25a born-RED `.css`-aware god-module violation (the other three — tokens/utilities/glass —
clear in W25b).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `demo/stories/foundations/dock-active-tokens.vue` | **DELETE** outright (the renamed token-ladder debris, F0). |
| `demo/stories/compositions/dock-with-slider.vue` | **DELETE** — its keepDockOpen proof is folded into the `navigation/dock` "Slider in dock" section (F1). |
| `demo/stories/navigation/dock.vue` | ADD the "Slider in dock" section (the folded keepDockOpen proof) + the dock-as-portal-host consumer-contract note; receive the W04-authored `overflow="wrap"` section into the single home. |
| `demo/stories/navigation/rail.vue` | Retire the bespoke hand-rolled icon-button list; show the canonical refined `variant="rail"` recipe (demo == shipped). |
| `demo/stories/manifest.ts` | **DELETE** the `foundations/dock-active-tokens` row (`:86`) + the `compositions/dock-with-slider` row (`:237`); keep `navigation/dock`/`dock-layers`/`rail`; refine the `rail` description for the "Dock Rail" vs "Instrument Rail" disambiguation (`:164`). |
| `src/components/custom/dock/GlassDock.vue` | Type-narrow the rail surface: under `variant="rail"` the `collapseDelay`/`startCollapsed`/`#collapsed`/dual-layer-grid surface is inapplicable (discriminated prop typing or fail-loud); the JSDoc rail block (`:25-58`) rewritten to the single vertical-always-expanded contract. NO morph-driver edits (W01) / NO wrap-recipe edits (W04). |
| `src/styles/dock-controls.css` | HOIST the refined active-item-accent / tap-squish / tooltip-anchoring rail treatment from `SidebarDock.vue`; add the DDR-AS-RC-3 standalone-`DockIconButton` 44px coarse-pointer hit-target floor. |
| `src/styles/dock.css` | **CARVE** into `src/styles/dock/` partials (shell/layers/layer-group/overflow); strip retired-arm tombstone comments. The carved core (`dock/shell.css` or the trimmed `dock.css`) stays under 500. |
| `src/styles/dock/shell.css` | **NEW** — the `.glass-dock` root + morph-clip aperture + density tiers + shape/variant rules. |
| `src/styles/dock/layers.css` | **NEW** — the `.dock-layer` / `.dock-layers` crossfade + hit-test + reveal-stagger contract. |
| `src/styles/dock/layer-group.css` | **NEW** — `.dock-layer-group` / rail / stack. |
| `src/styles/dock/overflow.css` | **NEW** — the W04-settled wrap recipe (relocated, NOT re-authored). |
| `src/styles/index.css` | ADD the `@import` lines for the new `dock/*.css` partials in cascade order (after the `dock/shell.css` core, before `dock-controls.css`). |
| `scripts/proof-no-orphan-demo-route.mjs` | (no edit if it walks the manifest — a re-run confirm after the two rows drop; a comment tidy only if it carries a hardcoded dock route list). |
| `package.json` | ADD nothing new unless the storybook-IA re-baseline introduces a script entry (the gates already exist — W18 owns `proof:storybook-complete` registration; W06 re-baselines `proof:storybook-ia`). |
| `docs/tranches/AX/audit/W06-dock-storybook-honest-rail-css-split.json` | **NEW** — the wave's born-RED→GREEN audit artefact. |

**OUT of bounds:** the dock morph driver (`useLayerTransition`, the VT removal) — **W01**; the wrap recipe
AUTHORING (`flex-wrap` cap, `--shadow-dock-wrap`, `--dock-overflow-bp` deletion) — **W04** (W06 only
RELOCATES the settled wrap rules into `dock/overflow.css`, never re-authors them); `useDockHold` / Slider —
**W03**; the `--ease-apple-spring` excision + `--spring-*` tokens — **W05**; the `proof:no-god-module`
collector `.css`-extension + ci re-tag — **W25a** (W06 CONSUMES the extended collector, never edits it);
the tokens/utilities/glass carves — **W25b**; the storybook IA CATEGORY-TREE reinvention +
`EXPECTED_TREE` authorship + `proof:storybook-complete` registration — **W18** (W06 establishes the dock
HOME within the existing tree; W18 owns the ground-up tree). The six incidental-host stories.

---

## Disjointness (sibling waves it must NOT overlap)

The dock band (W01-W06) all mutate `dock.css` / `dock-controls.css` / `GlassDock.vue` — **they cannot run
concurrently** (digest line 353). W06 lands **LAST in the dock band** by construction. The dispatch contract:

- **vs W01 (single-scalar morph — `useLayerTransition` rewrite + dock.css morph rules + GlassDock.vue VT
  removal).** W06 **dependsOn W01** and runs AFTER it lands. W01 rewrites the morph driver + the `.glass-dock`
  morph-clip rules INSIDE `dock.css`; W06 then CARVES the SETTLED `dock.css` into partials. Carving before
  W01 would shelve a model W01 then rips out. Sequential — W06 carves the final model. Both edit
  `GlassDock.vue`: W01 the morph/VT script region, W06 the rail-prop-typing + JSDoc region (different
  regions; W06 rebases onto W01's settled SFC).
- **vs W04 (dock overflow/wrap — `dock.css` wrap recipe + tokens.css + GlassDock.vue wrap guard +
  `navigation/dock.vue` wrap section).** W06 **dependsOn W04** and lands AFTER it. W04 AUTHORS the
  content-driven wrap recipe in `dock.css` + ADDS the `overflow="wrap"` section to `navigation/dock.vue`;
  W06 RELOCATES that settled wrap recipe into `dock/overflow.css` and RE-HOMES the wrap section into the
  consolidated dock home. No story-file collision (W04 appends a section, W06 relocates/keeps the file). No
  wrap-recipe collision (W04 authors, W06 only moves the settled rules verbatim — never re-derives them).
- **vs W03 (keepDockOpen — `Slider.vue` + `dock/composables/useDockHold.ts`).** Disjoint by file: W03 never
  touches the storybook/CSS-split surface. Both reference `compositions/dock-with-slider` conceptually — W03
  FIXES the keepDockOpen contract (the host-native hold), W06 RE-HOMES its PROOF into the `navigation/dock`
  "Slider in dock" section. W06 folds the proof only AFTER W03's fix lands so the folded section demos the
  WORKING contract, not the broken one. No source-file collision.
- **vs W05 (spring vocabulary — tokens.css/theme.css + 4-5 SFC consumers).** Disjoint by file: W05 never
  touches `dock.css`/the storybook. The rail-polish hoist (W06) consumes the W05-governed dock register; W06
  rebases onto W05's settled `--spring-*`.
- **vs W18 (storybook IA ground-up reinvention + gate re-baseline).** W18 **dependsOn W06**. W06 establishes
  the dock HOME (the F1 consolidation + the F0 debris deletion) within the existing tree; W18 then authors
  the ground-up category tree ON it and re-baselines `EXPECTED_TREE` LAST (slice 15 F3 names the W06
  dock-active-tokens deletion as "the real residual" the IA wave verifies, not re-opens). W06 does NOT touch
  `proof-storybook-ia.mjs`'s `EXPECTED_TREE` fixture authorship (W18 owns it) — W06 re-baselines ONLY the dock
  rows its consolidation moves, coordinated with W18 (slice 15 F1: "the dock category — coordinate with W06").
- **vs W25a (the `.css`-aware god-module gate-extension).** W25a EXTENDS `proof-no-god-module.mjs` to scan
  `.css` + re-tags it ci (born-RED on tokens/dock/utilities/glass). W06 CONSUMES the extended collector to
  prove the `dock.css` carve clears the dock arm; W06 never edits the gate script (W25a owns it). The dock
  arm of the W25a born-RED is the ONLY arm W06 clears (tokens/utilities/glass clear in W25b). Sequence: W25a
  (gate-extension, born-RED) → W06 (clears the dock arm) — but W25a's own dependsOn is W27a (the tag-model);
  if W25a has not landed when W06 runs, W06's `.css`-aware god-module assertion runs against a LOCAL
  collector-extension probe and the CI re-tag is W25a's to claim.
- **vs W40 (demo-shell dock-nav rebuild).** W40 **dependsOn W06 + W18**. W40 rebuilds the demo NAV SHELL
  (`SidebarDock`/`BottomDock`) ON the AX-rebuilt dock + the W06-hoisted rail polish; W06 authors the
  rail-polish HOIST (the CSS), W40 consumes it in the shell rebuild. W06 does NOT rebuild the nav shell.
- **vs W34 (cross-repo consumer adoption).** W06 authors the bbnf-buddy ToolsLayer re-adoption NOTE (the
  vertical tool-rack re-derives the rail polish by hand — `result[17].foldIntoWaves[2]`); the actual
  sibling-repo edits execute in W34. W06 writes NO sibling source.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — one storybook+rail-typing arm, one CSS-split arm; the two are file-disjoint so
  they parallelize).** Arm A (storybook + rail): DELETE the token-ladder + dock-with-slider stories + their
  manifest rows; fold the keepDockOpen proof into `navigation/dock`'s "Slider in dock" section + the portal
  consumer-contract note; type-narrow the rail surface in `GlassDock.vue`; rewrite `navigation/rail.vue` onto
  the canonical recipe. Arm B (CSS): hoist the refined rail treatment + the 44px floor into
  `dock-controls.css`; carve `dock.css` into the four `dock/*.css` partials + wire the `index.css`
  `@import`s; strip tombstone comments. Lint + typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the patched tree:
  asserts `dock-active-tokens.vue` is GONE + 0 manifest refs; asserts the keepDockOpen proof lives ONLY in
  `navigation/dock` (no `compositions/dock-with-slider`); type-checks a `<GlassDock variant="rail"
  :collapse-delay>` and confirms it now FAILS to compile (the inapplicable prop is narrowed away);
  screenshot-A/Bs the `navigation/rail` story against `SidebarDock` to confirm the hoisted polish is
  identical (demo == shipped); measures the standalone `DockIconButton` hit target ≥ 44×44 on a coarse
  pointer; runs the `.css`-aware `proof:no-god-module` and confirms every `dock/*.css` partial < 500 +
  `dock.css` core < 500; A/B regression screenshot-diffs the WHOLE dock (the carve is isomorphic — same
  `@layer`, same cascade → ZERO visual delta). ADVERSARIAL twist: tries to make the storybook-IA gate pass
  with the debris file merely renamed again (confirms a rename does NOT clear the gate — only deletion does).
- **Gate-author (≤1 agent — re-baseline, not net-new).** Re-baselines `proof:storybook-ia` for the dock home
  (coordinated with W18, who owns the full tree re-baseline); confirms `proof:no-orphan-demo-route` GREEN
  after the two rows drop; confirms the `.css`-aware `proof:no-god-module` (W25a-extended) reports the
  `dock.css` arm GREEN. Confirms each assertion FAILS at `eaba94f` (the debris-present / un-carved tree) and
  PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement
+ 1 verify + 1 gate.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**
The wave-agnostic authorization grant lives ONCE in AX.md §6.1 (the master template — devise an in-FileBounds idiomatic gestalt fix; spawn a tangent triumvirate to work AROUND, never stall; escalate ONLY when genuinely user-gated) with the 4-class halt-vs-work-around decision tree in AX.md §6.2 — by reference, not restated here. This wave's §3a triumvirate AUTO-TRIGGERS (Class-2 → research→plan-augment(Exact-Wave-Amendment-Text)→redress, caps 20/15/30):
- **Out-of-FileBounds reveal** — the `dock.css` carve or the `dock-controls.css` rail-polish hoist needs an edit to the W01 morph-driver region, the W04 wrap recipe, `useDockHold`/Slider (W03), the `--spring-*`/`--ease-apple-spring` cohort (W05), the `proof:no-god-module` collector script (W25a-owned), or the storybook IA category-tree / `EXPECTED_TREE` authorship (W18-owned) — NEVER absorbed in-line; HALT and triumvirate.
- **`proof:no-god-module` (.css-aware) fails non-locally** — a carved `dock/*.css` partial or the trimmed `dock.css` core cannot clear < 500 without a cohesion-violating split (or the W25a `.css`-extension has not landed and the local collector-probe disagrees) → triumvirate, never a contrived sub-file split.
- **`proof:storybook-ia` re-baseline collides with W18** — the dock-home re-baseline cannot be reconciled with W18's tree authorship without editing rows W18/W19/W20/W29 own → triumvirate (coordinate, do not unilaterally re-author).
- **The 3rd diagnostic-loop iteration** on the rail type-narrow proof (the `<GlassDock variant="rail" :collapse-delay>` discriminated-union refusal) OR the USF-2 `--dock-control-glyph-size` optical-parity (the DarkModeToggle `h-full w-full` self-sizing vs the slot convention) — HALT and triumvirate rather than re-spin.
- **A §5.3 ratify reached un-ratified** (Class-3) — the "Dock Rail" vs "Instrument Rail" disambiguation hinges on a W28/W29 instrument-chassis retirement decision not yet taken → surface to the orchestrator, never self-ratify.

---

## Consumer hand-off sub-finding (§20 — USF-2, the dock-control optical-size contract)

NEW (not in the original audit). USF reports DarkModeToggle renders **~2.5× the nav icons** in
`GlassDock variant="rail"` — the glyph fills the button edge-to-edge. Root cause is a glyph-sizing
asymmetry between the two dock icon-button families:

1. `DockIconButton` glyphs are CONSUMER SLOTS (`h-4 w-4` ≈ 40% of the 2.5rem box) — the slot convention;
2. `DarkModeToggle` renders its OWN internal SVG `h-full w-full` (custom/dark/DarkModeToggle.vue) —
   bypassing the slot convention;
3. in-dock, `dock-controls.css:194-201` sets `--dark-mode-toggle-padding: var(--dock-icon-padding, 0)`
   but **`--dock-icon-padding` is NEVER DEFINED** → the fallback `0` wins → zero padding → the
   `h-full w-full` SVG fills the box. (Standalone `md` correctly resolves `0.375rem`, so the defect is
   dock-specific.)

**First-principles fix (this wave owns it — W06 already touches dock-controls.css + flags a
dock-control-primitive gap, and lands LAST in the dock band):** the two icon-button families must share
ONE optical-size contract WHEN DOCKED. Route the toggle's internal glyph through a
`--dock-control-glyph-size` token (default `--icon-md`), scoped to the in-dock path ONLY — `h-full
w-full` stays correct for the standalone DarkModeToggle sizes. No per-component magic padding; one token
the whole dock-control family reads. **Cross-repo consume gate:** USF's dock-control optical-parity
visual gate (born-RED until the published bump). This sharpens W06's "honest rail" scope — the rail's
control glyphs must be optically uniform with its nav glyphs, machine-checked by the parity gate, not
eyeballed.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. `proof:storybook-ia` (re-baselined for the dock home, coordinated with W18): asserts the dock-PRIMARY
   content is consolidated under `navigation/dock` and the `foundations/dock-active-tokens` +
   `compositions/dock-with-slider` rows are ABSENT. **Born-RED at HEAD** (the two rows are present); GREEN
   after the deletions + re-baseline. This is a manifest/tree-structure gate (a precept-valid structural
   artefact form, not a grep-for-runtime-behaviour).
2. `proof:no-orphan-demo-route`: asserts every manifest route resolves to an existing SFC + no dangling route
   after the two deletions. Confirms no dead `dock-active-tokens` / `dock-with-slider` route survives.
3. `proof:no-god-module` (**`.css`-aware, ci-tagged — the W25a-extended collector**): asserts every
   `src/styles/dock/*.css` partial AND the carved `dock.css` core are **< 500 lines**. **Born-RED** the
   instant the W25a collector accepts `.css` (`dock.css` reports 1227 > 500); GREEN after the carve. This is
   a structural line-count artefact (the precept-valid form).
4. A **deletion-PROOF** (valid artefact form, NOT a runtime-grep): `test -f
   demo/stories/foundations/dock-active-tokens.vue` → absent; `grep -c "dock-active-tokens\|dock-with-slider"
   demo/stories/manifest.ts` → 0.
5. A **type-narrow PROOF**: a `tsc`/`vue-tsc` consumer-probe that `<GlassDock variant="rail"
   :collapse-delay="2000" start-collapsed>` FAILS to type-check (the inapplicable surface is narrowed away)
   — born-RED today (it compiles), GREEN after.

These are structural / build-time / deletion artefacts (the precept-valid forms per SPEC.md §Hard Gates) —
NOT grep-for-source-string-as-runtime-behaviour gates.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the consolidated dock story + the refined rail, in **light AND dark** at **≥ 3
viewports** (375×667 / 1280×800 / 1440×900):
- **Consolidated dock home:** every dock-primary section (the recipes, the "Slider in dock" keepDockOpen
  proof, dock-layers, the `overflow="wrap"` section relocated from W04) reads as ONE coherent dock home with
  no dangling routes; the keepDockOpen halo + substrate tier-shade paint through a real drag (the folded
  proof demos the WORKING W03 contract).
- **Refined rail == shipped:** the `navigation/rail` story is PIXEL-identical to the `SidebarDock` chrome the
  variant CSS now drives (active-item accent, tap-squish press-spring, tooltip anchoring) — the demo no
  longer re-derives a worse rail; affordance/hierarchy/spacing/padding hold.
- **Coarse-pointer floor:** a standalone `DockIconButton` (NO `.glass-dock` ancestry) presents a ≥ 44×44 hit
  target on a coarse pointer.
- **Carve isomorphism:** the WHOLE dock renders pixel-identical before/after the `dock.css`→partials carve
  (same `@layer`, same cascade order → ZERO visual delta) — confirmed by an A/B screenshot-diff.
- **No visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `eaba94f`
   live (the debris file exists + its manifest row; the dock-primary scatter across three categories; the
   rail compiles with inapplicable props + the demo re-derives a worse rail; `dock.css` at 1227). Record them
   in `audit/W06-…json` as the born-RED baseline. Do NOT proceed on the audit's word — re-prove.
2. **DELETE the token-ladder debris (F0).** Remove `demo/stories/foundations/dock-active-tokens.vue` + its
   `manifest.ts:86` row. Lint + typecheck.
3. **Consolidate the dock home (F1).** Fold the keepDockOpen proof from `compositions/dock-with-slider.vue`
   into a "Slider in dock" section of `navigation/dock.vue` + the dock-as-portal-host consumer-contract note;
   DELETE `dock-with-slider.vue` + its `:237` row. Decide (by length) whether `dock-layers`/`rail` stay
   sibling routes or fold into `navigation/dock` sections (RATIFY-BEFORE-IMPL). Lint + typecheck.
4. **Type-narrow the rail + hoist the polish (F2).** `GlassDock.vue`: narrow away
   `collapseDelay`/`startCollapsed`/`#collapsed` under `variant="rail"`; rewrite the rail JSDoc to the single
   vertical-always-expanded contract. `dock-controls.css`: hoist the refined active-item/tap-squish/tooltip
   treatment from `SidebarDock.vue` + the DDR-AS-RC-3 44px floor. Rewrite `navigation/rail.vue` onto the
   canonical recipe; disambiguate "Dock Rail" vs "Instrument Rail" in the manifest description (F3). Lint +
   typecheck.
5. **Split dock.css LAST (F4).** Carve `dock.css` (1227) into `src/styles/dock/{shell,layers,layer-group,
   overflow}.css` in the same `@layer components`; relocate the W04-settled wrap recipe verbatim into
   `dock/overflow.css`; wire the `index.css` `@import`s in cascade order; strip retired-arm tombstone
   comments. Confirm each partial + the carved core < 500. Lint + typecheck.
6. **Gates GREEN.** Re-baseline `proof:storybook-ia` for the dock home (with W18); confirm
   `proof:no-orphan-demo-route` + the `.css`-aware `proof:no-god-module` (dock arm) GREEN; run the
   type-narrow + deletion proofs; run the VISUAL-TRUTH live audit; capture the paired-π BEFORE/AFTER + DELTA
   (including the carve-isomorphism A/B); write `audit/W06-…json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W06-dock-storybook-honest-rail-css-split.json` — the born-RED→GREEN ledger: the
  four RED witnesses (the debris file + manifest row; the three-category scatter; the rail-compiles +
  worse-demo-rail; `dock.css` 1227), the per-finding (F0-F4) disposition, the post-wave GREEN measurements
  (debris gone, one home, rail type-narrowed + hoisted, every `dock/*.css` < 500).
- The four `src/styles/dock/*.css` partials + the carved `dock.css` core (the no-god-module evidence).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the consolidated-dock-home navigation
  before/after, the `navigation/rail` vs `SidebarDock` A/B (worse-hand-rolled → canonical-refined), the
  standalone-`DockIconButton` 44px floor measurement, and the **carve-isomorphism A/B screenshot-diff** (the
  whole dock pixel-identical pre/post split), at ≥ 3 viewports × light/dark.
- A consumer-NOTE annex (folded into the W34 coordination ledger, NOT executed here): the bbnf-buddy
  ToolsLayer vertical-tool-rack rail re-derivation (re-adopt the hoisted polish + the vertical
  max-height/overflow contract).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(dock): W06 born-RED baseline — token-ladder debris + three-category scatter + rail-compiles + dock.css 1227 (AX.W06)`
2. `chore(demo): DELETE dock-active-tokens story + manifest row — excise the renamed token-ladder debris (AX.W06 F0)`
3. `refactor(demo): consolidate the dock home — fold keepDockOpen into navigation/dock "Slider in dock", retire compositions/dock-with-slider (AX.W06 F1)`
4. `feat(dock): honest rail variant — type-narrow the inapplicable collapse surface + hoist the refined active-rail polish + the 44px coarse floor (AX.W06 F2+F3)`
5. `refactor(dock): split dock.css into src/styles/dock/ cohesive partials — shell/layers/layer-group/overflow, strip tombstones (AX.W06 F4)`
6. `chore(AX.W06): audit ledger GREEN + storybook-ia re-baseline + carve-isomorphism paired-π capture`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W01 (single-scalar morph) — HARD.** The `dock.css`→partials carve must shelve the FINAL morph model.
  W01 rewrites the `.glass-dock` morph-clip rules + retires the VT fork INSIDE `dock.css`; carving before W01
  settles would partition a model W01 then rips out, guaranteeing a three-way merge across the carve.
  (Charter §3 dependsOn AX.W01; §4 note 19 — the W06 dock.css-split is re-ordered AFTER the morph rewrite.)
- **AX.W04 (dock overflow/wrap) — HARD.** The `dock/overflow.css` partial relocates the W04-AUTHORED wrap
  recipe; carving before W04 settles would shelve a wrap model W04 then re-derives. W06 also re-homes the
  W04-authored `overflow="wrap"` story section into the consolidated dock home. (Charter §3 dependsOn AX.W04;
  the corrected "LAST in the dock band" ordering.)
- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  carve-isomorphism A/B + the rail-polish A/B + the binding live-audit close criterion. W06 cannot close on
  the structural gates alone; W00 stands up the lane it closes on.
- **AX.W25a (the `.css`-aware god-module gate-extension) — soft/coordination.** W06's `dock.css`-arm
  god-module clearance is proven against the W25a-extended `.css`-aware collector; W06 clears the dock arm of
  the W25a born-RED (tokens/utilities/glass clear in W25b). If W25a has not landed when W06 runs, the carve
  is proven against a local `.css` line-count probe and W25a claims the CI re-tag.
- **Downstream:** **AX.W18** dependsOn W06 (the IA ground-up tree reinvention builds ON the W06 dock home +
  verifies the dock-active-tokens deletion as "the real residual," slice 15 F3). **AX.W40** dependsOn W06
  (the demo-shell dock-nav rebuild consumes the W06-hoisted rail polish). **AX.W34** receives the bbnf-buddy
  ToolsLayer rail re-adoption NOTE.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`0b27f01`** (the AV.W13 storybook restructure) — the debris ORIGIN. `git show 0b27f01 --stat` shows the
  pure rename `{…dock/icon-button-token-ladder.vue => foundations/dock-active-tokens.vue} | 0` (the `| 0` =
  ZERO content delta). The restructure preserved every demo route as a "BOOKed, NOT cut" orphan — the wrong
  disposition for an item the user flagged "wtf / remove." The deeper root cause: a 5-rung internal-token
  tour (`boomed`/`shadowed`, the `--dock-active-*` cohort) is library-internals documentation, not a
  user-facing component story (§4 note 3, charter lines 2004-2007 — "Anyone trusting 'the AV restructure
  handled it' ships the debris").
- **`441b9fb`** — `git show 441b9fb:demo/stories/dock/icon-button-token-ladder.vue` is the original,
  byte-for-byte identical to the HEAD `dock-active-tokens.vue` (the rename-not-cut evidence).
- **The J.W5.C FINAL closeout** — `compositions/dock-with-slider.vue:1-25` carries the header "J FINAL
  named-residual closeout"; it was filed in `compositions/` by LINEAGE (it predates the dock-story
  consolidation), not by SUBJECT — it is single-contract dock-PRIMARY content (keepDockOpen), not a
  multi-component composition.
- **The AU.W8b.3 `dock-controls.css` carve** — the PROVEN house pattern the `dock.css`→partials split
  continues (a sibling `.css` in the same `@layer components`, `@import`ed in cascade order). `dock-controls.css`
  is already 486 lines carved out of the original; `dock.css` is the 1227-line SHELL remainder (slice 25).
- **The AK-W2-α InstrumentRail work** — the independent lineage that minted `<InstrumentRail>` (the
  cockpit-ratio 1/φ² chassis column), converging on the "Rail" noun with the dock-rail variant without an IA
  disambiguation pass (F3); it DISSOLVES if W28/W29 retire instrument-chassis.
- **The keyframes D9 mis-wire** (constellation `result[0].findings[6]`) — the canonical dock-portal-host
  break: a menu dropped OUT of glass-ui's dock `keepOpen` + `data-glass-dock-portal` teleport contract on
  migration; the consumer-contract W06 documents in the dock home.
- **§4 note 23 (the dock-spring ORACLE).** keyframes.js's published `(0.32,0.7)` `--spring-dock` curve
  (sampled peak ~+4.6%) is the system-dock baseline the hoisted rail tap-squish/press-spring rides via the
  W05-governed dock register — it does not re-bounce.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; `dock-active-tokens.vue` (7134
  bytes) ships, `dock.css` = 1227, the rail compiles with inapplicable props live here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-A binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **no-god-modules + splits-use-directory-modules.** `dock.css` (1227) exceeds the 500-line bound and was
  structurally invisible to the `.ts`/`.vue`-only collector — the headless-green pattern on a structural
  gate. The wave CARVES it into `src/styles/dock/` cohesive directory-module partials (shell/layers/
  layer-group/overflow), each under the bound, in the SAME `@layer components` — the PROVEN `dock-controls.css`
  pattern, NOT a contrived length-only split (each partial is a single cohesion axis). MUST NOT introduce a
  fifth orphan partial with no cohesion rationale (contrivance the §0 mandate forbids).
- **abrogate-before-patch / one-path / no-legacy-code.** The token-ladder debris is EXCISED outright (no
  third rename, no rehome) — a rename-not-cut is the anti-pattern this wave abrogates. The rail's
  half-inapplicable prop surface is type-NARROWED (the inapplicable collapse/startCollapsed/#collapsed path
  is removed, not bridged) — ONE honest rail contract, no parallel dead-prop surface. The demo stops
  re-deriving a worse rail by hand (demo == shipped, one source of the refined treatment).
- **substrate-with-consumer / wire-before-retire.** The refined rail treatment is HOISTED into the shipped
  variant CSS (the `dock-controls.css` carve) so consumers get it — not stranded in `SidebarDock.vue` demo
  chrome. The DDR-AS-RC-3 44px floor lands WITH the hoist (a real primitive gap a speedtest consumer
  measured). The dock-as-portal-host consumer contract is DOCUMENTED in the home (the keyframes D9 break is
  the named witness). MUST NOT hoist a treatment with no consumer — the rail HAS the live `SidebarDock`
  consumer + the bbnf-buddy ToolsLayer re-adoption target.
- **no-overfitting.** DELETE the internal-token-tour story (a 5-rung swatch tour teaches consumers nothing
  they'd reach for). Do NOT touch the six incidental-host stories or the live `TokenLadder.vue`/`ToneSwatch.vue`
  chassis primitives (moving them would be the contrivance the mandate forbids — the false-positive class).
- **documentation-is-part-of-the-change.** `proof:storybook-ia` is RE-BASELINED for the dock home (the
  manifest IS the documentation); the "Dock Rail" vs "Instrument Rail" disambiguation is a signpost in the
  story descriptions; the dock-as-portal-host contract is documented in the home. The IA gate re-baseline is
  coordinated with W18 (which owns the ground-up tree) — W06 re-baselines ONLY the dock rows it moves.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates).** The gates are
  structural/build-time/deletion artefacts (the manifest-tree, the `.css` line-count, the type-narrow probe,
  the deletion proof) — the precept-valid forms, NOT grep-for-runtime-behaviour. The wave's close is the
  executed live Playwright + frontend-design audit (the consolidated home + the refined rail + the
  carve-isomorphism A/B), never a headless proof alone — the cardinal AX precept.
- **no-silent-deferrals.** The bbnf-buddy ToolsLayer re-adoption is NOT silently dropped — it is routed to
  W34 with a named annex (the cross-repo edits execute there; this wave authors the note). The
  Instrument-Rail dissolution is NOT pre-emptively done here — it is signposted now and routed to W28/W29
  (the instrument-chassis retire owns it), an explicit hand-off, not a deferral.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **`dock-layers` / `rail` — sibling routes vs folded sections.** The audit (F1) leaves this "decide at wave
   time by length." RATIFY-BEFORE-IMPL: keep `navigation/dock-layers` + `navigation/rail` as SIBLING routes
   if the consolidated `navigation/dock` page would become unreadably long; fold them into sections only if
   the page stays scannable. **Recommendation:** keep them sibling navigation/ routes (they are distinct
   enough — dock-layers exercises the DockLayerGroup crossfade, rail exercises the variant) — the
   consolidation target is the SCATTER (token-ladder out of foundations/, dock-with-slider out of
   compositions/), not a single-page merge of every dock route.
2. **Rail type-narrow mechanism — discriminated union vs fail-loud.** The honest-rail surface (F2) can be
   scoped by a discriminated prop union (`variant="rail"` makes `collapseDelay`/`startCollapsed`/`#collapsed`
   a compile error) OR a runtime fail-loud (a dev-mode throw when the inapplicable prop is set under rail).
   **Recommendation:** the discriminated prop union (a compile-time narrow is the one-path precept-valid form
   — it removes the dead surface from the type, not just the runtime) — RATIFY the union shape so the rail
   variant's prop contract is the single documented shape. The fail-loud is a fallback only if Vue's
   `defineProps` discrimination cannot express the narrow cleanly.
3. **"Instrument Rail" disambiguation — signpost now vs dissolve now.** The "Dock Rail" vs "Instrument Rail"
   noun collision (F3) dissolves if W28/W29 retire instrument-chassis. **Recommendation:** SIGNPOST now (a
   manifest-description disambiguation: "Dock Rail" = `GlassDock variant="rail"` vs "Instrument Rail" = the
   `<InstrumentRail>` cockpit chassis column) and route the DISSOLUTION to W28/W29 — do NOT pre-emptively
   remove the Instrument Rail story here (W28/W29 own the instrument-chassis retire; a premature removal here
   would be a cross-wave overreach).
4. **The carved `dock.css` core — keep a thin shell file or fully dissolve into partials.** The carve can
   leave a thin `dock.css` core (the `@layer` declaration + cross-partial comments + `@import`s) OR dissolve
   entirely into `dock/*.css` with the `@import`s in `index.css`. **Recommendation:** dissolve `dock.css`
   into `dock/shell.css` (+ the three siblings) and `@import` all four from `index.css` in cascade order — a
   leftover thin `dock.css` shell is itself a small orphan; the `dock-controls.css` pattern `@import`s the
   sibling directly. RATIFY the `@import` ordering (shell → layers → layer-group → overflow → dock-controls)
   so the cascade is preserved bit-for-bit (the carve-isomorphism A/B is the gate on this).
