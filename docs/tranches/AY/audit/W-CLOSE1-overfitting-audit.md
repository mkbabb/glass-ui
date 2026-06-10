# W-CLOSE1 overfitting audit — the AY terminal-close orphan scan

**Date** 2026-06-10 · **Branch** `tranche/AY` · **glass-ui** `3.9.0` (staged for the 3.10.0 cut) ·
**Mode** READ-ONLY analysis (the RETIRE edits landed in their owning waves; W-CLOSE1 AUDITS the
disposition)

**Scope** `{SCOPE_PATHS} = src/}` × `{CONSUMER_PATHS} = src/ demo/ ../slides/src ../speedtest/src}`
(the canonical glass-ui overfitting-audit fan-out per `docs/audits/overfitting-audit.md`, run over the
present tree at HEAD `83e1e3b2`). This is the terminal close re-run: the AX close ran the equivalent
(`W10-overfitting-audit.md` shape, read by `proof:au-final`); AY's terminal close owes the same
ZERO-ORPHANS verdict, read by `proof:ay-final` clause 7.

## §0 — Method + the census this run reads

The library is **already lean at the component level** — `proof:component-orphan` is green for all 31
published packages. This audit is the FINAL orphan scan over the artefacts the AX/AY hardening lanes
named: the `evalFourier` dead export, the AX library-orphan trio (`header-ribbon` / `glass-panel` /
`useTokenColor`), and the bespoke-copy CLASS (the slides feedback-coder Fourier deck arm). It reads the
two census documents — `docs/tranches/AY/audit/PRUNE-LEDGER.md` (the ruthless-superfluity ledger, the
5-retire + watercolor-dot disposition) and `docs/tranches/AY/audit/hardening/H-overfitting.md` (the
Finding-2/3/4 orphan enumeration) — and re-runs each artefact's grep at HEAD to verify the disposition
DISCHARGED (the RETIRE edits landed, or the keep is evidenced). Each row's verdict cites the exact `rg`
invocation re-run for this close.

## §1 — The named-orphan disposition table

| artefact | kind | def-site at HEAD | in-public-surface | sites (src/demo/consumers) | verdict | rationale (rg re-run for this close) |
|---|---|---|---|---|---|---|
| `evalFourier` | TS export (was on `/fourier-field`) | RETIRED — gone from `math.ts` | no | 0 code (1 slides design-doc prose) | **RETIRED** | W-FF2 deleted the export + the function. `rg "evalFourier" src/ demo/ ../slides/src ../speedtest/src` → only `slides/.../DESIGN-FOURIER-v2.md:184` (a markdown trace note, not code). `fourier-field/index.ts` now re-exports only `comp`/`positionsAt`/`dftFromPoints`/`makeEllipticSpectrum` (all internal-multi-site). Zero code call-sites. |
| `header-ribbon` | custom component + subpath + api seat | RETIRED — dir + subpath + seat GONE | no | 0 | **RETIRED** | W-SB2 retired the component dir, `src/subpaths/header-ribbon.ts`, the `package.json` export, and the `HeaderRibbonProps` api seat. `rg "HeaderRibbon\|header-ribbon" src/ demo/` → 0 hits; `ls src/components/custom/header-ribbon` → absent; `grep '"./header-ribbon"\|HeaderRibbon' package.json src/api/index.ts` → 0. |
| `glass-panel` | custom component + subpath | RETIRED — dir + subpath + CSS class GONE | no | 0 | **RETIRED** | W-SB2 retired `GlassPanel` (component + `/glass-panel` subpath + the `.glass-panel` CSS substrate + api seat). `rg "GlassPanel\b\|glass-panel" src/ demo/` → 0 hits; `ls src/components/custom/glass-panel` → absent. |
| `useTokenColor` | root-barrel composable | `src/composables/dom/useTokenColor.ts` | yes (root barrel) | 4 demo (`StoryHero.vue`, `substrates/constellation.vue`, `composables/use-token-color.vue` story, `manifest.ts`) | **keep** (≥2 sites) | The AX library-orphan is RESOLVED by demo-wiring (W-SB1 story surface). `rg -ln "useTokenColor" demo/` → 4 distinct files. The `useResolveTokenColor` sibling still explicitly disclaims being a consumer (correct — distinct purpose); the keep rests on the demo story sites, not on it. |
| bespoke-copy CLASS (slides feedback-coder Fourier deck) | consumer-side token-drift surface | `slides/.../decks/feedback-coder/theme.css` | n/a (slides repo) | the deck consumes `@mkbabb/glass-ui/fourier-field` (lib component) | **DISPOSITIONED — slides arm** | Per spec §6 (out-of-scope) + the D5 note: the bespoke-copy CLASS disposition is the SLIDES arm's job (a `proof:no-bespoke-visual` + the deck-local token re-points documented as named PRESETS per the presets-in-consumers precept). glass-ui-side: the feedback-coder deck already correctly consumes the lib `FourierField` (NOT a bespoke copy). The remaining `slides/.../til-briefing/constellation.ts` is the slides W-ADOPT target. NO glass-ui-side orphan: the library ships ONE `FourierField` + ONE `Constellation`, both consumed. |

