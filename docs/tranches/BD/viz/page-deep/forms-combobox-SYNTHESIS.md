# forms/combobox — Pass-E SYNTHESIS (the binding per-page verdict)

**Page:** `/forms/combobox` · `demo/stories/forms/combobox.vue` (125 lines) · standardized chip `@mkbabb/glass-ui/forms`
**Inputs synthesized:** `forms-combobox-{demo,design,component}.md` (3 separate-context Pass-E auditors)
**Manifest row:** `s("forms","combobox","Combobox")` (manifest.ts:729) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"`, `variant="page"`, `heroScale="4"`.
**Demoed src:** `src/components/ui/combobox/` (11 SFCs over the reka-ui `Combobox*` headless substrate).

---

## 0 · The reconciled picture (where the three lenses AGREE)

All three auditors converge on the SAME two-strata diagnosis the whole forms band shares — and combobox is a near-exact replay of `forms/inputs` + `forms/textarea`, so it folds onto the band-shared waves rather than minting its own:

- **DEMO stratum (page-side, zero src paint).** ONE hand-rolled combobox trigger floats `max-w-sm` (~384px) in a ~410px-tall card whose right two-thirds is dead empty, over a near-invisible flat `grid` wash. No aurora (so the six-layer composite has nothing to refract — the glass reads as a gray pill), no per-section card, no second sub-section, no dock contextual-switch, no protagonist hierarchy, no authored page motion. The full 11-SFC family is barely exercised (`ComboboxSeparator`/`ComboboxViewport` dead). (demo §1-4, design §1-6.)
- **COMPONENT stratum (src-side, real paint).** The LIST and ITEM are CORRECT and idiomatic — `ComboboxList` composes `.glass-reveal` (the iOS-27 bloom), `ComboboxItem` composes `.glass-menu-row` (the full four-state menu register, 6/6 layers on hover). The defect is concentrated on the **INPUT** (the type-ahead search row, the surface the user actually touches): `bg-transparent border-b` — a flat shadcn-neutral hairline, **ZERO of the six layers, no focus glide, no press, no gleam**. Plus the component ships **no default trigger material**, forcing every consumer (incl. this demo) to hand-roll the trigger paint. (component §1, §5, §6.)

**No genuine conflicts between the three reports** — they are complementary (demo = composition gap, design = staging/hierarchy gap, component = input-material gap). The one near-overlap reconciles cleanly: the demo + design reports both flag the hand-rolled `<button class="glass-wash …">` trigger as the cardinal "component-over-class" sin; the component report explains WHY it is forced (no shipped trigger material) — same defect, two ends. The fix is a default `.control-surface` trigger material in src (component), which the demo then passes `as-child` to (page).

**Critical scoping note (de-dupe with the band):** combobox surfaces NOTHING net-new at the wave level. Its src findings are a SUBSET of the `BD.W-CONTROL-LIQUID` charter already minted by the `forms/inputs` + `forms/textarea` syntheses (arm the `.input-pill`/`.control-surface` register: 6/6 composite + `vSpecular` gleam + focus/press spring + `.glass-reveal` entrance, shared across the whole forms band, armed ONCE). Its demo findings are a SUBSET of the band's page-compose wave (the inputs synthesis named it `BD.W-FORMS-INPUTS-STAGE`; the textarea synthesis named it `BD.W-FORMS-PAGE-COMPOSE` and scoped it to BOTH text-entry pages). **Combobox is a third member of that same shared page-compose wave, not a fourth net-new wave** — the band must NOT spawn a per-page stage wave each.

---

## 1 · RANKED changes (by impact)

