# D5 — The token system from first principles (the minimal orthogonal basis)

**Lens:** D5 · token-transposition · RESPEC-GESTALT pass-1
**Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `976dc890`
**Scope:** the CSS custom-property basis under `src/styles/` — census, ideal basis, merge/kill, transposition wave shape.

---

## Verdict

The token system is **structurally sound at the leaves and broken at the joints**. The hand-calibrated identity values — the warm HSL ladder, the per-tier alpha rungs, the spring `(response, ζ)` table — are excellent and are the product; they must be protected byte-for-byte. But the *structure around them* has accreted three architectural warts that each violate the "one token = one recipe site" rule, and the accretion is invisible because the census is uncountable: **1069 unique token names declared across 74 files in 2555 declaration lines**, consumed through four un-manifested channels (`var()`, Tailwind `@theme` utility-gen, Tailwind `prop-(--token)` arbitrary shorthand, JS `getPropertyValue`/`readNum`/`readToken`). No single artefact answers "is this token alive, and what recipe produces it." That un-countability is itself the disease: dead tokens survive indefinitely and every wave mints more.

The three joint failures, in severity order:

1. **The dual-mode-arm identity duplication** — every dark identity COLOR is authored **twice**, once in `dark-arm.css` (`.dark {}` fallback floor) and once in `light-dark.css` (`light-dark()` arm). ~60 hand-calibrated color values maintained in lockstep by hand. This is a full legacy fallback arm inside a "clean break, no legacy" design language.
2. **The composite-at-`:root` breaks inheritance** — `--glass-bg-*` is composed once at `:root` (glass.css:273-277), so a descendant overriding an *input* (`--glass-opacity-*`, `--glass-tint-*`) does NOT re-compose the bg. The documented "substitution-vs-inheritance trap" is re-hit at dock, button, menu, feedback-tone, cards — each re-spells the same `color-mix(in oklab, …)` inline. One recipe, ≥5 spell sites.
3. **The liquid-weight goo/stretch register is N parallel token triples, no shared basis** — carousel/deck/pager/dock/tab each mint their own `*-goo-*`/`*-max-stretch` tokens; several are dead.

The exemplar to build the whole basis toward already exists in-repo: the spring tokens (`scheme-spring.css`) are **generated from one `(response,ζ)` table** via `regen-spring-tokens.mjs` — single source of truth, no hand duplication. Every identity family should be produced the same way.

---

## The census (verified on disk 2026-07-01)

| Metric | Count | Source |
|---|---|---|
| Unique token NAMES declared | **1069** | `grep -rhoE '^\s*--[a-z0-9-]+\s*:' src/styles/ \| … \| sort -u` |
| Total declaration LINES (redeclares incl.) | **2555** | same, no `-u` |
| → implied redeclarations (mode arms + scope overrides) | **~1486** | 2555 − 1069 |
| Files declaring tokens | **74** | not 17 — tokens spread across the whole `src/styles/` tree |
| `@property` registration blocks | **68** (62 in `property-regs.css`+scatter across 10 files) | `grep -rE '^@property'` |
| Radius ladder tokens | 20 | |
| Type / text-size tokens | 68 | |
| Spacing / padding / gap / inset tokens | **98** | |

**Redeclaration hotspots** (`sort \| uniq -c \| sort -rn`): `--motion-weight` ×14, `--glass-tint-strength` ×13, `--glass-tint-source` ×9, the four `--metal-stop-*`/`--metal-shimmer-color` ×8 each, `--specular-intensity` ×7, `--muted-foreground` ×7, `--glass-border-rung` ×7, `--glass-level` ×6.

