# AX.W19 — Primitive prune A: header-ribbon + glyph-face + disco-glyph excision

**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00 (· AX.W35 is the cross-repo
HARD PREDECESSOR of the PUBLISH, not of the in-repo prune) · **Charter** AX.md §3 (the `### AX.W19`
block, lines 1039-1069) + the §1 summary row (line 127) + §4 note 3 (the icon-button-token-ladder is
RENAMED-not-cut, lines 2004-2007) + §4 note 4 (re-verify each §7 item against HEAD before acting, lines
2009-2013) + §4 note 8 (the cross-repo-DAG native-first / migrate-before-prune class, lines 2032-2036) +
§2b band-G precept row (line 219) · **Audit** `deep-audit-corpus.json` slice `primitive-prune-A` (index
16, findings F0=header-ribbon / F1=glyph-face / F2=icon-button-token-ladder-VERIFIED-REMOVED /
F3=disco-glyph, plus the SLICE VERDICT + gate-ledger notes) + `constellation-analysis-corpus.json`
`result[11]` (`idiom:keyframes.js` — the HeaderRibbon LIVE consumer) + `result[21]`
(`leverage:keyframes.js` — the EditorShell consumer-migration blocker).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `eaba94f` on four falsifiable witnesses that do NOT hold today. Each was
re-proven live against HEAD (not trusted from the audit) — the §0 cardinal "re-verify before acting":

- **RED witness 1 (header-ribbon ships LIVE with ZERO in-repo binary consumers).** The dir
  `src/components/custom/header-ribbon/` exists (HeaderRibbon.vue + index.ts + types.ts); it is NOT on the
  root barrel but IS a published surface — `src/subpaths/header-ribbon.ts` exists, `package.json` exports
  the `./header-ribbon` block (lines 308-310) + `typesVersions['*']['header-ribbon']` (lines 118-119),
  `src/api/index.ts:196-204` re-exports `HeaderRibbonPosition`/`HeaderRibbonProps`, the demo
  `demo/stories/navigation/header-ribbon.vue` + manifest row (`:165`), the IA slug `header-ribbon` in
  `proof-storybook-ia.mjs:55` (navigation cohort), and the FIXTURE name `HeaderRibbon` in
  `tests/scripts/storybook-complete.detect.test.ts:29/33/34`. The falsifiable RED: *`test -d
  src/components/custom/header-ribbon` → EXISTS; `node -e 'import("@mkbabb/glass-ui/header-ribbon")'`
  RESOLVES; `grep -c header-ribbon package.json` > 0 (RED). After the wave: dir GONE, subpath import 404s
  at resolution, ZERO `header-ribbon` refs in package.json/api/manifest/gates (GREEN).*

- **RED witness 2 (glyph-face ships LIVE on the root barrel + manufactures an intra-library DI coupling).**
  `src/components/custom/glyph-face/` (GlyphFace.vue + index.ts + keys.ts) exists; it is ON THE ROOT BARREL
  (`src/index.ts:120` `export * from "./components/custom/glyph-face"`, one of the 7 cherry-picks named in
  the `:53` rationale); `/glyph-face` subpath + package.json exports (lines 384-386) + typesVersions (lines
  106-108); CSS `src/styles/glyph-face.css` + its `@import` at `index.css:130` + cascade comment `:102`;
  demo `demo/stories/primitives/glyph-face.vue` + manifest `:131` + IA slug `:46`. The MANUFACTURED
  COUPLING is live: `src/components/custom/disco-glyph/DiscoGlyph.vue:3` imports
  `useOptionalGlyphFaceSilhouette` from `../glyph-face/keys` and `:82-91` writes the silhouette up the
  `GLYPH_FACE_SILHOUETTE_KEY` optional-context slot (`keys.ts:32-36`). Three gate scripts register the
  seam: `proof-di-consistency.mjs:62` (`glyph-face/keys.ts: "optional"`), `proof-consumers-static.mjs:139`
  (root-contract ledger), `gates.mjs:387` (the DI-triplet note string); plus the `createContext.ts:5`
  doc-comment list. The falsifiable RED: *`grep -c glyph-face src/index.ts` = 1 (RED, on the root barrel);
  `proof:di-consistency` lists `glyph-face/keys.ts` (RED). After: ZERO `glyph-face` on the root barrel +
  the three gate ledgers, the disco-glyph import severed (GREEN).*

