# forms/select — Pass-E SYNTHESIS (the binding per-page verdict)

**Page:** `/forms/select` · `demo/stories/forms/select.vue` · standardized chip `@mkbabb/glass-ui/select`
**Inputs synthesized:** `forms-select-{demo,design,component}.md` (3 separate-context Pass-E auditors)
**Manifest row:** `s("forms", "select", "Select")` (manifest.ts:728) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"`, `variant="page"`, `heroScale="4"`.

---

## 0 · The reconciled picture (where the three lenses AGREE)

The three auditors converge on the SAME two-stratum diagnosis the sibling `forms/inputs` carried — **the Select compound is well-built in isolation; the page spends almost none of the library's identity** — but with a critically different component profile: where `inputs` found a half-composite (`.input-pill` 3/6 layers), the Select LISTBOX is a near-whole liquid-glass surface (`.glass-reveal` bloom + `.glass-menu-row` four-mode hover + 5.5/6 composite — component §1, §6). The COMPONENT defects here are narrower and sharper, not a material rebuild:

- **DEMO stratum (page-side, zero src paint).** Three near-identical `max-w-sm` `<Select>` controls stacked in ONE flat card; ~60-65% dead right-hand void; background is the flat `grid` paper wash (washed to near-invisible at the card tier — no live colorful field for the glass to lens); zero per-section card; zero dock contextual-switch composed BY the page; zero authored page motion; the one genuinely audacious move (`text-display-4` title) dies the moment the eye drops into the body; the three brand viz-hues (`--viz-fourier/-chebyshev/-legendre`) hidden inside a closed dropdown; a duplicate in-card eyebrow/blurb restating the masthead; a `selected · plus-jakarta-sans` debug caption as visual noise. (demo §1-7, design §0-7.)
- **COMPONENT stratum (src-side, real paint).** THREE genuine src gaps, none a full rebuild: **GAP-1** the chevron `rotate` rides a fixed `ease-standard` bezier (motion-canon P1 spatial→spring violation — desyncs against the `--spring-snappy` panel bloom at the SAME gesture); **GAP-2** the trigger carries NO lit-glass press/specular four-state contract (the only always-on glass control off the `vSpecular`/`useSpringPress` tier the Button got at BB.W-BUTTON-GLASS); **GAP-3** the `size` font-rung (`display`/`audacious`) is a half-closed two-write portal workaround (the docstring itself apologizes — writes `--dropdown-text` on the trigger leaf, but the portalled items only re-resolve if the consumer ALSO threads it on the Select scope; the substitution-vs-inheritance trap, half-open). (component §1, §5.)

These are NOT the same fix and must NOT fold into one wave. The demo stratum is a `demo/stories/` page-design problem; the component stratum is three `src/` material fixes with a real gate and a `proof:ba-gestalt` glass-feedback verdict.

**No genuine conflicts between the three reports** — they are complementary (demo = composition gap, design = staging/hierarchy gap, component = three narrow material gaps). Two near-overlaps reconcile cleanly:
- The "glass over colorful aurora" miss: all three name it; demo §3 + design §0/§5 frame it as the DEMO's headline move, component §2 explicitly defers it to demo scope ("NOT a component change"). No conflict — it is a DEMO leg.
- The suffusion read: design §7 calls it "under-proportioned to near-colorless" while demo §6 calls the one-color-event "CORRECT per the rule." These reconcile: the RULE-compliance is correct (one teal chip pop, body stays ink), but the page under-SPENDS its budget — the three brand basis-hues that the page OWNS are hidden on click. The fix is not "add color," it is "make the owned basis-hue selection VISIBLE + kinetic" (design §2).

---

## 1 · RANKED changes (by impact)

