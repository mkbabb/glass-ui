# Pass-E META-STORYBOOK DEMO audit — `forms/multi-select`

- **Route:** `/forms/multi-select` · **SFC:** `demo/stories/forms/multi-select.vue` (114 lines) · **live:** http://localhost:5173/forms/multi-select
- **Component:** `MultiSelect` (`src/components/ui/multi-select/MultiSelect.vue`, 159 lines)
- **Captured:** `ms-full.png` (page), `ms-open.png` (dropdown open). Viewport 1440. Background substrate = `grid-bg`. Canvas/GL contexts on page = **0**.

---

## Verdict at a glance

The page is a thin, flat, monochrome spec-sheet that violates nearly every BD north-star bar. The component itself is functional (popover + glass-menu-row hover works), but the demo (a) shows it over a static gray `grid` field, not a colorful aurora; (b) packs three controls into `max-w-sm` (384px) inside an 1086px card, leaving ~700px of dead whitespace (the user's "main card area BIGGER / more screen space" inverted); (c) puts every sub-section in ONE shared card with hairline delimiters, not its OWN glassy card; (d) composes ZERO other glass-ui surfaces beyond the bare trigger (no dock APIs, no tabs, no procedural-anim, no cards-per-section); (e) the import-path label is the lone forms outlier (`/forms/multi-select` route vs every sibling's `@mkbabb/glass-ui/forms`) — and this is actually CORRECT because the component is unpublished, which is itself the deeper finding.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the FULL API?

**Partial. The three demoed props are real; the richest affordances are absent.**