**The channel problem (why dead-token detection is unreliable).** A naive "declared but never `var()`-read" scan flags **291** tokens. But that count is ~200 false-positives from Tailwind `@theme` bridges (`--color-*` ×85, `--text-*` ×23, `--z-*` ×18, `--spacing-*` ×11, `--animate-*` ×11, `--shadow-*` ×10, `--ease-*` ×10, `--tracking/leading/blur/radius-*`) which Tailwind consumes at build-time to emit utilities, plus JS-read families (the entire `--constellation-*` ×18 is read via `readNum()` in `constellationInteraction.ts:66-74`; `--dock-morph-max-stretch` via `useDockOrientationMorph.ts:111`; `--scale-press-btn` via `button/index.ts:27` `active:scale-(--scale-press-btn)` + `SegmentedTabs.vue:256` `readToken`). The *genuinely* dead set after removing those channels is modest (~30-50) but real — verified zero-occurrence: `--progress-sectioned-track`, `--tooltip-text`, `--glass-spine-blur` (and `-opacity`), and the superseded `--phase-color-label` (killed by `--phase-complete-color-label`). **The finding is not the dead count — it's that four consumption channels with no manifest make the basis uncountable, so accretion is undetectable and every tranche adds net tokens.**

---

## Findings (severity-ranked, file:line)

### F1 — CRITICAL · The dual-mode-arm identity duplication (every dark color authored twice)

Concrete, on disk:

```
--foreground:  color-radius.css:58  hsl(24 10% 10%)          (light root)
               dark-arm.css:70      hsl(30 14% 90%)          (.dark fallback floor)
               light-dark.css:95    light-dark(hsl(24 10% 10%), hsl(30 14% 90%))
--card:        color-radius.css:72  hsl(30 85% 96%)
               dark-arm.css:74      hsl(26 22% 17%)
               light-dark.css:101   light-dark(hsl(30 85% 96%), hsl(26 22% 17%))
```

`comm -12` of `dark-arm.css` ∩ `light-dark.css` yields **60 tokens declared in BOTH** — all identity colors: `--foreground`, `--card`, all 7 `--neutral-*`, all 13 `--section-color-*`, `--primary`+`-foreground`, the bronze/silver/gold triples, `--viz-*`, the feedback tones, `--tier-*`. **45 tokens are triple-declared** (light root + `.dark` arm + `light-dark()` arm). Every dark identity value `hsl(30 14% 90%)`, `hsl(26 22% 17%)`, … physically appears twice and must be edited in lockstep. CLAUDE.md's own BB.W-DARK-INK-WARM note documents the hazard verbatim: the warm-ink change edits *"BOTH lockstep arms (`dark-arm.css:60` fallback floor + `light-dark.css:92` light-dark() dark arg)"* — the "§2c discipline."

`light-dark()` is Baseline (Chrome 123 / Safari 17.5 / Firefox 120, all 2024) — the product targets modern Chrome+Safari. The `.dark {}` color fallback is scaffolding for engines the product doesn't ship to. In a "clean break, no legacy aliases" design language this is a self-contradiction, and it doubles the surface area of the *most* hand-calibrated, most-frequently-re-tuned tokens in the system (the warm ladder + dark arm are re-tuned every visual tranche).

**The nuance that shapes the fix (MEMORY: light-dark inset-shadow trap).** `light-dark()` cannot carry inset shadows — an inset fragment inside `light-dark()` computes the *whole* box-shadow to `none`. So shadow/inset tokens legitimately need plain `.dark {}` arms. The clean basis is therefore **one mechanism per token TYPE**: colors → `light-dark()` ONLY; shadows/insets/inheritance-sensitive scalars → `.dark {}` ONLY. Today colors run BOTH — and colors are exactly the 60-token overlap. `dark-arm.css` should carry the shadow/inset/scalar dark arm ONLY, not a duplicate color arm.

### F2 — MAJOR · The composite-at-`:root` breaks inheritance → the recipe is re-spelled ≥5 places