## §2 — The PRUNE-LEDGER retire-execution disposition (the 5 excisions)

The ruthless-superfluity ledger (`PRUNE-LEDGER.md §3`) ordered 5 retires + 1 decision. Re-verified at
HEAD:

| retire | landed at HEAD? | rg / ls proof |
|---|---|---|
| R1 `dashboard` demo (RETIRE-DEMO) | YES — GONE | `ls demo/stories/compositions/dashboard.vue` → absent |
| R2 `deck-progress` (RETIRE-FULL, public-surface) | YES — GONE | `ls src/components/custom/deck-progress` → absent; `grep '"./deck-progress"' package.json` → 0; `MIGRATION.md` carries the removal note |
| R3 `underline` | FINISHED-AND-PUBLISHED (W-UNDERLINE) | the ledger's two-path "RETIRE-FULL OR finish-and-publish" resolved to PUBLISH: `src/components/custom/underline/` present, `src/subpaths/underline.ts` present, `"./underline"` in `package.json` exports + `typesVersions`, the api seats live. W-UNDERLINE is `live-verified`. No orphan — it cleared the bar with its consumer. |
| R4 `dialog-native` (RETIRE-FULL) | YES — GONE | `ls src/components/custom/dialog-native` → absent; `rg "DialogNative" src/ demo/` → 0 |
| R5 `instrument-rail` (RETIRE-FULL) | YES — GONE | `ls src/components/custom/instrument-rail` → absent; `rg "InstrumentRail" src/ demo/` → 0 |
| R6 `watercolor-dot` (DECISION) | KEEP-EVIDENCED | the recommended path: `docs/consumer-evidence/watercolor-dot.md` authored (booked DEMO-ONLY, the `substrates/blob.vue` companion, ≥2-consumer trigger = the value.js blob repatriation, mirroring `goo-blob`). `rg -ln "WatercolorDot\|watercolor-dot" demo/` → 2 (`manifest.ts`, `substrates/blob.vue`). No deletion; the evidence doc clears the bar honestly. |

## §3 — Orphan-scan: any NEW evalFourier-class orphans?

A fresh enumeration of `src/` exports re-pointed against the four consumer roots surfaced NO new
public-surface export with zero call-sites anywhere. The library's published surface is the 31-package
set the `PRUNE-LEDGER` censused — every one carries a real external call-site, an evidence doc, or a
load-bearing demo story (the `sortable-list`/`stacked-icons`/`typewriter`/leaf-subpath weak-KEEPs ride
their substrate/story). The `evalFourier` class (an export on a published subpath with literally zero
call-sites) does not recur: it was the SOLE such case and it is RETIRED.

## §4 — Verdict distribution

| verdict | count |
|---|---|
| keep | 26 (the PRUNE-LEDGER §2 KEEP set) + every `ui/` shadcn primitive |
| keep-current (evidenced) | 2 (`goo-blob`, `watercolor-dot`) |
| library-orphan | 0 |
| delete-unused | 0 |
| inline-and-remove | 0 |
| demo-only-private | 0 (the demo chassis primitives are demo-private by construction, not orphans) |
| RETIRED this band | 5 named (`evalFourier`, `header-ribbon`, `glass-panel`, `deck-progress`, `dialog-native`, `instrument-rail` — clean breaks) |

**Zero orphans.** Every `src/` artefact at HEAD has ≥2 consumer sites, is exported-with-real-consumers,
carries a `docs/consumer-evidence/<artefact>.md` booking, or is a demo-private helper. The `evalFourier`
dead export and the AX library-orphan trio (`header-ribbon` / `glass-panel` / `useTokenColor`) are all
dispositioned (RETIRED with deletion-proof, or demo-wired ≥2-sites); the bespoke-copy CLASS is the
slides-arm's documented-preset job, with NO glass-ui-side duplicate. `library-orphan | 0` ·
`delete-unused | 0`.
