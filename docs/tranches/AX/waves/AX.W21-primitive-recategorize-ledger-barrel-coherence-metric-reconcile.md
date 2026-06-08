# AX.W21 — Primitive recategorize-ledger + barrel coherence + metric-pill reconcile + Drawer spring prop

**Band** G · PRIMITIVES · **Severity** minor · **dependsOn** AX.W18 · **Charter** AX.md §3 (the
`### AX.W21` block, lines 1115-1163) + the §1 summary row (line 129) + §4 note 4 (the §7
recategorizations were ALREADY DONE by AV.W10 — re-verify each item against HEAD before acting, lines
2009-2013) + §2b band-G precept row (line 219) · **Audit** `deep-audit-corpus.json` slice
`primitive-recategorize` (index 17, findings F0=hover-popover-VERIFIED / F1=configurator-root-barrel /
F2=drawer-live-behind / F3=use-token-color-JUSTIFY / F4=metric-badge-vs-pill, plus the SLICE VERDICT +
the CARDINAL-FINDING note) + `constellation-analysis-corpus.json` `result[0]`
(`hist:keyframes.js` — the Drawer `spring?` prop ask, D13), `result[2]` (`hist:fourier-analysis` — the
self-booked Configurator A-1/A-2 divider/ladder asks), `result[5]` (`hist:muster` — the `asideSide`
CLS-fence satisfied note), `result[17]` (`idiom:bbnf-buddy` — the ToggleChip active-label token-cohort
gap + LabeledSlider under-featuring), `result[30]` (the `proof:no-retired-survivor` MIGRATION.md-lie
finding) + `converge-digest.md` lines 372-374 (MIGRATION.md honesty repair MOVED OUT of W28/W29 into
W21).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED at HEAD `eaba94f` on FOUR falsifiable witnesses that do NOT hold today. Each was
re-proven live against HEAD per the §0 cardinal "re-verify each §7 item against HEAD before acting" (§4
note 4) — the recategorize directives are a verbatim PRE-AV.W10 recap and most of their literal targets
are already satisfied; the RED witnesses are the GENUINELY-OPEN residue, not the stale recap:

- **RED witness 1 (the configurator root-barrel/rationale contradiction — the doc lies or the export is
  wrong).** `src/index.ts:125` ships `export * from "./components/custom/configurator"` (configurator ON
  the root barrel + named in the `:78` "configurator primitive" comment), yet the SAME file's cherry-pick
  rationale at `src/index.ts:67-73` lists configurator among the EXPLICITLY-EXCLUDED packages ("large
  composite chassis with nested composables (dock, aurora, configurator domain helpers)"), and the
  acceptance bar (b) at `:62-64` forbids "a nested composables sub-tree" — which
  `configurator/useConfiguratorState.ts` (253 lines, part of a 956-line family) IS. `package.json:304`
  ALSO ships the `./configurator` subpath. The falsifiable RED: *`grep -c 'custom/configurator' src/index.ts`
  = 1 (the export, RED — ON the barrel) AND `grep -n 'configurator domain helpers' src/index.ts` = 1 (the
  exclusion line, RED — the rationale names it EXCLUDED). The doc and the export contradict; no gate
  asserts the cherry-pick rationale text matches the actual root-barrel export set. After the wave: the
  contradiction is resolved (configurator demoted to subpath-only per the gestalt choice — see Scope) and
  a `proof:barrel-rationale-coherence` assertion is GREEN.*

- **RED witness 2 (the MIGRATION.md `RETIRED (AV.W10)` claim is a BINDING-DOC lie — half-reverted, never
  reconciled).** `MIGRATION.md:800-823` declares the `@mkbabb/glass-ui/metric-cell` +
  `@mkbabb/glass-ui/metric-stack` subpaths "RETIRED (AV.W10)" with "the component dirs, their
  `src/metric-cell.ts`/`src/metric-stack.ts` barrels, the `./metric-cell`/`./metric-stack` package.json
  exports + typesVersions rows, and the `/api` re-exports … are deleted" + "**0 external consumers**". ALL
  of it SURVIVES at HEAD: `src/subpaths/metric-cell.ts` + `src/subpaths/metric-stack.ts` exist;
  `package.json:64,67` (typesVersions) + `:320,324` (exports) ship both subpaths; `src/api/index.ts:215-228`
  re-exports `MetricCellAppearance`/`MetricCellProps`/`MetricStackProps`/`MetricRowProps` with the comment
  "speedtest consumes them"; `tokens.css:1197-1220` (§17) still carries the `--metric-row-*` token family.
  The retirement was UNDONE by AW speedtest re-adoption and the binding migration guide (L invariant 16)
  was never reconciled — the exact AW "doc-says-done but reverted" failure class. The falsifiable RED:
  *`grep -c 'RETIRED (AV.W10)' MIGRATION.md` = 1 (the claim) AND `test -f src/subpaths/metric-cell.ts` →
  EXISTS + `grep -c metric-cell package.json` > 0 (the survivors) — the claim contradicts the artefacts
  (RED). No `proof:no-retired-survivor` gate exists (`grep no-retired-survivor` over AX.md + scripts/ is
  empty). After: MIGRATION.md's §RETIRED entry tells the truth (un-retired, speedtest-consumed) AND a
  born-RED-at-HEAD `proof:no-retired-survivor` asserts every MIGRATION.md "RETIRED" claim resolves to ZERO
  surviving dir/subpath/export/token (GREEN; gate registration → W33).*

- **RED witness 3 (the metric-pill subpath asymmetry — one family, inconsistent publication).** `metric-pill`
  is exported on the ROOT BARREL (`src/index.ts:95` `export * from "./components/ui/metric-pill"` — the line-ref
  DRIFTED from `:101` to `:95`; HARDENING §G #25, `eaba94f`→`cdcf331`; re-locate by NAME) but has
  NO `/metric-pill` subpath (no `src/subpaths/metric-pill.ts`; no `package.json` `./metric-pill` block),
  while its three sibling family members ALL have subpaths — `metric-badge` (`src/subpaths/metric-badge.ts`
  + `package.json:316`), `metric-cell`, `metric-stack`. Two members of one family with inconsistent
  publication topology. Compounding: `MetricPill` (a 67-line pure composition of `<MetricBadge>` with
  baked-in props + a `.metric-pill` class) has ZERO real consumers at HEAD (grep: only its own
  `ui/index.ts` barrel + the demo story). The falsifiable RED: *`test -f src/subpaths/metric-badge.ts` →
  EXISTS but `test -f src/subpaths/metric-pill.ts` → ABSENT (RED — surface asymmetry). After: the
  asymmetry is resolved per the RATIFY decision (give metric-pill a `/metric-pill` subpath for symmetry,
  OR explicitly route the pill to the W29 prune with a recorded ledger note — see Scope/RATIFY-BEFORE-IMPL)
  and the disposition is recorded in the wave's audit json (GREEN).*

- **RED witness 4 (the Drawer `spring?` prop is genuinely OPEN at HEAD — a real consumer ask with no AX
  home).** `src/components/ui/drawer/DrawerContent.vue` has NO `spring`/`transition` prop (grep
  `spring|transition` over the file is empty); the Drawer open/close rides vaul-vue's 500ms
  `cubic-bezier(.32,.72,0,1)` that `drawer.css:30` documents glass-ui does NOT override — exactly the "too
  slow, not springy" keyframes' mobile drawer reports (constellation `result[0]` D13). glass-ui ALREADY
  ships the SpringProgress runtime (`useSpringMount`/motion-core), so the prop is a pure additive wire, not
  new machinery. The falsifiable RED: *`grep -c 'spring' src/components/ui/drawer/DrawerContent.vue` = 0
  (RED — no opt-in to the springy register). After: `DrawerContent` carries an additive `spring?` prop
  layering a SpringProgress/`linear(spring)` curve over vaul's transform (overridable, default preserves
  vaul's curve), with a story section proving it (GREEN).*

The wave is RED at HEAD on all four witnesses; the recategorize-recap items (hover-popover →
containers, configurator-STORY → compositions, metric-badge/pill keep-both, use-token-color
load-bearing) are ALREADY SATISFIED at HEAD (`proof:storybook-ia` GREEN, the four stories render with
correct breadcrumbs) and are LEDGER-CLOSED verify-only — the wave records them satisfied-by-AV.W10, it
does NOT re-execute landed moves.

---

## Goal

The G-band recategorize ledger is closed honestly — the four stale §7 recategorize asks recorded
satisfied-by-AV.W10 (verify-only, no re-move), and the four GENUINELY-OPEN defects fixed at root: the
configurator root-barrel/rationale contradiction resolved one way (demote-or-de-document, no doc-lie),
the MIGRATION.md metric-cell/stack `RETIRED` lie repaired NOW (not deferred to W29) with a born-RED
`proof:no-retired-survivor` gate, the metric-pill subpath asymmetry reconciled, the drawer live-behind
story disambiguated + its half-working detent buttons excised, use-token-color justified-and-annotated,
and the additive Drawer `spring?` prop shipped — leaving a green build, vue-tsc, and a coherent live
storybook the four recategorized stories read against.

---

## Scope (the gestalt fix from the audit — no workaround, no legacy, precise + architectural)

The root cause spanning the recategorize asks is ONE class: **stale pre-AV.W10 directives** (§4 note 4)
— the §7 ledger is a verbatim recap of the ORIGINAL prompt authored against the PRE-AV.W10 storybook,
where hover-popover + configurator sat under `primitives/` and were already MOVED by AV.W10 (commit
`0b27f01`). The wave's job is NOT to re-move landed work (that is churn) — it is to (a) LEDGER-CLOSE the
stale-but-satisfied asks verify-only and (b) fix the four GENUINELY-OPEN defects the stale recap
obscured. Seven folds, the configurator + MIGRATION.md ones load-bearing:

**(1) LEDGER-CLOSE the stale recategorize asks (F0 hover-popover, F1-story configurator, F4-keep-both,
F3 use-token-color) — VERIFY-ONLY, no code move.** Record in the wave's audit json that §7
hover-popover (primitives → containers, `manifest.ts:151`) and configurator-STORY (primitives →
compositions, `manifest.ts:239`) are satisfied-by-AV.W10 (`0b27f01`), live-verified (breadcrumbs +
floating-surface neighbours correct, `proof:storybook-ia` GREEN). Record the metric-badge/pill keep-both
verdict (AV.W10 `W10-prune-pushback.md` §4 — MetricPill is a 67-line composition OF MetricBadge, not a
dedup) as standing-correct. Do NOT re-move any of them. Optional polish: add a one-line blurb to the
hover-popover story noting the popovers reveal on hover (currently undocumented).

**(2) RESOLVE the configurator root-barrel/rationale contradiction (F1) — the gestalt choice is DEMOTE.**
The defect is live and architectural: `src/index.ts:67-73` documents configurator as EXCLUDED from the
root barrel (the nested-composable criterion (b)), yet `:125` exports it from the root barrel anyway.
**RATIFY-BEFORE-IMPL — recommended path (a) DEMOTE configurator to subpath-only** (the idiomatic choice
matching dock/aurora — every large family carrying a nested composable is subpath-only): delete the
`:125` root-barrel `export *` line + the `:77-78` "configurator primitive" comment, leaving
`@mkbabb/glass-ui/configurator` (`package.json:304`) as the sole reach. This makes the root barrel's
transitive-import graph tight and the rationale TRUE. No legacy alias (L invariant 4) — consumers
migrate the one import in lockstep (the only known glass-ui consumer reaches configurator via the
subpath already; aurora chrome composes it internally). The alternative path (b) — KEEP it on the
barrel (it IS vueuse-free, unlike dock/aurora) and EXCISE the false exclusion line — is recorded as the
fallback if RATIFY surfaces an external root-barrel consumer; either way the doc stops lying. Sweep the
same rationale-vs-reality audit across all 7 root-barrel custom packages for any other drift (note: W19
prunes glyph-face + disco-glyph from that set — coordinate the count, see Disjointness).

**(3) REPAIR the MIGRATION.md `RETIRED (AV.W10)` lie NOW + author `proof:no-retired-survivor` (F4) —
load-bearing, MOVED out of W28/W29 into W21.** The `MIGRATION.md:800-823` `RETIRED (AV.W10)` claim for
metric-cell/stack is a BINDING-DOC lie (L invariant 16) the charter originally only repaired in W29 — a
major wave gated behind the W28 cross-repo speedtest/muster native-receive blocker at the BACK of the
tranche, so the lie would persist through the entire dock+graphics+aurora+blob arc (digest line 372).
Fix it NOW: **rewrite the §RETIRED entry to tell the truth** — un-retired, speedtest-consumed (the
dirs/subpaths/`/api` exports/§17 tokens all survive because AW speedtest re-adopted them). Do NOT
re-land the retirement here (that is the W28→W29 cross-repo native-first DAG's job — see §4 note 8); W21
makes the DOC honest, the prune stays W29's. Author `proof:no-retired-survivor`: a gate that parses every
MIGRATION.md "RETIRED" heading and asserts the named dir/subpath/export/token resolves to ZERO surviving
artefact (born-RED at HEAD on the metric-cell/stack survivors; GREEN after the rewrite). Register the gate
in `gates.mjs` → routed to W33 (the gate-fleet registration owner); W21 AUTHORS + proves it born-RED→GREEN.

**(4) DISAMBIGUATE drawer live-behind + EXCISE the misleading detent buttons (F2).** Two Drawer-named
stories in two categories (`containers/drawer` `manifest.ts:143` + `compositions/drawer-live-behind`
`:238`) read as duplication; the live-behind story's `mode="live-behind"` is a real shipped feature
worth proving, but its Peek/Half/Full open-detent buttons hit the vaul-vue upstream re-snap limitation
(the story's own `:24-31` comment admits they only set the OPENING detent — a half-working interactive
that reads as broken). The gestalt fix: KEEP the proof but (a) retitle to "Drawer · live-behind mode" OR
fold it into the single `containers/drawer` home as a second section (parallels AV.W10 merging
bouncy-tabs → tabs and slider-variants → one slider) so there is ONE Drawer home; and (b) EXCISE the
misleading open-detent buttons — replace with the drag-the-handle path that actually works + one clear
instruction (the vaul-vue re-snap gap is upstream, not a glass-ui fix; stop shipping an affordance that
reads as broken). No glass-ui src behaviour change — a demo-story + affordance fix.

**(5) JUSTIFY-AND-ANNOTATE use-token-color (F3) — NO restructure.** `src/composables/dom/useTokenColor.ts`
(148 lines) is a well-formed, load-bearing, vueuse-FREE composable — the carefully-designed
root-barrel-safe alternative to reading `useGlobalDark` directly (it observes the cascade root via
MutationObserver + a `prefers-color-scheme` media query precisely so it stays vueuse-free and dodges the
SCC trap), with the AW.W15 injectable `TokenColorResolver` DI seam for SSR/test. It is NOT debris; it
satisfies the ≥2-sites overfitting bar (exported + real Canvas/Aurora substrate consumers + the demo).
The fix is documentation-shaped: enrich the reference-shelf blurb (`manifest.ts:254`) with the
load-bearing rationale ("vueuse-free so root-barrel-safe; the SCC-trap-aware alternative to reading
`useGlobalDark`; injectable resolver for SSR/test") + add ONE code comment at the file head explaining
the deliberate `dom/` placement (it is theme-reactivity-shaped but moving it to `dark/` would pull the
vueuse-bearing `/dark` subpath into its reach and defeat its purpose) so the next auditor does not
re-flag it. NO code change beyond the comment + blurb.

**(6) SHIP the Drawer `spring?` prop (digest fold (b) — keyframes consumer ask, genuinely open).** Add an
additive `spring?: boolean` (or a curve-name union) prop to `DrawerContent` that layers a
SpringProgress/`linear(spring)` curve (~240-300ms) over vaul's transform — the consumer opts into the
springy register without fighting vaul's internal `activeSnapPoint` write. glass-ui already ships
SpringProgress (`useSpringMount`/motion-core), so this is a wire not new machinery; every value the prop
supplies is overridable and the default preserves vaul's published curve (additive, no behaviour change
for existing consumers). vaul owns the SNAP math; glass-ui owns the LOOK — the prop only retunes the
open/close transition curve, not the detent physics. Prove it in the consolidated Drawer story (fold (4)).

**(7) RECONCILE the metric-pill subpath asymmetry (F4) — RATIFY: subpath-or-prune.** **RATIFY-BEFORE-IMPL
— recommended: give metric-pill a `/metric-pill` subpath** for surface symmetry (metric-badge/cell/stack
all have one; one family member without is inconsistent publication). Add `src/subpaths/metric-pill.ts`
(`export * from "../components/ui/metric-pill"`; the `vite.library.ts` glob auto-resolves the chunk) +
the `package.json` `./metric-pill` exports block + typesVersions row + the `flatten-subpath-types.mjs`
keeps `dist/metric-pill.d.ts` flat. The alternative — fold the zero-consumer pill into the W29 prune
(MetricPill has 0 real consumers at HEAD; substrate-without-consumer per L invariant 8) — is recorded as
the fallback IF RATIFY decides the metric family repatriates wholesale to speedtest (§8 ownership). W21
does NOT make the §8 repatriation decision (that is the W28/W29 cross-repo DAG); it resolves the
PUBLICATION-SYMMETRY defect or explicitly routes the pill to W29 with a recorded ledger note — no silent
asymmetry survives the wave.

**Charter-flagged decisions to RATIFY (recorded recommended path, marked RATIFY-BEFORE-IMPL):**
- **Configurator demote vs de-document** → recommended DEMOTE to subpath-only (path a); fallback
  de-document (path b) only if an external root-barrel consumer surfaces. RATIFY before touching
  `src/index.ts`.
- **metric-pill subpath vs W29-prune** → recommended ADD `/metric-pill` subpath (symmetry); fallback
  route-to-W29-prune if the §8 metric-family-repatriates-to-speedtest decision lands. RATIFY against the
  W28/W29 ownership call.

**Candidate-folds NOT in the §3 charter scope (record + route, do NOT execute unratified):** the
constellation digest routed two FURTHER asks "into AX.W21 OR …" that the §3 charter block does NOT
enumerate in W21's scope — the Configurator A-1/A-2 divider-rule + typography-ladder asks
(`result[2]`/digest line 34, self-booked AS/FINAL → "AX.W21b" candidate) and the ToggleChip
`--toggle-chip-active-{color,label-weight}` cohort (`result[17]` Q.Rh-1, digest line 214). The §3 block
DOES carry A-1/A-2 under "CONVERGE folds (a)" with a `proof:configurator-divider-rule`/typography-ladder
gate line — so A-1/A-2 ARE charter-scoped for W21 (RATIFY whether they ship in W21 or split to a "W21b"
per the digest, sequenced AFTER W25b's utilities carve but BEFORE W29 prunes the `.instrument-rail`
twin-line groove source A-1 ports from). The ToggleChip cohort is NOT in the §3 block — record it as an
open question to RATIFY into W21 or route to W34, do NOT execute unratified. The LabeledField
feature-gap + Input invalid-state contract (§3 fold (e)) IS charter-scoped — co-decide the glass-ui Input
invalid-state contract here (verify `useUserInvalidAria` composes with LabeledField's error slot; ship
the optional LabeledSlider tooltip/inline-numeric/value-color hook) since W21 already touches the
labeled-field/drawer surface.

**Fold (8) — kf-G-3 `LabeledField orientation="horizontal"` + the label-row ACTION slot (HARDENING §G #25;
§20 kf hand-off, HIGH).** Add an `orientation`/`inline` prop to `<LabeledField>` laying the row
`grid-template-columns: auto 1fr; align-items: center` with `.error { grid-column: 1 / -1 }` — the
macOS/iOS settings-row idiom (label-LEFT / value-RIGHT), DISTINCT from the labels-above data-entry-FORM idiom.
Every `Labeled*` consumer + the kf EditorHeader inherits the compact settings-row by ONE prop instead of
re-authoring a `grid-cols-[auto_1fr]` wrapper — the DURABLE home for kf's controls-row layout. Sub-ask: a
**label-row ACTION slot** (`<LabeledField>` exposes only `default`+`error` today; a label-row action slot lets
an "edit pencil" sit in the label row idiomatically). Anchor: `.labeled-field` `utilities.css:62` (block-flow
today — re-locate by NAME). Cross-repo gate: kf `proof:single-column-pack` label-left clause (path B demo
wrapper today → durable on the prop). The kf consume-leg routes through W34's ledger (born-RED until the AX
publish + the kf bump). **Note the configurator demote rests on SIZE, not the SCC trap — the configurator is
vueuse-FREE** (the demote-to-de-document path is about the root-barrel cherry-pick size rationale, not a
vueuse-bearing isolation — HARDENING §G #25 disambiguation).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/index.ts` | RESOLVE the configurator contradiction (fold 2): DELETE the `:125` root-barrel `export * from "./components/custom/configurator"` line + the `:77-78` "configurator primitive" comment (path a DEMOTE), leaving the rationale TRUE; OR (path b fallback) DELETE the `configurator domain helpers` token from the `:67-73` exclusion comment. RATIFY which. |
| `MIGRATION.md` | REWRITE the §`metric-cell + metric-stack subpaths RETIRED (AV.W10)` entry (lines 800-823) to tell the truth: un-retired, speedtest-consumed, the dirs/subpaths/`/api`-exports/§17-tokens all survive (fold 3). |
| `src/components/ui/drawer/DrawerContent.vue` | ADD the additive `spring?` prop layering a SpringProgress/`linear(spring)` curve over vaul's transform (fold 6; overridable, default preserves vaul's curve). |
| `src/components/ui/drawer/Drawer.vue` · `src/components/ui/drawer/index.ts` | Thread/co-export the `spring` prop + its type if the SpringProgress wire needs a root prop or a `DrawerSpring` type co-export (fold 6). |
| `src/subpaths/metric-pill.ts` | **NEW** — `export * from "../components/ui/metric-pill"` (fold 7, path a); the `vite.library.ts` glob auto-resolves the chunk. (NOT created if RATIFY routes the pill to W29 prune.) |
| `package.json` | ADD the `./metric-pill` `exports` block + `typesVersions['*']['metric-pill']` row (fold 7, path a). |
| `src/composables/dom/useTokenColor.ts` | ADD one file-head code comment explaining the deliberate `dom/` placement (the vueuse-free/SCC-trap rationale) — fold 5; NO restructure. |
| `demo/stories/compositions/drawer-live-behind.vue` | DISAMBIGUATE + EXCISE the half-working Peek/Half/Full open-detent buttons; replace with the drag-the-handle path + one clear instruction; prove the `spring?` prop (fold 4 + 6). (OR the story is folded INTO `containers/drawer.vue` as a second section — RATIFY.) |
| `demo/stories/containers/drawer.vue` | (IF the fold-into-one-home path is RATIFIED) ADD the live-behind section + the `spring?`-prop demo here (fold 4). |
| `demo/stories/manifest.ts` | The drawer-live-behind row (`:238`) retitle to "Drawer · live-behind mode" OR delete (if folded into `containers/drawer`); ENRICH the use-token-color reference-shelf blurb (`:254`) with the load-bearing rationale (fold 5); the hover-popover one-line blurb (fold 1, optional). |
| `src/components/custom/configurator/ConfiguratorLayer.vue` · `ConfiguratorRow.vue` · `src/styles/` (configurator CSS partial) | (IF A-1/A-2 are RATIFIED into W21 vs a W21b split) the machined-groove divider-rule opt-in (`data-attr` porting the `.instrument-rail` twin-line groove via `--surface-tint-*`) + the label/sub typography-ladder class-swap. SEQUENCE after W25b's utilities carve; CAPTURE the groove recipe BEFORE W29 prunes the `.instrument-rail` source. |
| `src/components/custom/labeled-field/LabeledSlider.vue` | (IF the §3 fold (e) LabeledField feature-gap is in scope) the optional (non-required) tooltip / inline-numeric-input / value-color hook. |
| `scripts/proof-no-retired-survivor.mjs` | **NEW** — the gate parsing every MIGRATION.md "RETIRED" heading + asserting zero surviving dir/subpath/export/token (fold 3; born-RED at HEAD; registration in `gates.mjs` → W33). |
| `scripts/proof-barrel-rationale-coherence.mjs` (or extend `proof-consumers-static.mjs`) | **NEW/EXTEND** — assert the `src/index.ts` cherry-pick rationale text matches the actual root-barrel custom-package export set (fold 2). |
| `docs/tranches/AX/audit/W21-primitive-recat-ledger.json` | **NEW** — the born-RED→GREEN ledger + the four satisfied-by-AV.W10 verify-only checkmarks + the two RATIFY dispositions. |

**OUT of bounds:** the §8 metric-family-repatriates-to-speedtest DECISION + the actual metric-cell/stack
retirement re-land (**W28/W29** own the cross-repo native-first DAG — W21 only makes the DOC honest +
reconciles the pill subpath, it does NOT prune); the `proof:no-retired-survivor` REGISTRATION in the
release gate-fleet (**W33** owns gate-fleet registration — W21 authors + born-RED→GREEN-proves it); the
configurator STORY re-move (already landed AV.W10 — verify-only); the hover-popover STORY re-move (already
landed — verify-only); the `useUserInvalidAria` composable itself (`src/composables/dom/useUserInvalidAria.ts`
is shipped — W21 only verifies it composes with LabeledField's error slot, it does not re-author it); the
glyph-face/disco-glyph cherry-pick removals (**W19** owns them — W21 coordinates the
`proof:barrel-rationale-coherence` count, see Disjointness); the speedtest/muster sibling source (W21
writes NO sibling source — the metric ownership is the W28/W29 cross-repo annex).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W18 (storybook IA ground-up reinvention — W21 dependsOn W18).** W18 authors the new category tree +
  re-baselines `EXPECTED_TREE` / `proof:storybook-ia` LAST over the W19/W20-pruned manifest. W21's
  recategorize-ledger is VERIFY-ONLY against W18's already-reinvented IA (it records the placements
  satisfied, it does NOT author the tree). **Disjoint by ownership:** W18 owns the CATEGORY-TREE + IA
  fixture re-baseline; W21 owns the four story-content disambiguations (drawer retitle, hover-popover
  blurb, use-token-color blurb enrichment) WITHIN the tree W18 froze. The shared `manifest.ts` is the
  collision surface — W21 touches the drawer-live-behind row (`:238`) + the use-token-color blurb (`:254`),
  W18 authors the whole tree; sequence W21 AFTER W18's re-baseline so W21's row edits land on the final
  tree, not mid-churn. W21 does NOT re-add any W19/W20-pruned primitive.
- **vs W19 (primitive prune A — header-ribbon/glyph-face/disco-glyph).** Both touch `src/index.ts` — W19
  REMOVES the glyph-face (`:120`) + disco-glyph (`:121`) cherry-pick `export *` lines + adjusts the "7
  cherry-picked custom/ packages" COUNT comment (7→5); W21 may DEMOTE configurator (`:125`) off the barrel.
  **Disjoint by line** (different `export *` lines) but the shared `proof:consumers-static`/the cherry-pick
  COUNT is the one collision: if W21 demotes configurator, the root-barrel custom count drops FURTHER
  (W19's 5 → 4). **Coordinate the count arithmetic at merge** — W19 owns the 7→5 (glyph-face + disco-glyph
  prune), W21 owns the 5→4 IF configurator demotes; the `proof:barrel-rationale-coherence` gate W21 authors
  must read the FINAL count (post-W19, post-W21). Sequence so the count comment is mutated by a known
  order; the lines are otherwise disjoint.
- **vs W20 (primitive fix — native-top-layer + card toggles + GlassPanel retire).** Sibling G-band wave;
  **disjoint by primitive set** — W20 touches GlassPanel + dialog-native + Card; W21 touches
  configurator/drawer/metric-pill/use-token-color. Both share `package.json` (exports) + `src/index.ts` but
  DIFFERENT entries (W20: glass-panel retire; W21: configurator demote + metric-pill add). The Card
  `specular` prop fold rides W09, not W21 — no overlap. Coordinate the shared-file lines at merge.
- **vs W22 (font register reconciliation).** Sibling G-band; **fully disjoint by surface** — W22 touches
  the font register (Plus Jakarta + Fira Code, Fraunces excision) + `theme.css`/`typography.css`; W21
  touches none of it. No shared file.
- **vs W25b (CSS monolith carves — utilities.css RELOCATE + `.instrument-rail` groove).** IF A-1/A-2 ship
  in W21, the `.instrument-rail` twin-line groove recipe A-1 PORTS FROM may MOVE when W25b carves
  utilities.css/tokens.css. **Disjoint by sequence** — A-1 sequences WITH/AFTER W25b's carve so it ports
  from the final location, not mid-churn (digest line 33). W21 does NOT carve the CSS monoliths; W25b does
  NOT touch the configurator/drawer surface.
- **vs W28/W29 (speedtest repatriation + metric-family ownership).** W29 RE-LANDS the metric-cell/stack
  retirement (the actual prune) + strikes the repatriated families AFTER the W28 cross-repo native-receive.
  W21 makes the MIGRATION.md DOC honest NOW (un-retired truth) + reconciles the metric-pill subpath
  asymmetry — it does NOT prune. **Disjoint by action** — W21: doc-truth + pill-subpath + gate-author;
  W29: the actual repatriation prune + MIGRATION.md re-write to the FINAL retired state. The
  `proof:no-retired-survivor` gate W21 authors is what W29 must keep GREEN after its prune (a coherence
  contract across the two waves). IF RATIFY routes the metric-pill to the W29 prune (fallback path), W21
  records the route + W29 executes — file-disjoint (W21: ledger note; W29: the prune).
- **vs W34 (cross-constellation idiom-maximization receiver).** The ToggleChip cohort + LabeledSlider
  under-featuring + the bbnf-buddy consumer-adoptions route to W34 IF NOT ratified into W21. **Disjoint by
  ownership** — W34 receives the §16 idiom census + routes adoptions; W21 ships ONLY the charter-§3-scoped
  folds. The ToggleChip cohort is the boundary case (digest routed it "into W21 OR the primitive-token
  work") — RATIFY into W21 or W34, do not double-execute.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms).** Arm A (the doc + barrel coherence — load-bearing,
  serial): RESOLVE the configurator contradiction in `src/index.ts` (RATIFY demote vs de-document FIRST);
  REWRITE the MIGRATION.md `RETIRED (AV.W10)` entry to the truth; ADD the metric-pill subpath +
  package.json blocks (RATIFY subpath vs W29-route FIRST); enrich the use-token-color blurb + add the
  file-head comment. Arm B (the drawer + story surface — parallel after the RATIFY decisions): ADD the
  `DrawerContent` `spring?` prop (the SpringProgress wire); DISAMBIGUATE the drawer-live-behind story +
  EXCISE the misleading detent buttons (retitle or fold-into-one-home per RATIFY); prove the `spring?`
  prop in the consolidated story; (IF A-1/A-2 + LabeledSlider are ratified into W21) the configurator
  divider-rule/ladder + the LabeledSlider optional tooltip/numeric/value-color. `vue-tsc` + `npm run build`
  at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the patched tree:
  asserts the configurator contradiction is GONE (the rationale text matches the export set — no
  `configurator` on the barrel AND named EXCLUDED, OR on the barrel AND NOT named excluded); asserts
  MIGRATION.md's §RETIRED entry no longer claims a survivor (every named dir/subpath/export/token in a
  "RETIRED" heading resolves to absent OR the heading is rewritten to non-retired); asserts
  `node -e 'import("@mkbabb/glass-ui/metric-pill")'` RESOLVES (the new subpath) and is symmetric with
  metric-badge; asserts `DrawerContent` carries the `spring?` prop + the SpringProgress curve renders.
  ADVERSARIAL twists: (a) tries to "pass" the MIGRATION.md repair by deleting the RETIRED heading entirely
  (confirms the gate requires the TRUTH be told — un-retired + speedtest-consumed — not the claim merely
  erased); (b) confirms the configurator demote did NOT break the aurora chrome's internal
  `useConfiguratorState` composition (it reaches it via the subpath/local import, not the root barrel); (c)
  confirms the drawer `spring?` prop is ADDITIVE — an existing consumer with no `spring` prop renders
  byte-identical (vaul's curve preserved); (d) confirms use-token-color was NOT restructured (still in
  `dom/`, still vueuse-free, only the comment + blurb added).
- **Gate-author (≤1 agent — net-new + coherence).** AUTHORS `proof:no-retired-survivor` (parse every
  MIGRATION.md "RETIRED" heading → assert zero surviving dir/subpath/export/token; born-RED at HEAD on the
  metric-cell/stack survivors → GREEN after the rewrite); AUTHORS/EXTENDS `proof:barrel-rationale-coherence`
  (the cherry-pick rationale text matches the actual root-barrel export set; born-RED at HEAD on the
  configurator contradiction → GREEN after the resolution); (IF A-1/A-2 ship) a
  `proof:configurator-divider-rule`/typography-ladder computed-style probe. Confirms each assertion FAILS
  at `eaba94f` and PASSES on the patched tree; routes the `proof:no-retired-survivor` REGISTRATION to W33.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement
+ 1 verify + 1 gate.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**

The wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — devise an in-FileBounds gestalt fix; spawn a tangent triumvirate to work AROUND an error; escalate ONLY when genuinely user-gated) + §6.2 (the 4-class halt-vs-work-around decision tree). It governs here by reference; the orchestrator may not redispatch the failing unit alone. The wave-specific §3a triggers (authored from this wave's FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2).** If the configurator demote or the metric-pill subpath add reveals an edit to a W19-owned `src/index.ts` cherry-pick line or the W29-owned metric prune, if the `proof:no-retired-survivor` REGISTRATION needs the W33-owned gate fleet, if the A-1/A-2 configurator-groove port needs the `.instrument-rail` source W29 prunes (capture BEFORE the prune, never re-author after), or if a ToggleChip-cohort / LabeledSlider adoption crosses into W34's idiom-census → HALT, dispatch the triumvirate. A sibling-owned surface is NEVER edited in-line.
- **Non-local gate failure → triumvirate (Class 2).** If `proof:barrel-rationale-coherence` reds on a cherry-pick count a sibling wave (W19/W20) co-mutates, or `proof:no-retired-survivor` reds on a MIGRATION.md "RETIRED" heading whose survivor is a W29-prune target → triumvirate (route the count arithmetic, do not absorb it).
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the `DrawerContent spring?` SpringProgress wire fails its additive byte-identical-default check for a third pass, or the drawer-live-behind disambiguation fails its live affordance read for a third re-author → HALT the failing unit + triumvirate.
- **§5.3 ratify reached un-ratified → halt-and-ratify (Class 3).** If a RATIFY-BEFORE-IMPL item reaches impl un-adjudicated — the configurator demote-vs-de-document path, the metric-pill subpath-vs-W29-route, the drawer-story retitle-vs-fold-into-one-home, the A-1/A-2-in-W21-vs-W21b split, or the kf-G-6 cartoon-quiet preset RATIFY → stop, surface to the orchestrator, never self-ratify.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`vue-tsc --noEmit` GREEN** — after the configurator demote + the `DrawerContent` `spring?` prop + the
   metric-pill subpath barrel, the typegraph resolves with no dangling import (the demoted configurator is
   still reachable via the subpath; the new `spring` prop typechecks; `metric-pill.ts` re-exports cleanly).
   A build artefact (the precept-valid form).
2. **`npm run build` GREEN** — the `vite.library.ts` subpaths glob auto-resolves `dist/metric-pill.js` +
   its `.d.ts` from the new `src/subpaths/metric-pill.ts`; `verify-export-types` probes the new
   `./metric-pill` export. **Born-RED** if the `package.json` `./metric-pill` block points at a dist file
   the glob did not emit (the probe reds); GREEN after both land together. A build/deletion artefact.
3. **`proof:no-retired-survivor` (NET-NEW, born-RED at HEAD)** — parses every MIGRATION.md "RETIRED"
   heading and asserts each named dir/subpath/export/token resolves to ZERO surviving artefact. **Born-RED**
   at `eaba94f`: the metric-cell/stack "RETIRED (AV.W10)" claim has live survivors
   (`src/subpaths/metric-cell.ts`, `package.json:320/324`, `src/api/index.ts:215-228`, `tokens.css:1197-1220`).
   **GREEN** after the §RETIRED entry is rewritten to the truth (un-retired, speedtest-consumed → the
   heading no longer asserts a retirement, so no survivor to find). A build/deletion-PROOF artefact (NOT a
   runtime grep — it asserts the doc-claim resolves against the filesystem/exports). Registration → W33.
4. **`proof:barrel-rationale-coherence` (NET-NEW/EXTEND, born-RED at HEAD)** — asserts the `src/index.ts`
   cherry-pick rationale text matches the actual root-barrel custom-package export set. **Born-RED** at
   HEAD: configurator is named EXCLUDED (`:67-73`) yet exported (`:125`). **GREEN** after the demote (or
   the de-document). A structural/diff artefact.
5. **`proof:storybook-ia` GREEN (unchanged-or-re-baselined)** — the four recategorized stories' placements
   (hover-popover/containers, configurator/compositions) stay GREEN (verify-only — already satisfied
   AV.W10); the drawer-live-behind retitle/fold re-baselines its row IF the title/slug changes (coordinated
   with W18, who owns the tree). Confirms the recategorize-ledger close did NOT regress the IA.
6. A **headless mount/render probe** for the `DrawerContent` `spring?` prop (born-RED at HEAD): mount
   `<Drawer><DrawerContent spring>…</DrawerContent></Drawer>`, assert the SpringProgress curve attaches
   (the prop is wired, not a dead attr). **Born-RED** — `spring` is not a prop at HEAD (vue-tsc would red
   on the unknown prop); GREEN after the wire. A test artefact.

These are build / structural / deletion / test artefacts (the precept-valid forms per SPEC.md §Hard
Gates) — NOT grep-for-source-string-as-runtime-behaviour gates.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass over the storybook, in **light AND dark** at **≥ 3 viewports** (375×667 / 1280×800 /
1440×900):
- **The four recategorized stories read coherently:** navigate to `containers/hover-popover` (breadcrumb
  `CONTAINERS · HOVER POPOVER`, floating-surface neighbours), `compositions/configurator` (the
  preset-row + layered-controls + live-stage), the use-token-color reference shelf (the swatch
  re-resolves on a dark-mode toggle WITHOUT remount, the enriched blurb reads), and the consolidated
  Drawer home — affordance/hierarchy/spacing/padding hold, no visual occlusion, no console error.
- **The drawer live-behind disambiguation + the `spring?` prop:** the ONE Drawer home renders both the
  modal + live-behind sections; the misleading Peek/Half/Full open-detent buttons are GONE (replaced with
  the drag-the-handle affordance + one instruction that actually works through a live drag); the `spring`
  prop drawer opens/closes on the springy ~240-300ms curve, visibly distinct from the default vaul curve,
  with no janky double-snap.
- **The metric-pill subpath symmetry:** the `primitives/metric-pill` story renders the pill (composition
  of MetricBadge) correctly; the import-from-subpath path resolves (a live `node -e import` probe in the
  audit). NOTE the slice-flagged minor visual defect (the "CLUSTER · GLASSDOCK CONTAINERNAME HOST" dock
  pills appear to collide/clip with the descriptive text below) — confirm whether it is a W21 surface or
  routes to the §1 dock-overflow-wrap (W04) band; record the disposition.
- **(IF A-1/A-2 ship) the configurator divider-rule + ladder-bound labels:** the machined-groove
  inter-row divider opt-in renders (catch-light over under-shadow, dark-aware) and the label/sub read on
  the typography-ladder rungs — this RESTYLES every configurator label across consumers, so it is a
  binding π-lane visual verification, not a headless probe.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `eaba94f`
   live: the configurator contradiction (`src/index.ts:67-73` excludes it, `:125` exports it); the
   MIGRATION.md `RETIRED (AV.W10)` lie (the metric-cell/stack survivors live); the metric-pill subpath
   asymmetry (metric-badge HAS a subpath, pill does not); the absent `DrawerContent` `spring?` prop. Record
   them in `audit/W21-…json` as the born-RED baseline. Re-verify the FOUR recategorize-recap items are
   ALREADY SATISFIED at HEAD (do NOT re-move). RATIFY the two decisions (configurator demote-vs-document;
   metric-pill subpath-vs-W29-prune) + whether A-1/A-2 + LabeledSlider + ToggleChip ship in W21.
2. **LEDGER-CLOSE the stale recategorize asks (fold 1) — verify-only.** Record hover-popover (containers),
   configurator-STORY (compositions), metric-badge/pill keep-both, use-token-color load-bearing as
   satisfied-by-AV.W10; add the optional hover-popover blurb. No code move.
3. **RESOLVE the configurator root-barrel contradiction (fold 2).** Per the RATIFY decision: DEMOTE
   (delete the `:125` export + `:77-78` comment) or DE-DOCUMENT (delete the exclusion token). `vue-tsc` +
   `npm run build`.
4. **REPAIR the MIGRATION.md lie + author `proof:no-retired-survivor` (fold 3).** Rewrite the §RETIRED
   entry to the truth (un-retired, speedtest-consumed); author the gate born-RED at HEAD → GREEN after the
   rewrite; route registration to W33.
5. **RECONCILE the metric-pill subpath asymmetry (fold 7).** Add `src/subpaths/metric-pill.ts` +
   `package.json` `./metric-pill` block + typesVersions (path a), OR record the W29-prune route (fallback).
   `npm run build` (the chunk-emit + export-probe).
6. **DISAMBIGUATE the drawer story + EXCISE the detent buttons + SHIP the `spring?` prop (folds 4 + 6).**
   Add the `DrawerContent` `spring?` prop (SpringProgress wire); retitle/fold the live-behind story; excise
   the misleading buttons; prove the prop in the consolidated story. `vue-tsc` + `npm run build`.
7. **JUSTIFY-AND-ANNOTATE use-token-color (fold 5).** Add the file-head placement comment + enrich the
   reference-shelf blurb. No restructure.
8. **(IF RATIFIED) the A-1/A-2 configurator divider/ladder + the LabeledSlider feature-gap.** Sequence
   AFTER W25b's utilities carve; capture the `.instrument-rail` groove recipe BEFORE W29 prunes it.
9. **Gates GREEN.** Author/extend `proof:barrel-rationale-coherence`; confirm `proof:no-retired-survivor`,
   `proof:storybook-ia`, vue-tsc, build all GREEN; run the VISUAL-TRUTH live storybook audit; capture the
   paired-π BEFORE/AFTER + DELTA; route the §8 metric-ownership decision to W28/W29 + the ToggleChip/
   LabeledSlider folds to their ratified home; write `audit/W21-…json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W21-primitive-recat-ledger.json` — the born-RED→GREEN ledger: the four RED
  witnesses (configurator contradiction, MIGRATION.md lie, metric-pill asymmetry, absent drawer-spring),
  the four satisfied-by-AV.W10 verify-only checkmarks (with the `0b27f01` git evidence + the live
  breadcrumb confirmation), the per-finding (F0-F4) disposition, the two RATIFY dispositions (configurator
  demote vs de-document; metric-pill subpath vs W29-route), and the post-wave GREEN measurements (the
  rationale-vs-export coherence, the MIGRATION.md truth, the new `/metric-pill` resolution, the drawer
  `spring?` prop render).
- The `proof:no-retired-survivor` gate script (`scripts/proof-no-retired-survivor.mjs`) + its born-RED
  evidence (the metric-cell/stack survivors at HEAD) → GREEN evidence (the rewritten §RETIRED entry).
- The `proof:barrel-rationale-coherence` gate + its born-RED (configurator named-excluded-yet-exported) →
  GREEN evidence.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the drawer-live-behind story
  before/after (two Drawer homes + misleading detent buttons → one home + the drag-affordance + the
  springy curve), the configurator-story placement (verify-only, unchanged), the use-token-color reference
  shelf (the dark-toggle re-resolve), at ≥ 3 viewports × light/dark.
- A §8 metric-ownership NOTE annex (routed to W28/W29, NOT executed here): the metric-family home decision
  (repatriate-to-speedtest vs keep-and-symmetrize) + the actual metric-cell/stack retirement re-land that
  W29 owns; the `proof:no-retired-survivor` gate is the coherence contract W29 must keep GREEN.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(recat): W21 born-RED baseline — configurator barrel contradiction + MIGRATION.md RETIRED lie + metric-pill subpath asymmetry + absent drawer spring (AX.W21)`
2. `docs(recat): ledger-close the stale §7 recategorize asks satisfied-by-AV.W10 — hover-popover/configurator-story/keep-both/use-token-color verify-only (AX.W21 F0/F1-story/F3/F4)`
3. `refactor(barrel): resolve the configurator root-barrel/rationale contradiction — demote to subpath-only + proof:barrel-rationale-coherence (AX.W21 F1)`
4. `docs(migration): repair the metric-cell/stack RETIRED(AV.W10) lie — un-retired/speedtest-consumed truth + proof:no-retired-survivor born-RED→GREEN (AX.W21 F4)`
5. `feat(metric-pill): /metric-pill subpath for surface symmetry — barrel + package.json exports + typesVersions (AX.W21 F4)`
6. `feat(drawer): DrawerContent spring? prop (SpringProgress curve over vaul) + disambiguate the live-behind story + excise the misleading open-detent buttons (AX.W21 F2 + keyframes D13)`
7. `docs(use-token-color): justify-and-annotate — vueuse-free/SCC-trap placement comment + enriched reference-shelf blurb, no restructure (AX.W21 F3)`
8. `chore(AX.W21): audit ledger GREEN + paired-π drawer/configurator capture + route §8 metric-ownership to W28/W29`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W18 (storybook IA ground-up reinvention) — the charter dependsOn (AX.md:1116).** W18 authors the
  new category tree + re-baselines `proof:storybook-ia`/`EXPECTED_TREE` over the W19/W20-pruned manifest.
  W21's recategorize-ledger close is VERIFY-ONLY against W18's already-reinvented IA — it records the
  hover-popover/configurator placements satisfied WITHIN the tree W18 froze, and its drawer-story
  retitle/fold lands on the FINAL tree, not a mid-churn one. Without W18 the IA is unstable and the
  ledger-close would record a placement W18 then moves. (Charter `### AX.W21` dependsOn AX.W18, line 1116.)
- **AX.W00 (π visual-runtime lane) — the close machinery (transitive, via the band).** The fail-CLOSED π
  workspace is the home of the live storybook audit + the paired-π BEFORE/AFTER + DELTA — the binding close
  criterion (the four recategorized stories + the drawer disambiguation + the configurator divider-rule
  render live, never a headless proof alone). The drawer `spring?` curve + the configurator label-ladder
  restyle especially need pixel-truth (the ladder restyles every consumer label).
- **Downstream / coordination (not blockers):**
  - **AX.W28/W29 (speedtest repatriation + metric ownership)** receive the §8 metric-family home decision
    + the actual metric-cell/stack retirement re-land; W29 must keep `proof:no-retired-survivor` GREEN
    after its prune (the coherence contract W21 authors). W21 makes the DOC honest NOW; W29 does the prune.
  - **AX.W33 (close)** registers `proof:no-retired-survivor` in the release gate-fleet (W21 authors +
    proves it born-RED→GREEN; W33 wires it into `proof:ax-final`).
  - **AX.W25b (CSS carves)** — IF A-1/A-2 ship in W21, A-1 sequences WITH/AFTER W25b's utilities carve (the
    `.instrument-rail` groove source moves) and BEFORE W29 prunes the twin-line-divider @utility.
  - **AX.W34 (idiom-maximization receiver)** receives the ToggleChip cohort + LabeledSlider under-featuring
    + the bbnf-buddy consumer-adoptions IF NOT ratified into W21.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`0b27f01`** (AV.W10 "structural waves W16 + W10 + W13 + W14 (Tailwind, storybook+font, god-modules,
  DI/hygiene)") — the SATISFIED-BY origin: AV.W10 MOVED hover-popover (primitives → containers) +
  configurator-STORY (primitives → compositions) per its plan §3.1. The §7 recategorize directives are a
  verbatim recap of the PRE-AV.W10 prompt (git-confirmed: `git show 0b27f01^:demo/stories/manifest.ts:106`
  had configurator under `primitives`, `:131` had hover-popover under `primitives`). The audit's CARDINAL
  FINDING: 3 of the 5 slice-17 items were ALREADY resolved here — re-moving them would be churn (§4 note 4).
  AV.W10's `W10-prune-pushback.md` §4 is the keep-both verdict for metric-badge/pill (composition, not
  dedup).
