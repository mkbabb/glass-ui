# AY.W-SB1 — Storybook per-route KEEP/FIX/RETIRE verdict + orphan COMPONENT retire

**Tranche** AY (glass-ui) · **Band** C (storybook prune + restructure) · **Kind** impl + retire ·
**State** OPEN · **Repo** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **HEAD** `at-dock-convergence` (`fba6262`)
**Spec inputs** `audit/hardening/H-storybook.md` (the §2 per-route disposition table + the §3 F1-F9 findings),
`audit/hardening/H-overfitting.md` (Finding 3 — route-prune ≠ component-retire), `audit/hardening/H-chronic-defer.md`
(chronic F — the route-prune SPECIFICS carried AX→AY).
**Sibling waves** `AY.W-FF2.md` (OWNS the `evalFourier` dead-export delete — NOT this wave), `AY.W-CON*` (constellation
— a useTokenColor consumer this wave must not break).

---

## Goal criterion

Every `§B11` storybook route carries a RECORDED KEEP / FIX / RETIRE verdict, and the route-prune is finally
COMPONENT-deep, not route-deep. Today the prune keeps being framed as "delete a story file", so each tranche
removes a route and re-flags "IA done" while the underlying library-orphan COMPONENTS persist on the published
surface (the chronic the H lane named: "substrate-without-consumer deferred under cover of a route prune"). W-SB1
takes the component-level verdict the route prune is downstream of: `header-ribbon` (0 src + 0 external consumers,
only its own demo story) is RETIRED at the root — dir + `/header-ribbon` subpath + `package.json` exports +
`src/api/index.ts` types + the story + the manifest row, clean break, no alias; `glass-panel` (0 src-component +
0 external consumers, two demo stories) is RETIRED the same way; `useTokenColor` is KEPT (it clears the
≥2-consumer bar — speedtest's `useMeterTokenColors` imports it externally, plus two demo stories) and BOOKED with
a consumer-evidence doc so the next audit does not re-flag it. The self-acknowledged FIX-ROUTE `native-top-layer`
(`manifest.ts:188` literally says "Folds into Dialog as a `:native` opt-in (FIX-ROUTE)") is EXECUTED: its native
`<dialog>`/`commandfor` + `HoverPopover :native interestfor` probes fold into the Dialog + HoverPopover stories as
a native opt-in section, and the standalone capability-probe route retires. The already-DONE items
(disco-glyph/glyph-face excised AX.W19, useTokenColor-keep AX.W19, blob consolidated, speedtest boundary locked,
slider zoo collapsed) are CLOSED-WITH-EVIDENCE in this spec so the wave does not re-litigate settled
dispositions. Success looks like: a per-route disposition table that leaves no route as "wtf", two orphan
components GONE from the public surface with deletion-proofs, one orphan KEPT with documented evidence, the
native fold landed, and a NEW component-orphan gate that makes the route-prune-≠-component-retire confusion
impossible to relapse.

## Completion criterion

The five hard-gate clauses below all verify (the §4 checklist): (G1) `proof:no-orphan-demo-route` (already
CI-wired) stays GREEN after the route deletions and the native fold — no orphan file, no dangling row; (G2) the
NEW `proof:component-orphan` gate is born-RED at the pre-edit HEAD (header-ribbon + glass-panel present with 0
non-self consumers and no evidence doc) and GREEN after the retire — every `custom/` component package + every
flat subpath + every root-barrel composable has ≥2 non-self consumers OR a `docs/consumer-evidence/<artefact>.md`,
self-proving with a synthetic always-orphan probe; (G3) deletion-proofs for `header-ribbon` and `glass-panel` —
`rg` returns only-removed across `src/ demo/ ../slides/src ../speedtest/src`, the dirs are gone, the subpath +
`package.json` exports + `typesVersions` + `api/index.ts` types are gone; (G4) `npm run build` +
`npm run verify-export-types` GREEN with the two subpaths absent (the dts publication probe passes the smaller
surface); (G5) `useTokenColor` is KEPT with `docs/consumer-evidence/use-token-color.md` authored and the
`consumer-evidence/README.md` table row added, and the native-top-layer fold is verified by the manifest row
absent + the Dialog/HoverPopover stories carrying the native section. Both goal AND completion must hold for a
clean close.

---

## 1. The verified defect (file:line, against HEAD `at-dock-convergence` `fba6262`)

The W-SB rows in `AY.md §2 Band C` are one-line scope only; the §B11 corpus list they cite is materially STALE
(roughly half already actioned in AX). The REAL open defect is component-deep, not route-deep.

### 1.1 The route-prune ≠ component-retire defect (the headline — H-overfitting Finding 3)

A route prune removes a `demo/stories/<cat>/<id>.vue`; it does NOT answer whether the underlying COMPONENT clears
the substrate-with-consumer bar (L invariant 8). Three artefacts are library-orphans on the PUBLISHED surface;
the planned route prune leaves all three published-but-unused:

| # | Orphan | Published surface (file:line) | Consumers (the binding count) | Verdict |
|---|---|---|---|---|
| O1 | `header-ribbon` | `src/components/custom/header-ribbon/{index.ts,HeaderRibbon.vue,types.ts}` · `/header-ribbon` subpath (`src/subpaths/header-ribbon.ts`, `package.json:312-315` exports + `:121-122` typesVersions) · `src/api/index.ts:200-207` (`HeaderRibbonPosition`, `HeaderRibbonProps`) | `rg -l "HeaderRibbon\|header-ribbon" src/ demo/`: ONLY its own story `demo/stories/navigation/header-ribbon.vue` + `manifest.ts` + the api re-export. `rg ... ../slides/src ../speedtest/src`: 0 code hits (the only slides hit is `DESIGN-FOURIER-v2.md`, a markdown doc, not code). **0 src consumers, 0 external consumers.** NOT on the root barrel (`src/index.ts`: 0 hits). | **RETIRE** (fails ≥2-consumer bar; corpus says REMOVE; clean break) |
| O2 | `glass-panel` | `src/components/custom/glass-panel/{index.ts,GlassPanel.vue}` · `/glass-panel` subpath (`src/subpaths/glass-panel.ts`, `package.json:356-359` exports + `:91-92` typesVersions) · `src/api/index.ts:99` (`GlassPanelVariant`), `:158` (`GlassPanelProps`) | `rg -l "GlassPanel\|glass-panel" src/ demo/`: 2 demo stories (`substrates/glass-panel.vue`, `foundations/paper-glass.vue`) + the api types. **0 src-COMPONENT consumer** (the `.glass-panel` CSS lives in `GlassPanel.vue`'s own `<style>` `:105-132`, self-contained — NOT a glass.css cross-consumer). **0 external consumers.** NOT on the root barrel (`src/index.ts`: 0 hits). | **RETIRE** (a demo-only published component; 2 stories ≠ 2 binary consumers) |
| O3 | `useTokenColor` | root barrel `src/index.ts` (via `composables/dom/index.ts:45` `export * from "./useTokenColor"`) · `/dom` subpath (`package.json:488`) · `src/composables/dom/useTokenColor.ts` | `../speedtest/src/.../meter/useMeterTokenColors.ts:19` `import { useTokenColor } from "@mkbabb/glass-ui/dom"` + uses it at `:36-37` (`--meter-track-stroke`, `--meter-dial-color`) — **a genuine EXTERNAL consumer** + 2 demo stories (`substrates/constellation.vue:22,60`, `StoryHero.vue:74`). | **KEEP + BOOK** (clears the ≥2-consumer bar; AX.W19 `509aed8` deliberately kept it "constellation consumer") |

> **Adjudication of the H-overfitting vs H-storybook contradiction (read before executing).** H-overfitting
> Finding 3 lists `useTokenColor` as a "root-barrel library-orphan" with "ZERO external consumers", asserting
> speedtest's `useMeterTokenColors` is "NOT a consumer of glass-ui's `useTokenColor`". **That assertion is FALSE
> against HEAD** — `../speedtest/src/components/speedtest/composables/meter/useMeterTokenColors.ts:19` literally
> `import { useTokenColor } from "@mkbabb/glass-ui/dom"` and invokes it at `:36-37`. H-overfitting conflated the
> speedtest LOCAL wrapper-NAME (`useMeterTokenColors`) with the glass-ui import it composes. The
> `useResolveTokenColor.ts:18-22` disclaimer is about a SIBLING composable (`useResolveTokenColor`, a different
> DOM-free purpose), not about whether `useTokenColor` has consumers. H-storybook §2 is correct: KEEP. This wave
> follows the empirical grep, not the stale finding. The verdict is BOOKED with evidence (G5) so the audit
> cannot re-flag it a fourth time.

### 1.2 The native-top-layer self-acknowledged FIX-ROUTE (H-storybook F5)

`demo/stories/containers/native-top-layer.vue` is a standalone capability-probe page; its manifest blurb
(`manifest.ts:188`) explicitly says: `"… capability probe. Folds into Dialog as a ':native' opt-in (FIX-ROUTE)."`
The fold has NOT happened across the AX IA restructure (chronic). The page demos:
`GlassDialogNative` (a native `<dialog>` + `commandfor` + light-dismiss consuming the `.glass-top-layer`
`@starting-style` grammar, `native-top-layer.vue:7,80-98`) and `HoverPopover :native` (`interestfor` opt-in,
`:110`). `GlassDialogNative` is **demo-private** (`src/components/custom/dialog-native/` — NOT on the root barrel,
NOT a subpath, NOT in `package.json`/`api`; its sole consumer is this story). The fold target stories exist:
`demo/stories/containers/dialog.vue` and the HoverPopover story.

### 1.3 The already-DONE items (CLOSED-WITH-EVIDENCE — do NOT re-litigate)

Per H-storybook §2 + §6.3, these §B11 items are SETTLED at HEAD; the wave records them closed so no agent
re-actions them:

| §B11 item | Closed by | HEAD evidence |
|---|---|---|
| `disco-glyph` REMOVE | AX.W19 `509aed8` | no file, no route, no src component (excised) |
| `glyph-face` REMOVE | AX.W19 `509aed8` | no file, no route, no src component (excised) |
| `use-token-color` "stray route" | AX.W19 `509aed8` ("keep useTokenColor") | KEEP — §1.1 O3 (≥2-consumer bar met); the corpus "stray" framing is stale |
| `icon-button-token-ladder` "stray route" | n/a (never existed) | NO such route; `TokenLadder.vue` is a foundations demo chassis, no standalone route to remove |
| blob consolidation (D6) | AX.W18 | `ls demo/stories/substrates/` = single `blob.vue`; no blob-mood/blob-interaction split |
| speedtest boundary (move ownership) | AV.W17 `proof:speedtest-boundary` GREEN | the 8 speedtest-origin composables STAY-as-CORE, MOVED→speedtest = 0; SUPERSEDED, do not re-open |
| slider zoo collapse | AX.W59 `a730782` `proof:slider-two-only` | `slider/index.ts` ships exactly `standard` + `spectrum` |
| `configurator-as-primitive` | AX | the only configurator route is `compositions/configurator` (correctly a Composition); the D1 configurator-DESIGN defect is a SEPARATE aurora-configurator lane — NOT folded here |
| `evalFourier` dead export | **AY.W-FF2** (the sibling wave) | OUT OF SCOPE here — W-FF2 §2.6 owns the delete; this wave must NOT touch it |

### 1.4 Why this is an H-lane defect, not bookkeeping

If the wave is dispatched as "delete the header-ribbon route", `proof:no-orphan-demo-route` goes GREEN (the file
↔ row equality holds) and the close declares "IA done" — while the `/header-ribbon` subpath + `package.json`
export + `api` type remain published with zero consumers. That is the substrate-without-consumer-binary invariant
(L invariant 8) violated, hidden behind a green structural gate — the EXACT chronic the H-chronic-defer lane
named (§1 row F: "each tranche says 'IA done' and the specific routes survive"). The fix is a component-level
gate (G2) whose green requires the orphan to be RETIRED or EVIDENCED, not merely de-routed.

---

## 2. Objective (the verdict + the retire, gestalt — root-not-consumer, clean break)

### 2.1 RETIRE `header-ribbon` (O1, clean break)

Delete the component dir and every published seat, no alias (no-backwards-compat precept, L invariant 4):

- `src/components/custom/header-ribbon/` — delete the whole dir (`index.ts`, `HeaderRibbon.vue`, `types.ts`).
- `src/subpaths/header-ribbon.ts` — delete the subpath mirror barrel.
- `package.json` — delete the `"./header-ribbon"` export entry (`:312-315`) AND the
  `typesVersions["*"]["header-ribbon"]` entry (`:121-122`).
- `src/api/index.ts` — delete the `HeaderRibbonPosition` / `HeaderRibbonProps` type seat (`:200-207`) + its
  header comment block.
- `demo/stories/navigation/header-ribbon.vue` — delete the story.
- `demo/stories/manifest.ts` — delete the `s("navigation", "header-ribbon", …)` row.

### 2.2 RETIRE `glass-panel` (O2, clean break)

- `src/components/custom/glass-panel/` — delete the dir (`index.ts`, `GlassPanel.vue` incl. its scoped
  `.glass-panel` CSS).
- `src/subpaths/glass-panel.ts` — delete the subpath mirror barrel.
- `package.json` — delete `"./glass-panel"` export (`:356-359`) + `typesVersions["glass-panel"]` (`:91-92`).
- `src/api/index.ts` — delete the `GlassPanelVariant` (`:99`) + `GlassPanelProps` (`:158`) type seats + their
  comment blocks.
- `demo/stories/substrates/glass-panel.vue` — delete the story; `demo/stories/manifest.ts` — delete its row.
- `demo/stories/foundations/paper-glass.vue` — this story USES `<GlassPanel>` (import `:4`; mount `:200-248`;
  it ALSO declares a LOCAL `type GlassPanelVariant` alias `:22-33` for its panel-examples data). RE-EXPRESS it on
  the surviving glass surface. **Note: `glass-material` is the `.glass-material` CSS class in `glass.css` (`:61`),
  NOT a `<GlassMaterial>` component** (verified at HEAD: `grep -rln GlassMaterial src/` → 0; there is no
  `src/components/custom/glass-material/` dir and no `GlassMaterial` export). So the re-express target is a
  `<div>` carrying a `.glass-*` rung class (e.g. `.glass-floating` / `.glass-card`) + the `paper-grain-overlay`
  utility the panels already wear — NOT a component swap. The `:tier/:variant/:blur/:refraction/:chromatic-aberration`
  GlassPanel renderer props have no `.glass-*` equivalent (they drive GlassPanel's per-instance WebGL filter); the
  re-expressed demo drops the renderer-tier matrix and presents a plain 3-rung `.glass-*` paper-over-glass card row
  (the paper-grain-over-glass demo intent — that is what a foundations story should teach, not GlassPanel's private
  renderer ladder, which retires WITH the component). DELETE the local `type GlassPanelVariant` alias `:22-33` and
  re-key the panel-examples data to the chosen `.glass-*` rung names. The story stays (paper-glass is a legitimate
  foundations demo); only its GlassPanel dependency + the local GlassPanel-Variant alias are removed. (If the
  foundations IA would rather demo the renderer-tier ladder, that lesson already lives at
  `substrates/glass-material.vue` — verify before duplicating; record which in PROGRESS.)
- **Consumer-evidence reconciliation.** `docs/consumer-evidence/README.md` rows
  `createGlassFilter`/`destroyGlassFilter`/`GlassFilterState`/`GlassTier`/`useGlassRenderer`/`useSortable` etc.
  cite "glass-ui source GlassPanel" as their consumer (FIVE rows verified at HEAD:
  `createGlassFilter`, `destroyGlassFilter`, `GlassFilterState`, `GlassTier`, `useGlassRenderer` — all carry
  "glass-ui source GlassPanel" in `consumer-evidence/README.md`). After the retire, audit each — grep their
  REMAINING consumers (`rg "createGlassFilter|useGlassRenderer|GlassTier" src/ demo/`). **The likely survivor is
  `src/composables/glass/useGlassRenderer.ts` itself** (verified at HEAD: `useGlassRenderer.ts` composes
  `createGlassFilter`/`destroyGlassFilter`/`GlassFilterState`, and `GlassTier`/`useGlassRenderer` carry the
  `demo/stories/composables/use-glass-renderer.vue` story) — so the four filter-family artefacts re-point their
  evidence-doc consumer line from "GlassPanel" to "glass-ui source useGlassRenderer" (the surviving sibling
  composable), and `useGlassRenderer` itself keeps its existing evidence doc + its demo-story consumer. UPDATE
  each affected evidence-doc consumer line to the survivor; if (contrary to the HEAD evidence) NONE survives, that
  artefact becomes a NEW orphan and is caught by G2 (forward it to the same retire pass OR re-point to a live
  consumer). This reconciliation is IN SCOPE — a retire that leaves dangling consumer-evidence is an incomplete
  clean break.

### 2.3 KEEP + BOOK `useTokenColor` (O3)

No source edit. Author `docs/consumer-evidence/use-token-color.md` (the per-artefact note format the dir already
uses) documenting the speedtest external consumer (`useMeterTokenColors.ts:19,36-37`) + the constellation/hero
demo consumers, and add a row to `docs/consumer-evidence/README.md`'s table:
`| useTokenColor | use-token-color.md | speedtest meter token colors + demo constellation/hero | AY |`.
This is the `keep-current` defense the G2 gate reads — the export stays because it is documented-evidenced, not
because the audit forgot to check it.

### 2.4 FIX native-top-layer — fold into Dialog/HoverPopover (the FIX-ROUTE execution)

- `demo/stories/containers/dialog.vue` — add a native-`<dialog>` opt-in SECTION (a `<StorySection>` labelled
  e.g. "Native top-layer (`<dialog>` + `commandfor`)") that hosts the `<GlassDialogNative>` + `commandfor`
  trigger + capability-detect rows moved from `native-top-layer.vue:55-98`. `GlassDialogNative` stays
  demo-private (its import path moves into `dialog.vue`).
- `demo/stories/containers/hover-popover.vue` (the HoverPopover story; manifest row `:198`) — add the
  `HoverPopover :native interestfor` opt-in row moved from `native-top-layer.vue:102-115` (the `:native="true"`
  vs reka-default comparison).
- `demo/stories/containers/native-top-layer.vue` — DELETE the standalone story.
- `demo/stories/manifest.ts` — DELETE the `s("containers", "native-top-layer", …)` row (`:188`).
- The fold preserves the capability-probe content (it does not drop the `commandfor`/`interestfor`/`@supports`
  feature-detect — it relocates it under the primitive it augments), so no demo CAPABILITY is lost; only the
  standalone route is.

### 2.5 The NEW component-orphan gate (the institutional fix — the verdict can't relapse)

The chronic recurs because no machine asserts the component-level bar (only the route-level
`proof:no-orphan-demo-route` and the export→story `proof:storybook-complete` exist, neither of which fails on a
published-but-unconsumed component). Author `scripts/proof-component-orphan.mjs` (the
`proof-no-orphan-composable.mjs` house shape — pure exported detector, byte-stable JSON artefact via
`gate-output.mjs`, self-test, `process.exit(1)` on violation). It asserts, for each surveyed unit, ≥2 non-self
consumers OR a `docs/consumer-evidence/<artefact>.md` entry. SURVEY SET:

1. Every `src/components/custom/<pkg>/` package that is PUBLISHED (on the root barrel `src/index.ts`, OR a
   `src/subpaths/<pkg>.ts` flat subpath, OR an `src/api/index.ts` type seat) — its consumers are counted across
   `src/ demo/ ../slides/src ../speedtest/src ../fourier-analysis/web/src ../words/frontend ../bbnf-lang/playground`
   (the consumer-evidence's declared consumer repos), EXCLUDING the component's own dir + its own demo story
   (the "non-self" rule). A demo story is NOT a binary consumer (it is the demonstration, not a load-bearing
   use) — so a component whose ONLY consumer is its own story is an orphan unless evidenced.
2. Every flat subpath in `src/subpaths/*.ts` resolves to a survey-set component (no dangling subpath).
3. Every root-barrel composable export (`src/index.ts` `export *` reach into `composables/`) has ≥2 non-self
   consumers OR a consumer-evidence doc.

The allowlist is the `docs/consumer-evidence/` dir CONTENTS (drift-proof — a kept export earns its keep by
having a doc, exactly the `keep-current` mechanism the README §1 describes), NOT a hardcoded name list.
SELF-PROVING: a synthetic phantom package record with 0 consumers + no evidence doc is injected each run; if the
detector fails to flag it, the gate REDs (the bite is demonstrated every invocation, the
`proof-disposition-live` pattern).

Wire into `package.json` `proof:*` + `scripts/gates.mjs` local registry + `.github/workflows/ci.yml` (the
no-orphan-composable CI block is the model). The new gate is born-RED at the pre-edit HEAD (header-ribbon +
glass-panel are published with 0 non-self consumers and no evidence doc → 2 violations) and GREEN after the
retire.

> **Cross-wave coordination.** This gate's survey set will see the FourierField component (W-FF2 lands it with an
> api seat + 2 external slides consumers — clears the bar) and the constellation/aurora/blob substrates (W-CON*/
> W-AUR*/W-BLOB* — externally consumed). W-SB1 authors the gate; if a sibling wave's surface is mid-flight at
> W-SB1's close, that surface either already clears the bar (≥2 consumers) or is allowlisted by its own
> consumer-evidence doc. The gate does NOT hardcode the current orphan list — it computes consumers live, so it
> stays correct as sibling waves land.

### 2.6 Out of scope (named successors — H-storybook §5 routing)

- The `evalFourier` dead-export delete → **AY.W-FF2 §2.6** (do NOT touch `fourier-field/index.ts`/`math.ts`
  here).
- Scattered-dock per-site triage, metric-badge/pill co-location, carousel/deck-progress disambiguation →
  **AY.W-SB2** (the restructure/section-coherence wave).
- The cross-component animation/design LANGUAGE gate + the live-DELTA mandate for FIX/VERIFY routes →
  **AY.W-SB3**.
- The D1 configurator-DESIGN defect (hand-rolled non-idiomatic chrome) → the aurora-configurator-redesign lane,
  NOT this prune (H-storybook F7 — do not conflate).
- The full BOOK-backlog onboarding into `DISPOSITION-REGISTER.json` → **AY.W-CARRY** (H-chronic-defer §6); W-SB1
  adds only the `useTokenColor` keep-evidence, not the register reconcile.

---

## 3. Edit-sites (the exact write scope)

| File | Edit |
|---|---|
| `src/components/custom/header-ribbon/` | DELETE the dir (§2.1) |
| `src/components/custom/glass-panel/` | DELETE the dir (§2.2) |
| `src/subpaths/header-ribbon.ts` | DELETE |
| `src/subpaths/glass-panel.ts` | DELETE |
| `package.json` | DELETE `"./header-ribbon"` (`:312-315`) + `typesVersions["header-ribbon"]` (`:121-122`) + `"./glass-panel"` (`:356-359`) + `typesVersions["glass-panel"]` (`:91-92`); add the `proof:component-orphan` script entry |
| `src/api/index.ts` | DELETE `HeaderRibbonPosition`/`HeaderRibbonProps` (`:200-207`) + `GlassPanelVariant` (`:99`) + `GlassPanelProps` (`:158`) seats + their comment blocks |
| `demo/stories/navigation/header-ribbon.vue` | DELETE |
| `demo/stories/substrates/glass-panel.vue` | DELETE |
| `demo/stories/containers/native-top-layer.vue` | DELETE (folded — §2.4) |
| `demo/stories/manifest.ts` | DELETE 3 rows: `navigation/header-ribbon`, `substrates/glass-panel`, `containers/native-top-layer` (`:188`) |
| `demo/stories/foundations/paper-glass.vue` | RE-EXPRESS off `<GlassPanel>` (import `:4`, mount `:200-248`) onto a `.glass-*` rung `<div>` + `paper-grain-overlay`; DELETE the local `type GlassPanelVariant` alias (`:22-33`) — `.glass-material` is a CSS class, not a component (§2.2) |
| `demo/stories/containers/dialog.vue` | ADD the native-`<dialog>`/`commandfor` opt-in `<StorySection>` (§2.4) |
| `demo/stories/containers/hover-popover.vue` | ADD the `:native interestfor` opt-in row (§2.4) |
| `docs/consumer-evidence/use-token-color.md` | NEW — the `useTokenColor` keep-evidence (§2.3) |
| `docs/consumer-evidence/README.md` | ADD the `useTokenColor` table row (§2.3); RECONCILE any GlassPanel-cited rows (§2.2) |
| `scripts/proof-component-orphan.mjs` | NEW — the component-orphan gate (§2.5) |
| `scripts/gates.mjs` | ADD the `proof:component-orphan` row (local + ci registry) |
| `.github/workflows/ci.yml` | ADD a `proof:component-orphan` step (the no-orphan-composable block is the model) |
| `docs/tranches/AY/PROGRESS.md` | record the close + the per-route disposition table (§1.3) |

---

## 4. Hard Gate (evidence-backed; the completion criterion)

A grep alone is INSUFFICIENT (`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`). The gate is five clauses: a still-green
route gate + a NEW born-RED→GREEN component-orphan gate + deletion-proofs + a build/dts publication proof + the
keep-evidence + native-fold verification. ALL must hold.

### Clause G1 — `proof:no-orphan-demo-route` stays GREEN (route ↔ row equality preserved)

`npm run proof:no-orphan-demo-route` → PASS after the 3 row deletions + the native fold. Already CI-wired
(`.github/workflows/ci.yml:142-143`, `scripts/gates.mjs:421`). No orphan file (the deleted stories are gone), no
dangling row (the manifest rows are deleted in lockstep). Artefact: the gate's JSON
(`GLASS_UI_NO_ORPHAN_DEMO_ROUTE_ARTIFACT`) shows `danglingRows: []`, `orphanFiles: []`, `rowCount == fileCount`.

### Clause G2 — `proof:component-orphan` authored, born-RED at HEAD, GREEN after (the institutional fix)

`scripts/proof-component-orphan.mjs` — wired into `package.json` + `gates.mjs` + `ci.yml`. **Born-RED at the
pre-edit HEAD**: the artefact lists exactly the 2 violations `header-ribbon` (published, 0 non-self consumers, no
evidence doc) + `glass-panel` (published, 0 non-self consumers, no evidence doc). **GREEN after** the retire +
the `useTokenColor` evidence doc: every published `custom/` component + flat subpath + root-barrel composable has
≥2 non-self consumers OR a `docs/consumer-evidence/<artefact>.md`. Self-proving: the synthetic always-orphan probe
REDs the gate if the detector misses it (demonstrated each run). Artefact: the gate JSON with
`violations: []` post-edit and the survey facts (surveyed-count, evidenced-count, ≥2-consumer-count). This is the
clause that makes route-prune-≠-component-retire un-relapsable.

### Clause G3 — deletion-proofs for `header-ribbon` + `glass-panel` (clean break)

```
rg "HeaderRibbon|header-ribbon" src/ demo/ ../slides/src ../speedtest/src   →   0 code hits (only-removed)
rg "GlassPanel" src/ demo/ ../slides/src ../speedtest/src                    →   0 code hits (the COMPONENT + the local paper-glass alias both gone)
rg "\bglass-panel\b" src/components/ src/subpaths/ package.json src/api/index.ts  →  0 (the COMPONENT seats; the `.glass-material` CSS class is a SEPARATE token unaffected)
test ! -d src/components/custom/header-ribbon && test ! -d src/components/custom/glass-panel   →   both absent
test ! -f src/subpaths/header-ribbon.ts && test ! -f src/subpaths/glass-panel.ts              →   both absent
rg '"./header-ribbon"|"./glass-panel"' package.json                          →   0
rg "HeaderRibbon|GlassPanelVariant|GlassPanelProps" src/api/index.ts         →   0
```

The `foundations/paper-glass.vue` re-expression is verified by `grep -c "GlassPanel" demo/stories/foundations/paper-glass.vue` → 0 (the import, the mounts, AND the local `type GlassPanelVariant` alias are all gone) with the story still present. NOTE the deletion-proof greps the COMPONENT identifier `GlassPanel` and the COMPONENT subpath/export seats; it does NOT grep the bare token `glass-material` (a live CSS class the re-express may compose) — the clean break removes the GlassPanel *component*, not the `.glass-material` *rung*.

### Clause G4 — build + dts publication probe GREEN at the smaller surface

```
npm run build                →   GREEN (no broken import from the deleted dirs/subpaths)
npm run typecheck            →   GREEN (no dangling type ref to the deleted api seats)
npm run verify-export-types  →   GREEN — the subpath dts publication probe passes WITHOUT /header-ribbon + /glass-panel; the remaining published subpaths still resolve.
```

`verify-export-types` is the binding probe — it imports every published subpath + tsc-probes; the retire shrinks
the surface and the probe must pass the smaller set (a dangling `package.json` export would fail it).

### Clause G5 — the KEEP evidence + the native fold verified

- `docs/consumer-evidence/use-token-color.md` EXISTS and names the speedtest external consumer
  (`useMeterTokenColors.ts`) + the demo consumers; `docs/consumer-evidence/README.md` carries the
  `useTokenColor` table row. (This is what G2 reads to keep the export GREEN.)
- The native fold: `grep -c "native-top-layer" demo/stories/manifest.ts` → 0 (route retired) AND
  `test ! -f demo/stories/containers/native-top-layer.vue` (the standalone SFC is gone);
  `grep -c "GlassDialogNative" demo/stories/containers/dialog.vue` → ≥1 AND
  `grep -c ":native" demo/stories/containers/hover-popover.vue` → ≥1 (the capability probes relocated under the
  primitives they augment — no demo capability lost). `proof:no-orphan-demo-route` (G1) independently asserts no
  orphan SFC remains, so the deleted `native-top-layer.vue` cannot linger as a routeless file.

---

## 5. Convergence + named successors

W-SB1 converges when G1–G5 all verify. The remaining open §B11 items are named successors:
**AY.W-SB2** (scattered-dock triage + metric-badge/pill co-location + carousel/deck-progress disambiguation),
**AY.W-SB3** (the cross-component language gate + the live-DELTA mandate for FIX/VERIFY routes), **AY.W-FF2**
(the `evalFourier` delete + the FourierField land — a survey-set member of this wave's G2 gate), **AY.W-CARRY**
(the full BOOK-backlog register reconcile). The D1 configurator-DESIGN defect routes to the
aurora-configurator-redesign lane (NOT this prune). If a retire (G3) cannot complete cleanly because a
GlassPanel-cited consumer-evidence row resolves to a NEW orphan (§2.2 reconciliation surfaces a dangling
artefact), that artefact joins the retire pass OR is re-pointed to a live consumer in the SAME wave — the clean
break does not leave a dangling evidence row.