`--glass-bg-{wash,quiet,resting,floating,overlay}` compose ONCE at `:root` (glass.css:273-277) via the `--glass-level` scalar-lerp — a genuinely elegant single recipe. But because they resolve at `:root`, a descendant that overrides an *input* (`--glass-opacity-*` for a per-scope alpha, or the `--glass-tint-*` cohort for legibility) does **not** re-compose the inherited bg. CLAUDE.md documents this as "THE SUBSTITUTION-VS-INHERITANCE SEAM (the recurring trap)" and the fix everywhere is to *re-spell the whole `color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))`* at the element. On disk, that same oklab-tint composite is re-authored in **4+ files**: `tokens/glass.css`, `glass/ladder.css`, `cards.css`, `dock/search.css` (`grep 'color-mix(in oklab,…glass-tint'`), plus the `.btn-glass` `--glass-bg-*-tinted` mint (W-BUTTON-GLASS) and the `.glass-menu-row` mint (W-MENU-GLASS). One recipe, ≥5 spell sites — the definition of a leaky composite. Each new surface that wants the legibility seam re-spells it; a recalibration of the tint mix is an N-site edit. The `--glass-backdrop`/`--glass-tint-strength` ×13 redeclaration count is the tail of this.

### F3 — MAJOR · The liquid-weight goo/stretch register has no shared basis (N parallel triples, several dead)

The "liquid-weight universal / goo-morph between states" edict is implemented as per-consumer token families with no root register:
`--carousel-goo-{duration,flow,max-stretch}`, `--deck-goo-{duration,flow,max-stretch}`, `--pager-worm-max-stretch`, `--dock-morph-max-stretch` (1.14), `--dock-punch-stretch`, `--tab-indicator-max-stretch` (1.11), `--tab-indicator-blob-max`, plus the generic `--stretch`, `--goo-t`, `--lq-stretch-x/y`. Values are deliberately per-register (carousel 1.24, deck 1.1, dock 1.14, tab 1.11 — the universal *wants* per-surface calibration), but there is no `--goo-flow` / `--goo-stretch-cap` **root basis with per-surface overrides** — each is minted independently in `scheme-spring.css:159-187` and the density/scale-paper files. And `--carousel-goo-*` + `--deck-goo-*` + `--pager-worm-max-stretch` are in the never-read set: the goo-morph the edict demands is tokenized but not yet wired, or wired via a different path — either way it's dead surface.

### F4 — MINOR · Ceremony-driven file splits fragment coherent token concerns

`scheme-spring.css`'s own header states it was "Carved from scheme-motion.css's §2 EASING block to hold the no-god-module 500-line bound (BD.W-CUT re-grew scheme-motion past it)." The split is explicitly line-count-driven, byte-isomorphic, not concern-driven — the motion-token concern is now fragmented across `scheme-motion.css` + `scheme-spring.css` + `scroll-tokens.css` + `property-regs.css`. Similarly the glass concern spreads `glass.css` + `glass-fx.css` + `glass-deep.css` + `on-glass-fg.css`, and color spreads `color-radius.css` + `dark-arm.css` + `light-dark.css`. The 500-line RATCHET organizes tokens by *line budget* rather than *basis axis*; a first-principles layout organizes by orthogonal concern (identity / composite / mode-arm / registration).

### F5 — MINOR · `@property` registrations scatter across 10 files despite a named single home

`property-regs.css` holds 31 of 68 registration blocks; the other 37 leak into `dock/fission-bridge.css` (7), `motion/morph-field.css` (5), `tokens/glass.css` (4), `dock.css` (3), `drawer.css` (2), `utilities/base.css` (2), and 4 more. Some co-location is defensible (a registration beside its sole consumer), but the composition-seam registry — the load-bearing typed-property layer the whole animated system depends on — has no single auditable home, so a duplicate or missing `initial-value` is undetectable. (No *duplicate* block-registrations were found — that hazard is clean.)

---

## The ideal basis (target-state design)

Every token resolves to exactly one of three kinds; anything that fits none doesn't exist:

