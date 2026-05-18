# Qβ — Core-Feature Co-location + Cohesion + Consistency Audit

Round-1 audit lane (Q tranche). Read-only. Planning-phase — recommendations, not fixes.

## §1 Scope

Four feature families audited for co-location (SFC + CSS + tokens + composables + types
grouped coherently), internal cohesion (principled structure vs accretion-fragmentation),
and cross-feature consistency (shared conventions):

1. **Dock** — `src/components/custom/dock/` (7 SFCs + `composables/` 6 files) + `dock-group/`
   + `src/styles/dock.css` (974 L) + `src/styles/dock-group.css` (40 L).
2. **Glass-card** — `ui/card/` + `ui/cartoon-card/` + `src/styles/cards.css` (16 L) +
   `src/styles/glass.css` (287 L).
3. **Dropdown/popover** — `ui/dropdown-menu/` + `popover/` + `select/` + `combobox/` +
   `context-menu/` + `hover-card/` + `custom/hover-popover/` + `ui/_shared/`.
4. **Animation/transition** — `src/styles/transitions.css` + `animations.css` +
   `custom/timeline/` + `composables/motion/`.

Plus the post-P shadow cohort: `099d51e` (dock), `beec35e` (toggle+dock), `3cb70db` (timeline).

## §2 Per-feature co-location audit

### 2.1 Dock — MOSTLY co-located, ONE confirmed split-brain

Strong baseline: all 7 dock SFCs carry **zero scoped `<style>` blocks** — every selector
lives in `dock.css`, which declares itself "the style authority for the dock component
family" (file header). Composables, DI contexts, and types are co-located under
`dock/composables/` and correctly re-exported through `dock/index.ts` for the subpath.
The P.W4 Lane B inline-absorb (DockTabButton `--dock-tab-h`) is documented in dock.css
lines 690-695.

**FRACTURE Qβ-F1 (confirmed split-brain).** The `.glass-dock[data-density="*"]` selector
is declared in **two files**:
- `dock.css` lines 61-116 — the four density rungs set `--dock-padding-*`,
  `--dock-control-size`, `--dock-layer-*`, `--dock-tab-padding-*`.
- `utilities.css` lines 375-390 — the SAME four `.glass-dock[data-density="*"]` selectors
  set `--dock-tab-h-{compact,comfortable,spacious,audacious}` + `--dock-tab-h`.
- `utilities.css` lines 397-411 — a third `.glass-dock[data-density="audacious"]` media
  block sets `--dock-label-size`.

This is the exact "a dock style living in `utilities.css` instead of `dock.css`" anti-
pattern named in the mandate. The P.W4 inline-absorb moved the DockTabButton SCOPED style
into dock.css but left the *density-keyed token assignments* in utilities.css. The split
works only because `index.css` imports `utilities.css` AFTER `dock.css` (line 73 > 68) —
i.e. it is cascade-order-dependent, fragile, and invisible at the dock.css authority site.
The dock.css comment at line 691-695 even *references* `--dock-tab-h` and says "When a
parent `<GlassDock density="…">` sets `--dock-tab-h` (utilities.css)" — the authority file
documents that its own token is set elsewhere. That is the fracture made explicit.

**Minor:** `--mask-fade-width` token (tokens.css §596) — `099d51e` retired the dock's two
consumers but kept the token "for genuine scroll-mask helpers." Verified: utilities.css
lines 169-185 still consume it (4 scroll-mask utilities). Token retention is correct;
no fracture.

### 2.2 Glass-card — co-location DRIFT (cartoon recipe misplaced + doc-stale header)

`ui/card/` (Card + 5 subcomponents + tier type co-located in `Card.vue`) and
`ui/cartoon-card/` are clean SFC packages with no scoped styles. Card consumes the
`.glass-{tier}` ladder; CartoonCard consumes `.glass-cartoon`.

