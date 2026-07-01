# Lens B4 — Elegance of the CSS/token architecture

**Audit:** RESPEC-GESTALT pass-1 · **Date:** 2026-07-01 · **Branch:** `tranche/BG` @ `976dc890`
**Scope:** `src/styles/**` end-to-end — cascade order, token families, the glass axis basis, dead tokens, duplicate recipes, cascade fragility.

## Verdict

The CSS/token system is **accreted epicycles, not an orthogonal basis** — a locally-correct-per-wave layering that no longer reads as one designed material. The *axes* are defensible (`--glass-level` = opacity+blur clarity; `--glass-tint-*` = legibility darken; `--glass-depth` = deep-blur lerp; `--glass-accent` = per-instance rim chroma are genuinely disjoint concerns). The **plumbing under them is not**: the tint axis is applied at two different cascade layers depending on which `--glass-bg-*` token you happen to read, forcing 9+ hand-spelled `color-mix(in oklab, …)` re-spells and spawning the "substitution-vs-inheritance trap" that CLAUDE.md documents *recurring four separate times* as a live bug — the tell of an inelegant basis is that the docs themselves record it re-biting. Three BD-tranche waves each minted "the ONE shared glass register" (`.glass-atom`, `.glass-chip`, `.glass-capsule`) for **overlapping** consumer sets, so a single `<TagsInputItem>`/`<Slider>`/`<Badge>` composes two or three "canonical" registers at once. The token count has ballooned to **1,069 definitions across 99 CSS files (22,334 lines)**, of which **29 are alive only because a proof gate asserts they exist** (no real consumer), **9 more are abandoned BD "liquid-weight goo/worm" first-draft tokens** superseded by a JS composable but never deleted (a no-legacy-code violation), and 1 is flat dead. And the whole cascade resolves specificity ties by **fragile source order inside a single `@layer components`** — 40 files carry "must-import-after / source-order-win / cascade-trap" comments that will break silently on any reorder. This is fixable by clean-break consolidation into a small orthogonal basis; the identity is reproducible from far fewer moving parts.

**Quantities (verified on disk):** 99 CSS files · 22,334 lines · 1,069 `--token:` definitions (842 excl. `@theme` generators) · 60 `@property` registrations · 351 `color-mix()` calls (183 `in srgb` / 96 `in oklab`) · 187 `--dock-*` tokens · ~97 glass-touching files · 9 files each claiming "the ONE canonical register" · 40 cascade-fragility markers · **39 dead-or-ceremony tokens** (29 gate-only + 9 goo/worm orphans + 1 truly dead).

---

## Findings (ranked by severity)

### F1 — MAJOR — The tint axis is applied at two cascade layers, forcing 9+ hand-spelled `color-mix` re-spells (the recurring "substitution trap")

The opacity axis is composed once at `:root`: `tokens/glass.css:273-277` mints the five tier bgs as `color-mix(in srgb, var(--card) calc((1 - (1-opacity)*--glass-level)*100%), transparent)`. But the **tint** axis (`color-mix(in oklab, <bg>, var(--glass-tint-source) var(--glass-tint-strength))`) is applied inconsistently:

- The *named-surface* bgs bake the tint IN at `:root` — `--glass-bg-dock` (`glass.css:283`), `--glass-bg-dialog` (`:293`), `--glass-bg-sheet`, `--glass-bg-clear` all wrap the srgb mix in the oklab tint.
- The five *tier* bgs (`glass.css:273-277`) do **not** — so every surface that wants a tinted tier must re-spell the oklab wrapper *inline at the element* (required, because a `:root`-baked token can't re-resolve against a descendant's `@container style(--glass-backdrop: light)` override of `--glass-tint-strength`).

The result: the oklab tint recipe is hand-copied across `glass/ladder.css`, `glass/surfaces.css` (the `--glass-bg-{resting,floating}-tinted` mint), `menu.css`, `feedback-tone.css`, the button `.btn-glass` arm, `dock/stack-rail.css`, etc. — **9 direct `color-mix(in oklab, var(--glass-bg-…), var(--glass-tint-source) …)` re-spells** plus the two `-tinted` duplicate tokens (`--glass-bg-floating-tinted` ×5, `--glass-bg-quiet-tinted` ×1). CLAUDE.md documents the fallout as the "substitution-vs-inheritance trap/seam" **four times** (dock morph-root, vertical dock plate, button register, on-glass-fg) — each a live bug where a surface read the pre-substituted `:root` token and silently failed to darken. **A recipe copied 9× that the docs record re-biting is an epicycle, not a basis.**

