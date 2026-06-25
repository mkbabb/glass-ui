# Page-audit — CONTAINERS (14 pages)

Pass-D demo-chassis audit. Branch `prototype/liquid-dock`. Live-spot-checked at `:5173`
(`/containers/dialog` direct-eval) + full source read of all 14 stories + the chassis
SFCs. PLANNING only — no src edits.

Roster (14): dialog · sheet · drawer · popover · dropdown-menu · context-menu ·
hover-card · tooltip · accordion · collapsible · hover-popover · expandable-container ·
command · spa-view. (NOTE: the prompt named card/section/separator — those are NOT in
the containers category: `separator` lives in `display`, `card`/`section` are display/UI
demos elsewhere. The 14 above are the real `manifest.ts:802` containers set.)

---

## 1. DRY — does the category use the shared chassis?

**YES for the page skeleton, NO for the header.** Every story wraps `<StoryPage>` +
`<StorySection>` (the body chassis is used — zero hand-rolled `<article>`/section skeleton).
But **13 of 14 stories HAND-ROLL their own `<header>` IconChip cluster** as the first
slotted child, bypassing the chassis `StoryHeader`. Only `spa-view.vue` does not.

The hand-roll is byte-identical across all 13 (a copy-paste block):
```
<header class="flex items-center gap-4 pl-5" :style="{ borderLeft: '3px solid …' }">
  <IconChip :icon=… :section="2" bloom reveal />
  <div><span class="section-label--tinted text-admin-label">Containers · X</span>
       <p class="text-small text-muted-foreground">… the ONE color event.</p></div>
</header>
```
Sites: dialog:42 · sheet:32 · drawer:30 · popover:26 · dropdown-menu · context-menu ·
hover-card · tooltip · accordion:44 · collapsible:24 · hover-popover · expandable-container:24 ·
command:59. (`spa-view.vue` is clean — StorySection only.)

→ **This is the genuinely-per-category DRY miss. It should fold into `W-PAGE-CHASSIS`**:
the per-page IconChip/identity belongs as a chassis affordance (a `section` prop on
StoryHeader, or a chassis slot), not 13 copy-pasted `<header>` blocks.

---

## 2. The 6 chassis defects — do they apply? (so they fix for free)

| # | Defect | Applies to containers? | Evidence |
|---|--------|------------------------|----------|
| W-HEADER-SCALE | header 2× too large | **YES** | `/containers/dialog`: chassis `.story-hero-title` "Dialog" = **109.66px** (`text-display-5`). Fills the band. |
| W-PAGE-CHASSIS (rule) | no `--story-header-rule` hairline | **YES** | `--story-header-rule` resolves `(none)`; chrome `<header>` `border-bottom: 0px`. No header→body seam. |
| W-PAPER-MORPHISM | grain sub-perceptual | **PARTIAL** | `--glass-grain-opacity: 0.025` (invisible). But containers ride the `grid` bg, not `paper` — grain is less of THIS category's concern than the live-field miss (§3). |
| W-STICKY-TITLE-CONDENSE | sticky title occludes | **YES** | The chassis `.story-hero-shrink` register is on every container page; the no-backing-bar occlusion is chassis-wide. |
| W-PAGE-BACKGROUND | glass demos on flat paper, not a live field | **YES — and this is the SHARPEST containers miss (§3)** | `gridBg: true`, `hasCanvas: false`. Every glass surface demo sits on a static grid wash. |
| W-PRESET-RENDER / W-DOTFLOW | WebGPU readback bug | **N/A** | No viz/preset thumbnails in containers. |