- **RED witness 3 (disco-glyph's "second consumer" is a manufactured demo — the circular justification).**
  `src/components/custom/disco-glyph/` (DiscoGlyph.vue + index.ts) ships ON THE ROOT BARREL
  (`src/index.ts:121` + `:54` rationale); `/disco-glyph` subpath + package.json exports (lines 388-390) +
  typesVersions (lines 109-110); CSS `src/styles/disco-glyph.css` + `index.css:131` `@import` + comment
  `:103`; demo `demo/stories/primitives/disco-glyph.vue` + manifest `:132` + IA slug `:46`;
  `proof-consumers-static.mjs:140` ledger. The ONLY non-self demo touch-point is
  `demo/stories/foundations/chart-chassis-palette.vue:16,60-99` — the `:6` comment dates it "L.W3 Lane B —
  second-consumer wiring," i.e. a demo authored to clear the ≥2-consumer bar, and its `:61` blurb claims
  "primary-audacious CTAs" compose it (no `src` grep bears this out). The falsifiable RED: *disco-glyph's
  ONLY consumer beyond its own story is a demo manufactured to satisfy the overfitting bar, and its sole
  compositional purpose (feeding a GlyphFace cap) is dead weight (the `useOptionalGlyphFaceSilhouette`
  handoff at `DiscoGlyph.vue:3,82-91 → ` a now-deleted cap) (RED). After: dir GONE, the chart-palette
  swatch grid re-expressed as a plain token-color tile, ZERO disco-glyph refs (GREEN).*

- **RED witness 4 (the icon-button-token-ladder verified-removed claim is UN-checkmarked).** §4 note 3 +
  F2: `/dock/icon-button-token-ladder` was EXCISED at `0b27f01` — `git ls-files --error-unmatch
  demo/stories/dock/icon-button-token-ladder.vue` errors "did not match," and `demo/stories/dock/` does not
  exist at HEAD. This is ALREADY DONE but un-recorded — a confirm-and-close, NO edit. The falsifiable RED:
  *the §7 item is on the AX ledger but carries no git-evidence checkmark (RED — un-recorded). After: the
  wave's audit json records the `0b27f01` excision evidence + the do-not-touch guardrail (the live
  `TokenLadder.vue`/`ToneSwatch.vue` chassis primitives + the W06-owned `dock-active-tokens.vue` debris are
  NOT this wave's), checkmarked (GREEN).*

The wave is RED at HEAD on witnesses 1-3 (live surfaces) and un-checkmarked on witness 4; the HardGate
drives each to GREEN.

---

## Goal

`header-ribbon`, `glyph-face`, and `disco-glyph` are excised cleanly from glass-ui — dir + subpath + root
barrel + `api/index.ts` + package.json exports/typesVersions + CSS + `@import` + demo story + manifest row
+ IA slug + the three gate ledgers — with the `glyph-face`↔`disco-glyph` silhouette DI coupling severed
(glyph-face before disco-glyph) and the icon-button-token-ladder confirmed VERIFIED-REMOVED, leaving a
green build, vue-tsc, and the re-run consumer/DI/IA gates with NO dangling routes or imports.

---

## Scope (the gestalt fix — no workaround, no legacy alias, no rehome)

The root cause spanning all three primitives is ONE class: **substrate-without-consumer** (J invariant 10
/ L invariant 8) — each was promoted on the strength of "has a demo story," never "≥2 binary consumers,"
and glyph-face/disco-glyph additionally manufacture an intra-library DI coupling to fake a consumer for
each other. The gestalt fix is to EXCISE, not bridge — no legacy alias, no rehome, per §0 "excise or fail
explicitly" + the no-backwards-compat memory. Four ORDERED folds; the glyph-face→disco-glyph order is
LOAD-BEARING (a missed severance leaves a dangling import that breaks the build — the slice's named
regression hotspot):

**(1) DELETE header-ribbon (F0) — independent, no coupling.** Excise the whole dir
`src/components/custom/header-ribbon/`; delete `src/subpaths/header-ribbon.ts` (the `vite.library.ts`
glob auto-drops the chunk — no manual chunk edit); delete the `./header-ribbon` `package.json` exports
block (lines 308-310) + `typesVersions['*']['header-ribbon']` (lines 118-119); delete the
`src/api/index.ts` `// ── HeaderRibbon ──` header + `HeaderRibbonPosition`/`HeaderRibbonProps` re-export
block (lines 196-204); delete `demo/stories/navigation/header-ribbon.vue` + the manifest `:165` row;
delete the `header-ribbon` slug from `proof-storybook-ia.mjs:55`; SWAP the `HeaderRibbon` FIXTURE name in
`tests/scripts/storybook-complete.detect.test.ts:29/33/34` to any still-live undemonstrated-able component
so the test stops referencing a deleted symbol. NO `src/index.ts` edit (HeaderRibbon is NOT on the root
barrel — distinct from glyph-face/disco-glyph).

**(2) DELETE glyph-face AND sever the silhouette DI coupling (F1) — glyph-face FIRST.** Excise the whole
dir `src/components/custom/glyph-face/` (incl. `keys.ts` — the `GLYPH_FACE_SILHOUETTE_KEY` optional-context
that exists purely to wire two demo-only primitives to each other); delete `src/subpaths/glyph-face.ts`;
delete the root-barrel line `src/index.ts:120` + the `glyph-face` token in the `:53` cherry-pick rationale
comment; delete the `./glyph-face` `package.json` export (lines 384-386) + typesVersions (lines 106-108);
delete `src/styles/glyph-face.css` + its `@import` at `index.css:130` + the cascade comment `:102`; delete
`demo/stories/primitives/glyph-face.vue` + manifest `:131` + IA slug `:46`. **SEVER the coupling FIRST so
the dir delete does not dangle:** remove `DiscoGlyph.vue:3` (the `useOptionalGlyphFaceSilhouette` import) +
the `:82-91` `slot`/`watch` silhouette-handoff block + the `:25` doc-comment describing the cap-clip — the
handoff only fed a now-deleted GlyphFace cap, so DiscoGlyph renders byte-identical standalone afterward.
Trim the gate ledgers: drop `proof-di-consistency.mjs:62` (`glyph-face/keys.ts`), drop
`proof-consumers-static.mjs:139` (`glyph-face/index.ts`) AND adjust the "7 cherry-picked custom/ packages"
COUNT comment at `proof-consumers-static.mjs:136` (7→6), trim the `glyph-face` mention from the
`gates.mjs:387` DI-note string + the `createContext.ts:5` doc-comment list. The instrument-chassis
composition consumer (`demo/stories/compositions/instrument-chassis.vue:9,174,228`) dies with
instrument-chassis's own W28/W29 removal — coordinate but DO NOT block on it (that whole composition is
slated to go; glyph-face excision is not gated on it).

**(3) DELETE disco-glyph (F3) — AFTER glyph-face severance.** With the coupling severed and the
chart-chassis-palette demo the only remaining touch-point, disco-glyph fails the substrate-without-consumer
bar exactly like header-ribbon. Excise the whole dir `src/components/custom/disco-glyph/`; delete
`src/subpaths/disco-glyph.ts`; delete the root-barrel line `src/index.ts:121` + the `disco-glyph` token in
the `:54` rationale comment; delete the `./disco-glyph` `package.json` export (lines 388-390) +
typesVersions (lines 109-110); delete `src/styles/disco-glyph.css` + `index.css:131` `@import` + comment
`:103`; delete `demo/stories/primitives/disco-glyph.vue` + manifest `:132` + IA slug `:46`; drop the
`proof-consumers-static.mjs:140` ledger entry (and the count comment now reads 6→5). **Re-express the
chart-palette demo without the primitive:** replace the `chart-chassis-palette.vue` DiscoGlyph block (`:6`
comment, `:16` import, `:60-99` the swatch grid) with a plain token-color tile (a `<div>` reading the chart
token as its background) so the foundations chart-palette tour survives the removal without the primitive
and without manufacturing a new fake consumer.

