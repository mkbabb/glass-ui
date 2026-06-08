# A-prune-token-color — REMOVE useTokenColor + use-token-color demo → DarkModeToggle (P1)

**Lane:** A-prune-token-color · **Severity:** major · **Verdict:** needs-user-decision (a
direct W21-disposition reversal) folded as **augment-W21** + **augment-W18**.

## The ask (pass-2 P1)

> `/composables/use-token-color` → remove; the icon → a darkmode toggle.

Two sub-asks: (a) REMOVE the `useTokenColor` composable + its demo story; (b) the demo
nav slot/"icon" the story occupied becomes a DarkModeToggle affordance.

## The blocking finding — P1 DIRECTLY REVERSES the W21 disposition

`useTokenColor` is NOT debris. A prior AX wave already audited it at source and ruled the
OPPOSITE of P1:

**W21 fold-5 (`AX.W21-…recat-…metric-reconcile.md:162-174`) — "JUSTIFY-AND-ANNOTATE
use-token-color (F3) — NO restructure."** W21's verdict: `useTokenColor` is a
*"well-formed, load-bearing, vueuse-FREE composable — the carefully-designed
root-barrel-safe alternative to reading `useGlobalDark` directly"*, satisfying the
≥2-sites overfitting bar (**exported on the root barrel + real Canvas/Aurora substrate
consumers + the demo**). W21's prescription was documentation-shaped: a file-head comment
+ an enriched `manifest.ts:254` blurb. W21 explicitly recorded this as the **inverse of a
prune** (`:585` *"use-token-color is the inverse — the audit's 'wtf' is REFUTED: it is
load-bearing… so the wave JUSTIFIES-AND-ANNOTATES (it is NOT debris) rather than
deletes"*).

P1 now says delete. **These cannot both stand.** Both W21 and W18 are still `planned`
(PROGRESS.md:34/37) — nothing has landed, so the reconciliation is a plan edit, not a
revert. This is **needs-user-decision**: the user's own pass-2 ledger overrides the
prior-wave keep, but the orchestrator must ratify that W21's load-bearing argument is
truly mooted (see the consumer census below — it ISN'T fully mooted, which reshapes the
fix).

## Consumer census at SOURCE (the load-bearing question)

`grep -rn useTokenColor src demo` — the real consumers of the *composable*:

| Site | Kind | Disposition under P1 |
|---|---|---|
| `src/composables/dom/index.ts:45` | barrel re-export | drop the line |
| `src/index.ts:142` | root-barrel doc-comment listing | trim the mention |
| `demo/stories/composables/use-token-color.vue:5` | the demo story (P1 target) | **delete the SFC** |
| `demo/stories/manifest.ts:254` | the composables reference-shelf row | **delete the row** |
| **`demo/stories/substrates/constellation.vue:19,25,63`** | **3 LIVE call sites** | **THE BLOCKER — see below** |
| `src/components/custom/tabs/BouncyToggle.vue:19` | **comment only** (inlines `readToken`, explicitly does NOT use it) | no-op; trim the comment ref |

**The blocker: `constellation.vue` is a second, real, surviving consumer.** It calls
`useTokenColor` THREE times — `--primary` (`:25`), and `--constellation-accent` (`:63`) —
to resolve tokens to concrete colors for a Canvas2D `fillStyle`/`strokeStyle` that cannot
resolve a raw `var()`, re-resolving on dark-flip. Constellation is a SURVIVING substrate
(pass-2 P7 explicitly WANTS aurora/constellation as page heroes; W17 shipped it and its
demo story stays). So `useTokenColor`'s ≥2-consumer bar is STILL MET after the
use-token-color story dies — exactly the "internal-only-rg blind spot" the metric-cell /
useBreakpoint mis-prune class warns about (`composables/dom/index.ts:38-42`).

**Conclusion: P1 removes the DEMO STORY, not the composable.** A blanket "REMOVE
useTokenColor" excision would dangle `constellation.vue`'s three call sites and break the
build. The composable is load-bearing exactly as W21 found — the reconciliation is:
**delete the `composables/use-token-color` reference-shelf story (the ask's literal P1
target), KEEP the composable (constellation needs it), and DROP W21's fold-5
justify-annotate as now-redundant** (we don't need to enrich the blurb of a row we're
deleting).

## The "icon → a darkmode toggle" sub-ask

The composables category is a `reference: true` shelf (`manifest.ts:251`); each row's
"icon" is the category `Cog` glyph (`manifest.ts:27`), not a per-story icon. Two readings,
both already covered:

1. **Most likely:** with `use-token-color` gone, the user wants the *demonstration* it
   provided — a live dark-mode toggle affordance — to persist somewhere visible. That
   already exists twice over: `primitives/dark-mode-toggle` (`manifest.ts:130`, the
   `DarkModeToggle` primitive story) AND `composables/use-global-dark` (`manifest.ts:255`,
   the `useGlobalDark` story). The use-token-color story's own toggle button
   (`use-token-color.vue:22,39`) is fully subsumed by these. No new story needed —
   **fold the dark-toggle demonstration into the surviving `use-global-dark` story** (or
   leave as-is; it's already shown).
2. **Literal:** swap the deleted row's demo-shell nav entry for a `DarkModeToggle`
   component instance. `DarkModeToggle` is exported (`controls/index.ts:1`, `/controls`
   subpath). If a literal in-shell toggle control is wanted, that belongs to the demo-shell
   nav, owned by **W40** (demo-shell dock-nav coherence). This is a needs-user-decision
   nuance — the orchestrator should confirm which reading before authoring.

## Gestalt fix (the reconciled prescription)

1. **DELETE the demo story** — `demo/stories/composables/use-token-color.vue` + the
   `manifest.ts:254` row. (The export→row coupling: this is a DEMO prune, no src export
   moves, so the story-owning wave drops both together.)
2. **KEEP `src/composables/dom/useTokenColor.ts` + its barrel export** — constellation is a
   live ≥2-bar consumer; the composable stays on the root barrel (vueuse-free, SCC-safe).
3. **DROP W21 fold-5** (the justify-and-annotate): it was predicated on KEEPING the demo
   row whose blurb it enriched. With the row deleted, the file-head placement comment is
   still *nice-to-have* (next-auditor guard) but the manifest-blurb enrichment is moot.
   Reduce W21 fold-5 to the file-head comment only, or retire it entirely.
4. **Re-baseline the IA gate** — `proof-storybook-ia.mjs` EXPECTED_TREE composables set
   must drop `use-token-color`; `proof:no-orphan-demo-route` re-greens against the deleted
   SFC. W18 owns the final EXPECTED_TREE re-baseline (Scope-9, LAST).
5. **Dark-toggle persistence** — confirm with user (reading 1 vs 2). Default to reading 1
   (no new artefact; `use-global-dark` + `dark-mode-toggle` stories already demonstrate it).

## Dedup verdict

- **Augment W18 (storybook IA reinvention).** W18 already OWNS the composables-category
  framing + the final EXPECTED_TREE re-baseline. The `use-token-color` row deletion is one
  more row W18's category-author pass removes (it frames the SURVIVING reference shelf).
  Add an explicit line: drop `composables/use-token-color` from the composables set; the
  dark-toggle demonstration survives via `use-global-dark`. This is the natural home —
  W18 is the demo-IA wave and is still `planned`.
- **Augment W21 (recat/ledger).** REVERSE fold-5: it currently says
  justify-annotate-KEEP-the-row; pass-2 P1 says delete-the-row. Reconcile to: delete the
  demo story (fold into W18), keep the composable, retire the manifest-blurb enrichment.
  W21 is the wave that audited this composable at source — it must not ship the
  contradicting keep.
- **NOT a net-new wave.** Two planned waves already own the two halves (W18 = the demo
  row/IA; W21 = the composable's load-bearing ledger). No new wave warranted.
- **NOT W19/W29 (the component-prune waves).** W19 prunes header-ribbon/glyph-face/
  disco-glyph; W29 the instrument families. Neither touches `composables/dom/` or the
  composables manifest category. Cross-ref only — they're the wrong owners for a composable
  reference-shelf story.

## Falsifiable acceptance

- `grep -rn useTokenColor demo/stories/composables` → 0 (story SFC gone).
- `grep -n use-token-color demo/stories/manifest.ts scripts/proof-storybook-ia.mjs` → 0
  (row + EXPECTED_TREE entry gone).
- `grep -rn useTokenColor src/composables/dom` → still present (export survives).
- `grep -rn useTokenColor demo/stories/substrates/constellation.vue` → still 3 hits (the
  load-bearing consumer is untouched).
- `npm run build` green (no dangling import from the constellation consumer).
