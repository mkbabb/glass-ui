# AX.W25b — CSS monolith carves: tokens §-seams, utilities relocation, dead-chain excise

**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W25a, AX.W06, AX.W09, AX.W22,
AX.W29 *(the utilities portion ONLY — the §7/§8 metric-ownership decision; the tokens carve is
unblocked and gated solely on W25a)* · **Charter** AX.md §3 (the `### AX.W25b` block, lines
1320-1348) + the §1 summary row (line 134) + the §2 band-J membership (lines 188-189) + the §2b
band-J precept row (line 222) + §4 note 19 (the W25a/b born-RED staging + the glass.css-not-carved
adjudication, lines 2141-2151) · **Audit** `deep-audit-corpus.json` slice 25 `god-modules`
(F1 = tokens.css 1728 §-seam carve; F3 = utilities.css 1119 relocate-not-split) + slice 27
`tailwind-styling` (F0 = the four-file ceiling break + the carve patterns; F1 = the metric-badge /
input-bar component-CSS-in-utilities relocation; F2 = the floating-panel dead-chain excise; F5 =
the `glass-specular-track.css` naming drift) + `converge-digest.md` `hist:fourier-analysis`
(the `.instrument-rail` twin-line groove source moves in this carve — sequence the W21 A-1 capture
before W29 prunes it).

---

## State (born-RED witness — the carves clear the W25a-flagged violations the .css-aware gate reports)

W25b is the CLEARING wave for the born-RED CSS violations W25a stages. Its State is **inherited
born-RED**: the instant W25a (the predecessor) extends `proof:no-god-module`'s collector to accept
`.css` and re-tags it `["local","ci"]`, the gate reports FOUR CSS god-modules over the
`HARD_LIMIT = 500` ceiling that ship structurally invisible at HEAD — and W25b carves three of them
to GREEN (the fourth, `dock.css`, is W06's). The witnesses were re-measured LIVE per the §0 cardinal
"re-verify before acting"; charter audit baseline is `eaba94f`, working tree `at-dock-convergence`.

- **RED witness 1 (three CSS god-modules over the 500-line ceiling that W25b carves —
  file-extension-reach + line-count, structurally falsifiable).** A live `wc -l src/styles/*.css`
  at HEAD finds: `tokens.css` **1728**, `utilities.css` **1119**, `glass.css` **691** — all over
  `HARD_LIMIT = 500` (`proof-no-god-module.mjs:20`). (The fourth, `dock.css` **1227**, is carved by
  W06; `glass.css` **691** is the NOT-carved-for-length adjudication — see RED witness 3.) Until
  W25a's collector accepts `.css` these are invisible to the gate (the predicate at
  `proof-no-god-module.mjs:47` accepts `.ts`/`.vue` ONLY; AV.W13's "largest now 475" was true for
  TS/Vue alone — slice 25 F0). *The falsifiable RED: after W25a's `.css` extension the gate exits 1
  listing tokens/utilities (+ dock from W06, + glass per witness 3); after W25b carves `tokens.css`
  into `src/styles/tokens/` §-seam partials + relocates `utilities.css`'s component-coupled recipes,
  the gate no longer lists tokens.css or utilities.css. GREEN is reached when EVERY carved partial
  is ≤ 500 AND the barrel re-import preserves the cascade.*

- **RED witness 2 (a dead `floating-panel` chain ships in `/styles` with ZERO consumers —
  a deletion-proof / substrate-without-consumer falsifiable).** `grep -rln 'floating-panel' src/
  demo/` at HEAD returns ONLY `src/styles/{floating-panel,animations,theme,index}.css` — NO SFC, NO
  demo binds `.floating-panel`/`.floating-panel-item` (slice 27 F2). The full dead chain ships: the
  class block (`floating-panel.css:4-19`), its `floating-panel-in` keyframe (`animations.css:4`),
  and the `--animate-floating-panel-in` theme bridge (`theme.css:390`). The SAME file ALSO carries a
  LIVE `.dropdown-menu-content`/`.dropdown-sub-content` font knob (`:31-34`, real consumers) parked
  there at Q.W3 — a defunct orphan rides alongside an unrelated live rule under a misleading
  filename. *The falsifiable RED: `grep` proves zero `.floating-panel` consumers at HEAD; a
  no-orphan-css gate (or the close deletion-proof) FAILS while the chain ships. After: the chain is
  excised (class + keyframe + theme bridge), the live dropdown knob relocates to a `dropdown-menu.css`
  colocated with the family, `floating-panel.css` + its `index.css` import line are gone, and the
  grep returns nothing.*

- **RED witness 3 (the `glass.css` 691-line over-ceiling is an INHERITED born-RED that W25b does NOT
  clear by carving — it is the cohesion-not-length adjudication, §4 note 19).** `glass.css` (691) is
  over the gate's mechanical line-count ceiling, so the W25a `.css`-aware collector reports it RED
  uniformly (the collector does NOT special-case it — that would re-mint the structural blindness
  W25a fixes). BUT the audit is emphatic `glass.css` has a SINGLE cohesion axis (slice 27 / §4 note
  19): a forced split is contrivance, violating §0 no-contrivance. *The falsifiable position W25b
  must record: `glass.css` is NOT carved for length. A minimal `glass/material.css` (~175 lines)
  split lands ONLY if the gate's mechanical ceiling forces it AND that split is the SOLE acceptable
  glass split, documented as such. The gate-ceiling rationale for single-axis files is
  cohesion-not-length — this is a W25b ADJUDICATION (recorded in the audit json), not a W25a
  gate-logic exception.*

- **RED witness 4 (stale `glass-specular-track.css` filename + four cross-file doc pointers drift —
  a naming-drift / rename falsifiable).** The W22/W23 glass-material fold (commit `8554e33`) moved
  the moving-specular body INTO `glass.css` but left `glass-specular-track.css` NAMED for it
  (`:4-8` now holds only a11y brackets + the refract garnish), with stale pointers at `tokens.css:1707`,
  `index.css` rung-4a (`:54-60`), and the `glass-refract.css` header — all calling
  `.glass-specular-track` the live moving-specular home when it is now a thin alias (slice 27 F5).
  *The falsifiable RED: the file is named for a body it no longer holds, and the cross-file pointers
  contradict the code. After: `glass-specular-track.css` → `glass-material.css` (or its a11y
  brackets fold into `glass.css` + the refract gate into `glass-refract.css`, retiring the file
  clean — clean break, no public alias per no-backwards-compat), and the three stale pointers
  re-point to `glass.css`/`.glass-material`.*