- **(a) IDENTITY — consumer-retunable, hand-calibrated, the product.** The warm HSL ladder (`--neutral-0..6`, `--foreground`, `--card`), the per-tier alpha rungs (`--glass-opacity-*`), the spring `(response,ζ)` seeds, the 13-stop section ramp, the brand-metal quads, the radius/type/spacing scale anchors. **Authored ONCE per mode via `light-dark()` for colors, once via `.dark {}` for shadow/inset.** Protected byte-for-byte — the redesign touches STRUCTURE, never these values.
- **(b) COMPOSITE — computed, exactly one recipe site, resolves at the ELEMENT.** `--glass-bg-*` (level+tint), `--shadow-*` (color-mix over `--shadow-color`), `--glass-border-*`, the spring `linear()` curves (generated), the on-glass-fg rungs. One recipe, and it must re-compose on input override — so the recipe lives in a `@utility`/class the element applies (or reads registered inputs at the element), never a frozen `:root` snapshot.
- **(c) doesn't exist.** Dead tokens, superseded twins, speculative single-consumer axes, per-consumer duplicates of a shared register.

**The three basis rules, machine-checkable:**
1. **One mechanism per token TYPE.** Colors → `light-dark()`. Shadows/insets/inheritance-sensitive scalars → `.dark {}`. Never both for the same token. (Kills F1.)
2. **A composite re-composes on input override.** No `:root`-frozen composite that a descendant input-override silently fails to update. The recipe is applied where the inputs are read. (Kills F2.)
3. **Every identity FAMILY is generated from one table** (the `regen-spring-tokens.mjs` model), so the light/dark arms, the ramp, the alpha ladder cannot drift out of lockstep by hand. (Structural insurance for rule 1.)

**Quantified excess (the merge/kill target):**
- **~60 color tokens** drop their `dark-arm.css` duplicate (F1) → -60 declaration lines, and the *most-edited* tokens become single-source.
- **~4-5 re-spell sites** of the glass-tint composite collapse to one applied recipe (F2).
- **~10-12 goo/stretch tokens** collapse to a `--goo-{flow,stretch-cap,duration}` root register + per-surface `--goo-stretch-cap` overrides (F3); ~5 dead ones deleted.
- **~30-50 genuinely dead tokens** deleted once a token manifest makes them visible.
- Net: **1069 → ~900-940 unique tokens** is a conservative floor; the declaration-line count (2555) drops harder because the 60-color dark dup + the 45 triple-declares are the bulk of the ~1486 redeclarations.

---

## Fold candidates (for the BG/BH plan)

### FC1 — NEW WAVE · `W-DARK-ARM-UNIFY` (kill the color dual-arm; one mechanism per type)
**Kind:** new-wave (clean break, no alias). **Gestalt transposition, not a patch.** Delete the ~60 duplicate COLOR declarations from `dark-arm.css`; colors resolve through `light-dark.css` ONLY. `dark-arm.css` is re-scoped to carry the shadow/inset/inheritance-sensitive dark arm ONLY (the `light-dark()` inset-trap exceptions — MEMORY-documented). Add `proof:dark-arm-disjoint` — the `.dark {}` arm and the `light-dark()` arm must have an EMPTY token intersection (born-RED on the current 60-overlap, GREEN at close). MIGRATION row: none for consumers (identity values byte-identical; only the authoring site consolidates). This is the single highest-leverage token wave — it halves the surface of the most-re-tuned family and makes the warm-ink/dark-material re-tunes (which recur every visual tranche) single-edit. **Fable arm:** none (mechanical token move, zero pixel delta — assert byte-identical computed colors both modes via the existing `no-gray`/`dark-material` π).

### FC2 — NEW WAVE · `W-GLASS-COMPOSITE-AT-ELEMENT` (the tint composite re-composes on override)
**Kind:** new-wave. Transpose the `--glass-bg-*` legibility composite from a `:root`-frozen snapshot to an **applied recipe** — a single `@utility glass-fill` (or the `--glass-level`/tint inputs read at the element via registered `@property` inputs) so overriding `--glass-opacity-*`/`--glass-tint-*` on any scope re-composes automatically. Delete the ≥5 inline re-spells (`glass/ladder.css`, `cards.css`, `dock/search.css`, `.btn-glass` `-tinted` mints, `.glass-menu-row`) — they all `@apply glass-fill` or read the shared inputs. Kills the "substitution-vs-inheritance trap" at the root instead of re-documenting it per surface. `proof:glass-fill-single-recipe` — exactly one `color-mix(in oklab, …glass-tint…)` authoring site (born-RED on the current 4+). **Fable arm:** DesignSync the glass tiers over a busy backdrop both modes — the recipe move must be a zero-pixel transposition; any drift is a finding.