- API surface demoed: `v-model`, `options`, `placeholder`, `maxDisplay`, `disabled` (`multi-select.vue:57–91`). That is the entire `Props` interface (`MultiSelect.vue:28–33`) — so prop coverage is technically complete.
- **NOT exercised — the `MultiSelectOption.icon` channel.** `MultiSelectOption` carries `icon?: string | Component` (`MultiSelect.vue:22–26`) and the SFC plumbs both a text-icon and a component-icon path in the trigger badges AND the menu rows (`MultiSelect.vue:118–124, 141–147`). The demo passes ZERO icons (`multi-select.vue:13–28` — every option is `{value,label}` only), so the entire icon-rendering half of the component is dark in the demo. This is the single biggest API miss.
- **No animation affordance shown.** The BD bar is "HIGH animation affordance for EVERY component." The component has no entrance/stagger/morph on its badges or rows; the demo adds none. The selected-badge wrap (`MultiSelect.vue:134–158`) pops in with no transition; removing a tag is an instant DOM yank, no exit animation. Contrast the menu-row glass-lift (which DOES animate, inherited from `.glass-menu-row`) — that is the only motion on the surface and it's not demonstrated/narrated.
- **No contextual switching / dock API.** Multi-select is a filter/tag primitive — a natural fit for a dock-hosted "facets" rail (`<DockStack mode="facets">`, BE.W-DOCK-RAIL-REALIZE) or a `DockLayerGroup` driving the option set. The demo wires none.
- The three sections are near-duplicates (same six-tool list twice, `tools` reused for Stack + Disabled at `multi-select.vue:71,85`) — low information density for three full sections.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin/flat.** The page composes exactly: `StoryPage` (chassis) + `IconChip` (one, in the header, `multi-select.vue:45`) + `Label` ×3 + `MultiSelect` ×3. The "model summary" block (`multi-select.vue:94–112`) is a **raw `rounded-card border bg-card`** hand-rolled div — it does NOT even use `<Card>`/`ShowcaseFrame`, the house card chassis. No tabs, no buttons (beyond the component's internal trigger), no procedural-anim, no dock composition. Against the BD bar ("each page deftly uses a series of glass-ui components — docks/procedural-anims/cards/tabs/buttons") this page is among the thinnest.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL — flat.** Live check: background substrate is `story-hero-bg grid-bg` (a static gray grid), `canvasCount: 0` — no aurora, no GL. The MultiSelect trigger is an `outline` Button (`MultiSelect.vue:88–94`) — a faint pill on a gray card on a gray grid; the glass morphism cannot read because there is nothing colorful behind it to refract. The forms category default is `grid` (`manifest.ts:184`), so this is a category-wide posture, but the BD mandate is explicit: "glass demos over COLORFUL aurora backgrounds." The dropdown popover DOES show the correct glass-menu-row register (`ms-open.png` — the hovered "Fourier" row reads the glass-quiet plate, AX.W54/BA.W-MENU-GLASS working), but it floats over gray, so the six-layer optical composite (blur+saturate, edge rim, catch-light) is invisible. **PAPER morphism:** absent and not apt-mismatched — a tag picker is a glass control, so paper isn't owed, but the page reads as neither glass nor paper, just flat gray.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main card BIG enough?

**FAIL on both.**

- **One shared card, not per-section cards.** `StoryPage` wraps the whole body in ONE `StoryHero` glass card (`StoryPage.vue:128–178`); the four `<section>`s are flat flex-col blocks separated by the auto-hairline `.story-sections--delimited` seam (`StoryPage.vue:166–175`). The user's bar — "each sub-section in its OWN glassy card" — is not met; sections share one plate divided by hairlines.
- **Main area is mostly dead whitespace, not "bigger."** Live measurement: card (`.story-sections`) = 1086px wide, but the three control sections are each `max-w-sm` = **384px** (`multi-select.vue:57,69,82`). So content occupies the left ~35% of the card; ~700px of card is empty. The user asked for the main card area BIGGER (more screen space) — the demo instead uses a small fraction of the space it has. A 2-up / bento grid of per-section glass cards filling the width is the architectural fix.

## (5) PATH-LABEL standardization

**Outlier — but for a real reason.** Every forms sibling labels `@mkbabb/glass-ui/forms` (`manifest.ts:232,233,238,340`); multi-select alone carries the bare route `/forms/multi-select` (`manifest.ts:239`). This is **correct by the subpath-resolution rule**, because `MultiSelect` is genuinely **unpublished**: it is not in `src/forms.ts` (which exports only input/textarea/combobox), not on the root barrel, not on `/api`, not in `package.json` exports (verified — zero hits). The demo imports it via deep relative path `../../../src/components/ui/multi-select` (`multi-select.vue:4`).
**The real finding is the publication gap, not the label.** Either (a) publish `MultiSelect` (add to `/forms` or its own subpath) and relabel to the published path — the standardization the user wants — or (b) it stays a private-demo-only component and the bare-route label is honest. Given it's a first-class `ui/` primitive with a full API, (a) is the idiomatic resolution.

## (6) LANGUAGE — superfluous prose to tighten?

- Header blurb: "Multiple-choice tag selection — the section identity is the ONE color event." (`multi-select.vue:51–53`) — the "the section identity is the ONE color event" half is internal design-system meta-commentary leaking into a user-facing demo blurb. Tighten to the user-facing half: "Multiple-choice tag selection — pick one or more options."
- Caption "maxDisplay · 2 — overflows collapse into (+N)" (`multi-select.vue:78`) is fine (concrete, demonstrates the prop). "Non-interactive" (`multi-select.vue:90`) is fine.
- The `selectable-chip`/`toggle-chip` manifest blurbs are tighter models; multi-select's blurb is the one with editorializing.

## (7) BUGS

- **B1 (live-confirmed) — no aurora / 0 GL contexts.** Already covered in (3); the glass demo has no colorful field. The headline defect.
- **B2 (code-level) — disabled MultiSelect's remove-`X` badges are not disabled.** When `disabled` is set, the trigger Button is disabled (`MultiSelect.vue:92`, live-confirmed `disabledTriggerDisabled:true`), BUT the selected-badge `X` remove buttons (`MultiSelect.vue:149–156`) carry NO `:disabled` binding — live check returned `lastBadgeBtnDisabled: [false, false]`. A "Locked / Non-interactive" picker still exposes enabled tag-remove controls. (A single synthetic X-click did not visibly remove — likely an intercept — so this is a correctness concern in the component, not a reproduced live removal; worth a `:disabled="disabled"` on the badge X.)
- **B3 (structural) — the badge display lives OUTSIDE the Popover root.** `MultiSelect.vue:133–158` renders the selected badges as a sibling of `<Popover>`, so the component emits TWO root nodes (Popover + the badge div). With Vue 3 fragments this works, but `data-slot="multi-select"` is on the Popover only, so a consumer selecting `[data-slot="multi-select"]` won't reach the badge row. Minor.
- **B4 — `class="w-full p-0"` PopoverContent + `w-full` trigger.** The popover is `w-full` (`MultiSelect.vue:99`) but reka's popper content width isn't bound to the trigger width, so the menu (350px in `ms-open.png`) is narrower than the 384px trigger — a small visual misalignment, not a break.
- No console errors (1 benign warning only).

---

## Architectural fix (transposition, not patch)

1. **Background → aurora** (per-route `background: "aurora"` override on the manifest row, or category posture) so the glass reads its six-layer composite over a colorful field.
2. **Per-section glass cards in a width-filling bento** (`<ShowcaseFrame tier="field">` or `<Card>` per section, 2-up `sm:grid-cols-2`), retiring the `max-w-sm` left-column + the raw hand-rolled summary div — fills the card, gives each sub-section its OWN glass plate.
3. **Exercise the icon API** (pass `icon:` per option — text-icon + component-icon arms) and **add an animation affordance** (badge entrance stagger / exit on remove).
4. **Compose a dock facet rail** (`<DockStack mode="facets">` driving the option group, or a `<SegmentedTabs>` switching Bases ↔ Stack) to hit the "series of components / dock APIs" bar.
5. **Publish `MultiSelect` on `/forms`** and relabel to the standardized published path; tighten the header blurb.