**(4) CONFIRM icon-button-token-ladder VERIFIED-REMOVED (F2) — NO edit.** Record in the wave's audit json
that `/dock/icon-button-token-ladder` was excised at `0b27f01` (git evidence: `git ls-files
--error-unmatch demo/stories/dock/icon-button-token-ladder.vue` → "did not match") so the §7 line item is
checkmarked and never re-opened or accidentally re-added. **DO NOT TOUCH** the live `demo/stories/TokenLadder.vue`
+ `ToneSwatch.vue` (the V.W4 general token-tour chassis, consumed by `foundations/overlays-scrims.vue` +
`foundations/chart-chassis-palette.vue` — they STAY) nor the W06-owned `demo/stories/foundations/dock-active-tokens.vue`
(the RENAMED dock token-ladder debris — that is **W06's** deletion, not this wave's; see Disjointness).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/header-ribbon/` (whole dir) | **DELETE** (F0). |
| `src/components/custom/glyph-face/` (whole dir incl. `keys.ts`) | **DELETE** (F1). |
| `src/components/custom/disco-glyph/` (whole dir) | **DELETE** (F3). |
| `src/components/custom/disco-glyph/DiscoGlyph.vue` | (edited THEN deleted) — SEVER the `:3` import + `:82-91` silhouette-handoff block + the `:25` doc-comment BEFORE deleting glyph-face, so the build never dangles, then the file is removed with the dir. |
| `src/subpaths/header-ribbon.ts` · `src/subpaths/glyph-face.ts` · `src/subpaths/disco-glyph.ts` | **DELETE** all three (the `vite.library.ts` subpaths glob auto-drops the chunks). |
| `src/index.ts` | DELETE the root-barrel `export *` lines `:120` (glyph-face) + `:121` (disco-glyph) + the `glyph-face`/`disco-glyph` tokens in the `:53-54` cherry-pick rationale comment. NO header-ribbon edit (not on the barrel). |
| `src/api/index.ts` | DELETE the `// ── HeaderRibbon ──` header + the `HeaderRibbon*` type re-export block (lines 196-204). |
| `package.json` | DELETE the `./header-ribbon` (308-310), `./glyph-face` (384-386), `./disco-glyph` (388-390) `exports` blocks + the three `typesVersions['*']` entries (header-ribbon 118-119, glyph-face 106-108, disco-glyph 109-110). |
| `src/styles/glyph-face.css` · `src/styles/disco-glyph.css` | **DELETE** both. |
| `src/styles/index.css` | DELETE the two `@import` lines (`:130` glyph-face, `:131` disco-glyph) + the cascade comments (`:102` / `:103`). |
| `demo/stories/navigation/header-ribbon.vue` · `demo/stories/primitives/glyph-face.vue` · `demo/stories/primitives/disco-glyph.vue` | **DELETE** all three. |
| `demo/stories/manifest.ts` | DELETE the three rows (`:165` header-ribbon, `:131` glyph-face, `:132` disco-glyph). |
| `demo/stories/foundations/chart-chassis-palette.vue` | Replace the DiscoGlyph block (`:6` comment, `:16` import, `:60-99` swatch grid) with a plain token-color tile so the chart-palette tour survives sans primitive. |
| `scripts/proof-storybook-ia.mjs` | DELETE the `header-ribbon` slug (`:55`, navigation cohort) + the `glyph-face`/`disco-glyph` slugs (`:46`, primitives cohort). |
| `scripts/proof-consumers-static.mjs` | DELETE the `glyph-face/index.ts` (`:139`) + `disco-glyph/index.ts` (`:140`) ledger entries; adjust the "7 cherry-picked custom/ packages" COUNT comment (`:136`) to 5. |
| `scripts/proof-di-consistency.mjs` | DELETE the `glyph-face/keys.ts: "optional"` entry (`:62`). |
| `scripts/gates.mjs` | Trim the `glyph-face` mention from the DI-triplet note string (`:387`). |
| `src/composables/context/createContext.ts` | Trim `glyph-face` from the doc-comment consumer list (`:5`). |
| `tests/scripts/storybook-complete.detect.test.ts` | SWAP the `HeaderRibbon` fixture name (`:29/33/34`) to a still-live undemonstrated-able component so the test stops referencing a deleted symbol. |
| `docs/tranches/AX/audit/W19-primitive-prune-A.json` | **NEW** — the born-RED→GREEN audit artefact (incl. the F2 icon-button-token-ladder git-evidence checkmark). |

**OUT of bounds:** the W06-owned `demo/stories/foundations/dock-active-tokens.vue` (the renamed dock
token-ladder debris — **W06** deletes it); the live `demo/stories/TokenLadder.vue` / `ToneSwatch.vue`
chassis primitives (DO NOT TOUCH); `demo/stories/compositions/instrument-chassis.vue` (the
instrument-chassis composition — **W28/W29** retire it; this wave only NOTES it as glyph-face's dying
composition consumer); the keyframes.js `EditorShell.vue` / `EasingCurveCanvas.vue` sibling source
(**W35** migrates them — this wave writes NO sibling source); the speedtest dead GlyphFace test mock
(the speedtest repo's own §8-repatriation cleanup, not glass-ui's); `MIGRATION.md` (the prune-survivor
honesty repair rides W21/W29, not this wave); `proof:storybook-complete` REGISTRATION in `gates.mjs`
(**W18** owns wiring the unwired totality gate).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W06 (dock storybook consolidation + token-ladder debris).** The token-ladder names are the trap:
  W06 DELETES `demo/stories/foundations/dock-active-tokens.vue` (the RENAMED-not-cut dock token-ladder,
  §4 note 3 / slice 4 F0) — that is the W06 residual. W19's F2 is the ORIGINAL
  `/dock/icon-button-token-ladder` (already gone at `0b27f01`, a confirm-only). **Disjoint by file:** W19
  never touches `dock-active-tokens.vue`; W06 never touches the three pruned primitives. Both reference the
  manifest, but DIFFERENT rows (W19: header-ribbon `:165` / glyph-face `:131` / disco-glyph `:132`; W06:
  dock-active-tokens `:86` / dock-with-slider `:237`). If both land in one merge window the manifest is the
  shared surface — sequence the manifest-row deletions or rebase; the row sets are disjoint so no semantic
  conflict.
- **vs W18 (storybook IA ground-up reinvention + gate re-baseline).** W18 **dependsOn W19** (charter
  `### AX.W18` dependsOn list, line 1004) — W18 "deletes the manifest rows for the W19/W20-removed
  primitives" and re-baselines `EXPECTED_TREE` LAST. W19 deletes the three rows + the three IA slugs FIRST;
  W18 then authors the ground-up category tree over the already-pruned manifest and re-baselines the IA
  fixtures. **Disjoint by ownership:** W19 owns the three slug/row deletions + the `proof:storybook-ia`
  slug-set shrink; W18 owns the CATEGORY-TREE authorship + the `EXPECTED_TREE` re-baseline +
  `proof:storybook-complete` registration. W19 does NOT author the tree; W18 does NOT re-add the pruned
  primitives.
- **vs W20 (primitive fix: native-top-layer + card toggles + GlassPanel retire).** Sibling G-band prune/fix
  wave; **disjoint by primitive set** — W20 retires GlassPanel + fixes dialog-native + Card toggles, touches
  NONE of header-ribbon/glyph-face/disco-glyph. Both share `package.json` (exports) + `src/index.ts` +
  `proof-consumers-static.mjs` as files, but DIFFERENT entries (W20: glass-panel; W19: the three pruned).
  If co-landed, the shared `proof-consumers-static.mjs` ledger COUNT comment is the one collision surface —
  coordinate the cherry-pick-count arithmetic (W19 drops glyph-face+disco-glyph from the 7; W20's
  GlassPanel is NOT a cherry-pick so does not touch the count).
- **vs W21 (recategorize-ledger + barrel coherence + metric-pill).** W21 touches the configurator
  root-barrel contradiction + drawer + use-token-color + metric-pill + the MIGRATION.md
  `proof:no-retired-survivor` authoring. **Disjoint by primitive** — none of W21's surfaces overlap the
  three pruned. The shared `src/index.ts` is touched by both (W19 removes two cherry-picks; W21 may demote
  configurator) — disjoint lines, coordinate at merge.
- **vs W35 (cross-repo consumer-migration DAG — the PUBLISH predecessor).** W35 migrates keyframes.js's
  `EditorShell.vue` off HeaderRibbon (→ a local chrome bar) with a born-RED cross-repo
  `proof:off-headerribbon` gate that greens BEFORE the glass-ui prune PUBLISHES. **W19 is the in-repo prune;
  W35 is the consumer migration.** W19 may LAND in-repo (the audit json born-RED→GREEN) independent of W35,
  but the PUBLISH of the prune is gated on W35's keyframes-side green (charter line 145, 157, 1720). W19
  writes NO sibling source — it carries the keyframes consumer-migration NOTE and routes it to W35. The two
  are sequenced (W35 before the W19/W20 publish), file-disjoint (W19: glass-ui src; W35: keyframes.js src +
  glass-ui pin-management coordination).