- **`src/index.ts:67-73`** (the cherry-pick rationale comment) vs **`:125`** (the configurator export) —
  the live contradiction: the rationale names configurator among the EXCLUDED "large composite chassis with
  nested composables" yet the export ships it on the root barrel. `package.json:304` (the `/configurator`
  subpath also exists). The defect was minted when configurator was promoted onto the barrel without
  reconciling the exclusion rationale (the doc and the export drifted).
- **MIGRATION.md:800-823** (the `RETIRED (AV.W10)` entry) CONTRADICTED BY the AW speedtest re-adoption:
  `src/subpaths/metric-cell.ts`/`metric-stack.ts`, `package.json:64/67/320/324`, `src/api/index.ts:215-228`
  ("speedtest consumes them"), `tokens.css:1197-1220` (§17) all survive. The retirement was landed at
  AV.W10 then HALF-REVERTED by an AW speedtest re-adoption and the binding migration guide was never
  reconciled — the exact AW "doc-says-done but reverted" failure class on a BINDING document (L invariant
  16). Digest line 372: the charter originally only repaired this in W29 (behind the W28 cross-repo
  blocker), so the lie would ride the entire tranche — MOVED to W21 (digest line 373).
- **AS/FINAL.md:146-155** — glass-ui SELF-BOOKED the Configurator A-1 (machined-groove inter-row
  divider-rule porting the `.instrument-rail` twin-line groove) + A-2 (label/sub typography-ladder
  class-swap) to "the glass-ui AT/3.3.0 release" with an explicit kill-date, then DROPPED them (the next
  tranche never shipped them). AX is the actual post-AW successor; fourier J.W5/K rides `.chassis-divider`
  + a fourier-local ladder MEANWHILE because glass-ui owes these (constellation `result[2]`/digest line
  29). The `.instrument-rail` source A-1 ports from is excised by W29's twin-line-divider @utility removal
  — A-1 must capture the recipe BEFORE that prune.
