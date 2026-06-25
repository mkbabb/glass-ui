# forms/inputs — Pass-E SYNTHESIS (the binding per-page verdict)

**Page:** `/forms/inputs` · `demo/stories/forms/inputs.vue` (123 lines) · standardized chip `@mkbabb/glass-ui/forms`
**Inputs synthesized:** `forms-inputs-{demo,design,component}.md` (3 separate-context Pass-E auditors)
**Manifest row:** `s("forms", "inputs", "Inputs")` (manifest.ts:718) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"`, `variant="page"`, `heroScale="4"`.

---

## 0 · The reconciled picture (where the three lenses AGREE)

All three auditors converge on ONE diagnosis: **the components are correct and lovely in isolation; the page spends almost none of the library's identity, and the input CONTROL itself is the lowest-affordance interactive surface in the library.** There are two distinct failure strata, and conflating them is the trap:

- **DEMO stratum (page-side, zero src paint).** The page is six near-identical `max-w-sm` text fields stacked vertically in ONE `resting` Card, separated by hairline dividers, over a near-invisible flat grid wash. No per-section card, no aurora, no dock contextual-switch, no protagonist hierarchy, ~700px of dead horizontal void per field. (demo §1-7, design §1-7.)
- **COMPONENT stratum (src-side, real paint).** The `.input-pill` is a **3-of-6-layer glass composite** (backdrop-blur + surface-tint present; edge rim, inner catch-light, grain MISSING — it is a flat-bordered slab, not a `.glass-material` surface) with a **COLOR-only four-state contract** (one bezier cross-fade; NO `useSpringPress`/`--press-t`, NO `vSpecular` gleam, NO `.glass-reveal` entrance). The W-PRESS-UNIFY / W-LIQUIDHOVER registers wired onto Button + dock never reached the input pill. (component §1, §6.)

These are NOT the same fix and must NOT fold into one wave. The demo stratum is a `demo/stories/` page-design problem; the component stratum is a `src/` material problem with a real gate and a `proof:ba-gestalt` glass-feedback verdict. The single highest-leverage move common to BOTH strata is the **aurora-behind + veil-card transposition** (design §3-4): it gives the lens something to refract AND frames each section as a real glassy card without occlusion — but it only reads as iOS-grade once the component composite is whole.

**No genuine conflicts between the three reports** — they are complementary (demo = composition gap, design = staging/hierarchy gap, component = material gap). The only near-overlap is the inline destructive-ring respell: the demo report flags it as a teaching anti-pattern (B1), the design report praises the SHIPPED `--invalid-ring` register as "alive (good)" — these reconcile cleanly: the SHIPPED token register is right, the DEMO's inline hand-roll of it (inputs.vue:76) is the defect. Delete the inline respell, bind `aria-invalid`, let the token paint.

---

## 1 · RANKED changes (by impact)