- **vs W28/W29 (speedtest repatriation + instrument-chassis retire).** glyph-face's only non-story consumer
  is `demo/stories/compositions/instrument-chassis.vue` — W28/W29 retire that whole composition. W19 NOTES
  the dependency but does NOT block on it (the composition is slated to go regardless). Disjoint: W19 prunes
  the three primitives; W28/W29 prune the instrument families + repatriate to speedtest/muster.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms that parallelize after the coupling severance).** Arm A
  (header-ribbon — independent): delete the dir + subpath + package.json export/typesVersions + the
  `api/index.ts` `HeaderRibbon*` block + demo story + manifest row + IA slug; swap the
  storybook-complete-detect fixture name. Arm B (the coupled pair — STRICTLY ordered within the arm):
  FIRST sever `DiscoGlyph.vue:3,82-91` + the `:25` doc-comment (the dangling-import guard), THEN delete
  glyph-face (dir + subpath + root-barrel line + cherry-pick token + glyph-face.css + index.css import +
  demo + manifest + IA slug + the three gate ledgers + createContext doc-comment), THEN delete disco-glyph
  (dir + subpath + root-barrel line + cherry-pick token + disco-glyph.css + index.css import + demo +
  manifest + IA slug + the consumers-static ledger entry) + re-express the chart-chassis-palette swatch grid
  as a plain token-color tile + finalize the cherry-pick COUNT comment (7→5). `vue-tsc` + `npm run build` at
  every interval (the build is the dangling-import canary — a missed severance reds it immediately).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the patched tree:
  asserts all three dirs are GONE; asserts `node -e 'import("@mkbabb/glass-ui/header-ribbon")'`,
  `…/glyph-face`, `…/disco-glyph` all 404 at resolution (the subpaths are unpublished); asserts ZERO
  `header-ribbon`/`glyph-face`/`disco-glyph` refs across package.json/api/manifest/the four gate scripts/
  index.css/index.ts; grep-confirms NO dangling `useOptionalGlyphFaceSilhouette` import anywhere;
  re-renders the chart-chassis-palette story to confirm the plain-tile replacement reads (no
  manufactured-second-consumer regression); confirms the cherry-pick COUNT comment now reads 5 and matches
  the actual root-barrel custom/ count. ADVERSARIAL twists: (a) tries to make the prune "pass" with the
  primitive merely demoted from the root barrel but the dir/subpath surviving (confirms a demote does NOT
  clear the prune — only full excision does); (b) confirms the live `TokenLadder.vue`/`ToneSwatch.vue` +
  the W06-owned `dock-active-tokens.vue` are UNTOUCHED (the do-not-touch guardrail — a false-positive deletion
  here is the regression class); (c) confirms `proof:di-consistency` no longer references a now-deleted
  glyph-face key (the easy-to-miss ledger drift `vue-tsc` cannot catch).
- **Gate-author (≤1 agent — re-baseline + ledger-trim, not net-new).** Re-baselines the
  `proof:storybook-ia` EXPECTED slug set for the three removed slugs (coordinated with W18, who owns the
  full tree re-baseline); confirms `proof:no-orphan-demo-route` GREEN after the three manifest rows drop;
  confirms `proof:consumers-static` GREEN with the trimmed ledger + adjusted cherry-pick count; confirms
  `proof:di-consistency` GREEN with the glyph-face key dropped. Confirms each assertion FAILS at `eaba94f`
  (the three primitives present) and PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement +
1 verify + 1 gate.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**

The wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — devise an in-FileBounds gestalt fix; spawn a tangent triumvirate to work AROUND an error; escalate ONLY when genuinely user-gated) + §6.2 (the 4-class halt-vs-work-around decision tree). It governs here by reference; the orchestrator may not redispatch the failing unit alone. The wave-specific §3a triggers (authored from this wave's FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2).** If excising a pruned dir requires touching a do-not-touch surface (`dock-active-tokens.vue` is W06's; `TokenLadder.vue`/`ToneSwatch.vue` are live chassis primitives; the keyframes `EditorShell.vue`/`EasingCurveCanvas.vue` sibling source is W35's; `proof:storybook-complete` registration is W18's), or the disco-glyph→glyph-face severance reveals a third in-repo consumer of `GLYPH_FACE_SILHOUETTE_KEY` beyond the demo coupling → HALT, dispatch the triumvirate. A sibling-owned surface is NEVER edited in-line.
- **Non-local gate failure → triumvirate (Class 2).** If `vue-tsc`/`npm run build` reds on a dangling import after the severance that resolves OUTSIDE this wave's FileBounds (a consumer of a pruned export the census missed), or `proof:consumers-static`/`proof:di-consistency` reds on a count/ledger a sibling wave co-owns → triumvirate. The cross-repo `proof:off-headerribbon` PUBLISH-gate is W35-owned: a keyframes-side red is routed, never fixed here.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the chart-chassis-palette plain-tile re-expression (the disco-glyph swatch-grid replacement) fails its live frontend-design read for a third re-author pass, or the no-dangling-route live audit surfaces a surviving route for a third pass → HALT the failing unit + triumvirate.
- **§5.3 ratify reached un-ratified → halt-and-ratify (Class 3).** If any RATIFY-BEFORE-IMPL item reaches impl un-adjudicated → stop, surface to the orchestrator, never self-ratify.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`vue-tsc --noEmit` GREEN** (the dangling-import canary): after the coupling severance + the three
   excisions, there is NO unresolved `useOptionalGlyphFaceSilhouette` / `glyph-face` / `disco-glyph` /
   `header-ribbon` import in the typegraph. **Born-RED** if the severance is skipped (a dangling import
   reds the typecheck); GREEN after. This is a build artefact (the precept-valid form).
2. **`npm run build` GREEN** — the `vite.library.ts` subpaths glob auto-drops the three chunks once
   `src/subpaths/{header-ribbon,glyph-face,disco-glyph}.ts` are gone; `dist/header-ribbon.js`,
   `dist/glyph-face.js`, `dist/disco-glyph.js` (and their `.d.ts`) ARE NO LONGER EMITTED. **Born-RED** if a
   package.json export still points at a now-absent dist file (the `verify-export-types` probe would red);
   GREEN after the export blocks drop. A build/deletion artefact.
3. **`proof:storybook-ia` re-baselined** — asserts the EXPECTED slug set NO LONGER carries
   `header-ribbon`/`glyph-face`/`disco-glyph`. **Born-RED** at HEAD (the slugs are present in the fixture);
   GREEN after the slug deletions + re-baseline. A manifest/tree-structure artefact.
4. **`proof:no-orphan-demo-route`** — every manifest route resolves to an existing SFC; no dangling route
   after the three story-file + manifest-row deletions. Confirms no dead header-ribbon/glyph-face/disco-glyph
   route survives.
5. **`proof:consumers-static`** — the root-contract ledger no longer lists `glyph-face/index.ts` /
   `disco-glyph/index.ts`, and the "cherry-picked custom/ packages" count comment matches the actual count
   (5). **Born-RED** if the ledger still references the deleted dirs; GREEN after the trim.
6. **`proof:di-consistency`** — the optional-context registry no longer lists `glyph-face/keys.ts`, and the
   DI-triplet matrix matches. **Born-RED** with the glyph-face key present; GREEN after.