### F2 — MAJOR — Three overlapping "the ONE shared glass register" primitives with overlapping consumers

BD minted three separate "canonical" small-glass registers, each file claiming to be THE one:
- `glass/glass-atom.css` — "the ONE shared warm-glass register" (Badge-glass · metric-badge · slider fill · +N chip).
- `glass/glass-chip.css` — "the ONE warm-glass toggle register" (ToggleChip · SelectableChip · toggle-group).
- `glass/glass-capsule.css` — "the ONE shared glassy register" (segmented pill · dock-tab · Button glass · **chips** · **cards**).

Their consumer sets **overlap** (grep of `src/components`):
- `ui/tags-input/TagsInputItem.vue` composes **glass-capsule AND glass-chip**.
- `ui/slider/Slider.vue` composes **glass-capsule AND glass-atom**.
- `ui/badge/index.ts` composes **glass-capsule AND glass-atom**.
- `custom/toggle-chip`, `custom/selectable-chip` compose **glass-capsule AND glass-chip**.

So the same component wears two or three "the ONE" registers simultaneously. Each BD wave (`W-GLASS-ATOM-REGISTER`, `W-CHIP-CONGRUENT-GLASS`, `W-TAB-IOS-CAPSULE`) reasoned locally and never reconciled with the sibling register minted in the *same tranche*. This is precisely the "N locally-correct patches, not one designed product" the user's verdict names. (9 files repo-wide carry a "the ONE canonical register" claim.)

### F3 — MAJOR — 39 dead/ceremony tokens: 29 gate-only, 9 abandoned goo/worm orphans, 1 truly dead

Cross-referencing every `--token:` definition against `var()` reads + JS `getPropertyValue` string reads + Tailwind utility usage, repo-wide:
- **1 truly dead:** `--search-result-text-secondary` (`tokens/sizing.css`), 0 readers anywhere.
- **29 alive ONLY via a `proof-*.mjs` gate string-asserting their existence** — no real paint/JS consumer. Families: `--spring-timeline-*` (6), the goo/worm squish tokens (below), `--dock-margin`, `--dock-menubar-reserve`, `--focus-ring` (the base, superseded by `--focus-ring-shadow`), `--glass-shadow`, `--glass-spine-blur`, `--motion-stagger-{tight,relaxed}`, `--motion-duration-{staged,complete-shimmer}`, `--select-font`, `--search-{button-size,result-text}`, `--z-debug`, etc.
- **9 abandoned "liquid-weight goo/worm" orphans (no-legacy-code violation):** `--pager-worm-{flow,duration,max-stretch}`, `--deck-goo-{flow,duration,max-stretch}`, `--carousel-goo-{flow,duration,max-stretch}` in `tokens/scheme-spring.css`. These are the BD.W-PAGER-GOO-MORPH "worm goo-morph between states" the user emphasized ("remember this always"). The worm **was** built — but in JS via `usePagerWorm.ts` driving `--worm-t` + `--stretch` (useLiquidFlex), **not** these CSS spring-curve tokens. `grep -rn 'var(--pager-worm\|var(--deck-goo\|var(--carousel-goo)'` over `src/demo` returns **zero paint readers** of the flow/duration/max-stretch channel (`CarouselContent.vue:199` *sets* `--carousel-goo-max-stretch: 1.32` but nothing reads it). They are first-draft substrate the JS implementation superseded and no one deleted — kept alive only by 3 gate scripts.

This is the over-contrivance signature doubled: ceremony (a gate) wrapped around dead code (an orphan token) that clean-break discipline should have deleted.

### F4 — MAJOR — 60 dark tokens dual-maintained by hand across `dark-arm.css` + `light-dark.css`