- **keyframes.js `a-glass-ui-consumption.md` D13** (constellation `result[0]`) — the genuinely-open Drawer
  `spring?` prop ask: keyframes' mobile drawer rides glass-ui `<Drawer>` whose 500ms
  `cubic-bezier(.32,.72,0,1)` glass-ui documents it does NOT override (`drawer.css:30`) — the "too slow,
  not springy" the consumer reports; confirmed OPEN at HEAD (`DrawerContent.vue` grep `spring/transition`
  = empty). glass-ui already ships SpringProgress (`useSpringMount`/motion-core) — the prop is a wire.
- **AW.W15** — the `useTokenColor` injectable `TokenColorResolver` DI seam (the SSR/test resolver) the
  use-token-color justify-fold annotates as load-bearing.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: configurator on the root
  barrel + named excluded, the MIGRATION.md lie live, metric-pill without a subpath, no drawer `spring?`
  prop.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-G binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **binding-doc honesty / documentation-is-part-of-the-change (precepts/README.md "Wave close updates docs
  before the next wave opens." line 16; L invariant 16 — the migration guide is binding).** The MIGRATION.md
  `RETIRED (AV.W10)` claim is a binding-doc LIE — a completed-retirement assertion the artefacts contradict.
  The wave REPAIRS it (un-retired, speedtest-consumed truth) NOW, not deferred to W29, and authors
  `proof:no-retired-survivor` so the lie cannot recur. The configurator cherry-pick rationale ("excluded …
  configurator domain helpers") is ALSO a doc-lie against the export — resolved (demote or de-document) so
  the doc tells the truth. MUST NOT leave either doc-claim contradicting the artefacts.
- **no-overfitting (precepts/README.md "No overfitting. A public surface, helper, … needs a current
  consumer and evidence. Otherwise delete it." lines 10-12; precepts/audits/overfitting-audit.md).** The
  zero-consumer MetricPill is the overfitting case — the wave does NOT manufacture a fake consumer to
  justify it; it gives the family surface symmetry (the `/metric-pill` subpath) OR routes the pill to the
  W29 prune (the precept-valid disposition for an unconsumed primitive). use-token-color is the inverse —
  the audit's "wtf" is REFUTED: it is load-bearing (≥2 real substrate consumers + the SCC-trap dodge), so
  the wave JUSTIFIES-AND-ANNOTATES (it is NOT debris) rather than deletes. MUST NOT over-prune the
  load-bearing composable or over-keep the unconsumed pill.
- **one-path / no-legacy-code (no-backwards-compat memory; SPEC.md §"no shadow APIs or temporary
  compatibility layers").** The configurator demote is a CLEAN break — no legacy alias, no `@deprecated`
  root-barrel re-export; consumers migrate the one import (L invariant 4). The drawer `spring?` prop is
  ADDITIVE over vaul's single path (no parallel transition machinery — it layers SpringProgress over the
  existing transform). The drawer detent-button excision REMOVES the half-working affordance (the vaul-vue
  re-snap limitation is upstream — glass-ui does NOT ship a workaround that reads as broken; it excises and
  exposes the path that works). MUST NOT ship a configurator compat-shim or a parallel drawer transition
  engine.
- **substrate-with-consumer / wire-before-retire (precepts/README.md "Substrate and consumer land
  together." line 8; SPEC.md §"Every wave lands substrate with its consumer or deletes the substrate").**
  The metric-pill subpath ships WITH its publication symmetry (or the pill is routed to retire); the §8
  metric-family ownership (the actual retirement) is the W28→W29 native-first DAG (migrate-before-prune,
  §4 note 8) — W21 makes the DOC honest, it does NOT prune ahead of the cross-repo native-receive. The
  Drawer `spring?` prop lands WITH its demo-story consumer + the keyframes consumer ask as the ≥2 witness.
  MUST NOT retire the metric family ahead of the speedtest/muster native-receive.
- **Gates close on evidence (precepts/README.md line 13; SPEC.md §Hard Gates — build/test/runtime/diff/
  deletion, NOT "grep found a source string for runtime behaviour").** The gates are build (`vue-tsc`/`npm
  run build` + the metric-pill chunk-emit + export-probe), structural/diff (`proof:barrel-rationale-coherence`
  — rationale text vs export set), deletion-PROOF (`proof:no-retired-survivor` — the doc-claim resolves
  against the filesystem/exports), and a mount/render test (the drawer `spring?` prop wire) — the
  precept-valid artefact forms. The close is the executed live storybook Playwright pass (the four stories
  read coherently + the drawer disambiguation + the configurator divider-rule render), never a headless
  proof alone — the cardinal AX precept.
- **no-silent-deferrals (precepts/instructions/tranche/SPEC.md §"consumer will be wired later" is NOT a
  valid gate; the §16.4 zero-loss).** The §8 metric-family ownership decision + the actual retirement are
  ROUTED to W28/W29 with the `proof:no-retired-survivor` coherence contract (an explicit handoff, not a
  drop); the `proof:no-retired-survivor` REGISTRATION is routed to W33 (named, not assumed); the ToggleChip
  cohort + LabeledSlider feature-gap are RATIFIED into W21 or explicitly routed to W34 (no silent
  candidate-fold). The four recategorize-recap items are CHECKMARKED satisfied-by-AV.W10 with git evidence,
  not silently assumed-done. MUST NOT let the MIGRATION.md lie ride to W29 (the digest's explicit "FIX THE
  LIE NOW") nor leave any fold silently un-routed.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **Configurator demote vs de-document (F1) — RATIFY-BEFORE-IMPL.** **Recommendation:** DEMOTE configurator
   OFF the root barrel to subpath-only (path a — the idiomatic choice matching dock/aurora; it has the
   `useConfiguratorState` nested composable + is a 956-line family, failing the rationale's criterion (b)).
   The fallback (path b — keep it on the barrel since it IS vueuse-free, excise the false exclusion line) is
   recorded for the case where RATIFY surfaces an external root-barrel consumer that would break on the
   demote. RATIFY which BEFORE touching `src/index.ts` — the demote is a clean break (no legacy alias) so it
   needs the consumer-roster confirmation (the only known glass-ui consumer reaches configurator via the
   subpath already).
2. **metric-pill subpath vs W29-prune (F4) — RATIFY-BEFORE-IMPL.** **Recommendation:** give metric-pill a
   `/metric-pill` subpath for surface symmetry (metric-badge/cell/stack all have one). The fallback —
   route the zero-consumer pill to the W29 prune — is correct IF the §8 metric-family-repatriates-to-speedtest
   decision lands (then the whole family retires from glass-ui). RATIFY against the W28/W29 ownership call:
   if the family STAYS in glass-ui, symmetrize NOW; if it REPATRIATES, route the pill to W29. Either way the
   asymmetry does not silently survive.
3. **A-1/A-2 in W21 vs a "W21b" split — RATIFY-BEFORE-IMPL.** The §3 charter "CONVERGE folds (a)" carries
   the Configurator A-1 (machined-groove divider-rule) + A-2 (typography-ladder labels) asks with a
   `proof:configurator-divider-rule` gate line — so they ARE charter-scoped for W21. The digest (line 34)
   proposed splitting them to a "AX.W21b". **Recommendation:** ship A-1/A-2 in W21 IF the labeled-field/
   configurator surface is already open (it is — folds 4/5/6 touch it), sequenced AFTER W25b's utilities
   carve and BEFORE W29 prunes the `.instrument-rail` groove source A-1 ports from; split to W21b only if
   the W25b/W29 sequencing forces it. RATIFY the split decision against the W25b/W29 schedule.
4. **The ToggleChip `--toggle-chip-active-{color,label-weight}` cohort (constellation Q.Rh-1) — RATIFY into
   W21 or route to W34.** The digest routed it "into AX.W21 (primitive-token band-G) OR the primitive-token
   work" but the §3 charter W21 block does NOT enumerate it. **Recommendation:** it is a small token-cohort
   gap mirroring the dock `--dock-active-*` precedent and fits the band-G token-coherence theme — RATIFY it
   into W21 IF the wave has capacity, else route to W34 (the idiom-maximization receiver) with the
   bbnf-buddy `:deep([data-state=on])` consumer reach as the ≥2 witness. Do NOT execute unratified.
5. **LabeledField feature-gap + Input invalid-state contract (§3 fold (e)) scope boundary.** The §3 block
   folds the LabeledSlider under-featuring (optional tooltip/inline-numeric/value-color hook) + co-deciding
   the glass-ui Input invalid-state contract (the W32 DeckGate + muster SettingsDialog error-pattern asks
   need the contract, verify `useUserInvalidAria` composes with LabeledField's error slot) into W21.
   **Recommendation:** ship the OPTIONAL (non-required) LabeledSlider hooks + VERIFY-ONLY the
   `useUserInvalidAria`↔LabeledField error-slot composition (the composable is already shipped — do NOT
   re-author it). RATIFY whether the full invalid-state contract design lands in W21 or splits, given it
   feeds W32/muster downstream.
6. **The drawer-live-behind disambiguation shape (F2) — retitle vs fold-into-one-home.** **Recommendation:**
   fold the live-behind proof INTO `containers/drawer.vue` as a second section (one Drawer home — parallels
   AV.W10's bouncy-tabs → tabs merge) rather than merely retitling, since two Drawer-named stories in two
   categories is the discoverability defect the audit flagged. RATIFY whether the fold-into-one-home (more
   coherent) vs retitle-in-place (smaller diff) is the idiomatic choice against the W18 IA tree.
