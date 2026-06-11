# PRUNE-LEDGER — the ruthless superfluity audit (AY.W-PRUNE / USER-AUDIT C4)

**Date** 2026-06-10 · **Branch** `tranche/AY` · **glass-ui** `3.9.0` · **Mode** READ-ONLY analysis
**Directive (USER-AUDIT-2026-06-10 C4, verbatim):** *"Aggressively look for components of
superfluity that we might prune, like that dashboard item, etc. This should be ruthless. Leaner.
Audit for usage across our constellation of repos."*

---

## §0.AMEND — census-as-of + the consumer-roots model (AZ.W-PRUNE2 E4-7)

**census-as-of: HEAD `91623925` · re-grounded 2026-06-11 (AZ.W-PRUNE2).** The AY body census
below was taken at the AY HEAD; the constellation has MOVED under it. This block is the dated,
repo-scoped census model the next prune starts from — the AY rows are NOT rewritten (a dated
snapshot stays a dated snapshot), they are SUPERSEDED by this consumer-roots table where they
conflict.

**Which repos COUNT (a TS/Vue surface that can import the library):**

| repo | counts? | why |
|---|---|---|
| glass-ui (`src`, `demo`) | YES (self) | the library + its own stories |
| `slides/src` | YES | Vue deck; consumes dock/controls/status-dot/constellation (W-ADOPT in-flight) |
| `speedtest/src` | YES | Vue app; the heaviest cross-repo consumer (dock/aurora/metric-*) |
| `fourier-analysis/web/src` | YES | Vue app; consumes dock/tabs/metric-badge |
| `words/frontend/src` | YES | Vue app; consumes isMac/useWindowedStore/stacked-icons |
| `bbnf-lang/playground/src` | YES | Vue playground |
| `keyframes.js` (demo) | YES | binds `rainbow-vivid`/`rainbow-pastel` (E4-2 re-confirm) — note its census root is `keyframes.js/src` in `constellation.mjs`; the rainbow class consumers live under `keyframes.js/demo/` |
| **`sci-report`** | **NO (was a heavy cite in the AY body)** | now a **Python project** (`pyproject.toml` + `uv.lock`); `../sci-report/src` carries ZERO `.ts/.vue/.tsx` files → it can never import the lib's TS surface. **Every `sci-report` consumer cite in the AY rows below is STALE** (dock/controls/aurora/expandable-container/paper-backdrop/constellation/goo-blob/timeline all list sci-report — discount it). REMOVED from `proof:component-orphan`'s `CONSUMER_ROOTS`. |
| `value.js` | declares-but-never-imports | declares the peer but no live call-site at HEAD; not a counted root |

**`proof:component-orphan` `CONSUMER_ROOTS` re-audited against this table** — `../sci-report/src`
dropped (the dead Python root). The gate's census-as-of header records the same commit.

**Corrected counts (E4-8 — facts, no retires):** `stacked-icons = 2 ext` (the AY row read `0 ext`;
words/frontend composes `StackedIcons` at TWO sites —
`components/custom/definition/components/WordHeader.vue` +
`.../metadata/ProviderIcons.vue` — so it clears the ≥2-consumer bar on words alone, plus the demo
avatar pattern). The
sci-report-discounted packages still clear the bar on their OTHER real consumers (dock=31 even
without sci-report; aurora via speedtest/value-decl; expandable-container via speedtest;
timeline via speedtest). No package retires FROM the recount — it CLEARS candidates.

---

## §0 — Method + the honesty caveat on the green gate

`npm run proof:component-orphan` is **GREEN** (31 published packages, all clearing the
≥2-consumer-OR-evidence-doc bar). But that gate's "consumer" count is a **substring hit over ALL
code files under the consumer roots — including `dist/`, every sibling `docs/**.md`, and audit
ledgers** — so `aurora` reads "987 consumers", `dock` "921". Those are NOT real call-sites. The
gate proves *no published package is a total ghost*; it does NOT prove *leanness*. The user's bar is
**real cross-repo CALL-SITES + demo story-value**, which this ledger measures by hand.