`tokens/dark-arm.css` (134 tokens, 32 KB — the largest token file) is the `.dark` fallback floor; `tokens/light-dark.css` (64 tokens) is the `light-dark()` enhancement arm. **60 tokens are declared in BOTH** (`--foreground`, `--card`, `--gold`, `--bronze*`, `--destructive*`, `--chart-*-label`, …) — every dark value authored twice and hand-synced. The dual-authorship is a real workaround (the light-dark() inset-shadow-trap per MEMORY), but it is **over-applied**: the trap only bites tokens whose value contains an inset-shadow fragment; plain colors (`--foreground`, `--card`, the metal quads) do not, yet carry both arms. If the library commits to a `light-dark()` baseline (Baseline 2024), the 134-token fallback floor collapses to just the shadow-bearing exceptions — a 32 KB file mostly retired and 60 dual-maintenance points reduced to single authorship.

### F5 — MAJOR — Cascade resolves by fragile source order inside one `@layer components`

Almost the entire component surface lives in a single `@layer components` (109 occurrences; only `@layer utilities`/`@layer theme` otherwise), so specificity ties between equal-specificity rules are broken by **source order** — determined by the `index.css` `@import` sequence *and* within-file order. **40 files carry "must load after / source-order-win / cascade-trap / @layer-loses-to-utility" comments** (`menu.css:7`, `index.css:142/195`, `glass/surface-axis.css`, the dock-rail trap, …). This is load-bearing-in-a-fragile-way: any `@import` reorder or file split silently changes which rule wins. The elegant transposition is an *explicit* layer basis (`@layer glass.base, glass.tier, glass.surface, component, override`) so precedence is declared once at the top and ties resolve by layer, not by the accident of import order — killing all 40 "must-import-after" hazards structurally.

### F6 — MEDIUM — Incomplete goo-filter DRY + confusing morph-file sprawl

CLAUDE.md (BD.W-MORPH-FIELD-WELD) claims GooFilter is "the library's ONE Safari-safe goo `<filter>` mount … the DRY union of the prior four byte-near-identical mounts." Yet **five distinct filter IDs are still referenced**: `#glass-goo` (7), `#pager-goo` (5), `#dock-fission-goo` (3), `#morph-goo` (2), `#dock-morph-goo` (1). If the graphs are byte-identical, five IDs where one suffices is the un-DRY'd residue — the mount was unified, the id-space was not. Compounding it, the dock/glass morph concern is spread across **five confusingly-named files** totaling ~2,233 lines: `glass/liquid-morph.css` (850), `dock/fission-bridge.css` (552), `dock/morph.css` (430), `motion/morph-field.css` (229), `dock/morph-bridge.css` (172) — `morph` / `morph-bridge` / `morph-field` / `fission-bridge` / `liquid-morph` name five different things with near-identical vocabulary. Poor naming/gestalt cohesion even where the code is arguably orthogonal.

### F7 — MINOR — `.glass-refract` → `.glass-lens` clean break left the file/id/token half-renamed

BB.W-LENSING renamed the class `.glass-refract` → `.glass-lens` (clean break) but the file is still `glass-refract.css`, the SVG filter id is still `#glass-refract`, and the token axis is still `--glass-refract` (`glass-refract.css:67-82`). Naming drift: the "clean break, no alias" was applied to the consumer-facing class only, not the internal id/token/file — a reader now has to know `.glass-lens` paints via `#glass-refract`. Also `glass-specular-track.css` + `glass-refract.css` + `glass/material.css` (core) + `glass/rim.css` (edge glint) spread the *specular/catch-light* concern across four files (the JS write is single-source `createSpecularWriter`; the CSS is not).

### F8 — MINOR — Blur is computed three parallel ways