| # | Change | Stratum | Impact | Why |
|---|---|---|---|---|
| **1** | **Arm the input control as a full liquid-glass surface** — re-base `.input-pill` onto the `.glass-material` rim+core+grain composite (3/6 → 6/6) + the `vSpecular` tier-root gleam + a focus/press spring (`useSpringPress`/`--control-press-t`) + a `.glass-reveal` entrance, ALL reusing the shipped Button/dock primitives (no fork). | COMPONENT (src) | **Highest** | The control is the protagonist of EVERY forms page; a flat-slab half-composite cannot read as liquid glass over any aurora. This is the only finding all three reports independently surface. |
| **2** | **Aurora-behind-protagonist + veil-card-per-section** — switch the forms-band off the flat `grid` default; run a vivid multi-nuclei aurora behind the HERO field (offscreen-paused, one GL context, budget-safe), frame each demo in a `surface="veil"` (`.glass-wash`) card so the backdrop reads THROUGH onto the field. | DEMO (page) | **High** | The single highest-leverage fidelity fix shared with the dock flagship: gives the lens color structure to refract AND satisfies "own glassy card" + "main area bigger" + "glass over live field" at once, with no occlusion. |
| **3** | **Protagonist hierarchy + dock contextual-switch** — promote ONE field to a HERO card at ~1.5-2× scale with a poster-rung typographic anchor; seat the variant states behind a `DockStack mode="facets"` / `DockLayerGroup` that swaps the protagonist across states (default → labelled → error → disabled → search) with a live crossfade; lift the 1086px body cap + kill the `max-w-sm` straitjacket. | DEMO (page) | **High** | Directly answers the user's "leverage the dock APIs (contextual switching/animating)" + "main card area BIGGER" + the protagonist hierarchy the page wholly lacks. |
| **4** | **Page arrives + fields live** — wire `.scroll-cascade` gravity-entrance to land per-field; animate the error INTO existence (the `--invalid-ring` bloom on `--ease-out` no-overshoot) instead of shipping pre-broken; let the protagonist show a live-typed value. | DEMO+COMPONENT | **Medium** | "HIGH animation affordance for EVERY component" — currently effectively zero authored page motion. The focus-liquid + entrance legs route to change #1; the error-bloom + live-type are demo choreography. |
| **5** | **Standardize + tighten + de-anti-pattern** — fix the THREE path-label dialects (in-prose `@/components/custom/search` → `@mkbabb/glass-ui/search`; the chip is canonical); compress every caption to one showcase line stating the field's VALUE not its prop; delete the dead "password inputs" claim (or add the field); delete the internal-changelog SFC header comment; DELETE the inline destructive-ring respell (inputs.vue:76) and bind `aria-invalid` → the shipped `--invalid-ring`. | DEMO (page) | **Medium** | The user's explicit "standardize the import-path label" + "tighten superfluous language" asks, plus the B1 anti-pattern-demo and B2 dead-copy bugs. Mechanical, low-risk. |
| **6** | **`.control-surface` webkit-source hygiene** — drop the lone hand-authored `-webkit-backdrop-filter` source pair (control-surfaces.css:82); let the build inject it per the build-owns-the-prefix discipline; re-assert `proof:webkit-backdrop`. | COMPONENT (src) | **Low** | Not a Safari bug (the build is idempotent); a latent re-bite a future Lightning-CSS dedup could trip. Hygiene only. |

---

## 2 · TRANCHE ACTIONS (per change)

### Change #1 → **NEW: `BD.W-CONTROL-LIQUID`** (Band-16, net-new src wave with a real gate)

`BD.W-FORMS-CARD-FOLD` is Band-4 DEMO-ONLY (zero src paint — it folds `forms/label`/`forms/multi-select`/`containers/dialog` wrappers, and does NOT touch `forms/inputs` at all). NOTHING in the current 42-wave BD set arms the input control. This is a genuine net-new src wave, the component-side companion to the demo work — and it is the highest-impact finding on the page.