**FRACTURE Qβ-F2 (recipe misplaced).** `cards.css` is 16 lines and contains ONLY
`.paper-texture`. Its own header says "cartoon-card + elevated-card removed at C.W5 …
Card primitive's variant system covers both styles" — but that header is **stale**:
CartoonCard was re-introduced as a sibling primitive (post-C), and its surface recipe
`.glass-cartoon` (glass.css lines 105-121, with hover-lift transition) lives in
**glass.css**, not `cards.css`. The card feature is split: `Card.vue` → `glass.css`
ladder; `CartoonCard.vue` → `glass.css` `.glass-cartoon`; `cards.css` → an orphan
`.paper-texture` rule that belongs conceptually with `paper.css`. The file named for the
card feature carries almost nothing of it.

**Consistency note:** `.glass-cartoon` sits in glass.css yet CartoonCard.vue's own doc
comment explicitly says cartoon is "not a glass-tier rung on the wash → overlay ladder."
So a non-ladder surface recipe is co-housed with the 5-rung ladder it disclaims membership
in. The recipe is in the wrong file by the SFC's own description.

### 2.3 Dropdown/popover — STRONGLY cohesive, one naming inconsistency

This family is the best-co-located of the four. `_shared/menuItemVariants.ts` is a single
canonical CVA consumed across 9 menu/picker primitives; `_shared/ModalOverlay.vue`
collapses three near-identical scrim strings. The portal-content recipe is canonicalised:
`.popover-content` (utilities.css) + `.glass-floating` + `.popover-animate` +
`.slide-in-from-side` is the documented 4-part composition, and **every** content SFC
applies `glass-floating` for the surface tier — DropdownMenuContent, DropdownMenuSubContent,
ContextMenuContent, SelectContent, HoverCardContent, ComboboxList, PopoverContent all agree.
Consistent tier choice across the whole family.

**Minor inconsistency Qβ-F3.** Two dropdown SFCs (`DropdownMenuContent.vue`,
`DropdownMenuSubContent.vue`) carry a 3-line scoped `<style>` setting
`font-family: var(--dropdown-menu-font, inherit)`. No other family member (Context-, Select-,
HoverCard-, Combobox-) has an equivalent scoped block — so the `--dropdown-menu-font` knob
is dropdown-only and lives in scoped SFC CSS while every other family selector is global.
Either every menu-family content surface should expose the font knob (promote to a global
`.popover-content` arm or a shared rule), or it should be dropped — currently it is a lone
scoped exception in an otherwise fully-global-CSS family.

### 2.4 Animation/transition — co-located, ONE token-vs-keyframe scatter

`transitions.css` (Vue `<Transition>` class-sets) and `animations.css` (`@keyframes`) are
cleanly separated by mechanism. The timeline package is a model of post-monolith cohesion:
the O.W3 split produced `GlassTimeline.vue` dispatcher + 3 variant SFCs + `geometry.ts`
(pure math) + `types.ts`, all co-located, geometry imported by ≥2 variants. Timeline tokens
sit in tokens.css §TIMELINE. Motion composables are coherently grouped in
`composables/motion/`.

**Minor:** timeline variant SFCs carry scoped `<style>` blocks — acceptable, these are
component-internal geometry (`.timeline-row`, `.timeline-caret`), not feature-wide
selectors. ContinuousTimeline's non-scoped `.timeline-popover` block is a deliberate,
documented portal-CSS contract (the portal escapes the scoped boundary).

**No fracture** in this family beyond the cross-feature note in §4.

## §3 Per-feature cohesion audit

| Feature | SFCs | CSS files | Composables | Cohesion verdict |
|---|---|---|---|---|
| Dock | 7 + dock-group 1 | dock.css + dock-group.css | 6 (composables/) | **Cohesive internally** — the 7-SFC + composables split is principled (root / layer-group / layer / 4 control types; state + transition + 2 DI contexts). The 974-line dock.css is large but single-feature and self-documenting. |
| Glass-card | 8 (card 6 + cartoon 2) | cards.css + glass.css | none | **Fragmented** — feature spread across 2 CSS files, neither named coherently for what it holds (see F2). |
| Dropdown | 50+ across 7 packages | utilities.css + hover-popover.css | none | **Cohesive** — `_shared/` extraction (menuItemVariants + ModalOverlay) is the canonical de-dup; portal recipe canonicalised. |
| Animation | timeline 4 + motion 11 | transitions + animations | 11 (motion/) | **Cohesive** — timeline post-O.W3 split is exemplary; transitions/animations cleanly mechanism-separated. |