`--glass-blur-<tier>` (level-scaled, `glass.css:143-158`), the deep family `--glass-blur-deep-*` (depth-lerp then level-scaled, `tokens/glass-deep.css:81-92`), and `--glass-blur-btn` (an alias re-pointed per-surface). Defensible as an opt-in tier, but it means "how blurred is this glass" has three answers depending on tier membership; a single `--glass-blur(tier, depth, level)` derivation would be cleaner once CSS `@function` is baseline (book it, don't force it).

---

## Fold candidates for the BG/BH plan

### FC1 — new-wave · `W-GLASS-TINT-BASIS` (fixes F1)
**Gestalt:** the tint is an *axis*, so it should be readable as ONE token, not re-spelled 9×. CSS can't lazily re-compose a `:root` token against a descendant `--glass-tint-strength` (the reason for the inline copies), so factor the oklab-tint wrapper into **one home**: a single `.glass-tinted-<tier>` utility set (or an `@apply`-able recipe) in a new `tokens/glass-tinted.css` that every surface *composes at the element* — the color-mix string lives exactly once. Retire the `--glass-bg-*-tinted` duplicate tokens and all 9 inline re-spells (clean break). The named-surface bgs (`--glass-bg-dock/dialog/sheet`) fold onto the same one recipe. Kills the "substitution-vs-inheritance trap" as a *structural* impossibility (there is no second layer to read the wrong token from). Fable design arm: verify the darken over a busy backdrop is byte-identical post-consolidation via DesignSync glass-band cards.

### FC2 — merge-waves · `W-GLASS-SURFACE-UNIFY` (fixes F2)
**Gestalt:** collapse `.glass-atom` + `.glass-chip` + `.glass-capsule` into ONE small-glass-surface basis — `.glass-surface` with modifiers (`--atom` loud/opaque, `--chip` toggle-punch, `--capsule` lifted-lozenge) — so a component composes exactly one register with an intent modifier, never two overlapping "canonical" ones. Retire two of the three files (clean break, no alias; re-point the ~15 consumers). This is a *merge* of three same-tranche waves that should have been one. Verifies the ≥2-consumer bar is met by the unified basis, not by three near-duplicate ones.

### FC3 — prune-wave · `W-DEAD-TOKEN-SWEEP` (fixes F3)
**Gestalt:** delete all 39 dead/ceremony tokens AND the gates that only assert them (double-ceremony removal — a gate whose sole job is to keep a dead token alive is itself dead). Specifically: retire the 9 goo/worm `-{flow,duration,max-stretch}` orphans in `scheme-spring.css` (the live worm drives via JS `--worm-t`/`--stretch` — clean-break delete the CSS first-draft; a no-legacy violation being cleaned), `--search-result-text-secondary`, and the 29 gate-only tokens after confirming each has no dynamic template-literal reader. Net: ~39 tokens + ~3 gate scripts removed. Quantify at close: token count 1,069 → ~1,030.

### FC4 — new-wave · `W-DARK-ARM-BASELINE` (fixes F4) — honest trigger
**Gestalt:** decide the `light-dark()` baseline. If the library commits to Baseline-2024 support, retire the `dark-arm.css` fallback floor down to only the inset-shadow-trap exceptions, collapsing the 60 dual-maintained tokens to single `light-dark()` authorship and shedding most of a 32 KB file. **Trigger (honest):** a browser-support decision the user/orchestrator owns — book it with the exact retirement diff pre-computed so the flip is one commit. Not a silent defer; a decided decision-point.

### FC5 — amend-wave · `W-CASCADE-LAYER-BASIS` (fixes F5)
**Gestalt:** replace the single-`@layer components` source-order dependence with an explicit layer stack declared once (`@layer tokens, glass.base, glass.tier, glass.surface, component, menu, override`). Migrate the 40 "must-import-after" rules into their precedence layer so ties resolve by *declared* precedence, not import accident. Removes an entire fragility class; each folded "cascade-trap" comment becomes a deleted comment. Structural, not cosmetic.

### FC6 — plan-doc-edit + prune · `W-GOO-DRY-FINISH` (fixes F6/F7)
**Gestalt:** finish the GooFilter DRY — collapse the 5 byte-identical `#*-goo` filter IDs to `#glass-goo`, retire the 4 alias IDs (clean break; re-point `url(#…)` call sites). Rationalize the 5 morph-file names into a coherent scheme (e.g. `dock/collapse.css`, `dock/goo-bridge.css`, `motion/morph-weld.css`, `glass/liquid-island.css`) so the vocabulary stops overloading "morph." Complete the `.glass-refract`→`.glass-lens` rename to the file/id/token (F7) so "clean break" is actually clean.

### FC7 — defer-honest · `W-GLASS-BLUR-FUNCTION` (F8)
Book the three-way blur unification behind CSS `@function` baseline. Honest defer with a named trigger (Baseline `@function`), not a silent one.