**Scope (src/, reusing shipped primitives — NO fork):**
- Re-base `.input-pill` (`src/styles/glass/control-surfaces.css`) onto the `.glass-material` layering so the well composes the edge rim (`--glass-material-rim` + per-rung `--glass-border-*`), the inner catch-light `::before` core, and the grain `::after` — closing the 3/6 → 6/6 composite (component §6). Coordinate with `BD.W-GLASS-LENS-CHROMA` (the rim/lens owner — file-line-disjoint; this composes the rim group, does not re-author the lens filter).
- Arm the `vSpecular` tier-root gleam on the focusable field (the W-LIQUIDHOVER `createSpecularWriter` single-source — NO forked `--mouse-x/y` writer, which would red `proof:glass-cohesion`'s no-forked-mouse-writer clause).
- Wire a focus/press spring: `useSpringPress` → a `--control-press-t` 0..1 drive the surface CSS reads for the coupled brightness/specular leg (W-PRESS-UNIFY P3 one-drive-two-legs; the dock control is the booked-third `useSpringPress` consumer — Input is a NAMED binary consumer beside Button/Card, helping the ≥2-bar, compositor-only, PRM-instant).
- A `.glass-reveal`-class mount entrance (the ComboboxList.vue:24 precedent — the field that OPENS a dropdown should itself animate in).

**Gate — born-RED → GREEN: `proof:control-liquid`** (sibling to `proof:glass-cohesion`/`proof:press-unify`):
- CL1 the `.input-pill` composes the rim+core+grain layering (6/6 composite); born-RED at HEAD (flat 1.5px border, no `::before`/`::after`).
- CL2 the focus/press drive is `useSpringPress` → `--control-press-t` (the one-drive-two-legs coupling on the spring's own settle clock, NOT a generic `--duration-*`); born-RED at HEAD (color-only bezier).
- CL3 `vSpecular` arms the field via the ONE `createSpecularWriter` (no forked mouse-writer — cross-assert `proof:glass-cohesion` GREEN); born-RED at HEAD (no gleam).
- CL4 compositor-only (scale/filter/`--*-press-t` — never a layout property; cross-assert `proof:no-layout-animation`) + PRM-instant (the `useSpring` `respectReducedMotion` snap + the CSS `:active` no-JS floor).
- CL5 the four control SFCs (Input/Textarea/NumberField/Combobox) all reach the armed register via the shared seam (no per-control fork) + a self-test bite (a synthetic forked `--mouse-x/y` writer MUST red CL3; a synthetic layout-animated press MUST red CL4).

**Paint verification:** VISUAL wave → a `proof:ba-gestalt` **glass-feedback** verdict on a fresh capture (BC anti-disease law — no source-green close) + a binding π `tests-visual/control-liquid.spec.ts` (the focus-bloom frame-series, the gleam tracks the pointer, the 6/6 composite reads, the PRM single-paint, both modes; LOCAL-only).

**Optional architectural-transposition note (component §5):** a shared `useInputSurface(size)` returning the resolved `.input-pill` class string (mirroring `controlSizeClass`) single-sources the recipe the four SFCs re-spell inline — fold into this wave IF it lands cleanly, else PRUNE (low-priority, no wave of its own).

---

### Changes #2 + #3 + #4 (demo legs) → **NEW: `BD.W-FORMS-INPUTS-STAGE`** (Band-4, net-new demo wave with a real gate)

`forms/inputs` is the canonical first text-input surface a consumer meets and it is **owned by no BD wave** (only `BD.W-PAGE-HEADER-FOLD` touches its header). `BD.W-FORMS-CARD-FOLD` is the sibling forms demo-fold but explicitly scopes to label/multi-select/dialog — not inputs. The auditors' demo-side moves (aurora-behind, veil-card-per-section, protagonist hierarchy, dock contextual-switch, bigger-area, page-arrival, error-bloom, live-type) are a coherent single-page redesign that wants its OWN demo wave — it is too large for a fold-clause AUGMENT of `BD.W-FORMS-CARD-FOLD` (which is a 3-file mechanical fold), and the brief's "each page deftly uses a SERIES of glass-ui components" is a per-page composition bar a fold-clause cannot carry.

**Scope (demo/stories/, zero src paint):**
- Per-section `surface="veil"` (`.glass-wash`) cards (BA.W-SURFACE-AXIS — the permeable-veil tier that admits the backdrop, the §L1 architectural transposition over "opaque-plate-occludes" vs "bare-stack-no-card").
- A vivid multi-nuclei aurora behind the protagonist (manifest row off the flat `grid` default OR a hero-local `<Aurora>` over `<DockStage>`/`<StoryHero>`; offscreen-paused by construction, ONE GL context per route — the one-GL-per-route budget).
- A protagonist field at ~1.5-2× scale with a poster-rung typographic anchor (`--type-display-mega` ghost char / live-typed value); the five states demoted to a tight 2-up supporting matrix on the calm wash (the tier-selection discipline — save the spend for the hero).
- A `DockStack mode="facets"` / `DockLayerGroup` swapping the protagonist across states with a live crossfade (the contextual-switch API the brief names).
- The `.scroll-cascade` gravity-entrance landing per-field; the error animating INTO existence (the `--invalid-ring` bloom on `--ease-out`) instead of born-broken; the protagonist showing a live-typed value (`useCountup`/typewriter-fed).
- Lift the 1086px body cap + kill the `max-w-sm` straitjacket on the hero.

**Gate — born-RED → GREEN: `proof:forms-inputs-stage`** (the per-page composition bar, the demo-pane discipline):
- FS1 ≥N glass-ui component families composed in-article (Card/veil + Dock + Input + SegmentedTabs/Button + an aurora canvas — the "series of components" bar; born-RED at HEAD = {Input, Label, SearchBar, IconChip} only, no Card/Dock/canvas).
- FS2 per-section veil cards present + the protagonist card at a distinct scale (born-RED at HEAD = one resting Card, six identical-weight sections).
- FS3 a live aurora canvas behind the protagonist (`canvas` count ≥ 1 in-article; born-RED at HEAD = 0) + the one-GL-per-route budget held.
- FS4 the dock contextual-switch is wired (a `DockStack`/`DockLayerGroup` swapping the protagonist; born-RED at HEAD = 0 docks).
- FS5 the standardize+tighten arm (change #5 — see below, folded here) + a self-test bite.

**Paint verification:** a `proof:ba-gestalt` **page-band** verdict (the storybook-meta aggregate — `BD.W-GESTALT-ROSTER-GROW` enrolls `forms/inputs.vue` in the `page-band.md` BD freshness record's `surface-paths` so a re-thread drifts the hash → G7 auto-revoke) + a binding π `tests-visual/forms-inputs-stage.spec.ts` (the per-section veil cards read as glass over the aurora, the protagonist lenses the live field, the dock crossfade switches state, the gravity entrance lands, both modes × desktop+mobile).

---

### Change #5 (standardize + tighten + de-anti-pattern) → **FOLD into `BD.W-FORMS-INPUTS-STAGE` FS5** (+ verify `BD.W-PAGE-OFFTOKEN-SWEEP` / `BD.W-PAGE-HEADER-FOLD` coverage)

The path-label/caption/dead-copy/anti-pattern cleanups are the same `demo/stories/forms/inputs.vue` file the stage wave repaints — folding them into FS5 avoids a double-edit collision. Two coordination notes:
- The in-prose path-label standardization (`@/components/custom/search` → `@mkbabb/glass-ui/search`) MAY already be in `BD.W-PAGE-OFFTOKEN-SWEEP`'s sweep scope — **verify and de-dupe** (whoever owns the inputs.vue edit owns the label fix; FS5 claims it if OFFTOKEN-SWEEP does not).
- The inline destructive-ring respell DELETE (inputs.vue:76 → bind `aria-invalid`) is a demo-side fix (the SHIPPED `--invalid-ring` register is correct — `BD.W-CONTROL-LIQUID` does not touch it). It belongs in FS5, NOT the src wave.

---

### Change #6 (`.control-surface` webkit hygiene) → **MODIFY `BD.W-DESHADCN-CANON`** (or a Band-7 hygiene clause)

The component report maps this to `BD.W-DESHADCN-CANON`. That wave is currently DOC-ONLY (it canonizes the de-shadcn principle, machine-locked by the shipped `proof:no-shadcn-default`) — it paints zero pixels. The webkit-source-pair drop is a 1-line src hygiene edit + a `proof:webkit-backdrop` re-assert; it does NOT fit a doc-only wave cleanly. **Better: a thin clause in `BD.W-CONTROL-LIQUID`** (which already opens `control-surfaces.css`) — drop the lone hand-authored `-webkit-backdrop-filter` pair (control-surfaces.css:82) while re-basing the recipe, let the build inject it, re-assert `proof:webkit-backdrop`. If `BD.W-CONTROL-LIQUID` does not land, fall back to a standalone Band-7 hygiene clause. Do NOT force it into the doc-only DESHADCN wave.

---

## 3 · CONVERGENCE assessment

**The page needs SEVERAL more loops — it is NOT close.** It is among the least-converged surfaces audited: it misses the binding North-Star bar on nearly every axis (no per-section card, no aurora, no dock, no protagonist, no page motion, half-composite control, three path-label dialects, dead copy, an anti-pattern demo). The component stratum (`BD.W-CONTROL-LIQUID`) is a real net-new src wave that has not been specced; the demo stratum (`BD.W-FORMS-INPUTS-STAGE`) is a full single-page redesign that has not been specced. Both are net-new — the page was effectively un-owned by the BD plan.

**Loop estimate: 2-3.** Loop 1 — spec + build the two net-new waves (the src control-liquid arm + the demo stage redesign), which are interdependent (the demo's "glass over live aurora" only reads once the control composite is whole). Loop 2 — paint-verify both `proof:ba-gestalt` verdicts on fresh captures (glass-feedback for the control, page-band for the demo), re-shoot, re-pixel-read; the aurora-behind dark-mode chroma-survival is the likeliest re-shoot trigger (don't collapse to black). Loop 3 (likely) — the dock-contextual-switch crossfade + the per-field gravity-entrance timing are the kind of motion-choreography that rarely lands first-capture. The standardize/tighten cleanups (change #5) converge in one pass.

---

## VERDICT (6 lines)

1. **Top-3 changes:** (1) NEW `BD.W-CONTROL-LIQUID` — arm `.input-pill` as a full 6/6 liquid-glass surface (rim+core+grain composite + `vSpecular` gleam + `useSpringPress`/`--control-press-t` + `.glass-reveal` entrance, all reusing shipped Button/dock primitives); (2) aurora-behind-protagonist + `surface="veil"` card-per-section (the lens gets color to refract + own glassy cards with no occlusion); (3) protagonist hierarchy + `DockStack mode="facets"` contextual-switch + bigger area (kill the 1086px cap + the `max-w-sm` straitjacket).
2. **NEW (src, Band-16):** `BD.W-CONTROL-LIQUID` — the input-control liquid-glass arm, gate `proof:control-liquid` (CL1-CL5 + self-test), `proof:ba-gestalt` glass-feedback verdict + `control-liquid.spec.ts` π. The single highest-impact finding; un-specced before this synthesis.
3. **NEW (demo, Band-4):** `BD.W-FORMS-INPUTS-STAGE` — the per-page redesign (veil cards + aurora + protagonist + dock switch + page-arrival + error-bloom), gate `proof:forms-inputs-stage` (FS1-FS5), `proof:ba-gestalt` page-band verdict + π. `forms/inputs` is owned by no existing BD wave — net-new.
4. **FOLD:** change #5 (standardize import-label + tighten captions + delete dead "password" copy + delete the inline destructive-ring respell) → `BD.W-FORMS-INPUTS-STAGE` FS5; de-dupe the path-label fix against `BD.W-PAGE-OFFTOKEN-SWEEP`.
5. **MODIFY:** the `.control-surface` lone hand-authored webkit pair → a hygiene clause in `BD.W-CONTROL-LIQUID` (drop the source pair, let the build inject, re-assert `proof:webkit-backdrop`); do NOT force into the doc-only `BD.W-DESHADCN-CANON`. **PRUNE:** the optional `useInputSurface(size)` single-source + the `string` autocomplete-widen — keep as-is unless `BD.W-CONTROL-LIQUID` lands them free.
6. **Convergence: NOT close — 2-3 more loops.** The page was effectively un-owned (both strata net-new); the src control-arm and the demo redesign are interdependent, and the aurora-dark-chroma + dock-crossfade/gravity-entrance timing are likely re-shoot triggers.
