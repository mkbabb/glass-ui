# Pass-E deep audit — `forms/label` underlying component(s)

**Page:** `demo/stories/forms/label.vue` · canonical import `@mkbabb/glass-ui/label`
**Component(s) under audit:** `src/components/ui/label/Label.vue` (the only src artefact this page demos). The page also exercises `Input`, `Checkbox`, `Switch`, `RadioGroupItem`, `IconChip` — those have their own Pass-E pages; this audit owns Label + the demo composition.

---

## 0 · What the component actually is (read at HEAD)

`Label.vue` is a 40-line **simple wrapper** over reka-ui `<Label>` (the shadcn-vue pattern-1 idiom): it forwards `LabelProps`, adds a `class` merge via `cn()`, and adds a `required?: boolean` axis that renders an `aria-hidden` `* ` asterisk (`text-destructive`). The reka primitive is a `<label>` with a single behaviour: a `mousedown` guard that prevents text-selection on multi-click. There is NO state, NO ref, NO composable, NO timer, NO procedural surface.

Class payload: `text-small font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`.

This is the correct altitude for a label. The findings below are therefore mostly **AUGMENT/MODIFY at the DEMO/idiom layer** (the user's asks are page-composition asks), plus a small set of genuine component-level observations.

---

## 1 · ANIMATION — four-state contract + spring physics + entrance/exit

- **Label is NOT an interactive control** — it has no hover/active/focus state of its own (it delegates focus to its `for` target). The four-state contract (`standard/hover/active/disabled`) does NOT apply; only the **disabled** rung is owed, and it is present (`peer-disabled:opacity-70` + `cursor-not-allowed`). CORRECT by design — forcing a hover/press animation onto a `<label>` would be non-idiomatic.
- **The ONE missing affordance: the `peer-disabled` dim is an instant snap, not a transition.** `opacity-70` flips with zero `transition` — when a peer input toggles `disabled`, the label hard-cuts. Per motion-canon **P1 (EFFECTS→bezier)** an opacity change is an EFFECTS channel and should ride `--ease-standard`. This is a real, sub-perceptual-but-present dead-animation. → **AUGMENT** (component-level): add `transition: opacity var(--duration-fast) var(--ease-standard)` to the disabled rung (PRM-safe — opacity-only, the vestibular floor doesn't bite). Tiny, idiomatic, library-wide.
- **Entrance affordance is a DEMO concern, not the primitive's.** The page itself has NO `.scroll-cascade`/`.scroll-build` entrance (the BB.W-SCROLL-MOTION register) — the sections are flat. The user's "HIGH animation affordance for EVERY component / each page deftly uses a series of glass-ui components" ask lands here: the page should compose the scroll-cascade body-build + the IconChip already does its `:reveal` spring entrance (present at line 32). → **AUGMENT** at the page layer (see §7).
- **No janky animation** in the primitive — there is no animation to be janky.

## 2 · PROCEDURAL VIZ

**None.** Label has no aurora/blob/fourier surface. PROCEDURAL-SUITE/GPU/Safari bars are N/A for the component. The user's "glass demos over COLORFUL aurora backgrounds" ask is a PAGE-background concern: the forms band currently defaults to `background: "grid"` (`manifest.ts:184`), NOT aurora. → see §7 finding F-AURORA.

## 3 · PERFORMANCE

- **Compositor-only:** trivially yes (no animation today; the proposed opacity transition is compositor-safe).
- **Offscreen-pause / rAF:** N/A (no loop).
- **Layout-thrash:** none. `cn()` runs once in a `computed`; the asterisk `<span>` is static.
- **One genuine micro-finding:** `delegatedProps` destructures on every render via `computed` — negligible, idiomatic, KEEP.

## 4 · SAFARI compatibility

- **Clean.** `text-small`/`font-medium`/`leading-none`/`peer-disabled:` are all Tailwind-standard + WebKit-safe. No `backdrop-filter`, no `@property`, no `contrast-color()`, no scroll-timeline in this component — nothing on the Safari-risk list. The proposed opacity `transition` is universally supported.

## 5 · IDIOMATIC / no-legacy

- **Component:** clean. No dual-path, no dead code, no workaround. The `required` asterisk is the correct a11y shape (decorative `*`, `required` on the input is the semantic carrier). KEEP.
- **DEMO legacy #1 — the import path is the wrong dialect (the user's "standardize the import-path label" ask, VERIFIED).** `label.vue:4` imports `from "../../../src/components/ui/label"` — the deep relative src path — while `manifest.ts:243` declares the canonical consumer import `@mkbabb/glass-ui/label`. EVERY forms story does this (`inputs/combobox/number-field/multi-select/select/checks/textarea` all import `Label` via the deep src path). This is the demo-imports-src divergence: the storybook is a CONSUMER and should import the published subpath. → **MODIFY** (demo-wide, but THIS page is the named target).
- **DEMO legacy #2 — the raw-triplet switch-row card** (`label.vue:67`: `rounded-card border border-border bg-card p-4`). This is the hand-rolled card the user's "each subsection in its own glassy card" ask targets — and it is ALREADY owned by **BD.W-FORMS-CARD-FOLD** (M14-1 folds it onto `<ShowcaseFrame pad="sm">`). The other four sections (`for-attribute`, `nested control`, `radio group`, `peer-disabled`) are NOT wrapped in any card — they are bare `<section flex flex-col>`. So the user's ask is BROADER than the existing wave: ALL five subsections want a glassy card, not just the switch-row. → **AUGMENT** the existing wave.
- **DEMO legacy #3 — superfluous language** (the user's "tighten superfluous language" ask). The copy is editorializing: "I agree to the paper-and-glass manifesto", "Free — library on the house", "Studio — onboarding + ghostwritten tokens", "the section identity is the ONE color event". Per the writing-style memory (no grandiloquence). → **MODIFY** (demo copy tighten).

## 6 · The glass six-layer composite

- **The Label itself paints NO glass** (correct — a label is ink-on-surface, on the legibility allowlist by nature: it is text, not a plate). The six-layer composite is owed by the CARDS the page should host the sections in, and by the `Input`/`Switch` glass controls. At HEAD the switch-row's hand-rolled `bg-card` plate is an OPAQUE card (no blur/tint/rim/catch-light/grain) — it gets the six-layer composite for FREE once folded onto `<ShowcaseFrame>`/`<Card>` (the AX.W54 glass-first chassis). So the composite arrives via the card fold, not via Label.

---

## 7 · Findings → BD tranche disposition

| # | Finding | Layer | Action | Wave |
|---|---|---|---|---|
| F1 | `peer-disabled` opacity hard-snaps (motion-canon P1 EFFECTS dead-transition) | **src** | **AUGMENT** — add `transition: opacity var(--duration-fast) var(--ease-standard)` to the disabled rung; PRM-safe, library-wide | NEW micro-wave **BD.W-LABEL-DISABLE-EASE** (or fold into a forms-control-polish wave if one exists) |
| F2 | Import path `../../../src/components/ui/label` ≠ canonical `@mkbabb/glass-ui/label` (user ask: standardize) | demo | **MODIFY** | extend **BD.W-FORMS-CARD-FOLD** scope, or NEW **BD.W-DEMO-IMPORT-STANDARDIZE** (demo-wide subpath sweep — recommended, ≥8 forms files) |
| F3 | Only the switch-row is carded; the OTHER 4 subsections are bare (user ask: each subsection its own glassy card) | demo | **AUGMENT** | **BD.W-FORMS-CARD-FOLD** — widen M14-1 from the single switch-row to all 5 forms/label sections onto `<ShowcaseFrame>`/`<Card>` |
| F4 | Forms band bg = `grid`, not aurora (user ask: glass over COLORFUL aurora) | demo/manifest | **MODIFY** | NEW **BD.W-FORMS-AURORA-BG** — re-point the forms band (or this page) onto an offscreen-paused `<DockStage>`-style aurora backdrop so the glass cards read as liquid glass over a live field (honor one-GL-per-route) |
| F5 | No `.scroll-cascade` body entrance; the page is flat (user ask: HIGH animation affordance) | demo | **AUGMENT** | fold into **BD.W-FORMS-CARD-FOLD** π or NEW **BD.W-FORMS-MOTION** — wrap the section column in `.scroll-cascade` (compositor-only, PRM-carved) |
| F6 | Superfluous/editorializing copy | demo | **MODIFY** | small copy-tighten, fold into **BD.W-FORMS-CARD-FOLD** |
| F7 | Main card area should be BIGGER / leverage dock APIs for contextual switching (user ask) | demo | **AUGMENT** | NEW **BD.W-FORMS-DOCK-NAV** — the page's 5 subsections become dock-driven contextual layers (`<DockLayerGroup>`/`<DockSection>`) so the main card gets more screen space, sections switch via the dock |

**Net:** the COMPONENT is sound — one genuine src finding (F1, the opacity-transition AUGMENT). The bulk of the user's asks are PAGE-COMPOSITION asks that AUGMENT the already-existing **BD.W-FORMS-CARD-FOLD** (F3/F5/F6) or need 3 new demo-band waves (F2/F4/F7). No PRUNE — nothing is dead. No procedural-viz/Safari/perf defects in the component.

---

## 8 · Verdict (5 lines)

1. **Component is correct-altitude + clean:** `Label.vue` is a 40-line reka wrapper with the proper `required` a11y axis and the disabled rung — no four-state contract owed (not interactive), no procedural viz, no Safari/perf/legacy defect in src.
2. **ONE real src finding (F1):** the `peer-disabled` opacity is a hard snap — add a compositor-safe `transition: opacity --ease-standard` per motion-canon P1; AUGMENT, library-wide, PRM-safe.
3. **User asks are all PAGE-layer:** card-every-subsection (F3), aurora bg (F4), scroll-cascade entrance (F5), bigger dock-driven main area (F7), import standardize (F2), copy tighten (F6) — none are component defects.
4. **Existing wave covers the seed:** BD.W-FORMS-CARD-FOLD already folds the switch-row; WIDEN it to all 5 sections + copy-tighten, and add 3 new demo waves (import-standardize, forms-aurora-bg, forms-dock-nav).
5. **Six-layer glass arrives via the card fold,** not via Label (a label is ink, on the legibility allowlist) — the opaque `bg-card` switch-row becomes liquid glass for free on `<ShowcaseFrame>`/`<Card>`.