Dock-group note: `dock-group/` is a 1-SFC package (DockGroup.vue + index.ts) with its own
`dock-group.css`. Correctly co-located and correctly named as a DIFFERENT primitive from
the GlassDock composite (CLAUDE.md subpath-naming-pairs canon). Not a fracture.

## §4 Cross-feature consistency audit

**Token cascade — CONSISTENT.** All four families bind visual behaviour to CSS custom
properties with fall-through defaults (`var(--glass-bg-dock, var(--glass-bg-resting))`,
`var(--dock-active-bg)`, `var(--timeline-dot-fill)`). J invariant 1 holds across all four.

**Four-state contract — CONSISTENT within interactive surfaces.** Dock controls
(`.dock-icon-button`, `.dock-tab-button`, triggers) and `.glass-btn` all carry
standard/hover/active/disabled + `:focus-visible` ring. `menuItemVariants` promotes the
hover/focus/data-highlighted/data-disabled quad. Consistent.

**Scoped-vs-global CSS — INCONSISTENT.** This is the headline cross-feature drift:
- Dock: 100% global (dock.css authority, zero scoped blocks). ✓ purest discipline.
- Dropdown: 99% global, with the 2-SFC `--dropdown-menu-font` scoped exception (F3).
- Timeline: deliberately mixed — scoped for component-internal geometry, non-scoped for
  portal contracts. Documented, defensible.
- Glass-card: 100% global, but the global rules are mis-filed (F2).

The four families do NOT apply one scoped-vs-global rule. Dock's "one CSS authority file,
zero scoped" model is the cleanest and should be the canon other families converge toward.

**CVA variant shape — CONSISTENT.** `menuItemVariants`, `toggleVariants`, `buttonVariants`
all use the cva(base, {variants, defaultVariants}) shape with co-exported `*Variants` type.
`toggleVariants` `card` arm (post-P) correctly adds a `compoundVariants` block — same idiom.

**Token HOME inconsistency Qβ-F4.** Timeline tokens → `tokens.css §TIMELINE`. Dock geometry
tokens → SPLIT: `--dock-active-*` + `--dock-touch-target` in `tokens.css §10`; but
`--dock-tab-h-*` density tokens in `utilities.css` (F1). Glass tokens → `glass.css` media
blocks + tokens.css §GLASS. There is no single rule for "where do feature tokens live."
Timeline is the consistent model (all in tokens.css); dock violates it.

## §5 Post-P shadow-cohort cohesion impact

`git show 099d51e beec35e 3cb70db` analysed:

**`099d51e` fix(dock) — edge-fade mask retirement.** Touches `dock.css` ONLY (57 L → 36 L).
Removed the `mask-image` feather from `.dock-layers` + `.glass-dock.vertical`. Landed
**cohesively** — change confined to the dock authority file, `--mask-fade-width` token
correctly retained (still consumed by utilities.css scroll-mask helpers, verified). No
co-location fracture introduced. The removed mask was genuine cosmetic damage; idiomatic
root-cause fix, not a workaround.

**`beec35e` fix(toggle,dock) — card-variant height + inactive-layer hit-test.** Touches
`toggle/index.ts` + `dock.css` + `package.json`. Both arms landed **cohesively**:
- Toggle arm: `compoundVariants` `h-auto` re-assertion — correct CVA idiom, change confined
  to the toggle package. No fracture.
- Dock arm: `visibility:hidden` on inactive `.dock-layer-item-host` + `.dock-layer` — the
  hit-test rule landed in `dock.css` (the correct authority file), with thorough inline
  rationale (lines 332-341, 504-543). NOT in the wrong file. Cohesive.

**`3cb70db` feat(timeline) — stitched gradient.** Touches `ContinuousTimeline.vue` +
`geometry.ts` + a test. The new stitched-gradient math went into `geometry.ts` (the shared
pure-math module — correct home); the SFC consumes it. Dead `continuousRegionBackground`
removed. New `--timeline-dot-*` knobs — **but** verify whether these landed in `tokens.css`
or only in the SFC's scoped block: §2.4 shows `--timeline-dot-*` IS in tokens.css §817+, so
the knobs are correctly homed. Landed **cohesively**.

