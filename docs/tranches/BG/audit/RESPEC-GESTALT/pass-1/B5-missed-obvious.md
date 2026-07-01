# B5 — MISSED OBVIOUS ISSUES (lens B5, RESPEC-GESTALT pass-1)

**Date:** 2026-07-01 · Branch `tranche/BG` · HEAD `976dc890` · read-only, no edits.

## Verdict

The classic silent-failure hygiene classes from MEMORY are **clean at HEAD** — the discipline
has genuinely internalized: zero `hsl(var(--token))` double-wraps (the 5 hits are hue-number
`hsl(<h> s l)` or comments), zero real `:global()`-in-scoped uses (the 4 hits are cautionary
comments), zero `TODO/FIXME/HACK/XXX` in `src/`, zero stale `:pressed`/`v-model:search-term`/`tag=`
reka bindings, zero transitioned-but-unregistered `@property` customs (the snap class is closed),
and the BB clean-break retirements (`vaul`, `.glass-refract`→`.glass-lens`, `popover-animate`) left
**no live residue** — only documenting comments.

BUT the sweep surfaced one **live, obvious-to-a-designer, gestalt-cohesion defect that the wave/gate
machine walked straight past**: the **paper-texture system is bifurcated**. The `BD.W-PAPER-MORPHISM`
redesign (`paper.css`) diagnosed the old grain precisely — "`feTurbulence bf=0.65 4-oct` averages to
grey on hiDPI; `overlay`/`soft-light` collapse to IDENTITY against the cream/ink poles — invisible by
math" — minted a fixed replacement (`--paper-grain-tooth` + a `multiply`/`screen` blend law), and then
**left the diagnosed-broken texture live**: `--paper-clean-texture`/`--paper-aged-texture` (the exact
`bf=0.65/4-oct` and `bf=0.5/5-oct` clouds) are still defined AND still power the dock grain, the
interactive-glass hover grain, `<PaperBackdrop frequency="aged">`, and a dead `.paper-texture` @utility —
using the SAME `overlay`/`soft-light` blends the redesign declared self-cancelling. This is the D2
live-defect's *class* still live at the library level, only patched demo-locally. It hits every named
critique axis at once: missed-obvious, gestalt-incoherence (two texture systems), over-contrivance
(dead register beside its replacement), poor encapsulation (a primitive whose correctness depends on a
removed ambient), and a no-legacy violation.

The three shipped live-fixes (D1/D2/D3) each represent a class; **D2's class is the one still un-fixed at
the root** (below). D1 (parallax default-on) and D3 (wrong scalar) are genuinely resolved and their
classes do not recur elsewhere I could find.

---

## Findings (ranked by user-visibility)

### F1 — MAJOR — Paper-texture system bifurcation: the retired self-cancelling cloud ships beside its fix

`BD.W-PAPER-MORPHISM` (`src/styles/paper.css:1-38`) is unambiguous in prose: the prior
`feTurbulence baseFrequency='0.65' numOctaves='4'` cloud is a "self-cancelling no-op … averages to grey
on hiDPI," and "`overlay`/`soft-light` collapse to IDENTITY against a near-white cream wash / near-black
ink wash." It minted `--paper-grain-tooth` (140px coarse tooth, contrast-stretched, `multiply`/`screen`)
as the ONE texture and switched its own `paper-underpaint`/`paper-grain-overlay` utilities to it.

But the diagnosed-broken tokens were **never retired** and still have live consumers:

- **Definition (still live):** `src/styles/tokens/scale-paper.css:131-132` — `--paper-clean-texture`
  (`bf='0.65' numOctaves='4' opacity='0.04'`) and `--paper-aged-texture` (`bf='0.5' numOctaves='5'`),
  authored AY (`875c271a`, 2026-06-10), predating the redesign.