7. A **deletion-PROOF** (valid artefact form, NOT a runtime grep): `test -d
   src/components/custom/{header-ribbon,glyph-face,disco-glyph}` → all absent; `node -e
   'import("@mkbabb/glass-ui/header-ribbon").then(()=>process.exit(1)).catch(()=>process.exit(0))'` (and
   the two siblings) → resolution 404 (exit 0); `grep -rc "header-ribbon\|glyph-face\|disco-glyph"
   package.json src/api/index.ts src/index.ts src/styles/index.css scripts/proof-*.mjs scripts/gates.mjs`
   → 0 across the surface.
8. A **cross-repo born-RED handoff PROOF (PUBLISH-gating, owned by W35)**: the keyframes-side
   `proof:off-headerribbon` assertion (keyframes.js `EditorShell.vue` off HeaderRibbon) greens BEFORE this
   prune PUBLISHES (charter line 145/1720). W19's in-repo prune may LAND green independently; the PUBLISH is
   gated on W35. (This wave records the gate as a routed handoff, not a re-implementation.)

These are build / structural / deletion artefacts (the precept-valid forms per SPEC.md §Hard Gates) — NOT
grep-for-source-string-as-runtime-behaviour gates.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass over the storybook, in **light AND dark** at **≥ 3 viewports** (375×667 / 1280×800 /
1440×900):
- **No dangling routes / no 404s:** navigate the storybook and confirm there is NO route, nav link, or
  search result for `header-ribbon`, `glyph-face`, or `disco-glyph` — the three removed primitives leave
  NO broken navigation, NO blank panel, NO console error (the slice's named close criterion: "a live
  storybook Playwright pass, not a headless gate — the cardinal AW lesson").
- **The chart-chassis-palette tour survives the disco-glyph removal:** the foundations chart-palette story
  renders the plain token-color tiles (the DiscoGlyph swatch-grid replacement) with the chart hues reading
  correctly at swatch scale; affordance/hierarchy/spacing/padding hold; no visual occlusion.
- **No collateral on the do-not-touch surfaces:** the live `TokenLadder.vue` / `ToneSwatch.vue`-driven
  foundations stories (`overlays-scrims`, the surviving chart-palette tour) render unchanged — the prune did
  NOT collateral-delete a live chassis primitive sharing the "token-ladder" substring.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `eaba94f`
   live: the three dirs exist + their subpaths resolve; glyph-face is on the root barrel + the three gate
   ledgers; disco-glyph's only consumer is the manufactured chart-palette demo + the dead glyph-face
   handoff; the icon-button-token-ladder is already gone at `0b27f01`. Record them in
   `audit/W19-…json` as the born-RED baseline. Do NOT proceed on the audit's word — re-prove.
2. **DELETE header-ribbon (F0) — independent.** Excise the dir + subpath + package.json export/typesVersions
   + the `api/index.ts` `HeaderRibbon*` block + demo story + manifest row + IA slug; swap the
   storybook-complete-detect fixture name. `vue-tsc` + `npm run build`.
3. **SEVER the disco-glyph→glyph-face coupling, THEN delete glyph-face (F1).** First remove
   `DiscoGlyph.vue:3,82-91` + the `:25` doc-comment (the dangling-import guard); confirm DiscoGlyph renders
   standalone (`vue-tsc` green). Then excise glyph-face: dir (incl. keys.ts) + subpath + root-barrel line +
   cherry-pick token + glyph-face.css + index.css import/comment + demo + manifest + IA slug + the three
   gate ledgers + createContext doc-comment. `vue-tsc` + `npm run build`.
4. **DELETE disco-glyph (F3) — after the severance.** Excise the dir + subpath + root-barrel line +
   cherry-pick token + disco-glyph.css + index.css import/comment + demo + manifest + IA slug + the
   consumers-static ledger entry; re-express the `chart-chassis-palette.vue` swatch grid as a plain
   token-color tile; finalize the cherry-pick COUNT comment (7→5). `vue-tsc` + `npm run build`.
5. **CONFIRM icon-button-token-ladder VERIFIED-REMOVED (F2) — no edit.** Record the `0b27f01` git evidence
   in the audit json + the do-not-touch guardrail (TokenLadder/ToneSwatch + the W06-owned dock-active-tokens
   are NOT this wave's). Checkmark the §7 line item.
6. **Gates GREEN.** Re-baseline `proof:storybook-ia` (slug set shrunk, with W18); confirm
   `proof:no-orphan-demo-route` + `proof:consumers-static` (ledger + count) + `proof:di-consistency` GREEN;
   run the deletion/resolution-404 proofs; run the VISUAL-TRUTH live storybook audit; route the keyframes
   consumer-migration NOTE to W35; capture the paired-π BEFORE/AFTER + DELTA; write `audit/W19-…json` to
   GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W19-primitive-prune-A.json` — the born-RED→GREEN ledger: the four RED witnesses
  (header-ribbon live surface; glyph-face on-barrel + DI-coupled; disco-glyph's circular-justification
  consumer; the icon-button-token-ladder `0b27f01` checkmark), the per-finding (F0-F3) disposition, the
  post-wave GREEN measurements (three dirs gone, three subpaths 404, the three gate ledgers trimmed, the
  cherry-pick count 5, the chart-palette plain-tile replacement), and the F2 git-evidence checkmark + the
  do-not-touch guardrail record.
- The post-build `dist/` proof: `dist/header-ribbon.js` / `dist/glyph-face.js` / `dist/disco-glyph.js` (+
  their `.d.ts`) ARE NO LONGER EMITTED (the subpaths-glob auto-drop evidence).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the storybook nav before/after (the
  three routes present → gone, no 404), the chart-chassis-palette story before/after (DiscoGlyph swatch
  grid → plain token tiles, the chart hues still reading), at ≥ 3 viewports × light/dark.
- A consumer-migration NOTE annex (routed to W35, NOT executed here): keyframes.js `EditorShell.vue` off
  HeaderRibbon (→ a local chrome bar / a surviving header idiom), born-RED `proof:off-headerribbon`, gated
  BEFORE the prune publishes.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(prune): W19 born-RED baseline — header-ribbon/glyph-face/disco-glyph live surfaces + the silhouette DI coupling (AX.W19)`
2. `refactor(custom): excise header-ribbon — dir + subpath + exports + api types + demo + IA slug + detect fixture (AX.W19 F0)`
3. `refactor(custom): sever the disco-glyph→glyph-face silhouette coupling + excise glyph-face — dir/keys + root barrel + subpath + css + demo + the 3 gate ledgers (AX.W19 F1)`
4. `refactor(custom): excise disco-glyph + re-express the chart-palette swatch grid as plain token tiles + finalize cherry-pick count 5 (AX.W19 F3)`
5. `docs(prune): confirm icon-button-token-ladder VERIFIED-REMOVED at 0b27f01 — git-evidence checkmark, no source edit (AX.W19 F2)`
6. `chore(AX.W19): audit ledger GREEN + storybook-ia slug re-baseline + paired-π no-dangling-route capture`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  no-dangling-route live storybook audit + the chart-palette before/after — the binding close criterion. W19
  cannot close on the structural gates alone (a green `proof:storybook-ia` over a 404-ing live storybook is
  exactly the AW cardinal failure); W00 stands up the lane it closes on. (Charter `### AX.W19` dependsOn
  AX.W00, line 1040.)
- **AX.W35 (cross-repo consumer-migration DAG) — HARD PREDECESSOR of the PUBLISH (not of the in-repo
  prune).** keyframes.js's `EditorShell.vue:99` is a LIVE, load-bearing consumer of HeaderRibbon — the
  "ZERO binary consumers" premise was glass-ui-INTERNAL only and is FALSIFIED cross-repo (constellation
  `result[11]` / `result[21]`). Per the W28→W29 native-first / migrate-before-prune class (§4 note 8), the
  keyframes migration is sequenced in W35 with a born-RED `proof:off-headerribbon` gate that greens BEFORE
  this prune PUBLISHES, so HEAD never breaks the optional consumer. W19 may LAND its in-repo excision
  independently; the PUBLISH hinges on W35. (Charter lines 145, 157, 1706-1720.) W19's premise line is
  corrected to "one cross-repo consumer (keyframes.js EditorShell), migrated in W35 before this prune
  publishes."
- **Downstream:** **AX.W18** dependsOn W19 (the IA ground-up tree reinvention deletes the W19/W20-removed
  manifest rows + re-baselines `EXPECTED_TREE` over the already-pruned manifest, charter line 1004/1014).
  **AX.W34** receives the cross-repo idiom-census of the keyframes HeaderRibbon adoption (the §16 receiver).
- **Coordination (not a blocker):** **AX.W28/W29** retire instrument-chassis (glyph-face's only non-story
  composition consumer) — W19 NOTES the coupling but is NOT gated on it (that composition is slated to go
  regardless). **AX.W06** owns the renamed `dock-active-tokens.vue` token-ladder debris — disjoint from
  W19's icon-button-token-ladder confirm-only.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`25e1b5a`** (O.W6 Lane A, "constellation-level substrate promotions") — the HeaderRibbon PROMOTION
  ORIGIN: HeaderRibbon was promoted on the O-tranche bar of "has a demo story," NOT "≥2 binary consumers"
  (the `src/api/index.ts:196` comment cites O.W6 Lane A as its lineage). The substrate-without-consumer
  defect was minted here and never caught (J invariant 10 / L invariant 8).
- **`ef0ca91`** ("feat(custom/disco-glyph): land DiscoGlyph primitive — facet gradient + cap") — the
  disco-glyph landing; **`64b3488`** ("feat(glyph-face): clip-to-silhouette default … + DiscoGlyph
  silhouette hand-off") — the commit that minted the `GLYPH_FACE_SILHOUETTE_KEY` provide/inject coupling
  wiring the two demo-only primitives to each other (the manufactured intra-library coupling — overfit
  substrate, a DI seam built for one absent speedtest consumer).
- **L.W3 Lane B** — the `chart-chassis-palette.vue:6` "second-consumer wiring" comment: the DEMO authored
  specifically to clear the ≥2-consumer overfitting bar for disco-glyph (the circular justification — a demo
  created to justify the primitive, not a real product need). The `:61` blurb's "primary-audacious CTAs
  compose it" claim is not borne out by any `src` grep.
- **`0b27f01`** (AV.W16 "structural waves W16") — the icon-button-token-ladder EXCISION:
  `demo/stories/dock/icon-button-token-ladder.vue` (and the whole `demo/stories/dock/` dir) was removed
  here. F2's confirm-and-close rests on this commit (`git ls-files --error-unmatch …` → "did not match").
  The renamed-not-cut residual (`dock-active-tokens.vue`) is W06's, not this wave's (§4 note 3).
- **AV (`8036370`)** — the speedtest→glass-ui repatriation lineage for glyph-face/disco-glyph (the lucide
  cap-clip wrapper + the faceted decorative glyph repatriated with ZERO post-repatriation binary
  consumers). The repatriation is what stranded them as substrate-without-consumer.
- **keyframes.js `EditorShell.vue:99`** (constellation `result[11]`/`result[21]`) — the LIVE cross-repo
  HeaderRibbon consumer the glass-ui-internal census missed: `<HeaderRibbon position="right">` as the top
  chrome bar (share/shortcuts/dark-mode via `#items`, `#anchor` exposing pinned/toggled), `:137`
  `headerRibbonRef`. keyframes.js pins `@mkbabb/glass-ui ^3.4.0` so a minor bump pulls the excision — the
  W35-sequenced migration is the publish-safety predecessor.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; all three dirs ship, the
  subpaths resolve, glyph-face is on the root barrel + the three gate ledgers, the silhouette coupling is
  live here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-G binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (precepts/README.md "Substrate and consumer land
  together. A primitive that is not consumed is unfinished work."; SPEC.md §"Every wave lands substrate
  with its consumer or deletes the substrate," line 86).** All three primitives FAIL the bar — header-ribbon
  has ZERO in-repo binary consumers, glyph-face's only reason-to-exist (the silhouette cap) is a
  speedtest-specific composition with zero post-repatriation consumers, disco-glyph's "second consumer" is a
  manufactured demo. The wave DELETES the unconsumed substrate (the precept-valid disposition for an
  unconsumed primitive). MUST NOT leave a demoted-but-surviving dir/subpath (a demote is not a delete). The
  ONE live cross-repo consumer (keyframes.js EditorShell) is migrated-before-prune-publish via W35 (the
  wire-before-retire sequencing, the W28→W29 class).
- **no-overfitting (precepts/README.md "No overfitting. A public surface, helper … needs a current
  consumer and evidence. Otherwise delete it."; precepts/audits/overfitting-audit.md).** The
  `GLYPH_FACE_SILHOUETTE_KEY` optional-context is overfit substrate — a DI seam built to wire two demo-only
  primitives to each other for one absent consumer. The disco-glyph chart-palette demo is a manufactured
  consumer to fake the ≥2 bar. The wave SEVERS the DI seam + DELETES the manufactured-consumer demo
  (re-expressing the chart-palette tour without the primitive). MUST NOT manufacture a NEW fake consumer for
  the chart-palette replacement (the plain token-color tile reads the chart token directly — no new
  primitive, no new seam).
- **one-path / no-legacy-code (no backwards-compat memory; SPEC.md §"Execute the plan … no shadow APIs or
  temporary compatibility layers").** The excision is clean — no legacy alias, no `@deprecated` re-export,
  no rehome. The glyph-face→disco-glyph coupling is SEVERED (the dangling import removed, not bridged with a
  shim). MUST NOT ship a stub re-export of any of the three subpaths.
- **Gates close on evidence (precepts/README.md line 13; SPEC.md §Hard Gates lines 94-109 — build/test/
  runtime/diff/deletion, NOT "grep found a source string for runtime behaviour" line 108).** The gates are
  build (`vue-tsc`/`npm run build` as the dangling-import canary + the dist auto-drop), structural
  (`proof:storybook-ia` slug set, `proof:consumers-static` ledger, `proof:di-consistency` key set), and
  DELETION proofs (the three dirs absent, the three subpaths 404) — the precept-valid artefact forms. The
  close is the executed live storybook Playwright pass (no dangling route), never a headless proof alone —
  the cardinal AX precept (the slice's own close criterion: "a LIVE storybook Playwright pass, not a
  headless gate").
- **no-silent-deferrals (precepts/instructions/tranche/SPEC.md §"consumer will be wired later" is NOT a
  valid gate, line 109; the §16.4 zero-loss).** The keyframes.js HeaderRibbon consumer-migration is NOT
  silently dropped — it is ROUTED to W35 with a named born-RED cross-repo gate sequenced BEFORE the publish
  (an explicit handoff, not a deferral). The glyph-face/instrument-chassis composition consumer is NOT
  pre-emptively deleted here — it is signposted and routed to W28/W29 (the instrument-chassis retire owns
  it). The icon-button-token-ladder is CHECKMARKED with git evidence, not silently assumed-done.
- **documentation-is-part-of-the-change (precepts/README.md line 16; SPEC.md line 158 — wave close updates
  docs).** `proof:storybook-ia` (the manifest IS the documentation) is re-baselined; the cherry-pick COUNT
  comment is corrected to 5 (a doc-truth the prune mutates); the `createContext.ts:5` + `gates.mjs:387`
  doc-comments are trimmed of the deleted glyph-face. The W19 premise line ("ZERO binary consumers") is
  corrected to "one cross-repo consumer, migrated in W35" — the binding-doc honesty.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The storybook-complete-detect fixture replacement name.** The test
   `tests/scripts/storybook-complete.detect.test.ts:29/33/34` uses `HeaderRibbon` as its example
   undemonstrated-able component; deleting HeaderRibbon strands the fixture string. **Recommendation:**
   swap to any still-live component that is reachable but undemonstrated in the fixture's synthetic scan
   (the test only needs A name of a real component file the synthetic manifest omits — pick a stable
   primitive that W18/W20/W29 are NOT also touching to avoid a second fixture churn). RATIFY the chosen
   name so it survives the IA reinvention (W18) and is not itself later pruned.
2. **The chart-chassis-palette plain-tile replacement shape.** F3 prescribes "replace the DiscoGlyph swatch
   grid with a plain token-color tile (a `<div>` token-color tile) so the foundations tour survives."
   **Recommendation:** a plain `<div>` reading the chart token as `background` (or the existing
   `<ToneSwatch>` chassis primitive if it already serves the swatch-tile role — verify it does NOT itself
   depend on disco-glyph) so no NEW primitive is introduced and no new fake-consumer is manufactured. RATIFY
   whether `<ToneSwatch>` is the idiomatic tile (reuse the live chassis) vs a bare `<div>` (minimal) — the
   former is more DRY if ToneSwatch is standalone.
3. **In-repo LAND vs PUBLISH gating against W35.** Charter line 145/1720 sequences W35 (keyframes off
   HeaderRibbon) BEFORE the W19 prune PUBLISHES. **Recommendation:** W19 LANDS its in-repo excision +
   greens its own gates independent of W35 (so the dock/graphics-led tranche is not blocked on a sibling
   session), and the PUBLISH (the pin-bump + npm publish) is the gated hinge that waits on W35's
   `proof:off-headerribbon` green. RATIFY that the W19 audit json may close GREEN pre-W35 with an explicit
   "PUBLISH gated on W35" annotation, so the wave is not falsely held open on a cross-repo session it does
   not own.
4. **The cherry-pick count arithmetic with W20.** W19 drops glyph-face + disco-glyph from the 7
   cherry-picked custom/ packages (→ 5); W20 retires GlassPanel (which is NOT a cherry-pick, so does not
   touch the count). **Recommendation:** W19 owns the 7→5 count comment in `proof-consumers-static.mjs:136`;
   if W19 and W20 co-land, confirm W20 does not also edit the count line (it should not — GlassPanel reaches
   consumers via subpath, not the root-barrel cherry-pick set). RATIFY the disjoint ownership so the count
   comment is mutated by exactly one wave.

---

## Convergence-2 augment — P1/P2/P3/P4 folded into W19 (the prune wave)

Per `docs/tranches/AX/audit/convergence2/CONVERGENCE-PLAN-2.md` (line 35: "W19 ← P1/P2/P3/P4")
and the three lane audits (`A-prune-glyphs.md`, `A-prune-carousel.md`, `A-prune-token-color.md`),
the pass-2 USER-DEFECTS prunes fold into W19 as additional excisions. Implemented against baseline
`7e23877` (the convergence-2 cut), NOT the wave doc's prior `eaba94f`/`b919137`. **Header-ribbon is
out of THIS lane's scope** (it is the wave doc's original F0 — owned separately; W19-prunes lane touched
ONLY the four targets below). Live consumer census re-proven at `7e23877` before acting (the §0 cardinal).

### P4 — glass-carousel EXCISED (overfitting bar FAILS)

`custom/glass-carousel/` (`GlassCarousel.vue` + `GlassCarouselItem.vue` + `useGlassCarousel.ts`) had
**ONE binary consumer** (its own demo story `navigation/glass-carousel.vue`) + zero sibling-repo
consumers — the substrate-without-consumer bar (J inv 10 / L inv 8). EXCISED: the dir, `src/subpaths/glass-carousel.ts`,
the `./glass-carousel` package.json export + typesVersions, the `src/index.ts:67` cherry-pick-comment
mention (NOT on the root barrel — no export line), the demo story + manifest row, the IA slug
(`proof-storybook-ia.mjs` navigation cohort), and three gate-script consumers:
`proof-package.mjs` (probe import + 2 runtimeSymbols + the `<40` guard → `<35`),
`proof-motion-value-free.mjs` (the `useGlassCarousel.ts` scanned-file entry), and
`proof-carousel-glass-atoms.mjs` (clauses C FOUR-STATE + D CHROME-SUBSTRATE asserting on the now-deleted
`GlassCarouselItem`/`GlassCarousel` — DROPPED; clauses A DOT-CONTRAST + B NO-DEAD-CLASS on the SURVIVING
`ui/carousel/CarouselDots.vue` KEPT). Tests/ mirrors swept: `public-surface.spec.ts` (import + 2 surface
rows + the `nonCoreRootRetirements` entry), `lifecycle-cleanup.spec.ts` (the whole "detaches glass carousel
scroll listeners" test + its now-unused `nextTick`/`ref`/`mountComposable`/`useGlassCarousel` imports).
**OUT of bounds (KEPT):** `ui/carousel/` (the surviving embla family + `GlassCarouselPager` — a separate
audacious-pager primitive on the `/carousel` subpath); the `@mkbabb/glass-ui/carousel` subpath;
`CarouselDots.vue`. The W23-complete `F5` chrome restyle of `custom/glass-carousel` is SUPERSEDED by this
prune (the W23 effort landed on a soon-to-be-pruned surface — the convergence catch).

### P2 + P3 — disco-glyph + glyph-face EXCISED (overfitting bar FAILS, P3 hedge → hard PRUNE)

Both fail the ≥2-binary-consumer bar. disco-glyph's only non-self touch-point was the manufactured
`foundations/chart-chassis-palette.vue` "second-consumer wiring" demo (the circular justification);
glyph-face's only non-self touch-point was the `compositions/instrument-chassis.vue` composition (slated for
W28/W29 retire) + the `GLYPH_FACE_SILHOUETTE_KEY` DI coupling that wired the two demo-only primitives to each
other. EXCISED both dirs (glyph-face incl. `keys.ts`), both subpaths, both CSS files + `index.css` imports +
cascade comments, the `src/index.ts` root-barrel lines + cherry-pick-rationale tokens (7→5 cherry-picks),
both package.json exports + typesVersions, both demo stories + manifest rows + IA slugs, and the gate ledgers:
`proof-consumers-static.mjs` (2 entries + the 7→5 count comment), `proof-di-consistency.mjs` (the
`glyph-face/keys.ts: "optional"` matrix entry), `gates.mjs:399` (the DI-note string trim),
`createContext.ts:5` (the DI-consumer doc-comment list trim), `dock-controls.css:324` (the stale `<GlyphFace>`
doc-comment name-drop — the `::before` CSS rule does NOT depend on the component). The disco-glyph→glyph-face
DI coupling is severed by the dual excision (both dirs go — no dangling import survives; `vue-tsc` green).
**Consumer re-expressions (clean break — no dangling import):** the `chart-chassis-palette.vue` DiscoGlyph
swatch grid → plain token-color `<div>` tiles reading the chart token as `background` (no new primitive, no
manufactured consumer); the `instrument-chassis.vue` two `<GlyphFace>` wrappers → the bare slotted lucide
icons (the DockIconButton/DockTabButton chrome remains).

### P1 — useTokenColor KEPT (≥2-consumer bar STILL MET); demo toggle → DarkModeToggle

`useTokenColor` is **load-bearing** — `demo/stories/substrates/constellation.vue` calls it THREE times
(`--primary`, `--constellation-accent`) to resolve tokens to concrete Canvas2D `fillStyle`/`strokeStyle`
values, re-resolving on dark-flip. Constellation is a SURVIVING substrate (pass-2 P7 wants it as a page hero).
So the ≥2-consumer bar holds after the use-token-color demo story stays (the composable + its `dom/` barrel
export are UNTOUCHED — `proof:no-orphan-composable` green). The lane's literal P1 ask ("the demo ICON →
a DarkModeToggle") is satisfied by swapping the use-token-color story's ad-hoc `<Button @click="toggleDark">`
for the shipped `<DarkModeToggle>` (`custom/controls`); the story KEEPS its manifest row + IA slug (the
composable is NOT pruned, so the conditional "remove the story IF the composable is pruned" does not fire).
This is the reconciliation of the prior W21 fold-5 (justify-and-annotate-KEEP) with pass-2 P1 (the
load-bearing argument holds; only the demo affordance changes).

---

## Hardening amendment (golden pass) — 2026-06-09

The golden hand-challenge (`audit/hardening/CH-primitives.md` C1, `CH-close-crossrepo.md` C3) re-diagnosed
this wave against live HEAD and found a PROGRESS↔reality inflation: the wave's HEADLINE fold (F0
header-ribbon, named FIRST in the title) NEVER landed, yet the row carried `live-verified (DEVELOPED)`. The
"DEVELOPED" compound label is the linguistic vehicle of exactly the inflation AX exists to kill — a PARTIAL
landing reported as a full one. This amendment reconciles the doc to what ACTUALLY shipped (no rewrite of the
body — the F1/F3/P4 prune is correct and landed; the F0 over-claim is the correction).

**What actually landed at HEAD (live-probed 2026-06-09):**
- `src/components/custom/glyph-face/` → **GONE** (P3 EXCISED).
- `src/components/custom/disco-glyph/` → **GONE** (P2 EXCISED; the silhouette DI coupling severed).
- `src/components/custom/glass-carousel/` → **GONE** (P4 EXCISED — the convergence-2 fold below).
- `useTokenColor` → **KEPT** (P1; `src/composables/dom/useTokenColor.ts` present, `dom/index.ts` exports it;
  the ≥2-consumer bar held via the constellation consumer — a CORRECT keep, not an unlanded prune).
- `src/components/custom/header-ribbon/` → **STILL EXISTS** (dir + `src/subpaths/header-ribbon.ts` present +
  5 `header-ribbon` refs in `package.json` exports/typesVersions). **F0 NEVER EXECUTED.**

**(A) F0 header-ribbon is UNLANDED — the title fold did not ship.** The §Scope fold (1) "DELETE
header-ribbon (F0) — independent, no coupling" + RED witness 1 (the header-ribbon live surface) are STILL
RED at HEAD. The convergence-2 augment ABOVE confesses it (`:543` "Header-ribbon is out of THIS lane's scope
— it is the wave doc's original F0 — owned separately"), but the PROGRESS row was nonetheless flipped to
`live-verified (DEVELOPED)`. The honest disposition: the row SPLITS — *glyph-face/disco-glyph/glass-carousel
DONE; header-ribbon F0 PENDING.* The F0 in-repo excision (dir + subpath + the 5 `package.json` refs + the
`api/index.ts` `HeaderRibbon*` block + the `proof:storybook-ia:55` slug + the demo + manifest row) MUST
still land — it was deferred and never executed, NOT shipped. Note the mitigating sequence (NOT absolving):
W19's §Dependencies correctly gates the header-ribbon PUBLISH behind W35 (keyframes.js `EditorShell.vue` is
a live cross-repo consumer), but that gates the PUBLISH, not the IN-REPO excision — the doc is explicit
("W19 may LAND its in-repo excision independently"). The in-repo F0 prune simply did not run.

**(B) De-inflate the PROGRESS mark — retire the `(DEVELOPED)` label (GOLDEN Batch −1).** Per GOLDEN §B item
1 + G-4, the `(DEVELOPED)` compound label is retired tranche-wide (it is the inflation vehicle). W19's row
re-states to `dev-landed (glyph/disco/glass-carousel subset) · header-ribbon F0 PENDING · live-pending
(DELTA owed)`. The row may NOT read `live-verified` until BOTH (i) the F0 in-repo excision lands AND (ii) a
captured on-disk `.png` DELTA exists in `audit/visual/` (the `proof:live-verified-ledger` close gate, GOLDEN
Batch −1, rejects a prose/section-marker stand-in). The landed F1/F3/P4 subset is itself still owed its
paired-π DELTA capture (the cardinal-lesson backfill — add W19 to the CAPTURE-PROTOCOL retroactive-backfill
ledger; it is currently NOT on it, so the debt is under-counted).

**(C) The `proof:consumers:static` sibling-consumer RED (a W53 cross-repo miss, NOT W19's prune — record the
seam).** Adjacent to this wave's prune class: `npm run proof:consumers:static` is RED at HEAD on a W53
clean-break miss — speedtest still imports the retired `@mkbabb/glass-ui/responsive-tabs` at 3 call sites
(`AdminDashboardLayout.vue:119` + 2 more). This is NOT W19's defect (W19's three deleted subpaths have no
surviving sibling import — the prune was clean), but it is the SAME chronic class (clean-break rename misses
the sibling-consumer sweep) and it blocks the band's green close. Routed to the W53/W28 consumer-migration
ledger (the speedtest 3 sites → `SegmentedTabs :responsive`); recorded here as the adjacent seam, not
absorbed.

**Net:** the F1/F3 glyph/disco prune + the convergence-2 P2/P3/P4 (glyph-face/disco-glyph/glass-carousel) +
the P1 useTokenColor KEEP are CORRECT and LANDED — the body above is accurate for them. The over-claim is
narrow and specific: the title's F0 header-ribbon never shipped in-repo, yet the row read `live-verified
(DEVELOPED)`. The amendment splits the row honestly, retires the `(DEVELOPED)` label, names F0 as the
pending in-repo excision (PUBLISH still gated on W35), and owes the paired-π DELTA backfill for the landed
subset.