| # | Change | Stratum | Impact | Why |
|---|---|---|---|---|
| **1** | **Card-per-subsection over a live COLORFUL aurora** — split the three pickers into THREE `surface="veil"`/`<ShowcaseFrame tier="field">` glassy cards in a responsive grid, each floating over ONE shared offscreen-paused `<Aurora>` (the `<DockStage>` one-GL-per-route pattern); fill the dead right void; lift the `max-w-sm` straitjacket. | DEMO (page) | **Highest** | The single highest-leverage fidelity move — gives the listbox+trigger glass a vivid field to refract (the six-layer composite reads), satisfies "own glassy card" + "main area bigger filled" + "glass over colorful aurora" at once, and is the EXACT shared move with `forms/inputs`/the dock flagship. All three reports name it #1. |
| **2** | **Promote `Orthogonal basis` to the focal demo + make selection KINETIC** — make the basis select the hero control; on select, ripple its `--viz-*` hue out as a `--glass-accent` rim (W-GLASS-ACCENT per-instance chromatic axis) on its own card AND seed a tiny procedural-suite micro-viz (a Fourier epicycle / Chebyshev node glyph) so choosing a basis ANIMATES the page. | DEMO (page) | **High** | Answers "deftly uses a SERIES of components" (Select + IconChip + a procedural micro-viz + the accent axis) + "HIGH animation affordance" + the §L4 selection-has-consequence bar; surfaces the three owned brand hues the page currently hides. |
| **3** | **Dock contextual-switch IN the page + page arrives alive** — seat the demo CONTEXT behind a `DockStack mode="facets"` / `DockLayerGroup` swapping the showcased select across facets (grouped · viz-basis · font-rung · disabled-state) with a live crossfade; land the cards on the `.scroll-cascade` gravity entrance; give each trigger the visible hover-lift register so the resting page telegraphs kinesis. | DEMO (page) | **High** | The literal "leverage the dock APIs (contextual switching/animating)" ask + the iOS-27 "alive at rest" bar (§L2/§L3) the static page wholly misses. |
| **4** | **GAP-2 — arm the SelectTrigger with the lit-glass press/specular four-state contract** — wire `vSpecular` (the W-LIQUIDHOVER `createSpecularWriter` single-source tier-root gleam) + `useSpringPress` → a `--control-press-t` coupled brightness/specular leg onto the trigger, matching the glass Button tier (BB.W-BUTTON-GLASS). | COMPONENT (src) | **Medium-High** | The trigger is the only always-on glass control off the specular tier; Design Axis 2 four-state contract bar; reusable with the `forms/inputs` `BD.W-CONTROL-LIQUID` arm (the SAME `.control-surface`/`.input-pill` register the trigger reads). |
| **5** | **GAP-1 — fold the chevron `rotate` onto `--spring-snappy`** — re-time the `data-state=open` 180° flip off the fixed `ease-standard` bezier (motion-canon P1: spatial→spring) onto the SAME `--spring-snappy` + `--spring-snappy-duration` clock the `.glass-reveal` panel blooms on, so the open reads as ONE coherent liquid settle. | COMPONENT (src) | **Medium** | A visible desync at the open gesture (panel springs, chevron sweeps on a dead 200ms bezier); one-line clock swap, motion-canon-mandated, low-risk. |
| **6** | **GAP-3 — transpose the `size` font-rung write onto the `Select` ROOT scope** — move the `--dropdown-text`/`--text-dropdown` family-token write off the trigger leaf onto `SelectRoot`/`Select` (where both the trigger AND the portalled content's `--reka-*` context resolve from), so ONE `size` prop scales trigger + items in lockstep with no consumer co-thread; delete the apologetic docstring caveat. | COMPONENT (src) | **Medium** | Closes the documented two-write portal footgun (the value.js trigger-only `text-display` desync re-expressed); the architectural transpose the no-workaround discipline demands. |
| **7** | **Standardize + tighten + de-noise** — keep the standardized `@mkbabb/glass-ui/select` chip (the one thing already right); de-duplicate the in-card eyebrow/blurb (drop the restatement — the masthead carries it); rewrite the header blurb to describe SELECT not the design-system suffusion rule; kill the `selected · …` debug caption; surface the disabled-item teaching point as a VISIBLE state, not a hidden one. | DEMO (page) | **Medium** | The user's explicit "standardize the import-path label" + "tighten superfluous language" asks, plus the duplicate-descriptor + debug-caption noise. Mechanical, low-risk. |

---

## 2 · TRANCHE ACTIONS (per change)

### Changes #1 + #2 + #3 + #7 (the full demo redesign) → **NEW: `BD.W-FORMS-SELECT-STAGE`** (Band-4, net-new demo wave with a real gate)

`forms/select` is owned by no existing BD wave. `BD.W-FORMS-CARD-FOLD` is the sibling forms demo-fold but explicitly scopes to `label.vue`/`multi-select.vue`/`dialog.vue` — NOT select (verified: the wave's §2 starting-state names only those three files). The demo-side moves (aurora-behind, veil/field card-per-section, kinetic basis-protagonist, dock contextual-switch, page-arrival, standardize+tighten) are a coherent single-page redesign that wants its OWN demo wave — the direct twin of the just-specced `BD.W-FORMS-INPUTS-STAGE`, sharing its gate shape and its one-GL-per-route budget discipline.

**Scope (demo/stories/forms/select.vue, zero src paint):**
- Per-section `surface="veil"` (`.glass-wash`) / `<ShowcaseFrame tier="field">` cards in a responsive grid (BA.W-SURFACE-AXIS — the permeable tier that admits the backdrop; the BG-2 black-plate fix that makes the glass actually lens).
- A vivid multi-nuclei `<Aurora>` behind the protagonist (manifest row off the flat `grid` default OR a hero-local `<Aurora>` over `<DockStage>`/`<StoryHero>`; offscreen-paused by construction, ONE GL context per route).
- The `Orthogonal basis` select promoted to a HERO card at distinct scale; on select, its `--viz-*` hue ripples out as a `--glass-accent` rim (W-GLASS-ACCENT) on its own card + seeds a tiny procedural-suite micro-viz (one of `/fourier-field` / `/concentric` / a basis glyph — the consumer composes the shipped leaf, no demo-local fork).
- A `DockStack mode="facets"` / `DockLayerGroup` swapping the showcased context across facets with a live crossfade (the contextual-switch API the brief names).
- The `.scroll-cascade` gravity entrance landing per-card; each trigger carrying the visible hover-lift register.
- The standardize+tighten arm (change #7 — folded here): keep the import chip, drop the duplicate in-card header, rewrite the blurb to describe Select, kill the debug caption, surface the disabled state visibly.

**Gate — born-RED → GREEN: `proof:forms-select-stage`** (the per-page composition bar):
- SS1 ≥N glass-ui component families composed in-article (Card/veil + Dock + Select + IconChip + a procedural canvas — the "series of components" bar; born-RED at HEAD = {Select, Label, IconChip} only).
- SS2 per-section veil/field cards present + the basis protagonist at a distinct scale (born-RED at HEAD = one flat Card, three identical-weight sections).
- SS3 a live aurora canvas behind the protagonist (`canvas` count ≥ 1 in-article; born-RED at HEAD = 0) + the one-GL-per-route budget held + the kinetic `--glass-accent`-on-select rim wired.
- SS4 the dock contextual-switch is wired (a `DockStack`/`DockLayerGroup` swapping the showcased facet; born-RED at HEAD = 0 page-authored docks).
- SS5 the standardize+tighten arm (de-dup header, blurb-describes-Select, no debug caption, visible disabled state, the `@mkbabb/glass-ui/select` chip preserved) + a self-test bite.

**Paint verification:** a `proof:ba-gestalt` **page-band** verdict on a fresh capture (`BD.W-GESTALT-ROSTER-GROW` enrolls `forms/select.vue` in the `page-band.md` BD freshness record's `surface-paths` so a re-thread drifts the hash → G7 auto-revoke) + a binding π `tests-visual/forms-select-stage.spec.ts` (the per-section glass cards read over the aurora, the basis select ripples its hue on change, the dock crossfade switches facet, the gravity entrance lands, both modes × desktop+mobile).

---

### Changes #4 + #5 + #6 (the three component gaps) → **NEW: `BD.W-SELECT-TRIGGER-LIQUID`** (Band-16, net-new src wave with a real gate)

The three component fixes (trigger press/specular, chevron spring, font-rung transpose) are all in the SAME `SelectTrigger.vue` + `select.css`/`menu.css` register and want ONE coherent src wave. They are NOT a fit for the existing waves:
- `BD.W-BC-COMPONENT-CANON` / `BD.W-DESHADCN-CANON` are DOC-ONLY (zero pixels) — a press/specular arm + a spring re-clock + a token transpose all PAINT.
- The `forms/inputs` `BD.W-CONTROL-LIQUID` arms `.input-pill` (3/6 → 6/6 rebuild) — a DIFFERENT register and a heavier rebuild. The trigger here is already 5.5/6 (the listbox tier); it needs the PRESS/specular leg + the chevron clock + the font-rung transpose, not a composite rebuild. **Coordinate, do not merge:** both waves wire `vSpecular`/`useSpringPress` reusing the SAME shipped W-LIQUIDHOVER/W-PRESS-UNIFY primitives (no fork) — `BD.W-SELECT-TRIGGER-LIQUID` is the Select-trigger consumer, `BD.W-CONTROL-LIQUID` is the input-well consumer; they share the primitive, not the wave.

**Scope (src/, reusing shipped primitives — NO fork):**
- **GAP-2:** arm `vSpecular` (the ONE `createSpecularWriter` — no forked `--mouse-x/y` writer, which would red `proof:glass-cohesion`'s no-forked-mouse-writer clause) + `useSpringPress` → a `--control-press-t` coupled brightness/specular leg on `SelectTrigger.vue` (the trigger becomes a NAMED `useSpringPress` consumer beside Button/Card — helps the ≥2-bar, compositor-only, PRM-instant).
- **GAP-1:** re-clock the chevron `rotate` off `ease-standard` onto `--spring-snappy` + `--spring-snappy-duration` (motion-canon P1 spatial→spring; the SAME clock the `.glass-reveal` panel blooms on).
- **GAP-3:** transpose the `size` font-rung write (`--dropdown-text`/`--text-dropdown`) off the trigger leaf onto the `SelectRoot`/`Select` scope (where the portalled `--reka-*` context resolves from); delete the apologetic docstring caveat. CLEAN BREAK — no two-write alias (no-legacy discipline).

**Gate — born-RED → GREEN: `proof:select-trigger-liquid`** (sibling to `proof:glass-cohesion`/`proof:press-unify`/`proof:menu-glass`):
- ST1 the chevron `rotate` rides a `--spring-*` token (motion-canon P1); born-RED at HEAD (`transition-transform … ease-standard`).
- ST2 the trigger press is `useSpringPress` → `--control-press-t` (one-drive-two-legs on the spring's own settle clock); born-RED at HEAD (CSS `.tap-squish` `:active` only, no coupled specular).
- ST3 `vSpecular` arms the trigger via the ONE `createSpecularWriter` (no forked mouse-writer — cross-assert `proof:glass-cohesion` GREEN); born-RED at HEAD (no gleam on the trigger).
- ST4 the `size` font-rung writes the family token on the `Select`/`SelectRoot` scope (NOT the trigger leaf) so trigger+items resolve in lockstep with NO consumer co-thread; born-RED at HEAD (trigger-leaf write + the docstring caveat); + the no-two-write-alias bite.
- ST5 compositor-only (cross-assert `proof:no-layout-animation`) + PRM-instant + a self-test bite (a synthetic forked `--mouse-x/y` writer MUST red ST3; a synthetic chevron-on-bezier MUST red ST1; a synthetic trigger-leaf font-rung write MUST red ST4).

**Paint verification:** a `proof:ba-gestalt` **glass-feedback / forms-band** verdict on a fresh capture (BC anti-disease law — no source-green close) + a binding π `tests-visual/select-trigger-liquid.spec.ts` (the trigger gleam tracks the pointer, the press couples brightness, the chevron settles on the snappy clock IN SYNC with the panel bloom, the `size="display"` rung scales trigger+items in lockstep, the PRM single-paint, both modes; LOCAL-only).

---

### Cross-coordination note (the shared specular/press primitive)

`BD.W-SELECT-TRIGGER-LIQUID` ST2/ST3 and `BD.W-CONTROL-LIQUID` (inputs) CL2/CL3 both wire `useSpringPress`/`vSpecular`. They MUST consume the SAME shipped primitives (W-PRESS-UNIFY `useSpringPress`, W-LIQUIDHOVER `createSpecularWriter`) — neither forks. If `BD.W-CONTROL-LIQUID` lands a shared `useControlSurface()`/`useInputSurface()` seam (its optional architectural-transpose note), the Select trigger reads it too; if not, both consume the primitives directly. Sequence `BD.W-CONTROL-LIQUID` first (it may mint the shared seam); `BD.W-SELECT-TRIGGER-LIQUID` consumes whatever lands. No double-mint.

---

## 3 · CONVERGENCE assessment

**The page needs SEVERAL more loops — NOT close, but the COMPONENT stratum is far closer than `forms/inputs`.** The listbox is already exemplary iOS-27 glass (the `.glass-reveal` bloom + `.glass-menu-row` four-mode hover + 5.5/6 composite); the three component gaps are narrow, bounded, primitive-reusing fixes (a clock swap, a press/specular arm, a token transpose), not a material rebuild. The DEMO stratum, by contrast, is a full single-page redesign that misses nearly every North-Star bar (no per-section card, no aurora, no dock, no protagonist, no page motion, hidden brand hues, duplicate header, debug caption) — effectively un-owned by the BD plan, exactly the `forms/inputs` profile.

**Loop estimate: 2-3.** Loop 1 — spec + build both net-new waves (the demo stage redesign + the src trigger-liquid arm), interdependent (the demo's "glass over colorful aurora" only reads once the trigger gleam/press is whole). Loop 2 — paint-verify both `proof:ba-gestalt` verdicts on fresh captures (page-band for the demo, glass-feedback for the trigger), re-shoot, re-pixel-read; the aurora-dark-mode chroma-survival + the `--glass-accent`-on-select rim are the likeliest re-shoot triggers. Loop 3 (likely) — the dock-facet crossfade + the kinetic basis-hue ripple + the gravity-entrance timing are motion-choreography that rarely lands first-capture. The standardize/tighten cleanups (change #7) converge in one pass. The chevron-spring + font-rung transpose (changes #5/#6) are the lowest-risk and may land clean in loop 1.

---

## VERDICT (6 lines)

1. **Top-3 changes:** (1) NEW `BD.W-FORMS-SELECT-STAGE` — card-per-subsection over a live colorful aurora (veil/field cards + offscreen-paused `<Aurora>`, the glass finally lenses a vivid field, fills the dead void); (2) promote `Orthogonal basis` to a kinetic protagonist (selection ripples its `--viz-*` hue as a `--glass-accent` rim + seeds a procedural micro-viz — selection has consequence, the owned brand hues surface); (3) dock contextual-switch IN the page (`DockStack mode="facets"`/`DockLayerGroup` + `.scroll-cascade` gravity entrance — alive at rest, leverages the dock APIs).
2. **NEW (demo, Band-4):** `BD.W-FORMS-SELECT-STAGE` — the per-page redesign (veil/field cards + aurora + kinetic basis-protagonist + dock switch + page-arrival + standardize/tighten), gate `proof:forms-select-stage` (SS1-SS5), `proof:ba-gestalt` page-band verdict + π. `forms/select` is owned by no existing BD wave — net-new; twin of `BD.W-FORMS-INPUTS-STAGE`.
3. **NEW (src, Band-16):** `BD.W-SELECT-TRIGGER-LIQUID` — the three component gaps as ONE coherent trigger wave (GAP-2 `vSpecular`/`useSpringPress` press+gleam · GAP-1 chevron `rotate` onto `--spring-snappy` · GAP-3 `size` font-rung transposed onto the Select ROOT scope), gate `proof:select-trigger-liquid` (ST1-ST5 + self-test), `proof:ba-gestalt` glass-feedback verdict + π. All reuse shipped primitives — NO fork.
4. **FOLD:** change #7 (de-dup in-card header + blurb-describes-Select + kill debug caption + visible disabled state + keep the `@mkbabb/glass-ui/select` chip) → `BD.W-FORMS-SELECT-STAGE` SS5; the import-label is already correct (live-confirmed) — preserve it, do not re-touch.
5. **MODIFY / coordinate:** `BD.W-SELECT-TRIGGER-LIQUID` and the `forms/inputs` `BD.W-CONTROL-LIQUID` share the W-PRESS-UNIFY/W-LIQUIDHOVER primitives — sequence CONTROL-LIQUID first (it may mint a shared control-surface seam), TRIGGER-LIQUID consumes whatever lands; no double-mint. **PRUNE:** nothing — every finding routes to a real action; the listbox is correct and untouched.
6. **Convergence: NOT close — 2-3 more loops.** Demo stratum is a full redesign (un-owned, net-new); the src trigger-arm is three bounded primitive-reusing fixes (far closer than inputs' material rebuild). Likely re-shoot triggers: aurora-dark chroma-survival, the `--glass-accent`-on-select rim, the dock-facet crossfade timing. Changes #5/#6 (chevron-spring, font-rung transpose) are lowest-risk and may land clean in loop 1.