**Shadow-cohort verdict:** the 3 feature-touching post-P commits did NOT introduce co-
location fractures. Each landed its CSS/math in the correct authority file with strong
inline rationale. The K-invariant-3 *process* breach (no plan folder) is real and is Qε/Q12
scope — but the *cohesion* of the changes themselves is sound. The fractures F1/F2/F4
identified in this audit are **pre-P accretion**, not post-P damage.

## §6 Recommended Q-wave architectural transpositions

| ID | Transposition | Destination |
|---|---|---|
| Qβ-T1 | Move the `.glass-dock[data-density="*"]` `--dock-tab-h-*` + `--dock-label-size` rules out of `utilities.css` (lines 375-411). | Merge `--dock-tab-h` density assignments INTO the existing `.glass-dock[data-density="*"]` blocks in `dock.css` (lines 61-116) — one density rule per tier, not two. Eliminates the split-brain. |
| Qβ-T2 | Decide the cartoon surface's CSS home. | Either (a) move `.glass-cartoon` + hover-lift from `glass.css` into `cards.css` (so `cards.css` owns the card-feature surfaces), or (b) rename/retire `cards.css` and move `.paper-texture` into `paper.css`. Option (a) preferred — restores `cards.css` as the card-feature authority. |
| Qβ-T3 | Refresh the stale `cards.css` header comment. | Update header in `cards.css` — it claims cartoon-card was removed; it was re-introduced as a sibling primitive. |
| Qβ-T4 | Resolve the `--dropdown-menu-font` scoped exception. | Either promote the font knob to a global `.popover-content` arm in `utilities.css` (consistent with the rest of the family) and drop both scoped blocks, or drop the knob if it has no consumer. Read consumers first. |
| Qβ-T5 | Codify a "feature tokens live in `tokens.css`" rule and migrate dock tokens. | All `--dock-*` geometry tokens consolidate into `tokens.css §10` (dock geometry block already exists there for `--dock-active-*`). Timeline is the model — dock should match. |
| Qβ-T6 | Adopt dock's "one CSS authority file, zero scoped blocks" as the canonical scoped-vs-global discipline for feature families. | Document in CLAUDE.md `## Component architecture` — feature-wide selectors → the feature's CSS file; only component-internal geometry / portal contracts may use scoped `<style>`. |

## §7 Verdict per feature family

| Family | Co-location | Cohesion | Consistency | Verdict |
|---|---|---|---|---|
| **Dock** | One confirmed split-brain (F1: density tokens in utilities.css) | Strong — principled 7-SFC + 6-composable split, single CSS authority | Token-home drift (F4) | **GOOD with one fracture** — Qβ-T1 + T5 close it. |
| **Glass-card** | Drift (F2: cartoon recipe in glass.css; orphan paper-texture in cards.css) | Fragmented — feature split across 2 mis-named CSS files | Surface recipe mis-housed | **NEEDS TRANSPOSITION** — Qβ-T2 + T3. |
| **Dropdown/popover** | Strong — `_shared/` extraction, canonical portal recipe | Strong — best-co-located family | One scoped-CSS exception (F3) | **GOOD** — Qβ-T4 is a polish item. |
| **Animation/transition** | Strong — timeline post-O.W3 split exemplary, mechanism-separated CSS | Strong | Consistent | **EXEMPLARY** — model for the other three. |

Post-P shadow cohort: feature-change cohesion **SOUND** (no fractures introduced); the
process breach is Qε scope.

## §8 Status

Audit COMPLETE. Read-only — no source mutated, no git mutated, no build run. 4 feature
families + 3 post-P feature commits examined. **4 fractures** identified (F1 dock density
split-brain — confirmed; F2 cartoon recipe misplaced; F3 dropdown-font scoped exception;
F4 dock token-home drift), all **pre-P accretion**, none introduced by the post-P shadow
cohort. **6 recommended transpositions** (Qβ-T1…T6) with concrete destinations. Headline:
the post-P cohort did NOT fracture cohesion — the dock/card fractures are older accretion
the Q wave should transpose. Dock's "one authority file, zero scoped" model and timeline's
post-O.W3 package shape are the canon the other families should converge toward.