### FC3 — AMEND WAVE · fold a `--goo-*` root register into the liquid-weight/goo-morph wave
**Kind:** amend-wave (attach to whichever BG/BH wave owns the goo-morph pager/deck/dock work). Mint ONE `--goo-{flow, stretch-cap, duration}` root register; carousel/deck/pager/dock/tab consume it with per-surface `--goo-stretch-cap` overrides (the calibrated 1.24/1.1/1.14/1.11 become scope overrides of ONE token, not 7 independent tokens). Delete the dead `--carousel-goo-*`/`--deck-goo-*`/`--pager-worm-max-stretch` if still unwired at execution, else wire them through the register. This makes the liquid-weight universal an actual *basis* the edict can be enforced against, not N look-alike triples.

### FC4 — NEW WAVE · `W-TOKEN-MANIFEST` (make the basis countable — the anti-accretion floor)
**Kind:** new-wave (device-free gate + generator). Emit a build-time manifest of every declared token → its consumption channel(s) (`var()` / Tailwind `@theme` / Tailwind `prop-(--)` shorthand / JS `getPropertyValue`/`readNum`/`readToken`) → alive|dead. `proof:token-manifest` fails on any token with zero live channel (the genuine dead set: `--progress-sectioned-track`, `--tooltip-text`, `--glass-spine-blur/-opacity`, `--phase-color-label`, …) unless allowlisted with a rationale. This closes the root disease from F/census: the basis is currently uncountable across four channels, so accretion is invisible and every tranche nets tokens. One manifest, and dead tokens can never again survive a close. (Cross-ref lens B4's accretion findings — this is the standing gate that keeps them fixed.)

### FC5 — PLAN-DOC-EDIT · record the three basis rules as precept + fold the file-layout by-concern
**Kind:** plan-doc-edit. Record in the token-doctrine home: (1) one-mechanism-per-type, (2) composites-re-compose-on-override, (3) identity-families-are-generated. Re-org the 74 declaring files' *token* portion by basis axis (identity / composite / mode-arm / registration) rather than the 500-line ratchet's byte-isomorphic carves (F4/F5) — including consolidating `@property` registrations back toward `property-regs.css` with a documented co-location exception rule. This is doc + light structural, not a value change.

### FC6 — DEFER-HONEST · the type (68) + spacing (98) ladder consolidation
**Kind:** defer-honest (booked, honest trigger). The 98 spacing/padding and 68 type tokens are large but mostly *composites of* a small anchor set (`--card-pad-inline`→φ-rungs is already the right shape — BB.W-CARD-PAD). A full spacing-basis reduction is real work but lower-leverage than F1-F3 and overlaps lens B4's accretion scope. Book it with the trigger: *after* FC4's manifest quantifies how many spacing/type tokens are single-consumer composites vs shared anchors, fold a `W-SPACING-BASIS` wave. Do not speculatively collapse the φ-ladder now — the calibrated φ constants are identity (protect).

---

## Protected (do NOT touch — these are the product)

The warm HSL hues (`--neutral-*` at hsl H28-40 → OKLab H62-75; `--foreground` hsl(24 10% 10%)/(30 14% 90%)), the per-tier alpha ladder (0.30/0.50/0.65/0.80/0.95 light · 0.38/0.58/0.72/0.88/0.96 dark), the dark `--primary` legendre-violet `oklch(0.739 0.134 318.1)`, the spring `(response,ζ)` seeds, the `--surface-tint-*` `in srgb` fence, the 13-stop section ramp, the brand-metal quads, the φ radius/spacing/type constants. The redesign is entirely **structural** — mechanism, recipe-site, mode-arm, manifest. Every identity value stays byte-identical, asserted by the existing `no-gray` / `dark-material` / `glass-cal` π both modes.