| # | Change | Stratum | Impact | Why |
|---|---|---|---|---|
| **1** | **Arm the combobox INPUT (+ a default trigger material) on the shared liquid-glass control register** — `ComboboxInput` reads `.control-surface`/`.input-pill` (6/6 composite + focus/press spring + `vSpecular` gleam); the component ships a default `.control-surface` trigger so consumers pass `as-child` instead of hand-rolling `glass-wash`. ALL reusing the `BD.W-CONTROL-LIQUID` register — no fork, no per-control recipe. | COMPONENT (src) | **Highest** | The input is the most-touched surface and the only flat/dead one (the list + item are already correct). Every consumer re-hand-rolls the trigger today (de-shadcn material-first unmet). All three reports independently surface this. |
| **2** | **Per-section veil cards over a COLORFUL aurora + bigger area** — flip the forms band off the flat `grid` default; vivid multi-nuclei aurora behind the protagonist (offscreen-paused, ONE GL context, budget-safe); frame each demo in a `surface="veil"` (`.glass-wash`) card so the backdrop reads THROUGH onto the glass; lift the body cap + kill `max-w-sm`. | DEMO (page) | **High** | The single highest-leverage fidelity fix: gives the lens color structure to refract AND satisfies "own glassy card" + "main area bigger" + "glass over live field" at once. Currently the glass reads as a gray pill (FD-DOCK-1/BG-2). |
| **3** | **A SERIES of glassy sub-section cards + dock contextual-switch** — break the one control into ≥3 own cards: (a) the trigger + OPEN `glass-floating` list shown live with type-ahead filtering, (b) grouped basis/palette, (c) the selected-state surface in a `<MetricStack>` cell; seat the variants behind a `<DockStack mode="facets">` rail that switches combobox CONTEXTS (the options already model two: basis ↔ palette) with a live `--spring-snappy` crossfade. | DEMO (page) | **High** | Directly answers "each sub-section in its OWN glassy card" + "leverage the dock APIs (contextual switching/animating)" + "a SERIES of glass-ui components" + fills the oversized empty card. The basis/palette split is a gift for a facet rail. |
| **4** | **Animate the selection moment + page arrival** — `.scroll-cascade` gravity-entrance landing per-card; crossfade the trigger label on `--spring-smooth` (§L2 pane-swap) on pick; land the `<Check>` indicator with a spring; show the OPEN-state list + type-ahead narrowing live (today it is hidden until opened, never demonstrated). | DEMO+COMPONENT | **Medium** | "HIGH animation affordance for EVERY component" — the functional control is currently inert while only the decorative `<IconChip>` is alive (energy exactly inverted). The focus-liquid leg routes to change #1; the swap/entrance are page choreography. |
| **5** | **Route ComboboxGroup heading onto `.glass-menu-section-label`** — the group heading paints `text-dropdown-secondary text-muted-foreground` (a flat label), bypassing the canonical picker-family mono small-caps section caption (`.glass-menu-section-label`, BA.W-MENU-GLASS) that DropdownMenuLabel composes. The one picker-family caption that diverges. | COMPONENT (src) | **Medium** | Idiomatic / no-fork; a real register divergence, not a keep. Cheap, single-line, reads through the shared menu-glass register. |
| **6** | **`max-h-[300px]` raw bracket → scoped `min(24rem, 60dvh)` + the slot-namespace mislabel** — `ComboboxViewport` hardcodes `max-h-[300px]` (a dead structural bracket BA.W-EMISSION forbids — unreachable by consumer content-scan); move to `[data-slot="combobox-viewport"]` scoped CSS at the picker-family collision-bound, beside `select.css`. Also fix `ComboboxInput`'s `data-slot="command-input"` copy-paste mislabel. | COMPONENT (src) | **Low** | Off-token hygiene + a latent content-scan fragility; mechanical. |
| **7** | **Standardize + tighten copy** — drop the self-referential blurb tail ("…the section identity is the ONE color event" → just "Type-ahead filtered selection over grouped options."); de-template the shared `select.vue` header comment; (de-dupe the in-card `<IconChip>` masthead vs the chrome eyebrow — see #3, it becomes a real per-card header). | DEMO (page) | **Low** | The user's "tighten superfluous language"; the identical blurb leak also lives in `select.vue` — fix both. Path label is already PASS (all 3 reports). |

---

## 2 · TRANCHE ACTIONS (per change)

### Change #1 → **AUGMENT `BD.W-CONTROL-LIQUID`** (Band-2/16 src — the band-SHARED control-arm; NOT net-new for combobox)

`BD.W-CONTROL-LIQUID` is the net-new src wave already minted by the `forms/inputs` + `forms/textarea` syntheses (arm `.input-pill`/`.control-surface`: 6/6 composite + `vSpecular` gleam + `useSpringPress`/`--control-press-t` focus spring + `.glass-reveal` entrance, all reusing shipped Button/dock primitives, no fork). **Combobox is enrolled as a named consumer of that same register** — the synthesis's CL5 clause already names "the four control SFCs (Input/Textarea/NumberField/Combobox) all reach the armed register via the shared seam (no per-control fork)." Two combobox-specific AUGMENT clauses to add:

- **The ComboboxInput leg:** the search-input row reads the armed `.control-surface` four-state focus glide + 6/6 composite, off its current `bg-transparent border-b` flat hairline (component A1/A2/§6). This IS the existing CL5 Combobox member — verify the gate's `proof:control-liquid` enumerates `ComboboxInput.vue` explicitly (born-RED at HEAD = flat border-b).
- **The default trigger material (a new CL clause):** the combobox ships a default `.control-surface` REST trigger material so a consumer passes `as-child` to a styled trigger instead of hand-rolling `glass-wash` (component I2). This widens CL beyond "arm the existing well" to "the picker family OWNS its trigger paint" — coordinate with `BD.W-DESHADCN-CANON` (the de-shadcn material-first principle owner; this is the binding instance of it for the picker trigger). Gate clause: a `proof:control-liquid` bite asserting the combobox trigger has shipped material (born-RED at HEAD = bare reka primitive, demo hand-rolls).

No separate gate, no separate `proof:ba-gestalt` for combobox — it rides `BD.W-CONTROL-LIQUID`'s forms-band/glass-feedback verdict + `control-liquid.spec.ts` (extend the π to capture the combobox input focus-bloom + the trigger material).

### Changes #2 + #3 + #4 (demo legs) → **AUGMENT the band-shared page-compose wave** (`BD.W-FORMS-PAGE-COMPOSE`, Band-16 demo; enroll combobox as a third page)

The inputs synthesis named this `BD.W-FORMS-INPUTS-STAGE` (inputs-only); the textarea synthesis named it `BD.W-FORMS-PAGE-COMPOSE` and **already scoped it to BOTH text-entry pages**. **Combobox is the natural third member** — same flat-spec-sheet defect, same redesign (veil cards + aurora + protagonist + dock facet-switch + page-arrival). The orchestrator must reconcile the two names to ONE (recommend `BD.W-FORMS-PAGE-COMPOSE`, the broader charter) and enroll `forms/combobox.vue` in its `surface-paths` so a re-thread drifts the gestalt hash. Combobox-specific scope notes:

- The dock contextual-switch has a NATURAL hook here the other pages lack: the basis/palette option-CONTEXTS map onto a `<DockStack mode="facets">` rail that swaps the combobox's option-set live (demo §move-4, design §move-4) — combobox is the BEST page in the band to demonstrate "dock contextual-switching" because the data already splits into contexts. The gate's "`<DockStack mode="facets">` present" clause is satisfied richly here.
- Show the OPEN-state list + type-ahead narrowing live in its own card (the component's correct `.glass-reveal`/`.glass-menu-row` registers are never SHOWN on this page — open one permanently in a demo card).
- `BD.W-FORMS-CARD-FOLD`'s narrow residual-triplet charter does NOT cover this (it folds label/multi-select/dialog wrappers, never touches combobox). Confirmed against the wave spec.

### Change #5 (ComboboxGroup heading) → **FOLD into `BD.W-TOC-MENU-GLASS`** (the menu-glass section-register owner)

`BD.W-TOC-MENU-GLASS` already touches the `.glass-menu-section`/`.glass-menu-section-label` register; routing ComboboxGroup's heading through it is a one-line same-register fold, not a new wave. If `BD.W-TOC-MENU-GLASS`'s charter is ToC-scoped and does not extend to the picker-family group caption, FOLD instead onto `BD.W-BC-COMPONENT-CANON` (the component-canon reconcile wave). Either is a single-line `ComboboxGroup.vue` edit; the gate is the existing `proof:menu-glass` W2 (the section-caption register), extended to enumerate ComboboxGroup.

### Change #6 (`max-h-[300px]` bracket + slot mislabel) → **FOLD into `BD.W-MISSED-SLAB-CENSUS`**

The dead structural bracket (`max-h-[300px]`) is exactly the BA.W-EMISSION class `BD.W-MISSED-SLAB-CENSUS` exists to sweep; move it to `[data-slot="combobox-viewport"]` scoped CSS at `min(24rem, 60dvh)` beside `select.css`. The `data-slot="command-input"` copy-paste mislabel (cosmetic, the namespace is wrong) folds into the same census sweep. Both are the census's exact charter — no new wave.

### Change #7 (tighten + de-template copy) → **FOLD into `BD.W-FORMS-PAGE-COMPOSE`** (the SFC is rewritten there) + verify `BD.W-PAGE-HEADER-FOLD` covers the masthead

- The blurb tighten + the de-templated header comment ride the page-compose SFC rewrite (the file is repainted there).
- The in-card `<IconChip>` masthead duplication (the descriptor shown twice — chrome eyebrow + in-body masthead) is the W-HIERARCHY2 reading-order inversion. `BD.W-PAGE-HEADER-FOLD` folds the 36-file inline page-identity header paste onto the chassis — **verify combobox.vue is in its 36-file enrolled set** (it carries the `borderLeft:`+IconChip+`section-label--tinted` markers, so it should be). If so, change #7's masthead de-dup is ALREADY owned by PAGE-HEADER-FOLD; the page-compose rewrite must coordinate (whoever repaints the SFC owns the final header shape — do not double-edit). The identical `select.vue` blurb leak is a sibling fix — book to the same page-compose wave (select is a forms page too).

### PRUNE / no-action

- **Path label** `@mkbabb/glass-ui/forms` — correct + standardized (all 3 reports PASS). No action.
- **No PRUNE of src code** — the 11 SFCs have no dead code, no dual-path, no legacy alias; every finding is AUGMENT/FOLD (missing affordance + off-register, never over-built). The list + item registers are exemplary and must be PRESERVED untouched.

---

## 3 · CONVERGENCE assessment

**The page needs SEVERAL more loops — it is NOT close (~20% converged).** It misses the binding North-Star bar on nearly every demo axis (no aurora, no per-section card, no dock, no protagonist, no authored page motion, oversized-and-empty card, one hand-rolled control) AND carries the band's input-material deficit (flat `border-b` input, no trigger material). The MITIGATING fact distinguishing it from a from-scratch rebuild: combobox surfaces **zero net-new waves** — every finding folds onto the four band-shared waves already minted (`BD.W-CONTROL-LIQUID`, `BD.W-FORMS-PAGE-COMPOSE`, `BD.W-TOC-MENU-GLASS`/`BD.W-BC-COMPONENT-CANON`, `BD.W-MISSED-SLAB-CENSUS`) + verified against `BD.W-PAGE-HEADER-FOLD`. The component's list/item registers are already correct, so the src arm is smaller here than on inputs.

**Loop estimate: 2-3** (in lockstep with `forms/inputs` + `forms/textarea` — the three pages share both the src wave and the demo wave and MUST be authored + re-audited as a set):
- **Loop 1** — author the two combobox legs onto the shared waves (the ComboboxInput + default-trigger arm on CONTROL-LIQUID; the veil-card/aurora/dock-facet-switch redesign on PAGE-COMPOSE) + the three FOLD cleanups (group caption, viewport bracket, copy tighten).
- **Loop 2** — paint-verify the shared `proof:ba-gestalt` verdicts on a FRESH capture (the glass-feedback control verdict + the page-band verdict); the aurora-behind dark-mode chroma-survival + the dock facet-crossfade timing are the likeliest re-shoot triggers (don't collapse to black; the basis↔palette context-swap must read).
- **Loop 3 (likely)** — the dock contextual-switch crossfade + per-card gravity-entrance timing rarely land first-capture; the open-state-list demo + selection-moment choreography re-shoot.

---

## VERDICT (6 lines)

1. **Top-3 changes:** (1) AUGMENT `BD.W-CONTROL-LIQUID` — arm the combobox INPUT on the shared 6/6 liquid-glass control register (off flat `border-b`) + ship a default `.control-surface` trigger material so consumers stop hand-rolling `glass-wash`; (2) AUGMENT `BD.W-FORMS-PAGE-COMPOSE` — per-section veil cards over a COLORFUL aurora + bigger used area so the glass finally refracts (it reads as a gray pill today); (3) AUGMENT same — a SERIES of glassy cards + a `<DockStack mode="facets">` rail switching the basis↔palette option-CONTEXTS live (combobox is the band's best dock-contextual-switch demo, the data already splits).
2. **AUGMENT (src):** `BD.W-CONTROL-LIQUID` — combobox is the existing CL5 named consumer; add the ComboboxInput leg + a default-trigger-material clause (coordinate `BD.W-DESHADCN-CANON`); rides CL's gate + `proof:ba-gestalt` glass-feedback verdict, no separate gate.
3. **AUGMENT (demo):** `BD.W-FORMS-PAGE-COMPOSE` — enroll `forms/combobox.vue` as the THIRD text-entry page (reconcile the inputs synthesis's `BD.W-FORMS-INPUTS-STAGE` name onto this broader charter); the dock facet-switch + open-state-list + page-arrival ride here; rides its page-band gestalt verdict.
4. **FOLD:** ComboboxGroup heading → `.glass-menu-section-label` via `BD.W-TOC-MENU-GLASS`/`BD.W-BC-COMPONENT-CANON`; `max-h-[300px]` bracket + `command-input` slot mislabel → `BD.W-MISSED-SLAB-CENSUS`; blurb tighten + de-template header → the PAGE-COMPOSE SFC rewrite (verify the masthead de-dup is already owned by `BD.W-PAGE-HEADER-FOLD`'s 36-file set).
5. **PRUNE / no-action:** path label `@mkbabb/glass-ui/forms` is correct + standardized (no action); zero src PRUNE — the 11 SFCs are clean and the list/item registers are exemplary, PRESERVE untouched. **Combobox mints NO net-new wave** — every finding folds onto band-shared waves.
6. **Convergence: NOT close — ~20%, 2-3 more loops**, authored + re-audited in lockstep with `forms/inputs` + `forms/textarea` (the three share both the src and demo waves); aurora-dark-chroma + dock facet-crossfade timing are the likely re-shoot triggers.