**The real-call-site census** (sibling `*.{ts,tsx,vue,js}` SOURCE files only — `node_modules/`,
`dist/`, `docs/` excluded; the package's own dir + its own story excluded):

```
pkg                  ext-call-sites  repos
dock                 31              fourier-analysis,keyframes,sci-report,slides,speedtest,value.js
tabs                 11             fourier-analysis,speedtest,value.js
controls              9             keyframes,sci-report,slides,speedtest,value.js
aurora                8             sci-report,speedtest,value.js
metric-badge          8             fourier-analysis,speedtest
icon-tooltip          7             keyframes,speedtest
pulse                 6             speedtest
configurator          5             fourier-analysis,value.js
instrument-chassis    5             speedtest
labeled-field         5             keyframes,speedtest
search                5             value.js
status-dot            4             keyframes,slides
confirm-dialog        3             value.js
expandable-container  3             sci-report,speedtest        (+evidence doc)
infinite-scroll       3             fourier-analysis,speedtest
paper-backdrop        3             sci-report,speedtest
animated-digit        1→real        fourier-analysis (CoefficientsSpectrum.vue)
constellation         1             sci-report
fourier-field         2             slides
goo-blob              1             sci-report                  (+evidence doc, booked DEMO-ONLY)
hover-popover         2             fourier-analysis
metric-cell           1             speedtest (ResultDetailSheet.vue)
metric-stack          1             speedtest (ResultStack.vue)
scrolling-text        2             speedtest
timeline              2             sci-report,speedtest
toggle-chip           1             speedtest
─── ZERO real external call-sites ───
deck-progress         0             (slides uses its OWN deck-local progress bar)
dialog-native         0             UNPUBLISHED (no subpath, no export, no api seat)
instrument-rail       0             UNPUBLISHED (no subpath, no export, no api seat)
sortable-list         0             (internal aurora-demo + sortable story only)
stacked-icons         0             (avatar + stacked-icons demo only)
typewriter            0             (hero + typewriter demo only)
underline             0             HALF-PUBLISHED (dist+api seats, NOT in package.json exports)
watercolor-dot        0             (blob.vue substrate composition only)
canvas    (leaf)      0
fourier-math (leaf)   0
motion-curves (leaf)  0
color     (leaf)      2             value.js
```

**Grading rule (ruthless but honest, respecting L inv 8 — substrate-without-consumer is binary):**
a **RETIRE-FULL** requires `0 real external call-sites` **AND** `no load-bearing demo story-value`
**AND** `no evidence doc + roadmap`. A **RETIRE-DEMO** kills a filler story while the component
lives. Everything with ≥1 real call-site, or an evidence-doc booking, or a substrate the demo
genuinely showcases, is a **KEEP** / **KEEP-EVIDENCED**.

---

## §1 — The named candidate: `/compositions/dashboard`

**VERDICT — RETIRE-DEMO (the story dies; every component it composes lives independently).**

The user: *"sucks — what is even the point of some of these components?"* (B17). The dashboard is a
**pure-recipe story** — it composes ONLY `Card`/`Table`/`Badge`/`MetricBadge`, every one of which
already has its OWN dedicated story (`display/metric-badge.vue`, `data/table.vue`, `display/card.vue`,
`display/badge.vue`) AND real external consumers. It teaches **nothing a primitive story doesn't**;
it is a fake-admin-panel mock (made-up metrics, a project table of in-house repo names) whose only
job was "show the primitives together". The W-SB-REVERIFY lane already spent a fix on its KPI-squish
(the `text-title whitespace-nowrap` band, lines 125-152) — fixing a story that should not exist.
**The point the user is asking after IS the point: there isn't one.** The components are sound; the
*composition* is filler. Kill `demo/stories/compositions/dashboard.vue` + its manifest row. No
component, no subpath, no api seat dies — `MetricBadge`/`Card`/`Table`/`Badge` all keep their real
consumers and their own stories.

---

## §2 — Per-artefact ledger

### KEEP — real external call-sites (named)

| Artefact | Real ext call-sites | Disposition |
|---|---|---|
| `dock` | 31 (all 6 repos) | KEEP — the library's anchor surface |
| `tabs` (SegmentedTabs) | 11 (fourier, speedtest, value.js) | KEEP |
| `controls` (DarkModeToggle) | 9 (5 repos) | KEEP |
| `aurora` | 8 (sci-report, speedtest, value.js) | KEEP |
| `metric-badge` | 8 (fourier, speedtest) | KEEP |
| `icon-tooltip` | 7 (keyframes, speedtest) | KEEP |
| `pulse` | 6 (speedtest) | KEEP |
| `configurator` | 5 (fourier, value.js) | KEEP |
| `instrument-chassis` | 5 (speedtest) | KEEP |
| `labeled-field` | 5 (keyframes, speedtest) | KEEP |
| `search` | 5 (value.js) | KEEP |
| `status-dot` | 4 (keyframes, slides) | KEEP |
| `confirm-dialog` | 3 (value.js) | KEEP |
| `expandable-container` | 3 (sci-report, speedtest) | KEEP (+evidence doc) |
| `infinite-scroll` | 3 (fourier, speedtest) | KEEP |
| `paper-backdrop` | 3 (sci-report, speedtest) | KEEP |
| `hover-popover` | 2 (fourier) | KEEP |
| `scrolling-text` | 2 (speedtest) | KEEP |
| `timeline` | 2 (sci-report, speedtest) | KEEP |
| `fourier-field` | 2 (slides) | KEEP — slides is consumer #1; the substrate sibling to Aurora/Constellation |
| `color` (leaf) | 2 (value.js) | KEEP |
| `metric-cell` | 1 (speedtest `ResultDetailSheet.vue`) | KEEP — sole-but-real; speedtest's detail sheet |
| `metric-stack` | 1 (speedtest `ResultStack.vue`) | KEEP — sole-but-real; speedtest's result stack |
| `toggle-chip` | 1 (speedtest) | KEEP — sole-but-real |
| `animated-digit` | 1 (fourier `CoefficientsSpectrum.vue`) | KEEP — sole-but-real production count-up |
| `constellation` | 1 (sci-report) | KEEP — sole-but-real; the proximity-graph hero substrate (slides will re-adopt per L.W-ADOPT) |

Plus every `ui/` shadcn primitive (button/card/dialog/select/…) — all carry heavy multi-repo
real-call-site usage (button 17+35, card 14, forms 11+8, …); none is a prune candidate.

### KEEP-EVIDENCED — 0 external call-sites but a real evidence doc + roadmap

| Artefact | Ext | Why kept |
|---|---|---|
| `goo-blob` | 1 (sci-report) | **Booked DEMO-ONLY** with `docs/consumer-evidence/goo-blob.md` + a named ≥2-consumer trigger (the value.js repatriation). It is the demo's blob substrate (`substrates/blob.vue`, `compositions/empty-states.vue`) — a genuine showcase the user is actively iterating (B10/B18 rebuild). KEEP. |
| `watercolor-dot` | 0 | **No doc YET, but real demo story-value** — it is composed inside `substrates/blob.vue` as the CSS/SVG-blob companion to the WebGL goo-blob, and shares the `prng.ts` leaf. It is a one-file decorative primitive on a live story. **NEEDS an evidence doc to clear the bar honestly** (today it free-rides the substring gate). Disposition: KEEP-EVIDENCED *pending* a `watercolor-dot.md` booking, ELSE RETIRE-FULL. Flagged for W-CLOSE1. |
| `expandable-container` | 3 | (already counted above; listed here as the evidence-doc precedent) |

### RETIRE-DEMO — the story dies, the component lives

| Story | Why | Component fate |
|---|---|---|
| `compositions/dashboard.vue` | §1 — pure-recipe filler; every primitive has its own story + real consumers | `MetricBadge`/`Card`/`Table`/`Badge` LIVE |
| `compositions/hero.vue` *(re-grade)* | Typewriter showcase; the user (B16) reports its constellation invisible. KEEP if the constellation-hero teaches the substrate; the typewriter leg is the only custom mount. **KEEP the story** (it is the constellation hero showcase) — listed only to note it is NOT a prune target despite thin custom usage. | — (KEEP) |

(Only `dashboard` is a clean RETIRE-DEMO. The other compositions either showcase a real substrate —
`auth-shell`/aurora, `empty-states`/goo-blob, `instrument-chassis`, `configurator` — or teach a
pattern with no dedicated home — `drawer-live-behind`, `gate-pattern`, `form-validation`,
`math-paper`, `settings`. None is filler.)

### RETIRE-FULL — component + subpath + api seat die (0 call-sites, no story-value, no doc)

| Artefact | State | The kill |
|---|---|---|
| **`deck-progress`** | Published subpath + dist chunk + api seat (`DeckProgressProps`). **0 real consumers** — slides, the ONE intended consumer, ships its OWN deck-local `.deck-progress-bar` over the in-flow `<Progress>` (confirmed: slides `DeckView.vue` uses `<Progress variant="gradient">` + a scoped class, NOT `@mkbabb/glass-ui/deck-progress`). The AW.W16 "publish DeckProgress" hinge was a BOOK that slides explicitly declined. Demo story `navigation/deck-progress.vue` is the sole mount. | RETIRE-FULL (component + subpath + api seat + demo story). Public-surface delete. |
| **`underline`** | **HALF-PUBLISHED inconsistency**: the `/underline` chunk ships to `dist/underline.js` (vite globs `src/subpaths/*.ts`) and 5 api-seat types exist (`GlassUnderline*`), but `./underline` is **NOT in `package.json` exports NOR `typesVersions`** — so it is unreachable by consumers and pre-build (W-UNDERLINE never executed per NECESSITY-MATRIX `underline` lane = "MISSING, pre-build, born-RED"). **0 consumers.** Either FINISH-AND-PUBLISH (the W-UNDERLINE wave) or RETIRE. Per the user's "leaner/ruthless" + no-half-built-surface: **RETIRE-FULL now**; re-mint under W-UNDERLINE when the wave actually lands with its sci-report/slides consumer. | RETIRE-FULL (component dir + subpath barrel + 5 api seats). NOT a public-surface delete (never was in exports). |
| **`dialog-native`** | **UNPUBLISHED** — `GlassDialogNative` (native `<dialog>` wrapper) has NO subpath, NO export key, NO api seat, NO root-barrel re-export. 0 external consumers. Its ONLY mount is a section inside `containers/dialog.vue` (a "native settings modal" demo, lines 18/35/156-174). The shadcn `Dialog` (heavily consumed, 5+ repos) is the real dialog; this native variant was never published and has no consumer. **Borderline RETIRE-DEMO vs RETIRE-FULL** — the demo section is a genuine (if minor) showcase of the native `<dialog>` element. Recommend RETIRE-FULL (the native-dialog escape has no demonstrated demand and clutters the dialog story), but a defensible KEEP-as-demo-only if the team values showing the native path. | RETIRE-FULL (component dir + the `<GlassDialogNative>` section in `containers/dialog.vue`; nothing public to remove). |
| **`instrument-rail`** | **UNPUBLISHED** — `InstrumentRail` (cockpit-ratio rail) has NO subpath, NO export, NO api seat. 0 external consumers. Sole mount: the demo `compositions/instrument-rail.vue` (+ a `<code>` text mention in `dock/rail.vue`). `instrument-chassis` (5 real consumers) is the shipped chassis surface; the rail is a never-published sibling. | RETIRE-FULL (component dir + its demo composition + manifest rows). |

### KEEP — substrate/leaf with story-value but thin call-sites (NOT prune targets)

| Artefact | Ext | Why NOT pruned |
|---|---|---|
| `sortable-list` | 0 ext | Composed internally by the aurora-config demo (`PaletteLayer.vue`, `AuroraColorSection.vue` — drag-reorder of OKLCh stops) + has its own `data/sortable-list.vue` story + `useSortable` evidence doc. Real internal load-bearing use. KEEP. |
| `stacked-icons` | 0 ext | Composed by `data/avatar.vue` (the overlapping-avatar pattern) + its own story. Generic `StackedIconGroupProps<T>`. Thin but a legitimate primitive. KEEP — but it is the **weakest KEEP**; re-grade at next close if no consumer arrives. |
| `typewriter` | 0 ext | Composed by `compositions/hero.vue` (the hero typewriter) + its own `motion/typewriter.vue` story. Real demo showcase. KEEP — weak; re-grade. |
| `fourier-math` / `canvas` / `motion-curves` (leaves) | 0 ext | Pure type/util leaf subpaths feeding `fourier-field`/`constellation`/`motion`. Substrate plumbing, not standalone components. KEEP (they ride their parent's keep). |

---

## §3 — The RETIRE execution list (ordered, exact deletions a build agent runs)

Execute top-to-bottom. Each block is self-contained; run `npm run proof:component-orphan` +
`npm run build` + `npm run typecheck` after the batch.

### R1 — `dashboard` demo (RETIRE-DEMO; no public surface)
1. `rm demo/stories/compositions/dashboard.vue`
2. `demo/stories/manifest.ts` — delete the `dashboard` story row (the `compositions` category entry).

### R2 — `deck-progress` (RETIRE-FULL; **public-surface delete**)
1. `rm -r src/components/custom/deck-progress/`
2. `rm src/subpaths/deck-progress.ts`
3. `package.json` — delete the `"./deck-progress"` key from `exports` AND its `typesVersions["*"]["deck-progress"]` entry.
4. `src/api/index.ts` — delete lines 166-167 (`// AW.W16 — DeckProgress …` + `export type { DeckProgressProps } from "../components/custom/deck-progress";`).
5. `src/index.ts` — delete the `deck-progress` re-export (line found at `grep -n deck-progress src/index.ts`).
6. `rm demo/stories/navigation/deck-progress.vue` + delete its `manifest.ts` row.
7. Re-grep `DeckProgress` repo-wide → expect 0 src hits.

### R3 — `underline` (RETIRE-FULL; NOT a public-surface delete — never in `exports`)
1. `rm -r src/components/custom/underline/`
2. `rm src/subpaths/underline.ts`
3. `src/api/index.ts` — delete lines 101-110 (the `GlassUnderline*` seat block).
4. `rm demo/stories/motion/underline.vue` + delete its `manifest.ts` row.
5. Confirm no `./underline` key exists in `package.json` (already absent — the inconsistency self-heals).
6. NOTE: re-mint cleanly under the W-UNDERLINE wave WITH its sci-report `HandUnderline`/slides consumer and a real `package.json` export. (The `/handmark` `InkMark` surface sci-report references is a SEPARATE planned export — not this `underline` dir.)

### R4 — `dialog-native` (RETIRE-FULL; no public surface)
1. `rm -r src/components/custom/dialog-native/`
2. `demo/stories/containers/dialog.vue` — remove the `GlassDialogNative` import (line 18), the `settingsDlg` ref (line 35), and the `<GlassDialogNative>` section (lines 156-174). The primary shadcn `<Dialog>` showcase stays intact.
3. Re-grep `DialogNative` → expect 0.

### R5 — `instrument-rail` (RETIRE-FULL; no public surface)
1. `rm -r src/components/custom/instrument-rail/`
2. `rm demo/stories/compositions/instrument-rail.vue`
3. `demo/stories/manifest.ts` — delete the `instrument-rail` composition row.
4. `demo/stories/dock/rail.vue` — drop the `<code>&lt;InstrumentRail&gt;</code>` text mention (cosmetic).
5. Re-grep `InstrumentRail` → expect 0 (chassis `InstrumentChassis`/`ChassisDivider` are the survivors).

### R6 — `watercolor-dot` (DECISION REQUIRED — KEEP-EVIDENCED or RETIRE-FULL)
- **If KEEP** (recommended — it IS on a live, user-iterated story): author
  `docs/consumer-evidence/watercolor-dot.md` (booked DEMO-ONLY, the `substrates/blob.vue`
  companion, ≥2-consumer trigger = the same value.js blob repatriation as goo-blob). One file added; no deletion.
- **If RETIRE** (stricter reading): `rm -r src/components/custom/watercolor-dot/` +
  `rm src/subpaths/watercolor-dot.ts` + delete `"./watercolor-dot"` from `package.json` exports +
  typesVersions + remove its blob.vue composition. **Public-surface delete.** NOT recommended —
  it has live story-value; the honest fix is the evidence doc.

---

## §4 — Publish-impact note (the 3.10.0 semver story)

| Retire | Public-surface change? | Semver |
|---|---|---|
| R1 `dashboard` demo | NO (demo-private) | none |
| R2 `deck-progress` | **YES** — removes the `./deck-progress` export + `DeckProgressProps` type | **BREAKING** (a published subpath removed) — but **0 real consumers**, so the break is theoretical. Clean-break per [no-backwards-compat]. |
| R3 `underline` | NO — `./underline` was never in `package.json` exports; only the unreachable dist chunk + api-seat types go | **non-breaking** (the surface was never reachable); api `.d.ts` shrinks by 5 unused types |
| R4 `dialog-native` | NO (never exported) | none |
| R5 `instrument-rail` | NO (never exported) | none |
| R6 `watercolor-dot` | only if RETIRED — then removes `./watercolor-dot` (BREAKING-but-0-consumer) | KEEP-EVIDENCED → none |

**Net public surface:** of 72 `package.json` export entries, exactly **ONE real removal**
(`./deck-progress`) — and it has zero consumers, so the 3.10.0 bump is "MAJOR by letter, no-op by
reach". The `underline`/`dialog-native`/`instrument-rail` retires are **dead-code excisions** that
never reached the public contract (the half-published-vs-unpublished cleanup the leaner directive
wants). **Recommend folding all five retires into ONE 3.10.0 with a MIGRATION.md note for
`./deck-progress`** ("removed; never consumed; the deck progress bar is deck-local chrome over
`<Progress variant='gradient'>`").

---

## §5 — Return summary

```json
{
  "keep": 26,
  "keepEvidenced": 2,
  "retireDemo": ["compositions/dashboard.vue"],
  "retireFull": ["deck-progress", "underline", "dialog-native", "instrument-rail"],
  "publishImpact": "3.10.0 MAJOR-by-letter / no-op-by-reach: exactly ONE real public-surface removal (./deck-progress, 0 consumers); underline/dialog-native/instrument-rail are dead-code excisions that never reached the public exports (half-published or unpublished); watercolor-dot is a 6th candidate held as KEEP-EVIDENCED pending a one-line evidence doc (recommended) else a 2nd 0-consumer BREAKING removal."
}
```

**keep=26** = the §2 KEEP table (dock, tabs, controls, aurora, metric-badge, icon-tooltip, pulse,
configurator, instrument-chassis, labeled-field, search, status-dot, confirm-dialog,
expandable-container, infinite-scroll, paper-backdrop, hover-popover, scrolling-text, timeline,
fourier-field, color, metric-cell, metric-stack, toggle-chip, animated-digit, constellation) — the
weak-KEEPs `sortable-list`/`stacked-icons`/`typewriter`/leaf-subpaths ride their substrate/story and
are NOT in the headline count but are explicitly NOT retired.

**keepEvidenced=2** = `goo-blob` (has doc) + `watercolor-dot` (needs doc; held).

The library is **already lean at the component level** (the orphan gate is honestly green for all
but these 5). The ruthless cut is the **dead-alternate cluster** (`dialog-native`,
`instrument-rail`), the **declined BOOK** (`deck-progress`), the **half-built pre-wave surface**
(`underline`), and the **named filler story** (`dashboard`). Five excisions, one of them touching the
public contract with zero reach.