This wave has a VISUAL surface in the WEAK sense ONLY: the carves are STRICTLY isomorphic (same
`@layer`, same cascade order, same selectors, same values) — the close criterion is therefore a
**zero-pixel-delta** screenshot diff (the carve must not change a single painted pixel), NOT a
re-design. The dead-chain excise + rename are deletions/renames with no live consumer, so they too
must paint identically. The VISUAL-TRUTH gate below is the isomorphism proof, the inverse of a
re-design wave (where the live audit confirms a CHANGE; here it confirms NO change).

---

## Goal

`proof:no-god-module` (.css-aware, ci-tagged, W25a) goes GREEN on `tokens.css` (carved into
`src/styles/tokens/` §-seam partials behind a thin barrel) and `utilities.css` (component-coupled
recipes RELOCATED to their owning component's CSS, shared atoms carved into cohesive partials); the
dead `floating-panel` chain is fully excised (class + keyframe + theme bridge, no alias); the
`glass-specular-track.css` filename + its four stale cross-file pointers are renamed/re-pointed to
`glass-material.css`/`glass.css`; `glass.css` is documented NOT-carved-for-length (cohesion axis,
§4 note 19) — and EVERY carve is proven isomorphic by a zero-pixel-delta before/after live audit.
(`dock.css` is W06's; the specular intensity VALUES are W09's.)

---

## Scope (the gestalt carve — no workaround, no legacy alias, no dead-orphan retained)

Carve the CSS monoliths using the PROVEN house pattern (the `dock-controls.css` carve, AU.W8b.3 — a
sibling `.css` in the SAME `@layer`, `@import`ed in cascade order; `proof-dock-controls-split.mjs`
locks it) and the directory-module precept (`src/styles/tokens/` plus a barrel, not flat siblings).
Four root causes, ONE wave, all isomorphic (same `@layer`, same cascade, zero `/styles` surface
delta — `index.css` still `@import`s ONE `./tokens.css`).

**(1) Carve `tokens.css` (1728) along its §-numbered seams into `src/styles/tokens/` partials
(slice 25 F1 + slice 27 F0).** The §N banners ALREADY encode the cohesion seams (the file header
`:7-10` itself draws the structural-vs-visual line); they were never physically separated because
the CSS-blind gate gave no split pressure. Carve into ~4-5 cohesive partials `@import`ed in
declared cascade order by a THIN `tokens.css` barrel (the `src/styles/index.css` cascade contract is
preserved — `index.css` still `@import`s one `./tokens.css`):

- `tokens/structural.css` — the STABLE axes: §-1/§0 color-scheme, §1 duration, §2 easing/springs,
  §3 z-index, §11 interactive-scales + focus, §20 platform-motion.
- `tokens/color.css` — §5 palette, §6 section-jewel, §13 gold, §14 rainbow + the `.dark`
  re-resolution block (`:1483-1640`) + the light-dark `@supports` block.
- `tokens/surface.css` — §7 shadows (incl. the `--shadow-cartoon-*` chain — the cartoon-shadow
  identity contract per CLAUDE.md MUST ride the cascade intact), §8 glass 5-tier, §12 paper, §4
  radius bridge.
- `tokens/component.css` — §16 timeline, §17 metric, §19 table-density, §9 offsets, §10 sizing.
- `tokens/houdini.css` — the six `@property` registrations (`:1668-1724`). These are top-level
  (NOT inside `:root`) — a natural standalone that does NOT belong inside the visual-token cascade.

The barrel is a directory module (`tokens/` + a `tokens.css` that `@import`s the children, per the
splits-use-directory-modules precept), NOT flat `tokens_color.css` siblings.

**(2) RELOCATE `utilities.css` (1119) component-coupled recipes to their owning component's CSS;
carve the shared atoms (slice 25 F3 + slice 27 F1).** This is a RELOCATION, not merely a split —
`utilities.css` became the default dumping ground; component recipes that happen to have 2 consumers
were globalized into the catch-all instead of getting a dedicated colocated stylesheet (parallel to
how disco-glyph/glyph-face/hover-popover each got their own file). Move:

- the ~190-line **metric-badge / metric-pill** recipe (`:362-558`) → a colocated `metric-badge.css`
  the metric-badge package owns (it has 2 real consumers — `MetricBadge.vue` + `MetricPill.vue` —
  keep it global CSS, just cohesive). **GATED on the §7/§8 metric-ownership decision (W28/W29):**
  the relocation must land in the RIGHT repo — if W29's repatriation-prune retires metric-pill /
  moves the metric ownership, the recipe relocates to where the OWNER lands (this is why the
  utilities portion `dependsOn` W29; the tokens carve has no such gate).
- the **labeled-field error contract** → labeled-field's scoped CSS.
- the **section-description** recipe → section's CSS.
- the **input-bar** (`:555-595`) → input's CSS (consumers `SearchBar.vue` + `FuzzySearch.vue`).

What REMAINS is the genuinely cross-cutting atom set — carve it into cohesive partials (same
`@layer`, same cascade) so `utilities.css` is scannable: `utilities/interaction.css` (focus-ring,
interactive-item, tap-squish, hover-lift, btn-interactive, btn-audacious[-gold]),
`utilities/decoration.css` (status-dot, depth-text, shimmer/gold-shimmer, cartoon-shadows, dividers,
rainbow), `utilities/layout.css` (scrollbar-hidden/thin, scroll-fade-masks, ios-zoom-fix,
deferred-section), and the media-query atoms (reduced-motion, forced-colors, coarse-pointer) per the
audit's RELOCATION-not-split mandate. The exact remaining-atom partition is RATIFY-BEFORE-IMPL
(Cadence step 1) — the binding rule is component-coupled-recipes-relocate, cross-cutting-atoms-stay.

**(3) Excise the dead `floating-panel` chain — full-chain, no alias (slice 27 F2).** Delete
`.floating-panel`/`.floating-panel-item`, the `floating-panel-in` keyframe (`animations.css:4`), and
the `--animate-floating-panel-in` theme bridge (`theme.css:390`) — the complete dead chain (no
back-compat alias, abrogate-before-patch). RELOCATE the LIVE `.dropdown-menu-content`/
`.dropdown-sub-content` font knob (`:31-34`, real consumers) to a `dropdown-menu.css` colocated with
the dropdown-menu family (or fold it into the menu `_shared`). Retire `floating-panel.css` entirely
+ drop its `index.css` `@import` line.

**(4) Rename `glass-specular-track.css` → `glass-material.css`; fix the stale cross-file doc
pointers (slice 27 F5; ROUTED here from W09 — W09 owns the recipe VALUES, W25b owns the FILE).**
Rename the file (or fold its a11y brackets into `glass.css` + its refract gate into
`glass-refract.css`, retiring the file clean — RATIFY in Cadence step 1; clean break, no public
`.glass-specular-track` alias per no-backwards-compat). Fix the three stale pointers: `tokens.css`
(now `tokens/...css` post-carve) `:1707`, `index.css` rung-4a `:54-60`, the `glass-refract.css`
header — all re-point to `glass.css`/`.glass-material`.

**`glass.css` (691) is NOT carved for length (§4 note 19 — the load-bearing scope adjudication).**
The audit is emphatic it has a SINGLE cohesion axis; a forced split is contrivance (§0). The
CSS-aware gate's ceiling rationale is cohesion-not-length for single-axis files. A minimal
`glass/material.css` (~175 lines) split lands ONLY if the gate's mechanical ceiling FORCES it, and
that is documented as the SOLE acceptable glass split. The gate reports `glass.css` RED uniformly
(no collector exemption); W25b ADJUDICATES it in the audit json. **The W09 specular-intensity tune
is NOT in scope here** — W09 owns the `glass.css` `.glass-material::before` recipe VALUES (the
warm-cream low-alpha core + the token-cohort re-baseline); W25b owns the file MOVES/renames AROUND
it. No file collision (Disjointness vs W09).

No legacy alias, no dead orphan retained "for compat", no second parallel directive, no contrivance
split — every carve is isomorphic and every excision is full-chain.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | DEMOTE to a thin BARREL that `@import`s the new `src/styles/tokens/` children in declared cascade order. The §-content moves OUT into the partials; the file keeps only the import list + the header cohesion note. |
| `src/styles/tokens/structural.css` | **NEW** — §-1/§0/§1/§2/§3/§11/§20 stable axes (duration/easing/springs/z-index/scales/focus/platform-motion). |
| `src/styles/tokens/color.css` | **NEW** — §5/§6/§13/§14 palette/jewel/gold/rainbow + the `.dark` re-resolution block + light-dark `@supports`. |
| `src/styles/tokens/surface.css` | **NEW** — §7 shadows (incl. the `--shadow-cartoon-*` identity chain) + §8 glass 5-tier + §12 paper + §4 radius bridge. |
| `src/styles/tokens/component.css` | **NEW** — §16 timeline / §17 metric / §19 table-density / §9 offsets / §10 sizing. |
| `src/styles/tokens/houdini.css` | **NEW** — the six top-level `@property` registrations. |
| `src/styles/utilities.css` | RELOCATE the component-coupled recipes OUT (metric-badge/pill, labeled-field error, section-description, input-bar); keep only the cross-cutting atoms, themselves carved into the `utilities/` partials; `@import` the partials in cascade order. |
| `src/styles/utilities/{interaction,decoration,layout}.css` | **NEW** — the cross-cutting shared atoms (exact partition RATIFY step 1). |
| `src/components/custom/metric-badge/metric-badge.css` *(or the W29-decided owner location)* | **NEW** — the relocated ~190-line metric-badge/pill recipe (location GATED on W29's metric-ownership decision). |
| `src/components/ui/input/input-bar.css` *(or the input package's CSS home)* | **NEW** — the relocated input-bar recipe. |
| labeled-field's scoped CSS / section's CSS | RECEIVE the relocated labeled-field-error + section-description recipes. |
| `src/styles/floating-panel.css` | **DELETE** (full retire — the orphan class block + the live dropdown knob relocates out first). |
| `src/styles/dropdown-menu.css` *(or the menu `_shared`)* | **NEW** (or RECEIVE) — the relocated `.dropdown-menu-content`/`.dropdown-sub-content` font knob. |
| `src/styles/animations.css` | DELETE the `floating-panel-in` keyframe (`:4`). |
| `src/styles/theme.css` | DELETE the `--animate-floating-panel-in` bridge (`:390`). |
| `src/styles/glass-specular-track.css` | RENAME → `glass-material.css` (or fold + retire — RATIFY step 1). |
| `src/styles/glass-refract.css` | Fix the stale header pointer → `glass.css`/`.glass-material`. |
| `src/styles/index.css` | Re-point the `@import` cascade: ONE `./tokens.css` (unchanged surface, the barrel resolves the children); add the `utilities/` + relocated-component CSS imports in cascade order; DROP the `floating-panel.css` import; re-name the `glass-specular-track.css` import → `glass-material.css`; fix the rung-4a stale comment (`:54-60`). |
| `scripts/proof-dock-controls-split.mjs` *(or a generalized CSS-split gate)* | **OPTIONAL** — if the carve adopts the family-enumerated split gate, extend the enumeration to the tokens/ + utilities/ partial sets (the primary lock is `proof:no-god-module` going GREEN; this is the structural-completeness companion). |
| `docs/tranches/AX/audit/W25b-css-monolith-carves.json` | **NEW** — the carve ledger: the born-RED roster cleared, the glass.css NOT-carved adjudication, the floating-panel deletion-proof, the rename pointer-fix roster, the zero-pixel-delta evidence. |

**OUT of bounds:** the `proof:no-god-module` collector `.css` extension + the `["local","ci"]`
re-tag + the dist `@source` deadlink fix (**W25a** — W25b CONSUMES the .css-aware gate, it does NOT
author it); the `dock.css` (1227) split into `src/styles/dock/` partials (**W06** — sequenced AFTER
the W01 morph rewrite + W04 wrap rewrite so the partials carve the FINAL model); the W09 specular
intensity VALUE re-baseline + the `--glass-specular-intensity-{rest,hover,active}` token cohort mint
+ the `glass.css` `.glass-material::before` recipe RETUNE (**W09** — W25b moves/renames files AROUND
the recipe, it does NOT edit the recipe); the TS `useMetaballRenderer.ts` 569 split + dock
derived-state + GlassRenderer split (**W26**); the `.instrument-rail` twin-line groove `@utility`
prune (**W29** — but W25b's utilities carve must PRESERVE the groove recipe until W21's A-1 captures
it; see Disjointness); the metric-ownership repo DECISION (**W28/W29** — W25b's metric relocation
FOLLOWS it); the font-token consolidation (**W22** — `tokens.css` §font + typography.css; W25b's
tokens carve must not collide with W22's font-default rewrite; see Dependencies).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W25a (the .css-aware gate-extension — the predecessor).** W25a OWNS the gate
  (`proof-no-god-module.mjs` collector + `gates.mjs` re-tag) + the dist `@source` directive. W25b
  OWNS the four CSS FILES it carves/excises/renames — it touches NEITHER the collector NOR the
  `@source` directive. **Disjoint by role:** W25a makes the ceiling VISIBLE (born-RED); W25b CLEARS
  it (GREEN). The born-RED roster W25a emits in its audit json (`tokens 1728 / dock 1227 /
  utilities 1119 / glass 691`, with the glass.css cohesion-not-length flag) is the EXACT input W25b
  (tokens/utilities) + W06 (dock) carve against. No shared file edit; pure sequence.

- **vs W06 (dock storybook consolidation + `dock.css` split).** W06 splits `dock.css` (1227) into
  `src/styles/dock/` partials, LAST in the dock band (after W01 + W04 land, so it carves the FINAL
  model — charter line 504; §4 note 19). **Disjoint by file:** W06 owns `dock.css`; W25b owns
  `tokens.css` + `utilities.css` + `floating-panel.css` + `glass-specular-track.css`. W25b does NOT
  touch `dock.css`; W06 does NOT touch the W25b files. Both consume the SAME W25a `.css`-aware gate
  (W06 runs it over the dock partials per charter line 523; W25b over the tokens/utilities partials)
  — the gate is the shared TOOL, not a shared edit surface. They share `src/styles/index.css` as a
  cascade-import surface (W06 adds the `dock/` imports; W25b re-points the `tokens.css` barrel +
  drops `floating-panel` + renames `glass-specular-track`) — **coordinate so the two `index.css`
  edits touch DISJOINT import rows** (W06: the dock `@import` block; W25b: the tokens/utilities/
  floating-panel/glass-material rows), no overlapping line.

- **vs W09 (specular tune-to-subtle).** W09 OWNS the `glass.css` `.glass-material::before` recipe
  VALUES (the warm-cream low-alpha inner stop, the rest-floor-to-0) + the
  `--glass-specular-intensity-{rest,hover,active}` token cohort it MINTS in `tokens.css`
  (the `@property --specular-intensity` neighbourhood). W25b OWNS the FILE-level moves: the
  `glass-specular-track.css` → `glass-material.css` rename (slice 27 F5; **explicitly ROUTED to W25b
  by W09's own FileBounds OUT-of-bounds clause** — W09 line 167, W25b line 145-147 there) + the
  tokens carve that RELOCATES the W09-minted cohort INTO `tokens/surface.css` (§8). **Disjoint by
  edit-kind:** W09 edits the recipe INSIDE `glass.css`/`tokens.css`; W25b moves/renames files AROUND
  it. **Sequence:** W25b `dependsOn` W09 (charter line 1321) so the tokens carve relocates the
  ALREADY-MINTED specular cohort (not a moving target), and the glass-material rename happens AFTER
  W09's tune settles (W09 line 197). If the carve and the tune were to race, the cohort could land
  in `tokens.css` (pre-carve) and need re-homing — the dependsOn prevents that.

- **vs W22 (font-register reconciliation).** W22 consolidates the fragmented font tokens
  (`tokens.css:43-51` `--font-stack-*` + `theme.css` bridge + `typography.css` `--font-brand-sans` +
  the body-default-face correction) into ONE source (slice 27 F6). W25b's `tokens.css` carve moves
  the §-content into partials — **the font tokens are part of `tokens.css`**, so the two waves touch
  the same file. **Disjoint by ordering:** W25b `dependsOn` W22 (charter line 1321) so the tokens
  carve relocates the ALREADY-CONSOLIDATED font block (W22 lands one coherent font source FIRST;
  W25b then files it into the right partial — likely `tokens/structural.css` or a `tokens/font.css`
  per the W22-decided shape). W25b must NOT re-litigate the font default (that is W22's call); it
  only relocates the consolidated block. Coordinate so W22's font-source landing and W25b's
  partition agree on which partial the font tokens live in.

- **vs W29 (repatriation-prune — the metric-ownership decision + the twin-line groove prune).** TWO
  couplings, both load-bearing. (a) **Metric ownership (the utilities-portion gate).** W25b's
  utilities carve RELOCATES the ~190-line metric-badge/pill recipe to its owning component's CSS —
  but if W29's repatriation retires metric-pill / moves metric ownership to speedtest+muster
  (the §7/§8 decision), the recipe must relocate to the RIGHT repo. **W25b's utilities portion
  `dependsOn` W29** (charter line 1321; §4 note 19) so the relocation lands in the final owner; the
  TOKENS carve has NO such gate (it is unblocked on W25a alone — sub-wave the tokens carve from the
  utilities carve so the tokens partials can land while the metric decision settles). (b) **The
  `.instrument-rail` twin-line groove (digest `hist:fourier-analysis`).** W21's A-1 ask PORTS the
  `.instrument-rail` twin-line groove recipe onto the configurator; W29 PRUNES the twin-line
  `@utility` when it retires instrument-chassis/rail. W25b's `utilities.css` carve MAY MOVE the
  groove recipe's source location. **Sequence the W21 A-1 capture BEFORE W29 prunes it** — W25b
  must PRESERVE the groove recipe (relocate, do not delete) through the carve so A-1 still has a
  source; the deletion is W29's, gated on A-1's capture (charter line 1339; §4 note 19 (c)).

- **vs W36 (forced-colors glass-language skin).** The muster/digest fold routes a library-level
  `@media (forced-colors:active)` skin partly to W25 (CSS partials) — but the CHARTER lands it as
  **W36** (its own wave; §4 note 22 dedup ledger). W25b does NOT author the forced-colors skin; it
  only carves the EXISTING `forced-colors` media-query atom (the 6-line focus-ring fallback in
  `utilities.css`) into `utilities/` as part of the relocation. **Disjoint:** W25b relocates the
  existing atom; W36 authors the new structure-survival skin. The relocated atom is the seam W36
  later extends.

- **vs W00 (the π visual-runtime lane).** W00 stands up the fail-CLOSED visual-runtime workspace.
  W25b's VISUAL-TRUTH gate is a ZERO-pixel-delta screenshot diff RUN THROUGH the W00 π-lane (the
  isomorphism proof — the inverse of a re-design wave). W25b does NOT author π-lane machinery; it
  CONSUMES the W00 paired-before/after capture protocol, applied to prove NO change.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

The actual count is **3** (≤2 implement + 1 adversarial-verify), well under the AX ≤6-implementation /
≤7-read-only ceiling. The gate-author arm COLLAPSES into the adversarial-verify lane — `proof:no-god-module`
already exists (W25a re-pointed it); W25b's job is to make it GREEN + add the isomorphism proof, not
author a new gate.

- **Implement lane A — the tokens carve (≤1 agent).** Carves `tokens.css` (1728) into the
  `src/styles/tokens/` §-seam partials behind a thin barrel; preserves the cascade order; relocates
  the consolidated font block (W22) + the W09-minted specular cohort into their partials; confirms
  `proof:no-god-module` no longer lists `tokens.css` and EVERY partial is ≤ 500; runs `npm run build`
  + `vue-tsc --noEmit` + the full gate fleet at every interval. Captures the tokens-side
  zero-pixel-delta before/after. This lane is UNBLOCKED on W25a (no metric/W29 gate).

- **Implement lane B — the utilities relocation + dead-chain excise + rename (≤1 agent, GATED on
  W29).** RELOCATES the component-coupled recipes (metric-badge/pill to the W29-decided owner,
  labeled-field-error, section-description, input-bar) + carves the cross-cutting atoms into
  `utilities/` partials; PRESERVES the `.instrument-rail` groove recipe (does not delete — W29/A-1
  own that); EXCISES the full `floating-panel` chain (class + keyframe + theme bridge) + relocates
  the live dropdown knob + drops the `index.css` import; RENAMES `glass-specular-track.css` →
  `glass-material.css` + fixes the three stale pointers; confirms `proof:no-god-module` no longer
  lists `utilities.css` + `grep -rln 'floating-panel'` returns nothing + the rename pointers
  resolve. Captures the utilities/excise/rename-side zero-pixel-delta before/after.

- **Adversarially-verify + gate-confirm (≤1 read-only lane).** Re-runs the four RED witnesses
  against the carved tree: (a) `proof:no-god-module` (.css-aware, ci-tagged) is GREEN on
  tokens/utilities (dock is W06's; glass is the adjudication); (b) `grep -rln 'floating-panel' src/
  demo/` returns NOTHING (full-chain deletion-proof — class + keyframe + theme bridge all gone, no
  alias); (c) the rename pointers resolve (`tokens/...`, `index.css` rung-4a, `glass-refract.css`
  header all point at `glass.css`/`.glass-material`; the old `glass-specular-track.css` is gone with
  no public alias); (d) the zero-pixel-delta screenshot diff PASSES across the glass-material /
  metric-badge / dropdown / token-driven surfaces (the carve is isomorphic — NO painted pixel
  changed). ADVERSARIAL twists: **(i)** confirms the carve did NOT silently change a TOKEN VALUE
  (a §-seam carve that drops or re-orders a `:root` declaration would shift the cascade — diff the
  computed-style token set before/after, assert identical); **(ii)** confirms the `tokens/` barrel
  preserves the cascade ORDER (a re-ordered `@import` could change which `.dark` re-resolution wins
  — assert the resolved `.dark` token set is identical); **(iii)** confirms `glass.css` was NOT
  carved-for-length (the cohesion-not-length adjudication holds — no contrivance `glass/foo.css`
  split unless the gate forced the documented minimal `glass/material.css`); **(iv)** confirms the
  metric-badge recipe relocated to the W29-decided owner (not stranded in `utilities.css`, not in
  the wrong repo); **(v)** confirms the `.instrument-rail` groove recipe SURVIVES the carve (W21
  A-1's source is intact — a premature delete would strand A-1).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an idiomatic gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — by reference, not restated. This wave's §3a auto-triggers (HALT the failing unit + dispatch the research→plan-augment→redress triumvirate, never stall): an out-of-FileBounds reveal — any need to carve `dock.css` (→ **W06**), carve `glass.css` FOR LENGTH (the cohesion-not-length adjudication is W25b's STANDING decision; carving it is a scope-reveal, NOT a relocation this wave performs), extend the `.css`-collector or re-tag `proof:no-god-module` (→ **W25a**), or write any sibling-repo `@source` adoption (→ **W34**) — is a scope-reveal → halt + triumvirate, do NOT absorb. The metric-badge/pill RELOCATION TARGET is GATED on W29's metric-ownership decision: if Implement-lane-B reaches the relocation before W29 has decided the owner location, HALT lane B (the tokens carve in lane A is UNBLOCKED and proceeds) — do NOT strand the recipe in `utilities.css` nor guess the owner. Non-local hard-gate failure: if the zero-pixel-delta screenshot diff does NOT pass across the glass-material/metric-badge/dropdown surfaces (a §-seam carve silently shifted a `:root` token value or re-ordered the `.dark` re-resolution cascade — the carve is NOT isomorphic), halt + triumvirate and re-derive the partition rather than hand-patching the drifted token. Third diagnostic-loop iteration: if the `floating-panel` dead-chain excise (class + keyframe + theme bridge) still leaves a live reference after three passes (`grep -rln 'floating-panel'` non-empty — the live dropdown knob relocation snagged a hidden consumer), dispatch research+plan+redress rather than a fourth grep-and-delete. §5.3 / RATIFY-BEFORE-IMPL reaching un-ratified: the remaining-atom utilities partition (RATIFY step 1) or the `glass-specular-track.css`→`glass-material.css` rename-vs-fold disposition reaching impl un-ratified → §6.2 Class-3 HALT-AND-RATIFY (settle the partition before the carve so the cascade order is preserved by design, not reconstructed after a drift).

---

## HardGate (the .css-aware gate GREEN + cascade-integrity + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.** Every gate here is a precept-valid STRUCTURAL
artefact (line-count / deletion-proof / directory-resolution / file-rename), per
`precepts/instructions/README.md:183` ("Grep-only checks are supplementary **unless the target is
purely structural**") — the no-god-module ceiling, the dead-chain deletion, and the rename ARE
purely-structural targets. BUT the carve is NOT purely structural in its EFFECT: it touches the
PAINTED cascade, so the structural gates are NECESSARY-not-sufficient — the cascade-integrity proof
+ the zero-pixel-delta VISUAL-TRUTH audit are co-binding (this is the gestalt the AW lesson teaches:
a green structural gate over a changed render is the cardinal failure W00 closes).

1. **`proof:no-god-module` (.css-aware, ci-tagged, W25a) is GREEN on the carved files — a
   file-extension-reach + line-count artefact.** After the carve the gate does NOT list `tokens.css`
   or `utilities.css` (every partial ≤ 500). `dock.css` clears via W06; `glass.css` is the
   documented cohesion-not-length adjudication (the gate reports it RED uniformly until/unless the
   minimal `glass/material.css` split lands — the audit json records WHY it is not carved). **Born-RED**
   (inherited from W25a) → GREEN on tokens+utilities after the carve.
2. **The dead-chain deletion-proof — a deletion artefact.** `grep -rln 'floating-panel' src/ demo/`
   returns NOTHING (the class block, the `floating-panel-in` keyframe, the `--animate-floating-panel-in`
   theme bridge ALL gone; no back-compat alias; `floating-panel.css` retired + its `index.css`
   import dropped). The live dropdown knob is reachable at its new colocated home. **Born-RED** (the
   chain ships at HEAD) → GREEN.
3. **The rename / pointer-resolution proof — a file-rename + reference-resolution artefact.**
   `glass-specular-track.css` no longer exists (renamed → `glass-material.css`, or folded+retired —
   per RATIFY); the three stale pointers (`tokens/...`, `index.css` rung-4a, `glass-refract.css`
   header) resolve to `glass.css`/`.glass-material`; NO `.glass-specular-track` public alias survives
   (clean break). **Born-RED** → GREEN.
4. **The CASCADE-INTEGRITY proof — a computed-style equivalence artefact (the load-bearing
   not-purely-structural gate).** The carve is isomorphic ONLY if the RESOLVED cascade is byte-identical
   pre/post. Assert: the full computed `:root` token set (every `--token` resolved value, light arm)
   is IDENTICAL before/after the carve; the resolved `.dark` re-resolution token set is IDENTICAL
   (a re-ordered `@import` or a dropped declaration would shift which value wins); the `@layer` order
   is preserved. This is the gate that catches a "split that changed a value" — a structural
   line-count gate alone would pass a carve that silently re-ordered the cascade. **Born-RED** if any
   resolved token differs; GREEN on byte-identical.
5. **`npm run build` GREEN + `/styles` surface delta is ZERO.** The build emits the SAME unified
   `dist/glass-ui.css` cascade (the barrel resolves to the same flattened output); no `@import`
   dangles; `vue-tsc --noEmit` GREEN (the carve touches no TS surface). A build artefact — the canary
   that the `src/styles/` re-org produces an identical published bundle.

These are line-count / deletion-proof / file-rename / computed-style-equivalence / build artefacts —
the precept-valid forms (`precepts/instructions/README.md:170-183`) for a structural-with-cascade-effect
target.

**VISUAL-TRUTH (MANDATORY — the carve must not change a single painted pixel; AX.W00 NON-NEGOTIABLE
close discipline).** Unlike W25a (no visual surface — a packaging fix), W25b TOUCHES the painted
cascade: a §-seam carve, a recipe relocation, a dead-chain excise, and a file rename ALL risk a
silent cascade shift (a dropped `:root` declaration, a re-ordered `@import` that changes which
`.dark` value wins, a relocated recipe that lands in a different `@layer`). The binding close
criterion is a **live before/after screenshot diff proving ZERO painted-pixel delta** across the
surfaces every carved file feeds: the token-driven surfaces (shadows, glass tiers, colors, radii,
springs — `tokens.css`), the metric-badge/metric-pill render (the relocated recipe), the
dropdown-menu font knob (the relocated live rule), the glass-material surfaces (the renamed file's
selectors), and a `.dark`-arm capture of all of the above (the re-resolution block is the highest
cascade-shift risk). The audit RUNS THROUGH the W00 π-lane: capture the BEFORE state (HEAD), apply
the carve, capture the AFTER state, and assert a pixelmatch diff of ZERO (within the W00 3-run
anti-flake tolerance) — the inverse of a re-design wave's audit (which confirms a CHANGE; W25b
confirms NO change). **The wave does NOT close on the line-count gate alone** — the
cascade-integrity computed-style proof + the zero-pixel-delta screenshot diff are co-binding,
captured under `docs/tranches/AX/audit/`. A carve that goes structurally GREEN but shifts one
painted pixel is the EXACT AW headless-green/visually-broken failure — W25b's isomorphism is
falsified by the live diff, not assumed from the line count.

**VISUAL-TRUTH one-liner:** *the carve closes ONLY when a live π-lane before/after screenshot diff
across every surface the carved files paint (light + `.dark`) shows ZERO painted-pixel delta — the
splits, relocations, excise, and rename must be byte-identically isomorphic in the rendered image,
not merely under the line-count gate.*

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + RATIFY the partition + the rename disposition.**
   Re-confirm the four RED witnesses against HEAD live: `wc -l src/styles/{tokens,utilities,glass}.css`
   (>500); `proof:no-god-module` (.css-aware, post-W25a) lists them; `grep -rln 'floating-panel'`
   returns only CSS-internal hits; `glass-specular-track.css` body is folded but the filename + three
   pointers persist. **RATIFY:** the exact `tokens/` partition (the ~4-5 §-seam partials + the barrel
   import order); the `utilities/` remaining-atom partition; the metric-badge relocation TARGET
   (pending the W29 metric-ownership decision — block lane B until it lands); the
   `glass-specular-track.css` disposition (rename vs fold+retire). Capture the BEFORE π-lane state of
   every affected surface (light + `.dark`). Record in the audit json. Do NOT trust the audit's word —
   re-prove.
2. **Carve `tokens.css` into `src/styles/tokens/` partials (lane A — UNBLOCKED).** Move the §-content
   into the partials behind the thin barrel; relocate the W22 font block + the W09 specular cohort
   into their partials; preserve cascade order. Run `proof:no-god-module` → confirm tokens.css no
   longer listed. Run the cascade-integrity computed-style proof → confirm the `:root` + `.dark`
   token sets are byte-identical.
3. **Relocate `utilities.css` component recipes + carve the atoms (lane B — GATED on W29).** Move
   metric-badge/pill (to the W29 owner), labeled-field-error, section-description, input-bar to their
   owning CSS; carve the cross-cutting atoms into `utilities/` partials; PRESERVE the
   `.instrument-rail` groove recipe. Run `proof:no-god-module` → confirm utilities.css no longer
   listed.
4. **Excise the floating-panel dead chain + relocate the live dropdown knob (lane B).** Delete the
   class block + keyframe + theme bridge; relocate `.dropdown-menu-content`/`.dropdown-sub-content`
   to `dropdown-menu.css`; retire `floating-panel.css` + drop the `index.css` import. Run the
   deletion-proof grep → nothing.
5. **Rename `glass-specular-track.css` → `glass-material.css` + fix the three stale pointers (lane B).**
   Rename (or fold+retire per RATIFY); re-point `tokens/...`, `index.css` rung-4a, `glass-refract.css`
   header. Run the pointer-resolution proof.
6. **Build + cascade-integrity + VISUAL-TRUTH zero-delta audit.** `npm run build` → the unified
   `dist/glass-ui.css` is emitted with zero surface delta; `vue-tsc --noEmit` GREEN. Capture the
   AFTER π-lane state; run the zero-pixel-delta screenshot diff (light + `.dark`) across all affected
   surfaces; assert ZERO delta. Write `audit/W25b-…json` to its born-RED→GREEN state with the
   glass.css NOT-carved adjudication + the zero-delta evidence + the warn-band watch-list handoff
   (the 17 files in the 301-500 band, slice 25 F5 — folded into §1/§2/§6 rewrites, NOT split here).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W25b-css-monolith-carves.json` — the carve ledger: the four RED witnesses,
  the born-RED roster CLEARED (tokens.css 1728 → partials ≤ 500; utilities.css 1119 → partials +
  relocations ≤ 500), the **glass.css NOT-carved-for-length ADJUDICATION** (the cohesion-axis
  rationale, §4 note 19 — the gate reports it RED, W25b documents WHY it stays; the minimal
  `glass/material.css` split lands ONLY if the gate forces it), the floating-panel **deletion-proof**
  (class + keyframe + theme bridge gone, no alias), the rename **pointer-fix roster**
  (`glass-specular-track.css` → `glass-material.css` + the three re-pointed sites), the
  metric-ownership relocation target (the W29-decided owner), and the `.instrument-rail` groove
  PRESERVED-for-A-1 note.
- The `proof:no-god-module` (.css-aware) gate-output artefact — now NOT listing tokens.css/utilities.css.
- The **cascade-integrity computed-style equivalence** capture — the resolved `:root` + `.dark` token
  sets, byte-identical before/after (the isomorphism's structural half).
- The **zero-pixel-delta VISUAL-TRUTH** capture (the W00 paired before/after protocol applied to
  prove NO change) — the screenshot diff across the token-driven / metric-badge / dropdown /
  glass-material surfaces (light + `.dark`), ZERO delta within the 3-run anti-flake tolerance.
- The post-build `dist/glass-ui.css` zero-surface-delta proof (the unified bundle is identical).
- The warn-band watch-list handoff (slice 25 F5) — the 17 files in the 301-500 band recorded as the
  standing watch the AX FINAL tracks (NOT split here — folded into the §1/§2/§6 rewrites that
  naturally extract their hot paths).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(styles): W25b born-RED baseline — tokens/utilities over the .css-aware ceiling; floating-panel dead chain ships; glass-specular-track.css naming drift; RATIFY the tokens/ partition + rename disposition (AX.W25b)`
2. `refactor(styles/tokens): carve tokens.css (1728) into src/styles/tokens/ §-seam partials behind a thin barrel — isomorphic, cascade preserved (AX.W25b slice25-F1)`
3. `refactor(styles/utilities): relocate component-coupled recipes (metric-badge/pill → owner, labeled-field-error, section-description, input-bar) + carve cross-cutting atoms into utilities/ partials (AX.W25b slice27-F1)`
4. `refactor(styles): excise the dead floating-panel chain (class + keyframe + theme bridge, no alias) + relocate the live dropdown font knob to dropdown-menu.css (AX.W25b slice27-F2)`
5. `refactor(styles): rename glass-specular-track.css → glass-material.css + re-point the three stale cross-file pointers (AX.W25b slice27-F5)`
6. `chore(AX.W25b): audit ledger — born-RED roster cleared, glass.css NOT-carved cohesion adjudication, zero-pixel-delta isomorphism proof, warn-band watch-list to FINAL`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/
stash per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W25a (the .css-aware gate-extension) — the binding predecessor.** The charter `### AX.W25b`
  block (line 1321) lists W25a first. W25a extends `proof:no-god-module` to scan `.css` + re-tags it
  `["local","ci"]`, which is what MAKES the four CSS god-modules visible (born-RED). W25b CLEARS the
  born-RED roster W25a stages — without the gate-extension there is no gate to go GREEN, and a single
  combined wave could never pass its own gate until every carve lands (no green intermediate; §4 note
  19). Pure sequence: gate-extension → carves.
- **AX.W06 (dock.css split) — a SIBLING clearer, not a dependsOn of W25b's content, but co-listed.**
  The charter lists W06 in W25b's dependsOn line because the FOUR-file born-RED roster is cleared
  JOINTLY (W25b: tokens+utilities; W06: dock). W06 owns `dock.css`; W25b owns the other three. They
  share only the W25a gate (the tool) + disjoint `index.css` import rows (coordinate). W06 is LAST in
  the dock band (after W01+W04) so the dock partials carve the final morph model — W25b's tokens/
  utilities carve does NOT wait on the dock rewrite (it has no dock coupling).
- **AX.W09 (specular tune) — the binding dependsOn for the rename + the cohort relocation.** W09
  MINTS the `--glass-specular-intensity-*` token cohort + retunes the recipe; W25b's tokens carve
  RELOCATES the minted cohort into `tokens/surface.css` and the glass-material rename happens AFTER
  the tune settles (W09 routes the rename TO W25b — W09 line 167). Sequenced so the carve relocates a
  settled cohort, not a moving target.
- **AX.W22 (font-register reconciliation) — the binding dependsOn for the font-token relocation.**
  W22 consolidates the 3-file font fragmentation into ONE source; W25b's tokens carve then files the
  CONSOLIDATED block into its partial. W25b must NOT re-litigate the font default (W22's call) — it
  only relocates. Sequenced so the carve moves a consolidated block.
- **AX.W29 (repatriation-prune) — the binding dependsOn for the UTILITIES PORTION ONLY (the §7/§8
  metric-ownership decision).** The ~190-line metric-badge/pill recipe must relocate to the RIGHT
  repo/owner — if W29 retires metric-pill / moves metric ownership, the recipe follows. The TOKENS
  carve has NO W29 gate (unblocked on W25a) — **sub-wave the tokens carve (lane A, unblocked) from
  the utilities carve (lane B, W29-gated)** so the tokens partials land while the metric decision
  settles (§4 note 19). W29 also PRUNES the `.instrument-rail` twin-line `@utility` — W25b must
  PRESERVE the groove recipe (relocate, don't delete) until W21's A-1 captures it; the deletion is
  W29's, gated on A-1.
- **TRANSITIVE — AX.W00 (the π visual-runtime lane).** Not a direct charter dependsOn, but W25b's
  VISUAL-TRUTH gate (the zero-pixel-delta before/after diff) RUNS THROUGH the W00 π-lane + paired
  before/after capture protocol. W00 must stand up the workspace first.
- **Downstream:** the band-J chain continues to **W26** (TS god-module + state encapsulation — the
  `useMetaballRenderer.ts` 569 split + dock derived-state) → **W27a/W27b** (legacy gate-hardening +
  the full-tree commentary sweep). W25b's carve is the CSS half of the encapsulation band; W26 is the
  TS half.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **AU.W8b.3** (`dock-controls.css` carve, 486 lines, locked by `proof-dock-controls-split.mjs`) —
  the PROVEN house carve pattern (a sibling `.css` in the SAME `@layer components`, `@import`ed in
  cascade order) the audit names as the template W25b carves with (slice 25 F0; slice 27 F0). The
  carve stopped at one family; W25b continues it for tokens/utilities. No new abstraction is invented
  — the splitter exists and is gate-locked.
- **AV.W13** (the `proof:no-god-module` gate provenance + the `aurora.frag.ts` GLSL-partial
  assembler) — the gate was born-RED at open (`aurora.frag.ts` 819 lines) and the decomposition
  cleared it; its "largest now 475" claim was true for `.ts`/`.vue` ONLY (the `.css`-blind collector).
  W25b is the CSS half AV.W13 never reached. The aurora.frag partial-assembler is the cohesive-split
  precedent the tokens barrel mirrors.
- **The organic accretion arc (AU→AW)** — every tranche that needed a new token axis appended a §N
  section to the one canonical `:root` (tokens.css grew to 1728); `utilities.css` became the default
  dumping ground for any non-tier recipe (1119, the ~190-line metric-badge recipe globalized as a
  "utility"). The §N banners ALREADY encode the cohesion seams (the file header `:7-10` draws the
  structural-vs-visual line) — they were never physically separated because the CSS-blind gate gave
  no split pressure (slice 25 F1; slice 27 F0/F1).
- **`8554e33`** (the W22/W23 glass-material fold) — moved the moving-specular body INTO `glass.css`
  but left `glass-specular-track.css` NAMED for it + three stale cross-file pointers (slice 27 F5).
  W25b finishes the rename/re-point the fold left undone (W09 owns the recipe values; W25b owns the
  file moves).
- **Q.W3** (the floating-panel dead-orphan + the parked dropdown knob) — `floating-panel` was a
  teleported-menu substrate whose consumer was retired; the CSS + keyframe + theme alias were never
  excised, and the dropdown font knob was later parked in this file because it was the nearest
  "menu-ish" home, compounding the mis-scope (slice 27 F2). W25b excises the orphan + re-homes the
  live rule.
- **HEAD `eaba94f`** (charter audit baseline; working tree `at-dock-convergence`) — the four CSS
  god-modules + the dead floating-panel chain + the stale glass-specular-track filename all ship in
  the published 3.6.0 line, structurally invisible because the gate could not see `.css` (the W25a
  blindness). W25b carves the three the gate now reports (tokens/utilities) + adjudicates the fourth
  (glass) + excises the orphan + finishes the rename.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-J binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **no-god-modules** (`precepts/instructions/README.md:105-108`: "**No god modules.** … Split by
  concern, name by behaviour, never by namespace position. Every level … separates concerns by what
  it does, not where it sits."). W25b CLEARS the four-CSS god-module violation the W25a gate-extension
  makes machine-checkable: `tokens.css` (1728) carves along its §-numbered COHESION seams (structural
  / color / surface / component / houdini — by what each does), `utilities.css` (1119) RELOCATES
  component-coupled recipes to their owner (de-junk-drawering the kitchen-sink) + carves the
  remaining cross-cutting atoms by concern. MUST NOT carve by namespace position (no flat
  `tokens_1.css` slabs) and MUST NOT force-split `glass.css` for length — its SINGLE cohesion axis
  means a length-split would violate the precept's OWN "split by concern" rule (a split that has no
  concern boundary is contrivance). The glass.css NOT-carved adjudication is the precept applied
  CORRECTLY, not an exception to it.
- **splits-use-directory-modules** (`precepts/instructions/README.md:110-113`: "**Splits use
  directory modules.** `hir/mod.rs` plus children, not flat siblings such as `hir_leaf.rs`.
  Cross-crate isomorphism beats flat naming; a reader who knows one crate's directory shape should
  recognise the neighbour's at a glance."). The `tokens.css` carve uses the DIRECTORY-MODULE form —
  `src/styles/tokens/` (the children) + a thin `tokens.css` barrel (the `mod.rs` analogue that
  `@import`s them), NOT flat `tokens_color.css` siblings. The `utilities/` carve does the same. This
  mirrors the proven `dock-controls.css` → (W06) `src/styles/dock/` shape, so a reader who knows the
  dock partials' directory shape recognises the tokens/utilities shape at a glance. MUST NOT carve
  into flat top-level siblings (`tokens-color.css`, `tokens-glass.css`) — the directory + barrel is
  canonical.
- **the cascade-order invariant / one-path / abrogate-before-patch** (`precepts/instructions/README.md:17-22`:
  "**Abrogate before patch.** … deletion plus replacement is often shorter total." + "**One path.**
  … Collapse to one"; + the `/styles` cascade contract from CLAUDE.md — `index.css` imports in cascade
  order, the cartoon-shadow chain rides `:root` → `@theme` → `utilities` intact). The carve is
  ISOMORPHIC: the barrel preserves the EXACT `@import` cascade order, the resolved `:root` + `.dark`
  token sets are byte-identical (the cascade-integrity gate proves it), and the `@layer` assignment
  is unchanged. The floating-panel chain is EXCISED full-chain (class + keyframe + theme bridge — no
  back-compat alias, abrogate-before-patch), and the `glass-specular-track.css` rename is a CLEAN
  break (no `.glass-specular-track` public alias — one path, one name). MUST NOT re-order the cascade
  (a re-ordered `@import` shifts which `.dark` value wins — a silent paint change the zero-delta gate
  catches), MUST NOT leave a dead orphan "for compat", MUST NOT ship a back-compat alias for the
  renamed file. The cartoon-shadow identity chain (`--shadow-cartoon-*` → `@theme` bridge →
  `utilities`) MUST stay intact across the surface.css carve (CLAUDE.md cartoon-shadow contract;
  `proof:shadow-contract` is an adjacent lock).
- **gates-close-on-evidence — and the purely-structural carve-out + its LIMIT**
  (`precepts/instructions/README.md:13,170-183`: "Gates close on evidence: … deletion proof" + the
  artefact forms + ":183 Grep-only checks are supplementary **unless the target is purely
  structural**"). The line-count ceiling + the floating-panel deletion + the rename ARE purely
  structural (precept-valid as line-count / deletion-proof / file-rename artefacts). BUT the carve
  TOUCHES the painted cascade — so the structural gates are NECESSARY-NOT-SUFFICIENT: the
  cascade-integrity computed-style proof + the zero-pixel-delta VISUAL-TRUTH diff are co-binding (a
  green line-count gate over a shifted render is the exact AW headless-green failure). MUST NOT close
  on the structural gate ALONE — the rendered-image isomorphism is the load-bearing close criterion.
- **documentation-is-part-of-the-change** (`precepts/instructions/README.md:132-135`: "Spec, design,
  and `PROGRESS` docs update in the same wave … Doc drift is uncommitted work."). The four stale
  cross-file pointers (`tokens.css:1707`, `index.css` rung-4a, `glass-refract.css` header) are
  re-pointed IN THE SAME WAVE as the rename; the `glass.css` NOT-carved adjudication is RECORDED in
  the audit json (so a future audit does not re-flag it); the `index.css` cascade comments are
  updated to the new partial shape. MUST NOT leave a pointer that names a file the rename retired.
- **no-overfitting / substrate-with-consumer** (`precepts/README.md`: "No overfitting. A … process
  rule needs a current consumer and evidence."). Every carve has an immediate basis: the tokens/
  utilities partials clear REAL over-ceiling files; the floating-panel excise removes a ZERO-consumer
  orphan (the binary substrate-without-consumer rule — `grep` proves zero binders); the metric-badge
  RELOCATION follows its 2 real consumers to their owner. MUST NOT mint a speculative empty partial
  (a `tokens/future.css` with no §-content) — every partial carries a real cohesion cluster, and the
  glass.css NON-split is the no-contrivance application of the same rule.