- **Dock grain (invisible by the redesign's own math):** `src/styles/dock/shell.css:262-273` —
  `.glass-dock::after { background: var(--paper-clean-texture); … mix-blend-mode: overlay }` (dark:
  `soft-light`, `:276`). This is *literally* the broken cloud + the *literally* self-cancelling blend
  the redesign condemned, on the flagship chrome surface. Low pixel-weight (0.025 opacity) but
  dead-by-math and using the retired token — pure gestalt rot.
- **Interactive-glass hover grain:** `src/styles/glass/ladder.css:485` — same
  `var(--paper-clean-texture)` + `mix-blend-mode: overlay`. (Intentional whisper, but on the retired
  token — it should ride the tooth like every other grain surface.)
- **`<PaperBackdrop frequency="aged">`:** `src/components/custom/paper-backdrop/PaperBackdrop.vue:31-33`
  binds `backgroundImage = var(--paper-aged-texture)` — a *library component* whose `aged` register
  resolves to the retired invisible cloud. Its docstring (`:5-11`) still describes the retired
  "`0.65-baseFrequency / 4-octave` grain" as "the default," fully stale.
- **Dead `.paper-texture` @utility:** `src/styles/cards.css:126-135` — `background-image:
  var(--paper-clean-texture); background-blend-mode: multiply` — **zero template consumers** (no
  `class="…paper-texture…"` anywhere in `demo/` or `src/`; `cartoon-surface` does NOT compose it —
  `cards.css:294` is border+shadow+lift only). Dead CSS painting the retired cloud.

**Why the machine missed it:** the paper redesign was scoped to `paper.css`; no gate asserts the OTHER
grain surfaces followed the migration, and `proof:page-prune` (`scripts/proof-page-prune.mjs:226`) only
checks the *ledger records a rename*, not that consumers migrated. A clean-break wave that renames a
token but leaves N old consumers is exactly the "N locally-correct patches, not ONE product" failure.

### F2 — MAJOR — The D2 gray-class root is a library encapsulation defect, patched only demo-locally

The D2 live-fix (`e40e5095`) touched **only `demo/` + `docs/` + one proof script — zero `src/`**
(`git show --stat e40e5095`). Its own DELTA
(`docs/tranches/BG/audit/visual/live-fixes/D2-paper-grain-DELTA.md`) states the root: `--paper-grain-tooth`
is by design a `saturate=0` **gray** speckle that "gets its warmth from the SUBSTRATE behind it," and
`BG.W-FIELD-AURORA` retired the universal warm plane — so any surface applying grain over a non-warm
substrate falls below the `BA.W-NO-GRAY` C≥0.02 floor and reads **metallic-gray**. The fix put a warm
CSS radial behind three demo surfaces; the *library primitive is untouched.*

Consequences still latent at HEAD:
- `<PaperBackdrop>` (`paper-backdrop/PaperBackdrop.vue:42`, a shipped root/subpath component) applies
  `paper-underpaint` (`paper.css:47`, the gray tooth) with **no warm-substrate guarantee** — a consumer
  mounting it over the default page gets gray, the exact defect, in the library.
- The DELTA itself defers `/foundations/intro` ("two category-card plates showed gray header zones …
  noted, not fixed here") — a known-gray surface left gray.
- The paper redesign's headline goal ("grain must be PLAINLY VISIBLE; if you squint, it FAILS") is
  *substrate-dependent* and thus unmet wherever the warm substrate is absent — an un-encapsulated
  primitive. The idiomatic fix warms the tooth **at the source** (tint the `saturate=0` speckle toward
  the warm-amber identity hue, or self-provide a warm base in `paper-grain-overlay`/`<PaperBackdrop>`),
  so grain-over-any-substrate stays on the no-gray floor without each consumer bolting a radial behind it.

### F3 — MINOR — `PaperBackdrop` prop/docstring desync with the shipped texture

`PaperBackdrop.vue:5-19` documents `frequency: "clean" | "aged"` as swapping the `0.65/4-oct` ↔ `0.5/5-oct`
textures — a register the redesign obsoleted. `"clean"` silently does nothing (no branch; falls through
to `paper-underpaint`'s tooth), `"aged"` binds the retired cloud (F1). The prop is a stale API surface:
it advertises a texture axis that no longer exists. Clean-break: either drop `frequency` or re-point both
arms onto tooth variants.

### Hygiene classes VERIFIED CLEAN (evidence the discipline held — do not re-audit)

- **`hsl(var(--token))` double-wrap:** 5 total hits, all hue-number `hsl(<h> s l / a)` (`select.css:188/192`,
  `--field-h` is a hue) or cautionary comments (`animations.css:379`, `scroll-tokens.css:60`). None paint wrong.
- **`:global()` in scoped SFCs:** 4 hits, all comments citing the MEMORY trap (`SectionPreviewCard.vue:173`,
  `SectionLanding.vue:248`, `motion/deck.vue:266`, `paper-glass.vue:264`). No live use.
- **Unregistered animated `@property`:** every transitioned motion custom (`--stage-t`, `--phase-tint-amount`,
  `--dock-punch-stretch`, `--motion-weight`, `--neck-t`) IS registered (`/tmp` comm was whitespace-fooled;
  hand-verified against the 60-entry `@property` set). `--dock-motion-resize` is a timing bundle, not a value.
- **Clean-break residue:** `vaul`, `.glass-refract` (class), `popover-animate`, `slide-in-from-side` —
  only documenting comments survive; no live selectors/imports/bindings.
- **`console.*` in normal use:** 7, all guarded dev-warnings or explicit fail-explicit contracts
  (`Progress.vue:64-69` is a deliberate prop-boundary throw/downgrade, well-shaped).
- **D1 (parallax default-on) generalization:** `DEFAULT_PARALLAX = 0` now (`constellation/constants.ts:146`);
  the remaining `DEFAULT_*_DRIFT`/`WANDER_JITTER` constants are subtle idle motion, not cursor-tracking — no recurrence.

---

## Fold candidates for the BG/BH plan

### FC1 — new-wave: `W-PAPER-TEXTURE-UNIFY` (fold F1)
**Gestalt approach (not a patch):** there is ONE paper-grain texture in the system, and it is
`--paper-grain-tooth` with the `multiply`(light)/`screen`(dark) blend law. RETIRE
`--paper-clean-texture` + `--paper-aged-texture` (`scale-paper.css:131-132`) with a clean break, no
alias. Migrate every live consumer onto the tooth + the correct blend: the dock `::after`
(`shell.css:262`), the glass hover grain (`ladder.css:485`), and `<PaperBackdrop frequency>`. DELETE the
dead `.paper-texture` @utility (`cards.css:126-135`) — zero consumers. Add a gate clause (extend
`proof:page-prune` or a new `proof:paper-texture-single`) that asserts `grep var(--paper-clean-texture)`
== 0 in `src/`, so the migration cannot half-land again. This is the no-legacy law applied literally:
the redesign already did the hard diagnostic work; this finishes the clean break it started.

### FC2 — new-wave (or amend the FIELD-AURORA/CATEGORY-CARD-WARM lineage): `W-PAPER-GRAIN-WARM-SOURCE` (fold F2)
**Gestalt approach:** warm the grain at the primitive, not per-demo. Option A (preferred, token-first):
tint `--paper-grain-tooth` off the pure `saturate=0` gray toward the warm-amber identity hue at the
source (a warm `feColorMatrix`/`feComponentTransfer` bias, or compose the tooth over a warm base inside
the `paper-grain-overlay`/`paper-underpaint` utilities), so `C≥0.02` holds on ANY substrate and the
"warmth from the substrate behind it" dependency is dissolved. Then **pull the three demo-local warm
radials into the library** (they become byte-equivalent no-ops the demos delete — presets-in-consumers
in reverse: the identity belongs in `src/`). Fold `/foundations/intro` (the DELTA-deferred surface) into
this wave's proof surface. Give `<PaperBackdrop>` a self-warm floor so it is correct standalone. Machine-
lock with a `getComputedStyle`→OKLab C≥floor π over a bare (no-warm-ancestor) `<PaperBackdrop>` + a
`paper-grain-overlay` glass tile, both modes.

### FC3 — plan-doc-edit / amend: `PaperBackdrop` API reconcile (fold F3)
Fold into FC1: drop or re-point the `frequency` prop and rewrite the docstring to describe the shipped
tooth. No orphaned API axis.

### FC4 — plan-doc-edit: generalize the clean-break gate discipline
The recurring meta-failure (F1) is: a clean-break rename lands its new token but leaves old consumers.
Add a standing check to the tranche's gate-hygiene canon — every token RETIRE wave must assert
`0` residual `var(--<retired>)` in `src/` (not merely "ledger records a rename"). Cheap, closes the
whole class the paper bifurcation exemplifies.