**DOUBLE-HEADER (the acute compound of W-HEADER-SCALE + the §1 hand-roll).** Containers
stories are `variant="page"` (`hero: undefined`), so `StoryPage` renders its chrome
`<header>` cluster (giant `<h1>` + eyebrow + blurb) ABOVE the card — AND each story ALSO
paints its own IconChip `<header>` INSIDE the card. Live on `/containers/dialog`:
`headerCount: 2`; chassis eyebrow = `"Containers · Dialog"` AND per-page header text =
`"Containers · Dialog"` — an **EXACT duplicate**, stacked. The per-page blurb ("the ONE
color event") also duplicates the chassis blurb register. Three identity rungs for one
page. (The Tabs screenshot, §navigation, shows the same shape vividly: giant chrome "Tabs"
+ a second "NAVIGATION · TABS" IconChip header inside the card.)

→ When W-HEADER-SCALE + W-PAGE-CHASSIS land, the per-page hand-roll must be RETIRED in
lockstep (fold into chassis), else the double-header survives the halve.

---

## 3. CATEGORY-SPECIFIC — containers ARE the glass surfaces (the load-bearing arm)

**The glass morphism does NOT read — every container demo sits on a flat opaque plate or
the dead grid wash, never a live field.** This is the worst containers-specific defect.

- **ZERO container demos use `tier="field"` or a live backdrop.** Grep: no `tier="field"`,
  no `Aurora`, only ONE `surface=` in the whole category. `gridBg: true / hasCanvas: false`
  live. The category whose entire POINT is translucent glass demonstrates it over a static
  blueprint grid (and the in-card demos sit on solid `bg-card` cream, e.g. dialog's confirm
  card `rgb(251,248,244)` opaque).
- **The surface-axis (glass/veil/opaque) is essentially undemonstrated.** Only `dialog.vue:97`
  shows `<DialogContent surface="opaque">`. No `surface="veil"` anywhere, no
  glass-vs-veil-vs-opaque side-by-side over a busy backdrop — the exact comparison the
  surface-axis exists for (`tests-visual/surface-axis.spec.ts` asserts
  "translucent-where-glass / solid-where-opaque / frosted-where-veil over a busy backdrop";
  the demo never stages it).
- **The overlay surfaces (Dialog/Sheet/Drawer/Popover/HoverCard/Command) open over the
  page's `::backdrop` scrim, NOT a live field** — so even the floated glass content reads
  over a dim grey scrim, not the iOS-27 glass-over-aurora the surface ships. → containers is
  the prime `W-PAGE-BACKGROUND` consumer: it needs a live aurora/field behind at least the
  open-overlay state so the glass plate reads as glass.

→ **Containers-specific ask: stage the container demos over a LIVE field** (DockStage-style
shared offscreen-paused aurora, or `tier="field"` showcase hosts), and add a
glass·veil·opaque surface-axis comparison row on dialog/sheet/popover. This is a per-page
content arm, distinct from the one-chassis fixes.

---

## 4. Per-page bugs (the genuinely-per-page arm)

- **`expandable-container.vue` fullscreen chrome — works, but the panel content is a flat
  `bg-card` block** (`h-48 … rounded-md bg-card`, lines 53/67/103/135). The fullscreen host
  un-walls onto `glass-overlay` per BC.W-EXPANDABLE-PART, but the demo's INNER content is an
  opaque card, so the fullscreen demonstrates the chrome seam, not the glass-overlay tier.
  Acceptable for the seam demo; worth a `surface` note.
- **`collapsible.vue` + `dialog.vue` confirm card use raw recipe triplets** (`rounded-2xl
  border border-border bg-card`, `rounded-xl border border-border bg-card/50`) instead of
  `<ShowcaseFrame>` — minor DRY drift, and the opaque `bg-card` re-states §3 (glass demo on
  opaque plate). dialog:122, collapsible:50.
- **`popover.vue` placement section** is fine functionally; the `border-t border-border`
  inline divider (line 120) is a hand-rolled section seam the chassis delimiter should own.
- **`spa-view.vue`** is the cleanest page (no hand-roll header, ShowcaseFrame, real cache
  witness) — use it as the containers reference shape after the chassis fix.
- **`accordion.vue`/`collapsible.vue`** content-height open/close rides reka collapsible
  keyframes (on the W-MOTION-CANON allowlist) — correct, no bug.
- No broken overlays / mis-sized sheets observed in source; sheet's four-sides + drawer's
  snap-points are correctly wired. (Live overlay-open capture was blocked by a demo
  persisted-route store that fights direct URL nav on reload — a separate demo-shell nav
  bug, out of containers scope; chassis defects were confirmed by direct in-page eval on
  `/containers/dialog`.)

---

## VERDICT (5 lines)
1. DRY: body chassis USED everywhere; but 13/14 stories HAND-ROLL a duplicate `<header>` IconChip cluster (only spa-view clean) → fold into W-PAGE-CHASSIS.
2. All 6 chassis defects apply except the 2 WebGPU bugs (no viz here); W-HEADER-SCALE confirmed live (chassis H1 109.66px) — and compounds into a DOUBLE-HEADER (chassis eyebrow + per-page header both say "Containers · Dialog", headerCount 2).
3. CATEGORY-SPECIFIC + LOAD-BEARING: containers ARE the glass surfaces, yet ZERO demos stage glass over a live field (`gridBg:true/hasCanvas:false`, opaque `bg-card` plates) — the morphism never reads; surface-axis (glass/veil/opaque) is undemonstrated (1 `surface="opaque"` total, no `veil`).
4. Containers-specific ask: stage demos + open-overlays over a LIVE field (W-PAGE-BACKGROUND) + add a glass·veil·opaque comparison row (dialog/sheet/popover).
5. Per-page: minor raw-recipe/opaque-plate drift (dialog confirm card, collapsible, expandable inner content); spa-view is the clean reference; no broken/mis-sized overlays found.
